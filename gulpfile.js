var minify = require('gulp-uglify')
var fs   = require('fs')
var gulp = require('gulp')
var xslt = require('node_xslt')
var xslString = require('./xsl-string')
var document = xslt.readXmlFile('models.xml');
var stylesheet = xslt.readXsltString(xslString)

var serverDestPath = 'server_out'
var clientDestPath = 'client_out'

gulp.task('default', ['server', 'client'], function(){
	console.log('done')
	//var document = xslt.readXmlFile('models.xml');
	//var stylesheet = xslt.readXsltString(xslString)
	//var stylesheet = xslt.readXsltFile('models.xsl')
	//var transformedString = xslt.transform(stylesheet, document, ['target', '"server"']);
	//var transformedString = xslt.transform(stylesheet, document, ['target', '"client"']);
	//fs.writeFile('validate_server.js', transformedString)
	//stylesheet = xslt.readXsltFile('client.xsl')
	//transformedString = xslt.transform(stylesheet, document, []);
	//fs.writeFile('validate_client.js', transformedString)
})

gulp.task('client', function(){
	var transformedString = xslt.transform(stylesheet, document, ['target', '"client"']);
	fs.writeFile('validate_client.js', transformedString)
	gulp.src('validate_client.js').pipe(minify()).pipe(gulp.dest(clientDestPath))
})

gulp.task('server', function(){
	var transformedString = xslt.transform(stylesheet, document, ['target', '"server"']);
	fs.writeFile('validate_server.js', transformedString)
	gulp.src('validate_client.js').pipe(minify()).pipe(gulp.dest(serverDestPath))
})
