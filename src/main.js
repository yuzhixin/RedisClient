'use strict';

const path = require('path');
const {app, ipcMain} = require('electron');
const redisClient = require('./windows/controllers/redisClient');
const connectionWindow = require('./windows/controllers/connection');
const dialogWindow = require('./windows/controllers/dialog');
const loadingWindow = require('./windows/controllers/loading');
const glob = require('glob')


class ElectronicRedisClient {
  constructor() {
    this.clientWindow = null;
    this.connectionWindow = null;
    this.dialogWindow = null;
    this.loadingWindow = null;
  }

  init() {
    this.initApp();
  }

  initApp() {
    app.on('ready', ()=> {
      this.createClientWindow();
      this.createConnectionWindow();
      this.createDialogWindow();
      this.createLoadingWindow();
      this.loadDialogs();
    });

    app.on('activate', () => {
      if (this.clientWindow == null) {
        this.createClientWindow();
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  };

  createClientWindow() {
    this.clientWindow = new redisClient();
  }
  
  loadDialogs () {
    var files = glob.sync(path.join(__dirname, './windows/dialogs/*.js'))
    files.forEach(function (file) {
      require(file)
    })
  }

  createConnectionWindow() {
    this.connectionWindow = new connectionWindow(this.clientWindow);
    this.connectionWindow.hide()
  }

  createDialogWindow() {
    this.dialogWindow = new dialogWindow(this.clientWindow);
    this.dialogWindow.hide()
  }

  createLoadingWindow() {
    this.loadingWindow = new loadingWindow();
    this.loadingWindow.hide()
  }
}

const RedisClient = new ElectronicRedisClient();
RedisClient.init()
module.exports = RedisClient;