'use strict';

const ipc = require('electron').ipcRenderer
const Store = require('electron-store')
const conf = new Store();
const newConnection = document.getElementById('new-connection')

newConnection.addEventListener('click', function (event) {
  ipc.send('open-connection-window');
})

ipc.on('add-connect-data-relpy', (event, data) => {
	tree.nodes.push(data);
})

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
})

var tree = new Vue({
  el: '#todo-list',
  data: {
    	nodes: []
  },
	methods: {
    addConnection: function(data) {
      this.nodes.push(data);
		},
    showDeleteDialog: function(connstr) {
			ipc.send('open-dialog-window', connstr);
		}
	}
});


for (let i = 0; i < conf.size; i++) {
	var connstr = 'conn-'+ i.toString() + '-true';
	var value = conf.get(connstr);
	if(value !== undefined && value['isAble']==='true'){
		tree.nodes.push(value)
	}
};