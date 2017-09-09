import networkUtil from '../../../util/networkUtil.js';
var app = getApp();

Page({
  data: {
    category: [
      { cate_name: '甘醇美酒', cate_id: '83263088' },
      { cate_name: '饮料净水', cate_id: '83090667' },
      { cate_name: '冷冻冷藏', cate_id: '83090664' },
      { cate_name: '新鲜奶饮', cate_id: '83090668' },
      { cate_name: '充饥饼干', cate_id: '83090665' },
      { cate_name: '干货炒货', cate_id: '83090666' }
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: '83263088'
  },
  // url = https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"9882ff6e635aac4740646cf93f2389320007487713","version":"1.0"}
  // url = https://shmall.fansdroid.net/get/category
  onReady() {
    var self = this;
    self.getCategoryFromNet();
    self.setData({ detail: app.globalData.allGoods});
    console.log("goods in category " + self.data.detail.length);
  },

  getCategoryFromNet: function() {
    // 获取商品分类 category
    var self = this;
    var categoryUrl = 'https://shmall.fansdroid.net/get/category';
    networkUtil._get(categoryUrl,
      function (res) {
        console.log("category = " + res.data.result)
        self.setData({ category: res.data.result });
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

  
})