var app = getApp();
Page({

  data: {
    list: []
  },
  onShow: function (options) {
    console.log(111111)
    var that=this;
    app.requery({ fun: 'wx_selectData', tableName: "med_Patient", where: "" }, function (res) {
      console.log(res.data.rows)
      that.setData({ list: res.data.rows })
    })
 
  },
  
  selectData: function (e){
    wx.navigateTo({
      url: "/pages/demo/updateData/updateData?RecNo=" + e.currentTarget.id
    })

  },
  
 back: function () {
      wx.navigateBack({ delta: 1 })
  }  
})





