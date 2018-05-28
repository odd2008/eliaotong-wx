const app = getApp();
Page({
  data: {
    userInfo: {},
    isShow: "",
  },
 
  doctorMyTap:function(){
    wx.navigateTo({
      url: '/pages/doctor/doctor-my/doctor-my',
    })
  },
  updateTap: function (){
    wx.navigateTo({
      url: 'update/update',
    })
  },
  
  onLoad:function(e){
    this.setData({ userInfo: app.data.userInfo })
  },
  onShow:function(){
    var userId = app.data.userId;
    app.requery({ fun: "wx_selectData", tableName: "med_Patient", where: "userId='" + userId + "'" }, function (res) {
      var rowCount = res.data.rowCount;
      if (rowCount === 0) {
        wx.showModal({
          title: '用户尚未注册',
          content: '即将跳转到注册页面',
          success: function (res) {
            if (res.confirm)
              wx.navigateTo({
                url: '/pages/patient/register/register',
              })
            else (res.cancel)
            wx.switchTab({
              url: '/pages/patient/patient',
            })

          },
        })

      }
    })
    if (app.data.userInfo.userType == 0) {
      this.setData({ isShow: true })
    } else {
      this.setData({ isShow: false })
    }
  }, 
})
