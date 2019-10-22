// pages/company/company.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    btnstate: "default",
    sex: 0
  },

  accountblur: function (e) {
    var content = e.detail.value.replace(/\s+/g, '');
    if (content != "") {
      this.setData({ disabled: false, btnstate: "primary" });
    } else {
      this.setData({ disabled: true, btnstate: "default" });
    }
  },

  radioChange: function (e) {
    var sex = e.detail.value;
    if (sex == "1") {
      this.setData({ sex: 1 });
      console.log(this.data.sex);
    } else {
      this.setData({ sex: 0 });
      console.log(this.data.sex);
    }
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
    if (e.detail.value.age.replace(/\s+/g, '') == "") {
      wx.showModal({
        title: '错误提示',
        content: '请填写孩子年龄！',
        showCancel: false
      });
      return;
    }
    if (e.detail.value.password != e.detail.value.repeatpwd)
    {
      wx.showModal({
        title: '错误提示',
        content: '密码输入的不一致，请重新输入！',
        showCancel: false
      });
      return;
    }
    wx.request({
      url: 'https://www.hattonstar.com/user/save',
      data: {
        type: 'insert',
        PHONE: e.detail.value.phone,
        PASSWORD: e.detail.value.password,
        NAME: e.detail.value.name,
        AGE: e.detail.value.age,
        SEX: this.data.sex,
        FATHER: e.detail.value.father,
        MOTHER: e.detail.value.mother,
        ADDRESS: e.detail.value.address,
        CARDID:0,
        CARDNUM:0
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data == 0) {
          wx.showModal({
            title: '错误提示',
            content: '手机号已经注册，请勿重复注册！',
            showCancel:false
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '注册成功！',
            confirmText: '返回',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../enroll/enroll',
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