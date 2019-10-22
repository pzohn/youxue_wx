Page({
  data: {
    goods: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0,
    flag:0,
    casArray: [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
    casIndex: 0,
  },
  onLoad: function () {
    this.initGoods();
    this.loadGoods();
  },

  bindCasPickerChange: function (e) {
    var app = getApp();
    app.globalData.group_class = this.data.casArray[e.detail.value];
    this.setData({
      casIndex: e.detail.value
    })

  },

  initGoods:function() {
    var app = getApp();
    var goods = new Array();
    var good = new Object();
    good.id = "0"
    good.pic = '/images/order/1.jpg';
    good.name = '儿童票';
    good.price = '1.00';
    good.count = 1;
    good.check = 1;
    goods[0] = good;

    var good1 = new Object();
    good1.id = "1"
    good1.pic = '/images/order/2.jpg';
    good1.name = '成人票';
    good1.price = '1.00';
    good1.count = 1;
    good1.check = 1;
    goods[1] = good1;

    var good2 = new Object();
    good2.id = "2";
    good2.pic = '/images/order/3.jpg';
    good2.name = '餐饮';
    good2.price = app.globalData.shop_food + ".00";
    good2.count = 1;
    good2.check = 1;
    goods[2] = good2;

    var good3 = new Object();
    good3.id = "3";
    good3.pic = '/images/order/4.jpg';
    good3.name = '组团乘车';
    good3.price = app.globalData.shop_car + ".00";;
    good3.count = 1;
    good3.check = 1;
    goods[3] = good3;

    app.globalData.group_class = 0;
    wx.setStorageSync('goods', goods);
  },

  loadGoods: function () {
    var goods = wx.getStorageSync("goods");
    var totalPrice = 0;
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.check == 1){
          totalPrice += good.price * good.count;
      }
    }
    this.setData({ goods: goods, totalPrice: totalPrice });
  },

  checkboxChange: function (e) {
    var ids = e.detail.value;
    if (ids.length == 0) {
      this.setData({ selectedAll: false, totalPrice: 0, firstCheck: false});
    } else {
      var goods = wx.getStorageSync("goods");
      var totalPrice = 0;
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        var bCheck = false;
        for (var j = 0; j < ids.length; j++) {
          if (good.id == ids[j]) {
            bCheck = true;
          }
        }
        if (bCheck == true){
          good.check = 1;
        }else{
          good.check = 0;
        }
        for (var j = 0; j < ids.length; j++) {
          if (good.id == ids[j]) {
            totalPrice += good.price * good.count;
          }
        }
      }
      wx.setStorageSync('goods', goods);
      this.setData({ totalPrice: totalPrice });
    }
  },

  checkAll: function (e) {
    var goods = wx.getStorageSync("goods");
    var selected = this.data.selected;
    var result = selected == true ? false : true;
    this.setData({ selected: result });
    if (result == false) {
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        good.check = 0;
      }
      wx.setStorageSync('goods', goods);
      this.setData({ totalPrice: 0});
    } else {
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        good.check = 1;
      }
      wx.setStorageSync('goods', goods);
      this.loadGoods();
    }
  },

  addGoods: function (e) {
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == id) {
        good.count = good.count + 1;
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  },

  minusGoods: function (e) {
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == id) {
        var count = good.count;
        if (count >= 2) {
          good.count = good.count - 1;
        }
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  },

  account:function(){
    var goods = wx.getStorageSync("goods");
    var goodFirst = goods[0];
    if (goodFirst.check == 0){
      wx.showModal({
        title: '错误提示',
        content: '请为孩子选择儿童票!',
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }else
    {
      this.pay();
    }
  },

  makeBody:function(){
    var goods = wx.getStorageSync("goods");
    var body = "";
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.check == 1) {
        body += good.count;
      }else{
        body += 0;
      }
      if (i < goods.length -1){
        body += "@";
      }
    }
    var app = getApp();
    app.globalData.body = body + "@" + app.globalData.group_class;
  },

  gotoInfo:function(){
    var app = getApp();
    if (app.globalData.phone != '') {
      wx.request({
        url: 'https://www.hattonstar.com/getGroup',
        data: {
          phone: app.globalData.phone
        },
        method: 'POST',
        success: function (res) {
            app.globalData.group_parent_num = res.data.parent_num;
            app.globalData.group_food_num = res.data.food_num;
            app.globalData.group_car_num = res.data.car_num;
            app.globalData.shop_name = res.data.name;
            app.globalData.group_class = res.data.group_class;
            wx.redirectTo({
              url: '../groupinfo/groupinfo',
            })
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
  },

  pay: function () {
    var myThis = this;
    wx.login({
      success: res => {
        var code = res.code;
        var app = getApp();
        var totalPrice = this.data.totalPrice;
        this.makeBody();
        if (app.globalData.phone != '') {
          wx.request({
            url: 'https://www.hattonstar.com/IsUnUse',
            data: {
              phone: app.globalData.phone
            },
            method: 'POST',
            success: function (res) {
              if (res.data ==1) {
                wx.showModal({
                  title: '已参加过团购',
                  content: '已参加过团购，请勿重复购买',
                  confirmText: '返回',
                  showCancel:false
                });
                return;
              }
              else {
                if (code) {
                  wx.request({
                    url: 'https://www.hattonstar.com/onPayGroup',
                    data: {
                      js_code: code,
                      body: app.globalData.body,
                      detail_id: 0,
                      phone: app.globalData.phone,
                      shop_id: app.globalData.shop_id,
                      name: app.globalData.name,
                      money: totalPrice
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
                            wx.showModal({
                              title: '支付成功',
                              content: '支付成功，欢迎开启哈顿星球畅玩之旅!',
                              showCancel:false,
                              success: function (res) {
                                myThis.gotoInfo();
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
  }
})