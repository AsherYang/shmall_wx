import networkUtil from '../../../util/networkUtil.js';
var app = getApp();

Page({
    data: {
        category: [
          { name: '果味', cate_id:'guowei'},
          { name: '蔬菜', cate_id:'shucai'},
          { name: '炒货', cate_id:'chaohuo'},
          { name: '点心', cate_id:'dianxin'},
          { name: '粗茶', cate_id:'cucha'},
          { name: '淡饭', cate_id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    // url = https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"9882ff6e635aac4740646cf93f2389320007487713","version":"1.0"}
    onReady(){
        var self = this;
        var categoryUrl = 'https://api.vdian.com/api?param={"showNoCate":"0"}&public={"method":"weidian.cate.get.list","access_token":"' + app.globalData.token + '","version":"1.0"}';
        networkUtil._get(categoryUrl,
        function(res) {
          self.setData({category: res.data.result});
        },
        function(res){
          console.log("category fail data = " + res.data);
      });
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
    },
   
})