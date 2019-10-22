Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageName: '',
    money:0
  },
  pay: function () {
    var sMoney = this.data.money + "";
    var content = '确定充值' + sMoney + '元?';
    var body = '商铺充值' + sMoney + '元';
    var money = this.data.money;
    wx.showModal({
      title: '提示',
      content: content,
      confirmText: '充值',
      success: function (res) {
        if (res.confirm) {
          wx.login({
            success: res => {
              var code = res.code;
              var app = getApp();
              if (app.globalData.shop_phone == '') {
                wx.showModal({
                  title: '用户未登录',
                  content: '用户未登录或登录超时，请重新登录',
                  confirmText: '重新登录',
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../shoplogin/shoplogin',
                      })
                    }
                  }
                });
                return;
              }
              if (money == 0) {
                wx.showModal({
                  title: '充值为0元',
                  content: '充值为0元，请重新填写',
                  confirmText: '重新填写',
                });
                return;
              }
              if (code) {
                wx.request({
                  url: 'https://www.hattonstar.com/onPayShop',
                  data: {
                    js_code: code,
                    body: body,
                    detail_id: 101,
                    phone: app.globalData.shop_phone,
                    shop_id: 0,
                    name: app.globalData.shop_name,
                    money: money
                  },
                  method: 'POST',
                  success: function (res) {
                    wx.requestPayment(
                      {
                        'timeStamp': res.data.timeStamp,
                        'nonceStr': res.data.nonceStr,
                        'package': res.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.paySign,
                        'success': function (res) {
                          wx.request({
                            url: 'https://www.hattonstar.com/getShopNopass',
                            data: {
                              phone: app.globalData.shop_phone
                            },
                            method: 'POST',
                            success: function (res) {
                              if (res.data.phone != "") {
                                var app = getApp();
                                app.globalData.balance = res.data.balance;
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
                          wx.showModal({
                            title: '支付成功',
                            content: '支付成功，欢迎加盟哈顿星球!',
                            success: function (res) {
                              if (res.confirm) {
                                wx.redirectTo({
                                  url: '../shopinfo/shopinfo',
                                })
                              }
                            }
                          })
                        },
                        'fail': function (res) {
                        },
                        'complete': function (res) {
                        }
                      })
                  },
                  fail: function (res) {
                  }
                })
              }
            }
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imageNo = 1;
    var name = '/images/list/star' + imageNo + '.jpg';
    this.setData({
      imageName: name
    });
  },

  bindkeyboard:function(e) {
    this.setData({
      money: e.detail.value
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