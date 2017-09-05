'use strict';

const path = require('path');
const {app, ipcMain} = require('electron');
const redisClient = require('./windows/controllers/redisClient');
const connectionWindow = require('./windows/controllers/connection');
const glob = require('glob')


class ElectronicRedisClient {
  constructor() {
    this.clientWindow = null;
    this.connectionWindow = null;
  }

  init() {
    this.initApp();
  }

  initApp() {
    app.on('ready', ()=> {
      this.createClientWindow();
      this.createConnectionWindow()
      this.loadDialogs()
    });

    app.on('activate', () => {
      if (this.clientWindow == null) {
        this.createClientWindow();
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
}

const RedisClient = new ElectronicRedisClient();
RedisClient.init()
module.exports = RedisClient;