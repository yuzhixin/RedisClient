

'use strict';

const path = require('path');
const { app, shell, BrowserWindow } = require('electron');
const url = require('url')
const Common = require('../../common')

class redisClient {
  constructor() {
    this.createWindow()
  }

  createWindow() {
    this.Window = new BrowserWindow({
      title: 'RedisClient',
      resizable: true,
      center: true,
      frame: false,
      icon: path.join(__dirname, '../../../assets/icon.png')
    })

		this.Window.loadURL(url.format({
			pathname: path.join(__dirname, '/../views/index.html'),
			protocol: 'file:',
			slashes: true
		}))
    if(Common.DEBUG){
      this.Window.webContents.openDevTools()
    }
  }
}

module.exports = redisClient;
