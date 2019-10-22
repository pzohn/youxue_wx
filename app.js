//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    id:'',
    phone:'',
    name:'',
    sex:0,
    age:0,
    father:'',
    mother:'',
    address:'',
    carddesc:'',
    cardnum:0,
    detailid:0,
    body:'',
    imageNo:0,
    cardtype:0,
    cardprice:0,
    playnum:0,
    shopId:0,
    shop_id:0,
    shop_phone:'',
    shop_name:'',
    shop_address:'',
    shop_user:'',
    balance:0,
    parter_phone:'',
    parter_name:'',
    day_num:0,
    month_num:0,
    total_num:0,
    shop_food:0,
    shop_car:0,
    share_date:'',
    group_parent_num:0,
    group_food_num: 0,
    group_car_num: 0,
    group_class:0,
    loginFlag: false,
    postcard_image_url:'',
    postcard_audio_url:'',
    postcard_id: 0,
    goto_flag:0,
    postcard_code_url: '',
    authority_id:0
  }
})