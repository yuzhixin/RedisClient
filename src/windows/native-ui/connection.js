'use strict';

const remote = require('electron');
const ipc = require('electron').ipcRenderer;
const Store = require('electron-store');
const conf = new Store();
const redisServer = require('../controllers/redisServer');
const format = require('./formatJson')

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
			keys:[],
			redis: null,
			value:null
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
			redisServer(conf.get(this.connstr), this.dbNumber).then(
			function(data){
				console.log('resolved');
				tree.redis = data;
				tree.getKeys();
			}, 
			function(reason, data){
				console.log('rejected');
				console.log(reason);
			});
		},
		isConnActive: function(connstr) {
			return connstr == this.connstr;
		},
		isDbActive: function(dbNumber) {
			return dbNumber == this.dbNumber;
		},
		getKeys: function() {
			this.redis.keys('*', function (err, keys) {
				if (err) return console.log(err);
				tree.keys = keys
			}); 
		},
		getValue: function(key) {
			this.redis.get(key, function(err, reply) {
				if (typeof(reply) !=="undefined"){
					tree.value = format(reply);
					console.log(format(reply));
				}else{
					tree.value = null;
					console.log('undefined');
				}
			});
		},
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

