var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'api.json'), 
	json = file.read(),
	d = JSON.parse(json),
	osname = Ti.Platform.osname;
	
exports.query = function(_key) {
	return d[_key];
};

exports.fetchNavData = function() {
	var modules = [],
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
		j = 0, k = 0,
		objs = [];
		
	for (; i < len; i++) {
		//Ti.API.log(modules[i]);
		api = d[modules[i]];
		//Ti.API.info(modules[i]);
		compat = false;
		j = 0;
		for (; j < api.platforms.length; j++) {
			//Ti.API.log(api.platforms[j].name);
			if (api.platforms[j].name === osname) {
				compat = true;
				break;
			}
		}
		
		if (compat) {
			var olen = api.objects.length,
				objs = [];
			if (olen > 0) {
				api.objects.sort();
				for (; k < olen; k++) {
					objs.push({
						name:api.objects[k],
						examples:d[api.objects[k]].examples
					});
				}
			}
			
			data.push({
				title:modules[i],
				hasChild:true,
				objects:objs,
				examples:api.examples,
				platforms:api.platforms
			});
		}
	}
	return data;
};