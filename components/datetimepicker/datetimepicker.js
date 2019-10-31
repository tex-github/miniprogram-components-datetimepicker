// components/datatimepicker/datatimepicker.js
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const seconds = []
for (let i = 1990; i <= 2099; i++) {
  years.push(i + '')
}
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push(i + '')
}
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push(i + '')
}
for (let i = 0; i <= 23; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push(i + '')
}
for (let i = 0; i <= 59; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push(i + '')
}
for (let i = 0; i <= 59; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  seconds.push(i + '')
}
Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String
    },
    name: {
      type: String
    },
    isRequired: {
      type: Boolean
    },
    format: {
      type: String
    }
  },
  data: {},
  lifetimes: {
    attached: function() {
      //当前时间 年月日 时分秒
      const date = new Date()
      const curYear = date.getFullYear()
      const curMonth = date.getMonth() + 1
      const curDay = date.getDate()
      const curHour = date.getHours()
      const curMinute = date.getMinutes()
      const curSecond = date.getSeconds()

      //不足两位的前面好补0 因为后面要获取在时间轴上的索引 时间轴初始化的时候都是两位
      var showMonth = curMonth < 10 ? ('0' + curMonth) : curMonth
      var showDay = curDay < 10 ? ('0' + curDay) : curDay
      var showHour = curHour < 10 ? ('0' + curHour) : curHour
      var showMinute = curMinute < 10 ? ('0' + curMinute) : curMinute
      var showSecond = curSecond < 10 ? ('0' + curSecond) : curSecond

      //当前时间在picker列上面的索引 为了当打开时间选择轴时选中当前的时间
      var indexYear = years.indexOf(curYear + '')
      var indexMonth = months.indexOf(showMonth + '')
      var indexDay = days.indexOf(showDay + '')
      var indexHour = hours.indexOf(showHour + '')
      var indexMinute = minutes.indexOf(showMinute + '')
      var indexSecond = seconds.indexOf(showSecond + '')

      var multiIndex = []
      var multiArray = []
      var value = ''

      var format = this.properties.format;
      if (format == 'yyyy-MM-dd') {
        multiIndex = [indexYear, indexMonth, indexDay]
        value = `${curYear}-${showMonth}-${showDay}`
        multiArray = [years, months, days]
      }
      if (format == 'HH:mm:ss') {
        multiIndex = [indexHour, indexMinute, indexSecond]
        value = `${showHour}:${showMinute}:${showSecond}`
        multiArray = [hours, minutes, seconds]
      }
      if (format == 'yyyy-MM-dd HH:mm') {
        multiIndex = [indexYear, indexMonth, indexDay, indexHour, indexMinute]
        value = `${curYear}-${showMonth}-${showDay} ${showHour}:${showMinute}`
        multiArray = [years, months, days, hours, minutes]
      }
      if (format == 'yyyy-MM-dd HH:mm:ss') {
        multiIndex = [indexYear, indexMonth, indexDay, indexHour, indexMinute, indexSecond]
        value = `${curYear}-${showMonth}-${showDay} ${showHour}:${showMinute}:${showSecond}`
        multiArray = [years, months, days, hours, minutes, seconds]

      }
      this.setData({
        value: value,
        multiIndex: multiIndex,
        multiArray: multiArray,
      })

    },
    detached: function() {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取时间日期
    bindPickerChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
      const index = this.data.multiIndex
      var format = this.properties.format
      var showTime = ''

      if (format == 'yyyy-MM-dd') {
        const year = this.data.multiArray[0][index[0]]
        const month = this.data.multiArray[1][index[1]]
        const day = this.data.multiArray[2][index[2]]
        showTime = `${year}-${month}-${day}`
      }
      if (format == 'HH:mm:ss') {
        const hour = this.data.multiArray[0][index[0]]
        const minute = this.data.multiArray[1][index[1]]
        const second = this.data.multiArray[2][index[2]]
        showTime = `${hour}:${minute}:${second}`
      }
      if (format == 'yyyy-MM-dd HH:mm') {
        const year = this.data.multiArray[0][index[0]]
        const month = this.data.multiArray[1][index[1]]
        const day = this.data.multiArray[2][index[2]]
        const hour = this.data.multiArray[3][index[3]]
        const minute = this.data.multiArray[4][index[4]]
        showTime = `${year}-${month}-${day} ${hour}:${minute}`
      }
      if (format == 'yyyy-MM-dd HH:mm:ss') {
        const year = this.data.multiArray[0][index[0]]
        const month = this.data.multiArray[1][index[1]]
        const day = this.data.multiArray[2][index[2]]
        const hour = this.data.multiArray[3][index[3]]
        const minute = this.data.multiArray[4][index[4]]
        const second = this.data.multiArray[5][index[5]]
        showTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      }
      this.setData({
        value: showTime
      })
      this.triggerEvent('dateTimePicker', showTime)
    },
    /**
     * 列改变时
     */
    bindPickerColumnChange: function(e) {
      if (e.detail.column == 1) {
        let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
        let temp = [];
        if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //31天的月份
          for (let i = 1; i <= 31; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 4 || num == 6 || num == 9 || num == 11) { //30天的月份
          for (let i = 1; i <= 30; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 2) { //2月份天数
          let year = parseInt(this.data.choose_year);
          console.log(year);
          if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
            for (let i = 1; i <= 29; i++) {
              if (i < 10) {
                i = "0" + i;
              }
              temp.push("" + i);
            }
            this.setData({
              ['multiArray[2]']: temp
            });
          } else {
            for (let i = 1; i <= 28; i++) {
              if (i < 10) {
                i = "0" + i;
              }
              temp.push("" + i);
            }
            this.setData({
              ['multiArray[2]']: temp
            });
          }
        }
        console.log(this.data.multiArray[2]);
      }
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      this.setData(data);
    },
  }
})