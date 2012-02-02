//Master View Component Constructor
exports.MasterView = function(_data) {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	
	//populate the table with the nav data
	var table = Ti.UI.createTableView({
		data:_data
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			objects:e.rowData.objects,
			examples:e.rowData.examples,
			platforms:e.rowData.platforms
		});
	});
	
	return self;
};
