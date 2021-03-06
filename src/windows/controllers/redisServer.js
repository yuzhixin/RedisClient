'use strict';

const redis = require('redis')
const ipc = require('electron').ipcRenderer;


function redisServer(connData, dbNumber){
	var p = new Promise(function(resolve, reject){
    var RDS_PORT = connData['port'];
    var RDS_HOST = connData['host'];
		var RDS_PWD = connData['password'];
		var RDS_OPTS = {};
		if(RDS_PWD !=='' && typeof(RDS_PWD) !=='undefined'){
			RDS_OPTS = {auth_pass:RDS_PWD}
		};
    const client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
		client.select(dbNumber, function() {});
		client.auth(RDS_PWD,function(){
				console.log('access');
		});
		ipc.send('loading-window-show');
		resolve(client)
		client.on('ready',function(err){
				console.log('redisServer ready');
				ipc.send('loading-window-hide');
				// resolve(client)
		});
		// client.on('error', function (err) {
		// 	console.log(err);
		// 	reject(err)
		// });
	});
	return p;       
}


module.exports = redisServer;