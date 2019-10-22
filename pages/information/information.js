// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    disabled1: false,
    phone:'',
    name:'',
    sex:'Girl',
    age:'',
    father:'',
    mother:'',
    address:'',
    carddesc:'无',
    cardnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateInfo();
  },
  
  createcode:function(){
    var app = getApp();
    var phone = app.globalData.phone;
    wx.navigateTo({
      url: '../code/code?phone=' + phone,
    })
  },

  edit:function(){
    wx.navigateTo({
      url: '../edit/edit',
    })
  },

  buy: function () {
    wx.navigateTo({
      url: '../buy/buy',
    })
  },

  update: function () {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/onGetUpdateResult',
      data: {
        PHONE: app.globalData.phone
      },
      method: 'POST',
      success: function (res) {
        if (res.data.PHONE != "") {
          app.globalData.carddesc = res.data.CARDDESC;
          app.globalData.cardnum = res.data.CARDNUM;
          app.globalData.name = res.data.NAME;
          app.globalData.age = res.data.AGE;
          app.globalData.father = res.data.FATHER;
          app.globalData.mother = res.data.MOTHER;
          app.globalData.address = res.data.ADDRESS;
          app.globalData.cardnum = res.data.CARDNUM;
          wx.redirectTo({
            url: '../information/information',
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
                url: '../login/login',
              })
            }
          }
        })
        return;
      }
    })
  },

  updateInfo:function () {
    var app = getApp();
    if (app.globalData.sex == 1) {
      this.setData({ sex: 'Boy' });
    }
    if (app.globalData.carddesc != "") {
      this.setData({ carddesc: app.globalData.carddesc });
    }
    this.setData({ phone: app.globalData.phone });
    this.setData({ name: app.globalData.name });
    this.setData({ age: app.globalData.age });
    this.setData({ father: app.globalData.father });
    this.setData({ mother: app.globalData.mother });
    this.setData({ address: app.globalData.address });
    this.setData({ cardnum: app.globalData.cardnum });
    console.log(app.globalData.cardnum);
    console.log(this.data.cardnum);

    if (app.globalData.cardnum > 0) {
      this.setData({ disabled: true, btnstate: "default",
        disabled1: false, btnstate1: "primary"
       });
    } else {
      this.setData({ disabled: false, btnstate: "primary",
        disabled1: true, btnstate1: "default"
       });
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
  
  }
})