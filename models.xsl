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
		<xsl:for-each select="/models/model">
		  <xsl:value-of select="concat($cr, 'var ', @name, ' = Backbone.Model.extend({')"/>
		  <xsl:value-of select="concat($cr2sp, 'url: &quot;/', @name, '&quot;.toLowerCase(),')"/>
		  <xsl:value-of select="concat($cr2sp, 'validate: function(attrs, opts){')"/>
		  <xsl:value-of select="concat($cr4sp, 'var notEmpty = null;')"/>
		  <xsl:for-each select="params/param">
			<xsl:value-of select="concat($cr4sp, 'notEmpty = ')"/>
			<xsl:choose>
				<xsl:when test='@notempty'>true</xsl:when>
				<xsl:otherwise>false</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="string(';')"/>
			<xsl:value-of select="concat($cr4sp, 'if(!validator(attrs[&quot;', @name, '&quot;], &quot;', @filter, '&quot;, notEmpty)){')"/>
			<xsl:value-of select="concat($cr6sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
			<xsl:value-of select="concat($cr4sp, '};')"/>
			<xsl:if test="@name = 'passwordAgain'">
			  <xsl:value-of select="concat($cr4sp, 'if(attrs[&quot;password&quot;] != attrs[&quot;passwordAgain&quot;]){')"/>
				<xsl:value-of select="concat($cr6sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
			  <xsl:value-of select="concat($cr4sp, '};')"/>
			</xsl:if>
		  </xsl:for-each>  
		  <xsl:value-of select="concat($cr2sp, '}')"/>
		  <xsl:value-of select="concat($cr, '})', $cr)"/>
		  <xsl:value-of select="concat($cr, 'var ', @name, 'Collection = Backbone.Collection.extend({')"/>
		  <xsl:value-of select="concat($cr2sp, 'model: ', @name)"/>
		  <xsl:value-of select="concat($cr, '})', $cr)"/>
		</xsl:for-each>  
    </xsl:template>
</xsl:stylesheet>
