const http = require('../../api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '登录简易慧能',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if(options.title.length != 0)
    if (options.title != undefined)
    {
      this.setData({
        title: options.title
      })
    }
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
  /**
   * 用户点击获取验证码
   */
  getCode: function(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var phoneNumber = e.detail.value.phoneNumber;
    console.log(phoneNumber);
    if (phoneNumber.length == 0) {
      wx.showModal({
        content: '输入手机号码为空',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else if (phoneNumber.length < 11) {
      wx.showModal({
        content: '输入手机号码长度有误',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    } else if (!myreg.test(phoneNumber)) {
      wx.showModal({
        content: '输入手机号码有误',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    } else {
      http.getPhoneCode({
        "areaCode": "+86",
        "phoneNumber": phoneNumber,
        "identification": phoneNumber + 1,
      }, (msg) => {
        console.log("success" + res.data.errMsg) // 服务器回包信息
      });
      return;
      console.log('qingqiu ')
      wx.request({
        url: 'http://www.easeway.co:8989/wechat/getPhoneCode',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          "areaCode": "+86",
          "phoneNumber": phoneNumber,
          "identification": phoneNumber+1,
        },
        success: function(res) {
          console.log("success" + res.data.errMsg) // 服务器回包信息
          if (res.data.errCode == '1') {
            console.log("phoneNumber:"+phoneNumber)
            console.log("phoneNumber:" + res.data.data)
            wx.navigateTo({
              url: '../verification/verification-code?phoneNumber=' + phoneNumber + '&verificationcode=' + res.data.data
            })
          }
        },
        fail: function(e){
          console.log("fail" + e.errMsg);
        }
      })

    }

    if ((phoneNumber.length=='11')&&(phoneNumber)){
      wx.navigateTo({
        url: '../verification/verification-code'
      })
    }
    else{
      wx.showModal({
        content: '手机号码输入有误，请检查',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },
  /**
   * 用户点击教育纵横用户注册协议与隐私政策
   */
  userAgreement: function() {
    wx.navigateTo({
      url: '../userAgreement/userAgreement'
    })
  }
})