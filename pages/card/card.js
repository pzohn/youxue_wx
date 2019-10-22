Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageName:'',
    cardprice:0,
    cardtime:'',
    playnum:0,
    notice:'此卡为儿童专属'
  },
  pay:function() {
    wx.login({
      success: res => {
        var code = res.code;
        var app = getApp();
        console.log(app);
        if (app.globalData.detailid == 0){
          wx.showModal({
            title: '错误提示',
            content: '商品订购出错，请重新订购',
            confirmText: '重新订购',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../buy/buy',
                })
              }
            }
          });
          return;
        }
        if (app.globalData.phone == '') {
          wx.showModal({
            title: '用户未登录',
            content: '用户未登录或登录超时，请重新登录',
            confirmText: '重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          });
          return;
        }
        if (app.globalData.phone != '') {
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
                if (app.globalData.cardnum != 0) {
                  wx.showModal({
                    title: '游玩卡有剩余',
                    content: '游玩卡还有剩余次数，请消费完再购买',
                    confirmText: '返回刷新',
                    success: function (res) {
                      if (res.confirm) {
                        wx.redirectTo({
                          url: '../information/information',
                        })
                      }
                    }
                  });
                  return;
                }
                else{
                  if (code) {
                    wx.request({
                      url: 'https://www.hattonstar.com/onPay',
                      data: {
                        js_code: code,
                        body: app.globalData.body,
                        detail_id: app.globalData.detailid,
                        phone: app.globalData.phone,
                        shop_id: app.globalData.shopId,
                        name: app.globalData.name
                      },
                      method: 'POST',
                      success: function (res) {
                        console.log(res);
                        wx.requestPayment(
                          {
                            'timeStamp': res.data.timeStamp,
                            'nonceStr': res.data.nonceStr,
                            'package': res.data.package,
                            'signType': 'MD5',
                            'paySign': res.data.paySign,
                            'success': function (res) {

                              wx.request({
                                url: 'https://www.hattonstar.com/onGetUpdateResult',
                                data: {
                                  PHONE: app.globalData.phone
                                },
                                method: 'POST',
                                success: function (res) {
                                  if (res.data.PHONE != "") {
                                    var app = getApp();
                                    app.globalData.carddesc = res.data.CARDDESC;
                                    app.globalData.cardnum = res.data.CARDNUM;
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

                              wx.showModal({
                                title: '支付成功',
                                content: '支付成功，欢迎开启哈顿星球畅玩之旅!',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.redirectTo({
                                      url: '../information/information',
                                    })
                                  }
                                }
                              })
                            },
                            'fail': function (res) {
                              console.log(2);
                            },
                            'complete': function (res) {
                            }
                          })
                      },
                      fail: function (res) {
                        console.log(res);
                      }
                    })
                  }
                }
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
        }
      }
    })
  },

  rechoose: function () {
    console.log("rechoose");
    var app = getApp();
    app.globalData.imageNo = 0;
    app.globalData.cardtype = 0;
    app.globalData.cardprice = 0;
    app.globalData.cardtype = 0;
    wx.redirectTo({
      url: '../buy/buy',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var imageNo = app.globalData.imageNo;
    var type = app.globalData.cardtype;
    var typetime = '';
    if (type == 1) {
      typetime = '9:00-13:00或13:30-17:30';
    } else if (type == 2) {
      typetime = '9:00-17:30';
    } else if (type == 3) {
      typetime = '11:00-13:00或15:30-17:30';
    }
    var name = '/images/list/star' + imageNo + '.jpg';
    this.setData({
      imageName: name, cardprice: app.globalData.cardprice,
      playnum: app.globalData.playnum, cardtime: typetime
    });
    var detail_id = app.globalData.detailid;
    if (detail_id == 23 || detail_id == 24){
      this.setData({ notice:'此卡包含一个大人一个小孩',
        cardtime: '9:00-17:30 节假日使用'});
    }
    else if (detail_id == 28 || detail_id == 29) {
      this.setData({ notice: '此卡包含两个大人一个小孩',
        cardtime: '9:00-17:30 节假日使用'});
    }
    else if (detail_id == 30 || detail_id == 31) {
      this.setData({ notice: '此卡包含三个大人一个小孩',
        cardtime: '9:00-17:30 节假日使用' });
    }
    else if (detail_id == 32) {
      this.setData({ notice: '此卡包含四个大人一个小孩',
        cardtime: '9:00-17:30 节假日使用' });
    }
    else if (detail_id == 27) {
      this.setData({cardtime: '9:00-17:30 节假日使用'});
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