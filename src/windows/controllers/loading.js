
'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');
const url = require('url')

class loadingWindow {
  constructor() {
    this.Window = null;
    this.createLoadingWindow();
  }

  createLoadingWindow() {
    this.Window = new BrowserWindow({
      frame: false,
      width: 65,
      height: 70,
      transparent: true,
      skipTaskbar: true,
    });
    this.initWindowEvents();
		this.Window.loadURL(url.format({
			pathname: path.join(__dirname, '/../views/loading.html'),
			protocol: 'file:',
			slashes: true
		}));
  }

  initWindowEvents() {
    this.Window.on('close', () => {
      this.Window = null;
    });
    this.Window.once('ready-to-show', () => {
      this.Window.show();
    });
    this.Window.on('blur', function (e, cmd) {
      this.hide()
    })

  }

  show(connstr) {
    if (!this.Window) {
      this.createLoadingWindow();
    }
    this.Window.show();
  }

  hide() {
    this.Window.hide();
  }
}

module.exports = loadingWindow;