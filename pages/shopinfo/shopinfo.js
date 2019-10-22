Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    name: '',
    user: '',
    address: '',
    balance: 0,
    food:0,
    car:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateInfo();
  },

  createcode: function () {
    var app = getApp();
    var phone = app.globalData.shop_phone;
    wx.navigateTo({
      url: '../code/code?phone=' + phone,
    })
  },

  callme: function () {
    wx.redirectTo({
      url: '../callme/callme',
    })
  },

  share: function () {
    wx.redirectTo({
      url: '../shopprice/shopprice',
    })
  },

  price: function () {
    wx.navigateTo({
      url: '../shopprice/shopprice',
    })
  },

  buy: function () {
    wx.redirectTo({
      url: '../shopcard/shopcard',
    })
  },

  update: function () {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/flashShop',
      data: {
        phone: app.globalData.shop_phone
      },
      method: 'POST',
      success: function (res) {
        if (res.data.phone != "") {
          app.globalData.shop_name = res.data.name;
          app.globalData.shop_user = res.data.user;
          app.globalData.shop_id = res.data.id;
          app.globalData.balance = res.data.balance;
          app.globalData.shop_address = res.data.address;
          app.globalData.shop_food = res.data.food;
          app.globalData.shop_car = res.data.car;
          app.globalData.share_date = res.data.share_date;
          wx.redirectTo({
            url: '../shopinfo/shopinfo',
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
                url: '../shoplogin/shoplogin',
              })
            }
          }
        })
        return;
      }
    })
  },

  updateInfo: function () {
    var app = getApp();
    this.setData({ phone: app.globalData.shop_phone });
    this.setData({ name: app.globalData.shop_name });
    this.setData({ user: app.globalData.shop_user });
    this.setData({ balance: app.globalData.balance });
    this.setData({ address: app.globalData.shop_address });
    this.setData({ food: app.globalData.shop_food });
    this.setData({ car: app.globalData.shop_car });
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