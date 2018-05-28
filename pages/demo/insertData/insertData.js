var app = getApp();

Page({
  data: {
    item: {},
    result: '',
    okFlag: 0,
    userId:'',
      second:"60",
      telCode:"获取验证",
      isDisplay:"true"
  },
  // 计时器
    timer:function(){ 
    var that =this;
    var Interval = setInterval(function () {
    var second = that.data.second;
    that.setData({ second: second - 1 });
    console.log(second);
    
    if(second === 1){
      clearInterval(Interval);
      that.setData({ isDisplay: true });
      that.setData({ second: "60" });
    }
  }
    , 1000)
    },
  onHide : function(){
    
  },
  //获取手机验证码
  telCode: function (e) {
    var that = this;
    var isDisplay = this.data.isDisplay;
    this.setData({ "telCode": "重新获取" })
    this.setData({ isDisplay:false})
    console.log(this.data.isDisplay)
    that.timer();
    console.log(this.timer)

    },


onLoad: function (options) {
  this.userId = app.data.userId;
  this.setData({userId:this.data.userId})
  console.log(this.userId);
 
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
          console.log(this.data.telTrue)
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
      content: '是否进入详细页面进行预约',
      success: function (res) {
        if (res.confirm) {
          // 跳转到详细页面
          wx.navigateTo({
            url: '/pages/demo/registerData/registerData',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          
        }
      },
      complete:function (res){
        
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
  }

});












