// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    btnstate: "default",
    account: '',
    password: ''
  },

  login: function () {
    if (this.data.password == "") {
      wx.showModal({
        title: '错误提示',
        content: '密码不能为空!',
      });
      return;
    }
    wx.request({
      url: 'https://www.hattonstar.com/getParterInfo',
      data: {
        phone: this.data.account,
        pass: this.data.password
      },
      method: 'POST',
      success: function (res) {
        if (res.data == 0) {
          wx.showModal({
            title: '错误提示',
            content: '商户未注册,请联系哈顿工作人员进行商户加盟！',
          })
        }
        else if (res.data == 1) {
          wx.showModal({
            title: '错误提示',
            content: '密码错误,请重试!',
            showCancel: false
          })
        }
        else {
          if (res.data.phone != "") {
            var app = getApp();
            app.globalData.parter_phone = res.data.phone;
            app.globalData.parter_name = res.data.name;
            app.globalData.day_num = res.data.day_num;
            app.globalData.month_num = res.data.month_num;
            app.globalData.total_num = res.data.total_num;
            wx.navigateTo({
              url: '../parterinfo/parterinfo',
            })
          }
          else {
            wx.showModal({
              title: '错误提示',
              content: '服务器繁忙，请稍后再试!',
              showCancel: false
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    })
  },
  accountInput: function (e) {
    var content = e.detail.value;
    if (content != '') {
      this.setData({ disabled: false, btnstate: "primary", account: content });
    } else {
      this.setData({ disabled: true, btnstate: "default" });
    }
  },

  pwdBlur: function (e) {
    var password = e.detail.value;
    if (password != '') {
      this.setData({ password: password });
    }
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