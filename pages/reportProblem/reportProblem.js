// pages/evaluation/evaluation.js
let app = getApp();
import api from '../../api/api.js' 
let photoUrl = [], photoSize = 0, videoSize = 0, videoUrl = "", i = 0, length = app.globalData.Image.length, failUp = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:app,
    starnum:[0,0,0,0,0],
    type: 8, 
    phoneNumber: '',
    items: [
      { name: 'Screen', value: '屏幕问题', checked: 'true', detail: '屏幕不亮，频闪严重等问题' },
      { name: 'Voice', value: '语音问题', detail: '不播放语音，语音播放卡顿等' },
      { name: 'Mechanial', value: '机械结构问题', detail: '电机停转，结构发出异常声音等' },
      { name: 'Lighting', value: '灯光问题', detail: '灯光不亮等问题'},
      { name: 'App', value: '与APP交互问题', detail: '与手机软件交互问题'},
      { name: 'Internet', value: '网络问题', detail: '多次提示连接服务器，WiFi失败等问题' },
      { name: 'Other', value: '其他问题', detail: '配药机运行卡顿等问题' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    app.globalData = {
      Image: [],
      Video: "",
      scope:0,
    }
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
    this.setData({
      app:app
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

  },
  clickStar: function(e){
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
    // else if (this.data.type < 1) {
    //   wx.showModal({
    //     title: '未进行评星',
    //     content: '请点击4评星，对产品进行总体评价',
    //     // confirmText: "确认",
    //     // cancelText: "辅助操作",
    //     success: function (res) {
    //       console.log(res);
    //       if (res.confirm) {
    //         console.log('用户点击主操作')
    //       } else {
    //         console.log('用户点击辅助操作')
    //       }
    //     }
    //   })
    // }
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
    else{
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      let _this = this
      console.log(app.globalData,app.globalData.reqUrl,i,'app.globalData.Image')
      // return;

      if (app.globalData.Image.length){
        this.img_upload('https://www.easeway.co' + '/wechat/uploadPhotoFile', app.globalData.Image, i, app.globalData.Image.length, e)
      }else{
        _this.Playquest(photoUrl,photoSize,e)
      }
      
    }
    
    // console.log("1.phone:" + e.detail.value.phone);
    // console.log("2.sn:" + e.detail.value.sn);
    // console.log("3.mail:" + e.detail.value.mail);
    // console.log("4.score:" + this.data.score);
    // console.log("5.comment:"+e.detail.value.comment);
    // console.log("6.advice:" + e.detail.value.advice, e);


    // 请求的包体为 {"a":{"b":[1,2,3],"c":{"d":"test"}}}
    

  },
  //上传文件
  Playquest: function (photoUrl,photoSize,e){
    let _this = this;
    if (app.globalData.Video){
      wx.uploadFile({//上传视频
        url: 'https://www.easeway.co' + "/wechat/uploadVideoFile",
        filePath: app.globalData.Video,
        header: {
          'content-type': 'multipart/form-data'
        },
        name: "video",
        success: function (res) {
          let videodata = JSON.parse(res.data).data
          console.log(videodata,'videodata')
          videoUrl = videodata.videoUrl
          videoSize = videodata.videoSize
          _this.PullMsg(photoUrl, photoSize, videoUrl, videoSize,e)
        }
      })
    }else{
      _this.PullMsg(photoUrl, photoSize, "", 0, e)
    }
  },
  PullMsg(photoUrl, photoSize, videoUrl, videoSize, e){
    api.saveFeedBack({
      "areaCode": "+86",
      "phoneNumber": e.detail.value.phone,
      "deviceId": e.detail.value.sn,
      "email": e.detail.value.mail,
      "problemDetail": e.detail.value.comment,
      "type": this.data.type,
      "videoUrl": videoUrl,
      "videoSize": videoSize,
      "photoSize": photoSize,
      "photoUrl": photoUrl.join(","),
    }, (res) => {
      wx.hideLoading()
      if (res.errCode === 1) {
        wx.redirectTo({
          url: './msg/msg'
        })
      }
      console.log("success" + res) // 服务器回包信息
    });
  },
  img_upload: function (url, path, i, length,e) {
    let _this = this;
    wx.uploadFile({
      url: url,
      filePath:path[i],
      header: {
        'content-type': 'multipart/form-data'
      },
      name: "photo",
      success: function (res) {
        let data = JSON.parse(res.data)
        photoUrl.push(data.data.photoUrl)
        photoSize += data.data.photoSize;
      },
      fail: function () {
        failUp++;
      },
      complete: () => {
        i++
        if (i == length) {
          _this.Playquest(photoUrl, photoSize,e)
        }
        else {  //递归调用uploadDIY函数
          _this.img_upload('https://www.easeway.co' +"/wechat/uploadPhotoFile", path,i,length,e);
        }
      },
    })
  },
  radioChange: function (e) {
    this.setData({
      type:Number(e.detail.value)+9
    })
    console.log('radio发生change事件，携带value值为：', e)
  },

  choose_upload: function () {
    wx.navigateTo({
      url: './photoOrVideo/photoOrVideo',
    })
  },
  changePhone: function (res) {
    wx.navigateTo({
      url: '../login/login?title=更换手机号码',
    })
  },

  uploadPhoto: function () {
    wx.navigateTo({
      url: './uploadPhoto/uploadPhoto',
    })
  },
  uploadVideo: function () {
    wx.navigateTo({
      url: './uploadVideo/uploadVideo',
    })
  },

    // var that = this;
    // wx.showActionSheet({
    //   itemList: ['手机相册', '拍摄照片'],
    //   success: function (res) {
    //     if (!res.cancel) {
    //       console.log(res.tapIndex)
    //       if (res.tapIndex == '0') {
    //         wx.chooseImage({
    //           count: 9,
    //           sizeType: ['original', 'compressed'],
    //           sourceType: ['album'],
    //           success(res) {
    //             // tempFilePath可以作为img标签的src属性显示图片
    //             const tempFilePaths = res.tempFilePaths
    //             //启动上传等待中...  
    //             wx.showToast({
    //               title: '正在上传...',
    //               icon: 'loading',
    //               mask: true,
    //               duration: 1000
    //             })
    //             that.setData({
    //               imgSrc: res.tempFilePaths
    //             })
    //           }
    //         })
    //       }
    //       else {
    //         wx.chooseImage({
    //           count: 1,
    //           sizeType: ['original', 'compressed'],
    //           sourceType: ['camera'],
    //           success(res) {
    //             // tempFilePath可以作为img标签的src属性显示图片
    //             const tempFilePaths = res.tempFilePaths
    //           }
    //         })
    //       }
    //     }
    //   }
    // });
})