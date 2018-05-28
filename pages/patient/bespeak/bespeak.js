// pages/book/bespeak/bespeak.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    btnText:"预约"
  },
    bespeakTap:function (o) {
      var that = this;
      var id = o.currentTarget.id;
      app.requery({ fun: 'wx_getSysDate'}, function (res) {
        var ndate = res;
        app.requery({ fun: 'wx_getSysDateTime' }, function (res) {
          var ntime = res;
          that.insertResgiter(ndate, ntime, id);

        })
      })
      
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = app.data.userInfo.userId;

    if (app.data.patient.hospitalId == null){
      app.requery({
        fun: 'wx_selectData', tableName: "user_doctor", where: ""
      }, function (res) {
        that.setData({ list: res.data.rows })
      }) 
    }else{
      app.requery({
        fun: 'wx_selectData', tableName: "user_doctor", where: "clinicid='" + app.data.patient.hospitalId + "'"
      }, function (res) {
        that.setData({ list: res.data.rows })
        //&& "registerTime='" + app.data.patient.resgiterTime + "'"  当前时间是否与预约时间一致 
      })

      //判断 是否为扫码挂号
      if (app.data.patient.hospitalId != null) {
        this.setData({ btnText: "挂号" })
      }
    }
   
    
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
  
  },
  insertResgiter: function (ndate, ntime,id) {
    var that = this;
    var list = that.data.list;
    var stype = app.data.patient.stype; // 挂号类型
    // var resgiterTime = app.data.patient.resgiterTime;     //预约到达确认时间
    var clinicid = app.data.patient.hospitalId; //诊所id
    var doctorid = this.data.list[id].userid;

    

    wx.showModal({
      title: '挂号',
      content: "请点击下方按钮进行确认",
      success: function (res) {
        if (res.confirm) {
          app.requery({
            fun: 'wx_selectData', tableName: "register", where: "userid='" + app.data.userId + "' and clinicid='" + clinicid + "'and register_date = '" + "2018-02-11" + "'"
          }, //&& "registerTime='" + app.data.patient.resgiterTime + "'"  当前时间是否与预约时间一致 
            function (res) {
              if (res.data.rowCount > 0) {
                if (res.data.rows[0].stype == 2){
                  app.requery({
                    fun: 'wx_updateData', tableName: "register", fields: {
                      register_time: "2018-02-11 16:00:00",
                      order_ok:1

                    },
                   RecNo : res.data.rows[0].RecNo
                  }, function (res) {
                    console.log(res);
                    
                  })
                }
                wx.switchTab({
                  url: '/pages/patient/patient',
                })

              } else {
                app.requery({
                  fun: 'wx_insertData', tableName: "register", fields: {
                    registerid: "1",
                    clinicid: clinicid,
                    doctorid: doctorid,
                    register_date: ndate,
                    stype: 1,
                    register_time: ntime,
                    register_ok: 0,
                    register_ok_time: ndate,
                    order_ok: 1,
                    register_order: 1,
                    userid: app.data.userId

                  }
                }, function (res) {
                  wx.switchTab({
                    url: '/pages/patient/patient',
                  })

                })

              }

            })
          //排队    


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})