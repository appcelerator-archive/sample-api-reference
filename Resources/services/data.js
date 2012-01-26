var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'api.json'), 
	json = file.read(),
	osname = Ti.Platform.osname;

exports.fetchNavData = function() {
	var d = JSON.parse(json),
		modules = [],
		data = [],
		i = 0,
		key, api;

	for (key in d) {
		api = d[key];
		if (/^Titanium/.test(key) && api.type === "module") {
			//Ti.API.log(key);
			modules.push(key)
		}
	}
	
	modules.sort();
	var len = modules.length,
		compat = false,
		j = 0;
		
	for (; i < len; i++) {
		//Ti.API.log(modules[i]);
		api = d[modules[i]];
		//Ti.API.info(modules[i]);
		compat = false;
		for (; j < api.platforms.length; j++) {
			//Ti.API.log(api.platforms[j].name);
			if (api.platforms[j].name === osname) {
				compat = true;
			}
		}
		j = 0;
		
		if (compat) {
			data.push({
				title:modules[i],
				hasChild:true,
				objects:api.objects
			});
		}
	}
	return data;
};