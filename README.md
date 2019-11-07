# miniprogram-components-datetimepicker

在你页面中的json中添加引用，路径根据你的实际工程目录来写。
{
  "usingComponents": {
    "DateTimePicker": "/components/datetimepicker/datetimepicker"
  }
}

wxml中

<DateTimePicker title='选择时间' isRequired='true' bind:dateTimePicker='onDateTimePicker' name='time' format='yyyy-MM-dd HH:mm:ss'/>

tips:
  title：表单组件的名称
  isRequired：是否必填项
  dateTimePicker：为选中确认回调
  name：为表单点击 form 表单中 form-type 为 submit 的 button 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key
  format：时间格式化参数 支持：‘yyyy-MM-dd HH:mm:ss’,‘HH:mm:ss’,‘yyyy-MM-dd HH:mm’,‘yyyy-MM-dd’ 四种
  
