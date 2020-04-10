// pages/wechatLogin/wechatLogin.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLogin: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxUniqueId:''
    // code: ''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  sendWxChatUserInfo: function (userInfo, token) {
    console.log(userInfo, 'asd ', token.wechatUuid)
    var that = this;
    api.saveWechat({
      "wechatUuid": token.wechatUuid,
      "gender": userInfo.gender,
      "userName": userInfo.nickName,
      "language": userInfo.language,
      "country": userInfo.country,
      "province": userInfo.province,
      "city": userInfo.city,
      "avatarUrl": userInfo.avatarUrl
    }, (res) => {
      if (res.errCode === 1) {//成功将信息保存
        if (token.isBindStatus) {
          wx.reLaunch({
            url: '/pages/choose/choose'
          })

        } else {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    let token = wx.getStorageSync("token");
    console.log(token,'token')
    this.sendWxChatUserInfo(e.detail.userInfo,token);
  },


  // //获取用户信息
  // wx.getUserInfo({
  //   success: function (res) {
  //     console.log(res.userInfo)
  //     that.sendWxChatUserInfo(res.userInfo);
  //   }
  // })


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCodeAndOpinid: function () {
    var that = this;
    //根据code获取openid等信息
    wx.login({
      //获取code
      success: function (res) {
        // var code = res.code; //返回code
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://www.easeway.co:8989/wechat/getOpenIdByCode',
            method:"POST",
            data: {
              code: res.code
            },
            success: function(res){
              if(res.data.errCode == 1){
                console.log("success1:", res.data.data.wechatUuid);
                that.setData({
                  wxUniqueId: res.data.data.wechatUuid
                })
                console.log("wxUniqueId:", res.data.data.wechatUuid);
                if (wx.getStorageSync("UniqueId")){
                  console.log("not null")
                  if (wx.getStorageSync("UniqueId").length == 36) {//如果openid存在，即用户非首次登陆
                    that.setData({
                      firstLogin: false
                    })
                    wx.setStorageSync("UniqueId", that.data.wxUniqueId);
                    wx.redirectTo({
                      url: '../login/login'
                    })
                  } 
                }
                else { //首次登陆
                  console.log("null")
                  wx.setStorageSync("UniqueId", that.data.wxUniqueId);
                  that.setData({
                    firstLogin: true
                  })
                }

              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })
  },

  toInputPhone: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  }

})