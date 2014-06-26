(function() {
window.Bobcat = window.$B = window.Bobcat || {}, "function" == typeof $B.timerCheck && $B.timerCheck("application or application-editor.js run"), 
window.console || (window.console = {
log:function() {},
error:function() {},
warn:function() {}
});
}).call(this), function(e, t) {
e.rails !== t && e.error("jquery-ujs has already been loaded!");
var n;
e.rails = n = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(t) {
var n = e('meta[name="csrf-token"]').attr("content");
n && t.setRequestHeader("X-CSRF-Token", n);
},
fire:function(t, n, i) {
var o = e.Event(n);
return t.trigger(o, i), o.result !== !1;
},
confirm:function(e) {
return confirm(e);
},
ajax:function(t) {
return e.ajax(t);
},
href:function(e) {
return e.attr("href");
},
handleRemote:function(i) {
var o, r, a, s, l, u, c, d;
if (n.fire(i, "ajax:before")) {
if (s = i.data("cross-domain"), l = s === t ? null :s, u = i.data("with-credentials") || null, 
c = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
o = i.attr("method"), r = i.attr("action"), a = i.serializeArray();
var h = i.data("ujs:submit-button");
h && (a.push(h), i.data("ujs:submit-button", null));
} else i.is(n.inputChangeSelector) ? (o = i.data("method"), r = i.data("url"), a = i.serialize(), 
i.data("params") && (a = a + "&" + i.data("params"))) :i.is(n.buttonClickSelector) ? (o = i.data("method") || "get", 
r = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) :(o = i.data("method"), 
r = n.href(i), a = i.data("params") || null);
d = {
type:o || "GET",
data:a,
dataType:c,
beforeSend:function(e, o) {
return o.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), 
n.fire(i, "ajax:beforeSend", [ e, o ]);
},
success:function(e, t, n) {
i.trigger("ajax:success", [ e, t, n ]);
},
complete:function(e, t) {
i.trigger("ajax:complete", [ e, t ]);
},
error:function(e, t, n) {
i.trigger("ajax:error", [ e, t, n ]);
},
crossDomain:l
}, u && (d.xhrFields = {
withCredentials:u
}), r && (d.url = r);
var p = n.ajax(d);
return i.trigger("ajax:send", p), p;
}
return !1;
},
handleMethod:function(i) {
var o = n.href(i), r = i.data("method"), a = i.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + o + '"></form>'), c = '<input name="_method" value="' + r + '" type="hidden" />';
l !== t && s !== t && (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && u.attr("target", a), u.hide().append(c).appendTo("body"), u.submit();
},
disableFormElements:function(t) {
t.find(n.disableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0);
});
},
enableFormElements:function(t) {
t.find(n.enableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1);
});
},
allowAction:function(e) {
var t, i = e.data("confirm"), o = !1;
return i ? (n.fire(e, "confirm") && (o = n.confirm(i), t = n.fire(e, "confirm:complete", [ o ])), 
o && t) :!0;
},
blankInputs:function(t, n, i) {
var o, r, a = e(), s = n || "input,textarea", l = t.find(s);
return l.each(function() {
if (o = e(this), r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") :o.val(), 
!r == !i) {
if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
a = a.add(o);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(e, t) {
return n.blankInputs(e, t, !0);
},
stopEverything:function(t) {
return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), 
!1;
},
disableElement:function(e) {
e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
return n.stopEverything(e);
});
},
enableElement:function(e) {
e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), 
e.unbind("click.railsDisable");
}
}, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
e.crossDomain || n.CSRFProtection(i);
}), e(document).delegate(n.linkDisableSelector, "ajax:complete", function() {
n.enableElement(e(this));
}), e(document).delegate(n.linkClickSelector, "click.rails", function(i) {
var o = e(this), r = o.data("method"), a = o.data("params");
if (!n.allowAction(o)) return n.stopEverything(i);
if (o.is(n.linkDisableSelector) && n.disableElement(o), o.data("remote") !== t) {
if (!(!i.metaKey && !i.ctrlKey || r && "GET" !== r || a)) return !0;
var s = n.handleRemote(o);
return s === !1 ? n.enableElement(o) :s.error(function() {
n.enableElement(o);
}), !1;
}
return o.data("method") ? (n.handleMethod(o), !1) :void 0;
}), e(document).delegate(n.buttonClickSelector, "click.rails", function(t) {
var i = e(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(t);
}), e(document).delegate(n.inputChangeSelector, "change.rails", function(t) {
var i = e(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(t);
}), e(document).delegate(n.formSubmitSelector, "submit.rails", function(i) {
var o = e(this), r = o.data("remote") !== t, a = n.blankInputs(o, n.requiredInputSelector), s = n.nonBlankInputs(o, n.fileInputSelector);
if (!n.allowAction(o)) return n.stopEverything(i);
if (a && o.attr("novalidate") == t && n.fire(o, "ajax:aborted:required", [ a ])) return n.stopEverything(i);
if (r) {
if (s) {
setTimeout(function() {
n.disableFormElements(o);
}, 13);
var l = n.fire(o, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
n.enableFormElements(o);
}, 13), l;
}
return n.handleRemote(o), !1;
}
setTimeout(function() {
n.disableFormElements(o);
}, 13);
}), e(document).delegate(n.formInputClickSelector, "click.rails", function(t) {
var i = e(this);
if (!n.allowAction(i)) return n.stopEverything(t);
var o = i.attr("name"), r = o ? {
name:o,
value:i.val()
} :null;
i.closest("form").data("ujs:submit-button", r);
}), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
this == t.target && n.disableFormElements(e(this));
}), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(t) {
this == t.target && n.enableFormElements(e(this));
}), e(function() {
var t = e("meta[name=csrf-token]").attr("content"), n = e("meta[name=csrf-param]").attr("content");
e('form input[name="' + n + '"]').val(t);
}));
}(jQuery), function() {
var e, t;
jQuery.uaMatch = function(e) {
e = e.toLowerCase();
var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
return {
browser:t[1] || "",
version:t[2] || "0"
};
}, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, 
t.version = e.version), t.chrome ? t.webkit = !0 :t.webkit && (t.safari = !0), jQuery.browser = t, 
jQuery.sub = function() {
function e(t, n) {
return new e.fn.init(t, n);
}
jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, 
e.sub = this.sub, e.fn.init = function(n, i) {
return i && i instanceof jQuery && !(i instanceof e) && (i = e(i)), jQuery.fn.init.call(this, n, i, t);
}, e.fn.init.prototype = e.fn;
var t = e(document);
return e;
};
}(), /*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(e) {
"function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], e) :e(jQuery);
}(function(e) {
function t(e) {
return e;
}
function n(e) {
return decodeURIComponent(e.replace(o, " "));
}
function i(e) {
0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
try {
return r.json ? JSON.parse(e) :e;
} catch (t) {}
}
var o = /\+/g, r = e.cookie = function(o, a, s) {
if (void 0 !== a) {
if (s = e.extend({}, r.defaults, s), "number" == typeof s.expires) {
var l = s.expires, u = s.expires = new Date();
u.setDate(u.getDate() + l);
}
return a = r.json ? JSON.stringify(a) :String(a), document.cookie = [ encodeURIComponent(o), "=", r.raw ? a :encodeURIComponent(a), s.expires ? "; expires=" + s.expires.toUTCString() :"", s.path ? "; path=" + s.path :"", s.domain ? "; domain=" + s.domain :"", s.secure ? "; secure" :"" ].join("");
}
for (var c = r.raw ? t :n, d = document.cookie.split("; "), h = o ? void 0 :{}, p = 0, f = d.length; f > p; p++) {
var g = d[p].split("="), m = c(g.shift()), v = c(g.join("="));
if (o && o === m) {
h = i(v);
break;
}
o || (h[m] = i(v));
}
return h;
};
r.defaults = {}, e.removeCookie = function(t, n) {
return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend(n, {
expires:-1
})), !0) :!1;
};
}), function(e) {
function t(e) {
return "object" == typeof e ? e :{
top:e,
left:e
};
}
var n = e.scrollTo = function(t, n, i) {
e(window).scrollTo(t, n, i);
};
n.defaults = {
axis:"xy",
duration:parseFloat(e.fn.jquery) >= 1.3 ? 0 :1
}, n.window = function() {
return e(window)._scrollable();
}, e.fn._scrollable = function() {
return this.map(function() {
var t = this, n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!n) return t;
var i = (t.contentWindow || t).document || t.ownerDocument || t;
return e.browser.safari || "BackCompat" == i.compatMode ? i.body :i.documentElement;
});
}, e.fn.scrollTo = function(i, o, r) {
return "object" == typeof o && (r = o, o = 0), "function" == typeof r && (r = {
onAfter:r
}), "max" == i && (i = 9e9), r = e.extend({}, n.defaults, r), o = o || r.speed || r.duration, 
r.queue = r.queue && r.axis.length > 1, r.queue && (o /= 2), r.offset = t(r.offset), 
r.over = t(r.over), this._scrollable().each(function() {
function a(e) {
u.animate(d, o, r.easing, e && function() {
e.call(this, i, r);
});
}
var s, l = this, u = e(l), c = i, d = {}, h = u.is("html,body");
switch (typeof c) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(c)) {
c = t(c);
break;
}
c = e(c, this);

case "object":
(c.is || c.style) && (s = (c = e(c)).offset());
}
e.each(r.axis.split(""), function(e, t) {
var i = "x" == t ? "Left" :"Top", o = i.toLowerCase(), p = "scroll" + i, f = l[p], g = n.max(l, t);
if (s) d[p] = s[o] + (h ? 0 :f - u.offset()[o]), r.margin && (d[p] -= parseInt(c.css("margin" + i)) || 0, 
d[p] -= parseInt(c.css("border" + i + "Width")) || 0), d[p] += r.offset[o] || 0, 
r.over[o] && (d[p] += c["x" == t ? "width" :"height"]() * r.over[o]); else {
var m = c[o];
d[p] = m.slice && "%" == m.slice(-1) ? parseFloat(m) / 100 * g :m;
}
/^\d+$/.test(d[p]) && (d[p] = d[p] <= 0 ? 0 :Math.min(d[p], g)), !e && r.queue && (f != d[p] && a(r.onAfterFirst), 
delete d[p]);
}), a(r.onAfter);
}).end();
}, n.max = function(t, n) {
var i = "x" == n ? "Width" :"Height", o = "scroll" + i;
if (!e(t).is("html,body")) return t[o] - e(t)[i.toLowerCase()]();
var r = "client" + i, a = t.ownerDocument.documentElement, s = t.ownerDocument.body;
return Math.max(a[o], s[o]) - Math.min(a[r], s[r]);
};
}(jQuery), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? i / 2 * t * t + n :-i / 2 * (--t * (t - 2) - 1) + n;
},
easeInQuad:function(e, t, n, i, o) {
return i * (t /= o) * t + n;
},
easeOutQuad:function(e, t, n, i, o) {
return -i * (t /= o) * (t - 2) + n;
},
easeInOutQuad:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? i / 2 * t * t + n :-i / 2 * (--t * (t - 2) - 1) + n;
},
easeInCubic:function(e, t, n, i, o) {
return i * (t /= o) * t * t + n;
},
easeOutCubic:function(e, t, n, i, o) {
return i * ((t = t / o - 1) * t * t + 1) + n;
},
easeInOutCubic:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? i / 2 * t * t * t + n :i / 2 * ((t -= 2) * t * t + 2) + n;
},
easeInQuart:function(e, t, n, i, o) {
return i * (t /= o) * t * t * t + n;
},
easeOutQuart:function(e, t, n, i, o) {
return -i * ((t = t / o - 1) * t * t * t - 1) + n;
},
easeInOutQuart:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? i / 2 * t * t * t * t + n :-i / 2 * ((t -= 2) * t * t * t - 2) + n;
},
easeInQuint:function(e, t, n, i, o) {
return i * (t /= o) * t * t * t * t + n;
},
easeOutQuint:function(e, t, n, i, o) {
return i * ((t = t / o - 1) * t * t * t * t + 1) + n;
},
easeInOutQuint:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? i / 2 * t * t * t * t * t + n :i / 2 * ((t -= 2) * t * t * t * t + 2) + n;
},
easeInSine:function(e, t, n, i, o) {
return -i * Math.cos(t / o * (Math.PI / 2)) + i + n;
},
easeOutSine:function(e, t, n, i, o) {
return i * Math.sin(t / o * (Math.PI / 2)) + n;
},
easeInOutSine:function(e, t, n, i, o) {
return -i / 2 * (Math.cos(Math.PI * t / o) - 1) + n;
},
easeInExpo:function(e, t, n, i, o) {
return 0 == t ? n :i * Math.pow(2, 10 * (t / o - 1)) + n;
},
easeOutExpo:function(e, t, n, i, o) {
return t == o ? n + i :i * (-Math.pow(2, -10 * t / o) + 1) + n;
},
easeInOutExpo:function(e, t, n, i, o) {
return 0 == t ? n :t == o ? n + i :(t /= o / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n :i / 2 * (-Math.pow(2, -10 * --t) + 2) + n;
},
easeInCirc:function(e, t, n, i, o) {
return -i * (Math.sqrt(1 - (t /= o) * t) - 1) + n;
},
easeOutCirc:function(e, t, n, i, o) {
return i * Math.sqrt(1 - (t = t / o - 1) * t) + n;
},
easeInOutCirc:function(e, t, n, i, o) {
return (t /= o / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n :i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
},
easeInElastic:function(e, t, n, i, o) {
var r = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (1 == (t /= o)) return n + i;
if (a || (a = .3 * o), s < Math.abs(i)) {
s = i;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(i / s);
return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a)) + n;
},
easeOutElastic:function(e, t, n, i, o) {
var r = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (1 == (t /= o)) return n + i;
if (a || (a = .3 * o), s < Math.abs(i)) {
s = i;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(i / s);
return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * o - r) * Math.PI / a) + i + n;
},
easeInOutElastic:function(e, t, n, i, o) {
var r = 1.70158, a = 0, s = i;
if (0 == t) return n;
if (2 == (t /= o / 2)) return n + i;
if (a || (a = .3 * o * 1.5), s < Math.abs(i)) {
s = i;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(i / s);
return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a) + n :s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a) * .5 + i + n;
},
easeInBack:function(e, t, n, i, o, r) {
return void 0 == r && (r = 1.70158), i * (t /= o) * t * ((r + 1) * t - r) + n;
},
easeOutBack:function(e, t, n, i, o, r) {
return void 0 == r && (r = 1.70158), i * ((t = t / o - 1) * t * ((r + 1) * t + r) + 1) + n;
},
easeInOutBack:function(e, t, n, i, o, r) {
return void 0 == r && (r = 1.70158), (t /= o / 2) < 1 ? i / 2 * t * t * (((r *= 1.525) + 1) * t - r) + n :i / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + n;
},
easeInBounce:function(e, t, n, i, o) {
return i - jQuery.easing.easeOutBounce(e, o - t, 0, i, o) + n;
},
easeOutBounce:function(e, t, n, i, o) {
return (t /= o) < 1 / 2.75 ? 7.5625 * i * t * t + n :2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n :2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n :i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
},
easeInOutBounce:function(e, t, n, i, o) {
return o / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, o) + n :.5 * jQuery.easing.easeOutBounce(e, 2 * t - o, 0, i, o) + .5 * i + n;
}
}), /*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function() {
var e = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
}, t = [].slice;
!function(e, t) {
return "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(n) {
return t(n, e);
}) :t(e.jQuery, e);
}(window, function(n, i) {
var o, r, a, s, l, u, c, d, h, p, f, g, m, v, y, b;
return o = n(i), d = e.call(i, "ontouchstart") >= 0, s = {
horizontal:{},
vertical:{}
}, l = 1, c = {}, u = "waypoints-context-id", f = "resize.waypoints", g = "scroll.waypoints", 
m = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", r = function() {
function e(e) {
var t = this;
this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, 
this.id = "context" + l++, this.oldScroll = {
x:e.scrollLeft(),
y:e.scrollTop()
}, this.waypoints = {
horizontal:{},
vertical:{}
}, this.element[u] = this.id, c[this.id] = this, e.bind(g, function() {
var e;
return t.didScroll || d ? void 0 :(t.didScroll = !0, e = function() {
return t.doScroll(), t.didScroll = !1;
}, i.setTimeout(e, n[b].settings.scrollThrottle));
}), e.bind(f, function() {
var e;
return t.didResize ? void 0 :(t.didResize = !0, e = function() {
return n[b]("refresh"), t.didResize = !1;
}, i.setTimeout(e, n[b].settings.resizeThrottle));
});
}
return e.prototype.doScroll = function() {
var e, t = this;
return e = {
horizontal:{
newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left"
},
vertical:{
newScroll:this.$element.scrollTop(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up"
}
}, !d || e.vertical.oldScroll && e.vertical.newScroll || n[b]("refresh"), n.each(e, function(e, i) {
var o, r, a;
return a = [], r = i.newScroll > i.oldScroll, o = r ? i.forward :i.backward, n.each(t.waypoints[e], function(e, t) {
var n, o;
return i.oldScroll < (n = t.offset) && n <= i.newScroll ? a.push(t) :i.newScroll < (o = t.offset) && o <= i.oldScroll ? a.push(t) :void 0;
}), a.sort(function(e, t) {
return e.offset - t.offset;
}), r || a.reverse(), n.each(a, function(e, t) {
return t.options.continuous || e === a.length - 1 ? t.trigger([ o ]) :void 0;
});
}), this.oldScroll = {
x:e.horizontal.newScroll,
y:e.vertical.newScroll
};
}, e.prototype.refresh = function() {
var e, t, i, o = this;
return i = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(), 
e = {
horizontal:{
contextOffset:i ? 0 :t.left,
contextScroll:i ? 0 :this.oldScroll.x,
contextDimension:this.$element.width(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left",
offsetProp:"left"
},
vertical:{
contextOffset:i ? 0 :t.top,
contextScroll:i ? 0 :this.oldScroll.y,
contextDimension:i ? n[b]("viewportHeight") :this.$element.height(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up",
offsetProp:"top"
}
}, n.each(e, function(e, t) {
return n.each(o.waypoints[e], function(e, i) {
var o, r, a, s, l;
return o = i.options.offset, a = i.offset, r = n.isWindow(i.element) ? 0 :i.$element.offset()[t.offsetProp], 
n.isFunction(o) ? o = o.apply(i.element) :"string" == typeof o && (o = parseFloat(o), 
i.options.offset.indexOf("%") > -1 && (o = Math.ceil(t.contextDimension * o / 100))), 
i.offset = r - t.contextOffset + t.contextScroll - o, i.options.onlyOnScroll && null != a || !i.enabled ? void 0 :null !== a && a < (s = t.oldScroll) && s <= i.offset ? i.trigger([ t.backward ]) :null !== a && a > (l = t.oldScroll) && l >= i.offset ? i.trigger([ t.forward ]) :null === a && t.oldScroll >= i.offset ? i.trigger([ t.forward ]) :void 0;
});
});
}, e.prototype.checkEmpty = function() {
return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([ f, g ].join(" ")), 
delete c[this.id]) :void 0;
}, e;
}(), a = function() {
function e(e, t, i) {
var o, r;
"bottom-in-view" === i.offset && (i.offset = function() {
var e;
return e = n[b]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()), 
e - n(this).outerHeight();
}), this.$element = e, this.element = e[0], this.axis = i.horizontal ? "horizontal" :"vertical", 
this.callback = i.handler, this.context = t, this.enabled = i.enabled, this.id = "waypoints" + m++, 
this.offset = null, this.options = i, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
o = null != (r = this.element[v]) ? r :[], o.push(this.id), this.element[v] = o;
}
return e.prototype.trigger = function(e) {
return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), 
this.options.triggerOnce ? this.destroy() :void 0) :void 0;
}, e.prototype.disable = function() {
return this.enabled = !1;
}, e.prototype.enable = function() {
return this.context.refresh(), this.enabled = !0;
}, e.prototype.destroy = function() {
return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
this.context.checkEmpty();
}, e.getWaypointsByElement = function(e) {
var t, i;
return (i = e[v]) ? (t = n.extend({}, s.horizontal, s.vertical), n.map(i, function(e) {
return t[e];
})) :[];
}, e;
}(), p = {
init:function(e, t) {
var i;
return t = n.extend({}, n.fn[y].defaults, t), null == (i = t.handler) && (t.handler = e), 
this.each(function() {
var e, i, o, s;
return e = n(this), o = null != (s = t.context) ? s :n.fn[y].defaults.context, n.isWindow(o) || (o = e.closest(o)), 
o = n(o), i = c[o[0][u]], i || (i = new r(o)), new a(e, i, t);
}), n[b]("refresh"), this;
},
disable:function() {
return p._invoke.call(this, "disable");
},
enable:function() {
return p._invoke.call(this, "enable");
},
destroy:function() {
return p._invoke.call(this, "destroy");
},
prev:function(e, t) {
return p._traverse.call(this, e, t, function(e, t, n) {
return t > 0 ? e.push(n[t - 1]) :void 0;
});
},
next:function(e, t) {
return p._traverse.call(this, e, t, function(e, t, n) {
return t < n.length - 1 ? e.push(n[t + 1]) :void 0;
});
},
_traverse:function(e, t, o) {
var r, a;
return null == e && (e = "vertical"), null == t && (t = i), a = h.aggregate(t), 
r = [], this.each(function() {
var t;
return t = n.inArray(this, a[e]), o(r, t, a[e]);
}), this.pushStack(r);
},
_invoke:function(e) {
return this.each(function() {
var t;
return t = a.getWaypointsByElement(this), n.each(t, function(t, n) {
return n[e](), !0;
});
}), this;
}
}, n.fn[y] = function() {
var e, i;
return i = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], p[i] ? p[i].apply(this, e) :n.isFunction(i) ? p.init.apply(this, arguments) :n.isPlainObject(i) ? p.init.apply(this, [ null, i ]) :i ? n.error("The " + i + " method does not exist in jQuery Waypoints.") :n.error("jQuery Waypoints needs a callback function or handler option.");
}, n.fn[y].defaults = {
context:i,
continuous:!0,
enabled:!0,
horizontal:!1,
offset:0,
triggerOnce:!1
}, h = {
refresh:function() {
return n.each(c, function(e, t) {
return t.refresh();
});
},
viewportHeight:function() {
var e;
return null != (e = i.innerHeight) ? e :o.height();
},
aggregate:function(e) {
var t, i, o;
return t = s, e && (t = null != (o = c[n(e)[0][u]]) ? o.waypoints :void 0), t ? (i = {
horizontal:[],
vertical:[]
}, n.each(i, function(e, o) {
return n.each(t[e], function(e, t) {
return o.push(t);
}), o.sort(function(e, t) {
return e.offset - t.offset;
}), i[e] = n.map(o, function(e) {
return e.element;
}), i[e] = n.unique(i[e]);
}), i) :[];
},
above:function(e) {
return null == e && (e = i), h._filter(e, "vertical", function(e, t) {
return t.offset <= e.oldScroll.y;
});
},
below:function(e) {
return null == e && (e = i), h._filter(e, "vertical", function(e, t) {
return t.offset > e.oldScroll.y;
});
},
left:function(e) {
return null == e && (e = i), h._filter(e, "horizontal", function(e, t) {
return t.offset <= e.oldScroll.x;
});
},
right:function(e) {
return null == e && (e = i), h._filter(e, "horizontal", function(e, t) {
return t.offset > e.oldScroll.x;
});
},
enable:function() {
return h._invoke("enable");
},
disable:function() {
return h._invoke("disable");
},
destroy:function() {
return h._invoke("destroy");
},
extendFn:function(e, t) {
return p[e] = t;
},
_invoke:function(e) {
var t;
return t = n.extend({}, s.vertical, s.horizontal), n.each(t, function(t, n) {
return n[e](), !0;
});
},
_filter:function(e, t, i) {
var o, r;
return (o = c[n(e)[0][u]]) ? (r = [], n.each(o.waypoints[t], function(e, t) {
return i(o, t) ? r.push(t) :void 0;
}), r.sort(function(e, t) {
return e.offset - t.offset;
}), n.map(r, function(e) {
return e.element;
})) :[];
}
}, n[b] = function() {
var e, n;
return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], h[n] ? h[n].apply(null, e) :h.aggregate.call(null, n);
}, n[b].settings = {
resizeThrottle:100,
scrollThrottle:30
}, o.on("load.waypoints", function() {
return n[b]("refresh");
});
});
}.call(this), /*!
 * jQuery Templates Plugin
 * http://github.com/jquery/jquery-tmpl
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
function(e) {
function t(t, n, i, o) {
var r = {
data:o || (n ? n.data :{}),
_wrap:n ? n._wrap :null,
tmpl:null,
parent:n || null,
nodes:[],
calls:u,
nest:c,
wrap:d,
html:h,
update:p
};
return t && e.extend(r, t, {
nodes:[],
parent:n
}), i && (r.tmpl = i, r._ctnt = r._ctnt || r.tmpl(e, r), r.key = ++w, (S.length ? b :y)[w] = r), 
r;
}
function n(t, o, r) {
var a, s = r ? e.map(r, function(e) {
return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + m + '="' + t.key + '" $2') :e :n(e, t, e._ctnt);
}) :t;
return o ? s :(s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, n, o, r) {
a = e(o).get(), l(a), n && (a = i(n).concat(a)), r && (a = a.concat(i(r)));
}), a ? a :i(s));
}
function i(t) {
var n = document.createElement("div");
return n.innerHTML = t, e.makeArray(n.childNodes);
}
function o(t) {
return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, n, i, o, r, s, l) {
var u, c, d, h = e.tmpl.tag[i];
if (!h) throw "Template command not found: " + i;
return u = h._default || [], s && !/\w$/.test(r) && (r += s, s = ""), r ? (r = a(r), 
l = l ? "," + a(l) + ")" :s ? ")" :"", c = s ? r.indexOf(".") > -1 ? r + s :"(" + r + ").call($item" + l :r, 
d = s ? c :"(typeof(" + r + ")==='function'?(" + r + ").call($item):(" + r + "))") :d = c = u.$1 || "null", 
o = a(o), "');" + h[n ? "close" :"open"].split("$notnull_1").join(r ? "typeof(" + r + ")!=='undefined' && (" + r + ")!=null" :"true").split("$1a").join(d).split("$1").join(c).split("$2").join(o ? o.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(e, t, n, i) {
return i = i ? "," + i + ")" :n ? ")" :"", i ? "(" + t + ").call($item" + i :e;
}) :u.$2 || "") + "_.push('";
}) + "');}return _;");
}
function r(t, i) {
t._wrap = n(t, !0, e.isArray(i) ? i :[ v.test(i) ? i :e(i).html() ]).join("");
}
function a(e) {
return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") :null;
}
function s(e) {
var t = document.createElement("div");
return t.appendChild(e.cloneNode(!0)), t.innerHTML;
}
function l(n) {
function i(n) {
function i(e) {
e += u, a = c[e] = c[e] || t(a, y[a.parent.key + u] || a.parent, null, !0);
}
var o, r, a, s, l = n;
if (s = n.getAttribute(m)) {
for (;l.parentNode && 1 === (l = l.parentNode).nodeType && !(o = l.getAttribute(m)); ) ;
o !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 :l.getAttribute(m) || 0 :0, 
(a = y[s]) || (a = b[s], a = t(a, y[l] || b[l], null, !0), a.key = ++w, y[w] = a), 
k && i(s)), n.removeAttribute(m);
} else k && (a = e.data(n, "tmplItem")) && (i(a.key), y[a.key] = a, l = e.data(n.parentNode, "tmplItem"), 
l = l ? l.key :0);
if (a) {
for (r = a; r && r.key != l; ) r.nodes.push(n), r = r.parent;
delete a._ctnt, delete a._wrap, e.data(n, "tmplItem", a);
}
}
var o, r, a, s, l, u = "_" + k, c = {};
for (a = 0, s = n.length; s > a; a++) if (1 === (o = n[a]).nodeType) {
for (r = o.getElementsByTagName("*"), l = r.length - 1; l >= 0; l--) i(r[l]);
i(o);
}
}
function u(e, t, n, i) {
return e ? (S.push({
_:e,
tmpl:t,
item:this,
data:n,
options:i
}), void 0) :S.pop();
}
function c(t, n, i) {
return e.tmpl(e.template(t), n, i, this);
}
function d(t, n) {
var i = t.options || {};
return i.wrapped = n, e.tmpl(e.template(t.tmpl), t.data, i, t.item);
}
function h(t, n) {
var i = this._wrap;
return e.map(e(e.isArray(i) ? i.join("") :i).filter(t || "*"), function(e) {
return n ? e.innerText || e.textContent :e.outerHTML || s(e);
});
}
function p() {
var t = this.nodes;
e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove();
}
var f, g = e.fn.domManip, m = "_tmplitem", v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, y = {}, b = {}, _ = {
key:0,
data:{}
}, w = 0, k = 0, S = [];
e.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(t, n) {
e.fn[t] = function(i) {
var o, r, a, s, l = [], u = e(i), c = 1 === this.length && this[0].parentNode;
if (f = y || {}, c && 11 === c.nodeType && 1 === c.childNodes.length && 1 === u.length) u[n](this[0]), 
l = this; else {
for (r = 0, a = u.length; a > r; r++) k = r, o = (r > 0 ? this.clone(!0) :this).get(), 
e.fn[n].apply(e(u[r]), o), l = l.concat(o);
k = 0, l = this.pushStack(l, t, u.selector);
}
return s = f, f = null, e.tmpl.complete(s), l;
};
}), e.fn.extend({
tmpl:function(t, n, i) {
return e.tmpl(this[0], t, n, i);
},
tmplItem:function() {
return e.tmplItem(this[0]);
},
template:function(t) {
return e.template(t, this[0]);
},
domManip:function(t, n, i) {
if (t[0] && t[0].nodeType) {
for (var o, r = e.makeArray(arguments), a = t.length, s = 0; a > s && !(o = e.data(t[s++], "tmplItem")); ) ;
a > 1 && (r[0] = [ e.makeArray(t) ]), o && k && (r[2] = function(t) {
e.tmpl.afterManip(this, t, i);
}), g.apply(this, r);
} else g.apply(this, arguments);
return k = 0, f || e.tmpl.complete(y), this;
}
}), e.extend({
tmpl:function(i, o, a, s) {
var l, u = !s;
if (u) s = _, i = e.template[i] || e.template(null, i), b = {}; else if (!i) return i = s.tmpl, 
y[s.key] = s, s.nodes = [], s.wrapped && r(s, s.wrapped), e(n(s, null, s.tmpl(e, s)));
return i ? ("function" == typeof o && (o = o.call(s || {})), a && a.wrapped && r(a, a.wrapped), 
l = e.isArray(o) ? e.map(o, function(e) {
return e ? t(a, s, i, e) :null;
}) :[ t(a, s, i, o) ], u ? e(n(s, null, l)) :l) :[];
},
tmplItem:function(t) {
var n;
for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(n = e.data(t, "tmplItem")) && (t = t.parentNode); ) ;
return n || _;
},
template:function(t, n) {
return n ? ("string" == typeof n ? n = o(n) :n instanceof e && (n = n[0] || {}), 
n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", o(n.innerHTML))), "string" == typeof t ? e.template[t] = n :n) :t ? "string" != typeof t ? e.template(null, t) :e.template[t] || e.template(null, v.test(t) ? t :e(t)) :null;
},
encode:function(e) {
return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
}
}), e.extend(e.tmpl, {
tag:{
tmpl:{
_default:{
$2:"null"
},
open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"
},
wrap:{
_default:{
$2:"null"
},
open:"$item.calls(_,$1,$2);_=[];",
close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"
},
each:{
_default:{
$2:"$index, $value"
},
open:"if($notnull_1){$.each($1a,function($2){with(this){",
close:"}});}"
},
"if":{
open:"if(($notnull_1) && $1a){",
close:"}"
},
"else":{
_default:{
$1:"true"
},
open:"}else if(($notnull_1) && $1a){"
},
html:{
open:"if($notnull_1){_.push($1a);}"
},
"=":{
_default:{
$1:"$data"
},
open:"if($notnull_1){_.push($.encode($1a));}"
},
"!":{
open:""
}
},
complete:function() {
y = {};
},
afterManip:function(t, n, i) {
var o = 11 === n.nodeType ? e.makeArray(n.childNodes) :1 === n.nodeType ? [ n ] :[];
i.call(t, n), l(o), k++;
}
});
}(jQuery), function(e) {
function t() {
var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(e) :window.opera && window.opera.postError && window.opera.postError(e);
}
e.fn.ajaxSubmit = function(n) {
function i(i) {
function r(e) {
var t = e.contentWindow ? e.contentWindow.document :e.contentDocument ? e.contentDocument :e.document;
return t;
}
function a() {
function n() {
try {
var e = r(g).readyState;
t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(n, 50);
} catch (i) {
t("Server abort: ", i, " (", i.name, ")"), l(x), _ && clearTimeout(_), _ = void 0;
}
}
var i = s.attr("target"), a = s.attr("action");
w.setAttribute("target", p), o || w.setAttribute("method", "POST"), a != d.url && w.setAttribute("action", d.url), 
d.skipEncodingOverride || o && !/post/i.test(o) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), d.timeout && (_ = setTimeout(function() {
b = !0, l(S);
}, d.timeout));
var u = [];
try {
if (d.extraData) for (var c in d.extraData) u.push(e('<input type="hidden" name="' + c + '" />').attr("value", d.extraData[c]).appendTo(w)[0]);
d.iframeTarget || (f.appendTo("body"), g.attachEvent ? g.attachEvent("onload", l) :g.addEventListener("load", l, !1)), 
setTimeout(n, 15), w.submit();
} finally {
w.setAttribute("action", a), i ? w.setAttribute("target", i) :s.removeAttr("target"), 
e(u).remove();
}
}
function l(n) {
if (!m.aborted && !E) {
try {
C = r(g);
} catch (i) {
t("cannot access response document: ", i), n = x;
}
if (n === S && m) return m.abort("timeout"), void 0;
if (n == x && m) return m.abort("server abort"), void 0;
if (C && C.location.href != d.iframeSrc || b) {
g.detachEvent ? g.detachEvent("onload", l) :g.removeEventListener("load", l, !1);
var o, a = "success";
try {
if (b) throw "timeout";
var s = "xml" == d.dataType || C.XMLDocument || e.isXMLDoc(C);
if (t("isXml=" + s), !s && window.opera && (null == C.body || "" == C.body.innerHTML) && --M) return t("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var u = C.body ? C.body :C.documentElement;
m.responseText = u ? u.innerHTML :null, m.responseXML = C.XMLDocument ? C.XMLDocument :C, 
s && (d.dataType = "xml"), m.getResponseHeader = function(e) {
var t = {
"content-type":d.dataType
};
return t[e];
}, u && (m.status = Number(u.getAttribute("status")) || m.status, m.statusText = u.getAttribute("statusText") || m.statusText);
var c = d.dataType || "", p = /(json|script|text)/.test(c.toLowerCase());
if (p || d.textarea) {
var v = C.getElementsByTagName("textarea")[0];
if (v) m.responseText = v.value, m.status = Number(v.getAttribute("status")) || m.status, 
m.statusText = v.getAttribute("statusText") || m.statusText; else if (p) {
var y = C.getElementsByTagName("pre")[0], w = C.getElementsByTagName("body")[0];
y ? m.responseText = y.textContent ? y.textContent :y.innerHTML :w && (m.responseText = w.innerHTML);
}
} else "xml" != d.dataType || m.responseXML || null == m.responseText || (m.responseXML = D(m.responseText));
try {
T = L(m, d.dataType, d);
} catch (n) {
a = "parsererror", m.error = o = n || a;
}
} catch (n) {
t("error caught: ", n), a = "error", m.error = o = n || a;
}
m.aborted && (t("upload aborted"), a = null), m.status && (a = m.status >= 200 && m.status < 300 || 304 === m.status ? "success" :"error"), 
"success" === a ? (d.success && d.success.call(d.context, T, "success", m), h && e.event.trigger("ajaxSuccess", [ m, d ])) :a && (void 0 == o && (o = m.statusText), 
d.error && d.error.call(d.context, m, a, o), h && e.event.trigger("ajaxError", [ m, d, o ])), 
h && e.event.trigger("ajaxComplete", [ m, d ]), h && !--e.active && e.event.trigger("ajaxStop"), 
d.complete && d.complete.call(d.context, m, a), E = !0, d.timeout && clearTimeout(_), 
setTimeout(function() {
d.iframeTarget || f.remove(), m.responseXML = null;
}, 100);
}
}
}
var u, c, d, h, p, f, g, m, v, y, b, _, w = s[0], k = !!e.fn.prop;
if (i) for (c = 0; c < i.length; c++) u = e(w[i[c].name]), u[k ? "prop" :"attr"]("disabled", !1);
if (e(":input[name=submit],:input[id=submit]", w).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (d = e.extend(!0, {}, e.ajaxSettings, n), d.context = d.context || d, p = "jqFormIO" + new Date().getTime(), 
d.iframeTarget ? (f = e(d.iframeTarget), y = f.attr("name"), null == y ? f.attr("name", p) :p = y) :(f = e('<iframe name="' + p + '" src="' + d.iframeSrc + '" />'), 
f.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), g = f[0], m = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(n) {
var i = "timeout" === n ? "timeout" :"aborted";
t("aborting upload... " + i), this.aborted = 1, f.attr("src", d.iframeSrc), m.error = i, 
d.error && d.error.call(d.context, m, i, n), h && e.event.trigger("ajaxError", [ m, d, i ]), 
d.complete && d.complete.call(d.context, m, i);
}
}, h = d.global, h && !e.active++ && e.event.trigger("ajaxStart"), h && e.event.trigger("ajaxSend", [ m, d ]), 
d.beforeSend && d.beforeSend.call(d.context, m, d) === !1) return d.global && e.active--, 
void 0;
if (!m.aborted) {
v = w.clk, v && (y = v.name, y && !v.disabled && (d.extraData = d.extraData || {}, 
d.extraData[y] = v.value, "image" == v.type && (d.extraData[y + ".x"] = w.clk_x, 
d.extraData[y + ".y"] = w.clk_y)));
var S = 1, x = 2;
d.forceSync ? a() :setTimeout(a, 10);
var T, C, E, M = 50, D = e.parseXML || function(e, t) {
return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e)) :t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t :null;
}, $ = e.parseJSON || function(e) {
return window.eval("(" + e + ")");
}, L = function(t, n, i) {
var o = t.getResponseHeader("content-type") || "", r = "xml" === n || !n && o.indexOf("xml") >= 0, a = r ? t.responseXML :t.responseText;
return r && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), 
i && i.dataFilter && (a = i.dataFilter(a, n)), "string" == typeof a && ("json" === n || !n && o.indexOf("json") >= 0 ? a = $(a) :("script" === n || !n && o.indexOf("javascript") >= 0) && e.globalEval(a)), 
a;
};
}
}
if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), 
this;
var o, r, a, s = this;
"function" == typeof n && (n = {
success:n
}), o = this.attr("method"), r = this.attr("action"), a = "string" == typeof r ? e.trim(r) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
n = e.extend(!0, {
url:a,
success:e.ajaxSettings.success,
type:o || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, n);
var l = {};
if (this.trigger("form-pre-serialize", [ this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var u, c, d = this.formToArray(n.semantic);
if (n.data) {
n.extraData = n.data;
for (u in n.data) if (n.data[u] instanceof Array) for (var h in n.data[u]) d.push({
name:u,
value:n.data[u][h]
}); else c = n.data[u], c = e.isFunction(c) ? c() :c, d.push({
name:u,
value:c
});
}
if (n.beforeSubmit && n.beforeSubmit(d, this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ d, this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var p = e.param(d);
"GET" == n.type.toUpperCase() ? (n.url += (n.url.indexOf("?") >= 0 ? "&" :"?") + p, 
n.data = null) :n.data = p;
var f = [];
if (n.resetForm && f.push(function() {
s.resetForm();
}), n.clearForm && f.push(function() {
s.clearForm();
}), !n.dataType && n.target) {
var g = n.success || function() {};
f.push(function(t) {
var i = n.replaceTarget ? "replaceWith" :"html";
e(n.target)[i](t).each(g, arguments);
});
} else n.success && f.push(n.success);
n.success = function(e, t, i) {
for (var o = n.context || n, r = 0, a = f.length; a > r; r++) f[r].apply(o, [ e, t, i || s, s ]);
};
var m = e("input:file", this).length > 0, v = "multipart/form-data", y = s.attr("enctype") == v || s.attr("encoding") == v;
if (n.iframe !== !1 && (m || n.iframe || y)) n.closeKeepAlive ? e.get(n.closeKeepAlive, function() {
i(d);
}) :i(d); else {
if (e.browser.msie && "get" == o) {
var b = s[0].getAttribute("method");
"string" == typeof b && (n.type = b);
}
e.ajax(n);
}
return this.trigger("form-submit-notify", [ this, n ]), this;
}, e.fn.ajaxForm = function(n) {
if (0 === this.length) {
var i = {
s:this.selector,
c:this.context
};
return !e.isReady && i.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
e(i.s, i.c).ajaxForm(n);
}), this) :(t("terminating; zero elements found by selector" + (e.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(t) {
t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(n));
}).bind("click.form-plugin", function(t) {
var n = t.target, i = e(n);
if (!i.is(":submit,input:image")) {
var o = i.closest(":submit");
if (0 == o.length) return;
n = o[0];
}
var r = this;
if (r.clk = n, "image" == n.type) if (void 0 != t.offsetX) r.clk_x = t.offsetX, 
r.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
var a = i.offset();
r.clk_x = t.pageX - a.left, r.clk_y = t.pageY - a.top;
} else r.clk_x = t.pageX - n.offsetLeft, r.clk_y = t.pageY - n.offsetTop;
setTimeout(function() {
r.clk = r.clk_x = r.clk_y = null;
}, 100);
});
}, e.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, e.fn.formToArray = function(t) {
var n = [];
if (0 === this.length) return n;
var i = this[0], o = t ? i.getElementsByTagName("*") :i.elements;
if (!o) return n;
var r, a, s, l, u, c, d;
for (r = 0, c = o.length; c > r; r++) if (u = o[r], s = u.name) if (t && i.clk && "image" == u.type) u.disabled || i.clk != u || (n.push({
name:s,
value:e(u).val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
})); else if (l = e.fieldValue(u, !0), l && l.constructor == Array) for (a = 0, 
d = l.length; d > a; a++) n.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && n.push({
name:s,
value:l
});
if (!t && i.clk) {
var h = e(i.clk), p = h[0];
s = p.name, s && !p.disabled && "image" == p.type && (n.push({
name:s,
value:h.val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
}));
}
return n;
}, e.fn.formSerialize = function(t) {
return e.param(this.formToArray(t));
}, e.fn.fieldSerialize = function(t) {
var n = [];
return this.each(function() {
var i = this.name;
if (i) {
var o = e.fieldValue(this, t);
if (o && o.constructor == Array) for (var r = 0, a = o.length; a > r; r++) n.push({
name:i,
value:o[r]
}); else null !== o && "undefined" != typeof o && n.push({
name:this.name,
value:o
});
}
}), e.param(n);
}, e.fn.fieldValue = function(t) {
for (var n = [], i = 0, o = this.length; o > i; i++) {
var r = this[i], a = e.fieldValue(r, t);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(n, a) :n.push(a));
}
return n;
}, e.fieldValue = function(t, n) {
var i = t.name, o = t.type, r = t.tagName.toLowerCase();
if (void 0 === n && (n = !0), n && (!i || t.disabled || "reset" == o || "button" == o || ("checkbox" == o || "radio" == o) && !t.checked || ("submit" == o || "image" == o) && t.form && t.form.clk != t || "select" == r && -1 == t.selectedIndex)) return null;
if ("select" == r) {
var a = t.selectedIndex;
if (0 > a) return null;
for (var s = [], l = t.options, u = "select-one" == o, c = u ? a + 1 :l.length, d = u ? a :0; c > d; d++) {
var h = l[d];
if (h.selected) {
var p = h.value;
if (p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text :h.value), 
u) return p;
s.push(p);
}
}
return s;
}
return e(t).val();
}, e.fn.clearForm = function() {
return this.each(function() {
e("input,select,textarea", this).clearFields();
});
}, e.fn.clearFields = e.fn.clearInputs = function() {
var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var t = this.type, n = this.tagName.toLowerCase();
e.test(t) || "textarea" == n ? this.value = "" :"checkbox" == t || "radio" == t ? this.checked = !1 :"select" == n && (this.selectedIndex = -1);
});
}, e.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, e.fn.enable = function(e) {
return void 0 === e && (e = !0), this.each(function() {
this.disabled = !e;
});
}, e.fn.selected = function(t) {
return void 0 === t && (t = !0), this.each(function() {
var n = this.type;
if ("checkbox" == n || "radio" == n) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
var i = e(this).parent("select");
t && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = t;
}
});
};
}(jQuery), +function(e) {
"use strict";
var t = function(e, t) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", e, t);
};
t.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body",
callback:function() {}
}, t.prototype.init = function(t, n, i) {
this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(i);
for (var o = this.options.trigger.split(" "), r = o.length; r--; ) {
var a = o[r];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
}
}
this.options.selector ? this._options = e.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.getOptions = function(t) {
return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
show:t.delay,
hide:t.delay
}), t;
}, t.prototype.getDelegateOptions = function() {
var t = {}, n = this.getDefaults();
return this._options && e.each(this._options, function(e, i) {
n[e] != i && (t[e] = i);
}), t;
}, t.prototype.enter = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
"in" == n.hoverState && n.show();
}, n.options.delay.show), void 0) :n.show();
}, t.prototype.leave = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
"out" == n.hoverState && n.hide();
}, n.options.delay.hide), void 0) :n.hide();
}, t.prototype.show = function() {
var t = e.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(t), t.isDefaultPrevented()) return;
var n = this.tip();
this.setContent(), this.options.animation && n.addClass("fade");
var i = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) :this.options.placement, o = /\s?auto?\s?/i, r = o.test(i);
r && (i = i.replace(o, "") || "top"), n.detach().css({
top:0,
left:0,
display:"block"
}).addClass(i), this.options.container ? n.appendTo(this.options.container) :n.insertAfter(this.$element);
var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
if (r) {
var u = this.$element.parent(), c = i, d = document.documentElement.scrollTop || document.body.scrollTop, h = "body" == this.options.container ? window.innerWidth :u.outerWidth(), p = "body" == this.options.container ? window.innerHeight :u.outerHeight(), f = "body" == this.options.container ? 0 :u.offset().left;
i = "bottom" == i && a.top + a.height + l - d > p ? "top" :"top" == i && a.top - d - l < 0 ? "bottom" :"right" == i && a.right + s > h ? "left" :"left" == i && a.left - s < f ? "right" :i, 
n.removeClass(c).addClass(i);
}
var g = this.getCalculatedOffset(i, a, s, l);
this.applyPlacement(g, i), this.$element.trigger("shown.bs." + this.type), "function" == typeof this.options.callback && this.options.callback.call(this.$element, this.tip());
}
}, t.prototype.applyPlacement = function(e, t) {
var n, i = this.tip(), o = i[0].offsetWidth, r = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10), s = parseInt(i.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
i.offset(e).addClass("in");
var l = i[0].offsetWidth, u = i[0].offsetHeight;
if ("top" == t && u != r && (n = !0, e.top = e.top + r - u), /bottom|top/.test(t)) {
var c = 0;
e.left < 0 && (c = -2 * e.left, e.left = 0, i.offset(e), l = i[0].offsetWidth, u = i[0].offsetHeight), 
this.replaceArrow(c - o + l, l, "left");
} else this.replaceArrow(u - r, u, "top");
n && i.offset(e);
}, t.prototype.replaceArrow = function(e, t, n) {
this.arrow().css(n, e ? 50 * (1 - e / t) + "%" :"");
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle();
e.find(".tooltip-inner")[this.options.html ? "html" :"text"](t), e.removeClass("fade in top bottom left right");
}, t.prototype.hide = function() {
function t() {
"in" != n.hoverState && i.detach();
}
var n = this, i = this.tip(), o = e.Event("hide.bs." + this.type);
return this.$element.trigger(o), i.hide(), o.isDefaultPrevented() ? void 0 :(i.removeClass("in"), 
e.support.transition && this.$tip.hasClass("fade") ? i.one(e.support.transition.end, t).emulateTransitionEnd(150) :t(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, t.prototype.fixTitle = function() {
var e = this.$element;
(e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
}, t.prototype.hasContent = function() {
return this.getTitle();
}, t.prototype.getPosition = function() {
var t = this.$element[0];
return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() :{
width:t.offsetWidth,
height:t.offsetHeight
}, this.$element.offset());
}, t.prototype.getCalculatedOffset = function(e, t, n, i) {
return "bottom" == e ? {
top:t.top + t.height,
left:t.left + t.width / 2 - n / 2
} :"top" == e ? {
top:t.top - i,
left:t.left + t.width / 2 - n / 2
} :"left" == e ? {
top:t.top + t.height / 2 - i / 2,
left:t.left - n
} :{
top:t.top + t.height / 2 - i / 2,
left:t.left + t.width
};
}, t.prototype.getTitle = function() {
var e, t = this.$element, n = this.options;
return e = "function" == typeof n.title ? n.title.call(t[0]) :t.attr("data-original-title") || n.title;
}, t.prototype.tip = function() {
return this.$tip = this.$tip || e(this.options.template);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, t.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, t.prototype.enable = function() {
this.enabled = !0;
}, t.prototype.disable = function() {
this.enabled = !1;
}, t.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, t.prototype.toggle = function(t) {
var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
n.tip().hasClass("in") ? n.leave(n) :n.enter(n);
}, t.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var n = e.fn.tooltip;
e.fn.tooltip = function(n) {
return this.each(function() {
var i = e(this), o = i.data("bs.tooltip"), r = "object" == typeof n && n;
o || i.data("bs.tooltip", o = new t(this, r)), "string" == typeof n && o[n]();
});
}, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
return e.fn.tooltip = n, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e) {
"use strict";
var t = function(e, t) {
this.init("popover", e, t);
};
if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle(), n = this.getContent();
e.find(".popover-title")[this.options.html ? "html" :"text"](t), e.find(".popover-content")[this.options.html ? "html" :"text"](n), 
e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
}, t.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, t.prototype.getContent = function() {
var e = this.$element, t = this.options;
return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) :t.content);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, t.prototype.tip = function() {
return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
};
var n = e.fn.popover;
e.fn.popover = function(n) {
return this.each(function() {
var i = e(this), o = i.data("bs.popover"), r = "object" == typeof n && n;
o || i.data("bs.popover", o = new t(this, r)), "string" == typeof n && o[n]();
});
}, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
return e.fn.popover = n, this;
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(e, t, n) {
"$:nomunge";
function i(e) {
return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
}
var o, r = "hashchange", a = document, s = e.event.special, l = a.documentMode, u = "on" + r in t && (l === n || l > 7);
e.fn[r] = function(e) {
return e ? this.bind(r, e) :this.trigger(r);
}, e.fn[r].delay = 50, s[r] = e.extend(s[r], {
setup:function() {
return u ? !1 :(e(o.start), void 0);
},
teardown:function() {
return u ? !1 :(e(o.stop), void 0);
}
}), o = function() {
function o() {
var n = i(), a = p(c);
n !== c ? (h(c = n, a), e(t).trigger(r)) :a !== c && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(o, e.fn[r].delay);
}
var s, l = {}, c = i(), d = function(e) {
return e;
}, h = d, p = d;
return l.start = function() {
s || o();
}, l.stop = function() {
s && clearTimeout(s), s = n;
}, e.browser.msie && !u && function() {
var t, n;
l.start = function() {
t || (n = e.fn[r].src, n = n && n + i(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
n || h(i()), o();
}).attr("src", n || "javascript:void(0)").insertAfter("body")[0].contentWindow, 
a.onpropertychange = function() {
try {
"title" === event.propertyName && (t.document.title = a.title);
} catch (e) {}
});
}, l.stop = d, p = function() {
return i(t.location.href);
}, h = function(n, i) {
var o = t.document, s = e.fn[r].domain;
n !== i && (o.title = a.title, o.open(), s && o.write('<script>document.domain="' + s + '"</script>'), 
o.close(), t.location.hash = n);
};
}(), l;
}();
}(jQuery, this), !function(e) {
var t = "waitForImages";
e.waitForImages = {
hasImageProperties:[ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor" ]
}, e.expr[":"].uncached = function(t) {
if (!e(t).is('img[src!=""]')) return !1;
var n = new Image();
return n.src = t.src, !n.complete;
}, e.fn.waitForImages = function(n, i, o) {
var r = 0, a = 0;
if (e.isPlainObject(arguments[0]) && (o = arguments[0].waitForAll, i = arguments[0].each, 
n = arguments[0].finished), n = n || e.noop, i = i || e.noop, o = !!o, !e.isFunction(n) || !e.isFunction(i)) throw new TypeError("An invalid callback was supplied.");
return this.each(function() {
var s = e(this), l = [], u = e.waitForImages.hasImageProperties || [], c = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
o ? s.find("*").addBack().each(function() {
var t = e(this);
t.is("img:uncached") && l.push({
src:t.attr("src"),
element:t[0]
}), e.each(u, function(e, n) {
var i, o = t.css(n);
if (!o) return !0;
for (;i = c.exec(o); ) l.push({
src:i[2],
element:t[0]
});
});
}) :s.find("img:uncached").each(function() {
l.push({
src:this.src,
element:this
});
}), r = l.length, a = 0, 0 === r && n.call(s[0]), e.each(l, function(o, l) {
var u = new Image();
e(u).on("load." + t + " error." + t, function(e) {
return a++, i.call(l.element, a, r, "load" == e.type), a == r ? (n.call(s[0]), !1) :void 0;
}), u.src = l.src;
});
});
};
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(e, t, n, i) {
var o = e(t);
e.fn.lazyload = function(r) {
function a() {
var t = 0;
l.each(function() {
var n = e(this);
if (!u.skip_invisible || n.is(":visible")) if (e.abovethetop(this, u) || e.leftofbegin(this, u)) ; else if (e.belowthefold(this, u) || e.rightoffold(this, u)) {
if (++t > u.failure_limit) return !1;
} else n.trigger("appear"), t = 0;
});
}
var s, l = this, u = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:t,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return r && (i !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), 
i !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(u, r)), 
s = u.container === i || u.container === t ? o :e(u.container), 0 === u.event.indexOf("scroll") && s.bind(u.event, function() {
return a();
}), this.each(function() {
var t = this, n = e(t);
t.loaded = !1, n.one("appear", function() {
if (!this.loaded) {
if (u.appear) {
var i = l.length;
u.appear.call(t, i, u);
}
if (n.data("background")) {
var o = n.data("background");
n.css("backgroundImage", "url(" + o + ")");
} else {
var o = n.data(u.data_attribute);
e("<img />").bind("load", function() {
n.hide().attr("src", o).on("load", function() {
n.trigger("afterAppear");
}), n[u.effect](u.effect_speed), t.loaded = !0;
var i = e.grep(l, function(e) {
return !e.loaded;
});
if (l = e(i), u.load) {
var r = l.length;
u.load.call(t, r, u);
}
}).attr("src", o);
}
}
}), 0 !== u.event.indexOf("scroll") && n.bind(u.event, function() {
t.loaded || n.trigger("appear");
});
}), o.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && o.bind("pageshow", function(t) {
t.originalEvent && t.originalEvent.persisted && l.each(function() {
e(this).trigger("appear");
});
}), e(n).ready(function() {
a();
}), this;
}, e.belowthefold = function(n, r) {
var a;
return a = r.container === i || r.container === t ? o.height() + o.scrollTop() :e(r.container).offset().top + e(r.container).height(), 
a <= e(n).offset().top - r.threshold;
}, e.rightoffold = function(n, r) {
var a;
return a = r.container === i || r.container === t ? o.width() + o.scrollLeft() :e(r.container).offset().left + e(r.container).width(), 
a <= e(n).offset().left - r.threshold;
}, e.abovethetop = function(n, r) {
var a;
return a = r.container === i || r.container === t ? o.scrollTop() :e(r.container).offset().top, 
a >= e(n).offset().top + r.threshold + e(n).height();
}, e.leftofbegin = function(n, r) {
var a;
return a = r.container === i || r.container === t ? o.scrollLeft() :e(r.container).offset().left, 
a >= e(n).offset().left + r.threshold + e(n).width();
}, e.inviewport = function(t, n) {
return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n));
}, e.extend(e.expr[":"], {
"below-the-fold":function(t) {
return e.belowthefold(t, {
threshold:0
});
},
"above-the-top":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-screen":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-screen":function(t) {
return !e.rightoffold(t, {
threshold:0
});
},
"in-viewport":function(t) {
return e.inviewport(t, {
threshold:0
});
},
"above-the-fold":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-fold":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-fold":function(t) {
return !e.rightoffold(t, {
threshold:0
});
}
});
}(jQuery, window, document), function(e) {
"function" == typeof define && define.amd ? define(e) :window.purl = e();
}(function() {
function e(e, t) {
for (var n = decodeURI(e), i = g[t ? "strict" :"loose"].exec(n), o = {
attr:{},
param:{},
seg:{}
}, a = 14; a--; ) o.attr[p[a]] = i[a] || "";
return o.param.query = r(o.attr.query), o.param.fragment = r(o.attr.fragment), o.seg.path = o.attr.path.replace(/^\/+|\/+$/g, "").split("/"), 
o.seg.fragment = o.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), o.attr.base = o.attr.host ? (o.attr.protocol ? o.attr.protocol + "://" + o.attr.host :o.attr.host) + (o.attr.port ? ":" + o.attr.port :"") :"", 
o;
}
function t(e) {
var t = e.tagName;
return "undefined" != typeof t ? h[t.toLowerCase()] :t;
}
function n(e, t) {
if (0 === e[t].length) return e[t] = {};
var n = {};
for (var i in e[t]) n[i] = e[t][i];
return e[t] = n, n;
}
function i(e, t, o, r) {
var a = e.shift();
if (a) {
var s = t[o] = t[o] || [];
"]" == a ? u(s) ? "" !== r && s.push(r) :"object" == typeof s ? s[c(s).length] = r :s = t[o] = [ t[o], r ] :~a.indexOf("]") ? (a = a.substr(0, a.length - 1), 
!m.test(a) && u(s) && (s = n(t, o)), i(e, s, a, r)) :(!m.test(a) && u(s) && (s = n(t, o)), 
i(e, s, a, r));
} else u(t[o]) ? t[o].push(r) :t[o] = "object" == typeof t[o] ? r :"undefined" == typeof t[o] ? r :[ t[o], r ];
}
function o(e, t, n) {
if (~t.indexOf("]")) {
var o = t.split("[");
i(o, e, "base", n);
} else {
if (!m.test(t) && u(e.base)) {
var r = {};
for (var s in e.base) r[s] = e.base[s];
e.base = r;
}
"" !== t && a(e.base, t, n);
}
return e;
}
function r(e) {
return l(String(e).split(/&|;/), function(e, t) {
try {
t = decodeURIComponent(t.replace(/\+/g, " "));
} catch (n) {}
var i = t.indexOf("="), r = s(t), a = t.substr(0, r || i), l = t.substr(r || i, t.length);
return l = l.substr(l.indexOf("=") + 1, l.length), "" === a && (a = t, l = ""), 
o(e, a, l);
}, {
base:{}
}).base;
}
function a(e, t, n) {
var i = e[t];
"undefined" == typeof i ? e[t] = n :u(i) ? i.push(n) :e[t] = [ i, n ];
}
function s(e) {
for (var t, n, i = e.length, o = 0; i > o; ++o) if (n = e[o], "]" == n && (t = !1), 
"[" == n && (t = !0), "=" == n && !t) return o;
}
function l(e, t) {
for (var n = 0, i = e.length >> 0, o = arguments[2]; i > n; ) n in e && (o = t.call(void 0, o, e[n], n, e)), 
++n;
return o;
}
function u(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function c(e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && t.push(n);
return t;
}
function d(t, n) {
return 1 === arguments.length && t === !0 && (n = !0, t = void 0), n = n || !1, 
t = t || window.location.toString(), {
data:e(t, n),
attr:function(e) {
return e = f[e] || e, "undefined" != typeof e ? this.data.attr[e] :this.data.attr;
},
param:function(e) {
return "undefined" != typeof e ? this.data.param.query[e] :this.data.param.query;
},
fparam:function(e) {
return "undefined" != typeof e ? this.data.param.fragment[e] :this.data.param.fragment;
},
segment:function(e) {
return "undefined" == typeof e ? this.data.seg.path :(e = 0 > e ? this.data.seg.path.length + e :e - 1, 
this.data.seg.path[e]);
},
fsegment:function(e) {
return "undefined" == typeof e ? this.data.seg.fragment :(e = 0 > e ? this.data.seg.fragment.length + e :e - 1, 
this.data.seg.fragment[e]);
}
};
}
var h = {
a:"href",
img:"src",
form:"action",
base:"href",
script:"src",
iframe:"src",
link:"href",
embed:"src",
object:"data"
}, p = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ], f = {
anchor:"fragment"
}, g = {
strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
}, m = /^[0-9]+$/;
return d.jQuery = function(e) {
null != e && (e.fn.url = function(n) {
var i = "";
return this.length && (i = e(this).attr(t(this[0])) || ""), d(i, n);
}, e.url = d);
}, d.jQuery(window.jQuery), d;
}), function(e, t) {
function n(e, t) {
var n = null === e || typeof e in o;
return n ? e === t :!1;
}
var i = e.ko = {};
i.exportSymbol = function(t, n) {
for (var i = t.split("."), o = e, r = 0; r < i.length - 1; r++) o = o[i[r]];
o[i[i.length - 1]] = n;
}, i.exportProperty = function(e, t, n) {
e[t] = n;
}, i.utils = new function() {
function n(e, t) {
if ("INPUT" != e.tagName || !e.type) return !1;
if ("click" != t.toLowerCase()) return !1;
var n = e.type.toLowerCase();
return "checkbox" == n || "radio" == n;
}
var o = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, r = /MSIE 6/i.test(navigator.userAgent), a = /MSIE 7/i.test(navigator.userAgent), s = {}, l = {}, u = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" :"UIEvents";
s[u] = [ "keyup", "keydown", "keypress" ], s.MouseEvents = [ "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave" ];
for (var c in s) {
var d = s[c];
if (d.length) for (var h = 0, p = d.length; p > h; h++) l[d[h]] = c;
}
return {
fieldsIncludedWithJsonPost:[ "authenticity_token", /^__RequestVerificationToken(_.*)?$/ ],
arrayForEach:function(e, t) {
for (var n = 0, i = e.length; i > n; n++) t(e[n]);
},
arrayIndexOf:function(e, t) {
if ("function" == typeof e.indexOf) return e.indexOf(t);
for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
return -1;
},
arrayFirst:function(e, t, n) {
for (var i = 0, o = e.length; o > i; i++) if (t.call(n, e[i])) return e[i];
return null;
},
arrayRemoveItem:function(e, t) {
var n = i.utils.arrayIndexOf(e, t);
n >= 0 && e.splice(n, 1);
},
arrayGetDistinctValues:function(e) {
e = e || [];
for (var t = [], n = 0, o = e.length; o > n; n++) i.utils.arrayIndexOf(t, e[n]) < 0 && t.push(e[n]);
return t;
},
arrayMap:function(e, t) {
e = e || [];
for (var n = [], i = 0, o = e.length; o > i; i++) n.push(t(e[i]));
return n;
},
arrayFilter:function(e, t) {
e = e || [];
for (var n = [], i = 0, o = e.length; o > i; i++) t(e[i]) && n.push(e[i]);
return n;
},
arrayPushAll:function(e, t) {
for (var n = 0, i = t.length; i > n; n++) e.push(t[n]);
},
emptyDomNode:function(e) {
for (;e.firstChild; ) i.removeNode(e.firstChild);
},
setDomNodeChildren:function(e, t) {
i.utils.emptyDomNode(e), t && i.utils.arrayForEach(t, function(t) {
e.appendChild(t);
});
},
replaceDomNodes:function(e, t) {
var n = e.nodeType ? [ e ] :e;
if (n.length > 0) {
for (var o = n[0], r = o.parentNode, a = 0, s = t.length; s > a; a++) r.insertBefore(t[a], o);
for (var a = 0, s = n.length; s > a; a++) i.removeNode(n[a]);
}
},
setOptionNodeSelectionState:function(e, t) {
navigator.userAgent.indexOf("MSIE 6") >= 0 ? e.setAttribute("selected", t) :e.selected = t;
},
getElementsHavingAttribute:function(e, t) {
if (!e || 1 != e.nodeType) return [];
var n = [];
null !== e.getAttribute(t) && n.push(e);
for (var i = e.getElementsByTagName("*"), o = 0, r = i.length; r > o; o++) null !== i[o].getAttribute(t) && n.push(i[o]);
return n;
},
stringTrim:function(e) {
return (e || "").replace(o, "");
},
stringTokenize:function(e, t) {
for (var n = [], o = (e || "").split(t), r = 0, a = o.length; a > r; r++) {
var s = i.utils.stringTrim(o[r]);
"" !== s && n.push(s);
}
return n;
},
stringStartsWith:function(e, t) {
return e = e || "", t.length > e.length ? !1 :e.substring(0, t.length) === t;
},
evalWithinScope:function(e, n) {
return n === t ? new Function("return " + e)() :new Function("sc", "with(sc) { return (" + e + ") }")(n);
},
domNodeIsContainedBy:function(e, t) {
if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));
for (;null != e; ) {
if (e == t) return !0;
e = e.parentNode;
}
return !1;
},
domNodeIsAttachedToDocument:function(e) {
return i.utils.domNodeIsContainedBy(e, document);
},
registerEventHandler:function(e, t, i) {
if ("undefined" != typeof jQuery) {
if (n(e, t)) {
var o = i;
i = function(e, t) {
var n = this.checked;
t && (this.checked = t.checkedStateBeforeEvent !== !0), o.call(this, e), this.checked = n;
};
}
jQuery(e).bind(t, i);
} else if ("function" == typeof e.addEventListener) e.addEventListener(t, i, !1); else {
if ("undefined" == typeof e.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
e.attachEvent("on" + t, function(t) {
i.call(e, t);
});
}
},
triggerEvent:function(t, i) {
if (!t || !t.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
if ("undefined" != typeof jQuery) {
var o = [];
n(t, i) && o.push({
checkedStateBeforeEvent:t.checked
}), jQuery(t).trigger(i, o);
} else if ("function" == typeof document.createEvent) {
if ("function" != typeof t.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
var r = l[i] || "HTMLEvents", a = document.createEvent(r);
a.initEvent(i, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(a);
} else {
if ("undefined" == typeof t.fireEvent) throw new Error("Browser doesn't support triggering events");
"click" == i && ("INPUT" != t.tagName || "checkbox" != t.type.toLowerCase() && "radio" != t.type.toLowerCase() || (t.checked = t.checked !== !0)), 
t.fireEvent("on" + i);
}
},
unwrapObservable:function(e) {
return i.isObservable(e) ? e() :e;
},
domNodeHasCssClass:function(e, t) {
var n = (e.className || "").split(/\s+/);
return i.utils.arrayIndexOf(n, t) >= 0;
},
toggleDomNodeCssClass:function(e, t, n) {
var o = i.utils.domNodeHasCssClass(e, t);
if (n && !o) e.className = (e.className || "") + " " + t; else if (o && !n) {
for (var r = (e.className || "").split(/\s+/), a = "", s = 0; s < r.length; s++) r[s] != t && (a += r[s] + " ");
e.className = i.utils.stringTrim(a);
}
},
range:function(e, t) {
e = i.utils.unwrapObservable(e), t = i.utils.unwrapObservable(t);
for (var n = [], o = e; t >= o; o++) n.push(o);
return n;
},
makeArray:function(e) {
for (var t = [], n = 0, i = e.length; i > n; n++) t.push(e[n]);
return t;
},
isIe6:r,
isIe7:a,
getFormFields:function(e, t) {
for (var n = i.utils.makeArray(e.getElementsByTagName("INPUT")).concat(i.utils.makeArray(e.getElementsByTagName("TEXTAREA"))), o = "string" == typeof t ? function(e) {
return e.name === t;
} :function(e) {
return t.test(e.name);
}, r = [], a = n.length - 1; a >= 0; a--) o(n[a]) && r.push(n[a]);
return r;
},
parseJson:function(t) {
return "string" == typeof t && (t = i.utils.stringTrim(t)) ? e.JSON && e.JSON.parse ? e.JSON.parse(t) :new Function("return " + t)() :null;
},
stringifyJson:function(e) {
if ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return JSON.stringify(i.utils.unwrapObservable(e));
},
postJson:function(e, t, n) {
n = n || {};
var o = n.params || {}, r = n.includeFields || this.fieldsIncludedWithJsonPost, a = e;
if ("object" == typeof e && "FORM" == e.tagName) {
var s = e;
a = s.action;
for (var l = r.length - 1; l >= 0; l--) for (var u = i.utils.getFormFields(s, r[l]), c = u.length - 1; c >= 0; c--) o[u[c].name] = u[c].value;
}
t = i.utils.unwrapObservable(t);
var d = document.createElement("FORM");
d.style.display = "none", d.action = a, d.method = "post";
for (var h in t) {
var p = document.createElement("INPUT");
p.name = h, p.value = i.utils.stringifyJson(i.utils.unwrapObservable(t[h])), d.appendChild(p);
}
for (var h in o) {
var p = document.createElement("INPUT");
p.name = h, p.value = o[h], d.appendChild(p);
}
document.body.appendChild(d), n.submitter ? n.submitter(d) :d.submit(), setTimeout(function() {
d.parentNode.removeChild(d);
}, 0);
}
};
}(), i.exportSymbol("ko.utils", i.utils), i.exportSymbol("ko.utils.arrayForEach", i.utils.arrayForEach), 
i.exportSymbol("ko.utils.arrayFirst", i.utils.arrayFirst), i.exportSymbol("ko.utils.arrayFilter", i.utils.arrayFilter), 
i.exportSymbol("ko.utils.arrayGetDistinctValues", i.utils.arrayGetDistinctValues), 
i.exportSymbol("ko.utils.arrayIndexOf", i.utils.arrayIndexOf), i.exportSymbol("ko.utils.arrayMap", i.utils.arrayMap), 
i.exportSymbol("ko.utils.arrayPushAll", i.utils.arrayPushAll), i.exportSymbol("ko.utils.arrayRemoveItem", i.utils.arrayRemoveItem), 
i.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", i.utils.fieldsIncludedWithJsonPost), 
i.exportSymbol("ko.utils.getElementsHavingAttribute", i.utils.getElementsHavingAttribute), 
i.exportSymbol("ko.utils.getFormFields", i.utils.getFormFields), i.exportSymbol("ko.utils.postJson", i.utils.postJson), 
i.exportSymbol("ko.utils.parseJson", i.utils.parseJson), i.exportSymbol("ko.utils.registerEventHandler", i.utils.registerEventHandler), 
i.exportSymbol("ko.utils.stringifyJson", i.utils.stringifyJson), i.exportSymbol("ko.utils.range", i.utils.range), 
i.exportSymbol("ko.utils.toggleDomNodeCssClass", i.utils.toggleDomNodeCssClass), 
i.exportSymbol("ko.utils.triggerEvent", i.utils.triggerEvent), i.exportSymbol("ko.utils.unwrapObservable", i.utils.unwrapObservable), 
Function.prototype.bind || (Function.prototype.bind = function(e) {
var t = this, n = Array.prototype.slice.call(arguments), e = n.shift();
return function() {
return t.apply(e, n.concat(Array.prototype.slice.call(arguments)));
};
}), i.utils.domData = new function() {
var e = 0, n = "__ko__" + new Date().getTime(), o = {};
return {
get:function(e, n) {
var o = i.utils.domData.getAll(e, !1);
return o === t ? t :o[n];
},
set:function(e, n, o) {
if (o !== t || i.utils.domData.getAll(e, !1) !== t) {
var r = i.utils.domData.getAll(e, !0);
r[n] = o;
}
},
getAll:function(i, r) {
var a = i[n];
if (!a) {
if (!r) return t;
a = i[n] = "ko" + e++, o[a] = {};
}
return o[a];
},
clear:function(e) {
var t = e[n];
t && (delete o[t], e[n] = null);
}
};
}(), i.utils.domNodeDisposal = new function() {
function e(e, n) {
var o = i.utils.domData.get(e, r);
return o === t && n && (o = [], i.utils.domData.set(e, r, o)), o;
}
function n(e) {
i.utils.domData.set(e, r, t);
}
function o(t) {
var n = e(t, !1);
if (n) {
n = n.slice(0);
for (var o = 0; o < n.length; o++) n[o](t);
}
i.utils.domData.clear(t), "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([ t ]);
}
var r = "__ko_domNodeDisposal__" + new Date().getTime();
return {
addDisposeCallback:function(t, n) {
if ("function" != typeof n) throw new Error("Callback must be a function");
e(t, !0).push(n);
},
removeDisposeCallback:function(t, o) {
var r = e(t, !1);
r && (i.utils.arrayRemoveItem(r, o), 0 == r.length && n(t));
},
cleanNode:function(e) {
if (1 == e.nodeType || 9 == e.nodeType) {
o(e);
var t = [];
i.utils.arrayPushAll(t, e.getElementsByTagName("*"));
for (var n = 0, r = t.length; r > n; n++) o(t[n]);
}
},
removeNode:function(e) {
i.cleanNode(e), e.parentNode && e.parentNode.removeChild(e);
}
};
}(), i.cleanNode = i.utils.domNodeDisposal.cleanNode, i.removeNode = i.utils.domNodeDisposal.removeNode, 
i.exportSymbol("ko.cleanNode", i.cleanNode), i.exportSymbol("ko.removeNode", i.removeNode), 
i.exportSymbol("ko.utils.domNodeDisposal", i.utils.domNodeDisposal), i.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", i.utils.domNodeDisposal.addDisposeCallback), 
i.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", i.utils.domNodeDisposal.removeDisposeCallback), 
function() {
function e(e) {
var t = i.utils.stringTrim(e).toLowerCase(), n = document.createElement("div"), o = t.match(/^<(thead|tbody|tfoot)/) && [ 1, "<table>", "</table>" ] || !t.indexOf("<tr") && [ 2, "<table><tbody>", "</tbody></table>" ] || (!t.indexOf("<td") || !t.indexOf("<th")) && [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] || [ 0, "", "" ];
for (n.innerHTML = o[1] + e + o[2]; o[0]--; ) n = n.lastChild;
return i.utils.makeArray(n.childNodes);
}
i.utils.parseHtmlFragment = function(t) {
return "undefined" != typeof jQuery ? jQuery.clean([ t ]) :e(t);
}, i.utils.setHtml = function(e, n) {
if (i.utils.emptyDomNode(e), null !== n && n !== t) if ("string" != typeof n && (n = n.toString()), 
"undefined" != typeof jQuery) jQuery(e).html(n); else for (var o = i.utils.parseHtmlFragment(n), r = 0; r < o.length; r++) e.appendChild(o[r]);
};
}(), i.memoization = function() {
function e() {
return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
}
function n() {
return e() + e();
}
function o(e, t) {
if (e) if (8 == e.nodeType) {
var n = i.memoization.parseMemoText(e.nodeValue);
null != n && t.push({
domNode:e,
memoId:n
});
} else if (1 == e.nodeType) for (var r = 0, a = e.childNodes, s = a.length; s > r; r++) o(a[r], t);
}
var r = {};
return {
memoize:function(e) {
if ("function" != typeof e) throw new Error("You can only pass a function to ko.memoization.memoize()");
var t = n();
return r[t] = e, "<!--[ko_memo:" + t + "]-->";
},
unmemoize:function(e, n) {
var i = r[e];
if (i === t) throw new Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
try {
return i.apply(null, n || []), !0;
} finally {
delete r[e];
}
},
unmemoizeDomNodeAndDescendants:function(e, t) {
var n = [];
o(e, n);
for (var r = 0, a = n.length; a > r; r++) {
var s = n[r].domNode, l = [ s ];
t && i.utils.arrayPushAll(l, t), i.memoization.unmemoize(n[r].memoId, l), s.nodeValue = "", 
s.parentNode && s.parentNode.removeChild(s);
}
},
parseMemoText:function(e) {
var t = e.match(/^\[ko_memo\:(.*?)\]$/);
return t ? t[1] :null;
}
};
}(), i.exportSymbol("ko.memoization", i.memoization), i.exportSymbol("ko.memoization.memoize", i.memoization.memoize), 
i.exportSymbol("ko.memoization.unmemoize", i.memoization.unmemoize), i.exportSymbol("ko.memoization.parseMemoText", i.memoization.parseMemoText), 
i.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", i.memoization.unmemoizeDomNodeAndDescendants), 
i.subscription = function(e, t) {
this.callback = e, this.dispose = function() {
this.isDisposed = !0, t();
}.bind(this), i.exportProperty(this, "dispose", this.dispose);
}, i.subscribable = function() {
var e = [];
this.subscribe = function(t, n) {
var o = n ? t.bind(n) :t, r = new i.subscription(o, function() {
i.utils.arrayRemoveItem(e, r);
});
return e.push(r), r;
}, this.notifySubscribers = function(t) {
i.utils.arrayForEach(e.slice(0), function(e) {
e && e.isDisposed !== !0 && e.callback(t);
});
}, this.getSubscriptionsCount = function() {
return e.length;
}, i.exportProperty(this, "subscribe", this.subscribe), i.exportProperty(this, "notifySubscribers", this.notifySubscribers), 
i.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount);
}, i.isSubscribable = function(e) {
return "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
}, i.exportSymbol("ko.subscribable", i.subscribable), i.exportSymbol("ko.isSubscribable", i.isSubscribable), 
i.dependencyDetection = function() {
var e = [];
return {
begin:function() {
e.push([]);
},
end:function() {
return e.pop();
},
registerDependency:function(t) {
if (!i.isSubscribable(t)) throw "Only subscribable things can act as dependencies";
e.length > 0 && e[e.length - 1].push(t);
}
};
}();
var o = {
undefined:!0,
"boolean":!0,
number:!0,
string:!0
};
i.observable = function(e) {
function t() {
return arguments.length > 0 ? (t.equalityComparer && t.equalityComparer(o, arguments[0]) || (o = arguments[0], 
t.notifySubscribers(o)), this) :(i.dependencyDetection.registerDependency(t), o);
}
var o = e;
return t.__ko_proto__ = i.observable, t.valueHasMutated = function() {
t.notifySubscribers(o);
}, t.equalityComparer = n, i.subscribable.call(t), i.exportProperty(t, "valueHasMutated", t.valueHasMutated), 
t;
}, i.isObservable = function(e) {
return null === e || e === t || e.__ko_proto__ === t ? !1 :e.__ko_proto__ === i.observable ? !0 :i.isObservable(e.__ko_proto__);
}, i.isWriteableObservable = function(e) {
return "function" == typeof e && e.__ko_proto__ === i.observable ? !0 :"function" == typeof e && e.__ko_proto__ === i.dependentObservable && e.hasWriteFunction ? !0 :!1;
}, i.exportSymbol("ko.observable", i.observable), i.exportSymbol("ko.isObservable", i.isObservable), 
i.exportSymbol("ko.isWriteableObservable", i.isWriteableObservable), i.observableArray = function(e) {
if (0 == arguments.length && (e = []), null !== e && e !== t && !("length" in e)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
var n = new i.observable(e);
return i.utils.arrayForEach([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
n[e] = function() {
var t = n(), i = t[e].apply(t, arguments);
return n.valueHasMutated(), i;
};
}), i.utils.arrayForEach([ "slice" ], function(e) {
n[e] = function() {
var t = n();
return t[e].apply(t, arguments);
};
}), n.remove = function(e) {
for (var t = n(), i = [], o = [], r = "function" == typeof e ? e :function(t) {
return t === e;
}, a = 0, s = t.length; s > a; a++) {
var l = t[a];
r(l) ? o.push(l) :i.push(l);
}
return n(i), o;
}, n.removeAll = function(e) {
if (e === t) {
var o = n();
return n([]), o;
}
return e ? n.remove(function(t) {
return i.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, n.destroy = function(e) {
for (var t = n(), i = "function" == typeof e ? e :function(t) {
return t === e;
}, o = t.length - 1; o >= 0; o--) {
var r = t[o];
i(r) && (t[o]._destroy = !0);
}
n.valueHasMutated();
}, n.destroyAll = function(e) {
return e === t ? n.destroy(function() {
return !0;
}) :e ? n.destroy(function(t) {
return i.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, n.indexOf = function(e) {
var t = n();
return i.utils.arrayIndexOf(t, e);
}, n.replace = function(e, t) {
var i = n.indexOf(e);
i >= 0 && (n()[i] = t, n.valueHasMutated());
}, i.exportProperty(n, "remove", n.remove), i.exportProperty(n, "removeAll", n.removeAll), 
i.exportProperty(n, "destroy", n.destroy), i.exportProperty(n, "destroyAll", n.destroyAll), 
i.exportProperty(n, "indexOf", n.indexOf), n;
}, i.exportSymbol("ko.observableArray", i.observableArray), i.dependentObservable = function(e, t, n) {
function o() {
i.utils.arrayForEach(p, function(e) {
e.dispose();
}), p = [];
}
function r(e) {
o(), i.utils.arrayForEach(e, function(e) {
p.push(e.subscribe(a));
});
}
function a() {
if (u && "function" == typeof n.disposeWhen && n.disposeWhen()) return s.dispose(), 
void 0;
try {
i.dependencyDetection.begin(), l = n.owner ? n.read.call(n.owner) :n.read();
} finally {
var e = i.utils.arrayGetDistinctValues(i.dependencyDetection.end());
r(e);
}
s.notifySubscribers(l), u = !0;
}
function s() {
if (!(arguments.length > 0)) return u || a(), i.dependencyDetection.registerDependency(s), 
l;
if ("function" != typeof n.write) throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
var e = arguments[0];
n.owner ? n.write.call(n.owner, e) :n.write(e);
}
var l, u = !1;
if (e && "object" == typeof e ? n = e :(n = n || {}, n.read = e || n.read, n.owner = t || n.owner), 
"function" != typeof n.read) throw "Pass a function that returns the value of the dependentObservable";
var c = "object" == typeof n.disposeWhenNodeIsRemoved ? n.disposeWhenNodeIsRemoved :null, d = null;
if (c) {
d = function() {
s.dispose();
}, i.utils.domNodeDisposal.addDisposeCallback(c, d);
var h = n.disposeWhen;
n.disposeWhen = function() {
return !i.utils.domNodeIsAttachedToDocument(c) || "function" == typeof h && h();
};
}
var p = [];
return s.__ko_proto__ = i.dependentObservable, s.getDependenciesCount = function() {
return p.length;
}, s.hasWriteFunction = "function" == typeof n.write, s.dispose = function() {
c && i.utils.domNodeDisposal.removeDisposeCallback(c, d), o();
}, i.subscribable.call(s), n.deferEvaluation !== !0 && a(), i.exportProperty(s, "dispose", s.dispose), 
i.exportProperty(s, "getDependenciesCount", s.getDependenciesCount), s;
}, i.dependentObservable.__ko_proto__ = i.observable, i.exportSymbol("ko.dependentObservable", i.dependentObservable), 
function() {
function e(i, r, a) {
a = a || new o(), i = r(i);
var s = "object" == typeof i && null !== i && i !== t;
if (!s) return i;
var l = i instanceof Array ? [] :{};
return a.save(i, l), n(i, function(n) {
var o = r(i[n]);
switch (typeof o) {
case "boolean":
case "number":
case "string":
case "function":
l[n] = o;
break;

case "object":
case "undefined":
var s = a.get(o);
l[n] = s !== t ? s :e(o, r, a);
}
}), l;
}
function n(e, t) {
if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n); else for (var i in e) t(i);
}
function o() {
var e = [], n = [];
this.save = function(t, o) {
var r = i.utils.arrayIndexOf(e, t);
r >= 0 ? n[r] = o :(e.push(t), n.push(o));
}, this.get = function(o) {
var r = i.utils.arrayIndexOf(e, o);
return r >= 0 ? n[r] :t;
};
}
var r = 10;
i.toJS = function(t) {
if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
return e(t, function(e) {
for (var t = 0; i.isObservable(e) && r > t; t++) e = e();
return e;
});
}, i.toJSON = function(e) {
var t = i.toJS(e);
return i.utils.stringifyJson(t);
};
}(), i.exportSymbol("ko.toJS", i.toJS), i.exportSymbol("ko.toJSON", i.toJSON), function() {
i.selectExtensions = {
readValue:function(e) {
return "OPTION" == e.tagName ? e.__ko__hasDomDataOptionValue__ === !0 ? i.utils.domData.get(e, i.bindingHandlers.options.optionValueDomDataKey) :e.getAttribute("value") :"SELECT" == e.tagName ? e.selectedIndex >= 0 ? i.selectExtensions.readValue(e.options[e.selectedIndex]) :t :e.value;
},
writeValue:function(e, n) {
if ("OPTION" == e.tagName) switch (typeof n) {
case "string":
case "number":
i.utils.domData.set(e, i.bindingHandlers.options.optionValueDomDataKey, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, 
e.value = n;
break;

default:
i.utils.domData.set(e, i.bindingHandlers.options.optionValueDomDataKey, n), e.__ko__hasDomDataOptionValue__ = !0, 
e.value = "";
} else if ("SELECT" == e.tagName) {
for (var o = e.options.length - 1; o >= 0; o--) if (i.selectExtensions.readValue(e.options[o]) == n) {
e.selectedIndex = o;
break;
}
} else (null === n || n === t) && (n = ""), e.value = n;
}
};
}(), i.exportSymbol("ko.selectExtensions", i.selectExtensions), i.exportSymbol("ko.selectExtensions.readValue", i.selectExtensions.readValue), 
i.exportSymbol("ko.selectExtensions.writeValue", i.selectExtensions.writeValue), 
i.jsonExpressionRewriting = function() {
function e(e, t) {
return e.replace(n, function(e, n) {
return t[n];
});
}
function t(e) {
return i.utils.arrayIndexOf(r, i.utils.stringTrim(e).toLowerCase()) >= 0 ? !1 :null !== e.match(o);
}
var n = /\[ko_token_(\d+)\]/g, o = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, r = [ "true", "false" ];
return {
parseJson:function(t) {
if (t = i.utils.stringTrim(t), t.length < 3) return {};
for (var n, o = [], r = null, a = "{" == t.charAt(0) ? 1 :0; a < t.length; a++) {
var s = t.charAt(a);
if (null === r) switch (s) {
case '"':
case "'":
case "/":
r = a, n = s;
break;

case "{":
r = a, n = "}";
break;

case "[":
r = a, n = "]";
} else if (s == n) {
var l = t.substring(r, a + 1);
o.push(l);
var u = "[ko_token_" + (o.length - 1) + "]";
t = t.substring(0, r) + u + t.substring(a + 1), a -= l.length - u.length, r = null;
}
}
for (var c = {}, d = t.split(","), h = 0, p = d.length; p > h; h++) {
var f = d[h], g = f.indexOf(":");
if (g > 0 && g < f.length - 1) {
var m = i.utils.stringTrim(f.substring(0, g)), v = i.utils.stringTrim(f.substring(g + 1));
"{" == m.charAt(0) && (m = m.substring(1)), "}" == v.charAt(v.length - 1) && (v = v.substring(0, v.length - 1)), 
m = i.utils.stringTrim(e(m, o)), v = i.utils.stringTrim(e(v, o)), c[m] = v;
}
}
return c;
},
insertPropertyAccessorsIntoJson:function(e) {
var n = i.jsonExpressionRewriting.parseJson(e), o = [];
for (var r in n) {
var a = n[r];
t(a) && (o.length > 0 && o.push(", "), o.push(r + " : function(__ko_value) { " + a + " = __ko_value; }"));
}
if (o.length > 0) {
var s = o.join("");
e = e + ", '_ko_property_writers' : { " + s + " } ";
}
return e;
}
};
}(), i.exportSymbol("ko.jsonExpressionRewriting", i.jsonExpressionRewriting), i.exportSymbol("ko.jsonExpressionRewriting.parseJson", i.jsonExpressionRewriting.parseJson), 
i.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson), 
function() {
function n(t, n) {
try {
var o = " { " + i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t) + " } ";
return i.utils.evalWithinScope(o, null === n ? e :n);
} catch (r) {
throw new Error("Unable to parse binding attribute.\nMessage: " + r + ";\nAttribute value: " + t);
}
}
function o(e, t, n, i, o) {
e(t, n, i, o);
}
var r = "data-bind";
i.bindingHandlers = {}, i.applyBindingsToNode = function(e, t, a, s) {
function l(e) {
return function() {
return d[e];
};
}
function u() {
return d;
}
var c = !0;
s = s || r;
var d;
new i.dependentObservable(function() {
var r = "function" == typeof t ? t() :t;
if (d = r || n(e.getAttribute(s), a), c) for (var h in d) i.bindingHandlers[h] && "function" == typeof i.bindingHandlers[h].init && o(i.bindingHandlers[h].init, e, l(h), u, a);
for (var h in d) i.bindingHandlers[h] && "function" == typeof i.bindingHandlers[h].update && o(i.bindingHandlers[h].update, e, l(h), u, a);
}, null, {
disposeWhenNodeIsRemoved:e
}), c = !1;
}, i.applyBindings = function(n, o) {
if (o && o.nodeType == t) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
o = o || e.document.body;
var a = i.utils.getElementsHavingAttribute(o, r);
i.utils.arrayForEach(a, function(e) {
i.applyBindingsToNode(e, null, n);
});
}, i.exportSymbol("ko.bindingHandlers", i.bindingHandlers), i.exportSymbol("ko.applyBindings", i.applyBindings), 
i.exportSymbol("ko.applyBindingsToNode", i.applyBindingsToNode);
}();
var r = [ "click" ];
i.utils.arrayForEach(r, function(e) {
i.bindingHandlers[e] = {
init:function(t, n, o, r) {
var a = function() {
var t = {};
return t[e] = n(), t;
};
return i.bindingHandlers.event.init.call(this, t, a, o, r);
}
};
}), i.bindingHandlers.event = {
init:function(e, t, n, o) {
var r = t() || {};
for (var a in r) !function() {
var r = a;
"string" == typeof r && i.utils.registerEventHandler(e, r, function(e) {
var i, a = t()[r];
if (a) {
var s = n();
try {
i = a.apply(o, arguments);
} finally {
i !== !0 && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
}
var l = s[r + "Bubble"] !== !1;
l || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
}
});
}();
}
}, i.bindingHandlers.submit = {
init:function(e, t, n, o) {
if ("function" != typeof t()) throw new Error("The value for a submit binding must be a function to invoke on submit");
i.utils.registerEventHandler(e, "submit", function(n) {
var i, r = t();
try {
i = r.call(o, e);
} finally {
i !== !0 && (n.preventDefault ? n.preventDefault() :n.returnValue = !1);
}
});
}
}, i.bindingHandlers.visible = {
update:function(e, t) {
var n = i.utils.unwrapObservable(t()), o = !("none" == e.style.display);
n && !o ? e.style.display = "" :!n && o && (e.style.display = "none");
}
}, i.bindingHandlers.enable = {
update:function(e, t) {
var n = i.utils.unwrapObservable(t());
n && e.disabled ? e.removeAttribute("disabled") :n || e.disabled || (e.disabled = !0);
}
}, i.bindingHandlers.disable = {
update:function(e, t) {
i.bindingHandlers.enable.update(e, function() {
return !i.utils.unwrapObservable(t());
});
}
}, i.bindingHandlers.value = {
init:function(e, t, n) {
var o = [ "change" ], r = n().valueUpdate;
r && ("string" == typeof r && (r = [ r ]), i.utils.arrayPushAll(o, r), o = i.utils.arrayGetDistinctValues(o)), 
i.utils.arrayForEach(o, function(o) {
var r = !1;
i.utils.stringStartsWith(o, "after") && (r = !0, o = o.substring("after".length));
var a = r ? function(e) {
setTimeout(e, 0);
} :function(e) {
e();
};
i.utils.registerEventHandler(e, o, function() {
a(function() {
var o = t(), r = i.selectExtensions.readValue(e);
if (i.isWriteableObservable(o)) o(r); else {
var a = n();
a._ko_property_writers && a._ko_property_writers.value && a._ko_property_writers.value(r);
}
});
});
});
},
update:function(e, t) {
var n = i.utils.unwrapObservable(t()), o = i.selectExtensions.readValue(e), r = n != o;
if (0 === n && 0 !== o && "0" !== o && (r = !0), r) {
var a = function() {
i.selectExtensions.writeValue(e, n);
};
a();
var s = "SELECT" == e.tagName;
s && setTimeout(a, 0);
}
"SELECT" == e.tagName && (o = i.selectExtensions.readValue(e), o !== n && i.utils.triggerEvent(e, "change"));
}
}, i.bindingHandlers.options = {
update:function(e, n, o) {
if ("SELECT" != e.tagName) throw new Error("options binding applies only to SELECT elements");
{
var r = i.utils.arrayMap(i.utils.arrayFilter(e.childNodes, function(e) {
return e.tagName && "OPTION" == e.tagName && e.selected;
}), function(e) {
return i.selectExtensions.readValue(e) || e.innerText || e.textContent;
}), a = e.scrollTop, s = i.utils.unwrapObservable(n());
e.value;
}
if (i.utils.emptyDomNode(e), s) {
var l = o();
if ("number" != typeof s.length && (s = [ s ]), l.optionsCaption) {
var u = document.createElement("OPTION");
u.innerHTML = l.optionsCaption, i.selectExtensions.writeValue(u, t), e.appendChild(u);
}
for (var c = 0, d = s.length; d > c; c++) {
var u = document.createElement("OPTION"), h = "string" == typeof l.optionsValue ? s[c][l.optionsValue] :s[c];
h = i.utils.unwrapObservable(h), i.selectExtensions.writeValue(u, h);
var p = l.optionsText;
optionText = "function" == typeof p ? p(s[c]) :"string" == typeof p ? s[c][p] :h, 
(null === optionText || optionText === t) && (optionText = ""), optionText = i.utils.unwrapObservable(optionText).toString(), 
"string" == typeof u.innerText ? u.innerText = optionText :u.textContent = optionText, 
e.appendChild(u);
}
for (var f = e.getElementsByTagName("OPTION"), g = 0, c = 0, d = f.length; d > c; c++) i.utils.arrayIndexOf(r, i.selectExtensions.readValue(f[c])) >= 0 && (i.utils.setOptionNodeSelectionState(f[c], !0), 
g++);
a && (e.scrollTop = a);
}
}
}, i.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__", 
i.bindingHandlers.selectedOptions = {
getSelectedValuesFromSelectNode:function(e) {
for (var t = [], n = e.childNodes, o = 0, r = n.length; r > o; o++) {
var a = n[o];
"OPTION" == a.tagName && a.selected && t.push(i.selectExtensions.readValue(a));
}
return t;
},
init:function(e, t, n) {
i.utils.registerEventHandler(e, "change", function() {
var e = t();
if (i.isWriteableObservable(e)) e(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this)); else {
var o = n();
o._ko_property_writers && o._ko_property_writers.value && o._ko_property_writers.value(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
}
});
},
update:function(e, t) {
if ("SELECT" != e.tagName) throw new Error("values binding applies only to SELECT elements");
var n = i.utils.unwrapObservable(t());
if (n && "number" == typeof n.length) for (var o = e.childNodes, r = 0, a = o.length; a > r; r++) {
var s = o[r];
"OPTION" == s.tagName && i.utils.setOptionNodeSelectionState(s, i.utils.arrayIndexOf(n, i.selectExtensions.readValue(s)) >= 0);
}
}
}, i.bindingHandlers.text = {
update:function(e, n) {
var o = i.utils.unwrapObservable(n());
(null === o || o === t) && (o = ""), "string" == typeof e.innerText ? e.innerText = o :e.textContent = o;
}
}, i.bindingHandlers.html = {
update:function(e, t) {
var n = i.utils.unwrapObservable(t());
i.utils.setHtml(e, n);
}
}, i.bindingHandlers.css = {
update:function(e, t) {
var n = i.utils.unwrapObservable(t() || {});
for (var o in n) if ("string" == typeof o) {
var r = i.utils.unwrapObservable(n[o]);
i.utils.toggleDomNodeCssClass(e, o, r);
}
}
}, i.bindingHandlers.style = {
update:function(e, t) {
var n = i.utils.unwrapObservable(t() || {});
for (var o in n) if ("string" == typeof o) {
var r = i.utils.unwrapObservable(n[o]);
e.style[o] = r || "";
}
}
}, i.bindingHandlers.uniqueName = {
init:function(e, t) {
t() && (e.name = "ko_unique_" + ++i.bindingHandlers.uniqueName.currentIndex, i.utils.isIe6 && e.mergeAttributes(document.createElement("<input name='" + e.name + "'/>"), !1));
}
}, i.bindingHandlers.uniqueName.currentIndex = 0, i.bindingHandlers.checked = {
init:function(e, t, n) {
var o = function() {
var o;
if ("checkbox" == e.type) o = e.checked; else {
if ("radio" != e.type || !e.checked) return;
o = e.value;
}
var r = t();
if ("checkbox" == e.type && i.utils.unwrapObservable(r) instanceof Array) {
var a = i.utils.arrayIndexOf(i.utils.unwrapObservable(r), e.value);
e.checked && 0 > a ? r.push(e.value) :!e.checked && a >= 0 && r.splice(a, 1);
} else if (i.isWriteableObservable(r)) r() !== o && r(o); else {
var s = n();
s._ko_property_writers && s._ko_property_writers.checked && s._ko_property_writers.checked(o);
}
};
i.utils.registerEventHandler(e, "click", o), "radio" != e.type || e.name || i.bindingHandlers.uniqueName.init(e, function() {
return !0;
});
},
update:function(e, t) {
var n = i.utils.unwrapObservable(t());
"checkbox" == e.type ? (e.checked = n instanceof Array ? i.utils.arrayIndexOf(n, e.value) >= 0 :n, 
n && i.utils.isIe6 && e.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) :"radio" == e.type && (e.checked = e.value == n, 
e.value == n && (i.utils.isIe6 || i.utils.isIe7) && e.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1));
}
}, i.bindingHandlers.attr = {
update:function(e, n) {
var o = i.utils.unwrapObservable(n()) || {};
for (var r in o) if ("string" == typeof r) {
var a = i.utils.unwrapObservable(o[r]);
a === !1 || null === a || a === t ? e.removeAttribute(r) :e.setAttribute(r, a.toString());
}
}
}, i.templateEngine = function() {
this.renderTemplate = function() {
throw "Override renderTemplate in your ko.templateEngine subclass";
}, this.isTemplateRewritten = function() {
throw "Override isTemplateRewritten in your ko.templateEngine subclass";
}, this.rewriteTemplate = function() {
throw "Override rewriteTemplate in your ko.templateEngine subclass";
}, this.createJavaScriptEvaluatorBlock = function() {
throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass";
};
}, i.exportSymbol("ko.templateEngine", i.templateEngine), i.templateRewriting = function() {
var e = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
return {
ensureTemplateIsRewritten:function(e, t) {
t.isTemplateRewritten(e) || t.rewriteTemplate(e, function(e) {
return i.templateRewriting.memoizeBindingAttributeSyntax(e, t);
});
},
memoizeBindingAttributeSyntax:function(t, n) {
return t.replace(e, function() {
var e = arguments[1], t = arguments[6];
t = i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t);
var o = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + t + " } })()                 })";
return n.createJavaScriptEvaluatorBlock(o) + e;
});
},
applyMemoizedBindingsToNextSibling:function(e) {
return i.memoization.memoize(function(t, n) {
t.nextSibling && i.applyBindingsToNode(t.nextSibling, e, n);
});
}
};
}(), i.exportSymbol("ko.templateRewriting", i.templateRewriting), i.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", i.templateRewriting.applyMemoizedBindingsToNextSibling), 
function() {
function e(e) {
return e.nodeType ? e :e.length > 0 ? e[0] :null;
}
function n(e, t, n, o, a) {
var s = i.utils.unwrapObservable(o);
a = a || {};
var l = a.templateEngine || r;
i.templateRewriting.ensureTemplateIsRewritten(n, l);
var u = l.renderTemplate(n, s, a);
if ("number" != typeof u.length || u.length > 0 && "number" != typeof u[0].nodeType) throw "Template engine must return an array of DOM nodes";
switch (u && i.utils.arrayForEach(u, function(e) {
i.memoization.unmemoizeDomNodeAndDescendants(e, [ o ]);
}), t) {
case "replaceChildren":
i.utils.setDomNodeChildren(e, u);
break;

case "replaceNode":
i.utils.replaceDomNodes(e, u);
break;

case "ignoreTargetNode":
break;

default:
throw new Error("Unknown renderMode: " + t);
}
return a.afterRender && a.afterRender(u, o), u;
}
function o(e, t) {
var n = i.utils.domData.get(e, a);
n && "function" == typeof n.dispose && n.dispose(), i.utils.domData.set(e, a, t);
}
var r;
i.setTemplateEngine = function(e) {
if (e != t && !(e instanceof i.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
r = e;
}, i.renderTemplate = function(o, a, s, l, u) {
if (s = s || {}, (s.templateEngine || r) == t) throw "Set a template engine before calling renderTemplate";
if (u = u || "replaceChildren", l) {
var c = e(l), d = function() {
return !c || !i.utils.domNodeIsAttachedToDocument(c);
}, h = c && "replaceNode" == u ? c.parentNode :c;
return new i.dependentObservable(function() {
var t = "function" == typeof o ? o(a) :o, i = n(l, u, t, a, s);
"replaceNode" == u && (l = i, c = e(l));
}, null, {
disposeWhen:d,
disposeWhenNodeIsRemoved:h
});
}
return i.memoization.memoize(function(e) {
i.renderTemplate(o, a, s, e, "replaceNode");
});
}, i.renderTemplateForEach = function(e, t, o, r) {
return new i.dependentObservable(function() {
var a = i.utils.unwrapObservable(t) || [];
"undefined" == typeof a.length && (a = [ a ]);
var s = i.utils.arrayFilter(a, function(e) {
return o.includeDestroyed || !e._destroy;
});
i.utils.setDomNodeChildrenFromArrayMapping(r, s, function(t) {
var i = "function" == typeof e ? e(t) :e;
return n(null, "ignoreTargetNode", i, t, o);
}, o);
}, null, {
disposeWhenNodeIsRemoved:r
});
};
var a = "__ko__templateSubscriptionDomDataKey__";
i.bindingHandlers.template = {
update:function(e, t, n, r) {
var a, s = i.utils.unwrapObservable(t()), l = "string" == typeof s ? s :s.name;
if ("undefined" != typeof s.foreach) a = i.renderTemplateForEach(l, s.foreach || [], {
templateOptions:s.templateOptions,
afterAdd:s.afterAdd,
beforeRemove:s.beforeRemove,
includeDestroyed:s.includeDestroyed,
afterRender:s.afterRender
}, e); else {
var u = s.data;
a = i.renderTemplate(l, "undefined" == typeof u ? r :u, {
templateOptions:s.templateOptions,
afterRender:s.afterRender
}, e);
}
o(e, a);
}
};
}(), i.exportSymbol("ko.setTemplateEngine", i.setTemplateEngine), i.exportSymbol("ko.renderTemplate", i.renderTemplate), 
function() {
function e(e, n, i) {
for (var o = [], r = 0; r <= n.length; r++) o[r] = [];
for (var r = 0, a = Math.min(e.length, i); a >= r; r++) o[0][r] = r;
for (var r = 1, a = Math.min(n.length, i); a >= r; r++) o[r][0] = r;
var s, l, u = e.length, c = n.length;
for (s = 1; u >= s; s++) {
var d = Math.max(1, s - i), h = Math.min(c, s + i);
for (l = d; h >= l; l++) if (e[s - 1] === n[l - 1]) o[l][s] = o[l - 1][s - 1]; else {
var p = o[l - 1][s] === t ? Number.MAX_VALUE :o[l - 1][s] + 1, f = o[l][s - 1] === t ? Number.MAX_VALUE :o[l][s - 1] + 1;
o[l][s] = Math.min(p, f);
}
}
return o;
}
function n(e, n, i) {
var o = n.length, r = i.length, a = [], s = e[r][o];
if (s === t) return null;
for (;o > 0 || r > 0; ) {
var l = e[r][o], u = r > 0 ? e[r - 1][o] :s + 1, c = o > 0 ? e[r][o - 1] :s + 1, d = r > 0 && o > 0 ? e[r - 1][o - 1] :s + 1;
(u === t || l - 1 > u) && (u = s + 1), (c === t || l - 1 > c) && (c = s + 1), l - 1 > d && (d = s + 1), 
c >= u && d > u ? (a.push({
status:"added",
value:i[r - 1]
}), r--) :u > c && d > c ? (a.push({
status:"deleted",
value:n[o - 1]
}), o--) :(a.push({
status:"retained",
value:n[o - 1]
}), r--, o--);
}
return a.reverse();
}
i.utils.compareArrays = function(o, r, a) {
if (a === t) return i.utils.compareArrays(o, r, 1) || i.utils.compareArrays(o, r, 10) || i.utils.compareArrays(o, r, Number.MAX_VALUE);
o = o || [], r = r || [];
var s = e(o, r, a);
return n(s, o, r);
};
}(), i.exportSymbol("ko.utils.compareArrays", i.utils.compareArrays), function() {
function e(e, t, n) {
var o = [], r = i.dependentObservable(function() {
var e = t(n) || [];
o.length > 0 && i.utils.replaceDomNodes(o, e), o.splice(0, o.length), i.utils.arrayPushAll(o, e);
}, null, {
disposeWhenNodeIsRemoved:e,
disposeWhen:function() {
return 0 == o.length || !i.utils.domNodeIsAttachedToDocument(o[0]);
}
});
return {
mappedNodes:o,
dependentObservable:r
};
}
i.utils.setDomNodeChildrenFromArrayMapping = function(n, o, r, a) {
o = o || [], a = a || {};
for (var s = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === t, l = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], u = i.utils.arrayMap(l, function(e) {
return e.arrayEntry;
}), c = i.utils.compareArrays(u, o), d = [], h = 0, p = [], f = [], g = null, m = 0, v = c.length; v > m; m++) switch (c[m].status) {
case "retained":
var y = l[h];
d.push(y), y.domNodes.length > 0 && (g = y.domNodes[y.domNodes.length - 1]), h++;
break;

case "deleted":
l[h].dependentObservable.dispose(), i.utils.arrayForEach(l[h].domNodes, function(e) {
p.push({
element:e,
index:m,
value:c[m].value
}), g = e;
}), h++;
break;

case "added":
var b = e(n, r, c[m].value), _ = b.mappedNodes;
d.push({
arrayEntry:c[m].value,
domNodes:_,
dependentObservable:b.dependentObservable
});
for (var w = 0, k = _.length; k > w; w++) {
var S = _[w];
f.push({
element:S,
index:m,
value:c[m].value
}), null == g ? n.firstChild ? n.insertBefore(S, n.firstChild) :n.appendChild(S) :g.nextSibling ? n.insertBefore(S, g.nextSibling) :n.appendChild(S), 
g = S;
}
}
i.utils.arrayForEach(p, function(e) {
i.cleanNode(e.element);
});
var x = !1;
if (!s) {
if (a.afterAdd) for (var m = 0; m < f.length; m++) a.afterAdd(f[m].element, f[m].index, f[m].value);
if (a.beforeRemove) {
for (var m = 0; m < p.length; m++) a.beforeRemove(p[m].element, p[m].index, p[m].value);
x = !0;
}
}
x || i.utils.arrayForEach(p, function(e) {
e.element.parentNode && e.element.parentNode.removeChild(e.element);
}), i.utils.domData.set(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult", d);
};
}(), i.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", i.utils.setDomNodeChildrenFromArrayMapping), 
i.jqueryTmplTemplateEngine = function() {
this.jQueryTmplVersion = function() {
return "undefined" != typeof jQuery && jQuery.tmpl ? jQuery.tmpl.tag ? jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 :2 :1 :0;
}(), this.getTemplateNode = function(e) {
var t = document.getElementById(e);
if (null == t) throw new Error("Cannot find template with ID=" + e);
return t;
};
var e = "__ko_apos__", t = new RegExp(e, "g");
this.renderTemplate = function(e, n, i) {
if (i = i || {}, 0 == this.jQueryTmplVersion) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
if (1 == this.jQueryTmplVersion) {
var o = '<script type="text/html">' + this.getTemplateNode(e).text + "</script>", r = jQuery.tmpl(o, n), a = r[0].text.replace(t, "'");
return jQuery.clean([ a ], document);
}
if (!(e in jQuery.template)) {
var s = this.getTemplateNode(e).text;
jQuery.template(e, s);
}
n = [ n ];
var l = jQuery.tmpl(e, n, i.templateOptions);
return l.appendTo(document.createElement("div")), jQuery.fragments = {}, l;
}, this.isTemplateRewritten = function(e) {
return e in jQuery.template ? !0 :this.getTemplateNode(e).isRewritten === !0;
}, this.rewriteTemplate = function(t, n) {
var o = this.getTemplateNode(t);
text = o.text.replace(/([\w-]+)=([\w-]+)([ >])/g, function(e, t, n, i) {
return t + '="' + n + '"' + i;
});
var r = n(text);
1 == this.jQueryTmplVersion && (r = i.utils.stringTrim(r), r = r.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g, function() {
var t = arguments[1], n = arguments[2];
return t.replace(/\'/g, e) + n;
})), o.text = r, o.isRewritten = !0;
}, this.createJavaScriptEvaluatorBlock = function(e) {
return 1 == this.jQueryTmplVersion ? "{{= " + e + "}}" :"{{ko_code ((function() { return " + e + " })()) }}";
}, this.addTemplate = function(e, t) {
document.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
}, i.exportProperty(this, "addTemplate", this.addTemplate), this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
open:(this.jQueryTmplVersion < 3 ? "_" :"__") + ".push($1 || '');"
});
}, i.jqueryTmplTemplateEngine.prototype = new i.templateEngine(), i.setTemplateEngine(new i.jqueryTmplTemplateEngine()), 
i.exportSymbol("ko.jqueryTmplTemplateEngine", i.jqueryTmplTemplateEngine);
}(window), ko.exportSymbol = function(e, t) {
for (var n = e.split("."), i = window, o = 0; o < n.length - 1; o++) i = i[n[o]];
i[n[n.length - 1]] = t;
}, ko.exportProperty = function(e, t, n) {
e[t] = n;
}, function() {
function e(t, n) {
for (var i in n) n.hasOwnProperty(i) && n[i] && (!t[i] || t[i] instanceof Array ? t[i] = n[i] :e(t[i], n[i]));
}
function t(t, n) {
var i = {};
return e(i, t), e(i, n), i;
}
function n(e) {
return e && "object" == typeof e && e.constructor == new Date().constructor ? "date" :typeof e;
}
function i(e, t) {
return e = e || {}, (e.create instanceof Function || e.key instanceof Function || e.arrayChanged instanceof Function) && (e = {
"":e
}), t && (e.ignore = o(t.ignore, e.ignore), e.include = o(t.include, e.include), 
e.copy = o(t.copy, e.copy)), e.ignore = o(e.ignore, y.ignore), e.include = o(e.include, y.include), 
e.copy = o(e.copy, y.copy), e.mappedProperties = {}, e;
}
function o(e, t) {
return e instanceof Array || (e = "undefined" === n(e) ? [] :[ e ]), t instanceof Array || (t = "undefined" === n(t) ? [] :[ t ]), 
e.concat(t);
}
function r(e) {
var t = ko.dependentObservable;
ko.dependentObservable = function() {
var e = arguments[2] || {};
e.deferEvaluation = !0;
var t = new m(arguments[0], arguments[1], e);
return t.__ko_proto__ = m, t;
};
var n = e();
return ko.dependentObservable = t, n;
}
function a(e, i, o, l, p, m, v) {
var y = ko.utils.unwrapObservable(i) instanceof Array;
if (v = v || "", ko.mapping.isMapped(e)) {
var b = ko.utils.unwrapObservable(e)[g];
o = t(b, o);
}
var _ = function() {
return o[p] && o[p].create instanceof Function;
};
if (l = l || new f(), l.get(i)) return e;
if (p = p || "", y) {
var w = [], k = function(e) {
return e;
};
o[p] && o[p].key && (k = o[p].key);
var S = function(e) {
return e;
};
_() && (S = function(e) {
return o[p].create({
data:e,
parent:m
});
}), ko.isObservable(e) || (e = ko.observableArray([]), e.mappedRemove = function(t) {
var n = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.remove(function(e) {
return n(k(e));
});
}, e.mappedRemoveAll = function(t) {
var n = c(t, k);
return e.remove(function(e) {
return -1 != ko.utils.arrayIndexOf(n, k(e));
});
}, e.mappedDestroy = function(t) {
var n = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.destroy(function(e) {
return n(k(e));
});
}, e.mappedDestroyAll = function(t) {
var n = c(t, k);
return e.destroy(function(e) {
return -1 != ko.utils.arrayIndexOf(n, k(e));
});
}, e.mappedIndexOf = function(t) {
var n = c(e(), k), i = k(t);
return ko.utils.arrayIndexOf(n, i);
}, e.mappedCreate = function(t) {
if (-1 !== e.mappedIndexOf(t)) throw new Error("There already is an object with the key that you specified.");
var n = S(t);
return e.push(n), n;
});
for (var x = c(ko.utils.unwrapObservable(e), k).sort(), T = c(i, k).sort(), C = ko.utils.compareArrays(x, T), E = {}, M = [], D = 0, $ = C.length; $ > D; D++) {
var L, I = C[D], A = v + "[" + D + "]";
switch (I.status) {
case "added":
var B = u(ko.utils.unwrapObservable(i), I.value, k);
L = ko.utils.unwrapObservable(a(void 0, B, o, l, p, e, A));
var O = s(ko.utils.unwrapObservable(i), B, E);
M[O] = L, E[O] = !0;
break;

case "retained":
var B = u(ko.utils.unwrapObservable(i), I.value, k);
L = u(e, I.value, k), a(L, B, o, l, p, e, A);
var O = s(ko.utils.unwrapObservable(i), B, E);
M[O] = L, E[O] = !0;
break;

case "deleted":
L = u(e, I.value, k);
}
w.push({
event:I.status,
item:L
});
}
e(M), o[p] && o[p].arrayChanged && ko.utils.arrayForEach(w, function(e) {
o[p].arrayChanged(e.event, e.item);
});
} else if (h(i)) {
if (!e) {
if (_()) {
var N = r(function() {
return o[p].create({
data:i,
parent:m
});
});
return N;
}
e = {};
}
l.save(i, e), d(i, function(t) {
var n = v.length ? v + "." + t :t;
if (-1 == ko.utils.arrayIndexOf(o.ignore, n)) {
if (-1 != ko.utils.arrayIndexOf(o.copy, n)) return e[t] = i[t], void 0;
var r = l.get(i[t]);
e[t] = r ? r :a(e[t], i[t], o, l, t, e, n), o.mappedProperties[n] = !0;
}
});
} else switch (n(i)) {
case "function":
e = i;
break;

default:
ko.isWriteableObservable(e) ? e(ko.utils.unwrapObservable(i)) :e = _() ? r(function() {
return o[p].create({
data:i,
parent:m
});
}) :ko.observable(ko.utils.unwrapObservable(i));
}
return e;
}
function s(e, t, n) {
for (var i = 0, o = e.length; o > i; i++) if (n[i] !== !0 && e[i] == t) return i;
return null;
}
function l(e, t) {
var i;
return t && (i = t(e)), "undefined" === n(i) && (i = e), ko.utils.unwrapObservable(i);
}
function u(e, t, n) {
var i = ko.utils.arrayFilter(ko.utils.unwrapObservable(e), function(e) {
return l(e, n) == t;
});
if (0 == i.length) throw new Error("When calling ko.update*, the key '" + t + "' was not found!");
if (i.length > 1 && h(i[0])) throw new Error("When calling ko.update*, the key '" + t + "' was not unique!");
return i[0];
}
function c(e, t) {
return ko.utils.arrayMap(ko.utils.unwrapObservable(e), function(e) {
return t ? l(e, t) :e;
});
}
function d(e, t) {
if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n); else for (var i in e) t(i);
}
function h(e) {
var t = n(e);
return "object" == t && null !== e && "undefined" !== t;
}
function p(e, t, n) {
var i = e || "";
return t instanceof Array ? e && (i += "[" + n + "]") :(e && (i += "."), i += n), 
i;
}
function f() {
var e = [], t = [];
this.save = function(n, i) {
var o = ko.utils.arrayIndexOf(e, n);
o >= 0 ? t[o] = i :(e.push(n), t.push(i));
}, this.get = function(n) {
var i = ko.utils.arrayIndexOf(e, n);
return i >= 0 ? t[i] :void 0;
};
}
ko.mapping = {};
var g = "__ko_mapping__", m = ko.dependentObservable, v = {
include:[ "_destroy" ],
ignore:[],
copy:[]
}, y = v;
ko.mapping.fromJS = function(e, n, o) {
if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
n = i(n);
var r = a(o, e, n);
return r[g] = t(r[g], n), r;
}, ko.mapping.fromJSON = function(e, t) {
var n = ko.utils.parseJson(e);
return ko.mapping.fromJS(n, t);
}, ko.mapping.isMapped = function(e) {
var t = ko.utils.unwrapObservable(e);
return t && t[g];
}, ko.mapping.updateFromJS = function(e, t) {
if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
if (!e) throw new Error("The object is undefined.");
if (!e[g]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
return a(e, t, e[g]);
}, ko.mapping.updateFromJSON = function(e, t, n) {
var i = ko.utils.parseJson(t);
return ko.mapping.updateFromJS(e, i, n);
}, ko.mapping.toJS = function(e, t) {
if (y || ko.mapping.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if (!(y.ignore instanceof Array)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
if (!(y.include instanceof Array)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
if (!(y.copy instanceof Array)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
return t = i(t, e[g]), ko.mapping.visitModel(e, function(e) {
return ko.utils.unwrapObservable(e);
}, t);
}, ko.mapping.toJSON = function(e, t) {
var n = ko.mapping.toJS(e, t);
return ko.utils.stringifyJson(n);
}, ko.mapping.defaultOptions = function() {
return arguments.length > 0 ? (y = arguments[0], void 0) :y;
}, ko.mapping.resetDefaultOptions = function() {
y = {
include:v.include.slice(0),
ignore:v.ignore.slice(0),
copy:v.copy.slice(0)
};
}, ko.mapping.visitModel = function(e, t, o) {
o = o || {}, o.visitedObjects = o.visitedObjects || new f(), o.parentName || (o = i(o));
var r, a = ko.utils.unwrapObservable(e);
if (!h(a)) return t(e, o.parentName);
t(e, o.parentName), r = a instanceof Array ? [] :{}, o.visitedObjects.save(e, r);
var s = o.parentName;
return d(a, function(e) {
if (!o.ignore || -1 == ko.utils.arrayIndexOf(o.ignore, e)) {
var i = a[e];
if (o.parentName = p(s, a, e), -1 !== ko.utils.arrayIndexOf(o.copy, e) || -1 !== ko.utils.arrayIndexOf(o.include, e) || !a[g] || !a[g].mappedProperties || a[g].mappedProperties[e] || a instanceof Array) {
switch (n(ko.utils.unwrapObservable(i))) {
case "object":
case "undefined":
var l = o.visitedObjects.get(i);
r[e] = "undefined" !== n(l) ? l :ko.mapping.visitModel(i, t, o);
break;

default:
r[e] = t(i, o.parentName);
}
}
}
}), r;
}, ko.exportSymbol("ko.mapping", ko.mapping), ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS), 
ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON), ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped), 
ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions), ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS), 
ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON), ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS), 
ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON), ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel);
}(), function(e) {
var t = "data-bind";
e.currentlyBindingNamespace = "", e.applyBindings = function(n, i, o) {
i && void 0 !== i.nodeType ? (o = i, i = "") :(i = i || "", o = o || window.document.body), 
e.currentlyBindingNamespace = i;
var r = i.length > 0 ? "-" + i :"", a = t + r, s = e.utils.getElementsHavingAttribute(o, a);
e.utils.arrayForEach(s, function(t) {
e.applyBindingsToNode(t, null, n, a);
}), e.currentlyBindingNamespace = "";
}, e.templateRewriting = function() {
var t = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
return {
ensureTemplateIsRewritten:function(t, n) {
n.isTemplateRewritten(t) || n.rewriteTemplate(t, function(t) {
return e.templateRewriting.memoizeBindingAttributeSyntax(t, n);
});
},
memoizeBindingAttributeSyntax:function(n, i) {
return n.replace(t, function(t) {
var n = arguments[1], o = arguments[8], r = arguments[6] ? arguments[6].slice(1) :"";
if ("" === r || r === e.currentlyBindingNamespace) {
o = e.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(o);
var a = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + o + " } })()                     })";
return i.createJavaScriptEvaluatorBlock(a) + n;
}
return t;
});
},
applyMemoizedBindingsToNextSibling:function(t) {
return e.memoization.memoize(function(n, i) {
n.nextSibling && e.applyBindingsToNode(n.nextSibling, t, i);
});
}
};
}();
}(ko), function() {
function e(t, n, i) {
if (t === n) return 0 !== t || 1 / t == 1 / n;
if (null == t || null == n) return t === n;
if (t._chain && (t = t._wrapped), n._chain && (n = n._wrapped), t.isEqual && S.isFunction(t.isEqual)) return t.isEqual(n);
if (n.isEqual && S.isFunction(n.isEqual)) return n.isEqual(t);
var o = u.call(t);
if (o != u.call(n)) return !1;
switch (o) {
case "[object String]":
return t == String(n);

case "[object Number]":
return t != +t ? n != +n :0 == t ? 1 / t == 1 / n :t == +n;

case "[object Date]":
case "[object Boolean]":
return +t == +n;

case "[object RegExp]":
return t.source == n.source && t.global == n.global && t.multiline == n.multiline && t.ignoreCase == n.ignoreCase;
}
if ("object" != typeof t || "object" != typeof n) return !1;
for (var r = i.length; r--; ) if (i[r] == t) return !0;
i.push(t);
var a = 0, s = !0;
if ("[object Array]" == o) {
if (a = t.length, s = a == n.length) for (;a-- && (s = a in t == a in n && e(t[a], n[a], i)); ) ;
} else {
if ("constructor" in t != "constructor" in n || t.constructor != n.constructor) return !1;
for (var l in t) if (S.has(t, l) && (a++, !(s = S.has(n, l) && e(t[l], n[l], i)))) break;
if (s) {
for (l in n) if (S.has(n, l) && !a--) break;
s = !a;
}
}
return i.pop(), s;
}
var t = this, n = t._, i = {}, o = Array.prototype, r = Object.prototype, a = Function.prototype, s = o.slice, l = o.unshift, u = r.toString, c = r.hasOwnProperty, d = o.forEach, h = o.map, p = o.reduce, f = o.reduceRight, g = o.filter, m = o.every, v = o.some, y = o.indexOf, b = o.lastIndexOf, _ = Array.isArray, w = Object.keys, k = a.bind, S = function(e) {
return new $(e);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = S), 
exports._ = S) :t._ = S, S.VERSION = "1.3.1";
var x = S.each = S.forEach = function(e, t, n) {
if (null != e) if (d && e.forEach === d) e.forEach(t, n); else if (e.length === +e.length) {
for (var o = 0, r = e.length; r > o; o++) if (o in e && t.call(n, e[o], o, e) === i) return;
} else for (var a in e) if (S.has(e, a) && t.call(n, e[a], a, e) === i) return;
};
S.map = S.collect = function(e, t, n) {
var i = [];
return null == e ? i :h && e.map === h ? e.map(t, n) :(x(e, function(e, o, r) {
i[i.length] = t.call(n, e, o, r);
}), e.length === +e.length && (i.length = e.length), i);
}, S.reduce = S.foldl = S.inject = function(e, t, n, i) {
var o = arguments.length > 2;
if (null == e && (e = []), p && e.reduce === p) return i && (t = S.bind(t, i)), 
o ? e.reduce(t, n) :e.reduce(t);
if (x(e, function(e, r, a) {
o ? n = t.call(i, n, e, r, a) :(n = e, o = !0);
}), !o) throw new TypeError("Reduce of empty array with no initial value");
return n;
}, S.reduceRight = S.foldr = function(e, t, n, i) {
var o = arguments.length > 2;
if (null == e && (e = []), f && e.reduceRight === f) return i && (t = S.bind(t, i)), 
o ? e.reduceRight(t, n) :e.reduceRight(t);
var r = S.toArray(e).reverse();
return i && !o && (t = S.bind(t, i)), o ? S.reduce(r, t, n, i) :S.reduce(r, t);
}, S.find = S.detect = function(e, t, n) {
var i;
return T(e, function(e, o, r) {
return t.call(n, e, o, r) ? (i = e, !0) :void 0;
}), i;
}, S.filter = S.select = function(e, t, n) {
var i = [];
return null == e ? i :g && e.filter === g ? e.filter(t, n) :(x(e, function(e, o, r) {
t.call(n, e, o, r) && (i[i.length] = e);
}), i);
}, S.reject = function(e, t, n) {
var i = [];
return null == e ? i :(x(e, function(e, o, r) {
t.call(n, e, o, r) || (i[i.length] = e);
}), i);
}, S.every = S.all = function(e, t, n) {
var o = !0;
return null == e ? o :m && e.every === m ? e.every(t, n) :(x(e, function(e, r, a) {
return (o = o && t.call(n, e, r, a)) ? void 0 :i;
}), o);
};
var T = S.some = S.any = function(e, t, n) {
t || (t = S.identity);
var o = !1;
return null == e ? o :v && e.some === v ? e.some(t, n) :(x(e, function(e, r, a) {
return o || (o = t.call(n, e, r, a)) ? i :void 0;
}), !!o);
};
S.include = S.contains = function(e, t) {
var n = !1;
return null == e ? n :y && e.indexOf === y ? -1 != e.indexOf(t) :n = T(e, function(e) {
return e === t;
});
}, S.invoke = function(e, t) {
var n = s.call(arguments, 2);
return S.map(e, function(e) {
return (S.isFunction(t) ? t || e :e[t]).apply(e, n);
});
}, S.pluck = function(e, t) {
return S.map(e, function(e) {
return e[t];
});
}, S.max = function(e, t, n) {
if (!t && S.isArray(e)) return Math.max.apply(Math, e);
if (!t && S.isEmpty(e)) return -1/0;
var i = {
computed:-1/0
};
return x(e, function(e, o, r) {
var a = t ? t.call(n, e, o, r) :e;
a >= i.computed && (i = {
value:e,
computed:a
});
}), i.value;
}, S.min = function(e, t, n) {
if (!t && S.isArray(e)) return Math.min.apply(Math, e);
if (!t && S.isEmpty(e)) return 1/0;
var i = {
computed:1/0
};
return x(e, function(e, o, r) {
var a = t ? t.call(n, e, o, r) :e;
a < i.computed && (i = {
value:e,
computed:a
});
}), i.value;
}, S.shuffle = function(e) {
var t, n = [];
return x(e, function(e, i) {
0 == i ? n[0] = e :(t = Math.floor(Math.random() * (i + 1)), n[i] = n[t], n[t] = e);
}), n;
}, S.sortBy = function(e, t, n) {
return S.pluck(S.map(e, function(e, i, o) {
return {
value:e,
criteria:t.call(n, e, i, o)
};
}).sort(function(e, t) {
var n = e.criteria, i = t.criteria;
return i > n ? -1 :n > i ? 1 :0;
}), "value");
}, S.groupBy = function(e, t) {
var n = {}, i = S.isFunction(t) ? t :function(e) {
return e[t];
};
return x(e, function(e, t) {
var o = i(e, t);
(n[o] || (n[o] = [])).push(e);
}), n;
}, S.sortedIndex = function(e, t, n) {
n || (n = S.identity);
for (var i = 0, o = e.length; o > i; ) {
var r = i + o >> 1;
n(e[r]) < n(t) ? i = r + 1 :o = r;
}
return i;
}, S.toArray = function(e) {
return e ? e.toArray ? e.toArray() :S.isArray(e) ? s.call(e) :S.isArguments(e) ? s.call(e) :S.values(e) :[];
}, S.size = function(e) {
return S.toArray(e).length;
}, S.first = S.head = function(e, t, n) {
return null == t || n ? e[0] :s.call(e, 0, t);
}, S.initial = function(e, t, n) {
return s.call(e, 0, e.length - (null == t || n ? 1 :t));
}, S.last = function(e, t, n) {
return null == t || n ? e[e.length - 1] :s.call(e, Math.max(e.length - t, 0));
}, S.rest = S.tail = function(e, t, n) {
return s.call(e, null == t || n ? 1 :t);
}, S.compact = function(e) {
return S.filter(e, function(e) {
return !!e;
});
}, S.flatten = function(e, t) {
return S.reduce(e, function(e, n) {
return S.isArray(n) ? e.concat(t ? n :S.flatten(n)) :(e[e.length] = n, e);
}, []);
}, S.without = function(e) {
return S.difference(e, s.call(arguments, 1));
}, S.uniq = S.unique = function(e, t, n) {
var i = n ? S.map(e, n) :e, o = [];
return S.reduce(i, function(n, i, r) {
return 0 != r && (t === !0 ? S.last(n) == i :S.include(n, i)) || (n[n.length] = i, 
o[o.length] = e[r]), n;
}, []), o;
}, S.union = function() {
return S.uniq(S.flatten(arguments, !0));
}, S.intersection = S.intersect = function(e) {
var t = s.call(arguments, 1);
return S.filter(S.uniq(e), function(e) {
return S.every(t, function(t) {
return S.indexOf(t, e) >= 0;
});
});
}, S.difference = function(e) {
var t = S.flatten(s.call(arguments, 1));
return S.filter(e, function(e) {
return !S.include(t, e);
});
}, S.zip = function() {
for (var e = s.call(arguments), t = S.max(S.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++) n[i] = S.pluck(e, "" + i);
return n;
}, S.indexOf = function(e, t, n) {
if (null == e) return -1;
var i, o;
if (n) return i = S.sortedIndex(e, t), e[i] === t ? i :-1;
if (y && e.indexOf === y) return e.indexOf(t);
for (i = 0, o = e.length; o > i; i++) if (i in e && e[i] === t) return i;
return -1;
}, S.lastIndexOf = function(e, t) {
if (null == e) return -1;
if (b && e.lastIndexOf === b) return e.lastIndexOf(t);
for (var n = e.length; n--; ) if (n in e && e[n] === t) return n;
return -1;
}, S.range = function(e, t, n) {
arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
for (var i = Math.max(Math.ceil((t - e) / n), 0), o = 0, r = new Array(i); i > o; ) r[o++] = e, 
e += n;
return r;
};
var C = function() {};
S.bind = function(e, t) {
var n, i;
if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
if (!S.isFunction(e)) throw new TypeError();
return i = s.call(arguments, 2), n = function() {
if (!(this instanceof n)) return e.apply(t, i.concat(s.call(arguments)));
C.prototype = e.prototype;
var o = new C(), r = e.apply(o, i.concat(s.call(arguments)));
return Object(r) === r ? r :o;
};
}, S.bindAll = function(e) {
var t = s.call(arguments, 1);
return 0 == t.length && (t = S.functions(e)), x(t, function(t) {
e[t] = S.bind(e[t], e);
}), e;
}, S.memoize = function(e, t) {
var n = {};
return t || (t = S.identity), function() {
var i = t.apply(this, arguments);
return S.has(n, i) ? n[i] :n[i] = e.apply(this, arguments);
};
}, S.delay = function(e, t) {
var n = s.call(arguments, 2);
return setTimeout(function() {
return e.apply(e, n);
}, t);
}, S.defer = function(e) {
return S.delay.apply(S, [ e, 1 ].concat(s.call(arguments, 1)));
}, S.throttle = function(e, t) {
var n, i, o, r, a, s = S.debounce(function() {
a = r = !1;
}, t);
return function() {
n = this, i = arguments;
var l = function() {
o = null, a && e.apply(n, i), s();
};
o || (o = setTimeout(l, t)), r ? a = !0 :e.apply(n, i), s(), r = !0;
};
}, S.debounce = function(e, t) {
var n;
return function() {
var i = this, o = arguments, r = function() {
n = null, e.apply(i, o);
};
clearTimeout(n), n = setTimeout(r, t);
};
}, S.once = function(e) {
var t, n = !1;
return function() {
return n ? t :(n = !0, t = e.apply(this, arguments));
};
}, S.wrap = function(e, t) {
return function() {
var n = [ e ].concat(s.call(arguments, 0));
return t.apply(this, n);
};
}, S.compose = function() {
var e = arguments;
return function() {
for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
return t[0];
};
}, S.after = function(e, t) {
return 0 >= e ? t() :function() {
return --e < 1 ? t.apply(this, arguments) :void 0;
};
}, S.keys = w || function(e) {
if (e !== Object(e)) throw new TypeError("Invalid object");
var t = [];
for (var n in e) S.has(e, n) && (t[t.length] = n);
return t;
}, S.values = function(e) {
return S.map(e, S.identity);
}, S.functions = S.methods = function(e) {
var t = [];
for (var n in e) S.isFunction(e[n]) && t.push(n);
return t.sort();
}, S.extend = function(e) {
return x(s.call(arguments, 1), function(t) {
for (var n in t) e[n] = t[n];
}), e;
}, S.defaults = function(e) {
return x(s.call(arguments, 1), function(t) {
for (var n in t) null == e[n] && (e[n] = t[n]);
}), e;
}, S.clone = function(e) {
return S.isObject(e) ? S.isArray(e) ? e.slice() :S.extend({}, e) :e;
}, S.tap = function(e, t) {
return t(e), e;
}, S.isEqual = function(t, n) {
return e(t, n, []);
}, S.isEmpty = function(e) {
if (S.isArray(e) || S.isString(e)) return 0 === e.length;
for (var t in e) if (S.has(e, t)) return !1;
return !0;
}, S.isElement = function(e) {
return !(!e || 1 != e.nodeType);
}, S.isArray = _ || function(e) {
return "[object Array]" == u.call(e);
}, S.isObject = function(e) {
return e === Object(e);
}, S.isArguments = function(e) {
return "[object Arguments]" == u.call(e);
}, S.isArguments(arguments) || (S.isArguments = function(e) {
return !(!e || !S.has(e, "callee"));
}), S.isFunction = function(e) {
return "[object Function]" == u.call(e);
}, S.isString = function(e) {
return "[object String]" == u.call(e);
}, S.isNumber = function(e) {
return "[object Number]" == u.call(e);
}, S.isNaN = function(e) {
return e !== e;
}, S.isBoolean = function(e) {
return e === !0 || e === !1 || "[object Boolean]" == u.call(e);
}, S.isDate = function(e) {
return "[object Date]" == u.call(e);
}, S.isRegExp = function(e) {
return "[object RegExp]" == u.call(e);
}, S.isNull = function(e) {
return null === e;
}, S.isUndefined = function(e) {
return void 0 === e;
}, S.has = function(e, t) {
return c.call(e, t);
}, S.noConflict = function() {
return t._ = n, this;
}, S.identity = function(e) {
return e;
}, S.times = function(e, t, n) {
for (var i = 0; e > i; i++) t.call(n, i);
}, S.escape = function(e) {
return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, S.mixin = function(e) {
x(S.functions(e), function(t) {
I(t, S[t] = e[t]);
});
};
var E = 0;
S.uniqueId = function(e) {
var t = E++;
return e ? e + t :t;
}, S.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var M = /.^/, D = function(e) {
return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
S.template = function(e, t) {
var n = S.templateSettings, i = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || M, function(e, t) {
return "',_.escape(" + D(t) + "),'";
}).replace(n.interpolate || M, function(e, t) {
return "'," + D(t) + ",'";
}).replace(n.evaluate || M, function(e, t) {
return "');" + D(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", o = new Function("obj", "_", i);
return t ? o(t, S) :function(e) {
return o.call(this, e, S);
};
}, S.chain = function(e) {
return S(e).chain();
};
var $ = function(e) {
this._wrapped = e;
};
S.prototype = $.prototype;
var L = function(e, t) {
return t ? S(e).chain() :e;
}, I = function(e, t) {
$.prototype[e] = function() {
var e = s.call(arguments);
return l.call(e, this._wrapped), L(t.apply(S, e), this._chain);
};
};
S.mixin(S), x([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
var t = o[e];
$.prototype[e] = function() {
var n = this._wrapped;
t.apply(n, arguments);
var i = n.length;
return "shift" != e && "splice" != e || 0 !== i || delete n[0], L(n, this._chain);
};
}), x([ "concat", "join", "slice" ], function(e) {
var t = o[e];
$.prototype[e] = function() {
return L(t.apply(this._wrapped, arguments), this._chain);
};
}), $.prototype.chain = function() {
return this._chain = !0, this;
}, $.prototype.value = function() {
return this._wrapped;
};
}.call(this), /*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
function(e, t, n, i) {
"use strict";
var o = n("html"), r = n(e), a = n(t), s = n.fancybox = function() {
s.open.apply(this, arguments);
}, l = navigator.userAgent.match(/msie/i), u = null, c = t.createTouch !== i, d = function(e) {
return e && e.hasOwnProperty && e instanceof n;
}, h = function(e) {
return e && "string" === n.type(e);
}, p = function(e) {
return h(e) && e.indexOf("%") > 0;
}, f = function(e) {
return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight);
}, g = function(e, t) {
var n = parseInt(e, 10) || 0;
return t && p(e) && (n = s.getViewport()[t] / 100 * n), Math.ceil(n);
}, m = function(e, t) {
return g(e, t) + "px";
};
n.extend(s, {
version:"2.1.5",
defaults:{
padding:15,
margin:20,
width:800,
height:600,
minWidth:100,
minHeight:100,
maxWidth:9999,
maxHeight:9999,
pixelRatio:1,
autoSize:!0,
autoHeight:!1,
autoWidth:!1,
autoResize:!0,
autoCenter:!c,
fitToView:!0,
aspectRatio:!1,
topRatio:.5,
leftRatio:.5,
scrolling:"auto",
wrapCSS:"",
arrows:!0,
closeBtn:!0,
closeClick:!1,
nextClick:!1,
mouseWheel:!0,
autoPlay:!1,
playSpeed:3e3,
preload:3,
modal:!1,
loop:!0,
ajax:{
dataType:"html",
headers:{
"X-fancyBox":!0
}
},
iframe:{
scrolling:"auto",
preload:!0
},
swf:{
wmode:"transparent",
allowfullscreen:"true",
allowscriptaccess:"always"
},
keys:{
next:{
13:"left",
34:"up",
39:"left",
40:"up"
},
prev:{
8:"right",
33:"down",
37:"right",
38:"down"
},
close:[ 27 ],
play:[ 32 ],
toggle:[ 70 ]
},
direction:{
next:"left",
prev:"right"
},
scrollOutside:!0,
index:0,
type:null,
href:null,
content:null,
title:null,
tpl:{
wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
image:'<img class="fancybox-image" src="{href}" alt="" />',
iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' :"") + "></iframe>",
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
},
openEffect:"fade",
openSpeed:250,
openEasing:"swing",
openOpacity:!0,
openMethod:"zoomIn",
closeEffect:"fade",
closeSpeed:250,
closeEasing:"swing",
closeOpacity:!0,
closeMethod:"zoomOut",
nextEffect:"elastic",
nextSpeed:250,
nextEasing:"swing",
nextMethod:"changeIn",
prevEffect:"elastic",
prevSpeed:250,
prevEasing:"swing",
prevMethod:"changeOut",
helpers:{
overlay:!0,
title:!0
},
onCancel:n.noop,
beforeLoad:n.noop,
afterLoad:n.noop,
beforeShow:n.noop,
afterShow:n.noop,
beforeChange:n.noop,
beforeClose:n.noop,
afterClose:n.noop
},
group:{},
opts:{},
previous:null,
coming:null,
current:null,
isActive:!1,
isOpen:!1,
isOpened:!1,
wrap:null,
skin:null,
outer:null,
inner:null,
player:{
timer:null,
isActive:!1
},
ajaxLoad:null,
imgPreload:null,
transitions:{},
helpers:{},
open:function(e, t) {
return e && (n.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (n.isArray(e) || (e = d(e) ? n(e).get() :[ e ]), 
n.each(e, function(o, r) {
var a, l, u, c, p, f, g, m = {};
"object" === n.type(r) && (r.nodeType && (r = n(r)), d(r) ? (m = {
href:r.data("fancybox-href") || r.attr("href"),
title:r.data("fancybox-title") || r.attr("title"),
isDom:!0,
element:r
}, n.metadata && n.extend(!0, m, r.metadata())) :m = r), a = t.href || m.href || (h(r) ? r :null), 
l = t.title !== i ? t.title :m.title || "", u = t.content || m.content, c = u ? "html" :t.type || m.type, 
!c && m.isDom && (c = r.data("fancybox-type"), c || (p = r.prop("class").match(/fancybox\.(\w+)/), 
c = p ? p[1] :null)), h(a) && (c || (s.isImage(a) ? c = "image" :s.isSWF(a) ? c = "swf" :"#" === a.charAt(0) ? c = "inline" :h(r) && (c = "html", 
u = r)), "ajax" === c && (f = a.split(/\s+/, 2), a = f.shift(), g = f.shift())), 
u || ("inline" === c ? a ? u = n(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") :a) :m.isDom && (u = r) :"html" === c ? u = a :c || a || !m.isDom || (c = "inline", 
u = r)), n.extend(m, {
href:a,
type:c,
content:u,
title:l,
selector:g
}), e[o] = m;
}), s.opts = n.extend(!0, {}, s.defaults, t), t.keys !== i && (s.opts.keys = t.keys ? n.extend({}, s.defaults.keys, t.keys) :!1), 
s.group = e, s._start(s.opts.index)) :void 0;
},
cancel:function() {
var e = s.coming;
e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), 
s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), 
e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e));
},
close:function(e) {
s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1, 
s.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), 
s.transitions[s.current.closeMethod]()) :(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), 
s._afterZoomOut())));
},
play:function(e) {
var t = function() {
clearTimeout(s.player.timer);
}, n = function() {
t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
}, i = function() {
t(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
}, o = function() {
s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, 
a.bind({
"onCancel.player beforeClose.player":i,
"onUpdate.player":n,
"beforeLoad.player":t
}), n(), s.trigger("onPlayStart"));
};
e === !0 || !s.player.isActive && e !== !1 ? o() :i();
},
next:function(e) {
var t = s.current;
t && (h(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
},
prev:function(e) {
var t = s.current;
t && (h(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
},
jumpto:function(e, t, n) {
var o = s.current;
o && (e = g(e), s.direction = t || o.direction[e >= o.index ? "next" :"prev"], s.router = n || "jumpto", 
o.loop && (0 > e && (e = o.group.length + e % o.group.length), e %= o.group.length), 
o.group[e] !== i && (s.cancel(), s._start(e)));
},
reposition:function(e, t) {
var i, o = s.current, r = o ? o.wrap :null;
r && (i = s._getPosition(t), e && "scroll" === e.type ? (delete i.position, r.stop(!0, !0).animate(i, 200)) :(r.css(i), 
o.pos = n.extend({}, o.dim, i)));
},
update:function(e) {
var t = e && e.type, n = !t || "orientationchange" === t;
n && (clearTimeout(u), u = null), s.isOpen && !u && (u = setTimeout(function() {
var i = s.current;
i && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && i.autoResize) && s._setDimension(), 
"scroll" === t && i.canShrink || s.reposition(e), s.trigger("onUpdate"), u = null);
}, n && !c ? 0 :300));
},
toggle:function(e) {
s.isOpen && (s.current.fitToView = "boolean" === n.type(e) ? e :!s.current.fitToView, 
c && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), 
s.update());
},
hideLoading:function() {
a.unbind(".loading"), n("#fancybox-loading").remove();
},
showLoading:function() {
var e, t;
s.hideLoading(), e = n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), 
a.bind("keydown.loading", function(e) {
27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
}), s.defaults.fixed || (t = s.getViewport(), e.css({
position:"absolute",
top:.5 * t.h + t.y,
left:.5 * t.w + t.x
}));
},
getViewport:function() {
var t = s.current && s.current.locked || !1, n = {
x:r.scrollLeft(),
y:r.scrollTop()
};
return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) :(n.w = c && e.innerWidth ? e.innerWidth :r.width(), 
n.h = c && e.innerHeight ? e.innerHeight :r.height()), n;
},
unbindEvents:function() {
s.wrap && d(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), r.unbind(".fb");
},
bindEvents:function() {
var e, t = s.current;
t && (r.bind("orientationchange.fb" + (c ? "" :" resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" :""), s.update), 
e = t.keys, e && a.bind("keydown.fb", function(o) {
var r = o.which || o.keyCode, a = o.target || o.srcElement;
return 27 === r && s.coming ? !1 :(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || a && (a.type || n(a).is("[contenteditable]")) || n.each(e, function(e, a) {
return t.group.length > 1 && a[r] !== i ? (s[e](a[r]), o.preventDefault(), !1) :n.inArray(r, a) > -1 ? (s[e](), 
o.preventDefault(), !1) :void 0;
}), void 0);
}), n.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function(e, i, o, r) {
for (var a = e.target || null, l = n(a), u = !1; l.length && !(u || l.is(".fancybox-skin") || l.is(".fancybox-wrap")); ) u = f(l[0]), 
l = n(l).parent();
0 === i || u || s.group.length > 1 && !t.canShrink && (r > 0 || o > 0 ? s.prev(r > 0 ? "down" :"left") :(0 > r || 0 > o) && s.next(0 > r ? "up" :"right"), 
e.preventDefault());
}));
},
trigger:function(e, t) {
var i, o = t || s.coming || s.current;
if (o) {
if (n.isFunction(o[e]) && (i = o[e].apply(o, Array.prototype.slice.call(arguments, 1))), 
i === !1) return !1;
o.helpers && n.each(o.helpers, function(t, i) {
i && s.helpers[t] && n.isFunction(s.helpers[t][e]) && s.helpers[t][e](n.extend(!0, {}, s.helpers[t].defaults, i), o);
}), a.trigger(e);
}
},
isImage:function(e) {
return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
},
isSWF:function(e) {
return h(e) && e.match(/\.(swf)((\?|#).*)?$/i);
},
_start:function(e) {
var t, i, o, r, a, l = {};
if (e = g(e), t = s.group[e] || null, !t) return !1;
if (l = n.extend(!0, {}, s.opts, t), r = l.margin, a = l.padding, "number" === n.type(r) && (l.margin = [ r, r, r, r ]), 
"number" === n.type(a) && (l.padding = [ a, a, a, a ]), l.modal && n.extend(!0, l, {
closeBtn:!1,
closeClick:!1,
nextClick:!1,
arrows:!1,
mouseWheel:!1,
keys:null,
helpers:{
overlay:{
closeClick:!1
}
}
}), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), 
"auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, 
!1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
if (o = l.type, i = l.href, !o) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e, 
s[s.router](s.direction)) :!1;
if (s.isActive = !0, ("image" === o || "swf" === o) && (l.autoHeight = l.autoWidth = !1, 
l.scrolling = "visible"), "image" === o && (l.aspectRatio = !0), "iframe" === o && c && (l.scrolling = "scroll"), 
l.wrap = n(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" :"desktop") + " fancybox-type-" + o + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), 
n.extend(l, {
skin:n(".fancybox-skin", l.wrap),
outer:n(".fancybox-outer", l.wrap),
inner:n(".fancybox-inner", l.wrap)
}), n.each([ "Top", "Right", "Bottom", "Left" ], function(e, t) {
l.skin.css("padding" + t, m(l.padding[e]));
}), s.trigger("onReady"), "inline" === o || "html" === o) {
if (!l.content || !l.content.length) return s._error("content");
} else if (!i) return s._error("href");
"image" === o ? s._loadImage() :"ajax" === o ? s._loadAjax() :"iframe" === o ? s._loadIframe() :s._afterLoad();
},
_error:function(e) {
n.extend(s.coming, {
type:"html",
autoWidth:!0,
autoHeight:!0,
minWidth:0,
minHeight:0,
scrolling:"no",
hasError:e,
content:s.coming.tpl.error
}), s._afterLoad();
},
_loadImage:function() {
var e = s.imgPreload = new Image();
e.onload = function() {
this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, 
s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
}, e.onerror = function() {
this.onload = this.onerror = null, s._error("image");
}, e.src = s.coming.href, e.complete !== !0 && s.showLoading();
},
_loadAjax:function() {
var e = s.coming;
s.showLoading(), s.ajaxLoad = n.ajax(n.extend({}, e.ajax, {
url:e.href,
error:function(e, t) {
s.coming && "abort" !== t ? s._error("ajax", e) :s.hideLoading();
},
success:function(t, n) {
"success" === n && (e.content = t, s._afterLoad());
}
}));
},
_loadIframe:function() {
var e = s.coming, t = n(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", c ? "auto" :e.iframe.scrolling).attr("src", e.href);
n(e.wrap).bind("onReset", function() {
try {
n(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
} catch (e) {}
}), e.iframe.preload && (s.showLoading(), t.one("load", function() {
n(this).data("ready", 1), c || n(this).bind("load.fb", s.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), 
s._afterLoad();
})), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad();
},
_preloadImages:function() {
var e, t, n = s.group, i = s.current, o = n.length, r = i.preload ? Math.min(i.preload, o - 1) :0;
for (t = 1; r >= t; t += 1) e = n[(i.index + t) % o], "image" === e.type && e.href && (new Image().src = e.href);
},
_afterLoad:function() {
var e, t, i, o, r, a, l = s.coming, u = s.current, c = "fancybox-placeholder";
if (s.hideLoading(), l && s.isActive !== !1) {
if (!1 === s.trigger("afterLoad", l, u)) return l.wrap.stop(!0).trigger("onReset").remove(), 
s.coming = null, void 0;
switch (u && (s.trigger("beforeChange", u), u.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), 
s.unbindEvents(), e = l, t = l.content, i = l.type, o = l.scrolling, n.extend(s, {
wrap:e.wrap,
skin:e.skin,
outer:e.outer,
inner:e.inner,
current:e,
previous:u
}), r = e.href, i) {
case "inline":
case "ajax":
case "html":
e.selector ? t = n("<div>").html(t).find(e.selector) :d(t) && (t.data(c) || t.data(c, n('<div class="' + c + '"></div>').insertAfter(t).hide()), 
t = t.show().detach(), e.wrap.bind("onReset", function() {
n(this).find(t).length && t.hide().replaceAll(t.data(c)).data(c, !1);
}));
break;

case "image":
t = e.tpl.image.replace("{href}", r);
break;

case "swf":
t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>', 
a = "", n.each(e.swf, function(e, n) {
t += '<param name="' + e + '" value="' + n + '"></param>', a += " " + e + '="' + n + '"';
}), t += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
}
d(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === o ? "scroll" :"no" === o ? "hidden" :o), 
s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), 
s.isOpened ? u.prevMethod && s.transitions[u.prevMethod]() :n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), 
s.transitions[s.isOpened ? e.nextMethod :e.openMethod](), s._preloadImages();
}
},
_setDimension:function() {
var e, t, i, o, r, a, l, u, c, d, h, f, v, y, b, _ = s.getViewport(), w = 0, k = !1, S = !1, x = s.wrap, T = s.skin, C = s.inner, E = s.current, M = E.width, D = E.height, $ = E.minWidth, L = E.minHeight, I = E.maxWidth, A = E.maxHeight, B = E.scrolling, O = E.scrollOutside ? E.scrollbarWidth :0, N = E.margin, F = g(N[1] + N[3]), P = g(N[0] + N[2]);
if (x.add(T).add(C).width("auto").height("auto").removeClass("fancybox-tmp"), e = g(T.outerWidth(!0) - T.width()), 
t = g(T.outerHeight(!0) - T.height()), i = F + e, o = P + t, r = p(M) ? (_.w - i) * g(M) / 100 :M, 
a = p(D) ? (_.h - o) * g(D) / 100 :D, "iframe" === E.type) {
if (y = E.content, E.autoHeight && 1 === y.data("ready")) try {
y[0].contentWindow.document.location && (C.width(r).height(9999), b = y.contents().find("body"), 
O && b.css("overflow-x", "hidden"), a = b.outerHeight(!0));
} catch (H) {}
} else (E.autoWidth || E.autoHeight) && (C.addClass("fancybox-tmp"), E.autoWidth || C.width(r), 
E.autoHeight || C.height(a), E.autoWidth && (r = C.width()), E.autoHeight && (a = C.height()), 
C.removeClass("fancybox-tmp"));
if (M = g(r), D = g(a), c = r / a, $ = g(p($) ? g($, "w") - i :$), I = g(p(I) ? g(I, "w") - i :I), 
L = g(p(L) ? g(L, "h") - o :L), A = g(p(A) ? g(A, "h") - o :A), l = I, u = A, E.fitToView && (I = Math.min(_.w - i, I), 
A = Math.min(_.h - o, A)), f = _.w - F, v = _.h - P, E.aspectRatio ? (M > I && (M = I, 
D = g(M / c)), D > A && (D = A, M = g(D * c)), $ > M && (M = $, D = g(M / c)), L > D && (D = L, 
M = g(D * c))) :(M = Math.max($, Math.min(M, I)), E.autoHeight && "iframe" !== E.type && (C.width(M), 
D = C.height()), D = Math.max(L, Math.min(D, A))), E.fitToView) if (C.width(M).height(D), 
x.width(M + e), d = x.width(), h = x.height(), E.aspectRatio) for (;(d > f || h > v) && M > $ && D > L && !(w++ > 19); ) D = Math.max(L, Math.min(A, D - 10)), 
M = g(D * c), $ > M && (M = $, D = g(M / c)), M > I && (M = I, D = g(M / c)), C.width(M).height(D), 
x.width(M + e), d = x.width(), h = x.height(); else M = Math.max($, Math.min(M, M - (d - f))), 
D = Math.max(L, Math.min(D, D - (h - v)));
O && "auto" === B && a > D && f > M + e + O && (M += O), C.width(M).height(D), x.width(M + e), 
d = x.width(), h = x.height(), k = (d > f || h > v) && M > $ && D > L, S = E.aspectRatio ? l > M && u > D && r > M && a > D :(l > M || u > D) && (r > M || a > D), 
n.extend(E, {
dim:{
width:m(d),
height:m(h)
},
origWidth:r,
origHeight:a,
canShrink:k,
canExpand:S,
wPadding:e,
hPadding:t,
wrapSpace:h - T.outerHeight(!0),
skinSpace:T.height() - D
}), !y && E.autoHeight && D > L && A > D && !S && C.height("auto");
},
_getPosition:function(e) {
var t = s.current, n = s.getViewport(), i = t.margin, o = s.wrap.width() + i[1] + i[3], r = s.wrap.height() + i[0] + i[2], a = {
position:"absolute",
top:i[0],
left:i[3]
};
return t.autoCenter && t.fixed && !e && r <= n.h && o <= n.w ? a.position = "fixed" :t.locked || (a.top += n.y, 
a.left += n.x), a.top = m(Math.max(a.top, a.top + (n.h - r) * t.topRatio)), a.left = m(Math.max(a.left, a.left + (n.w - o) * t.leftRatio)), 
a;
},
_afterZoomIn:function() {
var e = s.current;
e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), 
s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(t) {
n(t.target).is("a") || n(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" :"next"]());
}), e.closeBtn && n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e) {
e.preventDefault(), s.close();
}), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), 
(e.loop || e.index < s.group.length - 1) && n(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), 
s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, 
s.play()) :s.play(!1));
},
_afterZoomOut:function(e) {
e = e || s.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(s, {
group:{},
opts:{},
router:!1,
current:null,
isActive:!1,
isOpened:!1,
isOpen:!1,
isClosing:!1,
wrap:null,
skin:null,
outer:null,
inner:null
}), s.trigger("afterClose", e);
}
}), s.transitions = {
getOrigPosition:function() {
var e = s.current, t = e.element, n = e.orig, i = {}, o = 50, r = 50, a = e.hPadding, l = e.wPadding, u = s.getViewport();
return !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)), 
d(n) ? (i = n.offset(), n.is("img") && (o = n.outerWidth(), r = n.outerHeight())) :(i.top = u.y + (u.h - r) * e.topRatio, 
i.left = u.x + (u.w - o) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (i.top -= u.y, 
i.left -= u.x), i = {
top:m(i.top - a * e.topRatio),
left:m(i.left - l * e.leftRatio),
width:m(o + l),
height:m(r + a)
};
},
step:function(e, t) {
var n, i, o, r = t.prop, a = s.current, l = a.wrapSpace, u = a.skinSpace;
("width" === r || "height" === r) && (n = t.end === t.start ? 1 :(e - t.start) / (t.end - t.start), 
s.isClosing && (n = 1 - n), i = "width" === r ? a.wPadding :a.hPadding, o = e - i, 
s.skin[r](g("width" === r ? o :o - l * n)), s.inner[r](g("width" === r ? o :o - l * n - u * n)));
},
zoomIn:function() {
var e = s.current, t = e.pos, i = e.openEffect, o = "elastic" === i, r = n.extend({
opacity:1
}, t);
delete r.position, o ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) :"fade" === i && (t.opacity = .1), 
s.wrap.css(t).animate(r, {
duration:"none" === i ? 0 :e.openSpeed,
easing:e.openEasing,
step:o ? this.step :null,
complete:s._afterZoomIn
});
},
zoomOut:function() {
var e = s.current, t = e.closeEffect, n = "elastic" === t, i = {
opacity:.1
};
n && (i = this.getOrigPosition(), e.closeOpacity && (i.opacity = .1)), s.wrap.animate(i, {
duration:"none" === t ? 0 :e.closeSpeed,
easing:e.closeEasing,
step:n ? this.step :null,
complete:s._afterZoomOut
});
},
changeIn:function() {
var e, t = s.current, n = t.nextEffect, i = t.pos, o = {
opacity:1
}, r = s.direction, a = 200;
i.opacity = .1, "elastic" === n && (e = "down" === r || "up" === r ? "top" :"left", 
"down" === r || "right" === r ? (i[e] = m(g(i[e]) - a), o[e] = "+=" + a + "px") :(i[e] = m(g(i[e]) + a), 
o[e] = "-=" + a + "px")), "none" === n ? s._afterZoomIn() :s.wrap.css(i).animate(o, {
duration:t.nextSpeed,
easing:t.nextEasing,
complete:s._afterZoomIn
});
},
changeOut:function() {
var e = s.previous, t = e.prevEffect, i = {
opacity:.1
}, o = s.direction, r = 200;
"elastic" === t && (i["down" === o || "up" === o ? "top" :"left"] = ("up" === o || "left" === o ? "-" :"+") + "=" + r + "px"), 
e.wrap.animate(i, {
duration:"none" === t ? 0 :e.prevSpeed,
easing:e.prevEasing,
complete:function() {
n(this).trigger("onReset").remove();
}
});
}
}, s.helpers.overlay = {
defaults:{
closeClick:!0,
speedOut:200,
showEarly:!0,
css:{},
locked:!c,
fixed:!0
},
overlay:null,
fixed:!1,
el:n("html"),
create:function(e) {
e = n.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent :e.parent), 
this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), 
this.fixed = !0);
},
open:function(e) {
var t = this;
e = n.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") :this.create(e), 
this.fixed || (r.bind("resize.overlay", n.proxy(this.update, this)), this.update()), 
e.closeClick && this.overlay.bind("click.overlay", function(e) {
return n(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() :t.close(), 
!1) :void 0;
}), this.overlay.css(e.css).show();
},
close:function() {
var e, t;
r.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"), 
e = r.scrollTop(), t = r.scrollLeft(), this.el.removeClass("fancybox-lock"), r.scrollTop(e).scrollLeft(t)), 
n(".fancybox-overlay").remove().hide(), n.extend(this, {
overlay:null,
fixed:!1
});
},
update:function() {
var e, n = "100%";
this.overlay.width(n).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), 
a.width() > e && (n = a.width())) :a.width() > r.width() && (n = a.width()), this.overlay.width(n).height(a.height());
},
onReady:function(e, t) {
var i = this.overlay;
n(".fancybox-overlay").stop(!0, !0), i || this.create(e), e.locked && this.fixed && t.fixed && (i || (this.margin = a.height() > r.height() ? n("html").css("margin-right").replace("px", "") :!1), 
t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments);
},
beforeShow:function(e, t) {
var i, o;
t.locked && (this.margin !== !1 && (n("*").filter(function() {
return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap");
}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), i = r.scrollTop(), 
o = r.scrollLeft(), this.el.addClass("fancybox-lock"), r.scrollTop(i).scrollLeft(o)), 
this.open(e);
},
onUpdate:function() {
this.fixed || this.update();
},
afterClose:function(e) {
this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this));
}
}, s.helpers.title = {
defaults:{
type:"float",
position:"bottom"
},
beforeShow:function(e) {
var t, i, o = s.current, r = o.title, a = e.type;
if (n.isFunction(r) && (r = r.call(o.element, o)), h(r) && "" !== n.trim(r)) {
switch (t = n('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + r + "</div>"), 
a) {
case "inside":
i = s.skin;
break;

case "outside":
i = s.wrap;
break;

case "over":
i = s.inner;
break;

default:
i = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), 
s.current.margin[2] += Math.abs(g(t.css("margin-bottom")));
}
t["top" === e.position ? "prependTo" :"appendTo"](i);
}
}
}, n.fn.fancybox = function(e) {
var t, i = n(this), o = this.selector || "", r = function(r) {
var a, l, u = n(this).blur(), c = t;
r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || u.is(".fancybox-wrap") || (a = e.groupAttr || "data-fancybox-group", 
l = u.attr(a), l || (a = "rel", l = u.get(0)[a]), l && "" !== l && "nofollow" !== l && (u = o.length ? n(o) :i, 
u = u.filter("[" + a + '="' + l + '"]'), c = u.index(this)), e.index = c, s.open(u, e) !== !1 && r.preventDefault());
};
return e = e || {}, t = e.index || 0, o && e.live !== !1 ? a.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", r) :i.unbind("click.fb-start").bind("click.fb-start", r), 
this.filter("[data-fancybox-start=1]").trigger("click"), this;
}, a.ready(function() {
var t, r;
n.scrollbarWidth === i && (n.scrollbarWidth = function() {
var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), t = e.children(), i = t.innerWidth() - t.height(99).innerWidth();
return e.remove(), i;
}), n.support.fixedPosition === i && (n.support.fixedPosition = function() {
var e = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"), t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
return e.remove(), t;
}()), n.extend(s.defaults, {
scrollbarWidth:n.scrollbarWidth(),
fixed:n.support.fixedPosition,
parent:n("body")
}), t = n(e).width(), o.addClass("fancybox-lock-test"), r = n(e).width(), o.removeClass("fancybox-lock-test"), 
n("<style type='text/css'>.fancybox-margin{margin-right:" + (r - t) + "px;}</style>").appendTo("head");
});
}(window, document, jQuery), function(e) {
var t = e.fancybox;
t.helpers.buttons = {
defaults:{
skipSingle:!1,
position:"top",
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
},
list:null,
buttons:null,
beforeLoad:function(e, t) {
return e.skipSingle && t.group.length < 2 ? (t.helpers.buttons = !1, t.closeBtn = !0, 
void 0) :(t.margin["bottom" === e.position ? 2 :0] += 30, void 0);
},
onPlayStart:function() {
this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
},
onPlayEnd:function() {
this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
},
afterShow:function(n, i) {
var o = this.buttons;
o || (this.list = e(n.tpl).addClass(n.position).appendTo("body"), o = {
prev:this.list.find(".btnPrev").click(t.prev),
next:this.list.find(".btnNext").click(t.next),
play:this.list.find(".btnPlay").click(t.play),
toggle:this.list.find(".btnToggle").click(t.toggle),
close:this.list.find(".btnClose").click(t.close)
}), i.index > 0 || i.loop ? o.prev.removeClass("btnDisabled") :o.prev.addClass("btnDisabled"), 
i.loop || i.index < i.group.length - 1 ? (o.next.removeClass("btnDisabled"), o.play.removeClass("btnDisabled")) :(o.next.addClass("btnDisabled"), 
o.play.addClass("btnDisabled")), this.buttons = o, this.onUpdate(n, i);
},
onUpdate:function(e, t) {
var n;
this.buttons && (n = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), 
t.canShrink ? n.addClass("btnToggleOn") :t.canExpand || n.addClass("btnDisabled"));
},
beforeClose:function() {
this.list && this.list.remove(), this.list = null, this.buttons = null;
}
};
}(jQuery), function(e) {
var t = e.fancybox;
t.helpers.thumbs = {
defaults:{
width:50,
height:50,
position:"bottom",
source:function(t) {
var n;
return t.element && (n = e(t.element).find("img").attr("src")), !n && "image" === t.type && t.href && (n = t.href), 
n;
}
},
wrap:null,
list:null,
width:0,
init:function(t, n) {
var i, o = this, r = t.width, a = t.height, s = t.source;
i = "";
for (var l = 0; l < n.group.length; l++) i += '<li><a style="width:' + r + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"), 
this.list = e("<ul>" + i + "</ul>").appendTo(this.wrap), e.each(n.group, function(t) {
var i = s(n.group[t]);
i && e("<img />").load(function() {
var n, i, s, l = this.width, u = this.height;
o.list && l && u && (n = l / r, i = u / a, s = o.list.children().eq(t).find("a"), 
n >= 1 && i >= 1 && (n > i ? (l = Math.floor(l / i), u = a) :(l = r, u = Math.floor(u / n))), 
e(this).css({
width:l,
height:u,
top:Math.floor(a / 2 - u / 2),
left:Math.floor(r / 2 - l / 2)
}), s.width(r).height(a), e(this).hide().appendTo(s).fadeIn(300));
}).attr("src", i);
}), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (n.group.length + 1)).css("left", Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width)));
},
beforeLoad:function(e, t) {
return t.group.length < 2 ? (t.helpers.thumbs = !1, void 0) :(t.margin["top" === e.position ? 0 :2] += e.height + 15, 
void 0);
},
afterShow:function(e, t) {
this.list ? this.onUpdate(e, t) :this.init(e, t), this.list.children().removeClass("active").eq(t.index).addClass("active");
},
onUpdate:function(t, n) {
this.list && this.list.stop(!0).animate({
left:Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width))
}, 150);
},
beforeClose:function() {
this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
}
};
}(jQuery), function(e) {
"use strict";
var t = e.fancybox, n = function(t, n, i) {
return i = i || "", "object" === e.type(i) && (i = e.param(i, !0)), e.each(n, function(e, n) {
t = t.replace("$" + e, n || "");
}), i.length && (t += (t.indexOf("?") > 0 ? "&" :"?") + i), t;
};
t.helpers.media = {
defaults:{
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"opaque",
enablejsapi:1
},
type:"iframe",
url:"//www.youtube.com/embed/$3"
},
vimeo:{
matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1
},
type:"iframe",
url:"//player.vimeo.com/video/$1"
},
metacafe:{
matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
params:{
autoPlay:"yes"
},
type:"swf",
url:function(t, n, i) {
return i.swf.flashVars = "playerVars=" + e.param(n, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf";
}
},
dailymotion:{
matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,
params:{
additionalInfos:0,
autoStart:1
},
type:"swf",
url:"//www.dailymotion.com/swf/video/$1"
},
twitvid:{
matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
params:{
autoplay:0
},
type:"iframe",
url:"//www.twitvid.com/embed.php?guid=$1"
},
twitpic:{
matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
type:"image",
url:"//twitpic.com/show/full/$1/"
},
instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"
},
google_maps:{
matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",
url:function(e) {
return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" :"embed");
}
}
},
beforeLoad:function(t, i) {
var o, r, a, s, l = i.href || "", u = !1;
for (o in t) if (t.hasOwnProperty(o) && (r = t[o], a = l.match(r.matcher))) {
u = r.type, s = e.extend(!0, {}, r.params, i[o] || (e.isPlainObject(t[o]) ? t[o].params :null)), 
l = "function" === e.type(r.url) ? r.url.call(this, a, s, i) :n(r.url, a, s);
break;
}
u && (i.href = l, i.type = u, i.autoHeight = !1);
}
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var e, t, n, i, o = [].slice, r = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, a = {}.hasOwnProperty, s = function(e, t) {
function n() {
this.constructor = e;
}
for (var i in t) a.call(t, i) && (e[i] = t[i]);
return n.prototype = t.prototype, e.prototype = new n(), e.__super__ = t.prototype, 
e;
}, l = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
String.prototype.toSlug = function() {
var e;
return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "), 
e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "), 
e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $B.trackingAlias = function(e) {
var t;
return t = !!$.cookie("__strk_aliased"), 1 !== $S.user_meta.sign_in_count || t ? void 0 :(analytics.alias(e), 
$.cookie("__strk_aliased", "1", {
expires:30,
path:"/"
}));
}, $B.store = {
enabled:!0,
set:function(e, t, n) {
var i;
if (null != window.store && this.enabled) return i = {
val:t
}, n && (i.exp = n, i.time = new Date().getTime()), window.store.set(e, i);
},
setHours:function(e, t, n) {
return this.set(e, t, Math.floor(36e5 * n));
},
get:function(e) {
var t;
return null != window.store && this.enabled ? (t = window.store.get(e), t ? t.exp && t.time && new Date().getTime() - t.time > t.exp ? null :t.val :null) :null;
},
clear:function() {
var e;
return null != (e = window.store) ? e.clear() :void 0;
},
remove:function(e) {
var t;
return null != (t = window.store) ? t.remove(e) :void 0;
}
}, $B.isStatic = function() {
return "yes" === $("html").attr("static");
}, $B.isHeadlessRendering = function() {
return $S.conf.headless_render && !$B.isStatic();
}, $B.toVal = function(e) {
return "function" == typeof e ? e() :e;
}, $B.topInWindow = function(e) {
return $(e).offset().top - $(window).scrollTop();
}, $B.checkAll = function() {
var e, t, n, i, r;
for (n = arguments[0], t = 2 <= arguments.length ? o.call(arguments, 1) :[], i = 0, 
r = t.length; r > i; i++) if (e = t[i], e !== n) return !1;
return !0;
}, $B.Cookie = function() {
function e(e) {
this.options = null != e ? e :{}, this.set = r(this.set, this), this.get = r(this.get, this);
}
return e.prototype.get = function(e) {
return $.cookie("__" + this.options.scope + "_" + e);
}, e.prototype.set = function(e, t, n) {
return null == n && (n = {
expires:1,
path:"/"
}), $.cookie("__" + this.options.scope + "_" + e, t, n);
}, e;
}(), $B.dialog = function(e) {
var t, n, i;
return i = $.Deferred(), 0 === $("#sdialog").length && $("body").append('      <div id="sdialog" style="opacity: 0; position: relative; z-index: 99999">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #000; opacity: .6;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div class="white-modal" style="display: block; height: auto;">            <div id="sdialog-content" class="modal-container" style="height: auto; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.7);">              <!--text-->            </div>          </div>        </div>      </div>      '), 
$("#sdialog > div").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown"), 
i.reject();
}, 100);
}), $("#sdialog-content").unbind("click").bind("click", function(e) {
return e.stopPropagation();
}), n = {
easing:"easeInOutQuart",
duration:200
}, $("#sdialog").show().animate({
opacity:"1"
}, n), t = $("#sdialog-content").html(e).css("opacity", 0), setTimeout(function() {
return t.addClass("easeUp"), setTimeout(function() {
return t.css("opacity", 1);
}, 200);
}, 100), i;
}, $.fn.doIf = function(e, t) {
return t($(this)) ? e($(this)) :void 0;
}, $B.customAlert = function(e, t, n) {
var i, o, r;
return o = "", null != n && (o = "      <button class='s-btn cancel gray'>" + n + "</button>"), 
i = "", null != t && (i = "      <div class='bottom-actions'>        " + o + "        <button class='s-btn confirm'>" + t + "</button>      </div>    "), 
r = $B.dialog("    <div class='strikingly-custom-alert'>      <i class='fa fa-exclamation-triangle'></i>      <i class='close'>&times;</i>      <div class='alert-content'>      " + e + "      </div>      " + i + "    <div>"), 
$(".strikingly-custom-alert .confirm").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown");
}, 100), r.resolve();
}), $(".strikingly-custom-alert .close, .strikingly-custom-alert .cancel").unbind("click").bind("click", function() {
return $("#sdialog > div").trigger("click");
}), r;
}, $B.getParentWindow = function(e) {
var t;
return t = e.defaultView || e.parentWindow, t.parent;
}, $B.getFrameForDocument = function(e) {
var t, n, i, o;
for (i = $B.getParentWindow(e).document.getElementsByTagName("iframe"), o = i.length; o-- > 0; ) {
n = i[o];
try {
if (t = n.contentDocument || n.contentWindow.document, t === e) return n;
} catch (r) {}
}
}, $B.log = function() {
var e;
return e = "true" === $B.store.get("strikinglyLogger") || $B.log.enabledFlag, $B.log.enabled() && console && console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0;
}, $B.log.enabled = function() {
var e, t, n;
return t = "true" === $B.store.get("strikinglyLogger"), e = "true" === ("function" == typeof (n = $("meta[name=a-minimum]")).attr ? n.attr("content") :void 0), 
t || e || -1 !== window.location.toString().indexOf(":3000");
}, $B.log.enable = function() {
return $B.store.set("strikinglyLogger", "true"), $B.log.enabledFlag = !0, console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
return $B.store.set("strikinglyLogger", "false"), console.log("Bobcat logger disabled!");
}, $B.growl = function(e) {
var t, n, i;
if ($B.log.enabled()) return n = 2800, i = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:i,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return t.animate({
top:"-=5",
opacity:0
}, function() {
return t.remove();
});
}, n), $("body").append(t);
}, $B.pollHelper = function(e, t) {
var n;
return null == t && (t = 1e3), (n = function() {
return setTimeout(function() {
return e.call(this, n);
}, t), t = 1.5 * t;
})();
}, $B.poller = function(e, t, n) {
var i;
return null == t && (t = function() {}), null == n && (n = function() {}), i = !1, 
$B.pollHelper(function(o) {
var r;
return r = $.getJSON(e), r.success(function(e, n, r) {
return i ? void 0 :e && "retry" !== e && "retry" !== (null != e ? e.html :void 0) ? t(e, n, r) :o();
}), r.error(function(e) {
return "retry" === e.responseText ? o() :n();
});
}), {
cancel:function() {
return i = !0;
}
};
}, $B.restPoller = function(e, t) {
var n;
return null == t && (t = {}), n = {
url:e
}, $.extend(!0, n, t), n.success = function(e) {
var n, i, o, r, a, s, l;
if ((null != e ? null != (i = e.message) ? i.type :void 0 :void 0) && (null != e ? null != (o = e.message) ? o.id :void 0 :void 0)) n = "/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm"; else {
if (!(null != e ? null != (r = e.data) ? null != (a = r.task) ? a.type :void 0 :void 0 :void 0) || !(null != e ? null != (s = e.data) ? null != (l = s.task) ? l.id :void 0 :void 0 :void 0)) return $B.log("Could not get poll URL!"), 
$B.log(e), void 0;
n = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm";
}
return $B.poller(n, t.success, t.error), $B.log("Begin polling: " + n);
}, n.error = function(e, n, i) {
return t.error(e, n, i);
}, $.ajax(n), $B.log("Requesting poller: " + e);
}, $B.waitFor = function(e, t, n) {
var i;
return n = n || 100, i = setInterval(function() {
return e() ? (clearInterval(i), t()) :void 0;
}, n);
}, $B.getQueryValue = function(e) {
var t, n;
return t = new RegExp("[?&]" + e + "=([^&#]*)"), n = t.exec(window.location.href), 
null == n ? "" :n[1];
}, $B.detectCSSFeature = function(e) {
var t, n, i, o, r, a, s;
if (i = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
e = e.toLowerCase(), o = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== n.style[r + o]) return !0;
return !1;
}, function(e) {
var t;
return t = {}, e.setCustomization = function(e, n) {
return t[e] = n;
}, e.getCustomization = function(e) {
return null != t[e] ? t[e] :void 0;
};
}($B), function(e) {
var t;
return t = {}, e.meta = function(e, n) {
var i;
return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"), 
null != i ? t[e] = i :($B.log("" + e + " missing in meta."), void 0)) :t[e];
}, e.metaObject = function(e, n) {
var i;
return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"), 
null != i ? t[e] = jQuery.parseJSON(i) :($B.log("" + e + " missing in meta object."), 
{})) :t[e];
}, e.appMeta = function(t) {
return e.metaObject("app-configs")[t];
}, e.siteMeta = function(t) {
return e.metaObject("site-configs")[t];
};
}($B), $B.ui = {
modalStk:[],
removeFromModalStk:function(e) {
var t, n, i, o, r;
for (r = this.modalStk, t = i = 0, o = r.length; o > i; t = ++i) if (n = r[t], n.dialog[0] === e[0]) return this.modalStk.splice(t, 1), 
!0;
return !1;
},
closeLastModal:function() {
var e;
if (0 !== this.modalStk.length) return e = this.modalStk.pop(), $B.ui.closeModal(e.dialog, e.options);
},
openModal:function(e, t) {
var n, i;
if (!e.is(":visible") || "1" !== e.css("opacity")) return t.shade && (0 === (i = $("#g-shade")).length && (i = $('<div id="g-shade" class="s-editor-modal-bg">').css("opacity", 0).appendTo($("body")), 
i.click(function() {
return $B.ui.closeLastModal();
})), i.stop().show(), setTimeout(function() {
return i.css("opacity", 1);
}, 1)), e.css({
"margin-top":-e.height() / 2
}), $(window).height() > 700 ? e.css("top", "45%") :e.css("top", "50%"), t.absolute && e.css({
position:"absolute",
top:$(document).scrollTop() + $(window).height() / 2
}), e.stop().addClass("invisible").show(), setTimeout(function() {
return e.removeClass("invisible");
}, 1), this.modalStk.push({
dialog:e,
options:t
}), (n = $(".s-modal-bg")).length ? (n.css("opacity", 0).show(), n.css("pointer-events", "auto"), 
n.animate({
opacity:1
}, 400, "easeInOutQuart")) :void 0;
},
closeModal:function(e, t) {
var n, i, o, r;
return o = {}, $.extend(!0, o, t), n = $(".s-modal-bg"), r = $("#g-shade"), n.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return n.hide();
}), e.is(":visible") ? (e.addClass("invisible"), this.removeFromModalStk(e), i = !this.modalStk.length, 
i && (r.css("opacity", 0), $("body").removeClass("no-scroll")), setTimeout(function() {
return e.hide(), i ? r.hide() :void 0;
}, 300)) :void 0;
},
openCloseModal:function(e, t) {
var n, i, o;
return i = {
onlyOpen:!1,
shade:!0,
block:!1,
absolute:!1
}, $.extend(!0, i, t), (null != (o = $.browser) ? o.safari :void 0) && e.find("iframe").length && (i.absolute = !0), 
n = e.is(":visible"), n ? i.onlyOpen || this.closeModal(e, i) :this.openModal(e, i), 
n;
},
openPanel:function(e) {
return e.is(":visible") && "1" === e.css("opacity") ? void 0 :(e.css({
left:"-120px"
}).show(), e.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(e) {
return e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return e.hide();
}) :void 0;
},
openClosePanel:function(e, t) {
var n;
return null == t && (t = !1), n = e.is(":visible"), n ? t || this.closePanel(e) :this.openPanel(e), 
n;
},
openIframePopup:function(e, t) {
var n, i, o, r, a;
return null == t && (t = {}), a = $.extend({
showAddress:!1
}, t), n = $(".s-page-layer").show(), $("iframe", n).attr("src", e), i = $(".address .link", n), 
a.showAddress ? i.attr("href", e).text(e) :i.attr("href", "").text(""), $(".s-page-wrapper").css({
height:"auto",
width:"auto",
"margin-top":0,
"margin-left":0,
padding:"0"
}), null != a.height && (r = null != a.topOffset ? a.topOffset :0, $(".s-page-wrapper").css({
height:a.height + "px",
"margin-top":(.8 * $(window).height() - a.height) / 2 + r + "px"
})), null != a.width && (o = null != a.leftOffset ? a.leftOffset :0, $(".s-page-wrapper").css({
width:a.width + "px",
"margin-left":(.92 * $(window).width() - a.width) / 2 + o + "px"
})), null != a.extra && $(".s-page-wrapper").css(a.extra), setTimeout(function() {
return n.addClass("open"), $(".s-page-shade, .back-btn", n).click(function() {
return $B.ui.closeIframePopup();
});
}, 100);
},
closeIframePopup:function() {
var e;
return e = $(".s-page-layer"), e.removeClass("open"), setTimeout(function() {
return e.hide(), $(".s-page-shade, .back-btn", e).unbind("click"), $("iframe", e).attr("src", "");
}, 300);
},
openLinkInWindow:function(e) {
return e.click(function(e) {
var t, n, i;
return e.preventDefault(), t = $(this), n = t.attr("href"), i = window.open(n, "Share Huula", "scrollbars=1,width=500,height=500,menubar=no,toolbar=no,location=no");
});
}
}, $B.Queue = function() {
function e() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.dequeue = r(this.dequeue, this), 
this.enqueue = r(this.enqueue, this), this.q = [];
}
return e.prototype.enqueue = function(e) {
return this.q.push(e);
}, e.prototype.dequeue = function() {
return this.q.shift();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.Stack = function() {
function e() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.pop = r(this.pop, this), 
this.push = r(this.push, this), this.q = [];
}
return e.prototype.push = function(e) {
return this.q.push(e);
}, e.prototype.pop = function() {
return this.q.pop();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.ObservableStack = function(e) {
function t() {
this.clear = r(this.clear, this), this.pop = r(this.pop, this), this.push = r(this.push, this), 
t.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return s(t, e), t.prototype.push = function(e) {
return t.__super__.push.call(this, e), this.observableSize(this.size());
}, t.prototype.pop = function() {
return this.observableSize(this.size() - 1), t.__super__.pop.call(this);
}, t.prototype.clear = function() {
return t.__super__.clear.call(this), this.observableSize(this.size());
}, t;
}($B.Stack), window.Singleton = function() {
function e() {}
var t;
return t = void 0, e.get = function(e) {
return null != t ? t :t = new i(e);
}, e;
}(), i = function() {
function e(e) {
this.args = e;
}
return e.prototype.echo = function() {
return this.args;
}, e;
}(), n = [ "extended", "included" ], $B.Module = function() {
function e() {}
return e.extend = function(e) {
var t, i, o;
for (t in e) i = e[t], l.call(n, t) < 0 && (this[t] = i);
return null != (o = e.extended) && o.apply(this), this;
}, e.include = function(e) {
var t, i, o;
for (t in e) i = e[t], l.call(n, t) < 0 && (this.prototype[t] = i);
return null != (o = e.included) && o.apply(this), this;
}, e;
}(), $B.UrlHelper = {
isEmail:function(e) {
var t;
return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
t.test(e);
},
hasProtocol:function(e) {
var t, n;
return t = /^((http|https|ftp|mailto|tel|fb|skype|itms-services):)/, n = /^(#)/, 
t.test(e) || n.test(e);
},
addProtocol:function(e, t) {
return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" :"javascript:void(0);" :this.isEmail(e) ? e = "mailto:" + e :this.hasProtocol(e) || (e = "http://" + e), 
e;
},
createUrlParser:function(e) {
var t;
return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
}
}, $B.HtmlHelper = {
htmlEncode:function(e) {
return $("<div/>").text(e).html();
},
htmlDecode:function(e) {
return $("<div/>").html(e).text();
},
checkClosingTags:function(e) {
var t, n, i, o, r, a, s, u, c, d, h;
for (i = function(e) {
var t;
return t = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
e = e.split(/[<>\s]/g)[1], e = e.replace(/\//g, ""), l.call(t, e) >= 0;
}, t = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
a = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, r = e; o.test(r) || a.test(r); ) r = r.replace(o, ""), 
r = r.replace(a, "");
for (u = null != (h = r.match(t)) ? h :[], n = 0, c = 0, d = u.length; d > c; c++) if (s = u[c], 
!i(s) && ("/" !== s[1] ? n += 1 :n -= 1, 0 > n)) return !1;
return 0 === n;
}
}, $B.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
getOptions:function(e) {
var t, n, i, o, r, a, s;
return this.conversions ? this.conversions :(window.form = e, o = e.find('[name="asset[image_size]"]').get(0), 
a = e.find('[name="asset[thumb_size]"]').get(0), r = this.toImageSize($(o).val()), 
s = this.toImageSize($(a).val()), i = function(e) {
return e.slice(0, -1).split("x")[0];
}, n = function(e) {
return e.slice(0, -1).split("x")[1];
}, t = function(e) {
var t;
return t = e.charAt(e.length - 1), "#" === t ? {
crop:"fill",
gravity:"faces:center"
} :"<" === t || ">" === t ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:i(r),
height:n(r)
},
thumb:{
width:i(s),
height:n(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, t(r)), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)), 
this.conversions);
},
toImageSize:function(e) {
return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]), 
e;
}
}, e = function() {
function e(e) {
this.handler = e, this.queue = [];
}
return e.prototype.run = function() {
var e, t = this;
return e = function() {
return t.queue.length > 0 ? t.run() :void 0;
}, this.handler(this.queue.shift(), e);
}, e.prototype.append = function(e) {
return this.queue.push(e), 1 === this.queue.length ? this.run() :void 0;
}, e;
}(), t = function() {
function e(e, t, n) {
this.item = e, this.url = t, this.callback = n;
}
return e;
}(), $B.loadFacebookScript = function() {
return function(e, t, n) {
var i, o;
return i = e.getElementsByTagName(t)[0], e.getElementById(n) ? void 0 :(o = e.createElement(t), 
o.id = n, o.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=138736959550286", 
i.parentNode.insertBefore(o, i));
}(document, "script", "facebook-jssdk");
}, $B.loadTwitterScript = function() {
return !function(e, t, n) {
var i, o, r;
return i = e.getElementsByTagName(t)[0], r = /^http:/.test(e.location) ? "http" :"https", 
e.getElementById(n) ? void 0 :(o = e.createElement(t), o.id = n, o.src = r + "://platform.twitter.com/widgets.js", 
i.parentNode.insertBefore(o, i));
}(document, "script", "twitter-wjs");
}, $B.FacebookLogin = function() {
function e(e) {
this._configs = e, this.loadFacebook = r(this.loadFacebook, this), this.fbLoginPopup = r(this.fbLoginPopup, this);
}
return e.prototype.fbLoginPopup = function(e) {
return FB.login(function(t) {
if (t.authResponse) {
if (e.success) return e.success(t);
} else if (e.fail) return e.fail(t);
}, {
scope:this._configs.FACEBOOK_PERMS
});
}, e.prototype.loadFacebook = function(e) {
var t = this;
return window.fbAsyncInit = function() {
return FB.init({
appId:t._configs.FACEBOOK_APP_ID,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(t) {
if (console.log(t), "connected" === t.status) {
if (e.connected) return e.connected(t);
} else if ("not_authorized" === t.status) {
if (e.notAuthorized) return e.notAuthorized(t);
} else if (e.others) return e.others(t);
});
}, function(e) {
var t, n, i;
return t = "facebook-jssdk", i = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 :(n = e.createElement("script"), 
n.id = t, n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", i.parentNode.insertBefore(n, i));
}(document);
}, e;
}(), $B.LinkedinLogin = function() {
function e(e) {
this._configs = e, this.loadLinkedin = r(this.loadLinkedin, this), this.linkedinLogout = r(this.linkedinLogout, this), 
this.linkedinLoginPopup = r(this.linkedinLoginPopup, this);
}
return e.prototype.linkedinLoginPopup = function(e) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (e.success) return e.success();
} else if (e.fail) return e.fail();
});
}, e.prototype.linkedinLogout = function() {
return IN.User.logout();
}, e.prototype.loadLinkedin = function(e) {
var t = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:t._configs.LINKEDIN_API_KEY,
scope:t._configs.LINKEDIN_PERMS,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), e.connected) ? e.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), e.disconnected) ? e.disconnected() :void 0;
}), e.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, e.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, e;
}(), window.AjaxQueueBuffer = e, window.Task = t, $B.debounce = function(e, t) {
var n;
return null == t && (t = 100), n = 0, function() {
var i, o;
return o = this, i = arguments, clearTimeout(n), n = setTimeout(function() {
return e.apply(o, i);
}, t);
};
}, $B.genGeneralErrorHandler = function(e) {
return function(t) {
var n, i, o;
return n = null != t.responseJSON ? null != (i = t.responseJSON.meta) ? null != (o = i.userMessage) ? o.plain :void 0 :void 0 :I18n.t("js.pages.edit.errors.api_error"), 
$B.customAlert(n), "function" == typeof e ? e() :void 0;
};
}, $B.lazyloadIframe = function() {
var e;
return e = 0, function(t, n) {
return null == n && (n = -1), -1 === n && (n = 1e4 + 1e3 * e), e += 1, setTimeout(function() {
return t.data("src") !== t.attr("src") ? (t.attr("src", t.data("src")), "function" == typeof $B.timerCheck ? $B.timerCheck("Loading iframe #" + t.attr("id")) :void 0) :void 0;
}, n);
};
}(), $B.Embedly = function() {
function e() {
this.apiKey = $S.conf.EMBEDLY_API_KEY;
}
return e.prototype.queryUrlForHtml = function(e) {
return $.ajax({
type:"GET",
url:"http://api.embed.ly/1/oembed",
data:{
key:this.apiKey,
url:e
},
dataType:"JSON"
});
}, e;
}(), $B.Prefetcher = function() {
function e(e) {
var t = this;
this.prepared = !1, this.url = e, this.nextPage = $("iframe.prefetch"), 0 === this.nextPage.length ? setTimeout(function() {
return t.nextPage = $("<iframe class='prefetch' src='" + e + "'></iframe>").load(function() {
return t.prepared = !0;
}), t.nextPage.hide().appendTo("body");
}, 1e3) :this.prepared = !0;
}
return e.prototype.getTitle = function() {
return this.nextPage[0].contentDocument.title;
}, e.prototype.expand = function() {
return $("body > *:not(.prefetch)").remove(), this.nextPage.css({
border:"0",
position:"fixed",
top:0,
bottom:0,
left:0,
right:0,
width:"100%",
height:"100%",
"z-index":9999999,
display:"block"
});
}, e;
}();
}.call(this), function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#s-header, .navigator",
FOOTER:"#footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
ASSET_LIB_DIALOG:"#asset-lib-dialog",
APP_STORE_DIALOG:"#app-store-dialog",
TRAFFIC_GUIDE_DIALOG:"#traffic-guide-dialog",
SHARE_DIALOG:"#sharing-options-dialog",
CATEGORY_DIALOG:"#category-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
UNPUBLISH_SITES_DIALOG:"#unpublish-sites-dialog",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
DOMAIN_FORM:".strikingly-custom-domain-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(e) {
return e.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(e) {
return e.find("img").attr("data-description") || "";
},
GALLERY:function(e) {
var t, n, i, o;
for (o = e.parent().find("a.item"), n = 0, i = o.length; i > n; n++) t = o[n], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(e) {
return e.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(e) {
return e.find(".gallery-editor-image");
}
};
}.call(this), function() {
$B.referrers_source = {
unknown:{
Google:{
domains:"support.google.com developers.google.com maps.google.com accounts.google.com drive.google.com sites.google.com groups.google.com groups.google.co.uk news.google.co.uk".split(" ")
},
"Yahoo!":{
domains:"finance.yahoo.com news.yahoo.com eurosport.yahoo.com sports.yahoo.com astrology.yahoo.com travel.yahoo.com answers.yahoo.com screen.yahoo.com weather.yahoo.com messenger.yahoo.com games.yahoo.com shopping.yahoo.net movies.yahoo.com cars.yahoo.com lifestyle.yahoo.com omg.yahoo.com match.yahoo.net".split(" ")
}
},
search:{
TalkTalk:{
domains:[ "www.talktalk.co.uk" ],
parameters:[ "query" ]
},
"1.cz":{
domains:[ "1.cz" ],
parameters:[ "q" ]
},
Softonic:{
domains:[ "search.softonic.com" ],
parameters:[ "q" ]
},
GAIS:{
domains:[ "gais.cs.ccu.edu.tw" ],
parameters:[ "q" ]
},
Freecause:{
domains:[ "search.freecause.com" ],
parameters:[ "p" ]
},
RPMFind:{
domains:[ "rpmfind.net", "fr2.rpmfind.net" ],
parameters:[ "rpmfind.net", "fr2.rpmfind.net" ]
},
Comcast:{
domains:[ "serach.comcast.net" ],
parameters:[ "q" ]
},
Voila:{
domains:[ "search.ke.voila.fr", "www.lemoteur.fr" ],
parameters:[ "rdata" ]
},
Nifty:{
domains:[ "search.nifty.com" ],
parameters:[ "q" ]
},
Atlas:{
domains:[ "searchatlas.centrum.cz" ],
parameters:[ "q" ]
},
"Lo.st":{
domains:[ "lo.st" ],
parameters:[ "x_query" ]
},
DasTelefonbuch:{
domains:[ "www1.dastelefonbuch.de" ],
parameters:[ "kw" ]
},
Fireball:{
domains:[ "www.fireball.de" ],
parameters:[ "q" ]
},
"1und1":{
domains:[ "search.1und1.de" ],
parameters:[ "su" ]
},
Virgilio:{
domains:[ "ricerca.virgilio.it", "ricercaimmagini.virgilio.it", "ricercavideo.virgilio.it", "ricercanews.virgilio.it", "mobile.virgilio.it" ],
parameters:[ "qs" ]
},
"Web.nl":{
domains:[ "www.web.nl" ],
parameters:[ "zoekwoord" ]
},
Plazoo:{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
"Goyellow.de":{
domains:[ "www.goyellow.de" ],
parameters:[ "MDN" ]
},
AOL:{
domains:"search.aol.com search.aol.it aolsearch.aol.com aolsearch.com www.aolrecherche.aol.fr www.aolrecherches.aol.fr www.aolimages.aol.fr aim.search.aol.com www.recherche.aol.fr find.web.aol.com recherche.aol.ca aolsearch.aol.co.uk search.aol.co.uk aolrecherche.aol.fr sucheaol.aol.de suche.aol.de suche.aolsvc.de aolbusqueda.aol.com.mx alicesuche.aol.de alicesuchet.aol.de suchet2.aol.de search.hp.my.aol.com.au search.hp.my.aol.de search.hp.my.aol.it search-intl.netscape.com".split(" "),
parameters:[ "q", "query" ]
},
Acoon:{
domains:[ "www.acoon.de" ],
parameters:[ "begriff" ]
},
Free:{
domains:[ "search.free.fr", "search1-2.free.fr", "search1-1.free.fr" ],
parameters:[ "q" ]
},
"Apollo Latvia":{
domains:[ "apollo.lv/portal/search/" ],
parameters:[ "q" ]
},
HighBeam:{
domains:[ "www.highbeam.com" ],
parameters:[ "q" ]
},
"I-play":{
domains:[ "start.iplay.com" ],
parameters:[ "q" ]
},
FriendFeed:{
domains:[ "friendfeed.com" ],
parameters:[ "q" ]
},
Yasni:{
domains:[ "www.yasni.de", "www.yasni.com", "www.yasni.co.uk", "www.yasni.ch", "www.yasni.at" ],
parameters:[ "query" ]
},
Gigablast:{
domains:[ "www.gigablast.com", "dir.gigablast.com" ],
parameters:[ "q" ]
},
arama:{
domains:[ "arama.com" ],
parameters:[ "q" ]
},
Fixsuche:{
domains:[ "www.fixsuche.de" ],
parameters:[ "q" ]
},
Apontador:{
domains:[ "apontador.com.br", "www.apontador.com.br" ],
parameters:[ "q" ]
},
"Search.com":{
domains:[ "www.search.com" ],
parameters:[ "q" ]
},
Monstercrawler:{
domains:[ "www.monstercrawler.com" ],
parameters:[ "qry" ]
},
"Google Images":{
domains:"google.ac/imgres google.ad/imgres google.ae/imgres google.am/imgres google.as/imgres google.at/imgres google.az/imgres google.ba/imgres google.be/imgres google.bf/imgres google.bg/imgres google.bi/imgres google.bj/imgres google.bs/imgres google.by/imgres google.ca/imgres google.cat/imgres google.cc/imgres google.cd/imgres google.cf/imgres google.cg/imgres google.ch/imgres google.ci/imgres google.cl/imgres google.cm/imgres google.cn/imgres google.co.bw/imgres google.co.ck/imgres google.co.cr/imgres google.co.id/imgres google.co.il/imgres google.co.in/imgres google.co.jp/imgres google.co.ke/imgres google.co.kr/imgres google.co.ls/imgres google.co.ma/imgres google.co.mz/imgres google.co.nz/imgres google.co.th/imgres google.co.tz/imgres google.co.ug/imgres google.co.uk/imgres google.co.uz/imgres google.co.ve/imgres google.co.vi/imgres google.co.za/imgres google.co.zm/imgres google.co.zw/imgres google.com/imgres google.com.af/imgres google.com.ag/imgres google.com.ai/imgres google.com.ar/imgres google.com.au/imgres google.com.bd/imgres google.com.bh/imgres google.com.bn/imgres google.com.bo/imgres google.com.br/imgres google.com.by/imgres google.com.bz/imgres google.com.co/imgres google.com.cu/imgres google.com.cy/imgres google.com.do/imgres google.com.ec/imgres google.com.eg/imgres google.com.et/imgres google.com.fj/imgres google.com.gh/imgres google.com.gi/imgres google.com.gt/imgres google.com.hk/imgres google.com.jm/imgres google.com.kh/imgres google.com.kh/imgres google.com.kw/imgres google.com.lb/imgres google.com.lc/imgres google.com.ly/imgres google.com.mt/imgres google.com.mx/imgres google.com.my/imgres google.com.na/imgres google.com.nf/imgres google.com.ng/imgres google.com.ni/imgres google.com.np/imgres google.com.om/imgres google.com.pa/imgres google.com.pe/imgres google.com.ph/imgres google.com.pk/imgres google.com.pr/imgres google.com.py/imgres google.com.qa/imgres google.com.sa/imgres google.com.sb/imgres google.com.sg/imgres google.com.sl/imgres google.com.sv/imgres google.com.tj/imgres google.com.tn/imgres google.com.tr/imgres google.com.tw/imgres google.com.ua/imgres google.com.uy/imgres google.com.vc/imgres google.com.vn/imgres google.cv/imgres google.cz/imgres google.de/imgres google.dj/imgres google.dk/imgres google.dm/imgres google.dz/imgres google.ee/imgres google.es/imgres google.fi/imgres google.fm/imgres google.fr/imgres google.ga/imgres google.gd/imgres google.ge/imgres google.gf/imgres google.gg/imgres google.gl/imgres google.gm/imgres google.gp/imgres google.gr/imgres google.gy/imgres google.hn/imgres google.hr/imgres google.ht/imgres google.hu/imgres google.ie/imgres google.im/imgres google.io/imgres google.iq/imgres google.is/imgres google.it/imgres google.it.ao/imgres google.je/imgres google.jo/imgres google.kg/imgres google.ki/imgres google.kz/imgres google.la/imgres google.li/imgres google.lk/imgres google.lt/imgres google.lu/imgres google.lv/imgres google.md/imgres google.me/imgres google.mg/imgres google.mk/imgres google.ml/imgres google.mn/imgres google.ms/imgres google.mu/imgres google.mv/imgres google.mw/imgres google.ne/imgres google.nl/imgres google.no/imgres google.nr/imgres google.nu/imgres google.pl/imgres google.pn/imgres google.ps/imgres google.pt/imgres google.ro/imgres google.rs/imgres google.ru/imgres google.rw/imgres google.sc/imgres google.se/imgres google.sh/imgres google.si/imgres google.sk/imgres google.sm/imgres google.sn/imgres google.so/imgres google.st/imgres google.td/imgres google.tg/imgres google.tk/imgres google.tl/imgres google.tm/imgres google.to/imgres google.tt/imgres google.us/imgres google.vg/imgres google.vu/imgres images.google.ws images.google.ac images.google.ad images.google.ae images.google.am images.google.as images.google.at images.google.az images.google.ba images.google.be images.google.bf images.google.bg images.google.bi images.google.bj images.google.bs images.google.by images.google.ca images.google.cat images.google.cc images.google.cd images.google.cf images.google.cg images.google.ch images.google.ci images.google.cl images.google.cm images.google.cn images.google.co.bw images.google.co.ck images.google.co.cr images.google.co.id images.google.co.il images.google.co.in images.google.co.jp images.google.co.ke images.google.co.kr images.google.co.ls images.google.co.ma images.google.co.mz images.google.co.nz images.google.co.th images.google.co.tz images.google.co.ug images.google.co.uk images.google.co.uz images.google.co.ve images.google.co.vi images.google.co.za images.google.co.zm images.google.co.zw images.google.com images.google.com.af images.google.com.ag images.google.com.ai images.google.com.ar images.google.com.au images.google.com.bd images.google.com.bh images.google.com.bn images.google.com.bo images.google.com.br images.google.com.by images.google.com.bz images.google.com.co images.google.com.cu images.google.com.cy images.google.com.do images.google.com.ec images.google.com.eg images.google.com.et images.google.com.fj images.google.com.gh images.google.com.gi images.google.com.gt images.google.com.hk images.google.com.jm images.google.com.kh images.google.com.kh images.google.com.kw images.google.com.lb images.google.com.lc images.google.com.ly images.google.com.mt images.google.com.mx images.google.com.my images.google.com.na images.google.com.nf images.google.com.ng images.google.com.ni images.google.com.np images.google.com.om images.google.com.pa images.google.com.pe images.google.com.ph images.google.com.pk images.google.com.pr images.google.com.py images.google.com.qa images.google.com.sa images.google.com.sb images.google.com.sg images.google.com.sl images.google.com.sv images.google.com.tj images.google.com.tn images.google.com.tr images.google.com.tw images.google.com.ua images.google.com.uy images.google.com.vc images.google.com.vn images.google.cv images.google.cz images.google.de images.google.dj images.google.dk images.google.dm images.google.dz images.google.ee images.google.es images.google.fi images.google.fm images.google.fr images.google.ga images.google.gd images.google.ge images.google.gf images.google.gg images.google.gl images.google.gm images.google.gp images.google.gr images.google.gy images.google.hn images.google.hr images.google.ht images.google.hu images.google.ie images.google.im images.google.io images.google.iq images.google.is images.google.it images.google.it.ao images.google.je images.google.jo images.google.kg images.google.ki images.google.kz images.google.la images.google.li images.google.lk images.google.lt images.google.lu images.google.lv images.google.md images.google.me images.google.mg images.google.mk images.google.ml images.google.mn images.google.ms images.google.mu images.google.mv images.google.mw images.google.ne images.google.nl images.google.no images.google.nr images.google.nu images.google.pl images.google.pn images.google.ps images.google.pt images.google.ro images.google.rs images.google.ru images.google.rw images.google.sc images.google.se images.google.sh images.google.si images.google.sk images.google.sm images.google.sn images.google.so images.google.st images.google.td images.google.tg images.google.tk images.google.tl images.google.tm images.google.to images.google.tt images.google.us images.google.vg images.google.vu images.google.ws".split(" "),
parameters:[ "q" ]
},
ABCsøk:{
domains:[ "abcsolk.no", "verden.abcsok.no" ],
parameters:[ "q" ]
},
"Google Product Search":{
domains:"google.ac/products google.ad/products google.ae/products google.am/products google.as/products google.at/products google.az/products google.ba/products google.be/products google.bf/products google.bg/products google.bi/products google.bj/products google.bs/products google.by/products google.ca/products google.cat/products google.cc/products google.cd/products google.cf/products google.cg/products google.ch/products google.ci/products google.cl/products google.cm/products google.cn/products google.co.bw/products google.co.ck/products google.co.cr/products google.co.id/products google.co.il/products google.co.in/products google.co.jp/products google.co.ke/products google.co.kr/products google.co.ls/products google.co.ma/products google.co.mz/products google.co.nz/products google.co.th/products google.co.tz/products google.co.ug/products google.co.uk/products google.co.uz/products google.co.ve/products google.co.vi/products google.co.za/products google.co.zm/products google.co.zw/products google.com/products google.com.af/products google.com.ag/products google.com.ai/products google.com.ar/products google.com.au/products google.com.bd/products google.com.bh/products google.com.bn/products google.com.bo/products google.com.br/products google.com.by/products google.com.bz/products google.com.co/products google.com.cu/products google.com.cy/products google.com.do/products google.com.ec/products google.com.eg/products google.com.et/products google.com.fj/products google.com.gh/products google.com.gi/products google.com.gt/products google.com.hk/products google.com.jm/products google.com.kh/products google.com.kh/products google.com.kw/products google.com.lb/products google.com.lc/products google.com.ly/products google.com.mt/products google.com.mx/products google.com.my/products google.com.na/products google.com.nf/products google.com.ng/products google.com.ni/products google.com.np/products google.com.om/products google.com.pa/products google.com.pe/products google.com.ph/products google.com.pk/products google.com.pr/products google.com.py/products google.com.qa/products google.com.sa/products google.com.sb/products google.com.sg/products google.com.sl/products google.com.sv/products google.com.tj/products google.com.tn/products google.com.tr/products google.com.tw/products google.com.ua/products google.com.uy/products google.com.vc/products google.com.vn/products google.cv/products google.cz/products google.de/products google.dj/products google.dk/products google.dm/products google.dz/products google.ee/products google.es/products google.fi/products google.fm/products google.fr/products google.ga/products google.gd/products google.ge/products google.gf/products google.gg/products google.gl/products google.gm/products google.gp/products google.gr/products google.gy/products google.hn/products google.hr/products google.ht/products google.hu/products google.ie/products google.im/products google.io/products google.iq/products google.is/products google.it/products google.it.ao/products google.je/products google.jo/products google.kg/products google.ki/products google.kz/products google.la/products google.li/products google.lk/products google.lt/products google.lu/products google.lv/products google.md/products google.me/products google.mg/products google.mk/products google.ml/products google.mn/products google.ms/products google.mu/products google.mv/products google.mw/products google.ne/products google.nl/products google.no/products google.nr/products google.nu/products google.pl/products google.pn/products google.ps/products google.pt/products google.ro/products google.rs/products google.ru/products google.rw/products google.sc/products google.se/products google.sh/products google.si/products google.sk/products google.sm/products google.sn/products google.so/products google.st/products google.td/products google.tg/products google.tk/products google.tl/products google.tm/products google.to/products google.tt/products google.us/products google.vg/products google.vu/products google.ws/products www.google.ac/products www.google.ad/products www.google.ae/products www.google.am/products www.google.as/products www.google.at/products www.google.az/products www.google.ba/products www.google.be/products www.google.bf/products www.google.bg/products www.google.bi/products www.google.bj/products www.google.bs/products www.google.by/products www.google.ca/products www.google.cat/products www.google.cc/products www.google.cd/products www.google.cf/products www.google.cg/products www.google.ch/products www.google.ci/products www.google.cl/products www.google.cm/products www.google.cn/products www.google.co.bw/products www.google.co.ck/products www.google.co.cr/products www.google.co.id/products www.google.co.il/products www.google.co.in/products www.google.co.jp/products www.google.co.ke/products www.google.co.kr/products www.google.co.ls/products www.google.co.ma/products www.google.co.mz/products www.google.co.nz/products www.google.co.th/products www.google.co.tz/products www.google.co.ug/products www.google.co.uk/products www.google.co.uz/products www.google.co.ve/products www.google.co.vi/products www.google.co.za/products www.google.co.zm/products www.google.co.zw/products www.google.com/products www.google.com.af/products www.google.com.ag/products www.google.com.ai/products www.google.com.ar/products www.google.com.au/products www.google.com.bd/products www.google.com.bh/products www.google.com.bn/products www.google.com.bo/products www.google.com.br/products www.google.com.by/products www.google.com.bz/products www.google.com.co/products www.google.com.cu/products www.google.com.cy/products www.google.com.do/products www.google.com.ec/products www.google.com.eg/products www.google.com.et/products www.google.com.fj/products www.google.com.gh/products www.google.com.gi/products www.google.com.gt/products www.google.com.hk/products www.google.com.jm/products www.google.com.kh/products www.google.com.kh/products www.google.com.kw/products www.google.com.lb/products www.google.com.lc/products www.google.com.ly/products www.google.com.mt/products www.google.com.mx/products www.google.com.my/products www.google.com.na/products www.google.com.nf/products www.google.com.ng/products www.google.com.ni/products www.google.com.np/products www.google.com.om/products www.google.com.pa/products www.google.com.pe/products www.google.com.ph/products www.google.com.pk/products www.google.com.pr/products www.google.com.py/products www.google.com.qa/products www.google.com.sa/products www.google.com.sb/products www.google.com.sg/products www.google.com.sl/products www.google.com.sv/products www.google.com.tj/products www.google.com.tn/products www.google.com.tr/products www.google.com.tw/products www.google.com.ua/products www.google.com.uy/products www.google.com.vc/products www.google.com.vn/products www.google.cv/products www.google.cz/products www.google.de/products www.google.dj/products www.google.dk/products www.google.dm/products www.google.dz/products www.google.ee/products www.google.es/products www.google.fi/products www.google.fm/products www.google.fr/products www.google.ga/products www.google.gd/products www.google.ge/products www.google.gf/products www.google.gg/products www.google.gl/products www.google.gm/products www.google.gp/products www.google.gr/products www.google.gy/products www.google.hn/products www.google.hr/products www.google.ht/products www.google.hu/products www.google.ie/products www.google.im/products www.google.io/products www.google.iq/products www.google.is/products www.google.it/products www.google.it.ao/products www.google.je/products www.google.jo/products www.google.kg/products www.google.ki/products www.google.kz/products www.google.la/products www.google.li/products www.google.lk/products www.google.lt/products www.google.lu/products www.google.lv/products www.google.md/products www.google.me/products www.google.mg/products www.google.mk/products www.google.ml/products www.google.mn/products www.google.ms/products www.google.mu/products www.google.mv/products www.google.mw/products www.google.ne/products www.google.nl/products www.google.no/products www.google.nr/products www.google.nu/products www.google.pl/products www.google.pn/products www.google.ps/products www.google.pt/products www.google.ro/products www.google.rs/products www.google.ru/products www.google.rw/products www.google.sc/products www.google.se/products www.google.sh/products www.google.si/products www.google.sk/products www.google.sm/products www.google.sn/products www.google.so/products www.google.st/products www.google.td/products www.google.tg/products www.google.tk/products www.google.tl/products www.google.tm/products www.google.to/products www.google.tt/products www.google.us/products www.google.vg/products www.google.vu/products www.google.ws/products".split(" "),
parameters:[ "q" ]
},
DasOertliche:{
domains:[ "www.dasoertliche.de" ],
parameters:[ "kw" ]
},
InfoSpace:{
domains:"infospace.com dogpile.com www.dogpile.com metacrawler.com webfetch.com webcrawler.com search.kiwee.com isearch.babylon.com start.facemoods.com search.magnetic.com search.searchcompletion.com clusty.com".split(" "),
parameters:[ "q", "s" ]
},
Weborama:{
domains:[ "www.weborama.com" ],
parameters:[ "QUERY" ]
},
Bluewin:{
domains:[ "search.bluewin.ch" ],
parameters:[ "searchTerm" ]
},
Neti:{
domains:[ "www.neti.ee" ],
parameters:[ "query" ]
},
Winamp:{
domains:[ "search.winamp.com" ],
parameters:[ "q" ]
},
Nigma:{
domains:[ "nigma.ru" ],
parameters:[ "s" ]
},
"Yahoo! Images":{
domains:[ "image.yahoo.cn", "images.search.yahoo.com" ],
parameters:[ "p", "q" ]
},
Exalead:{
domains:[ "www.exalead.fr", "www.exalead.com" ],
parameters:[ "q" ]
},
Teoma:{
domains:[ "www.teoma.com" ],
parameters:[ "q" ]
},
Needtofind:{
domains:[ "ko.search.need2find.com" ],
parameters:[ "searchfor" ]
},
Looksmart:{
domains:[ "www.looksmart.com" ],
parameters:[ "key" ]
},
"Wirtualna Polska":{
domains:[ "szukaj.wp.pl" ],
parameters:[ "szukaj" ]
},
Toolbarhome:{
domains:[ "www.toolbarhome.com", "vshare.toolbarhome.com" ],
parameters:[ "q" ]
},
Searchalot:{
domains:[ "searchalot.com" ],
parameters:[ "q" ]
},
Yandex:{
domains:"yandex.ru yandex.ua yandex.com www.yandex.ru www.yandex.ua www.yandex.com".split(" "),
parameters:[ "text" ]
},
"canoe.ca":{
domains:[ "web.canoe.ca" ],
parameters:[ "q" ]
},
Compuserve:{
domains:[ "websearch.cs.com" ],
parameters:[ "query" ]
},
Startpagina:{
domains:[ "startgoogle.startpagina.nl" ],
parameters:[ "q" ]
},
eo:{
domains:[ "eo.st" ],
parameters:[ "x_query" ]
},
Zhongsou:{
domains:[ "p.zhongsou.com" ],
parameters:[ "w" ]
},
"La Toile Du Quebec Via Google":{
domains:[ "www.toile.com", "web.toile.com" ],
parameters:[ "q" ]
},
Paperball:{
domains:[ "www.paperball.de" ],
parameters:[ "q" ]
},
"Jungle Spider":{
domains:[ "www.jungle-spider.de" ],
parameters:[ "q" ]
},
PeoplePC:{
domains:[ "search.peoplepc.com" ],
parameters:[ "q" ]
},
"MetaCrawler.de":{
domains:[ "s1.metacrawler.de", "s2.metacrawler.de", "s3.metacrawler.de" ],
parameters:[ "qry" ]
},
Orange:{
domains:[ "busca.orange.es", "search.orange.co.uk" ],
parameters:[ "q" ]
},
"Gule Sider":{
domains:[ "www.gulesider.no" ],
parameters:[ "q" ]
},
Francite:{
domains:[ "recherche.francite.com" ],
parameters:[ "name" ]
},
"Ask Toolbar":{
domains:[ "search.tb.ask.com" ],
parameters:[ "searchfor" ]
},
Aport:{
domains:[ "sm.aport.ru" ],
parameters:[ "r" ]
},
"Trusted-Search":{
domains:[ "www.trusted--search.com" ],
parameters:[ "w" ]
},
goo:{
domains:[ "search.goo.ne.jp", "ocnsearch.goo.ne.jp" ],
parameters:[ "MT" ]
},
"Fast Browser Search":{
domains:[ "www.fastbrowsersearch.com" ],
parameters:[ "q" ]
},
Blogpulse:{
domains:[ "www.blogpulse.com" ],
parameters:[ "query" ]
},
Volny:{
domains:[ "web.volny.cz" ],
parameters:[ "search" ]
},
Icerockeet:{
domains:[ "blogs.icerocket.com" ],
parameters:[ "q" ]
},
Terra:{
domains:[ "buscador.terra.es", "buscador.terra.cl", "buscador.terra.com.br" ],
parameters:[ "query" ]
},
Searchy:{
domains:[ "www.searchy.co.uk" ],
parameters:[ "q" ]
},
Onet:{
domains:[ "szukaj.onet.pl" ],
parameters:[ "qt" ]
},
Digg:{
domains:[ "digg.com" ],
parameters:[ "s" ]
},
Abacho:{
domains:"www.abacho.de www.abacho.com www.abacho.co.uk www.se.abacho.com www.tr.abacho.com www.abacho.at www.abacho.fr www.abacho.es www.abacho.ch www.abacho.it".split(" "),
parameters:[ "q" ]
},
maailm:{
domains:[ "www.maailm.com" ],
parameters:[ "tekst" ]
},
Flix:{
domains:[ "www.flix.de" ],
parameters:[ "keyword" ]
},
Suchnase:{
domains:[ "www.suchnase.de" ],
parameters:[ "q" ]
},
Freenet:{
domains:[ "suche.freenet.de" ],
parameters:[ "query", "Keywords" ]
},
DuckDuckGoL:{
domains:[ "duckduckgo.com" ],
parameters:[ "q" ]
},
"Poisk.ru":{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
Sharelook:{
domains:[ "www.sharelook.fr" ],
parameters:[ "keyword" ]
},
Najdi:{
domains:[ "www.najdi.si" ],
parameters:[ "q" ]
},
Picsearch:{
domains:[ "www.picsearch.com" ],
parameters:[ "q" ]
},
"Mail.ru":{
domains:[ "go.mail.ru" ],
parameters:[ "q" ]
},
Alexa:{
domains:[ "alexa.com", "search.toolbars.alexa.com" ],
parameters:[ "q" ]
},
Metager:{
domains:[ "meta.rrzn.uni-hannover.de", "www.metager.de" ],
parameters:[ "eingabe" ]
},
Technorati:{
domains:[ "technorati.com" ],
parameters:[ "q" ]
},
WWW:{
domains:[ "search.www.ee" ],
parameters:[ "query" ]
},
"Trouvez.com":{
domains:[ "www.trouvez.com" ],
parameters:[ "query" ]
},
IXquick:{
domains:"ixquick.com www.eu.ixquick.com ixquick.de www.ixquick.de us.ixquick.com s1.us.ixquick.com s2.us.ixquick.com s3.us.ixquick.com s4.us.ixquick.com s5.us.ixquick.com eu.ixquick.com s8-eu.ixquick.com s1-eu.ixquick.de".split(" "),
parameters:[ "query" ]
},
Zapmeta:{
domains:[ "www.zapmeta.com", "www.zapmeta.nl", "www.zapmeta.de", "uk.zapmeta.com" ],
parameters:[ "q", "query" ]
},
Yippy:{
domains:[ "search.yippy.com" ],
parameters:[ "q", "query" ]
},
Gomeo:{
domains:[ "www.gomeo.com" ],
parameters:[ "Keywords" ]
},
Walhello:{
domains:[ "www.walhello.info", "www.walhello.com", "www.walhello.de", "www.walhello.nl" ],
parameters:[ "key" ]
},
Meta:{
domains:[ "meta.ua" ],
parameters:[ "q" ]
},
Skynet:{
domains:[ "www.skynet.be" ],
parameters:[ "q" ]
},
Blogdigger:{
domains:[ "www.blogdigger.com" ],
parameters:[ "q" ]
},
WebSearch:{
domains:[ "www.websearch.com" ],
parameters:[ "qkw", "q" ]
},
Rambler:{
domains:[ "nova.rambler.ru" ],
parameters:[ "query", "words" ]
},
Latne:{
domains:[ "www.latne.lv" ],
parameters:[ "q" ]
},
MySearch:{
domains:"www.mysearch.com ms114.mysearch.com ms146.mysearch.com kf.mysearch.myway.com ki.mysearch.myway.com search.myway.com search.mywebsearch.com".split(" "),
parameters:[ "searchfor", "searchFor" ]
},
Cuil:{
domains:[ "www.cuil.com" ],
parameters:[ "q" ]
},
Tixuma:{
domains:[ "www.tixuma.de" ],
parameters:[ "sc" ]
},
Sapo:{
domains:[ "pesquisa.sapo.pt" ],
parameters:[ "q" ]
},
Gnadenmeer:{
domains:[ "www.gnadenmeer.de" ],
parameters:[ "keyword" ]
},
Arcor:{
domains:[ "www.arcor.de" ],
parameters:[ "Keywords" ]
},
Naver:{
domains:[ "search.naver.com" ],
parameters:[ "query" ]
},
Zoeken:{
domains:[ "www.zoeken.nl" ],
parameters:[ "q" ]
},
Yam:{
domains:[ "search.yam.com" ],
parameters:[ "k" ]
},
Eniro:{
domains:[ "www.eniro.se" ],
parameters:[ "q", "search_word" ]
},
APOLL07:{
domains:[ "apollo7.de" ],
parameters:[ "query" ]
},
Biglobe:{
domains:[ "cgi.search.biglobe.ne.jp" ],
parameters:[ "q" ]
},
Mozbot:{
domains:[ "www.mozbot.fr", "www.mozbot.co.uk", "www.mozbot.com" ],
parameters:[ "q" ]
},
ICQ:{
domains:[ "www.icq.com", "search.icq.com" ],
parameters:[ "q" ]
},
Baidu:{
domains:"www.baidu.com www1.baidu.com zhidao.baidu.com tieba.baidu.com news.baidu.com web.gougou.com".split(" "),
parameters:[ "wd", "word", "kw", "k" ]
},
Conduit:{
domains:[ "search.conduit.com" ],
parameters:[ "q" ]
},
Austronaut:{
domains:[ "www2.austronaut.at", "www1.astronaut.at" ],
parameters:[ "q" ]
},
Vindex:{
domains:[ "www.vindex.nl", "search.vindex.nl" ],
parameters:[ "search_for" ]
},
TrovaRapido:{
domains:[ "www.trovarapido.com" ],
parameters:[ "q" ]
},
"Suchmaschine.com":{
domains:[ "www.suchmaschine.com" ],
parameters:[ "suchstr" ]
},
Lycos:{
domains:[ "search.lycos.com", "www.lycos.com", "lycos.com" ],
parameters:[ "query" ]
},
Vinden:{
domains:[ "www.vinden.nl" ],
parameters:[ "q" ]
},
Altavista:{
domains:"www.altavista.com search.altavista.com listings.altavista.com altavista.de altavista.fr be-nl.altavista.com be-fr.altavista.com".split(" "),
parameters:[ "q" ]
},
dmoz:{
domains:[ "dmoz.org", "editors.dmoz.org" ],
parameters:[ "q" ]
},
Ecosia:{
domains:[ "ecosia.org" ],
parameters:[ "q" ]
},
Maxwebsearch:{
domains:[ "maxwebsearch.com" ],
parameters:[ "query" ]
},
Euroseek:{
domains:[ "www.euroseek.com" ],
parameters:[ "string" ]
},
Bing:{
domains:"bing.com www.bing.com msnbc.msn.com dizionario.it.msn.com cc.bingj.com m.bing.com".split(" "),
parameters:[ "q", "Q" ]
},
"X-recherche":{
domains:[ "www.x-recherche.com" ],
parameters:[ "MOTS" ]
},
"Yandex Images":{
domains:[ "images.yandex.ru", "images.yandex.ua", "images.yandex.com" ],
parameters:[ "text" ]
},
GMX:{
domains:[ "suche.gmx.net" ],
parameters:[ "su" ]
},
"Daemon search":{
domains:[ "daemon-search.com", "my.daemon-search.com" ],
parameters:[ "q" ]
},
"Jungle Key":{
domains:[ "junglekey.com", "junglekey.fr" ],
parameters:[ "query" ]
},
Firstfind:{
domains:[ "www.firstsfind.com" ],
parameters:[ "qry" ]
},
Crawler:{
domains:[ "www.crawler.com" ],
parameters:[ "q" ]
},
Holmes:{
domains:[ "holmes.ge" ],
parameters:[ "q" ]
},
Charter:{
domains:[ "www.charter.net" ],
parameters:[ "q" ]
},
Ilse:{
domains:[ "www.ilse.nl" ],
parameters:[ "search_for" ]
},
earthlink:{
domains:[ "search.earthlink.net" ],
parameters:[ "q" ]
},
Qualigo:{
domains:[ "www.qualigo.at", "www.qualigo.ch", "www.qualigo.de", "www.qualigo.nl" ],
parameters:[ "q" ]
},
"El Mundo":{
domains:[ "ariadna.elmundo.es" ],
parameters:[ "q" ]
},
Metager2:{
domains:[ "metager2.de" ],
parameters:[ "q" ]
},
Forestle:{
domains:[ "forestle.org", "www.forestle.org", "forestle.mobi" ],
parameters:[ "q" ]
},
"Search.ch":{
domains:[ "www.search.ch" ],
parameters:[ "q" ]
},
Meinestadt:{
domains:[ "www.meinestadt.de" ],
parameters:[ "words" ]
},
Freshweather:{
domains:[ "www.fresh-weather.com" ],
parameters:[ "q" ]
},
AllTheWeb:{
domains:[ "www.alltheweb.com" ],
parameters:[ "q" ]
},
Zoek:{
domains:[ "www3.zoek.nl" ],
parameters:[ "q" ]
},
Daum:{
domains:[ "search.daum.net" ],
parameters:[ "q" ]
},
Marktplaats:{
domains:[ "www.marktplaats.nl" ],
parameters:[ "query" ]
},
"suche.info":{
domains:[ "suche.info" ],
parameters:[ "q" ]
},
"Google News":{
domains:"news.google.ac news.google.ad news.google.ae news.google.am news.google.as news.google.at news.google.az news.google.ba news.google.be news.google.bf news.google.bg news.google.bi news.google.bj news.google.bs news.google.by news.google.ca news.google.cat news.google.cc news.google.cd news.google.cf news.google.cg news.google.ch news.google.ci news.google.cl news.google.cm news.google.cn news.google.co.bw news.google.co.ck news.google.co.cr news.google.co.id news.google.co.il news.google.co.in news.google.co.jp news.google.co.ke news.google.co.kr news.google.co.ls news.google.co.ma news.google.co.mz news.google.co.nz news.google.co.th news.google.co.tz news.google.co.ug news.google.co.uk news.google.co.uz news.google.co.ve news.google.co.vi news.google.co.za news.google.co.zm news.google.co.zw news.google.com news.google.com.af news.google.com.ag news.google.com.ai news.google.com.ar news.google.com.au news.google.com.bd news.google.com.bh news.google.com.bn news.google.com.bo news.google.com.br news.google.com.by news.google.com.bz news.google.com.co news.google.com.cu news.google.com.cy news.google.com.do news.google.com.ec news.google.com.eg news.google.com.et news.google.com.fj news.google.com.gh news.google.com.gi news.google.com.gt news.google.com.hk news.google.com.jm news.google.com.kh news.google.com.kh news.google.com.kw news.google.com.lb news.google.com.lc news.google.com.ly news.google.com.mt news.google.com.mx news.google.com.my news.google.com.na news.google.com.nf news.google.com.ng news.google.com.ni news.google.com.np news.google.com.om news.google.com.pa news.google.com.pe news.google.com.ph news.google.com.pk news.google.com.pr news.google.com.py news.google.com.qa news.google.com.sa news.google.com.sb news.google.com.sg news.google.com.sl news.google.com.sv news.google.com.tj news.google.com.tn news.google.com.tr news.google.com.tw news.google.com.ua news.google.com.uy news.google.com.vc news.google.com.vn news.google.cv news.google.cz news.google.de news.google.dj news.google.dk news.google.dm news.google.dz news.google.ee news.google.es news.google.fi news.google.fm news.google.fr news.google.ga news.google.gd news.google.ge news.google.gf news.google.gg news.google.gl news.google.gm news.google.gp news.google.gr news.google.gy news.google.hn news.google.hr news.google.ht news.google.hu news.google.ie news.google.im news.google.io news.google.iq news.google.is news.google.it news.google.it.ao news.google.je news.google.jo news.google.kg news.google.ki news.google.kz news.google.la news.google.li news.google.lk news.google.lt news.google.lu news.google.lv news.google.md news.google.me news.google.mg news.google.mk news.google.ml news.google.mn news.google.ms news.google.mu news.google.mv news.google.mw news.google.ne news.google.nl news.google.no news.google.nr news.google.nu news.google.pl news.google.pn news.google.ps news.google.pt news.google.ro news.google.rs news.google.ru news.google.rw news.google.sc news.google.se news.google.sh news.google.si news.google.sk news.google.sm news.google.sn news.google.so news.google.st news.google.td news.google.tg news.google.tk news.google.tl news.google.tm news.google.to news.google.tt news.google.us news.google.vg news.google.vu news.google.ws".split(" "),
parameters:[ "q" ]
},
Zoohoo:{
domains:[ "zoohoo.cz" ],
parameters:[ "q" ]
},
Seznam:{
domains:[ "search.seznam.cz" ],
parameters:[ "q" ]
},
"Online.no":{
domains:[ "online.no" ],
parameters:[ "q" ]
},
Eurip:{
domains:[ "www.eurip.com" ],
parameters:[ "q" ]
},
"all.by":{
domains:[ "all.by" ],
parameters:[ "query" ]
},
"Road Runner Search":{
domains:[ "search.rr.com" ],
parameters:[ "q" ]
},
"Opplysningen 1881":{
domains:[ "www.1881.no" ],
parameters:[ "Query" ]
},
YouGoo:{
domains:[ "www.yougoo.fr" ],
parameters:[ "q" ]
},
"Bing Images":{
domains:[ "bing.com/images/search", "www.bing.com/images/search" ],
parameters:[ "q", "Q" ]
},
Geona:{
domains:[ "geona.net" ],
parameters:[ "q" ]
},
Nate:{
domains:[ "search.nate.com" ],
parameters:[ "q" ]
},
"T-Online":{
domains:[ "suche.t-online.de", "brisbane.t-online.de", "navigationshilfe.t-online.de" ],
parameters:[ "q" ]
},
Hotbot:{
domains:[ "www.hotbot.com" ],
parameters:[ "query" ]
},
Kvasir:{
domains:[ "www.kvasir.no" ],
parameters:[ "q" ]
},
Babylon:{
domains:[ "search.babylon.com", "searchassist.babylon.com" ],
parameters:[ "q" ]
},
Excite:{
domains:"search.excite.it search.excite.fr search.excite.de search.excite.co.uk serach.excite.es search.excite.nl msxml.excite.com www.excite.co.jp".split(" "),
parameters:[ "q", "search" ]
},
qip:{
domains:[ "search.qip.ru" ],
parameters:[ "query" ]
},
"Yahoo!":{
domains:"search.yahoo.com yahoo.com ar.search.yahoo.com ar.yahoo.com au.search.yahoo.com au.yahoo.com br.search.yahoo.com br.yahoo.com cade.searchde.yahoo.com cade.yahoo.com chinese.searchinese.yahoo.com chinese.yahoo.com cn.search.yahoo.com cn.yahoo.com de.search.yahoo.com de.yahoo.com dk.search.yahoo.com dk.yahoo.com es.search.yahoo.com es.yahoo.com espanol.searchpanol.yahoo.com espanol.searchpanol.yahoo.com espanol.yahoo.com espanol.yahoo.com fr.search.yahoo.com fr.yahoo.com ie.search.yahoo.com ie.yahoo.com it.search.yahoo.com it.yahoo.com kr.search.yahoo.com kr.yahoo.com mx.search.yahoo.com mx.yahoo.com no.search.yahoo.com no.yahoo.com nz.search.yahoo.com nz.yahoo.com one.cn.yahoo.com one.searchn.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.yahoo.com qc.yahoo.com se.search.yahoo.com se.search.yahoo.com se.yahoo.com search.searcharch.yahoo.com search.yahoo.com uk.search.yahoo.com uk.yahoo.com www.yahoo.co.jp search.yahoo.co.jp www.cercato.it search.offerbox.com ys.mirostart.com".split(" "),
parameters:[ "p", "q" ]
},
"URL.ORGanizier":{
domains:[ "www.url.org" ],
parameters:[ "q" ]
},
Witch:{
domains:[ "www.witch.de" ],
parameters:[ "search" ]
},
"Mister Wong":{
domains:[ "www.mister-wong.com", "www.mister-wong.de" ],
parameters:[ "Keywords" ]
},
Startsiden:{
domains:[ "www.startsiden.no" ],
parameters:[ "q" ]
},
"Web.de":{
domains:[ "suche.web.de" ],
parameters:[ "su" ]
},
Ask:{
domains:"ask.com www.ask.com web.ask.com int.ask.com mws.ask.com uk.ask.com images.ask.com ask.reference.com www.askkids.com iwon.ask.com www.ask.co.uk www.qbyrd.com search-results.com uk.search-results.com www.search-results.com int.search-results.com".split(" "),
parameters:[ "q" ]
},
Centrum:{
domains:[ "serach.centrum.cz", "morfeo.centrum.cz" ],
parameters:[ "q" ]
},
Everyclick:{
domains:[ "www.everyclick.com" ],
parameters:[ "keyword" ]
},
"Google Video":{
domains:[ "video.google.com" ],
parameters:[ "q" ]
},
Delfi:{
domains:[ "otsing.delfi.ee" ],
parameters:[ "q" ]
},
blekko:{
domains:[ "blekko.com" ],
parameters:[ "q" ]
},
Jyxo:{
domains:[ "jyxo.1188.cz" ],
parameters:[ "q" ]
},
Kataweb:{
domains:[ "www.kataweb.it" ],
parameters:[ "q" ]
},
"uol.com.br":{
domains:[ "busca.uol.com.br" ],
parameters:[ "q" ]
},
Arianna:{
domains:[ "arianna.libero.it", "www.arianna.com" ],
parameters:[ "query" ]
},
Mamma:{
domains:[ "www.mamma.com", "mamma75.mamma.com" ],
parameters:[ "query" ]
},
Yatedo:{
domains:[ "www.yatedo.com", "www.yatedo.fr" ],
parameters:[ "q" ]
},
Twingly:{
domains:[ "www.twingly.com" ],
parameters:[ "q" ]
},
"Delfi latvia":{
domains:[ "smart.delfi.lv" ],
parameters:[ "q" ]
},
PriceRunner:{
domains:[ "www.pricerunner.co.uk" ],
parameters:[ "q" ]
},
Rakuten:{
domains:[ "websearch.rakuten.co.jp" ],
parameters:[ "qt" ]
},
Google:{
domains:"www.google.com www.google.ac www.google.ad www.google.com.af www.google.com.ag www.google.com.ai www.google.am www.google.it.ao www.google.com.ar www.google.as www.google.at www.google.com.au www.google.az www.google.ba www.google.com.bd www.google.be www.google.bf www.google.bg www.google.com.bh www.google.bi www.google.bj www.google.com.bn www.google.com.bo www.google.com.br www.google.bs www.google.co.bw www.google.com.by www.google.by www.google.com.bz www.google.ca www.google.com.kh www.google.cc www.google.cd www.google.cf www.google.cat www.google.cg www.google.ch www.google.ci www.google.co.ck www.google.cl www.google.cm www.google.cn www.google.com.co www.google.co.cr www.google.com.cu www.google.cv www.google.com.cy www.google.cz www.google.de www.google.dj www.google.dk www.google.dm www.google.com.do www.google.dz www.google.com.ec www.google.ee www.google.com.eg www.google.es www.google.com.et www.google.fi www.google.com.fj www.google.fm www.google.fr www.google.ga www.google.gd www.google.ge www.google.gf www.google.gg www.google.com.gh www.google.com.gi www.google.gl www.google.gm www.google.gp www.google.gr www.google.com.gt www.google.gy www.google.com.hk www.google.hn www.google.hr www.google.ht www.google.hu www.google.co.id www.google.iq www.google.ie www.google.co.il www.google.im www.google.co.in www.google.io www.google.is www.google.it www.google.je www.google.com.jm www.google.jo www.google.co.jp www.google.co.ke www.google.com.kh www.google.ki www.google.kg www.google.co.kr www.google.com.kw www.google.kz www.google.la www.google.com.lb www.google.com.lc www.google.li www.google.lk www.google.co.ls www.google.lt www.google.lu www.google.lv www.google.com.ly www.google.co.ma www.google.md www.google.me www.google.mg www.google.mk www.google.ml www.google.mn www.google.ms www.google.com.mt www.google.mu www.google.mv www.google.mw www.google.com.mx www.google.com.my www.google.co.mz www.google.com.na www.google.ne www.google.com.nf www.google.com.ng www.google.com.ni www.google.nl www.google.no www.google.com.np www.google.nr www.google.nu www.google.co.nz www.google.com.om www.google.com.pa www.google.com.pe www.google.com.ph www.google.com.pk www.google.pl www.google.pn www.google.com.pr www.google.ps www.google.pt www.google.com.py www.google.com.qa www.google.ro www.google.rs www.google.ru www.google.rw www.google.com.sa www.google.com.sb www.google.sc www.google.se www.google.com.sg www.google.sh www.google.si www.google.sk www.google.com.sl www.google.sn www.google.sm www.google.so www.google.st www.google.com.sv www.google.td www.google.tg www.google.co.th www.google.com.tj www.google.tk www.google.tl www.google.tm www.google.to www.google.com.tn www.google.com.tr www.google.tt www.google.com.tw www.google.co.tz www.google.com.ua www.google.co.ug www.google.ae www.google.co.uk www.google.us www.google.com.uy www.google.co.uz www.google.com.vc www.google.co.ve www.google.vg www.google.co.vi www.google.com.vn www.google.vu www.google.ws www.google.co.za www.google.co.zm www.google.co.zw google.com google.ac google.ad google.com.af google.com.ag google.com.ai google.am google.it.ao google.com.ar google.as google.at google.com.au google.az google.ba google.com.bd google.be google.bf google.bg google.com.bh google.bi google.bj google.com.bn google.com.bo google.com.br google.bs google.co.bw google.com.by google.by google.com.bz google.ca google.com.kh google.cc google.cd google.cf google.cat google.cg google.ch google.ci google.co.ck google.cl google.cm google.cn google.com.co google.co.cr google.com.cu google.cv google.com.cy google.cz google.de google.dj google.dk google.dm google.com.do google.dz google.com.ec google.ee google.com.eg google.es google.com.et google.fi google.com.fj google.fm google.fr google.ga google.gd google.ge google.gf google.gg google.com.gh google.com.gi google.gl google.gm google.gp google.gr google.com.gt google.gy google.com.hk google.hn google.hr google.ht google.hu google.co.id google.iq google.ie google.co.il google.im google.co.in google.io google.is google.it google.je google.com.jm google.jo google.co.jp google.co.ke google.com.kh google.ki google.kg google.co.kr google.com.kw google.kz google.la google.com.lb google.com.lc google.li google.lk google.co.ls google.lt google.lu google.lv google.com.ly google.co.ma google.md google.me google.mg google.mk google.ml google.mn google.ms google.com.mt google.mu google.mv google.mw google.com.mx google.com.my google.co.mz google.com.na google.ne google.com.nf google.com.ng google.com.ni google.nl google.no google.com.np google.nr google.nu google.co.nz google.com.om google.com.pa google.com.pe google.com.ph google.com.pk google.pl google.pn google.com.pr google.ps google.pt google.com.py google.com.qa google.ro google.rs google.ru google.rw google.com.sa google.com.sb google.sc google.se google.com.sg google.sh google.si google.sk google.com.sl google.sn google.sm google.so google.st google.com.sv google.td google.tg google.co.th google.com.tj google.tk google.tl google.tm google.to google.com.tn google.com.tr google.tt google.com.tw google.co.tz google.com.ua google.co.ug google.ae google.co.uk google.us google.com.uy google.co.uz google.com.vc google.co.ve google.vg google.co.vi google.com.vn google.vu google.ws google.co.za google.co.zm google.co.zw search.avg.com isearch.avg.com www.cnn.com darkoogle.com search.darkoogle.com search.foxtab.com www.gooofullsearch.com search.hiyo.com search.incredimail.com search1.incredimail.com search2.incredimail.com search3.incredimail.com search4.incredimail.com search.incredibar.com search.sweetim.com www.fastweb.it search.juno.com find.tdc.dk searchresults.verizon.com search.walla.co.il search.alot.com www.googleearth.de www.googleearth.fr webcache.googleusercontent.com encrypted.google.com googlesyndicatedsearch.com".split(" "),
parameters:[ "q", "query", "Keywords" ]
},
"Google Blogsearch":{
domains:"blogsearch.google.ac blogsearch.google.ad blogsearch.google.ae blogsearch.google.am blogsearch.google.as blogsearch.google.at blogsearch.google.az blogsearch.google.ba blogsearch.google.be blogsearch.google.bf blogsearch.google.bg blogsearch.google.bi blogsearch.google.bj blogsearch.google.bs blogsearch.google.by blogsearch.google.ca blogsearch.google.cat blogsearch.google.cc blogsearch.google.cd blogsearch.google.cf blogsearch.google.cg blogsearch.google.ch blogsearch.google.ci blogsearch.google.cl blogsearch.google.cm blogsearch.google.cn blogsearch.google.co.bw blogsearch.google.co.ck blogsearch.google.co.cr blogsearch.google.co.id blogsearch.google.co.il blogsearch.google.co.in blogsearch.google.co.jp blogsearch.google.co.ke blogsearch.google.co.kr blogsearch.google.co.ls blogsearch.google.co.ma blogsearch.google.co.mz blogsearch.google.co.nz blogsearch.google.co.th blogsearch.google.co.tz blogsearch.google.co.ug blogsearch.google.co.uk blogsearch.google.co.uz blogsearch.google.co.ve blogsearch.google.co.vi blogsearch.google.co.za blogsearch.google.co.zm blogsearch.google.co.zw blogsearch.google.com blogsearch.google.com.af blogsearch.google.com.ag blogsearch.google.com.ai blogsearch.google.com.ar blogsearch.google.com.au blogsearch.google.com.bd blogsearch.google.com.bh blogsearch.google.com.bn blogsearch.google.com.bo blogsearch.google.com.br blogsearch.google.com.by blogsearch.google.com.bz blogsearch.google.com.co blogsearch.google.com.cu blogsearch.google.com.cy blogsearch.google.com.do blogsearch.google.com.ec blogsearch.google.com.eg blogsearch.google.com.et blogsearch.google.com.fj blogsearch.google.com.gh blogsearch.google.com.gi blogsearch.google.com.gt blogsearch.google.com.hk blogsearch.google.com.jm blogsearch.google.com.kh blogsearch.google.com.kh blogsearch.google.com.kw blogsearch.google.com.lb blogsearch.google.com.lc blogsearch.google.com.ly blogsearch.google.com.mt blogsearch.google.com.mx blogsearch.google.com.my blogsearch.google.com.na blogsearch.google.com.nf blogsearch.google.com.ng blogsearch.google.com.ni blogsearch.google.com.np blogsearch.google.com.om blogsearch.google.com.pa blogsearch.google.com.pe blogsearch.google.com.ph blogsearch.google.com.pk blogsearch.google.com.pr blogsearch.google.com.py blogsearch.google.com.qa blogsearch.google.com.sa blogsearch.google.com.sb blogsearch.google.com.sg blogsearch.google.com.sl blogsearch.google.com.sv blogsearch.google.com.tj blogsearch.google.com.tn blogsearch.google.com.tr blogsearch.google.com.tw blogsearch.google.com.ua blogsearch.google.com.uy blogsearch.google.com.vc blogsearch.google.com.vn blogsearch.google.cv blogsearch.google.cz blogsearch.google.de blogsearch.google.dj blogsearch.google.dk blogsearch.google.dm blogsearch.google.dz blogsearch.google.ee blogsearch.google.es blogsearch.google.fi blogsearch.google.fm blogsearch.google.fr blogsearch.google.ga blogsearch.google.gd blogsearch.google.ge blogsearch.google.gf blogsearch.google.gg blogsearch.google.gl blogsearch.google.gm blogsearch.google.gp blogsearch.google.gr blogsearch.google.gy blogsearch.google.hn blogsearch.google.hr blogsearch.google.ht blogsearch.google.hu blogsearch.google.ie blogsearch.google.im blogsearch.google.io blogsearch.google.iq blogsearch.google.is blogsearch.google.it blogsearch.google.it.ao blogsearch.google.je blogsearch.google.jo blogsearch.google.kg blogsearch.google.ki blogsearch.google.kz blogsearch.google.la blogsearch.google.li blogsearch.google.lk blogsearch.google.lt blogsearch.google.lu blogsearch.google.lv blogsearch.google.md blogsearch.google.me blogsearch.google.mg blogsearch.google.mk blogsearch.google.ml blogsearch.google.mn blogsearch.google.ms blogsearch.google.mu blogsearch.google.mv blogsearch.google.mw blogsearch.google.ne blogsearch.google.nl blogsearch.google.no blogsearch.google.nr blogsearch.google.nu blogsearch.google.pl blogsearch.google.pn blogsearch.google.ps blogsearch.google.pt blogsearch.google.ro blogsearch.google.rs blogsearch.google.ru blogsearch.google.rw blogsearch.google.sc blogsearch.google.se blogsearch.google.sh blogsearch.google.si blogsearch.google.sk blogsearch.google.sm blogsearch.google.sn blogsearch.google.so blogsearch.google.st blogsearch.google.td blogsearch.google.tg blogsearch.google.tk blogsearch.google.tl blogsearch.google.tm blogsearch.google.to blogsearch.google.tt blogsearch.google.us blogsearch.google.vg blogsearch.google.vu blogsearch.google.ws".split(" "),
parameters:[ "q" ]
},
Amazon:{
domains:[ "amazon.com", "www.amazon.com" ],
parameters:[ "keywords" ]
},
"Hooseek.com":{
domains:[ "www.hooseek.com" ],
parameters:[ "recherche" ]
},
Dalesearch:{
domains:[ "www.dalesearch.com" ],
parameters:[ "q" ]
},
"Alice Adsl":{
domains:[ "rechercher.aliceadsl.fr" ],
parameters:[ "q" ]
},
"soso.com":{
domains:[ "www.soso.com" ],
parameters:[ "w" ]
},
Sogou:{
domains:[ "www.sougou.com" ],
parameters:[ "query" ]
},
"Hit-Parade":{
domains:[ "req.-hit-parade.com", "class.hit-parade.com", "www.hit-parade.com" ],
parameters:[ "p7" ]
},
SearchCanvas:{
domains:[ "www.searchcanvas.com" ],
parameters:[ "q" ]
},
Interia:{
domains:[ "www.google.interia.pl" ],
parameters:[ "q" ]
},
Tiscali:{
domains:[ "search.tiscali.it", "search-dyn.tiscali.it", "hledani.tiscali.cz" ],
parameters:[ "q", "key" ]
},
Clix:{
domains:[ "pesquisa.clix.pt" ],
parameters:[ "question" ]
}
},
email:{
"Outlook.com":{
domains:[ "mail.live.com" ]
},
"Orange Webmail":{
domains:[ "orange.fr/webmail" ]
},
"Yahoo! Mail":{
domains:[ "mail.yahoo.net", "mail.yahoo.com", "mail.yahoo.co.uk" ]
},
Gmail:{
domains:[ "mail.google.com" ]
}
},
social:{
hi5:{
domains:[ "hi5.com" ]
},
Friendster:{
domains:[ "friendster.com" ]
},
Weibo:{
domains:[ "weibo.com", "t.cn" ]
},
Xanga:{
domains:[ "xanga.com" ]
},
Myspace:{
domains:[ "myspace.com" ]
},
Buzznet:{
domains:[ "wayn.com" ]
},
MyLife:{
domains:[ "mylife.ru" ]
},
Flickr:{
domains:[ "flickr.com" ]
},
"Sonico.com":{
domains:[ "sonico.com" ]
},
Odnoklassniki:{
domains:[ "odnoklassniki.ru" ]
},
GitHub:{
domains:[ "github.com" ]
},
Classmates:{
domains:[ "classmates.com" ]
},
"Friends Reunited":{
domains:[ "friendsreunited.com" ]
},
Renren:{
domains:[ "renren.com" ]
},
"vKruguDruzei.ru":{
domains:[ "vkrugudruzei.ru" ]
},
"Gaia Online":{
domains:[ "gaiaonline.com" ]
},
Netlog:{
domains:[ "netlog.com" ]
},
Orkut:{
domains:[ "orkut.com" ]
},
MyHeritage:{
domains:[ "myheritage.com" ]
},
Multiply:{
domains:[ "multiply.com" ]
},
myYearbook:{
domains:[ "myyearbook.com" ]
},
WeeWorld:{
domains:[ "weeworld.com" ]
},
Geni:{
domains:[ "geni.com" ]
},
SourceForge:{
domains:[ "sourceforge.net" ]
},
Plaxo:{
domains:[ "plaxo.com" ]
},
"Taringa!":{
domains:[ "taringa.net" ]
},
Tagged:{
domains:[ "login.tagged.com" ]
},
XING:{
domains:[ "xing.com" ]
},
Vkontakte:{
domains:[ "vk.com", "vkontakte.ru" ]
},
Twitter:{
domains:[ "twitter.com", "t.co" ]
},
WAYN:{
domains:[ "wayn.com" ]
},
Tuenti:{
domains:[ "tuenti.com" ]
},
"Mail.ru":{
domains:[ "my.mail.ru" ]
},
Badoo:{
domains:[ "badoo.com" ]
},
Habbo:{
domains:[ "habbo.com" ]
},
Pinterest:{
domains:[ "pinterest.com" ]
},
LinkedIn:{
domains:[ "linkedin.com" ]
},
Foursquare:{
domains:[ "foursquare.com" ]
},
Flixster:{
domains:[ "flixster.com" ]
},
"Windows Live Spaces":{
domains:[ "login.live.com" ]
},
BlackPlanet:{
domains:[ "blackplanet.com" ]
},
Cyworld:{
domains:[ "global.cyworld.com" ]
},
Skyrock:{
domains:[ "skyrock.com" ]
},
Facebook:{
domains:[ "facebook.com", "fb.me" ]
},
StudiVZ:{
domains:[ "studivz.net" ]
},
Fotolog:{
domains:[ "fotolog.com" ]
},
"Google+":{
domains:[ "url.google.com", "plus.google.com" ]
},
"Nasza-klasa.pl":{
domains:[ "nk.pl" ]
},
Douban:{
domains:[ "douban.com" ]
},
Bebo:{
domains:[ "bebo.com" ]
},
Reddit:{
domains:[ "reddit.com" ]
},
"Identi.ca":{
domains:[ "identi.ca" ]
},
StackOverflow:{
domains:[ "stackoverflow.com" ]
},
Mixi:{
domains:[ "mixi.jp" ]
},
StumbleUpon:{
domains:[ "stumbleupon.com" ]
},
Viadeo:{
domains:[ "viadeo.com" ]
},
"Last.fm":{
domains:[ "lastfm.ru" ]
},
LiveJournal:{
domains:[ "livejournal.ru" ]
},
Tumblr:{
domains:[ "tumblr.com" ]
},
"Hacker News":{
domains:[ "news.ycombinator.com" ]
},
Qzone:{
domains:[ "qzone.qq.com" ]
},
Hyves:{
domains:[ "hyves.nl" ]
},
"Paper.li":{
domains:[ "paper.li" ]
},
"MoiKrug.ru":{
domains:[ "moikrug.ru" ]
}
}
};
}.call(this), function() {
$B.QueryStringParser = function() {
function e(e) {
var t, n;
if (this.query_params = {}, !document || !document.createElement) throw "This needs to be run in an HTML context with a document.";
t = document.createElement("a"), t.href = e, this.url = e, this.origin = t.origin ? t.origin :[ t.protocol, "//", t.host ].join(""), 
this.protocol = t.protocol, this.pathname = t.pathname, this.hostname = t.hostname, 
this.hash = t.hash, n = this, _.each(t.search.substr(1).split("&"), function(e) {
var t;
return t = e.split("="), n.query_params[t[0]] = t[1];
});
}
return e.prototype.toString = function() {
var e, t;
return t = _.compact(_.map(this.query_params, function(e, t) {
return "undefined" != typeof e && null !== e ? [ t, e ].join("=") :void 0;
})).join("&"), e = [ this.origin, this.pathname ].join(""), t && (e += "?" + t), 
this.hash && (e += this.hash), e;
}, e;
}(), $B.ReferrerParser = function() {
function e(e, t) {
var n;
this.url = t, this.referrers_map = this.loadReferrers(e), this.known = !1, this.referrer = null, 
this.medium = "unknown", this.search_parameter = null, this.search_term = null, 
n = new $B.QueryStringParser(this.url), this.host = n.hostname, this.path = n.pathname, 
this.referrer = this.lookup_referrer(this.host, this.path);
}
return e.prototype.lookup_referrer = function(e) {
var t;
return t = this.referrers_map[e];
}, e.prototype.loadReferrers = function(e) {
var t, n, i, o, r, a;
a = {};
for (i in e) {
t = e[i];
for (r in t) n = t[r], o = null, n.parameters && (o = n.parameters.map(function(e) {
return e.toLowerCase();
})), n.domains.forEach(function(e) {
return a[e] = {
name:r,
medium:i
}, o ? a[e].params = o :void 0;
});
}
return a;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.UserAnalyticsEngine = function() {
function t(t, n, i) {
this.user_id = t, this.user_email = n, this.urlBase = i, this.save = e(this.save, this), 
this.track = e(this.track, this), this.trackWithoutExternalService = e(this.trackWithoutExternalService, this), 
null == this.urlBase && (this.urlBase = $S.global_conf.BOBCAT_ANALYTICS_POST_URL);
}
return t.prototype.trackWithoutExternalService = function(e) {
return this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.track = function(e, t) {
return "function" == typeof $B.log && $B.log("[TRACKING] " + e, t), window.analytics.track(e, t), 
this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.save = function(e, t) {
var n = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:e,
event:t
},
success:function(e) {
return "Editor - edit" === t ? _veroq.push([ "user", {
id:n.user_id,
edit_count:e.count
} ]) :void 0;
},
dataType:"json"
});
}, t;
}(), $B.PageAnalyticsEngine = function() {
function t(t) {
this.pageData = t, this.sendPbsConversion = e(this.sendPbsConversion, this), this.sendPbsImpression = e(this.sendPbsImpression, this), 
this.normalizedReferrer = e(this.normalizedReferrer, this), this.sendDataKeenIO = e(this.sendDataKeenIO, this), 
this.logSocialClicks = e(this.logSocialClicks, this), this.logPageView = e(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return t.prototype.pingInterval = 1e4, t.prototype.setInternalTracking = function() {
var e, t;
return (t = $S.page_meta.strk_upvt) ? (e = {
thm:this.pageData.theme.name,
mem:this.pageData.membership,
brd:this.pageData.showStrikinglyLogo,
v:t
}, $("<iframe />", {
name:"strk-tracking",
id:"strk-tracking",
src:"//b.strikingly.com/ping.html?" + $.param(e)
}).appendTo("body")) :void 0;
}, t.prototype.trackPageEvent = function() {
var e;
return e = function(e, t) {
return function(n) {
var i, o, r;
return r = $(this), i = {
url:r.attr("href"),
target:r.attr("target"),
text:r.text()
}, window.edit_page.Event.publish(e, i), _gaq.push([ "_setCustomVar", 1, "url", i.url, 3 ]), 
_gaq.push([ "_setCustomVar", 2, "text", i.text, 3 ]), _gaq.push([ "_trackEvent", "Actions", t.gaEventName ]), 
o = "#" !== i.url[0], i.url && "_blank" !== i.target && o ? (n.preventDefault(), 
setTimeout(function() {
return window.location.href = i.url;
}, 500)) :void 0;
};
}, $("[data-component='button']").click(e("Site.button.click", {
gaEventName:"ButtonClick"
}));
}, t.prototype.logPageView = function() {
var e, t, n, i, o;
e = _.extend({
eventName:"PageView"
}, this.baseData), t = 1, o = this.baseData;
for (n in o) i = o[n], _gaq.push([ "_setCustomVar", t, n, i, 3 ]), ++t;
return _gaq.push([ "_trackEvent", "Page", e.eventName ]), this.sendDataKeenIO(this.baseData);
}, t.prototype.logSocialClicks = function(e) {
var t;
return t = _.extend({
eventName:"SocialClicks",
channel:e
}, this.baseData);
}, t.prototype.sendDataKeenIO = function(e) {
var t, n;
return n = e.referrer.split("/")[2], t = _.extend({
keen:{
addons:[ {
name:"keen:ip_to_geo",
input:{
ip:"ip_address"
},
output:"ip_geo_info"
}, {
name:"keen:ua_parser",
input:{
ua_string:"user_agent"
},
output:"parsed_user_agent"
} ]
},
ip_address:"${keen.ip}",
user_agent:"${keen.user_agent}",
host:document.location.host,
referrer_host:n,
normalized_referrer:this.normalizedReferrer(e.referrer)
}, e), Keen.addEvent($S.conf.keenio_collection, t);
}, t.prototype.normalizedReferrer = function(e) {
var t, n;
return t = new $B.ReferrerParser($B.referrers_source, e), (null != (n = t.referrer) ? n.name :void 0) || t.url || "Direct Traffic";
}, t.prototype.sendPbsImpression = function(e) {
return $B.log("[PBS] Impression", e), Keen.addEvent($S.conf.keenio_pbs_impression_collection, e);
}, t.prototype.sendPbsConversion = function(e) {
return $B.log("[PBS] Conversion", e), Keen.addEvent($S.conf.keenio_pbs_conversion_collection, e);
}, t;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function i() {
this.constructor = t;
}
for (var o in n) e.call(n, o) && (t[o] = n[o]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
}, n = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
window.partial = function(e, t) {
return _.template($("#" + e + "-partial").html(), t);
}, Bobcat.IndexGenerator = function() {
function e() {
this.currentIndex = 0;
}
return e.prototype.increment = function() {
return this.currentIndex += 1;
}, e.prototype.getNext = function() {
var e;
return e = this.currentIndex, this.increment(), "model" + e;
}, e;
}(), Bobcat.PageTransformer = function() {
function e(e, t) {
this.domTree = e, this.isEdit = t, this.textTransformer = new Bobcat.TextTransformer(), 
this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
}
return e.prototype.transform = function() {
var e, t, n, i, o, r, a, s, l, u, c, d, h, p, f, g;
for (p = this.domTree.find("[data-component='repeatable_item_template']"), r = 0, 
u = p.length; u > r; r++) n = p[r], t = $(n), $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
for (this.indexGenerator = new Bobcat.IndexGenerator(), o = [ this.textTransformer, this.imageTransformer, this.htmlTransformer ], 
a = 0, c = o.length; c > a; a++) i = o[a], i.indexGenerator = this.indexGenerator;
for (s = 0, d = o.length; d > s; s++) i = o[s], i.transform(this.domTree, this.isEdit);
for (f = this.domTree.find("[data-component='repeatable_item_template']"), g = [], 
l = 0, h = f.length; h > l; l++) n = f[l], t = $(n), e = $("#" + t.attr("id") + "_temp"), 
$.browser.msie && parseInt($.browser.version) > 7 && e.find("*").filter(function() {
return "" !== $(this).attr("class");
}).addClass("ie-fix"), n.text = e.html(), g.push(e.remove());
return g;
}, e;
}(), Bobcat.Transformer = function() {
function e() {}
return e.prototype.validateName = function(e) {
return null == e.attr("data-name") && (this.warning("The following DOM doesn't have data-name."), 
this.warning(e)), !0;
}, e.prototype.getDataName = function(e) {
var t;
return t = e.attr("data-name"), t || (t = this.indexGenerator.getNext()), t;
}, e.prototype.clearDom = function(e) {
return e.html("");
}, e.prototype.isEditable = function(e) {
var t;
return t = e.attr("data-show"), "true" !== t;
}, e.prototype.warning = function(e) {
return console.warn(e);
}, e.prototype.error = function(e) {
return console.error(e);
}, e;
}(), Bobcat.TextTransformer = function(e) {
function i() {}
return t(i, e), i.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = null != t ? t :!1, this.domTree.find("[data-component='text']").each(function(e, t) {
var i;
return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, i.prototype.getTextType = function(e) {
var t;
if (t = e.attr("data-text-type")) {
if ("heading" === t) return "headingFont";
if ("title" === t) return "titleFont";
if ("navigation" === t) return "navFont";
}
return "bodyFont";
}, i.prototype.getUseFont = function(e) {
var t;
return t = e.attr("data-use-font"), "false" === t ? !1 :!0;
}, i.prototype.buildData = function(e) {
var t, n, i, o;
return t = e.html(), n = this.getDataName(e), i = this.getTextType(e), o = this.getUseFont(e), 
{
content:t,
name:n,
textType:i,
useFont:o
};
}, i.prototype.transformToShow = function(e) {
var t, n;
return t = this.buildData(e), e.addClass("text-component").html(""), n = $.trim(_.template($("#textContent-partial").html())(t)), 
$(n).appendTo(e);
}, i.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable text-component"), 
e.attr("data-text-type", "" + t.textType), e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-text': " + t.name + ".showEmptyText()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#textEditor").html())(t)), $(n).appendTo(e);
}, i.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateTextType(e);
}, i.prototype.validateTextType = function(e) {
var t, i, o, r;
return o = !0, i = e.attr("data-text-type"), t = [ "body", "heading", "title", "navigation" ], 
i && (r = !i, n.call(t, r) >= 0 && (o = !1, this.warning("data-text-type should be one of " + t.join(", ")), 
this.warning(e))), o;
}, i;
}(Bobcat.Transformer), Bobcat.ImageTransformer = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='image']").each(function(e, t) {
var i;
return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e);
}, n.prototype.getImageDom = function(e) {
return e.imageDom ? e.imageDom :e.imageDom = e.find("img").first();
}, n.prototype.validateUrl = function(e) {
return "undefined" == typeof this.getImageDom(e).attr("src") ? (this.error("img doesn't have a src"), 
this.error(this.getImageDom(e)), !1) :!0;
}, n.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable image-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#imageEditor").html())(t)), $(n).appendTo(e);
}, n.prototype.transformToShow = function(e) {
var t, n;
return t = this.buildData(e), e.html(""), n = $.trim(_.template($("#imageContent-partial").html())(t)), 
$(n).appendTo(e);
}, n.prototype.validateSize = function(e) {
return "small" === e || "medium" === e || "large" === e || "background" === e ? !0 :/^\d+x\d+[><^#]+$/.test(e) ? !0 :"undefined" == typeof e ? !0 :!1;
}, n.prototype.validateThumbSize = function(e) {
var t, n;
return t = e.attr("data-thumb-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"), 
this.warning(e)), n;
}, n.prototype.validateImageSize = function(e) {
var t, n;
return t = e.attr("data-image-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"), 
this.warning(e)), n;
}, n.prototype.getImageSize = function(e) {
var t;
return t = e.attr("data-image-size"), t || (t = "medium");
}, n.prototype.getThumbSize = function(e) {
var t;
return t = e.attr("data-thumb-size"), t || (t = "128x128#");
}, n.prototype.getHasUrl = function(e) {
var t;
return t = e.attr("data-use-url"), "true" === t;
}, n.prototype.getAssetUrls = function(e) {
var t;
return t = e.attr("data-assets"), t ? t.split(" ") :[];
}, n.prototype.buildData = function(e) {
var t, n, i, o, r, a, s, l;
return s = this.getImageDom(e).attr("src"), n = this.getImageDom(e).attr("alt"), 
o = this.getDataName(e), t = this.getAssetUrls(e), r = this.getImageSize(e), a = this.getThumbSize(e), 
l = this.getHasUrl(e), n || (n = ""), i = {
url:s,
caption:n,
name:o,
imageSize:r,
useUrl:l,
thumbSize:a,
assetUrls:t
};
}, n;
}(Bobcat.Transformer), Bobcat.HtmlTransformer = function(e) {
function n() {}
return t(n, e), n.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='html']").each(function(e, t) {
var i;
return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e);
}, n.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable html-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#htmlEditor").html())(t)), $(n).appendTo(e);
}, n.prototype.buildData = function(e) {
return {
name:this.getDataName(e)
};
}, n.prototype.transformToShow = function() {}, n;
}(Bobcat.Transformer);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
Bobcat.ShowPage = function() {
function t(t) {
this.checkIframe = e(this.checkIframe, this), this.initAfterBindings = e(this.initAfterBindings, this), 
this.initBindings = e(this.initBindings, this), this.data = new Bobcat.PageData(t), 
this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
}
return t.prototype.initBindings = function() {
return this.data.removePremiumSlides(), this.data.bindSlides();
}, t.prototype.initAfterBindings = function() {
var e, t, n, i;
for (Bobcat.TH.initPageHelpers(), i = window.runAfterDomBinding.getAllJobs(), t = 0, 
n = i.length; n > t; t++) (e = i[t])();
return this.checkIframe();
}, t.prototype.registerUserAnalytics = function() {
return $B.siteMeta("google_analytics_tracker") && (_gaq.push([ "b._trackPageview" ]), 
_gaq.push([ "b._setAccount" ], $B.siteMeta("google_analytics_tracker"))), $B.siteMeta("custom_domain") ? _gaq.push([ "b._setDomainName", $B.siteMeta("custom_domain") ]) :void 0;
}, t.prototype.checkIframe = function() {
var e, t;
return window.top.location !== window.location && document.referrer && (t = $B.meta("strikingly-host-suffix"), 
t && (e = $.url(document.referrer).attr("host"), !e.match("" + t + "$"))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."), 
window.top.location = window.location) :void 0;
}, t;
}();
}.call(this), function() {
window.$B = window.Bobcat || {}, $B.TH = {
fixNavOnScroll:function(e, t, n) {
var i, o;
return null == n && (n = 0), $B.TH.isSmallScreen() ? void 0 :(i = function() {
return $("ul.slides li.slide").css({
"padding-top":0
}), $B.TH.isSmallScreen() ? e.css("position", "static") :(e.css("position", "fixed"), 
$("ul.slides li.slide").first().css({
"padding-top":e.outerHeight(!1)
}));
}, o = function() {
var i, o, r, a;
return o = e.outerHeight() - t.height() - n, 0 !== e.length ? (i = $(window).height(), 
r = e.height(), a = $(window).scrollTop(), a > o && (a = o), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()), 
e.stop().animate({
top:-a
})) :void 0;
}, $(window).scroll(o), $(window).resize(i), setTimeout(i, 2e3), i());
},
isMobile:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
},
isAndroid:function() {
return navigator.userAgent.match(/(android)/i);
},
isWindowsPhone:function() {
return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
},
isIpad:function() {
return navigator.userAgent.match(/(iPad)/i);
},
isIOS:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
},
isSmallScreen:function() {
return $(window).width() <= 727 || $(window).height() < 400;
},
iOSversion:function() {
var e, t;
return /iP(hone|od|ad)/.test(navigator.platform) ? (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), 
t = [ parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10) ], t[0]) :void 0;
},
androidVersion:function() {
var e;
return $B.TH.isAndroid() ? (e = navigator.userAgent, parseFloat(e.slice(e.indexOf("Android") + 8))) :void 0;
},
isAndroid2x:function() {
return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
},
shiftBody:function(e) {
var t, n;
return n = $("#s-content"), t = $("body"), e ? n.addClass("translate-" + e) :n.removeClass("translate-right translate-left"), 
t.css({
overflow:"visible",
"overflow-x":"visible"
}), n.css({
width:"auto"
});
},
shiftDrawer:function(e, t, n, i) {
return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"), 
$(".navbar-drawer").toggleClass("translate");
},
shiftMobileDrawer:function(e, t, n, i) {
var o;
return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"), 
o = $(".mobile-drawer"), t ? o.css({
right:e
}) :o.animate({
right:e
}, n, i);
},
toggleDrawer:function(e) {
var t, n, i, o, r, a, s, l;
return null == e && (e = !0), o = $(".navbar-drawer"), r = $(".navbar-drawer-bar"), 
i = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", t = "translate-left", 
n = "translate-right") :(s = "shown", t = "left", n = "right"), o.hasClass(s) ? (r.removeClass(t + " " + n), 
o.removeClass(s)) :(r.removeClass(t).addClass(n), o.addClass(s)), a = $(".mobile-actions"), 
a.removeClass(s), $B.TH.androidVersion() < 3 && (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)), 
o.css("top", 1), setTimeout(function() {
return o.css("top", 0);
}, 100);
},
toggleMobileDrawer:function(e) {
var t, n;
return null == e && (e = !0), t = $(".mobile-actions"), 0 !== t.length ? (n = $B.TH.canAnimateCSS() ? "translate" :"shown", 
t.hasClass(n) ? t.removeClass(n) :t.addClass(n)) :void 0;
},
detectCSSFeature:function(e) {
var t, n, i, o, r, a, s;
if (i = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
e = e.toLowerCase(), o = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== n.style[r + o]) return !0;
return !1;
},
canAnimateCSS:function() {
return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x() && !$B.TH.isWindowsPhone();
},
isIE:function() {
var e;
return e = navigator.userAgent.toLowerCase(), -1 !== e.indexOf("msie") ? parseInt(e.split("msie")[1]) :!1;
},
enableAnimationForBlocks:function(e, t) {
return null == e && (e = "75%"), null == t && (t = !1), t || window.edit_page.isShowPage && !$B.TH.isMobile() && !($B.TH.isIE() && $B.TH.isIE() <= 9) ? ($(".fadeInUp").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInUp");
}, 5e3);
}, {
offset:e
}), $(".fadeInRight").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInRight");
}, 5e3);
}, {
offset:e
}), $(".fadeInLeft").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInLeft");
}, 5e3);
}, {
offset:e
})) :$(".fadeInUp, .fadeInRight, .fadeInLeft").css("opacity", 1);
},
applyTouchNav:function() {
var e, t, n;
return $B.getCustomization("disableMobileNav") ? $(".strikingly-nav-spacer").hide() :(e = $(".navbar-touch").first(), 
$(".navbar-drawer").length && (n = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"), 
$(".mobile-actions").css({
height:$(".mobile-actions").height()
}), $("body").bind("touchstart", function() {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"), 
$B.TH.isAndroid2x() ? $(window).height() < n.height() && (n.css({
overflow:"visible",
height:"auto"
}), $(window).scroll(function() {
var e, t, i, o;
return e = parseInt(n.attr("data-top"), 10), e || 0 === e ? (o = $(window).scrollTop(), 
i = e - o, i > 0 && (i = 0), t = $(window).height() - n.height(), t > i && (i = t), 
n.css({
top:i
})) :void 0;
})) :n.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"), 
t = $(".navbar-drawer-bar .navbar-drawer-title"), t.width() < 170 && t.height() < 20 && t.addClass("big"))), 
$(window).resize(function() {
return n = $("#nav-drawer-list"), $B.TH.isAndroid2x() || n.height($(window).height()), 
$(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() :void 0;
});
},
enableSlider:function(e) {
var t, n, i, o, r, a, s, l, u, c;
return o = $.extend({
fullscreen:!1,
padding:100
}, e), n = function(e, t) {
return e.find(".selector.selected").removeClass("selected"), e.find(".selector:eq(" + (t.currentSlideNumber - 1) + ")").addClass("selected");
}, t = function(e) {
var t;
return t = "strikingly-dark-text", -1 !== e.css("background-image").indexOf("/icons/transparent.png") ? e.closest(".wide").addClass(t) :e.hasClass(t) ? e.closest(".wide").addClass(t) :e.closest(".wide").removeClass(t);
}, u = function(e) {
var i, o;
return o = e.sliderObject, n(o.closest(".iosslider").find(".slide-selectors"), e), 
e.slideChanged ? (t(e.currentSlideObject), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() ? e.currentSlideObject.find(".animated").css({
opacity:1
}) :(i = o.find(".fadeIn, .fadeInLeft, .fadeInRight").css({
opacity:1
}), setTimeout(function() {
return i.animate({
opacity:0
}, {
duration:300
});
}, 10), i.removeClass("fadeIn fadeInLeft fadeInRight"), e.prevSlideNumber < e.currentSlideNumber && 1 === Math.abs(e.currentSlideNumber - e.prevSlideNumber) || e.prevSlideNumber > e.currentSlideNumber && Math.abs(e.currentSlideNumber - e.prevSlideNumber) > 1 ? (e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInRight"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInRight");
}, 100)) :(e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInLeft"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInLeft");
}, 100)))) :!1;
}, c = function(e) {
var i;
return i = e.sliderObject, n(i.closest(".iosslider").find(".slide-selectors"), e), 
i.find(".animated").removeClass("fadeIn fadeInLeft fadeInRight"), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (i.find(".animated").css({
opacity:0
}), $(e.currentSlideObject).find(".animated").addClass("fadeIn")), u(e), t(e.currentSlideObject);
}, i = function(e) {
var t, n, i;
return n = e.data("auto-play"), t = !1, i = !0, window.edit_page.isShowPage && (t = !0, 
i = !1), e.iosSlider({
responsiveSlideContainer:!0,
responsiveSlides:!0,
snapToChildren:!0,
desktopClickDrag:!1,
infiniteSlider:!0,
autoSlide:t,
autoSlideTimer:n,
onSliderLoaded:c,
onSlideChange:u,
navSlideSelector:e.find(".slide-selectors .selector-wrapper"),
navPrevSelector:e.find(".prev-button"),
navNextSelector:e.find(".next-button"),
disableActionOnSelectorClicked:i
}), e.find(".slider").css({
"min-height":300
}), s(e), e.find("img").one("load", function() {
return a();
}).each(function() {
return this.complete ? $(this).load() :void 0;
});
}, s = function(e) {
var t;
return t = e ? e.closest(".slider-container") :$(".slider-container"), t.each(function() {
var e, t, n, i;
return e = $(this), t = function(t) {
return e.find(".item").each(function() {
var e;
return e = $(this).find(".inner").first(), t(e);
});
}, n = 0, t(function(e) {
var t;
return t = e.outerHeight(), n = Math.max(n, t);
}), o.fullscreen || e.find(".iosslider").hasClass("full-screen") ? (i = $(window).height(), 
n = Math.max(i, n), n > i && (n += 2 * o.padding, n -= 2)) :(n += 2 * o.padding, 
n -= 2), t(function(e) {
var t, i;
return t = e.outerHeight(), i = Math.max(0, .5 * (n - t)), e.css({
"margin-top":i,
"margin-bottom":i
});
}), $(this).find(".iosslider").css({
"min-height":"" + n + "px"
}), setTimeout(function() {
return window.edit_page.isShowPage ? e.find(".iosslider").height(n) :e.find(".iosslider").iosSlider("update");
}, 300);
});
}, a = $B.debounce(s, 100), $(window).resize(function() {
return a();
}), $(window).bind("repaint-slider", function() {
return a();
}), r = function(e, t) {
return t ? s(t) :a();
}, l = function(e, t) {
var n, i;
return null != (n = window.edit_page) ? null != (i = n.Event) ? i.subscribe(e, t || r) :void 0 :void 0;
}, l("Editor.SideMenu.Opened"), l("Editor.SideMenu.Closed"), l("Slider.ContentChanged"), 
l("Slide.afterAdd", function(e, t) {
var n;
return n = t.target.find(".iosslider"), n.length > 0 ? (i(n), s(n)) :void 0;
}), $(".iosslider").each(function() {
return i($(this));
});
},
matchHeights:function(e) {
var t, n, i, o;
if (e && ("string" == typeof e && (e = $(e)), 0 !== e.length)) {
i = {}, n = 0, e.each(function() {
var e;
return e = $(this), n = e.offset().top + "", i[n] = i[n] ? i[n].add(e) :e;
}), o = [];
for (n in i) t = i[n], t.length > 1 ? o.push($B.TH.matchHeightsAll(t)) :o.push(void 0);
return o;
}
},
matchHeightsAll:function(e) {
var t, n;
if (!(e.length <= 1 || (t = 0, n = e.first().offset().top, e.each(function() {
var e;
return e = $(this), e.css("height", "auto"), e.height() > t ? t = e.height() :void 0;
}), 5 > t))) return t = parseInt(t), e.each(function() {
var e, n;
return n = $(this), n.css("height", t), e = n.find("img"), "" === $.trim(n.text()) && e.length ? (e.css("vertical-align", "middle"), 
n.css("line-height", t + "px")) :void 0;
});
},
applyMatchHeights:function(e, t) {
var n, i;
return null == e && (e = ".s-mhi"), null == t && (t = ".s-mh"), n = function(n) {
return null == n && (n = !0), $(t).each(function() {
var t, i, o, r;
return t = $(this), o = t.find(e), i = $(this).find("img"), r = $(this).find("img.lazy"), 
r.length ? r.on("afterAppear", function() {
return $B.TH.matchHeights(o);
}) :i.length && n ? $(this).waitForImages(function() {
return $B.TH.matchHeights(o);
}) :$B.TH.matchHeights(o);
});
}, $(window).resize(function() {
return n(!1);
}), n(!0), window.edit_page.isShowPage ? void 0 :(i = function(n, i) {
var o, r, a;
if (i && (r = i.target, a = r.closest(t), a.length)) return o = a.find(e), $B.TH.matchHeights(o);
}, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", i), window.edit_page.Event.subscribe("ImageComponent.afterChange", i), 
window.edit_page.Event.subscribe("Repeatable.add", i), window.edit_page.Event.subscribe("Repeatable.remove", i), 
window.edit_page.Event.subscribe("Repeatable.afterReorder", i));
},
fitText:function(e) {
return 0 !== e.length ? e.each(function() {
var e, t, n, i, o;
return o = $(this), i = o.width(), n = parseInt(o.css("font-size")), e = o.css({
position:"absolute"
}).width(), o.css({
position:"relative"
}), i >= e ? void 0 :(t = n * i / e, o.css({
"font-size":t
}));
}) :void 0;
},
isTouchDevice:function() {
try {
return document.createEvent("TouchEvent"), !0;
} catch (e) {
return !1;
}
},
touchScroll:function(e) {
var t;
return $B.TH.isTouchDevice() ? (t = 0, e.addEventListener("touchstart", function(e) {
return t = this.scrollTop + e.touches[0].pageY;
}, !1), e.addEventListener("touchmove", function(e) {
return this.scrollTop = t - e.touches[0].pageY;
}, !1)) :void 0;
},
resizeIFrame:function(e) {
var t, n, i, o, r;
if (1 !== e.data("height-binding-complete")) return e.data("height-binding-complete", 1), 
(null != (n = $.browser) ? n.safari :void 0) || (null != (i = $.browser) ? i.opera :void 0) ? (e.load(function() {
var t;
return t = function() {
return e.height(e.contents().find("body").height() + "px");
}, setTimeout(t, 1);
}), t = e[0].src, e[0].src = "", e[0].src = t) :e.load(function() {
return setTimeout(function() {
return e.height(e.contents().find("body").height() + "px");
}, 100);
}), "complete" === (null != (o = e.contents()) ? null != (r = o[0]) ? r.readyState :void 0 :void 0) && e.height() < e.contents().contents().eq(1).height() ? e.height(e.contents().contents().eq(1).height() + "px") :void 0;
},
adjustIFrameHeight:function() {
return $("iframe.s-show-frame").each(function() {
return $B.TH.resizeIFrame($(this));
});
},
enableParallax:function(e, t) {
return null == t && (t = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 :($(window).scroll(function() {
var n, i, o;
return i = $(document).scrollTop(), o = $(window).height(), n = $(document).height(), 
e.each(function() {
var e, r, a, s, l, u, c;
if ($(this).css("background-image").length) return l = $(this), t ? (r = 0, e = n - o) :(c = l.offset().top, 
u = l.outerHeight(), r = c - o, e = c + u), s = e - r, a = 100 - .01 * ~~(1e4 * (i - r) / s), 
t && (a = 100 - a), a >= 0 && 100 >= a ? l.css({
backgroundPosition:"49.5% " + a + "%"
}) :void 0;
});
}), $(window).scroll());
},
getBackgroundImageSize:function(e, t) {
var n, i, o;
return i = null != (o = e.css("background-image")) ? o.split(/[()]/gi)[1] :void 0, 
i = i.replace(/"/g, ""), i ? (n = new Image(), n.onload = function() {
return t ? t({
width:this.width,
height:this.height
}) :void 0;
}, n.src = i) :null;
},
containBackgroundImages:function(e) {
return e.each(function() {
var e;
return e = $(this), "contain" === e.css("background-size") && "" === $.trim(e.text()) ? $B.TH.getBackgroundImageSize(e, function(t) {
var n, i, o;
return o = t.width, n = t.height, i = e.width() / o * n, e.css({
height:i,
"min-height":i
}), e.addClass("no-resize").removeClass("resize"), e.css("padding", 0);
}) :void 0;
});
},
setupStrikinglyLogo:function(e) {
var t, n, i, o, r, a, s, l, u, c;
return null == e && (e = -1), i = $(window), t = $(document), n = $($B.DOM.STRIKINGLY_LOGO), 
s = 3, -1 === e ? (l = "undefined" != typeof $ && null !== $ ? "function" == typeof $.cookie ? $.cookie("pbsVariationId") :void 0 :void 0) ? $B.TH.pbsVariationId = parseInt(l) :($B.TH.pbsVariationId = ~~(Math.random() * s), 
"undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})) :($B.TH.pbsVariationId = e, "undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})), 1 === $B.TH.pbsVariationId && ($B.TH.pbsVariationId = 2), 0 === $B.TH.pbsVariationId && ($B.TH.pbsVariationId = 2), 
-1 !== e || n && n.is(":visible") ? ($(".logo-footer, .logo-footer-var1, .logo-footer-var2, .logo-footer-var3").hide(), 
$B.TH.isMobile() ? (n.css({
bottom:-100,
position:"fixed"
}).show(), r = !1, i.scroll(function() {
return r = !0;
}), setInterval(function() {
var e;
if (r) {
if (e = t.height() - i.height() - 20, r = !1, i.scrollTop() >= e) return n.animate({
bottom:-20
}, 1e3, "easeInOutBack");
if (i.scrollTop() < e) return n.animate({
bottom:-100
}, 1e3, "easeInOutBack");
}
}, 250)) :0 === $B.TH.pbsVariationId ? ($(".logo-footer").show(), o = -70, n.css({
bottom:o,
position:"fixed"
}).hide(), c = 500, u = 100, i.scroll(function() {
var e, r, a, s, l;
return a = "free" === (null != (s = $S.page_meta) ? null != (l = s.user) ? l.membership :void 0 :void 0) ? i.height() + 100 :t.height() - c - 200, 
e = t.scrollTop() + i.height() + u, e > a + o ? (r = o + (e - a) / c * 60, r > -10 && (r = -10), 
o > r && (r = o), n.css({
bottom:r
}).show()) :n.css({
bottom:o
});
}), n.mouseover(function() {
return n.find(".logo-footer-tooltip").addClass("hover");
}), n.mouseout(function() {
return n.find(".logo-footer-tooltip").removeClass("hover");
})) :1 === $B.TH.pbsVariationId ? ($(".logo-footer-var1").show(), i.scroll(function() {
var e, n, o;
return e = "free" === (null != (n = $S.page_meta) ? null != (o = n.user) ? o.membership :void 0 :void 0) ? 200 :t.height() - i.height() - 500, 
t.scrollTop() > e ? $(".logo-footer-var1").addClass("show") :$(".logo-footer-var1").removeClass("show");
})) :2 === $B.TH.pbsVariationId ? ($(".logo-footer-var2").show(), i.scroll(function() {
var e, n, o;
return e = "free" === (null != (n = $S.page_meta) ? null != (o = n.user) ? o.membership :void 0 :void 0) ? 200 :t.height() - i.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var2").addClass("show") :$(".logo-footer-var2").removeClass("show");
})) :3 === $B.TH.pbsVariationId && ($(".logo-footer-var3").show(), i.scroll(function() {
var e, n, o;
return e = "free" === (null != (n = $S.page_meta) ? null != (o = n.user) ? o.membership :void 0 :void 0) ? 200 :t.height() - i.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var3").addClass("show") :$(".logo-footer-var3").removeClass("show");
})), a = ~~(1e6 * Math.random()) + "|" + new Date().getTime(), $B.TH.isMobile() || $B.isHeadlessRendering() || $S.conf.is_screenshot_rendering ? void 0 :($B.PageAE.sendPbsImpression({
variationId:$B.TH.pbsVariationId,
conversionKey:a
}), $(".logo-link").click(function() {
return $B.PageAE.sendPbsConversion({
variationId:$B.TH.pbsVariationId,
conversionKey:a
});
}))) :void 0;
},
disableLazyload:function(e) {
return e.each(function(e, t) {
var n;
return n = $(t), null != n.data("background") && (null != n.data("background") && n.css("background-image", "url(" + n.data("background") + ")"), 
n.removeClass("lazy")), n.is("img") && null != n.data("original") ? (n.attr("src", n.data("original")), 
n.removeClass("lazy"), n.on("load", function() {
return n.trigger("afterAppear");
})) :void 0;
});
},
applyLazyload:function(e) {
return null == e && (e = $(".lazy")), e.lazyload({
effect:"fadeIn",
effect_speed:500,
skip_invisible:!1,
threshold:$(window).height()
}), $("img.lazy-img").each(function() {
return "static" === $(this).css("position") ? $(this).css("position", "relative") :void 0;
});
},
lazyloadSection:function(e) {
return null != e ? ($B.TH.disableLazyload(e.find(".lazy-background")), $B.TH.disableLazyload(e.find(".lazy-img")), 
$B.TH.applyLazyload(e.find(".lazy"))) :void 0;
},
lazyload:function() {
var e;
return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) :(e = $($B.DOM.SLIDES), 
$B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), e.each(function(e, t) {
return $B.TH.lazyloadSection($(t));
}));
},
initPageHelpers:function() {
return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(), 
$B.TH.setupStrikinglyLogo()) :void 0;
}
};
}.call(this), function() {
Bobcat.Event = function() {
function e() {
this.topics = {}, this.subUid = -1;
}
return e.prototype.subscribe = function(e, t) {
var n;
return this.topics[e] || (this.topics[e] = []), n = ++this.subUid, this.topics[e].push({
token:n,
func:t
}), n;
}, e.prototype.publish = function(e, t) {
var n, i, o, r, a;
if (!this.topics[e]) return !1;
for (i = this.topics[e].slice(), a = [], o = 0, r = i.length; r > o; o++) {
n = i[o];
try {
a.push("function" == typeof n.func ? n.func(e, t) :void 0);
} catch (s) {
a.push(console.warn("Cannot trigger subscription! " + s));
}
}
return a;
}, e.prototype.unsubscribe = function(e) {
var t, n, i, o, r;
r = this.topics;
for (o in r) {
i = r[o];
for (t in i) if (n = i[t], n.token === e) return i.splice(t, 1), e;
}
return !1;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function() {
function t() {
this.selectAndGotoSlideWithIndex = e(this.selectAndGotoSlideWithIndex, this), this.getHighlightedIndex = e(this.getHighlightedIndex, this), 
this.registerSlideWaypoint = e(this.registerSlideWaypoint, this), this.registerSlideWaypoints = e(this.registerSlideWaypoints, this), 
this.selectSlideByWaypoint = e(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = e(this.hashTagChangeHandler, this), 
this.getSlideName = e(this.getSlideName, this), this.setupKeyBindings = e(this.setupKeyBindings, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.currentSectionName = e(this.currentSectionName, this), 
this.currentIndex = e(this.currentIndex, this), this.slideIndex = e(this.slideIndex, this), 
this.unlockKeyboard = e(this.unlockKeyboard, this), this.lockKeyboard = e(this.lockKeyboard, this), 
this.removeHash = e(this.removeHash, this), this.setupHashTagChangeHandlerAndWaypoints = e(this.setupHashTagChangeHandlerAndWaypoints, this), 
this.runMobileOptimization = e(this.runMobileOptimization, this), this.scrolling = !1, 
this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
}
return t.prototype.init = function() {
return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()), 
this.setupHashTagChangeHandlerAndWaypoints(), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), 
this.runMobileOptimization(), $B.isStatic() && $S.page_meta.show_navigation_buttons ? ($(".navigation-buttons").show(), 
$(".navigation-buttons span").css({
visibility:"visible",
opacity:0,
display:"block"
}), $(".navigation-buttons .prev").click(function() {
return window.slide_navigator.prev();
}), $(".navigation-buttons .next").click(function() {
return window.slide_navigator.next();
})) :void 0;
}, t.prototype.runMobileOptimization = function() {
var e;
return e = $B.TH.isMobile(), e && !location.hash ? window.scrollTo(0, 1) :void 0;
}, t.prototype.setupHashTagChangeHandlerAndWaypoints = function() {
var e = this;
return $(window).hashchange(function() {
return e.hashTagChangeHandler(location.hash);
}), "" === location.hash && this.registerSlideWaypoints, 0 === $(document).scrollTop() ? setTimeout(function() {
return $(window).hashchange(), e.registerSlideWaypoints();
}, 1500) :this.registerSlideWaypoints();
}, t.prototype.removeHash = function() {
var e;
return e = window.location.hash, "" !== e && "#" !== e && 0 !== e.indexOf("#!/~") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) :void 0 :void 0 :void 0;
}, t.prototype.lockKeyboard = function() {
return this.keyboardLock = !0;
}, t.prototype.unlockKeyboard = function() {
return this.keyboardLock = !1;
}, t.prototype.slideIndex = function(e) {
var t;
return t = $(".slides .slide"), t.index(e);
}, t.prototype.currentIndex = function() {
return this.slideIndex(this.current());
}, t.prototype.currentSectionName = function() {
return this.current().find("a.section-name-anchor").attr("data-section-name");
}, t.prototype.isFirst = function() {
var e;
return e = this.slideIndex(this.current()), 0 === e;
}, t.prototype.isLast = function() {
var e, t;
return t = $(".slides .slide"), e = this.slideIndex(this.current()), e === t.length - 1;
}, t.prototype.next = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), t.length - 1 > e ? this.selectAndGotoSlideWithIndex(e + 1) :e === t.length - 1 ? $("html, body").stop().animate({
scrollTop:$(document).height() - $(window).height()
}, 1200, "easeInOutQuart") :void 0;
}, t.prototype.prev = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) :$("html, body").stop().animate({
scrollTop:0
}, 1200, "easeInOutQuart");
}, t.prototype.setupKeyBindings = function() {
var e, t, n = this;
return t = !1, e = !0, $(document).on({
keydown:function(t) {
if (13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor(), !n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) {
switch (t.keyCode) {
case 32:
t.preventDefault();
break;

case 38:
t.preventDefault();
break;

case 40:
t.preventDefault();
}
return e = !0;
}
},
keyup:function(i) {
if (clearTimeout(t), t = !1, !e) return e = !0, void 0;
if (!n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (i.keyCode) {
case 32:
return i.preventDefault(), n.next();

case 38:
return i.preventDefault(), n.prev();

case 40:
return i.preventDefault(), n.next();
}
}
});
}, t.prototype.getSlug = function(e, t) {
return e = e.toSlug(), (0 === e.length || e.match(/^[0-9]+$/g)) && (e = "_" + (t + 1)), 
e;
}, t.prototype.getSlideNames = function() {
var e, t, n, i, o, r, a, s, l, u;
for (i = [], s = window.edit_page.isShowPage ? $S.page_meta.slide_names :function() {
var e, t, n, i;
for (n = window.edit_page.data.slides(), i = [], e = 0, t = n.length; t > e; e++) a = n[e], 
i.push(a.components.slideSettings.name());
return i;
}(), t = l = 0, u = s.length; u > l; t = ++l) {
for (r = s[t], n = o = "#" + this.getSlug(r, t), e = 1; -1 !== $.inArray(n, i); ) n = o + "-" + e++;
i.push(n);
}
return i;
}, t.prototype.getSlideName = function(e) {
return this.getSlideNames()[e];
}, t.prototype.hashTagChangeHandler = function(e) {
var t, n, i, o, r = this;
return $B.log("[NAVIGATOR] Got hash change " + e), $("html, body").stop(), n = $('a[data-scroll-name="' + e + '"]'), 
n.length ? (i = n.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) :(t = $.inArray(e, this.getSlideNames()), 
-1 !== t && ($B.log("[NAVIGATOR] Found section slug"), i = $("ul.slides .slide").eq(t), 
n = i.find("a.section-anchor").first())), n.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", e), 
(null != (o = $B.TH) ? "function" == typeof o.isMobile ? o.isMobile() :void 0 :void 0) && $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), 
this.selectSlide(i), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(i) + 1)), 
$("html, body").stop().animate({
scrollTop:n.first().offset().top
}, 1200, "easeInOutQuart", function() {
return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", e), 
r.scrolling = !1;
})) :void 0;
}, t.prototype.selectSlideByWaypoint = function(e, t) {
var n;
return n = this.getSlideName(t), window.location.hash !== n ? ($B.log("[NAVIGATOR] Selecting slide " + (t + 1) + " by waypoint"), 
this.selectSlide(e), this.removeHash()) :void 0;
}, t.prototype.waypointsRegistered = !1, t.prototype.registerSlideWaypoints = function() {
var e;
return this.waypointsRegistered ? void 0 :($B.log("[NAVIGATOR] Registering waypoints"), 
e = this.registerSlideWaypoint, $(".slides .slide").each(function() {
return e($(this));
}), this.waypointsRegistered = !0);
}, t.prototype.registerSlideWaypoint = function(e) {
var t, n, i, o, r = this;
return n = this.slideIndex, e.waypoint(function(t) {
var i, o;
if (r.firstTime) return r.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"), 
void 0;
if (!r.scrolling) {
if (o = n(e), "down" === t || 0 === o) i = e; else if ("up" === t && (i = e.prev(), 
o -= 1, 0 === $(document).scrollTop() && 0 !== o)) return;
return $B.log("[NAVIGATOR] Got waypoint event " + t + ", " + o), r.selectSlideByWaypoint(i, o);
}
}, {
offset:"50%",
continuous:!1
}), t = 0, 0 === (null != (i = e.first()) ? null != (o = i.offset()) ? o.top :void 0 :void 0) ? $(window).scroll(function() {
var i;
if (!r.scrolling && 0 === n(e.first()) && e.first().height() < .5 * $(window).height() && e.eq(1).length) {
if (i = $(document).scrollTop(), t === i) return;
return 0 === i ? r.selectSlideByWaypoint(e.first(), 0) :0 === t && r.selectSlideByWaypoint(e.eq(1), 1), 
t = i;
}
}) :void 0;
}, t.prototype.getHighlightedIndex = function() {
var e, t, n;
for (n = $(".s-nav .s-nav-item"), t = $(".navbar-drawer .navbar-drawer-item"), e = this.currentIndex(); n[e] && !n.eq(e).is(":visible") && !t.eq(e).is(":visible"); ) e -= 1;
return e;
}, t.prototype.selectSlide = function(e) {
var t;
return $(".slides .slide").removeClass("selected"), e.addClass("selected"), this.current(e), 
$B.isStatic() ? (t = this.getHighlightedIndex(), $(".s-nav .s-nav-item").removeClass("selected"), 
t > -1 && $(".s-nav .s-nav-item").eq(t).addClass("selected"), $(".navbar-drawer .navbar-drawer-item").removeClass("selected"), 
t > -1 && $(".navbar-drawer .navbar-drawer-item").eq(t).addClass("selected"), this.isFirst() ? $(".navigation-buttons .prev").animate({
opacity:0
}) :$(".navigation-buttons .prev").animate({
opacity:1
}), this.isLast() ? $(".navigation-buttons .next").animate({
opacity:0
}) :$(".navigation-buttons .next").animate({
opacity:1
})) :void 0;
}, t.prototype.selectAndGotoSlideWithIndex = function(e) {
return window.location.hash = this.getSlideName(e);
}, t;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function i() {
this.constructor = e;
}
for (var o in n) t.call(n, o) && (e[o] = n[o]);
return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype, 
e;
};
window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(t) {
function i() {
this.closeLastEditor = e(this.closeLastEditor, this), this.addOpenedEditor = e(this.addOpenedEditor, this), 
this.removeFromOpenedEditors = e(this.removeFromOpenedEditors, this), this.hasOpenedEditor = e(this.hasOpenedEditor, this), 
this.openedEditors = [];
}
return n(i, t), i.prototype.hasOpenedEditor = function() {
return 0 === this.openedEditors.length;
}, i.prototype.removeFromOpenedEditors = function(e) {
var t;
return t = $.inArray(e, this.openedEditors), t > -1 ? this.openedEditors.splice(t, 1) :void 0;
}, i.prototype.addOpenedEditor = function(e) {
return this.openedEditors.push(e);
}, i.prototype.closeLastEditor = function() {
var e;
return e = this.openedEditors.pop(), e && (Bobcat.AE.track("Editor - Combo Key - Done"), 
e.doneClickHandler()), e;
}, i;
}($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
TRANSPARENT_IMAGE_URL:"/assets/icons/transparent.png",
isImageTransparent:function(e) {
return null == e && (e = ""), -1 !== e.indexOf(this.TRANSPARENT_IMAGE_URL);
}
}, Bobcat.Component = function(t) {
function i(t, n, i) {
this.root = t, null == n && (n = {}), null == i && (i = {}), this.triggerEvent = e(this.triggerEvent, this), 
this.addSubscriber = e(this.addSubscriber, this), this.destroy = e(this.destroy, this), 
this.loadData = e(this.loadData, this), this.storeCommand = e(this.storeCommand, this), 
this.refreshRootLastData = e(this.refreshRootLastData, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.hideEditorHandler = e(this.hideEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this), 
this.firstTimeToLoad = !0, this.loadData(n, i), this.selected = ko.observable(), 
this.dialogOpen = ko.observable(!1), this.state = ko.observable(0), this.lastData = n, 
this.mapping = i;
}
return n(i, t), i.include(Bobcat.ComponentHelper), i.prototype.isNull = function(e) {
return "undefined" == typeof e || null === e;
}, i.prototype.isState = function(e) {
return "normal" === e && 0 === this.state() ? !0 :"overlay" === e && 1 === this.state() ? !0 :"editor" === e && 2 === this.state() ? !0 :!1;
}, i.prototype.gotoState = function(e) {
return "normal" === e ? (this === window.currentComponent && (window.currentComponent = null), 
this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0), 
window.editorTracker.removeFromOpenedEditors(this)) :"overlay" === e ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this :window.currentComponent = this, 
this.state(1)) :(window.currentComponent.gotoState("normal"), void 0) :"editor" === e ? (window.editorTracker.addOpenedEditor(this), 
this.state(2)) :void 0;
}, i.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, i.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, i.prototype.clickEditorHandler = function() {
return this.isState("overlay") ? this.gotoState("editor") :void 0;
}, i.prototype.hideEditorHandler = function() {
return this.isState("editor") ? this.gotoState("normal") :void 0;
}, i.prototype.doneClickHandler = function(e) {
return this.hideEditorHandler(e), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand();
}, i.prototype.refreshRootLastData = function() {
return this.root ? this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))) :void 0;
}, i.prototype.storeCommand = function() {
var e;
return console.log("storeCommand: root: ", this.root), console.log("storeCommand: self: ", this), 
this.root ? (e = this.root.rootLastData, this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))), 
$B.Singleton.TimeMachine.pushOp({
action:"modify",
self:this,
root:this.root,
data:{
mapping:this.root.mapping,
oldValue:e,
newValue:this.root.rootLastData
}
})) :void 0;
}, i.prototype.loadData = function(e, t) {
var n, i, o;
null == e && (e = {}), null == t && (t = {}), this.firstTimeToLoad && (this.lastData = e, 
this.firstTimeToLoad = !1), ko.mapping.fromJS(e, t, this), o = [];
for (n in e) i = e[n], this[n] && ko.isSubscribable(this[n]) ? o.push(this[n].subscribe(function() {
return window.edit_page.unsavedChanges(!0);
})) :o.push(void 0);
return o;
}, i.prototype.destroy = function() {}, i.prototype.addSubscriber = function(e, t) {
var n, i, o, r, a;
for (this.subscribers || (this.subscribers = []), e instanceof RegExp || (e = new RegExp(e)), 
n = !1, a = this.subscribers, o = 0, r = a.length; r > o; o++) i = a[o], i.event.toString() === e.toString() && (n = !0, 
i.listeners.push(t));
return n ? void 0 :this.subscribers.push({
event:e,
listeners:[ t ]
});
}, i.prototype.triggerEvent = function(e, t) {
var n, i, o, r, a, s, l, u;
if (this.subscribers) for (l = this.subscribers, o = 0, a = l.length; a > o; o++) if (i = l[o], 
i.event.test(e)) for (u = i.listeners, r = 0, s = u.length; s > r; r++) n = u[r], 
n.call(this, t);
return this.root && this !== this.root ? this.root.triggerEvent(e, t) :void 0;
}, i;
}($B.Module);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function i() {
this.constructor = e;
}
for (var o in n) t.call(n, o) && (e[o] = n[o]);
return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype, 
e;
};
window.asset_path = function(e) {
var t, n;
return t = $("meta[name=asset-url]").attr("content"), n = /^\/assets\//, n.test(e) && t && (e = t + e), 
e;
}, Bobcat.DelayJob = function() {
function t() {
this.init = e(this.init, this), this.getAllJobs = e(this.getAllJobs, this), this.getJob = e(this.getJob, this), 
this.add = e(this.add, this), this.jobs = {};
}
return t.prototype.add = function(e, t) {
return this.jobs[e] = t;
}, t.prototype.getJob = function(e) {
return this.jobs[e];
}, t.prototype.getAllJobs = function() {
var e, t, n, i;
n = [], i = this.jobs;
for (t in i) e = i[t], n.push(e);
return n;
}, t.prototype.init = function() {}, t;
}(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(t) {
function i(t) {
this.removePremiumSlides = e(this.removePremiumSlides, this), this.selectedPreset = e(this.selectedPreset, this);
var n;
this.isNull(t.showNavigationButtons) && (t.showNavigationButtons = !1), this.isNull(t.submenu) && (t.submenu = {
type:"SubMenu",
list:[],
components:{
link:{
type:"Button",
url:"http://www.wordpress.com",
text:"Blog",
new_target:!0
}
}
}), this.isNull(t.templateVariation) && (t.templateVariation = ""), this.isNull(t.templatePreset) && (t.templatePreset = ""), 
n = {
slides:{
create:function(e) {
return new Bobcat.Slide(e.data);
}
},
menu:{
create:function(e) {
return new Bobcat.Menu(e.data);
}
},
footer:{
create:function(e) {
return new Bobcat.Footer(e.data);
}
},
submenu:{
create:function(e) {
return new Bobcat.SubMenu(e.data);
}
}
}, i.__super__.constructor.call(this, null, t, n);
}
return n(i, t), i.prototype.selectedPreset = function() {}, i.prototype.removePremiumSlides = function() {
var e, t;
return (t = $B.meta("premium-slides")) ? (e = t.split(","), this.slides($.grep(this.slides(), function(t) {
return -1 === $.inArray(t.data.template_name, e);
}))) :void 0;
}, i.prototype.bindSlides = function() {
var e, t, n, i, o, r, a, s, l, u;
for (this.menu.bind($(Bobcat.DOM.NAVIGATOR)), this.footer.bind($(Bobcat.DOM.FOOTER)), 
$(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."), 
s = this.slides(), t = i = 0, r = s.length; r > i; t = ++i) n = s[t], e = $(Bobcat.DOM.SLIDES).eq(t), 
n.index(t), n.html(e);
for (this.slides.subscribe(function(e) {
var n, i, o, r, a;
for (t = i = 0, r = e.length; r > i; t = ++i) n = e[t], n.index(t);
for (o = 0, a = e.length; a > o; o++) n = e[o], n.html().find(".section-anchor").attr("data-scroll-name", "#" + (n.index() + 1)), 
n.beforeMoveHandler(), $(".slides").append(n.html()), n.afterMovedHandler();
return $.waypoints("refresh");
}), ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE), l = this.slides(), u = [], 
o = 0, a = l.length; a > o; o++) n = l[o], u.push(n.bind());
return u;
}, i.prototype.addSlideData = function(e, t) {
return this.slides.splice(e, 0, t), window.edit_page.setupTooltips();
}, i.prototype.removeSlideData = function(e) {
return this.slides.splice(e, 1), window.edit_page.removeTooltips();
}, i.prototype.hideAllEditors = function() {
var e, t, n, i;
for (i = this.slides(), t = 0, n = i.length; n > t; t++) e = i[t], e.hideAllEditors();
return this.menu.hideAllEditors();
}, i.prototype.highlightInNav = function(e) {
var t;
return t = e.data, t.isSelected() && !t.isHidden() ? !0 :void 0;
}, i;
}(Bobcat.Component), Bobcat.Slide = function(t) {
function i(t) {
var n, o = this;
this.data = t, this.destroy = e(this.destroy, this), this.deleteSlide = e(this.deleteSlide, this), 
this.isSelected = e(this.isSelected, this), this.isHighlighted = e(this.isHighlighted, this), 
this.getName = e(this.getName, this), this.isHidden = e(this.isHidden, this), this.selectSlide = e(this.selectSlide, this), 
this.toggleMenu = e(this.toggleMenu, this), this.renameDone = e(this.renameDone, this), 
this.rename = e(this.rename, this), n = {
components:{
create:function(e) {
var t, n, i, r, a;
n = {}, a = e.data;
for (t in a) i = a[t], n[t] = new Bobcat[i.type](o, i), "function" == typeof (r = n[t]).init && r.init();
return n;
}
}
}, i.__super__.constructor.call(this, this, this.data, n), this.html = ko.observable(), 
this.index = ko.observable(), this.renameMode = ko.observable(!1), this.rootLastData = this.data;
}
return n(i, t), i.StripHtml = function(e) {
return Bobcat.Gallery.StripHtml(e);
}, i.prototype.htmlCopy = function() {
return this.html().html();
}, i.prototype.hideAllEditors = function() {
var e, t, n, i;
n = this.components, i = [];
for (t in n) e = n[t], i.push(e.hideEditorHandler());
return i;
}, i.prototype.bind = function() {
return ko.applyBindings(this.components, this.html().get(0));
}, i.prototype.rename = function(e) {
return this.renameMode(!0), window.dom = e, $(e.closest(".section").find("input").first()).focus(), 
window.slide_navigator.lockKeyboard();
}, i.prototype.renameDone = function() {
return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), window.edit_page.track("Editor - Rename Section");
}, i.prototype.toggleMenu = function() {
var e;
return e = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!e), 
window.edit_page.Event.publish("MenuItem.toggle", {});
}, i.prototype.selectSlide = function(e) {
return this.isSelected() ? this.rename(e) :window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
}, i.prototype.isHidden = function() {
return !this.components.slideSettings.show_nav();
}, i.prototype.hashHref = function() {
return window.slide_navigator.getSlideName(this.index());
}, i.prototype.getName = function() {
return this.components.slideSettings.name();
}, i.prototype.isHighlighted = function() {
var e, t;
if (this.isSelected() && !this.isHidden()) return !0;
if (this.index() > window.slide_navigator.currentIndex()) return !1;
for (e = this.index() + 1, t = window.edit_page.data.slides(); t[e] && t[e].isHidden(); ) {
if (t[e].isSelected()) return !0;
e += 1;
}
return !1;
}, i.prototype.isSelected = function() {
return window.slide_navigator.currentIndex() === this.index();
}, i.prototype.deleteSlide = function() {
var e, t = this;
return e = !0, $("html body").stop().animate({
scrollTop:this.html().first().offset().top
}, 500, "easeInOutQuart", function() {
return e && (e = !1, window.confirm(I18n.t("js.pages.edit.confirm.delete_section"))) ? (window.edit_page.deleteSlide(t.index()), 
t.destroy()) :void 0;
});
}, i.prototype.destroy = function() {
var e, t, n, i;
n = this.components, i = [];
for (t in n) e = n[t], i.push(e.destroy());
return i;
}, i.prototype.beforeMoveHandler = function() {
var e, t, n, i;
n = this.components, i = [];
for (t in n) e = n[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) :i.push(void 0);
return i;
}, i.prototype.afterMovedHandler = function() {}, i;
}(Bobcat.Component), Bobcat.Text = function(e) {
function t(e, n) {
var i, o = this;
this.root = e, i = {
style:{
create:function(e) {
return new Bobcat.TextStyle(o.root, e.data);
}
}
}, t.__super__.constructor.call(this, this.root, n, i), this.oldValue = ko.observable();
}
return n(t, e), t.prototype.edit = function() {
return t.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()), 
this.value("&nbsp;")) :void 0;
}, t.prototype.deselect = function() {
return t.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) :this["default"](!1) :void 0;
}, t;
}(Bobcat.Component), Bobcat.SocialMediaList = function(t) {
function i(t, n) {
var o, r, a = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.bind = e(this.bind, this), 
o = $.extend(!0, {}, n), window.social_media_config.updateButtonListData(o), r = {
link_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
},
button_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
}
}, i.__super__.constructor.call(this, this.root, o, r), this.mediaListHtml = ko.observable();
}
return n(i, t), i.prototype.bind = function() {
return this.render();
}, i.prototype.render = function() {
var e, t, n, i, o, r, a, s, l, u;
if (!$B.isHeadlessRendering()) {
for (n = "", s = this.button_list(), i = 0, r = s.length; r > i; i++) t = s[i], 
t.show_button() && (n += t.getTemplate());
for (this.mediaListHtml(n), l = this.button_list(), u = [], o = 0, a = l.length; a > o; o++) t = l[o], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
window.edit_page.isShowPage ? t.show_button() || e ? u.push(t.reRender()) :u.push(void 0) :u.push(t.reRender());
return u;
}
}, i.prototype.clickEditorHandler = function(e) {
return i.__super__.clickEditorHandler.call(this, e);
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i.prototype.doneClickHandler = function(e) {
var t, n, o, r;
for (this.render(), r = this.link_list(), n = 0, o = r.length; o > n; n++) t = r[n], 
t.doneClickHandler();
return i.__super__.doneClickHandler.call(this, e);
}, i;
}(Bobcat.Component), Bobcat.SocialMediaItem = function(t) {
function i(t, n) {
var o = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.onScriptLoad = e(this.onScriptLoad, this), 
this.getUrl = e(this.getUrl, this), n.link_url || (n.link_url = ""), n.share_text || (n.share_text = window.social_media_config.get("description")), 
i.__super__.constructor.call(this, this.root, n, {}), this.show_link = ko.dependentObservable(function() {
return o.link_url().length > 0;
});
}
return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.getUrl = function() {
return this.url && this.url() ? this.url() :window.social_media_config.get("url");
}, i.prototype.getSubtitle = function() {
return "";
}, i.prototype.openLinkInput = function(e) {
var t;
return t = e.closest(".social-media-item"), t.length ? (t.find("input.url").show(), 
e.hide()) :void 0;
}, i.prototype.onScriptLoad = function() {
return this.runScript();
}, i.prototype.createScriptTag = function(e, t) {
var n, i;
return n = $("<div></div>").addClass(e), i = $("<script></script>").attr({
async:!0,
src:t
}), i.bind("load", this.onScriptLoad), n.get(0).appendChild(i.get(0)), $("#fb-root").get(0).appendChild(n.get(0));
}, i.prototype.doneClickHandler = function() {
var e, t;
return t = this.link_url(), e = this.addProtocol(t, !0), this.link_url(e);
}, i;
}(Bobcat.Component), Bobcat.Facebook = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), n.app_id = window.social_media_config.get("fb_app_id"), 
n.imageUrl = asset_path("/assets/icons/facebook.png"), i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, i.prototype.getSubtitle = function() {
return "Facebook Like";
}, i.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.app_id(),
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.LinkedIn = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/linkedin.png"), 
i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, i.prototype.getSubtitle = function() {
return "LinkedIn Share";
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, i;
}(Bobcat.SocialMediaItem), Bobcat.Twitter = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/twitter.png"), 
i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
}, i.prototype.getSubtitle = function() {
return "Tweet button";
}, i.prototype.runScript = function() {
var e;
return "undefined" != typeof twttr && null !== twttr ? null != (e = twttr.widgets) ? e.load() :void 0 :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.GPlus = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/gplus.png"), 
i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, i.prototype.getSubtitle = function() {
return "Google +1";
}, i.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.Renren = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/renren.png"), 
i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getSubtitle = function() {
return "人人喜欢";
}, i.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:window.social_media_config.get("title"),
description:window.social_media_config.get("description"),
image:window.social_media_config.get("image")
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {}, 
i;
}(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
n.imageUrl = asset_path("/assets/icons/weibo.png"), i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.getSubtitle = function() {
return "新浪微博";
}, i.prototype.getTemplate = function() {
var e, t, n, i, o;
o = 90, i = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:window.social_media_config.get("title"),
pic:window.social_media_config.get("image"),
rnd:new Date().valueOf()
}, n = [];
for (e in t) n.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + n.join("&") + '" width="' + o + '" height="' + i + '"></iframe></div>';
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {}, 
i;
}(Bobcat.SocialMediaItem), Bobcat.Person = function(e) {
function t(e, n, i) {
this.root = e, this.parent = i, t.__super__.constructor.call(this, this.root, n, {}), 
this.name = new Bobcat.RichText(this.root, this.name), this.name.init(), this.title = new Bobcat.RichText(this.root, this.title), 
this.title.init(), this.image = new Bobcat.Image(this.root, this.image, {}, null), 
this.choosingImage = ko.observable(!1);
}
return n(t, e), t.prototype.remove = function() {
return this.parent.list.remove(this);
}, t.prototype.toggleImageChooser = function() {
return this.choosingImage(!this.choosingImage());
}, t;
}(Bobcat.Component), Bobcat.Video = function(t) {
function i(t, n, o) {
this.root = t, this.parent = o, this.remove = e(this.remove, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.errorCallback = e(this.errorCallback, this), 
this.successCallback = e(this.successCallback, this), this.upload = e(this.upload, this), 
i.__super__.constructor.call(this, this.root, n, {}), this.visible = ko.dependentObservable(function() {
return !window.edit_page.isLoading();
});
}
return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.upload = function(e) {
var t = this;
if (!window.edit_page.isLoading()) return window.edit_page.isLoading(!0), e.target && (e = $(e.target)), 
this.url(this.addProtocol(this.url())), e.closest("form").ajaxSubmit({
url:"/s/videos.json",
type:"POST",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
return console.log(e), "retry" === e.html ? $B.poller("/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm?v=1", t.successCallback, t.errorCallback) :"success" === e.html ? t.successCallback(e) :void 0;
},
error:this.errorCallback
});
}, i.prototype.successCallback = function(e) {
return window.edit_page.isLoading(!1), this.html(e.message.html), window.edit_page.track("Editor - Add Video");
}, i.prototype.errorCallback = function(e) {
var t;
return t = jQuery.parseJSON(e.responseText), window.edit_page.isLoading(!1), $B.log(t), 
alert(I18n.t(t.html, t.message.i18n));
}, i.prototype.clickEditorHandler = function(e) {
return this.oldHtml = this.html(), i.__super__.clickEditorHandler.call(this, e);
}, i.prototype.clickCancelEditorHandler = function() {
return this.html(this.oldHtml), this.hideEditorHandler();
}, i.prototype.remove = function() {
return this.html(""), this.url("");
}, i;
}(Bobcat.Component), Bobcat.Repeatable = function(t) {
function i(t, n) {
var o, r = this;
this.root = t, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.selectedIndex = e(this.selectedIndex, this), 
this.changeToPrev = e(this.changeToPrev, this), this.changeToNext = e(this.changeToNext, this), 
this.changeSelected = e(this.changeSelected, this), this.add = e(this.add, this), 
this.isNull(n.subItemClassName) && (n.subItemClassName = "RepeatableItem"), o = {
list:{
create:function(e) {
return new Bobcat[n.subItemClassName](r.root, e.data, r);
}
},
components:{
create:function(e) {
return e.data;
}
}
}, i.__super__.constructor.call(this, this.root, n, o), this.selected = ko.observable(), 
this.direction = ko.observable(1);
}
return n(i, t), i.prototype.add = function(e) {
var t;
return t = new (Bobcat[this.subItemClassName()])(this.root, {
components:this.components
}, this), this.changeSelected(t), this.list.push(t), this.changeSelected(t), window.edit_page.Event.publish("Repeatable.add", {
target:e
}), window.edit_page.track("Editor - Add Repeatable"), this.triggerEvent("Repeatable.Add", t), 
this.storeCommand();
}, i.prototype.changeSelected = function(e) {
return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction(-1) :this.direction(1), 
this.selected(e);
}, i.prototype.changeToNext = function(e) {
return this.changeSelected(this.list()[(e.index() + 1) % this.list().length]);
}, i.prototype.changeToPrev = function(e) {
return this.changeSelected(this.list()[(e.index() - 1) % this.list().length]);
}, i.prototype.beforeMoveHandler = function() {
var e, t, n, i, o;
for (i = this.list(), o = [], t = 0, n = i.length; n > t; t++) e = i[t], null != e.beforeMoveHandler ? o.push(e.beforeMoveHandler()) :o.push(void 0);
return o;
}, i.prototype.afterMovedHandler = function() {}, i.prototype.selectedIndex = function() {
return this.selected() ? this.selected().index() :void 0;
}, i.prototype.hasContent = function() {
return this.list().length > 0;
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i;
}(Bobcat.Component), Bobcat.RepeatableItem = function(t) {
function i(t, n, o) {
var r, a = this;
this.root = t, this.parent = o, this.isTextRight = e(this.isTextRight, this), this.layout = e(this.layout, this), 
this.columnVariation = e(this.columnVariation, this), this.col4 = e(this.col4, this), 
this.col3 = e(this.col3, this), this.smartCol8 = e(this.smartCol8, this), this.smartCol3 = e(this.smartCol3, this), 
this.smartCol = e(this.smartCol, this), this.deselect = e(this.deselect, this), 
this.selectForEdit = e(this.selectForEdit, this), this.direction = e(this.direction, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.select = e(this.select, this), 
this.showEditor = e(this.showEditor, this), this.leaveDeleteHandler = e(this.leaveDeleteHandler, this), 
this.enterDeleteHandler = e(this.enterDeleteHandler, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.isEven = e(this.isEven, this), this.index = e(this.index, this), 
this.remove = e(this.remove, this), r = {
components:{
create:function(e) {
var t, n, i, o;
n = {}, o = e.data;
for (t in o) i = o[t], "function" == typeof i.type && (i.type = i.type()), n[t] = new Bobcat[i.type](a.root, i), 
"undefined" != typeof n[t].init && n[t].init();
return n;
}
}
}, n.type = "RepeatableItem", n.deleteOverlayEnabled = !1, i.__super__.constructor.call(this, this.root, n, r), 
this.isSelected = ko.dependentObservable(function() {
return a.parent.selected() === a;
}, this);
}
return n(i, t), i.prototype.remove = function(e) {
var t, n, i;
return t = $(e.closest(".slide-list")[0]), n = e.closest(".repeatable").prev(), 
i = this.parent.list().indexOf(this), this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove", {
target:n
}), window.edit_page.track("Editor - Remove Repeatable"), this.triggerEvent("Repeatable.Remove", {
component:this,
target:e,
targetParent:t
}), this.parent.storeCommand();
}, i.prototype.index = function() {
return $.inArray(this, this.parent.list());
}, i.prototype.isEven = function() {
return this.index() % 2 === 0;
}, i.prototype.isFirst = function() {
return 0 === this.index();
}, i.prototype.isLast = function() {
return this.index() === this.parent.list().length - 1;
}, i.prototype.enterDeleteHandler = function() {
return this.deleteOverlayEnabled(!0);
}, i.prototype.leaveDeleteHandler = function() {
return this.deleteOverlayEnabled(!1);
}, i.prototype.showEditor = function() {
var e, t, n, i;
n = !0, i = this.components;
for (t in i) e = i[t], n = n && (e.isState("normal") || e.isState("overlay"));
return n;
}, i.prototype.select = function() {
return this.parent.changeSelected(this);
}, i.prototype.next = function() {
return this.deselect(), this.parent.changeToNext(this);
}, i.prototype.prev = function() {
return this.deselect(), this.parent.changeToPrev(this);
}, i.prototype.direction = function() {
return this.parent.direction();
}, i.prototype.selectForEdit = function(e) {
var t, n, i;
this.deselect(), this.select(e), i = this.components;
for (n in i) if (t = i[n], "Image" === t.type()) return t.mouseenterHandler(), t.clickEditorHandler(), 
void 0;
}, i.prototype.deselect = function() {
var e, t, n, i, o, r, a;
for (r = this.parent.list(), a = [], i = 0, o = r.length; o > i; i++) t = r[i], 
a.push(function() {
var i, o;
i = t.components, o = [];
for (n in i) e = i[n], "Image" === e.type() && e.isState("editor") ? o.push(e.clickCancelEditorHandler()) :o.push(void 0);
return o;
}());
return a;
}, i.prototype.beforeMoveHandler = function() {
var e, t, n, i;
n = this.components, i = [];
for (t in n) e = n[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) :i.push(void 0);
return i;
}, i.prototype.afterMovedHandler = function() {}, i.prototype.smartCol = function() {
return 4 === this.parent.list().length || this.parent.list().length < 3;
}, i.prototype.smartCol3 = function() {
return this.parent.list().length % 3 === 0 || this.parent.list().length < 3;
}, i.prototype.smartCol8 = function() {
var e;
return e = this.parent.list().length, 1 === e || 2 === e || 4 === e;
}, i.prototype.col3 = function() {
return this.parent.list().length <= 3;
}, i.prototype.col4 = function() {
return this.parent.list().length <= 4;
}, i.prototype.columnVariation = function() {
var e, t;
switch (null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0) {
case "2col":
return {
third:0,
four:0,
eight:1
};

case "3col":
return {
third:1,
four:0,
eight:0
};

case "4col":
return {
third:0,
four:1,
eight:0
};
}
}, i.prototype.layout = function() {
var e, t;
return null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0;
}, i.prototype.isTextRight = function() {
return "image" === this.layout() || "alt" === this.layout() && !this.isEven();
}, i;
}(Bobcat.Component), Bobcat.Slider = function(t) {
function i(t, n) {
var o, r, a, s, l, u, c, d, h = this;
for (this.root = t, this.gotoSlide = e(this.gotoSlide, this), this.updateIndex = e(this.updateIndex, this), 
this.select2 = e(this.select2, this), this.select = e(this.select, this), this.add = e(this.add, this), 
this.onClickHandler = e(this.onClickHandler, this), i.__super__.constructor.call(this, this.root, n), 
this.selectedIdx = ko.observable(0), this.formOpen = ko.observable(!1), l = function(e, t) {
var n, i;
return null != (n = window.edit_page) ? null != (i = n.Event) ? i.publish(e, t) :void 0 :void 0;
}, u = function(e, t) {
return h.root.addSubscriber(e, function(e) {
var n;
return null != (n = window.edit_page) && "function" == typeof n.track && n.track("Edit Content - Slider - Editor v1"), 
l(t, e.target);
});
}, o = "Slider.ContentChanged", a = function() {
var e, t, n, i;
for (n = [ /Text\..*/, /BackgroundImage\..*/, /Media\..*/, /Repeatable\..*/ ], i = [], 
e = 0, t = n.length; t > e; e++) r = n[e], i.push([ r, o ]);
return i;
}(), c = 0, d = a.length; d > c; c++) s = a[c], u(s[0], s[1]);
this.root.addSubscriber("Repeatable.Remove", function(e) {
var t;
return 0 === h.list().length ? (t = e.targetParent.closest(".iosslider"), t.find(".slider").css({
"max-height":300
}), t.css({
"max-height":300,
"min-height":300
}), void 0) :(h.selectedIdx() >= h.list().length && h.selectedIdx(h.list().length - 1), 
$(window).trigger("resize"), setTimeout(function() {
return h.gotoSlide(e.targetParent.closest(".iosslider"), h.selectedIdx() + 1);
}, 300));
}), this.root.addSubscriber("Repeatable.Move", function(e) {
return h.selectedIdx(e.extra.newIndex), h.gotoSlide(e.target.closest(".iosslider"), h.selectedIdx() + 1);
}), this.root.addSubscriber(/Text\..*/, function() {
return setTimeout(function() {
return $(window).trigger("resize");
}, 300);
});
}
return n(i, t), i.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".slider-settings"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, i.prototype.add = function(e) {
var t = this;
return this.list().length >= 10 ? ($B.customAlert("You can only add 10 slides!"), 
void 0) :(i.__super__.add.call(this, e), this.triggerEvent("Slider.Add"), 1 === this.list().length ? (this.selectedIdx(0), 
setTimeout(function() {
return t.gotoSlide(e.closest(".iosslider"), t.selectedIdx() + 1);
}, 500)) :void 0);
}, i.prototype.select = function(e) {
var t, n;
return e = $(e), t = e.closest(".selector"), n = e.closest(".slide-list").find(".selector"), 
this.selectedIdx(n.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, i.prototype.select2 = function(e) {
var t, n;
return e = $(e), t = e.closest(".selector"), n = e.closest(".slide-selectors").find(".selector"), 
this.selectedIdx(n.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, i.prototype.updateIndex = function(e) {
var t, n;
return n = $(e).hasClass("prev-button") ? -1 :1, t = Math.max(0, this.selectedIdx() + n), 
t = Math.min(this.list().length - 1, t), this.selectedIdx(t);
}, i.prototype.gotoSlide = function(e, t) {
return e.iosSlider("goToSlide", t);
}, i;
}(Bobcat.Repeatable), Bobcat.SubMenu = function(t) {
function i(t) {
this.add = e(this.add, this), t.subItemClassName = "SubMenuItem", i.__super__.constructor.call(this, this, t), 
this.rootLastData = t;
}
return n(i, t), i.prototype.add = function(e) {
return i.__super__.add.call(this, e), this.selected().edit(), window.edit_page.setupTooltips(), 
window.edit_page.Event.publish("Submenu.add", {}), window.edit_page.track("Editor - Add External Link");
}, i;
}(Bobcat.Repeatable), Bobcat.SubMenuItem = function(t) {
function i() {
return this.remove = e(this.remove, this), this.select = e(this.select, this), this.editDone = e(this.editDone, this), 
this.edit = e(this.edit, this), i.__super__.constructor.apply(this, arguments);
}
return n(i, t), i.prototype.edit = function() {
return this.gotoState("editor");
}, i.prototype.editDone = function() {
return this.gotoState("normal"), this.parent.selected(null);
}, i.prototype.select = function(e) {
return this.isSelected() ? this.parent.selected(null) :(i.__super__.select.call(this, e), 
this.edit());
}, i.prototype.remove = function(e) {
return window.edit_page.removeTooltips(), i.__super__.remove.call(this, e), window.edit_page.Event.publish("Submenu.remove", {});
}, i;
}(Bobcat.RepeatableItem), Bobcat.Gallery = function(t) {
function i(t, n) {
var o, r, a = this;
this.root = t, this.prevImage = e(this.prevImage, this), this.nextImage = e(this.nextImage, this), 
this.changeImage = e(this.changeImage, this), this.errorCallback = e(this.errorCallback, this), 
this.upload = e(this.upload, this), this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.mouseleaveHandler = e(this.mouseleaveHandler, this), 
this.mouseenterHandler = e(this.mouseenterHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.add = e(this.add, this), r = {
sources:{
create:function(e) {
return new Bobcat.Image(a.root, e.data, {}, a);
}
}
}, i.__super__.constructor.call(this, this.root, n, r), this.nullImage = new Bobcat.Image(this.root, {
type:"Image",
url:"",
caption:"",
description:""
}, {}, this), o = function() {
return "";
}, this.emptyImage = {
url:o,
caption:o,
description:o
}, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) :this.current(this.nullImage), 
this.empty = ko.dependentObservable(function() {
return 0 === a.sources().length;
}, this);
}
return n(i, t), i.include(Bobcat.ImageOptionHelper), i.StripHtml = function(e) {
return Bobcat.DOM.GALLERY_IMAGES(e).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove();
}, i.prototype.add = function(e) {
var t;
return console.log("Gallery#add"), t = new Bobcat.Image(this.root, e, {}, this), 
this.sources.push(t), this.current(t), this.storeCommand();
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, i.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, i.prototype.clickEditorHandler = function(e) {
return this.current(e), this.gotoState("editor");
}, i.prototype.clickRemoveCurrentHandler = function() {
return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)), 
this.gotoState("normal");
}, i.prototype.upload = function(e) {
var t, n, i = this;
return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :(n = {
multiple:!0,
maxSize:6291456,
maxFiles:50,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, t = new Bobcat.AssetDialog({
mode:"multi",
hideTabs:[ $B.AssetDialog.ICON_LIB ]
}, function(t) {
var n, o, r, a, s, l;
for (n = e.closest("form"), r = i.getOptions(n), l = [], a = 0, s = t.length; s > a; a++) o = t[a], 
l.push(i.add({
url:$.cloudinary.url("" + o.public_id + "." + o.format, r.custom),
thumb_url:$.cloudinary.url("" + o.public_id + "." + o.format, r.thumb)
}));
return l;
}), filepicker.pickAndStore(n, window.store_options, function(n) {
var o, r, a, s, l, u;
for (window.edit_page.isLoading(!0), console.log(n), o = e.closest("form"), t.closeAssetDialog(), 
a = n.length, u = [], s = 0, l = n.length; l > s; s++) r = n[s], u.push(function(e) {
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var t, n;
return n = function(e) {
var t, n;
return n = i.getOptions(o), t = e.message, i.add({
url:$.cloudinary.url("" + t.public_id + "." + t.format, n.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, n.thumb)
}), a--, 0 === a ? (window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image Gallery"), 
window.edit_page.save(!0)) :void 0;
}, t = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", $B.poller(t, n, i.errorCallback);
},
error:function() {
return $B.customAlert("Sorry, there was an error processing your upload! Our engineers are investigating this issue!"), 
new $B.ExceptionReporter("STRIKINGLY FAILED TO UPLOAD IMAGES: " + JSON.stringify(e) + ", Response: " + JSON.stringify(resp)).report(), 
i.errorCallback();
}
});
}(r));
return u;
}, function(e) {
return e = e.toString(), t.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), t.openAssetDialog());
}, i.prototype.errorCallback = function() {
return window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
}, i.prototype.changeImage = function(e) {
var t;
return t = (this.sources.indexOf(this.current()) + e) % this.sources().length, 0 > t && (t += this.sources().length), 
this.current(this.sources()[t]);
}, i.prototype.nextImage = function() {
return this.changeImage(1);
}, i.prototype.prevImage = function() {
return this.changeImage(-1);
}, i.prototype.isLastElement = function(e) {
return e.parent().find(".thumb").index(e) === this.sources().length - 1;
}, i.prototype.afterRender = function(e) {
var t;
return this.isLastElement($(e)) ? (t = Bobcat.DOM.GALLERY($(e)), t.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
})) :void 0;
}, i;
}(Bobcat.Component), Bobcat.Button = function(t) {
function i(t, n) {
this.root = t, this.toggleTarget = e(this.toggleTarget, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.changeUrl = e(this.changeUrl, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.link_url = e(this.link_url, this), this.target = e(this.target, this), "undefined" == typeof n.new_target && (n.new_target = !0), 
i.__super__.constructor.call(this, this.root, n, {});
}
return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.target = function() {
return this.new_target() && "" !== this.url() ? "_blank" :"_self";
}, i.prototype.link_url = function() {
var e;
return e = this.url(), this.addProtocol(e);
}, i.prototype.doneClickHandler = function(e) {
var t;
return t = this.addProtocol(this.url()), this.url(t), i.__super__.doneClickHandler.call(this, e);
}, i.prototype.changeUrl = function(e) {
return this.url(e.attr("data-url"));
}, i.prototype.remove = function(e) {
return this.text(""), this.url(""), this.new_target(!1), this.doneClickHandler(e);
}, i.prototype.hasContent = function() {
return this.text().length > 0;
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.clickEditorHandler = function(e) {
return this.oldText = this.text(), this.oldUrl = this.url(), i.__super__.clickEditorHandler.call(this, e);
}, i.prototype.clickCancelEditorHandler = function() {
return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
}, i.prototype.toggleTarget = function() {
return this.new_target(!this.new_target());
}, i;
}(Bobcat.Component), Bobcat.Image = function(t) {
function i(t, n, o, r) {
var a = this;
this.root = t, this.parent = r, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.clickRemoveHandler = e(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.addFilter = e(this.addFilter, this), this.uploadFile = e(this.uploadFile, this), 
this.errorCallback = e(this.errorCallback, this), this.upload = e(this.upload, this), 
this.link = e(this.link, this), this.selectImage = e(this.selectImage, this), this.recover = e(this.recover, this), 
this.previewImage = e(this.previewImage, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.showDescriptionInput = e(this.showDescriptionInput, this), this.openAssetLib = e(this.openAssetLib, this), 
this.openDescriptionInput = e(this.openDescriptionInput, this), this.showLinkInput = e(this.showLinkInput, this), 
this.openLinkInput = e(this.openLinkInput, this), this.goToDescriptionField = e(this.goToDescriptionField, this), 
this.goToLinkUrlField = e(this.goToLinkUrlField, this), this.target = e(this.target, this), 
this.isNull(n.original_url) && (n.original_url = n.url), this.isNull(n.new_target) && (n.new_target = !0), 
n.linkInputEnabled = n.link_url ? n.link_url.length > 0 :!1, n.descriptionInputEnabled = n.caption ? n.caption.length > 0 :!1, 
this.isNull(n.caption) && (n.caption = ""), this.isNull(n.description) && (n.description = ""), 
i.__super__.constructor.call(this, this.root, n, o), this.parent && (this.selected = ko.dependentObservable(function() {
return a === a.parent.current();
}, this)), this.assetUrl = ko.dependentObservable(function() {
return window.asset_path(a.url());
}, this), this.loadingSpinner = !0;
}
return n(i, t), i.include(Bobcat.UrlHelper), i.include(Bobcat.ImageOptionHelper), 
i.prototype.target = function() {
return this.new_target() && "" !== this.link_url() ? "_blank" :"_self";
}, i.prototype.goToLinkUrlField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find(".link_url").focus(), window.el = t;
}, i.prototype.goToDescriptionField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find("textarea").focus(), window.el = t;
}, i.prototype.openLinkInput = function() {
return this.linkInputEnabled(!0);
}, i.prototype.showLinkInput = function() {
return this.linkInputEnabled();
}, i.prototype.openDescriptionInput = function() {
return this.descriptionInputEnabled(!0);
}, i.prototype.openAssetLib = function(e, t) {
return this.upload(e, t, !0), window.edit_page.track("Click More Icons Button - Editor v1");
}, i.prototype.showDescriptionInput = function() {
return this.descriptionInputEnabled();
}, i.prototype.doneClickHandler = function(e) {
return i.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("ImageComponent.afterChange", {
target:e.closest(".image-component")
});
}, i.prototype.previewImage = function(e) {
return this.tmpUrl || (this.tmpUrl = this.url()), this.url(e.attr("data-image-url")), 
this.onPreview = !0;
}, i.prototype.recover = function() {
return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") :void 0;
}, i.prototype.selectImage = function(e) {
return this.url(e.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1, 
this.doneClickHandler(e.closest(".editor").find(".se-done-btn").first());
}, i.prototype.link = function() {
var e;
return e = this.link_url(), this.addProtocol(e);
}, i.prototype.upload = function(e, t, n) {
var i, o, r, a = this;
return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :($B.log(window.filepicker_options), r = {
maxSize:6291456,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, o = {
mode:"single"
}, 1 === e.data("open-iconlib-tab") && (o.initialTabIdx = 2), null != n ? (o.initialTabIdx = 2, 
o.iconLibComponents = n === !0 ? "icon" :"background") :"BackgroundImage" === this.type() ? o.iconLibComponents = "background" :"Image" === this.type() && (o.iconLibComponents = "icon"), 
i = new Bobcat.AssetDialog(o, function(t) {
var n;
return n = a.getOptions(e.closest("form")), null != t.public_id ? ("BackgroundImage" === a.type() && "gif" !== t.format && (t.format = "jpg", 
n.custom.quality = 90, n.custom.flags = "progressive"), a.loadData({
url:$.cloudinary.url("" + t.public_id + "." + t.format, n.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, n.thumb),
original_url:t.url
})) :(a.loadData({
url:t.url,
thumb_url:t.thumb_url,
original_url:t.url
}), "BackgroundImage" === a.type() && null != t.extraOptions && (null != t.extraOptions.backgroundClassName && a.selectedClassName(t.extraOptions.backgroundClassName), 
null != t.extraOptions.backgroundSizing && a.style(t.extraOptions.backgroundSizing))), 
"BackgroundImage" === a.type() ? window.edit_page.Event.publish("Background.changeBackgroundImage") :void 0;
}), filepicker.pickAndStore(r, window.store_options, function(t) {
var n, o;
return o = t[0], n = e.closest("form"), window.edit_page.isLoading(!0), a.oldUrl = a.url(), 
a.loadingSpinner && a.url($('meta[name="loading-image-spinner"]').attr("content")), 
a.uploadFile(o, a.getOptions(n)), i.closeAssetDialog();
}, function(e) {
return e = e.toString(), i.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), i.openAssetDialog());
}, i.prototype.errorCallback = function(e) {
return this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
window.edit_page.track("Editor - UploadErrors", e.responseText);
}, i.prototype.uploadFile = function(e, t) {
var n = this;
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var i, o;
return o = function(e) {
var i;
return i = e.message, "BackgroundImage" === n.type() && "gif" !== i.format && (i.format = "jpg", 
t.custom.quality = 90, t.custom.flags = "progressive"), n.loadData({
url:$.cloudinary.url("" + i.public_id + "." + i.format, t.custom),
thumb_url:$.cloudinary.url("" + i.public_id + "." + i.format, t.thumb),
original_url:i.url
}), window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image"), 
"BackgroundImage" === n.type() ? (n.oldUrl = n.url(), window.edit_page.Event.publish("Background.changeBackgroundImage"), 
n.storeCommand()) :void 0;
}, console.log("Begin poll"), i = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", 
$B.poller(i, o, n.errorCallback);
},
error:this.errorCallback
});
}, i.prototype.addFilter = function(e) {
var t, n, i = this;
return "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")), 
void 0) :(n = "free" === $S.user_meta.plan ? [ "effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast" ] :[ "enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish" ], 
t = function(e) {
return e = window.asset_path(e), e.replace("https", "http");
}, window.featherEditor.launch({
tools:n,
onSave:function(t, n) {
var o;
return window.edit_page.isLoading(!0), i.oldUrl = i.url(), i.loadingSpinner && i.url($('meta[name="loading-image-spinner"]').attr("content")), 
window.featherEditor.close(), o = e.closest("form"), i.uploadFile({
url:n,
persist:"no"
}, i.getOptions(o));
},
image:e.closest("form").find("img"),
url:t(this.url())
}));
}, i.prototype.clickEditorHandler = function(e) {
return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), i.__super__.clickEditorHandler.call(this, e);
}, i.prototype.clickCancelEditorHandler = function() {
return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
}, i.prototype.clickGalleryEditorHandler = function(e) {
return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"), 
setTimeout(function() {
return $(window).scrollTo(e.closest(".editable").find(".editor"), {
easing:"easeOutQuint",
duration:300,
axis:"y",
offset:-150
});
}, 200)) :void 0;
}, i.prototype.clickRemoveHandler = function() {
return this.parent.sources.remove(this), this.parent.storeCommand();
}, i.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
}, i.prototype.hasContent = function() {
return !this.isImageTransparent(this.url());
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i;
}(Bobcat.Component), Bobcat.TextStyle = function(e) {
function t(e, n, i) {
this.root = e, this.parent = i, t.__super__.constructor.call(this, this.root, n, {});
}
return n(t, e), t;
}(Bobcat.Component), Bobcat.BackgroundImage = function(t) {
function i(t, n) {
var o, r, a, s, l, u = this;
if (this.root = t, this.onDoneHandler = e(this.onDoneHandler, this), this.onClickHandler = e(this.onClickHandler, this), 
this.saveSelection = e(this.saveSelection, this), this.selectImage = e(this.selectImage, this), 
this.stockImages = e(this.stockImages, this), this.bgObject = e(this.bgObject, this), 
this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this), 
this.remove = e(this.remove, this), this.selectedStyleLazy = e(this.selectedStyleLazy, this), 
this.selectedStyle = e(this.selectedStyle, this), this.textStyle = e(this.textStyle, this), 
this.inImageMode = e(this.inImageMode, this), this.getSelectedClassName = e(this.getSelectedClassName, this), 
this.selectBackgroundVariation = e(this.selectBackgroundVariation, this), this.previewBackgroundVariation = e(this.previewBackgroundVariation, this), 
this.uploadFromLib = e(this.uploadFromLib, this), this.hasBackgroundVariations = e(this.hasBackgroundVariations, this), 
r = {}, r.textStyles = {
create:function(e) {
return new Bobcat.TextStyle(u.root, e.data, u);
}
}, "undefined" != typeof n.textStyles && n.textStyles && n.selectedClassName || (n.textStyles = [], 
n.textStyles.push({
type:"TextStyle",
displayName:"Light Text",
colorCode:"#ffffff",
className:"strikingly-light-text"
}), n.textStyles.push({
type:"TextStyle",
displayName:"Dark Text",
colorCode:"#222222",
className:"strikingly-dark-text"
}), n.selectedClassName = "strikingly-light-text"), null == n.backgroundVariation && (n.backgroundVariation = ""), 
this.backgroundVariations = [], null != $S.conf.theme_background_variations) {
l = $S.conf.theme_background_variations;
for (o in l) s = l[o], a = $.extend(!0, {}, s), a.component = this, this.backgroundVariations.push(a);
}
i.__super__.constructor.call(this, this.root, n, r, null), this.opacity_f = ko.dependentObservable(function() {
return u.opacity() / 100;
}), this.onPreview = !1, this.formOpen = ko.observable(!1), this.loadingSpinner = !1, 
this.selectedClassName.subscribe(function(e) {
return u.triggerEvent("BackgroundImage.ChangeTextColor", e);
});
}
return n(i, t), i.prototype.hasBackgroundVariations = function() {
return this.backgroundVariations.length > 0;
}, i.prototype.uploadFromLib = function(e) {
return this.upload(e, null, !1);
}, i.prototype.previewBackgroundVariation = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.onPreview = !0;
}, i.prototype.selectBackgroundVariation = function(e) {
var t;
return this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.saveSelection(), this.onPreview = !1, "function" == typeof (t = window.edit_page).track && t.track("Change Variation - Background - Editor v1"), 
this.triggerEvent("BackgroundImage.ChangeVariation", e), window.edit_page.Event.publish("Background.changeBackgroundVariation", {
target:e
});
}, i.prototype.getSelectedClassName = function() {
return !window.edit_page.isShowPage && this.hasBackgroundVariations() ? this.hasContent() ? this.selectedClassName() :this.backgroundVariation() :"" !== ("function" == typeof this.backgroundVariation ? this.backgroundVariation() :void 0) ? this.backgroundVariation() :!this.hasBackgroundVariations() || this.hasContent() ? this.selectedClassName() :"";
}, i.prototype.inImageMode = function() {
return this.hasBackgroundVariations() ? this.hasContent() || this.onPreview ? !0 :!1 :!0;
}, i.prototype.textStyle = function() {
var e, t = this;
return e = this.textStyles().filter(function(e) {
return e.className() === t.selectedClassName();
}), e[0];
}, i.prototype.selectedStyle = function() {
var e, t, n;
return t = function() {
switch (this.style()) {
case "cover":
return "cover";

case "contain":
return "contain";

case "100%":
return "100%";

case "stretch":
return "100%";

case "fit":
return "cover";

default:
return "auto";
}
}.call(this), e = function() {
switch (this.style()) {
case "tile":
return "repeat";

default:
return "no-repeat";
}
}.call(this), n = {
backgroundPosition:"49% 50%",
backgroundImage:"url(" + this.assetUrl() + ")",
backgroundRepeat:e,
backgroundSize:t
};
}, i.prototype.selectedStyleLazy = function() {
var e;
return e = this.selectedStyle(), e.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")", 
e;
}, i.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.storeCommand();
}, i.prototype.previewImage = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.onPreview = !0;
}, i.prototype.recover = function() {
return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.backgroundVariation(this.oldBackgroundVariation), 
this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", this.onPreview = !1) :void 0;
}, i.prototype.bgObject = function(e) {
return {
url:"http://uploads.striking.ly/page/images/backgrounds/" + e + ".jpg",
thumbUrl:"http://uploads.striking.ly/page/images/backgrounds/" + e + "-thumb.jpg",
style:"stretch",
component:this
};
}, i.prototype.stockImages = function(e) {
var t, n, i, o, r, a, s, l, u;
if ("solidBanner" === e) {
for (a = [ "banners/banner1", "bg3", "banners/banner3" ], l = [], n = 0, o = a.length; o > n; n++) t = a[n], 
l.push(this.bgObject(t));
return l;
}
for (s = [ "bg1", "bg5", "bg6" ], u = [], i = 0, r = s.length; r > i; i++) t = s[i], 
u.push(this.bgObject(t));
return u;
}, i.prototype.selectImage = function(e) {
return this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.saveSelection(), 
this.triggerEvent("BackgroundImage.SelectImage", e);
}, i.prototype.saveSelection = function() {
return this.storeCommand(), this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", 
this.onPreview = !1, window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved();
}, i.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".background-form"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, i.prototype.onDoneHandler = function(e) {
var t;
return t = e.closest(".background-form"), t.slideUp(), window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved(), this.formOpen(!1);
}, i;
}(Bobcat.Image), Bobcat.SlideSettings = function(t) {
function i(t, n) {
var o = this;
this.root = t, this.data = n, this.isSkinny = e(this.isSkinny, this), this.onClickHandler = e(this.onClickHandler, this), 
this.initWhenBound = e(this.initWhenBound, this), this.layoutCount = ko.observable(0), 
this.layoutIndex = ko.observable(0), this.layoutStatus = ko.dependentObservable(function() {
return "" + (o.layoutIndex() + 1);
}), null == n.layout_variation && (n.layout_variation = ""), i.__super__.constructor.call(this, this.root, n);
}
return n(i, t), i.prototype.initWhenBound = function(e) {
var t;
return t = e.data("layout-presets"), this.layouts = _.pluck(t, "key"), this.layoutCount(this.layouts.length), 
this.layoutIndex(this.layouts.indexOf(this.layout_variation())), -1 === this.layoutIndex() && (this.layout_variation(this.layouts[0]), 
this.layoutIndex(0)), this.data.layout_variation = this.layout_variation;
}, i.prototype.onClickHandler = function() {
return this.layout_variation(this.layouts[(this.layoutIndex() + 1) % this.layouts.length]), 
this.layoutIndex(this.layouts.indexOf(this.layout_variation())), this.rootLastData = this.data, 
window.edit_page.unsavedChanges() && window.edit_page.track("Change Layout - Editor v1"), 
window.edit_page.saveWhenUnsaved();
}, i.prototype.isSkinny = function() {
return "skinny" === this.layout_variation();
}, i;
}(Bobcat.Component), Bobcat.Menu = function(e) {
function t(e) {
var n, i = this;
this.data = e, n = {}, n.components = {
create:function(e) {
var t, n, o, r;
n = {}, n.firstSlideBackground = function(e) {
return null == e && (e = "background1"), window.edit_page.data.slides()[0].components[e];
}, r = e.data;
for (t in r) o = r[t], n[t] = "Image" === o.type ? new Bobcat[o.type](i, o, {}, null) :new Bobcat[o.type](i, o), 
"undefined" != typeof n[t].init && n[t].init();
return n;
}
}, t.__super__.constructor.call(this, this, this.data, n), this.rootLastData = this.data;
}
return n(t, e), t.prototype.bind = function(e) {
var t, n, i, o;
if (e.length > 0) {
for (o = [], n = 0, i = e.length; i > n; n++) t = e[n], o.push(ko.applyBindings(this.components, t));
return o;
}
return console.warn("Cannot find .navigator");
}, t.prototype.hideAllEditors = function() {
return this.logo.hideEditorHandler();
}, t;
}(Bobcat.Component), Bobcat.Footer = function(e) {
function t(e) {
var n, i = this;
n = {
socialMedia:{
create:function(e) {
return new Bobcat[e.data.type](i, e.data, i);
}
},
copyright:{
create:function(e) {
return new Bobcat[e.data.type](i, e.data, i);
}
}
}, t.__super__.constructor.call(this, this, e, n), this.rootLastData = e;
}
return n(t, e), t.prototype.lastSlideBackground = function(e) {
var t;
return null == e && (e = "background1"), t = window.edit_page.data.slides().length - 1, 
window.edit_page.data.slides()[t].components[e];
}, t.prototype.bind = function(e) {
return e.length > 0 ? (ko.applyBindings(this, e.get(0)), this.socialMedia.bind()) :console.warn("Cannot find #footer");
}, t;
}(Bobcat.Component), Bobcat.Media = function(t) {
function i(t, n) {
var o, r = this;
this.root = t, this.inEditorAndHasNoContent = e(this.inEditorAndHasNoContent, this), 
this.hasNoContentAndIsEditMode = e(this.hasNoContentAndIsEditMode, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.showImage = e(this.showImage, this), 
this.showVideo = e(this.showVideo, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
o = {
video:{
create:function(e) {
return new Bobcat.Video(r.root, e.data, r);
}
},
image:{
create:function(e) {
return new Bobcat.Image(r.root, e.data, {}, r);
}
}
}, i.__super__.constructor.call(this, this.root, n, o);
}
return n(i, t), i.prototype.clickEditorHandler = function(e) {
return i.__super__.clickEditorHandler.call(this, e), this.image.clickEditorHandler(e), 
this.video.clickEditorHandler(e), this.triggerEvent("Media.BeforeChange", {
target:e
});
}, i.prototype.clickCancelEditorHandler = function(e) {
return this.image.clickCancelEditorHandler(e), this.video.clickCancelEditorHandler(e), 
this.hideEditorHandler();
}, i.prototype.doneClickHandler = function(e) {
return i.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("Media.afterChange"), 
this.triggerEvent("Media.AfterChange", {
target:e
});
}, i.prototype.showVideo = function() {
return "video" === this.current() && this.video.html() && this.video.html().length > 0;
}, i.prototype.showImage = function() {
return "image" === this.current();
}, i.prototype.hasContent = function() {
return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.hasNoContentAndIsEditMode = function() {
return !window.edit_page.isShowPage && !this.hasContent();
}, i.prototype.inEditorAndHasNoContent = function() {
return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
}, i;
}(Bobcat.Component), Bobcat.EmailForm = function(t) {
function i(t, n) {
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasMessageBox = e(this.hasMessageBox, this), 
this.hasNameBox = e(this.hasNameBox, this), this.hasEmailBox = e(this.hasEmailBox, this), 
this.isEmailInvalid = e(this.isEmailInvalid, this), this.isNameEmpty = e(this.isNameEmpty, this), 
this.isSuccess = e(this.isSuccess, this), this.isError = e(this.isError, this), 
this.submit = e(this.submit, this), n.isLoading = !1, n.recipient || (n.recipient = ""), 
this.isNull(n.hideMessageBox) && (n.hideMessageBox = !1), this.isNull(n.hide_name) && (n.hide_name = !1), 
this.isNull(n.hide_email) && (n.hide_email = !1), this.isNull(n.thanksMessage) && (n.thanksMessage = "Thanks for your message!"), 
null == $S.page_meta.edit_count && $S.page_meta.show_strikingly_logo && (n.thanksMessage = $("#brand-info").html().replace(/\${thanksMessage}/, n.thanksMessage)), 
this.isNull(n.name_label) && (n.name_label = "Name", n.email_label = "Email", n.message_label = "Message"), 
this.isNull(n.submit_label) && (n.submit_label = "Submit"), i.__super__.constructor.call(this, this.root, n, {}), 
this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
}
return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.isRecipientEmailValid = function() {
return 0 === this.recipient().length || this.isEmail(this.recipient());
}, i.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, i.prototype.submit = function(e) {
var t = this;
if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), e.closest("form").ajaxSubmit({
success:function(e) {
return console.log(e), t.status(e.status), t.isLoading(!1), _gaq.push([ "_trackEvent", "Actions", "EmailCollected" ]), 
_gaq.push([ "b._trackEvent", "Actions", "EmailCollected" ]), window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(e) {
var n;
if (n = jQuery.parseJSON(e.responseText), console.log(n), t.status(n.status), t.isLoading(!1), 
!n.message) throw alert(n.html), n.html;
return n.message.invalid_email && t.invalidEmail(!0), n.message.invalid_name ? t.invalidName(!0) :void 0;
}
});
}, i.prototype.isError = function() {
return "error" === this.status();
}, i.prototype.isSuccess = function() {
var e;
return e = this.status(), "ok" === e;
}, i.prototype.isNameEmpty = function() {
return this.invalidName();
}, i.prototype.isEmailInvalid = function() {
return this.invalidEmail();
}, i.prototype.hasEmailBox = function() {
return !this.hide_email();
}, i.prototype.hasNameBox = function() {
return !this.hide_name();
}, i.prototype.hasMessageBox = function() {
return !this.hideMessageBox();
}, i.prototype.clickEditorHandler = function(e) {
return i.__super__.clickEditorHandler.call(this, e);
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i.prototype.doneClickHandler = function(e) {
return i.__super__.doneClickHandler.call(this, e), window.edit_page.track("Edit Contact Form - Editor v1");
}, i;
}(Bobcat.Component);
}.call(this), function() {
var e, t = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, n = {}.hasOwnProperty, i = function(e, t) {
function i() {
this.constructor = e;
}
for (var o in t) n.call(t, o) && (e[o] = t[o]);
return i.prototype = t.prototype, e.prototype = new i(), e.__super__ = t.prototype, 
e;
};
e = function(e) {
var t, n, i, o, r, a, s, l, u;
if (null != (u = $S.conf) ? u.font_size :void 0) return t = [ 60, 80, 100, 130, 160 ], 
i = 14, n = 84, a = function(e) {
var t, n;
return t = 100, n = parseFloat($(e.getBody()).css("font-size")), $(e.getBody()).find("*").each(function() {
var e, i;
return e = null != (i = this.style) ? i.fontSize :void 0, -1 !== (null != e ? e.indexOf("%") :void 0) ? (t = parseFloat(e), 
n = parseFloat($(this).css("font-size")), !1) :void 0;
}), {
perc:t,
px:n
};
}, r = function(e, o) {
var r, s, l;
return s = a(e), s.px >= n && o > 0 ? !1 :s.px <= i && 0 > o ? !1 :(l = $.inArray(s.perc, t), 
-1 === l && (l = $.inArray(100, t)), r = l + o, r > t.length - 1 ? !1 :0 > r ? !1 :t[r] + "%");
}, l = function(e, t) {
var n;
return n = e.selection.getBookmark(), e.selection.select(e.getBody(), !0), e.execCommand("FontSize", null, t), 
e.execCommand("LineHeight", null, t), e.selection.moveToBookmark(n);
}, s = function(e) {
var t;
return (t = r(e, 1)) ? (l(e, t), window.analytics.track("Font Size Up - Editor v1")) :void 0;
}, o = function(e) {
var t;
return (t = r(e, -1)) ? (l(e, t), window.analytics.track("Font Size Down - Editor v1")) :void 0;
}, e.addButton("fontsizeup", {
title:"Increase Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-up.png"),
onclick:function() {
return s(e);
}
}), e.addButton("fontsizedown", {
title:"Decrease Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-down.png"),
onclick:function() {
return o(e);
}
}), e.onExecCommand.add(function(e, t) {
var n;
return "InsertUnorderedList" === t || "InsertOrderedList" === t ? (n = r(e, 0), 
$(e.getBody()).find("li *").each(function() {
var e, t;
return (null != (e = this.style) ? null != (t = e.fontSize) ? t.indexOf(!0) :void 0 :void 0) ? this.style.fontSize = "" :void 0;
}), l(e, n)) :void 0;
});
}, $B.RichText = function(n) {
function o(e, n) {
this.root = e, this.isCenterAligned = t(this.isCenterAligned, this), this.isRightAligned = t(this.isRightAligned, this), 
this.isLeftAligned = t(this.isLeftAligned, this), this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), 
this.showEmptyText = t(this.showEmptyText, this), this.hasContent = t(this.hasContent, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.changeFontHandler = t(this.changeFontHandler, this), 
this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), this.textValue = t(this.textValue, this), 
this.doneClickHandler = t(this.doneClickHandler, this), this._triggerEvent = t(this._triggerEvent, this), 
this.deleteHandler = t(this.deleteHandler, this), o.__super__.constructor.call(this, this.root, n), 
this.textarea = null, this.editor = null, this.originText = null;
}
return i(o, n), o.TINYMCE_OPTIONS = {
gecko_spellcheck:!0,
theme:"advanced",
skin:"striking",
plugins:"autoresize,paste,inlinepopups",
forced_root_block:"div",
remove_linebreaks:!1,
theme_advanced_buttons1:"bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull,fontsizeup,fontsizedown",
theme_advanced_buttons2:"",
theme_advanced_statusbar_location:"none",
theme_advanced_toolbar_align:"left",
paste_text_sticky:!0,
paste_remove_styles:!0,
paste_strip_class_attributes:"all",
convert_urls:!1,
relative_urls:!1,
valid_styles:{
"*":"text-align,text-decoration,font-size"
}
}, o.prototype.deleteHandler = function(e, t) {
return t.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""), 
this.editor.tinymce().focus()) :void 0;
}, o.prototype.init = function() {}, o.prototype._triggerEvent = function(e, t) {
return this.triggerEvent(e, {
component:this,
target:t.closest(".text-component")
});
}, o.prototype.doneClickHandler = function(e) {
return this.done(), o.__super__.doneClickHandler.call(this, e), e ? (window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
target:e.closest(".text-component")
}), this._triggerEvent("Text.Save", e)) :void 0;
}, o.prototype.textValue = function() {
return this.value().replace(/<\/?.*?>/g, "");
}, o.prototype.clickCancelEditorHandler = function(e) {
return this.cancel(), this.hideEditorHandler(), this._triggerEvent("Text.Cancel", e);
}, o.prototype.changeFontHandler = function(e) {
return this.doneClickHandler(e), window.edit_page.showStylePanel(e.attr("text-type")), 
window.edit_page.showMenu(), this._triggerEvent("Text.ChangeFont", e);
}, o.prototype.clickEditorHandler = function(t) {
var n = this;
if (o.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find($B.DOM.EDITOR).find("textarea"), 
this.originText = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce($.extend({
setup:function(i) {
return i.onChange.add(function() {
return n._triggerEvent("Text.ChangeText", t);
}), e(i), i.onInit.add(function(e) {
return $(e.getBody()).css({
"font-size":t.css("font-size"),
"text-align":t.css("text-align")
}), e.pasteAsPlainText = !0;
}), i.onKeyDown.add(function(e, t) {
return 13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor() ? ($(window).resize(), 
t.preventDefault()) :void 0;
}), i.onClick.add(function(e) {
return $(e.getBody()).find("a").each(function(e, t) {
var i;
return i = $(t).attr("href"), n.pattern || (n.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")), 
n.pattern.test(i) ? ($(t).attr("href", "http://" + i), $(t).attr("data-mce-href", "http://" + i)) :void 0;
});
});
}
}, this.constructor.TINYMCE_OPTIONS))), this.editor.tinymce() && this.editor.tinymce().focus(), 
this.editor.init(), this._triggerEvent("Text.ClickEditor", t);
}, o.prototype.hasContent = function() {
return !/^\s*$/.test(this.value());
}, o.prototype.showEmptyText = function() {
return !this.hasContent() && !this.isState("editor");
}, o.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, o.prototype.isLeftAligned = function() {
return /style="text-align: left;"/.test(this.value());
}, o.prototype.isRightAligned = function() {
return /style="text-align: right;"/.test(this.value());
}, o.prototype.isCenterAligned = function() {
return /style="text-align: center;"/.test(this.value());
}, o.prototype.done = function() {
var e;
return this.editor && this.editor.tinymce() ? (e = this.filterText(this.textarea.val()), 
this.value(e), this.originText = e) :void 0;
}, o.prototype.filterText = function(e) {
return e = e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), e.replace("<p><br></p>", "");
}, o.prototype.cancel = function() {
return this.editor && this.editor.tinymce() ? (this.value(this.originText), this.textarea.tinymce().execCommand("mceSetContent", !1, this.originText)) :void 0;
}, o.prototype.beforeMoveHandler = function() {
return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) :void 0;
}, o.prototype.afterMoveHandler = function() {}, o;
}($B.Text);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function i() {
this.constructor = e;
}
for (var o in n) t.call(n, o) && (e[o] = n[o]);
return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype, 
e;
};
Bobcat.HtmlComponent = function(t) {
function i(t, n) {
this.root = t, this.saveComponent = e(this.saveComponent, this), this.reloadIframe = e(this.reloadIframe, this), 
this.doneClickHandler = e(this.doneClickHandler, this), this.update = e(this.update, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.initWhenBound = e(this.initWhenBound, this), 
this.destroy = e(this.destroy, this), this.data = n, n.htmlValue = this.htmlDecode(n.value), 
n.selected_app_name || (n.selected_app_name = null), "undefined" == typeof n.render_as_iframe && (n.render_as_iframe = !1), 
n.app_list || (n.app_list = "{}"), n.editorIframeSrc = n.selected_app_name ? "/s/html_editor/" + n.id :"/s/editor/app_store_placeholder", 
i.__super__.constructor.call(this, this.root, n, {}), this.appList = jQuery.parseJSON(n.app_list), 
this.originalIframeSrc = this.editorIframeSrc();
}
return n(i, t), i.include(Bobcat.HtmlHelper), i.prototype.destroy = function() {
var e;
return e = $.ajax("/s/components/" + this.id(), {
type:"DELETE",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function() {},
error:function(e) {
var t;
return t = jQuery.parseJSON(e.responseText);
}
});
}, i.prototype.initWhenBound = function(e) {
var t;
return t = e.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(t);
}, i.prototype.clickEditorHandler = function() {
var e, t, n = this;
return t = {
id:this.id(),
value:this.value(),
htmlValue:this.htmlValue(),
render_as_iframe:this.render_as_iframe(),
app_list:this.app_list(),
selected_app_name:this.selected_app_name()
}, e = new $B.AppStoreDialog(t, function(t) {
return n.update(t), e.close();
}, function() {
return e.close();
});
}, i.prototype.update = function(e) {
return e.id === this.id() ? (this.value(e.value), this.htmlValue(e.htmlValue), this.render_as_iframe(e.render_as_iframe), 
this.app_list(e.app_list), this.selected_app_name(e.selected_app_name), this.saveComponent(), 
window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand()) :void 0;
}, i.prototype.doneClickHandler = function(e) {
return this.done(e) !== !1 ? i.__super__.doneClickHandler.call(this, e) :void 0;
}, i.prototype.cancel = function() {
return this.value(this.htmlEncode(this.originText)), this.htmlValue(this.originText);
}, i.prototype.reloadIframe = function() {
var e;
return this.iframeSrcQ || (this.iframeSrcQ = 0), e = "" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ, 
~e.indexOf("/s/editor/app_store_placeholder") && (e = "/s/html_editor/" + this.id(), 
this.originalIframeSrc = e), this.editorIframeSrc(e);
}, i.prototype.saveComponent = function() {
var e, t = this;
return e = ko.mapping.toJS(this), $.ajax("/s/components/" + this.id(), {
dataType:"json",
type:"PUT",
data:{
component:{
value:ko.toJSON(e)
}
},
success:function() {
return t.reloadIframe();
}
});
}, i;
}(Bobcat.Component);
}.call(this), function() {
ko.bindingHandlers.runWhenBound = {
init:function(e, t) {
return t()($(e));
}
}, ko.bindingHandlers.enterKey = {
init:function(e, t, n, i) {
var o, r;
return r = function(e) {
return 13 === e.which ? t().call(this, e) :void 0;
}, o = function() {
return {
keyup:r
};
}, ko.bindingHandlers.event.init(e, o, n, i);
}
}, ko.bindingHandlers.enterKeyPress = {
init:function(e, t, n, i) {
var o, r;
return r = function(n) {
return 13 === n.which ? t().call(this, n, e) :!0;
}, o = function() {
return {
keypress:r
};
}, ko.bindingHandlers.event.init(e, o, n, i);
}
}, ko.bindingHandlers.className = {
update:function(e, t) {
var n;
return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__), 
n = ko.utils.unwrapObservable(t()), $(e).addClass(n), e.__ko__previousClassValue__ = n;
}
}, ko.bindingHandlers.htmlValue = {
init:function(e, t, n) {
return ko.utils.registerEventHandler(e, "blur", function() {
var i, o, r;
return r = t(), o = e.innerHTML, ko.isWriteableObservable(r) ? r(o) :(i = n(), i._ko_property_writers && i._ko_property_writers.htmlValue ? i._ko_property_writers.htmlValue(o) :void 0);
});
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), (null === n || void 0 === n) && (n = ""), 
"textarea" === e.tagName.toLowerCase() ? $(e).val(n) :e.innerHTML = n;
}
}, ko.bindingHandlers.escapedValue = {
init:ko.bindingHandlers.value.init,
update:function(e, t) {
var n, i, o;
return o = ko.utils.unwrapObservable(t()), n = /<script\b[^>]*>([\s\S]*?)<\/script>/gim, 
i = /<\/script>/gim, o && (o = o.replace(n, "").replace(i, "")), t()(o), ko.bindingHandlers.value.update(e, t);
}
}, ko.bindingHandlers.mouseenter = {
init:function(e, t) {
return $(e).mouseenter(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseleave = {
init:function(e, t) {
return $(e).mouseleave(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseover = {
init:function(e, t) {
return $(e).mouseover(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseout = {
init:function(e, t) {
return $(e).mouseout(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseclick = {
init:function(e, t) {
return $(e).click(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.fadeVisible = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().fadeTo(400, 0, function() {
return $(e).css("visibility", "hidden");
});
}
}, ko.bindingHandlers.fadeVisibleAndHide = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().hide();
}
}, ko.bindingHandlers.data = {
update:function(e, t) {
var n, i, o, r;
o = ko.utils.unwrapObservable(t()) || {}, r = [];
for (n in o) i = o[n], i = ko.utils.unwrapObservable(i), "other" === n && "bananas" !== i && console.log(i), 
r.push($(e).data(n, i));
return r;
}
}, ko.bindingHandlers.bind = {
init:function(e, t) {
var n, i, o;
return o = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(o.data), 
i = ko.utils.unwrapObservable(o.html), i ? ($(e).html(i), ko.applyBindings(n, e)) :void 0;
},
update:function(e, t) {
var n, i, o;
return o = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(o.data), 
i = ko.utils.unwrapObservable(o.html), i ? ($(e).html(i), ko.applyBindings(n, e)) :void 0;
}
}, ko.bindingHandlers.slideVisible = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n), $(e).data("animating", !1);
},
update:function(e, t) {
var n;
return n = t(), n ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing", function() {
return $(this).data("animating", !1);
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.slideVisibleAndMoveTo = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n), $(e).data("animating", !1);
},
update:function(e, t) {
var n;
return n = t(), n ? ($(e).data("animating", !0), $("html, body").stop().animate({
scrollTop:$(e).parent().offset().top - 100
}, 1200, "easeInOutQuart", function() {
return $(e).slideDown(600, "swing", function() {
return $(this).data("animating", !1);
});
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.bannerVisible = {
init:function(e, t, n, i) {
return i.isFirst() && i.select(), $(e).show().css({
left:"0%"
});
},
update:function(e, t, n, i) {
var o, r, a, s;
if (s = $(e), a = ko.utils.unwrapObservable(t()), o = i.parent.direction(), window.lol = i.parent, 
a) {
if (i.animated) return;
return console.log("show " + i.index() + " " + o), r = o > 0 ? "100%" :"-100%", 
s.stop().css({
left:r
}).animate({
left:"0%"
}), i.animated = !0;
}
return i.animated !== !1 ? (console.log("hide " + i.index() + " " + o), r = o > 0 ? "-100%" :"100%", 
s.stop().css({
left:"0%"
}).animate({
left:r
}), i.animated = !1) :void 0;
}
}, ko.bindingHandlers.slidyButtonSlide = {
init:function() {},
update:function(e, t) {
var n, i, o;
if (o = t()) ; else if (n = $(e).children(".icon"), i = $(e).children(".title"), 
!$(e).data("mouseover")) return i.stop(!0), i.css("left", "0"), i.hide("slide", {
direction:"left"
}, 250), i.removeClass("hover"), n.removeClass("hover");
}
}, ko.bindingHandlers.slideVisibleWidth = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n);
},
update:function(e, t) {
var n;
return n = t(), n ? $(e).show("slide", {
direction:"right"
}, 600) :$(e).hide("slide", {
direction:"right"
}, 600);
}
}, ko.bindingHandlers.theme = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).addClass(n), $(e).data("theme", n);
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).removeClass($(e).data("theme")), 
$(e).addClass(n), $(e).data("theme", n);
}
}, ko.bindingHandlers.currentDisabled = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
}
}, ko.bindingHandlers.ensureVisible = {
init:function() {},
update:function(e, t) {
var n, i, o, r, a, s;
if (ko.utils.unwrapObservable(t())) return n = $(e), i = n.parent(), s = n.position().top, 
o = s + n.height(), a = i.scrollTop(), r = i.height(), a > s || o > r ? i.scrollTo(n) :void 0;
}
}, ko.bindingHandlers.background = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
}
}, ko.bindingHandlers.inverseChecked = {
init:function(e, t, n) {
var i, o, r;
return r = t(), i = ko.dependentObservable({
read:function() {
return !r();
},
write:function(e) {
return r(!e);
},
disposeWhenNodeIsRemoved:e
}), o = function() {
return i;
}, ko.utils.domData.set(e, "newValueAccessor", o), ko.bindingHandlers.checked.init(e, o, n);
},
update:function(e) {
return ko.bindingHandlers.checked.update(e, ko.utils.domData.get(e, "newValueAccessor"));
}
}, ko.bindingHandlers.computedStyles = {
init:function() {}
};
}.call(this), function() {
var e, t = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
e = window.Bobcat || {}, e.SocialMediaConfig = function() {
function e(e) {
this.settings = e;
}
return e.prototype.get = function(e) {
return this.settings[e];
}, e.prototype.getDefaultButtonListData = function() {
return [ {
type:"Facebook",
show_button:!0,
url:""
}, {
type:"Twitter",
show_button:!0,
url:""
}, {
type:"GPlus",
show_button:!0,
url:""
}, {
type:"LinkedIn",
show_button:!1,
url:""
} ];
}, e.prototype.updateButtonListData = function(e) {
var n, i, o, r, a, s, l, u;
for (n = this.getDefaultButtonListData(), r = function() {
var t, n, o, r;
for (o = e.button_list, r = [], t = 0, n = o.length; n > t; t++) i = o[t], r.push(i.type);
return r;
}(), u = [], a = 0, s = n.length; s > a; a++) o = n[a], l = o.type, t.call(r, l) < 0 ? u.push(e.button_list.push(o)) :u.push(void 0);
return u;
}, e;
}();
}.call(this), function() {}.call(this);