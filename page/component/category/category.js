import networkUtil from '../../../util/networkUtil.js';
var app = getApp();

Page({
  data: {
    category: [
      { cate_name: '甘醇美酒果味', cate_id: '83263088' },
      { cate_name: '饮料净水', cate_id: '83090667' },
      { cate_name: '冷冻冷藏', cate_id: '83090664' },
      { cate_name: '新鲜奶饮', cate_id: '83090668' },
      { cate_name: '充饥饼干', cate_id: '83090665' },
      { cate_name: '干货炒货', cate_id: '83090666' }
    ],
    detail: [],
    allGoods: [],
    allGoodsSize: 0,
    goodsPageIndex: 1,
    goodsPageSize: 50,
    curIndex: 0,
    isScroll: false,
    toView: '83263088'
  },
  // url = https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"9882ff6e635aac4740646cf93f2389320007487713","version":"1.0"}
  onReady() {
    // 获取商品分类 category
    var self = this;
    var categoryUrl = 'https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"' + app.globalData.token + '","version":"1.0"}';
    networkUtil._get(categoryUrl,
      function (res) {
        console.log("category = " + res.data.result)
        self.setData({ category: res.data.result });
        self.getAllGoods();
      },
      function (res) {
        console.log("category fail data = " + res.data);
      });
  },
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index
    })
  },


  /**
   * 获取商店内所有商品
   */
  // url = https://api.vdian.com/api?param={"page_num":1,"page_size":10,"orderby":1,"update_start":"2012-11-12 16:36:08","update_end":"2015-11-12 16:36:08","status":1}&public=   {"method":"vdian.item.list.get","access_token":"40be967eabb8057fc7975ed64895b5d900023716b1","version":"1.0","format":"json"}
  getAllGoods() {
    var self = this;
    var allGoodsUrl = 'https://api.vdian.com/api?param={"page_num":' + self.data.goodsPageIndex + ',"page_size":' + self.data.goodsPageSize +',"orderby":1}&public={"method":"vdian.item.list.get","access_token":"' + app.globalData.token + '","version":"1.0","format":"json"}';
    console.log("allGoodsUrl = " + allGoodsUrl);
    networkUtil._get(allGoodsUrl,
      function (res) {
        self.setData({ allGoodsSize: res.data.result['total_num']})
        let currentPageSize = res.data.result['item_num']
        console.log("Goods = " + res.data.result['total_num'] + ", allGoodSize = " + self.data.allGoodsSize + " , currentPageSize = " + currentPageSize)
        // self.setData({ detail: res.data.result});
      },
      function (res) {
        console.log("category fail data = " + res.data);
      });
  },
  
})