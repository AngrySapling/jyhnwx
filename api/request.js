let reqUrl = "https://www.easeway.co";
// reqUrl = "http://192.168.199.228:8989";
// reqUrl = 'https://api.it120.cc/mzsx';
let Token = wx.getStorageInfoSync('token'),token={};
let header = { "Content-Type": "application/json;charset=UTF-8" } 
let Options = {
  url:'',
  data:{},
  header:header,
  method: "POST",
  dataType: "json"
}
function isHttpStatus(status){
  return status >= 200 && status < 300 || status === 304;
}
//封装请求
function RequestP(opt={}){
  let opts = Object.assign({},Options,opt);
  let {url,data,header,method,dataType} = opts;
  return new Promise((res,rej)=>{
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      success(r){
        console.log(r,'qingqiudenglu')
        const isSuccess = isHttpStatus(r.statusCode);
        if(isSuccess){
          res(r.data);
        }else{
          rej({
            msg:`网络错误:${r.statusCode}`,
            detail:r
          })
        }
      }
    })
  })
}


function api(options={},istoken=true,form=false){
  console.log(istoken, form)
    if(form){
      header = {
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8" }//application/x-www-form-urlencoded
      options.transformRequest = [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }
    if(istoken){
      token = Token ? { 'Token': Token } : {}
      header = Object.assign({},header, token)
    }
    options.header = header
    console.log(header)
    return new Promise((res,rej)=>{
        RequestP(options).then((r2) => {
            if (r2.errCode === 1) {
              res(r2)
            } else {
              res(r2)
              wx.showModal({
                title: '提示',
                content: r2.errMsg,
                showCancel: false
              })
            }
        })
    })
}
module.exports = api;


// function login(){
//   return new Promise((res,rej)=>{
//     //微信登录
//     wx.login({
//       success(lg){
//         //微信登录获取token
//         // /wechat/getOpenIdByCode ///user/wxapp/login
//         console.log(lg)
//         RequestP({
//           url: `${reqUrl}/wechat/getOpenIdByCode`,
//           data:{
//             code: lg.code,
//             type: 2
//           },
//         }).then((r1)=>{
//           if (r1.errCode === 1){
//             Token = r1.data.wechatUuid;
//             wx.setStorage({ key: 'token', data: Token })
//             res(r1)
//           }else{
//             console.log('报错')
//             wx.
//           }
//         })
//       }
//     })
//   })
// }
//获取token
/**
 * 如果多个请求的话,出现未登录首先
//  */
// let isLogin = false;
// let loginList = [];
// function getToken(){
//   return new Promise((res,rej)=>{
//     //未登录
//     if(!Token){
//       loginList.push({res,rej});
//       if(!isLogin){//拦截后面进行的多次请求
//         isLogin = true;
//         login().then((r)=>{
//           isLogin = true;
//           while(loginList.length){
//             loginList.shift().res(r);
//           }
//         }).catch((err)=>{
//           isLogin = false;
//           while (loginList.length) {
//             loginList.shift().res(r);
//           }
//         });
//       }
//     }else{
//       res()
//     }
//   })
// }
