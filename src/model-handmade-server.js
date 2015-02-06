module.exports = function(){
	Controller.prototype.checkModel = function(){
		var req = this.req
		var res = this.res
		var attrs = _.clone(req.body)
		var modelName = req.path.replace("/set", "").substring(1)
		modelName = modelName.substring(0, 1).toUpperCase() + modelName.substring(2) 
		var Model = getStuff('model.' + modelName)
		var model = new Model(attrs)
		if(!model.isValid()){
			res.json(1000)
			console.log(model.validationError)
			return false
		}
		return model
	}
}
