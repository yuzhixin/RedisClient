
'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');
const url = require('url')
const Common = require('../../common')

class dialogWindow {
  constructor(redisClient) {
    this.redisClient = redisClient
    this.Window = null;
    this.createDialogWindow();
  }

  createDialogWindow() {
    this.Window = new BrowserWindow({
      width: 300,
      height: 100,
      resizable: false,
      fullscreenable: false,
      frame: false,
      parent: this.redisClient.Window,
      modal: true
    });
    this.initWindowEvents();
		this.Window.loadURL(url.format({
			pathname: path.join(__dirname, '/../views/dialog.html'),
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

  show(connstr) {
    if (!this.Window) {
      this.createConnectionWindow();
    }
    this.Window.show();
  }

  hide() {
    this.Window.hide();
  }
}

module.exports = dialogWindow;
