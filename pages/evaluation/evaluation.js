// pages/evaluation/evaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starnum:[0,0,0,0,0],
    score: 0,  //ID就是星级-1.因此id+1就是评星
    phoneNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phoneNumber: options.phoneNumber
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
  clickStar: function(e){
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id;
    this.data.score = id-1+2;

    for (var i = 0; i <= 4; i++) {
      var stararray = 'starnum[' + i + ']';
      if(i<=id)
      {
        if (this.data.starnum[i] == 0) {
          this.setData({
            [stararray]: 1
          })
        }
      }
      else{
        console.log('i=' + i);
        if (this.data.starnum[i] == 1) {
          this.setData({
            [stararray]: 0
          })
        }
      }
    }
  },

  bindFormSubmit: function (e) {
    if (e.detail.value.phone.length!=11)
    {
      wx.showModal({
        title: '输入有误',
        content: '请检查手机号输入是否正确',
        // confirmText: "确认",
        // cancelText: "辅助操作",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          } else {
            console.log('用户点击辅助操作')
          }
        }
      })
    }
    else if (e.detail.value.sn.length != 12)
    {
      wx.showModal({
        title: '输入有误',
        content: '请检查主机序列后输入是否正确',
        // confirmText: "确认",
        // cancelText: "辅助操作",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          } else {
            console.log('用户点击辅助操作')
          }
        }
      })
    }
    else if (e.detail.value.mail.length <0 ) {
      wx.showModal({
        title: '输入有误',
        content: '请检查邮箱输入是否正确，是否填写了@xx.com',
        // confirmText: "确认",
        // cancelText: "辅助操作",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          } else {
            console.log('用户点击辅助操作')
          }
        }
      })
    }
    else if (this.data.score.length < 1) {
      wx.showModal({
        title: '未进行评星',
        content: '请点击4评星，对产品进行总体评价',
        // confirmText: "确认",
        // cancelText: "辅助操作",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          } else {
            console.log('用户点击辅助操作')
          }
        }
      })
    }
    else if (e.detail.value.comment.length < 1) {
      wx.showModal({
        title: '未填写使用体验',
        content: '请填写使用体验后点击提交',
        // confirmText: "确认",
        // cancelText: "辅助操作",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          } else {
            console.log('用户点击辅助操作')
          }
        }
      })
    }
    else{ //完全正确后
      console.log("1.phone:" + e.detail.value.phone);
      console.log("2.sn:" + e.detail.value.sn);
      console.log("3.mail:" + e.detail.value.mail);
      console.log("4.score:" + this.data.score);
      console.log("5.comment:" + e.detail.value.comment);
      console.log("6.advice:" + e.detail.value.advice);
      wx.request({
        url: 'http://www.easeway.co:8989/wechat/saveEval',
        method: 'POST',
        // header: {
        //   'content-type': 'application/json'
        // },
        data: {
          // "areaCode": "+86",
          "phoneNumber": e.detail.value.phone,
          "deviceId": e.detail.value.sn,
          "eamil": e.detail.value.mail,
          "score": this.data.score,
          "comment": e.detail.value.comment,
          "advice": e.detail.value.advice
        },
        success: function (res) {
          console.log("success" + res.data) // 服务器回包信息
          if (res.data.errCode == '1') {
            wx.redirectTo({
              url: './msg/msg'
            })
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '发送失败，请稍后再试',
            icon: 'success',
            duration: 1500
          })
        }
      })


    }






    // // 请求的包体为 {"a":{"b":[1,2,3],"c":{"d":"test"}}}
    // wx.request({

    //   url: 'http://www.easeway.co:8989/wechat/saveEval',

    //   method: 'POST',

    //   header: { 'content-type': 'application/json' },

    //   data: {
    //     "areaCode": "+86",
    //     "phoneNumber": e.detail.value.phone
    //   },

    //   success: function (res) {
    //     console.log("res:"+res)// 服务器回包信息
    //   }

    // })
  },

  changePhone: function(res){
    wx.navigateTo({
      url: '../login/login?title=更换手机号码',
    })
  }

})