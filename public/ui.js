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
})), Ne, Pe, Fe, Ie = t((() => {
	Ne = {}, Pe = Symbol("uninitialized"), Fe = "http://www.w3.org/1999/xhtml";
}));
function Le() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Re(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function ze() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Be() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
var Ve = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
function He(e) {
	Je = e;
}
function Ue(e) {
	if (e === null) throw Re(), Ne;
	return Ye = e;
}
function We() {
	return Ue(/* @__PURE__ */ _r(Ye));
}
function P(e) {
	if (Je) {
		if (/* @__PURE__ */ _r(Ye) !== null) throw Re(), Ne;
		Ye = e;
	}
}
function Ge(e = 1) {
	if (Je) {
		for (var t = e, n = Ye; t--;) n = /* @__PURE__ */ _r(n);
		Ye = n;
	}
}
function Ke(e = !0) {
	for (var t = 0, n = Ye;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ _r(n);
		e && n.remove(), n = i;
	}
}
function qe(e) {
	if (!e || e.nodeType !== 8) throw Re(), Ne;
	return e.data;
}
var Je, Ye, Xe = t((() => {
	_e(), Ie(), Ve(), Dr(), Je = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ze(e) {
	return e === this.v;
}
function Qe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function $e(e) {
	return !Qe(e, this.v);
}
var et = t((() => {}));
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
function tt() {
	rt = !0;
}
var nt, rt, it = t((() => {
	nt = !1, rt = !1;
})), at = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
function ot(e, t = !1, n = !1) {
	return st(e, /* @__PURE__ */ new Map(), "", ct, null, n);
}
function st(e, t, n, r, i = null, a = !1) {
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
				c in e && (s[c] = st(l, t, n, r, null, a));
			}
			return s;
		}
		if (x(e) === y) {
			s = {}, t.set(e, s), i !== null && t.set(i, s);
			for (var u of Object.keys(e)) s[u] = st(e[u], t, n, r, null, a);
			return s;
		}
		if (e instanceof Date) return structuredClone(e);
		if (typeof e.toJSON == "function" && !a) return st(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
var ct, lt = t((() => {
	i(), at(), w(), ct = [];
})), ut = t((() => {
	lt(), _e(), ni(), Fi();
})), dt = t((() => {
	i(), w(), ye();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/context.js
function ft(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function pt(e, t) {
	return e === null && ve(t), e.c ??= new Map(ft(e) || void 0);
}
var mt = t((() => {
	ye();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
function ht(e) {
	St = e;
}
function gt(e) {
	return pt(St, "getContext").get(e);
}
function _t(e, t) {
	let n = pt(St, "setContext");
	if (nt) {
		var r = Di.f;
		!Ti && r & 32 && !St.i || De();
	}
	return n.set(e, t), t;
}
function vt(e) {
	return pt(St, "hasContext").has(e);
}
function yt(e, t = !1, n) {
	St = {
		p: St,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Di,
		l: rt && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function bt(e) {
	var t = St, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Pr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, St = t.p, e ?? {};
}
function xt() {
	return !rt || St !== null && St.l === null;
}
var St, Ct = t((() => {
	i(), Me(), Fi(), ni(), it(), _e(), mt(), St = null;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
function wt() {
	var e = Dt;
	Dt = [], s(e);
}
function Tt(e) {
	if (Dt.length === 0 && !Wn) {
		var t = Dt;
		queueMicrotask(() => {
			t === Dt && wt();
		});
	}
	Dt.push(e);
}
function Et() {
	for (; Dt.length > 0;) wt();
}
var Dt, Ot = t((() => {
	w(), Qn(), Dt = [];
}));
//#endregion
//#region node_modules/svelte/src/internal/client/error-handling.js
function kt(e) {
	var t = Di;
	if (t === null) return Ti.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	At(e, t);
}
function At(e, t) {
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
var jt = t((() => {
	i(), Ie(), Dr(), _e(), w(), Fi();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
function Mt(e, t) {
	e.f = e.f & Pt | t;
}
function Nt(e) {
	e.f & 512 || e.deps === null ? Mt(e, E) : Mt(e, O);
}
var Pt, Ft = t((() => {
	_e(), Pt = ~(D | O | E);
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function It(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= re, It(t.deps));
}
function Lt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), It(e.deps), Mt(e, E);
}
var Rt = t((() => {
	_e(), Ft();
}));
//#endregion
//#region node_modules/svelte/src/store/utils.js
function zt(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), C;
	let r = W(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
var Bt = t((() => {
	Fi(), w();
}));
//#endregion
//#region node_modules/svelte/src/store/shared/index.js
function Vt(e, t = C) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (Qe(e, t) && (e = t, n)) {
			let t = !Ut.length;
			for (let t of r) t[1](), Ut.push(t, e);
			if (t) {
				for (let e = 0; e < Ut.length; e += 2) Ut[e][0](Ut[e + 1]);
				Ut.length = 0;
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
function Ht(e) {
	let t;
	return zt(e, (e) => t = e)(), t;
}
var Ut, Wt = t((() => {
	w(), et(), Bt(), Ut = [];
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
function Gt(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ I(void 0),
		unsubscribe: C
	};
	if (r.store !== e && !(Xt in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = C;
		else {
			var i = !0;
			r.unsubscribe = zt(e, (e) => {
				i ? r.source.v = e : L(r.source, e);
			}), i = !1;
		}
	}
	return e && Xt in n ? Ht(e) : U(r.source);
}
function Kt() {
	let e = {};
	function t() {
		Mr(() => {
			for (var t in e) e[t].unsubscribe();
			g(e, Xt, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function qt(e) {
	var t = Yt;
	try {
		return Yt = !1, [e(), Yt];
	} finally {
		Yt = t;
	}
}
var Jt, Yt, Xt, Zt = t((() => {
	Bt(), Wt(), w(), Fi(), ni(), cr(), i(), Jt = !1, Yt = !1, Xt = Symbol("unmounted");
})), Qt = t((() => {
	_e(), lt(), Fi();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function $t(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Tt(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function en(e) {
	Je && /* @__PURE__ */ gr(e) !== null && vr(e);
}
function tn() {
	nn || (nn = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[me]?.();
		});
	}, { capture: !0 }));
}
var nn, rn = t((() => {
	Xe(), Dr(), Ot(), _e(), nn = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function an(e, t, n, r = !0) {
	r && n();
	for (var i of t) e.addEventListener(i, n);
	Mr(() => {
		for (var r of t) e.removeEventListener(r, n);
	});
}
function on(e) {
	var t = Ti, n = Di;
	oi(null), si(null);
	try {
		return e();
	} finally {
		oi(t), si(n);
	}
}
function sn(e, t, n, r = n) {
	e.addEventListener(t, () => on(n));
	let i = e[me];
	i ? e[me] = () => {
		i(), r(!0);
	} : e[me] = () => r(!0), tn();
}
var cn = t((() => {
	ni(), Fi(), _e(), rn();
}));
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ln(e) {
	let t = 0, n = $n(0), r;
	return () => {
		jr() && (U(n), Vr(() => (t === 0 && (r = W(() => e(() => rr(n)))), t += 1, () => {
			Tt(() => {
				--t, t === 0 && (r?.(), r = void 0, rr(n));
			});
		})));
	};
}
var un = t((() => {
	Fi(), ni(), cr(), ut(), i(), Ot();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
function dn(e, t, n, r) {
	new pn(e, t, n, r);
}
var fn, pn, mn = t((() => {
	_e(), Ie(), Ct(), jt(), ni(), Fi(), Xe(), Ot(), Me(), Ve(), i(), Qn(), cr(), ut(), un(), Dr(), Rt(), fn = M | N, pn = class {
		parent;
		is_pending = !1;
		transform_error;
		#e;
		#t = Je ? Ye : null;
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
		#h = ln(() => (this.#m = $n(this.#l), () => {
			this.#m = null;
		}));
		constructor(e, t, n, r) {
			this.#e = e, this.#n = t, this.#r = (e) => {
				var t = Di;
				t.b = this, t.f |= 128, n(e);
			}, this.parent = Di.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Hr(() => {
				if (Je) {
					let e = this.#t;
					We();
					let t = e.data === "[!";
					if (e.data.startsWith("[?")) {
						let t = JSON.parse(e.data.slice(2));
						this.#_(t);
					} else t ? this.#y() : this.#g();
				} else this.#b();
			}, fn), Je && (this.#e = Ye);
		}
		#g() {
			try {
				this.#a = Wr(() => this.#r(this.#e));
			} catch (e) {
				this.error(e);
			}
		}
		#_(e) {
			let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
			Tt(r), t && (this.#s = Wr(() => {
				t(this.#e, () => e, () => n);
			}));
		}
		#v(e) {
			var t = !1, n = !1;
			let r = () => {
				if (t) {
					Be();
					return;
				}
				t = !0, n && je(), this.#s !== null && Zr(this.#s, () => {
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
						At(e, this.#i && this.#i.parent);
					}
				}
			};
		}
		#y() {
			let e = this.#n.pending;
			e && (this.is_pending = !0, this.#o = Wr(() => e(this.#e)), Tt(() => {
				var e = this.#c = document.createDocumentFragment(), t = hr();
				e.append(t), this.#a = this.#S(() => Wr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Zr(this.#o, () => {
					this.#o = null;
				}), this.#x(Bn));
			}));
		}
		#b() {
			try {
				if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Wr(() => {
					this.#r(this.#e);
				}), this.#u > 0) {
					var e = this.#c = document.createDocumentFragment();
					ti(this.#a, e);
					let t = this.#n.pending;
					this.#o = Wr(() => t(this.#e));
				} else this.#x(Bn);
			} catch (e) {
				this.error(e);
			}
		}
		#x(e) {
			this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
		}
		defer_effect(e) {
			Lt(e, this.#f, this.#p);
		}
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}
		has_pending_snippet() {
			return !!this.#n.pending;
		}
		#S(e) {
			var t = Di, n = Ti, r = St;
			si(this.#i), oi(this.#i), ht(this.#i.ctx);
			try {
				return Xn.ensure(), e();
			} catch (e) {
				return kt(e), null;
			} finally {
				si(t), oi(n), ht(r);
			}
		}
		#C(e, t) {
			if (!this.has_pending_snippet()) {
				this.parent && this.parent.#C(e, t);
				return;
			}
			this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Zr(this.#o, () => {
				this.#o = null;
			}), this.#c &&= (this.#e.before(this.#c), null));
		}
		update_pending_count(e, t) {
			this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Tt(() => {
				this.#d = !1, this.#m && tr(this.#m, this.#l);
			}));
		}
		get_effect_pending() {
			return this.#h(), U(this.#m);
		}
		error(e) {
			if (!this.#n.onerror && !this.#n.failed) throw e;
			Bn?.is_fork ? (this.#a && Bn.skip_effect(this.#a), this.#o && Bn.skip_effect(this.#o), this.#s && Bn.skip_effect(this.#s), Bn.oncommit(() => {
				this.#w(e);
			})) : this.#w(e);
		}
		#w(e) {
			this.#a &&= (Jr(this.#a), null), this.#o &&= (Jr(this.#o), null), this.#s &&= (Jr(this.#s), null), Je && (Ue(this.#t), Ge(), Ue(Ke()));
			let t = this.#n.failed, n = (e) => {
				let { reset: n, invoke_onerror: r } = this.#v(e);
				r(), t && (this.#s = this.#S(() => {
					try {
						return Wr(() => {
							var r = Di;
							r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
						});
					} catch (e) {
						return At(e, this.#i.parent), null;
					}
				}));
			};
			Tt(() => {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					At(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => At(e, this.#i && this.#i.parent)) : n(t);
			});
		}
	};
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function hn(e, t, n, r) {
	let i = xt() ? bn : Sn;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Di, c = gn(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				At(e, s);
			}
			_n();
		}
	}
	var d = vn();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xn(e))).then(u).catch((e) => At(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _n();
	}) : f();
}
function gn() {
	var e = Di, t = Ti, n = St, r = Bn;
	return function(i = !0) {
		si(e), oi(t), ht(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _n(e = !0) {
	si(null), oi(null), ht(null), e && Bn?.deactivate();
}
function vn() {
	var e = Di, t = e.b, n = Bn, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
var yn = t((() => {
	_e(), i(), Ct(), mn(), jt(), Fi(), Qn(), kn(), ni(), Ot();
}));
/*#__NO_SIDE_EFFECTS__*/
function bn(e) {
	var t = 2 | D;
	return Di !== null && (Di.f |= N), {
		ctx: St,
		deps: null,
		effects: null,
		equals: Ze,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Pe,
		wv: 0,
		parent: Di,
		ac: null
	};
}
/*#__NO_SIDE_EFFECTS__*/
function xn(e, t, n) {
	let r = Di;
	r === null && be();
	var i = void 0, a = $n(Pe), o = !Ti, s = /* @__PURE__ */ new Set();
	return Br(() => {
		var t = Di, n = c();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(_n);
		} catch (e) {
			n.reject(e), _n();
		}
		var l = Bn;
		if (o) {
			if (t.f & 32768) var u = vn();
			if (r.b?.is_rendered()) l.async_deriveds.get(t)?.reject(On);
			else for (let e of s.values()) e.reject(On);
			s.add(n), l.async_deriveds.set(t, n);
		}
		let d = (e, t = void 0) => {
			u?.(), s.delete(n), t !== On && (l.activate(), t ? (a.f |= oe, tr(a, t)) : (a.f & 8388608 && (a.f ^= oe), tr(a, e)), l.deactivate());
		};
		n.promise.then(d, (e) => d(null, e || "unknown"));
	}), Mr(() => {
		for (let e of s) e.reject(On);
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
	let t = /* @__PURE__ */ bn(e);
	return nt || ci(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Sn(e) {
	let t = /* @__PURE__ */ bn(e);
	return t.equals = $e, t;
}
function Cn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Jr(t[n]);
	}
}
function wn(e) {
	var t, n = Di, r = e.parent;
	if (!wi && r !== null && e.v !== Pe && r.f & 24576) return Le(), e.v;
	si(r);
	try {
		e.f &= ~re, Cn(e), t = mi(e);
	} finally {
		si(n);
	}
	return t;
}
function Tn(e) {
	var t = wn(e);
	if (!e.equals(t) && (e.wv = di(), (!Bn?.is_fork || e.deps === null) && (Bn === null ? e.v = t : (Bn.capture(e, t, !0), Vn?.capture(e, t, !0)), e.deps === null))) {
		Mt(e, E);
		return;
	}
	wi || (Hn === null ? Nt(e) : (jr() || Bn?.is_fork) && Hn.set(e, t));
}
function En(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && on(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = C), gi(t, 0), Kr(t));
}
function Dn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && _i(t);
}
var On, kn = t((() => {
	i(), _e(), Fi(), cn(), et(), Me(), Ve(), ni(), cr(), dt(), it(), Ct(), Ie(), Qn(), yn(), w(), Ft(), On = Symbol("obsolete");
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
function An(e) {
	var t = Wn;
	Wn = !0;
	try {
		var n;
		for (e && (Bn !== null && !Bn.is_fork && Bn.flush(), n = e());;) {
			if (Et(), Bn === null) return n;
			Bn.flush();
		}
	} finally {
		Wn = t;
	}
}
function jn() {
	try {
		Te();
	} catch (e) {
		At(e, Un);
	}
}
function Mn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && fi(r) && (Zn = /* @__PURE__ */ new Set(), _i(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Xr(r), Zn?.size > 0)) {
				or.clear();
				for (let e of Zn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Zn.has(n) && (Zn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || _i(n);
					}
				}
				Zn.clear();
			}
		}
		Zn = null;
	}
}
function Nn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Nn(i, t, n, r) : e & 4194320 && !(e & 2048) && Pn(i, t, r) && (Mt(i, D), Fn(i));
	}
}
function Pn(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (m.call(t, r)) return !0;
		if (r.f & 2 && Pn(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function Fn(e) {
	Bn.schedule(e);
}
function In(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Mt(e, E);
		for (var n = e.first; n !== null;) In(n, t), n = n.next;
	}
}
function Ln(e) {
	Mt(e, E);
	for (var t = e.first; t !== null;) Ln(t), t = t.next;
}
var Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn = t((() => {
	_e(), it(), w(), Fi(), Me(), Ot(), i(), jt(), cr(), ni(), Rt(), Ie(), Ft(), Zt(), dt(), Qt(), kn(), Rn = null, zn = null, Bn = null, Vn = null, Hn = null, Un = null, Wn = !1, Gn = !1, Kn = null, qn = null, Jn = 0, Yn = 1, Xn = class e {
		id = Yn++;
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
			zn === null ? Rn = zn = this : (zn.#n = this, this.#t = zn), zn = this;
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
				for (var r of n.d) Mt(r, D), t(r);
				for (r of n.m) Mt(r, O), t(r);
			}
			this.#p.add(e);
		}
		#g() {
			this.#e = !0, Jn++ > 1e3 && (this.#S(), jn());
			for (let e of this.#u) this.#d.delete(e), Mt(e, D), this.schedule(e);
			for (let e of this.#d) Mt(e, O), this.schedule(e);
			let t = this.#c;
			this.#c = [], this.apply();
			var n = Kn = [], r = [], i = qn = [];
			for (let e of t) try {
				this.#_(e, n, r);
			} catch (t) {
				throw Ln(e), this.#h() || this.discard(), t;
			}
			if (Bn = null, i.length > 0) {
				var a = e.ensure();
				for (let e of i) a.schedule(e);
			}
			if (Kn = null, qn = null, this.#h()) {
				this.#b(r), this.#b(n);
				for (let [e, t] of this.#f) In(e, t);
				i.length > 0 && Bn.#g();
				return;
			}
			let o = this.#v();
			if (o) {
				this.#b(r), this.#b(n), o.#y(this);
				return;
			}
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Vn = this, Mn(r), Mn(n), Vn = null, this.#s?.resolve();
			var s = Bn;
			if (this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), nt && (this.#x(), Bn = s)), this.#c.length > 0) {
				if (s !== null) {
					let e = s;
					e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
				} else s = this;
			}
			s !== null && (or.clear(), s.#g());
		}
		#_(e, t, n) {
			e.f ^= E;
			for (var r = e.first; r !== null;) {
				var i = r.f, a = !!(i & 96);
				if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
					a ? r.f ^= E : i & 4 ? t.push(r) : nt && i & 16777224 ? n.push(r) : fi(r) && (i & 16 && this.#d.add(r), _i(r));
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
						r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Mt(i, D), this.schedule(i));
					}
				}
			};
			for (let e of this.current.keys()) t(e);
			this.oncommit(() => e.discard()), e.#S(), Bn = this, this.#g();
		}
		#b(e) {
			for (var t = 0; t < e.length; t += 1) Lt(e[t], this.#u, this.#d);
		}
		capture(e, t, n = !1) {
			e.v !== Pe && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Hn?.set(e, t)), this.is_fork || (e.v = t);
		}
		activate() {
			Bn = this;
		}
		deactivate() {
			Bn = null, Hn = null;
		}
		flush() {
			try {
				Gn = !0, Bn = this, this.#g();
			} finally {
				Jn = 0, Un = null, Kn = null, qn = null, Gn = !1, Bn = null, Hn = null, or.clear();
			}
		}
		discard() {
			for (let e of this.#i) e(this);
			this.#i.clear();
			for (let e of this.async_deriveds.values()) e.reject(On);
			this.#S(), this.#s?.resolve();
		}
		register_created_effect(e) {
			this.#l.push(e);
		}
		#x() {
			for (let u = Rn; u !== null; u = u.#n) {
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
						for (var s of t) Nn(s, i, a, o);
						o = /* @__PURE__ */ new Map();
						var c = [...u.current].filter(([e, t]) => {
							let n = this.current.get(e);
							return !n || n[0] !== t[0] || n[1] !== t[1];
						}).map(([e]) => e);
						if (c.length > 0) for (let e of this.#l) !(e.f & 155648) && Pn(e, c, o) && (e.f & 4194320 ? (Mt(e, D), u.schedule(e)) : u.#u.add(e));
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
			this.#m || (this.#m = !0, Tt(() => {
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
			if (Bn === null) {
				let t = Bn = new e();
				!Gn && !Wn && Tt(() => {
					t.#e || t.flush();
				});
			}
			return Bn;
		}
		apply() {
			if (!nt || !this.is_fork && this.#t === null && this.#n === null) {
				Hn = null;
				return;
			}
			Hn = /* @__PURE__ */ new Map();
			for (let [e, [t]] of this.current) Hn.set(e, t);
			for (let t = Rn; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
				var e = !1;
				if (t.id < this.id) {
					for (let [n, [, r]] of t.current) if (!r && this.current.has(n)) {
						e = !0;
						break;
					}
				}
				if (!e) for (let [e, n] of t.previous) Hn.has(e) || Hn.set(e, n);
			}
		}
		schedule(e) {
			if (Un = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
				e.b.defer_effect(e);
				return;
			}
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (Kn !== null && t === Di && (nt || (Ti === null || !(Ti.f & 2)) && !Jt)) return;
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
				e === null ? Rn = t : e.#n = t, t === null ? zn = e : t.#t = e, this.linked = !1;
			}
		}
	}, Zn = null;
}));
function $n(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ze,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function er(e, t) {
	let n = $n(e, t);
	return ci(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t = !1, n = !0) {
	let r = $n(e);
	return t || (r.equals = $e), rt && n && St !== null && St.l !== null && (St.l.s ??= []).push(r), r;
}
function L(e, t, n = !1) {
	return Ti !== null && (!Ei || Ti.f & 131072) && xt() && Ti.f & 4325394 && (Oi === null || !Oi.has(e)) && Ae(), tr(e, n ? lr(t) : t, qn);
}
function tr(e, t, n = null) {
	if (!e.equals(t)) {
		wi ? or.set(e, t) : or.has(e) || or.set(e, e.v);
		var r = Xn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wn(t), Hn === null && Nt(t);
		}
		e.wv = di(), ir(e, D, n), xt() && Di !== null && Di.f & 1024 && !(Di.f & 96) && (ji === null ? li([e]) : ji.push(e)), !r.is_fork && ar.size > 0 && !sr && nr();
	}
	return t;
}
function nr() {
	sr = !1;
	for (let e of ar) {
		e.f & 1024 && Mt(e, O);
		let t;
		try {
			t = fi(e);
		} catch {
			t = !0;
		}
		t && _i(e);
	}
	ar.clear();
}
function rr(e) {
	L(e, e.v + 1);
}
function ir(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = xt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Di)) {
			var l = (c & D) === 0;
			if (l && Mt(s, t), c & 131072) ar.add(s);
			else if (c & 2) {
				var u = s;
				Hn?.delete(u), c & 65536 || (c & 512 && (Di === null || !(Di.f & 2097152)) && (s.f |= re), ir(u, O, n));
			} else if (l) {
				var d = s;
				c & 16 && Zn !== null && Zn.add(d), n === null ? Fn(d) : n.push(d);
			}
		}
	}
}
var ar, or, sr, cr = t((() => {
	i(), Fi(), et(), _e(), Me(), it(), ut(), dt(), Ct(), Qn(), fr(), kn(), Ft(), ar = /* @__PURE__ */ new Set(), or = /* @__PURE__ */ new Map(), sr = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/proxy.js
function lr(e) {
	if (typeof e != "object" || !e || se in e) return e;
	let t = x(e);
	if (t !== y && t !== b) return e;
	var n = /* @__PURE__ */ new Map(), r = f(e), i = /* @__PURE__ */ er(0), a = null, o = Pi, s = (e) => {
		if (Pi === o) return e();
		var t = Ti, n = Pi;
		oi(null), ui(o);
		var r = e();
		return oi(t), ui(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ er(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Oe();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ er(r.value, a);
				return n.set(t, e), e;
			}) : L(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ er(Pe, a));
					n.set(t, e), rr(i);
				}
			} else L(r, Pe), rr(i);
			return !0;
		},
		get(t, r, i) {
			if (r === se) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || _(t, r)?.writable) && (o = s(() => /* @__PURE__ */ er(lr(c ? t[r] : Pe), a)), n.set(r, o)), o !== void 0) {
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
			return (r !== void 0 || Di !== null && (!i || _(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ er(i ? lr(e[t]) : Pe, a)), n.set(t, r)), U(r) === Pe) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ er(Pe, a)), n.set(d + "", f)) : L(f, Pe);
			}
			if (l === void 0) (!u || _(e, t)?.writable) && (l = s(() => /* @__PURE__ */ er(void 0, a)), L(l, lr(o)), n.set(t, l));
			else {
				u = l.v !== Pe;
				var p = s(() => lr(o));
				L(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && L(h, g + 1);
				}
				rr(i);
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
function ur(e) {
	try {
		if (typeof e == "object" && e && se in e) return e[se];
	} catch {}
	return e;
}
function dr(e, t) {
	return Object.is(ur(e), ur(t));
}
var fr = t((() => {
	i(), Fi(), w(), cr(), _e(), Ie(), Me(), ut(), dt(), it();
})), pr = t((() => {
	Ve(), fr();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/operations.js
function mr() {
	if (Sr === void 0) {
		Sr = window, Cr = document, wr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Tr = _(t, "firstChild").get, Er = _(t, "nextSibling").get, S(e) && (e[de] = void 0, e[ue] = null, e[fe] = void 0, e.__e = void 0), S(n) && (n[pe] = void 0);
	}
}
function hr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function gr(e) {
	return Tr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _r(e) {
	return Er.call(e);
}
function R(e, t) {
	if (!Je) return /* @__PURE__ */ gr(e);
	var n = /* @__PURE__ */ gr(Ye);
	if (n === null) n = Ye.appendChild(hr());
	else if (t && n.nodeType !== 3) {
		var r = hr();
		return n?.before(r), Ue(r), r;
	}
	return t && xr(n), Ue(n), n;
}
function z(e, t = !1) {
	if (!Je) {
		var n = /* @__PURE__ */ gr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ _r(n) : n;
	}
	if (t) {
		if (Ye?.nodeType !== 3) {
			var r = hr();
			return Ye?.before(r), Ue(r), r;
		}
		xr(Ye);
	}
	return Ye;
}
function B(e, t = 1, n = !1) {
	let r = Je ? Ye : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ _r(r);
	if (!Je) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = hr();
			return r === null ? i?.after(a) : r.before(a), Ue(a), a;
		}
		xr(r);
	}
	return Ue(r), r;
}
function vr(e) {
	e.textContent = "";
}
function yr() {
	return !nt || Zn !== null ? !1 : (Di.f & j) !== 0;
}
function br(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function xr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
var Sr, Cr, wr, Tr, Er, Dr = t((() => {
	Xe(), i(), pr(), w(), Fi(), it(), _e(), Qn(), Ie();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function Or(e) {
	Di === null && (Ti === null && we(e), Ce()), wi && Se(e);
}
function kr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ar(e, t) {
	var n = Di;
	n !== null && n.f & 8192 && (e |= k);
	var r = {
		ctx: St,
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
	Bn?.register_created_effect(r);
	var i = r;
	if (e & 4) Kn === null ? Xn.ensure().schedule(r) : Kn.push(r);
	else if (t !== null) {
		try {
			_i(r);
		} catch (e) {
			throw Jr(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= M));
	}
	if (i !== null && (i.parent = n, n !== null && kr(i, n), Ti !== null && Ti.f & 2 && !(e & 64))) {
		var a = Ti;
		(a.effects ??= []).push(i);
	}
	return r;
}
function jr() {
	return Ti !== null && !Ei;
}
function Mr(e) {
	let t = Ar(8, null);
	return Mt(t, E), t.teardown = e, t;
}
function Nr(e) {
	Or("$effect");
	var t = Di.f;
	if (!Ti && t & 32 && St !== null && !St.i) {
		var n = St;
		(n.e ??= []).push(e);
	} else return Pr(e);
}
function Pr(e) {
	return Ar(4 | te, e);
}
function Fr(e) {
	return Or("$effect.pre"), Ar(8 | te, e);
}
function Ir(e) {
	Xn.ensure();
	let t = Ar(64 | N, e);
	return () => {
		Jr(t);
	};
}
function Lr(e) {
	Xn.ensure();
	let t = Ar(64 | N, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Zr(t, () => {
			Jr(t), n(void 0);
		}) : (Jr(t), n(void 0));
	});
}
function Rr(e) {
	return Ar(4, e);
}
function V(e, t) {
	var n = St, r = {
		effect: null,
		ran: !1,
		deps: e
	};
	n.l.$.push(r), r.effect = Vr(() => {
		if (e(), !r.ran) {
			r.ran = !0;
			var n = Di;
			try {
				si(n.parent), W(t);
			} finally {
				si(n);
			}
		}
	});
}
function zr() {
	var e = St;
	Vr(() => {
		for (var t of e.l.$) {
			t.deps();
			var n = t.effect;
			n.f & 1024 && n.deps !== null && Mt(n, O), fi(n) && _i(n), t.ran = !1;
		}
	});
}
function Br(e) {
	return Ar(ae | N, e);
}
function Vr(e, t = 0) {
	return Ar(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	hn(r, t, n, (t) => {
		Ar(8, () => {
			e(...t.map(U));
		});
	});
}
function Hr(e, t = 0) {
	return Ar(16 | t, e);
}
function Ur(e, t = 0) {
	return Ar(T | t, e);
}
function Wr(e) {
	return Ar(32 | N, e);
}
function Gr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = wi, n = Ti;
		ai(!0), oi(null);
		try {
			t.call(null);
		} finally {
			ai(e), oi(n);
		}
	}
}
function Kr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && on(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Jr(n, t), n = r;
	}
}
function qr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Jr(t), t = n;
	}
}
function Jr(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Yr(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, Kr(e, t && !n), gi(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Gr(e), e.f ^= ee, e.f |= A;
	var i = e.parent;
	i !== null && i.first !== null && Xr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Yr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ _r(e);
		e.remove(), e = n;
	}
}
function Xr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Zr(e, t, n = !0) {
	var r = [];
	Qr(e, r, !0);
	var i = () => {
		n && Jr(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Qr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= k;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Qr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function $r(e) {
	ei(e, !0);
}
function ei(e, t) {
	if (e.f & 8192) {
		e.f ^= k, e.f & 1024 || (Mt(e, D), Xn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			ei(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function ti(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ _r(n);
		t.append(n), n = i;
	}
}
var ni = t((() => {
	Fi(), _e(), Me(), i(), w(), Dr(), Ct(), Qn(), yn(), cn(), Ft();
})), ri, ii = t((() => {
	cr(), Fi(), ri = null;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/runtime.js
function ai(e) {
	wi = e;
}
function oi(e) {
	Ti = e;
}
function si(e) {
	Di = e;
}
function ci(e) {
	Ti !== null && (!nt || Ti.f & 2) && (Oi ??= /* @__PURE__ */ new Set()).add(e);
}
function li(e) {
	ji = e;
}
function ui(e) {
	Pi = e;
}
function di() {
	return ++Mi;
}
function fi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~re), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (fi(a) && Tn(a), a.wv > e.wv) return !0;
		}
		t & 512 && Hn === null && Mt(e, E);
	}
	return !1;
}
function pi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!nt && Oi !== null && Oi.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? pi(a, t, !1) : t === a && (n ? Mt(a, D) : a.f & 1024 && Mt(a, O), Fn(a));
	}
}
function mi(e) {
	var t = ki, n = Ai, r = ji, i = Ti, a = Oi, o = St, s = Ei, c = Pi, l = e.f;
	ki = null, Ai = 0, ji = null, Ti = l & 96 ? null : e, Oi = null, ht(e.ctx), Ei = !1, Pi = ++Ni, e.ac !== null && (on(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= j;
		var f = e.deps, p = Bn?.is_fork;
		if (ki !== null) {
			var m;
			if (p || gi(e, Ai), f !== null && Ai > 0) for (f.length = Ai + ki.length, m = 0; m < ki.length; m++) f[Ai + m] = ki[m];
			else e.deps = f = ki;
			if (jr() && e.f & 512) for (m = Ai; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Ai < f.length && (gi(e, Ai), f.length = Ai);
		if (xt() && ji !== null && !Ei && f !== null && !(e.f & 6146)) for (m = 0; m < ji.length; m++) pi(ji[m], e);
		if (i !== null && i !== e) {
			if (Ni++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Ni;
			if (t !== null) for (let e of t) e.rv = Ni;
			ji !== null && (r === null ? r = ji : r.push(...ji));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (e) {
		return kt(e);
	} finally {
		e.f ^= ie, ki = t, Ai = n, ji = r, Ti = i, Oi = a, ht(o), Ei = s, Pi = c;
	}
}
function hi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = p.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (ki === null || !m.call(ki, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~re), a.v !== Pe && Nt(a), a.ac !== null && on(() => {
			a.ac.abort(he), a.ac = null, Mt(a, D);
		}), En(a), gi(a, 0);
	}
}
function gi(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) hi(e, n[r]);
}
function _i(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Mt(e, E);
		var n = Di, r = Ci;
		Di = e, Ci = !(t & 96);
		try {
			t & 16777232 ? qr(e) : Kr(e), Gr(e);
			var i = mi(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Mi;
		} finally {
			Ci = r, Di = n;
		}
	}
}
async function vi() {
	if (nt) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), An();
}
function U(e) {
	var t = !!(e.f & 2);
	if (ri?.add(e), Ti !== null && !Ei && !(Di !== null && Di.f & 16384) && (Oi === null || !Oi.has(e))) {
		var n = Ti.deps;
		if (Ti.f & 2097152) e.rv < Ni && (e.rv = Ni, ki === null && n !== null && n[Ai] === e ? Ai++ : ki === null ? ki = [e] : ki.push(e));
		else {
			Ti.deps ??= [], m.call(Ti.deps, e) || Ti.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [Ti] : m.call(r, Ti) || r.push(Ti);
		}
	}
	if (wi && or.has(e)) return or.get(e);
	if (t) {
		var i = e;
		if (wi) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || bi(i)) && (a = wn(i)), or.set(i, a), a;
		}
		var o = !(i.f & 512) && !Ei && Ti !== null && (Ci || !!(Ti.f & 512)), s = (i.f & j) === 0;
		fi(i) && (o && (i.f |= 512), Tn(i)), o && !s && (Dn(i), yi(i));
	}
	if (Hn?.has(e)) return Hn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function yi(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dn(t), yi(t));
}
function bi(e) {
	if (e.v === Pe) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (or.has(t) || t.f & 2 && bi(t)) return !0;
	return !1;
}
function W(e) {
	var t = Ei;
	try {
		return Ei = !0, e();
	} finally {
		Ei = t;
	}
}
function xi(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) Si(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && Si(n);
		}
	}
}
function Si(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Si(e[n], t);
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
var Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi = t((() => {
	i(), w(), ni(), _e(), cr(), kn(), it(), ut(), dt(), Ct(), Qn(), jt(), Ie(), ii(), cn(), Ft(), Ve(), Ci = !1, wi = !1, Ti = null, Ei = !1, Di = null, Oi = null, ki = null, Ai = 0, ji = null, Mi = 1, Ni = 0, Pi = Ni;
}));
//#endregion
//#region node_modules/svelte/src/attachments/index.js
ni();
//#endregion
//#region node_modules/svelte/src/utils.js
function Ii(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var Li = [
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
function Ri(e) {
	return Li.includes(e);
}
var zi = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), Bi = {
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
function Vi(e) {
	return e = e.toLowerCase(), Bi[e] ?? e;
}
[...zi];
var Hi = ["touchstart", "touchmove"];
function Ui(e) {
	return Hi.includes(e);
}
_e(), Fi(), _e(), Xe(), Ct(), ni(), w(), Xe(), Ot(), Fi(), cn();
var Wi = Symbol("events"), Gi = /* @__PURE__ */ new Set(), Ki = /* @__PURE__ */ new Set();
function qi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || $i.call(t, e), !e.cancelBubble) return on(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Tt(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Ji(e, t, n, r = {}) {
	var i = qi(t, e, n, r);
	return () => {
		e.removeEventListener(t, i, r);
	};
}
function Yi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = qi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Mr(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[Wi] ??= {})[e] = n;
}
function Xi(e) {
	for (var t = 0; t < e.length; t++) Gi.add(e[t]);
	for (var n of Ki) n(e);
}
var Zi = null, Qi = !1;
function $i(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Zi = e, Qi || (Qi = !0, setTimeout(() => {
		Qi = !1, Zi = null;
	}));
	var o = 0, s = Zi === e && e[Wi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Wi] = t;
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
		var u = Ti, d = Di;
		oi(null), si(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[Wi]?.[r];
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
			e[Wi] = t, delete e.currentTarget, oi(u), si(d);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
Dr();
var ea = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function ta(e) {
	return ea?.createHTML(e) ?? e;
}
function na(e) {
	var t = br("template");
	return t.innerHTML = ta(e.replaceAll("<!>", "<!---->")), t.content;
}
Xe(), Dr(), Fi(), Ie(), _e();
function ra(e, t) {
	var n = Di;
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
		if (Je) return ra(Ye, null), Ye;
		i === void 0 && (i = na(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ gr(i)));
		var t = r || wr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ gr(t), s = t.lastChild;
			ra(o, s);
		} else ra(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ia(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (Je) return ra(Ye, null), Ye;
		if (!o) {
			var e = /* @__PURE__ */ gr(na(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ gr(e);) o.appendChild(/* @__PURE__ */ gr(e));
			else o = /* @__PURE__ */ gr(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ gr(t), r = t.lastChild;
			ra(n, r);
		} else ra(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function aa(e, t) {
	return /* @__PURE__ */ ia(e, t, "svg");
}
function oa(e = "") {
	if (!Je) {
		var t = hr(e + "");
		return ra(t, t), t;
	}
	var n = Ye;
	return n.nodeType === 3 ? xr(n) : (n.before(n = hr()), Ue(n)), ra(n, n), n;
}
function sa() {
	if (Je) return ra(Ye, null), Ye;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = hr();
	return e.append(t, n), ra(t, n), e;
}
function q(e, t) {
	if (Je) {
		var n = Di;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ye), We();
		return;
	}
	e !== null && e.before(t);
}
i(), Dr(), Ie(), Fi(), Ct(), ni(), Xe(), w(), Ve(), Me(), _e(), mn();
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function ca(e, t) {
	return ua(e, t);
}
var la = /* @__PURE__ */ new Map();
function ua(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	mr();
	var c = void 0, l = Lr(() => {
		var o = n ?? t.appendChild(hr());
		dn(o, { pending: () => {} }, (t) => {
			yt({});
			var n = St;
			if (a && (n.c = a), i && (r.$$events = i), Je && ra(t, null), c = e(t, r) || {}, Je && (Di.nodes.end = Ye, Ye === null || Ye.nodeType !== 8 || Ye.data !== "]")) throw Re(), Ne;
			bt();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Ui(r);
					for (let e of [t, document]) {
						var a = la.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), la.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, $i, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(h(Gi)), Ki.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = la.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, $i), r.delete(e), r.size === 0 && la.delete(n)) : r.set(e, i);
			}
			Ki.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return da.set(c, l), c;
}
var da = /* @__PURE__ */ new WeakMap();
_e(), Xe(), ni(), cr(), Fi(), w(), _e(), Ct(), Me(), Ct(), lt(), ni(), Fi(), dt(), yn(), Fi(), Xe(), Me(), Qn(), ni(), _e(), Xe(), Dr(), i();
var fa = class {
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
			if (n) $r(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && ($r(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Jr(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						ti(r, t), t.append(hr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Jr(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Zr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Jr(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Bn, r = yr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = hr();
				i.append(a), this.#n.set(e, {
					effect: Wr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Wr(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Je && (this.anchor = Ye), this.#a(n);
	}
};
w(), ni(), cr(), Xe(), Ot(), Ct(), Qn(), yn(), _e(), Xe(), ni();
function Y(e, t, n = !1) {
	var r;
	Je && (r = Ye, We());
	var i = new fa(e), a = n ? M : 0;
	function o(e, t) {
		if (Je) {
			var n = qe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ke();
				Ue(a), i.anchor = a, He(!1), i.ensure(e, t), He(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Hr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
Ct(), ni(), Xe();
var pa = Symbol("NaN");
function ma(e, t, n) {
	Je && We();
	var r = new fa(e), i = !xt();
	Hr(() => {
		var e = t();
		e !== e && (e = pa), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
ni(), Xe(), Dr();
function ha(e, t) {
	Je && Ue(/* @__PURE__ */ gr(e)), Vr(() => {
		var n = t();
		for (var r in n) {
			var i = n[r];
			i == null || i === "" ? e.style.removeProperty(r) : e.style.setProperty(r, i);
		}
	});
}
Ie(), Xe(), Dr(), ni(), cr(), w(), _e(), Ot(), Fi(), i(), kn(), Qn(), Me(), ut();
function ga(e, t) {
	return t;
}
function _a(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Zr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					va(e, h(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, u = l.parentNode;
			vr(u), u.append(l), e.items.clear();
		}
		va(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function va(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, ti(a, document.createDocumentFragment())) : Jr(t[i], n);
	}
}
var ya;
function X(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = Je ? Ue(/* @__PURE__ */ gr(c)) : c.appendChild(hr());
	}
	Je && We();
	var l = null, u = /* @__PURE__ */ Sn(() => {
		var e = n();
		return f(e) ? e : e == null ? [] : h(e);
	}), d, p = /* @__PURE__ */ new Map(), m = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = l, xa(v, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= ne, Ca(l, null, o)) : $r(l) : Zr(l, () => {
			l = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Hr(() => {
			d = U(u);
			var e = d.length;
			let c = !1;
			Je && qe(o) === "[!" != (e === 0) && (o = Ke(), Ue(o), He(!1), c = !0);
			for (var f = /* @__PURE__ */ new Set(), h = Bn, v = yr(), y = 0; y < e; y += 1) {
				Je && Ye.nodeType === 8 && Ye.data === "]" && (o = Ye, c = !0, He(!1));
				var b = d[y], x = r(b, y), S = m ? null : s.get(x);
				S ? (S.v && tr(S.v, b), S.i && tr(S.i, y), v && h.unskip_effect(S.e)) : (S = Sa(s, m ? o : ya ??= hr(), b, x, y, i, t, n), m || (S.e.f |= ne), s.set(x, S)), f.add(x);
			}
			if (e === 0 && a && !l && (m ? l = Wr(() => a(o)) : (l = Wr(() => a(ya ??= hr())), l.f |= ne)), e > f.size && xe("", "", ""), Je && e > 0 && Ue(Ke()), !m) {
				if (p.set(h, f), v) {
					for (let [e, t] of s) f.has(e) || h.skip_effect(t.e);
					h.oncommit(g), h.ondiscard(_);
				} else g(h);
			}
			c && He(!0), U(u);
		}),
		flags: t,
		items: s,
		pending: p,
		outrogroups: null,
		fallback: l
	};
	m = !1, Je && (o = Ye);
}
function ba(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function xa(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = ba(e.effect.first), l, u = null, d, f = [], p = [], m, g, _, v;
	if (a) for (v = 0; v < o; v += 1) m = t[v], g = i(m, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (m = t[v], g = i(m, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && ($r(_), a && (_.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === c) Ca(_, null, n);
			else {
				var y = u ? u.next : c;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), wa(e, u, _), wa(e, _, y), Ca(_, y, n), u = _, f = [], p = [], c = ba(u.next);
				continue;
			}
		}
		if (_ !== c) {
			if (l !== void 0 && l.has(_)) {
				if (f.length < p.length) {
					var b = p[0], x;
					u = b.prev;
					var S = f[0], C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) Ca(f[x], b, n);
					for (x = 0; x < p.length; x += 1) l.delete(p[x]);
					wa(e, S.prev, C.next), wa(e, u, S), wa(e, C, b), c = b, u = C, --v, f = [], p = [];
				} else l.delete(_), Ca(_, c, n), wa(e, _.prev, _.next), wa(e, _, u === null ? e.effect.first : u.next), wa(e, u, _), u = _;
				continue;
			}
			for (f = [], p = []; c !== null && c !== _;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = ba(c.next);
			if (c === null) continue;
		}
		_.f & 33554432 || f.push(_), u = _, c = ba(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (va(e, h(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var w = [];
		if (l !== void 0) for (_ of l) _.f & 8192 || w.push(_);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && w.push(c), c = ba(c.next);
		var T = w.length;
		if (T > 0) {
			var E = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			_a(e, w, E);
		}
	}
	a && Tt(() => {
		if (d !== void 0) for (_ of d) _.nodes?.a?.apply();
	});
}
function Sa(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? $n(n) : /* @__PURE__ */ I(n, !1, !1) : null, l = o & 2 ? $n(i) : null;
	return {
		v: c,
		i: l,
		e: Wr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ca(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ _r(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function wa(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
ni(), Xe(), Ct(), Dr(), Fi(), _e(), Xe(), _e(), ni(), Ct(), Xe(), Me(), i(), Dr();
function Ta(e, t, ...n) {
	var r = new fa(e);
	Hr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, M);
}
_e(), ni(), Xe(), Ie();
function Ea(e, t, n) {
	var r;
	Je && (r = Ye, We());
	var i = new fa(e);
	Hr(() => {
		var e = t() ?? null;
		if (Je && qe(r) === "[" != (e !== null)) {
			var a = Ke();
			Ue(a), i.anchor = a, He(!1), i.ensure(e, e && ((t) => n(t, e))), He(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, M);
}
w(), w(), ni(), Fi(), _e(), Ot(), cn(), Xe(), Dr(), ni(), Fi(), Ct(), _e(), Xe(), Dr(), ni(), _e(), ni(), Dr(), Fi(), ni(), et(), Fi();
function Da(e, t, n) {
	Rr(() => {
		var r = W(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			Vr(() => {
				var e = n();
				xi(e), i && Qe(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attachments.js
ni();
function Oa(e, t) {
	var n = void 0, r;
	Ur(() => {
		n !== (n = t()) && (r &&= (Jr(r), null), n && (r = Wr(() => {
			Rr(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function ka(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ka(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Aa() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ka(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
w();
function ja(e) {
	return typeof e == "object" ? Aa(e) : e ?? "";
}
var Ma = [..." 	\n\r\f\xA0\v﻿"];
function Na(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Ma.includes(r[o - 1])) && (s === r.length || Ma.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Pa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Fa(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ia(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Fa)), i && c.push(...Object.keys(i).map(Fa));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Fa(e.substring(l, u).trim());
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
		return r && (n += Pa(r)), i && (n += Pa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
_e(), Xe();
function Z(e, t, n, r, i, a) {
	var o = e[de];
	if (Je || o !== n || o === void 0) {
		var s = Na(n, r, a);
		(!Je || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
_e(), Xe();
function La(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ra(e, t, n, r) {
	var i = e[fe];
	if (Je || i !== t) {
		var a = Ia(t, r);
		(!Je || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (La(e, n?.[0], r[0]), La(e, n?.[1], r[1], "important")) : La(e, n, r));
	return r;
}
ni(), cn(), fr(), w(), Ve(), Qn(), it();
function za(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!f(t)) return ze();
		for (var r of e.options) r.selected = t.includes(Ha(r));
		return;
	}
	for (r of e.options) if (dr(Ha(r), t)) {
		r.selected = !0;
		return;
	}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function Ba(e) {
	var t = new MutationObserver(() => {
		"__value" in e && za(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Mr(() => {
		t.disconnect();
	});
}
function Va(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	sn(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Ha);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Ha(o);
		}
		n(a), e.__value = a, Bn !== null && r.add(Bn);
	}), Rr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = nt ? Vn : Bn;
			if (r.has(o)) return;
		}
		if (za(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Ha(s), n(a));
		}
		e.__value = a, i = !1;
	}), Ba(e);
}
function Ha(e) {
	return "__value" in e ? e.__value : e.value;
}
i(), Xe(), w(), rn(), Ve(), _e(), Ot(), Fi(), Ie(), ni(), yn();
var Ua = Symbol("class"), Wa = Symbol("style"), Ga = Symbol("is custom element"), Ka = Symbol("is html"), qa = ge ? "link" : "LINK", Ja = ge ? "input" : "INPUT", Ya = ge ? "option" : "OPTION", Xa = ge ? "select" : "SELECT", Za = ge ? "progress" : "PROGRESS";
function Qa(e) {
	if (Je) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					to(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					to(e, "checked", null), e.checked = r;
				}
			}
		};
		e[me] = n, Tt(n), tn();
	}
}
function $a(e, t) {
	var n = io(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Za) && (e.value = t ?? "");
}
function eo(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function to(e, t, n, r) {
	var i = io(e);
	Je && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === qa) || i[t] !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && oo(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function no(e, t, n, r, i = !1, a = !1) {
	if (Je && i && e.nodeName === Ja) {
		var o = e;
		(o.type === "checkbox" ? "defaultChecked" : "defaultValue") in n || Qa(o);
	}
	var s = io(e), c = s[Ga], l = !s[Ka];
	let u = Je && c;
	u && He(!1);
	var d = t || {}, f = e.nodeName === Ya;
	for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
	n.class ? n.class = ja(n.class) : (r || n[Ua]) && (n.class = null), n[Wa] && (n.style ??= null);
	var m = oo(e);
	if (e.nodeName === Ja && "type" in n && ("value" in n || "__value" in n)) {
		var h = n.type;
		(h !== d.type || h === void 0 && e.hasAttribute("type")) && (d.type = h, to(e, "type", h, a));
	}
	for (let i in n) {
		let o = n[i];
		if (f && i === "value" && o == null) {
			e.value = e.__value = "", d[i] = o;
			continue;
		}
		if (i === "class") {
			Z(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", o, r, t?.[Ua], n[Ua]), d[i] = o, d[Ua] = n[Ua];
			continue;
		}
		if (i === "style") {
			Ra(e, o, t?.[Wa], n[Wa]), d[i] = o, d[Wa] = n[Wa];
			continue;
		}
		var g = d[i];
		if (!(o === g && !(o === void 0 && e.hasAttribute(i)))) {
			d[i] = o;
			var _ = i[0] + i[1];
			if (_ !== "$$") {
				if (_ === "on") {
					let t = {}, n = "$$" + i, r = i.slice(2);
					var v = Ri(r);
					if (Ii(r) && (r = r.slice(0, -7), t.capture = !0), !v && g) {
						if (o != null) continue;
						e.removeEventListener(r, d[n], t), d[n] = null;
					}
					if (v) G(r, e, o), Xi([r]);
					else if (o != null) {
						function a(e) {
							d[i].call(this, e);
						}
						d[n] = qi(r, e, a, t);
					}
				} else if (i === "style") to(e, i, o);
				else if (i === "autofocus") $t(e, !!o);
				else if (!c && (i === "__value" || i === "value" && o != null)) e.value = e.__value = o;
				else if (i === "selected" && f) eo(e, o);
				else {
					var y = i;
					l || (y = Vi(y));
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
					} else b || m.includes(y) && (c || typeof o != "string") ? (e[y] = o, y in s && (s[y] = Pe)) : typeof o != "function" && to(e, y, o, a);
				}
			}
		}
	}
	return u && He(!0), d;
}
function ro(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	hn(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Xa, l = !1;
		if (Ur(() => {
			var u = t(...n.map(U)), d = no(e, r, u, a, o, s);
			l && c && "value" in u && za(e, u.value);
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || Jr(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var f = u[t];
				t.description === "@attach" && (!r || f !== r[t]) && (i[t] && Jr(i[t]), i[t] = Wr(() => Oa(e, () => f))), d[t] = f;
			}
			r = d;
		}), c) {
			var u = e;
			Rr(() => {
				za(u, r.value, !0), Ba(u);
			});
		}
		l = !0;
	});
}
function io(e) {
	return e[ue] ??= {
		[Ga]: e.nodeName.includes("-"),
		[Ka]: e.namespaceURI === Fe
	};
}
var ao = /* @__PURE__ */ new Map();
function oo(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ao.get(t);
	if (n) return n;
	ao.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = v(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = x(i);
	}
	return n;
}
Xe(), Dr(), cn(), i(), ni(), cn(), Me(), fr(), Ot(), Xe(), Fi(), Qn(), it();
function so(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	sn(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = lo(e) ? uo(a) : a, n(a), Bn !== null && r.add(Bn), await vi(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Je && e.defaultValue !== e.value || W(t) == null && e.value) && (n(lo(e) ? uo(e.value) : e.value), Bn !== null && r.add(Bn)), Vr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = nt ? Vn : Bn;
			if (r.has(i)) return;
		}
		lo(e) && n === uo(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function co(e, t, n = t) {
	sn(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (Je && e.defaultChecked !== e.checked || W(t) == null) && n(e.checked), Vr(() => {
		e.checked = !!t();
	});
}
function lo(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function uo(e) {
	return e === "" ? null : +e;
}
ni(), cn(), cn(), ni(), w(), ni(), Fi();
var fo = /* @__PURE__ */ new class e {
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
function po(e, t, n) {
	var r = fo.observe(e, () => n(e[t]));
	Rr(() => (W(() => n(e[t])), r));
}
_e(), Ct(), ni(), Fi();
function mo(e, t) {
	return e === t || e?.[se] === t;
}
function ho(e = {}, t, n, r) {
	var i = St.r, a = Di;
	return Rr(() => {
		var o, s;
		return Vr(() => {
			o = s, s = r?.() || [], W(() => {
				mo(n(...s), e) || (t(e, ...s), o && mo(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && mo(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
ni(), cn();
function go(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? Vr(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && Mr(() => {
		n.removeEventListener(t, a);
	});
}
ni(), cn();
function _o(e, t) {
	an(window, ["resize"], () => on(() => t(window[e])));
}
w(), ni(), w(), Ct(), kn(), ni(), Fi();
function vo(e = !1) {
	let t = St, n = t.l.u;
	if (!n) return;
	let r = () => xi(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ bn(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => U(i);
	}
	n.b.length && Fr(() => {
		yo(t, r), s(n.b);
	}), Nr(() => {
		let e = W(() => n.m.map(o));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Nr(() => {
		yo(t, r), s(n.a);
	});
}
function yo(e, t) {
	if (e.l.s) for (let t of e.l.s) U(t);
	t();
}
cr(), Fi(), w(), i(), Ie(), w(), cr(), kn(), Fi(), Me(), _e(), fr(), Zt(), it(), ni();
var bo = {
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
function xo(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, bo);
}
var So = {
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
function Co(...e) {
	return new Proxy({ props: e }, So);
}
function Q(e, t, n, r) {
	var i = !rt || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ bn(r), U(l)) : (c && (c = !1, s = o ? W(r) : r), s);
	let d;
	if (a) {
		var f = se in e || ce in e;
		d = _(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = qt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ee(t), d(p)));
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
	var v = !1, y = (n & 1 ? bn : Sn)(() => (v = !1, h()));
	a && U(y);
	var b = Di;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(y) : i && a ? lr(e) : e;
			return L(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return wi && v || b.f & 16384 ? y.v : U(y);
	});
}
Ct(), ni(), Zt(), yn(), _e(), ni(), cr(), Fi(), Qn(), w(), Me(), Ct(), it(), Ft(), ni(), w(), Dr(), _e(), lt(), Fi(), Ct(), ut(), rn(), Xe(), yn(), Qn(), kn(), ni(), cr(), Zt(), mn(), ii(), Fi(), fr(), Dr(), lt(), w(), pr(), Xe(), Me(), Fi(), w(), Me(), it(), Ct(), i(), Qn();
function wo(e) {
	St === null && ve("onMount"), rt && St.l !== null ? Eo(St).m.push(e) : Nr(() => {
		let t = W(e);
		if (typeof t == "function") return t;
	});
}
function To(e) {
	St === null && ve("onDestroy"), wo(() => () => W(e));
}
function Eo(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5"), it(), tt();
//#endregion
//#region node_modules/svelte/src/store/index-client.js
var Do = t((() => {
	ni(), Wt(), un(), Fi();
})), Oo = /* @__PURE__ */ n({
	applyCampaignControl: () => jo,
	applyObserverSnapshot: () => Mo,
	campaignState: () => Vo,
	connectCampaignState: () => Bo,
	projectFromLocation: () => ko,
	refreshAccess: () => Lo,
	refreshAll: () => Ro,
	refreshCampaignControl: () => Fo,
	refreshObserverSnapshot: () => Io,
	selectProject: () => No
});
function ko() {
	if (typeof location > "u") return "";
	try {
		return decodeURIComponent(location.pathname.match(/^\/projects\/([^/]+)/)?.[1] || "");
	} catch {
		return "";
	}
}
function Ao(e) {
	Vo.update((t) => ({
		...t,
		...e
	}));
}
function jo(e, t) {
	Vo.update((n) => ({
		...n,
		control: e,
		selectedProject: t ?? n.selectedProject ?? ko()
	}));
}
function Mo(e) {
	Ao({
		observer: e,
		connection: "live",
		connectionLabel: "Live",
		lastError: ""
	});
}
function No(e, t = !1) {
	let n = e ? `/projects/${encodeURIComponent(e)}` : "/";
	history[t ? "replaceState" : "pushState"](null, "", n), Ao({ selectedProject: e });
}
function Po(e, t = Ht(Vo).selectedProject) {
	let n = new URL(e, location.origin);
	return n.searchParams.set("view", "compact"), t && n.searchParams.set("project", t), `${n.pathname}${n.search}`;
}
async function Fo(e = Ht(Vo).selectedProject) {
	let t = await fetch(Po("/api/control", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh campaign state: ${t.status}`);
	let n = await t.json();
	return jo(n), n;
}
async function Io(e = Ht(Vo).selectedProject) {
	let t = await fetch(Po("/api/snapshot", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh lane state: ${t.status}`);
	let n = await t.json();
	return Mo(n), n;
}
async function Lo(e = Ht(Vo).selectedProject) {
	let t = new URL("/api/me", location.origin);
	e && t.searchParams.set("project", e);
	let n = await fetch(`${t.pathname}${t.search}`, { cache: "no-store" });
	if (!n.ok) throw Error(`Could not load access scope: ${n.status}`);
	let r = await n.json();
	return Ao({ access: r }), r;
}
async function Ro() {
	Ao({
		connection: "refreshing",
		connectionLabel: "Refreshing",
		lastError: ""
	});
	try {
		let e = Ht(Vo).selectedProject, t = await fetch(Po("/api/refresh", e), { method: "POST" });
		if (!t.ok) throw Error(`Refresh failed: ${t.status}`);
		Mo(await t.json()), await Fo(e);
	} catch (e) {
		throw Ao({
			connection: "offline",
			connectionLabel: "Refresh failed",
			lastError: e instanceof Error ? e.message : String(e)
		}), e;
	}
}
function zo(e) {
	Vo.update((t) => {
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
function Bo() {
	let e = null, t = !1, n = null, r = 0, i = (n) => {
		if (t) return;
		let i = ++r;
		e?.close(), Ao({
			connection: "connecting",
			connectionLabel: "Connecting"
		}), e = new EventSource(Po("/api/events", n)), e.addEventListener("snapshot", (e) => {
			if (i === r) try {
				Mo(JSON.parse(e.data));
			} catch (e) {
				Ao({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.addEventListener("campaign", (e) => {
			if (i === r) try {
				jo(JSON.parse(e.data));
			} catch (e) {
				Ao({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.addEventListener("coordinator", (e) => {
			if (i === r) try {
				zo(JSON.parse(e.data));
			} catch (e) {
				Ao({ lastError: e instanceof Error ? e.message : String(e) });
			}
		}), e.onerror = () => {
			i === r && Ao({
				connection: "reconnecting",
				connectionLabel: "Reconnecting"
			});
		};
	}, a = () => Ao({ selectedProject: ko() });
	addEventListener("popstate", a);
	let o = Vo.subscribe((e) => {
		e.selectedProject !== n && (n = e.selectedProject, i(e.selectedProject), Promise.all([
			Io(e.selectedProject),
			Fo(e.selectedProject),
			Lo(e.selectedProject)
		]).catch((e) => {
			Ao({
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
var Vo, Ho = t((() => {
	Do(), Vo = Vt({
		control: null,
		observer: null,
		selectedProject: ko(),
		connection: "connecting",
		connectionLabel: "Connecting",
		lastError: "",
		coordinatorActivity: null,
		access: null
	});
}));
//#endregion
//#region src/ui/campaign-actions.ts
Ho();
var Uo = { pending: {} }, Wo = /* @__PURE__ */ new Set(), Go = /* @__PURE__ */ new Map();
function Ko(e) {
	Uo = e;
	for (let e of Wo) e(Uo);
}
var qo = (e) => new Promise((t) => setTimeout(t, e)), Jo = async () => {
	let { refreshCampaignControl: e } = await Promise.resolve().then(() => (Ho(), Oo));
	return e();
};
function Yo(e, t) {
	return e.projects?.find((e) => e.id === t) || null;
}
function Xo(e) {
	return e?.status === "failed" && /^Stale project version:/i.test(e.error || "");
}
function Zo(e, t) {
	return `${e.projectId}:${e.type}:${t}`;
}
function Qo(e, t, n, r, i) {
	return [
		e.type.slice(0, 56),
		t.slice(0, 40),
		n,
		r.slice(0, 36),
		String(i)
	].join(":");
}
function $o(e, t) {
	Ko({ pending: {
		...Uo.pending,
		[e]: {
			projectId: t.projectId,
			type: t.type,
			targetId: t.targetId || "",
			startedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	} });
}
function es(e) {
	let t = { ...Uo.pending };
	delete t[e], Ko({ pending: t });
}
async function ts(e, t = {}) {
	let n = t.refresh || Jo, r = t.fetcher || fetch, i = t.wait || qo, a = (t.nonce || (() => crypto.randomUUID()))(), o = Zo(e, a), s = Math.max(0, Math.min(3, e.staleRetries ?? 1)), c = Math.max(1, Math.min(240, e.pollLimit ?? 80)), l = Math.max(25, Math.min(2e3, e.pollIntervalMs ?? 250)), u = String(e.scope || "svelte").replace(/[^a-z0-9._-]+/gi, "-").slice(0, 32) || "svelte";
	$o(o, e);
	try {
		let t = await n(), o = Yo(t, e.projectId);
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
					idempotencyKey: Qo(e, o.id, u, a, p)
				})
			}), h = await m.json();
			if (!m.ok) throw Error(h.error || `Action failed: ${m.status}`);
			d = h;
			for (let r = 0; h.id && r < c && ["queued", "running"].includes(d?.status || ""); r++) {
				if (await i(l), t = await n(), o = Yo(t, e.projectId), !o) throw Error("The campaign disappeared while its action was settling");
				d = o.actions?.find((e) => e.id === h.id) || d;
			}
			if (!Xo(d) || p === s) break;
			if (f += 1, t = await n(), o = Yo(t, e.projectId), !o) throw Error("The campaign disappeared while its control version refreshed");
		}
		if (d?.status === "failed") throw Error(d.error || `${e.type} failed`);
		if (d?.status !== "completed") throw Error(`${e.type} did not settle before the control timeout`);
		if (t = await n(), o = Yo(t, e.projectId), !o) throw Error("The selected campaign disappeared after its action completed");
		return {
			action: d,
			control: t,
			project: o,
			staleRetries: f
		};
	} catch (e) {
		throw await n().catch(() => void 0), e;
	} finally {
		es(o);
	}
}
async function ns(e, t = {}) {
	let n = Go.get(e.projectId) || Promise.resolve(), r, i = new Promise((e) => {
		r = e;
	}), a = n.catch(() => void 0).then(() => i);
	Go.set(e.projectId, a), await n.catch(() => void 0);
	try {
		return await ts(e, t);
	} finally {
		r(), Go.get(e.projectId) === a && Go.delete(e.projectId);
	}
}
//#endregion
//#region src/ui/pwa.ts
Do();
var rs = Vt("loading");
function is(e) {
	let t = "=".repeat((4 - e.length % 4) % 4), n = atob((e + t).replace(/-/g, "+").replace(/_/g, "/"));
	return Uint8Array.from([...n].map((e) => e.charCodeAt(0)));
}
async function as() {
	if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
		rs.set("unsupported");
		return;
	}
	try {
		let e = await navigator.serviceWorker.ready;
		rs.set(await e.pushManager.getSubscription() ? "enabled" : "disabled");
	} catch {
		rs.set("error");
	}
}
async function os() {
	if (!(!("serviceWorker" in navigator) || !("PushManager" in window))) {
		rs.set("loading");
		try {
			let e = await navigator.serviceWorker.ready, t = await e.pushManager.getSubscription();
			if (t) await fetch("/api/push/unsubscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ endpoint: t.endpoint })
			}), await t.unsubscribe();
			else {
				if (await Notification.requestPermission() !== "granted") {
					rs.set("disabled");
					return;
				}
				let t = await fetch("/api/me", { cache: "no-store" }).then((e) => e.json()), n = await e.pushManager.subscribe({
					userVisibleOnly: !0,
					applicationServerKey: is(t.pushPublicKey)
				});
				if (!(await fetch("/api/push/subscribe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(n)
				})).ok) throw Error("Could not register push subscription");
			}
			await as();
		} catch {
			rs.set("error");
		}
	}
}
function ss() {
	if (!("serviceWorker" in navigator)) return rs.set("unsupported"), () => void 0;
	let e = () => {
		let e = "lane-watch-controller-v91";
		sessionStorage.getItem(e) || (sessionStorage.setItem(e, "1"), location.reload());
	};
	return navigator.serviceWorker.addEventListener("controllerchange", e), navigator.serviceWorker.register("/sw.js?v=101", { updateViaCache: "none" }).then(async (e) => {
		e.waiting?.postMessage({ type: "SKIP_WAITING" }), await e.update(), await as();
	}).catch(() => rs.set("error")), () => navigator.serviceWorker.removeEventListener("controllerchange", e);
}
//#endregion
//#region src/ui/ObserverDashboard.svelte
var cs = /* @__PURE__ */ K("<button> </button>"), ls = /* @__PURE__ */ K("<option> </option>"), us = /* @__PURE__ */ K("<p class=\"banner\" role=\"status\"> </p>"), ds = /* @__PURE__ */ K("<div class=\"activity-line\"><span class=\"pulse\"></span><span> </span></div>"), fs = /* @__PURE__ */ K("<span class=\"meta-chip\"> </span>"), ps = /* @__PURE__ */ K("<button type=\"button\"><div class=\"card-top\"><span class=\"lane-name\"> </span><span class=\"status-pill\"> </span></div> <h3 class=\"task-title\"> </h3> <p class=\"detail\"> </p> <!> <div class=\"meta-row\"><span class=\"meta-chip\"> </span> <!> <span class=\"meta-chip\"> </span><span class=\"meta-chip\"> </span> <span> </span> <!></div> <div class=\"card-footer\"><span> </span><span> </span></div></button>"), ms = /* @__PURE__ */ K("<div class=\"empty-state\"><p>No lanes match this view.</p></div>"), hs = /* @__PURE__ */ K("<p class=\"banner\" role=\"alert\"> </p>"), gs = /* @__PURE__ */ K("<div class=\"detail-cell\"><span> </span><strong> </strong></div>"), _s = /* @__PURE__ */ K("<div class=\"command\"> </div>"), vs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>In-flight activity</h3><!></section>"), ys = /* @__PURE__ */ K("<div class=\"timeline-item\"><time> </time><p> </p></div>"), bs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Recent timeline</h3><!></section>"), xs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Result</h3><p> </p></section>"), Ss = /* @__PURE__ */ K("<p class=\"dialog-feedback\"> </p>"), Cs = /* @__PURE__ */ K("<section class=\"dialog-section\"><h3>Controls</h3><button class=\"primary-button\"> </button><!></section>"), ws = /* @__PURE__ */ K("<section class=\"dialog-section ownership-boundary\"><h3>Observed elsewhere</h3><p> </p></section>"), Ts = /* @__PURE__ */ K("<div class=\"dialog-shell\"><header class=\"dialog-header\"><div><p class=\"eyebrow\"> </p><h2> </h2></div><button class=\"close-button\" aria-label=\"Close lane details\">×</button></header> <div class=\"dialog-body\"><!> <section class=\"dialog-section\"><h3>Snapshot</h3><div class=\"detail-grid\"></div></section> <section class=\"dialog-section\"><h3>Current detail</h3><p> </p></section> <!> <!> <!> <section class=\"dialog-section\"><h3>Source</h3><p> <br/> <br/> </p></section> <!></div></div>"), Es = /* @__PURE__ */ K("<section class=\"summary\" aria-label=\"Lane summary\"><button><span class=\"summary-value\"> </span><span>working</span></button> <button><span class=\"summary-value\"> </span><span>idle</span></button> <button><span class=\"summary-value\"> </span><span>attention</span></button> <button><span class=\"summary-value\"> </span><span>complete</span></button></section> <section class=\"controls observer-controls\" aria-label=\"Lane dashboard controls\"><div class=\"filter-tabs\" role=\"tablist\" aria-label=\"Lane filters\"></div> <div class=\"control-row\"><label class=\"search-box\"><span class=\"sr-only\">Search lanes</span><input type=\"search\" placeholder=\"Search task, lane, project…\" autocomplete=\"off\"/></label> <select aria-label=\"Filter by project\"><option>All projects</option><!></select> <button> </button></div></section> <!> <section class=\"lane-grid\" aria-live=\"polite\"></section> <!> <dialog class=\"lane-dialog\"><!></dialog>", 1);
function Ds(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", i), r = () => Gt(rs, "$alertState", i), [i, a] = Kt(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(), p = /* @__PURE__ */ I(), m = /* @__PURE__ */ I(), h = /* @__PURE__ */ I("active"), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I(typeof location > "u" ? "" : new URL(location.href).searchParams.get("lane") || ""), v = /* @__PURE__ */ I(), y = /* @__PURE__ */ I(null), b = /* @__PURE__ */ I(""), x = /* @__PURE__ */ I(!1), S = /* @__PURE__ */ I(""), C = /* @__PURE__ */ I(null), w = {
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
		t.searchParams.set("lane", e), history.replaceState(null, "", `${t.pathname}${t.search}`), await vi(), U(v) && !U(v).open && U(v).showModal();
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
			await ns({
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
	wo(() => {
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
	}), zr(), vo();
	var ee = Es(), M = z(ee), N = R(M);
	let te;
	var ne = R(N), re = R(ne, !0);
	P(ne), Ge(), P(N);
	var ie = B(N, 2);
	let ae;
	var oe = R(ie), se = R(oe, !0);
	P(oe), Ge(), P(ie);
	var ce = B(ie, 2);
	let le;
	var ue = R(ce), de = R(ue, !0);
	P(ue), Ge(), P(ce);
	var fe = B(ce, 2);
	let pe;
	var me = R(fe), he = R(me, !0);
	P(me), Ge(), P(fe), P(M);
	var ge = B(M, 2), _e = R(ge);
	X(_e, 4, () => [
		["active", "Live"],
		["running", "Running"],
		["attention", "Attention"],
		["recent", "Recent"],
		["all", "All"]
	], ga, (e, t) => {
		var n = cs();
		let r;
		var i = R(n, !0);
		P(n), H(() => {
			r = Z(n, 1, "filter-tab", null, r, { active: U(h) === t[0] }), J(i, W(() => t[1]));
		}), G("click", n, () => L(h, t[0])), q(e, n);
	}), P(_e);
	var ve = B(_e, 2), ye = R(ve), be = B(R(ye));
	Qa(be), P(ye);
	var xe = B(ye, 2), Se = R(xe);
	Se.value = Se.__value = "", X(B(Se), 1, () => U(u), ga, (e, t) => {
		var n = ls(), r = R(n, !0);
		P(n);
		var i = {};
		H(() => {
			J(r, U(t)), i !== (i = U(t)) && (n.value = (n.__value = U(t)) ?? "");
		}), q(e, n);
	}), P(xe);
	var Ce;
	Ba(xe);
	var we = B(xe, 2);
	let Te;
	var Ee = R(we, !0);
	P(we), P(ve), P(ge);
	var De = B(ge, 2), Oe = (e) => {
		var t = us(), n = R(t);
		P(t), H((e) => J(n, `Status snapshot is ${e ?? ""}. The observer may be reconnecting.`), [() => (U(o), W(() => T(U(o)?.generatedAt)))]), q(e, t);
	};
	Y(De, (e) => {
		U(p) && e(Oe);
	});
	var ke = B(De, 2);
	X(ke, 5, () => U(d), (e) => e.id, (e, t) => {
		var n = ps(), r = R(n), i = R(r), a = R(i, !0);
		P(i);
		var o = B(i), s = R(o, !0);
		P(o), P(r);
		var c = B(r, 2), l = R(c, !0);
		P(c);
		var u = B(c, 2), d = R(u, !0);
		P(u);
		var f = B(u, 2), p = (e) => {
			var n = ds(), r = B(R(n)), i = R(r);
			P(r), P(n), H(() => J(i, `${U(t), W(() => U(t).inFlight + U(t).queued) ?? ""} active task${U(t), W(() => U(t).inFlight + U(t).queued === 1 ? "" : "s") ?? ""}`)), q(e, n);
		};
		Y(f, (e) => {
			U(t), W(() => U(t).inFlight + U(t).queued) && e(p);
		});
		var m = B(f, 2), h = R(m), g = R(h, !0);
		P(h);
		var _ = B(h, 2), v = (e) => {
			var n = fs(), r = R(n, !0);
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
			var n = fs(), r = R(n);
			P(n), H((e) => J(r, `${e ?? ""} tok`), [() => (U(t), W(() => E(U(t).tokens)))]), q(e, n);
		};
		Y(O, (e) => {
			U(t), W(() => U(t).tokens != null) && e(A);
		}), P(m);
		var j = B(m, 2), ee = R(j), M = R(ee, !0);
		P(ee);
		var N = B(ee), te = R(N);
		P(N), P(j), P(n), H((e, r, i) => {
			Z(n, 1, `lane-card ${U(t), W(() => U(t).severity) ?? ""}`), to(n, "aria-label", (U(t), W(() => `Open ${U(t).task} details`))), J(a, (U(t), W(() => U(t).lane))), J(s, (U(t), W(() => U(t).status))), J(l, (U(t), W(() => U(t).task))), J(d, (U(t), W(() => U(t).detail || U(t).output || (U(t).severity === "complete" ? "Coordinator completion recorded." : "No current detail reported.")))), J(g, (U(t), W(() => U(t).model))), J(b, (U(t), W(() => U(t).project))), J(S, (U(t), W(() => U(t).host === "macbook" ? "Mac" : "Windows"))), Z(C, 1, `meta-chip ownership-chip ${e ?? ""}`), J(w, r), J(M, (U(t), W(() => U(t).jobId || "no job"))), J(te, `updated ${i ?? ""}`);
		}, [
			() => (U(t), W(() => D(U(t)).origin)),
			() => (U(t), W(() => D(U(t)).label)),
			() => (U(t), W(() => T(U(t).updatedAt)))
		]), G("click", n, () => k(U(t).id)), q(e, n);
	}), P(ke);
	var Ae = B(ke, 2), je = (e) => {
		q(e, ms());
	};
	Y(Ae, (e) => {
		U(o), U(d), W(() => U(o) && !U(d).length) && e(je);
	});
	var Me = B(Ae, 2), Ne = R(Me), Pe = (e) => {
		var t = Ts(), n = R(t), r = R(n), i = R(r), a = R(i);
		P(i);
		var o = B(i), s = R(o, !0);
		P(o), P(r);
		var c = B(r);
		P(n);
		var l = B(n, 2), u = R(l), d = (e) => {
			var t = hs(), n = R(t, !0);
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
		])), ga, (e, t) => {
			var n = gs(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a), P(n), H(() => {
				J(i, (U(t), W(() => U(t)[0]))), J(o, (U(t), W(() => U(t)[1])));
			}), q(e, n);
		}), P(m), P(p);
		var h = B(p, 2), g = B(R(h)), _ = R(g, !0);
		P(g), P(h);
		var y = B(h, 2), C = (e) => {
			var t = vs();
			X(B(R(t)), 1, () => (U(f), W(() => U(f).activities)), (e) => e.id, (e, t) => {
				var n = _s(), r = R(n);
				P(n), H(() => J(r, `${U(t), W(() => U(t).kind === "subagent" ? `${U(t).agentType || "unknown"} / ${U(t).model || "unknown"}` : U(t).kind) ?? ""} · ${U(t), W(() => U(t).label) ?? ""}`)), q(e, n);
			}), P(t), q(e, t);
		};
		Y(y, (e) => {
			U(f), W(() => U(f).activities.length) && e(C);
		});
		var w = B(y, 2), T = (e) => {
			var t = bs();
			X(B(R(t)), 1, () => (U(f), W(() => U(f).timeline)), ga, (e, t) => {
				var n = ys(), r = R(n), i = R(r);
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
			var t = xs(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, (U(f), W(() => U(f).output)))), q(e, t);
		};
		Y(O, (e) => {
			U(f), W(() => U(f).output) && e(k);
		});
		var A = B(O, 2), ee = B(R(A)), M = R(ee), N = B(M, 2, !0), te = B(N, 2, !0);
		P(ee), P(A);
		var ne = B(A, 2), re = (e) => {
			var t = Cs(), n = B(R(t)), r = R(n, !0);
			P(n);
			var i = B(n), a = (e) => {
				var t = Ss(), n = R(t, !0);
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
			var t = ws(), n = B(R(t)), r = R(n);
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
	}), P(Me), ho(Me, (e) => L(v, e), () => U(v)), H((e) => {
		te = Z(N, 1, "summary-card working", null, te, { selected: U(h) === "running" }), J(re, (U(l), W(() => U(l).working))), ae = Z(ie, 1, "summary-card idle", null, ae, { selected: U(h) === "running" }), J(se, (U(l), W(() => U(l).idle))), le = Z(ce, 1, "summary-card attention", null, le, { selected: U(h) === "attention" }), J(de, (U(l), W(() => U(l).attention))), pe = Z(fe, 1, "summary-card complete", null, pe, { selected: U(h) === "recent" }), J(he, (U(l), W(() => U(l).complete))), Ce !== (Ce = (n(), W(() => n().selectedProject))) && (xe.value = (xe.__value = (n(), W(() => n().selectedProject))) ?? "", za(xe, (n(), W(() => n().selectedProject)))), Te = Z(we, 1, "outline-button", null, Te, { enabled: r() === "enabled" }), we.disabled = e, J(Ee, U(m));
	}, [() => (r(), W(() => ["loading", "unsupported"].includes(r())))]), G("click", N, () => L(h, "running")), G("click", ie, () => L(h, "running")), G("click", ce, () => L(h, "attention")), G("click", fe, () => L(h, "recent")), so(be, () => U(g), (e) => L(g, e)), G("change", xe, (e) => No(e.currentTarget.value)), G("click", we, function(...e) {
		os?.apply(this, e);
	}), Yi("close", Me, A), q(e, ee), bt(), a();
}
Xi(["click", "change"]);
//#endregion
//#region src/ui/custody-reshape.ts
function Os(e, t, n, r, i, a, o, s = []) {
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
function ks(e, t = "") {
	let n = `${e?.receipt?.summary || ""} ${e?.receipt?.stopReason || ""} ${t}`, r = Number(e?.receipt?.usage?.tokens || 0);
	return (e?.capability !== "portability" && r > 5e4 || /automatic retry limit|exceeded (?:its )?(?:fixed )?[\d,]*-?token|crossed its token ceiling|contract too large|reshape or resize/i.test(n)) && (!t || !/automatic retry limit/i.test(t) || !e?.task || t.includes(e.task));
}
function As(e) {
	return /asymmetric-laboratory intake replay/i.test(e?.task || "") ? [Os(e, "Verify frozen asymmetric manifest, provenance, and control count", "Separate source binding and the eleven-type inventory audit from computational replay so a mismatch can stop cheaply.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Verify the 8-trivial/6-C2 inventory and correct the control count to six.",
		"Limit every accepted statement to the frozen named pools; make no repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-check-v1/**", "Stop at the first source-binding, provenance, orientation, or count mismatch. Do not replay generators, run SAT, modify producer artifacts, or exceed 20,000 tokens."), Os(e, "Replay frozen asymmetric deduplication and reconcile resource scope", "Run only the exact role-preserving replay after the manifest check, with runtime accounting isolated from source-provenance inspection.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Reconcile the replay token, process wall-time, observer wall-time, and peak-memory scopes.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-resource-scope-v1/**", "Stop on the first changed candidate count, predecessor-receipt mismatch, or resource-ceiling breach. Do not run SAT, generate candidates, measure slack/liftability, or open another repair generation.")] : /verify frozen asymmetric manifest, provenance, and control count/i.test(e?.task || "") ? [Os(e, "Bind the frozen asymmetric manifest and provenance", "Keep immutable source binding separate from the eleven-type inventory check so either boundary can settle inside one small lease.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Limit every accepted statement to the frozen named pools; make no inventory or repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-binding-v1/**", "Stop at the first source-binding, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 20,000 tokens."), Os(e, "Verify the frozen asymmetric type inventory and control count", "Consume the source-bound manifest receipt and check only the finite inventory arithmetic and six-control correction.", "small", [
		"Consume the exact predecessor manifest-and-provenance receipt without reopening its source search.",
		"Verify the 8-trivial/6-C2 inventory over the frozen named pools.",
		"Correct the control count to six and emit graph-effect NONE.",
		"Make no repository-wide ceiling claim and change no producer artifact."
	], "results/inbox/asym-lab-inventory-control-count-v1/**", "Stop if the predecessor receipt is absent or the frozen inventory differs. Do not replay generators, run SAT, inspect unrelated candidates, or exceed 20,000 tokens.", ["Bind the frozen asymmetric manifest and provenance"])] : /replay frozen asymmetric deduplication and reconcile resource scope/i.test(e?.task || "") ? [Os(e, "Replay the frozen role-preserving asymmetric deduplication core", "Run only the exact finite replay; leave accounting and scope policy to a separate receipt-bound check.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Record deterministic inputs, outputs, and candidate counts sufficient for a later accounting check.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-core-v1/**", "Stop on the first changed candidate count or predecessor-receipt mismatch. Do not reconcile resource policy, run SAT, generate candidates, measure slack/liftability, or open another repair generation.", ["Bind the frozen asymmetric manifest and provenance", "Verify the frozen asymmetric type inventory and control count"]), Os(e, "Reconcile frozen asymmetric replay resource measurements", "Check only the completed replay's token and timing scopes instead of repeating its mathematics.", "small", [
		"Consume the exact replay-core receipt without rerunning its mathematical computation.",
		"Reconcile token usage, process wall-time, observer wall-time, and peak-memory scopes.",
		"Preserve unknown measurements as UNKNOWN rather than estimating or imputing zero.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-replay-resource-measurements-v1/**", "Stop if the replay-core receipt is absent or ambiguous. Do not rerun the replay, run SAT, generate candidates, or exceed 20,000 tokens.")] : /epoch resource provenance/i.test(e?.task || "") ? [Os(e, "Bind missing epoch token measurements to their source runs", "Recover or explicitly classify the six missing token measurements without mixing that source search with policy reconciliation.", "small", [
		"Each of the six run IDs receives a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Unknown values are never imputed as zero.",
		"Receipt-bound, ledger-only, and missing measurements remain distinguished."
	], "results/inbox/strategy-cost-source-binding-v1/**", "One source-binding pass only. Record UNKNOWN with provenance when a measurement cannot be recovered; do not estimate or rerun research."), Os(e, "Reconcile epoch reservation and wall-time scopes", "Apply the source-bound measurement inventory to the 148,741-versus-80,000 reservation and process-versus-observer timing discrepancy.", "small", [
		"Consume the predecessor source-binding receipt without reopening its source search.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation.",
		"Define and preserve separate process-time and observer end-to-end wall-time scopes.",
		"Change no mathematical claim, candidate, manifest semantics, or campaign phase."
	], "results/inbox/strategy-cost-scope-reconciliation-v1/**", "Stop if the predecessor receipt is absent or ambiguous. Do not estimate missing usage, rerun research, or create another repair generation.")] : /bind missing epoch token measurements to their source runs/i.test(e?.task || "") ? [Os(e, "Inventory the six epoch run identifiers and token-source locations", "Freeze the source map before attempting any token-value recovery so discovery cannot consume the reconciliation lease.", "small", [
		"Enumerate exactly the six named run IDs from the predecessor contract.",
		"Classify each available source location as receipt-bound, ledger-only, or absent.",
		"Record immutable source references without estimating, copying, or reconciling token values."
	], "results/inbox/strategy-cost-source-inventory-v1/**", "One bounded source-location inventory only. Do not recover values, inspect unrelated runs, estimate usage, or rerun research."), Os(e, "Bind epoch token values to the frozen six-run inventory", "Recover values only from the predecessor's exact source map and preserve irrecoverable measurements explicitly.", "small", [
		"Consume the exact six-run source inventory receipt without reopening discovery.",
		"Give every run a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Never impute an unknown value as zero and preserve receipt-bound versus ledger-only provenance.",
		"Change no resource policy, mathematical claim, or campaign phase."
	], "results/inbox/strategy-cost-value-binding-v1/**", "Stop when an inventoried source is absent or ambiguous and record UNKNOWN with provenance. Do not estimate, rerun research, or reconcile reservation policy.", ["Inventory the six epoch run identifiers and token-source locations"])] : /reconcile epoch reservation and wall-time scopes/i.test(e?.task || "") ? [Os(e, "Define frozen epoch reservation and wall-time accounting scopes", "Freeze the exact accounting definitions before applying any measurements so the reconciliation cannot expand into another source search.", "small", [
		"Consume the exact six-run token-value binding receipt and preserve every UNKNOWN value.",
		"Define reservation, process-time, and observer end-to-end wall-time scopes without applying or estimating measurements.",
		"Bind the definitions to the frozen epoch and six-run inventory.",
		"Change no resource policy, mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-scope-definitions-v1/**", "Stop if the six-run value-binding receipt is absent or ambiguous. Do not search for sources, apply measurements, estimate usage, or exceed 20,000 tokens.", ["Bind epoch token values to the frozen six-run inventory"]), Os(e, "Apply frozen epoch measurements to reservation reconciliation", "Apply only the predecessor's frozen scope definitions and source-bound values in one bounded accounting pass.", "small", [
		"Consume the exact predecessor scope-definition receipt without reopening definitions or source discovery.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation while preserving UNKNOWN values.",
		"Report process-time and observer end-to-end wall-time separately.",
		"Emit graph-effect NONE and change no mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-reservation-reconciliation-v1/**", "Stop at the first predecessor mismatch or unresolved value. Do not estimate, search other runs, rerun research, or exceed 20,000 tokens.")] : [];
}
//#endregion
//#region src/ui/PrimaryActionRail.svelte
Ho();
var js = /* @__PURE__ */ K("<div class=\"rail-direction\"><span>CURRENT GROUNDING</span><strong> </strong></div>"), Ms = /* @__PURE__ */ K("<div class=\"rail-observation\"><span>OBSERVED ACTIVITY · NON-AUTHORITATIVE</span><strong> </strong></div>"), Ns = /* @__PURE__ */ K("<button> </button>"), Ps = /* @__PURE__ */ K("<li><b> </b><span> </span></li>"), Fs = /* @__PURE__ */ K("<ul></ul>"), Is = /* @__PURE__ */ K("<p> </p> <!>", 1), Ls = /* @__PURE__ */ K("<li><b> </b><div><strong> </strong><p> </p><small> </small></div></li>"), Rs = /* @__PURE__ */ K("<ol></ol>"), zs = /* @__PURE__ */ K("<details class=\"rail-inspector\"><summary><span>Inspect the decision packet</span><strong> </strong></summary> <div class=\"rail-packet\"><!> <label class=\"rail-note\"><span>Operator note or revision direction</span><textarea rows=\"3\" placeholder=\"Optional, but useful when redirecting or requesting revision\"></textarea></label></div></details>"), Bs = /* @__PURE__ */ K("<div class=\"recovery-report\"><div class=\"recovery-report-grid\"><div><span>WORKFLOW</span><strong> </strong></div> <div><span>FROZEN WAVE</span><strong> </strong></div> <div><span>ACCOUNTING</span><strong> </strong></div> <div><span>CONTROLLED EXECUTION</span><strong> </strong></div></div> <p class=\"recovery-digest\"><span>BOUND REPORT</span><code> </code></p> <p> </p> <label class=\"recovery-choice\"><span>Explicit recovery decision</span><select><option>Preserve the current hold</option><option>Align the historical wave to the workflow</option><option>Align the workflow to the frozen wave</option><option>Apply terminal-evidence projection repair</option></select></label> <label class=\"rail-note\"><span>Recovery rationale</span><textarea rows=\"3\" placeholder=\"Why this historical boundary—not the research direction—should change\"></textarea></label> <label class=\"recovery-confirm\"><input type=\"checkbox\"/><span>I reviewed the exact digest and authorize only this historical recovery decision.</span></label> <div class=\"recovery-boundary\"><strong>No inferred authority</strong><span>This command cannot infer a worker result, dispatch work, promote claims, merge, or push.</span></div> <button class=\"primary-button recovery-apply\"> </button></div>"), Vs = /* @__PURE__ */ K("<div class=\"recovery-report empty\"><p>Freeze a fresh report before choosing a transition. Preparation is read-only with respect to campaign workflow, workers, claims, Git, and publication.</p></div>"), Hs = /* @__PURE__ */ K("<details class=\"rail-inspector rail-recovery\"><summary><span>Historical recovery protocol</span><strong> </strong></summary> <!></details>"), Us = /* @__PURE__ */ K("<div role=\"status\"> </div>"), Ws = /* @__PURE__ */ K("<section class=\"lifecycle-focus primary-action-rail\" id=\"next-action\" aria-live=\"polite\"><div class=\"rail-copy\"><div class=\"rail-kicker\"><span> </span><strong> </strong><i> </i></div> <h2> </h2> <p> </p> <!> <!> <details class=\"rail-hint\"><summary><span>WHY THIS MATTERS</span><strong>Plain-language hint + mathematical connection</strong></summary> <div><p><b>What this state means.</b> </p> <p><b>Mathematical connection.</b> </p> <p><b>What your click changes.</b> </p></div></details></div> <div class=\"lifecycle-actions rail-actions\"></div> <!> <!> <!></section>"), Gs = /* @__PURE__ */ K("<button><strong> </strong><span> </span><small> </small></button>"), Ks = /* @__PURE__ */ K("<section class=\"project-picker\" aria-label=\"Campaign projects\"><div><p class=\"eyebrow\">CAMPAIGNS</p><h2>Choose a campaign control surface</h2></div> <div></div></section>");
function qs(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(""), m = /* @__PURE__ */ I("pending"), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I("PRESERVE_HOLD"), _ = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I(!1), y = /* @__PURE__ */ I(""), b = /* @__PURE__ */ I(""), x = {
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
		}, o = t.activeLease, s = String(e.loop?.error || ""), c = As(t), l = ks(t, s), u = n.map((e) => ({
			targetId: e.id,
			task: e.task,
			children: As(e)
		})).filter((e) => e.children.length >= 2 && ks(n.find((t) => t.id === e.targetId), s));
		if (c.length && l) return {
			status: u.length > 1 ? `CUSTODY CONTRACT RESHAPE · ${u.length} OVERSIZED` : `CUSTODY CONTRACT RESHAPE${i}`,
			title: u.length > 1 ? `${u.length} jobs are larger than their custody leases` : "This job is larger than one custody lease",
			detail: u.length > 1 ? `All ${u.length} failed receipts landed zero changes. One approval replaces them with ${u.reduce((e, t) => e + t.children.length, 0)} dependency-ordered successors and resumes the one-at-a-time custody steward.` : `The failed receipt landed no changes. Replace this oversized contract with ${c.length} dependency-ordered successors and resume the one-at-a-time custody steward.`,
			actions: [{
				key: "custody.reshape-and-resume",
				args: { batch: u.length > 1 ? u : [{
					targetId: t.id,
					task: t.task,
					children: c
				}] },
				label: u.length > 1 ? `Split all ${u.length} & resume custody` : "Split & resume custody",
				style: "primary-button"
			}, a]
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
		let t = e.controlState?.recovery, n = (e.researchRuns || []).find((e) => e.status === "failed" && !e.evidenceSha256);
		if (t?.required && n && e.researchSchedule?.status === "failed") return {
			status: "SAFE RETRY READY",
			title: "Return the failed launch to one checked gate",
			detail: S(n.error || "The worker stopped before validated evidence landed. Its attempt remains preserved, and no mathematical claim was inferred."),
			actions: [{
				key: "research.failure.requeue",
				targetId: n.id,
				label: "Stage fresh retry",
				style: "primary-button"
			}]
		};
		if (t?.required) {
			let n = e.recoveryReport;
			return {
				status: "RECOVERY REVIEW",
				title: "Workflow and frozen wave disagree",
				detail: S(t.summary || `The workflow is ${t.workflowPhase}, while the frozen wave is ${t.wavePhase}. Inspect the durable boundary before choosing a new transition.`),
				actions: [
					...n?.status === "prepared" ? [{
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
		let r = e.wave?.accounting, i = r ? `${r.accounted}/${r.total}` : "no adopted wave";
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
			detail: `Sol’s triage is ready, but only ${i} source lanes are accounted. Applying the proposal records dispositions; it does not promote claims.`,
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
			detail: `Workers have stopped, but only ${i} source lanes are accounted. The triage pass is read-only until a second human apply gate.`,
			actions: [{
				key: "wave.triage.request",
				label: "Ask Sol to triage",
				style: "primary-button"
			}]
		};
		if (e.canPrepareSynthesis) return {
			status: "READY",
			title: "Freeze the synthesis boundary",
			detail: `The wave is closed at ${i}. Freeze its evidence and campaign context before any synthesis job starts.`,
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
			let n = e.researchSchedule;
			return n?.status === "proposed" ? {
				status: "HUMAN LAUNCH GATE",
				title: `Confirm ${n.members?.length || 0} checked lane${n.members?.length === 1 ? "" : "s"}`,
				detail: "This reserves the exact immutable schedule digest but launches nothing. Autopilot can dispatch only after this human boundary is recorded.",
				actions: [{
					key: "research.schedule.confirm",
					targetId: n.id,
					args: { scheduleDigest: n.digest },
					label: "Confirm checked wave",
					style: "primary-button"
				}]
			} : n?.status === "confirmed" ? {
				status: "READY TO DISPATCH",
				title: "Launch the confirmed bounded wave",
				detail: "The human reservation is recorded. Resuming autopilot launches only the confirmed members and keeps their evidence together for batch intake.",
				actions: [{
					key: "loop.resume",
					label: "Resume & dispatch",
					style: "primary-button"
				}]
			} : e.loop?.resumeBlocker ? {
				status: "PLAN REPAIR NEEDED",
				title: "Repair the checked launch frontier",
				detail: S(e.loop.resumeBlocker),
				actions: [{
					key: "reveal",
					label: "Inspect process & plan",
					target: "#process-history",
					style: "primary-button"
				}, {
					key: "reveal",
					label: "Review strategy context",
					target: "#strategy-workspaces",
					style: "outline-button"
				}]
			} : {
				status: "LAUNCH PREPARATION",
				title: "Freeze the dependency-safe retry schedule",
				detail: "The failed attempt is preserved. Rechecking autopilot will create a fresh immutable schedule for the same checked mathematical contract, without launching it.",
				actions: [{
					key: "loop.resume",
					label: "Prepare checked schedule",
					style: "primary-button"
				}]
			};
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
		} : {
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
					await Ro(), L(m, "success"), L(p, "The worker and receipt boundary is current.");
					return;
				}
				if (e.key === "custody.reshape-and-resume") {
					let t = Array.isArray(e.args?.batch) ? e.args.batch : [];
					if (!t.length) throw Error("No oversized custody contracts were selected");
					for (let e of t) await ns({
						projectId: U(d).id,
						type: "custody.item.reshape",
						targetId: String(e.targetId || ""),
						args: { children: e.children },
						scope: "primary-rail-custody-batch",
						pollLimit: 80
					});
					await ns({
						projectId: U(d).id,
						type: "loop.resume",
						scope: "primary-rail-custody-resume",
						pollLimit: 80
					}), L(m, "success"), L(p, `${t.length} oversized contract${t.length === 1 ? " was" : "s were"} replaced by dependency-ordered successors, and custody autopilot resumed.`);
					return;
				}
				let t = {
					...e.args || {},
					...["synthesis.review", "research.review.resolve"].includes(e.key) ? { note: U(h) } : {}
				}, n = await ns({
					projectId: U(d).id,
					type: e.key,
					targetId: e.targetId || "",
					args: t,
					scope: "primary-rail",
					pollLimit: ["synthesis.request", "research.review.start"].includes(e.key) ? 160 : 80
				});
				if (e.key === "custody.item.promote") {
					let t = n.project.custody?.items?.find((t) => t.id === e.targetId);
					if (t?.status === "ready" && !t.activeLease && (n = await ns({
						projectId: U(d).id,
						type: "custody.lease.prepare",
						targetId: t.id,
						scope: "primary-rail-custody",
						pollLimit: 80
					})), e.args?.autoDispatch) {
						let t = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						t?.status === "prepared" && (n = await ns({
							projectId: U(d).id,
							type: "custody.lease.confirm",
							targetId: t.id,
							args: { leaseDigest: t.leaseDigest },
							scope: "primary-rail-custody",
							pollLimit: 80
						}));
						let r = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						r?.status === "confirmed" && (n = await ns({
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
					t?.activeLease?.status === "confirmed" && (n = await ns({
						projectId: U(d).id,
						type: "custody.lease.dispatch",
						targetId: t.activeLease.id,
						args: { leaseDigest: t.activeLease.leaseDigest },
						scope: "primary-rail-custody",
						pollLimit: 80
					}));
				}
				e.key === "research.failure.requeue" && n.project.phase === "RESEARCH_READY" && await ns({
					projectId: U(d).id,
					type: "loop.resume",
					scope: "primary-rail-retry",
					pollLimit: 80
				}), e.key === "synthesis.review" && e.args?.decision === "research" && n.project.phase === "RESEARCH_REVIEW" && await ns({
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
				await ns({
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
	}), zr(), vo();
	var ee = sa(), M = z(ee), N = (e) => {
		var t = Ws(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
		P(i);
		var o = B(i), y = R(o, !0);
		P(o);
		var b = B(o), C = R(b, !0);
		P(b), P(r);
		var T = B(r, 2), E = R(T, !0);
		P(T);
		var D = B(T, 2), O = R(D, !0);
		P(D);
		var k = B(D, 2), ee = (e) => {
			var t = js(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H((e) => J(r, e), [() => (U(u), W(() => S(U(u), 360)))]), q(e, t);
		};
		Y(k, (e) => {
			U(u) && e(ee);
		});
		var M = B(k, 2), N = (e) => {
			var t = Ms(), n = B(R(t)), r = R(n);
			P(n), P(t), H((e) => J(r, `${e ?? ""} · ${U(d), W(() => U(d).controlState.observation.active) ?? ""} active`), [() => (U(d), W(() => x[U(d).controlState.observation.phase] || U(d).controlState.observation.phase?.toLowerCase().replaceAll("_", " ")))]), q(e, t);
		};
		Y(M, (e) => {
			U(d), W(() => U(d).controlState?.observation) && e(N);
		});
		var te = B(M, 2), ne = B(R(te), 2), re = R(ne), ie = B(R(re));
		P(re);
		var ae = B(re, 2), oe = B(R(ae));
		P(ae);
		var se = B(ae, 2), ce = B(R(se));
		P(se), P(ne), P(te), P(n);
		var le = B(n, 2);
		X(le, 5, () => (U(s), W(() => U(s).actions)), ga, (e, t) => {
			var n = Ns(), r = R(n, !0);
			P(n), H((e) => {
				Z(n, 1, ja((U(t), W(() => U(t).style || "outline-button")))), n.disabled = e, J(r, (U(f), U(t), W(() => U(f) === U(t).key ? "Working…" : U(t).label)));
			}, [() => (U(f), W(() => !!U(f)))]), G("click", n, () => A(U(t))), q(e, n);
		}), P(le);
		var ue = B(le, 2), de = (e) => {
			var t = zs(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = R(a), s = (e) => {
				var t = Is(), n = z(t), r = R(n, !0);
				P(n);
				var i = B(n, 2), a = (e) => {
					var t = Fs();
					X(t, 5, () => (U(l), W(() => U(l).waveReview.quickChecks)), ga, (e, t) => {
						var n = Ps(), r = R(n), i = R(r, !0);
						P(r);
						var a = B(r), o = R(a, !0);
						P(a), P(n), H((e) => {
							Z(n, 1, e), J(i, (U(t), W(() => U(t).status))), J(o, (U(t), W(() => U(t).check)));
						}, [() => ja((U(t), W(() => String(U(t).status).toLowerCase())))]), q(e, n);
					}), P(t), q(e, t);
				};
				Y(i, (e) => {
					U(l), W(() => U(l)?.waveReview?.quickChecks?.length) && e(a);
				}), H(() => J(r, (U(l), W(() => U(l)?.waveReview?.summary || "No synthesis summary was recorded.")))), q(e, t);
			}, u = (e) => {
				var t = Rs();
				X(t, 5, () => U(c), ga, (e, t) => {
					var n = Ls(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a), s = R(o, !0);
					P(o);
					var c = B(o), l = R(c, !0);
					P(c);
					var u = B(c), d = R(u);
					P(u), P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).priority || "–"))), J(s, (U(t), W(() => U(t).taskId || "bounded lane"))), J(l, (U(t), W(() => U(t).question || U(t).objective || U(t).rationale))), J(d, `${e ?? ""} · ${U(t), W(() => U(t).profile || "sonnet-worker") ?? ""}`);
					}, [() => (U(t), W(() => w(U(t))))]), q(e, n);
				}), P(t), q(e, t);
			};
			Y(o, (e) => {
				U(d), W(() => U(d).phase === "DECISION_REQUIRED") ? e(s) : e(u, -1);
			});
			var f = B(o, 2), p = B(R(f));
			en(p), P(f), P(a), P(t), H(() => J(i, (U(d), U(l), U(c), W(() => U(d).phase === "DECISION_REQUIRED" ? `${U(l)?.nextWave?.lanes?.length || 0} proposed next lanes` : `${U(c).length} checked plan records`)))), so(p, () => U(h), (e) => L(h, e)), q(e, t);
		}, fe = /* @__PURE__ */ F(() => (U(d), W(() => ["DECISION_REQUIRED", "RESEARCH_REVIEW"].includes(U(d).phase))));
		Y(ue, (e) => {
			U(fe) && e(de);
		});
		var pe = B(ue, 2), me = (e) => {
			var t = Hs(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = (e) => {
				var t = Bs(), n = R(t), r = R(n), i = B(R(r)), a = R(i, !0);
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
				en(M), P(ee);
				var N = B(ee, 2), te = R(N);
				Qa(te), Ge(), P(N);
				var ne = B(N, 4), re = R(ne, !0);
				P(ne), P(t), H((e) => {
					J(a, (U(d), W(() => U(d).recoveryReport.snapshot?.project?.phase))), J(c, (U(d), W(() => U(d).recoveryReport.snapshot?.wave?.phase))), J(p, `${U(d), W(() => U(d).recoveryReport.snapshot?.wave?.accounting?.accounted) ?? ""}/${U(d), W(() => U(d).recoveryReport.snapshot?.wave?.accounting?.total) ?? ""}`), J(y, (U(d), W(() => U(d).recoveryReport.snapshot?.controlState?.recovery?.activeExecution || 0))), J(S, (U(d), W(() => U(d).recoveryReport.reportDigest))), J(w, (U(d), W(() => U(d).recoveryReport.snapshot?.projectionRepair?.summary))), A.disabled = (U(d), W(() => !U(d).recoveryReport.snapshot?.choices?.applyProjectionRepair)), ne.disabled = e, J(re, U(f) === "campaign.recovery.apply" ? "Revalidating…" : "Apply selected recovery");
				}, [() => (U(v), U(f), W(() => !U(v) || !!U(f)))]), Va(E, () => U(g), (e) => L(g, e)), so(M, () => U(_), (e) => L(_, e)), co(te, () => U(v), (e) => L(v, e)), G("click", ne, j), q(e, t);
			}, s = (e) => {
				q(e, Vs());
			};
			Y(a, (e) => {
				U(d), W(() => U(d).recoveryReport?.status === "prepared") ? e(o) : e(s, -1);
			}), P(t), H(() => {
				t.open = (U(d), W(() => U(d).recoveryReport?.status === "prepared")), J(i, (U(d), W(() => U(d).recoveryReport?.status === "prepared" ? "DIGEST FROZEN" : "REPORT REQUIRED")));
			}), q(e, t);
		};
		Y(pe, (e) => {
			U(d), U(s), W(() => U(d).controlState?.recovery?.required && U(s).status !== "SAFE RETRY READY") && e(me);
		});
		var he = B(pe, 2), ge = (e) => {
			var t = Us(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `gate-feedback ${U(m) ?? ""}`), J(n, U(p));
			}), q(e, t);
		};
		Y(he, (e) => {
			U(p) && e(ge);
		}), P(t), H((e, t) => {
			J(a, (U(d), W(() => U(d).id))), J(y, e), J(C, (U(s), W(() => U(s).status))), J(E, (U(s), W(() => U(s).title))), J(O, (U(s), W(() => U(s).detail))), J(ie, ` ${U(d), W(() => U(d).phase === "RESEARCH_READY" ? "The research question and resource cap are fixed, but no worker may run until the exact schedule is confirmed." : U(d).phase === "RESEARCH_INTAKE" ? "A worker boundary has settled; Lane Watch is deciding whether there is valid evidence to accept or an infrastructure attempt to retry." : "This is the next authority boundary in the campaign loop; observation alone cannot cross it.") ?? ""}`), J(oe, ` ${t ?? ""}`), J(ce, ` ${U(s), W(() => U(s).actions[0]?.key === "research.failure.requeue" ? "It preserves the failed attempt, restores the same checked question to scheduling, and prepares a new confirmation gate. It does not claim a result or dispatch by itself." : U(s).actions[0]?.key === "research.schedule.confirm" ? "It authorizes only this frozen task list and budget. It does not yet accept evidence or change campaign truth." : "Only the named workflow boundary changes; worker output, mathematical truth, Git integration, and publication remain separately gated.") ?? ""}`);
		}, [() => (U(d), W(() => x[U(d).phase] || U(d).phase?.toLowerCase().replaceAll("_", " "))), () => (U(d), U(u), W(() => S(U(d).researchSchedule?.members?.[0]?.expectedDelta || U(d).researchPlan?.response?.lanes?.[0]?.evidenceExpected || U(u) || U(d).role, 420)))]), q(e, t);
	}, te = (e) => {
		var t = Ks(), r = B(R(t), 2);
		X(r, 5, () => (n(), W(() => n().control.projectIndex)), ga, (e, t) => {
			var n = Gs(), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a);
			var s = B(a), c = R(s, !0);
			P(s), P(n), H(() => {
				J(i, (U(t), W(() => U(t).id))), J(o, (U(t), W(() => x[U(t).phase] || U(t).phase))), J(c, (U(t), W(() => U(t).role)));
			}), G("click", n, () => No(String(U(t).id))), q(e, n);
		}), P(r), P(t), q(e, t);
	};
	Y(M, (e) => {
		U(d) && U(s) ? e(N) : (n(), W(() => n().control?.projectIndex?.length) && e(te, 1));
	}), q(e, ee), bt(), i();
}
//#endregion
//#region src/ui/PacketInbox.svelte
Xi(["click"]), Ho();
var Js = /* @__PURE__ */ K("<li><span> </span> <div><strong> </strong><small> </small></div> <code> </code></li>"), Ys = /* @__PURE__ */ K("<ol class=\"packet-list\"></ol>"), Xs = /* @__PURE__ */ K("<p class=\"packet-empty\">No queue packets are currently in the bounded context window.</p>"), Zs = /* @__PURE__ */ K("<section class=\"packet-inbox\" id=\"packet-inbox\" aria-label=\"Research packet inbox\"><header><div><p>RESEARCH PACKET INBOX</p><h2>Drop context here; promote it through explicit gates</h2><span>A packet may shape the next plan. It cannot dispatch, adopt a wave, or become mathematical authority by appearing here.</span></div> <strong> </strong></header> <div class=\"packet-drop\"><div><span>WATCHED DROP POINT</span><code> </code><small>The context registry hashes the five newest Markdown packets on its next observation pass.</small></div> <button class=\"outline-button compact\"> </button></div> <div class=\"packet-intake-grid\"><section><div class=\"packet-section-title\"><span>RECEIVED CONTEXT</span><strong> </strong></div> <!></section> <section class=\"packet-contract\"><div class=\"packet-section-title\"><span>MINIMUM PACKET CONTRACT</span><strong>Markdown · context only</strong></div> <ol><li><b>1</b><span><strong>Question and intended delta</strong><small>What should change in campaign knowledge if the work succeeds?</small></span></li> <li><b>2</b><span><strong>Dependencies and exact evidence base</strong><small>Name required receipts, commits, or unresolved gates.</small></span></li> <li><b>3</b><span><strong>Allowed work and stop conditions</strong><small>Bound scope, resources, prohibited inference, and honest failure.</small></span></li> <li><b>4</b><span><strong>Proposed lanes, never authority</strong><small>Sol review and later human confirmation compile any launch contract.</small></span></li></ol></section></div> <footer><b> </b> <span> </span></footer></section>");
function Qs(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(!1);
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
	}), zr(), vo();
	var m = sa(), h = z(m), g = (e) => {
		var t = Zs(), n = R(t), r = B(R(n), 2);
		let i;
		var l = R(r, !0);
		P(r), P(n);
		var m = B(n, 2), h = R(m), g = B(R(h)), _ = R(g, !0);
		P(g), Ge(), P(h);
		var v = B(h, 2), y = R(v, !0);
		P(v), P(m);
		var b = B(m, 2), x = R(b), S = R(x), C = B(R(S)), w = R(C);
		P(C), P(S);
		var T = B(S, 2), E = (e) => {
			var t = Ys();
			X(t, 7, () => U(a), (e) => e.id, (e, t, n) => {
				var r = Js();
				let i;
				var a = R(r), o = R(a, !0);
				P(a);
				var s = B(a, 2), c = R(s), l = R(c, !0);
				P(c);
				var u = B(c), p = R(u);
				P(u), P(s);
				var m = B(s, 2), h = R(m, !0);
				P(m), P(r), H((e, a, s, c) => {
					i = Z(r, 1, "", null, i, { newest: U(n) === 0 }), J(o, U(n) === 0 ? "NEWEST" : `QUEUE ${U(n) + 1}`), J(l, e), J(p, `${a ?? ""} · ${s ?? ""} bytes`), to(m, "title", (U(t), W(() => U(t).sha256))), J(h, c);
				}, [
					() => (U(t), W(() => d(U(t).path))),
					() => (U(t), W(() => new Date(U(t).modifiedAt).toLocaleString())),
					() => (U(t), W(() => Number(U(t).bytes || 0).toLocaleString())),
					() => (U(t), W(() => f(U(t).sha256)))
				]), q(e, r);
			}), P(t), q(e, t);
		}, D = (e) => {
			q(e, Xs());
		};
		Y(T, (e) => {
			U(a), W(() => U(a).length) ? e(E) : e(D, -1);
		}), P(x), Ge(2), P(b);
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
	}), q(e, m), bt(), i();
}
Xi(["click"]);
//#endregion
//#region src/ui/campaign-interpretation.ts
var $s = [
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
function $(e, t = "") {
	return typeof e == "string" && e.trim() ? e.trim() : t;
}
function ec(e) {
	return Array.isArray(e) ? e : [];
}
function tc(e) {
	let t = $(e).toUpperCase();
	return t.includes("NOT_SUPPORTED") || t.includes("BLOCK") || t.includes("REFUT") ? "BLOCKED" : t.includes("UNMEASURED") || t.includes("UNCHANGED") || t.includes("OPEN") ? "UNMEASURED" : t.includes("SUPPORTED") || t.includes("ADVANCED") ? "SUPPORTED" : t.includes("PENDING") || t.includes("PROPOSED") ? "PROPOSED" : "CONTEXT";
}
function nc(e) {
	let t = ec(e?.researchRuns).filter((e) => [
		"launching",
		"running",
		"blocked",
		"evidence_ready",
		"returned_to_sol"
	].includes(e?.status)).sort((e, t) => $(t?.updatedAt).localeCompare($(e?.updatedAt)))[0];
	return $(t?.strategy?.trackId, $(e?.researchPlan?.response?.lanes?.[0]?.strategy?.trackId));
}
function rc(e, t) {
	let n = `${$(e?.claimId)} ${$(e?.summary)}`.toUpperCase();
	return n.includes("ASYM") || n.includes("SUPPLY") || n.includes("CANDIDATE") ? "supply" : n.includes("GEOMETRIC") || n.includes("REALIZATION") || n.includes("DECISION") ? "decision" : n.includes("COVERAGE") || n.includes("CENSUS") || n.includes("V4") || n.includes("C2") ? "coverage" : t;
}
function ic(e) {
	let t = e?.wave?.synthesis?.response || null, n = e?.researchPlan?.response || null, r = t?.operatorBrief || {}, i = e?.strategy?.charter || {}, a = !!(n && [
		"RESEARCH_REVIEW",
		"RESEARCH_READY",
		"REVISING"
	].includes($(e?.phase))), o = a ? "checked-plan" : t ? "frozen-synthesis" : n ? "checked-plan" : "campaign-state", s = nc(e), c = {
		id: "campaign-objective",
		kind: "objective",
		kicker: "NORTH STAR",
		title: $(i.question, $(e?.role, "Campaign objective")),
		summary: $(i.thesis, "Advance the campaign's central mathematical question through bounded, independently checkable evidence."),
		state: "OPEN",
		why: "Every lane should change a denominator, candidate supply, candidate decision, or the confidence in a reusable method.",
		relation: "This objective owns the strategic tracks and provides the test for whether activity is genuine progress.",
		scope: ["The objective remains open until promotion-grade evidence changes its mathematical status."]
	}, l = {
		id: "current-quest",
		kind: "quest",
		kicker: "CURRENT QUEST",
		title: a ? $(n?.summary, "Shape the next bounded wave from the synthesized result.") : $(r.headline, $(n?.summary, `Campaign phase: ${$(e?.phase, "planning").replaceAll("_", " ")}`)),
		summary: a ? $(n?.operatorGuidance, "The synthesis is being translated into checked, resource-bounded launch contracts.") : $(r.whereWeAre, $(n?.operatorGuidance, $(e?.wave?.aggregate?.nextBoundary, c.summary))),
		state: a ? "ACTIVE" : e?.phase === "DECISION_REQUIRED" ? "SUPPORTED" : "ACTIVE",
		trackId: s,
		why: a ? "This is the current planning problem: decide which proposed branch best converts the last result into the next defensible knowledge gain." : $(r.currentFocus, "This is the narrowest currently authorized move that can improve the campaign's knowledge state."),
		relation: `This quest advances the ${s || "current"} track while remaining subordinate to the campaign objective.`,
		evidence: ec(r.recentProgress).map((e) => $(e)).filter(Boolean),
		scope: ec(r.watchouts).map((e) => $(e)).filter(Boolean)
	}, u = (a && ec(n?.lanes).length ? ec(n.lanes).filter((e) => $(e?.action).toUpperCase() !== "DROP") : ec(t?.nextWave?.lanes).length ? ec(t.nextWave.lanes) : ec(n?.lanes)).filter(Boolean), d = new Set(a ? u.map((e) => $(e?.strategy?.trackId, $(e?.trackId))).filter(Boolean) : [s].filter(Boolean)), f = {
		id: "next-decision",
		kind: "decision",
		kicker: "HUMAN DECISION",
		title: a ? "Approve, revise, or block the checked next-wave plan." : $(r.nextDecision, $(n?.operatorGuidance, "Choose the next bounded campaign move.")),
		summary: a ? $(n?.operatorGuidance, $(n?.summary)) : $(t?.nextWave?.objective, $(n?.summary, "Select only work whose expected knowledge delta justifies its resource and evidence contract.")),
		state: e?.controlState?.recovery?.required ? "BLOCKED" : "PROPOSED",
		why: "The campaign branches here; no proposal acquires authority until the operator chooses and a checked schedule is frozen.",
		relation: "The selected branch returns to the main campaign line through planning, evidence intake, synthesis, and another explicit decision.",
		unlocks: u.map((e) => $(e?.objective, $(e?.question, $(e?.taskId)))).filter(Boolean)
	}, p = ec(i.tracks).map((e) => ({
		id: `track-${$(e?.id, "unknown")}`,
		kind: "track",
		kicker: `${Math.round(Number(e?.targetShare || 0) * 100)}% TARGET`,
		title: $(e?.label, $(e?.id, "Research track")),
		summary: $(e?.purpose, "A persistent route from bounded work back to the campaign objective."),
		state: d.has($(e?.id)) ? "ACTIVE" : "OPEN",
		trackId: $(e?.id),
		relation: `This track is one of ${Math.max(1, ec(i.tracks).length)} balanced routes to the campaign objective.`,
		metrics: ec(e?.metrics).map((e) => $(e)).filter(Boolean),
		color: $(e?.color, "#71d6a0")
	})), m = ec(t?.claimDeltas).map((e, t) => ({
		id: `claim-${$(e?.claimId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
		kind: "claim",
		kicker: "KNOWLEDGE DELTA",
		title: $(e?.summary, $(e?.claimId, "Claim update")),
		summary: $(e?.summary, "The synthesis recorded a bounded change in campaign knowledge."),
		state: tc(e?.proposedStatus),
		trackId: rc(e, s),
		why: `Status: ${$(e?.proposedStatus, "context only").replaceAll("_", " ")}.`,
		relation: "Claim deltas are the bridge between a completed lane and measurable progress toward the campaign objective.",
		evidence: ec(e?.evidence).map((e) => $(e)).filter(Boolean),
		scope: ec(e?.objections).map((e) => $(e)).filter(Boolean)
	})), h = u.map((e, t) => {
		let r = ec(n?.lanes).find((t) => t?.taskId === e?.taskId) || e, i = $(r?.strategy?.trackId, $(e?.trackId, "unassigned"));
		return {
			id: `proposal-${$(e?.taskId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
			kind: "proposal",
			kicker: `PROPOSED · ${$(r?.strategy?.workKind, "research").toUpperCase()}`,
			title: $(e?.objective, $(r?.question, $(e?.taskId, "Bounded follow-up"))),
			summary: $(r?.rationale, $(e?.objective, "A bounded follow-up proposed by synthesis.")),
			state: "PROPOSED",
			trackId: i,
			why: $(r?.strategy?.expectedDelta, "It is proposed because it can change a named campaign metric."),
			relation: `This branch feeds the ${i} track and still requires a checked plan and human-confirmed schedule.`,
			evidence: [$(r?.evidenceExpected)].filter(Boolean),
			scope: [$(r?.stopCondition)].filter(Boolean),
			unlocks: [$(r?.strategy?.expectedDelta)].filter(Boolean)
		};
	}), g = JSON.stringify({
		objective: c,
		quest: l,
		decision: f,
		claims: m,
		proposals: h
	}), _ = $s.filter((e) => e.pattern.test(g)).map((e) => ({
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
		progress: ec(r.recentProgress).map((e) => $(e)).filter(Boolean),
		watchouts: ec(r.watchouts).map((e) => $(e)).filter(Boolean),
		tracks: p,
		claims: m,
		proposals: h,
		concepts: _
	};
}
function ac(e) {
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
Ho();
var oc = /* @__PURE__ */ K("<li><b></b><span> </span></li>"), sc = /* @__PURE__ */ K("<ol></ol>"), cc = /* @__PURE__ */ K("<p>No synthesized progress delta is available yet.</p>"), lc = /* @__PURE__ */ K("<li> </li>"), uc = /* @__PURE__ */ K("<div class=\"brief-ledger\"><section><header><span>WHAT CHANGED</span><strong> </strong></header> <!></section> <details open=\"\"><summary><span>SCOPE & WATCHOUTS</span><strong> </strong></summary> <ul></ul></details></div>"), dc = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button>"), fc = /* @__PURE__ */ K("<div class=\"atlas-empty\"><span>OPEN CAPACITY</span><strong>No current claim or proposed lane is assigned here.</strong></div>"), pc = /* @__PURE__ */ K("<section class=\"atlas-track\"><button><span> </span><strong> </strong><small> </small></button> <div><!></div></section>"), mc = /* @__PURE__ */ K("<button><span>CONTEXT</span><strong> </strong></button>"), hc = /* @__PURE__ */ K("<section class=\"object-codex\"><header><span>OBJECT CODEX</span><strong>Learn the mathematical pieces on this map</strong></header> <div></div></section>"), gc = /* @__PURE__ */ K("<details open=\"\"><summary>Evidence <strong> </strong></summary><ul></ul></details>"), _c = /* @__PURE__ */ K("<details open=\"\"><summary>Scope & objections <strong> </strong></summary><ul></ul></details>"), vc = /* @__PURE__ */ K("<details><summary>What this could unlock <strong> </strong></summary><ul></ul></details>"), yc = /* @__PURE__ */ K("<details><summary>Progress measures <strong> </strong></summary><ul></ul></details>"), bc = /* @__PURE__ */ K("<div class=\"atlas-inspector-lists\"><!> <!> <!> <!></div>"), xc = /* @__PURE__ */ K("<aside aria-live=\"polite\"><header><div><span> </span><h4> </h4></div><strong> </strong></header> <div class=\"atlas-inspector-grid\"><section><span>WHAT THIS IS</span><p> </p></section> <section><span>WHY IT MATTERS</span><p> </p></section> <section><span>HOW IT CONNECTS</span><p> </p></section> <section><span>AUTHORITY</span><p> </p></section></div> <!></aside>"), Sc = /* @__PURE__ */ K("<section class=\"interpretation-surface\" id=\"campaign-interpretation\" aria-label=\"Campaign interpretation and research atlas\"><header class=\"interpretation-heading\"><div><p>CAMPAIGN INTERPRETATION</p> <h2>Understand the mission before choosing the move</h2> <span>A generated briefing and explorable mathematical map, grounded in the same frozen evidence as the control plane.</span></div> <strong> </strong></header> <div class=\"director-deck\"><button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button></div> <!> <section class=\"research-atlas\" aria-label=\"Research Atlas\"><header><div><p>RESEARCH ATLAS</p><h3>How bounded work connects back to the campaign objective</h3><span>Select any station to inspect its meaning, evidence, scope, and unlocks.</span></div> <div class=\"atlas-legend\" aria-label=\"Interpretation status legend\"><span class=\"supported\">SUPPORTED</span><span class=\"proposed\">PROPOSED</span><span class=\"unmeasured\">UNMEASURED</span><span class=\"blocked\">BLOCKED</span><span class=\"context\">CONTEXT</span></div></header> <div class=\"atlas-board\"><div class=\"atlas-north-star\"><button><span>NORTH STAR</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>CURRENT KNOWLEDGE</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>NEXT BRANCH</span><strong> </strong></button></div> <div class=\"atlas-track-list\"></div> <!></div> <!> <footer><b>INTERPRETATION IS NOT AUTHORITY</b><span>Generated prose helps navigate. Exact receipts, claim states, and human gates remain the source of campaign authority.</span></footer></section></section>");
function Cc(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I("campaign-objective"), l = /* @__PURE__ */ I("");
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
	}), V(() => (U(o), ic), () => {
		L(s, U(o) ? ic(U(o)) : null);
	}), V(() => (U(o), U(l)), () => {
		U(o)?.id !== U(l) && (L(l, U(o)?.id || ""), L(c, "campaign-objective"));
	}), V(() => (U(s), U(c)), () => {
		L(a, u(U(s)).find((e) => e.id === U(c)) || U(s)?.objective || null);
	}), zr(), vo();
	var p = sa(), m = z(p), h = (e) => {
		var t = Sc(), n = R(t), r = B(R(n), 2), i = R(r, !0);
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
			var t = uc(), n = R(t), r = R(n), i = B(R(r)), a = R(i);
			P(i), P(r);
			var o = B(r, 2), c = (e) => {
				var t = sc();
				X(t, 5, () => (U(s), W(() => U(s).progress)), ga, (e, t, n) => {
					var r = oc(), i = R(r);
					i.textContent = n + 1;
					var a = B(i), o = R(a, !0);
					P(a), P(r), H(() => J(o, U(t))), q(e, r);
				}), P(t), q(e, t);
			}, l = (e) => {
				q(e, cc());
			};
			Y(o, (e) => {
				U(s), W(() => U(s).progress.length) ? e(c) : e(l, -1);
			}), P(n);
			var u = B(n, 2), d = R(u), f = B(R(d)), p = R(f);
			P(f), P(d);
			var m = B(d, 2);
			X(m, 5, () => (U(s), W(() => U(s).watchouts)), ga, (e, t) => {
				var n = lc(), r = R(n, !0);
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
			var n = pc(), r = R(n);
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
				var n = sa();
				X(z(n), 1, () => (U(s), U(t), W(() => d(U(s), U(t).trackId))), (e) => e.id, (e, t) => {
					var n = dc();
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
				q(e, fc());
			};
			Y(_, (e) => {
				U(y) ? e(v) : e(b, -1);
			}), P(h), P(n), H((e, o) => {
				Ra(n, (U(t), W(() => `--track-color:${U(t).color || "#71d6a0"}`))), i = Z(r, 1, `atlas-track-label state-${e ?? ""}`, null, i, { chosen: U(a)?.id === U(t).id }), J(c, (U(t), W(() => U(t).kicker))), J(u, (U(t), W(() => U(t).title))), J(m, (U(t), W(() => U(t).state === "ACTIVE" ? "current route" : "persistent route"))), g = Z(h, 1, "atlas-rail", null, g, o);
			}, [() => (U(t), W(() => U(t).state.toLowerCase())), () => ({ empty: !d(U(s), U(t).trackId).length })]), G("click", r, () => f(U(t))), q(e, n);
		}), P(be);
		var xe = B(be, 2), Se = (e) => {
			var t = hc(), n = B(R(t), 2);
			X(n, 5, () => (U(s), W(() => U(s).concepts)), (e) => e.id, (e, t) => {
				var n = mc();
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
			var t = xc(), n = R(t), r = R(n), i = R(r), o = R(i);
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
				var t = bc(), n = R(t), r = (e) => {
					var t = gc(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).evidence)), ga, (e, t) => {
						var n = lc(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).evidence.length)))), q(e, t);
				};
				Y(n, (e) => {
					U(a), W(() => U(a).evidence?.length) && e(r);
				});
				var i = B(n, 2), o = (e) => {
					var t = _c(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).scope)), ga, (e, t) => {
						var n = lc(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).scope.length)))), q(e, t);
				};
				Y(i, (e) => {
					U(a), W(() => U(a).scope?.length) && e(o);
				});
				var s = B(i, 2), c = (e) => {
					var t = vc(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).unlocks)), ga, (e, t) => {
						var n = lc(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(o), P(t), H(() => J(i, (U(a), W(() => U(a).unlocks.length)))), q(e, t);
				};
				Y(s, (e) => {
					U(a), W(() => U(a).unlocks?.length) && e(c);
				});
				var l = B(s, 2), u = (e) => {
					var t = yc(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var o = B(n);
					X(o, 5, () => (U(a), W(() => U(a).metrics)), ga, (e, t) => {
						var n = lc(), r = R(n, !0);
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
				() => (xi(ac), U(a), W(() => ac(U(a).state)))
			]), q(e, t);
		};
		Y(Ce, (e) => {
			U(a) && e(we);
		}), Ge(2), P(ae), P(t), H((e, t, n, o) => {
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
	}), q(e, p), bt(), i();
}
//#endregion
//#region src/ui/ExternalPerspective.svelte
Xi(["click"]), Ho();
var wc = /* @__PURE__ */ K("<a target=\"_blank\" rel=\"noreferrer\">Open source ↗</a>"), Tc = /* @__PURE__ */ K("<p class=\"redirect-error\"> </p>"), Ec = /* @__PURE__ */ K("<div class=\"redirect-shift\"><span>Proposed shift</span><strong> </strong></div>"), Dc = /* @__PURE__ */ K("<div><span> </span><strong> </strong><p> </p></div>"), Oc = /* @__PURE__ */ K("<details><summary> </summary><div class=\"redirect-direction-list\"></div></details>"), kc = /* @__PURE__ */ K("<div class=\"redirect-gate\"><small>Applying changes future synthesis and planning context and stages any new questions as proposals. It does not launch a worker.</small><button class=\"primary-button\"> </button></div>"), Ac = /* @__PURE__ */ K("<article class=\"redirect-proposal\"><div class=\"redirect-proposal-heading\"><div><span> </span><strong> </strong></div><!></div> <!> <p> </p> <!> <!> <!></article>"), jc = /* @__PURE__ */ K("<div><span> </span><strong> </strong><small> </small></div>"), Mc = /* @__PURE__ */ K("<details class=\"redirect-history\"><summary>Earlier external inputs <strong> </strong></summary><!></details>"), Nc = /* @__PURE__ */ K("<div role=\"status\"> </div>"), Pc = /* @__PURE__ */ K("<section id=\"external-perspective\"><div class=\"redirect-heading\"><div><p class=\"eyebrow\">EXTERNAL PERSPECTIVE</p><h3>Widen or redirect the campaign</h3><p>Drop in a paper, argument, observation, or reframing. It pauses autopilot at a safe boundary and asks Sol to reshape direction without dispatching or invalidating landed evidence.</p></div><span class=\"redirect-status\"> </span></div> <details class=\"redirect-composer\"><summary><span> </span><strong>Sol read-only pass</strong></summary> <div class=\"redirect-fields\"><input maxlength=\"240\" placeholder=\"Short title (optional)\"/><input maxlength=\"2000\" inputmode=\"url\" placeholder=\"Source link (optional)\"/></div> <textarea id=\"redirect-content\" rows=\"6\" maxlength=\"24000\" placeholder=\"Paste the relevant idea, critique, external result, or your own reframing…\"></textarea> <div class=\"redirect-submit\"><small>This becomes an immutable input bundle. Sol compares it with the current synthesis, checked plan, and run history.</small><button class=\"primary-button\"> </button></div></details> <!> <!> <!></section>");
function Fc(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(""), m = /* @__PURE__ */ I(""), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I("pending");
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
				await ns({
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
	async function T(e) {
		if (!(!U(d) || U(g))) {
			L(g, "apply"), L(v, "pending"), L(_, "Applying the advisory redirect to future planning context…");
			try {
				await ns({
					projectId: U(d).id,
					type: "campaign.redirect.apply",
					targetId: e,
					scope: "external-perspective"
				}), L(v, "success"), L(_, "The redirect is now part of future synthesis and planning context. No worker was launched.");
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
	}), zr(), vo();
	var E = sa(), D = z(E), O = (e) => {
		var t = Pc(), n = R(t), r = B(R(n)), i = R(r, !0);
		P(r), P(n);
		var d = B(n, 2), f = R(d), y = R(f), b = R(y, !0);
		P(y), Ge(), P(f);
		var E = B(f, 2), D = R(E);
		Qa(D);
		var O = B(D);
		Qa(O), P(E);
		var k = B(E, 2);
		en(k);
		var A = B(k, 2), j = B(R(A)), ee = R(j, !0);
		P(j), P(A), P(d);
		var M = B(d, 2), N = (e) => {
			var t = Ac(), n = R(t), r = R(n), i = R(r), a = R(i);
			P(i);
			var l = B(i), u = R(l, !0);
			P(l), P(r);
			var d = B(r), f = (e) => {
				var t = wc();
				H(() => to(t, "href", (U(o), W(() => U(o).sourceUrl)))), q(e, t);
			};
			Y(d, (e) => {
				U(o), W(() => U(o).sourceUrl) && e(f);
			}), P(n);
			var p = B(n, 2), m = (e) => {
				var t = Tc(), n = R(t, !0);
				P(t), H(() => J(n, (U(o), W(() => U(o).error)))), q(e, t);
			};
			Y(p, (e) => {
				U(o), W(() => U(o).error) && e(m);
			});
			var h = B(p, 2), _ = R(h, !0);
			P(h);
			var v = B(h, 2), y = (e) => {
				var t = Ec(), n = B(R(t)), r = R(n, !0);
				P(n), P(t), H(() => J(r, (U(s), W(() => U(s).perspectiveShift)))), q(e, t);
			};
			Y(v, (e) => {
				U(s), W(() => U(s).perspectiveShift) && e(y);
			});
			var b = B(v, 2), x = (e) => {
				var t = Oc(), n = R(t), r = R(n);
				P(n);
				var i = B(n);
				X(i, 5, () => U(c), ga, (e, t) => {
					var n = Dc(), r = R(n), i = R(r, !0);
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
				var t = kc(), n = B(R(t)), r = R(n, !0);
				P(n), P(t), H((e) => {
					n.disabled = e, J(r, U(g) === "apply" ? "Applying…" : "Use this redirect");
				}, [() => (U(g), W(() => !!U(g)))]), G("click", n, () => T(U(o).id)), q(e, t);
			};
			Y(w, (e) => {
				U(o), W(() => U(o).status === "drafted") && e(E);
			}), P(t), H((e, t) => {
				J(a, `${U(o), W(() => U(o).status) ?? ""} · ${e ?? ""}`), J(u, (U(o), W(() => U(o).title))), J(_, t);
			}, [() => (U(o), W(() => C(U(o).updatedAt))), () => (U(s), U(o), W(() => U(s).summary || (U(o).status === "drafting" ? "Sol is comparing this input against the current evidence, plan, and campaign assumptions." : S(U(o).content, 360))))]), q(e, t);
		};
		Y(M, (e) => {
			U(o) && e(N);
		});
		var te = B(M, 2), ne = (e) => {
			var t = Mc(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n), X(B(n), 1, () => (U(a), W(() => U(a).slice(1))), ga, (e, t) => {
				var n = jc(), r = R(n), i = R(r, !0);
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
			var t = Nc(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `gate-feedback redirect-feedback ${U(v) ?? ""}`), J(n, U(_));
			}), q(e, t);
		};
		Y(re, (e) => {
			U(_) && e(ie);
		}), P(t), H((e) => {
			Z(t, 1, `redirect-intake ${U(o), W(() => U(o)?.status || "open") ?? ""}`), J(i, U(u)), d.open = (U(a), W(() => !U(a).length)), J(b, (U(a), W(() => U(a).length ? "Add another perspective" : "Add an external perspective"))), j.disabled = e, J(ee, U(l) ? "Redirect already running" : U(g) === "submit" ? "Freezing perspective…" : "Ask Sol to reshape the campaign");
		}, [() => (U(h), U(l), U(g), W(() => !U(h).trim() || U(l) || !!U(g)))]), G("input", D, x), so(D, () => U(p), (e) => L(p, e)), G("input", O, x), so(O, () => U(m), (e) => L(m, e)), G("input", k, x), so(k, () => U(h), (e) => L(h, e)), G("click", j, w), q(e, t);
	};
	Y(D, (e) => {
		U(d) && e(O);
	}), q(e, E), bt(), i();
}
//#endregion
//#region src/ui/CoordinatorConsole.svelte
Xi(["input", "click"]), Ho();
var Ic = /* @__PURE__ */ K("<div><button class=\"outline-button compact\">Decline</button><button class=\"danger-button\">Accept</button></div>"), Lc = /* @__PURE__ */ K("<article><div><strong> </strong><p> </p></div><!></article>"), Rc = /* @__PURE__ */ K("<section class=\"coordinator-approvals\"><h3>Tool approval requests</h3><!></section>"), zc = /* @__PURE__ */ K("<p>Syncing coordinator history…</p>"), Bc = /* @__PURE__ */ K("<article><span> </span><p> </p></article>"), Vc = /* @__PURE__ */ K("<p>No coordinator messages are loaded yet.</p>"), Hc = /* @__PURE__ */ K("<button class=\"danger-button\">Interrupt turn</button>"), Uc = /* @__PURE__ */ K("<div class=\"coordinator-boundary\"><strong>Semantic coordinator</strong><p>Plans, synthesizes, and checks direction. Dispatch, claim promotion, merges, pushes, and tool approvals remain separate gates.</p></div> <!> <div class=\"coordinator-transcript\" aria-live=\"polite\"><!></div> <div class=\"coordinator-composer\"><textarea rows=\"3\" maxlength=\"12000\" placeholder=\"Message Sol…\"></textarea><div><small>Messages may steer an active turn; they do not bypass campaign gates.</small><button class=\"primary-button\"> </button></div></div> <div class=\"coordinator-utility\"><button class=\"outline-button compact\">Sync history</button><!></div>", 1), Wc = /* @__PURE__ */ K("<button><strong> </strong><span> </span></button>"), Gc = /* @__PURE__ */ K("<p>No attachable workspace tasks found.</p>"), Kc = /* @__PURE__ */ K("<div class=\"coordinator-candidates\"><!><!></div>"), qc = /* @__PURE__ */ K("<div class=\"coordinator-boundary\"><strong>Attach an existing Codex task</strong><p>Lane Watch will verify workspace eligibility before attaching it as the campaign’s semantic coordinator.</p></div> <button class=\"primary-button\"> </button> <!>", 1), Jc = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), Yc = /* @__PURE__ */ K("<details class=\"coordinator-console\" id=\"coordinator-console\"><summary><span><small>SOL COORDINATOR</small><strong> </strong></span><span> </span></summary> <div class=\"coordinator-console-body\"><!> <!></div></details>");
function Xc(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I(""), f = /* @__PURE__ */ I(null), p = "", m = /* @__PURE__ */ I(!1), h = /* @__PURE__ */ I(null);
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
				await ns({
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
	}), zr(), vo();
	var b = sa(), x = z(b), S = (e) => {
		var t = Yc(), n = R(t), r = R(n), i = B(R(r)), c = R(i, !0);
		P(i), P(r);
		var f = B(r), p = R(f);
		P(f), P(n);
		var b = B(n, 2), x = R(b), S = (e) => {
			var t = Uc(), n = B(z(t), 2), r = (e) => {
				var t = Rc();
				X(B(R(t)), 1, () => U(s), ga, (e, t) => {
					var n = Lc(), r = R(n), i = R(r), a = R(i, !0);
					P(i);
					var o = B(i), s = R(o, !0);
					P(o), P(r);
					var c = B(r), l = (e) => {
						var n = Ic(), r = R(n), i = B(r);
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
				q(e, zc());
			}, f = (e) => {
				var t = sa();
				X(z(t), 1, () => U(o), (e) => e.id, (e, t) => {
					var n = Bc(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						Z(n, 1, ja((U(t), W(() => U(t).role)))), J(i, (U(t), W(() => U(t).role))), J(o, e);
					}, [() => (U(t), W(() => y(U(t).text)))]), q(e, n);
				}), q(e, t);
			}, p = (e) => {
				q(e, Vc());
			};
			Y(c, (e) => {
				U(m) ? e(d) : (U(o), W(() => U(o).length) ? e(f, 1) : e(p, -1));
			}), P(i);
			var h = B(i, 2), v = R(h);
			en(v);
			var b = B(v), x = B(R(b)), S = R(x, !0);
			P(x), P(b), P(h);
			var C = B(h, 2), w = R(C), T = B(w), E = (e) => {
				var t = Hc();
				H((e) => t.disabled = e, [() => (U(u), W(() => !!U(u)))]), G("click", t, () => _("coordinator.interrupt")), q(e, t);
			};
			Y(T, (e) => {
				U(a), W(() => U(a).status === "working" && U(a).lastTurnId) && e(E);
			}), P(C), H((e) => {
				x.disabled = e, J(S, U(u) === "coordinator.message.send" ? "Sending…" : "Send message"), w.disabled = U(m);
			}, [() => (U(l), U(u), W(() => !U(l).trim() || !!U(u)))]), so(v, () => U(l), (e) => L(l, e)), G("click", x, () => _("coordinator.message.send", { message: U(l) })), G("click", w, () => g(!0)), q(e, t);
		}, C = (e) => {
			var t = qc(), n = B(z(t), 2), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = Kc(), n = R(t);
				X(n, 1, () => (U(h), W(() => U(h).filter((e) => e.eligible !== !1).slice(0, 12))), ga, (e, t) => {
					var n = Wc(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						n.disabled = e, J(i, (U(t), W(() => U(t).name))), J(o, (U(t), W(() => U(t).cwd)));
					}, [() => (U(u), W(() => !!U(u)))]), G("click", n, () => _("coordinator.attach", { threadId: U(t).id })), q(e, n);
				});
				var r = B(n), i = (e) => {
					q(e, Gc());
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
			var t = Jc(), n = R(t, !0);
			P(t), H(() => J(n, U(d))), q(e, t);
		};
		Y(w, (e) => {
			U(d) && e(T);
		}), P(b), P(t), H(() => {
			J(c, (U(a), W(() => U(a)?.attached ? U(a).name : "No coordinator attached"))), Z(f, 1, `coordinator-state ${U(a), W(() => U(a)?.status || "detached") ?? ""}`), J(p, `${U(a), W(() => U(a)?.status || "DETACHED") ?? ""}${U(s), W(() => U(s).length ? ` · ${U(s).length} approval` : "") ?? ""}`);
		}), Yi("toggle", t, (e) => {
			e.currentTarget.open && g();
		}), q(e, t);
	};
	Y(x, (e) => {
		U(c) && e(S);
	}), q(e, b), bt(), i();
}
//#endregion
//#region src/ui/CampaignSettings.svelte
Xi(["click"]), Ho();
var Zc = /* @__PURE__ */ K("<div class=\"campaign-settings-boundary access-boundary\"><strong> </strong><p> </p></div>"), Qc = /* @__PURE__ */ K("<div class=\"campaign-settings-boundary\"><strong> </strong><p> </p><small>Observation never grants authority. Human wave adoption imports a fixed wave; exact human schedule confirmation grants controller execution only to reserved members.</small></div>"), $c = /* @__PURE__ */ K("<button type=\"button\"><span> </span><strong> </strong><small> </small><p> </p></button>"), el = /* @__PURE__ */ K("<p> </p>"), tl = /* @__PURE__ */ K("<article><span> </span><strong> </strong><small> </small><small> </small></article>"), nl = /* @__PURE__ */ K("<span><small> </small><strong> </strong></span>"), rl = /* @__PURE__ */ K("<div class=\"host-capability-grid\"></div> <div class=\"global-quota-grid\"><span><small>TOKEN COMMITMENTS</small><strong> </strong></span> <!></div> <footer>ENFORCED AT SERIALIZED RESOURCE ACQUISITION · no scheduler or host mutation authority</footer>", 1), il = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), al = /* @__PURE__ */ K("<details class=\"campaign-settings\" id=\"campaign-settings\"><summary><span><small>FUTURE-RUN POLICY</small><strong> </strong></span><span> </span></summary> <div class=\"campaign-settings-body\"><div class=\"campaign-settings-boundary\"><strong>Defaults, never active mutations</strong><p>These choices apply only when a later checked contract is confirmed. They do not restaff a running lane, approve a plan, or launch anything.</p></div> <!> <!> <div class=\"dispatch-profile-grid\"></div> <label class=\"automation-setting\"><span><strong>Automatic boundary handling</strong><small>Controls how far the controller may prepare between explicit human gates.</small></span><select><option>observe</option><option>prepare</option><option>propose</option><option>bounded</option></select></label> <section class=\"operational-governance\" aria-label=\"Operational governance\"><header><span><small>HOSTS & GLOBAL QUOTAS</small><strong>Pre-admission inventory</strong></span><b> </b></header> <!></section> <!></div></details>");
function ol(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(""), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(null), d = "", f = /* @__PURE__ */ I(!1), p = /* @__PURE__ */ I("");
	async function m(e, t) {
		if (!(!U(s) || U(c) || n().access?.canMutate === !1)) {
			L(c, e), L(l, "Saving future-run policy…");
			try {
				await ns({
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
	}), zr(), vo();
	var g = sa(), _ = z(g), v = (e) => {
		var t = al(), r = R(t), i = R(r), d = B(R(i)), g = R(d, !0);
		P(d), P(i);
		var _ = B(i), v = R(_);
		P(_), P(r);
		var y = B(r, 2), b = B(R(y), 2), x = (e) => {
			var t = Zc(), r = R(t), i = R(r);
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
			var t = Qc(), n = R(t), r = R(n);
			P(n);
			var i = B(n), a = R(i, !0);
			P(i), Ge(), P(t), H(() => {
				J(r, `Coordinator interface · ${U(o), W(() => U(o).mode) ?? ""}`), J(a, (U(o), W(() => U(o).reason)));
			}), q(e, t);
		};
		Y(S, (e) => {
			U(o) && e(C);
		});
		var w = B(S, 2);
		X(w, 5, () => (U(a), W(() => U(a).profiles || [])), (e) => e.id, (e, t) => {
			var r = $c();
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
		Ba(E), P(T);
		var ee = B(T, 2), M = R(ee), N = B(R(M)), te = R(N, !0);
		P(N), P(M);
		var ne = B(M, 2), re = (e) => {
			var t = el(), n = R(t, !0);
			P(t), H(() => J(n, U(p))), q(e, t);
		}, ie = (e) => {
			var t = rl(), n = z(t);
			X(n, 5, () => (U(u), W(() => U(u).projects?.[0]?.hosts || [])), (e) => e.id, (e, t) => {
				var n = tl(), r = R(n), i = R(r, !0);
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
			], ga, (e, t) => {
				var n = nl(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a);
				P(a), P(n), H(() => {
					J(i, `${t ?? ""} SLOTS`), J(o, `${U(u), W(() => U(u).quotas.usage.slots[t]) ?? ""} / ${U(u), W(() => U(u).quotas.policy.slots[t]) ?? ""}`);
				}), q(e, n);
			}), P(r), Ge(2), H((e, t) => J(o, `${e ?? ""} / ${t ?? ""}`), [() => (U(u), W(() => U(u).quotas.usage.tokenCommitments.toLocaleString())), () => (U(u), W(() => U(u).quotas.policy.tokenCommitments.toLocaleString()))]), q(e, t);
		}, ae = (e) => {
			var t = el(), n = R(t, !0);
			P(t), H(() => J(n, U(f) ? "Loading scoped host and quota facts…" : "Open this section to load scoped operational facts.")), q(e, t);
		};
		Y(ne, (e) => {
			U(p) ? e(re) : U(u) ? e(ie, 1) : e(ae, -1);
		}), P(ee);
		var oe = B(ee, 2), se = (e) => {
			var t = il(), n = R(t, !0);
			P(t), H(() => J(n, U(l))), q(e, t);
		};
		Y(oe, (e) => {
			U(l) && e(se);
		}), P(y), P(t), H((e, t) => {
			J(g, e), J(v, `${U(o), W(() => U(o)?.mode || "observe-only") ?? ""} · ${U(s), W(() => U(s).automationMode || "prepare") ?? ""}`), E.disabled = t, j !== (j = (U(s), W(() => U(s).automationMode || "prepare"))) && (E.value = (E.__value = (U(s), W(() => U(s).automationMode || "prepare"))) ?? "", za(E, (U(s), W(() => U(s).automationMode || "prepare")))), J(te, (U(u), U(f), W(() => U(u)?.quotas?.status || (U(f) ? "LOADING" : "READ ONLY"))));
		}, [() => (U(a), W(() => U(a).profiles?.find((e) => e.id === U(a).selectedProfile)?.label || U(a).selectedProfile)), () => (U(c), n(), W(() => !!U(c) || n().access?.canMutate === !1))]), Yi("toggle", t, (e) => {
			e.currentTarget.open && h();
		}), G("change", E, (e) => m("project.automation.set", { mode: e.currentTarget.value })), q(e, t);
	};
	Y(_, (e) => {
		U(s) && U(a) && e(v);
	}), q(e, g), bt(), i();
}
//#endregion
//#region src/ui/WaveAccounting.svelte
Xi(["click", "change"]), Ho();
var sl = /* @__PURE__ */ K("<p><b> </b> </p>"), cl = /* @__PURE__ */ K("<div class=\"accounting-controls\"><select><option>Choose disposition</option><option>Repair</option><option>Supersede</option><option>Abandon</option><option>Carry forward</option></select><input placeholder=\"Reason and evidence boundary\"/><button class=\"primary-button\"> </button></div>"), ll = /* @__PURE__ */ K("<li><span class=\"accounting-state\"> </span> <div><strong> </strong><small> </small><!></div> <!></li>"), ul = /* @__PURE__ */ K("<div class=\"gate-feedback\" role=\"status\"> </div>"), dl = /* @__PURE__ */ K("<details class=\"wave-accounting\" id=\"wave-accounting\"><summary><span><small>WAVE CUSTODY</small><strong>Source-lane accounting</strong></span><span> </span></summary> <div class=\"wave-accounting-body\"><div class=\"accounting-boundary\"><strong>Mechanical disposition only</strong><p>Recording a repair, supersession, abandonment, or carry-forward closes custody accounting. It does not endorse the lane’s mathematics or promote a claim.</p></div> <ol></ol> <!></div></details>");
function fl(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I({}), f = /* @__PURE__ */ I({});
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
				await ns({
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
	}), zr(), vo();
	var g = sa(), _ = z(g), v = (e) => {
		var t = dl(), n = R(t), r = B(R(n));
		let i;
		var a = R(r, !0);
		P(r), P(n);
		var c = B(n, 2), g = B(R(c), 2);
		X(g, 5, () => U(o), (e) => e.id, (e, t) => {
			var n = ll();
			let r;
			var i = R(n), a = R(i, !0);
			P(i);
			var o = B(i, 2), s = R(o), c = R(s, !0);
			P(s);
			var u = B(s), g = R(u);
			P(u);
			var _ = B(u), v = (e) => {
				var n = sl(), r = R(n), i = R(r, !0);
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
				var n = cl(), r = R(n), i = R(r);
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
				Ba(r);
				var g = B(r);
				Qa(g);
				var _ = B(g), v = R(_, !0);
				P(_), P(n), H(() => {
					u !== (u = (U(d), U(t), W(() => U(d)[U(t).id] || ""))) && (r.value = (r.__value = (U(d), U(t), W(() => U(d)[U(t).id] || ""))) ?? "", za(r, (U(d), U(t), W(() => U(d)[U(t).id] || "")))), $a(g, (U(f), U(t), W(() => U(f)[U(t).id] || ""))), _.disabled = (U(d), U(t), U(l), W(() => !U(d)[U(t).id] || U(l) === U(t).id)), J(v, (U(l), U(t), W(() => U(l) === U(t).id ? "Recording…" : "Record")));
				}), G("change", r, (e) => p(U(t).id, e.currentTarget.value)), G("input", g, (e) => m(U(t).id, e.currentTarget.value)), G("click", _, () => h(U(t))), q(e, n);
			};
			Y(y, (e) => {
				U(t), W(() => !U(t).accounted) && e(b);
			}), P(n), H((e) => {
				r = Z(n, 1, "", null, r, { open: !U(t).accounted }), J(a, e), J(c, (U(t), W(() => U(t).task))), J(g, `${U(t), W(() => U(t).lane) ?? ""} · ${U(t), W(() => U(t).host) ?? ""} · ${U(t), W(() => U(t).daemon) ?? ""} · ${U(t), W(() => U(t).landing) ?? ""}`);
			}, [() => (U(t), W(() => U(t).accounted ? "ACCOUNTED" : U(t).accountingState?.replaceAll("_", " ")))]), q(e, n);
		}), P(g);
		var _ = B(g, 2), v = (e) => {
			var t = ul(), n = R(t, !0);
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
	}), q(e, g), bt(), i();
}
Xi([
	"change",
	"input",
	"click"
]);
//#endregion
//#region node_modules/d3-dispatch/src/dispatch.js
var pl = { value: () => {} };
function ml() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new hl(n);
}
function hl(e) {
	this._ = e;
}
function gl(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
hl.prototype = ml.prototype = {
	constructor: hl,
	on: function(e, t) {
		var n = this._, r = gl(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = _l(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = vl(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = vl(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new hl(e);
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
function _l(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function vl(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = pl, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var yl = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/d3-selection/src/namespace.js
function bl(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), yl.hasOwnProperty(t) ? {
		space: yl[t],
		local: e
	} : e;
}
//#endregion
//#region node_modules/d3-selection/src/creator.js
function xl(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function Sl(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function Cl(e) {
	var t = bl(e);
	return (t.local ? Sl : xl)(t);
}
//#endregion
//#region node_modules/d3-selection/src/selector.js
function wl() {}
function Tl(e) {
	return e == null ? wl : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/select.js
function El(e) {
	typeof e != "function" && (e = Tl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new md(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/array.js
function Dl(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selectorAll.js
function Ol() {
	return [];
}
function kl(e) {
	return e == null ? Ol : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectAll.js
function Al(e) {
	return function() {
		return Dl(e.apply(this, arguments));
	};
}
function jl(e) {
	e = typeof e == "function" ? Al(e) : kl(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new md(r, i);
}
//#endregion
//#region node_modules/d3-selection/src/matcher.js
function Ml(e) {
	return function() {
		return this.matches(e);
	};
}
function Nl(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChild.js
var Pl = Array.prototype.find;
function Fl(e) {
	return function() {
		return Pl.call(this.children, e);
	};
}
function Il() {
	return this.firstElementChild;
}
function Ll(e) {
	return this.select(e == null ? Il : Fl(typeof e == "function" ? e : Nl(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChildren.js
var Rl = Array.prototype.filter;
function zl() {
	return Array.from(this.children);
}
function Bl(e) {
	return function() {
		return Rl.call(this.children, e);
	};
}
function Vl(e) {
	return this.selectAll(e == null ? zl : Bl(typeof e == "function" ? e : Nl(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/filter.js
function Hl(e) {
	typeof e != "function" && (e = Ml(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new md(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/sparse.js
function Ul(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/d3-selection/src/selection/enter.js
function Wl() {
	return new md(this._enter || this._groups.map(Ul), this._parents);
}
function Gl(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Gl.prototype = {
	constructor: Gl,
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
function Kl(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/data.js
function ql(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Gl(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Jl(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Gl(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function Yl(e) {
	return e.__data__;
}
function Xl(e, t) {
	if (!arguments.length) return Array.from(this, Yl);
	var n = t ? Jl : ql, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Kl(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = Zl(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new md(o, r), o._enter = s, o._exit = c, o;
}
function Zl(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selection/exit.js
function Ql() {
	return new md(this._exit || this._groups.map(Ul), this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/join.js
function $l(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/d3-selection/src/selection/merge.js
function eu(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new md(s, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/order.js
function tu() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/sort.js
function nu(e) {
	e ||= ru;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new md(i, this._parents).order();
}
function ru(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-selection/src/selection/call.js
function iu() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/nodes.js
function au() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-selection/src/selection/node.js
function ou() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/d3-selection/src/selection/size.js
function su() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/selection/empty.js
function cu() {
	return !this.node();
}
//#endregion
//#region node_modules/d3-selection/src/selection/each.js
function lu(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/attr.js
function uu(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function du(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function fu(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function pu(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function mu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function hu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function gu(e, t) {
	var n = bl(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? du : uu : typeof t == "function" ? n.local ? hu : mu : n.local ? pu : fu)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/window.js
function _u(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/d3-selection/src/selection/style.js
function vu(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function yu(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function bu(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function xu(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? vu : typeof t == "function" ? bu : yu)(e, t, n ?? "")) : Su(this.node(), e);
}
function Su(e, t) {
	return e.style.getPropertyValue(t) || _u(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/d3-selection/src/selection/property.js
function Cu(e) {
	return function() {
		delete this[e];
	};
}
function wu(e, t) {
	return function() {
		this[e] = t;
	};
}
function Tu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Eu(e, t) {
	return arguments.length > 1 ? this.each((t == null ? Cu : typeof t == "function" ? Tu : wu)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/d3-selection/src/selection/classed.js
function Du(e) {
	return e.trim().split(/^|\s+/);
}
function Ou(e) {
	return e.classList || new ku(e);
}
function ku(e) {
	this._node = e, this._names = Du(e.getAttribute("class") || "");
}
ku.prototype = {
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
function Au(e, t) {
	for (var n = Ou(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function ju(e, t) {
	for (var n = Ou(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function Mu(e) {
	return function() {
		Au(this, e);
	};
}
function Nu(e) {
	return function() {
		ju(this, e);
	};
}
function Pu(e, t) {
	return function() {
		(t.apply(this, arguments) ? Au : ju)(this, e);
	};
}
function Fu(e, t) {
	var n = Du(e + "");
	if (arguments.length < 2) {
		for (var r = Ou(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? Pu : t ? Mu : Nu)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/text.js
function Iu() {
	this.textContent = "";
}
function Lu(e) {
	return function() {
		this.textContent = e;
	};
}
function Ru(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function zu(e) {
	return arguments.length ? this.each(e == null ? Iu : (typeof e == "function" ? Ru : Lu)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/d3-selection/src/selection/html.js
function Bu() {
	this.innerHTML = "";
}
function Vu(e) {
	return function() {
		this.innerHTML = e;
	};
}
function Hu(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function Uu(e) {
	return arguments.length ? this.each(e == null ? Bu : (typeof e == "function" ? Hu : Vu)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/d3-selection/src/selection/raise.js
function Wu() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Gu() {
	return this.each(Wu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/lower.js
function Ku() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function qu() {
	return this.each(Ku);
}
//#endregion
//#region node_modules/d3-selection/src/selection/append.js
function Ju(e) {
	var t = typeof e == "function" ? e : Cl(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/insert.js
function Yu() {
	return null;
}
function Xu(e, t) {
	var n = typeof e == "function" ? e : Cl(e), r = t == null ? Yu : typeof t == "function" ? t : Tl(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/remove.js
function Zu() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function Qu() {
	return this.each(Zu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/clone.js
function $u() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ed() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function td(e) {
	return this.select(e ? ed : $u);
}
//#endregion
//#region node_modules/d3-selection/src/selection/datum.js
function nd(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/d3-selection/src/selection/on.js
function rd(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function id(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function ad(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function od(e, t, n) {
	return function() {
		var r = this.__on, i, a = rd(t);
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
function sd(e, t, n) {
	var r = id(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? od : ad, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/dispatch.js
function cd(e, t, n) {
	var r = _u(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function ld(e, t) {
	return function() {
		return cd(this, e, t);
	};
}
function ud(e, t) {
	return function() {
		return cd(this, e, t.apply(this, arguments));
	};
}
function dd(e, t) {
	return this.each((typeof t == "function" ? ud : ld)(e, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/iterator.js
function* fd() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/d3-selection/src/selection/index.js
var pd = [null];
function md(e, t) {
	this._groups = e, this._parents = t;
}
function hd() {
	return new md([[document.documentElement]], pd);
}
function gd() {
	return this;
}
md.prototype = hd.prototype = {
	constructor: md,
	select: El,
	selectAll: jl,
	selectChild: Ll,
	selectChildren: Vl,
	filter: Hl,
	data: Xl,
	enter: Wl,
	exit: Ql,
	join: $l,
	merge: eu,
	selection: gd,
	order: tu,
	sort: nu,
	call: iu,
	nodes: au,
	node: ou,
	size: su,
	empty: cu,
	each: lu,
	attr: gu,
	style: xu,
	property: Eu,
	classed: Fu,
	text: zu,
	html: Uu,
	raise: Gu,
	lower: qu,
	append: Ju,
	insert: Xu,
	remove: Qu,
	clone: td,
	datum: nd,
	on: sd,
	dispatch: dd,
	[Symbol.iterator]: fd
};
//#endregion
//#region node_modules/d3-selection/src/select.js
function _d(e) {
	return typeof e == "string" ? new md([[document.querySelector(e)]], [document.documentElement]) : new md([[e]], pd);
}
//#endregion
//#region node_modules/d3-selection/src/sourceEvent.js
function vd(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/pointer.js
function yd(e, t) {
	if (e = vd(e), t === void 0 && (t = e.currentTarget), t) {
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
var bd = { passive: !1 }, xd = {
	capture: !0,
	passive: !1
};
function Sd(e) {
	e.stopImmediatePropagation();
}
function Cd(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-drag/src/nodrag.js
function wd(e) {
	var t = e.document.documentElement, n = _d(e).on("dragstart.drag", Cd, xd);
	"onselectstart" in t ? n.on("selectstart.drag", Cd, xd) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Td(e, t) {
	var n = e.document.documentElement, r = _d(e).on("dragstart.drag", null);
	t && (r.on("click.drag", Cd, xd), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/d3-drag/src/constant.js
var Ed = (e) => () => e;
//#endregion
//#region node_modules/d3-drag/src/event.js
function Dd(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
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
Dd.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/d3-drag/src/drag.js
function Od(e) {
	return !e.ctrlKey && !e.button;
}
function kd() {
	return this.parentNode;
}
function Ad(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function jd() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Md() {
	var e = Od, t = kd, n = Ad, r = jd, i = {}, a = ml("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, bd).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (_d(n.view).on("mousemove.drag", m, xd).on("mouseup.drag", h, xd), wd(n.view), Sd(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (Cd(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		_d(e.view).on("mousemove.drag mouseup.drag", null), Td(e.view, l), Cd(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Sd(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Cd(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Sd(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = yd(l || r, t), p, m, h;
		if ((h = n.call(e, new Dd("beforestart", {
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
				case "drag": d = yd(l || a, t), _ = o;
			}
			u.call(r, e, new Dd(r, {
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
		return arguments.length ? (e = typeof t == "function" ? t : Ed(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Ed(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Ed(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Ed(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/d3-color/src/define.js
function Nd(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Pd(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function Fd() {}
var Id = .7, Ld = 1 / Id, Rd = "\\s*([+-]?\\d+)\\s*", zd = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Bd = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vd = /^#([0-9a-f]{3,8})$/, Hd = RegExp(`^rgb\\(${Rd},${Rd},${Rd}\\)$`), Ud = RegExp(`^rgb\\(${Bd},${Bd},${Bd}\\)$`), Wd = RegExp(`^rgba\\(${Rd},${Rd},${Rd},${zd}\\)$`), Gd = RegExp(`^rgba\\(${Bd},${Bd},${Bd},${zd}\\)$`), Kd = RegExp(`^hsl\\(${zd},${Bd},${Bd}\\)$`), qd = RegExp(`^hsla\\(${zd},${Bd},${Bd},${zd}\\)$`), Jd = {
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
Nd(Fd, $d, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Yd,
	formatHex: Yd,
	formatHex8: Xd,
	formatHsl: Zd,
	formatRgb: Qd,
	toString: Qd
});
function Yd() {
	return this.rgb().formatHex();
}
function Xd() {
	return this.rgb().formatHex8();
}
function Zd() {
	return pf(this).formatHsl();
}
function Qd() {
	return this.rgb().formatRgb();
}
function $d(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Vd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ef(t) : n === 3 ? new af(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? tf(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? tf(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Hd.exec(e)) ? new af(t[1], t[2], t[3], 1) : (t = Ud.exec(e)) ? new af(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Wd.exec(e)) ? tf(t[1], t[2], t[3], t[4]) : (t = Gd.exec(e)) ? tf(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Kd.exec(e)) ? ff(t[1], t[2] / 100, t[3] / 100, 1) : (t = qd.exec(e)) ? ff(t[1], t[2] / 100, t[3] / 100, t[4]) : Jd.hasOwnProperty(e) ? ef(Jd[e]) : e === "transparent" ? new af(NaN, NaN, NaN, 0) : null;
}
function ef(e) {
	return new af(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function tf(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new af(e, t, n, r);
}
function nf(e) {
	return e instanceof Fd || (e = $d(e)), e ? (e = e.rgb(), new af(e.r, e.g, e.b, e.opacity)) : new af();
}
function rf(e, t, n, r) {
	return arguments.length === 1 ? nf(e) : new af(e, t, n, r ?? 1);
}
function af(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Nd(af, rf, Pd(Fd, {
	brighter(e) {
		return e = e == null ? Ld : Ld ** +e, new af(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Id : Id ** +e, new af(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new af(uf(this.r), uf(this.g), uf(this.b), lf(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: of,
	formatHex: of,
	formatHex8: sf,
	formatRgb: cf,
	toString: cf
}));
function of() {
	return `#${df(this.r)}${df(this.g)}${df(this.b)}`;
}
function sf() {
	return `#${df(this.r)}${df(this.g)}${df(this.b)}${df((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function cf() {
	let e = lf(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${uf(this.r)}, ${uf(this.g)}, ${uf(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function lf(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function uf(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function df(e) {
	return e = uf(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ff(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new hf(e, t, n, r);
}
function pf(e) {
	if (e instanceof hf) return new hf(e.h, e.s, e.l, e.opacity);
	if (e instanceof Fd || (e = $d(e)), !e) return new hf();
	if (e instanceof hf) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new hf(o, s, c, e.opacity);
}
function mf(e, t, n, r) {
	return arguments.length === 1 ? pf(e) : new hf(e, t, n, r ?? 1);
}
function hf(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Nd(hf, mf, Pd(Fd, {
	brighter(e) {
		return e = e == null ? Ld : Ld ** +e, new hf(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Id : Id ** +e, new hf(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new af(vf(e >= 240 ? e - 240 : e + 120, i, r), vf(e, i, r), vf(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new hf(gf(this.h), _f(this.s), _f(this.l), lf(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = lf(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${gf(this.h)}, ${_f(this.s) * 100}%, ${_f(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function gf(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function _f(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function vf(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var yf = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function bf(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function xf(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Sf(e) {
	return (e = +e) == 1 ? Cf : function(t, n) {
		return n - t ? xf(t, n, e) : yf(isNaN(t) ? n : t);
	};
}
function Cf(e, t) {
	var n = t - e;
	return n ? bf(e, n) : yf(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var wf = (function e(t) {
	var n = Sf(t);
	function r(e, t) {
		var r = n((e = rf(e)).r, (t = rf(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Cf(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function Tf(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Ef(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function Df(e, t) {
	var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o;
	for (o = 0; o < r; ++o) i[o] = If(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function Of(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function kf(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function Af(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = If(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var jf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Mf = new RegExp(jf.source, "g");
function Nf(e) {
	return function() {
		return e;
	};
}
function Pf(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Ff(e, t) {
	var n = jf.lastIndex = Mf.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = jf.exec(e)) && (i = Mf.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: kf(r, i)
	})), n = Mf.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Pf(c[0].x) : Nf(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function If(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? yf(t) : (n === "number" ? kf : n === "string" ? (r = $d(t)) ? (t = r, wf) : Ff : t instanceof $d ? wf : t instanceof Date ? Of : Ef(t) ? Tf : Array.isArray(t) ? Df : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Af : kf)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
var Lf = 180 / Math.PI, Rf = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function zf(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Lf,
		skewX: Math.atan(c) * Lf,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
var Bf;
function Vf(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Rf : zf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Hf(e) {
	return e == null || (Bf ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Bf.setAttribute("transform", e), !(e = Bf.transform.baseVal.consolidate())) ? Rf : (e = e.matrix, zf(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function Uf(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: kf(e, i)
			}, {
				i: c - 2,
				x: kf(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: kf(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: kf(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: kf(e, n)
			}, {
				i: s - 2,
				x: kf(t, r)
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
var Wf = Uf(Vf, "px, ", "px)", "deg)"), Gf = Uf(Hf, ", ", ")", ")"), Kf = 1e-12;
function qf(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Jf(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Yf(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var Xf = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Kf) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = qf(y), c = s / (n * g) * (i * Yf(t * r + y) - Jf(y));
				return [
					a + c * d,
					o + c * f,
					s * i / qf(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), Zf = 0, Qf = 0, $f = 0, ep = 1e3, tp, np, rp = 0, ip = 0, ap = 0, op = typeof performance == "object" && performance.now ? performance : Date, sp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function cp() {
	return ip ||= (sp(lp), op.now() + ap);
}
function lp() {
	ip = 0;
}
function up() {
	this._call = this._time = this._next = null;
}
up.prototype = dp.prototype = {
	constructor: up,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? cp() : +n) + (t == null ? 0 : +t), !this._next && np !== this && (np ? np._next = this : tp = this, np = this), this._call = e, this._time = n, gp();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, gp());
	}
};
function dp(e, t, n) {
	var r = new up();
	return r.restart(e, t, n), r;
}
function fp() {
	cp(), ++Zf;
	for (var e = tp, t; e;) (t = ip - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--Zf;
}
function pp() {
	ip = (rp = op.now()) + ap, Zf = Qf = 0;
	try {
		fp();
	} finally {
		Zf = 0, hp(), ip = 0;
	}
}
function mp() {
	var e = op.now(), t = e - rp;
	t > ep && (ap -= t, rp = e);
}
function hp() {
	for (var e, t = tp, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : tp = n);
	np = e, gp(r);
}
function gp(e) {
	Zf || (Qf &&= clearTimeout(Qf), e - ip > 24 ? (e < Infinity && (Qf = setTimeout(pp, e - op.now() - ap)), $f &&= clearInterval($f)) : ($f ||= (rp = op.now(), setInterval(mp, ep)), Zf = 1, sp(pp)));
}
//#endregion
//#region node_modules/d3-timer/src/timeout.js
function _p(e, t, n) {
	var r = new up();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/d3-transition/src/transition/schedule.js
var vp = ml("start", "end", "cancel", "interrupt"), yp = [];
function bp(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	wp(e, n, {
		name: t,
		index: r,
		group: i,
		on: vp,
		tween: yp,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function xp(e, t) {
	var n = Cp(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function Sp(e, t) {
	var n = Cp(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function Cp(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function wp(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = dp(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return _p(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (_p(function() {
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
function Tp(e, t) {
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
function Ep(e) {
	return this.each(function() {
		Tp(this, e);
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/tween.js
function Dp(e, t) {
	var n, r;
	return function() {
		var i = Sp(this, e), a = i.tween;
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
function Op(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = Sp(this, e), o = a.tween;
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
function kp(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = Cp(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? Dp : Op)(n, e, t));
}
function Ap(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = Sp(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return Cp(e, r).value[t];
	};
}
//#endregion
//#region node_modules/d3-transition/src/transition/interpolate.js
function jp(e, t) {
	var n;
	return (typeof t == "number" ? kf : t instanceof $d ? wf : (n = $d(t)) ? (t = n, wf) : Ff)(e, t);
}
//#endregion
//#region node_modules/d3-transition/src/transition/attr.js
function Mp(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Np(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Pp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Fp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Ip(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Lp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Rp(e, t) {
	var n = bl(e), r = n === "transform" ? Gf : jp;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Lp : Ip)(n, r, Ap(this, "attr." + e, t)) : t == null ? (n.local ? Np : Mp)(n) : (n.local ? Fp : Pp)(n, r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/attrTween.js
function zp(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Bp(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Vp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Bp(e, i)), n;
	}
	return i._value = t, i;
}
function Hp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && zp(e, i)), n;
	}
	return i._value = t, i;
}
function Up(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = bl(e);
	return this.tween(n, (r.local ? Vp : Hp)(r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/delay.js
function Wp(e, t) {
	return function() {
		xp(this, e).delay = +t.apply(this, arguments);
	};
}
function Gp(e, t) {
	return t = +t, function() {
		xp(this, e).delay = t;
	};
}
function Kp(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Wp : Gp)(t, e)) : Cp(this.node(), t).delay;
}
//#endregion
//#region node_modules/d3-transition/src/transition/duration.js
function qp(e, t) {
	return function() {
		Sp(this, e).duration = +t.apply(this, arguments);
	};
}
function Jp(e, t) {
	return t = +t, function() {
		Sp(this, e).duration = t;
	};
}
function Yp(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? qp : Jp)(t, e)) : Cp(this.node(), t).duration;
}
//#endregion
//#region node_modules/d3-transition/src/transition/ease.js
function Xp(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		Sp(this, e).ease = t;
	};
}
function Zp(e) {
	var t = this._id;
	return arguments.length ? this.each(Xp(t, e)) : Cp(this.node(), t).ease;
}
//#endregion
//#region node_modules/d3-transition/src/transition/easeVarying.js
function Qp(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		Sp(this, e).ease = n;
	};
}
function $p(e) {
	if (typeof e != "function") throw Error();
	return this.each(Qp(this._id, e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/filter.js
function em(e) {
	typeof e != "function" && (e = Ml(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new km(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/merge.js
function tm(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new km(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/on.js
function nm(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function rm(e, t, n) {
	var r, i, a = nm(t) ? xp : Sp;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function im(e, t) {
	var n = this._id;
	return arguments.length < 2 ? Cp(this.node(), n).on.on(e) : this.each(rm(n, e, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/remove.js
function am(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function om() {
	return this.on("end.remove", am(this._id));
}
//#endregion
//#region node_modules/d3-transition/src/transition/select.js
function sm(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Tl(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, bp(l[f], t, n, f, l, Cp(u, n)));
	return new km(a, this._parents, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selectAll.js
function cm(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = kl(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = Cp(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && bp(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new km(a, o, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selection.js
var lm = hd.prototype.constructor;
function um() {
	return new lm(this._groups, this._parents);
}
//#endregion
//#region node_modules/d3-transition/src/transition/style.js
function dm(e, t) {
	var n, r, i;
	return function() {
		var a = Su(this, e), o = (this.style.removeProperty(e), Su(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function fm(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function pm(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = Su(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function mm(e, t, n) {
	var r, i, a;
	return function() {
		var o = Su(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), Su(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function hm(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = Sp(this, e), l = c.on, u = c.value[a] == null ? s ||= fm(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function gm(e, t, n) {
	var r = (e += "") == "transform" ? Wf : jp;
	return t == null ? this.styleTween(e, dm(e, r)).on("end.style." + e, fm(e)) : typeof t == "function" ? this.styleTween(e, mm(e, r, Ap(this, "style." + e, t))).each(hm(this._id, e)) : this.styleTween(e, pm(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/d3-transition/src/transition/styleTween.js
function _m(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function vm(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && _m(e, a, n)), r;
	}
	return a._value = t, a;
}
function ym(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, vm(e, t, n ?? ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/text.js
function bm(e) {
	return function() {
		this.textContent = e;
	};
}
function xm(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function Sm(e) {
	return this.tween("text", typeof e == "function" ? xm(Ap(this, "text", e)) : bm(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/textTween.js
function Cm(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function wm(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && Cm(r)), t;
	}
	return r._value = e, r;
}
function Tm(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, wm(e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/transition.js
function Em() {
	for (var e = this._name, t = this._id, n = Am(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = Cp(c, t);
		bp(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new km(r, this._parents, e, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/end.js
function Dm() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = Sp(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/index.js
var Om = 0;
function km(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Am() {
	return ++Om;
}
var jm = hd.prototype;
km.prototype = {
	constructor: km,
	select: sm,
	selectAll: cm,
	selectChild: jm.selectChild,
	selectChildren: jm.selectChildren,
	filter: em,
	merge: tm,
	selection: um,
	transition: Em,
	call: jm.call,
	nodes: jm.nodes,
	node: jm.node,
	size: jm.size,
	empty: jm.empty,
	each: jm.each,
	on: im,
	attr: Rp,
	attrTween: Up,
	style: gm,
	styleTween: ym,
	text: Sm,
	textTween: Tm,
	remove: om,
	tween: kp,
	delay: Kp,
	duration: Yp,
	ease: Zp,
	easeVarying: $p,
	end: Dm,
	[Symbol.iterator]: jm[Symbol.iterator]
};
//#endregion
//#region node_modules/d3-ease/src/cubic.js
function Mm(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/d3-transition/src/selection/transition.js
var Nm = {
	time: null,
	delay: 0,
	duration: 250,
	ease: Mm
};
function Pm(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function Fm(e) {
	var t, n;
	e instanceof km ? (t = e._id, e = e._name) : (t = Am(), (n = Nm).time = cp(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && bp(c, e, t, l, o, n || Pm(c, t));
	return new km(r, this._parents, e, t);
}
hd.prototype.interrupt = Ep, hd.prototype.transition = Fm;
//#endregion
//#region node_modules/d3-zoom/src/constant.js
var Im = (e) => () => e;
//#endregion
//#region node_modules/d3-zoom/src/event.js
function Lm(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
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
function Rm(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Rm.prototype = {
	constructor: Rm,
	scale: function(e) {
		return e === 1 ? this : new Rm(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Rm(this.k, this.x + this.k * e, this.y + this.k * t);
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
var zm = new Rm(1, 0, 0);
Bm.prototype = Rm.prototype;
function Bm(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return zm;
	return e.__zoom;
}
//#endregion
//#region node_modules/d3-zoom/src/noevent.js
function Vm(e) {
	e.stopImmediatePropagation();
}
function Hm(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-zoom/src/zoom.js
function Um(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Wm() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Gm() {
	return this.__zoom || zm;
}
function Km(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function qm() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jm(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function Ym() {
	var e = Um, t = Wm, n = Jm, r = Km, i = qm, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = Xf, l = ml("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", Gm).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", Gm), e === i ? i.interrupt().each(function() {
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
			return n(zm.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new Rm(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new Rm(e.k, r, i);
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
					e = new Rm(n, l[0] - t[0] * n, l[1] - t[1] * n);
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
			var t = _d(this.that).datum();
			l.call(e, this.that, new Lm(e, {
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
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = yd(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], Tp(this), s.start();
		Hm(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = _d(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = yd(t, i), l = t.clientX, u = t.clientY;
		wd(t.view), Vm(t), a.mouse = [c, this.__zoom.invert(c)], Tp(this), a.start();
		function d(e) {
			if (Hm(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = yd(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), Td(e.view, a.moved), Hm(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = yd(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			Hm(r), s > 0 ? _d(this).transition().duration(s).call(x, d, c, r) : _d(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (Vm(t), s = 0; s < i; ++s) c = r[s], l = yd(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), Tp(this), a.start());
		}
	}
	function O(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (Hm(e), s = 0; s < a; ++s) c = i[s], l = yd(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
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
			for (Vm(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = yd(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = _d(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Im(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Im(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Im(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Im([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
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
var Xm = {
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
}, Zm = [[-Infinity, -Infinity], [Infinity, Infinity]], Qm = [
	"Enter",
	" ",
	"Escape"
], $m = {
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
}, eh;
(function(e) {
	e.Strict = "strict", e.Loose = "loose";
})(eh ||= {});
var th;
(function(e) {
	e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(th ||= {});
var nh;
(function(e) {
	e.Partial = "partial", e.Full = "full";
})(nh ||= {});
var rh = {
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
}, ih;
(function(e) {
	e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(ih ||= {});
var ah;
(function(e) {
	e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(ah ||= {});
var oh;
(function(e) {
	e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(oh ||= {});
var sh = {
	[oh.Left]: oh.Right,
	[oh.Right]: oh.Left,
	[oh.Top]: oh.Bottom,
	[oh.Bottom]: oh.Top
}, ch = (e) => !!e && typeof e == "object" && "id" in e && "source" in e && "target" in e, lh = (e) => !!e && typeof e == "object" && "id" in e && "position" in e && !("source" in e) && !("target" in e), uh = (e) => !!e && typeof e == "object" && "id" in e && "internals" in e && !("source" in e) && !("target" in e), dh = (e, t = [0, 0]) => {
	let { width: n, height: r } = Gh(e), i = e.origin ?? t, a = n * i[0], o = r * i[1];
	return {
		x: e.position.x - a,
		y: e.position.y - o
	};
}, fh = (e, t = { nodeOrigin: [0, 0] }) => {
	if (e.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let n = !1, r = e.reduce((e, r) => {
		let i = typeof r == "string", a = !t.nodeLookup && !i ? r : void 0;
		return t.nodeLookup && (a = i ? t.nodeLookup.get(r) : uh(r) ? r : t.nodeLookup.get(r.id)), a ? (n = !0, Th(e, kh(a, t.nodeOrigin))) : e;
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return n ? Dh(r) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, ph = (e, t = {}) => {
	let n = {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	}, r = !1;
	return e.forEach((e) => {
		(t.filter === void 0 || t.filter(e)) && (n = Th(n, kh(e)), r = !0);
	}), r ? Dh(n) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, mh = (e, t, [n, r, i] = [
	0,
	0,
	1
], a = !1, o = !1) => {
	let s = (t.x - n) / i, c = (t.y - r) / i, l = t.width / i, u = t.height / i, d = [];
	for (let t of e.values()) {
		let { measured: e, selectable: n = !0, hidden: r = !1 } = t;
		if (o && !n || r) continue;
		let i = e.width ?? t.width ?? t.initialWidth ?? 0, f = e.height ?? t.height ?? t.initialHeight ?? 0, { x: p, y: m } = t.internals.positionAbsolute, h = jh(s, c, l, u, p, m, i, f), g = i * f, _ = a && h > 0;
		(!t.internals.handleBounds || _ || h >= g || t.dragging) && d.push(t);
	}
	return d;
}, hh = (e, t) => {
	let n = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		n.add(e.id);
	}), t.filter((e) => n.has(e.source) || n.has(e.target));
};
function gh(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t?.nodes ? new Set(t.nodes.map((e) => e.id)) : null;
	return e.forEach((e) => {
		let i;
		if (t?.includeHiddenNodes) {
			let { width: t, height: n } = Gh(e);
			i = t > 0 && n > 0;
		} else i = !!(e.measured.width && e.measured.height && !e.hidden);
		i && (!r || r.has(e.id)) && n.set(e.id, e);
	}), n;
}
async function _h({ nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: a }, o) {
	if (e.size === 0) return !0;
	let s = Hh(ph(gh(e, o)), t, n, o?.minZoom ?? i, o?.maxZoom ?? a, o?.padding ?? .1);
	return await r.setViewport(s, {
		duration: o?.duration,
		ease: o?.ease,
		interpolate: o?.interpolate
	}), !0;
}
function vh({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: a }) {
	let o = n.get(e), s = o.parentId ? n.get(o.parentId) : void 0, { x: c, y: l } = s ? s.internals.positionAbsolute : {
		x: 0,
		y: 0
	}, u = o.origin ?? r, d = o.extent || i;
	if (o.extent === "parent" && !o.expandParent) {
		if (!s) a?.("005", Xm.error005());
		else {
			let { width: e, height: t } = Gh(s);
			e && t && (d = [[c, l], [c + e, l + t]]);
		}
	} else s && Wh(o.extent) && (d = [[o.extent[0][0] + c, o.extent[0][1] + l], [o.extent[1][0] + c, o.extent[1][1] + l]]);
	let f = Wh(d) ? xh(t, d, o.measured) : t;
	return (o.measured.width === void 0 || o.measured.height === void 0) && a?.("015", Xm.error015()), {
		position: {
			x: f.x - c + (o.measured.width ?? 0) * u[0],
			y: f.y - l + (o.measured.height ?? 0) * u[1]
		},
		positionAbsolute: f
	};
}
async function yh({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: i }) {
	let a = new Set(e.map((e) => e.id)), o = [];
	for (let e of n) {
		if (e.deletable === !1) continue;
		let t = a.has(e.id), n = !t && e.parentId && o.find((t) => t.id === e.parentId);
		(t || n) && o.push(e);
	}
	let s = new Set(t.map((e) => e.id)), c = r.filter((e) => e.deletable !== !1), l = hh(o, c);
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
var bh = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), xh = (e = {
	x: 0,
	y: 0
}, t, n) => ({
	x: bh(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
	y: bh(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function Sh(e, t, n) {
	let { width: r, height: i } = Gh(n), { x: a, y: o } = n.internals.positionAbsolute;
	return xh(e, [[a, o], [a + r, o + i]], t);
}
var Ch = (e, t, n) => e < t ? bh(Math.abs(e - t), 1, t) / t : e > n ? -bh(Math.abs(e - n), 1, t) / t : 0, wh = (e, t, n = 15, r = 40) => [Ch(e.x, r, t.width - r) * n, Ch(e.y, r, t.height - r) * n], Th = (e, t) => ({
	x: Math.min(e.x, t.x),
	y: Math.min(e.y, t.y),
	x2: Math.max(e.x2, t.x2),
	y2: Math.max(e.y2, t.y2)
}), Eh = ({ x: e, y: t, width: n, height: r }) => ({
	x: e,
	y: t,
	x2: e + n,
	y2: t + r
}), Dh = ({ x: e, y: t, x2: n, y2: r }) => ({
	x: e,
	y: t,
	width: n - e,
	height: r - t
}), Oh = (e, t = [0, 0]) => {
	let { x: n, y: r } = uh(e) ? e.internals.positionAbsolute : dh(e, t);
	return {
		x: n,
		y: r,
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}, kh = (e, t = [0, 0]) => {
	let { x: n, y: r } = uh(e) ? e.internals.positionAbsolute : dh(e, t);
	return {
		x: n,
		y: r,
		x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
		y2: r + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
	};
}, Ah = (e, t) => Dh(Th(Eh(e), Eh(t))), jh = (e, t, n, r, i, a, o, s) => {
	let c = Math.max(0, Math.min(e + n, i + o) - Math.max(e, i)), l = Math.max(0, Math.min(t + r, a + s) - Math.max(t, a));
	return Math.ceil(c * l);
}, Mh = (e, t) => jh(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height), Nh = (e) => Ph(e.width) && Ph(e.height) && Ph(e.x) && Ph(e.y), Ph = (e) => !isNaN(e) && isFinite(e), Fh = (e, t) => (e, t) => {}, Ih = (e, t = [1, 1]) => ({
	x: t[0] * Math.round(e.x / t[0]),
	y: t[1] * Math.round(e.y / t[1])
}), Lh = ({ x: e, y: t }, [n, r, i], a = !1, o = [1, 1]) => {
	let s = {
		x: (e - n) / i,
		y: (t - r) / i
	};
	return a ? Ih(s, o) : s;
}, Rh = ({ x: e, y: t }, [n, r, i]) => ({
	x: e * i + n,
	y: t * i + r
});
function zh(e, t) {
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
function Bh(e, t, n) {
	if (typeof e == "string" || typeof e == "number") {
		let r = zh(e, n), i = zh(e, t);
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
		let r = zh(e.top ?? e.y ?? 0, n), i = zh(e.bottom ?? e.y ?? 0, n), a = zh(e.left ?? e.x ?? 0, t), o = zh(e.right ?? e.x ?? 0, t);
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
function Vh(e, t, n, r, i, a) {
	let { x: o, y: s } = Rh(e, [
		t,
		n,
		r
	]), { x: c, y: l } = Rh({
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
var Hh = (e, t, n, r, i, a) => {
	let o = Bh(a, t, n), s = (t - o.x) / e.width, c = (n - o.y) / e.height, l = bh(Math.min(s, c), r, i), u = e.x + e.width / 2, d = e.y + e.height / 2, f = t / 2 - u * l, p = n / 2 - d * l, m = Vh(e, f, p, l, t, n), h = {
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
}, Uh = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Wh(e) {
	return e != null && e !== "parent";
}
function Gh(e) {
	return {
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}
function Kh(e) {
	return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function qh(e, t = {
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
function Jh(e) {
	return {
		...$m,
		...e || {}
	};
}
function Yh(e, t) {
	if (!e && !t) return !0;
	if (!e || !t || e.size !== t.size) return !1;
	if (!e.size && !t.size) return !0;
	for (let n of e.keys()) if (!t.has(n)) return !1;
	return !0;
}
function Xh(e, t, n) {
	if (!n) return;
	let r = [];
	e.forEach((e, n) => {
		t?.has(n) || r.push(e);
	}), r.length && n(r);
}
function Zh(e) {
	return e === null ? null : e ? "valid" : "invalid";
}
function Qh(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
	let { x: a, y: o } = ig(e), s = Lh({
		x: a - (i?.left ?? 0),
		y: o - (i?.top ?? 0)
	}, r), { x: c, y: l } = n ? Ih(s, t) : s;
	return {
		xSnapped: c,
		ySnapped: l,
		...s
	};
}
var $h = (e) => ({
	width: e.offsetWidth,
	height: e.offsetHeight
}), eg = (e) => e?.getRootNode?.() || window?.document, tg = [
	"INPUT",
	"SELECT",
	"TEXTAREA"
];
function ng(e) {
	let t = e.composedPath?.()?.[0] || e.target;
	return t?.nodeType === 1 ? tg.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey") : !1;
}
var rg = (e) => "clientX" in e, ig = (e, t) => {
	let n = rg(e), r = n ? e.clientX : e.touches?.[0].clientX, i = n ? e.clientY : e.touches?.[0].clientY;
	return {
		x: r - (t?.left ?? 0),
		y: i - (t?.top ?? 0)
	};
}, ag = (e, t, n, r, i) => {
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
			...$h(t)
		};
	});
};
function og({ sourceX: e, sourceY: t, targetX: n, targetY: r, sourceControlX: i, sourceControlY: a, targetControlX: o, targetControlY: s }) {
	let c = e * .125 + i * .375 + o * .375 + n * .125, l = t * .125 + a * .375 + s * .375 + r * .125;
	return [
		c,
		l,
		Math.abs(c - e),
		Math.abs(l - t)
	];
}
function sg(e, t) {
	return e >= 0 ? .5 * e : t * 25 * Math.sqrt(-e);
}
function cg({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
	switch (e) {
		case oh.Left: return [t - sg(t - r, a), n];
		case oh.Right: return [t + sg(r - t, a), n];
		case oh.Top: return [t, n - sg(n - i, a)];
		case oh.Bottom: return [t, n + sg(i - n, a)];
	}
}
function lg({ sourceX: e, sourceY: t, sourcePosition: n = oh.Bottom, targetX: r, targetY: i, targetPosition: a = oh.Top, curvature: o = .25 }) {
	let [s, c] = cg({
		pos: n,
		x1: e,
		y1: t,
		x2: r,
		y2: i,
		c: o
	}), [l, u] = cg({
		pos: a,
		x1: r,
		y1: i,
		x2: e,
		y2: t,
		c: o
	}), [d, f, p, m] = og({
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
function ug({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let i = Math.abs(n - e) / 2, a = n < e ? n + i : n - i, o = Math.abs(r - t) / 2;
	return [
		a,
		r < t ? r + o : r - o,
		i,
		o
	];
}
function dg({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: r = 0, elevateOnSelect: i = !1, zIndexMode: a = "basic" }) {
	return a === "manual" ? r : (i && n ? r + 1e3 : r) + Math.max(e.parentId || i && e.selected ? e.internals.z : 0, t.parentId || i && t.selected ? t.internals.z : 0);
}
function fg({ sourceNode: e, targetNode: t, width: n, height: r, transform: i }) {
	let a = Th(kh(e), kh(t));
	return a.x === a.x2 && (a.x2 += 1), a.y === a.y2 && (a.y2 += 1), Mh({
		x: -i[0] / i[2],
		y: -i[1] / i[2],
		width: n / i[2],
		height: r / i[2]
	}, Dh(a)) > 0;
}
var pg = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`, mg = (e, t) => t.some((t) => t.source === e.source && t.target === e.target && (t.sourceHandle === e.sourceHandle || !t.sourceHandle && !e.sourceHandle) && (t.targetHandle === e.targetHandle || !t.targetHandle && !e.targetHandle)), hg = (e, t, n = {}) => {
	if (!e.source || !e.target) return n.onError?.("006", Xm.error006()), t;
	let r = n.getEdgeId || pg, i;
	return i = ch(e) ? { ...e } : {
		...e,
		id: r(e)
	}, mg(i, t) ? t : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, t.concat(i));
};
function gg({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let [i, a, o, s] = ug({
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
var _g = {
	[oh.Left]: {
		x: -1,
		y: 0
	},
	[oh.Right]: {
		x: 1,
		y: 0
	},
	[oh.Top]: {
		x: 0,
		y: -1
	},
	[oh.Bottom]: {
		x: 0,
		y: 1
	}
}, vg = ({ source: e, sourcePosition: t = oh.Bottom, target: n }) => t === oh.Left || t === oh.Right ? e.x < n.x ? {
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
}, yg = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
function bg({ source: e, sourcePosition: t = oh.Bottom, target: n, targetPosition: r = oh.Top, center: i, offset: a, stepPosition: o }) {
	let s = _g[t], c = _g[r], l = {
		x: e.x + s.x * a,
		y: e.y + s.y * a
	}, u = {
		x: n.x + c.x * a,
		y: n.y + c.y * a
	}, d = vg({
		source: l,
		sourcePosition: t,
		target: u
	}), f = d.x === 0 ? "y" : "x", p = d[f], m = [], h, g, _ = {
		x: 0,
		y: 0
	}, v = {
		x: 0,
		y: 0
	}, [, , y, b] = ug({
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
function xg(e, t, n, r) {
	let i = Math.min(yg(e, t) / 2, yg(t, n) / 2, r), { x: a, y: o } = t;
	if (e.x === a && a === n.x || e.y === o && o === n.y) return `L${a} ${o}`;
	if (e.y === o) {
		let t = e.x < n.x ? -1 : 1, r = e.y < n.y ? 1 : -1;
		return `L ${a + i * t},${o}Q ${a},${o} ${a},${o + i * r}`;
	}
	let s = e.x < n.x ? 1 : -1;
	return `L ${a},${o + i * (e.y < n.y ? -1 : 1)}Q ${a},${o} ${a + i * s},${o}`;
}
function Sg({ sourceX: e, sourceY: t, sourcePosition: n = oh.Bottom, targetX: r, targetY: i, targetPosition: a = oh.Top, borderRadius: o = 5, centerX: s, centerY: c, offset: l = 20, stepPosition: u = .5 }) {
	let [d, f, p, m, h] = bg({
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
	for (let e = 1; e < d.length - 1; e++) g += xg(d[e - 1], d[e], d[e + 1], o);
	return g += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [
		g,
		f,
		p,
		m,
		h
	];
}
function Cg(e) {
	return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function wg(e) {
	let { sourceNode: t, targetNode: n } = e;
	if (!Cg(t) || !Cg(n)) return null;
	let r = t.internals.handleBounds || Tg(t.handles), i = n.internals.handleBounds || Tg(n.handles), a = Dg(r?.source ?? [], e.sourceHandle), o = Dg(e.connectionMode === eh.Strict ? i?.target ?? [] : (i?.target ?? []).concat(i?.source ?? []), e.targetHandle);
	if (!a || !o) return e.onError?.("008", Xm.error008(a ? "target" : "source", {
		id: e.id,
		sourceHandle: e.sourceHandle,
		targetHandle: e.targetHandle
	})), null;
	let s = a?.position || oh.Bottom, c = o?.position || oh.Top, l = Eg(t, a, s), u = Eg(n, o, c);
	return {
		sourceX: l.x,
		sourceY: l.y,
		targetX: u.x,
		targetY: u.y,
		sourcePosition: s,
		targetPosition: c
	};
}
function Tg(e) {
	if (!e) return null;
	let t = [], n = [];
	for (let r of e) r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? t.push(r) : r.type === "target" && n.push(r);
	return {
		source: t,
		target: n
	};
}
function Eg(e, t, n = oh.Left, r = !1) {
	let i = (t?.x ?? 0) + e.internals.positionAbsolute.x, a = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: o, height: s } = t ?? Gh(e);
	if (r) return {
		x: i + o / 2,
		y: a + s / 2
	};
	switch (t?.position ?? n) {
		case oh.Top: return {
			x: i + o / 2,
			y: a
		};
		case oh.Right: return {
			x: i + o,
			y: a + s / 2
		};
		case oh.Bottom: return {
			x: i + o / 2,
			y: a + s
		};
		case oh.Left: return {
			x: i,
			y: a + s / 2
		};
	}
}
function Dg(e, t) {
	return e && (t ? e.find((e) => e.id === t) : e[0]) || null;
}
function Og(e, t) {
	return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((t) => `${t}=${e[t]}`).join("&")}` : "";
}
function kg(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: i }) {
	let a = /* @__PURE__ */ new Set();
	return e.reduce((e, o) => ([o.markerStart || r, o.markerEnd || i].forEach((r) => {
		if (r && typeof r == "object") {
			let i = Og(r, t);
			a.has(i) || (e.push({
				id: i,
				color: r.color || n,
				...r
			}), a.add(i));
		}
	}), e), []).sort((e, t) => e.id.localeCompare(t.id));
}
var Ag = 1e3, jg = 10, Mg = {
	nodeOrigin: [0, 0],
	nodeExtent: Zm,
	elevateNodesOnSelect: !0,
	zIndexMode: "basic",
	defaults: {}
}, Ng = {
	...Mg,
	checkEquality: !0
};
function Pg(e, t) {
	let n = { ...e };
	for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}
function Fg(e, t, n) {
	let r = Pg(Mg, n);
	for (let n of e.values()) if (n.parentId) Bg(n, e, t, r);
	else {
		let e = xh(dh(n, r.nodeOrigin), Wh(n.extent) ? n.extent : r.nodeExtent, Gh(n));
		n.internals.positionAbsolute = e;
	}
}
function Ig(e, t) {
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
function Lg(e) {
	return e === "manual";
}
function Rg(e, t, n, r = {}) {
	let i = Pg(Ng, r), a = { i: 0 }, o = new Map(t), s = i?.elevateNodesOnSelect && !Lg(i.zIndexMode) ? Ag : 0, c = e.length > 0, l = !1;
	t.clear(), n.clear();
	for (let u of e) {
		let e = o.get(u.id);
		if (i.checkEquality && u === e?.internals.userNode) t.set(u.id, e);
		else {
			let n = xh(dh(u, i.nodeOrigin), Wh(u.extent) ? u.extent : i.nodeExtent, Gh(u));
			e = {
				...i.defaults,
				...u,
				measured: {
					width: u.measured?.width,
					height: u.measured?.height
				},
				internals: {
					positionAbsolute: n,
					handleBounds: Ig(u, e),
					z: Vg(u, s, i.zIndexMode),
					userNode: u
				}
			}, t.set(u.id, e);
		}
		(e.measured === void 0 || e.measured.width === void 0 || e.measured.height === void 0) && !e.hidden && (c = !1), u.parentId && Bg(e, t, n, r, a), l ||= u.selected ?? !1;
	}
	return {
		nodesInitialized: c,
		hasSelectedNodes: l
	};
}
function zg(e, t) {
	if (!e.parentId) return;
	let n = t.get(e.parentId);
	n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Bg(e, t, n, r, i) {
	let { elevateNodesOnSelect: a, nodeOrigin: o, nodeExtent: s, zIndexMode: c } = Pg(Mg, r), l = e.parentId, u = t.get(l);
	if (!u) {
		console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
		return;
	}
	zg(e, n), i && !u.parentId && u.internals.rootParentIndex === void 0 && c === "auto" && (u.internals.rootParentIndex = ++i.i, u.internals.z = u.internals.z + i.i * jg), i && u.internals.rootParentIndex !== void 0 && (i.i = u.internals.rootParentIndex);
	let { x: d, y: f, z: p } = Hg(e, u, o, s, a && !Lg(c) ? Ag : 0, c), { positionAbsolute: m } = e.internals, h = d !== m.x || f !== m.y;
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
function Vg(e, t, n) {
	let r = Ph(e.zIndex) ? e.zIndex : 0;
	return Lg(n) ? r : r + (e.selected ? t : 0);
}
function Hg(e, t, n, r, i, a) {
	let { x: o, y: s } = t.internals.positionAbsolute, c = Gh(e), l = dh(e, n), u = Wh(e.extent) ? xh(l, e.extent, c) : l, d = xh({
		x: o + u.x,
		y: s + u.y
	}, r, c);
	e.extent === "parent" && (d = Sh(d, c, t));
	let f = Vg(e, i, a), p = t.internals.z ?? 0;
	return {
		x: d.x,
		y: d.y,
		z: p >= f ? p + 1 : f
	};
}
function Ug(e, t, n, r = [0, 0]) {
	let i = [], a = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.parentId);
		if (!e) continue;
		let r = Ah(a.get(n.parentId)?.expandedRect ?? Oh(e), n.rect);
		a.set(n.parentId, {
			expandedRect: r,
			parent: e
		});
	}
	return a.size > 0 && a.forEach(({ expandedRect: t, parent: a }, o) => {
		let s = a.internals.positionAbsolute, c = Gh(a), l = a.origin ?? r, u = t.x < s.x ? Math.round(Math.abs(s.x - t.x)) : 0, d = t.y < s.y ? Math.round(Math.abs(s.y - t.y)) : 0, f = Math.max(c.width, Math.round(t.width)), p = Math.max(c.height, Math.round(t.height)), m = (f - c.width) * l[0], h = (p - c.height) * l[1];
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
function Wg(e, t, n, r, i, a, o) {
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
		let s = $h(r.nodeElement), u = e.measured.width !== s.width || e.measured.height !== s.height;
		if (s.width && s.height && (u || !e.internals.handleBounds || r.force)) {
			let p = r.nodeElement.getBoundingClientRect(), m = Wh(e.extent) ? e.extent : a, { positionAbsolute: h } = e.internals;
			if (e.parentId && e.extent === "parent") {
				let n = t.get(e.parentId);
				n && (h = Sh(h, s, n));
			} else m && (h = xh(h, m, s));
			let g = {
				...e,
				measured: s,
				internals: {
					...e.internals,
					positionAbsolute: h,
					handleBounds: {
						source: ag("source", r.nodeElement, p, d, e.id),
						target: ag("target", r.nodeElement, p, d, e.id)
					}
				}
			};
			t.set(e.id, g), e.parentId && Bg(g, t, n, {
				nodeOrigin: i,
				zIndexMode: o
			}), c = !0, u && (l.push({
				id: e.id,
				type: "dimensions",
				dimensions: s
			}), e.expandParent && e.parentId && f.push({
				id: e.id,
				parentId: e.parentId,
				rect: Oh(g, i)
			}));
		}
	}
	if (f.length > 0) {
		let e = Ug(f, t, n, i);
		l.push(...e);
	}
	return {
		changes: l,
		updatedInternals: c
	};
}
async function Gg({ delta: e, panZoom: t, transform: n, translateExtent: r, width: i, height: a }) {
	if (!t || !e.x && !e.y) return !1;
	let o = await t.setViewportConstrained({
		x: n[0] + e.x,
		y: n[1] + e.y,
		zoom: n[2]
	}, [[0, 0], [i, a]], r);
	return !!o && (o.x !== n[0] || o.y !== n[1] || o.k !== n[2]);
}
function Kg(e, t, n, r, i, a) {
	let o = i, s = r.get(o) || /* @__PURE__ */ new Map();
	r.set(o, s.set(n, t)), o = `${i}-${e}`;
	let c = r.get(o) || /* @__PURE__ */ new Map();
	if (r.set(o, c.set(n, t)), a) {
		o = `${i}-${e}-${a}`;
		let s = r.get(o) || /* @__PURE__ */ new Map();
		r.set(o, s.set(n, t));
	}
}
function qg(e, t, n) {
	e.clear(), t.clear();
	for (let r of n) {
		let { source: n, target: i, sourceHandle: a = null, targetHandle: o = null } = r, s = {
			edgeId: r.id,
			source: n,
			target: i,
			sourceHandle: a,
			targetHandle: o
		}, c = `${n}-${a}--${i}-${o}`;
		Kg("source", s, `${i}-${o}--${n}-${a}`, e, n, a), Kg("target", s, c, e, i, o), t.set(r.id, r);
	}
}
function Jg(e, t) {
	if (!e.parentId) return !1;
	let n = t.get(e.parentId);
	return n ? n.selected ? !0 : Jg(n, t) : !1;
}
function Yg(e, t, n) {
	let r = e;
	do {
		if (r?.matches?.(t)) return !0;
		if (r === n) return !1;
		r = r?.parentElement;
	} while (r);
	return !1;
}
function Xg(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let [a, o] of e) if ((o.selected || o.id === r) && (!o.parentId || !Jg(o, e)) && (o.draggable || t && o.draggable === void 0)) {
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
function Zg({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
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
function Qg({ dragItems: e, snapGrid: t, x: n, y: r }) {
	let i = e.values().next().value;
	if (!i) return null;
	let a = {
		x: n - i.distance.x,
		y: r - i.distance.y
	}, o = Ih(a, t);
	return {
		x: o.x - a.x,
		y: o.y - a.y
	};
}
function $g({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: i }) {
	let a = {
		x: null,
		y: null
	}, o = 0, s = /* @__PURE__ */ new Map(), c = !1, l = {
		x: 0,
		y: 0
	}, u = null, d = !1, f = null, p = !1, m = !1, h = null;
	function g({ noDragClassName: g, handleSelector: _, domNode: v, isSelectable: y, nodeId: b, nodeClickDistance: x = 0 }) {
		f = _d(v);
		function S({ x: e, y: n }) {
			let { nodeLookup: i, nodeExtent: o, snapGrid: c, snapToGrid: l, nodeOrigin: u, onNodeDrag: d, onSelectionDrag: f, onError: p, updateNodePositions: g } = t();
			a = {
				x: e,
				y: n
			};
			let _ = !1, v = s.size > 1, y = v && o ? Eh(ph(s)) : null, x = v && l ? Qg({
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
				} : Ih(a, c));
				let s = null;
				if (v && o && !r.extent && y) {
					let { positionAbsolute: e } = r.internals, t = e.x - y.x + o[0][0], n = e.x + r.measured.width - y.x2 + o[1][0], i = e.y - y.y + o[0][1], a = e.y + r.measured.height - y.y2 + o[1][1];
					s = [[t, i], [n, a]];
				}
				let { position: d, positionAbsolute: f } = vh({
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
				let [e, t] = Zg({
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
			let [s, d] = wh(l, u, r);
			(s !== 0 || d !== 0) && (a.x = (a.x ?? 0) - s / e[2], a.y = (a.y ?? 0) - d / e[2], await n({
				x: s,
				y: d
			}) && S(a)), o = requestAnimationFrame(C);
		}
		function w(r) {
			let { nodeLookup: i, multiSelectionActive: o, nodesDraggable: c, transform: l, snapGrid: f, snapToGrid: p, selectNodesOnDrag: m, onNodeDragStart: h, onSelectionDragStart: g, unselectNodesAndEdges: _ } = t();
			d = !0, (!m || !y) && !o && b && (i.get(b)?.selected || _()), y && m && b && e?.(b);
			let v = Qh(r.sourceEvent, {
				transform: l,
				snapGrid: f,
				snapToGrid: p,
				containerBounds: u
			});
			if (a = v, s = Xg(i, c, v, b), s.size > 0 && (n || h || !b && g)) {
				let [e, t] = Zg({
					nodeId: b,
					dragItems: s,
					nodeLookup: i
				});
				n?.(r.sourceEvent, s, e, t), h?.(r.sourceEvent, e, t), b || g?.(r.sourceEvent, t);
			}
		}
		let T = Md().clickDistance(x).on("start", (e) => {
			let { domNode: n, nodeDragThreshold: r, transform: i, snapGrid: o, snapToGrid: s } = t();
			u = n?.getBoundingClientRect() || null, p = !1, m = !1, h = e.sourceEvent, r === 0 && w(e), a = Qh(e.sourceEvent, {
				transform: i,
				snapGrid: o,
				snapToGrid: s,
				containerBounds: u
			}), l = ig(e.sourceEvent, u);
		}).on("drag", (e) => {
			let { autoPanOnNodeDrag: n, transform: r, snapGrid: i, snapToGrid: o, nodeDragThreshold: f, nodeLookup: m } = t(), g = Qh(e.sourceEvent, {
				transform: r,
				snapGrid: i,
				snapToGrid: o,
				containerBounds: u
			});
			if (h = e.sourceEvent, (e.sourceEvent.type === "touchmove" && e.sourceEvent.touches.length > 1 || b && !m.has(b)) && (p = !0), !p) {
				if (!c && n && d && (c = !0, C()), !d) {
					let t = ig(e.sourceEvent, u), n = t.x - l.x, r = t.y - l.y;
					Math.sqrt(n * n + r * r) > f && w(e);
				}
				(a.x !== g.xSnapped || a.y !== g.ySnapped) && s && d && (l = ig(e.sourceEvent, u), S(g));
			}
		}).on("end", (e) => {
			if (!d || p) {
				p && s.size > 0 && t().updateNodePositions(s, !1);
				return;
			}
			if (c = !1, d = !1, cancelAnimationFrame(o), s.size > 0) {
				let { nodeLookup: n, updateNodePositions: r, onNodeDragStop: a, onSelectionDragStop: o } = t();
				if (m &&= (r(s, !1), !1), i || a || !b && o) {
					let [t, r] = Zg({
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
			return !e.button && (!g || !Yg(t, `.${g}`, v)) && (!_ || Yg(t, _, v));
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
function e_(e, t, n) {
	let r = [], i = {
		x: e.x - n,
		y: e.y - n,
		width: n * 2,
		height: n * 2
	};
	for (let e of t.values()) Mh(i, Oh(e)) > 0 && r.push(e);
	return r;
}
var t_ = 250;
function n_(e, t, n, r) {
	let i = [], a = Infinity, o = e_(e, n, t + t_);
	for (let n of o) {
		let o = [...n.internals.handleBounds?.source ?? [], ...n.internals.handleBounds?.target ?? []];
		for (let s of o) {
			if (r.nodeId === s.nodeId && r.type === s.type && r.id === s.id) continue;
			let { x: o, y: c } = Eg(n, s, s.position, !0), l = Math.sqrt((o - e.x) ** 2 + (c - e.y) ** 2);
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
function r_(e, t, n, r, i, a = !1) {
	let o = r.get(e);
	if (!o) return null;
	let s = i === "strict" ? o.internals.handleBounds?.[t] : [...o.internals.handleBounds?.source ?? [], ...o.internals.handleBounds?.target ?? []], c = (n ? s?.find((e) => e.id === n) : s?.[0]) ?? null;
	return c && a ? {
		...c,
		...Eg(o, c, c.position, !0)
	} : c;
}
function i_(e, t) {
	return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function a_(e, t) {
	let n = null;
	return t ? n = !0 : e && !t && (n = !1), n;
}
var o_ = () => !0;
function s_(e, { connectionMode: t, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: a, isTarget: o, domNode: s, nodeLookup: c, lib: l, autoPanOnConnect: u, flowId: d, panBy: f, cancelConnection: p, onConnectStart: m, onConnect: h, onConnectEnd: g, isValidConnection: _ = o_, onReconnectEnd: v, updateConnection: y, getTransform: b, getFromHandle: x, autoPanSpeed: S, dragThreshold: C = 1, handleDomNode: w }) {
	let T = eg(e.target), E = 0, D, { x: O, y: k } = ig(e), A = i_(a, w), j = s?.getBoundingClientRect(), ee = !1;
	if (!j || !A) return;
	let M = r_(i, A, r, c, t);
	if (!M) return;
	let N = ig(e, j), te = !1, ne = null, re = !1, ie = null;
	function ae() {
		if (!u || !j) return;
		let [e, t] = wh(N, j, S);
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
		from: Eg(se, oe, oh.Left, !0),
		fromHandle: oe,
		fromPosition: oe.position,
		fromNode: se,
		to: N,
		toHandle: null,
		toPosition: sh[oe.position],
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
			let { x: t, y: n } = ig(e), r = t - O, i = n - k;
			if (!(r * r + i * i > C * C)) return;
			le();
		}
		if (!x() || !oe) {
			de(e);
			return;
		}
		let a = b();
		N = ig(e, j), D = n_(Lh(N, a, !1, [1, 1]), n, c, oe), te ||= (ae(), !0);
		let s = c_(e, {
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
		ie = s.handleDomNode, ne = s.connection, re = a_(!!D, s.isValid);
		let u = c.get(i), f = u ? Eg(u, oe, oh.Left, !0) : ce.from, p = {
			...ce,
			from: f,
			isValid: re,
			to: s.toHandle && re ? Rh({
				x: s.toHandle.x,
				y: s.toHandle.y
			}, a) : N,
			toHandle: s.toHandle,
			toPosition: re && s.toHandle ? s.toHandle.position : sh[oe.position],
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
function c_(e, { handle: t, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: a, doc: o, lib: s, flowId: c, isValidConnection: l = o_, nodeLookup: u }) {
	let d = a === "target", f = t ? o.querySelector(`.${s}-flow__handle[data-id="${c}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: m } = ig(e), h = o.elementFromPoint(p, m), g = h?.classList.contains(`${s}-flow__handle`) ? h : f, _ = {
		handleDomNode: g,
		isValid: !1,
		connection: null,
		toHandle: null
	};
	if (g) {
		let e = i_(void 0, g), t = g.getAttribute("data-nodeid"), a = g.getAttribute("data-handleid"), o = g.classList.contains("connectable"), s = g.classList.contains("connectableend");
		if (!t || !e) return _;
		let c = {
			source: d ? t : r,
			sourceHandle: d ? a : i,
			target: d ? r : t,
			targetHandle: d ? i : a
		};
		_.connection = c, _.isValid = o && s && (n === eh.Strict ? d && e === "source" || !d && e === "target" : t !== r || a !== i) && l(c), _.toHandle = r_(t, e, a, u, n, !0);
	}
	return _;
}
var l_ = {
	onPointerDown: s_,
	isValid: c_
};
function u_({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
	let i = _d(e);
	function a({ translateExtent: e, width: a, height: o, zoomStep: s = 1, pannable: c = !0, zoomable: l = !0, inversePan: u = !1 }) {
		let d = (e) => {
			if (e.sourceEvent.type !== "wheel" || !t) return;
			let r = n(), i = e.sourceEvent.ctrlKey && Uh() ? 10 : 1, a = -e.sourceEvent.deltaY * (e.sourceEvent.deltaMode === 1 ? .05 : e.sourceEvent.deltaMode ? 1 : .002) * s, o = r[2] * 2 ** (a * i);
			t.scaleTo(o);
		}, f = [0, 0], p = Ym().on("start", (e) => {
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
		pointer: yd
	};
}
var d_ = (e) => ({
	x: e.x,
	y: e.y,
	zoom: e.k
}), f_ = ({ x: e, y: t, zoom: n }) => zm.translate(e, t).scale(n), p_ = (e, t) => e.target.closest(`.${t}`), m_ = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), h_ = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, g_ = (e, t = 0, n = h_, r = () => {}) => {
	let i = typeof t == "number" && t > 0;
	return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}, __ = (e) => {
	let t = e.ctrlKey && Uh() ? 10 : 1;
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * t;
};
function v_({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: a, zoomOnPinch: o, onPanZoomStart: s, onPanZoom: c, onPanZoomEnd: l }) {
	return (u) => {
		if (p_(u, t)) return u.ctrlKey && u.preventDefault(), !1;
		u.preventDefault(), u.stopImmediatePropagation();
		let d = n.property("__zoom").k || 1;
		if (u.ctrlKey && o) {
			let e = yd(u), t = d * 2 ** __(u);
			r.scaleTo(n, t, e, u);
			return;
		}
		let f = u.deltaMode === 1 ? 20 : 1, p = i === th.Vertical ? 0 : u.deltaX * f, m = i === th.Horizontal ? 0 : u.deltaY * f;
		!Uh() && u.shiftKey && i !== th.Vertical && (p = u.deltaY * f, m = 0), r.translateBy(n, -(p / d) * a, -(m / d) * a, { internal: !0 });
		let h = d_(n.property("__zoom"));
		clearTimeout(e.panScrollTimeout), e.isPanScrolling ? c?.(u, h) : (e.isPanScrolling = !0, s?.(u, h)), e.panScrollTimeout = setTimeout(() => {
			l?.(u, h), e.isPanScrolling = !1;
		}, 150);
	};
}
function y_({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
	return function(r, i) {
		let a = r.type === "wheel", o = !t && a && !r.ctrlKey, s = p_(r, e);
		if (r.ctrlKey && a && s && r.preventDefault(), o || s) return null;
		r.preventDefault(), n.call(this, r, i);
	};
}
function b_({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
	return (r) => {
		if (r.sourceEvent?.internal) return;
		let i = d_(r.transform);
		e.mouseButton = r.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = i, r.sourceEvent?.type === "mousedown" && t(!0), n && n?.(r.sourceEvent, i);
	};
}
function x_({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
	return (a) => {
		e.usedRightMouseButton = !!(n && m_(t, e.mouseButton ?? 0)), a.sourceEvent?.sync || r([
			a.transform.x,
			a.transform.y,
			a.transform.k
		]), i && !a.sourceEvent?.internal && i?.(a.sourceEvent, d_(a.transform));
	};
}
function S_({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: a }) {
	return (o) => {
		if (!o.sourceEvent?.internal && (e.isZoomingOrPanning = !1, a && m_(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && o.sourceEvent && a(o.sourceEvent), e.usedRightMouseButton = !1, r(!1), i)) {
			let t = d_(o.transform);
			e.prevViewport = t, clearTimeout(e.timerId), e.timerId = setTimeout(() => {
				i?.(o.sourceEvent, t);
			}, n ? 150 : 0);
		}
	};
}
function C_({ panActivationKeyPressed: e, zoomActivationKeyPressed: t, zoomOnScroll: n, zoomOnPinch: r, panOnDrag: i, panOnScroll: a, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: c, noPanClassName: l, lib: u, connectionInProgress: d }) {
	return (f) => {
		let p = t || n, m = r && f.ctrlKey, h = f.type === "wheel";
		if (f.button === 1 && f.type === "mousedown" && (p_(f, `${u}-flow__node`) || p_(f, `${u}-flow__edge`) || p_(f, `${u}-flow__selection`) || p_(f, `${u}-flow__nodesselection`))) return !0;
		if (!i && !p && !a && !o && !r || s || d && !h || p_(f, c) && h || p_(f, l) && (!h || a && h && !t) || !r && f.ctrlKey && h) return !1;
		if (!r && f.type === "touchstart" && f.touches?.length > 1) return f.preventDefault(), !1;
		if (!p && !a && !m && h || !i && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(i) && !i.includes(f.button) && f.type === "mousedown") return !1;
		let g = Array.isArray(i) && i.includes(f.button) || !f.button || f.button <= 1;
		return (!f.ctrlKey || h || e) && g;
	};
}
function w_({ domNode: e, minZoom: t, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: a, onPanZoomStart: o, onPanZoomEnd: s, onDraggingChange: c }) {
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
	let f = Ym().extent(() => d).scaleExtent([t, n]).translateExtent(r), p = _d(e).call(f);
	y({
		x: i.x,
		y: i.y,
		zoom: bh(i.zoom, t, n)
	}, [[0, 0], [u.width, u.height]], r);
	let m = p.on("wheel.zoom"), h = p.on("dblclick.zoom");
	f.wheelDelta(__);
	async function g(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? If : Xf).transform(g_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function _({ noWheelClassName: e, noPanClassName: t, onPaneContextMenu: n, userSelectionActive: r, panOnScroll: i, panOnDrag: u, panOnScrollMode: d, panOnScrollSpeed: g, preventScrolling: _, zoomOnPinch: y, zoomOnScroll: b, zoomOnDoubleClick: x, panActivationKeyPressed: S = !1, zoomActivationKeyPressed: C, lib: w, onTransformChange: T, connectionInProgress: E, paneClickDistance: D, selectionOnDrag: O }) {
		r && !l.isZoomingOrPanning && v();
		let k = i && !C && !r;
		f.clickDistance(O ? Infinity : !Ph(D) || D < 0 ? 0 : D);
		let A = k ? v_({
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
		}) : y_({
			noWheelClassName: e,
			preventScrolling: _,
			d3ZoomHandler: m
		});
		p.on("wheel.zoom", A, { passive: !1 });
		let j = b_({
			zoomPanValues: l,
			onDraggingChange: c,
			onPanZoomStart: o
		});
		f.on("start", j);
		let ee = x_({
			zoomPanValues: l,
			panOnDrag: u,
			onPaneContextMenu: !!n,
			onPanZoom: a,
			onTransformChange: T
		});
		f.on("zoom", ee);
		let M = S_({
			zoomPanValues: l,
			panOnDrag: u,
			panOnScroll: i,
			onPaneContextMenu: n,
			onPanZoomEnd: s,
			onDraggingChange: c
		});
		f.on("end", M);
		let N = C_({
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
		let r = f_(e), i = f?.constrain()(r, t, n);
		return i && await g(i), i;
	}
	async function b(e, t) {
		let n = f_(e);
		return await g(n, t), n;
	}
	function x(e) {
		if (p) {
			let t = f_(e), n = p.property("__zoom");
			(n.k !== e.zoom || n.x !== e.x || n.y !== e.y) && f?.transform(p, t, null, { sync: !0 });
		}
	}
	function S() {
		let e = p ? Bm(p.node()) : {
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
			f?.interpolate(t?.interpolate === "linear" ? If : Xf).scaleTo(g_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	async function w(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? If : Xf).scaleBy(g_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function T(e) {
		f?.scaleExtent(e);
	}
	function E(e) {
		f?.translateExtent(e);
	}
	function D(e) {
		let t = !Ph(e) || e < 0 ? 0 : e;
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
var T_;
(function(e) {
	e.Line = "line", e.Handle = "handle";
})(T_ ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/edges.js
var E_ = Fh("Svelte Flow", "https://svelteflow.dev/");
function D_(e, t, n = {}) {
	return hg(e, t, {
		...n,
		onError: n.onError ?? E_
	});
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/context.js
function O_() {
	let e = {};
	return [(t) => {
		if (t && !vt(e)) throw Error(t);
		return gt(e);
	}, (t) => _t(e, t)];
}
var [k_, A_] = O_(), [j_, M_] = O_(), [N_, P_] = O_(), F_ = /* @__PURE__ */ new Set([
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
]), I_ = /* @__PURE__ */ K("<div><!></div>");
function L_(e, t) {
	yt(t, !0);
	let n = Q(t, "id", 3, null), r = Q(t, "type", 3, "source"), i = Q(t, "position", 19, () => oh.Top), a = Q(t, "isConnectableStart", 3, !0), o = Q(t, "isConnectableEnd", 3, !0), s = /* @__PURE__ */ xo(t, F_), c = k_("Handle must be used within a Custom Node component"), l = j_("Handle must be used within a Custom Node component"), d = /* @__PURE__ */ F(() => r() === "target"), f = /* @__PURE__ */ F(() => t.isConnectable === void 0 ? l.value : t.isConnectable), p = xv(), m = /* @__PURE__ */ F(() => p.ariaLabelConfig), h = null;
	Fr(() => {
		if (t.onconnect || t.ondisconnect) {
			p.edges;
			let e = p.connectionLookup.get(`${c}-${r()}${n() ? `-${n()}` : ""}`);
			if (h && !Yh(e, h)) {
				let n = e ?? /* @__PURE__ */ new Map();
				Xh(h, n, t.ondisconnect), Xh(n, h, t.onconnect);
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
			p.connectionMode === eh.Strict ? e?.type !== r() : c !== e?.nodeId || n() !== e?.id,
			o && i
		];
	}), _ = /* @__PURE__ */ F(() => u(U(g), 5)), v = /* @__PURE__ */ F(() => U(_)[0]), y = /* @__PURE__ */ F(() => U(_)[1]), b = /* @__PURE__ */ F(() => U(_)[2]), x = /* @__PURE__ */ F(() => U(_)[3]), S = /* @__PURE__ */ F(() => U(_)[4]);
	function w(e) {
		let t = p.onbeforeconnect ? p.onbeforeconnect(e) : e;
		t && (p.addEdge(t), p.onconnect?.(e));
	}
	function T(e) {
		let r = rg(e);
		e.currentTarget && (r && e.button === 0 || !r) && l_.onPointerDown(e, {
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
		let i = eg(e.target), o = t.isValidConnection ?? p.isValidConnection, { connectionMode: s, clickConnectStartHandle: l, flowId: u, nodeLookup: d } = p, { connection: f, isValid: m } = l_.isValid(e, {
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
		let h = structuredClone(ot(p.connection));
		delete h.inProgress, h.toPosition = h.toHandle ? h.toHandle.position : null, p.onclickconnectend?.(e, h), p.clickConnectStartHandle = null;
	}
	var D = I_(), O = () => {};
	ro(D, () => ({
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
		[Ua]: {
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
	})), Ta(R(D), () => t.children ?? C), P(D), q(e, D), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/DefaultNode.svelte
var R_ = /* @__PURE__ */ K("<!> <!>", 1);
function z_(e, t) {
	yt(t, !0);
	let n = Q(t, "targetPosition", 19, () => oh.Top), r = Q(t, "sourcePosition", 19, () => oh.Bottom);
	var i = R_(), a = z(i);
	L_(a, {
		type: "target",
		get position() {
			return n();
		}
	});
	var o = B(a);
	L_(B(o), {
		type: "source",
		get position() {
			return r();
		}
	}), H(() => J(o, ` ${t.data?.label ?? ""} `)), q(e, i), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/InputNode.svelte
var B_ = /* @__PURE__ */ K(" <!>", 1);
function V_(e, t) {
	yt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "sourcePosition", 19, () => oh.Bottom);
	Ge();
	var i = B_(), a = z(i);
	L_(B(a), {
		type: "source",
		get position() {
			return r();
		}
	}), H(() => J(a, `${n()?.label ?? ""} `)), q(e, i), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/OutputNode.svelte
var H_ = /* @__PURE__ */ K(" <!>", 1);
function U_(e, t) {
	yt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "targetPosition", 19, () => oh.Top);
	Ge();
	var i = H_(), a = z(i);
	L_(B(a), {
		type: "target",
		get position() {
			return r();
		}
	}), H(() => J(a, `${n()?.label ?? ""} `)), q(e, i), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/GroupNode.svelte
function W_(e, t) {}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/portal.svelte.js
function G_(e, t, n) {
	if (!n || !t) return;
	let r = n === "root" ? t : t.querySelector(`.svelte-flow__${n}`);
	r && r.appendChild(e);
}
function K_(e, t) {
	let n = /* @__PURE__ */ F(xv), r = /* @__PURE__ */ F(() => U(n).domNode), i;
	return U(r) ? G_(e, U(r), t) : i = Ir(() => {
		Nr(() => {
			G_(e, U(r), t), i?.();
		});
	}), {
		async update(t) {
			G_(e, U(r), t);
		},
		destroy() {
			e.parentNode && e.parentNode.removeChild(e), i?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/utils.svelte.js
function q_() {
	let e = /* @__PURE__ */ er(typeof window > "u");
	if (U(e)) {
		let t = Ir(() => {
			Nr(() => {
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
var J_ = (e) => lh(e), Y_ = (e) => ch(e);
function X_(e) {
	return e === void 0 ? void 0 : `${e}px`;
}
var Z_ = {
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
}, Q_ = /* @__PURE__ */ new Set([
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
]), $_ = /* @__PURE__ */ K("<div><!></div>");
function ev(e, t) {
	yt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "selectEdgeOnClick", 3, !1), a = Q(t, "transparent", 3, !1), o = /* @__PURE__ */ xo(t, Q_), s = xv(), c = N_("EdgeLabel must be used within a Custom Edge component"), l = /* @__PURE__ */ F(() => s.visible.edges.get(c)?.zIndex);
	var u = $_(), d = () => {
		i() && c && s.handleEdgeSelection(c);
	};
	ro(u, (e) => ({
		class: [
			"svelte-flow__edge-label",
			{ transparent: a() },
			t.class
		],
		tabindex: "-1",
		onclick: d,
		...o,
		[Wa]: e
	}), [() => ({
		display: q_().value ? "none" : void 0,
		cursor: i() ? "pointer" : void 0,
		transform: `translate(-50%, -50%) translate(${n() ?? ""}px,${r() ?? ""}px)`,
		"pointer-events": "all",
		width: X_(t.width),
		height: X_(t.height),
		"z-index": U(l)
	})], void 0, void 0, "svelte-1wg91mu"), Ta(R(u), () => t.children ?? C), P(u), Da(u, (e, t) => K_?.(e, t), () => "edge-labels"), q(e, u), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BaseEdge.svelte
var tv = /* @__PURE__ */ new Set([
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
]), nv = /* @__PURE__ */ aa("<path></path>"), rv = /* @__PURE__ */ aa("<path fill=\"none\"></path><!><!>", 1);
function iv(e, t) {
	let n = Q(t, "interactionWidth", 3, 20), r = /* @__PURE__ */ xo(t, tv);
	var i = rv(), a = z(i), o = B(a), s = (e) => {
		var i = nv();
		ro(i, () => ({
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
		ev(e, {
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
				Ge();
				var r = oa();
				H(() => J(r, t.label)), q(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	Y(c, (e) => {
		t.label && e(l);
	}), H(() => {
		to(a, "id", t.id), to(a, "d", t.path), Z(a, 0, ja(["svelte-flow__edge-path", t.class])), to(a, "marker-start", t.markerStart), to(a, "marker-end", t.markerEnd), Ra(a, t.style);
	}), q(e, i);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BezierEdge.svelte
function av(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ F(() => lg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		curvature: t.pathOptions?.curvature
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	iv(e, {
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
	}), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/SmoothStepEdgeInternal.svelte
function ov(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ F(() => Sg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	iv(e, {
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
	}), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/StraightEdgeInternal.svelte
function sv(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ F(() => gg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	iv(e, {
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
	}), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/StepEdgeInternal.svelte
function cv(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ F(() => Sg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		borderRadius: 0
	})), r = /* @__PURE__ */ F(() => u(U(n), 3)), i = /* @__PURE__ */ F(() => U(r)[0]), a = /* @__PURE__ */ F(() => U(r)[1]), o = /* @__PURE__ */ F(() => U(r)[2]);
	iv(e, {
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
	}), bt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/reactive-value.js
cr(), ut(), Fi(), cr(), ut(), Fi(), cr(), ut(), Fi(), cr(), ut(), Fi(), cr(), ut(), Fi(), un();
var lv = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = ln(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, uv = /\(.+\)/, dv = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), fv = class extends lv {
	constructor(e, t) {
		let n = uv.test(e) || e.split(/[\s,]+/).some((e) => dv.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => Ji(r, "change", e));
	}
};
//#endregion
//#region node_modules/svelte/src/reactivity/index-client.js
un();
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/visibleElements.js
function pv(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return mh(e, {
		x: 0,
		y: 0,
		width: n,
		height: r
	}, t, !0).forEach((e) => {
		i.set(e.id, e);
	}), i;
}
function mv(e) {
	let { edges: t, defaultEdgeOptions: n, nodeLookup: r, previousEdges: i, connectionMode: a, onerror: o, onlyRenderVisible: s, elevateEdgesOnSelect: c, zIndexMode: l } = e, u = /* @__PURE__ */ new Map();
	for (let d of t) {
		let t = r.get(d.source), f = r.get(d.target);
		if (!t || !f) continue;
		if (s) {
			let { visibleNodes: n, transform: r, width: i, height: a } = e;
			if (fg({
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
		let m = wg({
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
			zIndex: dg({
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
var hv = Fh("Svelte Flow", "https://svelteflow.dev/"), gv = {
	input: V_,
	output: U_,
	default: z_,
	group: W_
}, _v = {
	straight: sv,
	smoothstep: ov,
	default: av,
	step: cv
};
function vv(e, t, n, r, i, a) {
	return t && !n && r && i ? Hh(ph(a, { filter: (e) => !!((e.width || e.initialWidth) && (e.height || e.initialHeight)) }), r, i, .5, 2, .1) : n ?? {
		x: 0,
		y: 0,
		zoom: 1
	};
}
function yv(e) {
	class t {
		#e = /* @__PURE__ */ F(() => e.props.id ?? "1");
		get flowId() {
			return U(this.#e);
		}
		set flowId(e) {
			L(this.#e, e);
		}
		#t = /* @__PURE__ */ er(null);
		get domNode() {
			return U(this.#t);
		}
		set domNode(e) {
			L(this.#t, e);
		}
		#n = /* @__PURE__ */ er(null);
		get panZoom() {
			return U(this.#n);
		}
		set panZoom(e) {
			L(this.#n, e);
		}
		#r = /* @__PURE__ */ er(e.width ?? 0);
		get width() {
			return U(this.#r);
		}
		set width(e) {
			L(this.#r, e);
		}
		#i = /* @__PURE__ */ er(e.height ?? 0);
		get height() {
			return U(this.#i);
		}
		set height(e) {
			L(this.#i, e);
		}
		#a = /* @__PURE__ */ er(e.props.zIndexMode ?? "basic");
		get zIndexMode() {
			return U(this.#a);
		}
		set zIndexMode(e) {
			L(this.#a, e);
		}
		#o = /* @__PURE__ */ F(() => {
			let { nodesInitialized: t } = Rg(e.nodes, this.nodeLookup, this.parentLookup, {
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
		#c = /* @__PURE__ */ F(() => (qg(this.connectionLookup, this.edgeLookup, e.edges), e.edges));
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
				u = pv(i, r, t, n), d = mv({
					...f,
					onlyRenderVisible: !0,
					visibleNodes: u,
					transform: r,
					width: t,
					height: n
				});
			} else u = this.nodeLookup, d = mv(f);
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
		#x = /* @__PURE__ */ F(() => e.props.nodeExtent ?? Zm);
		get nodeExtent() {
			return U(this.#x);
		}
		set nodeExtent(e) {
			L(this.#x, e);
		}
		#S = /* @__PURE__ */ F(() => e.props.translateExtent ?? Zm);
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
		#j = /* @__PURE__ */ er(!1);
		get dragging() {
			return U(this.#j);
		}
		set dragging(e) {
			L(this.#j, e);
		}
		#M = /* @__PURE__ */ er(null);
		get selectionRect() {
			return U(this.#M);
		}
		set selectionRect(e) {
			L(this.#M, e);
		}
		#N = /* @__PURE__ */ er(!1);
		get selectionKeyPressed() {
			return U(this.#N);
		}
		set selectionKeyPressed(e) {
			L(this.#N, e);
		}
		#P = /* @__PURE__ */ er(!1);
		get multiselectionKeyPressed() {
			return U(this.#P);
		}
		set multiselectionKeyPressed(e) {
			L(this.#P, e);
		}
		#F = /* @__PURE__ */ er(!1);
		get deleteKeyPressed() {
			return U(this.#F);
		}
		set deleteKeyPressed(e) {
			L(this.#F, e);
		}
		#I = /* @__PURE__ */ er(!1);
		get panActivationKeyPressed() {
			return U(this.#I);
		}
		set panActivationKeyPressed(e) {
			L(this.#I, e);
		}
		#L = /* @__PURE__ */ er(!1);
		get zoomActivationKeyPressed() {
			return U(this.#L);
		}
		set zoomActivationKeyPressed(e) {
			L(this.#L, e);
		}
		#R = /* @__PURE__ */ er(null);
		get selectionRectMode() {
			return U(this.#R);
		}
		set selectionRectMode(e) {
			L(this.#R, e);
		}
		#z = /* @__PURE__ */ er("");
		get ariaLiveMessage() {
			return U(this.#z);
		}
		set ariaLiveMessage(e) {
			L(this.#z, e);
		}
		#B = /* @__PURE__ */ F(() => e.props.selectionMode ?? nh.Partial);
		get selectionMode() {
			return U(this.#B);
		}
		set selectionMode(e) {
			L(this.#B, e);
		}
		#V = /* @__PURE__ */ F(() => ({
			...gv,
			...e.props.nodeTypes
		}));
		get nodeTypes() {
			return U(this.#V);
		}
		set nodeTypes(e) {
			L(this.#V, e);
		}
		#H = /* @__PURE__ */ F(() => ({
			..._v,
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
		#K = /* @__PURE__ */ F(() => Jh(e.props.ariaLabelConfig));
		get ariaLabelConfig() {
			return U(this.#K);
		}
		set ariaLabelConfig(e) {
			L(this.#K, e);
		}
		#q = /* @__PURE__ */ er(vv(this.nodesInitialized, e.props.fitView, e.props.initialViewport, this.width, this.height, this.nodeLookup));
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
		#J = /* @__PURE__ */ er(rh);
		get _connection() {
			return U(this.#J);
		}
		set _connection(e) {
			L(this.#J, e);
		}
		#Y = /* @__PURE__ */ F(() => this._connection.inProgress ? {
			...this._connection,
			to: Lh(this._connection.to, [
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
		#X = /* @__PURE__ */ F(() => e.props.connectionMode ?? eh.Strict);
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
		#te = /* @__PURE__ */ F(() => kg(e.edges, {
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
		#re = /* @__PURE__ */ F(() => e.props.onflowerror ?? hv);
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
		#_e = /* @__PURE__ */ er(null);
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
			this.panZoom && (await _h({
				nodes: this.nodeLookup,
				width: this.width,
				height: this.height,
				panZoom: this.panZoom,
				minZoom: this.minZoom,
				maxZoom: this.maxZoom
			}, this.fitViewOptions), this.fitViewResolver?.resolve(!0), this.fitViewQueued = !1, this.fitViewOptions = void 0, this.fitViewResolver = null);
		};
		_prefersDark = new fv("(prefers-color-scheme: dark)", e.props.colorModeSSR === "dark");
		#xe = /* @__PURE__ */ F(() => e.props.colorMode === "system" ? this._prefersDark.current ? "dark" : "light" : e.props.colorMode ?? "light");
		get colorMode() {
			return U(this.#xe);
		}
		set colorMode(e) {
			L(this.#xe, e);
		}
		constructor() {}
		resetStoreValues() {
			this.dragging = !1, this.selectionRect = null, this.selectionRectMode = null, this.selectionKeyPressed = !1, this.multiselectionKeyPressed = !1, this.deleteKeyPressed = !1, this.panActivationKeyPressed = !1, this.zoomActivationKeyPressed = !1, this._connection = rh, this.clickConnectStartHandle = null, this.viewport = e.props.initialViewport ?? {
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
var bv = Xm.error001("svelte");
function xv() {
	let e = gt(Sv);
	if (!e) throw Error(bv);
	return e.getStore();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/index.js
var Sv = Symbol();
function Cv(e) {
	let t = yv(e);
	function n(e) {
		t.nodeTypes = {
			...gv,
			...e
		};
	}
	function r(e) {
		t.edgeTypes = {
			..._v,
			...e
		};
	}
	function i(e) {
		t.edges = D_(e, t.edges, { onError: t.onerror });
	}
	let a = (e, n = !1) => {
		t.nodes = t.nodes.map((r) => {
			if (t.connection.inProgress && t.connection.fromNode.id === r.id) {
				let e = t.nodeLookup.get(r.id);
				e && (t.connection = {
					...t.connection,
					from: Eg(e, t.connection.fromHandle, oh.Left, !0)
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
		let { changes: n, updatedInternals: r } = Wg(e, t.nodeLookup, t.parentLookup, t.domNode, t.nodeOrigin, t.nodeExtent, t.zIndexMode);
		if (!r) return;
		Fg(t.nodeLookup, t.parentLookup, {
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
			t.onerror("012", Xm.error012(e));
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
			t.onerror("016", Xm.error016(e));
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
			i && (t = Ih(t, i));
			let { position: n, positionAbsolute: a } = vh({
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
		return Gg({
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
		t._connection = rh;
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
function wv(e, t) {
	let { minZoom: n, maxZoom: r, initialViewport: i, onPanZoomStart: a, onPanZoom: o, onPanZoomEnd: s, translateExtent: c, setPanZoomInstance: l, onDraggingChange: u, onTransformChange: d } = t, f = w_({
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
var Tv = /* @__PURE__ */ K("<div class=\"svelte-flow__zoom svelte-flow__container\"><!></div>");
function Ev(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ F(() => n().panActivationKeyPressed || t.panOnDrag), i = /* @__PURE__ */ F(() => n().panActivationKeyPressed || t.panOnScroll), { viewport: a } = n(), o = !1;
	Nr(() => {
		!o && n().viewportInitialized && (t.oninit?.(), o = !0);
	});
	var s = Tv();
	Ta(R(s), () => t.children), P(s), Da(s, (e, t) => wv?.(e, t), () => ({
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
	})), q(e, s), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Pane/Pane.svelte
function Dv(e, t) {
	return (n) => {
		n.target === t && e?.(n);
	};
}
function Ov(e) {
	return (t) => {
		let n = e.has(t.id);
		return !!t.selected === n ? t : {
			...t,
			selected: n
		};
	};
}
function kv(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
var Av = /* @__PURE__ */ K("<div><!></div>");
function jv(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15), r = Q(t, "panOnDrag", 3, !0), i = Q(t, "paneClickDistance", 3, 1), a = Q(t, "autoPanOnSelection", 3, !0), o, s = null, c = !1, l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ F(() => n().panActivationKeyPressed || r()), f = /* @__PURE__ */ F(() => n().selectionKeyPressed || !!n().selectionRect || t.selectionOnDrag && U(d) !== !0), p = /* @__PURE__ */ F(() => n().elementsSelectable && (U(f) || n().selectionRectMode === "user")), m = !1, h = 0, g = {
		x: 0,
		y: 0
	}, _ = !1;
	function v(e) {
		if (e.pointerType === "touch" && U(d) !== !1 && !n().selectionKeyPressed || (s = o?.getBoundingClientRect(), !s)) return;
		let r = e.target === o, i = !r && !!e.target.closest(".nokey"), a = t.selectionOnDrag && r || n().selectionKeyPressed;
		if (i || !U(f) || !a || e.button !== 0 || !e.isPrimary) return;
		e.target?.setPointerCapture?.(e.pointerId), m = !1, _ = !1;
		let { x: c, y: l } = ig(e, s), u = Lh({
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
		}, i = Rh(r, [
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
		l = new Set(mh(n().nodeLookup, a, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		], n().selectionMode === nh.Partial, !0).map((e) => e.id));
		let c = n().defaultEdgeOptions.selectable ?? !0;
		u = /* @__PURE__ */ new Set();
		for (let e of l) {
			let t = n().connectionLookup.get(e);
			if (t) for (let { edgeId: e } of t.values()) {
				let t = n().edgeLookup.get(e);
				t && (t.selectable ?? c) && u.add(e);
			}
		}
		kv(o, l) || n(n().nodes = n().nodes.map(Ov(l)), !0), kv(s, u) || n(n().edges = n().edges.map(Ov(u)), !0), n(n().selectionRectMode = "user", !0), n(n().selectionRect = a, !0);
	}
	function b() {
		if (!a() || !s) return;
		let [e, t] = wh(g, s, n().autoPanSpeed);
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
	To(() => {
		typeof window < "u" && x();
	});
	function S(e) {
		if (!U(f) || !s || !n().selectionRect) return;
		let r = ig(e, s);
		g = {
			x: r.x,
			y: r.y
		};
		let a = Rh({
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
	var O = Av();
	let k;
	var A = /* @__PURE__ */ F(() => U(p) ? void 0 : Dv(D, o)), j = /* @__PURE__ */ F(() => Dv(T, o));
	Ta(R(O), () => t.children), P(O), ho(O, (e) => o = e, () => o), H((e) => k = Z(O, 1, "svelte-flow__pane svelte-flow__container", null, k, e), [() => ({
		draggable: r() === !0 || Array.isArray(r()) && r().includes(0),
		dragging: n().dragging,
		selection: U(f)
	})]), G("click", O, function(...e) {
		U(A)?.apply(this, e);
	}), Yi("pointerdown", O, function(...e) {
		(U(p) ? v : void 0)?.apply(this, e);
	}, !0), G("pointermove", O, function(...e) {
		(U(p) ? S : void 0)?.apply(this, e);
	}), G("pointerup", O, C), Yi("pointercancel", O, function(...e) {
		(U(p) ? w : void 0)?.apply(this, e);
	}), G("contextmenu", O, function(...e) {
		U(j)?.apply(this, e);
	}), Yi("click", O, function(...e) {
		(U(p) ? E : void 0)?.apply(this, e);
	}, !0), q(e, O), bt();
}
Xi([
	"click",
	"pointermove",
	"pointerup",
	"contextmenu"
]);
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Viewport/Viewport.svelte
var Mv = /* @__PURE__ */ K("<div class=\"svelte-flow__viewport xyflow__viewport svelte-flow__container\"><!></div>");
function Nv(e, t) {
	yt(t, !0);
	var n = Mv();
	let r;
	Ta(R(n), () => t.children), P(n), H(() => r = Ra(n, "", r, { transform: `translate(${t.store.viewport.x ?? ""}px, ${t.store.viewport.y ?? ""}px) scale(${t.store.viewport.zoom ?? ""})` })), q(e, n), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/drag/index.js
function Pv(e, t) {
	let { store: n, onDrag: r, onDragStart: i, onDragStop: a, onNodeMouseDown: o } = t, s = $g({
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
var Fv = /* @__PURE__ */ K("<div aria-live=\"assertive\" aria-atomic=\"true\" class=\"a11y-live-msg svelte-13pq11u\"> </div>"), Iv = /* @__PURE__ */ K("<div class=\"a11y-hidden svelte-13pq11u\"> </div> <div class=\"a11y-hidden svelte-13pq11u\"> </div> <!>", 1);
function Lv(e, t) {
	yt(t, !0);
	var n = Iv(), r = z(n), i = R(r, !0);
	P(r);
	var a = B(r, 2), o = R(a, !0);
	P(a);
	var s = B(a, 2), c = (e) => {
		var n = Fv(), r = R(n, !0);
		P(n), H(() => {
			to(n, "id", `${Bv}-${t.store.flowId}`), J(r, t.store.ariaLiveMessage);
		}), q(e, n);
	};
	Y(s, (e) => {
		t.store.disableKeyboardA11y || e(c);
	}), H(() => {
		to(r, "id", `${Rv}-${t.store.flowId}`), J(i, t.store.disableKeyboardA11y ? t.store.ariaLabelConfig["node.a11yDescription.default"] : t.store.ariaLabelConfig["node.a11yDescription.keyboardDisabled"]), to(a, "id", `${zv}-${t.store.flowId}`), J(o, t.store.ariaLabelConfig["edge.a11yDescription.default"]);
	}), q(e, n), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/A11yDescriptions/index.js
var Rv = "svelte-flow__node-desc", zv = "svelte-flow__edge-desc", Bv = "svelte-flow__aria-live", Vv = /* @__PURE__ */ K("<div><!></div>");
function Hv(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ F(() => l(t.node.data, () => ({}), !0)), i = /* @__PURE__ */ F(() => l(t.node.selected, !1)), a = /* @__PURE__ */ F(() => t.node.draggable), o = /* @__PURE__ */ F(() => t.node.selectable), s = /* @__PURE__ */ F(() => l(t.node.deletable, !0)), c = /* @__PURE__ */ F(() => t.node.connectable), u = /* @__PURE__ */ F(() => t.node.focusable), d = /* @__PURE__ */ F(() => l(t.node.hidden, !1)), f = /* @__PURE__ */ F(() => l(t.node.dragging, !1)), p = /* @__PURE__ */ F(() => l(t.node.style, "")), m = /* @__PURE__ */ F(() => t.node.class), h = /* @__PURE__ */ F(() => l(t.node.type, "default")), g = /* @__PURE__ */ F(() => t.node.parentId), _ = /* @__PURE__ */ F(() => t.node.sourcePosition), v = /* @__PURE__ */ F(() => t.node.targetPosition), y = /* @__PURE__ */ F(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).width), b = /* @__PURE__ */ F(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).height), x = /* @__PURE__ */ F(() => t.node.initialWidth), S = /* @__PURE__ */ F(() => t.node.initialHeight), C = /* @__PURE__ */ F(() => t.node.width), w = /* @__PURE__ */ F(() => t.node.height), T = /* @__PURE__ */ F(() => t.node.dragHandle), E = /* @__PURE__ */ F(() => l(t.node.internals.z, 0)), D = /* @__PURE__ */ F(() => t.node.internals.positionAbsolute.x), O = /* @__PURE__ */ F(() => t.node.internals.positionAbsolute.y), k = /* @__PURE__ */ F(() => t.node.internals.userNode), { id: A } = t.node, j = /* @__PURE__ */ F(() => U(a) ?? n().nodesDraggable), ee = /* @__PURE__ */ F(() => U(o) ?? n().elementsSelectable), M = /* @__PURE__ */ F(() => U(c) ?? n().nodesConnectable), N = /* @__PURE__ */ F(() => Kh(t.node)), te = /* @__PURE__ */ F(() => !!t.node.internals.handleBounds), ne = /* @__PURE__ */ F(() => U(N) && U(te)), re = /* @__PURE__ */ F(() => U(u) ?? n().nodesFocusable);
	function ie(e) {
		return n().parentLookup.has(e);
	}
	let ae = /* @__PURE__ */ F(() => ie(A)), oe = /* @__PURE__ */ er(null), se = null, ce = U(h), le = U(_), ue = U(v), de = /* @__PURE__ */ F(() => n().nodeTypes[U(h)] ?? z_), fe = /* @__PURE__ */ F(() => n().ariaLabelConfig);
	A_(A), M_({ get value() {
		return U(M);
	} });
	let pe = /* @__PURE__ */ F(() => {
		let e = U(y) === void 0 ? U(C) ?? U(x) : U(C), t = U(b) === void 0 ? U(w) ?? U(S) : U(w);
		if (e !== void 0 || t !== void 0 || U(p) !== void 0) return `${U(p)};${e ? `width:${X_(e)};` : ""}${t ? `height:${X_(t)};` : ""}`;
	});
	Nr(() => {
		(U(h) !== ce || U(_) !== le || U(v) !== ue) && U(oe) !== null && requestAnimationFrame(() => {
			U(oe) !== null && n().updateNodeInternals(/* @__PURE__ */ new Map([[A, {
				id: A,
				nodeElement: U(oe),
				force: !0
			}]]));
		}), ce = U(h), le = U(_), ue = U(v);
	}), Nr(() => {
		t.resizeObserver && (!U(ne) || U(oe) !== se) && (se && t.resizeObserver.unobserve(se), U(oe) && t.resizeObserver.observe(U(oe)), se = U(oe));
	}), To(() => {
		se && t.resizeObserver?.unobserve(se);
	});
	function me(e) {
		U(ee) && (!n().selectNodesOnDrag || !U(j) || n().nodeDragThreshold > 0) && n().handleNodeSelection(A), t.onnodeclick?.({
			node: U(k),
			event: e
		});
	}
	function he(e) {
		if (!(ng(e) || n().disableKeyboardA11y)) {
			if (Qm.includes(e.key) && U(ee)) {
				let t = e.key === "Escape";
				n().handleNodeSelection(A, t, U(oe));
			} else U(j) && t.node.selected && Object.prototype.hasOwnProperty.call(Z_, e.key) && (e.preventDefault(), n(n().ariaLiveMessage = U(fe)["node.a11yDescription.ariaLiveMessage"]({
				direction: e.key.replace("Arrow", "").toLowerCase(),
				x: ~~t.node.internals.positionAbsolute.x,
				y: ~~t.node.internals.positionAbsolute.y
			}), !0), n().moveSelectedNodes(Z_[e.key], e.shiftKey ? 4 : 1));
		}
	}
	let ge = () => {
		if (n().disableKeyboardA11y || !n().autoPanOnNodeFocus || !U(oe)?.matches(":focus-visible")) return;
		let { width: e, height: r, viewport: i } = n();
		mh(/* @__PURE__ */ new Map([[A, t.node]]), {
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
	var _e = sa(), ve = z(_e), ye = (e) => {
		var a = Vv();
		ro(a, () => ({
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
			"aria-describedby": n().disableKeyboardA11y ? void 0 : `${Rv}-${n().flowId}`,
			...t.node.domAttributes,
			[Ua]: {
				dragging: U(f),
				selected: U(i),
				draggable: U(j),
				connectable: U(M),
				selectable: U(ee),
				nopan: U(j),
				parent: U(ae)
			},
			[Wa]: {
				"z-index": U(E),
				transform: `translate(${U(D) ?? ""}px, ${U(O) ?? ""}px)`,
				visibility: U(N) ? "visible" : "hidden"
			}
		})), Ea(R(a), () => U(de), (e, t) => {
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
		}), P(a), Da(a, (e, t) => Pv?.(e, t), () => ({
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
		})), ho(a, (e) => L(oe, e), () => U(oe)), q(e, a);
	};
	Y(ve, (e) => {
		U(d) || e(ye);
	}), q(e, _e), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/NodeRenderer/NodeRenderer.svelte
var Uv = /* @__PURE__ */ K("<div class=\"svelte-flow__nodes\"></div>");
function Wv(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15), r = typeof ResizeObserver > "u" ? null : new ResizeObserver((e) => {
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
	To(() => {
		r?.disconnect();
	});
	var i = Uv();
	X(i, 21, () => n().visible.nodes.values(), (e) => e.id, (e, i) => {
		Hv(e, {
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
	}), P(i), q(e, i), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/EdgeWrapper/EdgeWrapper.svelte
var Gv = /* @__PURE__ */ aa("<svg class=\"svelte-flow__edge-wrapper\"><g><!></g></svg>");
function Kv(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ F(() => t.edge.id), r = /* @__PURE__ */ F(() => t.edge.source), i = /* @__PURE__ */ F(() => t.edge.target), a = /* @__PURE__ */ F(() => t.edge.sourceX), o = /* @__PURE__ */ F(() => t.edge.sourceY), s = /* @__PURE__ */ F(() => t.edge.targetX), c = /* @__PURE__ */ F(() => t.edge.targetY), u = /* @__PURE__ */ F(() => t.edge.sourcePosition), d = /* @__PURE__ */ F(() => t.edge.targetPosition), f = /* @__PURE__ */ F(() => l(t.edge.animated, !1)), p = /* @__PURE__ */ F(() => l(t.edge.selected, !1)), m = /* @__PURE__ */ F(() => t.edge.label), h = /* @__PURE__ */ F(() => t.edge.labelStyle), g = /* @__PURE__ */ F(() => l(t.edge.data, () => ({}), !0)), _ = /* @__PURE__ */ F(() => t.edge.style), v = /* @__PURE__ */ F(() => t.edge.interactionWidth), y = /* @__PURE__ */ F(() => l(t.edge.type, "default")), b = /* @__PURE__ */ F(() => t.edge.sourceHandle), x = /* @__PURE__ */ F(() => t.edge.targetHandle), S = /* @__PURE__ */ F(() => t.edge.markerStart), C = /* @__PURE__ */ F(() => t.edge.markerEnd), w = /* @__PURE__ */ F(() => t.edge.selectable), T = /* @__PURE__ */ F(() => t.edge.focusable), E = /* @__PURE__ */ F(() => l(t.edge.deletable, !0)), D = /* @__PURE__ */ F(() => t.edge.hidden), O = /* @__PURE__ */ F(() => t.edge.zIndex), k = /* @__PURE__ */ F(() => t.edge.class), A = /* @__PURE__ */ F(() => t.edge.ariaLabel);
	P_(U(n));
	let j = null, ee = /* @__PURE__ */ F(() => U(w) ?? t.store.elementsSelectable), M = /* @__PURE__ */ F(() => U(T) ?? t.store.edgesFocusable), N = /* @__PURE__ */ F(() => t.store.edgeTypes[U(y)] ?? av), te = /* @__PURE__ */ F(() => U(S) ? `url('#${Og(U(S), t.store.flowId)}')` : void 0), ne = /* @__PURE__ */ F(() => U(C) ? `url('#${Og(U(C), t.store.flowId)}')` : void 0);
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
		if (!t.store.disableKeyboardA11y && Qm.includes(e.key) && U(ee)) {
			let { unselectNodesAndEdges: r, addSelectedEdges: i } = t.store;
			e.key === "Escape" ? (j?.blur(), r({ edges: [t.edge] })) : i([U(n)]);
		}
	}
	var oe = sa(), se = z(oe), ce = (e) => {
		var l = Gv();
		let S;
		var C = R(l);
		ro(C, () => ({
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
			"aria-describedby": U(M) ? `${zv}-${t.store.flowId}` : void 0,
			role: t.edge.ariaRole ?? (U(M) ? "group" : "img"),
			"aria-roledescription": "edge",
			onkeydown: U(M) ? ae : void 0,
			tabindex: U(M) ? 0 : void 0,
			...t.edge.domAttributes,
			[Ua]: {
				animated: U(f),
				selected: U(p),
				selectable: U(ee)
			}
		})), Ea(R(C), () => U(N), (e, t) => {
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
		}), P(C), ho(C, (e) => j = e, () => j), P(l), H(() => S = Ra(l, "", S, { "z-index": U(O) })), q(e, l);
	};
	Y(se, (e) => {
		U(D) || e(ce);
	}), q(e, oe), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/MarkerDefinition.svelte
var qv = /* @__PURE__ */ aa("<defs></defs>");
function Jv(e, t) {
	yt(t, !1);
	let n = xv();
	vo();
	var r = qv();
	X(r, 5, () => n.markers, (e) => e.id, (e, t) => {
		Qv(e, Co(() => U(t)));
	}), P(r), q(e, r), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/Marker.svelte
var Yv = /* @__PURE__ */ aa("<polyline class=\"arrow\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4\"></polyline>"), Xv = /* @__PURE__ */ aa("<polyline class=\"arrowclosed\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4 -5,-4\"></polyline>"), Zv = /* @__PURE__ */ aa("<marker class=\"svelte-flow__arrowhead\" viewBox=\"-10 -10 20 20\" refX=\"0\" refY=\"0\"><!></marker>");
function Qv(e, t) {
	yt(t, !0);
	let n = Q(t, "width", 3, 12.5), r = Q(t, "height", 3, 12.5), i = Q(t, "markerUnits", 3, "strokeWidth"), a = Q(t, "orient", 3, "auto-start-reverse"), o = Q(t, "color", 3, "none");
	var s = Zv(), c = R(s), l = (e) => {
		var n = Yv();
		let r;
		H(() => {
			to(n, "stroke-width", t.strokeWidth), r = Ra(n, "", r, { stroke: o() });
		}), q(e, n);
	}, u = (e) => {
		var n = Xv();
		let r;
		H(() => {
			to(n, "stroke-width", t.strokeWidth), r = Ra(n, "", r, {
				stroke: o(),
				fill: o()
			});
		}), q(e, n);
	};
	Y(c, (e) => {
		t.type === ah.Arrow ? e(l) : t.type === ah.ArrowClosed && e(u, 1);
	}), P(s), H(() => {
		to(s, "id", t.id), to(s, "markerWidth", `${n()}`), to(s, "markerHeight", `${r()}`), to(s, "markerUnits", i()), to(s, "orient", a());
	}), q(e, s), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/EdgeRenderer.svelte
var $v = /* @__PURE__ */ K("<div class=\"svelte-flow__edges\"><svg class=\"svelte-flow__marker\"><!></svg> <!></div>");
function ey(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15);
	var r = $v(), i = R(r);
	Jv(R(i), {}), P(i), X(B(i, 2), 17, () => n().visible.edges.values(), (e) => e.id, (e, r) => {
		Kv(e, {
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
	}), P(r), q(e, r), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Selection/Selection.svelte
var ty = /* @__PURE__ */ K("<div class=\"svelte-flow__selection svelte-1vr3gfi\"></div>");
function ny(e, t) {
	yt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "width", 3, 0), a = Q(t, "height", 3, 0), o = Q(t, "isVisible", 3, !0);
	var s = sa(), c = z(s), l = (e) => {
		var t = ty();
		let o;
		H((e) => o = Ra(t, "", o, e), [() => ({
			width: typeof i() == "string" ? i() : X_(i()),
			height: typeof a() == "string" ? a() : X_(a()),
			transform: `translate(${n()}px, ${r()}px)`
		})]), q(e, t);
	};
	Y(c, (e) => {
		o() && e(l);
	}), q(e, s), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/NodeSelection/NodeSelection.svelte
var ry = /* @__PURE__ */ K("<div><!></div>");
function iy(e, t) {
	yt(t, !0);
	let n = /* @__PURE__ */ er(void 0);
	Nr(() => {
		t.store.disableKeyboardA11y || U(n)?.focus({ preventScroll: !0 });
	});
	let r = /* @__PURE__ */ F(() => {
		if (t.store.selectionRectMode === "nodes") {
			t.store.nodes;
			let e = ph(t.store.nodeLookup, { filter: (e) => !!e.selected });
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
		Object.prototype.hasOwnProperty.call(Z_, e.key) && (e.preventDefault(), t.store.moveSelectedNodes(Z_[e.key], e.shiftKey ? 4 : 1));
	}
	var s = sa(), c = z(s), l = (e) => {
		var s = ry();
		let c;
		ny(R(s), {
			width: "100%",
			height: "100%",
			x: 0,
			y: 0
		}), P(s), Da(s, (e, t) => Pv?.(e, t), () => ({
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
		})), ho(s, (e) => L(n, e), () => U(n)), H((e) => {
			Z(s, 1, ja(["svelte-flow__selection-wrapper", t.store.noPanClass]), "svelte-sf2y5e"), to(s, "role", t.store.disableKeyboardA11y ? void 0 : "button"), to(s, "tabindex", t.store.disableKeyboardA11y ? void 0 : -1), c = Ra(s, "", c, e);
		}, [() => ({
			width: X_(U(r).width),
			height: X_(U(r).height),
			transform: `translate(${U(r).x ?? ""}px, ${U(r).y ?? ""}px)`
		})]), G("contextmenu", s, i), G("click", s, a), G("keydown", s, function(...e) {
			(t.store.disableKeyboardA11y ? void 0 : o)?.apply(this, e);
		}), q(e, s);
	}, u = /* @__PURE__ */ F(() => t.store.selectionRectMode === "nodes" && U(r) && Ph(U(r).x) && Ph(U(r).y));
	Y(c, (e) => {
		U(u) && e(l);
	}), q(e, s), bt();
}
Xi([
	"contextmenu",
	"click",
	"keydown"
]);
//#endregion
//#region node_modules/@svelte-put/shortcut/src/shortcut.js
function ay(e) {
	switch (e) {
		case "none": return 0;
		case "ctrl": return 8;
		case "shift": return 4;
		case "alt": return 2;
		case "meta": return 1;
	}
}
function oy(e, t) {
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
					for (let n of e) if ((Array.isArray(n) ? n : [n]).reduce((e, t) => e | ay(t), 0) === i) {
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
	return n && (o = Ji(e, i, a)), {
		update: (t) => {
			let { enabled: s = !0, type: c = "keydown" } = t;
			n && (!s || i !== c) ? o?.() : !n && s && (o = Ji(e, c, a)), n = s, i = c, r = t.trigger;
		},
		destroy: () => {
			o?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useSvelteFlow.svelte.js
function sy() {
	let e = /* @__PURE__ */ F(xv), t = (t) => {
		let n = J_(t) ? t : U(e).nodeLookup.get(t.id), r = n.parentId ? qh(n.position, n.measured, n.parentId, U(e).nodeLookup, U(e).nodeOrigin) : n.position;
		return Oh({
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
				return r?.replace && J_(t) ? t : {
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
				return r.replace && Y_(t) ? t : {
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
		getNodes: (t) => t === void 0 ? U(e).nodes : cy(U(e).nodeLookup, t),
		getEdge: (t) => U(e).edgeLookup.get(t),
		getEdges: (t) => t === void 0 ? U(e).edges : cy(U(e).edgeLookup, t),
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
		getViewport: () => ot(U(e).viewport),
		setCenter: async (t, n, r) => U(e).setCenter(t, n, r),
		fitView: (t) => U(e).fitView(t),
		fitBounds: async (t, n) => {
			if (!U(e).panZoom) return !1;
			let r = Hh(t, U(e).width, U(e).height, U(e).minZoom, U(e).maxZoom, n?.padding ?? .1);
			return await U(e).panZoom.setViewport(r, {
				duration: n?.duration,
				ease: n?.ease,
				interpolate: n?.interpolate
			}), !0;
		},
		getIntersectingNodes: (n, r = !0, i) => {
			let a = Nh(n), o = a ? n : t(n);
			return o ? (i || U(e).nodes).filter((t) => {
				let i = U(e).nodeLookup.get(t.id);
				if (!i || !a && t.id === n.id) return !1;
				let s = Oh(i), c = Mh(s, o);
				return r && c > 0 || c >= s.width * s.height || c >= o.width * o.height;
			}) : [];
		},
		isNodeIntersecting: (e, n, r = !0) => {
			let i = Nh(e) ? e : t(e);
			if (!i) return !1;
			let a = Mh(i, n);
			return r && a > 0 || a >= n.width * n.height || a >= i.width * i.height;
		},
		deleteElements: async ({ nodes: t = [], edges: n = [] }) => {
			let { nodes: r, edges: i } = await yh({
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
			return Lh({
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
			let { x: n, y: r, zoom: i } = U(e).viewport, { x: a, y: o } = U(e).domNode.getBoundingClientRect(), s = Rh(t, [
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
		getNodesBounds: (t) => fh(t, {
			nodeLookup: U(e).nodeLookup,
			nodeOrigin: U(e).nodeOrigin
		}),
		getHandleConnections: ({ type: t, id: n, nodeId: r }) => Array.from(U(e).connectionLookup.get(`${r}-${t}-${n ?? null}`)?.values() ?? [])
	};
}
function cy(e, t) {
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
function ly(e, t) {
	yt(t, !0);
	let n = Q(t, "store", 15), r = Q(t, "selectionKey", 3, "Shift"), i = Q(t, "multiSelectionKey", 19, () => Uh() ? "Meta" : "Control"), a = Q(t, "deleteKey", 3, "Backspace"), o = Q(t, "panActivationKey", 3, " "), s = Q(t, "zoomActivationKey", 19, () => Uh() ? "Meta" : "Control"), { deleteElements: c } = sy();
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
	Yi("blur", Sr, p), Yi("contextmenu", Sr, p), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !0, !0)),
		type: "keydown"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(i(), () => {
			n(n().multiselectionKeyPressed = !0, !0);
		}),
		type: "keydown"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(i(), () => n(n().multiselectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(a(), (e) => {
			!(e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) && !ng(e.originalEvent) && (n(n().deleteKeyPressed = !0, !0), m());
		}),
		type: "keydown"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(a(), () => n(n().deleteKeyPressed = !1, !0)),
		type: "keyup"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Da(Sr, (e, t) => oy?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/ConnectionLine/ConnectionLine.svelte
var uy = /* @__PURE__ */ aa("<path fill=\"none\" class=\"svelte-flow__connection-path\"></path>"), dy = /* @__PURE__ */ aa("<svg class=\"svelte-flow__connectionline\"><g><!></g></svg>");
function fy(e, t) {
	yt(t, !0);
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
			case ih.Bezier: {
				let [t] = lg(e);
				return t;
			}
			case ih.Straight: {
				let [t] = gg(e);
				return t;
			}
			case ih.Step:
			case ih.SmoothStep: {
				let [n] = Sg({
					...e,
					borderRadius: t.type === ih.Step ? 0 : void 0
				});
				return n;
			}
		}
	});
	var r = sa(), i = z(r), a = (e) => {
		var r = dy(), i = R(r), a = R(i), o = (e) => {
			var n = sa();
			Ea(z(n), () => t.LineComponent, (e, t) => {
				t(e, {});
			}), q(e, n);
		}, s = (e) => {
			var r = uy();
			H(() => {
				to(r, "d", U(n)), Ra(r, t.style);
			}), q(e, r);
		};
		Y(a, (e) => {
			t.LineComponent ? e(o) : e(s, -1);
		}), P(i), P(r), H((e) => {
			to(r, "width", t.store.width), to(r, "height", t.store.height), Ra(r, t.containerStyle), Z(i, 0, e);
		}, [() => ja(["svelte-flow__connection", Zh(t.store.connection.isValid)])]), q(e, r);
	};
	Y(i, (e) => {
		t.store.connection.inProgress && e(a);
	}), q(e, r), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Panel/Panel.svelte
var py = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"style",
	"class",
	"children"
]), my = /* @__PURE__ */ K("<div><!></div>");
function hy(e, t) {
	yt(t, !0);
	let n = Q(t, "position", 3, "top-right"), r = /* @__PURE__ */ xo(t, py), i = /* @__PURE__ */ F(() => `${n()}`.split("-"));
	var a = my();
	ro(a, (e) => ({
		class: e,
		style: t.style,
		...r
	}), [() => [
		"svelte-flow__panel",
		t.class,
		...U(i)
	]]), Ta(R(a), () => t.children ?? C), P(a), q(e, a), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Attribution/Attribution.svelte
var gy = /* @__PURE__ */ K("<a target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Svelte Flow attribution\">Svelte Flow</a>");
function _y(e, t) {
	yt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = "https://svelteflow.dev?utm_source=attribution";
	Nr(() => {});
	var i = sa(), a = z(i), o = (e) => {
		{
			let t = /* @__PURE__ */ F(() => `Please only hide this attribution when you are subscribed to Svelte Flow Pro: ${r}`);
			hy(e, {
				get position() {
					return n();
				},
				class: "svelte-flow__attribution",
				get "data-message"() {
					return U(t);
				},
				children: (e, t) => {
					var n = gy();
					H(() => to(n, "href", r)), q(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	Y(a, (e) => {
		t.proOptions?.hideAttribution || e(o);
	}), q(e, i), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/Wrapper.svelte
var vy = /* @__PURE__ */ K("<div><!></div>");
function yy(e, t) {
	yt(t, !0);
	let n = Q(t, "domNode", 15), r = Q(t, "clientWidth", 15), i = Q(t, "clientHeight", 15), a = /* @__PURE__ */ F(() => t.rest.class), o = /* @__PURE__ */ F(() => d(t.rest, /* @__PURE__ */ "id.class.nodeTypes.edgeTypes.colorMode.isValidConnection.onmove.onmovestart.onmoveend.onflowerror.ondelete.onbeforedelete.onbeforeconnect.onconnect.onconnectstart.onconnectend.onbeforereconnect.onreconnect.onreconnectstart.onreconnectend.onclickconnectstart.onclickconnectend.oninit.onselectionchange.onselectiondragstart.onselectiondrag.onselectiondragstop.onselectionstart.onselectionend.clickConnect.fitView.fitViewOptions.nodeOrigin.nodeDragThreshold.connectionDragThreshold.minZoom.maxZoom.initialViewport.connectionRadius.connectionMode.selectionMode.selectNodesOnDrag.snapGrid.defaultMarkerColor.translateExtent.nodeExtent.onlyRenderVisibleElements.autoPanOnConnect.autoPanOnNodeDrag.colorModeSSR.defaultEdgeOptions.elevateNodesOnSelect.elevateEdgesOnSelect.nodesDraggable.autoPanOnNodeFocus.nodesConnectable.elementsSelectable.nodesFocusable.edgesFocusable.disableKeyboardA11y.noDragClass.noPanClass.noWheelClass.ariaLabelConfig.autoPanSpeed.panOnScrollSpeed.zIndexMode.autoPanOnSelection".split(".")));
	function s(e) {
		e.currentTarget.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto"
		}), t.rest.onscroll && t.rest.onscroll(e);
	}
	var c = vy();
	ro(c, (e) => ({
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
		[Wa]: e
	}), [() => ({
		width: X_(t.width),
		height: X_(t.height)
	})], void 0, void 0, "svelte-mkap6j"), Ta(R(c), () => t.children ?? C), P(c), ho(c, (e) => n(e), () => n()), po(c, "clientHeight", i), po(c, "clientWidth", r), q(e, c), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/SvelteFlow.svelte
var by = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.width.height.proOptions.selectionKey.deleteKey.panActivationKey.multiSelectionKey.zoomActivationKey.paneClickDistance.nodeClickDistance.onmovestart.onmoveend.onmove.oninit.onnodeclick.onnodecontextmenu.onnodedrag.onnodedragstart.onnodedragstop.onnodepointerenter.onnodepointermove.onnodepointerleave.onselectionclick.onselectioncontextmenu.onselectionstart.onselectionend.onedgeclick.onedgecontextmenu.onedgepointerenter.onedgepointerleave.onpaneclick.onpanecontextmenu.panOnScrollMode.preventScrolling.zoomOnScroll.zoomOnDoubleClick.zoomOnPinch.panOnScroll.panOnScrollSpeed.panOnDrag.selectionOnDrag.autoPanOnSelection.connectionLineComponent.connectionLineStyle.connectionLineContainerStyle.connectionLineType.attributionPosition.children.nodes.edges.viewport".split(".")), xy = /* @__PURE__ */ K("<div class=\"svelte-flow__viewport-back svelte-flow__container\"></div> <!> <div class=\"svelte-flow__edge-labels svelte-flow__container\"></div> <!> <!> <!> <div class=\"svelte-flow__viewport-front svelte-flow__container\"></div>", 1), Sy = /* @__PURE__ */ K("<!> <!>", 1), Cy = /* @__PURE__ */ K("<!> <!> <!> <!> <!>", 1);
function wy(e, t) {
	yt(t, !0);
	let n = Q(t, "paneClickDistance", 3, 1), r = Q(t, "nodeClickDistance", 3, 1), i = Q(t, "panOnScrollMode", 19, () => th.Free), a = Q(t, "preventScrolling", 3, !0), o = Q(t, "zoomOnScroll", 3, !0), s = Q(t, "zoomOnDoubleClick", 3, !0), c = Q(t, "zoomOnPinch", 3, !0), l = Q(t, "panOnScroll", 3, !1), u = Q(t, "panOnScrollSpeed", 3, .5), d = Q(t, "panOnDrag", 3, !0), f = Q(t, "selectionOnDrag", 3, !1), p = Q(t, "autoPanOnSelection", 3, !0), m = Q(t, "connectionLineType", 19, () => ih.Bezier), h = Q(t, "nodes", 31, () => lr([])), g = Q(t, "edges", 31, () => lr([])), _ = Q(t, "viewport", 15, void 0), v = /* @__PURE__ */ xo(t, by), y = Cv({
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
	}), b = gt(Sv);
	b && b.setStore && b.setStore(y), _t(Sv, {
		provider: !1,
		getStore() {
			return y;
		}
	}), Nr(() => {
		let e = {
			nodes: y.selectedNodes,
			edges: y.selectedEdges
		};
		W(() => t.onselectionchange)?.(e);
		for (let t of y.selectionChangeHandlers.values()) t(e);
	}), To(() => {
		y.reset();
	}), yy(e, {
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
			var g = Cy(), _ = z(g);
			ly(_, {
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
			Ev(v, {
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
					jv(e, {
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
							var i = Sy(), a = z(i);
							Nv(a, {
								get store() {
									return y;
								},
								set store(e) {
									y = e;
								},
								children: (e, n) => {
									var i = xy(), a = B(z(i), 2);
									ey(a, {
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
									fy(o, {
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
									Wv(s, {
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
									}), iy(B(s, 2), {
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
									}), Ge(2), q(e, i);
								},
								$$slots: { default: !0 }
							});
							var o = B(a, 2);
							{
								let e = /* @__PURE__ */ F(() => !!(y.selectionRect && y.selectionRectMode === "user")), t = /* @__PURE__ */ F(() => y.selectionRect?.width), n = /* @__PURE__ */ F(() => y.selectionRect?.height), r = /* @__PURE__ */ F(() => y.selectionRect?.x), i = /* @__PURE__ */ F(() => y.selectionRect?.y);
								ny(o, {
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
			_y(b, {
				get proOptions() {
					return t.proOptions;
				},
				get position() {
					return t.attributionPosition;
				}
			});
			var x = B(b, 2);
			Lv(x, { get store() {
				return y;
			} }), Ta(B(x, 2), () => t.children ?? C), q(e, g);
		},
		$$slots: { default: !0 }
	}), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/ControlButton.svelte
var Ty = /* @__PURE__ */ new Set([
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
]), Ey = /* @__PURE__ */ K("<button><!></button>");
function Dy(e, t) {
	let n = /* @__PURE__ */ xo(t, Ty);
	var r = Ey();
	ro(r, () => ({
		type: "button",
		onclick: t.onclick,
		class: ["svelte-flow__controls-button", t.class],
		...n,
		[Wa]: {
			"--xy-controls-button-background-color-props": t.bgColor,
			"--xy-controls-button-background-color-hover-props": t.bgColorHover,
			"--xy-controls-button-color-props": t.color,
			"--xy-controls-button-color-hover-props": t.colorHover,
			"--xy-controls-button-border-color-props": t.borderColor
		}
	})), Ta(R(r), () => t.children ?? C), P(r), q(e, r);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Plus.svelte
var Oy = /* @__PURE__ */ aa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z\"></path></svg>");
function ky(e) {
	q(e, Oy());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Minus.svelte
var Ay = /* @__PURE__ */ aa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 5\"><path d=\"M0 0h32v4.2H0z\"></path></svg>");
function jy(e) {
	q(e, Ay());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Fit.svelte
var My = /* @__PURE__ */ aa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 30\"><path d=\"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z\"></path></svg>");
function Ny(e) {
	q(e, My());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Lock.svelte
var Py = /* @__PURE__ */ aa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z\"></path></svg>");
function Fy(e) {
	q(e, Py());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Unlock.svelte
var Iy = /* @__PURE__ */ aa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z\"></path></svg>");
function Ly(e) {
	q(e, Iy());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Controls.svelte
var Ry = /* @__PURE__ */ new Set([
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
]), zy = /* @__PURE__ */ K("<!> <!>", 1), By = /* @__PURE__ */ K("<!> <!> <!> <!> <!> <!>", 1);
function Vy(e, t) {
	yt(t, !0);
	let n = Q(t, "position", 3, "bottom-left"), r = Q(t, "orientation", 3, "vertical"), i = Q(t, "showZoom", 3, !0), a = Q(t, "showFitView", 3, !0), o = Q(t, "showLock", 3, !0), s = /* @__PURE__ */ xo(t, Ry), c = /* @__PURE__ */ F(xv), l = /* @__PURE__ */ F(() => ({
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
		hy(e, Co({
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
				var r = By(), s = z(r), c = (e) => {
					var n = sa();
					Ta(z(n), () => t.before), q(e, n);
				};
				Y(s, (e) => {
					t.before && e(c);
				});
				var m = B(s, 2), y = (e) => {
					var t = zy(), n = z(t);
					Dy(n, Co({
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
							ky(e, {});
						},
						$$slots: { default: !0 }
					})), Dy(B(n, 2), Co({
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
							jy(e, {});
						},
						$$slots: { default: !0 }
					})), q(e, t);
				};
				Y(m, (e) => {
					i() && e(y);
				});
				var b = B(m, 2), x = (e) => {
					Dy(e, Co({
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
							Ny(e, {});
						},
						$$slots: { default: !0 }
					}));
				};
				Y(b, (e) => {
					a() && e(x);
				});
				var S = B(b, 2), C = (e) => {
					Dy(e, Co({
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
							var n = sa(), r = z(n), i = (e) => {
								Ly(e, {});
							}, a = (e) => {
								Fy(e, {});
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
					var n = sa();
					Ta(z(n), () => t.children), q(e, n);
				};
				Y(w, (e) => {
					t.children && e(T);
				});
				var E = B(w, 2), D = (e) => {
					var n = sa();
					Ta(z(n), () => t.after), q(e, n);
				};
				Y(E, (e) => {
					t.after && e(D);
				}), q(e, r);
			},
			$$slots: { default: !0 }
		}));
	}
	bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/types.js
var Hy;
(function(e) {
	e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Hy ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/DotPattern.svelte
var Uy = /* @__PURE__ */ aa("<circle></circle>");
function Wy(e, t) {
	var n = Uy();
	H(() => {
		to(n, "cx", t.radius), to(n, "cy", t.radius), to(n, "r", t.radius), Z(n, 0, ja([
			"svelte-flow__background-pattern",
			"dots",
			t.class
		]));
	}), q(e, n);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/LinePattern.svelte
var Gy = /* @__PURE__ */ aa("<path></path>");
function Ky(e, t) {
	yt(t, !0);
	var n = Gy();
	H(() => {
		to(n, "stroke-width", t.lineWidth), to(n, "d", `M${t.dimensions[0] / 2} 0 V${t.dimensions[1]} M0 ${t.dimensions[1] / 2} H${t.dimensions[0]}`), Z(n, 0, ja([
			"svelte-flow__background-pattern",
			t.variant,
			t.class
		]));
	}), q(e, n), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/Background.svelte
var qy = {
	[Hy.Dots]: 1,
	[Hy.Lines]: 1,
	[Hy.Cross]: 6
}, Jy = /* @__PURE__ */ aa("<svg data-testid=\"svelte-flow__background\"><pattern patternUnits=\"userSpaceOnUse\"><!></pattern><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"></rect></svg>");
function Yy(e, t) {
	yt(t, !0);
	let n = Q(t, "variant", 19, () => Hy.Dots), r = Q(t, "gap", 3, 20), i = Q(t, "lineWidth", 3, 1), a = /* @__PURE__ */ F(xv), o = /* @__PURE__ */ F(() => n() === Hy.Dots), s = /* @__PURE__ */ F(() => n() === Hy.Cross), c = /* @__PURE__ */ F(() => Array.isArray(r()) ? r() : [r(), r()]), l = /* @__PURE__ */ F(() => `background-pattern-${U(a).flowId}-${t.id ?? ""}`), u = /* @__PURE__ */ F(() => [U(c)[0] * U(a).viewport.zoom || 1, U(c)[1] * U(a).viewport.zoom || 1]), d = /* @__PURE__ */ F(() => (t.size ?? qy[n()]) * U(a).viewport.zoom), f = /* @__PURE__ */ F(() => U(s) ? [U(d), U(d)] : U(u)), p = /* @__PURE__ */ F(() => U(o) ? [U(d) / 2, U(d) / 2] : [U(f)[0] / 2, U(f)[1] / 2]);
	var m = Jy();
	let h;
	var g = R(m), _ = R(g), v = (e) => {
		{
			let n = /* @__PURE__ */ F(() => U(d) / 2);
			Wy(e, {
				get radius() {
					return U(n);
				},
				get class() {
					return t.patternClass;
				}
			});
		}
	}, y = (e) => {
		Ky(e, {
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
		Z(m, 0, ja([
			"svelte-flow__background",
			"svelte-flow__container",
			t.class
		])), h = Ra(m, "", h, {
			"--xy-background-color-props": t.bgColor,
			"--xy-background-pattern-color-props": t.patternColor
		}), to(g, "id", U(l)), to(g, "x", U(a).viewport.x % U(u)[0]), to(g, "y", U(a).viewport.y % U(u)[1]), to(g, "width", U(u)[0]), to(g, "height", U(u)[1]), to(g, "patternTransform", `translate(-${U(p)[0]},-${U(p)[1]})`), to(b, "fill", `url(#${U(l)})`);
	}), q(e, m), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useInternalNode.svelte.js
function Xy(e) {
	let t = /* @__PURE__ */ F(xv), n = /* @__PURE__ */ F(() => U(t).nodeLookup), r = /* @__PURE__ */ F(() => U(t).nodes), i = /* @__PURE__ */ F(() => (U(r), U(n).get(e)));
	return { get current() {
		return U(i);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/MinimapNode.svelte
var Zy = /* @__PURE__ */ aa("<rect></rect>");
function Qy(e, t) {
	yt(t, !0);
	let n = Q(t, "borderRadius", 3, 5), r = Q(t, "strokeWidth", 3, 2), i = /* @__PURE__ */ F(() => Xy(t.id)), a = /* @__PURE__ */ F(() => {
		if (!U(i).current) return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		let { width: e, height: n } = Gh(U(i).current);
		return {
			width: t.width ?? e,
			height: t.height ?? n,
			x: t.x ?? U(i).current.internals.positionAbsolute.x,
			y: t.y ?? U(i).current.internals.positionAbsolute.y
		};
	}), o = /* @__PURE__ */ F(() => U(a).width), s = /* @__PURE__ */ F(() => U(a).height), c = /* @__PURE__ */ F(() => U(a).x), l = /* @__PURE__ */ F(() => U(a).y);
	var u = sa(), d = z(u), f = (e) => {
		let i = /* @__PURE__ */ F(() => t.nodeComponent);
		var a = sa();
		Ea(z(a), () => U(i), (e, i) => {
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
		var i = Zy();
		let a, u;
		H(() => {
			a = Z(i, 0, ja(["svelte-flow__minimap-node", t.class]), null, a, { selected: t.selected }), to(i, "x", U(c)), to(i, "y", U(l)), to(i, "rx", n()), to(i, "ry", n()), to(i, "width", U(o)), to(i, "height", U(s)), to(i, "shape-rendering", t.shapeRendering), u = Ra(i, "", u, {
				fill: t.color,
				stroke: t.strokeColor,
				"stroke-width": r()
			});
		}), q(e, i);
	};
	Y(d, (e) => {
		t.nodeComponent ? e(f) : e(p, -1);
	}), q(e, u), bt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/interactive.js
function $y(e, t) {
	let n = u_({
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
var eb = (e) => e instanceof Function ? e : () => e, tb = /* @__PURE__ */ new Set([
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
]), nb = /* @__PURE__ */ aa("<title> </title>"), rb = /* @__PURE__ */ aa("<svg class=\"svelte-flow__minimap-svg\" role=\"img\"><!><!><path class=\"svelte-flow__minimap-mask\" fill-rule=\"evenodd\" pointer-events=\"none\"></path></svg>"), ib = /* @__PURE__ */ K("<svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper>", 1);
function ab(e, t) {
	yt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = Q(t, "nodeStrokeColor", 3, "transparent"), i = Q(t, "nodeClass", 3, ""), a = Q(t, "nodeBorderRadius", 3, 5), o = Q(t, "nodeStrokeWidth", 3, 2), s = Q(t, "width", 3, 200), c = Q(t, "height", 3, 150), l = Q(t, "pannable", 3, !0), u = Q(t, "zoomable", 3, !0), d = /* @__PURE__ */ xo(t, tb), f = /* @__PURE__ */ F(xv), p = /* @__PURE__ */ F(() => U(f).ariaLabelConfig), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision", h = /* @__PURE__ */ F(() => `svelte-flow__minimap-desc-${U(f).flowId}`), g = /* @__PURE__ */ F(() => ({
		x: -U(f).viewport.x / U(f).viewport.zoom,
		y: -U(f).viewport.y / U(f).viewport.zoom,
		width: U(f).width / U(f).viewport.zoom,
		height: U(f).height / U(f).viewport.zoom
	})), _ = /* @__PURE__ */ F(() => U(f).nodes.some((e) => !e.hidden)), v = /* @__PURE__ */ F(() => U(_) ? Ah(ph(U(f).nodeLookup, { filter: (e) => !e.hidden }), U(g)) : U(g)), y = /* @__PURE__ */ F(() => U(v).width / s()), b = /* @__PURE__ */ F(() => U(v).height / c()), x = /* @__PURE__ */ F(() => Math.max(U(y), U(b))), S = /* @__PURE__ */ F(() => U(x) * s()), C = /* @__PURE__ */ F(() => U(x) * c()), w = /* @__PURE__ */ F(() => 5 * U(x)), T = /* @__PURE__ */ F(() => U(v).x - (U(S) - U(v).width) / 2 - U(w)), E = /* @__PURE__ */ F(() => U(v).y - (U(C) - U(v).height) / 2 - U(w)), D = /* @__PURE__ */ F(() => U(S) + U(w) * 2), O = /* @__PURE__ */ F(() => U(C) + U(w) * 2), k = () => U(x);
	var A = ib(), j = z(A);
	{
		let e = /* @__PURE__ */ F(() => ["svelte-flow__minimap", t.class]);
		ha(j, () => ({ "--xy-minimap-background-color-props": t.bgColor })), hy(j.lastChild, Co({
			get position() {
				return n();
			},
			get class() {
				return U(e);
			},
			"data-testid": "svelte-flow__minimap"
		}, () => d, {
			children: (e, n) => {
				var d = sa(), _ = z(d), v = (e) => {
					var n = rb();
					let d;
					var _ = R(n), v = (e) => {
						var n = nb(), r = R(n, !0);
						P(n), H(() => {
							to(n, "id", U(h)), J(r, t.ariaLabel ?? U(p)["minimap.ariaLabel"]);
						}), q(e, n);
					};
					Y(_, (e) => {
						(t.ariaLabel ?? U(p)["minimap.ariaLabel"]) && e(v);
					});
					var y = B(_);
					X(y, 17, () => U(f).nodes, (e) => e.id, (e, n) => {
						let s = /* @__PURE__ */ F(() => U(f).nodeLookup.get(U(n).id));
						var c = sa(), l = z(c), u = (e) => {
							{
								let c = /* @__PURE__ */ F(() => t.nodeColor === void 0 ? void 0 : eb(t.nodeColor)(U(n))), l = /* @__PURE__ */ F(() => eb(r())(U(n))), u = /* @__PURE__ */ F(() => eb(i())(U(n)));
								Qy(e, {
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
						}, d = /* @__PURE__ */ F(() => U(s) && Kh(U(s)) && !U(s).hidden);
						Y(l, (e) => {
							U(d) && e(u);
						}), q(e, c);
					});
					var b = B(y);
					P(n), Da(n, (e, t) => $y?.(e, t), () => ({
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
						to(n, "width", s()), to(n, "height", c()), to(n, "viewBox", `${U(T) ?? ""} ${U(E) ?? ""} ${U(D) ?? ""} ${U(O) ?? ""}`), to(n, "aria-labelledby", U(h)), d = Ra(n, "", d, {
							"--xy-minimap-mask-background-color-props": t.maskColor,
							"--xy-minimap-mask-stroke-color-props": t.maskStrokeColor,
							"--xy-minimap-mask-stroke-width-props": t.maskStrokeWidth ? t.maskStrokeWidth * U(x) : void 0
						}), to(b, "d", `M${U(T) - U(w)},${U(E) - U(w)}h${U(D) + U(w) * 2}v${U(O) + U(w) * 2}h${-U(D) - U(w) * 2}z
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
	q(e, A), bt();
}
//#endregion
//#region src/ui/CampaignFlow.svelte
Ho();
var ob = /* @__PURE__ */ K("<button class=\"outline-button compact\">Load older history</button>"), sb = /* @__PURE__ */ K("<button class=\"outline-button compact\">Retry</button>"), cb = /* @__PURE__ */ K("<div class=\"history-load-status\" aria-live=\"polite\"><span> </span> <!> <!></div>"), lb = /* @__PURE__ */ K("<div class=\"wave-aggregate-strip\" aria-label=\"Current multi-lane wave aggregate\"><span><b>WAVE AGGREGATE</b><strong> </strong></span> <span><b>FIXED MEMBERS</b><strong> </strong></span> <span><b>ACCOUNTED</b><strong> </strong></span> <span><b>ACTIVE</b><strong> </strong></span> <i>PROJECTION ONLY</i></div>"), ub = /* @__PURE__ */ K("<article><div><b> </b><span> </span></div> <strong> </strong> <p> </p> <small> </small></article>"), db = /* @__PURE__ */ K("<details class=\"wave-repair-plan\" aria-label=\"Historical wave projection diagnosis\"><summary><span><b>ACCOUNTING GAP</b><strong> </strong></span> <i> </i></summary> <div class=\"wave-repair-body\"><p> </p> <!> <footer><b>NO WRITE AUTHORITY</b><span>This diagnosis cannot sync state, reconcile custody, revive a worker, dispatch a lane, or change campaign phase.</span></footer></div></details>"), fb = /* @__PURE__ */ K("<div class=\"replay-toolbar\" aria-label=\"Campaign replay controls\"><div class=\"replay-buttons\"><button aria-label=\"First milestone\">↤</button> <button aria-label=\"Previous milestone\">←</button> <button class=\"replay-play\"> </button> <button aria-label=\"Next milestone\">→</button> <button aria-label=\"Latest milestone\">↦</button></div> <label class=\"replay-scrubber\"><span> </span><input type=\"range\" min=\"0\" aria-label=\"Replay position\"/></label> <div class=\"replay-now\"><strong> </strong><span> </span></div></div>"), pb = /* @__PURE__ */ K("<button> </button>"), mb = /* @__PURE__ */ K("<div class=\"history-filters\" aria-label=\"History filters\"></div>"), hb = /* @__PURE__ */ K("<p> </p>"), gb = /* @__PURE__ */ K("<p class=\"program-history-message\">Building the durable hierarchy…</p>"), _b = /* @__PURE__ */ K("<div class=\"program-history-message error\"><span> </span><button class=\"outline-button compact\">Retry</button></div>"), vb = /* @__PURE__ */ K("<p class=\"program-history-message\">No strategy epochs have been recorded for this project.</p>"), yb = /* @__PURE__ */ K("<p>No baseline snapshot is available for this historical epoch.</p>"), bb = /* @__PURE__ */ K("<div class=\"boundary-row\" role=\"row\"><span><small> </small><strong> </strong></span><code> </code><code> </code></div>"), xb = /* @__PURE__ */ K("<div class=\"boundary-table\" role=\"table\" aria-label=\"Changed boundary values\"><div class=\"boundary-row heading\" role=\"row\"><span>GROUP / FIELD</span><span>START</span><span>END</span></div> <!></div>"), Sb = /* @__PURE__ */ K("<li><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></li>"), Cb = /* @__PURE__ */ K("<ol class=\"program-lanes\"></ol>"), wb = /* @__PURE__ */ K("<p>No durable research runs are attached to this wave.</p>"), Tb = /* @__PURE__ */ K("<ol class=\"program-custody\"></ol>"), Eb = /* @__PURE__ */ K("<details class=\"program-wave\"><summary><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></summary> <div class=\"program-wave-body\"><!> <!></div></details>"), Db = /* @__PURE__ */ K("<p class=\"program-history-message\">No waves are assigned to this epoch.</p>"), Ob = /* @__PURE__ */ K("<details class=\"program-epoch\"><summary><span><small> </small><strong> </strong></span> <span><b> </b><small> </small></span></summary> <div class=\"program-epoch-body\"><section class=\"epoch-boundary\"><header><span><small>START / END COMPARISON</small><strong> </strong></span><b> </b></header> <!></section> <div class=\"program-waves\"><!> <!></div></div></details>"), kb = /* @__PURE__ */ K("<div class=\"program-epochs\"></div> <footer> </footer>", 1), Ab = /* @__PURE__ */ K("<section class=\"program-history\" aria-label=\"Program history hierarchy\"><header><div><span>PROGRAM HISTORY · READ ONLY</span><strong>Epoch → wave → lane and custody</strong></div> <!></header> <!></section>"), jb = /* @__PURE__ */ K("<i aria-hidden=\"true\"></i>"), Mb = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button> <!>", 1), Nb = /* @__PURE__ */ K("<button><span> </span><strong> </strong><small> </small></button>"), Pb = /* @__PURE__ */ K("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><button aria-label=\"Close step details\">×</button></div> <p> </p> <details open=\"\"><summary>Authority boundary</summary><p>Moving through this stop requires the durable gate shown on the line. Observed files or worker activity cannot advance it.</p></details></aside>"), Fb = /* @__PURE__ */ K("<div class=\"flow-inspector empty\">Select a stop or branch to inspect what enters it and which gate controls the next move.</div>"), Ib = /* @__PURE__ */ K("<div class=\"campaign-map-layout journey-layout\"><div class=\"journey-board\" aria-label=\"Linear branching campaign workflow\"><div class=\"journey-line\"></div> <div class=\"journey-branches\" aria-label=\"Supporting research branches\"></div> <footer><b> </b><span> </span></footer></div> <!></div>"), Lb = /* @__PURE__ */ K("<!> <!> <!>", 1), Rb = /* @__PURE__ */ K("<button aria-label=\"Close step details\">×</button>"), zb = /* @__PURE__ */ K("<details open=\"\"><summary>Recorded payload</summary><pre> </pre></details>"), Bb = /* @__PURE__ */ K("<li><span> </span><strong> </strong></li>"), Vb = /* @__PURE__ */ K("<details><summary>Related substeps <strong> </strong></summary><ol></ol></details>"), Hb = /* @__PURE__ */ K("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><!></div> <p> </p> <!> <!></aside>"), Ub = /* @__PURE__ */ K("<div class=\"flow-inspector empty\">Select a recorded milestone to inspect its durable payload and related substeps.</div>"), Wb = /* @__PURE__ */ K("<div class=\"campaign-map-layout\"><div class=\"campaign-flow-canvas\"><!></div> <!></div>"), Gb = /* @__PURE__ */ K("<section><div class=\"campaign-map-heading\"><div><p>CAMPAIGN LINE</p><h2>One main route, with deliberate research branches</h2><span> </span></div> <div class=\"campaign-map-tabs\"><button>Workflow</button> <button>Replay</button> <button>History</button></div></div> <!> <!> <!> <!> <!> <!></section>");
function Kb(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = {
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
						type: ah.ArrowClosed,
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
					type: ah.ArrowClosed,
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
	To(De), V(() => n(), () => {
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
	}), zr(), vo();
	var Me = sa(), Ne = z(Me), Pe = (e) => {
		var t = Gb(), n = R(t), r = R(n), i = B(R(r), 2), l = R(i, !0);
		P(i), P(r);
		var u = B(r, 2), p = R(u);
		let m;
		var x = B(p, 2);
		let O;
		var k = B(x, 2);
		let A;
		P(u), P(n);
		var j = B(n, 2), ee = (e) => {
			var t = cb(), n = R(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = ob();
				G("click", t, () => be(U(g), !0)), q(e, t);
			};
			Y(i, (e) => {
				U(M) && !U(N) && e(a);
			});
			var o = B(i, 2), s = (e) => {
				var t = sb();
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
			var t = lb(), n = R(t), r = B(R(n)), i = R(r, !0);
			P(r), P(n);
			var o = B(n, 2), s = B(R(o)), c = R(s, !0);
			P(s), P(o);
			var l = B(o, 2), u = B(R(l)), d = R(u);
			P(u), P(l);
			var f = B(l, 2), p = B(R(f)), m = R(p, !0);
			P(p), P(f), Ge(2), P(t), H((e) => {
				J(i, e), J(c, (U(a), W(() => U(a).membership.count))), J(d, `${U(a), W(() => U(a).accounting.accounted) ?? ""}/${U(a), W(() => U(a).accounting.total) ?? ""}`), J(m, (U(a), W(() => U(a).parallelism.active)));
			}, [() => (U(a), W(() => U(a).state.replaceAll("_", " ")))]), q(e, t);
		};
		Y(ne, (e) => {
			U(a) && e(re);
		});
		var ae = B(ne, 2), ce = (e) => {
			var t = db(), n = R(t), r = R(n), i = B(R(r)), o = R(i);
			P(i), P(r);
			var s = B(r, 2), c = R(s, !0);
			P(s), P(n);
			var l = B(n, 2), u = R(l), d = R(u, !0);
			P(u), X(B(u, 2), 1, () => (U(a), W(() => U(a).repairPlan.items)), (e) => e.laneId, (e, t) => {
				var n = ub(), r = R(n), i = R(r), a = R(i, !0);
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
			}), Ge(2), P(l), P(t), H((e) => {
				J(o, `${U(a), W(() => U(a).repairPlan.items.length) ?? ""} historical member${U(a), W(() => U(a).repairPlan.items.length === 1 ? "" : "s") ?? ""} need evidence`), J(c, e), J(d, (U(a), W(() => U(a).repairPlan.summary)));
			}, [() => (U(a), W(() => U(a).repairPlan.status.replaceAll("_", " ")))]), q(e, t);
		};
		Y(ae, (e) => {
			U(a), W(() => U(a)?.repairPlan?.items?.length) && e(ce);
		});
		var le = B(ae, 2), de = (e) => {
			var t = fb(), n = R(t), r = R(n), i = B(r, 2), a = B(i, 2), o = R(a, !0);
			P(a);
			var s = B(a, 2), c = B(s, 2);
			P(n);
			var l = B(n, 2), u = R(l), d = R(u);
			P(u);
			var f = B(u);
			Qa(f), P(l);
			var p = B(l, 2), m = R(p), h = R(m, !0);
			P(m);
			var g = B(m), _ = R(g, !0);
			P(g), P(p), P(t), H((e, t, n) => {
				r.disabled = (U(w), U(T), W(() => !U(w).length || U(T) === 0)), i.disabled = (U(w), U(T), W(() => !U(w).length || U(T) === 0)), a.disabled = (U(w), W(() => U(w).length < 2)), J(o, U(D) ? "Pause" : "Play"), s.disabled = (U(w), U(T), W(() => !U(w).length || U(T) >= U(w).length - 1)), c.disabled = (U(w), U(T), W(() => !U(w).length || U(T) >= U(w).length - 1)), J(d, `${U(w), U(T), W(() => U(w).length ? U(T) + 1 : 0) ?? ""} / ${U(w), W(() => U(w).length) ?? ""}`), to(f, "max", e), $a(f, U(T)), J(h, t), J(_, n);
			}, [
				() => (U(w), W(() => Math.max(0, U(w).length - 1))),
				() => (U(E), W(() => U(E) ? ue(U(E).type) : "No recorded milestones")),
				() => (U(E), W(() => U(E) ? new Date(U(E).createdAt).toLocaleString() : ""))
			]), G("click", r, () => Oe(0)), G("click", i, () => Oe(U(T) - 1)), G("click", a, ke), G("click", s, () => Oe(U(T) + 1)), G("click", c, () => Oe(U(w).length - 1)), G("input", f, (e) => Oe(Number(e.currentTarget.value))), q(e, t);
		}, fe = (e) => {
			var t = mb();
			X(t, 5, () => h, ga, (e, t) => {
				var n = pb();
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
			var t = Ab(), n = R(t), r = B(R(n), 2), i = (e) => {
				var t = hb(), n = R(t);
				P(t), H(() => J(n, `${U(ie), W(() => U(ie).counts.epochs) ?? ""} epochs · ${U(ie), W(() => U(ie).counts.waves) ?? ""} waves · ${U(ie), W(() => U(ie).counts.lanes) ?? ""} lanes · ${U(ie), W(() => U(ie).counts.custody) ?? ""} custody`)), q(e, t);
			};
			Y(r, (e) => {
				U(ie) && e(i);
			}), P(n);
			var a = B(n, 2), o = (e) => {
				q(e, gb());
			}, s = (e) => {
				var t = _b(), n = R(t), r = R(n, !0);
				P(n);
				var i = B(n);
				P(t), H(() => J(r, U(se))), G("click", i, () => xe(U(g))), q(e, t);
			}, c = (e) => {
				q(e, vb());
			}, l = (e) => {
				var t = kb(), n = z(t);
				X(n, 7, () => (U(ie), W(() => U(ie).epochs)), (e) => e.id, (e, t, n) => {
					var r = Ob(), i = R(r), a = R(i), o = R(a), s = R(o);
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
						q(e, yb());
					}, T = (e) => {
						var n = hb(), r = R(n, !0);
						P(n), H(() => J(r, (U(t), W(() => U(t).boundary.complete ? "The recorded boundary values are unchanged." : "Only the current baseline is available; no completed end boundary has been recorded.")))), q(e, n);
					}, E = /* @__PURE__ */ F(() => (U(t), W(() => !Se(U(t)).length))), D = (e) => {
						var n = xb();
						X(B(R(n), 2), 1, () => (U(t), W(() => Se(U(t)))), (e) => `${e.group}:${e.item.key}`, (e, t) => {
							var n = bb(), r = R(n), i = R(r), a = R(i, !0);
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
						var n = Eb(), r = R(n), i = R(r), a = R(i), o = R(a);
						P(a);
						var s = B(a), c = R(s, !0);
						P(s), P(i);
						var l = B(i), u = R(l), d = R(u, !0);
						P(u);
						var f = B(u), p = R(f);
						P(f), P(l), P(r);
						var m = B(r, 2), h = R(m), g = (e) => {
							var n = Cb();
							X(n, 5, () => (U(t), W(() => U(t).lanes)), (e) => e.id, (e, t) => {
								var n = Sb(), r = R(n), i = R(r), a = R(i, !0);
								P(i);
								var o = B(i), s = R(o, !0);
								P(o), P(r);
								var c = B(r), l = R(c), u = R(l, !0);
								P(l);
								var d = B(l), f = R(d, !0);
								P(d), P(c), P(n), H((e, n) => {
									J(a, (U(t), W(() => U(t).profile || "research"))), J(s, (U(t), W(() => U(t).taskId || U(t).id))), J(u, e), J(f, n);
								}, [() => (U(t), W(() => U(t).status.replaceAll("_", " "))), () => (U(t), W(() => U(t).tokens === null ? "unmeasured" : `${U(t).tokens.toLocaleString()} tokens`))]), q(e, n);
							}), P(n), H(() => to(n, "aria-label", (U(t), W(() => `Research lanes in ${U(t).label || U(t).id}`)))), q(e, n);
						}, _ = (e) => {
							q(e, wb());
						};
						Y(h, (e) => {
							U(t), W(() => U(t).lanes.length) ? e(g) : e(_, -1);
						});
						var v = B(h, 2), y = (e) => {
							var n = Tb();
							X(n, 5, () => (U(t), W(() => U(t).custody)), (e) => e.id, (e, t) => {
								var n = Sb(), r = R(n), i = R(r), a = R(i, !0);
								P(i);
								var o = B(i), s = R(o, !0);
								P(o), P(r);
								var c = B(r), l = R(c), u = R(l, !0);
								P(l);
								var d = B(l), f = R(d);
								P(d), P(c), P(n), H((e) => {
									J(a, (U(t), W(() => U(t).sourceType))), J(s, (U(t), W(() => U(t).task))), J(u, e), J(f, `${U(t), W(() => U(t).leases.length) ?? ""} lease${U(t), W(() => U(t).leases.length === 1 ? "" : "s") ?? ""}`);
								}, [() => (U(t), W(() => U(t).status.replaceAll("_", " ")))]), q(e, n);
							}), P(n), H(() => to(n, "aria-label", (U(t), W(() => `Custody work in ${U(t).label || U(t).id}`)))), q(e, n);
						};
						Y(v, (e) => {
							U(t), W(() => U(t).custody.length) && e(y);
						}), P(m), P(n), H((e, n) => {
							J(o, `WAVE · ${e ?? ""}`), J(c, (U(t), W(() => U(t).label || U(t).id))), J(d, n), J(p, `${U(t), W(() => U(t).lanes.length) ?? ""} lanes · ${U(t), W(() => U(t).custody.length) ?? ""} custody`);
						}, [() => (U(t), W(() => U(t).assignment.basis.replaceAll("-", " "))), () => (U(t), W(() => U(t).phase.replaceAll("_", " ")))]), q(e, n);
					});
					var A = B(k, 2), j = (e) => {
						q(e, Db());
					};
					Y(A, (e) => {
						U(t), W(() => !U(t).waves.length) && e(j);
					}), P(O), P(h), P(r), H((e, i, a, o) => {
						r.open = (xi(U(n)), U(ie), W(() => U(n) === U(ie).epochs.length - 1)), J(s, `EPOCH ${U(n) + 1} · CHARTER R${U(t), W(() => U(t).charterRevision) ?? ""}`), J(l, (U(t), W(() => U(t).label))), J(f, e), J(m, `${i ?? ""} → ${a ?? ""}`), to(g, "aria-label", (U(t), W(() => `Boundary comparison for ${U(t).label}`))), J(b, (U(t), W(() => U(t).boundary.complete ? "Completed epoch boundary" : "Current boundary projection"))), J(S, `${o ?? ""} changed`);
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
			var t = Ib(), n = R(t), r = R(n);
			X(r, 7, () => d, (e) => e.id, (e, t, n) => {
				var r = Mb(), i = z(r);
				let a;
				var l = R(i), u = R(l);
				P(l);
				var f = B(l), p = R(f, !0);
				P(f);
				var m = B(f), h = R(m, !0);
				P(m), P(i);
				var _ = B(i, 2), v = (e) => {
					var t = jb();
					let r;
					H(() => r = Z(t, 1, "journey-link", null, r, { active: U(n) === U(s) })), q(e, t);
				};
				Y(_, (e) => {
					xi(U(n)), W(() => U(n) < d.length - 1) && e(v);
				}), H((e) => {
					a = Z(i, 1, "journey-stop", null, a, {
						current: U(t).id === U(o),
						visited: U(n) < U(s)
					}), J(u, `${U(t), W(() => U(t).order) ?? ""} · ${U(t), W(() => U(t).kicker) ?? ""}`), J(p, (U(t), W(() => U(t).title))), J(h, e);
				}, [() => (U(t), U(o), U(g), U(c), W(() => U(t).id === U(o) ? U(g).phase.replaceAll("_", " ") : U(t).id === "intake" ? `${U(c)} packet${U(c) === 1 ? "" : "s"} staged` : "explicit gate"))]), G("click", i, () => ge(U(t), U(t).id === U(o) ? U(g).phase : U(t).id === "intake" ? `${U(c)} staged` : "gated")), q(e, r);
			}), P(r);
			var i = B(r, 2);
			X(i, 5, () => f, (e) => e.id, (e, t) => {
				var n = Nb(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H(() => {
					Z(n, 1, `journey-branch branch-${U(t), W(() => U(t).id) ?? ""}`), Ra(n, (U(t), W(() => `--branch-column:${U(t).column}`))), J(i, (U(t), W(() => U(t).kicker))), J(o, (U(t), W(() => U(t).title))), J(c, (U(t), W(() => U(t).detail)));
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
				var t = Pb(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o, !0);
				P(o), P(r);
				var c = B(r);
				P(n);
				var l = B(n, 2), u = R(l, !0);
				P(l), Ge(2), P(t), H(() => {
					J(a, (U(b), W(() => U(b).data.kicker))), J(s, (U(b), W(() => U(b).data.title))), J(u, (U(b), W(() => U(b).data.detail)));
				}), G("click", c, () => L(y, null)), q(e, t);
			}, v = (e) => {
				q(e, Fb());
			};
			Y(h, (e) => {
				U(b) ? e(_) : e(v, -1);
			}), P(t), H(() => {
				Ra(r, `--current-stage:${U(s)}`), J(u, (U(g), W(() => U(g).controlState?.recovery?.required ? "CONTROL HOLD" : "GATES ENFORCED"))), J(m, (U(g), W(() => U(g).controlState?.recovery?.required ? "New packets can be received and hashed, but the main line cannot advance until the historical boundary is reviewed." : "Branches rejoin the main line through normal planning, custody, and decision gates.")));
			}), q(e, t);
		}, Te = (e) => {
			var t = Wb(), n = R(t);
			ma(R(n), () => (U(_), U(v), U(S), U(g), W(() => `${U(_)}-${U(v)}-${U(S)}-${U(g).id}`)), (e) => {
				{
					let t = /* @__PURE__ */ Sn(() => ({
						padding: U(S) ? .06 : .14,
						maxZoom: U(S) ? .74 : .88
					}));
					wy(e, {
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
							var n = Lb(), r = z(n);
							Yy(r, {
								patternColor: "#385043",
								gap: 22,
								size: 1,
								get variant() {
									return xi(Hy), W(() => Hy.Dots);
								}
							});
							var i = B(r, 2);
							Vy(i, { showLock: !1 }), ab(B(i, 2), {
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
				var t = Hb(), n = R(t), r = R(n), i = R(r), a = R(i, !0);
				P(i);
				var o = B(i), s = R(o, !0);
				P(o), P(r);
				var c = B(r), l = (e) => {
					var t = Rb();
					G("click", t, () => L(y, null)), q(e, t);
				};
				Y(c, (e) => {
					U(y) && e(l);
				}), P(n);
				var u = B(n, 2), d = R(u, !0);
				P(u);
				var f = B(u, 2), p = (e) => {
					var t = zb(), n = B(R(t)), r = R(n, !0);
					P(n), P(t), H((e) => J(r, e), [() => (U(b), W(() => JSON.stringify(U(b).data.payload, null, 2)))]), q(e, t);
				};
				Y(f, (e) => {
					U(b), W(() => U(b).data.payload) && e(p);
				});
				var m = B(f, 2), h = (e) => {
					var t = Vb(), n = R(t), r = B(R(n)), i = R(r, !0);
					P(r), P(n);
					var a = B(n);
					X(a, 5, () => (U(b), W(() => U(b).data.substeps)), (e) => e.id, (e, t) => {
						var n = Bb(), r = R(n), i = R(r, !0);
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
				q(e, Ub());
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
	}), _o("innerWidth", (e) => L(x, e)), q(e, Me), bt(), i();
}
//#endregion
//#region src/ui/LoopControl.svelte
Xi(["click", "input"]), Ho();
var qb = /* @__PURE__ */ K("<div class=\"loop-error\" role=\"alert\"><strong>Paused safely</strong><span> </span></div>"), Jb = /* @__PURE__ */ K("<p> </p>"), Yb = /* @__PURE__ */ K("<div class=\"loop-resolution\"><span> </span> <strong> </strong> <!></div>"), Xb = /* @__PURE__ */ K("<div class=\"loop-resolution\"><span>REQUIRED BEFORE AUTOPILOT CAN CONTINUE</span> <strong> </strong> <p> </p></div>"), Zb = /* @__PURE__ */ K("<li><b> </b><div><strong> </strong><span> </span><p> </p></div><i> </i></li>"), Qb = /* @__PURE__ */ K("<li><strong> </strong><span> </span></li>"), $b = /* @__PURE__ */ K("<details class=\"schedule-deferred\"><summary>Deferred candidates <strong> </strong></summary><ul></ul></details>"), ex = /* @__PURE__ */ K("<details class=\"scheduled-wave\"><summary><span> </span><strong> </strong></summary> <div class=\"scheduled-wave-body\"><div class=\"schedule-budget\"><span><b> </b> tokens reserved</span><span><b> </b> available slots</span><span><b> </b> schedule state</span></div> <ol></ol> <!> <footer><b> </b><span> </span></footer></div></details>"), tx = /* @__PURE__ */ K("<button class=\"outline-button compact\">Stop & capture here</button>"), nx = /* @__PURE__ */ K("<button class=\"primary-button compact\">Return to custody action</button> <!>", 1), rx = /* @__PURE__ */ K("<button class=\"primary-button autopilot-start-button\" disabled=\"\">▶ Start one-loop autopilot</button> <button class=\"outline-button compact autopilot-unlock-button\"> </button>", 1), ix = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button> <!>", 1), ax = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button>"), ox = /* @__PURE__ */ K("<!> <!>", 1), sx = /* @__PURE__ */ K("<button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), cx = /* @__PURE__ */ K("<button class=\"primary-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), lx = /* @__PURE__ */ K("<button class=\"primary-button\"> </button>"), ux = /* @__PURE__ */ K("<div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div>"), dx = /* @__PURE__ */ K("<div class=\"loop-boundary pending\"><span>END · PENDING</span><strong> </strong></div>"), fx = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small></div></li>"), px = /* @__PURE__ */ K("<ol class=\"loop-context-steps\"></ol>"), mx = /* @__PURE__ */ K("<div role=\"status\"><span> </span></div>"), hx = /* @__PURE__ */ K("<section id=\"loop-control\" aria-live=\"polite\"><div class=\"loop-control-heading\"><div><p class=\"eyebrow\">ONE-LOOP AUTOPILOT</p> <h3> </h3> <p> </p></div> <span> </span></div> <!> <!> <!> <!> <div class=\"loop-control-row\"><div class=\"loop-now\"><span> </span> <strong> </strong></div> <div class=\"loop-buttons\"><!></div></div> <details class=\"loop-context\"><summary>Loop record & step ledger <strong> </strong></summary> <div class=\"loop-boundaries\"><div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div> <!></div> <!></details> <!></section>");
function gx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(), p = /* @__PURE__ */ I(), m = /* @__PURE__ */ I(), h = /* @__PURE__ */ I(), g = /* @__PURE__ */ I(), _ = /* @__PURE__ */ I(), v = /* @__PURE__ */ I(), y = /* @__PURE__ */ I(), b = /* @__PURE__ */ I(), x = /* @__PURE__ */ I(), S = /* @__PURE__ */ I(), C = /* @__PURE__ */ I(), w = /* @__PURE__ */ I(null), T = /* @__PURE__ */ I(""), E = /* @__PURE__ */ I(""), D = /* @__PURE__ */ I("pending"), O = {
		SYNTHESIS_READY: "results ready",
		SYNTHESIZING: "synthesizing situation",
		DECISION_REQUIRED: "direction decision",
		RESEARCH_REVIEW: "wave planning",
		RESEARCH_READY: "human launch gate",
		RESEARCH_RUNNING: "wave out",
		RESEARCH_INTAKE: "landing and intake",
		NEXT_WAVE_READY: "next wave ready",
		PLANNING: "planning"
	}, k = {
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
	function A(e = "PLANNING") {
		return O[e] || e.toLowerCase().replaceAll("_", " ");
	}
	function j(e) {
		if (!e) return "Pending";
		let t = new Date(e);
		return Number.isFinite(t.getTime()) ? t.toLocaleString() : "Pending";
	}
	function ee(e) {
		let t = e?.runCounts || {}, n = Number(t.returned_to_sol || 0) + Number(t.evidence_ready || 0);
		return e?.latestRun?.taskId ? `${e.latestRun.taskId} · ${e.latestRun.status || "recorded"}` : `${n} landed research receipt${n === 1 ? "" : "s"}`;
	}
	async function M(e, t = "", n = {}) {
		if (!(!U(w) || U(T))) {
			L(T, e), L(D, "pending"), L(E, k[e]?.pending || "Updating autopilot…");
			try {
				await ns({
					projectId: U(w).id,
					type: e,
					targetId: t,
					args: n,
					scope: "loop-control",
					pollLimit: e === "research.schedule.dispatch" ? 160 : 32
				}), L(D, "success"), L(E, k[e]?.completed || "Autopilot updated.");
			} catch (e) {
				L(D, "error"), L(E, e instanceof Error ? e.message : String(e));
			} finally {
				L(T, "");
			}
		}
	}
	function N() {
		document.querySelector("#operator-gate, #next-action")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	function te() {
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
		L(w, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(w), () => {
		L(a, U(w)?.loop || null);
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
	}), V(() => U(w), () => {
		L(l, U(w)?.researchRuns?.find((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || null);
	}), V(() => U(w), () => {
		L(u, U(w)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || []);
	}), V(() => U(w), () => {
		L(d, U(w)?.researchSchedule || null);
	}), V(() => U(w), () => {
		L(f, U(w)?.phase === "RESEARCH_READY");
	}), V(() => U(w), () => {
		L(p, (U(w)?.custody?.items || []).filter((e) => e.blocksResearch && !["complete", "parked"].includes(e.status)));
	}), V(() => (U(f), U(p)), () => {
		L(m, U(f) && U(p).length > 0);
	}), V(() => U(d), () => {
		L(h, !!(U(d) && [
			"completed",
			"failed",
			"superseded"
		].includes(U(d).status)));
	}), V(() => (U(f), U(m), U(d), U(h)), () => {
		L(g, U(f) && !U(m) && (!U(d) || U(h)));
	}), V(() => (U(d), U(h), U(w)), () => {
		L(_, !!(U(d) && !U(h) && [
			"RESEARCH_READY",
			"RESEARCH_RUNNING",
			"RESEARCH_INTAKE",
			"SYNTHESIZING"
		].includes(U(w)?.phase || "")));
	}), V(() => (U(w), U(o), U(f), U(d)), () => {
		L(v, !!(U(w) && !U(o) && !U(w).canStartLoop && U(w).loopStart?.blocker && !(U(f) && U(d) && ["proposed", "confirmed"].includes(U(d).status))));
	}), V(() => U(w), () => {
		L(y, U(w)?.strategy?.workspace?.activeReview?.status === "drafted" ? U(w).strategy.workspace.activeReview.response?.proposal : null);
	}), V(() => (U(v), U(f), U(d), U(a)), () => {
		L(b, U(v) ? "PREFLIGHT BLOCKED" : U(f) && U(d)?.status === "proposed" ? "CONFIRM WAVE" : U(f) && U(d)?.status === "confirmed" ? "WAVE RESERVED" : {
			running: "RUNNING",
			paused: "PAUSED",
			attention: "NEEDS ATTENTION",
			completed: "LOOP COMPLETE",
			stopped: "STOPPED"
		}[U(a)?.status || ""] || "READY");
	}), V(() => (U(v), U(f), U(d), U(a)), () => {
		L(x, U(v) || U(f) && U(d)?.status === "proposed" ? "attention" : U(f) && U(d)?.status === "confirmed" ? "paused" : U(a)?.status === "attention" ? "attention" : U(a)?.status === "completed" ? "complete" : U(a)?.status || "ready");
	}), V(() => U(w), () => {
		L(S, U(w)?.researchPlan?.response?.operatorGuidance || U(w)?.wave?.synthesis?.response?.operatorBrief?.nextDecision || "Resolve the required human gate, then autopilot can recheck the boundary.");
	}), V(() => U(w), () => {
		L(C, U(w)?.phase === "RESEARCH_REVIEW" && U(w)?.researchPlan?.status === "drafted" && U(w)?.researchPlan?.response?.decision === "BLOCKED" && U(w)?.researchPlan?.response?.lanes?.some((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), zr(), vo();
	var ne = sa(), re = z(ne), ie = (e) => {
		var t = hx(), n = R(t), r = R(n), i = B(R(r), 2), O = R(i, !0);
		P(i);
		var k = B(i, 2), ne = R(k, !0);
		P(k), P(r);
		var re = B(r, 2), ie = R(re, !0);
		P(re), P(n);
		var ae = B(n, 2), oe = (e) => {
			var t = qb(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, (U(a), W(() => U(a).error)))), q(e, t);
		};
		Y(ae, (e) => {
			U(a), U(C), W(() => U(a)?.error && !U(C)) && e(oe);
		});
		var se = B(ae, 2), ce = (e) => {
			var t = Yb(), n = R(t), r = R(n);
			P(n);
			var i = B(n, 2), a = R(i, !0);
			P(i);
			var o = B(i, 2), s = (e) => {
				var t = Jb(), n = R(t);
				P(t), H((e, t) => J(n, `${e ?? ""} required · ${t ?? ""} currently schedulable · no workflow transition was consumed.`), [() => (U(w), W(() => Number(U(w).loopStart.minimumRunnableTokenCap).toLocaleString())), () => (U(w), W(() => Number(U(w).loopStart.effectiveTokenLimit || 0).toLocaleString()))]), q(e, t);
			};
			Y(o, (e) => {
				U(w), W(() => U(w)?.loopStart?.minimumRunnableTokenCap) && e(s);
			}), P(t), H((e) => {
				J(r, `AUTOMATION START PREFLIGHT · ${e ?? ""}`), J(a, (U(w), W(() => U(w)?.loopStart?.blocker)));
			}, [() => (U(w), W(() => U(w)?.loopStart?.code?.replaceAll("_", " ")))]), q(e, t);
		};
		Y(se, (e) => {
			U(v) && e(ce);
		});
		var le = B(se, 2), ue = (e) => {
			var t = Xb(), n = B(R(t), 2), r = R(n, !0);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i), P(t), H(() => {
				J(r, (U(a), W(() => U(a).resumeBlocker))), J(o, U(S));
			}), q(e, t);
		};
		Y(le, (e) => {
			U(a), U(C), W(() => U(a)?.status === "attention" && U(a).resumeBlocker && !U(C)) && e(ue);
		});
		var de = B(le, 2), fe = (e) => {
			var t = ex(), n = R(t), r = R(n), i = R(r);
			P(r);
			var a = B(r), o = R(a);
			P(a), P(n);
			var s = B(n, 2), c = R(s), l = R(c), u = R(l), f = R(u, !0);
			P(u), Ge(), P(l);
			var p = B(l), m = R(p), h = R(m);
			P(m), Ge(), P(p);
			var g = B(p), _ = R(g), v = R(_, !0);
			P(_), Ge(), P(g), P(c);
			var y = B(c, 2);
			X(y, 5, () => (U(d), W(() => U(d).members || [])), (e) => e.requestId, (e, t) => {
				var n = Zb(), r = R(n), i = R(r, !0);
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
				var t = $b(), n = R(t), r = B(R(n)), i = R(r, !0);
				P(r), P(n);
				var a = B(n);
				X(a, 5, () => (U(d), W(() => U(d).deferred)), (e) => e.requestId, (e, t) => {
					var n = Qb(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a);
					P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).taskId))), J(o, `${e ?? ""} · ${U(t), W(() => U(t).decisionReason) ?? ""}`);
					}, [() => (U(t), W(() => U(t).decision.replaceAll("_", " ")))]), q(e, n);
				}), P(a), P(t), H(() => J(i, (U(d), W(() => U(d).deferred.length)))), q(e, t);
			};
			Y(b, (e) => {
				U(d), W(() => U(d).deferred?.length) && e(x);
			});
			var S = B(b, 2), C = R(S), w = R(C, !0);
			P(C);
			var T = B(C), E = R(T, !0);
			P(T), P(S), P(s), P(t), H((e, n, r) => {
				t.open = (U(d), W(() => U(d).status === "proposed")), J(i, `IMMUTABLE WAVE SCHEDULE · ${e ?? ""}…`), J(o, `${U(d), W(() => U(d).members?.length || 0) ?? ""} reserved · ${U(d), W(() => U(d).deferred?.length || 0) ?? ""} deferred`), J(f, n), J(h, `${U(d), W(() => U(d).proposal?.slots?.reserved || 0) ?? ""}/${U(d), W(() => U(d).proposal?.slots?.available || 0) ?? ""}`), J(v, r), J(w, (U(d), W(() => U(d).authority === "operator-confirmed-reservation" ? "OPERATOR-CONFIRMED RESERVATION" : U(d).authority === "operator-confirmed-execution" ? "BOUND SCHEDULE EXECUTION" : "NO DISPATCH AUTHORITY"))), J(E, (U(d), W(() => U(d).authority === "operator-confirmed-reservation" ? "Only the fixed members above may now be dispatched." : U(d).authority === "operator-confirmed-execution" ? "Member status and batch intake remain bound to the confirmed digest." : "Confirming the exact digest is required before any member can launch.")));
			}, [
				() => (U(d), W(() => U(d).digest?.slice(0, 18))),
				() => (U(d), W(() => U(d).proposal?.budget?.reservedTokens?.toLocaleString() || 0)),
				() => (U(d), W(() => U(d).status.toUpperCase()))
			]), q(e, t);
		};
		Y(de, (e) => {
			U(_) && e(fe);
		});
		var pe = B(de, 2), me = R(pe), he = R(me), ge = R(he, !0);
		P(he);
		var _e = B(he, 2), ve = R(_e, !0);
		P(_e), P(me);
		var ye = B(me, 2), be = R(ye), xe = (e) => {
			var t = nx(), n = z(t), r = B(n, 2), i = (e) => {
				var t = tx();
				H((e) => t.disabled = e, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.stop")), q(e, t);
			};
			Y(r, (e) => {
				U(o) && e(i);
			}), G("click", n, N), q(e, t);
		}, Se = (e) => {
			var t = rx(), n = B(z(t), 2), r = R(n, !0);
			P(n), H(() => J(r, (U(y), W(() => U(y)?.epochLabel ? "Review Epoch 2 resource proposal →" : "Open strategy & resources →")))), G("click", n, te), q(e, t);
		}, Ce = (e) => {
			var t = ix(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = tx();
				H((e) => t.disabled = e, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.stop")), q(e, t);
			};
			Y(i, (e) => {
				U(o) && e(a);
			}), H((e) => {
				n.disabled = e, J(r, U(T) ? "Freezing…" : "Freeze wave schedule");
			}, [() => (U(T), W(() => !!U(T)))]), G("click", n, () => M("research.schedule.prepare")), q(e, t);
		}, we = (e) => {
			var t = ix(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), a = (e) => {
				var t = tx();
				H((e) => t.disabled = e, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.stop")), q(e, t);
			};
			Y(i, (e) => {
				U(o) && e(a);
			}), H((e) => {
				n.disabled = e, J(r, (U(T), U(d), W(() => U(T) ? "Confirming…" : `Confirm ${U(d).members?.length || 0}-lane schedule`)));
			}, [() => (U(T), W(() => !!U(T)))]), G("click", n, () => M("research.schedule.confirm", U(d).id, { scheduleDigest: U(d).digest })), q(e, t);
		}, Te = (e) => {
			var t = ox(), n = z(t), r = (e) => {
				var t = ax(), n = R(t, !0);
				P(t), H((e) => {
					t.disabled = e, J(n, U(T) ? "Resuming…" : "Resume & dispatch wave");
				}, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.resume")), q(e, t);
			}, i = (e) => {
				var t = ax(), n = R(t, !0);
				P(t), H((e) => {
					t.disabled = e, J(n, (U(T), U(d), W(() => U(T) ? "Dispatching…" : `Dispatch ${U(d).members?.length || 0}-lane wave`)));
				}, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("research.schedule.dispatch", U(d).id, { scheduleDigest: U(d).digest })), q(e, t);
			};
			Y(n, (e) => {
				U(a), W(() => U(a)?.status === "paused" || U(a)?.status === "attention") ? e(r) : (U(a), W(() => U(a)?.status !== "running") && e(i, 1));
			});
			var s = B(n, 2), c = (e) => {
				var t = tx();
				H((e) => t.disabled = e, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.stop")), q(e, t);
			};
			Y(s, (e) => {
				U(o) && e(c);
			}), q(e, t);
		}, Ee = (e) => {
			var t = sx(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i);
			var s = B(i, 2);
			H((e, t, c) => {
				n.disabled = e, J(r, U(l) ? "Pause automation" : "Pause now"), i.disabled = t, J(o, (U(a), W(() => U(a).pendingActionId ? "Halt after this step" : "Pause before next step"))), s.disabled = c;
			}, [
				() => (U(T), W(() => !!U(T))),
				() => (U(T), W(() => !!U(T))),
				() => (U(T), W(() => !!U(T)))
			]), G("click", n, () => M("loop.pause")), G("click", i, () => M("loop.halt-after-step")), G("click", s, () => M("loop.stop")), q(e, t);
		}, De = (e) => {
			var t = cx(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2);
			H((e, t) => {
				n.disabled = e, J(r, U(T) === "loop.resume" ? "Rechecking…" : "Recheck & resume"), i.disabled = t;
			}, [() => (U(T), W(() => !!U(T))), () => (U(T), W(() => !!U(T)))]), G("click", n, () => M("loop.resume")), G("click", i, () => M("loop.stop")), q(e, t);
		}, Oe = (e) => {
			var t = cx(), n = z(t), r = R(n, !0);
			P(n);
			var i = B(n, 2);
			H((e) => {
				J(r, U(C) ? "Review & approve DOC-A1" : "Resolve the required gate"), i.disabled = e;
			}, [() => (U(T), W(() => !!U(T)))]), G("click", n, N), G("click", i, () => M("loop.stop")), q(e, t);
		}, ke = (e) => {
			var t = lx(), n = R(t, !0);
			P(t), H((e) => {
				t.disabled = e, J(n, (U(T), U(a), U(w), W(() => U(T) === "loop.start" ? "Starting…" : U(a)?.status === "completed" ? "Run another complete loop" : U(w).phase === "DECISION_REQUIRED" ? "Run one complete loop" : "Continue this loop automatically")));
			}, [() => (U(T), W(() => !!U(T)))]), G("click", t, () => M("loop.start")), q(e, t);
		};
		Y(be, (e) => {
			U(m) ? e(xe) : U(v) ? e(Se, 1) : U(g) ? e(Ce, 2) : (U(f), U(d), W(() => U(f) && U(d)?.status === "proposed") ? e(we, 3) : (U(f), U(d), W(() => U(f) && U(d)?.status === "confirmed") ? e(Te, 4) : (U(a), W(() => U(a)?.status === "running") ? e(Ee, 5) : (U(a), W(() => U(a)?.status === "paused" || U(a)?.status === "attention" && U(a).canResume) ? e(De, 6) : (U(a), W(() => U(a)?.status === "attention") ? e(Oe, 7) : (U(w), W(() => U(w).canStartLoop) && e(ke, 8)))))));
		}), P(ye), P(pe);
		var Ae = B(pe, 2), je = R(Ae), Me = B(R(je)), Ne = R(Me);
		P(Me), P(je);
		var Pe = B(je, 2), Fe = R(Pe), Ie = R(Fe), Le = R(Ie);
		P(Ie);
		var Re = B(Ie, 2), ze = R(Re, !0);
		P(Re);
		var Be = B(Re, 2), Ve = R(Be);
		P(Be), P(Fe);
		var He = B(Fe, 2), Ue = (e) => {
			var t = ux(), n = R(t), r = R(n);
			P(n);
			var i = B(n, 2), o = R(i, !0);
			P(i);
			var s = B(i, 2), c = R(s);
			P(s), P(t), H((e, t, n) => {
				J(r, `END · ${e ?? ""}`), J(o, t), J(c, `${U(a), W(() => U(a).end.waveLabel || "No named wave") ?? ""} · ${n ?? ""}`);
			}, [
				() => (U(a), W(() => j(U(a).end.capturedAt))),
				() => (U(a), W(() => A(U(a).end.phase))),
				() => (U(a), W(() => ee(U(a).end)))
			]), q(e, t);
		}, We = (e) => {
			var t = dx(), n = B(R(t)), r = R(n, !0);
			P(n), P(t), H(() => J(r, U(o) ? "Captured when this run stops" : "Not captured")), q(e, t);
		};
		Y(He, (e) => {
			U(a), W(() => U(a)?.end?.capturedAt) ? e(Ue) : e(We, -1);
		}), P(Pe);
		var Ke = B(Pe, 2), qe = (e) => {
			var t = px();
			X(t, 5, () => U(s), (e) => e.actionId, (e, t) => {
				var n = fx(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e) => {
					Z(n, 1, ja((U(t), W(() => U(t).status)))), J(i, (U(t), W(() => U(t).index))), J(s, (U(t), W(() => U(t).label))), J(l, `${U(t), W(() => U(t).status) ?? ""}${U(t), W(() => U(t).attemptCount && U(t).attemptCount > 1 ? ` · attempt ${U(t).attemptCount}` : "") ?? ""}${e ?? ""}`);
				}, [() => (U(t), W(() => U(t).completedAt ? ` · ${j(U(t).completedAt)}` : ""))]), q(e, n);
			}), P(t), q(e, t);
		};
		Y(Ke, (e) => {
			U(s), W(() => U(s).length) && e(qe);
		}), P(Ae);
		var Je = B(Ae, 2), Ye = (e) => {
			var t = mx(), n = R(t), r = R(n, !0);
			P(n), P(t), H(() => {
				Z(t, 1, `gate-feedback loop-feedback ${U(D) ?? ""}`), J(r, U(E));
			}), q(e, t);
		};
		Y(Je, (e) => {
			U(E) && e(Ye);
		}), P(t), H((e, n, r, i, p) => {
			Z(t, 1, `loop-control ${U(x) ?? ""}`), J(O, (U(v), U(m), U(g), U(f), U(d), U(C), U(l), U(u), U(o), U(c), U(a), W(() => U(v) ? "Recenter resources before starting the loop" : U(m) ? "Resolve custody before scheduling research" : U(g) ? "Freeze the resource-bounded wave" : U(f) && U(d)?.status === "proposed" ? `Confirm ${U(d).members?.length || 0} scheduled member${U(d).members?.length === 1 ? "" : "s"}` : U(f) && U(d)?.status === "confirmed" ? "Dispatch the confirmed wave" : U(C) ? "Paused for one operator approval" : U(l) ? `${U(u).length} bounded lane${U(u).length === 1 ? " is" : "s are"} working` : U(o) ? U(c)?.label || (U(a)?.status === "attention" ? "Waiting at a checked boundary" : "Watching for the next safe step") : U(a)?.status === "completed" ? "A full bounded loop is captured" : "Continue to the next fresh decision"))), J(ne, e), Z(re, 1, `loop-status ${U(x) ?? ""}`), J(ie, U(b)), J(ge, (U(f), U(a), U(o), W(() => U(f) ? "Current position" : U(a)?.haltAfterStep ? "Halt armed" : U(o) ? "Current position" : "Scope"))), J(ve, (U(v), U(m), U(g), U(f), U(d), U(C), U(l), U(a), U(c), W(() => U(v) ? "Resource gate → unlock autopilot" : U(m) ? "Custody dependency → bounded successor → resume" : U(g) ? "Checked plan → freeze schedule" : U(f) && U(d)?.status === "proposed" ? "Resource frontier frozen → operator confirmation" : U(f) && U(d)?.status === "confirmed" ? "Operator confirmed → bounded wave dispatch" : U(C) ? "DOC-A1 preflight passed · your approval is next" : U(l) ? `${U(l).taskId} · ${U(l).status}` : U(a)?.haltAfterStep ? "Will pause when this step settles" : U(c) ? `${U(c).index}. ${U(c).label} · ${U(c).status}` : "One decision-to-decision cycle"))), J(Ne, `${n ?? ""}/${U(s), W(() => U(s).length) ?? ""} settled`), J(Le, `START · ${r ?? ""}`), J(ze, i), J(Ve, `${U(a), W(() => U(a)?.start?.waveLabel || "No named wave") ?? ""} · ${p ?? ""}`);
		}, [
			() => (U(v), U(w), U(m), U(p), U(g), U(h), U(f), U(d), U(C), U(l), U(u), W(() => U(v) ? U(w)?.loopStart?.blocker : U(m) ? `${U(p).length} required custody contract${U(p).length === 1 ? " remains" : "s remain"}. Wave scheduling is locked until the focused dependency above is reshaped or settled.` : U(g) ? `${U(h) ? "The previous schedule is closed. " : ""}Freeze the current dependency-safe frontier under the slot and token policy before operator review.` : U(f) && U(d)?.status === "proposed" ? "Review the exact tasks, contracts, resource caps, and deferred lanes below. Confirmation reserves this digest but launches nothing." : U(f) && U(d)?.status === "confirmed" ? "The operator gate is captured. Dispatch will launch only these immutable members and will preserve a batch evidence boundary." : U(C) ? "The checked staging evidence is ready; approve DOC-A1 below, then Sol will replan automatically." : U(l) ? `${U(u).map((e) => e.taskId).join(", ")}. Autopilot will wait for the whole wave, perform batch intake, and continue the loop.` : "decision → checked plan → resource-bounded wave → custody → batch synthesis → next decision. Every action and receipt stays inspectable.")),
			() => (U(s), W(() => U(s).filter((e) => e.status === "completed").length)),
			() => (U(a), W(() => j(U(a)?.start?.capturedAt))),
			() => (U(a), W(() => A(U(a)?.start?.phase))),
			() => (U(a), W(() => ee(U(a)?.start)))
		]), q(e, t);
	};
	Y(re, (e) => {
		U(w) && e(ie);
	}), q(e, ne), bt(), i();
}
//#endregion
//#region src/ui/HeaderAutopilot.svelte
Xi(["click"]), Ho();
var _x = /* @__PURE__ */ K("<div><span><small>AUTOPILOT</small><strong> </strong></span> <button type=\"button\"><i aria-hidden=\"true\"></i> </button></div>");
function vx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I("");
	function h() {
		if (U(f)?.loopStart?.code === "EPOCH_BUDGET") {
			for (let e of ["#strategy-workspaces", "#strategy-workspace"]) {
				let t = document.querySelector(e);
				t instanceof HTMLDetailsElement && (t.open = !0);
			}
			requestAnimationFrame(() => document.querySelector("#strategy-workspace")?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			}));
			return;
		}
		document.querySelector("#loop-control, #next-action")?.scrollIntoView({
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
				await ns({
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
		L(l, U(o) ? "ON" : U(s) ? "PAUSED" : U(f)?.canStartLoop ? "READY" : "BLOCKED");
	}), V(() => (U(p), U(o), U(s), U(f)), () => {
		L(u, U(p) ? "Working…" : U(o) ? "Pause" : U(s) ? "Resume" : U(f)?.canStartLoop ? "Start" : "Manage blocker");
	}), V(() => (U(m), U(c), U(u), U(f)), () => {
		L(d, U(m) || (U(c) ? `${U(u)} one-loop autopilot` : U(f)?.loopStart?.blocker || "Open the current campaign gate"));
	}), zr(), vo();
	var _ = sa(), v = z(_), y = (e) => {
		var t = _x();
		let r;
		var i = R(t), a = B(R(i)), f = R(a, !0);
		P(a), P(i);
		var m = B(i, 2), h = B(R(m), 1, !0);
		P(m), P(t), H(() => {
			r = Z(t, 1, "header-autopilot", null, r, {
				active: U(o),
				paused: U(s),
				blocked: !U(c)
			}), J(f, U(l)), to(m, "aria-label", `${U(u)} one-loop autopilot`), to(m, "aria-pressed", U(o)), m.disabled = (U(p), n(), W(() => U(p) || n().access?.canMutate === !1)), to(m, "title", U(d)), J(h, U(u));
		}), G("click", m, g), q(e, t);
	};
	Y(v, (e) => {
		U(f) && e(y);
	}), q(e, _), bt(), i();
}
//#endregion
//#region src/ui/CampaignProcessTracker.svelte
Xi(["click"]), Ho();
var yx = /* @__PURE__ */ K("<li><span></span> <div><strong> </strong><small> </small></div></li>"), bx = /* @__PURE__ */ K("<section class=\"process-tracker\" id=\"process-tracker\" aria-label=\"Campaign process tracker\"><header><div><p class=\"eyebrow\">CAMPAIGN PROCESS</p><h2> </h2></div> <span><b> </b> </span></header> <ol></ol> <footer><span><b>NOW</b> </span> <span><b>CAMPAIGN</b> </span></footer></section>");
function xx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = [
		{
			id: "plan",
			short: "Plan",
			label: "Shape the wave"
		},
		{
			id: "launch",
			short: "Launch",
			label: "Confirm bounds"
		},
		{
			id: "run",
			short: "Run",
			label: "Bounded research"
		},
		{
			id: "land",
			short: "Land",
			label: "Evidence intake"
		},
		{
			id: "decide",
			short: "Decide",
			label: "Synthesize & steer"
		}
	], d = {
		PLANNING: "plan",
		RESEARCH_REVIEW: "plan",
		REVISING: "plan",
		NEXT_WAVE_READY: "plan",
		RESEARCH_READY: "launch",
		RESEARCH_RUNNING: "run",
		RUNNING: "run",
		RESEARCH_INTAKE: "land",
		RECONCILING: "land",
		SYNTHESIS_READY: "land",
		SYNTHESIZING: "land",
		DECISION_REQUIRED: "decide",
		BLOCKED: "decide"
	}, f = {
		PLANNING: "Prepare a bounded plan",
		RESEARCH_REVIEW: "Resolve the checked plan gate",
		REVISING: "Recheck the revised plan",
		RESEARCH_READY: "Resolve launch resources and confirm the schedule",
		RESEARCH_RUNNING: "Wait for the bounded wave to settle",
		RESEARCH_INTAKE: "Accept and reconcile landed evidence",
		RECONCILING: "Close the evidence boundary",
		SYNTHESIS_READY: "Freeze the synthesis bundle",
		SYNTHESIZING: "Wait for synthesis",
		DECISION_REQUIRED: "Choose the next campaign direction",
		NEXT_WAVE_READY: "Shape the next wave",
		BLOCKED: "Resolve the recorded blocker"
	}, p = /* @__PURE__ */ I(null);
	V(() => n(), () => {
		L(p, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => U(p), () => {
		L(a, d[U(p)?.phase || ""] || "plan");
	}), V(() => U(a), () => {
		L(o, Math.max(0, u.findIndex((e) => e.id === U(a))));
	}), V(() => U(p), () => {
		L(s, U(p)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)).length || 0);
	}), V(() => U(p), () => {
		L(c, U(p)?.loop?.steps?.filter((e) => e.status === "completed").length || 0);
	}), V(() => U(p), () => {
		L(l, U(p)?.loop?.steps?.length || 0);
	}), zr(), vo();
	var m = sa(), h = z(m), g = (e) => {
		var t = bx(), n = R(t), r = R(n), i = B(R(r)), d = R(i, !0);
		P(i), P(r);
		var m = B(r, 2), h = R(m), g = R(h, !0);
		P(h);
		var _ = B(h, 1, !0);
		P(m), P(n);
		var v = B(n, 2);
		X(v, 5, () => u, ga, (e, t, n) => {
			var r = yx();
			let i;
			var s = R(r);
			s.textContent = n + 1;
			var c = B(s, 2), l = R(c), u = R(l, !0);
			P(l);
			var d = B(l), f = R(d, !0);
			P(d), P(c), P(r), H(() => {
				i = Z(r, 1, "", null, i, {
					current: U(t).id === U(a),
					passed: n < U(o)
				}), J(u, (U(t), W(() => U(t).short))), J(f, (U(t), W(() => U(t).label)));
			}), q(e, r);
		}), P(v);
		var y = B(v, 2), b = R(y), x = B(R(b), 1, !0);
		P(b);
		var S = B(b, 2), C = B(R(S), 1, !0);
		P(S), P(y), P(t), H((e) => {
			J(d, (U(p), W(() => f[U(p).phase] || "Track the next bounded move"))), J(g, e), J(_, U(s) ? `${U(s)} active lane${U(s) === 1 ? "" : "s"}` : U(l) ? `${U(c)}/${U(l)} loop steps settled` : "No active execution"), J(x, (U(o), W(() => u[U(o)].label))), J(C, (U(p), W(() => U(p).strategy?.workspace?.activeReview?.response?.proposal?.epochLabel || U(p).strategy?.epoch?.label || U(p).role)));
		}, [() => (U(p), W(() => U(p).phase.replaceAll("_", " ")))]), q(e, t);
	};
	Y(h, (e) => {
		U(p) && e(g);
	}), q(e, m), bt(), i();
}
//#endregion
//#region src/ui/OperatorGate.svelte
Ho();
var Sx = /* @__PURE__ */ K("<div class=\"gate-feedback error\" role=\"alert\"><span> </span></div>"), Cx = /* @__PURE__ */ K("<div class=\"operator-gate-callout\"><strong>The first action is read-only</strong> <p>It resolves the exact source commit, confirms both approved SHA-256 hashes, checks that main is clean, and previews the lineage merge. It changes no Git or campaign authority.</p> <button class=\"primary-button\"> </button></div> <!>", 1), wx = /* @__PURE__ */ K("<div class=\"operator-gate-preview\"><div class=\"operator-gate-ready\"><div><span>READINESS CHECK PASSED</span> <strong>Exact DOC-A1 transition is ready</strong> <small>3 local custody commits · no push · no worker dispatch</small></div> <label class=\"operator-gate-confirm\"><input type=\"checkbox\"/><span>Approve Proposal A’s exact bytes as DOC-A1.</span></label> <button class=\"primary-button operator-gate-approve\"> </button></div> <details class=\"operator-gate-technical\"><summary>Inspect commits, paths, hashes, and effects <strong>Preflight receipt</strong></summary> <div class=\"operator-gate-summary\"><div><span>FROM FROZEN STAGING HEAD</span><strong> </strong><small> </small></div> <div><span>INTO CLEAN MAIN</span><strong> </strong><small> </small></div></div> <ul><li><code>CONTRACT.md</code><span> </span></li> <li><code>output/preimage-spec.json</code><span> </span></li> <li><code>evidence-receipt.json</code><span>new DKC successor receipt</span></li></ul> <div class=\"operator-gate-effects\"><strong>BOUNDARY EFFECTS</strong> <p>Creates one local lineage-intake merge, one exact document commit, and one successor-receipt commit. It does not push, dispatch a worker, authorize SAT or Mac work, or promote a mathematical claim.</p></div> <button class=\"outline-button compact\">Recheck readiness</button></details></div>"), Tx = /* @__PURE__ */ K("<div role=\"status\"><span> </span></div>"), Ex = /* @__PURE__ */ K("<section class=\"operator-gate\" id=\"operator-gate\" aria-live=\"polite\"><div class=\"operator-gate-heading\"><div><p class=\"eyebrow\">REQUIRED OPERATOR TRANSITION</p> <h2>Adopt Proposal A as DOC-A1</h2> <p>This is the missing bridge between the checked staging evidence and the next runnable cold-replay lane.</p></div> <span class=\"operator-gate-status\">HUMAN GATE</span></div> <div class=\"operator-gate-path\" aria-label=\"Operator transition progress\"><span>✓ Verified</span><i>→</i><span class=\"current\">Your approval</span><i>→</i><span>Sol replans</span></div> <!> <!></section>");
function Dx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I(""), h = /* @__PURE__ */ I("pending");
	function g(e = "") {
		return e ? `${e.slice(0, 10)}…${e.slice(-6)}` : "not recorded";
	}
	async function _(e, t = {}) {
		if (!U(d) || U(f)) throw Error("Another gate action is still settling");
		L(f, e), L(h, "pending"), L(m, e.endsWith("prepare") ? "Checking the exact lineage, byte hashes, clean worktree, and merge preview…" : "Applying the explicitly approved local authority transition…");
		try {
			let n = await ns({
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
	}), zr(), vo();
	var b = sa(), x = z(b), S = (e) => {
		var t = Ex(), n = B(R(t), 2), r = R(n);
		let i;
		Ge(4), P(n);
		var a = B(n, 2), o = (e) => {
			var t = Cx(), n = z(t), r = B(R(n), 4), i = R(r, !0);
			P(r), P(n);
			var a = B(n, 2), o = (e) => {
				var t = Sx(), n = R(t), r = R(n, !0);
				P(n), P(t), H(() => J(r, (U(u), W(() => U(u).error)))), q(e, t);
			};
			Y(a, (e) => {
				U(u), U(m), W(() => U(u)?.status === "failed" && !U(m)) && e(o);
			}), H((e) => {
				r.disabled = e, J(i, U(f) ? "Checking readiness…" : "Check transition readiness");
			}, [() => (U(f), W(() => !!U(f)))]), G("click", r, v), q(e, t);
		}, s = (e) => {
			var t = wx(), n = R(t), r = B(R(n), 2), i = R(r);
			Qa(i), Ge(), P(r);
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
			P(A), P(k), Ge(2), P(T);
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
			]), co(i, () => U(p), (e) => L(p, e)), G("click", a, y), G("click", ee, v), q(e, t);
		};
		Y(a, (e) => {
			U(l) ? e(s, -1) : e(o);
		});
		var c = B(a, 2), d = (e) => {
			var t = Tx(), n = R(t), r = R(n, !0);
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
	}), q(e, b), bt(), i();
}
//#endregion
//#region src/ui/ActiveLaneStrip.svelte
Xi(["click"]), Ho();
var Ox = /* @__PURE__ */ K("<small class=\"active-lane-loading\">Loading live detail…</small>"), kx = /* @__PURE__ */ K("<small class=\"active-lane-error\"> </small>"), Ax = /* @__PURE__ */ K("<li><b> </b><span> </span></li>"), jx = /* @__PURE__ */ K("<ul></ul>"), Mx = /* @__PURE__ */ K("<details class=\"active-lane-mini\"><summary><span class=\"active-lane-state\"><i aria-hidden=\"true\"></i><b> </b></span> <span class=\"active-lane-title\"><strong> </strong><small> </small></span> <span class=\"active-lane-glance\"><b> </b><small> </small></span></summary> <div class=\"active-lane-detail\"><p> </p> <!> <!> <div class=\"active-lane-facts\"><span><small>PROFILE</small><strong> </strong></span> <span><small>USAGE</small><strong> </strong></span> <span><small>JOB</small><strong> </strong></span></div> <!> <button class=\"outline-button compact\" type=\"button\">Open full lane inspector</button></div></details>"), Nx = /* @__PURE__ */ K("<section class=\"active-lane-strip\" aria-label=\"Currently running campaign lanes\"><header><span><i aria-hidden=\"true\"></i><small>LIVE WAVE</small><strong> </strong></span> <b>Expand a lane to inspect</b></header> <div class=\"active-lane-list\"></div></section>");
function Px(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I({}), s = /* @__PURE__ */ I({}), c = /* @__PURE__ */ I({});
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
	}), zr(), vo();
	var m = sa(), h = z(m), g = (e) => {
		var t = Nx(), n = R(t), r = R(n), i = B(R(r), 2), m = R(i);
		P(i), P(r), Ge(2), P(n);
		var h = B(n, 2);
		X(h, 5, () => U(a), (e) => e.id, (e, t) => {
			let n = /* @__PURE__ */ Sn(() => (U(o), U(t), W(() => U(o)[U(t).id] || U(t))));
			var r = Mx(), i = R(r), a = R(i), m = B(R(a)), h = R(m, !0);
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
				q(e, Ox());
			};
			Y(k, (e) => {
				U(s), U(t), W(() => U(s)[U(t).id]) && e(A);
			});
			var j = B(k, 2), ee = (e) => {
				var n = kx(), r = R(n, !0);
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
				var t = jx();
				X(t, 5, () => (xi(U(n)), W(() => U(n).activities.slice(0, 3))), (e) => e.id, (e, t) => {
					var n = Ax(), r = R(n), i = R(r, !0);
					P(r);
					var a = B(r), o = R(a, !0);
					P(a), P(n), H((e) => {
						J(i, (U(t), W(() => U(t).kind))), J(o, e);
					}, [() => (U(t), W(() => l(U(t).label, 140)))]), q(e, n);
				}), P(t), q(e, t);
			};
			Y(le, (e) => {
				xi(U(n)), W(() => U(n).activities?.length) && e(ue);
			});
			var de = B(le, 2);
			P(E), P(r), H((e, r, i) => {
				J(h, (U(t), W(() => U(t).status || U(t).severity))), J(v, (U(t), W(() => U(t).task))), J(b, `${U(t), W(() => U(t).lane) ?? ""} · ${U(t), W(() => U(t).model || "worker") ?? ""}`), J(C, (U(t), W(() => U(t).inFlight + U(t).queued ? `${U(t).inFlight + U(t).queued} active` : U(t).tempo || "observing"))), J(T, e), J(O, r), J(ne, (xi(U(n)), W(() => U(n).topology?.profile || U(n).effort || "bounded worker"))), J(ae, i), J(ce, (xi(U(n)), W(() => U(n).jobId || "pending")));
			}, [
				() => (U(t), W(() => u(U(t).updatedAt || U(t).launchedAt))),
				() => (U(o), U(t), W(() => l(U(o)[U(t).id]?.detail || U(t).detail || "The worker has not reported a current activity note yet.", 320))),
				() => (xi(U(n)), W(() => d(U(n).tokens)))
			]), Yi("toggle", r, (e) => e.currentTarget.open && f(U(t).id)), G("click", de, () => p(U(t).id)), q(e, r);
		}), P(h), P(t), H(() => J(m, `${U(a), W(() => U(a).length) ?? ""} lane${U(a), W(() => U(a).length === 1 ? "" : "s") ?? ""} running`)), q(e, t);
	};
	Y(h, (e) => {
		U(a), W(() => U(a).length) && e(g);
	}), q(e, m), bt(), i();
}
//#endregion
//#region src/ui/StrategyOverview.svelte
Xi(["click"]), Ho();
var Fx = /* @__PURE__ */ K("<article><div><strong> </strong><span> </span></div> <div class=\"track-meter\"><i></i><b></b></div> <small> </small></article>"), Ix = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small><p> </p></div></li>"), Lx = /* @__PURE__ */ K("<article><strong> </strong><p> </p><small> </small></article>"), Rx = /* @__PURE__ */ K("<div class=\"drift-list\"></div>"), zx = /* @__PURE__ */ K("<p class=\"strategy-empty\">No active drift signal crosses the charter’s advisory thresholds.</p>"), Bx = /* @__PURE__ */ K("<section id=\"campaign-strategy\" aria-label=\"Campaign strategy and drift\" aria-live=\"polite\"><div class=\"strategy-heading\"><div><p> </p> <h2> </h2> <span> </span></div> <div class=\"strategy-status\"><strong> </strong><span>shadow mode · advisory</span></div></div> <div class=\"strategy-vitals\"><div><span>Frontier motion</span><strong> </strong><small>recorded advances</small></div> <div><span>Measured spend</span><strong> </strong><small> </small></div> <div><span>Support share</span><strong> </strong><small> </small></div> <div><span>Frontier ledger</span><strong> </strong><small> </small></div></div> <div class=\"strategy-tracks\" aria-label=\"Strategic track allocation\"></div> <details class=\"strategy-details\"><summary><span>Inspect timescales, drift evidence, and custody separation</span><strong> </strong></summary> <div class=\"strategy-detail-grid\"><section><h3>Nested control loops</h3> <ol class=\"strategy-layers\"></ol></section> <section><h3>Drift evidence</h3> <!></section></div> <p class=\"strategy-shadow-note\"><strong>Shadow mode:</strong> these measurements are supplied to Sol synthesis and lane planning, but they do not yet approve, reject, or dispatch work.</p></details></section>");
function Vx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null);
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
	}), zr(), vo();
	var d = sa(), f = z(d), p = (e) => {
		var t = Bx(), n = R(t), r = R(n), i = R(r), a = R(i);
		P(i);
		var d = B(i, 2), f = R(d, !0);
		P(d);
		var p = B(d, 2), m = R(p, !0);
		P(p), P(r);
		var h = B(r, 2), g = R(h), _ = R(g, !0);
		P(g), Ge(), P(h), P(n);
		var v = B(n, 2), y = R(v), b = B(R(y)), x = R(b, !0);
		P(b), Ge(), P(y);
		var S = B(y, 2), C = B(R(S)), w = R(C, !0);
		P(C);
		var T = B(C), E = R(T);
		P(T), P(S);
		var D = B(S, 2);
		let O;
		var k = B(R(D)), A = R(k, !0);
		P(k);
		var j = B(k), ee = R(j);
		P(j), P(D);
		var M = B(D, 2), N = B(R(M)), te = R(N, !0);
		P(N);
		var ne = B(N), re = R(ne, !0);
		P(ne), P(M), P(v);
		var ie = B(v, 2);
		X(ie, 5, () => (U(o), W(() => U(o).tracks)), (e) => e.id, (e, t) => {
			var n = Fx(), r = R(n), i = R(r), a = R(i, !0);
			P(i);
			var o = B(i), s = R(o);
			P(o), P(r);
			var u = B(r, 2), d = R(u), f = B(d);
			P(u);
			var p = B(u, 2), m = R(p);
			P(p), P(n), H((e, r, i, o, c) => {
				Ra(n, (U(t), W(() => `--track:${U(t).color}`))), J(a, (U(t), W(() => U(t).label))), J(s, `${e ?? ""} actual / ${r ?? ""} target`), Ra(d, i), Ra(f, o), J(m, `${U(t), W(() => U(t).runs) ?? ""} runs · ${c ?? ""} tokens${U(t), W(() => U(t).maintenanceRuns ? ` · ${U(t).maintenanceRuns} support` : "") ?? ""}`);
			}, [
				() => (U(t), W(() => c(U(t).actualShare))),
				() => (U(t), W(() => c(U(t).targetShare))),
				() => (U(t), W(() => `width:${Math.min(100, Number(U(t).actualShare || 0) * 100)}%`)),
				() => (U(t), W(() => `left:${Math.min(100, Number(U(t).targetShare || 0) * 100)}%`)),
				() => (U(t), W(() => l(U(t).knownTokens)))
			]), q(e, n);
		}), P(ie);
		var ae = B(ie, 2), oe = R(ae), se = B(R(oe)), ce = R(se);
		P(se), P(oe);
		var le = B(oe, 2), ue = R(le), de = B(R(ue), 2);
		X(de, 7, () => (U(o), W(() => U(o).layers)), (e) => e.id, (e, t, n) => {
			var r = Ix();
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
		}), P(de), P(ue);
		var fe = B(ue, 2), pe = B(R(fe), 2), me = (e) => {
			var t = Rx();
			X(t, 5, () => (U(o), W(() => U(o).drift.signals)), (e) => e.id, (e, t) => {
				var n = Lx(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a, !0);
				P(a);
				var s = B(a), c = R(s, !0);
				P(s), P(n), H(() => {
					Z(n, 1, `severity-${U(t), W(() => U(t).severity) ?? ""}`), J(i, (U(t), W(() => U(t).label))), J(o, (U(t), W(() => U(t).evidence))), J(c, (U(t), W(() => U(t).action)));
				}), q(e, n);
			}), P(t), q(e, t);
		}, he = (e) => {
			q(e, zx());
		};
		Y(pe, (e) => {
			U(o), W(() => U(o).drift.signals.length) ? e(me) : e(he, -1);
		}), P(fe), P(le), Ge(2), P(ae), P(t), H((e, n, r, i, c) => {
			Z(t, 1, `strategy-overview status-${U(o), W(() => U(o).drift.status) ?? ""}`), J(a, `CAMPAIGN STRATEGY · ${U(o), W(() => U(o).epoch.label) ?? ""}`), J(f, (U(s), W(() => U(s)?.label || "The portfolio is moving within its charter"))), J(m, (U(s), U(o), W(() => U(s)?.detail || U(o).charter.thesis))), J(_, (U(o), W(() => U(o).drift.status === "attention" ? "RECENTER" : U(o).drift.status === "watch" ? "WATCH" : "ON TRACK"))), J(x, (U(o), W(() => U(o).progress.advancedDeltaCount || 0))), J(w, e), J(E, `known tokens · ${U(o), W(() => U(o).cost.unreportedRuns) ?? ""} unreported`), O = Z(D, 1, "", null, O, n), J(A, r), J(ee, `charter ceiling ${i ?? ""}`), J(te, c), J(re, (U(o), W(() => U(o).progress.frontierPath ? "durable source detected" : "source missing"))), J(ce, `${U(o), W(() => U(o).drift.signals.length) ?? ""} signal${U(o), W(() => U(o).drift.signals.length === 1 ? "" : "s") ?? ""}`);
		}, [
			() => (U(o), W(() => l(U(o).cost.knownTokens))),
			() => ({ over: Number(U(o).cost.maintenanceShare) > Number(U(o).charter.maintenancePolicy?.rollingShareLimit || .15) }),
			() => (U(o), W(() => c(U(o).cost.maintenanceShare))),
			() => (U(o), W(() => c(U(o).charter.maintenancePolicy?.rollingShareLimit || .15))),
			() => (U(o), W(() => u(U(o).progress.frontierUpdatedAt)))
		]), q(e, t);
	};
	Y(f, (e) => {
		U(o) && e(p);
	}), q(e, d), bt(), i();
}
//#endregion
//#region src/ui/program-compass.ts
function Hx(e, t, n = 260) {
	let r = (typeof e == "string" ? e.trim().replace(/\s+/g, " ") : "") || t;
	return r.length <= n ? r : `${r.slice(0, n).replace(/\s+\S*$/, "")}…`;
}
function Ux(e) {
	let t = e?.wave?.synthesis?.response?.progressDeltas;
	if (Array.isArray(t)) return t;
	let n = Array.isArray(e?.strategy?.recentSnapshots) ? e.strategy.recentSnapshots : [];
	return Array.isArray(n[0]?.metrics?.progressDeltas) ? n[0].metrics.progressDeltas : [];
}
function Wx(e, t, n) {
	return e.some((e) => String(e?.metricId || "") === t && (!n || String(e?.status || "").toUpperCase() === n));
}
function Gx(e) {
	let t = e?.strategy || {}, n = t.charter || {}, r = Array.isArray(t.recentSnapshots) ? t.recentSnapshots[0] : null, i = Ux(e), a = String(e?.id || "").toLowerCase() === "cfg23" || /23[_ ]?4/i.test(String(n.question || e?.role || "")), o = Wx(i, "decision-row41", "ADVANCED"), s = Wx(i, "geometric-23_4-decision", "UNCHANGED");
	if (a && o) return {
		objective: "Decide whether a real geometric (23₄) exists: produce an exact real witness, or an exact exclusion whose coverage is genuinely global.",
		status: "REBALANCE NEXT WAVE",
		headline: "Row 41 moved. The program now needs breadth, not another descendant audit.",
		changed: "The row-41 audit reportedly covers all 6/6 decorated projective-V₄ actions and identifies radical guard forcing (minimal exponent five).",
		scale: s ? "This is a real local theorem candidate, but only for six decorated V₄ action presentations. The unrestricted geometric (23₄) question remains open." : "This advances a bounded V₄ denominator; its promotion and global scope remain separate questions.",
		nextTarget: "Run the C₂ missing-state diagnosis and the 11-type asymmetric supply decision as a deliberately mixed two-lane wave.",
		rationale: "C₂ decides whether a promising coverage architecture is mathematically sound or only miscounted. The asymmetric lane restores contact with candidate supply. Together they change two different program denominators without reopening row 41.",
		antiLoop: "Keep row-41 semantic/cost correction in custody, not research. Do not open rows 42–44 merely because they are adjacent. Hold the heavy BS21 pilot until the cap overrun is reconciled and the mixed wave reports complete costs.",
		moves: [
			{
				id: "c2-forensics",
				track: "COVERAGE",
				timing: "NOW",
				title: "Localize the 352nd C₂ depth-6 state",
				detail: "Find the first producer decision that omitted or merged it; stop before a recount, repair, or census.",
				payoff: "Classifies the C₂ blocker as bookkeeping, keying, parent logic, or ingestion—and decides whether that architecture deserves another wave."
			},
			{
				id: "asymmetric-supply",
				track: "SUPPLY",
				timing: "PARALLEL",
				title: "Decide the 11-type asymmetric laboratory",
				detail: "Independently replay the actual named pool and make an explicit GO/PARK decision at 11; do not chase a twelfth type by default.",
				payoff: "Restores a non-symmetric route toward witnesses or justifiably parks the representation with a frozen denominator."
			},
			{
				id: "bs21-proof-object",
				track: "DECISION",
				timing: "HOLD",
				title: "Reserve the a25527ed BS21 proof-object pilot",
				detail: "Try bounded sparse ideal membership, then toric residue only if the first stage hits its declared limit.",
				payoff: "Could move BS21 from 34/42 to 35/42 and validate a reusable proof compiler, but it is the expensive third move—not the whole program."
			}
		]
	};
	let c = i.find((e) => String(e?.status || "").toUpperCase() === "ADVANCED"), l = i.find((e) => String(e?.status || "").toUpperCase() === "UNCHANGED"), u = t?.drift?.signals?.[0];
	return {
		objective: Hx(n.question || e?.role, "Advance the campaign's central mathematical question."),
		status: u ? "STRATEGY CHECK" : "PROGRAM COMPASS",
		headline: Hx(u?.label || n?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
		changed: Hx(c?.after || c?.evidence, "No accepted frontier change is recorded for the latest wave."),
		scale: Hx(l?.after || l?.evidence, "The campaign-level consequence has not yet been recorded."),
		nextTarget: Hx(e?.wave?.synthesis?.response?.nextWave?.objective || r?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
		rationale: Hx(u?.detail || n.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
		antiLoop: Hx(u?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
		moves: []
	};
}
//#endregion
//#region src/ui/ProgramCompass.svelte
Ho();
var Kx = /* @__PURE__ */ K("<details><summary><span><b> </b><small> </small></span><strong> </strong><i>why?</i></summary> <div><p> </p><p><b>Program payoff:</b> </p></div></details>"), qx = /* @__PURE__ */ K("<div class=\"compass-wave\"></div>"), Jx = /* @__PURE__ */ K("<section class=\"program-compass\" aria-label=\"Program objective and recommended next research targets\"><header><div><p>PROGRAM COMPASS</p><h2> </h2></div> <strong> </strong></header> <div class=\"compass-chain\"><article><span>WIN CONDITION</span><strong> </strong></article> <i aria-hidden=\"true\">→</i> <article><span>WHAT JUST CHANGED</span><strong> </strong><small> </small></article> <i aria-hidden=\"true\">→</i> <article class=\"recommended\"><span>BEST NEXT TARGET</span><strong> </strong></article></div> <!> <details class=\"compass-reasoning\"><summary><span>WHY THIS ORDER</span><strong>Show strategy and anti-loop guard</strong></summary> <div><p> </p><p><b>Avoid the loop:</b> </p></div></details> <footer><b>ADVISORY, NOT AUTHORITY</b><span>The evidence receipts and human gates still decide what is accepted or launched.</span></footer></section>");
function Yx(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(null);
	V(() => n(), () => {
		L(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), V(() => (U(a), Gx), () => {
		L(o, U(a) ? Gx(U(a)) : null);
	}), zr(), vo();
	var s = sa(), c = z(s), l = (e) => {
		var t = Jx(), n = R(t), r = R(n), i = B(R(r)), a = R(i, !0);
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
			var t = qx();
			X(t, 5, () => (U(o), W(() => U(o).moves)), (e) => e.id, (e, t) => {
				var n = Kx();
				let r;
				var i = R(n), a = R(i), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c, !0);
				P(c), P(a);
				var u = B(a), d = R(u, !0);
				P(u), Ge(), P(i);
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
		P(D), P(w), P(C), Ge(2), P(t), H(() => {
			J(a, (U(o), W(() => U(o).headline))), J(c, (U(o), W(() => U(o).status))), J(f, (U(o), W(() => U(o).objective))), J(h, (U(o), W(() => U(o).changed))), J(_, (U(o), W(() => U(o).scale))), J(b, (U(o), W(() => U(o).nextTarget))), J(E, (U(o), W(() => U(o).rationale))), J(O, ` ${U(o), W(() => U(o).antiLoop) ?? ""}`);
		}), q(e, t);
	};
	Y(c, (e) => {
		U(o) && e(l);
	}), q(e, s), bt(), i();
}
//#endregion
//#region src/ui/ResourceEconomy.svelte
Ho();
var Xx = /* @__PURE__ */ K("<div class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></div>"), Zx = /* @__PURE__ */ K("<article><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></article>"), Qx = /* @__PURE__ */ K("<article><strong class=\"svelte-wkay8m\"> </strong><p class=\"svelte-wkay8m\"> </p></article>"), $x = /* @__PURE__ */ K("<section class=\"resource-signals svelte-wkay8m\"></section>"), eS = /* @__PURE__ */ K("<li><b class=\"svelte-wkay8m\"> </b> <div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span><p class=\"svelte-wkay8m\"> </p><small class=\"svelte-wkay8m\"> </small></div></li>"), tS = /* @__PURE__ */ K("<ol class=\"svelte-wkay8m\"></ol>"), nS = /* @__PURE__ */ K("<div class=\"resource-empty svelte-wkay8m\"><strong class=\"svelte-wkay8m\">No bounded candidate is currently schedulable</strong><p class=\"svelte-wkay8m\">The ledger remains useful as an epoch budget and cost-quality check.</p></div>"), rS = /* @__PURE__ */ K("<li class=\"svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div><i class=\"svelte-wkay8m\">NO DISPATCH</i></li>"), iS = /* @__PURE__ */ K("<details class=\"simulation-history svelte-wkay8m\"><summary class=\"svelte-wkay8m\">Immutable simulation history <strong> </strong></summary><ol class=\"svelte-wkay8m\"></ol></details>"), aS = /* @__PURE__ */ K("<div role=\"status\"> </div>"), oS = /* @__PURE__ */ K("<details id=\"resource-economy\"><summary class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"><small class=\"svelte-wkay8m\">RESOURCE ECONOMY</small><strong class=\"svelte-wkay8m\"> </strong></span> <span class=\"resource-summary svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><b class=\"svelte-wkay8m\"> </b><i class=\"svelte-wkay8m\">SHADOW</i></span></summary> <div class=\"resource-body svelte-wkay8m\"><header class=\"resource-intro svelte-wkay8m\"><div><span class=\"svelte-wkay8m\"> </span><h2 class=\"svelte-wkay8m\">Allocate attention before compute</h2><p class=\"svelte-wkay8m\"> </p></div> <div class=\"authority svelte-wkay8m\"><strong class=\"svelte-wkay8m\">ADVISORY ONLY</strong><span class=\"svelte-wkay8m\">Simulation cannot dispatch</span></div></header> <section class=\"budget svelte-wkay8m\" aria-label=\"Epoch token budget\"><div class=\"budget-heading svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div> <div class=\"budget-meter svelte-wkay8m\"><i class=\"known svelte-wkay8m\"></i><i class=\"committed svelte-wkay8m\"></i><i class=\"reserve svelte-wkay8m\"></i></div> <div class=\"budget-legend svelte-wkay8m\"><span class=\"known svelte-wkay8m\"> </span><span class=\"committed svelte-wkay8m\"> </span><span class=\"reserve svelte-wkay8m\"> </span><span> </span></div></section> <div class=\"resource-grid svelte-wkay8m\"><section class=\"slot-pools svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Shared slot pools</h3> <!></section> <section class=\"layer-ledger svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Measured by layer</h3> <!></section></div> <section class=\"calibration svelte-wkay8m\" aria-label=\"Receipt-bound resource calibration\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">RECEIPT-BOUND CALIBRATION</span><h3 class=\"svelte-wkay8m\"> </h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <p class=\"svelte-wkay8m\"> </p> <div class=\"calibration-classes svelte-wkay8m\"></div> <footer class=\"svelte-wkay8m\">Recommendations remain advisory. Calibration cannot change caps, schedule work, or grant scheduler authority.</footer></section> <!> <section class=\"scheduler svelte-wkay8m\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">ADVISORY SCHEDULER</span><h3 class=\"svelte-wkay8m\">What fits next—and what does not</h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <!> <footer class=\"svelte-wkay8m\"><p class=\"svelte-wkay8m\">Freezing creates a content-addressed recommendation receipt for later comparison. It cannot call a worker, consume a gate, or alter research direction.</p><button class=\"outline-button svelte-wkay8m\"> </button></footer></section> <!> <!></div></details>");
function sS(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(), u = /* @__PURE__ */ I(), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I(!1), h = /* @__PURE__ */ I(""), g = /* @__PURE__ */ I("pending");
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
				await ns({
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
	}), zr(), vo();
	var b = sa(), x = z(b), S = (e) => {
		var t = oS();
		let n;
		var r = R(t), i = R(r), d = B(R(i)), b = R(d);
		P(d), P(i);
		var x = B(i, 2), S = R(x), C = R(S);
		P(S);
		var w = B(S), T = R(w);
		P(w), Ge(), P(x), P(r);
		var E = B(r, 2), D = R(E), O = R(D), k = R(O), A = R(k);
		P(k);
		var j = B(k, 2), ee = R(j, !0);
		P(j), P(O), Ge(2), P(D);
		var M = B(D, 2), N = R(M), te = R(N), ne = R(te);
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
		], ga, (e, t) => {
			var n = Xx(), r = R(n), i = R(r, !0);
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
			var n = Xx(), r = R(n), i = R(r, !0);
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
			var n = Zx();
			let r;
			var i = R(n), a = R(i, !0);
			P(i);
			var o = B(i), s = R(o);
			P(o);
			var c = B(o), l = R(c, !0);
			P(c), P(n), H((e) => {
				r = Z(n, 1, "svelte-wkay8m", null, r, { sufficient: U(t).sufficient }), J(a, (U(t), W(() => U(t).id))), J(s, `${U(t), W(() => U(t).samples) ?? ""}/${U(t), W(() => U(t).minimumSamples) ?? ""}`), J(l, e);
			}, [() => (U(t), W(() => U(t).samples ? `p90 ${_(U(t).tokens?.p90)}` : "awaiting receipts"))]), q(e, n);
		}), P(Ae), Ge(2), P(xe);
		var je = B(xe, 2), Me = (e) => {
			var t = $x();
			X(t, 5, () => (U(f), W(() => U(f).signals)), (e) => e.id, (e, t) => {
				var n = Qx(), r = R(n), i = R(r, !0);
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
			var t = tS();
			X(t, 5, () => (U(f), W(() => U(f).candidates)), (e) => e.id, (e, t) => {
				var n = eS(), r = R(n), i = R(r, !0);
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
			q(e, nS());
		};
		Y(Le, (e) => {
			U(f), W(() => U(f).candidates?.length) ? e(Re) : e(ze, -1);
		});
		var Be = B(Le, 2), Ve = B(R(Be)), He = R(Ve, !0);
		P(Ve), P(Be), P(Ne);
		var Ue = B(Ne, 2), We = (e) => {
			var t = iS(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(f), W(() => U(f).simulations)), ga, (e, t) => {
				var n = rS(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), Ge(), P(n), H((e) => {
					J(i, `R${U(t), W(() => U(t).charterRevision) ?? ""}`), J(s, (U(t), W(() => U(t).inputDigest))), J(l, `${e ?? ""} · ${U(t), W(() => U(t).actor) ?? ""}`);
				}, [() => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(f), W(() => U(f).simulations.length) ?? ""} receipt${U(f), W(() => U(f).simulations.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(Ue, (e) => {
			U(f), W(() => U(f).simulations?.length) && e(We);
		});
		var Ke = B(Ue, 2), qe = (e) => {
			var t = aS(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `resource-feedback ${U(g) ?? ""}`, "svelte-wkay8m"), J(n, U(h));
			}), q(e, t);
		};
		Y(Ke, (e) => {
			U(h) && e(qe);
		}), P(E), P(t), H((e, r, i, s, d, p, h, g, _, v) => {
			n = Z(t, 1, "svelte-wkay8m", null, n, e), J(b, `${r ?? ""} measured of ${i ?? ""} this epoch`), J(C, `${U(f), W(() => U(f).candidates?.length || 0) ?? ""} choices`), J(T, `${U(f), W(() => U(f).slots?.available?.research || 0) ?? ""}/${U(f), W(() => U(f).slots?.capacity?.research || 0) ?? ""} research slots`), J(A, `PROVISIONAL EPOCH ENVELOPE · CHARTER R${U(f), W(() => U(f).charterRevision) ?? ""}`), J(ee, (U(f), W(() => U(f).policy.rationale))), J(ne, `${s ?? ""} measured + committed`), J(ie, `${d ?? ""} still schedulable · ${p ?? ""} held for redirects`), Ra(oe, `width:${U(c)}%`), Ra(se, `left:${U(c)}%;width:${U(l)}%`), Ra(ce, `right:0;width:${U(u)}%`), J(de, `measured ${h ?? ""}`), J(pe, `committed ${g ?? ""}`), J(he, `redirect reserve ${_ ?? ""}`), J(_e, `${U(a), W(() => U(a).unreported || 0) ?? ""} unreported runs`), J(Te, v), J(De, `${U(o), W(() => U(o).eligibleSamples || 0) ?? ""} eligible · ${U(o), W(() => U(o).excludedSamples || 0) ?? ""} excluded`), J(ke, (U(o), W(() => U(o).note))), J(Ie, `${U(f), W(() => U(f).simulation?.scheduled?.length || 0) ?? ""} fit · ${U(f), W(() => U(f).simulation?.gated?.length || 0) ?? ""} gated · ${U(f), W(() => U(f).simulation?.waiting?.length || 0) ?? ""} waiting`), Ve.disabled = U(m), J(He, U(m) ? "Freezing simulation…" : "Freeze scheduler simulation");
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
		]), G("click", Ve, y), go("open", "toggle", t, (e) => L(p, e), () => U(p)), q(e, t);
	};
	Y(x, (e) => {
		U(f) && e(S);
	}), q(e, b), bt(), i();
}
//#endregion
//#region src/ui/StrategyWorkspace.svelte
Xi(["click"]), Ho();
var cS = /* @__PURE__ */ K("<label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Exact thread or turn ID</span><input maxlength=\"500\" placeholder=\"Attached coordinator reference\" class=\"svelte-1ull9g0\"/></label>"), lS = /* @__PURE__ */ K("<div class=\"strategy-review-request\"><div><span>CURRENT EPOCH</span> <strong> </strong> <p> </p></div> <label><span>Review focus</span><textarea rows=\"3\" maxlength=\"2000\"></textarea></label> <div class=\"strategy-review-provenance svelte-1ull9g0\"><label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Review kind</span><select class=\"svelte-1ull9g0\"><option>Epoch audit</option><option>Independent idea search</option></select></label> <label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Request source</span><select class=\"svelte-1ull9g0\"><option>Operator</option><option>Coordinator request</option></select></label> <!></div> <button class=\"primary-button\"> </button></div>"), uS = /* @__PURE__ */ K("<div class=\"strategy-review-running\"><span class=\"strategy-pulse\"></span> <div><strong> </strong><p> </p><small> </small></div></div>"), dS = /* @__PURE__ */ K("<div><span> </span><strong> </strong><small> </small></div>"), fS = /* @__PURE__ */ K("<li class=\"svelte-1ull9g0\"> </li>"), pS = /* @__PURE__ */ K("<ul></ul>"), mS = /* @__PURE__ */ K("<p>None proposed.</p>"), hS = /* @__PURE__ */ K("<section><strong> </strong><!></section>"), gS = /* @__PURE__ */ K("<li><strong> </strong><span> </span><p> </p></li>"), _S = /* @__PURE__ */ K("<details class=\"custody-candidates\"><summary> </summary><ul></ul></details>"), vS = /* @__PURE__ */ K("<label><input type=\"checkbox\"/><span>I approve this exact advisory charter as the next epoch.</span></label> <div><button class=\"outline-button\">Keep current charter</button><button class=\"primary-button\"> </button></div>", 1), yS = /* @__PURE__ */ K("<button class=\"outline-button\">Close proposal and keep current charter</button>"), bS = /* @__PURE__ */ K("<div class=\"strategy-proposal\"><header><div><span> </span><h3> </h3></div> <strong> </strong></header> <div class=\"strategy-proposal-objective\"><span>PROPOSED EPOCH</span> <strong> </strong> <p> </p></div> <div class=\"strategy-proposal-weights\" aria-label=\"Proposed track weights\"></div> <div class=\"strategy-action-diff\"></div> <!> <div class=\"strategy-human-gate\"><div><span>HUMAN ACTIVATION GATE</span><strong> </strong><small> </small></div> <!></div></div>"), xS = /* @__PURE__ */ K("<div role=\"status\"> </div>"), SS = /* @__PURE__ */ K("<li><span> </span><div><strong> </strong><small> </small></div></li>"), CS = /* @__PURE__ */ K("<details class=\"strategy-history\"><summary>Charter history <strong> </strong></summary><ol></ol></details>"), wS = /* @__PURE__ */ K("<li class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\"> </span><div><strong> </strong><small> </small></div></li>"), TS = /* @__PURE__ */ K("<details class=\"strategy-history strategy-review-history svelte-1ull9g0\"><summary>Independent review history <strong> </strong></summary><ol></ol></details>"), ES = /* @__PURE__ */ K("<details id=\"strategy-workspace\" class=\"strategy-workspace\"><summary><span><small>STRATEGY WORKSPACE</small><strong> </strong></span> <span class=\"strategy-workspace-state\"> </span></summary> <div class=\"strategy-workspace-body\"><div class=\"strategy-workspace-boundary\"><strong>Independent governance lane</strong> <p>Epoch and idea-search reviews run in one dedicated read-only Sol lane. Each request binds its strategy slot and token cap, and cannot interrupt the regular coordinator, change campaign phase, dispatch workers, or activate its own proposal.</p></div> <!> <!> <!> <!></div></details>");
function DS(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ I(null), u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ I(null), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I("epoch"), h = /* @__PURE__ */ I("operator"), g = /* @__PURE__ */ I(""), _ = /* @__PURE__ */ I("Review whether the current epoch is producing durable frontier motion and whether its portfolio should be rebalanced."), v = /* @__PURE__ */ I(""), y = /* @__PURE__ */ I("pending"), b = (e) => `${Math.round(Number(e || 0) * 100)}%`;
	async function x(e, t = "", n = {}) {
		if (!U(l) || U(f)) throw Error("Another strategy action is still settling");
		L(f, e), L(y, "pending"), L(v, e === "strategy.review.request" ? "Freezing the epoch ledger and starting an independent read-only Sol task…" : e === "strategy.proposal.activate" ? "Recording the charter revision and opening a fresh measurement epoch…" : "Keeping the current charter and closing this proposal…");
		try {
			let r = await ns({
				projectId: U(l).id,
				type: e,
				targetId: t,
				args: n,
				scope: "strategy-workspace",
				pollLimit: 160
			});
			return L(y, "success"), L(v, e === "strategy.review.request" ? "Independent epoch review started. The regular campaign coordinator and campaign phase were not changed." : e === "strategy.proposal.activate" ? "The new advisory charter is active in a fresh epoch. No work was dispatched." : "Proposal closed; the current charter remains active."), r.action;
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
	}), zr(), vo();
	var T = sa(), E = z(T), D = (e) => {
		var t = ES(), n = R(t), r = R(n), i = B(R(r)), x = R(i);
		P(i), P(r);
		var T = B(r, 2), E = R(T, !0);
		P(T), P(n);
		var D = B(n, 2), O = B(R(D), 2), k = (e) => {
			var t = lS(), n = R(t), r = B(R(n), 2), i = R(r, !0);
			P(r);
			var a = B(r, 2), o = R(a, !0);
			P(a), P(n);
			var s = B(n, 2), c = B(R(s));
			en(c), P(s);
			var d = B(s, 2), p = R(d), v = B(R(p)), y = R(v);
			y.value = y.__value = "epoch";
			var b = B(y);
			b.value = b.__value = "idea-search", P(v), P(p);
			var x = B(p, 2), C = B(R(x)), w = R(C);
			w.value = w.__value = "operator";
			var T = B(w);
			T.value = T.__value = "coordinator-request", P(C), P(x);
			var E = B(x, 2), D = (e) => {
				var t = cS(), n = B(R(t));
				Qa(n), P(t), so(n, () => U(g), (e) => L(g, e)), q(e, t);
			};
			Y(E, (e) => {
				U(h) === "coordinator-request" && e(D);
			}), P(d);
			var O = B(d, 2), k = R(O, !0);
			P(O), P(t), H((e) => {
				J(i, (U(l), W(() => U(l).strategy.epoch.label))), J(o, (U(l), W(() => U(l).strategy.charter.epoch?.objective || U(l).strategy.charter.thesis))), O.disabled = e, J(k, U(f) === "strategy.review.request" ? "Starting independent review…" : "Ask independent Sol strategist");
			}, [() => (U(f), U(u), U(_), U(h), U(g), W(() => !!U(f) || !U(u).reviewAvailable || !U(_).trim() || U(h) === "coordinator-request" && !U(g).trim()))]), so(c, () => U(_), (e) => L(_, e)), Va(v, () => U(m), (e) => L(m, e)), Va(C, () => U(h), (e) => L(h, e)), G("click", O, S), q(e, t);
		}, A = (e) => {
			var t = uS(), n = B(R(t), 2), r = R(n), i = R(r, !0);
			P(r);
			var a = B(r), o = R(a, !0);
			P(a);
			var s = B(a), c = R(s);
			P(s), P(n), P(t), H((e) => {
				J(i, (U(d), W(() => U(d).reviewKind === "idea-search" ? "Searching for independent directions" : "Reviewing the epoch ledger"))), J(o, (U(d), W(() => U(d).triggerReason))), J(c, `${U(d), W(() => U(d).requestSource) ?? ""} · cap ${e ?? ""} · frozen bundle ${U(d), W(() => U(d).bundleDigest || "being prepared") ?? ""}`);
			}, [() => (U(d), W(() => Number(U(d).resourceCap || 0).toLocaleString()))]), q(e, t);
		}, j = (e) => {
			var t = bS(), n = R(t), r = R(n), i = R(r), c = R(i);
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
				var n = dS(), r = R(n), i = R(r, !0);
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
			])), ga, (e, t) => {
				var n = hS(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = (e) => {
					var n = pS();
					X(n, 5, () => (U(t), W(() => U(t)[1])), ga, (e, t) => {
						var n = fS(), r = R(n, !0);
						P(n), H(() => J(r, U(t))), q(e, n);
					}), P(n), q(e, n);
				}, s = /* @__PURE__ */ F(() => (U(t), W(() => Array.isArray(U(t)[1]) && U(t)[1].length))), c = (e) => {
					q(e, mS());
				};
				Y(a, (e) => {
					U(s) ? e(o) : e(c, -1);
				}), P(n), H((e) => {
					Z(n, 1, e, "svelte-1ull9g0"), J(i, (U(t), W(() => U(t)[0])));
				}, [() => (U(t), W(() => `strategy-action-${String(U(t)[0]).toLowerCase()}`))]), q(e, n);
			}), P(D);
			var O = B(D, 2), k = (e) => {
				var t = _S(), n = R(t), r = R(n);
				P(n);
				var i = B(n);
				X(i, 5, () => (U(o), W(() => U(o).custodyCandidates)), ga, (e, t) => {
					var n = gS(), r = R(n), i = R(r, !0);
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
				var t = vS(), n = z(t), r = R(n);
				Qa(r), Ge(), P(n);
				var i = B(n, 2), a = R(i), o = B(a), s = R(o, !0);
				P(o), P(i), H((e, t) => {
					a.disabled = e, o.disabled = t, J(s, U(f) === "strategy.proposal.activate" ? "Activating revision…" : "Activate new epoch");
				}, [() => (U(f), W(() => !!U(f))), () => (U(p), U(f), W(() => !U(p) || !!U(f)))]), co(r, () => U(p), (e) => L(p, e)), G("click", a, w), G("click", o, C), q(e, t);
			}, ie = (e) => {
				var t = yS();
				H((e) => t.disabled = e, [() => (U(f), W(() => !!U(f)))]), G("click", t, w), q(e, t);
			};
			Y(ne, (e) => {
				U(u), W(() => U(u).activationAvailable) ? e(re) : e(ie, -1);
			}), P(A), P(t), H((e, t) => {
				J(c, `${e ?? ""} · ${U(a), W(() => U(a).assessment?.epochStatus || "COMPLETE") ?? ""}`), J(h, (U(a), W(() => U(a).summary || "Independent strategy proposal"))), J(_, t), J(x, (U(o), W(() => U(o).epochLabel))), J(T, (U(o), W(() => U(o).epochObjective))), J(M, (U(a), W(() => U(a).operatorDecision))), J(te, `Activation records revision ${U(l), W(() => U(l).strategy.charter.revision + 1) ?? ""} and resets measurement boundaries. Campaign phase and dispatch state remain unchanged.`);
			}, [() => (U(d), W(() => U(d).reviewKind?.replaceAll("-", " ") || "REVIEW")), () => (U(a), W(() => U(a).recommendation?.replaceAll("_", " ")))]), q(e, t);
		};
		Y(O, (e) => {
			U(d) ? (U(d), W(() => U(d).status === "drafting" || U(d).status === "queued") ? e(A, 1) : (U(d), W(() => U(d).status === "drafted") && e(j, 2))) : e(k);
		});
		var ee = B(O, 2), M = (e) => {
			var t = xS(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `strategy-workspace-feedback ${U(y) ?? ""}`, "svelte-1ull9g0"), J(n, U(v));
			}), q(e, t);
		};
		Y(ee, (e) => {
			U(v) && e(M);
		});
		var N = B(ee, 2), te = (e) => {
			var t = CS(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(u), W(() => U(u).charterHistory)), ga, (e, t) => {
				var n = SS(), r = R(n), i = R(r);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e) => {
					J(i, `REV ${U(t), W(() => U(t).revision) ?? ""}`), J(s, (U(t), W(() => U(t).charter.epoch?.label || "Campaign charter"))), J(l, `${U(t), W(() => U(t).actor) ?? ""} · ${e ?? ""}`);
				}, [() => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(u), W(() => U(u).charterHistory.length) ?? ""} revision${U(u), W(() => U(u).charterHistory.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(N, (e) => {
			U(u), W(() => U(u).charterHistory?.length) && e(te);
		});
		var ne = B(N, 2), re = (e) => {
			var t = TS(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(u), W(() => U(u).reviews)), ga, (e, t) => {
				var n = wS(), r = R(n), i = R(r, !0);
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
		Y(ne, (e) => {
			U(u), W(() => U(u).reviews?.length) && e(re);
		}), P(D), P(t), H(() => {
			t.open = U(c), J(x, `Charter revision ${U(l), W(() => U(l).strategy.charter.revision) ?? ""}`), J(E, (U(d), W(() => U(d)?.status === "drafting" ? "SOL REVIEW RUNNING" : U(d)?.status === "drafted" ? "HUMAN GATE" : "NO STRATEGY JOB RUNNING")));
		}), q(e, t);
	};
	Y(E, (e) => {
		U(l), U(u), W(() => U(l)?.strategy && U(u)) && e(D);
	}), q(e, T), bt(), i();
}
//#endregion
//#region src/ui/CustodyService.svelte
Xi(["click"]), Ho();
var OS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span>"), kS = /* @__PURE__ */ K("<li class=\"svelte-pcnttw\"> </li>"), AS = /* @__PURE__ */ K("<section><header class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">WHAT HAPPENED</span><strong class=\"svelte-pcnttw\"> </strong></header> <p class=\"svelte-pcnttw\"> </p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">RECOMMENDED NEXT</span><b class=\"svelte-pcnttw\"> </b></div> <small class=\"svelte-pcnttw\"> </small></section>"), jS = /* @__PURE__ */ K("<button class=\"primary-button compact svelte-pcnttw\"> </button>"), MS = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\"> </button>"), NS = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Contract reshape required</button>"), PS = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Queued · custody slot busy</button>"), FS = /* @__PURE__ */ K("<code class=\"svelte-pcnttw\"> </code>"), IS = /* @__PURE__ */ K("<b class=\"svelte-pcnttw\"> </b><p class=\"svelte-pcnttw\"> </p>", 1), LS = /* @__PURE__ */ K("<div class=\"custody-receipt-review svelte-pcnttw\"><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">MEASURED RESULT</span><strong class=\"svelte-pcnttw\"> </strong></div><b class=\"svelte-pcnttw\"> </b></header> <div class=\"custody-receipt-metrics svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span></div> <!> <details class=\"svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect checks, worktree, and immutable bindings</summary><div class=\"svelte-pcnttw\"><b class=\"svelte-pcnttw\">Producer</b><code class=\"svelte-pcnttw\"> </code><b class=\"svelte-pcnttw\">Worktree</b><code class=\"svelte-pcnttw\"> </code><!></div></details> <footer class=\"svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\">Reject result</button><button class=\"primary-button svelte-pcnttw\"> </button></footer> <small class=\"svelte-pcnttw\">Landing rechecks the exact receipt and clean checkout, then cherry-picks only the frozen producer commit. It never pushes or promotes a claim.</small></div>"), RS = /* @__PURE__ */ K("<div><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <strong class=\"svelte-pcnttw\"> </strong> <small class=\"svelte-pcnttw\"> </small></div> <!></div> <!>", 1), zS = /* @__PURE__ */ K("<button class=\"outline-button compact svelte-pcnttw\">Park</button> <button class=\"primary-button svelte-pcnttw\"> </button>", 1), BS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span><button class=\"outline-button compact svelte-pcnttw\">Park</button>", 1), VS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">Research continues independently while this isolated steward works.</span>"), HS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">The measured receipt above has no landing authority until you accept it.</span>"), US = /* @__PURE__ */ K("<button class=\"primary-button svelte-pcnttw\"> </button>"), WS = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><!> <!></div>"), GS = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"primary-button svelte-pcnttw\">Park until macOS is available</button></div>"), KS = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\"> </button><button class=\"primary-button svelte-pcnttw\"> </button></div>"), qS = /* @__PURE__ */ K("<div class=\"custody-footer-actions svelte-pcnttw\"><!></div>"), JS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\"> </span> <!>", 1), YS = /* @__PURE__ */ K("<span class=\"svelte-pcnttw\">Outside the active service queue.</span><button class=\"outline-button compact svelte-pcnttw\">Restore to inbox</button>", 1), XS = /* @__PURE__ */ K("<article><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><strong class=\"svelte-pcnttw\"> </strong></div> <b> </b></header> <p class=\"svelte-pcnttw\"> </p> <div class=\"custody-item-facts svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <!></div> <details class=\"custody-contract svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect acceptance contract <strong class=\"svelte-pcnttw\"> </strong></summary> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ACCEPT WHEN</span><ul class=\"svelte-pcnttw\"></ul></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ALLOWED PATHS</span><code class=\"svelte-pcnttw\"> </code></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">HARD STOP</span><p class=\"svelte-pcnttw\"> </p></div></details> <!> <!> <footer class=\"svelte-pcnttw\"><!></footer></article>"), ZS = /* @__PURE__ */ K("<div class=\"custody-inbox svelte-pcnttw\"></div>"), QS = /* @__PURE__ */ K("<div class=\"custody-empty svelte-pcnttw\"><strong class=\"svelte-pcnttw\">No custody contracts are queued</strong><p class=\"svelte-pcnttw\">Future strategy reviews can stage bounded candidates here. Until then, the service has no authority and consumes no resources.</p></div>"), $S = /* @__PURE__ */ K("<li class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><div class=\"svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><small class=\"svelte-pcnttw\"> </small></div></li>"), eC = /* @__PURE__ */ K("<details class=\"custody-protocol-history svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Custody lease and receipt history <strong> </strong></summary><ol class=\"svelte-pcnttw\"></ol></details>"), tC = /* @__PURE__ */ K("<p class=\"svelte-pcnttw\"> </p>"), nC = /* @__PURE__ */ K("<div class=\"custody-violations svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><!></div>"), rC = /* @__PURE__ */ K("<div role=\"status\"> </div>"), iC = /* @__PURE__ */ K("<details id=\"custody-service\" class=\"custody-service svelte-pcnttw\"><summary class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"><small class=\"svelte-pcnttw\">CUSTODY SERVICE</small><strong class=\"svelte-pcnttw\"> </strong></span> <span class=\"custody-summary-counts svelte-pcnttw\"><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><i class=\"svelte-pcnttw\">SEPARATE EXECUTOR</i></span></summary> <div class=\"custody-body svelte-pcnttw\"><div class=\"custody-boundary svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ADAPTER</span><strong class=\"svelte-pcnttw\">Terra local steward</strong><small class=\"svelte-pcnttw\"> </small></div> <p class=\"svelte-pcnttw\">Terra may repair small mechanical or mathematical mistakes only inside the listed paths and acceptance checks. It cannot choose direction, spawn children, promote claims, merge, or push.</p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">AUTOPILOT RULE</span><strong class=\"svelte-pcnttw\">Land verified custody</strong><small class=\"svelte-pcnttw\">active loop may dispatch · only exact landable receipts integrate</small></div></div> <!> <!> <!> <!></div></details>");
function aC(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt(), a = /* @__PURE__ */ I(), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(""), l = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I("pending");
	function d(e) {
		let t = String(U(o)?.loop?.error || "");
		return /automatic retry limit/i.test(t) && (!e.task || t.includes(e.task));
	}
	function f(e) {
		return (U(s)?.protocol?.leases || []).filter((t) => t.itemId === e.id);
	}
	function p(e) {
		let t = f(e), n = [e.receipt, ...t.map((e) => e.receipt)].filter(Boolean).sort((e, t) => (t?.checks?.length || 0) - (e?.checks?.length || 0))[0] || {}, r = t.find((e) => Number.isFinite(Number(e.receipt?.usage?.tokens)))?.receipt?.usage?.tokens;
		return d(e) ? {
			state: "CONTRACT TOO LARGE",
			summary: "Four bounded attempts stopped without landing campaign changes. Lease integrity and the frozen producer blobs were verified, but the consolidated replay crossed its token ceiling and combines too many checks for one custody turn.",
			next: "Stop at this boundary. Keep the dependency, then split manifest/provenance verification from the exact replay and resource-scope check.",
			attempts: t.length,
			tokens: r,
			kind: "reshape"
		} : ks(e) ? {
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
				await ns({
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
				await ns({
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
				let i = await ns({
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
					t?.status === "ready" && !t.activeLease && (i = await ns({
						projectId: U(o).id,
						type: "custody.lease.prepare",
						targetId: e.id,
						scope: "custody-service-retry"
					}));
					let n = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					n?.status === "prepared" && (i = await ns({
						projectId: U(o).id,
						type: "custody.lease.confirm",
						targetId: n.id,
						args: { leaseDigest: n.leaseDigest },
						scope: "custody-service-retry"
					}));
					let r = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					r?.status === "confirmed" && await ns({
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
	}), zr(), vo();
	var v = sa(), y = z(v), b = (e) => {
		var t = iC(), n = R(t), r = R(n), i = B(R(r)), f = R(i, !0);
		P(i), P(r);
		var v = B(r, 2), y = R(v), b = R(y);
		P(y);
		var x = B(y), S = R(x);
		P(x), Ge(), P(v), P(n);
		var C = B(n, 2), w = R(C), T = R(w), E = B(R(T), 2), D = R(E, !0);
		P(E), P(T), Ge(4), P(w);
		var O = B(w, 2), k = (e) => {
			var t = ZS();
			X(t, 5, () => U(a), (e) => e.id, (e, t) => {
				let n = /* @__PURE__ */ Sn(() => (U(t), W(() => p(U(t))))), r = /* @__PURE__ */ Sn(() => (U(t), W(() => m(U(t))))), i = /* @__PURE__ */ Sn(() => (xi(As), U(t), W(() => As(U(t))))), a = /* @__PURE__ */ Sn(() => (xi(ks), U(t), U(o), W(() => ks(U(t), String(U(o)?.loop?.error || "")))));
				var l = XS();
				let u;
				var f = R(l), v = R(f), y = R(v), b = R(y);
				P(y);
				var x = B(y), S = R(x, !0);
				P(x), P(v);
				var C = B(v, 2), w = R(C, !0);
				P(C), P(f);
				var T = B(f, 2), E = R(T, !0);
				P(T);
				var D = B(T, 2), O = R(D), k = R(O, !0);
				P(O);
				var A = B(O, 2), j = R(A);
				P(A);
				var ee = B(A, 2), M = R(ee);
				P(ee);
				var N = B(ee, 2), te = R(N, !0);
				P(N);
				var ne = B(N, 2), re = (e) => {
					var n = OS(), r = R(n);
					P(n), H(() => J(r, `waiting on ${U(t), W(() => U(t).missingDependencies?.length || 1) ?? ""} predecessor receipt${U(t), W(() => U(t).missingDependencies?.length === 1 ? "" : "s") ?? ""}`)), q(e, n);
				};
				Y(ne, (e) => {
					U(t), W(() => !U(t).dependenciesSatisfied) && e(re);
				}), P(D);
				var ie = B(D, 2), ae = R(ie), oe = B(R(ae)), se = R(oe, !0);
				P(oe), P(ae);
				var ce = B(ae, 2), le = B(R(ce));
				X(le, 5, () => (U(t), W(() => U(t).acceptance.acceptanceCriteria)), ga, (e, t) => {
					var n = kS(), r = R(n, !0);
					P(n), H(() => J(r, U(t))), q(e, n);
				}), P(le), P(ce);
				var ue = B(ce, 2), de = B(R(ue)), fe = R(de, !0);
				P(de), P(ue);
				var pe = B(ue, 2), me = B(R(pe)), he = R(me, !0);
				P(me), P(pe), P(ie);
				var ge = B(ie, 2), _e = (e) => {
					var t = AS(), r = R(t), i = B(R(r)), a = R(i, !0);
					P(i), P(r);
					var o = B(r, 2), s = R(o, !0);
					P(o);
					var c = B(o, 2), l = B(R(c)), u = R(l, !0);
					P(l), P(c);
					var d = B(c, 2), f = R(d);
					P(d), P(t), H((e) => {
						Z(t, 1, (xi(U(n)), W(() => `custody-failure ${U(n).kind}`)), "svelte-pcnttw"), J(a, (xi(U(n)), W(() => U(n).state))), J(s, (xi(U(n)), W(() => U(n).summary))), J(u, (xi(U(n)), W(() => U(n).next))), J(f, `${xi(U(n)), W(() => U(n).attempts) ?? ""} lease attempt${xi(U(n)), W(() => U(n).attempts === 1 ? "" : "s") ?? ""}${e ?? ""} · 0 changes landed`);
					}, [() => (xi(U(n)), W(() => U(n).tokens ? ` · latest measured ${Number(U(n).tokens).toLocaleString()} tokens` : ""))]), q(e, t);
				}, ve = /* @__PURE__ */ F(() => (U(t), W(() => ["blocked", "failed"].includes(U(t).status))));
				Y(ge, (e) => {
					U(ve) && e(_e);
				});
				var ye = B(ge, 2), be = (e) => {
					var n = RS(), o = z(n);
					let s;
					var l = R(o), u = R(l), d = R(u, !0);
					P(u);
					var f = B(u, 2), p = R(f, !0);
					P(f);
					var m = B(f, 2), h = R(m, !0);
					P(m), P(l);
					var v = B(l, 2), y = (e) => {
						var n = jS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).id}:lease.prepare` ? "Freezing…" : "Freeze custody lease")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.prepare")), q(e, n);
					}, b = (e) => {
						var n = MS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.simulate` ? "Simulating…" : "Simulate zero-effect receipt")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.simulate")), q(e, n);
					}, x = (e) => {
						var n = sa(), r = z(n), a = (e) => {
							var n = jS(), r = R(n, !0);
							P(n), H((e) => {
								n.disabled = e, J(r, (U(c), U(t), xi(U(i)), W(() => U(c) === `${U(t).id}:reshape` ? "Splitting…" : `Split into ${U(i).length} bounded checks`)));
							}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => g(U(t), U(i))), q(e, n);
						}, o = (e) => {
							q(e, NS());
						};
						Y(r, (e) => {
							xi(U(i)), W(() => U(i).length) ? e(a) : e(o, -1);
						}), q(e, n);
					}, S = (e) => {
						q(e, PS());
					}, C = (e) => {
						var n = jS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.confirm` ? "Confirming…" : "Confirm exact lease")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.confirm")), q(e, n);
					}, w = (e) => {
						var n = jS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.dispatch` ? "Starting…" : "Dispatch Terra steward")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.dispatch")), q(e, n);
					}, T = (e) => {
						var n = MS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.reconcile` ? "Reconciling…" : "Recheck interrupted steward")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.reconcile")), q(e, n);
					}, E = /* @__PURE__ */ F(() => (U(t), W(() => ["running", "finalizing"].includes(U(t).activeLease.status) && Date.now() - Date.parse(U(t).activeLease.updatedAt || U(t).activeLease.startedAt || "") >= 6e4))), D = (e) => {
						var n = MS(), r = R(n, !0);
						P(n), H((e) => {
							n.disabled = e, J(r, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:lease.replay` ? "Verifying replay…" : "Replay & verify receipt")));
						}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => _(U(t), "lease.replay")), q(e, n);
					};
					Y(v, (e) => {
						U(t), W(() => !U(t).activeLease) ? e(y) : (U(t), W(() => U(t).activeLease.lease?.adapter?.executionMode === "disconnected" && U(t).activeLease.status === "prepared") ? e(b, 1) : (U(t), xi(U(a)), W(() => U(t).activeLease.status === "prepared" && U(a)) ? e(x, 2) : (U(t), xi(U(r)), W(() => U(t).activeLease.status === "prepared" && U(r)) ? e(S, 3) : (U(t), W(() => U(t).activeLease.status === "prepared") ? e(C, 4) : (U(t), W(() => U(t).activeLease.status === "confirmed") ? e(w, 5) : U(E) ? e(T, 6) : (U(t), W(() => U(t).activeLease.status === "simulated") && e(D, 7)))))));
					}), P(o);
					var O = B(o, 2), k = (e) => {
						var n = LS(), r = R(n), i = R(r), a = B(R(i)), o = R(a, !0);
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
							var n = FS(), r = R(n, !0);
							P(n), H((e) => J(r, e), [() => (U(t), W(() => U(t).activeLease.receipt.effects.changedPaths.join(" · ")))]), q(e, n);
						};
						Y(b, (e) => {
							U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length) && e(x);
						});
						var S = B(b, 2), C = B(R(S)), w = B(R(C)), T = R(w, !0);
						P(w);
						var E = B(w, 2), D = R(E, !0);
						P(E), X(B(E), 1, () => (U(t), W(() => U(t).activeLease.receipt?.checks || [])), ga, (e, t) => {
							var n = IS(), r = z(n), i = R(r, !0);
							P(r);
							var a = B(r), o = R(a, !0);
							P(a), H(() => {
								J(i, (U(t), W(() => U(t).status))), J(o, (U(t), W(() => U(t).detail)));
							}), q(e, n);
						}), P(C), P(S);
						var O = B(S, 2), k = R(O), A = B(k), j = R(A, !0);
						P(A), P(O), Ge(2), P(n), H((e, n, r) => {
							J(o, (U(t), W(() => U(t).activeLease.receipt?.summary || "Custody result ready"))), J(l, (U(t), W(() => U(t).activeLease.receipt?.status))), J(f, `${U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length || 0) ?? ""} changed path${U(t), W(() => U(t).activeLease.receipt?.effects?.changedPaths?.length === 1 ? "" : "s") ?? ""}`), J(m, `${U(t), W(() => U(t).activeLease.receipt?.usage?.tokens ?? "unmetered") ?? ""} tokens`), J(g, `${e ?? ""} min`), J(y, `${U(t), W(() => U(t).activeLease.verification?.warnings?.length || 0) ?? ""} warning${U(t), W(() => U(t).activeLease.verification?.warnings?.length === 1 ? "" : "s") ?? ""}`), J(T, (U(t), W(() => U(t).activeLease.producerCommit || "verification-only · no file commit"))), J(D, (U(t), W(() => U(t).activeLease.worktreePath))), k.disabled = n, A.disabled = r, J(j, (U(c), U(t), W(() => U(c) === `${U(t).activeLease.id}:receipt.land` ? "Landing…" : U(t).activeLease.producerCommit ? "Accept & land locally" : "Accept verification receipt")));
						}, [
							() => (U(t), W(() => Math.ceil(U(t).activeLease.receipt?.usage?.minutes || 0))),
							() => (U(c), W(() => !!U(c))),
							() => (U(c), U(t), W(() => !!U(c) || !U(t).activeLease.verification?.landable))
						]), G("click", k, () => _(U(t), "receipt.reject")), G("click", A, () => _(U(t), "receipt.land")), q(e, n);
					};
					Y(O, (e) => {
						U(t), W(() => U(t).activeLease?.status === "awaiting_review") && e(k);
					}), H(() => {
						s = Z(o, 1, "custody-protocol-lab execution svelte-pcnttw", null, s, { attention: U(t).activeLease?.status === "awaiting_review" }), J(d, (U(t), xi(U(a)), xi(U(r)), W(() => U(t).activeLease?.status === "prepared" && U(a) ? "CONTRACT RESHAPE REQUIRED" : U(t).activeLease?.status === "prepared" && U(r) ? "QUEUED CUSTODY LEASE" : U(t).activeLease?.status === "awaiting_review" ? "RECEIPT LANDING GATE" : U(t).activeLease?.status === "running" || U(t).activeLease?.status === "finalizing" ? "ISOLATED STEWARD ACTIVE" : "CUSTODY ACTION RAIL"))), J(p, (U(t), xi(U(a)), xi(U(i)), xi(U(r)), W(() => U(t).activeLease ? U(t).activeLease.status === "prepared" && U(a) ? U(i).length ? `Replace with ${U(i).length} bounded successor checks` : "Hold for a smaller successor contract" : U(t).activeLease.status === "prepared" && U(r) ? `Waiting for ${U(r).task}` : U(t).activeLease.status === "prepared" ? "2. Confirm this revision and contract" : U(t).activeLease.status === "confirmed" ? "3. Dispatch one bounded Terra steward" : U(t).activeLease.status === "running" ? "Steward working in detached custody" : U(t).activeLease.status === "finalizing" ? "Measuring paths, usage, and checks" : U(t).activeLease.status === "awaiting_review" ? "4. Review and land—or reject" : `Lease ${U(t).activeLease.status}` : "1. Freeze the exact lease"))), J(h, (U(t), xi(U(a)), xi(U(r)), W(() => U(t).activeLease?.status === "prepared" && U(a) ? "Prior zero-effect attempts exceeded the lease. This supersedes the prepared retry without bypassing its dependency." : U(t).activeLease?.status === "prepared" && U(r) ? "This immutable lease is preserved. Autopilot will continue it after the active receipt releases the single Terra slot." : U(t).activeLease?.receiptDigest || U(t).activeLease?.leaseDigest || "Preparing a lease changes no files and starts no worker.")));
					}), q(e, n);
				}, xe = /* @__PURE__ */ F(() => (U(t), W(() => [
					"ready",
					"assigned",
					"verifying"
				].includes(U(t).status))));
				Y(ye, (e) => {
					U(xe) && e(be);
				});
				var Se = B(ye, 2), Ce = R(Se), we = (e) => {
					var n = zS(), r = z(n), i = B(r, 2), a = R(i, !0);
					P(i), H((e, n) => {
						r.disabled = e, i.disabled = n, J(a, (U(c), U(t), W(() => U(c) === `${U(t).id}:promote` ? "Checking contract…" : U(t).dependenciesSatisfied ? "Mark ready for steward" : `Waiting for ${U(t).missingDependencies?.[0]?.task || "predecessor"}`)));
					}, [() => (U(c), W(() => !!U(c))), () => (U(c), U(t), W(() => !!U(c) || !U(t).eligibleToReady))]), G("click", r, () => _(U(t), "park")), G("click", i, () => _(U(t), "promote")), q(e, n);
				}, Te = (e) => {
					var n = BS(), r = z(n), i = R(r, !0);
					P(r);
					var a = B(r);
					H((e) => {
						J(i, (U(t), W(() => U(t).activeLease ? "Lease sequence is controlled above." : "Eligible for the separate custody executor; still not dispatched."))), a.disabled = e;
					}, [() => (U(c), U(t), W(() => !!U(c) || !!U(t).activeLease))]), G("click", a, () => _(U(t), "park")), q(e, n);
				}, Ee = (e) => {
					q(e, VS());
				}, De = (e) => {
					q(e, HS());
				}, Oe = (e) => {
					var r = JS(), a = z(r), s = R(a, !0);
					P(a);
					var l = B(a, 2), u = (e) => {
						var n = WS(), r = R(n), a = (e) => {
							var n = US(), r = R(n, !0);
							P(n), H((e) => {
								n.disabled = e, J(r, (U(c), U(t), xi(U(i)), W(() => U(c) === `${U(t).id}:reshape` ? "Splitting…" : `Split into ${U(i).length} bounded checks`)));
							}, [() => (U(c), W(() => !!U(c)))]), G("click", n, () => g(U(t), U(i))), q(e, n);
						};
						Y(r, (e) => {
							xi(U(i)), W(() => U(i).length) && e(a);
						});
						var s = B(r, 2), l = (e) => {
							var t = MS(), n = R(t, !0);
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
					}, f = (e) => {
						var n = GS(), r = R(n);
						P(n), H((e) => r.disabled = e, [() => (U(c), W(() => !!U(c)))]), G("click", r, () => _(U(t), "park")), q(e, n);
					}, p = (e) => {
						var n = KS(), r = R(n), i = R(r, !0);
						P(r);
						var a = B(r), o = R(a, !0);
						P(a), P(n), H((e, n) => {
							r.disabled = e, J(i, (U(t), W(() => U(t).blocksResearch ? "Remove dependency…" : "Park"))), a.disabled = n, J(o, U(c) ? "Starting Terra…" : "Retry with Terra");
						}, [() => (U(c), W(() => !!U(c))), () => (U(c), U(t), W(() => !!U(c) || !U(t).eligibleToRetry))]), G("click", r, () => _(U(t), "park")), G("click", a, () => _(U(t), "promote", !0)), q(e, n);
					}, m = (e) => {
						var t = qS(), n = R(t), r = (e) => {
							var t = MS(), n = R(t, !0);
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
					Y(l, (e) => {
						xi(U(n)), W(() => U(n).kind === "reshape") ? e(u) : (xi(U(n)), W(() => U(n).kind === "wait-for-mac") ? e(f, 1) : (xi(U(n)), W(() => U(n).kind === "retry") ? e(p, 2) : e(m, -1)));
					}), H((e) => J(s, e), [() => (U(t), W(() => d(U(t)) ? "Automatic retries are exhausted. Split or resize this exact contract; parking would bypass the dependency." : U(t).receipt?.effects?.changedPaths?.length ? "The steward stopped after bounded changes; inspect before retrying." : "Nothing landed. Retry the same bounded contract, or park only if this dependency is no longer wanted."))]), q(e, r);
				}, ke = /* @__PURE__ */ F(() => (U(t), W(() => ["blocked", "failed"].includes(U(t).status)))), Ae = (e) => {
					var n = YS(), r = B(z(n));
					H((e) => r.disabled = e, [() => (U(c), W(() => !!U(c)))]), G("click", r, () => _(U(t), "restore")), q(e, n);
				};
				Y(Ce, (e) => {
					U(t), W(() => U(t).status === "proposed") ? e(we) : (U(t), W(() => U(t).status === "ready") ? e(Te, 1) : (U(t), W(() => U(t).status === "assigned") ? e(Ee, 2) : (U(t), W(() => U(t).status === "verifying") ? e(De, 3) : U(ke) ? e(Oe, 4) : (U(t), W(() => U(t).status === "parked") && e(Ae, 5)))));
				}), P(Se), P(l), H((e, n) => {
					u = Z(l, 1, "svelte-pcnttw", null, u, {
						blocking: U(t).blocksResearch,
						parked: U(t).status === "parked"
					}), J(b, `${U(t), W(() => U(t).urgency) ?? ""} · ${U(t), W(() => U(t).capability) ?? ""} · ${U(t), W(() => U(t).strategicTrack) ?? ""}`), J(S, (U(t), W(() => U(t).task))), Z(C, 1, (U(t), W(() => `custody-status-${U(t).status}`)), "svelte-pcnttw"), J(w, e), J(E, (U(t), W(() => U(t).reason))), J(k, (U(t), W(() => U(t).blocksResearch ? "BLOCKS RESEARCH" : "NON-BLOCKING"))), J(j, `repair generation ${U(t), W(() => U(t).repairGeneration) ?? ""}/${U(s), W(() => U(s).policy.maxAutomaticRepairGeneration) ?? ""}`), J(M, `${U(t), W(() => U(t).effortClass) ?? ""} effort`), J(te, (U(t), W(() => U(t).contractComplete ? "contract complete" : "contract incomplete"))), J(se, (U(t), W(() => U(t).acceptance.receiptType || "receipt missing"))), J(fe, n), J(he, (U(t), W(() => U(t).acceptance.stopCondition || "No stop condition declared")));
				}, [() => (U(t), W(() => U(t).status.toUpperCase())), () => (U(t), W(() => U(t).acceptance.allowedPaths.length ? U(t).acceptance.allowedPaths.join(" · ") : "No paths declared"))]), q(e, l);
			}), P(t), q(e, t);
		}, A = (e) => {
			q(e, QS());
		};
		Y(O, (e) => {
			U(a), W(() => U(a).length) ? e(k) : e(A, -1);
		});
		var j = B(O, 2), ee = (e) => {
			var t = eC(), n = R(t), r = B(R(n)), i = R(r);
			P(r), P(n);
			var a = B(n);
			X(a, 5, () => (U(s), W(() => U(s).protocol.leases)), ga, (e, t) => {
				var n = $S(), r = R(n), i = R(r, !0);
				P(r);
				var a = B(r), o = R(a), s = R(o, !0);
				P(o);
				var c = B(o), l = R(c);
				P(c), P(a), P(n), H((e, n) => {
					J(i, e), J(s, (U(t), W(() => U(t).receiptDigest || U(t).leaseDigest))), J(l, `${U(t), W(() => U(t).adapterId) ?? ""} · ${n ?? ""}${U(t), W(() => U(t).producerCommit ? " · isolated commit frozen" : U(t).verification?.ok ? " · receipt verified" : "") ?? ""}`);
				}, [() => (U(t), W(() => U(t).status.toUpperCase())), () => (U(t), W(() => new Date(U(t).createdAt).toLocaleString()))]), q(e, n);
			}), P(a), P(t), H(() => J(i, `${U(s), W(() => U(s).protocol.leases.length) ?? ""} lease${U(s), W(() => U(s).protocol.leases.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(j, (e) => {
			U(s), W(() => U(s).protocol?.leases?.length) && e(ee);
		});
		var M = B(j, 2), N = (e) => {
			var t = nC(), n = R(t), r = R(n);
			P(n), X(B(n), 1, () => (U(s), W(() => U(s).violations)), ga, (e, t) => {
				var n = tC(), r = R(n, !0);
				P(n), H(() => J(r, (U(t), W(() => U(t).detail)))), q(e, n);
			}), P(t), H(() => J(r, `${U(s), W(() => U(s).violations.length) ?? ""} contract warning${U(s), W(() => U(s).violations.length === 1 ? "" : "s") ?? ""}`)), q(e, t);
		};
		Y(M, (e) => {
			U(s), W(() => U(s).violations?.length) && e(N);
		});
		var te = B(M, 2), ne = (e) => {
			var t = rC(), n = R(t, !0);
			P(t), H(() => {
				Z(t, 1, `custody-feedback ${U(u) ?? ""}`, "svelte-pcnttw"), J(n, U(l));
			}), q(e, t);
		};
		Y(te, (e) => {
			U(l) && e(ne);
		}), P(C), P(t), H(() => {
			t.open = (U(s), W(() => U(s).counts.open > 0)), J(f, (U(s), W(() => U(s).counts.open ? `${U(s).counts.open} item${U(s).counts.open === 1 ? "" : "s"} in the service inbox` : "Mechanical work has its own boundary"))), J(b, `${U(s), W(() => U(s).counts.blocking) ?? ""} blocking`), J(S, `${U(s), W(() => U(s).counts.active) ?? ""} active`), J(D, (U(s), W(() => U(s).executorConnected ? "ready on demand · isolated worktree" : "simulation only")));
		}), q(e, t);
	};
	Y(y, (e) => {
		U(s) && e(b);
	}), q(e, v), bt(), i();
}
//#endregion
//#region src/ui/App.svelte
Xi(["click"]), Ho();
var oC = /* @__PURE__ */ K("<span class=\"access-identity\"><b> </b> </span>"), sC = /* @__PURE__ */ K("<section id=\"observer-lanes\" class=\"observer-surface all-jobs-surface\" aria-label=\"All observed agent lanes\"><header><div><p class=\"eyebrow\">ALL JOBS OVERVIEW</p><h2>Every visible lane, in one place</h2></div><span>Read-only across projects · choose a campaign to open its controls</span></header> <!></section>"), cC = /* @__PURE__ */ K("<!> <!> <!> <!> <details class=\"autopilot-ledger\"><summary><span><small>AUTOPILOT DETAIL</small><strong>Step ledger, frozen schedule, and advanced controls</strong></span><b>Expand</b></summary> <!></details> <!> <section class=\"workspace-switchboard\" aria-label=\"Campaign detail drawers\"><header><div><p class=\"eyebrow\">CAMPAIGN DETAIL</p><h2>Context stays close without crowding the controls</h2></div><span>Open only what you need</span></header> <details id=\"campaign-context\" class=\"workspace-group\"><summary><span><small>OBJECTIVE & INPUTS</small><strong>Campaign grounding, interpretation, and packet inbox</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details> <details id=\"process-history\" class=\"workspace-group\"><summary><span><small>PROCESS MAP & HISTORY</small><strong>Full branching map, event replay, and campaign epochs</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!></div></details> <details id=\"evidence-workspace\" class=\"workspace-group\"><summary><span><small>WAVE & EVIDENCE</small><strong>Accounting, custody, and observed workers</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <section id=\"observer-lanes\" class=\"observer-surface\" aria-label=\"Observed agent lanes\"><header><div><p class=\"eyebrow\">LANE OBSERVER</p><h2>Workers, receipts, and recent history</h2></div><span>Drill down without leaving campaign control</span></header> <!></section></div></details> <details id=\"strategy-workspaces\" class=\"workspace-group\"><summary><span><small>STRATEGY & BRANCHES</small><strong>Portfolio, resources, independent review, and redirects</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <!> <!></div></details> <details id=\"system-workspace\" class=\"workspace-group\"><summary><span><small>SYSTEM & COORDINATION</small><strong>Future-run settings, access, quotas, and Sol console</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details></section>", 1), lC = /* @__PURE__ */ K("<header class=\"topbar\"><a class=\"topbar-brand\" href=\"/\" title=\"Open all jobs\"><p class=\"eyebrow\">CAMPAIGN CONTROL</p> <h1>Lane Watch</h1></a> <!> <div class=\"connection-wrap\"><!> <button aria-label=\"Refresh all campaign and lane states\">↻</button> <span></span> <span> </span></div></header> <main><!></main>", 1);
function uC(e, t) {
	yt(t, !1);
	let n = () => Gt(Vo, "$campaignState", r), [r, i] = Kt();
	wo(() => {
		let e = Bo(), t = ss();
		return () => {
			e(), t();
		};
	}), vo();
	var a = lC(), o = z(a), s = R(o), c = B(s, 2);
	vx(c, {});
	var l = B(c, 2), u = R(l), d = (e) => {
		var t = oC(), r = R(t), i = R(r, !0);
		P(r);
		var a = B(r, 1, !0);
		P(t), H((e) => {
			to(t, "title", e), J(i, n().access.role), J(a, n().access.identity);
		}, [() => `${n().access.projects.includes("*") ? "Read all projects" : `Read ${n().access.projects.join(", ")}`} · ${n().access.mutableProjects.includes("*") ? "change all projects" : `change ${n().access.mutableProjects.join(", ") || "none"}`}`]), q(e, t);
	};
	Y(u, (e) => {
		n().access && e(d);
	});
	var f = B(u, 2);
	let p;
	var m = B(f, 2);
	let h;
	var g = B(m, 2), _ = R(g, !0);
	P(g), P(l), P(o);
	var v = B(o, 2), y = R(v), b = (e) => {
		var t = sC();
		Ds(B(R(t), 2), {}), P(t), q(e, t);
	}, x = (e) => {
		var t = cC(), n = z(t);
		xx(n, {});
		var r = B(n, 2);
		Yx(r, {});
		var i = B(r, 2);
		Px(i, {});
		var a = B(i, 2);
		qs(a, {});
		var o = B(a, 2);
		gx(B(R(o), 2), {}), P(o);
		var s = B(o, 2);
		Dx(s, {});
		var c = B(s, 2), l = B(R(c), 2), u = B(R(l), 2), d = R(u);
		Qs(d, {}), Cc(B(d, 2), {}), P(u), P(l);
		var f = B(l, 2), p = B(R(f), 2);
		Kb(R(p), {}), P(p), P(f);
		var m = B(f, 2), h = B(R(m), 2), g = R(h);
		fl(g, {});
		var _ = B(g, 2);
		aC(_, {});
		var v = B(_, 2);
		Ds(B(R(v), 2), {}), P(v), P(h), P(m);
		var y = B(m, 2), b = B(R(y), 2), x = R(b);
		Vx(x, {});
		var S = B(x, 2);
		sS(S, {});
		var C = B(S, 2);
		DS(C, {}), Fc(B(C, 2), {}), P(b), P(y);
		var w = B(y, 2), T = B(R(w), 2), E = R(T);
		ol(E, {}), Xc(B(E, 2), {}), P(T), P(w), P(c), q(e, t);
	};
	Y(y, (e) => {
		n().selectedProject ? e(x, -1) : e(b);
	}), P(v), H(() => {
		p = Z(f, 1, "refresh-button", null, p, { refreshing: n().connection === "refreshing" }), f.disabled = n().connection === "refreshing" || n().access?.canMutate === !1, to(f, "title", n().access?.canMutate === !1 ? "Viewer access is read-only" : "Refresh all campaign and lane states"), h = Z(m, 1, "connection-dot", null, h, {
			connecting: n().connection === "connecting" || n().connection === "refreshing",
			offline: n().connection === "offline" || n().connection === "reconnecting"
		}), J(_, n().connectionLabel);
	}), G("click", s, (e) => {
		e.preventDefault(), No("");
	}), G("click", f, () => Ro().catch(() => void 0)), q(e, a), bt(), i();
}
//#endregion
//#region src/ui/main.ts
Xi(["click"]), ca(uC, { target: document.querySelector("#app") });
//#endregion
