var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food:0,
    car:0,
    date:'',
    sqldate:''
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  formSubmit: function (e) {
    if (e.detail.value.food.replace(/\s+/g, '') == 0) {
      wx.showModal({
        title: '错误提示',
        content: '餐费不能为0！',
        showCancel: false
      });
      return;
    }
    if (e.detail.value.car.replace(/\s+/g, '') == 0) {
      wx.showModal({
        title: '错误提示',
        content: '车费不能为0！',
        showCancel: false
      });
      return;
    }
    this.setData({ food: e.detail.value.food.replace(/\s+/g, '') });
    this.setData({ car: e.detail.value.car.replace(/\s+/g, '') });

    var myThis = this;
    wx.showModal({
      title: '组团配置',
      content: '请确定组团设定是否正确?',
      success: function (res) {
        if (res.confirm) {
          myThis.save();
        }
      }
    });
  },

  save:function (){
    var app = getApp();
    var food = this.data.food;
    var car = this.data.car;
    var date = this.data.date;
    wx.request({
      url: 'https://www.hattonstar.com/updateFoodandCar',
      data: {
        id: app.globalData.shop_id,
        food: food,
        car: car,
        date: date
      },
      method: 'POST',
      success: function (res) {
        app.globalData.shop_food = res.data.food;
        app.globalData.shop_car = res.data.car;
        app.globalData.share_date = res.data.share_date;
        wx.redirectTo({
          url: '../shopshare/shopshare',
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请重新登录',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../shoplogin/shoplogin',
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
    this.setData({ food: app.globalData.shop_food });
    this.setData({ car: app.globalData.shop_car });

    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE, sqldate: app.globalData.share_date
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

  }
})