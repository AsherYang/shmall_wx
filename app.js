import networkUtil from '/util/networkUtil.js';

App({
  onLaunch: function () {
    console.log('App Launch')
    var that = this;
    var url = 'https://shmall.fansdroid.net/get/token'
    networkUtil._get(url,
      function (res) {
        that.globalData.token = res.data;
        console.log("token = " + that.globalData.token);
      },
      function (res) {
        console.log("fail , res data= " + res.data + ", url = " + url);
        wx.showToast({
          title: '获取token失败'+res.data,
        })
      });
  },
  onShow: function () {
    console.log('App Show')
  },

  onHide: function () {
    console.log('App Hide')
  },

  globalData: {
    hasLogin: false,
    token: null
  },

// 更新token
  updateToken: function() {
    console.log('update Token');
    var that = this;
    var updateTokenUrl = 'https://shmall.fansdroid.net/update/token'
    // var updateTokenUrl = 'https://api.vdian.com'
    networkUtil._get(updateTokenUrl, 
      function (res){
        that.globalData.token = res.data;
        console.log("token = " + that.globalData.token);
      },
      function (res) {
        wx.showToast({
          title: '更新token失败' + res.data,
        })
      });
  }
})
