'use strict';


const ipc = require('electron').ipcMain
const RedisClient = require('../../main')
const Store = require('electron-store')
const conf = new Store();


ipc.on('open-connection-window', function (event) {
	RedisClient.connectionWindow.show();
})

ipc.on('add-connect-data', function (event, arg) {
	var size = conf.size;
	var connstr = 'conn-'+ size.toString() + '-true';
	conf.set(connstr, arg);
	RedisClient.clientWindow.Window.webContents.send('add-connect-data-relpy', arg);
})