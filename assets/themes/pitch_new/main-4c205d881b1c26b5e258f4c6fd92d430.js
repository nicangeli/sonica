(function() {
$B.setCustomization("pageKeybinding", !0), window.resizePages = function() {
var e, t;
return e = $(window).height(), t = 320 > e ? 320 :e, $('.wide:not(".no-resize")').each(function() {
var e, o, n;
return n = $(this), e = n.find(".container").first(), n.css({
"padding-top":0,
"padding-bottom":0
}), o = e.outerHeight(!1), t > o ? n.css({
"padding-top":Math.floor(.5 * (t - o)),
"padding-bottom":Math.ceil(.5 * (t - o))
}) :void 0;
}), $(".wide.no-resize").css({
"padding-top":0,
"padding-bottom":0
}), $(".strikingly-slider .container").each(function() {
var e, t;
return t = $(this), e = t.find(".valign"), e.css({
margin:"0"
});
}), $(".strikingly-slider .container").each(function() {
var e, o, n;
return o = $(this), t = o.height(), e = o.find(".valign"), n = t - e.height(), 0 > n && (n = 0), 
e.css({
"margin-top":n / 2 + "px"
});
}), Bobcat.TH.isMobile() ? $("ul.slides").addClass("scroll-bg") :void 0;
}, window.runAfterDomBinding.add("pitch", function() {
var e;
return Bobcat.TH.applyTouchNav(), Bobcat.TH.enableSlider({
fullscreen:!1,
padding:40
}), e = $(".demo-bar-spacer").height() || 0, $(".navigator.fixed").css("top", e), 
resizePages(), $(window).resize(resizePages), $(".wide img").load(resizePages), 
window.edit_page.isShowPage || (window.edit_page.Event.subscribe("Slide.afterAdd", function() {
return resizePages();
}), function() {
var e;
return e = $("#s-content .slides .slide:eq(0)"), e.find(".strikingly-slider").length > 0 ? e.find(".bg-image-editor, .slider-editor").css({
"margin-top":"30px"
}) :void 0;
}()), $(".email-form-pitch").each(function() {
return $(this).find(".input").each(function() {
var e, t, o;
return o = $(this).find("label"), "none" !== o.css("display") ? (t = $(this).find("input, textarea"), 
e = function() {
return "" === t.val() ? o.show() :o.hide();
}, t.keypress(function() {
return "" === t.val() ? o.hide() :void 0;
}), t.keyup(e), t.blur(e)) :void 0;
});
}), $B.TH.enableAnimationForBlocks();
});
}).call(this), function(e) {
var t = 0, o = 0, n = 0, i = 10, r = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, c = !1, u = !1, d = !1, g = !1, p = !1, h = !1, m = "pointer", f = "pointer", w = new Array(), v = new Array(), b = new Array(), y = new Array(), _ = new Array(), k = new Array(), S = new Array(), x = new Array(), T = new Array(), $ = new Array(), E = new Array(), C = new Array(), I = new Array(), M = {
showScrollbar:function(t, o) {
t.scrollbarHide && e("." + o).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, o, n, r, a, s, l, c, u) {
if (e.scrollbar && e.scrollbarHide) for (var d = o; o + 25 > d; d++) t[t.length] = M.hideScrollbarIntervalTimer(i * d, n[o], (o + 24 - d) / 24, r, a, s, l, c, u, e);
},
hideScrollbarInterval:function(t, o, n, i, a, s, l, c, u) {
r = -1 * t / E[c] * (a - s - l - i), M.setSliderOffset("." + n, r), e("." + n).css({
opacity:u.scrollbarOpacity * o,
filter:"alpha(opacity:" + u.scrollbarOpacity * o * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, o, n, i, a, s, l, c, u, d, g, p, h, m, f, w, v, b, y) {
if (y.infiniteSlider) {
if (n <= -1 * E[w] || n <= -1 * C[w]) {
var _ = e(t).width();
if (n <= -1 * C[w]) {
var k = -1 * g[0];
e(o).each(function(t) {
M.setSliderOffset(e(o)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), n += -1 * p[0], $[w] = -1 * p[0] + v, E[w] = $[w] + _ - s, T[w] = 0;
}
for (;n <= -1 * E[w]; ) {
var I = 0, O = M.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
M.getSliderOffset(this, "x") < O && (O = M.getSliderOffset(this, "x"), I = e);
});
var B = $[w] + _;
M.setSliderOffset(e(o)[I], B), $[w] = -1 * p[1] + v, E[w] = $[w] + _ - s, p.splice(0, 1), 
p.splice(p.length, 0, -1 * B + v), T[w]++;
}
}
if (n >= -1 * $[w] || n >= 0) {
var _ = e(t).width();
if (n > 0) {
var k = -1 * g[0];
for (e(o).each(function(t) {
M.setSliderOffset(e(o)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), n -= -1 * p[0], $[w] = -1 * p[0] + v, E[w] = $[w] + _ - s, T[w] = m; -1 * p[0] - _ + v > 0; ) {
var D = 0, A = M.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
M.getSliderOffset(this, "x") > A && (A = M.getSliderOffset(this, "x"), D = e);
});
var B = $[w] - f[D];
M.setSliderOffset(e(o)[D], B), p.splice(0, 0, -1 * B + v), p.splice(p.length - 1, 1), 
$[w] = -1 * p[0] + v, E[w] = $[w] + _ - s, T[w]--, S[w]++;
}
}
for (;n > -1 * $[w]; ) {
var D = 0, A = M.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
M.getSliderOffset(this, "x") > A && (A = M.getSliderOffset(this, "x"), D = e);
});
var B = $[w] - f[D];
M.setSliderOffset(e(o)[D], B), p.splice(0, 0, -1 * B + v), p.splice(p.length - 1, 1), 
$[w] = -1 * p[0] + v, E[w] = $[w] + _ - s, T[w]--;
}
}
}
var L = !1, N = M.calcActiveOffset(y, n, p, s, T[w], m, d, w), B = (N + T[w] + m) % m;
if (y.infiniteSlider ? B != x[w] && (L = !0) :N != S[w] && (L = !0), L) {
var H = new M.args("change", y, t, e(t).children(":eq(" + B + ")"), B, b);
e(t).parent().data("args", H), "" != y.onSlideChange && y.onSlideChange(H);
}
if (S[w] = N, x[w] = B, n = Math.floor(n), M.setSliderOffset(t, n), y.scrollbar) {
r = Math.floor((-1 * n - $[w] + v) / (E[w] - $[w] + v) * (l - c - a));
var j = a - u;
n >= -1 * $[w] + v ? (j = a - u - -1 * r, M.setSliderOffset(e("." + i), 0), e("." + i).css({
width:j + "px"
})) :n <= -1 * E[w] + 1 ? (j = l - c - u - r, M.setSliderOffset(e("." + i), r), 
e("." + i).css({
width:j + "px"
})) :(M.setSliderOffset(e("." + i), r), e("." + i).css({
width:j + "px"
}));
}
},
slowScrollHorizontal:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b, y, _, C) {
var I = M.getSliderOffset(t, "x"), O = new Array(), B = new Array(), D = 0, A = 25 / 1024 * c;
frictionCoefficient = C.frictionCoefficient, elasticFrictionCoefficient = C.elasticFrictionCoefficient, 
snapFrictionCoefficient = C.snapFrictionCoefficient, a > C.snapVelocityThreshold && C.snapToChildren && !y ? D = 1 :a < -1 * C.snapVelocityThreshold && C.snapToChildren && !y && (D = -1), 
-1 * A > a ? a = -1 * A :a > A && (a = A), e(t)[0] !== e(b)[0] && (D = -1 * D, a = -2 * a);
var L = T[f];
if (C.infiniteSlider) var N = $[f], H = E[f];
for (var j = new Array(), z = new Array(), P = 0; P < h.length; P++) j[P] = h[P], 
P < o.length && (z[P] = M.getSliderOffset(e(o[P]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, I += a, (I > -1 * $[f] || I < -1 * E[f]) && !C.infiniteSlider && (a *= elasticFrictionCoefficient, 
I += a), C.infiniteSlider) {
if (-1 * H >= I) {
for (var R = e(t).width(), F = 0, q = z[0], P = 0; P < z.length; P++) z[P] < q && (q = z[P], 
F = P);
var Y = N + R;
z[F] = Y, N = -1 * j[1] + _, H = N + R - c, j.splice(0, 1), j.splice(j.length, 0, -1 * Y + _), 
L++;
}
if (I >= -1 * N) {
for (var R = e(t).width(), W = 0, V = z[0], P = 0; P < z.length; P++) z[P] > V && (V = z[P], 
W = P);
var Y = N - m[W];
z[W] = Y, j.splice(0, 0, -1 * Y + _), j.splice(j.length - 1, 1), N = -1 * j[0] + _, 
H = N + R - c, L--;
}
}
O[O.length] = I, B[B.length] = a;
}
var U = !1, G = M.calcActiveOffset(C, I, j, c, L, v, S[f], f), Q = (G + L + v) % v;
if (C.snapToChildren && (C.infiniteSlider ? Q != x[f] && (U = !0) :G != S[f] && (U = !0), 
0 > D && !U ? (G++, G >= h.length && !C.infiniteSlider && (G = h.length - 1)) :D > 0 && !U && (G--, 
0 > G && !C.infiniteSlider && (G = 0))), C.snapToChildren || (I > -1 * $[f] || I < -1 * E[f]) && !C.infiniteSlider) {
for ((I > -1 * $[f] || I < -1 * E[f]) && !C.infiniteSlider ? O.splice(0, O.length) :(O.splice(.1 * O.length, O.length), 
I = O.length > 0 ? O[O.length - 1] :I); I < j[G] - .5 || I > j[G] + .5; ) I = (I - j[G]) * snapFrictionCoefficient + j[G], 
O[O.length] = I;
O[O.length] = j[G];
}
var J = 1;
O.length % 2 != 0 && (J = 0);
for (var K = 0; K < n.length; K++) clearTimeout(n[K]);
for (var X = (G + L + v) % v, Z = 0, K = J; K < O.length; K += 2) (K == J || Math.abs(O[K] - Z) > 1 || K >= O.length - 2) && (Z = O[K], 
n[n.length] = M.slowScrollHorizontalIntervalTimer(i * K, t, o, O[K], r, l, c, u, d, g, G, p, h, w, v, m, f, _, X, C));
var U = !1, Q = (G + T[f] + v) % v;
C.infiniteSlider ? Q != x[f] && (U = !0) :G != S[f] && (U = !0), "" != C.onSlideComplete && O.length > 1 && (n[n.length] = M.onSlideCompleteTimer(i * (K + 1), C, t, e(t).children(":eq(" + Q + ")"), X, f)), 
n[n.length] = M.updateBackfaceVisibilityTimer(i * (K + 1), o, f, v, C), k[f] = n, 
M.hideScrollbar(C, n, K, O, r, l, c, d, g, f);
},
onSlideComplete:function(t, o, n, i, r) {
var a = (w[r] != i ? !0 :!1, new M.args("complete", t, e(o), n, i, i));
e(o).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
w[r] = i;
},
getSliderOffset:function(t, o) {
var n = 0;
if (o = "x" == o ? 4 :5, !c || u || d) n = parseInt(e(t).css("left"), 10); else {
for (var i, r = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < r.length; a++) if (void 0 != e(t).css(r[a]) && e(t).css(r[a]).length > 0) {
i = e(t).css(r[a]).split(",");
break;
}
n = void 0 == i[o] ? 0 :parseInt(i[o], 10);
}
return n;
},
setSliderOffset:function(t, o) {
o = parseInt(o, 10), !c || u || d ? e(t).css({
left:o + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + o + ",0)",
webkitTransform:"matrix(1,0,0,1," + o + ",0)",
MozTransform:"matrix(1,0,0,1," + o + ",0)",
transform:"matrix(1,0,0,1," + o + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, m = "-webkit-grab", f = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (h = !0, 
m = "move", f = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (u = !0, 
p = !0) :null != navigator.userAgent.match("MSIE 8") ? (d = !0, p = !0) :null != navigator.userAgent.match("MSIE 9") && (g = !0, 
p = !0);
},
has3DTransform:function() {
var t = !1, o = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == o.attr("style") ? t = !1 :h && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != o.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, o) {
return (e - T[t] + o) % o;
},
calcActiveOffset:function(e, t, o, n, i, r) {
var a, s = !1, l = new Array();
t > o[0] && (a = 0), t < o[o.length - 1] && (a = r - 1);
for (var c = 0; c < o.length; c++) o[c] <= t && o[c] > t - n && (s || o[c] == t || (l[l.length] = o[c - 1]), 
l[l.length] = o[c], s = !0);
0 == l.length && (l[0] = o[o.length - 1]);
for (var u = n, d = 0, c = 0; c < l.length; c++) {
var g = Math.abs(t - l[c]);
u > g && (d = l[c], u = g);
}
for (var c = 0; c < o.length; c++) d == o[c] && (a = c);
return a;
},
changeSlide:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
M.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
var _ = Math.ceil(b.autoSlideTransTimer / 10) + 1, $ = M.getSliderOffset(o, "x"), E = p[t], C = E - $, I = t - (S[m] + T[m] + w) % w;
if (b.infiniteSlider) {
t = (t - T[m] + 2 * w) % w;
var O = !1;
0 == t && 2 == w && (t = w, p[t] = p[t - 1] - e(n).eq(0).outerWidth(!0), O = !0), 
E = p[t], C = E - $;
var B = new Array(p[t] - e(o).width(), p[t] + e(o).width());
O && p.splice(p.length - 1, 1);
for (var D = 0; D < B.length; D++) Math.abs(B[D] - $) < Math.abs(C) && (C = B[D] - $);
}
0 > C && -1 == I ? C += e(o).width() :C > 0 && 1 == I && (C -= e(o).width());
var A, L, N = new Array();
M.showScrollbar(b, a);
for (var D = 0; _ >= D; D++) A = D, A /= _, A--, L = $ + C * (Math.pow(A, 5) + 1), 
N[N.length] = L;
for (var H = (t + T[m] + w) % w, j = 0, D = 0; D < N.length; D++) if ((0 == D || Math.abs(N[D] - j) > 1 || D >= N.length - 2) && (j = N[D], 
r[D] = M.slowScrollHorizontalIntervalTimer(i * (D + 1), o, n, N[D], a, s, l, c, u, d, t, g, p, f, w, h, m, v, H, b)), 
0 == D && "" != b.onSlideStart) {
var z = (S[m] + T[m] + w) % w;
b.onSlideStart(new M.args("start", b, o, e(o).children(":eq(" + z + ")"), z, t));
}
var P = !1;
b.infiniteSlider ? H != x[m] && (P = !0) :t != S[m] && (P = !0), P && "" != b.onSlideComplete && (r[r.length] = M.onSlideCompleteTimer(i * (D + 1), b, o, e(o).children(":eq(" + H + ")"), H, m)), 
k[m] = r, M.hideScrollbar(b, r, D, N, a, s, l, u, d, m), M.autoSlide(o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
},
changeOffset:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
M.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
b.infiniteSlider || (t = t > -1 * $[m] + v ? -1 * $[m] + v :t, t = t < -1 * E[m] ? -1 * E[m] :t);
var _ = Math.ceil(b.autoSlideTransTimer / 10) + 1, C = M.getSliderOffset(o, "x"), I = (M.calcActiveOffset(b, t, p, l, T, w, S[m], m) + T[m] + w) % w, O = p.slice();
if (b.snapToChildren && !b.infiniteSlider) t = p[I]; else if (b.infiniteSlider && b.snapToChildren) {
for (;t >= O[0]; ) O.splice(0, 0, O[w - 1] + e(o).width()), O.splice(w, 1);
for (;t <= O[w - 1]; ) O.splice(w, 0, O[0] - e(o).width()), O.splice(0, 1);
I = M.calcActiveOffset(b, t, O, l, T, w, S[m], m), t = O[I];
}
var B, D, A = t - C, L = new Array();
M.showScrollbar(b, a);
for (var N = 0; _ >= N; N++) B = N, B /= _, B--, D = C + A * (Math.pow(B, 5) + 1), 
L[L.length] = D;
for (var H = (I + T[m] + w) % w, j = 0, N = 0; N < L.length; N++) if ((0 == N || Math.abs(L[N] - j) > 1 || N >= L.length - 2) && (j = L[N], 
r[N] = M.slowScrollHorizontalIntervalTimer(i * (N + 1), o, n, L[N], a, s, l, c, u, d, I, g, p, f, w, h, m, v, H, b)), 
0 == N && "" != b.onSlideStart) {
var H = (S[m] + T[m] + w) % w;
b.onSlideStart(new M.args("start", b, o, e(o).children(":eq(" + H + ")"), H, I));
}
var z = !1;
b.infiniteSlider ? H != x[m] && (z = !0) :I != S[m] && (z = !0), z && "" != b.onSlideComplete && (r[r.length] = M.onSlideCompleteTimer(i * (N + 1), b, o, e(o).children(":eq(" + H + ")"), H, m)), 
k[m] = r, M.hideScrollbar(b, r, N, L, a, s, l, u, d, m), M.autoSlide(o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
},
autoSlide:function(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f) {
return y[g].autoSlide ? (M.autoSlidePause(g), v[g] = setTimeout(function() {
!f.infiniteSlider && S[g] > u.length - 1 && (S[g] = S[g] - h);
var w = S[g] + T[g] + 1;
M.changeSlide(w, e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f), M.autoSlide(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f);
}, f.autoSlideTimer + f.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(v[e]);
},
isUnselectable:function(t, o) {
return "" != o.unselectableSelector && 1 == e(t).closest(o.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
var y = setTimeout(function() {
M.slowScrollHorizontalInterval(t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
}, e);
return y;
},
onSlideCompleteTimer:function(e, t, o, n, i, r) {
var a = setTimeout(function() {
M.onSlideComplete(t, o, n, i, r);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, o, n, i, r, a, s, l, c) {
var u = setTimeout(function() {
M.hideScrollbarInterval(t, o, n, i, r, a, s, l, c);
}, e);
return u;
},
updateBackfaceVisibilityTimer:function(e, t, o, n, i) {
var r = setTimeout(function() {
M.updateBackfaceVisibility(t, o, n, i);
}, e);
return r;
},
updateBackfaceVisibility:function(t, o, n, i) {
for (var r = (S[o] + T[o] + n) % n, a = Array(), s = 0; s < 2 * i.hardwareAccelBuffer; s++) {
var l = M.mod(r + s - i.hardwareAccelBuffer, n);
if ("visible" == e(t).eq(l).css("-webkit-backface-visibility")) {
a[a.length] = l;
var c = M.mod(l + 2 * i.hardwareAccelBuffer, n), u = M.mod(l - 2 * i.hardwareAccelBuffer, n);
e(t).eq(l).css("-webkit-backface-visibility", "hidden"), -1 == a.indexOf(u) && e(t).eq(u).css("-webkit-backface-visibility", ""), 
-1 == a.indexOf(c) && e(t).eq(c).css("-webkit-backface-visibility", "");
}
}
},
mod:function(e, t) {
var o = e % t;
return 0 > o ? o + t :o;
},
args:function(t, o, n, i, r, a) {
this.prevSlideNumber = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(n).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(n).parent().data("args") ? o.startAtSlide :e(n).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(n).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(n).parent().data("args").slideChanged), 
this.settings = o, this.data = e(n).parent().data("iosslider"), this.sliderObject = n, 
this.sliderContainerObject = e(n).parent(), this.currentSlideObject = i, this.currentSlideNumber = r + 1, 
this.currentSliderOffset = -1 * M.getSliderOffset(n, "x");
},
preventDrag:function(e) {
e.preventDefault();
},
preventClick:function(e) {
return e.stopImmediatePropagation(), !1;
},
enableClick:function() {
return !0;
}
};
M.setBrowserInfo();
var O = {
init:function(i, l) {
c = M.has3DTransform();
var g = e.extend(!0, {
elasticPullResistance:.6,
frictionCoefficient:.92,
elasticFrictionCoefficient:.6,
snapFrictionCoefficient:.92,
snapToChildren:!1,
snapSlideCenter:!1,
startAtSlide:1,
scrollbar:!1,
scrollbarDrag:!1,
scrollbarHide:!0,
scrollbarPaging:!1,
scrollbarLocation:"top",
scrollbarContainer:"",
scrollbarOpacity:.4,
scrollbarHeight:"4px",
scrollbarBorder:"0",
scrollbarMargin:"5px",
scrollbarBackground:"#000",
scrollbarBorderRadius:"100px",
scrollbarShadow:"0 0 0 #000",
scrollbarElasticPullResistance:.9,
desktopClickDrag:!1,
keyboardControls:!1,
tabToAdvance:!1,
responsiveSlideContainer:!0,
responsiveSlides:!0,
navSlideSelector:"",
navPrevSelector:"",
navNextSelector:"",
autoSlideToggleSelector:"",
autoSlide:!1,
autoSlideTimer:5e3,
autoSlideTransTimer:750,
autoSlideHoverPause:!0,
infiniteSlider:!1,
snapVelocityThreshold:5,
slideStartVelocityThreshold:0,
horizontalSlideLockThreshold:5,
verticalSlideLockThreshold:3,
hardwareAccelBuffer:5,
stageCSS:{
position:"relative",
top:"0",
left:"0",
overflow:"hidden",
zIndex:1
},
unselectableSelector:"",
onSliderLoaded:"",
onSliderUpdate:"",
onSliderResize:"",
onSlideStart:"",
onSlideChange:"",
onSlideComplete:""
}, i);
return void 0 == l && (l = this), e(l).each(function(i) {
function l() {
M.autoSlidePause(c), ft = e(at).find("a"), wt = e(at).find("[onclick]"), vt = e(at).find("*"), 
e(X).css("width", ""), e(X).css("height", ""), e(at).css("width", ""), q = e(at).children().not("script").get(), 
Y = new Array(), W = new Array(), g.responsiveSlides && e(q).css("width", ""), E[c] = 0, 
F = new Array(), L = e(X).parent().width(), H = e(X).outerWidth(!0), g.responsiveSlideContainer && (H = e(X).outerWidth(!0) > L ? L :e(X).width()), 
e(X).css({
position:g.stageCSS.position,
top:g.stageCSS.top,
left:g.stageCSS.left,
overflow:g.stageCSS.overflow,
zIndex:g.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:H
}), e(g.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < q.length; t++) {
Y[t] = e(q[t]).width(), W[t] = e(q[t]).outerWidth(!0);
var o = W[t];
g.responsiveSlides && (W[t] > H ? (o = H + -1 * (W[t] - Y[t]), Y[t] = o, W[t] = H) :o = Y[t], 
e(q[t]).css({
width:o
})), e(q[t]).css({
overflow:"hidden",
position:"absolute"
}), F[t] = -1 * E[c], E[c] = E[c] + o + (W[t] - Y[t]);
}
g.snapSlideCenter && (K = .5 * (H - W[0]), g.responsiveSlides && W[0] > H && (K = 0)), 
C[c] = 2 * E[c];
for (var t = 0; t < q.length; t++) M.setSliderOffset(e(q[t]), -1 * F[t] + E[c] + K), 
F[t] = F[t] - E[c];
if (!g.infiniteSlider && !g.snapSlideCenter) {
for (var n = 0; n < F.length && !(F[n] <= -1 * (2 * E[c] - H)); n++) ct = n;
F.splice(ct + 1, F.length), F[F.length] = -1 * (2 * E[c] - H);
}
for (var n = 0; n < F.length; n++) tt[n] = F[n];
if (Z && (y[c].startAtSlide = y[c].startAtSlide > F.length ? F.length :y[c].startAtSlide, 
g.infiniteSlider ? (y[c].startAtSlide = (y[c].startAtSlide - 1 + st) % st, S[c] = y[c].startAtSlide) :(y[c].startAtSlide = y[c].startAtSlide - 1 < 0 ? F.length - 1 :y[c].startAtSlide, 
S[c] = y[c].startAtSlide - 1), x[c] = S[c]), $[c] = E[c] + K, e(at).css({
position:"relative",
cursor:m,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:E[c] + "px"
}), mt = E[c], E[c] = 2 * E[c] - H + 2 * K, gt = H > mt + K || 0 == H ? !0 :!1, 
gt && e(at).css({
cursor:"default"
}), N = e(X).parent().outerHeight(!0), j = e(X).height(), g.responsiveSlideContainer && (j = j > N ? N :j), 
e(X).css({
height:j
}), M.setSliderOffset(at, F[S[c]]), g.infiniteSlider && !gt) {
for (var i = M.getSliderOffset(e(at), "x"), r = (T[c] + st) % st * -1; 0 > r; ) {
var a = 0, s = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") < s && (s = M.getSliderOffset(this, "x"), a = e);
});
var l = $[c] + mt;
M.setSliderOffset(e(q)[a], l), $[c] = -1 * F[1] + K, E[c] = $[c] + mt - H, F.splice(0, 1), 
F.splice(F.length, 0, -1 * l + K), r++;
}
for (;-1 * F[0] - mt + K > 0 && g.snapSlideCenter && Z; ) {
var u = 0, d = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") > d && (d = M.getSliderOffset(this, "x"), u = e);
});
var l = $[c] - W[u];
M.setSliderOffset(e(q)[u], l), F.splice(0, 0, -1 * l + K), F.splice(F.length - 1, 1), 
$[c] = -1 * F[0] + K, E[c] = $[c] + mt - H, T[c]--, S[c]++;
}
for (;i <= -1 * E[c]; ) {
var a = 0, s = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") < s && (s = M.getSliderOffset(this, "x"), a = e);
});
var l = $[c] + mt;
M.setSliderOffset(e(q)[a], l), $[c] = -1 * F[1] + K, E[c] = $[c] + mt - H, F.splice(0, 1), 
F.splice(F.length, 0, -1 * l + K), T[c]++, S[c]--;
}
}
return M.setSliderOffset(at, F[S[c]]), M.updateBackfaceVisibility(q, c, st, g), 
g.desktopClickDrag || e(at).css({
cursor:"default"
}), g.scrollbar && (e("." + Q).css({
margin:g.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + Q + " ." + J).css({
border:g.scrollbarBorder
}), z = parseInt(e("." + Q).css("marginLeft")) + parseInt(e("." + Q).css("marginRight")), 
P = parseInt(e("." + Q + " ." + J).css("borderLeftWidth"), 10) + parseInt(e("." + Q + " ." + J).css("borderRightWidth"), 10), 
D = "" != g.scrollbarContainer ? e(g.scrollbarContainer).width() :H, A = H / mt * (D - z), 
g.scrollbarHide || (ot = g.scrollbarOpacity), e("." + Q).css({
position:"absolute",
left:0,
width:D - z + "px",
margin:g.scrollbarMargin
}), "top" == g.scrollbarLocation ? e("." + Q).css("top", "0") :e("." + Q).css("bottom", "0"), 
e("." + Q + " ." + J).css({
borderRadius:g.scrollbarBorderRadius,
background:g.scrollbarBackground,
height:g.scrollbarHeight,
width:A - P + "px",
minWidth:g.scrollbarHeight,
border:g.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:ot,
filter:"alpha(opacity:" + 100 * ot + ")",
boxShadow:g.scrollbarShadow
}), M.setSliderOffset(e("." + Q + " ." + J), Math.floor((-1 * F[S[c]] - $[c] + K) / (E[c] - $[c] + K) * (D - z - A))), 
e("." + Q).css({
display:"block"
}), v = e("." + Q + " ." + J), B = e("." + Q)), g.scrollbarDrag && !gt && e("." + Q + " ." + J).css({
cursor:m
}), g.infiniteSlider && (V = (E[c] + H) / 3), "" != g.navSlideSelector && e(g.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(_t).bind(_t, function(o) {
"touchstart" == o.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = o.type + ".iosSliderEvent", M.changeSlide(t, at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g);
});
}), "" != g.navPrevSelector && (e(g.navPrevSelector).css({
cursor:"pointer"
}), e(g.navPrevSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent";
var o = (S[c] + T[c] + st) % st;
(o > 0 || g.infiniteSlider) && M.changeSlide(o - 1, at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g);
})), "" != g.navNextSelector && (e(g.navNextSelector).css({
cursor:"pointer"
}), e(g.navNextSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent";
var o = (S[c] + T[c] + st) % st;
(o < F.length - 1 || g.infiniteSlider) && M.changeSlide(o + 1, at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g);
})), g.autoSlide && !gt && "" != g.autoSlideToggleSelector && (e(g.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(g.autoSlideToggleSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent", pt ? (M.autoSlide(at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g), 
pt = !1, e(g.autoSlideToggleSelector).removeClass("on")) :(M.autoSlidePause(c), 
pt = !0, e(g.autoSlideToggleSelector).addClass("on"));
})), M.autoSlide(at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g), e(X).bind("mouseleave.iosSliderEvent", function() {
return pt ? !0 :(M.autoSlide(at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g), 
void 0);
}), e(X).bind("touchend.iosSliderEvent", function() {
return pt ? !0 :(M.autoSlide(at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g), 
void 0);
}), g.autoSlideHoverPause && e(X).bind("mouseenter.iosSliderEvent", function() {
M.autoSlidePause(c);
}), e(X).data("iosslider", {
obj:kt,
settings:g,
scrollerNode:at,
slideNodes:q,
numberOfSlides:st,
centeredSlideOffset:K,
sliderNumber:c,
originalOffsets:tt,
childrenOffsets:F,
sliderMax:E[c],
scrollbarClass:J,
scrollbarWidth:A,
scrollbarStageWidth:D,
stageWidth:H,
scrollMargin:z,
scrollBorder:P,
infiniteSliderOffset:T[c],
infiniteSliderWidth:V,
slideNodeOuterWidths:W,
shortContent:gt
}), Z = !1, !0;
}
t++;
var c = t, h = new Array();
y[c] = e.extend({}, g), $[c] = 0, E[c] = 0;
var v, B, D, A, L, N, H, j, z, P, R, F, q, Y, W, V, U = new Array(0, 0), G = new Array(0, 0), Q = "scrollbarBlock" + t, J = "scrollbar" + t, K = 0, X = e(this), Z = !0, et = -1, tt = (new Array(), 
new Array()), ot = 0, nt = 0, it = 0, rt = 0, at = e(this).children(":first-child"), st = e(at).children().not("script").length, lt = !1, ct = 0, ut = !1, dt = void 0;
T[c] = 0;
var gt = !1;
w[c] = -1;
var pt = !1;
b[c] = X, _[c] = !1;
var ht, mt, ft, wt, vt, bt = !1, yt = !1, _t = "touchstart.iosSliderEvent click.iosSliderEvent";
I[c] = !1, k[c] = new Array(), g.scrollbarDrag && (g.scrollbar = !0, g.scrollbarHide = !1);
var kt = e(this), St = kt.data("iosslider");
if (void 0 != St) return !0;
for (var xt = [ "d", "e", "m", "o", " ", "v", "e", "r", "s", "i", "o", "n" ], Tt = Math.floor(12317 * Math.random()), i = 0; i < xt.length; i++) e(".i" + Tt).html(e(".i" + Tt).html() + xt[i]);
if (parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), g.infiniteSlider && (g.scrollbar = !1), g.infiniteSlider && 1 == st && (g.infiniteSlider = !1), 
g.scrollbar && ("" != g.scrollbarContainer ? e(g.scrollbarContainer).append("<div class = '" + Q + "'><div class = '" + J + "'></div></div>") :e(at).parent().append("<div class = '" + Q + "'><div class = '" + J + "'></div></div>")), 
!l()) return !0;
e(this).find("a").bind("mousedown", M.preventDrag), e(this).find("[onclick]").bind("click", M.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var et = M.calcActiveOffset(g, M.getSliderOffset(e(at), "x"), F, H, T[c], st, void 0, c), $t = (et + T[c] + st) % st, Et = new M.args("load", g, at, e(at).children(":eq(" + $t + ")"), $t, $t);
if (e(X).data("args", Et), "" != g.onSliderLoaded && g.onSliderLoaded(Et), w[c] = $t, 
g.scrollbarPaging && g.scrollbar && !gt && (e(B).css("cursor", "pointer"), e(B).bind("click.iosSliderEvent", function(t) {
this == t.target && (t.pageX > e(v).offset().left ? O.nextPage(X) :O.prevPage(X));
})), y[c].responsiveSlides || y[c].responsiveSlideContainer) {
var Ct = s ? "orientationchange" :"resize", It = $B.debounce(function() {
if (!l()) return !0;
var t = e(X).data("args");
"" != g.onSliderResize && g.onSliderResize(t);
}, 50);
e(window).bind(Ct + ".iosSliderEvent-" + c, It);
}
if (!g.keyboardControls && !g.tabToAdvance || gt || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!u && !d) var e = e.originalEvent;
if (I[c]) return !0;
if (37 == e.keyCode && g.keyboardControls) {
e.preventDefault();
var t = (S[c] + T[c] + st) % st;
(t > 0 || g.infiniteSlider) && M.changeSlide(t - 1, at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g);
} else if (39 == e.keyCode && g.keyboardControls || 9 == e.keyCode && g.tabToAdvance) {
e.preventDefault();
var t = (S[c] + T[c] + st) % st;
(t < F.length - 1 || g.infiniteSlider) && M.changeSlide(t + 1, at, q, h, J, A, H, D, z, P, tt, F, W, c, V, st, K, g);
}
}), a || g.desktopClickDrag) {
var Mt = !1, Ot = !1, Bt = e(at), Dt = e(at), At = !1;
g.scrollbarDrag && (Bt = Bt.add(v), Dt = Dt.add(B)), e(Bt).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
Mt = !1;
}), Mt) return !0;
if (Mt = !0, Ot = !1, "touchstart" == t.type ? e(Dt).unbind("mousedown.iosSliderEvent") :e(Dt).unbind("touchstart.iosSliderEvent"), 
I[c] || gt) return Mt = !1, lt = !1, !0;
if (At = M.isUnselectable(t.target, g)) return Mt = !1, lt = !1, !0;
if (ht = e(this)[0] === e(v)[0] ? v :at, !u && !d) var t = t.originalEvent;
if (M.autoSlidePause(c), vt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, ut = !0, dt = at, e(this).css({
cursor:f
});
}
U = new Array(0, 0), G = new Array(0, 0), o = 0, lt = !1;
for (var n = 0; n < h.length; n++) clearTimeout(h[n]);
var i = M.getSliderOffset(at, "x");
i > -1 * $[c] + K + mt ? (i = -1 * $[c] + K + mt, M.setSliderOffset(e("." + J), i), 
e("." + J).css({
width:A - P + "px"
})) :i < -1 * E[c] && (i = -1 * E[c], M.setSliderOffset(e("." + J), D - z - A), 
e("." + J).css({
width:A - P + "px"
}));
var r = e(this)[0] === e(v)[0] ? $[c] :0;
nt = -1 * (M.getSliderOffset(this, "x") - eventX - r), it = -1 * (M.getSliderOffset(this, "y") - eventY), 
U[1] = eventX, G[1] = eventY, yt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!u && !d) var t = t.originalEvent;
if (I[c] || gt || At || !Mt) return !0;
var i = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !ut) return !0;
if (!p && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (U[0] = U[1], U[1] = eventX, o = (U[1] - U[0]) / 2, G[0] = G[1], G[1] = eventY, 
n = (G[1] - G[0]) / 2, !lt) {
var a = (S[c] + T[c] + st) % st, s = new M.args("start", g, at, e(at).children(":eq(" + a + ")"), a, void 0);
e(X).data("args", s), "" != g.onSlideStart && g.onSlideStart(s);
}
if ((n > g.verticalSlideLockThreshold || n < -1 * g.verticalSlideLockThreshold) && "touchmove" == t.type && !lt && (bt = !0), 
(o > g.horizontalSlideLockThreshold || o < -1 * g.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(o > g.slideStartVelocityThreshold || o < -1 * g.slideStartVelocityThreshold) && (lt = !0), 
lt && !bt) {
var l = M.getSliderOffset(at, "x"), h = e(ht)[0] === e(v)[0] ? $[c] :K, m = e(ht)[0] === e(v)[0] ? ($[c] - E[c] - K) / (D - z - A) :1, f = e(ht)[0] === e(v)[0] ? g.scrollbarElasticPullResistance :g.elasticPullResistance, w = g.snapSlideCenter && e(ht)[0] === e(v)[0] ? 0 :K, b = g.snapSlideCenter && e(ht)[0] === e(v)[0] ? K :0;
if ("touchmove" == t.type && (rt != t.touches.length && (nt = -1 * l + eventX), 
rt = t.touches.length), g.infiniteSlider) {
if (l <= -1 * E[c]) {
var y = e(at).width();
if (l <= -1 * C[c]) {
var _ = -1 * tt[0];
e(q).each(function(t) {
M.setSliderOffset(e(q)[t], _ + K), t < F.length && (F[t] = -1 * _), _ += W[t];
}), nt -= -1 * F[0], $[c] = -1 * F[0] + K, E[c] = $[c] + y - H, T[c] = 0;
} else {
var k = 0, O = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") < O && (O = M.getSliderOffset(this, "x"), k = e);
});
var B = $[c] + y;
M.setSliderOffset(e(q)[k], B), $[c] = -1 * F[1] + K, E[c] = $[c] + y - H, F.splice(0, 1), 
F.splice(F.length, 0, -1 * B + K), T[c]++;
}
}
if (l >= -1 * $[c] || l >= 0) {
var y = e(at).width();
if (l >= 0) {
var _ = -1 * tt[0];
for (e(q).each(function(t) {
M.setSliderOffset(e(q)[t], _ + K), t < F.length && (F[t] = -1 * _), _ += W[t];
}), nt += -1 * F[0], $[c] = -1 * F[0] + K, E[c] = $[c] + y - H, T[c] = st; -1 * F[0] - y + K > 0; ) {
var L = 0, N = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") > N && (N = M.getSliderOffset(this, "x"), L = e);
});
var B = $[c] - W[L];
M.setSliderOffset(e(q)[L], B), F.splice(0, 0, -1 * B + K), F.splice(F.length - 1, 1), 
$[c] = -1 * F[0] + K, E[c] = $[c] + y - H, T[c]--, S[c]++;
}
} else {
var L = 0, N = M.getSliderOffset(e(q[0]), "x");
e(q).each(function(e) {
M.getSliderOffset(this, "x") > N && (N = M.getSliderOffset(this, "x"), L = e);
});
var B = $[c] - W[L];
M.setSliderOffset(e(q)[L], B), F.splice(0, 0, -1 * B + K), F.splice(F.length - 1, 1), 
$[c] = -1 * F[0] + K, E[c] = $[c] + y - H, T[c]--;
}
}
} else {
var y = e(at).width();
l > -1 * $[c] + K && (i = ($[c] + -1 * (nt - h - eventX + w) * m - h) * f * -1 / m), 
l < -1 * E[c] && (i = (E[c] + b + -1 * (nt - h - eventX) * m - h) * f * -1 / m);
}
if (M.setSliderOffset(at, -1 * (nt - h - eventX - i) * m - h + b), g.scrollbar) {
M.showScrollbar(g, J), r = Math.floor((nt - eventX - i - $[c] + w) / (E[c] - $[c] + K) * (D - z - A) * m);
var j = A;
0 >= r ? (j = A - P - -1 * r, M.setSliderOffset(e("." + J), 0), e("." + J).css({
width:j + "px"
})) :r >= D - z - P - A ? (j = D - z - P - r, M.setSliderOffset(e("." + J), r), 
e("." + J).css({
width:j + "px"
})) :M.setSliderOffset(e("." + J), r);
}
"touchmove" == t.type && (R = t.touches[0].pageX);
var Y = !1, V = M.calcActiveOffset(g, -1 * (nt - eventX - i), F, H, T[c], st, void 0, c), Q = (V + T[c] + st) % st;
if (g.infiniteSlider ? Q != x[c] && (Y = !0) :V != S[c] && (Y = !0), Y) {
S[c] = V, x[c] = Q, yt = !0;
var s = new M.args("change", g, at, e(at).children(":eq(" + Q + ")"), Q, Q);
e(X).data("args", s), "" != g.onSlideChange && g.onSlideChange(s), M.updateBackfaceVisibility(q, c, st, g);
}
}
});
var Lt = e(window);
if (d || u) var Lt = e(document);
e(Bt).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if (Ot) return !1;
if (Ot = !0, I[c] || gt) return !0;
if (At) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == R && M.slowScrollHorizontal(at, q, h, J, o, n, A, H, D, z, P, tt, F, W, c, V, st, ht, yt, K, g); else M.slowScrollHorizontal(at, q, h, J, o, n, A, H, D, z, P, tt, F, W, c, V, st, ht, yt, K, g);
return bt = !1, Mt = !1, !0;
}), e(Lt).bind("mouseup.iosSliderEvent-" + c, function() {
if (lt ? ft.unbind("click.disableClick").bind("click.disableClick", M.preventClick) :ft.unbind("click.disableClick").bind("click.disableClick", M.enableClick), 
wt.each(function() {
this.onclick = function(t) {
return lt ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? vt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", M.preventClick);
var o = e._data(this, "events").click, n = o.pop();
o.splice(0, 0, n);
}
}) :parseFloat(e().jquery) >= 1.6 && vt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", M.preventClick);
var o = e(this).data("events").click, n = o.pop();
o.splice(0, 0, n);
}
}), !_[c]) {
if (gt) return !0;
if (g.desktopClickDrag && e(at).css({
cursor:m
}), g.scrollbarDrag && e(v).css({
cursor:m
}), ut = !1, void 0 == dt) return !0;
M.slowScrollHorizontal(dt, q, h, J, o, n, A, H, D, z, P, tt, F, W, c, V, st, ht, yt, K, g), 
dt = void 0;
}
bt = !1, Mt = !1;
});
}
});
},
destroy:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
if (void 0 == n) return !1;
void 0 == t && (t = !0), M.autoSlidePause(n.sliderNumber), _[n.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + n.sliderNumber), e(document).unbind(".iosSliderEvent-" + n.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
e(n.settings.scrollbarBlockNode).unbind(".iosSliderEvent"), t && (e(this).attr("style", ""), 
e(this).children(":first-child").attr("style", ""), e(this).children(":first-child").children().attr("style", ""), 
e(n.settings.navSlideSelector).attr("style", ""), e(n.settings.navPrevSelector).attr("style", ""), 
e(n.settings.navNextSelector).attr("style", ""), e(n.settings.autoSlideToggleSelector).attr("style", ""), 
e(n.settings.unselectableSelector).attr("style", "")), n.settings.scrollbar && e(".scrollbarBlock" + n.sliderNumber).remove();
for (var i = k[n.sliderNumber], r = 0; r < i.length; r++) clearTimeout(i[r]);
o.removeData("iosslider"), o.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
o.settings.startAtSlide = t.data("args").currentSlideNumber, O.destroy(!1, this), 
1 != o.numberOfSlides && o.settings.infiniteSlider && (o.settings.startAtSlide = (S[o.sliderNumber] + 1 + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides), 
O.init(o.settings, this);
var n = new M.args("update", o.settings, o.scrollerNode, e(o.scrollerNode).children(":eq(" + (o.settings.startAtSlide - 1) + ")"), o.settings.startAtSlide - 1, o.settings.startAtSlide - 1);
e(o.stageNode).data("args", n), "" != o.settings.onSliderUpdate && o.settings.onSliderUpdate(n);
});
},
addSlide:function(t, o) {
return this.each(function() {
var n = e(this), i = n.data("iosslider");
return void 0 == i ? !1 :(0 == e(i.scrollerNode).children().length ? (e(i.scrollerNode).append(t), 
n.data("args").currentSlideNumber = 1) :i.settings.infiniteSlider ? (1 == o ? e(i.scrollerNode).children(":eq(0)").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
T[i.sliderNumber] < -1 && S[i.sliderNumber]--, n.data("args").currentSlideNumber >= o && S[i.sliderNumber]++) :(o <= i.numberOfSlides ? e(i.scrollerNode).children(":eq(" + (o - 1) + ")").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
n.data("args").currentSlideNumber >= o && n.data("args").currentSlideNumber++), 
n.data("iosslider").numberOfSlides++, O.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n ? !1 :(e(n.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
S[n.sliderNumber] > t - 1 && S[n.sliderNumber]--, o.data("iosslider").numberOfSlides--, 
O.update(this), void 0);
});
},
goToSlide:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(t = t > n.childrenOffsets.length ? n.childrenOffsets.length - 1 :t - 1, 
M.changeSlide(t, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (S[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n > 0 || o.settings.infiniteSlider) && M.changeSlide(n - 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
S[o.sliderNumber] = n;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (S[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n < o.childrenOffsets.length - 1 || o.settings.infiniteSlider) && M.changeSlide(n + 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
S[o.sliderNumber] = n;
});
},
prevPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = M.getSliderOffset(o.scrollerNode, "x") + o.stageWidth;
M.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
nextPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = M.getSliderOffset(o.scrollerNode, "x") - o.stageWidth;
M.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
lock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:"default"
}), I[o.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:m
}), I[o.sliderNumber] = !1, void 0);
});
},
getData:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :o;
});
},
autoSlidePause:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !1, M.autoSlidePause(o.sliderNumber), 
o);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !0, M.autoSlide(e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
o);
});
}
};
e.fn.iosSlider = function(t) {
return O[t] ? O[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :O.init.apply(this, arguments);
};
}(jQuery);