const api = require('./request.js');
let reqUrl = "https://www.easeway.co";
// reqUrl = "http://192.168.199.228:8989";
// reqUrl = 'https://api.it120.cc/mzsx';
//获取验证码
const getPhoneCodeUrl = `${reqUrl}/wechat/getPhoneCode`
//判断是否绑定
const getOpenIdByCodeUrl = `${reqUrl}/wechat/getOpenIdByCode`
//保存用户信息
const saveWechatUrl = `${reqUrl}/wechat/saveWechat`
//绑定用户信息
const bindPhoneUrl = `${reqUrl}/wechat/bindPhone`
//获取用户手机号
const getPhoneByWechatUuidUrl = `${reqUrl}/wechat/getPhoneByWechatUuid`
//上传用户提交问题
const saveFeedBackUrl = `${reqUrl}/wechat/saveFeedBack`
const http = {
  //获取验证码
  getPhoneCode(data, callback) {
    api({ url: getPhoneCodeUrl, method: "POST", data: data }).then((res) => {
      console.log(res,99969)
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  },
  //获取登录状态
  getOpenIdByCode(data, callback) {
    api({ url: getOpenIdByCodeUrl, method: "POST", data: data }).then((res) => {
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  },
  //保存用户信息
  saveWechat(data,callback){
    api({ url: saveWechatUrl, method: "POST", data: data }).then((res) => {
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  },
  //绑定用户信息
  bindPhone(data, callback) {
    api({ url: bindPhoneUrl, method: "POST", data: data }).then((res) => {
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  },
  //获取用户的手机号
  getPhoneByWechatUuid(data,callback){
    api({ url: getPhoneByWechatUuidUrl, method: "POST", data: data }).then((res) => {
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  },
  //上传用户提交问题
  saveFeedBack(data, callback) {
    api({ url: saveFeedBackUrl, method: "POST", data:data },true,true).then((res) => {
      callback(res)
    }).catch((err) => {
      console.log(err)
      showErr(err)
    })
  }
}
function showErr(err) {
  wx.showModal({
    showCancel: false,
    content: err.errMsg
  });
}
module.exports = http;