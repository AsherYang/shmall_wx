import networkUtil from '/util/networkUtil.js';

App({
  onLaunch: function () {
    console.log('App Launch')
    var self = this;
    var url = 'https://shmall.fansdroid.net/get/token'
    networkUtil._get(url,
      function (res) {
        self.globalData.token = res.data;
        console.log("token = " + self.globalData.token);
        self.getAllGoods();   // 异步获取商品
      },
      function (res) {
        console.log("fail , res data= " + res.data + ", url = " + url);
        self.updateToken();
        wx.showToast({
          title: '获取token失败' + res.data,
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
    token: null,

    allGoods: [],       // 所有的商品
  },

  // 更新token
  updateToken: function () {
    console.log('update Token');
    var self = this;
    var updateTokenUrl = 'https://shmall.fansdroid.net/update/token'
    // var updateTokenUrl = 'https://api.vdian.com'
    networkUtil._get(updateTokenUrl,
      function (res) {
        self.globalData.token = res.data;
        console.log("token = " + self.globalData.token);
      },
      function (res) {
        wx.showToast({
          title: '更新token失败' + res.data,
        })
      });
  },

  /**
   * 获取商店内所有商品
   */
  // url = https://api.vdian.com/api?param={"page_num":1,"page_size":10,"orderby":1,"update_start":"2012-11-12 16:36:08","update_end":"2015-11-12 16:36:08","status":1}&public=   {"method":"vdian.item.list.get","access_token":"40be967eabb8057fc7975ed64895b5d900023716b1","version":"1.0","format":"json"}
  // url = https://shmall.fansdroid.net/get/allgoods
  getAllGoods: function () {
    var self = this;
    var allGoodsUrl = "https://shmall.fansdroid.net/get/allgoods";
    // console.log("allGoodsUrl = " + allGoodsUrl);
    networkUtil._get(allGoodsUrl,
      function (res) {
        self.globalData.allGoods = res.data.result;
        console.log("all goods size = " + self.globalData.allGoods.length);
        // self.printAllGoods();
        self.saveGoodsLogic(self.globalData.allGoods);
        // debug for storage
        // wx.getStorage({
        //   key: '83090664',
        //   success: function(res) {
        //     console.log("---- 83090664 storage size = " + res.data.length);
        //   },
        // })
      },
      function (res) {
        console.log("all goods fail data = " + res.data);
      });
  },

  printAllGoods: function () {
    var self = this;
    //console.log('allGoods lenght = ' + self.globalData.allGoods.length + ' , id = ' + self.globalData.allGoods[1]['itemid'] + " , name = " + self.globalData.allGoods[1]['item_name']);
    for (let i = 0; i < self.globalData.allGoods.length; i++) {
      console.log("ii =" + i + ', allGoods lenght = ' + self.globalData.allGoods.length + ' , id = ' + self.globalData.allGoods[i]['itemid'] + " , name = " + self.globalData.allGoods[i]['item_name']);
    }
  },

  // 按商品cate_id当key，来保存商品对应分类下的所有商品集
  saveGoodsLogic: function (allGoodsList) {
    var self = this;
    // 保存category的cate_id为key, 对应分类下的商品集
    var goodsCategoryMap = {};       // map (key:String, value:List)
    for (let i = 0; i < allGoodsList.length; i++) {
      var key = allGoodsList[i].cate_id;
      var everyCategoryList = [];      // list      
      // 是否包含这个category(key) 
      // console.log("cate key = " + goodsCategoryMap.hasOwnProperty(key));
      if (goodsCategoryMap.hasOwnProperty(key)) {
        // 需要把已存在的商品重新添加进来
        var alreadyGoods = goodsCategoryMap[key];
        for (let j = 0; j < alreadyGoods.length; j++) {
          everyCategoryList.push(alreadyGoods[j]);
        }
      } 
      everyCategoryList.push(allGoodsList[i]);
      goodsCategoryMap[key] = everyCategoryList;      
      // console.log("key = " + key + " , len = " + goodsCategoryMap[key].length);
    }
    // 按照key 保存数据进微信
    if (goodsCategoryMap.length != 0) {
      for (var key in goodsCategoryMap) {
        // console.log("key = " + key + " , len = " + goodsCategoryMap[key].length);
        self.saveGoodsByKey(key, goodsCategoryMap[key]);
      }
    }

  },

  // 保存Goods进缓存
  saveGoodsByKey: function (goodsKey, goodsList) {
    // wx.setStorageSync(goodsKey, goodsList);  // 同步存储
    // 异步存储
    wx.setStorage({
      key: goodsKey,
      data: goodsList,
    })
  },
})