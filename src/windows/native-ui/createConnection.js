'use strict';


const {remote, ipcRenderer} = require('electron')
const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();

let app=new Vue({
  el:'#form',
  data:{
    data:{
      port:'6379',
      host:'127.0.0.1',
      name:'新建连接',
      password:'',
      isAble: 'true'
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
      var connstr = 'conn-'+ conf.size.toString() + '-true';
      this.data['connstr'] = connstr;
      ipc.send('add-connect-data', this.data);
      remote.getCurrentWindow().hide()
    },
    cancel: function(events){
      ipc.send('conn-window-cancel');
    }
  }
})