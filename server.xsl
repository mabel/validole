<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output   method="text"/>
	<xsl:variable name="cr"><xsl:text>&#xa;</xsl:text></xsl:variable>
	<xsl:variable name="cr2sp" ><xsl:text>&#xa;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr4sp" ><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr6sp" ><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr8sp" ><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr10sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr12sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr14sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr16sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr18sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>
	<xsl:variable name="cr20sp"><xsl:text>&#xa;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;&#x20;</xsl:text></xsl:variable>

	<xsl:template match="/">
    <xsl:value-of select="concat('/***************************************************************', $cr)"/>
    <xsl:value-of select="concat('***           Code beneath is generated automatically.       ***', $cr)"/>
    <xsl:value-of select="concat('***                  Please don not edit this.               ***', $cr)"/>
    <xsl:value-of select="concat('***                                                          ***', $cr)"/>
    <xsl:value-of select="concat('***************************************************************/', $cr, $cr)"/>
	<xsl:value-of select="concat('var _  = require(&quot;underscore&quot;)', $cr)"/>
	<xsl:value-of select="concat('var Backbone = require(&quot;backbone&quot;)', $cr)"/>
	<xsl:value-of select="concat('var validator = require(&quot;./validator&quot;)', $cr, $cr)"/>
	<xsl:for-each select="/models/model">
	  <xsl:value-of select="concat($cr, 'var ', @name, ' = Backbone.Model.extend({')"/>
	  <xsl:value-of select="concat($cr2sp, 'validate: function(attrs, opts){')"/>
	  <xsl:for-each select="params/param">
	    <xsl:value-of select="concat($cr4sp, 'var notEmpty = ')"/>
 	    <xsl:choose>
			<xsl:when test='@notempty'>true</xsl:when>
			<xsl:otherwise>false</xsl:otherwise>
		</xsl:choose>
	    <xsl:value-of select="string(';')"/>
		<xsl:value-of select="concat($cr4sp, 'if(!validator(this.get(&quot;', @name, '&quot;), &quot;', @filter, '&quot;), notEmpty){')"/>
	    <xsl:value-of select="concat($cr6sp, 'return &quot;', @name, '&quot;;')"/>
		<xsl:value-of select="concat($cr4sp, '};')"/>
	  </xsl:for-each>  
	  <xsl:value-of select="concat($cr2sp, '},')"/>
	  <xsl:value-of select="concat($cr, '});', $cr, $cr)"/>
	</xsl:for-each>  
    <xsl:value-of select="concat('exports.getModel = function(modelName){', $cr)"/>
	<xsl:value-of select="concat($cr2sp, 'switch(modelName){')"/>
	<xsl:for-each select="/models/model">
	  <xsl:value-of select="concat($cr4sp, 'case &quot;', @name, '&quot;: ', $cr6sp, 'return ', @name, ';')"/>
	</xsl:for-each>  
	<xsl:value-of select="concat($cr2sp, '};')"/>
	<xsl:value-of select="concat($cr2sp, 'return null;', $cr)"/>
    <xsl:value-of select="concat('}', $cr)"/>
    </xsl:template>
</xsl:stylesheet>
