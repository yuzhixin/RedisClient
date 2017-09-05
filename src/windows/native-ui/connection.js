'use strict';

const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();
const newConnection = document.getElementById('new-connection')

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


ipc.on('add-connect-data-relpy', (event, arg) => {
	tree.nodes.push(arg);
})