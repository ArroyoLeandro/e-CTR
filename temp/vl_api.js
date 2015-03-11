if (typeof(console) !== "object" || typeof(console.log) !== "function") {
	console = {};
	console.log = function (message) {}
	console.error = function (message) {}
}
var SERVER_HOST = 'https://cdn.videolinkplatform.com:443';
var RESOURCES_PATH = 'https://cdn.videolinkplatform.com/res/';
VideolinkPlatformSettings = {
	supportChatOnlyConnections: false
}
var RTCPeerConnection = null;
var getUserMedia = null;
var attachMediaStream = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;
window.overrideConnectionMode = null;

function trace(text) {
	if (text[text.length - 1] == '\n') {
		text = text.substring(0, text.length - 1);
	}
	vlLog((performance.now() / 1000).toFixed(3) + ": " + text);
}

function isWebRTC() {
	if (isMobileDevice) return true;
	if (window.overrideConnectionMode) {
		return (window.overrideConnectionMode == 'webrtc');
	}
	var isRTCPeerConnectionSupported = !! window.webkitRTCPeerConnection || !! window.mozRTCPeerConnection;
	if (!isRTCPeerConnectionSupported) return false;
	var params = window.location.search.replace("?", "").split('&');
	var connectionType = 'webrtc';
	for (var i in params) {
		var property = params[i].split('=');
		if (property[0] == 'mode') connectionType = property[1];
	}
	return connectionType == 'webrtc';
}

function switchProtocolTo(newProtocolName) {
	window.overrideConnectionMode = newProtocolName;
	window.videolinkPlatformConnection.reconnect();
	if (typeof(initialize) === 'function') {
		initialize();
	}
}
window.isBrowserWebRTCCapable = true;
var isIpad = navigator.userAgent.indexOf('iPad') > -1;
var isIpod = navigator.userAgent.indexOf('iPod') > -1;
var isIPhone = navigator.userAgent.indexOf('iPhone') > -1;

function inFirefox() {
	return webrtcDetectedBrowser == 'firefox';
}

function inChrome() {
	return webrtcDetectedBrowser == 'chrome';
}
var isMobileDevice = isIpad || isIPhone || isIpod;
if (navigator.mozGetUserMedia) {
	vlLog("This appears to be Firefox");
	webrtcDetectedBrowser = "firefox";
	webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]);
	RTCPeerConnection = mozRTCPeerConnection;
	RTCSessionDescription = mozRTCSessionDescription;
	RTCIceCandidate = mozRTCIceCandidate;
	getUserMedia = navigator.mozGetUserMedia.bind(navigator);
	createIceServer = function (url, username, password) {
		var iceServer = null;
		var url_parts = url.split(':');
		if (url_parts[0].indexOf('stun') === 0) {
			iceServer = {
				'url': url
			};
		} else if (url_parts[0].indexOf('turn') === 0 && (url.indexOf('transport=udp') !== -1 || url.indexOf('?transport') === -1)) {
			var turn_url_parts = url.split("?");
			iceServer = {
				'url': turn_url_parts[0],
				'credential': password,
				'username': username
			};
		}
		return iceServer;
	};
	attachMediaStream = function (element, stream) {
		vlLog("Attaching media stream");
		element.mozSrcObject = stream;
		element.play();
	};
	reattachMediaStream = function (to, from) {
		vlLog("Reattaching media stream");
		to.mozSrcObject = from.mozSrcObject;
		to.play();
	};
} else if (navigator.webkitGetUserMedia || isMobileDevice) {
	if (!isMobileDevice) vlLog("This appears to be Chrome");
	else vlLog('This appears to be mobile device');
	if (!isMobileDevice) {
		webrtcDetectedBrowser = "chrome";
		webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
		createIceServer = function (url, username, password) {
			var iceServer = null;
			var url_parts = url.split(':');
			if (url_parts[0].indexOf('stun') === 0) {
				iceServer = {
					'url': url
				};
			} else if (url_parts[0].indexOf('turn') === 0) {
				if (webrtcDetectedVersion < 28) {
					var url_turn_parts = url.split("turn:");
					iceServer = {
						'url': 'turn:' + username + '@' + url_turn_parts[1],
						'credential': password
					};
				} else {
					iceServer = {
						'url': url,
						'credential': password,
						'username': username
					};
				}
			}
			return iceServer;
		};
		RTCPeerConnection = webkitRTCPeerConnection;
		getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
		attachMediaStream = function (element, stream) {
			if (typeof element.srcObject !== 'undefined') {
				element.srcObject = stream;
			} else if (typeof element.mozSrcObject !== 'undefined') {
				element.mozSrcObject = stream;
			} else if (typeof element.src !== 'undefined') {
				element.src = URL.createObjectURL(stream);
			} else {
				vlLog('Error attaching stream to element.', 'error');
			}
		};
		reattachMediaStream = function (to, from) {
			to.src = from.src;
		};
		if (!webkitMediaStream.prototype.getVideoTracks) {
			webkitMediaStream.prototype.getVideoTracks = function () {
				return this.videoTracks;
			};
			webkitMediaStream.prototype.getAudioTracks = function () {
				return this.audioTracks;
			};
		}
		if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
			webkitRTCPeerConnection.prototype.getLocalStreams = function () {
				return this.localStreams;
			};
			webkitRTCPeerConnection.prototype.getRemoteStreams = function () {
				return this.remoteStreams;
			};
		}
	}
} else if (isWebRTC()) {
	vlLog("Browser does not appear to be WebRTC-capable.");
	window.isBrowserWebRTCCapable = false;
	switchProtocolTo('fl');
} else {
	window.isBrowserWebRTCCapable = false;
}
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	}
}
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
window.videolinkPlatformDebugEnabled = false;

function vlLog(message, severity) {
	if (window.videolinkPlatformDebugEnabled) {
		var curentTime = new Date();
		var logTime = curentTime.getHours() + ":" + (curentTime.getMinutes() < 10 ? '0' : '') + curentTime.getMinutes() + ":" + (curentTime.getSeconds() < 10 ? '0' : '') + curentTime.getSeconds();
		var logMessage = '[VLP ' + logTime + '] ' + message;
		if (severity == 'error') {
			console.error(logMessage);
		} else if (severity == 'debug') {
			console.info(logMessage);
		} else {
			console.log(logMessage);
		}
	}
}

function VideolinkPlatformLogger(logSocket) {
	this.connectionLogged = false;
	this.send = function (event, data, callback) {
		vlLog('Logger: ' + event);
		if (callback) {
			logSocket.emit(event, data, callback);
		} else {
			logSocket.emit(event, data);
		}
	}
	this.setVideo = function (width, height) {
		vlLog('Logger: received video');
		this.send('video', {
			width: width,
			height: height
		});
	}
	this.setSound = function () {
		vlLog('Logger: received audio');
		this.send('sound');
	}
	this.setConnectionType = function (type) {
		this.send('connection', {
			type: type
		});
	}
}
var VLRTMPConference = function (config) {
	var room = null
	var userId = null;
	var connections = {};
	var dataChannels = {};
	var joined = false;
	var localStream;
	var self = this;
	this.messageIndex = 0;
	this.withVideoStream = (window.getUserMediaConstants == window.getUserMediaConstantsVideo);
	var events = {
		onDataMessage: []
	}
	if (!config.socket) {
		var socket = io.connect();
	} else {
		var socket = config.socket;
		vlLog('Flash: reusing sockets');
	}
	this.sendMessage = function (uid, message) {
		socket.emit('message', {
			to: uid,
			from: userId,
			body: message
		})
	}
	this.onNewMessage = function (message) {
		if (message.to == userId) {
			if (message.body.type == 'rtmp_offer') {
				vlLog('Flash: wow, got rtmp offer from #' + message.from + "/" + message.body.publicId);
				connections[message.from] = {
					publicId: message.body.publicId,
					oldIds: []
				};
				config.onRemoteStream(message.from, message.from, message.body.publicId, message.body.withVideo);
			} else if (message.body.type == 'off') {
				self.remoteVideoContainerState(message.from, 'off');
			} else if (message.body.type == 'on') {
				self.remoteVideoContainerState(message.from, 'on');
			} else if (message.body.type == 'farIdChange') {
				vlLog('Flash: far id changed to #' + message.body.farId);
				connections[message.from].oldIds.push(connections[message.from].publicId);
				connections[message.from].publicId = message.body.farId;
			}
		}
	}
	socket.on('message', this.onNewMessage);
	this.connect = function (roomId) {
		self.room = roomId;
		socket.emit('register', {
			protocol: 'rtmp'
		}, function (uid) {
			vlLog('Flash: im=' + uid);
			userId = uid;
			self.userId = uid;
			config.onLocalStream(userId);
		});
	}
	this.onNewUser = function (userInfo) {
		if (userInfo.id != userId) {
			vlLog('Flash: new user connected #' + userInfo.id + "/" + userInfo.publicId);
			if (userInfo.protocol != 'webrtc') {
				config.onRemoteStream(userInfo.id, userInfo.id, userInfo.publicId, userInfo.withVideo);
			}
			connections[userInfo.id] = {
				publicId: userInfo.publicId,
				oldIds: []
			};
			vlLog('Flash: send invite to #' + userInfo.id);
			self.sendMessage(userInfo.id, {
				type: 'rtmp_offer',
				publicId: window.VLUserPublicId,
				withVideo: self.withVideoStream
			});
		}
	}
	this.onUserLeave = function (userInfo) {
		vlLog('Flash: user left #' + userInfo.id);
		if (config.onUserLeft) config.onUserLeft(userInfo.id);
	}
	this.join = function () {
		if (joined) return;
		joined = true;
		vlLog('Flash: joined');
		socket.on('new_user', this.onNewUser)
		socket.on('leave', this.onUserLeave);
		socket.emit('introduce', {
			room: self.room,
			publicId: window.VLUserPublicId,
			withVideo: self.withVideoStream
		});
	}
	this.leave = function () {
		vlLog('Flash: leave connection');
		socket.removeListener('message', this.onNewMessage);
		socket.removeListener('new_user', this.onNewUser);
		socket.removeListener('leave', this.onUserLeave);
		$.ajax({
			dataType: "json",
			async: false,
			type: 'GET',
			url: SERVER_HOST + '/signaler_http/disconnect/' + self.room + '/' + self.userId
		});
	}
	this.getFlashMovie = function (movieName) {
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		return (isIE) ? window[movieName] : document[movieName];
	}
	this.mute = function () {
		self.getFlashMovie('localVideoStream').mute();
	}
	this.unmute = function () {
		self.getFlashMovie('localVideoStream').unmute();
	}
	this.turnOffVideoStream = function () {
		self.getFlashMovie('localVideoStream').muteVideo();
		self.sendOnOffVideoMsg('off');
	}
	this.turnOnVideoStream = function () {
		self.getFlashMovie('localVideoStream').unmuteVideo();
		self.sendOnOffVideoMsg('on');
	}
	this.getUserId = function () {
		return userId;
	}
	this.getDecorator = function () {
		return config.decorator;
	}
	this.releaseCamera = function () {}
	this.reconnect = function () {
		this.leave();
		config.initParams.vlRoom.cleanScene();
		window.videolinkPlatformConnection = VLMultiConnectionMediator.prototype.connectionFactory(config.initParams.room, config.initParams.socket, config.initParams.envOptions, config.initParams.vlRoom);
		config.initParams.vlRoom.getFileSharingService().initListeners();
	}
	this.shareScreen = function (screenId) {
		alert('Screen sharing is not supported by your browser. Please use Google Chrome.')
	}
	this.sendOnOffVideoMsg = function (mode) {
		for (var uid in connections) {
			self.sendMessage(uid, {
				type: mode,
				id: userId
			});
		}
	};
	this.remoteVideoContainerState = function (remoteContainerID, state) {
		vlLog("Flash: video from " + remoteContainerID + " is " + state);
		var remoteContainer = 'stream_' + remoteContainerID;
		if (state === 'off') {
			self.getFlashMovie(remoteContainer).showPoster();
		} else if (state === 'on') {
			self.getFlashMovie(remoteContainer).hidePoster();
		}
	};
	this.meWithVideo = function () {
		return this.withVideoStream;
	}
	this.getDataChannelToUser = function (userId) {
		if (!dataChannels[userId]) {
			dataChannels[userId] = {
				send: function (message) {
					self.getFlashMovie('localVideoStream').sendMessage(connections[userId].publicId, message)
				}
			}
		}
		return dataChannels[userId];
	}
	this.onDataMessage = function (eventHandler, context, reset) {
		vlLog('Flash: setup data channel handler')
		if (reset) events.onDataMessage = [];
		events.onDataMessage.push({
			callback: eventHandler,
			context: (context ? context : this)
		});
	}
	this.dataMessageReceived = function (message) {
		vlLog('Flash: send to ' + events.onDataMessage.length + ' handlers');
		if (events.onDataMessage.length > 0) {
			for (var eventNum in events.onDataMessage) {
				events.onDataMessage[eventNum].callback.apply(window.VideolinkPlatformCurrentRoom.getFileSharingService(), [{
					data: message
				}]);
			}
		}
	}
	this.getConnections = function () {
		return connections;
	}
	this.sendOwnFarId = function (receiverFarId, ownNearId) {
		for (var userId in connections) {
			if (connections[userId].publicId == receiverFarId || connections[userId].oldIds.indexOf(receiverFarId) > -1) {
				self.sendMessage(userId, {
					type: 'farIdChange',
					farId: ownNearId
				});
			}
		}
	}
	this.hasDataHandlers = function () {
		return events.onDataMessage.length > 0;
	}
	config.initParams.vlRoom.getFileSharingService().setBlobChunkSize(64 * 1024);
}

function RTMPReceivedMessage(message) {
	window.videolinkPlatformConnection.dataMessageReceived(message);
}

function VLPReceivedNearId(farId, nearId) {
	window.videolinkPlatformConnection.sendOwnFarId(farId, nearId);
}
window.dontExistWhenRoomIsEmpty = false;
var VLWebRTCConnection = function (config) {
	var pc_config = {
		'iceServers': [{
			'url': 'stun:stun.l.google.com:19302'
		},
		{
			'url': 'turn:188.226.129.184',
			'credential': 'j@ds!k2jShq2',
			'username': 'videolink2.me'
		}]
	};
	var pcConstraints = {
		"optional": [{
			"DtlsSrtpKeyAgreement": true
		}]
	};
	var room = null
	var userId = null;
	var connections = {};
	var localStream;
	var self = this;
	var withVideo = window.getUserMediaConstants == window.getUserMediaConstantsVideo;
	var sharedScreenStream = null;
	var events = {
		onDataMessage: []
	}
	var socket = config.socket;
	this.sendMessage = function (uid, message) {
		socket.emit('message', {
			to: uid,
			from: userId,
			body: message
		})
	};
	this.compatibilityMode = function () {
		if (isWebRTC()) {
			if (typeof showAlert === 'function') {
				showAlert("Browser of one of participants doesn't support latest web technologies, so we have to switch to compatibility mode, " + "that can decrease call quality and turn off some features.");
			}
			socket.emit('stay-online', function () {
				switchProtocolTo('fl');
			})
		}
	}
	this.onStayOnline = function () {
		window.dontExistWhenRoomIsEmpty = true;
	}
	socket.on('stay-online', this.onStayOnline);
	this.getRTCOptions = function () {
		return {
			'mandatory': {
				'OfferToReceiveAudio': true,
				'OfferToReceiveVideo': true
			}
		};
	}
	this.getRTCOptionsNoAudioVideo = function () {
		return {
			'mandatory': {
				'OfferToReceiveAudio': false,
				'OfferToReceiveVideo': false
			}
		};
	}
	this.createPeerConnectionWithOwnVideo = function (userId, createDataChannel) {
		var pc = self.createPeerConnection(userId, null, null, createDataChannel);
		if (localStream != null) {
			pc.addStream(localStream);
		}
		return pc;
	}
	this.onNewMessage = function (message) {
		if (message.to == userId) {
			if (message.body.type == 'offer') {
				vlLog('WebRTC Connection: wow, got offer');
				var pc = self.createPeerConnectionWithOwnVideo(message.from);
				pc.peerBrowser = message.body.peerBrowser;
				pc.mode = message.body.mode;
				pc.setRemoteDescription(new RTCSessionDescription(message.body.desc), function () {
					vlLog('WebRTC Connection: creating answer');
					pc.createAnswer(function (localDesc) {
						vlLog('WebRTC Connection: answer is ready');
						pc.setLocalDescription(localDesc);
						self.sendMessage(message.from, {
							type: 'answer',
							desc: localDesc
						});
					}, function (error) {
						vlLog('WebRTC Connection: Answer error: ' + error, 'error');
					}, self.getRTCOptions())
				}, function (error) {
					vlLog('WebRTC Connection: Failed to set session description: ' + error.toString(), 'error');
				});
				connections[message.from] = pc;
				if (!isWebRTC()) {
					self.sendContactRequest(message.from);
				}
			} else if (message.body.type == 'answer') {
				vlLog('WebRTC Connection: got answer');
				connections[message.from].setRemoteDescription(new RTCSessionDescription(message.body.desc));
			} else if (message.body.type == 'candidate') {
				if (connections[message.from]) {
					var candidate = new RTCIceCandidate({
						sdpMLineIndex: message.body.label,
						candidate: message.body.candidate
					});
					vlLog('WebRTC Connection: ICE candidate: ' + message.body.candidate, 'debug');
					connections[message.from].addIceCandidate(candidate);
				} else {
					vlLog('WebRTC Connection: received ICE candidate for unexisting connection', 'error');
				}
			} else if (message.body.type == 'rtmp_offer') {
				vlLog('WebRTC Connection: got rtmp invite, switch to rtmp');
				self.compatibilityMode();
			} else if (message.body.type == 'broadcast_offer') {
				vlLog('WebRTC Connection: wow, got broadcast offer');
				var pc = self.createPeerConnection(message.from, true, 'screen_' + message.from);
				pc.setRemoteDescription(new RTCSessionDescription(message.body.desc), function () {
					vlLog('WebRTC Connection: broadcast description is set');
					pc.createAnswer(function (localDesc) {
						vlLog('WebRTC Connection: answer is ready');
						pc.setLocalDescription(localDesc);
						self.sendMessage(message.from, {
							type: 'broadcast_answer',
							desc: localDesc
						});
					}, function (error) {
						vlLog('WebRTC Connection: Broadcast answer error: ' + error, 'error');
					});
				}, function (error) {
					vlLog('WebRTC Connection: Failed to set broadcast session description: ' + error.toString(), 'error');
				});
				connections['screen_' + message.from] = pc;
			} else if (message.body.type == 'broadcast_answer') {
				vlLog('WebRTC Connection: got broadcast answer');
				window.videolinkPlatformScreenSharing.onBroadcastAnswer(message.from, message.body.desc);
			} else if (message.body.type == 'broadcast_candidate') {
				var candidate = new RTCIceCandidate({
					sdpMLineIndex: message.body.candidate.label,
					candidate: message.body.candidate.candidate
				});
				connections['screen_' + message.from].addIceCandidate(candidate);
			} else if (message.body.type == 'broadcast_incoming_candidate') {
				window.videolinkPlatformScreenSharing.onIncomingIceCandidate(message.from, message.body);
			} else if (message.body.type == 'stop_screen_sharing') {
				if (connections['screen_' + message.from]) {
					vlLog('WebRTC Connection: stop screen sharing');
					self.closePeerConnection('screen_' + message.from)
					config.onScreenSharingCompleted();
				}
			} else if (message.body.type == 'off') {
				self.remoteVideoContainerState(message.from, 'off');
			} else if (message.body.type == 'on') {
				self.remoteVideoContainerState(message.from, 'on');
			}
			else if (message.body.type == 'renegotiation') {
				vlLog('WebRTC Connection: received renegotiation message');
				if (message.body.peerBrowser == 'firefox' || webrtcDetectedBrowser == 'firefox') {
					self.closePeerConnection(message.from);
					connections[message.from] = self.createPeerConnectionWithOwnVideo(message.from);
					connections[message.from].peerBrowser = message.body.peerBrowser
					connections[message.from].mode = message.body.mode
				}
				var remotePeer = connections[message.from];
				remotePeer.setRemoteDescription(new RTCSessionDescription(message.body.desc), function () {
					vlLog('WebRTC Connection: updated user description');
					remotePeer.createAnswer(function (localDesc) {
						remotePeer.setLocalDescription(localDesc);
						vlLog('WebRTC Connection: sent updated answer');
						self.sendMessage(message.from, {
							type: 'answer',
							desc: localDesc
						});
					}, function (error) {
						vlLog('WebRTC Connection: Renegotiation answer updating error: ' + error, 'error');
					});
				}, function (error) {
					vlLog('WebRTC Connection: Renegotiation, failed to update session description: ' + error.toString(), 'error');
				});
				window.connections = connections;
			}
		}
	}
	this.remoteVideoContainerState = function (remoteContainerID, state) {
		vlLog("WebRTC Connection: video from " + remoteContainerID + " is " + state);
		var remoteContainer = 'video_' + remoteContainerID;
		if (state === 'off') {
			document.getElementById(remoteContainer).poster = 'https://videolink2.me/img/no_video.png';
		} else if (state === 'on') {
			document.getElementById(remoteContainer).poster = '';
		}
	};
	this.shareScreenToUser = function (screenReceiverUID) {
		window.videolinkPlatformScreenSharing.shareScreenToUser(screenReceiverUID);
	}
	this.shareScreen = function () {
		for (var uid in connections) {
			this.shareScreenToUser(uid);
		}
	}
	socket.on('message', this.onNewMessage);
	this.onNewUser = function (userInfo) {
		if (userInfo.id != userId) {
			vlLog('WebRTC Connection: new user connected');
			if (userInfo.protocol == 'rtmp') {
				vlLog('WebRTC Connection: switch to rtmp');
				self.compatibilityMode();
				return;
			}
			if (isWebRTC()) {
				vlLog('WebRTC Connection: new user has WebRTC enabled browser, create peer connection');
				var peer = self.createPeerConnectionWithOwnVideo(userInfo.id, true);
				peer.peerBrowser = userInfo.peerBrowser;
				peer.mode = userInfo.mode;
				peer.createOffer(function (localDesc) {
					peer.setLocalDescription(localDesc, function () {
						self.sendMessage(userInfo.id, {
							type: 'offer',
							desc: localDesc,
							peerBrowser: webrtcDetectedBrowser,
							mode: self.getCurrentMediaMode()
						});
					});
				}, function (error) {
					vlLog('WebRTC Connection: onNewUser: error while creating answer: ' + answer, 'error');
				}, self.getRTCOptions());
				connections[userInfo.id] = peer;
			} else {
				vlLog('WebRTC Connection: new user doesnt support WebRTC, create rtmfp connection');
				if (config.onRemoteStream) config.onRemoteStream(userInfo.id, null, null, null, false);
				config.initParams.vlRoom.fire('onRemoteParticipantConnected', []);
				self.sendContactRequest(userInfo.id);
			}
			if (self.isScreenShared()) {
				self.shareScreenToUser(userInfo.id);
			}
		}
	}
	this.isScreenShared = function () {
		return window.videolinkPlatformScreenSharing.isShared;
	}
	this.closePeerConnection = function (connectionId, triggerUI) {
		vlLog('WebRTC Connection: close peer connection');
		connections[connectionId].close();
		delete connections[connectionId];
		if (triggerUI !== false) {
			if (config.onUserLeft) config.onUserLeft(connectionId);
		}
	}
	this.onUserLeave = function (userInfo) {
		vlLog('WebRTC Connection: user #' + userInfo.id + ' left');
		if (connections[userInfo.id]) {
			self.closePeerConnection(userInfo.id);
			if (connections["screen_" + userInfo.id]) {
				self.closePeerConnection("screen_" + userInfo.id);
			}
		} else {
			vlLog('WebRTC Connection: got "leave" notification for unexisting connection', 'error');
		}
		if (document.getElementById('video_' + userInfo.id)) {
			if (config.onUserLeft) config.onUserLeft(userInfo.id);
			document.getElementById('video_' + userInfo.id).remove();
		}
	}
	this.onContactRequest = function (contactRequest) {
		if (contactRequest.receiver == userId) {
			if (config.onRemoteStream) {
				config.onRemoteStream(contactRequest.user_id, null, null, null, false);
			}
			config.initParams.vlRoom.fire('onRemoteParticipantConnected', []);
		}
	}
	this.sendContactRequest = function (receiverId) {
		socket.emit('contact', {
			receiver: receiverId
		});
	}
	this.isChatOnlyMode = function (constants) {
		var isInStringMode = (typeof(constants) === "string" && (constants == 'chat' || constants == 'chat-only'));
		var isInConfigMode = constants.mode && (constants.mode == 'chat' || constants.mode == 'chat-only');
		return isInStringMode || isInConfigMode;
	}
	this.shouldAcceptVideoStream = function (constants) {
		var isInStringMode = (typeof(constants) === "string" && constants == 'chat-only');
		var isInConfigMode = constants.mode && constants.mode == 'chat-only';
		return !(isInStringMode || isInConfigMode);
	}
	this.getCurrentMediaMode = function () {
		if (window.getUserMediaConstants == window.getUserMediaConstantsVideo) {
			return 'video';
		} else if (window.getUserMediaConstants == window.getUserMediaConstantsAudio) {
			return 'audio';
		} else {
			return 'chat';
		}
	}
	this.connect = function (roomId) {
		self.room = roomId;
		vlLog('WebRTC Connection: connect to room: ' + roomId);
		socket.emit('register', {
			protocol: 'webrtc'
		}, function (uid) {
			vlLog('WebRTC Connection: im=' + uid);
			userId = uid;
			socket.on('new_user', self.onNewUser);
			socket.on('leave', self.onUserLeave);
			socket.on('contact', self.onContactRequest);
			if (config.beforeCaptureMedia) config.beforeCaptureMedia();
			if (!self.isChatOnlyMode(window.getUserMediaConstants)) {
				vlLog('WebRTC Connection: Request user media streams');
				getUserMedia(window.getUserMediaConstants, function (stream) {
					vlLog('WebRTC Connection: received media streams approval');
					stream.mediaElement = self.createMediaElementForStream(stream, true);
					if (config.afterCaptureMedia) config.afterCaptureMedia();
					if (config.allowMediaCallback) config.allowMediaCallback();
					localStream = stream;
					if (config.onLocalStream) config.onLocalStream(stream);
					vlLog('WebRTC Connection: join the conference');
					socket.emit('join', {
						room: self.room,
						mode: self.getCurrentMediaMode(),
						peerBrowser: webrtcDetectedBrowser
					});
				}, function (error) {
					vlLog('WebRTC Connection: didn receive media streams', 'error');
					if (config.captureMediaError) config.captureMediaError();
				})
			} else {
				vlLog('WebRTC Connection: WebRTC, connecting in chat only mode');
				socket.emit('join', {
					room: self.room,
					mode: self.getCurrentMediaMode(),
					peerBrowser: webrtcDetectedBrowser
				});
			}
		});
	};
	this.leave = function () {
		vlLog('WebRTC Connection: leave connection!');
		socket.removeListener('stay-online', this.onStayOnline);
		socket.removeListener('message', this.onNewMessage);
		socket.removeListener('new_user', this.onNewUser)
		socket.removeListener('leave', this.onUserLeave);
		for (var uid in connections) {
			if (connections[uid]) {
				connections[uid].close();
				delete connections[uid];
			}
		}
	};
	this.mute = function () {
		var audioTracks = localStream.getAudioTracks();
		if (audioTracks && audioTracks[0]) {
			audioTracks[0].enabled = false;
		}
	};
	this.unmute = function () {
		var audioTracks = localStream.getAudioTracks();
		if (audioTracks && audioTracks[0]) {
			audioTracks[0].enabled = true;
		}
	};
	this.renegotiateWithAllPeers = function () {
		vlLog('WebRTC Connection: Renegotiation: received new stream');
		for (var uid in connections) {
			var peerBrowser = connections[uid].peerBrowser;
			var mode = connections[uid].mode;
			if (webrtcDetectedBrowser == 'firefox' || peerBrowser != 'chrome') {
				vlLog('WebRTC Connection: Renegotiation: close connection with #' + uid);
				self.closePeerConnection(uid);
				vlLog('WebRTC Connection: Renegotiation: create new con #' + uid);
				connections[uid] = self.createPeerConnectionWithOwnVideo(uid, true);
				connections[uid].peerBrowser = peerBrowser;
				connections[uid].mode = mode;
			} else {
				connections[uid].addStream(localStream);
			}
			vlLog('WebRTC Connection: Renegotiation: create offer for #' + uid);
			connections[uid].createOffer(function (localDesc) {
				connections[uid].setLocalDescription(localDesc, function () {
					vlLog('WebRTC Connection: Renegotiation: send offer to #' + uid);
					self.sendMessage(uid, {
						type: 'renegotiation',
						desc: localDesc,
						peerBrowser: webrtcDetectedBrowser,
						mode: self.getCurrentMediaMode()
					});
				})
			}, function (error) {
				vlLog('WebRTC Connection: Renegotiation: error while creating answer: ' + answer, 'error');
			}, self.getRTCOptions());
		}
		vlLog('WebRTC Connection: Renegotiations sent');
	}
	this.turnOffVideoStream = function () {
		vlLog('WebRTC Connection: turn off video cam');
		window.getUserMediaConstants = window.window.getUserMediaConstantsAudio;
		getUserMedia(window.getUserMediaConstants, function (stream) {
			withVideo = false;
			stream.mediaElement = self.createMediaElementForStream(stream, true);
			localStream.stop();
			localStream = stream;
			if (config.onLocalStreamChanged) config.onLocalStreamChanged(stream);
			self.renegotiateWithAllPeers();
			var videoTracks = localStream.getVideoTracks();
			if (videoTracks && videoTracks[0]) {
				videoTracks[0].enabled = false;
				localStream.mediaElement.poster = 'https://videolink2.me/img/no_video.png';
			}
			self.sendOnOffVideoMsg('off');
		}, function (error) {
			if (config.captureMediaError) config.captureMediaError();
		})
	};
	this.turnOnVideoStream = function () {
		vlLog('WebRTC Connection: turn on video cam');
		window.getUserMediaConstants = window.getUserMediaConstantsVideo;
		getUserMedia(window.getUserMediaConstants, function (stream) {
			stream.mediaElement = self.createMediaElementForStream(stream, true);
			localStream = stream;
			if (config.onLocalStreamChanged) config.onLocalStreamChanged(stream);
			self.renegotiateWithAllPeers();
			withVideo = true;
			localStream.mediaElement.poster = '';
			var videoTracks = localStream.getVideoTracks();
			if (videoTracks && videoTracks[0]) {
				videoTracks[0].enabled = true;
			}
			self.sendOnOffVideoMsg('on');
		}, function (error) {
			if (config.captureMediaError) config.captureMediaError();
		})
	};
	this.sendOnOffVideoMsg = function (mode) {
		for (var uid in connections) {
			if (connections[uid]) {
				self.sendMessage(uid, {
					type: mode,
					id: userId
				});
			}
		}
	};
	this.createPeerConnection = function (uid, screen, userId, createDataChannel) {
		var peer = new RTCPeerConnection(pc_config, pcConstraints);
		if (!userId) userId = uid;
		peer.onicecandidate = function (event) {
			if (event.candidate) {
				vlLog('WebRTC Connection: retrieved own ICE candidate: ' + event.candidate.candidate, 'debug');
				if (screen) {
					vlLog("Webrtc screen sharings: broadcast ice");
				}
				self.sendMessage(uid, {
					type: (screen ? 'broadcast_incoming_candidate' : 'candidate'),
					label: event.candidate.sdpMLineIndex,
					id: event.candidate.sdpMid,
					candidate: event.candidate.candidate
				})
			}
		}
		peer.onaddstream = function (event) {
			var connectioAlreadyExists = (connections[userId].videoEstablished || event.stream == null);
			vlLog('WebRTC Connection: new remote stream was added');
			connections[userId].videoEstablished = true;
			event.stream.mediaElement = self.createMediaElementForStream(event.stream);
			if (!connectioAlreadyExists) {
				if (config.onRemoteStream) config.onRemoteStream(userId, event.stream, null, connections[userId].mode == 'video', screen);
			} else {
				if (config.onRemoteStreamChanged) config.onRemoteStreamChanged(userId, event.stream);
			}
		}
		var setupDataChannel = function (dc) {
			dc.onmessage = function (message) {
				if (events.onDataMessage.length > 0) {
					for (var eventNum in events.onDataMessage) {
						events.onDataMessage[eventNum].callback.apply(events.onDataMessage[eventNum].context, [message]);
					}
				}
			}
			dc.onopen = function () {
				vlLog('WebRTC Connection: Webrtc DataChannel opened');
				if (peer.mode == 'chat') {
					if (config.onRemoteStream) config.onRemoteStream(userId);
				}
			}
			dc.onclose = function () {
				vlLog('WebRTC Connection: WebRTC DataChannel closed');
			}
			return dc;
		}
		if (createDataChannel) {
			peer.dataChannel = setupDataChannel(peer.createDataChannel("fileTransfer"))
		}
		peer.ondatachannel = function (event) {
			this.dataChannel = setupDataChannel(event.channel);
		}
		return peer;
	};
	this.createMediaElementForStream = function (stream, muted) {
		var mediaElement = document.createElement('video');
		mediaElement.src = window.URL.createObjectURL(stream);
		mediaElement.autoplay = true;
		if (muted == true) mediaElement.muted = true;
		return mediaElement;
	};
	this.getUserId = function () {
		return userId;
	};
	this.releaseCamera = function () {
		localStream.stop();
	}
	this.reconnect = function () {
		vlLog('WebRTC Connection: reconnect started')
		this.leave();
		config.initParams.vlRoom.cleanScene();
		window.videolinkPlatformConnection = VLMultiConnectionMediator.prototype.connectionFactory(config.initParams.room, config.initParams.socket, config.initParams.envOptions, config.initParams.vlRoom);
		config.initParams.vlRoom.getFileSharingService().initListeners();
	}
	this.getConnections = function () {
		return connections;
	}
	this.getDecorator = function () {
		return config.decorator;
	}
	this.meWithVideo = function () {
		return withVideo;
	}
	this.getDataChannelToUser = function (userId) {
		return connections[userId].dataChannel;
	}
	this.onDataMessage = function (eventHandler, context) {
		events.onDataMessage.push({
			callback: eventHandler,
			context: (context ? context : this)
		});
	}
	this.hasDataHandlers = function () {
		return events.onDataMessage.length > 0;
	}
	setInterval(function () {
		for (var uid in connections) {
			if (!connections[uid].videoEstablished) {
				if (connections[uid].getRemoteStreams().length > 0) {
					var isScreenStream = uid.indexOf("screen_") > -1;
					var remoteStream = connections[uid].getRemoteStreams()[0];
					remoteStream.mediaElement = self.createMediaElementForStream(remoteStream, isScreenStream);
					if (config.onRemoteStream) config.onRemoteStream(uid, remoteStream, null, null, isScreenStream);
					connections[uid].videoEstablished = true;
				}
			}
		}
		for (var uid in connections) {
			if (uid.indexOf('screen_') === 0) {
				if (connections[uid].iceConnectionState === 'disconnected') {
					self.closePeerConnection(uid);
				}
			}
		}
	}, 1000);
	var sheet = (function () {
		var style = document.createElement("style");
		style.appendChild(document.createTextNode(""));
		document.head.appendChild(style);
		return style.sheet;
	})();
	var style1 = 'span.no-video {' + "    background-image: url('https://videolink2.me/img/no_video.png');" + '    background-repeat: no-repeat;' + '    display: inline-block;' + '    width: 100%;' + '    max-height: 100%;' + '    background-position: center;' + '    background-size: auto 100%;' + '}';
	var style2 = 'span.no-video video {' + '    visibility: hidden !important;' + '}';
	sheet.insertRule(style1, 0);
	sheet.insertRule(style2, 1);
};
window.getUserMediaConstantsAudio = {
	audio: true
};
window.getUserMediaConstantsVideo = {
	video: {
		"mandatory": {
			"minWidth": "320",
			"maxWidth": "1280",
			"minHeight": "180",
			"maxHeight": "720",
			"minFrameRate": "5"
		}
	},
	audio: true
};
window.getUserMediaConstantsChat = {
	mode: 'chat'
}
window.getUserMediaConstantsChatOnly = {
	mode: 'chat-only'
}

function BasicDecorator(roomName, options, vlRoom) {
	this.connection;
	this.onLocalStreamAdded = function () {}
	this.onRemoteStreamAdded = function (stream, uid, remoteId, withVideo, isScreenStream) {}
	this.onRemoteHangup = function () {}
	this.onBeforeCaptureMedia = function () {}
	this.onAfterCaptureMedia = function () {}
	this.onAllowMediaCallback = function () {}
	this.onNoWebcam = function () {}
	this.onHangup = function () {}
	this.removeRemoteVideoElement = function (elementId, elementType) {
		if (elementType == null) elementType = 'video';
		var elementContainer = options.remoteContainer;
		if (elementId.indexOf('video_screen_') > -1) {
			elementContainer = document.getElementById(window.VLPScreenVideoContainer);
		}
		if (elementContainer) {
			var videoElements = elementContainer.getElementsByTagName(elementType);
			if (videoElements.length > 0) {
				for (var i in videoElements) {
					if (videoElements[i] && videoElements[i].id == elementId) {
						if (elementType == 'video') {
							elementContainer.removeChild(videoElements[i].parentNode);
						} else {
							elementContainer.removeChild(videoElements[i]);
						}
					}
				}
			}
		}
	}
	this.saveConnectionType = function (uid) {
		if (!vlRoom.logger.connectionLogged) {
			vlRoom.logger.connectionLogged = true;
			getConnectionTypeForPeer(uid, function (type) {
				vlRoom.logger.setConnectionType(type);
			})
		}
	}
	this.onScreenSharingStarted = function () {
		vlRoom.fire('onScreenSharingStarted');
	}
	this.onScreenSharingCompleted = function () {
		vlRoom.fire('onScreenSharingCompleted');
	}
	this.isOwnVideoPositionFixed = function () {
		return options.fixedOwnVideoPosition && options.fixedOwnVideoPosition === true;
	}
	this.getLocalVideoContainer = function () {
		var localVideoContainer = options.remoteContainer;
		if (this.isOwnVideoPositionFixed()) {
			localVideoContainer = options.localContainer;
		}
		if (!localVideoContainer) {
			localVideoContainer = document.createElement('div');
			localVideoContainer.style.display = 'none';
			localVideoContainer.id = 'VLPDefaultVideoContainer';
			document.body.appendChild(localVideoContainer);
		}
		return localVideoContainer;
	}
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
BasicDecorator.prototype.initElements = function () {};
BasicDecorator.prototype.onScreenShared = function () {};
BasicDecorator.prototype.onScreenStopped = function () {};
BasicDecorator.prototype.releaseCamera = function () {};

function RTMPDecorator(roomName, options, vlRoom) {
	BasicDecorator.call(this, roomName, options, vlRoom);
	this.getIdByType = function (type, userId) {
		if (type == 'local') {
			return 'localVideoStream';
		} else if (type == 'remote') {
			return 'stream_' + userId;
		}
	}
	this.getFlashMovie = function (movieName) {
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		return (isIE) ? window[movieName] : document[movieName];
	}
	this.getStreamElement = function (type, userId, remoteId, streamWithVideo) {
		var applicationName = this.room;
		var flashFile;
		var width = 640;
		var height = 480;
		var containerId = 'user_' + userId;
		var id = this.getIdByType(type, userId)
		var src;
		if (type == 'local') {
			containerId = 'selfvideo';
			src = RESOURCES_PATH + 'phone_out.swf?2';
		} else if (type == 'remote') {
			id = 'stream_' + userId;
			width = '100%';
			height = '100%';
			src = RESOURCES_PATH + 'phone_in.swf?2';
			this.saveConnectionType(userId);
		} else {
			return;
		}
		if (document.getElementById(id) !== null) return;
		width = '100%';
		height = '100%';
		var div = document.createElement('div');
		var container = document.createElement('div');
		container.id = containerId;
		div.id = id;
		container.appendChild(div);
		container.className += ' video_container';
		container.style.width = '100%';
		container.style.height = '100%';
		if (type == 'remote') {
			if (options.remoteContainer) {
				if (options.remoteContainer.getElementsByTagName('object').length == 1) {
					if (!this.isOwnVideoPositionFixed()) {
						document.getElementById('selfvideo').className += ' minimized';
					}
				}
				that.removeRemoteVideoElement(id, 'div');
			} else {
				options.remoteContainer = document.createElement('div');
				options.remoteContainer.id = 'VLPDefaultVideoContainer';
				options.remoteContainer.style.display = 'block';
				options.remoteContainer.style.position = 'absolute';
				options.remoteContainer.style.zIndex = '-1000';
				options.remoteContainer.style.top = '-1000px';
				options.remoteContainer.style.left = '-1000px';
				document.body.appendChild(options.remoteContainer);
			}
			options.remoteContainer.appendChild(container);
		} else {
			var localVideoContainer = this.getLocalVideoContainer();
			if (localVideoContainer) {
				localVideoContainer.appendChild(container);
				localVideoContainer.style.zIndex = 1;
			}
		}
		var shareVideoStream = window.getUserMediaConstants == window.getUserMediaConstantsVideo;
		var shareAudioStream = window.getUserMediaConstants == window.getUserMediaConstantsAudio;
		var withVideo = (shareVideoStream ? "Y" : "N");
		var withMedia = (shareVideoStream || shareAudioStream ? "Y" : "N");
		if (type == 'remote') withVideo = (streamWithVideo ? "Y" : "N");
		var flashvars = {
			SERVER_ADDRESS: 'rtmfp://stratus.adobe.com/',
			DEVELOPER_KEY: 'd1e1e5b3f17e90eb35d244fd-c711881365d9',
			WITH_VIDEO: withVideo
		};
		if (type != 'remote') {
			flashvars.WITH_MEDIA = withMedia;
		}
		var params = {
			allowScriptAccess: 'always',
			bgcolor: '#000000',
			play: true,
			scale: true,
			wmode: 'transparent'
		};
		var attributes = {
			id: id,
			name: id
		};
		if (withMedia == "N") {
			container.style.width = '1';
			container.style.height = '1';
			container.style.visibility = 'hidden';
			var localVideoContainerElement = document.getElementById('VLPDefaultVideoContainer');
			if (localVideoContainerElement) {
				localVideoContainerElement.style.display = 'block';
				localVideoContainerElement.position = 'absolute';
				localVideoContainerElement.top = '-1000px';
				localVideoContainerElement.left = '-1000px';
				localVideoContainerElement.zIndex = '-1000';
			}
		}
		swfobject.embedSWF(src, id, width, height, "10.0.0", "expressInstall.swf", flashvars, params, attributes);
	}
	this.initStreamElement = function (type, userId, remoteId) {
		var id = this.getIdByType(type, userId)
		var repeat = false;
		try {
			if (this.getFlashMovie(id).isReady()) {
				if (type == 'local') {
					var peerId = this.getFlashMovie(id).getPeerId();
					if (peerId) {
						vlLog('Flash decorator: webcam connected');
						window.VLUserPublicId = peerId;
						window.videolinkPlatformConnection.join();
					}
				} else if (type == 'remote' && remoteId != null) {
					this.getFlashMovie(id).initInStream(remoteId);
				}
			} else {
				repeat = true;
			}
		} catch (e) {
			console.log(e);
			repeat = (e instanceof TypeError);
		}
		if (repeat) {
			setTimeout(function () {
				that.initStreamElement(type, userId, remoteId);
			}, 1000);
		}
	}
	this.onLocalStreamAdded = function (streamId) {
		if (!window.videolinkPlatformConnection.inCall) {
			vlLog('Flash decorator: init local elements #' + streamId);
			that.getStreamElement('local', streamId);
			that.initStreamElement('local', streamId);
		}
		vlRoom.fire('onLocalStream', [streamId]);
		vlRoom.fire('onConnected');
	}
	this.onRemoteStreamAdded = function (streamId, uid, remoteId, streamWithVideo) {
		vlLog("Flash decorator: Remote stream added. #" + streamId + "/" + remoteId + (streamWithVideo ? ' with video' : ' voice only'));
		that.getStreamElement('remote', streamId, remoteId, streamWithVideo);
		that.initStreamElement('remote', streamId, remoteId);
		window.videolinkPlatformConnection.inCall = true;
		vlRoom.fire('onRemoteParticipantConnected', [streamId, uid, remoteId, streamWithVideo]);
	}
	this.onRemoteHangup = function (streamId) {
		vlLog('Flash decorator: Session terminated. #' + streamId);
		that.removeRemoteVideoElement('user_' + streamId, 'div');
		if (options.remoteContainer.getElementsByTagName('object').length == 1) {
			document.getElementById('selfvideo').className = document.getElementById('selfvideo').className.replace(/(\s|^)minimized(\s|$)/, '');
			vlRoom.fire('onEmpty');
		}
		vlRoom.fire('onRemoteParticipantDisconnected', [streamId]);
	}
	this.publicId;
	this.isMuted = false;
	var that = this;
	this.STRATUS_URL = 'rtmfp://stratus.rtmfp.net/d1e1e5b3f17e90eb35d244fd-c711881365d9/';
	var serverAddress = window.closest_server;
	window.currentProtocol = 'fl';
	this.shareScreen = function () {
		if (typeof showAlert === 'function') {
			showAlert('Screen sharing is not supported by your browser. Please install latest version of Chrome of Firefox web browser.');
		}
	}
	this.stop = function () {
		this.connection.leave();
	}
	this.onHangup = function () {
		document.getElementById('selfvideo').remove();
	}
}
RTMPDecorator.prototype.constructor = BasicDecorator;
RTMPDecorator.prototype = Object.create(BasicDecorator.prototype);
window.VLUserPublicId = null;

function rtmpUserDisconnected(streamId) {
	vlLog('Flash decorator: User stream ended #' + streamId);
	window.webrtcConnection.onRemoteHangup(streamId);
}
window.onresize = function () {}

function status(msg) {
	console.log('Embed: ' + msg);
}

function VLPlafrormCameraReceived() {
	window.VideolinkPlatformCurrentRoom.logger.setVideo(640, 480);
}

function VLPlafrormMicrophoneReceived() {
	window.VideolinkPlatformCurrentRoom.logger.setSound();
}

function WebRTCDecorator(roomName, options, vlRoom) {
	BasicDecorator.call(this, roomName, options, vlRoom);
	this.soundCheckPassed = false;
	this.localStream = null;
	var that = this;
	this.logLocalVideoSize = function () {
		var container = options.remoteContainer;
		if (options.localContainer.getElementsByTagName('video').length > 0) {
			container = options.localContainer;
		}
		var videoElement = container.getElementsByTagName('video');
		if (videoElement[0].videoWidth > 0 && videoElement[0].videoHeight > 0) {
			vlRoom.logger.setVideo(videoElement[0].videoWidth, videoElement[0].videoHeight);
		} else {
			setTimeout(function () {
				that.logLocalVideoSize()
			}, 1000);
		}
	}
	this.addElementIntoContainer = function (container, element) {
		var subContainer = document.createElement('span');
		subContainer.appendChild(element);
		container.appendChild(subContainer);
	}
	this.moveElementToAnotherContainer = function (targetContainer, element) {
		that.addElementIntoContainer(targetContainer, element);
	}
	this.onLocalStreamAdded = function (stream) {
		that.localStream = stream;
		if (!window.videolinkPlatformConnection.inCall) {
			var localVideoContainer = that.getLocalVideoContainer();
			that.addElementIntoContainer(localVideoContainer, stream.mediaElement);
			if (window.isFirefox) {
				stream.mediaElement.play();
			}
			var videoElement = localVideoContainer.getElementsByTagName('video');
			if (videoElement.length > 0) {
				that.addPosterIfNeeded(videoElement[0], stream);
				videoElement[0].removeAttribute("controls");
				videoElement[0].style.width = '100%';
				videoElement[0].style.height = '100%';
				videoElement[0].muted = true;
				vlLog('WebRTC decorator: local video received');
				that.logLocalVideoSize();
				var audioContext = typeof(webkitAudioContext) !== "undefined" ? new webkitAudioContext() : new window.AudioContext();
				var analyser = audioContext.createAnalyser();
				var microphone = audioContext.createMediaStreamSource(stream);
				if (typeof(audioContext.createJavaScriptNode) !== "undefined") {
					javascriptNode = audioContext.createJavaScriptNode(2048, 1, 1);
				} else {
					javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
				}
				analyser.smoothingTimeConstant = 0.3;
				analyser.fftSize = 1024;
				microphone.connect(analyser);
				analyser.connect(javascriptNode);
				javascriptNode.connect(audioContext.destination);
				javascriptNode.onaudioprocess = function () {
					if (!self.soundCheckPassed) {
						var array = new Uint8Array(analyser.frequencyBinCount);
						analyser.getByteFrequencyData(array);
						var values = 0;
						var length = array.length;
						for (var i = 0; i < length; i++) {
							values += array[i];
						}
						var level = values / length;
						if (level > 0) {
							self.soundCheckPassed = true;
							vlRoom.logger.setSound();
						}
					}
				}
			}
		}
		vlRoom.fire('onLocalStream', [stream]);
		vlRoom.fire('onConnected');
	}
	this.onLocalStreamChanged = function (stream) {
		that.localStream = stream;
		var videoElement = options.localContainer.getElementsByTagName('video');
		if (!videoElement) {
			videoElement = options.remoteContainer.getElementsByTagName('video')
		}
		if (videoElement.length > 0) {
			videoElement[0].src = stream.mediaElement.src;
			videoElement[0].play();
			that.addPosterIfNeeded(videoElement[0], stream);
		}
	}
	this.onRemoteStreamAdded = function (stream, uid, remoteId, withVideo, isScreenStream) {
		var videoAttrId = 'video_' + uid;
		if (options.localContainer && options.localContainer.getElementsByTagName('video').length == 0 && options.remoteContainer.getElementsByTagName('video').length > 0) {
			that.moveElementToAnotherContainer(options.localContainer, options.remoteContainer.getElementsByTagName('video')[0]);
			options.localContainer.getElementsByTagName('video')[0].play();
			that.addPosterIfNeeded(options.localContainer.getElementsByTagName('video')[0], that.localStream);
		}
		if (stream != null) {
			stream.mediaElement.id = videoAttrId;
			stream.mediaElement.removeAttribute("controls");
			if (stream.getVideoTracks().length == 0) {
				stream.mediaElement.poster = 'https://videolink2.me/img/no_video.png';
			}
		}
		var videoContainer = options.remoteContainer;
		if (isScreenStream) {
			videoContainer = document.getElementById(window.VLPScreenVideoContainer);
			this.onScreenSharingStarted();
		}
		if (videoContainer) {
			if (stream != null) {
				that.addElementIntoContainer(videoContainer, stream.mediaElement);
				if (!isScreenStream) {
					that.addPosterIfNeeded(document.getElementById(videoAttrId), stream, withVideo);
				}
				if (window.isFirefox) {
					stream.mediaElement.play();
				}
			} else {
				var div = document.createElement('div');
				div.id = videoAttrId;
				div.style.height = '100%';
				div.style.textAlign = 'center';
				var img = document.createElement('img');
				img.src = 'https://videolink2.me/img/no_video.png';
				img.style.border = 0;
				img.style.maxWidth = '100%';
				img.style.maxHeight = '100%';
				div.appendChild(img);
				videoContainer.appendChild(div);
			}
		}
		window.videolinkPlatformConnection.inCall = true;
		this.saveConnectionType(uid);
		vlRoom.fire('onRemoteParticipantConnected', [stream, uid, remoteId, withVideo]);
	}
	this.onRemoteStreamChanged = function (uid, stream) {
		var videoAttrId = 'video_' + uid;
		var videoElement = document.getElementById(videoAttrId);
		if (videoElement) {
			videoElement.src = stream.mediaElement.src;
			that.addPosterIfNeeded(videoElement, stream);
		}
	}
	this.addPosterIfNeeded = function (videoElement, stream, withVideo) {
		videoElement.parentNode.className = '';
		if (stream.getVideoTracks().length == 0 || withVideo === false) {
			videoElement.parentNode.className = 'no-video';
			videoElement.poster = 'https://videolink2.me/img/no_video.png';
		}
	}
	this.onRemoteHangup = function (remoteId) {
		that.removeRemoteVideoElement('video_' + remoteId);
		if (vlRoom.getNumberOfParticipants() == 0) {
			if (options.remoteContainer && !that.isOwnVideoPositionFixed()) {
				that.addElementIntoContainer(options.remoteContainer, options.localContainer.getElementsByTagName('video')[0]);
				options.remoteContainer.getElementsByTagName('video')[0].play();
				options.localContainer.innerHTML = '';
			}
			vlRoom.fire('onEmpty');
		}
		vlRoom.fire('onRemoteParticipantDisconnected', [remoteId]);
	}
	this.onBeforeCaptureMedia = function () {
		vlRoom.fire('onBeforeCaptureMedia');
	}
	this.onAfterCaptureMedia = function () {
		vlRoom.fire('onAfterCaptureMedia');
	}
	this.onAllowMediaCallback = function () {
		vlRoom.fire('onAllowMediaCallback');
	}
	this.onNoWebcam = function () {
		vlRoom.fire('onNoWebcam');
	}
}
WebRTCDecorator.prototype.constructor = BasicDecorator;
WebRTCDecorator.prototype = Object.create(BasicDecorator.prototype);

function VLPlatformDecoratorFactory() {}
VLPlatformDecoratorFactory.prototype.createDecorator = function (options, vlRoom) {
	if (isWebRTC()) {
		return new WebRTCDecorator(options.name, options, vlRoom);
	} else {
		return new RTMPDecorator(options.name, options, vlRoom);
	}
}
if (typeof(io) == "undefined") {
	document.write('<scr' + 'ipt src="' + SERVER_HOST + '/signaler/socket.io/socket.io.js"></scr' + 'ipt>')
}

function VideolinkPlatformConnector(settings, onReady, onError) {
	var self = this;
	vlLog('VPConnector: init connection object');
	vlLog('VPConnector: check connection type in settings');
	if (settings.hasOwnProperty("connectionType")) {
		var connectionType = settings.connectionType;
		if (connectionType == "video") {
			window.getUserMediaConstants = window.getUserMediaConstantsVideo;
		} else if (connectionType == "audio") {
			window.getUserMediaConstants = window.getUserMediaConstantsAudio;
		} else if (connectionType == "chat") {
			window.getUserMediaConstants = window.getUserMediaConstantsChat;
		} else if (connectionType == "chat-only") {
			window.getUserMediaConstants = window.getUserMediaConstantsChatOnly;
		}
	}
	var setCookie = function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	var getCookie = function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	var createScene = function (container) {
		var link = document.createElement('link')
		link.setAttribute('rel', 'stylesheet')
		link.setAttribute('type', 'text/css')
		link.setAttribute('href', SERVER_HOST + '/css/scene.css')
		document.getElementsByTagName('head')[0].appendChild(link)
		var localContainer = document.createElement('div');
		localContainer.id = 'VLLocalVideoContainer';
		container.appendChild(localContainer);
		var remoteContainer = document.createElement('div');
		remoteContainer.id = 'VLRemoteContainer';
		container.appendChild(remoteContainer);
		if (window.VLPScreenVideoContainer != null && window.VLPScreenVideoContainer != '' && !document.getElementById(window.VLPScreenVideoContainer)) {
			var screenContainer = document.createElement('div');
			screenContainer.id = window.VLPScreenVideoContainer;
			remoteContainer.appendChild(screenContainer);
		}
		var remoteVideoContainer = document.createElement('div');
		remoteVideoContainer.id = 'VLRemoteVideoContainer';
		remoteContainer.appendChild(remoteVideoContainer);
		var miniVideoContainer = document.createElement('div');
		miniVideoContainer.id = 'VLMiniVideoContainer';
		remoteContainer.appendChild(miniVideoContainer);
	}
	var getLocalId = function () {
		return getCookie('localUserId');
	};
	var setLocalId = function (localId) {
		setCookie('localUserId', localId, 365);
	};
	if (window.getUserMediaConstants == null) {
		window.getUserMediaConstants = window.getUserMediaConstantsVideo;
	}
	if (isMobileDevice && VideolinkPlatformSettings.supportChatOnlyConnections) {
		window.getUserMediaConstants = window.getUserMediaConstantsChatOnly;
	}
	var createConnectorInstance = function (socket, managementSocket, logSocket, callback) {
		vlLog('VPConnector: receive user id');
		managementSocket.emit('me', {
			localId: getLocalId()
		}, function (uid, localId) {
			vlLog('VPConnector: id received');
			setLocalId(localId);
			callback({
				apiKey: settings.apiKey,
				userId: localId,
				socket: socket,
				managementSocket: managementSocket,
				createRoom: function (options, onReady) {
					vlLog('VPConnector: create new room');
					options.apiKey = settings.apiKey;
					options.logger = logSocket;
					options.serverUid = uid;
					options.onReady = onReady;
					if (!options.remoteContainer) options.remoteContainer = document.getElementById('VLRemoteVideoContainer');
					if (!options.localContainer) options.localContainer = document.getElementById('VLMiniVideoContainer');
					window.VideolinkPlatformCurrentRoom = new VideolinkPlatformRoom(localId, socket, managementSocket, options);
					vlLog('VPConnector: room created');
					return window.VideolinkPlatformCurrentRoom;
				}
			})
		});
	}
	vlLog('VPConnector: opening socket');
	var socket = io.connect(SERVER_HOST, {
		resource: 'signaler/socket.io',
		'force new connection': true
	});
	vlLog('VPConnector: opening subsockets');
	var logSocket = socket.of('/log');
	var managementSocket = socket.of('/management');
	var inChatOnlyMode = window.getUserMediaConstants == window.getUserMediaConstantsChatOnly;
	vlLog('VPConnector: start connection');
	managementSocket.emit('connect', {
		apiKey: settings.apiKey
	}, function (connected) {
		if (connected) {
			vlLog('VPConnector: connection established');
			if (settings.container && !inChatOnlyMode) {
				createScene(document.getElementById(settings.container));
			}
			createConnectorInstance(socket, managementSocket, logSocket, onReady);
		} else {
			vlLog('API error', 'error');
			onError('Invalid API key');
		}
	})
}

function VideolinkPlatformRoom(userId, socket, managementSocket, options) {
	var listeners = {};
	var self = this;
	var fileSharingService;
	this.logger = new VideolinkPlatformLogger(options.logger);
	this.getListeners = function () {
		return listeners
	}
	this.on = function (eventName, callback) {
		if (!listeners[eventName]) listeners[eventName] = [];
		listeners[eventName].push(callback);
		return this;
	}
	this.fire = function (eventName, arguments) {
		if (!arguments) arguments = [];
		if (listeners[eventName] && listeners[eventName].length > 0) {
			for (var i in listeners[eventName]) {
				listeners[eventName][i].apply(undefined, arguments);
			}
		}
	}
	this.getUserId = function () {
		return userId;
	}
	this.leave = function () {
		window.videolinkPlatformConnection.leave();
	}
	this.releaseCamera = function () {
		window.videolinkPlatformConnection.releaseCamera();
	}
	this.sendMessage = function (receiverId, messagePayload) {
		vlLog('Room: sendMessage is not implemented yet', 'error');
	}
	this.sendBroadcastMessage = function (messagePayload) {
		messagePayload.initiator = userId;
		messagePayload.initiatorUID = this.getConnection().getUserId();
		managementSocket.emit('broadcast', messagePayload);
	}
	this.sendDataMessage = function (messagePayload) {
		messagePayload.initiator = userId;
		messagePayload.initiatorUID = this.getConnection().getUserId();
		for (var uid in this.getConnection().getConnections()) {
			this.getConnection().getDataChannelToUser(uid).send(JSON.stringify(messagePayload));
		}
	}
	this.mute = function () {
		window.videolinkPlatformConnection.mute();
	}
	this.unmute = function () {
		window.videolinkPlatformConnection.unmute();
	}
	this.muteWebcam = function () {
		window.videolinkPlatformConnection.turnOffVideoStream();
	}
	this.unmuteWebcam = function () {
		window.videolinkPlatformConnection.turnOnVideoStream();
	}
	this.hangup = function () {
		vlLog('Room: close VL connection');
		this.leave();
		window.videolinkPlatformConnection.getDecorator().onHangup();
		this.releaseCamera();
		socket.disconnect();
	}
	this.cleanScene = function () {
		var remoteContainer = options.remoteContainer;
		var localContainer = options.localContainer;
		if (!remoteContainer) remoteContainer = document.getElementById('VLRemoteVideoContainer');
		if (!localContainer) localContainer = document.getElementById('VLMiniVideoContainer');
		if (localContainer) {
			localContainer.innerHTML = '';
		}
		if (remoteContainer) {
			remoteContainer.innerHTML = '';
		}
	}
	managementSocket.emit('join_room', {
		room_id: options.name
	});
	managementSocket.on('broadcast', function (message) {
		self.fire('onBroadcastMessage', [message]);
	})
	var signalingSocket = socket.of('/signalling');
	signalingSocket.emit('connect', {
		apiKey: options.apiKey
	}, function (connected) {
		if (connected) {
			vlLog('Room: connected to signalling');
			self.logger.send('connect', {
				apiKey: options.apiKey,
				userId: userId,
				currentRoom: options.name,
				userAgent: navigator.userAgent
			}, function (connected) {
				if (connected) {
					vlLog('Room: connected to logger');
					window.videolinkPlatformConnection = new VLMultiConnectionMediator(options.name, signalingSocket, options, self)
					vlLog('Room: connection ready, run callbacks');
					if (options.onReady) {
						options.onReady.call(self, self);
					}
					window.videolinkPlatformConnection.onDataMessage(function (event) {
						self.fire('onDataMessage', [JSON.parse(event.data)])
					})
				} else {
					vlLog('Room/logger: Invalid API key', 'error');
				}
			});
		} else {
			vlLog('Room/signalling: Invalid API key', 'error');
		}
	})
	this.isWebcamShared = function () {
		return window.videolinkPlatformConnection.meWithVideo();
	}
	this.getConnection = function () {
		return window.videolinkPlatformConnection;
	}
	this.getFileSharingService = function () {
		if (!VideolinkPlatformRoom.prototype.fileSharingService) {
			vlLog('Room: filesharing created');
			fileSharingService = new FileSharing(this);
			VideolinkPlatformRoom.prototype.fileSharingService = new FileSharing(this);
		} else if (!fileSharingService) {
			vlLog('Room: filesharing reused');
			fileSharingService = VideolinkPlatformRoom.prototype.fileSharingService;
		}
		return fileSharingService;
	}
	this.fileSharingServiceExists = function () {
		return !!VideolinkPlatformRoom.prototype.fileSharingService;
	}
	this.getUID = function () {
		return options.serverUid;
	}
	this.getNumberOfParticipants = function () {
		var count = 0;
		for (var c in this.getConnection().getConnections()) {
			count++;
		}
		return count;
	}
}
var VLMultiConnectionMediator = function (room, socket, envOptions, vlRoom) {
	return this.connectionFactory(room, socket, envOptions, vlRoom);
}
VLMultiConnectionMediator.prototype.connectionFactory = function (room, socket, envOptions, vlRoom) {
	var decorator = VLPlatformDecoratorFactory.prototype.createDecorator(envOptions, vlRoom);
	var conferenceConfig = {
		room: room,
		onUserLeft: decorator.onRemoteHangup,
		onLocalStream: decorator.onLocalStreamAdded,
		onLocalStreamChanged: decorator.onLocalStreamChanged,
		onRemoteStream: function (uid, stream, remoteId, withVideo, isScreenStream) {
			decorator.onRemoteStreamAdded(stream, uid, remoteId, withVideo, isScreenStream);
		},
		onRemoteStreamChanged: decorator.onRemoteStreamChanged,
		beforeCaptureMedia: decorator.onBeforeCaptureMedia,
		afterCaptureMedia: decorator.onAfterCaptureMedia,
		allowMediaCallback: decorator.onAllowMediaCallback,
		captureMediaError: decorator.onNoWebcam,
		socket: socket,
		initParams: {
			room: room,
			socket: socket,
			envOptions: envOptions,
			vlRoom: vlRoom
		},
		decorator: decorator,
		onScreenSharingCompleted: decorator.onScreenSharingCompleted,
	};
	var conference;
	if (isWebRTC()) {
		vlLog('ConnectionMediator: create WebRTC connection');
		conference = new VLWebRTCConnection(conferenceConfig);
	} else {
		vlLog('ConnectionMediator: create RTMPF connection');
		conference = new VLRTMPConference(conferenceConfig);
	}
	conference.connect(conferenceConfig.room);
	return conference;
}

function VLStatsReportGroup(statsReportObject) {
	this.id = statsReportObject.id;
	this.type = statsReportObject.type;
	this.properties = {};
	if (statsReportObject.names) {
		var names = statsReportObject.names();
		for (var i = 0; i < names.length; ++i) {
			this.properties[names[i]] = statsReportObject.stat(names[i]);
		}
	} else {
		for (var prop in statsReportObject) {
			this.properties[prop] = statsReportObject[prop];
		}
	}
}

function VLStatsReport(rawStats) {
	this.groups = [];
	this.getGroupById = function (groupId) {
		for (var i in this.groups) {
			var group = this.groups[i];
			if (group.id == groupId) {
				return group;
			}
		}
	}
	this.getIncomingBandwidth = function (callback) {}
	this.getOutgoingBandwidth = function (callback) {}
	if (rawStats.result) {
		var results = rawStats.result();
	} else {
		results = rawStats;
	}
	for (var i in results) {
		var res = results[i];
		if (!res.local || res.local === res) {
			var group = new VLStatsReportGroup(res);
			if (group.type) this.groups.push(group);
		}
	}
}

function VLStatsReportChrome(rawStats) {
	VLStatsReport.call(this, rawStats);
	this.getBandwidthProperty = function (prop) {
		var bandwidthInfo = this.getGroupById('bweforvideo');
		if (bandwidthInfo) {
			return bandwidthInfo.properties[prop];
		}
	}
	this.getIncomingBandwidth = function (callback) {
		callback(this.getBandwidthProperty('googAvailableReceiveBandwidth'));
	}
	this.getOutgoingBandwidth = function (callback) {
		callback(this.getBandwidthProperty('googAvailableSendBandwidth'));
	}
}
VLStatsReportChrome.prototype.constructor = VLStatsReport;
VLStatsReportChrome.prototype = Object.create(VLStatsReport.prototype);

function VLStatsMeasurementItem(groupId, property, startValue, callback, report, connection, mediaElement) {
	this.groupId = groupId;
	this.property = property;
	this.startValue = startValue;
	this.callback = callback;
	this.report = report;
	this.connection = connection;
	this.mediaElement = mediaElement;
	this.started = new Date().getTime();
}

function VLStatsReportFirefox(rawStats, connection, mediaElement) {
	VLStatsReport.call(this, rawStats);
	this.getGroupPropertyValue = function (groupId, property) {
		var incomingBandwidthGroup = this.getGroupById(groupId);
		if (incomingBandwidthGroup) {
			return incomingBandwidthGroup.properties[property];
		}
	}
	this.startBandwidthMeasurement = function (groupId, property, callback) {
		var bytes = this.getGroupPropertyValue(groupId, property);
		if (bytes) {
			VLStatsReportFirefox.prototype.queue.push(new VLStatsMeasurementItem(groupId, property, bytes, callback, this, connection, mediaElement));
			if (!VLStatsReportFirefox.prototype.isWorkerAlive) {
				VLStatsReportFirefox.prototype.isWorkerAlive = true;
				VLStatsReportFirefox.prototype.workerInterval = setInterval(function () {
					VLStatsReportFirefox.prototype.processQueue();
				}, 1000);
			}
		} else {
			callback(null);
		}
	}
	this.getIncomingBandwidth = function (callback) {
		this.startBandwidthMeasurement('inbound_rtp_video_2', 'bytesReceived', callback);
	}
	this.getOutgoingBandwidth = function (callback) {
		this.startBandwidthMeasurement('inbound_rtcp_video_2', 'bytesSent', callback);
	}
}
VLStatsReportFirefox.prototype.constructor = VLStatsReport;
VLStatsReportFirefox.prototype = Object.create(VLStatsReport.prototype);
VLStatsReportFirefox.prototype.queue = [];
VLStatsReportFirefox.prototype.isWorkerAlive = false;
VLStatsReportFirefox.prototype.workerInterval = null;
VLStatsReportFirefox.prototype.requestCurrentStats = function (item, measurementTime) {
	item.connection.getStats(item.mediaElement, function (rawStats) {
		var currentStatsReport = new VLStatsReportFirefox(rawStats);
		var currentBytesAmountValue = currentStatsReport.getGroupPropertyValue(item.groupId, item.property);
		var bytesTransferred = currentBytesAmountValue - item.startValue;
		var bandwidth = Math.round((bytesTransferred / measurementTime) * 1000);
		item.callback(bandwidth);
	}, function (error) {
		console.log('Can\'t retrieve stats: ' + error);
	})
}
VLStatsReportFirefox.prototype.processQueue = function () {
	if (VLStatsReportFirefox.prototype.queue.length > 0) {
		var currentTimestamp = new Date().getTime();
		for (var i = 0; i < VLStatsReportFirefox.prototype.queue.length; i++) {
			var item = VLStatsReportFirefox.prototype.queue[i];
			var measurementTime = currentTimestamp - item.started;
			if (measurementTime >= 1000) {
				VLStatsReportFirefox.prototype.requestCurrentStats(item, measurementTime);
				VLStatsReportFirefox.prototype.queue[i] = null;
			}
		}
		VLStatsReportFirefox.prototype.queue = VLStatsReportFirefox.prototype.queue.filter(function (item) {
			return item != null;
		})
		if (VLStatsReportFirefox.prototype.queue.length == 0) {
			clearInterval(VLStatsReportFirefox.prototype.workerInterval);
			VLStatsReportFirefox.prototype.isWorkerAlive = false;
		}
	}
}

function statsReportCallback(callback, connection, mediaElement) {
	return function (rawStats) {
		var statsReport;
		if (inFirefox()) {
			statsReport = new VLStatsReportFirefox(rawStats, connection, mediaElement);
		} else if (inChrome()) {
			statsReport = new VLStatsReportChrome(rawStats);
		}
		callback(statsReport);
	}
}

function getStatsForPeer(peerId, callback) {
	var connection = window.videolinkPlatformConnection.getConnections()[peerId];
	if (!connection) return;
	if (inFirefox()) {
		if (connection.getRemoteStreams().length > 0) {
			var mediaElement = connection.getRemoteStreams()[0].getVideoTracks()[0];
			connection.getStats(mediaElement, statsReportCallback(callback, connection, mediaElement), function (error) {
				console.log('Can\'t retrieve stats: ' + error);
			})
		}
	} else if (inChrome()) {
		connection.getStats(statsReportCallback(callback));
	}
}

function getConnectionTypeForPeer(peerId, callback, noSecondCheck) {
	if (window.videolinkPlatformConnection instanceof VLRTMPConference) {
		callback("flash");
	} else {
		getStatsForPeer(peerId, function (statsReport) {
			for (i = 0; i < statsReport.groups.length; i++) {
				if (statsReport.groups[i].type == "googCandidatePair" && statsReport.groups[i].properties.googActiveConnection == "true") {
					if (statsReport.groups[i].properties.googLocalCandidateType == "relay") {
						callback("webrtc+turn");
					} else {
						callback("webrtc");
					}
					return;
				}
			}
			if (noSecondCheck !== true) {
				setTimeout(function () {
					getConnectionTypeForPeer(peerId, callback, true);
				}, 5000);
			} else {
				callback("unknown");
			}
		})
	}
}

function messagesHandler(msg) {
	if (msg.data.type == "vl_platform_share_screen_shared") {
		vlLog('ScreenSharing: screen access granted');
		window.videolinkPlatformScreenSharing.isShared = true;
		window.videolinkPlatformConnection.shareScreen();
	} else if (msg.data.type == 'vl_platform_share_screen_ice_candidate') {
		vlLog('ScreenSharing: send broardcast candidate');
		window.videolinkPlatformConnection.sendMessage(msg.data.uid, {
			type: 'broadcast_candidate',
			candidate: msg.data.candidate
		});
	} else if (msg.data.type == 'vl_platform_share_screen_broadcast_offer') {
		window.videolinkPlatformConnection.sendMessage(msg.data.uid, {
			type: 'broadcast_offer',
			desc: msg.data.localDesc
		});
	} else if (msg.data.type == 'vl_platform_share_screen_terminated') {
		vlLog('ScreenSharing: received screen sharing termination signal');
		window.videolinkPlatformScreenSharing.stopSendingScreen();
		var eventListeners = window.videolinkPlatformScreenSharing.eventListeners['ended'];
		if (eventListeners && eventListeners.length > 0) {
			for (var i in eventListeners) {
				eventListeners[i].apply(this);
			}
		}
	}
}
if (window.addEventListener) {
	window.addEventListener("message", messagesHandler, false);
} else {
	window.attachEvent("onmessage", messagesHandler);
}
window.VLPScreenVideoContainer = 'screen_sharing';

function VideolinkPlatformScreenSharing() {}
VideolinkPlatformScreenSharing.prototype.isShared = false;
VideolinkPlatformScreenSharing.prototype.onsuccess = null;
VideolinkPlatformScreenSharing.prototype.oninstall = null;
VideolinkPlatformScreenSharing.prototype.sendMessage = function (data) {
	window.postMessage(data, "*");
}
VideolinkPlatformScreenSharing.prototype.detectChromeExtension = function (callback) {
	if (typeof(chrome) !== 'undefined') {
		var xmlHttp = new XMLHttpRequest(),
			testUrl = 'chrome-extension://' + window.videolinkPlatformScreenSharing.extentionId + '/version.txt';
		xmlHttp.open('HEAD', testUrl, true);
		xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlHttp.timeout = 1000;
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && typeof(callback) == 'function') {
				if (xmlHttp.status == 200) {
					callback.call(this, true);
				} else {
					callback.call(this, false);
				}
			}
		}
		xmlHttp.ontimeout = function () {
			if (typeof(callback) == 'function') callback.call(this, false);
		}
		xmlHttp.send();
	} else {
		if (typeof(callback) == 'function') callback.call(this, false);
	}
};
VideolinkPlatformScreenSharing.prototype.startSharing = function (sharingOptions) {
	if (!sharingOptions) sharingOptions = ["screen", "window"];
	vlLog('ScreenSharing: start screen sharing');
	window.videolinkPlatformScreenSharing.sendMessage({
		type: "vl_platform_share_screen",
		options: sharingOptions
	});
}
VideolinkPlatformScreenSharing.prototype.share = function (sharingOptions) {
	VLPlatformStartSharing(sharingOptions);
}
VideolinkPlatformScreenSharing.prototype.shareScreenToUser = function (uid) {
	window.videolinkPlatformScreenSharing.sendMessage({
		type: "vl_platform_share_screen_to_user",
		uid: uid
	});
}
VideolinkPlatformScreenSharing.prototype.onBroadcastAnswer = function (uid, desc) {
	window.videolinkPlatformScreenSharing.sendMessage({
		type: "vl_platform_share_screen_answer",
		uid: uid,
		desc: desc
	});
}
VideolinkPlatformScreenSharing.prototype.onIncomingIceCandidate = function (uid, candidate) {
	window.videolinkPlatformScreenSharing.sendMessage({
		type: "vl_platform_share_screen_incoming_ice_candidate",
		uid: uid,
		candidate: candidate
	});
}
VideolinkPlatformScreenSharing.prototype.stop = function () {
	window.videolinkPlatformScreenSharing.sendMessage({
		type: "vl_platform_stop_screen_sharing"
	});
	window.videolinkPlatformScreenSharing.stopSendingScreen();
}
VideolinkPlatformScreenSharing.prototype.stopSendingScreen = function () {
	window.videolinkPlatformScreenSharing.isShared = false;
	for (var uid in window.videolinkPlatformConnection.getConnections()) {
		window.videolinkPlatformConnection.sendMessage(uid, {
			type: 'stop_screen_sharing'
		});
	}
}
VideolinkPlatformScreenSharing.prototype.setExtentionId = function (extensionId) {
	window.videolinkPlatformScreenSharing.extentionId = extensionId;
	window.videolinkPlatformScreenSharing.detectChromeExtension(function (installed) {
		window.videolinkPlatformScreenSharing.isExtensionInstalled = installed;
	});
}
VideolinkPlatformScreenSharing.prototype.onSuccess = function (callback) {
	window.videolinkPlatformScreenSharing.onsuccess = callback;
}
VideolinkPlatformScreenSharing.prototype.onInstall = function (callback) {
	window.videolinkPlatformScreenSharing.oninstall = callback;
}
window.videolinkPlatformScreenSharing = new VideolinkPlatformScreenSharing();
window.videolinkPlatformScreenSharing.isExtensionInstalled = false;
window.videolinkPlatformScreenSharing.setExtentionId('dhlgglgfbajoepdbignogeihdgmfihoi');
VideolinkPlatformScreenSharing.prototype.eventListeners = {};
VideolinkPlatformScreenSharing.prototype.addEventListener = function (eventType, callback) {
	if (!window.videolinkPlatformScreenSharing.eventListeners[eventType]) {
		window.videolinkPlatformScreenSharing.eventListeners[eventType] = [];
	}
	window.videolinkPlatformScreenSharing.eventListeners[eventType].push(callback);
}

function VLPlatformStartSharing(options) {
	if (window.videolinkPlatformScreenSharing.isExtensionInstalled) {
		videolinkPlatformScreenSharing.startSharing(options);
		if (window.videolinkPlatformScreenSharing.onsuccess != null) {
			window.videolinkPlatformScreenSharing.onsuccess();
		}
	} else {
		chrome.webstore.install('https://chrome.google.com/webstore/detail/' + window.videolinkPlatformScreenSharing.extentionId, function () {
			if (window.videolinkPlatformScreenSharing.oninstall != null) {
				window.videolinkPlatformScreenSharing.oninstall();
			} else {
				alert('Page will be reloaded to activate screen sharing extension.');
				location.reload();
			}
		}, function (error) {
			console.error(error);
		})
	}
}

function FileSharing(vlRoom) {
	var self = this;
	var events = {
		onUploadStarted: [],
		onUploadProgress: [],
		onUploadCompleted: [],
		onError: [],
		onDownloadStarted: [],
		onDownloadCompleted: [],
		onFileRequest: [],
		onDownloadProgress: []
	}
	var isFileSlicingSupported = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	var BLOB_CHUNK_SIZE = 8 * 1024;
	var unfinishedDownloads = {};
	var fileSharingRequests = {};
	var unfinishedUploads = {};
	var numberOfSharedFiles = 0;
	var sharedFiles = {};
	var generateFileId = function () {
		return vlRoom.getUserId() + "_" + new Date().getTime() + "_" + numberOfSharedFiles;
	}
	var fileSlice = function (file, start, end) {
		if (File.prototype.slice) {
			return file.slice(start, end);
		} else if (File.prototype.mozSlice) {
			return file.mozSlice(start, end);
		} else if (File.prototype.webkitSlice) {
			return file.webkitSlice(start, end);
		} else {
			throw new Exception("Chunked read is not supported");
		}
	}
	vlRoom.on('onBroadcastMessage', function (data) {
		var from = data.initiatorUID;
		var fileId = data.fileId;
		if (data.type == 'startFileSharingBroadcast') {
			if (fileSharingRequests[data.fileId] || from == vlRoom.getConnection().getUserId()) return;
			var fileName = data.name;
			var blocksCount = data.blocksCount;
			vlLog('FileSharing: received file sharing request for ' + data.name + ", " + data.fileId + ", size " + blocksCount);
			fileSharingRequests[fileId] = {
				from: from,
				name: fileName,
				blocks: blocksCount,
				type: data.transferType,
				mime: data.mime
			};
			if (events.onFileRequest.length > 0) {
				for (var eventNum in events.onFileRequest) {
					events.onFileRequest[eventNum](fileId, fileName);
				}
			}
		} else if (data.type == 'beginFileTransfer') {
			if (!sharedFiles[fileId] || data.to != vlRoom.getConnection().getUserId() || data.from == vlRoom.getConnection().getUserId()) return;
			vlLog('FileSharing: file sharing request accepted, starting transmission of ' + data.name + ' to ' + from);
			var transactionId = from + "_" + fileId;
			shareFile(from, fileId, transactionId, sharedFiles[fileId]);
		}
	})
	this.startFileSharing = function (file, type) {
		if (!file) return;
		var fileId = generateFileId();
		vlLog('FileSharing: start sharing of ' + file.name + ", #" + fileId);
		vlRoom.sendBroadcastMessage({
			type: 'startFileSharingBroadcast',
			name: file.name,
			fileId: fileId,
			blocksCount: Math.ceil(file.size / BLOB_CHUNK_SIZE),
			transferType: type,
			mime: file.type
		})
		numberOfSharedFiles++;
		sharedFiles[fileId] = file;
	}
	this.acceptFileSharingRequest = function (fileId) {
		if (fileSharingRequests[fileId].from == vlRoom.getConnection().getUserId()) return;
		var transactionId = vlRoom.getConnection().getUserId() + "_" + fileId;
		onNewFileDownload(fileId, transactionId, fileSharingRequests[fileId].blocks, fileSharingRequests[fileId].name, fileSharingRequests[fileId].type, fileSharingRequests[fileId].mime);
		vlRoom.sendBroadcastMessage({
			type: 'beginFileTransfer',
			to: fileSharingRequests[fileId].from,
			fileId: fileId
		});
		delete fileSharingRequests[fileId];
	}
	this.isSupported = function () {
		return isFileSlicingSupported;
	}
	var fireError = function (message) {
		if (events.onError.length > 0) {
			for (var eventNum in events.onError) {
				events.onError[eventNum](message);
			}
		}
	}
	var errorHandler = function (evt) {
		switch (evt.target.error.code) {
		case evt.target.error.NOT_FOUND_ERR:
			fireError('File Not Found!');
			break;
		case evt.target.error.NOT_READABLE_ERR:
			fireError('File is not readable');
			break;
		case evt.target.error.ABORT_ERR:
			break;
		default:
			fireError('An error occurred reading this file.');
		};
	}
	var notifyWhenUploadCompleted = function (fileId, transactionId) {
		var allBlocksSent = unfinishedUploads[transactionId].block > 0 && unfinishedUploads[transactionId].block >= unfinishedUploads[transactionId].total;
		if (!unfinishedUploads[transactionId] || allBlocksSent) {
			delete unfinishedUploads[transactionId];
			if (events.onUploadCompleted.length > 0) {
				for (var eventNum in events.onUploadCompleted) {
					events.onUploadCompleted[eventNum].apply(this, [fileId]);
				}
			}
		} else {
			setTimeout(function () {
				notifyWhenUploadCompleted(fileId, transactionId);
			}, 500);
		}
	}
	this.uploadProgressStep = function (tid) {
		if (!unfinishedUploads[tid]) return;
		unfinishedUploads[tid].block++;
		fireProgressEvent(events.onUploadProgress, unfinishedUploads[tid].block, unfinishedUploads[tid].total, unfinishedUploads[tid].fileId);
	}
	this.sendNextBlock = function (userId, fileId, transactionId, currentBlockNumber, blockCount, file) {
		if (vlRoom.getConnection().getDataChannelToUser(userId).bufferedAmount > 0) {
			setTimeout(function () {
				self.sendNextBlock(userId, fileId, transactionId, currentBlockNumber, blockCount, file);
			}, 100);
			return;
		}
		var reader = new FileReader();
		var blob = fileSlice(file, currentBlockNumber * BLOB_CHUNK_SIZE, (currentBlockNumber + 1) * BLOB_CHUNK_SIZE);
		reader.onloadend = function (evt) {
			if (evt.target.readyState == FileReader.DONE) {
				self.sendFileData(userId, fileId, transactionId, evt.target.result, function () {
					this.uploadProgressStep(transactionId);
				});
				currentBlockNumber++;
				if (currentBlockNumber < blockCount) {
					self.sendNextBlock(userId, fileId, transactionId, currentBlockNumber, blockCount, file);
				}
			}
		};
		reader.onerror = errorHandler;
		reader.readAsDataURL(blob);
	}
	var shareFile = function (userId, fileId, transactionId, file) {
		if (events.onUploadStarted.length > 0) {
			for (var eventNum in events.onUploadStarted) {
				events.onUploadStarted[eventNum](fileId, file.name, file.type);
			}
		}
		if (isFileSlicingSupported) {
			var blockCount = Math.ceil(file.size / BLOB_CHUNK_SIZE);
			unfinishedUploads[transactionId] = {
				block: 0,
				total: blockCount - 1,
				fileId: fileId
			};
			self.sendNextBlock(userId, fileId, transactionId, 0, blockCount, file);
		} else {
			throw new Exception("File sharing is not supported in this browser");
		}
		notifyWhenUploadCompleted(fileId, transactionId);
	}
	this.onUploadStarted = function (callback) {
		events.onUploadStarted.push(callback)
	}
	this.onUploadProgress = function (callback) {
		events.onUploadProgress.push(callback)
	}
	this.onUploadCompleted = function (callback) {
		events.onUploadCompleted.push(callback)
	}
	this.onDownloadStarted = function (callback) {
		events.onDownloadStarted.push(callback)
	}
	this.onDownloadCompleted = function (callback) {
		events.onDownloadCompleted.push(callback)
	}
	this.onDownloadProgress = function (callback) {
		events.onDownloadProgress.push(callback)
	}
	this.onFileRequest = function (callback) {
		events.onFileRequest.push(callback)
	}
	var onNewFileDownload = function (fileId, transactionId, blocksCount, name, type, mime) {
		vlLog('FileSharing: downloading #' + transactionId);
		unfinishedDownloads[transactionId] = {
			fileId: fileId,
			blocks: 0,
			total: blocksCount,
			data: [],
			name: name,
			type: type,
			mime: mime
		};
		if (events.onDownloadStarted.length > 0) {
			for (var eventNum in events.onDownloadStarted) {
				events.onDownloadStarted[eventNum].apply(this, [fileId, name, mime]);
			}
		}
	}
	var fireProgressEvent = function (listeners, blocksProcesses, totalBlocks, fileId) {
		if (listeners.length > 0) {
			for (var eventNum in listeners) {
				var currentProgress = Math.round(blocksProcesses / totalBlocks * 100);
				if (currentProgress < 0 || currentProgress > 100) {
					currentProgress = 100;
				}
				listeners[eventNum].apply(this, [fileId, blocksProcesses * BLOB_CHUNK_SIZE, currentProgress]);
			}
		}
	}
	this.onFileBlockReceived = function (transactionId, data) {
		if (!unfinishedDownloads[transactionId]) {
			vlLog('FIleSharing: Transaction #' + transactionId + " doesn't exist", 'error');
			return;
		}
		var byteString = atob(data.split(',')[1]);
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		unfinishedDownloads[transactionId].data.push(ab);
		unfinishedDownloads[transactionId].blocks++;
		fireProgressEvent(events.onDownloadProgress, unfinishedDownloads[transactionId].blocks, unfinishedDownloads[transactionId].total, unfinishedDownloads[transactionId].fileId);
		if (unfinishedDownloads[transactionId].blocks == unfinishedDownloads[transactionId].total) {
			vlLog('FileSharing: download completed');
			var fileBlob = new Blob(unfinishedDownloads[transactionId].data);
			if (isWebRTC()) {
				self.fireOnloadCompletedCallback(transactionId, window.URL.createObjectURL(fileBlob));
			} else {
				var reader = new FileReader();
				reader.addEventListener("loadend", function () {
					fileData = reader.result.replace('data:;', 'data:' + unfinishedDownloads[transactionId].mime + ';');
					self.fireOnloadCompletedCallback(transactionId, fileData);
				});
				reader.readAsDataURL(fileBlob);
			}
		}
	}
	this.fireOnloadCompletedCallback = function (transactionId, fileData) {
		if (events.onDownloadCompleted.length > 0) {
			for (var eventNum in events.onDownloadCompleted) {
				events.onDownloadCompleted[eventNum].apply(this, [unfinishedDownloads[transactionId].fileId, unfinishedDownloads[transactionId].name, fileData, unfinishedDownloads[transactionId].type]);
			}
		}
		delete unfinishedDownloads[transactionId];
	}
	this.initListeners = function () {
		if (vlRoom.getConnection()) {
			vlRoom.getConnection().onDataMessage(function (event) {
				var dataReceived = JSON.parse(event.data);
				this.onFileBlockReceived(dataReceived.transactionId, dataReceived.data);
			}, this, true);
		} else {
			var that = this;
			setTimeout(function () {
				that.initListeners();
			}, 500);
		}
	}
	this.initListeners();
	this.sendFileData = function (userId, fileId, transactionId, data, onSent) {
		var message = {
			transactionId: transactionId,
			data: data
		};
		vlRoom.getConnection().getDataChannelToUser(userId).send(JSON.stringify(message));
		onSent.apply(this);
	}
	this.setBlobChunkSize = function (size) {
		BLOB_CHUNK_SIZE = size;
	}
}