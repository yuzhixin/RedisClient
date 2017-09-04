'use strict';


const {remote, ipcRenderer} = require('electron')
const ipc = require('electron').ipcRenderer

let app=new Vue({
  el:'#form',
  data:{
    data:{
      port:'6379',
      host:'127.0.0.1',
      name:'新建连接',
      password:''
    }
  },
  methods: {
    submit: function (events) {
      Object.keys(this.data).forEach(key => {
        if (key !== 'password' && this.data[key].length === 0) {
          alert(key + '不能为空')
          return
        }
      })
		  ipc.send('add-connect-data', this.data)
		  remote.getCurrentWindow().close()
    }
  }
})