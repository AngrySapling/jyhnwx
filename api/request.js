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
              if(r2.errCode === 100034){
                wx.removeStorageSync('token')
                res(r2)
                wx.reLaunch({
                  url: '/pages/loading/loading'
                })
                return;
              }
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



