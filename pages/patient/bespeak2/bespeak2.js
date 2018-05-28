// pages/book/bespeak2/bespeak2.js
var util = require('../../../utils/util2.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    work:"上班",
    rest:"休息"    
  },
  //  支付 
  costTap:function() {
    wx.showModal({
      title: '支付',
      content: '需支付1.00元手续费用',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success': function (res) {
            },
            'fail': function (res) {
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var time = util.formatTime2(new Date());
      this.setData({
        time: time
      });
    console.log(time);
    console.log(this.data.work);
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})