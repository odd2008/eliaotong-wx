var app = getApp()
Page({
  data: {
    item: {},
    result: '',
    okFlag: 0
  },
  onLoad: function (options) {
    var that=this;
    app.requery({ fun: 'wx_selectData', tableName: "med_Patient", where: "RecNo=" + options.RecNo }, function (res) {
      that.setData({ item: res.data.rows[0] })
    })
    
  },
  //返回
  back: function () { wx.navigateBack({ delta: 1 }) },

  onInputUserId: function (e) {
    this.data.item.userId = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputTel: function (e) {
    this.data.item.tel = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputPatientName: function (e) {
    this.data.item.patientName = e.detail.value
    this.setData({ item: this.data.item })
  },


  //修改
  updateData: function (e) {
    var d = this.data.item;
    var u = app.data.userInfo;
    app.requery({
      fun: 'wx_updateData', tableName: "med_Patient", fields: {
        userId: u.userId,
        tel: d.tel,
        patientName: d.patientName
      },
      recNo:d.RecNo
    }, function (res) {
      wx.navigateBack({ delta: 1 })
    })
  },
  // 删除
  deleteData: function (e) {
    var d = this.data.item;
    var u = app.data.userInfo;
    app.requery({
      fun: 'wx_deleteData', tableName: "med_Patient", recNo: d.RecNo
    }, function (res) {
      wx.navigateBack({ delta: 1 })
    })
  },

})

