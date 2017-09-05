'use strict';


const {remote, ipcRenderer} = require('electron')
const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();

const buttonOK = document.getElementById('button-ok')
const buttonCancel = document.getElementById('button-cancel')


var dialog = new Vue({
  el: '#dialog',
  data: {
		connstr: null
  }
});

ipc.on('open-dialog-window-relpy', (event, connstr) => {
	dialog.connstr = connstr
})

buttonOK.addEventListener('click', function (event) {
	ipc.send('del-connect-data', dialog.connstr);
	remote.getCurrentWindow().hide();
})


buttonCancel.addEventListener('click', function (event) {
	remote.getCurrentWindow().hide();
})