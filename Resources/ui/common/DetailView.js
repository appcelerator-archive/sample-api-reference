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
	
	self.addEventListener('itemSelected', function(e) {
		var data = [],
			parts = [],
			i = 0,
			len = e.objects.length;
			
		e.objects.sort();
		for (; i < len; i++) {
			parts = e.objects[i].split(".");
			data.push({
				title:parts[parts.length-1],
				hasChild:true,
				name:e.objects[i]
			});
		}
		table.setData(data);
	});
	
	return self;
};
