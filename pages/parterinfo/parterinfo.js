// pages/parterinfo/parterinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parter_phone:'',
    parter_name:'',
    day_num:0,
    month_num:0,
    total_num:0,
  },
  
  update: function () {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/getParter',
      data: {
        phone: app.globalData.parter_phone
      },
      method: 'POST',
      success: function (res) {
        if (res.data.phone != "") {
          app.globalData.day_num = res.data.day_num;
          app.globalData.month_num = res.data.month_num;
          app.globalData.total_num = res.data.total_num;
          wx.redirectTo({
            url: '../parterinfo/parterinfo',
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请重新登录',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../parterlogin/parterlogin',
              })
            }
          }
        })
        return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    console.log(app);
    this.setData({ parter_phone: app.globalData.parter_phone,
      parter_name: app.globalData.parter_name,
      day_num: app.globalData.day_num,
      month_num: app.globalData.month_num,
      total_num: app.globalData.total_num, });
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
  
  }
})