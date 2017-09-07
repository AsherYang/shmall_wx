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
        that.getAllGoods();
      },
      function (res) {
        console.log("fail , res data= " + res.data + ", url = " + url);
        this.updateToken();
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
    allGoodsSize: 0,    // 商品总数
    goodsPageIndex: 1,  // 请求时商品分页
    goodsPageSize: 50,  // 请求时商品每页总数
    getedGoodsSize: 0,  // 已经拿到的商品总数
  },

  /**
   * 商品类, 字段根据微店网络api返回提取
   * 注意：商品分类cate_id,同一个商品可能有不同的cate_id,
   * 此时把它当成不同商品处理，主要是为了后面好根据cate_id拿数据
   */
  good: {
    cate_id: null,    // 商品分类id
    itemid: null,    // 单个商品id
    item_desc: null,  // 商品描述
    item_name: null,  // 商品名称
    imgs: [],         // 商品图片
    price: 0,         // 商品价格
  },

  // 更新token
  updateToken: function () {
    console.log('update Token');
    var that = this;
    var updateTokenUrl = 'https://shmall.fansdroid.net/update/token'
    // var updateTokenUrl = 'https://api.vdian.com'
    networkUtil._get(updateTokenUrl,
      function (res) {
        that.globalData.token = res.data;
        console.log("token = " + that.globalData.token);
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
  getAllGoods: function () {
    var self = this;
    var allGoodsUrl = 'https://api.vdian.com/api?param={"page_num":' + self.globalData.goodsPageIndex + ',"page_size":' + self.globalData.goodsPageSize + ',"orderby":1}&public={"method":"vdian.item.list.get","access_token":"' + self.globalData.token + '","version":"1.0","format":"json"}';
    // console.log("allGoodsUrl = " + allGoodsUrl);
    networkUtil._get(allGoodsUrl,
      function (res) {
        let currentPageSize = res.data.result['item_num'];
        self.globalData.allGoodsSize = res.data.result['total_num'];
        self.globalData.getedGoodsSize = self.globalData.getedGoodsSize + currentPageSize;
        // console.log("Goods server total num = " + res.data.result['total_num'] + ", allGoodSize = " + self.globalData.allGoodsSize + " , currentPageSize = " + currentPageSize + " , getedGoodsSize = " + self.globalData.getedGoodsSize);

        let pageItems = res.data.result['items']
        for (let i = 0; i < pageItems.length; i++) {
          // console.log('pageItems = ' + pageItems[i]['item_name'] + " , cateId = " + pageItems[i]['cates'][0]['cate_id']);
          let cates = pageItems[i]['cates']
          for (let j = 0; j < cates.length; j++) {
            console.log('pageItems name = ' + pageItems[i]['item_name'] + " , cateId = " + cates[j]['cate_id']);
            self.good.cate_id = cates[j]['cate_id'];
            self.good.itemid = pageItems[i]['itemid'];
            self.good.item_desc = pageItems[i]['item_desc'];
            self.good.item_name = pageItems[i]['item_name'];
            self.good.imgs = pageItems[i]['imgs'];
            self.good.price = pageItems[i]['price'];
          }
          self.globalData.allGoods.push(self.good);
        }
        // console.log('allGoods lenght = ' + self.globalData.allGoods.length  +' , id = ' + self.globalData.allGoods[1]['itemid'] + " , name = " + self.globalData.allGoods[1]['item_name']);
        for (let i = 0; i < self.globalData.allGoods.length; i++) {
          console.log('allGoods lenght = ' + self.globalData.allGoods.length + ' , id = ' + self.globalData.allGoods[i]['itemid'] + " , name = " + self.globalData.allGoods[i]['item_name']);
        }

        if (self.globalData.allGoodsSize - self.globalData.getedGoodsSize > 0) {
          console.log("please get goods continue! ");
          self.globalData.goodsPageIndex++;
          self.getAllGoods();
        } else {
          console.log("no more get goods! ");
        };
      },
      function (res) {
        console.log("category fail data = " + res.data);
      });
  },

})
