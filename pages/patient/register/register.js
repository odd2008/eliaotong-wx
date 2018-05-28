// pages/register/register.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    result: '',
    okFlag: 0,
    userId: '',
    telTrue:""
  },
  //返回
  back: function () { wx.navigateBack({ delta: 1 }) },

  onInputTel: function (e) {
    this.data.item.tel = e.detail.value
    this.setData({ item: this.data.item })
    // 登录手机验证

    if (!(/^1[34578]\d{9}$/.test(this.data.item.tel))) {
      this.setData({
        telTrue: false
      });
      if (this.data.item.tel.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'loading',
          duration: 2000
        })
      }
    } else {
      this.setData({
        telTrue: true
      })
    }
  },
  onInputPatientName: function (e) {
    this.data.item.patientName = e.detail.value
    this.setData({ item: this.data.item })
  },


  //提交
  submit: function (e) {

    var d = this.data.item;
    var u = app.data.userInfo;
    wx.showModal({
      title: '温馨提示',
      content: '为确保服务顺利进行，请提供您的真实手机号',
      success: function (res) {
        if (res.confirm) {
          // 跳转到详细页面
          wx.navigateTo({
            url: '/pages/patient/register/detail/detail',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          
          wx.switchTab({
            url: '/pages/patient/patient',
          })

        }
      },
      complete: function (res) {

        //上传数据
        app.requery({
          fun: 'wx_insertData', tableName: "med_Patient", fields: {
            userId: u.userId,
            tel: d.tel,
            patientName: d.patientName

          }
        });
        console.log("成功");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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