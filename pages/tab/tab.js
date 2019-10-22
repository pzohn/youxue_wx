const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[
            {
                text: '首页'
            },
            {
              text: '蘑法食育'
            },
            {
              text: '探索课堂'
            },
            {
              text: '星创意'
            },
            {
              text: '田园营期'
            },
            {
              text: '亲子Culb'
            },
            {
              text: '未来营会'
            }
        ],
        currentTab: 0,
        navScrollLeft: 0,
        activity_1: [],
        activity_2: [],
        activity_3: [],
        activity_4: [],
        flag_1: true,
        flag_2: true,
        flag_3: true,
        flag_4: true,
        flag_5: true,
        name: '',
        imgUrls: [],
        indicatorDots: true, //是否显示面板指示点
        autoplay: true, //是否自动切换
        interval: 3000, //自动切换时间间隔,3s
        duration: 1000, //  滑动动画时长1s
        recommend: [],
        hotrec: []
    },
    //事件处理函数
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })  

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
      this.initData2(); 
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
          console.log(object);
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
        if (id == 1) {
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

  initData2: function (){
    var page = this;
    var recommend = [];
    var hotrec = [];
    for (let i = 0; i < 6; ++i){
      var object = new Object();
      object.url = 'https://www.gfcamps.cn/images/lunbo/guanniao.jpg';
      object.title = '胡斌';
      object.price = 12 + '元/天';
      object.id = i;
      recommend[i] = object;
      hotrec[i] = object;
    }
    page.setData({
      recommend: recommend,
      hotrec: hotrec
    });
  },

    switchNav(event){
        var cur = event.currentTarget.dataset.current; 
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })      
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event){
        var cur = event.detail.current;
        var singleNavWidth = this.data.windowWidth / 5;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth
        });

      var page = this;
      var id = cur + 1;
      console.log(event);
      if (id == 1) {
        page.setData({
          flag_1: false, flag_2: true, flag_3: true, flag_4: true, flag_5: true, currentTab: id - 1
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