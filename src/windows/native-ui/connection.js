'use strict';

const remote = require('electron');
const ipc = require('electron').ipcRenderer;
const Store = require('electron-store');
const conf = new Store();
const redisServer = require('../controllers/redisServer');
const newConnection = document.getElementById('new-connection');
const plus = document.getElementById('icon-plus-circled');
const minus = document.getElementById('icon-minus-circled');
const cancel = document.getElementById('icon-cancel-circled');


newConnection.addEventListener('click', function (event) {
  ipc.send('open-connection-window');
});

plus.addEventListener('click', function (event) {
	ipc.send('main-window-plus');
});

minus.addEventListener('click', function (event) {
  ipc.send('main-window-minus');
});

cancel.addEventListener('click', function (event) {
  ipc.send('main-window-cancel');
});


ipc.on('add-connect-data-relpy', (event, data) => {
	tree.nodes.push(data);
});

ipc.on('del-connect-data-relpy', (event, data) => {
		for (var i = 0; i < tree.nodes.length; i++){
		if(tree.nodes[i].connstr === data){
			var newData = {
				port:tree.nodes[i].port,
				host:tree.nodes[i].host,
				name:tree.nodes[i].name,
				password:tree.nodes[i].password,
				isAble:'false'
			};
			tree.nodes.splice(i,i+1);
			conf.set(data, newData);
		} 
	};
});

var tree = new Vue({
  el: '#todo-list',
  data: {
			nodes: [],
			connstr: null,
			dbNumber: 0,
			Keys:[],
			redis: null
  },
	methods: {
    addConnection: function(data) {
      this.nodes.push(data);
		},
    showDeleteDialog: function(connstr) {
			ipc.send('open-dialog-window', connstr);
		},
		changeDbNumber: function(dbNumber) {
			this.dbNumber = dbNumber;
			this.initRedisClient();
		},
		changeDb: function(connstr) {
			this.connstr = connstr;
			this.initRedisClient();
		},
		initRedisClient: function() {
			const redis = new redisServer(conf.get(this.connstr), this.dbNumber);
			this.redis = redis;
			this.getKey('*');
		},
		isConnActive: function(connstr) {
			return connstr == this.connstr
		},
		isDbActive: function(dbNumber) {
			return dbNumber == this.dbNumber
		},
		getKey: function(key) {
			this.redis.client.on('connect',function(key){
				console.log(111111111111);
				console.log(this.set('author', 'Wilson'));
				console.log(this.get('author', this.print));
				// console.log(this.redis.client.get('author'));
				// this.Keys = this.redis.client.get('*');
				// console.log(this.Keys);
			});
		}
	}
});

function initNodes(){
	for (let i = 0; i < conf.size; i++) {
		var connstr = 'conn-'+ i.toString() + '-true';
		var value = conf.get(connstr);
		if(value !== undefined && value['isAble']==='true'){
			tree.nodes.push(value)
		}
	};
	if (tree.nodes.length>0){
		tree.connstr = tree.nodes[0]['connstr']
	};
}

initNodes()

