 //Detail View Component Constructor
exports.DetailView = function() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:"#fff"
	});
	
	var table = Ti.UI.createTableView({
		data:[]
	});
	self.add(table);
	
	table.addEventListener('click', function(e) {
		self.fireEvent('detailSelected', {
			name:e.rowData.name,
			examples:e.rowData.examples
		});
	});
	
	self.addEventListener('itemSelected', function(e) {
		var data = [],
			parts = [],
			i = 0,
			len = e.objects.length;
			
		Ti.API.info(e.objects);
		for (; i < len; i++) {
			parts = e.objects[i].name.split(".");
			data.push({
				title:parts[parts.length-1],
				hasChild:true,
				name:e.objects[i].name,
				examples:e.objects[i].examples
			});
		}
		table.setData(data);
	});
	
	return self;
};
