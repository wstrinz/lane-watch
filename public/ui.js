//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, r = t((() => {})), i = t((() => {
	r();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/utils.js
function a(e) {
	return typeof e == "function";
}
function o(e) {
	return e();
}
function s(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function c() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function l(e, t, n = !1) {
	return e === void 0 ? n ? t() : t : e;
}
function u(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
function d(e, t) {
	var n = {};
	for (var r in e) t.includes(r) || (n[r] = e[r]);
	for (var i of Object.getOwnPropertySymbols(e)) Object.propertyIsEnumerable.call(e, i) && !t.includes(i) && (n[i] = e[i]);
	return n;
}
var f, p, m, h, g, _, v, y, b, x, S, C, w = t((() => {
	f = Array.isArray, p = Array.prototype.indexOf, m = Array.prototype.includes, h = Array.from, g = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, v = Object.getOwnPropertyDescriptors, y = Object.prototype, b = Array.prototype, x = Object.getPrototypeOf, S = Object.isExtensible, C = () => {};
})), T, E, D, O, k, A, j, ee, M, N, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e = t((() => {
	T = 1 << 24, E = 1024, D = 2048, O = 4096, k = 8192, A = 16384, j = 32768, ee = 1 << 25, M = 65536, N = 1 << 19, te = 1 << 20, ne = 1 << 25, re = 65536, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("legacy props"), le = Symbol(""), ue = Symbol("attributes"), de = Symbol("class"), fe = Symbol("style"), pe = Symbol("text"), me = Symbol("form reset"), he = new class extends Error {
		name = "StaleReactionError";
		message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
	}(), ge = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
}));
function ve(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
var ye = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function be() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function xe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Se(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ce() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function we(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Te() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ee(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function De() {
	throw Error("https://svelte.dev/e/set_context_after_init");
}
function Oe() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ke() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ae() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function je() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
var Me = t((() => {
	i(), ye();
})), Ne, Pe, Fe, Ie, Le = t((() => {
	Ne = {}, Pe = Symbol("uninitialized"), Fe = "http://www.w3.org/1999/xhtml", Ie = "http://www.w3.org/2000/svg";
}));
function Re() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function ze(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Be() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ve() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
var He = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
function Ue(e) {
	Ye = e;
}
function We(e) {
	if (e === null) throw ze(), Ne;
	return Xe = e;
}
function Ge() {
	return We(/* @__PURE__ */ vr(Xe));
}
function P(e) {
	if (Ye) {
		if (/* @__PURE__ */ vr(Xe) !== null) throw ze(), Ne;
		Xe = e;
	}
}
function Ke(e = 1) {
	if (Ye) {
		for (var t = e, n = Xe; t--;) n = /* @__PURE__ */ vr(n);
		Xe = n;
	}
}
function qe(e = !0) {
	for (var t = 0, n = Xe;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ vr(n);
		e && n.remove(), n = i;
	}
}
function Je(e) {
	if (!e || e.nodeType !== 8) throw ze(), Ne;
	return e.data;
}
var Ye, Xe, Ze = t((() => {
	_e(), Le(), He(), Or(), Ye = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Qe(e) {
	return e === this.v;
}
function $e(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function et(e) {
	return !$e(e, this.v);
}
var tt = t((() => {}));
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
function nt() {
	it = !0;
}
var rt, it, at = t((() => {
	rt = !1, it = !1;
})), ot = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
function st(e, t = !1, n = !1) {
	return ct(e, /* @__PURE__ */ new Map(), "", lt, null, n);
}
function ct(e, t, n, r, i = null, a = !1) {
	if (typeof e == "object" && e) {
		var o = t.get(e);
		if (o !== void 0) return o;
		if (e instanceof Map) return new Map(e);
		if (e instanceof Set) return new Set(e);
		if (f(e)) {
			var s = Array(e.length);
			t.set(e, s), i !== null && t.set(i, s);
			for (var c = 0; c < e.length; c += 1) {
				var l = e[c];
				c in e && (s[c] = ct(l, t, n, r, null, a));
			}
			return s;
		}
		if (x(e) === y) {
			s = {}, t.set(e, s), i !== null && t.set(i, s);
			for (var u of Object.keys(e)) s[u] = ct(e[u], t, n, r, null, a);
			return s;
		}
		if (e instanceof Date) return structuredClone(e);
		if (typeof e.toJSON == "function" && !a) return ct(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
var lt, ut = t((() => {
	i(), ot(), w(), lt = [];
})), dt = t((() => {
	ut(), _e(), ri(), Ii();
})), ft = t((() => {
	i(), w(), ye();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/context.js
function pt(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function mt(e, t) {
	return e === null && ve(t), e.c ??= new Map(pt(e) || void 0);
}
var ht = t((() => {
	ye();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
function gt(e) {
	Ct = e;
}
function _t(e) {
	return mt(Ct, "getContext").get(e);
}
function vt(e, t) {
	let n = mt(Ct, "setContext");
	if (rt) {
		var r = Oi.f;
		!Ei && r & 32 && !Ct.i || De();
	}
	return n.set(e, t), t;
}
function yt(e) {
	return mt(Ct, "hasContext").has(e);
}
function bt(e, t = !1, n) {
	Ct = {
		p: Ct,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Oi,
		l: it && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function xt(e) {
	var t = Ct, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Fr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ct = t.p, e ?? {};
}
function St() {
	return !it || Ct !== null && Ct.l === null;
}
var Ct, wt = t((() => {
	i(), Me(), Ii(), ri(), at(), _e(), ht(), Ct = null;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
function Tt() {
	var e = Ot;
	Ot = [], s(e);
}
function Et(e) {
	if (Ot.length === 0 && !Gn) {
		var t = Ot;
		queueMicrotask(() => {
			t === Ot && Tt();
		});
	}
	Ot.push(e);
}
function Dt() {
	for (; Ot.length > 0;) Tt();
}
var Ot, kt = t((() => {
	w(), $n(), Ot = [];
}));
//#endregion
//#region node_modules/svelte/src/internal/client/error-handling.js
function At(e) {
	var t = Oi;
	if (t === null) return Ei.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	jt(e, t);
}
function jt(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
var Mt = t((() => {
	i(), Le(), Or(), _e(), w(), Ii();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
function Nt(e, t) {
	e.f = e.f & Ft | t;
}
function Pt(e) {
	e.f & 512 || e.deps === null ? Nt(e, E) : Nt(e, O);
}
var Ft, It = t((() => {
	_e(), Ft = ~(D | O | E);
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Lt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= re, Lt(t.deps));
}
function Rt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Lt(e.deps), Nt(e, E);
}
var zt = t((() => {
	_e(), It();
}));
//#endregion
//#region node_modules/svelte/src/store/utils.js
function Bt(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), C;
	let r = W(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
var Vt = t((() => {
	Ii(), w();
}));
//#endregion
//#region node_modules/svelte/src/store/shared/index.js
function Ht(e, t = C) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if ($e(e, t) && (e = t, n)) {
			let t = !Wt.length;
			for (let t of r) t[1](), Wt.push(t, e);
			if (t) {
				for (let e = 0; e < Wt.length; e += 2) Wt[e][0](Wt[e + 1]);
				Wt.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = C) {
		let c = [o, s];
		return r.add(c), r.size === 1 && (n = t(i, a) || C), o(e), () => {
			r.delete(c), r.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set: i,
		update: a,
		subscribe: o
	};
}
function Ut(e) {
	let t;
	return Bt(e, (e) => t = e)(), t;
}
var Wt, Gt = t((() => {
	w(), tt(), Vt(), Wt = [];
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
function Kt(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ I(void 0),
		unsubscribe: C
	};
	if (r.store !== e && !(Zt in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = C;
		else {
			var i = !0;
			r.unsubscribe = Bt(e, (e) => {
				i ? r.source.v = e : L(r.source, e);
			}), i = !1;
		}
	}
	return e && Zt in n ? Ut(e) : U(r.source);
}
function qt() {
	let e = {};
	function t() {
		Nr(() => {
			for (var t in e) e[t].unsubscribe();
			g(e, Zt, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function Jt(e) {
	var t = Xt;
	try {
		return Xt = !1, [e(), Xt];
	} finally {
		Xt = t;
	}
}
var Yt, Xt, Zt, Qt = t((() => {
	Vt(), Gt(), w(), Ii(), ri(), lr(), i(), Yt = !1, Xt = !1, Zt = Symbol("unmounted");
})), $t = t((() => {
	_e(), ut(), Ii();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function en(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Et(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function tn(e) {
	Ye && /* @__PURE__ */ _r(e) !== null && yr(e);
}
function nn() {
	rn || (rn = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[me]?.();
		});
	}, { capture: !0 }));
}
var rn, an = t((() => {
	Ze(), Or(), kt(), _e(), rn = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function on(e, t, n, r = !0) {
	r && n();
	for (var i of t) e.addEventListener(i, n);
	Nr(() => {
		for (var r of t) e.removeEventListener(r, n);
	});
}
function sn(e) {
	var t = Ei, n = Oi;
	si(null), ci(null);
	try {
		return e();
	} finally {
		si(t), ci(n);
	}
}
function cn(e, t, n, r = n) {
	e.addEventListener(t, () => sn(n));
	let i = e[me];
	i ? e[me] = () => {
		i(), r(!0);
	} : e[me] = () => r(!0), nn();
}
var ln = t((() => {
	ri(), Ii(), _e(), an();
}));
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function un(e) {
	let t = 0, n = er(0), r;
	return () => {
		Mr() && (U(n), Hr(() => (t === 0 && (r = W(() => e(() => ir(n)))), t += 1, () => {
			Et(() => {
				--t, t === 0 && (r?.(), r = void 0, ir(n));
			});
		})));
	};
}
var dn = t((() => {
	Ii(), ri(), lr(), dt(), i(), kt();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
function fn(e, t, n, r) {
	new mn(e, t, n, r);
}
var pn, mn, hn = t((() => {
	_e(), Le(), wt(), Mt(), ri(), Ii(), Ze(), kt(), Me(), He(), i(), $n(), lr(), dt(), dn(), Or(), zt(), pn = M | N, mn = class {
		parent;
		is_pending = !1;
		transform_error;
		#e;
		#t = Ye ? Xe : null;
		#n;
		#r;
		#i;
		#a = null;
		#o = null;
		#s = null;
		#c = null;
		#l = 0;
		#u = 0;
		#d = !1;
		#f = /* @__PURE__ */ new Set();
		#p = /* @__PURE__ */ new Set();
		#m = null;
		#h = un(() => (this.#m = er(this.#l), () => {
			this.#m = null;
		}));
		constructor(e, t, n, r) {
			this.#e = e, this.#n = t, this.#r = (e) => {
				var t = Oi;
				t.b = this, t.f |= 128, n(e);
			}, this.parent = Oi.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Ur(() => {
				if (Ye) {
					let e = this.#t;
					Ge();
					let t = e.data === "[!";
					if (e.data.startsWith("[?")) {
						let t = JSON.parse(e.data.slice(2));
						this.#_(t);
					} else t ? this.#y() : this.#g();
				} else this.#b();
			}, pn), Ye && (this.#e = Xe);
		}
		#g() {
			try {
				this.#a = Gr(() => this.#r(this.#e));
			} catch (e) {
				this.error(e);
			}
		}
		#_(e) {
			let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
			Et(r), t && (this.#s = Gr(() => {
				t(this.#e, () => e, () => n);
			}));
		}
		#v(e) {
			var t = !1, n = !1;
			let r = () => {
				if (t) {
					Ve();
					return;
				}
				t = !0, n && je(), this.#s !== null && Qr(this.#s, () => {
					this.#s = null;
				}), this.#S(() => {
					this.#b();
				});
			};
			return {
				reset: r,
				invoke_onerror: () => {
					try {
						n = !0, this.#n.onerror?.(e, r), n = !1;
					} catch (e) {
						jt(e, this.#i && this.#i.parent);
					}
				}
			};
		}
		#y() {
			let e = this.#n.pending;
			e && (this.is_pending = !0, this.#o = Gr(() => e(this.#e)), Et(() => {
				var e = this.#c = document.createDocumentFragment(), t = gr();
				e.append(t), this.#a = this.#S(() => Gr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Qr(this.#o, () => {
					this.#o = null;
				}), this.#x(Vn));
			}));
		}
		#b() {
			try {
				if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Gr(() => {
					this.#r(this.#e);
				}), this.#u > 0) {
					var e = this.#c = document.createDocumentFragment();
					ni(this.#a, e);
					let t = this.#n.pending;
					this.#o = Gr(() => t(this.#e));
				} else this.#x(Vn);
			} catch (e) {
				this.error(e);
			}
		}
		#x(e) {
			this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
		}
		defer_effect(e) {
			Rt(e, this.#f, this.#p);
		}
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}
		has_pending_snippet() {
			return !!this.#n.pending;
		}
		#S(e) {
			var t = Oi, n = Ei, r = Ct;
			ci(this.#i), si(this.#i), gt(this.#i.ctx);
			try {
				return Zn.ensure(), e();
			} catch (e) {
				return At(e), null;
			} finally {
				ci(t), si(n), gt(r);
			}
		}
		#C(e, t) {
			if (!this.has_pending_snippet()) {
				this.parent && this.parent.#C(e, t);
				return;
			}
			this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Qr(this.#o, () => {
				this.#o = null;
			}), this.#c &&= (this.#e.before(this.#c), null));
		}
		update_pending_count(e, t) {
			this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Et(() => {
				this.#d = !1, this.#m && nr(this.#m, this.#l);
			}));
		}
		get_effect_pending() {
			return this.#h(), U(this.#m);
		}
		error(e) {
			if (!this.#n.onerror && !this.#n.failed) throw e;
			Vn?.is_fork ? (this.#a && Vn.skip_effect(this.#a), this.#o && Vn.skip_effect(this.#o), this.#s && Vn.skip_effect(this.#s), Vn.oncommit(() => {
				this.#w(e);
			})) : this.#w(e);
		}
		#w(e) {
			this.#a &&= (Yr(this.#a), null), this.#o &&= (Yr(this.#o), null), this.#s &&= (Yr(this.#s), null), Ye && (We(this.#t), Ke(), We(qe()));
			let t = this.#n.failed, n = (e) => {
				let { reset: n, invoke_onerror: r } = this.#v(e);
				r(), t && (this.#s = this.#S(() => {
					try {
						return Gr(() => {
							var r = Oi;
							r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
						});
					} catch (e) {
						return jt(e, this.#i.parent), null;
					}
				}));
			};
			Et(() => {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					jt(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => jt(e, this.#i && this.#i.parent)) : n(t);
			});
		}
	};
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function gn(e, t, n, r) {
	let i = St() ? xn : Cn;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Oi, c = _n(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				jt(e, s);
			}
			vn();
		}
	}
	var d = yn();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Sn(e))).then(u).catch((e) => jt(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), vn();
	}) : f();
}
function _n() {
	var e = Oi, t = Ei, n = Ct, r = Vn;
	return function(i = !0) {
		ci(e), si(t), gt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function vn(e = !0) {
	ci(null), si(null), gt(null), e && Vn?.deactivate();
}
function yn() {
	var e = Oi, t = e.b, n = Vn, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
var bn = t((() => {
	_e(), i(), wt(), hn(), Mt(), Ii(), $n(), An(), ri(), kt();
}));
/*#__NO_SIDE_EFFECTS__*/
function xn(e) {
	var t = 2 | D;
	return Oi !== null && (Oi.f |= N), {
		ctx: Ct,
		deps: null,
		effects: null,
		equals: Qe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Pe,
		wv: 0,
		parent: Oi,
		ac: null
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Sn(e, t, n) {
	let r = Oi;
	r === null && be();
	var i = void 0, a = er(Pe), o = !Ei, s = /* @__PURE__ */ new Set();
	return Vr(() => {
		var t = Oi, n = c();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(vn);
		} catch (e) {
			n.reject(e), vn();
		}
		var l = Vn;
		if (o) {
			if (t.f & 32768) var u = yn();
			if (r.b?.is_rendered()) l.async_deriveds.get(t)?.reject(kn);
			else for (let e of s.values()) e.reject(kn);
			s.add(n), l.async_deriveds.set(t, n);
		}
		let d = (e, t = void 0) => {
			u?.(), s.delete(n), t !== kn && (l.activate(), t ? (a.f |= oe, nr(a, t)) : (a.f & 8388608 && (a.f ^= oe), nr(a, e)), l.deactivate());
		};
		n.promise.then(d, (e) => d(null, e || "unknown"));
	}), Nr(() => {
		for (let e of s) e.reject(kn);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function F(e) {
	let t = /* @__PURE__ */ xn(e);
	return rt || li(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Cn(e) {
	let t = /* @__PURE__ */ xn(e);
	return t.equals = et, t;
}
function wn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Yr(t[n]);
	}
}
function Tn(e) {
	var t, n = Oi, r = e.parent;
	if (!Ti && r !== null && e.v !== Pe && r.f & 24576) return Re(), e.v;
	ci(r);
	try {
		e.f &= ~re, wn(e), t = hi(e);
	} finally {
		ci(n);
	}
	return t;
}
function En(e) {
	var t = Tn(e);
	if (!e.equals(t) && (e.wv = fi(), (!Vn?.is_fork || e.deps === null) && (Vn === null ? e.v = t : (Vn.capture(e, t, !0), Hn?.capture(e, t, !0)), e.deps === null))) {
		Nt(e, E);
		return;
	}
	Ti || (Un === null ? Pt(e) : (Mr() || Vn?.is_fork) && Un.set(e, t));
}
function Dn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && sn(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = C), _i(t, 0), qr(t));
}
function On(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && vi(t);
}
var kn, An = t((() => {
	i(), _e(), Ii(), ln(), tt(), Me(), He(), ri(), lr(), ft(), at(), wt(), Le(), $n(), bn(), w(), It(), kn = Symbol("obsolete");
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
function jn(e) {
	var t = Gn;
	Gn = !0;
	try {
		var n;
		for (e && (Vn !== null && !Vn.is_fork && Vn.flush(), n = e());;) {
			if (Dt(), Vn === null) return n;
			Vn.flush();
		}
	} finally {
		Gn = t;
	}
}
function Mn() {
	try {
		Te();
	} catch (e) {
		jt(e, Wn);
	}
}
function Nn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && pi(r) && (Qn = /* @__PURE__ */ new Set(), vi(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Zr(r), Qn?.size > 0)) {
				sr.clear();
				for (let e of Qn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Qn.has(n) && (Qn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || vi(n);
					}
				}
				Qn.clear();
			}
		}
		Qn = null;
	}
}
function Pn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Pn(i, t, n, r) : e & 4194320 && !(e & 2048) && Fn(i, t, r) && (Nt(i, D), In(i));
	}
}
function Fn(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (m.call(t, r)) return !0;
		if (r.f & 2 && Fn(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function In(e) {
	Vn.schedule(e);
}
function Ln(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Nt(e, E);
		for (var n = e.first; n !== null;) Ln(n, t), n = n.next;
	}
}
function Rn(e) {
	Nt(e, E);
	for (var t = e.first; t !== null;) Rn(t), t = t.next;
}
var zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn, $n = t((() => {
	_e(), at(), w(), Ii(), Me(), kt(), i(), Mt(), lr(), ri(), zt(), Le(), It(), Qt(), ft(), $t(), An(), zn = null, Bn = null, Vn = null, Hn = null, Un = null, Wn = null, Gn = !1, Kn = !1, qn = null, Jn = null, Yn = 0, Xn = 1, Zn = class e {
		id = Xn++;
		#e = !1;
		linked = !0;
		#t = null;
		#n = null;
		async_deriveds = /* @__PURE__ */ new Map();
		current = /* @__PURE__ */ new Map();
		previous = /* @__PURE__ */ new Map();
		#r = /* @__PURE__ */ new Set();
		#i = /* @__PURE__ */ new Set();
		#a = 0;
		#o = /* @__PURE__ */ new Map();
		#s = null;
		#c = [];
		#l = [];
		#u = /* @__PURE__ */ new Set();
		#d = /* @__PURE__ */ new Set();
		#f = /* @__PURE__ */ new Map();
		#p = /* @__PURE__ */ new Set();
		is_fork = !1;
		#m = !1;
		constructor() {
			Bn === null ? zn = Bn = this : (Bn.#n = this, this.#t = Bn), Bn = this;
		}
		#h() {
			if (this.is_fork) return !0;
			for (let n of this.#o.keys()) {
				for (var e = n, t = !1; e.parent !== null;) {
					if (this.#f.has(e)) {
						t = !0;
						break;
					}
					e = e.parent;
				}
				if (!t) return !0;
			}
			return !1;
		}
		skip_effect(e) {
			this.#f.has(e) || this.#f.set(e, {
				d: [],
				m: []
			}), this.#p.delete(e);
		}
		unskip_effect(e, t = (e) => this.schedule(e)) {
			var n = this.#f.get(e);
			if (n) {
				this.#f.delete(e);
				for (var r of n.d) Nt(r, D), t(r);
				for (r of n.m) Nt(r, O), t(r);
			}
			this.#p.add(e);
		}
		#g() {
			this.#e = !0, Yn++ > 1e3 && (this.#S(), Mn());
			for (let e of this.#u) this.#d.delete(e), Nt(e, D), this.schedule(e);
			for (let e of this.#d) Nt(e, O), this.schedule(e);
			let t = this.#c;
			this.#c = [], this.apply();
			var n = qn = [], r = [], i = Jn = [];
			for (let e of t) try {
				this.#_(e, n, r);
			} catch (t) {
				throw Rn(e), this.#h() || this.discard(), t;
			}
			if (Vn = null, i.length > 0) {
				var a = e.ensure();
				for (let e of i) a.schedule(e);
			}
			if (qn = null, Jn = null, this.#h()) {
				this.#b(r), this.#b(n);
				for (let [e, t] of this.#f) Ln(e, t);
				i.length > 0 && Vn.#g();
				return;
			}
			let o = this.#v();
			if (o) {
				this.#b(r), this.#b(n), o.#y(this);
				return;
			}
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Hn = this, Nn(r), Nn(n), Hn = null, this.#s?.resolve();
			var s = Vn;
			if (this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), rt && (this.#x(), Vn = s)), this.#c.length > 0) {
				if (s !== null) {
					let e = s;
					e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
				} else s = this;
			}
			s !== null && (sr.clear(), s.#g());
		}
		#_(e, t, n) {
			e.f ^= E;
			for (var r = e.first; r !== null;) {
				var i = r.f, a = !!(i & 96);
				if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
					a ? r.f ^= E : i & 4 ? t.push(r) : rt && i & 16777224 ? n.push(r) : pi(r) && (i & 16 && this.#d.add(r), vi(r));
					var o = r.first;
					if (o !== null) {
						r = o;
						continue;
					}
				}
				for (; r !== null;) {
					var s = r.next;
					if (s !== null) {
						r = s;
						break;
					}
					r = r.parent;
				}
			}
		}
		#v() {
			for (var e = this.#t; e !== null;) {
				if (!e.is_fork) {
					for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
				}
				e = e.#t;
			}
			return null;
		}
		#y(e) {
			for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
			for (let [t, n] of e.async_deriveds) {
				let e = this.async_deriveds.get(t);
				e && n.promise.then(e.resolve).catch(e.reject);
			}
			e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
			let t = (e) => {
				var n = e.reactions;
				if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
					var r = e.f;
					if (r & 2) t(e);
					else {
						var i = e;
						r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Nt(i, D), this.schedule(i));
					}
				}
			};
			for (let e of this.current.keys()) t(e);
			this.oncommit(() => e.discard()), e.#S(), Vn = this, this.#g();
		}
		#b(e) {
			for (var t = 0; t < e.length; t += 1) Rt(e[t], this.#u, this.#d);
		}
		capture(e, t, n = !1) {
			e.v !== Pe && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Un?.set(e, t)), this.is_fork || (e.v = t);
		}
		activate() {
			Vn = this;
		}
		deactivate() {
			Vn = null, Un = null;
		}
		flush() {
			try {
				Kn = !0, Vn = this, this.#g();
			} finally {
				Yn = 0, Wn = null, qn = null, Jn = null, Kn = !1, Vn = null, Un = null, sr.clear();
			}
		}
		discard() {
			for (let e of this.#i) e(this);
			this.#i.clear();
			for (let e of this.async_deriveds.values()) e.reject(kn);
			this.#S(), this.#s?.resolve();
		}
		register_created_effect(e) {
			this.#l.push(e);
		}
		#x() {
			for (let u = zn; u !== null; u = u.#n) {
				var e = u.id < this.id, t = [];
				for (let [r, [i, a]] of this.current) {
					if (u.current.has(r)) {
						var n = u.current.get(r)[0];
						if (e && i !== n) u.current.set(r, [i, a]);
						else continue;
					}
					t.push(r);
				}
				if (e) for (let [e, t] of this.async_deriveds) {
					let n = u.async_deriveds.get(e);
					n && t.promise.then(n.resolve).catch(n.reject);
				}
				var r = [...u.current.keys()].filter((e) => !u.current.get(e)[1]);
				if (!(!u.#e || r.length === 0)) {
					var i = r.filter((e) => !this.current.has(e));
					if (i.length === 0) e && u.discard();
					else if (t.length > 0) {
						if (e) for (let e of this.#p) u.unskip_effect(e, (e) => {
							e.f & 4194320 ? u.schedule(e) : u.#b([e]);
						});
						u.activate();
						var a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
						for (var s of t) Pn(s, i, a, o);
						o = /* @__PURE__ */ new Map();
						var c = [...u.current].filter(([e, t]) => {
							let n = this.current.get(e);
							return !n || n[0] !== t[0] || n[1] !== t[1];
						}).map(([e]) => e);
						if (c.length > 0) for (let e of this.#l) !(e.f & 155648) && Fn(e, c, o) && (e.f & 4194320 ? (Nt(e, D), u.schedule(e)) : u.#u.add(e));
						if (u.#c.length > 0 && !u.#m) {
							u.apply();
							for (var l of u.#c) u.#_(l, [], []);
							u.#c = [];
						}
						u.deactivate();
					}
				}
			}
		}
		increment(e, t) {
			if (this.#a += 1, e) {
				let e = this.#o.get(t) ?? 0;
				this.#o.set(t, e + 1);
			}
		}
		decrement(e, t) {
			if (--this.#a, e) {
				let e = this.#o.get(t) ?? 0;
				e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
			}
			this.#m || (this.#m = !0, Et(() => {
				this.#m = !1, this.linked && this.flush();
			}));
		}
		transfer_effects(e, t) {
			for (let t of e) this.#u.add(t);
			for (let e of t) this.#d.add(e);
			e.clear(), t.clear();
		}
		oncommit(e) {
			this.#r.add(e);
		}
		ondiscard(e) {
			this.#i.add(e);
		}
		settled() {
			return (this.#s ??= c()).promise;
		}
		static ensure() {
			if (Vn === null) {
				let t = Vn = new e();
				!Kn && !Gn && Et(() => {
					t.#e || t.flush();
				});
			}
			return Vn;
		}
		apply() {
			if (!rt || !this.is_fork && this.#t === null && this.#n === null) {
				Un = null;
				return;
			}
			Un = /* @__PURE__ */ new Map();
			for (let [e, [t]] of this.current) Un.set(e, t);
			for (let t = zn; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
				var e = !1;
				if (t.id < this.id) {
					for (let [n, [, r]] of t.current) if (!r && this.current.has(n)) {
						e = !0;
						break;
					}
				}
				if (!e) for (let [e, n] of t.previous) Un.has(e) || Un.set(e, n);
			}
		}
		schedule(e) {
			if (Wn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
				e.b.defer_effect(e);
				return;
			}
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (qn !== null && t === Oi && (rt || (Ei === null || !(Ei.f & 2)) && !Yt)) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= E;
				}
			}
			this.#c.push(t);
		}
		#S() {
			if (this.linked) {
				var e = this.#t, t = this.#n;
				e === null ? zn = t : e.#n = t, t === null ? Bn = e : t.#t = e, this.linked = !1;
			}
		}
	}, Qn = null;
}));
function er(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Qe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function tr(e, t) {
	let n = er(e, t);
	return li(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t = !1, n = !0) {
	let r = er(e);
	return t || (r.equals = et), it && n && Ct !== null && Ct.l !== null && (Ct.l.s ??= []).push(r), r;
}
function L(e, t, n = !1) {
	return Ei !== null && (!Di || Ei.f & 131072) && St() && Ei.f & 4325394 && (ki === null || !ki.has(e)) && Ae(), nr(e, n ? ur(t) : t, Jn);
}
function nr(e, t, n = null) {
	if (!e.equals(t)) {
		Ti ? sr.set(e, t) : sr.has(e) || sr.set(e, e.v);
		var r = Zn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Tn(t), Un === null && Pt(t);
		}
		e.wv = fi(), ar(e, D, n), St() && Oi !== null && Oi.f & 1024 && !(Oi.f & 96) && (Mi === null ? ui([e]) : Mi.push(e)), !r.is_fork && or.size > 0 && !cr && rr();
	}
	return t;
}
function rr() {
	cr = !1;
	for (let e of or) {
		e.f & 1024 && Nt(e, O);
		let t;
		try {
			t = pi(e);
		} catch {
			t = !0;
		}
		t && vi(e);
	}
	or.clear();
}
function ir(e) {
	L(e, e.v + 1);
}
function ar(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = St(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Oi)) {
			var l = (c & D) === 0;
			if (l && Nt(s, t), c & 131072) or.add(s);
			else if (c & 2) {
				var u = s;
				Un?.delete(u), c & 65536 || (c & 512 && (Oi === null || !(Oi.f & 2097152)) && (s.f |= re), ar(u, O, n));
			} else if (l) {
				var d = s;
				c & 16 && Qn !== null && Qn.add(d), n === null ? In(d) : n.push(d);
			}
		}
	}
}
var or, sr, cr, lr = t((() => {
	i(), Ii(), tt(), _e(), Me(), at(), dt(), ft(), wt(), $n(), pr(), An(), It(), or = /* @__PURE__ */ new Set(), sr = /* @__PURE__ */ new Map(), cr = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/proxy.js
function ur(e) {
	if (typeof e != "object" || !e || se in e) return e;
	let t = x(e);
	if (t !== y && t !== b) return e;
	var n = /* @__PURE__ */ new Map(), r = f(e), i = /* @__PURE__ */ tr(0), a = null, o = Fi, s = (e) => {
		if (Fi === o) return e();
		var t = Ei, n = Fi;
		si(null), di(o);
		var r = e();
		return si(t), di(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ tr(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Oe();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ tr(r.value, a);
				return n.set(t, e), e;
			}) : L(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ tr(Pe, a));
					n.set(t, e), ir(i);
				}
			} else L(r, Pe), ir(i);
			return !0;
		},
		get(t, r, i) {
			if (r === se) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || _(t, r)?.writable) && (o = s(() => /* @__PURE__ */ tr(ur(c ? t[r] : Pe), a)), n.set(r, o)), o !== void 0) {
				var l = U(o);
				return l === Pe ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = U(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== Pe) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === se) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== Pe || Reflect.has(e, t);
			return (r !== void 0 || Oi !== null && (!i || _(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ tr(i ? ur(e[t]) : Pe, a)), n.set(t, r)), U(r) === Pe) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ tr(Pe, a)), n.set(d + "", f)) : L(f, Pe);
			}
			if (l === void 0) (!u || _(e, t)?.writable) && (l = s(() => /* @__PURE__ */ tr(void 0, a)), L(l, ur(o)), n.set(t, l));
			else {
				u = l.v !== Pe;
				var p = s(() => ur(o));
				L(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && L(h, g + 1);
				}
				ir(i);
			}
			return !0;
		},
		ownKeys(e) {
			U(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== Pe;
			});
			for (var [r, a] of n) a.v !== Pe && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			ke();
		}
	});
}
function dr(e) {
	try {
		if (typeof e == "object" && e && se in e) return e[se];
	} catch {}
	return e;
}
function fr(e, t) {
	return Object.is(dr(e), dr(t));
}
var pr = t((() => {
	i(), Ii(), w(), lr(), _e(), Le(), Me(), dt(), ft(), at();
})), mr = t((() => {
	He(), pr();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/operations.js
function hr() {
	if (Cr === void 0) {
		Cr = window, wr = document, Tr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Er = _(t, "firstChild").get, Dr = _(t, "nextSibling").get, S(e) && (e[de] = void 0, e[ue] = null, e[fe] = void 0, e.__e = void 0), S(n) && (n[pe] = void 0);
	}
}
function gr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _r(e) {
	return Er.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function vr(e) {
	return Dr.call(e);
}
function R(e, t) {
	if (!Ye) return /* @__PURE__ */ _r(e);
	var n = /* @__PURE__ */ _r(Xe);
	if (n === null) n = Xe.appendChild(gr());
	else if (t && n.nodeType !== 3) {
		var r = gr();
		return n?.before(r), We(r), r;
	}
	return t && Sr(n), We(n), n;
}
function z(e, t = !1) {
	if (!Ye) {
		var n = /* @__PURE__ */ _r(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ vr(n) : n;
	}
	if (t) {
		if (Xe?.nodeType !== 3) {
			var r = gr();
			return Xe?.before(r), We(r), r;
		}
		Sr(Xe);
	}
	return Xe;
}
function B(e, t = 1, n = !1) {
	let r = Ye ? Xe : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ vr(r);
	if (!Ye) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = gr();
			return r === null ? i?.after(a) : r.before(a), We(a), a;
		}
		Sr(r);
	}
	return We(r), r;
}
function yr(e) {
	e.textContent = "";
}
function br() {
	return !rt || Qn !== null ? !1 : (Oi.f & j) !== 0;
}
function xr(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Sr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
var Cr, wr, Tr, Er, Dr, Or = t((() => {
	Ze(), i(), mr(), w(), Ii(), at(), _e(), $n(), Le();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function kr(e) {
	Oi === null && (Ei === null && we(e), Ce()), Ti && Se(e);
}
function Ar(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function jr(e, t) {
	var n = Oi;
	n !== null && n.f & 8192 && (e |= k);
	var r = {
		ctx: Ct,
		deps: null,
		nodes: null,
		f: e | D | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	Vn?.register_created_effect(r);
	var i = r;
	if (e & 4) qn === null ? Zn.ensure().schedule(r) : qn.push(r);
	else if (t !== null) {
		try {
			vi(r);
		} catch (e) {
			throw Yr(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= M));
	}
	if (i !== null && (i.parent = n, n !== null && Ar(i, n), Ei !== null && Ei.f & 2 && !(e & 64))) {
		var a = Ei;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Mr() {
	return Ei !== null && !Di;
}
function Nr(e) {
	let t = jr(8, null);
	return Nt(t, E), t.teardown = e, t;
}
function Pr(e) {
	kr("$effect");
	var t = Oi.f;
	if (!Ei && t & 32 && Ct !== null && !Ct.i) {
		var n = Ct;
		(n.e ??= []).push(e);
	} else return Fr(e);
}
function Fr(e) {
	return jr(4 | te, e);
}
function Ir(e) {
	return kr("$effect.pre"), jr(8 | te, e);
}
function Lr(e) {
	Zn.ensure();
	let t = jr(64 | N, e);
	return () => {
		Yr(t);
	};
}
function Rr(e) {
	Zn.ensure();
	let t = jr(64 | N, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Qr(t, () => {
			Yr(t), n(void 0);
		}) : (Yr(t), n(void 0));
	});
}
function zr(e) {
	return jr(4, e);
}
function V(e, t) {
	var n = Ct, r = {
		effect: null,
		ran: !1,
		deps: e
	};
	n.l.$.push(r), r.effect = Hr(() => {
		if (e(), !r.ran) {
			r.ran = !0;
			var n = Oi;
			try {
				ci(n.parent), W(t);
			} finally {
				ci(n);
			}
		}
	});
}
function Br() {
	var e = Ct;
	Hr(() => {
		for (var t of e.l.$) {
			t.deps();
			var n = t.effect;
			n.f & 1024 && n.deps !== null && Nt(n, O), pi(n) && vi(n), t.ran = !1;
		}
	});
}
function Vr(e) {
	return jr(ae | N, e);
}
function Hr(e, t = 0) {
	return jr(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	gn(r, t, n, (t) => {
		jr(8, () => {
			e(...t.map(U));
		});
	});
}
function Ur(e, t = 0) {
	return jr(16 | t, e);
}
function Wr(e, t = 0) {
	return jr(T | t, e);
}
function Gr(e) {
	return jr(32 | N, e);
}
function Kr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Ti, n = Ei;
		oi(!0), si(null);
		try {
			t.call(null);
		} finally {
			oi(e), si(n);
		}
	}
}
function qr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && sn(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Yr(n, t), n = r;
	}
}
function Jr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Yr(t), t = n;
	}
}
function Yr(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Xr(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, qr(e, t && !n), _i(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Kr(e), e.f ^= ee, e.f |= A;
	var i = e.parent;
	i !== null && i.first !== null && Zr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Xr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ vr(e);
		e.remove(), e = n;
	}
}
function Zr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Qr(e, t, n = !0) {
	var r = [];
	$r(e, r, !0);
	var i = () => {
		n && Yr(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function $r(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= k;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				$r(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function ei(e) {
	ti(e, !0);
}
function ti(e, t) {
	if (e.f & 8192) {
		e.f ^= k, e.f & 1024 || (Nt(e, D), Zn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			ti(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function ni(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ vr(n);
		t.append(n), n = i;
	}
}
var ri = t((() => {
	Ii(), _e(), Me(), i(), w(), Or(), wt(), $n(), bn(), ln(), It();
})), ii, ai = t((() => {
	lr(), Ii(), ii = null;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/runtime.js
function oi(e) {
	Ti = e;
}
function si(e) {
	Ei = e;
}
function ci(e) {
	Oi = e;
}
function li(e) {
	Ei !== null && (!rt || Ei.f & 2) && (ki ??= /* @__PURE__ */ new Set()).add(e);
}
function ui(e) {
	Mi = e;
}
function di(e) {
	Fi = e;
}
function fi() {
	return ++Ni;
}
function pi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~re), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (pi(a) && En(a), a.wv > e.wv) return !0;
		}
		t & 512 && Un === null && Nt(e, E);
	}
	return !1;
}
function mi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!rt && ki !== null && ki.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? mi(a, t, !1) : t === a && (n ? Nt(a, D) : a.f & 1024 && Nt(a, O), In(a));
	}
}
function hi(e) {
	var t = Ai, n = ji, r = Mi, i = Ei, a = ki, o = Ct, s = Di, c = Fi, l = e.f;
	Ai = null, ji = 0, Mi = null, Ei = l & 96 ? null : e, ki = null, gt(e.ctx), Di = !1, Fi = ++Pi, e.ac !== null && (sn(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= j;
		var f = e.deps, p = Vn?.is_fork;
		if (Ai !== null) {
			var m;
			if (p || _i(e, ji), f !== null && ji > 0) for (f.length = ji + Ai.length, m = 0; m < Ai.length; m++) f[ji + m] = Ai[m];
			else e.deps = f = Ai;
			if (Mr() && e.f & 512) for (m = ji; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && ji < f.length && (_i(e, ji), f.length = ji);
		if (St() && Mi !== null && !Di && f !== null && !(e.f & 6146)) for (m = 0; m < Mi.length; m++) mi(Mi[m], e);
		if (i !== null && i !== e) {
			if (Pi++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Pi;
			if (t !== null) for (let e of t) e.rv = Pi;
			Mi !== null && (r === null ? r = Mi : r.push(...Mi));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (e) {
		return At(e);
	} finally {
		e.f ^= ie, Ai = t, ji = n, Mi = r, Ei = i, ki = a, gt(o), Di = s, Fi = c;
	}
}
function gi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = p.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Ai === null || !m.call(Ai, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~re), a.v !== Pe && Pt(a), a.ac !== null && sn(() => {
			a.ac.abort(he), a.ac = null, Nt(a, D);
		}), Dn(a), _i(a, 0);
	}
}
function _i(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) gi(e, n[r]);
}
function vi(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Nt(e, E);
		var n = Oi, r = wi;
		Oi = e, wi = !(t & 96);
		try {
			t & 16777232 ? Jr(e) : qr(e), Kr(e);
			var i = hi(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Ni;
		} finally {
			wi = r, Oi = n;
		}
	}
}
async function yi() {
	if (rt) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), jn();
}
function U(e) {
	var t = !!(e.f & 2);
	if (ii?.add(e), Ei !== null && !Di && !(Oi !== null && Oi.f & 16384) && (ki === null || !ki.has(e))) {
		var n = Ei.deps;
		if (Ei.f & 2097152) e.rv < Pi && (e.rv = Pi, Ai === null && n !== null && n[ji] === e ? ji++ : Ai === null ? Ai = [e] : Ai.push(e));
		else {
			Ei.deps ??= [], m.call(Ei.deps, e) || Ei.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [Ei] : m.call(r, Ei) || r.push(Ei);
		}
	}
	if (Ti && sr.has(e)) return sr.get(e);
	if (t) {
		var i = e;
		if (Ti) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || xi(i)) && (a = Tn(i)), sr.set(i, a), a;
		}
		var o = !(i.f & 512) && !Di && Ei !== null && (wi || !!(Ei.f & 512)), s = (i.f & j) === 0;
		pi(i) && (o && (i.f |= 512), En(i)), o && !s && (On(i), bi(i));
	}
	if (Un?.has(e)) return Un.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function bi(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (On(t), bi(t));
}
function xi(e) {
	if (e.v === Pe) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (sr.has(t) || t.f & 2 && xi(t)) return !0;
	return !1;
}
function W(e) {
	var t = Di;
	try {
		return Di = !0, e();
	} finally {
		Di = t;
	}
}
function Si(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) Ci(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && Ci(n);
		}
	}
}
function Ci(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Ci(e[n], t);
		} catch {}
		let n = x(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = v(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
var wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii = t((() => {
	i(), w(), ri(), _e(), lr(), An(), at(), dt(), ft(), wt(), $n(), Mt(), Le(), ai(), ln(), It(), He(), wi = !1, Ti = !1, Ei = null, Di = !1, Oi = null, ki = null, Ai = null, ji = 0, Mi = null, Ni = 1, Pi = 0, Fi = Pi;
}));
//#endregion
//#region node_modules/svelte/src/attachments/index.js
ri();
//#endregion
//#region node_modules/svelte/src/utils.js
function Li(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var Ri = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function zi(e) {
	return Ri.includes(e);
}
var Bi = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), Vi = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function Hi(e) {
	return e = e.toLowerCase(), Vi[e] ?? e;
}
[...Bi];
var Ui = ["touchstart", "touchmove"];
function Wi(e) {
	return Ui.includes(e);
}
var Gi = [
	"textarea",
	"script",
	"style",
	"title"
];
function Ki(e) {
	return Gi.includes(e);
}
_e(), Ii(), _e(), Ze(), wt(), ri(), w(), Ze(), kt(), Ii(), ln();
var qi = Symbol("events"), Ji = /* @__PURE__ */ new Set(), Yi = /* @__PURE__ */ new Set();
function Xi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || na.call(t, e), !e.cancelBubble) return sn(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Et(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Zi(e, t, n, r = {}) {
	var i = Xi(t, e, n, r);
	return () => {
		e.removeEventListener(t, i, r);
	};
}
function Qi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Xi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Nr(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[qi] ??= {})[e] = n;
}
function $i(e) {
	for (var t = 0; t < e.length; t++) Ji.add(e[t]);
	for (var n of Yi) n(e);
}
var ea = null, ta = !1;
function na(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	ea = e, ta || (ta = !0, setTimeout(() => {
		ta = !1, ea = null;
	}));
	var o = 0, s = ea === e && e[qi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[qi] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		g(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = Ei, d = Oi;
		si(null), ci(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[qi]?.[r];
					m != null && (!a.disabled || e.target === a) && m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[qi] = t, delete e.currentTarget, si(u), ci(d);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
Or();
var ra = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function ia(e) {
	return ra?.createHTML(e) ?? e;
}
function aa(e) {
	var t = xr("template");
	return t.innerHTML = ia(e.replaceAll("<!>", "<!---->")), t.content;
}
Ze(), Or(), Ii(), Le(), _e();
function oa(e, t) {
	var n = Oi;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ye) return oa(Xe, null), Xe;
		i === void 0 && (i = aa(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ _r(i)));
		var t = r || Tr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ _r(t), s = t.lastChild;
			oa(o, s);
		} else oa(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function sa(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (Ye) return oa(Xe, null), Xe;
		if (!o) {
			var e = /* @__PURE__ */ _r(aa(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ _r(e);) o.appendChild(/* @__PURE__ */ _r(e));
			else o = /* @__PURE__ */ _r(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ _r(t), r = t.lastChild;
			oa(n, r);
		} else oa(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ca(e, t) {
	return /* @__PURE__ */ sa(e, t, "svg");
}
function la(e = "") {
	if (!Ye) {
		var t = gr(e + "");
		return oa(t, t), t;
	}
	var n = Xe;
	return n.nodeType === 3 ? Sr(n) : (n.before(n = gr()), We(n)), oa(n, n), n;
}
function ua() {
	if (Ye) return oa(Xe, null), Xe;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = gr();
	return e.append(t, n), oa(t, n), e;
}
function q(e, t) {
	if (Ye) {
		var n = Oi;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Xe), Ge();
		return;
	}
	e !== null && e.before(t);
}
i(), Or(), Le(), Ii(), wt(), ri(), Ze(), w(), He(), Me(), _e(), hn();
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function da(e, t) {
	return pa(e, t);
}
var fa = /* @__PURE__ */ new Map();
function pa(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	hr();
	var c = void 0, l = Rr(() => {
		var o = n ?? t.appendChild(gr());
		fn(o, { pending: () => {} }, (t) => {
			bt({});
			var n = Ct;
			if (a && (n.c = a), i && (r.$$events = i), Ye && oa(t, null), c = e(t, r) || {}, Ye && (Oi.nodes.end = Xe, Xe === null || Xe.nodeType !== 8 || Xe.data !== "]")) throw ze(), Ne;
			xt();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Wi(r);
					for (let e of [t, document]) {
						var a = fa.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), fa.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, na, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(h(Ji)), Yi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = fa.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, na), r.delete(e), r.size === 0 && fa.delete(n)) : r.set(e, i);
			}
			Yi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return ma.set(c, l), c;
}
var ma = /* @__PURE__ */ new WeakMap();
_e(), Ze(), ri(), lr(), Ii(), w(), _e(), wt(), Me(), wt(), ut(), ri(), Ii(), ft(), bn(), Ii(), Ze(), Me(), $n(), ri(), _e(), Ze(), Or(), i();
var ha = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) ei(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (ei(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Yr(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						ni(r, t), t.append(gr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Yr(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Qr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Yr(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Vn, r = br();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = gr();
				i.append(a), this.#n.set(e, {
					effect: Gr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Gr(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Ye && (this.anchor = Xe), this.#a(n);
	}
};
w(), ri(), lr(), Ze(), kt(), wt(), $n(), bn(), _e(), Ze(), ri();
function Y(e, t, n = !1) {
	var r;
	Ye && (r = Xe, Ge());
	var i = new ha(e), a = n ? M : 0;
	function o(e, t) {
		if (Ye) {
			var n = Je(r);
			if (e !== parseInt(n.substring(1))) {
				var a = qe();
				We(a), i.anchor = a, Ue(!1), i.ensure(e, t), Ue(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Ur(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
wt(), ri(), Ze();
var ga = Symbol("NaN");
function _a(e, t, n) {
	Ye && Ge();
	var r = new ha(e), i = !St();
	Ur(() => {
		var e = t();
		e !== e && (e = ga), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
ri(), Ze(), Or();
function va(e, t) {
	Ye && We(/* @__PURE__ */ _r(e)), Hr(() => {
		var n = t();
		for (var r in n) {
			var i = n[r];
			i == null || i === "" ? e.style.removeProperty(r) : e.style.setProperty(r, i);
		}
	});
}
Le(), Ze(), Or(), ri(), lr(), w(), _e(), kt(), Ii(), i(), An(), $n(), Me(), dt();
function ya(e, t) {
	return t;
}
function ba(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Qr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					xa(e, h(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, u = l.parentNode;
			yr(u), u.append(l), e.items.clear();
		}
		xa(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function xa(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, ni(a, document.createDocumentFragment())) : Yr(t[i], n);
	}
}
var Sa;
function X(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = Ye ? We(/* @__PURE__ */ _r(c)) : c.appendChild(gr());
	}
	Ye && Ge();
	var l = null, u = /* @__PURE__ */ Cn(() => {
		var e = n();
		return f(e) ? e : e == null ? [] : h(e);
	}), d, p = /* @__PURE__ */ new Map(), m = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = l, wa(v, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= ne, Ea(l, null, o)) : ei(l) : Qr(l, () => {
			l = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Ur(() => {
			d = U(u);
			var e = d.length;
			let c = !1;
			Ye && Je(o) === "[!" != (e === 0) && (o = qe(), We(o), Ue(!1), c = !0);
			for (var f = /* @__PURE__ */ new Set(), h = Vn, v = br(), y = 0; y < e; y += 1) {
				Ye && Xe.nodeType === 8 && Xe.data === "]" && (o = Xe, c = !0, Ue(!1));
				var b = d[y], x = r(b, y), S = m ? null : s.get(x);
				S ? (S.v && nr(S.v, b), S.i && nr(S.i, y), v && h.unskip_effect(S.e)) : (S = Ta(s, m ? o : Sa ??= gr(), b, x, y, i, t, n), m || (S.e.f |= ne), s.set(x, S)), f.add(x);
			}
			if (e === 0 && a && !l && (m ? l = Gr(() => a(o)) : (l = Gr(() => a(Sa ??= gr())), l.f |= ne)), e > f.size && xe("", "", ""), Ye && e > 0 && We(qe()), !m) {
				if (p.set(h, f), v) {
					for (let [e, t] of s) f.has(e) || h.skip_effect(t.e);
					h.oncommit(g), h.ondiscard(_);
				} else g(h);
			}
			c && Ue(!0), U(u);
		}),
		flags: t,
		items: s,
		pending: p,
		outrogroups: null,
		fallback: l
	};
	m = !1, Ye && (o = Xe);
}
function Ca(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function wa(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Ca(e.effect.first), l, u = null, d, f = [], p = [], m, g, _, v;
	if (a) for (v = 0; v < o; v += 1) m = t[v], g = i(m, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (m = t[v], g = i(m, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (ei(_), a && (_.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === c) Ea(_, null, n);
			else {
				var y = u ? u.next : c;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Da(e, u, _), Da(e, _, y), Ea(_, y, n), u = _, f = [], p = [], c = Ca(u.next);
				continue;
			}
		}
		if (_ !== c) {
			if (l !== void 0 && l.has(_)) {
				if (f.length < p.length) {
					var b = p[0], x;
					u = b.prev;
					var S = f[0], C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) Ea(f[x], b, n);
					for (x = 0; x < p.length; x += 1) l.delete(p[x]);
					Da(e, S.prev, C.next), Da(e, u, S), Da(e, C, b), c = b, u = C, --v, f = [], p = [];
				} else l.delete(_), Ea(_, c, n), Da(e, _.prev, _.next), Da(e, _, u === null ? e.effect.first : u.next), Da(e, u, _), u = _;
				continue;
			}
			for (f = [], p = []; c !== null && c !== _;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Ca(c.next);
			if (c === null) continue;
		}
		_.f & 33554432 || f.push(_), u = _, c = Ca(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (xa(e, h(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var w = [];
		if (l !== void 0) for (_ of l) _.f & 8192 || w.push(_);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && w.push(c), c = Ca(c.next);
		var T = w.length;
		if (T > 0) {
			var E = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			ba(e, w, E);
		}
	}
	a && Et(() => {
		if (d !== void 0) for (_ of d) _.nodes?.a?.apply();
	});
}
function Ta(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? er(n) : /* @__PURE__ */ I(n, !1, !1) : null, l = o & 2 ? er(i) : null;
	return {
		v: c,
		i: l,
		e: Gr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ea(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ vr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Da(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
ri(), Ze(), wt(), Or(), Ii(), _e(), Ze(), _e(), ri(), wt(), Ze(), Me(), i(), Or();
function Oa(e, t, ...n) {
	var r = new ha(e);
	Ur(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, M);
}
_e(), ri(), Ze(), Le();
function ka(e, t, n) {
	var r;
	Ye && (r = Xe, Ge());
	var i = new ha(e);
	Ur(() => {
		var e = t() ?? null;
		if (Ye && Je(r) === "[" != (e !== null)) {
			var a = qe();
			We(a), i.anchor = a, Ue(!1), i.ensure(e, e && ((t) => n(t, e))), Ue(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, M);
}
w(), w(), ri(), Ii(), _e(), kt(), ln(), Le(), Ze(), Or(), ri(), Ii(), wt(), i(), _e();
function Aa(e, t, n, r, i, a) {
	let o = Ye;
	Ye && Ge();
	var s = null;
	Ye && Xe.nodeType === 1 && (s = Xe, Ge());
	var c = Ye ? Xe : e, l = new ha(c, !1);
	Ur(() => {
		let e = t() || null;
		var a = i ? i() : n || e === "svg" ? Ie : void 0;
		if (e === null) {
			l.ensure(null, null);
			return;
		}
		return l.ensure(e, (t) => {
			if (e) {
				if (s = Ye ? s : xr(e, a), oa(s, s), r) {
					var n = null;
					Ye && Ki(e) && s.append(n = document.createComment(""));
					var i = Ye ? /* @__PURE__ */ _r(s) : s.appendChild(gr());
					Ye && (i === null ? Ue(!1) : We(i)), r(s, i), n?.remove();
				}
				Oi.nodes.end = s, t.before(s);
			}
			Ye && We(t);
		}), () => {};
	}, M), Nr(() => {}), o && (Ue(!0), We(c));
}
Ze(), Or(), ri(), _e(), ri(), Or(), Ii(), ri(), tt(), Ii();
function ja(e, t, n) {
	zr(() => {
		var r = W(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			Hr(() => {
				var e = n();
				Si(e), i && $e(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attachments.js
ri();
function Ma(e, t) {
	var n = void 0, r;
	Wr(() => {
		n !== (n = t()) && (r &&= (Yr(r), null), n && (r = Gr(() => {
			zr(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function Na(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Na(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Pa() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Na(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
w();
function Fa(e) {
	return typeof e == "object" ? Pa(e) : e ?? "";
}
var Ia = [..." 	\n\r\f\xA0\v﻿"];
function La(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Ia.includes(r[o - 1])) && (s === r.length || Ia.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Ra(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function za(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ba(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(za)), i && c.push(...Object.keys(i).map(za));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = za(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Ra(r)), i && (n += Ra(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
_e(), Ze();
function Z(e, t, n, r, i, a) {
	var o = e[de];
	if (Ye || o !== n || o === void 0) {
		var s = La(n, r, a);
		(!Ye || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
_e(), Ze();
function Va(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ha(e, t, n, r) {
	var i = e[fe];
	if (Ye || i !== t) {
		var a = Ba(t, r);
		(!Ye || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (Va(e, n?.[0], r[0]), Va(e, n?.[1], r[1], "important")) : Va(e, n, r));
	return r;
}
ri(), ln(), pr(), w(), He(), $n(), at();
function Ua(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!f(t)) return Be();
		for (var r of e.options) r.selected = t.includes(Ka(r));
		return;
	}
	for (r of e.options) if (fr(Ka(r), t)) {
		r.selected = !0;
		return;
	}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function Wa(e) {
	var t = new MutationObserver(() => {
		"__value" in e && Ua(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Nr(() => {
		t.disconnect();
	});
}
function Ga(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	cn(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Ka);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Ka(o);
		}
		n(a), e.__value = a, Vn !== null && r.add(Vn);
	}), zr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = rt ? Hn : Vn;
			if (r.has(o)) return;
		}
		if (Ua(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Ka(s), n(a));
		}
		e.__value = a, i = !1;
	}), Wa(e);
}
function Ka(e) {
	return "__value" in e ? e.__value : e.value;
}
i(), Ze(), w(), an(), He(), _e(), kt(), Ii(), Le(), ri(), bn();
var qa = Symbol("class"), Ja = Symbol("style"), Ya = Symbol("is custom element"), Xa = Symbol("is html"), Za = ge ? "link" : "LINK", Qa = ge ? "input" : "INPUT", $a = ge ? "option" : "OPTION", eo = ge ? "select" : "SELECT", to = ge ? "progress" : "PROGRESS";
function no(e) {
	if (Ye) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[me] = n, Et(n), nn();
	}
}
function ro(e, t) {
	var n = so(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === to) && (e.value = t ?? "");
}
function io(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Q(e, t, n, r) {
	var i = so(e);
	Ye && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Za) || i[t] !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && lo(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ao(e, t, n, r, i = !1, a = !1) {
	if (Ye && i && e.nodeName === Qa) {
		var o = e;
		(o.type === "checkbox" ? "defaultChecked" : "defaultValue") in n || no(o);
	}
	var s = so(e), c = s[Ya], l = !s[Xa];
	let u = Ye && c;
	u && Ue(!1);
	var d = t || {}, f = e.nodeName === $a;
	for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
	n.class ? n.class = Fa(n.class) : (r || n[qa]) && (n.class = null), n[Ja] && (n.style ??= null);
	var m = lo(e);
	if (e.nodeName === Qa && "type" in n && ("value" in n || "__value" in n)) {
		var h = n.type;
		(h !== d.type || h === void 0 && e.hasAttribute("type")) && (d.type = h, Q(e, "type", h, a));
	}
	for (let i in n) {
		let o = n[i];
		if (f && i === "value" && o == null) {
			e.value = e.__value = "", d[i] = o;
			continue;
		}
		if (i === "class") {
			Z(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", o, r, t?.[qa], n[qa]), d[i] = o, d[qa] = n[qa];
			continue;
		}
		if (i === "style") {
			Ha(e, o, t?.[Ja], n[Ja]), d[i] = o, d[Ja] = n[Ja];
			continue;
		}
		var g = d[i];
		if (!(o === g && !(o === void 0 && e.hasAttribute(i)))) {
			d[i] = o;
			var _ = i[0] + i[1];
			if (_ !== "$$") {
				if (_ === "on") {
					let t = {}, n = "$$" + i, r = i.slice(2);
					var v = zi(r);
					if (Li(r) && (r = r.slice(0, -7), t.capture = !0), !v && g) {
						if (o != null) continue;
						e.removeEventListener(r, d[n], t), d[n] = null;
					}
					if (v) G(r, e, o), $i([r]);
					else if (o != null) {
						function a(e) {
							d[i].call(this, e);
						}
						d[n] = Xi(r, e, a, t);
					}
				} else if (i === "style") Q(e, i, o);
				else if (i === "autofocus") en(e, !!o);
				else if (!c && (i === "__value" || i === "value" && o != null)) e.value = e.__value = o;
				else if (i === "selected" && f) io(e, o);
				else {
					var y = i;
					l || (y = Hi(y));
					var b = y === "defaultValue" || y === "defaultChecked";
					if (o == null && !c && !b) {
						if (s[i] = null, y === "value" || y === "checked") {
							let n = e, r = t === void 0;
							if (y === "value") {
								let e = n.defaultValue;
								n.removeAttribute(y), n.defaultValue = e, n.value = n.__value = r ? e : null;
							} else {
								let e = n.defaultChecked;
								n.removeAttribute(y), n.defaultChecked = e, n.checked = r ? e : !1;
							}
						} else e.removeAttribute(i);
					} else b || m.includes(y) && (c || typeof o != "string") ? (e[y] = o, y in s && (s[y] = Pe)) : typeof o != "function" && Q(e, y, o, a);
				}
			}
		}
	}
	return u && Ue(!0), d;
}
function oo(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	gn(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === eo, l = !1;
		if (Wr(() => {
			var u = t(...n.map(U)), d = ao(e, r, u, a, o, s);
			l && c && "value" in u && Ua(e, u.value);
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || Yr(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var f = u[t];
				t.description === "@attach" && (!r || f !== r[t]) && (i[t] && Yr(i[t]), i[t] = Gr(() => Ma(e, () => f))), d[t] = f;
			}
			r = d;
		}), c) {
			var u = e;
			zr(() => {
				Ua(u, r.value, !0), Wa(u);
			});
		}
		l = !0;
	});
}
function so(e) {
	return e[ue] ??= {
		[Ya]: e.nodeName.includes("-"),
		[Xa]: e.namespaceURI === Fe
	};
}
var co = /* @__PURE__ */ new Map();
function lo(e) {
	var t = e.getAttribute("is") || e.nodeName, n = co.get(t);
	if (n) return n;
	co.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = v(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = x(i);
	}
	return n;
}
Ze(), Or(), ln(), i(), ri(), ln(), Me(), pr(), kt(), Ze(), Ii(), $n(), at();
function uo(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	cn(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = po(e) ? mo(a) : a, n(a), Vn !== null && r.add(Vn), await yi(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ye && e.defaultValue !== e.value || W(t) == null && e.value) && (n(po(e) ? mo(e.value) : e.value), Vn !== null && r.add(Vn)), Hr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = rt ? Hn : Vn;
			if (r.has(i)) return;
		}
		po(e) && n === mo(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function fo(e, t, n = t) {
	cn(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (Ye && e.defaultChecked !== e.checked || W(t) == null) && n(e.checked), Hr(() => {
		e.checked = !!t();
	});
}
function po(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function mo(e) {
	return e === "" ? null : +e;
}
ri(), ln(), ln(), ri(), w(), ri(), Ii();
var ho = /* @__PURE__ */ new class e {
	#e = /* @__PURE__ */ new WeakMap();
	#t;
	#n;
	static entries = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.#n = e;
	}
	observe(e, t) {
		var n = this.#e.get(e) || /* @__PURE__ */ new Set();
		return n.add(t), this.#e.set(e, n), this.#r().observe(e, this.#n), () => {
			var n = this.#e.get(e);
			n.delete(t), n.size === 0 && (this.#e.delete(e), this.#t.unobserve(e));
		};
	}
	#r() {
		return this.#t ??= new ResizeObserver((t) => {
			for (var n of t) {
				e.entries.set(n.target, n);
				for (var r of this.#e.get(n.target) || []) r(n);
			}
		});
	}
}({ box: "border-box" });
function go(e, t, n) {
	var r = ho.observe(e, () => n(e[t]));
	zr(() => (W(() => n(e[t])), r));
}
_e(), wt(), ri(), Ii();
function _o(e, t) {
	return e === t || e?.[se] === t;
}
function vo(e = {}, t, n, r) {
	var i = Ct.r, a = Oi;
	return zr(() => {
		var o, s;
		return Hr(() => {
			o = s, s = r?.() || [], W(() => {
				_o(n(...s), e) || (t(e, ...s), o && _o(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && _o(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
ri(), ln();
function yo(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? Hr(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && Nr(() => {
		n.removeEventListener(t, a);
	});
}
ri(), ln();
function bo(e, t) {
	on(window, ["resize"], () => sn(() => t(window[e])));
}
w(), ri(), w(), wt(), An(), ri(), Ii();
function xo(e = !1) {
	let t = Ct, n = t.l.u;
	if (!n) return;
	let r = () => Si(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ xn(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => U(i);
	}
	n.b.length && Ir(() => {
		So(t, r), s(n.b);
	}), Pr(() => {
		let e = W(() => n.m.map(o));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Pr(() => {
		So(t, r), s(n.a);
	});
}
function So(e, t) {
	if (e.l.s) for (let t of e.l.s) U(t);
	t();
}
lr(), Ii(), w(), i(), Le(), w(), lr(), An(), Ii(), Me(), _e(), pr(), Qt(), at(), ri();
var Co = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	has(e, t) {
		return !e.exclude.has(t) && t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	}
};
/*#__NO_SIDE_EFFECTS__*/
function wo(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, Co);
}
var To = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (a(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			a(i) && (i = i());
			let o = _(i, t);
			if (o && o.set) return o.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (a(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = _(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === se || t === ce) return !1;
		for (let n of e.props) if (a(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (a(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function Eo(...e) {
	return new Proxy({ props: e }, To);
}
function $(e, t, n, r) {
	var i = !it || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ xn(r), U(l)) : (c && (c = !1, s = o ? W(r) : r), s);
	let d;
	if (a) {
		var f = se in e || ce in e;
		d = _(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Jt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ee(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var v = !1, y = (n & 1 ? xn : Cn)(() => (v = !1, h()));
	a && U(y);
	var b = Oi;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(y) : i && a ? ur(e) : e;
			return L(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Ti && v || b.f & 16384 ? y.v : U(y);
	});
}
wt(), ri(), Qt(), bn(), _e(), ri(), lr(), Ii(), $n(), w(), Me(), wt(), at(), It(), ri(), w(), Or(), _e(), ut(), Ii(), wt(), dt(), an(), Ze(), bn(), $n(), An(), ri(), lr(), Qt(), hn(), ai(), Ii(), pr(), Or(), ut(), w(), mr(), Ze(), Me(), Ii(), w(), Me(), at(), wt(), i(), $n();
function Do(e) {
	Ct === null && ve("onMount"), it && Ct.l !== null ? ko(Ct).m.push(e) : Pr(() => {
		let t = W(e);
		if (typeof t == "function") return t;
	});
}
function Oo(e) {
	Ct === null && ve("onDestroy"), Do(() => () => W(e));
}
function ko(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5"), at(), nt();
//#endregion
//#region node_modules/svelte/src/store/index-client.js
var Ao = t((() => {
	ri(), Gt(), dn(), Ii();
})), jo = /* @__PURE__ */ n({
	applyCampaignControl: () => Po,
	applyObserverSnapshot: () => Fo,
	campaignState: () => Wo,
	connectCampaignState: () => Uo,
	projectFromLocation: () => Mo,
	refreshAccess: () => Bo,
	refreshAll: () => Vo,
	refreshCampaignControl: () => Ro,
	refreshObserverSnapshot: () => zo,
	selectProject: () => Io
});
function Mo() {
	if (typeof location > "u") return "";
	try {
		return decodeURIComponent(location.pathname.match(/^\/projects\/([^/]+)/)?.[1] || "");
	} catch {
		return "";
	}
}
function No(e) {
	Wo.update((t) => ({
		...t,
		...e
	}));
}
function Po(e, t) {
	Wo.update((n) => ({
		...n,
		control: e,
		selectedProject: t ?? n.selectedProject ?? Mo()
	}));
}
function Fo(e) {
	No({
		observer: e,
		connection: "live",
		connectionLabel: "Live",
		lastError: ""
	});
}
function Io(e, t = !1) {
	let n = e ? `/projects/${encodeURIComponent(e)}` : "/";
	history[t ? "replaceState" : "pushState"](null, "", n), No({ selectedProject: e });
}
function Lo(e, t = Ut(Wo).selectedProject) {
	let n = new URL(e, location.origin);
	return n.searchParams.set("view", "compact"), t && n.searchParams.set("project", t), `${n.pathname}${n.search}`;
}
async function Ro(e = Ut(Wo).selectedProject) {
	let t = await fetch(Lo("/api/control", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh campaign state: ${t.status}`);
	let n = await t.json();
	return Po(n), n;
}
async function zo(e = Ut(Wo).selectedProject) {
	let t = await fetch(Lo("/api/snapshot", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh lane state: ${t.status}`);
	let n = await t.json();
	return Fo(n), n;
}
async function Bo(e = Ut(Wo).selectedProject) {
	let t = new URL("/api/me", location.origin);
	e && t.searchParams.set("project", e);
	let n = await fetch(`${t.pathname}${t.search}`, { cache: "no-store" });
	if (!n.ok) throw Error(`Could not load access scope: ${n.status}`);
	let r = await n.json();
	return No({ access: r }), r;
}
async function Vo() {
	No({
		connection: "refreshing",
		connectionLabel: "Refreshing",
		lastError: ""
	});
	try {
		let e = Ut(Wo).selectedProject, t = await fetch(Lo("/api/refresh", e), { method: "POST" });
		if (!t.ok) throw Error(`Refresh failed: ${t.status}`);
		Fo(await t.json()), await Ro(e);
	} catch (e) {
		throw No({
			connection: "offline",
			connectionLabel: "Refresh failed",
			lastError: e instanceof Error ? e.message : String(e)
		}), e;
	}
}
function Ho(e) {
	Wo.update((t) => {
		let n = t.control?.projects?.map((t) => t.id === e.projectId && t.coordinator?.attached ? {
			...t,
			coordinator: {
				...t.coordinator,
				live: e
			}
		} : t);
		return {
			...t,
			coordinatorActivity: e,
			control: t.control && n ? {
				...t.control,
				projects: n
			} : t.control
		};
	});
}
function Uo() {
	let e = null, t = !1, n = null, r = 0, i = (n) => {
		if (t) return;
		let i = ++r;
		e?.close(), No({
			connection: "connecting",
			connectionLabel: "Connecting"
		}), e = new EventSource(Lo("/api/events", n)), e.addEventListener("snapshot", (e) => {
			if (i === r) try {
				Fo(JSON.parse(e.data));
			} catch (e) {
				No({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.addEventListener("campaign", (e) => {
			if (i === r) try {
				Po(JSON.parse(e.data));
			} catch (e) {
				No({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.addEventListener("coordinator", (e) => {
			if (i === r) try {
				Ho(JSON.parse(e.data));
			} catch (e) {
				No({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.onerror = () => {
			i === r && No({
				connection: "reconnecting",
				connectionLabel: "Reconnecting"
			});
		};
	}, a = () => No({ selectedProject: Mo() });
	addEventListener("popstate", a);
	let o = Wo.subscribe((e) => {
		e.selectedProject !== n && (n = e.selectedProject, i(e.selectedProject), Promise.all([
			zo(e.selectedProject),
			Ro(e.selectedProject),
			Bo(e.selectedProject)
		]).catch((e) => {
			No({
				connection: "offline",
				connectionLabel: "Offline",
				lastError: e instanceof Error ? e.message : String(e)
			});
		}));
	});
	return () => {
		t = !0, r += 1, e?.close(), o(), removeEventListener("popstate", a);
	};
}
var Wo, Go = t((() => {
	Ao(), Wo = Ht({
		control: null,
		observer: null,
		selectedProject: Mo(),
		connection: "connecting",
		connectionLabel: "Connecting",
		lastError: "",
		coordinatorActivity: null,
		access: null
	});
}));
//#endregion
//#region src/ui/campaign-actions.ts
Go();
var Ko = { pending: {} }, qo = /* @__PURE__ */ new Set(), Jo = /* @__PURE__ */ new Map();
function Yo(e) {
	Ko = e;
	for (let e of qo) e(Ko);
}
var Xo = (e) => new Promise((t) => setTimeout(t, e)), Zo = async () => {
	let { refreshCampaignControl: e } = await Promise.resolve().then(() => (Go(), jo));
	return e();
};
function Qo(e, t) {
	return e.projects?.find((e) => e.id === t) || null;
}
function $o(e) {
	return e?.status === "failed" && /^Stale project version:/i.test(e.error || "");
}
function es(e, t) {
	return `${e.projectId}:${e.type}:${t}`;
}
function ts(e, t, n, r, i) {
	return [
		e.type.slice(0, 56),
		t.slice(0, 40),
		n,
		r.slice(0, 36),
		String(i)
	].join(":");
}
function ns(e, t) {
	Yo({ pending: {
		...Ko.pending,
		[e]: {
			projectId: t.projectId,
			type: t.type,
			targetId: t.targetId || "",
			startedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	} });
}
function rs(e) {
	let t = { ...Ko.pending };
	delete t[e], Yo({ pending: t });
}
async function is(e, t = {}) {
	let n = t.refresh || Zo, r = t.fetcher || fetch, i = t.wait || Xo, a = (t.nonce || (() => crypto.randomUUID()))(), o = es(e, a), s = Math.max(0, Math.min(3, e.staleRetries ?? 1)), c = Math.max(1, Math.min(240, e.pollLimit ?? 80)), l = Math.max(25, Math.min(2e3, e.pollIntervalMs ?? 250)), u = String(e.scope || "svelte").replace(/[^a-z0-9._-]+/gi, "-").slice(0, 32) || "svelte";
	ns(o, e);
	try {
		let t = await n(), o = Qo(t, e.projectId);
		if (!o) throw Error("The selected campaign is no longer available");
		let d = null, f = 0;
		for (let p = 0; p <= s; p++) {
			let m = await r("/api/actions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					projectId: o.id,
					type: e.type,
					targetId: e.targetId || "",
					args: e.args || {},
					expectedVersion: o.version,
					idempotencyKey: ts(e, o.id, u, a, p)
				})
			}), h = await m.json();
			if (!m.ok) throw Error(h.error || `Action failed: ${m.status}`);
			d = h;
			for (let r = 0; h.id && r < c && ["queued", "running"].includes(d?.status || ""); r++) {
				if (await i(l), t = await n(), o = Qo(t, e.projectId), !o) throw Error("The campaign disappeared while its action was settling");
				d = o.actions?.find((e) => e.id === h.id) || d;
			}
			if (!$o(d) || p === s) break;
			if (f += 1, t = await n(), o = Qo(t, e.projectId), !o) throw Error("The campaign disappeared while its control version refreshed");
		}
		if (d?.status === "failed") throw Error(d.error || `${e.type} failed`);
		if (d?.status !== "completed") throw Error(`${e.type} did not settle before the control timeout`);
		if (t = await n(), o = Qo(t, e.projectId), !o) throw Error("The selected campaign disappeared after its action completed");
		return {
			action: d,
			control: t,
			project: o,
			staleRetries: f
		};
	} catch (e) {
		throw await n().catch(() => void 0), e;
	} finally {
		rs(o);
	}
}
async function as(e, t = {}) {
	let n = Jo.get(e.projectId) || Promise.resolve(), r, i = new Promise((e) => {
		r = e;
	}), a = n.catch(() => void 0).then(() => i);
	Jo.set(e.projectId, a), await n.catch(() => void 0);
	try {
		return await is(e, t);
	} finally {
		r(), Jo.get(e.projectId) === a && Jo.delete(e.projectId);
	}
}
//#endregion
//#region src/ui/pwa.ts
Ao();
var os = Ht("loading");
function ss(e) {
	let t = "=".repeat((4 - e.length % 4) % 4), n = atob((e + t).replace(/-/g, "+").replace(/_/g, "/"));
	return Uint8Array.from([...n].map((e) => e.charCodeAt(0)));
}
async function cs() {
	if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
		os.set("unsupported");
		return;
	}
	try {
		let e = await navigator.serviceWorker.ready;
		os.set(await e.pushManager.getSubscription() ? "enabled" : "disabled");
	} catch {
		os.set("error");
	}
}
async function ls() {
	if (!(!("serviceWorker" in navigator) || !("PushManager" in window))) {
		os.set("loading");
		try {
			let e = await navigator.serviceWorker.ready, t = await e.pushManager.getSubscription();
			if (t) await fetch("/api/push/unsubscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ endpoint: t.endpoint })
			}), await t.unsubscribe();
			else {
				if (await Notification.requestPermission() !== "granted") {
					os.set("disabled");
					return;
				}
				let t = await fetch("/api/me", { cache: "no-store" }).then((e) => e.json()), n = await e.pushManager.subscribe({
					userVisibleOnly: !0,
					applicationServerKey: ss(t.pushPublicKey)
				});
				if (!(await fetch("/api/push/subscribe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(n)
				})).ok) throw Error("Could not register push subscription");
			}
			await cs();
		} catch {
			os.set("error");
		}
	}
}
function us() {
	if (!("serviceWorker" in navigator)) return os.set("unsupported"), () => void 0;
	let e = !!navigator.serviceWorker.controller, t = () => {
		if (!e) return;
		let t = "lane-watch-controller-v91";
		sessionStorage.getItem(t) || (sessionStorage.setItem(t, "1"), location.reload());
	};
	return navigator.serviceWorker.addEventListener("controllerchange", t), navigator.serviceWorker.register("/sw.js?v=104", { updateViaCache: "none" }).then(async (e) => {
		e.waiting?.postMessage({ type: "SKIP_WAITING" }), await e.update(), await cs();
	}).catch(() => os.set("error")), () => navigator.serviceWorker.removeEventListener("controllerchange", t);
}
//#endregion
//#region src/ui/ObserverDashboard.svelte
var ds = /* @__PURE__ */ K("<button> </button>"), fs = /* @__PURE__ */ K("<option> </option>"), ps = /* @__PURE__ */ K("<p class=\"banner\" role=\"status\"> </p>"), ms = /* @__PURE__ */ K("<div class=\"activity-line\"><span class=\"pulse\"></span><span> </span></div>"), hs = /* @__PURE__ */ K("<span class=\"meta-chip\"> </span>"), gs = /* @__PURE__ */ K("<button type=\"button\"><div class=\"card-top\"><span class=\"lane-name\"> </span><span class=\"status-pill\"> </span></div> <h3 class=\"task-title\"> </h3> <p class=\"detail\"> </p> <!> <div class=\"meta-row\"><span class=\"meta-chip\"> </span> <!> <span class=\"meta-chip\"> </span><span class=\"meta-chip\"> </span> <span> </span> <!></div> <div class=\"card-footer\"><span> </span><span> </span></div></button>"), _s = /* @__PURE__ */ K("<div class=\"empty-state\"><p>No lanes match this view.</p></div>"), vs = /* @__PURE__ */ K("<p class=\"banner\" role=\"alert\"> </p>"), ys = /* @__PURE__ */ K("<div class=\"detail-cell\"><span> </span><strong> </strong></div>"), bs = /* @__PURE__ */ K("<div class=\"command\"> </div>"), xs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>In-flight activity</h3><!></section>"), Ss = /* @__PURE__ */ K("<div class=\"timeline-item\"><time> </time><p> </p></div>"), Cs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Recent timeline</h3><!></section>"), ws = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Result</h3><p> </p></section>"), Ts = /* @__PURE__ */ K("<p class=\"dialog-feedback\"> </p>"), Es = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Controls</h3><button class=\"primary-button\"> </button><!></section>"), Ds = /* @__PURE__ */ K("<section class=\"dialog-section ownership-boundary\"><h3>Observed elsewhere</h3><p> </p></section>"), Os = /* @__PURE__ */ K("<div class=\"dialog-shell\"><header class=\"dialog-header\"><div><p class=\"eyebrow\"> </p><h2> </h2></div><button class=\"close-button\" aria-label=\"Close lane details\">×</button></header> <div class=\"dialog-body\"><!> <section class=\"dialog-section\"><h3>Snapshot</h3><div class=\"detail-grid\"></div></section> <section class=\"dialog-section\"><h3>Current detail</h3><p> </p></section> <!> <!> <!> <section class=\"dialog-section\"><h3>Source</h3><p> <br/> <br/> </p></section> <!></div></div>"), ks = /* @__PURE__ */ K("<section class=\"summary\" aria-label=\"Lane summary\"><button><span class=\"summary-value\"> </span><span>working</span></button> <button><span class=\"summary-value\"> </span><span>idle</span></button> <button><span class=\"summary-value\"> </span><span>attention</span></button> <button><span class=\"summary-value\"> </span><span>complete</span></button></section> <section class=\"controls observer-controls\" aria-label=\"Lane dashboard controls\"><div class=\"filter-tabs\" role=\"tablist\" aria-label=\"Lane filters\"></div> <div class=\"control-row\"><label class=\"search-box\"><span class=\"sr-only\">Search lanes</span><input type=\"search\" placeholder=\"Search task, lane, project…\" autocomplete=\"off\"/></label> <select aria-label=\"Filter by project\"><option>All projects</option><!></select> <button> </button></div></section> <!> <section class=\"lane-grid\" aria-live=\"polite\"></section> <!> <dialog class=\"lane-dialog\"><!></dialog>", 1);
function As(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", i), r = () => Kt(os, "$alertState", i), [i, a] = qt(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(), p = /* @__PURE__ */ I(), m = /* @__PURE__ */ I(), h = /* @__PURE__ */ I("active"), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I(typeof location > "u" ? "" : new URL(location.href).searchParams.get("lane") || ""), v = /* @__PURE__ */ I(), y = /* @__PURE__ */ I(null), b = /* @__PURE__ */ I(""), x = /* @__PURE__ */ I(!1), S = /* @__PURE__ */ I(""), C = /* @__PURE__ */ I(null), w = {
		working: 0,
		idle: 1,
		attention: 2,
		unknown: 3,
		complete: 4
	};
	function T(e = "") {
		let t = Date.now() - new Date(e).valueOf();
		if (!Number.isFinite(t)) return e || "unknown";
		let n = Math.abs(t), [r, i] = n < 6e4 ? ["s", 1e3] : n < 36e5 ? ["m", 6e4] : n < 864e5 ? ["h", 36e5] : ["d", 864e5], a = Math.max(1, Math.round(n / i));
		return t < 0 ? `in ${a}${r}` : `${a}${r} ago`;
	}
	function E(e) {
		return e == null ? "—" : e >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e);
	}
	function D(e) {
		let t = (U(C)?.laneOwnership || []).find((t) => t.laneId === e.id);
		return t ? {
			...t,
			label: t.origin === "controller-run" ? "controller run" : t.origin === "adopted-wave" ? "adopted wave" : "observed elsewhere"
		} : e.lifecycle === "active" ? {
			origin: "observed-elsewhere",
			controlled: !1,
			reason: "No current Lane Watch ownership record exists.",
			label: "observed elsewhere"
		} : {
			origin: "historical",
			controlled: !1,
			reason: "This is a historical observer record.",
			label: "historical"
		};
	}
	function O(e) {
		if (n().selectedProject && e.project !== n().selectedProject) return !1;
		let t = `${e.task} ${e.lane} ${e.project} ${e.model} ${e.detail} ${e.topology?.profile || ""} ${e.topology?.childModel || ""}`.toLowerCase();
		if (U(g).trim() && !t.includes(U(g).trim().toLowerCase())) return !1;
		if (U(h) === "all") return !0;
		if (U(h) === "running") return ["working", "idle"].includes(e.severity);
		if (U(h) === "attention") return ["attention", "unknown"].includes(e.severity);
		if (U(h) === "recent") return e.severity === "complete" && Date.now() - new Date(e.updatedAt || e.completedAt).valueOf() < 864e5;
		let r = new Date(e.updatedAt || e.launchedAt).valueOf(), i = Number.isFinite(r) && Date.now() - r < 432e5;
		return e.severity !== "complete" && (e.severity !== "unknown" || i);
	}
	async function k(e) {
		L(_, e), L(y, null), L(b, ""), L(S, "");
		let t = new URL(location.href);
		t.searchParams.set("lane", e), history.replaceState(null, "", `${t.pathname}${t.search}`), await yi(), U(v) && !U(v).open && U(v).showModal();
		try {
			let t = await fetch(`/api/lane?id=${encodeURIComponent(e)}`, { cache: "no-store" }), n = await t.json();
			if (!t.ok) throw Error(n.error || `Could not load lane detail: ${t.status}`);
			U(_) === e && L(y, n);
		} catch (t) {
			U(_) === e && L(b, t instanceof Error ? t.message : String(t));
		}
	}
	function A() {
		L(_, ""), L(y, null), L(b, "");
		let e = new URL(location.href);
		e.searchParams.delete("lane"), history.replaceState(null, "", `${e.pathname}${e.search}`);
	}
	async function j(e) {
		if (U(x)) return;
		let t = D(e);
		if (!t.controlled) {
			L(S, `Reconciliation unavailable: ${t.reason}`);
			return;
		}
		L(x, !0), L(S, "Running mechanical reconciliation…");
		try {
			await as({
				projectId: e.project,
				type: "lane.reconcile",
				targetId: e.id,
				scope: "lane-dialog"
			}), L(S, "Reconciliation completed and the observer state was refreshed.");
			let t = await fetch(`/api/lane?id=${encodeURIComponent(e.id)}`, { cache: "no-store" });
			t.ok && L(y, await t.json());
		} catch (e) {
			L(S, e instanceof Error ? e.message : String(e));
		} finally {
			L(x, !1);
		}
	}
	Do(() => {
		let e = (e) => {
			let t = e.detail?.id || "";
			t && k(t);
		};
		return window.addEventListener("lane-watch:open-lane", e), U(_) && k(U(_)), () => window.removeEventListener("lane-watch:open-lane", e);
	}), V(() => n(), () => {
		L(o, n().observer);
	}), V(() => n(), () => {
		L(C, (n().control?.projects || []).find((e) => e.id === n().selectedProject) || null);
	}), V(() => (U(o), n()), () => {
		L(s, U(o)?.lanes.filter((e) => !n().selectedProject || e.project === n().selectedProject) || []);
	}), V(() => U(s), () => {
		L(c, U(s).filter((e) => ["attention", "unknown"].includes(e.severity) && Date.now() - new Date(e.updatedAt || e.launchedAt).valueOf() < 432e5).length);
	}), V(() => (U(s), U(c)), () => {
		L(l, {
			working: U(s).filter((e) => e.severity === "working").length,
			idle: U(s).filter((e) => e.severity === "idle").length,
			attention: U(c),
			complete: U(s).filter((e) => e.severity === "complete").length
		});
	}), V(() => (U(o), n()), () => {
		L(u, [.../* @__PURE__ */ new Set([
			...U(o)?.lanes.map((e) => e.project) || [],
			...n().control?.projectIndex?.map((e) => String(e.id)) || [],
			...n().control?.projects?.map((e) => String(e.id)) || []
		])].sort());
	}), V(() => U(o), () => {
		L(d, (U(o)?.lanes || []).filter(O).sort((e, t) => (w[e.severity] ?? 5) - (w[t.severity] ?? 5) || new Date(t.updatedAt || t.launchedAt).valueOf() - new Date(e.updatedAt || e.launchedAt).valueOf()));
	}), V(() => (U(y), U(_), U(o)), () => {
		L(f, U(y)?.id === U(_) ? U(y) : U(o)?.lanes.find((e) => e.id === U(_)) || null);
	}), V(() => U(o), () => {
		L(p, U(o) ? Date.now() - new Date(U(o).generatedAt).valueOf() >= 35e3 : !1);
	}), V(() => r(), () => {
		L(m, {
			loading: "Checking alerts…",
			unsupported: "Alerts unsupported",
			disabled: "Enable alerts",
			enabled: "Alerts enabled",
			error: "Alert setup failed"
		}[r()]);
	}), Br(), xo();
	var ee = ks(), M = z(ee), N = R(M);
	let te;
	var ne = R(N), re = R(ne, !0);
	P(ne), Ke(), P(N);
	var ie = B(N, 2);
	let ae;
	var oe = R(ie), se = R(oe, !0);
	P(oe), Ke(), P(ie);
	var ce = B(ie, 2);
	let le;
	var ue = R(ce), de = R(ue, !0);
	P(ue), Ke(), P(ce);
	var fe = B(ce, 2);
	let pe;
	var me = R(fe), he = R(me, !0);
	P(me), Ke(), P(fe), P(M);
	var ge = B(M, 2), _e = R(ge);
	X(_e, 4, () => [
		["active", "Live"],
		["running", "Running"],
		["attention", "Attention"],
		["recent", "Recent"],
		["all", "All"]
	], ya, (e, t) => {
		var n = ds();
		let r;
		var i = R(n, !0);
		P(n), H(() => {
			r = Z(n, 1, "filter-tab", null, r, { active: U(h) === t[0] }), J(i, W(() => t[1]));
		}), G("click", n, () => L(h, t[0])), q(e, n);
	}), P(_e);
	var ve = B(_e, 2), ye = R(ve), be = B(R(ye));
	no(be), P(ye);
	var xe = B(ye, 2), Se = R(xe);
	Se.value = Se.__value = "", X(B(Se), 1, () => U(u), ya, (e, t) => {
		var n = fs(), r = R(n, !0);
		P(n);
		var i = {};
		H(() => {
			J(r, U(t)), i !== (i = U(t)) && (n.value = (n.__value = U(t)) ?? "");
		}), q(e, n);
	}), P(xe);
	var Ce;
	Wa(xe);
	var we = B(xe, 2);
	let Te;
	var Ee = R(we, !0);
	P(we), P(ve), P(ge);
	var De = B(ge, 2), Oe = (e) => {
		var t = ps(), n = R(t);
		P(t), H((e) => J(n, `Status snapshot is ${e ?? ""}. The observer may be reconnecting.`), [() => (U(o), W(() => T(U(o)?.generatedAt)))]), q(e, t);
	};
	Y(De, (e) => {
		U(p) && e(Oe);
	});
	var ke = B(De, 2);
	X(ke, 5, () => U(d), (e) => e.id, (e, t) => {
		var n = gs(), r = R(n), i = R(r), a = R(i, !0);
		P(i);
		var o = B(i), s = R(o, !0);
		P(o), P(r);
		var c = B(r, 2), l = R(c, !0);
		P(c);
		var u = B(c, 2), d = R(u, !0);
		P(u);
		var f = B(u, 2), p = (e) => {
			var n = ms(), r = B(R(n)), i = R(r);
			P(r), P(n), H(() => J(i, `${U(t), W(() => U(t).inFlight + U(t).queued) ?? ""} active task${U(t), W(() => U(t).inFlight + U(t).queued === 1 ? "" : "s") ?? ""}`)), q(e, n);
		};
		Y(f, (e) => {
			U(t), W(() => U(t).inFlight + U(t).queued) && e(p);
		});
		var m = B(f, 2), h = R(m), g = R(h, !0);
		P(h);
		var _ = B(h, 2), v = (e) => {
			var n = hs(), r = R(n, !0);
			P(n), H(() => J(r, (U(t), W(() => U(t).topology.profile)))), q(e, n);
		};
		Y(_, (e) => {
			U(t), W(() => U(t).topology?.profile) && e(v);
		});
		var y = B(_, 2), b = R(y, !0);
		P(y);
		var x = B(y), S = R(x, !0);
		P(x);
		var C = B(x, 2), w = R(C, !0);
		P(C);
		var O = B(C, 2), A = (e) => {
			var n = hs(), r = R(n);
			P(n), H((e) => J(r, `${e ?? ""} tok`), [() => (U(t), W(() => E(U(t).tokens)))]), q(e, n);
		};
		Y(O, (e) => {
			U(t), W(() => U(t).tokens != null) && e(A);
		}), P(m);
		var j = B(m, 2), ee = R(j), M = R(ee, !0);
		P(ee);
		var N = B(ee), te = R(N);
		P(N), P(j), P(n), H((e, r, i) => {
			Z(n, 1, `lane-card ${U(t), W(() => U(t).severity) ?? ""}`), Q(n, "aria-label", (U(t), W(() => `Open ${U(t).task} details`))), J(a, (U(t), W(() => U(t).lane))), J(s, (U(t), W(() => U(t).status))), J(l, (U(t), W(() => U(t).task))), J(d, (U(t), W(() => U(t).detail || U(t).output || (U(t).severity === "complete" ? "Coordinator completion recorded." : "No current detail reported.")))), J(g, (U(t), W(() => U(t).model))), J(b, (U(t), W(() => U(t).project))), J(S, (U(t), W(() => U(t).host === "macbook" ? "Mac" : "Windows"))), Z(C, 1, `meta-chip ownership-chip ${e ?? ""}`), J(w, r), J(M, (U(t), W(() => U(t).jobId || "no job"))), J(te, `updated ${i ?? ""}`);
		}, [
			() => (U(t), W(() => D(U(t)).origin)),
			() => (U(t), W(() => D(U(t)).label)),
			() => (U(t), W(() => T(U(t).updatedAt)))
		]), G("click", n, () => k(U(t).id)), q(e, n);
	}), P(ke);
	var Ae = B(ke, 2), je = (e) => {
		q(e, _s());
	};
	Y(Ae, (e) => {
		U(o), U(d), W(() => U(o) && !U(d).length) && e(je);
	});
	var Me = B(Ae, 2), Ne = R(Me), Pe = (e) => {
		var t = Os(), n = R(t), r = R(n), i = R(r), a = R(i);
		P(i);
		var o = B(i), s = R(o, !0);
		P(o), P(r);
		var c = B(r);
		P(n);
		var l = B(n, 2), u = R(l), d = (e) => {
			var t = vs(), n = R(t, !0);
			P(t), H(() => J(n, U(b))), q(e, t);
		};
		Y(u, (e) => {
			U(b) && e(d);
		});
		var p = B(u, 2), m = B(R(p));
		X(m, 5, () => (U(f), W(() => [
			["Status", U(f).status],
			["Model", `${U(f).model} / ${U(f).effort}`],
			["Lifecycle", U(f).lifecycle],
			["Daemon", `${U(f).daemon} / ${U(f).tempo}`],
			["Tokens", E(U(f).tokens)],
			["Landing", U(f).landing],
			["Ownership", D(U(f)).label],
			["Profile", U(f).topology?.profile || "legacy"],
			["Updated", U(f).updatedAt ? new Date(U(f).updatedAt).toLocaleString() : "—"]
		])), ya, (e, t) => {
			var n = ys(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a), P(n), H(() => {
				J(i, (U(t), W(() => U(t)[0]))), J(o, (U(t), W(() => U(t)[1])));
			}), q(e, n);
		}), P(m), P(p);
		var h = B(p, 2), g = B(R(h)), _ = R(g, !0);
		P(g), P(h);
		var y = B(h, 2), C = (e) => {
			var t = xs();
			X(B(R(t)), 1, () => (U(f), W(() => U(f).activities)), (e) => e.id, (e, t) => {
				var n = bs(), r = R(n);
				P(n), H(() => J(r, `${U(t), W(() => U(t).kind === "subagent" ? `${U(t).agentType || "unknown"} / ${U(t).model || "unknown"}` : U(t).kind) ?? ""} · ${U(t), W(() => U(t).label) ?? ""}`)), q(e, n);
			}), P(t), q(e, t);
		};
		Y(y, (e) => {
			U(f), W(() => U(f).activities.length) && e(C);
		});
		var w = B(y, 2), T = (e) => {
			var t = Cs();
			X(B(R(t)), 1, () => (U(f), W(() => U(f).timeline)), ya, (e, t) => {
				var n = Ss(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a), P(n), H((e) => {
					J(i, `${e ?? ""} · ${U(t), W(() => U(t).state) ?? ""}`), J(o, (U(t), W(() => U(t).detail || U(t).text)));
				}, [() => (U(t), W(() => new Date(U(t).at).toLocaleString()))]), q(e, n);
			}), P(t), q(e, t);
		};
		Y(w, (e) => {
			U(f), W(() => U(f).timeline.length) && e(T);
		});
		var O = B(w, 2), k = (e) => {
			var t = ws(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, (U(f), W(() => U(f).output)))), q(e, t);
		};
		Y(O, (e) => {
			U(f), W(() => U(f).output) && e(k);
		});
		var A = B(O, 2), ee = B(R(A)), M = R(ee), N = B(M, 2, !0), te = B(N, 2, !0);
		P(ee), P(A);
		var ne = B(A, 2), re = (e) => {
			var t = Es(), n = B(R(t)), r = R(n, !0);
			P(n);
			var i = B(n), a = (e) => {
				var t = Ts(), n = R(t, !0);
				P(t), H(() => J(n, U(S))), q(e, t);
			};
			Y(i, (e) => {
				U(S) && e(a);
			}), P(t), H(() => {
				n.disabled = U(x), J(r, U(x) ? "Reconciling…" : "Run mechanical reconciliation");
			}), G("click", n, () => j(U(f))), q(e, t);
		}, ie = /* @__PURE__ */ F(() => (U(f), W(() => U(f).lifecycle === "active" && [
			"done",
			"stopped",
			"failed",
			"error",
			"crashed",
			"cancelled",
			"canceled",
			"complete",
			"completed"
		].includes(U(f).daemon) && D(U(f)).controlled))), ae = (e) => {
			var t = Ds(), n = B(R(t)), r = R(n);
			P(n), P(t), H((e) => J(r, `${e ?? ""} Lane Watch will not enqueue reconciliation, synthesis, adoption, or dispatch for this worker.`), [() => (U(f), W(() => D(U(f)).reason))]), q(e, t);
		}, oe = /* @__PURE__ */ F(() => (U(f), W(() => U(f).lifecycle === "active" && !D(U(f)).controlled)));
		Y(ne, (e) => {
			U(ie) ? e(re) : U(oe) && e(ae, 1);
		}), P(l), P(t), H(() => {
			J(a, `${U(f), W(() => U(f).lane) ?? ""} · ${U(f), W(() => U(f).project) ?? ""} · ${U(f), W(() => U(f).host === "macbook" ? "Mac" : "Windows") ?? ""}`), J(s, (U(f), W(() => U(f).task))), J(_, (U(f), W(() => U(f).detail || "No current detail reported."))), J(M, `Job ${U(f), W(() => U(f).jobId || "—") ?? ""}`), J(N, (U(f), W(() => U(f).branch || "No branch recorded"))), J(te, (U(f), W(() => U(f).worktree || "No worktree recorded")));
		}), G("click", c, () => U(v).close()), q(e, t);
	};
	Y(Ne, (e) => {
		U(f) && e(Pe);
	}), P(Me), vo(Me, (e) => L(v, e), () => U(v)), H((e) => {
		te = Z(N, 1, "summary-card working", null, te, { selected: U(h) === "running" }), J(re, (U(l), W(() => U(l).working))), ae = Z(ie, 1, "summary-card idle", null, ae, { selected: U(h) === "running" }), J(se, (U(l), W(() => U(l).idle))), le = Z(ce, 1, "summary-card attention", null, le, { selected: U(h) === "attention" }), J(de, (U(l), W(() => U(l).attention))), pe = Z(fe, 1, "summary-card complete", null, pe, { selected: U(h) === "recent" }), J(he, (U(l), W(() => U(l).complete))), Ce !== (Ce = (n(), W(() => n().selectedProject))) && (xe.value = (xe.__value = (n(), W(() => n().selectedProject))) ?? "", Ua(xe, (n(), W(() => n().selectedProject)))), Te = Z(we, 1, "outline-button", null, Te, { enabled: r() === "enabled" }), we.disabled = e, J(Ee, U(m));
	}, [() => (r(), W(() => ["loading", "unsupported"].includes(r())))]), G("click", N, () => L(h, "running")), G("click", ie, () => L(h, "running")), G("click", ce, () => L(h, "attention")), G("click", fe, () => L(h, "recent")), uo(be, () => U(g), (e) => L(g, e)), G("change", xe, (e) => Io(e.currentTarget.value)), G("click", we, function(...e) {
		ls?.apply(this, e);
	}), Qi("close", Me, A), q(e, ee), xt(), a();
}
$i(["click", "change"]);
//#endregion
//#region src/ui/document-blocks.ts
var js = /^(#{1,6})\s+(.+)$/, Ms = /^\s{0,3}(?:([-+*])|\d+[.)])\s+(.+)$/, Ns = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/, Ps = (e) => e.trim().replace(/^\||\|$/g, "").split("|").map((e) => e.trim());
function Fs(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n"), n = [], r = 0;
	for (; r < t.length;) {
		let e = t[r];
		if (!e.trim()) {
			r++;
			continue;
		}
		let i = e.match(js);
		if (i) {
			n.push({
				kind: "heading",
				level: i[1].length,
				text: i[2]
			}), r++;
			continue;
		}
		let a = e.match(/^\s{0,3}(`{3,}|~{3,})/);
		if (a) {
			let e = [];
			for (r++; r < t.length && !t[r].trim().startsWith(a[1]);) e.push(t[r++]);
			r < t.length && r++, n.push({
				kind: "code",
				text: e.join("\n")
			});
			continue;
		}
		if (/^ {4}|^\t/.test(e)) {
			let e = [];
			for (; r < t.length && (/^( {4}|\t)/.test(t[r]) || !t[r].trim());) e.push(t[r++].replace(/^( {4}|\t)/, ""));
			n.push({
				kind: "code",
				text: e.join("\n").trimEnd()
			});
			continue;
		}
		if (r + 1 < t.length && e.includes("|") && Ns.test(t[r + 1])) {
			let i = [Ps(e)];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim();) i.push(Ps(t[r++]));
			n.push({
				kind: "table",
				rows: i
			});
			continue;
		}
		let o = e.match(Ms);
		if (o) {
			let e = !o[1], i = [];
			for (; r < t.length;) {
				let n = t[r].match(Ms);
				if (!n || !n[1] !== e) break;
				let a = n[2];
				for (r++; r < t.length && /^\s+\S/.test(t[r]) && !Ms.test(t[r]);) a += " " + t[r++].trim();
				i.push(a);
			}
			n.push({
				kind: "list",
				ordered: e,
				items: i
			});
			continue;
		}
		let s = [e];
		for (r++; r < t.length && t[r].trim() && !js.test(t[r]) && !Ms.test(t[r]) && !/^\s*(`{3,}|~{3,})/.test(t[r]);) s.push(t[r++]);
		n.push({
			kind: "paragraph",
			text: s.join(" ")
		});
	}
	return n;
}
function Is(e) {
	let t = [], n = /`([^`\n]+)`|\*\*([^*]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g, r = 0;
	for (let i of e.matchAll(n)) i.index > r && t.push({
		kind: "text",
		text: e.slice(r, i.index)
	}), t.push(i[1] ? {
		kind: "code",
		text: i[1]
	} : i[2] ? {
		kind: "strong",
		text: i[2]
	} : {
		kind: "reference",
		text: i[3],
		target: i[4]
	}), r = i.index + i[0].length;
	return r < e.length && t.push({
		kind: "text",
		text: e.slice(r)
	}), t;
}
//#endregion
//#region src/ui/DocumentInline.svelte
var Ls = /* @__PURE__ */ K("<strong> </strong>"), Rs = /* @__PURE__ */ K("<code class=\"svelte-8vshfm\"> </code>"), zs = /* @__PURE__ */ K(" <small class=\"source-reference svelte-8vshfm\"> </small>", 1);
function Bs(e, t) {
	bt(t, !1);
	let n = $(t, "text", 8);
	xo();
	var r = ua();
	X(z(r), 1, () => (Si(Is), Si(n()), W(() => Is(n()))), ya, (e, t) => {
		var n = ua(), r = z(n), i = (e) => {
			var n = Ls(), r = R(n, !0);
			P(n), H(() => J(r, (U(t), W(() => U(t).text)))), q(e, n);
		}, a = (e) => {
			var n = Rs(), r = R(n, !0);
			P(n), H(() => J(r, (U(t), W(() => U(t).text)))), q(e, n);
		}, o = (e) => {
			var n = zs(), r = z(n), i = B(r), a = R(i);
			P(i), H(() => {
				J(r, `${U(t), W(() => U(t).text) ?? ""} `), J(a, `(${U(t), W(() => U(t).target) ?? ""})`);
			}), q(e, n);
		}, s = (e) => {
			var n = la();
			H(() => J(n, (U(t), W(() => U(t).text)))), q(e, n);
		};
		Y(r, (e) => {
			U(t), W(() => U(t).kind === "strong") ? e(i) : (U(t), W(() => U(t).kind === "code") ? e(a, 1) : (U(t), W(() => U(t).kind === "reference") ? e(o, 2) : e(s, -1)));
		}), q(e, n);
	}), q(e, r), xt();
}
//#endregion
//#region src/ui/ResultDocument.svelte
var Vs = /* @__PURE__ */ K("<pre class=\"svelte-ptcamy\"> </pre>"), Hs = /* @__PURE__ */ K("<p><!></p>"), Us = /* @__PURE__ */ K("<li><!></li>"), Ws = /* @__PURE__ */ K("<th scope=\"col\" class=\"svelte-ptcamy\"><!></th>"), Gs = /* @__PURE__ */ K("<td class=\"svelte-ptcamy\"><!></td>"), Ks = /* @__PURE__ */ K("<tr></tr>"), qs = /* @__PURE__ */ K("<div class=\"table-scroll svelte-ptcamy\"><table class=\"svelte-ptcamy\"><thead><tr></tr></thead><tbody></tbody></table></div>"), Js = /* @__PURE__ */ K("<article class=\"result-document svelte-ptcamy\"></article>");
function Ys(e, t) {
	bt(t, !1);
	let n = /* @__PURE__ */ I(), r = $(t, "content", 8);
	V(() => Si(r()), () => {
		L(n, Fs(r()));
	}), Br(), xo();
	var i = Js();
	X(i, 5, () => U(n), ya, (e, t) => {
		var n = ua(), r = z(n), i = (e) => {
			var n = ua();
			Aa(z(n), () => "h" + Math.min(6, U(t).level + 2), !1, (e, n) => {
				Z(e, 0, "svelte-ptcamy"), Bs(n, { get text() {
					return U(t), W(() => U(t).text);
				} });
			}), q(e, n);
		}, a = (e) => {
			var n = Vs(), r = R(n, !0);
			P(n), H(() => J(r, (U(t), W(() => U(t).text)))), q(e, n);
		}, o = (e) => {
			var n = Hs();
			Bs(R(n), { get text() {
				return U(t), W(() => U(t).text);
			} }), P(n), q(e, n);
		}, s = (e) => {
			var n = ua();
			Aa(z(n), () => U(t).ordered ? "ol" : "ul", !1, (e, n) => {
				Z(e, 0, "svelte-ptcamy");
				var r = ua();
				X(z(r), 1, () => (U(t), W(() => U(t).items)), ya, (e, t) => {
					var n = Us();
					Bs(R(n), { get text() {
						return U(t);
					} }), P(n), q(e, n);
				}), q(n, r);
			}), q(e, n);
		}, c = (e) => {
			var n = qs(), r = R(n), i = R(r), a = R(i);
			X(a, 5, () => (U(t), W(() => U(t).rows[0])), ya, (e, t) => {
				var n = Ws();
				Bs(R(n), { get text() {
					return U(t);
				} }), P(n), q(e, n);
			}), P(a), P(i);
			var o = B(i);
			X(o, 5, () => (U(t), W(() => U(t).rows.slice(1))), ya, (e, t) => {
				var n = Ks();
				X(n, 5, () => U(t), ya, (e, t) => {
					var n = Gs();
					Bs(R(n), { get text() {
						return U(t);
					} }), P(n), q(e, n);
				}), P(n), q(e, n);
			}), P(o), P(r), P(n), q(e, n);
		};
		Y(r, (e) => {
			U(t), W(() => U(t).kind === "heading") ? e(i) : (U(t), W(() => U(t).kind === "code") ? e(a, 1) : (U(t), W(() => U(t).kind === "paragraph") ? e(o, 2) : (U(t), W(() => U(t).kind === "list") ? e(s, 3) : (U(t), W(() => U(t).kind === "table") && e(c, 4)))));
		}), q(e, n);
	}), P(i), q(e, i), xt();
}
//#endregion
//#region src/ui/CampaignWorkQueue.svelte
Go();
var Xs = /* @__PURE__ */ K("<small class=\"svelte-8k17j4\"> </small>"), Zs = /* @__PURE__ */ K("<button class=\"svelte-8k17j4\"> </button>"), Qs = /* @__PURE__ */ K("<div class=\"queue-results svelte-8k17j4\"></div>"), $s = /* @__PURE__ */ K("<li><span class=\"queue-status svelte-8k17j4\"> </span><div><strong> </strong><p class=\"svelte-8k17j4\"> </p><!><!></div><small class=\"svelte-8k17j4\"> </small></li>"), ec = /* @__PURE__ */ K("<p class=\"queue-context svelte-8k17j4\"><!> <!>Queue status is recorded by the coordinator; launch and evidence decisions use the campaign controls above.</p> <ol class=\"svelte-8k17j4\"></ol> <small class=\"queue-updated svelte-8k17j4\"> </small>", 1), tc = /* @__PURE__ */ K("<p class=\"queue-preview svelte-8k17j4\"> </p>"), nc = /* @__PURE__ */ K("<details id=\"campaign-work-queue\" class=\"campaign-work-queue svelte-8k17j4\"><summary class=\"svelte-8k17j4\"><span class=\"svelte-8k17j4\"><strong class=\"svelte-8k17j4\"> </strong><small class=\"svelte-8k17j4\"> </small></span><span class=\"svelte-8k17j4\"> </span></summary> <!></details> <!>", 1), rc = /* @__PURE__ */ K("<p role=\"status\">Reading the recorded result…</p>"), ic = /* @__PURE__ */ K("<p role=\"alert\"> </p>"), ac = /* @__PURE__ */ K("<pre class=\"result-source svelte-8k17j4\"> </pre>"), oc = /* @__PURE__ */ K("<details class=\"result-provenance svelte-8k17j4\"><summary class=\"svelte-8k17j4\">Source details · file hash verified</summary><p> </p><p> <br/> </p><p>This check verifies the recorded file. Research scope and acceptance are described in the document.</p><button class=\"svelte-8k17j4\"> </button></details> <!>", 1), sc = /* @__PURE__ */ K("<!> <dialog class=\"queue-result-dialog svelte-8k17j4\" aria-labelledby=\"queue-result-title\"><header class=\"svelte-8k17j4\"><div><small class=\"svelte-8k17j4\">SAVED CAMPAIGN RESULT</small><h2 id=\"queue-result-title\" class=\"svelte-8k17j4\"> </h2></div><button aria-label=\"Close result\" class=\"svelte-8k17j4\">Close</button></header> <div class=\"result-body svelte-8k17j4\"><!></div></dialog>", 1);
function cc(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(!1), f = /* @__PURE__ */ I(), p = /* @__PURE__ */ I(null), m = /* @__PURE__ */ I(""), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I(!1), _ = /* @__PURE__ */ I(!1), v = /* @__PURE__ */ I(""), y = null;
	function b() {
		y?.abort(), y = null, L(p, null), L(v, "");
	}
	async function x(e, t) {
		y?.abort();
		let n = new AbortController();
		y = n, L(p, null), L(h, ""), L(m, t.title), L(g, !0), L(_, !1), L(v, U(a)?.id || ""), U(f).showModal();
		try {
			let r = new URLSearchParams({
				project: U(v),
				item: e,
				result: t.id
			}), i = await fetch("/api/queue-result?" + r, {
				signal: n.signal,
				cache: "no-store"
			}), a = await i.json();
			if (!i.ok) throw Error(a.error || "Could not read result");
			y === n && L(p, a);
		} catch (e) {
			y === n && !n.signal.aborted && L(h, e instanceof Error ? e.message : "Could not read result");
		} finally {
			y === n && L(g, !1);
		}
	}
	Oo(() => y?.abort());
	let S = {
		active: 0,
		ready: 1,
		held: 2,
		done: 3
	};
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject));
	}), V(() => U(a), () => {
		L(o, U(a)?.workQueue);
	}), V(() => U(o), () => {
		L(s, U(o)?.items?.filter((e) => e.status !== "done") || []);
	}), V(() => U(s), () => {
		L(c, U(s).filter((e) => e.status === "active" || e.status === "ready").slice(0, 3));
	}), V(() => U(o), () => {
		L(l, U(o)?.heartbeat?.status === "paused" ? "Overnight check-ins paused" : U(o)?.heartbeat?.status === "active" ? U(o).cadenceMinutes + " min check-ins scheduled" : U(o)?.cadenceMinutes + " min heartbeat plan");
	}), V(() => U(o), () => {
		L(u, [...U(o)?.items || []].sort((e, t) => S[e.status] - S[t.status]));
	}), V(() => (U(v), U(a), U(f)), () => {
		U(v) && U(a)?.id !== U(v) && U(f)?.close();
	}), Br(), xo();
	var C = sc(), w = z(C), T = (e) => {
		var t = nc(), n = z(t), r = R(n), i = R(r), a = R(i), f = R(a, !0);
		P(a);
		var p = B(a), m = R(p, !0);
		P(p), P(i);
		var h = B(i), g = R(h, !0);
		P(h), P(r);
		var _ = B(r, 2), v = (e) => {
			var t = ec(), n = z(t), r = R(n), i = (e) => {
				q(e, la("Check-ins are paused; the queue remains available."));
			}, a = (e) => {
				var t = la();
				H((e) => J(t, `Planned coordination until ${e ?? ""}.`), [() => (U(o), W(() => new Date(U(o).cutoffAt).toLocaleString()))]), q(e, t);
			};
			Y(r, (e) => {
				U(o), W(() => U(o).heartbeat?.status === "paused") ? e(i) : e(a, -1);
			});
			var s = B(r, 2), c = (e) => {
				var t = la();
				H((e) => J(t, `Schedule last checked ${e ?? ""}.`), [() => (U(o), W(() => new Date(U(o).heartbeat.checkedAt).toLocaleString()))]), q(e, t);
			};
			Y(s, (e) => {
				U(o), W(() => U(o).heartbeat) && e(c);
			}), Ke(), P(n);
			var l = B(n, 2);
			X(l, 5, () => U(u), (e) => e.id, (e, t) => {
				var n = $s();
				let r;
				var i = R(n), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o), c = R(s, !0);
				P(s);
				var l = B(s), u = R(l, !0);
				P(l);
				var d = B(l), f = (e) => {
					var n = Xs(), r = R(n);
					P(n), H((e) => J(r, `Depends on ${e ?? ""}`), [() => (U(t), W(() => U(t).dependsOn.join(", ")))]), q(e, n);
				};
				Y(d, (e) => {
					U(t), W(() => U(t).dependsOn.length) && e(f);
				});
				var p = B(d), m = (e) => {
					var n = Qs();
					X(n, 5, () => (U(t), W(() => U(t).results)), ya, (e, n) => {
						var r = Zs(), i = R(r);
						P(r), H(() => J(i, `Read ${U(n), W(() => U(n).title) ?? ""}`)), G("click", r, () => x(U(t).id, U(n))), q(e, r);
					}), P(n), q(e, n);
				};
				Y(p, (e) => {
					U(t), W(() => U(t).results?.length) && e(m);
				}), P(o);
				var h = B(o), g = R(h, !0);
				P(h), P(n), H(() => {
					r = Z(n, 1, "svelte-8k17j4", null, r, { done: U(t).status === "done" }), J(a, (U(t), W(() => U(t).status))), J(c, (U(t), W(() => U(t).title))), J(u, (U(t), W(() => U(t).detail))), J(g, (U(t), W(() => U(t).kind)));
				}), q(e, n);
			}), P(l);
			var d = B(l, 2), f = R(d);
			P(d), H((e) => J(f, `Updated ${e ?? ""} · planning context`), [() => (U(o), W(() => new Date(U(o).updatedAt).toLocaleString()))]), q(e, t);
		};
		Y(_, (e) => {
			U(o), W(() => !U(o).error) && e(v);
		}), P(n);
		var y = B(n, 2), b = (e) => {
			var t = tc(), n = R(t);
			P(t), H((e) => J(n, `Up next: ${e ?? ""}`), [() => (U(c), W(() => U(c).map((e) => e.title).join(" · ")))]), q(e, t);
		};
		Y(y, (e) => {
			U(d), U(c), W(() => !U(d) && U(c).length) && e(b);
		}), H(() => {
			J(f, (U(o), W(() => U(o).title))), J(m, (U(o), U(s), U(l), W(() => U(o).error || U(s).length + " items remaining · " + U(l)))), J(g, U(d) ? "Close queue" : "View queue");
		}), Qi("toggle", n, (e) => L(d, e.currentTarget.open)), q(e, t);
	};
	Y(w, (e) => {
		U(o) && e(T);
	});
	var E = B(w, 2), D = R(E), O = R(D), k = B(R(O)), A = R(k, !0);
	P(k), P(O);
	var j = B(O);
	P(D);
	var ee = B(D, 2), M = R(ee), N = (e) => {
		q(e, rc());
	}, te = (e) => {
		var t = ic(), n = R(t, !0);
		P(t), H(() => J(n, U(h))), q(e, t);
	}, ne = (e) => {
		var t = oc(), n = z(t), r = B(R(n)), i = R(r, !0);
		P(r);
		var a = B(r), o = R(a), s = B(o, 2);
		P(a);
		var c = B(a, 2), l = R(c, !0);
		P(c), P(n);
		var u = B(n, 2), d = (e) => {
			var t = ac(), n = R(t, !0);
			P(t), H(() => J(n, (U(p), W(() => U(p).content)))), q(e, t);
		}, f = (e) => {
			Ys(e, { get content() {
				return U(p), W(() => U(p).content);
			} });
		};
		Y(u, (e) => {
			U(_) ? e(d) : e(f, -1);
		}), H(() => {
			J(i, (U(p), W(() => U(p).path))), J(o, `Commit ${U(p), W(() => U(p).revision) ?? ""}`), J(s, `SHA-256 ${U(p), W(() => U(p).sha256) ?? ""}`), J(l, U(_) ? "Return to reading view" : "View Markdown source");
		}), G("click", c, () => L(_, !U(_))), q(e, t);
	};
	Y(M, (e) => {
		U(g) ? e(N) : U(h) ? e(te, 1) : U(p) && e(ne, 2);
	}), P(ee), P(E), vo(E, (e) => L(f, e), () => U(f)), H(() => {
		J(A, U(m)), Q(ee, "aria-busy", U(g));
	}), Qi("close", E, b), G("click", j, () => U(f).close()), q(e, C), xt(), i();
}
//#endregion
//#region src/ui/ResearchLaunchAttempts.svelte
$i(["click"]), Go();
var lc = /* @__PURE__ */ K("<p class=\"attempt-error svelte-1kywy6a\"> </p>"), uc = /* @__PURE__ */ K("<p class=\"svelte-1kywy6a\"><strong> </strong><br/> <br/> </p>"), dc = /* @__PURE__ */ K("<details class=\"svelte-1kywy6a\"><summary class=\"svelte-1kywy6a\"><strong> </strong><span class=\"svelte-1kywy6a\"> </span></summary> <!> <p class=\"svelte-1kywy6a\"> <br/> </p> <p class=\"svelte-1kywy6a\"> <br/> </p> <!> <small class=\"svelte-1kywy6a\"> </small></details>"), fc = /* @__PURE__ */ K("<section id=\"research-launch-attempts\" class=\"launch-attempts svelte-1kywy6a\"><h3 class=\"svelte-1kywy6a\">Recorded launch attempts</h3> <!></section>");
function pc(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = {
		prepared: "Prepared",
		entered: "Waiting for launch receipt",
		returned: "Launch receipt recorded",
		uncertain: "Outcome unverified",
		aborted: "Adapter was not entered"
	};
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject));
	}), V(() => U(a), () => {
		L(o, (U(a)?.researchRuns || []).filter((e) => e.launchAttempt));
	}), Br(), xo();
	var c = ua(), l = z(c), u = (e) => {
		var t = fc();
		X(B(R(t), 2), 1, () => U(o), (e) => e.id, (e, t) => {
			let n = /* @__PURE__ */ Cn(() => (U(t), W(() => U(t).launchAttempt)));
			var r = dc(), i = R(r), a = R(i), o = R(a, !0);
			P(a);
			var c = B(a), l = R(c, !0);
			P(c), P(i);
			var u = B(i, 2), d = (e) => {
				var t = lc(), r = R(t, !0);
				P(t), H(() => J(r, (Si(U(n)), W(() => U(n).error)))), q(e, t);
			};
			Y(u, (e) => {
				Si(U(n)), W(() => U(n).error) && e(d);
			});
			var f = B(u, 2), p = R(f), m = B(p, 2);
			P(f);
			var h = B(f, 2), g = R(h), _ = B(g, 2);
			P(h);
			var v = B(h, 2), y = (e) => {
				var t = uc(), r = R(t), i = R(r, !0);
				P(r);
				var a = B(r, 2), o = B(a, 2, !0);
				P(t), H(() => {
					J(i, (Si(U(n)), W(() => U(n).status === "uncertain" ? "Later receipt awaiting reconciliation" : "Transport receipt"))), J(a, `Job ${Si(U(n)), W(() => U(n).receipt.jobId) ?? ""} · lane ${Si(U(n)), W(() => U(n).receipt.laneId) ?? ""}`), J(o, (Si(U(n)), W(() => U(n).receipt.worktree)));
				}), q(e, t);
			};
			Y(v, (e) => {
				Si(U(n)), W(() => U(n).receipt?.jobId) && e(y);
			});
			var b = B(v, 2), x = R(b);
			P(b), P(r), H((e, i, a) => {
				r.open = (Si(U(n)), W(() => U(n).status === "uncertain")), J(o, (U(t), W(() => U(t).taskId))), J(l, (Si(U(n)), W(() => s[U(n).status] || U(n).status))), J(p, `Attempt ${Si(U(n)), W(() => U(n).id) ?? ""}`), J(m, `Run ${U(t), W(() => U(t).id) ?? ""}`), J(g, `Recorded ${e ?? ""} · frozen deadline ${i ?? ""}`), J(_, `${a ?? ""} reserved token units. Runtime enforcement remains unverified.`), J(x, `Frozen contract SHA-256 ${Si(U(n)), W(() => U(n).specDigest) ?? ""}`);
			}, [
				() => (Si(U(n)), W(() => new Date(U(n).createdAt).toLocaleString())),
				() => (Si(U(n)), W(() => new Date(U(n).deadlineAt).toLocaleString())),
				() => (Si(U(n)), W(() => Number(U(n).tokenBudget).toLocaleString()))
			]), q(e, r);
		}), P(t), q(e, t);
	};
	Y(l, (e) => {
		U(o), W(() => U(o).length) && e(u);
	}), q(e, c), xt(), i();
}
//#endregion
//#region src/ui/campaign-guidance.ts
var mc = (e) => /[.!?]$/.test(e.trim()) ? e.trim() : e.trim() + ".";
function hc(e) {
	return [...e?.researchRuns || []].sort((e, t) => String(t.createdAt || "").localeCompare(String(e.createdAt || "")))[0];
}
function gc(e) {
	return e?.status === "awaiting_evidence" || e?.status === "failed" && /Evidence receipt is not ready/i.test(e.error || "");
}
function _c(e) {
	if (e?.phase !== "BLOCKED" || e.researchPlan?.status !== "block" || (e.researchRuns || []).some((e) => [
		"launching",
		"running",
		"blocked",
		"awaiting_evidence",
		"evidence_ready"
	].includes(e.status))) return null;
	let t = e.workQueue?.error ? null : e.workQueue, n = t?.items?.find((e) => e.status === "active"), r = e.researchPlan.response?.lanes || [];
	return {
		status: "RESEARCH PAUSED",
		title: "The research plan is parked",
		detail: (r.length > 0 && r.every((e) => e.action === "DROP") ? `The review recommends dropping all ${r.length} proposed lanes; the plan is held.` : "The checked plan is held until its prerequisites or direction change.") + (n ? ` Recorded work in progress: ${n.title}.` : " Review the plan and its reasons before proposing another lane."),
		actions: [...t ? [{
			key: "reveal",
			label: "View current work",
			target: "#campaign-work-queue",
			style: "primary-button"
		}] : [], {
			key: "inspect",
			label: "Inspect plan and reasons",
			style: t ? "outline-button" : "primary-button"
		}]
	};
}
function vc(e) {
	let t = (e.researchRuns || []).find((e) => e.launchAttempt?.status === "uncertain");
	if (t) return {
		status: "LAUNCH NEEDS VERIFICATION",
		title: "Verify the last launch before retrying",
		detail: "The launcher did not return a confirmed outcome. Work may have started. Its frozen attempt and any later receipt are retained; check the exact job before retrying. " + String(t.error || ""),
		actions: [{
			key: "reveal",
			label: "Inspect launch and evidence",
			target: "#research-launch-attempts",
			style: "primary-button"
		}]
	};
	let n = hc(e), r = {
		key: "reveal",
		label: "View result and evidence",
		target: "#evidence-workspace",
		style: "outline-button"
	};
	if (gc(n)) return {
		status: "RESULT NEEDS CHECKING",
		title: "Recover the finished result",
		detail: "The worker has stopped. Its evidence needs a custody check before review; restarting the research will not resolve this. " + String(n.error || "The receipt is not yet validated."),
		actions: [{
			key: "refresh",
			label: "Recheck existing receipt",
			style: "primary-button"
		}, r]
	};
	if (n?.status === "evidence_ready" && ["RESEARCH_READY", "RESEARCH_INTAKE"].includes(e.phase)) return {
		status: "RESULT READY",
		title: "Review the finished research",
		detail: String(n.evidenceSummary?.verdict || n.evidence?.terminal_state || n.evidence?.verdict || n.evidenceSummary?.status || n.evidence?.status || "Receipt validated") + ". " + mc(String(e.researchPlan?.response?.lanes?.find((e) => e.taskId === n.taskId)?.question || n.taskId)) + " Continue to a synthesis of this result; no new research is launched.",
		actions: [{
			key: "research.evidence.return",
			targetId: n.id,
			label: "Continue to result review",
			style: "primary-button"
		}, r]
	};
	if (e.phase !== "RESEARCH_READY" || e.custody?.counts?.blocking) return null;
	let i = e.researchSchedule;
	return i?.status === "proposed" ? {
		status: "SCHEDULE READY",
		title: "Review the launch plan",
		detail: i.proposal?.summary || "Confirm this exact set of tasks and its resource reservation.",
		actions: [{
			key: "research.schedule.confirm",
			targetId: i.id,
			args: { scheduleDigest: i.digest },
			label: "Confirm schedule",
			style: "primary-button"
		}]
	} : i?.status === "confirmed" ? {
		status: "READY TO LAUNCH",
		title: "Start the confirmed research",
		detail: "Launch only the tasks in this confirmed schedule.",
		actions: [{
			key: "research.schedule.dispatch",
			targetId: i.id,
			args: { scheduleDigest: i.digest },
			label: "Launch research",
			style: "primary-button"
		}]
	} : e.loopStart?.canStart === !1 && !["SCHEDULE_CONFIRMATION", ""].includes(e.loopStart.code || "") ? {
		status: "NEW RESEARCH PAUSED",
		title: "Resolve the launch limit",
		detail: e.loopStart.blocker || "The current launch checks have not cleared.",
		actions: [{
			key: "reveal",
			label: "Review resources and strategy",
			target: "#strategy-workspaces",
			style: "primary-button"
		}]
	} : {
		status: "PLAN APPROVED",
		title: "Prepare the next launch",
		detail: "Freeze the approved tasks and their resource reservation for review.",
		actions: [{
			key: "research.schedule.prepare",
			label: "Prepare schedule",
			style: "primary-button"
		}]
	};
}
//#endregion
//#region src/custody.ts
function yc(e) {
	return e === "medium" ? 1e5 : 5e4;
}
function bc(e) {
	let t = e?.receipt || {}, n = [
		t.summary,
		t.stopReason,
		...Array.isArray(t.checks) ? t.checks.map((e) => e?.detail) : []
	].filter(Boolean).join(" ").match(/(?:fixed\s+)?([\d,]+)-token(?:\s+lease)?(?:\s+(?:budget|ceiling))?/i);
	return n ? Number(n[1].replaceAll(",", "")) : 0;
}
function xc(e) {
	if (!["blocked", "failed"].includes(String(e?.status || ""))) return !1;
	let t = Array.isArray(e?.receipt?.effects?.changedPaths) ? e.receipt.effects.changedPaths : [], n = bc(e), r = Number(e?.tokenCap || yc(e?.effortClass === "medium" ? "medium" : "small"));
	return t.length === 0 && n > 0 && r > n;
}
//#endregion
//#region src/ui/custody-reshape.ts
function Sc(e, t, n, r, i, a, o, s = []) {
	return {
		task: t,
		reason: n,
		urgency: "NOW",
		blocksResearch: !0,
		strategicTrack: e.strategicTrack,
		capability: e.capability,
		repairGeneration: e.repairGeneration,
		effortClass: r,
		acceptance: {
			acceptanceCriteria: i,
			allowedPaths: [a],
			receiptType: e.acceptance?.receiptType || "campaign-custody-protocol-receipt/v1",
			stopCondition: o,
			dependsOnTasks: s
		}
	};
}
function Cc(e, t = "") {
	if (xc(e)) return !1;
	let n = `${e?.receipt?.summary || ""} ${e?.receipt?.stopReason || ""} ${t}`, r = Number(e?.receipt?.usage?.tokens || 0);
	return (e?.capability !== "portability" && r > 5e4 || /automatic retry limit|exceeded (?:its )?(?:fixed )?[\d,]*-?token|crossed its token ceiling|contract too large|reshape or resize/i.test(n)) && (!t || !/automatic retry limit/i.test(t) || !e?.task || t.includes(e.task));
}
function wc(e) {
	return /asymmetric-laboratory intake replay/i.test(e?.task || "") ? [Sc(e, "Verify frozen asymmetric manifest, provenance, and control count", "Separate source binding and the eleven-type inventory audit from computational replay so a mismatch can stop cheaply.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Verify the 8-trivial/6-C2 inventory and correct the control count to six.",
		"Limit every accepted statement to the frozen named pools; make no repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-check-v1/**", "Stop at the first source-binding, provenance, orientation, or count mismatch. Do not replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens."), Sc(e, "Replay frozen asymmetric deduplication and reconcile resource scope", "Run only the exact role-preserving replay after the manifest check, with runtime accounting isolated from source-provenance inspection.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Reconcile the replay token, process wall-time, observer wall-time, and peak-memory scopes.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-resource-scope-v1/**", "Stop on the first changed candidate count, predecessor-receipt mismatch, or resource-ceiling breach. Do not run SAT, generate candidates, measure slack/liftability, or open another repair generation.")] : /verify frozen asymmetric manifest, provenance, and control count/i.test(e?.task || "") ? [Sc(e, "Bind the frozen asymmetric manifest and provenance", "Keep immutable source binding separate from the eleven-type inventory check so either boundary can settle inside one small lease.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Limit every accepted statement to the frozen named pools; make no inventory or repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-binding-v1/**", "Stop at the first source-binding, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens."), Sc(e, "Verify the frozen asymmetric type inventory and control count", "Consume the source-bound manifest receipt and check only the finite inventory arithmetic and six-control correction.", "small", [
		"Consume the exact predecessor manifest-and-provenance receipt without reopening its source search.",
		"Verify the 8-trivial/6-C2 inventory over the frozen named pools.",
		"Correct the control count to six and emit graph-effect NONE.",
		"Make no repository-wide ceiling claim and change no producer artifact."
	], "results/inbox/asym-lab-inventory-control-count-v1/**", "Stop if the predecessor receipt is absent or the frozen inventory differs. Do not replay generators, run SAT, inspect unrelated candidates, or exceed 50,000 tokens.", ["Bind the frozen asymmetric manifest and provenance"])] : /bind the frozen asymmetric manifest and provenance/i.test(e?.task || "") ? [Sc(e, "Bind the immutable asymmetric successor commit and named-pool manifest", "Freeze only the exact source identity and manifest boundary before asking a separate steward to inspect mathematical provenance.", "small", [
		"Bind one immutable successor commit and the exact frozen named-pool manifest.",
		"Record stable identifiers and content digests for every referenced manifest source.",
		"Make no provenance, orientation, inventory, or repository-wide mathematical claim."
	], "results/inbox/asym-lab-immutable-manifest-binding-v1/**", "Stop at the first missing or ambiguous source binding. Do not inspect mathematical provenance, count types, replay generators, run SAT, or exceed 50,000 tokens."), Sc(e, "Verify frozen asymmetric provenance and CLEAN_MINIMAL orientations", "Consume the exact manifest-binding receipt and verify only the finite provenance and orientation references for the eleven named types.", "small", [
		"Consume the exact predecessor commit-and-manifest binding without reopening source discovery.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying named types.",
		"Limit every accepted statement to the frozen named pools and emit graph-effect NONE.",
		"Make no inventory count, replay, or repository-wide ceiling claim."
	], "results/inbox/asym-lab-provenance-orientation-v1/**", "Stop at the first predecessor, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens.")] : /replay frozen asymmetric deduplication and reconcile resource scope/i.test(e?.task || "") ? [Sc(e, "Replay the frozen role-preserving asymmetric deduplication core", "Run only the exact finite replay; leave accounting and scope policy to a separate receipt-bound check.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Record deterministic inputs, outputs, and candidate counts sufficient for a later accounting check.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-core-v1/**", "Stop on the first changed candidate count or predecessor-receipt mismatch. Do not reconcile resource policy, run SAT, generate candidates, measure slack/liftability, or open another repair generation.", ["Bind the frozen asymmetric manifest and provenance", "Verify the frozen asymmetric type inventory and control count"]), Sc(e, "Reconcile frozen asymmetric replay resource measurements", "Check only the completed replay's token and timing scopes instead of repeating its mathematics.", "small", [
		"Consume the exact replay-core receipt without rerunning its mathematical computation.",
		"Reconcile token usage, process wall-time, observer wall-time, and peak-memory scopes.",
		"Preserve unknown measurements as UNKNOWN rather than estimating or imputing zero.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-replay-resource-measurements-v1/**", "Stop if the replay-core receipt is absent or ambiguous. Do not rerun the replay, run SAT, generate candidates, or exceed 50,000 tokens.")] : /epoch resource provenance/i.test(e?.task || "") ? [Sc(e, "Bind missing epoch token measurements to their source runs", "Recover or explicitly classify the six missing token measurements without mixing that source search with policy reconciliation.", "small", [
		"Each of the six run IDs receives a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Unknown values are never imputed as zero.",
		"Receipt-bound, ledger-only, and missing measurements remain distinguished."
	], "results/inbox/strategy-cost-source-binding-v1/**", "One source-binding pass only. Record UNKNOWN with provenance when a measurement cannot be recovered; do not estimate or rerun research."), Sc(e, "Reconcile epoch reservation and wall-time scopes", "Apply the source-bound measurement inventory to the 148,741-versus-80,000 reservation and process-versus-observer timing discrepancy.", "small", [
		"Consume the predecessor source-binding receipt without reopening its source search.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation.",
		"Define and preserve separate process-time and observer end-to-end wall-time scopes.",
		"Change no mathematical claim, candidate, manifest semantics, or campaign phase."
	], "results/inbox/strategy-cost-scope-reconciliation-v1/**", "Stop if the predecessor receipt is absent or ambiguous. Do not estimate missing usage, rerun research, or create another repair generation.")] : /bind missing epoch token measurements to their source runs/i.test(e?.task || "") ? [Sc(e, "Inventory the six epoch run identifiers and token-source locations", "Freeze the source map before attempting any token-value recovery so discovery cannot consume the reconciliation lease.", "small", [
		"Enumerate exactly the six named run IDs from the predecessor contract.",
		"Classify each available source location as receipt-bound, ledger-only, or absent.",
		"Record immutable source references without estimating, copying, or reconciling token values."
	], "results/inbox/strategy-cost-source-inventory-v1/**", "One bounded source-location inventory only. Do not recover values, inspect unrelated runs, estimate usage, or rerun research."), Sc(e, "Bind epoch token values to the frozen six-run inventory", "Recover values only from the predecessor's exact source map and preserve irrecoverable measurements explicitly.", "small", [
		"Consume the exact six-run source inventory receipt without reopening discovery.",
		"Give every run a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Never impute an unknown value as zero and preserve receipt-bound versus ledger-only provenance.",
		"Change no resource policy, mathematical claim, or campaign phase."
	], "results/inbox/strategy-cost-value-binding-v1/**", "Stop when an inventoried source is absent or ambiguous and record UNKNOWN with provenance. Do not estimate, rerun research, or reconcile reservation policy.", ["Inventory the six epoch run identifiers and token-source locations"])] : /reconcile epoch reservation and wall-time scopes/i.test(e?.task || "") ? [Sc(e, "Define frozen epoch reservation and wall-time accounting scopes", "Freeze the exact accounting definitions before applying any measurements so the reconciliation cannot expand into another source search.", "small", [
		"Consume the exact six-run token-value binding receipt and preserve every UNKNOWN value.",
		"Define reservation, process-time, and observer end-to-end wall-time scopes without applying or estimating measurements.",
		"Bind the definitions to the frozen epoch and six-run inventory.",
		"Change no resource policy, mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-scope-definitions-v1/**", "Stop if the six-run value-binding receipt is absent or ambiguous. Do not search for sources, apply measurements, estimate usage, or exceed 50,000 tokens.", ["Bind epoch token values to the frozen six-run inventory"]), Sc(e, "Apply frozen epoch measurements to reservation reconciliation", "Apply only the predecessor's frozen scope definitions and source-bound values in one bounded accounting pass.", "small", [
		"Consume the exact predecessor scope-definition receipt without reopening definitions or source discovery.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation while preserving UNKNOWN values.",
		"Report process-time and observer end-to-end wall-time separately.",
		"Emit graph-effect NONE and change no mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-reservation-reconciliation-v1/**", "Stop at the first predecessor mismatch or unresolved value. Do not estimate, search other runs, rerun research, or exceed 50,000 tokens.")] : [];
}
//#endregion
//#region src/ui/PrimaryActionRail.svelte
Go();
var Tc = /* @__PURE__ */ K("<button> </button>"), Ec = /* @__PURE__ */ K("<li><b> </b><span> </span></li>"), Dc = /* @__PURE__ */ K("<ul></ul>"), Oc = /* @__PURE__ */ K("<p> </p> <!>", 1), kc = /* @__PURE__ */ K("<p> </p>"), Ac = /* @__PURE__ */ K("<li><b> </b><div><strong> </strong><p> </p><small> </small></div></li>"), jc = /* @__PURE__ */ K("<!> <ol></ol>", 1), Mc = /* @__PURE__ */ K("<label class=\"rail-note\"><span>Operator note or revision direction</span><textarea rows=\"3\" placeholder=\"Optional, but useful when redirecting or requesting revision\"></textarea></label>"), Nc = /* @__PURE__ */ K("<details class=\"rail-inspector\"><summary><span>Inspect the decision packet</span><strong> </strong></summary> <div class=\"rail-packet\"><!> <!></div></details>"), Pc = /* @__PURE__ */ K("<div class=\"recovery-report\"><div class=\"recovery-report-grid\"><div><span>WORKFLOW</span><strong> </strong></div> <div><span>FROZEN WAVE</span><strong> </strong></div> <div><span>ACCOUNTING</span><strong> </strong></div> <div><span>CONTROLLED EXECUTION</span><strong> </strong></div></div> <p class=\"recovery-digest\"><span>BOUND REPORT</span><code> </code></p> <p> </p> <label class=\"recovery-choice\"><span>Explicit recovery decision</span><select><option>Preserve the current hold</option><option>Align the historical wave to the workflow</option><option>Align the workflow to the frozen wave</option><option>Apply terminal-evidence projection repair</option></select></label> <label class=\"rail-note\"><span>Recovery rationale</span><textarea rows=\"3\" placeholder=\"Why this historical boundary—not the research direction—should change\"></textarea></label> <label class=\"recovery-confirm\"><input type=\"checkbox\"/><span>I reviewed the exact digest and authorize only this historical recovery decision.</span></label> <div class=\"recovery-boundary\"><strong>No inferred authority</strong><span>This command cannot infer a worker result, dispatch work, promote claims, merge, or push.</span></div> <button class=\"primary-button recovery-apply\"> </button></div>"), Fc = /* @__PURE__ */ K("<div class=\"recovery-report empty\"><p>Freeze a fresh report before choosing a transition. Preparation is read-only with respect to campaign workflow, workers, claims, Git, and publication.</p></div>"), Ic = /* @__PURE__ */ K("<details class=\"rail-inspector rail-recovery\"><summary><span>Historical recovery protocol</span><strong> </strong></summary> <!></details>"), Lc = /* @__PURE__ */ K("<div role=\"status\"> </div>"), Rc = /* @__PURE__ */ K("<section class=\"lifecycle-focus primary-action-rail\" id=\"next-action\" aria-live=\"polite\"><div class=\"rail-copy\"><div class=\"rail-kicker\"><span> </span><strong> </strong><i> </i></div> <h2> </h2> <p> </p> <details class=\"rail-hint\"><summary>Why this step · context and technical details</summary> <div><p><b>What this state means.</b> </p> <p><b>Mathematical connection.</b> </p> <p><b>What your click changes.</b> </p></div></details></div> <div class=\"lifecycle-actions rail-actions\"></div> <!> <!> <!></section>"), zc = /* @__PURE__ */ K("<button><strong> </strong><span> </span><small> </small></button>"), Bc = /* @__PURE__ */ K("<section class=\"project-picker\" aria-label=\"Campaign projects\"><div><p class=\"eyebrow\">CAMPAIGNS</p><h2>Choose a campaign control surface</h2></div> <div></div></section>");
function Vc(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(""), m = /* @__PURE__ */ I("pending"), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I("PRESERVE_HOLD"), _ = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I(!1), y = /* @__PURE__ */ I(""), b = /* @__PURE__ */ I(""), x = {
		SYNTHESIS_READY: "landed evidence",
		SYNTHESIZING: "synthesis",
		DECISION_REQUIRED: "direction decision",
		RESEARCH_REVIEW: "wave planning",
		RESEARCH_READY: "launch gate",
		RESEARCH_RUNNING: "wave out",
		RESEARCH_INTAKE: "landing and intake",
		NEXT_WAVE_READY: "next wave ready",
		PLANNING: "planning",
		RECONCILING: "reconciliation",
		BLOCKED: "blocked",
		RUNNING: "wave out",
		REVISING: "plan revision"
	};
	function S(e, t = 260) {
		let n = String(e || "").trim().replace(/\s+/g, " ");
		return n.length <= t ? n : `${n.slice(0, t).replace(/\s+\S*$/, "")}…`;
	}
	function C(e) {
		let t = Array.isArray(e?.researchRequests) ? e.researchRequests : [], n = e?.wave?.id ? t.filter((t) => t.waveId === e.wave.id) : t;
		if (!["drafting", "drafted"].includes(String(e?.researchPlan?.status || ""))) return n;
		let r = n.filter((e) => e.status === "in_review"), i = new Set((Array.isArray(e?.researchPlan?.response?.lanes) ? e.researchPlan.response.lanes : []).map((e) => e?.requestId).filter(Boolean));
		return i.size ? r.filter((e) => i.has(e.id)) : r;
	}
	function w(e) {
		return e?.action === "DROP" || e?.contract?.status === "NOT_LAUNCHABLE" ? "excluded" : e?.contract?.status === "AFTER_DEPENDENCY" || e?.dependsOnTaskIds?.length ? "followup" : e?.contract?.status === "READY" && /^[0-9a-f]{40}$/i.test(String(e.contract.baseRef || "")) ? "ready" : "contract";
	}
	function T(e) {
		let t = e?.wave?.triage?.response, n = Array.isArray(t?.laneRecommendations) ? t.laneRecommendations : [];
		return e?.phase === "RECONCILING" && n.length > 0 && n.every((e) => String(e?.disposition || "").toUpperCase() === "NONE") && /duplicate|already (?:accounted|synthesized)/i.test(`${t?.campaignAssessment || ""} ${t?.nextStep || ""}`);
	}
	function E(e) {
		return (e.custody?.items || []).find((e) => ["assigned", "verifying"].includes(e.status) || [
			"confirmed",
			"dispatching",
			"running",
			"finalizing",
			"awaiting_review"
		].includes(e.activeLease?.status)) || null;
	}
	function D(e, t) {
		let n = String(e.loop?.error || ""), r = t.find((e) => e?.task && n.includes(e.task));
		return E(e) || r || t[0];
	}
	function O(e, t, n) {
		let r = n.length, i = r > 1 ? ` · 1 of ${r}` : "", a = {
			key: "reveal",
			label: "Inspect custody queue",
			target: "#custody-service",
			style: "outline-button"
		}, o = t.activeLease;
		if (e.custody?.runtimeAdmission?.ready === !1 && ![
			"running",
			"finalizing",
			"awaiting_review"
		].includes(o?.status || "") && !["assigned", "verifying"].includes(t.status)) return {
			status: "CUSTODY LAUNCH HELD",
			title: "Repair the steward's runtime limits",
			detail: e.custody.runtimeAdmission.reason,
			actions: [a]
		};
		if (!o && t.inputReadiness?.ready === !1) return {
			status: "INPUTS REQUIRED",
			title: t.task,
			detail: t.inputReadiness.reason,
			actions: [a]
		};
		let s = String(e.loop?.error || ""), c = wc(t), l = Cc(t, s), u = n.filter((e) => e.dependenciesSatisfied !== !1 && xc(e)), d = u.length ? Math.min(...u.map((e) => Number(e.tokenCap || 0)).filter((e) => e > 0)) : 0, f = Number(e.resources?.ledger?.remainingBeforeCommitments || 0), p = Number(e.resources?.ledger?.schedulableTokens ?? f), m = e.strategy?.workspace, h = m?.activeReview;
		if (u.length && d > f) return h?.status === "drafting" || h?.status === "queued" ? {
			status: "RESOURCE RECENTER RUNNING",
			title: "Sol is reviewing the exhausted epoch",
			detail: "Both legacy custody failures are recoverable under the corrected lease policy, but the current epoch has no spendable tokens. The independent review is preparing a fresh resource proposal; it cannot dispatch work or change the campaign.",
			actions: [{
				key: "reveal",
				label: "Inspect resource review",
				target: "#strategy-workspace",
				style: "outline-button"
			}, a]
		} : h?.status === "drafted" ? {
			status: "FRESH EPOCH GATE",
			title: "Review and activate the proposed resource envelope",
			detail: "The strategy proposal is ready for a human decision. Activation opens a fresh measured epoch but dispatches nothing; after that, custody autopilot can retry the two zero-effect roots under corrected leases.",
			actions: [{
				key: "reveal",
				label: "Review fresh epoch proposal",
				target: "#strategy-workspace",
				style: "primary-button"
			}, a]
		} : {
			status: "RESOURCE ENVELOPE EXHAUSTED",
			title: "Open a fresh epoch before retrying custody",
			detail: "The two failed stewards were starved by the old 20,000-token total-turn lease, but this epoch has also spent its full envelope. Recommended: run one read-only strategy review, approve a fresh envelope, then let autopilot retry both dependency roots.",
			actions: [
				...m?.reviewAvailable ? [{
					key: "strategy.review.request",
					label: "Ask Sol to recenter resources",
					style: "primary-button",
					args: {
						triggerKind: "manual",
						reviewKind: "epoch",
						requestSource: "operator",
						reason: "The active epoch has exhausted its spendable token envelope while two zero-effect custody roots need corrected total-turn leases. Propose a fresh bounded epoch that preserves the current mathematical plan, custody dependencies, hard caps, and human launch gates."
					}
				}] : [],
				{
					key: "reveal",
					label: "Inspect resource controls",
					target: "#strategy-workspace",
					style: "outline-button"
				},
				a
			]
		};
		if (u.length) return {
			status: `${e.strategy?.epoch?.label || "FRESH EPOCH"} · ${p.toLocaleString()} TOKENS SCHEDULABLE`,
			title: "Authorize the starved custody roots under corrected envelopes",
			detail: `Epoch 3 permits no automatic repair descendants, so this is an explicit operator gate—not an autopilot retry. The prior attempts changed no files and stopped because fixed App Server context consumed most of each 20,000-token lease. One click authorizes and rebudgets ${u.length} unchanged frozen roots, then resumes the one-at-a-time Terra steward.${[
				"queued",
				"drafting",
				"drafted"
			].includes(String(h?.status || "")) ? " The extra resource review can finish in the background; it no longer blocks custody." : ""}`,
			actions: [{
				key: "custody.rebudget-and-resume",
				args: { itemIds: u.map((e) => e.id) },
				label: "Authorize " + u.length + " checks & resume",
				style: "primary-button"
			}, a]
		};
		let g = n.map((e) => ({
			targetId: e.id,
			task: e.task,
			children: wc(e)
		})).filter((e) => e.children.length >= 2 && Cc(n.find((t) => t.id === e.targetId), s)), _ = n.find((e) => e.id !== t.id && e.dependenciesSatisfied !== !1 && ["proposed", "ready"].includes(e.status));
		if (c.length && l) return {
			status: g.length > 1 ? `CUSTODY CONTRACT RESHAPE · ${g.length} OVERSIZED` : `CUSTODY CONTRACT RESHAPE${i}`,
			title: g.length > 1 ? `${g.length} jobs are larger than their custody leases` : "This job is larger than one custody lease",
			detail: g.length > 1 ? `All ${g.length} failed receipts landed zero changes. One approval replaces them with ${g.reduce((e, t) => e + t.children.length, 0)} dependency-ordered successors and resumes the one-at-a-time custody steward.` : `The failed receipt landed no changes. Recommended: replace it with ${c.length} dependency-ordered successors and resume. ${_ ? `Or run the independent “${S(_.task, 70)}” branch first; this stopped branch will remain preserved.` : ""}`,
			actions: [
				{
					key: "custody.reshape-and-resume",
					args: { batch: g.length > 1 ? g : [{
						targetId: t.id,
						task: t.task,
						children: c
					}] },
					label: g.length > 1 ? `Split all ${g.length} & resume custody` : "Split & resume custody",
					style: "primary-button"
				},
				..._ ? [{
					key: "loop.resume",
					label: "Run independent custody first",
					style: "outline-button"
				}] : [],
				a
			]
		};
		if (l) return {
			status: `CUSTODY CONTRACT STOP${i}`,
			title: "This job cannot safely repeat unchanged",
			detail: "The last zero-effect attempt crossed its fixed lease ceiling. Keep the dependency and inspect its acceptance contract; a smaller successor shape is required before another steward may run.",
			actions: [a]
		};
		if (t.status === "proposed") return {
			status: `DEPENDENCY GATE${i}`,
			title: `Enable ${S(t.task, 72)}`,
			detail: S(`${t.reason} This authorizes the bounded custody contract and freezes its exact lease; it does not start a steward.`),
			actions: [{
				key: "custody.item.promote",
				targetId: t.id,
				label: "Enable & freeze custody check",
				style: "primary-button"
			}, a]
		};
		if (["blocked", "failed"].includes(t.status)) {
			let e = /lease-byte provenance mismatch|frozen[- ]lease[- ]integrity|specified frozen lease|executor turn was interrupted|runtime interruption/i.test(`${t.receipt?.summary || ""} ${t.receipt?.stopReason || ""}`);
			return e ? {
				status: `SAFE CUSTODY RETRY${i}`,
				title: e ? "Retry the unchanged contract with the corrected lease check" : `Retry ${S(t.task, 72)}`,
				detail: e ? "The prior steward changed no files and stopped on a controller-owned digest instruction. One click freezes a fresh lease and dispatches Terra under the same allowed paths; it cannot promote a claim." : S(`${t.receipt?.summary || t.reason} A retry remains inside the same frozen acceptance contract and repair-generation limit.`),
				actions: [{
					key: "custody.item.promote",
					targetId: t.id,
					args: {
						autoDispatch: !0,
						note: "Operator requested one bounded custody retry and dispatch under the unchanged acceptance contract."
					},
					label: "Retry with Terra",
					style: "primary-button"
				}, a]
			} : {
				status: `CUSTODY REVIEW REQUIRED${i}`,
				title: S(t.task, 96),
				detail: S(`${t.receipt?.summary || t.reason} The receipt is not classified as a controller-owned interruption, so Lane Watch will not repeat it automatically.`),
				actions: [a]
			};
		}
		if (t.status === "ready" && !o) return {
			status: `LEASE PREPARATION${i}`,
			title: `Freeze ${S(t.task, 72)}`,
			detail: "The custody contract is enabled. Bind it to the current campaign revision and exact resource envelope before granting execution authority.",
			actions: [{
				key: "custody.lease.prepare",
				targetId: t.id,
				label: "Freeze exact custody lease",
				style: "primary-button"
			}, a]
		};
		if (o?.status === "prepared" && Number(e.resources?.slots?.available?.custody ?? 1) < 1) {
			let t = E(e);
			return {
				status: `CUSTODY QUEUED${i}`,
				title: "One Terra steward is already using the custody slot",
				detail: t ? `${S(t.task, 100)} is active. This exact lease is safely prepared and autopilot will confirm and dispatch it after the active receipt settles.` : "The shared custody slot is occupied by another campaign. This exact lease is safely prepared and will remain queued until the slot is released.",
				actions: [a]
			};
		}
		return o?.status === "prepared" ? {
			status: `HUMAN CUSTODY GATE${i}`,
			title: `Confirm ${S(t.task, 72)}`,
			detail: "The immutable lease is ready. This click confirms its exact digest and dispatches one isolated Terra steward; it cannot change research direction or promote a claim.",
			actions: [{
				key: "custody.lease.confirm",
				targetId: o.id,
				args: { leaseDigest: o.leaseDigest },
				label: "Confirm & dispatch steward",
				style: "primary-button"
			}, a]
		} : o?.status === "confirmed" ? {
			status: `READY TO DISPATCH${i}`,
			title: `Run ${S(t.task, 72)}`,
			detail: "Human authority is already recorded for this exact lease. Dispatch starts only its bounded isolated steward.",
			actions: [{
				key: "custody.lease.dispatch",
				targetId: o.id,
				args: { leaseDigest: o.leaseDigest },
				label: "Dispatch Terra steward",
				style: "primary-button"
			}, a]
		} : ["running", "finalizing"].includes(String(o?.status || "")) || t.status === "assigned" ? {
			status: `CUSTODY RUNNING${i}`,
			title: S(t.task, 96),
			detail: o?.status === "finalizing" ? "The isolated result is being measured and checked before its landing gate appears." : "The isolated Terra steward is working inside the exact lease. Research remains blocked until its receipt is reviewed.",
			actions: [...o?.id && Date.now() - Date.parse(o.updatedAt || o.startedAt || t.updatedAt || "") >= 6e4 ? [{
				key: "custody.lease.reconcile",
				targetId: o.id,
				label: "Recheck steward",
				style: "primary-button"
			}] : [], a]
		} : o?.status === "awaiting_review" || t.status === "verifying" ? {
			status: `RECEIPT GATE${i}`,
			title: `Review ${S(t.task, 72)}`,
			detail: S(o?.receipt?.summary || "The bounded custody result is ready. Landing rechecks the receipt and exact producer commit; it does not promote a mathematical claim."),
			actions: [...o?.verification?.landable ? [{
				key: "custody.receipt.land",
				targetId: o.id,
				args: { receiptDigest: o.receiptDigest },
				label: "Accept & land custody result",
				style: "primary-button"
			}] : [], a]
		} : {
			status: `CUSTODY ATTENTION${i}`,
			title: S(t.task, 96),
			detail: S(o?.error || t.reason || "This custody dependency needs inspection before research planning can continue."),
			actions: [a]
		};
	}
	function k(e) {
		let t = vc(e);
		if (t) return t;
		if ((e.externalInputs || []).some((e) => e.status === "drafted" && e.response?.decision === "READY_FOR_GATE")) return {
			status: "DIRECTION REVIEW READY",
			title: "Review the revised research direction",
			detail: "A checked redirect may replace the current experiment or its dependencies. Review it before retrying custody for the old plan.",
			actions: [{
				key: "reveal",
				label: "Review proposed direction",
				target: "#external-perspective",
				style: "primary-button"
			}]
		};
		let n = e.controlState?.recovery, r = (e.researchRuns || []).find((e) => e.status === "failed" && !e.evidenceSha256);
		if (n?.required && r && e.researchSchedule?.status === "failed") return {
			status: "SAFE RETRY READY",
			title: "Return the failed launch to one checked gate",
			detail: S(r.error || "The worker stopped before validated evidence landed. Its attempt remains preserved, and no mathematical claim was inferred."),
			actions: [{
				key: "research.failure.requeue",
				targetId: r.id,
				label: "Stage fresh retry",
				style: "primary-button"
			}]
		};
		if (n?.required) {
			let t = e.recoveryReport;
			return {
				status: "RECOVERY REVIEW",
				title: "Workflow and frozen wave disagree",
				detail: S(n.summary || `The workflow is ${n.workflowPhase}, while the frozen wave is ${n.wavePhase}. Inspect the durable boundary before choosing a new transition.`),
				actions: [
					...t?.status === "prepared" ? [{
						key: "scroll",
						label: "Review frozen recovery report",
						target: ".rail-recovery",
						style: "primary-button"
					}] : [{
						key: "campaign.recovery.prepare",
						label: "Freeze recovery report",
						style: "primary-button"
					}],
					{
						key: "scroll",
						label: "Inspect workflow history",
						target: ".campaign-map",
						style: "primary-button"
					},
					{
						key: "scroll",
						label: "Inspect frozen wave",
						target: "#wave-accounting",
						style: "outline-button"
					}
				]
			};
		}
		let i = e.wave?.accounting, a = i ? `${i.accounted}/${i.total}` : "no adopted wave";
		if (T(e)) return {
			status: "CONTROL-PLANE REPAIR",
			title: "Remove the duplicate wave from the live loop",
			detail: "These exact lane executions were already dispositioned and synthesized. Closing this duplicate restores the prior decision boundary without changing evidence, claims, Git, or worker state.",
			actions: [{
				key: "wave.duplicate.close",
				label: "Close duplicate & restore decision",
				style: "primary-button"
			}]
		};
		if (e.canApplyWaveTriage) return {
			status: "HUMAN GATE",
			title: "Apply the checked accounting repair",
			detail: `Sol’s triage is ready, but only ${a} source lanes are accounted. Applying the proposal records dispositions; it does not promote claims.`,
			actions: [{
				key: "wave.triage.apply",
				label: "Apply Sol recommendations",
				style: "primary-button",
				args: {
					waveId: e.wave?.id,
					evidenceDigest: e.wave?.triage?.evidenceDigest
				}
			}]
		};
		if (e.canRequestWaveTriage) return {
			status: "ACCOUNTING GAP",
			title: "Ask Sol for bounded wave triage",
			detail: `Workers have stopped, but only ${a} source lanes are accounted. The triage pass is read-only until a second human apply gate.`,
			actions: [{
				key: "wave.triage.request",
				label: "Ask Sol to triage",
				style: "primary-button"
			}]
		};
		if (e.canPrepareSynthesis) return {
			status: "READY",
			title: "Freeze the synthesis boundary",
			detail: `The wave is closed at ${a}. Freeze its evidence and campaign context before any synthesis job starts.`,
			actions: [{
				key: "synthesis.prepare",
				label: "Prepare synthesis bundle",
				style: "primary-button"
			}]
		};
		if (e.canRequestSynthesis) return {
			status: "READY",
			title: "Run the fast wave synthesis",
			detail: "The immutable evidence bundle is ready. Sol will check the landed results and advise the next planning decision without dispatching.",
			actions: [{
				key: "synthesis.request",
				label: "Ask Sol to synthesize",
				style: "primary-button"
			}]
		};
		if (e.phase === "SYNTHESIZING") return {
			status: "SOL WORKING",
			title: "Wave synthesis is running",
			detail: "Sol is checking landed evidence, contradictions, portfolio balance, and the next decision. This rail will update without moving the page.",
			actions: []
		};
		if (e.phase === "DECISION_REQUIRED") {
			let t = e.wave?.synthesis?.response || {}, n = Array.isArray(t?.nextWave?.lanes) ? t.nextWave.lanes : [], r = n.length > 0 || t.decision === "RESEARCH_REQUIRED" || t.decision === "BLOCKED";
			return {
				status: "HUMAN DIRECTION GATE",
				title: "Choose the campaign direction",
				detail: S(t?.operatorBrief?.nextDecision || t?.waveReview?.summary || `Sol proposes ${n.length} follow-up lanes.`),
				actions: [
					...r ? [{
						key: "synthesis.review",
						label: n.length ? `Plan ${n.length} bounded follow-up${n.length === 1 ? "" : "s"}` : "Open idea-search planning",
						style: "primary-button",
						args: { decision: "research" }
					}] : [],
					{
						key: "synthesis.review",
						label: r ? "Close wave without follow-up" : "Approve direction",
						style: r ? "outline-button" : "primary-button",
						args: { decision: "accept" }
					},
					{
						key: "synthesis.review",
						label: "Request revision",
						style: "outline-button",
						args: { decision: "revise" }
					},
					{
						key: "synthesis.review",
						label: "Hold here",
						style: "outline-button",
						args: { decision: "block" }
					},
					{
						key: "inspect",
						label: "Inspect synthesis",
						style: "outline-button"
					}
				]
			};
		}
		if (e.phase === "RESEARCH_REVIEW") {
			let t = e.researchPlan, n = Array.isArray(t?.response?.lanes) ? t.response.lanes : [], r = n.filter((e) => w(e) === "ready"), i = n.filter((e) => w(e) === "followup"), a = (e.custody?.items || []).filter((e) => e.blocksResearch && !["complete", "parked"].includes(e.status)), o = t?.status === "drafted" && t?.response?.decision === "BLOCKED";
			return t?.status === "drafting" ? {
				status: "SOL CHECKING",
				title: "Sol is shaping the next bounded wave",
				detail: `The coordinator is checking ${C(e).length} requests for grain, dependencies, contracts, resources, and tunnel vision. It cannot dispatch.`,
				actions: []
			} : o ? {
				status: "OPERATOR TRANSITION",
				title: "The checked plan needs one operator-owned change",
				detail: S(t?.response?.operatorGuidance || "No safe lane can launch until the required transition is resolved."),
				actions: [{
					key: "scroll",
					label: "Open required operator gate",
					target: "#operator-gate",
					style: "primary-button"
				}]
			} : t?.status === "drafted" && !r.length && i.length && a.length ? O(e, D(e, a), a) : t?.status === "drafted" && !r.length ? {
				status: "DEPENDENCY PLAN",
				title: "No research lane can launch from this revision",
				detail: S(t?.response?.operatorGuidance || "The checked plan contains only dependent or excluded work. Request a revision after resolving its named prerequisites."),
				actions: [{
					key: "research.review.resolve",
					label: "Request dependency-aware revision",
					style: "primary-button",
					args: { decision: "revise" }
				}, {
					key: "inspect",
					label: "Inspect checked plan",
					style: "outline-button"
				}]
			} : t?.status === "drafted" ? {
				status: "HUMAN PLAN GATE",
				title: `Review ${r.length} launchable lane${r.length === 1 ? "" : "s"}`,
				detail: S(t?.response?.summary || t?.response?.operatorGuidance || "The checked plan is ready for an explicit human gate."),
				actions: [
					{
						key: "research.review.resolve",
						label: `Approve & stage ${r.length} lane${r.length === 1 ? "" : "s"}`,
						style: "primary-button",
						args: { decision: "approve" }
					},
					{
						key: "research.review.resolve",
						label: "Request revision",
						style: "outline-button",
						args: { decision: "revise" }
					},
					{
						key: "research.review.resolve",
						label: "Block plan",
						style: "outline-button",
						args: { decision: "block" }
					}
				]
			} : {
				status: "PLAN INPUT READY",
				title: "Ask Sol to shape the wave",
				detail: `${C(e).filter((e) => e.status === "proposed").length} candidate lane records are ready for dependency, staffing, resource, and breadth checks.`,
				actions: [{
					key: "research.review.start",
					label: "Check & shape lane plan",
					style: "primary-button"
				}]
			};
		}
		if (e.phase === "RESEARCH_READY") {
			let t = (e.custody?.items || []).filter((e) => e.blocksResearch && !["complete", "parked"].includes(e.status));
			if (t.length) return O(e, D(e, t), t);
		}
		if (e.phase === "RESEARCH_RUNNING") {
			let t = (e.researchRuns || []).filter((e) => [
				"launching",
				"running",
				"blocked"
			].includes(e.status));
			return {
				status: "WAVE OUT",
				title: `${t.length || 1} bounded lane${t.length === 1 ? " is" : "s are"} active`,
				detail: t.map((e) => e.taskId).join(" · ") || "The observer is waiting for terminal receipts.",
				actions: [{
					key: "scroll",
					label: "Inspect live lanes",
					target: "#observer-lanes",
					style: "outline-button"
				}]
			};
		}
		if (e.phase === "RESEARCH_INTAKE") {
			let t = (e.researchRuns || []).find((e) => e.status === "evidence_ready"), n = (e.researchRuns || []).find((e) => e.status === "failed"), r = (e.researchRuns || []).find((e) => e.status === "awaiting_evidence"), i = r && /hash-mode declaration mismatch:/i.test(String(r.error || ""));
			return {
				status: t ? "LANDING GATE" : n ? "LAUNCH FAILED SAFELY" : i ? "BOUNDED CUSTODY REPAIR" : "LANDING GATE",
				title: t ? "Accept the landed research receipt" : n ? "Retry from a fresh checked schedule" : i ? "Correct the receipt’s hashing declaration" : r?.error ? "Resolve the receipt check" : "Recheck the landing boundary",
				detail: t ? "Returning evidence preserves custody and starts read-only synthesis. It does not promote claims, merge, push, or dispatch another lane." : n ? S(n.error || "The worker stopped before producing validated evidence. The failed attempt is preserved; retry returns the same frozen contract to a new schedule and launch gate.") : i ? "The artifact bytes already match every recorded digest. The receipt mislabeled raw Windows bytes as canonical LF; this repair changes only that declaration, freezes an audit commit, and leaves the mathematical result untouched." : S(r?.error || "The worker is terminal, but its validated evidence receipt has not landed yet. Recheck once, or inspect the worker and receipt without leaving this control area."),
				actions: t ? [{
					key: "research.evidence.return",
					targetId: t.id,
					label: "Accept receipt & continue",
					style: "primary-button"
				}] : n ? [{
					key: "research.failure.requeue",
					targetId: n.id,
					label: "Stage a fresh retry",
					style: "primary-button"
				}] : i ? [{
					key: "research.receipt.reconcile",
					targetId: r.id,
					label: "Repair receipt custody",
					style: "primary-button"
				}, {
					key: "reveal",
					label: "Inspect exact mismatch",
					target: "#evidence-workspace",
					style: "outline-button"
				}] : [{
					key: "refresh",
					label: "Recheck receipt",
					style: "primary-button"
				}, {
					key: "reveal",
					label: "Inspect worker & receipt",
					target: "#evidence-workspace",
					style: "outline-button"
				}]
			};
		}
		return e.phase === "REVISING" ? {
			status: "REVISION READY",
			title: "Rerun the corrected plan check",
			detail: "Your revision direction is recorded and no lanes were staged.",
			actions: [{
				key: "research.review.start",
				label: "Run corrected plan check",
				style: "primary-button"
			}]
		} : e.canAdoptWave ? {
			status: "BOOTSTRAP",
			title: "Adopt the current bounded lanes",
			detail: "Capture the current active lane set as an explicit wave before applying accounting and synthesis mechanics.",
			actions: [{
				key: "wave.adopt",
				label: "Adopt active lanes",
				style: "primary-button"
			}]
		} : _c(e) || {
			status: e.phase || "PLANNING",
			title: "Planning the next bounded move",
			detail: e.role || "No active wave is ready for synthesis yet.",
			actions: []
		};
	}
	async function A(e) {
		if (!(!U(d) || U(f))) {
			if (e.key === "scroll") {
				document.querySelector(e.target || "")?.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
				return;
			}
			if (e.key === "reveal") {
				let t = document.querySelector(e.target || "");
				if (t) {
					let e = t.parentElement;
					for (; e;) e instanceof HTMLDetailsElement && (e.open = !0), e = e.parentElement;
					t.open = !0, t.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				}
				return;
			}
			if (e.key === "inspect") {
				let e = document.querySelector("#next-action .rail-inspector");
				e && (e.open = !0, e.scrollIntoView({
					behavior: "smooth",
					block: "nearest"
				}));
				return;
			}
			L(f, e.key), L(m, "pending"), L(p, e.key === "refresh" ? "Rechecking the worker and receipt boundary…" : "Applying the checked transition…");
			try {
				if (e.key === "refresh") {
					await Vo(), L(m, "success"), L(p, "The worker and receipt boundary is current.");
					return;
				}
				if (e.key === "custody.reshape-and-resume") {
					let t = Array.isArray(e.args?.batch) ? e.args.batch : [];
					if (!t.length) throw Error("No oversized custody contracts were selected");
					for (let e of t) await as({
						projectId: U(d).id,
						type: "custody.item.reshape",
						targetId: String(e.targetId || ""),
						args: { children: e.children },
						scope: "primary-rail-custody-batch",
						pollLimit: 80
					});
					await as({
						projectId: U(d).id,
						type: "loop.resume",
						scope: "primary-rail-custody-resume",
						pollLimit: 80
					}), L(m, "success"), L(p, `${t.length} oversized contract${t.length === 1 ? " was" : "s were"} replaced by dependency-ordered successors, and custody autopilot resumed.`);
					return;
				}
				if (e.key === "custody.rebudget-and-resume") {
					let t = Array.isArray(e.args?.itemIds) ? e.args.itemIds.map(String) : [];
					if (!t.length) throw Error("No legacy custody leases were selected");
					for (let e of t) await as({
						projectId: U(d).id,
						type: "custody.item.promote",
						targetId: e,
						args: {
							note: "Operator explicitly authorized this unchanged frozen repair under the corrected total-turn custody envelope after a zero-effect legacy budget stop.",
							operatorConfirmation: "AUTHORIZE THIS FROZEN REPAIR"
						},
						scope: "primary-rail-custody-rebudget",
						pollLimit: 80
					});
					await as({
						projectId: U(d).id,
						type: "loop.resume",
						scope: "primary-rail-custody-rebudget-resume",
						pollLimit: 80
					}), L(m, "success"), L(p, t.length + " legacy custody leases were rebudgeted and one-at-a-time autopilot resumed.");
					return;
				}
				let t = {
					...e.args || {},
					...["synthesis.review", "research.review.resolve"].includes(e.key) ? { note: U(h) } : {}
				}, n = await as({
					projectId: U(d).id,
					type: e.key,
					targetId: e.targetId || "",
					args: t,
					scope: "primary-rail",
					pollLimit: ["synthesis.request", "research.review.start"].includes(e.key) ? 160 : 80
				});
				if (e.key === "custody.item.promote") {
					let t = n.project.custody?.items?.find((t) => t.id === e.targetId);
					if (t?.status === "ready" && !t.activeLease && (n = await as({
						projectId: U(d).id,
						type: "custody.lease.prepare",
						targetId: t.id,
						scope: "primary-rail-custody",
						pollLimit: 80
					})), e.args?.autoDispatch) {
						let t = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						t?.status === "prepared" && (n = await as({
							projectId: U(d).id,
							type: "custody.lease.confirm",
							targetId: t.id,
							args: { leaseDigest: t.leaseDigest },
							scope: "primary-rail-custody",
							pollLimit: 80
						}));
						let r = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						r?.status === "confirmed" && (n = await as({
							projectId: U(d).id,
							type: "custody.lease.dispatch",
							targetId: r.id,
							args: { leaseDigest: r.leaseDigest },
							scope: "primary-rail-custody",
							pollLimit: 80
						}));
					}
				}
				if (e.key === "custody.lease.confirm") {
					let t = n.project.custody?.items?.find((t) => t.activeLease?.id === e.targetId);
					t?.activeLease?.status === "confirmed" && (n = await as({
						projectId: U(d).id,
						type: "custody.lease.dispatch",
						targetId: t.activeLease.id,
						args: { leaseDigest: t.activeLease.leaseDigest },
						scope: "primary-rail-custody",
						pollLimit: 80
					}));
				}
				e.key === "research.failure.requeue" && n.project.phase, e.key === "synthesis.review" && e.args?.decision === "research" && n.project.phase === "RESEARCH_REVIEW" && await as({
					projectId: U(d).id,
					type: "research.review.start",
					scope: "primary-rail",
					pollLimit: 160
				}), L(h, ""), L(m, "success"), L(p, "The transition settled and the live control state is current.");
			} catch (e) {
				L(m, "error"), L(p, e instanceof Error ? e.message : String(e));
			} finally {
				L(f, "");
			}
		}
	}
	async function j() {
		let e = U(d)?.recoveryReport;
		if (!(!U(d) || !e || e.status !== "prepared" || U(f) || !U(v))) {
			L(f, "campaign.recovery.apply"), L(m, "pending"), L(p, "Revalidating the exact recovery digest…");
			try {
				await as({
					projectId: U(d).id,
					type: "campaign.recovery.apply",
					args: {
						reportId: e.id,
						reportDigest: e.reportDigest,
						decision: U(g),
						note: U(_),
						confirmation: "APPLY CAMPAIGN RECOVERY"
					},
					scope: "recovery-rail"
				}), L(v, !1), L(_, ""), L(m, "success"), L(p, "The selected historical recovery decision settled. No worker result, dispatch, claim promotion, merge, or push was inferred.");
			} catch (e) {
				L(m, "error"), L(p, e instanceof Error ? e.message : String(e));
			} finally {
				L(f, "");
			}
		}
	}
	V(() => n(), () => {
		L(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(d), () => {
		L(a, Array.isArray(U(d)?.loop?.steps) ? U(d)?.loop?.steps.at(-1) : null);
	}), V(() => (U(d), U(a)), () => {
		L(o, U(d)?.loop?.status === "attention" && U(a)?.status === "failed" ? String(U(d)?.loop?.error || "") : "");
	}), V(() => (U(o), U(b), U(d)), () => {
		if (U(o) && U(o) !== U(b)) {
			L(b, U(o));
			let e = /quota admission denied: custody slots/i.test(U(o)) && Number(U(d)?.resources?.slots?.available?.custody || 0) > 0;
			L(m, e ? "pending" : "error"), L(p, e ? "Previous attempt waited on the single Terra slot. That slot is now free; use the current action above instead of repeating the old confirmation." : S(U(o), 520));
		}
	}), V(() => (U(o), U(b)), () => {
		!U(o) && U(b) && L(b, "");
	}), V(() => U(d), () => {
		L(s, U(d) ? k(U(d)) : null);
	}), V(() => U(d), () => {
		L(c, Array.isArray(U(d)?.researchPlan?.response?.lanes) ? U(d).researchPlan.response.lanes : []);
	}), V(() => U(d), () => {
		L(l, U(d)?.wave?.synthesis?.response || null);
	}), V(() => (U(d), U(l)), () => {
		L(u, [
			"DECISION_REQUIRED",
			"NEXT_WAVE_READY",
			"SYNTHESIZING",
			"SYNTHESIS_READY"
		].includes(String(U(d)?.phase || "")) ? U(l)?.waveReview?.coordinatorGuidance || U(l)?.operatorBrief?.nextDecision || U(l)?.nextWave?.objective || U(d)?.researchPlan?.response?.operatorGuidance || U(d)?.role || "" : U(d)?.researchPlan?.response?.operatorGuidance || U(l)?.waveReview?.coordinatorGuidance || U(l)?.nextWave?.objective || U(d)?.role || "");
	}), V(() => (U(d), U(y)), () => {
		(U(d)?.recoveryReport?.id || "") !== U(y) && (L(y, U(d)?.recoveryReport?.id || ""), L(g, "PRESERVE_HOLD"), L(_, ""), L(v, !1));
	}), Br(), xo();
	var ee = ua(), M = z(ee), N = (e) => {
		var t = Rc(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
		P(i);
		var o = B(i), y = R(o, !0);
		P(o);
		var b = B(o), C = R(b, !0);
		P(b), P(r);
		var T = B(r, 2), E = R(T, !0);
		P(T);
		var D = B(T, 2), O = R(D, !0);
		P(D);
		var k = B(D, 2), ee = B(R(k), 2), M = R(ee), N = B(R(M));
		P(M);
		var te = B(M, 2), ne = B(R(te));
		P(te);
		var re = B(te, 2), ie = B(R(re));
		P(re), P(ee), P(k), P(n);
		var ae = B(n, 2);
		X(ae, 5, () => (U(s), W(() => U(s).actions)), ya, (e, t) => {
			var n = Tc(), r = R(n, !0);
			P(n), H((e) => {
				Z(n, 1, Fa((U(t), W(() => U(t).style || "outline-button")))), n.disabled = e, J(r, (U(f), U(t), W(() => U(f) === U(t).key ? "Working…" : U(t).label)));
			}, [() => (U(f), W(() => !!U(f)))]), G("click", n, () => A(U(t))), q(e, n);
		}), P(ae);
		var oe = B(ae, 2), se = (e) => {
			var t = Nc(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = R(a), u = (e) => {
				var t = Oc(), n = z(t), r = R(n, !0);
				P(n);
				var i = B(n, 2), a = (e) => {
					var t = Dc();
					X(t, 5, () => (U(l), W(() => U(l).waveReview.quickChecks)), ya, (e, t) => {
						var n = Ec(), r = R(n), i = R(r, !0);
						P(r);
						var a = B(r), o = R(a, !0);
						P(a), P(n), H((e) => {
							Z(n, 1, e), J(i, (U(t), W(() => U(t).status))), J(o, (U(t), W(() => U(t).check)));
						}, [() => Fa((U(t), W(() => String(U(t).status).toLowerCase())))]), q(e, n);
					}), P(t), q(e, t);
				};
				Y(i, (e) => {
					U(l), W(() => U(l)?.waveReview?.quickChecks?.length) && e(a);
				}), H(() => J(r, (U(l), W(() => U(l)?.waveReview?.summary || "No synthesis summary was recorded.")))), q(e, t);
			}, f = (e) => {
				var t = jc(), n = z(t), r = (e) => {
					var t = kc(), n = R(t, !0);
					P(t), H(() => J(n, (U(d), W(() => U(d).researchPlan?.response?.operatorGuidance || U(d).researchPlan?.response?.summary || "The checked plan remains held.")))), q(e, t);
				};
				Y(n, (e) => {
					U(s), W(() => U(s).status === "RESEARCH PAUSED") && e(r);
				});
				var i = B(n, 2);
				X(i, 5, () => U(c), ya, (e, t) => {
					var n = Ac(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a), s = R(o, !0);
					P(o);
					var c = B(o), l = R(c, !0);
					P(c);
					var u = B(c), d = R(u);
					P(u), P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).priority || "–"))), J(s, (U(t), W(() => U(t).taskId || "bounded lane"))), J(l, (U(t), W(() => U(t).question || U(t).objective || U(t).rationale))), J(d, `${e ?? ""} · ${U(t), W(() => U(t).profile || "sonnet-worker") ?? ""}`);
					}, [() => (U(t), W(() => w(U(t))))]), q(e, n);
				}), P(i), q(e, t);
			};
			Y(o, (e) => {
				U(d), W(() => U(d).phase === "DECISION_REQUIRED") ? e(u) : e(f, -1);
			});
			var p = B(o, 2), m = (e) => {
				var t = Mc(), n = B(R(t));
				tn(n), P(t), uo(n, () => U(h), (e) => L(h, e)), q(e, t);
			};
			Y(p, (e) => {
				U(s), W(() => U(s).status !== "RESEARCH PAUSED") && e(m);
			}), P(a), P(t), H(() => J(i, (U(d), U(l), U(c), W(() => U(d).phase === "DECISION_REQUIRED" ? `${U(l)?.nextWave?.lanes?.length || 0} proposed next lanes` : `${U(c).length} checked plan records`)))), q(e, t);
		}, ce = /* @__PURE__ */ F(() => (U(d), U(s), W(() => ["DECISION_REQUIRED", "RESEARCH_REVIEW"].includes(U(d).phase) || U(s).status === "RESEARCH PAUSED")));
		Y(oe, (e) => {
			U(ce) && e(se);
		});
		var le = B(oe, 2), ue = (e) => {
			var t = Ic(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = (e) => {
				var t = Pc(), n = R(t), r = R(n), i = B(R(r)), a = R(i, !0);
				P(i), P(r);
				var o = B(r, 2), s = B(R(o)), c = R(s, !0);
				P(s), P(o);
				var l = B(o, 2), u = B(R(l)), p = R(u);
				P(u), P(l);
				var m = B(l, 2), h = B(R(m)), y = R(h, !0);
				P(h), P(m), P(n);
				var b = B(n, 2), x = B(R(b)), S = R(x, !0);
				P(x), P(b);
				var C = B(b, 2), w = R(C, !0);
				P(C);
				var T = B(C, 2), E = B(R(T)), D = R(E);
				D.value = D.__value = "PRESERVE_HOLD";
				var O = B(D);
				O.value = O.__value = "ALIGN_WAVE_TO_WORKFLOW";
				var k = B(O);
				k.value = k.__value = "ALIGN_WORKFLOW_TO_WAVE";
				var A = B(k);
				A.value = A.__value = "APPLY_VALIDATED_PROJECTION_REPAIR", P(E), P(T);
				var ee = B(T, 2), M = B(R(ee));
				tn(M), P(ee);
				var N = B(ee, 2), te = R(N);
				no(te), Ke(), P(N);
				var ne = B(N, 4), re = R(ne, !0);
				P(ne), P(t), H((e) => {
					J(a, (U(d), W(() => U(d).recoveryReport.snapshot?.project?.phase))), J(c, (U(d), W(() => U(d).recoveryReport.snapshot?.wave?.phase))), J(p, `${U(d), W(() => U(d).recoveryReport.snapshot?.wave?.accounting?.accounted) ?? ""}/${U(d), W(() => U(d).recoveryReport.snapshot?.wave?.accounting?.total) ?? ""}`), J(y, (U(d), W(() => U(d).recoveryReport.snapshot?.controlState?.recovery?.activeExecution || 0))), J(S, (U(d), W(() => U(d).recoveryReport.reportDigest))), J(w, (U(d), W(() => U(d).recoveryReport.snapshot?.projectionRepair?.summary))), A.disabled = (U(d), W(() => !U(d).recoveryReport.snapshot?.choices?.applyProjectionRepair)), ne.disabled = e, J(re, U(f) === "campaign.recovery.apply" ? "Revalidating…" : "Apply selected recovery");
				}, [() => (U(v), U(f), W(() => !U(v) || !!U(f)))]), Ga(E, () => U(g), (e) => L(g, e)), uo(M, () => U(_), (e) => L(_, e)), fo(te, () => U(v), (e) => L(v, e)), G("click", ne, j), q(e, t);
			}, s = (e) => {
				q(e, Fc());
			};
			Y(a, (e) => {
				U(d), W(() => U(d).recoveryReport?.status === "prepared") ? e(o) : e(s, -1);
			}), P(t), H(() => {
				t.open = (U(d), W(() => U(d).recoveryReport?.status === "prepared")), J(i, (U(d), W(() => U(d).recoveryReport?.status === "prepared" ? "DIGEST FROZEN" : "REPORT REQUIRED")));
			}), q(e, t);
		};
		Y(le, (e) => {
			U(d), U(s), W(() => U(d).controlState?.recovery?.required && U(s).status !== "SAFE RETRY READY") && e(ue);
		});
		var de = B(le, 2), fe = (e) => {
			var t = Lc(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `gate-feedback ${U(m) ?? ""}`), J(n, U(p));
			}), q(e, t);
		};
		Y(de, (e) => {
			U(p) && e(fe);
		}), P(t), H((e, t, n) => {
			J(a, (U(d), W(() => U(d).id))), J(y, e), J(C, (U(s), W(() => U(s).status))), J(E, (U(s), W(() => U(s).title))), J(O, (U(s), W(() => U(s).detail))), J(N, ` ${U(s), U(d), W(() => U(s).status === "RESULT READY" ? "The finished run has a validated receipt. Result review will summarize what it establishes and what remains unresolved." : U(s).status === "RESULT NEEDS CHECKING" ? "The worker has stopped, but its receipt still needs validation before result review." : U(d).phase === "RESEARCH_READY" ? "The research question and resource cap are fixed, but no worker may run until the exact schedule is confirmed." : U(d).phase === "RESEARCH_INTAKE" ? "A worker boundary has settled; Lane Watch is deciding whether there is valid evidence to accept or an infrastructure attempt to retry." : "This is the next authority boundary in the campaign loop; observation alone cannot cross it.") ?? ""}`), J(ne, ` ${t ?? ""}`), J(ie, ` ${n ?? ""}`);
		}, [
			() => (U(d), W(() => x[U(d).phase] || U(d).phase?.toLowerCase().replaceAll("_", " "))),
			() => (U(d), U(u), W(() => S(U(d).researchSchedule?.members?.[0]?.expectedDelta || U(d).researchPlan?.response?.lanes?.[0]?.evidenceExpected || U(u) || U(d).role, 420))),
			() => (U(s), W(() => [
				"reveal",
				"inspect",
				"scroll"
			].includes(U(s).actions[0]?.key || "") ? "It opens the relevant context on this page. Campaign state and worker execution stay unchanged." : U(s).actions[0]?.key === "research.failure.requeue" ? "It preserves the failed attempt, restores the same checked question to scheduling, and prepares a new confirmation gate. It does not claim a result or dispatch by itself." : U(s).actions[0]?.key === "research.schedule.confirm" ? "It authorizes only this frozen task list and budget. It does not yet accept evidence or change campaign truth." : "Only the named workflow boundary changes; worker output, mathematical truth, Git integration, and publication remain separately gated."))
		]), q(e, t);
	}, te = (e) => {
		var t = Bc(), r = B(R(t), 2);
		X(r, 5, () => (n(), W(() => n().control.projectIndex)), ya, (e, t) => {
			var n = zc(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a);
			var s = B(a), c = R(s, !0);
			P(s), P(n), H(() => {
				J(i, (U(t), W(() => U(t).id))), J(o, (U(t), W(() => x[U(t).phase] || U(t).phase))), J(c, (U(t), W(() => U(t).role)));
			}), G("click", n, () => Io(String(U(t).id))), q(e, n);
		}), P(r), P(t), q(e, t);
	};
	Y(M, (e) => {
		U(d) && U(s) ? e(N) : (n(), W(() => n().control?.projectIndex?.length) && e(te, 1));
	}), q(e, ee), xt(), i();
}
//#endregion
//#region src/ui/PacketInbox.svelte
$i(["click"]), Go();
var Hc = /* @__PURE__ */ K("<li><span> </span> <div><strong> </strong><small> </small></div> <code> </code></li>"), Uc = /* @__PURE__ */ K("<ol class=\"packet-list\"></ol>"), Wc = /* @__PURE__ */ K("<p class=\"packet-empty\">No queue packets are currently in the bounded context window.</p>"), Gc = /* @__PURE__ */ K("<section class=\"packet-inbox\" id=\"packet-inbox\" aria-label=\"Research packet inbox\"><header><div><p>RESEARCH PACKET INBOX</p><h2>Drop context here; promote it through explicit gates</h2><span>A packet may shape the next plan. It cannot dispatch, adopt a wave, or become mathematical authority by appearing here.</span></div> <strong> </strong></header> <div class=\"packet-drop\"><div><span>WATCHED DROP POINT</span><code> </code><small>The context registry hashes the five newest Markdown packets on its next observation pass.</small></div> <button class=\"outline-button compact\"> </button></div> <div class=\"packet-intake-grid\"><section><div class=\"packet-section-title\"><span>RECEIVED CONTEXT</span><strong> </strong></div> <!></section> <section class=\"packet-contract\"><div class=\"packet-section-title\"><span>MINIMUM PACKET CONTRACT</span><strong>Markdown · context only</strong></div> <ol><li><b>1</b><span><strong>Question and intended delta</strong><small>What should change in campaign knowledge if the work succeeds?</small></span></li> <li><b>2</b><span><strong>Dependencies and exact evidence base</strong><small>Name required receipts, commits, or unresolved gates.</small></span></li> <li><b>3</b><span><strong>Allowed work and stop conditions</strong><small>Bound scope, resources, prohibited inference, and honest failure.</small></span></li> <li><b>4</b><span><strong>Proposed lanes, never authority</strong><small>Sol review and later human confirmation compile any launch contract.</small></span></li></ol></section></div> <footer><b> </b> <span> </span></footer></section>");
function Kc(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(!1);
	function d(e) {
		return e.replaceAll("\\", "/").split("/").at(-1)?.replace(/\.md$/i, "") || e;
	}
	function f(e) {
		return e.replace(/^sha256:/, "").slice(0, 12);
	}
	async function p() {
		if (!U(l) || !navigator.clipboard) return;
		let e = String(U(l).root || "").replace(/[\\/]$/, "");
		await navigator.clipboard.writeText(`${e}\\packets\\queue`), L(u, !0), setTimeout(() => L(u, !1), 1600);
	}
	V(() => n(), () => {
		L(l, n().control?.projects?.find((e) => e.id === n().selectedProject) || n().control?.projects?.[0] || null);
	}), V(() => U(l), () => {
		L(a, (Array.isArray(U(l)?.context?.sources) ? U(l).context.sources : []).filter((e) => e.role === "queue-plan").sort((e, t) => String(t.modifiedAt || "").localeCompare(String(e.modifiedAt || ""))));
	}), V(() => U(l), () => {
		L(o, !!U(l)?.controlState?.recovery?.required);
	}), V(() => (U(a), U(o)), () => {
		L(s, U(a).length ? U(o) ? "STAGED · CONTROL HOLD" : "STAGED FOR REVIEW" : "WAITING FOR PACKET");
	}), V(() => U(l), () => {
		L(c, U(l) ? `campaigns/${U(l).id}/packets/queue/` : "campaigns/<project>/packets/queue/");
	}), Br(), xo();
	var m = ua(), h = z(m), g = (e) => {
		var t = Gc(), n = R(t), r = B(R(n), 2);
		let i;
		var l = R(r, !0);
		P(r), P(n);
		var m = B(n, 2), h = R(m), g = B(R(h)), _ = R(g, !0);
		P(g), Ke(), P(h);
		var v = B(h, 2), y = R(v, !0);
		P(v), P(m);
		var b = B(m, 2), x = R(b), S = R(x), C = B(R(S)), w = R(C);
		P(C), P(S);
		var T = B(S, 2), E = (e) => {
			var t = Uc();
			X(t, 7, () => U(a), (e) => e.id, (e, t, n) => {
				var r = Hc();
				let i;
				var a = R(r), o = R(a, !0);
				P(a);
				var s = B(a, 2), c = R(s), l = R(c, !0);
				P(c);
				var u = B(c), p = R(u);
				P(u), P(s);
				var m = B(s, 2), h = R(m, !0);
				P(m), P(r), H((e, a, s, c) => {
					i = Z(r, 1, "", null, i, { newest: U(n) === 0 }), J(o, U(n) === 0 ? "NEWEST" : `QUEUE ${U(n) + 1}`), J(l, e), J(p, `${a ?? ""} · ${s ?? ""} bytes`), Q(m, "title", (U(t), W(() => U(t).sha256))), J(h, c);
				}, [
					() => (U(t), W(() => d(U(t).path))),
					() => (U(t), W(() => new Date(U(t).modifiedAt).toLocaleString())),
					() => (U(t), W(() => Number(U(t).bytes || 0).toLocaleString())),
					() => (U(t), W(() => f(U(t).sha256)))
				]), q(e, r);
			}), P(t), q(e, t);
		}, D = (e) => {
			q(e, Wc());
		};
		Y(T, (e) => {
			U(a), W(() => U(a).length) ? e(E) : e(D, -1);
		}), P(x), Ke(2), P(b);
		var O = B(b, 2);
		let k;
		var A = R(O), j = R(A, !0);
		P(A);
		var ee = B(A, 2), M = R(ee, !0);
		P(ee), P(O), P(t), H(() => {
			i = Z(r, 1, "", null, i, { hold: U(o) }), J(l, U(s)), J(_, U(c)), J(y, U(u) ? "Copied" : "Copy full path"), J(w, `${U(a), W(() => U(a).length) ?? ""}/5 bounded slots`), k = Z(O, 1, "", null, k, { hold: U(o) }), J(j, U(o) ? "RECEIVE-ONLY BOUNDARY" : "READY FOR SEMANTIC REVIEW"), J(M, U(o) ? "CFG23 can receive and hash the packet now, but recovery must be resolved before it can become a checked plan." : "The packet is visible to the next bounded Sol planning turn; launch gates remain separate.");
		}), G("click", v, p), q(e, t);
	};
	Y(h, (e) => {
		U(l) && e(g);
	}), q(e, m), xt(), i();
}
$i(["click"]);
//#endregion
//#region src/ui/campaign-interpretation.ts
var qc = [
	{
		id: "geometric-23-4",
		pattern: /23[_ ]?4|23\\_4|geometric \(?23/i,
		title: "Geometric (23₄) configuration",
		summary: "A symmetric incidence structure with 23 points and 23 lines, four incidences at every point and on every line, realized by straight lines over the real projective plane.",
		relation: "This is the campaign's north-star existence question. Candidate classifications and algebraic obstructions matter only through how they narrow or supply possible realizations.",
		scope: "Combinatorial incidence, orientability, or symmetry evidence alone does not establish a real straight-line realization."
	},
	{
		id: "orientation",
		pattern: /orient(?:ation|ability|ed)|oriented matroid/i,
		title: "Orientation and oriented matroids",
		summary: "Sign data encoding which triples lie on which side of one another, providing a combinatorial shadow of a geometric arrangement.",
		relation: "Orientation filters remove candidates that cannot support the required signed incidence behavior before expensive geometry is attempted.",
		scope: "An orientation can be necessary without being stretchable or realizable by actual straight lines."
	},
	{
		id: "automorphism",
		pattern: /automorphism|asymmetric|trivial[- ]automorphism/i,
		title: "Automorphism group",
		summary: "The incidence-preserving relabelings of a candidate. A trivial automorphism group means no nonidentity relabeling preserves the structure.",
		relation: "Asymmetric candidates diversify the laboratory and reduce the chance that a measurement is merely an artifact of a shared symmetry family.",
		scope: "Low symmetry is a diversity filter, not evidence that a candidate is geometrically realizable."
	},
	{
		id: "slack",
		pattern: /reduced[- ]slack|slack model|RSEVC/i,
		title: "Reduced slack model",
		summary: "A coordinate-like algebraic encoding with scaling redundancies removed, used here to estimate how many genuinely interacting variables a candidate presents.",
		relation: "A recurring small nonlinear interface could point toward a reusable realization or obstruction method.",
		scope: "The planned measurements are complexity proxies; they are not realization certificates by themselves."
	},
	{
		id: "liftability",
		pattern: /liftability|deletion[- ]width|LDW/i,
		title: "Liftability deletion width",
		summary: "A bounded proxy for how much of a candidate must be removed before its remaining constraints become easier to lift or reconstruct.",
		relation: "It tests whether apparently complicated candidates share a small hard core that a later exact method could target.",
		scope: "This quantity was not measured in the current run because the sample-size gate failed."
	},
	{
		id: "v4",
		pattern: /\bV4\b|Klein four/i,
		title: "V₄ symmetry",
		summary: "The Klein four-group symmetry, generated by two commuting involutions, used to quotient a large configuration problem into smaller exact templates.",
		relation: "V₄ lanes trade global generality for sharply structured finite subproblems that can sometimes be certified exactly.",
		scope: "Closing a V₄ template does not settle candidates outside that symmetry class."
	},
	{
		id: "c2",
		pattern: /\bC2\b|involution/i,
		title: "C₂ symmetry",
		summary: "A two-element cyclic symmetry generated by one involution, providing another way to organize and canonicalize candidate families.",
		relation: "The current C₂ proposal is a correctness forensic: it asks where one expected canonical state disappeared before trusting a larger census.",
		scope: "Repairing bookkeeping changes confidence in the search, not the geometric existence status directly."
	},
	{
		id: "proof-object",
		pattern: /proof[- ]object|certificate|independent checker/i,
		title: "Proof object",
		summary: "A portable artifact—such as an exact identity, exhaustive ledger, or certificate—that a small independent checker can verify without trusting the producer.",
		relation: "Proof objects let the campaign convert expensive computation into durable, replayable mathematical evidence.",
		scope: "A producer transcript is reconnaissance until its exact object and assumptions are independently checked."
	}
];
function Jc(e, t = "") {
	return typeof e == "string" && e.trim() ? e.trim() : t;
}
function Yc(e) {
	return Array.isArray(e) ? e : [];
}
function Xc(e) {
	let t = Jc(e).toUpperCase();
	return t.includes("NOT_SUPPORTED") || t.includes("BLOCK") || t.includes("REFUT") ? "BLOCKED" : t.includes("UNMEASURED") || t.includes("UNCHANGED") || t.includes("OPEN") ? "UNMEASURED" : t.includes("SUPPORTED") || t.includes("ADVANCED") ? "SUPPORTED" : t.includes("PENDING") || t.includes("PROPOSED") ? "PROPOSED" : "CONTEXT";
}
function Zc(e) {
	let t = Yc(e?.researchRuns).filter((e) => [
		"launching",
		"running",
		"blocked",
		"evidence_ready",
		"returned_to_sol"
	].includes(e?.status)).sort((e, t) => Jc(t?.updatedAt).localeCompare(Jc(e?.updatedAt)))[0];
	return Jc(t?.strategy?.trackId, Jc(e?.researchPlan?.response?.lanes?.[0]?.strategy?.trackId));
}
function Qc(e, t) {
	let n = `${Jc(e?.claimId)} ${Jc(e?.summary)}`.toUpperCase();
	return n.includes("ASYM") || n.includes("SUPPLY") || n.includes("CANDIDATE") ? "supply" : n.includes("GEOMETRIC") || n.includes("REALIZATION") || n.includes("DECISION") ? "decision" : n.includes("COVERAGE") || n.includes("CENSUS") || n.includes("V4") || n.includes("C2") ? "coverage" : t;
}
function $c(e) {
	let t = e?.wave?.synthesis?.response || null, n = e?.researchPlan?.response || null, r = t?.operatorBrief || {}, i = e?.strategy?.charter || {}, a = !!(n && [
		"RESEARCH_REVIEW",
		"RESEARCH_READY",
		"REVISING"
	].includes(Jc(e?.phase))), o = a ? "checked-plan" : t ? "frozen-synthesis" : n ? "checked-plan" : "campaign-state", s = Zc(e), c = {
		id: "campaign-objective",
		kind: "objective",
		kicker: "NORTH STAR",
		title: Jc(i.question, Jc(e?.role, "Campaign objective")),
		summary: Jc(i.thesis, "Advance the campaign's central mathematical question through bounded, independently checkable evidence."),
		state: "OPEN",
		why: "Every lane should change a denominator, candidate supply, candidate decision, or the confidence in a reusable method.",
		relation: "This objective owns the strategic tracks and provides the test for whether activity is genuine progress.",
		scope: ["The objective remains open until promotion-grade evidence changes its mathematical status."]
	}, l = {
		id: "current-quest",
		kind: "quest",
		kicker: "CURRENT QUEST",
		title: a ? Jc(n?.summary, "Shape the next bounded wave from the synthesized result.") : Jc(r.headline, Jc(n?.summary, `Campaign phase: ${Jc(e?.phase, "planning").replaceAll("_", " ")}`)),
		summary: a ? Jc(n?.operatorGuidance, "The synthesis is being translated into checked, resource-bounded launch contracts.") : Jc(r.whereWeAre, Jc(n?.operatorGuidance, Jc(e?.wave?.aggregate?.nextBoundary, c.summary))),
		state: a ? "ACTIVE" : e?.phase === "DECISION_REQUIRED" ? "SUPPORTED" : "ACTIVE",
		trackId: s,
		why: a ? "This is the current planning problem: decide which proposed branch best converts the last result into the next defensible knowledge gain." : Jc(r.currentFocus, "This is the narrowest currently authorized move that can improve the campaign's knowledge state."),
		relation: `This quest advances the ${s || "current"} track while remaining subordinate to the campaign objective.`,
		evidence: Yc(r.recentProgress).map((e) => Jc(e)).filter(Boolean),
		scope: Yc(r.watchouts).map((e) => Jc(e)).filter(Boolean)
	}, u = (a && Yc(n?.lanes).length ? Yc(n.lanes).filter((e) => Jc(e?.action).toUpperCase() !== "DROP") : Yc(t?.nextWave?.lanes).length ? Yc(t.nextWave.lanes) : Yc(n?.lanes)).filter(Boolean), d = new Set(a ? u.map((e) => Jc(e?.strategy?.trackId, Jc(e?.trackId))).filter(Boolean) : [s].filter(Boolean)), f = {
		id: "next-decision",
		kind: "decision",
		kicker: "HUMAN DECISION",
		title: a ? "Approve, revise, or block the checked next-wave plan." : Jc(r.nextDecision, Jc(n?.operatorGuidance, "Choose the next bounded campaign move.")),
		summary: a ? Jc(n?.operatorGuidance, Jc(n?.summary)) : Jc(t?.nextWave?.objective, Jc(n?.summary, "Select only work whose expected knowledge delta justifies its resource and evidence contract.")),
		state: e?.controlState?.recovery?.required ? "BLOCKED" : "PROPOSED",
		why: "The campaign branches here; no proposal acquires authority until the operator chooses and a checked schedule is frozen.",
		relation: "The selected branch returns to the main campaign line through planning, evidence intake, synthesis, and another explicit decision.",
		unlocks: u.map((e) => Jc(e?.objective, Jc(e?.question, Jc(e?.taskId)))).filter(Boolean)
	}, p = Yc(i.tracks).map((e) => ({
		id: `track-${Jc(e?.id, "unknown")}`,
		kind: "track",
		kicker: `${Math.round(Number(e?.targetShare || 0) * 100)}% TARGET`,
		title: Jc(e?.label, Jc(e?.id, "Research track")),
		summary: Jc(e?.purpose, "A persistent route from bounded work back to the campaign objective."),
		state: d.has(Jc(e?.id)) ? "ACTIVE" : "OPEN",
		trackId: Jc(e?.id),
		relation: `This track is one of ${Math.max(1, Yc(i.tracks).length)} balanced routes to the campaign objective.`,
		metrics: Yc(e?.metrics).map((e) => Jc(e)).filter(Boolean),
		color: Jc(e?.color, "#71d6a0")
	})), m = Yc(t?.claimDeltas).map((e, t) => ({
		id: `claim-${Jc(e?.claimId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
		kind: "claim",
		kicker: "KNOWLEDGE DELTA",
		title: Jc(e?.summary, Jc(e?.claimId, "Claim update")),
		summary: Jc(e?.summary, "The synthesis recorded a bounded change in campaign knowledge."),
		state: Xc(e?.proposedStatus),
		trackId: Qc(e, s),
		why: `Status: ${Jc(e?.proposedStatus, "context only").replaceAll("_", " ")}.`,
		relation: "Claim deltas are the bridge between a completed lane and measurable progress toward the campaign objective.",
		evidence: Yc(e?.evidence).map((e) => Jc(e)).filter(Boolean),
		scope: Yc(e?.objections).map((e) => Jc(e)).filter(Boolean)
	})), h = u.map((e, t) => {
		let r = Yc(n?.lanes).find((t) => t?.taskId === e?.taskId) || e, i = Jc(r?.strategy?.trackId, Jc(e?.trackId, "unassigned"));
		return {
			id: `proposal-${Jc(e?.taskId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
			kind: "proposal",
			kicker: `PROPOSED · ${Jc(r?.strategy?.workKind, "research").toUpperCase()}`,
			title: Jc(e?.objective, Jc(r?.question, Jc(e?.taskId, "Bounded follow-up"))),
			summary: Jc(r?.rationale, Jc(e?.objective, "A bounded follow-up proposed by synthesis.")),
			state: "PROPOSED",
			trackId: i,
			why: Jc(r?.strategy?.expectedDelta, "It is proposed because it can change a named campaign metric."),
			relation: `This branch feeds the ${i} track and still requires a checked plan and human-confirmed schedule.`,
			evidence: [Jc(r?.evidenceExpected)].filter(Boolean),
			scope: [Jc(r?.stopCondition)].filter(Boolean),
			unlocks: [Jc(r?.strategy?.expectedDelta)].filter(Boolean)
		};
	}), g = JSON.stringify({
		objective: c,
		quest: l,
		decision: f,
		claims: m,
		proposals: h
	}), _ = qc.filter((e) => e.pattern.test(g)).map((e) => ({
		id: `concept-${e.id}`,
		kind: "concept",
		kicker: "OBJECT CODEX",
		title: e.title,
		summary: e.summary,
		state: "CONTEXT",
		why: e.relation,
		relation: "This explainer is educational context; use the linked claim and evidence nodes for campaign authority.",
		scope: [e.scope]
	}));
	return {
		source: o,
		objective: c,
		quest: l,
		decision: f,
		progress: Yc(r.recentProgress).map((e) => Jc(e)).filter(Boolean),
		watchouts: Yc(r.watchouts).map((e) => Jc(e)).filter(Boolean),
		tracks: p,
		claims: m,
		proposals: h,
		concepts: _
	};
}
function el(e) {
	return {
		ACTIVE: "Current bounded focus; activity is not automatically mathematical progress.",
		OPEN: "Open objective or track; no terminal mathematical conclusion is implied.",
		SUPPORTED: "Supported within the displayed evidence and scope; promotion may still require independent intake.",
		PROPOSED: "Advisory only; this branch has no launch or claim authority.",
		UNMEASURED: "The relevant question or quantity remains unchanged or was not measured.",
		BLOCKED: "The displayed evidence does not support this claim or the transition is presently gated.",
		CONTEXT: "Educational context only; it does not carry campaign authority."
	}[e];
}
//#endregion
//#region src/ui/CampaignInterpretation.svelte
Go();
var tl = /* @__PURE__ */ K("<li><b></b><span> </span></li>"), nl = /* @__PURE__ */ K("<ol></ol>"), rl = /* @__PURE__ */ K("<p>No synthesized progress delta is available yet.</p>"), il = /* @__PURE__ */ K("<li> </li>"), al = /* @__PURE__ */ K("<div class=\"brief-ledger\"><section><header><span>WHAT CHANGED</span><strong> </strong></header> <!></section> <details open=\"\"><summary><span>SCOPE & WATCHOUTS</span><strong> </strong></summary> <ul></ul></details></div>"), ol = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button>"), sl = /* @__PURE__ */ K("<div class=\"atlas-empty\"><span>OPEN CAPACITY</span><strong>No current claim or proposed lane is assigned here.</strong></div>"), cl = /* @__PURE__ */ K("<section class=\"atlas-track\"><button><span> </span><strong> </strong><small> </small></button> <div><!></div></section>"), ll = /* @__PURE__ */ K("<button><span>CONTEXT</span><strong> </strong></button>"), ul = /* @__PURE__ */ K("<section class=\"object-codex\"><header><span>OBJECT CODEX</span><strong>Learn the mathematical pieces on this map</strong></header> <div></div></section>"), dl = /* @__PURE__ */ K("<details open=\"\"><summary>Evidence <strong> </strong></summary><ul></ul></details>"), fl = /* @__PURE__ */ K("<details open=\"\"><summary>Scope & objections <strong> </strong></summary><ul></ul></details>"), pl = /* @__PURE__ */ K("<details><summary>What this could unlock <strong> </strong></summary><ul></ul></details>"), ml = /* @__PURE__ */ K("<details><summary>Progress measures <strong> </strong></summary><ul></ul></details>"), hl = /* @__PURE__ */ K("<div class=\"atlas-inspector-lists\"><!> <!> <!> <!></div>"), gl = /* @__PURE__ */ K("<aside aria-live=\"polite\"><header><div><span> </span><h4> </h4></div><strong> </strong></header> <div class=\"atlas-inspector-grid\"><section><span>WHAT THIS IS</span><p> </p></section> <section><span>WHY IT MATTERS</span><p> </p></section> <section><span>HOW IT CONNECTS</span><p> </p></section> <section><span>AUTHORITY</span><p> </p></section></div> <!></aside>"), _l = /* @__PURE__ */ K("<section class=\"interpretation-surface\" id=\"campaign-interpretation\" aria-label=\"Campaign interpretation and research atlas\"><header class=\"interpretation-heading\"><div><p>CAMPAIGN INTERPRETATION</p> <h2>Understand the mission before choosing the move</h2> <span>A generated briefing and explorable mathematical map, grounded in the same frozen evidence as the control plane.</span></div> <strong> </strong></header> <div class=\"director-deck\"><button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button></div> <!> <section class=\"research-atlas\" aria-label=\"Research Atlas\"><header><div><p>RESEARCH ATLAS</p><h3>How bounded work connects back to the campaign objective</h3><span>Select any station to inspect its meaning, evidence, scope, and unlocks.</span></div> <div class=\"atlas-legend\" aria-label=\"Interpretation status legend\"><span class=\"supported\">SUPPORTED</span><span class=\"proposed\">PROPOSED</span><span class=\"unmeasured\">UNMEASURED</span><span class=\"blocked\">BLOCKED</span><span class=\"context\">CONTEXT</span></div></header> <div class=\"atlas-board\"><div class=\"atlas-north-star\"><button><span>NORTH STAR</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>CURRENT KNOWLEDGE</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>NEXT BRANCH</span><strong> </strong></button></div> <div class=\"atlas-track-list\"></div> <!></div> <!> <footer><b>INTERPRETATION IS NOT AUTHORITY</b><span>Generated prose helps navigate. Exact receipts, claim states, and human gates remain the source of campaign authority.</span></footer></section></section>");
function vl(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I("campaign-objective"), l = /* @__PURE__ */ I("");
	function u(e) {
		return e ? [
			e.objective,
			e.quest,
			e.decision,
			...e.tracks,
			...e.claims,
			...e.proposals,
			...e.concepts
		] : [];
	}
	function d(e, t) {
		return [...e.claims, ...e.proposals].filter((e) => e.trackId === t);
	}
	function f(e) {
		L(c, e.id), requestAnimationFrame(() => document.querySelector(".atlas-inspector")?.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		}));
	}
	V(() => n(), () => {
		L(o, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => (U(o), $c), () => {
		L(s, U(o) ? $c(U(o)) : null);
	}), V(() => (U(o), U(l)), () => {
		U(o)?.id !== U(l) && (L(l, U(o)?.id || ""), L(c, "campaign-objective"));
	}), V(() => (U(s), U(c)), () => {
		L(a, u(U(s)).find((e) => e.id === U(c)) || U(s)?.objective || null);
	}), Br(), xo();
	var p = ua(), m = z(p), h = (e) => {
		var t = _l(), n = R(t), r = B(R(n), 2), i = R(r, !0);
		P(r), P(n);
		var o = B(n, 2), c = R(o), l = R(c), u = R(l, !0);
		P(l);
		var p = B(l, 2), m = R(p, !0);
		P(p);
		var h = B(p, 2), g = R(h, !0);
		P(h);
		var _ = B(h, 2), v = R(_, !0);
		P(_), P(c);
		var y = B(c, 4), b = R(y), x = R(b, !0);
		P(b);
		var S = B(b, 2), C = R(S, !0);
		P(S);
		var w = B(S, 2), T = R(w, !0);
		P(w);
		var E = B(w, 2), D = R(E, !0);
		P(E), P(y);
		var O = B(y, 4), k = R(O), A = R(k, !0);
		P(k);
		var j = B(k, 2), ee = R(j, !0);
		P(j);
		var M = B(j, 2), N = R(M, !0);
		P(M);
		var te = B(M, 2), ne = R(te, !0);
		P(te), P(O), P(o);
		var re = B(o, 2), ie = (e) => {
			var t = al(), n = R(t), r = R(n), i = B(R(r)), a = R(i);
			P(i), P(r);
			var o = B(r, 2), c = (e) => {
				var t = nl();
				X(t, 5, () => (U(s), W(() => U(s).progress)), ya, (e, t, n) => {
					var r = tl(), i = R(r);
					i.textContent = n + 1;
					var a = B(i), o = R(a, !0);
					P(a), P(r), H(() => J(o, U(t))), q(e, r);
				}), P(t), q(e, t);
			}, l = (e) => {
				q(e, rl());
			};
			Y(o, (e) => {
				U(s), W(() => U(s).progress.length) ? e(c) : e(l, -1);
			}), P(n);
			var u = B(n, 2), d = R(u), f = B(R(d)), p = R(f);
			P(f), P(d);
			var m = B(d, 2);
			X(m, 5, () => (U(s), W(() => U(s).watchouts)), ya, (e, t) => {
				var n = il(), r = R(n, !0);
				P(n), H(() => J(r, U(t))), q(e, n);
			}), P(m), P(u), P(t), H(() => {
				J(a, `${U(s), W(() => U(s).progress.length) ?? ""} evidence-backed update${U(s), W(() => U(s).progress.length === 1 ? "" : "s") ?? ""}`), J(p, `${U(s), W(() => U(s).watchouts.length) ?? ""} boundary note${U(s), W(() => U(s).watchouts.length === 1 ? "" : "s") ?? ""}`);
			}), q(e, t);
		};
		Y(re, (e) => {
			U(s), W(() => U(s).progress.length || U(s).watchouts.length) && e(ie);
		});
		var ae = B(re, 2), oe = B(R(ae), 2), se = R(oe), ce = R(se);
		let le;
		var ue = B(R(ce)), de = R(ue, !0);
		P(ue), P(ce);
		var fe = B(ce, 4);
		let pe;
		var me = B(R(fe)), he = R(me, !0);
		P(me), P(fe);
		var ge = B(fe, 4);
		let _e;
		var ve = B(R(ge)), ye = R(ve, !0);
		P(ve), P(ge), P(se);
		var be = B(se, 2);
		X(be, 5, () => (U(s), W(() => U(s).tracks)), (e) => e.id, (e, t) => {
			var n = cl(), r = R(n);
			let i;
			var o = R(r), c = R(o, !0);
			P(o);
			var l = B(o), u = R(l, !0);
			P(l);
			var p = B(l), m = R(p, !0);
			P(p), P(r);
			var h = B(r, 2);
			let g;
			var _ = R(h), v = (e) => {
				var n = ua();
				X(z(n), 1, () => (U(s), U(t), W(() => d(U(s), U(t).trackId))), (e) => e.id, (e, t) => {
					var n = ol();
					let r;
					var i = R(n), o = R(i, !0);
					P(i);
					var s = B(i), c = R(s, !0);
					P(s);
					var l = B(s), u = R(l, !0);
					P(l), P(n), H((e) => {
						r = Z(n, 1, `atlas-station state-${e ?? ""}`, null, r, { chosen: U(a)?.id === U(t).id }), J(o, (U(t), W(() => U(t).kicker))), J(c, (U(t), W(() => U(t).title))), J(u, (U(t), W(() => U(t).state)));
					}, [() => (U(t), W(() => U(t).state.toLowerCase()))]), G("click", n, () => f(U(t))), q(e, n);
				}), q(e, n);
			}, y = /* @__PURE__ */ F(() => (U(s), U(t), W(() => d(U(s), U(t).trackId).length))), b = (e) => {
				q(e, sl());
			};
			Y(_, (e) => {
				U(y) ? e(v) : e(b, -1);
			}), P(h), P(n), H((e, o) => {
				Ha(n, (U(t), W(() => `--track-color:${U(t).color || "#71d6a0"}`))), i = Z(r, 1, `atlas-track-label state-${e ?? ""}`, null, i, { chosen: U(a)?.id === U(t).id }), J(c, (U(t), W(() => U(t).kicker))), J(u, (U(t), W(() => U(t).title))), J(m, (U(t), W(() => U(t).state === "ACTIVE" ? "current route" : "persistent route"))), g = Z(h, 1, "atlas-rail", null, g, o);
			}, [() => (U(t), W(() => U(t).state.toLowerCase())), () => ({ empty: !d(U(s), U(t).trackId).length })]), G("click", r, () => f(U(t))), q(e, n);
		}), P(be);
		var xe = B(be, 2), Se = (e) => {
			var t = ul(), n = B(R(t), 2);
			X(n, 5, () => (U(s), W(() => U(s).concepts)), (e) => e.id, (e, t) => {
				var n = ll();
				let r;
				var i = B(R(n)), o = R(i, !0);
				P(i), P(n), H(() => {
					r = Z(n, 1, "", null, r, { chosen: U(a)?.id === U(t).id }), J(o, (U(t), W(() => U(t).title)));
				}), G("click", n, () => f(U(t))), q(e, n);
			}), P(n), P(t), q(e, t);
		};
		Y(xe, (e) => {
			U(s), W(() => U(s).concepts.length) && e(Se);
		}), P(oe);
		var Ce = B(oe, 2), we = (e) => {
			var t = gl(), n = R(t), r = R(n), i = R(r), o = R(i);
			P(i);
			var s = B(i), c = R(s, !0);
			P(s), P(r);
			var l = B(r), u = R(l, !0);
			P(l), P(n);
			var d = B(n, 2), f = R(d), p = B(R(f)), m = R(p, !0);
			P(p), P(f);
			var h = B(f, 2), g = B(R(h)), _ = R(g, !0);
			P(g), P(h);
			var v = B(h, 2), y = B(R(v)), b = R(y, !0);
			P(y), P(v);
			var x = B(v, 2), S = B(R(x)), C = R(S, !0);
			P(S), P(x), P(d);
			var w = B(d, 2), T = (e) => {
				var t = hl(), n = R(t), r = (e) => {
					var t = dl(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).evidence)), ya, (e, t) => {
						var n = il(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).evidence.length)))), q(e, t);
				};
				Y(n, (e) => {
					U(a), W(() => U(a).evidence?.length) && e(r);
				});
				var i = B(n, 2), o = (e) => {
					var t = fl(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).scope)), ya, (e, t) => {
						var n = il(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).scope.length)))), q(e, t);
				};
				Y(i, (e) => {
					U(a), W(() => U(a).scope?.length) && e(o);
				});
				var s = B(i, 2), c = (e) => {
					var t = pl(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).unlocks)), ya, (e, t) => {
						var n = il(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).unlocks.length)))), q(e, t);
				};
				Y(s, (e) => {
					U(a), W(() => U(a).unlocks?.length) && e(c);
				});
				var l = B(s, 2), u = (e) => {
					var t = ml(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).metrics)), ya, (e, t) => {
						var n = il(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).metrics.length)))), q(e, t);
				};
				Y(l, (e) => {
					U(a), W(() => U(a).metrics?.length) && e(u);
				}), P(t), q(e, t);
			};
			Y(w, (e) => {
				U(a), W(() => U(a).evidence?.length || U(a).scope?.length || U(a).unlocks?.length || U(a).metrics?.length) && e(T);
			}), P(t), H((e, n, r) => {
				Z(t, 1, `atlas-inspector state-${e ?? ""}`), J(o, `${U(a), W(() => U(a).kicker) ?? ""} · ${n ?? ""}`), J(c, (U(a), W(() => U(a).title))), J(u, (U(a), W(() => U(a).state))), J(m, (U(a), W(() => U(a).summary))), J(_, (U(a), W(() => U(a).why || "It provides a typed connection between bounded activity and the campaign objective."))), J(b, (U(a), W(() => U(a).relation || "It rejoins the campaign through the normal evidence and decision gates."))), J(C, r);
			}, [
				() => (U(a), W(() => U(a).state.toLowerCase())),
				() => (U(a), W(() => U(a).kind.toUpperCase())),
				() => (Si(el), U(a), W(() => el(U(a).state)))
			]), q(e, t);
		};
		Y(Ce, (e) => {
			U(a) && e(we);
		}), Ke(2), P(ae), P(t), H((e, t, n, o) => {
			Z(r, 1, `source-${U(s), W(() => U(s).source) ?? ""}`), J(i, e), Z(c, 1, `director-card objective state-${t ?? ""}`), J(u, (U(s), W(() => U(s).objective.kicker))), J(m, (U(s), W(() => U(s).objective.title))), J(g, (U(s), W(() => U(s).objective.summary))), J(v, (U(s), W(() => U(s).objective.state))), Z(y, 1, `director-card quest state-${n ?? ""}`), J(x, (U(s), W(() => U(s).quest.kicker))), J(C, (U(s), W(() => U(s).quest.title))), J(T, (U(s), W(() => U(s).quest.why))), J(D, (U(s), W(() => U(s).quest.state))), Z(O, 1, `director-card decision state-${o ?? ""}`), J(A, (U(s), W(() => U(s).decision.kicker))), J(ee, (U(s), W(() => U(s).decision.title))), J(N, (U(s), W(() => U(s).decision.summary))), J(ne, (U(s), W(() => U(s).decision.state))), le = Z(ce, 1, "", null, le, { chosen: U(a)?.id === U(s).objective.id }), J(de, (U(s), W(() => U(s).objective.title))), pe = Z(fe, 1, "", null, pe, { chosen: U(a)?.id === U(s).quest.id }), J(he, (U(s), W(() => U(s).quest.title))), _e = Z(ge, 1, "", null, _e, { chosen: U(a)?.id === U(s).decision.id }), J(ye, (U(s), W(() => U(s).decision.title)));
		}, [
			() => (U(s), W(() => U(s).source.replaceAll("-", " "))),
			() => (U(s), W(() => U(s).objective.state.toLowerCase())),
			() => (U(s), W(() => U(s).quest.state.toLowerCase())),
			() => (U(s), W(() => U(s).decision.state.toLowerCase()))
		]), G("click", c, () => f(U(s).objective)), G("click", y, () => f(U(s).quest)), G("click", O, () => f(U(s).decision)), G("click", ce, () => f(U(s).objective)), G("click", fe, () => f(U(s).quest)), G("click", ge, () => f(U(s).decision)), q(e, t);
	};
	Y(m, (e) => {
		U(s) && e(h);
	}), q(e, p), xt(), i();
}
//#endregion
//#region src/ui/ExternalPerspective.svelte
$i(["click"]), Go();
var yl = /* @__PURE__ */ K("<a target=\"_blank\" rel=\"noreferrer\">Open source ↗</a>"), bl = /* @__PURE__ */ K("<p class=\"redirect-error\"> </p>"), xl = /* @__PURE__ */ K("<div class=\"redirect-shift\"><span>Proposed shift</span><strong> </strong></div>"), Sl = /* @__PURE__ */ K("<div><span> </span><strong> </strong><p> </p></div>"), Cl = /* @__PURE__ */ K("<details><summary> </summary><div class=\"redirect-direction-list\"></div></details>"), wl = /* @__PURE__ */ K("<button class=\"outline-button\"> </button>"), Tl = /* @__PURE__ */ K("<div class=\"redirect-gate\"><small>Keep the review as context, or stage its questions for a separate plan review.</small><button class=\"primary-button\"> </button><!></div>"), El = /* @__PURE__ */ K("<p>Kept as campaign context. Its proposed questions were not staged.</p>"), Dl = /* @__PURE__ */ K("<article class=\"redirect-proposal\"><div class=\"redirect-proposal-heading\"><div><span> </span><strong> </strong></div><!></div> <!> <p> </p> <!> <!> <!> <!></article>"), Ol = /* @__PURE__ */ K("<div><span> </span><strong> </strong><small> </small></div>"), kl = /* @__PURE__ */ K("<details class=\"redirect-history\"><summary>Earlier external inputs <strong> </strong></summary><!></details>"), Al = /* @__PURE__ */ K("<div role=\"status\"> </div>"), jl = /* @__PURE__ */ K("<section id=\"external-perspective\"><div class=\"redirect-heading\"><div><p class=\"eyebrow\">EXTERNAL PERSPECTIVE</p><h3>Widen or redirect the campaign</h3><p>Drop in a paper, argument, observation, or reframing. It pauses autopilot at a safe boundary and asks Sol to reshape direction without dispatching or invalidating landed evidence.</p></div><span class=\"redirect-status\"> </span></div> <details class=\"redirect-composer\"><summary><span> </span><strong>Sol read-only pass</strong></summary> <div class=\"redirect-fields\"><input maxlength=\"240\" placeholder=\"Short title (optional)\"/><input maxlength=\"2000\" inputmode=\"url\" placeholder=\"Source link (optional)\"/></div> <textarea id=\"redirect-content\" rows=\"6\" maxlength=\"24000\" placeholder=\"Paste the relevant idea, critique, external result, or your own reframing…\"></textarea> <div class=\"redirect-submit\"><small>This becomes an immutable input bundle. Sol compares it with the current synthesis, checked plan, and run history.</small><button class=\"primary-button\"> </button></div></details> <!> <!> <!></section>");
function Ml(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(""), m = /* @__PURE__ */ I(""), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I("pending");
	function y(e) {
		return `lane-watch-redirect:${e}`;
	}
	function b(e) {
		L(f, e);
		let t = {
			title: "",
			sourceUrl: "",
			content: ""
		};
		try {
			t = JSON.parse(sessionStorage.getItem(y(e)) || JSON.stringify(t));
		} catch {}
		L(p, t.title), L(m, t.sourceUrl), L(h, t.content);
	}
	function x() {
		if (U(d)) try {
			sessionStorage.setItem(y(U(d).id), JSON.stringify({
				title: U(p),
				sourceUrl: U(m),
				content: U(h)
			}));
		} catch {}
	}
	function S(e, t = 420) {
		let n = String(e || "").trim().replace(/\s+/g, " ");
		return n.length <= t ? n : `${n.slice(0, t).replace(/\s+\S*$/, "")}…`;
	}
	function C(e = "") {
		let t = Date.now() - new Date(e).valueOf();
		if (!Number.isFinite(t)) return e || "unknown";
		let [n, r] = Math.abs(t) < 36e5 ? ["m", 6e4] : Math.abs(t) < 864e5 ? ["h", 36e5] : ["d", 864e5];
		return `${Math.max(1, Math.round(Math.abs(t) / r))}${n} ago`;
	}
	async function w() {
		if (!(!U(d) || !U(h).trim() || U(g))) {
			x(), L(g, "submit"), L(v, "pending"), L(_, "Freezing the input and starting a read-only Sol redirect pass…");
			try {
				await as({
					projectId: U(d).id,
					type: "campaign.redirect.submit",
					args: {
						title: U(p),
						sourceUrl: U(m),
						content: U(h)
					},
					scope: "external-perspective",
					pollLimit: 160
				}), L(p, ""), L(m, ""), L(h, "");
				try {
					sessionStorage.removeItem(y(U(d).id));
				} catch {}
				L(v, "success"), L(_, "The external perspective is frozen. Sol is comparing it with the campaign ledger.");
			} catch (e) {
				L(v, "error"), L(_, e instanceof Error ? e.message : String(e));
			} finally {
				L(g, "");
			}
		}
	}
	async function T(e, t) {
		if (!(!U(d) || U(g))) {
			L(g, "apply"), L(v, "pending"), L(_, t === "context-only" ? "Keeping the review as campaign context…" : "Staging the proposed questions for plan review…");
			try {
				await as({
					projectId: U(d).id,
					type: "campaign.redirect.apply",
					targetId: e,
					args: { mode: t },
					scope: "external-perspective"
				}), L(v, "success"), L(_, t === "context-only" ? "Kept as campaign context. No research requests were added; the current plan is unchanged." : "Questions are staged for plan review. No worker was launched.");
			} catch (e) {
				L(v, "error"), L(_, e instanceof Error ? e.message : String(e));
			} finally {
				L(g, "");
			}
		}
	}
	V(() => n(), () => {
		L(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => (U(d), U(f)), () => {
		U(d)?.id && U(d).id !== U(f) && b(U(d).id);
	}), V(() => U(d), () => {
		L(a, Array.isArray(U(d)?.externalInputs) ? U(d).externalInputs : []);
	}), V(() => U(a), () => {
		L(o, U(a)[0] || null);
	}), V(() => U(o), () => {
		L(s, U(o)?.response && typeof U(o).response == "object" ? U(o).response : {});
	}), V(() => U(s), () => {
		L(c, Array.isArray(U(s)?.newDirections) ? U(s).newDirections : []);
	}), V(() => U(a), () => {
		L(l, U(a).some((e) => ["queued", "drafting"].includes(e.status)));
	}), V(() => U(o), () => {
		L(u, {
			queued: "QUEUED",
			drafting: "SOL RESHAPING",
			drafted: "HUMAN GATE",
			applied: "APPLIED",
			failed: "FAILED"
		}[U(o)?.status] || "OPEN");
	}), Br(), xo();
	var E = ua(), D = z(E), O = (e) => {
		var t = jl(), n = R(t), r = B(R(n)), i = R(r, !0);
		P(r), P(n);
		var d = B(n, 2), f = R(d), y = R(f), b = R(y, !0);
		P(y), Ke(), P(f);
		var E = B(f, 2), D = R(E);
		no(D);
		var O = B(D);
		no(O), P(E);
		var k = B(E, 2);
		tn(k);
		var A = B(k, 2), j = B(R(A)), ee = R(j, !0);
		P(j), P(A), P(d);
		var M = B(d, 2), N = (e) => {
			var t = Dl(), n = R(t), r = R(n), i = R(r), a = R(i);
			P(i);
			var l = B(i), u = R(l, !0);
			P(l), P(r);
			var d = B(r), f = (e) => {
				var t = yl();
				H(() => Q(t, "href", (U(o), W(() => U(o).sourceUrl)))), q(e, t);
			};
			Y(d, (e) => {
				U(o), W(() => U(o).sourceUrl) && e(f);
			}), P(n);
			var p = B(n, 2), m = (e) => {
				var t = bl(), n = R(t, !0);
				P(t), H(() => J(n, (U(o), W(() => U(o).error)))), q(e, t);
			};
			Y(p, (e) => {
				U(o), W(() => U(o).error) && e(m);
			});
			var h = B(p, 2), _ = R(h, !0);
			P(h);
			var v = B(h, 2), y = (e) => {
				var t = xl(), n = B(R(t)), r = R(n, !0);
				P(n), P(t), H(() => J(r, (U(s), W(() => U(s).perspectiveShift)))), q(e, t);
			};
			Y(v, (e) => {
				U(s), W(() => U(s).perspectiveShift) && e(y);
			});
			var b = B(v, 2), x = (e) => {
				var t = Cl(), n = R(t), r = R(n);
				P(n);
				var i = B(n);
				X(i, 5, () => U(c), ya, (e, t) => {
					var n = Sl(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a);
					var s = B(a), c = R(s, !0);
					P(s), P(n), H(() => {
						J(i, (U(t), W(() => U(t).profile || "sonnet-worker"))), J(o, (U(t), W(() => U(t).question || "Direction"))), J(c, (U(t), W(() => U(t).rationale || "")));
					}), q(e, n);
				}), P(i), P(t), H(() => J(r, `Inspect ${U(c), W(() => U(c).length) ?? ""} proposed direction${U(c), W(() => U(c).length === 1 ? "" : "s") ?? ""}`)), q(e, t);
			};
			Y(b, (e) => {
				U(c), W(() => U(c).length) && e(x);
			});
			var w = B(b, 2), E = (e) => {
				var t = Tl(), n = B(R(t)), r = R(n, !0);
				P(n);
				var i = B(n), a = (e) => {
					var t = wl(), n = R(t);
					P(t), H((e) => {
						t.disabled = e, J(n, `Stage ${U(c), W(() => U(c).length) ?? ""} proposed question${U(c), W(() => U(c).length === 1 ? "" : "s") ?? ""}`);
					}, [() => (U(g), W(() => !!U(g)))]), G("click", t, () => T(U(o).id, "stage-directions")), q(e, t);
				};
				Y(i, (e) => {
					U(s), U(c), W(() => U(s).decision === "READY_FOR_GATE" && U(c).length) && e(a);
				}), P(t), H((e) => {
					n.disabled = e, J(r, U(g) === "apply" ? "Applying…" : "Keep as campaign context");
				}, [() => (U(g), W(() => !!U(g)))]), G("click", n, () => T(U(o).id, "context-only")), q(e, t);
			};
			Y(w, (e) => {
				U(o), W(() => U(o).status === "drafted") && e(E);
			});
			var D = B(w, 2), O = (e) => {
				q(e, El());
			};
			Y(D, (e) => {
				U(o), W(() => U(o).status === "applied" && U(o).applicationMode === "context-only") && e(O);
			}), P(t), H((e, t) => {
				J(a, `${U(o), W(() => U(o).status) ?? ""} · ${e ?? ""}`), J(u, (U(o), W(() => U(o).title))), J(_, t);
			}, [() => (U(o), W(() => C(U(o).updatedAt))), () => (U(s), U(o), W(() => U(s).summary || (U(o).status === "drafting" ? "Sol is comparing this input against the current evidence, plan, and campaign assumptions." : S(U(o).content, 360))))]), q(e, t);
		};
		Y(M, (e) => {
			U(o) && e(N);
		});
		var te = B(M, 2), ne = (e) => {
			var t = kl(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n), X(B(n), 1, () => (U(a), W(() => U(a).slice(1))), ya, (e, t) => {
				var n = Ol(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H((e) => {
					J(i, (U(t), W(() => U(t).status))), J(o, (U(t), W(() => U(t).title))), J(c, e);
				}, [() => (U(t), W(() => C(U(t).updatedAt)))]), q(e, n);
			}), P(t), H(() => J(i, (U(a), W(() => U(a).length - 1)))), q(e, t);
		};
		Y(te, (e) => {
			U(a), W(() => U(a).length > 1) && e(ne);
		});
		var re = B(te, 2), ie = (e) => {
			var t = Al(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `gate-feedback redirect-feedback ${U(v) ?? ""}`), J(n, U(_));
			}), q(e, t);
		};
		Y(re, (e) => {
			U(_) && e(ie);
		}), P(t), H((e) => {
			Z(t, 1, `redirect-intake ${U(o), W(() => U(o)?.status || "open") ?? ""}`), J(i, U(u)), d.open = (U(a), W(() => !U(a).length)), J(b, (U(a), W(() => U(a).length ? "Add another perspective" : "Add an external perspective"))), j.disabled = e, J(ee, U(l) ? "Redirect already running" : U(g) === "submit" ? "Freezing perspective…" : "Ask Sol to reshape the campaign");
		}, [() => (U(h), U(l), U(g), W(() => !U(h).trim() || U(l) || !!U(g)))]), G("input", D, x), uo(D, () => U(p), (e) => L(p, e)), G("input", O, x), uo(O, () => U(m), (e) => L(m, e)), G("input", k, x), uo(k, () => U(h), (e) => L(h, e)), G("click", j, w), q(e, t);
	};
	Y(D, (e) => {
		U(d) && e(O);
	}), q(e, E), xt(), i();
}
//#endregion
//#region src/ui/CoordinatorConsole.svelte
$i(["input", "click"]), Go();
var Nl = /* @__PURE__ */ K("<div><button class=\"outline-button compact\">Decline</button><button class=\"danger-button\">Accept</button></div>"), Pl = /* @__PURE__ */ K("<article><div><strong> </strong><p> </p></div><!></article>"), Fl = /* @__PURE__ */ K("<section class=\"coordinator-approvals\"><h3>Tool approval requests</h3><!></section>"), Il = /* @__PURE__ */ K("<p>Syncing coordinator history…</p>"), Ll = /* @__PURE__ */ K("<article><span> </span><p> </p></article>"), Rl = /* @__PURE__ */ K("<p>No coordinator messages are loaded yet.</p>"), zl = /* @__PURE__ */ K("<button class=\"danger-button\">Interrupt turn</button>"), Bl = /* @__PURE__ */ K("<div class=\"coordinator-boundary\"><strong>Semantic coordinator</strong><p>Plans, synthesizes, and checks direction. Dispatch, claim promotion, merges, pushes, and tool approvals remain separate gates.</p></div> <!> <div class=\"coordinator-transcript\" aria-live=\"polite\"><!></div> <div class=\"coordinator-composer\"><textarea rows=\"3\" maxlength=\"12000\" placeholder=\"Message Sol…\"></textarea><div><small>Messages may steer an active turn; they do not bypass campaign gates.</small><button class=\"primary-button\"> </button></div></div> <div class=\"coordinator-utility\"><button class=\"outline-button compact\">Sync history</button><!></div>", 1), Vl = /* @__PURE__ */ K("<button><strong> </strong><span> </span></button>"), Hl = /* @__PURE__ */ K("<p>No attachable workspace tasks found.</p>"), Ul = /* @__PURE__ */ K("<div class=\"coordinator-candidates\"><!><!></div>"), Wl = /* @__PURE__ */ K("<div class=\"coordinator-boundary\"><strong>Attach an existing Codex task</strong><p>Lane Watch will verify workspace eligibility before attaching it as the campaign’s semantic coordinator.</p></div> <button class=\"primary-button\"> </button> <!>", 1), Gl = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), Kl = /* @__PURE__ */ K("<details class=\"coordinator-console\" id=\"coordinator-console\"><summary><span><small>SOL COORDINATOR</small><strong> </strong></span><span> </span></summary> <div class=\"coordinator-console-body\"><!> <!></div></details>");
function ql(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I(""), f = /* @__PURE__ */ I(null), p = "", m = /* @__PURE__ */ I(!1), h = /* @__PURE__ */ I(null);
	async function g(e = !1) {
		if (!(!U(c)?.coordinator?.attached || U(m) || !e && p === U(c).id && U(f))) {
			L(m, !0);
			try {
				let e = await fetch(`/api/codex/conversation?project=${encodeURIComponent(U(c).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(t.error || "Could not read coordinator history");
				L(f, t), p = U(c).id;
			} catch (e) {
				L(d, e instanceof Error ? e.message : String(e));
			} finally {
				L(m, !1);
			}
		}
	}
	async function _(e, t = {}, n = "") {
		if (!(!U(c) || U(u))) {
			L(u, e), L(d, "Working…");
			try {
				await as({
					projectId: U(c).id,
					type: e,
					targetId: n,
					args: t,
					scope: "coordinator-console",
					pollLimit: 160
				}), L(d, "Coordinator control settled."), e === "coordinator.message.send" && (L(l, ""), setTimeout(() => void g(!0), 500));
			} catch (e) {
				L(d, e instanceof Error ? e.message : String(e));
			} finally {
				L(u, "");
			}
		}
	}
	async function v() {
		if (!(!U(c) || U(u))) {
			L(u, "discover");
			try {
				let e = await fetch(`/api/codex/threads?project=${encodeURIComponent(U(c).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(t.error || "Could not list Codex tasks");
				L(h, t.threads || []);
			} catch (e) {
				L(d, e instanceof Error ? e.message : String(e));
			} finally {
				L(u, "");
			}
		}
	}
	function y(e, t = 900) {
		let n = String(e || "").trim();
		return n.length <= t ? n : `${n.slice(0, t)}…`;
	}
	V(() => n(), () => {
		L(c, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(c), () => {
		L(a, U(c)?.coordinator || null);
	}), V(() => U(f), () => {
		L(o, (U(f)?.turns || []).flatMap((e) => e.messages || []).slice(-12));
	}), V(() => U(c), () => {
		L(s, Array.isArray(U(c)?.approvals) ? U(c).approvals.filter((e) => e.status === "pending") : []);
	}), Br(), xo();
	var b = ua(), x = z(b), S = (e) => {
		var t = Kl(), n = R(t), r = R(n), i = B(R(r)), c = R(i, !0);
		P(i), P(r);
		var f = B(r), p = R(f);
		P(f), P(n);
		var b = B(n, 2), x = R(b), S = (e) => {
			var t = Bl(), n = B(z(t), 2), r = (e) => {
				var t = Fl();
				X(B(R(t)), 1, () => U(s), ya, (e, t) => {
					var n = Pl(), r = R(n), i = R(r), a = R(i, !0);
					P(i);
					var o = B(i), s = R(o, !0);
					P(o), P(r);
					var c = B(r), l = (e) => {
						var n = Nl(), r = R(n), i = B(r);
						P(n), G("click", r, () => _("approval.respond", {
							requestId: U(t).id,
							decision: "decline"
						})), G("click", i, () => _("approval.respond", {
							requestId: U(t).id,
							decision: "accept"
						})), q(e, n);
					};
					Y(c, (e) => {
						U(t), W(() => U(t).supported) && e(l);
					}), P(n), H(() => {
						J(a, (U(t), W(() => U(t).title || U(t).tool || "Approval requested"))), J(s, (U(t), W(() => U(t).reason || U(t).detail)));
					}), q(e, n);
				}), P(t), q(e, t);
			};
			Y(n, (e) => {
				U(s), W(() => U(s).length) && e(r);
			});
			var i = B(n, 2), c = R(i), d = (e) => {
				q(e, Il());
			}, f = (e) => {
				var t = ua();
				X(z(t), 1, () => U(o), (e) => e.id, (e, t) => {
					var n = Ll(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						Z(n, 1, Fa((U(t), W(() => U(t).role)))), J(i, (U(t), W(() => U(t).role))), J(o, e);
					}, [() => (U(t), W(() => y(U(t).text)))]), q(e, n);
				}), q(e, t);
			}, p = (e) => {
				q(e, Rl());
			};
			Y(c, (e) => {
				U(m) ? e(d) : (U(o), W(() => U(o).length) ? e(f, 1) : e(p, -1));
			}), P(i);
			var h = B(i, 2), v = R(h);
			tn(v);
			var b = B(v), x = B(R(b)), S = R(x, !0);
			P(x), P(b), P(h);
			var C = B(h, 2), w = R(C), T = B(w), E = (e) => {
				var t = zl();
				H((e) => t.disabled = e, [() => (U(u), W(() => !!U(u)))]), G("click", t, () => _("coordinator.interrupt")), q(e, t);
			};
			Y(T, (e) => {
				U(a), W(() => U(a).status === "working" && U(a).lastTurnId) && e(E);
			}), P(C), H((e) => {
				x.disabled = e, J(S, U(u) === "coordinator.message.send" ? "Sending…" : "Send message"), w.disabled = U(m);
			}, [() => (U(l), U(u), W(() => !U(l).trim() || !!U(u)))]), uo(v, () => U(l), (e) => L(l, e)), G("click", x, () => _("coordinator.message.send", { message: U(l) })), G("click", w, () => g(!0)), q(e, t);
		}, C = (e) => {
			var t = Wl(), n = B(z(t), 2), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = Ul(), n = R(t);
				X(n, 1, () => (U(h), W(() => U(h).filter((e) => e.eligible !== !1).slice(0, 12))), ya, (e, t) => {
					var n = Vl(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						n.disabled = e, J(i, (U(t), W(() => U(t).name))), J(o, (U(t), W(() => U(t).cwd)));
					}, [() => (U(u), W(() => !!U(u)))]), G("click", n, () => _("coordinator.attach", { threadId: U(t).id })), q(e, n);
				});
				var r = B(n), i = (e) => {
					q(e, Hl());
				}, a = /* @__PURE__ */ F(() => (U(h), W(() => !U(h).some((e) => e.eligible !== !1))));
				Y(r, (e) => {
					U(a) && e(i);
				}), P(t), q(e, t);
			};
			Y(i, (e) => {
				U(h) && e(a);
			}), H((e) => {
				n.disabled = e, J(r, U(u) === "discover" ? "Finding tasks…" : "Find Codex tasks");
			}, [() => (U(u), W(() => !!U(u)))]), G("click", n, v), q(e, t);
		};
		Y(x, (e) => {
			U(a), W(() => U(a)?.attached) ? e(S) : e(C, -1);
		});
		var w = B(x, 2), T = (e) => {
			var t = Gl(), n = R(t, !0);
			P(t), H(() => J(n, U(d))), q(e, t);
		};
		Y(w, (e) => {
			U(d) && e(T);
		}), P(b), P(t), H(() => {
			J(c, (U(a), W(() => U(a)?.attached ? U(a).name : "No coordinator attached"))), Z(f, 1, `coordinator-state ${U(a), W(() => U(a)?.status || "detached") ?? ""}`), J(p, `${U(a), W(() => U(a)?.status || "DETACHED") ?? ""}${U(s), W(() => U(s).length ? ` · ${U(s).length} approval` : "") ?? ""}`);
		}), Qi("toggle", t, (e) => {
			e.currentTarget.open && g();
		}), q(e, t);
	};
	Y(x, (e) => {
		U(c) && e(S);
	}), q(e, b), xt(), i();
}
//#endregion
//#region src/ui/CampaignSettings.svelte
$i(["click"]), Go();
var Jl = /* @__PURE__ */ K("<div class=\"campaign-settings-boundary access-boundary\"><strong> </strong><p> </p></div>"), Yl = /* @__PURE__ */ K("<div class=\"campaign-settings-boundary\"><strong> </strong><p> </p><small>Observation never grants authority. Human wave adoption imports a fixed wave; exact human schedule confirmation grants controller execution only to reserved members.</small></div>"), Xl = /* @__PURE__ */ K("<button type=\"button\"><span> </span><strong> </strong><small> </small><p> </p></button>"), Zl = /* @__PURE__ */ K("<p> </p>"), Ql = /* @__PURE__ */ K("<article><span> </span><strong> </strong><small> </small><small> </small></article>"), $l = /* @__PURE__ */ K("<span><small> </small><strong> </strong></span>"), eu = /* @__PURE__ */ K("<div class=\"host-capability-grid\"></div> <div class=\"global-quota-grid\"><span><small>TOKEN COMMITMENTS</small><strong> </strong></span> <!></div> <footer>ENFORCED AT SERIALIZED RESOURCE ACQUISITION · no scheduler or host mutation authority</footer>", 1), tu = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), nu = /* @__PURE__ */ K("<details class=\"campaign-settings\" id=\"campaign-settings\"><summary><span><small>FUTURE-RUN POLICY</small><strong> </strong></span><span> </span></summary> <div class=\"campaign-settings-body\"><div class=\"campaign-settings-boundary\"><strong>Defaults, never active mutations</strong><p>These choices apply only when a later checked contract is confirmed. They do not restaff a running lane, approve a plan, or launch anything.</p></div> <!> <!> <div class=\"dispatch-profile-grid\"></div> <label class=\"automation-setting\"><span><strong>Automatic boundary handling</strong><small>Controls how far the controller may prepare between explicit human gates.</small></span><select><option>observe</option><option>prepare</option><option>propose</option><option>bounded</option></select></label> <section class=\"operational-governance\" aria-label=\"Operational governance\"><header><span><small>HOSTS & GLOBAL QUOTAS</small><strong>Pre-admission inventory</strong></span><b> </b></header> <!></section> <!></div></details>");
function ru(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(""), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(null), d = "", f = /* @__PURE__ */ I(!1), p = /* @__PURE__ */ I("");
	async function m(e, t) {
		if (!(!U(s) || U(c) || n().access?.canMutate === !1)) {
			L(c, e), L(l, "Saving future-run policy…");
			try {
				await as({
					projectId: U(s).id,
					type: e,
					args: t,
					scope: "campaign-settings"
				}), L(l, "Future-run policy saved. No active worker was changed.");
			} catch (e) {
				L(l, e instanceof Error ? e.message : String(e));
			} finally {
				L(c, "");
			}
		}
	}
	async function h() {
		if (!(!U(s) || U(f) || U(u) && d === U(s).id)) {
			L(f, !0), L(p, ""), d = U(s).id;
			try {
				let e = await fetch(`/api/governance?project=${encodeURIComponent(U(s).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(String(t.error || `Could not load operational governance: ${e.status}`));
				L(u, t);
			} catch (e) {
				L(p, e instanceof Error ? e.message : String(e));
			} finally {
				L(f, !1);
			}
		}
	}
	V(() => n(), () => {
		L(s, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(s), () => {
		L(a, U(s)?.dispatchPreferences || null);
	}), V(() => U(s), () => {
		L(o, U(s)?.coordinationInterface || null);
	}), Br(), xo();
	var g = ua(), _ = z(g), v = (e) => {
		var t = nu(), r = R(t), i = R(r), d = B(R(i)), g = R(d, !0);
		P(d), P(i);
		var _ = B(i), v = R(_);
		P(_), P(r);
		var y = B(r, 2), b = B(R(y), 2), x = (e) => {
			var t = Jl(), r = R(t), i = R(r);
			P(r);
			var a = B(r), o = R(a);
			P(a), P(t), H((e) => {
				J(i, `Signed in as ${n(), W(() => n().access.role) ?? ""} · ${n(), W(() => n().access.identity) ?? ""}`), J(o, `${e ?? ""} ${n(), W(() => n().access.canMutate ? "This project is in the mutation scope; every campaign gate still applies." : "This project is read-only; guarded actions and manual refresh are disabled.") ?? ""}`);
			}, [() => (n(), W(() => n().access.projects.includes("*") ? "Can read all configured projects." : `Readable projects: ${n().access.projects.join(", ")}.`))]), q(e, t);
		};
		Y(b, (e) => {
			n(), W(() => n().access) && e(x);
		});
		var S = B(b, 2), C = (e) => {
			var t = Yl(), n = R(t), r = R(n);
			P(n);
			var i = B(n), a = R(i, !0);
			P(i), Ke(), P(t), H(() => {
				J(r, `Coordinator interface · ${U(o), W(() => U(o).mode) ?? ""}`), J(a, (U(o), W(() => U(o).reason)));
			}), q(e, t);
		};
		Y(S, (e) => {
			U(o) && e(C);
		});
		var w = B(S, 2);
		X(w, 5, () => (U(a), W(() => U(a).profiles || [])), (e) => e.id, (e, t) => {
			var r = Xl();
			let i;
			var o = R(r), s = R(o, !0);
			P(o);
			var l = B(o), u = R(l, !0);
			P(l);
			var d = B(l), f = R(d);
			P(d);
			var p = B(d), h = R(p, !0);
			P(p), P(r), H((e) => {
				i = Z(r, 1, "dispatch-profile", null, i, { selected: U(t).id === U(a).selectedProfile }), r.disabled = e, J(s, (U(t), W(() => U(t).budgetClass))), J(u, (U(t), W(() => U(t).label))), J(f, `${U(t), W(() => U(t).model) ?? ""} · ${U(t), W(() => U(t).effort) ?? ""}${U(t), W(() => U(t).fanout ? ` · ${U(t).fanout} children` : " · single worker") ?? ""}`), J(h, (U(t), W(() => U(t).useWhen)));
			}, [() => (U(c), U(t), U(a), n(), W(() => !!U(c) || U(t).id === U(a).selectedProfile || n().access?.canMutate === !1))]), G("click", r, () => m("project.dispatch-profile.set", { profile: U(t).id })), q(e, r);
		}), P(w);
		var T = B(w, 2), E = B(R(T)), D = R(E);
		D.value = D.__value = "observe";
		var O = B(D);
		O.value = O.__value = "prepare";
		var k = B(O);
		k.value = k.__value = "propose";
		var A = B(k);
		A.value = A.__value = "bounded", P(E);
		var j;
		Wa(E), P(T);
		var ee = B(T, 2), M = R(ee), N = B(R(M)), te = R(N, !0);
		P(N), P(M);
		var ne = B(M, 2), re = (e) => {
			var t = Zl(), n = R(t, !0);
			P(t), H(() => J(n, U(p))), q(e, t);
		}, ie = (e) => {
			var t = eu(), n = z(t);
			X(n, 5, () => (U(u), W(() => U(u).projects?.[0]?.hosts || [])), (e) => e.id, (e, t) => {
				var n = Ql(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a);
				P(a);
				var s = B(a), c = R(s);
				P(s);
				var l = B(s), u = R(l);
				P(l), P(n), H(() => {
					J(i, (U(t), W(() => U(t).id))), J(o, `${U(t), W(() => U(t).observation) ?? ""} observation`), J(c, `dispatch ${U(t), W(() => U(t).researchDispatch) ?? ""}`), J(u, `reconcile ${U(t), W(() => U(t).reconciliation) ?? ""}`);
				}), q(e, n);
			}), P(n);
			var r = B(n, 2), i = R(r), a = B(R(i)), o = R(a);
			P(a), P(i), X(B(i, 2), 0, () => [
				"strategy",
				"research",
				"custody"
			], ya, (e, t) => {
				var n = $l(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a);
				P(a), P(n), H(() => {
					J(i, `${t ?? ""} SLOTS`), J(o, `${U(u), W(() => U(u).quotas.usage.slots[t]) ?? ""} / ${U(u), W(() => U(u).quotas.policy.slots[t]) ?? ""}`);
				}), q(e, n);
			}), P(r), Ke(2), H((e, t) => J(o, `${e ?? ""} / ${t ?? ""}`), [() => (U(u), W(() => U(u).quotas.usage.tokenCommitments.toLocaleString())), () => (U(u), W(() => U(u).quotas.policy.tokenCommitments.toLocaleString()))]), q(e, t);
		}, ae = (e) => {
			var t = Zl(), n = R(t, !0);
			P(t), H(() => J(n, U(f) ? "Loading scoped host and quota facts…" : "Open this section to load scoped operational facts.")), q(e, t);
		};
		Y(ne, (e) => {
			U(p) ? e(re) : U(u) ? e(ie, 1) : e(ae, -1);
		}), P(ee);
		var oe = B(ee, 2), se = (e) => {
			var t = tu(), n = R(t, !0);
			P(t), H(() => J(n, U(l))), q(e, t);
		};
		Y(oe, (e) => {
			U(l) && e(se);
		}), P(y), P(t), H((e, t) => {
			J(g, e), J(v, `${U(o), W(() => U(o)?.mode || "observe-only") ?? ""} · ${U(s), W(() => U(s).automationMode || "prepare") ?? ""}`), E.disabled = t, j !== (j = (U(s), W(() => U(s).automationMode || "prepare"))) && (E.value = (E.__value = (U(s), W(() => U(s).automationMode || "prepare"))) ?? "", Ua(E, (U(s), W(() => U(s).automationMode || "prepare")))), J(te, (U(u), U(f), W(() => U(u)?.quotas?.status || (U(f) ? "LOADING" : "READ ONLY"))));
		}, [() => (U(a), W(() => U(a).profiles?.find((e) => e.id === U(a).selectedProfile)?.label || U(a).selectedProfile)), () => (U(c), n(), W(() => !!U(c) || n().access?.canMutate === !1))]), Qi("toggle", t, (e) => {
			e.currentTarget.open && h();
		}), G("change", E, (e) => m("project.automation.set", { mode: e.currentTarget.value })), q(e, t);
	};
	Y(_, (e) => {
		U(s) && U(a) && e(v);
	}), q(e, g), xt(), i();
}
//#endregion
//#region src/ui/WaveAccounting.svelte
$i(["click", "change"]), Go();
var iu = /* @__PURE__ */ K("<p><b> </b> </p>"), au = /* @__PURE__ */ K("<div class=\"accounting-controls\"><select><option>Choose disposition</option><option>Repair</option><option>Supersede</option><option>Abandon</option><option>Carry forward</option></select><input placeholder=\"Reason and evidence boundary\"/><button class=\"primary-button\"> </button></div>"), ou = /* @__PURE__ */ K("<li><span class=\"accounting-state\"> </span> <div><strong> </strong><small> </small><!></div> <!></li>"), su = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), cu = /* @__PURE__ */ K("<details class=\"wave-accounting\" id=\"wave-accounting\"><summary><span><small>WAVE CUSTODY</small><strong>Source-lane accounting</strong></span><span> </span></summary> <div class=\"wave-accounting-body\"><div class=\"accounting-boundary\"><strong>Mechanical disposition only</strong><p>Recording a repair, supersession, abandonment, or carry-forward closes custody accounting. It does not endorse the lane’s mathematics or promote a claim.</p></div> <ol></ol> <!></div></details>");
function lu(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I({}), f = /* @__PURE__ */ I({});
	function p(e, t) {
		L(d, {
			...U(d),
			[e]: t
		});
	}
	function m(e, t) {
		L(f, {
			...U(f),
			[e]: t
		});
	}
	async function h(e) {
		if (!(!U(c) || U(l) || !U(d)[e.id])) {
			L(l, e.id), L(u, "Recording the bounded disposition…");
			try {
				await as({
					projectId: U(c).id,
					type: "lane.disposition.set",
					targetId: e.id,
					args: {
						disposition: U(d)[e.id],
						reason: U(f)[e.id] || ""
					},
					scope: "wave-accounting"
				}), L(u, "Disposition recorded. Synthesis readiness was recomputed mechanically."), L(d, {
					...U(d),
					[e.id]: ""
				}), L(f, {
					...U(f),
					[e.id]: ""
				});
			} catch (e) {
				L(u, e instanceof Error ? e.message : String(e));
			} finally {
				L(l, "");
			}
		}
	}
	V(() => n(), () => {
		L(c, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(c), () => {
		L(a, U(c)?.wave || null);
	}), V(() => U(a), () => {
		L(o, Array.isArray(U(a)?.lanes) ? U(a).lanes : []);
	}), V(() => U(a), () => {
		L(s, U(a)?.accounting || null);
	}), Br(), xo();
	var g = ua(), _ = z(g), v = (e) => {
		var t = cu(), n = R(t), r = B(R(n));
		let i;
		var a = R(r, !0);
		P(r), P(n);
		var c = B(n, 2), g = B(R(c), 2);
		X(g, 5, () => U(o), (e) => e.id, (e, t) => {
			var n = ou();
			let r;
			var i = R(n), a = R(i, !0);
			P(i);
			var o = B(i, 2), s = R(o), c = R(s, !0);
			P(s);
			var u = B(s), g = R(u);
			P(u);
			var _ = B(u), v = (e) => {
				var n = iu(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r);
				P(n), H(() => {
					J(i, (U(t), W(() => U(t).disposition))), J(a, ` · ${U(t), W(() => U(t).reason) ?? ""}`);
				}), q(e, n);
			};
			Y(_, (e) => {
				U(t), W(() => U(t).disposition) && e(v);
			}), P(o);
			var y = B(o, 2), b = (e) => {
				var n = au(), r = R(n), i = R(r);
				i.value = i.__value = "";
				var a = B(i);
				a.value = a.__value = "REPAIR";
				var o = B(a);
				o.value = o.__value = "SUPERSEDE";
				var s = B(o);
				s.value = s.__value = "ABANDON";
				var c = B(s);
				c.value = c.__value = "CARRY_FORWARD", P(r);
				var u;
				Wa(r);
				var g = B(r);
				no(g);
				var _ = B(g), v = R(_, !0);
				P(_), P(n), H(() => {
					u !== (u = (U(d), U(t), W(() => U(d)[U(t).id] || ""))) && (r.value = (r.__value = (U(d), U(t), W(() => U(d)[U(t).id] || ""))) ?? "", Ua(r, (U(d), U(t), W(() => U(d)[U(t).id] || "")))), ro(g, (U(f), U(t), W(() => U(f)[U(t).id] || ""))), _.disabled = (U(d), U(t), U(l), W(() => !U(d)[U(t).id] || U(l) === U(t).id)), J(v, (U(l), U(t), W(() => U(l) === U(t).id ? "Recording…" : "Record")));
				}), G("change", r, (e) => p(U(t).id, e.currentTarget.value)), G("input", g, (e) => m(U(t).id, e.currentTarget.value)), G("click", _, () => h(U(t))), q(e, n);
			};
			Y(y, (e) => {
				U(t), W(() => !U(t).accounted) && e(b);
			}), P(n), H((e) => {
				r = Z(n, 1, "", null, r, { open: !U(t).accounted }), J(a, e), J(c, (U(t), W(() => U(t).task))), J(g, `${U(t), W(() => U(t).lane) ?? ""} · ${U(t), W(() => U(t).host) ?? ""} · ${U(t), W(() => U(t).daemon) ?? ""} · ${U(t), W(() => U(t).landing) ?? ""}`);
			}, [() => (U(t), W(() => U(t).accounted ? "ACCOUNTED" : U(t).accountingState?.replaceAll("_", " ")))]), q(e, n);
		}), P(g);
		var _ = B(g, 2), v = (e) => {
			var t = su(), n = R(t, !0);
			P(t), H(() => J(n, U(u))), q(e, t);
		};
		Y(_, (e) => {
			U(u) && e(v);
		}), P(c), P(t), H(() => {
			i = Z(r, 1, "", null, i, { attention: U(s) && U(s).accounted < U(s).total }), J(a, (U(s), U(o), W(() => U(s) ? `${U(s).accounted}/${U(s).total} accounted` : `${U(o).length} members`)));
		}), q(e, t);
	};
	Y(_, (e) => {
		U(c), U(a), U(o), W(() => U(c) && U(a) && U(o).length) && e(v);
	}), q(e, g), xt(), i();
}
$i([
	"change",
	"input",
	"click"
]);
//#endregion
//#region node_modules/d3-dispatch/src/dispatch.js
var uu = { value: () => {} };
function du() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new fu(n);
}
function fu(e) {
	this._ = e;
}
function pu(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
fu.prototype = du.prototype = {
	constructor: fu,
	on: function(e, t) {
		var n = this._, r = pu(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = mu(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = hu(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = hu(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new fu(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function mu(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function hu(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = uu, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var gu = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/d3-selection/src/namespace.js
function _u(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), gu.hasOwnProperty(t) ? {
		space: gu[t],
		local: e
	} : e;
}
//#endregion
//#region node_modules/d3-selection/src/creator.js
function vu(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function yu(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function bu(e) {
	var t = _u(e);
	return (t.local ? yu : vu)(t);
}
//#endregion
//#region node_modules/d3-selection/src/selector.js
function xu() {}
function Su(e) {
	return e == null ? xu : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/select.js
function Cu(e) {
	typeof e != "function" && (e = Su(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new ff(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/array.js
function wu(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selectorAll.js
function Tu() {
	return [];
}
function Eu(e) {
	return e == null ? Tu : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectAll.js
function Du(e) {
	return function() {
		return wu(e.apply(this, arguments));
	};
}
function Ou(e) {
	e = typeof e == "function" ? Du(e) : Eu(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new ff(r, i);
}
//#endregion
//#region node_modules/d3-selection/src/matcher.js
function ku(e) {
	return function() {
		return this.matches(e);
	};
}
function Au(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChild.js
var ju = Array.prototype.find;
function Mu(e) {
	return function() {
		return ju.call(this.children, e);
	};
}
function Nu() {
	return this.firstElementChild;
}
function Pu(e) {
	return this.select(e == null ? Nu : Mu(typeof e == "function" ? e : Au(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChildren.js
var Fu = Array.prototype.filter;
function Iu() {
	return Array.from(this.children);
}
function Lu(e) {
	return function() {
		return Fu.call(this.children, e);
	};
}
function Ru(e) {
	return this.selectAll(e == null ? Iu : Lu(typeof e == "function" ? e : Au(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/filter.js
function zu(e) {
	typeof e != "function" && (e = ku(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new ff(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/sparse.js
function Bu(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/d3-selection/src/selection/enter.js
function Vu() {
	return new ff(this._enter || this._groups.map(Bu), this._parents);
}
function Hu(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Hu.prototype = {
	constructor: Hu,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
//#endregion
//#region node_modules/d3-selection/src/constant.js
function Uu(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/data.js
function Wu(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Hu(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Gu(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Hu(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function Ku(e) {
	return e.__data__;
}
function qu(e, t) {
	if (!arguments.length) return Array.from(this, Ku);
	var n = t ? Gu : Wu, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Uu(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = Ju(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new ff(o, r), o._enter = s, o._exit = c, o;
}
function Ju(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selection/exit.js
function Yu() {
	return new ff(this._exit || this._groups.map(Bu), this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/join.js
function Xu(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/d3-selection/src/selection/merge.js
function Zu(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new ff(s, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/order.js
function Qu() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/sort.js
function $u(e) {
	e ||= ed;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new ff(i, this._parents).order();
}
function ed(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-selection/src/selection/call.js
function td() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/nodes.js
function nd() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-selection/src/selection/node.js
function rd() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/d3-selection/src/selection/size.js
function id() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/selection/empty.js
function ad() {
	return !this.node();
}
//#endregion
//#region node_modules/d3-selection/src/selection/each.js
function od(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/attr.js
function sd(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function cd(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function ld(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function ud(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function dd(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function fd(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function pd(e, t) {
	var n = _u(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? cd : sd : typeof t == "function" ? n.local ? fd : dd : n.local ? ud : ld)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/window.js
function md(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/d3-selection/src/selection/style.js
function hd(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function gd(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function _d(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function vd(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? hd : typeof t == "function" ? _d : gd)(e, t, n ?? "")) : yd(this.node(), e);
}
function yd(e, t) {
	return e.style.getPropertyValue(t) || md(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/d3-selection/src/selection/property.js
function bd(e) {
	return function() {
		delete this[e];
	};
}
function xd(e, t) {
	return function() {
		this[e] = t;
	};
}
function Sd(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Cd(e, t) {
	return arguments.length > 1 ? this.each((t == null ? bd : typeof t == "function" ? Sd : xd)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/d3-selection/src/selection/classed.js
function wd(e) {
	return e.trim().split(/^|\s+/);
}
function Td(e) {
	return e.classList || new Ed(e);
}
function Ed(e) {
	this._node = e, this._names = wd(e.getAttribute("class") || "");
}
Ed.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function Dd(e, t) {
	for (var n = Td(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Od(e, t) {
	for (var n = Td(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function kd(e) {
	return function() {
		Dd(this, e);
	};
}
function Ad(e) {
	return function() {
		Od(this, e);
	};
}
function jd(e, t) {
	return function() {
		(t.apply(this, arguments) ? Dd : Od)(this, e);
	};
}
function Md(e, t) {
	var n = wd(e + "");
	if (arguments.length < 2) {
		for (var r = Td(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? jd : t ? kd : Ad)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/text.js
function Nd() {
	this.textContent = "";
}
function Pd(e) {
	return function() {
		this.textContent = e;
	};
}
function Fd(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Id(e) {
	return arguments.length ? this.each(e == null ? Nd : (typeof e == "function" ? Fd : Pd)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/d3-selection/src/selection/html.js
function Ld() {
	this.innerHTML = "";
}
function Rd(e) {
	return function() {
		this.innerHTML = e;
	};
}
function zd(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function Bd(e) {
	return arguments.length ? this.each(e == null ? Ld : (typeof e == "function" ? zd : Rd)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/d3-selection/src/selection/raise.js
function Vd() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Hd() {
	return this.each(Vd);
}
//#endregion
//#region node_modules/d3-selection/src/selection/lower.js
function Ud() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wd() {
	return this.each(Ud);
}
//#endregion
//#region node_modules/d3-selection/src/selection/append.js
function Gd(e) {
	var t = typeof e == "function" ? e : bu(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/insert.js
function Kd() {
	return null;
}
function qd(e, t) {
	var n = typeof e == "function" ? e : bu(e), r = t == null ? Kd : typeof t == "function" ? t : Su(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/remove.js
function Jd() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function Yd() {
	return this.each(Jd);
}
//#endregion
//#region node_modules/d3-selection/src/selection/clone.js
function Xd() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Zd() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Qd(e) {
	return this.select(e ? Zd : Xd);
}
//#endregion
//#region node_modules/d3-selection/src/selection/datum.js
function $d(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/d3-selection/src/selection/on.js
function ef(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function tf(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function nf(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function rf(e, t, n) {
	return function() {
		var r = this.__on, i, a = ef(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function af(e, t, n) {
	var r = tf(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? rf : nf, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/dispatch.js
function of(e, t, n) {
	var r = md(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function sf(e, t) {
	return function() {
		return of(this, e, t);
	};
}
function cf(e, t) {
	return function() {
		return of(this, e, t.apply(this, arguments));
	};
}
function lf(e, t) {
	return this.each((typeof t == "function" ? cf : sf)(e, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/iterator.js
function* uf() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/d3-selection/src/selection/index.js
var df = [null];
function ff(e, t) {
	this._groups = e, this._parents = t;
}
function pf() {
	return new ff([[document.documentElement]], df);
}
function mf() {
	return this;
}
ff.prototype = pf.prototype = {
	constructor: ff,
	select: Cu,
	selectAll: Ou,
	selectChild: Pu,
	selectChildren: Ru,
	filter: zu,
	data: qu,
	enter: Vu,
	exit: Yu,
	join: Xu,
	merge: Zu,
	selection: mf,
	order: Qu,
	sort: $u,
	call: td,
	nodes: nd,
	node: rd,
	size: id,
	empty: ad,
	each: od,
	attr: pd,
	style: vd,
	property: Cd,
	classed: Md,
	text: Id,
	html: Bd,
	raise: Hd,
	lower: Wd,
	append: Gd,
	insert: qd,
	remove: Yd,
	clone: Qd,
	datum: $d,
	on: af,
	dispatch: lf,
	[Symbol.iterator]: uf
};
//#endregion
//#region node_modules/d3-selection/src/select.js
function hf(e) {
	return typeof e == "string" ? new ff([[document.querySelector(e)]], [document.documentElement]) : new ff([[e]], df);
}
//#endregion
//#region node_modules/d3-selection/src/sourceEvent.js
function gf(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/pointer.js
function _f(e, t) {
	if (e = gf(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
//#endregion
//#region node_modules/d3-drag/src/noevent.js
var vf = { passive: !1 }, yf = {
	capture: !0,
	passive: !1
};
function bf(e) {
	e.stopImmediatePropagation();
}
function xf(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-drag/src/nodrag.js
function Sf(e) {
	var t = e.document.documentElement, n = hf(e).on("dragstart.drag", xf, yf);
	"onselectstart" in t ? n.on("selectstart.drag", xf, yf) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Cf(e, t) {
	var n = e.document.documentElement, r = hf(e).on("dragstart.drag", null);
	t && (r.on("click.drag", xf, yf), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/d3-drag/src/constant.js
var wf = (e) => () => e;
//#endregion
//#region node_modules/d3-drag/src/event.js
function Tf(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
Tf.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/d3-drag/src/drag.js
function Ef(e) {
	return !e.ctrlKey && !e.button;
}
function Df() {
	return this.parentNode;
}
function Of(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function kf() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Af() {
	var e = Ef, t = Df, n = Of, r = kf, i = {}, a = du("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, vf).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (hf(n.view).on("mousemove.drag", m, yf).on("mouseup.drag", h, yf), Sf(n.view), bf(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (xf(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		hf(e.view).on("mousemove.drag mouseup.drag", null), Cf(e.view, l), xf(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (bf(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (xf(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (bf(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = _f(l || r, t), p, m, h;
		if ((h = n.call(e, new Tf("beforestart", {
			sourceEvent: r,
			target: f,
			identifier: c,
			active: o,
			x: d[0],
			y: d[1],
			dx: 0,
			dy: 0,
			dispatch: u
		}), s)) != null) return p = h.x - d[0] || 0, m = h.y - d[1] || 0, function n(r, a, l) {
			var g = d, _;
			switch (r) {
				case "start":
					i[c] = n, _ = o++;
					break;
				case "end": delete i[c], --o;
				case "drag": d = _f(l || a, t), _ = o;
			}
			u.call(r, e, new Tf(r, {
				sourceEvent: a,
				subject: h,
				target: f,
				identifier: c,
				active: _,
				x: d[0] + p,
				y: d[1] + m,
				dx: d[0] - g[0],
				dy: d[1] - g[1],
				dispatch: u
			}), s);
		};
	}
	return f.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : wf(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : wf(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : wf(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : wf(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/d3-color/src/define.js
function jf(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Mf(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function Nf() {}
var Pf = .7, Ff = 1 / Pf, If = "\\s*([+-]?\\d+)\\s*", Lf = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Rf = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", zf = /^#([0-9a-f]{3,8})$/, Bf = RegExp(`^rgb\\(${If},${If},${If}\\)$`), Vf = RegExp(`^rgb\\(${Rf},${Rf},${Rf}\\)$`), Hf = RegExp(`^rgba\\(${If},${If},${If},${Lf}\\)$`), Uf = RegExp(`^rgba\\(${Rf},${Rf},${Rf},${Lf}\\)$`), Wf = RegExp(`^hsl\\(${Lf},${Rf},${Rf}\\)$`), Gf = RegExp(`^hsla\\(${Lf},${Rf},${Rf},${Lf}\\)$`), Kf = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
jf(Nf, Zf, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: qf,
	formatHex: qf,
	formatHex8: Jf,
	formatHsl: Yf,
	formatRgb: Xf,
	toString: Xf
});
function qf() {
	return this.rgb().formatHex();
}
function Jf() {
	return this.rgb().formatHex8();
}
function Yf() {
	return up(this).formatHsl();
}
function Xf() {
	return this.rgb().formatRgb();
}
function Zf(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = zf.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Qf(t) : n === 3 ? new np(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? $f(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? $f(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Bf.exec(e)) ? new np(t[1], t[2], t[3], 1) : (t = Vf.exec(e)) ? new np(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Hf.exec(e)) ? $f(t[1], t[2], t[3], t[4]) : (t = Uf.exec(e)) ? $f(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Wf.exec(e)) ? lp(t[1], t[2] / 100, t[3] / 100, 1) : (t = Gf.exec(e)) ? lp(t[1], t[2] / 100, t[3] / 100, t[4]) : Kf.hasOwnProperty(e) ? Qf(Kf[e]) : e === "transparent" ? new np(NaN, NaN, NaN, 0) : null;
}
function Qf(e) {
	return new np(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function $f(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new np(e, t, n, r);
}
function ep(e) {
	return e instanceof Nf || (e = Zf(e)), e ? (e = e.rgb(), new np(e.r, e.g, e.b, e.opacity)) : new np();
}
function tp(e, t, n, r) {
	return arguments.length === 1 ? ep(e) : new np(e, t, n, r ?? 1);
}
function np(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
jf(np, tp, Mf(Nf, {
	brighter(e) {
		return e = e == null ? Ff : Ff ** +e, new np(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Pf : Pf ** +e, new np(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new np(sp(this.r), sp(this.g), sp(this.b), op(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: rp,
	formatHex: rp,
	formatHex8: ip,
	formatRgb: ap,
	toString: ap
}));
function rp() {
	return `#${cp(this.r)}${cp(this.g)}${cp(this.b)}`;
}
function ip() {
	return `#${cp(this.r)}${cp(this.g)}${cp(this.b)}${cp((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ap() {
	let e = op(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${sp(this.r)}, ${sp(this.g)}, ${sp(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function op(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function sp(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function cp(e) {
	return e = sp(e), (e < 16 ? "0" : "") + e.toString(16);
}
function lp(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new fp(e, t, n, r);
}
function up(e) {
	if (e instanceof fp) return new fp(e.h, e.s, e.l, e.opacity);
	if (e instanceof Nf || (e = Zf(e)), !e) return new fp();
	if (e instanceof fp) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new fp(o, s, c, e.opacity);
}
function dp(e, t, n, r) {
	return arguments.length === 1 ? up(e) : new fp(e, t, n, r ?? 1);
}
function fp(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
jf(fp, dp, Mf(Nf, {
	brighter(e) {
		return e = e == null ? Ff : Ff ** +e, new fp(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Pf : Pf ** +e, new fp(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new np(hp(e >= 240 ? e - 240 : e + 120, i, r), hp(e, i, r), hp(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new fp(pp(this.h), mp(this.s), mp(this.l), op(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = op(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${pp(this.h)}, ${mp(this.s) * 100}%, ${mp(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function pp(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mp(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function hp(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var gp = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function _p(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function vp(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function yp(e) {
	return (e = +e) == 1 ? bp : function(t, n) {
		return n - t ? vp(t, n, e) : gp(isNaN(t) ? n : t);
	};
}
function bp(e, t) {
	var n = t - e;
	return n ? _p(e, n) : gp(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var xp = (function e(t) {
	var n = yp(t);
	function r(e, t) {
		var r = n((e = tp(e)).r, (t = tp(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = bp(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function Sp(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Cp(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function wp(e, t) {
	var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o;
	for (o = 0; o < r; ++o) i[o] = Np(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function Tp(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function Ep(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function Dp(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = Np(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var Op = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, kp = new RegExp(Op.source, "g");
function Ap(e) {
	return function() {
		return e;
	};
}
function jp(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Mp(e, t) {
	var n = Op.lastIndex = kp.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Op.exec(e)) && (i = kp.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Ep(r, i)
	})), n = kp.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? jp(c[0].x) : Ap(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function Np(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? gp(t) : (n === "number" ? Ep : n === "string" ? (r = Zf(t)) ? (t = r, xp) : Mp : t instanceof Zf ? xp : t instanceof Date ? Tp : Cp(t) ? Sp : Array.isArray(t) ? wp : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Dp : Ep)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
var Pp = 180 / Math.PI, Fp = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Ip(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Pp,
		skewX: Math.atan(c) * Pp,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
var Lp;
function Rp(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Fp : Ip(t.a, t.b, t.c, t.d, t.e, t.f);
}
function zp(e) {
	return e == null || (Lp ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Lp.setAttribute("transform", e), !(e = Lp.transform.baseVal.consolidate())) ? Fp : (e = e.matrix, Ip(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function Bp(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Ep(e, i)
			}, {
				i: c - 2,
				x: Ep(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Ep(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Ep(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Ep(e, n)
			}, {
				i: s - 2,
				x: Ep(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var Vp = Bp(Rp, "px, ", "px)", "deg)"), Hp = Bp(zp, ", ", ")", ")"), Up = 1e-12;
function Wp(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Gp(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Kp(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var qp = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Up) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = Wp(y), c = s / (n * g) * (i * Kp(t * r + y) - Gp(y));
				return [
					a + c * d,
					o + c * f,
					s * i / Wp(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), Jp = 0, Yp = 0, Xp = 0, Zp = 1e3, Qp, $p, em = 0, tm = 0, nm = 0, rm = typeof performance == "object" && performance.now ? performance : Date, im = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function am() {
	return tm ||= (im(om), rm.now() + nm);
}
function om() {
	tm = 0;
}
function sm() {
	this._call = this._time = this._next = null;
}
sm.prototype = cm.prototype = {
	constructor: sm,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? am() : +n) + (t == null ? 0 : +t), !this._next && $p !== this && ($p ? $p._next = this : Qp = this, $p = this), this._call = e, this._time = n, pm();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, pm());
	}
};
function cm(e, t, n) {
	var r = new sm();
	return r.restart(e, t, n), r;
}
function lm() {
	am(), ++Jp;
	for (var e = Qp, t; e;) (t = tm - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--Jp;
}
function um() {
	tm = (em = rm.now()) + nm, Jp = Yp = 0;
	try {
		lm();
	} finally {
		Jp = 0, fm(), tm = 0;
	}
}
function dm() {
	var e = rm.now(), t = e - em;
	t > Zp && (nm -= t, em = e);
}
function fm() {
	for (var e, t = Qp, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Qp = n);
	$p = e, pm(r);
}
function pm(e) {
	Jp || (Yp &&= clearTimeout(Yp), e - tm > 24 ? (e < Infinity && (Yp = setTimeout(um, e - rm.now() - nm)), Xp &&= clearInterval(Xp)) : (Xp ||= (em = rm.now(), setInterval(dm, Zp)), Jp = 1, im(um)));
}
//#endregion
//#region node_modules/d3-timer/src/timeout.js
function mm(e, t, n) {
	var r = new sm();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/d3-transition/src/transition/schedule.js
var hm = du("start", "end", "cancel", "interrupt"), gm = [];
function _m(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	xm(e, n, {
		name: t,
		index: r,
		group: i,
		on: hm,
		tween: gm,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function vm(e, t) {
	var n = bm(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function ym(e, t) {
	var n = bm(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function bm(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function xm(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = cm(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return mm(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (mm(function() {
			n.state === 3 && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), n.state === 2) {
			for (n.state = 3, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = 5, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === 5 && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = 6, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
//#endregion
//#region node_modules/d3-transition/src/interrupt.js
function Sm(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) {
			if ((r = n[o]).name !== t) {
				a = !1;
				continue;
			}
			i = r.state > 2 && r.state < 5, r.state = 6, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
		}
		a && delete e.__transition;
	}
}
//#endregion
//#region node_modules/d3-transition/src/selection/interrupt.js
function Cm(e) {
	return this.each(function() {
		Sm(this, e);
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/tween.js
function wm(e, t) {
	var n, r;
	return function() {
		var i = ym(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function Tm(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = ym(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function Em(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = bm(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? wm : Tm)(n, e, t));
}
function Dm(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = ym(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return bm(e, r).value[t];
	};
}
//#endregion
//#region node_modules/d3-transition/src/transition/interpolate.js
function Om(e, t) {
	var n;
	return (typeof t == "number" ? Ep : t instanceof Zf ? xp : (n = Zf(t)) ? (t = n, xp) : Mp)(e, t);
}
//#endregion
//#region node_modules/d3-transition/src/transition/attr.js
function km(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Am(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function jm(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Mm(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Nm(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Pm(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Fm(e, t) {
	var n = _u(e), r = n === "transform" ? Hp : Om;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Pm : Nm)(n, r, Dm(this, "attr." + e, t)) : t == null ? (n.local ? Am : km)(n) : (n.local ? Mm : jm)(n, r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/attrTween.js
function Im(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Lm(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Rm(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Lm(e, i)), n;
	}
	return i._value = t, i;
}
function zm(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Im(e, i)), n;
	}
	return i._value = t, i;
}
function Bm(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = _u(e);
	return this.tween(n, (r.local ? Rm : zm)(r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/delay.js
function Vm(e, t) {
	return function() {
		vm(this, e).delay = +t.apply(this, arguments);
	};
}
function Hm(e, t) {
	return t = +t, function() {
		vm(this, e).delay = t;
	};
}
function Um(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Vm : Hm)(t, e)) : bm(this.node(), t).delay;
}
//#endregion
//#region node_modules/d3-transition/src/transition/duration.js
function Wm(e, t) {
	return function() {
		ym(this, e).duration = +t.apply(this, arguments);
	};
}
function Gm(e, t) {
	return t = +t, function() {
		ym(this, e).duration = t;
	};
}
function Km(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Wm : Gm)(t, e)) : bm(this.node(), t).duration;
}
//#endregion
//#region node_modules/d3-transition/src/transition/ease.js
function qm(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		ym(this, e).ease = t;
	};
}
function Jm(e) {
	var t = this._id;
	return arguments.length ? this.each(qm(t, e)) : bm(this.node(), t).ease;
}
//#endregion
//#region node_modules/d3-transition/src/transition/easeVarying.js
function Ym(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		ym(this, e).ease = n;
	};
}
function Xm(e) {
	if (typeof e != "function") throw Error();
	return this.each(Ym(this._id, e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/filter.js
function Zm(e) {
	typeof e != "function" && (e = ku(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Eh(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/merge.js
function Qm(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new Eh(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/on.js
function $m(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function eh(e, t, n) {
	var r, i, a = $m(t) ? vm : ym;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function th(e, t) {
	var n = this._id;
	return arguments.length < 2 ? bm(this.node(), n).on.on(e) : this.each(eh(n, e, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/remove.js
function nh(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function rh() {
	return this.on("end.remove", nh(this._id));
}
//#endregion
//#region node_modules/d3-transition/src/transition/select.js
function ih(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Su(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, _m(l[f], t, n, f, l, bm(u, n)));
	return new Eh(a, this._parents, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selectAll.js
function ah(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Eu(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = bm(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && _m(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new Eh(a, o, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selection.js
var oh = pf.prototype.constructor;
function sh() {
	return new oh(this._groups, this._parents);
}
//#endregion
//#region node_modules/d3-transition/src/transition/style.js
function ch(e, t) {
	var n, r, i;
	return function() {
		var a = yd(this, e), o = (this.style.removeProperty(e), yd(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function lh(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function uh(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = yd(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function dh(e, t, n) {
	var r, i, a;
	return function() {
		var o = yd(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), yd(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function fh(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = ym(this, e), l = c.on, u = c.value[a] == null ? s ||= lh(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function ph(e, t, n) {
	var r = (e += "") == "transform" ? Vp : Om;
	return t == null ? this.styleTween(e, ch(e, r)).on("end.style." + e, lh(e)) : typeof t == "function" ? this.styleTween(e, dh(e, r, Dm(this, "style." + e, t))).each(fh(this._id, e)) : this.styleTween(e, uh(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/d3-transition/src/transition/styleTween.js
function mh(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function hh(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && mh(e, a, n)), r;
	}
	return a._value = t, a;
}
function gh(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, hh(e, t, n ?? ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/text.js
function _h(e) {
	return function() {
		this.textContent = e;
	};
}
function vh(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function yh(e) {
	return this.tween("text", typeof e == "function" ? vh(Dm(this, "text", e)) : _h(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/textTween.js
function bh(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function xh(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && bh(r)), t;
	}
	return r._value = e, r;
}
function Sh(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, xh(e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/transition.js
function Ch() {
	for (var e = this._name, t = this._id, n = Dh(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = bm(c, t);
		_m(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new Eh(r, this._parents, e, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/end.js
function wh() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = ym(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/index.js
var Th = 0;
function Eh(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Dh() {
	return ++Th;
}
var Oh = pf.prototype;
Eh.prototype = {
	constructor: Eh,
	select: ih,
	selectAll: ah,
	selectChild: Oh.selectChild,
	selectChildren: Oh.selectChildren,
	filter: Zm,
	merge: Qm,
	selection: sh,
	transition: Ch,
	call: Oh.call,
	nodes: Oh.nodes,
	node: Oh.node,
	size: Oh.size,
	empty: Oh.empty,
	each: Oh.each,
	on: th,
	attr: Fm,
	attrTween: Bm,
	style: ph,
	styleTween: gh,
	text: yh,
	textTween: Sh,
	remove: rh,
	tween: Em,
	delay: Um,
	duration: Km,
	ease: Jm,
	easeVarying: Xm,
	end: wh,
	[Symbol.iterator]: Oh[Symbol.iterator]
};
//#endregion
//#region node_modules/d3-ease/src/cubic.js
function kh(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/d3-transition/src/selection/transition.js
var Ah = {
	time: null,
	delay: 0,
	duration: 250,
	ease: kh
};
function jh(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function Mh(e) {
	var t, n;
	e instanceof Eh ? (t = e._id, e = e._name) : (t = Dh(), (n = Ah).time = am(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && _m(c, e, t, l, o, n || jh(c, t));
	return new Eh(r, this._parents, e, t);
}
pf.prototype.interrupt = Cm, pf.prototype.transition = Mh;
//#endregion
//#region node_modules/d3-zoom/src/constant.js
var Nh = (e) => () => e;
//#endregion
//#region node_modules/d3-zoom/src/event.js
function Ph(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		transform: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		_: { value: i }
	});
}
//#endregion
//#region node_modules/d3-zoom/src/transform.js
function Fh(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Fh.prototype = {
	constructor: Fh,
	scale: function(e) {
		return e === 1 ? this : new Fh(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Fh(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var Ih = new Fh(1, 0, 0);
Lh.prototype = Fh.prototype;
function Lh(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return Ih;
	return e.__zoom;
}
//#endregion
//#region node_modules/d3-zoom/src/noevent.js
function Rh(e) {
	e.stopImmediatePropagation();
}
function zh(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-zoom/src/zoom.js
function Bh(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Vh() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Hh() {
	return this.__zoom || Ih;
}
function Uh(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function Wh() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Gh(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function Kh() {
	var e = Bh, t = Vh, n = Gh, r = Uh, i = Wh, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = qp, l = du("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", Hh).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", Hh), e === i ? i.interrupt().each(function() {
			S(this, arguments).event(r).start().zoom(null, typeof t == "function" ? t.apply(this, arguments) : t).end();
		}) : x(e, t, n, r);
	}, _.scaleBy = function(e, t, n, r) {
		_.scaleTo(e, function() {
			return this.__zoom.k * (typeof t == "function" ? t.apply(this, arguments) : t);
		}, n, r);
	}, _.scaleTo = function(e, r, i, a) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), a = this.__zoom, s = i == null ? b(e) : typeof i == "function" ? i.apply(this, arguments) : i, c = a.invert(s), l = typeof r == "function" ? r.apply(this, arguments) : r;
			return n(y(v(a, l), s, c), e, o);
		}, i, a);
	}, _.translateBy = function(e, r, i, a) {
		_.transform(e, function() {
			return n(this.__zoom.translate(typeof r == "function" ? r.apply(this, arguments) : r, typeof i == "function" ? i.apply(this, arguments) : i), t.apply(this, arguments), o);
		}, null, a);
	}, _.translateTo = function(e, r, i, a, s) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), s = this.__zoom, c = a == null ? b(e) : typeof a == "function" ? a.apply(this, arguments) : a;
			return n(Ih.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new Fh(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new Fh(e.k, r, i);
	}
	function b(e) {
		return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2];
	}
	function x(e, n, r, i) {
		e.on("start.zoom", function() {
			S(this, arguments).event(i).start();
		}).on("interrupt.zoom end.zoom", function() {
			S(this, arguments).event(i).end();
		}).tween("zoom", function() {
			var e = this, a = arguments, o = S(e, a).event(i), s = t.apply(e, a), l = r == null ? b(s) : typeof r == "function" ? r.apply(e, a) : r, u = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1]), d = e.__zoom, f = typeof n == "function" ? n.apply(e, a) : n, p = c(d.invert(l).concat(u / d.k), f.invert(l).concat(u / f.k));
			return function(e) {
				if (e === 1) e = f;
				else {
					var t = p(e), n = u / t[2];
					e = new Fh(n, l[0] - t[0] * n, l[1] - t[1] * n);
				}
				o.zoom(null, e);
			};
		});
	}
	function S(e, t, n) {
		return !n && e.__zooming || new C(e, t);
	}
	function C(e, n) {
		this.that = e, this.args = n, this.active = 0, this.sourceEvent = null, this.extent = t.apply(e, n), this.taps = 0;
	}
	C.prototype = {
		event: function(e) {
			return e && (this.sourceEvent = e), this;
		},
		start: function() {
			return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
		},
		zoom: function(e, t) {
			return this.mouse && e !== "mouse" && (this.mouse[1] = t.invert(this.mouse[0])), this.touch0 && e !== "touch" && (this.touch0[1] = t.invert(this.touch0[0])), this.touch1 && e !== "touch" && (this.touch1[1] = t.invert(this.touch1[0])), this.that.__zoom = t, this.emit("zoom"), this;
		},
		end: function() {
			return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
		},
		emit: function(e) {
			var t = hf(this.that).datum();
			l.call(e, this.that, new Ph(e, {
				sourceEvent: this.sourceEvent,
				target: _,
				type: e,
				transform: this.that.__zoom,
				dispatch: l
			}), t);
		}
	};
	function w(t, ...i) {
		if (!e.apply(this, arguments)) return;
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = _f(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], Sm(this), s.start();
		zh(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = hf(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = _f(t, i), l = t.clientX, u = t.clientY;
		Sf(t.view), Rh(t), a.mouse = [c, this.__zoom.invert(c)], Sm(this), a.start();
		function d(e) {
			if (zh(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = _f(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), Cf(e.view, a.moved), zh(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = _f(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			zh(r), s > 0 ? hf(this).transition().duration(s).call(x, d, c, r) : hf(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (Rh(t), s = 0; s < i; ++s) c = r[s], l = _f(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), Sm(this), a.start());
		}
	}
	function O(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (zh(e), s = 0; s < a; ++s) c = i[s], l = _f(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
			if (c = r.that.__zoom, r.touch1) {
				var d = r.touch0[0], f = r.touch0[1], p = r.touch1[0], m = r.touch1[1], h = (h = p[0] - d[0]) * h + (h = p[1] - d[1]) * h, g = (g = m[0] - f[0]) * g + (g = m[1] - f[1]) * g;
				c = v(c, Math.sqrt(h / g)), l = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2], u = [(f[0] + m[0]) / 2, (f[1] + m[1]) / 2];
			} else if (r.touch0) l = r.touch0[0], u = r.touch0[1];
			else return;
			r.zoom("touch", n(y(c, l, u), r.extent, o));
		}
	}
	function k(e, ...t) {
		if (this.__zooming) {
			var n = S(this, t).event(e), r = e.changedTouches, i = r.length, a, o;
			for (Rh(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = _f(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = hf(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Nh(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Nh(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Nh(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Nh([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
	}, _.scaleExtent = function(e) {
		return arguments.length ? (a[0] = +e[0], a[1] = +e[1], _) : [a[0], a[1]];
	}, _.translateExtent = function(e) {
		return arguments.length ? (o[0][0] = +e[0][0], o[1][0] = +e[1][0], o[0][1] = +e[0][1], o[1][1] = +e[1][1], _) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
	}, _.constrain = function(e) {
		return arguments.length ? (n = e, _) : n;
	}, _.duration = function(e) {
		return arguments.length ? (s = +e, _) : s;
	}, _.interpolate = function(e) {
		return arguments.length ? (c = e, _) : c;
	}, _.on = function() {
		var e = l.on.apply(l, arguments);
		return e === l ? _ : e;
	}, _.clickDistance = function(e) {
		return arguments.length ? (h = (e = +e) * e, _) : Math.sqrt(h);
	}, _.tapDistance = function(e) {
		return arguments.length ? (g = +e, _) : g;
	}, _;
}
//#endregion
//#region node_modules/@xyflow/system/dist/esm/index.js
var qh = {
	error001: (e = "react") => `Seems like you have not used ${e === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${e}flow.dev/error#001`,
	error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
	error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
	error004: () => "The parent container needs a width and a height to render the graph.",
	error005: () => "Only child nodes can use a parent extent.",
	error006: () => "Can't create edge. An edge needs a source and a target.",
	error007: (e) => `The old edge with id=${e} does not exist.`,
	error009: (e) => `Marker type "${e}" doesn't exist.`,
	error008: (e, { id: t, sourceHandle: n, targetHandle: r }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? n : r}", edge id: ${t}.`,
	error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
	error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
	error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
	error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
	error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
	error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
	error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, Jh = [[-Infinity, -Infinity], [Infinity, Infinity]], Yh = [
	"Enter",
	" ",
	"Escape"
], Xh = {
	"node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
	"node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
	"node.a11yDescription.ariaLiveMessage": ({ direction: e, x: t, y: n }) => `Moved selected node ${e}. New position, x: ${t}, y: ${n}`,
	"edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
	"controls.ariaLabel": "Control Panel",
	"controls.zoomIn.ariaLabel": "Zoom In",
	"controls.zoomOut.ariaLabel": "Zoom Out",
	"controls.fitView.ariaLabel": "Fit View",
	"controls.interactive.ariaLabel": "Toggle Interactivity",
	"minimap.ariaLabel": "Mini Map",
	"handle.ariaLabel": "Handle"
}, Zh;
(function(e) {
	e.Strict = "strict", e.Loose = "loose";
})(Zh ||= {});
var Qh;
(function(e) {
	e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Qh ||= {});
var $h;
(function(e) {
	e.Partial = "partial", e.Full = "full";
})($h ||= {});
var eg = {
	inProgress: !1,
	isValid: null,
	from: null,
	fromHandle: null,
	fromPosition: null,
	fromNode: null,
	to: null,
	toHandle: null,
	toPosition: null,
	toNode: null,
	pointer: null
}, tg;
(function(e) {
	e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(tg ||= {});
var ng;
(function(e) {
	e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(ng ||= {});
var rg;
(function(e) {
	e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(rg ||= {});
var ig = {
	[rg.Left]: rg.Right,
	[rg.Right]: rg.Left,
	[rg.Top]: rg.Bottom,
	[rg.Bottom]: rg.Top
}, ag = (e) => !!e && typeof e == "object" && "id" in e && "source" in e && "target" in e, og = (e) => !!e && typeof e == "object" && "id" in e && "position" in e && !("source" in e) && !("target" in e), sg = (e) => !!e && typeof e == "object" && "id" in e && "internals" in e && !("source" in e) && !("target" in e), cg = (e, t = [0, 0]) => {
	let { width: n, height: r } = Hg(e), i = e.origin ?? t, a = n * i[0], o = r * i[1];
	return {
		x: e.position.x - a,
		y: e.position.y - o
	};
}, lg = (e, t = { nodeOrigin: [0, 0] }) => {
	if (e.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let n = !1, r = e.reduce((e, r) => {
		let i = typeof r == "string", a = !t.nodeLookup && !i ? r : void 0;
		return t.nodeLookup && (a = i ? t.nodeLookup.get(r) : sg(r) ? r : t.nodeLookup.get(r.id)), a ? (n = !0, Sg(e, Eg(a, t.nodeOrigin))) : e;
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return n ? wg(r) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, ug = (e, t = {}) => {
	let n = {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	}, r = !1;
	return e.forEach((e) => {
		(t.filter === void 0 || t.filter(e)) && (n = Sg(n, Eg(e)), r = !0);
	}), r ? wg(n) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, dg = (e, t, [n, r, i] = [
	0,
	0,
	1
], a = !1, o = !1) => {
	let s = (t.x - n) / i, c = (t.y - r) / i, l = t.width / i, u = t.height / i, d = [];
	for (let t of e.values()) {
		let { measured: e, selectable: n = !0, hidden: r = !1 } = t;
		if (o && !n || r) continue;
		let i = e.width ?? t.width ?? t.initialWidth ?? 0, f = e.height ?? t.height ?? t.initialHeight ?? 0, { x: p, y: m } = t.internals.positionAbsolute, h = Og(s, c, l, u, p, m, i, f), g = i * f, _ = a && h > 0;
		(!t.internals.handleBounds || _ || h >= g || t.dragging) && d.push(t);
	}
	return d;
}, fg = (e, t) => {
	let n = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		n.add(e.id);
	}), t.filter((e) => n.has(e.source) || n.has(e.target));
};
function pg(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t?.nodes ? new Set(t.nodes.map((e) => e.id)) : null;
	return e.forEach((e) => {
		let i;
		if (t?.includeHiddenNodes) {
			let { width: t, height: n } = Hg(e);
			i = t > 0 && n > 0;
		} else i = !!(e.measured.width && e.measured.height && !e.hidden);
		i && (!r || r.has(e.id)) && n.set(e.id, e);
	}), n;
}
async function mg({ nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: a }, o) {
	if (e.size === 0) return !0;
	let s = zg(ug(pg(e, o)), t, n, o?.minZoom ?? i, o?.maxZoom ?? a, o?.padding ?? .1);
	return await r.setViewport(s, {
		duration: o?.duration,
		ease: o?.ease,
		interpolate: o?.interpolate
	}), !0;
}
function hg({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: a }) {
	let o = n.get(e), s = o.parentId ? n.get(o.parentId) : void 0, { x: c, y: l } = s ? s.internals.positionAbsolute : {
		x: 0,
		y: 0
	}, u = o.origin ?? r, d = o.extent || i;
	if (o.extent === "parent" && !o.expandParent) {
		if (!s) a?.("005", qh.error005());
		else {
			let { width: e, height: t } = Hg(s);
			e && t && (d = [[c, l], [c + e, l + t]]);
		}
	} else s && Vg(o.extent) && (d = [[o.extent[0][0] + c, o.extent[0][1] + l], [o.extent[1][0] + c, o.extent[1][1] + l]]);
	let f = Vg(d) ? vg(t, d, o.measured) : t;
	return (o.measured.width === void 0 || o.measured.height === void 0) && a?.("015", qh.error015()), {
		position: {
			x: f.x - c + (o.measured.width ?? 0) * u[0],
			y: f.y - l + (o.measured.height ?? 0) * u[1]
		},
		positionAbsolute: f
	};
}
async function gg({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: i }) {
	let a = new Set(e.map((e) => e.id)), o = [];
	for (let e of n) {
		if (e.deletable === !1) continue;
		let t = a.has(e.id), n = !t && e.parentId && o.find((t) => t.id === e.parentId);
		(t || n) && o.push(e);
	}
	let s = new Set(t.map((e) => e.id)), c = r.filter((e) => e.deletable !== !1), l = fg(o, c);
	for (let e of c) s.has(e.id) && !l.find((t) => t.id === e.id) && l.push(e);
	if (!i) return {
		edges: l,
		nodes: o
	};
	let u = await i({
		nodes: o,
		edges: l
	});
	return typeof u == "boolean" ? u ? {
		edges: l,
		nodes: o
	} : {
		edges: [],
		nodes: []
	} : u;
}
var _g = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), vg = (e = {
	x: 0,
	y: 0
}, t, n) => ({
	x: _g(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
	y: _g(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function yg(e, t, n) {
	let { width: r, height: i } = Hg(n), { x: a, y: o } = n.internals.positionAbsolute;
	return vg(e, [[a, o], [a + r, o + i]], t);
}
var bg = (e, t, n) => e < t ? _g(Math.abs(e - t), 1, t) / t : e > n ? -_g(Math.abs(e - n), 1, t) / t : 0, xg = (e, t, n = 15, r = 40) => [bg(e.x, r, t.width - r) * n, bg(e.y, r, t.height - r) * n], Sg = (e, t) => ({
	x: Math.min(e.x, t.x),
	y: Math.min(e.y, t.y),
	x2: Math.max(e.x2, t.x2),
	y2: Math.max(e.y2, t.y2)
}), Cg = ({ x: e, y: t, width: n, height: r }) => ({
	x: e,
	y: t,
	x2: e + n,
	y2: t + r
}), wg = ({ x: e, y: t, x2: n, y2: r }) => ({
	x: e,
	y: t,
	width: n - e,
	height: r - t
}), Tg = (e, t = [0, 0]) => {
	let { x: n, y: r } = sg(e) ? e.internals.positionAbsolute : cg(e, t);
	return {
		x: n,
		y: r,
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}, Eg = (e, t = [0, 0]) => {
	let { x: n, y: r } = sg(e) ? e.internals.positionAbsolute : cg(e, t);
	return {
		x: n,
		y: r,
		x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
		y2: r + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
	};
}, Dg = (e, t) => wg(Sg(Cg(e), Cg(t))), Og = (e, t, n, r, i, a, o, s) => {
	let c = Math.max(0, Math.min(e + n, i + o) - Math.max(e, i)), l = Math.max(0, Math.min(t + r, a + s) - Math.max(t, a));
	return Math.ceil(c * l);
}, kg = (e, t) => Og(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height), Ag = (e) => jg(e.width) && jg(e.height) && jg(e.x) && jg(e.y), jg = (e) => !isNaN(e) && isFinite(e), Mg = (e, t) => (e, t) => {}, Ng = (e, t = [1, 1]) => ({
	x: t[0] * Math.round(e.x / t[0]),
	y: t[1] * Math.round(e.y / t[1])
}), Pg = ({ x: e, y: t }, [n, r, i], a = !1, o = [1, 1]) => {
	let s = {
		x: (e - n) / i,
		y: (t - r) / i
	};
	return a ? Ng(s, o) : s;
}, Fg = ({ x: e, y: t }, [n, r, i]) => ({
	x: e * i + n,
	y: t * i + r
});
function Ig(e, t) {
	if (typeof e == "number") return Math.floor((t - t / (1 + e)) * .5);
	if (typeof e == "string" && e.endsWith("px")) {
		let t = parseFloat(e);
		if (!Number.isNaN(t)) return Math.floor(t);
	}
	if (typeof e == "string" && e.endsWith("%")) {
		let n = parseFloat(e);
		if (!Number.isNaN(n)) return Math.floor(t * n * .01);
	}
	return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function Lg(e, t, n) {
	if (typeof e == "string" || typeof e == "number") {
		let r = Ig(e, n), i = Ig(e, t);
		return {
			top: r,
			right: i,
			bottom: r,
			left: i,
			x: i * 2,
			y: r * 2
		};
	}
	if (typeof e == "object") {
		let r = Ig(e.top ?? e.y ?? 0, n), i = Ig(e.bottom ?? e.y ?? 0, n), a = Ig(e.left ?? e.x ?? 0, t), o = Ig(e.right ?? e.x ?? 0, t);
		return {
			top: r,
			right: o,
			bottom: i,
			left: a,
			x: a + o,
			y: r + i
		};
	}
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		x: 0,
		y: 0
	};
}
function Rg(e, t, n, r, i, a) {
	let { x: o, y: s } = Fg(e, [
		t,
		n,
		r
	]), { x: c, y: l } = Fg({
		x: e.x + e.width,
		y: e.y + e.height
	}, [
		t,
		n,
		r
	]), u = i - c, d = a - l;
	return {
		left: Math.floor(o),
		top: Math.floor(s),
		right: Math.floor(u),
		bottom: Math.floor(d)
	};
}
var zg = (e, t, n, r, i, a) => {
	let o = Lg(a, t, n), s = (t - o.x) / e.width, c = (n - o.y) / e.height, l = _g(Math.min(s, c), r, i), u = e.x + e.width / 2, d = e.y + e.height / 2, f = t / 2 - u * l, p = n / 2 - d * l, m = Rg(e, f, p, l, t, n), h = {
		left: Math.min(m.left - o.left, 0),
		top: Math.min(m.top - o.top, 0),
		right: Math.min(m.right - o.right, 0),
		bottom: Math.min(m.bottom - o.bottom, 0)
	};
	return {
		x: f - h.left + h.right,
		y: p - h.top + h.bottom,
		zoom: l
	};
}, Bg = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Vg(e) {
	return e != null && e !== "parent";
}
function Hg(e) {
	return {
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}
function Ug(e) {
	return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function Wg(e, t = {
	width: 0,
	height: 0
}, n, r, i) {
	let a = { ...e }, o = r.get(n);
	if (o) {
		let e = o.origin || i;
		a.x += o.internals.positionAbsolute.x - (t.width ?? 0) * e[0], a.y += o.internals.positionAbsolute.y - (t.height ?? 0) * e[1];
	}
	return a;
}
function Gg(e) {
	return {
		...Xh,
		...e || {}
	};
}
function Kg(e, t) {
	if (!e && !t) return !0;
	if (!e || !t || e.size !== t.size) return !1;
	if (!e.size && !t.size) return !0;
	for (let n of e.keys()) if (!t.has(n)) return !1;
	return !0;
}
function qg(e, t, n) {
	if (!n) return;
	let r = [];
	e.forEach((e, n) => {
		t?.has(n) || r.push(e);
	}), r.length && n(r);
}
function Jg(e) {
	return e === null ? null : e ? "valid" : "invalid";
}
function Yg(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
	let { x: a, y: o } = t_(e), s = Pg({
		x: a - (i?.left ?? 0),
		y: o - (i?.top ?? 0)
	}, r), { x: c, y: l } = n ? Ng(s, t) : s;
	return {
		xSnapped: c,
		ySnapped: l,
		...s
	};
}
var Xg = (e) => ({
	width: e.offsetWidth,
	height: e.offsetHeight
}), Zg = (e) => e?.getRootNode?.() || window?.document, Qg = [
	"INPUT",
	"SELECT",
	"TEXTAREA"
];
function $g(e) {
	let t = e.composedPath?.()?.[0] || e.target;
	return t?.nodeType === 1 ? Qg.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey") : !1;
}
var e_ = (e) => "clientX" in e, t_ = (e, t) => {
	let n = e_(e), r = n ? e.clientX : e.touches?.[0].clientX, i = n ? e.clientY : e.touches?.[0].clientY;
	return {
		x: r - (t?.left ?? 0),
		y: i - (t?.top ?? 0)
	};
}, n_ = (e, t, n, r, i) => {
	let a = t.querySelectorAll(`.${e}`);
	return !a || !a.length ? null : Array.from(a).map((t) => {
		let a = t.getBoundingClientRect();
		return {
			id: t.getAttribute("data-handleid"),
			type: e,
			nodeId: i,
			position: t.getAttribute("data-handlepos"),
			x: (a.left - n.left) / r,
			y: (a.top - n.top) / r,
			...Xg(t)
		};
	});
};
function r_({ sourceX: e, sourceY: t, targetX: n, targetY: r, sourceControlX: i, sourceControlY: a, targetControlX: o, targetControlY: s }) {
	let c = e * .125 + i * .375 + o * .375 + n * .125, l = t * .125 + a * .375 + s * .375 + r * .125;
	return [
		c,
		l,
		Math.abs(c - e),
		Math.abs(l - t)
	];
}
function i_(e, t) {
	return e >= 0 ? .5 * e : t * 25 * Math.sqrt(-e);
}
function a_({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
	switch (e) {
		case rg.Left: return [t - i_(t - r, a), n];
		case rg.Right: return [t + i_(r - t, a), n];
		case rg.Top: return [t, n - i_(n - i, a)];
		case rg.Bottom: return [t, n + i_(i - n, a)];
	}
}
function o_({ sourceX: e, sourceY: t, sourcePosition: n = rg.Bottom, targetX: r, targetY: i, targetPosition: a = rg.Top, curvature: o = .25 }) {
	let [s, c] = a_({
		pos: n,
		x1: e,
		y1: t,
		x2: r,
		y2: i,
		c: o
	}), [l, u] = a_({
		pos: a,
		x1: r,
		y1: i,
		x2: e,
		y2: t,
		c: o
	}), [d, f, p, m] = r_({
		sourceX: e,
		sourceY: t,
		targetX: r,
		targetY: i,
		sourceControlX: s,
		sourceControlY: c,
		targetControlX: l,
		targetControlY: u
	});
	return [
		`M${e},${t} C${s},${c} ${l},${u} ${r},${i}`,
		d,
		f,
		p,
		m
	];
}
function s_({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let i = Math.abs(n - e) / 2, a = n < e ? n + i : n - i, o = Math.abs(r - t) / 2;
	return [
		a,
		r < t ? r + o : r - o,
		i,
		o
	];
}
function c_({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: r = 0, elevateOnSelect: i = !1, zIndexMode: a = "basic" }) {
	return a === "manual" ? r : (i && n ? r + 1e3 : r) + Math.max(e.parentId || i && e.selected ? e.internals.z : 0, t.parentId || i && t.selected ? t.internals.z : 0);
}
function l_({ sourceNode: e, targetNode: t, width: n, height: r, transform: i }) {
	let a = Sg(Eg(e), Eg(t));
	return a.x === a.x2 && (a.x2 += 1), a.y === a.y2 && (a.y2 += 1), kg({
		x: -i[0] / i[2],
		y: -i[1] / i[2],
		width: n / i[2],
		height: r / i[2]
	}, wg(a)) > 0;
}
var u_ = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`, d_ = (e, t) => t.some((t) => t.source === e.source && t.target === e.target && (t.sourceHandle === e.sourceHandle || !t.sourceHandle && !e.sourceHandle) && (t.targetHandle === e.targetHandle || !t.targetHandle && !e.targetHandle)), f_ = (e, t, n = {}) => {
	if (!e.source || !e.target) return n.onError?.("006", qh.error006()), t;
	let r = n.getEdgeId || u_, i;
	return i = ag(e) ? { ...e } : {
		...e,
		id: r(e)
	}, d_(i, t) ? t : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, t.concat(i));
};
function p_({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let [i, a, o, s] = s_({
		sourceX: e,
		sourceY: t,
		targetX: n,
		targetY: r
	});
	return [
		`M ${e},${t}L ${n},${r}`,
		i,
		a,
		o,
		s
	];
}
var m_ = {
	[rg.Left]: {
		x: -1,
		y: 0
	},
	[rg.Right]: {
		x: 1,
		y: 0
	},
	[rg.Top]: {
		x: 0,
		y: -1
	},
	[rg.Bottom]: {
		x: 0,
		y: 1
	}
}, h_ = ({ source: e, sourcePosition: t = rg.Bottom, target: n }) => t === rg.Left || t === rg.Right ? e.x < n.x ? {
	x: 1,
	y: 0
} : {
	x: -1,
	y: 0
} : e.y < n.y ? {
	x: 0,
	y: 1
} : {
	x: 0,
	y: -1
}, g_ = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
function __({ source: e, sourcePosition: t = rg.Bottom, target: n, targetPosition: r = rg.Top, center: i, offset: a, stepPosition: o }) {
	let s = m_[t], c = m_[r], l = {
		x: e.x + s.x * a,
		y: e.y + s.y * a
	}, u = {
		x: n.x + c.x * a,
		y: n.y + c.y * a
	}, d = h_({
		source: l,
		sourcePosition: t,
		target: u
	}), f = d.x === 0 ? "y" : "x", p = d[f], m = [], h, g, _ = {
		x: 0,
		y: 0
	}, v = {
		x: 0,
		y: 0
	}, [, , y, b] = s_({
		sourceX: e.x,
		sourceY: e.y,
		targetX: n.x,
		targetY: n.y
	});
	if (s[f] * c[f] === -1) {
		f === "x" ? (h = i.x ?? l.x + (u.x - l.x) * o, g = i.y ?? (l.y + u.y) / 2) : (h = i.x ?? (l.x + u.x) / 2, g = i.y ?? l.y + (u.y - l.y) * o);
		let e = [{
			x: h,
			y: l.y
		}, {
			x: h,
			y: u.y
		}], t = [{
			x: l.x,
			y: g
		}, {
			x: u.x,
			y: g
		}];
		m = s[f] === p ? f === "x" ? e : t : f === "x" ? t : e;
	} else {
		let i = [{
			x: l.x,
			y: u.y
		}], o = [{
			x: u.x,
			y: l.y
		}];
		if (m = f === "x" ? s.x === p ? o : i : s.y === p ? i : o, t === r) {
			let t = Math.abs(e[f] - n[f]);
			if (t <= a) {
				let r = Math.min(a - 1, a - t);
				s[f] === p ? _[f] = (l[f] > e[f] ? -1 : 1) * r : v[f] = (u[f] > n[f] ? -1 : 1) * r;
			}
		}
		if (t !== r) {
			let e = f === "x" ? "y" : "x", t = s[f] === c[e], n = l[e] > u[e], r = l[e] < u[e];
			(s[f] === 1 && (!t && n || t && r) || s[f] !== 1 && (!t && r || t && n)) && (m = f === "x" ? i : o);
		}
		let d = {
			x: l.x + _.x,
			y: l.y + _.y
		}, y = {
			x: u.x + v.x,
			y: u.y + v.y
		};
		Math.max(Math.abs(d.x - m[0].x), Math.abs(y.x - m[0].x)) >= Math.max(Math.abs(d.y - m[0].y), Math.abs(y.y - m[0].y)) ? (h = (d.x + y.x) / 2, g = m[0].y) : (h = m[0].x, g = (d.y + y.y) / 2);
	}
	let x = {
		x: l.x + _.x,
		y: l.y + _.y
	}, S = {
		x: u.x + v.x,
		y: u.y + v.y
	};
	return [
		[
			e,
			...x.x !== m[0].x || x.y !== m[0].y ? [x] : [],
			...m,
			...S.x !== m[m.length - 1].x || S.y !== m[m.length - 1].y ? [S] : [],
			n
		],
		h,
		g,
		y,
		b
	];
}
function v_(e, t, n, r) {
	let i = Math.min(g_(e, t) / 2, g_(t, n) / 2, r), { x: a, y: o } = t;
	if (e.x === a && a === n.x || e.y === o && o === n.y) return `L${a} ${o}`;
	if (e.y === o) {
		let t = e.x < n.x ? -1 : 1, r = e.y < n.y ? 1 : -1;
		return `L ${a + i * t},${o}Q ${a},${o} ${a},${o + i * r}`;
	}
	let s = e.x < n.x ? 1 : -1;
	return `L ${a},${o + i * (e.y < n.y ? -1 : 1)}Q ${a},${o} ${a + i * s},${o}`;
}
function y_({ sourceX: e, sourceY: t, sourcePosition: n = rg.Bottom, targetX: r, targetY: i, targetPosition: a = rg.Top, borderRadius: o = 5, centerX: s, centerY: c, offset: l = 20, stepPosition: u = .5 }) {
	let [d, f, p, m, h] = __({
		source: {
			x: e,
			y: t
		},
		sourcePosition: n,
		target: {
			x: r,
			y: i
		},
		targetPosition: a,
		center: {
			x: s,
			y: c
		},
		offset: l,
		stepPosition: u
	}), g = `M${d[0].x} ${d[0].y}`;
	for (let e = 1; e < d.length - 1; e++) g += v_(d[e - 1], d[e], d[e + 1], o);
	return g += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [
		g,
		f,
		p,
		m,
		h
	];
}
function b_(e) {
	return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function x_(e) {
	let { sourceNode: t, targetNode: n } = e;
	if (!b_(t) || !b_(n)) return null;
	let r = t.internals.handleBounds || S_(t.handles), i = n.internals.handleBounds || S_(n.handles), a = w_(r?.source ?? [], e.sourceHandle), o = w_(e.connectionMode === Zh.Strict ? i?.target ?? [] : (i?.target ?? []).concat(i?.source ?? []), e.targetHandle);
	if (!a || !o) return e.onError?.("008", qh.error008(a ? "target" : "source", {
		id: e.id,
		sourceHandle: e.sourceHandle,
		targetHandle: e.targetHandle
	})), null;
	let s = a?.position || rg.Bottom, c = o?.position || rg.Top, l = C_(t, a, s), u = C_(n, o, c);
	return {
		sourceX: l.x,
		sourceY: l.y,
		targetX: u.x,
		targetY: u.y,
		sourcePosition: s,
		targetPosition: c
	};
}
function S_(e) {
	if (!e) return null;
	let t = [], n = [];
	for (let r of e) r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? t.push(r) : r.type === "target" && n.push(r);
	return {
		source: t,
		target: n
	};
}
function C_(e, t, n = rg.Left, r = !1) {
	let i = (t?.x ?? 0) + e.internals.positionAbsolute.x, a = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: o, height: s } = t ?? Hg(e);
	if (r) return {
		x: i + o / 2,
		y: a + s / 2
	};
	switch (t?.position ?? n) {
		case rg.Top: return {
			x: i + o / 2,
			y: a
		};
		case rg.Right: return {
			x: i + o,
			y: a + s / 2
		};
		case rg.Bottom: return {
			x: i + o / 2,
			y: a + s
		};
		case rg.Left: return {
			x: i,
			y: a + s / 2
		};
	}
}
function w_(e, t) {
	return e && (t ? e.find((e) => e.id === t) : e[0]) || null;
}
function T_(e, t) {
	return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((t) => `${t}=${e[t]}`).join("&")}` : "";
}
function E_(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: i }) {
	let a = /* @__PURE__ */ new Set();
	return e.reduce((e, o) => ([o.markerStart || r, o.markerEnd || i].forEach((r) => {
		if (r && typeof r == "object") {
			let i = T_(r, t);
			a.has(i) || (e.push({
				id: i,
				color: r.color || n,
				...r
			}), a.add(i));
		}
	}), e), []).sort((e, t) => e.id.localeCompare(t.id));
}
var D_ = 1e3, O_ = 10, k_ = {
	nodeOrigin: [0, 0],
	nodeExtent: Jh,
	elevateNodesOnSelect: !0,
	zIndexMode: "basic",
	defaults: {}
}, A_ = {
	...k_,
	checkEquality: !0
};
function j_(e, t) {
	let n = { ...e };
	for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}
function M_(e, t, n) {
	let r = j_(k_, n);
	for (let n of e.values()) if (n.parentId) L_(n, e, t, r);
	else {
		let e = vg(cg(n, r.nodeOrigin), Vg(n.extent) ? n.extent : r.nodeExtent, Hg(n));
		n.internals.positionAbsolute = e;
	}
}
function N_(e, t) {
	if (!e.handles) return e.measured ? t?.internals.handleBounds : void 0;
	let n = [], r = [];
	for (let t of e.handles) {
		let i = {
			id: t.id,
			width: t.width ?? 1,
			height: t.height ?? 1,
			nodeId: e.id,
			x: t.x,
			y: t.y,
			position: t.position,
			type: t.type
		};
		t.type === "source" ? n.push(i) : t.type === "target" && r.push(i);
	}
	return {
		source: n,
		target: r
	};
}
function P_(e) {
	return e === "manual";
}
function F_(e, t, n, r = {}) {
	let i = j_(A_, r), a = { i: 0 }, o = new Map(t), s = i?.elevateNodesOnSelect && !P_(i.zIndexMode) ? D_ : 0, c = e.length > 0, l = !1;
	t.clear(), n.clear();
	for (let u of e) {
		let e = o.get(u.id);
		if (i.checkEquality && u === e?.internals.userNode) t.set(u.id, e);
		else {
			let n = vg(cg(u, i.nodeOrigin), Vg(u.extent) ? u.extent : i.nodeExtent, Hg(u));
			e = {
				...i.defaults,
				...u,
				measured: {
					width: u.measured?.width,
					height: u.measured?.height
				},
				internals: {
					positionAbsolute: n,
					handleBounds: N_(u, e),
					z: R_(u, s, i.zIndexMode),
					userNode: u
				}
			}, t.set(u.id, e);
		}
		(e.measured === void 0 || e.measured.width === void 0 || e.measured.height === void 0) && !e.hidden && (c = !1), u.parentId && L_(e, t, n, r, a), l ||= u.selected ?? !1;
	}
	return {
		nodesInitialized: c,
		hasSelectedNodes: l
	};
}
function I_(e, t) {
	if (!e.parentId) return;
	let n = t.get(e.parentId);
	n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function L_(e, t, n, r, i) {
	let { elevateNodesOnSelect: a, nodeOrigin: o, nodeExtent: s, zIndexMode: c } = j_(k_, r), l = e.parentId, u = t.get(l);
	if (!u) {
		console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
		return;
	}
	I_(e, n), i && !u.parentId && u.internals.rootParentIndex === void 0 && c === "auto" && (u.internals.rootParentIndex = ++i.i, u.internals.z = u.internals.z + i.i * O_), i && u.internals.rootParentIndex !== void 0 && (i.i = u.internals.rootParentIndex);
	let { x: d, y: f, z: p } = z_(e, u, o, s, a && !P_(c) ? D_ : 0, c), { positionAbsolute: m } = e.internals, h = d !== m.x || f !== m.y;
	(h || p !== e.internals.z) && t.set(e.id, {
		...e,
		internals: {
			...e.internals,
			positionAbsolute: h ? {
				x: d,
				y: f
			} : m,
			z: p
		}
	});
}
function R_(e, t, n) {
	let r = jg(e.zIndex) ? e.zIndex : 0;
	return P_(n) ? r : r + (e.selected ? t : 0);
}
function z_(e, t, n, r, i, a) {
	let { x: o, y: s } = t.internals.positionAbsolute, c = Hg(e), l = cg(e, n), u = Vg(e.extent) ? vg(l, e.extent, c) : l, d = vg({
		x: o + u.x,
		y: s + u.y
	}, r, c);
	e.extent === "parent" && (d = yg(d, c, t));
	let f = R_(e, i, a), p = t.internals.z ?? 0;
	return {
		x: d.x,
		y: d.y,
		z: p >= f ? p + 1 : f
	};
}
function B_(e, t, n, r = [0, 0]) {
	let i = [], a = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.parentId);
		if (!e) continue;
		let r = Dg(a.get(n.parentId)?.expandedRect ?? Tg(e), n.rect);
		a.set(n.parentId, {
			expandedRect: r,
			parent: e
		});
	}
	return a.size > 0 && a.forEach(({ expandedRect: t, parent: a }, o) => {
		let s = a.internals.positionAbsolute, c = Hg(a), l = a.origin ?? r, u = t.x < s.x ? Math.round(Math.abs(s.x - t.x)) : 0, d = t.y < s.y ? Math.round(Math.abs(s.y - t.y)) : 0, f = Math.max(c.width, Math.round(t.width)), p = Math.max(c.height, Math.round(t.height)), m = (f - c.width) * l[0], h = (p - c.height) * l[1];
		(u > 0 || d > 0 || m || h) && (i.push({
			id: o,
			type: "position",
			position: {
				x: a.position.x - u + m,
				y: a.position.y - d + h
			}
		}), n.get(o)?.forEach((t) => {
			e.some((e) => e.id === t.id) || i.push({
				id: t.id,
				type: "position",
				position: {
					x: t.position.x + u,
					y: t.position.y + d
				}
			});
		})), (c.width < t.width || c.height < t.height || u || d) && i.push({
			id: o,
			type: "dimensions",
			setAttributes: !0,
			dimensions: {
				width: f + (u ? l[0] * u - m : 0),
				height: p + (d ? l[1] * d - h : 0)
			}
		});
	}), i;
}
function V_(e, t, n, r, i, a, o) {
	let s = r?.querySelector(".xyflow__viewport"), c = !1;
	if (!s) return {
		changes: [],
		updatedInternals: c
	};
	let l = [], u = window.getComputedStyle(s), { m22: d } = new window.DOMMatrixReadOnly(u.transform), f = [];
	for (let r of e.values()) {
		let e = t.get(r.id);
		if (!e) continue;
		if (e.hidden) {
			t.set(e.id, {
				...e,
				internals: {
					...e.internals,
					handleBounds: void 0
				}
			}), c = !0;
			continue;
		}
		let s = Xg(r.nodeElement), u = e.measured.width !== s.width || e.measured.height !== s.height;
		if (s.width && s.height && (u || !e.internals.handleBounds || r.force)) {
			let p = r.nodeElement.getBoundingClientRect(), m = Vg(e.extent) ? e.extent : a, { positionAbsolute: h } = e.internals;
			if (e.parentId && e.extent === "parent") {
				let n = t.get(e.parentId);
				n && (h = yg(h, s, n));
			} else m && (h = vg(h, m, s));
			let g = {
				...e,
				measured: s,
				internals: {
					...e.internals,
					positionAbsolute: h,
					handleBounds: {
						source: n_("source", r.nodeElement, p, d, e.id),
						target: n_("target", r.nodeElement, p, d, e.id)
					}
				}
			};
			t.set(e.id, g), e.parentId && L_(g, t, n, {
				nodeOrigin: i,
				zIndexMode: o
			}), c = !0, u && (l.push({
				id: e.id,
				type: "dimensions",
				dimensions: s
			}), e.expandParent && e.parentId && f.push({
				id: e.id,
				parentId: e.parentId,
				rect: Tg(g, i)
			}));
		}
	}
	if (f.length > 0) {
		let e = B_(f, t, n, i);
		l.push(...e);
	}
	return {
		changes: l,
		updatedInternals: c
	};
}
async function H_({ delta: e, panZoom: t, transform: n, translateExtent: r, width: i, height: a }) {
	if (!t || !e.x && !e.y) return !1;
	let o = await t.setViewportConstrained({
		x: n[0] + e.x,
		y: n[1] + e.y,
		zoom: n[2]
	}, [[0, 0], [i, a]], r);
	return !!o && (o.x !== n[0] || o.y !== n[1] || o.k !== n[2]);
}
function U_(e, t, n, r, i, a) {
	let o = i, s = r.get(o) || /* @__PURE__ */ new Map();
	r.set(o, s.set(n, t)), o = `${i}-${e}`;
	let c = r.get(o) || /* @__PURE__ */ new Map();
	if (r.set(o, c.set(n, t)), a) {
		o = `${i}-${e}-${a}`;
		let s = r.get(o) || /* @__PURE__ */ new Map();
		r.set(o, s.set(n, t));
	}
}
function W_(e, t, n) {
	e.clear(), t.clear();
	for (let r of n) {
		let { source: n, target: i, sourceHandle: a = null, targetHandle: o = null } = r, s = {
			edgeId: r.id,
			source: n,
			target: i,
			sourceHandle: a,
			targetHandle: o
		}, c = `${n}-${a}--${i}-${o}`;
		U_("source", s, `${i}-${o}--${n}-${a}`, e, n, a), U_("target", s, c, e, i, o), t.set(r.id, r);
	}
}
function G_(e, t) {
	if (!e.parentId) return !1;
	let n = t.get(e.parentId);
	return n ? n.selected ? !0 : G_(n, t) : !1;
}
function K_(e, t, n) {
	let r = e;
	do {
		if (r?.matches?.(t)) return !0;
		if (r === n) return !1;
		r = r?.parentElement;
	} while (r);
	return !1;
}
function q_(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let [a, o] of e) if ((o.selected || o.id === r) && (!o.parentId || !G_(o, e)) && (o.draggable || t && o.draggable === void 0)) {
		let t = e.get(a);
		t && i.set(a, {
			id: a,
			position: t.position || {
				x: 0,
				y: 0
			},
			distance: {
				x: n.x - t.internals.positionAbsolute.x,
				y: n.y - t.internals.positionAbsolute.y
			},
			extent: t.extent,
			parentId: t.parentId,
			origin: t.origin,
			expandParent: t.expandParent,
			internals: { positionAbsolute: t.internals.positionAbsolute || {
				x: 0,
				y: 0
			} },
			measured: {
				width: t.measured.width ?? 0,
				height: t.measured.height ?? 0
			}
		});
	}
	return i;
}
function J_({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
	let i = [];
	for (let [e, a] of t) {
		let t = n.get(e)?.internals.userNode;
		t && i.push({
			...t,
			position: a.position,
			dragging: r
		});
	}
	if (!e) return [i[0], i];
	let a = n.get(e)?.internals.userNode;
	return [a ? {
		...a,
		position: t.get(e)?.position || a.position,
		dragging: r
	} : i[0], i];
}
function Y_({ dragItems: e, snapGrid: t, x: n, y: r }) {
	let i = e.values().next().value;
	if (!i) return null;
	let a = {
		x: n - i.distance.x,
		y: r - i.distance.y
	}, o = Ng(a, t);
	return {
		x: o.x - a.x,
		y: o.y - a.y
	};
}
function X_({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: i }) {
	let a = {
		x: null,
		y: null
	}, o = 0, s = /* @__PURE__ */ new Map(), c = !1, l = {
		x: 0,
		y: 0
	}, u = null, d = !1, f = null, p = !1, m = !1, h = null;
	function g({ noDragClassName: g, handleSelector: _, domNode: v, isSelectable: y, nodeId: b, nodeClickDistance: x = 0 }) {
		f = hf(v);
		function S({ x: e, y: n }) {
			let { nodeLookup: i, nodeExtent: o, snapGrid: c, snapToGrid: l, nodeOrigin: u, onNodeDrag: d, onSelectionDrag: f, onError: p, updateNodePositions: g } = t();
			a = {
				x: e,
				y: n
			};
			let _ = !1, v = s.size > 1, y = v && o ? Cg(ug(s)) : null, x = v && l ? Y_({
				dragItems: s,
				snapGrid: c,
				x: e,
				y: n
			}) : null;
			for (let [t, r] of s) {
				if (!i.has(t)) continue;
				let a = {
					x: e - r.distance.x,
					y: n - r.distance.y
				};
				l && (a = x ? {
					x: Math.round(a.x + x.x),
					y: Math.round(a.y + x.y)
				} : Ng(a, c));
				let s = null;
				if (v && o && !r.extent && y) {
					let { positionAbsolute: e } = r.internals, t = e.x - y.x + o[0][0], n = e.x + r.measured.width - y.x2 + o[1][0], i = e.y - y.y + o[0][1], a = e.y + r.measured.height - y.y2 + o[1][1];
					s = [[t, i], [n, a]];
				}
				let { position: d, positionAbsolute: f } = hg({
					nodeId: t,
					nextPosition: a,
					nodeLookup: i,
					nodeExtent: s || o,
					nodeOrigin: u,
					onError: p
				});
				_ = _ || r.position.x !== d.x || r.position.y !== d.y, r.position = d, r.internals.positionAbsolute = f;
			}
			if (m ||= _, _ && (g(s, !0), h && (r || d || !b && f))) {
				let [e, t] = J_({
					nodeId: b,
					dragItems: s,
					nodeLookup: i
				});
				r?.(h, s, e, t), d?.(h, e, t), b || f?.(h, t);
			}
		}
		async function C() {
			if (!u) return;
			let { transform: e, panBy: n, autoPanSpeed: r, autoPanOnNodeDrag: i } = t();
			if (!i) {
				c = !1, cancelAnimationFrame(o);
				return;
			}
			let [s, d] = xg(l, u, r);
			(s !== 0 || d !== 0) && (a.x = (a.x ?? 0) - s / e[2], a.y = (a.y ?? 0) - d / e[2], await n({
				x: s,
				y: d
			}) && S(a)), o = requestAnimationFrame(C);
		}
		function w(r) {
			let { nodeLookup: i, multiSelectionActive: o, nodesDraggable: c, transform: l, snapGrid: f, snapToGrid: p, selectNodesOnDrag: m, onNodeDragStart: h, onSelectionDragStart: g, unselectNodesAndEdges: _ } = t();
			d = !0, (!m || !y) && !o && b && (i.get(b)?.selected || _()), y && m && b && e?.(b);
			let v = Yg(r.sourceEvent, {
				transform: l,
				snapGrid: f,
				snapToGrid: p,
				containerBounds: u
			});
			if (a = v, s = q_(i, c, v, b), s.size > 0 && (n || h || !b && g)) {
				let [e, t] = J_({
					nodeId: b,
					dragItems: s,
					nodeLookup: i
				});
				n?.(r.sourceEvent, s, e, t), h?.(r.sourceEvent, e, t), b || g?.(r.sourceEvent, t);
			}
		}
		let T = Af().clickDistance(x).on("start", (e) => {
			let { domNode: n, nodeDragThreshold: r, transform: i, snapGrid: o, snapToGrid: s } = t();
			u = n?.getBoundingClientRect() || null, p = !1, m = !1, h = e.sourceEvent, r === 0 && w(e), a = Yg(e.sourceEvent, {
				transform: i,
				snapGrid: o,
				snapToGrid: s,
				containerBounds: u
			}), l = t_(e.sourceEvent, u);
		}).on("drag", (e) => {
			let { autoPanOnNodeDrag: n, transform: r, snapGrid: i, snapToGrid: o, nodeDragThreshold: f, nodeLookup: m } = t(), g = Yg(e.sourceEvent, {
				transform: r,
				snapGrid: i,
				snapToGrid: o,
				containerBounds: u
			});
			if (h = e.sourceEvent, (e.sourceEvent.type === "touchmove" && e.sourceEvent.touches.length > 1 || b && !m.has(b)) && (p = !0), !p) {
				if (!c && n && d && (c = !0, C()), !d) {
					let t = t_(e.sourceEvent, u), n = t.x - l.x, r = t.y - l.y;
					Math.sqrt(n * n + r * r) > f && w(e);
				}
				(a.x !== g.xSnapped || a.y !== g.ySnapped) && s && d && (l = t_(e.sourceEvent, u), S(g));
			}
		}).on("end", (e) => {
			if (!d || p) {
				p && s.size > 0 && t().updateNodePositions(s, !1);
				return;
			}
			if (c = !1, d = !1, cancelAnimationFrame(o), s.size > 0) {
				let { nodeLookup: n, updateNodePositions: r, onNodeDragStop: a, onSelectionDragStop: o } = t();
				if (m &&= (r(s, !1), !1), i || a || !b && o) {
					let [t, r] = J_({
						nodeId: b,
						dragItems: s,
						nodeLookup: n,
						dragging: !1
					});
					i?.(e.sourceEvent, s, t, r), a?.(e.sourceEvent, t, r), b || o?.(e.sourceEvent, r);
				}
			}
		}).filter((e) => {
			let t = e.target;
			return !e.button && (!g || !K_(t, `.${g}`, v)) && (!_ || K_(t, _, v));
		});
		f.call(T);
	}
	function _() {
		f?.on(".drag", null);
	}
	return {
		update: g,
		destroy: _
	};
}
function Z_(e, t, n) {
	let r = [], i = {
		x: e.x - n,
		y: e.y - n,
		width: n * 2,
		height: n * 2
	};
	for (let e of t.values()) kg(i, Tg(e)) > 0 && r.push(e);
	return r;
}
var Q_ = 250;
function $_(e, t, n, r) {
	let i = [], a = Infinity, o = Z_(e, n, t + Q_);
	for (let n of o) {
		let o = [...n.internals.handleBounds?.source ?? [], ...n.internals.handleBounds?.target ?? []];
		for (let s of o) {
			if (r.nodeId === s.nodeId && r.type === s.type && r.id === s.id) continue;
			let { x: o, y: c } = C_(n, s, s.position, !0), l = Math.sqrt((o - e.x) ** 2 + (c - e.y) ** 2);
			l > t || (l < a ? (i = [{
				...s,
				x: o,
				y: c
			}], a = l) : l === a && i.push({
				...s,
				x: o,
				y: c
			}));
		}
	}
	if (!i.length) return null;
	if (i.length > 1) {
		let e = r.type === "source" ? "target" : "source";
		return i.find((t) => t.type === e) ?? i[0];
	}
	return i[0];
}
function ev(e, t, n, r, i, a = !1) {
	let o = r.get(e);
	if (!o) return null;
	let s = i === "strict" ? o.internals.handleBounds?.[t] : [...o.internals.handleBounds?.source ?? [], ...o.internals.handleBounds?.target ?? []], c = (n ? s?.find((e) => e.id === n) : s?.[0]) ?? null;
	return c && a ? {
		...c,
		...C_(o, c, c.position, !0)
	} : c;
}
function tv(e, t) {
	return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function nv(e, t) {
	let n = null;
	return t ? n = !0 : e && !t && (n = !1), n;
}
var rv = () => !0;
function iv(e, { connectionMode: t, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: a, isTarget: o, domNode: s, nodeLookup: c, lib: l, autoPanOnConnect: u, flowId: d, panBy: f, cancelConnection: p, onConnectStart: m, onConnect: h, onConnectEnd: g, isValidConnection: _ = rv, onReconnectEnd: v, updateConnection: y, getTransform: b, getFromHandle: x, autoPanSpeed: S, dragThreshold: C = 1, handleDomNode: w }) {
	let T = Zg(e.target), E = 0, D, { x: O, y: k } = t_(e), A = tv(a, w), j = s?.getBoundingClientRect(), ee = !1;
	if (!j || !A) return;
	let M = ev(i, A, r, c, t);
	if (!M) return;
	let N = t_(e, j), te = !1, ne = null, re = !1, ie = null;
	function ae() {
		if (!u || !j) return;
		let [e, t] = xg(N, j, S);
		f({
			x: e,
			y: t
		}), E = requestAnimationFrame(ae);
	}
	let oe = {
		...M,
		nodeId: i,
		type: A,
		position: M.position
	}, se = c.get(i), ce = {
		inProgress: !0,
		isValid: null,
		from: C_(se, oe, rg.Left, !0),
		fromHandle: oe,
		fromPosition: oe.position,
		fromNode: se,
		to: N,
		toHandle: null,
		toPosition: ig[oe.position],
		toNode: null,
		pointer: N
	};
	function le() {
		ee = !0, y(ce), m?.(e, {
			nodeId: i,
			handleId: r,
			handleType: A
		});
	}
	C === 0 && le();
	function ue(e) {
		if (!ee) {
			let { x: t, y: n } = t_(e), r = t - O, i = n - k;
			if (!(r * r + i * i > C * C)) return;
			le();
		}
		if (!x() || !oe) {
			de(e);
			return;
		}
		let a = b();
		N = t_(e, j), D = $_(Pg(N, a, !1, [1, 1]), n, c, oe), te ||= (ae(), !0);
		let s = av(e, {
			handle: D,
			connectionMode: t,
			fromNodeId: i,
			fromHandleId: r,
			fromType: o ? "target" : "source",
			isValidConnection: _,
			doc: T,
			lib: l,
			flowId: d,
			nodeLookup: c
		});
		ie = s.handleDomNode, ne = s.connection, re = nv(!!D, s.isValid);
		let u = c.get(i), f = u ? C_(u, oe, rg.Left, !0) : ce.from, p = {
			...ce,
			from: f,
			isValid: re,
			to: s.toHandle && re ? Fg({
				x: s.toHandle.x,
				y: s.toHandle.y
			}, a) : N,
			toHandle: s.toHandle,
			toPosition: re && s.toHandle ? s.toHandle.position : ig[oe.position],
			toNode: s.toHandle ? c.get(s.toHandle.nodeId) : null,
			pointer: N
		};
		y(p), ce = p;
	}
	function de(e) {
		if (!("touches" in e && e.touches.length > 0)) {
			if (ee) {
				(D || ie) && ne && re && h?.(ne);
				let { inProgress: t, ...n } = ce, r = {
					...n,
					toPosition: ce.toHandle ? ce.toPosition : null
				};
				g?.(e, r), a && v?.(e, r);
			}
			p(), cancelAnimationFrame(E), te = !1, re = !1, ne = null, ie = null, T.removeEventListener("mousemove", ue), T.removeEventListener("mouseup", de), T.removeEventListener("touchmove", ue), T.removeEventListener("touchend", de);
		}
	}
	T.addEventListener("mousemove", ue), T.addEventListener("mouseup", de), T.addEventListener("touchmove", ue), T.addEventListener("touchend", de);
}
function av(e, { handle: t, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: a, doc: o, lib: s, flowId: c, isValidConnection: l = rv, nodeLookup: u }) {
	let d = a === "target", f = t ? o.querySelector(`.${s}-flow__handle[data-id="${c}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: m } = t_(e), h = o.elementFromPoint(p, m), g = h?.classList.contains(`${s}-flow__handle`) ? h : f, _ = {
		handleDomNode: g,
		isValid: !1,
		connection: null,
		toHandle: null
	};
	if (g) {
		let e = tv(void 0, g), t = g.getAttribute("data-nodeid"), a = g.getAttribute("data-handleid"), o = g.classList.contains("connectable"), s = g.classList.contains("connectableend");
		if (!t || !e) return _;
		let c = {
			source: d ? t : r,
			sourceHandle: d ? a : i,
			target: d ? r : t,
			targetHandle: d ? i : a
		};
		_.connection = c, _.isValid = o && s && (n === Zh.Strict ? d && e === "source" || !d && e === "target" : t !== r || a !== i) && l(c), _.toHandle = ev(t, e, a, u, n, !0);
	}
	return _;
}
var ov = {
	onPointerDown: iv,
	isValid: av
};
function sv({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
	let i = hf(e);
	function a({ translateExtent: e, width: a, height: o, zoomStep: s = 1, pannable: c = !0, zoomable: l = !0, inversePan: u = !1 }) {
		let d = (e) => {
			if (e.sourceEvent.type !== "wheel" || !t) return;
			let r = n(), i = e.sourceEvent.ctrlKey && Bg() ? 10 : 1, a = -e.sourceEvent.deltaY * (e.sourceEvent.deltaMode === 1 ? .05 : e.sourceEvent.deltaMode ? 1 : .002) * s, o = r[2] * 2 ** (a * i);
			t.scaleTo(o);
		}, f = [0, 0], p = Kh().on("start", (e) => {
			(e.sourceEvent.type === "mousedown" || e.sourceEvent.type === "touchstart") && (f = [e.sourceEvent.clientX ?? e.sourceEvent.touches[0].clientX, e.sourceEvent.clientY ?? e.sourceEvent.touches[0].clientY]);
		}).on("zoom", c ? (i) => {
			let s = n();
			if (i.sourceEvent.type !== "mousemove" && i.sourceEvent.type !== "touchmove" || !t) return;
			let c = [i.sourceEvent.clientX ?? i.sourceEvent.touches[0].clientX, i.sourceEvent.clientY ?? i.sourceEvent.touches[0].clientY], l = [c[0] - f[0], c[1] - f[1]];
			f = c;
			let d = r() * Math.max(s[2], Math.log(s[2])) * (u ? -1 : 1), p = {
				x: s[0] - l[0] * d,
				y: s[1] - l[1] * d
			}, m = [[0, 0], [a, o]];
			t.setViewportConstrained({
				x: p.x,
				y: p.y,
				zoom: s[2]
			}, m, e);
		} : null).on("zoom.wheel", l ? d : null);
		i.call(p, {});
	}
	function o() {
		i.on("zoom", null);
	}
	return {
		update: a,
		destroy: o,
		pointer: _f
	};
}
var cv = (e) => ({
	x: e.x,
	y: e.y,
	zoom: e.k
}), lv = ({ x: e, y: t, zoom: n }) => Ih.translate(e, t).scale(n), uv = (e, t) => e.target.closest(`.${t}`), dv = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), fv = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, pv = (e, t = 0, n = fv, r = () => {}) => {
	let i = typeof t == "number" && t > 0;
	return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}, mv = (e) => {
	let t = e.ctrlKey && Bg() ? 10 : 1;
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * t;
};
function hv({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: a, zoomOnPinch: o, onPanZoomStart: s, onPanZoom: c, onPanZoomEnd: l }) {
	return (u) => {
		if (uv(u, t)) return u.ctrlKey && u.preventDefault(), !1;
		u.preventDefault(), u.stopImmediatePropagation();
		let d = n.property("__zoom").k || 1;
		if (u.ctrlKey && o) {
			let e = _f(u), t = d * 2 ** mv(u);
			r.scaleTo(n, t, e, u);
			return;
		}
		let f = u.deltaMode === 1 ? 20 : 1, p = i === Qh.Vertical ? 0 : u.deltaX * f, m = i === Qh.Horizontal ? 0 : u.deltaY * f;
		!Bg() && u.shiftKey && i !== Qh.Vertical && (p = u.deltaY * f, m = 0), r.translateBy(n, -(p / d) * a, -(m / d) * a, { internal: !0 });
		let h = cv(n.property("__zoom"));
		clearTimeout(e.panScrollTimeout), e.isPanScrolling ? c?.(u, h) : (e.isPanScrolling = !0, s?.(u, h)), e.panScrollTimeout = setTimeout(() => {
			l?.(u, h), e.isPanScrolling = !1;
		}, 150);
	};
}
function gv({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
	return function(r, i) {
		let a = r.type === "wheel", o = !t && a && !r.ctrlKey, s = uv(r, e);
		if (r.ctrlKey && a && s && r.preventDefault(), o || s) return null;
		r.preventDefault(), n.call(this, r, i);
	};
}
function _v({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
	return (r) => {
		if (r.sourceEvent?.internal) return;
		let i = cv(r.transform);
		e.mouseButton = r.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = i, r.sourceEvent?.type === "mousedown" && t(!0), n && n?.(r.sourceEvent, i);
	};
}
function vv({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
	return (a) => {
		e.usedRightMouseButton = !!(n && dv(t, e.mouseButton ?? 0)), a.sourceEvent?.sync || r([
			a.transform.x,
			a.transform.y,
			a.transform.k
		]), i && !a.sourceEvent?.internal && i?.(a.sourceEvent, cv(a.transform));
	};
}
function yv({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: a }) {
	return (o) => {
		if (!o.sourceEvent?.internal && (e.isZoomingOrPanning = !1, a && dv(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && o.sourceEvent && a(o.sourceEvent), e.usedRightMouseButton = !1, r(!1), i)) {
			let t = cv(o.transform);
			e.prevViewport = t, clearTimeout(e.timerId), e.timerId = setTimeout(() => {
				i?.(o.sourceEvent, t);
			}, n ? 150 : 0);
		}
	};
}
function bv({ panActivationKeyPressed: e, zoomActivationKeyPressed: t, zoomOnScroll: n, zoomOnPinch: r, panOnDrag: i, panOnScroll: a, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: c, noPanClassName: l, lib: u, connectionInProgress: d }) {
	return (f) => {
		let p = t || n, m = r && f.ctrlKey, h = f.type === "wheel";
		if (f.button === 1 && f.type === "mousedown" && (uv(f, `${u}-flow__node`) || uv(f, `${u}-flow__edge`) || uv(f, `${u}-flow__selection`) || uv(f, `${u}-flow__nodesselection`))) return !0;
		if (!i && !p && !a && !o && !r || s || d && !h || uv(f, c) && h || uv(f, l) && (!h || a && h && !t) || !r && f.ctrlKey && h) return !1;
		if (!r && f.type === "touchstart" && f.touches?.length > 1) return f.preventDefault(), !1;
		if (!p && !a && !m && h || !i && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(i) && !i.includes(f.button) && f.type === "mousedown") return !1;
		let g = Array.isArray(i) && i.includes(f.button) || !f.button || f.button <= 1;
		return (!f.ctrlKey || h || e) && g;
	};
}
function xv({ domNode: e, minZoom: t, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: a, onPanZoomStart: o, onPanZoomEnd: s, onDraggingChange: c }) {
	let l = {
		isZoomingOrPanning: !1,
		usedRightMouseButton: !1,
		prevViewport: {},
		mouseButton: 0,
		timerId: void 0,
		panScrollTimeout: void 0,
		isPanScrolling: !1
	}, u = e.getBoundingClientRect(), d = [[0, 0], [u.width, u.height]];
	(typeof ResizeObserver < "u" ? new ResizeObserver((e) => {
		let t = e[0];
		t && (d = [[0, 0], [t.contentRect.width, t.contentRect.height]]);
	}) : null)?.observe(e);
	let f = Kh().extent(() => d).scaleExtent([t, n]).translateExtent(r), p = hf(e).call(f);
	y({
		x: i.x,
		y: i.y,
		zoom: _g(i.zoom, t, n)
	}, [[0, 0], [u.width, u.height]], r);
	let m = p.on("wheel.zoom"), h = p.on("dblclick.zoom");
	f.wheelDelta(mv);
	async function g(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Np : qp).transform(pv(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function _({ noWheelClassName: e, noPanClassName: t, onPaneContextMenu: n, userSelectionActive: r, panOnScroll: i, panOnDrag: u, panOnScrollMode: d, panOnScrollSpeed: g, preventScrolling: _, zoomOnPinch: y, zoomOnScroll: b, zoomOnDoubleClick: x, panActivationKeyPressed: S = !1, zoomActivationKeyPressed: C, lib: w, onTransformChange: T, connectionInProgress: E, paneClickDistance: D, selectionOnDrag: O }) {
		r && !l.isZoomingOrPanning && v();
		let k = i && !C && !r;
		f.clickDistance(O ? Infinity : !jg(D) || D < 0 ? 0 : D);
		let A = k ? hv({
			zoomPanValues: l,
			noWheelClassName: e,
			d3Selection: p,
			d3Zoom: f,
			panOnScrollMode: d,
			panOnScrollSpeed: g,
			zoomOnPinch: y,
			onPanZoomStart: o,
			onPanZoom: a,
			onPanZoomEnd: s
		}) : gv({
			noWheelClassName: e,
			preventScrolling: _,
			d3ZoomHandler: m
		});
		p.on("wheel.zoom", A, { passive: !1 });
		let j = _v({
			zoomPanValues: l,
			onDraggingChange: c,
			onPanZoomStart: o
		});
		f.on("start", j);
		let ee = vv({
			zoomPanValues: l,
			panOnDrag: u,
			onPaneContextMenu: !!n,
			onPanZoom: a,
			onTransformChange: T
		});
		f.on("zoom", ee);
		let M = yv({
			zoomPanValues: l,
			panOnDrag: u,
			panOnScroll: i,
			onPaneContextMenu: n,
			onPanZoomEnd: s,
			onDraggingChange: c
		});
		f.on("end", M);
		let N = bv({
			panActivationKeyPressed: S,
			zoomActivationKeyPressed: C,
			panOnDrag: u,
			zoomOnScroll: b,
			panOnScroll: i,
			zoomOnDoubleClick: x,
			zoomOnPinch: y,
			userSelectionActive: r,
			noPanClassName: t,
			noWheelClassName: e,
			lib: w,
			connectionInProgress: E
		});
		f.filter(N), x ? p.on("dblclick.zoom", h) : p.on("dblclick.zoom", null);
	}
	function v() {
		f.on("zoom", null);
	}
	async function y(e, t, n) {
		let r = lv(e), i = f?.constrain()(r, t, n);
		return i && await g(i), i;
	}
	async function b(e, t) {
		let n = lv(e);
		return await g(n, t), n;
	}
	function x(e) {
		if (p) {
			let t = lv(e), n = p.property("__zoom");
			(n.k !== e.zoom || n.x !== e.x || n.y !== e.y) && f?.transform(p, t, null, { sync: !0 });
		}
	}
	function S() {
		let e = p ? Lh(p.node()) : {
			x: 0,
			y: 0,
			k: 1
		};
		return {
			x: e.x,
			y: e.y,
			zoom: e.k
		};
	}
	async function C(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Np : qp).scaleTo(pv(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	async function w(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Np : qp).scaleBy(pv(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function T(e) {
		f?.scaleExtent(e);
	}
	function E(e) {
		f?.translateExtent(e);
	}
	function D(e) {
		let t = !jg(e) || e < 0 ? 0 : e;
		f?.clickDistance(t);
	}
	return {
		update: _,
		destroy: v,
		setViewport: b,
		setViewportConstrained: y,
		getViewport: S,
		scaleTo: C,
		scaleBy: w,
		setScaleExtent: T,
		setTranslateExtent: E,
		syncViewport: x,
		setClickDistance: D
	};
}
var Sv;
(function(e) {
	e.Line = "line", e.Handle = "handle";
})(Sv ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/edges.js
var Cv = Mg("Svelte Flow", "https://svelteflow.dev/");
function wv(e, t, n = {}) {
	return f_(e, t, {
		...n,
		onError: n.onError ?? Cv
	});
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/context.js
function Tv() {
	let e = {};
	return [(t) => {
		if (t && !yt(e)) throw Error(t);
		return _t(e);
	}, (t) => vt(e, t)];
}
var [Ev, Dv] = Tv(), [Ov, kv] = Tv(), [Av, jv] = Tv(), Mv = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"type",
	"position",
	"style",
	"class",
	"isConnectable",
	"isConnectableStart",
	"isConnectableEnd",
	"isValidConnection",
	"onconnect",
	"ondisconnect",
	"children"
]), Nv = /* @__PURE__ */ K("<div><!></div>");
function Pv(e, t) {
	bt(t, !0);
	let n = $(t, "id", 3, null), r = $(t, "type", 3, "source"), i = $(t, "position", 19, () => rg.Top), a = $(t, "isConnectableStart", 3, !0), o = $(t, "isConnectableEnd", 3, !0), s = /* @__PURE__ */ wo(t, Mv), c = Ev("Handle must be used within a Custom Node component"), l = Ov("Handle must be used within a Custom Node component"), d = /* @__PURE__ */ F(() => r() === "target"), f = /* @__PURE__ */ F(() => t.isConnectable === void 0 ? l.value : t.isConnectable), p = vy(), m = /* @__PURE__ */ F(() => p.ariaLabelConfig), h = null;
	Ir(() => {
		if (t.onconnect || t.ondisconnect) {
			p.edges;
			let e = p.connectionLookup.get(`${c}-${r()}${n() ? `-${n()}` : ""}`);
			if (h && !Kg(e, h)) {
				let n = e ?? /* @__PURE__ */ new Map();
				qg(h, n, t.ondisconnect), qg(n, h, t.onconnect);
			}
			h = new Map(e);
		}
	});
	let g = /* @__PURE__ */ F(() => {
		if (!p.connection.inProgress) return [
			!1,
			!1,
			!1,
			!1,
			null
		];
		let { fromHandle: e, toHandle: t, isValid: i } = p.connection, a = e && e.nodeId === c && e.type === r() && e.id === n(), o = t && t.nodeId === c && t.type === r() && t.id === n();
		return [
			!0,
			a,
			o,
			p.connectionMode === Zh.Strict ? e?.type !== r() : c !== e?.nodeId || n() !== e?.id,
			o && i
		];
	}), _ = /* @__PURE__ */ F(() => u(U(g), 5)), v = /* @__PURE__ */ F(() => U(_)[0]), y = /* @__PURE__ */ F(() => U(_)[1]), b = /* @__PURE__ */ F(() => U(_)[2]), x = /* @__PURE__ */ F(() => U(_)[3]), S = /* @__PURE__ */ F(() => U(_)[4]);
	function w(e) {
		let t = p.onbeforeconnect ? p.onbeforeconnect(e) : e;
		t && (p.addEdge(t), p.onconnect?.(e));
	}
	function T(e) {
		let r = e_(e);
		e.currentTarget && (r && e.button === 0 || !r) && ov.onPointerDown(e, {
			handleId: n(),
			nodeId: c,
			isTarget: U(d),
			connectionRadius: p.connectionRadius,
			domNode: p.domNode,
			nodeLookup: p.nodeLookup,
			connectionMode: p.connectionMode,
			lib: "svelte",
			autoPanOnConnect: p.autoPanOnConnect,
			autoPanSpeed: p.autoPanSpeed,
			flowId: p.flowId,
			isValidConnection: t.isValidConnection || ((...e) => p.isValidConnection?.(...e) ?? !0),
			updateConnection: p.updateConnection,
			cancelConnection: p.cancelConnection,
			panBy: p.panBy,
			onConnect: w,
			onConnectStart: p.onconnectstart,
			onConnectEnd: (...e) => p.onconnectend?.(...e),
			getTransform: () => [
				p.viewport.x,
				p.viewport.y,
				p.viewport.zoom
			],
			getFromHandle: () => p.connection.fromHandle,
			dragThreshold: p.connectionDragThreshold,
			handleDomNode: e.currentTarget
		});
	}
	function E(e) {
		if (!c || !p.clickConnectStartHandle && !a()) return;
		if (!p.clickConnectStartHandle) {
			p.onclickconnectstart?.(e, {
				nodeId: c,
				handleId: n(),
				handleType: r()
			}), p.clickConnectStartHandle = {
				nodeId: c,
				type: r(),
				id: n()
			};
			return;
		}
		let i = Zg(e.target), o = t.isValidConnection ?? p.isValidConnection, { connectionMode: s, clickConnectStartHandle: l, flowId: u, nodeLookup: d } = p, { connection: f, isValid: m } = ov.isValid(e, {
			handle: {
				nodeId: c,
				id: n(),
				type: r()
			},
			connectionMode: s,
			fromNodeId: l.nodeId,
			fromHandleId: l.id ?? null,
			fromType: l.type,
			isValidConnection: o,
			flowId: u,
			doc: i,
			lib: "svelte",
			nodeLookup: d
		});
		m && f && w(f);
		let h = structuredClone(st(p.connection));
		delete h.inProgress, h.toPosition = h.toHandle ? h.toHandle.position : null, p.onclickconnectend?.(e, h), p.clickConnectStartHandle = null;
	}
	var D = Nv(), O = () => {};
	oo(D, () => ({
		"data-handleid": n(),
		"data-nodeid": c,
		"data-handlepos": i(),
		"data-id": `${p.flowId ?? ""}-${c ?? ""}-${n() ?? "null" ?? ""}-${r() ?? ""}`,
		class: [
			"svelte-flow__handle",
			`svelte-flow__handle-${i()}`,
			p.noDragClass,
			p.noPanClass,
			i(),
			t.class
		],
		onmousedown: T,
		ontouchstart: T,
		onclick: p.clickConnect ? E : void 0,
		onkeypress: O,
		style: t.style,
		role: "button",
		"aria-label": U(m)["handle.ariaLabel"],
		tabindex: "-1",
		...s,
		[qa]: {
			valid: U(S),
			connectingto: U(b),
			connectingfrom: U(y),
			source: !U(d),
			target: U(d),
			connectablestart: a(),
			connectableend: o(),
			connectable: U(f),
			connectionindicator: U(f) && (!U(v) || U(x)) && (U(v) || p.clickConnectStartHandle ? o() : a())
		}
	})), Oa(R(D), () => t.children ?? C), P(D), q(e, D), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/DefaultNode.svelte
var Fv = /* @__PURE__ */ K("<!> <!>", 1);
function Iv(e, t) {
	bt(t, !0);
	let n = $(t, "targetPosition", 19, () => rg.Top), r = $(t, "sourcePosition", 19, () => rg.Bottom);
	var i = Fv(), a = z(i);
	Pv(a, {
		type: "target",
		get position() {
			return n();
		}
	});
	var o = B(a);
	Pv(B(o), {
		type: "source",
		get position() {
			return r();
		}
	}), H(() => J(o, ` ${t.data?.label ?? ""} `)), q(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/InputNode.svelte
var Lv = /* @__PURE__ */ K(" <!>", 1);
function Rv(e, t) {
	bt(t, !0);
	let n = $(t, "data", 19, () => ({ label: "Node" })), r = $(t, "sourcePosition", 19, () => rg.Bottom);
	Ke();
	var i = Lv(), a = z(i);
	Pv(B(a), {
		type: "source",
		get position() {
			return r();
		}
	}), H(() => J(a, `${n()?.label ?? ""} `)), q(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/OutputNode.svelte
var zv = /* @__PURE__ */ K(" <!>", 1);
function Bv(e, t) {
	bt(t, !0);
	let n = $(t, "data", 19, () => ({ label: "Node" })), r = $(t, "targetPosition", 19, () => rg.Top);
	Ke();
	var i = zv(), a = z(i);
	Pv(B(a), {
		type: "target",
		get position() {
			return r();
		}
	}), H(() => J(a, `${n()?.label ?? ""} `)), q(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/GroupNode.svelte
function Vv(e, t) {}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/portal.svelte.js
function Hv(e, t, n) {
	if (!n || !t) return;
	let r = n === "root" ? t : t.querySelector(`.svelte-flow__${n}`);
	r && r.appendChild(e);
}
function Uv(e, t) {
	let n = /* @__PURE__ */ F(vy), r = /* @__PURE__ */ F(() => U(n).domNode), i;
	return U(r) ? Hv(e, U(r), t) : i = Lr(() => {
		Pr(() => {
			Hv(e, U(r), t), i?.();
		});
	}), {
		async update(t) {
			Hv(e, U(r), t);
		},
		destroy() {
			e.parentNode && e.parentNode.removeChild(e), i?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/utils.svelte.js
function Wv() {
	let e = /* @__PURE__ */ tr(typeof window > "u");
	if (U(e)) {
		let t = Lr(() => {
			Pr(() => {
				L(e, !1), t?.();
			});
		});
	}
	return { get value() {
		return U(e);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/index.js
var Gv = (e) => og(e), Kv = (e) => ag(e);
function qv(e) {
	return e === void 0 ? void 0 : `${e}px`;
}
var Jv = {
	ArrowUp: {
		x: 0,
		y: -1
	},
	ArrowDown: {
		x: 0,
		y: 1
	},
	ArrowLeft: {
		x: -1,
		y: 0
	},
	ArrowRight: {
		x: 1,
		y: 0
	}
}, Yv = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"x",
	"y",
	"width",
	"height",
	"selectEdgeOnClick",
	"transparent",
	"class",
	"children"
]), Xv = /* @__PURE__ */ K("<div><!></div>");
function Zv(e, t) {
	bt(t, !0);
	let n = $(t, "x", 3, 0), r = $(t, "y", 3, 0), i = $(t, "selectEdgeOnClick", 3, !1), a = $(t, "transparent", 3, !1), o = /* @__PURE__ */ wo(t, Yv), s = vy(), c = Av("EdgeLabel must be used within a Custom Edge component"), l = /* @__PURE__ */ F(() => s.visible.edges.get(c)?.zIndex);
	var u = Xv(), d = () => {
		i() && c && s.handleEdgeSelection(c);
	};
	oo(u, (e) => ({
		class: [
			"svelte-flow__edge-label",
			{ transparent: a() },
			t.class
		],
		tabindex: "-1",
		onclick: d,
		...o,
		[Ja]: e
	}), [() => ({
		display: Wv().value ? "none" : void 0,
		cursor: i() ? "pointer" : void 0,
		transform: `translate(-50%, -50%) translate(${n() ?? ""}px,${r() ?? ""}px)`,
		"pointer-events": "all",
		width: qv(t.width),
		height: qv(t.height),
		"z-index": U(l)
	})], void 0, void 0, "svelte-1wg91mu"), Oa(R(u), () => t.children ?? C), P(u), ja(u, (e, t) => Uv?.(e, t), () => "edge-labels"), q(e, u), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BaseEdge.svelte
var Qv = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"path",
	"label",
	"labelX",
	"labelY",
	"labelStyle",
	"markerStart",
	"markerEnd",
	"style",
	"interactionWidth",
	"class"
]), $v = /* @__PURE__ */ ca("<path></path>"), ey = /* @__PURE__ */ ca("<path fill=\"none\"></path><!><!>", 1);
function ty(e, t) {
	let n = $(t, "interactionWidth", 3, 20), r = /* @__PURE__ */ wo(t, Qv);
	var i = ey(), a = z(i), o = B(a), s = (e) => {
		var i = $v();
		oo(i, () => ({
			d: t.path,
			"stroke-opacity": 0,
			"stroke-width": n(),
			fill: "none",
			class: "svelte-flow__edge-interaction",
			...r
		})), q(e, i);
	};
	Y(o, (e) => {
		n() > 0 && e(s);
	});
	var c = B(o), l = (e) => {
		Zv(e, {
			get x() {
				return t.labelX;
			},
			get y() {
				return t.labelY;
			},
			get style() {
				return t.labelStyle;
			},
			selectEdgeOnClick: !0,
			children: (e, n) => {
				Ke();
				var r = la();
				H(() => J(r, t.label)), q(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	Y(c, (e) => {
		t.label && e(l);
	}), H(() => {
		Q(a, "id", t.id), Q(a, "d", t.path), Z(a, 0, Fa(["svelte-flow__edge-path", t.class])), Q(a, "marker-start", t.markerStart), Q(a, "marker-end", t.markerEnd), Ha(a, t.style);
	}), q(e, i);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BezierEdge.svelte
function ny(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => o_({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		curvature: t.pathOptions?.curvature
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	ty(e, {
		get id() {
			return t.id;
		},
		get path() {
			return U(i);
		},
		get labelX() {
			return U(a);
		},
		get labelY() {
			return U(o);
		},
		get label() {
			return t.label;
		},
		get labelStyle() {
			return t.labelStyle;
		},
		get markerStart() {
			return t.markerStart;
		},
		get markerEnd() {
			return t.markerEnd;
		},
		get interactionWidth() {
			return t.interactionWidth;
		},
		get style() {
			return t.style;
		}
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/SmoothStepEdgeInternal.svelte
function ry(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => y_({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	ty(e, {
		get path() {
			return U(i);
		},
		get labelX() {
			return U(a);
		},
		get labelY() {
			return U(o);
		},
		get label() {
			return t.label;
		},
		get labelStyle() {
			return t.labelStyle;
		},
		get markerStart() {
			return t.markerStart;
		},
		get markerEnd() {
			return t.markerEnd;
		},
		get interactionWidth() {
			return t.interactionWidth;
		},
		get style() {
			return t.style;
		}
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/StraightEdgeInternal.svelte
function iy(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => p_({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	ty(e, {
		get path() {
			return U(i);
		},
		get labelX() {
			return U(a);
		},
		get labelY() {
			return U(o);
		},
		get label() {
			return t.label;
		},
		get labelStyle() {
			return t.labelStyle;
		},
		get markerStart() {
			return t.markerStart;
		},
		get markerEnd() {
			return t.markerEnd;
		},
		get interactionWidth() {
			return t.interactionWidth;
		},
		get style() {
			return t.style;
		}
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/StepEdgeInternal.svelte
function ay(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => y_({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		borderRadius: 0
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	ty(e, {
		get path() {
			return U(i);
		},
		get labelX() {
			return U(a);
		},
		get labelY() {
			return U(o);
		},
		get label() {
			return t.label;
		},
		get labelStyle() {
			return t.labelStyle;
		},
		get markerStart() {
			return t.markerStart;
		},
		get markerEnd() {
			return t.markerEnd;
		},
		get interactionWidth() {
			return t.interactionWidth;
		},
		get style() {
			return t.style;
		}
	}), xt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/reactive-value.js
lr(), dt(), Ii(), lr(), dt(), Ii(), lr(), dt(), Ii(), lr(), dt(), Ii(), lr(), dt(), Ii(), dn();
var oy = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = un(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, sy = /\(.+\)/, cy = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), ly = class extends oy {
	constructor(e, t) {
		let n = sy.test(e) || e.split(/[\s,]+/).some((e) => cy.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => Zi(r, "change", e));
	}
};
//#endregion
//#region node_modules/svelte/src/reactivity/index-client.js
dn();
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/visibleElements.js
function uy(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return dg(e, {
		x: 0,
		y: 0,
		width: n,
		height: r
	}, t, !0).forEach((e) => {
		i.set(e.id, e);
	}), i;
}
function dy(e) {
	let { edges: t, defaultEdgeOptions: n, nodeLookup: r, previousEdges: i, connectionMode: a, onerror: o, onlyRenderVisible: s, elevateEdgesOnSelect: c, zIndexMode: l } = e, u = /* @__PURE__ */ new Map();
	for (let d of t) {
		let t = r.get(d.source), f = r.get(d.target);
		if (!t || !f) continue;
		if (s) {
			let { visibleNodes: n, transform: r, width: i, height: a } = e;
			if (l_({
				sourceNode: t,
				targetNode: f,
				width: i,
				height: a,
				transform: r
			})) n.set(t.id, t), n.set(f.id, f);
			else continue;
		}
		let p = i.get(d.id);
		if (p && d === p.edge && t == p.sourceNode && f == p.targetNode) {
			u.set(d.id, p);
			continue;
		}
		let m = x_({
			id: d.id,
			sourceNode: t,
			targetNode: f,
			sourceHandle: d.sourceHandle || null,
			targetHandle: d.targetHandle || null,
			connectionMode: a,
			onError: o
		});
		m && u.set(d.id, {
			...n,
			...d,
			...m,
			zIndex: c_({
				selected: d.selected,
				zIndex: d.zIndex ?? n.zIndex,
				sourceNode: t,
				targetNode: f,
				elevateOnSelect: c,
				zIndexMode: l
			}),
			sourceNode: t,
			targetNode: f,
			edge: d
		});
	}
	return u;
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/initial-store.svelte.js
var fy = Mg("Svelte Flow", "https://svelteflow.dev/"), py = {
	input: Rv,
	output: Bv,
	default: Iv,
	group: Vv
}, my = {
	straight: iy,
	smoothstep: ry,
	default: ny,
	step: ay
};
function hy(e, t, n, r, i, a) {
	return t && !n && r && i ? zg(ug(a, { filter: (e) => !!((e.width || e.initialWidth) && (e.height || e.initialHeight)) }), r, i, .5, 2, .1) : n ?? {
		x: 0,
		y: 0,
		zoom: 1
	};
}
function gy(e) {
	class t {
		#e = /* @__PURE__ */ F(() => e.props.id ?? "1");
		get flowId() {
			return U(this.#e);
		}
		set flowId(e) {
			L(this.#e, e);
		}
		#t = /* @__PURE__ */ tr(null);
		get domNode() {
			return U(this.#t);
		}
		set domNode(e) {
			L(this.#t, e);
		}
		#n = /* @__PURE__ */ tr(null);
		get panZoom() {
			return U(this.#n);
		}
		set panZoom(e) {
			L(this.#n, e);
		}
		#r = /* @__PURE__ */ tr(e.width ?? 0);
		get width() {
			return U(this.#r);
		}
		set width(e) {
			L(this.#r, e);
		}
		#i = /* @__PURE__ */ tr(e.height ?? 0);
		get height() {
			return U(this.#i);
		}
		set height(e) {
			L(this.#i, e);
		}
		#a = /* @__PURE__ */ tr(e.props.zIndexMode ?? "basic");
		get zIndexMode() {
			return U(this.#a);
		}
		set zIndexMode(e) {
			L(this.#a, e);
		}
		#o = /* @__PURE__ */ F(() => {
			let { nodesInitialized: t } = F_(e.nodes, this.nodeLookup, this.parentLookup, {
				nodeExtent: this.nodeExtent,
				nodeOrigin: this.nodeOrigin,
				elevateNodesOnSelect: e.props.elevateNodesOnSelect ?? !0,
				checkEquality: !0,
				zIndexMode: this.zIndexMode
			});
			return this.fitViewQueued && t && (this.fitViewOptions?.duration ? this.resolveFitView() : queueMicrotask(() => {
				this.resolveFitView();
			})), t;
		});
		get nodesInitialized() {
			return U(this.#o);
		}
		set nodesInitialized(e) {
			L(this.#o, e);
		}
		#s = /* @__PURE__ */ F(() => this.panZoom !== null);
		get viewportInitialized() {
			return U(this.#s);
		}
		set viewportInitialized(e) {
			L(this.#s, e);
		}
		#c = /* @__PURE__ */ F(() => (W_(this.connectionLookup, this.edgeLookup, e.edges), e.edges));
		get _edges() {
			return U(this.#c);
		}
		set _edges(e) {
			L(this.#c, e);
		}
		get nodes() {
			return this.nodesInitialized, e.nodes;
		}
		set nodes(t) {
			e.nodes = t;
		}
		get edges() {
			return this._edges;
		}
		set edges(t) {
			e.edges = t;
		}
		_prevSelectedNodes = [];
		_prevSelectedNodeIds = /* @__PURE__ */ new Set();
		#l = /* @__PURE__ */ F(() => {
			let e = this._prevSelectedNodeIds.size, t = /* @__PURE__ */ new Set(), n = this.nodes.filter((e) => (e.selected && (t.add(e.id), this._prevSelectedNodeIds.delete(e.id)), e.selected));
			return (e !== t.size || this._prevSelectedNodeIds.size > 0) && (this._prevSelectedNodes = n), this._prevSelectedNodeIds = t, this._prevSelectedNodes;
		});
		get selectedNodes() {
			return U(this.#l);
		}
		set selectedNodes(e) {
			L(this.#l, e);
		}
		_prevSelectedEdges = [];
		_prevSelectedEdgeIds = /* @__PURE__ */ new Set();
		#u = /* @__PURE__ */ F(() => {
			let e = this._prevSelectedEdgeIds.size, t = /* @__PURE__ */ new Set(), n = this.edges.filter((e) => (e.selected && (t.add(e.id), this._prevSelectedEdgeIds.delete(e.id)), e.selected));
			return (e !== t.size || this._prevSelectedEdgeIds.size > 0) && (this._prevSelectedEdges = n), this._prevSelectedEdgeIds = t, this._prevSelectedEdges;
		});
		get selectedEdges() {
			return U(this.#u);
		}
		set selectedEdges(e) {
			L(this.#u, e);
		}
		selectionChangeHandlers = /* @__PURE__ */ new Map();
		nodeLookup = /* @__PURE__ */ new Map();
		parentLookup = /* @__PURE__ */ new Map();
		connectionLookup = /* @__PURE__ */ new Map();
		edgeLookup = /* @__PURE__ */ new Map();
		_prevVisibleEdges = /* @__PURE__ */ new Map();
		#d = /* @__PURE__ */ F(() => {
			let { nodes: t, _edges: n, _prevVisibleEdges: r, nodeLookup: i, connectionMode: a, onerror: o, onlyRenderVisibleElements: s, defaultEdgeOptions: c, zIndexMode: l } = this, u, d, f = {
				edges: n,
				defaultEdgeOptions: c,
				previousEdges: r,
				nodeLookup: i,
				connectionMode: a,
				elevateEdgesOnSelect: e.props.elevateEdgesOnSelect ?? !0,
				zIndexMode: l,
				onerror: o
			};
			if (s) {
				let { viewport: e, width: t, height: n } = this, r = [
					e.x,
					e.y,
					e.zoom
				];
				u = uy(i, r, t, n), d = dy({
					...f,
					onlyRenderVisible: !0,
					visibleNodes: u,
					transform: r,
					width: t,
					height: n
				});
			} else u = this.nodeLookup, d = dy(f);
			return this._prevVisibleEdges = d, {
				nodes: u,
				edges: d
			};
		});
		get visible() {
			return U(this.#d);
		}
		set visible(e) {
			L(this.#d, e);
		}
		#f = /* @__PURE__ */ F(() => e.props.nodesDraggable ?? !0);
		get nodesDraggable() {
			return U(this.#f);
		}
		set nodesDraggable(e) {
			L(this.#f, e);
		}
		#p = /* @__PURE__ */ F(() => e.props.nodesConnectable ?? !0);
		get nodesConnectable() {
			return U(this.#p);
		}
		set nodesConnectable(e) {
			L(this.#p, e);
		}
		#m = /* @__PURE__ */ F(() => e.props.elementsSelectable ?? !0);
		get elementsSelectable() {
			return U(this.#m);
		}
		set elementsSelectable(e) {
			L(this.#m, e);
		}
		#h = /* @__PURE__ */ F(() => e.props.nodesFocusable ?? !0);
		get nodesFocusable() {
			return U(this.#h);
		}
		set nodesFocusable(e) {
			L(this.#h, e);
		}
		#g = /* @__PURE__ */ F(() => e.props.edgesFocusable ?? !0);
		get edgesFocusable() {
			return U(this.#g);
		}
		set edgesFocusable(e) {
			L(this.#g, e);
		}
		#_ = /* @__PURE__ */ F(() => e.props.disableKeyboardA11y ?? !1);
		get disableKeyboardA11y() {
			return U(this.#_);
		}
		set disableKeyboardA11y(e) {
			L(this.#_, e);
		}
		#v = /* @__PURE__ */ F(() => e.props.minZoom ?? .5);
		get minZoom() {
			return U(this.#v);
		}
		set minZoom(e) {
			L(this.#v, e);
		}
		#y = /* @__PURE__ */ F(() => e.props.maxZoom ?? 2);
		get maxZoom() {
			return U(this.#y);
		}
		set maxZoom(e) {
			L(this.#y, e);
		}
		#b = /* @__PURE__ */ F(() => e.props.nodeOrigin ?? [0, 0]);
		get nodeOrigin() {
			return U(this.#b);
		}
		set nodeOrigin(e) {
			L(this.#b, e);
		}
		#x = /* @__PURE__ */ F(() => e.props.nodeExtent ?? Jh);
		get nodeExtent() {
			return U(this.#x);
		}
		set nodeExtent(e) {
			L(this.#x, e);
		}
		#S = /* @__PURE__ */ F(() => e.props.translateExtent ?? Jh);
		get translateExtent() {
			return U(this.#S);
		}
		set translateExtent(e) {
			L(this.#S, e);
		}
		#C = /* @__PURE__ */ F(() => e.props.defaultEdgeOptions ?? {});
		get defaultEdgeOptions() {
			return U(this.#C);
		}
		set defaultEdgeOptions(e) {
			L(this.#C, e);
		}
		#w = /* @__PURE__ */ F(() => e.props.nodeDragThreshold ?? 1);
		get nodeDragThreshold() {
			return U(this.#w);
		}
		set nodeDragThreshold(e) {
			L(this.#w, e);
		}
		#T = /* @__PURE__ */ F(() => e.props.autoPanOnNodeDrag ?? !0);
		get autoPanOnNodeDrag() {
			return U(this.#T);
		}
		set autoPanOnNodeDrag(e) {
			L(this.#T, e);
		}
		#E = /* @__PURE__ */ F(() => e.props.autoPanOnConnect ?? !0);
		get autoPanOnConnect() {
			return U(this.#E);
		}
		set autoPanOnConnect(e) {
			L(this.#E, e);
		}
		#D = /* @__PURE__ */ F(() => e.props.autoPanOnNodeFocus ?? !0);
		get autoPanOnNodeFocus() {
			return U(this.#D);
		}
		set autoPanOnNodeFocus(e) {
			L(this.#D, e);
		}
		#O = /* @__PURE__ */ F(() => e.props.autoPanSpeed ?? 15);
		get autoPanSpeed() {
			return U(this.#O);
		}
		set autoPanSpeed(e) {
			L(this.#O, e);
		}
		#k = /* @__PURE__ */ F(() => e.props.connectionDragThreshold ?? 1);
		get connectionDragThreshold() {
			return U(this.#k);
		}
		set connectionDragThreshold(e) {
			L(this.#k, e);
		}
		fitViewQueued = e.props.fitView ?? !1;
		fitViewOptions = e.props.fitViewOptions;
		fitViewResolver = null;
		#A = /* @__PURE__ */ F(() => e.props.snapGrid ?? null);
		get snapGrid() {
			return U(this.#A);
		}
		set snapGrid(e) {
			L(this.#A, e);
		}
		#j = /* @__PURE__ */ tr(!1);
		get dragging() {
			return U(this.#j);
		}
		set dragging(e) {
			L(this.#j, e);
		}
		#M = /* @__PURE__ */ tr(null);
		get selectionRect() {
			return U(this.#M);
		}
		set selectionRect(e) {
			L(this.#M, e);
		}
		#N = /* @__PURE__ */ tr(!1);
		get selectionKeyPressed() {
			return U(this.#N);
		}
		set selectionKeyPressed(e) {
			L(this.#N, e);
		}
		#P = /* @__PURE__ */ tr(!1);
		get multiselectionKeyPressed() {
			return U(this.#P);
		}
		set multiselectionKeyPressed(e) {
			L(this.#P, e);
		}
		#F = /* @__PURE__ */ tr(!1);
		get deleteKeyPressed() {
			return U(this.#F);
		}
		set deleteKeyPressed(e) {
			L(this.#F, e);
		}
		#I = /* @__PURE__ */ tr(!1);
		get panActivationKeyPressed() {
			return U(this.#I);
		}
		set panActivationKeyPressed(e) {
			L(this.#I, e);
		}
		#L = /* @__PURE__ */ tr(!1);
		get zoomActivationKeyPressed() {
			return U(this.#L);
		}
		set zoomActivationKeyPressed(e) {
			L(this.#L, e);
		}
		#R = /* @__PURE__ */ tr(null);
		get selectionRectMode() {
			return U(this.#R);
		}
		set selectionRectMode(e) {
			L(this.#R, e);
		}
		#z = /* @__PURE__ */ tr("");
		get ariaLiveMessage() {
			return U(this.#z);
		}
		set ariaLiveMessage(e) {
			L(this.#z, e);
		}
		#B = /* @__PURE__ */ F(() => e.props.selectionMode ?? $h.Partial);
		get selectionMode() {
			return U(this.#B);
		}
		set selectionMode(e) {
			L(this.#B, e);
		}
		#V = /* @__PURE__ */ F(() => ({
			...py,
			...e.props.nodeTypes
		}));
		get nodeTypes() {
			return U(this.#V);
		}
		set nodeTypes(e) {
			L(this.#V, e);
		}
		#H = /* @__PURE__ */ F(() => ({
			...my,
			...e.props.edgeTypes
		}));
		get edgeTypes() {
			return U(this.#H);
		}
		set edgeTypes(e) {
			L(this.#H, e);
		}
		#U = /* @__PURE__ */ F(() => e.props.noPanClass ?? "nopan");
		get noPanClass() {
			return U(this.#U);
		}
		set noPanClass(e) {
			L(this.#U, e);
		}
		#W = /* @__PURE__ */ F(() => e.props.noDragClass ?? "nodrag");
		get noDragClass() {
			return U(this.#W);
		}
		set noDragClass(e) {
			L(this.#W, e);
		}
		#G = /* @__PURE__ */ F(() => e.props.noWheelClass ?? "nowheel");
		get noWheelClass() {
			return U(this.#G);
		}
		set noWheelClass(e) {
			L(this.#G, e);
		}
		#K = /* @__PURE__ */ F(() => Gg(e.props.ariaLabelConfig));
		get ariaLabelConfig() {
			return U(this.#K);
		}
		set ariaLabelConfig(e) {
			L(this.#K, e);
		}
		#q = /* @__PURE__ */ tr(hy(this.nodesInitialized, e.props.fitView, e.props.initialViewport, this.width, this.height, this.nodeLookup));
		get _viewport() {
			return U(this.#q);
		}
		set _viewport(e) {
			L(this.#q, e);
		}
		get viewport() {
			return e.viewport ?? this._viewport;
		}
		set viewport(t) {
			e.viewport &&= t, this._viewport = t;
		}
		#J = /* @__PURE__ */ tr(eg);
		get _connection() {
			return U(this.#J);
		}
		set _connection(e) {
			L(this.#J, e);
		}
		#Y = /* @__PURE__ */ F(() => this._connection.inProgress ? {
			...this._connection,
			to: Pg(this._connection.to, [
				this.viewport.x,
				this.viewport.y,
				this.viewport.zoom
			])
		} : this._connection);
		get connection() {
			return U(this.#Y);
		}
		set connection(e) {
			L(this.#Y, e);
		}
		#X = /* @__PURE__ */ F(() => e.props.connectionMode ?? Zh.Strict);
		get connectionMode() {
			return U(this.#X);
		}
		set connectionMode(e) {
			L(this.#X, e);
		}
		#Z = /* @__PURE__ */ F(() => e.props.connectionRadius ?? 20);
		get connectionRadius() {
			return U(this.#Z);
		}
		set connectionRadius(e) {
			L(this.#Z, e);
		}
		#Q = /* @__PURE__ */ F(() => e.props.isValidConnection ?? (() => !0));
		get isValidConnection() {
			return U(this.#Q);
		}
		set isValidConnection(e) {
			L(this.#Q, e);
		}
		#$ = /* @__PURE__ */ F(() => e.props.selectNodesOnDrag ?? !0);
		get selectNodesOnDrag() {
			return U(this.#$);
		}
		set selectNodesOnDrag(e) {
			L(this.#$, e);
		}
		#ee = /* @__PURE__ */ F(() => e.props.defaultMarkerColor === void 0 ? "#b1b1b7" : e.props.defaultMarkerColor);
		get defaultMarkerColor() {
			return U(this.#ee);
		}
		set defaultMarkerColor(e) {
			L(this.#ee, e);
		}
		#te = /* @__PURE__ */ F(() => E_(e.edges, {
			defaultColor: this.defaultMarkerColor,
			id: this.flowId,
			defaultMarkerStart: this.defaultEdgeOptions.markerStart,
			defaultMarkerEnd: this.defaultEdgeOptions.markerEnd
		}));
		get markers() {
			return U(this.#te);
		}
		set markers(e) {
			L(this.#te, e);
		}
		#ne = /* @__PURE__ */ F(() => e.props.onlyRenderVisibleElements ?? !1);
		get onlyRenderVisibleElements() {
			return U(this.#ne);
		}
		set onlyRenderVisibleElements(e) {
			L(this.#ne, e);
		}
		#re = /* @__PURE__ */ F(() => e.props.onflowerror ?? fy);
		get onerror() {
			return U(this.#re);
		}
		set onerror(e) {
			L(this.#re, e);
		}
		#ie = /* @__PURE__ */ F(() => e.props.ondelete);
		get ondelete() {
			return U(this.#ie);
		}
		set ondelete(e) {
			L(this.#ie, e);
		}
		#ae = /* @__PURE__ */ F(() => e.props.onbeforedelete);
		get onbeforedelete() {
			return U(this.#ae);
		}
		set onbeforedelete(e) {
			L(this.#ae, e);
		}
		#oe = /* @__PURE__ */ F(() => e.props.onbeforeconnect);
		get onbeforeconnect() {
			return U(this.#oe);
		}
		set onbeforeconnect(e) {
			L(this.#oe, e);
		}
		#se = /* @__PURE__ */ F(() => e.props.onconnect);
		get onconnect() {
			return U(this.#se);
		}
		set onconnect(e) {
			L(this.#se, e);
		}
		#ce = /* @__PURE__ */ F(() => e.props.onconnectstart);
		get onconnectstart() {
			return U(this.#ce);
		}
		set onconnectstart(e) {
			L(this.#ce, e);
		}
		#le = /* @__PURE__ */ F(() => e.props.onconnectend);
		get onconnectend() {
			return U(this.#le);
		}
		set onconnectend(e) {
			L(this.#le, e);
		}
		#ue = /* @__PURE__ */ F(() => e.props.onbeforereconnect);
		get onbeforereconnect() {
			return U(this.#ue);
		}
		set onbeforereconnect(e) {
			L(this.#ue, e);
		}
		#de = /* @__PURE__ */ F(() => e.props.onreconnect);
		get onreconnect() {
			return U(this.#de);
		}
		set onreconnect(e) {
			L(this.#de, e);
		}
		#fe = /* @__PURE__ */ F(() => e.props.onreconnectstart);
		get onreconnectstart() {
			return U(this.#fe);
		}
		set onreconnectstart(e) {
			L(this.#fe, e);
		}
		#pe = /* @__PURE__ */ F(() => e.props.onreconnectend);
		get onreconnectend() {
			return U(this.#pe);
		}
		set onreconnectend(e) {
			L(this.#pe, e);
		}
		#me = /* @__PURE__ */ F(() => e.props.clickConnect ?? !0);
		get clickConnect() {
			return U(this.#me);
		}
		set clickConnect(e) {
			L(this.#me, e);
		}
		#he = /* @__PURE__ */ F(() => e.props.onclickconnectstart);
		get onclickconnectstart() {
			return U(this.#he);
		}
		set onclickconnectstart(e) {
			L(this.#he, e);
		}
		#ge = /* @__PURE__ */ F(() => e.props.onclickconnectend);
		get onclickconnectend() {
			return U(this.#ge);
		}
		set onclickconnectend(e) {
			L(this.#ge, e);
		}
		#_e = /* @__PURE__ */ tr(null);
		get clickConnectStartHandle() {
			return U(this.#_e);
		}
		set clickConnectStartHandle(e) {
			L(this.#_e, e);
		}
		#ve = /* @__PURE__ */ F(() => e.props.onselectiondrag);
		get onselectiondrag() {
			return U(this.#ve);
		}
		set onselectiondrag(e) {
			L(this.#ve, e);
		}
		#ye = /* @__PURE__ */ F(() => e.props.onselectiondragstart);
		get onselectiondragstart() {
			return U(this.#ye);
		}
		set onselectiondragstart(e) {
			L(this.#ye, e);
		}
		#be = /* @__PURE__ */ F(() => e.props.onselectiondragstop);
		get onselectiondragstop() {
			return U(this.#be);
		}
		set onselectiondragstop(e) {
			L(this.#be, e);
		}
		resolveFitView = async () => {
			this.panZoom && (await mg({
				nodes: this.nodeLookup,
				width: this.width,
				height: this.height,
				panZoom: this.panZoom,
				minZoom: this.minZoom,
				maxZoom: this.maxZoom
			}, this.fitViewOptions), this.fitViewResolver?.resolve(!0), this.fitViewQueued = !1, this.fitViewOptions = void 0, this.fitViewResolver = null);
		};
		_prefersDark = new ly("(prefers-color-scheme: dark)", e.props.colorModeSSR === "dark");
		#xe = /* @__PURE__ */ F(() => e.props.colorMode === "system" ? this._prefersDark.current ? "dark" : "light" : e.props.colorMode ?? "light");
		get colorMode() {
			return U(this.#xe);
		}
		set colorMode(e) {
			L(this.#xe, e);
		}
		constructor() {}
		resetStoreValues() {
			this.dragging = !1, this.selectionRect = null, this.selectionRectMode = null, this.selectionKeyPressed = !1, this.multiselectionKeyPressed = !1, this.deleteKeyPressed = !1, this.panActivationKeyPressed = !1, this.zoomActivationKeyPressed = !1, this._connection = eg, this.clickConnectStartHandle = null, this.viewport = e.props.initialViewport ?? {
				x: 0,
				y: 0,
				zoom: 1
			}, this.ariaLiveMessage = "";
		}
	}
	return new t();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useStore.js
var _y = qh.error001("svelte");
function vy() {
	let e = _t(yy);
	if (!e) throw Error(_y);
	return e.getStore();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/index.js
var yy = Symbol();
function by(e) {
	let t = gy(e);
	function n(e) {
		t.nodeTypes = {
			...py,
			...e
		};
	}
	function r(e) {
		t.edgeTypes = {
			...my,
			...e
		};
	}
	function i(e) {
		t.edges = wv(e, t.edges, { onError: t.onerror });
	}
	let a = (e, n = !1) => {
		t.nodes = t.nodes.map((r) => {
			if (t.connection.inProgress && t.connection.fromNode.id === r.id) {
				let e = t.nodeLookup.get(r.id);
				e && (t.connection = {
					...t.connection,
					from: C_(e, t.connection.fromHandle, rg.Left, !0)
				});
			}
			let i = e.get(r.id);
			return i ? {
				...r,
				position: i.position,
				dragging: n
			} : r;
		});
	};
	function o(e) {
		let { changes: n, updatedInternals: r } = V_(e, t.nodeLookup, t.parentLookup, t.domNode, t.nodeOrigin, t.nodeExtent, t.zIndexMode);
		if (!r) return;
		M_(t.nodeLookup, t.parentLookup, {
			nodeOrigin: t.nodeOrigin,
			nodeExtent: t.nodeExtent,
			zIndexMode: t.zIndexMode
		}), t.fitViewQueued && t.resolveFitView();
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = t.nodeLookup.get(e.id)?.internals.userNode;
			if (!n) continue;
			let r = { ...n };
			switch (e.type) {
				case "dimensions": {
					let t = {
						...r.measured,
						...e.dimensions
					};
					e.setAttributes && (r.width = e.dimensions?.width ?? r.width, r.height = e.dimensions?.height ?? r.height), r.measured = t;
					break;
				}
				case "position": r.position = e.position ?? r.position;
			}
			i.set(e.id, r);
		}
		t.nodes = t.nodes.map((e) => i.get(e.id) ?? e);
	}
	function s(e) {
		let n = t.fitViewResolver ?? Promise.withResolvers();
		return t.fitViewQueued = !0, t.fitViewOptions = e, t.fitViewResolver = n, t.nodes = [...t.nodes], n.promise;
	}
	async function c(e, n, r) {
		let i = r?.zoom === void 0 ? t.maxZoom : r.zoom, a = t.panZoom;
		return a ? (await a.setViewport({
			x: t.width / 2 - e * i,
			y: t.height / 2 - n * i,
			zoom: i
		}, {
			duration: r?.duration,
			ease: r?.ease,
			interpolate: r?.interpolate
		}), !0) : !1;
	}
	async function l(e, n) {
		let r = t.panZoom;
		return r ? r.scaleBy(e, n) : !1;
	}
	async function u(e) {
		return l(1.2, e);
	}
	function d(e) {
		return l(1 / 1.2, e);
	}
	function f(e) {
		let n = t.panZoom;
		n && (n.setScaleExtent([e, t.maxZoom]), t.minZoom = e);
	}
	function p(e) {
		let n = t.panZoom;
		n && (n.setScaleExtent([t.minZoom, e]), t.maxZoom = e);
	}
	function m(e) {
		let n = t.panZoom;
		n && (n.setTranslateExtent(e), t.translateExtent = e);
	}
	function h(e, t = null) {
		let n = !1, r = e.map((e) => (!t || t.has(e.id)) && e.selected ? (n = !0, {
			...e,
			selected: !1
		}) : e);
		return [n, r];
	}
	function g(e) {
		let n = e?.nodes ? new Set(e.nodes.map((e) => e.id)) : null, [r, i] = h(t.nodes, n);
		r && (t.nodes = i);
		let a = e?.edges ? new Set(e.edges.map((e) => e.id)) : null, [o, s] = h(t.edges, a);
		o && (t.edges = s);
	}
	function _(e) {
		let n = t.multiselectionKeyPressed;
		t.nodes = t.nodes.map((t) => {
			let r = e.includes(t.id), i = n && t.selected || r;
			return !!t.selected === i ? t : {
				...t,
				selected: i
			};
		}), n || g({ nodes: [] });
	}
	function v(e) {
		let n = t.multiselectionKeyPressed;
		t.edges = t.edges.map((t) => {
			let r = e.includes(t.id), i = n && t.selected || r;
			return !!t.selected === i ? t : {
				...t,
				selected: i
			};
		}), n || g({ edges: [] });
	}
	function y(e, n, r) {
		let i = t.nodeLookup.get(e);
		if (!i) {
			t.onerror("012", qh.error012(e));
			return;
		}
		t.selectionRect = null, t.selectionRectMode = null, i.selected ? (n || i.selected && t.multiselectionKeyPressed) && (g({
			nodes: [i.internals.userNode],
			edges: []
		}), requestAnimationFrame(() => r?.blur())) : _([e]);
	}
	function b(e) {
		let n = t.edgeLookup.get(e);
		if (!n) {
			t.onerror("016", qh.error016(e));
			return;
		}
		(n.selectable || t.elementsSelectable && n.selectable === void 0) && (t.selectionRect = null, t.selectionRectMode = null, n.selected ? n.selected && t.multiselectionKeyPressed && g({
			nodes: [],
			edges: [n]
		}) : v([e]));
	}
	function x(e, n) {
		let { nodeExtent: r, snapGrid: i, nodeOrigin: o, nodeLookup: s, nodesDraggable: c, onerror: l } = t, u = /* @__PURE__ */ new Map(), d = i?.[0] ?? 5, f = i?.[1] ?? 5, p = e.x * d * n, m = e.y * f * n;
		for (let e of s.values()) {
			if (!(e.selected && (e.draggable || c && e.draggable === void 0))) continue;
			let t = {
				x: e.internals.positionAbsolute.x + p,
				y: e.internals.positionAbsolute.y + m
			};
			i && (t = Ng(t, i));
			let { position: n, positionAbsolute: a } = hg({
				nodeId: e.id,
				nextPosition: t,
				nodeLookup: s,
				nodeExtent: r,
				nodeOrigin: o,
				onError: l
			});
			e.position = n, e.internals.positionAbsolute = a, u.set(e.id, e);
		}
		a(u);
	}
	function S(e) {
		return H_({
			delta: e,
			panZoom: t.panZoom,
			transform: [
				t.viewport.x,
				t.viewport.y,
				t.viewport.zoom
			],
			translateExtent: t.translateExtent,
			width: t.width,
			height: t.height
		});
	}
	let C = (e) => {
		t._connection = { ...e };
	};
	function w() {
		t._connection = eg;
	}
	function T() {
		t.resetStoreValues(), g();
	}
	return Object.assign(t, {
		setNodeTypes: n,
		setEdgeTypes: r,
		addEdge: i,
		updateNodePositions: a,
		updateNodeInternals: o,
		zoomIn: u,
		zoomOut: d,
		fitView: s,
		setCenter: c,
		setMinZoom: f,
		setMaxZoom: p,
		setTranslateExtent: m,
		unselectNodesAndEdges: g,
		addSelectedNodes: _,
		addSelectedEdges: v,
		handleNodeSelection: y,
		handleEdgeSelection: b,
		moveSelectedNodes: x,
		panBy: S,
		updateConnection: C,
		cancelConnection: w,
		reset: T
	});
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/zoom/index.js
function xy(e, t) {
	let { minZoom: n, maxZoom: r, initialViewport: i, onPanZoomStart: a, onPanZoom: o, onPanZoomEnd: s, translateExtent: c, setPanZoomInstance: l, onDraggingChange: u, onTransformChange: d } = t, f = xv({
		domNode: e,
		minZoom: n,
		maxZoom: r,
		translateExtent: c,
		viewport: i,
		onPanZoom: o,
		onPanZoomStart: a,
		onPanZoomEnd: s,
		onDraggingChange: u
	}), p = f.getViewport();
	return (i.x !== p.x || i.y !== p.y || i.zoom !== p.zoom) && d([
		p.x,
		p.y,
		p.zoom
	]), l(f), f.update(t), { update(e) {
		f.update(e);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Zoom/Zoom.svelte
var Sy = /* @__PURE__ */ K("<div class=\"svelte-flow__zoom svelte-flow__container\"><!></div>");
function Cy(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15), r = /* @__PURE__ */ F(() => n().panActivationKeyPressed || t.panOnDrag), i = /* @__PURE__ */ F(() => n().panActivationKeyPressed || t.panOnScroll), { viewport: a } = n(), o = !1;
	Pr(() => {
		!o && n().viewportInitialized && (t.oninit?.(), o = !0);
	});
	var s = Sy();
	Oa(R(s), () => t.children), P(s), ja(s, (e, t) => xy?.(e, t), () => ({
		viewport: n().viewport,
		minZoom: n().minZoom,
		maxZoom: n().maxZoom,
		initialViewport: a,
		onDraggingChange: (e) => {
			n(n().dragging = e, !0);
		},
		setPanZoomInstance: (e) => {
			n(n().panZoom = e, !0);
		},
		onPanZoomStart: t.onmovestart,
		onPanZoom: t.onmove,
		onPanZoomEnd: t.onmoveend,
		zoomOnScroll: t.zoomOnScroll,
		zoomOnDoubleClick: t.zoomOnDoubleClick,
		zoomOnPinch: t.zoomOnPinch,
		panOnScroll: U(i),
		panOnDrag: U(r),
		panOnScrollSpeed: t.panOnScrollSpeed,
		panOnScrollMode: t.panOnScrollMode,
		panActivationKeyPressed: n().panActivationKeyPressed,
		zoomActivationKeyPressed: n().zoomActivationKeyPressed,
		preventScrolling: typeof t.preventScrolling != "boolean" || t.preventScrolling,
		noPanClassName: n().noPanClass,
		noWheelClassName: n().noWheelClass,
		userSelectionActive: !!n().selectionRect,
		translateExtent: n().translateExtent,
		lib: "svelte",
		paneClickDistance: t.paneClickDistance,
		selectionOnDrag: t.selectionOnDrag,
		onTransformChange: (e) => {
			n(n().viewport = {
				x: e[0],
				y: e[1],
				zoom: e[2]
			}, !0);
		},
		connectionInProgress: n().connection.inProgress
	})), q(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Pane/Pane.svelte
function wy(e, t) {
	return (n) => {
		n.target === t && e?.(n);
	};
}
function Ty(e) {
	return (t) => {
		let n = e.has(t.id);
		return !!t.selected === n ? t : {
			...t,
			selected: n
		};
	};
}
function Ey(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
var Dy = /* @__PURE__ */ K("<div><!></div>");
function Oy(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15), r = $(t, "panOnDrag", 3, !0), i = $(t, "paneClickDistance", 3, 1), a = $(t, "autoPanOnSelection", 3, !0), o, s = null, c = !1, l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ F(() => n().panActivationKeyPressed || r()), f = /* @__PURE__ */ F(() => n().selectionKeyPressed || !!n().selectionRect || t.selectionOnDrag && U(d) !== !0), p = /* @__PURE__ */ F(() => n().elementsSelectable && (U(f) || n().selectionRectMode === "user")), m = !1, h = 0, g = {
		x: 0,
		y: 0
	}, _ = !1;
	function v(e) {
		if (e.pointerType === "touch" && U(d) !== !1 && !n().selectionKeyPressed || (s = o?.getBoundingClientRect(), !s)) return;
		let r = e.target === o, i = !r && !!e.target.closest(".nokey"), a = t.selectionOnDrag && r || n().selectionKeyPressed;
		if (i || !U(f) || !a || e.button !== 0 || !e.isPrimary) return;
		e.target?.setPointerCapture?.(e.pointerId), m = !1, _ = !1;
		let { x: c, y: l } = t_(e, s), u = Pg({
			x: c,
			y: l
		}, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		]);
		n(n().selectionRect = {
			width: 0,
			height: 0,
			startX: u.x,
			startY: u.y,
			x: c,
			y: l
		}, !0), r || (e.stopPropagation(), e.preventDefault());
	}
	function y(e, t) {
		if (n().selectionRect?.startX === void 0 || n().selectionRect.startY === void 0) return;
		let r = {
			x: n().selectionRect?.startX,
			y: n().selectionRect?.startY
		}, i = Fg(r, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		]), a = {
			startX: r.x,
			startY: r.y,
			x: e < i.x ? e : i.x,
			y: t < i.y ? t : i.y,
			width: Math.abs(e - i.x),
			height: Math.abs(t - i.y)
		}, o = l, s = u;
		l = new Set(dg(n().nodeLookup, a, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		], n().selectionMode === $h.Partial, !0).map((e) => e.id));
		let c = n().defaultEdgeOptions.selectable ?? !0;
		u = /* @__PURE__ */ new Set();
		for (let e of l) {
			let t = n().connectionLookup.get(e);
			if (t) for (let { edgeId: e } of t.values()) {
				let t = n().edgeLookup.get(e);
				t && (t.selectable ?? c) && u.add(e);
			}
		}
		Ey(o, l) || n(n().nodes = n().nodes.map(Ty(l)), !0), Ey(s, u) || n(n().edges = n().edges.map(Ty(u)), !0), n(n().selectionRectMode = "user", !0), n(n().selectionRect = a, !0);
	}
	function b() {
		if (!a() || !s) return;
		let [e, t] = xg(g, s, n().autoPanSpeed);
		n().panBy({
			x: e,
			y: t
		}).then((e) => {
			if (!m || !e) {
				h = requestAnimationFrame(b);
				return;
			}
			y(g.x, g.y), h = requestAnimationFrame(b);
		});
	}
	function x() {
		cancelAnimationFrame(h), h = 0, _ = !1;
	}
	Oo(() => {
		typeof window < "u" && x();
	});
	function S(e) {
		if (!U(f) || !s || !n().selectionRect) return;
		let r = t_(e, s);
		g = {
			x: r.x,
			y: r.y
		};
		let a = Fg({
			x: n().selectionRect.startX,
			y: n().selectionRect.startY
		}, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		]);
		if (!m) {
			let o = n().selectionKeyPressed ? 0 : i();
			if (Math.hypot(r.x - a.x, r.y - a.y) <= o) return;
			n().unselectNodesAndEdges(), t.onselectionstart?.(e);
		}
		m = !0, _ ||= (b(), !0), y(r.x, r.y);
	}
	function C(e) {
		if (!U(p)) {
			e.target === o && n().connection.inProgress && (c = !0);
			return;
		}
		e.button === 0 && (e.target?.releasePointerCapture?.(e.pointerId), !m && e.target === o && D?.(e), n(n().selectionRect = null, !0), m && n(n().selectionRectMode = l.size > 0 ? "nodes" : null, !0), m && t.onselectionend?.(e), x());
	}
	function w(e) {
		e.target?.releasePointerCapture?.(e.pointerId), x();
	}
	let T = (e) => {
		if (Array.isArray(U(d)) && U(d).includes(2)) {
			e.preventDefault();
			return;
		}
		t.onpanecontextmenu?.({ event: e });
	}, E = (e) => {
		m &&= (e.stopPropagation(), !1);
	};
	function D(e) {
		if (m || n().connection.inProgress || c) {
			m = !1, c = !1;
			return;
		}
		t.onpaneclick?.({ event: e }), n().unselectNodesAndEdges(), n(n().selectionRectMode = null, !0), n(n().selectionRect = null, !0);
	}
	var O = Dy();
	let k;
	var A = /* @__PURE__ */ F(() => U(p) ? void 0 : wy(D, o)), j = /* @__PURE__ */ F(() => wy(T, o));
	Oa(R(O), () => t.children), P(O), vo(O, (e) => o = e, () => o), H((e) => k = Z(O, 1, "svelte-flow__pane svelte-flow__container", null, k, e), [() => ({
		draggable: r() === !0 || Array.isArray(r()) && r().includes(0),
		dragging: n().dragging,
		selection: U(f)
	})]), G("click", O, function(...e) {
		U(A)?.apply(this, e);
	}), Qi("pointerdown", O, function(...e) {
		(U(p) ? v : void 0)?.apply(this, e);
	}, !0), G("pointermove", O, function(...e) {
		(U(p) ? S : void 0)?.apply(this, e);
	}), G("pointerup", O, C), Qi("pointercancel", O, function(...e) {
		(U(p) ? w : void 0)?.apply(this, e);
	}), G("contextmenu", O, function(...e) {
		U(j)?.apply(this, e);
	}), Qi("click", O, function(...e) {
		(U(p) ? E : void 0)?.apply(this, e);
	}, !0), q(e, O), xt();
}
$i([
	"click",
	"pointermove",
	"pointerup",
	"contextmenu"
]);
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Viewport/Viewport.svelte
var ky = /* @__PURE__ */ K("<div class=\"svelte-flow__viewport xyflow__viewport svelte-flow__container\"><!></div>");
function Ay(e, t) {
	bt(t, !0);
	var n = ky();
	let r;
	Oa(R(n), () => t.children), P(n), H(() => r = Ha(n, "", r, { transform: `translate(${t.store.viewport.x ?? ""}px, ${t.store.viewport.y ?? ""}px) scale(${t.store.viewport.zoom ?? ""})` })), q(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/drag/index.js
function jy(e, t) {
	let { store: n, onDrag: r, onDragStart: i, onDragStop: a, onNodeMouseDown: o } = t, s = X_({
		onDrag: r,
		onDragStart: i,
		onDragStop: a,
		onNodeMouseDown: o,
		getStoreItems: () => {
			let { snapGrid: e, viewport: t } = n;
			return {
				nodes: n.nodes,
				nodeLookup: n.nodeLookup,
				edges: n.edges,
				nodeExtent: n.nodeExtent,
				snapGrid: e || [0, 0],
				snapToGrid: !!e,
				nodeOrigin: n.nodeOrigin,
				multiSelectionActive: n.multiselectionKeyPressed,
				domNode: n.domNode,
				transform: [
					t.x,
					t.y,
					t.zoom
				],
				autoPanOnNodeDrag: n.autoPanOnNodeDrag,
				nodesDraggable: n.nodesDraggable,
				selectNodesOnDrag: n.selectNodesOnDrag,
				nodeDragThreshold: n.nodeDragThreshold,
				unselectNodesAndEdges: n.unselectNodesAndEdges,
				updateNodePositions: n.updateNodePositions,
				onSelectionDrag: n.onselectiondrag,
				onSelectionDragStart: n.onselectiondragstart,
				onSelectionDragStop: n.onselectiondragstop,
				panBy: n.panBy
			};
		}
	});
	function c(e, t) {
		if (t.disabled) {
			s.destroy();
			return;
		}
		s.update({
			domNode: e,
			noDragClassName: t.noDragClass,
			handleSelector: t.handleSelector,
			nodeId: t.nodeId,
			isSelectable: t.isSelectable,
			nodeClickDistance: t.nodeClickDistance
		});
	}
	return c(e, t), {
		update(t) {
			c(e, t);
		},
		destroy() {
			s.destroy();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/A11yDescriptions/A11yDescriptions.svelte
var My = /* @__PURE__ */ K("<div aria-live=\"assertive\" aria-atomic=\"true\" class=\"a11y-live-msg svelte-13pq11u\"> </div>"), Ny = /* @__PURE__ */ K("<div class=\"a11y-hidden svelte-13pq11u\"> </div> <div class=\"a11y-hidden svelte-13pq11u\"> </div> <!>", 1);
function Py(e, t) {
	bt(t, !0);
	var n = Ny(), r = z(n), i = R(r, !0);
	P(r);
	var a = B(r, 2), o = R(a, !0);
	P(a);
	var s = B(a, 2), c = (e) => {
		var n = My(), r = R(n, !0);
		P(n), H(() => {
			Q(n, "id", `${Ly}-${t.store.flowId}`), J(r, t.store.ariaLiveMessage);
		}), q(e, n);
	};
	Y(s, (e) => {
		t.store.disableKeyboardA11y || e(c);
	}), H(() => {
		Q(r, "id", `${Fy}-${t.store.flowId}`), J(i, t.store.disableKeyboardA11y ? t.store.ariaLabelConfig["node.a11yDescription.default"] : t.store.ariaLabelConfig["node.a11yDescription.keyboardDisabled"]), Q(a, "id", `${Iy}-${t.store.flowId}`), J(o, t.store.ariaLabelConfig["edge.a11yDescription.default"]);
	}), q(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/A11yDescriptions/index.js
var Fy = "svelte-flow__node-desc", Iy = "svelte-flow__edge-desc", Ly = "svelte-flow__aria-live", Ry = /* @__PURE__ */ K("<div><!></div>");
function zy(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15), r = /* @__PURE__ */ F(() => l(t.node.data, () => ({}), !0)), i = /* @__PURE__ */ F(() => l(t.node.selected, !1)), a = /* @__PURE__ */ F(() => t.node.draggable), o = /* @__PURE__ */ F(() => t.node.selectable), s = /* @__PURE__ */ F(() => l(t.node.deletable, !0)), c = /* @__PURE__ */ F(() => t.node.connectable), u = /* @__PURE__ */ F(() => t.node.focusable), d = /* @__PURE__ */ F(() => l(t.node.hidden, !1)), f = /* @__PURE__ */ F(() => l(t.node.dragging, !1)), p = /* @__PURE__ */ F(() => l(t.node.style, "")), m = /* @__PURE__ */ F(() => t.node.class), h = /* @__PURE__ */ F(() => l(t.node.type, "default")), g = /* @__PURE__ */ F(() => t.node.parentId), _ = /* @__PURE__ */ F(() => t.node.sourcePosition), v = /* @__PURE__ */ F(() => t.node.targetPosition), y = /* @__PURE__ */ F(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).width), b = /* @__PURE__ */ F(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).height), x = /* @__PURE__ */ F(() => t.node.initialWidth), S = /* @__PURE__ */ F(() => t.node.initialHeight), C = /* @__PURE__ */ F(() => t.node.width), w = /* @__PURE__ */ F(() => t.node.height), T = /* @__PURE__ */ F(() => t.node.dragHandle), E = /* @__PURE__ */ F(() => l(t.node.internals.z, 0)), D = /* @__PURE__ */ F(() => t.node.internals.positionAbsolute.x), O = /* @__PURE__ */ F(() => t.node.internals.positionAbsolute.y), k = /* @__PURE__ */ F(() => t.node.internals.userNode), { id: A } = t.node, j = /* @__PURE__ */ F(() => U(a) ?? n().nodesDraggable), ee = /* @__PURE__ */ F(() => U(o) ?? n().elementsSelectable), M = /* @__PURE__ */ F(() => U(c) ?? n().nodesConnectable), N = /* @__PURE__ */ F(() => Ug(t.node)), te = /* @__PURE__ */ F(() => !!t.node.internals.handleBounds), ne = /* @__PURE__ */ F(() => U(N) && U(te)), re = /* @__PURE__ */ F(() => U(u) ?? n().nodesFocusable);
	function ie(e) {
		return n().parentLookup.has(e);
	}
	let ae = /* @__PURE__ */ F(() => ie(A)), oe = /* @__PURE__ */ tr(null), se = null, ce = U(h), le = U(_), ue = U(v), de = /* @__PURE__ */ F(() => n().nodeTypes[U(h)] ?? Iv), fe = /* @__PURE__ */ F(() => n().ariaLabelConfig);
	Dv(A), kv({ get value() {
		return U(M);
	} });
	let pe = /* @__PURE__ */ F(() => {
		let e = U(y) === void 0 ? U(C) ?? U(x) : U(C), t = U(b) === void 0 ? U(w) ?? U(S) : U(w);
		if (e !== void 0 || t !== void 0 || U(p) !== void 0) return `${U(p)};${e ? `width:${qv(e)};` : ""}${t ? `height:${qv(t)};` : ""}`;
	});
	Pr(() => {
		(U(h) !== ce || U(_) !== le || U(v) !== ue) && U(oe) !== null && requestAnimationFrame(() => {
			U(oe) !== null && n().updateNodeInternals(/* @__PURE__ */ new Map([[A, {
				id: A,
				nodeElement: U(oe),
				force: !0
			}]]));
		}), ce = U(h), le = U(_), ue = U(v);
	}), Pr(() => {
		t.resizeObserver && (!U(ne) || U(oe) !== se) && (se && t.resizeObserver.unobserve(se), U(oe) && t.resizeObserver.observe(U(oe)), se = U(oe));
	}), Oo(() => {
		se && t.resizeObserver?.unobserve(se);
	});
	function me(e) {
		U(ee) && (!n().selectNodesOnDrag || !U(j) || n().nodeDragThreshold > 0) && n().handleNodeSelection(A), t.onnodeclick?.({
			node: U(k),
			event: e
		});
	}
	function he(e) {
		if (!($g(e) || n().disableKeyboardA11y)) {
			if (Yh.includes(e.key) && U(ee)) {
				let t = e.key === "Escape";
				n().handleNodeSelection(A, t, U(oe));
			} else U(j) && t.node.selected && Object.prototype.hasOwnProperty.call(Jv, e.key) && (e.preventDefault(), n(n().ariaLiveMessage = U(fe)["node.a11yDescription.ariaLiveMessage"]({
				direction: e.key.replace("Arrow", "").toLowerCase(),
				x: ~~t.node.internals.positionAbsolute.x,
				y: ~~t.node.internals.positionAbsolute.y
			}), !0), n().moveSelectedNodes(Jv[e.key], e.shiftKey ? 4 : 1));
		}
	}
	let ge = () => {
		if (n().disableKeyboardA11y || !n().autoPanOnNodeFocus || !U(oe)?.matches(":focus-visible")) return;
		let { width: e, height: r, viewport: i } = n();
		dg(/* @__PURE__ */ new Map([[A, t.node]]), {
			x: 0,
			y: 0,
			width: e,
			height: r
		}, [
			i.x,
			i.y,
			i.zoom
		], !0).length > 0 || n().setCenter(t.node.position.x + (t.node.measured.width ?? 0) / 2, t.node.position.y + (t.node.measured.height ?? 0) / 2, { zoom: i.zoom });
	};
	var _e = ua(), ve = z(_e), ye = (e) => {
		var a = Ry();
		oo(a, () => ({
			"data-id": A,
			class: [
				"svelte-flow__node",
				`svelte-flow__node-${U(h)}`,
				U(m)
			],
			style: U(pe),
			onclick: me,
			onpointerenter: t.onnodepointerenter ? (e) => t.onnodepointerenter({
				node: U(k),
				event: e
			}) : void 0,
			onpointerleave: t.onnodepointerleave ? (e) => t.onnodepointerleave({
				node: U(k),
				event: e
			}) : void 0,
			onpointermove: t.onnodepointermove ? (e) => t.onnodepointermove({
				node: U(k),
				event: e
			}) : void 0,
			oncontextmenu: t.onnodecontextmenu ? (e) => t.onnodecontextmenu({
				node: U(k),
				event: e
			}) : void 0,
			onkeydown: U(re) ? he : void 0,
			onfocus: U(re) ? ge : void 0,
			tabIndex: U(re) ? 0 : void 0,
			role: t.node.ariaRole ?? (U(re) ? "group" : void 0),
			"aria-label": t.node.ariaLabel,
			"aria-roledescription": "node",
			"aria-describedby": n().disableKeyboardA11y ? void 0 : `${Fy}-${n().flowId}`,
			...t.node.domAttributes,
			[qa]: {
				dragging: U(f),
				selected: U(i),
				draggable: U(j),
				connectable: U(M),
				selectable: U(ee),
				nopan: U(j),
				parent: U(ae)
			},
			[Ja]: {
				"z-index": U(E),
				transform: `translate(${U(D) ?? ""}px, ${U(O) ?? ""}px)`,
				visibility: U(N) ? "visible" : "hidden"
			}
		})), ka(R(a), () => U(de), (e, t) => {
			t(e, {
				get data() {
					return U(r);
				},
				get id() {
					return A;
				},
				get selected() {
					return U(i);
				},
				get selectable() {
					return U(ee);
				},
				get deletable() {
					return U(s);
				},
				get sourcePosition() {
					return U(_);
				},
				get targetPosition() {
					return U(v);
				},
				get zIndex() {
					return U(E);
				},
				get dragging() {
					return U(f);
				},
				get draggable() {
					return U(j);
				},
				get dragHandle() {
					return U(T);
				},
				get parentId() {
					return U(g);
				},
				get type() {
					return U(h);
				},
				get isConnectable() {
					return U(M);
				},
				get positionAbsoluteX() {
					return U(D);
				},
				get positionAbsoluteY() {
					return U(O);
				},
				get width() {
					return U(C);
				},
				get height() {
					return U(w);
				}
			});
		}), P(a), ja(a, (e, t) => jy?.(e, t), () => ({
			nodeId: A,
			isSelectable: U(ee),
			disabled: !U(j),
			handleSelector: U(T),
			noDragClass: n().noDragClass,
			nodeClickDistance: t.nodeClickDistance,
			onNodeMouseDown: n().handleNodeSelection,
			onDrag: (e, n, r, i) => {
				t.onnodedrag?.({
					event: e,
					targetNode: r,
					nodes: i
				});
			},
			onDragStart: (e, n, r, i) => {
				t.onnodedragstart?.({
					event: e,
					targetNode: r,
					nodes: i
				});
			},
			onDragStop: (e, n, r, i) => {
				t.onnodedragstop?.({
					event: e,
					targetNode: r,
					nodes: i
				});
			},
			store: n()
		})), vo(a, (e) => L(oe, e), () => U(oe)), q(e, a);
	};
	Y(ve, (e) => {
		U(d) || e(ye);
	}), q(e, _e), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/NodeRenderer/NodeRenderer.svelte
var By = /* @__PURE__ */ K("<div class=\"svelte-flow__nodes\"></div>");
function Vy(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15), r = typeof ResizeObserver > "u" ? null : new ResizeObserver((e) => {
		let t = /* @__PURE__ */ new Map();
		e.forEach((e) => {
			let n = e.target.getAttribute("data-id");
			t.set(n, {
				id: n,
				nodeElement: e.target,
				force: !0
			});
		}), n().updateNodeInternals(t);
	});
	Oo(() => {
		r?.disconnect();
	});
	var i = By();
	X(i, 21, () => n().visible.nodes.values(), (e) => e.id, (e, i) => {
		zy(e, {
			get node() {
				return U(i);
			},
			get resizeObserver() {
				return r;
			},
			get nodeClickDistance() {
				return t.nodeClickDistance;
			},
			get onnodeclick() {
				return t.onnodeclick;
			},
			get onnodepointerenter() {
				return t.onnodepointerenter;
			},
			get onnodepointermove() {
				return t.onnodepointermove;
			},
			get onnodepointerleave() {
				return t.onnodepointerleave;
			},
			get onnodedrag() {
				return t.onnodedrag;
			},
			get onnodedragstart() {
				return t.onnodedragstart;
			},
			get onnodedragstop() {
				return t.onnodedragstop;
			},
			get onnodecontextmenu() {
				return t.onnodecontextmenu;
			},
			get store() {
				return n();
			},
			set store(e) {
				n(e);
			}
		});
	}), P(i), q(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/EdgeWrapper/EdgeWrapper.svelte
var Hy = /* @__PURE__ */ ca("<svg class=\"svelte-flow__edge-wrapper\"><g><!></g></svg>");
function Uy(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => t.edge.id), r = /* @__PURE__ */ F(() => t.edge.source), i = /* @__PURE__ */ F(() => t.edge.target), a = /* @__PURE__ */ F(() => t.edge.sourceX), o = /* @__PURE__ */ F(() => t.edge.sourceY), s = /* @__PURE__ */ F(() => t.edge.targetX), c = /* @__PURE__ */ F(() => t.edge.targetY), u = /* @__PURE__ */ F(() => t.edge.sourcePosition), d = /* @__PURE__ */ F(() => t.edge.targetPosition), f = /* @__PURE__ */ F(() => l(t.edge.animated, !1)), p = /* @__PURE__ */ F(() => l(t.edge.selected, !1)), m = /* @__PURE__ */ F(() => t.edge.label), h = /* @__PURE__ */ F(() => t.edge.labelStyle), g = /* @__PURE__ */ F(() => l(t.edge.data, () => ({}), !0)), _ = /* @__PURE__ */ F(() => t.edge.style), v = /* @__PURE__ */ F(() => t.edge.interactionWidth), y = /* @__PURE__ */ F(() => l(t.edge.type, "default")), b = /* @__PURE__ */ F(() => t.edge.sourceHandle), x = /* @__PURE__ */ F(() => t.edge.targetHandle), S = /* @__PURE__ */ F(() => t.edge.markerStart), C = /* @__PURE__ */ F(() => t.edge.markerEnd), w = /* @__PURE__ */ F(() => t.edge.selectable), T = /* @__PURE__ */ F(() => t.edge.focusable), E = /* @__PURE__ */ F(() => l(t.edge.deletable, !0)), D = /* @__PURE__ */ F(() => t.edge.hidden), O = /* @__PURE__ */ F(() => t.edge.zIndex), k = /* @__PURE__ */ F(() => t.edge.class), A = /* @__PURE__ */ F(() => t.edge.ariaLabel);
	jv(U(n));
	let j = null, ee = /* @__PURE__ */ F(() => U(w) ?? t.store.elementsSelectable), M = /* @__PURE__ */ F(() => U(T) ?? t.store.edgesFocusable), N = /* @__PURE__ */ F(() => t.store.edgeTypes[U(y)] ?? ny), te = /* @__PURE__ */ F(() => U(S) ? `url('#${T_(U(S), t.store.flowId)}')` : void 0), ne = /* @__PURE__ */ F(() => U(C) ? `url('#${T_(U(C), t.store.flowId)}')` : void 0);
	function re(e) {
		let r = t.store.edgeLookup.get(U(n));
		r && (U(ee) && t.store.handleEdgeSelection(U(n)), t.onedgeclick?.({
			event: e,
			edge: r
		}));
	}
	function ie(e, r) {
		let i = t.store.edgeLookup.get(U(n));
		i && r({
			event: e,
			edge: i
		});
	}
	function ae(e) {
		if (!t.store.disableKeyboardA11y && Yh.includes(e.key) && U(ee)) {
			let { unselectNodesAndEdges: r, addSelectedEdges: i } = t.store;
			e.key === "Escape" ? (j?.blur(), r({ edges: [t.edge] })) : i([U(n)]);
		}
	}
	var oe = ua(), se = z(oe), ce = (e) => {
		var l = Hy();
		let S;
		var C = R(l);
		oo(C, () => ({
			class: ["svelte-flow__edge", U(k)],
			"data-id": U(n),
			onclick: re,
			oncontextmenu: t.onedgecontextmenu ? (e) => {
				ie(e, t.onedgecontextmenu);
			} : void 0,
			onpointerenter: t.onedgepointerenter ? (e) => {
				ie(e, t.onedgepointerenter);
			} : void 0,
			onpointerleave: t.onedgepointerleave ? (e) => {
				ie(e, t.onedgepointerleave);
			} : void 0,
			"aria-label": U(A) === null ? void 0 : U(A) ? U(A) : `Edge from ${U(r)} to ${U(i)}`,
			"aria-describedby": U(M) ? `${Iy}-${t.store.flowId}` : void 0,
			role: t.edge.ariaRole ?? (U(M) ? "group" : "img"),
			"aria-roledescription": "edge",
			onkeydown: U(M) ? ae : void 0,
			tabindex: U(M) ? 0 : void 0,
			...t.edge.domAttributes,
			[qa]: {
				animated: U(f),
				selected: U(p),
				selectable: U(ee)
			}
		})), ka(R(C), () => U(N), (e, t) => {
			t(e, {
				get id() {
					return U(n);
				},
				get source() {
					return U(r);
				},
				get target() {
					return U(i);
				},
				get sourceX() {
					return U(a);
				},
				get sourceY() {
					return U(o);
				},
				get targetX() {
					return U(s);
				},
				get targetY() {
					return U(c);
				},
				get sourcePosition() {
					return U(u);
				},
				get targetPosition() {
					return U(d);
				},
				get animated() {
					return U(f);
				},
				get selected() {
					return U(p);
				},
				get label() {
					return U(m);
				},
				get labelStyle() {
					return U(h);
				},
				get data() {
					return U(g);
				},
				get style() {
					return U(_);
				},
				get interactionWidth() {
					return U(v);
				},
				get selectable() {
					return U(ee);
				},
				get deletable() {
					return U(E);
				},
				get type() {
					return U(y);
				},
				get sourceHandleId() {
					return U(b);
				},
				get targetHandleId() {
					return U(x);
				},
				get markerStart() {
					return U(te);
				},
				get markerEnd() {
					return U(ne);
				}
			});
		}), P(C), vo(C, (e) => j = e, () => j), P(l), H(() => S = Ha(l, "", S, { "z-index": U(O) })), q(e, l);
	};
	Y(se, (e) => {
		U(D) || e(ce);
	}), q(e, oe), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/MarkerDefinition.svelte
var Wy = /* @__PURE__ */ ca("<defs></defs>");
function Gy(e, t) {
	bt(t, !1);
	let n = vy();
	xo();
	var r = Wy();
	X(r, 5, () => n.markers, (e) => e.id, (e, t) => {
		Yy(e, Eo(() => U(t)));
	}), P(r), q(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/Marker.svelte
var Ky = /* @__PURE__ */ ca("<polyline class=\"arrow\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4\"></polyline>"), qy = /* @__PURE__ */ ca("<polyline class=\"arrowclosed\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4 -5,-4\"></polyline>"), Jy = /* @__PURE__ */ ca("<marker class=\"svelte-flow__arrowhead\" viewBox=\"-10 -10 20 20\" refX=\"0\" refY=\"0\"><!></marker>");
function Yy(e, t) {
	bt(t, !0);
	let n = $(t, "width", 3, 12.5), r = $(t, "height", 3, 12.5), i = $(t, "markerUnits", 3, "strokeWidth"), a = $(t, "orient", 3, "auto-start-reverse"), o = $(t, "color", 3, "none");
	var s = Jy(), c = R(s), l = (e) => {
		var n = Ky();
		let r;
		H(() => {
			Q(n, "stroke-width", t.strokeWidth), r = Ha(n, "", r, { stroke: o() });
		}), q(e, n);
	}, u = (e) => {
		var n = qy();
		let r;
		H(() => {
			Q(n, "stroke-width", t.strokeWidth), r = Ha(n, "", r, {
				stroke: o(),
				fill: o()
			});
		}), q(e, n);
	};
	Y(c, (e) => {
		t.type === ng.Arrow ? e(l) : t.type === ng.ArrowClosed && e(u, 1);
	}), P(s), H(() => {
		Q(s, "id", t.id), Q(s, "markerWidth", `${n()}`), Q(s, "markerHeight", `${r()}`), Q(s, "markerUnits", i()), Q(s, "orient", a());
	}), q(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/EdgeRenderer.svelte
var Xy = /* @__PURE__ */ K("<div class=\"svelte-flow__edges\"><svg class=\"svelte-flow__marker\"><!></svg> <!></div>");
function Zy(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15);
	var r = Xy(), i = R(r);
	Gy(R(i), {}), P(i), X(B(i, 2), 17, () => n().visible.edges.values(), (e) => e.id, (e, r) => {
		Uy(e, {
			get edge() {
				return U(r);
			},
			get onedgeclick() {
				return t.onedgeclick;
			},
			get onedgecontextmenu() {
				return t.onedgecontextmenu;
			},
			get onedgepointerenter() {
				return t.onedgepointerenter;
			},
			get onedgepointerleave() {
				return t.onedgepointerleave;
			},
			get store() {
				return n();
			},
			set store(e) {
				n(e);
			}
		});
	}), P(r), q(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Selection/Selection.svelte
var Qy = /* @__PURE__ */ K("<div class=\"svelte-flow__selection svelte-1vr3gfi\"></div>");
function $y(e, t) {
	bt(t, !0);
	let n = $(t, "x", 3, 0), r = $(t, "y", 3, 0), i = $(t, "width", 3, 0), a = $(t, "height", 3, 0), o = $(t, "isVisible", 3, !0);
	var s = ua(), c = z(s), l = (e) => {
		var t = Qy();
		let o;
		H((e) => o = Ha(t, "", o, e), [() => ({
			width: typeof i() == "string" ? i() : qv(i()),
			height: typeof a() == "string" ? a() : qv(a()),
			transform: `translate(${n()}px, ${r()}px)`
		})]), q(e, t);
	};
	Y(c, (e) => {
		o() && e(l);
	}), q(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/NodeSelection/NodeSelection.svelte
var eb = /* @__PURE__ */ K("<div><!></div>");
function tb(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ tr(void 0);
	Pr(() => {
		t.store.disableKeyboardA11y || U(n)?.focus({ preventScroll: !0 });
	});
	let r = /* @__PURE__ */ F(() => {
		if (t.store.selectionRectMode === "nodes") {
			t.store.nodes;
			let e = ug(t.store.nodeLookup, { filter: (e) => !!e.selected });
			if (e.width > 0 && e.height > 0) return e;
		}
		return null;
	});
	function i(e) {
		let n = t.store.nodes.filter((e) => e.selected);
		t.onselectioncontextmenu?.({
			nodes: n,
			event: e
		});
	}
	function a(e) {
		let n = t.store.nodes.filter((e) => e.selected);
		t.onselectionclick?.({
			nodes: n,
			event: e
		});
	}
	function o(e) {
		Object.prototype.hasOwnProperty.call(Jv, e.key) && (e.preventDefault(), t.store.moveSelectedNodes(Jv[e.key], e.shiftKey ? 4 : 1));
	}
	var s = ua(), c = z(s), l = (e) => {
		var s = eb();
		let c;
		$y(R(s), {
			width: "100%",
			height: "100%",
			x: 0,
			y: 0
		}), P(s), ja(s, (e, t) => jy?.(e, t), () => ({
			disabled: !1,
			store: t.store,
			onDrag: (e, n, r, i) => {
				t.onnodedrag?.({
					event: e,
					targetNode: null,
					nodes: i
				});
			},
			onDragStart: (e, n, r, i) => {
				t.onnodedragstart?.({
					event: e,
					targetNode: null,
					nodes: i
				});
			},
			onDragStop: (e, n, r, i) => {
				t.onnodedragstop?.({
					event: e,
					targetNode: null,
					nodes: i
				});
			}
		})), vo(s, (e) => L(n, e), () => U(n)), H((e) => {
			Z(s, 1, Fa(["svelte-flow__selection-wrapper", t.store.noPanClass]), "svelte-sf2y5e"), Q(s, "role", t.store.disableKeyboardA11y ? void 0 : "button"), Q(s, "tabindex", t.store.disableKeyboardA11y ? void 0 : -1), c = Ha(s, "", c, e);
		}, [() => ({
			width: qv(U(r).width),
			height: qv(U(r).height),
			transform: `translate(${U(r).x ?? ""}px, ${U(r).y ?? ""}px)`
		})]), G("contextmenu", s, i), G("click", s, a), G("keydown", s, function(...e) {
			(t.store.disableKeyboardA11y ? void 0 : o)?.apply(this, e);
		}), q(e, s);
	}, u = /* @__PURE__ */ F(() => t.store.selectionRectMode === "nodes" && U(r) && jg(U(r).x) && jg(U(r).y));
	Y(c, (e) => {
		U(u) && e(l);
	}), q(e, s), xt();
}
$i([
	"contextmenu",
	"click",
	"keydown"
]);
//#endregion
//#region node_modules/@svelte-put/shortcut/src/shortcut.js
function nb(e) {
	switch (e) {
		case "none": return 0;
		case "ctrl": return 8;
		case "shift": return 4;
		case "alt": return 2;
		case "meta": return 1;
	}
}
function rb(e, t) {
	let { enabled: n = !0, trigger: r, type: i = "keydown" } = t;
	function a(t) {
		let n = Array.isArray(r) ? r : [r], i = [
			t.metaKey,
			t.altKey,
			t.shiftKey,
			t.ctrlKey
		].reduce((e, t, n) => t ? e | 1 << n : e, 0);
		for (let r of n) {
			let n = {
				preventDefault: !1,
				enabled: !0,
				...r
			}, { modifier: a, key: o, code: s, callback: c, preventDefault: l, enabled: u } = n;
			if (!o && !s && console.warn("[svelte-put/shortcut] Trigger should have either `key` or `code`, a trigger missing both was detected! Check your configuration"), u && (o || s)) {
				if (s && t.code !== s || o && t.key !== o) continue;
				if (a === null || a === !1) {
					if (i !== 0) continue;
				} else if (a !== void 0 && a?.[0]?.length > 0) {
					let e = Array.isArray(a) ? a : [a], t = !1;
					for (let n of e) if ((Array.isArray(n) ? n : [n]).reduce((e, t) => e | nb(t), 0) === i) {
						t = !0;
						break;
					}
					if (!t) continue;
				}
				l && t.preventDefault();
				let r = {
					node: e,
					trigger: n,
					originalEvent: t
				};
				e.dispatchEvent(new CustomEvent("shortcut", { detail: r })), c?.(r);
			}
		}
	}
	let o;
	return n && (o = Zi(e, i, a)), {
		update: (t) => {
			let { enabled: s = !0, type: c = "keydown" } = t;
			n && (!s || i !== c) ? o?.() : !n && s && (o = Zi(e, c, a)), n = s, i = c, r = t.trigger;
		},
		destroy: () => {
			o?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useSvelteFlow.svelte.js
function ib() {
	let e = /* @__PURE__ */ F(vy), t = (t) => {
		let n = Gv(t) ? t : U(e).nodeLookup.get(t.id), r = n.parentId ? Wg(n.position, n.measured, n.parentId, U(e).nodeLookup, U(e).nodeOrigin) : n.position;
		return Tg({
			...n,
			position: r,
			width: n.measured?.width ?? n.width,
			height: n.measured?.height ?? n.height
		});
	};
	function n(t, n, r = { replace: !1 }) {
		U(e).nodes = W(() => U(e).nodes).map((e) => {
			if (e.id === t) {
				let t = typeof n == "function" ? n(e) : n;
				return r?.replace && Gv(t) ? t : {
					...e,
					...t
				};
			}
			return e;
		});
	}
	function r(t, n, r = { replace: !1 }) {
		U(e).edges = W(() => U(e).edges).map((e) => {
			if (e.id === t) {
				let t = typeof n == "function" ? n(e) : n;
				return r.replace && Kv(t) ? t : {
					...e,
					...t
				};
			}
			return e;
		});
	}
	let i = (t) => U(e).nodeLookup.get(t);
	return {
		zoomIn: U(e).zoomIn,
		zoomOut: U(e).zoomOut,
		getInternalNode: i,
		getNode: (e) => i(e)?.internals.userNode,
		getNodes: (t) => t === void 0 ? U(e).nodes : ab(U(e).nodeLookup, t),
		getEdge: (t) => U(e).edgeLookup.get(t),
		getEdges: (t) => t === void 0 ? U(e).edges : ab(U(e).edgeLookup, t),
		setZoom: async (t, n) => {
			let r = U(e).panZoom;
			return r ? r.scaleTo(t, n) : !1;
		},
		getZoom: () => U(e).viewport.zoom,
		setViewport: async (t, n) => {
			let r = U(e).viewport;
			return U(e).panZoom ? (await U(e).panZoom.setViewport({
				x: t.x ?? r.x,
				y: t.y ?? r.y,
				zoom: t.zoom ?? r.zoom
			}, n), !0) : !1;
		},
		getViewport: () => st(U(e).viewport),
		setCenter: async (t, n, r) => U(e).setCenter(t, n, r),
		fitView: (t) => U(e).fitView(t),
		fitBounds: async (t, n) => {
			if (!U(e).panZoom) return !1;
			let r = zg(t, U(e).width, U(e).height, U(e).minZoom, U(e).maxZoom, n?.padding ?? .1);
			return await U(e).panZoom.setViewport(r, {
				duration: n?.duration,
				ease: n?.ease,
				interpolate: n?.interpolate
			}), !0;
		},
		getIntersectingNodes: (n, r = !0, i) => {
			let a = Ag(n), o = a ? n : t(n);
			return o ? (i || U(e).nodes).filter((t) => {
				let i = U(e).nodeLookup.get(t.id);
				if (!i || !a && t.id === n.id) return !1;
				let s = Tg(i), c = kg(s, o);
				return r && c > 0 || c >= s.width * s.height || c >= o.width * o.height;
			}) : [];
		},
		isNodeIntersecting: (e, n, r = !0) => {
			let i = Ag(e) ? e : t(e);
			if (!i) return !1;
			let a = kg(i, n);
			return r && a > 0 || a >= n.width * n.height || a >= i.width * i.height;
		},
		deleteElements: async ({ nodes: t = [], edges: n = [] }) => {
			let { nodes: r, edges: i } = await gg({
				nodesToRemove: t,
				edgesToRemove: n,
				nodes: U(e).nodes,
				edges: U(e).edges,
				onBeforeDelete: U(e).onbeforedelete
			});
			return r && (U(e).nodes = W(() => U(e).nodes).filter((e) => !r.some(({ id: t }) => t === e.id))), i && (U(e).edges = W(() => U(e).edges).filter((e) => !i.some(({ id: t }) => t === e.id))), (r.length > 0 || i.length > 0) && U(e).ondelete?.({
				nodes: r,
				edges: i
			}), {
				deletedNodes: r,
				deletedEdges: i
			};
		},
		screenToFlowPosition: (t, n = { snapToGrid: !0 }) => {
			if (!U(e).domNode) return t;
			let r = n.snapToGrid ? U(e).snapGrid : !1, { x: i, y: a, zoom: o } = U(e).viewport, { x: s, y: c } = U(e).domNode.getBoundingClientRect();
			return Pg({
				x: t.x - s,
				y: t.y - c
			}, [
				i,
				a,
				o
			], r !== null, r || [1, 1]);
		},
		flowToScreenPosition: (t) => {
			if (!U(e).domNode) return t;
			let { x: n, y: r, zoom: i } = U(e).viewport, { x: a, y: o } = U(e).domNode.getBoundingClientRect(), s = Fg(t, [
				n,
				r,
				i
			]);
			return {
				x: s.x + a,
				y: s.y + o
			};
		},
		toObject: () => structuredClone({
			nodes: [...U(e).nodes],
			edges: [...U(e).edges],
			viewport: { ...U(e).viewport }
		}),
		updateNode: n,
		updateNodeData: (t, r, i) => {
			let a = U(e).nodeLookup.get(t)?.internals.userNode;
			if (!a) return;
			let o = typeof r == "function" ? r(a) : r;
			n(t, (e) => ({
				...e,
				data: i?.replace ? o : {
					...e.data,
					...o
				}
			}));
		},
		updateEdge: r,
		getNodesBounds: (t) => lg(t, {
			nodeLookup: U(e).nodeLookup,
			nodeOrigin: U(e).nodeOrigin
		}),
		getHandleConnections: ({ type: t, id: n, nodeId: r }) => Array.from(U(e).connectionLookup.get(`${r}-${t}-${n ?? null}`)?.values() ?? [])
	};
}
function ab(e, t) {
	let n = [];
	for (let r of t) {
		let t = e.get(r);
		if (t) {
			let e = "internals" in t ? t.internals?.userNode : t;
			n.push(e);
		}
	}
	return n;
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/KeyHandler/KeyHandler.svelte
function ob(e, t) {
	bt(t, !0);
	let n = $(t, "store", 15), r = $(t, "selectionKey", 3, "Shift"), i = $(t, "multiSelectionKey", 19, () => Bg() ? "Meta" : "Control"), a = $(t, "deleteKey", 3, "Backspace"), o = $(t, "panActivationKey", 3, " "), s = $(t, "zoomActivationKey", 19, () => Bg() ? "Meta" : "Control"), { deleteElements: c } = ib();
	function l(e) {
		return typeof e == "object" && !!e;
	}
	function u(e) {
		return l(e) && e.modifier || [];
	}
	function d(e) {
		return e == null ? "" : l(e) ? e.key : e;
	}
	function f(e, t) {
		return (Array.isArray(e) ? e : [e]).map((e) => {
			let n = d(e);
			return {
				key: n,
				modifier: u(e),
				enabled: n !== null,
				callback: t
			};
		});
	}
	function p() {
		n(n().selectionRect = null, !0), n(n().selectionKeyPressed = !1, !0), n(n().multiselectionKeyPressed = !1, !0), n(n().deleteKeyPressed = !1, !0), n(n().panActivationKeyPressed = !1, !0), n(n().zoomActivationKeyPressed = !1, !0);
	}
	function m() {
		let e = n().nodes.filter((e) => e.selected), t = n().edges.filter((e) => e.selected);
		c({
			nodes: e,
			edges: t
		});
	}
	Qi("blur", Cr, p), Qi("contextmenu", Cr, p), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !0, !0)),
		type: "keydown"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !1, !0)),
		type: "keyup"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(i(), () => {
			n(n().multiselectionKeyPressed = !0, !0);
		}),
		type: "keydown"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(i(), () => n(n().multiselectionKeyPressed = !1, !0)),
		type: "keyup"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(a(), (e) => {
			!(e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) && !$g(e.originalEvent) && (n(n().deleteKeyPressed = !0, !0), m());
		}),
		type: "keydown"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(a(), () => n(n().deleteKeyPressed = !1, !0)),
		type: "keyup"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), ja(Cr, (e, t) => rb?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/ConnectionLine/ConnectionLine.svelte
var sb = /* @__PURE__ */ ca("<path fill=\"none\" class=\"svelte-flow__connection-path\"></path>"), cb = /* @__PURE__ */ ca("<svg class=\"svelte-flow__connectionline\"><g><!></g></svg>");
function lb(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ F(() => {
		if (!t.store.connection.inProgress) return "";
		let e = {
			sourceX: t.store.connection.from.x,
			sourceY: t.store.connection.from.y,
			sourcePosition: t.store.connection.fromPosition,
			targetX: t.store.connection.to.x,
			targetY: t.store.connection.to.y,
			targetPosition: t.store.connection.toPosition
		};
		switch (t.type) {
			case tg.Bezier: {
				let [t] = o_(e);
				return t;
			}
			case tg.Straight: {
				let [t] = p_(e);
				return t;
			}
			case tg.Step:
			case tg.SmoothStep: {
				let [n] = y_({
					...e,
					borderRadius: t.type === tg.Step ? 0 : void 0
				});
				return n;
			}
		}
	});
	var r = ua(), i = z(r), a = (e) => {
		var r = cb(), i = R(r), a = R(i), o = (e) => {
			var n = ua();
			ka(z(n), () => t.LineComponent, (e, t) => {
				t(e, {});
			}), q(e, n);
		}, s = (e) => {
			var r = sb();
			H(() => {
				Q(r, "d", U(n)), Ha(r, t.style);
			}), q(e, r);
		};
		Y(a, (e) => {
			t.LineComponent ? e(o) : e(s, -1);
		}), P(i), P(r), H((e) => {
			Q(r, "width", t.store.width), Q(r, "height", t.store.height), Ha(r, t.containerStyle), Z(i, 0, e);
		}, [() => Fa(["svelte-flow__connection", Jg(t.store.connection.isValid)])]), q(e, r);
	};
	Y(i, (e) => {
		t.store.connection.inProgress && e(a);
	}), q(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Panel/Panel.svelte
var ub = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"style",
	"class",
	"children"
]), db = /* @__PURE__ */ K("<div><!></div>");
function fb(e, t) {
	bt(t, !0);
	let n = $(t, "position", 3, "top-right"), r = /* @__PURE__ */ wo(t, ub), i = /* @__PURE__ */ F(() => `${n()}`.split("-"));
	var a = db();
	oo(a, (e) => ({
		class: e,
		style: t.style,
		...r
	}), [() => [
		"svelte-flow__panel",
		t.class,
		...U(i)
	]]), Oa(R(a), () => t.children ?? C), P(a), q(e, a), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Attribution/Attribution.svelte
var pb = /* @__PURE__ */ K("<a target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Svelte Flow attribution\">Svelte Flow</a>");
function mb(e, t) {
	bt(t, !0);
	let n = $(t, "position", 3, "bottom-right"), r = "https://svelteflow.dev?utm_source=attribution";
	Pr(() => {});
	var i = ua(), a = z(i), o = (e) => {
		{
			let t = /* @__PURE__ */ F(() => `Please only hide this attribution when you are subscribed to Svelte Flow Pro: ${r}`);
			fb(e, {
				get position() {
					return n();
				},
				class: "svelte-flow__attribution",
				get "data-message"() {
					return U(t);
				},
				children: (e, t) => {
					var n = pb();
					H(() => Q(n, "href", r)), q(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	Y(a, (e) => {
		t.proOptions?.hideAttribution || e(o);
	}), q(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/Wrapper.svelte
var hb = /* @__PURE__ */ K("<div><!></div>");
function gb(e, t) {
	bt(t, !0);
	let n = $(t, "domNode", 15), r = $(t, "clientWidth", 15), i = $(t, "clientHeight", 15), a = /* @__PURE__ */ F(() => t.rest.class), o = /* @__PURE__ */ F(() => d(t.rest, /* @__PURE__ */ "id.class.nodeTypes.edgeTypes.colorMode.isValidConnection.onmove.onmovestart.onmoveend.onflowerror.ondelete.onbeforedelete.onbeforeconnect.onconnect.onconnectstart.onconnectend.onbeforereconnect.onreconnect.onreconnectstart.onreconnectend.onclickconnectstart.onclickconnectend.oninit.onselectionchange.onselectiondragstart.onselectiondrag.onselectiondragstop.onselectionstart.onselectionend.clickConnect.fitView.fitViewOptions.nodeOrigin.nodeDragThreshold.connectionDragThreshold.minZoom.maxZoom.initialViewport.connectionRadius.connectionMode.selectionMode.selectNodesOnDrag.snapGrid.defaultMarkerColor.translateExtent.nodeExtent.onlyRenderVisibleElements.autoPanOnConnect.autoPanOnNodeDrag.colorModeSSR.defaultEdgeOptions.elevateNodesOnSelect.elevateEdgesOnSelect.nodesDraggable.autoPanOnNodeFocus.nodesConnectable.elementsSelectable.nodesFocusable.edgesFocusable.disableKeyboardA11y.noDragClass.noPanClass.noWheelClass.ariaLabelConfig.autoPanSpeed.panOnScrollSpeed.zIndexMode.autoPanOnSelection".split(".")));
	function s(e) {
		e.currentTarget.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto"
		}), t.rest.onscroll && t.rest.onscroll(e);
	}
	var c = hb();
	oo(c, (e) => ({
		class: [
			"svelte-flow",
			"svelte-flow__container",
			t.colorMode,
			U(a)
		],
		"data-testid": "svelte-flow__wrapper",
		role: "application",
		onscroll: s,
		...U(o),
		[Ja]: e
	}), [() => ({
		width: qv(t.width),
		height: qv(t.height)
	})], void 0, void 0, "svelte-mkap6j"), Oa(R(c), () => t.children ?? C), P(c), vo(c, (e) => n(e), () => n()), go(c, "clientHeight", i), go(c, "clientWidth", r), q(e, c), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/SvelteFlow.svelte
var _b = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.width.height.proOptions.selectionKey.deleteKey.panActivationKey.multiSelectionKey.zoomActivationKey.paneClickDistance.nodeClickDistance.onmovestart.onmoveend.onmove.oninit.onnodeclick.onnodecontextmenu.onnodedrag.onnodedragstart.onnodedragstop.onnodepointerenter.onnodepointermove.onnodepointerleave.onselectionclick.onselectioncontextmenu.onselectionstart.onselectionend.onedgeclick.onedgecontextmenu.onedgepointerenter.onedgepointerleave.onpaneclick.onpanecontextmenu.panOnScrollMode.preventScrolling.zoomOnScroll.zoomOnDoubleClick.zoomOnPinch.panOnScroll.panOnScrollSpeed.panOnDrag.selectionOnDrag.autoPanOnSelection.connectionLineComponent.connectionLineStyle.connectionLineContainerStyle.connectionLineType.attributionPosition.children.nodes.edges.viewport".split(".")), vb = /* @__PURE__ */ K("<div class=\"svelte-flow__viewport-back svelte-flow__container\"></div> <!> <div class=\"svelte-flow__edge-labels svelte-flow__container\"></div> <!> <!> <!> <div class=\"svelte-flow__viewport-front svelte-flow__container\"></div>", 1), yb = /* @__PURE__ */ K("<!> <!>", 1), bb = /* @__PURE__ */ K("<!> <!> <!> <!> <!>", 1);
function xb(e, t) {
	bt(t, !0);
	let n = $(t, "paneClickDistance", 3, 1), r = $(t, "nodeClickDistance", 3, 1), i = $(t, "panOnScrollMode", 19, () => Qh.Free), a = $(t, "preventScrolling", 3, !0), o = $(t, "zoomOnScroll", 3, !0), s = $(t, "zoomOnDoubleClick", 3, !0), c = $(t, "zoomOnPinch", 3, !0), l = $(t, "panOnScroll", 3, !1), u = $(t, "panOnScrollSpeed", 3, .5), d = $(t, "panOnDrag", 3, !0), f = $(t, "selectionOnDrag", 3, !1), p = $(t, "autoPanOnSelection", 3, !0), m = $(t, "connectionLineType", 19, () => tg.Bezier), h = $(t, "nodes", 31, () => ur([])), g = $(t, "edges", 31, () => ur([])), _ = $(t, "viewport", 15, void 0), v = /* @__PURE__ */ wo(t, _b), y = by({
		props: v,
		width: t.width,
		height: t.height,
		get nodes() {
			return h();
		},
		set nodes(e) {
			h(e);
		},
		get edges() {
			return g();
		},
		set edges(e) {
			g(e);
		},
		get viewport() {
			return _();
		},
		set viewport(e) {
			_(e);
		}
	}), b = _t(yy);
	b && b.setStore && b.setStore(y), vt(yy, {
		provider: !1,
		getStore() {
			return y;
		}
	}), Pr(() => {
		let e = {
			nodes: y.selectedNodes,
			edges: y.selectedEdges
		};
		W(() => t.onselectionchange)?.(e);
		for (let t of y.selectionChangeHandlers.values()) t(e);
	}), Oo(() => {
		y.reset();
	}), gb(e, {
		get colorMode() {
			return y.colorMode;
		},
		get width() {
			return t.width;
		},
		get height() {
			return t.height;
		},
		get rest() {
			return v;
		},
		get domNode() {
			return y.domNode;
		},
		set domNode(e) {
			y.domNode = e;
		},
		get clientWidth() {
			return y.width;
		},
		set clientWidth(e) {
			y.width = e;
		},
		get clientHeight() {
			return y.height;
		},
		set clientHeight(e) {
			y.height = e;
		},
		children: (e, h) => {
			var g = bb(), _ = z(g);
			ob(_, {
				get selectionKey() {
					return t.selectionKey;
				},
				get deleteKey() {
					return t.deleteKey;
				},
				get panActivationKey() {
					return t.panActivationKey;
				},
				get multiSelectionKey() {
					return t.multiSelectionKey;
				},
				get zoomActivationKey() {
					return t.zoomActivationKey;
				},
				get store() {
					return y;
				},
				set store(e) {
					y = e;
				}
			});
			var v = B(_, 2);
			Cy(v, {
				get panOnScrollMode() {
					return i();
				},
				get preventScrolling() {
					return a();
				},
				get zoomOnScroll() {
					return o();
				},
				get zoomOnDoubleClick() {
					return s();
				},
				get zoomOnPinch() {
					return c();
				},
				get panOnScroll() {
					return l();
				},
				get panOnScrollSpeed() {
					return u();
				},
				get panOnDrag() {
					return d();
				},
				get paneClickDistance() {
					return n();
				},
				get selectionOnDrag() {
					return f();
				},
				get onmovestart() {
					return t.onmovestart;
				},
				get onmove() {
					return t.onmove;
				},
				get onmoveend() {
					return t.onmoveend;
				},
				get oninit() {
					return t.oninit;
				},
				get store() {
					return y;
				},
				set store(e) {
					y = e;
				},
				children: (e, i) => {
					Oy(e, {
						get onpaneclick() {
							return t.onpaneclick;
						},
						get onpanecontextmenu() {
							return t.onpanecontextmenu;
						},
						get onselectionstart() {
							return t.onselectionstart;
						},
						get onselectionend() {
							return t.onselectionend;
						},
						get panOnDrag() {
							return d();
						},
						get paneClickDistance() {
							return n();
						},
						get selectionOnDrag() {
							return f();
						},
						get autoPanOnSelection() {
							return p();
						},
						get store() {
							return y;
						},
						set store(e) {
							y = e;
						},
						children: (e, n) => {
							var i = yb(), a = z(i);
							Ay(a, {
								get store() {
									return y;
								},
								set store(e) {
									y = e;
								},
								children: (e, n) => {
									var i = vb(), a = B(z(i), 2);
									Zy(a, {
										get onedgeclick() {
											return t.onedgeclick;
										},
										get onedgecontextmenu() {
											return t.onedgecontextmenu;
										},
										get onedgepointerenter() {
											return t.onedgepointerenter;
										},
										get onedgepointerleave() {
											return t.onedgepointerleave;
										},
										get store() {
											return y;
										},
										set store(e) {
											y = e;
										}
									});
									var o = B(a, 4);
									lb(o, {
										get type() {
											return m();
										},
										get LineComponent() {
											return t.connectionLineComponent;
										},
										get containerStyle() {
											return t.connectionLineContainerStyle;
										},
										get style() {
											return t.connectionLineStyle;
										},
										get store() {
											return y;
										},
										set store(e) {
											y = e;
										}
									});
									var s = B(o, 2);
									Vy(s, {
										get nodeClickDistance() {
											return r();
										},
										get onnodeclick() {
											return t.onnodeclick;
										},
										get onnodecontextmenu() {
											return t.onnodecontextmenu;
										},
										get onnodepointerenter() {
											return t.onnodepointerenter;
										},
										get onnodepointermove() {
											return t.onnodepointermove;
										},
										get onnodepointerleave() {
											return t.onnodepointerleave;
										},
										get onnodedrag() {
											return t.onnodedrag;
										},
										get onnodedragstart() {
											return t.onnodedragstart;
										},
										get onnodedragstop() {
											return t.onnodedragstop;
										},
										get store() {
											return y;
										},
										set store(e) {
											y = e;
										}
									}), tb(B(s, 2), {
										get onselectionclick() {
											return t.onselectionclick;
										},
										get onselectioncontextmenu() {
											return t.onselectioncontextmenu;
										},
										get onnodedrag() {
											return t.onnodedrag;
										},
										get onnodedragstart() {
											return t.onnodedragstart;
										},
										get onnodedragstop() {
											return t.onnodedragstop;
										},
										get store() {
											return y;
										},
										set store(e) {
											y = e;
										}
									}), Ke(2), q(e, i);
								},
								$$slots: { default: !0 }
							});
							var o = B(a, 2);
							{
								let e = /* @__PURE__ */ F(() => !!(y.selectionRect && y.selectionRectMode === "user")), t = /* @__PURE__ */ F(() => y.selectionRect?.width), n = /* @__PURE__ */ F(() => y.selectionRect?.height), r = /* @__PURE__ */ F(() => y.selectionRect?.x), i = /* @__PURE__ */ F(() => y.selectionRect?.y);
								$y(o, {
									get isVisible() {
										return U(e);
									},
									get width() {
										return U(t);
									},
									get height() {
										return U(n);
									},
									get x() {
										return U(r);
									},
									get y() {
										return U(i);
									}
								});
							}
							q(e, i);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
			var b = B(v, 2);
			mb(b, {
				get proOptions() {
					return t.proOptions;
				},
				get position() {
					return t.attributionPosition;
				}
			});
			var x = B(b, 2);
			Py(x, { get store() {
				return y;
			} }), Oa(B(x, 2), () => t.children ?? C), q(e, g);
		},
		$$slots: { default: !0 }
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/ControlButton.svelte
var Sb = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"class",
	"bgColor",
	"bgColorHover",
	"color",
	"colorHover",
	"borderColor",
	"onclick",
	"children"
]), Cb = /* @__PURE__ */ K("<button><!></button>");
function wb(e, t) {
	let n = /* @__PURE__ */ wo(t, Sb);
	var r = Cb();
	oo(r, () => ({
		type: "button",
		onclick: t.onclick,
		class: ["svelte-flow__controls-button", t.class],
		...n,
		[Ja]: {
			"--xy-controls-button-background-color-props": t.bgColor,
			"--xy-controls-button-background-color-hover-props": t.bgColorHover,
			"--xy-controls-button-color-props": t.color,
			"--xy-controls-button-color-hover-props": t.colorHover,
			"--xy-controls-button-border-color-props": t.borderColor
		}
	})), Oa(R(r), () => t.children ?? C), P(r), q(e, r);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Plus.svelte
var Tb = /* @__PURE__ */ ca("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z\"></path></svg>");
function Eb(e) {
	q(e, Tb());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Minus.svelte
var Db = /* @__PURE__ */ ca("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 5\"><path d=\"M0 0h32v4.2H0z\"></path></svg>");
function Ob(e) {
	q(e, Db());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Fit.svelte
var kb = /* @__PURE__ */ ca("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 30\"><path d=\"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z\"></path></svg>");
function Ab(e) {
	q(e, kb());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Lock.svelte
var jb = /* @__PURE__ */ ca("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z\"></path></svg>");
function Mb(e) {
	q(e, jb());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Unlock.svelte
var Nb = /* @__PURE__ */ ca("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z\"></path></svg>");
function Pb(e) {
	q(e, Nb());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Controls.svelte
var Fb = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"orientation",
	"showZoom",
	"showFitView",
	"showLock",
	"style",
	"class",
	"buttonBgColor",
	"buttonBgColorHover",
	"buttonColor",
	"buttonColorHover",
	"buttonBorderColor",
	"fitViewOptions",
	"children",
	"before",
	"after"
]), Ib = /* @__PURE__ */ K("<!> <!>", 1), Lb = /* @__PURE__ */ K("<!> <!> <!> <!> <!> <!>", 1);
function Rb(e, t) {
	bt(t, !0);
	let n = $(t, "position", 3, "bottom-left"), r = $(t, "orientation", 3, "vertical"), i = $(t, "showZoom", 3, !0), a = $(t, "showFitView", 3, !0), o = $(t, "showLock", 3, !0), s = /* @__PURE__ */ wo(t, Fb), c = /* @__PURE__ */ F(vy), l = /* @__PURE__ */ F(() => ({
		bgColor: t.buttonBgColor,
		bgColorHover: t.buttonBgColorHover,
		color: t.buttonColor,
		colorHover: t.buttonColorHover,
		borderColor: t.buttonBorderColor
	})), u = /* @__PURE__ */ F(() => U(c).nodesDraggable || U(c).nodesConnectable || U(c).elementsSelectable), d = /* @__PURE__ */ F(() => U(c).viewport.zoom <= U(c).minZoom), f = /* @__PURE__ */ F(() => U(c).viewport.zoom >= U(c).maxZoom), p = /* @__PURE__ */ F(() => U(c).ariaLabelConfig), m = /* @__PURE__ */ F(() => r() === "horizontal" ? "horizontal" : "vertical"), h = () => {
		U(c).zoomIn();
	}, g = () => {
		U(c).zoomOut();
	}, _ = () => {
		U(c).fitView(t.fitViewOptions);
	}, v = () => {
		let e = !U(u);
		U(c).nodesDraggable = e, U(c).nodesConnectable = e, U(c).elementsSelectable = e;
	};
	{
		let r = /* @__PURE__ */ F(() => [
			"svelte-flow__controls",
			U(m),
			t.class
		]);
		fb(e, Eo({
			get class() {
				return U(r);
			},
			get position() {
				return n();
			},
			"data-testid": "svelte-flow__controls",
			get "aria-label"() {
				return U(p)["controls.ariaLabel"];
			},
			get style() {
				return t.style;
			}
		}, () => s, {
			children: (e, n) => {
				var r = Lb(), s = z(r), c = (e) => {
					var n = ua();
					Oa(z(n), () => t.before), q(e, n);
				};
				Y(s, (e) => {
					t.before && e(c);
				});
				var m = B(s, 2), y = (e) => {
					var t = Ib(), n = z(t);
					wb(n, Eo({
						onclick: h,
						class: "svelte-flow__controls-zoomin",
						get title() {
							return U(p)["controls.zoomIn.ariaLabel"];
						},
						get "aria-label"() {
							return U(p)["controls.zoomIn.ariaLabel"];
						},
						get disabled() {
							return U(f);
						}
					}, () => U(l), {
						children: (e, t) => {
							Eb(e, {});
						},
						$$slots: { default: !0 }
					})), wb(B(n, 2), Eo({
						onclick: g,
						class: "svelte-flow__controls-zoomout",
						get title() {
							return U(p)["controls.zoomOut.ariaLabel"];
						},
						get "aria-label"() {
							return U(p)["controls.zoomOut.ariaLabel"];
						},
						get disabled() {
							return U(d);
						}
					}, () => U(l), {
						children: (e, t) => {
							Ob(e, {});
						},
						$$slots: { default: !0 }
					})), q(e, t);
				};
				Y(m, (e) => {
					i() && e(y);
				});
				var b = B(m, 2), x = (e) => {
					wb(e, Eo({
						class: "svelte-flow__controls-fitview",
						onclick: _,
						get title() {
							return U(p)["controls.fitView.ariaLabel"];
						},
						get "aria-label"() {
							return U(p)["controls.fitView.ariaLabel"];
						}
					}, () => U(l), {
						children: (e, t) => {
							Ab(e, {});
						},
						$$slots: { default: !0 }
					}));
				};
				Y(b, (e) => {
					a() && e(x);
				});
				var S = B(b, 2), C = (e) => {
					wb(e, Eo({
						class: "svelte-flow__controls-interactive",
						onclick: v,
						get title() {
							return U(p)["controls.interactive.ariaLabel"];
						},
						get "aria-label"() {
							return U(p)["controls.interactive.ariaLabel"];
						}
					}, () => U(l), {
						children: (e, t) => {
							var n = ua(), r = z(n), i = (e) => {
								Pb(e, {});
							}, a = (e) => {
								Mb(e, {});
							};
							Y(r, (e) => {
								U(u) ? e(i) : e(a, -1);
							}), q(e, n);
						},
						$$slots: { default: !0 }
					}));
				};
				Y(S, (e) => {
					o() && e(C);
				});
				var w = B(S, 2), T = (e) => {
					var n = ua();
					Oa(z(n), () => t.children), q(e, n);
				};
				Y(w, (e) => {
					t.children && e(T);
				});
				var E = B(w, 2), D = (e) => {
					var n = ua();
					Oa(z(n), () => t.after), q(e, n);
				};
				Y(E, (e) => {
					t.after && e(D);
				}), q(e, r);
			},
			$$slots: { default: !0 }
		}));
	}
	xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/types.js
var zb;
(function(e) {
	e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(zb ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/DotPattern.svelte
var Bb = /* @__PURE__ */ ca("<circle></circle>");
function Vb(e, t) {
	var n = Bb();
	H(() => {
		Q(n, "cx", t.radius), Q(n, "cy", t.radius), Q(n, "r", t.radius), Z(n, 0, Fa([
			"svelte-flow__background-pattern",
			"dots",
			t.class
		]));
	}), q(e, n);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/LinePattern.svelte
var Hb = /* @__PURE__ */ ca("<path></path>");
function Ub(e, t) {
	bt(t, !0);
	var n = Hb();
	H(() => {
		Q(n, "stroke-width", t.lineWidth), Q(n, "d", `M${t.dimensions[0] / 2} 0 V${t.dimensions[1]} M0 ${t.dimensions[1] / 2} H${t.dimensions[0]}`), Z(n, 0, Fa([
			"svelte-flow__background-pattern",
			t.variant,
			t.class
		]));
	}), q(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/Background.svelte
var Wb = {
	[zb.Dots]: 1,
	[zb.Lines]: 1,
	[zb.Cross]: 6
}, Gb = /* @__PURE__ */ ca("<svg data-testid=\"svelte-flow__background\"><pattern patternUnits=\"userSpaceOnUse\"><!></pattern><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"></rect></svg>");
function Kb(e, t) {
	bt(t, !0);
	let n = $(t, "variant", 19, () => zb.Dots), r = $(t, "gap", 3, 20), i = $(t, "lineWidth", 3, 1), a = /* @__PURE__ */ F(vy), o = /* @__PURE__ */ F(() => n() === zb.Dots), s = /* @__PURE__ */ F(() => n() === zb.Cross), c = /* @__PURE__ */ F(() => Array.isArray(r()) ? r() : [r(), r()]), l = /* @__PURE__ */ F(() => `background-pattern-${U(a).flowId}-${t.id ?? ""}`), u = /* @__PURE__ */ F(() => [U(c)[0] * U(a).viewport.zoom || 1, U(c)[1] * U(a).viewport.zoom || 1]), d = /* @__PURE__ */ F(() => (t.size ?? Wb[n()]) * U(a).viewport.zoom), f = /* @__PURE__ */ F(() => U(s) ? [U(d), U(d)] : U(u)), p = /* @__PURE__ */ F(() => U(o) ? [U(d) / 2, U(d) / 2] : [U(f)[0] / 2, U(f)[1] / 2]);
	var m = Gb();
	let h;
	var g = R(m), _ = R(g), v = (e) => {
		{
			let n = /* @__PURE__ */ F(() => U(d) / 2);
			Vb(e, {
				get radius() {
					return U(n);
				},
				get class() {
					return t.patternClass;
				}
			});
		}
	}, y = (e) => {
		Ub(e, {
			get dimensions() {
				return U(f);
			},
			get variant() {
				return n();
			},
			get lineWidth() {
				return i();
			},
			get class() {
				return t.patternClass;
			}
		});
	};
	Y(_, (e) => {
		U(o) ? e(v) : e(y, -1);
	}), P(g);
	var b = B(g);
	P(m), H(() => {
		Z(m, 0, Fa([
			"svelte-flow__background",
			"svelte-flow__container",
			t.class
		])), h = Ha(m, "", h, {
			"--xy-background-color-props": t.bgColor,
			"--xy-background-pattern-color-props": t.patternColor
		}), Q(g, "id", U(l)), Q(g, "x", U(a).viewport.x % U(u)[0]), Q(g, "y", U(a).viewport.y % U(u)[1]), Q(g, "width", U(u)[0]), Q(g, "height", U(u)[1]), Q(g, "patternTransform", `translate(-${U(p)[0]},-${U(p)[1]})`), Q(b, "fill", `url(#${U(l)})`);
	}), q(e, m), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useInternalNode.svelte.js
function qb(e) {
	let t = /* @__PURE__ */ F(vy), n = /* @__PURE__ */ F(() => U(t).nodeLookup), r = /* @__PURE__ */ F(() => U(t).nodes), i = /* @__PURE__ */ F(() => (U(r), U(n).get(e)));
	return { get current() {
		return U(i);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/MinimapNode.svelte
var Jb = /* @__PURE__ */ ca("<rect></rect>");
function Yb(e, t) {
	bt(t, !0);
	let n = $(t, "borderRadius", 3, 5), r = $(t, "strokeWidth", 3, 2), i = /* @__PURE__ */ F(() => qb(t.id)), a = /* @__PURE__ */ F(() => {
		if (!U(i).current) return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		let { width: e, height: n } = Hg(U(i).current);
		return {
			width: t.width ?? e,
			height: t.height ?? n,
			x: t.x ?? U(i).current.internals.positionAbsolute.x,
			y: t.y ?? U(i).current.internals.positionAbsolute.y
		};
	}), o = /* @__PURE__ */ F(() => U(a).width), s = /* @__PURE__ */ F(() => U(a).height), c = /* @__PURE__ */ F(() => U(a).x), l = /* @__PURE__ */ F(() => U(a).y);
	var u = ua(), d = z(u), f = (e) => {
		let i = /* @__PURE__ */ F(() => t.nodeComponent);
		var a = ua();
		ka(z(a), () => U(i), (e, i) => {
			i(e, {
				get id() {
					return t.id;
				},
				get x() {
					return U(c);
				},
				get y() {
					return U(l);
				},
				get width() {
					return U(o);
				},
				get height() {
					return U(s);
				},
				get borderRadius() {
					return n();
				},
				get class() {
					return t.class;
				},
				get color() {
					return t.color;
				},
				get shapeRendering() {
					return t.shapeRendering;
				},
				get strokeColor() {
					return t.strokeColor;
				},
				get strokeWidth() {
					return r();
				},
				get selected() {
					return t.selected;
				}
			});
		}), q(e, a);
	}, p = (e) => {
		var i = Jb();
		let a, u;
		H(() => {
			a = Z(i, 0, Fa(["svelte-flow__minimap-node", t.class]), null, a, { selected: t.selected }), Q(i, "x", U(c)), Q(i, "y", U(l)), Q(i, "rx", n()), Q(i, "ry", n()), Q(i, "width", U(o)), Q(i, "height", U(s)), Q(i, "shape-rendering", t.shapeRendering), u = Ha(i, "", u, {
				fill: t.color,
				stroke: t.strokeColor,
				"stroke-width": r()
			});
		}), q(e, i);
	};
	Y(d, (e) => {
		t.nodeComponent ? e(f) : e(p, -1);
	}), q(e, u), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/interactive.js
function Xb(e, t) {
	let n = sv({
		domNode: e,
		panZoom: t.panZoom,
		getTransform: () => {
			let { viewport: e } = t.store;
			return [
				e.x,
				e.y,
				e.zoom
			];
		},
		getViewScale: t.getViewScale
	});
	n.update({
		translateExtent: t.translateExtent,
		width: t.width,
		height: t.height,
		inversePan: t.inversePan,
		zoomStep: t.zoomStep,
		pannable: t.pannable,
		zoomable: t.zoomable
	});
	function r(e) {
		n.update({
			translateExtent: e.translateExtent,
			width: e.width,
			height: e.height,
			inversePan: e.inversePan,
			zoomStep: e.zoomStep,
			pannable: e.pannable,
			zoomable: e.zoomable
		});
	}
	return {
		update: r,
		destroy() {
			n.destroy();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/Minimap.svelte
var Zb = (e) => e instanceof Function ? e : () => e, Qb = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"ariaLabel",
	"nodeStrokeColor",
	"nodeColor",
	"nodeClass",
	"nodeBorderRadius",
	"nodeStrokeWidth",
	"nodeComponent",
	"bgColor",
	"maskColor",
	"maskStrokeColor",
	"maskStrokeWidth",
	"width",
	"height",
	"pannable",
	"zoomable",
	"inversePan",
	"zoomStep",
	"class"
]), $b = /* @__PURE__ */ ca("<title> </title>"), ex = /* @__PURE__ */ ca("<svg class=\"svelte-flow__minimap-svg\" role=\"img\"><!><!><path class=\"svelte-flow__minimap-mask\" fill-rule=\"evenodd\" pointer-events=\"none\"></path></svg>"), tx = /* @__PURE__ */ K("<svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper>", 1);
function nx(e, t) {
	bt(t, !0);
	let n = $(t, "position", 3, "bottom-right"), r = $(t, "nodeStrokeColor", 3, "transparent"), i = $(t, "nodeClass", 3, ""), a = $(t, "nodeBorderRadius", 3, 5), o = $(t, "nodeStrokeWidth", 3, 2), s = $(t, "width", 3, 200), c = $(t, "height", 3, 150), l = $(t, "pannable", 3, !0), u = $(t, "zoomable", 3, !0), d = /* @__PURE__ */ wo(t, Qb), f = /* @__PURE__ */ F(vy), p = /* @__PURE__ */ F(() => U(f).ariaLabelConfig), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision", h = /* @__PURE__ */ F(() => `svelte-flow__minimap-desc-${U(f).flowId}`), g = /* @__PURE__ */ F(() => ({
		x: -U(f).viewport.x / U(f).viewport.zoom,
		y: -U(f).viewport.y / U(f).viewport.zoom,
		width: U(f).width / U(f).viewport.zoom,
		height: U(f).height / U(f).viewport.zoom
	})), _ = /* @__PURE__ */ F(() => U(f).nodes.some((e) => !e.hidden)), v = /* @__PURE__ */ F(() => U(_) ? Dg(ug(U(f).nodeLookup, { filter: (e) => !e.hidden }), U(g)) : U(g)), y = /* @__PURE__ */ F(() => U(v).width / s()), b = /* @__PURE__ */ F(() => U(v).height / c()), x = /* @__PURE__ */ F(() => Math.max(U(y), U(b))), S = /* @__PURE__ */ F(() => U(x) * s()), C = /* @__PURE__ */ F(() => U(x) * c()), w = /* @__PURE__ */ F(() => 5 * U(x)), T = /* @__PURE__ */ F(() => U(v).x - (U(S) - U(v).width) / 2 - U(w)), E = /* @__PURE__ */ F(() => U(v).y - (U(C) - U(v).height) / 2 - U(w)), D = /* @__PURE__ */ F(() => U(S) + U(w) * 2), O = /* @__PURE__ */ F(() => U(C) + U(w) * 2), k = () => U(x);
	var A = tx(), j = z(A);
	{
		let e = /* @__PURE__ */ F(() => ["svelte-flow__minimap", t.class]);
		va(j, () => ({ "--xy-minimap-background-color-props": t.bgColor })), fb(j.lastChild, Eo({
			get position() {
				return n();
			},
			get class() {
				return U(e);
			},
			"data-testid": "svelte-flow__minimap"
		}, () => d, {
			children: (e, n) => {
				var d = ua(), _ = z(d), v = (e) => {
					var n = ex();
					let d;
					var _ = R(n), v = (e) => {
						var n = $b(), r = R(n, !0);
						P(n), H(() => {
							Q(n, "id", U(h)), J(r, t.ariaLabel ?? U(p)["minimap.ariaLabel"]);
						}), q(e, n);
					};
					Y(_, (e) => {
						(t.ariaLabel ?? U(p)["minimap.ariaLabel"]) && e(v);
					});
					var y = B(_);
					X(y, 17, () => U(f).nodes, (e) => e.id, (e, n) => {
						let s = /* @__PURE__ */ F(() => U(f).nodeLookup.get(U(n).id));
						var c = ua(), l = z(c), u = (e) => {
							{
								let c = /* @__PURE__ */ F(() => t.nodeColor === void 0 ? void 0 : Zb(t.nodeColor)(U(n))), l = /* @__PURE__ */ F(() => Zb(r())(U(n))), u = /* @__PURE__ */ F(() => Zb(i())(U(n)));
								Yb(e, {
									get id() {
										return U(s).id;
									},
									get selected() {
										return U(s).selected;
									},
									get nodeComponent() {
										return t.nodeComponent;
									},
									get color() {
										return U(c);
									},
									get borderRadius() {
										return a();
									},
									get strokeColor() {
										return U(l);
									},
									get strokeWidth() {
										return o();
									},
									get shapeRendering() {
										return m;
									},
									get class() {
										return U(u);
									}
								});
							}
						}, d = /* @__PURE__ */ F(() => U(s) && Ug(U(s)) && !U(s).hidden);
						Y(l, (e) => {
							U(d) && e(u);
						}), q(e, c);
					});
					var b = B(y);
					P(n), ja(n, (e, t) => Xb?.(e, t), () => ({
						store: U(f),
						panZoom: U(f).panZoom,
						getViewScale: k,
						translateExtent: U(f).translateExtent,
						width: U(f).width,
						height: U(f).height,
						inversePan: t.inversePan,
						zoomStep: t.zoomStep,
						pannable: l(),
						zoomable: u()
					})), H(() => {
						Q(n, "width", s()), Q(n, "height", c()), Q(n, "viewBox", `${U(T) ?? ""} ${U(E) ?? ""} ${U(D) ?? ""} ${U(O) ?? ""}`), Q(n, "aria-labelledby", U(h)), d = Ha(n, "", d, {
							"--xy-minimap-mask-background-color-props": t.maskColor,
							"--xy-minimap-mask-stroke-color-props": t.maskStrokeColor,
							"--xy-minimap-mask-stroke-width-props": t.maskStrokeWidth ? t.maskStrokeWidth * U(x) : void 0
						}), Q(b, "d", `M${U(T) - U(w)},${U(E) - U(w)}h${U(D) + U(w) * 2}v${U(O) + U(w) * 2}h${-U(D) - U(w) * 2}z
      M${U(g).x ?? ""},${U(g).y ?? ""}h${U(g).width ?? ""}v${U(g).height ?? ""}h${-U(g).width}z`);
					}), q(e, n);
				};
				Y(_, (e) => {
					U(f).panZoom && e(v);
				}), q(e, d);
			},
			$$slots: { default: !0 }
		})), P(j);
	}
	q(e, A), xt();
}
//#endregion
//#region src/ui/CampaignFlow.svelte
Go();
var rx = /* @__PURE__ */ K("<button class=\"outline-button compact\">Load older history</button>"), ix = /* @__PURE__ */ K("<button class=\"outline-button compact\">Retry</button>"), ax = /* @__PURE__ */ K("<div class=\"history-load-status\" aria-live=\"polite\"><span> </span> <!> <!></div>"), ox = /* @__PURE__ */ K("<div class=\"wave-aggregate-strip\" aria-label=\"Current multi-lane wave aggregate\"><span><b>WAVE AGGREGATE</b><strong> </strong></span> <span><b>FIXED MEMBERS</b><strong> </strong></span> <span><b>ACCOUNTED</b><strong> </strong></span> <span><b>ACTIVE</b><strong> </strong></span> <i>PROJECTION ONLY</i></div>"), sx = /* @__PURE__ */ K("<article><div><b> </b><span> </span></div> <strong> </strong> <p> </p> <small> </small></article>"), cx = /* @__PURE__ */ K("<details class=\"wave-repair-plan\" aria-label=\"Historical wave projection diagnosis\"><summary><span><b>ACCOUNTING GAP</b><strong> </strong></span> <i> </i></summary> <div class=\"wave-repair-body\"><p> </p> <!> <footer><b>NO WRITE AUTHORITY</b><span>This diagnosis cannot sync state, reconcile custody, revive a worker, dispatch a lane, or change campaign phase.</span></footer></div></details>"), lx = /* @__PURE__ */ K("<div class=\"replay-toolbar\" aria-label=\"Campaign replay controls\"><div class=\"replay-buttons\"><button aria-label=\"First milestone\">↤</button> <button aria-label=\"Previous milestone\">←</button> <button class=\"replay-play\"> </button> <button aria-label=\"Next milestone\">→</button> <button aria-label=\"Latest milestone\">↦</button></div> <label class=\"replay-scrubber\"><span> </span><input type=\"range\" min=\"0\" aria-label=\"Replay position\"/></label> <div class=\"replay-now\"><strong> </strong><span> </span></div></div>"), ux = /* @__PURE__ */ K("<button> </button>"), dx = /* @__PURE__ */ K("<div class=\"history-filters\" aria-label=\"History filters\"></div>"), fx = /* @__PURE__ */ K("<p> </p>"), px = /* @__PURE__ */ K("<p class=\"program-history-message\">Building the durable hierarchy…</p>"), mx = /* @__PURE__ */ K("<div class=\"program-history-message error\"><span> </span><button class=\"outline-button compact\">Retry</button></div>"), hx = /* @__PURE__ */ K("<p class=\"program-history-message\">No strategy epochs have been recorded for this project.</p>"), gx = /* @__PURE__ */ K("<p>No baseline snapshot is available for this historical epoch.</p>"), _x = /* @__PURE__ */ K("<div class=\"boundary-row\" role=\"row\"><span><small> </small><strong> </strong></span><code> </code><code> </code></div>"), vx = /* @__PURE__ */ K("<div class=\"boundary-table\" role=\"table\" aria-label=\"Changed boundary values\"><div class=\"boundary-row heading\" role=\"row\"><span>GROUP / FIELD</span><span>START</span><span>END</span></div> <!></div>"), yx = /* @__PURE__ */ K("<li><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></li>"), bx = /* @__PURE__ */ K("<ol class=\"program-lanes\"></ol>"), xx = /* @__PURE__ */ K("<p>No durable research runs are attached to this wave.</p>"), Sx = /* @__PURE__ */ K("<ol class=\"program-custody\"></ol>"), Cx = /* @__PURE__ */ K("<details class=\"program-wave\"><summary><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></summary> <div class=\"program-wave-body\"><!> <!></div></details>"), wx = /* @__PURE__ */ K("<p class=\"program-history-message\">No waves are assigned to this epoch.</p>"), Tx = /* @__PURE__ */ K("<details class=\"program-epoch\"><summary><span><small> </small><strong> </strong></span> <span><b> </b><small> </small></span></summary> <div class=\"program-epoch-body\"><section class=\"epoch-boundary\"><header><span><small>START / END COMPARISON</small><strong> </strong></span><b> </b></header> <!></section> <div class=\"program-waves\"><!> <!></div></div></details>"), Ex = /* @__PURE__ */ K("<div class=\"program-epochs\"></div> <footer> </footer>", 1), Dx = /* @__PURE__ */ K("<section class=\"program-history\" aria-label=\"Program history hierarchy\"><header><div><span>PROGRAM HISTORY · READ ONLY</span><strong>Epoch → wave → lane and custody</strong></div> <!></header> <!></section>"), Ox = /* @__PURE__ */ K("<i aria-hidden=\"true\"></i>"), kx = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button> <!>", 1), Ax = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button>"), jx = /* @__PURE__ */ K("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><button aria-label=\"Close step details\">×</button></div> <p> </p> <details open=\"\"><summary>Authority boundary</summary><p>Moving through this stop requires the durable gate shown on the line. Observed files or worker activity cannot advance it.</p></details></aside>"), Mx = /* @__PURE__ */ K("<div class=\"flow-inspector empty\">Select a stop or branch to inspect what enters it and which gate controls the next move.</div>"), Nx = /* @__PURE__ */ K("<div class=\"campaign-map-layout journey-layout\"><div class=\"journey-board\" aria-label=\"Linear branching campaign workflow\"><div class=\"journey-line\"></div> <div class=\"journey-branches\" aria-label=\"Supporting research branches\"></div> <footer><b> </b><span> </span></footer></div> <!></div>"), Px = /* @__PURE__ */ K("<!> <!> <!>", 1), Fx = /* @__PURE__ */ K("<button aria-label=\"Close step details\">×</button>"), Ix = /* @__PURE__ */ K("<details open=\"\"><summary>Recorded payload</summary><pre> </pre></details>"), Lx = /* @__PURE__ */ K("<li><span> </span><strong> </strong></li>"), Rx = /* @__PURE__ */ K("<details><summary>Related substeps <strong> </strong></summary><ol></ol></details>"), zx = /* @__PURE__ */ K("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><!></div> <p> </p> <!> <!></aside>"), Bx = /* @__PURE__ */ K("<div class=\"flow-inspector empty\">Select a recorded milestone to inspect its durable payload and related substeps.</div>"), Vx = /* @__PURE__ */ K("<div class=\"campaign-map-layout\"><div class=\"campaign-flow-canvas\"><!></div> <!></div>"), Hx = /* @__PURE__ */ K("<section><div class=\"campaign-map-heading\"><div><p>CAMPAIGN LINE</p><h2>One main route, with deliberate research branches</h2><span> </span></div> <div class=\"campaign-map-tabs\"><button>Workflow</button> <button>Replay</button> <button>History</button></div></div> <!> <!> <!> <!> <!> <!></section>");
function Ux(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = {
		PLANNING: "plan",
		RESEARCH_REVIEW: "plan",
		RESEARCH_READY: "plan",
		REVISING: "plan",
		RUNNING: "dispatch",
		RESEARCH_RUNNING: "dispatch",
		RECONCILING: "landing",
		RESEARCH_INTAKE: "landing",
		SYNTHESIS_READY: "synthesis",
		SYNTHESIZING: "synthesis",
		DECISION_REQUIRED: "decision",
		NEXT_WAVE_READY: "decision",
		BLOCKED: "decision"
	}, u = [
		{
			id: "plan",
			order: "1",
			title: "Shape the wave",
			kicker: "SOL PLAN",
			role: "core",
			detail: "Bootstrap, synthesis guidance, or redirect context becomes a checked allocation of coherent, bounded lanes.",
			position: {
				x: 40,
				y: 90
			}
		},
		{
			id: "dispatch",
			order: "2",
			title: "Bounded execution",
			kicker: "WAVE OUT",
			role: "core",
			detail: "Approved immutable contracts dispatch dependency-safe lanes under the selected resource profile.",
			position: {
				x: 350,
				y: 25
			}
		},
		{
			id: "landing",
			order: "3",
			title: "Landing & custody",
			kicker: "EVIDENCE INTAKE",
			role: "custody",
			detail: "Terminal work is reconciled, mechanically repaired, frozen, and admitted as evidence—not campaign truth.",
			position: {
				x: 665,
				y: 90
			}
		},
		{
			id: "synthesis",
			order: "4",
			title: "Situation synthesis",
			kicker: "FAST REVIEW",
			role: "semantic",
			detail: "Sol checks what changed, contradictions, dependencies, and tunnel-vision risk, then gives planning guidance.",
			position: {
				x: 665,
				y: 305
			}
		},
		{
			id: "decision",
			order: "5",
			title: "Direction decision",
			kicker: "HUMAN / AUTOPILOT GATE",
			role: "gate",
			detail: "Stop, continue an obvious follow-up, or widen the search before another checked plan.",
			position: {
				x: 350,
				y: 370
			}
		},
		{
			id: "ideas",
			order: "↗",
			title: "Idea search",
			kicker: "OPTIONAL ESCAPE ROUTE",
			role: "escape",
			detail: "Search prior work and external sources when the current frontier is narrow, stale, or underdetermined.",
			position: {
				x: 40,
				y: 305
			}
		},
		{
			id: "redirect",
			order: "+",
			title: "External perspective",
			kicker: "OPERATOR INPUT",
			role: "escape",
			detail: "A supplied critique, paper, or reframing pauses automation safely and asks Sol to reshape direction.",
			position: {
				x: 40,
				y: 440
			}
		}
	], d = [
		{
			id: "intake",
			order: "01",
			title: "Packet inbox",
			kicker: "CONTEXT IN",
			detail: "A bounded queue packet is hashed and staged as context. Reception creates no launch or claim authority."
		},
		{
			id: "plan",
			order: "02",
			title: "Checked plan",
			kicker: "SOL + HUMAN GATE",
			detail: "Sol turns admitted context into a small, dependency-aware plan. A human keeps, revises, or blocks every proposed lane."
		},
		{
			id: "dispatch",
			order: "03",
			title: "Bounded wave",
			kicker: "CONFIRM + RUN",
			detail: "One exact schedule freezes contracts, dependencies, slots, and token caps before a separate dispatch action."
		},
		{
			id: "landing",
			order: "04",
			title: "Evidence return",
			kicker: "LAND + BATCH",
			detail: "Receipts land together at the wave boundary. Evidence is inspected and reconciled without becoming campaign truth automatically."
		},
		{
			id: "decision",
			order: "05",
			title: "Synthesis & decision",
			kicker: "SOL + HUMAN GATE",
			detail: "Synthesis names the delta, contradictions, and next options. The operator stops, continues, or opens a different branch."
		}
	], f = [
		{
			id: "redirect",
			column: 1,
			title: "External packet / redirect",
			kicker: "FEEDS INTAKE",
			detail: "A supplied paper, critique, or DKC packet enters as immutable context before planning."
		},
		{
			id: "ideas",
			column: 2,
			title: "Idea search & strategy",
			kicker: "FEEDS PLANNING",
			detail: "A bounded read-only search can widen the plan without creating executable work."
		},
		{
			id: "custody",
			column: 4,
			title: "Custody & independent replay",
			kicker: "SUPPORTS EVIDENCE",
			detail: "Separate Terra custody can validate artifacts and receipts without frontier authority."
		}
	], p = [
		[
			"plan",
			"dispatch",
			"core"
		],
		[
			"dispatch",
			"landing",
			"core"
		],
		[
			"landing",
			"synthesis",
			"core"
		],
		[
			"synthesis",
			"decision",
			"core"
		],
		[
			"decision",
			"plan",
			"core"
		],
		[
			"decision",
			"ideas",
			"escape"
		],
		[
			"decision",
			"redirect",
			"escape"
		],
		[
			"ideas",
			"plan",
			"escape"
		],
		[
			"redirect",
			"plan",
			"escape"
		]
	], m = {
		"wave.adopted": "Wave adopted",
		"research.review.started": "Sol checked the lane plan",
		"research.review.resolved": "Plan gate resolved",
		"research.dispatch.started": "Dispatch reserved",
		"research.dispatch.launched": "Bounded lane launched",
		"research.dispatch.failed": "Dispatch failed",
		"research.schedule.prepared": "Wave schedule frozen",
		"research.schedule.confirmed": "Wave schedule confirmed",
		"research.schedule.dispatch-started": "Scheduled wave reserved",
		"research.schedule.dispatched": "Scheduled wave launched",
		"research.run.observed": "Worker observed",
		"research.run.evidence-ready": "Evidence became ready",
		"research.evidence.returned": "Evidence returned to Sol",
		"synthesis.bundle.prepared": "Synthesis bundle frozen",
		"synthesis.requested": "Synthesis started",
		"synthesis.turn.completed": "Synthesis completed",
		"synthesis.reviewed": "Direction decision recorded",
		"campaign.redirect.queued": "External perspective queued",
		"campaign.redirect.started": "Sol redirect started",
		"campaign.redirect.turn.completed": "Sol redirect completed",
		"campaign.redirect.applied": "Redirect applied",
		"loop.started": "One-loop autopilot started",
		"loop.completed": "One-loop autopilot completed",
		"loop.attention": "Autopilot paused for attention",
		"loop.resumed": "Autopilot resumed",
		"campaign.operator-transition.completed": "DOC-A1 authority transition completed",
		"strategy.epoch.baseline-recorded": "Strategy epoch baseline recorded",
		"strategy.review.started": "Independent epoch review started",
		"strategy.review.turn.completed": "Independent epoch review completed",
		"strategy.epoch.activated": "New strategy epoch activated",
		"strategy.proposal.dismissed": "Strategy proposal dismissed",
		"strategy.wave.snapshot-recorded": "Wave strategy snapshot recorded",
		"custody.item.ready": "Custody contract marked ready",
		"custody.item.parked": "Custody work parked",
		"custody.item.proposed": "Custody work restored",
		"custody.lease.prepared": "Custody lease frozen",
		"custody.lease.confirmed": "Custody lease confirmed",
		"custody.lease.dispatched": "Terra steward dispatched",
		"custody.execution.finalizing": "Custody result measuring",
		"custody.execution.completed": "Custody receipt ready",
		"custody.receipt.landed": "Custody receipt landed",
		"custody.receipt.rejected": "Custody receipt rejected",
		"custody.lease.simulated": "Custody receipt simulated",
		"custody.lease.verified": "Custody receipt replay verified",
		"custody.lease.replay-failed": "Custody replay failed",
		"resource.schedule.simulated": "Resource schedule simulated"
	}, h = [
		{
			id: "all",
			label: "All"
		},
		{
			id: "gates",
			label: "Gates"
		},
		{
			id: "execution",
			label: "Execution"
		},
		{
			id: "evidence",
			label: "Evidence"
		}
	], g = /* @__PURE__ */ I(null), _ = /* @__PURE__ */ I("workflow"), v = /* @__PURE__ */ I("all"), y = /* @__PURE__ */ I(null), b = /* @__PURE__ */ I(null), x = /* @__PURE__ */ I(typeof window < "u" ? window.innerWidth : 1200), S = /* @__PURE__ */ I(U(x) <= 700), C = /* @__PURE__ */ I({
		nodes: [],
		edges: []
	}), w = /* @__PURE__ */ I([]), T = /* @__PURE__ */ I(0), E = /* @__PURE__ */ I(null), D = /* @__PURE__ */ I(!1), O = null, k = /* @__PURE__ */ I(""), A = /* @__PURE__ */ I(""), j = /* @__PURE__ */ I([]), ee = 0, M = /* @__PURE__ */ I(null), N = /* @__PURE__ */ I(!1), te = /* @__PURE__ */ I(""), ne = 0, re = /* @__PURE__ */ I(""), ie = /* @__PURE__ */ I(null), ae = /* @__PURE__ */ I(""), oe = /* @__PURE__ */ I(!1), se = /* @__PURE__ */ I(""), ce = 0;
	function le(e, t, n, r, i = {}) {
		return {
			title: e,
			kicker: t,
			detail: n,
			status: r,
			label: `${t}\n${e}\n${r}`,
			...i
		};
	}
	function ue(e) {
		return m[e] || e.replaceAll(".", " · ");
	}
	function de(e) {
		return e.type.startsWith("action.") || e.type === "project.phase.changed" || e.type === "loop.step.queued" ? !1 : !!m[e.type] || /^(wave\.|research\.(review|dispatch|evidence|run)\.|synthesis\.|campaign\.(redirect|operator-transition)\.|strategy\.|custody\.|loop\.)/.test(e.type);
	}
	function fe(e) {
		let t = e?.type || "";
		return t.startsWith("campaign.redirect") ? "redirect" : t.startsWith("strategy.") ? t.includes("activated") || t.includes("baseline") ? "plan" : "decision" : t.startsWith("custody.") ? "landing" : t.includes("operator-transition") || t.startsWith("research.review") || t.startsWith("research.plan") || t === "wave.adopted" ? "plan" : t.startsWith("research.dispatch") || t.startsWith("research.schedule") ? "dispatch" : t.startsWith("research.run") || t.startsWith("research.evidence") || t.startsWith("lane.") || t.startsWith("wave.triage") ? "landing" : t.startsWith("synthesis.") && t !== "synthesis.reviewed" ? "synthesis" : t === "synthesis.reviewed" || t.startsWith("loop.") ? "decision" : "plan";
	}
	function pe(e) {
		let t = fe(e);
		return t === "dispatch" ? "execution" : t === "landing" || t === "synthesis" ? "evidence" : "gates";
	}
	function me() {
		return U(S) ? {
			plan: {
				x: 0,
				y: 0
			},
			dispatch: {
				x: 155,
				y: 0
			},
			landing: {
				x: 155,
				y: 125
			},
			synthesis: {
				x: 155,
				y: 250
			},
			decision: {
				x: 0,
				y: 250
			},
			ideas: {
				x: 0,
				y: 375
			},
			redirect: {
				x: 155,
				y: 375
			}
		} : Object.fromEntries(u.map((e) => [e.id, e.position]));
	}
	function he(e) {
		return [
			"PLANNING",
			"RESEARCH_REVIEW",
			"RESEARCH_READY",
			"REVISING"
		].includes(e.phase) ? "plan" : ["RUNNING", "RESEARCH_RUNNING"].includes(e.phase) ? "dispatch" : [
			"RECONCILING",
			"RESEARCH_INTAKE",
			"SYNTHESIS_READY",
			"SYNTHESIZING"
		].includes(e.phase) ? "landing" : "decision";
	}
	function ge(e, t) {
		L(y, {
			id: e.id,
			type: "default",
			position: {
				x: 0,
				y: 0
			},
			data: le(e.title, e.kicker, e.detail, t)
		});
	}
	function _e(e, t = null, n = 0) {
		let r = t ? fe(t) : l[e.phase] || "plan", i = t && n > 0 ? fe(U(w)[n - 1]) : "", a = new Set(t ? U(w).slice(0, n + 1).map(fe) : []), o = !t && e.externalInputs?.some((e) => [
			"queued",
			"drafting",
			"drafted"
		].includes(e.status)), s = me();
		return {
			nodes: u.map((i) => {
				let c = i.id === r || i.id === "redirect" && o, l = !!(t && a.has(i.id) && !c), u = U(S) ? 135 : i.role === "gate" ? 235 : i.role === "escape" ? 205 : 215;
				return {
					id: i.id,
					type: "default",
					position: s[i.id],
					class: `campaign-flow-node stage-${i.id} role-${i.role} ${c ? "current" : ""} ${l ? "visited" : ""}`,
					style: `width: ${u}px; min-height: ${i.role === "gate" ? 92 : 82}px`,
					data: le(i.title, `${i.order} · ${i.kicker}`, i.detail, t && c ? `REPLAY ${n + 1}/${U(w).length}` : i.id === r ? e.phase : c ? "INPUT OPEN" : l ? "visited" : i.role === "escape" ? "optional" : "workflow", t && c ? { payload: t.payload } : {})
				};
			}),
			edges: p.map(([e, n, a], o) => {
				let s = t ? e === i && n === r : e === r, c = s ? "#71d6a0" : a === "escape" ? "#8b7750" : "#607568";
				return {
					id: `workflow-${o}`,
					source: e,
					target: n,
					type: a === "escape" ? "smoothstep" : "bezier",
					animated: s,
					markerEnd: {
						type: ng.ArrowClosed,
						color: c
					},
					style: `stroke: ${c}; stroke-width: ${s ? 2.4 : a === "escape" ? 1 : 1.3}; ${a === "escape" ? "stroke-dasharray: 5 4" : ""}`
				};
			})
		};
	}
	function ve(e) {
		return U(A) === e.id && U(j).length ? U(j) : Array.isArray(e.workflowHistory) ? e.workflowHistory : [];
	}
	function ye(e) {
		return U(A) === e.id ? ee : Number(e.workflowHistorySummary?.total || ve(e).length);
	}
	async function be(e, t = !1) {
		if (U(N) || t && !U(M)) return;
		let n = ++ne, r = t && ve(e).filter(de)[U(T)]?.id || "";
		(!t || U(A) !== e.id) && (L(A, e.id), L(j, []), L(M, null), ee = Number(e.workflowHistorySummary?.total || 0)), L(N, !0), L(te, "");
		try {
			let i = new URL("/api/workflow-history", location.origin);
			i.searchParams.set("project", e.id), i.searchParams.set("limit", "250"), t && U(M) && i.searchParams.set("cursor", U(M));
			let a = await fetch(`${i.pathname}${i.search}`, { cache: "no-store" }), o = await a.json();
			if (!a.ok) throw Error(o.error || `Could not load campaign history: ${a.status}`);
			if (n !== ne || U(g)?.id !== e.id) return;
			let s = t ? [...o.items, ...U(j)] : o.items;
			L(j, [...new Map(s.map((e) => [e.id, e])).values()]), ee = o.total, L(M, o.nextCursor);
			let c = U(j).filter(de);
			t && r ? L(T, Math.max(0, c.findIndex((e) => e.id === r))) : t || L(T, Math.max(0, c.length - 1));
		} catch (e) {
			n === ne && L(te, e instanceof Error ? e.message : String(e));
		} finally {
			n === ne && L(N, !1);
		}
	}
	async function xe(e) {
		let t = ++ce;
		L(ae, e.id), L(ie, null), L(oe, !0), L(se, "");
		try {
			let n = new URL("/api/program-history", location.origin);
			n.searchParams.set("project", e.id);
			let r = await fetch(`${n.pathname}${n.search}`, { cache: "no-store" }), i = await r.json();
			if (!r.ok) throw Error(i.error || `Could not load program history: ${r.status}`);
			if (t !== ce || U(g)?.id !== e.id) return;
			L(ie, i);
		} catch (e) {
			t === ce && L(se, e instanceof Error ? e.message : String(e));
		} finally {
			t === ce && L(oe, !1);
		}
	}
	function Se(e) {
		return [
			...e.boundary.metrics.map((e) => ({
				group: "metric",
				item: e
			})),
			...e.boundary.cost.map((e) => ({
				group: "cost",
				item: e
			})),
			...e.boundary.drift.map((e) => ({
				group: "drift",
				item: e
			}))
		].filter(({ item: e }) => e.changed);
	}
	function Ce(e) {
		return e == null ? "—" : typeof e == "string" ? e : JSON.stringify(e);
	}
	function we(e) {
		let t = ve(e).filter(de);
		return U(v) === "all" ? t : t.filter((e) => pe(e) === U(v));
	}
	function Te(e) {
		let t = ve(e), n = we(e).slice(-(U(S) ? 12 : 20)), r = U(S) ? 2 : 4, i = U(S) ? 155 : 220, a = U(S) ? 125 : 135, o = n.map((e, o) => {
			let s = Math.floor(o / r), c = o % r, l = s % 2 ? r - 1 - c : c, u = pe(e), d = t.filter((t) => t.aggregateId === e.aggregateId && t.id !== e.id);
			return {
				id: e.id,
				type: "default",
				position: {
					x: l * i,
					y: s * a
				},
				class: `campaign-flow-node history-node history-${u} ${o === n.length - 1 ? "current" : ""}`,
				style: `width: ${U(S) ? 135 : 185}px; min-height: 82px`,
				data: le(ue(e.type), `${new Date(e.createdAt).toLocaleString()} · ${e.aggregateType}`, e.aggregateId, o === n.length - 1 ? "LATEST" : u, {
					payload: e.payload,
					substeps: d
				})
			};
		});
		return {
			nodes: o,
			edges: o.slice(1).map((e, t) => ({
				id: `history-${t}`,
				source: o[t].id,
				target: e.id,
				type: "smoothstep",
				markerEnd: {
					type: ng.ArrowClosed,
					color: "#5d7064"
				},
				style: "stroke: #5d7064; stroke-width: 1.1"
			}))
		};
	}
	function Ee(e, t) {
		return e ? {
			id: e.id,
			position: {
				x: 0,
				y: 0
			},
			data: le(ue(e.type), `REPLAY ${t + 1}/${U(w).length} · ${new Date(e.createdAt).toLocaleString()}`, e.aggregateId, fe(e), { payload: e.payload })
		} : null;
	}
	function De() {
		L(D, !1), O && clearInterval(O), O = null;
	}
	function Oe(e) {
		L(T, Math.max(0, Math.min(e, Math.max(0, U(w).length - 1)))), L(y, null);
	}
	function ke() {
		if (U(D)) return De();
		U(T) >= U(w).length - 1 && Oe(0), L(D, !0), O = setInterval(() => {
			U(T) >= U(w).length - 1 ? De() : Oe(U(T) + 1);
		}, 900);
	}
	function Ae(e) {
		De(), L(_, e), L(y, null), e === "replay" && U(w).length && L(T, U(w).length - 1), e !== "workflow" && U(g) && be(U(g)), e === "history" && U(g) && (U(ae) !== U(g).id || !U(ie)) && xe(U(g));
	}
	function je(e) {
		L(v, e), L(y, null);
	}
	Oo(De), V(() => n(), () => {
		L(g, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(x), () => {
		L(S, U(x) <= 700);
	}), V(() => (U(A), U(j), U(M), U(v), U(S)), () => {
		L(re, `${U(A)}:${U(j).length}:${U(M) || ""}:${U(v)}:${U(S)}`);
	}), V(() => (U(g), U(A), U(j)), () => {
		L(w, U(g) ? (U(A) === U(g).id && U(j).length ? U(j) : Array.isArray(U(g).workflowHistory) ? U(g).workflowHistory : []).filter(de) : []);
	}), V(() => (U(g), U(k), U(w)), () => {
		U(g) && U(g).id !== U(k) && (L(k, U(g).id), L(T, Math.max(0, U(w).length - 1)));
	}), V(() => (U(g), U(_), U(ae), U(oe)), () => {
		U(g) && U(_) === "history" && U(ae) !== U(g).id && !U(oe) && xe(U(g));
	}), V(() => (U(T), U(w)), () => {
		U(T) >= U(w).length && U(w).length && L(T, U(w).length - 1);
	}), V(() => (U(w), U(T)), () => {
		L(E, U(w)[U(T)] || null);
	}), V(() => (U(re), U(g), U(_), U(E), U(T)), () => {
		U(re), L(C, U(g) ? U(_) === "history" ? Te(U(g)) : _e(U(g), U(_) === "replay" ? U(E) : null, U(T)) : {
			nodes: [],
			edges: []
		});
	}), V(() => (U(y), U(_), U(E), U(T)), () => {
		L(b, U(y) || (U(_) === "replay" ? Ee(U(E), U(T)) : null));
	}), V(() => U(g), () => {
		L(a, U(g)?.wave?.aggregate || null);
	}), V(() => U(g), () => {
		L(o, U(g) ? he(U(g)) : "intake");
	}), V(() => U(o), () => {
		L(s, Math.max(0, d.findIndex((e) => e.id === U(o))));
	}), V(() => U(g), () => {
		L(c, U(g)?.context?.sources?.filter((e) => e.role === "queue-plan").length || 0);
	}), Br(), xo();
	var Me = ua(), Ne = z(Me), Pe = (e) => {
		var t = Hx(), n = R(t), r = R(n), i = B(R(r), 2), l = R(i, !0);
		P(i), P(r);
		var u = B(r, 2), p = R(u);
		let m;
		var x = B(p, 2);
		let O;
		var k = B(x, 2);
		let A;
		P(u), P(n);
		var j = B(n, 2), ee = (e) => {
			var t = ax(), n = R(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = rx();
				G("click", t, () => be(U(g), !0)), q(e, t);
			};
			Y(i, (e) => {
				U(M) && !U(N) && e(a);
			});
			var o = B(i, 2), s = (e) => {
				var t = ix();
				G("click", t, () => be(U(g))), q(e, t);
			};
			Y(o, (e) => {
				U(te) && !U(N) && e(s);
			}), P(t), H((e) => J(r, e), [() => (U(N), U(te), U(g), W(() => U(N) ? "Loading durable history…" : U(te) || `${ve(U(g)).length} of ${ye(U(g))} events loaded`))]), q(e, t);
		};
		Y(j, (e) => {
			U(_) !== "workflow" && (U(N) || U(te) || U(M)) && e(ee);
		});
		var ne = B(j, 2), re = (e) => {
			var t = ox(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var o = B(n, 2), s = B(R(o)), c = R(s, !0);
			P(s), P(o);
			var l = B(o, 2), u = B(R(l)), d = R(u);
			P(u), P(l);
			var f = B(l, 2), p = B(R(f)), m = R(p, !0);
			P(p), P(f), Ke(2), P(t), H((e) => {
				J(i, e), J(c, (U(a), W(() => U(a).membership.count))), J(d, `${U(a), W(() => U(a).accounting.accounted) ?? ""}/${U(a), W(() => U(a).accounting.total) ?? ""}`), J(m, (U(a), W(() => U(a).parallelism.active)));
			}, [() => (U(a), W(() => U(a).state.replaceAll("_", " ")))]), q(e, t);
		};
		Y(ne, (e) => {
			U(a) && e(re);
		});
		var ae = B(ne, 2), ce = (e) => {
			var t = cx(), n = R(t), r = R(n), i = B(R(r)), o = R(i);
			P(i), P(r);
			var s = B(r, 2), c = R(s, !0);
			P(s), P(n);
			var l = B(n, 2), u = R(l), d = R(u, !0);
			P(u), X(B(u, 2), 1, () => (U(a), W(() => U(a).repairPlan.items)), (e) => e.laneId, (e, t) => {
				var n = sx(), r = R(n), i = R(r), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o);
				P(o), P(r);
				var c = B(r, 2), l = R(c, !0);
				P(c);
				var u = B(c, 2), d = R(u, !0);
				P(u);
				var f = B(u, 2), p = R(f);
				P(f), P(n), H((e, n) => {
					J(a, (U(t), W(() => U(t).laneId))), J(s, `${U(t), W(() => U(t).recordedAccountingState || "unrecorded") ?? ""} → ${U(t), W(() => U(t).proposedAccountingState || "no safe update") ?? ""}`), J(l, e), J(d, (U(t), W(() => U(t).note))), J(p, `Observer: ${U(t), W(() => U(t).observed.present ? `${U(t).observed.lifecycle} · ${U(t).observed.daemon} · ${U(t).observed.landing}` : "no current record") ?? ""}${n ?? ""}`);
				}, [() => (U(t), W(() => U(t).recommendation.replaceAll("_", " "))), () => (U(t), W(() => U(t).observed.updatedAt ? ` · ${new Date(U(t).observed.updatedAt).toLocaleString()}` : ""))]), q(e, n);
			}), Ke(2), P(l), P(t), H((e) => {
				J(o, `${U(a), W(() => U(a).repairPlan.items.length) ?? ""} historical member${U(a), W(() => U(a).repairPlan.items.length === 1 ? "" : "s") ?? ""} need evidence`), J(c, e), J(d, (U(a), W(() => U(a).repairPlan.summary)));
			}, [() => (U(a), W(() => U(a).repairPlan.status.replaceAll("_", " ")))]), q(e, t);
		};
		Y(ae, (e) => {
			U(a), W(() => U(a)?.repairPlan?.items?.length) && e(ce);
		});
		var le = B(ae, 2), de = (e) => {
			var t = lx(), n = R(t), r = R(n), i = B(r, 2), a = B(i, 2), o = R(a, !0);
			P(a);
			var s = B(a, 2), c = B(s, 2);
			P(n);
			var l = B(n, 2), u = R(l), d = R(u);
			P(u);
			var f = B(u);
			no(f), P(l);
			var p = B(l, 2), m = R(p), h = R(m, !0);
			P(m);
			var g = B(m), _ = R(g, !0);
			P(g), P(p), P(t), H((e, t, n) => {
				r.disabled = (U(w), U(T), W(() => !U(w).length || U(T) === 0)), i.disabled = (U(w), U(T), W(() => !U(w).length || U(T) === 0)), a.disabled = (U(w), W(() => U(w).length < 2)), J(o, U(D) ? "Pause" : "Play"), s.disabled = (U(w), U(T), W(() => !U(w).length || U(T) >= U(w).length - 1)), c.disabled = (U(w), U(T), W(() => !U(w).length || U(T) >= U(w).length - 1)), J(d, `${U(w), U(T), W(() => U(w).length ? U(T) + 1 : 0) ?? ""} / ${U(w), W(() => U(w).length) ?? ""}`), Q(f, "max", e), ro(f, U(T)), J(h, t), J(_, n);
			}, [
				() => (U(w), W(() => Math.max(0, U(w).length - 1))),
				() => (U(E), W(() => U(E) ? ue(U(E).type) : "No recorded milestones")),
				() => (U(E), W(() => U(E) ? new Date(U(E).createdAt).toLocaleString() : ""))
			]), G("click", r, () => Oe(0)), G("click", i, () => Oe(U(T) - 1)), G("click", a, ke), G("click", s, () => Oe(U(T) + 1)), G("click", c, () => Oe(U(w).length - 1)), G("input", f, (e) => Oe(Number(e.currentTarget.value))), q(e, t);
		}, fe = (e) => {
			var t = dx();
			X(t, 5, () => h, ya, (e, t) => {
				var n = ux();
				let r;
				var i = R(n, !0);
				P(n), H(() => {
					r = Z(n, 1, "", null, r, { active: U(v) === U(t).id }), J(i, (U(t), W(() => U(t).label)));
				}), G("click", n, () => je(U(t).id)), q(e, n);
			}), P(t), q(e, t);
		};
		Y(le, (e) => {
			U(_) === "replay" ? e(de) : U(_) === "history" && e(fe, 1);
		});
		var pe = B(le, 2), me = (e) => {
			var t = Dx(), n = R(t), r = B(R(n), 2), i = (e) => {
				var t = fx(), n = R(t);
				P(t), H(() => J(n, `${U(ie), W(() => U(ie).counts.epochs) ?? ""} epochs · ${U(ie), W(() => U(ie).counts.waves) ?? ""} waves · ${U(ie), W(() => U(ie).counts.lanes) ?? ""} lanes · ${U(ie), W(() => U(ie).counts.custody) ?? ""} custody`)), q(e, t);
			};
			Y(r, (e) => {
				U(ie) && e(i);
			}), P(n);
			var a = B(n, 2), o = (e) => {
				q(e, px());
			}, s = (e) => {
				var t = mx(), n = R(t), r = R(n, !0);
				P(n);
				var i = B(n);
				P(t), H(() => J(r, U(se))), G("click", i, () => xe(U(g))), q(e, t);
			}, c = (e) => {
				q(e, hx());
			}, l = (e) => {
				var t = Ex(), n = z(t);
				X(n, 7, () => (U(ie), W(() => U(ie).epochs)), (e) => e.id, (e, t, n) => {
					var r = Tx(), i = R(r), a = R(i), o = R(a), s = R(o);
					P(o);
					var c = B(o), l = R(c, !0);
					P(c), P(a);
					var u = B(a, 2), d = R(u), f = R(d, !0);
					P(d);
					var p = B(d), m = R(p);
					P(p), P(u), P(i);
					var h = B(i, 2), g = R(h), _ = R(g), v = R(_), y = B(R(v)), b = R(y, !0);
					P(y), P(v);
					var x = B(v), S = R(x);
					P(x), P(_);
					var C = B(_, 2), w = (e) => {
						q(e, gx());
					}, T = (e) => {
						var n = fx(), r = R(n, !0);
						P(n), H(() => J(r, (U(t), W(() => U(t).boundary.complete ? "The recorded boundary values are unchanged." : "Only the current baseline is available; no completed end boundary has been recorded.")))), q(e, n);
					}, E = /* @__PURE__ */ F(() => (U(t), W(() => !Se(U(t)).length))), D = (e) => {
						var n = vx();
						X(B(R(n), 2), 1, () => (U(t), W(() => Se(U(t)))), (e) => `${e.group}:${e.item.key}`, (e, t) => {
							var n = _x(), r = R(n), i = R(r), a = R(i, !0);
							P(i);
							var o = B(i), s = R(o, !0);
							P(o), P(r);
							var c = B(r), l = R(c, !0);
							P(c);
							var u = B(c), d = R(u, !0);
							P(u), P(n), H((e, n) => {
								J(a, (U(t), W(() => U(t).group))), J(s, (U(t), W(() => U(t).item.key))), J(l, e), J(d, n);
							}, [() => (U(t), W(() => Ce(U(t).item.start))), () => (U(t), W(() => Ce(U(t).item.end)))]), q(e, n);
						}), P(n), q(e, n);
					};
					Y(C, (e) => {
						U(t), W(() => !U(t).boundary.startSnapshot) ? e(w) : U(E) ? e(T, 1) : e(D, -1);
					}), P(g);
					var O = B(g, 2), k = R(O);
					X(k, 1, () => (U(t), W(() => U(t).waves)), (e) => e.id, (e, t) => {
						var n = Cx(), r = R(n), i = R(r), a = R(i), o = R(a);
						P(a);
						var s = B(a), c = R(s, !0);
						P(s), P(i);
						var l = B(i), u = R(l), d = R(u, !0);
						P(u);
						var f = B(u), p = R(f);
						P(f), P(l), P(r);
						var m = B(r, 2), h = R(m), g = (e) => {
							var n = bx();
							X(n, 5, () => (U(t), W(() => U(t).lanes)), (e) => e.id, (e, t) => {
								var n = yx(), r = R(n), i = R(r), a = R(i, !0);
								P(i);
								var o = B(i), s = R(o, !0);
								P(o), P(r);
								var c = B(r), l = R(c), u = R(l, !0);
								P(l);
								var d = B(l), f = R(d, !0);
								P(d), P(c), P(n), H((e, n) => {
									J(a, (U(t), W(() => U(t).profile || "research"))), J(s, (U(t), W(() => U(t).taskId || U(t).id))), J(u, e), J(f, n);
								}, [() => (U(t), W(() => U(t).status.replaceAll("_", " "))), () => (U(t), W(() => U(t).tokens === null ? "unmeasured" : `${U(t).tokens.toLocaleString()} tokens`))]), q(e, n);
							}), P(n), H(() => Q(n, "aria-label", (U(t), W(() => `Research lanes in ${U(t).label || U(t).id}`)))), q(e, n);
						}, _ = (e) => {
							q(e, xx());
						};
						Y(h, (e) => {
							U(t), W(() => U(t).lanes.length) ? e(g) : e(_, -1);
						});
						var v = B(h, 2), y = (e) => {
							var n = Sx();
							X(n, 5, () => (U(t), W(() => U(t).custody)), (e) => e.id, (e, t) => {
								var n = yx(), r = R(n), i = R(r), a = R(i, !0);
								P(i);
								var o = B(i), s = R(o, !0);
								P(o), P(r);
								var c = B(r), l = R(c), u = R(l, !0);
								P(l);
								var d = B(l), f = R(d);
								P(d), P(c), P(n), H((e) => {
									J(a, (U(t), W(() => U(t).sourceType))), J(s, (U(t), W(() => U(t).task))), J(u, e), J(f, `${U(t), W(() => U(t).leases.length) ?? ""} lease${U(t), W(() => U(t).leases.length === 1 ? "" : "s") ?? ""}`);
								}, [() => (U(t), W(() => U(t).status.replaceAll("_", " ")))]), q(e, n);
							}), P(n), H(() => Q(n, "aria-label", (U(t), W(() => `Custody work in ${U(t).label || U(t).id}`)))), q(e, n);
						};
						Y(v, (e) => {
							U(t), W(() => U(t).custody.length) && e(y);
						}), P(m), P(n), H((e, n) => {
							J(o, `WAVE · ${e ?? ""}`), J(c, (U(t), W(() => U(t).label || U(t).id))), J(d, n), J(p, `${U(t), W(() => U(t).lanes.length) ?? ""} lanes · ${U(t), W(() => U(t).custody.length) ?? ""} custody`);
						}, [() => (U(t), W(() => U(t).assignment.basis.replaceAll("-", " "))), () => (U(t), W(() => U(t).phase.replaceAll("_", " ")))]), q(e, n);
					});
					var A = B(k, 2), j = (e) => {
						q(e, wx());
					};
					Y(A, (e) => {
						U(t), W(() => !U(t).waves.length) && e(j);
					}), P(O), P(h), P(r), H((e, i, a, o) => {
						r.open = (Si(U(n)), U(ie), W(() => U(n) === U(ie).epochs.length - 1)), J(s, `EPOCH ${U(n) + 1} · CHARTER R${U(t), W(() => U(t).charterRevision) ?? ""}`), J(l, (U(t), W(() => U(t).label))), J(f, e), J(m, `${i ?? ""} → ${a ?? ""}`), Q(g, "aria-label", (U(t), W(() => `Boundary comparison for ${U(t).label}`))), J(b, (U(t), W(() => U(t).boundary.complete ? "Completed epoch boundary" : "Current boundary projection"))), J(S, `${o ?? ""} changed`);
					}, [
						() => (U(t), W(() => U(t).status.replaceAll("_", " "))),
						() => (U(t), W(() => new Date(U(t).startedAt).toLocaleDateString())),
						() => (U(t), W(() => U(t).completedAt ? new Date(U(t).completedAt).toLocaleDateString() : "active")),
						() => (U(t), W(() => Se(U(t)).length))
					]), q(e, r);
				}), P(n);
				var r = B(n, 2), i = R(r, !0);
				P(r), H(() => J(i, (U(ie), W(() => U(ie).ownershipPolicy)))), q(e, t);
			};
			Y(a, (e) => {
				U(oe) ? e(o) : U(se) ? e(s, 1) : (U(ie), W(() => !U(ie)?.epochs.length) ? e(c, 2) : e(l, -1));
			}), P(t), q(e, t);
		};
		Y(pe, (e) => {
			U(_) === "history" && e(me);
		});
		var he = B(pe, 2), _e = (e) => {
			var t = Nx(), n = R(t), r = R(n);
			X(r, 7, () => d, (e) => e.id, (e, t, n) => {
				var r = kx(), i = z(r);
				let a;
				var l = R(i), u = R(l);
				P(l);
				var f = B(l), p = R(f, !0);
				P(f);
				var m = B(f), h = R(m, !0);
				P(m), P(i);
				var _ = B(i, 2), v = (e) => {
					var t = Ox();
					let r;
					H(() => r = Z(t, 1, "journey-link", null, r, { active: U(n) === U(s) })), q(e, t);
				};
				Y(_, (e) => {
					Si(U(n)), W(() => U(n) < d.length - 1) && e(v);
				}), H((e) => {
					a = Z(i, 1, "journey-stop", null, a, {
						current: U(t).id === U(o),
						visited: U(n) < U(s)
					}), J(u, `${U(t), W(() => U(t).order) ?? ""} · ${U(t), W(() => U(t).kicker) ?? ""}`), J(p, (U(t), W(() => U(t).title))), J(h, e);
				}, [() => (U(t), U(o), U(g), U(c), W(() => U(t).id === U(o) ? U(g).phase.replaceAll("_", " ") : U(t).id === "intake" ? `${U(c)} packet${U(c) === 1 ? "" : "s"} staged` : "explicit gate"))]), G("click", i, () => ge(U(t), U(t).id === U(o) ? U(g).phase : U(t).id === "intake" ? `${U(c)} staged` : "gated")), q(e, r);
			}), P(r);
			var i = B(r, 2);
			X(i, 5, () => f, (e) => e.id, (e, t) => {
				var n = Ax(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H(() => {
					Z(n, 1, `journey-branch branch-${U(t), W(() => U(t).id) ?? ""}`), Ha(n, (U(t), W(() => `--branch-column:${U(t).column}`))), J(i, (U(t), W(() => U(t).kicker))), J(o, (U(t), W(() => U(t).title))), J(c, (U(t), W(() => U(t).detail)));
				}), G("click", n, () => ge(U(t), U(t).id === "redirect" && U(g).externalInputs?.some((e) => [
					"queued",
					"drafting",
					"drafted"
				].includes(e.status)) ? "input open" : "optional branch")), q(e, n);
			}), P(i);
			var a = B(i, 2), l = R(a), u = R(l, !0);
			P(l);
			var p = B(l), m = R(p, !0);
			P(p), P(a), P(n);
			var h = B(n, 2), _ = (e) => {
				var t = jx(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o, !0);
				P(o), P(r);
				var c = B(r);
				P(n);
				var l = B(n, 2), u = R(l, !0);
				P(l), Ke(2), P(t), H(() => {
					J(a, (U(b), W(() => U(b).data.kicker))), J(s, (U(b), W(() => U(b).data.title))), J(u, (U(b), W(() => U(b).data.detail)));
				}), G("click", c, () => L(y, null)), q(e, t);
			}, v = (e) => {
				q(e, Mx());
			};
			Y(h, (e) => {
				U(b) ? e(_) : e(v, -1);
			}), P(t), H(() => {
				Ha(r, `--current-stage:${U(s)}`), J(u, (U(g), W(() => U(g).controlState?.recovery?.required ? "CONTROL HOLD" : "GATES ENFORCED"))), J(m, (U(g), W(() => U(g).controlState?.recovery?.required ? "New packets can be received and hashed, but the main line cannot advance until the historical boundary is reviewed." : "Branches rejoin the main line through normal planning, custody, and decision gates.")));
			}), q(e, t);
		}, Te = (e) => {
			var t = Vx(), n = R(t);
			_a(R(n), () => (U(_), U(v), U(S), U(g), W(() => `${U(_)}-${U(v)}-${U(S)}-${U(g).id}`)), (e) => {
				{
					let t = /* @__PURE__ */ Cn(() => ({
						padding: U(S) ? .06 : .14,
						maxZoom: U(S) ? .74 : .88
					}));
					xb(e, {
						get nodes() {
							return U(C), W(() => U(C).nodes);
						},
						get edges() {
							return U(C), W(() => U(C).edges);
						},
						fitView: !0,
						get fitViewOptions() {
							return U(t);
						},
						minZoom: .2,
						maxZoom: 1.8,
						nodesDraggable: !1,
						nodesConnectable: !1,
						elementsSelectable: !0,
						colorMode: "dark",
						onnodeclick: ({ node: e }) => L(y, e),
						children: (e, t) => {
							var n = Px(), r = z(n);
							Kb(r, {
								patternColor: "#385043",
								gap: 22,
								size: 1,
								get variant() {
									return Si(zb), W(() => zb.Dots);
								}
							});
							var i = B(r, 2);
							Rb(i, { showLock: !1 }), nx(B(i, 2), {
								pannable: !0,
								zoomable: !0,
								nodeColor: (e) => String(e.class).includes("current") ? "#71d6a0" : String(e.class).includes("role-escape") ? "#9b8150" : "#52685a",
								maskColor: "rgba(8, 15, 11, .72)"
							}), q(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			}), P(n);
			var r = B(n, 2), i = (e) => {
				var t = zx(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o, !0);
				P(o), P(r);
				var c = B(r), l = (e) => {
					var t = Fx();
					G("click", t, () => L(y, null)), q(e, t);
				};
				Y(c, (e) => {
					U(y) && e(l);
				}), P(n);
				var u = B(n, 2), d = R(u, !0);
				P(u);
				var f = B(u, 2), p = (e) => {
					var t = Ix(), n = B(R(t)), r = R(n, !0);
					P(n), P(t), H((e) => J(r, e), [() => (U(b), W(() => JSON.stringify(U(b).data.payload, null, 2)))]), q(e, t);
				};
				Y(f, (e) => {
					U(b), W(() => U(b).data.payload) && e(p);
				});
				var m = B(f, 2), h = (e) => {
					var t = Rx(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var a = B(n);
					X(a, 5, () => (U(b), W(() => U(b).data.substeps)), (e) => e.id, (e, t) => {
						var n = Lx(), r = R(n), i = R(r, !0);
						P(r);
						var a = B(r), o = R(a, !0);
						P(a), P(n), H((e, t) => {
							J(i, e), J(o, t);
						}, [() => (U(t), W(() => new Date(U(t).createdAt).toLocaleTimeString())), () => (U(t), W(() => ue(U(t).type)))]), q(e, n);
					}), P(a), P(t), H(() => J(i, (U(b), W(() => U(b).data.substeps.length)))), q(e, t);
				};
				Y(m, (e) => {
					U(b), W(() => U(b).data.substeps?.length) && e(h);
				}), P(t), H(() => {
					J(a, (U(b), W(() => U(b).data.kicker))), J(s, (U(b), W(() => U(b).data.title))), J(d, (U(b), W(() => U(b).data.detail)));
				}), q(e, t);
			}, a = (e) => {
				q(e, Bx());
			};
			Y(r, (e) => {
				U(b) ? e(i) : e(a, -1);
			}), P(t), q(e, t);
		};
		Y(he, (e) => {
			U(_) === "workflow" ? e(_e) : e(Te, -1);
		}), P(t), H((e) => {
			Z(t, 1, `campaign-map mode-${U(_) ?? ""}`), J(l, e), m = Z(p, 1, "", null, m, { active: U(_) === "workflow" }), O = Z(x, 1, "", null, O, { active: U(_) === "replay" }), A = Z(k, 1, "", null, A, { active: U(_) === "history" });
		}, [() => (U(_), U(w), U(g), W(() => U(_) === "workflow" ? "Packet → checked plan → bounded wave → evidence → decision. Side lines feed the route without bypassing its gates." : U(_) === "replay" ? `Read-only playback of ${U(w).length} loaded milestone${U(w).length === 1 ? "" : "s"} from ${ye(U(g))} durable events.` : `${we(U(g)).length} matching loaded milestones; ${ye(U(g))} durable events are available.`))]), G("click", p, () => Ae("workflow")), G("click", x, () => Ae("replay")), G("click", k, () => Ae("history")), q(e, t);
	};
	Y(Ne, (e) => {
		U(g) && e(Pe);
	}), bo("innerWidth", (e) => L(x, e)), q(e, Me), xt(), i();
}
//#endregion
//#region src/ui/LoopControl.svelte
$i(["click", "input"]), Go();
var Wx = /* @__PURE__ */ K("<div class=\"loop-error\" role=\"alert\"><strong>Paused safely</strong><span> </span></div>"), Gx = /* @__PURE__ */ K("<p> </p>"), Kx = /* @__PURE__ */ K("<div class=\"loop-resolution\"><span> </span> <strong> </strong> <!></div>"), qx = /* @__PURE__ */ K("<div class=\"loop-resolution\"><span>REQUIRED BEFORE AUTOPILOT CAN CONTINUE</span> <strong> </strong> <p> </p></div>"), Jx = /* @__PURE__ */ K("<li><b> </b><div><strong> </strong><span> </span><p> </p></div><i> </i></li>"), Yx = /* @__PURE__ */ K("<li><strong> </strong><span> </span></li>"), Xx = /* @__PURE__ */ K("<details class=\"schedule-deferred\"><summary>Deferred candidates <strong> </strong></summary><ul></ul></details>"), Zx = /* @__PURE__ */ K("<details class=\"scheduled-wave\"><summary><span> </span><strong> </strong></summary> <div class=\"scheduled-wave-body\"><div class=\"schedule-budget\"><span><b> </b> tokens reserved</span><span><b> </b> available slots</span><span><b> </b> schedule state</span></div> <ol></ol> <!> <footer><b> </b><span> </span></footer></div></details>"), Qx = /* @__PURE__ */ K("<button class=\"outline-button compact\">Stop & capture here</button>"), $x = /* @__PURE__ */ K("<button class=\"primary-button compact\">Return to custody action</button> <!>", 1), eS = /* @__PURE__ */ K("<button class=\"primary-button autopilot-start-button\" disabled=\"\">▶ Start one-loop autopilot</button> <button class=\"outline-button compact autopilot-unlock-button\"> </button>", 1), tS = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button> <!>", 1), nS = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button>"), rS = /* @__PURE__ */ K("<!> <!>", 1), iS = /* @__PURE__ */ K("<button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), aS = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), oS = /* @__PURE__ */ K("<button class=\"primary-button\"> </button>"), sS = /* @__PURE__ */ K("<div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div>"), cS = /* @__PURE__ */ K("<div class=\"loop-boundary pending\"><span>END · PENDING</span><strong> </strong></div>"), lS = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small></div></li>"), uS = /* @__PURE__ */ K("<ol class=\"loop-context-steps\"></ol>"), dS = /* @__PURE__ */ K("<div role=\"status\"><span> </span></div>"), fS = /* @__PURE__ */ K("<section id=\"loop-control\" aria-live=\"polite\"><div class=\"loop-control-heading\"><div><p class=\"eyebrow\">ONE-LOOP AUTOPILOT</p> <h3> </h3> <p> </p></div> <span> </span></div> <!> <!> <!> <!> <div class=\"loop-control-row\"><div class=\"loop-now\"><span> </span> <strong> </strong></div> <div class=\"loop-buttons\"><!></div></div> <details class=\"loop-context\"><summary>Loop record & step ledger <strong> </strong></summary> <div class=\"loop-boundaries\"><div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div> <!></div> <!></details> <!></section>");
function pS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(), p = /* @__PURE__ */ I(), m = /* @__PURE__ */ I(), h = /* @__PURE__ */ I(), g = /* @__PURE__ */ I(), _ = /* @__PURE__ */ I(), v = /* @__PURE__ */ I(), y = /* @__PURE__ */ I(), b = /* @__PURE__ */ I(), x = /* @__PURE__ */ I(), S = /* @__PURE__ */ I(), C = /* @__PURE__ */ I(), w = /* @__PURE__ */ I(), T = /* @__PURE__ */ I(null), E = /* @__PURE__ */ I(""), D = /* @__PURE__ */ I(""), O = /* @__PURE__ */ I("pending"), k = {
		SYNTHESIS_READY: "results ready",
		SYNTHESIZING: "synthesizing situation",
		DECISION_REQUIRED: "direction decision",
		RESEARCH_REVIEW: "wave planning",
		RESEARCH_READY: "human launch gate",
		RESEARCH_RUNNING: "wave out",
		RESEARCH_INTAKE: "landing and intake",
		NEXT_WAVE_READY: "next wave ready",
		PLANNING: "planning"
	}, A = {
		"loop.start": {
			pending: "Starting one-loop autopilot…",
			completed: "Autopilot started from the captured boundary."
		},
		"loop.pause": {
			pending: "Pausing automatic advancement…",
			completed: "Autopilot paused before another step starts."
		},
		"loop.resume": {
			pending: "Rechecking the recorded boundary…",
			completed: "The boundary cleared; autopilot resumed."
		},
		"loop.halt-after-step": {
			pending: "Arming the next step boundary…",
			completed: "Autopilot will halt when the current step settles."
		},
		"loop.stop": {
			pending: "Stopping and capturing this run…",
			completed: "The loop stopped and its end state was captured."
		},
		"research.schedule.prepare": {
			pending: "Freezing the dependency-safe resource frontier…",
			completed: "The immutable multi-member schedule is ready for review."
		},
		"research.schedule.confirm": {
			pending: "Confirming the exact schedule digest…",
			completed: "The wave reservation is confirmed. No worker launched yet."
		},
		"research.schedule.dispatch": {
			pending: "Reserving and launching the confirmed wave…",
			completed: "The confirmed wave was dispatched under its fixed contracts."
		}
	};
	function j(e = "PLANNING") {
		return k[e] || e.toLowerCase().replaceAll("_", " ");
	}
	function ee(e) {
		if (!e) return "Pending";
		let t = new Date(e);
		return Number.isFinite(t.getTime()) ? t.toLocaleString() : "Pending";
	}
	function M(e) {
		let t = e?.runCounts || {}, n = Number(t.returned_to_sol || 0) + Number(t.evidence_ready || 0);
		return e?.latestRun?.taskId ? `${e.latestRun.taskId} · ${e.latestRun.status || "recorded"}` : `${n} landed research receipt${n === 1 ? "" : "s"}`;
	}
	async function N(e, t = "", n = {}) {
		if (!(!U(T) || U(E))) {
			L(E, e), L(O, "pending"), L(D, A[e]?.pending || "Updating autopilot…");
			try {
				await as({
					projectId: U(T).id,
					type: e,
					targetId: t,
					args: n,
					scope: "loop-control",
					pollLimit: e === "research.schedule.dispatch" ? 160 : 32
				}), L(O, "success"), L(D, A[e]?.completed || "Autopilot updated.");
			} catch (e) {
				L(O, "error"), L(D, e instanceof Error ? e.message : String(e));
			} finally {
				L(E, "");
			}
		}
	}
	function te() {
		document.querySelector("#operator-gate, #next-action")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	function ne() {
		for (let e of ["#strategy-workspaces", "#strategy-workspace"]) {
			let t = document.querySelector(e);
			t instanceof HTMLDetailsElement && (t.open = !0);
		}
		requestAnimationFrame(() => document.querySelector("#strategy-workspace")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		}));
	}
	V(() => n(), () => {
		L(T, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(T), () => {
		L(a, U(T)?.loop || null);
	}), V(() => U(a), () => {
		L(o, !!(U(a) && [
			"running",
			"paused",
			"attention"
		].includes(U(a).status)));
	}), V(() => U(a), () => {
		L(s, U(a)?.steps || []);
	}), V(() => (U(s), U(a)), () => {
		L(c, U(s).find((e) => e.actionId === U(a)?.pendingActionId) || U(s).at(-1));
	}), V(() => U(T), () => {
		L(l, U(T)?.researchRuns?.find((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || null);
	}), V(() => U(T), () => {
		L(u, U(T)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || []);
	}), V(() => U(u), () => {
		L(d, U(u).find((e) => e.launchAttempt?.status === "uncertain"));
	}), V(() => U(T), () => {
		L(f, U(T)?.researchSchedule || null);
	}), V(() => U(T), () => {
		L(p, U(T)?.phase === "RESEARCH_READY");
	}), V(() => U(T), () => {
		L(m, (U(T)?.custody?.items || []).filter((e) => e.blocksResearch && !["complete", "parked"].includes(e.status)));
	}), V(() => (U(p), U(m)), () => {
		L(h, U(p) && U(m).length > 0);
	}), V(() => U(f), () => {
		L(g, !!(U(f) && [
			"completed",
			"failed",
			"superseded"
		].includes(U(f).status)));
	}), V(() => (U(p), U(h), U(f), U(g)), () => {
		L(_, U(p) && !U(h) && (!U(f) || U(g)));
	}), V(() => (U(f), U(g), U(T)), () => {
		L(v, !!(U(f) && !U(g) && [
			"RESEARCH_READY",
			"RESEARCH_RUNNING",
			"RESEARCH_INTAKE",
			"SYNTHESIZING"
		].includes(U(T)?.phase || "")));
	}), V(() => (U(T), U(o), U(p), U(f)), () => {
		L(y, !!(U(T) && !U(o) && !U(T).canStartLoop && U(T).loopStart?.blocker && !(U(p) && U(f) && ["proposed", "confirmed"].includes(U(f).status))));
	}), V(() => U(T), () => {
		L(b, U(T)?.strategy?.workspace?.activeReview?.status === "drafted" ? U(T).strategy.workspace.activeReview.response?.proposal : null);
	}), V(() => (U(y), U(p), U(f), U(a)), () => {
		L(x, U(y) ? "PREFLIGHT BLOCKED" : U(p) && U(f)?.status === "proposed" ? "CONFIRM WAVE" : U(p) && U(f)?.status === "confirmed" ? "WAVE RESERVED" : {
			running: "RUNNING",
			paused: "PAUSED",
			attention: "NEEDS ATTENTION",
			completed: "LOOP COMPLETE",
			stopped: "STOPPED"
		}[U(a)?.status || ""] || "READY");
	}), V(() => (U(y), U(p), U(f), U(a)), () => {
		L(S, U(y) || U(p) && U(f)?.status === "proposed" ? "attention" : U(p) && U(f)?.status === "confirmed" ? "paused" : U(a)?.status === "attention" ? "attention" : U(a)?.status === "completed" ? "complete" : U(a)?.status || "ready");
	}), V(() => U(T), () => {
		L(C, U(T)?.researchPlan?.response?.operatorGuidance || U(T)?.wave?.synthesis?.response?.operatorBrief?.nextDecision || "Resolve the required human gate, then autopilot can recheck the boundary.");
	}), V(() => U(T), () => {
		L(w, U(T)?.phase === "RESEARCH_REVIEW" && U(T)?.researchPlan?.status === "drafted" && U(T)?.researchPlan?.response?.decision === "BLOCKED" && U(T)?.researchPlan?.response?.lanes?.some((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), Br(), xo();
	var re = ua(), ie = z(re), ae = (e) => {
		var t = fS(), n = R(t), r = R(n), i = B(R(r), 2), k = R(i, !0);
		P(i);
		var A = B(i, 2), re = R(A, !0);
		P(A), P(r);
		var ie = B(r, 2), ae = R(ie, !0);
		P(ie), P(n);
		var oe = B(n, 2), se = (e) => {
			var t = Wx(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, (U(a), W(() => U(a).error)))), q(e, t);
		};
		Y(oe, (e) => {
			U(a), U(w), W(() => U(a)?.error && !U(w)) && e(se);
		});
		var ce = B(oe, 2), le = (e) => {
			var t = Kx(), n = R(t), r = R(n);
			P(n);
			var i = B(n, 2), a = R(i, !0);
			P(i);
			var o = B(i, 2), s = (e) => {
				var t = Gx(), n = R(t);
				P(t), H((e, t) => J(n, `${e ?? ""} required · ${t ?? ""} currently schedulable · no workflow transition was consumed.`), [() => (U(T), W(() => Number(U(T).loopStart.minimumRunnableTokenCap).toLocaleString())), () => (U(T), W(() => Number(U(T).loopStart.effectiveTokenLimit || 0).toLocaleString()))]), q(e, t);
			};
			Y(o, (e) => {
				U(T), W(() => U(T)?.loopStart?.minimumRunnableTokenCap) && e(s);
			}), P(t), H((e) => {
				J(r, `AUTOMATION START PREFLIGHT · ${e ?? ""}`), J(a, (U(T), W(() => U(T)?.loopStart?.blocker)));
			}, [() => (U(T), W(() => U(T)?.loopStart?.code?.replaceAll("_", " ")))]), q(e, t);
		};
		Y(ce, (e) => {
			U(y) && e(le);
		});
		var ue = B(ce, 2), de = (e) => {
			var t = qx(), n = B(R(t), 2), r = R(n, !0);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i), P(t), H(() => {
				J(r, (U(a), W(() => U(a).resumeBlocker))), J(o, U(C));
			}), q(e, t);
		};
		Y(ue, (e) => {
			U(a), U(w), W(() => U(a)?.status === "attention" && U(a).resumeBlocker && !U(w)) && e(de);
		});
		var fe = B(ue, 2), pe = (e) => {
			var t = Zx(), n = R(t), r = R(n), i = R(r);
			P(r);
			var a = B(r), o = R(a);
			P(a), P(n);
			var s = B(n, 2), c = R(s), l = R(c), u = R(l), d = R(u, !0);
			P(u), Ke(), P(l);
			var p = B(l), m = R(p), h = R(m);
			P(m), Ke(), P(p);
			var g = B(p), _ = R(g), v = R(_, !0);
			P(_), Ke(), P(g), P(c);
			var y = B(c, 2);
			X(y, 5, () => (U(f), W(() => U(f).members || [])), (e) => e.requestId, (e, t) => {
				var n = Jx(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c);
				var u = B(c), d = R(u, !0);
				P(u), P(a);
				var f = B(a), p = R(f, !0);
				P(f), P(n), H((e) => {
					J(i, (U(t), W(() => U(t).ordinal))), J(s, (U(t), W(() => U(t).taskId))), J(l, `${U(t), W(() => U(t).profile) ?? ""} · cap ${e ?? ""} · ${U(t), W(() => U(t).trackId) ?? ""}/${U(t), W(() => U(t).workKind) ?? ""}`), J(d, (U(t), W(() => U(t).expectedDelta))), J(p, (U(t), W(() => U(t).status)));
				}, [() => (U(t), W(() => U(t).tokenCap?.toLocaleString()))]), q(e, n);
			}), P(y);
			var b = B(y, 2), x = (e) => {
				var t = Xx(), n = R(t), r = B(R(n)), i = R(r, !0);
				P(r), P(n);
				var a = B(n);
				X(a, 5, () => (U(f), W(() => U(f).deferred)), (e) => e.requestId, (e, t) => {
					var n = Yx(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a);
					P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).taskId))), J(o, `${e ?? ""} · ${U(t), W(() => U(t).decisionReason) ?? ""}`);
					}, [() => (U(t), W(() => U(t).decision.replaceAll("_", " ")))]), q(e, n);
				}), P(a), P(t), H(() => J(i, (U(f), W(() => U(f).deferred.length)))), q(e, t);
			};
			Y(b, (e) => {
				U(f), W(() => U(f).deferred?.length) && e(x);
			});
			var S = B(b, 2), C = R(S), w = R(C, !0);
			P(C);
			var T = B(C), E = R(T, !0);
			P(T), P(S), P(s), P(t), H((e, n, r) => {
				t.open = (U(f), W(() => U(f).status === "proposed")), J(i, `IMMUTABLE WAVE SCHEDULE · ${e ?? ""}…`), J(o, `${U(f), W(() => U(f).members?.length || 0) ?? ""} reserved · ${U(f), W(() => U(f).deferred?.length || 0) ?? ""} deferred`), J(d, n), J(h, `${U(f), W(() => U(f).proposal?.slots?.reserved || 0) ?? ""}/${U(f), W(() => U(f).proposal?.slots?.available || 0) ?? ""}`), J(v, r), J(w, (U(f), W(() => U(f).authority === "operator-confirmed-reservation" ? "OPERATOR-CONFIRMED RESERVATION" : U(f).authority === "operator-confirmed-execution" ? "BOUND SCHEDULE EXECUTION" : "NO DISPATCH AUTHORITY"))), J(E, (U(f), W(() => U(f).authority === "operator-confirmed-reservation" ? "Only the fixed members above may now be dispatched." : U(f).authority === "operator-confirmed-execution" ? "Member status and batch intake remain bound to the confirmed digest." : "Confirming the exact digest is required before any member can launch.")));
			}, [
				() => (U(f), W(() => U(f).digest?.slice(0, 18))),
				() => (U(f), W(() => U(f).proposal?.budget?.reservedTokens?.toLocaleString() || 0)),
				() => (U(f), W(() => U(f).status.toUpperCase()))
			]), q(e, t);
		};
		Y(fe, (e) => {
			U(v) && e(pe);
		});
		var me = B(fe, 2), he = R(me), ge = R(he), _e = R(ge, !0);
		P(ge);
		var ve = B(ge, 2), ye = R(ve, !0);
		P(ve), P(he);
		var be = B(he, 2), xe = R(be), Se = (e) => {
			var t = $x(), n = z(t), r = B(n, 2), i = (e) => {
				var t = Qx();
				H((e) => t.disabled = e, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.stop")), q(e, t);
			};
			Y(r, (e) => {
				U(o) && e(i);
			}), G("click", n, te), q(e, t);
		}, Ce = (e) => {
			var t = eS(), n = B(z(t), 2), r = R(n, !0);
			P(n), H(() => J(r, (U(b), W(() => U(b)?.epochLabel ? "Review Epoch 2 resource proposal →" : "Open strategy & resources →")))), G("click", n, ne), q(e, t);
		}, we = (e) => {
			var t = tS(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = Qx();
				H((e) => t.disabled = e, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.stop")), q(e, t);
			};
			Y(i, (e) => {
				U(o) && e(a);
			}), H((e) => {
				n.disabled = e, J(r, U(E) ? "Freezing…" : "Freeze wave schedule");
			}, [() => (U(E), W(() => !!U(E)))]), G("click", n, () => N("research.schedule.prepare")), q(e, t);
		}, Te = (e) => {
			var t = tS(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = Qx();
				H((e) => t.disabled = e, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.stop")), q(e, t);
			};
			Y(i, (e) => {
				U(o) && e(a);
			}), H((e) => {
				n.disabled = e, J(r, (U(E), U(f), W(() => U(E) ? "Confirming…" : `Confirm ${U(f).members?.length || 0}-lane schedule`)));
			}, [() => (U(E), W(() => !!U(E)))]), G("click", n, () => N("research.schedule.confirm", U(f).id, { scheduleDigest: U(f).digest })), q(e, t);
		}, Ee = (e) => {
			var t = rS(), n = z(t), r = (e) => {
				var t = nS(), n = R(t, !0);
				P(t), H((e) => {
					t.disabled = e, J(n, U(E) ? "Resuming…" : "Resume & dispatch wave");
				}, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.resume")), q(e, t);
			}, i = (e) => {
				var t = nS(), n = R(t, !0);
				P(t), H((e) => {
					t.disabled = e, J(n, (U(E), U(f), W(() => U(E) ? "Dispatching…" : `Dispatch ${U(f).members?.length || 0}-lane wave`)));
				}, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("research.schedule.dispatch", U(f).id, { scheduleDigest: U(f).digest })), q(e, t);
			};
			Y(n, (e) => {
				U(a), W(() => U(a)?.status === "paused" || U(a)?.status === "attention") ? e(r) : (U(a), W(() => U(a)?.status !== "running") && e(i, 1));
			});
			var s = B(n, 2), c = (e) => {
				var t = Qx();
				H((e) => t.disabled = e, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.stop")), q(e, t);
			};
			Y(s, (e) => {
				U(o) && e(c);
			}), q(e, t);
		}, De = (e) => {
			var t = iS(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i);
			var s = B(i, 2);
			H((e, t, c) => {
				n.disabled = e, J(r, U(l) ? "Pause automation" : "Pause now"), i.disabled = t, J(o, (U(a), W(() => U(a).pendingActionId ? "Halt after this step" : "Pause before next step"))), s.disabled = c;
			}, [
				() => (U(E), W(() => !!U(E))),
				() => (U(E), W(() => !!U(E))),
				() => (U(E), W(() => !!U(E)))
			]), G("click", n, () => N("loop.pause")), G("click", i, () => N("loop.halt-after-step")), G("click", s, () => N("loop.stop")), q(e, t);
		}, Oe = (e) => {
			var t = aS(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2);
			H((e, t) => {
				n.disabled = e, J(r, U(E) === "loop.resume" ? "Rechecking…" : "Recheck & resume"), i.disabled = t;
			}, [() => (U(E), W(() => !!U(E))), () => (U(E), W(() => !!U(E)))]), G("click", n, () => N("loop.resume")), G("click", i, () => N("loop.stop")), q(e, t);
		}, ke = (e) => {
			var t = aS(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2);
			H((e) => {
				J(r, U(w) ? "Review & approve DOC-A1" : "Resolve the required gate"), i.disabled = e;
			}, [() => (U(E), W(() => !!U(E)))]), G("click", n, te), G("click", i, () => N("loop.stop")), q(e, t);
		}, Ae = (e) => {
			var t = oS(), n = R(t, !0);
			P(t), H((e) => {
				t.disabled = e, J(n, (U(E), U(a), U(T), W(() => U(E) === "loop.start" ? "Starting…" : U(a)?.status === "completed" ? "Run another complete loop" : U(T).phase === "DECISION_REQUIRED" ? "Run one complete loop" : "Continue this loop automatically")));
			}, [() => (U(E), W(() => !!U(E)))]), G("click", t, () => N("loop.start")), q(e, t);
		};
		Y(xe, (e) => {
			U(h) ? e(Se) : U(y) ? e(Ce, 1) : U(_) ? e(we, 2) : (U(p), U(f), W(() => U(p) && U(f)?.status === "proposed") ? e(Te, 3) : (U(p), U(f), W(() => U(p) && U(f)?.status === "confirmed") ? e(Ee, 4) : (U(a), W(() => U(a)?.status === "running") ? e(De, 5) : (U(a), W(() => U(a)?.status === "paused" || U(a)?.status === "attention" && U(a).canResume) ? e(Oe, 6) : (U(a), W(() => U(a)?.status === "attention") ? e(ke, 7) : (U(T), W(() => U(T).canStartLoop) && e(Ae, 8)))))));
		}), P(be), P(me);
		var je = B(me, 2), Me = R(je), Ne = B(R(Me)), Pe = R(Ne);
		P(Ne), P(Me);
		var Fe = B(Me, 2), Ie = R(Fe), Le = R(Ie), Re = R(Le);
		P(Le);
		var ze = B(Le, 2), Be = R(ze, !0);
		P(ze);
		var Ve = B(ze, 2), He = R(Ve);
		P(Ve), P(Ie);
		var Ue = B(Ie, 2), We = (e) => {
			var t = sS(), n = R(t), r = R(n);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i);
			var s = B(i, 2), c = R(s);
			P(s), P(t), H((e, t, n) => {
				J(r, `END · ${e ?? ""}`), J(o, t), J(c, `${U(a), W(() => U(a).end.waveLabel || "No named wave") ?? ""} · ${n ?? ""}`);
			}, [
				() => (U(a), W(() => ee(U(a).end.capturedAt))),
				() => (U(a), W(() => j(U(a).end.phase))),
				() => (U(a), W(() => M(U(a).end)))
			]), q(e, t);
		}, Ge = (e) => {
			var t = cS(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, U(o) ? "Captured when this run stops" : "Not captured")), q(e, t);
		};
		Y(Ue, (e) => {
			U(a), W(() => U(a)?.end?.capturedAt) ? e(We) : e(Ge, -1);
		}), P(Fe);
		var qe = B(Fe, 2), Je = (e) => {
			var t = uS();
			X(t, 5, () => U(s), (e) => e.actionId, (e, t) => {
				var n = lS(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e) => {
					Z(n, 1, Fa((U(t), W(() => U(t).status)))), J(i, (U(t), W(() => U(t).index))), J(s, (U(t), W(() => U(t).label))), J(l, `${U(t), W(() => U(t).status) ?? ""}${U(t), W(() => U(t).attemptCount && U(t).attemptCount > 1 ? ` · attempt ${U(t).attemptCount}` : "") ?? ""}${e ?? ""}`);
				}, [() => (U(t), W(() => U(t).completedAt ? ` · ${ee(U(t).completedAt)}` : ""))]), q(e, n);
			}), P(t), q(e, t);
		};
		Y(qe, (e) => {
			U(s), W(() => U(s).length) && e(Je);
		}), P(je);
		var Ye = B(je, 2), Xe = (e) => {
			var t = dS(), n = R(t), r = R(n, !0);
			P(n), P(t), H(() => {
				Z(t, 1, `gate-feedback loop-feedback ${U(O) ?? ""}`), J(r, U(D));
			}), q(e, t);
		};
		Y(Ye, (e) => {
			U(D) && e(Xe);
		}), P(t), H((e, n, r, i, m) => {
			Z(t, 1, `loop-control ${U(S) ?? ""}`), J(k, (U(d), U(y), U(h), U(_), U(p), U(f), U(w), U(l), U(u), U(o), U(c), U(a), W(() => U(d) ? "Verify the launch outcome before retrying" : U(y) ? "Recenter resources before starting the loop" : U(h) ? "Resolve custody before scheduling research" : U(_) ? "Freeze the resource-bounded wave" : U(p) && U(f)?.status === "proposed" ? `Confirm ${U(f).members?.length || 0} scheduled member${U(f).members?.length === 1 ? "" : "s"}` : U(p) && U(f)?.status === "confirmed" ? "Dispatch the confirmed wave" : U(w) ? "Paused for one operator approval" : U(l) ? `${U(u).length} bounded lane${U(u).length === 1 ? " is" : "s are"} working` : U(o) ? U(c)?.label || (U(a)?.status === "attention" ? "Waiting at a checked boundary" : "Watching for the next safe step") : U(a)?.status === "completed" ? "A full bounded loop is captured" : "Continue to the next fresh decision"))), J(re, e), Z(ie, 1, `loop-status ${U(S) ?? ""}`), J(ae, U(x)), J(_e, (U(p), U(a), U(o), W(() => U(p) ? "Current position" : U(a)?.haltAfterStep ? "Halt armed" : U(o) ? "Current position" : "Scope"))), J(ye, (U(y), U(h), U(_), U(p), U(f), U(w), U(l), U(a), U(c), W(() => U(y) ? "Resource gate → unlock autopilot" : U(h) ? "Custody dependency → bounded successor → resume" : U(_) ? "Checked plan → freeze schedule" : U(p) && U(f)?.status === "proposed" ? "Resource frontier frozen → operator confirmation" : U(p) && U(f)?.status === "confirmed" ? "Operator confirmed → bounded wave dispatch" : U(w) ? "DOC-A1 preflight passed · your approval is next" : U(l) ? `${U(l).taskId} · ${U(l).status}` : U(a)?.haltAfterStep ? "Will pause when this step settles" : U(c) ? `${U(c).index}. ${U(c).label} · ${U(c).status}` : "One decision-to-decision cycle"))), J(Pe, `${n ?? ""}/${U(s), W(() => U(s).length) ?? ""} settled`), J(Re, `START · ${r ?? ""}`), J(Be, i), J(He, `${U(a), W(() => U(a)?.start?.waveLabel || "No named wave") ?? ""} · ${m ?? ""}`);
		}, [
			() => (U(d), U(y), U(T), U(h), U(m), U(_), U(g), U(p), U(f), U(w), U(l), U(u), W(() => U(d) ? "A launch entered the adapter without a confirmed receipt. Work may exist; the retained attempt must be reconciled before retrying." : U(y) ? U(T)?.loopStart?.blocker : U(h) ? `${U(m).length} required custody contract${U(m).length === 1 ? " remains" : "s remain"}. Wave scheduling is locked until the focused dependency above is reshaped or settled.` : U(_) ? `${U(g) ? "The previous schedule is closed. " : ""}Freeze the current dependency-safe frontier under the slot and token policy before operator review.` : U(p) && U(f)?.status === "proposed" ? "Review the exact tasks, contracts, resource caps, and deferred lanes below. Confirmation reserves this digest but launches nothing." : U(p) && U(f)?.status === "confirmed" ? "The operator gate is captured. Dispatch will launch only these immutable members and will preserve a batch evidence boundary." : U(w) ? "The checked staging evidence is ready; approve DOC-A1 below, then Sol will replan automatically." : U(l) ? `${U(u).map((e) => e.taskId).join(", ")}. Autopilot will wait for the whole wave, perform batch intake, and continue the loop.` : "decision → checked plan → resource-bounded wave → custody → batch synthesis → next decision. Every action and receipt stays inspectable.")),
			() => (U(s), W(() => U(s).filter((e) => e.status === "completed").length)),
			() => (U(a), W(() => ee(U(a)?.start?.capturedAt))),
			() => (U(a), W(() => j(U(a)?.start?.phase))),
			() => (U(a), W(() => M(U(a)?.start)))
		]), q(e, t);
	};
	Y(ie, (e) => {
		U(T) && e(ae);
	}), q(e, re), xt(), i();
}
//#endregion
//#region src/ui/HeaderAutopilot.svelte
$i(["click"]), Go();
var mS = /* @__PURE__ */ K("<div><span><small>AUTOPILOT</small><strong> </strong></span> <button type=\"button\"><i aria-hidden=\"true\"></i> </button></div>");
function hS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I("");
	function h() {
		document.querySelector("#next-action")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	async function g() {
		if (!(!U(f) || U(p) || !n().access?.canMutate)) {
			if (!U(c)) {
				h();
				return;
			}
			L(p, !0), L(m, "");
			try {
				await as({
					projectId: U(f).id,
					type: U(c),
					scope: "header-autopilot",
					pollLimit: 80
				});
			} catch (e) {
				L(m, e instanceof Error ? e.message : String(e));
			} finally {
				L(p, !1);
			}
		}
	}
	V(() => n(), () => {
		L(f, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(f), () => {
		L(a, U(f)?.loop || null);
	}), V(() => U(a), () => {
		L(o, U(a)?.status === "running");
	}), V(() => U(a), () => {
		L(s, ["paused", "attention"].includes(U(a)?.status || "") && !!(U(a)?.canResume || U(a)?.status === "paused"));
	}), V(() => (U(o), U(s), U(f)), () => {
		L(c, U(o) ? "loop.pause" : U(s) ? "loop.resume" : U(f)?.canStartLoop ? "loop.start" : "");
	}), V(() => (U(o), U(s), U(f)), () => {
		L(l, U(o) ? "ON" : U(s) ? "PAUSED" : U(f)?.canStartLoop ? "READY" : "OFF");
	}), V(() => (U(p), U(o), U(s), U(f)), () => {
		L(u, U(p) ? "Working…" : U(o) ? "Pause" : U(s) ? "Resume" : U(f)?.canStartLoop ? "Start" : "View next step");
	}), V(() => (U(m), U(c), U(u), U(f)), () => {
		L(d, U(m) || (U(c) ? `${U(u)} one-loop autopilot` : U(f)?.loopStart?.blocker || "Open the current campaign gate"));
	}), Br(), xo();
	var _ = ua(), v = z(_), y = (e) => {
		var t = mS();
		let r;
		var i = R(t), a = B(R(i)), f = R(a, !0);
		P(a), P(i);
		var m = B(i, 2), h = B(R(m), 1, !0);
		P(m), P(t), H(() => {
			r = Z(t, 1, "header-autopilot", null, r, {
				active: U(o),
				paused: U(s),
				blocked: !U(c)
			}), J(f, U(l)), Q(m, "aria-label", `${U(u)} one-loop autopilot`), Q(m, "aria-pressed", U(o)), m.disabled = (U(p), n(), W(() => U(p) || n().access?.canMutate === !1)), Q(m, "title", U(d)), J(h, U(u));
		}), G("click", m, g), q(e, t);
	};
	Y(v, (e) => {
		U(f) && e(y);
	}), q(e, _), xt(), i();
}
//#endregion
//#region src/ui/CampaignProcessTracker.svelte
$i(["click"]), Go();
var gS = /* @__PURE__ */ K("<li><span></span> </li>"), _S = /* @__PURE__ */ K("<p class=\"campaign-budget-note\"> </p>"), vS = /* @__PURE__ */ K("<section class=\"campaign-summary\" id=\"process-tracker\" aria-label=\"Campaign progress\"><div class=\"campaign-summary-heading\"><div><p class=\"eyebrow\"> </p><h2> </h2></div><span class=\"campaign-mode\"> </span></div> <ol aria-label=\"Campaign stages\"></ol> <!></section>");
function yS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = [
		"Plan",
		"Launch",
		"Run",
		"Review",
		"Decide"
	], u = {
		PLANNING: 0,
		RESEARCH_REVIEW: 0,
		REVISING: 0,
		NEXT_WAVE_READY: 0,
		RESEARCH_READY: 1,
		RESEARCH_RUNNING: 2,
		RUNNING: 2,
		RESEARCH_INTAKE: 3,
		RECONCILING: 3,
		SYNTHESIS_READY: 3,
		SYNTHESIZING: 3,
		DECISION_REQUIRED: 4,
		BLOCKED: 4
	};
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject));
	}), V(() => U(a), () => {
		L(o, hc(U(a)));
	}), V(() => (U(o), U(a)), () => {
		L(s, gc(U(o)) || U(o)?.status === "evidence_ready" ? 3 : u[U(a)?.phase || ""] ?? 0);
	}), V(() => U(a), () => {
		L(c, U(a)?.resources?.ledger);
	}), Br(), xo();
	var d = ua(), f = z(d), p = (e) => {
		var t = vS(), n = R(t), r = R(n), i = R(r), o = R(i);
		P(i);
		var u = B(i), d = R(u, !0);
		P(u), P(r);
		var f = B(r), p = R(f, !0);
		P(f), P(n);
		var m = B(n, 2);
		X(m, 5, () => l, ya, (e, t, n) => {
			var r = gS();
			let i;
			var a = R(r);
			a.textContent = n + 1;
			var o = B(a, 1, !0);
			P(r), H(() => {
				Q(r, "aria-current", n === U(s) ? "step" : void 0), i = Z(r, 1, "", null, i, {
					current: n === U(s),
					passed: n < U(s)
				}), J(o, U(t));
			}), q(e, r);
		}), P(m);
		var h = B(m, 2), g = (e) => {
			var t = _S(), n = R(t);
			P(t), H((e, t) => J(n, `New research is paused: ${e ?? ""} recorded tokens against the ${t ?? ""} epoch budget. Existing results can still be reviewed.`), [() => (U(c), W(() => Number(U(c).knownTokens).toLocaleString())), () => (U(c), W(() => Number(U(c).epochTokenBudget).toLocaleString()))]), q(e, t);
		};
		Y(h, (e) => {
			U(c), W(() => U(c) && U(c).schedulableTokens === 0) && e(g);
		}), P(t), H(() => {
			J(o, `${U(a), W(() => U(a).id) ?? ""} · CAMPAIGN`), J(d, (U(a), W(() => U(a).strategy?.epoch?.label || U(a).role))), J(p, (U(a), W(() => U(a).loop?.status === "running" ? "Automation on" : "Guided mode")));
		}), q(e, t);
	};
	Y(f, (e) => {
		U(a) && e(p);
	}), q(e, d), xt(), i();
}
//#endregion
//#region src/ui/OperatorGate.svelte
Go();
var bS = /* @__PURE__ */ K("<div class=\"gate-feedback error\" role=\"alert\"><span> </span></div>"), xS = /* @__PURE__ */ K("<div class=\"operator-gate-callout\"><strong>The first action is read-only</strong> <p>It resolves the exact source commit, confirms both approved SHA-256 hashes, checks that main is clean, and previews the lineage merge. It changes no Git or campaign authority.</p> <button class=\"primary-button\"> </button></div> <!>", 1), SS = /* @__PURE__ */ K("<div class=\"operator-gate-preview\"><div class=\"operator-gate-ready\"><div><span>READINESS CHECK PASSED</span> <strong>Exact DOC-A1 transition is ready</strong> <small>3 local custody commits · no push · no worker dispatch</small></div> <label class=\"operator-gate-confirm\"><input type=\"checkbox\"/><span>Approve Proposal A’s exact bytes as DOC-A1.</span></label> <button class=\"primary-button operator-gate-approve\"> </button></div> <details class=\"operator-gate-technical\"><summary>Inspect commits, paths, hashes, and effects <strong>Preflight receipt</strong></summary> <div class=\"operator-gate-summary\"><div><span>FROM FROZEN STAGING HEAD</span><strong> </strong><small> </small></div> <div><span>INTO CLEAN MAIN</span><strong> </strong><small> </small></div></div> <ul><li><code>CONTRACT.md</code><span> </span></li> <li><code>output/preimage-spec.json</code><span> </span></li> <li><code>evidence-receipt.json</code><span>new DKC successor receipt</span></li></ul> <div class=\"operator-gate-effects\"><strong>BOUNDARY EFFECTS</strong> <p>Creates one local lineage-intake merge, one exact document commit, and one successor-receipt commit. It does not push, dispatch a worker, authorize SAT or Mac work, or promote a mathematical claim.</p></div> <button class=\"outline-button compact\">Recheck readiness</button></details></div>"), CS = /* @__PURE__ */ K("<div role=\"status\"><span> </span></div>"), wS = /* @__PURE__ */ K("<section class=\"operator-gate\" id=\"operator-gate\" aria-live=\"polite\"><div class=\"operator-gate-heading\"><div><p class=\"eyebrow\">REQUIRED OPERATOR TRANSITION</p> <h2>Adopt Proposal A as DOC-A1</h2> <p>This is the missing bridge between the checked staging evidence and the next runnable cold-replay lane.</p></div> <span class=\"operator-gate-status\">HUMAN GATE</span></div> <div class=\"operator-gate-path\" aria-label=\"Operator transition progress\"><span>✓ Verified</span><i>→</i><span class=\"current\">Your approval</span><i>→</i><span>Sol replans</span></div> <!> <!></section>");
function TS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I(""), h = /* @__PURE__ */ I("pending");
	function g(e = "") {
		return e ? `${e.slice(0, 10)}…${e.slice(-6)}` : "not recorded";
	}
	async function _(e, t = {}) {
		if (!U(d) || U(f)) throw Error("Another gate action is still settling");
		L(f, e), L(h, "pending"), L(m, e.endsWith("prepare") ? "Checking the exact lineage, byte hashes, clean worktree, and merge preview…" : "Applying the explicitly approved local authority transition…");
		try {
			let n = await as({
				projectId: U(d).id,
				type: e,
				args: t,
				scope: "operator-gate"
			});
			return L(h, "success"), L(m, e.endsWith("prepare") ? "Preflight passed. Review the frozen source, target paths, and exact hashes below." : "DOC-A1 landed locally with a successor receipt. Autopilot is asking Sol to bind the cold replay to the new head."), n.action;
		} catch (e) {
			throw L(h, "error"), L(m, e instanceof Error ? e.message : String(e)), e;
		} finally {
			L(f, "");
		}
	}
	async function v() {
		await _("campaign.operator-transition.prepare").catch(() => void 0);
	}
	async function y() {
		!U(l) || !U(p) || await _("campaign.operator-transition.execute", {
			confirmation: "APPROVE DOC-A1",
			previewActionId: U(l).id,
			previewDigest: U(l).result?.previewDigest
		}).catch(() => void 0);
	}
	V(() => n(), () => {
		L(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(d), () => {
		L(a, U(d)?.researchPlan);
	}), V(() => U(a), () => {
		L(o, U(a)?.response?.lanes?.find((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), V(() => (U(d), U(a), U(o)), () => {
		L(s, U(d)?.phase === "RESEARCH_REVIEW" && U(a)?.status === "drafted" && U(a)?.response?.decision === "BLOCKED" && !!U(o));
	}), V(() => U(d), () => {
		L(c, U(d)?.actions || []);
	}), V(() => U(c), () => {
		L(l, U(c).find((e) => e.type === "campaign.operator-transition.prepare" && e.status === "completed") || null);
	}), V(() => U(c), () => {
		L(u, U(c).find((e) => e.type === "campaign.operator-transition.prepare") || null);
	}), Br(), xo();
	var b = ua(), x = z(b), S = (e) => {
		var t = wS(), n = B(R(t), 2), r = R(n);
		let i;
		Ke(4), P(n);
		var a = B(n, 2), o = (e) => {
			var t = xS(), n = z(t), r = B(R(n), 4), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = (e) => {
				var t = bS(), n = R(t), r = R(n, !0);
				P(n), P(t), H(() => J(r, (U(u), W(() => U(u).error)))), q(e, t);
			};
			Y(a, (e) => {
				U(u), U(m), W(() => U(u)?.status === "failed" && !U(m)) && e(o);
			}), H((e) => {
				r.disabled = e, J(i, U(f) ? "Checking readiness…" : "Check transition readiness");
			}, [() => (U(f), W(() => !!U(f)))]), G("click", r, v), q(e, t);
		}, s = (e) => {
			var t = SS(), n = R(t), r = B(R(n), 2), i = R(r);
			no(i), Ke(), P(r);
			var a = B(r, 2), o = R(a, !0);
			P(a), P(n);
			var s = B(n, 2), c = B(R(s), 2), u = R(c), d = B(R(u)), m = R(d, !0);
			P(d);
			var h = B(d), _ = R(h, !0);
			P(h), P(u);
			var b = B(u, 2), x = B(R(b)), S = R(x, !0);
			P(x);
			var C = B(x), w = R(C);
			P(C), P(b), P(c);
			var T = B(c, 2), E = R(T), D = B(R(E)), O = R(D, !0);
			P(D), P(E);
			var k = B(E, 2), A = B(R(k)), j = R(A, !0);
			P(A), P(k), Ke(2), P(T);
			var ee = B(T, 4);
			P(s), P(t), H((e, t, n, r, i, s) => {
				a.disabled = e, J(o, t), J(m, n), J(_, (U(l), W(() => U(l).result?.sourceBranch))), J(S, r), J(w, `Conflict-free preview · ${i ?? ""}`), J(O, (U(l), W(() => U(l).result?.hashes?.contract))), J(j, (U(l), W(() => U(l).result?.hashes?.preimage))), ee.disabled = s;
			}, [
				() => (U(p), U(f), W(() => !U(p) || !!U(f))),
				() => (U(f), W(() => U(f).endsWith("execute") ? "Applying transition…" : "Approve DOC-A1 & continue")),
				() => (U(l), W(() => g(U(l).result?.sourceHead))),
				() => (U(l), W(() => g(U(l).result?.baseHead))),
				() => (U(l), W(() => g(U(l).result?.mergeTree))),
				() => (U(f), W(() => !!U(f)))
			]), fo(i, () => U(p), (e) => L(p, e)), G("click", a, y), G("click", ee, v), q(e, t);
		};
		Y(a, (e) => {
			U(l) ? e(s, -1) : e(o);
		});
		var c = B(a, 2), d = (e) => {
			var t = CS(), n = R(t), r = R(n, !0);
			P(n), P(t), H(() => {
				Z(t, 1, `gate-feedback ${U(h) ?? ""}`), J(r, U(m));
			}), q(e, t);
		};
		Y(c, (e) => {
			U(m) && e(d);
		}), P(t), H((e) => i = Z(r, 1, "", null, i, e), [() => ({ done: !!U(l) })]), q(e, t);
	};
	Y(x, (e) => {
		U(s) && e(S);
	}), q(e, b), xt(), i();
}
//#endregion
//#region src/ui/ActiveLaneStrip.svelte
$i(["click"]), Go();
var ES = /* @__PURE__ */ K("<small class=\"active-lane-loading\">Loading live detail…</small>"), DS = /* @__PURE__ */ K("<small class=\"active-lane-error\"> </small>"), OS = /* @__PURE__ */ K("<li><b> </b><span> </span></li>"), kS = /* @__PURE__ */ K("<ul></ul>"), AS = /* @__PURE__ */ K("<details class=\"active-lane-mini\"><summary><span class=\"active-lane-state\"><i aria-hidden=\"true\"></i><b> </b></span> <span class=\"active-lane-title\"><strong> </strong><small> </small></span> <span class=\"active-lane-glance\"><b> </b><small> </small></span></summary> <div class=\"active-lane-detail\"><p> </p> <!> <!> <div class=\"active-lane-facts\"><span><small>PROFILE</small><strong> </strong></span> <span><small>USAGE</small><strong> </strong></span> <span><small>JOB</small><strong> </strong></span></div> <!> <button class=\"outline-button compact\" type=\"button\">Open full lane inspector</button></div></details>"), jS = /* @__PURE__ */ K("<section class=\"active-lane-strip\" aria-label=\"Currently running campaign lanes\"><header><span><i aria-hidden=\"true\"></i><small>LIVE WAVE</small><strong> </strong></span> <b>Expand a lane to inspect</b></header> <div class=\"active-lane-list\"></div></section>");
function MS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I({}), s = /* @__PURE__ */ I({}), c = /* @__PURE__ */ I({});
	function l(e, t = 180) {
		let n = String(e || "").trim().replace(/\s+/g, " ");
		return n.length <= t ? n : `${n.slice(0, t).replace(/\s+\S*$/, "")}…`;
	}
	function u(e = "") {
		let t = Date.now() - new Date(e).valueOf();
		if (!Number.isFinite(t)) return "just now";
		let [n, r] = t < 6e4 ? ["s", 1e3] : t < 36e5 ? ["m", 6e4] : ["h", 36e5];
		return `${Math.max(1, Math.round(t / r))}${n} ago`;
	}
	function d(e) {
		return e == null ? "unmeasured" : e >= 1e6 ? `${(e / 1e6).toFixed(1)}m tokens` : e >= 1e3 ? `${Math.round(e / 1e3)}k tokens` : `${e} tokens`;
	}
	async function f(e) {
		if (!(U(o)[e] || U(s)[e])) {
			L(s, {
				...U(s),
				[e]: !0
			}), L(c, {
				...U(c),
				[e]: ""
			});
			try {
				let t = await fetch(`/api/lane?id=${encodeURIComponent(e)}`, { cache: "no-store" }), n = await t.json();
				if (!t.ok) throw Error(n.error || `Could not load lane detail: ${t.status}`);
				L(o, {
					...U(o),
					[e]: n
				});
			} catch (t) {
				L(c, {
					...U(c),
					[e]: t instanceof Error ? t.message : String(t)
				});
			} finally {
				L(s, {
					...U(s),
					[e]: !1
				});
			}
		}
	}
	function p(e) {
		let t = document.querySelector("#evidence-workspace");
		t && (t.open = !0), requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("lane-watch:open-lane", { detail: { id: e } })));
	}
	V(() => n(), () => {
		L(a, (n().observer?.lanes || []).filter((e) => e.project === n().selectedProject && e.lifecycle === "active" && ["working", "idle"].includes(e.severity)).sort((e, t) => new Date(t.updatedAt || t.launchedAt).valueOf() - new Date(e.updatedAt || e.launchedAt).valueOf()));
	}), Br(), xo();
	var m = ua(), h = z(m), g = (e) => {
		var t = jS(), n = R(t), r = R(n), i = B(R(r), 2), m = R(i);
		P(i), P(r), Ke(2), P(n);
		var h = B(n, 2);
		X(h, 5, () => U(a), (e) => e.id, (e, t) => {
			let n = /* @__PURE__ */ Cn(() => (U(o), U(t), W(() => U(o)[U(t).id] || U(t))));
			var r = AS(), i = R(r), a = R(i), m = B(R(a)), h = R(m, !0);
			P(m), P(a);
			var g = B(a, 2), _ = R(g), v = R(_, !0);
			P(_);
			var y = B(_), b = R(y);
			P(y), P(g);
			var x = B(g, 2), S = R(x), C = R(S, !0);
			P(S);
			var w = B(S), T = R(w, !0);
			P(w), P(x), P(i);
			var E = B(i, 2), D = R(E), O = R(D, !0);
			P(D);
			var k = B(D, 2), A = (e) => {
				q(e, ES());
			};
			Y(k, (e) => {
				U(s), U(t), W(() => U(s)[U(t).id]) && e(A);
			});
			var j = B(k, 2), ee = (e) => {
				var n = DS(), r = R(n, !0);
				P(n), H(() => J(r, (U(c), U(t), W(() => U(c)[U(t).id])))), q(e, n);
			};
			Y(j, (e) => {
				U(c), U(t), W(() => U(c)[U(t).id]) && e(ee);
			});
			var M = B(j, 2), N = R(M), te = B(R(N)), ne = R(te, !0);
			P(te), P(N);
			var re = B(N, 2), ie = B(R(re)), ae = R(ie, !0);
			P(ie), P(re);
			var oe = B(re, 2), se = B(R(oe)), ce = R(se, !0);
			P(se), P(oe), P(M);
			var le = B(M, 2), ue = (e) => {
				var t = kS();
				X(t, 5, () => (Si(U(n)), W(() => U(n).activities.slice(0, 3))), (e) => e.id, (e, t) => {
					var n = OS(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).kind))), J(o, e);
					}, [() => (U(t), W(() => l(U(t).label, 140)))]), q(e, n);
				}), P(t), q(e, t);
			};
			Y(le, (e) => {
				Si(U(n)), W(() => U(n).activities?.length) && e(ue);
			});
			var de = B(le, 2);
			P(E), P(r), H((e, r, i) => {
				J(h, (U(t), W(() => U(t).status || U(t).severity))), J(v, (U(t), W(() => U(t).task))), J(b, `${U(t), W(() => U(t).lane) ?? ""} · ${U(t), W(() => U(t).model || "worker") ?? ""}`), J(C, (U(t), W(() => U(t).inFlight + U(t).queued ? `${U(t).inFlight + U(t).queued} active` : U(t).tempo || "observing"))), J(T, e), J(O, r), J(ne, (Si(U(n)), W(() => U(n).topology?.profile || U(n).effort || "bounded worker"))), J(ae, i), J(ce, (Si(U(n)), W(() => U(n).jobId || "pending")));
			}, [
				() => (U(t), W(() => u(U(t).updatedAt || U(t).launchedAt))),
				() => (U(o), U(t), W(() => l(U(o)[U(t).id]?.detail || U(t).detail || "The worker has not reported a current activity note yet.", 320))),
				() => (Si(U(n)), W(() => d(U(n).tokens)))
			]), Qi("toggle", r, (e) => e.currentTarget.open && f(U(t).id)), G("click", de, () => p(U(t).id)), q(e, r);
		}), P(h), P(t), H(() => J(m, `${U(a), W(() => U(a).length) ?? ""} lane${U(a), W(() => U(a).length === 1 ? "" : "s") ?? ""} running`)), q(e, t);
	};
	Y(h, (e) => {
		U(a), W(() => U(a).length) && e(g);
	}), q(e, m), xt(), i();
}
//#endregion
//#region src/ui/StrategyOverview.svelte
$i(["click"]), Go();
var NS = /* @__PURE__ */ K("<article><div><strong> </strong><span> </span></div> <div class=\"track-meter\"><i></i><b></b></div> <small> </small></article>"), PS = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small><p> </p></div></li>"), FS = /* @__PURE__ */ K("<article><strong> </strong><p> </p><small> </small></article>"), IS = /* @__PURE__ */ K("<div class=\"drift-list\"></div>"), LS = /* @__PURE__ */ K("<p class=\"strategy-empty\">No active drift signal crosses the charter’s advisory thresholds.</p>"), RS = /* @__PURE__ */ K("<section id=\"campaign-strategy\" aria-label=\"Campaign strategy and drift\" aria-live=\"polite\"><div class=\"strategy-heading\"><div><p> </p> <h2> </h2> <span> </span></div> <div class=\"strategy-status\"><strong> </strong><span>shadow mode · advisory</span></div></div> <div class=\"strategy-vitals\"><div><span>Frontier motion</span><strong> </strong><small>recorded advances</small></div> <div><span>Campaign spend</span><strong> </strong><small> </small></div> <div><span>Research spend</span><strong> </strong><small> </small></div> <div><span>Research support share</span><strong> </strong><small> </small></div> <div><span>Frontier ledger</span><strong> </strong><small> </small></div></div> <div class=\"strategy-tracks\" aria-label=\"Strategic track allocation\"></div> <details class=\"strategy-details\"><summary><span>Inspect timescales, drift evidence, and custody separation</span><strong> </strong></summary> <div class=\"strategy-detail-grid\"><section><h3>Nested control loops</h3> <ol class=\"strategy-layers\"></ol></section> <section><h3>Drift evidence</h3> <!></section></div> <p class=\"strategy-shadow-note\"><strong>Shadow mode:</strong> these measurements are supplied to Sol synthesis and lane planning, but they do not yet approve, reject, or dispatch work.</p></details></section>");
function zS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null);
	function c(e) {
		return `${Math.round(Number(e || 0) * 100)}%`;
	}
	function l(e) {
		let t = Number(e || 0);
		return t >= 1e6 ? `${(t / 1e6).toFixed(1)}m` : t >= 1e3 ? `${Math.round(t / 1e3)}k` : t.toLocaleString();
	}
	function u(e) {
		let t = Date.parse(String(e || ""));
		if (!Number.isFinite(t)) return "not tracked";
		let n = Math.max(0, (Date.now() - t) / 36e5);
		return n < 2 ? "just updated" : n < 48 ? `${Math.round(n)}h old` : `${Math.round(n / 24)}d old`;
	}
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(a), () => {
		L(o, U(a)?.strategy || null);
	}), V(() => U(o), () => {
		L(s, U(o)?.drift?.signals?.[0] || null);
	}), Br(), xo();
	var d = ua(), f = z(d), p = (e) => {
		var t = RS(), n = R(t), r = R(n), i = R(r), d = R(i);
		P(i);
		var f = B(i, 2), p = R(f, !0);
		P(f);
		var m = B(f, 2), h = R(m, !0);
		P(m), P(r);
		var g = B(r, 2), _ = R(g), v = R(_, !0);
		P(_), Ke(), P(g), P(n);
		var y = B(n, 2), b = R(y), x = B(R(b)), S = R(x, !0);
		P(x), Ke(), P(b);
		var C = B(b, 2), w = B(R(C)), T = R(w, !0);
		P(w);
		var E = B(w), D = R(E);
		P(E), P(C);
		var O = B(C, 2), k = B(R(O)), A = R(k, !0);
		P(k);
		var j = B(k), ee = R(j);
		P(j), P(O);
		var M = B(O, 2);
		let N;
		var te = B(R(M)), ne = R(te, !0);
		P(te);
		var re = B(te), ie = R(re);
		P(re), P(M);
		var ae = B(M, 2), oe = B(R(ae)), se = R(oe, !0);
		P(oe);
		var ce = B(oe), le = R(ce, !0);
		P(ce), P(ae), P(y);
		var ue = B(y, 2);
		X(ue, 5, () => (U(o), W(() => U(o).tracks)), (e) => e.id, (e, t) => {
			var n = NS(), r = R(n), i = R(r), a = R(i, !0);
			P(i);
			var o = B(i), s = R(o);
			P(o), P(r);
			var u = B(r, 2), d = R(u), f = B(d);
			P(u);
			var p = B(u, 2), m = R(p);
			P(p), P(n), H((e, r, i, o, c) => {
				Ha(n, (U(t), W(() => `--track:${U(t).color}`))), J(a, (U(t), W(() => U(t).label))), J(s, `${e ?? ""} actual / ${r ?? ""} target`), Ha(d, i), Ha(f, o), J(m, `${U(t), W(() => U(t).runs) ?? ""} runs · ${c ?? ""} tokens${U(t), W(() => U(t).maintenanceRuns ? ` · ${U(t).maintenanceRuns} support` : "") ?? ""}`);
			}, [
				() => (U(t), W(() => c(U(t).actualShare))),
				() => (U(t), W(() => c(U(t).targetShare))),
				() => (U(t), W(() => `width:${Math.min(100, Number(U(t).actualShare || 0) * 100)}%`)),
				() => (U(t), W(() => `left:${Math.min(100, Number(U(t).targetShare || 0) * 100)}%`)),
				() => (U(t), W(() => l(U(t).knownTokens)))
			]), q(e, n);
		}), P(ue);
		var de = B(ue, 2), fe = R(de), pe = B(R(fe)), me = R(pe);
		P(pe), P(fe);
		var he = B(fe, 2), ge = R(he), _e = B(R(ge), 2);
		X(_e, 7, () => (U(o), W(() => U(o).layers)), (e) => e.id, (e, t, n) => {
			var r = PS();
			let i;
			var a = R(r), o = R(a, !0);
			P(a);
			var s = B(a), c = R(s), l = R(c, !0);
			P(c);
			var u = B(c), d = R(u);
			P(u);
			var f = B(u), p = R(f, !0);
			P(f), P(s), P(r), H(() => {
				i = Z(r, 1, "", null, i, { planned: U(t).status === "planned" || U(t).status === "shadow" }), J(o, U(n) + 1), J(l, (U(t), W(() => U(t).label))), J(d, `${U(t), W(() => U(t).cadence) ?? ""} · ${U(t), W(() => U(t).owner) ?? ""}${U(t), W(() => U(t).status ? ` · ${U(t).status}` : "") ?? ""}`), J(p, (U(t), W(() => U(t).purpose)));
			}), q(e, r);
		}), P(_e), P(ge);
		var ve = B(ge, 2), ye = B(R(ve), 2), be = (e) => {
			var t = IS();
			X(t, 5, () => (U(o), W(() => U(o).drift.signals)), (e) => e.id, (e, t) => {
				var n = FS(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H(() => {
					Z(n, 1, `severity-${U(t), W(() => U(t).severity) ?? ""}`), J(i, (U(t), W(() => U(t).label))), J(o, (U(t), W(() => U(t).evidence))), J(c, (U(t), W(() => U(t).action)));
				}), q(e, n);
			}), P(t), q(e, t);
		}, xe = (e) => {
			q(e, LS());
		};
		Y(ye, (e) => {
			U(o), W(() => U(o).drift.signals.length) ? e(be) : e(xe, -1);
		}), P(ve), P(he), Ke(2), P(de), P(t), H((e, n, r, i, c, l) => {
			Z(t, 1, `strategy-overview status-${U(o), W(() => U(o).drift.status) ?? ""}`), J(d, `CAMPAIGN STRATEGY · ${U(o), W(() => U(o).epoch.label) ?? ""}`), J(p, (U(s), U(o), W(() => U(s)?.label || (U(o).cost.runs ? "Research allocation is within advisory thresholds" : "No research results recorded in this epoch")))), J(h, (U(s), U(o), W(() => U(s)?.detail || U(o).charter.thesis))), J(v, (U(o), W(() => U(o).drift.status === "attention" ? "RECENTER" : U(o).drift.status === "watch" ? "WATCH" : U(o).cost.runs ? "RESEARCH MIX" : "NO RESEARCH DATA"))), J(S, (U(o), W(() => U(o).progress.advancedDeltaCount || 0))), J(T, e), J(D, `all layers · ${U(a), W(() => U(a)?.resources?.ledger?.unreported ?? "unknown") ?? ""} unreported`), J(A, n), J(ee, `research only · ${U(o), W(() => U(o).cost.unreportedRuns) ?? ""} unreported`), N = Z(M, 1, "", null, N, r), J(ne, i), J(ie, `charter ceiling ${c ?? ""}`), J(se, l), J(le, (U(o), W(() => U(o).progress.frontierPath ? "durable source detected" : "source missing"))), J(me, `${U(o), W(() => U(o).drift.signals.length) ?? ""} signal${U(o), W(() => U(o).drift.signals.length === 1 ? "" : "s") ?? ""}`);
		}, [
			() => (U(a), W(() => l(U(a)?.resources?.ledger?.knownTokens))),
			() => (U(o), W(() => l(U(o).cost.knownTokens))),
			() => ({ over: Number(U(o).cost.maintenanceShare) > Number(U(o).charter.maintenancePolicy?.rollingShareLimit || .15) }),
			() => (U(o), W(() => c(U(o).cost.maintenanceShare))),
			() => (U(o), W(() => c(U(o).charter.maintenancePolicy?.rollingShareLimit || .15))),
			() => (U(o), W(() => u(U(o).progress.frontierUpdatedAt)))
		]), q(e, t);
	};
	Y(f, (e) => {
		U(o) && e(p);
	}), q(e, d), xt(), i();
}
//#endregion
//#region src/ui/program-compass.ts
function BS(e, t, n = 260) {
	let r = (typeof e == "string" ? e.trim().replace(/\s+/g, " ") : "") || t;
	return r.length <= n ? r : `${r.slice(0, n).replace(/\s+\S*$/, "")}…`;
}
function VS(e) {
	let t = e?.wave?.synthesis?.response?.progressDeltas;
	if (Array.isArray(t)) return t;
	let n = Array.isArray(e?.strategy?.recentSnapshots) ? e.strategy.recentSnapshots : [];
	return Array.isArray(n[0]?.metrics?.progressDeltas) ? n[0].metrics.progressDeltas : [];
}
function HS(e) {
	let t = e?.strategy || {}, n = t.charter || {}, r = Array.isArray(t.recentSnapshots) ? t.recentSnapshots[0] : null, i = VS(e), a = i.find((e) => String(e?.status || "").toUpperCase() === "ADVANCED"), o = i.find((e) => String(e?.status || "").toUpperCase() === "UNCHANGED"), s = t?.drift?.signals?.[0];
	return {
		objective: BS(n.question || e?.role, "Advance the campaign's central mathematical question."),
		status: s ? "STRATEGY CHECK" : "PROGRAM COMPASS",
		headline: BS(s?.label || n?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
		changed: BS(a?.after || a?.evidence, "No accepted frontier change is recorded for the latest wave."),
		scale: BS(o?.after || o?.evidence, "The campaign-level consequence has not yet been recorded."),
		nextTarget: BS(n?.epoch?.objective || e?.wave?.synthesis?.response?.nextWave?.objective || r?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
		rationale: BS(s?.detail || n.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
		antiLoop: BS(s?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
		moves: []
	};
}
//#endregion
//#region src/ui/ProgramCompass.svelte
Go();
var US = /* @__PURE__ */ K("<details><summary><span><b> </b><small> </small></span><strong> </strong><i>why?</i></summary> <div><p> </p><p><b>Program payoff:</b> </p></div></details>"), WS = /* @__PURE__ */ K("<div class=\"compass-wave\"></div>"), GS = /* @__PURE__ */ K("<section class=\"program-compass\" aria-label=\"Program objective and recommended next research targets\"><header><div><p>PROGRAM COMPASS</p><h2> </h2></div> <strong> </strong></header> <div class=\"compass-chain\"><article><span>WIN CONDITION</span><strong> </strong></article> <i aria-hidden=\"true\">→</i> <article><span>WHAT JUST CHANGED</span><strong> </strong><small> </small></article> <i aria-hidden=\"true\">→</i> <article class=\"recommended\"><span>BEST NEXT TARGET</span><strong> </strong></article></div> <!> <details class=\"compass-reasoning\"><summary><span>WHY THIS ORDER</span><strong>Show strategy and anti-loop guard</strong></summary> <div><p> </p><p><b>Avoid the loop:</b> </p></div></details> <footer><b>ADVISORY, NOT AUTHORITY</b><span>The evidence receipts and human gates still decide what is accepted or launched.</span></footer></section>");
function KS(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(null);
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => (U(a), HS), () => {
		L(o, U(a) ? HS(U(a)) : null);
	}), Br(), xo();
	var s = ua(), c = z(s), l = (e) => {
		var t = GS(), n = R(t), r = R(n), i = B(R(r)), a = R(i, !0);
		P(i), P(r);
		var s = B(r, 2), c = R(s, !0);
		P(s), P(n);
		var l = B(n, 2), u = R(l), d = B(R(u)), f = R(d, !0);
		P(d), P(u);
		var p = B(u, 4), m = B(R(p)), h = R(m, !0);
		P(m);
		var g = B(m), _ = R(g, !0);
		P(g), P(p);
		var v = B(p, 4), y = B(R(v)), b = R(y, !0);
		P(y), P(v), P(l);
		var x = B(l, 2), S = (e) => {
			var t = WS();
			X(t, 5, () => (U(o), W(() => U(o).moves)), (e) => e.id, (e, t) => {
				var n = US();
				let r;
				var i = R(n), a = R(i), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c, !0);
				P(c), P(a);
				var u = B(a), d = R(u, !0);
				P(u), Ke(), P(i);
				var f = B(i, 2), p = R(f), m = R(p, !0);
				P(p);
				var h = B(p), g = B(R(h));
				P(h), P(f), P(n), H(() => {
					r = Z(n, 1, "", null, r, { held: U(t).timing === "HOLD" }), J(s, (U(t), W(() => U(t).timing))), J(l, (U(t), W(() => U(t).track))), J(d, (U(t), W(() => U(t).title))), J(m, (U(t), W(() => U(t).detail))), J(g, ` ${U(t), W(() => U(t).payoff) ?? ""}`);
				}), q(e, n);
			}), P(t), q(e, t);
		};
		Y(x, (e) => {
			U(o), W(() => U(o).moves.length) && e(S);
		});
		var C = B(x, 2), w = B(R(C), 2), T = R(w), E = R(T, !0);
		P(T);
		var D = B(T), O = B(R(D));
		P(D), P(w), P(C), Ke(2), P(t), H(() => {
			J(a, (U(o), W(() => U(o).headline))), J(c, (U(o), W(() => U(o).status))), J(f, (U(o), W(() => U(o).objective))), J(h, (U(o), W(() => U(o).changed))), J(_, (U(o), W(() => U(o).scale))), J(b, (U(o), W(() => U(o).nextTarget))), J(E, (U(o), W(() => U(o).rationale))), J(O, ` ${U(o), W(() => U(o).antiLoop) ?? ""}`);
		}), q(e, t);
	};
	Y(c, (e) => {
		U(o) && e(l);
	}), q(e, s), xt(), i();
}
//#endregion
//#region src/ui/ResourceEconomy.svelte
Go();
var qS = /* @__PURE__ */ K("<div class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></div>"), JS = /* @__PURE__ */ K("<article><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></article>"), YS = /* @__PURE__ */ K("<article><strong class=\"svelte-wkay8m\"> </strong><p class=\"svelte-wkay8m\"> </p></article>"), XS = /* @__PURE__ */ K("<section class=\"resource-signals svelte-wkay8m\"></section>"), ZS = /* @__PURE__ */ K("<li><b class=\"svelte-wkay8m\"> </b> <div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span><p class=\"svelte-wkay8m\"> </p><small class=\"svelte-wkay8m\"> </small></div></li>"), QS = /* @__PURE__ */ K("<ol class=\"svelte-wkay8m\"></ol>"), $S = /* @__PURE__ */ K("<div class=\"resource-empty svelte-wkay8m\"><strong class=\"svelte-wkay8m\">No bounded candidate is currently schedulable</strong><p class=\"svelte-wkay8m\">The ledger remains useful as an epoch budget and cost-quality check.</p></div>"), eC = /* @__PURE__ */ K("<li class=\"svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div><i class=\"svelte-wkay8m\">NO DISPATCH</i></li>"), tC = /* @__PURE__ */ K("<details class=\"simulation-history svelte-wkay8m\"><summary class=\"svelte-wkay8m\">Immutable simulation history <strong> </strong></summary><ol class=\"svelte-wkay8m\"></ol></details>"), nC = /* @__PURE__ */ K("<div role=\"status\"> </div>"), rC = /* @__PURE__ */ K("<details id=\"resource-economy\"><summary class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"><small class=\"svelte-wkay8m\">RESOURCE ECONOMY</small><strong class=\"svelte-wkay8m\"> </strong></span> <span class=\"resource-summary svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><b class=\"svelte-wkay8m\"> </b><i class=\"svelte-wkay8m\">SHADOW</i></span></summary> <div class=\"resource-body svelte-wkay8m\"><header class=\"resource-intro svelte-wkay8m\"><div><span class=\"svelte-wkay8m\"> </span><h2 class=\"svelte-wkay8m\">Allocate attention before compute</h2><p class=\"svelte-wkay8m\"> </p></div> <div class=\"authority svelte-wkay8m\"><strong class=\"svelte-wkay8m\">ADVISORY ONLY</strong><span class=\"svelte-wkay8m\">Simulation cannot dispatch</span></div></header> <p class=\"resource-enforcement-note\"><strong>Runtime limit gap.</strong> The local research launcher currently does not forward the schedule’s token and timeout reservations to the worker runtime. These values are planning limits, not enforced stop guarantees. Repair that adapter before authorizing more local research.</p> <section class=\"budget svelte-wkay8m\" aria-label=\"Epoch token budget\"><div class=\"budget-heading svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div> <div class=\"budget-meter svelte-wkay8m\"><i class=\"known svelte-wkay8m\"></i><i class=\"committed svelte-wkay8m\"></i><i class=\"reserve svelte-wkay8m\"></i></div> <div class=\"budget-legend svelte-wkay8m\"><span class=\"known svelte-wkay8m\"> </span><span class=\"committed svelte-wkay8m\"> </span><span class=\"reserve svelte-wkay8m\"> </span><span> </span></div></section> <div class=\"resource-grid svelte-wkay8m\"><section class=\"slot-pools svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Shared slot pools</h3> <!></section> <section class=\"layer-ledger svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Measured by layer</h3> <!></section></div> <section class=\"calibration svelte-wkay8m\" aria-label=\"Receipt-bound resource calibration\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">RECEIPT-BOUND CALIBRATION</span><h3 class=\"svelte-wkay8m\"> </h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <p class=\"svelte-wkay8m\"> </p> <div class=\"calibration-classes svelte-wkay8m\"></div> <footer class=\"svelte-wkay8m\">Recommendations remain advisory. Calibration cannot change caps, schedule work, or grant scheduler authority.</footer></section> <!> <section class=\"scheduler svelte-wkay8m\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">ADVISORY SCHEDULER</span><h3 class=\"svelte-wkay8m\">What fits next—and what does not</h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <!> <footer class=\"svelte-wkay8m\"><p class=\"svelte-wkay8m\">Freezing creates a content-addressed recommendation receipt for later comparison. It cannot call a worker, consume a gate, or alter research direction.</p><button class=\"outline-button svelte-wkay8m\"> </button></footer></section> <!> <!></div></details>");
function iC(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I(!1), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I("pending");
	function _(e) {
		let t = Number(e || 0);
		return t >= 1e6 ? `${(t / 1e6).toFixed(t % 1e6 ? 1 : 0)}m` : t >= 1e3 ? `${Math.round(t / 1e3)}k` : t.toLocaleString();
	}
	function v(e) {
		return `${Math.round(Number(e || 0) * 100)}%`;
	}
	async function y() {
		if (!(!U(d) || U(m))) {
			L(m, !0), L(g, "pending"), L(h, "Freezing the current ledger, candidates, and advisory decisions…");
			try {
				await as({
					projectId: U(d).id,
					type: "resource.schedule.simulate",
					scope: "resource-economy"
				}), L(g, "success"), L(h, "Immutable advisory simulation recorded. It dispatched nothing and left the campaign phase unchanged.");
			} catch (e) {
				L(g, "error"), L(h, e instanceof Error ? e.message : String(e));
			} finally {
				L(m, !1);
			}
		}
	}
	V(() => n(), () => {
		L(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(d), () => {
		L(f, U(d)?.resources || null);
	}), V(() => U(f), () => {
		L(a, U(f)?.ledger || {});
	}), V(() => U(f), () => {
		L(o, U(f)?.calibration || {});
	}), V(() => U(a), () => {
		L(s, Math.max(1, Number(U(a).epochTokenBudget || 1)));
	}), V(() => (U(a), U(s)), () => {
		L(c, Math.min(100, Number(U(a).knownTokens || 0) / U(s) * 100));
	}), V(() => (U(c), U(a), U(s)), () => {
		L(l, Math.min(100 - U(c), Number(U(a).committedTokens || 0) / U(s) * 100));
	}), V(() => (U(c), U(l), U(a), U(s)), () => {
		L(u, Math.min(100 - U(c) - U(l), Number(U(a).reserveTokens || 0) / U(s) * 100));
	}), Br(), xo();
	var b = ua(), x = z(b), S = (e) => {
		var t = rC();
		let n;
		var r = R(t), i = R(r), d = B(R(i)), b = R(d);
		P(d), P(i);
		var x = B(i, 2), S = R(x), C = R(S);
		P(S);
		var w = B(S), T = R(w);
		P(w), Ke(), P(x), P(r);
		var E = B(r, 2), D = R(E), O = R(D), k = R(O), A = R(k);
		P(k);
		var j = B(k, 2), ee = R(j, !0);
		P(j), P(O), Ke(2), P(D);
		var M = B(D, 4), N = R(M), te = R(N), ne = R(te);
		P(te);
		var re = B(te), ie = R(re);
		P(re), P(N);
		var ae = B(N, 2), oe = R(ae), se = B(oe), ce = B(se);
		P(ae);
		var le = B(ae, 2), ue = R(le), de = R(ue);
		P(ue);
		var fe = B(ue), pe = R(fe);
		P(fe);
		var me = B(fe), he = R(me);
		P(me);
		var ge = B(me), _e = R(ge);
		P(ge), P(le), P(M);
		var ve = B(M, 2), ye = R(ve);
		X(B(R(ye), 2), 0, () => [
			"strategy",
			"research",
			"custody"
		], ya, (e, t) => {
			var n = qS(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a);
			P(a);
			var s = B(a), c = R(s);
			P(s), P(n), H(() => {
				J(i, t), J(o, `${U(f), W(() => U(f).slots.available[t]) ?? ""} available`), J(c, `${U(f), W(() => U(f).slots.active[t]) ?? ""} active / ${U(f), W(() => U(f).slots.capacity[t]) ?? ""} capacity`);
			}), q(e, n);
		}), P(ye);
		var be = B(ye, 2);
		X(B(R(be), 2), 1, () => (U(f), W(() => U(f).byLayer || [])), (e) => e.id, (e, t) => {
			var n = qS(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a);
			var s = B(a), c = R(s);
			P(s), P(n), H((e) => {
				J(i, (U(t), W(() => U(t).id))), J(o, e), J(c, `${U(t), W(() => U(t).runs) ?? ""} runs · ${U(t), W(() => U(t).unreported) ?? ""} unreported`);
			}, [() => (U(t), W(() => _(U(t).knownTokens)))]), q(e, n);
		}), P(be), P(ve);
		var xe = B(ve, 2), Se = R(xe), Ce = R(Se), we = B(R(Ce)), Te = R(we, !0);
		P(we), P(Ce);
		var Ee = B(Ce), De = R(Ee);
		P(Ee), P(Se);
		var Oe = B(Se, 2), ke = R(Oe, !0);
		P(Oe);
		var Ae = B(Oe, 2);
		X(Ae, 5, () => (U(o), W(() => U(o).classes || [])), (e) => e.id, (e, t) => {
			var n = JS();
			let r;
			var i = R(n), a = R(i, !0);
			P(i);
			var o = B(i), s = R(o);
			P(o);
			var c = B(o), l = R(c, !0);
			P(c), P(n), H((e) => {
				r = Z(n, 1, "svelte-wkay8m", null, r, { sufficient: U(t).sufficient }), J(a, (U(t), W(() => U(t).id))), J(s, `${U(t), W(() => U(t).samples) ?? ""}/${U(t), W(() => U(t).minimumSamples) ?? ""}`), J(l, e);
			}, [() => (U(t), W(() => U(t).samples ? `p90 ${_(U(t).tokens?.p90)}` : "awaiting receipts"))]), q(e, n);
		}), P(Ae), Ke(2), P(xe);
		var je = B(xe, 2), Me = (e) => {
			var t = XS();
			X(t, 5, () => (U(f), W(() => U(f).signals)), (e) => e.id, (e, t) => {
				var n = YS(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a), P(n), H(() => {
					Z(n, 1, (U(t), W(() => `severity-${U(t).severity}`)), "svelte-wkay8m"), J(i, (U(t), W(() => U(t).label))), J(o, (U(t), W(() => U(t).detail)));
				}), q(e, n);
			}), P(t), q(e, t);
		};
		Y(je, (e) => {
			U(f), W(() => U(f).signals?.length) && e(Me);
		});
		var Ne = B(je, 2), Pe = R(Ne), Fe = B(R(Pe)), Ie = R(Fe);
		P(Fe), P(Pe);
		var Le = B(Pe, 2), Re = (e) => {
			var t = QS();
			X(t, 5, () => (U(f), W(() => U(f).candidates)), (e) => e.id, (e, t) => {
				var n = ZS(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r, 2), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c);
				var u = B(c), d = R(u, !0);
				P(u);
				var f = B(u), p = R(f, !0);
				P(f), P(a), P(n), H((e, r) => {
					Z(n, 1, e, "svelte-wkay8m"), J(i, (U(t), W(() => U(t).decision))), J(s, (U(t), W(() => U(t).label))), J(l, `${U(t), W(() => U(t).layer) ?? ""} · ${U(t), W(() => U(t).trackId) ?? ""} · ${U(t), W(() => U(t).workKind) ?? ""} · cap ${r ?? ""}`), J(d, (U(t), W(() => U(t).expectedDelta))), J(p, (U(t), W(() => U(t).decisionReason)));
				}, [() => (U(t), W(() => `decision-${U(t).decision.toLowerCase()}`)), () => (U(t), W(() => _(U(t).tokenCap)))]), q(e, n);
			}), P(t), q(e, t);
		}, ze = (e) => {
			q(e, $S());
		};
		Y(Le, (e) => {
			U(f), W(() => U(f).candidates?.length) ? e(Re) : e(ze, -1);
		});
		var Be = B(Le, 2), Ve = B(R(Be)), He = R(Ve, !0);
		P(Ve), P(Be), P(Ne);
		var Ue = B(Ne, 2), We = (e) => {
			var t = tC(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(f), W(() => U(f).simulations)), ya, (e, t) => {
				var n = eC(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), Ke(), P(n), H((e) => {
					J(i, `R${U(t), W(() => U(t).charterRevision) ?? ""}`), J(s, (U(t), W(() => U(t).inputDigest))), J(l, `${e ?? ""} · ${U(t), W(() => U(t).actor) ?? ""}`);
				}, [() => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(f), W(() => U(f).simulations.length) ?? ""} receipt${U(f), W(() => U(f).simulations.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(Ue, (e) => {
			U(f), W(() => U(f).simulations?.length) && e(We);
		});
		var Ge = B(Ue, 2), qe = (e) => {
			var t = nC(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `resource-feedback ${U(g) ?? ""}`, "svelte-wkay8m"), J(n, U(h));
			}), q(e, t);
		};
		Y(Ge, (e) => {
			U(h) && e(qe);
		}), P(E), P(t), H((e, r, i, s, d, p, h, g, _, v) => {
			n = Z(t, 1, "svelte-wkay8m", null, n, e), J(b, `${r ?? ""} measured of ${i ?? ""} this epoch`), J(C, `${U(f), W(() => U(f).candidates?.length || 0) ?? ""} choices`), J(T, `${U(f), W(() => U(f).slots?.available?.research || 0) ?? ""}/${U(f), W(() => U(f).slots?.capacity?.research || 0) ?? ""} research slots`), J(A, `PROVISIONAL EPOCH ENVELOPE · CHARTER R${U(f), W(() => U(f).charterRevision) ?? ""}`), J(ee, (U(f), W(() => U(f).policy.rationale))), J(ne, `${s ?? ""} measured + committed`), J(ie, `${d ?? ""} still schedulable · ${p ?? ""} held for redirects`), Ha(oe, `width:${U(c)}%`), Ha(se, `left:${U(c)}%;width:${U(l)}%`), Ha(ce, `right:0;width:${U(u)}%`), J(de, `measured ${h ?? ""}`), J(pe, `committed ${g ?? ""}`), J(he, `redirect reserve ${_ ?? ""}`), J(_e, `${U(a), W(() => U(a).unreported || 0) ?? ""} unreported runs`), J(Te, v), J(De, `${U(o), W(() => U(o).eligibleSamples || 0) ?? ""} eligible · ${U(o), W(() => U(o).excludedSamples || 0) ?? ""} excluded`), J(ke, (U(o), W(() => U(o).note))), J(Ie, `${U(f), W(() => U(f).simulation?.scheduled?.length || 0) ?? ""} fit · ${U(f), W(() => U(f).simulation?.gated?.length || 0) ?? ""} gated · ${U(f), W(() => U(f).simulation?.waiting?.length || 0) ?? ""} waiting`), Ve.disabled = U(m), J(He, U(m) ? "Freezing simulation…" : "Freeze scheduler simulation");
		}, [
			() => ({ attention: U(f).signals?.some((e) => e.severity === "attention") }),
			() => (U(a), W(() => _(U(a).knownTokens))),
			() => (U(a), W(() => _(U(a).epochTokenBudget))),
			() => (U(a), W(() => _(U(a).knownTokens + U(a).committedTokens))),
			() => (U(a), W(() => _(U(a).schedulableTokens))),
			() => (U(a), W(() => _(U(a).reserveTokens))),
			() => (U(a), U(s), W(() => v(Number(U(a).knownTokens || 0) / U(s)))),
			() => (U(a), U(s), W(() => v(Number(U(a).committedTokens || 0) / U(s)))),
			() => (U(a), U(s), W(() => v(Number(U(a).reserveTokens || 0) / U(s)))),
			() => (U(o), W(() => String(U(o).status || "INSUFFICIENT").replaceAll("_", " ")))
		]), G("click", Ve, y), yo("open", "toggle", t, (e) => L(p, e), () => U(p)), q(e, t);
	};
	Y(x, (e) => {
		U(f) && e(S);
	}), q(e, b), xt(), i();
}
//#endregion
//#region src/ui/StrategyWorkspace.svelte
$i(["click"]), Go();
var aC = /* @__PURE__ */ K("<label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Exact thread or turn ID</span><input maxlength=\"500\" placeholder=\"Attached coordinator reference\" class=\"svelte-1ull9g0\"/></label>"), oC = /* @__PURE__ */ K("<div class=\"strategy-review-request\"><div><span>CURRENT EPOCH</span> <strong> </strong> <p> </p></div> <label><span>Review focus</span><textarea rows=\"3\" maxlength=\"2000\"></textarea></label> <div class=\"strategy-review-provenance svelte-1ull9g0\"><label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Review kind</span><select class=\"svelte-1ull9g0\"><option>Epoch audit</option><option>Independent idea search</option></select></label> <label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Request source</span><select class=\"svelte-1ull9g0\"><option>Operator</option><option>Coordinator request</option></select></label> <!></div> <button class=\"primary-button\"> </button></div>"), sC = /* @__PURE__ */ K("<button class=\"outline-button\">Check recorded review status</button>"), cC = /* @__PURE__ */ K("<!> <div class=\"strategy-review-running\"><span class=\"strategy-pulse\"></span> <div><strong> </strong><p> </p><small> </small></div></div>", 1), lC = /* @__PURE__ */ K("<div><span> </span><strong> </strong><small> </small></div>"), uC = /* @__PURE__ */ K("<li class=\"svelte-1ull9g0\"> </li>"), dC = /* @__PURE__ */ K("<ul></ul>"), fC = /* @__PURE__ */ K("<p>None proposed.</p>"), pC = /* @__PURE__ */ K("<section><strong> </strong><!></section>"), mC = /* @__PURE__ */ K("<li><strong> </strong><span> </span><p> </p></li>"), hC = /* @__PURE__ */ K("<details class=\"custody-candidates\"><summary> </summary><ul></ul></details>"), gC = /* @__PURE__ */ K("<label><input type=\"checkbox\"/><span>I approve this exact advisory charter as the next epoch.</span></label> <div><button class=\"outline-button\">Keep current charter</button><button class=\"primary-button\"> </button></div>", 1), _C = /* @__PURE__ */ K("<button class=\"outline-button\">Close proposal and keep current charter</button>"), vC = /* @__PURE__ */ K("<div class=\"strategy-proposal\"><header><div><span> </span><h3> </h3></div> <strong> </strong></header> <div class=\"strategy-proposal-objective\"><span>PROPOSED EPOCH</span> <strong> </strong> <p> </p></div> <div class=\"strategy-proposal-weights\" aria-label=\"Proposed track weights\"></div> <div class=\"strategy-action-diff\"></div> <!> <div class=\"strategy-human-gate\"><div><span>HUMAN ACTIVATION GATE</span><strong> </strong><small> </small></div> <!></div></div>"), yC = /* @__PURE__ */ K("<div role=\"status\"> </div>"), bC = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small></div></li>"), xC = /* @__PURE__ */ K("<details class=\"strategy-history\"><summary>Charter history <strong> </strong></summary><ol></ol></details>"), SC = /* @__PURE__ */ K("<li class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\"> </span><div><strong> </strong><small> </small></div></li>"), CC = /* @__PURE__ */ K("<details class=\"strategy-history strategy-review-history svelte-1ull9g0\"><summary>Independent review history <strong> </strong></summary><ol></ol></details>"), wC = /* @__PURE__ */ K("<details id=\"strategy-workspace\" class=\"strategy-workspace\"><summary><span><small>STRATEGY WORKSPACE</small><strong> </strong></span> <span class=\"strategy-workspace-state\"> </span></summary> <div class=\"strategy-workspace-body\"><div class=\"strategy-workspace-boundary\"><strong>Independent governance lane</strong> <p>Epoch and idea-search reviews run in one dedicated read-only Sol lane. Each request binds its strategy slot and token cap, and cannot interrupt the regular coordinator, change campaign phase, dispatch workers, or activate its own proposal.</p></div> <!> <!> <!> <!></div></details>");
function TC(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I("epoch"), h = /* @__PURE__ */ I("operator"), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I("Review whether the current epoch is producing durable frontier motion and whether its portfolio should be rebalanced."), v = /* @__PURE__ */ I(""), y = /* @__PURE__ */ I("pending"), b = (e) => `${Math.round(Number(e || 0) * 100)}%`;
	async function x(e, t = "", n = {}) {
		if (!U(l) || U(f)) throw Error("Another strategy action is still settling");
		L(f, e), L(y, "pending"), L(v, e === "strategy.review.reconcile" ? "Checking the exact recorded strategy turn…" : e === "strategy.review.request" ? "Freezing the epoch ledger and starting an independent read-only Sol task…" : e === "strategy.proposal.activate" ? "Recording the charter revision and opening a fresh measurement epoch…" : "Keeping the current charter and closing this proposal…");
		try {
			let r = await as({
				projectId: U(l).id,
				type: e,
				targetId: t,
				args: n,
				scope: "strategy-workspace",
				pollLimit: 160
			});
			return L(y, "success"), L(v, e === "strategy.review.reconcile" ? "Recorded strategy status reconciled. No work was dispatched." : e === "strategy.review.request" ? "Independent epoch review started. The regular campaign coordinator and campaign phase were not changed." : e === "strategy.proposal.activate" ? "The new advisory charter is active in a fresh epoch. No work was dispatched." : "Proposal closed; the current charter remains active."), r.action;
		} catch (e) {
			throw L(y, "error"), L(v, e instanceof Error ? e.message : String(e)), e;
		} finally {
			L(f, "");
		}
	}
	async function S() {
		await x("strategy.review.request", "", {
			triggerKind: "manual",
			reason: U(_),
			reviewKind: U(m),
			requestSource: U(h),
			requestReference: U(g)
		}).catch(() => void 0);
	}
	async function C() {
		!U(d) || !U(p) || (await x("strategy.proposal.activate", U(d).id, { confirmation: "ACTIVATE STRATEGY REVISION" }).catch(() => void 0), L(p, !1));
	}
	async function w() {
		U(d) && await x("strategy.proposal.dismiss", U(d).id, { note: "Operator kept the current charter after reviewing the independent proposal." }).catch(() => void 0);
	}
	V(() => n(), () => {
		L(l, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(l), () => {
		L(u, U(l)?.strategy?.workspace || null);
	}), V(() => U(u), () => {
		L(d, U(u)?.activeReview || null);
	}), V(() => U(d), () => {
		L(a, U(d)?.response || {});
	}), V(() => U(a), () => {
		L(o, U(a)?.proposal || {});
	}), V(() => U(o), () => {
		L(s, Array.isArray(U(o)?.trackWeights) ? U(o).trackWeights : []);
	}), V(() => U(d), () => {
		L(c, !!(U(d) && ["drafting", "drafted"].includes(U(d).status)));
	}), Br(), xo();
	var T = ua(), E = z(T), D = (e) => {
		var t = wC(), n = R(t), r = R(n), i = B(R(r)), T = R(i);
		P(i), P(r);
		var E = B(r, 2), D = R(E, !0);
		P(E), P(n);
		var O = B(n, 2), k = B(R(O), 2), A = (e) => {
			var t = oC(), n = R(t), r = B(R(n), 2), i = R(r, !0);
			P(r);
			var a = B(r, 2), o = R(a, !0);
			P(a), P(n);
			var s = B(n, 2), c = B(R(s));
			tn(c), P(s);
			var d = B(s, 2), p = R(d), v = B(R(p)), y = R(v);
			y.value = y.__value = "epoch";
			var b = B(y);
			b.value = b.__value = "idea-search", P(v), P(p);
			var x = B(p, 2), C = B(R(x)), w = R(C);
			w.value = w.__value = "operator";
			var T = B(w);
			T.value = T.__value = "coordinator-request", P(C), P(x);
			var E = B(x, 2), D = (e) => {
				var t = aC(), n = B(R(t));
				no(n), P(t), uo(n, () => U(g), (e) => L(g, e)), q(e, t);
			};
			Y(E, (e) => {
				U(h) === "coordinator-request" && e(D);
			}), P(d);
			var O = B(d, 2), k = R(O, !0);
			P(O), P(t), H((e) => {
				J(i, (U(l), W(() => U(l).strategy.epoch.label))), J(o, (U(l), W(() => U(l).strategy.charter.epoch?.objective || U(l).strategy.charter.thesis))), O.disabled = e, J(k, U(f) === "strategy.review.request" ? "Starting independent review…" : "Ask independent Sol strategist");
			}, [() => (U(f), U(u), U(_), U(h), U(g), W(() => !!U(f) || !U(u).reviewAvailable || !U(_).trim() || U(h) === "coordinator-request" && !U(g).trim()))]), uo(c, () => U(_), (e) => L(_, e)), Ga(v, () => U(m), (e) => L(m, e)), Ga(C, () => U(h), (e) => L(h, e)), G("click", O, S), q(e, t);
		}, j = (e) => {
			var t = cC(), n = z(t), r = (e) => {
				var t = sC();
				H((e) => t.disabled = e, [() => (U(f), W(() => !!U(f)))]), G("click", t, () => x("strategy.review.reconcile", U(d).id).catch(() => void 0)), q(e, t);
			};
			Y(n, (e) => {
				U(d), W(() => U(d).status === "drafting") && e(r);
			});
			var i = B(n, 2), a = B(R(i), 2), o = R(a), s = R(o, !0);
			P(o);
			var c = B(o), l = R(c, !0);
			P(c);
			var u = B(c), p = R(u);
			P(u), P(a), P(i), H((e) => {
				J(s, (U(d), W(() => U(d).reviewKind === "idea-search" ? "Searching for independent directions" : "Reviewing the epoch ledger"))), J(l, (U(d), W(() => U(d).triggerReason))), J(p, `${U(d), W(() => U(d).requestSource) ?? ""} · cap ${e ?? ""} · frozen bundle ${U(d), W(() => U(d).bundleDigest || "being prepared") ?? ""}`);
			}, [() => (U(d), W(() => Number(U(d).resourceCap || 0).toLocaleString()))]), q(e, t);
		}, ee = (e) => {
			var t = vC(), n = R(t), r = R(n), i = R(r), c = R(i);
			P(i);
			var m = B(i), h = R(m, !0);
			P(m), P(r);
			var g = B(r, 2), _ = R(g, !0);
			P(g), P(n);
			var v = B(n, 2), y = B(R(v), 2), x = R(y, !0);
			P(y);
			var S = B(y, 2), T = R(S, !0);
			P(S), P(v);
			var E = B(v, 2);
			X(E, 5, () => U(s), (e) => e.trackId, (e, t) => {
				var n = lC(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H((e) => {
					J(i, (U(t), W(() => U(t).trackId))), J(o, e), J(c, (U(t), W(() => U(t).reason)));
				}, [() => (U(t), W(() => b(U(t).share)))]), q(e, n);
			}), P(E);
			var D = B(E, 2);
			X(D, 5, () => (U(a), W(() => [
				["STOP", U(a).portfolioActions?.stop],
				["CONTINUE", U(a).portfolioActions?.continue],
				["START", U(a).portfolioActions?.start]
			])), ya, (e, t) => {
				var n = pC(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = (e) => {
					var n = dC();
					X(n, 5, () => (U(t), W(() => U(t)[1])), ya, (e, t) => {
						var n = uC(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(n), q(e, n);
				}, s = /* @__PURE__ */ F(() => (U(t), W(() => Array.isArray(U(t)[1]) && U(t)[1].length))), c = (e) => {
					q(e, fC());
				};
				Y(a, (e) => {
					U(s) ? e(o) : e(c, -1);
				}), P(n), H((e) => {
					Z(n, 1, e, "svelte-1ull9g0"), J(i, (U(t), W(() => U(t)[0])));
				}, [() => (U(t), W(() => `strategy-action-${String(U(t)[0]).toLowerCase()}`))]), q(e, n);
			}), P(D);
			var O = B(D, 2), k = (e) => {
				var t = hC(), n = R(t), r = R(n);
				P(n);
				var i = B(n);
				X(i, 5, () => (U(o), W(() => U(o).custodyCandidates)), ya, (e, t) => {
					var n = mC(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a);
					P(a);
					var s = B(a), c = R(s, !0);
					P(s), P(n), H(() => {
						J(i, (U(t), W(() => U(t).task))), J(o, `${U(t), W(() => U(t).urgency) ?? ""} · ${U(t), W(() => U(t).blocksResearch ? "blocks research" : "does not block research") ?? ""}`), J(c, (U(t), W(() => U(t).reason)));
					}), q(e, n);
				}), P(i), P(t), H(() => J(r, `Inspect ${U(o), W(() => U(o).custodyCandidates.length) ?? ""} custody handoff candidate${U(o), W(() => U(o).custodyCandidates.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
			};
			Y(O, (e) => {
				U(o), W(() => U(o).custodyCandidates?.length) && e(k);
			});
			var A = B(O, 2), j = R(A), ee = B(R(j)), M = R(ee, !0);
			P(ee);
			var N = B(ee), te = R(N);
			P(N), P(j);
			var ne = B(j, 2), re = (e) => {
				var t = gC(), n = z(t), r = R(n);
				no(r), Ke(), P(n);
				var i = B(n, 2), a = R(i), o = B(a), s = R(o, !0);
				P(o), P(i), H((e, t) => {
					a.disabled = e, o.disabled = t, J(s, U(f) === "strategy.proposal.activate" ? "Activating revision…" : "Activate new epoch");
				}, [() => (U(f), W(() => !!U(f))), () => (U(p), U(f), W(() => !U(p) || !!U(f)))]), fo(r, () => U(p), (e) => L(p, e)), G("click", a, w), G("click", o, C), q(e, t);
			}, ie = (e) => {
				var t = _C();
				H((e) => t.disabled = e, [() => (U(f), W(() => !!U(f)))]), G("click", t, w), q(e, t);
			};
			Y(ne, (e) => {
				U(u), W(() => U(u).activationAvailable) ? e(re) : e(ie, -1);
			}), P(A), P(t), H((e, t) => {
				J(c, `${e ?? ""} · ${U(a), W(() => U(a).assessment?.epochStatus || "COMPLETE") ?? ""}`), J(h, (U(a), W(() => U(a).summary || "Independent strategy proposal"))), J(_, t), J(x, (U(o), W(() => U(o).epochLabel))), J(T, (U(o), W(() => U(o).epochObjective))), J(M, (U(a), W(() => U(a).operatorDecision))), J(te, `Activation records revision ${U(l), W(() => U(l).strategy.charter.revision + 1) ?? ""} and resets measurement boundaries. Campaign phase and dispatch state remain unchanged.`);
			}, [() => (U(d), W(() => U(d).reviewKind?.replaceAll("-", " ") || "REVIEW")), () => (U(a), W(() => U(a).recommendation?.replaceAll("_", " ")))]), q(e, t);
		};
		Y(k, (e) => {
			U(d) ? (U(d), W(() => U(d).status === "drafting" || U(d).status === "queued") ? e(j, 1) : (U(d), W(() => U(d).status === "drafted") && e(ee, 2))) : e(A);
		});
		var M = B(k, 2), N = (e) => {
			var t = yC(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `strategy-workspace-feedback ${U(y) ?? ""}`, "svelte-1ull9g0"), J(n, U(v));
			}), q(e, t);
		};
		Y(M, (e) => {
			U(v) && e(N);
		});
		var te = B(M, 2), ne = (e) => {
			var t = xC(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(u), W(() => U(u).charterHistory)), ya, (e, t) => {
				var n = bC(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e) => {
					J(i, `REV ${U(t), W(() => U(t).revision) ?? ""}`), J(s, (U(t), W(() => U(t).charter.epoch?.label || "Campaign charter"))), J(l, `${U(t), W(() => U(t).actor) ?? ""} · ${e ?? ""}`);
				}, [() => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(u), W(() => U(u).charterHistory.length) ?? ""} revision${U(u), W(() => U(u).charterHistory.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(te, (e) => {
			U(u), W(() => U(u).charterHistory?.length) && e(ne);
		});
		var re = B(te, 2), ie = (e) => {
			var t = CC(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(u), W(() => U(u).reviews)), ya, (e, t) => {
				var n = SC(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e, n, r) => {
					J(i, e), J(s, (U(t), W(() => U(t).response?.summary || U(t).triggerReason))), J(l, `${U(t), W(() => U(t).reviewKind) ?? ""} · ${U(t), W(() => U(t).requestSource) ?? ""} · cap ${n ?? ""} · revision ${U(t), W(() => U(t).baseRevision) ?? ""} · ${r ?? ""}${U(t), W(() => U(t).error ? ` · ${U(t).error}` : "") ?? ""}`);
				}, [
					() => (U(t), W(() => U(t).status.toUpperCase())),
					() => (U(t), W(() => Number(U(t).resourceCap || 0).toLocaleString())),
					() => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))
				]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(u), W(() => U(u).reviews.length) ?? ""} review${U(u), W(() => U(u).reviews.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(re, (e) => {
			U(u), W(() => U(u).reviews?.length) && e(ie);
		}), P(O), P(t), H(() => {
			t.open = U(c), J(T, `Charter revision ${U(l), W(() => U(l).strategy.charter.revision) ?? ""}`), J(D, (U(d), W(() => U(d)?.status === "drafting" ? "SOL REVIEW RUNNING" : U(d)?.status === "drafted" ? "HUMAN GATE" : "NO STRATEGY JOB RUNNING")));
		}), q(e, t);
	};
	Y(E, (e) => {
		U(l), U(u), W(() => U(l)?.strategy && U(u)) && e(D);
	}), q(e, T), xt(), i();
}
//#endregion
//#region src/ui/CustodyService.svelte
$i(["click"]), Go();
var EC = /* @__PURE__ */ K("<p class=\"custody-input-blocker svelte-pcnttw\"><strong>INPUTS REQUIRED:</strong> </p>"), DC = /* @__PURE__ */ K("<p class=\"svelte-pcnttw\"> </p>"), OC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span>"), kC = /* @__PURE__ */ K("<li class=\"svelte-pcnttw\"> </li>"), AC = /* @__PURE__ */ K("<section><header class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">WHAT HAPPENED</span><strong class=\"svelte-pcnttw\"> </strong></header> <p class=\"svelte-pcnttw\"> </p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">RECOMMENDED NEXT</span><b class=\"svelte-pcnttw\"> </b></div> <small class=\"svelte-pcnttw\"> </small></section>"), jC = /* @__PURE__ */ K("<button class=\"primary-button compact svelte-pcnttw\"> </button>"), MC = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\"> </button>"), NC = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Contract reshape required</button>"), PC = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Queued · custody slot busy</button>"), FC = /* @__PURE__ */ K("<small role=\"status\" class=\"svelte-pcnttw\"> </small>"), IC = /* @__PURE__ */ K("<!> <button class=\"primary-button compact svelte-pcnttw\"> </button>", 1), LC = /* @__PURE__ */ K("<code class=\"svelte-pcnttw\"> </code>"), RC = /* @__PURE__ */ K("<b class=\"svelte-pcnttw\"> </b><p class=\"svelte-pcnttw\"> </p>", 1), zC = /* @__PURE__ */ K("<div class=\"custody-receipt-review svelte-pcnttw\"><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">MEASURED RESULT</span><strong class=\"svelte-pcnttw\"> </strong></div><b class=\"svelte-pcnttw\"> </b></header> <div class=\"custody-receipt-metrics svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span></div> <!> <details class=\"svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect checks, worktree, and immutable bindings</summary><div class=\"svelte-pcnttw\"><b class=\"svelte-pcnttw\">Producer</b><code class=\"svelte-pcnttw\"> </code><b class=\"svelte-pcnttw\">Worktree</b><code class=\"svelte-pcnttw\"> </code><!></div></details> <footer class=\"svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\">Reject result</button><button class=\"primary-button svelte-pcnttw\"> </button></footer> <small class=\"svelte-pcnttw\">Landing rechecks the exact receipt and clean checkout, then cherry-picks only the frozen producer commit. It never pushes or promotes a claim.</small></div>"), BC = /* @__PURE__ */ K("<div><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <strong class=\"svelte-pcnttw\"> </strong> <small class=\"svelte-pcnttw\"> </small></div> <!></div> <!>", 1), VC = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\">Park</button> <button class=\"primary-button svelte-pcnttw\"> </button>", 1), HC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span><button class=\"outline-button compact svelte-pcnttw\">Park</button>", 1), UC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">Research continues independently while this isolated steward works.</span>"), WC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">The measured receipt above has no landing authority until you accept it.</span>"), GC = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"primary-button svelte-pcnttw\"> </button></div>"), KC = /* @__PURE__ */ K("<button class=\"primary-button svelte-pcnttw\"> </button>"), qC = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><!> <!></div>"), JC = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"primary-button svelte-pcnttw\">Park until macOS is available</button></div>"), YC = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\"> </button><button class=\"primary-button svelte-pcnttw\"> </button></div>"), XC = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><!></div>"), ZC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span> <!>", 1), QC = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">Outside the active service queue.</span><button class=\"outline-button compact svelte-pcnttw\">Restore to inbox</button>", 1), $C = /* @__PURE__ */ K("<article><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><strong class=\"svelte-pcnttw\"> </strong></div> <b> </b></header> <p class=\"svelte-pcnttw\"> </p> <!> <!> <div class=\"custody-item-facts svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <!></div> <details class=\"custody-contract svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect acceptance contract <strong class=\"svelte-pcnttw\"> </strong></summary> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ACCEPT WHEN</span><ul class=\"svelte-pcnttw\"></ul></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ALLOWED PATHS</span><code class=\"svelte-pcnttw\"> </code></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">HARD STOP</span><p class=\"svelte-pcnttw\"> </p></div></details> <!> <!> <footer class=\"svelte-pcnttw\"><!></footer></article>"), ew = /* @__PURE__ */ K("<div class=\"custody-inbox svelte-pcnttw\"></div>"), tw = /* @__PURE__ */ K("<div class=\"custody-empty svelte-pcnttw\"><strong class=\"svelte-pcnttw\">No custody contracts are queued</strong><p class=\"svelte-pcnttw\">Future strategy reviews can stage bounded candidates here. Until then, the service has no authority and consumes no resources.</p></div>"), nw = /* @__PURE__ */ K("<li class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><div class=\"svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><small class=\"svelte-pcnttw\"> </small></div></li>"), rw = /* @__PURE__ */ K("<details class=\"custody-protocol-history svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Custody lease and receipt history <strong> </strong></summary><ol class=\"svelte-pcnttw\"></ol></details>"), iw = /* @__PURE__ */ K("<div class=\"custody-violations svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><!></div>"), aw = /* @__PURE__ */ K("<div role=\"status\"> </div>"), ow = /* @__PURE__ */ K("<details id=\"custody-service\" class=\"custody-service svelte-pcnttw\"><summary class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"><small class=\"svelte-pcnttw\">CUSTODY SERVICE</small><strong class=\"svelte-pcnttw\"> </strong></span> <span class=\"custody-summary-counts svelte-pcnttw\"><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><i class=\"svelte-pcnttw\">SEPARATE EXECUTOR</i></span></summary> <div class=\"custody-body svelte-pcnttw\"><div class=\"custody-boundary svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ADAPTER</span><strong class=\"svelte-pcnttw\">Terra local steward</strong><small class=\"svelte-pcnttw\"> </small></div> <p class=\"svelte-pcnttw\">Terra may repair small mechanical or mathematical mistakes only inside the listed paths and acceptance checks. It cannot choose direction, spawn children, promote claims, merge, or push.</p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">AUTOPILOT RULE</span><strong class=\"svelte-pcnttw\">Land verified custody</strong><small class=\"svelte-pcnttw\">active loop may dispatch · only exact landable receipts integrate</small></div></div> <!> <!> <!> <!></div></details>");
function sw(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(""), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I("pending");
	function d(e) {
		let t = String(U(o)?.loop?.error || "");
		return /automatic retry limit/i.test(t) && (!e.task || t.includes(e.task));
	}
	function f(e) {
		return (U(s)?.protocol?.leases || []).filter((t) => t.itemId === e.id);
	}
	function p(e) {
		let t = f(e), n = [e.receipt, ...t.map((e) => e.receipt)].filter(Boolean).sort((e, t) => (t?.checks?.length || 0) - (e?.checks?.length || 0))[0] || {}, r = t.find((e) => Number.isFinite(Number(e.receipt?.usage?.tokens)))?.receipt?.usage?.tokens;
		return xc(e) ? {
			state: "LEASE POLICY UPDATED",
			summary: "This steward stopped with zero changes because fixed App Server context consumed most of the old " + bc(e).toLocaleString() + "-token total-turn lease.",
			next: "Retry the unchanged contract under the corrected " + Number(e.tokenCap).toLocaleString() + "-token envelope after a fresh epoch has spendable capacity. This is a resource correction, not another mathematical split.",
			attempts: t.length,
			tokens: r,
			kind: "rebudget"
		} : d(e) ? {
			state: "CONTRACT TOO LARGE",
			summary: "Four bounded attempts stopped without landing campaign changes. Lease integrity and the frozen producer blobs were verified, but the consolidated replay crossed its token ceiling and combines too many checks for one custody turn.",
			next: "Stop at this boundary. Keep the dependency, then split manifest/provenance verification from the exact replay and resource-scope check.",
			attempts: t.length,
			tokens: r,
			kind: "reshape"
		} : Cc(e) ? {
			state: "CONTRACT TOO LARGE",
			summary: n.summary || "The custody executor crossed this contract's fixed token ceiling without landing changes.",
			next: "Replace this oversized contract with smaller dependency-preserving checks. Do not retry the same shape.",
			attempts: t.length,
			tokens: r,
			kind: "reshape"
		} : e.capability === "portability" && /macOS|Windows/i.test(`${n.summary || ""} ${n.stopReason || ""}`) ? {
			state: "ADAPTER UNAVAILABLE",
			summary: n.summary || "This Windows steward cannot perform a genuine macOS verification.",
			next: "Park it until a macOS steward is connected. This item is non-blocking and does not need to hold the campaign.",
			attempts: t.length,
			tokens: r,
			kind: "wait-for-mac"
		} : /lease|hash|digest/i.test(`${n.summary || ""} ${n.stopReason || ""}`) && !(n.effects?.changedPaths || []).length ? {
			state: "SAFE TO RETRY",
			summary: n.summary || "The prior steward stopped before making changes because the old controller supplied an ambiguous lease-hash check.",
			next: "Retry with Terra. The byte-hash instruction and per-turn token meter are now corrected; the same acceptance contract remains in force.",
			attempts: t.length,
			tokens: r,
			kind: "retry"
		} : {
			state: "REVIEW REQUIRED",
			summary: n.summary || e.reason,
			next: "Inspect the exact receipt before retrying or changing this dependency.",
			attempts: t.length,
			tokens: r,
			kind: "review"
		};
	}
	function m(e) {
		return (U(s)?.items || []).find((t) => t.id !== e.id && (["assigned", "verifying"].includes(t.status) || [
			"confirmed",
			"dispatching",
			"running",
			"finalizing",
			"awaiting_review"
		].includes(t.activeLease?.status))) || null;
	}
	async function h() {
		if (!(!U(o) || U(c) || ![
			"running",
			"paused",
			"attention"
		].includes(U(o).loop?.status || ""))) {
			L(c, "loop:stop"), L(u, "pending"), L(l, "Stopping autopilot while preserving the current custody boundary…");
			try {
				await as({
					projectId: U(o).id,
					type: "loop.stop",
					scope: "custody-contract-reshape"
				}), L(u, "success"), L(l, "Autopilot stopped here. The failed receipts and dependency remain preserved for contract splitting.");
			} catch (e) {
				L(u, "error"), L(l, e instanceof Error ? e.message : String(e));
			} finally {
				L(c, "");
			}
		}
	}
	async function g(e, t) {
		if (!(!U(o) || U(c) || t.length < 2)) {
			L(c, `${e.id}:reshape`), L(u, "pending"), L(l, `Replacing the oversized contract with ${t.length} bounded successors…`);
			try {
				await as({
					projectId: U(o).id,
					type: "custody.item.reshape",
					targetId: e.id,
					args: { children: t },
					scope: "custody-contract-reshape"
				}), L(u, "success"), L(l, `The oversized contract was superseded by ${t.length} bounded checks. No steward was started and no campaign artifact changed.`);
			} catch (e) {
				L(u, "error"), L(l, e instanceof Error ? e.message : String(e));
			} finally {
				L(c, "");
			}
		}
	}
	async function _(e, t, n = !1) {
		if (!U(o) || U(c) || t === "park" && e.blocksResearch && !window.confirm("Parking removes this required custody dependency from the active research gate. Continue only if the dependency is no longer wanted.")) return;
		let r = t.startsWith("lease."), i = t.startsWith("receipt."), a = r || i ? `custody.${t}` : `custody.item.${t}`, s = t === "lease.prepare" ? e.id : r ? e.activeLease?.id || "" : e.id, d = i ? e.activeLease?.id || "" : s;
		if (d) {
			L(c, `${d}:${t}`), L(u, "pending"), L(l, t === "promote" ? "Checking the immutable custody contract…" : t === "park" ? "Parking this service item…" : t === "restore" ? "Returning this item to the proposed inbox…" : t === "lease.prepare" ? "Freezing the exact revision-bound custody lease…" : t === "lease.confirm" ? "Confirming the exact lease digest…" : t === "lease.dispatch" ? "Creating the detached worktree and starting one Terra steward…" : t === "lease.reconcile" ? "Reconciling the App Server turn and durable custody receipt…" : t === "lease.simulate" ? "Generating a deterministic zero-effect protocol receipt…" : t === "lease.replay" ? "Replaying and verifying the persisted lease and receipt digests…" : t === "receipt.land" ? "Rechecking and landing the exact isolated producer commit…" : "Rejecting this receipt without landing its changes…");
			try {
				let i = await as({
					projectId: U(o).id,
					type: a,
					targetId: d,
					scope: "custody-service",
					args: t === "lease.confirm" || t === "lease.dispatch" ? { leaseDigest: e.activeLease?.leaseDigest } : t === "receipt.land" || t === "receipt.reject" ? {
						receiptDigest: e.activeLease?.receiptDigest,
						reason: t === "receipt.reject" ? "Operator rejected the isolated custody result at its landing gate." : void 0
					} : { note: t === "promote" ? "Operator approved the bounded custody contract for separate steward handoff." : r ? "Operator exercised the custody lease protocol." : "Operator changed custody inbox disposition." }
				});
				if (t === "promote" && n) {
					let t = i.project.custody?.items?.find((t) => t.id === e.id);
					t?.status === "ready" && !t.activeLease && (i = await as({
						projectId: U(o).id,
						type: "custody.lease.prepare",
						targetId: e.id,
						scope: "custody-service-retry"
					}));
					let n = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					n?.status === "prepared" && (i = await as({
						projectId: U(o).id,
						type: "custody.lease.confirm",
						targetId: n.id,
						args: { leaseDigest: n.leaseDigest },
						scope: "custody-service-retry"
					}));
					let r = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					r?.status === "confirmed" && await as({
						projectId: U(o).id,
						type: "custody.lease.dispatch",
						targetId: r.id,
						args: { leaseDigest: r.leaseDigest },
						scope: "custody-service-retry"
					});
				}
				L(u, "success"), L(l, t === "promote" && n ? "A fresh exact lease is running with Terra under the unchanged custody contract." : t === "promote" ? "Marked ready. No steward was started and campaign execution was not changed." : t === "park" ? "Item parked outside the active service inbox." : t === "restore" ? "Item restored as a proposed custody contract." : t === "lease.prepare" ? "Immutable lease prepared. No steward has started; review and confirm the exact digest next." : t === "lease.confirm" ? "Exact lease confirmed. The slot is reserved, but no steward has started yet." : t === "lease.dispatch" ? "One Terra steward started inside the lease-bound detached worktree." : t === "lease.reconcile" ? "The interrupted steward state was reconciled into a durable receipt boundary." : t === "lease.simulate" ? "Deterministic zero-effect receipt recorded. The custody item remains ready." : t === "lease.replay" ? "Lease and receipt replay verified with no real effects." : t === "receipt.land" ? "The reviewed custody receipt landed locally. Nothing was pushed and no claim was promoted." : "Receipt rejected. Its isolated worktree was not landed.");
			} catch (e) {
				L(u, "error"), L(l, e instanceof Error ? e.message : String(e));
			} finally {
				L(c, "");
			}
		}
	}
	V(() => n(), () => {
		L(o, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(o), () => {
		L(s, U(o)?.custody || null);
	}), V(() => U(s), () => {
		L(a, U(s)?.items?.filter((e) => e.status !== "complete") || []);
	}), Br(), xo();
	var v = ua(), y = z(v), b = (e) => {
		var t = ow(), n = R(t), r = R(n), i = B(R(r)), f = R(i, !0);
		P(i), P(r);
		var v = B(r, 2), y = R(v), b = R(y);
		P(y);
		var x = B(y), S = R(x);
		P(x);
		var C = B(x), w = R(C);
		P(C);
		var T = B(C), E = R(T);
		P(T), Ke(), P(v), P(n);
		var D = B(n, 2), O = R(D), k = R(O), A = B(R(k), 2), j = R(A, !0);
		P(A), P(k), Ke(4), P(O);
		var ee = B(O, 2), M = (e) => {
			var t = ew();
			X(t, 5, () => U(a), (e) => e.id, (e, t) => {
				let n = /* @__PURE__ */ Cn(() => (U(t), W(() => p(U(t))))), r = /* @__PURE__ */ Cn(() => (U(t), W(() => m(U(t))))), i = /* @__PURE__ */ Cn(() => (Si(wc), U(t), W(() => wc(U(t))))), a = /* @__PURE__ */ Cn(() => (Si(Cc), U(t), U(o), W(() => Cc(U(t), String(U(o)?.loop?.error || ""))))), l = /* @__PURE__ */ Cn(() => (U(o), U(t), W(() => Number(U(o)?.resources?.ledger?.remainingBeforeCommitments || 0) >= Number(U(t).tokenCap || 0))));
				var u = $C();
				let f;
				var v = R(u), y = R(v), b = R(y), x = R(b);
				P(b);
				var S = B(b), C = R(S, !0);
				P(S), P(y);
				var w = B(y, 2), T = R(w, !0);
				P(w), P(v);
				var E = B(v, 2), D = R(E, !0);
				P(E);
				var O = B(E, 2), k = (e) => {
					var n = EC(), r = B(R(n));
					P(n), H(() => J(r, ` ${U(t), W(() => U(t).inputReadiness.reason) ?? ""}`)), q(e, n);
				};
				Y(O, (e) => {
					U(t), W(() => U(t).inputReadiness?.ready === !1) && e(k);
				});
				var A = B(O, 2), j = (e) => {
					var n = DC(), r = R(n);
					P(n), H((e) => J(r, `Entire repair family: ${U(t), W(() => U(t).lineageCost.attempts) ?? ""} attempts · ${e ?? ""} known tokens · ${U(t), W(() => U(t).lineageCost.unreported) ?? ""} unknown · ${U(t), W(() => U(t).lineageCost.landed) ?? ""} landed`), [() => (U(t), W(() => Number(U(t).lineageCost.knownTokens).toLocaleString()))]), q(e, n);
				};
				Y(A, (e) => {
					U(t), W(() => U(t).lineageCost) && e(j);
				});
				var ee = B(A, 2), M = R(ee), N = R(M, !0);
				P(M);
				var te = B(M, 2), ne = R(te);
				P(te);
				var re = B(te, 2), ie = R(re);
				P(re);
				var ae = B(re, 2), oe = R(ae, !0);
				P(ae);
				var se = B(ae, 2), ce = (e) => {
					var n = OC(), r = R(n);
					P(n), H(() => J(r, `waiting on ${U(t), W(() => U(t).missingDependencies?.length || 1) ?? ""} predecessor receipt${U(t), W(() => U(t).missingDependencies?.length === 1 ? "" : "s") ?? ""}`)), q(e, n);
				};
				Y(se, (e) => {
					U(t), W(() => !U(t).dependenciesSatisfied) && e(ce);
				}), P(ee);
				var le = B(ee, 2), ue = R(le), de = B(R(ue)), fe = R(de, !0);
				P(de), P(ue);
				var pe = B(ue, 2), me = B(R(pe));
				X(me, 5, () => (U(t), W(() => U(t).acceptance.acceptanceCriteria)), ya, (e, t) => {
					var n = kC(), r = R(n, !0);
					P(n), H(() => J(r, U(t))), q(e, n);
				}), P(me), P(pe);
				var he = B(pe, 2), ge = B(R(he)), _e = R(ge, !0);
				P(ge), P(he);
				var ve = B(he, 2), ye = B(R(ve)), be = R(ye, !0);
				P(ye), P(ve), P(le);
				var xe = B(le, 2), Se = (e) => {
					var t = AC(), r = R(t), i = B(R(r)), a = R(i, !0);
					P(i), P(r);
					var o = B(r, 2), s = R(o, !0);
					P(o);
					var c = B(o, 2), l = B(R(c)), u = R(l, !0);
					P(l), P(c);
					var d = B(c, 2), f = R(d);
					P(d), P(t), H((e) => {
						Z(t, 1, (Si(U(n)), W(() => `custody-failure ${U(n).kind}`)), "svelte-pcnttw"), J(a, (Si(U(n)), W(() => U(n).state))), J(s, (Si(U(n)), W(() => U(n).summary))), J(u, (Si(U(n)), W(() => U(n).next))), J(f, `${Si(U(n)), W(() => U(n).attempts) ?? ""} lease attempt${Si(U(n)), W(() => U(n).attempts === 1 ? "" : "s") ?? ""}${e ?? ""} · 0 changes landed`);
					}, [() => (Si(U(n)), W(() => U(n).tokens ? ` · latest measured ${Number(U(n).tokens).toLocaleString()} tokens` : ""))]), q(e, t);
				}, Ce = /* @__PURE__ */ F(() => (U(t), W(() => ["blocked", "failed"].includes(U(t).status))));
				Y(xe, (e) => {
					U(Ce) && e(Se);
				});
				var we = B(xe, 2), Te = (e) => {
					var n = BC(), o = z(n);
					let l;
					var u = R(o), d = R(u), f = R(d, !0);
					P(d);
					var p = B(d, 2), m = R(p, !0);
					P(p);
					var h = B(p, 2), v = R(h, !0);
					P(h), P(u);
					var y = B(u, 2), b = (e) => {
						var n = jC(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).id}:lease.prepare` ? "Freezing…" : "Freeze custody lease")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.prepare")), q(e, n);
					}, x = (e) => {
						var n = MC(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.simulate` ? "Simulating…" : "Simulate zero-effect receipt")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.simulate")), q(e, n);
					}, S = (e) => {
						var n = ua(), r = z(n), a = (e) => {
							var n = jC(), r = R(n, !0);
							P(n), H((e) => {
								n.disabled = e, J(r, (U(c), U(t), Si(U(i)), W(() => U(c) === `${U(t).id}:reshape` ? "Splitting…" : `Split into ${U(i).length} bounded checks`)));
							}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => g(U(t), U(i))), q(e, n);
						}, o = (e) => {
							q(e, NC());
						};
						Y(r, (e) => {
							Si(U(i)), W(() => U(i).length) ? e(a) : e(o, -1);
						}), q(e, n);
					}, C = (e) => {
						q(e, PC());
					}, w = (e) => {
						var n = jC(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.confirm` ? "Confirming…" : "Confirm exact lease")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.confirm")), q(e, n);
					}, T = (e) => {
						var n = IC(), r = z(n), i = (e) => {
							var t = FC(), n = R(t, !0);
							P(t), H(() => J(n, (U(s), W(() => U(s).runtimeAdmission.reason)))), q(e, t);
						};
						Y(r, (e) => {
							U(s), W(() => U(s).runtimeAdmission?.ready === !1) && e(i);
						});
						var a = B(r, 2), o = R(a, !0);
						P(a), H((e) => {
							a.disabled = e, J(o, (U(s), U(c), U(t), W(() => U(s).runtimeAdmission?.ready === !1 ? "Custody launch held" : U(c) === `${U(t).activeLease.id}:lease.dispatch` ? "Starting…" : "Dispatch Terra steward")));
						}, [() => (U(c), U(s), W(() => !!U(c) || U(s).runtimeAdmission?.ready === !1))]), G("click", a, () => _(U(t), "lease.dispatch")), q(e, n);
					}, E = (e) => {
						var n = MC(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.reconcile` ? "Reconciling…" : "Recheck interrupted steward")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.reconcile")), q(e, n);
					}, D = /* @__PURE__ */ F(() => (U(t), W(() => ["running", "finalizing"].includes(U(t).activeLease.status) && Date.now() - Date.parse(U(t).activeLease.updatedAt || U(t).activeLease.startedAt || "") >= 6e4))), O = (e) => {
						var n = MC(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.replay` ? "Verifying replay…" : "Replay & verify receipt")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.replay")), q(e, n);
					};
					Y(y, (e) => {
						U(t), W(() => !U(t).activeLease) ? e(b) : (U(t), W(() => U(t).activeLease.lease?.adapter?.executionMode === "disconnected" && U(t).activeLease.status === "prepared") ? e(x, 1) : (U(t), Si(U(a)), W(() => U(t).activeLease.status === "prepared" && U(a)) ? e(S, 2) : (U(t), Si(U(r)), W(() => U(t).activeLease.status === "prepared" && U(r)) ? e(C, 3) : (U(t), W(() => U(t).activeLease.status === "prepared") ? e(w, 4) : (U(t), W(() => U(t).activeLease.status === "confirmed") ? e(T, 5) : U(D) ? e(E, 6) : (U(t), W(() => U(t).activeLease.status === "simulated") && e(O, 7)))))));
					}), P(o);
					var k = B(o, 2), A = (e) => {
						var n = zC(), r = R(n), i = R(r), a = B(R(i)), o = R(a, !0);
						P(a), P(i);
						var s = B(i), l = R(s, !0);
						P(s), P(r);
						var u = B(r, 2), d = R(u), f = R(d);
						P(d);
						var p = B(d), m = R(p);
						P(p);
						var h = B(p), g = R(h);
						P(h);
						var v = B(h), y = R(v);
						P(v), P(u);
						var b = B(u, 2), x = (e) => {
							var n = LC(), r = R(n, !0);
							P(n), H((e) => J(r, e), [() => (U(t), W(() => U(t).activeLease.receipt.effects.changedPaths.join(" · ")))]), q(e, n);
						};
						Y(b, (e) => {
							U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length) && e(x);
						});
						var S = B(b, 2), C = B(R(S)), w = B(R(C)), T = R(w, !0);
						P(w);
						var E = B(w, 2), D = R(E, !0);
						P(E), X(B(E), 1, () => (U(t), W(() => U(t).activeLease.receipt?.checks || [])), ya, (e, t) => {
							var n = RC(), r = z(n), i = R(r, !0);
							P(r);
							var a = B(r), o = R(a, !0);
							P(a), H(() => {
								J(i, (U(t), W(() => U(t).status))), J(o, (U(t), W(() => U(t).detail)));
							}), q(e, n);
						}), P(C), P(S);
						var O = B(S, 2), k = R(O), A = B(k), j = R(A, !0);
						P(A), P(O), Ke(2), P(n), H((e, n, r) => {
							J(o, (U(t), W(() => U(t).activeLease.receipt?.summary || "Custody result ready"))), J(l, (U(t), W(() => U(t).activeLease.receipt?.status))), J(f, `${U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length || 0) ?? ""} changed path${U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length === 1 ? "" : "s") ?? ""}`), J(m, `${U(t), W(() => U(t).activeLease.receipt?.usage?.tokens ?? "unmetered") ?? ""} tokens`), J(g, `${e ?? ""} min`), J(y, `${U(t), W(() => U(t).activeLease.verification?.warnings?.length || 0) ?? ""} warning${U(t), W(() => U(t).activeLease.verification?.warnings?.length === 1 ? "" : "s") ?? ""}`), J(T, (U(t), W(() => U(t).activeLease.producerCommit || "verification-only · no file commit"))), J(D, (U(t), W(() => U(t).activeLease.worktreePath))), k.disabled = n, A.disabled = r, J(j, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:receipt.land` ? "Landing…" : U(t).activeLease.producerCommit ? "Accept & land locally" : "Accept verification receipt")));
						}, [
							() => (U(t), W(() => Math.ceil(U(t).activeLease.receipt?.usage?.minutes || 0))),
							() => (U(c), W(() => !!U(c))),
							() => (U(c), U(t), W(() => !!U(c) || !U(t).activeLease.verification?.landable))
						]), G("click", k, () => _(U(t), "receipt.reject")), G("click", A, () => _(U(t), "receipt.land")), q(e, n);
					};
					Y(k, (e) => {
						U(t), W(() => U(t).activeLease?.status === "awaiting_review") && e(A);
					}), H(() => {
						l = Z(o, 1, "custody-protocol-lab execution svelte-pcnttw", null, l, { attention: U(t).activeLease?.status === "awaiting_review" }), J(f, (U(t), Si(U(a)), Si(U(r)), W(() => U(t).activeLease?.status === "prepared" && U(a) ? "CONTRACT RESHAPE REQUIRED" : U(t).activeLease?.status === "prepared" && U(r) ? "QUEUED CUSTODY LEASE" : U(t).activeLease?.status === "awaiting_review" ? "RECEIPT LANDING GATE" : U(t).activeLease?.status === "running" || U(t).activeLease?.status === "finalizing" ? "ISOLATED STEWARD ACTIVE" : "CUSTODY ACTION RAIL"))), J(m, (U(t), Si(U(a)), Si(U(i)), Si(U(r)), W(() => U(t).activeLease ? U(t).activeLease.status === "prepared" && U(a) ? U(i).length ? `Replace with ${U(i).length} bounded successor checks` : "Hold for a smaller successor contract" : U(t).activeLease.status === "prepared" && U(r) ? `Waiting for ${U(r).task}` : U(t).activeLease.status === "prepared" ? "2. Confirm this revision and contract" : U(t).activeLease.status === "confirmed" ? "3. Dispatch one bounded Terra steward" : U(t).activeLease.status === "running" ? "Steward working in detached custody" : U(t).activeLease.status === "finalizing" ? "Measuring paths, usage, and checks" : U(t).activeLease.status === "awaiting_review" ? "4. Review and land—or reject" : `Lease ${U(t).activeLease.status}` : "1. Freeze the exact lease"))), J(v, (U(t), Si(U(a)), Si(U(r)), W(() => U(t).activeLease?.status === "prepared" && U(a) ? "Prior zero-effect attempts exceeded the lease. This supersedes the prepared retry without bypassing its dependency." : U(t).activeLease?.status === "prepared" && U(r) ? "This immutable lease is preserved. Autopilot will continue it after the active receipt releases the single Terra slot." : U(t).activeLease?.receiptDigest || U(t).activeLease?.leaseDigest || "Preparing a lease changes no files and starts no worker.")));
					}), q(e, n);
				}, Ee = /* @__PURE__ */ F(() => (U(t), W(() => [
					"ready",
					"assigned",
					"verifying"
				].includes(U(t).status))));
				Y(we, (e) => {
					U(Ee) && e(Te);
				});
				var De = B(we, 2), Oe = R(De), ke = (e) => {
					var n = VC(), r = z(n), i = B(r, 2), a = R(i, !0);
					P(i), H((e, n) => {
						r.disabled = e, i.disabled = n, J(a, (U(c), U(t), W(() => U(c) === `${U(t).id}:promote` ? "Checking contract…" : U(t).dependenciesSatisfied ? "Mark ready for steward" : `Waiting for ${U(t).missingDependencies?.[0]?.task || "predecessor"}`)));
					}, [() => (U(c), W(() => !!U(c))), () => (U(c), U(t), W(() => !!U(c) || !U(t).eligibleToReady))]), G("click", r, () => _(U(t), "park")), G("click", i, () => _(U(t), "promote")), q(e, n);
				}, Ae = (e) => {
					var n = HC(), r = z(n), i = R(r, !0);
					P(r);
					var a = B(r);
					H((e) => {
						J(i, (U(t), W(() => U(t).activeLease ? "Lease sequence is controlled above." : "Eligible for the separate custody executor; still not dispatched."))), a.disabled = e;
					}, [() => (U(c), U(t), W(() => !!U(c) || !!U(t).activeLease))]), G("click", a, () => _(U(t), "park")), q(e, n);
				}, je = (e) => {
					q(e, UC());
				}, Me = (e) => {
					q(e, WC());
				}, Ne = (e) => {
					var r = ZC(), a = z(r), s = R(a, !0);
					P(a);
					var u = B(a, 2), f = (e) => {
						var n = GC(), r = R(n), i = R(r, !0);
						P(r), P(n), H((e) => {
							r.disabled = e, J(i, U(c) ? "Starting Terra…" : U(l) ? "Retry with corrected lease" : "Fresh epoch required");
						}, [() => (U(c), Si(U(l)), U(t), W(() => !!U(c) || !U(l) || !U(t).eligibleToRetry))]), G("click", r, () => _(U(t), "promote", !0)), q(e, n);
					}, p = (e) => {
						var n = qC(), r = R(n), a = (e) => {
							var n = KC(), r = R(n, !0);
							P(n), H((e) => {
								n.disabled = e, J(r, (U(c), U(t), Si(U(i)), W(() => U(c) === `${U(t).id}:reshape` ? "Splitting…" : `Split into ${U(i).length} bounded checks`)));
							}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => g(U(t), U(i))), q(e, n);
						};
						Y(r, (e) => {
							Si(U(i)), W(() => U(i).length) && e(a);
						});
						var s = B(r, 2), l = (e) => {
							var t = MC(), n = R(t, !0);
							P(t), H((e) => {
								t.disabled = e, J(n, U(c) === "loop:stop" ? "Stopping…" : "Stop at this boundary");
							}, [() => (U(c), W(() => !!U(c)))]), G("click", t, h), q(e, t);
						}, u = /* @__PURE__ */ F(() => (U(o), W(() => [
							"running",
							"paused",
							"attention"
						].includes(U(o)?.loop?.status || ""))));
						Y(s, (e) => {
							U(u) && e(l);
						}), P(n), q(e, n);
					}, m = (e) => {
						var n = JC(), r = R(n);
						P(n), H((e) => r.disabled = e, [() => (U(c), W(() => !!U(c)))]), G("click", r, () => _(U(t), "park")), q(e, n);
					}, v = (e) => {
						var n = YC(), r = R(n), i = R(r, !0);
						P(r);
						var a = B(r), o = R(a, !0);
						P(a), P(n), H((e, n) => {
							r.disabled = e, J(i, (U(t), W(() => U(t).blocksResearch ? "Remove dependency…" : "Park"))), a.disabled = n, J(o, U(c) ? "Starting Terra…" : "Retry with Terra");
						}, [() => (U(c), W(() => !!U(c))), () => (U(c), U(t), W(() => !!U(c) || !U(t).eligibleToRetry))]), G("click", r, () => _(U(t), "park")), G("click", a, () => _(U(t), "promote", !0)), q(e, n);
					}, y = (e) => {
						var t = XC(), n = R(t), r = (e) => {
							var t = MC(), n = R(t, !0);
							P(t), H((e) => {
								t.disabled = e, J(n, U(c) === "loop:stop" ? "Stopping…" : "Stop at this boundary");
							}, [() => (U(c), W(() => !!U(c)))]), G("click", t, h), q(e, t);
						}, i = /* @__PURE__ */ F(() => (U(o), W(() => [
							"running",
							"paused",
							"attention"
						].includes(U(o)?.loop?.status || ""))));
						Y(n, (e) => {
							U(i) && e(r);
						}), P(t), q(e, t);
					};
					Y(u, (e) => {
						Si(U(n)), W(() => U(n).kind === "rebudget") ? e(f) : (Si(U(n)), W(() => U(n).kind === "reshape") ? e(p, 1) : (Si(U(n)), W(() => U(n).kind === "wait-for-mac") ? e(m, 2) : (Si(U(n)), W(() => U(n).kind === "retry") ? e(v, 3) : e(y, -1))));
					}), H((e) => J(s, e), [() => (Si(U(n)), Si(U(l)), U(t), W(() => U(n).kind === "rebudget" ? U(l) ? "The corrected total-turn envelope is available. Retry this exact zero-effect contract once." : "The lease policy is corrected, but the current epoch is exhausted. Open a fresh resource envelope from the primary action rail first." : d(U(t)) ? "Automatic retries are exhausted. Split or resize this exact contract; parking would bypass the dependency." : U(t).receipt?.effects?.changedPaths?.length ? "The steward stopped after bounded changes; inspect before retrying." : "Nothing landed. Retry the same bounded contract, or park only if this dependency is no longer wanted."))]), q(e, r);
				}, Pe = /* @__PURE__ */ F(() => (U(t), W(() => ["blocked", "failed"].includes(U(t).status)))), Fe = (e) => {
					var n = QC(), r = B(z(n));
					H((e) => r.disabled = e, [() => (U(c), W(() => !!U(c)))]), G("click", r, () => _(U(t), "restore")), q(e, n);
				};
				Y(Oe, (e) => {
					U(t), W(() => U(t).status === "proposed") ? e(ke) : (U(t), W(() => U(t).status === "ready") ? e(Ae, 1) : (U(t), W(() => U(t).status === "assigned") ? e(je, 2) : (U(t), W(() => U(t).status === "verifying") ? e(Me, 3) : U(Pe) ? e(Ne, 4) : (U(t), W(() => U(t).status === "parked") && e(Fe, 5)))));
				}), P(De), P(u), H((e, n) => {
					f = Z(u, 1, "svelte-pcnttw", null, f, {
						blocking: U(t).blocksResearch,
						parked: U(t).status === "parked"
					}), J(x, `${U(t), W(() => U(t).urgency) ?? ""} · ${U(t), W(() => U(t).capability) ?? ""} · ${U(t), W(() => U(t).strategicTrack) ?? ""}`), J(C, (U(t), W(() => U(t).task))), Z(w, 1, (U(t), W(() => `custody-status-${U(t).status}`)), "svelte-pcnttw"), J(T, e), J(D, (U(t), W(() => U(t).reason))), J(N, (U(t), W(() => U(t).blocksResearch ? "BLOCKS RESEARCH" : "NON-BLOCKING"))), J(ne, `repair generation ${U(t), W(() => U(t).repairGeneration) ?? ""}/${U(s), W(() => U(s).policy.maxAutomaticRepairGeneration) ?? ""}`), J(ie, `${U(t), W(() => U(t).effortClass) ?? ""} effort`), J(oe, (U(t), W(() => U(t).contractComplete ? "contract complete" : "contract incomplete"))), J(fe, (U(t), W(() => U(t).acceptance.receiptType || "receipt missing"))), J(_e, n), J(be, (U(t), W(() => U(t).acceptance.stopCondition || "No stop condition declared")));
				}, [() => (U(t), W(() => U(t).status.toUpperCase())), () => (U(t), W(() => U(t).acceptance.allowedPaths.length ? U(t).acceptance.allowedPaths.join(" · ") : "No paths declared"))]), q(e, u);
			}), P(t), q(e, t);
		}, N = (e) => {
			q(e, tw());
		};
		Y(ee, (e) => {
			U(a), W(() => U(a).length) ? e(M) : e(N, -1);
		});
		var te = B(ee, 2), ne = (e) => {
			var t = rw(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(s), W(() => U(s).protocol.leases)), ya, (e, t) => {
				var n = nw(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e, n) => {
					J(i, e), J(s, (U(t), W(() => U(t).receiptDigest || U(t).leaseDigest))), J(l, `${U(t), W(() => U(t).adapterId) ?? ""} · ${n ?? ""}${U(t), W(() => U(t).producerCommit ? " · isolated commit frozen" : U(t).verification?.ok ? " · receipt verified" : "") ?? ""}`);
				}, [() => (U(t), W(() => U(t).status.toUpperCase())), () => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(s), W(() => U(s).protocol.leases.length) ?? ""} lease${U(s), W(() => U(s).protocol.leases.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(te, (e) => {
			U(s), W(() => U(s).protocol?.leases?.length) && e(ne);
		});
		var re = B(te, 2), ie = (e) => {
			var t = iw(), n = R(t), r = R(n);
			P(n), X(B(n), 1, () => (U(s), W(() => U(s).violations)), ya, (e, t) => {
				var n = DC(), r = R(n, !0);
				P(n), H(() => J(r, (U(t), W(() => U(t).detail)))), q(e, n);
			}), P(t), H(() => J(r, `${U(s), W(() => U(s).violations.length) ?? ""} contract warning${U(s), W(() => U(s).violations.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(re, (e) => {
			U(s), W(() => U(s).violations?.length) && e(ie);
		});
		var ae = B(re, 2), oe = (e) => {
			var t = aw(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `custody-feedback ${U(u) ?? ""}`, "svelte-pcnttw"), J(n, U(l));
			}), q(e, t);
		};
		Y(ae, (e) => {
			U(l) && e(oe);
		}), P(D), P(t), H(() => {
			t.open = (U(s), W(() => U(s).counts.open > 0)), J(f, (U(s), W(() => U(s).counts.open ? `${U(s).counts.open} item${U(s).counts.open === 1 ? "" : "s"} in the service inbox` : "Mechanical work has its own boundary"))), J(b, `${U(s), W(() => U(s).counts.blocking) ?? ""} blocking`), J(S, `${U(s), W(() => U(s).counts.active) ?? ""} active`), J(w, `${U(s), W(() => U(s).counts.landed || 0) ?? ""} landed`), J(E, `${U(s), W(() => U(s).counts.superseded || 0) ?? ""} superseded`), J(j, (U(s), W(() => U(s).runtimeAdmission?.ready === !1 ? "new launches held · runtime limits unverified" : U(s).executorConnected ? "ready on demand · isolated worktree" : "simulation only")));
		}), q(e, t);
	};
	Y(y, (e) => {
		U(s) && e(b);
	}), q(e, v), xt(), i();
}
//#endregion
//#region src/ui/App.svelte
$i(["click"]), Go();
var cw = /* @__PURE__ */ K("<span class=\"access-identity\"><b> </b> </span>"), lw = /* @__PURE__ */ K("<section id=\"observer-lanes\" class=\"observer-surface all-jobs-surface\" aria-label=\"All observed agent lanes\"><header><div><p class=\"eyebrow\">ALL JOBS OVERVIEW</p><h2>Every visible lane, in one place</h2></div><span>Read-only across projects · choose a campaign to open its controls</span></header> <!></section>"), uw = /* @__PURE__ */ K("<!> <!> <!> <!> <!> <section class=\"workspace-switchboard\" aria-label=\"Campaign detail drawers\"><header><div><p class=\"eyebrow\">CAMPAIGN DETAIL</p><h2>Explore the campaign</h2></div><span>Evidence, direction, and background</span></header> <details id=\"campaign-context\" class=\"workspace-group\"><summary><span><small>OBJECTIVE & INPUTS</small><strong>Objective, background, and new inputs</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!> <!> <!></div></details> <details id=\"process-history\" class=\"workspace-group\"><summary><span><small>PROCESS MAP & HISTORY</small><strong>History and automation</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><details class=\"autopilot-ledger\"><summary><span><small>AUTOPILOT DETAIL</small><strong>Step ledger, frozen schedule, and advanced controls</strong></span><b>Expand</b></summary> <!> <!></details> <!></div></details> <details id=\"evidence-workspace\" class=\"workspace-group\"><summary><span><small>WAVE & EVIDENCE</small><strong>Results, receipts, and workers</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <!> <section id=\"observer-lanes\" class=\"observer-surface\" aria-label=\"Observed agent lanes\"><header><div><p class=\"eyebrow\">LANE OBSERVER</p><h2>Workers, receipts, and recent history</h2></div><span>Drill down without leaving campaign control</span></header> <!></section></div></details> <details id=\"strategy-workspaces\" class=\"workspace-group\"><summary><span><small>STRATEGY & BRANCHES</small><strong>Direction, budget, and alternatives</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <!> <!></div></details> <details id=\"system-workspace\" class=\"workspace-group\"><summary><span><small>SYSTEM & COORDINATION</small><strong>Settings and coordinator</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details></section>", 1), dw = /* @__PURE__ */ K("<header class=\"topbar\"><a class=\"topbar-brand\" href=\"/\" title=\"Open all jobs\"><p class=\"eyebrow\">CAMPAIGN CONTROL</p> <h1>Lane Watch</h1></a> <span class=\"topbar-context\">Research campaigns</span> <div class=\"connection-wrap\"><!> <button aria-label=\"Refresh all campaign and lane states\">↻</button> <span></span> <span> </span></div></header> <main><!></main>", 1);
function fw(e, t) {
	bt(t, !1);
	let n = () => Kt(Wo, "$campaignState", r), [r, i] = qt();
	Do(() => {
		let e = Uo(), t = us();
		return () => {
			e(), t();
		};
	}), xo();
	var a = dw(), o = z(a), s = R(o), c = B(s, 4), l = R(c), u = (e) => {
		var t = cw(), r = R(t), i = R(r, !0);
		P(r);
		var a = B(r, 1, !0);
		P(t), H((e) => {
			Q(t, "title", e), J(i, n().access.role), J(a, n().access.identity);
		}, [() => `${n().access.projects.includes("*") ? "Read all projects" : `Read ${n().access.projects.join(", ")}`} · ${n().access.mutableProjects.includes("*") ? "change all projects" : `change ${n().access.mutableProjects.join(", ") || "none"}`}`]), q(e, t);
	};
	Y(l, (e) => {
		n().access && e(u);
	});
	var d = B(l, 2);
	let f;
	var p = B(d, 2);
	let m;
	var h = B(p, 2), g = R(h, !0);
	P(h), P(c), P(o);
	var _ = B(o, 2), v = R(_), y = (e) => {
		var t = lw();
		As(B(R(t), 2), {}), P(t), q(e, t);
	}, b = (e) => {
		var t = uw(), n = z(t);
		yS(n, {});
		var r = B(n, 2);
		Vc(r, {});
		var i = B(r, 2);
		MS(i, {});
		var a = B(i, 2);
		TS(a, {});
		var o = B(a, 2);
		cc(o, {});
		var s = B(o, 2), c = B(R(s), 2), l = B(R(c), 2), u = R(l);
		KS(u, {});
		var d = B(u, 2);
		Kc(d, {}), vl(B(d, 2), {}), P(l), P(c);
		var f = B(c, 2), p = B(R(f), 2), m = R(p), h = B(R(m), 2);
		hS(h, {}), pS(B(h, 2), {}), P(m), Ux(B(m, 2), {}), P(p), P(f);
		var g = B(f, 2), _ = B(R(g), 2), v = R(_);
		pc(v, {});
		var y = B(v, 2);
		lu(y, {});
		var b = B(y, 2);
		sw(b, {});
		var x = B(b, 2);
		As(B(R(x), 2), {}), P(x), P(_), P(g);
		var S = B(g, 2), C = B(R(S), 2), w = R(C);
		zS(w, {});
		var T = B(w, 2);
		iC(T, {});
		var E = B(T, 2);
		TC(E, {}), Ml(B(E, 2), {}), P(C), P(S);
		var D = B(S, 2), O = B(R(D), 2), k = R(O);
		ru(k, {}), ql(B(k, 2), {}), P(O), P(D), P(s), q(e, t);
	};
	Y(v, (e) => {
		n().selectedProject ? e(b, -1) : e(y);
	}), P(_), H(() => {
		f = Z(d, 1, "refresh-button", null, f, { refreshing: n().connection === "refreshing" }), d.disabled = n().connection === "refreshing" || n().access?.canMutate === !1, Q(d, "title", n().access?.canMutate === !1 ? "Viewer access is read-only" : "Refresh all campaign and lane states"), m = Z(p, 1, "connection-dot", null, m, {
			connecting: n().connection === "connecting" || n().connection === "refreshing",
			offline: n().connection === "offline" || n().connection === "reconnecting"
		}), J(g, n().connectionLabel);
	}), G("click", s, (e) => {
		e.preventDefault(), Io("");
	}), G("click", d, () => Vo().catch(() => void 0)), q(e, a), xt(), i();
}
//#endregion
//#region src/ui/main.ts
$i(["click"]), da(fw, { target: document.querySelector("#app") });
//#endregion
