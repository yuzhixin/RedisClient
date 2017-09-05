'use strict';


const ipc = require('electron').ipcMain
const RedisClient = require('../../main')
const Store = require('electron-store')
const conf = new Store();


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