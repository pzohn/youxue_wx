var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    playHidden: false,
    src: ''
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
    var page = this;
    page.innerAudioContext = wx.createInnerAudioContext(); 
    var voicePath = app.globalData.postcard_audio_url;
    console.log(voicePath); 
    page.innerAudioContext.src = voicePath;
    page.innerAudioContext.play();
    wx.setInnerAudioOption({
      obeyMuteSwitch: false,
      success:function(e){

      },
      fail:function(e){

      }
    });
    page.innerAudioContext.onPlay((res) => {
      page.setData({ loadingHidden:false,
        playHidden: true})
    })   
    page.innerAudioContext.onEnded((res) => {
      page.setData({ 
        playHidden: false,
        loadingHidden: true
        }) 
       })
  },

  play:function() {
    var page = this;
    page.innerAudioContext.play();
  },

  code: function () {
    wx.navigateTo({
      url: '../sharepage/sharepage?postid=' + app.globalData.postcard_id,
    })
  },

  share: function () {
    wx.navigateTo({
      url: '../shareimage/shareimage',
    })
  },
  /**
   * 生s命周期函数--监听页面显示
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
    this.setData({
      loadingHidden: false
    });
    var that = this;
    wx.request({
      url: 'https://www.geekxz.com/action/works/recWorks',
      data: {
        num: '5',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.works);
        that.setData({
          recWorks: res.data.data.works,
        })
      },
      complete: function () {        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh()      //停止下拉刷新
      }
    })
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      });
    }, 2000);
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
