'use strict';


const {remote, ipcRenderer} = require('electron')
const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();


var dialog = new Vue({
  el: '#dialog',
  data: {
		connstr: null
	},
	methods: {
    buttonOK: function (events) {
			ipc.send('del-connect-data', dialog.connstr);
			remote.getCurrentWindow().hide();
    },
    buttonCancel: function(events){
      remote.getCurrentWindow().hide();
    }
  }
});

ipc.on('open-dialog-window-relpy', (event, connstr) => {
	dialog.connstr = connstr
})