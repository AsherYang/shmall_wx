Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  callFun(e) {
    console.log('调用call');
    wx.makePhoneCall({
      phoneNumber: '13553831061',
      success: function () {
        console.log('call success');
      },
      fail: function () {
        console.log('call fail');
      }
    })
  }
})