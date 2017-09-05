'use strict';


const ipc = require('electron').ipcMain
const RedisClient = require('../../main')
const Store = require('electron-store')
const conf = new Store();
const app = require('electron')

ipc.on('open-connection-window', function (event) {
	RedisClient.connectionWindow.show();
})

ipc.on('open-dialog-window', function (event, connstr) {
	RedisClient.dialogWindow.show();
	RedisClient.dialogWindow.Window.webContents.send('open-dialog-window-relpy', connstr);
})

ipc.on('del-connect-data', function (event, connstr) {
	RedisClient.clientWindow.Window.webContents.send('del-connect-data-relpy', connstr);
})

ipc.on('add-connect-data', function (event, data) {
	var size = conf.size;
	var connstr = 'conn-'+ size.toString() + '-true';
	conf.set(connstr, data);
	RedisClient.clientWindow.Window.webContents.send('add-connect-data-relpy', data);
})

ipc.on('main-window-plus', function (event) {
	if (RedisClient.clientWindow.Window.isMaximized()){
		RedisClient.clientWindow.Window.restore();
	} else{
		RedisClient.clientWindow.Window.maximize();
	}
})

ipc.on('main-window-minus', function (event) {
	RedisClient.clientWindow.Window.minimize();
})

ipc.on('main-window-cancel', function (event) {
	RedisClient.clientWindow.Window.close();
})


ipc.on('conn-window-cancel', function (event) {
	RedisClient.connectionWindow.Window.hide();
})