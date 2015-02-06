var crypto = require('crypto')
var fs   = require('fs')
var gulp = require('gulp')
var uglify  = require('gulp-uglify')
var concat  = require('gulp-concat')
var replace = require('gulp-replace')
var rename = require('gulp-rename')
var xslt = require('node_xslt')
var xslString = require('./xsl-string')
var document = null
var stylesheet = null

gulp.task('redis', function(){
	var redis = require('redis').createClient()
	redis.hmset('sch:user:test', {name: 'Коля'})
	redis.set('sch:restore:pochta@yababay.ru', 'test')
})

gulp.task('model:templates', function(){
    if(!document) document = xslt.readXmlFile('models.xml');
    if(!stylesheet) stylesheet = xslt.readXsltString(xslString)
	var transformedString = xslt.transform(stylesheet, document, []);
	fs.writeFile('src/model-templates.js', transformedString)
})

gulp.task('model:server', function(){
	gulp.src([''
		, 'src/model-begin.js'
		, 'src/validator.js'
		, 'src/model-templates.js'
		, 'src/model-handmade-common.js'
		, 'src/model-handmade-server.js'
		, 'src/model-end.js'
	])
	.pipe(concat('31_model.js'))
	.pipe(replace('//_MODEL_BEGIN', [''
		, 'var _ = require("underscore"), Backbone = require("backbone"),' 
		, '  redis = require("redis").createClient(), Controller = require("locomotive").Controller,'
		, '  shortId = require("shortid"),'
		, '  config  = require("../")'
	].join('\n').trim()))
	.pipe(replace('//_MODEL_END', ''))
	.pipe(gulp.dest('../server/config/initializers'))
})

gulp.task('model:client', function(){
	gulp.src([''
		, 'src/model-begin.js'
		, 'src/validator.js'
		, 'src/model-templates.js'
		, 'src/model-handmade-common.js'
		, 'src/model-handmade-client.js'
		, 'src/model-end.js'
	])
	.pipe(concat('50_model.js'))
	.pipe(replace('//_MODEL_BEGIN', ['',
		'define(["underscore", "backbone"], function(_, Backbone){'
	].join('\n').trim()))
	.pipe(replace('//_MODEL_END', [''
		, '})'
	].join('\n').trim()))
	//.pipe(uglify())
	.pipe(gulp.dest('../server/public/js'))
})

gulp.task('model', ['model:templates', 'model:client', 'model:server'])
gulp.task('default', ['model'])
