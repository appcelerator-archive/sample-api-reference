//Application Window Component Constructor
exports.ApplicationWindow = function() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView').MasterView,
		DetailView = require('ui/common/DetailView').DetailView,
		ExampleView = require('/ui/common/ExampleView').ExampleView,
		//pull in our data service and grab the primary nav data
		data = require('services/data'),
		navData = data.fetchNavData();
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var masterView = new MasterView(navData),
		detailView = new DetailView(),
		exampleView = new ExampleView();
		
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'Modules'
	});
	masterContainerWindow.add(masterView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Objects'
	});
	detailContainerWindow.add(detailView);
	
	var exampleContainerWindow = Ti.UI.createWindow({
		title:'Examples'
	});
	exampleContainerWindow.add(exampleView);
	
	//createiOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		//Ti.API.info('objects: '+e.objects.length+'\nexamples: '+e.examples.length);
		
		if (e.objects.length > 0) {
			detailView.fireEvent('itemSelected',e);
			navGroup.open(detailContainerWindow);
		} else {
			exampleView.fireEvent('itemSelected',e);
			navGroup.open(exampleContainerWindow);
		}
	});
	
	detailView.addEventListener('detailSelected', function(e) {
		//Ti.API.info('det selected: '+e.name+' == > '+e.examples);
		exampleView.fireEvent('itemSelected', e);
		navGroup.open(exampleContainerWindow);
	});
	
	exampleView.addEventListener('exampleSelected', function(e) {
		
	});
	
	return self;
};
