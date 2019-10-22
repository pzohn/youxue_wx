// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (e) {
    if (e.detail.value.name.replace(/\s+/g, '') == "") {
      wx.showModal({
        title: '错误提示',
        content: '请填写孩子姓名！',
        showCancel: false
      });
      return;
    }
    wx.request({
      url: 'https://www.hattonstar.com/resetPass',
      data: {
        type: 'update',
        PHONE: e.detail.value.phone,
        NAME: e.detail.value.name,
      },
      method: 'POST',
      success: function (res) {
        if (res.data == 0) {
          wx.showModal({
            title: '错误提示',
            content: '孩子姓名与注册电话不一致，请重新填写！',
            showCancel: false
          })
        }
        else if (res.data == 1){
          wx.showModal({
            title: '提示',
            content: '恢复初始密码，初始密码：000000',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      },
    })
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