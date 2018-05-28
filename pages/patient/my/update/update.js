const app = getApp();
const ages = [];
const weights = [];
const highs = [];

for (let i = 0; i <= 130; i++) {
  ages.push(i)
}
for (let i = 0; i <= 200; i++) {
  weights.push(i)
}
for (let i =0; i <= 240; i++) {
  highs.push(i)
}
Page({
  data: {
    item: {},
    result: '',
    okFlag: 0,
    list: {},
    birthday: "1990-01-01",
    ages:ages,
    weights: weights,
    highs: highs,
    AgePickerTrue: false,
    WeightPickerTrue: false,
    HighPickerTrue:false,
  },
  onLoad: function (options) {
   
   
  },
  onShow:function(e){
    var that = this;
    var list = this.data.list;
    var userId = app.data.userId
    app.requery({ fun: 'wx_selectData', tableName: "med_Patient", where: "userId='" + userId + "'" }, function (res) {
      console.log(11111111)
      console.log(res)
      that.setData({ list: res.data.rows[0] })
      let birthday = res.data.rows[0].birthday.substring(0, 10);
      that.setData({ birthday: birthday })
    })
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  //返回
  back: function () { wx.navigateBack({ delta: 1 }) },

  bindPickerChangeAge:function(e){
    this.data.item.age = e.detail.value
    this.setData({ item: this.data.item, AgePickerTrue:true})
  },
  bindPickerChangeWeight: function (e) {
    this.data.item.weight = e.detail.value
    this.setData({ item: this.data.item, WeightPickerTrue: true })
  },
  bindPickerChangeHigh: function (e) {
    this.data.item.high = e.detail.value
    this.setData({ item: this.data.item, HighPickerTrue: true })
  },
  radioChange:function(e){
    this.data.item.sex = e.detail.value
    this.setData({ item: this.data.item})
   
  },

  //  修改

  recompose: function () {
    var d = this.data.item;
    var u = app.data.userInfo;
    var userId = app.data.userId;
    var birthday = this.data.birthday;
    wx.showModal({
      title: '用户信息修改成功',
      content: '即将返回',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/patient/my/my',
          })
        }
      },
      complete: function (res) {

        //上传数据
        app.requery({ fun: "wx_selectData", tableName: "med_Patient", where: "userId='" + userId + "'" }, function (res) {
          if (res.data.rowCount > 0) {
            var RecNo = res.data.rows[0].RecNo;
            app.requery({
              fun: 'wx_updateData', tableName: "med_Patient", fields: {
                sex: d.sex,
                age: d.age,
                weight: d.weight,
                high: d.high,
                birthday: birthday
              },
              recNo: RecNo,
              function(res) {

              }

            })
          }
          else {

          }

        })
      }
    })


  },

})












