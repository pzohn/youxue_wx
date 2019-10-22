Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_one_price:0,
    card_two_price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      card_one_price: app.globalData.card_one_price,
      card_two_price: app.globalData.card_two_price
    });
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

  earth: function () {
    var app = getApp();
    app.globalData.detailid = 1;
    app.globalData.body = '哈顿日常卡';
    app.globalData.imageNo = 1;
    this.card(); 
  },

  jupiter: function () {
    var app = getApp();
    app.globalData.detailid = 2;
    app.globalData.body = '哈顿节假日卡';
    app.globalData.imageNo = 6;
    this.card();
  },

  card: function () {
    wx.redirectTo({
      url: '../shopcard/shopcard',
    });
  }
})