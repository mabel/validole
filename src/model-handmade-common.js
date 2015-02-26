if(typeof global === 'undefined'){
	Backbone.nativeSync = Backbone.sync
	Backbone.sync = function (method, model, options){
		options.url = model.url + (method == 'read' ? '/get/' + model.id : '/set') 
		return Backbone.nativeSync(method, model, options);
	}
}

if(typeof window === 'undefined'){
	var __ = require('underscore')
	var redis = require('redis').createClient()
	Backbone.sync = function(method, model, options){
		var attrs = __.clone(model.attributes)
		var key = attrs.key
		var expire = attrs.expire
		delete attrs.id
		delete attrs.key
		delete attrs.expire
		redis.hmset(key, attrs, function(err){
			if(err || !expire) return
			expire = parseInt(attrs.expire)
			redis.expire(expire)
		})
	}
}
