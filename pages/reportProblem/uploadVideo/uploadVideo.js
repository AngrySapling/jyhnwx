// pages/reportProblem/uploadVideo/uploadVideo.js
let app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

    src: '',
    danmuList: [
      // {
      //   text: '第 1s 出现的弹幕',
      //   color: '#ff0000',
      //   time: 1
      // },
      // {
      //   text: '第 3s 出现的弹幕',
      //   color: '#ff00ff',
      //   time: 3
      // }
      ]
  },

  confirm: function (e) {
    console.log(e)
    console.log(this.data.src)
    // if (!isPlay) return
    app.globalData.Video = this.data.src
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      src: app.globalData.Video
    })
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
  // chooseVideo: function () {
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: 'back',
  //     success(res) {
  //       console.log(res.tempFilePath)
  //     }
  //   })
  // },


  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }


})