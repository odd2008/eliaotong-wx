// pages/work/getNo/getNo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    rowCount:"",
    currNum: null,
    totalQty: null,
    waitQty: null,
    display: "none",
    adDisplay: "",
    isShow:"",
    rankNum:null,
    showModal: false,
  },
  /*  弹窗 */
  showDialogBtn: function () {
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },



  QRtap: function (res) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  registerTap: function (e) {
    var rowCount = this.data.rowCount;
    console.log(rowCount)
    console.log(9999999)
    
    if (rowCount === 0)
      wx.navigateTo({
        url: '/pages/patient/register/register'
      })
    else
      wx.navigateTo({
        url: '/pages/patient/bespeak/bespeak'
      })
  },
  recordTap: function (e) {
    wx.navigateTo({
      url: '/pages/patient/record/record',
    })
  },
  // 当前挂号页面跳转 
  currGuahaoTap:function(){
    wx.navigateTo({
      url: '/pages/doctor/doctor',
    })
  },
   //已诊记录跳转
  hadSeenTap: function () {
    wx.navigateTo({
      url: '/pages/doctor/hadSeen/hadSeen',
    })
  },
  //过号记录跳转
  record1Tap:function(){
    wx.navigateTo({
      url: '/pages/doctor/record1/record1',
    })
  },
  //挂号记录跳转
  ghrecordTap: function () {
    wx.navigateTo({
      url: '/pages/doctor/ghrecord/ghrecord',
    })
  },
  // 帮助挂号
  helpbookTap:function(){
    var that = this;
    var userId = app.data.userId;
    app.requery({ fun: 'wx_getSysDate' }, function (res) {
      var ndate = res;
      app.requery({ fun: 'wx_getSysDateTime' }, function (res) {
        var ntime = res;

        app.requery({
          fun: 'wx_insertData', tableName: "register", fields: {
            doctorid: userId,
            registerid: "1",
            register_date: ndate,
            stype: 1,
            register_time: ntime,
            register_ok: 0,
            register_ok_time: ndate,
            order_ok: 1,
            register_order: 1,
          }
        }, function (res) {
          that.setData({ rankNum: res.data.rowCount + 1 })
          console.log(that.data.rankNum);
        })
      })
    })
    that.setData({
      showModal: true
    })


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.timerRef();
    that.fn();
   
    


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
    var that =this;
    var userId = app.data.userInfo.userId;
    app.requery({
      fun: 'wx_selectData', tableName: "med_Patient", where: "userId='" + userId + "'"
    }, function (res) {
      that.setData({ rowCount: res.data.rowCount })

    })

    if (app.data.userInfo.userType == 0){
      this.setData({isShow:true})
    }else{
      this.setData({isShow:false })
    }
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

  },
  fn: function () {
    var that = this;
    var clinicid = app.data.patient.hospitalId;
    var userId = app.data.userInfo.userId;
    app.requery({
      fun: 'wx_getSysDate'
    }, function (res) {
      var ndate = res;
      app.requery({
        fun: 'wx_selectData', tableName: "med_Patient", where: "userId='" + userId + "'"
      }, function (res) {
        that.setData({ item: res.data.rows[0] })
        app.requery({
          fun: 'wx_selectData', tableName: "register", where: "clinicid='" + clinicid + "'and register_date = '" + ndate + "' and order_ok =1", orderby: "stype desc, register_time"
        },
          function (res) {

            that.setData({ totalQty: res.data.rowCount })
            var n = that.findUser(res.data.rows, userId);
            if (n == -1) {
              that.setData({ display: "none" })
              that.setData({ adDisplay: "" })

            } else {
              that.setData({ adDisplay: "none" })
              that.setData({ display: "" })
            }
            that.setData({ currNum: n + 1 })
            var m = that.findWaitUser(res.data.rows, userId);
            that.setData({ waitQty: m - 1 })
          })
      })
    })

  },

  findUser: function (list, userId) {
    console.log(list);
    for (var i = 0; i < list.length; i++) {
      if (list[i].userid == userId) {
        return i;
      }
    }
    return -1;
  },
  findWaitUser: function (list, userId) {
    console.log(list);
    var k = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].register_ok == 0) {
        k++
      }
      if (list[i].userid == userId) {
        return k;
      }
    }
    return k;
  },
  timerRef: function () {
    var that = this;
    setTimeout(function () {
      that.fn();
      that.timerRef();
    }, 300000)
  }
})