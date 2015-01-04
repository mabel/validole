
var User = Backbone.Model.extend({
  url: "/User".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["login"], "/^[A-Za-z0-9\-_]+$/", notEmpty)){
      return "Error@User.login";
    };
    notEmpty = true;
    if(!validator(attrs["firstName"], "any", notEmpty)){
      return "Error@User.firstName";
    };
    notEmpty = false;
    if(!validator(attrs["middleName"], "any", notEmpty)){
      return "Error@User.middleName";
    };
    notEmpty = true;
    if(!validator(attrs["lastName"], "any", notEmpty)){
      return "Error@User.lastName";
    };
    notEmpty = true;
    if(!validator(attrs["email"], "email", notEmpty)){
      return "Error@User.email";
    };
    notEmpty = true;
    if(!validator(attrs["password"], "password", notEmpty)){
      return "Error@User.password";
    };
    notEmpty = true;
    if(!validator(attrs["passwordAgain"], "password", notEmpty)){
      return "Error@User.passwordAgain";
    };
    if(attrs["password"] != attrs["passwordAgain"]){
      return "Error@User.passwordAgain";
    };
    notEmpty = false;
    if(!validator(attrs["alarmEmail"], "email", notEmpty)){
      return "Error@User.alarmEmail";
    };
    notEmpty = false;
    if(!validator(attrs["alarmSMS"], "phone", notEmpty)){
      return "Error@User.alarmSMS";
    };
    notEmpty = false;
    if(!validator(attrs["phoneSupport"], "phone", notEmpty)){
      return "Error@User.phoneSupport";
    };
    notEmpty = false;
    if(!validator(attrs["phoneSecurity"], "phone", notEmpty)){
      return "Error@User.phoneSecurity";
    };
  }
})

var UserCollection = Backbone.Collection.extend({
  model: User
})

var MainDevice = Backbone.Model.extend({
  url: "/MainDevice".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["type"], "simple|middle|vip", notEmpty)){
      return "Error@MainDevice.type";
    };
    notEmpty = true;
    if(!validator(attrs["amount"], "integer", notEmpty)){
      return "Error@MainDevice.amount";
    };
  }
})

var MainDeviceCollection = Backbone.Collection.extend({
  model: MainDevice
})

var Device = Backbone.Model.extend({
  url: "/Device".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["model"], "/[A-Za-z0-9\-]+/", notEmpty)){
      return "Error@Device.model";
    };
    notEmpty = true;
    if(!validator(attrs["amount"], "integer", notEmpty)){
      return "Error@Device.amount";
    };
    notEmpty = true;
    if(!validator(attrs["category"], "security|energy|comfort|infrastructure", notEmpty)){
      return "Error@Device.category";
    };
    notEmpty = true;
    if(!validator(attrs["group"], "dimmer|jack", notEmpty)){
      return "Error@Device.group";
    };
  }
})

var DeviceCollection = Backbone.Collection.extend({
  model: Device
})

var Geoobject = Backbone.Model.extend({
  url: "/Geoobject".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["label"], "any", notEmpty)){
      return "Error@Geoobject.label";
    };
    notEmpty = true;
    if(!validator(attrs["lat"], "latitude", notEmpty)){
      return "Error@Geoobject.lat";
    };
    notEmpty = true;
    if(!validator(attrs["lon"], "longitude", notEmpty)){
      return "Error@Geoobject.lon";
    };
    notEmpty = true;
    if(!validator(attrs["type"], "garage|cottage|apartment|factory|plant|parcel", notEmpty)){
      return "Error@Geoobject.type";
    };
    notEmpty = true;
    if(!validator(attrs["uuid"], "uuid", notEmpty)){
      return "Error@Geoobject.uuid";
    };
  }
})

var GeoobjectCollection = Backbone.Collection.extend({
  model: Geoobject
})

var Scheme = Backbone.Model.extend({
  url: "/Scheme".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["label"], "any", notEmpty)){
      return "Error@Scheme.label";
    };
    notEmpty = true;
    if(!validator(attrs["uuid"], "uuid", notEmpty)){
      return "Error@Scheme.uuid";
    };
    notEmpty = true;
    if(!validator(attrs["geoobject"], "uuid", notEmpty)){
      return "Error@Scheme.geoobject";
    };
  }
})

var SchemeCollection = Backbone.Collection.extend({
  model: Scheme
})

var Equipment = Backbone.Model.extend({
  url: "/Equipment".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    notEmpty = true;
    if(!validator(attrs["label"], "any", notEmpty)){
      return "Error@Equipment.label";
    };
    notEmpty = true;
    if(!validator(attrs["uuid"], "uuid", notEmpty)){
      return "Error@Equipment.uuid";
    };
    notEmpty = true;
    if(!validator(attrs["model"], "/[A-Za-z0-9\-]+/", notEmpty)){
      return "Error@Equipment.model";
    };
    notEmpty = true;
    if(!validator(attrs["category"], "security|energy|comfort|infrastructure", notEmpty)){
      return "Error@Equipment.category";
    };
    notEmpty = true;
    if(!validator(attrs["group"], "dimmer|jack", notEmpty)){
      return "Error@Equipment.group";
    };
  }
})

var EquipmentCollection = Backbone.Collection.extend({
  model: Equipment
})
