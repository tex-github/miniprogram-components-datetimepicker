// components/datatimepicker/datatimepicker.js

Component({
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
  behaviors: ['wx://form-field'],
  lifetimes: {
    attached: function() {
      const date = new Date()
      const curYear = date.getFullYear()
      const curMonth = date.getMonth() + 1
      const curDay = date.getDate()
      const curHour = date.getHours()
      const curMinute = date.getMinutes()
      const curSecond = date.getSeconds()
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
      var showMonth = curMonth < 10 ? ('0' + curMonth) : curMonth
      var showDay = curDay < 10 ? ('0' + curDay) : curDay
      var showHour = curHour < 10 ? ('0' + curHour) : curHour
      var showMinute = curMinute < 10 ? ('0' + curMinute) : curMinute
      var showSecond = curSecond < 10 ? ('0' + curSecond) : curSecond

      var multiIndex = []
      var value = ''
      var multiArray = []
      var format = this.properties.format;
      if (format == 'yyyy-MM-dd') {
        multiIndex = [years.indexOf(curYear + ''), months.indexOf(showMonth + ''), days.indexOf(showDay + '')];
        value = curYear + '-' + showMonth + '-' + showDay;
        multiArray = [years, months, days];
      } else if (format == 'yyyy-MM-dd HH:mm') {
        multiIndex = [years.indexOf(curYear + ''), months.indexOf(showMonth + ''), days.indexOf(showDay + ''), hours.indexOf(showHour + ''), minutes.indexOf(showMinute + '')];
        value = curYear + '-' + showMonth + '-' + showDay + ' ' + showHour + ':' + showMinute;
        multiArray = [years, months, days, hours, minutes];
      } else if (format == 'yyyy-MM-dd HH:mm:ss') {
        multiIndex = [years.indexOf(curYear + ''), months.indexOf(showMonth + ''), days.indexOf(showDay + ''), hours.indexOf(showHour + ''), minutes.indexOf(showMinute + ''), seconds.indexOf(showSecond + '')];
        value = curYear + '-' + showMonth + '-' + showDay + ' ' + showHour + ':' + showMinute + ':' + showSecond;
        multiArray = [years, months, days, hours, minutes, seconds];

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
      const index = this.data.multiIndex;
      var format = this.properties.format;
      var showTime = '';
      if (format == 'yyyy-MM-dd') {
        const year = this.data.multiArray[0][index[0]];
        const month = this.data.multiArray[1][index[1]];
        const day = this.data.multiArray[2][index[2]];
        showTime = year + '-' + month + '-' + day;
      } else if (format == 'yyyy-MM-dd HH:mm') {
        const year = this.data.multiArray[0][index[0]];
        const month = this.data.multiArray[1][index[1]];
        const day = this.data.multiArray[2][index[2]];
        const hour = this.data.multiArray[3][index[3]];
        const minute = this.data.multiArray[4][index[4]];
        showTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      } else if (format == 'yyyy-MM-dd HH:mm:ss') {
        const year = this.data.multiArray[0][index[0]];
        const month = this.data.multiArray[1][index[1]];
        const day = this.data.multiArray[2][index[2]];
        const hour = this.data.multiArray[3][index[3]];
        const minute = this.data.multiArray[4][index[4]];
        const second = this.data.multiArray[5][index[5]];
        showTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      }

      this.setData({
        value: showTime
      })
      this.triggerEvent('dateTimePicker', showTime)
    },
    bindPickerColumnChange: function(e) {

      //修改的列为: e.detail.column, 值为: e.detail.value);
      if (e.detail.column == 1) {
        let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
        let temp = [];
        if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
          for (let i = 1; i <= 31; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
          for (let i = 1; i <= 30; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 2) { //判断2月份天数
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