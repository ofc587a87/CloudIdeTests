
(zk = function (sel) {
	return jq(sel, zk).zk;
}).copy = function (dst, src) {
	dst = dst || {};
	for (var p in src)
		dst[p] = src[p];
	return dst;
};

(function () {
	var _oid = 0,
		_statelesscnt = 0,
		_logmsg,
		_stamps = [];

	function def(nm, before, after) {
		return function (v, opts) {
			if (before) v = before.apply(this, arguments);
			var o = this[nm];
			this[nm] = v;
			if (after && (o !== v || (opts && opts.force)))
				after.apply(this, arguments);
			return this;
		};
	}
	function showprgbInit() {
		
		if (jq.isReady||zk.Page.contained.length)
			_showprgb(true, zk.pi ? 'z-initing': null);
		else
			setTimeout(showprgbInit, 10);
	}
	function showprgb() { 
		_showprgb();
	}
	function _showprgb(mask, icon) {
		if (zk.processing
		&& !jq("#zk_proc").length && !jq("#zk_showBusy").length)
			zUtl.progressbox("zk_proc", window.msgzk?msgzk.PLEASE_WAIT:'Processing...', mask, icon);
	}
	function wgt2s(w) {
		var s = w.className.substring(w.className.lastIndexOf('.') + 1);
		return w.id ? s + '@' + w.id: s + '#' + w.uuid;
	}
	function toLogMsg(ars, isDetailed) {
		var msg = [];
		for (var j = 0, len = ars.length; j < len; j++) {
			if (msg.length) msg.push(", ");
			var ar = ars[j];
			if (ar && (jq.isArray(ar) || ar.zk)) 
				msg.push('[' + toLogMsg(ar, isDetailed) + ']');
			else if (zk.Widget.isInstance(ar))
				msg.push(wgt2s(ar));
			else if (ar && ar.nodeType) {
				var w = zk.Widget.$(ar);
				if (w) msg.push(jq.nodeName(ar), ':', wgt2s(w));
				else msg.push(jq.nodeName(ar), '#', ar.id);
			} else if (isDetailed && ar && (typeof ar == 'object') && !ar.nodeType) {
				var s = ['{\n'];
				for (var v in ar) 
					s.push(v, ':', ar[v], ',\n');
				if (s[s.length - 1] == ',\n') 
					s.pop();
				s.push('\n}');
				msg.push(s.join(''));
			} else if (typeof ar == 'function') {
				var s = '' + ar,
					m = s.indexOf('{'),
					k = m < 0 ? s.indexOf('\n'): -1;
				msg.push(s.substring(0, m > 0 ? m: k > 0 ? k: s.length));
			} else
				msg.push('' + ar);
		}
		return msg.join('');
	}
	function doLog() {
		if (_logmsg) {
			var console = jq("#zk_log");
			if (!console.length) {
				jq(document.body).append(
	'<div id="zk_logbox" class="z-log">'
	+'<button onclick="jq(\'#zk_logbox\').remove()">X</button><br/>'
	+'<textarea id="zk_log" rows="10"></textarea></div>');
				console = jq("#zk_log");
			}
			console = console[0];
			console.value += _logmsg;
			console.scrollTop = console.scrollHeight;
			_logmsg = null;
		}
	}

	function _stampout() {
		if (zk.mounting)
			return zk.afterMount(_stampout);
		zk.stamp('ending');
		zk.stamp();
	}

	
	function _overrideSub(dstpt, nm, oldfn, newfn) {
		for (var sub = dstpt._$subs, j = sub ? sub.length: 0; --j >= 0;) {
			var subpt = sub[j];
			if (subpt[nm] === oldfn) {
				subpt[nm] = newfn;
				_overrideSub(subpt, nm, oldfn, newfn); 
			}
		}
	}


zk.copy(zk, {
	
	procDelay: 900,
	
	tipDelay: 800,
	
	resendDelay: -1,
	
	clickPointer: [0, 0],
	
	currentPointer: [0, 0],
	
	
	
	

	
	loading: 0,
	
	
	
	
	
	
	
	
	
	busy: 0,

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	

	
	
	
	

	
	
	
	

	
	

	
	cut: function (props, nm) {
		var v;
		if (props) {
			v = props[nm];
			delete props[nm];
		}
		return v;
	},

	
	$package: function (name, end, wv) { 
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm], newpkg;
			if (newpkg = !nxt) nxt = ref[nm] = {};
			if (k < 0) {
				if (newpkg && end !== false) zk.setLoaded(name);
					
					
				if (wv) nxt.$wv = true; 
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},
	
	
	$import: function (name, fn) {
		for (var j = 0, ref = window;;) {
			var k = name.indexOf('.', j),
				nm = k >= 0 ? name.substring(j, k): name.substring(j);
			var nxt = ref[nm];
			if (k < 0 || !nxt) {
				if (fn)
					if (nxt) fn(nxt);
					else
						zk.load(name.substring(0, name.lastIndexOf('.')),
							function () {fn(zk.$import(name));});
				return nxt;
			}
			ref = nxt;
			j = k + 1;
		}
	},

	
	$extends: function (superclass, members, staticMembers) {
		if (!superclass)
			throw 'unknown superclass';

		var jclass = function() {
			this.$oid = ++_oid;
			this.$init.apply(this, arguments);

			var ais = this._$ais;
			if (ais) {
				delete this._$ais;
				for (var j = ais.length; j--;)
					ais[j].call(this);
			}
		};

		var thispt = jclass.prototype,
			superpt = superclass.prototype,
			define = members['$define'];
		delete members['$define'];
		zk.copy(thispt, superpt); 
		zk.copy(thispt, members);

		for (var p in superclass) 
			if (p != 'prototype')
				jclass[p] = superclass[p];

		zk.copy(jclass, staticMembers);

		thispt.$class = jclass;
		thispt._$super = superpt;
		thispt._$subs = [];
		superpt._$subs.push(thispt);
			
		jclass.$class = zk.Class;
		jclass.superclass = superclass;

		zk.define(jclass, define);

		return jclass;
	},

	
	$default: function (opts, defaults) {
		opts = opts || {};
		for (var p in defaults)
			if (opts[p] === undefined)
				opts[p] = defaults[p];
		return opts;
	},

	
	
	override: function (dst, backup, src) {
		if (typeof backup == "string") {
			dst['$' + backup] = dst[backup];
			dst[backup] = src;
		} else
			for (var nm in src)
				_overrideSub(dst, nm, backup[nm] = dst[nm], dst[nm] = src[nm]);
		return dst;
	},

	
	define: function (klass, props) {
		for (var nm in props) {
			var nm1 = '_' + nm,
				nm2 = nm.charAt(0).toUpperCase() + nm.substring(1),
				pt = klass.prototype,
				after = props[nm], before = null;
			if (jq.isArray(after)) {
				before = after.length ? after[0]: null;
				after = after.length > 1 ? after[1]: null;
			}
			pt['set' + nm2] = def(nm1, before, after);
			pt['get' + nm2] = pt['is' + nm2] =
				new Function('return this.' + nm1 + ';');
		}
		return klass;
	},

	 
	$void: function () {},

	
	parseInt: function (v, b) {
		return v && !isNaN(v = parseInt(v, b || 10)) ? v: 0;
	},
	
	parseFloat: function (v) {
		return v && !isNaN(v = parseFloat(v)) ? v: 0;
	},

	
	set: function (o, name, value, extra) {
		var m = o['set' + name.charAt(0).toUpperCase() + name.substring(1)];
		if (!m) o[name] = value;
		else if (arguments.length >= 4)
			m.call(o, value, extra);
		else
			m.call(o, value);
	},
	
	get: function (o, name) {
		var nm = name.charAt(0).toUpperCase() + name.substring(1);
			m = o['get' + nm];
		if (m) return m.call(o);
		m = o['is' + nm];
		if (m) return m.call(o);
		return o[name];
	},

	
	
	startProcessing: function (timeout) {
		zk.processing = true;
		setTimeout(jq.isReady ? showprgb: showprgbInit, timeout > 0 ? timeout: 0);
	},
	
	endProcessing: function() {
		zk.processing = false;
		zUtl.destroyProgressbox("zk_proc");
	},

	
	disableESC: function () {
		++zk._noESC;
	},
	
	enableESC: function () {
		--zk._noESC;
	},
	_noESC: 0, 

	
	
	error: function (msg) {
		new _zErb(msg);
	},
	
	errorDismiss: function () {
		_zErb.closeAll();
	},
	
	log: function (detailed) {		
		var msg = toLogMsg(
			(detailed !== zk) ? arguments :
				(function (args) {
					var a = [];
					for (var j = args.length; --j > 0;)
						a.unshift(args[j]);
					return a;
				})(arguments)
			, (detailed === zk)
		);
		_logmsg = (_logmsg ? _logmsg + msg: msg) + '\n';
		setTimeout(function(){jq(doLog);}, 300);
	},
	
	
	stamp: function (nm, noAutoLog) {
		if (nm) {
			if (!noAutoLog && !_stamps.length)
				setTimeout(_stampout, 0);
			_stamps.push({n: nm, t: zUtl.now()});
		} else if (_stamps.length) {
			var t0 = zk._t0;
			for (var inf; (inf = _stamps.shift());) {
				zk.log(inf.n + ': ' + (inf.t - zk._t0));
				zk._t0 = inf.t;
			}
			zk.log("total: " + (zk._t0 - t0));
		}
	},

	_ajaxURI: function ( au, ctx, uri, opts ) {
		//var ctx = zk.Desktop.$(opts?opts.desktop:null);
        //var au = opts && opts.au;
		//ctx = (ctx ? ctx: zk)[au ? 'updateURI': 'contextURI'];

		if (!uri) return ctx;

		var abs = uri.charAt(0) == '/';
		if (au && !abs) {
			abs = true;
			uri = '/' + uri;
		}

		var j = ctx.lastIndexOf(';'), k = ctx.lastIndexOf('?');
		if (j < 0 && k < 0) return abs ? ctx + uri: uri;

		if (k >= 0 && (j < 0 || k < j)) j = k;
		var prefix = abs ? ctx.substring(0, j): '';

		if (opts && opts.ignoreSession)
			return prefix + uri;

		var suffix = ctx.substring(j),
			l = uri.indexOf('?');
		return l >= 0 ?
			k >= 0 ?
			  prefix + uri.substring(0, l) + suffix + '&' + uri.substring(l+1):
			  prefix + uri.substring(0, l) + suffix + uri.substring(l):
			prefix + uri + suffix;
	},

	ajaxURI: function ( uri, opts ) {
		var ctx = zk.Desktop.$(opts?opts.desktop:null);
		var au = opts && opts.au;
        ctx = (ctx ? ctx: zk)[au ? 'updateURI': 'contextURI'];
        /*if ( ctx )
            alert( "ctx['updateURI']: "+ctx['updateURI']+" - ctx['contextURI']: "+ ctx['contextURI'] );
        alert( "zk['updateURI']: "+zk['updateURI']+" - zk['contextURI']: "+ zk['contextURI'] );

		alert( "ctx after: "+ ctx );
        */
        alert( "ctx: "+ ctx + " | au: "+ au + " | URI: " + uri);

        // fetch the resource_id parameter containing the URI of the ZK resource
		var reg = new RegExp( "&p_p_resource_id=([^&$]+)" );
		if ( !reg.test( ctx ) ) {
			// nothing to do for us, so fall back to normal behaviour
			return zk._ajaxURI( au, ctx, uri, opts );
        }

        alert( "wow there is a match, RegExp.$1: "+RegExp.$1 );
		// the modified zk URI is passed through the resource id parameter after being escaped
        var result =  ctx.replace( /&p_p_resource_id=([^&$]+)/, "&p_p_resource_id="
				+ escape( zk._ajaxURI( au, RegExp.$1, uri, opts ) ) );

        alert( "FINAL URI: "+ result );
        return result;
	},
	
	stateless: function (dtid, contextURI, updateURI, reqURI) {
		var Desktop = zk.Desktop, dt;
		dtid = dtid || ('z_auto' + _statelesscnt++);
		dt = Desktop.all[dtid];
		if (dt && !dt.stateless) throw "Desktop conflict";
		if (zk.updateURI == null)
			zk.updateURI = updateURI;
		if (zk.contextURI == null) 
			zk.contextURI = contextURI;
		return dt || new Desktop(dtid, contextURI, updateURI, reqURI, true);
	}
});


(function () {
	zk.agent = navigator.userAgent.toLowerCase();
	zk.safari = zk.agent.indexOf("safari") >= 0;
	zk.opera = zk.agent.indexOf("opera") >= 0;
	zk.gecko = zk.agent.indexOf("gecko/") >= 0 && !zk.safari && !zk.opera;
	var bodycls;
	if (zk.gecko) {
		var j = zk.agent.indexOf("firefox/");
		j = zk.parseInt(zk.agent.substring(j + 8));
		zk.gecko3 = j >= 3;
		zk.gecko2_ = !zk.gecko3;

		bodycls = 'gecko gecko' + j;
	} else if (zk.opera) {
		bodycls = 'opera';
	} else {
		var j = zk.agent.indexOf("msie ");
		zk.ie = j >= 0;
		if (zk.ie) {
			j = zk.parseInt(zk.agent.substring(j + 5));
			zk.ie7 = j >= 7; 
			zk.ie8c = j >= 8; 
			zk.ie8 = j >= 8 && document.documentMode >= 8; 
			zk.ie6_ = !zk.ie7;
			zk.ie7_ = zk.ie7 && !zk.ie8;
			bodycls = 'ie ie' + j;
		} else if (zk.safari)
			bodycls = 'safari';
	}
	if (zk.air = zk.agent.indexOf("adobeair") >= 0)
		bodycls = 'air';

	zk.css3 = !(zk.ie || zk.gecko2_ || zk.opera);
	
	if (bodycls)
		jq(function () {
			var n = document.body,
				cn = n.className;
			if (cn) cn += ' ';
			n.className = cn + bodycls;
		});
})();


	function getProxy(o, f) { 
		return function () {
				return f.apply(o, arguments);
			};
	}
zk.Object = function () {};

zk.Object.prototype = {
	
	$init: zk.$void,
	
	afterInit: function (f) {
		(this._$ais = this._$ais || []).unshift(f); 
	},
	
	$class: zk.Object,
	
	
	
	$instanceof: function () {
		for (var j = arguments.length, cls; j--;)
			if (cls = arguments[j]) {
				var c = this.$class;
				if (c == zk.Class)
					return this == zk.Object || this == zk.Class; 
				for (; c; c = c.superclass)
					if (c == cls)
						return true;
			}
		return false;
	},
	
	
	$super: function (arg0, arg1) {
		var args = [], bCls = typeof arg0 != "string";
		for (var j = arguments.length, end = bCls ? 1: 0; --j > end;)
			args.unshift(arguments[j]);
		return bCls ? this.$supers(arg0, arg1, args): this.$supers(arg0, args);
	},
	
	
	$supers: function (nm, args, argx) {
		if (typeof nm != "string") { 
			if (!(nm = nm.prototype._$super) || !(nm = nm[args])) 
				throw args + " not in superclass"; 
			return nm.apply(this, argx);
		}

		var supers = this._$supers;
		if (!supers) supers = this._$supers = {};

		
		var old = supers[nm], m, p, oldmtd;
		if (old) {
			oldmtd = old[nm];
			p = old;
		} else {
			oldmtd = this[nm];
			p = this;
		}
		while (p = p._$super)
			if (oldmtd != p[nm]) {
				m = p[nm];
				if (m) supers[nm] = p;
				break;
			}

		if (!m)
			throw nm + " not in superclass";

		try {
			return m.apply(this, args);
		} finally {
			supers[nm] = old; 
		}
	},
	_$subs: [],

	
	proxy: function (f) {
		var fps = this._$proxies, fp;
		if (!fps) this._$proxies = fps = {};
		else if (fp = fps[f]) return fp;
		return fps[f] = getProxy(this, f);
	}
};

zk.Class = function () {}
zk.Class.superclass = zk.Object;
zk.Class.prototype.$class = zk.Class;

_zkf = {
	
	$class: zk.Class,
	
	isInstance: function (o) {
		return o && o.$instanceof && o.$instanceof(this);
	},
	
	isAssignableFrom: function (cls) {
		for (; cls; cls = cls.superclass)
			if (this == cls)
				return true;
		return false;
	},
	$instanceof: zk.Object.prototype.$instanceof
};
zk.copy(zk.Class, _zkf);
zk.copy(zk.Object, _zkf);


var _errs = [], _errcnt = 0;

_zErb = zk.$extends(zk.Object, {
	$init: function (msg) {
		var id = "zk_err" + _errcnt++,
			$id = '#' + id;
			x = (_errcnt * 5) % 50, y = (_errcnt * 5) % 50,
			html =
	'<div class="z-error" style="left:'+(jq.innerX()+x)+'px;top:'+(jq.innerY()+y)
	+'px;" id="'+id+'"><table cellpadding="2" cellspacing="2" width="100%"><tr>'
	+'<td align="right"><div id="'+id+'-p">';
	if (!zk.light)
		html += '<span class="btn" onclick="_zErb._redraw()">redraw</span>&nbsp;';
	html += '<span class="btn" onclick="_zErb._close(\''+id+'\')">close</span></div></td></tr>'
	+'<tr valign="top"><td class="z-error-msg">'+zUtl.encodeXML(msg, {multiline:true}) 
	+'</td></tr></table></div>';
		jq(document.body).append(html);

		this.id = id;
		_errs.push(this);

		try {
			var n;
			this.dg = new zk.Draggable(null, n = jq($id)[0], {
				handle: jq($id + '-p')[0], zIndex: n.style.zIndex,
				starteffect: zk.$void, starteffect: zk.$void,
				endeffect: zk.$void});
		} catch (e) {
		}
	},
	destroy: function () {
		_errs.$remove(this);
		if (this.dg) this.dg.destroy();
		jq('#' + this.id).remove();
	}
},{
	_redraw: function () {
		zk.errorDismiss();
		zAu.send(new zk.Event(null, 'redraw'));
	},
	_close: function (id) {
		for (var j = _errs.length; j--;) {
			var e = _errs[j];
			if (e.id == id) {
				_errs.splice(j, 1);
				e.destroy();
				return;
			}
		}
	},
	closeAll: function () {
		for (var j = _errs.length; j--;)
			_errs[j].destroy();
		_errs = [];
	}
});

})();
