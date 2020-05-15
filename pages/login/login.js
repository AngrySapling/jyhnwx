const http = require('../../api/api.js');
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '登录简易慧能',
    active: 0,
    add:'+',
    areaCode:'86',
    phone:'',
    sms:'',
    times:null
  },
  Login() {
    let _this = this
    setTimeout(function () {
      _this.Login1()
    }, 100)
  },
  Login1(){
    let that = this;
    if(this.data.sms){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      api.bindPhone({
        "areaCode": "+86",
        "phoneNumber": this.data.phone,
        "code": this.data.sms,
        "identification": this.data.phone + 1,
        "wechatUuid": wx.getStorageSync("token").wechatUuid
      }, (res) => {
        wx.hideLoading()
        if (res.errCode === 1) {
          wx.showToast({
            title: '登录成功',
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
                    url: '../choose/choose?phoneNumber=' + that.data.phone
                  })
                }
              })
            }
          })

        }
        console.log("success" + res) // 服务器回包信息
      });
    }else{
      wx.showModal({
        content: '请输入验证码',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },
  onChangeareaCode(e){//areaCode
    let value = e.detail.value
    this.setData({
      areaCode: value
    })
  },
  onChangePhone(e) {//phone
    let value = e.detail.value
    console.log(value,'value')
    this.setData({
      phone: value
    })
  },
  onChangeMsm(e){
    let value = e.detail.value
    this.setData({
      sms: value
    })
  },
  sendSms(){
    let _this = this
    setTimeout(function(){
      _this.sendSms1()
    },100)
  },
  sendSms1(){
    if(this.data.times)return;
    let _this = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var phoneNumber = this.data.phone;
    var areaCode = this.data.areaCode ? "+" + this.data.areaCode : "+86";
    if (phoneNumber.length == 0) {
      wx.showModal({
        content: '输入手机号码为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else if (phoneNumber.length < 11) {
      wx.showModal({
        content: '输入手机号码长度有误',
        showCancel: false,
        success: function (res) {
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
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      http.getPhoneCode({
        "areaCode": areaCode,
        "phoneNumber": phoneNumber,
        "identification": phoneNumber + 1,
      }, (res) => {
        wx.hideLoading()
        if (res.errCode === 1) {
          let times = 120
          let isTime = setInterval(function(){
            times--
            _this.setData({
              times,
            })
            if (!_this.data.times){
              clearInterval(isTime)
            }
          },1000)
          // wx.navigateTo({
          //   url: '../verification/verification-code?phoneNumber=' + phoneNumber + '&verificationcode=' + res.data
          // })
        }
        console.log("success" + res) // 服务器回包信息
      });
    }
  },
  getNumber(e){
    console.log(e,'shoujihao')
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
  // Login: function(e) {
  //   console.log(e)
  //   var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

  //   var phoneNumber = this.data.phone;
  //   var areaCode = e.detail.value.areaCode?"+"+e.detail.value.areaCode:"+86";
  //   if (phoneNumber.length == 0) {
  //     wx.showModal({
  //       content: '输入手机号码为空',
  //       showCancel: false,
  //       success: function(res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     });
  //   } else if (phoneNumber.length < 11) {
  //     wx.showModal({
  //       content: '输入手机号码长度有误',
  //       showCancel: false,
  //       success: function(res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     });
  //     return false;
  //   } else if (!myreg.test(phoneNumber)) {
  //     wx.showModal({
  //       content: '输入手机号码有误',
  //       showCancel: false,
  //       success: function(res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     });
  //     return false;
  //   } else {
  //     wx.showLoading({
  //       title: '加载中',
  //       mask:true
  //     })
  //     http.getPhoneCode({
  //       "areaCode": areaCode,
  //       "phoneNumber": phoneNumber,
  //       "identification": phoneNumber + 1,
  //     }, (res) => {
  //       wx.hideLoading()
  //       if(res.errCode === 1){
  //         wx.navigateTo({
  //           url: '../verification/verification-code?phoneNumber=' + phoneNumber + '&verificationcode=' + res.data
  //         })
  //       }
  //       console.log("success" + res) // 服务器回包信息
  //     });
  //     return;
  //     console.log('qingqiu ')
  //     wx.request({
  //       url: 'http://www.easeway.co:8989/wechat/getPhoneCode',
  //       method: 'POST',
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       data: {
  //         "areaCode": "+86",
  //         "phoneNumber": phoneNumber,
  //         "identification": phoneNumber+1,
  //       },
  //       success: function(res) {
  //         console.log("success" + res.data.errMsg) // 服务器回包信息
  //         if (res.data.errCode == '1') {
  //           console.log("phoneNumber:"+phoneNumber)
  //           console.log("phoneNumber:" + res.data.data)
  //           wx.navigateTo({
  //             url: '../verification/verification-code?phoneNumber=' + phoneNumber + '&verificationcode=' + res.data.data
  //           })
  //         }
  //       },
  //       fail: function(e){
  //         console.log("fail" + e.errMsg);
  //       }
  //     })

  //   }

  //   if ((phoneNumber.length=='11')&&(phoneNumber)){
  //     wx.navigateTo({
  //       url: '../verification/verification-code'
  //     })
  //   }
  //   else{
  //     wx.showModal({
  //       content: '手机号码输入有误，请检查',
  //       showCancel: false,
  //       success: function (res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     });
  //   }
  // },
  /**
   * 用户点击教育纵横用户注册协议与隐私政策
   */
  userAgreement: function() {
    wx.navigateTo({
      url: '../userAgreement/userAgreement'
    })
  }
})