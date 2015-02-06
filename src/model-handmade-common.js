if(typeof global === 'undefined'){
	Backbone.nativeSync = Backbone.sync
	Backbone.sync = function (method, model, options){
		options.url = model.url + (method == 'read' ? '/get/' + model.id : '/set') 
		return Backbone.nativeSync(method, model, options);
	}
}

var redis = null

if(typeof window === 'undefined'){
	if(!redis) redis = require('redis').createClient()
	Backbone.sync = function(method, model, options){
		if(model.login){model.id = model.login; delete model.login} 
		var key = config.prefix + ':' + model.id
		delete model.attributes.id
		redis.hmset(key, model.attributes)
	}
}
