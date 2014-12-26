var fs   = require('fs')
var gulp = require('gulp')
var xslt = require('node_xslt')

gulp.task('default', function(){
	var document = xslt.readXmlFile('models.xml');
	var stylesheet = xslt.readXsltFile('server.xsl')
	var transformedString = xslt.transform(stylesheet, document, []);
	fs.writeFile('validate_server.js', transformedString)
	//stylesheet = xslt.readXsltFile('client.xsl')
	//transformedString = xslt.transform(stylesheet, document, []);
	//fs.writeFile('validate_client.js', transformedString)
})
