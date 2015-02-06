
var Registration = Backbone.Model.extend({
  url: "/Registration".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    var allParams = [];
    notEmpty = true;
    if(!validator(attrs["login"], "login", notEmpty)){
      return "Error@Registration.login";
    };
    allParams.push("login")
    notEmpty = true;
    if(!validator(attrs["course"], "webdesign|js-client|js-server|linux-admin", notEmpty)){
      return "Error@Registration.course";
    };
    allParams.push("course")
    notEmpty = true;
    if(!validator(attrs["name"], "any", notEmpty)){
      return "Error@Registration.name";
    };
    allParams.push("name")
    notEmpty = true;
    if(!validator(attrs["email"], "email", notEmpty)){
      return "Error@Registration.email";
    };
    allParams.push("email")
    notEmpty = false;
    if(!validator(attrs["skype"], "skype", notEmpty)){
      return "Error@Registration.skype";
    };
    allParams.push("skype")
    notEmpty = false;
    if(!validator(attrs["phone"], "phone", notEmpty)){
      return "Error@Registration.phone";
    };
    allParams.push("phone")
    notEmpty = true;
    if(!validator(attrs["password"], "password", notEmpty)){
      return "Error@Registration.password";
    };
    allParams.push("password")
    notEmpty = true;
    if(!validator(attrs["passwordAgain"], "password", notEmpty)){
      return "Error@Registration.passwordAgain";
    };
    allParams.push("passwordAgain")
    if(attrs["password"] != attrs["passwordAgain"]){
      return "Error@Registration.passwordAgain";
    };
    notEmpty = true;
    if(!validator(attrs["agree"], "yes", notEmpty)){
      return "Error@Registration.agree";
    };
    allParams.push("agree")
    _.each(this.attributes, function(el, i){
      if(allParams.indexOf(i) < 0) return "Error@Registration.oddParam";
    })
  }
})

var RegistrationCollection = Backbone.Collection.extend({
  model: Registration
})

var RegistrationView = Backbone.View.extend({
  constructor: function(el, success, failure, evts){
    var model = new Registration
    this.model = model
    this.showSuccess = success
    this.showFailure = failure
    this.el = el
    this.$el = $(el)
    if(evts){_.extend(this.events, evts)}
    this.delegateEvents()
    view = this
    $(el).find("input[type=hidden]").each(function(){
      var param = $(this).data("param")
      model.set(param, $(this).val())
    })
    this.listenTo(this.model, "invalid", function(){this.showFailure(this.model.validationError)})
  },
  testInput: function(ev){
    var input = $(ev.target)
    var val = $(input).val().trim()
    var key = $(input).attr("class")
    key = key.match(/[a-zA-Z]+$/)[0]
    if(!val) this.model.unset(key)
    else this.model.set(key, val)
  },
  events: {
    "keyup .sch-registration-form-login": "testInput",
    "keyup .sch-registration-form-name": "testInput",
    "keyup .sch-registration-form-email": "testInput",
    "keyup .sch-registration-form-skype": "testInput",
    "keyup .sch-registration-form-phone": "testInput",
    "keyup .sch-registration-form-password": "testInput",
    "keyup .sch-registration-form-passwordAgain": "testInput",
    "click .sch-registration-form-save": function(){
      var view = this 
      this.model.save(null, {
        type: "POST", 
        success: function(model, err){
          if(!err) view.showSuccess()
          else view.showFailure("Error@Registration.save")
        },
        error: function(model, err){
          view.showFailure("Error@Registration.http")
        }
      })
    }
  },
})

var Personal = Backbone.Model.extend({
  url: "/Personal".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    var allParams = [];
    notEmpty = true;
    if(!validator(attrs["name"], "any", notEmpty)){
      return "Error@Personal.name";
    };
    allParams.push("name")
    notEmpty = true;
    if(!validator(attrs["email"], "email", notEmpty)){
      return "Error@Personal.email";
    };
    allParams.push("email")
    notEmpty = false;
    if(!validator(attrs["skype"], "skype", notEmpty)){
      return "Error@Personal.skype";
    };
    allParams.push("skype")
    notEmpty = false;
    if(!validator(attrs["phone"], "phone", notEmpty)){
      return "Error@Personal.phone";
    };
    allParams.push("phone")
    notEmpty = false;
    if(!validator(attrs["password"], "password", notEmpty)){
      return "Error@Personal.password";
    };
    allParams.push("password")
    notEmpty = false;
    if(!validator(attrs["passwordAgain"], "password", notEmpty)){
      return "Error@Personal.passwordAgain";
    };
    allParams.push("passwordAgain")
    if(attrs["password"] != attrs["passwordAgain"]){
      return "Error@Personal.passwordAgain";
    };
    notEmpty = false;
    if(!validator(attrs["passwordOld"], "password", notEmpty)){
      return "Error@Personal.passwordOld";
    };
    allParams.push("passwordOld")
    _.each(this.attributes, function(el, i){
      if(allParams.indexOf(i) < 0) return "Error@Personal.oddParam";
    })
  }
})

var PersonalCollection = Backbone.Collection.extend({
  model: Personal
})

var PersonalView = Backbone.View.extend({
  constructor: function(el, success, failure, evts){
    var model = new Personal
    this.model = model
    this.showSuccess = success
    this.showFailure = failure
    this.el = el
    this.$el = $(el)
    if(evts){_.extend(this.events, evts)}
    this.delegateEvents()
    view = this
    $(el).find("input[type=hidden]").each(function(){
      var param = $(this).data("param")
      model.set(param, $(this).val())
    })
    this.listenTo(this.model, "invalid", function(){this.showFailure(this.model.validationError)})
    this.listenTo(this.model, "change", this.render)
    this.model.fetch()
  },
  testInput: function(ev){
    var input = $(ev.target)
    var val = $(input).val().trim()
    var key = $(input).attr("class")
    key = key.match(/[a-zA-Z]+$/)[0]
    if(!val) this.model.unset(key)
    else this.model.set(key, val)
  },
  render: function(model){
    var view = this
    $.each(model.attributes, function(i, val){
      $(view.el).find(".sch-personal-" + i).val(val)
    })
  },
  events: {
    "keyup .sch-personal-name": "testInput",
    "keyup .sch-personal-email": "testInput",
    "keyup .sch-personal-skype": "testInput",
    "keyup .sch-personal-phone": "testInput",
    "keyup .sch-personal-password": "testInput",
    "keyup .sch-personal-passwordAgain": "testInput",
    "keyup .sch-personal-passwordOld": "testInput",
    "click .sch-personal-save": function(){
      var view = this 
      this.model.save(null, {
        type: "POST", 
        success: function(model, err){
          if(!err) view.showSuccess()
          else view.showFailure("Error@Personal.save")
        },
        error: function(model, err){
          view.showFailure("Error@Personal.http")
        }
      })
    }
  },
})

var Remind = Backbone.Model.extend({
  url: "/Remind".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    var allParams = [];
    notEmpty = true;
    if(!validator(attrs["email"], "email", notEmpty)){
      return "Error@Remind.email";
    };
    allParams.push("email")
    _.each(this.attributes, function(el, i){
      if(allParams.indexOf(i) < 0) return "Error@Remind.oddParam";
    })
  }
})

var RemindCollection = Backbone.Collection.extend({
  model: Remind
})

var RemindView = Backbone.View.extend({
  constructor: function(el, success, failure, evts){
    var model = new Remind
    this.model = model
    this.showSuccess = success
    this.showFailure = failure
    this.el = el
    this.$el = $(el)
    if(evts){_.extend(this.events, evts)}
    this.delegateEvents()
    view = this
    $(el).find("input[type=hidden]").each(function(){
      var param = $(this).data("param")
      model.set(param, $(this).val())
    })
    this.listenTo(this.model, "invalid", function(){this.showFailure(this.model.validationError)})
  },
  testInput: function(ev){
    var input = $(ev.target)
    var val = $(input).val().trim()
    var key = $(input).attr("class")
    key = key.match(/[a-zA-Z]+$/)[0]
    if(!val) this.model.unset(key)
    else this.model.set(key, val)
  },
  events: {
    "keyup .sch-restore-request-email": "testInput",
    "click .sch-restore-request-save": function(){
      var view = this 
      this.model.save(null, {
        type: "POST", 
        success: function(model, err){
          if(!err) view.showSuccess()
          else view.showFailure("Error@Remind.save")
        },
        error: function(model, err){
          view.showFailure("Error@Remind.http")
        }
      })
    }
  },
})

var NewPassword = Backbone.Model.extend({
  url: "/NewPassword".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    var allParams = [];
    notEmpty = true;
    if(!validator(attrs["password"], "password", notEmpty)){
      return "Error@NewPassword.password";
    };
    allParams.push("password")
    notEmpty = true;
    if(!validator(attrs["passwordAgain"], "password", notEmpty)){
      return "Error@NewPassword.passwordAgain";
    };
    allParams.push("passwordAgain")
    if(attrs["password"] != attrs["passwordAgain"]){
      return "Error@NewPassword.passwordAgain";
    };
    notEmpty = true;
    if(!validator(attrs["uuid"], "uuid", notEmpty)){
      return "Error@NewPassword.uuid";
    };
    allParams.push("uuid")
    _.each(this.attributes, function(el, i){
      if(allParams.indexOf(i) < 0) return "Error@NewPassword.oddParam";
    })
  }
})

var NewPasswordCollection = Backbone.Collection.extend({
  model: NewPassword
})

var NewPasswordView = Backbone.View.extend({
  constructor: function(el, success, failure, evts){
    var model = new NewPassword
    this.model = model
    this.showSuccess = success
    this.showFailure = failure
    this.el = el
    this.$el = $(el)
    if(evts){_.extend(this.events, evts)}
    this.delegateEvents()
    view = this
    $(el).find("input[type=hidden]").each(function(){
      var param = $(this).data("param")
      model.set(param, $(this).val())
    })
    this.listenTo(this.model, "invalid", function(){this.showFailure(this.model.validationError)})
  },
  testInput: function(ev){
    var input = $(ev.target)
    var val = $(input).val().trim()
    var key = $(input).attr("class")
    key = key.match(/[a-zA-Z]+$/)[0]
    if(!val) this.model.unset(key)
    else this.model.set(key, val)
  },
  events: {
    "keyup .sch-restore-passwd-password": "testInput",
    "keyup .sch-restore-passwd-passwordAgain": "testInput",
    "click .sch-restore-passwd-save": function(){
      var view = this 
      this.model.save(null, {
        type: "POST", 
        success: function(model, err){
          if(!err) view.showSuccess()
          else view.showFailure("Error@NewPassword.save")
        },
        error: function(model, err){
          view.showFailure("Error@NewPassword.http")
        }
      })
    }
  },
})

var Login = Backbone.Model.extend({
  url: "/Login".toLowerCase(),
  validate: function(attrs, opts){
    var notEmpty = null;
    var allParams = [];
    notEmpty = true;
    if(!validator(attrs["login"], "login", notEmpty)){
      return "Error@Login.login";
    };
    allParams.push("login")
    notEmpty = true;
    if(!validator(attrs["password"], "password", notEmpty)){
      return "Error@Login.password";
    };
    allParams.push("password")
    _.each(this.attributes, function(el, i){
      if(allParams.indexOf(i) < 0) return "Error@Login.oddParam";
    })
  }
})

var LoginCollection = Backbone.Collection.extend({
  model: Login
})

var LoginView = Backbone.View.extend({
  constructor: function(el, success, failure, evts){
    var model = new Login
    this.model = model
    this.showSuccess = success
    this.showFailure = failure
    this.el = el
    this.$el = $(el)
    if(evts){_.extend(this.events, evts)}
    this.delegateEvents()
    view = this
    $(el).find("input[type=hidden]").each(function(){
      var param = $(this).data("param")
      model.set(param, $(this).val())
    })
    this.listenTo(this.model, "invalid", function(){this.showFailure(this.model.validationError)})
  },
  testInput: function(ev){
    var input = $(ev.target)
    var val = $(input).val().trim()
    var key = $(input).attr("class")
    key = key.match(/[a-zA-Z]+$/)[0]
    if(!val) this.model.unset(key)
    else this.model.set(key, val)
  },
  events: {
    "keyup .sch-login-login": "testInput",
    "keyup .sch-login-password": "testInput",
    "click .sch-login-save": function(){
      var view = this 
      this.model.save(null, {
        type: "POST", 
        success: function(model, err){
          if(!err) view.showSuccess()
          else view.showFailure("Error@Login.save")
        },
        error: function(model, err){
          view.showFailure("Error@Login.http")
        }
      })
    }
  },
})


var getStuff = function(model){
  switch(model){
    case "model.Registration":
      return Registration
    case "view.Registration":
      return RegistrationView
    case "collection.Registration":
      return RegistrationCollection
    case "model.Personal":
      return Personal
    case "view.Personal":
      return PersonalView
    case "collection.Personal":
      return PersonalCollection
    case "model.Remind":
      return Remind
    case "view.Remind":
      return RemindView
    case "collection.Remind":
      return RemindCollection
    case "model.NewPassword":
      return NewPassword
    case "view.NewPassword":
      return NewPasswordView
    case "collection.NewPassword":
      return NewPasswordCollection
    case "model.Login":
      return Login
    case "view.Login":
      return LoginView
    case "collection.Login":
      return LoginCollection
  }
}
