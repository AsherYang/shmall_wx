// page/component/new-pages/user/address/address.js
import networkUtil from '../../../util/networkUtil.js';
var app = getApp();

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
          self.saveUserInfo();
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
    var saveUserUrl = app.globalData.SH_URL + '/save/user';
    var userInfo = {
        userName: self.data.address.name,
        phone: self.data.address.phone,
        address: self.data.address.detail
    };
    // var userInfoJson = JSON.stringify(userInfo);
    // var userInfoPostStr = networkUtil.json2Form(userInfoJson);
    // console.log('userInfo = ' + userInfo.userName + " , userInfoJson = " + userInfoJson + " , userInfoPostStr = " + userInfoPostStr);
    networkUtil._post_form(saveUserUrl, userInfo,
        function(res) {
          console.log(res);
        },
        function(res) {
          console.log(res);
        }
    );
  }
})