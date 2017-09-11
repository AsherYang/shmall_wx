import networkUtil from '../../../util/networkUtil.js';
var app = getApp();

Page({
  data: {
    category: [
      // { cate_name: '甘醇美酒', cate_id: '83263088' },
      // { cate_name: '饮料净水', cate_id: '83090667' },
      // { cate_name: '冷冻冷藏', cate_id: '83090664' },
      // { cate_name: '新鲜奶饮', cate_id: '83090668' },
      // { cate_name: '充饥饼干', cate_id: '83090665' },
      // { cate_name: '干货炒货', cate_id: '83090666' }
    ],
    detail: [],
    curIndex: 0,
    isScroll: true,
    // toView 暂时没用到20170911
    toView: null,
    curCateId: null,
    scroll_top: 0,
  },

  // url = https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"9882ff6e635aac4740646cf93f2389320007487713","version":"1.0"}
  // url = https://shmall.fansdroid.net/get/category
  onReady() {
    var self = this;
    // 从网络拿数据
    self.getCategoryFromNet();
  },

  // 从网络拿商品分类
  getCategoryFromNet: function() {
    // 获取商品分类 category
    var self = this;
    var categoryUrl = 'https://shmall.fansdroid.net/get/category';
    networkUtil._get(categoryUrl,
      function (res) {
        console.log("category from net = " + res.data.result)
        self.setData({ category: res.data.result, toView: res.data.result[0].cate_id, curCateId: res.data.result[0].cate_id });
        // 拿第一条category 的商品
        console.log("category from net toView = " + self.data.toView);
        self.getGoodsFromStorageByCateId(self.data.curCateId);
      },
      function (res) {
        console.log("category form net fail data = " + res.data);
      });
  },

  // 切换 TAB
  switchTab(e) {
    var self = this;
    this.setData({
      toView: e.target.dataset.id,
      curCateId: e.target.dataset.id,
      curIndex: e.target.dataset.index,
    });
    // console.log("switchTab curCateId = " + self.data.curCateId + " , e dataset id = " + e.target.dataset.id);
    self.getGoodsFromStorageByCateId(self.data.curCateId);
    self.goTop(e);
  },

  // 返回顶部
  goTop:function(e) {
    var self = this;
    //发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断 
    var top = self.data.scroll_top; 
    if (top == 1) {
      top = 0;
    } else {
      top = 1;
    }
    self.setData({ scroll_top: top});
    // console.log("scrollTop = " + self.data.scroll_top);
  },

  getGoodsFromStorageByCateId: function (cateId) {
    var self = this;
    wx.getStorage({
      key: cateId,
      success: function (res) {
        // console.log("getGoodsFromStorageByCateId cateId = " + cateId + " , res = " + res.data);
        self.setData({ detail: res.data, toView:res.data[0].cate_name });
      },
    })
  },

})