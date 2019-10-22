Page({
  data: {
    navbar: ['首页', '自然营', '生存营', '科学营', '人文营', '科学营', '周边营', '慕课营'],
    currentTab: 0,
    activity_1: [],
    activity_2: [],
    activity_3: [],
    activity_4: [],
    flag_1: true,
    flag_2: true,
    flag_3: true,
    flag_4: true,
    flag_5: true,
    name:'',
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var loginCode = wx.getStorageSync('phone');
    if (loginCode == "") {
      app.globalData.loginFlag = false;
    } else {
      app.globalData.loginFlag = true;
      app.globalData.phone = loginCode;
    }
    var page = this;
    page.initData(1);
    page.initData(2);
    page.initData(3);
    page.initData(4);
    page.setData({
      flag_1: false
    });

    this.initData1(1, 1);
  },

  initData1: function (id, activity_id) {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/getWxInfoById',
      data: {
        id: id,
        activity_id: activity_id
      },
      method: 'POST',
      success: function (res) {
        var imgUrls = [];
        for (var i in res.data.swiper_pics) {
          var object = new Object();
          object = 'https://www.gfcamps.cn/images/' + res.data.swiper_pics[i];
          imgUrls[i] = object;
        }
        page.setData({
          title: res.data.name,
          imgUrls: imgUrls
        });
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

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/getCampactivitiesForWx',
      data: {
        type_id: id
      },
      method: 'POST',
      success: function (res) {
        var activity = [];
        for (var index in res.data) {
          var object = new Object();
          object.img = 'https://www.gfcamps.cn/images/' + res.data[index].title_pic;
          object.name = res.data[index].name;
          object.id = res.data[index].id;
          object.activity_id = res.data[index].activity_id;
          activity[index] = object;
        }
        if (id == 1){
          page.setData({
            activity_1: activity
          });
        }
        else if (id == 2) {
          page.setData({
            activity_2: activity
          });
        }
        else if (id == 3) {
          page.setData({
            activity_3: activity
          });
        }
        else if (id == 4) {
          page.setData({
            activity_4: activity
          });
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

  typeHandler: function (e) {
    var id = e.currentTarget.dataset.id;
    var activity_id = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&activity_id=' + activity_id
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  accountInput: function (e) {
    var content = e.detail.value;
    this.setData({ name: content });
  },

  resetSearch: function (){
    var name = this.data.name;
    if (this.data.name == '') {
      wx.showModal({
        title: '搜索条件为空',
        content: '请输入关键字!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }
    wx.navigateTo({
      url: '../search/search?name=' + name
    });
  },

  select: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../search/search?id=' + id
    });
  },

  navbarTap:function (e) {
    var page = this;
    var id = e.target.dataset.idx + 1;
    if (id == 1){
      page.setData({
        flag_1: false, flag_2: true, flag_3: true, flag_4: true, flag_5: true, currentTab:id-1
      });
    }
    else if (id == 2) {
      page.setData({
        flag_1: true, flag_2: false, flag_3: true, flag_4: true, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 3) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: false, flag_4: true, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 4) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: true, flag_4: false, flag_5: true, currentTab: id - 1
      });
    }
    else if (id == 5) {
      page.setData({
        flag_1: true, flag_2: true, flag_3: true, flag_4: true, flag_5: false, currentTab: id - 1
      });
    }
  }
})