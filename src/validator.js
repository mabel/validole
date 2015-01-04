function validator(value, filter, mayNotBeEmpty){
  if(mayNotBeEmpty && !value) return false
  if(!mayNotBeEmpty && !value) return true
  if(/^\/.+\/$/.test(filter)){
	  var reg = eval(filter)
	  return reg.test(value)
  }
  if(filter.indexOf('|') > -0){
	var arr = value.split('|')
	return arr.indexOf(value) > -1
  }
  if(filter.indexOf('function') > -0){
	var fnc = eval(filter)
	return typeof fnc == 'function' && fnc(value)
  }
  switch(filter){
		case 'int':
			return /[\-\+]?\d+/.test(value)

		case 'skype':
			return /[a-zA-Z][a-zA-Z0-9\.,\-]{5,31}/.test(value)

		case 'ldap':
			return /\([a-zA-Z]+=.+\)/.test(value)

		case 'tristate':
			return /^((\-?1)|0)$/.test(value)

		case 'passwd':
		case 'password':
			return typeof value === 'string' && value.length > 7

		case 'mail':
		case 'email':
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);

		case 'url':
			return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);

		case 'date':
		case 'dateISO':
			return /^\d{4}[\-]\d{2}[\-]\d{2}$/.test(value);

		case 'number':
			return typeof value == 'number';

		case 'money':
			return /^\d+(\.\d{1,2})?$/.test(value);

		case 'digits':
			return /^\d+$/.test(value);

		case 'uuid':
                        return /^([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}$/.test(value);

		case 'uid':
                        return /^[A-Z]{3}[0-9]{6}$/.test(value); 

		case 'uids':
                        return /([A-Z]{3}[0-9]{6}\,)+/.test(value); 

      return /^\w+$/.test(value)
		case 'inn':
      return /^\w+$/.test(value);

		case 'swift':
                        return /^\w{8}$/.test(value);
            
		case 'iban':
			return /^[A-Z]{2}\w{2}\s?(\w{4}\s?){2,6}\w{0,4}$/.test(value);

		case 'bool':
			var b = (typeof value === 'boolean') || (typeof value === 'string' && (value === 'true' || value === 'false' || value === 'on' || value === 'off'))
      if(value === 'off' || value === 'false') value = false 
			return b

		case 'phone':
            return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);

		case 'phone+':
            return /^\+\d+$/.test(value);

		default: 
            return value.trim().length >= 1 && value.trim().length <= 256
    }
}

