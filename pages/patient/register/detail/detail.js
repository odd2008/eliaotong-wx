var app = getApp();
const ages = [];
const weights = [];
const highs = [];

for (let i = 0; i <= 130; i++) {
  ages.push(i)
}
for (let i = 0; i <= 200; i++) {
  weights.push(i)
}
for (let i = 0; i <= 240; i++) {
  highs.push(i)
}
Page({
  data: {
    item: {},
    result: '',
    okFlag: 0,
    disabled:true,
    birthday:"1990-01-01",
    ages: ages,
    weights: weights,
    highs: highs,
    AgePickerTrue: false,
    HighPickerTrue: false,
    WeightPickerTrue:false,
  },
  onLoad: function (options) {

  },
  //返回
  back: function () { wx.navigateBack({ delta: 1 }) },


 
  radioChange: function (e) {
    this.data.item.sex = e.detail.value
    this.setData({ item: this.data.item })

  },
  bindPickerChangeAge: function (e) {
    this.data.item.age = e.detail.value
    this.setData({ item: this.data.item, AgePickerTrue: true })
    console.log(this.data.item.age)
  },
  bindPickerChangeWeight: function (e) {
    this.data.item.weight = e.detail.value
    this.setData({ item: this.data.item, WeightPickerTrue: true })
    console.log(this.data.item.weight)
    
  },
  bindPickerChangeHigh: function (e) {
    this.data.item.high = e.detail.value
    this.setData({ item: this.data.item, HighPickerTrue: true })
  },
 
  bindDateChange: function (e) {
    this.data.item.birthday = e.detail.value
    this.setData({
      birthday: e.detail.value,
      item: this.data.item
    })
  },
  


  //  注册 

  register: function (e) {

    var d = this.data.item;
    var u = app.data.userInfo;
    var userId = app.data.userId;
    console.log(userId)
    app.requery({ fun: "wx_selectData", tableName: "med_Patient", where:"userId='"+userId+"'" }, function (res) {
      if(res.data.rowCount>0){
         var RecNo=res.data.rows[0].RecNo;
         app.requery({
            fun: 'wx_updateData', tableName: "med_Patient", fields: {
            sex: d.sex,
            age: d.age,
            weight: d.weight,
            high: d.high,
            birthday: d.birthday
          },
          recNo: RecNo,
          function(res) {
           
        }

      })
      }
      else{

      }

    })

    wx.navigateTo({
      url: '/pages/patient/bespeak/bespeak',
    })


    
  },

})

