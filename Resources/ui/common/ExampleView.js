// Examples View Component Constructor
exports.ExampleView = function() {
	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	}),
		defData = [{title:'No Examples Yet'}],
		table = Ti.UI.createTableView({
			data:defData
		});
	self.add(table);
	
	table.addEventListener('click',function(e) {
		alert(e.rowData.code);
	});
	
	self.addEventListener('itemSelected', function(e) {
		var exs = e.examples,
			len = exs.length,
			i = 0,
			data = [];
			
		
		if (len > 0) {	
			for (; i < len; i++) {
				data.push({
					title:exs[i].description,
					code:exs[i].code
				});
			}
			table.setData(data);
		} else {
			table.setData(defData);
		}
	});
	
	return self;
};
