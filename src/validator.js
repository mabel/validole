function validator(value, filter, mayNotBeEmpty){
  if(mayNotBeEmpty && !value) return false
  if(!mayNotBeEmpty && !value) return true
  if(value.length > 256) return false
  if(/^\/.+\/$/.test(filter)){
	  var reg = eval(filter)
	  return reg.test(value)
  }
  if(filter.indexOf('|') > -1){
	var arr = filter.split('|')
	return arr.indexOf(value) > -1
  }
  if(filter.indexOf('function') > -1){
	var fnc = eval(filter)
	return typeof fnc == 'function' && fnc(value)
  }
  switch(filter){
		case 'bool':
		case 'boolean':
			return typeof value === 'boolean' || value === 'true' || value === 'false'
		case 'yes':
		case 'true':
			return (typeof value === 'boolean' && value) || value === 'true'
		case 'any':
			return value.trim().length > 0
		case 'login':
		case 'alphanum':
		case 'alphanumeric':
	        return /^[A-Za-z0-9\-_]+$/.test(value)
		case 'int':
		case 'integer':
			return !isNaN(value) && /^\d+$/.test(value)
		case 'float':
		case 'double':
		case 'decimal':
		case 'number':
			return !isNaN(value) && /^\d+(\.\d+)?$/.test(value)
		case 'latitude':
			if(isNaN(value)) return false
			var lat = parseFloat(value)
			return lat >= -90 && lat <= 90
		case 'longitude':
			if(isNaN(value)) return false
			var lon = parseFloat(value)
			return lon >= -180 && lon <= 180
		case 'pwd':
		case 'pass':
		case 'passwd':
		case 'password':
      		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-z]).{8,30}$/.test(value)
		case 'mail':
		case 'email':
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		case 'uuid':
            return /^([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}$/.test(value);
		default: 
            return false
  }
}

