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
	.pipe(concat('32_model.js'))
	.pipe(replace('//_MODEL_BEGIN', [''
		, 'var _ = require("underscore"), Backbone = require("backbone");'
	].join('\n')))
	.pipe(replace('//_MODEL_END', [''
		, ' return new MainCollection'
		, '})'
	].join('\n')))
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
	.pipe(concat('95_behavior.js'))
	.pipe(replace('//_MODEL_BEGIN', ['',
		'define(["underscore", "backbone"], function(_, Backbone){'
	].join('\n')))
	.pipe(replace('//_MODEL_END', [''
		, ' return new MainCollection'
		, '})'
	].join('\n')))
	.pipe(gulp.dest('../server/public/js'))
})

gulp.task('model', ['model:templates', 'model:client', 'model:server'])
gulp.task('default', ['model'])
