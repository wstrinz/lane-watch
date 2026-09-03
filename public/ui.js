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
})), T, E, D, O, k, A, j, ee, te, M, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve = t((() => {
	T = 1 << 24, E = 1024, D = 2048, O = 4096, k = 8192, A = 16384, j = 32768, ee = 1 << 25, te = 65536, M = 1 << 19, ne = 1 << 20, re = 1 << 25, ie = 65536, ae = 1 << 21, oe = 1 << 22, se = 1 << 23, ce = Symbol("$state"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = Symbol("form reset"), ge = new class extends Error {
		name = "StaleReactionError";
		message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
	}(), _e = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
}));
function ye(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
var be = t((() => {
	i();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function xe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Se(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ce(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function we() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Te(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Ee() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function De(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Oe() {
	throw Error("https://svelte.dev/e/set_context_after_init");
}
function ke() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ae() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function je() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Me() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
var Ne = t((() => {
	i(), be();
})), Pe, Fe, Ie, Le = t((() => {
	Pe = {}, Fe = Symbol("uninitialized"), Ie = "http://www.w3.org/1999/xhtml";
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
	if (e === null) throw ze(), Pe;
	return Xe = e;
}
function Ge() {
	return We(/* @__PURE__ */ vr(Xe));
}
function N(e) {
	if (Ye) {
		if (/* @__PURE__ */ vr(Xe) !== null) throw ze(), Pe;
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
	if (!e || e.nodeType !== 8) throw ze(), Pe;
	return e.data;
}
var Ye, Xe, Ze = t((() => {
	ve(), Le(), He(), Or(), Ye = !1;
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
	ut(), ve(), ri(), Ii();
})), ft = t((() => {
	i(), w(), be();
}));
//#endregion
//#region node_modules/svelte/src/internal/shared/context.js
function pt(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function mt(e, t) {
	return e === null && ye(t), e.c ??= new Map(pt(e) || void 0);
}
var ht = t((() => {
	be();
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
		!Ei && r & 32 && !Ct.i || Oe();
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
	i(), Ne(), Ii(), ri(), at(), ve(), ht(), Ct = null;
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
	if (t === null) return Ei.f |= se, e;
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
	i(), Le(), Or(), ve(), w(), Ii();
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
	ve(), Ft = ~(D | O | E);
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Lt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ie, Lt(t.deps));
}
function Rt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Lt(e.deps), Nt(e, E);
}
var zt = t((() => {
	ve(), It();
}));
//#endregion
//#region node_modules/svelte/src/store/utils.js
function Bt(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), C;
	let r = U(() => e.subscribe(t, n));
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
		source: /* @__PURE__ */ F(void 0),
		unsubscribe: C
	};
	if (r.store !== e && !(Zt in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = C;
		else {
			var i = !0;
			r.unsubscribe = Bt(e, (e) => {
				i ? r.source.v = e : I(r.source, e);
			}), i = !1;
		}
	}
	return e && Zt in n ? Ut(e) : H(r.source);
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
	ve(), ut(), Ii();
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
			if (!e.defaultPrevented) for (let t of e.target.elements) t[he]?.();
		});
	}, { capture: !0 }));
}
var rn, an = t((() => {
	Ze(), Or(), kt(), ve(), rn = !1;
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
	let i = e[he];
	i ? e[he] = () => {
		i(), r(!0);
	} : e[he] = () => r(!0), nn();
}
var ln = t((() => {
	ri(), Ii(), ve(), an();
}));
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function un(e) {
	let t = 0, n = er(0), r;
	return () => {
		Mr() && (H(n), Hr(() => (t === 0 && (r = U(() => e(() => ir(n)))), t += 1, () => {
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
	ve(), Le(), wt(), Mt(), ri(), Ii(), Ze(), kt(), Ne(), He(), i(), $n(), lr(), dt(), dn(), Or(), zt(), pn = te | M, mn = class {
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
				t = !0, n && Me(), this.#s !== null && Qr(this.#s, () => {
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
			return this.#h(), H(this.#m);
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
	ve(), i(), wt(), hn(), Mt(), Ii(), $n(), An(), ri(), kt();
}));
/*#__NO_SIDE_EFFECTS__*/
function xn(e) {
	var t = 2 | D;
	return Oi !== null && (Oi.f |= M), {
		ctx: Ct,
		deps: null,
		effects: null,
		equals: Qe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Fe,
		wv: 0,
		parent: Oi,
		ac: null
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Sn(e, t, n) {
	let r = Oi;
	r === null && xe();
	var i = void 0, a = er(Fe), o = !Ei, s = /* @__PURE__ */ new Set();
	return Vr(() => {
		var t = Oi, n = c();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ge && n.reject(e);
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
			u?.(), s.delete(n), t !== kn && (l.activate(), t ? (a.f |= se, nr(a, t)) : (a.f & 8388608 && (a.f ^= se), nr(a, e)), l.deactivate());
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
function P(e) {
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
	if (!Ti && r !== null && e.v !== Fe && r.f & 24576) return Re(), e.v;
	ci(r);
	try {
		e.f &= ~ie, wn(e), t = hi(e);
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
		t.ac.abort(ge), t.ac = null;
	}), t.fn !== null && (t.teardown = C), _i(t, 0), qr(t));
}
function On(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && vi(t);
}
var kn, An = t((() => {
	i(), ve(), Ii(), ln(), tt(), Ne(), He(), ri(), lr(), ft(), at(), wt(), Le(), $n(), bn(), w(), It(), kn = Symbol("obsolete");
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
		Ee();
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
	ve(), at(), w(), Ii(), Ne(), kt(), i(), Mt(), lr(), ri(), zt(), Le(), It(), Qt(), ft(), $t(), An(), zn = null, Bn = null, Vn = null, Hn = null, Un = null, Wn = null, Gn = !1, Kn = !1, qn = null, Jn = null, Yn = 0, Xn = 1, Zn = class e {
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
			e.v !== Fe && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Un?.set(e, t)), this.is_fork || (e.v = t);
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
function F(e, t = !1, n = !0) {
	let r = er(e);
	return t || (r.equals = et), it && n && Ct !== null && Ct.l !== null && (Ct.l.s ??= []).push(r), r;
}
function I(e, t, n = !1) {
	return Ei !== null && (!Di || Ei.f & 131072) && St() && Ei.f & 4325394 && (ki === null || !ki.has(e)) && je(), nr(e, n ? ur(t) : t, Jn);
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
	I(e, e.v + 1);
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
				Un?.delete(u), c & 65536 || (c & 512 && (Oi === null || !(Oi.f & 2097152)) && (s.f |= ie), ar(u, O, n));
			} else if (l) {
				var d = s;
				c & 16 && Qn !== null && Qn.add(d), n === null ? In(d) : n.push(d);
			}
		}
	}
}
var or, sr, cr, lr = t((() => {
	i(), Ii(), tt(), ve(), Ne(), at(), dt(), ft(), wt(), $n(), pr(), An(), It(), or = /* @__PURE__ */ new Set(), sr = /* @__PURE__ */ new Map(), cr = !1;
}));
//#endregion
//#region node_modules/svelte/src/internal/client/proxy.js
function ur(e) {
	if (typeof e != "object" || !e || ce in e) return e;
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
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && ke();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ tr(r.value, a);
				return n.set(t, e), e;
			}) : I(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ tr(Fe, a));
					n.set(t, e), ir(i);
				}
			} else I(r, Fe), ir(i);
			return !0;
		},
		get(t, r, i) {
			if (r === ce) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || _(t, r)?.writable) && (o = s(() => /* @__PURE__ */ tr(ur(c ? t[r] : Fe), a)), n.set(r, o)), o !== void 0) {
				var l = H(o);
				return l === Fe ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = H(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== Fe) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === ce) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== Fe || Reflect.has(e, t);
			return (r !== void 0 || Oi !== null && (!i || _(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ tr(i ? ur(e[t]) : Fe, a)), n.set(t, r)), H(r) === Fe) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ tr(Fe, a)), n.set(d + "", f)) : I(f, Fe);
			}
			if (l === void 0) (!u || _(e, t)?.writable) && (l = s(() => /* @__PURE__ */ tr(void 0, a)), I(l, ur(o)), n.set(t, l));
			else {
				u = l.v !== Fe;
				var p = s(() => ur(o));
				I(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && I(h, g + 1);
				}
				ir(i);
			}
			return !0;
		},
		ownKeys(e) {
			H(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== Fe;
			});
			for (var [r, a] of n) a.v !== Fe && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ae();
		}
	});
}
function dr(e) {
	try {
		if (typeof e == "object" && e && ce in e) return e[ce];
	} catch {}
	return e;
}
function fr(e, t) {
	return Object.is(dr(e), dr(t));
}
var pr = t((() => {
	i(), Ii(), w(), lr(), ve(), Le(), Ne(), dt(), ft(), at();
})), mr = t((() => {
	He(), pr();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/dom/operations.js
function hr() {
	if (Cr === void 0) {
		Cr = window, wr = document, Tr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Er = _(t, "firstChild").get, Dr = _(t, "nextSibling").get, S(e) && (e[fe] = void 0, e[de] = null, e[pe] = void 0, e.__e = void 0), S(n) && (n[me] = void 0);
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
function L(e, t) {
	if (!Ye) return /* @__PURE__ */ _r(e);
	var n = /* @__PURE__ */ _r(Xe);
	if (n === null) n = Xe.appendChild(gr());
	else if (t && n.nodeType !== 3) {
		var r = gr();
		return n?.before(r), We(r), r;
	}
	return t && Sr(n), We(n), n;
}
function R(e, t = !1) {
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
function z(e, t = 1, n = !1) {
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
	Ze(), i(), mr(), w(), Ii(), at(), ve(), $n(), Le();
}));
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function kr(e) {
	Oi === null && (Ei === null && Te(e), we()), Ti && Ce(e);
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
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= te));
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
	return jr(4 | ne, e);
}
function Ir(e) {
	return kr("$effect.pre"), jr(8 | ne, e);
}
function Lr(e) {
	Zn.ensure();
	let t = jr(64 | M, e);
	return () => {
		Yr(t);
	};
}
function Rr(e) {
	Zn.ensure();
	let t = jr(64 | M, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Qr(t, () => {
			Yr(t), n(void 0);
		}) : (Yr(t), n(void 0));
	});
}
function zr(e) {
	return jr(4, e);
}
function B(e, t) {
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
				ci(n.parent), U(t);
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
	return jr(oe | M, e);
}
function Hr(e, t = 0) {
	return jr(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	gn(r, t, n, (t) => {
		jr(8, () => {
			e(...t.map(H));
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
	return jr(32 | M, e);
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
			e.abort(ge);
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
	Ii(), ve(), Ne(), i(), w(), Or(), wt(), $n(), bn(), ln(), It();
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
	if (t & 2 && (e.f &= ~ie), t & 4096) {
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
		e.ac.abort(ge);
	}), e.ac = null);
	try {
		e.f |= ae;
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
		return e.f & 8388608 && (e.f ^= se), d;
	} catch (e) {
		return At(e);
	} finally {
		e.f ^= ae, Ai = t, ji = n, Mi = r, Ei = i, ki = a, gt(o), Di = s, Fi = c;
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
		a.f & 512 && (a.f ^= 512, a.f &= ~ie), a.v !== Fe && Pt(a), a.ac !== null && sn(() => {
			a.ac.abort(ge), a.ac = null, Nt(a, D);
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
function H(e) {
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
	if (e.v === Fe) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (sr.has(t) || t.f & 2 && xi(t)) return !0;
	return !1;
}
function U(e) {
	var t = Di;
	try {
		return Di = !0, e();
	} finally {
		Di = t;
	}
}
function Si(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (ce in e) Ci(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && ce in n && Ci(n);
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
	i(), w(), ri(), ve(), lr(), An(), at(), dt(), ft(), wt(), $n(), Mt(), Le(), ai(), ln(), It(), He(), wi = !1, Ti = !1, Ei = null, Di = !1, Oi = null, ki = null, Ai = null, ji = 0, Mi = null, Ni = 1, Pi = 0, Fi = Pi;
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
ve(), Ii(), ve(), Ze(), wt(), ri(), w(), Ze(), kt(), Ii(), ln();
var Gi = Symbol("events"), Ki = /* @__PURE__ */ new Set(), qi = /* @__PURE__ */ new Set();
function Ji(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || ea.call(t, e), !e.cancelBubble) return sn(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Et(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Yi(e, t, n, r = {}) {
	var i = Ji(t, e, n, r);
	return () => {
		e.removeEventListener(t, i, r);
	};
}
function Xi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Ji(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Nr(() => {
		t.removeEventListener(e, o, a);
	});
}
function W(e, t, n) {
	(t[Gi] ??= {})[e] = n;
}
function Zi(e) {
	for (var t = 0; t < e.length; t++) Ki.add(e[t]);
	for (var n of qi) n(e);
}
var Qi = null, $i = !1;
function ea(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Qi = e, $i || ($i = !0, setTimeout(() => {
		$i = !1, Qi = null;
	}));
	var o = 0, s = Qi === e && e[Gi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Gi] = t;
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
					var m = a[Gi]?.[r];
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
			e[Gi] = t, delete e.currentTarget, si(u), ci(d);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
Or();
var ta = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function na(e) {
	return ta?.createHTML(e) ?? e;
}
function ra(e) {
	var t = xr("template");
	return t.innerHTML = na(e.replaceAll("<!>", "<!---->")), t.content;
}
Ze(), Or(), Ii(), Le(), ve();
function ia(e, t) {
	var n = Oi;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function G(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ye) return ia(Xe, null), Xe;
		i === void 0 && (i = ra(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ _r(i)));
		var t = r || Tr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ _r(t), s = t.lastChild;
			ia(o, s);
		} else ia(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function aa(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (Ye) return ia(Xe, null), Xe;
		if (!o) {
			var e = /* @__PURE__ */ _r(ra(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ _r(e);) o.appendChild(/* @__PURE__ */ _r(e));
			else o = /* @__PURE__ */ _r(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ _r(t), r = t.lastChild;
			ia(n, r);
		} else ia(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function oa(e, t) {
	return /* @__PURE__ */ aa(e, t, "svg");
}
function sa(e = "") {
	if (!Ye) {
		var t = gr(e + "");
		return ia(t, t), t;
	}
	var n = Xe;
	return n.nodeType === 3 ? Sr(n) : (n.before(n = gr()), We(n)), ia(n, n), n;
}
function ca() {
	if (Ye) return ia(Xe, null), Xe;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = gr();
	return e.append(t, n), ia(t, n), e;
}
function K(e, t) {
	if (Ye) {
		var n = Oi;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Xe), Ge();
		return;
	}
	e !== null && e.before(t);
}
i(), Or(), Le(), Ii(), wt(), ri(), Ze(), w(), He(), Ne(), ve(), hn();
function q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[me] ??= e.nodeValue) && (e[me] = n, e.nodeValue = `${n}`);
}
function la(e, t) {
	return da(e, t);
}
var ua = /* @__PURE__ */ new Map();
function da(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	hr();
	var c = void 0, l = Rr(() => {
		var o = n ?? t.appendChild(gr());
		fn(o, { pending: () => {} }, (t) => {
			bt({});
			var n = Ct;
			if (a && (n.c = a), i && (r.$$events = i), Ye && ia(t, null), c = e(t, r) || {}, Ye && (Oi.nodes.end = Xe, Xe === null || Xe.nodeType !== 8 || Xe.data !== "]")) throw ze(), Pe;
			xt();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Wi(r);
					for (let e of [t, document]) {
						var a = ua.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), ua.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, ea, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(h(Ki)), qi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = ua.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, ea), r.delete(e), r.size === 0 && ua.delete(n)) : r.set(e, i);
			}
			qi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return fa.set(c, l), c;
}
var fa = /* @__PURE__ */ new WeakMap();
ve(), Ze(), ri(), lr(), Ii(), w(), ve(), wt(), Ne(), wt(), ut(), ri(), Ii(), ft(), bn(), Ii(), Ze(), Ne(), $n(), ri(), ve(), Ze(), Or(), i();
var pa = class {
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
w(), ri(), lr(), Ze(), kt(), wt(), $n(), bn(), ve(), Ze(), ri();
function J(e, t, n = !1) {
	var r;
	Ye && (r = Xe, Ge());
	var i = new pa(e), a = n ? te : 0;
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
var ma = Symbol("NaN");
function ha(e, t, n) {
	Ye && Ge();
	var r = new pa(e), i = !St();
	Ur(() => {
		var e = t();
		e !== e && (e = ma), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
ri(), Ze(), Or();
function ga(e, t) {
	Ye && We(/* @__PURE__ */ _r(e)), Hr(() => {
		var n = t();
		for (var r in n) {
			var i = n[r];
			i == null || i === "" ? e.style.removeProperty(r) : e.style.setProperty(r, i);
		}
	});
}
Le(), Ze(), Or(), ri(), lr(), w(), ve(), kt(), Ii(), i(), An(), $n(), Ne(), dt();
function _a(e, t) {
	return t;
}
function va(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Qr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					ya(e, h(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
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
		ya(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function ya(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= re, ni(a, document.createDocumentFragment())) : Yr(t[i], n);
	}
}
var ba;
function Y(e, t, n, r, i, a = null) {
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
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = l, Sa(v, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= re, wa(l, null, o)) : ei(l) : Qr(l, () => {
			l = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Ur(() => {
			d = H(u);
			var e = d.length;
			let c = !1;
			Ye && Je(o) === "[!" != (e === 0) && (o = qe(), We(o), Ue(!1), c = !0);
			for (var f = /* @__PURE__ */ new Set(), h = Vn, v = br(), y = 0; y < e; y += 1) {
				Ye && Xe.nodeType === 8 && Xe.data === "]" && (o = Xe, c = !0, Ue(!1));
				var b = d[y], x = r(b, y), S = m ? null : s.get(x);
				S ? (S.v && nr(S.v, b), S.i && nr(S.i, y), v && h.unskip_effect(S.e)) : (S = Ca(s, m ? o : ba ??= gr(), b, x, y, i, t, n), m || (S.e.f |= re), s.set(x, S)), f.add(x);
			}
			if (e === 0 && a && !l && (m ? l = Gr(() => a(o)) : (l = Gr(() => a(ba ??= gr())), l.f |= re)), e > f.size && Se("", "", ""), Ye && e > 0 && We(qe()), !m) {
				if (p.set(h, f), v) {
					for (let [e, t] of s) f.has(e) || h.skip_effect(t.e);
					h.oncommit(g), h.ondiscard(_);
				} else g(h);
			}
			c && Ue(!0), H(u);
		}),
		flags: t,
		items: s,
		pending: p,
		outrogroups: null,
		fallback: l
	};
	m = !1, Ye && (o = Xe);
}
function xa(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Sa(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = xa(e.effect.first), l, u = null, d, f = [], p = [], m, g, _, v;
	if (a) for (v = 0; v < o; v += 1) m = t[v], g = i(m, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (m = t[v], g = i(m, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (ei(_), a && (_.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= re, _ === c) wa(_, null, n);
			else {
				var y = u ? u.next : c;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ta(e, u, _), Ta(e, _, y), wa(_, y, n), u = _, f = [], p = [], c = xa(u.next);
				continue;
			}
		}
		if (_ !== c) {
			if (l !== void 0 && l.has(_)) {
				if (f.length < p.length) {
					var b = p[0], x;
					u = b.prev;
					var S = f[0], C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) wa(f[x], b, n);
					for (x = 0; x < p.length; x += 1) l.delete(p[x]);
					Ta(e, S.prev, C.next), Ta(e, u, S), Ta(e, C, b), c = b, u = C, --v, f = [], p = [];
				} else l.delete(_), wa(_, c, n), Ta(e, _.prev, _.next), Ta(e, _, u === null ? e.effect.first : u.next), Ta(e, u, _), u = _;
				continue;
			}
			for (f = [], p = []; c !== null && c !== _;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = xa(c.next);
			if (c === null) continue;
		}
		_.f & 33554432 || f.push(_), u = _, c = xa(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ya(e, h(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var w = [];
		if (l !== void 0) for (_ of l) _.f & 8192 || w.push(_);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && w.push(c), c = xa(c.next);
		var T = w.length;
		if (T > 0) {
			var E = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			va(e, w, E);
		}
	}
	a && Et(() => {
		if (d !== void 0) for (_ of d) _.nodes?.a?.apply();
	});
}
function Ca(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? er(n) : /* @__PURE__ */ F(n, !1, !1) : null, l = o & 2 ? er(i) : null;
	return {
		v: c,
		i: l,
		e: Gr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function wa(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ vr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ta(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
ri(), Ze(), wt(), Or(), Ii(), ve(), Ze(), ve(), ri(), wt(), Ze(), Ne(), i(), Or();
function Ea(e, t, ...n) {
	var r = new pa(e);
	Ur(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, te);
}
ve(), ri(), Ze(), Le();
function Da(e, t, n) {
	var r;
	Ye && (r = Xe, Ge());
	var i = new pa(e);
	Ur(() => {
		var e = t() ?? null;
		if (Ye && Je(r) === "[" != (e !== null)) {
			var a = qe();
			We(a), i.anchor = a, Ue(!1), i.ensure(e, e && ((t) => n(t, e))), Ue(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, te);
}
w(), w(), ri(), Ii(), ve(), kt(), ln(), Ze(), Or(), ri(), Ii(), wt(), ve(), Ze(), Or(), ri(), ve(), ri(), Or(), Ii(), ri(), tt(), Ii();
function Oa(e, t, n) {
	zr(() => {
		var r = U(() => t(e, n?.()) || {});
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
function ka(e, t) {
	var n = void 0, r;
	Wr(() => {
		n !== (n = t()) && (r &&= (Yr(r), null), n && (r = Gr(() => {
			zr(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function Aa(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Aa(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ja() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Aa(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
w();
function Ma(e) {
	return typeof e == "object" ? ja(e) : e ?? "";
}
var Na = [..." 	\n\r\f\xA0\v﻿"];
function Pa(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Na.includes(r[o - 1])) && (s === r.length || Na.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Fa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Ia(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function La(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Ia)), i && c.push(...Object.keys(i).map(Ia));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Ia(e.substring(l, u).trim());
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
		return r && (n += Fa(r)), i && (n += Fa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
ve(), Ze();
function X(e, t, n, r, i, a) {
	var o = e[fe];
	if (Ye || o !== n || o === void 0) {
		var s = Pa(n, r, a);
		(!Ye || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[fe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
ve(), Ze();
function Ra(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function za(e, t, n, r) {
	var i = e[pe];
	if (Ye || i !== t) {
		var a = La(t, r);
		(!Ye || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[pe] = t;
	} else r && (Array.isArray(r) ? (Ra(e, n?.[0], r[0]), Ra(e, n?.[1], r[1], "important")) : Ra(e, n, r));
	return r;
}
ri(), ln(), pr(), w(), He(), $n(), at();
function Ba(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!f(t)) return Be();
		for (var r of e.options) r.selected = t.includes(Ua(r));
		return;
	}
	for (r of e.options) if (fr(Ua(r), t)) {
		r.selected = !0;
		return;
	}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function Va(e) {
	var t = new MutationObserver(() => {
		"__value" in e && Ba(e, e.__value);
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
function Ha(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	cn(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Ua);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Ua(o);
		}
		n(a), e.__value = a, Vn !== null && r.add(Vn);
	}), zr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = rt ? Hn : Vn;
			if (r.has(o)) return;
		}
		if (Ba(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Ua(s), n(a));
		}
		e.__value = a, i = !1;
	}), Va(e);
}
function Ua(e) {
	return "__value" in e ? e.__value : e.value;
}
i(), Ze(), w(), an(), He(), ve(), kt(), Ii(), Le(), ri(), bn();
var Wa = Symbol("class"), Ga = Symbol("style"), Ka = Symbol("is custom element"), qa = Symbol("is html"), Ja = _e ? "link" : "LINK", Ya = _e ? "input" : "INPUT", Xa = _e ? "option" : "OPTION", Za = _e ? "select" : "SELECT", Qa = _e ? "progress" : "PROGRESS";
function $a(e) {
	if (Ye) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Z(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Z(e, "checked", null), e.checked = r;
				}
			}
		};
		e[he] = n, Et(n), nn();
	}
}
function eo(e, t) {
	var n = io(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Qa) && (e.value = t ?? "");
}
function to(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Z(e, t, n, r) {
	var i = io(e);
	Ye && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ja) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && oo(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function no(e, t, n, r, i = !1, a = !1) {
	if (Ye && i && e.nodeName === Ya) {
		var o = e;
		(o.type === "checkbox" ? "defaultChecked" : "defaultValue") in n || $a(o);
	}
	var s = io(e), c = s[Ka], l = !s[qa];
	let u = Ye && c;
	u && Ue(!1);
	var d = t || {}, f = e.nodeName === Xa;
	for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
	n.class ? n.class = Ma(n.class) : (r || n[Wa]) && (n.class = null), n[Ga] && (n.style ??= null);
	var m = oo(e);
	if (e.nodeName === Ya && "type" in n && ("value" in n || "__value" in n)) {
		var h = n.type;
		(h !== d.type || h === void 0 && e.hasAttribute("type")) && (d.type = h, Z(e, "type", h, a));
	}
	for (let i in n) {
		let o = n[i];
		if (f && i === "value" && o == null) {
			e.value = e.__value = "", d[i] = o;
			continue;
		}
		if (i === "class") {
			X(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", o, r, t?.[Wa], n[Wa]), d[i] = o, d[Wa] = n[Wa];
			continue;
		}
		if (i === "style") {
			za(e, o, t?.[Ga], n[Ga]), d[i] = o, d[Ga] = n[Ga];
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
					if (v) W(r, e, o), Zi([r]);
					else if (o != null) {
						function a(e) {
							d[i].call(this, e);
						}
						d[n] = Ji(r, e, a, t);
					}
				} else if (i === "style") Z(e, i, o);
				else if (i === "autofocus") en(e, !!o);
				else if (!c && (i === "__value" || i === "value" && o != null)) e.value = e.__value = o;
				else if (i === "selected" && f) to(e, o);
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
					} else b || m.includes(y) && (c || typeof o != "string") ? (e[y] = o, y in s && (s[y] = Fe)) : typeof o != "function" && Z(e, y, o, a);
				}
			}
		}
	}
	return u && Ue(!0), d;
}
function ro(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	gn(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Za, l = !1;
		if (Wr(() => {
			var u = t(...n.map(H)), d = no(e, r, u, a, o, s);
			l && c && "value" in u && Ba(e, u.value);
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || Yr(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var f = u[t];
				t.description === "@attach" && (!r || f !== r[t]) && (i[t] && Yr(i[t]), i[t] = Gr(() => ka(e, () => f))), d[t] = f;
			}
			r = d;
		}), c) {
			var u = e;
			zr(() => {
				Ba(u, r.value, !0), Va(u);
			});
		}
		l = !0;
	});
}
function io(e) {
	return e[de] ??= {
		[Ka]: e.nodeName.includes("-"),
		[qa]: e.namespaceURI === Ie
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
Ze(), Or(), ln(), i(), ri(), ln(), Ne(), pr(), kt(), Ze(), Ii(), $n(), at();
function so(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	cn(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = lo(e) ? uo(a) : a, n(a), Vn !== null && r.add(Vn), await yi(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ye && e.defaultValue !== e.value || U(t) == null && e.value) && (n(lo(e) ? uo(e.value) : e.value), Vn !== null && r.add(Vn)), Hr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = rt ? Hn : Vn;
			if (r.has(i)) return;
		}
		lo(e) && n === uo(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function co(e, t, n = t) {
	cn(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (Ye && e.defaultChecked !== e.checked || U(t) == null) && n(e.checked), Hr(() => {
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
ri(), ln(), ln(), ri(), w(), ri(), Ii();
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
	zr(() => (U(() => n(e[t])), r));
}
ve(), wt(), ri(), Ii();
function mo(e, t) {
	return e === t || e?.[ce] === t;
}
function ho(e = {}, t, n, r) {
	var i = Ct.r, a = Oi;
	return zr(() => {
		var o, s;
		return Hr(() => {
			o = s, s = r?.() || [], U(() => {
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
ri(), ln();
function go(e, t, n, r, i) {
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
function _o(e, t) {
	on(window, ["resize"], () => sn(() => t(window[e])));
}
w(), ri(), w(), wt(), An(), ri(), Ii();
function vo(e = !1) {
	let t = Ct, n = t.l.u;
	if (!n) return;
	let r = () => Si(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ xn(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => H(i);
	}
	n.b.length && Ir(() => {
		yo(t, r), s(n.b);
	}), Pr(() => {
		let e = U(() => n.m.map(o));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Pr(() => {
		yo(t, r), s(n.a);
	});
}
function yo(e, t) {
	if (e.l.s) for (let t of e.l.s) H(t);
	t();
}
lr(), Ii(), w(), i(), Le(), w(), lr(), An(), Ii(), Ne(), ve(), pr(), Qt(), at(), ri();
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
		if (t === ce || t === le) return !1;
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
	var i = !it || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ xn(r), H(l)) : (c && (c = !1, s = o ? U(r) : r), s);
	let d;
	if (a) {
		var f = ce in e || le in e;
		d = _(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Jt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && De(t), d(p)));
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
	a && H(y);
	var b = Oi;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? H(y) : i && a ? ur(e) : e;
			return I(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Ti && v || b.f & 16384 ? y.v : H(y);
	});
}
wt(), ri(), Qt(), bn(), ve(), ri(), lr(), Ii(), $n(), w(), Ne(), wt(), at(), It(), ri(), w(), Or(), ve(), ut(), Ii(), wt(), dt(), an(), Ze(), bn(), $n(), An(), ri(), lr(), Qt(), hn(), ai(), Ii(), pr(), Or(), ut(), w(), mr(), Ze(), Ne(), Ii(), w(), Ne(), at(), wt(), i(), $n();
function wo(e) {
	Ct === null && ye("onMount"), it && Ct.l !== null ? Eo(Ct).m.push(e) : Pr(() => {
		let t = U(e);
		if (typeof t == "function") return t;
	});
}
function To(e) {
	Ct === null && ye("onDestroy"), wo(() => () => U(e));
}
function Eo(e) {
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
var Do = t((() => {
	ri(), Gt(), dn(), Ii();
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
function Po(e, t = Ut(Vo).selectedProject) {
	let n = new URL(e, location.origin);
	return n.searchParams.set("view", "compact"), t && n.searchParams.set("project", t), `${n.pathname}${n.search}`;
}
async function Fo(e = Ut(Vo).selectedProject) {
	let t = await fetch(Po("/api/control", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh campaign state: ${t.status}`);
	let n = await t.json();
	return jo(n), n;
}
async function Io(e = Ut(Vo).selectedProject) {
	let t = await fetch(Po("/api/snapshot", e), { cache: "no-store" });
	if (!t.ok) throw Error(`Could not refresh lane state: ${t.status}`);
	let n = await t.json();
	return Mo(n), n;
}
async function Lo(e = Ut(Vo).selectedProject) {
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
		let e = Ut(Vo).selectedProject, t = await fetch(Po("/api/refresh", e), { method: "POST" });
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
	Do(), Vo = Ht({
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
var rs = Ht("loading");
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
var cs = /* @__PURE__ */ G("<button> </button>"), ls = /* @__PURE__ */ G("<option> </option>"), us = /* @__PURE__ */ G("<p class=\"banner\" role=\"status\"> </p>"), ds = /* @__PURE__ */ G("<div class=\"activity-line\"><span class=\"pulse\"></span><span> </span></div>"), fs = /* @__PURE__ */ G("<span class=\"meta-chip\"> </span>"), ps = /* @__PURE__ */ G("<button type=\"button\"><div class=\"card-top\"><span class=\"lane-name\"> </span><span class=\"status-pill\"> </span></div> <h3 class=\"task-title\"> </h3> <p class=\"detail\"> </p> <!> <div class=\"meta-row\"><span class=\"meta-chip\"> </span> <!> <span class=\"meta-chip\"> </span><span class=\"meta-chip\"> </span> <span> </span> <!></div> <div class=\"card-footer\"><span> </span><span> </span></div></button>"), ms = /* @__PURE__ */ G("<div class=\"empty-state\"><p>No lanes match this view.</p></div>"), hs = /* @__PURE__ */ G("<p class=\"banner\" role=\"alert\"> </p>"), gs = /* @__PURE__ */ G("<div class=\"detail-cell\"><span> </span><strong> </strong></div>"), _s = /* @__PURE__ */ G("<div class=\"command\"> </div>"), vs = /* @__PURE__ */ G("<section class=\"dialog-section\"><h3>In-flight activity</h3><!></section>"), ys = /* @__PURE__ */ G("<div class=\"timeline-item\"><time> </time><p> </p></div>"), bs = /* @__PURE__ */ G("<section class=\"dialog-section\"><h3>Recent timeline</h3><!></section>"), xs = /* @__PURE__ */ G("<section class=\"dialog-section\"><h3>Result</h3><p> </p></section>"), Ss = /* @__PURE__ */ G("<p class=\"dialog-feedback\"> </p>"), Cs = /* @__PURE__ */ G("<section class=\"dialog-section\"><h3>Controls</h3><button class=\"primary-button\"> </button><!></section>"), ws = /* @__PURE__ */ G("<section class=\"dialog-section ownership-boundary\"><h3>Observed elsewhere</h3><p> </p></section>"), Ts = /* @__PURE__ */ G("<div class=\"dialog-shell\"><header class=\"dialog-header\"><div><p class=\"eyebrow\"> </p><h2> </h2></div><button class=\"close-button\" aria-label=\"Close lane details\">×</button></header> <div class=\"dialog-body\"><!> <section class=\"dialog-section\"><h3>Snapshot</h3><div class=\"detail-grid\"></div></section> <section class=\"dialog-section\"><h3>Current detail</h3><p> </p></section> <!> <!> <!> <section class=\"dialog-section\"><h3>Source</h3><p> <br/> <br/> </p></section> <!></div></div>"), Es = /* @__PURE__ */ G("<section class=\"summary\" aria-label=\"Lane summary\"><button><span class=\"summary-value\"> </span><span>working</span></button> <button><span class=\"summary-value\"> </span><span>idle</span></button> <button><span class=\"summary-value\"> </span><span>attention</span></button> <button><span class=\"summary-value\"> </span><span>complete</span></button></section> <section class=\"controls observer-controls\" aria-label=\"Lane dashboard controls\"><div class=\"filter-tabs\" role=\"tablist\" aria-label=\"Lane filters\"></div> <div class=\"control-row\"><label class=\"search-box\"><span class=\"sr-only\">Search lanes</span><input type=\"search\" placeholder=\"Search task, lane, project…\" autocomplete=\"off\"/></label> <select aria-label=\"Filter by project\"><option>All projects</option><!></select> <button> </button></div></section> <!> <section class=\"lane-grid\" aria-live=\"polite\"></section> <!> <dialog class=\"lane-dialog\"><!></dialog>", 1);
function Ds(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", i), r = () => Kt(rs, "$alertState", i), [i, a] = qt(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(), m = /* @__PURE__ */ F(), h = /* @__PURE__ */ F("active"), g = /* @__PURE__ */ F(""), _ = /* @__PURE__ */ F(typeof location > "u" ? "" : new URL(location.href).searchParams.get("lane") || ""), v = /* @__PURE__ */ F(), y = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(""), x = /* @__PURE__ */ F(!1), S = /* @__PURE__ */ F(""), C = /* @__PURE__ */ F(null), w = {
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
		let t = (H(C)?.laneOwnership || []).find((t) => t.laneId === e.id);
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
		if (H(g).trim() && !t.includes(H(g).trim().toLowerCase())) return !1;
		if (H(h) === "all") return !0;
		if (H(h) === "running") return ["working", "idle"].includes(e.severity);
		if (H(h) === "attention") return ["attention", "unknown"].includes(e.severity);
		if (H(h) === "recent") return e.severity === "complete" && Date.now() - new Date(e.updatedAt || e.completedAt).valueOf() < 864e5;
		let r = new Date(e.updatedAt || e.launchedAt).valueOf(), i = Number.isFinite(r) && Date.now() - r < 432e5;
		return e.severity !== "complete" && (e.severity !== "unknown" || i);
	}
	async function k(e) {
		I(_, e), I(y, null), I(b, ""), I(S, "");
		let t = new URL(location.href);
		t.searchParams.set("lane", e), history.replaceState(null, "", `${t.pathname}${t.search}`), await yi(), H(v) && !H(v).open && H(v).showModal();
		try {
			let t = await fetch(`/api/lane?id=${encodeURIComponent(e)}`, { cache: "no-store" }), n = await t.json();
			if (!t.ok) throw Error(n.error || `Could not load lane detail: ${t.status}`);
			H(_) === e && I(y, n);
		} catch (t) {
			H(_) === e && I(b, t instanceof Error ? t.message : String(t));
		}
	}
	function A() {
		I(_, ""), I(y, null), I(b, "");
		let e = new URL(location.href);
		e.searchParams.delete("lane"), history.replaceState(null, "", `${e.pathname}${e.search}`);
	}
	async function j(e) {
		if (H(x)) return;
		let t = D(e);
		if (!t.controlled) {
			I(S, `Reconciliation unavailable: ${t.reason}`);
			return;
		}
		I(x, !0), I(S, "Running mechanical reconciliation…");
		try {
			await ns({
				projectId: e.project,
				type: "lane.reconcile",
				targetId: e.id,
				scope: "lane-dialog"
			}), I(S, "Reconciliation completed and the observer state was refreshed.");
			let t = await fetch(`/api/lane?id=${encodeURIComponent(e.id)}`, { cache: "no-store" });
			t.ok && I(y, await t.json());
		} catch (e) {
			I(S, e instanceof Error ? e.message : String(e));
		} finally {
			I(x, !1);
		}
	}
	wo(() => {
		let e = (e) => {
			let t = e.detail?.id || "";
			t && k(t);
		};
		return window.addEventListener("lane-watch:open-lane", e), H(_) && k(H(_)), () => window.removeEventListener("lane-watch:open-lane", e);
	}), B(() => n(), () => {
		I(o, n().observer);
	}), B(() => n(), () => {
		I(C, (n().control?.projects || []).find((e) => e.id === n().selectedProject) || null);
	}), B(() => (H(o), n()), () => {
		I(s, H(o)?.lanes.filter((e) => !n().selectedProject || e.project === n().selectedProject) || []);
	}), B(() => H(s), () => {
		I(c, H(s).filter((e) => ["attention", "unknown"].includes(e.severity) && Date.now() - new Date(e.updatedAt || e.launchedAt).valueOf() < 432e5).length);
	}), B(() => (H(s), H(c)), () => {
		I(l, {
			working: H(s).filter((e) => e.severity === "working").length,
			idle: H(s).filter((e) => e.severity === "idle").length,
			attention: H(c),
			complete: H(s).filter((e) => e.severity === "complete").length
		});
	}), B(() => (H(o), n()), () => {
		I(u, [.../* @__PURE__ */ new Set([
			...H(o)?.lanes.map((e) => e.project) || [],
			...n().control?.projectIndex?.map((e) => String(e.id)) || [],
			...n().control?.projects?.map((e) => String(e.id)) || []
		])].sort());
	}), B(() => H(o), () => {
		I(d, (H(o)?.lanes || []).filter(O).sort((e, t) => (w[e.severity] ?? 5) - (w[t.severity] ?? 5) || new Date(t.updatedAt || t.launchedAt).valueOf() - new Date(e.updatedAt || e.launchedAt).valueOf()));
	}), B(() => (H(y), H(_), H(o)), () => {
		I(f, H(y)?.id === H(_) ? H(y) : H(o)?.lanes.find((e) => e.id === H(_)) || null);
	}), B(() => H(o), () => {
		I(p, H(o) ? Date.now() - new Date(H(o).generatedAt).valueOf() >= 35e3 : !1);
	}), B(() => r(), () => {
		I(m, {
			loading: "Checking alerts…",
			unsupported: "Alerts unsupported",
			disabled: "Enable alerts",
			enabled: "Alerts enabled",
			error: "Alert setup failed"
		}[r()]);
	}), Br(), vo();
	var ee = Es(), te = R(ee), M = L(te);
	let ne;
	var re = L(M), ie = L(re, !0);
	N(re), Ke(), N(M);
	var ae = z(M, 2);
	let oe;
	var se = L(ae), ce = L(se, !0);
	N(se), Ke(), N(ae);
	var le = z(ae, 2);
	let ue;
	var de = L(le), fe = L(de, !0);
	N(de), Ke(), N(le);
	var pe = z(le, 2);
	let me;
	var he = L(pe), ge = L(he, !0);
	N(he), Ke(), N(pe), N(te);
	var _e = z(te, 2), ve = L(_e);
	Y(ve, 4, () => [
		["active", "Live"],
		["running", "Running"],
		["attention", "Attention"],
		["recent", "Recent"],
		["all", "All"]
	], _a, (e, t) => {
		var n = cs();
		let r;
		var i = L(n, !0);
		N(n), V(() => {
			r = X(n, 1, "filter-tab", null, r, { active: H(h) === t[0] }), q(i, U(() => t[1]));
		}), W("click", n, () => I(h, t[0])), K(e, n);
	}), N(ve);
	var ye = z(ve, 2), be = L(ye), xe = z(L(be));
	$a(xe), N(be);
	var Se = z(be, 2), Ce = L(Se);
	Ce.value = Ce.__value = "", Y(z(Ce), 1, () => H(u), _a, (e, t) => {
		var n = ls(), r = L(n, !0);
		N(n);
		var i = {};
		V(() => {
			q(r, H(t)), i !== (i = H(t)) && (n.value = (n.__value = H(t)) ?? "");
		}), K(e, n);
	}), N(Se);
	var we;
	Va(Se);
	var Te = z(Se, 2);
	let Ee;
	var De = L(Te, !0);
	N(Te), N(ye), N(_e);
	var Oe = z(_e, 2), ke = (e) => {
		var t = us(), n = L(t);
		N(t), V((e) => q(n, `Status snapshot is ${e ?? ""}. The observer may be reconnecting.`), [() => (H(o), U(() => T(H(o)?.generatedAt)))]), K(e, t);
	};
	J(Oe, (e) => {
		H(p) && e(ke);
	});
	var Ae = z(Oe, 2);
	Y(Ae, 5, () => H(d), (e) => e.id, (e, t) => {
		var n = ps(), r = L(n), i = L(r), a = L(i, !0);
		N(i);
		var o = z(i), s = L(o, !0);
		N(o), N(r);
		var c = z(r, 2), l = L(c, !0);
		N(c);
		var u = z(c, 2), d = L(u, !0);
		N(u);
		var f = z(u, 2), p = (e) => {
			var n = ds(), r = z(L(n)), i = L(r);
			N(r), N(n), V(() => q(i, `${H(t), U(() => H(t).inFlight + H(t).queued) ?? ""} active task${H(t), U(() => H(t).inFlight + H(t).queued === 1 ? "" : "s") ?? ""}`)), K(e, n);
		};
		J(f, (e) => {
			H(t), U(() => H(t).inFlight + H(t).queued) && e(p);
		});
		var m = z(f, 2), h = L(m), g = L(h, !0);
		N(h);
		var _ = z(h, 2), v = (e) => {
			var n = fs(), r = L(n, !0);
			N(n), V(() => q(r, (H(t), U(() => H(t).topology.profile)))), K(e, n);
		};
		J(_, (e) => {
			H(t), U(() => H(t).topology?.profile) && e(v);
		});
		var y = z(_, 2), b = L(y, !0);
		N(y);
		var x = z(y), S = L(x, !0);
		N(x);
		var C = z(x, 2), w = L(C, !0);
		N(C);
		var O = z(C, 2), A = (e) => {
			var n = fs(), r = L(n);
			N(n), V((e) => q(r, `${e ?? ""} tok`), [() => (H(t), U(() => E(H(t).tokens)))]), K(e, n);
		};
		J(O, (e) => {
			H(t), U(() => H(t).tokens != null) && e(A);
		}), N(m);
		var j = z(m, 2), ee = L(j), te = L(ee, !0);
		N(ee);
		var M = z(ee), ne = L(M);
		N(M), N(j), N(n), V((e, r, i) => {
			X(n, 1, `lane-card ${H(t), U(() => H(t).severity) ?? ""}`), Z(n, "aria-label", (H(t), U(() => `Open ${H(t).task} details`))), q(a, (H(t), U(() => H(t).lane))), q(s, (H(t), U(() => H(t).status))), q(l, (H(t), U(() => H(t).task))), q(d, (H(t), U(() => H(t).detail || H(t).output || (H(t).severity === "complete" ? "Coordinator completion recorded." : "No current detail reported.")))), q(g, (H(t), U(() => H(t).model))), q(b, (H(t), U(() => H(t).project))), q(S, (H(t), U(() => H(t).host === "macbook" ? "Mac" : "Windows"))), X(C, 1, `meta-chip ownership-chip ${e ?? ""}`), q(w, r), q(te, (H(t), U(() => H(t).jobId || "no job"))), q(ne, `updated ${i ?? ""}`);
		}, [
			() => (H(t), U(() => D(H(t)).origin)),
			() => (H(t), U(() => D(H(t)).label)),
			() => (H(t), U(() => T(H(t).updatedAt)))
		]), W("click", n, () => k(H(t).id)), K(e, n);
	}), N(Ae);
	var je = z(Ae, 2), Me = (e) => {
		K(e, ms());
	};
	J(je, (e) => {
		H(o), H(d), U(() => H(o) && !H(d).length) && e(Me);
	});
	var Ne = z(je, 2), Pe = L(Ne), Fe = (e) => {
		var t = Ts(), n = L(t), r = L(n), i = L(r), a = L(i);
		N(i);
		var o = z(i), s = L(o, !0);
		N(o), N(r);
		var c = z(r);
		N(n);
		var l = z(n, 2), u = L(l), d = (e) => {
			var t = hs(), n = L(t, !0);
			N(t), V(() => q(n, H(b))), K(e, t);
		};
		J(u, (e) => {
			H(b) && e(d);
		});
		var p = z(u, 2), m = z(L(p));
		Y(m, 5, () => (H(f), U(() => [
			["Status", H(f).status],
			["Model", `${H(f).model} / ${H(f).effort}`],
			["Lifecycle", H(f).lifecycle],
			["Daemon", `${H(f).daemon} / ${H(f).tempo}`],
			["Tokens", E(H(f).tokens)],
			["Landing", H(f).landing],
			["Ownership", D(H(f)).label],
			["Profile", H(f).topology?.profile || "legacy"],
			["Updated", H(f).updatedAt ? new Date(H(f).updatedAt).toLocaleString() : "—"]
		])), _a, (e, t) => {
			var n = gs(), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a, !0);
			N(a), N(n), V(() => {
				q(i, (H(t), U(() => H(t)[0]))), q(o, (H(t), U(() => H(t)[1])));
			}), K(e, n);
		}), N(m), N(p);
		var h = z(p, 2), g = z(L(h)), _ = L(g, !0);
		N(g), N(h);
		var y = z(h, 2), C = (e) => {
			var t = vs();
			Y(z(L(t)), 1, () => (H(f), U(() => H(f).activities)), (e) => e.id, (e, t) => {
				var n = _s(), r = L(n);
				N(n), V(() => q(r, `${H(t), U(() => H(t).kind === "subagent" ? `${H(t).agentType || "unknown"} / ${H(t).model || "unknown"}` : H(t).kind) ?? ""} · ${H(t), U(() => H(t).label) ?? ""}`)), K(e, n);
			}), N(t), K(e, t);
		};
		J(y, (e) => {
			H(f), U(() => H(f).activities.length) && e(C);
		});
		var w = z(y, 2), T = (e) => {
			var t = bs();
			Y(z(L(t)), 1, () => (H(f), U(() => H(f).timeline)), _a, (e, t) => {
				var n = ys(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a), N(n), V((e) => {
					q(i, `${e ?? ""} · ${H(t), U(() => H(t).state) ?? ""}`), q(o, (H(t), U(() => H(t).detail || H(t).text)));
				}, [() => (H(t), U(() => new Date(H(t).at).toLocaleString()))]), K(e, n);
			}), N(t), K(e, t);
		};
		J(w, (e) => {
			H(f), U(() => H(f).timeline.length) && e(T);
		});
		var O = z(w, 2), k = (e) => {
			var t = xs(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V(() => q(r, (H(f), U(() => H(f).output)))), K(e, t);
		};
		J(O, (e) => {
			H(f), U(() => H(f).output) && e(k);
		});
		var A = z(O, 2), ee = z(L(A)), te = L(ee), M = z(te, 2, !0), ne = z(M, 2, !0);
		N(ee), N(A);
		var re = z(A, 2), ie = (e) => {
			var t = Cs(), n = z(L(t)), r = L(n, !0);
			N(n);
			var i = z(n), a = (e) => {
				var t = Ss(), n = L(t, !0);
				N(t), V(() => q(n, H(S))), K(e, t);
			};
			J(i, (e) => {
				H(S) && e(a);
			}), N(t), V(() => {
				n.disabled = H(x), q(r, H(x) ? "Reconciling…" : "Run mechanical reconciliation");
			}), W("click", n, () => j(H(f))), K(e, t);
		}, ae = /* @__PURE__ */ P(() => (H(f), U(() => H(f).lifecycle === "active" && [
			"done",
			"stopped",
			"failed",
			"error",
			"crashed",
			"cancelled",
			"canceled",
			"complete",
			"completed"
		].includes(H(f).daemon) && D(H(f)).controlled))), oe = (e) => {
			var t = ws(), n = z(L(t)), r = L(n);
			N(n), N(t), V((e) => q(r, `${e ?? ""} Lane Watch will not enqueue reconciliation, synthesis, adoption, or dispatch for this worker.`), [() => (H(f), U(() => D(H(f)).reason))]), K(e, t);
		}, se = /* @__PURE__ */ P(() => (H(f), U(() => H(f).lifecycle === "active" && !D(H(f)).controlled)));
		J(re, (e) => {
			H(ae) ? e(ie) : H(se) && e(oe, 1);
		}), N(l), N(t), V(() => {
			q(a, `${H(f), U(() => H(f).lane) ?? ""} · ${H(f), U(() => H(f).project) ?? ""} · ${H(f), U(() => H(f).host === "macbook" ? "Mac" : "Windows") ?? ""}`), q(s, (H(f), U(() => H(f).task))), q(_, (H(f), U(() => H(f).detail || "No current detail reported."))), q(te, `Job ${H(f), U(() => H(f).jobId || "—") ?? ""}`), q(M, (H(f), U(() => H(f).branch || "No branch recorded"))), q(ne, (H(f), U(() => H(f).worktree || "No worktree recorded")));
		}), W("click", c, () => H(v).close()), K(e, t);
	};
	J(Pe, (e) => {
		H(f) && e(Fe);
	}), N(Ne), ho(Ne, (e) => I(v, e), () => H(v)), V((e) => {
		ne = X(M, 1, "summary-card working", null, ne, { selected: H(h) === "running" }), q(ie, (H(l), U(() => H(l).working))), oe = X(ae, 1, "summary-card idle", null, oe, { selected: H(h) === "running" }), q(ce, (H(l), U(() => H(l).idle))), ue = X(le, 1, "summary-card attention", null, ue, { selected: H(h) === "attention" }), q(fe, (H(l), U(() => H(l).attention))), me = X(pe, 1, "summary-card complete", null, me, { selected: H(h) === "recent" }), q(ge, (H(l), U(() => H(l).complete))), we !== (we = (n(), U(() => n().selectedProject))) && (Se.value = (Se.__value = (n(), U(() => n().selectedProject))) ?? "", Ba(Se, (n(), U(() => n().selectedProject)))), Ee = X(Te, 1, "outline-button", null, Ee, { enabled: r() === "enabled" }), Te.disabled = e, q(De, H(m));
	}, [() => (r(), U(() => ["loading", "unsupported"].includes(r())))]), W("click", M, () => I(h, "running")), W("click", ae, () => I(h, "running")), W("click", le, () => I(h, "attention")), W("click", pe, () => I(h, "recent")), so(xe, () => H(g), (e) => I(g, e)), W("change", Se, (e) => No(e.currentTarget.value)), W("click", Te, function(...e) {
		os?.apply(this, e);
	}), Xi("close", Ne, A), K(e, ee), xt(), a();
}
//#endregion
//#region src/ui/PrimaryActionRail.svelte
Zi(["click", "change"]), Ho();
var Os = /* @__PURE__ */ G("<div class=\"rail-direction\"><span>CURRENT GROUNDING</span><strong> </strong></div>"), ks = /* @__PURE__ */ G("<div class=\"rail-observation\"><span>OBSERVED ACTIVITY · NON-AUTHORITATIVE</span><strong> </strong></div>"), As = /* @__PURE__ */ G("<button> </button>"), js = /* @__PURE__ */ G("<li><b> </b><span> </span></li>"), Ms = /* @__PURE__ */ G("<ul></ul>"), Ns = /* @__PURE__ */ G("<p> </p> <!>", 1), Ps = /* @__PURE__ */ G("<li><b> </b><div><strong> </strong><p> </p><small> </small></div></li>"), Fs = /* @__PURE__ */ G("<ol></ol>"), Is = /* @__PURE__ */ G("<details class=\"rail-inspector\"><summary><span>Inspect the decision packet</span><strong> </strong></summary> <div class=\"rail-packet\"><!> <label class=\"rail-note\"><span>Operator note or revision direction</span><textarea rows=\"3\" placeholder=\"Optional, but useful when redirecting or requesting revision\"></textarea></label></div></details>"), Ls = /* @__PURE__ */ G("<div class=\"recovery-report\"><div class=\"recovery-report-grid\"><div><span>WORKFLOW</span><strong> </strong></div> <div><span>FROZEN WAVE</span><strong> </strong></div> <div><span>ACCOUNTING</span><strong> </strong></div> <div><span>CONTROLLED EXECUTION</span><strong> </strong></div></div> <p class=\"recovery-digest\"><span>BOUND REPORT</span><code> </code></p> <p> </p> <label class=\"recovery-choice\"><span>Explicit recovery decision</span><select><option>Preserve the current hold</option><option>Align the historical wave to the workflow</option><option>Align the workflow to the frozen wave</option><option>Apply terminal-evidence projection repair</option></select></label> <label class=\"rail-note\"><span>Recovery rationale</span><textarea rows=\"3\" placeholder=\"Why this historical boundary—not the research direction—should change\"></textarea></label> <label class=\"recovery-confirm\"><input type=\"checkbox\"/><span>I reviewed the exact digest and authorize only this historical recovery decision.</span></label> <div class=\"recovery-boundary\"><strong>No inferred authority</strong><span>This command cannot infer a worker result, dispatch work, promote claims, merge, or push.</span></div> <button class=\"primary-button recovery-apply\"> </button></div>"), Rs = /* @__PURE__ */ G("<div class=\"recovery-report empty\"><p>Freeze a fresh report before choosing a transition. Preparation is read-only with respect to campaign workflow, workers, claims, Git, and publication.</p></div>"), zs = /* @__PURE__ */ G("<details class=\"rail-inspector rail-recovery\"><summary><span>Historical recovery protocol</span><strong> </strong></summary> <!></details>"), Bs = /* @__PURE__ */ G("<div role=\"status\"> </div>"), Vs = /* @__PURE__ */ G("<section class=\"lifecycle-focus primary-action-rail\" id=\"next-action\" aria-live=\"polite\"><div class=\"rail-copy\"><div class=\"rail-kicker\"><span> </span><strong> </strong><i> </i></div> <h2> </h2> <p> </p> <!> <!> <details class=\"rail-hint\"><summary><span>WHY THIS MATTERS</span><strong>Plain-language hint + mathematical connection</strong></summary> <div><p><b>What this state means.</b> </p> <p><b>Mathematical connection.</b> </p> <p><b>What your click changes.</b> </p></div></details></div> <div class=\"lifecycle-actions rail-actions\"></div> <!> <!> <!></section>"), Hs = /* @__PURE__ */ G("<button><strong> </strong><span> </span><small> </small></button>"), Us = /* @__PURE__ */ G("<section class=\"project-picker\" aria-label=\"Campaign projects\"><div><p class=\"eyebrow\">CAMPAIGNS</p><h2>Choose a campaign control surface</h2></div> <div></div></section>");
function Ws(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(""), m = /* @__PURE__ */ F("pending"), h = /* @__PURE__ */ F(""), g = /* @__PURE__ */ F("PRESERVE_HOLD"), _ = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(!1), y = /* @__PURE__ */ F(""), b = /* @__PURE__ */ F(""), x = {
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
			let t = e.researchPlan, n = (Array.isArray(t?.response?.lanes) ? t.response.lanes : []).filter((e) => w(e) === "ready"), r = t?.status === "drafted" && t?.response?.decision === "BLOCKED";
			return t?.status === "drafting" ? {
				status: "SOL CHECKING",
				title: "Sol is shaping the next bounded wave",
				detail: `The coordinator is checking ${C(e).length} requests for grain, dependencies, contracts, resources, and tunnel vision. It cannot dispatch.`,
				actions: []
			} : r ? {
				status: "OPERATOR TRANSITION",
				title: "The checked plan needs one operator-owned change",
				detail: S(t?.response?.operatorGuidance || "No safe lane can launch until the required transition is resolved."),
				actions: [{
					key: "scroll",
					label: "Open required operator gate",
					target: "#operator-gate",
					style: "primary-button"
				}]
			} : t?.status === "drafted" ? {
				status: "HUMAN PLAN GATE",
				title: `Review ${n.length} launchable lane${n.length === 1 ? "" : "s"}`,
				detail: S(t?.response?.summary || t?.response?.operatorGuidance || "The checked plan is ready for an explicit human gate."),
				actions: [
					{
						key: "research.review.resolve",
						label: `Approve & stage ${n.length} lane${n.length === 1 ? "" : "s"}`,
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
			let t = e.researchSchedule;
			return t?.status === "proposed" ? {
				status: "HUMAN LAUNCH GATE",
				title: `Confirm ${t.members?.length || 0} checked lane${t.members?.length === 1 ? "" : "s"}`,
				detail: "This reserves the exact immutable schedule digest but launches nothing. Autopilot can dispatch only after this human boundary is recorded.",
				actions: [{
					key: "research.schedule.confirm",
					targetId: t.id,
					args: { scheduleDigest: t.digest },
					label: "Confirm checked wave",
					style: "primary-button"
				}]
			} : t?.status === "confirmed" ? {
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
	async function D(e) {
		if (!(!H(d) || H(f))) {
			if (e.key === "scroll") {
				document.querySelector(e.target || "")?.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
				return;
			}
			if (e.key === "reveal") {
				let t = document.querySelector(e.target || "");
				t && (t.open = !0, t.scrollIntoView({
					behavior: "smooth",
					block: "start"
				}));
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
			I(f, e.key), I(m, "pending"), I(p, e.key === "refresh" ? "Rechecking the worker and receipt boundary…" : "Applying the checked transition…");
			try {
				if (e.key === "refresh") {
					await Ro(), I(m, "success"), I(p, "The worker and receipt boundary is current.");
					return;
				}
				let t = {
					...e.args || {},
					...["synthesis.review", "research.review.resolve"].includes(e.key) ? { note: H(h) } : {}
				}, n = await ns({
					projectId: H(d).id,
					type: e.key,
					targetId: e.targetId || "",
					args: t,
					scope: "primary-rail",
					pollLimit: ["synthesis.request", "research.review.start"].includes(e.key) ? 160 : 80
				});
				e.key === "research.failure.requeue" && n.project.phase === "RESEARCH_READY" && await ns({
					projectId: H(d).id,
					type: "loop.resume",
					scope: "primary-rail-retry",
					pollLimit: 80
				}), e.key === "synthesis.review" && e.args?.decision === "research" && n.project.phase === "RESEARCH_REVIEW" && await ns({
					projectId: H(d).id,
					type: "research.review.start",
					scope: "primary-rail",
					pollLimit: 160
				}), I(h, ""), I(m, "success"), I(p, "The transition settled and the live control state is current.");
			} catch (e) {
				I(m, "error"), I(p, e instanceof Error ? e.message : String(e));
			} finally {
				I(f, "");
			}
		}
	}
	async function O() {
		let e = H(d)?.recoveryReport;
		if (!(!H(d) || !e || e.status !== "prepared" || H(f) || !H(v))) {
			I(f, "campaign.recovery.apply"), I(m, "pending"), I(p, "Revalidating the exact recovery digest…");
			try {
				await ns({
					projectId: H(d).id,
					type: "campaign.recovery.apply",
					args: {
						reportId: e.id,
						reportDigest: e.reportDigest,
						decision: H(g),
						note: H(_),
						confirmation: "APPLY CAMPAIGN RECOVERY"
					},
					scope: "recovery-rail"
				}), I(v, !1), I(_, ""), I(m, "success"), I(p, "The selected historical recovery decision settled. No worker result, dispatch, claim promotion, merge, or push was inferred.");
			} catch (e) {
				I(m, "error"), I(p, e instanceof Error ? e.message : String(e));
			} finally {
				I(f, "");
			}
		}
	}
	B(() => n(), () => {
		I(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(d), () => {
		I(a, Array.isArray(H(d)?.loop?.steps) ? H(d)?.loop?.steps.at(-1) : null);
	}), B(() => (H(d), H(a)), () => {
		I(o, H(d)?.loop?.status === "attention" && H(a)?.status === "failed" ? String(H(d)?.loop?.error || "") : "");
	}), B(() => (H(o), H(b)), () => {
		H(o) && H(o) !== H(b) && (I(b, H(o)), I(m, "error"), I(p, S(H(o), 520)));
	}), B(() => (H(o), H(b)), () => {
		!H(o) && H(b) && I(b, "");
	}), B(() => H(d), () => {
		I(s, H(d) ? E(H(d)) : null);
	}), B(() => H(d), () => {
		I(c, Array.isArray(H(d)?.researchPlan?.response?.lanes) ? H(d).researchPlan.response.lanes : []);
	}), B(() => H(d), () => {
		I(l, H(d)?.wave?.synthesis?.response || null);
	}), B(() => (H(d), H(l)), () => {
		I(u, [
			"DECISION_REQUIRED",
			"NEXT_WAVE_READY",
			"SYNTHESIZING",
			"SYNTHESIS_READY"
		].includes(String(H(d)?.phase || "")) ? H(l)?.waveReview?.coordinatorGuidance || H(l)?.operatorBrief?.nextDecision || H(l)?.nextWave?.objective || H(d)?.researchPlan?.response?.operatorGuidance || H(d)?.role || "" : H(d)?.researchPlan?.response?.operatorGuidance || H(l)?.waveReview?.coordinatorGuidance || H(l)?.nextWave?.objective || H(d)?.role || "");
	}), B(() => (H(d), H(y)), () => {
		(H(d)?.recoveryReport?.id || "") !== H(y) && (I(y, H(d)?.recoveryReport?.id || ""), I(g, "PRESERVE_HOLD"), I(_, ""), I(v, !1));
	}), Br(), vo();
	var k = ca(), A = R(k), j = (e) => {
		var t = Vs(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
		N(i);
		var o = z(i), y = L(o, !0);
		N(o);
		var b = z(o), C = L(b, !0);
		N(b), N(r);
		var T = z(r, 2), E = L(T, !0);
		N(T);
		var k = z(T, 2), A = L(k, !0);
		N(k);
		var j = z(k, 2), ee = (e) => {
			var t = Os(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V((e) => q(r, e), [() => (H(u), U(() => S(H(u), 360)))]), K(e, t);
		};
		J(j, (e) => {
			H(u) && e(ee);
		});
		var te = z(j, 2), M = (e) => {
			var t = ks(), n = z(L(t)), r = L(n);
			N(n), N(t), V((e) => q(r, `${e ?? ""} · ${H(d), U(() => H(d).controlState.observation.active) ?? ""} active`), [() => (H(d), U(() => x[H(d).controlState.observation.phase] || H(d).controlState.observation.phase?.toLowerCase().replaceAll("_", " ")))]), K(e, t);
		};
		J(te, (e) => {
			H(d), U(() => H(d).controlState?.observation) && e(M);
		});
		var ne = z(te, 2), re = z(L(ne), 2), ie = L(re), ae = z(L(ie));
		N(ie);
		var oe = z(ie, 2), se = z(L(oe));
		N(oe);
		var ce = z(oe, 2), le = z(L(ce));
		N(ce), N(re), N(ne), N(n);
		var ue = z(n, 2);
		Y(ue, 5, () => (H(s), U(() => H(s).actions)), _a, (e, t) => {
			var n = As(), r = L(n, !0);
			N(n), V((e) => {
				X(n, 1, Ma((H(t), U(() => H(t).style || "outline-button")))), n.disabled = e, q(r, (H(f), H(t), U(() => H(f) === H(t).key ? "Working…" : H(t).label)));
			}, [() => (H(f), U(() => !!H(f)))]), W("click", n, () => D(H(t))), K(e, n);
		}), N(ue);
		var de = z(ue, 2), fe = (e) => {
			var t = Is(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = L(a), s = (e) => {
				var t = Ns(), n = R(t), r = L(n, !0);
				N(n);
				var i = z(n, 2), a = (e) => {
					var t = Ms();
					Y(t, 5, () => (H(l), U(() => H(l).waveReview.quickChecks)), _a, (e, t) => {
						var n = js(), r = L(n), i = L(r, !0);
						N(r);
						var a = z(r), o = L(a, !0);
						N(a), N(n), V((e) => {
							X(n, 1, e), q(i, (H(t), U(() => H(t).status))), q(o, (H(t), U(() => H(t).check)));
						}, [() => Ma((H(t), U(() => String(H(t).status).toLowerCase())))]), K(e, n);
					}), N(t), K(e, t);
				};
				J(i, (e) => {
					H(l), U(() => H(l)?.waveReview?.quickChecks?.length) && e(a);
				}), V(() => q(r, (H(l), U(() => H(l)?.waveReview?.summary || "No synthesis summary was recorded.")))), K(e, t);
			}, u = (e) => {
				var t = Fs();
				Y(t, 5, () => H(c), _a, (e, t) => {
					var n = Ps(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a), s = L(o, !0);
					N(o);
					var c = z(o), l = L(c, !0);
					N(c);
					var u = z(c), d = L(u);
					N(u), N(a), N(n), V((e) => {
						q(i, (H(t), U(() => H(t).priority || "–"))), q(s, (H(t), U(() => H(t).taskId || "bounded lane"))), q(l, (H(t), U(() => H(t).question || H(t).objective || H(t).rationale))), q(d, `${e ?? ""} · ${H(t), U(() => H(t).profile || "sonnet-worker") ?? ""}`);
					}, [() => (H(t), U(() => w(H(t))))]), K(e, n);
				}), N(t), K(e, t);
			};
			J(o, (e) => {
				H(d), U(() => H(d).phase === "DECISION_REQUIRED") ? e(s) : e(u, -1);
			});
			var f = z(o, 2), p = z(L(f));
			tn(p), N(f), N(a), N(t), V(() => q(i, (H(d), H(l), H(c), U(() => H(d).phase === "DECISION_REQUIRED" ? `${H(l)?.nextWave?.lanes?.length || 0} proposed next lanes` : `${H(c).length} checked plan records`)))), so(p, () => H(h), (e) => I(h, e)), K(e, t);
		}, pe = /* @__PURE__ */ P(() => (H(d), U(() => ["DECISION_REQUIRED", "RESEARCH_REVIEW"].includes(H(d).phase))));
		J(de, (e) => {
			H(pe) && e(fe);
		});
		var me = z(de, 2), he = (e) => {
			var t = zs(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = (e) => {
				var t = Ls(), n = L(t), r = L(n), i = z(L(r)), a = L(i, !0);
				N(i), N(r);
				var o = z(r, 2), s = z(L(o)), c = L(s, !0);
				N(s), N(o);
				var l = z(o, 2), u = z(L(l)), p = L(u);
				N(u), N(l);
				var m = z(l, 2), h = z(L(m)), y = L(h, !0);
				N(h), N(m), N(n);
				var b = z(n, 2), x = z(L(b)), S = L(x, !0);
				N(x), N(b);
				var C = z(b, 2), w = L(C, !0);
				N(C);
				var T = z(C, 2), E = z(L(T)), D = L(E);
				D.value = D.__value = "PRESERVE_HOLD";
				var k = z(D);
				k.value = k.__value = "ALIGN_WAVE_TO_WORKFLOW";
				var A = z(k);
				A.value = A.__value = "ALIGN_WORKFLOW_TO_WAVE";
				var j = z(A);
				j.value = j.__value = "APPLY_VALIDATED_PROJECTION_REPAIR", N(E), N(T);
				var ee = z(T, 2), te = z(L(ee));
				tn(te), N(ee);
				var M = z(ee, 2), ne = L(M);
				$a(ne), Ke(), N(M);
				var re = z(M, 4), ie = L(re, !0);
				N(re), N(t), V((e) => {
					q(a, (H(d), U(() => H(d).recoveryReport.snapshot?.project?.phase))), q(c, (H(d), U(() => H(d).recoveryReport.snapshot?.wave?.phase))), q(p, `${H(d), U(() => H(d).recoveryReport.snapshot?.wave?.accounting?.accounted) ?? ""}/${H(d), U(() => H(d).recoveryReport.snapshot?.wave?.accounting?.total) ?? ""}`), q(y, (H(d), U(() => H(d).recoveryReport.snapshot?.controlState?.recovery?.activeExecution || 0))), q(S, (H(d), U(() => H(d).recoveryReport.reportDigest))), q(w, (H(d), U(() => H(d).recoveryReport.snapshot?.projectionRepair?.summary))), j.disabled = (H(d), U(() => !H(d).recoveryReport.snapshot?.choices?.applyProjectionRepair)), re.disabled = e, q(ie, H(f) === "campaign.recovery.apply" ? "Revalidating…" : "Apply selected recovery");
				}, [() => (H(v), H(f), U(() => !H(v) || !!H(f)))]), Ha(E, () => H(g), (e) => I(g, e)), so(te, () => H(_), (e) => I(_, e)), co(ne, () => H(v), (e) => I(v, e)), W("click", re, O), K(e, t);
			}, s = (e) => {
				K(e, Rs());
			};
			J(a, (e) => {
				H(d), U(() => H(d).recoveryReport?.status === "prepared") ? e(o) : e(s, -1);
			}), N(t), V(() => {
				t.open = (H(d), U(() => H(d).recoveryReport?.status === "prepared")), q(i, (H(d), U(() => H(d).recoveryReport?.status === "prepared" ? "DIGEST FROZEN" : "REPORT REQUIRED")));
			}), K(e, t);
		};
		J(me, (e) => {
			H(d), H(s), U(() => H(d).controlState?.recovery?.required && H(s).status !== "SAFE RETRY READY") && e(he);
		});
		var ge = z(me, 2), _e = (e) => {
			var t = Bs(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `gate-feedback ${H(m) ?? ""}`), q(n, H(p));
			}), K(e, t);
		};
		J(ge, (e) => {
			H(p) && e(_e);
		}), N(t), V((e, t) => {
			q(a, (H(d), U(() => H(d).id))), q(y, e), q(C, (H(s), U(() => H(s).status))), q(E, (H(s), U(() => H(s).title))), q(A, (H(s), U(() => H(s).detail))), q(ae, ` ${H(d), U(() => H(d).phase === "RESEARCH_READY" ? "The research question and resource cap are fixed, but no worker may run until the exact schedule is confirmed." : H(d).phase === "RESEARCH_INTAKE" ? "A worker boundary has settled; Lane Watch is deciding whether there is valid evidence to accept or an infrastructure attempt to retry." : "This is the next authority boundary in the campaign loop; observation alone cannot cross it.") ?? ""}`), q(se, ` ${t ?? ""}`), q(le, ` ${H(s), U(() => H(s).actions[0]?.key === "research.failure.requeue" ? "It preserves the failed attempt, restores the same checked question to scheduling, and prepares a new confirmation gate. It does not claim a result or dispatch by itself." : H(s).actions[0]?.key === "research.schedule.confirm" ? "It authorizes only this frozen task list and budget. It does not yet accept evidence or change campaign truth." : "Only the named workflow boundary changes; worker output, mathematical truth, Git integration, and publication remain separately gated.") ?? ""}`);
		}, [() => (H(d), U(() => x[H(d).phase] || H(d).phase?.toLowerCase().replaceAll("_", " "))), () => (H(d), H(u), U(() => S(H(d).researchSchedule?.members?.[0]?.expectedDelta || H(d).researchPlan?.response?.lanes?.[0]?.evidenceExpected || H(u) || H(d).role, 420)))]), K(e, t);
	}, ee = (e) => {
		var t = Us(), r = z(L(t), 2);
		Y(r, 5, () => (n(), U(() => n().control.projectIndex)), _a, (e, t) => {
			var n = Hs(), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a, !0);
			N(a);
			var s = z(a), c = L(s, !0);
			N(s), N(n), V(() => {
				q(i, (H(t), U(() => H(t).id))), q(o, (H(t), U(() => x[H(t).phase] || H(t).phase))), q(c, (H(t), U(() => H(t).role)));
			}), W("click", n, () => No(String(H(t).id))), K(e, n);
		}), N(r), N(t), K(e, t);
	};
	J(A, (e) => {
		H(d) && H(s) ? e(j) : (n(), U(() => n().control?.projectIndex?.length) && e(ee, 1));
	}), K(e, k), xt(), i();
}
//#endregion
//#region src/ui/PacketInbox.svelte
Zi(["click"]), Ho();
var Gs = /* @__PURE__ */ G("<li><span> </span> <div><strong> </strong><small> </small></div> <code> </code></li>"), Ks = /* @__PURE__ */ G("<ol class=\"packet-list\"></ol>"), qs = /* @__PURE__ */ G("<p class=\"packet-empty\">No queue packets are currently in the bounded context window.</p>"), Js = /* @__PURE__ */ G("<section class=\"packet-inbox\" id=\"packet-inbox\" aria-label=\"Research packet inbox\"><header><div><p>RESEARCH PACKET INBOX</p><h2>Drop context here; promote it through explicit gates</h2><span>A packet may shape the next plan. It cannot dispatch, adopt a wave, or become mathematical authority by appearing here.</span></div> <strong> </strong></header> <div class=\"packet-drop\"><div><span>WATCHED DROP POINT</span><code> </code><small>The context registry hashes the five newest Markdown packets on its next observation pass.</small></div> <button class=\"outline-button compact\"> </button></div> <div class=\"packet-intake-grid\"><section><div class=\"packet-section-title\"><span>RECEIVED CONTEXT</span><strong> </strong></div> <!></section> <section class=\"packet-contract\"><div class=\"packet-section-title\"><span>MINIMUM PACKET CONTRACT</span><strong>Markdown · context only</strong></div> <ol><li><b>1</b><span><strong>Question and intended delta</strong><small>What should change in campaign knowledge if the work succeeds?</small></span></li> <li><b>2</b><span><strong>Dependencies and exact evidence base</strong><small>Name required receipts, commits, or unresolved gates.</small></span></li> <li><b>3</b><span><strong>Allowed work and stop conditions</strong><small>Bound scope, resources, prohibited inference, and honest failure.</small></span></li> <li><b>4</b><span><strong>Proposed lanes, never authority</strong><small>Sol review and later human confirmation compile any launch contract.</small></span></li></ol></section></div> <footer><b> </b> <span> </span></footer></section>");
function Ys(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(!1);
	function d(e) {
		return e.replaceAll("\\", "/").split("/").at(-1)?.replace(/\.md$/i, "") || e;
	}
	function f(e) {
		return e.replace(/^sha256:/, "").slice(0, 12);
	}
	async function p() {
		if (!H(l) || !navigator.clipboard) return;
		let e = String(H(l).root || "").replace(/[\\/]$/, "");
		await navigator.clipboard.writeText(`${e}\\packets\\queue`), I(u, !0), setTimeout(() => I(u, !1), 1600);
	}
	B(() => n(), () => {
		I(l, n().control?.projects?.find((e) => e.id === n().selectedProject) || n().control?.projects?.[0] || null);
	}), B(() => H(l), () => {
		I(a, (Array.isArray(H(l)?.context?.sources) ? H(l).context.sources : []).filter((e) => e.role === "queue-plan").sort((e, t) => String(t.modifiedAt || "").localeCompare(String(e.modifiedAt || ""))));
	}), B(() => H(l), () => {
		I(o, !!H(l)?.controlState?.recovery?.required);
	}), B(() => (H(a), H(o)), () => {
		I(s, H(a).length ? H(o) ? "STAGED · CONTROL HOLD" : "STAGED FOR REVIEW" : "WAITING FOR PACKET");
	}), B(() => H(l), () => {
		I(c, H(l) ? `campaigns/${H(l).id}/packets/queue/` : "campaigns/<project>/packets/queue/");
	}), Br(), vo();
	var m = ca(), h = R(m), g = (e) => {
		var t = Js(), n = L(t), r = z(L(n), 2);
		let i;
		var l = L(r, !0);
		N(r), N(n);
		var m = z(n, 2), h = L(m), g = z(L(h)), _ = L(g, !0);
		N(g), Ke(), N(h);
		var v = z(h, 2), y = L(v, !0);
		N(v), N(m);
		var b = z(m, 2), x = L(b), S = L(x), C = z(L(S)), w = L(C);
		N(C), N(S);
		var T = z(S, 2), E = (e) => {
			var t = Ks();
			Y(t, 7, () => H(a), (e) => e.id, (e, t, n) => {
				var r = Gs();
				let i;
				var a = L(r), o = L(a, !0);
				N(a);
				var s = z(a, 2), c = L(s), l = L(c, !0);
				N(c);
				var u = z(c), p = L(u);
				N(u), N(s);
				var m = z(s, 2), h = L(m, !0);
				N(m), N(r), V((e, a, s, c) => {
					i = X(r, 1, "", null, i, { newest: H(n) === 0 }), q(o, H(n) === 0 ? "NEWEST" : `QUEUE ${H(n) + 1}`), q(l, e), q(p, `${a ?? ""} · ${s ?? ""} bytes`), Z(m, "title", (H(t), U(() => H(t).sha256))), q(h, c);
				}, [
					() => (H(t), U(() => d(H(t).path))),
					() => (H(t), U(() => new Date(H(t).modifiedAt).toLocaleString())),
					() => (H(t), U(() => Number(H(t).bytes || 0).toLocaleString())),
					() => (H(t), U(() => f(H(t).sha256)))
				]), K(e, r);
			}), N(t), K(e, t);
		}, D = (e) => {
			K(e, qs());
		};
		J(T, (e) => {
			H(a), U(() => H(a).length) ? e(E) : e(D, -1);
		}), N(x), Ke(2), N(b);
		var O = z(b, 2);
		let k;
		var A = L(O), j = L(A, !0);
		N(A);
		var ee = z(A, 2), te = L(ee, !0);
		N(ee), N(O), N(t), V(() => {
			i = X(r, 1, "", null, i, { hold: H(o) }), q(l, H(s)), q(_, H(c)), q(y, H(u) ? "Copied" : "Copy full path"), q(w, `${H(a), U(() => H(a).length) ?? ""}/5 bounded slots`), k = X(O, 1, "", null, k, { hold: H(o) }), q(j, H(o) ? "RECEIVE-ONLY BOUNDARY" : "READY FOR SEMANTIC REVIEW"), q(te, H(o) ? "CFG23 can receive and hash the packet now, but recovery must be resolved before it can become a checked plan." : "The packet is visible to the next bounded Sol planning turn; launch gates remain separate.");
		}), W("click", v, p), K(e, t);
	};
	J(h, (e) => {
		H(l) && e(g);
	}), K(e, m), xt(), i();
}
Zi(["click"]);
//#endregion
//#region src/ui/campaign-interpretation.ts
var Xs = [
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
function Zs(e) {
	return Array.isArray(e) ? e : [];
}
function Qs(e) {
	let t = $(e).toUpperCase();
	return t.includes("NOT_SUPPORTED") || t.includes("BLOCK") || t.includes("REFUT") ? "BLOCKED" : t.includes("UNMEASURED") || t.includes("UNCHANGED") || t.includes("OPEN") ? "UNMEASURED" : t.includes("SUPPORTED") || t.includes("ADVANCED") ? "SUPPORTED" : t.includes("PENDING") || t.includes("PROPOSED") ? "PROPOSED" : "CONTEXT";
}
function $s(e) {
	let t = Zs(e?.researchRuns).filter((e) => [
		"launching",
		"running",
		"blocked",
		"evidence_ready",
		"returned_to_sol"
	].includes(e?.status)).sort((e, t) => $(t?.updatedAt).localeCompare($(e?.updatedAt)))[0];
	return $(t?.strategy?.trackId, $(e?.researchPlan?.response?.lanes?.[0]?.strategy?.trackId));
}
function ec(e, t) {
	let n = `${$(e?.claimId)} ${$(e?.summary)}`.toUpperCase();
	return n.includes("ASYM") || n.includes("SUPPLY") || n.includes("CANDIDATE") ? "supply" : n.includes("GEOMETRIC") || n.includes("REALIZATION") || n.includes("DECISION") ? "decision" : n.includes("COVERAGE") || n.includes("CENSUS") || n.includes("V4") || n.includes("C2") ? "coverage" : t;
}
function tc(e) {
	let t = e?.wave?.synthesis?.response || null, n = e?.researchPlan?.response || null, r = t?.operatorBrief || {}, i = e?.strategy?.charter || {}, a = !!(n && [
		"RESEARCH_REVIEW",
		"RESEARCH_READY",
		"REVISING"
	].includes($(e?.phase))), o = a ? "checked-plan" : t ? "frozen-synthesis" : n ? "checked-plan" : "campaign-state", s = $s(e), c = {
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
		evidence: Zs(r.recentProgress).map((e) => $(e)).filter(Boolean),
		scope: Zs(r.watchouts).map((e) => $(e)).filter(Boolean)
	}, u = (a && Zs(n?.lanes).length ? Zs(n.lanes).filter((e) => $(e?.action).toUpperCase() !== "DROP") : Zs(t?.nextWave?.lanes).length ? Zs(t.nextWave.lanes) : Zs(n?.lanes)).filter(Boolean), d = new Set(a ? u.map((e) => $(e?.strategy?.trackId, $(e?.trackId))).filter(Boolean) : [s].filter(Boolean)), f = {
		id: "next-decision",
		kind: "decision",
		kicker: "HUMAN DECISION",
		title: a ? "Approve, revise, or block the checked next-wave plan." : $(r.nextDecision, $(n?.operatorGuidance, "Choose the next bounded campaign move.")),
		summary: a ? $(n?.operatorGuidance, $(n?.summary)) : $(t?.nextWave?.objective, $(n?.summary, "Select only work whose expected knowledge delta justifies its resource and evidence contract.")),
		state: e?.controlState?.recovery?.required ? "BLOCKED" : "PROPOSED",
		why: "The campaign branches here; no proposal acquires authority until the operator chooses and a checked schedule is frozen.",
		relation: "The selected branch returns to the main campaign line through planning, evidence intake, synthesis, and another explicit decision.",
		unlocks: u.map((e) => $(e?.objective, $(e?.question, $(e?.taskId)))).filter(Boolean)
	}, p = Zs(i.tracks).map((e) => ({
		id: `track-${$(e?.id, "unknown")}`,
		kind: "track",
		kicker: `${Math.round(Number(e?.targetShare || 0) * 100)}% TARGET`,
		title: $(e?.label, $(e?.id, "Research track")),
		summary: $(e?.purpose, "A persistent route from bounded work back to the campaign objective."),
		state: d.has($(e?.id)) ? "ACTIVE" : "OPEN",
		trackId: $(e?.id),
		relation: `This track is one of ${Math.max(1, Zs(i.tracks).length)} balanced routes to the campaign objective.`,
		metrics: Zs(e?.metrics).map((e) => $(e)).filter(Boolean),
		color: $(e?.color, "#71d6a0")
	})), m = Zs(t?.claimDeltas).map((e, t) => ({
		id: `claim-${$(e?.claimId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
		kind: "claim",
		kicker: "KNOWLEDGE DELTA",
		title: $(e?.summary, $(e?.claimId, "Claim update")),
		summary: $(e?.summary, "The synthesis recorded a bounded change in campaign knowledge."),
		state: Qs(e?.proposedStatus),
		trackId: ec(e, s),
		why: `Status: ${$(e?.proposedStatus, "context only").replaceAll("_", " ")}.`,
		relation: "Claim deltas are the bridge between a completed lane and measurable progress toward the campaign objective.",
		evidence: Zs(e?.evidence).map((e) => $(e)).filter(Boolean),
		scope: Zs(e?.objections).map((e) => $(e)).filter(Boolean)
	})), h = u.map((e, t) => {
		let r = Zs(n?.lanes).find((t) => t?.taskId === e?.taskId) || e, i = $(r?.strategy?.trackId, $(e?.trackId, "unassigned"));
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
	}), _ = Xs.filter((e) => e.pattern.test(g)).map((e) => ({
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
		progress: Zs(r.recentProgress).map((e) => $(e)).filter(Boolean),
		watchouts: Zs(r.watchouts).map((e) => $(e)).filter(Boolean),
		tracks: p,
		claims: m,
		proposals: h,
		concepts: _
	};
}
function nc(e) {
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
var rc = /* @__PURE__ */ G("<li><b></b><span> </span></li>"), ic = /* @__PURE__ */ G("<ol></ol>"), ac = /* @__PURE__ */ G("<p>No synthesized progress delta is available yet.</p>"), oc = /* @__PURE__ */ G("<li> </li>"), sc = /* @__PURE__ */ G("<div class=\"brief-ledger\"><section><header><span>WHAT CHANGED</span><strong> </strong></header> <!></section> <details open=\"\"><summary><span>SCOPE & WATCHOUTS</span><strong> </strong></summary> <ul></ul></details></div>"), cc = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button>"), lc = /* @__PURE__ */ G("<div class=\"atlas-empty\"><span>OPEN CAPACITY</span><strong>No current claim or proposed lane is assigned here.</strong></div>"), uc = /* @__PURE__ */ G("<section class=\"atlas-track\"><button><span> </span><strong> </strong><small> </small></button> <div><!></div></section>"), dc = /* @__PURE__ */ G("<button><span>CONTEXT</span><strong> </strong></button>"), fc = /* @__PURE__ */ G("<section class=\"object-codex\"><header><span>OBJECT CODEX</span><strong>Learn the mathematical pieces on this map</strong></header> <div></div></section>"), pc = /* @__PURE__ */ G("<details open=\"\"><summary>Evidence <strong> </strong></summary><ul></ul></details>"), mc = /* @__PURE__ */ G("<details open=\"\"><summary>Scope & objections <strong> </strong></summary><ul></ul></details>"), hc = /* @__PURE__ */ G("<details><summary>What this could unlock <strong> </strong></summary><ul></ul></details>"), gc = /* @__PURE__ */ G("<details><summary>Progress measures <strong> </strong></summary><ul></ul></details>"), _c = /* @__PURE__ */ G("<div class=\"atlas-inspector-lists\"><!> <!> <!> <!></div>"), vc = /* @__PURE__ */ G("<aside aria-live=\"polite\"><header><div><span> </span><h4> </h4></div><strong> </strong></header> <div class=\"atlas-inspector-grid\"><section><span>WHAT THIS IS</span><p> </p></section> <section><span>WHY IT MATTERS</span><p> </p></section> <section><span>HOW IT CONNECTS</span><p> </p></section> <section><span>AUTHORITY</span><p> </p></section></div> <!></aside>"), yc = /* @__PURE__ */ G("<section class=\"interpretation-surface\" id=\"campaign-interpretation\" aria-label=\"Campaign interpretation and research atlas\"><header class=\"interpretation-heading\"><div><p>CAMPAIGN INTERPRETATION</p> <h2>Understand the mission before choosing the move</h2> <span>A generated briefing and explorable mathematical map, grounded in the same frozen evidence as the control plane.</span></div> <strong> </strong></header> <div class=\"director-deck\"><button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button></div> <!> <section class=\"research-atlas\" aria-label=\"Research Atlas\"><header><div><p>RESEARCH ATLAS</p><h3>How bounded work connects back to the campaign objective</h3><span>Select any station to inspect its meaning, evidence, scope, and unlocks.</span></div> <div class=\"atlas-legend\" aria-label=\"Interpretation status legend\"><span class=\"supported\">SUPPORTED</span><span class=\"proposed\">PROPOSED</span><span class=\"unmeasured\">UNMEASURED</span><span class=\"blocked\">BLOCKED</span><span class=\"context\">CONTEXT</span></div></header> <div class=\"atlas-board\"><div class=\"atlas-north-star\"><button><span>NORTH STAR</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>CURRENT KNOWLEDGE</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>NEXT BRANCH</span><strong> </strong></button></div> <div class=\"atlas-track-list\"></div> <!></div> <!> <footer><b>INTERPRETATION IS NOT AUTHORITY</b><span>Generated prose helps navigate. Exact receipts, claim states, and human gates remain the source of campaign authority.</span></footer></section></section>");
function bc(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F("campaign-objective"), l = /* @__PURE__ */ F("");
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
		I(c, e.id), requestAnimationFrame(() => document.querySelector(".atlas-inspector")?.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		}));
	}
	B(() => n(), () => {
		I(o, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => (H(o), tc), () => {
		I(s, H(o) ? tc(H(o)) : null);
	}), B(() => (H(o), H(l)), () => {
		H(o)?.id !== H(l) && (I(l, H(o)?.id || ""), I(c, "campaign-objective"));
	}), B(() => (H(s), H(c)), () => {
		I(a, u(H(s)).find((e) => e.id === H(c)) || H(s)?.objective || null);
	}), Br(), vo();
	var p = ca(), m = R(p), h = (e) => {
		var t = yc(), n = L(t), r = z(L(n), 2), i = L(r, !0);
		N(r), N(n);
		var o = z(n, 2), c = L(o), l = L(c), u = L(l, !0);
		N(l);
		var p = z(l, 2), m = L(p, !0);
		N(p);
		var h = z(p, 2), g = L(h, !0);
		N(h);
		var _ = z(h, 2), v = L(_, !0);
		N(_), N(c);
		var y = z(c, 4), b = L(y), x = L(b, !0);
		N(b);
		var S = z(b, 2), C = L(S, !0);
		N(S);
		var w = z(S, 2), T = L(w, !0);
		N(w);
		var E = z(w, 2), D = L(E, !0);
		N(E), N(y);
		var O = z(y, 4), k = L(O), A = L(k, !0);
		N(k);
		var j = z(k, 2), ee = L(j, !0);
		N(j);
		var te = z(j, 2), M = L(te, !0);
		N(te);
		var ne = z(te, 2), re = L(ne, !0);
		N(ne), N(O), N(o);
		var ie = z(o, 2), ae = (e) => {
			var t = sc(), n = L(t), r = L(n), i = z(L(r)), a = L(i);
			N(i), N(r);
			var o = z(r, 2), c = (e) => {
				var t = ic();
				Y(t, 5, () => (H(s), U(() => H(s).progress)), _a, (e, t, n) => {
					var r = rc(), i = L(r);
					i.textContent = n + 1;
					var a = z(i), o = L(a, !0);
					N(a), N(r), V(() => q(o, H(t))), K(e, r);
				}), N(t), K(e, t);
			}, l = (e) => {
				K(e, ac());
			};
			J(o, (e) => {
				H(s), U(() => H(s).progress.length) ? e(c) : e(l, -1);
			}), N(n);
			var u = z(n, 2), d = L(u), f = z(L(d)), p = L(f);
			N(f), N(d);
			var m = z(d, 2);
			Y(m, 5, () => (H(s), U(() => H(s).watchouts)), _a, (e, t) => {
				var n = oc(), r = L(n, !0);
				N(n), V(() => q(r, H(t))), K(e, n);
			}), N(m), N(u), N(t), V(() => {
				q(a, `${H(s), U(() => H(s).progress.length) ?? ""} evidence-backed update${H(s), U(() => H(s).progress.length === 1 ? "" : "s") ?? ""}`), q(p, `${H(s), U(() => H(s).watchouts.length) ?? ""} boundary note${H(s), U(() => H(s).watchouts.length === 1 ? "" : "s") ?? ""}`);
			}), K(e, t);
		};
		J(ie, (e) => {
			H(s), U(() => H(s).progress.length || H(s).watchouts.length) && e(ae);
		});
		var oe = z(ie, 2), se = z(L(oe), 2), ce = L(se), le = L(ce);
		let ue;
		var de = z(L(le)), fe = L(de, !0);
		N(de), N(le);
		var pe = z(le, 4);
		let me;
		var he = z(L(pe)), ge = L(he, !0);
		N(he), N(pe);
		var _e = z(pe, 4);
		let ve;
		var ye = z(L(_e)), be = L(ye, !0);
		N(ye), N(_e), N(ce);
		var xe = z(ce, 2);
		Y(xe, 5, () => (H(s), U(() => H(s).tracks)), (e) => e.id, (e, t) => {
			var n = uc(), r = L(n);
			let i;
			var o = L(r), c = L(o, !0);
			N(o);
			var l = z(o), u = L(l, !0);
			N(l);
			var p = z(l), m = L(p, !0);
			N(p), N(r);
			var h = z(r, 2);
			let g;
			var _ = L(h), v = (e) => {
				var n = ca();
				Y(R(n), 1, () => (H(s), H(t), U(() => d(H(s), H(t).trackId))), (e) => e.id, (e, t) => {
					var n = cc();
					let r;
					var i = L(n), o = L(i, !0);
					N(i);
					var s = z(i), c = L(s, !0);
					N(s);
					var l = z(s), u = L(l, !0);
					N(l), N(n), V((e) => {
						r = X(n, 1, `atlas-station state-${e ?? ""}`, null, r, { chosen: H(a)?.id === H(t).id }), q(o, (H(t), U(() => H(t).kicker))), q(c, (H(t), U(() => H(t).title))), q(u, (H(t), U(() => H(t).state)));
					}, [() => (H(t), U(() => H(t).state.toLowerCase()))]), W("click", n, () => f(H(t))), K(e, n);
				}), K(e, n);
			}, y = /* @__PURE__ */ P(() => (H(s), H(t), U(() => d(H(s), H(t).trackId).length))), b = (e) => {
				K(e, lc());
			};
			J(_, (e) => {
				H(y) ? e(v) : e(b, -1);
			}), N(h), N(n), V((e, o) => {
				za(n, (H(t), U(() => `--track-color:${H(t).color || "#71d6a0"}`))), i = X(r, 1, `atlas-track-label state-${e ?? ""}`, null, i, { chosen: H(a)?.id === H(t).id }), q(c, (H(t), U(() => H(t).kicker))), q(u, (H(t), U(() => H(t).title))), q(m, (H(t), U(() => H(t).state === "ACTIVE" ? "current route" : "persistent route"))), g = X(h, 1, "atlas-rail", null, g, o);
			}, [() => (H(t), U(() => H(t).state.toLowerCase())), () => ({ empty: !d(H(s), H(t).trackId).length })]), W("click", r, () => f(H(t))), K(e, n);
		}), N(xe);
		var Se = z(xe, 2), Ce = (e) => {
			var t = fc(), n = z(L(t), 2);
			Y(n, 5, () => (H(s), U(() => H(s).concepts)), (e) => e.id, (e, t) => {
				var n = dc();
				let r;
				var i = z(L(n)), o = L(i, !0);
				N(i), N(n), V(() => {
					r = X(n, 1, "", null, r, { chosen: H(a)?.id === H(t).id }), q(o, (H(t), U(() => H(t).title)));
				}), W("click", n, () => f(H(t))), K(e, n);
			}), N(n), N(t), K(e, t);
		};
		J(Se, (e) => {
			H(s), U(() => H(s).concepts.length) && e(Ce);
		}), N(se);
		var we = z(se, 2), Te = (e) => {
			var t = vc(), n = L(t), r = L(n), i = L(r), o = L(i);
			N(i);
			var s = z(i), c = L(s, !0);
			N(s), N(r);
			var l = z(r), u = L(l, !0);
			N(l), N(n);
			var d = z(n, 2), f = L(d), p = z(L(f)), m = L(p, !0);
			N(p), N(f);
			var h = z(f, 2), g = z(L(h)), _ = L(g, !0);
			N(g), N(h);
			var v = z(h, 2), y = z(L(v)), b = L(y, !0);
			N(y), N(v);
			var x = z(v, 2), S = z(L(x)), C = L(S, !0);
			N(S), N(x), N(d);
			var w = z(d, 2), T = (e) => {
				var t = _c(), n = L(t), r = (e) => {
					var t = pc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).evidence)), _a, (e, t) => {
						var n = oc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).evidence.length)))), K(e, t);
				};
				J(n, (e) => {
					H(a), U(() => H(a).evidence?.length) && e(r);
				});
				var i = z(n, 2), o = (e) => {
					var t = mc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).scope)), _a, (e, t) => {
						var n = oc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).scope.length)))), K(e, t);
				};
				J(i, (e) => {
					H(a), U(() => H(a).scope?.length) && e(o);
				});
				var s = z(i, 2), c = (e) => {
					var t = hc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).unlocks)), _a, (e, t) => {
						var n = oc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).unlocks.length)))), K(e, t);
				};
				J(s, (e) => {
					H(a), U(() => H(a).unlocks?.length) && e(c);
				});
				var l = z(s, 2), u = (e) => {
					var t = gc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).metrics)), _a, (e, t) => {
						var n = oc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).metrics.length)))), K(e, t);
				};
				J(l, (e) => {
					H(a), U(() => H(a).metrics?.length) && e(u);
				}), N(t), K(e, t);
			};
			J(w, (e) => {
				H(a), U(() => H(a).evidence?.length || H(a).scope?.length || H(a).unlocks?.length || H(a).metrics?.length) && e(T);
			}), N(t), V((e, n, r) => {
				X(t, 1, `atlas-inspector state-${e ?? ""}`), q(o, `${H(a), U(() => H(a).kicker) ?? ""} · ${n ?? ""}`), q(c, (H(a), U(() => H(a).title))), q(u, (H(a), U(() => H(a).state))), q(m, (H(a), U(() => H(a).summary))), q(_, (H(a), U(() => H(a).why || "It provides a typed connection between bounded activity and the campaign objective."))), q(b, (H(a), U(() => H(a).relation || "It rejoins the campaign through the normal evidence and decision gates."))), q(C, r);
			}, [
				() => (H(a), U(() => H(a).state.toLowerCase())),
				() => (H(a), U(() => H(a).kind.toUpperCase())),
				() => (Si(nc), H(a), U(() => nc(H(a).state)))
			]), K(e, t);
		};
		J(we, (e) => {
			H(a) && e(Te);
		}), Ke(2), N(oe), N(t), V((e, t, n, o) => {
			X(r, 1, `source-${H(s), U(() => H(s).source) ?? ""}`), q(i, e), X(c, 1, `director-card objective state-${t ?? ""}`), q(u, (H(s), U(() => H(s).objective.kicker))), q(m, (H(s), U(() => H(s).objective.title))), q(g, (H(s), U(() => H(s).objective.summary))), q(v, (H(s), U(() => H(s).objective.state))), X(y, 1, `director-card quest state-${n ?? ""}`), q(x, (H(s), U(() => H(s).quest.kicker))), q(C, (H(s), U(() => H(s).quest.title))), q(T, (H(s), U(() => H(s).quest.why))), q(D, (H(s), U(() => H(s).quest.state))), X(O, 1, `director-card decision state-${o ?? ""}`), q(A, (H(s), U(() => H(s).decision.kicker))), q(ee, (H(s), U(() => H(s).decision.title))), q(M, (H(s), U(() => H(s).decision.summary))), q(re, (H(s), U(() => H(s).decision.state))), ue = X(le, 1, "", null, ue, { chosen: H(a)?.id === H(s).objective.id }), q(fe, (H(s), U(() => H(s).objective.title))), me = X(pe, 1, "", null, me, { chosen: H(a)?.id === H(s).quest.id }), q(ge, (H(s), U(() => H(s).quest.title))), ve = X(_e, 1, "", null, ve, { chosen: H(a)?.id === H(s).decision.id }), q(be, (H(s), U(() => H(s).decision.title)));
		}, [
			() => (H(s), U(() => H(s).source.replaceAll("-", " "))),
			() => (H(s), U(() => H(s).objective.state.toLowerCase())),
			() => (H(s), U(() => H(s).quest.state.toLowerCase())),
			() => (H(s), U(() => H(s).decision.state.toLowerCase()))
		]), W("click", c, () => f(H(s).objective)), W("click", y, () => f(H(s).quest)), W("click", O, () => f(H(s).decision)), W("click", le, () => f(H(s).objective)), W("click", pe, () => f(H(s).quest)), W("click", _e, () => f(H(s).decision)), K(e, t);
	};
	J(m, (e) => {
		H(s) && e(h);
	}), K(e, p), xt(), i();
}
//#endregion
//#region src/ui/ExternalPerspective.svelte
Zi(["click"]), Ho();
var xc = /* @__PURE__ */ G("<a target=\"_blank\" rel=\"noreferrer\">Open source ↗</a>"), Sc = /* @__PURE__ */ G("<p class=\"redirect-error\"> </p>"), Cc = /* @__PURE__ */ G("<div class=\"redirect-shift\"><span>Proposed shift</span><strong> </strong></div>"), wc = /* @__PURE__ */ G("<div><span> </span><strong> </strong><p> </p></div>"), Tc = /* @__PURE__ */ G("<details><summary> </summary><div class=\"redirect-direction-list\"></div></details>"), Ec = /* @__PURE__ */ G("<div class=\"redirect-gate\"><small>Applying changes future synthesis and planning context and stages any new questions as proposals. It does not launch a worker.</small><button class=\"primary-button\"> </button></div>"), Dc = /* @__PURE__ */ G("<article class=\"redirect-proposal\"><div class=\"redirect-proposal-heading\"><div><span> </span><strong> </strong></div><!></div> <!> <p> </p> <!> <!> <!></article>"), Oc = /* @__PURE__ */ G("<div><span> </span><strong> </strong><small> </small></div>"), kc = /* @__PURE__ */ G("<details class=\"redirect-history\"><summary>Earlier external inputs <strong> </strong></summary><!></details>"), Ac = /* @__PURE__ */ G("<div role=\"status\"> </div>"), jc = /* @__PURE__ */ G("<section id=\"external-perspective\"><div class=\"redirect-heading\"><div><p class=\"eyebrow\">EXTERNAL PERSPECTIVE</p><h3>Widen or redirect the campaign</h3><p>Drop in a paper, argument, observation, or reframing. It pauses autopilot at a safe boundary and asks Sol to reshape direction without dispatching or invalidating landed evidence.</p></div><span class=\"redirect-status\"> </span></div> <details class=\"redirect-composer\"><summary><span> </span><strong>Sol read-only pass</strong></summary> <div class=\"redirect-fields\"><input maxlength=\"240\" placeholder=\"Short title (optional)\"/><input maxlength=\"2000\" inputmode=\"url\" placeholder=\"Source link (optional)\"/></div> <textarea id=\"redirect-content\" rows=\"6\" maxlength=\"24000\" placeholder=\"Paste the relevant idea, critique, external result, or your own reframing…\"></textarea> <div class=\"redirect-submit\"><small>This becomes an immutable input bundle. Sol compares it with the current synthesis, checked plan, and run history.</small><button class=\"primary-button\"> </button></div></details> <!> <!> <!></section>");
function Mc(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(""), m = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F(""), g = /* @__PURE__ */ F(""), _ = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F("pending");
	function y(e) {
		return `lane-watch-redirect:${e}`;
	}
	function b(e) {
		I(f, e);
		let t = {
			title: "",
			sourceUrl: "",
			content: ""
		};
		try {
			t = JSON.parse(sessionStorage.getItem(y(e)) || JSON.stringify(t));
		} catch {}
		I(p, t.title), I(m, t.sourceUrl), I(h, t.content);
	}
	function x() {
		if (H(d)) try {
			sessionStorage.setItem(y(H(d).id), JSON.stringify({
				title: H(p),
				sourceUrl: H(m),
				content: H(h)
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
		if (!(!H(d) || !H(h).trim() || H(g))) {
			x(), I(g, "submit"), I(v, "pending"), I(_, "Freezing the input and starting a read-only Sol redirect pass…");
			try {
				await ns({
					projectId: H(d).id,
					type: "campaign.redirect.submit",
					args: {
						title: H(p),
						sourceUrl: H(m),
						content: H(h)
					},
					scope: "external-perspective",
					pollLimit: 160
				}), I(p, ""), I(m, ""), I(h, "");
				try {
					sessionStorage.removeItem(y(H(d).id));
				} catch {}
				I(v, "success"), I(_, "The external perspective is frozen. Sol is comparing it with the campaign ledger.");
			} catch (e) {
				I(v, "error"), I(_, e instanceof Error ? e.message : String(e));
			} finally {
				I(g, "");
			}
		}
	}
	async function T(e) {
		if (!(!H(d) || H(g))) {
			I(g, "apply"), I(v, "pending"), I(_, "Applying the advisory redirect to future planning context…");
			try {
				await ns({
					projectId: H(d).id,
					type: "campaign.redirect.apply",
					targetId: e,
					scope: "external-perspective"
				}), I(v, "success"), I(_, "The redirect is now part of future synthesis and planning context. No worker was launched.");
			} catch (e) {
				I(v, "error"), I(_, e instanceof Error ? e.message : String(e));
			} finally {
				I(g, "");
			}
		}
	}
	B(() => n(), () => {
		I(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => (H(d), H(f)), () => {
		H(d)?.id && H(d).id !== H(f) && b(H(d).id);
	}), B(() => H(d), () => {
		I(a, Array.isArray(H(d)?.externalInputs) ? H(d).externalInputs : []);
	}), B(() => H(a), () => {
		I(o, H(a)[0] || null);
	}), B(() => H(o), () => {
		I(s, H(o)?.response && typeof H(o).response == "object" ? H(o).response : {});
	}), B(() => H(s), () => {
		I(c, Array.isArray(H(s)?.newDirections) ? H(s).newDirections : []);
	}), B(() => H(a), () => {
		I(l, H(a).some((e) => ["queued", "drafting"].includes(e.status)));
	}), B(() => H(o), () => {
		I(u, {
			queued: "QUEUED",
			drafting: "SOL RESHAPING",
			drafted: "HUMAN GATE",
			applied: "APPLIED",
			failed: "FAILED"
		}[H(o)?.status] || "OPEN");
	}), Br(), vo();
	var E = ca(), D = R(E), O = (e) => {
		var t = jc(), n = L(t), r = z(L(n)), i = L(r, !0);
		N(r), N(n);
		var d = z(n, 2), f = L(d), y = L(f), b = L(y, !0);
		N(y), Ke(), N(f);
		var E = z(f, 2), D = L(E);
		$a(D);
		var O = z(D);
		$a(O), N(E);
		var k = z(E, 2);
		tn(k);
		var A = z(k, 2), j = z(L(A)), ee = L(j, !0);
		N(j), N(A), N(d);
		var te = z(d, 2), M = (e) => {
			var t = Dc(), n = L(t), r = L(n), i = L(r), a = L(i);
			N(i);
			var l = z(i), u = L(l, !0);
			N(l), N(r);
			var d = z(r), f = (e) => {
				var t = xc();
				V(() => Z(t, "href", (H(o), U(() => H(o).sourceUrl)))), K(e, t);
			};
			J(d, (e) => {
				H(o), U(() => H(o).sourceUrl) && e(f);
			}), N(n);
			var p = z(n, 2), m = (e) => {
				var t = Sc(), n = L(t, !0);
				N(t), V(() => q(n, (H(o), U(() => H(o).error)))), K(e, t);
			};
			J(p, (e) => {
				H(o), U(() => H(o).error) && e(m);
			});
			var h = z(p, 2), _ = L(h, !0);
			N(h);
			var v = z(h, 2), y = (e) => {
				var t = Cc(), n = z(L(t)), r = L(n, !0);
				N(n), N(t), V(() => q(r, (H(s), U(() => H(s).perspectiveShift)))), K(e, t);
			};
			J(v, (e) => {
				H(s), U(() => H(s).perspectiveShift) && e(y);
			});
			var b = z(v, 2), x = (e) => {
				var t = Tc(), n = L(t), r = L(n);
				N(n);
				var i = z(n);
				Y(i, 5, () => H(c), _a, (e, t) => {
					var n = wc(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a);
					var s = z(a), c = L(s, !0);
					N(s), N(n), V(() => {
						q(i, (H(t), U(() => H(t).profile || "sonnet-worker"))), q(o, (H(t), U(() => H(t).question || "Direction"))), q(c, (H(t), U(() => H(t).rationale || "")));
					}), K(e, n);
				}), N(i), N(t), V(() => q(r, `Inspect ${H(c), U(() => H(c).length) ?? ""} proposed direction${H(c), U(() => H(c).length === 1 ? "" : "s") ?? ""}`)), K(e, t);
			};
			J(b, (e) => {
				H(c), U(() => H(c).length) && e(x);
			});
			var w = z(b, 2), E = (e) => {
				var t = Ec(), n = z(L(t)), r = L(n, !0);
				N(n), N(t), V((e) => {
					n.disabled = e, q(r, H(g) === "apply" ? "Applying…" : "Use this redirect");
				}, [() => (H(g), U(() => !!H(g)))]), W("click", n, () => T(H(o).id)), K(e, t);
			};
			J(w, (e) => {
				H(o), U(() => H(o).status === "drafted") && e(E);
			}), N(t), V((e, t) => {
				q(a, `${H(o), U(() => H(o).status) ?? ""} · ${e ?? ""}`), q(u, (H(o), U(() => H(o).title))), q(_, t);
			}, [() => (H(o), U(() => C(H(o).updatedAt))), () => (H(s), H(o), U(() => H(s).summary || (H(o).status === "drafting" ? "Sol is comparing this input against the current evidence, plan, and campaign assumptions." : S(H(o).content, 360))))]), K(e, t);
		};
		J(te, (e) => {
			H(o) && e(M);
		});
		var ne = z(te, 2), re = (e) => {
			var t = kc(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n), Y(z(n), 1, () => (H(a), U(() => H(a).slice(1))), _a, (e, t) => {
				var n = Oc(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a);
				var s = z(a), c = L(s, !0);
				N(s), N(n), V((e) => {
					q(i, (H(t), U(() => H(t).status))), q(o, (H(t), U(() => H(t).title))), q(c, e);
				}, [() => (H(t), U(() => C(H(t).updatedAt)))]), K(e, n);
			}), N(t), V(() => q(i, (H(a), U(() => H(a).length - 1)))), K(e, t);
		};
		J(ne, (e) => {
			H(a), U(() => H(a).length > 1) && e(re);
		});
		var ie = z(ne, 2), ae = (e) => {
			var t = Ac(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `gate-feedback redirect-feedback ${H(v) ?? ""}`), q(n, H(_));
			}), K(e, t);
		};
		J(ie, (e) => {
			H(_) && e(ae);
		}), N(t), V((e) => {
			X(t, 1, `redirect-intake ${H(o), U(() => H(o)?.status || "open") ?? ""}`), q(i, H(u)), d.open = (H(a), U(() => !H(a).length)), q(b, (H(a), U(() => H(a).length ? "Add another perspective" : "Add an external perspective"))), j.disabled = e, q(ee, H(l) ? "Redirect already running" : H(g) === "submit" ? "Freezing perspective…" : "Ask Sol to reshape the campaign");
		}, [() => (H(h), H(l), H(g), U(() => !H(h).trim() || H(l) || !!H(g)))]), W("input", D, x), so(D, () => H(p), (e) => I(p, e)), W("input", O, x), so(O, () => H(m), (e) => I(m, e)), W("input", k, x), so(k, () => H(h), (e) => I(h, e)), W("click", j, w), K(e, t);
	};
	J(D, (e) => {
		H(d) && e(O);
	}), K(e, E), xt(), i();
}
//#endregion
//#region src/ui/CoordinatorConsole.svelte
Zi(["input", "click"]), Ho();
var Nc = /* @__PURE__ */ G("<div><button class=\"outline-button compact\">Decline</button><button class=\"danger-button\">Accept</button></div>"), Pc = /* @__PURE__ */ G("<article><div><strong> </strong><p> </p></div><!></article>"), Fc = /* @__PURE__ */ G("<section class=\"coordinator-approvals\"><h3>Tool approval requests</h3><!></section>"), Ic = /* @__PURE__ */ G("<p>Syncing coordinator history…</p>"), Lc = /* @__PURE__ */ G("<article><span> </span><p> </p></article>"), Rc = /* @__PURE__ */ G("<p>No coordinator messages are loaded yet.</p>"), zc = /* @__PURE__ */ G("<button class=\"danger-button\">Interrupt turn</button>"), Bc = /* @__PURE__ */ G("<div class=\"coordinator-boundary\"><strong>Semantic coordinator</strong><p>Plans, synthesizes, and checks direction. Dispatch, claim promotion, merges, pushes, and tool approvals remain separate gates.</p></div> <!> <div class=\"coordinator-transcript\" aria-live=\"polite\"><!></div> <div class=\"coordinator-composer\"><textarea rows=\"3\" maxlength=\"12000\" placeholder=\"Message Sol…\"></textarea><div><small>Messages may steer an active turn; they do not bypass campaign gates.</small><button class=\"primary-button\"> </button></div></div> <div class=\"coordinator-utility\"><button class=\"outline-button compact\">Sync history</button><!></div>", 1), Vc = /* @__PURE__ */ G("<button><strong> </strong><span> </span></button>"), Hc = /* @__PURE__ */ G("<p>No attachable workspace tasks found.</p>"), Uc = /* @__PURE__ */ G("<div class=\"coordinator-candidates\"><!><!></div>"), Wc = /* @__PURE__ */ G("<div class=\"coordinator-boundary\"><strong>Attach an existing Codex task</strong><p>Lane Watch will verify workspace eligibility before attaching it as the campaign’s semantic coordinator.</p></div> <button class=\"primary-button\"> </button> <!>", 1), Gc = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), Kc = /* @__PURE__ */ G("<details class=\"coordinator-console\" id=\"coordinator-console\"><summary><span><small>SOL COORDINATOR</small><strong> </strong></span><span> </span></summary> <div class=\"coordinator-console-body\"><!> <!></div></details>");
function qc(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(""), f = /* @__PURE__ */ F(null), p = "", m = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(null);
	async function g(e = !1) {
		if (!(!H(c)?.coordinator?.attached || H(m) || !e && p === H(c).id && H(f))) {
			I(m, !0);
			try {
				let e = await fetch(`/api/codex/conversation?project=${encodeURIComponent(H(c).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(t.error || "Could not read coordinator history");
				I(f, t), p = H(c).id;
			} catch (e) {
				I(d, e instanceof Error ? e.message : String(e));
			} finally {
				I(m, !1);
			}
		}
	}
	async function _(e, t = {}, n = "") {
		if (!(!H(c) || H(u))) {
			I(u, e), I(d, "Working…");
			try {
				await ns({
					projectId: H(c).id,
					type: e,
					targetId: n,
					args: t,
					scope: "coordinator-console",
					pollLimit: 160
				}), I(d, "Coordinator control settled."), e === "coordinator.message.send" && (I(l, ""), setTimeout(() => void g(!0), 500));
			} catch (e) {
				I(d, e instanceof Error ? e.message : String(e));
			} finally {
				I(u, "");
			}
		}
	}
	async function v() {
		if (!(!H(c) || H(u))) {
			I(u, "discover");
			try {
				let e = await fetch(`/api/codex/threads?project=${encodeURIComponent(H(c).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(t.error || "Could not list Codex tasks");
				I(h, t.threads || []);
			} catch (e) {
				I(d, e instanceof Error ? e.message : String(e));
			} finally {
				I(u, "");
			}
		}
	}
	function y(e, t = 900) {
		let n = String(e || "").trim();
		return n.length <= t ? n : `${n.slice(0, t)}…`;
	}
	B(() => n(), () => {
		I(c, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(c), () => {
		I(a, H(c)?.coordinator || null);
	}), B(() => H(f), () => {
		I(o, (H(f)?.turns || []).flatMap((e) => e.messages || []).slice(-12));
	}), B(() => H(c), () => {
		I(s, Array.isArray(H(c)?.approvals) ? H(c).approvals.filter((e) => e.status === "pending") : []);
	}), Br(), vo();
	var b = ca(), x = R(b), S = (e) => {
		var t = Kc(), n = L(t), r = L(n), i = z(L(r)), c = L(i, !0);
		N(i), N(r);
		var f = z(r), p = L(f);
		N(f), N(n);
		var b = z(n, 2), x = L(b), S = (e) => {
			var t = Bc(), n = z(R(t), 2), r = (e) => {
				var t = Fc();
				Y(z(L(t)), 1, () => H(s), _a, (e, t) => {
					var n = Pc(), r = L(n), i = L(r), a = L(i, !0);
					N(i);
					var o = z(i), s = L(o, !0);
					N(o), N(r);
					var c = z(r), l = (e) => {
						var n = Nc(), r = L(n), i = z(r);
						N(n), W("click", r, () => _("approval.respond", {
							requestId: H(t).id,
							decision: "decline"
						})), W("click", i, () => _("approval.respond", {
							requestId: H(t).id,
							decision: "accept"
						})), K(e, n);
					};
					J(c, (e) => {
						H(t), U(() => H(t).supported) && e(l);
					}), N(n), V(() => {
						q(a, (H(t), U(() => H(t).title || H(t).tool || "Approval requested"))), q(s, (H(t), U(() => H(t).reason || H(t).detail)));
					}), K(e, n);
				}), N(t), K(e, t);
			};
			J(n, (e) => {
				H(s), U(() => H(s).length) && e(r);
			});
			var i = z(n, 2), c = L(i), d = (e) => {
				K(e, Ic());
			}, f = (e) => {
				var t = ca();
				Y(R(t), 1, () => H(o), (e) => e.id, (e, t) => {
					var n = Lc(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a), N(n), V((e) => {
						X(n, 1, Ma((H(t), U(() => H(t).role)))), q(i, (H(t), U(() => H(t).role))), q(o, e);
					}, [() => (H(t), U(() => y(H(t).text)))]), K(e, n);
				}), K(e, t);
			}, p = (e) => {
				K(e, Rc());
			};
			J(c, (e) => {
				H(m) ? e(d) : (H(o), U(() => H(o).length) ? e(f, 1) : e(p, -1));
			}), N(i);
			var h = z(i, 2), v = L(h);
			tn(v);
			var b = z(v), x = z(L(b)), S = L(x, !0);
			N(x), N(b), N(h);
			var C = z(h, 2), w = L(C), T = z(w), E = (e) => {
				var t = zc();
				V((e) => t.disabled = e, [() => (H(u), U(() => !!H(u)))]), W("click", t, () => _("coordinator.interrupt")), K(e, t);
			};
			J(T, (e) => {
				H(a), U(() => H(a).status === "working" && H(a).lastTurnId) && e(E);
			}), N(C), V((e) => {
				x.disabled = e, q(S, H(u) === "coordinator.message.send" ? "Sending…" : "Send message"), w.disabled = H(m);
			}, [() => (H(l), H(u), U(() => !H(l).trim() || !!H(u)))]), so(v, () => H(l), (e) => I(l, e)), W("click", x, () => _("coordinator.message.send", { message: H(l) })), W("click", w, () => g(!0)), K(e, t);
		}, C = (e) => {
			var t = Wc(), n = z(R(t), 2), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = Uc(), n = L(t);
				Y(n, 1, () => (H(h), U(() => H(h).filter((e) => e.eligible !== !1).slice(0, 12))), _a, (e, t) => {
					var n = Vc(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a), N(n), V((e) => {
						n.disabled = e, q(i, (H(t), U(() => H(t).name))), q(o, (H(t), U(() => H(t).cwd)));
					}, [() => (H(u), U(() => !!H(u)))]), W("click", n, () => _("coordinator.attach", { threadId: H(t).id })), K(e, n);
				});
				var r = z(n), i = (e) => {
					K(e, Hc());
				}, a = /* @__PURE__ */ P(() => (H(h), U(() => !H(h).some((e) => e.eligible !== !1))));
				J(r, (e) => {
					H(a) && e(i);
				}), N(t), K(e, t);
			};
			J(i, (e) => {
				H(h) && e(a);
			}), V((e) => {
				n.disabled = e, q(r, H(u) === "discover" ? "Finding tasks…" : "Find Codex tasks");
			}, [() => (H(u), U(() => !!H(u)))]), W("click", n, v), K(e, t);
		};
		J(x, (e) => {
			H(a), U(() => H(a)?.attached) ? e(S) : e(C, -1);
		});
		var w = z(x, 2), T = (e) => {
			var t = Gc(), n = L(t, !0);
			N(t), V(() => q(n, H(d))), K(e, t);
		};
		J(w, (e) => {
			H(d) && e(T);
		}), N(b), N(t), V(() => {
			q(c, (H(a), U(() => H(a)?.attached ? H(a).name : "No coordinator attached"))), X(f, 1, `coordinator-state ${H(a), U(() => H(a)?.status || "detached") ?? ""}`), q(p, `${H(a), U(() => H(a)?.status || "DETACHED") ?? ""}${H(s), U(() => H(s).length ? ` · ${H(s).length} approval` : "") ?? ""}`);
		}), Xi("toggle", t, (e) => {
			e.currentTarget.open && g();
		}), K(e, t);
	};
	J(x, (e) => {
		H(c) && e(S);
	}), K(e, b), xt(), i();
}
//#endregion
//#region src/ui/CampaignSettings.svelte
Zi(["click"]), Ho();
var Jc = /* @__PURE__ */ G("<div class=\"campaign-settings-boundary access-boundary\"><strong> </strong><p> </p></div>"), Yc = /* @__PURE__ */ G("<div class=\"campaign-settings-boundary\"><strong> </strong><p> </p><small>Observation never grants authority. Human wave adoption imports a fixed wave; exact human schedule confirmation grants controller execution only to reserved members.</small></div>"), Xc = /* @__PURE__ */ G("<button type=\"button\"><span> </span><strong> </strong><small> </small><p> </p></button>"), Zc = /* @__PURE__ */ G("<p> </p>"), Qc = /* @__PURE__ */ G("<article><span> </span><strong> </strong><small> </small><small> </small></article>"), $c = /* @__PURE__ */ G("<span><small> </small><strong> </strong></span>"), el = /* @__PURE__ */ G("<div class=\"host-capability-grid\"></div> <div class=\"global-quota-grid\"><span><small>TOKEN COMMITMENTS</small><strong> </strong></span> <!></div> <footer>ENFORCED AT SERIALIZED RESOURCE ACQUISITION · no scheduler or host mutation authority</footer>", 1), tl = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), nl = /* @__PURE__ */ G("<details class=\"campaign-settings\" id=\"campaign-settings\"><summary><span><small>FUTURE-RUN POLICY</small><strong> </strong></span><span> </span></summary> <div class=\"campaign-settings-body\"><div class=\"campaign-settings-boundary\"><strong>Defaults, never active mutations</strong><p>These choices apply only when a later checked contract is confirmed. They do not restaff a running lane, approve a plan, or launch anything.</p></div> <!> <!> <div class=\"dispatch-profile-grid\"></div> <label class=\"automation-setting\"><span><strong>Automatic boundary handling</strong><small>Controls how far the controller may prepare between explicit human gates.</small></span><select><option>observe</option><option>prepare</option><option>propose</option><option>bounded</option></select></label> <section class=\"operational-governance\" aria-label=\"Operational governance\"><header><span><small>HOSTS & GLOBAL QUOTAS</small><strong>Pre-admission inventory</strong></span><b> </b></header> <!></section> <!></div></details>");
function rl(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(null), d = "", f = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F("");
	async function m(e, t) {
		if (!(!H(s) || H(c) || n().access?.canMutate === !1)) {
			I(c, e), I(l, "Saving future-run policy…");
			try {
				await ns({
					projectId: H(s).id,
					type: e,
					args: t,
					scope: "campaign-settings"
				}), I(l, "Future-run policy saved. No active worker was changed.");
			} catch (e) {
				I(l, e instanceof Error ? e.message : String(e));
			} finally {
				I(c, "");
			}
		}
	}
	async function h() {
		if (!(!H(s) || H(f) || H(u) && d === H(s).id)) {
			I(f, !0), I(p, ""), d = H(s).id;
			try {
				let e = await fetch(`/api/governance?project=${encodeURIComponent(H(s).id)}`, { cache: "no-store" }), t = await e.json();
				if (!e.ok) throw Error(String(t.error || `Could not load operational governance: ${e.status}`));
				I(u, t);
			} catch (e) {
				I(p, e instanceof Error ? e.message : String(e));
			} finally {
				I(f, !1);
			}
		}
	}
	B(() => n(), () => {
		I(s, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(s), () => {
		I(a, H(s)?.dispatchPreferences || null);
	}), B(() => H(s), () => {
		I(o, H(s)?.coordinationInterface || null);
	}), Br(), vo();
	var g = ca(), _ = R(g), v = (e) => {
		var t = nl(), r = L(t), i = L(r), d = z(L(i)), g = L(d, !0);
		N(d), N(i);
		var _ = z(i), v = L(_);
		N(_), N(r);
		var y = z(r, 2), b = z(L(y), 2), x = (e) => {
			var t = Jc(), r = L(t), i = L(r);
			N(r);
			var a = z(r), o = L(a);
			N(a), N(t), V((e) => {
				q(i, `Signed in as ${n(), U(() => n().access.role) ?? ""} · ${n(), U(() => n().access.identity) ?? ""}`), q(o, `${e ?? ""} ${n(), U(() => n().access.canMutate ? "This project is in the mutation scope; every campaign gate still applies." : "This project is read-only; guarded actions and manual refresh are disabled.") ?? ""}`);
			}, [() => (n(), U(() => n().access.projects.includes("*") ? "Can read all configured projects." : `Readable projects: ${n().access.projects.join(", ")}.`))]), K(e, t);
		};
		J(b, (e) => {
			n(), U(() => n().access) && e(x);
		});
		var S = z(b, 2), C = (e) => {
			var t = Yc(), n = L(t), r = L(n);
			N(n);
			var i = z(n), a = L(i, !0);
			N(i), Ke(), N(t), V(() => {
				q(r, `Coordinator interface · ${H(o), U(() => H(o).mode) ?? ""}`), q(a, (H(o), U(() => H(o).reason)));
			}), K(e, t);
		};
		J(S, (e) => {
			H(o) && e(C);
		});
		var w = z(S, 2);
		Y(w, 5, () => (H(a), U(() => H(a).profiles || [])), (e) => e.id, (e, t) => {
			var r = Xc();
			let i;
			var o = L(r), s = L(o, !0);
			N(o);
			var l = z(o), u = L(l, !0);
			N(l);
			var d = z(l), f = L(d);
			N(d);
			var p = z(d), h = L(p, !0);
			N(p), N(r), V((e) => {
				i = X(r, 1, "dispatch-profile", null, i, { selected: H(t).id === H(a).selectedProfile }), r.disabled = e, q(s, (H(t), U(() => H(t).budgetClass))), q(u, (H(t), U(() => H(t).label))), q(f, `${H(t), U(() => H(t).model) ?? ""} · ${H(t), U(() => H(t).effort) ?? ""}${H(t), U(() => H(t).fanout ? ` · ${H(t).fanout} children` : " · single worker") ?? ""}`), q(h, (H(t), U(() => H(t).useWhen)));
			}, [() => (H(c), H(t), H(a), n(), U(() => !!H(c) || H(t).id === H(a).selectedProfile || n().access?.canMutate === !1))]), W("click", r, () => m("project.dispatch-profile.set", { profile: H(t).id })), K(e, r);
		}), N(w);
		var T = z(w, 2), E = z(L(T)), D = L(E);
		D.value = D.__value = "observe";
		var O = z(D);
		O.value = O.__value = "prepare";
		var k = z(O);
		k.value = k.__value = "propose";
		var A = z(k);
		A.value = A.__value = "bounded", N(E);
		var j;
		Va(E), N(T);
		var ee = z(T, 2), te = L(ee), M = z(L(te)), ne = L(M, !0);
		N(M), N(te);
		var re = z(te, 2), ie = (e) => {
			var t = Zc(), n = L(t, !0);
			N(t), V(() => q(n, H(p))), K(e, t);
		}, ae = (e) => {
			var t = el(), n = R(t);
			Y(n, 5, () => (H(u), U(() => H(u).projects?.[0]?.hosts || [])), (e) => e.id, (e, t) => {
				var n = Qc(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a);
				N(a);
				var s = z(a), c = L(s);
				N(s);
				var l = z(s), u = L(l);
				N(l), N(n), V(() => {
					q(i, (H(t), U(() => H(t).id))), q(o, `${H(t), U(() => H(t).observation) ?? ""} observation`), q(c, `dispatch ${H(t), U(() => H(t).researchDispatch) ?? ""}`), q(u, `reconcile ${H(t), U(() => H(t).reconciliation) ?? ""}`);
				}), K(e, n);
			}), N(n);
			var r = z(n, 2), i = L(r), a = z(L(i)), o = L(a);
			N(a), N(i), Y(z(i, 2), 0, () => [
				"strategy",
				"research",
				"custody"
			], _a, (e, t) => {
				var n = $c(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a);
				N(a), N(n), V(() => {
					q(i, `${t ?? ""} SLOTS`), q(o, `${H(u), U(() => H(u).quotas.usage.slots[t]) ?? ""} / ${H(u), U(() => H(u).quotas.policy.slots[t]) ?? ""}`);
				}), K(e, n);
			}), N(r), Ke(2), V((e, t) => q(o, `${e ?? ""} / ${t ?? ""}`), [() => (H(u), U(() => H(u).quotas.usage.tokenCommitments.toLocaleString())), () => (H(u), U(() => H(u).quotas.policy.tokenCommitments.toLocaleString()))]), K(e, t);
		}, oe = (e) => {
			var t = Zc(), n = L(t, !0);
			N(t), V(() => q(n, H(f) ? "Loading scoped host and quota facts…" : "Open this section to load scoped operational facts.")), K(e, t);
		};
		J(re, (e) => {
			H(p) ? e(ie) : H(u) ? e(ae, 1) : e(oe, -1);
		}), N(ee);
		var se = z(ee, 2), ce = (e) => {
			var t = tl(), n = L(t, !0);
			N(t), V(() => q(n, H(l))), K(e, t);
		};
		J(se, (e) => {
			H(l) && e(ce);
		}), N(y), N(t), V((e, t) => {
			q(g, e), q(v, `${H(o), U(() => H(o)?.mode || "observe-only") ?? ""} · ${H(s), U(() => H(s).automationMode || "prepare") ?? ""}`), E.disabled = t, j !== (j = (H(s), U(() => H(s).automationMode || "prepare"))) && (E.value = (E.__value = (H(s), U(() => H(s).automationMode || "prepare"))) ?? "", Ba(E, (H(s), U(() => H(s).automationMode || "prepare")))), q(ne, (H(u), H(f), U(() => H(u)?.quotas?.status || (H(f) ? "LOADING" : "READ ONLY"))));
		}, [() => (H(a), U(() => H(a).profiles?.find((e) => e.id === H(a).selectedProfile)?.label || H(a).selectedProfile)), () => (H(c), n(), U(() => !!H(c) || n().access?.canMutate === !1))]), Xi("toggle", t, (e) => {
			e.currentTarget.open && h();
		}), W("change", E, (e) => m("project.automation.set", { mode: e.currentTarget.value })), K(e, t);
	};
	J(_, (e) => {
		H(s) && H(a) && e(v);
	}), K(e, g), xt(), i();
}
//#endregion
//#region src/ui/WaveAccounting.svelte
Zi(["click", "change"]), Ho();
var il = /* @__PURE__ */ G("<p><b> </b> </p>"), al = /* @__PURE__ */ G("<div class=\"accounting-controls\"><select><option>Choose disposition</option><option>Repair</option><option>Supersede</option><option>Abandon</option><option>Carry forward</option></select><input placeholder=\"Reason and evidence boundary\"/><button class=\"primary-button\"> </button></div>"), ol = /* @__PURE__ */ G("<li><span class=\"accounting-state\"> </span> <div><strong> </strong><small> </small><!></div> <!></li>"), sl = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), cl = /* @__PURE__ */ G("<details class=\"wave-accounting\" id=\"wave-accounting\"><summary><span><small>WAVE CUSTODY</small><strong>Source-lane accounting</strong></span><span> </span></summary> <div class=\"wave-accounting-body\"><div class=\"accounting-boundary\"><strong>Mechanical disposition only</strong><p>Recording a repair, supersession, abandonment, or carry-forward closes custody accounting. It does not endorse the lane’s mathematics or promote a claim.</p></div> <ol></ol> <!></div></details>");
function ll(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F({}), f = /* @__PURE__ */ F({});
	function p(e, t) {
		I(d, {
			...H(d),
			[e]: t
		});
	}
	function m(e, t) {
		I(f, {
			...H(f),
			[e]: t
		});
	}
	async function h(e) {
		if (!(!H(c) || H(l) || !H(d)[e.id])) {
			I(l, e.id), I(u, "Recording the bounded disposition…");
			try {
				await ns({
					projectId: H(c).id,
					type: "lane.disposition.set",
					targetId: e.id,
					args: {
						disposition: H(d)[e.id],
						reason: H(f)[e.id] || ""
					},
					scope: "wave-accounting"
				}), I(u, "Disposition recorded. Synthesis readiness was recomputed mechanically."), I(d, {
					...H(d),
					[e.id]: ""
				}), I(f, {
					...H(f),
					[e.id]: ""
				});
			} catch (e) {
				I(u, e instanceof Error ? e.message : String(e));
			} finally {
				I(l, "");
			}
		}
	}
	B(() => n(), () => {
		I(c, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(c), () => {
		I(a, H(c)?.wave || null);
	}), B(() => H(a), () => {
		I(o, Array.isArray(H(a)?.lanes) ? H(a).lanes : []);
	}), B(() => H(a), () => {
		I(s, H(a)?.accounting || null);
	}), Br(), vo();
	var g = ca(), _ = R(g), v = (e) => {
		var t = cl(), n = L(t), r = z(L(n));
		let i;
		var a = L(r, !0);
		N(r), N(n);
		var c = z(n, 2), g = z(L(c), 2);
		Y(g, 5, () => H(o), (e) => e.id, (e, t) => {
			var n = ol();
			let r;
			var i = L(n), a = L(i, !0);
			N(i);
			var o = z(i, 2), s = L(o), c = L(s, !0);
			N(s);
			var u = z(s), g = L(u);
			N(u);
			var _ = z(u), v = (e) => {
				var n = il(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r);
				N(n), V(() => {
					q(i, (H(t), U(() => H(t).disposition))), q(a, ` · ${H(t), U(() => H(t).reason) ?? ""}`);
				}), K(e, n);
			};
			J(_, (e) => {
				H(t), U(() => H(t).disposition) && e(v);
			}), N(o);
			var y = z(o, 2), b = (e) => {
				var n = al(), r = L(n), i = L(r);
				i.value = i.__value = "";
				var a = z(i);
				a.value = a.__value = "REPAIR";
				var o = z(a);
				o.value = o.__value = "SUPERSEDE";
				var s = z(o);
				s.value = s.__value = "ABANDON";
				var c = z(s);
				c.value = c.__value = "CARRY_FORWARD", N(r);
				var u;
				Va(r);
				var g = z(r);
				$a(g);
				var _ = z(g), v = L(_, !0);
				N(_), N(n), V(() => {
					u !== (u = (H(d), H(t), U(() => H(d)[H(t).id] || ""))) && (r.value = (r.__value = (H(d), H(t), U(() => H(d)[H(t).id] || ""))) ?? "", Ba(r, (H(d), H(t), U(() => H(d)[H(t).id] || "")))), eo(g, (H(f), H(t), U(() => H(f)[H(t).id] || ""))), _.disabled = (H(d), H(t), H(l), U(() => !H(d)[H(t).id] || H(l) === H(t).id)), q(v, (H(l), H(t), U(() => H(l) === H(t).id ? "Recording…" : "Record")));
				}), W("change", r, (e) => p(H(t).id, e.currentTarget.value)), W("input", g, (e) => m(H(t).id, e.currentTarget.value)), W("click", _, () => h(H(t))), K(e, n);
			};
			J(y, (e) => {
				H(t), U(() => !H(t).accounted) && e(b);
			}), N(n), V((e) => {
				r = X(n, 1, "", null, r, { open: !H(t).accounted }), q(a, e), q(c, (H(t), U(() => H(t).task))), q(g, `${H(t), U(() => H(t).lane) ?? ""} · ${H(t), U(() => H(t).host) ?? ""} · ${H(t), U(() => H(t).daemon) ?? ""} · ${H(t), U(() => H(t).landing) ?? ""}`);
			}, [() => (H(t), U(() => H(t).accounted ? "ACCOUNTED" : H(t).accountingState?.replaceAll("_", " ")))]), K(e, n);
		}), N(g);
		var _ = z(g, 2), v = (e) => {
			var t = sl(), n = L(t, !0);
			N(t), V(() => q(n, H(u))), K(e, t);
		};
		J(_, (e) => {
			H(u) && e(v);
		}), N(c), N(t), V(() => {
			i = X(r, 1, "", null, i, { attention: H(s) && H(s).accounted < H(s).total }), q(a, (H(s), H(o), U(() => H(s) ? `${H(s).accounted}/${H(s).total} accounted` : `${H(o).length} members`)));
		}), K(e, t);
	};
	J(_, (e) => {
		H(c), H(a), H(o), U(() => H(c) && H(a) && H(o).length) && e(v);
	}), K(e, g), xt(), i();
}
Zi([
	"change",
	"input",
	"click"
]);
//#endregion
//#region node_modules/d3-dispatch/src/dispatch.js
var ul = { value: () => {} };
function dl() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new fl(n);
}
function fl(e) {
	this._ = e;
}
function pl(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
fl.prototype = dl.prototype = {
	constructor: fl,
	on: function(e, t) {
		var n = this._, r = pl(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = ml(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = hl(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = hl(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new fl(e);
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
function ml(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function hl(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = ul, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var gl = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/d3-selection/src/namespace.js
function _l(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), gl.hasOwnProperty(t) ? {
		space: gl[t],
		local: e
	} : e;
}
//#endregion
//#region node_modules/d3-selection/src/creator.js
function vl(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function yl(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function bl(e) {
	var t = _l(e);
	return (t.local ? yl : vl)(t);
}
//#endregion
//#region node_modules/d3-selection/src/selector.js
function xl() {}
function Sl(e) {
	return e == null ? xl : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/select.js
function Cl(e) {
	typeof e != "function" && (e = Sl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new dd(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/array.js
function wl(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selectorAll.js
function Tl() {
	return [];
}
function El(e) {
	return e == null ? Tl : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectAll.js
function Dl(e) {
	return function() {
		return wl(e.apply(this, arguments));
	};
}
function Ol(e) {
	e = typeof e == "function" ? Dl(e) : El(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new dd(r, i);
}
//#endregion
//#region node_modules/d3-selection/src/matcher.js
function kl(e) {
	return function() {
		return this.matches(e);
	};
}
function Al(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChild.js
var jl = Array.prototype.find;
function Ml(e) {
	return function() {
		return jl.call(this.children, e);
	};
}
function Nl() {
	return this.firstElementChild;
}
function Pl(e) {
	return this.select(e == null ? Nl : Ml(typeof e == "function" ? e : Al(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChildren.js
var Fl = Array.prototype.filter;
function Il() {
	return Array.from(this.children);
}
function Ll(e) {
	return function() {
		return Fl.call(this.children, e);
	};
}
function Rl(e) {
	return this.selectAll(e == null ? Il : Ll(typeof e == "function" ? e : Al(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/filter.js
function zl(e) {
	typeof e != "function" && (e = kl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new dd(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/sparse.js
function Bl(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/d3-selection/src/selection/enter.js
function Vl() {
	return new dd(this._enter || this._groups.map(Bl), this._parents);
}
function Hl(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Hl.prototype = {
	constructor: Hl,
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
function Ul(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/data.js
function Wl(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Hl(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Gl(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Hl(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function Kl(e) {
	return e.__data__;
}
function ql(e, t) {
	if (!arguments.length) return Array.from(this, Kl);
	var n = t ? Gl : Wl, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Ul(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = Jl(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new dd(o, r), o._enter = s, o._exit = c, o;
}
function Jl(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selection/exit.js
function Yl() {
	return new dd(this._exit || this._groups.map(Bl), this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/join.js
function Xl(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/d3-selection/src/selection/merge.js
function Zl(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new dd(s, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/order.js
function Ql() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/sort.js
function $l(e) {
	e ||= eu;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new dd(i, this._parents).order();
}
function eu(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-selection/src/selection/call.js
function tu() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/nodes.js
function nu() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-selection/src/selection/node.js
function ru() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/d3-selection/src/selection/size.js
function iu() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/selection/empty.js
function au() {
	return !this.node();
}
//#endregion
//#region node_modules/d3-selection/src/selection/each.js
function ou(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/attr.js
function su(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function cu(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function lu(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function uu(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function du(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function fu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function pu(e, t) {
	var n = _l(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? cu : su : typeof t == "function" ? n.local ? fu : du : n.local ? uu : lu)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/window.js
function mu(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/d3-selection/src/selection/style.js
function hu(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function gu(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function _u(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function vu(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? hu : typeof t == "function" ? _u : gu)(e, t, n ?? "")) : yu(this.node(), e);
}
function yu(e, t) {
	return e.style.getPropertyValue(t) || mu(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/d3-selection/src/selection/property.js
function bu(e) {
	return function() {
		delete this[e];
	};
}
function xu(e, t) {
	return function() {
		this[e] = t;
	};
}
function Su(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Cu(e, t) {
	return arguments.length > 1 ? this.each((t == null ? bu : typeof t == "function" ? Su : xu)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/d3-selection/src/selection/classed.js
function wu(e) {
	return e.trim().split(/^|\s+/);
}
function Tu(e) {
	return e.classList || new Eu(e);
}
function Eu(e) {
	this._node = e, this._names = wu(e.getAttribute("class") || "");
}
Eu.prototype = {
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
function Du(e, t) {
	for (var n = Tu(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Ou(e, t) {
	for (var n = Tu(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function ku(e) {
	return function() {
		Du(this, e);
	};
}
function Au(e) {
	return function() {
		Ou(this, e);
	};
}
function ju(e, t) {
	return function() {
		(t.apply(this, arguments) ? Du : Ou)(this, e);
	};
}
function Mu(e, t) {
	var n = wu(e + "");
	if (arguments.length < 2) {
		for (var r = Tu(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? ju : t ? ku : Au)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/text.js
function Nu() {
	this.textContent = "";
}
function Pu(e) {
	return function() {
		this.textContent = e;
	};
}
function Fu(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Iu(e) {
	return arguments.length ? this.each(e == null ? Nu : (typeof e == "function" ? Fu : Pu)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/d3-selection/src/selection/html.js
function Lu() {
	this.innerHTML = "";
}
function Ru(e) {
	return function() {
		this.innerHTML = e;
	};
}
function zu(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function Bu(e) {
	return arguments.length ? this.each(e == null ? Lu : (typeof e == "function" ? zu : Ru)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/d3-selection/src/selection/raise.js
function Vu() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Hu() {
	return this.each(Vu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/lower.js
function Uu() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wu() {
	return this.each(Uu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/append.js
function Gu(e) {
	var t = typeof e == "function" ? e : bl(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/insert.js
function Ku() {
	return null;
}
function qu(e, t) {
	var n = typeof e == "function" ? e : bl(e), r = t == null ? Ku : typeof t == "function" ? t : Sl(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/remove.js
function Ju() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function Yu() {
	return this.each(Ju);
}
//#endregion
//#region node_modules/d3-selection/src/selection/clone.js
function Xu() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Zu() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Qu(e) {
	return this.select(e ? Zu : Xu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/datum.js
function $u(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/d3-selection/src/selection/on.js
function ed(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function td(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function nd(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function rd(e, t, n) {
	return function() {
		var r = this.__on, i, a = ed(t);
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
function id(e, t, n) {
	var r = td(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? rd : nd, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/dispatch.js
function ad(e, t, n) {
	var r = mu(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function od(e, t) {
	return function() {
		return ad(this, e, t);
	};
}
function sd(e, t) {
	return function() {
		return ad(this, e, t.apply(this, arguments));
	};
}
function cd(e, t) {
	return this.each((typeof t == "function" ? sd : od)(e, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/iterator.js
function* ld() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/d3-selection/src/selection/index.js
var ud = [null];
function dd(e, t) {
	this._groups = e, this._parents = t;
}
function fd() {
	return new dd([[document.documentElement]], ud);
}
function pd() {
	return this;
}
dd.prototype = fd.prototype = {
	constructor: dd,
	select: Cl,
	selectAll: Ol,
	selectChild: Pl,
	selectChildren: Rl,
	filter: zl,
	data: ql,
	enter: Vl,
	exit: Yl,
	join: Xl,
	merge: Zl,
	selection: pd,
	order: Ql,
	sort: $l,
	call: tu,
	nodes: nu,
	node: ru,
	size: iu,
	empty: au,
	each: ou,
	attr: pu,
	style: vu,
	property: Cu,
	classed: Mu,
	text: Iu,
	html: Bu,
	raise: Hu,
	lower: Wu,
	append: Gu,
	insert: qu,
	remove: Yu,
	clone: Qu,
	datum: $u,
	on: id,
	dispatch: cd,
	[Symbol.iterator]: ld
};
//#endregion
//#region node_modules/d3-selection/src/select.js
function md(e) {
	return typeof e == "string" ? new dd([[document.querySelector(e)]], [document.documentElement]) : new dd([[e]], ud);
}
//#endregion
//#region node_modules/d3-selection/src/sourceEvent.js
function hd(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/pointer.js
function gd(e, t) {
	if (e = hd(e), t === void 0 && (t = e.currentTarget), t) {
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
var _d = { passive: !1 }, vd = {
	capture: !0,
	passive: !1
};
function yd(e) {
	e.stopImmediatePropagation();
}
function bd(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-drag/src/nodrag.js
function xd(e) {
	var t = e.document.documentElement, n = md(e).on("dragstart.drag", bd, vd);
	"onselectstart" in t ? n.on("selectstart.drag", bd, vd) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Sd(e, t) {
	var n = e.document.documentElement, r = md(e).on("dragstart.drag", null);
	t && (r.on("click.drag", bd, vd), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/d3-drag/src/constant.js
var Cd = (e) => () => e;
//#endregion
//#region node_modules/d3-drag/src/event.js
function wd(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
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
wd.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/d3-drag/src/drag.js
function Td(e) {
	return !e.ctrlKey && !e.button;
}
function Ed() {
	return this.parentNode;
}
function Dd(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function Od() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function kd() {
	var e = Td, t = Ed, n = Dd, r = Od, i = {}, a = dl("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, _d).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (md(n.view).on("mousemove.drag", m, vd).on("mouseup.drag", h, vd), xd(n.view), yd(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (bd(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		md(e.view).on("mousemove.drag mouseup.drag", null), Sd(e.view, l), bd(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (yd(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (bd(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (yd(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = gd(l || r, t), p, m, h;
		if ((h = n.call(e, new wd("beforestart", {
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
				case "drag": d = gd(l || a, t), _ = o;
			}
			u.call(r, e, new wd(r, {
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
		return arguments.length ? (e = typeof t == "function" ? t : Cd(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Cd(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Cd(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Cd(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/d3-color/src/define.js
function Ad(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function jd(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function Md() {}
var Nd = .7, Pd = 1 / Nd, Fd = "\\s*([+-]?\\d+)\\s*", Id = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ld = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Rd = /^#([0-9a-f]{3,8})$/, zd = RegExp(`^rgb\\(${Fd},${Fd},${Fd}\\)$`), Bd = RegExp(`^rgb\\(${Ld},${Ld},${Ld}\\)$`), Vd = RegExp(`^rgba\\(${Fd},${Fd},${Fd},${Id}\\)$`), Hd = RegExp(`^rgba\\(${Ld},${Ld},${Ld},${Id}\\)$`), Ud = RegExp(`^hsl\\(${Id},${Ld},${Ld}\\)$`), Wd = RegExp(`^hsla\\(${Id},${Ld},${Ld},${Id}\\)$`), Gd = {
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
Ad(Md, Xd, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Kd,
	formatHex: Kd,
	formatHex8: qd,
	formatHsl: Jd,
	formatRgb: Yd,
	toString: Yd
});
function Kd() {
	return this.rgb().formatHex();
}
function qd() {
	return this.rgb().formatHex8();
}
function Jd() {
	return uf(this).formatHsl();
}
function Yd() {
	return this.rgb().formatRgb();
}
function Xd(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Rd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Zd(t) : n === 3 ? new tf(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Qd(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Qd(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = zd.exec(e)) ? new tf(t[1], t[2], t[3], 1) : (t = Bd.exec(e)) ? new tf(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Vd.exec(e)) ? Qd(t[1], t[2], t[3], t[4]) : (t = Hd.exec(e)) ? Qd(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Ud.exec(e)) ? lf(t[1], t[2] / 100, t[3] / 100, 1) : (t = Wd.exec(e)) ? lf(t[1], t[2] / 100, t[3] / 100, t[4]) : Gd.hasOwnProperty(e) ? Zd(Gd[e]) : e === "transparent" ? new tf(NaN, NaN, NaN, 0) : null;
}
function Zd(e) {
	return new tf(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Qd(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new tf(e, t, n, r);
}
function $d(e) {
	return e instanceof Md || (e = Xd(e)), e ? (e = e.rgb(), new tf(e.r, e.g, e.b, e.opacity)) : new tf();
}
function ef(e, t, n, r) {
	return arguments.length === 1 ? $d(e) : new tf(e, t, n, r ?? 1);
}
function tf(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Ad(tf, ef, jd(Md, {
	brighter(e) {
		return e = e == null ? Pd : Pd ** +e, new tf(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Nd : Nd ** +e, new tf(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new tf(sf(this.r), sf(this.g), sf(this.b), of(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: nf,
	formatHex: nf,
	formatHex8: rf,
	formatRgb: af,
	toString: af
}));
function nf() {
	return `#${cf(this.r)}${cf(this.g)}${cf(this.b)}`;
}
function rf() {
	return `#${cf(this.r)}${cf(this.g)}${cf(this.b)}${cf((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function af() {
	let e = of(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${sf(this.r)}, ${sf(this.g)}, ${sf(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function of(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function sf(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function cf(e) {
	return e = sf(e), (e < 16 ? "0" : "") + e.toString(16);
}
function lf(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ff(e, t, n, r);
}
function uf(e) {
	if (e instanceof ff) return new ff(e.h, e.s, e.l, e.opacity);
	if (e instanceof Md || (e = Xd(e)), !e) return new ff();
	if (e instanceof ff) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new ff(o, s, c, e.opacity);
}
function df(e, t, n, r) {
	return arguments.length === 1 ? uf(e) : new ff(e, t, n, r ?? 1);
}
function ff(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Ad(ff, df, jd(Md, {
	brighter(e) {
		return e = e == null ? Pd : Pd ** +e, new ff(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Nd : Nd ** +e, new ff(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new tf(hf(e >= 240 ? e - 240 : e + 120, i, r), hf(e, i, r), hf(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new ff(pf(this.h), mf(this.s), mf(this.l), of(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = of(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${pf(this.h)}, ${mf(this.s) * 100}%, ${mf(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function pf(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mf(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function hf(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var gf = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function _f(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function vf(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function yf(e) {
	return (e = +e) == 1 ? bf : function(t, n) {
		return n - t ? vf(t, n, e) : gf(isNaN(t) ? n : t);
	};
}
function bf(e, t) {
	var n = t - e;
	return n ? _f(e, n) : gf(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var xf = (function e(t) {
	var n = yf(t);
	function r(e, t) {
		var r = n((e = ef(e)).r, (t = ef(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = bf(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function Sf(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Cf(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function wf(e, t) {
	var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o;
	for (o = 0; o < r; ++o) i[o] = Nf(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function Tf(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function Ef(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function Df(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = Nf(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var Of = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, kf = new RegExp(Of.source, "g");
function Af(e) {
	return function() {
		return e;
	};
}
function jf(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Mf(e, t) {
	var n = Of.lastIndex = kf.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Of.exec(e)) && (i = kf.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Ef(r, i)
	})), n = kf.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? jf(c[0].x) : Af(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function Nf(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? gf(t) : (n === "number" ? Ef : n === "string" ? (r = Xd(t)) ? (t = r, xf) : Mf : t instanceof Xd ? xf : t instanceof Date ? Tf : Cf(t) ? Sf : Array.isArray(t) ? wf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Df : Ef)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
var Pf = 180 / Math.PI, Ff = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function If(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Pf,
		skewX: Math.atan(c) * Pf,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
var Lf;
function Rf(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Ff : If(t.a, t.b, t.c, t.d, t.e, t.f);
}
function zf(e) {
	return e == null || (Lf ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Lf.setAttribute("transform", e), !(e = Lf.transform.baseVal.consolidate())) ? Ff : (e = e.matrix, If(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function Bf(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Ef(e, i)
			}, {
				i: c - 2,
				x: Ef(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Ef(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Ef(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Ef(e, n)
			}, {
				i: s - 2,
				x: Ef(t, r)
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
var Vf = Bf(Rf, "px, ", "px)", "deg)"), Hf = Bf(zf, ", ", ")", ")"), Uf = 1e-12;
function Wf(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Gf(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Kf(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var qf = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Uf) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = Wf(y), c = s / (n * g) * (i * Kf(t * r + y) - Gf(y));
				return [
					a + c * d,
					o + c * f,
					s * i / Wf(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), Jf = 0, Yf = 0, Xf = 0, Zf = 1e3, Qf, $f, ep = 0, tp = 0, np = 0, rp = typeof performance == "object" && performance.now ? performance : Date, ip = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function ap() {
	return tp ||= (ip(op), rp.now() + np);
}
function op() {
	tp = 0;
}
function sp() {
	this._call = this._time = this._next = null;
}
sp.prototype = cp.prototype = {
	constructor: sp,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? ap() : +n) + (t == null ? 0 : +t), !this._next && $f !== this && ($f ? $f._next = this : Qf = this, $f = this), this._call = e, this._time = n, pp();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, pp());
	}
};
function cp(e, t, n) {
	var r = new sp();
	return r.restart(e, t, n), r;
}
function lp() {
	ap(), ++Jf;
	for (var e = Qf, t; e;) (t = tp - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--Jf;
}
function up() {
	tp = (ep = rp.now()) + np, Jf = Yf = 0;
	try {
		lp();
	} finally {
		Jf = 0, fp(), tp = 0;
	}
}
function dp() {
	var e = rp.now(), t = e - ep;
	t > Zf && (np -= t, ep = e);
}
function fp() {
	for (var e, t = Qf, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Qf = n);
	$f = e, pp(r);
}
function pp(e) {
	Jf || (Yf &&= clearTimeout(Yf), e - tp > 24 ? (e < Infinity && (Yf = setTimeout(up, e - rp.now() - np)), Xf &&= clearInterval(Xf)) : (Xf ||= (ep = rp.now(), setInterval(dp, Zf)), Jf = 1, ip(up)));
}
//#endregion
//#region node_modules/d3-timer/src/timeout.js
function mp(e, t, n) {
	var r = new sp();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/d3-transition/src/transition/schedule.js
var hp = dl("start", "end", "cancel", "interrupt"), gp = [];
function _p(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	xp(e, n, {
		name: t,
		index: r,
		group: i,
		on: hp,
		tween: gp,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function vp(e, t) {
	var n = bp(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function yp(e, t) {
	var n = bp(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function bp(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function xp(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = cp(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return mp(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (mp(function() {
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
function Sp(e, t) {
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
function Cp(e) {
	return this.each(function() {
		Sp(this, e);
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/tween.js
function wp(e, t) {
	var n, r;
	return function() {
		var i = yp(this, e), a = i.tween;
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
function Tp(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = yp(this, e), o = a.tween;
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
function Ep(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = bp(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? wp : Tp)(n, e, t));
}
function Dp(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = yp(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return bp(e, r).value[t];
	};
}
//#endregion
//#region node_modules/d3-transition/src/transition/interpolate.js
function Op(e, t) {
	var n;
	return (typeof t == "number" ? Ef : t instanceof Xd ? xf : (n = Xd(t)) ? (t = n, xf) : Mf)(e, t);
}
//#endregion
//#region node_modules/d3-transition/src/transition/attr.js
function kp(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Ap(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function jp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Mp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Np(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Pp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Fp(e, t) {
	var n = _l(e), r = n === "transform" ? Hf : Op;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Pp : Np)(n, r, Dp(this, "attr." + e, t)) : t == null ? (n.local ? Ap : kp)(n) : (n.local ? Mp : jp)(n, r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/attrTween.js
function Ip(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Lp(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Rp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Lp(e, i)), n;
	}
	return i._value = t, i;
}
function zp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Ip(e, i)), n;
	}
	return i._value = t, i;
}
function Bp(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = _l(e);
	return this.tween(n, (r.local ? Rp : zp)(r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/delay.js
function Vp(e, t) {
	return function() {
		vp(this, e).delay = +t.apply(this, arguments);
	};
}
function Hp(e, t) {
	return t = +t, function() {
		vp(this, e).delay = t;
	};
}
function Up(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Vp : Hp)(t, e)) : bp(this.node(), t).delay;
}
//#endregion
//#region node_modules/d3-transition/src/transition/duration.js
function Wp(e, t) {
	return function() {
		yp(this, e).duration = +t.apply(this, arguments);
	};
}
function Gp(e, t) {
	return t = +t, function() {
		yp(this, e).duration = t;
	};
}
function Kp(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Wp : Gp)(t, e)) : bp(this.node(), t).duration;
}
//#endregion
//#region node_modules/d3-transition/src/transition/ease.js
function qp(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		yp(this, e).ease = t;
	};
}
function Jp(e) {
	var t = this._id;
	return arguments.length ? this.each(qp(t, e)) : bp(this.node(), t).ease;
}
//#endregion
//#region node_modules/d3-transition/src/transition/easeVarying.js
function Yp(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		yp(this, e).ease = n;
	};
}
function Xp(e) {
	if (typeof e != "function") throw Error();
	return this.each(Yp(this._id, e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/filter.js
function Zp(e) {
	typeof e != "function" && (e = kl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Em(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/merge.js
function Qp(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new Em(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/on.js
function $p(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function em(e, t, n) {
	var r, i, a = $p(t) ? vp : yp;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function tm(e, t) {
	var n = this._id;
	return arguments.length < 2 ? bp(this.node(), n).on.on(e) : this.each(em(n, e, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/remove.js
function nm(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function rm() {
	return this.on("end.remove", nm(this._id));
}
//#endregion
//#region node_modules/d3-transition/src/transition/select.js
function im(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Sl(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, _p(l[f], t, n, f, l, bp(u, n)));
	return new Em(a, this._parents, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selectAll.js
function am(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = El(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = bp(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && _p(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new Em(a, o, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selection.js
var om = fd.prototype.constructor;
function sm() {
	return new om(this._groups, this._parents);
}
//#endregion
//#region node_modules/d3-transition/src/transition/style.js
function cm(e, t) {
	var n, r, i;
	return function() {
		var a = yu(this, e), o = (this.style.removeProperty(e), yu(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function lm(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function um(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = yu(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function dm(e, t, n) {
	var r, i, a;
	return function() {
		var o = yu(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), yu(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function fm(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = yp(this, e), l = c.on, u = c.value[a] == null ? s ||= lm(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function pm(e, t, n) {
	var r = (e += "") == "transform" ? Vf : Op;
	return t == null ? this.styleTween(e, cm(e, r)).on("end.style." + e, lm(e)) : typeof t == "function" ? this.styleTween(e, dm(e, r, Dp(this, "style." + e, t))).each(fm(this._id, e)) : this.styleTween(e, um(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/d3-transition/src/transition/styleTween.js
function mm(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function hm(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && mm(e, a, n)), r;
	}
	return a._value = t, a;
}
function gm(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, hm(e, t, n ?? ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/text.js
function _m(e) {
	return function() {
		this.textContent = e;
	};
}
function vm(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function ym(e) {
	return this.tween("text", typeof e == "function" ? vm(Dp(this, "text", e)) : _m(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/textTween.js
function bm(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function xm(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && bm(r)), t;
	}
	return r._value = e, r;
}
function Sm(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, xm(e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/transition.js
function Cm() {
	for (var e = this._name, t = this._id, n = Dm(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = bp(c, t);
		_p(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new Em(r, this._parents, e, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/end.js
function wm() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = yp(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/index.js
var Tm = 0;
function Em(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Dm() {
	return ++Tm;
}
var Om = fd.prototype;
Em.prototype = {
	constructor: Em,
	select: im,
	selectAll: am,
	selectChild: Om.selectChild,
	selectChildren: Om.selectChildren,
	filter: Zp,
	merge: Qp,
	selection: sm,
	transition: Cm,
	call: Om.call,
	nodes: Om.nodes,
	node: Om.node,
	size: Om.size,
	empty: Om.empty,
	each: Om.each,
	on: tm,
	attr: Fp,
	attrTween: Bp,
	style: pm,
	styleTween: gm,
	text: ym,
	textTween: Sm,
	remove: rm,
	tween: Ep,
	delay: Up,
	duration: Kp,
	ease: Jp,
	easeVarying: Xp,
	end: wm,
	[Symbol.iterator]: Om[Symbol.iterator]
};
//#endregion
//#region node_modules/d3-ease/src/cubic.js
function km(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/d3-transition/src/selection/transition.js
var Am = {
	time: null,
	delay: 0,
	duration: 250,
	ease: km
};
function jm(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function Mm(e) {
	var t, n;
	e instanceof Em ? (t = e._id, e = e._name) : (t = Dm(), (n = Am).time = ap(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && _p(c, e, t, l, o, n || jm(c, t));
	return new Em(r, this._parents, e, t);
}
fd.prototype.interrupt = Cp, fd.prototype.transition = Mm;
//#endregion
//#region node_modules/d3-zoom/src/constant.js
var Nm = (e) => () => e;
//#endregion
//#region node_modules/d3-zoom/src/event.js
function Pm(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
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
function Fm(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Fm.prototype = {
	constructor: Fm,
	scale: function(e) {
		return e === 1 ? this : new Fm(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Fm(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Im = new Fm(1, 0, 0);
Lm.prototype = Fm.prototype;
function Lm(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return Im;
	return e.__zoom;
}
//#endregion
//#region node_modules/d3-zoom/src/noevent.js
function Rm(e) {
	e.stopImmediatePropagation();
}
function zm(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-zoom/src/zoom.js
function Bm(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Vm() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Hm() {
	return this.__zoom || Im;
}
function Um(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function Wm() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Gm(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function Km() {
	var e = Bm, t = Vm, n = Gm, r = Um, i = Wm, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = qf, l = dl("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", Hm).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", Hm), e === i ? i.interrupt().each(function() {
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
			return n(Im.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new Fm(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new Fm(e.k, r, i);
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
					e = new Fm(n, l[0] - t[0] * n, l[1] - t[1] * n);
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
			var t = md(this.that).datum();
			l.call(e, this.that, new Pm(e, {
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
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = gd(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], Sp(this), s.start();
		zm(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = md(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = gd(t, i), l = t.clientX, u = t.clientY;
		xd(t.view), Rm(t), a.mouse = [c, this.__zoom.invert(c)], Sp(this), a.start();
		function d(e) {
			if (zm(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = gd(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), Sd(e.view, a.moved), zm(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = gd(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			zm(r), s > 0 ? md(this).transition().duration(s).call(x, d, c, r) : md(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (Rm(t), s = 0; s < i; ++s) c = r[s], l = gd(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), Sp(this), a.start());
		}
	}
	function O(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (zm(e), s = 0; s < a; ++s) c = i[s], l = gd(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
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
			for (Rm(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = gd(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = md(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Nm(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Nm(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Nm(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Nm([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
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
var qm = {
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
}, Jm = [[-Infinity, -Infinity], [Infinity, Infinity]], Ym = [
	"Enter",
	" ",
	"Escape"
], Xm = {
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
}, Zm;
(function(e) {
	e.Strict = "strict", e.Loose = "loose";
})(Zm ||= {});
var Qm;
(function(e) {
	e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Qm ||= {});
var $m;
(function(e) {
	e.Partial = "partial", e.Full = "full";
})($m ||= {});
var eh = {
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
}, th;
(function(e) {
	e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(th ||= {});
var nh;
(function(e) {
	e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(nh ||= {});
var rh;
(function(e) {
	e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(rh ||= {});
var ih = {
	[rh.Left]: rh.Right,
	[rh.Right]: rh.Left,
	[rh.Top]: rh.Bottom,
	[rh.Bottom]: rh.Top
}, ah = (e) => !!e && typeof e == "object" && "id" in e && "source" in e && "target" in e, oh = (e) => !!e && typeof e == "object" && "id" in e && "position" in e && !("source" in e) && !("target" in e), sh = (e) => !!e && typeof e == "object" && "id" in e && "internals" in e && !("source" in e) && !("target" in e), ch = (e, t = [0, 0]) => {
	let { width: n, height: r } = Hh(e), i = e.origin ?? t, a = n * i[0], o = r * i[1];
	return {
		x: e.position.x - a,
		y: e.position.y - o
	};
}, lh = (e, t = { nodeOrigin: [0, 0] }) => {
	if (e.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let n = !1, r = e.reduce((e, r) => {
		let i = typeof r == "string", a = !t.nodeLookup && !i ? r : void 0;
		return t.nodeLookup && (a = i ? t.nodeLookup.get(r) : sh(r) ? r : t.nodeLookup.get(r.id)), a ? (n = !0, Sh(e, Eh(a, t.nodeOrigin))) : e;
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return n ? wh(r) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, uh = (e, t = {}) => {
	let n = {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	}, r = !1;
	return e.forEach((e) => {
		(t.filter === void 0 || t.filter(e)) && (n = Sh(n, Eh(e)), r = !0);
	}), r ? wh(n) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, dh = (e, t, [n, r, i] = [
	0,
	0,
	1
], a = !1, o = !1) => {
	let s = (t.x - n) / i, c = (t.y - r) / i, l = t.width / i, u = t.height / i, d = [];
	for (let t of e.values()) {
		let { measured: e, selectable: n = !0, hidden: r = !1 } = t;
		if (o && !n || r) continue;
		let i = e.width ?? t.width ?? t.initialWidth ?? 0, f = e.height ?? t.height ?? t.initialHeight ?? 0, { x: p, y: m } = t.internals.positionAbsolute, h = Oh(s, c, l, u, p, m, i, f), g = i * f, _ = a && h > 0;
		(!t.internals.handleBounds || _ || h >= g || t.dragging) && d.push(t);
	}
	return d;
}, fh = (e, t) => {
	let n = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		n.add(e.id);
	}), t.filter((e) => n.has(e.source) || n.has(e.target));
};
function ph(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t?.nodes ? new Set(t.nodes.map((e) => e.id)) : null;
	return e.forEach((e) => {
		let i;
		if (t?.includeHiddenNodes) {
			let { width: t, height: n } = Hh(e);
			i = t > 0 && n > 0;
		} else i = !!(e.measured.width && e.measured.height && !e.hidden);
		i && (!r || r.has(e.id)) && n.set(e.id, e);
	}), n;
}
async function mh({ nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: a }, o) {
	if (e.size === 0) return !0;
	let s = zh(uh(ph(e, o)), t, n, o?.minZoom ?? i, o?.maxZoom ?? a, o?.padding ?? .1);
	return await r.setViewport(s, {
		duration: o?.duration,
		ease: o?.ease,
		interpolate: o?.interpolate
	}), !0;
}
function hh({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: a }) {
	let o = n.get(e), s = o.parentId ? n.get(o.parentId) : void 0, { x: c, y: l } = s ? s.internals.positionAbsolute : {
		x: 0,
		y: 0
	}, u = o.origin ?? r, d = o.extent || i;
	if (o.extent === "parent" && !o.expandParent) {
		if (!s) a?.("005", qm.error005());
		else {
			let { width: e, height: t } = Hh(s);
			e && t && (d = [[c, l], [c + e, l + t]]);
		}
	} else s && Vh(o.extent) && (d = [[o.extent[0][0] + c, o.extent[0][1] + l], [o.extent[1][0] + c, o.extent[1][1] + l]]);
	let f = Vh(d) ? vh(t, d, o.measured) : t;
	return (o.measured.width === void 0 || o.measured.height === void 0) && a?.("015", qm.error015()), {
		position: {
			x: f.x - c + (o.measured.width ?? 0) * u[0],
			y: f.y - l + (o.measured.height ?? 0) * u[1]
		},
		positionAbsolute: f
	};
}
async function gh({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: i }) {
	let a = new Set(e.map((e) => e.id)), o = [];
	for (let e of n) {
		if (e.deletable === !1) continue;
		let t = a.has(e.id), n = !t && e.parentId && o.find((t) => t.id === e.parentId);
		(t || n) && o.push(e);
	}
	let s = new Set(t.map((e) => e.id)), c = r.filter((e) => e.deletable !== !1), l = fh(o, c);
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
var _h = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), vh = (e = {
	x: 0,
	y: 0
}, t, n) => ({
	x: _h(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
	y: _h(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function yh(e, t, n) {
	let { width: r, height: i } = Hh(n), { x: a, y: o } = n.internals.positionAbsolute;
	return vh(e, [[a, o], [a + r, o + i]], t);
}
var bh = (e, t, n) => e < t ? _h(Math.abs(e - t), 1, t) / t : e > n ? -_h(Math.abs(e - n), 1, t) / t : 0, xh = (e, t, n = 15, r = 40) => [bh(e.x, r, t.width - r) * n, bh(e.y, r, t.height - r) * n], Sh = (e, t) => ({
	x: Math.min(e.x, t.x),
	y: Math.min(e.y, t.y),
	x2: Math.max(e.x2, t.x2),
	y2: Math.max(e.y2, t.y2)
}), Ch = ({ x: e, y: t, width: n, height: r }) => ({
	x: e,
	y: t,
	x2: e + n,
	y2: t + r
}), wh = ({ x: e, y: t, x2: n, y2: r }) => ({
	x: e,
	y: t,
	width: n - e,
	height: r - t
}), Th = (e, t = [0, 0]) => {
	let { x: n, y: r } = sh(e) ? e.internals.positionAbsolute : ch(e, t);
	return {
		x: n,
		y: r,
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}, Eh = (e, t = [0, 0]) => {
	let { x: n, y: r } = sh(e) ? e.internals.positionAbsolute : ch(e, t);
	return {
		x: n,
		y: r,
		x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
		y2: r + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
	};
}, Dh = (e, t) => wh(Sh(Ch(e), Ch(t))), Oh = (e, t, n, r, i, a, o, s) => {
	let c = Math.max(0, Math.min(e + n, i + o) - Math.max(e, i)), l = Math.max(0, Math.min(t + r, a + s) - Math.max(t, a));
	return Math.ceil(c * l);
}, kh = (e, t) => Oh(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height), Ah = (e) => jh(e.width) && jh(e.height) && jh(e.x) && jh(e.y), jh = (e) => !isNaN(e) && isFinite(e), Mh = (e, t) => (e, t) => {}, Nh = (e, t = [1, 1]) => ({
	x: t[0] * Math.round(e.x / t[0]),
	y: t[1] * Math.round(e.y / t[1])
}), Ph = ({ x: e, y: t }, [n, r, i], a = !1, o = [1, 1]) => {
	let s = {
		x: (e - n) / i,
		y: (t - r) / i
	};
	return a ? Nh(s, o) : s;
}, Fh = ({ x: e, y: t }, [n, r, i]) => ({
	x: e * i + n,
	y: t * i + r
});
function Ih(e, t) {
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
function Lh(e, t, n) {
	if (typeof e == "string" || typeof e == "number") {
		let r = Ih(e, n), i = Ih(e, t);
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
		let r = Ih(e.top ?? e.y ?? 0, n), i = Ih(e.bottom ?? e.y ?? 0, n), a = Ih(e.left ?? e.x ?? 0, t), o = Ih(e.right ?? e.x ?? 0, t);
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
function Rh(e, t, n, r, i, a) {
	let { x: o, y: s } = Fh(e, [
		t,
		n,
		r
	]), { x: c, y: l } = Fh({
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
var zh = (e, t, n, r, i, a) => {
	let o = Lh(a, t, n), s = (t - o.x) / e.width, c = (n - o.y) / e.height, l = _h(Math.min(s, c), r, i), u = e.x + e.width / 2, d = e.y + e.height / 2, f = t / 2 - u * l, p = n / 2 - d * l, m = Rh(e, f, p, l, t, n), h = {
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
}, Bh = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Vh(e) {
	return e != null && e !== "parent";
}
function Hh(e) {
	return {
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}
function Uh(e) {
	return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function Wh(e, t = {
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
function Gh(e) {
	return {
		...Xm,
		...e || {}
	};
}
function Kh(e, t) {
	if (!e && !t) return !0;
	if (!e || !t || e.size !== t.size) return !1;
	if (!e.size && !t.size) return !0;
	for (let n of e.keys()) if (!t.has(n)) return !1;
	return !0;
}
function qh(e, t, n) {
	if (!n) return;
	let r = [];
	e.forEach((e, n) => {
		t?.has(n) || r.push(e);
	}), r.length && n(r);
}
function Jh(e) {
	return e === null ? null : e ? "valid" : "invalid";
}
function Yh(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
	let { x: a, y: o } = tg(e), s = Ph({
		x: a - (i?.left ?? 0),
		y: o - (i?.top ?? 0)
	}, r), { x: c, y: l } = n ? Nh(s, t) : s;
	return {
		xSnapped: c,
		ySnapped: l,
		...s
	};
}
var Xh = (e) => ({
	width: e.offsetWidth,
	height: e.offsetHeight
}), Zh = (e) => e?.getRootNode?.() || window?.document, Qh = [
	"INPUT",
	"SELECT",
	"TEXTAREA"
];
function $h(e) {
	let t = e.composedPath?.()?.[0] || e.target;
	return t?.nodeType === 1 ? Qh.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey") : !1;
}
var eg = (e) => "clientX" in e, tg = (e, t) => {
	let n = eg(e), r = n ? e.clientX : e.touches?.[0].clientX, i = n ? e.clientY : e.touches?.[0].clientY;
	return {
		x: r - (t?.left ?? 0),
		y: i - (t?.top ?? 0)
	};
}, ng = (e, t, n, r, i) => {
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
			...Xh(t)
		};
	});
};
function rg({ sourceX: e, sourceY: t, targetX: n, targetY: r, sourceControlX: i, sourceControlY: a, targetControlX: o, targetControlY: s }) {
	let c = e * .125 + i * .375 + o * .375 + n * .125, l = t * .125 + a * .375 + s * .375 + r * .125;
	return [
		c,
		l,
		Math.abs(c - e),
		Math.abs(l - t)
	];
}
function ig(e, t) {
	return e >= 0 ? .5 * e : t * 25 * Math.sqrt(-e);
}
function ag({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
	switch (e) {
		case rh.Left: return [t - ig(t - r, a), n];
		case rh.Right: return [t + ig(r - t, a), n];
		case rh.Top: return [t, n - ig(n - i, a)];
		case rh.Bottom: return [t, n + ig(i - n, a)];
	}
}
function og({ sourceX: e, sourceY: t, sourcePosition: n = rh.Bottom, targetX: r, targetY: i, targetPosition: a = rh.Top, curvature: o = .25 }) {
	let [s, c] = ag({
		pos: n,
		x1: e,
		y1: t,
		x2: r,
		y2: i,
		c: o
	}), [l, u] = ag({
		pos: a,
		x1: r,
		y1: i,
		x2: e,
		y2: t,
		c: o
	}), [d, f, p, m] = rg({
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
function sg({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let i = Math.abs(n - e) / 2, a = n < e ? n + i : n - i, o = Math.abs(r - t) / 2;
	return [
		a,
		r < t ? r + o : r - o,
		i,
		o
	];
}
function cg({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: r = 0, elevateOnSelect: i = !1, zIndexMode: a = "basic" }) {
	return a === "manual" ? r : (i && n ? r + 1e3 : r) + Math.max(e.parentId || i && e.selected ? e.internals.z : 0, t.parentId || i && t.selected ? t.internals.z : 0);
}
function lg({ sourceNode: e, targetNode: t, width: n, height: r, transform: i }) {
	let a = Sh(Eh(e), Eh(t));
	return a.x === a.x2 && (a.x2 += 1), a.y === a.y2 && (a.y2 += 1), kh({
		x: -i[0] / i[2],
		y: -i[1] / i[2],
		width: n / i[2],
		height: r / i[2]
	}, wh(a)) > 0;
}
var ug = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`, dg = (e, t) => t.some((t) => t.source === e.source && t.target === e.target && (t.sourceHandle === e.sourceHandle || !t.sourceHandle && !e.sourceHandle) && (t.targetHandle === e.targetHandle || !t.targetHandle && !e.targetHandle)), fg = (e, t, n = {}) => {
	if (!e.source || !e.target) return n.onError?.("006", qm.error006()), t;
	let r = n.getEdgeId || ug, i;
	return i = ah(e) ? { ...e } : {
		...e,
		id: r(e)
	}, dg(i, t) ? t : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, t.concat(i));
};
function pg({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let [i, a, o, s] = sg({
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
var mg = {
	[rh.Left]: {
		x: -1,
		y: 0
	},
	[rh.Right]: {
		x: 1,
		y: 0
	},
	[rh.Top]: {
		x: 0,
		y: -1
	},
	[rh.Bottom]: {
		x: 0,
		y: 1
	}
}, hg = ({ source: e, sourcePosition: t = rh.Bottom, target: n }) => t === rh.Left || t === rh.Right ? e.x < n.x ? {
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
}, gg = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
function _g({ source: e, sourcePosition: t = rh.Bottom, target: n, targetPosition: r = rh.Top, center: i, offset: a, stepPosition: o }) {
	let s = mg[t], c = mg[r], l = {
		x: e.x + s.x * a,
		y: e.y + s.y * a
	}, u = {
		x: n.x + c.x * a,
		y: n.y + c.y * a
	}, d = hg({
		source: l,
		sourcePosition: t,
		target: u
	}), f = d.x === 0 ? "y" : "x", p = d[f], m = [], h, g, _ = {
		x: 0,
		y: 0
	}, v = {
		x: 0,
		y: 0
	}, [, , y, b] = sg({
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
function vg(e, t, n, r) {
	let i = Math.min(gg(e, t) / 2, gg(t, n) / 2, r), { x: a, y: o } = t;
	if (e.x === a && a === n.x || e.y === o && o === n.y) return `L${a} ${o}`;
	if (e.y === o) {
		let t = e.x < n.x ? -1 : 1, r = e.y < n.y ? 1 : -1;
		return `L ${a + i * t},${o}Q ${a},${o} ${a},${o + i * r}`;
	}
	let s = e.x < n.x ? 1 : -1;
	return `L ${a},${o + i * (e.y < n.y ? -1 : 1)}Q ${a},${o} ${a + i * s},${o}`;
}
function yg({ sourceX: e, sourceY: t, sourcePosition: n = rh.Bottom, targetX: r, targetY: i, targetPosition: a = rh.Top, borderRadius: o = 5, centerX: s, centerY: c, offset: l = 20, stepPosition: u = .5 }) {
	let [d, f, p, m, h] = _g({
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
	for (let e = 1; e < d.length - 1; e++) g += vg(d[e - 1], d[e], d[e + 1], o);
	return g += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [
		g,
		f,
		p,
		m,
		h
	];
}
function bg(e) {
	return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function xg(e) {
	let { sourceNode: t, targetNode: n } = e;
	if (!bg(t) || !bg(n)) return null;
	let r = t.internals.handleBounds || Sg(t.handles), i = n.internals.handleBounds || Sg(n.handles), a = wg(r?.source ?? [], e.sourceHandle), o = wg(e.connectionMode === Zm.Strict ? i?.target ?? [] : (i?.target ?? []).concat(i?.source ?? []), e.targetHandle);
	if (!a || !o) return e.onError?.("008", qm.error008(a ? "target" : "source", {
		id: e.id,
		sourceHandle: e.sourceHandle,
		targetHandle: e.targetHandle
	})), null;
	let s = a?.position || rh.Bottom, c = o?.position || rh.Top, l = Cg(t, a, s), u = Cg(n, o, c);
	return {
		sourceX: l.x,
		sourceY: l.y,
		targetX: u.x,
		targetY: u.y,
		sourcePosition: s,
		targetPosition: c
	};
}
function Sg(e) {
	if (!e) return null;
	let t = [], n = [];
	for (let r of e) r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? t.push(r) : r.type === "target" && n.push(r);
	return {
		source: t,
		target: n
	};
}
function Cg(e, t, n = rh.Left, r = !1) {
	let i = (t?.x ?? 0) + e.internals.positionAbsolute.x, a = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: o, height: s } = t ?? Hh(e);
	if (r) return {
		x: i + o / 2,
		y: a + s / 2
	};
	switch (t?.position ?? n) {
		case rh.Top: return {
			x: i + o / 2,
			y: a
		};
		case rh.Right: return {
			x: i + o,
			y: a + s / 2
		};
		case rh.Bottom: return {
			x: i + o / 2,
			y: a + s
		};
		case rh.Left: return {
			x: i,
			y: a + s / 2
		};
	}
}
function wg(e, t) {
	return e && (t ? e.find((e) => e.id === t) : e[0]) || null;
}
function Tg(e, t) {
	return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((t) => `${t}=${e[t]}`).join("&")}` : "";
}
function Eg(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: i }) {
	let a = /* @__PURE__ */ new Set();
	return e.reduce((e, o) => ([o.markerStart || r, o.markerEnd || i].forEach((r) => {
		if (r && typeof r == "object") {
			let i = Tg(r, t);
			a.has(i) || (e.push({
				id: i,
				color: r.color || n,
				...r
			}), a.add(i));
		}
	}), e), []).sort((e, t) => e.id.localeCompare(t.id));
}
var Dg = 1e3, Og = 10, kg = {
	nodeOrigin: [0, 0],
	nodeExtent: Jm,
	elevateNodesOnSelect: !0,
	zIndexMode: "basic",
	defaults: {}
}, Ag = {
	...kg,
	checkEquality: !0
};
function jg(e, t) {
	let n = { ...e };
	for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}
function Mg(e, t, n) {
	let r = jg(kg, n);
	for (let n of e.values()) if (n.parentId) Lg(n, e, t, r);
	else {
		let e = vh(ch(n, r.nodeOrigin), Vh(n.extent) ? n.extent : r.nodeExtent, Hh(n));
		n.internals.positionAbsolute = e;
	}
}
function Ng(e, t) {
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
function Pg(e) {
	return e === "manual";
}
function Fg(e, t, n, r = {}) {
	let i = jg(Ag, r), a = { i: 0 }, o = new Map(t), s = i?.elevateNodesOnSelect && !Pg(i.zIndexMode) ? Dg : 0, c = e.length > 0, l = !1;
	t.clear(), n.clear();
	for (let u of e) {
		let e = o.get(u.id);
		if (i.checkEquality && u === e?.internals.userNode) t.set(u.id, e);
		else {
			let n = vh(ch(u, i.nodeOrigin), Vh(u.extent) ? u.extent : i.nodeExtent, Hh(u));
			e = {
				...i.defaults,
				...u,
				measured: {
					width: u.measured?.width,
					height: u.measured?.height
				},
				internals: {
					positionAbsolute: n,
					handleBounds: Ng(u, e),
					z: Rg(u, s, i.zIndexMode),
					userNode: u
				}
			}, t.set(u.id, e);
		}
		(e.measured === void 0 || e.measured.width === void 0 || e.measured.height === void 0) && !e.hidden && (c = !1), u.parentId && Lg(e, t, n, r, a), l ||= u.selected ?? !1;
	}
	return {
		nodesInitialized: c,
		hasSelectedNodes: l
	};
}
function Ig(e, t) {
	if (!e.parentId) return;
	let n = t.get(e.parentId);
	n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Lg(e, t, n, r, i) {
	let { elevateNodesOnSelect: a, nodeOrigin: o, nodeExtent: s, zIndexMode: c } = jg(kg, r), l = e.parentId, u = t.get(l);
	if (!u) {
		console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
		return;
	}
	Ig(e, n), i && !u.parentId && u.internals.rootParentIndex === void 0 && c === "auto" && (u.internals.rootParentIndex = ++i.i, u.internals.z = u.internals.z + i.i * Og), i && u.internals.rootParentIndex !== void 0 && (i.i = u.internals.rootParentIndex);
	let { x: d, y: f, z: p } = zg(e, u, o, s, a && !Pg(c) ? Dg : 0, c), { positionAbsolute: m } = e.internals, h = d !== m.x || f !== m.y;
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
function Rg(e, t, n) {
	let r = jh(e.zIndex) ? e.zIndex : 0;
	return Pg(n) ? r : r + (e.selected ? t : 0);
}
function zg(e, t, n, r, i, a) {
	let { x: o, y: s } = t.internals.positionAbsolute, c = Hh(e), l = ch(e, n), u = Vh(e.extent) ? vh(l, e.extent, c) : l, d = vh({
		x: o + u.x,
		y: s + u.y
	}, r, c);
	e.extent === "parent" && (d = yh(d, c, t));
	let f = Rg(e, i, a), p = t.internals.z ?? 0;
	return {
		x: d.x,
		y: d.y,
		z: p >= f ? p + 1 : f
	};
}
function Bg(e, t, n, r = [0, 0]) {
	let i = [], a = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.parentId);
		if (!e) continue;
		let r = Dh(a.get(n.parentId)?.expandedRect ?? Th(e), n.rect);
		a.set(n.parentId, {
			expandedRect: r,
			parent: e
		});
	}
	return a.size > 0 && a.forEach(({ expandedRect: t, parent: a }, o) => {
		let s = a.internals.positionAbsolute, c = Hh(a), l = a.origin ?? r, u = t.x < s.x ? Math.round(Math.abs(s.x - t.x)) : 0, d = t.y < s.y ? Math.round(Math.abs(s.y - t.y)) : 0, f = Math.max(c.width, Math.round(t.width)), p = Math.max(c.height, Math.round(t.height)), m = (f - c.width) * l[0], h = (p - c.height) * l[1];
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
function Vg(e, t, n, r, i, a, o) {
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
		let s = Xh(r.nodeElement), u = e.measured.width !== s.width || e.measured.height !== s.height;
		if (s.width && s.height && (u || !e.internals.handleBounds || r.force)) {
			let p = r.nodeElement.getBoundingClientRect(), m = Vh(e.extent) ? e.extent : a, { positionAbsolute: h } = e.internals;
			if (e.parentId && e.extent === "parent") {
				let n = t.get(e.parentId);
				n && (h = yh(h, s, n));
			} else m && (h = vh(h, m, s));
			let g = {
				...e,
				measured: s,
				internals: {
					...e.internals,
					positionAbsolute: h,
					handleBounds: {
						source: ng("source", r.nodeElement, p, d, e.id),
						target: ng("target", r.nodeElement, p, d, e.id)
					}
				}
			};
			t.set(e.id, g), e.parentId && Lg(g, t, n, {
				nodeOrigin: i,
				zIndexMode: o
			}), c = !0, u && (l.push({
				id: e.id,
				type: "dimensions",
				dimensions: s
			}), e.expandParent && e.parentId && f.push({
				id: e.id,
				parentId: e.parentId,
				rect: Th(g, i)
			}));
		}
	}
	if (f.length > 0) {
		let e = Bg(f, t, n, i);
		l.push(...e);
	}
	return {
		changes: l,
		updatedInternals: c
	};
}
async function Hg({ delta: e, panZoom: t, transform: n, translateExtent: r, width: i, height: a }) {
	if (!t || !e.x && !e.y) return !1;
	let o = await t.setViewportConstrained({
		x: n[0] + e.x,
		y: n[1] + e.y,
		zoom: n[2]
	}, [[0, 0], [i, a]], r);
	return !!o && (o.x !== n[0] || o.y !== n[1] || o.k !== n[2]);
}
function Ug(e, t, n, r, i, a) {
	let o = i, s = r.get(o) || /* @__PURE__ */ new Map();
	r.set(o, s.set(n, t)), o = `${i}-${e}`;
	let c = r.get(o) || /* @__PURE__ */ new Map();
	if (r.set(o, c.set(n, t)), a) {
		o = `${i}-${e}-${a}`;
		let s = r.get(o) || /* @__PURE__ */ new Map();
		r.set(o, s.set(n, t));
	}
}
function Wg(e, t, n) {
	e.clear(), t.clear();
	for (let r of n) {
		let { source: n, target: i, sourceHandle: a = null, targetHandle: o = null } = r, s = {
			edgeId: r.id,
			source: n,
			target: i,
			sourceHandle: a,
			targetHandle: o
		}, c = `${n}-${a}--${i}-${o}`;
		Ug("source", s, `${i}-${o}--${n}-${a}`, e, n, a), Ug("target", s, c, e, i, o), t.set(r.id, r);
	}
}
function Gg(e, t) {
	if (!e.parentId) return !1;
	let n = t.get(e.parentId);
	return n ? n.selected ? !0 : Gg(n, t) : !1;
}
function Kg(e, t, n) {
	let r = e;
	do {
		if (r?.matches?.(t)) return !0;
		if (r === n) return !1;
		r = r?.parentElement;
	} while (r);
	return !1;
}
function qg(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let [a, o] of e) if ((o.selected || o.id === r) && (!o.parentId || !Gg(o, e)) && (o.draggable || t && o.draggable === void 0)) {
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
function Jg({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
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
function Yg({ dragItems: e, snapGrid: t, x: n, y: r }) {
	let i = e.values().next().value;
	if (!i) return null;
	let a = {
		x: n - i.distance.x,
		y: r - i.distance.y
	}, o = Nh(a, t);
	return {
		x: o.x - a.x,
		y: o.y - a.y
	};
}
function Xg({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: i }) {
	let a = {
		x: null,
		y: null
	}, o = 0, s = /* @__PURE__ */ new Map(), c = !1, l = {
		x: 0,
		y: 0
	}, u = null, d = !1, f = null, p = !1, m = !1, h = null;
	function g({ noDragClassName: g, handleSelector: _, domNode: v, isSelectable: y, nodeId: b, nodeClickDistance: x = 0 }) {
		f = md(v);
		function S({ x: e, y: n }) {
			let { nodeLookup: i, nodeExtent: o, snapGrid: c, snapToGrid: l, nodeOrigin: u, onNodeDrag: d, onSelectionDrag: f, onError: p, updateNodePositions: g } = t();
			a = {
				x: e,
				y: n
			};
			let _ = !1, v = s.size > 1, y = v && o ? Ch(uh(s)) : null, x = v && l ? Yg({
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
				} : Nh(a, c));
				let s = null;
				if (v && o && !r.extent && y) {
					let { positionAbsolute: e } = r.internals, t = e.x - y.x + o[0][0], n = e.x + r.measured.width - y.x2 + o[1][0], i = e.y - y.y + o[0][1], a = e.y + r.measured.height - y.y2 + o[1][1];
					s = [[t, i], [n, a]];
				}
				let { position: d, positionAbsolute: f } = hh({
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
				let [e, t] = Jg({
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
			let [s, d] = xh(l, u, r);
			(s !== 0 || d !== 0) && (a.x = (a.x ?? 0) - s / e[2], a.y = (a.y ?? 0) - d / e[2], await n({
				x: s,
				y: d
			}) && S(a)), o = requestAnimationFrame(C);
		}
		function w(r) {
			let { nodeLookup: i, multiSelectionActive: o, nodesDraggable: c, transform: l, snapGrid: f, snapToGrid: p, selectNodesOnDrag: m, onNodeDragStart: h, onSelectionDragStart: g, unselectNodesAndEdges: _ } = t();
			d = !0, (!m || !y) && !o && b && (i.get(b)?.selected || _()), y && m && b && e?.(b);
			let v = Yh(r.sourceEvent, {
				transform: l,
				snapGrid: f,
				snapToGrid: p,
				containerBounds: u
			});
			if (a = v, s = qg(i, c, v, b), s.size > 0 && (n || h || !b && g)) {
				let [e, t] = Jg({
					nodeId: b,
					dragItems: s,
					nodeLookup: i
				});
				n?.(r.sourceEvent, s, e, t), h?.(r.sourceEvent, e, t), b || g?.(r.sourceEvent, t);
			}
		}
		let T = kd().clickDistance(x).on("start", (e) => {
			let { domNode: n, nodeDragThreshold: r, transform: i, snapGrid: o, snapToGrid: s } = t();
			u = n?.getBoundingClientRect() || null, p = !1, m = !1, h = e.sourceEvent, r === 0 && w(e), a = Yh(e.sourceEvent, {
				transform: i,
				snapGrid: o,
				snapToGrid: s,
				containerBounds: u
			}), l = tg(e.sourceEvent, u);
		}).on("drag", (e) => {
			let { autoPanOnNodeDrag: n, transform: r, snapGrid: i, snapToGrid: o, nodeDragThreshold: f, nodeLookup: m } = t(), g = Yh(e.sourceEvent, {
				transform: r,
				snapGrid: i,
				snapToGrid: o,
				containerBounds: u
			});
			if (h = e.sourceEvent, (e.sourceEvent.type === "touchmove" && e.sourceEvent.touches.length > 1 || b && !m.has(b)) && (p = !0), !p) {
				if (!c && n && d && (c = !0, C()), !d) {
					let t = tg(e.sourceEvent, u), n = t.x - l.x, r = t.y - l.y;
					Math.sqrt(n * n + r * r) > f && w(e);
				}
				(a.x !== g.xSnapped || a.y !== g.ySnapped) && s && d && (l = tg(e.sourceEvent, u), S(g));
			}
		}).on("end", (e) => {
			if (!d || p) {
				p && s.size > 0 && t().updateNodePositions(s, !1);
				return;
			}
			if (c = !1, d = !1, cancelAnimationFrame(o), s.size > 0) {
				let { nodeLookup: n, updateNodePositions: r, onNodeDragStop: a, onSelectionDragStop: o } = t();
				if (m &&= (r(s, !1), !1), i || a || !b && o) {
					let [t, r] = Jg({
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
			return !e.button && (!g || !Kg(t, `.${g}`, v)) && (!_ || Kg(t, _, v));
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
function Zg(e, t, n) {
	let r = [], i = {
		x: e.x - n,
		y: e.y - n,
		width: n * 2,
		height: n * 2
	};
	for (let e of t.values()) kh(i, Th(e)) > 0 && r.push(e);
	return r;
}
var Qg = 250;
function $g(e, t, n, r) {
	let i = [], a = Infinity, o = Zg(e, n, t + Qg);
	for (let n of o) {
		let o = [...n.internals.handleBounds?.source ?? [], ...n.internals.handleBounds?.target ?? []];
		for (let s of o) {
			if (r.nodeId === s.nodeId && r.type === s.type && r.id === s.id) continue;
			let { x: o, y: c } = Cg(n, s, s.position, !0), l = Math.sqrt((o - e.x) ** 2 + (c - e.y) ** 2);
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
function e_(e, t, n, r, i, a = !1) {
	let o = r.get(e);
	if (!o) return null;
	let s = i === "strict" ? o.internals.handleBounds?.[t] : [...o.internals.handleBounds?.source ?? [], ...o.internals.handleBounds?.target ?? []], c = (n ? s?.find((e) => e.id === n) : s?.[0]) ?? null;
	return c && a ? {
		...c,
		...Cg(o, c, c.position, !0)
	} : c;
}
function t_(e, t) {
	return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function n_(e, t) {
	let n = null;
	return t ? n = !0 : e && !t && (n = !1), n;
}
var r_ = () => !0;
function i_(e, { connectionMode: t, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: a, isTarget: o, domNode: s, nodeLookup: c, lib: l, autoPanOnConnect: u, flowId: d, panBy: f, cancelConnection: p, onConnectStart: m, onConnect: h, onConnectEnd: g, isValidConnection: _ = r_, onReconnectEnd: v, updateConnection: y, getTransform: b, getFromHandle: x, autoPanSpeed: S, dragThreshold: C = 1, handleDomNode: w }) {
	let T = Zh(e.target), E = 0, D, { x: O, y: k } = tg(e), A = t_(a, w), j = s?.getBoundingClientRect(), ee = !1;
	if (!j || !A) return;
	let te = e_(i, A, r, c, t);
	if (!te) return;
	let M = tg(e, j), ne = !1, re = null, ie = !1, ae = null;
	function oe() {
		if (!u || !j) return;
		let [e, t] = xh(M, j, S);
		f({
			x: e,
			y: t
		}), E = requestAnimationFrame(oe);
	}
	let se = {
		...te,
		nodeId: i,
		type: A,
		position: te.position
	}, ce = c.get(i), le = {
		inProgress: !0,
		isValid: null,
		from: Cg(ce, se, rh.Left, !0),
		fromHandle: se,
		fromPosition: se.position,
		fromNode: ce,
		to: M,
		toHandle: null,
		toPosition: ih[se.position],
		toNode: null,
		pointer: M
	};
	function ue() {
		ee = !0, y(le), m?.(e, {
			nodeId: i,
			handleId: r,
			handleType: A
		});
	}
	C === 0 && ue();
	function de(e) {
		if (!ee) {
			let { x: t, y: n } = tg(e), r = t - O, i = n - k;
			if (!(r * r + i * i > C * C)) return;
			ue();
		}
		if (!x() || !se) {
			fe(e);
			return;
		}
		let a = b();
		M = tg(e, j), D = $g(Ph(M, a, !1, [1, 1]), n, c, se), ne ||= (oe(), !0);
		let s = a_(e, {
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
		ae = s.handleDomNode, re = s.connection, ie = n_(!!D, s.isValid);
		let u = c.get(i), f = u ? Cg(u, se, rh.Left, !0) : le.from, p = {
			...le,
			from: f,
			isValid: ie,
			to: s.toHandle && ie ? Fh({
				x: s.toHandle.x,
				y: s.toHandle.y
			}, a) : M,
			toHandle: s.toHandle,
			toPosition: ie && s.toHandle ? s.toHandle.position : ih[se.position],
			toNode: s.toHandle ? c.get(s.toHandle.nodeId) : null,
			pointer: M
		};
		y(p), le = p;
	}
	function fe(e) {
		if (!("touches" in e && e.touches.length > 0)) {
			if (ee) {
				(D || ae) && re && ie && h?.(re);
				let { inProgress: t, ...n } = le, r = {
					...n,
					toPosition: le.toHandle ? le.toPosition : null
				};
				g?.(e, r), a && v?.(e, r);
			}
			p(), cancelAnimationFrame(E), ne = !1, ie = !1, re = null, ae = null, T.removeEventListener("mousemove", de), T.removeEventListener("mouseup", fe), T.removeEventListener("touchmove", de), T.removeEventListener("touchend", fe);
		}
	}
	T.addEventListener("mousemove", de), T.addEventListener("mouseup", fe), T.addEventListener("touchmove", de), T.addEventListener("touchend", fe);
}
function a_(e, { handle: t, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: a, doc: o, lib: s, flowId: c, isValidConnection: l = r_, nodeLookup: u }) {
	let d = a === "target", f = t ? o.querySelector(`.${s}-flow__handle[data-id="${c}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: m } = tg(e), h = o.elementFromPoint(p, m), g = h?.classList.contains(`${s}-flow__handle`) ? h : f, _ = {
		handleDomNode: g,
		isValid: !1,
		connection: null,
		toHandle: null
	};
	if (g) {
		let e = t_(void 0, g), t = g.getAttribute("data-nodeid"), a = g.getAttribute("data-handleid"), o = g.classList.contains("connectable"), s = g.classList.contains("connectableend");
		if (!t || !e) return _;
		let c = {
			source: d ? t : r,
			sourceHandle: d ? a : i,
			target: d ? r : t,
			targetHandle: d ? i : a
		};
		_.connection = c, _.isValid = o && s && (n === Zm.Strict ? d && e === "source" || !d && e === "target" : t !== r || a !== i) && l(c), _.toHandle = e_(t, e, a, u, n, !0);
	}
	return _;
}
var o_ = {
	onPointerDown: i_,
	isValid: a_
};
function s_({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
	let i = md(e);
	function a({ translateExtent: e, width: a, height: o, zoomStep: s = 1, pannable: c = !0, zoomable: l = !0, inversePan: u = !1 }) {
		let d = (e) => {
			if (e.sourceEvent.type !== "wheel" || !t) return;
			let r = n(), i = e.sourceEvent.ctrlKey && Bh() ? 10 : 1, a = -e.sourceEvent.deltaY * (e.sourceEvent.deltaMode === 1 ? .05 : e.sourceEvent.deltaMode ? 1 : .002) * s, o = r[2] * 2 ** (a * i);
			t.scaleTo(o);
		}, f = [0, 0], p = Km().on("start", (e) => {
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
		pointer: gd
	};
}
var c_ = (e) => ({
	x: e.x,
	y: e.y,
	zoom: e.k
}), l_ = ({ x: e, y: t, zoom: n }) => Im.translate(e, t).scale(n), u_ = (e, t) => e.target.closest(`.${t}`), d_ = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), f_ = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, p_ = (e, t = 0, n = f_, r = () => {}) => {
	let i = typeof t == "number" && t > 0;
	return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}, m_ = (e) => {
	let t = e.ctrlKey && Bh() ? 10 : 1;
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * t;
};
function h_({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: a, zoomOnPinch: o, onPanZoomStart: s, onPanZoom: c, onPanZoomEnd: l }) {
	return (u) => {
		if (u_(u, t)) return u.ctrlKey && u.preventDefault(), !1;
		u.preventDefault(), u.stopImmediatePropagation();
		let d = n.property("__zoom").k || 1;
		if (u.ctrlKey && o) {
			let e = gd(u), t = d * 2 ** m_(u);
			r.scaleTo(n, t, e, u);
			return;
		}
		let f = u.deltaMode === 1 ? 20 : 1, p = i === Qm.Vertical ? 0 : u.deltaX * f, m = i === Qm.Horizontal ? 0 : u.deltaY * f;
		!Bh() && u.shiftKey && i !== Qm.Vertical && (p = u.deltaY * f, m = 0), r.translateBy(n, -(p / d) * a, -(m / d) * a, { internal: !0 });
		let h = c_(n.property("__zoom"));
		clearTimeout(e.panScrollTimeout), e.isPanScrolling ? c?.(u, h) : (e.isPanScrolling = !0, s?.(u, h)), e.panScrollTimeout = setTimeout(() => {
			l?.(u, h), e.isPanScrolling = !1;
		}, 150);
	};
}
function g_({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
	return function(r, i) {
		let a = r.type === "wheel", o = !t && a && !r.ctrlKey, s = u_(r, e);
		if (r.ctrlKey && a && s && r.preventDefault(), o || s) return null;
		r.preventDefault(), n.call(this, r, i);
	};
}
function __({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
	return (r) => {
		if (r.sourceEvent?.internal) return;
		let i = c_(r.transform);
		e.mouseButton = r.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = i, r.sourceEvent?.type === "mousedown" && t(!0), n && n?.(r.sourceEvent, i);
	};
}
function v_({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
	return (a) => {
		e.usedRightMouseButton = !!(n && d_(t, e.mouseButton ?? 0)), a.sourceEvent?.sync || r([
			a.transform.x,
			a.transform.y,
			a.transform.k
		]), i && !a.sourceEvent?.internal && i?.(a.sourceEvent, c_(a.transform));
	};
}
function y_({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: a }) {
	return (o) => {
		if (!o.sourceEvent?.internal && (e.isZoomingOrPanning = !1, a && d_(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && o.sourceEvent && a(o.sourceEvent), e.usedRightMouseButton = !1, r(!1), i)) {
			let t = c_(o.transform);
			e.prevViewport = t, clearTimeout(e.timerId), e.timerId = setTimeout(() => {
				i?.(o.sourceEvent, t);
			}, n ? 150 : 0);
		}
	};
}
function b_({ panActivationKeyPressed: e, zoomActivationKeyPressed: t, zoomOnScroll: n, zoomOnPinch: r, panOnDrag: i, panOnScroll: a, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: c, noPanClassName: l, lib: u, connectionInProgress: d }) {
	return (f) => {
		let p = t || n, m = r && f.ctrlKey, h = f.type === "wheel";
		if (f.button === 1 && f.type === "mousedown" && (u_(f, `${u}-flow__node`) || u_(f, `${u}-flow__edge`) || u_(f, `${u}-flow__selection`) || u_(f, `${u}-flow__nodesselection`))) return !0;
		if (!i && !p && !a && !o && !r || s || d && !h || u_(f, c) && h || u_(f, l) && (!h || a && h && !t) || !r && f.ctrlKey && h) return !1;
		if (!r && f.type === "touchstart" && f.touches?.length > 1) return f.preventDefault(), !1;
		if (!p && !a && !m && h || !i && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(i) && !i.includes(f.button) && f.type === "mousedown") return !1;
		let g = Array.isArray(i) && i.includes(f.button) || !f.button || f.button <= 1;
		return (!f.ctrlKey || h || e) && g;
	};
}
function x_({ domNode: e, minZoom: t, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: a, onPanZoomStart: o, onPanZoomEnd: s, onDraggingChange: c }) {
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
	let f = Km().extent(() => d).scaleExtent([t, n]).translateExtent(r), p = md(e).call(f);
	y({
		x: i.x,
		y: i.y,
		zoom: _h(i.zoom, t, n)
	}, [[0, 0], [u.width, u.height]], r);
	let m = p.on("wheel.zoom"), h = p.on("dblclick.zoom");
	f.wheelDelta(m_);
	async function g(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Nf : qf).transform(p_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function _({ noWheelClassName: e, noPanClassName: t, onPaneContextMenu: n, userSelectionActive: r, panOnScroll: i, panOnDrag: u, panOnScrollMode: d, panOnScrollSpeed: g, preventScrolling: _, zoomOnPinch: y, zoomOnScroll: b, zoomOnDoubleClick: x, panActivationKeyPressed: S = !1, zoomActivationKeyPressed: C, lib: w, onTransformChange: T, connectionInProgress: E, paneClickDistance: D, selectionOnDrag: O }) {
		r && !l.isZoomingOrPanning && v();
		let k = i && !C && !r;
		f.clickDistance(O ? Infinity : !jh(D) || D < 0 ? 0 : D);
		let A = k ? h_({
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
		}) : g_({
			noWheelClassName: e,
			preventScrolling: _,
			d3ZoomHandler: m
		});
		p.on("wheel.zoom", A, { passive: !1 });
		let j = __({
			zoomPanValues: l,
			onDraggingChange: c,
			onPanZoomStart: o
		});
		f.on("start", j);
		let ee = v_({
			zoomPanValues: l,
			panOnDrag: u,
			onPaneContextMenu: !!n,
			onPanZoom: a,
			onTransformChange: T
		});
		f.on("zoom", ee);
		let te = y_({
			zoomPanValues: l,
			panOnDrag: u,
			panOnScroll: i,
			onPaneContextMenu: n,
			onPanZoomEnd: s,
			onDraggingChange: c
		});
		f.on("end", te);
		let M = b_({
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
		f.filter(M), x ? p.on("dblclick.zoom", h) : p.on("dblclick.zoom", null);
	}
	function v() {
		f.on("zoom", null);
	}
	async function y(e, t, n) {
		let r = l_(e), i = f?.constrain()(r, t, n);
		return i && await g(i), i;
	}
	async function b(e, t) {
		let n = l_(e);
		return await g(n, t), n;
	}
	function x(e) {
		if (p) {
			let t = l_(e), n = p.property("__zoom");
			(n.k !== e.zoom || n.x !== e.x || n.y !== e.y) && f?.transform(p, t, null, { sync: !0 });
		}
	}
	function S() {
		let e = p ? Lm(p.node()) : {
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
			f?.interpolate(t?.interpolate === "linear" ? Nf : qf).scaleTo(p_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	async function w(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Nf : qf).scaleBy(p_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function T(e) {
		f?.scaleExtent(e);
	}
	function E(e) {
		f?.translateExtent(e);
	}
	function D(e) {
		let t = !jh(e) || e < 0 ? 0 : e;
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
var S_;
(function(e) {
	e.Line = "line", e.Handle = "handle";
})(S_ ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/edges.js
var C_ = Mh("Svelte Flow", "https://svelteflow.dev/");
function w_(e, t, n = {}) {
	return fg(e, t, {
		...n,
		onError: n.onError ?? C_
	});
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/context.js
function T_() {
	let e = {};
	return [(t) => {
		if (t && !yt(e)) throw Error(t);
		return _t(e);
	}, (t) => vt(e, t)];
}
var [E_, D_] = T_(), [O_, k_] = T_(), [A_, j_] = T_(), M_ = /* @__PURE__ */ new Set([
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
]), N_ = /* @__PURE__ */ G("<div><!></div>");
function P_(e, t) {
	bt(t, !0);
	let n = Q(t, "id", 3, null), r = Q(t, "type", 3, "source"), i = Q(t, "position", 19, () => rh.Top), a = Q(t, "isConnectableStart", 3, !0), o = Q(t, "isConnectableEnd", 3, !0), s = /* @__PURE__ */ xo(t, M_), c = E_("Handle must be used within a Custom Node component"), l = O_("Handle must be used within a Custom Node component"), d = /* @__PURE__ */ P(() => r() === "target"), f = /* @__PURE__ */ P(() => t.isConnectable === void 0 ? l.value : t.isConnectable), p = vv(), m = /* @__PURE__ */ P(() => p.ariaLabelConfig), h = null;
	Ir(() => {
		if (t.onconnect || t.ondisconnect) {
			p.edges;
			let e = p.connectionLookup.get(`${c}-${r()}${n() ? `-${n()}` : ""}`);
			if (h && !Kh(e, h)) {
				let n = e ?? /* @__PURE__ */ new Map();
				qh(h, n, t.ondisconnect), qh(n, h, t.onconnect);
			}
			h = new Map(e);
		}
	});
	let g = /* @__PURE__ */ P(() => {
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
			p.connectionMode === Zm.Strict ? e?.type !== r() : c !== e?.nodeId || n() !== e?.id,
			o && i
		];
	}), _ = /* @__PURE__ */ P(() => u(H(g), 5)), v = /* @__PURE__ */ P(() => H(_)[0]), y = /* @__PURE__ */ P(() => H(_)[1]), b = /* @__PURE__ */ P(() => H(_)[2]), x = /* @__PURE__ */ P(() => H(_)[3]), S = /* @__PURE__ */ P(() => H(_)[4]);
	function w(e) {
		let t = p.onbeforeconnect ? p.onbeforeconnect(e) : e;
		t && (p.addEdge(t), p.onconnect?.(e));
	}
	function T(e) {
		let r = eg(e);
		e.currentTarget && (r && e.button === 0 || !r) && o_.onPointerDown(e, {
			handleId: n(),
			nodeId: c,
			isTarget: H(d),
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
		let i = Zh(e.target), o = t.isValidConnection ?? p.isValidConnection, { connectionMode: s, clickConnectStartHandle: l, flowId: u, nodeLookup: d } = p, { connection: f, isValid: m } = o_.isValid(e, {
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
	var D = N_(), O = () => {};
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
		"aria-label": H(m)["handle.ariaLabel"],
		tabindex: "-1",
		...s,
		[Wa]: {
			valid: H(S),
			connectingto: H(b),
			connectingfrom: H(y),
			source: !H(d),
			target: H(d),
			connectablestart: a(),
			connectableend: o(),
			connectable: H(f),
			connectionindicator: H(f) && (!H(v) || H(x)) && (H(v) || p.clickConnectStartHandle ? o() : a())
		}
	})), Ea(L(D), () => t.children ?? C), N(D), K(e, D), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/DefaultNode.svelte
var F_ = /* @__PURE__ */ G("<!> <!>", 1);
function I_(e, t) {
	bt(t, !0);
	let n = Q(t, "targetPosition", 19, () => rh.Top), r = Q(t, "sourcePosition", 19, () => rh.Bottom);
	var i = F_(), a = R(i);
	P_(a, {
		type: "target",
		get position() {
			return n();
		}
	});
	var o = z(a);
	P_(z(o), {
		type: "source",
		get position() {
			return r();
		}
	}), V(() => q(o, ` ${t.data?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/InputNode.svelte
var L_ = /* @__PURE__ */ G(" <!>", 1);
function R_(e, t) {
	bt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "sourcePosition", 19, () => rh.Bottom);
	Ke();
	var i = L_(), a = R(i);
	P_(z(a), {
		type: "source",
		get position() {
			return r();
		}
	}), V(() => q(a, `${n()?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/OutputNode.svelte
var z_ = /* @__PURE__ */ G(" <!>", 1);
function B_(e, t) {
	bt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "targetPosition", 19, () => rh.Top);
	Ke();
	var i = z_(), a = R(i);
	P_(z(a), {
		type: "target",
		get position() {
			return r();
		}
	}), V(() => q(a, `${n()?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/GroupNode.svelte
function V_(e, t) {}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/portal.svelte.js
function H_(e, t, n) {
	if (!n || !t) return;
	let r = n === "root" ? t : t.querySelector(`.svelte-flow__${n}`);
	r && r.appendChild(e);
}
function U_(e, t) {
	let n = /* @__PURE__ */ P(vv), r = /* @__PURE__ */ P(() => H(n).domNode), i;
	return H(r) ? H_(e, H(r), t) : i = Lr(() => {
		Pr(() => {
			H_(e, H(r), t), i?.();
		});
	}), {
		async update(t) {
			H_(e, H(r), t);
		},
		destroy() {
			e.parentNode && e.parentNode.removeChild(e), i?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/utils.svelte.js
function W_() {
	let e = /* @__PURE__ */ tr(typeof window > "u");
	if (H(e)) {
		let t = Lr(() => {
			Pr(() => {
				I(e, !1), t?.();
			});
		});
	}
	return { get value() {
		return H(e);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/index.js
var G_ = (e) => oh(e), K_ = (e) => ah(e);
function q_(e) {
	return e === void 0 ? void 0 : `${e}px`;
}
var J_ = {
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
}, Y_ = /* @__PURE__ */ new Set([
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
]), X_ = /* @__PURE__ */ G("<div><!></div>");
function Z_(e, t) {
	bt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "selectEdgeOnClick", 3, !1), a = Q(t, "transparent", 3, !1), o = /* @__PURE__ */ xo(t, Y_), s = vv(), c = A_("EdgeLabel must be used within a Custom Edge component"), l = /* @__PURE__ */ P(() => s.visible.edges.get(c)?.zIndex);
	var u = X_(), d = () => {
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
		[Ga]: e
	}), [() => ({
		display: W_().value ? "none" : void 0,
		cursor: i() ? "pointer" : void 0,
		transform: `translate(-50%, -50%) translate(${n() ?? ""}px,${r() ?? ""}px)`,
		"pointer-events": "all",
		width: q_(t.width),
		height: q_(t.height),
		"z-index": H(l)
	})], void 0, void 0, "svelte-1wg91mu"), Ea(L(u), () => t.children ?? C), N(u), Oa(u, (e, t) => U_?.(e, t), () => "edge-labels"), K(e, u), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BaseEdge.svelte
var Q_ = /* @__PURE__ */ new Set([
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
]), $_ = /* @__PURE__ */ oa("<path></path>"), ev = /* @__PURE__ */ oa("<path fill=\"none\"></path><!><!>", 1);
function tv(e, t) {
	let n = Q(t, "interactionWidth", 3, 20), r = /* @__PURE__ */ xo(t, Q_);
	var i = ev(), a = R(i), o = z(a), s = (e) => {
		var i = $_();
		ro(i, () => ({
			d: t.path,
			"stroke-opacity": 0,
			"stroke-width": n(),
			fill: "none",
			class: "svelte-flow__edge-interaction",
			...r
		})), K(e, i);
	};
	J(o, (e) => {
		n() > 0 && e(s);
	});
	var c = z(o), l = (e) => {
		Z_(e, {
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
				var r = sa();
				V(() => q(r, t.label)), K(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	J(c, (e) => {
		t.label && e(l);
	}), V(() => {
		Z(a, "id", t.id), Z(a, "d", t.path), X(a, 0, Ma(["svelte-flow__edge-path", t.class])), Z(a, "marker-start", t.markerStart), Z(a, "marker-end", t.markerEnd), za(a, t.style);
	}), K(e, i);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BezierEdge.svelte
function nv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => og({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		curvature: t.pathOptions?.curvature
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	tv(e, {
		get id() {
			return t.id;
		},
		get path() {
			return H(i);
		},
		get labelX() {
			return H(a);
		},
		get labelY() {
			return H(o);
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
function rv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => yg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	tv(e, {
		get path() {
			return H(i);
		},
		get labelX() {
			return H(a);
		},
		get labelY() {
			return H(o);
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
function iv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => pg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	tv(e, {
		get path() {
			return H(i);
		},
		get labelX() {
			return H(a);
		},
		get labelY() {
			return H(o);
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
function av(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => yg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		borderRadius: 0
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	tv(e, {
		get path() {
			return H(i);
		},
		get labelX() {
			return H(a);
		},
		get labelY() {
			return H(o);
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
var ov = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = un(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, sv = /\(.+\)/, cv = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), lv = class extends ov {
	constructor(e, t) {
		let n = sv.test(e) || e.split(/[\s,]+/).some((e) => cv.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => Yi(r, "change", e));
	}
};
//#endregion
//#region node_modules/svelte/src/reactivity/index-client.js
dn();
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/visibleElements.js
function uv(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return dh(e, {
		x: 0,
		y: 0,
		width: n,
		height: r
	}, t, !0).forEach((e) => {
		i.set(e.id, e);
	}), i;
}
function dv(e) {
	let { edges: t, defaultEdgeOptions: n, nodeLookup: r, previousEdges: i, connectionMode: a, onerror: o, onlyRenderVisible: s, elevateEdgesOnSelect: c, zIndexMode: l } = e, u = /* @__PURE__ */ new Map();
	for (let d of t) {
		let t = r.get(d.source), f = r.get(d.target);
		if (!t || !f) continue;
		if (s) {
			let { visibleNodes: n, transform: r, width: i, height: a } = e;
			if (lg({
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
		let m = xg({
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
			zIndex: cg({
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
var fv = Mh("Svelte Flow", "https://svelteflow.dev/"), pv = {
	input: R_,
	output: B_,
	default: I_,
	group: V_
}, mv = {
	straight: iv,
	smoothstep: rv,
	default: nv,
	step: av
};
function hv(e, t, n, r, i, a) {
	return t && !n && r && i ? zh(uh(a, { filter: (e) => !!((e.width || e.initialWidth) && (e.height || e.initialHeight)) }), r, i, .5, 2, .1) : n ?? {
		x: 0,
		y: 0,
		zoom: 1
	};
}
function gv(e) {
	class t {
		#e = /* @__PURE__ */ P(() => e.props.id ?? "1");
		get flowId() {
			return H(this.#e);
		}
		set flowId(e) {
			I(this.#e, e);
		}
		#t = /* @__PURE__ */ tr(null);
		get domNode() {
			return H(this.#t);
		}
		set domNode(e) {
			I(this.#t, e);
		}
		#n = /* @__PURE__ */ tr(null);
		get panZoom() {
			return H(this.#n);
		}
		set panZoom(e) {
			I(this.#n, e);
		}
		#r = /* @__PURE__ */ tr(e.width ?? 0);
		get width() {
			return H(this.#r);
		}
		set width(e) {
			I(this.#r, e);
		}
		#i = /* @__PURE__ */ tr(e.height ?? 0);
		get height() {
			return H(this.#i);
		}
		set height(e) {
			I(this.#i, e);
		}
		#a = /* @__PURE__ */ tr(e.props.zIndexMode ?? "basic");
		get zIndexMode() {
			return H(this.#a);
		}
		set zIndexMode(e) {
			I(this.#a, e);
		}
		#o = /* @__PURE__ */ P(() => {
			let { nodesInitialized: t } = Fg(e.nodes, this.nodeLookup, this.parentLookup, {
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
			return H(this.#o);
		}
		set nodesInitialized(e) {
			I(this.#o, e);
		}
		#s = /* @__PURE__ */ P(() => this.panZoom !== null);
		get viewportInitialized() {
			return H(this.#s);
		}
		set viewportInitialized(e) {
			I(this.#s, e);
		}
		#c = /* @__PURE__ */ P(() => (Wg(this.connectionLookup, this.edgeLookup, e.edges), e.edges));
		get _edges() {
			return H(this.#c);
		}
		set _edges(e) {
			I(this.#c, e);
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
		#l = /* @__PURE__ */ P(() => {
			let e = this._prevSelectedNodeIds.size, t = /* @__PURE__ */ new Set(), n = this.nodes.filter((e) => (e.selected && (t.add(e.id), this._prevSelectedNodeIds.delete(e.id)), e.selected));
			return (e !== t.size || this._prevSelectedNodeIds.size > 0) && (this._prevSelectedNodes = n), this._prevSelectedNodeIds = t, this._prevSelectedNodes;
		});
		get selectedNodes() {
			return H(this.#l);
		}
		set selectedNodes(e) {
			I(this.#l, e);
		}
		_prevSelectedEdges = [];
		_prevSelectedEdgeIds = /* @__PURE__ */ new Set();
		#u = /* @__PURE__ */ P(() => {
			let e = this._prevSelectedEdgeIds.size, t = /* @__PURE__ */ new Set(), n = this.edges.filter((e) => (e.selected && (t.add(e.id), this._prevSelectedEdgeIds.delete(e.id)), e.selected));
			return (e !== t.size || this._prevSelectedEdgeIds.size > 0) && (this._prevSelectedEdges = n), this._prevSelectedEdgeIds = t, this._prevSelectedEdges;
		});
		get selectedEdges() {
			return H(this.#u);
		}
		set selectedEdges(e) {
			I(this.#u, e);
		}
		selectionChangeHandlers = /* @__PURE__ */ new Map();
		nodeLookup = /* @__PURE__ */ new Map();
		parentLookup = /* @__PURE__ */ new Map();
		connectionLookup = /* @__PURE__ */ new Map();
		edgeLookup = /* @__PURE__ */ new Map();
		_prevVisibleEdges = /* @__PURE__ */ new Map();
		#d = /* @__PURE__ */ P(() => {
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
				u = uv(i, r, t, n), d = dv({
					...f,
					onlyRenderVisible: !0,
					visibleNodes: u,
					transform: r,
					width: t,
					height: n
				});
			} else u = this.nodeLookup, d = dv(f);
			return this._prevVisibleEdges = d, {
				nodes: u,
				edges: d
			};
		});
		get visible() {
			return H(this.#d);
		}
		set visible(e) {
			I(this.#d, e);
		}
		#f = /* @__PURE__ */ P(() => e.props.nodesDraggable ?? !0);
		get nodesDraggable() {
			return H(this.#f);
		}
		set nodesDraggable(e) {
			I(this.#f, e);
		}
		#p = /* @__PURE__ */ P(() => e.props.nodesConnectable ?? !0);
		get nodesConnectable() {
			return H(this.#p);
		}
		set nodesConnectable(e) {
			I(this.#p, e);
		}
		#m = /* @__PURE__ */ P(() => e.props.elementsSelectable ?? !0);
		get elementsSelectable() {
			return H(this.#m);
		}
		set elementsSelectable(e) {
			I(this.#m, e);
		}
		#h = /* @__PURE__ */ P(() => e.props.nodesFocusable ?? !0);
		get nodesFocusable() {
			return H(this.#h);
		}
		set nodesFocusable(e) {
			I(this.#h, e);
		}
		#g = /* @__PURE__ */ P(() => e.props.edgesFocusable ?? !0);
		get edgesFocusable() {
			return H(this.#g);
		}
		set edgesFocusable(e) {
			I(this.#g, e);
		}
		#_ = /* @__PURE__ */ P(() => e.props.disableKeyboardA11y ?? !1);
		get disableKeyboardA11y() {
			return H(this.#_);
		}
		set disableKeyboardA11y(e) {
			I(this.#_, e);
		}
		#v = /* @__PURE__ */ P(() => e.props.minZoom ?? .5);
		get minZoom() {
			return H(this.#v);
		}
		set minZoom(e) {
			I(this.#v, e);
		}
		#y = /* @__PURE__ */ P(() => e.props.maxZoom ?? 2);
		get maxZoom() {
			return H(this.#y);
		}
		set maxZoom(e) {
			I(this.#y, e);
		}
		#b = /* @__PURE__ */ P(() => e.props.nodeOrigin ?? [0, 0]);
		get nodeOrigin() {
			return H(this.#b);
		}
		set nodeOrigin(e) {
			I(this.#b, e);
		}
		#x = /* @__PURE__ */ P(() => e.props.nodeExtent ?? Jm);
		get nodeExtent() {
			return H(this.#x);
		}
		set nodeExtent(e) {
			I(this.#x, e);
		}
		#S = /* @__PURE__ */ P(() => e.props.translateExtent ?? Jm);
		get translateExtent() {
			return H(this.#S);
		}
		set translateExtent(e) {
			I(this.#S, e);
		}
		#C = /* @__PURE__ */ P(() => e.props.defaultEdgeOptions ?? {});
		get defaultEdgeOptions() {
			return H(this.#C);
		}
		set defaultEdgeOptions(e) {
			I(this.#C, e);
		}
		#w = /* @__PURE__ */ P(() => e.props.nodeDragThreshold ?? 1);
		get nodeDragThreshold() {
			return H(this.#w);
		}
		set nodeDragThreshold(e) {
			I(this.#w, e);
		}
		#T = /* @__PURE__ */ P(() => e.props.autoPanOnNodeDrag ?? !0);
		get autoPanOnNodeDrag() {
			return H(this.#T);
		}
		set autoPanOnNodeDrag(e) {
			I(this.#T, e);
		}
		#E = /* @__PURE__ */ P(() => e.props.autoPanOnConnect ?? !0);
		get autoPanOnConnect() {
			return H(this.#E);
		}
		set autoPanOnConnect(e) {
			I(this.#E, e);
		}
		#D = /* @__PURE__ */ P(() => e.props.autoPanOnNodeFocus ?? !0);
		get autoPanOnNodeFocus() {
			return H(this.#D);
		}
		set autoPanOnNodeFocus(e) {
			I(this.#D, e);
		}
		#O = /* @__PURE__ */ P(() => e.props.autoPanSpeed ?? 15);
		get autoPanSpeed() {
			return H(this.#O);
		}
		set autoPanSpeed(e) {
			I(this.#O, e);
		}
		#k = /* @__PURE__ */ P(() => e.props.connectionDragThreshold ?? 1);
		get connectionDragThreshold() {
			return H(this.#k);
		}
		set connectionDragThreshold(e) {
			I(this.#k, e);
		}
		fitViewQueued = e.props.fitView ?? !1;
		fitViewOptions = e.props.fitViewOptions;
		fitViewResolver = null;
		#A = /* @__PURE__ */ P(() => e.props.snapGrid ?? null);
		get snapGrid() {
			return H(this.#A);
		}
		set snapGrid(e) {
			I(this.#A, e);
		}
		#j = /* @__PURE__ */ tr(!1);
		get dragging() {
			return H(this.#j);
		}
		set dragging(e) {
			I(this.#j, e);
		}
		#M = /* @__PURE__ */ tr(null);
		get selectionRect() {
			return H(this.#M);
		}
		set selectionRect(e) {
			I(this.#M, e);
		}
		#N = /* @__PURE__ */ tr(!1);
		get selectionKeyPressed() {
			return H(this.#N);
		}
		set selectionKeyPressed(e) {
			I(this.#N, e);
		}
		#P = /* @__PURE__ */ tr(!1);
		get multiselectionKeyPressed() {
			return H(this.#P);
		}
		set multiselectionKeyPressed(e) {
			I(this.#P, e);
		}
		#F = /* @__PURE__ */ tr(!1);
		get deleteKeyPressed() {
			return H(this.#F);
		}
		set deleteKeyPressed(e) {
			I(this.#F, e);
		}
		#I = /* @__PURE__ */ tr(!1);
		get panActivationKeyPressed() {
			return H(this.#I);
		}
		set panActivationKeyPressed(e) {
			I(this.#I, e);
		}
		#L = /* @__PURE__ */ tr(!1);
		get zoomActivationKeyPressed() {
			return H(this.#L);
		}
		set zoomActivationKeyPressed(e) {
			I(this.#L, e);
		}
		#R = /* @__PURE__ */ tr(null);
		get selectionRectMode() {
			return H(this.#R);
		}
		set selectionRectMode(e) {
			I(this.#R, e);
		}
		#z = /* @__PURE__ */ tr("");
		get ariaLiveMessage() {
			return H(this.#z);
		}
		set ariaLiveMessage(e) {
			I(this.#z, e);
		}
		#B = /* @__PURE__ */ P(() => e.props.selectionMode ?? $m.Partial);
		get selectionMode() {
			return H(this.#B);
		}
		set selectionMode(e) {
			I(this.#B, e);
		}
		#V = /* @__PURE__ */ P(() => ({
			...pv,
			...e.props.nodeTypes
		}));
		get nodeTypes() {
			return H(this.#V);
		}
		set nodeTypes(e) {
			I(this.#V, e);
		}
		#H = /* @__PURE__ */ P(() => ({
			...mv,
			...e.props.edgeTypes
		}));
		get edgeTypes() {
			return H(this.#H);
		}
		set edgeTypes(e) {
			I(this.#H, e);
		}
		#U = /* @__PURE__ */ P(() => e.props.noPanClass ?? "nopan");
		get noPanClass() {
			return H(this.#U);
		}
		set noPanClass(e) {
			I(this.#U, e);
		}
		#W = /* @__PURE__ */ P(() => e.props.noDragClass ?? "nodrag");
		get noDragClass() {
			return H(this.#W);
		}
		set noDragClass(e) {
			I(this.#W, e);
		}
		#G = /* @__PURE__ */ P(() => e.props.noWheelClass ?? "nowheel");
		get noWheelClass() {
			return H(this.#G);
		}
		set noWheelClass(e) {
			I(this.#G, e);
		}
		#K = /* @__PURE__ */ P(() => Gh(e.props.ariaLabelConfig));
		get ariaLabelConfig() {
			return H(this.#K);
		}
		set ariaLabelConfig(e) {
			I(this.#K, e);
		}
		#q = /* @__PURE__ */ tr(hv(this.nodesInitialized, e.props.fitView, e.props.initialViewport, this.width, this.height, this.nodeLookup));
		get _viewport() {
			return H(this.#q);
		}
		set _viewport(e) {
			I(this.#q, e);
		}
		get viewport() {
			return e.viewport ?? this._viewport;
		}
		set viewport(t) {
			e.viewport &&= t, this._viewport = t;
		}
		#J = /* @__PURE__ */ tr(eh);
		get _connection() {
			return H(this.#J);
		}
		set _connection(e) {
			I(this.#J, e);
		}
		#Y = /* @__PURE__ */ P(() => this._connection.inProgress ? {
			...this._connection,
			to: Ph(this._connection.to, [
				this.viewport.x,
				this.viewport.y,
				this.viewport.zoom
			])
		} : this._connection);
		get connection() {
			return H(this.#Y);
		}
		set connection(e) {
			I(this.#Y, e);
		}
		#X = /* @__PURE__ */ P(() => e.props.connectionMode ?? Zm.Strict);
		get connectionMode() {
			return H(this.#X);
		}
		set connectionMode(e) {
			I(this.#X, e);
		}
		#Z = /* @__PURE__ */ P(() => e.props.connectionRadius ?? 20);
		get connectionRadius() {
			return H(this.#Z);
		}
		set connectionRadius(e) {
			I(this.#Z, e);
		}
		#Q = /* @__PURE__ */ P(() => e.props.isValidConnection ?? (() => !0));
		get isValidConnection() {
			return H(this.#Q);
		}
		set isValidConnection(e) {
			I(this.#Q, e);
		}
		#$ = /* @__PURE__ */ P(() => e.props.selectNodesOnDrag ?? !0);
		get selectNodesOnDrag() {
			return H(this.#$);
		}
		set selectNodesOnDrag(e) {
			I(this.#$, e);
		}
		#ee = /* @__PURE__ */ P(() => e.props.defaultMarkerColor === void 0 ? "#b1b1b7" : e.props.defaultMarkerColor);
		get defaultMarkerColor() {
			return H(this.#ee);
		}
		set defaultMarkerColor(e) {
			I(this.#ee, e);
		}
		#te = /* @__PURE__ */ P(() => Eg(e.edges, {
			defaultColor: this.defaultMarkerColor,
			id: this.flowId,
			defaultMarkerStart: this.defaultEdgeOptions.markerStart,
			defaultMarkerEnd: this.defaultEdgeOptions.markerEnd
		}));
		get markers() {
			return H(this.#te);
		}
		set markers(e) {
			I(this.#te, e);
		}
		#ne = /* @__PURE__ */ P(() => e.props.onlyRenderVisibleElements ?? !1);
		get onlyRenderVisibleElements() {
			return H(this.#ne);
		}
		set onlyRenderVisibleElements(e) {
			I(this.#ne, e);
		}
		#re = /* @__PURE__ */ P(() => e.props.onflowerror ?? fv);
		get onerror() {
			return H(this.#re);
		}
		set onerror(e) {
			I(this.#re, e);
		}
		#ie = /* @__PURE__ */ P(() => e.props.ondelete);
		get ondelete() {
			return H(this.#ie);
		}
		set ondelete(e) {
			I(this.#ie, e);
		}
		#ae = /* @__PURE__ */ P(() => e.props.onbeforedelete);
		get onbeforedelete() {
			return H(this.#ae);
		}
		set onbeforedelete(e) {
			I(this.#ae, e);
		}
		#oe = /* @__PURE__ */ P(() => e.props.onbeforeconnect);
		get onbeforeconnect() {
			return H(this.#oe);
		}
		set onbeforeconnect(e) {
			I(this.#oe, e);
		}
		#se = /* @__PURE__ */ P(() => e.props.onconnect);
		get onconnect() {
			return H(this.#se);
		}
		set onconnect(e) {
			I(this.#se, e);
		}
		#ce = /* @__PURE__ */ P(() => e.props.onconnectstart);
		get onconnectstart() {
			return H(this.#ce);
		}
		set onconnectstart(e) {
			I(this.#ce, e);
		}
		#le = /* @__PURE__ */ P(() => e.props.onconnectend);
		get onconnectend() {
			return H(this.#le);
		}
		set onconnectend(e) {
			I(this.#le, e);
		}
		#ue = /* @__PURE__ */ P(() => e.props.onbeforereconnect);
		get onbeforereconnect() {
			return H(this.#ue);
		}
		set onbeforereconnect(e) {
			I(this.#ue, e);
		}
		#de = /* @__PURE__ */ P(() => e.props.onreconnect);
		get onreconnect() {
			return H(this.#de);
		}
		set onreconnect(e) {
			I(this.#de, e);
		}
		#fe = /* @__PURE__ */ P(() => e.props.onreconnectstart);
		get onreconnectstart() {
			return H(this.#fe);
		}
		set onreconnectstart(e) {
			I(this.#fe, e);
		}
		#pe = /* @__PURE__ */ P(() => e.props.onreconnectend);
		get onreconnectend() {
			return H(this.#pe);
		}
		set onreconnectend(e) {
			I(this.#pe, e);
		}
		#me = /* @__PURE__ */ P(() => e.props.clickConnect ?? !0);
		get clickConnect() {
			return H(this.#me);
		}
		set clickConnect(e) {
			I(this.#me, e);
		}
		#he = /* @__PURE__ */ P(() => e.props.onclickconnectstart);
		get onclickconnectstart() {
			return H(this.#he);
		}
		set onclickconnectstart(e) {
			I(this.#he, e);
		}
		#ge = /* @__PURE__ */ P(() => e.props.onclickconnectend);
		get onclickconnectend() {
			return H(this.#ge);
		}
		set onclickconnectend(e) {
			I(this.#ge, e);
		}
		#_e = /* @__PURE__ */ tr(null);
		get clickConnectStartHandle() {
			return H(this.#_e);
		}
		set clickConnectStartHandle(e) {
			I(this.#_e, e);
		}
		#ve = /* @__PURE__ */ P(() => e.props.onselectiondrag);
		get onselectiondrag() {
			return H(this.#ve);
		}
		set onselectiondrag(e) {
			I(this.#ve, e);
		}
		#ye = /* @__PURE__ */ P(() => e.props.onselectiondragstart);
		get onselectiondragstart() {
			return H(this.#ye);
		}
		set onselectiondragstart(e) {
			I(this.#ye, e);
		}
		#be = /* @__PURE__ */ P(() => e.props.onselectiondragstop);
		get onselectiondragstop() {
			return H(this.#be);
		}
		set onselectiondragstop(e) {
			I(this.#be, e);
		}
		resolveFitView = async () => {
			this.panZoom && (await mh({
				nodes: this.nodeLookup,
				width: this.width,
				height: this.height,
				panZoom: this.panZoom,
				minZoom: this.minZoom,
				maxZoom: this.maxZoom
			}, this.fitViewOptions), this.fitViewResolver?.resolve(!0), this.fitViewQueued = !1, this.fitViewOptions = void 0, this.fitViewResolver = null);
		};
		_prefersDark = new lv("(prefers-color-scheme: dark)", e.props.colorModeSSR === "dark");
		#xe = /* @__PURE__ */ P(() => e.props.colorMode === "system" ? this._prefersDark.current ? "dark" : "light" : e.props.colorMode ?? "light");
		get colorMode() {
			return H(this.#xe);
		}
		set colorMode(e) {
			I(this.#xe, e);
		}
		constructor() {}
		resetStoreValues() {
			this.dragging = !1, this.selectionRect = null, this.selectionRectMode = null, this.selectionKeyPressed = !1, this.multiselectionKeyPressed = !1, this.deleteKeyPressed = !1, this.panActivationKeyPressed = !1, this.zoomActivationKeyPressed = !1, this._connection = eh, this.clickConnectStartHandle = null, this.viewport = e.props.initialViewport ?? {
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
var _v = qm.error001("svelte");
function vv() {
	let e = _t(yv);
	if (!e) throw Error(_v);
	return e.getStore();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/index.js
var yv = Symbol();
function bv(e) {
	let t = gv(e);
	function n(e) {
		t.nodeTypes = {
			...pv,
			...e
		};
	}
	function r(e) {
		t.edgeTypes = {
			...mv,
			...e
		};
	}
	function i(e) {
		t.edges = w_(e, t.edges, { onError: t.onerror });
	}
	let a = (e, n = !1) => {
		t.nodes = t.nodes.map((r) => {
			if (t.connection.inProgress && t.connection.fromNode.id === r.id) {
				let e = t.nodeLookup.get(r.id);
				e && (t.connection = {
					...t.connection,
					from: Cg(e, t.connection.fromHandle, rh.Left, !0)
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
		let { changes: n, updatedInternals: r } = Vg(e, t.nodeLookup, t.parentLookup, t.domNode, t.nodeOrigin, t.nodeExtent, t.zIndexMode);
		if (!r) return;
		Mg(t.nodeLookup, t.parentLookup, {
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
			t.onerror("012", qm.error012(e));
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
			t.onerror("016", qm.error016(e));
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
			i && (t = Nh(t, i));
			let { position: n, positionAbsolute: a } = hh({
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
		return Hg({
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
		t._connection = eh;
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
function xv(e, t) {
	let { minZoom: n, maxZoom: r, initialViewport: i, onPanZoomStart: a, onPanZoom: o, onPanZoomEnd: s, translateExtent: c, setPanZoomInstance: l, onDraggingChange: u, onTransformChange: d } = t, f = x_({
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
var Sv = /* @__PURE__ */ G("<div class=\"svelte-flow__zoom svelte-flow__container\"><!></div>");
function Cv(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ P(() => n().panActivationKeyPressed || t.panOnDrag), i = /* @__PURE__ */ P(() => n().panActivationKeyPressed || t.panOnScroll), { viewport: a } = n(), o = !1;
	Pr(() => {
		!o && n().viewportInitialized && (t.oninit?.(), o = !0);
	});
	var s = Sv();
	Ea(L(s), () => t.children), N(s), Oa(s, (e, t) => xv?.(e, t), () => ({
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
		panOnScroll: H(i),
		panOnDrag: H(r),
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
	})), K(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Pane/Pane.svelte
function wv(e, t) {
	return (n) => {
		n.target === t && e?.(n);
	};
}
function Tv(e) {
	return (t) => {
		let n = e.has(t.id);
		return !!t.selected === n ? t : {
			...t,
			selected: n
		};
	};
}
function Ev(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
var Dv = /* @__PURE__ */ G("<div><!></div>");
function Ov(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = Q(t, "panOnDrag", 3, !0), i = Q(t, "paneClickDistance", 3, 1), a = Q(t, "autoPanOnSelection", 3, !0), o, s = null, c = !1, l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ P(() => n().panActivationKeyPressed || r()), f = /* @__PURE__ */ P(() => n().selectionKeyPressed || !!n().selectionRect || t.selectionOnDrag && H(d) !== !0), p = /* @__PURE__ */ P(() => n().elementsSelectable && (H(f) || n().selectionRectMode === "user")), m = !1, h = 0, g = {
		x: 0,
		y: 0
	}, _ = !1;
	function v(e) {
		if (e.pointerType === "touch" && H(d) !== !1 && !n().selectionKeyPressed || (s = o?.getBoundingClientRect(), !s)) return;
		let r = e.target === o, i = !r && !!e.target.closest(".nokey"), a = t.selectionOnDrag && r || n().selectionKeyPressed;
		if (i || !H(f) || !a || e.button !== 0 || !e.isPrimary) return;
		e.target?.setPointerCapture?.(e.pointerId), m = !1, _ = !1;
		let { x: c, y: l } = tg(e, s), u = Ph({
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
		}, i = Fh(r, [
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
		l = new Set(dh(n().nodeLookup, a, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		], n().selectionMode === $m.Partial, !0).map((e) => e.id));
		let c = n().defaultEdgeOptions.selectable ?? !0;
		u = /* @__PURE__ */ new Set();
		for (let e of l) {
			let t = n().connectionLookup.get(e);
			if (t) for (let { edgeId: e } of t.values()) {
				let t = n().edgeLookup.get(e);
				t && (t.selectable ?? c) && u.add(e);
			}
		}
		Ev(o, l) || n(n().nodes = n().nodes.map(Tv(l)), !0), Ev(s, u) || n(n().edges = n().edges.map(Tv(u)), !0), n(n().selectionRectMode = "user", !0), n(n().selectionRect = a, !0);
	}
	function b() {
		if (!a() || !s) return;
		let [e, t] = xh(g, s, n().autoPanSpeed);
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
		if (!H(f) || !s || !n().selectionRect) return;
		let r = tg(e, s);
		g = {
			x: r.x,
			y: r.y
		};
		let a = Fh({
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
		if (!H(p)) {
			e.target === o && n().connection.inProgress && (c = !0);
			return;
		}
		e.button === 0 && (e.target?.releasePointerCapture?.(e.pointerId), !m && e.target === o && D?.(e), n(n().selectionRect = null, !0), m && n(n().selectionRectMode = l.size > 0 ? "nodes" : null, !0), m && t.onselectionend?.(e), x());
	}
	function w(e) {
		e.target?.releasePointerCapture?.(e.pointerId), x();
	}
	let T = (e) => {
		if (Array.isArray(H(d)) && H(d).includes(2)) {
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
	var O = Dv();
	let k;
	var A = /* @__PURE__ */ P(() => H(p) ? void 0 : wv(D, o)), j = /* @__PURE__ */ P(() => wv(T, o));
	Ea(L(O), () => t.children), N(O), ho(O, (e) => o = e, () => o), V((e) => k = X(O, 1, "svelte-flow__pane svelte-flow__container", null, k, e), [() => ({
		draggable: r() === !0 || Array.isArray(r()) && r().includes(0),
		dragging: n().dragging,
		selection: H(f)
	})]), W("click", O, function(...e) {
		H(A)?.apply(this, e);
	}), Xi("pointerdown", O, function(...e) {
		(H(p) ? v : void 0)?.apply(this, e);
	}, !0), W("pointermove", O, function(...e) {
		(H(p) ? S : void 0)?.apply(this, e);
	}), W("pointerup", O, C), Xi("pointercancel", O, function(...e) {
		(H(p) ? w : void 0)?.apply(this, e);
	}), W("contextmenu", O, function(...e) {
		H(j)?.apply(this, e);
	}), Xi("click", O, function(...e) {
		(H(p) ? E : void 0)?.apply(this, e);
	}, !0), K(e, O), xt();
}
Zi([
	"click",
	"pointermove",
	"pointerup",
	"contextmenu"
]);
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Viewport/Viewport.svelte
var kv = /* @__PURE__ */ G("<div class=\"svelte-flow__viewport xyflow__viewport svelte-flow__container\"><!></div>");
function Av(e, t) {
	bt(t, !0);
	var n = kv();
	let r;
	Ea(L(n), () => t.children), N(n), V(() => r = za(n, "", r, { transform: `translate(${t.store.viewport.x ?? ""}px, ${t.store.viewport.y ?? ""}px) scale(${t.store.viewport.zoom ?? ""})` })), K(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/drag/index.js
function jv(e, t) {
	let { store: n, onDrag: r, onDragStart: i, onDragStop: a, onNodeMouseDown: o } = t, s = Xg({
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
var Mv = /* @__PURE__ */ G("<div aria-live=\"assertive\" aria-atomic=\"true\" class=\"a11y-live-msg svelte-13pq11u\"> </div>"), Nv = /* @__PURE__ */ G("<div class=\"a11y-hidden svelte-13pq11u\"> </div> <div class=\"a11y-hidden svelte-13pq11u\"> </div> <!>", 1);
function Pv(e, t) {
	bt(t, !0);
	var n = Nv(), r = R(n), i = L(r, !0);
	N(r);
	var a = z(r, 2), o = L(a, !0);
	N(a);
	var s = z(a, 2), c = (e) => {
		var n = Mv(), r = L(n, !0);
		N(n), V(() => {
			Z(n, "id", `${Lv}-${t.store.flowId}`), q(r, t.store.ariaLiveMessage);
		}), K(e, n);
	};
	J(s, (e) => {
		t.store.disableKeyboardA11y || e(c);
	}), V(() => {
		Z(r, "id", `${Fv}-${t.store.flowId}`), q(i, t.store.disableKeyboardA11y ? t.store.ariaLabelConfig["node.a11yDescription.default"] : t.store.ariaLabelConfig["node.a11yDescription.keyboardDisabled"]), Z(a, "id", `${Iv}-${t.store.flowId}`), q(o, t.store.ariaLabelConfig["edge.a11yDescription.default"]);
	}), K(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/A11yDescriptions/index.js
var Fv = "svelte-flow__node-desc", Iv = "svelte-flow__edge-desc", Lv = "svelte-flow__aria-live", Rv = /* @__PURE__ */ G("<div><!></div>");
function zv(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ P(() => l(t.node.data, () => ({}), !0)), i = /* @__PURE__ */ P(() => l(t.node.selected, !1)), a = /* @__PURE__ */ P(() => t.node.draggable), o = /* @__PURE__ */ P(() => t.node.selectable), s = /* @__PURE__ */ P(() => l(t.node.deletable, !0)), c = /* @__PURE__ */ P(() => t.node.connectable), u = /* @__PURE__ */ P(() => t.node.focusable), d = /* @__PURE__ */ P(() => l(t.node.hidden, !1)), f = /* @__PURE__ */ P(() => l(t.node.dragging, !1)), p = /* @__PURE__ */ P(() => l(t.node.style, "")), m = /* @__PURE__ */ P(() => t.node.class), h = /* @__PURE__ */ P(() => l(t.node.type, "default")), g = /* @__PURE__ */ P(() => t.node.parentId), _ = /* @__PURE__ */ P(() => t.node.sourcePosition), v = /* @__PURE__ */ P(() => t.node.targetPosition), y = /* @__PURE__ */ P(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).width), b = /* @__PURE__ */ P(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).height), x = /* @__PURE__ */ P(() => t.node.initialWidth), S = /* @__PURE__ */ P(() => t.node.initialHeight), C = /* @__PURE__ */ P(() => t.node.width), w = /* @__PURE__ */ P(() => t.node.height), T = /* @__PURE__ */ P(() => t.node.dragHandle), E = /* @__PURE__ */ P(() => l(t.node.internals.z, 0)), D = /* @__PURE__ */ P(() => t.node.internals.positionAbsolute.x), O = /* @__PURE__ */ P(() => t.node.internals.positionAbsolute.y), k = /* @__PURE__ */ P(() => t.node.internals.userNode), { id: A } = t.node, j = /* @__PURE__ */ P(() => H(a) ?? n().nodesDraggable), ee = /* @__PURE__ */ P(() => H(o) ?? n().elementsSelectable), te = /* @__PURE__ */ P(() => H(c) ?? n().nodesConnectable), M = /* @__PURE__ */ P(() => Uh(t.node)), ne = /* @__PURE__ */ P(() => !!t.node.internals.handleBounds), re = /* @__PURE__ */ P(() => H(M) && H(ne)), ie = /* @__PURE__ */ P(() => H(u) ?? n().nodesFocusable);
	function ae(e) {
		return n().parentLookup.has(e);
	}
	let oe = /* @__PURE__ */ P(() => ae(A)), se = /* @__PURE__ */ tr(null), ce = null, le = H(h), ue = H(_), de = H(v), fe = /* @__PURE__ */ P(() => n().nodeTypes[H(h)] ?? I_), pe = /* @__PURE__ */ P(() => n().ariaLabelConfig);
	D_(A), k_({ get value() {
		return H(te);
	} });
	let me = /* @__PURE__ */ P(() => {
		let e = H(y) === void 0 ? H(C) ?? H(x) : H(C), t = H(b) === void 0 ? H(w) ?? H(S) : H(w);
		if (e !== void 0 || t !== void 0 || H(p) !== void 0) return `${H(p)};${e ? `width:${q_(e)};` : ""}${t ? `height:${q_(t)};` : ""}`;
	});
	Pr(() => {
		(H(h) !== le || H(_) !== ue || H(v) !== de) && H(se) !== null && requestAnimationFrame(() => {
			H(se) !== null && n().updateNodeInternals(/* @__PURE__ */ new Map([[A, {
				id: A,
				nodeElement: H(se),
				force: !0
			}]]));
		}), le = H(h), ue = H(_), de = H(v);
	}), Pr(() => {
		t.resizeObserver && (!H(re) || H(se) !== ce) && (ce && t.resizeObserver.unobserve(ce), H(se) && t.resizeObserver.observe(H(se)), ce = H(se));
	}), To(() => {
		ce && t.resizeObserver?.unobserve(ce);
	});
	function he(e) {
		H(ee) && (!n().selectNodesOnDrag || !H(j) || n().nodeDragThreshold > 0) && n().handleNodeSelection(A), t.onnodeclick?.({
			node: H(k),
			event: e
		});
	}
	function ge(e) {
		if (!($h(e) || n().disableKeyboardA11y)) {
			if (Ym.includes(e.key) && H(ee)) {
				let t = e.key === "Escape";
				n().handleNodeSelection(A, t, H(se));
			} else H(j) && t.node.selected && Object.prototype.hasOwnProperty.call(J_, e.key) && (e.preventDefault(), n(n().ariaLiveMessage = H(pe)["node.a11yDescription.ariaLiveMessage"]({
				direction: e.key.replace("Arrow", "").toLowerCase(),
				x: ~~t.node.internals.positionAbsolute.x,
				y: ~~t.node.internals.positionAbsolute.y
			}), !0), n().moveSelectedNodes(J_[e.key], e.shiftKey ? 4 : 1));
		}
	}
	let _e = () => {
		if (n().disableKeyboardA11y || !n().autoPanOnNodeFocus || !H(se)?.matches(":focus-visible")) return;
		let { width: e, height: r, viewport: i } = n();
		dh(/* @__PURE__ */ new Map([[A, t.node]]), {
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
	var ve = ca(), ye = R(ve), be = (e) => {
		var a = Rv();
		ro(a, () => ({
			"data-id": A,
			class: [
				"svelte-flow__node",
				`svelte-flow__node-${H(h)}`,
				H(m)
			],
			style: H(me),
			onclick: he,
			onpointerenter: t.onnodepointerenter ? (e) => t.onnodepointerenter({
				node: H(k),
				event: e
			}) : void 0,
			onpointerleave: t.onnodepointerleave ? (e) => t.onnodepointerleave({
				node: H(k),
				event: e
			}) : void 0,
			onpointermove: t.onnodepointermove ? (e) => t.onnodepointermove({
				node: H(k),
				event: e
			}) : void 0,
			oncontextmenu: t.onnodecontextmenu ? (e) => t.onnodecontextmenu({
				node: H(k),
				event: e
			}) : void 0,
			onkeydown: H(ie) ? ge : void 0,
			onfocus: H(ie) ? _e : void 0,
			tabIndex: H(ie) ? 0 : void 0,
			role: t.node.ariaRole ?? (H(ie) ? "group" : void 0),
			"aria-label": t.node.ariaLabel,
			"aria-roledescription": "node",
			"aria-describedby": n().disableKeyboardA11y ? void 0 : `${Fv}-${n().flowId}`,
			...t.node.domAttributes,
			[Wa]: {
				dragging: H(f),
				selected: H(i),
				draggable: H(j),
				connectable: H(te),
				selectable: H(ee),
				nopan: H(j),
				parent: H(oe)
			},
			[Ga]: {
				"z-index": H(E),
				transform: `translate(${H(D) ?? ""}px, ${H(O) ?? ""}px)`,
				visibility: H(M) ? "visible" : "hidden"
			}
		})), Da(L(a), () => H(fe), (e, t) => {
			t(e, {
				get data() {
					return H(r);
				},
				get id() {
					return A;
				},
				get selected() {
					return H(i);
				},
				get selectable() {
					return H(ee);
				},
				get deletable() {
					return H(s);
				},
				get sourcePosition() {
					return H(_);
				},
				get targetPosition() {
					return H(v);
				},
				get zIndex() {
					return H(E);
				},
				get dragging() {
					return H(f);
				},
				get draggable() {
					return H(j);
				},
				get dragHandle() {
					return H(T);
				},
				get parentId() {
					return H(g);
				},
				get type() {
					return H(h);
				},
				get isConnectable() {
					return H(te);
				},
				get positionAbsoluteX() {
					return H(D);
				},
				get positionAbsoluteY() {
					return H(O);
				},
				get width() {
					return H(C);
				},
				get height() {
					return H(w);
				}
			});
		}), N(a), Oa(a, (e, t) => jv?.(e, t), () => ({
			nodeId: A,
			isSelectable: H(ee),
			disabled: !H(j),
			handleSelector: H(T),
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
		})), ho(a, (e) => I(se, e), () => H(se)), K(e, a);
	};
	J(ye, (e) => {
		H(d) || e(be);
	}), K(e, ve), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/NodeRenderer/NodeRenderer.svelte
var Bv = /* @__PURE__ */ G("<div class=\"svelte-flow__nodes\"></div>");
function Vv(e, t) {
	bt(t, !0);
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
	var i = Bv();
	Y(i, 21, () => n().visible.nodes.values(), (e) => e.id, (e, i) => {
		zv(e, {
			get node() {
				return H(i);
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
	}), N(i), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/EdgeWrapper/EdgeWrapper.svelte
var Hv = /* @__PURE__ */ oa("<svg class=\"svelte-flow__edge-wrapper\"><g><!></g></svg>");
function Uv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => t.edge.id), r = /* @__PURE__ */ P(() => t.edge.source), i = /* @__PURE__ */ P(() => t.edge.target), a = /* @__PURE__ */ P(() => t.edge.sourceX), o = /* @__PURE__ */ P(() => t.edge.sourceY), s = /* @__PURE__ */ P(() => t.edge.targetX), c = /* @__PURE__ */ P(() => t.edge.targetY), u = /* @__PURE__ */ P(() => t.edge.sourcePosition), d = /* @__PURE__ */ P(() => t.edge.targetPosition), f = /* @__PURE__ */ P(() => l(t.edge.animated, !1)), p = /* @__PURE__ */ P(() => l(t.edge.selected, !1)), m = /* @__PURE__ */ P(() => t.edge.label), h = /* @__PURE__ */ P(() => t.edge.labelStyle), g = /* @__PURE__ */ P(() => l(t.edge.data, () => ({}), !0)), _ = /* @__PURE__ */ P(() => t.edge.style), v = /* @__PURE__ */ P(() => t.edge.interactionWidth), y = /* @__PURE__ */ P(() => l(t.edge.type, "default")), b = /* @__PURE__ */ P(() => t.edge.sourceHandle), x = /* @__PURE__ */ P(() => t.edge.targetHandle), S = /* @__PURE__ */ P(() => t.edge.markerStart), C = /* @__PURE__ */ P(() => t.edge.markerEnd), w = /* @__PURE__ */ P(() => t.edge.selectable), T = /* @__PURE__ */ P(() => t.edge.focusable), E = /* @__PURE__ */ P(() => l(t.edge.deletable, !0)), D = /* @__PURE__ */ P(() => t.edge.hidden), O = /* @__PURE__ */ P(() => t.edge.zIndex), k = /* @__PURE__ */ P(() => t.edge.class), A = /* @__PURE__ */ P(() => t.edge.ariaLabel);
	j_(H(n));
	let j = null, ee = /* @__PURE__ */ P(() => H(w) ?? t.store.elementsSelectable), te = /* @__PURE__ */ P(() => H(T) ?? t.store.edgesFocusable), M = /* @__PURE__ */ P(() => t.store.edgeTypes[H(y)] ?? nv), ne = /* @__PURE__ */ P(() => H(S) ? `url('#${Tg(H(S), t.store.flowId)}')` : void 0), re = /* @__PURE__ */ P(() => H(C) ? `url('#${Tg(H(C), t.store.flowId)}')` : void 0);
	function ie(e) {
		let r = t.store.edgeLookup.get(H(n));
		r && (H(ee) && t.store.handleEdgeSelection(H(n)), t.onedgeclick?.({
			event: e,
			edge: r
		}));
	}
	function ae(e, r) {
		let i = t.store.edgeLookup.get(H(n));
		i && r({
			event: e,
			edge: i
		});
	}
	function oe(e) {
		if (!t.store.disableKeyboardA11y && Ym.includes(e.key) && H(ee)) {
			let { unselectNodesAndEdges: r, addSelectedEdges: i } = t.store;
			e.key === "Escape" ? (j?.blur(), r({ edges: [t.edge] })) : i([H(n)]);
		}
	}
	var se = ca(), ce = R(se), le = (e) => {
		var l = Hv();
		let S;
		var C = L(l);
		ro(C, () => ({
			class: ["svelte-flow__edge", H(k)],
			"data-id": H(n),
			onclick: ie,
			oncontextmenu: t.onedgecontextmenu ? (e) => {
				ae(e, t.onedgecontextmenu);
			} : void 0,
			onpointerenter: t.onedgepointerenter ? (e) => {
				ae(e, t.onedgepointerenter);
			} : void 0,
			onpointerleave: t.onedgepointerleave ? (e) => {
				ae(e, t.onedgepointerleave);
			} : void 0,
			"aria-label": H(A) === null ? void 0 : H(A) ? H(A) : `Edge from ${H(r)} to ${H(i)}`,
			"aria-describedby": H(te) ? `${Iv}-${t.store.flowId}` : void 0,
			role: t.edge.ariaRole ?? (H(te) ? "group" : "img"),
			"aria-roledescription": "edge",
			onkeydown: H(te) ? oe : void 0,
			tabindex: H(te) ? 0 : void 0,
			...t.edge.domAttributes,
			[Wa]: {
				animated: H(f),
				selected: H(p),
				selectable: H(ee)
			}
		})), Da(L(C), () => H(M), (e, t) => {
			t(e, {
				get id() {
					return H(n);
				},
				get source() {
					return H(r);
				},
				get target() {
					return H(i);
				},
				get sourceX() {
					return H(a);
				},
				get sourceY() {
					return H(o);
				},
				get targetX() {
					return H(s);
				},
				get targetY() {
					return H(c);
				},
				get sourcePosition() {
					return H(u);
				},
				get targetPosition() {
					return H(d);
				},
				get animated() {
					return H(f);
				},
				get selected() {
					return H(p);
				},
				get label() {
					return H(m);
				},
				get labelStyle() {
					return H(h);
				},
				get data() {
					return H(g);
				},
				get style() {
					return H(_);
				},
				get interactionWidth() {
					return H(v);
				},
				get selectable() {
					return H(ee);
				},
				get deletable() {
					return H(E);
				},
				get type() {
					return H(y);
				},
				get sourceHandleId() {
					return H(b);
				},
				get targetHandleId() {
					return H(x);
				},
				get markerStart() {
					return H(ne);
				},
				get markerEnd() {
					return H(re);
				}
			});
		}), N(C), ho(C, (e) => j = e, () => j), N(l), V(() => S = za(l, "", S, { "z-index": H(O) })), K(e, l);
	};
	J(ce, (e) => {
		H(D) || e(le);
	}), K(e, se), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/MarkerDefinition.svelte
var Wv = /* @__PURE__ */ oa("<defs></defs>");
function Gv(e, t) {
	bt(t, !1);
	let n = vv();
	vo();
	var r = Wv();
	Y(r, 5, () => n.markers, (e) => e.id, (e, t) => {
		Yv(e, Co(() => H(t)));
	}), N(r), K(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/Marker.svelte
var Kv = /* @__PURE__ */ oa("<polyline class=\"arrow\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4\"></polyline>"), qv = /* @__PURE__ */ oa("<polyline class=\"arrowclosed\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4 -5,-4\"></polyline>"), Jv = /* @__PURE__ */ oa("<marker class=\"svelte-flow__arrowhead\" viewBox=\"-10 -10 20 20\" refX=\"0\" refY=\"0\"><!></marker>");
function Yv(e, t) {
	bt(t, !0);
	let n = Q(t, "width", 3, 12.5), r = Q(t, "height", 3, 12.5), i = Q(t, "markerUnits", 3, "strokeWidth"), a = Q(t, "orient", 3, "auto-start-reverse"), o = Q(t, "color", 3, "none");
	var s = Jv(), c = L(s), l = (e) => {
		var n = Kv();
		let r;
		V(() => {
			Z(n, "stroke-width", t.strokeWidth), r = za(n, "", r, { stroke: o() });
		}), K(e, n);
	}, u = (e) => {
		var n = qv();
		let r;
		V(() => {
			Z(n, "stroke-width", t.strokeWidth), r = za(n, "", r, {
				stroke: o(),
				fill: o()
			});
		}), K(e, n);
	};
	J(c, (e) => {
		t.type === nh.Arrow ? e(l) : t.type === nh.ArrowClosed && e(u, 1);
	}), N(s), V(() => {
		Z(s, "id", t.id), Z(s, "markerWidth", `${n()}`), Z(s, "markerHeight", `${r()}`), Z(s, "markerUnits", i()), Z(s, "orient", a());
	}), K(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/EdgeRenderer.svelte
var Xv = /* @__PURE__ */ G("<div class=\"svelte-flow__edges\"><svg class=\"svelte-flow__marker\"><!></svg> <!></div>");
function Zv(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15);
	var r = Xv(), i = L(r);
	Gv(L(i), {}), N(i), Y(z(i, 2), 17, () => n().visible.edges.values(), (e) => e.id, (e, r) => {
		Uv(e, {
			get edge() {
				return H(r);
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
	}), N(r), K(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Selection/Selection.svelte
var Qv = /* @__PURE__ */ G("<div class=\"svelte-flow__selection svelte-1vr3gfi\"></div>");
function $v(e, t) {
	bt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "width", 3, 0), a = Q(t, "height", 3, 0), o = Q(t, "isVisible", 3, !0);
	var s = ca(), c = R(s), l = (e) => {
		var t = Qv();
		let o;
		V((e) => o = za(t, "", o, e), [() => ({
			width: typeof i() == "string" ? i() : q_(i()),
			height: typeof a() == "string" ? a() : q_(a()),
			transform: `translate(${n()}px, ${r()}px)`
		})]), K(e, t);
	};
	J(c, (e) => {
		o() && e(l);
	}), K(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/NodeSelection/NodeSelection.svelte
var ey = /* @__PURE__ */ G("<div><!></div>");
function ty(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ tr(void 0);
	Pr(() => {
		t.store.disableKeyboardA11y || H(n)?.focus({ preventScroll: !0 });
	});
	let r = /* @__PURE__ */ P(() => {
		if (t.store.selectionRectMode === "nodes") {
			t.store.nodes;
			let e = uh(t.store.nodeLookup, { filter: (e) => !!e.selected });
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
		Object.prototype.hasOwnProperty.call(J_, e.key) && (e.preventDefault(), t.store.moveSelectedNodes(J_[e.key], e.shiftKey ? 4 : 1));
	}
	var s = ca(), c = R(s), l = (e) => {
		var s = ey();
		let c;
		$v(L(s), {
			width: "100%",
			height: "100%",
			x: 0,
			y: 0
		}), N(s), Oa(s, (e, t) => jv?.(e, t), () => ({
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
		})), ho(s, (e) => I(n, e), () => H(n)), V((e) => {
			X(s, 1, Ma(["svelte-flow__selection-wrapper", t.store.noPanClass]), "svelte-sf2y5e"), Z(s, "role", t.store.disableKeyboardA11y ? void 0 : "button"), Z(s, "tabindex", t.store.disableKeyboardA11y ? void 0 : -1), c = za(s, "", c, e);
		}, [() => ({
			width: q_(H(r).width),
			height: q_(H(r).height),
			transform: `translate(${H(r).x ?? ""}px, ${H(r).y ?? ""}px)`
		})]), W("contextmenu", s, i), W("click", s, a), W("keydown", s, function(...e) {
			(t.store.disableKeyboardA11y ? void 0 : o)?.apply(this, e);
		}), K(e, s);
	}, u = /* @__PURE__ */ P(() => t.store.selectionRectMode === "nodes" && H(r) && jh(H(r).x) && jh(H(r).y));
	J(c, (e) => {
		H(u) && e(l);
	}), K(e, s), xt();
}
Zi([
	"contextmenu",
	"click",
	"keydown"
]);
//#endregion
//#region node_modules/@svelte-put/shortcut/src/shortcut.js
function ny(e) {
	switch (e) {
		case "none": return 0;
		case "ctrl": return 8;
		case "shift": return 4;
		case "alt": return 2;
		case "meta": return 1;
	}
}
function ry(e, t) {
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
					for (let n of e) if ((Array.isArray(n) ? n : [n]).reduce((e, t) => e | ny(t), 0) === i) {
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
	return n && (o = Yi(e, i, a)), {
		update: (t) => {
			let { enabled: s = !0, type: c = "keydown" } = t;
			n && (!s || i !== c) ? o?.() : !n && s && (o = Yi(e, c, a)), n = s, i = c, r = t.trigger;
		},
		destroy: () => {
			o?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useSvelteFlow.svelte.js
function iy() {
	let e = /* @__PURE__ */ P(vv), t = (t) => {
		let n = G_(t) ? t : H(e).nodeLookup.get(t.id), r = n.parentId ? Wh(n.position, n.measured, n.parentId, H(e).nodeLookup, H(e).nodeOrigin) : n.position;
		return Th({
			...n,
			position: r,
			width: n.measured?.width ?? n.width,
			height: n.measured?.height ?? n.height
		});
	};
	function n(t, n, r = { replace: !1 }) {
		H(e).nodes = U(() => H(e).nodes).map((e) => {
			if (e.id === t) {
				let t = typeof n == "function" ? n(e) : n;
				return r?.replace && G_(t) ? t : {
					...e,
					...t
				};
			}
			return e;
		});
	}
	function r(t, n, r = { replace: !1 }) {
		H(e).edges = U(() => H(e).edges).map((e) => {
			if (e.id === t) {
				let t = typeof n == "function" ? n(e) : n;
				return r.replace && K_(t) ? t : {
					...e,
					...t
				};
			}
			return e;
		});
	}
	let i = (t) => H(e).nodeLookup.get(t);
	return {
		zoomIn: H(e).zoomIn,
		zoomOut: H(e).zoomOut,
		getInternalNode: i,
		getNode: (e) => i(e)?.internals.userNode,
		getNodes: (t) => t === void 0 ? H(e).nodes : ay(H(e).nodeLookup, t),
		getEdge: (t) => H(e).edgeLookup.get(t),
		getEdges: (t) => t === void 0 ? H(e).edges : ay(H(e).edgeLookup, t),
		setZoom: async (t, n) => {
			let r = H(e).panZoom;
			return r ? r.scaleTo(t, n) : !1;
		},
		getZoom: () => H(e).viewport.zoom,
		setViewport: async (t, n) => {
			let r = H(e).viewport;
			return H(e).panZoom ? (await H(e).panZoom.setViewport({
				x: t.x ?? r.x,
				y: t.y ?? r.y,
				zoom: t.zoom ?? r.zoom
			}, n), !0) : !1;
		},
		getViewport: () => st(H(e).viewport),
		setCenter: async (t, n, r) => H(e).setCenter(t, n, r),
		fitView: (t) => H(e).fitView(t),
		fitBounds: async (t, n) => {
			if (!H(e).panZoom) return !1;
			let r = zh(t, H(e).width, H(e).height, H(e).minZoom, H(e).maxZoom, n?.padding ?? .1);
			return await H(e).panZoom.setViewport(r, {
				duration: n?.duration,
				ease: n?.ease,
				interpolate: n?.interpolate
			}), !0;
		},
		getIntersectingNodes: (n, r = !0, i) => {
			let a = Ah(n), o = a ? n : t(n);
			return o ? (i || H(e).nodes).filter((t) => {
				let i = H(e).nodeLookup.get(t.id);
				if (!i || !a && t.id === n.id) return !1;
				let s = Th(i), c = kh(s, o);
				return r && c > 0 || c >= s.width * s.height || c >= o.width * o.height;
			}) : [];
		},
		isNodeIntersecting: (e, n, r = !0) => {
			let i = Ah(e) ? e : t(e);
			if (!i) return !1;
			let a = kh(i, n);
			return r && a > 0 || a >= n.width * n.height || a >= i.width * i.height;
		},
		deleteElements: async ({ nodes: t = [], edges: n = [] }) => {
			let { nodes: r, edges: i } = await gh({
				nodesToRemove: t,
				edgesToRemove: n,
				nodes: H(e).nodes,
				edges: H(e).edges,
				onBeforeDelete: H(e).onbeforedelete
			});
			return r && (H(e).nodes = U(() => H(e).nodes).filter((e) => !r.some(({ id: t }) => t === e.id))), i && (H(e).edges = U(() => H(e).edges).filter((e) => !i.some(({ id: t }) => t === e.id))), (r.length > 0 || i.length > 0) && H(e).ondelete?.({
				nodes: r,
				edges: i
			}), {
				deletedNodes: r,
				deletedEdges: i
			};
		},
		screenToFlowPosition: (t, n = { snapToGrid: !0 }) => {
			if (!H(e).domNode) return t;
			let r = n.snapToGrid ? H(e).snapGrid : !1, { x: i, y: a, zoom: o } = H(e).viewport, { x: s, y: c } = H(e).domNode.getBoundingClientRect();
			return Ph({
				x: t.x - s,
				y: t.y - c
			}, [
				i,
				a,
				o
			], r !== null, r || [1, 1]);
		},
		flowToScreenPosition: (t) => {
			if (!H(e).domNode) return t;
			let { x: n, y: r, zoom: i } = H(e).viewport, { x: a, y: o } = H(e).domNode.getBoundingClientRect(), s = Fh(t, [
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
			nodes: [...H(e).nodes],
			edges: [...H(e).edges],
			viewport: { ...H(e).viewport }
		}),
		updateNode: n,
		updateNodeData: (t, r, i) => {
			let a = H(e).nodeLookup.get(t)?.internals.userNode;
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
		getNodesBounds: (t) => lh(t, {
			nodeLookup: H(e).nodeLookup,
			nodeOrigin: H(e).nodeOrigin
		}),
		getHandleConnections: ({ type: t, id: n, nodeId: r }) => Array.from(H(e).connectionLookup.get(`${r}-${t}-${n ?? null}`)?.values() ?? [])
	};
}
function ay(e, t) {
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
function oy(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = Q(t, "selectionKey", 3, "Shift"), i = Q(t, "multiSelectionKey", 19, () => Bh() ? "Meta" : "Control"), a = Q(t, "deleteKey", 3, "Backspace"), o = Q(t, "panActivationKey", 3, " "), s = Q(t, "zoomActivationKey", 19, () => Bh() ? "Meta" : "Control"), { deleteElements: c } = iy();
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
	Xi("blur", Cr, p), Xi("contextmenu", Cr, p), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(i(), () => {
			n(n().multiselectionKeyPressed = !0, !0);
		}),
		type: "keydown"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(i(), () => n(n().multiselectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(a(), (e) => {
			!(e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) && !$h(e.originalEvent) && (n(n().deleteKeyPressed = !0, !0), m());
		}),
		type: "keydown"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(a(), () => n(n().deleteKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => ry?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/ConnectionLine/ConnectionLine.svelte
var sy = /* @__PURE__ */ oa("<path fill=\"none\" class=\"svelte-flow__connection-path\"></path>"), cy = /* @__PURE__ */ oa("<svg class=\"svelte-flow__connectionline\"><g><!></g></svg>");
function ly(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => {
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
			case th.Bezier: {
				let [t] = og(e);
				return t;
			}
			case th.Straight: {
				let [t] = pg(e);
				return t;
			}
			case th.Step:
			case th.SmoothStep: {
				let [n] = yg({
					...e,
					borderRadius: t.type === th.Step ? 0 : void 0
				});
				return n;
			}
		}
	});
	var r = ca(), i = R(r), a = (e) => {
		var r = cy(), i = L(r), a = L(i), o = (e) => {
			var n = ca();
			Da(R(n), () => t.LineComponent, (e, t) => {
				t(e, {});
			}), K(e, n);
		}, s = (e) => {
			var r = sy();
			V(() => {
				Z(r, "d", H(n)), za(r, t.style);
			}), K(e, r);
		};
		J(a, (e) => {
			t.LineComponent ? e(o) : e(s, -1);
		}), N(i), N(r), V((e) => {
			Z(r, "width", t.store.width), Z(r, "height", t.store.height), za(r, t.containerStyle), X(i, 0, e);
		}, [() => Ma(["svelte-flow__connection", Jh(t.store.connection.isValid)])]), K(e, r);
	};
	J(i, (e) => {
		t.store.connection.inProgress && e(a);
	}), K(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Panel/Panel.svelte
var uy = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"style",
	"class",
	"children"
]), dy = /* @__PURE__ */ G("<div><!></div>");
function fy(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "top-right"), r = /* @__PURE__ */ xo(t, uy), i = /* @__PURE__ */ P(() => `${n()}`.split("-"));
	var a = dy();
	ro(a, (e) => ({
		class: e,
		style: t.style,
		...r
	}), [() => [
		"svelte-flow__panel",
		t.class,
		...H(i)
	]]), Ea(L(a), () => t.children ?? C), N(a), K(e, a), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/Attribution/Attribution.svelte
var py = /* @__PURE__ */ G("<a target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Svelte Flow attribution\">Svelte Flow</a>");
function my(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = "https://svelteflow.dev?utm_source=attribution";
	Pr(() => {});
	var i = ca(), a = R(i), o = (e) => {
		{
			let t = /* @__PURE__ */ P(() => `Please only hide this attribution when you are subscribed to Svelte Flow Pro: ${r}`);
			fy(e, {
				get position() {
					return n();
				},
				class: "svelte-flow__attribution",
				get "data-message"() {
					return H(t);
				},
				children: (e, t) => {
					var n = py();
					V(() => Z(n, "href", r)), K(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	J(a, (e) => {
		t.proOptions?.hideAttribution || e(o);
	}), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/Wrapper.svelte
var hy = /* @__PURE__ */ G("<div><!></div>");
function gy(e, t) {
	bt(t, !0);
	let n = Q(t, "domNode", 15), r = Q(t, "clientWidth", 15), i = Q(t, "clientHeight", 15), a = /* @__PURE__ */ P(() => t.rest.class), o = /* @__PURE__ */ P(() => d(t.rest, /* @__PURE__ */ "id.class.nodeTypes.edgeTypes.colorMode.isValidConnection.onmove.onmovestart.onmoveend.onflowerror.ondelete.onbeforedelete.onbeforeconnect.onconnect.onconnectstart.onconnectend.onbeforereconnect.onreconnect.onreconnectstart.onreconnectend.onclickconnectstart.onclickconnectend.oninit.onselectionchange.onselectiondragstart.onselectiondrag.onselectiondragstop.onselectionstart.onselectionend.clickConnect.fitView.fitViewOptions.nodeOrigin.nodeDragThreshold.connectionDragThreshold.minZoom.maxZoom.initialViewport.connectionRadius.connectionMode.selectionMode.selectNodesOnDrag.snapGrid.defaultMarkerColor.translateExtent.nodeExtent.onlyRenderVisibleElements.autoPanOnConnect.autoPanOnNodeDrag.colorModeSSR.defaultEdgeOptions.elevateNodesOnSelect.elevateEdgesOnSelect.nodesDraggable.autoPanOnNodeFocus.nodesConnectable.elementsSelectable.nodesFocusable.edgesFocusable.disableKeyboardA11y.noDragClass.noPanClass.noWheelClass.ariaLabelConfig.autoPanSpeed.panOnScrollSpeed.zIndexMode.autoPanOnSelection".split(".")));
	function s(e) {
		e.currentTarget.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto"
		}), t.rest.onscroll && t.rest.onscroll(e);
	}
	var c = hy();
	ro(c, (e) => ({
		class: [
			"svelte-flow",
			"svelte-flow__container",
			t.colorMode,
			H(a)
		],
		"data-testid": "svelte-flow__wrapper",
		role: "application",
		onscroll: s,
		...H(o),
		[Ga]: e
	}), [() => ({
		width: q_(t.width),
		height: q_(t.height)
	})], void 0, void 0, "svelte-mkap6j"), Ea(L(c), () => t.children ?? C), N(c), ho(c, (e) => n(e), () => n()), po(c, "clientHeight", i), po(c, "clientWidth", r), K(e, c), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/SvelteFlow.svelte
var _y = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.width.height.proOptions.selectionKey.deleteKey.panActivationKey.multiSelectionKey.zoomActivationKey.paneClickDistance.nodeClickDistance.onmovestart.onmoveend.onmove.oninit.onnodeclick.onnodecontextmenu.onnodedrag.onnodedragstart.onnodedragstop.onnodepointerenter.onnodepointermove.onnodepointerleave.onselectionclick.onselectioncontextmenu.onselectionstart.onselectionend.onedgeclick.onedgecontextmenu.onedgepointerenter.onedgepointerleave.onpaneclick.onpanecontextmenu.panOnScrollMode.preventScrolling.zoomOnScroll.zoomOnDoubleClick.zoomOnPinch.panOnScroll.panOnScrollSpeed.panOnDrag.selectionOnDrag.autoPanOnSelection.connectionLineComponent.connectionLineStyle.connectionLineContainerStyle.connectionLineType.attributionPosition.children.nodes.edges.viewport".split(".")), vy = /* @__PURE__ */ G("<div class=\"svelte-flow__viewport-back svelte-flow__container\"></div> <!> <div class=\"svelte-flow__edge-labels svelte-flow__container\"></div> <!> <!> <!> <div class=\"svelte-flow__viewport-front svelte-flow__container\"></div>", 1), yy = /* @__PURE__ */ G("<!> <!>", 1), by = /* @__PURE__ */ G("<!> <!> <!> <!> <!>", 1);
function xy(e, t) {
	bt(t, !0);
	let n = Q(t, "paneClickDistance", 3, 1), r = Q(t, "nodeClickDistance", 3, 1), i = Q(t, "panOnScrollMode", 19, () => Qm.Free), a = Q(t, "preventScrolling", 3, !0), o = Q(t, "zoomOnScroll", 3, !0), s = Q(t, "zoomOnDoubleClick", 3, !0), c = Q(t, "zoomOnPinch", 3, !0), l = Q(t, "panOnScroll", 3, !1), u = Q(t, "panOnScrollSpeed", 3, .5), d = Q(t, "panOnDrag", 3, !0), f = Q(t, "selectionOnDrag", 3, !1), p = Q(t, "autoPanOnSelection", 3, !0), m = Q(t, "connectionLineType", 19, () => th.Bezier), h = Q(t, "nodes", 31, () => ur([])), g = Q(t, "edges", 31, () => ur([])), _ = Q(t, "viewport", 15, void 0), v = /* @__PURE__ */ xo(t, _y), y = bv({
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
	}), b = _t(yv);
	b && b.setStore && b.setStore(y), vt(yv, {
		provider: !1,
		getStore() {
			return y;
		}
	}), Pr(() => {
		let e = {
			nodes: y.selectedNodes,
			edges: y.selectedEdges
		};
		U(() => t.onselectionchange)?.(e);
		for (let t of y.selectionChangeHandlers.values()) t(e);
	}), To(() => {
		y.reset();
	}), gy(e, {
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
			var g = by(), _ = R(g);
			oy(_, {
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
			var v = z(_, 2);
			Cv(v, {
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
					Ov(e, {
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
							var i = yy(), a = R(i);
							Av(a, {
								get store() {
									return y;
								},
								set store(e) {
									y = e;
								},
								children: (e, n) => {
									var i = vy(), a = z(R(i), 2);
									Zv(a, {
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
									var o = z(a, 4);
									ly(o, {
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
									var s = z(o, 2);
									Vv(s, {
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
									}), ty(z(s, 2), {
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
									}), Ke(2), K(e, i);
								},
								$$slots: { default: !0 }
							});
							var o = z(a, 2);
							{
								let e = /* @__PURE__ */ P(() => !!(y.selectionRect && y.selectionRectMode === "user")), t = /* @__PURE__ */ P(() => y.selectionRect?.width), n = /* @__PURE__ */ P(() => y.selectionRect?.height), r = /* @__PURE__ */ P(() => y.selectionRect?.x), i = /* @__PURE__ */ P(() => y.selectionRect?.y);
								$v(o, {
									get isVisible() {
										return H(e);
									},
									get width() {
										return H(t);
									},
									get height() {
										return H(n);
									},
									get x() {
										return H(r);
									},
									get y() {
										return H(i);
									}
								});
							}
							K(e, i);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
			var b = z(v, 2);
			my(b, {
				get proOptions() {
					return t.proOptions;
				},
				get position() {
					return t.attributionPosition;
				}
			});
			var x = z(b, 2);
			Pv(x, { get store() {
				return y;
			} }), Ea(z(x, 2), () => t.children ?? C), K(e, g);
		},
		$$slots: { default: !0 }
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/ControlButton.svelte
var Sy = /* @__PURE__ */ new Set([
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
]), Cy = /* @__PURE__ */ G("<button><!></button>");
function wy(e, t) {
	let n = /* @__PURE__ */ xo(t, Sy);
	var r = Cy();
	ro(r, () => ({
		type: "button",
		onclick: t.onclick,
		class: ["svelte-flow__controls-button", t.class],
		...n,
		[Ga]: {
			"--xy-controls-button-background-color-props": t.bgColor,
			"--xy-controls-button-background-color-hover-props": t.bgColorHover,
			"--xy-controls-button-color-props": t.color,
			"--xy-controls-button-color-hover-props": t.colorHover,
			"--xy-controls-button-border-color-props": t.borderColor
		}
	})), Ea(L(r), () => t.children ?? C), N(r), K(e, r);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Plus.svelte
var Ty = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z\"></path></svg>");
function Ey(e) {
	K(e, Ty());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Minus.svelte
var Dy = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 5\"><path d=\"M0 0h32v4.2H0z\"></path></svg>");
function Oy(e) {
	K(e, Dy());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Fit.svelte
var ky = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 30\"><path d=\"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z\"></path></svg>");
function Ay(e) {
	K(e, ky());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Lock.svelte
var jy = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z\"></path></svg>");
function My(e) {
	K(e, jy());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Unlock.svelte
var Ny = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z\"></path></svg>");
function Py(e) {
	K(e, Ny());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Controls.svelte
var Fy = /* @__PURE__ */ new Set([
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
]), Iy = /* @__PURE__ */ G("<!> <!>", 1), Ly = /* @__PURE__ */ G("<!> <!> <!> <!> <!> <!>", 1);
function Ry(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-left"), r = Q(t, "orientation", 3, "vertical"), i = Q(t, "showZoom", 3, !0), a = Q(t, "showFitView", 3, !0), o = Q(t, "showLock", 3, !0), s = /* @__PURE__ */ xo(t, Fy), c = /* @__PURE__ */ P(vv), l = /* @__PURE__ */ P(() => ({
		bgColor: t.buttonBgColor,
		bgColorHover: t.buttonBgColorHover,
		color: t.buttonColor,
		colorHover: t.buttonColorHover,
		borderColor: t.buttonBorderColor
	})), u = /* @__PURE__ */ P(() => H(c).nodesDraggable || H(c).nodesConnectable || H(c).elementsSelectable), d = /* @__PURE__ */ P(() => H(c).viewport.zoom <= H(c).minZoom), f = /* @__PURE__ */ P(() => H(c).viewport.zoom >= H(c).maxZoom), p = /* @__PURE__ */ P(() => H(c).ariaLabelConfig), m = /* @__PURE__ */ P(() => r() === "horizontal" ? "horizontal" : "vertical"), h = () => {
		H(c).zoomIn();
	}, g = () => {
		H(c).zoomOut();
	}, _ = () => {
		H(c).fitView(t.fitViewOptions);
	}, v = () => {
		let e = !H(u);
		H(c).nodesDraggable = e, H(c).nodesConnectable = e, H(c).elementsSelectable = e;
	};
	{
		let r = /* @__PURE__ */ P(() => [
			"svelte-flow__controls",
			H(m),
			t.class
		]);
		fy(e, Co({
			get class() {
				return H(r);
			},
			get position() {
				return n();
			},
			"data-testid": "svelte-flow__controls",
			get "aria-label"() {
				return H(p)["controls.ariaLabel"];
			},
			get style() {
				return t.style;
			}
		}, () => s, {
			children: (e, n) => {
				var r = Ly(), s = R(r), c = (e) => {
					var n = ca();
					Ea(R(n), () => t.before), K(e, n);
				};
				J(s, (e) => {
					t.before && e(c);
				});
				var m = z(s, 2), y = (e) => {
					var t = Iy(), n = R(t);
					wy(n, Co({
						onclick: h,
						class: "svelte-flow__controls-zoomin",
						get title() {
							return H(p)["controls.zoomIn.ariaLabel"];
						},
						get "aria-label"() {
							return H(p)["controls.zoomIn.ariaLabel"];
						},
						get disabled() {
							return H(f);
						}
					}, () => H(l), {
						children: (e, t) => {
							Ey(e, {});
						},
						$$slots: { default: !0 }
					})), wy(z(n, 2), Co({
						onclick: g,
						class: "svelte-flow__controls-zoomout",
						get title() {
							return H(p)["controls.zoomOut.ariaLabel"];
						},
						get "aria-label"() {
							return H(p)["controls.zoomOut.ariaLabel"];
						},
						get disabled() {
							return H(d);
						}
					}, () => H(l), {
						children: (e, t) => {
							Oy(e, {});
						},
						$$slots: { default: !0 }
					})), K(e, t);
				};
				J(m, (e) => {
					i() && e(y);
				});
				var b = z(m, 2), x = (e) => {
					wy(e, Co({
						class: "svelte-flow__controls-fitview",
						onclick: _,
						get title() {
							return H(p)["controls.fitView.ariaLabel"];
						},
						get "aria-label"() {
							return H(p)["controls.fitView.ariaLabel"];
						}
					}, () => H(l), {
						children: (e, t) => {
							Ay(e, {});
						},
						$$slots: { default: !0 }
					}));
				};
				J(b, (e) => {
					a() && e(x);
				});
				var S = z(b, 2), C = (e) => {
					wy(e, Co({
						class: "svelte-flow__controls-interactive",
						onclick: v,
						get title() {
							return H(p)["controls.interactive.ariaLabel"];
						},
						get "aria-label"() {
							return H(p)["controls.interactive.ariaLabel"];
						}
					}, () => H(l), {
						children: (e, t) => {
							var n = ca(), r = R(n), i = (e) => {
								Py(e, {});
							}, a = (e) => {
								My(e, {});
							};
							J(r, (e) => {
								H(u) ? e(i) : e(a, -1);
							}), K(e, n);
						},
						$$slots: { default: !0 }
					}));
				};
				J(S, (e) => {
					o() && e(C);
				});
				var w = z(S, 2), T = (e) => {
					var n = ca();
					Ea(R(n), () => t.children), K(e, n);
				};
				J(w, (e) => {
					t.children && e(T);
				});
				var E = z(w, 2), D = (e) => {
					var n = ca();
					Ea(R(n), () => t.after), K(e, n);
				};
				J(E, (e) => {
					t.after && e(D);
				}), K(e, r);
			},
			$$slots: { default: !0 }
		}));
	}
	xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/types.js
var zy;
(function(e) {
	e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(zy ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/DotPattern.svelte
var By = /* @__PURE__ */ oa("<circle></circle>");
function Vy(e, t) {
	var n = By();
	V(() => {
		Z(n, "cx", t.radius), Z(n, "cy", t.radius), Z(n, "r", t.radius), X(n, 0, Ma([
			"svelte-flow__background-pattern",
			"dots",
			t.class
		]));
	}), K(e, n);
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/LinePattern.svelte
var Hy = /* @__PURE__ */ oa("<path></path>");
function Uy(e, t) {
	bt(t, !0);
	var n = Hy();
	V(() => {
		Z(n, "stroke-width", t.lineWidth), Z(n, "d", `M${t.dimensions[0] / 2} 0 V${t.dimensions[1]} M0 ${t.dimensions[1] / 2} H${t.dimensions[0]}`), X(n, 0, Ma([
			"svelte-flow__background-pattern",
			t.variant,
			t.class
		]));
	}), K(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/Background.svelte
var Wy = {
	[zy.Dots]: 1,
	[zy.Lines]: 1,
	[zy.Cross]: 6
}, Gy = /* @__PURE__ */ oa("<svg data-testid=\"svelte-flow__background\"><pattern patternUnits=\"userSpaceOnUse\"><!></pattern><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"></rect></svg>");
function Ky(e, t) {
	bt(t, !0);
	let n = Q(t, "variant", 19, () => zy.Dots), r = Q(t, "gap", 3, 20), i = Q(t, "lineWidth", 3, 1), a = /* @__PURE__ */ P(vv), o = /* @__PURE__ */ P(() => n() === zy.Dots), s = /* @__PURE__ */ P(() => n() === zy.Cross), c = /* @__PURE__ */ P(() => Array.isArray(r()) ? r() : [r(), r()]), l = /* @__PURE__ */ P(() => `background-pattern-${H(a).flowId}-${t.id ?? ""}`), u = /* @__PURE__ */ P(() => [H(c)[0] * H(a).viewport.zoom || 1, H(c)[1] * H(a).viewport.zoom || 1]), d = /* @__PURE__ */ P(() => (t.size ?? Wy[n()]) * H(a).viewport.zoom), f = /* @__PURE__ */ P(() => H(s) ? [H(d), H(d)] : H(u)), p = /* @__PURE__ */ P(() => H(o) ? [H(d) / 2, H(d) / 2] : [H(f)[0] / 2, H(f)[1] / 2]);
	var m = Gy();
	let h;
	var g = L(m), _ = L(g), v = (e) => {
		{
			let n = /* @__PURE__ */ P(() => H(d) / 2);
			Vy(e, {
				get radius() {
					return H(n);
				},
				get class() {
					return t.patternClass;
				}
			});
		}
	}, y = (e) => {
		Uy(e, {
			get dimensions() {
				return H(f);
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
	J(_, (e) => {
		H(o) ? e(v) : e(y, -1);
	}), N(g);
	var b = z(g);
	N(m), V(() => {
		X(m, 0, Ma([
			"svelte-flow__background",
			"svelte-flow__container",
			t.class
		])), h = za(m, "", h, {
			"--xy-background-color-props": t.bgColor,
			"--xy-background-pattern-color-props": t.patternColor
		}), Z(g, "id", H(l)), Z(g, "x", H(a).viewport.x % H(u)[0]), Z(g, "y", H(a).viewport.y % H(u)[1]), Z(g, "width", H(u)[0]), Z(g, "height", H(u)[1]), Z(g, "patternTransform", `translate(-${H(p)[0]},-${H(p)[1]})`), Z(b, "fill", `url(#${H(l)})`);
	}), K(e, m), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/hooks/useInternalNode.svelte.js
function qy(e) {
	let t = /* @__PURE__ */ P(vv), n = /* @__PURE__ */ P(() => H(t).nodeLookup), r = /* @__PURE__ */ P(() => H(t).nodes), i = /* @__PURE__ */ P(() => (H(r), H(n).get(e)));
	return { get current() {
		return H(i);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/MinimapNode.svelte
var Jy = /* @__PURE__ */ oa("<rect></rect>");
function Yy(e, t) {
	bt(t, !0);
	let n = Q(t, "borderRadius", 3, 5), r = Q(t, "strokeWidth", 3, 2), i = /* @__PURE__ */ P(() => qy(t.id)), a = /* @__PURE__ */ P(() => {
		if (!H(i).current) return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		let { width: e, height: n } = Hh(H(i).current);
		return {
			width: t.width ?? e,
			height: t.height ?? n,
			x: t.x ?? H(i).current.internals.positionAbsolute.x,
			y: t.y ?? H(i).current.internals.positionAbsolute.y
		};
	}), o = /* @__PURE__ */ P(() => H(a).width), s = /* @__PURE__ */ P(() => H(a).height), c = /* @__PURE__ */ P(() => H(a).x), l = /* @__PURE__ */ P(() => H(a).y);
	var u = ca(), d = R(u), f = (e) => {
		let i = /* @__PURE__ */ P(() => t.nodeComponent);
		var a = ca();
		Da(R(a), () => H(i), (e, i) => {
			i(e, {
				get id() {
					return t.id;
				},
				get x() {
					return H(c);
				},
				get y() {
					return H(l);
				},
				get width() {
					return H(o);
				},
				get height() {
					return H(s);
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
		}), K(e, a);
	}, p = (e) => {
		var i = Jy();
		let a, u;
		V(() => {
			a = X(i, 0, Ma(["svelte-flow__minimap-node", t.class]), null, a, { selected: t.selected }), Z(i, "x", H(c)), Z(i, "y", H(l)), Z(i, "rx", n()), Z(i, "ry", n()), Z(i, "width", H(o)), Z(i, "height", H(s)), Z(i, "shape-rendering", t.shapeRendering), u = za(i, "", u, {
				fill: t.color,
				stroke: t.strokeColor,
				"stroke-width": r()
			});
		}), K(e, i);
	};
	J(d, (e) => {
		t.nodeComponent ? e(f) : e(p, -1);
	}), K(e, u), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/interactive.js
function Xy(e, t) {
	let n = s_({
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
var Zy = (e) => e instanceof Function ? e : () => e, Qy = /* @__PURE__ */ new Set([
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
]), $y = /* @__PURE__ */ oa("<title> </title>"), eb = /* @__PURE__ */ oa("<svg class=\"svelte-flow__minimap-svg\" role=\"img\"><!><!><path class=\"svelte-flow__minimap-mask\" fill-rule=\"evenodd\" pointer-events=\"none\"></path></svg>"), tb = /* @__PURE__ */ G("<svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper>", 1);
function nb(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = Q(t, "nodeStrokeColor", 3, "transparent"), i = Q(t, "nodeClass", 3, ""), a = Q(t, "nodeBorderRadius", 3, 5), o = Q(t, "nodeStrokeWidth", 3, 2), s = Q(t, "width", 3, 200), c = Q(t, "height", 3, 150), l = Q(t, "pannable", 3, !0), u = Q(t, "zoomable", 3, !0), d = /* @__PURE__ */ xo(t, Qy), f = /* @__PURE__ */ P(vv), p = /* @__PURE__ */ P(() => H(f).ariaLabelConfig), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision", h = /* @__PURE__ */ P(() => `svelte-flow__minimap-desc-${H(f).flowId}`), g = /* @__PURE__ */ P(() => ({
		x: -H(f).viewport.x / H(f).viewport.zoom,
		y: -H(f).viewport.y / H(f).viewport.zoom,
		width: H(f).width / H(f).viewport.zoom,
		height: H(f).height / H(f).viewport.zoom
	})), _ = /* @__PURE__ */ P(() => H(f).nodes.some((e) => !e.hidden)), v = /* @__PURE__ */ P(() => H(_) ? Dh(uh(H(f).nodeLookup, { filter: (e) => !e.hidden }), H(g)) : H(g)), y = /* @__PURE__ */ P(() => H(v).width / s()), b = /* @__PURE__ */ P(() => H(v).height / c()), x = /* @__PURE__ */ P(() => Math.max(H(y), H(b))), S = /* @__PURE__ */ P(() => H(x) * s()), C = /* @__PURE__ */ P(() => H(x) * c()), w = /* @__PURE__ */ P(() => 5 * H(x)), T = /* @__PURE__ */ P(() => H(v).x - (H(S) - H(v).width) / 2 - H(w)), E = /* @__PURE__ */ P(() => H(v).y - (H(C) - H(v).height) / 2 - H(w)), D = /* @__PURE__ */ P(() => H(S) + H(w) * 2), O = /* @__PURE__ */ P(() => H(C) + H(w) * 2), k = () => H(x);
	var A = tb(), j = R(A);
	{
		let e = /* @__PURE__ */ P(() => ["svelte-flow__minimap", t.class]);
		ga(j, () => ({ "--xy-minimap-background-color-props": t.bgColor })), fy(j.lastChild, Co({
			get position() {
				return n();
			},
			get class() {
				return H(e);
			},
			"data-testid": "svelte-flow__minimap"
		}, () => d, {
			children: (e, n) => {
				var d = ca(), _ = R(d), v = (e) => {
					var n = eb();
					let d;
					var _ = L(n), v = (e) => {
						var n = $y(), r = L(n, !0);
						N(n), V(() => {
							Z(n, "id", H(h)), q(r, t.ariaLabel ?? H(p)["minimap.ariaLabel"]);
						}), K(e, n);
					};
					J(_, (e) => {
						(t.ariaLabel ?? H(p)["minimap.ariaLabel"]) && e(v);
					});
					var y = z(_);
					Y(y, 17, () => H(f).nodes, (e) => e.id, (e, n) => {
						let s = /* @__PURE__ */ P(() => H(f).nodeLookup.get(H(n).id));
						var c = ca(), l = R(c), u = (e) => {
							{
								let c = /* @__PURE__ */ P(() => t.nodeColor === void 0 ? void 0 : Zy(t.nodeColor)(H(n))), l = /* @__PURE__ */ P(() => Zy(r())(H(n))), u = /* @__PURE__ */ P(() => Zy(i())(H(n)));
								Yy(e, {
									get id() {
										return H(s).id;
									},
									get selected() {
										return H(s).selected;
									},
									get nodeComponent() {
										return t.nodeComponent;
									},
									get color() {
										return H(c);
									},
									get borderRadius() {
										return a();
									},
									get strokeColor() {
										return H(l);
									},
									get strokeWidth() {
										return o();
									},
									get shapeRendering() {
										return m;
									},
									get class() {
										return H(u);
									}
								});
							}
						}, d = /* @__PURE__ */ P(() => H(s) && Uh(H(s)) && !H(s).hidden);
						J(l, (e) => {
							H(d) && e(u);
						}), K(e, c);
					});
					var b = z(y);
					N(n), Oa(n, (e, t) => Xy?.(e, t), () => ({
						store: H(f),
						panZoom: H(f).panZoom,
						getViewScale: k,
						translateExtent: H(f).translateExtent,
						width: H(f).width,
						height: H(f).height,
						inversePan: t.inversePan,
						zoomStep: t.zoomStep,
						pannable: l(),
						zoomable: u()
					})), V(() => {
						Z(n, "width", s()), Z(n, "height", c()), Z(n, "viewBox", `${H(T) ?? ""} ${H(E) ?? ""} ${H(D) ?? ""} ${H(O) ?? ""}`), Z(n, "aria-labelledby", H(h)), d = za(n, "", d, {
							"--xy-minimap-mask-background-color-props": t.maskColor,
							"--xy-minimap-mask-stroke-color-props": t.maskStrokeColor,
							"--xy-minimap-mask-stroke-width-props": t.maskStrokeWidth ? t.maskStrokeWidth * H(x) : void 0
						}), Z(b, "d", `M${H(T) - H(w)},${H(E) - H(w)}h${H(D) + H(w) * 2}v${H(O) + H(w) * 2}h${-H(D) - H(w) * 2}z
      M${H(g).x ?? ""},${H(g).y ?? ""}h${H(g).width ?? ""}v${H(g).height ?? ""}h${-H(g).width}z`);
					}), K(e, n);
				};
				J(_, (e) => {
					H(f).panZoom && e(v);
				}), K(e, d);
			},
			$$slots: { default: !0 }
		})), N(j);
	}
	K(e, A), xt();
}
//#endregion
//#region src/ui/CampaignFlow.svelte
Ho();
var rb = /* @__PURE__ */ G("<button class=\"outline-button compact\">Load older history</button>"), ib = /* @__PURE__ */ G("<button class=\"outline-button compact\">Retry</button>"), ab = /* @__PURE__ */ G("<div class=\"history-load-status\" aria-live=\"polite\"><span> </span> <!> <!></div>"), ob = /* @__PURE__ */ G("<div class=\"wave-aggregate-strip\" aria-label=\"Current multi-lane wave aggregate\"><span><b>WAVE AGGREGATE</b><strong> </strong></span> <span><b>FIXED MEMBERS</b><strong> </strong></span> <span><b>ACCOUNTED</b><strong> </strong></span> <span><b>ACTIVE</b><strong> </strong></span> <i>PROJECTION ONLY</i></div>"), sb = /* @__PURE__ */ G("<article><div><b> </b><span> </span></div> <strong> </strong> <p> </p> <small> </small></article>"), cb = /* @__PURE__ */ G("<details class=\"wave-repair-plan\" aria-label=\"Historical wave projection diagnosis\"><summary><span><b>ACCOUNTING GAP</b><strong> </strong></span> <i> </i></summary> <div class=\"wave-repair-body\"><p> </p> <!> <footer><b>NO WRITE AUTHORITY</b><span>This diagnosis cannot sync state, reconcile custody, revive a worker, dispatch a lane, or change campaign phase.</span></footer></div></details>"), lb = /* @__PURE__ */ G("<div class=\"replay-toolbar\" aria-label=\"Campaign replay controls\"><div class=\"replay-buttons\"><button aria-label=\"First milestone\">↤</button> <button aria-label=\"Previous milestone\">←</button> <button class=\"replay-play\"> </button> <button aria-label=\"Next milestone\">→</button> <button aria-label=\"Latest milestone\">↦</button></div> <label class=\"replay-scrubber\"><span> </span><input type=\"range\" min=\"0\" aria-label=\"Replay position\"/></label> <div class=\"replay-now\"><strong> </strong><span> </span></div></div>"), ub = /* @__PURE__ */ G("<button> </button>"), db = /* @__PURE__ */ G("<div class=\"history-filters\" aria-label=\"History filters\"></div>"), fb = /* @__PURE__ */ G("<p> </p>"), pb = /* @__PURE__ */ G("<p class=\"program-history-message\">Building the durable hierarchy…</p>"), mb = /* @__PURE__ */ G("<div class=\"program-history-message error\"><span> </span><button class=\"outline-button compact\">Retry</button></div>"), hb = /* @__PURE__ */ G("<p class=\"program-history-message\">No strategy epochs have been recorded for this project.</p>"), gb = /* @__PURE__ */ G("<p>No baseline snapshot is available for this historical epoch.</p>"), _b = /* @__PURE__ */ G("<div class=\"boundary-row\" role=\"row\"><span><small> </small><strong> </strong></span><code> </code><code> </code></div>"), vb = /* @__PURE__ */ G("<div class=\"boundary-table\" role=\"table\" aria-label=\"Changed boundary values\"><div class=\"boundary-row heading\" role=\"row\"><span>GROUP / FIELD</span><span>START</span><span>END</span></div> <!></div>"), yb = /* @__PURE__ */ G("<li><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></li>"), bb = /* @__PURE__ */ G("<ol class=\"program-lanes\"></ol>"), xb = /* @__PURE__ */ G("<p>No durable research runs are attached to this wave.</p>"), Sb = /* @__PURE__ */ G("<ol class=\"program-custody\"></ol>"), Cb = /* @__PURE__ */ G("<details class=\"program-wave\"><summary><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></summary> <div class=\"program-wave-body\"><!> <!></div></details>"), wb = /* @__PURE__ */ G("<p class=\"program-history-message\">No waves are assigned to this epoch.</p>"), Tb = /* @__PURE__ */ G("<details class=\"program-epoch\"><summary><span><small> </small><strong> </strong></span> <span><b> </b><small> </small></span></summary> <div class=\"program-epoch-body\"><section class=\"epoch-boundary\"><header><span><small>START / END COMPARISON</small><strong> </strong></span><b> </b></header> <!></section> <div class=\"program-waves\"><!> <!></div></div></details>"), Eb = /* @__PURE__ */ G("<div class=\"program-epochs\"></div> <footer> </footer>", 1), Db = /* @__PURE__ */ G("<section class=\"program-history\" aria-label=\"Program history hierarchy\"><header><div><span>PROGRAM HISTORY · READ ONLY</span><strong>Epoch → wave → lane and custody</strong></div> <!></header> <!></section>"), Ob = /* @__PURE__ */ G("<i aria-hidden=\"true\"></i>"), kb = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button> <!>", 1), Ab = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button>"), jb = /* @__PURE__ */ G("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><button aria-label=\"Close step details\">×</button></div> <p> </p> <details open=\"\"><summary>Authority boundary</summary><p>Moving through this stop requires the durable gate shown on the line. Observed files or worker activity cannot advance it.</p></details></aside>"), Mb = /* @__PURE__ */ G("<div class=\"flow-inspector empty\">Select a stop or branch to inspect what enters it and which gate controls the next move.</div>"), Nb = /* @__PURE__ */ G("<div class=\"campaign-map-layout journey-layout\"><div class=\"journey-board\" aria-label=\"Linear branching campaign workflow\"><div class=\"journey-line\"></div> <div class=\"journey-branches\" aria-label=\"Supporting research branches\"></div> <footer><b> </b><span> </span></footer></div> <!></div>"), Pb = /* @__PURE__ */ G("<!> <!> <!>", 1), Fb = /* @__PURE__ */ G("<button aria-label=\"Close step details\">×</button>"), Ib = /* @__PURE__ */ G("<details open=\"\"><summary>Recorded payload</summary><pre> </pre></details>"), Lb = /* @__PURE__ */ G("<li><span> </span><strong> </strong></li>"), Rb = /* @__PURE__ */ G("<details><summary>Related substeps <strong> </strong></summary><ol></ol></details>"), zb = /* @__PURE__ */ G("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><!></div> <p> </p> <!> <!></aside>"), Bb = /* @__PURE__ */ G("<div class=\"flow-inspector empty\">Select a recorded milestone to inspect its durable payload and related substeps.</div>"), Vb = /* @__PURE__ */ G("<div class=\"campaign-map-layout\"><div class=\"campaign-flow-canvas\"><!></div> <!></div>"), Hb = /* @__PURE__ */ G("<section><div class=\"campaign-map-heading\"><div><p>CAMPAIGN LINE</p><h2>One main route, with deliberate research branches</h2><span> </span></div> <div class=\"campaign-map-tabs\"><button>Workflow</button> <button>Replay</button> <button>History</button></div></div> <!> <!> <!> <!> <!> <!></section>");
function Ub(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = {
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
	], g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ F("workflow"), v = /* @__PURE__ */ F("all"), y = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(null), x = /* @__PURE__ */ F(typeof window < "u" ? window.innerWidth : 1200), S = /* @__PURE__ */ F(H(x) <= 700), C = /* @__PURE__ */ F({
		nodes: [],
		edges: []
	}), w = /* @__PURE__ */ F([]), T = /* @__PURE__ */ F(0), E = /* @__PURE__ */ F(null), D = /* @__PURE__ */ F(!1), O = null, k = /* @__PURE__ */ F(""), A = /* @__PURE__ */ F(""), j = /* @__PURE__ */ F([]), ee = 0, te = /* @__PURE__ */ F(null), M = /* @__PURE__ */ F(!1), ne = /* @__PURE__ */ F(""), re = 0, ie = /* @__PURE__ */ F(""), ae = /* @__PURE__ */ F(null), oe = /* @__PURE__ */ F(""), se = /* @__PURE__ */ F(!1), ce = /* @__PURE__ */ F(""), le = 0;
	function ue(e, t, n, r, i = {}) {
		return {
			title: e,
			kicker: t,
			detail: n,
			status: r,
			label: `${t}\n${e}\n${r}`,
			...i
		};
	}
	function de(e) {
		return m[e] || e.replaceAll(".", " · ");
	}
	function fe(e) {
		return e.type.startsWith("action.") || e.type === "project.phase.changed" || e.type === "loop.step.queued" ? !1 : !!m[e.type] || /^(wave\.|research\.(review|dispatch|evidence|run)\.|synthesis\.|campaign\.(redirect|operator-transition)\.|strategy\.|custody\.|loop\.)/.test(e.type);
	}
	function pe(e) {
		let t = e?.type || "";
		return t.startsWith("campaign.redirect") ? "redirect" : t.startsWith("strategy.") ? t.includes("activated") || t.includes("baseline") ? "plan" : "decision" : t.startsWith("custody.") ? "landing" : t.includes("operator-transition") || t.startsWith("research.review") || t.startsWith("research.plan") || t === "wave.adopted" ? "plan" : t.startsWith("research.dispatch") || t.startsWith("research.schedule") ? "dispatch" : t.startsWith("research.run") || t.startsWith("research.evidence") || t.startsWith("lane.") || t.startsWith("wave.triage") ? "landing" : t.startsWith("synthesis.") && t !== "synthesis.reviewed" ? "synthesis" : t === "synthesis.reviewed" || t.startsWith("loop.") ? "decision" : "plan";
	}
	function me(e) {
		let t = pe(e);
		return t === "dispatch" ? "execution" : t === "landing" || t === "synthesis" ? "evidence" : "gates";
	}
	function he() {
		return H(S) ? {
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
	function ge(e) {
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
	function _e(e, t) {
		I(y, {
			id: e.id,
			type: "default",
			position: {
				x: 0,
				y: 0
			},
			data: ue(e.title, e.kicker, e.detail, t)
		});
	}
	function ve(e, t = null, n = 0) {
		let r = t ? pe(t) : l[e.phase] || "plan", i = t && n > 0 ? pe(H(w)[n - 1]) : "", a = new Set(t ? H(w).slice(0, n + 1).map(pe) : []), o = !t && e.externalInputs?.some((e) => [
			"queued",
			"drafting",
			"drafted"
		].includes(e.status)), s = he();
		return {
			nodes: u.map((i) => {
				let c = i.id === r || i.id === "redirect" && o, l = !!(t && a.has(i.id) && !c), u = H(S) ? 135 : i.role === "gate" ? 235 : i.role === "escape" ? 205 : 215;
				return {
					id: i.id,
					type: "default",
					position: s[i.id],
					class: `campaign-flow-node stage-${i.id} role-${i.role} ${c ? "current" : ""} ${l ? "visited" : ""}`,
					style: `width: ${u}px; min-height: ${i.role === "gate" ? 92 : 82}px`,
					data: ue(i.title, `${i.order} · ${i.kicker}`, i.detail, t && c ? `REPLAY ${n + 1}/${H(w).length}` : i.id === r ? e.phase : c ? "INPUT OPEN" : l ? "visited" : i.role === "escape" ? "optional" : "workflow", t && c ? { payload: t.payload } : {})
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
						type: nh.ArrowClosed,
						color: c
					},
					style: `stroke: ${c}; stroke-width: ${s ? 2.4 : a === "escape" ? 1 : 1.3}; ${a === "escape" ? "stroke-dasharray: 5 4" : ""}`
				};
			})
		};
	}
	function ye(e) {
		return H(A) === e.id && H(j).length ? H(j) : Array.isArray(e.workflowHistory) ? e.workflowHistory : [];
	}
	function be(e) {
		return H(A) === e.id ? ee : Number(e.workflowHistorySummary?.total || ye(e).length);
	}
	async function xe(e, t = !1) {
		if (H(M) || t && !H(te)) return;
		let n = ++re, r = t && ye(e).filter(fe)[H(T)]?.id || "";
		(!t || H(A) !== e.id) && (I(A, e.id), I(j, []), I(te, null), ee = Number(e.workflowHistorySummary?.total || 0)), I(M, !0), I(ne, "");
		try {
			let i = new URL("/api/workflow-history", location.origin);
			i.searchParams.set("project", e.id), i.searchParams.set("limit", "250"), t && H(te) && i.searchParams.set("cursor", H(te));
			let a = await fetch(`${i.pathname}${i.search}`, { cache: "no-store" }), o = await a.json();
			if (!a.ok) throw Error(o.error || `Could not load campaign history: ${a.status}`);
			if (n !== re || H(g)?.id !== e.id) return;
			let s = t ? [...o.items, ...H(j)] : o.items;
			I(j, [...new Map(s.map((e) => [e.id, e])).values()]), ee = o.total, I(te, o.nextCursor);
			let c = H(j).filter(fe);
			t && r ? I(T, Math.max(0, c.findIndex((e) => e.id === r))) : t || I(T, Math.max(0, c.length - 1));
		} catch (e) {
			n === re && I(ne, e instanceof Error ? e.message : String(e));
		} finally {
			n === re && I(M, !1);
		}
	}
	async function Se(e) {
		let t = ++le;
		I(oe, e.id), I(ae, null), I(se, !0), I(ce, "");
		try {
			let n = new URL("/api/program-history", location.origin);
			n.searchParams.set("project", e.id);
			let r = await fetch(`${n.pathname}${n.search}`, { cache: "no-store" }), i = await r.json();
			if (!r.ok) throw Error(i.error || `Could not load program history: ${r.status}`);
			if (t !== le || H(g)?.id !== e.id) return;
			I(ae, i);
		} catch (e) {
			t === le && I(ce, e instanceof Error ? e.message : String(e));
		} finally {
			t === le && I(se, !1);
		}
	}
	function Ce(e) {
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
	function we(e) {
		return e == null ? "—" : typeof e == "string" ? e : JSON.stringify(e);
	}
	function Te(e) {
		let t = ye(e).filter(fe);
		return H(v) === "all" ? t : t.filter((e) => me(e) === H(v));
	}
	function Ee(e) {
		let t = ye(e), n = Te(e).slice(-(H(S) ? 12 : 20)), r = H(S) ? 2 : 4, i = H(S) ? 155 : 220, a = H(S) ? 125 : 135, o = n.map((e, o) => {
			let s = Math.floor(o / r), c = o % r, l = s % 2 ? r - 1 - c : c, u = me(e), d = t.filter((t) => t.aggregateId === e.aggregateId && t.id !== e.id);
			return {
				id: e.id,
				type: "default",
				position: {
					x: l * i,
					y: s * a
				},
				class: `campaign-flow-node history-node history-${u} ${o === n.length - 1 ? "current" : ""}`,
				style: `width: ${H(S) ? 135 : 185}px; min-height: 82px`,
				data: ue(de(e.type), `${new Date(e.createdAt).toLocaleString()} · ${e.aggregateType}`, e.aggregateId, o === n.length - 1 ? "LATEST" : u, {
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
					type: nh.ArrowClosed,
					color: "#5d7064"
				},
				style: "stroke: #5d7064; stroke-width: 1.1"
			}))
		};
	}
	function De(e, t) {
		return e ? {
			id: e.id,
			position: {
				x: 0,
				y: 0
			},
			data: ue(de(e.type), `REPLAY ${t + 1}/${H(w).length} · ${new Date(e.createdAt).toLocaleString()}`, e.aggregateId, pe(e), { payload: e.payload })
		} : null;
	}
	function Oe() {
		I(D, !1), O && clearInterval(O), O = null;
	}
	function ke(e) {
		I(T, Math.max(0, Math.min(e, Math.max(0, H(w).length - 1)))), I(y, null);
	}
	function Ae() {
		if (H(D)) return Oe();
		H(T) >= H(w).length - 1 && ke(0), I(D, !0), O = setInterval(() => {
			H(T) >= H(w).length - 1 ? Oe() : ke(H(T) + 1);
		}, 900);
	}
	function je(e) {
		Oe(), I(_, e), I(y, null), e === "replay" && H(w).length && I(T, H(w).length - 1), e !== "workflow" && H(g) && xe(H(g)), e === "history" && H(g) && (H(oe) !== H(g).id || !H(ae)) && Se(H(g));
	}
	function Me(e) {
		I(v, e), I(y, null);
	}
	To(Oe), B(() => n(), () => {
		I(g, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(x), () => {
		I(S, H(x) <= 700);
	}), B(() => (H(A), H(j), H(te), H(v), H(S)), () => {
		I(ie, `${H(A)}:${H(j).length}:${H(te) || ""}:${H(v)}:${H(S)}`);
	}), B(() => (H(g), H(A), H(j)), () => {
		I(w, H(g) ? (H(A) === H(g).id && H(j).length ? H(j) : Array.isArray(H(g).workflowHistory) ? H(g).workflowHistory : []).filter(fe) : []);
	}), B(() => (H(g), H(k), H(w)), () => {
		H(g) && H(g).id !== H(k) && (I(k, H(g).id), I(T, Math.max(0, H(w).length - 1)));
	}), B(() => (H(g), H(_), H(oe), H(se)), () => {
		H(g) && H(_) === "history" && H(oe) !== H(g).id && !H(se) && Se(H(g));
	}), B(() => (H(T), H(w)), () => {
		H(T) >= H(w).length && H(w).length && I(T, H(w).length - 1);
	}), B(() => (H(w), H(T)), () => {
		I(E, H(w)[H(T)] || null);
	}), B(() => (H(ie), H(g), H(_), H(E), H(T)), () => {
		H(ie), I(C, H(g) ? H(_) === "history" ? Ee(H(g)) : ve(H(g), H(_) === "replay" ? H(E) : null, H(T)) : {
			nodes: [],
			edges: []
		});
	}), B(() => (H(y), H(_), H(E), H(T)), () => {
		I(b, H(y) || (H(_) === "replay" ? De(H(E), H(T)) : null));
	}), B(() => H(g), () => {
		I(a, H(g)?.wave?.aggregate || null);
	}), B(() => H(g), () => {
		I(o, H(g) ? ge(H(g)) : "intake");
	}), B(() => H(o), () => {
		I(s, Math.max(0, d.findIndex((e) => e.id === H(o))));
	}), B(() => H(g), () => {
		I(c, H(g)?.context?.sources?.filter((e) => e.role === "queue-plan").length || 0);
	}), Br(), vo();
	var Ne = ca(), Pe = R(Ne), Fe = (e) => {
		var t = Hb(), n = L(t), r = L(n), i = z(L(r), 2), l = L(i, !0);
		N(i), N(r);
		var u = z(r, 2), p = L(u);
		let m;
		var x = z(p, 2);
		let O;
		var k = z(x, 2);
		let A;
		N(u), N(n);
		var j = z(n, 2), ee = (e) => {
			var t = ab(), n = L(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = rb();
				W("click", t, () => xe(H(g), !0)), K(e, t);
			};
			J(i, (e) => {
				H(te) && !H(M) && e(a);
			});
			var o = z(i, 2), s = (e) => {
				var t = ib();
				W("click", t, () => xe(H(g))), K(e, t);
			};
			J(o, (e) => {
				H(ne) && !H(M) && e(s);
			}), N(t), V((e) => q(r, e), [() => (H(M), H(ne), H(g), U(() => H(M) ? "Loading durable history…" : H(ne) || `${ye(H(g)).length} of ${be(H(g))} events loaded`))]), K(e, t);
		};
		J(j, (e) => {
			H(_) !== "workflow" && (H(M) || H(ne) || H(te)) && e(ee);
		});
		var re = z(j, 2), ie = (e) => {
			var t = ob(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n);
			var o = z(n, 2), s = z(L(o)), c = L(s, !0);
			N(s), N(o);
			var l = z(o, 2), u = z(L(l)), d = L(u);
			N(u), N(l);
			var f = z(l, 2), p = z(L(f)), m = L(p, !0);
			N(p), N(f), Ke(2), N(t), V((e) => {
				q(i, e), q(c, (H(a), U(() => H(a).membership.count))), q(d, `${H(a), U(() => H(a).accounting.accounted) ?? ""}/${H(a), U(() => H(a).accounting.total) ?? ""}`), q(m, (H(a), U(() => H(a).parallelism.active)));
			}, [() => (H(a), U(() => H(a).state.replaceAll("_", " ")))]), K(e, t);
		};
		J(re, (e) => {
			H(a) && e(ie);
		});
		var oe = z(re, 2), le = (e) => {
			var t = cb(), n = L(t), r = L(n), i = z(L(r)), o = L(i);
			N(i), N(r);
			var s = z(r, 2), c = L(s, !0);
			N(s), N(n);
			var l = z(n, 2), u = L(l), d = L(u, !0);
			N(u), Y(z(u, 2), 1, () => (H(a), U(() => H(a).repairPlan.items)), (e) => e.laneId, (e, t) => {
				var n = sb(), r = L(n), i = L(r), a = L(i, !0);
				N(i);
				var o = z(i), s = L(o);
				N(o), N(r);
				var c = z(r, 2), l = L(c, !0);
				N(c);
				var u = z(c, 2), d = L(u, !0);
				N(u);
				var f = z(u, 2), p = L(f);
				N(f), N(n), V((e, n) => {
					q(a, (H(t), U(() => H(t).laneId))), q(s, `${H(t), U(() => H(t).recordedAccountingState || "unrecorded") ?? ""} → ${H(t), U(() => H(t).proposedAccountingState || "no safe update") ?? ""}`), q(l, e), q(d, (H(t), U(() => H(t).note))), q(p, `Observer: ${H(t), U(() => H(t).observed.present ? `${H(t).observed.lifecycle} · ${H(t).observed.daemon} · ${H(t).observed.landing}` : "no current record") ?? ""}${n ?? ""}`);
				}, [() => (H(t), U(() => H(t).recommendation.replaceAll("_", " "))), () => (H(t), U(() => H(t).observed.updatedAt ? ` · ${new Date(H(t).observed.updatedAt).toLocaleString()}` : ""))]), K(e, n);
			}), Ke(2), N(l), N(t), V((e) => {
				q(o, `${H(a), U(() => H(a).repairPlan.items.length) ?? ""} historical member${H(a), U(() => H(a).repairPlan.items.length === 1 ? "" : "s") ?? ""} need evidence`), q(c, e), q(d, (H(a), U(() => H(a).repairPlan.summary)));
			}, [() => (H(a), U(() => H(a).repairPlan.status.replaceAll("_", " ")))]), K(e, t);
		};
		J(oe, (e) => {
			H(a), U(() => H(a)?.repairPlan?.items?.length) && e(le);
		});
		var ue = z(oe, 2), fe = (e) => {
			var t = lb(), n = L(t), r = L(n), i = z(r, 2), a = z(i, 2), o = L(a, !0);
			N(a);
			var s = z(a, 2), c = z(s, 2);
			N(n);
			var l = z(n, 2), u = L(l), d = L(u);
			N(u);
			var f = z(u);
			$a(f), N(l);
			var p = z(l, 2), m = L(p), h = L(m, !0);
			N(m);
			var g = z(m), _ = L(g, !0);
			N(g), N(p), N(t), V((e, t, n) => {
				r.disabled = (H(w), H(T), U(() => !H(w).length || H(T) === 0)), i.disabled = (H(w), H(T), U(() => !H(w).length || H(T) === 0)), a.disabled = (H(w), U(() => H(w).length < 2)), q(o, H(D) ? "Pause" : "Play"), s.disabled = (H(w), H(T), U(() => !H(w).length || H(T) >= H(w).length - 1)), c.disabled = (H(w), H(T), U(() => !H(w).length || H(T) >= H(w).length - 1)), q(d, `${H(w), H(T), U(() => H(w).length ? H(T) + 1 : 0) ?? ""} / ${H(w), U(() => H(w).length) ?? ""}`), Z(f, "max", e), eo(f, H(T)), q(h, t), q(_, n);
			}, [
				() => (H(w), U(() => Math.max(0, H(w).length - 1))),
				() => (H(E), U(() => H(E) ? de(H(E).type) : "No recorded milestones")),
				() => (H(E), U(() => H(E) ? new Date(H(E).createdAt).toLocaleString() : ""))
			]), W("click", r, () => ke(0)), W("click", i, () => ke(H(T) - 1)), W("click", a, Ae), W("click", s, () => ke(H(T) + 1)), W("click", c, () => ke(H(w).length - 1)), W("input", f, (e) => ke(Number(e.currentTarget.value))), K(e, t);
		}, pe = (e) => {
			var t = db();
			Y(t, 5, () => h, _a, (e, t) => {
				var n = ub();
				let r;
				var i = L(n, !0);
				N(n), V(() => {
					r = X(n, 1, "", null, r, { active: H(v) === H(t).id }), q(i, (H(t), U(() => H(t).label)));
				}), W("click", n, () => Me(H(t).id)), K(e, n);
			}), N(t), K(e, t);
		};
		J(ue, (e) => {
			H(_) === "replay" ? e(fe) : H(_) === "history" && e(pe, 1);
		});
		var me = z(ue, 2), he = (e) => {
			var t = Db(), n = L(t), r = z(L(n), 2), i = (e) => {
				var t = fb(), n = L(t);
				N(t), V(() => q(n, `${H(ae), U(() => H(ae).counts.epochs) ?? ""} epochs · ${H(ae), U(() => H(ae).counts.waves) ?? ""} waves · ${H(ae), U(() => H(ae).counts.lanes) ?? ""} lanes · ${H(ae), U(() => H(ae).counts.custody) ?? ""} custody`)), K(e, t);
			};
			J(r, (e) => {
				H(ae) && e(i);
			}), N(n);
			var a = z(n, 2), o = (e) => {
				K(e, pb());
			}, s = (e) => {
				var t = mb(), n = L(t), r = L(n, !0);
				N(n);
				var i = z(n);
				N(t), V(() => q(r, H(ce))), W("click", i, () => Se(H(g))), K(e, t);
			}, c = (e) => {
				K(e, hb());
			}, l = (e) => {
				var t = Eb(), n = R(t);
				Y(n, 7, () => (H(ae), U(() => H(ae).epochs)), (e) => e.id, (e, t, n) => {
					var r = Tb(), i = L(r), a = L(i), o = L(a), s = L(o);
					N(o);
					var c = z(o), l = L(c, !0);
					N(c), N(a);
					var u = z(a, 2), d = L(u), f = L(d, !0);
					N(d);
					var p = z(d), m = L(p);
					N(p), N(u), N(i);
					var h = z(i, 2), g = L(h), _ = L(g), v = L(_), y = z(L(v)), b = L(y, !0);
					N(y), N(v);
					var x = z(v), S = L(x);
					N(x), N(_);
					var C = z(_, 2), w = (e) => {
						K(e, gb());
					}, T = (e) => {
						var n = fb(), r = L(n, !0);
						N(n), V(() => q(r, (H(t), U(() => H(t).boundary.complete ? "The recorded boundary values are unchanged." : "Only the current baseline is available; no completed end boundary has been recorded.")))), K(e, n);
					}, E = /* @__PURE__ */ P(() => (H(t), U(() => !Ce(H(t)).length))), D = (e) => {
						var n = vb();
						Y(z(L(n), 2), 1, () => (H(t), U(() => Ce(H(t)))), (e) => `${e.group}:${e.item.key}`, (e, t) => {
							var n = _b(), r = L(n), i = L(r), a = L(i, !0);
							N(i);
							var o = z(i), s = L(o, !0);
							N(o), N(r);
							var c = z(r), l = L(c, !0);
							N(c);
							var u = z(c), d = L(u, !0);
							N(u), N(n), V((e, n) => {
								q(a, (H(t), U(() => H(t).group))), q(s, (H(t), U(() => H(t).item.key))), q(l, e), q(d, n);
							}, [() => (H(t), U(() => we(H(t).item.start))), () => (H(t), U(() => we(H(t).item.end)))]), K(e, n);
						}), N(n), K(e, n);
					};
					J(C, (e) => {
						H(t), U(() => !H(t).boundary.startSnapshot) ? e(w) : H(E) ? e(T, 1) : e(D, -1);
					}), N(g);
					var O = z(g, 2), k = L(O);
					Y(k, 1, () => (H(t), U(() => H(t).waves)), (e) => e.id, (e, t) => {
						var n = Cb(), r = L(n), i = L(r), a = L(i), o = L(a);
						N(a);
						var s = z(a), c = L(s, !0);
						N(s), N(i);
						var l = z(i), u = L(l), d = L(u, !0);
						N(u);
						var f = z(u), p = L(f);
						N(f), N(l), N(r);
						var m = z(r, 2), h = L(m), g = (e) => {
							var n = bb();
							Y(n, 5, () => (H(t), U(() => H(t).lanes)), (e) => e.id, (e, t) => {
								var n = yb(), r = L(n), i = L(r), a = L(i, !0);
								N(i);
								var o = z(i), s = L(o, !0);
								N(o), N(r);
								var c = z(r), l = L(c), u = L(l, !0);
								N(l);
								var d = z(l), f = L(d, !0);
								N(d), N(c), N(n), V((e, n) => {
									q(a, (H(t), U(() => H(t).profile || "research"))), q(s, (H(t), U(() => H(t).taskId || H(t).id))), q(u, e), q(f, n);
								}, [() => (H(t), U(() => H(t).status.replaceAll("_", " "))), () => (H(t), U(() => H(t).tokens === null ? "unmeasured" : `${H(t).tokens.toLocaleString()} tokens`))]), K(e, n);
							}), N(n), V(() => Z(n, "aria-label", (H(t), U(() => `Research lanes in ${H(t).label || H(t).id}`)))), K(e, n);
						}, _ = (e) => {
							K(e, xb());
						};
						J(h, (e) => {
							H(t), U(() => H(t).lanes.length) ? e(g) : e(_, -1);
						});
						var v = z(h, 2), y = (e) => {
							var n = Sb();
							Y(n, 5, () => (H(t), U(() => H(t).custody)), (e) => e.id, (e, t) => {
								var n = yb(), r = L(n), i = L(r), a = L(i, !0);
								N(i);
								var o = z(i), s = L(o, !0);
								N(o), N(r);
								var c = z(r), l = L(c), u = L(l, !0);
								N(l);
								var d = z(l), f = L(d);
								N(d), N(c), N(n), V((e) => {
									q(a, (H(t), U(() => H(t).sourceType))), q(s, (H(t), U(() => H(t).task))), q(u, e), q(f, `${H(t), U(() => H(t).leases.length) ?? ""} lease${H(t), U(() => H(t).leases.length === 1 ? "" : "s") ?? ""}`);
								}, [() => (H(t), U(() => H(t).status.replaceAll("_", " ")))]), K(e, n);
							}), N(n), V(() => Z(n, "aria-label", (H(t), U(() => `Custody work in ${H(t).label || H(t).id}`)))), K(e, n);
						};
						J(v, (e) => {
							H(t), U(() => H(t).custody.length) && e(y);
						}), N(m), N(n), V((e, n) => {
							q(o, `WAVE · ${e ?? ""}`), q(c, (H(t), U(() => H(t).label || H(t).id))), q(d, n), q(p, `${H(t), U(() => H(t).lanes.length) ?? ""} lanes · ${H(t), U(() => H(t).custody.length) ?? ""} custody`);
						}, [() => (H(t), U(() => H(t).assignment.basis.replaceAll("-", " "))), () => (H(t), U(() => H(t).phase.replaceAll("_", " ")))]), K(e, n);
					});
					var A = z(k, 2), j = (e) => {
						K(e, wb());
					};
					J(A, (e) => {
						H(t), U(() => !H(t).waves.length) && e(j);
					}), N(O), N(h), N(r), V((e, i, a, o) => {
						r.open = (Si(H(n)), H(ae), U(() => H(n) === H(ae).epochs.length - 1)), q(s, `EPOCH ${H(n) + 1} · CHARTER R${H(t), U(() => H(t).charterRevision) ?? ""}`), q(l, (H(t), U(() => H(t).label))), q(f, e), q(m, `${i ?? ""} → ${a ?? ""}`), Z(g, "aria-label", (H(t), U(() => `Boundary comparison for ${H(t).label}`))), q(b, (H(t), U(() => H(t).boundary.complete ? "Completed epoch boundary" : "Current boundary projection"))), q(S, `${o ?? ""} changed`);
					}, [
						() => (H(t), U(() => H(t).status.replaceAll("_", " "))),
						() => (H(t), U(() => new Date(H(t).startedAt).toLocaleDateString())),
						() => (H(t), U(() => H(t).completedAt ? new Date(H(t).completedAt).toLocaleDateString() : "active")),
						() => (H(t), U(() => Ce(H(t)).length))
					]), K(e, r);
				}), N(n);
				var r = z(n, 2), i = L(r, !0);
				N(r), V(() => q(i, (H(ae), U(() => H(ae).ownershipPolicy)))), K(e, t);
			};
			J(a, (e) => {
				H(se) ? e(o) : H(ce) ? e(s, 1) : (H(ae), U(() => !H(ae)?.epochs.length) ? e(c, 2) : e(l, -1));
			}), N(t), K(e, t);
		};
		J(me, (e) => {
			H(_) === "history" && e(he);
		});
		var ge = z(me, 2), ve = (e) => {
			var t = Nb(), n = L(t), r = L(n);
			Y(r, 7, () => d, (e) => e.id, (e, t, n) => {
				var r = kb(), i = R(r);
				let a;
				var l = L(i), u = L(l);
				N(l);
				var f = z(l), p = L(f, !0);
				N(f);
				var m = z(f), h = L(m, !0);
				N(m), N(i);
				var _ = z(i, 2), v = (e) => {
					var t = Ob();
					let r;
					V(() => r = X(t, 1, "journey-link", null, r, { active: H(n) === H(s) })), K(e, t);
				};
				J(_, (e) => {
					Si(H(n)), U(() => H(n) < d.length - 1) && e(v);
				}), V((e) => {
					a = X(i, 1, "journey-stop", null, a, {
						current: H(t).id === H(o),
						visited: H(n) < H(s)
					}), q(u, `${H(t), U(() => H(t).order) ?? ""} · ${H(t), U(() => H(t).kicker) ?? ""}`), q(p, (H(t), U(() => H(t).title))), q(h, e);
				}, [() => (H(t), H(o), H(g), H(c), U(() => H(t).id === H(o) ? H(g).phase.replaceAll("_", " ") : H(t).id === "intake" ? `${H(c)} packet${H(c) === 1 ? "" : "s"} staged` : "explicit gate"))]), W("click", i, () => _e(H(t), H(t).id === H(o) ? H(g).phase : H(t).id === "intake" ? `${H(c)} staged` : "gated")), K(e, r);
			}), N(r);
			var i = z(r, 2);
			Y(i, 5, () => f, (e) => e.id, (e, t) => {
				var n = Ab(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a);
				var s = z(a), c = L(s, !0);
				N(s), N(n), V(() => {
					X(n, 1, `journey-branch branch-${H(t), U(() => H(t).id) ?? ""}`), za(n, (H(t), U(() => `--branch-column:${H(t).column}`))), q(i, (H(t), U(() => H(t).kicker))), q(o, (H(t), U(() => H(t).title))), q(c, (H(t), U(() => H(t).detail)));
				}), W("click", n, () => _e(H(t), H(t).id === "redirect" && H(g).externalInputs?.some((e) => [
					"queued",
					"drafting",
					"drafted"
				].includes(e.status)) ? "input open" : "optional branch")), K(e, n);
			}), N(i);
			var a = z(i, 2), l = L(a), u = L(l, !0);
			N(l);
			var p = z(l), m = L(p, !0);
			N(p), N(a), N(n);
			var h = z(n, 2), _ = (e) => {
				var t = jb(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
				N(i);
				var o = z(i), s = L(o, !0);
				N(o), N(r);
				var c = z(r);
				N(n);
				var l = z(n, 2), u = L(l, !0);
				N(l), Ke(2), N(t), V(() => {
					q(a, (H(b), U(() => H(b).data.kicker))), q(s, (H(b), U(() => H(b).data.title))), q(u, (H(b), U(() => H(b).data.detail)));
				}), W("click", c, () => I(y, null)), K(e, t);
			}, v = (e) => {
				K(e, Mb());
			};
			J(h, (e) => {
				H(b) ? e(_) : e(v, -1);
			}), N(t), V(() => {
				za(r, `--current-stage:${H(s)}`), q(u, (H(g), U(() => H(g).controlState?.recovery?.required ? "CONTROL HOLD" : "GATES ENFORCED"))), q(m, (H(g), U(() => H(g).controlState?.recovery?.required ? "New packets can be received and hashed, but the main line cannot advance until the historical boundary is reviewed." : "Branches rejoin the main line through normal planning, custody, and decision gates.")));
			}), K(e, t);
		}, Ee = (e) => {
			var t = Vb(), n = L(t);
			ha(L(n), () => (H(_), H(v), H(S), H(g), U(() => `${H(_)}-${H(v)}-${H(S)}-${H(g).id}`)), (e) => {
				{
					let t = /* @__PURE__ */ Cn(() => ({
						padding: H(S) ? .06 : .14,
						maxZoom: H(S) ? .74 : .88
					}));
					xy(e, {
						get nodes() {
							return H(C), U(() => H(C).nodes);
						},
						get edges() {
							return H(C), U(() => H(C).edges);
						},
						fitView: !0,
						get fitViewOptions() {
							return H(t);
						},
						minZoom: .2,
						maxZoom: 1.8,
						nodesDraggable: !1,
						nodesConnectable: !1,
						elementsSelectable: !0,
						colorMode: "dark",
						onnodeclick: ({ node: e }) => I(y, e),
						children: (e, t) => {
							var n = Pb(), r = R(n);
							Ky(r, {
								patternColor: "#385043",
								gap: 22,
								size: 1,
								get variant() {
									return Si(zy), U(() => zy.Dots);
								}
							});
							var i = z(r, 2);
							Ry(i, { showLock: !1 }), nb(z(i, 2), {
								pannable: !0,
								zoomable: !0,
								nodeColor: (e) => String(e.class).includes("current") ? "#71d6a0" : String(e.class).includes("role-escape") ? "#9b8150" : "#52685a",
								maskColor: "rgba(8, 15, 11, .72)"
							}), K(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			}), N(n);
			var r = z(n, 2), i = (e) => {
				var t = zb(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
				N(i);
				var o = z(i), s = L(o, !0);
				N(o), N(r);
				var c = z(r), l = (e) => {
					var t = Fb();
					W("click", t, () => I(y, null)), K(e, t);
				};
				J(c, (e) => {
					H(y) && e(l);
				}), N(n);
				var u = z(n, 2), d = L(u, !0);
				N(u);
				var f = z(u, 2), p = (e) => {
					var t = Ib(), n = z(L(t)), r = L(n, !0);
					N(n), N(t), V((e) => q(r, e), [() => (H(b), U(() => JSON.stringify(H(b).data.payload, null, 2)))]), K(e, t);
				};
				J(f, (e) => {
					H(b), U(() => H(b).data.payload) && e(p);
				});
				var m = z(f, 2), h = (e) => {
					var t = Rb(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var a = z(n);
					Y(a, 5, () => (H(b), U(() => H(b).data.substeps)), (e) => e.id, (e, t) => {
						var n = Lb(), r = L(n), i = L(r, !0);
						N(r);
						var a = z(r), o = L(a, !0);
						N(a), N(n), V((e, t) => {
							q(i, e), q(o, t);
						}, [() => (H(t), U(() => new Date(H(t).createdAt).toLocaleTimeString())), () => (H(t), U(() => de(H(t).type)))]), K(e, n);
					}), N(a), N(t), V(() => q(i, (H(b), U(() => H(b).data.substeps.length)))), K(e, t);
				};
				J(m, (e) => {
					H(b), U(() => H(b).data.substeps?.length) && e(h);
				}), N(t), V(() => {
					q(a, (H(b), U(() => H(b).data.kicker))), q(s, (H(b), U(() => H(b).data.title))), q(d, (H(b), U(() => H(b).data.detail)));
				}), K(e, t);
			}, a = (e) => {
				K(e, Bb());
			};
			J(r, (e) => {
				H(b) ? e(i) : e(a, -1);
			}), N(t), K(e, t);
		};
		J(ge, (e) => {
			H(_) === "workflow" ? e(ve) : e(Ee, -1);
		}), N(t), V((e) => {
			X(t, 1, `campaign-map mode-${H(_) ?? ""}`), q(l, e), m = X(p, 1, "", null, m, { active: H(_) === "workflow" }), O = X(x, 1, "", null, O, { active: H(_) === "replay" }), A = X(k, 1, "", null, A, { active: H(_) === "history" });
		}, [() => (H(_), H(w), H(g), U(() => H(_) === "workflow" ? "Packet → checked plan → bounded wave → evidence → decision. Side lines feed the route without bypassing its gates." : H(_) === "replay" ? `Read-only playback of ${H(w).length} loaded milestone${H(w).length === 1 ? "" : "s"} from ${be(H(g))} durable events.` : `${Te(H(g)).length} matching loaded milestones; ${be(H(g))} durable events are available.`))]), W("click", p, () => je("workflow")), W("click", x, () => je("replay")), W("click", k, () => je("history")), K(e, t);
	};
	J(Pe, (e) => {
		H(g) && e(Fe);
	}), _o("innerWidth", (e) => I(x, e)), K(e, Ne), xt(), i();
}
//#endregion
//#region src/ui/LoopControl.svelte
Zi(["click", "input"]), Ho();
var Wb = /* @__PURE__ */ G("<div class=\"loop-error\" role=\"alert\"><strong>Paused safely</strong><span> </span></div>"), Gb = /* @__PURE__ */ G("<p> </p>"), Kb = /* @__PURE__ */ G("<div class=\"loop-resolution\"><span> </span> <strong> </strong> <!></div>"), qb = /* @__PURE__ */ G("<div class=\"loop-resolution\"><span>REQUIRED BEFORE AUTOPILOT CAN CONTINUE</span> <strong> </strong> <p> </p></div>"), Jb = /* @__PURE__ */ G("<li><b> </b><div><strong> </strong><span> </span><p> </p></div><i> </i></li>"), Yb = /* @__PURE__ */ G("<li><strong> </strong><span> </span></li>"), Xb = /* @__PURE__ */ G("<details class=\"schedule-deferred\"><summary>Deferred candidates <strong> </strong></summary><ul></ul></details>"), Zb = /* @__PURE__ */ G("<details class=\"scheduled-wave\"><summary><span> </span><strong> </strong></summary> <div class=\"scheduled-wave-body\"><div class=\"schedule-budget\"><span><b> </b> tokens reserved</span><span><b> </b> available slots</span><span><b> </b> schedule state</span></div> <ol></ol> <!> <footer><b> </b><span> </span></footer></div></details>"), Qb = /* @__PURE__ */ G("<button class=\"primary-button autopilot-start-button\" disabled=\"\">▶ Start one-loop autopilot</button> <button class=\"outline-button compact autopilot-unlock-button\"> </button>", 1), $b = /* @__PURE__ */ G("<button class=\"outline-button compact\">Stop & capture here</button>"), ex = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button> <!>", 1), tx = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button>"), nx = /* @__PURE__ */ G("<!> <!>", 1), rx = /* @__PURE__ */ G("<button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), ix = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), ax = /* @__PURE__ */ G("<button class=\"primary-button\"> </button>"), ox = /* @__PURE__ */ G("<div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div>"), sx = /* @__PURE__ */ G("<div class=\"loop-boundary pending\"><span>END · PENDING</span><strong> </strong></div>"), cx = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small></div></li>"), lx = /* @__PURE__ */ G("<ol class=\"loop-context-steps\"></ol>"), ux = /* @__PURE__ */ G("<div role=\"status\"><span> </span></div>"), dx = /* @__PURE__ */ G("<section id=\"loop-control\" aria-live=\"polite\"><div class=\"loop-control-heading\"><div><p class=\"eyebrow\">ONE-LOOP AUTOPILOT</p> <h3> </h3> <p> </p></div> <span> </span></div> <!> <!> <!> <!> <div class=\"loop-control-row\"><div class=\"loop-now\"><span> </span> <strong> </strong></div> <div class=\"loop-buttons\"><!></div></div> <details class=\"loop-context\"><summary>Loop record & step ledger <strong> </strong></summary> <div class=\"loop-boundaries\"><div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div> <!></div> <!></details> <!></section>");
function fx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(), m = /* @__PURE__ */ F(), h = /* @__PURE__ */ F(), g = /* @__PURE__ */ F(), _ = /* @__PURE__ */ F(), v = /* @__PURE__ */ F(), y = /* @__PURE__ */ F(), b = /* @__PURE__ */ F(), x = /* @__PURE__ */ F(), S = /* @__PURE__ */ F(null), C = /* @__PURE__ */ F(""), w = /* @__PURE__ */ F(""), T = /* @__PURE__ */ F("pending"), E = {
		SYNTHESIS_READY: "results ready",
		SYNTHESIZING: "synthesizing situation",
		DECISION_REQUIRED: "direction decision",
		RESEARCH_REVIEW: "wave planning",
		RESEARCH_READY: "human launch gate",
		RESEARCH_RUNNING: "wave out",
		RESEARCH_INTAKE: "landing and intake",
		NEXT_WAVE_READY: "next wave ready",
		PLANNING: "planning"
	}, D = {
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
	function O(e = "PLANNING") {
		return E[e] || e.toLowerCase().replaceAll("_", " ");
	}
	function k(e) {
		if (!e) return "Pending";
		let t = new Date(e);
		return Number.isFinite(t.getTime()) ? t.toLocaleString() : "Pending";
	}
	function A(e) {
		let t = e?.runCounts || {}, n = Number(t.returned_to_sol || 0) + Number(t.evidence_ready || 0);
		return e?.latestRun?.taskId ? `${e.latestRun.taskId} · ${e.latestRun.status || "recorded"}` : `${n} landed research receipt${n === 1 ? "" : "s"}`;
	}
	async function j(e, t = "", n = {}) {
		if (!(!H(S) || H(C))) {
			I(C, e), I(T, "pending"), I(w, D[e]?.pending || "Updating autopilot…");
			try {
				await ns({
					projectId: H(S).id,
					type: e,
					targetId: t,
					args: n,
					scope: "loop-control",
					pollLimit: e === "research.schedule.dispatch" ? 160 : 32
				}), I(T, "success"), I(w, D[e]?.completed || "Autopilot updated.");
			} catch (e) {
				I(T, "error"), I(w, e instanceof Error ? e.message : String(e));
			} finally {
				I(C, "");
			}
		}
	}
	function ee() {
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
	B(() => n(), () => {
		I(S, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(S), () => {
		I(a, H(S)?.loop || null);
	}), B(() => H(a), () => {
		I(o, !!(H(a) && [
			"running",
			"paused",
			"attention"
		].includes(H(a).status)));
	}), B(() => H(a), () => {
		I(s, H(a)?.steps || []);
	}), B(() => (H(s), H(a)), () => {
		I(c, H(s).find((e) => e.actionId === H(a)?.pendingActionId) || H(s).at(-1));
	}), B(() => H(S), () => {
		I(l, H(S)?.researchRuns?.find((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || null);
	}), B(() => H(S), () => {
		I(u, H(S)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || []);
	}), B(() => H(S), () => {
		I(d, H(S)?.researchSchedule || null);
	}), B(() => H(S), () => {
		I(f, H(S)?.phase === "RESEARCH_READY");
	}), B(() => H(d), () => {
		I(p, !!(H(d) && [
			"completed",
			"failed",
			"superseded"
		].includes(H(d).status)));
	}), B(() => (H(f), H(d), H(p)), () => {
		I(m, H(f) && (!H(d) || H(p)));
	}), B(() => (H(d), H(p), H(S)), () => {
		I(h, !!(H(d) && !H(p) && [
			"RESEARCH_READY",
			"RESEARCH_RUNNING",
			"RESEARCH_INTAKE",
			"SYNTHESIZING"
		].includes(H(S)?.phase || "")));
	}), B(() => (H(S), H(o), H(f), H(d)), () => {
		I(g, !!(H(S) && !H(o) && !H(S).canStartLoop && H(S).loopStart?.blocker && !(H(f) && H(d) && ["proposed", "confirmed"].includes(H(d).status))));
	}), B(() => H(S), () => {
		I(_, H(S)?.strategy?.workspace?.activeReview?.status === "drafted" ? H(S).strategy.workspace.activeReview.response?.proposal : null);
	}), B(() => (H(g), H(f), H(d), H(a)), () => {
		I(v, H(g) ? "PREFLIGHT BLOCKED" : H(f) && H(d)?.status === "proposed" ? "CONFIRM WAVE" : H(f) && H(d)?.status === "confirmed" ? "WAVE RESERVED" : {
			running: "RUNNING",
			paused: "PAUSED",
			attention: "NEEDS ATTENTION",
			completed: "LOOP COMPLETE",
			stopped: "STOPPED"
		}[H(a)?.status || ""] || "READY");
	}), B(() => (H(g), H(f), H(d), H(a)), () => {
		I(y, H(g) || H(f) && H(d)?.status === "proposed" ? "attention" : H(f) && H(d)?.status === "confirmed" ? "paused" : H(a)?.status === "attention" ? "attention" : H(a)?.status === "completed" ? "complete" : H(a)?.status || "ready");
	}), B(() => H(S), () => {
		I(b, H(S)?.researchPlan?.response?.operatorGuidance || H(S)?.wave?.synthesis?.response?.operatorBrief?.nextDecision || "Resolve the required human gate, then autopilot can recheck the boundary.");
	}), B(() => H(S), () => {
		I(x, H(S)?.phase === "RESEARCH_REVIEW" && H(S)?.researchPlan?.status === "drafted" && H(S)?.researchPlan?.response?.decision === "BLOCKED" && H(S)?.researchPlan?.response?.lanes?.some((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), Br(), vo();
	var M = ca(), ne = R(M), re = (e) => {
		var t = dx(), n = L(t), r = L(n), i = z(L(r), 2), E = L(i, !0);
		N(i);
		var D = z(i, 2), M = L(D, !0);
		N(D), N(r);
		var ne = z(r, 2), re = L(ne, !0);
		N(ne), N(n);
		var ie = z(n, 2), ae = (e) => {
			var t = Wb(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V(() => q(r, (H(a), U(() => H(a).error)))), K(e, t);
		};
		J(ie, (e) => {
			H(a), H(x), U(() => H(a)?.error && !H(x)) && e(ae);
		});
		var oe = z(ie, 2), se = (e) => {
			var t = Kb(), n = L(t), r = L(n);
			N(n);
			var i = z(n, 2), a = L(i, !0);
			N(i);
			var o = z(i, 2), s = (e) => {
				var t = Gb(), n = L(t);
				N(t), V((e, t) => q(n, `${e ?? ""} required · ${t ?? ""} currently schedulable · no workflow transition was consumed.`), [() => (H(S), U(() => Number(H(S).loopStart.minimumRunnableTokenCap).toLocaleString())), () => (H(S), U(() => Number(H(S).loopStart.effectiveTokenLimit || 0).toLocaleString()))]), K(e, t);
			};
			J(o, (e) => {
				H(S), U(() => H(S)?.loopStart?.minimumRunnableTokenCap) && e(s);
			}), N(t), V((e) => {
				q(r, `AUTOMATION START PREFLIGHT · ${e ?? ""}`), q(a, (H(S), U(() => H(S)?.loopStart?.blocker)));
			}, [() => (H(S), U(() => H(S)?.loopStart?.code?.replaceAll("_", " ")))]), K(e, t);
		};
		J(oe, (e) => {
			H(g) && e(se);
		});
		var ce = z(oe, 2), le = (e) => {
			var t = qb(), n = z(L(t), 2), r = L(n, !0);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i), N(t), V(() => {
				q(r, (H(a), U(() => H(a).resumeBlocker))), q(o, H(b));
			}), K(e, t);
		};
		J(ce, (e) => {
			H(a), H(x), U(() => H(a)?.status === "attention" && H(a).resumeBlocker && !H(x)) && e(le);
		});
		var ue = z(ce, 2), de = (e) => {
			var t = Zb(), n = L(t), r = L(n), i = L(r);
			N(r);
			var a = z(r), o = L(a);
			N(a), N(n);
			var s = z(n, 2), c = L(s), l = L(c), u = L(l), f = L(u, !0);
			N(u), Ke(), N(l);
			var p = z(l), m = L(p), h = L(m);
			N(m), Ke(), N(p);
			var g = z(p), _ = L(g), v = L(_, !0);
			N(_), Ke(), N(g), N(c);
			var y = z(c, 2);
			Y(y, 5, () => (H(d), U(() => H(d).members || [])), (e) => e.requestId, (e, t) => {
				var n = Jb(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c);
				var u = z(c), d = L(u, !0);
				N(u), N(a);
				var f = z(a), p = L(f, !0);
				N(f), N(n), V((e) => {
					q(i, (H(t), U(() => H(t).ordinal))), q(s, (H(t), U(() => H(t).taskId))), q(l, `${H(t), U(() => H(t).profile) ?? ""} · cap ${e ?? ""} · ${H(t), U(() => H(t).trackId) ?? ""}/${H(t), U(() => H(t).workKind) ?? ""}`), q(d, (H(t), U(() => H(t).expectedDelta))), q(p, (H(t), U(() => H(t).status)));
				}, [() => (H(t), U(() => H(t).tokenCap?.toLocaleString()))]), K(e, n);
			}), N(y);
			var b = z(y, 2), x = (e) => {
				var t = Xb(), n = L(t), r = z(L(n)), i = L(r, !0);
				N(r), N(n);
				var a = z(n);
				Y(a, 5, () => (H(d), U(() => H(d).deferred)), (e) => e.requestId, (e, t) => {
					var n = Yb(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a);
					N(a), N(n), V((e) => {
						q(i, (H(t), U(() => H(t).taskId))), q(o, `${e ?? ""} · ${H(t), U(() => H(t).decisionReason) ?? ""}`);
					}, [() => (H(t), U(() => H(t).decision.replaceAll("_", " ")))]), K(e, n);
				}), N(a), N(t), V(() => q(i, (H(d), U(() => H(d).deferred.length)))), K(e, t);
			};
			J(b, (e) => {
				H(d), U(() => H(d).deferred?.length) && e(x);
			});
			var S = z(b, 2), C = L(S), w = L(C, !0);
			N(C);
			var T = z(C), E = L(T, !0);
			N(T), N(S), N(s), N(t), V((e, n, r) => {
				t.open = (H(d), U(() => H(d).status === "proposed")), q(i, `IMMUTABLE WAVE SCHEDULE · ${e ?? ""}…`), q(o, `${H(d), U(() => H(d).members?.length || 0) ?? ""} reserved · ${H(d), U(() => H(d).deferred?.length || 0) ?? ""} deferred`), q(f, n), q(h, `${H(d), U(() => H(d).proposal?.slots?.reserved || 0) ?? ""}/${H(d), U(() => H(d).proposal?.slots?.available || 0) ?? ""}`), q(v, r), q(w, (H(d), U(() => H(d).authority === "operator-confirmed-reservation" ? "OPERATOR-CONFIRMED RESERVATION" : H(d).authority === "operator-confirmed-execution" ? "BOUND SCHEDULE EXECUTION" : "NO DISPATCH AUTHORITY"))), q(E, (H(d), U(() => H(d).authority === "operator-confirmed-reservation" ? "Only the fixed members above may now be dispatched." : H(d).authority === "operator-confirmed-execution" ? "Member status and batch intake remain bound to the confirmed digest." : "Confirming the exact digest is required before any member can launch.")));
			}, [
				() => (H(d), U(() => H(d).digest?.slice(0, 18))),
				() => (H(d), U(() => H(d).proposal?.budget?.reservedTokens?.toLocaleString() || 0)),
				() => (H(d), U(() => H(d).status.toUpperCase()))
			]), K(e, t);
		};
		J(ue, (e) => {
			H(h) && e(de);
		});
		var fe = z(ue, 2), pe = L(fe), me = L(pe), he = L(me, !0);
		N(me);
		var ge = z(me, 2), _e = L(ge, !0);
		N(ge), N(pe);
		var ve = z(pe, 2), ye = L(ve), be = (e) => {
			var t = Qb(), n = z(R(t), 2), r = L(n, !0);
			N(n), V(() => q(r, (H(_), U(() => H(_)?.epochLabel ? "Review Epoch 2 resource proposal →" : "Open strategy & resources →")))), W("click", n, te), K(e, t);
		}, xe = (e) => {
			var t = ex(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = $b();
				V((e) => t.disabled = e, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("loop.stop")), K(e, t);
			};
			J(i, (e) => {
				H(o) && e(a);
			}), V((e) => {
				n.disabled = e, q(r, H(C) ? "Freezing…" : "Freeze wave schedule");
			}, [() => (H(C), U(() => !!H(C)))]), W("click", n, () => j("research.schedule.prepare")), K(e, t);
		}, Se = (e) => {
			var t = ex(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = $b();
				V((e) => t.disabled = e, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("loop.stop")), K(e, t);
			};
			J(i, (e) => {
				H(o) && e(a);
			}), V((e) => {
				n.disabled = e, q(r, (H(C), H(d), U(() => H(C) ? "Confirming…" : `Confirm ${H(d).members?.length || 0}-lane schedule`)));
			}, [() => (H(C), U(() => !!H(C)))]), W("click", n, () => j("research.schedule.confirm", H(d).id, { scheduleDigest: H(d).digest })), K(e, t);
		}, Ce = (e) => {
			var t = nx(), n = R(t), r = (e) => {
				var t = tx(), n = L(t, !0);
				N(t), V((e) => {
					t.disabled = e, q(n, H(C) ? "Resuming…" : "Resume & dispatch wave");
				}, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("loop.resume")), K(e, t);
			}, i = (e) => {
				var t = tx(), n = L(t, !0);
				N(t), V((e) => {
					t.disabled = e, q(n, (H(C), H(d), U(() => H(C) ? "Dispatching…" : `Dispatch ${H(d).members?.length || 0}-lane wave`)));
				}, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("research.schedule.dispatch", H(d).id, { scheduleDigest: H(d).digest })), K(e, t);
			};
			J(n, (e) => {
				H(a), U(() => H(a)?.status === "paused" || H(a)?.status === "attention") ? e(r) : (H(a), U(() => H(a)?.status !== "running") && e(i, 1));
			});
			var s = z(n, 2), c = (e) => {
				var t = $b();
				V((e) => t.disabled = e, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("loop.stop")), K(e, t);
			};
			J(s, (e) => {
				H(o) && e(c);
			}), K(e, t);
		}, we = (e) => {
			var t = rx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i);
			var s = z(i, 2);
			V((e, t, c) => {
				n.disabled = e, q(r, H(l) ? "Pause automation" : "Pause now"), i.disabled = t, q(o, (H(a), U(() => H(a).pendingActionId ? "Halt after this step" : "Pause before next step"))), s.disabled = c;
			}, [
				() => (H(C), U(() => !!H(C))),
				() => (H(C), U(() => !!H(C))),
				() => (H(C), U(() => !!H(C)))
			]), W("click", n, () => j("loop.pause")), W("click", i, () => j("loop.halt-after-step")), W("click", s, () => j("loop.stop")), K(e, t);
		}, Te = (e) => {
			var t = ix(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2);
			V((e, t) => {
				n.disabled = e, q(r, H(C) === "loop.resume" ? "Rechecking…" : "Recheck & resume"), i.disabled = t;
			}, [() => (H(C), U(() => !!H(C))), () => (H(C), U(() => !!H(C)))]), W("click", n, () => j("loop.resume")), W("click", i, () => j("loop.stop")), K(e, t);
		}, Ee = (e) => {
			var t = ix(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2);
			V((e) => {
				q(r, H(x) ? "Review & approve DOC-A1" : "Resolve the required gate"), i.disabled = e;
			}, [() => (H(C), U(() => !!H(C)))]), W("click", n, ee), W("click", i, () => j("loop.stop")), K(e, t);
		}, De = (e) => {
			var t = ax(), n = L(t, !0);
			N(t), V((e) => {
				t.disabled = e, q(n, (H(C), H(a), H(S), U(() => H(C) === "loop.start" ? "Starting…" : H(a)?.status === "completed" ? "Run another complete loop" : H(S).phase === "DECISION_REQUIRED" ? "Run one complete loop" : "Continue this loop automatically")));
			}, [() => (H(C), U(() => !!H(C)))]), W("click", t, () => j("loop.start")), K(e, t);
		};
		J(ye, (e) => {
			H(g) ? e(be) : H(m) ? e(xe, 1) : (H(f), H(d), U(() => H(f) && H(d)?.status === "proposed") ? e(Se, 2) : (H(f), H(d), U(() => H(f) && H(d)?.status === "confirmed") ? e(Ce, 3) : (H(a), U(() => H(a)?.status === "running") ? e(we, 4) : (H(a), U(() => H(a)?.status === "paused" || H(a)?.status === "attention" && H(a).canResume) ? e(Te, 5) : (H(a), U(() => H(a)?.status === "attention") ? e(Ee, 6) : (H(S), U(() => H(S).canStartLoop) && e(De, 7)))))));
		}), N(ve), N(fe);
		var Oe = z(fe, 2), ke = L(Oe), Ae = z(L(ke)), je = L(Ae);
		N(Ae), N(ke);
		var Me = z(ke, 2), Ne = L(Me), Pe = L(Ne), Fe = L(Pe);
		N(Pe);
		var Ie = z(Pe, 2), Le = L(Ie, !0);
		N(Ie);
		var Re = z(Ie, 2), ze = L(Re);
		N(Re), N(Ne);
		var Be = z(Ne, 2), Ve = (e) => {
			var t = ox(), n = L(t), r = L(n);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i);
			var s = z(i, 2), c = L(s);
			N(s), N(t), V((e, t, n) => {
				q(r, `END · ${e ?? ""}`), q(o, t), q(c, `${H(a), U(() => H(a).end.waveLabel || "No named wave") ?? ""} · ${n ?? ""}`);
			}, [
				() => (H(a), U(() => k(H(a).end.capturedAt))),
				() => (H(a), U(() => O(H(a).end.phase))),
				() => (H(a), U(() => A(H(a).end)))
			]), K(e, t);
		}, He = (e) => {
			var t = sx(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V(() => q(r, H(o) ? "Captured when this run stops" : "Not captured")), K(e, t);
		};
		J(Be, (e) => {
			H(a), U(() => H(a)?.end?.capturedAt) ? e(Ve) : e(He, -1);
		}), N(Me);
		var Ue = z(Me, 2), We = (e) => {
			var t = lx();
			Y(t, 5, () => H(s), (e) => e.actionId, (e, t) => {
				var n = cx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e) => {
					X(n, 1, Ma((H(t), U(() => H(t).status)))), q(i, (H(t), U(() => H(t).index))), q(s, (H(t), U(() => H(t).label))), q(l, `${H(t), U(() => H(t).status) ?? ""}${H(t), U(() => H(t).attemptCount && H(t).attemptCount > 1 ? ` · attempt ${H(t).attemptCount}` : "") ?? ""}${e ?? ""}`);
				}, [() => (H(t), U(() => H(t).completedAt ? ` · ${k(H(t).completedAt)}` : ""))]), K(e, n);
			}), N(t), K(e, t);
		};
		J(Ue, (e) => {
			H(s), U(() => H(s).length) && e(We);
		}), N(Oe);
		var Ge = z(Oe, 2), qe = (e) => {
			var t = ux(), n = L(t), r = L(n, !0);
			N(n), N(t), V(() => {
				X(t, 1, `gate-feedback loop-feedback ${H(T) ?? ""}`), q(r, H(w));
			}), K(e, t);
		};
		J(Ge, (e) => {
			H(w) && e(qe);
		}), N(t), V((e, n, r, i, p) => {
			X(t, 1, `loop-control ${H(y) ?? ""}`), q(E, (H(g), H(m), H(f), H(d), H(x), H(l), H(u), H(o), H(c), H(a), U(() => H(g) ? "Recenter resources before starting the loop" : H(m) ? "Freeze the resource-bounded wave" : H(f) && H(d)?.status === "proposed" ? `Confirm ${H(d).members?.length || 0} scheduled member${H(d).members?.length === 1 ? "" : "s"}` : H(f) && H(d)?.status === "confirmed" ? "Dispatch the confirmed wave" : H(x) ? "Paused for one operator approval" : H(l) ? `${H(u).length} bounded lane${H(u).length === 1 ? " is" : "s are"} working` : H(o) ? H(c)?.label || (H(a)?.status === "attention" ? "Waiting at a checked boundary" : "Watching for the next safe step") : H(a)?.status === "completed" ? "A full bounded loop is captured" : "Continue to the next fresh decision"))), q(M, e), X(ne, 1, `loop-status ${H(y) ?? ""}`), q(re, H(v)), q(he, (H(f), H(a), H(o), U(() => H(f) ? "Current position" : H(a)?.haltAfterStep ? "Halt armed" : H(o) ? "Current position" : "Scope"))), q(_e, (H(g), H(m), H(f), H(d), H(x), H(l), H(a), H(c), U(() => H(g) ? "Resource gate → unlock autopilot" : H(m) ? "Checked plan → freeze schedule" : H(f) && H(d)?.status === "proposed" ? "Resource frontier frozen → operator confirmation" : H(f) && H(d)?.status === "confirmed" ? "Operator confirmed → bounded wave dispatch" : H(x) ? "DOC-A1 preflight passed · your approval is next" : H(l) ? `${H(l).taskId} · ${H(l).status}` : H(a)?.haltAfterStep ? "Will pause when this step settles" : H(c) ? `${H(c).index}. ${H(c).label} · ${H(c).status}` : "One decision-to-decision cycle"))), q(je, `${n ?? ""}/${H(s), U(() => H(s).length) ?? ""} settled`), q(Fe, `START · ${r ?? ""}`), q(Le, i), q(ze, `${H(a), U(() => H(a)?.start?.waveLabel || "No named wave") ?? ""} · ${p ?? ""}`);
		}, [
			() => (H(g), H(S), H(m), H(p), H(f), H(d), H(x), H(l), H(u), U(() => H(g) ? H(S)?.loopStart?.blocker : H(m) ? `${H(p) ? "The previous schedule is closed. " : ""}Freeze the current dependency-safe frontier under the slot and token policy before operator review.` : H(f) && H(d)?.status === "proposed" ? "Review the exact tasks, contracts, resource caps, and deferred lanes below. Confirmation reserves this digest but launches nothing." : H(f) && H(d)?.status === "confirmed" ? "The operator gate is captured. Dispatch will launch only these immutable members and will preserve a batch evidence boundary." : H(x) ? "The checked staging evidence is ready; approve DOC-A1 below, then Sol will replan automatically." : H(l) ? `${H(u).map((e) => e.taskId).join(", ")}. Autopilot will wait for the whole wave, perform batch intake, and continue the loop.` : "decision → checked plan → resource-bounded wave → custody → batch synthesis → next decision. Every action and receipt stays inspectable.")),
			() => (H(s), U(() => H(s).filter((e) => e.status === "completed").length)),
			() => (H(a), U(() => k(H(a)?.start?.capturedAt))),
			() => (H(a), U(() => O(H(a)?.start?.phase))),
			() => (H(a), U(() => A(H(a)?.start)))
		]), K(e, t);
	};
	J(ne, (e) => {
		H(S) && e(re);
	}), K(e, M), xt(), i();
}
//#endregion
//#region src/ui/HeaderAutopilot.svelte
Zi(["click"]), Ho();
var px = /* @__PURE__ */ G("<div><span><small>AUTOPILOT</small><strong> </strong></span> <button type=\"button\"><i aria-hidden=\"true\"></i> </button></div>");
function mx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F("");
	function h() {
		if (H(f)?.loopStart?.code === "EPOCH_BUDGET") {
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
		if (!(!H(f) || H(p) || !n().access?.canMutate)) {
			if (!H(c)) {
				h();
				return;
			}
			I(p, !0), I(m, "");
			try {
				await ns({
					projectId: H(f).id,
					type: H(c),
					scope: "header-autopilot",
					pollLimit: 80
				});
			} catch (e) {
				I(m, e instanceof Error ? e.message : String(e));
			} finally {
				I(p, !1);
			}
		}
	}
	B(() => n(), () => {
		I(f, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(f), () => {
		I(a, H(f)?.loop || null);
	}), B(() => H(a), () => {
		I(o, H(a)?.status === "running");
	}), B(() => H(a), () => {
		I(s, ["paused", "attention"].includes(H(a)?.status || "") && !!(H(a)?.canResume || H(a)?.status === "paused"));
	}), B(() => (H(o), H(s), H(f)), () => {
		I(c, H(o) ? "loop.pause" : H(s) ? "loop.resume" : H(f)?.canStartLoop ? "loop.start" : "");
	}), B(() => (H(o), H(s), H(f)), () => {
		I(l, H(o) ? "ON" : H(s) ? "PAUSED" : H(f)?.canStartLoop ? "READY" : "BLOCKED");
	}), B(() => (H(p), H(o), H(s), H(f)), () => {
		I(u, H(p) ? "Working…" : H(o) ? "Pause" : H(s) ? "Resume" : H(f)?.canStartLoop ? "Start" : "Manage blocker");
	}), B(() => (H(m), H(c), H(u), H(f)), () => {
		I(d, H(m) || (H(c) ? `${H(u)} one-loop autopilot` : H(f)?.loopStart?.blocker || "Open the current campaign gate"));
	}), Br(), vo();
	var _ = ca(), v = R(_), y = (e) => {
		var t = px();
		let r;
		var i = L(t), a = z(L(i)), f = L(a, !0);
		N(a), N(i);
		var m = z(i, 2), h = z(L(m), 1, !0);
		N(m), N(t), V(() => {
			r = X(t, 1, "header-autopilot", null, r, {
				active: H(o),
				paused: H(s),
				blocked: !H(c)
			}), q(f, H(l)), Z(m, "aria-label", `${H(u)} one-loop autopilot`), Z(m, "aria-pressed", H(o)), m.disabled = (H(p), n(), U(() => H(p) || n().access?.canMutate === !1)), Z(m, "title", H(d)), q(h, H(u));
		}), W("click", m, g), K(e, t);
	};
	J(v, (e) => {
		H(f) && e(y);
	}), K(e, _), xt(), i();
}
//#endregion
//#region src/ui/CampaignProcessTracker.svelte
Zi(["click"]), Ho();
var hx = /* @__PURE__ */ G("<li><span></span> <div><strong> </strong><small> </small></div></li>"), gx = /* @__PURE__ */ G("<section class=\"process-tracker\" id=\"process-tracker\" aria-label=\"Campaign process tracker\"><header><div><p class=\"eyebrow\">CAMPAIGN PROCESS</p><h2> </h2></div> <span><b> </b> </span></header> <ol></ol> <footer><span><b>NOW</b> </span> <span><b>CAMPAIGN</b> </span></footer></section>");
function _x(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = [
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
	}, p = /* @__PURE__ */ F(null);
	B(() => n(), () => {
		I(p, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(p), () => {
		I(a, d[H(p)?.phase || ""] || "plan");
	}), B(() => H(a), () => {
		I(o, Math.max(0, u.findIndex((e) => e.id === H(a))));
	}), B(() => H(p), () => {
		I(s, H(p)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)).length || 0);
	}), B(() => H(p), () => {
		I(c, H(p)?.loop?.steps?.filter((e) => e.status === "completed").length || 0);
	}), B(() => H(p), () => {
		I(l, H(p)?.loop?.steps?.length || 0);
	}), Br(), vo();
	var m = ca(), h = R(m), g = (e) => {
		var t = gx(), n = L(t), r = L(n), i = z(L(r)), d = L(i, !0);
		N(i), N(r);
		var m = z(r, 2), h = L(m), g = L(h, !0);
		N(h);
		var _ = z(h, 1, !0);
		N(m), N(n);
		var v = z(n, 2);
		Y(v, 5, () => u, _a, (e, t, n) => {
			var r = hx();
			let i;
			var s = L(r);
			s.textContent = n + 1;
			var c = z(s, 2), l = L(c), u = L(l, !0);
			N(l);
			var d = z(l), f = L(d, !0);
			N(d), N(c), N(r), V(() => {
				i = X(r, 1, "", null, i, {
					current: H(t).id === H(a),
					passed: n < H(o)
				}), q(u, (H(t), U(() => H(t).short))), q(f, (H(t), U(() => H(t).label)));
			}), K(e, r);
		}), N(v);
		var y = z(v, 2), b = L(y), x = z(L(b), 1, !0);
		N(b);
		var S = z(b, 2), C = z(L(S), 1, !0);
		N(S), N(y), N(t), V((e) => {
			q(d, (H(p), U(() => f[H(p).phase] || "Track the next bounded move"))), q(g, e), q(_, H(s) ? `${H(s)} active lane${H(s) === 1 ? "" : "s"}` : H(l) ? `${H(c)}/${H(l)} loop steps settled` : "No active execution"), q(x, (H(o), U(() => u[H(o)].label))), q(C, (H(p), U(() => H(p).strategy?.workspace?.activeReview?.response?.proposal?.epochLabel || H(p).strategy?.epoch?.label || H(p).role)));
		}, [() => (H(p), U(() => H(p).phase.replaceAll("_", " ")))]), K(e, t);
	};
	J(h, (e) => {
		H(p) && e(g);
	}), K(e, m), xt(), i();
}
//#endregion
//#region src/ui/OperatorGate.svelte
Ho();
var vx = /* @__PURE__ */ G("<div class=\"gate-feedback error\" role=\"alert\"><span> </span></div>"), yx = /* @__PURE__ */ G("<div class=\"operator-gate-callout\"><strong>The first action is read-only</strong> <p>It resolves the exact source commit, confirms both approved SHA-256 hashes, checks that main is clean, and previews the lineage merge. It changes no Git or campaign authority.</p> <button class=\"primary-button\"> </button></div> <!>", 1), bx = /* @__PURE__ */ G("<div class=\"operator-gate-preview\"><div class=\"operator-gate-ready\"><div><span>READINESS CHECK PASSED</span> <strong>Exact DOC-A1 transition is ready</strong> <small>3 local custody commits · no push · no worker dispatch</small></div> <label class=\"operator-gate-confirm\"><input type=\"checkbox\"/><span>Approve Proposal A’s exact bytes as DOC-A1.</span></label> <button class=\"primary-button operator-gate-approve\"> </button></div> <details class=\"operator-gate-technical\"><summary>Inspect commits, paths, hashes, and effects <strong>Preflight receipt</strong></summary> <div class=\"operator-gate-summary\"><div><span>FROM FROZEN STAGING HEAD</span><strong> </strong><small> </small></div> <div><span>INTO CLEAN MAIN</span><strong> </strong><small> </small></div></div> <ul><li><code>CONTRACT.md</code><span> </span></li> <li><code>output/preimage-spec.json</code><span> </span></li> <li><code>evidence-receipt.json</code><span>new DKC successor receipt</span></li></ul> <div class=\"operator-gate-effects\"><strong>BOUNDARY EFFECTS</strong> <p>Creates one local lineage-intake merge, one exact document commit, and one successor-receipt commit. It does not push, dispatch a worker, authorize SAT or Mac work, or promote a mathematical claim.</p></div> <button class=\"outline-button compact\">Recheck readiness</button></details></div>"), xx = /* @__PURE__ */ G("<div role=\"status\"><span> </span></div>"), Sx = /* @__PURE__ */ G("<section class=\"operator-gate\" id=\"operator-gate\" aria-live=\"polite\"><div class=\"operator-gate-heading\"><div><p class=\"eyebrow\">REQUIRED OPERATOR TRANSITION</p> <h2>Adopt Proposal A as DOC-A1</h2> <p>This is the missing bridge between the checked staging evidence and the next runnable cold-replay lane.</p></div> <span class=\"operator-gate-status\">HUMAN GATE</span></div> <div class=\"operator-gate-path\" aria-label=\"Operator transition progress\"><span>✓ Verified</span><i>→</i><span class=\"current\">Your approval</span><i>→</i><span>Sol replans</span></div> <!> <!></section>");
function Cx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F("pending");
	function g(e = "") {
		return e ? `${e.slice(0, 10)}…${e.slice(-6)}` : "not recorded";
	}
	async function _(e, t = {}) {
		if (!H(d) || H(f)) throw Error("Another gate action is still settling");
		I(f, e), I(h, "pending"), I(m, e.endsWith("prepare") ? "Checking the exact lineage, byte hashes, clean worktree, and merge preview…" : "Applying the explicitly approved local authority transition…");
		try {
			let n = await ns({
				projectId: H(d).id,
				type: e,
				args: t,
				scope: "operator-gate"
			});
			return I(h, "success"), I(m, e.endsWith("prepare") ? "Preflight passed. Review the frozen source, target paths, and exact hashes below." : "DOC-A1 landed locally with a successor receipt. Autopilot is asking Sol to bind the cold replay to the new head."), n.action;
		} catch (e) {
			throw I(h, "error"), I(m, e instanceof Error ? e.message : String(e)), e;
		} finally {
			I(f, "");
		}
	}
	async function v() {
		await _("campaign.operator-transition.prepare").catch(() => void 0);
	}
	async function y() {
		!H(l) || !H(p) || await _("campaign.operator-transition.execute", {
			confirmation: "APPROVE DOC-A1",
			previewActionId: H(l).id,
			previewDigest: H(l).result?.previewDigest
		}).catch(() => void 0);
	}
	B(() => n(), () => {
		I(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(d), () => {
		I(a, H(d)?.researchPlan);
	}), B(() => H(a), () => {
		I(o, H(a)?.response?.lanes?.find((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), B(() => (H(d), H(a), H(o)), () => {
		I(s, H(d)?.phase === "RESEARCH_REVIEW" && H(a)?.status === "drafted" && H(a)?.response?.decision === "BLOCKED" && !!H(o));
	}), B(() => H(d), () => {
		I(c, H(d)?.actions || []);
	}), B(() => H(c), () => {
		I(l, H(c).find((e) => e.type === "campaign.operator-transition.prepare" && e.status === "completed") || null);
	}), B(() => H(c), () => {
		I(u, H(c).find((e) => e.type === "campaign.operator-transition.prepare") || null);
	}), Br(), vo();
	var b = ca(), x = R(b), S = (e) => {
		var t = Sx(), n = z(L(t), 2), r = L(n);
		let i;
		Ke(4), N(n);
		var a = z(n, 2), o = (e) => {
			var t = yx(), n = R(t), r = z(L(n), 4), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = (e) => {
				var t = vx(), n = L(t), r = L(n, !0);
				N(n), N(t), V(() => q(r, (H(u), U(() => H(u).error)))), K(e, t);
			};
			J(a, (e) => {
				H(u), H(m), U(() => H(u)?.status === "failed" && !H(m)) && e(o);
			}), V((e) => {
				r.disabled = e, q(i, H(f) ? "Checking readiness…" : "Check transition readiness");
			}, [() => (H(f), U(() => !!H(f)))]), W("click", r, v), K(e, t);
		}, s = (e) => {
			var t = bx(), n = L(t), r = z(L(n), 2), i = L(r);
			$a(i), Ke(), N(r);
			var a = z(r, 2), o = L(a, !0);
			N(a), N(n);
			var s = z(n, 2), c = z(L(s), 2), u = L(c), d = z(L(u)), m = L(d, !0);
			N(d);
			var h = z(d), _ = L(h, !0);
			N(h), N(u);
			var b = z(u, 2), x = z(L(b)), S = L(x, !0);
			N(x);
			var C = z(x), w = L(C);
			N(C), N(b), N(c);
			var T = z(c, 2), E = L(T), D = z(L(E)), O = L(D, !0);
			N(D), N(E);
			var k = z(E, 2), A = z(L(k)), j = L(A, !0);
			N(A), N(k), Ke(2), N(T);
			var ee = z(T, 4);
			N(s), N(t), V((e, t, n, r, i, s) => {
				a.disabled = e, q(o, t), q(m, n), q(_, (H(l), U(() => H(l).result?.sourceBranch))), q(S, r), q(w, `Conflict-free preview · ${i ?? ""}`), q(O, (H(l), U(() => H(l).result?.hashes?.contract))), q(j, (H(l), U(() => H(l).result?.hashes?.preimage))), ee.disabled = s;
			}, [
				() => (H(p), H(f), U(() => !H(p) || !!H(f))),
				() => (H(f), U(() => H(f).endsWith("execute") ? "Applying transition…" : "Approve DOC-A1 & continue")),
				() => (H(l), U(() => g(H(l).result?.sourceHead))),
				() => (H(l), U(() => g(H(l).result?.baseHead))),
				() => (H(l), U(() => g(H(l).result?.mergeTree))),
				() => (H(f), U(() => !!H(f)))
			]), co(i, () => H(p), (e) => I(p, e)), W("click", a, y), W("click", ee, v), K(e, t);
		};
		J(a, (e) => {
			H(l) ? e(s, -1) : e(o);
		});
		var c = z(a, 2), d = (e) => {
			var t = xx(), n = L(t), r = L(n, !0);
			N(n), N(t), V(() => {
				X(t, 1, `gate-feedback ${H(h) ?? ""}`), q(r, H(m));
			}), K(e, t);
		};
		J(c, (e) => {
			H(m) && e(d);
		}), N(t), V((e) => i = X(r, 1, "", null, i, e), [() => ({ done: !!H(l) })]), K(e, t);
	};
	J(x, (e) => {
		H(s) && e(S);
	}), K(e, b), xt(), i();
}
//#endregion
//#region src/ui/ActiveLaneStrip.svelte
Zi(["click"]), Ho();
var wx = /* @__PURE__ */ G("<small class=\"active-lane-loading\">Loading live detail…</small>"), Tx = /* @__PURE__ */ G("<small class=\"active-lane-error\"> </small>"), Ex = /* @__PURE__ */ G("<li><b> </b><span> </span></li>"), Dx = /* @__PURE__ */ G("<ul></ul>"), Ox = /* @__PURE__ */ G("<details class=\"active-lane-mini\"><summary><span class=\"active-lane-state\"><i aria-hidden=\"true\"></i><b> </b></span> <span class=\"active-lane-title\"><strong> </strong><small> </small></span> <span class=\"active-lane-glance\"><b> </b><small> </small></span></summary> <div class=\"active-lane-detail\"><p> </p> <!> <!> <div class=\"active-lane-facts\"><span><small>PROFILE</small><strong> </strong></span> <span><small>USAGE</small><strong> </strong></span> <span><small>JOB</small><strong> </strong></span></div> <!> <button class=\"outline-button compact\" type=\"button\">Open full lane inspector</button></div></details>"), kx = /* @__PURE__ */ G("<section class=\"active-lane-strip\" aria-label=\"Currently running campaign lanes\"><header><span><i aria-hidden=\"true\"></i><small>LIVE WAVE</small><strong> </strong></span> <b>Expand a lane to inspect</b></header> <div class=\"active-lane-list\"></div></section>");
function Ax(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F({}), s = /* @__PURE__ */ F({}), c = /* @__PURE__ */ F({});
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
		if (!(H(o)[e] || H(s)[e])) {
			I(s, {
				...H(s),
				[e]: !0
			}), I(c, {
				...H(c),
				[e]: ""
			});
			try {
				let t = await fetch(`/api/lane?id=${encodeURIComponent(e)}`, { cache: "no-store" }), n = await t.json();
				if (!t.ok) throw Error(n.error || `Could not load lane detail: ${t.status}`);
				I(o, {
					...H(o),
					[e]: n
				});
			} catch (t) {
				I(c, {
					...H(c),
					[e]: t instanceof Error ? t.message : String(t)
				});
			} finally {
				I(s, {
					...H(s),
					[e]: !1
				});
			}
		}
	}
	function p(e) {
		let t = document.querySelector("#evidence-workspace");
		t && (t.open = !0), requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("lane-watch:open-lane", { detail: { id: e } })));
	}
	B(() => n(), () => {
		I(a, (n().observer?.lanes || []).filter((e) => e.project === n().selectedProject && e.lifecycle === "active" && ["working", "idle"].includes(e.severity)).sort((e, t) => new Date(t.updatedAt || t.launchedAt).valueOf() - new Date(e.updatedAt || e.launchedAt).valueOf()));
	}), Br(), vo();
	var m = ca(), h = R(m), g = (e) => {
		var t = kx(), n = L(t), r = L(n), i = z(L(r), 2), m = L(i);
		N(i), N(r), Ke(2), N(n);
		var h = z(n, 2);
		Y(h, 5, () => H(a), (e) => e.id, (e, t) => {
			let n = /* @__PURE__ */ Cn(() => (H(o), H(t), U(() => H(o)[H(t).id] || H(t))));
			var r = Ox(), i = L(r), a = L(i), m = z(L(a)), h = L(m, !0);
			N(m), N(a);
			var g = z(a, 2), _ = L(g), v = L(_, !0);
			N(_);
			var y = z(_), b = L(y);
			N(y), N(g);
			var x = z(g, 2), S = L(x), C = L(S, !0);
			N(S);
			var w = z(S), T = L(w, !0);
			N(w), N(x), N(i);
			var E = z(i, 2), D = L(E), O = L(D, !0);
			N(D);
			var k = z(D, 2), A = (e) => {
				K(e, wx());
			};
			J(k, (e) => {
				H(s), H(t), U(() => H(s)[H(t).id]) && e(A);
			});
			var j = z(k, 2), ee = (e) => {
				var n = Tx(), r = L(n, !0);
				N(n), V(() => q(r, (H(c), H(t), U(() => H(c)[H(t).id])))), K(e, n);
			};
			J(j, (e) => {
				H(c), H(t), U(() => H(c)[H(t).id]) && e(ee);
			});
			var te = z(j, 2), M = L(te), ne = z(L(M)), re = L(ne, !0);
			N(ne), N(M);
			var ie = z(M, 2), ae = z(L(ie)), oe = L(ae, !0);
			N(ae), N(ie);
			var se = z(ie, 2), ce = z(L(se)), le = L(ce, !0);
			N(ce), N(se), N(te);
			var ue = z(te, 2), de = (e) => {
				var t = Dx();
				Y(t, 5, () => (Si(H(n)), U(() => H(n).activities.slice(0, 3))), (e) => e.id, (e, t) => {
					var n = Ex(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a), N(n), V((e) => {
						q(i, (H(t), U(() => H(t).kind))), q(o, e);
					}, [() => (H(t), U(() => l(H(t).label, 140)))]), K(e, n);
				}), N(t), K(e, t);
			};
			J(ue, (e) => {
				Si(H(n)), U(() => H(n).activities?.length) && e(de);
			});
			var fe = z(ue, 2);
			N(E), N(r), V((e, r, i) => {
				q(h, (H(t), U(() => H(t).status || H(t).severity))), q(v, (H(t), U(() => H(t).task))), q(b, `${H(t), U(() => H(t).lane) ?? ""} · ${H(t), U(() => H(t).model || "worker") ?? ""}`), q(C, (H(t), U(() => H(t).inFlight + H(t).queued ? `${H(t).inFlight + H(t).queued} active` : H(t).tempo || "observing"))), q(T, e), q(O, r), q(re, (Si(H(n)), U(() => H(n).topology?.profile || H(n).effort || "bounded worker"))), q(oe, i), q(le, (Si(H(n)), U(() => H(n).jobId || "pending")));
			}, [
				() => (H(t), U(() => u(H(t).updatedAt || H(t).launchedAt))),
				() => (H(o), H(t), U(() => l(H(o)[H(t).id]?.detail || H(t).detail || "The worker has not reported a current activity note yet.", 320))),
				() => (Si(H(n)), U(() => d(H(n).tokens)))
			]), Xi("toggle", r, (e) => e.currentTarget.open && f(H(t).id)), W("click", fe, () => p(H(t).id)), K(e, r);
		}), N(h), N(t), V(() => q(m, `${H(a), U(() => H(a).length) ?? ""} lane${H(a), U(() => H(a).length === 1 ? "" : "s") ?? ""} running`)), K(e, t);
	};
	J(h, (e) => {
		H(a), U(() => H(a).length) && e(g);
	}), K(e, m), xt(), i();
}
//#endregion
//#region src/ui/StrategyOverview.svelte
Zi(["click"]), Ho();
var jx = /* @__PURE__ */ G("<article><div><strong> </strong><span> </span></div> <div class=\"track-meter\"><i></i><b></b></div> <small> </small></article>"), Mx = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small><p> </p></div></li>"), Nx = /* @__PURE__ */ G("<article><strong> </strong><p> </p><small> </small></article>"), Px = /* @__PURE__ */ G("<div class=\"drift-list\"></div>"), Fx = /* @__PURE__ */ G("<p class=\"strategy-empty\">No active drift signal crosses the charter’s advisory thresholds.</p>"), Ix = /* @__PURE__ */ G("<section id=\"campaign-strategy\" aria-label=\"Campaign strategy and drift\" aria-live=\"polite\"><div class=\"strategy-heading\"><div><p> </p> <h2> </h2> <span> </span></div> <div class=\"strategy-status\"><strong> </strong><span>shadow mode · advisory</span></div></div> <div class=\"strategy-vitals\"><div><span>Frontier motion</span><strong> </strong><small>recorded advances</small></div> <div><span>Measured spend</span><strong> </strong><small> </small></div> <div><span>Support share</span><strong> </strong><small> </small></div> <div><span>Frontier ledger</span><strong> </strong><small> </small></div></div> <div class=\"strategy-tracks\" aria-label=\"Strategic track allocation\"></div> <details class=\"strategy-details\"><summary><span>Inspect timescales, drift evidence, and custody separation</span><strong> </strong></summary> <div class=\"strategy-detail-grid\"><section><h3>Nested control loops</h3> <ol class=\"strategy-layers\"></ol></section> <section><h3>Drift evidence</h3> <!></section></div> <p class=\"strategy-shadow-note\"><strong>Shadow mode:</strong> these measurements are supplied to Sol synthesis and lane planning, but they do not yet approve, reject, or dispatch work.</p></details></section>");
function Lx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null);
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
	B(() => n(), () => {
		I(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(a), () => {
		I(o, H(a)?.strategy || null);
	}), B(() => H(o), () => {
		I(s, H(o)?.drift?.signals?.[0] || null);
	}), Br(), vo();
	var d = ca(), f = R(d), p = (e) => {
		var t = Ix(), n = L(t), r = L(n), i = L(r), a = L(i);
		N(i);
		var d = z(i, 2), f = L(d, !0);
		N(d);
		var p = z(d, 2), m = L(p, !0);
		N(p), N(r);
		var h = z(r, 2), g = L(h), _ = L(g, !0);
		N(g), Ke(), N(h), N(n);
		var v = z(n, 2), y = L(v), b = z(L(y)), x = L(b, !0);
		N(b), Ke(), N(y);
		var S = z(y, 2), C = z(L(S)), w = L(C, !0);
		N(C);
		var T = z(C), E = L(T);
		N(T), N(S);
		var D = z(S, 2);
		let O;
		var k = z(L(D)), A = L(k, !0);
		N(k);
		var j = z(k), ee = L(j);
		N(j), N(D);
		var te = z(D, 2), M = z(L(te)), ne = L(M, !0);
		N(M);
		var re = z(M), ie = L(re, !0);
		N(re), N(te), N(v);
		var ae = z(v, 2);
		Y(ae, 5, () => (H(o), U(() => H(o).tracks)), (e) => e.id, (e, t) => {
			var n = jx(), r = L(n), i = L(r), a = L(i, !0);
			N(i);
			var o = z(i), s = L(o);
			N(o), N(r);
			var u = z(r, 2), d = L(u), f = z(d);
			N(u);
			var p = z(u, 2), m = L(p);
			N(p), N(n), V((e, r, i, o, c) => {
				za(n, (H(t), U(() => `--track:${H(t).color}`))), q(a, (H(t), U(() => H(t).label))), q(s, `${e ?? ""} actual / ${r ?? ""} target`), za(d, i), za(f, o), q(m, `${H(t), U(() => H(t).runs) ?? ""} runs · ${c ?? ""} tokens${H(t), U(() => H(t).maintenanceRuns ? ` · ${H(t).maintenanceRuns} support` : "") ?? ""}`);
			}, [
				() => (H(t), U(() => c(H(t).actualShare))),
				() => (H(t), U(() => c(H(t).targetShare))),
				() => (H(t), U(() => `width:${Math.min(100, Number(H(t).actualShare || 0) * 100)}%`)),
				() => (H(t), U(() => `left:${Math.min(100, Number(H(t).targetShare || 0) * 100)}%`)),
				() => (H(t), U(() => l(H(t).knownTokens)))
			]), K(e, n);
		}), N(ae);
		var oe = z(ae, 2), se = L(oe), ce = z(L(se)), le = L(ce);
		N(ce), N(se);
		var ue = z(se, 2), de = L(ue), fe = z(L(de), 2);
		Y(fe, 7, () => (H(o), U(() => H(o).layers)), (e) => e.id, (e, t, n) => {
			var r = Mx();
			let i;
			var a = L(r), o = L(a, !0);
			N(a);
			var s = z(a), c = L(s), l = L(c, !0);
			N(c);
			var u = z(c), d = L(u);
			N(u);
			var f = z(u), p = L(f, !0);
			N(f), N(s), N(r), V(() => {
				i = X(r, 1, "", null, i, { planned: H(t).status === "planned" || H(t).status === "shadow" }), q(o, H(n) + 1), q(l, (H(t), U(() => H(t).label))), q(d, `${H(t), U(() => H(t).cadence) ?? ""} · ${H(t), U(() => H(t).owner) ?? ""}${H(t), U(() => H(t).status ? ` · ${H(t).status}` : "") ?? ""}`), q(p, (H(t), U(() => H(t).purpose)));
			}), K(e, r);
		}), N(fe), N(de);
		var pe = z(de, 2), me = z(L(pe), 2), he = (e) => {
			var t = Px();
			Y(t, 5, () => (H(o), U(() => H(o).drift.signals)), (e) => e.id, (e, t) => {
				var n = Nx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a);
				var s = z(a), c = L(s, !0);
				N(s), N(n), V(() => {
					X(n, 1, `severity-${H(t), U(() => H(t).severity) ?? ""}`), q(i, (H(t), U(() => H(t).label))), q(o, (H(t), U(() => H(t).evidence))), q(c, (H(t), U(() => H(t).action)));
				}), K(e, n);
			}), N(t), K(e, t);
		}, ge = (e) => {
			K(e, Fx());
		};
		J(me, (e) => {
			H(o), U(() => H(o).drift.signals.length) ? e(he) : e(ge, -1);
		}), N(pe), N(ue), Ke(2), N(oe), N(t), V((e, n, r, i, c) => {
			X(t, 1, `strategy-overview status-${H(o), U(() => H(o).drift.status) ?? ""}`), q(a, `CAMPAIGN STRATEGY · ${H(o), U(() => H(o).epoch.label) ?? ""}`), q(f, (H(s), U(() => H(s)?.label || "The portfolio is moving within its charter"))), q(m, (H(s), H(o), U(() => H(s)?.detail || H(o).charter.thesis))), q(_, (H(o), U(() => H(o).drift.status === "attention" ? "RECENTER" : H(o).drift.status === "watch" ? "WATCH" : "ON TRACK"))), q(x, (H(o), U(() => H(o).progress.advancedDeltaCount || 0))), q(w, e), q(E, `known tokens · ${H(o), U(() => H(o).cost.unreportedRuns) ?? ""} unreported`), O = X(D, 1, "", null, O, n), q(A, r), q(ee, `charter ceiling ${i ?? ""}`), q(ne, c), q(ie, (H(o), U(() => H(o).progress.frontierPath ? "durable source detected" : "source missing"))), q(le, `${H(o), U(() => H(o).drift.signals.length) ?? ""} signal${H(o), U(() => H(o).drift.signals.length === 1 ? "" : "s") ?? ""}`);
		}, [
			() => (H(o), U(() => l(H(o).cost.knownTokens))),
			() => ({ over: Number(H(o).cost.maintenanceShare) > Number(H(o).charter.maintenancePolicy?.rollingShareLimit || .15) }),
			() => (H(o), U(() => c(H(o).cost.maintenanceShare))),
			() => (H(o), U(() => c(H(o).charter.maintenancePolicy?.rollingShareLimit || .15))),
			() => (H(o), U(() => u(H(o).progress.frontierUpdatedAt)))
		]), K(e, t);
	};
	J(f, (e) => {
		H(o) && e(p);
	}), K(e, d), xt(), i();
}
//#endregion
//#region src/ui/program-compass.ts
function Rx(e, t, n = 260) {
	let r = (typeof e == "string" ? e.trim().replace(/\s+/g, " ") : "") || t;
	return r.length <= n ? r : `${r.slice(0, n).replace(/\s+\S*$/, "")}…`;
}
function zx(e) {
	let t = e?.wave?.synthesis?.response?.progressDeltas;
	if (Array.isArray(t)) return t;
	let n = Array.isArray(e?.strategy?.recentSnapshots) ? e.strategy.recentSnapshots : [];
	return Array.isArray(n[0]?.metrics?.progressDeltas) ? n[0].metrics.progressDeltas : [];
}
function Bx(e, t, n) {
	return e.some((e) => String(e?.metricId || "") === t && (!n || String(e?.status || "").toUpperCase() === n));
}
function Vx(e) {
	let t = e?.strategy || {}, n = t.charter || {}, r = Array.isArray(t.recentSnapshots) ? t.recentSnapshots[0] : null, i = zx(e), a = String(e?.id || "").toLowerCase() === "cfg23" || /23[_ ]?4/i.test(String(n.question || e?.role || "")), o = Bx(i, "decision-row41", "ADVANCED"), s = Bx(i, "geometric-23_4-decision", "UNCHANGED");
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
		objective: Rx(n.question || e?.role, "Advance the campaign's central mathematical question."),
		status: u ? "STRATEGY CHECK" : "PROGRAM COMPASS",
		headline: Rx(u?.label || n?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
		changed: Rx(c?.after || c?.evidence, "No accepted frontier change is recorded for the latest wave."),
		scale: Rx(l?.after || l?.evidence, "The campaign-level consequence has not yet been recorded."),
		nextTarget: Rx(e?.wave?.synthesis?.response?.nextWave?.objective || r?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
		rationale: Rx(u?.detail || n.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
		antiLoop: Rx(u?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
		moves: []
	};
}
//#endregion
//#region src/ui/ProgramCompass.svelte
Ho();
var Hx = /* @__PURE__ */ G("<details><summary><span><b> </b><small> </small></span><strong> </strong><i>why?</i></summary> <div><p> </p><p><b>Program payoff:</b> </p></div></details>"), Ux = /* @__PURE__ */ G("<div class=\"compass-wave\"></div>"), Wx = /* @__PURE__ */ G("<section class=\"program-compass\" aria-label=\"Program objective and recommended next research targets\"><header><div><p>PROGRAM COMPASS</p><h2> </h2></div> <strong> </strong></header> <div class=\"compass-chain\"><article><span>WIN CONDITION</span><strong> </strong></article> <i aria-hidden=\"true\">→</i> <article><span>WHAT JUST CHANGED</span><strong> </strong><small> </small></article> <i aria-hidden=\"true\">→</i> <article class=\"recommended\"><span>BEST NEXT TARGET</span><strong> </strong></article></div> <!> <details class=\"compass-reasoning\"><summary><span>WHY THIS ORDER</span><strong>Show strategy and anti-loop guard</strong></summary> <div><p> </p><p><b>Avoid the loop:</b> </p></div></details> <footer><b>ADVISORY, NOT AUTHORITY</b><span>The evidence receipts and human gates still decide what is accepted or launched.</span></footer></section>");
function Gx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null);
	B(() => n(), () => {
		I(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => (H(a), Vx), () => {
		I(o, H(a) ? Vx(H(a)) : null);
	}), Br(), vo();
	var s = ca(), c = R(s), l = (e) => {
		var t = Wx(), n = L(t), r = L(n), i = z(L(r)), a = L(i, !0);
		N(i), N(r);
		var s = z(r, 2), c = L(s, !0);
		N(s), N(n);
		var l = z(n, 2), u = L(l), d = z(L(u)), f = L(d, !0);
		N(d), N(u);
		var p = z(u, 4), m = z(L(p)), h = L(m, !0);
		N(m);
		var g = z(m), _ = L(g, !0);
		N(g), N(p);
		var v = z(p, 4), y = z(L(v)), b = L(y, !0);
		N(y), N(v), N(l);
		var x = z(l, 2), S = (e) => {
			var t = Ux();
			Y(t, 5, () => (H(o), U(() => H(o).moves)), (e) => e.id, (e, t) => {
				var n = Hx();
				let r;
				var i = L(n), a = L(i), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c, !0);
				N(c), N(a);
				var u = z(a), d = L(u, !0);
				N(u), Ke(), N(i);
				var f = z(i, 2), p = L(f), m = L(p, !0);
				N(p);
				var h = z(p), g = z(L(h));
				N(h), N(f), N(n), V(() => {
					r = X(n, 1, "", null, r, { held: H(t).timing === "HOLD" }), q(s, (H(t), U(() => H(t).timing))), q(l, (H(t), U(() => H(t).track))), q(d, (H(t), U(() => H(t).title))), q(m, (H(t), U(() => H(t).detail))), q(g, ` ${H(t), U(() => H(t).payoff) ?? ""}`);
				}), K(e, n);
			}), N(t), K(e, t);
		};
		J(x, (e) => {
			H(o), U(() => H(o).moves.length) && e(S);
		});
		var C = z(x, 2), w = z(L(C), 2), T = L(w), E = L(T, !0);
		N(T);
		var D = z(T), O = z(L(D));
		N(D), N(w), N(C), Ke(2), N(t), V(() => {
			q(a, (H(o), U(() => H(o).headline))), q(c, (H(o), U(() => H(o).status))), q(f, (H(o), U(() => H(o).objective))), q(h, (H(o), U(() => H(o).changed))), q(_, (H(o), U(() => H(o).scale))), q(b, (H(o), U(() => H(o).nextTarget))), q(E, (H(o), U(() => H(o).rationale))), q(O, ` ${H(o), U(() => H(o).antiLoop) ?? ""}`);
		}), K(e, t);
	};
	J(c, (e) => {
		H(o) && e(l);
	}), K(e, s), xt(), i();
}
//#endregion
//#region src/ui/ResourceEconomy.svelte
Ho();
var Kx = /* @__PURE__ */ G("<div class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></div>"), qx = /* @__PURE__ */ G("<article><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></article>"), Jx = /* @__PURE__ */ G("<article><strong class=\"svelte-wkay8m\"> </strong><p class=\"svelte-wkay8m\"> </p></article>"), Yx = /* @__PURE__ */ G("<section class=\"resource-signals svelte-wkay8m\"></section>"), Xx = /* @__PURE__ */ G("<li><b class=\"svelte-wkay8m\"> </b> <div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span><p class=\"svelte-wkay8m\"> </p><small class=\"svelte-wkay8m\"> </small></div></li>"), Zx = /* @__PURE__ */ G("<ol class=\"svelte-wkay8m\"></ol>"), Qx = /* @__PURE__ */ G("<div class=\"resource-empty svelte-wkay8m\"><strong class=\"svelte-wkay8m\">No bounded candidate is currently schedulable</strong><p class=\"svelte-wkay8m\">The ledger remains useful as an epoch budget and cost-quality check.</p></div>"), $x = /* @__PURE__ */ G("<li class=\"svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div><i class=\"svelte-wkay8m\">NO DISPATCH</i></li>"), eS = /* @__PURE__ */ G("<details class=\"simulation-history svelte-wkay8m\"><summary class=\"svelte-wkay8m\">Immutable simulation history <strong> </strong></summary><ol class=\"svelte-wkay8m\"></ol></details>"), tS = /* @__PURE__ */ G("<div role=\"status\"> </div>"), nS = /* @__PURE__ */ G("<details id=\"resource-economy\"><summary class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"><small class=\"svelte-wkay8m\">RESOURCE ECONOMY</small><strong class=\"svelte-wkay8m\"> </strong></span> <span class=\"resource-summary svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><b class=\"svelte-wkay8m\"> </b><i class=\"svelte-wkay8m\">SHADOW</i></span></summary> <div class=\"resource-body svelte-wkay8m\"><header class=\"resource-intro svelte-wkay8m\"><div><span class=\"svelte-wkay8m\"> </span><h2 class=\"svelte-wkay8m\">Allocate attention before compute</h2><p class=\"svelte-wkay8m\"> </p></div> <div class=\"authority svelte-wkay8m\"><strong class=\"svelte-wkay8m\">ADVISORY ONLY</strong><span class=\"svelte-wkay8m\">Simulation cannot dispatch</span></div></header> <section class=\"budget svelte-wkay8m\" aria-label=\"Epoch token budget\"><div class=\"budget-heading svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div> <div class=\"budget-meter svelte-wkay8m\"><i class=\"known svelte-wkay8m\"></i><i class=\"committed svelte-wkay8m\"></i><i class=\"reserve svelte-wkay8m\"></i></div> <div class=\"budget-legend svelte-wkay8m\"><span class=\"known svelte-wkay8m\"> </span><span class=\"committed svelte-wkay8m\"> </span><span class=\"reserve svelte-wkay8m\"> </span><span> </span></div></section> <div class=\"resource-grid svelte-wkay8m\"><section class=\"slot-pools svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Shared slot pools</h3> <!></section> <section class=\"layer-ledger svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Measured by layer</h3> <!></section></div> <section class=\"calibration svelte-wkay8m\" aria-label=\"Receipt-bound resource calibration\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">RECEIPT-BOUND CALIBRATION</span><h3 class=\"svelte-wkay8m\"> </h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <p class=\"svelte-wkay8m\"> </p> <div class=\"calibration-classes svelte-wkay8m\"></div> <footer class=\"svelte-wkay8m\">Recommendations remain advisory. Calibration cannot change caps, schedule work, or grant scheduler authority.</footer></section> <!> <section class=\"scheduler svelte-wkay8m\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">ADVISORY SCHEDULER</span><h3 class=\"svelte-wkay8m\">What fits next—and what does not</h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <!> <footer class=\"svelte-wkay8m\"><p class=\"svelte-wkay8m\">Freezing creates a content-addressed recommendation receipt for later comparison. It cannot call a worker, consume a gate, or alter research direction.</p><button class=\"outline-button svelte-wkay8m\"> </button></footer></section> <!> <!></div></details>");
function rS(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(""), g = /* @__PURE__ */ F("pending");
	function _(e) {
		let t = Number(e || 0);
		return t >= 1e6 ? `${(t / 1e6).toFixed(t % 1e6 ? 1 : 0)}m` : t >= 1e3 ? `${Math.round(t / 1e3)}k` : t.toLocaleString();
	}
	function v(e) {
		return `${Math.round(Number(e || 0) * 100)}%`;
	}
	async function y() {
		if (!(!H(d) || H(m))) {
			I(m, !0), I(g, "pending"), I(h, "Freezing the current ledger, candidates, and advisory decisions…");
			try {
				await ns({
					projectId: H(d).id,
					type: "resource.schedule.simulate",
					scope: "resource-economy"
				}), I(g, "success"), I(h, "Immutable advisory simulation recorded. It dispatched nothing and left the campaign phase unchanged.");
			} catch (e) {
				I(g, "error"), I(h, e instanceof Error ? e.message : String(e));
			} finally {
				I(m, !1);
			}
		}
	}
	B(() => n(), () => {
		I(d, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(d), () => {
		I(f, H(d)?.resources || null);
	}), B(() => H(f), () => {
		I(a, H(f)?.ledger || {});
	}), B(() => H(f), () => {
		I(o, H(f)?.calibration || {});
	}), B(() => H(a), () => {
		I(s, Math.max(1, Number(H(a).epochTokenBudget || 1)));
	}), B(() => (H(a), H(s)), () => {
		I(c, Math.min(100, Number(H(a).knownTokens || 0) / H(s) * 100));
	}), B(() => (H(c), H(a), H(s)), () => {
		I(l, Math.min(100 - H(c), Number(H(a).committedTokens || 0) / H(s) * 100));
	}), B(() => (H(c), H(l), H(a), H(s)), () => {
		I(u, Math.min(100 - H(c) - H(l), Number(H(a).reserveTokens || 0) / H(s) * 100));
	}), Br(), vo();
	var b = ca(), x = R(b), S = (e) => {
		var t = nS();
		let n;
		var r = L(t), i = L(r), d = z(L(i)), b = L(d);
		N(d), N(i);
		var x = z(i, 2), S = L(x), C = L(S);
		N(S);
		var w = z(S), T = L(w);
		N(w), Ke(), N(x), N(r);
		var E = z(r, 2), D = L(E), O = L(D), k = L(O), A = L(k);
		N(k);
		var j = z(k, 2), ee = L(j, !0);
		N(j), N(O), Ke(2), N(D);
		var te = z(D, 2), M = L(te), ne = L(M), re = L(ne);
		N(ne);
		var ie = z(ne), ae = L(ie);
		N(ie), N(M);
		var oe = z(M, 2), se = L(oe), ce = z(se), le = z(ce);
		N(oe);
		var ue = z(oe, 2), de = L(ue), fe = L(de);
		N(de);
		var pe = z(de), me = L(pe);
		N(pe);
		var he = z(pe), ge = L(he);
		N(he);
		var _e = z(he), ve = L(_e);
		N(_e), N(ue), N(te);
		var ye = z(te, 2), be = L(ye);
		Y(z(L(be), 2), 0, () => [
			"strategy",
			"research",
			"custody"
		], _a, (e, t) => {
			var n = Kx(), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a);
			N(a);
			var s = z(a), c = L(s);
			N(s), N(n), V(() => {
				q(i, t), q(o, `${H(f), U(() => H(f).slots.available[t]) ?? ""} available`), q(c, `${H(f), U(() => H(f).slots.active[t]) ?? ""} active / ${H(f), U(() => H(f).slots.capacity[t]) ?? ""} capacity`);
			}), K(e, n);
		}), N(be);
		var xe = z(be, 2);
		Y(z(L(xe), 2), 1, () => (H(f), U(() => H(f).byLayer || [])), (e) => e.id, (e, t) => {
			var n = Kx(), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a, !0);
			N(a);
			var s = z(a), c = L(s);
			N(s), N(n), V((e) => {
				q(i, (H(t), U(() => H(t).id))), q(o, e), q(c, `${H(t), U(() => H(t).runs) ?? ""} runs · ${H(t), U(() => H(t).unreported) ?? ""} unreported`);
			}, [() => (H(t), U(() => _(H(t).knownTokens)))]), K(e, n);
		}), N(xe), N(ye);
		var Se = z(ye, 2), Ce = L(Se), we = L(Ce), Te = z(L(we)), Ee = L(Te, !0);
		N(Te), N(we);
		var De = z(we), Oe = L(De);
		N(De), N(Ce);
		var ke = z(Ce, 2), Ae = L(ke, !0);
		N(ke);
		var je = z(ke, 2);
		Y(je, 5, () => (H(o), U(() => H(o).classes || [])), (e) => e.id, (e, t) => {
			var n = qx();
			let r;
			var i = L(n), a = L(i, !0);
			N(i);
			var o = z(i), s = L(o);
			N(o);
			var c = z(o), l = L(c, !0);
			N(c), N(n), V((e) => {
				r = X(n, 1, "svelte-wkay8m", null, r, { sufficient: H(t).sufficient }), q(a, (H(t), U(() => H(t).id))), q(s, `${H(t), U(() => H(t).samples) ?? ""}/${H(t), U(() => H(t).minimumSamples) ?? ""}`), q(l, e);
			}, [() => (H(t), U(() => H(t).samples ? `p90 ${_(H(t).tokens?.p90)}` : "awaiting receipts"))]), K(e, n);
		}), N(je), Ke(2), N(Se);
		var Me = z(Se, 2), Ne = (e) => {
			var t = Yx();
			Y(t, 5, () => (H(f), U(() => H(f).signals)), (e) => e.id, (e, t) => {
				var n = Jx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a), N(n), V(() => {
					X(n, 1, (H(t), U(() => `severity-${H(t).severity}`)), "svelte-wkay8m"), q(i, (H(t), U(() => H(t).label))), q(o, (H(t), U(() => H(t).detail)));
				}), K(e, n);
			}), N(t), K(e, t);
		};
		J(Me, (e) => {
			H(f), U(() => H(f).signals?.length) && e(Ne);
		});
		var Pe = z(Me, 2), Fe = L(Pe), Ie = z(L(Fe)), Le = L(Ie);
		N(Ie), N(Fe);
		var Re = z(Fe, 2), ze = (e) => {
			var t = Zx();
			Y(t, 5, () => (H(f), U(() => H(f).candidates)), (e) => e.id, (e, t) => {
				var n = Xx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r, 2), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c);
				var u = z(c), d = L(u, !0);
				N(u);
				var f = z(u), p = L(f, !0);
				N(f), N(a), N(n), V((e, r) => {
					X(n, 1, e, "svelte-wkay8m"), q(i, (H(t), U(() => H(t).decision))), q(s, (H(t), U(() => H(t).label))), q(l, `${H(t), U(() => H(t).layer) ?? ""} · ${H(t), U(() => H(t).trackId) ?? ""} · ${H(t), U(() => H(t).workKind) ?? ""} · cap ${r ?? ""}`), q(d, (H(t), U(() => H(t).expectedDelta))), q(p, (H(t), U(() => H(t).decisionReason)));
				}, [() => (H(t), U(() => `decision-${H(t).decision.toLowerCase()}`)), () => (H(t), U(() => _(H(t).tokenCap)))]), K(e, n);
			}), N(t), K(e, t);
		}, Be = (e) => {
			K(e, Qx());
		};
		J(Re, (e) => {
			H(f), U(() => H(f).candidates?.length) ? e(ze) : e(Be, -1);
		});
		var Ve = z(Re, 2), He = z(L(Ve)), Ue = L(He, !0);
		N(He), N(Ve), N(Pe);
		var We = z(Pe, 2), Ge = (e) => {
			var t = eS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(f), U(() => H(f).simulations)), _a, (e, t) => {
				var n = $x(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), Ke(), N(n), V((e) => {
					q(i, `R${H(t), U(() => H(t).charterRevision) ?? ""}`), q(s, (H(t), U(() => H(t).inputDigest))), q(l, `${e ?? ""} · ${H(t), U(() => H(t).actor) ?? ""}`);
				}, [() => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(f), U(() => H(f).simulations.length) ?? ""} receipt${H(f), U(() => H(f).simulations.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(We, (e) => {
			H(f), U(() => H(f).simulations?.length) && e(Ge);
		});
		var qe = z(We, 2), Je = (e) => {
			var t = tS(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `resource-feedback ${H(g) ?? ""}`, "svelte-wkay8m"), q(n, H(h));
			}), K(e, t);
		};
		J(qe, (e) => {
			H(h) && e(Je);
		}), N(E), N(t), V((e, r, i, s, d, p, h, g, _, v) => {
			n = X(t, 1, "svelte-wkay8m", null, n, e), q(b, `${r ?? ""} measured of ${i ?? ""} this epoch`), q(C, `${H(f), U(() => H(f).candidates?.length || 0) ?? ""} choices`), q(T, `${H(f), U(() => H(f).slots?.available?.research || 0) ?? ""}/${H(f), U(() => H(f).slots?.capacity?.research || 0) ?? ""} research slots`), q(A, `PROVISIONAL EPOCH ENVELOPE · CHARTER R${H(f), U(() => H(f).charterRevision) ?? ""}`), q(ee, (H(f), U(() => H(f).policy.rationale))), q(re, `${s ?? ""} measured + committed`), q(ae, `${d ?? ""} still schedulable · ${p ?? ""} held for redirects`), za(se, `width:${H(c)}%`), za(ce, `left:${H(c)}%;width:${H(l)}%`), za(le, `right:0;width:${H(u)}%`), q(fe, `measured ${h ?? ""}`), q(me, `committed ${g ?? ""}`), q(ge, `redirect reserve ${_ ?? ""}`), q(ve, `${H(a), U(() => H(a).unreported || 0) ?? ""} unreported runs`), q(Ee, v), q(Oe, `${H(o), U(() => H(o).eligibleSamples || 0) ?? ""} eligible · ${H(o), U(() => H(o).excludedSamples || 0) ?? ""} excluded`), q(Ae, (H(o), U(() => H(o).note))), q(Le, `${H(f), U(() => H(f).simulation?.scheduled?.length || 0) ?? ""} fit · ${H(f), U(() => H(f).simulation?.gated?.length || 0) ?? ""} gated · ${H(f), U(() => H(f).simulation?.waiting?.length || 0) ?? ""} waiting`), He.disabled = H(m), q(Ue, H(m) ? "Freezing simulation…" : "Freeze scheduler simulation");
		}, [
			() => ({ attention: H(f).signals?.some((e) => e.severity === "attention") }),
			() => (H(a), U(() => _(H(a).knownTokens))),
			() => (H(a), U(() => _(H(a).epochTokenBudget))),
			() => (H(a), U(() => _(H(a).knownTokens + H(a).committedTokens))),
			() => (H(a), U(() => _(H(a).schedulableTokens))),
			() => (H(a), U(() => _(H(a).reserveTokens))),
			() => (H(a), H(s), U(() => v(Number(H(a).knownTokens || 0) / H(s)))),
			() => (H(a), H(s), U(() => v(Number(H(a).committedTokens || 0) / H(s)))),
			() => (H(a), H(s), U(() => v(Number(H(a).reserveTokens || 0) / H(s)))),
			() => (H(o), U(() => String(H(o).status || "INSUFFICIENT").replaceAll("_", " ")))
		]), W("click", He, y), go("open", "toggle", t, (e) => I(p, e), () => H(p)), K(e, t);
	};
	J(x, (e) => {
		H(f) && e(S);
	}), K(e, b), xt(), i();
}
//#endregion
//#region src/ui/StrategyWorkspace.svelte
Zi(["click"]), Ho();
var iS = /* @__PURE__ */ G("<label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Exact thread or turn ID</span><input maxlength=\"500\" placeholder=\"Attached coordinator reference\" class=\"svelte-1ull9g0\"/></label>"), aS = /* @__PURE__ */ G("<div class=\"strategy-review-request\"><div><span>CURRENT EPOCH</span> <strong> </strong> <p> </p></div> <label><span>Review focus</span><textarea rows=\"3\" maxlength=\"2000\"></textarea></label> <div class=\"strategy-review-provenance svelte-1ull9g0\"><label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Review kind</span><select class=\"svelte-1ull9g0\"><option>Epoch audit</option><option>Independent idea search</option></select></label> <label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Request source</span><select class=\"svelte-1ull9g0\"><option>Operator</option><option>Coordinator request</option></select></label> <!></div> <button class=\"primary-button\"> </button></div>"), oS = /* @__PURE__ */ G("<div class=\"strategy-review-running\"><span class=\"strategy-pulse\"></span> <div><strong> </strong><p> </p><small> </small></div></div>"), sS = /* @__PURE__ */ G("<div><span> </span><strong> </strong><small> </small></div>"), cS = /* @__PURE__ */ G("<li class=\"svelte-1ull9g0\"> </li>"), lS = /* @__PURE__ */ G("<ul></ul>"), uS = /* @__PURE__ */ G("<p>None proposed.</p>"), dS = /* @__PURE__ */ G("<section><strong> </strong><!></section>"), fS = /* @__PURE__ */ G("<li><strong> </strong><span> </span><p> </p></li>"), pS = /* @__PURE__ */ G("<details class=\"custody-candidates\"><summary> </summary><ul></ul></details>"), mS = /* @__PURE__ */ G("<label><input type=\"checkbox\"/><span>I approve this exact advisory charter as the next epoch.</span></label> <div><button class=\"outline-button\">Keep current charter</button><button class=\"primary-button\"> </button></div>", 1), hS = /* @__PURE__ */ G("<button class=\"outline-button\">Close proposal and keep current charter</button>"), gS = /* @__PURE__ */ G("<div class=\"strategy-proposal\"><header><div><span> </span><h3> </h3></div> <strong> </strong></header> <div class=\"strategy-proposal-objective\"><span>PROPOSED EPOCH</span> <strong> </strong> <p> </p></div> <div class=\"strategy-proposal-weights\" aria-label=\"Proposed track weights\"></div> <div class=\"strategy-action-diff\"></div> <!> <div class=\"strategy-human-gate\"><div><span>HUMAN ACTIVATION GATE</span><strong> </strong><small> </small></div> <!></div></div>"), _S = /* @__PURE__ */ G("<div role=\"status\"> </div>"), vS = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small></div></li>"), yS = /* @__PURE__ */ G("<details class=\"strategy-history\"><summary>Charter history <strong> </strong></summary><ol></ol></details>"), bS = /* @__PURE__ */ G("<li class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\"> </span><div><strong> </strong><small> </small></div></li>"), xS = /* @__PURE__ */ G("<details class=\"strategy-history strategy-review-history svelte-1ull9g0\"><summary>Independent review history <strong> </strong></summary><ol></ol></details>"), SS = /* @__PURE__ */ G("<details id=\"strategy-workspace\" class=\"strategy-workspace\"><summary><span><small>STRATEGY WORKSPACE</small><strong> </strong></span> <span class=\"strategy-workspace-state\"> </span></summary> <div class=\"strategy-workspace-body\"><div class=\"strategy-workspace-boundary\"><strong>Independent governance lane</strong> <p>Epoch and idea-search reviews run in one dedicated read-only Sol lane. Each request binds its strategy slot and token cap, and cannot interrupt the regular coordinator, change campaign phase, dispatch workers, or activate its own proposal.</p></div> <!> <!> <!> <!></div></details>");
function CS(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F("epoch"), h = /* @__PURE__ */ F("operator"), g = /* @__PURE__ */ F(""), _ = /* @__PURE__ */ F("Review whether the current epoch is producing durable frontier motion and whether its portfolio should be rebalanced."), v = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F("pending"), b = (e) => `${Math.round(Number(e || 0) * 100)}%`;
	async function x(e, t = "", n = {}) {
		if (!H(l) || H(f)) throw Error("Another strategy action is still settling");
		I(f, e), I(y, "pending"), I(v, e === "strategy.review.request" ? "Freezing the epoch ledger and starting an independent read-only Sol task…" : e === "strategy.proposal.activate" ? "Recording the charter revision and opening a fresh measurement epoch…" : "Keeping the current charter and closing this proposal…");
		try {
			let r = await ns({
				projectId: H(l).id,
				type: e,
				targetId: t,
				args: n,
				scope: "strategy-workspace",
				pollLimit: 160
			});
			return I(y, "success"), I(v, e === "strategy.review.request" ? "Independent epoch review started. The regular campaign coordinator and campaign phase were not changed." : e === "strategy.proposal.activate" ? "The new advisory charter is active in a fresh epoch. No work was dispatched." : "Proposal closed; the current charter remains active."), r.action;
		} catch (e) {
			throw I(y, "error"), I(v, e instanceof Error ? e.message : String(e)), e;
		} finally {
			I(f, "");
		}
	}
	async function S() {
		await x("strategy.review.request", "", {
			triggerKind: "manual",
			reason: H(_),
			reviewKind: H(m),
			requestSource: H(h),
			requestReference: H(g)
		}).catch(() => void 0);
	}
	async function C() {
		!H(d) || !H(p) || (await x("strategy.proposal.activate", H(d).id, { confirmation: "ACTIVATE STRATEGY REVISION" }).catch(() => void 0), I(p, !1));
	}
	async function w() {
		H(d) && await x("strategy.proposal.dismiss", H(d).id, { note: "Operator kept the current charter after reviewing the independent proposal." }).catch(() => void 0);
	}
	B(() => n(), () => {
		I(l, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(l), () => {
		I(u, H(l)?.strategy?.workspace || null);
	}), B(() => H(u), () => {
		I(d, H(u)?.activeReview || null);
	}), B(() => H(d), () => {
		I(a, H(d)?.response || {});
	}), B(() => H(a), () => {
		I(o, H(a)?.proposal || {});
	}), B(() => H(o), () => {
		I(s, Array.isArray(H(o)?.trackWeights) ? H(o).trackWeights : []);
	}), B(() => H(d), () => {
		I(c, !!(H(d) && ["drafting", "drafted"].includes(H(d).status)));
	}), Br(), vo();
	var T = ca(), E = R(T), D = (e) => {
		var t = SS(), n = L(t), r = L(n), i = z(L(r)), x = L(i);
		N(i), N(r);
		var T = z(r, 2), E = L(T, !0);
		N(T), N(n);
		var D = z(n, 2), O = z(L(D), 2), k = (e) => {
			var t = aS(), n = L(t), r = z(L(n), 2), i = L(r, !0);
			N(r);
			var a = z(r, 2), o = L(a, !0);
			N(a), N(n);
			var s = z(n, 2), c = z(L(s));
			tn(c), N(s);
			var d = z(s, 2), p = L(d), v = z(L(p)), y = L(v);
			y.value = y.__value = "epoch";
			var b = z(y);
			b.value = b.__value = "idea-search", N(v), N(p);
			var x = z(p, 2), C = z(L(x)), w = L(C);
			w.value = w.__value = "operator";
			var T = z(w);
			T.value = T.__value = "coordinator-request", N(C), N(x);
			var E = z(x, 2), D = (e) => {
				var t = iS(), n = z(L(t));
				$a(n), N(t), so(n, () => H(g), (e) => I(g, e)), K(e, t);
			};
			J(E, (e) => {
				H(h) === "coordinator-request" && e(D);
			}), N(d);
			var O = z(d, 2), k = L(O, !0);
			N(O), N(t), V((e) => {
				q(i, (H(l), U(() => H(l).strategy.epoch.label))), q(o, (H(l), U(() => H(l).strategy.charter.epoch?.objective || H(l).strategy.charter.thesis))), O.disabled = e, q(k, H(f) === "strategy.review.request" ? "Starting independent review…" : "Ask independent Sol strategist");
			}, [() => (H(f), H(u), H(_), H(h), H(g), U(() => !!H(f) || !H(u).reviewAvailable || !H(_).trim() || H(h) === "coordinator-request" && !H(g).trim()))]), so(c, () => H(_), (e) => I(_, e)), Ha(v, () => H(m), (e) => I(m, e)), Ha(C, () => H(h), (e) => I(h, e)), W("click", O, S), K(e, t);
		}, A = (e) => {
			var t = oS(), n = z(L(t), 2), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a, !0);
			N(a);
			var s = z(a), c = L(s);
			N(s), N(n), N(t), V((e) => {
				q(i, (H(d), U(() => H(d).reviewKind === "idea-search" ? "Searching for independent directions" : "Reviewing the epoch ledger"))), q(o, (H(d), U(() => H(d).triggerReason))), q(c, `${H(d), U(() => H(d).requestSource) ?? ""} · cap ${e ?? ""} · frozen bundle ${H(d), U(() => H(d).bundleDigest || "being prepared") ?? ""}`);
			}, [() => (H(d), U(() => Number(H(d).resourceCap || 0).toLocaleString()))]), K(e, t);
		}, j = (e) => {
			var t = gS(), n = L(t), r = L(n), i = L(r), c = L(i);
			N(i);
			var m = z(i), h = L(m, !0);
			N(m), N(r);
			var g = z(r, 2), _ = L(g, !0);
			N(g), N(n);
			var v = z(n, 2), y = z(L(v), 2), x = L(y, !0);
			N(y);
			var S = z(y, 2), T = L(S, !0);
			N(S), N(v);
			var E = z(v, 2);
			Y(E, 5, () => H(s), (e) => e.trackId, (e, t) => {
				var n = sS(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a);
				var s = z(a), c = L(s, !0);
				N(s), N(n), V((e) => {
					q(i, (H(t), U(() => H(t).trackId))), q(o, e), q(c, (H(t), U(() => H(t).reason)));
				}, [() => (H(t), U(() => b(H(t).share)))]), K(e, n);
			}), N(E);
			var D = z(E, 2);
			Y(D, 5, () => (H(a), U(() => [
				["STOP", H(a).portfolioActions?.stop],
				["CONTINUE", H(a).portfolioActions?.continue],
				["START", H(a).portfolioActions?.start]
			])), _a, (e, t) => {
				var n = dS(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = (e) => {
					var n = lS();
					Y(n, 5, () => (H(t), U(() => H(t)[1])), _a, (e, t) => {
						var n = cS(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(n), K(e, n);
				}, s = /* @__PURE__ */ P(() => (H(t), U(() => Array.isArray(H(t)[1]) && H(t)[1].length))), c = (e) => {
					K(e, uS());
				};
				J(a, (e) => {
					H(s) ? e(o) : e(c, -1);
				}), N(n), V((e) => {
					X(n, 1, e, "svelte-1ull9g0"), q(i, (H(t), U(() => H(t)[0])));
				}, [() => (H(t), U(() => `strategy-action-${String(H(t)[0]).toLowerCase()}`))]), K(e, n);
			}), N(D);
			var O = z(D, 2), k = (e) => {
				var t = pS(), n = L(t), r = L(n);
				N(n);
				var i = z(n);
				Y(i, 5, () => (H(o), U(() => H(o).custodyCandidates)), _a, (e, t) => {
					var n = fS(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a);
					N(a);
					var s = z(a), c = L(s, !0);
					N(s), N(n), V(() => {
						q(i, (H(t), U(() => H(t).task))), q(o, `${H(t), U(() => H(t).urgency) ?? ""} · ${H(t), U(() => H(t).blocksResearch ? "blocks research" : "does not block research") ?? ""}`), q(c, (H(t), U(() => H(t).reason)));
					}), K(e, n);
				}), N(i), N(t), V(() => q(r, `Inspect ${H(o), U(() => H(o).custodyCandidates.length) ?? ""} custody handoff candidate${H(o), U(() => H(o).custodyCandidates.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
			};
			J(O, (e) => {
				H(o), U(() => H(o).custodyCandidates?.length) && e(k);
			});
			var A = z(O, 2), j = L(A), ee = z(L(j)), te = L(ee, !0);
			N(ee);
			var M = z(ee), ne = L(M);
			N(M), N(j);
			var re = z(j, 2), ie = (e) => {
				var t = mS(), n = R(t), r = L(n);
				$a(r), Ke(), N(n);
				var i = z(n, 2), a = L(i), o = z(a), s = L(o, !0);
				N(o), N(i), V((e, t) => {
					a.disabled = e, o.disabled = t, q(s, H(f) === "strategy.proposal.activate" ? "Activating revision…" : "Activate new epoch");
				}, [() => (H(f), U(() => !!H(f))), () => (H(p), H(f), U(() => !H(p) || !!H(f)))]), co(r, () => H(p), (e) => I(p, e)), W("click", a, w), W("click", o, C), K(e, t);
			}, ae = (e) => {
				var t = hS();
				V((e) => t.disabled = e, [() => (H(f), U(() => !!H(f)))]), W("click", t, w), K(e, t);
			};
			J(re, (e) => {
				H(u), U(() => H(u).activationAvailable) ? e(ie) : e(ae, -1);
			}), N(A), N(t), V((e, t) => {
				q(c, `${e ?? ""} · ${H(a), U(() => H(a).assessment?.epochStatus || "COMPLETE") ?? ""}`), q(h, (H(a), U(() => H(a).summary || "Independent strategy proposal"))), q(_, t), q(x, (H(o), U(() => H(o).epochLabel))), q(T, (H(o), U(() => H(o).epochObjective))), q(te, (H(a), U(() => H(a).operatorDecision))), q(ne, `Activation records revision ${H(l), U(() => H(l).strategy.charter.revision + 1) ?? ""} and resets measurement boundaries. Campaign phase and dispatch state remain unchanged.`);
			}, [() => (H(d), U(() => H(d).reviewKind?.replaceAll("-", " ") || "REVIEW")), () => (H(a), U(() => H(a).recommendation?.replaceAll("_", " ")))]), K(e, t);
		};
		J(O, (e) => {
			H(d) ? (H(d), U(() => H(d).status === "drafting" || H(d).status === "queued") ? e(A, 1) : (H(d), U(() => H(d).status === "drafted") && e(j, 2))) : e(k);
		});
		var ee = z(O, 2), te = (e) => {
			var t = _S(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `strategy-workspace-feedback ${H(y) ?? ""}`, "svelte-1ull9g0"), q(n, H(v));
			}), K(e, t);
		};
		J(ee, (e) => {
			H(v) && e(te);
		});
		var M = z(ee, 2), ne = (e) => {
			var t = yS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(u), U(() => H(u).charterHistory)), _a, (e, t) => {
				var n = vS(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e) => {
					q(i, `REV ${H(t), U(() => H(t).revision) ?? ""}`), q(s, (H(t), U(() => H(t).charter.epoch?.label || "Campaign charter"))), q(l, `${H(t), U(() => H(t).actor) ?? ""} · ${e ?? ""}`);
				}, [() => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(u), U(() => H(u).charterHistory.length) ?? ""} revision${H(u), U(() => H(u).charterHistory.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(M, (e) => {
			H(u), U(() => H(u).charterHistory?.length) && e(ne);
		});
		var re = z(M, 2), ie = (e) => {
			var t = xS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(u), U(() => H(u).reviews)), _a, (e, t) => {
				var n = bS(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e, n, r) => {
					q(i, e), q(s, (H(t), U(() => H(t).response?.summary || H(t).triggerReason))), q(l, `${H(t), U(() => H(t).reviewKind) ?? ""} · ${H(t), U(() => H(t).requestSource) ?? ""} · cap ${n ?? ""} · revision ${H(t), U(() => H(t).baseRevision) ?? ""} · ${r ?? ""}${H(t), U(() => H(t).error ? ` · ${H(t).error}` : "") ?? ""}`);
				}, [
					() => (H(t), U(() => H(t).status.toUpperCase())),
					() => (H(t), U(() => Number(H(t).resourceCap || 0).toLocaleString())),
					() => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))
				]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(u), U(() => H(u).reviews.length) ?? ""} review${H(u), U(() => H(u).reviews.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(re, (e) => {
			H(u), U(() => H(u).reviews?.length) && e(ie);
		}), N(D), N(t), V(() => {
			t.open = H(c), q(x, `Charter revision ${H(l), U(() => H(l).strategy.charter.revision) ?? ""}`), q(E, (H(d), U(() => H(d)?.status === "drafting" ? "SOL REVIEW RUNNING" : H(d)?.status === "drafted" ? "HUMAN GATE" : "NO STRATEGY JOB RUNNING")));
		}), K(e, t);
	};
	J(E, (e) => {
		H(l), H(u), U(() => H(l)?.strategy && H(u)) && e(D);
	}), K(e, T), xt(), i();
}
//#endregion
//#region src/ui/CustodyService.svelte
Zi(["click"]), Ho();
var wS = /* @__PURE__ */ G("<li class=\"svelte-pcnttw\"> </li>"), TS = /* @__PURE__ */ G("<button class=\"primary-button compact svelte-pcnttw\"> </button>"), ES = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\"> </button>"), DS = /* @__PURE__ */ G("<code class=\"svelte-pcnttw\"> </code>"), OS = /* @__PURE__ */ G("<b class=\"svelte-pcnttw\"> </b><p class=\"svelte-pcnttw\"> </p>", 1), kS = /* @__PURE__ */ G("<div class=\"custody-receipt-review svelte-pcnttw\"><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">MEASURED RESULT</span><strong class=\"svelte-pcnttw\"> </strong></div><b class=\"svelte-pcnttw\"> </b></header> <div class=\"custody-receipt-metrics svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span></div> <!> <details class=\"svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect checks, worktree, and immutable bindings</summary><div class=\"svelte-pcnttw\"><b class=\"svelte-pcnttw\">Producer</b><code class=\"svelte-pcnttw\"> </code><b class=\"svelte-pcnttw\">Worktree</b><code class=\"svelte-pcnttw\"> </code><!></div></details> <footer class=\"svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\">Reject result</button><button class=\"primary-button svelte-pcnttw\"> </button></footer> <small class=\"svelte-pcnttw\">Landing rechecks the exact receipt and clean checkout, then cherry-picks only the frozen producer commit. It never pushes or promotes a claim.</small></div>"), AS = /* @__PURE__ */ G("<div><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <strong class=\"svelte-pcnttw\"> </strong> <small class=\"svelte-pcnttw\"> </small></div> <!></div> <!>", 1), jS = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\">Park</button> <button class=\"primary-button svelte-pcnttw\"> </button>", 1), MS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\"> </span><button class=\"outline-button compact svelte-pcnttw\">Park</button>", 1), NS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">Research continues independently while this isolated steward works.</span>"), PS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">The measured receipt above has no landing authority until you accept it.</span>"), FS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">The steward stopped without landing. Inspect the receipt before parking or reshaping the contract.</span><button class=\"outline-button compact svelte-pcnttw\">Park</button>", 1), IS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">Outside the active service queue.</span><button class=\"outline-button compact svelte-pcnttw\">Restore to inbox</button>", 1), LS = /* @__PURE__ */ G("<article><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><strong class=\"svelte-pcnttw\"> </strong></div> <b> </b></header> <p class=\"svelte-pcnttw\"> </p> <div class=\"custody-item-facts svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span></div> <details class=\"custody-contract svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect acceptance contract <strong class=\"svelte-pcnttw\"> </strong></summary> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ACCEPT WHEN</span><ul class=\"svelte-pcnttw\"></ul></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ALLOWED PATHS</span><code class=\"svelte-pcnttw\"> </code></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">HARD STOP</span><p class=\"svelte-pcnttw\"> </p></div></details> <!> <footer class=\"svelte-pcnttw\"><!></footer></article>"), RS = /* @__PURE__ */ G("<div class=\"custody-inbox svelte-pcnttw\"></div>"), zS = /* @__PURE__ */ G("<div class=\"custody-empty svelte-pcnttw\"><strong class=\"svelte-pcnttw\">No custody contracts are queued</strong><p class=\"svelte-pcnttw\">Future strategy reviews can stage bounded candidates here. Until then, the service has no authority and consumes no resources.</p></div>"), BS = /* @__PURE__ */ G("<li class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><div class=\"svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><small class=\"svelte-pcnttw\"> </small></div></li>"), VS = /* @__PURE__ */ G("<details class=\"custody-protocol-history svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Custody lease and receipt history <strong> </strong></summary><ol class=\"svelte-pcnttw\"></ol></details>"), HS = /* @__PURE__ */ G("<p class=\"svelte-pcnttw\"> </p>"), US = /* @__PURE__ */ G("<div class=\"custody-violations svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><!></div>"), WS = /* @__PURE__ */ G("<div role=\"status\"> </div>"), GS = /* @__PURE__ */ G("<details id=\"custody-service\" class=\"custody-service svelte-pcnttw\"><summary class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"><small class=\"svelte-pcnttw\">CUSTODY SERVICE</small><strong class=\"svelte-pcnttw\"> </strong></span> <span class=\"custody-summary-counts svelte-pcnttw\"><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><i class=\"svelte-pcnttw\">SEPARATE EXECUTOR</i></span></summary> <div class=\"custody-body svelte-pcnttw\"><div class=\"custody-boundary svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ADAPTER</span><strong class=\"svelte-pcnttw\">Terra local steward</strong><small class=\"svelte-pcnttw\"> </small></div> <p class=\"svelte-pcnttw\">Custody can repair, verify, archive, and preserve provenance in its own slot pool. It cannot choose research direction, leave its allowed paths, spawn children, promote claims, merge, or push.</p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">HANDOFF RULE</span><strong class=\"svelte-pcnttw\">Two exact human gates</strong><small class=\"svelte-pcnttw\">confirm lease · review receipt</small></div></div> <!> <!> <!> <!></div></details>");
function KS(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F("pending");
	async function d(e, t) {
		if (!H(o) || H(c)) return;
		let n = t.startsWith("lease."), r = t.startsWith("receipt."), i = n || r ? `custody.${t}` : `custody.item.${t}`, a = t === "lease.prepare" ? e.id : n ? e.activeLease?.id || "" : e.id, s = r ? e.activeLease?.id || "" : a;
		if (s) {
			I(c, `${s}:${t}`), I(u, "pending"), I(l, t === "promote" ? "Checking the immutable custody contract…" : t === "park" ? "Parking this service item…" : t === "restore" ? "Returning this item to the proposed inbox…" : t === "lease.prepare" ? "Freezing the exact revision-bound custody lease…" : t === "lease.confirm" ? "Confirming the exact lease digest…" : t === "lease.dispatch" ? "Creating the detached worktree and starting one Terra steward…" : t === "lease.simulate" ? "Generating a deterministic zero-effect protocol receipt…" : t === "lease.replay" ? "Replaying and verifying the persisted lease and receipt digests…" : t === "receipt.land" ? "Rechecking and landing the exact isolated producer commit…" : "Rejecting this receipt without landing its changes…");
			try {
				await ns({
					projectId: H(o).id,
					type: i,
					targetId: s,
					scope: "custody-service",
					args: t === "lease.confirm" || t === "lease.dispatch" ? { leaseDigest: e.activeLease?.leaseDigest } : t === "receipt.land" || t === "receipt.reject" ? {
						receiptDigest: e.activeLease?.receiptDigest,
						reason: t === "receipt.reject" ? "Operator rejected the isolated custody result at its landing gate." : void 0
					} : { note: t === "promote" ? "Operator approved the bounded custody contract for separate steward handoff." : n ? "Operator exercised the custody lease protocol." : "Operator changed custody inbox disposition." }
				}), I(u, "success"), I(l, t === "promote" ? "Marked ready. No steward was started and campaign execution was not changed." : t === "park" ? "Item parked outside the active service inbox." : t === "restore" ? "Item restored as a proposed custody contract." : t === "lease.prepare" ? "Immutable lease prepared. No steward has started; review and confirm the exact digest next." : t === "lease.confirm" ? "Exact lease confirmed. The slot is reserved, but no steward has started yet." : t === "lease.dispatch" ? "One Terra steward started inside the lease-bound detached worktree." : t === "lease.simulate" ? "Deterministic zero-effect receipt recorded. The custody item remains ready." : t === "lease.replay" ? "Lease and receipt replay verified with no real effects." : t === "receipt.land" ? "The reviewed custody receipt landed locally. Nothing was pushed and no claim was promoted." : "Receipt rejected. Its isolated worktree was not landed.");
			} catch (e) {
				I(u, "error"), I(l, e instanceof Error ? e.message : String(e));
			} finally {
				I(c, "");
			}
		}
	}
	B(() => n(), () => {
		I(o, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(o), () => {
		I(s, H(o)?.custody || null);
	}), B(() => H(s), () => {
		I(a, H(s)?.items?.filter((e) => !["complete", "failed"].includes(e.status)) || []);
	}), Br(), vo();
	var f = ca(), p = R(f), m = (e) => {
		var t = GS(), n = L(t), r = L(n), i = z(L(r)), o = L(i, !0);
		N(i), N(r);
		var f = z(r, 2), p = L(f), m = L(p);
		N(p);
		var h = z(p), g = L(h);
		N(h), Ke(), N(f), N(n);
		var _ = z(n, 2), v = L(_), y = L(v), b = z(L(y), 2), x = L(b, !0);
		N(b), N(y), Ke(4), N(v);
		var S = z(v, 2), C = (e) => {
			var t = RS();
			Y(t, 5, () => H(a), (e) => e.id, (e, t) => {
				var n = LS();
				let r;
				var i = L(n), a = L(i), o = L(a), l = L(o);
				N(o);
				var u = z(o), f = L(u, !0);
				N(u), N(a);
				var p = z(a, 2), m = L(p, !0);
				N(p), N(i);
				var h = z(i, 2), g = L(h, !0);
				N(h);
				var _ = z(h, 2), v = L(_), y = L(v, !0);
				N(v);
				var b = z(v, 2), x = L(b);
				N(b);
				var S = z(b, 2), C = L(S);
				N(S);
				var w = z(S, 2), T = L(w, !0);
				N(w), N(_);
				var E = z(_, 2), D = L(E), O = z(L(D)), k = L(O, !0);
				N(O), N(D);
				var A = z(D, 2), j = z(L(A));
				Y(j, 5, () => (H(t), U(() => H(t).acceptance.acceptanceCriteria)), _a, (e, t) => {
					var n = wS(), r = L(n, !0);
					N(n), V(() => q(r, H(t))), K(e, n);
				}), N(j), N(A);
				var ee = z(A, 2), te = z(L(ee)), M = L(te, !0);
				N(te), N(ee);
				var ne = z(ee, 2), re = z(L(ne)), ie = L(re, !0);
				N(re), N(ne), N(E);
				var ae = z(E, 2), oe = (e) => {
					var n = AS(), r = R(n);
					let i;
					var a = L(r), o = L(a), s = L(o, !0);
					N(o);
					var l = z(o, 2), u = L(l, !0);
					N(l);
					var f = z(l, 2), p = L(f, !0);
					N(f), N(a);
					var m = z(a, 2), h = (e) => {
						var n = TS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).id}:lease.prepare` ? "Freezing…" : "Freeze custody lease")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => d(H(t), "lease.prepare")), K(e, n);
					}, g = (e) => {
						var n = ES(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.simulate` ? "Simulating…" : "Simulate zero-effect receipt")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => d(H(t), "lease.simulate")), K(e, n);
					}, _ = (e) => {
						var n = TS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.confirm` ? "Confirming…" : "Confirm exact lease")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => d(H(t), "lease.confirm")), K(e, n);
					}, v = (e) => {
						var n = TS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.dispatch` ? "Starting…" : "Dispatch Terra steward")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => d(H(t), "lease.dispatch")), K(e, n);
					}, y = (e) => {
						var n = ES(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.replay` ? "Verifying replay…" : "Replay & verify receipt")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => d(H(t), "lease.replay")), K(e, n);
					};
					J(m, (e) => {
						H(t), U(() => !H(t).activeLease) ? e(h) : (H(t), U(() => H(t).activeLease.lease?.adapter?.executionMode === "disconnected" && H(t).activeLease.status === "prepared") ? e(g, 1) : (H(t), U(() => H(t).activeLease.status === "prepared") ? e(_, 2) : (H(t), U(() => H(t).activeLease.status === "confirmed") ? e(v, 3) : (H(t), U(() => H(t).activeLease.status === "simulated") && e(y, 4)))));
					}), N(r);
					var b = z(r, 2), x = (e) => {
						var n = kS(), r = L(n), i = L(r), a = z(L(i)), o = L(a, !0);
						N(a), N(i);
						var s = z(i), l = L(s, !0);
						N(s), N(r);
						var u = z(r, 2), f = L(u), p = L(f);
						N(f);
						var m = z(f), h = L(m);
						N(m);
						var g = z(m), _ = L(g);
						N(g);
						var v = z(g), y = L(v);
						N(v), N(u);
						var b = z(u, 2), x = (e) => {
							var n = DS(), r = L(n, !0);
							N(n), V((e) => q(r, e), [() => (H(t), U(() => H(t).activeLease.receipt.effects.changedPaths.join(" · ")))]), K(e, n);
						};
						J(b, (e) => {
							H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length) && e(x);
						});
						var S = z(b, 2), C = z(L(S)), w = z(L(C)), T = L(w, !0);
						N(w);
						var E = z(w, 2), D = L(E, !0);
						N(E), Y(z(E), 1, () => (H(t), U(() => H(t).activeLease.receipt?.checks || [])), _a, (e, t) => {
							var n = OS(), r = R(n), i = L(r, !0);
							N(r);
							var a = z(r), o = L(a, !0);
							N(a), V(() => {
								q(i, (H(t), U(() => H(t).status))), q(o, (H(t), U(() => H(t).detail)));
							}), K(e, n);
						}), N(C), N(S);
						var O = z(S, 2), k = L(O), A = z(k), j = L(A, !0);
						N(A), N(O), Ke(2), N(n), V((e, n, r) => {
							q(o, (H(t), U(() => H(t).activeLease.receipt?.summary || "Custody result ready"))), q(l, (H(t), U(() => H(t).activeLease.receipt?.status))), q(p, `${H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length || 0) ?? ""} changed path${H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length === 1 ? "" : "s") ?? ""}`), q(h, `${H(t), U(() => H(t).activeLease.receipt?.usage?.tokens ?? "unmetered") ?? ""} tokens`), q(_, `${e ?? ""} min`), q(y, `${H(t), U(() => H(t).activeLease.verification?.warnings?.length || 0) ?? ""} warning${H(t), U(() => H(t).activeLease.verification?.warnings?.length === 1 ? "" : "s") ?? ""}`), q(T, (H(t), U(() => H(t).activeLease.producerCommit || "verification-only · no file commit"))), q(D, (H(t), U(() => H(t).activeLease.worktreePath))), k.disabled = n, A.disabled = r, q(j, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:receipt.land` ? "Landing…" : H(t).activeLease.producerCommit ? "Accept & land locally" : "Accept verification receipt")));
						}, [
							() => (H(t), U(() => Math.ceil(H(t).activeLease.receipt?.usage?.minutes || 0))),
							() => (H(c), U(() => !!H(c))),
							() => (H(c), H(t), U(() => !!H(c) || !H(t).activeLease.verification?.landable))
						]), W("click", k, () => d(H(t), "receipt.reject")), W("click", A, () => d(H(t), "receipt.land")), K(e, n);
					};
					J(b, (e) => {
						H(t), U(() => H(t).activeLease?.status === "awaiting_review") && e(x);
					}), V(() => {
						i = X(r, 1, "custody-protocol-lab execution svelte-pcnttw", null, i, { attention: H(t).activeLease?.status === "awaiting_review" }), q(s, (H(t), U(() => H(t).activeLease?.status === "awaiting_review" ? "RECEIPT LANDING GATE" : H(t).activeLease?.status === "running" || H(t).activeLease?.status === "finalizing" ? "ISOLATED STEWARD ACTIVE" : "CUSTODY ACTION RAIL"))), q(u, (H(t), U(() => H(t).activeLease ? H(t).activeLease.status === "prepared" ? "2. Confirm this revision and contract" : H(t).activeLease.status === "confirmed" ? "3. Dispatch one bounded Terra steward" : H(t).activeLease.status === "running" ? "Steward working in detached custody" : H(t).activeLease.status === "finalizing" ? "Measuring paths, usage, and checks" : H(t).activeLease.status === "awaiting_review" ? "4. Review and land—or reject" : `Lease ${H(t).activeLease.status}` : "1. Freeze the exact lease"))), q(p, (H(t), U(() => H(t).activeLease?.receiptDigest || H(t).activeLease?.leaseDigest || "Preparing a lease changes no files and starts no worker.")));
					}), K(e, n);
				}, se = /* @__PURE__ */ P(() => (H(t), U(() => [
					"ready",
					"assigned",
					"verifying"
				].includes(H(t).status))));
				J(ae, (e) => {
					H(se) && e(oe);
				});
				var ce = z(ae, 2), le = L(ce), ue = (e) => {
					var n = jS(), r = R(n), i = z(r, 2), a = L(i, !0);
					N(i), V((e, n) => {
						r.disabled = e, i.disabled = n, q(a, (H(c), H(t), U(() => H(c) === `${H(t).id}:promote` ? "Checking contract…" : "Mark ready for steward")));
					}, [() => (H(c), U(() => !!H(c))), () => (H(c), H(t), U(() => !!H(c) || !H(t).eligibleToReady))]), W("click", r, () => d(H(t), "park")), W("click", i, () => d(H(t), "promote")), K(e, n);
				}, de = (e) => {
					var n = MS(), r = R(n), i = L(r, !0);
					N(r);
					var a = z(r);
					V((e) => {
						q(i, (H(t), U(() => H(t).activeLease ? "Lease sequence is controlled above." : "Eligible for the separate custody executor; still not dispatched."))), a.disabled = e;
					}, [() => (H(c), H(t), U(() => !!H(c) || !!H(t).activeLease))]), W("click", a, () => d(H(t), "park")), K(e, n);
				}, fe = (e) => {
					K(e, NS());
				}, pe = (e) => {
					K(e, PS());
				}, me = (e) => {
					var n = FS(), r = z(R(n));
					V((e) => r.disabled = e, [() => (H(c), U(() => !!H(c)))]), W("click", r, () => d(H(t), "park")), K(e, n);
				}, he = (e) => {
					var n = IS(), r = z(R(n));
					V((e) => r.disabled = e, [() => (H(c), U(() => !!H(c)))]), W("click", r, () => d(H(t), "restore")), K(e, n);
				};
				J(le, (e) => {
					H(t), U(() => H(t).status === "proposed") ? e(ue) : (H(t), U(() => H(t).status === "ready") ? e(de, 1) : (H(t), U(() => H(t).status === "assigned") ? e(fe, 2) : (H(t), U(() => H(t).status === "verifying") ? e(pe, 3) : (H(t), U(() => H(t).status === "blocked") ? e(me, 4) : (H(t), U(() => H(t).status === "parked") && e(he, 5))))));
				}), N(ce), N(n), V((e, i) => {
					r = X(n, 1, "svelte-pcnttw", null, r, {
						blocking: H(t).blocksResearch,
						parked: H(t).status === "parked"
					}), q(l, `${H(t), U(() => H(t).urgency) ?? ""} · ${H(t), U(() => H(t).capability) ?? ""} · ${H(t), U(() => H(t).strategicTrack) ?? ""}`), q(f, (H(t), U(() => H(t).task))), X(p, 1, (H(t), U(() => `custody-status-${H(t).status}`)), "svelte-pcnttw"), q(m, e), q(g, (H(t), U(() => H(t).reason))), q(y, (H(t), U(() => H(t).blocksResearch ? "BLOCKS RESEARCH" : "NON-BLOCKING"))), q(x, `repair generation ${H(t), U(() => H(t).repairGeneration) ?? ""}/${H(s), U(() => H(s).policy.maxAutomaticRepairGeneration) ?? ""}`), q(C, `${H(t), U(() => H(t).effortClass) ?? ""} effort`), q(T, (H(t), U(() => H(t).contractComplete ? "contract complete" : "contract incomplete"))), q(k, (H(t), U(() => H(t).acceptance.receiptType || "receipt missing"))), q(M, i), q(ie, (H(t), U(() => H(t).acceptance.stopCondition || "No stop condition declared")));
				}, [() => (H(t), U(() => H(t).status.toUpperCase())), () => (H(t), U(() => H(t).acceptance.allowedPaths.length ? H(t).acceptance.allowedPaths.join(" · ") : "No paths declared"))]), K(e, n);
			}), N(t), K(e, t);
		}, w = (e) => {
			K(e, zS());
		};
		J(S, (e) => {
			H(a), U(() => H(a).length) ? e(C) : e(w, -1);
		});
		var T = z(S, 2), E = (e) => {
			var t = VS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(s), U(() => H(s).protocol.leases)), _a, (e, t) => {
				var n = BS(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e, n) => {
					q(i, e), q(s, (H(t), U(() => H(t).receiptDigest || H(t).leaseDigest))), q(l, `${H(t), U(() => H(t).adapterId) ?? ""} · ${n ?? ""}${H(t), U(() => H(t).producerCommit ? " · isolated commit frozen" : H(t).verification?.ok ? " · receipt verified" : "") ?? ""}`);
				}, [() => (H(t), U(() => H(t).status.toUpperCase())), () => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(s), U(() => H(s).protocol.leases.length) ?? ""} lease${H(s), U(() => H(s).protocol.leases.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(T, (e) => {
			H(s), U(() => H(s).protocol?.leases?.length) && e(E);
		});
		var D = z(T, 2), O = (e) => {
			var t = US(), n = L(t), r = L(n);
			N(n), Y(z(n), 1, () => (H(s), U(() => H(s).violations)), _a, (e, t) => {
				var n = HS(), r = L(n, !0);
				N(n), V(() => q(r, (H(t), U(() => H(t).detail)))), K(e, n);
			}), N(t), V(() => q(r, `${H(s), U(() => H(s).violations.length) ?? ""} contract warning${H(s), U(() => H(s).violations.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(D, (e) => {
			H(s), U(() => H(s).violations?.length) && e(O);
		});
		var k = z(D, 2), A = (e) => {
			var t = WS(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `custody-feedback ${H(u) ?? ""}`, "svelte-pcnttw"), q(n, H(l));
			}), K(e, t);
		};
		J(k, (e) => {
			H(l) && e(A);
		}), N(_), N(t), V(() => {
			t.open = (H(s), U(() => H(s).counts.open > 0)), q(o, (H(s), U(() => H(s).counts.open ? `${H(s).counts.open} item${H(s).counts.open === 1 ? "" : "s"} in the service inbox` : "Mechanical work has its own boundary"))), q(m, `${H(s), U(() => H(s).counts.blocking) ?? ""} blocking`), q(g, `${H(s), U(() => H(s).counts.active) ?? ""} active`), q(x, (H(s), U(() => H(s).executorConnected ? "ready on demand · isolated worktree" : "simulation only")));
		}), K(e, t);
	};
	J(p, (e) => {
		H(s) && e(m);
	}), K(e, f), xt(), i();
}
//#endregion
//#region src/ui/App.svelte
Zi(["click"]), Ho();
var qS = /* @__PURE__ */ G("<span class=\"access-identity\"><b> </b> </span>"), JS = /* @__PURE__ */ G("<section id=\"observer-lanes\" class=\"observer-surface all-jobs-surface\" aria-label=\"All observed agent lanes\"><header><div><p class=\"eyebrow\">ALL JOBS OVERVIEW</p><h2>Every visible lane, in one place</h2></div><span>Read-only across projects · choose a campaign to open its controls</span></header> <!></section>"), YS = /* @__PURE__ */ G("<!> <!> <!> <!> <details class=\"autopilot-ledger\"><summary><span><small>AUTOPILOT DETAIL</small><strong>Step ledger, frozen schedule, and advanced controls</strong></span><b>Expand</b></summary> <!></details> <!> <section class=\"workspace-switchboard\" aria-label=\"Campaign detail drawers\"><header><div><p class=\"eyebrow\">CAMPAIGN DETAIL</p><h2>Context stays close without crowding the controls</h2></div><span>Open only what you need</span></header> <details id=\"campaign-context\" class=\"workspace-group\"><summary><span><small>OBJECTIVE & INPUTS</small><strong>Campaign grounding, interpretation, and packet inbox</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details> <details id=\"process-history\" class=\"workspace-group\"><summary><span><small>PROCESS MAP & HISTORY</small><strong>Full branching map, event replay, and campaign epochs</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!></div></details> <details id=\"evidence-workspace\" class=\"workspace-group\"><summary><span><small>WAVE & EVIDENCE</small><strong>Accounting, custody, and observed workers</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <section id=\"observer-lanes\" class=\"observer-surface\" aria-label=\"Observed agent lanes\"><header><div><p class=\"eyebrow\">LANE OBSERVER</p><h2>Workers, receipts, and recent history</h2></div><span>Drill down without leaving campaign control</span></header> <!></section></div></details> <details id=\"strategy-workspaces\" class=\"workspace-group\"><summary><span><small>STRATEGY & BRANCHES</small><strong>Portfolio, resources, independent review, and redirects</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <!> <!></div></details> <details id=\"system-workspace\" class=\"workspace-group\"><summary><span><small>SYSTEM & COORDINATION</small><strong>Future-run settings, access, quotas, and Sol console</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details></section>", 1), XS = /* @__PURE__ */ G("<header class=\"topbar\"><a class=\"topbar-brand\" href=\"/\" title=\"Open all jobs\"><p class=\"eyebrow\">CAMPAIGN CONTROL</p> <h1>Lane Watch</h1></a> <!> <div class=\"connection-wrap\"><!> <button aria-label=\"Refresh all campaign and lane states\">↻</button> <span></span> <span> </span></div></header> <main><!></main>", 1);
function ZS(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt();
	wo(() => {
		let e = Bo(), t = ss();
		return () => {
			e(), t();
		};
	}), vo();
	var a = XS(), o = R(a), s = L(o), c = z(s, 2);
	mx(c, {});
	var l = z(c, 2), u = L(l), d = (e) => {
		var t = qS(), r = L(t), i = L(r, !0);
		N(r);
		var a = z(r, 1, !0);
		N(t), V((e) => {
			Z(t, "title", e), q(i, n().access.role), q(a, n().access.identity);
		}, [() => `${n().access.projects.includes("*") ? "Read all projects" : `Read ${n().access.projects.join(", ")}`} · ${n().access.mutableProjects.includes("*") ? "change all projects" : `change ${n().access.mutableProjects.join(", ") || "none"}`}`]), K(e, t);
	};
	J(u, (e) => {
		n().access && e(d);
	});
	var f = z(u, 2);
	let p;
	var m = z(f, 2);
	let h;
	var g = z(m, 2), _ = L(g, !0);
	N(g), N(l), N(o);
	var v = z(o, 2), y = L(v), b = (e) => {
		var t = JS();
		Ds(z(L(t), 2), {}), N(t), K(e, t);
	}, x = (e) => {
		var t = YS(), n = R(t);
		_x(n, {});
		var r = z(n, 2);
		Gx(r, {});
		var i = z(r, 2);
		Ax(i, {});
		var a = z(i, 2);
		Ws(a, {});
		var o = z(a, 2);
		fx(z(L(o), 2), {}), N(o);
		var s = z(o, 2);
		Cx(s, {});
		var c = z(s, 2), l = z(L(c), 2), u = z(L(l), 2), d = L(u);
		Ys(d, {}), bc(z(d, 2), {}), N(u), N(l);
		var f = z(l, 2), p = z(L(f), 2);
		Ub(L(p), {}), N(p), N(f);
		var m = z(f, 2), h = z(L(m), 2), g = L(h);
		ll(g, {});
		var _ = z(g, 2);
		KS(_, {});
		var v = z(_, 2);
		Ds(z(L(v), 2), {}), N(v), N(h), N(m);
		var y = z(m, 2), b = z(L(y), 2), x = L(b);
		Lx(x, {});
		var S = z(x, 2);
		rS(S, {});
		var C = z(S, 2);
		CS(C, {}), Mc(z(C, 2), {}), N(b), N(y);
		var w = z(y, 2), T = z(L(w), 2), E = L(T);
		rl(E, {}), qc(z(E, 2), {}), N(T), N(w), N(c), K(e, t);
	};
	J(y, (e) => {
		n().selectedProject ? e(x, -1) : e(b);
	}), N(v), V(() => {
		p = X(f, 1, "refresh-button", null, p, { refreshing: n().connection === "refreshing" }), f.disabled = n().connection === "refreshing" || n().access?.canMutate === !1, Z(f, "title", n().access?.canMutate === !1 ? "Viewer access is read-only" : "Refresh all campaign and lane states"), h = X(m, 1, "connection-dot", null, h, {
			connecting: n().connection === "connecting" || n().connection === "refreshing",
			offline: n().connection === "offline" || n().connection === "reconnecting"
		}), q(_, n().connectionLabel);
	}), W("click", s, (e) => {
		e.preventDefault(), No("");
	}), W("click", f, () => Ro().catch(() => void 0)), K(e, a), xt(), i();
}
//#endregion
//#region src/ui/main.ts
Zi(["click"]), la(ZS, { target: document.querySelector("#app") });
//#endregion
