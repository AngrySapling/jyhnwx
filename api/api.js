const api = require('./request.js');
let reqUrl = "http://www.easeway.co:8989";
// reqUrl = 'https://api.it120.cc/mzsx';
const getPhoneCodeUrl = `${reqUrl}/wechat/getPhoneCode`;

const http = {
  getPhoneCode(data, callback) {
    api({ url: getPhoneCodeUrl, method: "POST", data: data }).then((res) => {
      let data = res.data;
      callback(data)
    }).catch((err) => {
      showErr(err)
    })
  }
}
function showErr(err) {
  wx.showModal({
    showCancel: false,
    content: err.msg
  });
}
module.exports = http;