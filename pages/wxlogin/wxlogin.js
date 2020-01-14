// pages/wechatLogin/wechatLogin.js
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
  // var that = this;
  // this.getCodeAndOpinid();
  // // this.data.wxUniqueId = wx.getStorageSync("UniqueId")
  // console.log("id:", that.data.wxUniqueId)
  //   return;
  // console.log("id2:", that.data.wxUniqueId)
  //   // 查看是否授权
  //   wx.getSetting({
  //   success(res) {
  //     if (res.authSetting['scope.userInfo']) {
  //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //       console.log(res, '授权')
  //       wx.getUserInfo({
  //         success: function (res) {
  //           console.log(res.userInfo)
  //           that.sendWxChatUserInfo(res.userInfo);
  //         }
  //       })
  //     }
  //   }
  // })


  sendWxChatUserInfo: function (userInfo) {
    var that = this;
    console.log("sendWxChatUserInfo:init:", that.data.wxUniqueId)
    wx.request({
      url: 'http://www.easeway.co:8989/wechat/saveWechat',
      method: 'POST',
      data: {
        "wechatUuid": that.data.wxUniqueId,
        "gender": userInfo.gender,
        "userName": userInfo.nickName,
        "language": userInfo.language,
        "country": userInfo.country,
        "province": userInfo.province,
        "city": userInfo.city,
        "avatarUrl": userInfo.avatarUrl
      },
      // header: {
      //   'content-type': 'json'
      // },
      success: function (res) {
        console.log("success_Res:", res)
      },
      fail: function (res) {
        console.log("fail_Res:", res)
      }
    })
  },





  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },





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
        console.log("res.code",res.code);
        var appId = 'wxd71017f72fd0e8db';
        var secret = 'ffdd813e1604159aea90d424166cdc68';
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
        
        // that.setData({ code: '' })

        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
        //   data: {},
        //   header: {
        //     'content-type': 'json'
        //   },
        //   success: function (res) {
        //     console.log('res为' + res.data.errmsg);
        //     var openid = res.data.openid //返回openid
        //     if (wx.getStorageSync("userId") == openid) { //如果openid存在，即用户非首次登陆
        //       that.setData({
        //         firstLogin: false
        //       })
        //       wx.redirectTo({
        //         url: '../choose/choose'
        //       })
        //     } else { //首次登陆
        //       wx.setStorageSync("userId", openid);
        //       that.setData({
        //         firstLogin: true
        //       })
        //     }
        //     console.log('openid为：' + openid);
        //     console.log('unionid为：' + res.data.unionid);
        //     console.log('session_key为：' + res.data.session_key);
        //   }
        // })

      }
    })
  },

  toInputPhone: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  }

})