// page/component/new-pages/user/address/address.js
import networkUtil from '../../../util/networkUtil.js';
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;
    
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })
  },
  formSubmit(){
    var self = this;
    if(self.data.address.name && self.data.address.phone && self.data.address.detail){
      wx.setStorage({
        key: 'address',
        data: self.data.address,
        success(){
          wx.navigateBack();
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  },
  bindName(e){
    this.setData({
      'address.name' : e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      'address.phone' : e.detail.value
    })
  },
  bindDetail(e){
    this.setData({
      'address.detail' : e.detail.value
    })
  },

   /**
   * 保存用户信息
   */
  saveUserInfo:function() {
    var self = this;
    var saveUserUrl = 'https://shmall.fansdroid.net/save/user';
    var userInfo = {};
    networkUtil._post_form(saveUserUrl, userInfo,
        success:function(res) {
        },
        fail:function(res) {
        }
    );
  }
})