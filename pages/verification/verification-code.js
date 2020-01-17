// pages/verification-code.js
import api from '../../api/api.js'
var timerNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Length: 4, //输入框个数
    isFocus: true, //聚焦
    Value: "", //输入的内容
    ispassword: false, //是否密文显示 true为密文， false为明文
    timer: 59, //这是倒计时的起始
    phoneNumber: "",
    verificationcode: '',
    again: false,
    sendtext1: "验证码已发送,",
    sendtext2: "秒后重新获取",
    sendtext3: "请点击左上角返回，重新获取验证码"
  },
  //六个框的函数，需改
  Focus(e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
    if (this.data.Value.length == 4) {
      console.log("value:" + this.data.Value)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      api.bindPhone({
        "areaCode": "+86",
        "phoneNumber": this.data.phoneNumber,
        "code": this.data.Value,
        "identification": this.data.phoneNumber + 1,
        "wechatUuid": wx.getStorageSync("token").wechatUuid
      }, (res) => {
        wx.hideLoading()
        if (res.errCode === 1) {
          wx.showToast({
            title: '填写正确',
            icon: 'success',
            duration: 1500
          })
          wx.login({
            success(lg) {
              api.getOpenIdByCode({
                code: lg.code
              }, (res) => {
                console.log(res)
                if (res.errCode === 1) {
                  let data = res.data;
                  wx.setStorageSync("token", data);
                  wx.redirectTo({
                    url: '../choose/choose?phoneNumber=' + that.data.phoneNumber
                  })
                }

              })
            }
          })
          
        }
        console.log("success" + res) // 服务器回包信息
      });
    }
  },
  //六个框的函数，需改
  Tap() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  formSubmit(e) {
    console.log(e.detail.value.password);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.timer)
    console.log("option:" + options.phoneNumber)
    this.setData({
      phoneNumber: options.phoneNumber,
      verificationcode: options.verificationcode
    })

    var that = this;
    timerNum = setInterval(function() {
      if (that.data.timer > 0)
        var test = that.data.timer - 1;
      else {
        test = 0;
        that.setData({
          again: true
        })
      }
      that.setData({
        timer: test
      })
    }, 1000)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})