<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output   method="text"/>
	<xsl:param name="target">server</xsl:param>
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
    <xsl:choose>
		<xsl:when test="$target = 'server'">
	      <xsl:value-of select="concat('var _  = require(&quot;underscore&quot;)', $cr)"/>
	      <xsl:value-of select="concat('var Backbone = require(&quot;backbone&quot;)', $cr, $cr)"/>
		</xsl:when>
		<xsl:otherwise>
		  <xsl:value-of select="concat('define([&quot;underscore&quot;, &quot;backbone&quot;], function(_, Backbone){', $cr)"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:for-each select="/models/model">
 	  <xsl:value-of select="concat($cr2sp, 'var ', @name, ' = function(attrs, opts){')"/>
	  <xsl:value-of select="concat($cr6sp, 'var notEmpty = null;')"/>
	  <xsl:for-each select="params/param">
	    <xsl:value-of select="concat($cr6sp, 'notEmpty = ')"/>
 	    <xsl:choose>
			<xsl:when test='@notempty'>true</xsl:when>
			<xsl:otherwise>false</xsl:otherwise>
		</xsl:choose>
	    <xsl:value-of select="string(';')"/>
		<xsl:value-of select="concat($cr6sp, 'if(!validator(this.get(&quot;', @name, '&quot;), &quot;', @filter, '&quot;, notEmpty)){')"/>
		<xsl:value-of select="concat($cr8sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
		<xsl:value-of select="concat($cr6sp, '};')"/>
		<xsl:if test="@name = 'passwordAgain'">
		  <xsl:value-of select="concat($cr6sp, 'if(this.get(&quot;password&quot;) != this.get(&quot;passwordAgain&quot;)){')"/>
		    <xsl:value-of select="concat($cr8sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
		  <xsl:value-of select="concat($cr6sp, '};')"/>
		</xsl:if>
	  </xsl:for-each>  
	  <xsl:value-of select="concat($cr4sp, '}', $cr)"/>
	</xsl:for-each>  
 	<xsl:choose>
		<xsl:when test="$target = 'server'">
		   <xsl:value-of select="concat($cr, $cr, 'exports.getModel = function(modelName){')"/>
		</xsl:when>
		<xsl:otherwise><xsl:value-of select="concat($cr2sp, 'return function(modelName){')"/></xsl:otherwise>
	</xsl:choose>
	<xsl:value-of select="concat($cr4sp, 'switch(modelName){')"/>
	<xsl:for-each select="/models/model">
	  <xsl:value-of select="concat($cr6sp, 'case &quot;', @name, '&quot;: ', $cr8sp, 'return ', @name, ';')"/>
	</xsl:for-each>  
	<xsl:value-of select="concat($cr4sp, '};')"/>
	<xsl:value-of select="concat($cr4sp, 'return null;')"/>
    <xsl:choose>
		<xsl:when test="$target = 'server'">
          <xsl:value-of select="concat($cr, '}', $cr)"/>
		</xsl:when>
		<xsl:otherwise>
		  <xsl:value-of select="concat($cr2sp, '}')"/>
		  <xsl:value-of select="concat($cr, '})')"/>
		</xsl:otherwise>
	</xsl:choose>
    <xsl:value-of select="concat($cr, $cr)"/>
    </xsl:template>
</xsl:stylesheet>
