

'use strict';

const redis = require('redis')
const ipc = require('electron').ipcRenderer;

class redisServer {
  constructor(connData, dbNumber) {
		this.client = null;
		this.connData = connData;
		this.dbNumber = dbNumber;
		this.createServer();
  }

  createServer() {
    var RDS_PORT = this.connData['port'];
    var RDS_HOST = this.connData['host'];
		var RDS_PWD = this.connData['password'];
		var RDS_OPTS = {};
		if(RDS_PWD !=='' && typeof(RDS_PWD) !=='undefined'){
			RDS_OPTS = {auth_pass:RDS_PWD}
		};
    const client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
		client.select(this.dbNumber, function() {});
		client.auth(RDS_PWD,function(){
				console.log('access');
		});
		ipc.send('loading-window-show');
		client.on('ready',function(err){
				console.log('redisServer ready');
				ipc.send('loading-window-hide');
		});
		this.client = client
  }
}

module.exports = redisServer;