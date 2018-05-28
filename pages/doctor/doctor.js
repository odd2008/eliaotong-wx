
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    listOld: [],
    state: true,
    currRecNo: 0,
    length:"",
    hadLength:"",
    rankNum:"",
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




  // 帮助挂号跳转
  helpbookTap: function () {
    var that = this;
    var userId = app.data.userId;
    app.requery({ fun: 'wx_getSysDate' }, function (res) {
      var ndate = res;
      app.requery({ fun: 'wx_getSysDateTime' }, function (res) {
        var ntime = res;
        
        app.requery({fun: 'wx_insertData', tableName: "register", fields: {
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
          that.setData({ rankNum: res.data.rowCount +1 })
          console.log(999999);
          console.log(that.data.rankNum);
          

        })
      })
    })
    that.setData({
      showModal: true
    })
   
  },
  //过号跳转
  guohaoTap: function(){
    wx.showLoading({
      title: '未完成',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },



  callNextTap: function () {
    
    var that = this;
   
        that.setData({ currRecNo: that.data.currRecNo + 1 });
        var deletes = that.data.list.splice(0, 1);
        var hadlist = app.data.hadlist;
        hadlist.push(deletes);
        that.setData({ list: that.data.list });
        app.data.hadlist = hadlist;
        console.log(hadlist);
        wx.setStorage({
          key: "hadlist",
          data: hadlist
    })
       
        
        if (this.data.length == app.data.hadlist.length) {
          wx.showLoading({
            title: '没有用户记录了',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
        
        // 更改register_ok属性
        var userId = app.data.userId;
        app.requery({ fun: 'wx_selectData', tableName: "register", where: "userid='" + userId + "' and register_ok =  '" + "0" + "'" }, function (res) {
          
          
          var RecNo = res.data.rows[0].RecNo;
          console.log(RecNo)
          app.requery({
            fun: 'wx_updateData', tableName: "register", fields: {
              register_ok:true
            },
            recNo: RecNo,
            function(res) {

            }

          })

        })

        


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({ hadLength: app.data.hadlist.length})
   
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