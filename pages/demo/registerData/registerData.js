var app = getApp();
Page({
  data: {
    item: {},
    result:'',
    okFlag: 0
  },
  onLoad: function (options) {
   
  },
  //返回
  back: function () { wx.navigateBack({ delta: 1 }) },
  // onInputUserId: function (e) {
  //   this.data.item.userId = e.detail.value
  //   this.setData({ item: this.data.item })
  // },
    

  
  // onInputPatientName: function (e) {
  //   this.data.item.patientName = e.detail.value
  //   this.setData({ item: this.data.item })
  // },
  // onInputTel: function (e) {
  //   this.data.item.tel = e.detail.value
  //   this.setData({ item: this.data.item })
  // },
  onInputSex: function (e) {
    this.data.item.sex = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputAge: function (e) {
    this.data.item.age = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputWeight: function (e) {
    this.data.item.weight = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputHigh: function (e) {
    this.data.item.high = e.detail.value
    this.setData({ item: this.data.item })
  },
  onInputBirthday: function (e) {
    this.data.item.birthday = e.detail.value
    this.setData({ item: this.data.item })
  },


  //  注册 

  register: function (e) {
    
    var d = this.data.item;
    var u = app.data.userInfo;
    app.requery({
      fun: 'wx_insertData', tableName: "med_Patient", fields: {
        userId:app.data.userId,
        sex: d.sex,
        age:d.age,
        weight:d.weight,
        high:d.high,
        birthday:d.birthday
      }
    }, function (res) {
      var id = res.userId;
      console.log(res)
      console.log(id)
      // wx.navigateBack({ delta: 1 })
    })
  },

})












