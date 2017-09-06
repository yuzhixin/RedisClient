

'use strict';

const redis = require('redis')

class redisServer {
  constructor(connData) {
		this.createServer(),
		this.client = null,
		this.connData = connData,
		console.log(1111111111),
		console.log(this.connData.get('port'))
  }

  createServer() {
		var redis = require('redis');
		console.log(111111111111111);
		console.log(this.connData);
		console.log(111111111111111);
    RDS_PORT = this.connData.get('port');       //端口号
    RDS_HOST = this.connData.get('host');    //服务器IP
		RDS_PWD = this.connData.get('password');    //密码
		RDS_OPTS = {}; //设置项
		if(RDS_PWD !=='' && typeof(RDS_PWD) !=='undefined'){
			RDS_OPTS = {auth_pass:RDS_PWD}
		};
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

		client.auth(RDS_PWD,function(){
				console.log('通过认证');
		});
		client.on('ready',function(err){
				console.log('redisServer ready');
		});
		this.client = client
  }
}

module.exports = redisServer;
