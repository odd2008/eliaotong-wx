
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    state: true,
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

    var that = this;
    var userId = app.data.userId;
    app.requery({ fun: 'wx_selectData', tableName: "register", where: "userid='" + userId + "' and register_ok =  '" + "0" + "'" }, function (res) {
      app.requery({ fun: 'wx_selectData', tableName: "med_Patient", where: " userid ='" + userId + "' " }, function (res) {

        console.log(res.data.rows.length)
        that.setData({ length: res.data.rows.length })
        that.setData({ list: res.data.rows })
        that.setData({ listOld: res.data.rows })
        that.setData({ currRecNo: 0 })

      })

    })



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