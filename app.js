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
        for (let i = 0; i < self.globalData.allGoods.length; i++) {
          self.saveGoodsLogic(self.globalData.allGoods[i]);
          // debug for storage
          // var listTmp = wx.getStorageSync(self.globalData.allGoods[i].cate_id);
          // if (listTmp) {
          //   console.log(">>>>  cate_id = " + self.globalData.allGoods[i].cate_id + " , itemName = " + self.globalData.allGoods[i].item_name + " , list size = " + listTmp.length + " <<<<< ");
          // }
        }
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
  saveGoodsLogic: function (goods) {
    var self = this;
    // 先从缓存中取出数据,若不存在该key 缓存，则直接存储，
    // 若存在key 缓存数据，则将数据拿出后加上新数据再一起存储.
    // console.log("data === " + goods.cate_id + " , itemName = " + goods.item_name);
    var dataListTmp = new Array();
    var hasContaint = false;
    try {
      var goodsList = wx.getStorageSync(goods.cate_id);
      if (goodsList) {
        for (let i = 0; i < goodsList.length; i++) {
          if (goodsList[i].itemid == goods.itemid) {
            hasContaint = true;
          }
          dataListTmp.push(goodsList[i]);
        }
        if (!hasContaint) {
          dataListTmp.push(goods);
        }
      } else {
        dataListTmp.push(goods);
      }
      self.saveGoodsByKey(goods.cate_id, dataListTmp);
    } catch (e) {
      console.log("eeeee e = " + e);
      dataListTmp.push(goods)
      self.saveGoodsByKey(goods.cate_id, dataListTmp);
    }

  },

  // 保存Goods进缓存
  saveGoodsByKey: function (goodsKey, goodsList) {
    wx.setStorageSync(goodsKey, goodsList);
  },
})