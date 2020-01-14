let reqUrl = "http://www.easeway.co:8989";
// reqUrl = 'https://api.it120.cc/mzsx';
let Token = '',token={};
token = Token?{ 'Token': Token }:{}
let header = Object.assign({}, { "Content-Type": "application/json;charset=UTF-8"},token)
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

function login(){
  return new Promise((res,rej)=>{
    //微信登录
    wx.login({
      success(lg){
        //微信登录获取token
        // /wechat/getOpenIdByCode ///user/wxapp/login
        console.log(lg)
        RequestP({
          url: `${reqUrl}/wechat/getOpenIdByCode`,
          data:{
            code: lg.code,
            type: 2
          },
        }).then((r1)=>{
          if (r1.errCode === 1){
            Token = r1.data.wechatUuid;
            wx.setStorage({ key: 'token', data: Token })
            res(r1)
          }else{
            console.log('报错')
          }
        })
      }
    })
  })
}
//获取token
/**
 * 如果多个请求的话,出现未登录首先
 */
let isLogin = false;
let loginList = [];
function getToken(){
  return new Promise((res,rej)=>{
    //未登录
    if(!Token){
      loginList.push({res,rej});
      if(!isLogin){//拦截后面进行的多次请求
        isLogin = true;
        login().then((r)=>{
          isLogin = true;
          while(loginList.length){
            loginList.shift().res(r);
          }
        }).catch((err)=>{
          isLogin = false;
          while (loginList.length) {
            loginList.shift().res(r);
          }
        });
      }
    }else{
      res()
    }
  })
}


function api(options={},isLogin=true){
  if(isLogin){
    return new Promise((res,rej)=>{
      getToken().then(()=>{
        RequestP(options).then((r2)=>{
          if (res.code === 401) {
            Token = "";
            wx.removeStorage({
              key: 'token',
              success: function (res) {

              },
            })
          }else{
            res(r2)
          }
        })
        
      })
    })
  }
}
module.exports = api;