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
		  <xsl:choose>
			  <xsl:when test='@urlPrefix'>
				<xsl:value-of select="concat($cr2sp, 'url: &quot;', @urlPrefix, '/', @name, '&quot;.toLowerCase(),')"/>
			  </xsl:when>
			  <xsl:otherwise>
			  	<xsl:value-of select="concat($cr2sp, 'url: &quot;/', @name, '&quot;.toLowerCase(),')"/>
			  </xsl:otherwise>
		  </xsl:choose>
		  <xsl:value-of select="concat($cr2sp, 'validate: function(attrs, opts){')"/>
		  <xsl:value-of select="concat($cr4sp, 'var notEmpty = null;')"/>
		  <xsl:value-of select="concat($cr4sp, 'var isConst  = false;')"/>
		  <xsl:value-of select="concat($cr4sp, 'var allParams = [];')"/>
		  <xsl:for-each select="params/param">
			<xsl:choose>
				<xsl:when test="@const = 'true' and @value">
				  <xsl:value-of select="concat($cr4sp, 'isConst = true; this.set(&quot;', @name, '&quot;, &quot;', @value, '&quot;);')"/>
				</xsl:when>
				<xsl:otherwise>
				  <xsl:value-of select="concat($cr4sp, 'isConst = false')"/>
			  </xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="concat($cr4sp, 'notEmpty = ')"/>
			<xsl:choose>
				<xsl:when test='@notempty'>true</xsl:when>
				<xsl:otherwise>false</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="string(';')"/>
			<xsl:value-of select="concat($cr4sp, 'if(!isConst &amp;&amp; !validator(attrs[&quot;', @name, '&quot;], &quot;', @filter, '&quot;, notEmpty)){')"/>
			<xsl:value-of select="concat($cr6sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
			<xsl:value-of select="concat($cr4sp, '};')"/>
			<xsl:value-of select="concat($cr4sp, 'allParams.push(&quot;', @name, '&quot;)')"/>
			<xsl:if test="@name = 'passwordAgain'">
			  <xsl:value-of select="concat($cr4sp, 'if(attrs[&quot;password&quot;] != attrs[&quot;passwordAgain&quot;]){')"/>
				<xsl:value-of select="concat($cr6sp, 'return &quot;Error@', ../../@name, '.', @name, '&quot;;')"/>
			  <xsl:value-of select="concat($cr4sp, '};')"/>
			</xsl:if>
		  </xsl:for-each>  
		  <xsl:value-of select="concat($cr4sp, '_.each(this.attributes, function(el, i){')"/>
		  <xsl:value-of select="concat($cr6sp, 'if(allParams.indexOf(i) &lt; 0) return &quot;Error@', @name, '.oddParam&quot;;')"/>
		  <xsl:value-of select="concat($cr4sp, '})')"/>
		  <xsl:value-of select="concat($cr2sp, '}')"/>
		  <xsl:value-of select="concat($cr, '})', $cr)"/>
		  <xsl:if test="@table = 'true'">
			  <xsl:value-of select="concat($cr, 'var ', @name, ' Table = function(tr, arr, success, failure, evts){')"/>
			  <xsl:value-of select="concat($cr2sp, 'if(!arr) return')"/>
			  <xsl:value-of select="concat($cr2sp, 'this.tr = tr')"/>
			  <xsl:value-of select="concat($cr2sp, 'var table = this')"/>
			  <xsl:value-of select="concat($cr2sp, 'var collection = new ', @name, ' Collection')"/>
			  <xsl:value-of select="concat($cr2sp, 'var onAdd = function(model){')"/>
			  <xsl:value-of select="concat($cr2sp, 'if(!$(table.tr).is(&quot;tr&quot;)) return')"/>
			  <xsl:value-of select="concat($cr2sp, 'var tbody = $(table.tr).parent()')"/>
			  <xsl:value-of select="concat($cr2sp, 'var tr = $(table.tr).clone().removeClass(&quot;hidden&quot;).appendTo(tbody)')"/>
			  <xsl:value-of select="concat($cr2sp, 'new @name View (tr, success, failure, evts, model)')"/>
			  <xsl:value-of select="concat($cr2sp, '}')"/>
			  <xsl:value-of select="concat($cr2sp, 'collection.on(&quot;add&quot;, onAdd)')"/>
			  <xsl:value-of select="concat($cr2sp, 'if(typeof arr === &quot;string&quot;) arr = arr.split(&quot;,&quot;)')"/>
			  <xsl:value-of select="concat($cr2sp, '_.each(arr, function(el, i){')"/>
			  <xsl:value-of select="concat($cr4sp, 'collection.add({id: el})')"/>
			  <xsl:value-of select="concat($cr2sp, '})')"/>
			  <xsl:value-of select="concat($cr, '}', $cr)"/>
		  </xsl:if>
		  <xsl:value-of select="concat($cr, 'var ', @name, 'Collection = Backbone.Collection.extend({')"/>
			  <xsl:value-of select="concat($cr2sp, 'model: ', @name)"/>
		  <xsl:value-of select="concat($cr, '})', $cr)"/>
		  <xsl:if test="@view = 'true' or @table = 'true'">
			  <xsl:value-of select="concat($cr, 'var ', @name, 'View = Backbone.View.extend({')"/>
			  <xsl:value-of select="concat($cr2sp, 'constructor: function(el, success, failure, evts, mdl){')"/>
			  <xsl:value-of select="concat($cr4sp, 'var model = mdl ? mdl : new ', @name)"/>
			  <xsl:value-of select="concat($cr4sp, 'this.model = model')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.showSuccess = success')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.showFailure = failure')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.el = el')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.$el = $(el)')"/>
			  <xsl:value-of select="concat($cr4sp, 'if(evts){_.extend(this.events, evts)}')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.delegateEvents()')"/>
			  <xsl:value-of select="concat($cr4sp, 'view = this')"/>
			  <xsl:value-of select="concat($cr4sp, '$(el).find(&quot;input[type=hidden]&quot;).each(function(){')"/>
			  <xsl:value-of select="concat($cr6sp, 'var param = $(this).data(&quot;param&quot;)')"/>
			  <xsl:value-of select="concat($cr6sp, 'model.set(param, $(this).val())')"/>
			  <xsl:value-of select="concat($cr4sp, '})')"/>
			  <xsl:value-of select="concat($cr4sp, 'this.listenTo(this.model, &quot;invalid&quot;, function(){this.showFailure(this.model.validationError)})')"/>
		  	  <xsl:if test="@fetch = 'true'">
			    <xsl:value-of select="concat($cr4sp, 'this.listenTo(this.model, &quot;change&quot;, this.render)')"/>
			    <xsl:value-of select="concat($cr4sp, 'this.model.fetch()')"/>
	  		  </xsl:if>
			  <xsl:value-of select="concat($cr2sp, '},')"/>
			  <xsl:value-of select="concat($cr2sp, 'testInput: function(ev){')"/>
			  <xsl:value-of select="concat($cr4sp, 'var input = $(ev.target)')"/>
			  <xsl:value-of select="concat($cr4sp, 'var val = $(input).is(&quot;[type=checkbox]&quot;) ? $(input).prop(&quot;checked&quot;) : $(input).val().trim()')"/>
			  <xsl:value-of select="concat($cr4sp, 'var key = $(input).attr(&quot;class&quot;)')"/>
			  <xsl:value-of select="concat($cr4sp, 'key = key.match(/[a-zA-Z]+$/)[0]')"/>
			  <xsl:value-of select="concat($cr4sp, 'if(!val) this.model.unset(key)')"/>
			  <xsl:value-of select="concat($cr4sp, 'else this.model.set(key, val)')"/>
			  <xsl:value-of select="concat($cr2sp, '},')"/>
		  	  <xsl:if test="@render = 'true'">
				  <xsl:value-of select="concat($cr2sp, 'render: function(model){')"/>
				  <xsl:value-of select="concat($cr4sp, 'var view = this')"/>
				  <xsl:value-of select="concat($cr4sp, '$.each(model.attributes, function(i, val){')"/>
				  <xsl:value-of select="concat($cr6sp, 'var jqEl = $(view.el).find(&quot;', @selector, '&quot; + i)')"/>
				  <xsl:value-of select="concat($cr6sp, 'if(!jqEl.length) return')"/>
				  <xsl:value-of select="concat($cr6sp, 'if($(jqEl[0]).is(&quot;input&quot;)) $(jqEl).val(val)')"/>
				  <xsl:value-of select="concat($cr6sp, 'if($(jqEl[0]).is(&quot;label, span, div, td&quot;)) $(jqEl).text(val)')"/>
				  <xsl:value-of select="concat($cr4sp, '})')"/>
				  <xsl:value-of select="concat($cr2sp, '},')"/>
	  		  </xsl:if>
			  <xsl:value-of select="concat($cr2sp, 'events: {')"/>
			  <xsl:for-each select="params/param[@text='true']">
			  	<xsl:value-of select="concat($cr4sp, '&quot;keyup ', ../../@selector, @name, '&quot;: &quot;testInput&quot;,')"/>
		      </xsl:for-each>
			  <xsl:for-each select="params/param[@choice='true']">
			  	<xsl:value-of select="concat($cr4sp, '&quot;change ', ../../@selector, @name, '&quot;: &quot;testInput&quot;,')"/>
		      </xsl:for-each>
			  <xsl:for-each select="params/param[@checkbox='true']">
			  	<xsl:value-of select="concat($cr4sp, '&quot;change ', ../../@selector, @name, '&quot;: &quot;testInput&quot;,')"/>
		      </xsl:for-each>
			  <xsl:value-of select="concat($cr4sp,  '&quot;click ', @selector, 'save&quot;: function(){')"/>
			  <xsl:value-of select="concat($cr6sp,  'var view = this	')"/>
			  <xsl:value-of select="concat($cr6sp,  'this.model.save(null, {')"/>
			  <xsl:value-of select="concat($cr8sp,  'type: &quot;POST&quot;, ')"/>
			  <xsl:value-of select="concat($cr8sp,  'success: function(model, err){')"/>
			  <xsl:value-of select="concat($cr10sp, 'if(!err &amp;&amp; view.showSuccess) view.showSuccess()')"/>
			  <xsl:value-of select="concat($cr10sp, 'else if(view.showFailure) view.showFailure(&quot;Error@', @name, '.save&quot;)')"/>
			  <xsl:value-of select="concat($cr8sp,  '},')"/>
			  <xsl:value-of select="concat($cr8sp,  'error: function(model, err){')"/>
			  <xsl:value-of select="concat($cr10sp, 'if(view.showFailure) view.showFailure(&quot;Error@', @name, '.http&quot;)')"/>
			  <xsl:value-of select="concat($cr8sp,  '}')"/>
			  <xsl:value-of select="concat($cr6sp,  '})')"/>
			  <xsl:value-of select="concat($cr4sp,  '}')"/>
			  <xsl:value-of select="concat($cr2sp,  '},')"/>
			  <xsl:value-of select="concat($cr, '})', $cr)"/>
		  </xsl:if>
		</xsl:for-each>  
		<xsl:value-of select="concat($cr, $cr, 'var getStuff = function(model){')"/>
		<xsl:value-of select="concat($cr2sp,  'switch(model){')"/>
			<xsl:for-each select="/models/model">
				<xsl:value-of select="concat($cr4sp,  'case &quot;model.', @name, '&quot;:')"/>
				<xsl:value-of select="concat($cr6sp,  'return ', @name)"/>
				<xsl:value-of select="concat($cr4sp,  'case &quot;view.', @name, '&quot;:')"/>
				<xsl:value-of select="concat($cr6sp,  'return ', @name, 'View')"/>
				<xsl:value-of select="concat($cr4sp,  'case &quot;collection.', @name, '&quot;:')"/>
				<xsl:value-of select="concat($cr6sp,  'return ', @name, 'Collection')"/>
				<xsl:value-of select="concat($cr4sp,  'case &quot;table.', @name, '&quot;:')"/>
				<xsl:value-of select="concat($cr6sp,  'return ', @name, 'Table')"/>
			</xsl:for-each>  
			<xsl:value-of select="concat($cr4sp,  'default:')"/>
			<xsl:value-of select="concat($cr6sp,  'return null')"/>
		<xsl:value-of select="concat($cr2sp,  '}')"/>
		<xsl:value-of select="concat($cr,  '}', $cr)"/>
    </xsl:template>
</xsl:stylesheet>
