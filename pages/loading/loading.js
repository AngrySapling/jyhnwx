// pages/loading/loading.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this;
    let token = wx.getStorageSync("token");
    if (!token.wechatUuid) {
      wx.login({
        success(lg) {
          api.getOpenIdByCode({
            code: lg.code
          }, (res) => {
            console.log(res)
            if (res.errCode === 1) {
              let data = res.data;
              wx.setStorageSync("token", data);
              that.GetMsg(data)
            }

          })
        }
      })
    } else {
      this.GetMsg(token)
    }
  },
  GetMsg: function (token) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'], 666)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.sendWxChatUserInfo(res.userInfo, token);
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/wxlogin/wxlogin'
          })
        }
      }
    })
    if (token.isBindStatus) {//绑定了直接进主页

    } else {//未绑定则进入绑定页面

    }

  },
  sendWxChatUserInfo: function (userInfo, token) {
    var that = this;
    console.log(token, 777)
    console.log("sendWxChatUserInfo:init:", token.wechatUuid)
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

  }
})