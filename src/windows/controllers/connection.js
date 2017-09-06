
'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');
const url = require('url')
const Common = require('../../common')

class connectionWindow {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.Window = null;
    this.createConnectionWindow();
  }

  createConnectionWindow() {
    this.Window = new BrowserWindow({
      width: 500,
      height: 400,
      resizable: true,
      fullscreenable: false,
      frame: false,
      parent: this.redisClient.Window,
      modal: true
    });
    this.initWindowEvents();
		this.Window.loadURL(url.format({
			pathname: path.join(__dirname, '/../views/connection.html'),
			protocol: 'file:',
			slashes: true
    }));
    if(Common.DEBUG){
      this.Window.webContents.openDevTools()
    }
  }

  initWindowEvents() {
    this.Window.on('close', () => {
      this.Window = null;
    });
    this.Window.once('ready-to-show', () => {
      this.Window.show();
    });
  }

  show() {
    if (!this.Window) {
      this.createConnectionWindow();
    }
    this.Window.show();
  }

  hide() {
    this.Window.hide();
  }
}

module.exports = connectionWindow;
