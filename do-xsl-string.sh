#!/bin/bash
echo 'module.exports = ["",' > xsl-string.js
cat models.xsl | sed 's/\"/\\"/g;s/^/  , "/;s/$/"/' >> xsl-string.js
echo '].join("\n")' >> xsl-string.js

