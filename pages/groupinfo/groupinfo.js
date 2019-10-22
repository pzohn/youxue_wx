Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    name: '',
    parent_num: 0,
    food_num: 0,
    car_num: 0,
    group_name: '',
    date: '',
    group_class:0
  },

    call:function(){
      wx.redirectTo({
        url: '../shopcallme/shopcallme',
      })
    },

    init: function () {
      var app = getApp();
      this.setData({ 
        phone: app.globalData.phone,
        name: app.globalData.name,
        parent_num: app.globalData.group_parent_num,
        food_num: app.globalData.group_food_num,
        car_num: app.globalData.group_car_num,
        group_name: app.globalData.shop_name,
        date: app.globalData.share_date,
        group_class: app.globalData.group_class
       });
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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