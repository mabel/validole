var fs   = require('fs')
var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var xslt = require('node_xslt')
var xslString = require('./xsl-string')
var document = xslt.readXmlFile('models.xml');
var stylesheet = xslt.readXsltString(xslString)

var outDirs = {
	client: 'out_client',
	server: 'out_server',
}

gulp.task('client', function(){
	produce('client')
})

gulp.task('server', function(){
	produce('server')
})

function produce(target){
	var transformedString = xslt.transform(stylesheet, document, ['target', '"' + target + '"']);
	fs.writeFile('validate_' + target + '.js', transformedString)
	gulp.src(['validate_' + target + '.js', 'validator.js']).pipe(concat(target + '.min.js')).pipe(uglify()).pipe(gulp.dest(outDirs[target]))
}

gulp.task('default', ['server', 'client'])
