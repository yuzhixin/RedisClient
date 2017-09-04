'use strict';

const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();
const newConnection = document.getElementById('new-connection')
var bus = require('./bus')

newConnection.addEventListener('click', function (event) {
  ipc.send('open-connection-window');
})



var tree = new Vue({
  el: '#todo-list',
  data: {
    	nodes: []
  },
	methods: {
    addConnection: function(data) {
      this.nodes.push(data);
    }
	}
});


for (let i = 0; i < conf.size; i++) {
	var connstr = 'conn-'+ i.toString() + '-true';
	var value = conf.get(connstr);
	if(value !== undefined){
		value['connstr'] = connstr
		tree.nodes.push(value)
	}
};

bus.$on('add-connect-data', function (value) {
	console.log(value)
  tree.nodes.push(value),
  console.log(value)
})

module.exports = tree;