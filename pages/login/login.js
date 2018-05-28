const app=getApp();
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  getUserInfo: function (e) {

    // 授权操作
    if (e.detail.errMsg == "getUserInfo:ok"){
        app.data.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        var hasUserInfo = this.data.hasUserInfo;
        if (hasUserInfo) {
          wx.showLoading({
            title: '登陆中',
          })
          setTimeout(function () {
            wx.hideLoading({
              success: function () {
                wx.switchTab({
                  url: '../patient/patient',
                })
              }
            })
          }, 2000)
        }
      }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法正常使用e疗通的功能体验。请再次点击授权，或者删除小程序重新进入。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else (res.cancel)
            console.log('用户点击取消')

        }
      })
      }
    },
    

  onLoad:function(options){
 
    if (app.data.userInfo) {
      this.setData({
        userInfo: app.data.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.data.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    console.log(99999)
    console.log(app.data.userId)
    app.data.patient.hospitalId = options.hospitalId;
    console.log(app.data.patient.hospitalId)
      app.requery({fun:'wx_getUserInfoByNo',userNo:app.data.userNo},function(res){
        app.data.userInfo=res.data;
        app.requery({ fun: "wx_selectData", tableName: "med_Patient" }, function (res) {
          console.log(res)
        })
        app.requery({fun:'wx_getMainMenu',userNo:app.data.userNo},function(res){
          app.data.mainMenu = res.data;
          app.data.mainMenu[0].push({ id: "selectData", name: "selectData", url: "/pages/demo/selectData/selectData", image: "work2.png" })
          app.data.mainMenu[0].push({ id: "insertData", name: "insertData", url: "/pages/demo/insertData/insertData", image: "work2.png" })
          app.data.mainMenu[0].push({ id: "updatedData", name: "updatedData", url: "/pages/demo/updateData/updateData", image: "work2.png" })
          app.data.mainMenu[0].push({ id: "registerData", name: "registerData", url: "/pages/demo/registerData/registerData", image: "work2.png" })
         

          if (options.hospitalId)
          {
            var userId=app.data.userInfo.userId
            app.requery({
              fun: 'wx_selectData', tableName: "med_Patient", where: "userId='" + userId+"'" }, function (res) {
              console.log(res);

               if(res.data.rowCount>0)
                 wx.switchTab({
                   url: '/pages/patient/patient'
                 })
             
            })            
          }
          else if(app.data.userInfo.userType==1)
            wx.switchTab({ url: '/pages/patient/patient' })    
          else
            wx.switchTab({ url: '/pages/patient/patient' })    
      
        })
      })
  }
 
})