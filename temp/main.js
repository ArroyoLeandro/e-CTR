(function (a, b) {
	function cy(a) {
		return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
	}
	function cv(a) {
		if (!ck[a]) {
			var b = c.body,
				d = f("<" + a + ">").appendTo(b),
				e = d.css("display");
			d.remove();
			if (e === "none" || e === "") {
				cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
				if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
				d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
			}
			ck[a] = e
		}
		return ck[a]
	}
	function cu(a, b) {
		var c = {};
		f.each(cq.concat.apply([], cq.slice(0, b)), function () {
			c[this] = a
		});
		return c
	}
	function ct() {
		cr = b
	}
	function cs() {
		setTimeout(ct, 0);
		return cr = f.now()
	}
	function cj() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch (b) {}
	}
	function ci() {
		try {
			return new a.XMLHttpRequest
		} catch (b) {}
	}
	function cc(a, c) {
		a.dataFilter && (c = a.dataFilter(c, a.dataType));
		var d = a.dataTypes,
			e = {},
			g, h, i = d.length,
			j, k = d[0],
			l, m, n, o, p;
		for (g = 1; g < i; g++) {
			if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
			l = k, k = d[g];
			if (k === "*") k = l;
			else if (l !== "*" && l !== k) {
				m = l + " " + k, n = e[m] || e["* " + k];
				if (!n) {
					p = b;
					for (o in e) {
						j = o.split(" ");
						if (j[0] === l || j[0] === "*") {
							p = e[j[1] + " " + k];
							if (p) {
								o = e[o], o === !0 ? n = p : p === !0 && (n = o);
								break
							}
						}
					}
				}!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
			}
		}
		return c
	}
	function cb(a, c, d) {
		var e = a.contents,
			f = a.dataTypes,
			g = a.responseFields,
			h, i, j, k;
		for (i in g) i in d && (c[g[i]] = d[i]);
		while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
		if (h) for (i in e) if (e[i] && e[i].test(h)) {
			f.unshift(i);
			break
		}
		if (f[0] in d) j = f[0];
		else {
			for (i in d) {
				if (!f[0] || a.converters[i + " " + f[0]]) {
					j = i;
					break
				}
				k || (k = i)
			}
			j = j || k
		}
		if (j) {
			j !== f[0] && f.unshift(j);
			return d[j]
		}
	}
	function ca(a, b, c, d) {
		if (f.isArray(b)) f.each(b, function (b, e) {
			c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
		});
		else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d);
		else d(a, b)
	}
	function b_(a, c) {
		var d, e, g = f.ajaxSettings.flatOptions || {};
		for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
		e && f.extend(!0, a, e)
	}
	function b$(a, c, d, e, f, g) {
		f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
		var h = a[f],
			i = 0,
			j = h ? h.length : 0,
			k = a === bT,
			l;
		for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
		(k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
		return l
	}
	function bZ(a) {
		return function (b, c) {
			typeof b != "string" && (c = b, b = "*");
			if (f.isFunction(c)) {
				var d = b.toLowerCase().split(bP),
					e = 0,
					g = d.length,
					h, i, j;
				for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
			}
		}
	}
	function bC(a, b, c) {
		var d = b === "width" ? a.offsetWidth : a.offsetHeight,
			e = b === "width" ? bx : by,
			g = 0,
			h = e.length;
		if (d > 0) {
			if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
			return d + "px"
		}
		d = bz(a, b, b);
		if (d < 0 || d == null) d = a.style[b] || 0;
		d = parseFloat(d) || 0;
		if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
		return d + "px"
	}
	function bp(a, b) {
		b.src ? f.ajax({
			url: b.src,
			async: !1,
			dataType: "script"
		}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
	}
	function bo(a) {
		var b = c.createElement("div");
		bh.appendChild(b), b.innerHTML = a.outerHTML;
		return b.firstChild
	}
	function bn(a) {
		var b = (a.nodeName || "").toLowerCase();
		b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
	}
	function bm(a) {
		if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
	}
	function bl(a) {
		return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
	}
	function bk(a, b) {
		var c;
		if (b.nodeType === 1) {
			b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
			if (c === "object") b.outerHTML = a.outerHTML;
			else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
				if (c === "option") b.selected = a.defaultSelected;
				else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
			} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
			b.removeAttribute(f.expando)
		}
	}
	function bj(a, b) {
		if (b.nodeType === 1 && !! f.hasData(a)) {
			var c, d, e, g = f._data(a),
				h = f._data(b, g),
				i = g.events;
			if (i) {
				delete h.handle, h.events = {};
				for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
			}
			h.data && (h.data = f.extend({}, h.data))
		}
	}
	function bi(a, b) {
		return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}
	function U(a) {
		var b = V.split("|"),
			c = a.createDocumentFragment();
		if (c.createElement) while (b.length) c.createElement(b.pop());
		return c
	}
	function T(a, b, c) {
		b = b || 0;
		if (f.isFunction(b)) return f.grep(a, function (a, d) {
			var e = !! b.call(a, d, a);
			return e === c
		});
		if (b.nodeType) return f.grep(a, function (a, d) {
			return a === b === c
		});
		if (typeof b == "string") {
			var d = f.grep(a, function (a) {
				return a.nodeType === 1
			});
			if (O.test(b)) return f.filter(b, d, !c);
			b = f.filter(b, d)
		}
		return f.grep(a, function (a, d) {
			return f.inArray(a, b) >= 0 === c
		})
	}
	function S(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}
	function K() {
		return !0
	}
	function J() {
		return !1
	}
	function n(a, b, c) {
		var d = b + "defer",
			e = b + "queue",
			g = b + "mark",
			h = f._data(a, d);
		h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
			!f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
		}, 0)
	}
	function m(a) {
		for (var b in a) {
			if (b === "data" && f.isEmptyObject(a[b])) continue;
			if (b !== "toJSON") return !1
		}
		return !0
	}
	function l(a, c, d) {
		if (d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(k, "-$1").toLowerCase();
			d = a.getAttribute(e);
			if (typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
				} catch (g) {}
				f.data(a, c, d)
			} else d = b
		}
		return d
	}
	function h(a) {
		var b = g[a] = {},
			c, d;
		a = a.split(/\s+/);
		for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
		return b
	}
	var c = a.document,
		d = a.navigator,
		e = a.location,
		f = function () {
			function J() {
				if (!e.isReady) {
					try {
						c.documentElement.doScroll("left")
					} catch (a) {
						setTimeout(J, 1);
						return
					}
					e.ready()
				}
			}
			var e = function (a, b) {
				return new e.fn.init(a, b, h)
			},
				f = a.jQuery,
				g = a.$,
				h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				j = /\S/,
				k = /^\s+/,
				l = /\s+$/,
				m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				n = /^[\],:{}\s]*$/,
				o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				q = /(?:^|:|,)(?:\s*\[)+/g,
				r = /(webkit)[ \/]([\w.]+)/,
				s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				t = /(msie) ([\w.]+)/,
				u = /(mozilla)(?:.*? rv:([\w.]+))?/,
				v = /-([a-z]|[0-9])/ig,
				w = /^-ms-/,
				x = function (a, b) {
					return (b + "").toUpperCase()
				},
				y = d.userAgent,
				z, A, B, C = Object.prototype.toString,
				D = Object.prototype.hasOwnProperty,
				E = Array.prototype.push,
				F = Array.prototype.slice,
				G = String.prototype.trim,
				H = Array.prototype.indexOf,
				I = {};
			e.fn = e.prototype = {
				constructor: e,
				init: function (a, d, f) {
					var g, h, j, k;
					if (!a) return this;
					if (a.nodeType) {
						this.context = this[0] = a, this.length = 1;
						return this
					}
					if (a === "body" && !d && c.body) {
						this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
						return this
					}
					if (typeof a == "string") {
						a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
						if (g && (g[1] || !d)) {
							if (g[1]) {
								d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
								return e.merge(this, a)
							}
							h = c.getElementById(g[2]);
							if (h && h.parentNode) {
								if (h.id !== g[2]) return f.find(a);
								this.length = 1, this[0] = h
							}
							this.context = c, this.selector = a;
							return this
						}
						return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
					}
					if (e.isFunction(a)) return f.ready(a);
					a.selector !== b && (this.selector = a.selector, this.context = a.context);
					return e.makeArray(a, this)
				},
				selector: "",
				jquery: "1.7.1",
				length: 0,
				size: function () {
					return this.length
				},
				toArray: function () {
					return F.call(this, 0)
				},
				get: function (a) {
					return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
				},
				pushStack: function (a, b, c) {
					var d = this.constructor();
					e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
					return d
				},
				each: function (a, b) {
					return e.each(this, a, b)
				},
				ready: function (a) {
					e.bindReady(), A.add(a);
					return this
				},
				eq: function (a) {
					a = +a;
					return a === -1 ? this.slice(a) : this.slice(a, a + 1)
				},
				first: function () {
					return this.eq(0)
				},
				last: function () {
					return this.eq(-1)
				},
				slice: function () {
					return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
				},
				map: function (a) {
					return this.pushStack(e.map(this, function (b, c) {
						return a.call(b, c, b)
					}))
				},
				end: function () {
					return this.prevObject || this.constructor(null)
				},
				push: E,
				sort: [].sort,
				splice: [].splice
			}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
				var a, c, d, f, g, h, i = arguments[0] || {},
					j = 1,
					k = arguments.length,
					l = !1;
				typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
				for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
					d = i[c], f = a[c];
					if (i === f) continue;
					l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
				}
				return i
			}, e.extend({
				noConflict: function (b) {
					a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
					return e
				},
				isReady: !1,
				readyWait: 1,
				holdReady: function (a) {
					a ? e.readyWait++ : e.ready(!0)
				},
				ready: function (a) {
					if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
						if (!c.body) return setTimeout(e.ready, 1);
						e.isReady = !0;
						if (a !== !0 && --e.readyWait > 0) return;
						A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
					}
				},
				bindReady: function () {
					if (!A) {
						A = e.Callbacks("once memory");
						if (c.readyState === "complete") return setTimeout(e.ready, 1);
						if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
						else if (c.attachEvent) {
							c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
							var b = !1;
							try {
								b = a.frameElement == null
							} catch (d) {}
							c.documentElement.doScroll && b && J()
						}
					}
				},
				isFunction: function (a) {
					return e.type(a) === "function"
				},
				isArray: Array.isArray ||
				function (a) {
					return e.type(a) === "array"
				},
				isWindow: function (a) {
					return a && typeof a == "object" && "setInterval" in a
				},
				isNumeric: function (a) {
					return !isNaN(parseFloat(a)) && isFinite(a)
				},
				type: function (a) {
					return a == null ? String(a) : I[C.call(a)] || "object"
				},
				isPlainObject: function (a) {
					if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
					try {
						if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
					} catch (c) {
						return !1
					}
					var d;
					for (d in a);
					return d === b || D.call(a, d)
				},
				isEmptyObject: function (a) {
					for (var b in a) return !1;
					return !0
				},
				error: function (a) {
					throw new Error(a)
				},
				parseJSON: function (b) {
					if (typeof b != "string" || !b) return null;
					b = e.trim(b);
					if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
					if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
					e.error("Invalid JSON: " + b)
				},
				parseXML: function (c) {
					var d, f;
					try {
						a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
					} catch (g) {
						d = b
					}(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
					return d
				},
				noop: function () {},
				globalEval: function (b) {
					b && j.test(b) && (a.execScript ||
					function (b) {
						a.eval.call(a, b)
					})(b)
				},
				camelCase: function (a) {
					return a.replace(w, "ms-").replace(v, x)
				},
				nodeName: function (a, b) {
					return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
				},
				each: function (a, c, d) {
					var f, g = 0,
						h = a.length,
						i = h === b || e.isFunction(a);
					if (d) {
						if (i) {
							for (f in a) if (c.apply(a[f], d) === !1) break
						} else for (; g < h;) if (c.apply(a[g++], d) === !1) break
					} else if (i) {
						for (f in a) if (c.call(a[f], f, a[f]) === !1) break
					} else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
					return a
				},
				trim: G ?
				function (a) {
					return a == null ? "" : G.call(a)
				} : function (a) {
					return a == null ? "" : (a + "").replace(k, "").replace(l, "")
				},
				makeArray: function (a, b) {
					var c = b || [];
					if (a != null) {
						var d = e.type(a);
						a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
					}
					return c
				},
				inArray: function (a, b, c) {
					var d;
					if (b) {
						if (H) return H.call(b, a, c);
						d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
						for (; c < d; c++) if (c in b && b[c] === a) return c
					}
					return -1
				},
				merge: function (a, c) {
					var d = a.length,
						e = 0;
					if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
					else while (c[e] !== b) a[d++] = c[e++];
					a.length = d;
					return a
				},
				grep: function (a, b, c) {
					var d = [],
						e;
					c = !! c;
					for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
					return d
				},
				map: function (a, c, d) {
					var f, g, h = [],
						i = 0,
						j = a.length,
						k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
					if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
					else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
					return h.concat.apply([], h)
				},
				guid: 1,
				proxy: function (a, c) {
					if (typeof c == "string") {
						var d = a[c];
						c = a, a = d
					}
					if (!e.isFunction(a)) return b;
					var f = F.call(arguments, 2),
						g = function () {
							return a.apply(c, f.concat(F.call(arguments)))
						};
					g.guid = a.guid = a.guid || g.guid || e.guid++;
					return g
				},
				access: function (a, c, d, f, g, h) {
					var i = a.length;
					if (typeof c == "object") {
						for (var j in c) e.access(a, j, c[j], f, g, d);
						return a
					}
					if (d !== b) {
						f = !h && f && e.isFunction(d);
						for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
						return a
					}
					return i ? g(a[0], c) : b
				},
				now: function () {
					return (new Date).getTime()
				},
				uaMatch: function (a) {
					a = a.toLowerCase();
					var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
					return {
						browser: b[1] || "",
						version: b[2] || "0"
					}
				},
				sub: function () {
					function a(b, c) {
						return new a.fn.init(b, c)
					}
					e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
						f && f instanceof e && !(f instanceof a) && (f = a(f));
						return e.fn.init.call(this, d, f, b)
					}, a.fn.init.prototype = a.fn;
					var b = a(c);
					return a
				},
				browser: {}
			}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
				I["[object " + b + "]"] = b.toLowerCase()
			}), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test("Â ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
				c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
			} : c.attachEvent && (B = function () {
				c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
			});
			return e
		}(),
		g = {};
	f.Callbacks = function (a) {
		a = a ? g[a] || h(a) : {};
		var c = [],
			d = [],
			e, i, j, k, l, m = function (b) {
				var d, e, g, h, i;
				for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
			},
			n = function (b, f) {
				f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
				for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
					e = !0;
					break
				}
				i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
			},
			o = {
				add: function () {
					if (c) {
						var a = c.length;
						m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
					}
					return this
				},
				remove: function () {
					if (c) {
						var b = arguments,
							d = 0,
							e = b.length;
						for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
							i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
							if (a.unique) break
						}
					}
					return this
				},
				has: function (a) {
					if (c) {
						var b = 0,
							d = c.length;
						for (; b < d; b++) if (a === c[b]) return !0
					}
					return !1
				},
				empty: function () {
					c = [];
					return this
				},
				disable: function () {
					c = d = e = b;
					return this
				},
				disabled: function () {
					return !c
				},
				lock: function () {
					d = b, (!e || e === !0) && o.disable();
					return this
				},
				locked: function () {
					return !d
				},
				fireWith: function (b, c) {
					d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
					return this
				},
				fire: function () {
					o.fireWith(this, arguments);
					return this
				},
				fired: function () {
					return !!e
				}
			};
		return o
	};
	var i = [].slice;
	f.extend({
		Deferred: function (a) {
			var b = f.Callbacks("once memory"),
				c = f.Callbacks("once memory"),
				d = f.Callbacks("memory"),
				e = "pending",
				g = {
					resolve: b,
					reject: c,
					notify: d
				},
				h = {
					done: b.add,
					fail: c.add,
					progress: d.add,
					state: function () {
						return e
					},
					isResolved: b.fired,
					isRejected: c.fired,
					then: function (a, b, c) {
						i.done(a).fail(b).progress(c);
						return this
					},
					always: function () {
						i.done.apply(i, arguments).fail.apply(i, arguments);
						return this
					},
					pipe: function (a, b, c) {
						return f.Deferred(function (d) {
							f.each({
								done: [a, "resolve"],
								fail: [b, "reject"],
								progress: [c, "notify"]
							}, function (a, b) {
								var c = b[0],
									e = b[1],
									g;
								f.isFunction(c) ? i[a](function () {
									g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
								}) : i[a](d[e])
							})
						}).promise()
					},
					promise: function (a) {
						if (a == null) a = h;
						else for (var b in h) a[b] = h[b];
						return a
					}
				},
				i = h.promise({}),
				j;
			for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
			i.done(function () {
				e = "resolved"
			}, c.disable, d.lock).fail(function () {
				e = "rejected"
			}, b.disable, d.lock), a && a.call(i, i);
			return i
		},
		when: function (a) {
			function m(a) {
				return function (b) {
					e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
				}
			}
			function l(a) {
				return function (c) {
					b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
				}
			}
			var b = i.call(arguments, 0),
				c = 0,
				d = b.length,
				e = Array(d),
				g = d,
				h = d,
				j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
				k = j.promise();
			if (d > 1) {
				for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
				g || j.resolveWith(j, b)
			} else j !== a && j.resolveWith(j, d ? [a] : []);
			return k
		}
	}), f.support = function () {
		var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
			r = c.documentElement;
		q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
		if (!d || !d.length || !e) return {};
		g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
			leadingWhitespace: q.firstChild.nodeType === 3,
			tbody: !q.getElementsByTagName("tbody").length,
			htmlSerialize: !! q.getElementsByTagName("link").length,
			style: /top/.test(e.getAttribute("style")),
			hrefNormalized: e.getAttribute("href") === "/a",
			opacity: /^0.55/.test(e.style.opacity),
			cssFloat: !! e.style.cssFloat,
			checkOn: i.value === "on",
			optSelected: h.selected,
			getSetAttribute: q.className !== "t",
			enctype: !! c.createElement("form").enctype,
			html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0
		}, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
		try {
			delete q.test
		} catch (s) {
			b.deleteExpando = !1
		}!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
			b.noCloneEvent = !1
		}), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
			marginRight: 0
		}).marginRight, 10) || 0) === 0);
		if (q.attachEvent) for (o in {
			submit: 1,
			change: 1,
			focusin: 1
		}) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
		k.removeChild(q), k = g = h = j = q = i = null, f(function () {
			var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
			!r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
				doesNotAddBorder: e.offsetTop !== 5,
				doesAddBorderForTableAndCells: h.offsetTop === 5
			}, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
		});
		return b
	}();
	var j = /^(?:\{.*\}|\[.*\])$/,
		k = /([A-Z])/g;
	f.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function (a) {
			a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
			return !!a && !m(a)
		},
		data: function (a, c, d, e) {
			if ( !! f.acceptData(a)) {
				var g, h, i, j = f.expando,
					k = typeof c == "string",
					l = a.nodeType,
					m = l ? f.cache : a,
					n = l ? a[j] : a[j] && j,
					o = c === "events";
				if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
				n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
				if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
				g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
				if (o && !h[c]) return g.events;
				k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
				return i
			}
		},
		removeData: function (a, b, c) {
			if ( !! f.acceptData(a)) {
				var d, e, g, h = f.expando,
					i = a.nodeType,
					j = i ? f.cache : a,
					k = i ? a[h] : h;
				if (!j[k]) return;
				if (b) {
					d = c ? j[k] : j[k].data;
					if (d) {
						f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
						for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
						if (!(c ? m : f.isEmptyObject)(d)) return
					}
				}
				if (!c) {
					delete j[k].data;
					if (!m(j[k])) return
				}
				f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
			}
		},
		_data: function (a, b, c) {
			return f.data(a, b, c, !0)
		},
		acceptData: function (a) {
			if (a.nodeName) {
				var b = f.noData[a.nodeName.toLowerCase()];
				if (b) return b !== !0 && a.getAttribute("classid") === b
			}
			return !0
		}
	}), f.fn.extend({
		data: function (a, c) {
			var d, e, g, h = null;
			if (typeof a == "undefined") {
				if (this.length) {
					h = f.data(this[0]);
					if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
						e = this[0].attributes;
						for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
						f._data(this[0], "parsedAttrs", !0)
					}
				}
				return h
			}
			if (typeof a == "object") return this.each(function () {
				f.data(this, a)
			});
			d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
			if (c === b) {
				h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
				return h === b && d[1] ? this.data(d[0]) : h
			}
			return this.each(function () {
				var b = f(this),
					e = [d[0], c];
				b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
			})
		},
		removeData: function (a) {
			return this.each(function () {
				f.removeData(this, a)
			})
		}
	}), f.extend({
		_mark: function (a, b) {
			a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
		},
		_unmark: function (a, b, c) {
			a !== !0 && (c = b, b = a, a = !1);
			if (b) {
				c = c || "fx";
				var d = c + "mark",
					e = a ? 0 : (f._data(b, d) || 1) - 1;
				e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
			}
		},
		queue: function (a, b, c) {
			var d;
			if (a) {
				b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
				return d || []
			}
		},
		dequeue: function (a, b) {
			b = b || "fx";
			var c = f.queue(a, b),
				d = c.shift(),
				e = {};
			d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
				f.dequeue(a, b)
			}, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
		}
	}), f.fn.extend({
		queue: function (a, c) {
			typeof a != "string" && (c = a, a = "fx");
			if (c === b) return f.queue(this[0], a);
			return this.each(function () {
				var b = f.queue(this, a, c);
				a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
			})
		},
		dequeue: function (a) {
			return this.each(function () {
				f.dequeue(this, a)
			})
		},
		delay: function (a, b) {
			a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
			return this.queue(b, function (b, c) {
				var d = setTimeout(b, a);
				c.stop = function () {
					clearTimeout(d)
				}
			})
		},
		clearQueue: function (a) {
			return this.queue(a || "fx", [])
		},
		promise: function (a, c) {
			function m() {
				--h || d.resolveWith(e, [e])
			}
			typeof a != "string" && (c = a, a = b), a = a || "fx";
			var d = f.Deferred(),
				e = this,
				g = e.length,
				h = 1,
				i = a + "defer",
				j = a + "queue",
				k = a + "mark",
				l;
			while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
			m();
			return d.promise()
		}
	});
	var o = /[\n\t\r]/g,
		p = /\s+/,
		q = /\r/g,
		r = /^(?:button|input)$/i,
		s = /^(?:button|input|object|select|textarea)$/i,
		t = /^a(?:rea)?$/i,
		u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		v = f.support.getSetAttribute,
		w, x, y;
	f.fn.extend({
		attr: function (a, b) {
			return f.access(this, a, b, !0, f.attr)
		},
		removeAttr: function (a) {
			return this.each(function () {
				f.removeAttr(this, a)
			})
		},
		prop: function (a, b) {
			return f.access(this, a, b, !0, f.prop)
		},
		removeProp: function (a) {
			a = f.propFix[a] || a;
			return this.each(function () {
				try {
					this[a] = b, delete this[a]
				} catch (c) {}
			})
		},
		addClass: function (a) {
			var b, c, d, e, g, h, i;
			if (f.isFunction(a)) return this.each(function (b) {
				f(this).addClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string") {
				b = a.split(p);
				for (c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;
					else {
						g = " " + e.className + " ";
						for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
						e.className = f.trim(g)
					}
				}
			}
			return this
		},
		removeClass: function (a) {
			var c, d, e, g, h, i, j;
			if (f.isFunction(a)) return this.each(function (b) {
				f(this).removeClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string" || a === b) {
				c = (a || "").split(p);
				for (d = 0, e = this.length; d < e; d++) {
					g = this[d];
					if (g.nodeType === 1 && g.className) if (a) {
						h = (" " + g.className + " ").replace(o, " ");
						for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
						g.className = f.trim(h)
					} else g.className = ""
				}
			}
			return this
		},
		toggleClass: function (a, b) {
			var c = typeof a,
				d = typeof b == "boolean";
			if (f.isFunction(a)) return this.each(function (c) {
				f(this).toggleClass(a.call(this, c, this.className, b), b)
			});
			return this.each(function () {
				if (c === "string") {
					var e, g = 0,
						h = f(this),
						i = b,
						j = a.split(p);
					while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
				} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
			})
		},
		hasClass: function (a) {
			var b = " " + a + " ",
				c = 0,
				d = this.length;
			for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
			return !1
		},
		val: function (a) {
			var c, d, e, g = this[0]; {
				if ( !! arguments.length) {
					e = f.isFunction(a);
					return this.each(function (d) {
						var g = f(this),
							h;
						if (this.nodeType === 1) {
							e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
								return a == null ? "" : a + ""
							})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
							if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
						}
					})
				}
				if (g) {
					c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
					if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
					d = g.value;
					return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
				}
			}
		}
	}), f.extend({
		valHooks: {
			option: {
				get: function (a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function (a) {
					var b, c, d, e, g = a.selectedIndex,
						h = [],
						i = a.options,
						j = a.type === "select-one";
					if (g < 0) return null;
					c = j ? g : 0, d = j ? g + 1 : i.length;
					for (; c < d; c++) {
						e = i[c];
						if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
							b = f(e).val();
							if (j) return b;
							h.push(b)
						}
					}
					if (j && !h.length && i.length) return f(i[g]).val();
					return h
				},
				set: function (a, b) {
					var c = f.makeArray(b);
					f(a).find("option").each(function () {
						this.selected = f.inArray(f(this).val(), c) >= 0
					}), c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attr: function (a, c, d, e) {
			var g, h, i, j = a.nodeType;
			if ( !! a && j !== 3 && j !== 8 && j !== 2) {
				if (e && c in f.attrFn) return f(a)[c](d);
				if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
				i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
				if (d !== b) {
					if (d === null) {
						f.removeAttr(a, c);
						return
					}
					if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
					a.setAttribute(c, "" + d);
					return d
				}
				if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
				g = a.getAttribute(c);
				return g === null ? b : g
			}
		},
		removeAttr: function (a, b) {
			var c, d, e, g, h = 0;
			if (b && a.nodeType === 1) {
				d = b.toLowerCase().split(p), g = d.length;
				for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
			}
		},
		attrHooks: {
			type: {
				set: function (a, b) {
					if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
					else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b), c && (a.value = c);
						return b
					}
				}
			},
			value: {
				get: function (a, b) {
					if (w && f.nodeName(a, "button")) return w.get(a, b);
					return b in a ? a.value : null
				},
				set: function (a, b, c) {
					if (w && f.nodeName(a, "button")) return w.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function (a, c, d) {
			var e, g, h, i = a.nodeType;
			if ( !! a && i !== 3 && i !== 8 && i !== 2) {
				h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
				return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
			}
		},
		propHooks: {
			tabIndex: {
				get: function (a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
		get: function (a, c) {
			var d, e = f.prop(a, c);
			return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set: function (a, b, c) {
			var d;
			b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
			return c
		}
	}, v || (y = {
		name: !0,
		id: !0
	}, w = f.valHooks.button = {
		get: function (a, c) {
			var d;
			d = a.getAttributeNode(c);
			return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
		},
		set: function (a, b, d) {
			var e = a.getAttributeNode(d);
			e || (e = c.createAttribute(d), a.setAttributeNode(e));
			return e.nodeValue = b + ""
		}
	}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
		f.attrHooks[b] = f.extend(f.attrHooks[b], {
			set: function (a, c) {
				if (c === "") {
					a.setAttribute(b, "auto");
					return c
				}
			}
		})
	}), f.attrHooks.contenteditable = {
		get: w.get,
		set: function (a, b, c) {
			b === "" && (b = "false"), w.set(a, b, c)
		}
	}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
		f.attrHooks[c] = f.extend(f.attrHooks[c], {
			get: function (a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b : d
			}
		})
	}), f.support.style || (f.attrHooks.style = {
		get: function (a) {
			return a.style.cssText.toLowerCase() || b
		},
		set: function (a, b) {
			return a.style.cssText = "" + b
		}
	}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
		get: function (a) {
			var b = a.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
			return null
		}
	})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
		f.valHooks[this] = {
			get: function (a) {
				return a.getAttribute("value") === null ? "on" : a.value
			}
		}
	}), f.each(["radio", "checkbox"], function () {
		f.valHooks[this] = f.extend(f.valHooks[this], {
			set: function (a, b) {
				if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
			}
		})
	});
	var z = /^(?:textarea|input|select)$/i,
		A = /^([^\.]*)?(?:\.(.+))?$/,
		B = /\bhover(\.\S+)?\b/,
		C = /^key/,
		D = /^(?:mouse|contextmenu)|click/,
		E = /^(?:focusinfocus|focusoutblur)$/,
		F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		G = function (a) {
			var b = F.exec(a);
			b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
			return b
		},
		H = function (a, b) {
			var c = a.attributes || {};
			return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
		},
		I = function (a) {
			return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
		};
	f.event = {
		add: function (a, c, d, e, g) {
			var h, i, j, k, l, m, n, o, p, q, r, s;
			if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
				d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
					return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
				}, i.elem = a), c = f.trim(I(c)).split(" ");
				for (k = 0; k < c.length; k++) {
					l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
						type: m,
						origType: l[1],
						data: e,
						handler: d,
						guid: d.guid,
						selector: g,
						quick: G(g),
						namespace: n.join(".")
					}, p), r = j[m];
					if (!r) {
						r = j[m] = [], r.delegateCount = 0;
						if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
					}
					s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
				}
				a = null
			}
		},
		global: {},
		remove: function (a, b, c, d, e) {
			var g = f.hasData(a) && f._data(a),
				h, i, j, k, l, m, n, o, p, q, r, s;
			if ( !! g && !! (o = g.events)) {
				b = f.trim(I(b || "")).split(" ");
				for (h = 0; h < b.length; h++) {
					i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
					if (!j) {
						for (j in o) f.event.remove(a, j + b[h], c, d, !0);
						continue
					}
					p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
					for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
					r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
				}
				f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function (c, d, e, g) {
			if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
				var h = c.type || c,
					i = [],
					j, k, l, m, n, o, p, q, r, s;
				if (E.test(h + f.event.triggered)) return;
				h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
				if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
				c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
				if (!e) {
					j = f.cache;
					for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
					return
				}
				c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
				if (p.trigger && p.trigger.apply(e, d) === !1) return;
				r = [
					[e, p.bindType || h]
				];
				if (!g && !p.noBubble && !f.isWindow(e)) {
					s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
					for (; m; m = m.parentNode) r.push([m, s]), n = m;
					n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
				}
				for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
				c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
				return c.result
			}
		},
		dispatch: function (c) {
			c = f.event.fix(c || a.event);
			var d = (f._data(this, "events") || {})[c.type] || [],
				e = d.delegateCount,
				g = [].slice.call(arguments, 0),
				h = !c.exclusive && !c.namespace,
				i = [],
				j, k, l, m, n, o, p, q, r, s, t;
			g[0] = c, c.delegateTarget = this;
			if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
				m = f(this), m.context = this.ownerDocument || this;
				for (l = c.target; l != this; l = l.parentNode || this) {
					o = {}, q = [], m[0] = l;
					for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
					q.length && i.push({
						elem: l,
						matches: q
					})
				}
			}
			d.length > e && i.push({
				elem: this,
				matches: d.slice(e)
			});
			for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
				p = i[j], c.currentTarget = p.elem;
				for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
					r = p.matches[k];
					if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
				}
			}
			return c.result
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (a, b) {
				a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
				return a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (a, d) {
				var e, f, g, h = d.button,
					i = d.fromElement;
				a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
				return a
			}
		},
		fix: function (a) {
			if (a[f.expando]) return a;
			var d, e, g = a,
				h = f.event.fixHooks[a.type] || {},
				i = h.props ? this.props.concat(h.props) : this.props;
			a = f.Event(g);
			for (d = i.length; d;) e = i[--d], a[e] = g[e];
			a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
			return h.filter ? h.filter(a, g) : a
		},
		special: {
			ready: {
				setup: f.bindReady
			},
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function (a, b, c) {
					f.isWindow(this) && (this.onbeforeunload = c)
				},
				teardown: function (a, b) {
					this.onbeforeunload === b && (this.onbeforeunload = null)
				}
			}
		},
		simulate: function (a, b, c, d) {
			var e = f.extend(new f.Event, c, {
				type: a,
				isSimulated: !0,
				originalEvent: {}
			});
			d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
		}
	}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ?
	function (a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function (a, b, c) {
		a.detachEvent && a.detachEvent("on" + b, c)
	}, f.Event = function (a, b) {
		if (!(this instanceof f.Event)) return new f.Event(a, b);
		a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
	}, f.Event.prototype = {
		preventDefault: function () {
			this.isDefaultPrevented = K;
			var a = this.originalEvent;
			!a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function () {
			this.isPropagationStopped = K;
			var a = this.originalEvent;
			!a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = K, this.stopPropagation()
		},
		isDefaultPrevented: J,
		isPropagationStopped: J,
		isImmediatePropagationStopped: J
	}, f.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function (a, b) {
		f.event.special[a] = {
			delegateType: b,
			bindType: b,
			handle: function (a) {
				var c = this,
					d = a.relatedTarget,
					e = a.handleObj,
					g = e.selector,
					h;
				if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
				return h
			}
		}
	}), f.support.submitBubbles || (f.event.special.submit = {
		setup: function () {
			if (f.nodeName(this, "form")) return !1;
			f.event.add(this, "click._submit keypress._submit", function (a) {
				var c = a.target,
					d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
				d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
					this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
				}), d._submit_attached = !0)
			})
		},
		teardown: function () {
			if (f.nodeName(this, "form")) return !1;
			f.event.remove(this, "._submit")
		}
	}), f.support.changeBubbles || (f.event.special.change = {
		setup: function () {
			if (z.test(this.nodeName)) {
				if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
					a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
				}), f.event.add(this, "click._change", function (a) {
					this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
				});
				return !1
			}
			f.event.add(this, "beforeactivate._change", function (a) {
				var b = a.target;
				z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
					this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
				}), b._change_attached = !0)
			})
		},
		handle: function (a) {
			var b = a.target;
			if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
		},
		teardown: function () {
			f.event.remove(this, "._change");
			return z.test(this.nodeName)
		}
	}), f.support.focusinBubbles || f.each({
		focus: "focusin",
		blur: "focusout"
	}, function (a, b) {
		var d = 0,
			e = function (a) {
				f.event.simulate(b, a.target, f.event.fix(a), !0)
			};
		f.event.special[b] = {
			setup: function () {
				d++ === 0 && c.addEventListener(a, e, !0)
			},
			teardown: function () {
				--d === 0 && c.removeEventListener(a, e, !0)
			}
		}
	}), f.fn.extend({
		on: function (a, c, d, e, g) {
			var h, i;
			if (typeof a == "object") {
				typeof c != "string" && (d = c, c = b);
				for (i in a) this.on(i, c, d, a[i], g);
				return this
			}
			d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
			if (e === !1) e = J;
			else if (!e) return this;
			g === 1 && (h = e, e = function (a) {
				f().off(a);
				return h.apply(this, arguments)
			}, e.guid = h.guid || (h.guid = f.guid++));
			return this.each(function () {
				f.event.add(this, a, e, d, c)
			})
		},
		one: function (a, b, c, d) {
			return this.on.call(this, a, b, c, d, 1)
		},
		off: function (a, c, d) {
			if (a && a.preventDefault && a.handleObj) {
				var e = a.handleObj;
				f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
				return this
			}
			if (typeof a == "object") {
				for (var g in a) this.off(g, c, a[g]);
				return this
			}
			if (c === !1 || typeof c == "function") d = c, c = b;
			d === !1 && (d = J);
			return this.each(function () {
				f.event.remove(this, a, d, c)
			})
		},
		bind: function (a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind: function (a, b) {
			return this.off(a, null, b)
		},
		live: function (a, b, c) {
			f(this.context).on(a, this.selector, b, c);
			return this
		},
		die: function (a, b) {
			f(this.context).off(a, this.selector || "**", b);
			return this
		},
		delegate: function (a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate: function (a, b, c) {
			return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
		},
		trigger: function (a, b) {
			return this.each(function () {
				f.event.trigger(a, b, this)
			})
		},
		triggerHandler: function (a, b) {
			if (this[0]) return f.event.trigger(a, b, this[0], !0)
		},
		toggle: function (a) {
			var b = arguments,
				c = a.guid || f.guid++,
				d = 0,
				e = function (c) {
					var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
					f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
					return b[e].apply(this, arguments) || !1
				};
			e.guid = c;
			while (d < b.length) b[d++].guid = c;
			return this.click(e)
		},
		hover: function (a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
		f.fn[b] = function (a, c) {
			c == null && (c = a, a = null);
			return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		}, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
	}), function () {
		function x(a, b, c, e, f, g) {
			for (var h = 0, i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						if (j.nodeType === 1) {
							g || (j[d] = c, j.sizset = h);
							if (typeof b != "string") {
								if (j === b) {
									k = !0;
									break
								}
							} else if (m.filter(b, [j]).length > 0) {
								k = j;
								break
							}
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		function w(a, b, c, e, f, g) {
			for (var h = 0, i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
						if (j.nodeName.toLowerCase() === b) {
							k = j;
							break
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			d = "sizcache" + (Math.random() + "").replace(".", ""),
			e = 0,
			g = Object.prototype.toString,
			h = !1,
			i = !0,
			j = /\\/g,
			k = /\r\n/g,
			l = /\W/;
		[0, 0].sort(function () {
			i = !1;
			return 0
		});
		var m = function (b, d, e, f) {
			e = e || [], d = d || c;
			var h = d;
			if (d.nodeType !== 1 && d.nodeType !== 9) return [];
			if (!b || typeof b != "string") return e;
			var i, j, k, l, n, q, r, t, u = !0,
				v = m.isXML(d),
				w = [],
				x = b;
			do {
				a.exec(""), i = a.exec(x);
				if (i) {
					x = i[3], w.push(i[1]);
					if (i[2]) {
						l = i[3];
						break
					}
				}
			} while (i);
			if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
			else {
				j = o.relative[w[0]] ? [d] : m(w.shift(), d);
				while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
			} else {
				!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
				if (d) {
					n = f ? {
						expr: w.pop(),
						set: s(f)
					} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
					while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
				} else k = w = []
			}
			k || (k = j), k || m.error(q || b);
			if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k);
			else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
			else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
			else s(k, e);
			l && (m(l, h, e, f), m.uniqueSort(e));
			return e
		};
		m.uniqueSort = function (a) {
			if (u) {
				h = i, a.sort(u);
				if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
			}
			return a
		}, m.matches = function (a, b) {
			return m(a, null, null, b)
		}, m.matchesSelector = function (a, b) {
			return m(b, null, null, [a]).length > 0
		}, m.find = function (a, b, c) {
			var d, e, f, g, h, i;
			if (!a) return [];
			for (e = 0, f = o.order.length; e < f; e++) {
				h = o.order[e];
				if (g = o.leftMatch[h].exec(a)) {
					i = g[1], g.splice(1, 1);
					if (i.substr(i.length - 1) !== "\\") {
						g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
						if (d != null) {
							a = a.replace(o.match[h], "");
							break
						}
					}
				}
			}
			d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
			return {
				set: d,
				expr: a
			}
		}, m.filter = function (a, c, d, e) {
			var f, g, h, i, j, k, l, n, p, q = a,
				r = [],
				s = c,
				t = c && c[0] && m.isXML(c[0]);
			while (a && c.length) {
				for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
					k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
					if (l.substr(l.length - 1) === "\\") continue;
					s === r && (r = []);
					if (o.preFilter[h]) {
						f = o.preFilter[h](f, s, d, r, e, t);
						if (!f) g = i = !0;
						else if (f === !0) continue
					}
					if (f) for (n = 0;
					(j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
					if (i !== b) {
						d || (s = r), a = a.replace(o.match[h], "");
						if (!g) return [];
						break
					}
				}
				if (a === q) if (g == null) m.error(a);
				else break;
				q = a
			}
			return s
		}, m.error = function (a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		};
		var n = m.getText = function (a) {
			var b, c, d = a.nodeType,
				e = "";
			if (d) {
				if (d === 1 || d === 9) {
					if (typeof a.textContent == "string") return a.textContent;
					if (typeof a.innerText == "string") return a.innerText.replace(k, "");
					for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
				} else if (d === 3 || d === 4) return a.nodeValue
			} else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
			return e
		},
			o = m.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function (a) {
						return a.getAttribute("href")
					},
					type: function (a) {
						return a.getAttribute("type")
					}
				},
				relative: {
					"+": function (a, b) {
						var c = typeof b == "string",
							d = c && !l.test(b),
							e = c && !d;
						d && (b = b.toLowerCase());
						for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
							while ((h = h.previousSibling) && h.nodeType !== 1);
							a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
						}
						e && m.filter(b, a, !0)
					},
					">": function (a, b) {
						var c, d = typeof b == "string",
							e = 0,
							f = a.length;
						if (d && !l.test(b)) {
							b = b.toLowerCase();
							for (; e < f; e++) {
								c = a[e];
								if (c) {
									var g = c.parentNode;
									a[e] = g.nodeName.toLowerCase() === b ? g : !1
								}
							}
						} else {
							for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
							d && m.filter(b, a, !0)
						}
					},
					"": function (a, b, c) {
						var d, f = e++,
							g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
					},
					"~": function (a, b, c) {
						var d, f = e++,
							g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
					}
				},
				find: {
					ID: function (a, b, c) {
						if (typeof b.getElementById != "undefined" && !c) {
							var d = b.getElementById(a[1]);
							return d && d.parentNode ? [d] : []
						}
					},
					NAME: function (a, b) {
						if (typeof b.getElementsByName != "undefined") {
							var c = [],
								d = b.getElementsByName(a[1]);
							for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
							return c.length === 0 ? null : c
						}
					},
					TAG: function (a, b) {
						if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
					}
				},
				preFilter: {
					CLASS: function (a, b, c, d, e, f) {
						a = " " + a[1].replace(j, "") + " ";
						if (f) return a;
						for (var g = 0, h;
						(h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
						return !1
					},
					ID: function (a) {
						return a[1].replace(j, "")
					},
					TAG: function (a, b) {
						return a[1].replace(j, "").toLowerCase()
					},
					CHILD: function (a) {
						if (a[1] === "nth") {
							a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
							var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
							a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
						} else a[2] && m.error(a[0]);
						a[0] = e++;
						return a
					},
					ATTR: function (a, b, c, d, e, f) {
						var g = a[1] = a[1].replace(j, "");
						!f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
						return a
					},
					PSEUDO: function (b, c, d, e, f) {
						if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
						else {
							var g = m.filter(b[3], c, d, !0 ^ f);
							d || e.push.apply(e, g);
							return !1
						} else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
						return b
					},
					POS: function (a) {
						a.unshift(!0);
						return a
					}
				},
				filters: {
					enabled: function (a) {
						return a.disabled === !1 && a.type !== "hidden"
					},
					disabled: function (a) {
						return a.disabled === !0
					},
					checked: function (a) {
						return a.checked === !0
					},
					selected: function (a) {
						a.parentNode && a.parentNode.selectedIndex;
						return a.selected === !0
					},
					parent: function (a) {
						return !!a.firstChild
					},
					empty: function (a) {
						return !a.firstChild
					},
					has: function (a, b, c) {
						return !!m(c[3], a).length
					},
					header: function (a) {
						return /h\d/i.test(a.nodeName)
					},
					text: function (a) {
						var b = a.getAttribute("type"),
							c = a.type;
						return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
					},
					radio: function (a) {
						return a.nodeName.toLowerCase() === "input" && "radio" === a.type
					},
					checkbox: function (a) {
						return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
					},
					file: function (a) {
						return a.nodeName.toLowerCase() === "input" && "file" === a.type
					},
					password: function (a) {
						return a.nodeName.toLowerCase() === "input" && "password" === a.type
					},
					submit: function (a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "submit" === a.type
					},
					image: function (a) {
						return a.nodeName.toLowerCase() === "input" && "image" === a.type
					},
					reset: function (a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "reset" === a.type
					},
					button: function (a) {
						var b = a.nodeName.toLowerCase();
						return b === "input" && "button" === a.type || b === "button"
					},
					input: function (a) {
						return /input|select|textarea|button/i.test(a.nodeName)
					},
					focus: function (a) {
						return a === a.ownerDocument.activeElement
					}
				},
				setFilters: {
					first: function (a, b) {
						return b === 0
					},
					last: function (a, b, c, d) {
						return b === d.length - 1
					},
					even: function (a, b) {
						return b % 2 === 0
					},
					odd: function (a, b) {
						return b % 2 === 1
					},
					lt: function (a, b, c) {
						return b < c[3] - 0
					},
					gt: function (a, b, c) {
						return b > c[3] - 0
					},
					nth: function (a, b, c) {
						return c[3] - 0 === b
					},
					eq: function (a, b, c) {
						return c[3] - 0 === b
					}
				},
				filter: {
					PSEUDO: function (a, b, c, d) {
						var e = b[1],
							f = o.filters[e];
						if (f) return f(a, c, b, d);
						if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
						if (e === "not") {
							var g = b[3];
							for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
							return !0
						}
						m.error(e)
					},
					CHILD: function (a, b) {
						var c, e, f, g, h, i, j, k = b[1],
							l = a;
						switch (k) {
						case "only":
						case "first":
							while (l = l.previousSibling) if (l.nodeType === 1) return !1;
							if (k === "first") return !0;
							l = a;
						case "last":
							while (l = l.nextSibling) if (l.nodeType === 1) return !1;
							return !0;
						case "nth":
							c = b[2], e = b[3];
							if (c === 1 && e === 0) return !0;
							f = b[0], g = a.parentNode;
							if (g && (g[d] !== f || !a.nodeIndex)) {
								i = 0;
								for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
								g[d] = f
							}
							j = a.nodeIndex - e;
							return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
						}
					},
					ID: function (a, b) {
						return a.nodeType === 1 && a.getAttribute("id") === b
					},
					TAG: function (a, b) {
						return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
					},
					CLASS: function (a, b) {
						return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
					},
					ATTR: function (a, b) {
						var c = b[1],
							d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
							e = d + "",
							f = b[2],
							g = b[4];
						return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
					},
					POS: function (a, b, c, d) {
						var e = b[2],
							f = o.setFilters[e];
						if (f) return f(a, c, b, d)
					}
				}
			},
			p = o.match.POS,
			q = function (a, b) {
				return "\\" + (b - 0 + 1)
			};
		for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
		var s = function (a, b) {
			a = Array.prototype.slice.call(a, 0);
			if (b) {
				b.push.apply(b, a);
				return b
			}
			return a
		};
		try {
			Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
		} catch (t) {
			s = function (a, b) {
				var c = 0,
					d = b || [];
				if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
				else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]);
				else for (; a[c]; c++) d.push(a[c]);
				return d
			}
		}
		var u, v;
		c.documentElement.compareDocumentPosition ? u = function (a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
			return a.compareDocumentPosition(b) & 4 ? -1 : 1
		} : (u = function (a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
			var c, d, e = [],
				f = [],
				g = a.parentNode,
				i = b.parentNode,
				j = g;
			if (g === i) return v(a, b);
			if (!g) return -1;
			if (!i) return 1;
			while (j) e.unshift(j), j = j.parentNode;
			j = i;
			while (j) f.unshift(j), j = j.parentNode;
			c = e.length, d = f.length;
			for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
			return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
		}, v = function (a, b, c) {
			if (a === b) return c;
			var d = a.nextSibling;
			while (d) {
				if (d === b) return -1;
				d = d.nextSibling
			}
			return 1
		}), function () {
			var a = c.createElement("div"),
				d = "script" + (new Date).getTime(),
				e = c.documentElement;
			a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
				if (typeof c.getElementById != "undefined" && !d) {
					var e = c.getElementById(a[1]);
					return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
				}
			}, o.filter.ID = function (a, b) {
				var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
				return a.nodeType === 1 && c && c.nodeValue === b
			}), e.removeChild(a), e = a = null
		}(), function () {
			var a = c.createElement("div");
			a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
				var c = b.getElementsByTagName(a[1]);
				if (a[1] === "*") {
					var d = [];
					for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
					c = d
				}
				return c
			}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
				return a.getAttribute("href", 2)
			}), a = null
		}(), c.querySelectorAll &&
		function () {
			var a = m,
				b = c.createElement("div"),
				d = "__sizzle__";
			b.innerHTML = "<p class='TEST'></p>";
			if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
				m = function (b, e, f, g) {
					e = e || c;
					if (!g && !m.isXML(e)) {
						var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
						if (h && (e.nodeType === 1 || e.nodeType === 9)) {
							if (h[1]) return s(e.getElementsByTagName(b), f);
							if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
						}
						if (e.nodeType === 9) {
							if (b === "body" && e.body) return s([e.body], f);
							if (h && h[3]) {
								var i = e.getElementById(h[3]);
								if (!i || !i.parentNode) return s([], f);
								if (i.id === h[3]) return s([i], f)
							}
							try {
								return s(e.querySelectorAll(b), f)
							} catch (j) {}
						} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
							var k = e,
								l = e.getAttribute("id"),
								n = l || d,
								p = e.parentNode,
								q = /^\s*[+~]/.test(b);
							l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
							try {
								if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
							} catch (r) {} finally {
								l || k.removeAttribute("id")
							}
						}
					}
					return a(b, e, f, g)
				};
				for (var e in a) m[e] = a[e];
				b = null
			}
		}(), function () {
			var a = c.documentElement,
				b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
			if (b) {
				var d = !b.call(c.createElement("div"), "div"),
					e = !1;
				try {
					b.call(c.documentElement, "[test!='']:sizzle")
				} catch (f) {
					e = !0
				}
				m.matchesSelector = function (a, c) {
					c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!m.isXML(a)) try {
						if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
							var f = b.call(a, c);
							if (f || !d || a.document && a.document.nodeType !== 11) return f
						}
					} catch (g) {}
					return m(c, null, null, [a]).length > 0
				}
			}
		}(), function () {
			var a = c.createElement("div");
			a.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
				a.lastChild.className = "e";
				if (a.getElementsByClassName("e").length === 1) return;
				o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
					if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
				}, a = null
			}
		}(), c.documentElement.contains ? m.contains = function (a, b) {
			return a !== b && (a.contains ? a.contains(b) : !0)
		} : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
			return !!(a.compareDocumentPosition(b) & 16)
		} : m.contains = function () {
			return !1
		}, m.isXML = function (a) {
			var b = (a ? a.ownerDocument || a : 0).documentElement;
			return b ? b.nodeName !== "HTML" : !1
		};
		var y = function (a, b, c) {
			var d, e = [],
				f = "",
				g = b.nodeType ? [b] : b;
			while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
			a = o.relative[a] ? a + "*" : a;
			for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
			return m.filter(f, e)
		};
		m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
	}();
	var L = /Until$/,
		M = /^(?:parents|prevUntil|prevAll)/,
		N = /,/,
		O = /^.[^:#\[\.,]*$/,
		P = Array.prototype.slice,
		Q = f.expr.match.POS,
		R = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	f.fn.extend({
		find: function (a) {
			var b = this,
				c, d;
			if (typeof a != "string") return f(a).filter(function () {
				for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0
			});
			var e = this.pushStack("", "find", a),
				g, h, i;
			for (c = 0, d = this.length; c < d; c++) {
				g = e.length, f.find(a, this[c], e);
				if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
					e.splice(h--, 1);
					break
				}
			}
			return e
		},
		has: function (a) {
			var b = f(a);
			return this.filter(function () {
				for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0
			})
		},
		not: function (a) {
			return this.pushStack(T(this, a, !1), "not", a)
		},
		filter: function (a) {
			return this.pushStack(T(this, a, !0), "filter", a)
		},
		is: function (a) {
			return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest: function (a, b) {
			var c = [],
				d, e, g = this[0];
			if (f.isArray(a)) {
				var h = 1;
				while (g && g.ownerDocument && g !== b) {
					for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
						selector: a[d],
						elem: g,
						level: h
					});
					g = g.parentNode, h++
				}
				return c
			}
			var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
			for (d = 0, e = this.length; d < e; d++) {
				g = this[d];
				while (g) {
					if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
						c.push(g);
						break
					}
					g = g.parentNode;
					if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
				}
			}
			c = c.length > 1 ? f.unique(c) : c;
			return this.pushStack(c, "closest", a)
		},
		index: function (a) {
			if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
			if (typeof a == "string") return f.inArray(this[0], f(a));
			return f.inArray(a.jquery ? a[0] : a, this)
		},
		add: function (a, b) {
			var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
				d = f.merge(this.get(), c);
			return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
		},
		andSelf: function () {
			return this.add(this.prevObject)
		}
	}), f.each({
		parent: function (a) {
			var b = a.parentNode;
			return b && b.nodeType !== 11 ? b : null
		},
		parents: function (a) {
			return f.dir(a, "parentNode")
		},
		parentsUntil: function (a, b, c) {
			return f.dir(a, "parentNode", c)
		},
		next: function (a) {
			return f.nth(a, 2, "nextSibling")
		},
		prev: function (a) {
			return f.nth(a, 2, "previousSibling")
		},
		nextAll: function (a) {
			return f.dir(a, "nextSibling")
		},
		prevAll: function (a) {
			return f.dir(a, "previousSibling")
		},
		nextUntil: function (a, b, c) {
			return f.dir(a, "nextSibling", c)
		},
		prevUntil: function (a, b, c) {
			return f.dir(a, "previousSibling", c)
		},
		siblings: function (a) {
			return f.sibling(a.parentNode.firstChild, a)
		},
		children: function (a) {
			return f.sibling(a.firstChild)
		},
		contents: function (a) {
			return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
		}
	}, function (a, b) {
		f.fn[a] = function (c, d) {
			var e = f.map(this, b, c);
			L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
			return this.pushStack(e, a, P.call(arguments).join(","))
		}
	}), f.extend({
		filter: function (a, b, c) {
			c && (a = ":not(" + a + ")");
			return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
		},
		dir: function (a, c, d) {
			var e = [],
				g = a[c];
			while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
			return e
		},
		nth: function (a, b, c, d) {
			b = b || 1;
			var e = 0;
			for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
			return a
		},
		sibling: function (a, b) {
			var c = [];
			for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
			return c
		}
	});
	var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		W = / jQuery\d+="(?:\d+|null)"/g,
		X = /^\s+/,
		Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		Z = /<([\w:]+)/,
		$ = /<tbody/i,
		_ = /<|&#?\w+;/,
		ba = /<(?:script|style)/i,
		bb = /<(?:script|object|embed|option|style)/i,
		bc = new RegExp("<(?:" + V + ")", "i"),
		bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
		be = /\/(java|ecma)script/i,
		bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
		bg = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		bh = U(c);
	bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
		text: function (a) {
			if (f.isFunction(a)) return this.each(function (b) {
				var c = f(this);
				c.text(a.call(this, b, c.text()))
			});
			if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
			return f.text(this)
		},
		wrapAll: function (a) {
			if (f.isFunction(a)) return this.each(function (b) {
				f(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
					var a = this;
					while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function (a) {
			if (f.isFunction(a)) return this.each(function (b) {
				f(this).wrapInner(a.call(this, b))
			});
			return this.each(function () {
				var b = f(this),
					c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function (a) {
			var b = f.isFunction(a);
			return this.each(function (c) {
				f(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function () {
			return this.domManip(arguments, !0, function (a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function () {
			return this.domManip(arguments, !0, function (a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function () {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = f.clean(arguments);
				a.push.apply(a, this.toArray());
				return this.pushStack(a, "before", arguments)
			}
		},
		after: function () {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = this.pushStack(this, "after", arguments);
				a.push.apply(a, f.clean(arguments));
				return a
			}
		},
		remove: function (a, b) {
			for (var c = 0, d;
			(d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
			return this
		},
		empty: function () {
			for (var a = 0, b;
			(b = this[a]) != null; a++) {
				b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
				while (b.firstChild) b.removeChild(b.firstChild)
			}
			return this
		},
		clone: function (a, b) {
			a = a == null ? !1 : a, b = b == null ? a : b;
			return this.map(function () {
				return f.clone(this, a, b)
			})
		},
		html: function (a) {
			if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
			if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
				a = a.replace(Y, "<$1></$2>");
				try {
					for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
				} catch (e) {
					this.empty().append(a)
				}
			} else f.isFunction(a) ? this.each(function (b) {
				var c = f(this);
				c.html(a.call(this, b, c.html()))
			}) : this.empty().append(a);
			return this
		},
		replaceWith: function (a) {
			if (this[0] && this[0].parentNode) {
				if (f.isFunction(a)) return this.each(function (b) {
					var c = f(this),
						d = c.html();
					c.replaceWith(a.call(this, b, d))
				});
				typeof a != "string" && (a = f(a).detach());
				return this.each(function () {
					var b = this.nextSibling,
						c = this.parentNode;
					f(this).remove(), b ? f(b).before(a) : f(c).append(a)
				})
			}
			return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
		},
		detach: function (a) {
			return this.remove(a, !0)
		},
		domManip: function (a, c, d) {
			var e, g, h, i, j = a[0],
				k = [];
			if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
				f(this).domManip(a, c, d, !0)
			});
			if (f.isFunction(j)) return this.each(function (e) {
				var g = f(this);
				a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
			});
			if (this[0]) {
				i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
					fragment: i
				} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
				if (g) {
					c = c && f.nodeName(g, "tr");
					for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
				}
				k.length && f.each(k, bp)
			}
			return this
		}
	}), f.buildFragment = function (a, b, d) {
		var e, g, h, i, j = a[0];
		b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
		return {
			fragment: e,
			cacheable: g
		}
	}, f.fragments = {}, f.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (a, b) {
		f.fn[a] = function (c) {
			var d = [],
				e = f(c),
				g = this.length === 1 && this[0].parentNode;
			if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
				e[b](this[0]);
				return this
			}
			for (var h = 0, i = e.length; h < i; h++) {
				var j = (h > 0 ? this.clone(!0) : this).get();
				f(e[h])[b](j), d = d.concat(j)
			}
			return this.pushStack(d, a, e.selector)
		}
	}), f.extend({
		clone: function (a, b, c) {
			var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
			if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
				bk(a, h), d = bl(a), e = bl(h);
				for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
			}
			if (b) {
				bj(a, h);
				if (c) {
					d = bl(a), e = bl(h);
					for (g = 0; d[g]; ++g) bj(d[g], e[g])
				}
			}
			d = e = null;
			return h
		},
		clean: function (a, b, d, e) {
			var g;
			b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
			var h = [],
				i;
			for (var j = 0, k;
			(k = a[j]) != null; j++) {
				typeof k == "number" && (k += "");
				if (!k) continue;
				if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k);
				else {
					k = k.replace(Y, "<$1></$2>");
					var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
						m = bg[l] || bg._default,
						n = m[0],
						o = b.createElement("div");
					b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
					while (n--) o = o.lastChild;
					if (!f.support.tbody) {
						var p = $.test(k),
							q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
						for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
					}!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
				}
				var r;
				if (!f.support.appendChecked) if (k[0] && typeof(r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]);
				else bn(k);
				k.nodeType ? h.push(k) : h = f.merge(h, k)
			}
			if (d) {
				g = function (a) {
					return !a.type || be.test(a.type)
				};
				for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
				else {
					if (h[j].nodeType === 1) {
						var s = f.grep(h[j].getElementsByTagName("script"), g);
						h.splice.apply(h, [j + 1, 0].concat(s))
					}
					d.appendChild(h[j])
				}
			}
			return h
		},
		cleanData: function (a) {
			var b, c, d = f.cache,
				e = f.event.special,
				g = f.support.deleteExpando;
			for (var h = 0, i;
			(i = a[h]) != null; h++) {
				if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
				c = i[f.expando];
				if (c) {
					b = d[c];
					if (b && b.events) {
						for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
						b.handle && (b.handle.elem = null)
					}
					g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
				}
			}
		}
	});
	var bq = /alpha\([^)]*\)/i,
		br = /opacity=([^)]*)/,
		bs = /([A-Z]|^ms)/g,
		bt = /^-?\d+(?:px)?$/i,
		bu = /^-?\d/,
		bv = /^([\-+])=([\-+.\de]+)/,
		bw = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		bx = ["Left", "Right"],
		by = ["Top", "Bottom"],
		bz, bA, bB;
	f.fn.css = function (a, c) {
		if (arguments.length === 2 && c === b) return this;
		return f.access(this, a, c, !0, function (a, c, d) {
			return d !== b ? f.style(a, c, d) : f.css(a, c)
		})
	}, f.extend({
		cssHooks: {
			opacity: {
				get: function (a, b) {
					if (b) {
						var c = bz(a, "opacity", "opacity");
						return c === "" ? "1" : c
					}
					return a.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": f.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function (a, c, d, e) {
			if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
				var g, h, i = f.camelCase(c),
					j = a.style,
					k = f.cssHooks[i];
				c = f.cssProps[i] || i;
				if (d === b) {
					if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
					return j[c]
				}
				h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
				if (d == null || h === "number" && isNaN(d)) return;
				h === "number" && !f.cssNumber[i] && (d += "px");
				if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
					j[c] = d
				} catch (l) {}
			}
		},
		css: function (a, c, d) {
			var e, g;
			c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
			if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
			if (bz) return bz(a, c)
		},
		swap: function (a, b, c) {
			var d = {};
			for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
			c.call(a);
			for (e in b) a.style[e] = d[e]
		}
	}), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
		f.cssHooks[b] = {
			get: function (a, c, d) {
				var e;
				if (c) {
					if (a.offsetWidth !== 0) return bC(a, b, d);
					f.swap(a, bw, function () {
						e = bC(a, b, d)
					});
					return e
				}
			},
			set: function (a, b) {
				if (!bt.test(b)) return b;
				b = parseFloat(b);
				if (b >= 0) return b + "px"
			}
		}
	}), f.support.opacity || (f.cssHooks.opacity = {
		get: function (a, b) {
			return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
		},
		set: function (a, b) {
			var c = a.style,
				d = a.currentStyle,
				e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
				g = d && d.filter || c.filter || "";
			c.zoom = 1;
			if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
				c.removeAttribute("filter");
				if (d && !d.filter) return
			}
			c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
		}
	}), f(function () {
		f.support.reliableMarginRight || (f.cssHooks.marginRight = {
			get: function (a, b) {
				var c;
				f.swap(a, {
					display: "inline-block"
				}, function () {
					b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
				});
				return c
			}
		})
	}), c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
		var c, d, e;
		b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
		return c
	}), c.documentElement.currentStyle && (bB = function (a, b) {
		var c, d, e, f = a.currentStyle && a.currentStyle[b],
			g = a.style;
		f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
		return f === "" ? "auto" : f
	}), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
		var b = a.offsetWidth,
			c = a.offsetHeight;
		return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
	}, f.expr.filters.visible = function (a) {
		return !f.expr.filters.hidden(a)
	});
	var bD = /%20/g,
		bE = /\[\]$/,
		bF = /\r?\n/g,
		bG = /#.*$/,
		bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		bK = /^(?:GET|HEAD)$/,
		bL = /^\/\//,
		bM = /\?/,
		bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		bO = /^(?:select|textarea)/i,
		bP = /\s+/,
		bQ = /([?&])_=[^&]*/,
		bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
		bS = f.fn.load,
		bT = {},
		bU = {},
		bV, bW, bX = ["*/"] + ["*"];
	try {
		bV = e.href
	} catch (bY) {
		bV = c.createElement("a"), bV.href = "", bV = bV.href
	}
	bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
		load: function (a, c, d) {
			if (typeof a != "string" && bS) return bS.apply(this, arguments);
			if (!this.length) return this;
			var e = a.indexOf(" ");
			if (e >= 0) {
				var g = a.slice(e, a.length);
				a = a.slice(0, e)
			}
			var h = "GET";
			c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
			var i = this;
			f.ajax({
				url: a,
				type: h,
				dataType: "html",
				data: c,
				complete: function (a, b, c) {
					c = a.responseText, a.isResolved() && (a.done(function (a) {
						c = a
					}), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
				}
			});
			return this
		},
		serialize: function () {
			return f.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				return this.elements ? f.makeArray(this.elements) : this
			}).filter(function () {
				return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
			}).map(function (a, b) {
				var c = f(this).val();
				return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
					return {
						name: b.name,
						value: a.replace(bF, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(bF, "\r\n")
				}
			}).get()
		}
	}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
		f.fn[b] = function (a) {
			return this.on(b, a)
		}
	}), f.each(["get", "post"], function (a, c) {
		f[c] = function (a, d, e, g) {
			f.isFunction(d) && (g = g || e, e = d, d = b);
			return f.ajax({
				type: c,
				url: a,
				data: d,
				success: e,
				dataType: g
			})
		}
	}), f.extend({
		getScript: function (a, c) {
			return f.get(a, b, c, "script")
		},
		getJSON: function (a, b, c) {
			return f.get(a, b, c, "json")
		},
		ajaxSetup: function (a, b) {
			b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
			return a
		},
		ajaxSettings: {
			url: bV,
			isLocal: bJ.test(bW[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": bX
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": a.String,
				"text html": !0,
				"text json": f.parseJSON,
				"text xml": f.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: bZ(bT),
		ajaxTransport: bZ(bU),
		ajax: function (a, c) {
			function w(a, c, l, m) {
				if (s !== 2) {
					s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
					var o, r, u, w = c,
						x = l ? cb(d, v, l) : b,
						y, z;
					if (a >= 200 && a < 300 || a === 304) {
						if (d.ifModified) {
							if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
							if (z = v.getResponseHeader("Etag")) f.etag[k] = z
						}
						if (a === 304) w = "notmodified", o = !0;
						else try {
							r = cc(d, x), w = "success", o = !0
						} catch (A) {
							w = "parsererror", u = A
						}
					} else {
						u = w;
						if (!w || a) w = "error", a < 0 && (a = 0)
					}
					v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
				}
			}
			typeof a == "object" && (c = a, a = b), c = c || {};
			var d = f.ajaxSetup({}, c),
				e = d.context || d,
				g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
				h = f.Deferred(),
				i = f.Callbacks("once memory"),
				j = d.statusCode || {},
				k, l = {},
				m = {},
				n, o, p, q, r, s = 0,
				t, u, v = {
					readyState: 0,
					setRequestHeader: function (a, b) {
						if (!s) {
							var c = a.toLowerCase();
							a = m[c] = m[c] || a, l[a] = b
						}
						return this
					},
					getAllResponseHeaders: function () {
						return s === 2 ? n : null
					},
					getResponseHeader: function (a) {
						var c;
						if (s === 2) {
							if (!o) {
								o = {};
								while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
							}
							c = o[a.toLowerCase()]
						}
						return c === b ? null : c
					},
					overrideMimeType: function (a) {
						s || (d.mimeType = a);
						return this
					},
					abort: function (a) {
						a = a || "abort", p && p.abort(a), w(0, a);
						return this
					}
				};
			h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
				if (a) {
					var b;
					if (s < 2) for (b in a) j[b] = [j[b], a[b]];
					else b = a[v.status], v.then(b, b)
				}
				return this
			}, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
			if (s === 2) return !1;
			t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
			if (!d.hasContent) {
				d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
				if (d.cache === !1) {
					var x = f.now(),
						y = d.url.replace(bQ, "$1_=" + x);
					d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
				}
			}(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
			for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
			if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
				v.abort();
				return !1
			}
			for (u in {
				success: 1,
				error: 1,
				complete: 1
			}) v[u](d[u]);
			p = b$(bU, d, c, v);
			if (!p) w(-1, "No Transport");
			else {
				v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
					v.abort("timeout")
				}, d.timeout));
				try {
					s = 1, p.send(l, w)
				} catch (z) {
					if (s < 2) w(-1, z);
					else throw z
				}
			}
			return v
		},
		param: function (a, c) {
			var d = [],
				e = function (a, b) {
					b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			c === b && (c = f.ajaxSettings.traditional);
			if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
				e(this.name, this.value)
			});
			else for (var g in a) ca(g, a[g], c, e);
			return d.join("&").replace(bD, "+")
		}
	}), f.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var cd = f.now(),
		ce = /(\=)\?(&|$)|\?\?/i;
	f.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			return f.expando + "_" + cd++
		}
	}), f.ajaxPrefilter("json jsonp", function (b, c, d) {
		var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
		if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
			var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
				i = a[h],
				j = b.url,
				k = b.data,
				l = "$1" + h + "$2";
			b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
				g = [a]
			}, d.always(function () {
				a[h] = i, g && f.isFunction(i) && a[h](g[0])
			}), b.converters["script json"] = function () {
				g || f.error(h + " was not called");
				return g[0]
			}, b.dataTypes[0] = "json";
			return "script"
		}
	}), f.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function (a) {
				f.globalEval(a);
				return a
			}
		}
	}), f.ajaxPrefilter("script", function (a) {
		a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), f.ajaxTransport("script", function (a) {
		if (a.crossDomain) {
			var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
			return {
				send: function (f, g) {
					d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
						if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
					}, e.insertBefore(d, e.firstChild)
				},
				abort: function () {
					d && d.onload(0, 1)
				}
			}
		}
	});
	var cf = a.ActiveXObject ?
	function () {
		for (var a in ch) ch[a](0, 1)
	} : !1,
		cg = 0,
		ch;
	f.ajaxSettings.xhr = a.ActiveXObject ?
	function () {
		return !this.isLocal && ci() || cj()
	} : ci, function (a) {
		f.extend(f.support, {
			ajax: !! a,
			cors: !! a && "withCredentials" in a
		})
	}(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
		if (!c.crossDomain || f.support.cors) {
			var d;
			return {
				send: function (e, g) {
					var h = c.xhr(),
						i, j;
					c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
					if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
					c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (j in e) h.setRequestHeader(j, e[j])
					} catch (k) {}
					h.send(c.hasContent && c.data || null), d = function (a, e) {
						var j, k, l, m, n;
						try {
							if (d && (e || h.readyState === 4)) {
								d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
								if (e) h.readyState !== 4 && h.abort();
								else {
									j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
									try {
										k = h.statusText
									} catch (o) {
										k = ""
									}!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
								}
							}
						} catch (p) {
							e || g(-1, p)
						}
						m && g(j, k, m, l)
					}, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
				},
				abort: function () {
					d && d(0, 1)
				}
			}
		}
	});
	var ck = {},
		cl, cm, cn = /^(?:toggle|show|hide)$/,
		co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		cp, cq = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		],
		cr;
	f.fn.extend({
		show: function (a, b, c) {
			var d, e;
			if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
			for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
			for (g = 0; g < h; g++) {
				d = this[g];
				if (d.style) {
					e = d.style.display;
					if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
				}
			}
			return this
		},
		hide: function (a, b, c) {
			if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
			var d, e, g = 0,
				h = this.length;
			for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
			for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
			return this
		},
		_toggle: f.fn.toggle,
		toggle: function (a, b, c) {
			var d = typeof a == "boolean";
			f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
				var b = d ? a : f(this).is(":hidden");
				f(this)[b ? "show" : "hide"]()
			}) : this.animate(cu("toggle", 3), a, b, c);
			return this
		},
		fadeTo: function (a, b, c, d) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: b
			}, a, c, d)
		},
		animate: function (a, b, c, d) {
			function g() {
				e.queue === !1 && f._mark(this);
				var b = f.extend({}, e),
					c = this.nodeType === 1,
					d = c && f(this).is(":hidden"),
					g, h, i, j, k, l, m, n, o;
				b.animatedProperties = {};
				for (i in a) {
					g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
					if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
					c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
				}
				b.overflow != null && (this.style.overflow = "hidden");
				for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
				return !0
			}
			var e = f.speed(b, c, d);
			if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
			a = f.extend({}, a);
			return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
		},
		stop: function (a, c, d) {
			typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
			return this.each(function () {
				function h(a, b, c) {
					var e = b[c];
					f.removeData(a, c, !0), e.stop(d)
				}
				var b, c = !1,
					e = f.timers,
					g = f._data(this);
				d || f._unmark(!0, this);
				if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
				else g[b = a + ".run"] && g[b].stop && h(this, g, b);
				for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
				(!d || !c) && f.dequeue(this, a)
			})
		}
	}), f.each({
		slideDown: cu("show", 1),
		slideUp: cu("hide", 1),
		slideToggle: cu("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (a, b) {
		f.fn[a] = function (a, c, d) {
			return this.animate(b, a, c, d)
		}
	}), f.extend({
		speed: function (a, b, c) {
			var d = a && typeof a == "object" ? f.extend({}, a) : {
				complete: c || !c && b || f.isFunction(a) && a,
				duration: a,
				easing: c && b || b && !f.isFunction(b) && b
			};
			d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
			if (d.queue == null || d.queue === !0) d.queue = "fx";
			d.old = d.complete, d.complete = function (a) {
				f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
			};
			return d
		},
		easing: {
			linear: function (a, b, c, d) {
				return c + d * a
			},
			swing: function (a, b, c, d) {
				return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
			}
		},
		timers: [],
		fx: function (a, b, c) {
			this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
		}
	}), f.fx.prototype = {
		update: function () {
			this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
		},
		cur: function () {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
			var a, b = f.css(this.elem, this.prop);
			return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
		},
		custom: function (a, c, d) {
			function h(a) {
				return e.step(a)
			}
			var e = this,
				g = f.fx;
			this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
				e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
			}, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
		},
		show: function () {
			var a = f._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
		},
		hide: function () {
			this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
		},
		step: function (a) {
			var b, c, d, e = cr || cs(),
				g = !0,
				h = this.elem,
				i = this.options;
			if (a || e >= i.duration + this.startTime) {
				this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
				for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
				if (g) {
					i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
						h.style["overflow" + b] = i.overflow[a]
					}), i.hide && f(h).hide();
					if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
					d = i.complete, d && (i.complete = !1, d.call(h))
				}
				return !1
			}
			i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
			return !0
		}
	}, f.extend(f.fx, {
		tick: function () {
			var a, b = f.timers,
				c = 0;
			for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
			b.length || f.fx.stop()
		},
		interval: 13,
		stop: function () {
			clearInterval(cp), cp = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function (a) {
				f.style(a.elem, "opacity", a.now)
			},
			_default: function (a) {
				a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
			}
		}
	}), f.each(["width", "height"], function (a, b) {
		f.fx.step[b] = function (a) {
			f.style(a.elem, b, Math.max(0, a.now) + a.unit)
		}
	}), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
		return f.grep(f.timers, function (b) {
			return a === b.elem
		}).length
	});
	var cw = /^t(?:able|d|h)$/i,
		cx = /^(?:body|html)$/i;
	"getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
		var b = this[0],
			c;
		if (a) return this.each(function (b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		try {
			c = b.getBoundingClientRect()
		} catch (d) {}
		var e = b.ownerDocument,
			g = e.documentElement;
		if (!c || !f.contains(g, b)) return c ? {
			top: c.top,
			left: c.left
		} : {
			top: 0,
			left: 0
		};
		var h = e.body,
			i = cy(e),
			j = g.clientTop || h.clientTop || 0,
			k = g.clientLeft || h.clientLeft || 0,
			l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
			m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
			n = c.top + l - j,
			o = c.left + m - k;
		return {
			top: n,
			left: o
		}
	} : f.fn.offset = function (a) {
		var b = this[0];
		if (a) return this.each(function (b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		var c, d = b.offsetParent,
			e = b,
			g = b.ownerDocument,
			h = g.documentElement,
			i = g.body,
			j = g.defaultView,
			k = j ? j.getComputedStyle(b, null) : b.currentStyle,
			l = b.offsetTop,
			m = b.offsetLeft;
		while ((b = b.parentNode) && b !== i && b !== h) {
			if (f.support.fixedPosition && k.position === "fixed") break;
			c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
		}
		if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
		f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
		return {
			top: l,
			left: m
		}
	}, f.offset = {
		bodyOffset: function (a) {
			var b = a.offsetTop,
				c = a.offsetLeft;
			f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
			return {
				top: b,
				left: c
			}
		},
		setOffset: function (a, b, c) {
			var d = f.css(a, "position");
			d === "static" && (a.style.position = "relative");
			var e = f(a),
				g = e.offset(),
				h = f.css(a, "top"),
				i = f.css(a, "left"),
				j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
				k = {},
				l = {},
				m, n;
			j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
		}
	}, f.fn.extend({
		position: function () {
			if (!this[0]) return null;
			var a = this[0],
				b = this.offsetParent(),
				c = this.offset(),
				d = cx.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				} : b.offset();
			c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
			return {
				top: c.top - d.top,
				left: c.left - d.left
			}
		},
		offsetParent: function () {
			return this.map(function () {
				var a = this.offsetParent || c.body;
				while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
				return a
			})
		}
	}), f.each(["Left", "Top"], function (a, c) {
		var d = "scroll" + c;
		f.fn[d] = function (c) {
			var e, g;
			if (c === b) {
				e = this[0];
				if (!e) return null;
				g = cy(e);
				return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
			}
			return this.each(function () {
				g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
			})
		}
	}), f.each(["Height", "Width"], function (a, c) {
		var d = c.toLowerCase();
		f.fn["inner" + c] = function () {
			var a = this[0];
			return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
		}, f.fn["outer" + c] = function (a) {
			var b = this[0];
			return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
		}, f.fn[d] = function (a) {
			var e = this[0];
			if (!e) return a == null ? null : this;
			if (f.isFunction(a)) return this.each(function (b) {
				var c = f(this);
				c[d](a.call(this, b, c[d]()))
			});
			if (f.isWindow(e)) {
				var g = e.document.documentElement["client" + c],
					h = e.document.body;
				return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
			}
			if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
			if (a === b) {
				var i = f.css(e, d),
					j = parseFloat(i);
				return f.isNumeric(j) ? j : i
			}
			return this.css(d, typeof a == "string" ? a : a + "px")
		}
	}), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
		return f
	})
})(window);
!
function (e) {
	"use strict";
	e(function () {
		e.support.transition = function () {
			var e = function () {
				var e = document.createElement("bootstrap"),
					t = {
						WebkitTransition: "webkitTransitionEnd",
						MozTransition: "transitionend",
						OTransition: "oTransitionEnd otransitionend",
						transition: "transitionend"
					},
					n;
				for (n in t) if (e.style[n] !== undefined) return t[n]
			}();
			return e && {
				end: e
			}
		}()
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = '[data-dismiss="alert"]',
		n = function (n) {
			e(n).on("click", t, this.close)
		};
	n.prototype.close = function (t) {
		function s() {
			i.trigger("closed").remove()
		}
		var n = e(this),
			r = n.attr("data-target"),
			i;
		r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
		if (t.isDefaultPrevented()) return;
		i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
	}, e.fn.alert = function (t) {
		return this.each(function () {
			var r = e(this),
				i = r.data("alert");
			i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
		})
	}, e.fn.alert.Constructor = n, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
	};
	t.prototype.setState = function (e) {
		var t = "disabled",
			n = this.$element,
			r = n.data(),
			i = n.is("input") ? "val" : "html";
		e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
			e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
		}, 0)
	}, t.prototype.toggle = function () {
		var e = this.$element.closest('[data-toggle="buttons-radio"]');
		e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
	}, e.fn.button = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("button"),
				s = typeof n == "object" && n;
			i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
		})
	}, e.fn.button.defaults = {
		loadingText: "loading..."
	}, e.fn.button.Constructor = t, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
		var n = e(t.target);
		n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
	};
	t.prototype = {
		cycle: function (t) {
			return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
		},
		to: function (t) {
			var n = this.$element.find(".item.active"),
				r = n.parent().children(),
				i = r.index(n),
				s = this;
			if (t > r.length - 1 || t < 0) return;
			return this.sliding ? this.$element.one("slid", function () {
				s.to(t)
			}) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
		},
		pause: function (t) {
			return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
		},
		next: function () {
			if (this.sliding) return;
			return this.slide("next")
		},
		prev: function () {
			if (this.sliding) return;
			return this.slide("prev")
		},
		slide: function (t, n) {
			var r = this.$element.find(".item.active"),
				i = n || r[t](),
				s = this.interval,
				o = t == "next" ? "left" : "right",
				u = t == "next" ? "first" : "last",
				a = this,
				f;
			this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {
				relatedTarget: i[0]
			});
			if (i.hasClass("active")) return;
			if (e.support.transition && this.$element.hasClass("slide")) {
				this.$element.trigger(f);
				if (f.isDefaultPrevented()) return;
				i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
					i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
						a.$element.trigger("slid")
					}, 0)
				})
			} else {
				this.$element.trigger(f);
				if (f.isDefaultPrevented()) return;
				r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
			}
			return s && this.cycle(), this
		}
	}, e.fn.carousel = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("carousel"),
				s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
				o = typeof n == "string" ? n : s.slide;
			i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
		})
	}, e.fn.carousel.defaults = {
		interval: 5e3,
		pause: "hover"
	}, e.fn.carousel.Constructor = t, e(document).on("click.carousel.data-api", "[data-slide]", function (t) {
		var n = e(this),
			r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
			s = e.extend({}, i.data(), n.data());
		i.carousel(s), t.preventDefault()
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
	};
	t.prototype = {
		constructor: t,
		dimension: function () {
			var e = this.$element.hasClass("width");
			return e ? "width" : "height"
		},
		show: function () {
			var t, n, r, i;
			if (this.transitioning) return;
			t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
			if (r && r.length) {
				i = r.data("collapse");
				if (i && i.transitioning) return;
				r.collapse("hide"), i || r.data("collapse", null)
			}
			this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
		},
		hide: function () {
			var t;
			if (this.transitioning) return;
			t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
		},
		reset: function (e) {
			var t = this.dimension();
			return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
		},
		transition: function (t, n, r) {
			var i = this,
				s = function () {
					n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
				};
			this.$element.trigger(n);
			if (n.isDefaultPrevented()) return;
			this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
		},
		toggle: function () {
			this[this.$element.hasClass("in") ? "hide" : "show"]()
		}
	}, e.fn.collapse = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("collapse"),
				s = typeof n == "object" && n;
			i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.collapse.defaults = {
		toggle: !0
	}, e.fn.collapse.Constructor = t, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
		var n = e(this),
			r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
			s = e(i).data("collapse") ? "toggle" : n.data();
		n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
	})
}(window.jQuery), !
function (e) {
	"use strict";

	function r() {
		e(t).each(function () {
			i(e(this)).removeClass("open")
		})
	}
	function i(t) {
		var n = t.attr("data-target"),
			r;
		return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
	}
	var t = "[data-toggle=dropdown]",
		n = function (t) {
			var n = e(t).on("click.dropdown.data-api", this.toggle);
			e("html").on("click.dropdown.data-api", function () {
				n.parent().removeClass("open")
			})
		};
	n.prototype = {
		constructor: n,
		toggle: function (t) {
			var n = e(this),
				s, o;
			if (n.is(".disabled, :disabled")) return;
			return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
		},
		keydown: function (t) {
			var n, r, s, o, u, a;
			if (!/(38|40|27)/.test(t.keyCode)) return;
			n = e(this), t.preventDefault(), t.stopPropagation();
			if (n.is(".disabled, :disabled")) return;
			o = i(n), u = o.hasClass("open");
			if (!u || u && t.keyCode == 27) return n.click();
			r = e("[role=menu] li:not(.divider) a", o);
			if (!r.length) return;
			a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
		}
	}, e.fn.dropdown = function (t) {
		return this.each(function () {
			var r = e(this),
				i = r.data("dropdown");
			i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
		})
	}, e.fn.dropdown.Constructor = n, e(document).on("click.dropdown.data-api touchstart.dropdown.data-api", r).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
		e.stopPropagation()
	}).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
	};
	t.prototype = {
		constructor: t,
		toggle: function () {
			return this[this.isShown ? "hide" : "show"]()
		},
		show: function () {
			var t = this,
				n = e.Event("show");
			this.$element.trigger(n);
			if (this.isShown || n.isDefaultPrevented()) return;
			this.isShown = !0, this.escape(), this.backdrop(function () {
				var n = e.support.transition && t.$element.hasClass("fade");
				t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
					t.$element.focus().trigger("shown")
				}) : t.$element.focus().trigger("shown")
			})
		},
		hide: function (t) {
			t && t.preventDefault();
			var n = this;
			t = e.Event("hide"), this.$element.trigger(t);
			if (!this.isShown || t.isDefaultPrevented()) return;
			this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
		},
		enforceFocus: function () {
			var t = this;
			e(document).on("focusin.modal", function (e) {
				t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
			})
		},
		escape: function () {
			var e = this;
			this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
				t.which == 27 && e.hide()
			}) : this.isShown || this.$element.off("keyup.dismiss.modal")
		},
		hideWithTransition: function () {
			var t = this,
				n = setTimeout(function () {
					t.$element.off(e.support.transition.end), t.hideModal()
				}, 500);
			this.$element.one(e.support.transition.end, function () {
				clearTimeout(n), t.hideModal()
			})
		},
		hideModal: function (e) {
			this.$element.hide().trigger("hidden"), this.backdrop()
		},
		removeBackdrop: function () {
			this.$backdrop.remove(), this.$backdrop = null
		},
		backdrop: function (t) {
			var n = this,
				r = this.$element.hasClass("fade") ? "fade" : "";
			if (this.isShown && this.options.backdrop) {
				var i = e.support.transition && r;
				this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
			} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
		}
	}, e.fn.modal = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("modal"),
				s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
			i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
		})
	}, e.fn.modal.defaults = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	}, e.fn.modal.Constructor = t, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
		var n = e(this),
			r = n.attr("href"),
			i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
			s = i.data("modal") ? "toggle" : e.extend({
				remote: !/#/.test(r) && r
			}, i.data(), n.data());
		t.preventDefault(), i.modal(s).one("hide", function () {
			n.focus()
		})
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (e, t) {
		this.init("tooltip", e, t)
	};
	t.prototype = {
		constructor: t,
		init: function (t, n, r) {
			var i, s;
			this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
				trigger: "manual",
				selector: ""
			}) : this.fixTitle()
		},
		getOptions: function (t) {
			return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
				show: t.delay,
				hide: t.delay
			}), t
		},
		enter: function (t) {
			var n = e(t.currentTarget)[this.type](this._options).data(this.type);
			if (!n.options.delay || !n.options.delay.show) return n.show();
			clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
				n.hoverState == "in" && n.show()
			}, n.options.delay.show)
		},
		leave: function (t) {
			var n = e(t.currentTarget)[this.type](this._options).data(this.type);
			this.timeout && clearTimeout(this.timeout);
			if (!n.options.delay || !n.options.delay.hide) return n.hide();
			n.hoverState = "out", this.timeout = setTimeout(function () {
				n.hoverState == "out" && n.hide()
			}, n.options.delay.hide)
		},
		show: function () {
			var e, t, n, r, i, s, o;
			if (this.hasContent() && this.enabled) {
				e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.detach().css({
					top: 0,
					left: 0,
					display: "block"
				}).insertAfter(this.$element), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
				switch (t ? s.split(" ")[1] : s) {
				case "bottom":
					o = {
						top: n.top + n.height,
						left: n.left + n.width / 2 - r / 2
					};
					break;
				case "top":
					o = {
						top: n.top - i,
						left: n.left + n.width / 2 - r / 2
					};
					break;
				case "left":
					o = {
						top: n.top + n.height / 2 - i / 2,
						left: n.left - r
					};
					break;
				case "right":
					o = {
						top: n.top + n.height / 2 - i / 2,
						left: n.left + n.width
					}
				}
				e.offset(o).addClass(s).addClass("in")
			}
		},
		setContent: function () {
			var e = this.tip(),
				t = this.getTitle();
			e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
		},
		hide: function () {
			function r() {
				var t = setTimeout(function () {
					n.off(e.support.transition.end).detach()
				}, 500);
				n.one(e.support.transition.end, function () {
					clearTimeout(t), n.detach()
				})
			}
			var t = this,
				n = this.tip();
			return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.detach(), this
		},
		fixTitle: function () {
			var e = this.$element;
			(e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
		},
		hasContent: function () {
			return this.getTitle()
		},
		getPosition: function (t) {
			return e.extend({}, t ? {
				top: 0,
				left: 0
			} : this.$element.offset(), {
				width: this.$element[0].offsetWidth,
				height: this.$element[0].offsetHeight
			})
		},
		getTitle: function () {
			var e, t = this.$element,
				n = this.options;
			return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
		},
		tip: function () {
			return this.$tip = this.$tip || e(this.options.template)
		},
		validate: function () {
			this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
		},
		enable: function () {
			this.enabled = !0
		},
		disable: function () {
			this.enabled = !1
		},
		toggleEnabled: function () {
			this.enabled = !this.enabled
		},
		toggle: function (t) {
			var n = e(t.currentTarget)[this.type](this._options).data(this.type);
			n[n.tip().hasClass("in") ? "hide" : "show"]()
		},
		destroy: function () {
			this.hide().$element.off("." + this.type).removeData(this.type)
		}
	}, e.fn.tooltip = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("tooltip"),
				s = typeof n == "object" && n;
			i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover",
		title: "",
		delay: 0,
		html: !1
	}
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (e, t) {
		this.init("popover", e, t)
	};
	t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
		constructor: t,
		setContent: function () {
			var e = this.tip(),
				t = this.getTitle(),
				n = this.getContent();
			e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
		},
		hasContent: function () {
			return this.getTitle() || this.getContent()
		},
		getContent: function () {
			var e, t = this.$element,
				n = this.options;
			return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
		},
		tip: function () {
			return this.$tip || (this.$tip = e(this.options.template)), this.$tip
		},
		destroy: function () {
			this.hide().$element.off("." + this.type).removeData(this.type)
		}
	}), e.fn.popover = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("popover"),
				s = typeof n == "object" && n;
			i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
	})
}(window.jQuery), !
function (e) {
	"use strict";

	function t(t, n) {
		var r = e.proxy(this.process, this),
			i = e(t).is("body") ? e(window) : e(t),
			s;
		this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
	}
	t.prototype = {
		constructor: t,
		refresh: function () {
			var t = this,
				n;
			this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
				var t = e(this),
					n = t.data("target") || t.attr("href"),
					r = /^#\w/.test(n) && e(n);
				return r && r.length && [
					[r.position().top, n]
				] || null
			}).sort(function (e, t) {
				return e[0] - t[0]
			}).each(function () {
				t.offsets.push(this[0]), t.targets.push(this[1])
			})
		},
		process: function () {
			var e = this.$scrollElement.scrollTop() + this.options.offset,
				t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
				n = t - this.$scrollElement.height(),
				r = this.offsets,
				i = this.targets,
				s = this.activeTarget,
				o;
			if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
			for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
		},
		activate: function (t) {
			var n, r;
			this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
		}
	}, e.fn.scrollspy = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("scrollspy"),
				s = typeof n == "object" && n;
			i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
		offset: 10
	}, e(window).on("load", function () {
		e('[data-spy="scroll"]').each(function () {
			var t = e(this);
			t.scrollspy(t.data())
		})
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t) {
		this.element = e(t)
	};
	t.prototype = {
		constructor: t,
		show: function () {
			var t = this.element,
				n = t.closest("ul:not(.dropdown-menu)"),
				r = t.attr("data-target"),
				i, s, o;
			r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
			if (t.parent("li").hasClass("active")) return;
			i = n.find(".active:last a")[0], o = e.Event("show", {
				relatedTarget: i
			}), t.trigger(o);
			if (o.isDefaultPrevented()) return;
			s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
				t.trigger({
					type: "shown",
					relatedTarget: i
				})
			})
		},
		activate: function (t, n, r) {
			function o() {
				i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
			}
			var i = n.find("> .active"),
				s = r && e.support.transition && i.hasClass("fade");
			s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
		}
	}, e.fn.tab = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("tab");
			i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
		})
	}, e.fn.tab.Constructor = t, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
		t.preventDefault(), e(this).tab("show")
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
	};
	t.prototype = {
		constructor: t,
		select: function () {
			var e = this.$menu.find(".active").attr("data-value");
			return this.$element.val(this.updater(e)).change(), this.hide()
		},
		updater: function (e) {
			return e
		},
		show: function () {
			var t = e.extend({}, this.$element.offset(), {
				height: this.$element[0].offsetHeight
			});
			return this.$menu.css({
				top: t.top + t.height,
				left: t.left
			}), this.$menu.show(), this.shown = !0, this
		},
		hide: function () {
			return this.$menu.hide(), this.shown = !1, this
		},
		lookup: function (t) {
			var n;
			return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
		},
		process: function (t) {
			var n = this;
			return t = e.grep(t, function (e) {
				return n.matcher(e)
			}), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
		},
		matcher: function (e) {
			return~e.toLowerCase().indexOf(this.query.toLowerCase())
		},
		sorter: function (e) {
			var t = [],
				n = [],
				r = [],
				i;
			while (i = e.shift()) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
			return t.concat(n, r)
		},
		highlighter: function (e) {
			var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
			return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
				return "<strong>" + t + "</strong>"
			})
		},
		render: function (t) {
			var n = this;
			return t = e(t).map(function (t, r) {
				return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
			}), t.first().addClass("active"), this.$menu.html(t), this
		},
		next: function (t) {
			var n = this.$menu.find(".active").removeClass("active"),
				r = n.next();
			r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
		},
		prev: function (e) {
			var t = this.$menu.find(".active").removeClass("active"),
				n = t.prev();
			n.length || (n = this.$menu.find("li").last()), n.addClass("active")
		},
		listen: function () {
			this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
		},
		eventSupported: function (e) {
			var t = e in this.$element;
			return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
		},
		move: function (e) {
			if (!this.shown) return;
			switch (e.keyCode) {
			case 9:
			case 13:
			case 27:
				e.preventDefault();
				break;
			case 38:
				e.preventDefault(), this.prev();
				break;
			case 40:
				e.preventDefault(), this.next()
			}
			e.stopPropagation()
		},
		keydown: function (t) {
			this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
		},
		keypress: function (e) {
			if (this.suppressKeyPressRepeat) return;
			this.move(e)
		},
		keyup: function (e) {
			switch (e.keyCode) {
			case 40:
			case 38:
			case 16:
			case 17:
			case 18:
				break;
			case 9:
			case 13:
				if (!this.shown) return;
				this.select();
				break;
			case 27:
				if (!this.shown) return;
				this.hide();
				break;
			default:
				this.lookup()
			}
			e.stopPropagation(), e.preventDefault()
		},
		blur: function (e) {
			var t = this;
			setTimeout(function () {
				t.hide()
			}, 150)
		},
		click: function (e) {
			e.stopPropagation(), e.preventDefault(), this.select()
		},
		mouseenter: function (t) {
			this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
		}
	}, e.fn.typeahead = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("typeahead"),
				s = typeof n == "object" && n;
			i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.typeahead.defaults = {
		source: [],
		items: 8,
		menu: '<ul class="typeahead dropdown-menu"></ul>',
		item: '<li><a href="#"></a></li>',
		minLength: 1
	}, e.fn.typeahead.Constructor = t, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
		var n = e(this);
		if (n.data("typeahead")) return;
		t.preventDefault(), n.typeahead(n.data())
	})
}(window.jQuery), !
function (e) {
	"use strict";
	var t = function (t, n) {
		this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
			setTimeout(e.proxy(this.checkPosition, this), 1)
		}, this)), this.$element = e(t), this.checkPosition()
	};
	t.prototype.checkPosition = function () {
		if (!this.$element.is(":visible")) return;
		var t = e(document).height(),
			n = this.$window.scrollTop(),
			r = this.$element.offset(),
			i = this.options.offset,
			s = i.bottom,
			o = i.top,
			u = "affix affix-top affix-bottom",
			a;
		typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
		if (this.affixed === a) return;
		this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
	}, e.fn.affix = function (n) {
		return this.each(function () {
			var r = e(this),
				i = r.data("affix"),
				s = typeof n == "object" && n;
			i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
		offset: 0
	}, e(window).on("load", function () {
		e('[data-spy="affix"]').each(function () {
			var t = e(this),
				n = t.data();
			n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
		})
	})
}(window.jQuery);
!
function ($) {
	var Datepicker = function (element, options) {
		this.element = $(element);
		this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || 'mm/dd/yyyy');
		this.picker = $(DPGlobal.template).appendTo('body').on({
			click: $.proxy(this.click, this)
		});
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		if (this.isInput) {
			this.element.on({
				focus: $.proxy(this.show, this),
				keyup: $.proxy(this.update, this)
			});
		} else {
			if (this.component) {
				this.component.on('click', $.proxy(this.show, this));
			} else {
				this.element.on('click', $.proxy(this.show, this));
			}
		}
		this.minViewMode = options.minViewMode || this.element.data('date-minviewmode') || 0;
		if (typeof this.minViewMode === 'string') {
			switch (this.minViewMode) {
			case 'months':
				this.minViewMode = 1;
				break;
			case 'years':
				this.minViewMode = 2;
				break;
			default:
				this.minViewMode = 0;
				break;
			}
		}
		this.viewMode = options.viewMode || this.element.data('date-viewmode') || 0;
		if (typeof this.viewMode === 'string') {
			switch (this.viewMode) {
			case 'months':
				this.viewMode = 1;
				break;
			case 'years':
				this.viewMode = 2;
				break;
			default:
				this.viewMode = 0;
				break;
			}
		}
		this.startViewMode = this.viewMode;
		this.weekStart = options.weekStart || this.element.data('date-weekstart') || 0;
		this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
		this.onRender = options.onRender;
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	};
	Datepicker.prototype = {
		constructor: Datepicker,
		show: function (e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e) {
				e.stopPropagation();
				e.preventDefault();
			}
			if (!this.isInput) {}
			var that = this;
			$(document).on('mousedown', function (ev) {
				if ($(ev.target).closest('.datepicker').length == 0) {
					that.hide();
				}
			});
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},
		hide: function () {
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = this.startViewMode;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},
		set: function () {
			var formated = DPGlobal.formatDate(this.date, this.format);
			if (!this.isInput) {
				if (this.component) {
					this.element.find('input').prop('value', formated);
				}
				this.element.data('date', formated);
			} else {
				this.element.prop('value', formated);
			}
		},
		setValue: function (newDate) {
			if (typeof newDate === 'string') {
				this.date = DPGlobal.parseDate(newDate, this.format);
			} else {
				this.date = new Date(newDate);
			}
			this.set();
			this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
			this.fill();
		},
		place: function () {
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},
		update: function (newDate) {
			this.date = DPGlobal.parseDate(typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')), this.format);
			this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
			this.fill();
		},
		fillDow: function () {
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">' + DPGlobal.dates.daysMin[(dowCnt++) % 7] + '</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},
		fillMonths: function () {
			var html = '';
			var i = 0
			while (i < 12) {
				html += '<span class="month">' + DPGlobal.dates.monthsShort[i++] + '</span>';
			}
			this.picker.find('.datepicker-months td').append(html);
		},
		fill: function () {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)').text(DPGlobal.dates.months[month] + ' ' + year);
			var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName, prevY, prevM;
			while (prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() === this.weekStart) {
					html.push('<tr>');
				}
				clsName = this.onRender(prevMonth);
				prevY = prevMonth.getFullYear();
				prevM = prevMonth.getMonth();
				if ((prevM < month && prevY === year) || prevY < year) {
					clsName += ' old';
				} else if ((prevM > month && prevY === year) || prevY > year) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() === currentDate) {
					clsName += ' active';
				}
				html.push('<td class="day ' + clsName + '">' + prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() === this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate() + 1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();
			var months = this.picker.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
			if (currentYear === year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			html = '';
			year = parseInt(year / 10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).end().find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + '">' + year + '</span>';
				year += 1;
			}
			yearCont.html(html);
		},
		click: function (e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length === 1) {
				switch (target[0].nodeName.toLowerCase()) {
				case 'th':
					switch (target[0].className) {
					case 'switch':
						this.showMode(1);
						break;
					case 'prev':
					case 'next':
						this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) + DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1));
						this.fill();
						this.set();
						break;
					}
					break;
				case 'span':
					if (target.is('.month')) {
						var month = target.parent().find('span').index(target);
						this.viewDate.setMonth(month);
					} else {
						var year = parseInt(target.text(), 10) || 0;
						this.viewDate.setFullYear(year);
					}
					if (this.viewMode !== 0) {
						this.date = new Date(this.viewDate);
						this.element.trigger({
							type: 'changeDate',
							date: this.date,
							viewMode: DPGlobal.modes[this.viewMode].clsName
						});
					}
					this.showMode(-1);
					this.fill();
					this.set();
					break;
				case 'td':
					if (target.is('.day') && !target.is('.disabled')) {
						var day = parseInt(target.text(), 10) || 1;
						var month = this.viewDate.getMonth();
						if (target.is('.old')) {
							month -= 1;
						} else if (target.is('.new')) {
							month += 1;
						}
						var year = this.viewDate.getFullYear();
						this.date = new Date(year, month, day, 0, 0, 0, 0);
						this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
						this.fill();
						this.set();
						this.element.trigger({
							type: 'changeDate',
							date: this.date,
							viewMode: DPGlobal.modes[this.viewMode].clsName
						});
					}
					break;
				}
			}
		},
		mousedown: function (e) {
			e.stopPropagation();
			e.preventDefault();
		},
		showMode: function (dir) {
			if (dir) {
				this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker.find('>div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
		}
	};
	$.fn.datepicker = function (option, val) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults, options))));
			}
			if (typeof option === 'string') data[option](val);
		});
	};
	$.fn.datepicker.defaults = {
		onRender: function (date) {
			return '';
		}
	};
	$.fn.datepicker.Constructor = Datepicker;
	var DPGlobal = {
		modes: [{
			clsName: 'days',
			navFnc: 'Month',
			navStep: 1
		},
		{
			clsName: 'months',
			navFnc: 'FullYear',
			navStep: 1
		},
		{
			clsName: 'years',
			navFnc: 'FullYear',
			navStep: 10
		}],
		dates: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		parseFormat: function (format) {
			var separator = format.match(/[.\/\-\s].*?/),
				parts = format.split(/\W+/);
			if (!separator || !parts || parts.length === 0) {
				throw new Error("Invalid date format.");
			}
			return {
				separator: separator,
				parts: parts
			};
		},
		parseDate: function (date, format) {
			var parts = date.split(format.separator),
				date = new Date(),
				val;
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			if (parts.length === format.parts.length) {
				var year = date.getFullYear(),
					day = date.getDate(),
					month = date.getMonth();
				for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10) || 1;
					switch (format.parts[i]) {
					case 'dd':
					case 'd':
						day = val;
						date.setDate(val);
						break;
					case 'mm':
					case 'm':
						month = val - 1;
						date.setMonth(val - 1);
						break;
					case 'yy':
						year = 2000 + val;
						date.setFullYear(2000 + val);
						break;
					case 'yyyy':
						year = val;
						date.setFullYear(val);
						break;
					}
				}
				date = new Date(year, month, day, 0, 0, 0);
			}
			return date;
		},
		formatDate: function (date, format) {
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		headTemplate: '<thead>' + '<tr>' + '<th class="prev">&lsaquo;</th>' + '<th colspan="5" class="switch"></th>' + '<th class="next">&rsaquo;</th>' + '</tr>' + '</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
	DPGlobal.template = '<div class="datepicker dropdown-menu">' + '<div class="datepicker-days">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + '</table>' + '</div>' + '</div>';
}(window.jQuery);
(function ($, window, document, undefined) {
	'use strict';
	var Timepicker = function (element, options) {
		this.widget = '';
		this.$element = $(element);
		this.defaultTime = options.defaultTime;
		this.disableFocus = options.disableFocus;
		this.disableMousewheel = options.disableMousewheel;
		this.isOpen = options.isOpen;
		this.minuteStep = options.minuteStep;
		this.modalBackdrop = options.modalBackdrop;
		this.orientation = options.orientation;
		this.secondStep = options.secondStep;
		this.showInputs = options.showInputs;
		this.showMeridian = options.showMeridian;
		this.showSeconds = options.showSeconds;
		this.template = options.template;
		this.appendWidgetTo = options.appendWidgetTo;
		this.showWidgetOnAddonClick = options.showWidgetOnAddonClick;
		this._init();
	};
	Timepicker.prototype = {
		constructor: Timepicker,
		_init: function () {
			var self = this;
			if (this.showWidgetOnAddonClick && (this.$element.parent().hasClass('input-append') || this.$element.parent().hasClass('input-prepend'))) {
				this.$element.parent('.input-append, .input-prepend').find('.add-on').on({
					'click.timepicker': $.proxy(this.showWidget, this)
				});
				this.$element.on({
					'focus.timepicker': $.proxy(this.highlightUnit, this),
					'click.timepicker': $.proxy(this.highlightUnit, this),
					'keydown.timepicker': $.proxy(this.elementKeydown, this),
					'blur.timepicker': $.proxy(this.blurElement, this),
					'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
				});
			} else {
				if (this.template) {
					this.$element.on({
						'focus.timepicker': $.proxy(this.showWidget, this),
						'click.timepicker': $.proxy(this.showWidget, this),
						'blur.timepicker': $.proxy(this.blurElement, this),
						'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
					});
				} else {
					this.$element.on({
						'focus.timepicker': $.proxy(this.highlightUnit, this),
						'click.timepicker': $.proxy(this.highlightUnit, this),
						'keydown.timepicker': $.proxy(this.elementKeydown, this),
						'blur.timepicker': $.proxy(this.blurElement, this),
						'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
					});
				}
			}
			if (this.template !== false) {
				this.$widget = $(this.getTemplate()).on('click', $.proxy(this.widgetClick, this));
			} else {
				this.$widget = false;
			}
			if (this.showInputs && this.$widget !== false) {
				this.$widget.find('input').each(function () {
					$(this).on({
						'click.timepicker': function () {
							$(this).select();
						},
						'keydown.timepicker': $.proxy(self.widgetKeydown, self),
						'keyup.timepicker': $.proxy(self.widgetKeyup, self)
					});
				});
			}
			this.setDefaultTime(this.defaultTime);
		},
		blurElement: function () {
			this.highlightedUnit = null;
			this.updateFromElementVal();
		},
		clear: function () {
			this.hour = '';
			this.minute = '';
			this.second = '';
			this.meridian = '';
			this.$element.val('');
		},
		decrementHour: function () {
			if (this.showMeridian) {
				if (this.hour === 1) {
					this.hour = 12;
				} else if (this.hour === 12) {
					this.hour--;
					return this.toggleMeridian();
				} else if (this.hour === 0) {
					this.hour = 11;
					return this.toggleMeridian();
				} else {
					this.hour--;
				}
			} else {
				if (this.hour <= 0) {
					this.hour = 23;
				} else {
					this.hour--;
				}
			}
		},
		decrementMinute: function (step) {
			var newVal;
			if (step) {
				newVal = this.minute - step;
			} else {
				newVal = this.minute - this.minuteStep;
			}
			if (newVal < 0) {
				this.decrementHour();
				this.minute = newVal + 60;
			} else {
				this.minute = newVal;
			}
		},
		decrementSecond: function () {
			var newVal = this.second - this.secondStep;
			if (newVal < 0) {
				this.decrementMinute(true);
				this.second = newVal + 60;
			} else {
				this.second = newVal;
			}
		},
		elementKeydown: function (e) {
			switch (e.keyCode) {
			case 9:
			case 27:
				this.updateFromElementVal();
				break;
			case 37:
				e.preventDefault();
				this.highlightPrevUnit();
				break;
			case 38:
				e.preventDefault();
				switch (this.highlightedUnit) {
				case 'hour':
					this.incrementHour();
					this.highlightHour();
					break;
				case 'minute':
					this.incrementMinute();
					this.highlightMinute();
					break;
				case 'second':
					this.incrementSecond();
					this.highlightSecond();
					break;
				case 'meridian':
					this.toggleMeridian();
					this.highlightMeridian();
					break;
				}
				this.update();
				break;
			case 39:
				e.preventDefault();
				this.highlightNextUnit();
				break;
			case 40:
				e.preventDefault();
				switch (this.highlightedUnit) {
				case 'hour':
					this.decrementHour();
					this.highlightHour();
					break;
				case 'minute':
					this.decrementMinute();
					this.highlightMinute();
					break;
				case 'second':
					this.decrementSecond();
					this.highlightSecond();
					break;
				case 'meridian':
					this.toggleMeridian();
					this.highlightMeridian();
					break;
				}
				this.update();
				break;
			}
		},
		getCursorPosition: function () {
			var input = this.$element.get(0);
			if ('selectionStart' in input) {
				return input.selectionStart;
			} else if (document.selection) {
				input.focus();
				var sel = document.selection.createRange(),
					selLen = document.selection.createRange().text.length;
				sel.moveStart('character', -input.value.length);
				return sel.text.length - selLen;
			}
		},
		getTemplate: function () {
			var template, hourTemplate, minuteTemplate, secondTemplate, meridianTemplate, templateContent;
			if (this.showInputs) {
				hourTemplate = '<input type="text" class="form-control bootstrap-timepicker-hour" maxlength="2"/>';
				minuteTemplate = '<input type="text" class="form-control bootstrap-timepicker-minute" maxlength="2"/>';
				secondTemplate = '<input type="text" class="form-control bootstrap-timepicker-second" maxlength="2"/>';
				meridianTemplate = '<input type="text" class="form-control bootstrap-timepicker-meridian" maxlength="2"/>';
			} else {
				hourTemplate = '<span class="bootstrap-timepicker-hour"></span>';
				minuteTemplate = '<span class="bootstrap-timepicker-minute"></span>';
				secondTemplate = '<span class="bootstrap-timepicker-second"></span>';
				meridianTemplate = '<span class="bootstrap-timepicker-meridian"></span>';
			}
			templateContent = '<table>' + '<tr>' + '<td><a href="#" data-action="incrementHour"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' + '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="incrementMinute"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="incrementSecond"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : '') + '</tr>' + '<tr>' + '<td>' + hourTemplate + '</td> ' + '<td class="separator">:</td>' + '<td>' + minuteTemplate + '</td> ' + (this.showSeconds ? '<td class="separator">:</td>' + '<td>' + secondTemplate + '</td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td>' + meridianTemplate + '</td>' : '') + '</tr>' + '<tr>' + '<td><a href="#" data-action="decrementHour"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" data-action="decrementMinute"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="decrementSecond"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : '') + (this.showMeridian ? '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : '') + '</tr>' + '</table>';
			switch (this.template) {
			case 'modal':
				template = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? 'true' : 'false') + '">' + '<div class="modal-header">' + '<a href="#" class="close" data-dismiss="modal">Ã—</a>' + '<h3>Pick a Time</h3>' + '</div>' + '<div class="modal-content">' + templateContent + '</div>' + '<div class="modal-footer">' + '<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>' + '</div>' + '</div>';
				break;
			case 'dropdown':
				template = '<div class="bootstrap-timepicker-widget dropdown-menu">' + templateContent + '</div>';
				break;
			}
			return template;
		},
		getTime: function () {
			if (this.hour === '') {
				return '';
			}
			return this.hour + ':' + (this.minute.toString().length === 1 ? '0' + this.minute : this.minute) + (this.showSeconds ? ':' + (this.second.toString().length === 1 ? '0' + this.second : this.second) : '') + (this.showMeridian ? ' ' + this.meridian : '');
		},
		hideWidget: function () {
			if (this.isOpen === false) {
				return;
			}
			this.$element.trigger({
				'type': 'hide.timepicker',
				'time': {
					'value': this.getTime(),
					'hours': this.hour,
					'minutes': this.minute,
					'seconds': this.second,
					'meridian': this.meridian
				}
			});
			if (this.template === 'modal' && this.$widget.modal) {
				this.$widget.modal('hide');
			} else {
				this.$widget.removeClass('open');
			}
			$(document).off('mousedown.timepicker, touchend.timepicker');
			this.isOpen = false;
			this.$widget.detach();
		},
		highlightUnit: function () {
			this.position = this.getCursorPosition();
			if (this.position >= 0 && this.position <= 2) {
				this.highlightHour();
			} else if (this.position >= 3 && this.position <= 5) {
				this.highlightMinute();
			} else if (this.position >= 6 && this.position <= 8) {
				if (this.showSeconds) {
					this.highlightSecond();
				} else {
					this.highlightMeridian();
				}
			} else if (this.position >= 9 && this.position <= 11) {
				this.highlightMeridian();
			}
		},
		highlightNextUnit: function () {
			switch (this.highlightedUnit) {
			case 'hour':
				this.highlightMinute();
				break;
			case 'minute':
				if (this.showSeconds) {
					this.highlightSecond();
				} else if (this.showMeridian) {
					this.highlightMeridian();
				} else {
					this.highlightHour();
				}
				break;
			case 'second':
				if (this.showMeridian) {
					this.highlightMeridian();
				} else {
					this.highlightHour();
				}
				break;
			case 'meridian':
				this.highlightHour();
				break;
			}
		},
		highlightPrevUnit: function () {
			switch (this.highlightedUnit) {
			case 'hour':
				if (this.showMeridian) {
					this.highlightMeridian();
				} else if (this.showSeconds) {
					this.highlightSecond();
				} else {
					this.highlightMinute();
				}
				break;
			case 'minute':
				this.highlightHour();
				break;
			case 'second':
				this.highlightMinute();
				break;
			case 'meridian':
				if (this.showSeconds) {
					this.highlightSecond();
				} else {
					this.highlightMinute();
				}
				break;
			}
		},
		highlightHour: function () {
			var $element = this.$element.get(0),
				self = this;
			this.highlightedUnit = 'hour';
			if ($element.setSelectionRange) {
				setTimeout(function () {
					if (self.hour < 10) {
						$element.setSelectionRange(0, 1);
					} else {
						$element.setSelectionRange(0, 2);
					}
				}, 0);
			}
		},
		highlightMinute: function () {
			var $element = this.$element.get(0),
				self = this;
			this.highlightedUnit = 'minute';
			if ($element.setSelectionRange) {
				setTimeout(function () {
					if (self.hour < 10) {
						$element.setSelectionRange(2, 4);
					} else {
						$element.setSelectionRange(3, 5);
					}
				}, 0);
			}
		},
		highlightSecond: function () {
			var $element = this.$element.get(0),
				self = this;
			this.highlightedUnit = 'second';
			if ($element.setSelectionRange) {
				setTimeout(function () {
					if (self.hour < 10) {
						$element.setSelectionRange(5, 7);
					} else {
						$element.setSelectionRange(6, 8);
					}
				}, 0);
			}
		},
		highlightMeridian: function () {
			var $element = this.$element.get(0),
				self = this;
			this.highlightedUnit = 'meridian';
			if ($element.setSelectionRange) {
				if (this.showSeconds) {
					setTimeout(function () {
						if (self.hour < 10) {
							$element.setSelectionRange(8, 10);
						} else {
							$element.setSelectionRange(9, 11);
						}
					}, 0);
				} else {
					setTimeout(function () {
						if (self.hour < 10) {
							$element.setSelectionRange(5, 7);
						} else {
							$element.setSelectionRange(6, 8);
						}
					}, 0);
				}
			}
		},
		incrementHour: function () {
			if (this.showMeridian) {
				if (this.hour === 11) {
					this.hour++;
					return this.toggleMeridian();
				} else if (this.hour === 12) {
					this.hour = 0;
				}
			}
			if (this.hour === 23) {
				this.hour = 0;
				return;
			}
			this.hour++;
		},
		incrementMinute: function (step) {
			var newVal;
			if (step) {
				newVal = this.minute + step;
			} else {
				newVal = this.minute + this.minuteStep - (this.minute % this.minuteStep);
			}
			if (newVal > 59) {
				this.incrementHour();
				this.minute = newVal - 60;
			} else {
				this.minute = newVal;
			}
		},
		incrementSecond: function () {
			var newVal = this.second + this.secondStep - (this.second % this.secondStep);
			if (newVal > 59) {
				this.incrementMinute(true);
				this.second = newVal - 60;
			} else {
				this.second = newVal;
			}
		},
		mousewheel: function (e) {
			if (this.disableMousewheel) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail,
				scrollTo = null;
			if (e.type === 'mousewheel') {
				scrollTo = (e.originalEvent.wheelDelta * -1);
			}
			else if (e.type === 'DOMMouseScroll') {
				scrollTo = 40 * e.originalEvent.detail;
			}
			if (scrollTo) {
				e.preventDefault();
				$(this).scrollTop(scrollTo + $(this).scrollTop());
			}
			switch (this.highlightedUnit) {
			case 'minute':
				if (delta > 0) {
					this.incrementMinute();
				} else {
					this.decrementMinute();
				}
				this.highlightMinute();
				break;
			case 'second':
				if (delta > 0) {
					this.incrementSecond();
				} else {
					this.decrementSecond();
				}
				this.highlightSecond();
				break;
			case 'meridian':
				this.toggleMeridian();
				this.highlightMeridian();
				break;
			default:
				if (delta > 0) {
					this.incrementHour();
				} else {
					this.decrementHour();
				}
				this.highlightHour();
				break;
			}
			return false;
		},
		place: function () {
			if (this.isInline) {
				return;
			}
			var widgetWidth = this.$widget.outerWidth(),
				widgetHeight = this.$widget.outerHeight(),
				visualPadding = 10,
				windowWidth = $(window).width(),
				windowHeight = $(window).height(),
				scrollTop = $(window).scrollTop();
			var zIndex = parseInt(this.$element.parents().filter(function () {}).first().css('z-index'), 10) + 10;
			var offset = this.component ? this.component.parent().offset() : this.$element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.$element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.$element.outerWidth(false);
			var left = offset.left,
				top = offset.top;
			this.$widget.removeClass('timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left');
			if (this.orientation.x !== 'auto') {
				this.picker.addClass('datepicker-orient-' + this.orientation.x);
				if (this.orientation.x === 'right') {
					left -= widgetWidth - width;
				}
			} else {
				this.$widget.addClass('timepicker-orient-left');
				if (offset.left < 0) {
					left -= offset.left - visualPadding;
				} else if (offset.left + widgetWidth > windowWidth) {
					left = windowWidth - widgetWidth - visualPadding;
				}
			}
			var yorient = this.orientation.y,
				topOverflow, bottomOverflow;
			if (yorient === 'auto') {
				topOverflow = -scrollTop + offset.top - widgetHeight;
				bottomOverflow = scrollTop + windowHeight - (offset.top + height + widgetHeight);
				if (Math.max(topOverflow, bottomOverflow) === bottomOverflow) {
					yorient = 'top';
				} else {
					yorient = 'bottom';
				}
			}
			this.$widget.addClass('timepicker-orient-' + yorient);
			if (yorient === 'top') {
				top += height;
			} else {
				top -= widgetHeight + parseInt(this.$widget.css('padding-top'), 10);
			}
			this.$widget.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},
		remove: function () {
			$('document').off('.timepicker');
			if (this.$widget) {
				this.$widget.remove();
			}
			delete this.$element.data().timepicker;
		},
		setDefaultTime: function (defaultTime) {
			if (!this.$element.val()) {
				if (defaultTime === 'current') {
					var dTime = new Date(),
						hours = dTime.getHours(),
						minutes = dTime.getMinutes(),
						seconds = dTime.getSeconds(),
						meridian = 'AM';
					if (seconds !== 0) {
						seconds = Math.ceil(dTime.getSeconds() / this.secondStep) * this.secondStep;
						if (seconds === 60) {
							minutes += 1;
							seconds = 0;
						}
					}
					if (minutes !== 0) {
						minutes = Math.ceil(dTime.getMinutes() / this.minuteStep) * this.minuteStep;
						if (minutes === 60) {
							hours += 1;
							minutes = 0;
						}
					}
					if (this.showMeridian) {
						if (hours === 0) {
							hours = 12;
						} else if (hours >= 12) {
							if (hours > 12) {
								hours = hours - 12;
							}
							meridian = 'PM';
						} else {
							meridian = 'AM';
						}
					}
					this.hour = hours;
					this.minute = minutes;
					this.second = seconds;
					this.meridian = meridian;
					this.update();
				} else if (defaultTime === false) {
					this.hour = 0;
					this.minute = 0;
					this.second = 0;
					this.meridian = 'AM';
				} else {
					this.setTime(defaultTime);
				}
			} else {
				this.updateFromElementVal();
			}
		},
		setTime: function (time, ignoreWidget) {
			if (!time) {
				this.clear();
				return;
			}
			var timeArray, hour, minute, second, meridian;
			if (typeof time === 'object' && time.getMonth) {
				hour = time.getHours();
				minute = time.getMinutes();
				second = time.getSeconds();
				if (this.showMeridian) {
					meridian = 'AM';
					if (hour > 12) {
						meridian = 'PM';
						hour = hour % 12;
					}
					if (hour === 12) {
						meridian = 'PM';
					}
				}
			} else {
				if (time.match(/p/i) !== null) {
					meridian = 'PM';
				} else {
					meridian = 'AM';
				}
				time = time.replace(/[^0-9\:]/g, '');
				timeArray = time.split(':');
				hour = timeArray[0] ? timeArray[0].toString() : timeArray.toString();
				minute = timeArray[1] ? timeArray[1].toString() : '';
				second = timeArray[2] ? timeArray[2].toString() : '';
				if (hour.length > 4) {
					second = hour.substr(4, 2);
				}
				if (hour.length > 2) {
					minute = hour.substr(2, 2);
					hour = hour.substr(0, 2);
				}
				if (minute.length > 2) {
					second = minute.substr(2, 2);
					minute = minute.substr(0, 2);
				}
				if (second.length > 2) {
					second = second.substr(2, 2);
				}
				hour = parseInt(hour, 10);
				minute = parseInt(minute, 10);
				second = parseInt(second, 10);
				if (isNaN(hour)) {
					hour = 0;
				}
				if (isNaN(minute)) {
					minute = 0;
				}
				if (isNaN(second)) {
					second = 0;
				}
				if (this.showMeridian) {
					if (hour < 1) {
						hour = 1;
					} else if (hour > 12) {
						hour = 12;
					}
				} else {
					if (hour >= 24) {
						hour = 23;
					} else if (hour < 0) {
						hour = 0;
					}
					if (hour < 13 && meridian === 'PM') {
						hour = hour + 12;
					}
				}
				if (minute < 0) {
					minute = 0;
				} else if (minute >= 60) {
					minute = 59;
				}
				if (this.showSeconds) {
					if (isNaN(second)) {
						second = 0;
					} else if (second < 0) {
						second = 0;
					} else if (second >= 60) {
						second = 59;
					}
				}
			}
			this.hour = hour;
			this.minute = minute;
			this.second = second;
			this.meridian = meridian;
			this.update(ignoreWidget);
		},
		showWidget: function () {
			if (this.isOpen) {
				return;
			}
			if (this.$element.is(':disabled')) {
				return;
			}
			this.$widget.appendTo(this.appendWidgetTo);
			var self = this;
			$(document).on('mousedown.timepicker, touchend.timepicker', function (e) {
				if (!(self.$element.parent().find(e.target).length || self.$widget.is(e.target) || self.$widget.find(e.target).length)) {
					self.hideWidget();
				}
			});
			this.$element.trigger({
				'type': 'show.timepicker',
				'time': {
					'value': this.getTime(),
					'hours': this.hour,
					'minutes': this.minute,
					'seconds': this.second,
					'meridian': this.meridian
				}
			});
			this.place();
			if (this.disableFocus) {
				this.$element.blur();
			}
			if (this.hour === '') {
				if (this.defaultTime) {
					this.setDefaultTime(this.defaultTime);
				} else {
					this.setTime('0:0:0');
				}
			}
			if (this.template === 'modal' && this.$widget.modal) {
				this.$widget.modal('show').on('hidden', $.proxy(this.hideWidget, this));
			} else {
				if (this.isOpen === false) {
					this.$widget.addClass('open');
				}
			}
			this.isOpen = true;
		},
		toggleMeridian: function () {
			this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';
		},
		update: function (ignoreWidget) {
			this.updateElement();
			if (!ignoreWidget) {
				this.updateWidget();
			}
			this.$element.trigger({
				'type': 'changeTime.timepicker',
				'time': {
					'value': this.getTime(),
					'hours': this.hour,
					'minutes': this.minute,
					'seconds': this.second,
					'meridian': this.meridian
				}
			});
		},
		updateElement: function () {
			this.$element.val(this.getTime()).change();
		},
		updateFromElementVal: function () {
			this.setTime(this.$element.val());
		},
		updateWidget: function () {
			if (this.$widget === false) {
				return;
			}
			var hour = this.hour,
				minute = this.minute.toString().length === 1 ? '0' + this.minute : this.minute,
				second = this.second.toString().length === 1 ? '0' + this.second : this.second;
			if (this.showInputs) {
				this.$widget.find('input.bootstrap-timepicker-hour').val(hour);
				this.$widget.find('input.bootstrap-timepicker-minute').val(minute);
				if (this.showSeconds) {
					this.$widget.find('input.bootstrap-timepicker-second').val(second);
				}
				if (this.showMeridian) {
					this.$widget.find('input.bootstrap-timepicker-meridian').val(this.meridian);
				}
			} else {
				this.$widget.find('span.bootstrap-timepicker-hour').text(hour);
				this.$widget.find('span.bootstrap-timepicker-minute').text(minute);
				if (this.showSeconds) {
					this.$widget.find('span.bootstrap-timepicker-second').text(second);
				}
				if (this.showMeridian) {
					this.$widget.find('span.bootstrap-timepicker-meridian').text(this.meridian);
				}
			}
		},
		updateFromWidgetInputs: function () {
			if (this.$widget === false) {
				return;
			}
			var t = this.$widget.find('input.bootstrap-timepicker-hour').val() + ':' + this.$widget.find('input.bootstrap-timepicker-minute').val() + (this.showSeconds ? ':' + this.$widget.find('input.bootstrap-timepicker-second').val() : '') + (this.showMeridian ? this.$widget.find('input.bootstrap-timepicker-meridian').val() : '');
			this.setTime(t, true);
		},
		widgetClick: function (e) {
			e.stopPropagation();
			e.preventDefault();
			var $input = $(e.target),
				action = $input.closest('a').data('action');
			if (action) {
				this[action]();
			}
			this.update();
			if ($input.is('input')) {
				$input.get(0).setSelectionRange(0, 2);
			}
		},
		widgetKeydown: function (e) {
			var $input = $(e.target),
				name = $input.attr('class').replace('bootstrap-timepicker-', '');
			switch (e.keyCode) {
			case 9:
				if ((this.showMeridian && name === 'meridian') || (this.showSeconds && name === 'second') || (!this.showMeridian && !this.showSeconds && name === 'minute')) {
					return this.hideWidget();
				}
				break;
			case 27:
				this.hideWidget();
				break;
			case 38:
				e.preventDefault();
				switch (name) {
				case 'hour':
					this.incrementHour();
					break;
				case 'minute':
					this.incrementMinute();
					break;
				case 'second':
					this.incrementSecond();
					break;
				case 'meridian':
					this.toggleMeridian();
					break;
				}
				this.setTime(this.getTime());
				$input.get(0).setSelectionRange(0, 2);
				break;
			case 40:
				e.preventDefault();
				switch (name) {
				case 'hour':
					this.decrementHour();
					break;
				case 'minute':
					this.decrementMinute();
					break;
				case 'second':
					this.decrementSecond();
					break;
				case 'meridian':
					this.toggleMeridian();
					break;
				}
				this.setTime(this.getTime());
				$input.get(0).setSelectionRange(0, 2);
				break;
			}
		},
		widgetKeyup: function (e) {
			if ((e.keyCode === 65) || (e.keyCode === 77) || (e.keyCode === 80) || (e.keyCode === 46) || (e.keyCode === 8) || (e.keyCode >= 46 && e.keyCode <= 57)) {
				this.updateFromWidgetInputs();
			}
		}
	};
	$.fn.timepicker = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('timepicker'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('timepicker', (data = new Timepicker(this, $.extend({}, $.fn.timepicker.defaults, options, $(this).data()))));
			}
			if (typeof option === 'string') {
				data[option].apply(data, args);
			}
		});
	};
	$.fn.timepicker.defaults = {
		defaultTime: 'current',
		disableFocus: false,
		disableMousewheel: false,
		isOpen: false,
		minuteStep: 15,
		modalBackdrop: false,
		orientation: {
			x: 'auto',
			y: 'auto'
		},
		secondStep: 15,
		showSeconds: false,
		showInputs: true,
		showMeridian: true,
		template: 'dropdown',
		appendWidgetTo: 'body',
		showWidgetOnAddonClick: true
	};
	$.fn.timepicker.Constructor = Timepicker;
})(jQuery, window, document);
var swfobject = function () {
	var D = "undefined",
		r = "object",
		S = "Shockwave Flash",
		W = "ShockwaveFlash.ShockwaveFlash",
		q = "application/x-shockwave-flash",
		R = "SWFObjectExprInst",
		x = "onreadystatechange",
		O = window,
		j = document,
		t = navigator,
		T = false,
		U = [h],
		o = [],
		N = [],
		I = [],
		l, Q, E, B, J = false,
		a = false,
		n, G, m = true,
		M = function () {
			var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
				ah = t.userAgent.toLowerCase(),
				Y = t.platform.toLowerCase(),
				ae = Y ? /win/.test(Y) : /win/.test(ah),
				ac = Y ? /mac/.test(Y) : /mac/.test(ah),
				af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
				X = !+"\v1",
				ag = [0, 0, 0],
				ab = null;
			if (typeof t.plugins != D && typeof t.plugins[S] == r) {
				ab = t.plugins[S].description;
				if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
					T = true;
					X = false;
					ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
					ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
					ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
				}
			} else {
				if (typeof O.ActiveXObject != D) {
					try {
						var ad = new ActiveXObject(W);
						if (ad) {
							ab = ad.GetVariable("$version");
							if (ab) {
								X = true;
								ab = ab.split(" ")[1].split(",");
								ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
							}
						}
					} catch (Z) {}
				}
			}
			return {
				w3: aa,
				pv: ag,
				wk: af,
				ie: X,
				win: ae,
				mac: ac
			}
		}(),
		k = function () {
			if (!M.w3) {
				return
			}
			if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
				f()
			}
			if (!J) {
				if (typeof j.addEventListener != D) {
					j.addEventListener("DOMContentLoaded", f, false)
				}
				if (M.ie && M.win) {
					j.attachEvent(x, function () {
						if (j.readyState == "complete") {
							j.detachEvent(x, arguments.callee);
							f()
						}
					});
					if (O == top) {
						(function () {
							if (J) {
								return
							}
							try {
								j.documentElement.doScroll("left")
							} catch (X) {
								setTimeout(arguments.callee, 0);
								return
							}
							f()
						})()
					}
				}
				if (M.wk) {
					(function () {
						if (J) {
							return
						}
						if (!/loaded|complete/.test(j.readyState)) {
							setTimeout(arguments.callee, 0);
							return
						}
						f()
					})()
				}
				s(f)
			}
		}();

	function f() {
		if (J) {
			return
		}
		try {
			var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
			Z.parentNode.removeChild(Z)
		} catch (aa) {
			return
		}
		J = true;
		var X = U.length;
		for (var Y = 0; Y < X; Y++) {
			U[Y]()
		}
	}
	function K(X) {
		if (J) {
			X()
		} else {
			U[U.length] = X
		}
	}
	function s(Y) {
		if (typeof O.addEventListener != D) {
			O.addEventListener("load", Y, false)
		} else {
			if (typeof j.addEventListener != D) {
				j.addEventListener("load", Y, false)
			} else {
				if (typeof O.attachEvent != D) {
					i(O, "onload", Y)
				} else {
					if (typeof O.onload == "function") {
						var X = O.onload;
						O.onload = function () {
							X();
							Y()
						}
					} else {
						O.onload = Y
					}
				}
			}
		}
	}
	function h() {
		if (T) {
			V()
		} else {
			H()
		}
	}
	function V() {
		var X = j.getElementsByTagName("body")[0];
		var aa = C(r);
		aa.setAttribute("type", q);
		var Z = X.appendChild(aa);
		if (Z) {
			var Y = 0;
			(function () {
				if (typeof Z.GetVariable != D) {
					var ab = Z.GetVariable("$version");
					if (ab) {
						ab = ab.split(" ")[1].split(",");
						M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
					}
				} else {
					if (Y < 10) {
						Y++;
						setTimeout(arguments.callee, 10);
						return
					}
				}
				X.removeChild(aa);
				Z = null;
				H()
			})()
		} else {
			H()
		}
	}
	function H() {
		var ag = o.length;
		if (ag > 0) {
			for (var af = 0; af < ag; af++) {
				var Y = o[af].id;
				var ab = o[af].callbackFn;
				var aa = {
					success: false,
					id: Y
				};
				if (M.pv[0] > 0) {
					var ae = c(Y);
					if (ae) {
						if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
							w(Y, true);
							if (ab) {
								aa.success = true;
								aa.ref = z(Y);
								ab(aa)
							}
						} else {
							if (o[af].expressInstall && A()) {
								var ai = {};
								ai.data = o[af].expressInstall;
								ai.width = ae.getAttribute("width") || "0";
								ai.height = ae.getAttribute("height") || "0";
								if (ae.getAttribute("class")) {
									ai.styleclass = ae.getAttribute("class")
								}
								if (ae.getAttribute("align")) {
									ai.align = ae.getAttribute("align")
								}
								var ah = {};
								var X = ae.getElementsByTagName("param");
								var ac = X.length;
								for (var ad = 0; ad < ac; ad++) {
									if (X[ad].getAttribute("name").toLowerCase() != "movie") {
										ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
									}
								}
								P(ai, ah, Y, ab)
							} else {
								p(ae);
								if (ab) {
									ab(aa)
								}
							}
						}
					}
				} else {
					w(Y, true);
					if (ab) {
						var Z = z(Y);
						if (Z && typeof Z.SetVariable != D) {
							aa.success = true;
							aa.ref = Z
						}
						ab(aa)
					}
				}
			}
		}
	}
	function z(aa) {
		var X = null;
		var Y = c(aa);
		if (Y && Y.nodeName == "OBJECT") {
			if (typeof Y.SetVariable != D) {
				X = Y
			} else {
				var Z = Y.getElementsByTagName(r)[0];
				if (Z) {
					X = Z
				}
			}
		}
		return X
	}
	function A() {
		return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
	}
	function P(aa, ab, X, Z) {
		a = true;
		E = Z || null;
		B = {
			success: false,
			id: X
		};
		var ae = c(X);
		if (ae) {
			if (ae.nodeName == "OBJECT") {
				l = g(ae);
				Q = null
			} else {
				l = ae;
				Q = X
			}
			aa.id = R;
			if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
				aa.width = "310"
			}
			if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
				aa.height = "137"
			}
			j.title = j.title.slice(0, 47) + " - Flash Player Installation";
			var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
				ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
			if (typeof ab.flashvars != D) {
				ab.flashvars += "&" + ac
			} else {
				ab.flashvars = ac
			}
			if (M.ie && M.win && ae.readyState != 4) {
				var Y = C("div");
				X += "SWFObjectNew";
				Y.setAttribute("id", X);
				ae.parentNode.insertBefore(Y, ae);
				ae.style.display = "none";
				(function () {
					if (ae.readyState == 4) {
						ae.parentNode.removeChild(ae)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			}
			u(aa, ab, X)
		}
	}
	function p(Y) {
		if (M.ie && M.win && Y.readyState != 4) {
			var X = C("div");
			Y.parentNode.insertBefore(X, Y);
			X.parentNode.replaceChild(g(Y), X);
			Y.style.display = "none";
			(function () {
				if (Y.readyState == 4) {
					Y.parentNode.removeChild(Y)
				} else {
					setTimeout(arguments.callee, 10)
				}
			})()
		} else {
			Y.parentNode.replaceChild(g(Y), Y)
		}
	}
	function g(ab) {
		var aa = C("div");
		if (M.win && M.ie) {
			aa.innerHTML = ab.innerHTML
		} else {
			var Y = ab.getElementsByTagName(r)[0];
			if (Y) {
				var ad = Y.childNodes;
				if (ad) {
					var X = ad.length;
					for (var Z = 0; Z < X; Z++) {
						if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
							aa.appendChild(ad[Z].cloneNode(true))
						}
					}
				}
			}
		}
		return aa
	}
	function u(ai, ag, Y) {
		var X, aa = c(Y);
		if (M.wk && M.wk < 312) {
			return X
		}
		if (aa) {
			if (typeof ai.id == D) {
				ai.id = Y
			}
			if (M.ie && M.win) {
				var ah = "";
				for (var ae in ai) {
					if (ai[ae] != Object.prototype[ae]) {
						if (ae.toLowerCase() == "data") {
							ag.movie = ai[ae]
						} else {
							if (ae.toLowerCase() == "styleclass") {
								ah += ' class="' + ai[ae] + '"'
							} else {
								if (ae.toLowerCase() != "classid") {
									ah += " " + ae + '="' + ai[ae] + '"'
								}
							}
						}
					}
				}
				var af = "";
				for (var ad in ag) {
					if (ag[ad] != Object.prototype[ad]) {
						af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
					}
				}
				aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
				N[N.length] = ai.id;
				X = c(ai.id)
			} else {
				var Z = C(r);
				Z.setAttribute("type", q);
				for (var ac in ai) {
					if (ai[ac] != Object.prototype[ac]) {
						if (ac.toLowerCase() == "styleclass") {
							Z.setAttribute("class", ai[ac])
						} else {
							if (ac.toLowerCase() != "classid") {
								Z.setAttribute(ac, ai[ac])
							}
						}
					}
				}
				for (var ab in ag) {
					if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
						e(Z, ab, ag[ab])
					}
				}
				aa.parentNode.replaceChild(Z, aa);
				X = Z
			}
		}
		return X
	}
	function e(Z, X, Y) {
		var aa = C("param");
		aa.setAttribute("name", X);
		aa.setAttribute("value", Y);
		Z.appendChild(aa)
	}
	function y(Y) {
		var X = c(Y);
		if (X && X.nodeName == "OBJECT") {
			if (M.ie && M.win) {
				X.style.display = "none";
				(function () {
					if (X.readyState == 4) {
						b(Y)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			} else {
				X.parentNode.removeChild(X)
			}
		}
	}
	function b(Z) {
		var Y = c(Z);
		if (Y) {
			for (var X in Y) {
				if (typeof Y[X] == "function") {
					Y[X] = null
				}
			}
			Y.parentNode.removeChild(Y)
		}
	}
	function c(Z) {
		var X = null;
		try {
			X = j.getElementById(Z)
		} catch (Y) {}
		return X
	}
	function C(X) {
		return j.createElement(X)
	}
	function i(Z, X, Y) {
		Z.attachEvent(X, Y);
		I[I.length] = [Z, X, Y]
	}
	function F(Z) {
		var Y = M.pv,
			X = Z.split(".");
		X[0] = parseInt(X[0], 10);
		X[1] = parseInt(X[1], 10) || 0;
		X[2] = parseInt(X[2], 10) || 0;
		return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
	}
	function v(ac, Y, ad, ab) {
		if (M.ie && M.mac) {
			return
		}
		var aa = j.getElementsByTagName("head")[0];
		if (!aa) {
			return
		}
		var X = (ad && typeof ad == "string") ? ad : "screen";
		if (ab) {
			n = null;
			G = null
		}
		if (!n || G != X) {
			var Z = C("style");
			Z.setAttribute("type", "text/css");
			Z.setAttribute("media", X);
			n = aa.appendChild(Z);
			if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
				n = j.styleSheets[j.styleSheets.length - 1]
			}
			G = X
		}
		if (M.ie && M.win) {
			if (n && typeof n.addRule == r) {
				n.addRule(ac, Y)
			}
		} else {
			if (n && typeof j.createTextNode != D) {
				n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
			}
		}
	}
	function w(Z, X) {
		if (!m) {
			return
		}
		var Y = X ? "visible" : "hidden";
		if (J && c(Z)) {
			c(Z).style.visibility = Y
		} else {
			v("#" + Z, "visibility:" + Y)
		}
	}
	function L(Y) {
		var Z = /[\\\"<>\.;]/;
		var X = Z.exec(Y) != null;
		return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
	}
	var d = function () {
		if (M.ie && M.win) {
			window.attachEvent("onunload", function () {
				var ac = I.length;
				for (var ab = 0; ab < ac; ab++) {
					I[ab][0].detachEvent(I[ab][1], I[ab][2])
				}
				var Z = N.length;
				for (var aa = 0; aa < Z; aa++) {
					y(N[aa])
				}
				for (var Y in M) {
					M[Y] = null
				}
				M = null;
				for (var X in swfobject) {
					swfobject[X] = null
				}
				swfobject = null
			})
		}
	}();
	return {
		registerObject: function (ab, X, aa, Z) {
			if (M.w3 && ab && X) {
				var Y = {};
				Y.id = ab;
				Y.swfVersion = X;
				Y.expressInstall = aa;
				Y.callbackFn = Z;
				o[o.length] = Y;
				w(ab, false)
			} else {
				if (Z) {
					Z({
						success: false,
						id: ab
					})
				}
			}
		},
		getObjectById: function (X) {
			if (M.w3) {
				return z(X)
			}
		},
		embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
			var X = {
				success: false,
				id: ah
			};
			if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
				w(ah, false);
				K(function () {
					ae += "";
					ag += "";
					var aj = {};
					if (af && typeof af === r) {
						for (var al in af) {
							aj[al] = af[al]
						}
					}
					aj.data = ab;
					aj.width = ae;
					aj.height = ag;
					var am = {};
					if (ad && typeof ad === r) {
						for (var ak in ad) {
							am[ak] = ad[ak]
						}
					}
					if (Z && typeof Z === r) {
						for (var ai in Z) {
							if (typeof am.flashvars != D) {
								am.flashvars += "&" + ai + "=" + Z[ai]
							} else {
								am.flashvars = ai + "=" + Z[ai]
							}
						}
					}
					if (F(Y)) {
						var an = u(aj, am, ah);
						if (aj.id == ah) {
							w(ah, true)
						}
						X.success = true;
						X.ref = an
					} else {
						if (aa && A()) {
							aj.data = aa;
							P(aj, am, ah, ac);
							return
						} else {
							w(ah, true)
						}
					}
					if (ac) {
						ac(X)
					}
				})
			} else {
				if (ac) {
					ac(X)
				}
			}
		},
		switchOffAutoHideShow: function () {
			m = false
		},
		ua: M,
		getFlashPlayerVersion: function () {
			return {
				major: M.pv[0],
				minor: M.pv[1],
				release: M.pv[2]
			}
		},
		hasFlashPlayerVersion: F,
		createSWF: function (Z, Y, X) {
			if (M.w3) {
				return u(Z, Y, X)
			} else {
				return undefined
			}
		},
		showExpressInstall: function (Z, aa, X, Y) {
			if (M.w3 && A()) {
				P(Z, aa, X, Y)
			}
		},
		removeSWF: function (X) {
			if (M.w3) {
				y(X)
			}
		},
		createCSS: function (aa, Z, Y, X) {
			if (M.w3) {
				v(aa, Z, Y, X)
			}
		},
		addDomLoadEvent: K,
		addLoadEvent: s,
		getQueryParamValue: function (aa) {
			var Z = j.location.search || j.location.hash;
			if (Z) {
				if (/\?/.test(Z)) {
					Z = Z.split("?")[1]
				}
				if (aa == null) {
					return L(Z)
				}
				var Y = Z.split("&");
				for (var X = 0; X < Y.length; X++) {
					if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
						return L(Y[X].substring((Y[X].indexOf("=") + 1)))
					}
				}
			}
			return ""
		},
		expressInstallCallback: function () {
			if (a) {
				var X = c(R);
				if (X && l) {
					X.parentNode.replaceChild(l, X);
					if (Q) {
						w(Q, true);
						if (M.ie && M.win) {
							l.style.display = "block"
						}
					}
					if (E) {
						E(B)
					}
				}
				a = false
			}
		}
	}
}();
(function ($, document, undefined) {
	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
	var config = $.cookie = function (key, value, options) {
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);
			if (value === null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = config.json ? JSON.stringify(value) : String(value);
			return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
		}
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
		return null;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};
})(jQuery, document);
(function (d) {
	var q, j, r, i = d(window),
		u = {
			jqueryui: {
				container: "ui-widget ui-widget-content ui-corner-all",
				notice: "ui-state-highlight",
				notice_icon: "ui-icon ui-icon-info",
				info: "",
				info_icon: "ui-icon ui-icon-info",
				success: "ui-state-default",
				success_icon: "ui-icon ui-icon-circle-check",
				error: "ui-state-error",
				error_icon: "ui-icon ui-icon-alert",
				closer: "ui-icon ui-icon-close",
				pin_up: "ui-icon ui-icon-pin-w",
				pin_down: "ui-icon ui-icon-pin-s",
				hi_menu: "ui-state-default ui-corner-bottom",
				hi_btn: "ui-state-default ui-corner-all",
				hi_btnhov: "ui-state-hover",
				hi_hnd: "ui-icon ui-icon-grip-dotted-horizontal"
			},
			bootstrap: {
				container: "alert",
				notice: "",
				notice_icon: "icon-exclamation-sign",
				info: "alert-info",
				info_icon: "icon-info-sign",
				success: "alert-success",
				success_icon: "icon-ok-sign",
				error: "alert-error",
				error_icon: "icon-warning-sign",
				closer: "fi-x",
				pin_up: "icon-pause",
				pin_down: "icon-play",
				hi_menu: "well",
				hi_btn: "btn",
				hi_btnhov: "",
				hi_hnd: "icon-chevron-down"
			}
		},
		s = function () {
			r = d("body");
			i = d(window);
			i.bind("resize", function () {
				j && clearTimeout(j);
				j = setTimeout(d.pnotify_position_all, 10)
			})
		};
	document.body ? s() : d(s);
	d.extend({
		pnotify_remove_all: function () {
			var e = i.data("pnotify");
			e && e.length && d.each(e, function () {
				this.pnotify_remove && this.pnotify_remove()
			})
		},
		pnotify_position_all: function () {
			j && clearTimeout(j);
			j = null;
			var e = i.data("pnotify");
			e && e.length && (d.each(e, function () {
				var d = this.opts.stack;
				if (d) d.nextpos1 = d.firstpos1, d.nextpos2 = d.firstpos2, d.addpos2 = 0, d.animation = true
			}), d.each(e, function () {
				this.pnotify_position()
			}))
		},
		pnotify: function (e) {
			var g, a;
			typeof e != "object" ? (a = d.extend({}, d.pnotify.defaults), a.text = e) : a = d.extend({}, d.pnotify.defaults, e);
			for (var p in a) typeof p == "string" && p.match(/^pnotify_/) && (a[p.replace(/^pnotify_/, "")] = a[p]);
			if (a.before_init && a.before_init(a) === false) return null;
			var k, o = function (a, c) {
				b.css("display", "none");
				var f = document.elementFromPoint(a.clientX, a.clientY);
				b.css("display", "block");
				var e = d(f),
					g = e.css("cursor");
				b.css("cursor", g != "auto" ? g : "default");
				if (!k || k.get(0) != f) k && (n.call(k.get(0), "mouseleave", a.originalEvent), n.call(k.get(0), "mouseout", a.originalEvent)), n.call(f, "mouseenter", a.originalEvent), n.call(f, "mouseover", a.originalEvent);
				n.call(f, c, a.originalEvent);
				k = e
			},
				f = u[a.styling],
				b = d("<div />", {
					"class": "ui-pnotify " + a.addclass,
					css: {
						display: "none"
					},
					mouseenter: function (l) {
						a.nonblock && l.stopPropagation();
						a.mouse_reset && g == "out" && (b.stop(true), g = "in", b.css("height", "auto").animate({
							width: a.width,
							opacity: a.nonblock ? a.nonblock_opacity : a.opacity
						}, "fast"));
						a.nonblock && b.animate({
							opacity: a.nonblock_opacity
						}, "fast");
						a.hide && a.mouse_reset && b.pnotify_cancel_remove();
						a.sticker && !a.nonblock && b.sticker.trigger("pnotify_icon").css("visibility", "visible");
						a.closer && !a.nonblock && b.closer.css("visibility", "visible")
					},
					mouseleave: function (l) {
						a.nonblock && l.stopPropagation();
						k = null;
						b.css("cursor", "auto");
						a.nonblock && g != "out" && b.animate({
							opacity: a.opacity
						}, "fast");
						a.hide && a.mouse_reset && b.pnotify_queue_remove();
						a.sticker_hover && b.sticker.css("visibility", "hidden");
						a.closer_hover && b.closer.css("visibility", "hidden");
						d.pnotify_position_all()
					},
					mouseover: function (b) {
						a.nonblock && b.stopPropagation()
					},
					mouseout: function (b) {
						a.nonblock && b.stopPropagation()
					},
					mousemove: function (b) {
						a.nonblock && (b.stopPropagation(), o(b, "onmousemove"))
					},
					mousedown: function (b) {
						a.nonblock && (b.stopPropagation(), b.preventDefault(), o(b, "onmousedown"))
					},
					mouseup: function (b) {
						a.nonblock && (b.stopPropagation(), b.preventDefault(), o(b, "onmouseup"))
					},
					click: function (b) {
						a.nonblock && (b.stopPropagation(), o(b, "onclick"))
					},
					dblclick: function (b) {
						a.nonblock && (b.stopPropagation(), o(b, "ondblclick"))
					}
				});
			b.opts = a;
			b.container = d("<div />", {
				"class": f.container + " ui-pnotify-container " + (a.type == "error" ? f.error : a.type == "info" ? f.info : a.type == "success" ? f.success : f.notice)
			}).appendTo(b);
			a.cornerclass != "" && b.container.removeClass("ui-corner-all").addClass(a.cornerclass);
			a.shadow && b.container.addClass("ui-pnotify-shadow");
			b.pnotify_version = "1.2.0";
			b.pnotify = function (l) {
				var c = a;
				typeof l == "string" ? a.text = l : a = d.extend({}, a, l);
				for (var e in a) typeof e == "string" && e.match(/^pnotify_/) && (a[e.replace(/^pnotify_/, "")] = a[e]);
				b.opts = a;
				a.cornerclass != c.cornerclass && b.container.removeClass("ui-corner-all").addClass(a.cornerclass);
				a.shadow != c.shadow && (a.shadow ? b.container.addClass("ui-pnotify-shadow") : b.container.removeClass("ui-pnotify-shadow"));
				a.addclass === false ? b.removeClass(c.addclass) : a.addclass !== c.addclass && b.removeClass(c.addclass).addClass(a.addclass);
				a.title === false ? b.title_container.slideUp("fast") : a.title !== c.title && (a.title_escape ? b.title_container.text(a.title).slideDown(200) : b.title_container.html(a.title).slideDown(200));
				a.text === false ? b.text_container.slideUp("fast") : a.text !== c.text && (a.text_escape ? b.text_container.text(a.text).slideDown(200) : b.text_container.html(a.insert_brs ? String(a.text).replace(/\n/g, "<br />") : a.text).slideDown(200));
				b.pnotify_history = a.history;
				b.pnotify_hide = a.hide;
				a.type != c.type && b.container.removeClass(f.error + " " + f.notice + " " + f.success + " " + f.info).addClass(a.type == "error" ? f.error : a.type == "info" ? f.info : a.type == "success" ? f.success : f.notice);
				if (a.icon !== c.icon || a.icon === true && a.type != c.type) b.container.find("div.ui-pnotify-icon").remove(), a.icon !== false && d("<div />", {
					"class": "ui-pnotify-icon"
				}).append(d("<span />", {
					"class": a.icon === true ? a.type == "error" ? f.error_icon : a.type == "info" ? f.info_icon : a.type == "success" ? f.success_icon : f.notice_icon : a.icon
				})).prependTo(b.container);
				a.width !== c.width && b.animate({
					width: a.width
				});
				a.min_height !== c.min_height && b.container.animate({
					minHeight: a.min_height
				});
				a.opacity !== c.opacity && b.fadeTo(a.animate_speed, a.opacity);
				!a.closer || a.nonblock ? b.closer.css("display", "none") : b.closer.css("display", "block");
				!a.sticker || a.nonblock ? b.sticker.css("display", "none") : b.sticker.css("display", "block");
				b.sticker.trigger("pnotify_icon");
				a.sticker_hover ? b.sticker.css("visibility", "hidden") : a.nonblock || b.sticker.css("visibility", "visible");
				a.closer_hover ? b.closer.css("visibility", "hidden") : a.nonblock || b.closer.css("visibility", "visible");
				a.hide ? c.hide || b.pnotify_queue_remove() : b.pnotify_cancel_remove();
				b.pnotify_queue_position();
				return b
			};
			b.pnotify_position = function (a) {
				var c = b.opts.stack;
				if (c) {
					if (!c.nextpos1) c.nextpos1 = c.firstpos1;
					if (!c.nextpos2) c.nextpos2 = c.firstpos2;
					if (!c.addpos2) c.addpos2 = 0;
					var d = b.css("display") == "none";
					if (!d || a) {
						var f, e = {},
							g;
						switch (c.dir1) {
						case "down":
							g = "top";
							break;
						case "up":
							g = "bottom";
							break;
						case "left":
							g = "right";
							break;
						case "right":
							g = "left"
						}
						a = parseInt(b.css(g));
						isNaN(a) && (a = 0);
						if (typeof c.firstpos1 == "undefined" && !d) c.firstpos1 = a, c.nextpos1 = c.firstpos1;
						var h;
						switch (c.dir2) {
						case "down":
							h = "top";
							break;
						case "up":
							h = "bottom";
							break;
						case "left":
							h = "right";
							break;
						case "right":
							h = "left"
						}
						f = parseInt(b.css(h));
						isNaN(f) && (f = 0);
						if (typeof c.firstpos2 == "undefined" && !d) c.firstpos2 = f, c.nextpos2 = c.firstpos2;
						if (c.dir1 == "down" && c.nextpos1 + b.height() > i.height() || c.dir1 == "up" && c.nextpos1 + b.height() > i.height() || c.dir1 == "left" && c.nextpos1 + b.width() > i.width() || c.dir1 == "right" && c.nextpos1 + b.width() > i.width()) c.nextpos1 = c.firstpos1, c.nextpos2 += c.addpos2 + (typeof c.spacing2 == "undefined" ? 25 : c.spacing2), c.addpos2 = 0;
						if (c.animation && c.nextpos2 < f) switch (c.dir2) {
						case "down":
							e.top = c.nextpos2 + "px";
							break;
						case "up":
							e.bottom = c.nextpos2 + "px";
							break;
						case "left":
							e.right = c.nextpos2 + "px";
							break;
						case "right":
							e.left = c.nextpos2 + "px"
						} else b.css(h, c.nextpos2 + "px");
						switch (c.dir2) {
						case "down":
						case "up":
							if (b.outerHeight(true) > c.addpos2) c.addpos2 = b.height();
							break;
						case "left":
						case "right":
							if (b.outerWidth(true) > c.addpos2) c.addpos2 = b.width()
						}
						if (c.nextpos1) if (c.animation && (a > c.nextpos1 || e.top || e.bottom || e.right || e.left)) switch (c.dir1) {
						case "down":
							e.top = c.nextpos1 + "px";
							break;
						case "up":
							e.bottom = c.nextpos1 + "px";
							break;
						case "left":
							e.right = c.nextpos1 + "px";
							break;
						case "right":
							e.left = c.nextpos1 + "px"
						} else b.css(g, c.nextpos1 + "px");
						(e.top || e.bottom || e.right || e.left) && b.animate(e, {
							duration: 500,
							queue: false
						});
						switch (c.dir1) {
						case "down":
						case "up":
							c.nextpos1 += b.height() + (typeof c.spacing1 == "undefined" ? 25 : c.spacing1);
							break;
						case "left":
						case "right":
							c.nextpos1 += b.width() + (typeof c.spacing1 == "undefined" ? 25 : c.spacing1)
						}
					}
				}
			};
			b.pnotify_queue_position = function (a) {
				j && clearTimeout(j);
				a || (a = 10);
				j = setTimeout(d.pnotify_position_all, a)
			};
			b.pnotify_display = function () {
				b.parent().length || b.appendTo(r);
				a.before_open && a.before_open(b) === false || (a.stack.push != "top" && b.pnotify_position(true), a.animation == "fade" || a.animation.effect_in == "fade" ? b.show().fadeTo(0, 0).hide() : a.opacity != 1 && b.show().fadeTo(0, a.opacity).hide(), b.animate_in(function () {
					a.after_open && a.after_open(b);
					b.pnotify_queue_position();
					a.hide && b.pnotify_queue_remove()
				}))
			};
			b.pnotify_remove = function () {
				if (b.timer) window.clearTimeout(b.timer), b.timer = null;
				a.before_close && a.before_close(b) === false || b.animate_out(function () {
					a.after_close && a.after_close(b) === false || (b.pnotify_queue_position(), a.remove && b.detach())
				})
			};
			b.animate_in = function (d) {
				g = "in";
				var c;
				c = typeof a.animation.effect_in != "undefined" ? a.animation.effect_in : a.animation;
				c == "none" ? (b.show(), d()) : c == "show" ? b.show(a.animate_speed, d) : c == "fade" ? b.show().fadeTo(a.animate_speed, a.opacity, d) : c == "slide" ? b.slideDown(a.animate_speed, d) : typeof c == "function" ? c("in", d, b) : b.show(c, typeof a.animation.options_in == "object" ? a.animation.options_in : {}, a.animate_speed, d)
			};
			b.animate_out = function (d) {
				g = "out";
				var c;
				c = typeof a.animation.effect_out != "undefined" ? a.animation.effect_out : a.animation;
				c == "none" ? (b.hide(), d()) : c == "show" ? b.hide(a.animate_speed, d) : c == "fade" ? b.fadeOut(a.animate_speed, d) : c == "slide" ? b.slideUp(a.animate_speed, d) : typeof c == "function" ? c("out", d, b) : b.hide(c, typeof a.animation.options_out == "object" ? a.animation.options_out : {}, a.animate_speed, d)
			};
			b.pnotify_cancel_remove = function () {
				b.timer && window.clearTimeout(b.timer)
			};
			b.pnotify_queue_remove = function () {
				b.pnotify_cancel_remove();
				b.timer = window.setTimeout(function () {
					b.pnotify_remove()
				}, isNaN(a.delay) ? 0 : a.delay)
			};
			b.closer = d("<div />", {
				"class": "ui-pnotify-closer",
				css: {
					cursor: "pointer",
					visibility: a.closer_hover ? "hidden" : "visible"
				},
				click: function () {
					b.pnotify_remove();
					b.sticker.css("visibility", "hidden");
					b.closer.css("visibility", "hidden")
				}
			}).append(d("<span />", {
				"class": f.closer
			})).appendTo(b.container);
			(!a.closer || a.nonblock) && b.closer.css("display", "none");
			b.sticker = d("<div />", {
				"class": "ui-pnotify-sticker",
				css: {
					cursor: "pointer",
					visibility: a.sticker_hover ? "hidden" : "visible"
				},
				click: function () {
					a.hide = !a.hide;
					a.hide ? b.pnotify_queue_remove() : b.pnotify_cancel_remove();
					d(this).trigger("pnotify_icon")
				}
			}).bind("pnotify_icon", function () {
				d(this).children().removeClass(f.pin_up + " " + f.pin_down).addClass(a.hide ? f.pin_up : f.pin_down)
			}).append(d("<span />", {
				"class": f.pin_up
			})).appendTo(b.container);
			(!a.sticker || a.nonblock) && b.sticker.css("display", "none");
			a.icon !== false && d("<div />", {
				"class": "ui-pnotify-icon"
			}).append(d("<span />", {
				"class": a.icon === true ? a.type == "error" ? f.error_icon : a.type == "info" ? f.info_icon : a.type == "success" ? f.success_icon : f.notice_icon : a.icon
			})).prependTo(b.container);
			b.title_container = d("<h4 />", {
				"class": "ui-pnotify-title"
			}).appendTo(b.container);
			a.title === false ? b.title_container.hide() : a.title_escape ? b.title_container.text(a.title) : b.title_container.html(a.title);
			b.text_container = d("<div />", {
				"class": "ui-pnotify-text"
			}).appendTo(b.container);
			a.text === false ? b.text_container.hide() : a.text_escape ? b.text_container.text(a.text) : b.text_container.html(a.insert_brs ? String(a.text).replace(/\n/g, "<br />") : a.text);
			typeof a.width == "string" && b.css("width", a.width);
			typeof a.min_height == "string" && b.container.css("min-height", a.min_height);
			b.pnotify_history = a.history;
			b.pnotify_hide = a.hide;
			var h = i.data("pnotify");
			if (h == null || typeof h != "object") h = [];
			h = a.stack.push == "top" ? d.merge([b], h) : d.merge(h, [b]);
			i.data("pnotify", h);
			a.stack.push == "top" && b.pnotify_queue_position(1);
			a.after_init && a.after_init(b);
			if (a.history) {
				var m = i.data("pnotify_history");
				typeof m == "undefined" && (m = d("<div />", {
					"class": "ui-pnotify-history-container " + f.hi_menu,
					mouseleave: function () {
						m.animate({
							top: "-" + q + "px"
						}, {
							duration: 100,
							queue: false
						})
					}
				}).append(d("<div />", {
					"class": "ui-pnotify-history-header",
					text: "Redisplay"
				})).append(d("<button />", {
					"class": "ui-pnotify-history-all " + f.hi_btn,
					text: "All",
					mouseenter: function () {
						d(this).addClass(f.hi_btnhov)
					},
					mouseleave: function () {
						d(this).removeClass(f.hi_btnhov)
					},
					click: function () {
						d.each(h, function () {
							this.pnotify_history && (this.is(":visible") ? this.pnotify_hide && this.pnotify_queue_remove() : this.pnotify_display && this.pnotify_display())
						});
						return false
					}
				})).append(d("<button />", {
					"class": "ui-pnotify-history-last " + f.hi_btn,
					text: "Last",
					mouseenter: function () {
						d(this).addClass(f.hi_btnhov)
					},
					mouseleave: function () {
						d(this).removeClass(f.hi_btnhov)
					},
					click: function () {
						var a = -1,
							b;
						do {
							b = a == -1 ? h.slice(a) : h.slice(a, a + 1);
							if (!b[0]) break;
							a--
						} while (!b[0].pnotify_history || b[0].is(":visible"));
						if (!b[0]) return false;
						b[0].pnotify_display && b[0].pnotify_display();
						return false
					}
				})).appendTo(r), q = d("<span />", {
					"class": "ui-pnotify-history-pulldown " + f.hi_hnd,
					mouseenter: function () {
						m.animate({
							top: "0"
						}, {
							duration: 100,
							queue: false
						})
					}
				}).appendTo(m).offset().top + 2, m.css({
					top: "-" + q + "px"
				}), i.data("pnotify_history", m))
			}
			a.stack.animation = false;
			b.pnotify_display();
			return b
		}
	});
	var t = /^on/,
		v = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
		w = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
		x = /^(scroll|resize|(un)?load|abort|error)$/,
		n = function (e, g) {
			var a, e = e.toLowerCase();
			document.createEvent && this.dispatchEvent ? (e = e.replace(t, ""), e.match(v) ? (d(this).offset(), a = document.createEvent("MouseEvents"), a.initMouseEvent(e, g.bubbles, g.cancelable, g.view, g.detail, g.screenX, g.screenY, g.clientX, g.clientY, g.ctrlKey, g.altKey, g.shiftKey, g.metaKey, g.button, g.relatedTarget)) : e.match(w) ? (a = document.createEvent("UIEvents"), a.initUIEvent(e, g.bubbles, g.cancelable, g.view, g.detail)) : e.match(x) && (a = document.createEvent("HTMLEvents"), a.initEvent(e, g.bubbles, g.cancelable)), a && this.dispatchEvent(a)) : (e.match(t) || (e = "on" + e), a = document.createEventObject(g), this.fireEvent(e, a))
		};
	d.pnotify.defaults = {
		title: false,
		title_escape: false,
		text: false,
		text_escape: false,
		styling: "bootstrap",
		addclass: "",
		cornerclass: "",
		nonblock: false,
		nonblock_opacity: 0.2,
		history: true,
		width: "300px",
		min_height: "16px",
		type: "notice",
		icon: true,
		animation: "fade",
		animate_speed: "slow",
		opacity: 1,
		shadow: true,
		closer: true,
		closer_hover: true,
		sticker: true,
		sticker_hover: true,
		hide: true,
		delay: 8E3,
		mouse_reset: true,
		remove: true,
		insert_brs: true,
		stack: {
			dir1: "down",
			dir2: "left",
			push: "bottom",
			spacing1: 25,
			spacing2: 25
		}
	}
})(jQuery);
var WRONG_PASSWORD = terms.common_wrong_password;
var RECONNECT_TO_CONFERENCE = terms.common_create_conference;
var LEAVE_CONFERENCE = terms.common_leave_conference;
window.logList = [];

function logMessage(message) {
	console.log(message);
	if (window.logList) window.logList.push(message);
}

function getCurrentRoomIdForPersonalRoom() {
	var location = window.location.href.split('/');
	var lastPath = location[location.length - 1];
	if (lastPath.indexOf('#') > -1) lastPath = lastPath.substring(0, lastPath.indexOf('#'));
	if (lastPath.length > 2) {
		if (lastPath.indexOf('?') == -1) {
			return lastPath;
		} else {
			return lastPath.substring(0, lastPath.indexOf('?'));
		}
	}
	return '';
}
window.joinThisRoom = null;
window.firstConnection = true;

function getCurrentRoom() {
	if (window.joinThisRoom != null) {
		return window.joinThisRoom;
	}
	if (window.personalRoom) {
		return getCurrentRoomIdForPersonalRoom();
	} else {
		var room = (window.location.hash.indexOf('#') > -1 ? window.location.hash.substring(window.location.hash.indexOf('#'), window.location.hash.length).replace('#', '') : '');
		if (room == '') {
			room = getCurrentRoomIdForPersonalRoom();
		}
	}
	return room;
}
window.currentProtocol = 'webrtc';

function ConferenceConnection(readyCallback, needPasswordCallback, onSuccess) {
	this.socket = this.socket;
	this.room = getCurrentRoom();
	var that = this;
	this.roomObject;
	this.callLogged;
	this.roomCreator;
	this.server_host = window.location.hostname;
	this.signalingServerAddr = '//' + this.server_host;
	this.connection;
	this.vlRoom = null;
	this.isMuted = false;
	$('#app_loading').hide();
	this.sendMessage = function (message) {
		this.vlRoom.sendBroadcastMessage({
			type: 'message',
			msg: JSON.stringify(message)
		});
	};
	this.onChatMessage = function (message) {
		chatMessageReceived(message);
	};
	this.sendChatMessage = function (message) {
		message.type = 'chat_message';
		this.vlRoom.sendBroadcastMessage(message)
		_gaq.push(['_trackEvent', 'Chat', 'Send message']);
	};
	this.initAd = function () {}
	this.initConnection = function () {
		logMessage('[init connection]');
		var card = document.getElementById("card");
		this.initElements();
		if (that.roomObject && that.roomObject.scheduled) {
			var scheduledDate = that.roomObject.scheduledDate.split(' ');
			$('#appointment-start-date').val(scheduledDate[0]);
			$('#appointment-start-time').val(scheduledDate[1]);
			setupAppointment(that.roomObject.scheduledDate);
		}
		logMessage('registering...');
		this.createVideolinkPlatformRoom(this.room, function () {
			$('.footer_ad').animate({
				bottom: '18px'
			});
			_gaq.push(['_trackEvent', 'Conference', 'Enter room']);
			$('#sharebar span').attr('st_url', 'https://videolink2.me/o/' + that.room);
			LazyLoad.js('//ws.sharethis.com/button/buttons.js', function () {
				stLight.options({
					publisher: "c4e62028-b15a-4a58-9b6d-d61a49fe923e",
					doNotHash: true,
					doNotCopy: false,
					hashAddressBar: false,
					title: terms.page_title + " - Videolink2.me",
					summary: terms.page_description,
					image: 'https://videolink2.me/img/logo.png',
					shorten: false
				})
			});
		})
	};
	this.createVideolinkPlatformRoom = function (roomName, callback) {
		new VideolinkPlatformConnector({
			apiKey: (window.apiKey ? window.apiKey : '38376c27595a2e7b767466547752467a')
		}, function (connector) {
			console.log('vl connection created');
			that.vlRoom = connector.createRoom({
				name: roomName,
				remoteContainer: document.getElementById('remote_container'),
				localContainer: document.getElementById('mini')
			}).on('onBroadcastMessage', function (message) {
				if (message.type == 'chat_message') {
					that.onChatMessage(message);
				} else if (message.type == 'screen_shared') {
					if (message.initiator != window.webrtcConnection.getLocalId()) {
						window.conferenceScreenSharing.onScreenShared(message.initiator);
					}
				} else if (message.type == 'screen_stopped') {
					if (message.initiator != window.webrtcConnection.getLocalId()) {
						window.conferenceScreenSharing.onScreenStopped(message.initiator);
					}
				} else if (message.type == 'change_theme') {
					if (message.initiator != window.webrtcConnection.getLocalId()) {
						setPageTheme(message.theme, true, true);
					}
				} else if (message.type == 'bye') {
					if (!window.roomOwner) {
						that.leavePersonalRoom();
					}
				}
			}).on('onLocalStream', function () {
				if (that.roomCreator) {
					readyCallback();
				}
				if (window.webrtcConnection.vlRoom.isWebcamShared()) {
					$('#muteCameraControl').removeClass('active');
				} else {
					$('#muteCameraControl').addClass('active');
				}
			}).on('onLocalStream', function (stream) {
				that.webRTCInterfaceEventHandler.onLocalStreamAdded(stream);
				if ($("#make-selfie.selfie-contest").length > 0 && $.cookie('hide-selfie-contest') != '1') {
					$("#make-selfie.selfie-contest").fadeIn('fast');
				}
			}).on('onRemoteParticipantConnected', function (stream, remoteId) {
				that.webRTCInterfaceEventHandler.onRemoteStreamAdded(stream, remoteId);
			}).on('onRemoteParticipantDisconnected', function (remoteId) {
				that.webRTCInterfaceEventHandler.onRemoteHangup(remoteId);
			}).on('onBeforeCaptureMedia', function () {
				that.webRTCInterfaceEventHandler.onBeforeCaptureMedia()
			}).on('onAllowMediaCallback', function () {
				that.webRTCInterfaceEventHandler.onAllowMediaCallback()
				$('#container').removeClass('inactive');
				$('#footer .waiting_connection').show();
			}).on('onNoWebcam', function () {
				if (typeof(googletag) != "undefined") {
					$('#no_webcam_block').show();
					googletag.cmd.push(function () {
						googletag.display('div-gpt-ad-1412109274727-0');
					});
				}
				_gaq.push(['_trackEvent', 'Conference', 'No webcam']);
			}).on('onEmpty', function () {
				if (window.personalRoom && window.roomOwner) {
					that.vlRoom.hangup();
				}
			}).on('onRemoteParticipantConnected', function () {
				that.logCall()
			}).on('onScreenSharingStarted', window.conferenceScreenSharing.onScreenShared).on('onScreenSharingCompleted', window.conferenceScreenSharing.onScreenStopped)
			callback();
		}, function (error) {
			console.log('Error: ' + error);
		})
	}
	this.changeTheme = function (themeName) {
		this.vlRoom.sendBroadcastMessage({
			type: 'change_theme',
			theme: themeName
		})
	}
	this.mute = function () {
		this.isMuted = true;
		this.vlRoom.mute();
	}
	this.unmute = function () {
		this.isMuted = false;
		this.vlRoom.unmute();
	}
	this.getLocalId = function () {
		return $.cookie('localUserId');
	};
	this.setLocalId = function (localId) {
		$.cookie('localUserId', localId, {
			expires: 365 * 100,
			path: '/'
		});
	};
	this.logCall = function () {
		if (!that.callLogged) {
			_gaq.push(['_trackEvent', 'Conference', 'Join call']);
			that.callLogged = true;
			window.activateRemarketingTag('1025554555', 'kNlrCMP70wYQ-_CC6QM');
		}
	};
	this.getRoomId = function () {
		return that.room;
	};
	this.onBeforeCaptureMedia = function () {}
	this.onAllowMediaCallback = function () {}
	this.leavePersonalRoom = function () {
		location.href = "/" + getCurrentRoomIdForPersonalRoom() + "/leave";
	}
	this.releaseCamera = function () {
		this.vlRoom.releaseCamera();
	}
	this.destroy = function () {
		this.stop();
		window.webrtcConnection.releaseCamera();
		window.webrtcConnection.vlRoom.leave()
		$('#local').html('');
		$('#miniVideo').attr('src', '');
		$('#calls_history').removeClass('hide');
		$('.endcall').addClass('hide');
		window.webrtcConnection = null;
		window.initialized = false;
		window.callHost = false;
		$('.waiting_connection').hide();
		$('.conference_controls').hide();
		$('#remote_container video, #mini video').remove();
		$('#remote_container .video_container').remove();
		$('#remote_container').css({
			width: '100%'
		});
		window.joinThisRoom = null;
		$('#shareControl').removeClass('disabled');
		$('body').removeClass('in-call');
		hideChatBox();
	}
	this.hangup = function () {
		console.log('hangup signal');
		if (window.personalRoom) {
			if (window.roomOwner) {
				that.vlRoom.sendBroadcastMessage({
					type: 'bye'
				});
				that.destroy();
				if ($("#make-selfie.selfie-contest").length > 0) {
					$("#make-selfie.selfie-contest").hide();
				}
			} else {
				that.leavePersonalRoom();
			}
		} else {
			document.getElementById('remote').innerHTML = '<div style="text-align:center;margin-top:600px;"><a class="btn btn-success" href="/">' + RECONNECT_TO_CONFERENCE + '</a></div>';
			$('#sharebox').show();
			if ($.cookie('redirectedToSurvey') == null) {
				$.cookie('redirectedToSurvey', '1');
			} else if ($.cookie('redirectedToSurvey') == '1') {
				$.cookie('redirectedToSurvey', '2', {
					expires: 365 * 10,
					path: '/'
				});
				location.href = 'https://videlink2me.typeform.com/to/S8LiCu';
			}
			if ($.cookie('rated') != '1') {
				$('#ratebox').show();
			} else {
				$('#shareboxIntro').show();
			}
			$('#footer').hide();
		}
		_gaq.push(['_trackEvent', 'Controls', 'Hangup']);
		this.vlRoom.hangup();
		window.exitFullscreen();
	}
	this.finishCallIfNobodyLeft = function () {
		if (window.personalRoom && window.roomOwner) {
			if ($('#remote_container video').length == 0) {
				console.log('leave internal call');
				hangup();
			}
		}
	}
	this.checkPassword = function (callback) {
		var passwordField = $('#pass');
		passwordField.removeClass('error');
		var passwordSubmitButton = $('#promptPasswordSubmitButton');
		passwordSubmitButton.prop('disabled', true);
		passwordSubmitButton.val('Checking...');
		if (passwordField.val() != '') {
			$.get('/join_room/' + that.room + '/' + passwordField.val(), function (result) {
				passwordSubmitButton.prop('disabled', false);
				passwordSubmitButton.val('Ok');
				if (result.status) {
					$('#roompass_prompt').modal('hide');
					window.webrtcConnection.initConnection();
				} else {
					if (callback) callback();
					else {
						$('#roompass_prompt').shake(1, 20, 50);
						passwordField.addClass('error');
					}
				}
			});
		} else {
			$('#roompass_prompt').shake(1, 20, 50);
			passwordField.addClass('error');
		};
	};
	this.setRoomPassword = function (pass) {
		$('.setup-room-password .title').html(terms.change_password);
		$.get('/set_room_pass/' + that.room + '/' + pass);
	};
	this.stop = function () {
		this.vlRoom.leave();
	}
	this.setupEventHandler = function () {
		if (isWebRTC()) {
			this.webRTCInterfaceEventHandler = new WebRTCEventHandler();
		} else {
			this.webRTCInterfaceEventHandler = new RTMPEventHandler();
		}
	}
	this.setupInterface = function () {
		if (!inChrome()) {
			$('#shareControl').addClass('disabled');
		}
	}
	if (chatBoxes) {
		for (var i in chatBoxes) {
			chatBoxes[i].minimize();
		}
	}
	this.setupEventHandler();
	this.setupInterface();
	if (that.room == '') {
		logMessage('creating room...');
		$.get('/create_room', function (newRoom) {
			that.room = newRoom.short_id;
			logMessage('changed room id to #' + that.room);
			location.href = location.href + '#' + that.room;
			that.initConnection();
			onSuccess(that.room);
			$('.setup-room-password').fadeIn();
		});
		that.roomCreator = true;
	} else {
		logMessage('joining room...');
		var roomInfo = {
			room_id: that.room
		};
		if ($.cookie('uid') && $.cookie('uid') != '') roomInfo.uid = $.cookie('uid');
		if ($.cookie('room_token') && $.cookie('room_token') != '') roomInfo.room_token = $.cookie('room_token');
		if ($.cookie('token') && $.cookie('token') != '') roomInfo.token = $.cookie('token');
		$.get('/find_room/' + that.room + "?cb=" + new Date().getTime(), function (room_info) {
			that.roomObject = room_info;
			logMessage('room found');
			logMessage(room_info);
			if (room_info.need_pass) {
				logMessage('password required');
				if ($.cookie('personal_room') == that.room) {
					logMessage('login to personal room');
					$('#pass').val($.cookie('personal_room_pass'));
					that.checkPassword(function () {
						logMessage('login failed');
						needPasswordCallback();
					});
				} else needPasswordCallback();
			} else {
				logMessage('connecting without password');
				that.initConnection();
			};
		});
	};
}
if (!Object.create) {
	Object.create = (function () {
		function F() {}
		return function (o) {
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F()
		}
	})()
}
ConferenceConnection.prototype.initElements = function () {
	$('#app_loading').hide();
};
ConferenceConnection.prototype.onScreenShared = function () {};
ConferenceConnection.prototype.onScreenStopped = function () {};
ConferenceConnection.prototype.releaseCamera = function () {};

function WebRTCEventHandler() {
	var that = this;
	this.onLocalStreamAdded = function (stream) {
		window.activateRemarketingTag('1025554555', 'Qp5rCNP50wYQ-_CC6QM');
		$("#allow_media").animate({
			"top": "-=250px"
		}, {
			duration: 500,
			complete: function () {
				$.cookie('cameraAllowed', '1');
				$('#loading_video').show();
				$("#allow_media").hide();
				$('#loadingOverlay').hide();
				$('#alerts').slideDown();
				$('#loading_video').hide();
				$('.endcall').removeClass('hide');
			}
		});
	}
	this.refreshView = function () {
		$('#remote_container video').each(function () {
			$(this).css('width', Math.round(100 / $('#remote_container video').length) + '%');
		});
		var onlyOwnVideoInContainer = $('#remote_container video').length == 1 && $('#remote_container video')[0].id.indexOf('video_') == -1;
		if ($('#remote_container video').length == 0 || onlyOwnVideoInContainer) {
			logMessage('No users left, we\'re alone :+(');
			$('#footer .conference_controls').hide();
			$('#footer .waiting_connection').show();
			$('body').removeClass('in-call');
			$('#make-selfie').hide();
			hideChatBox();
		} else {
			console.log('---not empty');
			$('#footer .conference_controls').show();
			$('#footer .waiting_connection').hide();
			$('body').addClass('in-call');
		}
		$(window).trigger('resize');
	}
	this.onRemoteStreamAdded = function (stream, remoteId) {
		that.transitionToActive();
		that.refreshView();
		if (window.currentTheme) {
			that.changeTheme(window.currentTheme);
		}
		$('#make-selfie').show();
	}
	this.onRemoteHangup = function (remoteId) {
		if (remoteId != null && remoteId.indexOf && remoteId.indexOf("screen_") > -1) {
			var screenMediaElement = $('#screen_sharing #video_' + remoteId);
			if (screenMediaElement.length > 0) {
				screenMediaElement.remove();
			}
			window.conferenceScreenSharing.onScreenStopped();
		}
		logMessage('Session terminated: ' + remoteId);
		that.refreshView();
	}
	this.onEmpty = function () {
		$('#footer .conference_controls').hide();
		$('#footer .waiting_connection').show();
	}
	this.transitionToActive = function () {
		$('#footer').show();
	}
	this.transitionToDone = function () {}
	this.refreshSize = function () {}
	this.onBeforeCaptureMedia = function () {
		if (!window.mediaAllowed) {
			window.mediaAllowed = true;
			$('#app_loading').hide();
			if ($.cookie('cameraAllowed') != '1') {
				$('#loadingOverlay').show();
				$("#allow_media").css('top', '-250px');
				$("#allow_media").show();
				$("#allow_media").animate({
					top: 0
				});
			}
		}
	}
	this.onAllowMediaCallback = function () {
		if (!window.mediaEventRegistered) {
			window.mediaEventRegistered = true;
			_gaq.push(['_trackEvent', 'Conference', 'Allow camera']);
		}
	}
}

function RTMPEventHandler() {
	var that = this;
	this.onLocalStreamAdded = function (streamId) {
		window.activateRemarketingTag('1025554555', 'Qp5rCNP50wYQ-_CC6QM');
		logMessage('[received local stream]');
		$('.endcall').removeClass('hide');
	}
	this.refreshView = function () {
		var viewportHeight = document.getElementById('remote_container').offsetHeight;
		$('#remote_container .video_container').each(function () {
			$(this).css('width', Math.round(100 / ($('#remote_container .video_container').length - 1)) + '%');
		});
		if ($('#remote_container .video_container').length == 1) {
			logMessage('No users left, we\'re alone :+(');
			$('#footer .conference_controls').hide();
			$('#footer .waiting_connection').show();
			$('body').removeClass('in-call');
			if (window.isBrowserWebRTCCapable && !(window.personalRoom && window.roomOwner)) {
				switchProtocolTo('webrtc');
			} else if (window.personalRoom && window.roomOwner) {
				window.overrideConnectionMode = null;
			}
			hideChatBox();
		} else {
			$('#footer .conference_controls').show();
			$('#footer .waiting_connection').hide();
			$('body').addClass('in-call');
		}
	}
	this.onEmpty = function () {
		$('#footer .conference_controls').hide();
		$('#footer .waiting_connection').show();
		if (window.isBrowserWebRTCCapable && !(window.personalRoom && window.roomOwner)) {
			switchProtocolTo('webrtc');
		} else if (window.personalRoom && window.roomOwner) {
			window.overrideConnectionMode = null;
		}
	}
	this.onRemoteStreamAdded = function (stream, remoteId) {
		that.transitionToActive();
		that.refreshView();
	}
	this.onRemoteHangup = function (remoteId) {
		that.refreshView();
	}
	this.transitionToActive = function () {
		$('#footer').show();
	}
	this.transitionToDone = function () {}
	this.refreshSize = function () {}
	this.onBeforeCaptureMedia = function () {}
	this.onAllowMediaCallback = function () {
		if (!window.mediaEventRegistered) {
			window.mediaEventRegistered = true;
			_gaq.push(['_trackEvent', 'Conference', 'Allow camera']);
		}
	}
}

function ConferenceScreenSharing() {
	this.shareUnscreen = function () {
		$('#shareControl').removeClass('active');
		$('#my_shared_screen').removeClass('on');
		if (window.videolinkPlatformScreenSharing.isShared) {
			window.videolinkPlatformScreenSharing.stop();
		}
	}
	this.shareScreen = function () {
		if (!inChrome()) return;
		if (!$('#my_shared_screen').hasClass('on')) {
			_gaq.push(['_trackEvent', 'Controls', 'Click on "Share screen"']);
			$('#my_shared_screen').addClass('on');
			VLPlatformStartSharing();
			$('#shareControl').addClass('active');
		} else {
			_gaq.push(['_trackEvent', 'Controls', 'Click on "Stop screen sharing"']);
			this.shareUnscreen();
		}
	}
	this.onScreenShared = function () {
		console.log('got shared screen');
		if (!$('#screen_sharing').hasClass('on')) {
			$('#remote_container').addClass('minimized');
			$('#screen_sharing').addClass('on');
			$('#mini video').addClass('custom-video');
			$('#remote_container').append($('#mini video')[0]);
			$('#mini').html('');
			$('#remote_container .custom-video')[0].play();
		}
		_gaq.push(['_trackEvent', 'Controls', 'Screen received']);
	}
	this.onScreenStopped = function () {
		if ($('#screen_sharing video').length == 0) {
			$('#screen_sharing').removeClass('on').removeClass('minimized');
			$('#remote_container').removeClass('minimized');
			$('#mini').append($('#remote_container .custom-video')[0]);
			$('#remote_container .custom-video').remove();
			$('#mini video')[0].play();
		}
	}
	window.videolinkPlatformScreenSharing.setExtentionId(terms.screen_extension_id);
	window.videolinkPlatformScreenSharing.onInstall(function () {
		alert('Page will be reloaded to activate screen sharing extension.');
		if (window.personalRoom && window.initialized) {
			$.cookie('start_call', 1);
		}
		location.reload();
	})
}
window.conferenceScreenSharing = new ConferenceScreenSharing();
window.videolinkPlatformScreenSharing.addEventListener('ended', function () {
	$('#shareControl').removeClass('active');
})

function listener(event) {
	if (event.data == 'not_supported') {
		$('#enable_sharing').modal();
		window.conferenceScreenSharing.shareUnscreen();
	} else if (event.data == 'shared') {
		window.conferenceScreenSharing.startScreenSharing();
	}
}
if (window.addEventListener) {
	addEventListener("message", listener, false)
} else {
	attachEvent("onmessage", listener)
}(function ($) {
	"use strict";
	var defaultOptions = {
		tagClass: function (item) {
			return 'label label-info';
		},
		itemValue: function (item) {
			return item ? item.toString() : item;
		},
		itemText: function (item) {
			return this.itemValue(item);
		},
		freeInput: true,
		addOnBlur: true,
		maxTags: undefined,
		maxChars: undefined,
		confirmKeys: [13, 44],
		onTagExists: function (item, $tag) {
			$tag.hide().fadeIn();
		},
		trimValue: false,
		allowDuplicates: false
	};

	function TagsInput(element, options) {
		this.itemsArray = [];
		this.$element = $(element);
		this.$element.hide();
		this.isSelect = (element.tagName === 'SELECT');
		this.multiple = (this.isSelect && element.hasAttribute('multiple'));
		this.objectItems = options && options.itemValue;
		this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
		this.inputSize = Math.max(1, this.placeholderText.length);
		this.$container = $('<div class="bootstrap-tagsinput"></div>');
		this.$input = $('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);
		this.$element.after(this.$container);
		var inputWidth = (this.inputSize < 3 ? 3 : this.inputSize) + "em";
		this.$input.get(0).style.cssText = "width: " + inputWidth + " !important;";
		this.build(options);
	}
	TagsInput.prototype = {
		constructor: TagsInput,
		add: function (item, dontPushVal) {
			var self = this;
			if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags) return;
			if (item !== false && !item) return;
			if (typeof item === "string" && self.options.trimValue) {
				item = $.trim(item);
			}
			if (typeof item === "object" && !self.objectItems) throw ("Can't add objects when itemValue option is not set");
			if (item.toString().match(/^\s*$/)) return;
			if (self.isSelect && !self.multiple && self.itemsArray.length > 0) self.remove(self.itemsArray[0]);
			if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
				var items = item.split(',');
				if (items.length > 1) {
					for (var i = 0; i < items.length; i++) {
						this.add(items[i], true);
					}
					if (!dontPushVal) self.pushVal();
					return;
				}
			}
			var itemValue = self.options.itemValue(item),
				itemText = self.options.itemText(item),
				tagClass = self.options.tagClass(item);
			var existing = $.grep(self.itemsArray, function (item) {
				return self.options.itemValue(item) === itemValue;
			})[0];
			if (existing && !self.options.allowDuplicates) {
				if (self.options.onTagExists) {
					var $existingTag = $(".tag", self.$container).filter(function () {
						return $(this).data("item") === existing;
					});
					self.options.onTagExists(item, $existingTag);
				}
				return;
			}
			if (self.items().toString().length + item.length + 1 > self.options.maxInputLength) return;
			var beforeItemAddEvent = $.Event('beforeItemAdd', {
				item: item,
				cancel: false
			});
			self.$element.trigger(beforeItemAddEvent);
			if (beforeItemAddEvent.cancel) return;
			self.itemsArray.push(item);
			var $tag = $('<span class="tag ' + htmlEncode(tagClass) + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
			$tag.data('item', item);
			self.findInputWrapper().before($tag);
			$tag.after(' ');
			if (self.isSelect && !$('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element)[0]) {
				var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
				$option.data('item', item);
				$option.attr('value', itemValue);
				self.$element.append($option);
			}
			if (!dontPushVal) self.pushVal();
			if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength) self.$container.addClass('bootstrap-tagsinput-max');
			self.$element.trigger($.Event('itemAdded', {
				item: item
			}));
		},
		remove: function (item, dontPushVal) {
			var self = this;
			if (self.objectItems) {
				if (typeof item === "object") item = $.grep(self.itemsArray, function (other) {
					return self.options.itemValue(other) == self.options.itemValue(item);
				});
				else item = $.grep(self.itemsArray, function (other) {
					return self.options.itemValue(other) == item;
				});
				item = item[item.length - 1];
			}
			if (item) {
				var beforeItemRemoveEvent = $.Event('beforeItemRemove', {
					item: item,
					cancel: false
				});
				self.$element.trigger(beforeItemRemoveEvent);
				if (beforeItemRemoveEvent.cancel) return;
				$('.tag', self.$container).filter(function () {
					return $(this).data('item') === item;
				}).remove();
				$('option', self.$element).filter(function () {
					return $(this).data('item') === item;
				}).remove();
				if ($.inArray(item, self.itemsArray) !== -1) self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
			}
			if (!dontPushVal) self.pushVal();
			if (self.options.maxTags > self.itemsArray.length) self.$container.removeClass('bootstrap-tagsinput-max');
			self.$element.trigger($.Event('itemRemoved', {
				item: item
			}));
		},
		removeAll: function () {
			var self = this;
			$('.tag', self.$container).remove();
			$('option', self.$element).remove();
			while (self.itemsArray.length > 0)
			self.itemsArray.pop();
			self.pushVal();
		},
		refresh: function () {
			var self = this;
			$('.tag', self.$container).each(function () {
				var $tag = $(this),
					item = $tag.data('item'),
					itemValue = self.options.itemValue(item),
					itemText = self.options.itemText(item),
					tagClass = self.options.tagClass(item);
				$tag.attr('class', null);
				$tag.addClass('tag ' + htmlEncode(tagClass));
				$tag.contents().filter(function () {
					return this.nodeType == 3;
				})[0].nodeValue = htmlEncode(itemText);
				if (self.isSelect) {
					var option = $('option', self.$element).filter(function () {
						return $(this).data('item') === item;
					});
					option.attr('value', itemValue);
				}
			});
		},
		items: function () {
			return this.itemsArray;
		},
		pushVal: function () {
			var self = this,
				val = $.map(self.items(), function (item) {
					return self.options.itemValue(item).toString();
				});
			self.$element.val(val, true).trigger('change');
		},
		build: function (options) {
			var self = this;
			self.options = $.extend({}, defaultOptions, options);
			if (self.objectItems) self.options.freeInput = false;
			makeOptionItemFunction(self.options, 'itemValue');
			makeOptionItemFunction(self.options, 'itemText');
			makeOptionFunction(self.options, 'tagClass');
			if (self.options.typeahead) {
				var typeahead = self.options.typeahead || {};
				makeOptionFunction(typeahead, 'source');
				self.$input.typeahead($.extend({}, typeahead, {
					source: function (query, process) {
						function processItems(items) {
							var texts = [];
							for (var i = 0; i < items.length; i++) {
								var text = self.options.itemText(items[i]);
								map[text] = items[i];
								texts.push(text);
							}
							process(texts);
						}
						this.map = {};
						var map = this.map,
							data = typeahead.source(query);
						if ($.isFunction(data.success)) {
							data.success(processItems);
						} else if ($.isFunction(data.then)) {
							data.then(processItems);
						} else {
							$.when(data).then(processItems);
						}
					},
					updater: function (text) {
						self.add(this.map[text]);
					},
					matcher: function (text) {
						return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
					},
					sorter: function (texts) {
						return texts.sort();
					},
					highlighter: function (text) {
						var regex = new RegExp('(' + this.query + ')', 'gi');
						return text.replace(regex, "<strong>$1</strong>");
					}
				}));
			}
			if (self.options.typeaheadjs) {
				var typeaheadjs = self.options.typeaheadjs || {};
				self.$input.typeahead(null, typeaheadjs).on('typeahead:selected', $.proxy(function (obj, datum) {
					if (typeaheadjs.valueKey) self.add(datum[typeaheadjs.valueKey]);
					else self.add(datum);
					self.$input.typeahead('val', '');
				}, self));
			}
			self.$container.on('click', $.proxy(function (event) {
				if (!self.$element.attr('disabled')) {
					self.$input.removeAttr('disabled');
				}
				self.$input.focus();
			}, self));
			if (self.options.addOnBlur && self.options.freeInput) {
				self.$input.on('focusout', $.proxy(function (event) {
					if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
						self.add(self.$input.val());
						self.$input.val('');
					}
				}, self));
			}
			self.$container.on('keydown', 'input', $.proxy(function (event) {
				var $input = $(event.target),
					$inputWrapper = self.findInputWrapper();
				if (self.$element.attr('disabled')) {
					self.$input.attr('disabled', 'disabled');
					return;
				}
				switch (event.which) {
				case 8:
					if (doGetCaretPosition($input[0]) === 0) {
						var prev = $inputWrapper.prev();
						if (prev) {
							self.remove(prev.data('item'));
						}
					}
					break;
				case 46:
					if (doGetCaretPosition($input[0]) === 0) {
						var next = $inputWrapper.next();
						if (next) {
							self.remove(next.data('item'));
						}
					}
					break;
				case 37:
					var $prevTag = $inputWrapper.prev();
					if ($input.val().length === 0 && $prevTag[0]) {
						$prevTag.before($inputWrapper);
						$input.focus();
					}
					break;
				case 39:
					var $nextTag = $inputWrapper.next();
					if ($input.val().length === 0 && $nextTag[0]) {
						$nextTag.after($inputWrapper);
						$input.focus();
					}
					break;
				default:
				}
				var textLength = $input.val().length,
					wordSpace = Math.ceil(textLength / 5),
					size = textLength + wordSpace + 1;
				$input.attr('size', Math.max(this.inputSize, $input.val().length));
			}, self));
			self.$container.on('keypress', 'input', $.proxy(function (event) {
				var $input = $(event.target);
				if (self.$element.attr('disabled')) {
					self.$input.attr('disabled', 'disabled');
					return;
				}
				var text = $input.val(),
					maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
				if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
					self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
					$input.val('');
					event.preventDefault();
				}
				var textLength = $input.val().length,
					wordSpace = Math.ceil(textLength / 5),
					size = textLength + wordSpace + 1;
				$input.attr('size', Math.max(this.inputSize, $input.val().length));
			}, self));
			self.$container.on('click', '[data-role=remove]', $.proxy(function (event) {
				if (self.$element.attr('disabled')) {
					return;
				}
				self.remove($(event.target).closest('.tag').data('item'));
			}, self));
			if (self.options.itemValue === defaultOptions.itemValue) {
				if (self.$element[0].tagName === 'INPUT') {
					self.add(self.$element.val());
				} else {
					$('option', self.$element).each(function () {
						self.add($(this).attr('value'), true);
					});
				}
			}
		},
		destroy: function () {
			var self = this;
			self.$container.off('keypress', 'input');
			self.$container.off('click', '[role=remove]');
			self.$container.remove();
			self.$element.removeData('tagsinput');
			self.$element.show();
		},
		focus: function () {
			this.$input.focus();
		},
		input: function () {
			return this.$input;
		},
		findInputWrapper: function () {
			var elt = this.$input[0],
				container = this.$container[0];
			while (elt && elt.parentNode !== container)
			elt = elt.parentNode;
			return $(elt);
		}
	};
	$.fn.tagsinput = function (arg1, arg2) {
		var results = [];
		this.each(function () {
			var tagsinput = $(this).data('tagsinput');
			if (!tagsinput) {
				tagsinput = new TagsInput(this, arg1);
				$(this).data('tagsinput', tagsinput);
				results.push(tagsinput);
				if (this.tagName === 'SELECT') {
					$('option', $(this)).attr('selected', 'selected');
				}
				$(this).val($(this).val());
			} else if (!arg1 && !arg2) {
				results.push(tagsinput);
			} else if (tagsinput[arg1] !== undefined) {
				var retVal = tagsinput[arg1](arg2);
				if (retVal !== undefined) results.push(retVal);
			}
		});
		if (typeof arg1 == 'string') {
			return results.length > 1 ? results : results[0];
		} else {
			return results;
		}
	};
	$.fn.tagsinput.Constructor = TagsInput;

	function makeOptionItemFunction(options, key) {
		if (typeof options[key] !== 'function') {
			var propertyName = options[key];
			options[key] = function (item) {
				return item[propertyName];
			};
		}
	}

	function makeOptionFunction(options, key) {
		if (typeof options[key] !== 'function') {
			var value = options[key];
			options[key] = function () {
				return value;
			};
		}
	}
	var htmlEncodeContainer = $('<div />');

	function htmlEncode(value) {
		if (value) {
			return htmlEncodeContainer.text(value).html();
		} else {
			return '';
		}
	}

	function doGetCaretPosition(oField) {
		var iCaretPos = 0;
		if (document.selection) {
			oField.focus();
			var oSel = document.selection.createRange();
			oSel.moveStart('character', -oField.value.length);
			iCaretPos = oSel.text.length;
		} else if (oField.selectionStart || oField.selectionStart == '0') {
			iCaretPos = oField.selectionStart;
		}
		return (iCaretPos);
	}

	function keyCombinationInList(keyPressEvent, lookupList) {
		var found = false;
		$.each(lookupList, function (index, keyCombination) {
			if (typeof(keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
				found = true;
				return false;
			}
			if (keyPressEvent.which === keyCombination.which) {
				var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
					shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
					ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
				if (alt && shift && ctrl) {
					found = true;
					return false;
				}
			}
		});
		return found;
	}
	$(function () {
		$("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
	});
})(window.jQuery);
if (typeof jQuery === 'undefined') {
	throw new Error('MultiEmail\'s JavaScript requires jQuery')
}(function ($) {
	'use strict';
	if ($.validator) {
		$.validator.addMethod("multiEmail", function (value, element, params) {
			if ($(element).val() == "") {
				return true;
			}
			else {
				return $(element).data('multiEmail').isValid()
			}
		}, "One or more email address(es) are not valid.");
	}

	function MultiEmail(element, options) {
		var self = this;
		this.$element = $(element);
		this.$element.tagsinput({
			maxTags: 10,
			trimValue: true,
			confirmKeys: [13, 32, 186, 188],
			tagClass: function (item) {
				if (self.validEmail(item)) {
					return "valid";
				}
				else {
					return "invalid";
				}
			}
		});
		this.container().addClass('bootstrap-multiemail');
		this.build();
	}
	MultiEmail.prototype = {
		constructor: MultiEmail,
		invalidItems: [],
		build: function () {
			var self = this;
			this.$element.on('itemAdded', function (event) {
				if (!self.validEmail(event.item)) {
					self.invalidItems.push(event.item);
					self.$element.blur();
				}
			});
			this.$element.on('itemRemoved', function (event) {
				if (self.invalidItems.indexOf(event.item) > -1) {
					self.invalidItems.splice(self.invalidItems.indexOf(event.item), 1);
					self.$element.blur();
				}
			});
			this.container().on('keydown', 'input', function (event) {
				if (event.which == 9) {
					self.addPending();
				}
				self.input().attr('size', self.input().val().length + 1);
			})
			this.container().on('blur', 'input', function () {
				self.$element.blur();
			});
		},
		input: function () {
			return this.$element.tagsinput('input');
		},
		container: function () {
			return this.$element.tagsinput('input').parents('.bootstrap-tagsinput');
		},
		validEmail: function (item) {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(item);
		},
		isValid: function () {
			return !(this.invalidItems.length > 0);
		},
		add: function (item) {
			return this.$element.tagsinput('add', item);
		},
		removeAll: function () {
			return this.$element.tagsinput('removeAll');
		},
		addPending: function () {
			this.add(this.input().val());
			this.input().val('');
		}
	}
	$.fn.multiEmail = function (arg1, arg2) {
		var results = [];
		this.each(function () {
			var multiEmail = $(this).data('multiEmail');
			if (!multiEmail) {
				multiEmail = new MultiEmail(this, arg1);
				$(this).data('multiEmail', multiEmail);
				results.push(multiEmail);
			} else {
				var retVal = multiEmail[arg1](arg2);
				if (retVal !== undefined) results.push(retVal);
			}
		});
		if (typeof arg1 == 'string') {
			return results.length > 1 ? results : results[0];
		} else {
			return results;
		}
	};
	$(function () {
		$("input[data-role=multiemail], select[multiple][data-role=multiemail], textarea[data-role=multiemail]").multiEmail();
	});
})(window.jQuery);
LazyLoad = (function (doc) {
	var env, head, pending = {},
		pollCount = 0,
		queue = {
			css: [],
			js: []
		},
		styleSheets = doc.styleSheets;

	function createNode(name, attrs) {
		var node = doc.createElement(name),
			attr;
		for (attr in attrs) {
			if (attrs.hasOwnProperty(attr)) {
				node.setAttribute(attr, attrs[attr]);
			}
		}
		return node;
	}

	function finish(type) {
		var p = pending[type],
			callback, urls;
		if (p) {
			callback = p.callback;
			urls = p.urls;
			urls.shift();
			pollCount = 0;
			if (!urls.length) {
				callback && callback.call(p.context, p.obj);
				pending[type] = null;
				queue[type].length && load(type);
			}
		}
	}

	function getEnv() {
		var ua = navigator.userAgent;
		env = {
			async: doc.createElement('script').async === true
		};
		(env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE|Trident/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true);
	}

	function load(type, urls, callback, obj, context) {
		var _finish = function () {
			finish(type);
		},
			isCSS = type === 'css',
			nodes = [],
			i, len, node, p, pendingUrls, url;
		env || getEnv();
		if (urls) {
			urls = typeof urls === 'string' ? [urls] : urls.concat();
			if (isCSS || env.async || env.gecko || env.opera) {
				queue[type].push({
					urls: urls,
					callback: callback,
					obj: obj,
					context: context
				});
			} else {
				for (i = 0, len = urls.length; i < len; ++i) {
					queue[type].push({
						urls: [urls[i]],
						callback: i === len - 1 ? callback : null,
						obj: obj,
						context: context
					});
				}
			}
		}
		if (pending[type] || !(p = pending[type] = queue[type].shift())) {
			return;
		}
		head || (head = doc.head || doc.getElementsByTagName('head')[0]);
		pendingUrls = p.urls.concat();
		for (i = 0, len = pendingUrls.length; i < len; ++i) {
			url = pendingUrls[i];
			if (isCSS) {
				node = env.gecko ? createNode('style') : createNode('link', {
					href: url,
					rel: 'stylesheet'
				});
			} else {
				node = createNode('script', {
					src: url
				});
				node.async = false;
			}
			node.className = 'lazyload';
			node.setAttribute('charset', 'utf-8');
			if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
				node.onreadystatechange = function () {
					if (/loaded|complete/.test(node.readyState)) {
						node.onreadystatechange = null;
						_finish();
					}
				};
			} else if (isCSS && (env.gecko || env.webkit)) {
				if (env.webkit) {
					p.urls[i] = node.href;
					pollWebKit();
				} else {
					node.innerHTML = '@import "' + url + '";';
					pollGecko(node);
				}
			} else {
				node.onload = node.onerror = _finish;
			}
			nodes.push(node);
		}
		for (i = 0, len = nodes.length; i < len; ++i) {
			head.appendChild(nodes[i]);
		}
	}

	function pollGecko(node) {
		var hasRules;
		try {
			hasRules = !! node.sheet.cssRules;
		} catch (ex) {
			pollCount += 1;
			if (pollCount < 200) {
				setTimeout(function () {
					pollGecko(node);
				}, 50);
			} else {
				hasRules && finish('css');
			}
			return;
		}
		finish('css');
	}

	function pollWebKit() {
		var css = pending.css,
			i;
		if (css) {
			i = styleSheets.length;
			while (--i >= 0) {
				if (styleSheets[i].href === css.urls[0]) {
					finish('css');
					break;
				}
			}
			pollCount += 1;
			if (css) {
				if (pollCount < 200) {
					setTimeout(pollWebKit, 50);
				} else {
					finish('css');
				}
			}
		}
	}
	return {
		css: function (urls, callback, obj, context) {
			load('css', urls, callback, obj, context);
		},
		js: function (urls, callback, obj, context) {
			load('js', urls, callback, obj, context);
		}
	};
})(this.document);
var INVITATION_SENT = terms.room_invitation_sent;
var WRONG_ANSWER_TO_CAPTCHA = terms.captcha_wrong;
var FEEDBACK_SENT = terms.feedback_sent;
var HELPBOX_HIDDEN_BOTTOM = -200;
var chatVisible = false;
window.helpboxTimeout = null;
window.statusCheckInitialized = false;
window.initialized = false;
window.callHost = false;
jQuery.fn.shake = function (shakes, distance, duration) {
	if (shakes > 0) {
		this.each(function () {
			var $el = $(this);
			var left = $el.css('left');
			$el.animate({
				left: "-=" + distance
			}, duration, function () {
				$el.animate({
					left: "+=" + distance * 2
				}, duration, function () {
					$el.animate({
						left: left
					}, duration, function () {
						$el.shake(shakes - 1, distance, duration);
					});
				});
			});
		});
	}
	return this;
};

function checkSessionStatus() {
	$.get('/status', function (statusResponse) {
		if (statusResponse.emailAlerts.length > 0) {
			for (var i in statusResponse.emailAlerts) {
				var alert = statusResponse.emailAlerts[i];
				$.pnotify({
					title: terms.room_email_delivery_error,
					text: '<p style="margin-top:10px;margin-bottom:5px">' + terms.room_email_delivery_error_text1 + ' <b>' + alert['email'] + '</b> ' + terms.room_email_delivery_error_text2 + '</p><p style="margin-bottom:5px">' + terms.room_email_delivery_error_text3 + ' ' + alert['reason'].replace(/\n/g, '<br>') + '</p>',
					type: 'error',
					hide: false,
					width: 'auto',
					sticker: false
				});
			}
		}
		setTimeout(function () {
			checkSessionStatus();
		}, 3000);
	})
}

function initStatusCheck() {
	if (!window.statusCheckInitialized) {
		window.statusCheckInitialized = true;
		$.pnotify.defaults.history = false;
		checkSessionStatus();
	}
}
window.activateRemarketingTag = function (conversionId, conversionLabel) {
	var img = document.createElement("img");
	img.onload = function () {
		return;
	};
	img.src = "//googleads.g.doubleclick.net/pagead/viewthroughconversion/" + conversionId + "/?value=0&label=" + conversionLabel + "&guid=ON&script=0&random=" + new Date().getTime();
}
$(function () {
	if (location.href.indexOf('/start') == -1 && window.location.hash == '') {
		var firstVisit = $.cookie('first_visit');
		if (!firstVisit) {
			if (!window.personalRoom) {
				showHelpBox();
			}
			$.cookie('first_visit', new Date(), {
				expires: 365 * 100,
				path: '/'
			});
		}
	}
	$('#help_bottom_block').css('bottom', HELPBOX_HIDDEN_BOTTOM + 'px');
	$('#roompass_block').modal({
		show: false
	});
	$('#roompass_prompt').modal({
		show: false
	});
	$('#not_supported').modal({
		show: false
	});
	$('#send_feedback').modal({
		show: false
	});
	window.isFirefox = (navigator.userAgent.indexOf('Firefox/2') > 0);
	var personalRoomOwner = window.personalRoom && window.roomOwner;
	if (!personalRoomOwner) {
		requestConnectionType();
	} else {
		initInterface();
	}
	if ($.cookie('last_banner_show') == null || $.cookie('last_banner_show') < (new Date().getTime() - 86400 * 1000)) {
		$.cookie('last_banner_show', new Date().getTime());
		$('.footer_ad').show();
		$('.footer_ad').animate({
			bottom: '-20px'
		});
	}
	$('#muteControl').click(function () {
		_gaq.push(['_trackEvent', 'Controls', 'Mute']);
		if (window.webrtcConnection.isMuted) {
			window.webrtcConnection.unmute();
			$('#muteControl').removeClass('active');
		} else {
			window.webrtcConnection.mute();
			$('#muteControl').addClass('active');
		}
	})
	$('#muteCameraControl').click(function () {
		_gaq.push(['_trackEvent', 'Controls', 'Mute camera']);
		if (!window.webrtcConnection.vlRoom.isWebcamShared()) {
			console.log('unmute webcam');
			window.webrtcConnection.vlRoom.unmuteWebcam();
			$('#muteCameraControl').removeClass('active');
		} else {
			console.log('mute webcam');
			window.webrtcConnection.vlRoom.muteWebcam();
			$('#muteCameraControl').addClass('active');
		}
	})
	$('#addUserControl').click(function () {
		_gaq.push(['_trackEvent', 'Controls', 'Add user']);
		setLocationToStartPopup();
		$('#startit').modal('show');
	})
	$('#shareControl').click(function () {
		window.conferenceScreenSharing.shareScreen();
	})
	$('#shareFile').click(function () {
		if ($('#file-sharing-container').css('display') == 'none') {
			var fileSharingContainer = $('#file-sharing-container');
			fileSharingContainer.css('bottom', '-65px');
			fileSharingContainer.show();
			fileSharingContainer.animate({
				bottom: 38
			}, 100);
			$('#shareFile').addClass('active');
		} else {
			$('#file-sharing-container').animate({
				bottom: '-100px'
			}, 100, function () {
				$('#file-sharing-container').hide();
				$('#shareFile').removeClass('active');
			});
		}
	})
	$('#ratebox .clickable').click(function () {
		$.cookie('rated', 1);
		location.href = 'https://chrome.google.com/webstore/detail/videolink2me/hbhickbdbnacieekojgdhpimcomkgami/reviews';
	})
	$('#faq_link').click(function () {
		$('#faq').modal();
	})
	$('.faqs dd').hide();
	$('.faqs dt').hover(function () {
		$(this).addClass('hover')
	}, function () {
		$(this).removeClass('hover')
	}).click(function () {
		var currentTarget = $(this).next();
		$('.faqs dd').each(function () {
			if ($(this).html() != currentTarget.html()) {
				$(this).slideUp('fast');
			}
		})
		currentTarget.slideToggle('normal');
	});
	$('.conference_controls a').tooltip();
	if ($('#appointment-start-date').length > 0) {
		$('#appointment-start-date').datepicker().on('changeDate', function (ev) {
			$('#appointment-start-date').datepicker('hide');
			setAppointmentSettings();
		});
		$('#appointment-start-date').datepicker('setValue', new Date());
		$('#schedule-appointment').prop('checked', false);
		$('#schedule-appointment').change(function () {
			var parentDialog = $('#schedule-appointment').parents('div.modal')[0];
			if ($(this).prop('checked')) {
				$('.appointment-settings').slideDown('fast');
				$(parentDialog).addClass('expanded');
				setAppointmentSettings();
			} else {
				$('.appointment-settings').slideUp('fast');
				$(parentDialog).removeClass('expanded');
				cancelAppointment();
			}
		})
		$('#appointment-start-time').timepicker({
			minuteStep: 5,
			showMeridian: false,
			template: 'dropdown'
		});
		$('#appointment-start-time, .bootstrap-timepicker span.form-control-feedback').click(function () {
			$('#appointment-start-time').timepicker('showWidget');
		})
		var setAppointmentSettings = function () {
			var datetime = $('#appointment-start-date').val() + ' ' + $('#appointment-start-time').val();
			$.post('/service/schedule', {
				id: getCurrentRoom(),
				datetime: datetime
			}, function () {
				_gaq.push(['_trackEvent', 'Conference', 'Setup appointment']);
				setupAppointment(datetime);
			});
		}
		var cancelAppointment = function () {
			$.get('/service/unschedule/' + getCurrentRoom(), function () {
				$('.appointment-summary .datetime').html();
				$('.appointment-summary').hide();
				$('#schedule-appointment').prop('checked', false);
				$('#schedule-appointment').prop('disabled', false);
			});
		}
		$('#appointment-start-time').change(setAppointmentSettings);
	}
	$('#languageSelector').click(function () {
		if ($('.language-menu').css('display') == 'block') {
			$('.language-menu').hide();
		} else {
			$('.language-menu').css('left', $('#languageSelector').offset().left - 16);
			$('.language-menu a').each(function () {
				if (window.personalRoom) {
					var roomLink = getCurrentRoomIdForPersonalRoom() + (window.currentProtocol && window.currentProtocol == 'fl' ? '?mode=fl' : '');
				} else {
					var roomLink = (window.currentProtocol && window.currentProtocol == 'fl' ? '?mode=fl' : '') + '#' + getCurrentRoom();
				}
				$(this).attr('href', $(this).attr('base-href') + roomLink);
			})
			$('.language-menu').show();
		}
	})
	$('body').click(function (e) {
		if ($(e.target).attr('id') != 'languageSelector' && !$(e.target).hasClass('language-menu')) {
			if ($('.language-menu').css('display') == 'block') {
				$('.language-menu').hide();
			}
		}
	})
	$('.language-menu a').click(function () {
		_gaq.push(['_trackEvent', 'Controls', 'Language']);
	})
	$('#sharebutton-small-onetime').click(function () {
		if ($('#sharebar').css('display') == 'none') {
			$('#sharebar').fadeIn('fast');
		} else {
			$('#sharebar').fadeOut('fast');
		}
	})
	$('#cancelEmailSending').click(function () {
		$('#sendInvite').hide();
		$('#invite-by-email').removeClass('disabled');
		var parentDialog = $('#sendInvite').parents('div.modal')[0];
		$(parentDialog).removeClass('expanded').removeClass('tiny');
	})
	$('#confirm .confirm-success').click(function () {
		hideAdapterPopup('confirm');
		window.currentConfirmCallback(window.currentConfirmCallbackParams);
	})
	if ($('#recipientMail').length > 0) {
		$('#recipientMail').multiEmail();
	}
});

function setupAppointment(datetime) {
	console.log('Setup appointment at ' + datetime);
}

function showHelpBox() {
	if ($('#welcome_help').length > 0) {
		$('#welcome_help').modal('show');
	}
}

function startConference() {
	$('#welcome_help').modal('hide');
}

function showFeedbackForm() {
	$('#send_feedback #captcha_holder img').attr('src', '/captcha');
	$('#send_feedback').modal('show');
	$('#send_feedback input, #send_feedback textarea').each(function () {
		$(this).focus();
		$(this).blur();
	})
}

function sendFeedback(config) {
	var error = false;
	$('.error_box').hide();
	$('#send_feedback input.input-xlarge').css('border-color', '#ccc');
	$('#send_feedback textarea').css('border-color', '#ccc');
	if ($('#feedback_name').val() == '') {
		$('#feedback_no_name').show();
		$('#feedback_name').css('border-color', 'red');
		error = true;
	}
	if ($('#feedback_email').val() == '' || !validateEmail($('#feedback_email').val())) {
		$('#feedback_no_email').show();
		$('#feedback_email').css('border-color', 'red');
		error = true;
	}
	if ($('#feedback_text').val() == '') {
		$('#feedback_no_text').show();
		$('#feedback_text').css('border-color', 'red');
		error = true;
	}
	if ($('#feedback_captcha').val() == '') {
		$('#feedback_captcha').css('border-color', 'red');
		$('#captcha_error').show();
		error = true;
	}
	if (error) return;
	if (config && config.before) {
		config.before();
	}
	var feedbackSubmitButton = $('#send_feedback .btn-primary');
	feedbackSubmitButton.html(terms.saving);
	feedbackSubmitButton.prop('disabled', true);
	$.post('/feedback', {
		name: $('#feedback_name').val(),
		email: $('#feedback_email').val(),
		text: $('#feedback_text').val(),
		captcha: $('#feedback_captcha').val(),
		ua: navigator.userAgent
	}, function (data) {
		feedbackSubmitButton.html(terms.send);
		feedbackSubmitButton.prop('disabled', false);
		if (data == 'captcha_error') {
			$('#feedback_captcha').css('border-color', 'red');
			$('#captcha_error').show();
			$('#send_feedback').shake(1, 20, 50);
			if (config && config.error) {
				config.error();
			}
		} else {
			if (!config || config.noModal !== true) {
				$('#send_feedback').modal('hide');
			}
			if (config && config.success) {
				config.success();
			}
			showAlert(FEEDBACK_SENT)
		}
	});
}

function sendProblem() {
	$('#problem_description, #problem_reporter').css('border-color', '#ccc');
	if ($('#problem_description').val() == '') {
		$('#problem_description').css('border-color', 'red');
		return;
	}
	if ($('#problem_reporter').val() == '') {
		$('#problem_reporter').css('border-color', 'red');
		return;
	}
	$('#describe_a_problem').modal('hide');
	$.post('/problem', {
		desc: $('#problem_reporter').val() + ': ' + $('#problem_description').val(),
		log: window.logList,
		ua: navigator.userAgent
	});
	showAlert(FEEDBACK_SENT);
}

function getLinkToRoom() {
	if (window.personalRoom) {
		var loc = location.href.toString().split('#');
		return loc[0];
	} else {
		var loc = window.location.toString().split('#');
		if (loc[0].indexOf('?') > -1) {
			loc[0] = loc[0].substring(0, loc[0].indexOf('?'));
		}
		return loc[0] + 'o/' + loc[1];
	}
}

function setLocationToStartPopup() {
	var location = getLinkToRoom();
	if (document.getElementById('conf_link')) document.getElementById('conf_link').innerHTML = location;
	document.getElementById('conf_link1').value = location;
}

function sendToFacebook(to) {
	var properties = {
		method: 'send',
		name: terms.room_invitation_to_conference,
		link: getLinkToRoom()
	}
	if (to) properties.to = to;
	FB.ui(properties);
}

function initialize(callHost) {
	window.initialized = true;
	window.callHost = callHost === true;
	if (!window.webrtcConnection) {
		if ($('#calls_history').length > 0) {
			$('#calls_history').addClass('hide');
		}
		var readyCallback = function () {
			$('#chat_is_open').show();
			$('#conference_created').show();
			if (window.showIntroPopup !== false) {
				$('#startit').modal('show');
			}
			window.webrtcConnection.roomCreator = true;
		}
		var needPasswordCallback = function () {
			$('#roompass_prompt').modal('show');
			$('#roompass_prompt #pass').focus();
		}
		var onSuccessCallback = function (room_id) {
			setLocationToStartPopup();
			setStatus("");
		}
		window.webrtcConnection = new ConferenceConnection(readyCallback, needPasswordCallback, onSuccessCallback);
	} else {
		window.webrtcConnection.setupEventHandler();
		window.webrtcConnection.setupInterface();
	}
}

function checkPassword() {
	window.webrtcConnection.checkPassword();
	return false;
}

function hangup() {
	window.webrtcConnection.hangup();
	$('.waiting_connection').hide();
	hideChatBox();
}

function setRoomPassword() {
	window.webrtcConnection.setRoomPassword($('#room_pass').val());
	$('#roompass_block').modal('hide');
	$('#chat_is_open').hide();
}

function setStatus(state) {}

function showInviteForm() {
	if ($.cookie('inviteName') != '') {
		$('#invitatorName').val($.cookie('inviteName'));
	}
	if ($.cookie('inviteEmail') != '') {
		$('#invitatorEmail').val($.cookie('inviteEmail'));
	}
	$('#sendInvite').slideDown();
	var parentDialog = $('#sendInvite').parents('div.modal')[0];
	$(parentDialog).addClass('expanded').addClass('tiny');
	$('.invite-by-email').addClass('disabled');
}

function showCaptchaForm() {
	$('#captcha_code').attr('src', 'captcha?generate=y');
	$('#captcha_prompt').modal('show');
	$('#captcha_code').focus();
}
var captchaChecked = false;

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function sendInvite() {
	var name = $('#invitatorName').val();
	var replyTo = $('#invitatorEmail').val();
	var mail = $('#recipientMail').val();
	$('#invitatorName').removeClass('invalidField');
	$('#recipientMail').removeClass('invalidField');
	$('#invitatorEmail').removeClass('invalidField');
	$('#sendInviteWrongEmail').slideUp();
	var autocompleteValue = $('#recipientMail').parent().find('.bootstrap-multiemail input').val();
	if (mail == '' && autocompleteValue != '') {
		$('#recipientMail').val(autocompleteValue);
		mail = autocompleteValue;
	}
	if (name == '') {
		$('#invitatorName').addClass('invalidField');
	}
	var validReplyTo = (replyTo != '' && validateEmail(replyTo));
	if (!validReplyTo) {
		$('#invitatorEmail').addClass('invalidField');
	}
	var validEmail = mail != '' && $('#recipientMail').data('multiEmail').isValid()
	if (!validEmail) {
		$('#recipientMail').addClass('invalidField');
		if (mail != '' && !validateEmail(mail)) {
			$('#sendInviteWrongEmail').slideDown();
		}
	}
	if (name != '' && validEmail && validReplyTo) {
		if (captchaChecked) {
			checkInvitationForm(true);
		} else {
			if ($('#invite').css('display') == 'block') {
				$('#invite').modal('hide');
			} else {
				$('#startit').modal('hide');
			}
			showCaptchaForm();
		}
	}
	return false;
}

function sendEmailInviteToContact(invitatorName, guestEmail, callback) {
	$.post('/invite', {
		name: invitatorName,
		email: guestEmail,
		room: getCurrentRoom(),
		personal: (window.personal_room ? '1' : '0'),
		contact: '1'
	}, function (data) {
		callback(data);
	});
}

function checkInvitationForm(skipCheck) {
	$('#prompt_captcha_error').hide();
	var code = $('#prompt_captcha').val();
	if (code == '') {
		$('#prompt_captcha_error').show();
	} else {
		if (skipCheck == true) {
			code = null;
			$('#invite_submit').hide();
			$('#invite_loader').show();
		} else {
			$('#captcha_popup_submit').hide();
			$('#captcha_loader').show();
		}
		$.cookie('inviteName', $('#invitatorName').val());
		$.cookie('inviteEmail', $('#invitatorEmail').val());
		$.post('/invite', {
			name: $('#invitatorName').val(),
			replyTo: $('#invitatorEmail').val(),
			email: $('#recipientMail').val(),
			room: getCurrentRoom(),
			personal: (window.personal_room ? '1' : '0'),
			captcha: code
		}, function (data) {
			if (skipCheck) {
				$('#invite_submit').show();
				$('#invite_loader').hide();
			} else {
				$('#captcha_loader').hide();
				$('#captcha_popup_submit').show();
			}
			if (data == 'captcha_error') {
				if ($('#captcha_prompt').css('display') == 'none') {
					$('#startit').modal('hide');
					$('#prompt_captcha').val('');
					showCaptchaForm();
				} else {
					$('#prompt_captcha').css('border-color', 'red');
					$('#prompt_captcha_error').show();
					$('#captcha_prompt').reCke(1, 20, 50);
				}
			} else {
				captchaChecked = true;
				$('#captcha_prompt').modal('hide');
				$('#recipientMail').val('');
				$('#sendInvite').hide();
				$('#invite-by-email').removeClass('disabled');
				var parentDialog = $('#sendInvite').parents('div.modal')[0];
				$(parentDialog).removeClass('expanded').removeClass('tiny');
				if (!window.personal_room) {
					$('#startit').modal('show');
				}
				if (data != 'ok') {
					var emails = '';
					for (var i in data) {
						if (emails != '') emails += ", ";
						emails += data[i];
					}
					showAlert(terms.room_email_delivery_error + ": " + emails);
				} else {
					showAlert(INVITATION_SENT);
				}
				initStatusCheck();
			}
		});
	}
	return false;
}

function showWelcomeBox() {
	setLocationToStartPopup();
	$('#startit').modal('show')
}

function showAdapterPopup(id, text) {
	$('#' + id).find('.alert-text').html(text.replace("\n", '<br>'));
	$('#' + id).modal('show');
}

function hideAdapterPopup(id) {
	$('#' + id).modal('hide');
}

function showAlert(text) {
	if (window.personalRoom) {
		showAdapterPopup('alert', text);
	} else {
		alert(text);
	}
}
window.currentConfirmCallback = null;
window.currentConfirmCallbackParams = null;

function showConfirm(text, confirmedCallback, params) {
	if (window.personalRoom) {
		window.currentConfirmCallback = confirmedCallback;
		window.currentConfirmCallbackParams = params;
		showAdapterPopup('confirm', text);
	} else {
		if (confirm(text)) confirmedCallback(params);
	}
}
window.currentPromptCallback = null;

function showPrompt(text, callback, defaultValue) {
	if (window.personalRoom && !window.personalRoomVisitor) {
		window.currentPromptCallback = callback;
		if (!defaultValue) defaultValue = '';
		$('#prompt .alert-field').val(defaultValue);
		showAdapterPopup('prompt', text);
	} else {
		callback(prompt(text, defaultValue));
	}
}

function onPromptSubmit() {
	var value = $('#prompt .alert-field').val();
	if (value != '') {
		window.currentPromptCallback(value);
		hideAdapterPopup('prompt');
	}
	return false;
}

function openStartPage() {
	if ($('#remote_container .video_container').length == 0 && $('#remote_container video').length == 0) {
		location.href = '/start';
	} else {
		if (confirm('Are you sure you want to terminate the call?')) {
			location.href = '/start';
		}
	}
}

function requestConnectionType() {
	var requestConnectionPopup = $('#request_connection_type');
	requestConnectionPopup.modal('show');
	requestConnectionPopup.find('.start-voice-only *').click(function () {
		_gaq.push(['_trackEvent', 'Conference', 'Join Voice only']);
		requestConnectionPopup.modal('hide');
		window.getUserMediaConstants = window.getUserMediaConstantsAudio;
		initialize();
	})
	requestConnectionPopup.find('.start-with-video *').click(function () {
		_gaq.push(['_trackEvent', 'Conference', 'Join with video']);
		requestConnectionPopup.modal('hide');
		window.getUserMediaConstants = window.getUserMediaConstantsVideo;
		initialize();
	})
}
var langs = {
	'ru': {
		'loading': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°',
		'feedback': 'ÐžÑ‚Ð·Ñ‹Ð²',
		'feedback_or_error_report': 'ÐžÑ‚Ð·Ñ‹Ð² Ð¸Ð»Ð¸ Ð¾Ñ‚Ñ‡ÐµÑ‚ Ð¾Ð± Ð¾ÑˆÐ¸Ð±ÐºÐµ',
		'please_introduce_yourself': 'ÐŸÑ€ÐµÐ´ÑÑ‚Ð°Ð²ÑŒÑ‚ÐµÑÑŒ Ð¿Ð¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°',
		'please_enter_your_email_so_i_can_answer_you': 'Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÑÐ²Ð¾Ð¹ Ð°Ð´Ñ€ÐµÑ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ñ‹, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ñ Ð¼Ð¾Ð³ Ð²Ð°Ð¼ Ð¾Ñ‚Ð²ÐµÑ‚Ð¸Ñ‚ÑŒ',
		'please_enter_issue_description_or_your_suggestion_text_here': 'Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð¾ÑˆÐ¸Ð±ÐºÐ¸ Ð¸Ð»Ð¸ Ð²Ð°Ñˆ Ð¾Ñ‚Ð·Ñ‹Ð² Ñ‚ÑƒÑ‚',
		'can_you_solve_this': 'ÐÐµ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ Ñ€ÐµÑˆÐ¸Ñ‚ÑŒ?',
		'send': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ',
		'protect_the_room': 'Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸ÑŽ Ð¾Ñ‚ Ð¿Ð¾ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð½Ð¸Ñ…',
		'password': 'ÐŸÐ°Ñ€Ð¾Ð»ÑŒ',
		'password_confirmation': 'ÐŸÐ¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¿Ð°Ñ€Ð¾Ð»Ñ',
		'set_room_password': 'ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ',
		'enter_room_password': 'Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ð¸',
		'ok': 'ok',
		'plese_help_poor_child_make_his_homework': 'ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ñ€ÐµÑˆÐ¸Ñ‚Ðµ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ Ð·Ð°Ð´Ð°Ñ‡Ñƒ',
		'conference_room_hass_been_created': 'ÐÐ¾Ð²Ð°Ñ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ñ ÑÐ¾Ð·Ð´Ð°Ð½Ð°. ÐžÑ‚Ð¿Ñ€Ð°Ð²ÑŒÑ‚Ðµ ÑÑÑ‹Ð»ÐºÑƒ Ð½Ð¸Ð¶Ðµ Ð´Ñ€ÑƒÐ³Ð¸Ð¼ ÑƒÑ‡Ð°ÑÐ½Ð¸ÐºÐ°Ð¼, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¾Ð½Ð¸ Ð¼Ð¾Ð³Ð»Ð¸ Ðº Ð²Ð°Ð¼ Ð¿Ñ€Ð¸ÑÐ¾ÐµÐ´Ð¸Ð½Ð¸Ñ‚ÑŒÑÑ',
		'send_invitation_by_email': '<i class="icon-white icon-envelope"></i> ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ Ð¿Ð¾ e-mail',
		'warning': 'Ð’Ð½Ð¸Ð¼Ð°Ð½Ð¸Ðµ!',
		'invite_info': 'ÐÐ¾Ð²Ð¾Ðµ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ',
		'your_room_is_open': 'Ð’Ð°ÑˆÐ° ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ñ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð° Ð´Ð»Ñ Ð²ÑÐµÑ… ÐºÑ‚Ð¾ Ð¸Ð¼ÐµÐµÑ‚ ÑÑÑ‹Ð»ÐºÑƒ. Ð§Ñ‚Ð¾Ð±Ñ‹ ÑÐ´ÐµÐ»Ð°Ñ‚ÑŒ ÐµÐµ Ð±Ð¾Ð»ÐµÐµ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð¹ Ð²Ñ‹ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ ' + '<a data-toggle="modal" data-target="#roompass_block" class="btn btn-mini"><i class="icon-lock"></i> ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ</a>.',
		'your_room_has_been_created_bubble': 'ÐÐ¾Ð²Ð°Ñ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ñ ÑÐ¾Ð·Ð´Ð°Ð½Ð°. ÐžÑ‚Ð¿Ñ€Ð°Ð²ÑŒÑ‚Ðµ ÑÑÑ‹Ð»ÐºÑƒ <strong id="conf_link"></strong> Ð´Ñ€ÑƒÐ³Ð¸Ð¼ ÑƒÑ‡Ð°ÑÐ½Ð¸ÐºÐ°Ð¼, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¾Ð½Ð¸ Ð¼Ð¾Ð³Ð»Ð¸ Ðº Ð²Ð°Ð¼ Ð¿Ñ€Ð¸ÑÐ¾ÐµÐ´Ð¸Ð½Ð¸Ñ‚ÑŒÑÑ.',
		'allow_use_your_camera': 'Ð Ð°Ð·Ñ€ÐµÑˆÐ¸Ñ‚Ðµ Ð´Ñ€ÑƒÐ³Ð¸Ð¼ ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ°Ð¼ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ð¸<br>Ð²Ð¸Ð´ÐµÑ‚ÑŒ Ð¸ ÑÐ»Ñ‹ÑˆÐ°Ñ‚ÑŒ Ð²Ð°Ñ.',
		'initializing_your_video': 'Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð²Ð¸Ð´ÐµÐ¾...',
		'good_news': 'Ð£Ñ€Ð°!',
		'your_name': 'Ð’Ð°ÑˆÐµ Ð¸Ð¼Ñ',
		'recipient_email': 'e-mail Ð¿Ð¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»Ñ',
		'invitation_sent': 'ÐŸÑ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾',
		'wrong_captcha': 'ÐÐµÐ¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð¾Ñ‚Ð²ÐµÑ‚ Ð½Ð° Ð·Ð°Ð´Ð°Ñ‡Ñƒ Ð¿Ð¾ Ð¼Ð°Ñ‚ÐµÐ¼Ð°Ñ‚Ð¸ÐºÐµ',
		'feedback_sent': 'Ð¡Ð¿Ð°ÑÐ¸Ð±Ð¾, Ð²Ð°Ñˆ Ð¾Ñ‚Ð·Ð¸Ð² Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½.',
		'wrong_password': 'ÐÐµÐ¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ',
		'reconnect_to_conference': 'Ð¡Ð¾Ð·Ð´Ð°Ñ‚ÑŒ Ð½Ð¾Ð²ÑƒÑŽ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸ÑŽ',
		'leave_conference': 'Ð£Ð¹Ñ‚Ð¸ Ð¸Ð· ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ð¸',
		'wellcome_to_videolink2me': 'Ð”Ð¾Ð±Ñ€Ð¾ Ð¿Ð¾Ð¶Ð°Ð»Ð¾Ð²Ð°Ñ‚ÑŒ Ð² Videolink2.me!',
		'wellcome_intor': 'Videolink2.me ÑÑ‚Ð¾ Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ñ‹Ð¹ ÑÐµÑ€Ð²Ð¸Ñ Ð´Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÐ´ÐµÐ½Ð¸Ñ Ð²Ð¸Ð´ÐµÐ¾ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ð¹ Ð² Ð²Ð°ÑˆÐµÐ¼ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ðµ.',
		'to_start_conference': 'Ð§Ñ‚Ð¾Ð±Ñ‹ Ð½Ð°Ñ‡Ð°Ñ‚ÑŒ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸ÑŽ',
		'help_text_1': 'Ð¡ÐºÐ¾Ð¿Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ ÑÑÑ‹Ð»ÐºÑƒ Ð½Ð° Ð²Ð°ÑˆÑƒ ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸ÑŽ',
		'help_text_2': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²ÑŒÑ‚Ðµ ÑÑÑ‹Ð»ÐºÑƒ Ð´Ñ€ÑƒÐ³Ð¸Ð¼ ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ°Ð¼',
		'help_text_3': 'ÐšÐ°Ðº Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð¾Ð½Ð¸ Ð¾Ñ‚ÐºÑ€Ð¾ÑŽÑ‚ ÑÑÑ‹Ð»ÐºÑƒ, Ð±ÑƒÐ´ÑƒÑ‚ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ñ‹ Ðº ÐºÐ¾Ð½Ñ„ÐµÑ€ÐµÐ½Ñ†Ð¸Ð¸',
		'start_conference_call': 'Ð—Ð²ÑƒÑ‡Ð¸Ñ‚ Ð¿Ñ€Ð¾ÑÑ‚Ð¾, Ð²Ð¿ÐµÑ€ÐµÐ´!',
		'survey_intro': 'Ð¡ Ñ†ÐµÐ»ÑŒÑŽ ÑƒÐ»ÑƒÑ‡ÑˆÐ¸Ñ‚ÑŒ Videolink2.me Ð¸ ÑƒÐ·Ð½Ð°Ñ‚ÑŒ Ð±Ð¾Ð»ÑŒÑˆÐµ Ð¾ Ð½Ð°ÑˆÐ¸Ñ… Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑÑ… Ð¼Ñ‹ ÑÐ¾Ð·Ð´Ð°Ð»Ð¸ Ð½ÐµÐ±Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ð¾Ð¿Ñ€Ð¾Ñ.',
		'survey_intro2': 'Ð‘ÑƒÐ´ÐµÐ¼ Ð¾Ñ‡ÐµÐ½ÑŒ Ð¿Ñ€Ð¸Ð·Ð½Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹ ÐµÑÐ»Ð¸ Ð²Ñ‹ Ð¾Ñ‚Ð²ÐµÑ‚Ð¸Ñ‚Ðµ Ð½Ð° Ð²Ð¾Ð¿Ñ€Ð¾ÑÑ‹, ÑÑ‚Ð¾ Ð·Ð°Ð¹Ð¼ÐµÑ‚ Ð½Ðµ Ð±Ð¾Ð»ÑŒÑˆÐµ Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹',
		'waiting_connection': 'ÐžÐ¶Ð¸Ð´Ð°ÐµÐ¼ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ Ð´Ñ€ÑƒÐ³Ð¸Ñ… ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ¾Ð²...',
		'send_invitation': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ',
		'page_design': 'ÐžÑ„Ð¾Ñ€Ð¼Ð»ÐµÐ½Ð¸Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹'
	}
};
$(function () {
	$.fn.chatBox = function (options) {
		options = $.extend({}, $.fn.chatBox.defaults, options);
		this.options = options;
		this.online = true;
		var self = this;
		if (options.showMinButton) {
			this.find('.chat-minimize').show();
		}
		this.find('.smiles_box button').each(function () {
			$(this).css('backgroundImage', 'url(' + $(this).attr('data-img') + ')');
		});
		this.minimize = function () {
			var messengerBody = self.find('.messenger-body');
			var messenger = self.find('.messenger');
			if (messengerBody.hasClass('open')) {
				messengerBody.removeClass('open');
				messenger.addClass('min');
			} else {
				messengerBody.addClass('open');
				messenger.removeClass('min');
			}
		}
		this.find('.chat-minimize').on('click', function () {
			self.minimize();
		})
		this.find('.smiles_box button').click(function () {
			self.find('.smilesContainer').removeClass('active');
			var img = document.createElement('img');
			img.src = $(this).attr('data-img');
			$(img).addClass('smiley');
			var chatMessageInput = self.find('.chat_message_input');
			$.fn.chatBox.insertNodeOverSelection(img, chatMessageInput[0]);
			chatMessageInput.focus();
			$.fn.chatBox.setEndOfContenteditable(chatMessageInput[0]);
		})
		this.find('.showSmiles').click(function () {
			self.find('.smilesContainer').toggleClass('active');
		})
		this.getChatName = function (callback) {
			var chatName = $.cookie('chat_name');
			if (!chatName && $.cookie('personal_room')) {
				chatName = $.cookie('personal_room');
			}
			if (!chatName && $.cookie('user_room')) {
				chatName = $.cookie('user_room');
			}
			if (!chatName) {
				showPrompt(terms.room_chat_enter_name, callback);
			} else {
				callback(chatName);
			}
		}
		this.strip_tags = function (input, allowed) {
			allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
				commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
			return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
				return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
			});
		}
		this.updateChatName = function () {
			if (!$.cookie('chat_name')) return;
			$('.chat-header .with .login').html(' ( <i>' + terms.as + ' ' + $.cookie('chat_name') + '</i> <i class="glyphicon glyphicon-pencil"></i> )');
		}
		this.on('keydown', '.chat_message_input', function (e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {
				var chatMessageInput = self.find('.chat_message_input');
				if (chatMessageInput.html() != '') {
					self.getChatName(function (chatName) {
						$.cookie('chat_name', chatName, {
							expires: 365 * 100,
							path: '/'
						});
						self.updateChatName();
						var chatMessageInput = self.find('.chat_message_input');
						var messageBody = self.strip_tags(chatMessageInput.html(), '<img><img/>');
						var message = options.buildMessage(chatName, messageBody, self);
						if ($('#roomAvatarImage') && $('#roomAvatarImage').attr('src')) {
							message.avatar = $('#roomAvatarImage').attr('src');
						}
						options.sendMessage(message, self, function () {
							chatMessageInput.html('');
						});
					})
				}
				e.stopPropagation();
				return false;
			}
		});
		this.on('click', '.chat-header .with .login i', function () {
			showPrompt(terms.room_chat_enter_name, function (chatName) {
				$.cookie('chat_name', chatName, {
					expires: 365 * 100,
					path: '/'
				});
				self.updateChatName();
			}, $.cookie('chat_name'));
		})
		this.find('.chat-toggle').click(function () {
			options.closeChat(self);
		})
		this.getCurrentTime = function () {
			var now = new Date();
			return (now.getHours() < 10 ? '0' : '') + now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
		}
		this.addMessage = function (messageClass, message) {
			self.find('.chat_log').append('<li class="' + (message.avatar == null ? 'no-avatar ' : '') + messageClass + '">' + (message.avatar != null ? '<img width="26" height="26" src="' + message.avatar + '" class="img-circle">' : '') + '<div class="message"><span class="from">' + message.from + '</span><span class="when">' + self.getCurrentTime() + '</span><br>' + $.fn.chatBox.prepareMessage(message.data) + '</div></li>');
			self.find('.chat_log').scrollTop(self.find('.chat_log')[0].scrollHeight);
		}
		this.addStatusChange = function (status) {
			self.find('.chat_log').append('<li class="status"><div class="message with-status">' + status + '<span class="when">' + self.getCurrentTime() + '</span></div></li>');
			self.find('.chat_log').scrollTop(self.find('.chat_log')[0].scrollHeight);
		}
		this.showChatBox = function () {
			options.showChatBox(self);
		}
		this.hideChatBox = function () {
			options.hideChatBox(self);
		}
		this.userWentOffline = function (userName) {
			self.addStatusChange(userName + ' went offline');
		}
		this.userCameBack = function (userName) {
			self.addStatusChange(userName + ' came back');
		}
		return this;
	}
	$.fn.chatBox.defaults = {
		showMinButton: false,
		sendMessage: function (message, chatBox, success) {
			window.webrtcConnection.sendChatMessage(message);
			success();
		},
		buildMessage: function (from, text, chatBox) {
			return {
				from: from,
				data: text,
				uid: window.webrtcConnection.getLocalId(),
				avatar: null
			};
		},
		showChatBox: function (chatBox) {
			chatBox.find('.messenger').css({
				right: '-300px'
			});
			chatBox.updateChatName();
			chatBox.show();
			$('#feedback').hide();
			var goRight = 0;
			if (chatBox.find('.messenger').data('right-distance')) goRight = chatBox.find('.messenger').data('right-distance');
			chatBox.find('.messenger').animate({
				right: goRight
			}, 200, function () {
				if (isWebRTC()) {
					$('#remote_container').animate({
						marginRight: 300
					});
					$('#mini').animate({
						marginRight: 260
					});
				}
			});
		},
		hideChatBox: function (chatBox) {
			var offsetOfRemoved = chatBox.find('.messenger').css('right').replace('px', '');
			chatBox.find('.messenger').animate({
				right: '-300px'
			}, 200, function () {
				chatBox.hide();
				$('#feedback').show();
				if (isWebRTC()) {
					$('#remote_container').animate({
						marginRight: 0
					});
				}
				$('#mini').animate({
					marginRight: 4
				});
				if (chatBox.options.showMinButton) {
					for (var id in chatBoxes) {
						if (chatBoxes[id].css('display') != 'none') {
							var boxOffset = chatBoxes[id].find('.messenger').css('right').replace('px', '');
							if (boxOffset > offsetOfRemoved) {
								chatBoxes[id].find('.messenger').animate({
									right: boxOffset - 300
								}, 100);
							}
						}
					}
				}
			});
		},
		closeChat: function () {
			hideChatBox();
			$('#enableChatButton').removeClass('active');
		}
	}
	$.fn.chatBox.isOrContainsNode = function (ancestor, descendant) {
		var node = descendant;
		while (node) {
			if (node === ancestor) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}
	$.fn.chatBox.insertNodeOverSelection = function (node, containerNode) {
		var sel, range, html, str;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				if ($.fn.chatBox.isOrContainsNode(containerNode, range.commonAncestorContainer)) {
					range.deleteContents();
					range.insertNode(node);
				} else {
					containerNode.appendChild(node);
				}
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			if ($.fn.chatBox.isOrContainsNode(containerNode, range.parentElement())) {
				html = (node.nodeType == 3) ? node.data : node.outerHTML;
				range.pasteHTML(html);
			} else {
				containerNode.appendChild(node);
			}
		}
	}
	$.fn.chatBox.setEndOfContenteditable = function (contentEditableElement) {
		var range, selection;
		if (document.createRange) {
			range = document.createRange();
			range.selectNodeContents(contentEditableElement);
			range.collapse(false);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
		else if (document.selection) {
			range = document.body.createTextRange();
			range.moveToElementText(contentEditableElement);
			range.collapse(false);
			range.select();
		}
	}
	$.fn.chatBox.prepareMessage = function (text) {
		return text.replace(/([http|https]+:\/\/[^\)\,\ ]+)/ig, function (match, contents, offset, s) {
			return '<a href="' + contents + '" target="_blank">' + contents + '</a>';
		})
	}
});

function chatMessageReceived(message) {
	var messageClass = "right";
	if (window.webrtcConnection.getLocalId() == message.uid) messageClass = "left";
	currentCallChat.addMessage(messageClass, message);
	if (!chatVisible) {
		showChatBox();
		$('#enableChatButton').removeClass('btn-info').addClass('active');
		$('#enableChatButton').find('i').removeClass('icon-white');
	}
	$('#chat_box .chat_log').scrollTop($('#chat_box .chat_log')[0].scrollHeight);
}
var currentCallChat;
$(function () {
	currentCallChat = $('#chat_box').chatBox();
})

function showChatBox() {
	chatVisible = true;
	currentCallChat.showChatBox();
	$('#additional-chats').hide();
}

function hideChatBox() {
	chatVisible = false;
	currentCallChat.hideChatBox();
	$('#additional-chats').show();
}
var chatBoxes = {};

function findChatBoxByRoom(room) {
	for (var contactId in currentContacts) {
		if (currentContacts[contactId].name == room && currentContacts[contactId].source == 'videolink') {
			return chatBoxes[contactId];
		}
	}
	return null;
}

function startInstantChat(startChatWith) {
	console.log('open chat window with ' + startChatWith);
	var chatBoxId = 'chat_with_' + startChatWith;
	var newChatBoxControl;
	var checkPosition = false;
	if (!chatBoxes[startChatWith]) {
		var newChatBox = document.createElement('div');
		newChatBox.innerHTML = document.getElementById('chat_box').innerHTML;
		newChatBox = $(newChatBox);
		newChatBox.attr('class', 'chat_box');
		newChatBox.data('user-id', currentContacts[startChatWith].room);
		newChatBox.find('.chat_message_input').html('');
		newChatBox.find('.chat_log').html('');
		newChatBox.find('.chat-header .with').html(currentContacts[startChatWith].name);
		newChatBox.attr('id', chatBoxId);
		document.getElementById('additional-chats').appendChild(newChatBox[0]);
		newChatBoxControl = newChatBox.chatBox({
			showMinButton: true,
			closeChat: function (chatBox) {
				chatBox.hideChatBox();
			},
			buildMessage: function (from, text, chatBox) {
				return {
					from: $.cookie('personal_room'),
					sender: from,
					data: text,
					uid: chatBox.data('user-id'),
					avatar: currentContacts[startChatWith].photo
				};
			},
			sendMessage: function (message, chatBox, success) {
				persistentSocket.emit('check-status', {
					uid: message.uid
				}, function (isOnline) {
					if (isOnline && chatBox.online) {
						chatBox.addMessage('left', message);
						persistentSocket.emit('instant-message', message);
						success();
					} else {
						if (chatBox.online) {
							chatBox.userWentOffline(message.uid);
						} else {
							chatBox.online = false;
						}
					}
				})
			}
		});
		chatBoxes[startChatWith] = newChatBox;
		checkPosition = true;
	} else {
		newChatBoxControl = chatBoxes[startChatWith];
		var messengerBody = newChatBoxControl.find('.messenger-body');
		var messenger = newChatBoxControl.find('.messenger');
		if (!messengerBody.hasClass('open')) {
			messengerBody.addClass('open');
			messenger.removeClass('min');
		} else {
			checkPosition = true;
		}
	}
	if (chatBoxes[startChatWith]) {
		chatBoxes[startChatWith].find('.chat_message_input').focus();
	}
	if (checkPosition) {
		chatBoxes[startChatWith].find('.messenger').data('right-distance', 0);
		var activeChatBoxes = 0;
		for (var id in chatBoxes) {
			if (id != startChatWith && chatBoxes[id].css('display') != 'none') {
				activeChatBoxes++;
			}
		}
		if (activeChatBoxes > 0) {
			chatBoxes[startChatWith].find('.messenger').data('right-distance', 300 * activeChatBoxes);
		}
	}
	newChatBoxControl.showChatBox();
}
$('#enableChatButton').click(function () {
	_gaq.push(['_trackEvent', 'Controls', 'Chat']);
	if ($(this).hasClass('active')) {
		hideChatBox();
		$(this).removeClass('active');
	} else {
		showChatBox();
		$(this).addClass('active');
	}
})
window.lastSelfie = null;

function makeSelfie(type) {
	if (!VideolinkPlatformCurrentRoom.isWebcamShared() || $('#remote video').length == 0) {
		alert(terms.message_enable_webcam);
		return;
	}
	$('#make-selfie-control').data('type', type);
	$('#make-selfie-control').fadeIn('fast');
}

function makePhoto(type) {
	console.log('Make selfie');
	_gaq.push(['_trackEvent', 'Selfie', 'Make selfie']);
	var videos = [];
	var maxWidth = 0;
	var maxHeight = 0;
	$('#remote video').each(function () {
		if ($(this)[0].videoWidth > maxWidth) maxWidth = $(this)[0].videoWidth;
		if ($(this)[0].videoHeight > maxHeight) maxHeight = $(this)[0].videoHeight;
		videos.push({
			element: $(this)[0],
			width: $(this)[0].videoWidth,
			height: $(this)[0].videoHeight
		})
	})
	if (!VideolinkPlatformCurrentRoom.isWebcamShared() || videos.length == 0) {
		alert(terms.message_enable_webcam);
		return;
	}
	var canvas = document.createElement('canvas');
	if (videos.length >= 4) {
		canvas.width = maxWidth * 2;
		canvas.height = maxHeight * Math.ceil(videos.length / 2);
	} else {
		canvas.width = maxWidth * videos.length;
		canvas.height = maxHeight;
	}
	var ctx = canvas.getContext('2d');
	var sequence = 0;
	for (var i in videos) {
		var video = videos[i];
		var row = 0,
			column;
		if (videos.length >= 4) {
			row = Math.floor(sequence / 2);
			column = (sequence % 2 == 0 ? 0 : maxWidth);
		} else {
			column = sequence * maxWidth;
		}
		ctx.drawImage(video.element, 0, 0, video.width, video.height, column, maxHeight * row, maxWidth, maxHeight);
		sequence++;
	}
	$('#selfie_image').attr('src', canvas.toDataURL());
	$('#selfie_loader').removeClass('hide');
	$('#selfie_share').addClass('hide');
	$('#share_selfie').modal('show');
	type = type == 'contest' ? 'contest' : '';
	$.ajax({
		type: "POST",
		url: "/service/upload_selfie",
		data: {
			imgBase64: canvas.toDataURL(),
			type: type,
			email: $('#contest_email').length > 0 ? $('#contest_email').val() : '',
			subscribe: $('#contest_subscribe').length > 0 ? $('#contest_subscribe').attr('checked') ? '1' : '0' : '0'
		}
	}).done(function (response) {
		window.lastSelfie = response.split('/').pop();
		$('#selfie_loader').addClass('hide');
		$('#selfie_share').removeClass('hide');
		$('#selfie_share input').val(response);
		$('#selfie_share .content_block').hide();
		$('#selfie_share .content_block_' + type).slideDown();
		var sharingSettings = "st_url='" + response + "' st_title='" + terms.selfie_description + "'";
		$('#share_selfie div.share-buttons').html("<span class='share st_facebook_large' " + sharingSettings + " data-type='facebook' displayText='Facebook'></span>" + "<span class='share st_twitter_large' data-type='twitter' " + sharingSettings + " displayText='Tweet'></span>" + "<span class='share st_linkedin_large'  data-type='linkedin' " + sharingSettings + " displayText='LinkedIn'></span>" + "<span class='share st_googleplus_large' data-type='googleplus' " + sharingSettings + " displayText='Google +'></span>" + "<span class='share st_vkontakte_large' data-type='vkontakte' " + sharingSettings + " displayText='Vkontakte'></span>" + "<span class='share st_odnoklassniki_large' data-type='odnoklassniki' " + sharingSettings + " displayText='Odnoklassniki'></span>");
		stButtons.locateElements();
	});
};
$(function () {
	$('#make-selfie').tooltip();
	$('#make-selfie').click(function () {
		if ($(this).attr('data-type') && $(this).attr('data-type') != '') {
			$('#share_selfie_' + $(this).attr('data-type')).modal('show');
		} else {
			makeSelfie();
		}
	})
	$('.make_selfie_immidiately').click(function () {
		$('#contest_email').parent().removeClass('has-error');
		var email = $('#contest_email').val();
		if (email != '') {
			if (validateEmail(email)) {
				$('#share_selfie_' + $(this).attr('data-type')).modal('hide');
				makeSelfie($(this).attr('data-type'));
				return;
			}
		}
		$('#contest_email').parent().addClass('has-error');
	})
	$('#closeSelfieContestBox').click(function (e) {
		$('#make-selfie').hide();
		$.cookie('hide-selfie-contest', 1);
		e.stopPropagation();
	})
	$('#share_selfie div.share-buttons').on('click', 'span.share', function () {
		if ($(this).data('type') != '') {
			if (window.lastSelfie) {
				$.get('/service/share_selfie/' + window.lastSelfie)
			}
			console.log('share selfie on ' + $(this).data('type'));
			_gaq.push(['_trackEvent', 'Selfie', 'share selfie in ' + $(this).data('type')]);
		}
	})
	$('#make-selfie-control').click(function () {
		$('#make-selfie-control').hide();
		makePhoto($('#make-selfie-control').data('type'));
	})
});
var fileSharingService;
var fileRequestPopups = {};

function init() {
	if (window.VideolinkPlatformCurrentRoom) {
		fileSharingService = window.VideolinkPlatformCurrentRoom.getFileSharingService();
		fileSharingService.onDownloadCompleted(function (fileId, name, fileData, type, mime) {
			console.log("File " + name + " downloaded (type: " + type + ")");
			closeFileDownloadPopup(fileId);
			$.pnotify({
				title: terms.downloaded,
				text: '<div style="text-align: center;padding-top:10px;" id="file_result_' + fileId + '"></div>',
				type: 'success',
				hide: false,
				sticker: false,
				addclass: 'light'
			});
			var link = document.createElement('a');
			link.href = fileData;
			link.innerHTML = '<i class="glyphicon glyphicon-save"></i> ' + terms.save + ' <b>' + name + '</b>';
			link.target = "_blank";
			link.download = name;
			link.className = 'btn btn-default';
			link.style.color = '#000000';
			link.style.maxWidth = '100%';
			link.style.whiteSpace = 'normal';
			document.getElementById('file_result_' + fileId).appendChild(link);
			_gaq.push(['_trackEvent', 'File sharing', 'Downloaded']);
		})
		fileSharingService.onDownloadStarted(function (fileId, name, mime) {})
		fileSharingService.onDownloadProgress(function (fileId, bytesSent, progress) {
			document.getElementById("dfile_" + fileId + '_progress').style.width = progress + "%";
			document.getElementById("dfile_" + fileId + '_progress').innerHTML = progress + '%';
		})
		fileSharingService.onFileRequest(function (fileId, name) {
			console.log('received file sharing request. Accepting...');
			fileRequestPopups[fileId] = $.pnotify({
				title: terms.file_request_title + ' ' + name,
				text: '<div class="message request_' + fileId + '"><p style="font-size: 14px">' + terms.file_request + '</p></div>' + '<div class="row request_' + fileId + '" style="text-align: left;text-shadow: none">' + '<div class="col-md-6"><a onclick="startFileDownload(\'' + fileId + '\')" class="btn btn-success" style="width:100%">' + terms.file_request_download + '</a></div>' + '<div class="col-md-6"><a onclick="closeFileDownloadPopup(\'' + fileId + '\')" class="btn btn-danger" style="width:100%">' + terms.cancel + '</a></div>' + '</div>' + '' + '<div style="display: none" id="dfile_' + fileId + '">' + '<div class="progress" style="height:20px;margin:15px 0;">' + '<div class="progress-bar" id="dfile_' + fileId + '_progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">Starting...</div>' + '</div>' + '</div>',
				type: 'info',
				hide: false,
				sticker: false,
				addclass: 'light'
			});
			_gaq.push(['_trackEvent', 'File sharing', 'Share file']);
		})
		console.log('init completed');
	} else {
		setTimeout(init, 1000);
	}
}
$(function () {
	init();
})

function uploadfile(files) {
	$('#file-sharing-container').animate({
		bottom: '-100px'
	}, 100, function () {
		$('#file-sharing-container').hide();
		$('#shareFile').removeClass('active');
	});
	$.pnotify({
		text: terms.sending_files,
		type: 'info',
		hide: true,
		sticker: false,
		addclass: 'light'
	});
	console.log(files);
	for (var i in files) {
		if (files[i] instanceof File) {
			fileSharingService.startFileSharing(files[i], 'filesharing');
		}
	}
	$('#file-input-container').html('<input type="file" onchange="uploadfile(this.files)" multiple/>');
}

function startFileDownload(fileId) {
	fileSharingService.acceptFileSharingRequest(fileId);
	$('.request_' + fileId).hide();
	$('#dfile_' + fileId).show();
}

function closeFileDownloadPopup(fileId) {
	fileRequestPopups[fileId].pnotify_remove();
	delete fileRequestPopups[fileId];
}!
function () {
	"use strict";
	var a = "undefined" != typeof module && module.exports,
		b = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
		c = function () {
			for (var a, b, c = [
				["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
				["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
				["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
				["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
				["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
			], d = 0, e = c.length, f = {}; e > d; d++) if (a = c[d], a && a[1] in document) {
				for (d = 0, b = a.length; b > d; d++) f[c[0][d]] = a[d];
				return f
			}
			return !1
		}(),
		d = {
			request: function (a) {
				var d = c.requestFullscreen;
				a = a || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? a[d]() : a[d](b && Element.ALLOW_KEYBOARD_INPUT)
			},
			exit: function () {
				document[c.exitFullscreen]()
			},
			toggle: function (a) {
				this.isFullscreen ? this.exit() : this.request(a)
			},
			raw: c
		};
	return c ? (Object.defineProperties(d, {
		isFullscreen: {
			get: function () {
				return !!document[c.fullscreenElement]
			}
		},
		element: {
			enumerable: !0,
			get: function () {
				return document[c.fullscreenElement]
			}
		},
		enabled: {
			enumerable: !0,
			get: function () {
				return !!document[c.fullscreenEnabled]
			}
		}
	}), void(a ? module.exports = d : window.screenfull = d)) : void(a ? module.exports = !1 : window.screenfull = !1)
}();
$(function () {
	var $cache = {},
		elements = {},
		timeout = 5000,
		thread = null,
		newtimeout = null,
		flag = false;
	$cache = {
		elem: document.getElementById('<html>'),
		panel: $('.panel'),
		fullscreenBtn: $('#fullscreenMode'),
		conferenceBlock: $('#container'),
		navigationBar: $('.navbar'),
		remoteContainer: $('#remote_container'),
		ownVideo: $('#mini')
	};
	var animateAttribute = function (element, attributeName) {
		if (!element.data(attributeName)) {
			element.data(attributeName, element.css(attributeName));
		}
		var animationProps = {};
		animationProps[attributeName] = 0;
		element.animate(animationProps, {
			duration: 200,
			queue: false
		});
	}
	var animateAttributeBack = function (element, attributeName) {
		var animationProps = {};
		animationProps[attributeName] = element.data(attributeName);
		element.animate(animationProps, {
			duration: 200,
			queue: false
		});
	}
	elements = {
		toolbar: {
			hideToolBar: function () {
				$cache.panel.slideUp('fast');
				animateAttribute($cache.remoteContainer, 'paddingBottom');
				animateAttribute($cache.ownVideo, 'bottom');
			},
			showToolBar: function () {
				$cache.panel.slideDown('fast');
				animateAttributeBack($cache.remoteContainer, 'paddingBottom');
				animateAttributeBack($cache.ownVideo, 'bottom');
			}
		}
	};
	var hideElementIfExists = function (selector) {
		if ($(selector).length > 0) {
			$(selector).css({
				visibility: "hidden"
			});
		}
	}
	var showElementIfExists = function (selector) {
		if ($(selector).length > 0) {
			$(selector).css({
				visibility: "visible"
			});
		}
	}
	var onEnablingFullscreen = function () {
		$('#make-selfie').hide();
		hideElementIfExists('.sidebar');
		hideElementIfExists('.contacts-button');
		hideElementIfExists('#feedback');
		var footer = $('#dashboard-page #footer');
		footer.data('bottom', footer.css('bottom'))
		footer.css('bottom', 0);
	}
	var onDisablingFullscreen = function () {
		$('#make-selfie').show();
		showElementIfExists('.sidebar');
		showElementIfExists('.contacts-button');
		showElementIfExists('#feedback');
		var footer = $('#dashboard-page #footer');
		footer.css('bottom', footer.data('bottom'));
	}
	window.exitFullscreen = function () {
		if (screenfull.enabled && screenfull.isFullscreen) {
			screenfull.exit();
			$cache.fullscreenBtn.removeClass('active');
			$cache.navigationBar.show();
			elements.toolbar.showToolBar();
			onDisablingFullscreen();
		}
	}
	$cache.fullscreenBtn.on('click', function () {
		if (screenfull.enabled) {
			if ($(this).hasClass('active')) {
				window.exitFullscreen();
			} else {
				screenfull.request($cache.elem);
				if (screenfull.isFullscreen) {
					$(this).addClass('active');
					$cache.navigationBar.hide();
					elements.toolbar.hideToolBar();
					onEnablingFullscreen();
				}
			}
		}
	});
	toolbarDisplayLock = false;
	var setupToolbarHideTimeout = function () {
		if (!toolbarDisplayLock) {
			toolbarDisplayLock = true;
			if (newtimeout != null) {
				clearTimeout(newtimeout);
			}
			elements.toolbar.showToolBar();
			toolbarDisplayLock = false;
			newtimeout = setTimeout(function () {
				elements.toolbar.hideToolBar();
			}, 2000);
		}
	}
	toolbarHideLock = false;
	var cancelToolBarHideTimeout = function () {
		if (newtimeout != null) {
			clearTimeout(newtimeout);
			if (!toolbarHideLock) {
				toolbarHideLock = true;
				elements.toolbar.showToolBar();
				toolbarHideLock = false;
			}
		}
	}
	$(document).on('mousemove', function (event) {
		var isMovedNotOverToolbar = $(event.target).parents('.panel').length == 0;
		if (screenfull.isFullscreen && isMovedNotOverToolbar) {
			setupToolbarHideTimeout();
		} else if (newtimeout != null) {
			cancelToolBarHideTimeout();
		}
	});

	function isFullScreen() {
		return screenfull.enabled && screenfull.isFullscreen;
	}
});