// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    test:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    if (app.globalData.shopId != 0){
      this.setData({ flag:true});
    }
    if (app.globalData.phone == '18303741618'){
      this.setData({ test: true });
    }
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

  earth: function() {
    var app = getApp();
    app.globalData.detailid = 2;
    app.globalData.body = '哈顿星球-地球卡';
    app.globalData.imageNo = 1;
    this.card();
  },
  mars: function () {
    var app = getApp();
    app.globalData.detailid = 3;
    app.globalData.body = '哈顿星球-火星卡';
    app.globalData.imageNo = 2;
    this.card();
  },
  jupiter: function () {
    var app = getApp();
    app.globalData.detailid = 4;
    app.globalData.body = '哈顿星球-木星卡';
    app.globalData.imageNo = 3;
    this.card();
  },
  venus: function () {
    var app = getApp();
    app.globalData.detailid = 5;
    app.globalData.body = '哈顿星球-金星卡';
    app.globalData.imageNo = 4;
    this.card();
  },
  mercury: function () {
    var app = getApp();
    app.globalData.detailid = 6;
    app.globalData.body = '哈顿星球-水星卡';
    app.globalData.imageNo = 5;
    this.card();
  },
  saturn: function () {
    var app = getApp();
    app.globalData.detailid = 7;
    app.globalData.body = '哈顿星球-土星卡';
    app.globalData.imageNo = 6;
    this.card();
  },
  uranus: function () {
    var app = getApp();
    app.globalData.detailid = 8;
    app.globalData.body = '哈顿星球-天王星卡';
    app.globalData.imageNo = 7;
    this.card();
  },

  neptune: function () {
    var app = getApp();
    app.globalData.detailid = 23;
    app.globalData.body = '哈顿星球-日常团购卡_A';
    app.globalData.imageNo = 8;
    this.card();
  },

  sun: function () {
    var app = getApp();
    app.globalData.detailid = 24;
    app.globalData.body = '哈顿星球-节假日团购卡_A';
    app.globalData.imageNo = 9;
    this.card();
  },

  neptuneB: function () {
    var app = getApp();
    app.globalData.detailid = 26;
    app.globalData.body = '哈顿星球-日常团购卡_B';
    app.globalData.imageNo = 2;
    this.card();
  },

  sunB: function () {
    var app = getApp();
    app.globalData.detailid = 27;
    app.globalData.body = '哈顿星球-节假日团购卡_B';
    app.globalData.imageNo = 1;
    this.card();
  },

  neptuneC: function () {
    var app = getApp();
    app.globalData.detailid = 28;
    app.globalData.body = '哈顿星球-日常团购卡_C';
    app.globalData.imageNo = 4;
    this.card();
  },

  sunC: function () {
    var app = getApp();
    app.globalData.detailid = 29;
    app.globalData.body = '哈顿星球-节假日团购卡_C';
    app.globalData.imageNo = 3;
    this.card();
  },

  neptuneD: function () {
    var app = getApp();
    app.globalData.detailid = 30;
    app.globalData.body = '哈顿星球-日常团购卡_D';
    app.globalData.imageNo = 6;
    this.card();
  },

  sunD: function () {
    var app = getApp();
    app.globalData.detailid = 31;
    app.globalData.body = '哈顿星球-节假日团购卡_D';
    app.globalData.imageNo = 5;
    this.card();
  },

  star: function () {
    var app = getApp();
    app.globalData.detailid = 25;
    app.globalData.body = '哈顿星球-测试卡';
    app.globalData.imageNo = 9;
    this.card();
  },

  sunE: function () {
    var app = getApp();
    app.globalData.detailid = 32;
    app.globalData.body = '哈顿星球-节假日团购卡_E';
    app.globalData.imageNo = 6;
    this.card();
  },

  card:function() {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/getCard',
      data: {
        detail_id: app.globalData.detailid,
      },
      method: 'POST',
      success: function (res) {
        var app = getApp();
        app.globalData.cardprice = res.data.PRICE;
        app.globalData.cardtype = res.data.TYPE;
        app.globalData.playnum = res.data.USENUM;
        wx.redirectTo({
          url: '../card/card',
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
      }
    })
  }
})