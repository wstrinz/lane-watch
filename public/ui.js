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
})), T, E, D, O, k, A, j, ee, M, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve = t((() => {
	T = 1 << 24, E = 1024, D = 2048, O = 4096, k = 8192, A = 16384, j = 32768, ee = 1 << 25, M = 65536, te = 1 << 19, ne = 1 << 20, re = 1 << 25, ie = 65536, ae = 1 << 21, oe = 1 << 22, se = 1 << 23, ce = Symbol("$state"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = Symbol("form reset"), ge = new class extends Error {
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
	ve(), Le(), wt(), Mt(), ri(), Ii(), Ze(), kt(), Ne(), He(), i(), $n(), lr(), dt(), dn(), Or(), zt(), pn = M | te, mn = class {
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
	return Oi !== null && (Oi.f |= te), {
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
	return jr(4 | ne, e);
}
function Ir(e) {
	return kr("$effect.pre"), jr(8 | ne, e);
}
function Lr(e) {
	Zn.ensure();
	let t = jr(64 | te, e);
	return () => {
		Yr(t);
	};
}
function Rr(e) {
	Zn.ensure();
	let t = jr(64 | te, e);
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
	return jr(oe | te, e);
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
	return jr(32 | te, e);
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
	var i = new pa(e), a = n ? M : 0;
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
	}, M);
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
	}, M);
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
	var ee = Es(), M = R(ee), te = L(M);
	let ne;
	var re = L(te), ie = L(re, !0);
	N(re), Ke(), N(te);
	var ae = z(te, 2);
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
	N(he), Ke(), N(pe), N(M);
	var _e = z(M, 2), ve = L(_e);
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
		var j = z(m, 2), ee = L(j), M = L(ee, !0);
		N(ee);
		var te = z(ee), ne = L(te);
		N(te), N(j), N(n), V((e, r, i) => {
			X(n, 1, `lane-card ${H(t), U(() => H(t).severity) ?? ""}`), Z(n, "aria-label", (H(t), U(() => `Open ${H(t).task} details`))), q(a, (H(t), U(() => H(t).lane))), q(s, (H(t), U(() => H(t).status))), q(l, (H(t), U(() => H(t).task))), q(d, (H(t), U(() => H(t).detail || H(t).output || (H(t).severity === "complete" ? "Coordinator completion recorded." : "No current detail reported.")))), q(g, (H(t), U(() => H(t).model))), q(b, (H(t), U(() => H(t).project))), q(S, (H(t), U(() => H(t).host === "macbook" ? "Mac" : "Windows"))), X(C, 1, `meta-chip ownership-chip ${e ?? ""}`), q(w, r), q(M, (H(t), U(() => H(t).jobId || "no job"))), q(ne, `updated ${i ?? ""}`);
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
		var A = z(O, 2), ee = z(L(A)), M = L(ee), te = z(M, 2, !0), ne = z(te, 2, !0);
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
			q(a, `${H(f), U(() => H(f).lane) ?? ""} · ${H(f), U(() => H(f).project) ?? ""} · ${H(f), U(() => H(f).host === "macbook" ? "Mac" : "Windows") ?? ""}`), q(s, (H(f), U(() => H(f).task))), q(_, (H(f), U(() => H(f).detail || "No current detail reported."))), q(M, `Job ${H(f), U(() => H(f).jobId || "—") ?? ""}`), q(te, (H(f), U(() => H(f).branch || "No branch recorded"))), q(ne, (H(f), U(() => H(f).worktree || "No worktree recorded")));
		}), W("click", c, () => H(v).close()), K(e, t);
	};
	J(Pe, (e) => {
		H(f) && e(Fe);
	}), N(Ne), ho(Ne, (e) => I(v, e), () => H(v)), V((e) => {
		ne = X(te, 1, "summary-card working", null, ne, { selected: H(h) === "running" }), q(ie, (H(l), U(() => H(l).working))), oe = X(ae, 1, "summary-card idle", null, oe, { selected: H(h) === "running" }), q(ce, (H(l), U(() => H(l).idle))), ue = X(le, 1, "summary-card attention", null, ue, { selected: H(h) === "attention" }), q(fe, (H(l), U(() => H(l).attention))), me = X(pe, 1, "summary-card complete", null, me, { selected: H(h) === "recent" }), q(ge, (H(l), U(() => H(l).complete))), we !== (we = (n(), U(() => n().selectedProject))) && (Se.value = (Se.__value = (n(), U(() => n().selectedProject))) ?? "", Ba(Se, (n(), U(() => n().selectedProject)))), Ee = X(Te, 1, "outline-button", null, Ee, { enabled: r() === "enabled" }), Te.disabled = e, q(De, H(m));
	}, [() => (r(), U(() => ["loading", "unsupported"].includes(r())))]), W("click", te, () => I(h, "running")), W("click", ae, () => I(h, "running")), W("click", le, () => I(h, "attention")), W("click", pe, () => I(h, "recent")), so(xe, () => H(g), (e) => I(g, e)), W("change", Se, (e) => No(e.currentTarget.value)), W("click", Te, function(...e) {
		os?.apply(this, e);
	}), Xi("close", Ne, A), K(e, ee), xt(), a();
}
Zi(["click", "change"]);
//#endregion
//#region src/ui/campaign-guidance.ts
function Os(e) {
	return [...e?.researchRuns || []].sort((e, t) => String(t.createdAt || "").localeCompare(String(e.createdAt || "")))[0];
}
function ks(e) {
	return e?.status === "awaiting_evidence" || e?.status === "failed" && /Evidence receipt is not ready/i.test(e.error || "");
}
function As(e) {
	let t = Os(e), n = {
		key: "reveal",
		label: "View result and evidence",
		target: "#evidence-workspace",
		style: "outline-button"
	};
	if (ks(t)) return {
		status: "RESULT NEEDS CHECKING",
		title: "Recover the finished result",
		detail: "The worker has stopped. Its evidence needs a custody check before review; restarting the research will not resolve this. " + String(t.error || "The receipt is not yet validated."),
		actions: [{
			key: "refresh",
			label: "Recheck existing receipt",
			style: "primary-button"
		}, n]
	};
	if (t?.status === "evidence_ready" && ["RESEARCH_READY", "RESEARCH_INTAKE"].includes(e.phase)) return {
		status: "RESULT READY",
		title: "Review the finished research",
		detail: String(t.evidenceSummary?.verdict || t.evidence?.terminal_state || t.evidence?.verdict || t.evidenceSummary?.status || t.evidence?.status || "Receipt validated") + ". " + (e.researchPlan?.response?.lanes?.find((e) => e.taskId === t.taskId)?.question || t.taskId).replace(/[.!?]+$/, "") + ". Continue to a synthesis of this result; no new research is launched.",
		actions: [{
			key: "research.evidence.return",
			targetId: t.id,
			label: "Continue to result review",
			style: "primary-button"
		}, n]
	};
	if (e.phase !== "RESEARCH_READY" || e.custody?.counts?.blocking) return null;
	let r = e.researchSchedule;
	return r?.status === "proposed" ? {
		status: "SCHEDULE READY",
		title: "Review the launch plan",
		detail: r.proposal?.summary || "Confirm this exact set of tasks and its resource reservation.",
		actions: [{
			key: "research.schedule.confirm",
			targetId: r.id,
			args: { scheduleDigest: r.digest },
			label: "Confirm schedule",
			style: "primary-button"
		}]
	} : r?.status === "confirmed" ? {
		status: "READY TO LAUNCH",
		title: "Start the confirmed research",
		detail: "Launch only the tasks in this confirmed schedule.",
		actions: [{
			key: "research.schedule.dispatch",
			targetId: r.id,
			args: { scheduleDigest: r.digest },
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
function js(e) {
	return e === "medium" ? 1e5 : 5e4;
}
function Ms(e) {
	let t = e?.receipt || {}, n = [
		t.summary,
		t.stopReason,
		...Array.isArray(t.checks) ? t.checks.map((e) => e?.detail) : []
	].filter(Boolean).join(" ").match(/(?:fixed\s+)?([\d,]+)-token(?:\s+lease)?(?:\s+(?:budget|ceiling))?/i);
	return n ? Number(n[1].replaceAll(",", "")) : 0;
}
function Ns(e) {
	if (!["blocked", "failed"].includes(String(e?.status || ""))) return !1;
	let t = Array.isArray(e?.receipt?.effects?.changedPaths) ? e.receipt.effects.changedPaths : [], n = Ms(e), r = Number(e?.tokenCap || js(e?.effortClass === "medium" ? "medium" : "small"));
	return t.length === 0 && n > 0 && r > n;
}
//#endregion
//#region src/ui/custody-reshape.ts
function Ps(e, t, n, r, i, a, o, s = []) {
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
function Fs(e, t = "") {
	if (Ns(e)) return !1;
	let n = `${e?.receipt?.summary || ""} ${e?.receipt?.stopReason || ""} ${t}`, r = Number(e?.receipt?.usage?.tokens || 0);
	return (e?.capability !== "portability" && r > 5e4 || /automatic retry limit|exceeded (?:its )?(?:fixed )?[\d,]*-?token|crossed its token ceiling|contract too large|reshape or resize/i.test(n)) && (!t || !/automatic retry limit/i.test(t) || !e?.task || t.includes(e.task));
}
function Is(e) {
	return /asymmetric-laboratory intake replay/i.test(e?.task || "") ? [Ps(e, "Verify frozen asymmetric manifest, provenance, and control count", "Separate source binding and the eleven-type inventory audit from computational replay so a mismatch can stop cheaply.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Verify the 8-trivial/6-C2 inventory and correct the control count to six.",
		"Limit every accepted statement to the frozen named pools; make no repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-check-v1/**", "Stop at the first source-binding, provenance, orientation, or count mismatch. Do not replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens."), Ps(e, "Replay frozen asymmetric deduplication and reconcile resource scope", "Run only the exact role-preserving replay after the manifest check, with runtime accounting isolated from source-provenance inspection.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Reconcile the replay token, process wall-time, observer wall-time, and peak-memory scopes.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-resource-scope-v1/**", "Stop on the first changed candidate count, predecessor-receipt mismatch, or resource-ceiling breach. Do not run SAT, generate candidates, measure slack/liftability, or open another repair generation.")] : /verify frozen asymmetric manifest, provenance, and control count/i.test(e?.task || "") ? [Ps(e, "Bind the frozen asymmetric manifest and provenance", "Keep immutable source binding separate from the eleven-type inventory check so either boundary can settle inside one small lease.", "small", [
		"Bind the check to one immutable successor commit and frozen named-pool manifest.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
		"Limit every accepted statement to the frozen named pools; make no inventory or repository-wide ceiling claim."
	], "results/inbox/asym-lab-manifest-provenance-binding-v1/**", "Stop at the first source-binding, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens."), Ps(e, "Verify the frozen asymmetric type inventory and control count", "Consume the source-bound manifest receipt and check only the finite inventory arithmetic and six-control correction.", "small", [
		"Consume the exact predecessor manifest-and-provenance receipt without reopening its source search.",
		"Verify the 8-trivial/6-C2 inventory over the frozen named pools.",
		"Correct the control count to six and emit graph-effect NONE.",
		"Make no repository-wide ceiling claim and change no producer artifact."
	], "results/inbox/asym-lab-inventory-control-count-v1/**", "Stop if the predecessor receipt is absent or the frozen inventory differs. Do not replay generators, run SAT, inspect unrelated candidates, or exceed 50,000 tokens.", ["Bind the frozen asymmetric manifest and provenance"])] : /bind the frozen asymmetric manifest and provenance/i.test(e?.task || "") ? [Ps(e, "Bind the immutable asymmetric successor commit and named-pool manifest", "Freeze only the exact source identity and manifest boundary before asking a separate steward to inspect mathematical provenance.", "small", [
		"Bind one immutable successor commit and the exact frozen named-pool manifest.",
		"Record stable identifiers and content digests for every referenced manifest source.",
		"Make no provenance, orientation, inventory, or repository-wide mathematical claim."
	], "results/inbox/asym-lab-immutable-manifest-binding-v1/**", "Stop at the first missing or ambiguous source binding. Do not inspect mathematical provenance, count types, replay generators, run SAT, or exceed 50,000 tokens."), Ps(e, "Verify frozen asymmetric provenance and CLEAN_MINIMAL orientations", "Consume the exact manifest-binding receipt and verify only the finite provenance and orientation references for the eleven named types.", "small", [
		"Consume the exact predecessor commit-and-manifest binding without reopening source discovery.",
		"Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying named types.",
		"Limit every accepted statement to the frozen named pools and emit graph-effect NONE.",
		"Make no inventory count, replay, or repository-wide ceiling claim."
	], "results/inbox/asym-lab-provenance-orientation-v1/**", "Stop at the first predecessor, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 50,000 tokens.")] : /replay frozen asymmetric deduplication and reconcile resource scope/i.test(e?.task || "") ? [Ps(e, "Replay the frozen role-preserving asymmetric deduplication core", "Run only the exact finite replay; leave accounting and scope policy to a separate receipt-bound check.", "medium", [
		"Consume the verified immutable manifest boundary from the predecessor custody receipt.",
		"Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
		"Record deterministic inputs, outputs, and candidate counts sufficient for a later accounting check.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-exact-replay-core-v1/**", "Stop on the first changed candidate count or predecessor-receipt mismatch. Do not reconcile resource policy, run SAT, generate candidates, measure slack/liftability, or open another repair generation.", ["Bind the frozen asymmetric manifest and provenance", "Verify the frozen asymmetric type inventory and control count"]), Ps(e, "Reconcile frozen asymmetric replay resource measurements", "Check only the completed replay's token and timing scopes instead of repeating its mathematics.", "small", [
		"Consume the exact replay-core receipt without rerunning its mathematical computation.",
		"Reconcile token usage, process wall-time, observer wall-time, and peak-memory scopes.",
		"Preserve unknown measurements as UNKNOWN rather than estimating or imputing zero.",
		"Emit graph-effect NONE and change no mathematical claim or producer artifact."
	], "results/inbox/asym-lab-replay-resource-measurements-v1/**", "Stop if the replay-core receipt is absent or ambiguous. Do not rerun the replay, run SAT, generate candidates, or exceed 50,000 tokens.")] : /epoch resource provenance/i.test(e?.task || "") ? [Ps(e, "Bind missing epoch token measurements to their source runs", "Recover or explicitly classify the six missing token measurements without mixing that source search with policy reconciliation.", "small", [
		"Each of the six run IDs receives a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Unknown values are never imputed as zero.",
		"Receipt-bound, ledger-only, and missing measurements remain distinguished."
	], "results/inbox/strategy-cost-source-binding-v1/**", "One source-binding pass only. Record UNKNOWN with provenance when a measurement cannot be recovered; do not estimate or rerun research."), Ps(e, "Reconcile epoch reservation and wall-time scopes", "Apply the source-bound measurement inventory to the 148,741-versus-80,000 reservation and process-versus-observer timing discrepancy.", "small", [
		"Consume the predecessor source-binding receipt without reopening its source search.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation.",
		"Define and preserve separate process-time and observer end-to-end wall-time scopes.",
		"Change no mathematical claim, candidate, manifest semantics, or campaign phase."
	], "results/inbox/strategy-cost-scope-reconciliation-v1/**", "Stop if the predecessor receipt is absent or ambiguous. Do not estimate missing usage, rerun research, or create another repair generation.")] : /bind missing epoch token measurements to their source runs/i.test(e?.task || "") ? [Ps(e, "Inventory the six epoch run identifiers and token-source locations", "Freeze the source map before attempting any token-value recovery so discovery cannot consume the reconciliation lease.", "small", [
		"Enumerate exactly the six named run IDs from the predecessor contract.",
		"Classify each available source location as receipt-bound, ledger-only, or absent.",
		"Record immutable source references without estimating, copying, or reconciling token values."
	], "results/inbox/strategy-cost-source-inventory-v1/**", "One bounded source-location inventory only. Do not recover values, inspect unrelated runs, estimate usage, or rerun research."), Ps(e, "Bind epoch token values to the frozen six-run inventory", "Recover values only from the predecessor's exact source map and preserve irrecoverable measurements explicitly.", "small", [
		"Consume the exact six-run source inventory receipt without reopening discovery.",
		"Give every run a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
		"Never impute an unknown value as zero and preserve receipt-bound versus ledger-only provenance.",
		"Change no resource policy, mathematical claim, or campaign phase."
	], "results/inbox/strategy-cost-value-binding-v1/**", "Stop when an inventoried source is absent or ambiguous and record UNKNOWN with provenance. Do not estimate, rerun research, or reconcile reservation policy.", ["Inventory the six epoch run identifiers and token-source locations"])] : /reconcile epoch reservation and wall-time scopes/i.test(e?.task || "") ? [Ps(e, "Define frozen epoch reservation and wall-time accounting scopes", "Freeze the exact accounting definitions before applying any measurements so the reconciliation cannot expand into another source search.", "small", [
		"Consume the exact six-run token-value binding receipt and preserve every UNKNOWN value.",
		"Define reservation, process-time, and observer end-to-end wall-time scopes without applying or estimating measurements.",
		"Bind the definitions to the frozen epoch and six-run inventory.",
		"Change no resource policy, mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-scope-definitions-v1/**", "Stop if the six-run value-binding receipt is absent or ambiguous. Do not search for sources, apply measurements, estimate usage, or exceed 50,000 tokens.", ["Bind epoch token values to the frozen six-run inventory"]), Ps(e, "Apply frozen epoch measurements to reservation reconciliation", "Apply only the predecessor's frozen scope definitions and source-bound values in one bounded accounting pass.", "small", [
		"Consume the exact predecessor scope-definition receipt without reopening definitions or source discovery.",
		"Reconcile the 148,741-token observer measurement with the 80,000 reservation while preserving UNKNOWN values.",
		"Report process-time and observer end-to-end wall-time separately.",
		"Emit graph-effect NONE and change no mathematical claim, candidate, or campaign phase."
	], "results/inbox/strategy-cost-reservation-reconciliation-v1/**", "Stop at the first predecessor mismatch or unresolved value. Do not estimate, search other runs, rerun research, or exceed 50,000 tokens.")] : [];
}
//#endregion
//#region src/ui/PrimaryActionRail.svelte
Ho();
var Ls = /* @__PURE__ */ G("<button> </button>"), Rs = /* @__PURE__ */ G("<li><b> </b><span> </span></li>"), zs = /* @__PURE__ */ G("<ul></ul>"), Bs = /* @__PURE__ */ G("<p> </p> <!>", 1), Vs = /* @__PURE__ */ G("<li><b> </b><div><strong> </strong><p> </p><small> </small></div></li>"), Hs = /* @__PURE__ */ G("<ol></ol>"), Us = /* @__PURE__ */ G("<details class=\"rail-inspector\"><summary><span>Inspect the decision packet</span><strong> </strong></summary> <div class=\"rail-packet\"><!> <label class=\"rail-note\"><span>Operator note or revision direction</span><textarea rows=\"3\" placeholder=\"Optional, but useful when redirecting or requesting revision\"></textarea></label></div></details>"), Ws = /* @__PURE__ */ G("<div class=\"recovery-report\"><div class=\"recovery-report-grid\"><div><span>WORKFLOW</span><strong> </strong></div> <div><span>FROZEN WAVE</span><strong> </strong></div> <div><span>ACCOUNTING</span><strong> </strong></div> <div><span>CONTROLLED EXECUTION</span><strong> </strong></div></div> <p class=\"recovery-digest\"><span>BOUND REPORT</span><code> </code></p> <p> </p> <label class=\"recovery-choice\"><span>Explicit recovery decision</span><select><option>Preserve the current hold</option><option>Align the historical wave to the workflow</option><option>Align the workflow to the frozen wave</option><option>Apply terminal-evidence projection repair</option></select></label> <label class=\"rail-note\"><span>Recovery rationale</span><textarea rows=\"3\" placeholder=\"Why this historical boundary—not the research direction—should change\"></textarea></label> <label class=\"recovery-confirm\"><input type=\"checkbox\"/><span>I reviewed the exact digest and authorize only this historical recovery decision.</span></label> <div class=\"recovery-boundary\"><strong>No inferred authority</strong><span>This command cannot infer a worker result, dispatch work, promote claims, merge, or push.</span></div> <button class=\"primary-button recovery-apply\"> </button></div>"), Gs = /* @__PURE__ */ G("<div class=\"recovery-report empty\"><p>Freeze a fresh report before choosing a transition. Preparation is read-only with respect to campaign workflow, workers, claims, Git, and publication.</p></div>"), Ks = /* @__PURE__ */ G("<details class=\"rail-inspector rail-recovery\"><summary><span>Historical recovery protocol</span><strong> </strong></summary> <!></details>"), qs = /* @__PURE__ */ G("<div role=\"status\"> </div>"), Js = /* @__PURE__ */ G("<section class=\"lifecycle-focus primary-action-rail\" id=\"next-action\" aria-live=\"polite\"><div class=\"rail-copy\"><div class=\"rail-kicker\"><span> </span><strong> </strong><i> </i></div> <h2> </h2> <p> </p> <details class=\"rail-hint\"><summary>Why this step · context and technical details</summary> <div><p><b>What this state means.</b> </p> <p><b>Mathematical connection.</b> </p> <p><b>What your click changes.</b> </p></div></details></div> <div class=\"lifecycle-actions rail-actions\"></div> <!> <!> <!></section>"), Ys = /* @__PURE__ */ G("<button><strong> </strong><span> </span><small> </small></button>"), Xs = /* @__PURE__ */ G("<section class=\"project-picker\" aria-label=\"Campaign projects\"><div><p class=\"eyebrow\">CAMPAIGNS</p><h2>Choose a campaign control surface</h2></div> <div></div></section>");
function Zs(e, t) {
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
		if (!o && t.inputReadiness?.ready === !1) return {
			status: "INPUTS REQUIRED",
			title: t.task,
			detail: t.inputReadiness.reason,
			actions: [a]
		};
		let s = String(e.loop?.error || ""), c = Is(t), l = Fs(t, s), u = n.filter((e) => e.dependenciesSatisfied !== !1 && Ns(e)), d = u.length ? Math.min(...u.map((e) => Number(e.tokenCap || 0)).filter((e) => e > 0)) : 0, f = Number(e.resources?.ledger?.remainingBeforeCommitments || 0), p = Number(e.resources?.ledger?.schedulableTokens ?? f), m = e.strategy?.workspace, h = m?.activeReview;
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
			children: Is(e)
		})).filter((e) => e.children.length >= 2 && Fs(n.find((t) => t.id === e.targetId), s)), _ = n.find((e) => e.id !== t.id && e.dependenciesSatisfied !== !1 && ["proposed", "ready"].includes(e.status));
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
		let t = As(e);
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
		} : {
			status: e.phase || "PLANNING",
			title: "Planning the next bounded move",
			detail: e.role || "No active wave is ready for synthesis yet.",
			actions: []
		};
	}
	async function A(e) {
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
			I(f, e.key), I(m, "pending"), I(p, e.key === "refresh" ? "Rechecking the worker and receipt boundary…" : "Applying the checked transition…");
			try {
				if (e.key === "refresh") {
					await Ro(), I(m, "success"), I(p, "The worker and receipt boundary is current.");
					return;
				}
				if (e.key === "custody.reshape-and-resume") {
					let t = Array.isArray(e.args?.batch) ? e.args.batch : [];
					if (!t.length) throw Error("No oversized custody contracts were selected");
					for (let e of t) await ns({
						projectId: H(d).id,
						type: "custody.item.reshape",
						targetId: String(e.targetId || ""),
						args: { children: e.children },
						scope: "primary-rail-custody-batch",
						pollLimit: 80
					});
					await ns({
						projectId: H(d).id,
						type: "loop.resume",
						scope: "primary-rail-custody-resume",
						pollLimit: 80
					}), I(m, "success"), I(p, `${t.length} oversized contract${t.length === 1 ? " was" : "s were"} replaced by dependency-ordered successors, and custody autopilot resumed.`);
					return;
				}
				if (e.key === "custody.rebudget-and-resume") {
					let t = Array.isArray(e.args?.itemIds) ? e.args.itemIds.map(String) : [];
					if (!t.length) throw Error("No legacy custody leases were selected");
					for (let e of t) await ns({
						projectId: H(d).id,
						type: "custody.item.promote",
						targetId: e,
						args: {
							note: "Operator explicitly authorized this unchanged frozen repair under the corrected total-turn custody envelope after a zero-effect legacy budget stop.",
							operatorConfirmation: "AUTHORIZE THIS FROZEN REPAIR"
						},
						scope: "primary-rail-custody-rebudget",
						pollLimit: 80
					});
					await ns({
						projectId: H(d).id,
						type: "loop.resume",
						scope: "primary-rail-custody-rebudget-resume",
						pollLimit: 80
					}), I(m, "success"), I(p, t.length + " legacy custody leases were rebudgeted and one-at-a-time autopilot resumed.");
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
				if (e.key === "custody.item.promote") {
					let t = n.project.custody?.items?.find((t) => t.id === e.targetId);
					if (t?.status === "ready" && !t.activeLease && (n = await ns({
						projectId: H(d).id,
						type: "custody.lease.prepare",
						targetId: t.id,
						scope: "primary-rail-custody",
						pollLimit: 80
					})), e.args?.autoDispatch) {
						let t = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						t?.status === "prepared" && (n = await ns({
							projectId: H(d).id,
							type: "custody.lease.confirm",
							targetId: t.id,
							args: { leaseDigest: t.leaseDigest },
							scope: "primary-rail-custody",
							pollLimit: 80
						}));
						let r = n.project.custody?.items?.find((t) => t.id === e.targetId)?.activeLease;
						r?.status === "confirmed" && (n = await ns({
							projectId: H(d).id,
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
						projectId: H(d).id,
						type: "custody.lease.dispatch",
						targetId: t.activeLease.id,
						args: { leaseDigest: t.activeLease.leaseDigest },
						scope: "primary-rail-custody",
						pollLimit: 80
					}));
				}
				e.key === "research.failure.requeue" && n.project.phase, e.key === "synthesis.review" && e.args?.decision === "research" && n.project.phase === "RESEARCH_REVIEW" && await ns({
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
	async function j() {
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
	}), B(() => (H(o), H(b), H(d)), () => {
		if (H(o) && H(o) !== H(b)) {
			I(b, H(o));
			let e = /quota admission denied: custody slots/i.test(H(o)) && Number(H(d)?.resources?.slots?.available?.custody || 0) > 0;
			I(m, e ? "pending" : "error"), I(p, e ? "Previous attempt waited on the single Terra slot. That slot is now free; use the current action above instead of repeating the old confirmation." : S(H(o), 520));
		}
	}), B(() => (H(o), H(b)), () => {
		!H(o) && H(b) && I(b, "");
	}), B(() => H(d), () => {
		I(s, H(d) ? k(H(d)) : null);
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
	var ee = ca(), M = R(ee), te = (e) => {
		var t = Js(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
		N(i);
		var o = z(i), y = L(o, !0);
		N(o);
		var b = z(o), C = L(b, !0);
		N(b), N(r);
		var T = z(r, 2), E = L(T, !0);
		N(T);
		var D = z(T, 2), O = L(D, !0);
		N(D);
		var k = z(D, 2), ee = z(L(k), 2), M = L(ee), te = z(L(M));
		N(M);
		var ne = z(M, 2), re = z(L(ne));
		N(ne);
		var ie = z(ne, 2), ae = z(L(ie));
		N(ie), N(ee), N(k), N(n);
		var oe = z(n, 2);
		Y(oe, 5, () => (H(s), U(() => H(s).actions)), _a, (e, t) => {
			var n = Ls(), r = L(n, !0);
			N(n), V((e) => {
				X(n, 1, Ma((H(t), U(() => H(t).style || "outline-button")))), n.disabled = e, q(r, (H(f), H(t), U(() => H(f) === H(t).key ? "Working…" : H(t).label)));
			}, [() => (H(f), U(() => !!H(f)))]), W("click", n, () => A(H(t))), K(e, n);
		}), N(oe);
		var se = z(oe, 2), ce = (e) => {
			var t = Us(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = L(a), s = (e) => {
				var t = Bs(), n = R(t), r = L(n, !0);
				N(n);
				var i = z(n, 2), a = (e) => {
					var t = zs();
					Y(t, 5, () => (H(l), U(() => H(l).waveReview.quickChecks)), _a, (e, t) => {
						var n = Rs(), r = L(n), i = L(r, !0);
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
				var t = Hs();
				Y(t, 5, () => H(c), _a, (e, t) => {
					var n = Vs(), r = L(n), i = L(r, !0);
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
		}, le = /* @__PURE__ */ P(() => (H(d), U(() => ["DECISION_REQUIRED", "RESEARCH_REVIEW"].includes(H(d).phase))));
		J(se, (e) => {
			H(le) && e(ce);
		});
		var ue = z(se, 2), de = (e) => {
			var t = Ks(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = (e) => {
				var t = Ws(), n = L(t), r = L(n), i = z(L(r)), a = L(i, !0);
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
				var O = z(D);
				O.value = O.__value = "ALIGN_WAVE_TO_WORKFLOW";
				var k = z(O);
				k.value = k.__value = "ALIGN_WORKFLOW_TO_WAVE";
				var A = z(k);
				A.value = A.__value = "APPLY_VALIDATED_PROJECTION_REPAIR", N(E), N(T);
				var ee = z(T, 2), M = z(L(ee));
				tn(M), N(ee);
				var te = z(ee, 2), ne = L(te);
				$a(ne), Ke(), N(te);
				var re = z(te, 4), ie = L(re, !0);
				N(re), N(t), V((e) => {
					q(a, (H(d), U(() => H(d).recoveryReport.snapshot?.project?.phase))), q(c, (H(d), U(() => H(d).recoveryReport.snapshot?.wave?.phase))), q(p, `${H(d), U(() => H(d).recoveryReport.snapshot?.wave?.accounting?.accounted) ?? ""}/${H(d), U(() => H(d).recoveryReport.snapshot?.wave?.accounting?.total) ?? ""}`), q(y, (H(d), U(() => H(d).recoveryReport.snapshot?.controlState?.recovery?.activeExecution || 0))), q(S, (H(d), U(() => H(d).recoveryReport.reportDigest))), q(w, (H(d), U(() => H(d).recoveryReport.snapshot?.projectionRepair?.summary))), A.disabled = (H(d), U(() => !H(d).recoveryReport.snapshot?.choices?.applyProjectionRepair)), re.disabled = e, q(ie, H(f) === "campaign.recovery.apply" ? "Revalidating…" : "Apply selected recovery");
				}, [() => (H(v), H(f), U(() => !H(v) || !!H(f)))]), Ha(E, () => H(g), (e) => I(g, e)), so(M, () => H(_), (e) => I(_, e)), co(ne, () => H(v), (e) => I(v, e)), W("click", re, j), K(e, t);
			}, s = (e) => {
				K(e, Gs());
			};
			J(a, (e) => {
				H(d), U(() => H(d).recoveryReport?.status === "prepared") ? e(o) : e(s, -1);
			}), N(t), V(() => {
				t.open = (H(d), U(() => H(d).recoveryReport?.status === "prepared")), q(i, (H(d), U(() => H(d).recoveryReport?.status === "prepared" ? "DIGEST FROZEN" : "REPORT REQUIRED")));
			}), K(e, t);
		};
		J(ue, (e) => {
			H(d), H(s), U(() => H(d).controlState?.recovery?.required && H(s).status !== "SAFE RETRY READY") && e(de);
		});
		var fe = z(ue, 2), pe = (e) => {
			var t = qs(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `gate-feedback ${H(m) ?? ""}`), q(n, H(p));
			}), K(e, t);
		};
		J(fe, (e) => {
			H(p) && e(pe);
		}), N(t), V((e, t) => {
			q(a, (H(d), U(() => H(d).id))), q(y, e), q(C, (H(s), U(() => H(s).status))), q(E, (H(s), U(() => H(s).title))), q(O, (H(s), U(() => H(s).detail))), q(te, ` ${H(s), H(d), U(() => H(s).status === "RESULT READY" ? "The finished run has a validated receipt. Result review will summarize what it establishes and what remains unresolved." : H(s).status === "RESULT NEEDS CHECKING" ? "The worker has stopped, but its receipt still needs validation before result review." : H(d).phase === "RESEARCH_READY" ? "The research question and resource cap are fixed, but no worker may run until the exact schedule is confirmed." : H(d).phase === "RESEARCH_INTAKE" ? "A worker boundary has settled; Lane Watch is deciding whether there is valid evidence to accept or an infrastructure attempt to retry." : "This is the next authority boundary in the campaign loop; observation alone cannot cross it.") ?? ""}`), q(re, ` ${t ?? ""}`), q(ae, ` ${H(s), U(() => H(s).actions[0]?.key === "research.failure.requeue" ? "It preserves the failed attempt, restores the same checked question to scheduling, and prepares a new confirmation gate. It does not claim a result or dispatch by itself." : H(s).actions[0]?.key === "research.schedule.confirm" ? "It authorizes only this frozen task list and budget. It does not yet accept evidence or change campaign truth." : "Only the named workflow boundary changes; worker output, mathematical truth, Git integration, and publication remain separately gated.") ?? ""}`);
		}, [() => (H(d), U(() => x[H(d).phase] || H(d).phase?.toLowerCase().replaceAll("_", " "))), () => (H(d), H(u), U(() => S(H(d).researchSchedule?.members?.[0]?.expectedDelta || H(d).researchPlan?.response?.lanes?.[0]?.evidenceExpected || H(u) || H(d).role, 420)))]), K(e, t);
	}, ne = (e) => {
		var t = Xs(), r = z(L(t), 2);
		Y(r, 5, () => (n(), U(() => n().control.projectIndex)), _a, (e, t) => {
			var n = Ys(), r = L(n), i = L(r, !0);
			N(r);
			var a = z(r), o = L(a, !0);
			N(a);
			var s = z(a), c = L(s, !0);
			N(s), N(n), V(() => {
				q(i, (H(t), U(() => H(t).id))), q(o, (H(t), U(() => x[H(t).phase] || H(t).phase))), q(c, (H(t), U(() => H(t).role)));
			}), W("click", n, () => No(String(H(t).id))), K(e, n);
		}), N(r), N(t), K(e, t);
	};
	J(M, (e) => {
		H(d) && H(s) ? e(te) : (n(), U(() => n().control?.projectIndex?.length) && e(ne, 1));
	}), K(e, ee), xt(), i();
}
//#endregion
//#region src/ui/PacketInbox.svelte
Zi(["click"]), Ho();
var Qs = /* @__PURE__ */ G("<li><span> </span> <div><strong> </strong><small> </small></div> <code> </code></li>"), $s = /* @__PURE__ */ G("<ol class=\"packet-list\"></ol>"), ec = /* @__PURE__ */ G("<p class=\"packet-empty\">No queue packets are currently in the bounded context window.</p>"), tc = /* @__PURE__ */ G("<section class=\"packet-inbox\" id=\"packet-inbox\" aria-label=\"Research packet inbox\"><header><div><p>RESEARCH PACKET INBOX</p><h2>Drop context here; promote it through explicit gates</h2><span>A packet may shape the next plan. It cannot dispatch, adopt a wave, or become mathematical authority by appearing here.</span></div> <strong> </strong></header> <div class=\"packet-drop\"><div><span>WATCHED DROP POINT</span><code> </code><small>The context registry hashes the five newest Markdown packets on its next observation pass.</small></div> <button class=\"outline-button compact\"> </button></div> <div class=\"packet-intake-grid\"><section><div class=\"packet-section-title\"><span>RECEIVED CONTEXT</span><strong> </strong></div> <!></section> <section class=\"packet-contract\"><div class=\"packet-section-title\"><span>MINIMUM PACKET CONTRACT</span><strong>Markdown · context only</strong></div> <ol><li><b>1</b><span><strong>Question and intended delta</strong><small>What should change in campaign knowledge if the work succeeds?</small></span></li> <li><b>2</b><span><strong>Dependencies and exact evidence base</strong><small>Name required receipts, commits, or unresolved gates.</small></span></li> <li><b>3</b><span><strong>Allowed work and stop conditions</strong><small>Bound scope, resources, prohibited inference, and honest failure.</small></span></li> <li><b>4</b><span><strong>Proposed lanes, never authority</strong><small>Sol review and later human confirmation compile any launch contract.</small></span></li></ol></section></div> <footer><b> </b> <span> </span></footer></section>");
function nc(e, t) {
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
		var t = tc(), n = L(t), r = z(L(n), 2);
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
			var t = $s();
			Y(t, 7, () => H(a), (e) => e.id, (e, t, n) => {
				var r = Qs();
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
			K(e, ec());
		};
		J(T, (e) => {
			H(a), U(() => H(a).length) ? e(E) : e(D, -1);
		}), N(x), Ke(2), N(b);
		var O = z(b, 2);
		let k;
		var A = L(O), j = L(A, !0);
		N(A);
		var ee = z(A, 2), M = L(ee, !0);
		N(ee), N(O), N(t), V(() => {
			i = X(r, 1, "", null, i, { hold: H(o) }), q(l, H(s)), q(_, H(c)), q(y, H(u) ? "Copied" : "Copy full path"), q(w, `${H(a), U(() => H(a).length) ?? ""}/5 bounded slots`), k = X(O, 1, "", null, k, { hold: H(o) }), q(j, H(o) ? "RECEIVE-ONLY BOUNDARY" : "READY FOR SEMANTIC REVIEW"), q(M, H(o) ? "CFG23 can receive and hash the packet now, but recovery must be resolved before it can become a checked plan." : "The packet is visible to the next bounded Sol planning turn; launch gates remain separate.");
		}), W("click", v, p), K(e, t);
	};
	J(h, (e) => {
		H(l) && e(g);
	}), K(e, m), xt(), i();
}
Zi(["click"]);
//#endregion
//#region src/ui/campaign-interpretation.ts
var rc = [
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
function ic(e) {
	return Array.isArray(e) ? e : [];
}
function ac(e) {
	let t = $(e).toUpperCase();
	return t.includes("NOT_SUPPORTED") || t.includes("BLOCK") || t.includes("REFUT") ? "BLOCKED" : t.includes("UNMEASURED") || t.includes("UNCHANGED") || t.includes("OPEN") ? "UNMEASURED" : t.includes("SUPPORTED") || t.includes("ADVANCED") ? "SUPPORTED" : t.includes("PENDING") || t.includes("PROPOSED") ? "PROPOSED" : "CONTEXT";
}
function oc(e) {
	let t = ic(e?.researchRuns).filter((e) => [
		"launching",
		"running",
		"blocked",
		"evidence_ready",
		"returned_to_sol"
	].includes(e?.status)).sort((e, t) => $(t?.updatedAt).localeCompare($(e?.updatedAt)))[0];
	return $(t?.strategy?.trackId, $(e?.researchPlan?.response?.lanes?.[0]?.strategy?.trackId));
}
function sc(e, t) {
	let n = `${$(e?.claimId)} ${$(e?.summary)}`.toUpperCase();
	return n.includes("ASYM") || n.includes("SUPPLY") || n.includes("CANDIDATE") ? "supply" : n.includes("GEOMETRIC") || n.includes("REALIZATION") || n.includes("DECISION") ? "decision" : n.includes("COVERAGE") || n.includes("CENSUS") || n.includes("V4") || n.includes("C2") ? "coverage" : t;
}
function cc(e) {
	let t = e?.wave?.synthesis?.response || null, n = e?.researchPlan?.response || null, r = t?.operatorBrief || {}, i = e?.strategy?.charter || {}, a = !!(n && [
		"RESEARCH_REVIEW",
		"RESEARCH_READY",
		"REVISING"
	].includes($(e?.phase))), o = a ? "checked-plan" : t ? "frozen-synthesis" : n ? "checked-plan" : "campaign-state", s = oc(e), c = {
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
		evidence: ic(r.recentProgress).map((e) => $(e)).filter(Boolean),
		scope: ic(r.watchouts).map((e) => $(e)).filter(Boolean)
	}, u = (a && ic(n?.lanes).length ? ic(n.lanes).filter((e) => $(e?.action).toUpperCase() !== "DROP") : ic(t?.nextWave?.lanes).length ? ic(t.nextWave.lanes) : ic(n?.lanes)).filter(Boolean), d = new Set(a ? u.map((e) => $(e?.strategy?.trackId, $(e?.trackId))).filter(Boolean) : [s].filter(Boolean)), f = {
		id: "next-decision",
		kind: "decision",
		kicker: "HUMAN DECISION",
		title: a ? "Approve, revise, or block the checked next-wave plan." : $(r.nextDecision, $(n?.operatorGuidance, "Choose the next bounded campaign move.")),
		summary: a ? $(n?.operatorGuidance, $(n?.summary)) : $(t?.nextWave?.objective, $(n?.summary, "Select only work whose expected knowledge delta justifies its resource and evidence contract.")),
		state: e?.controlState?.recovery?.required ? "BLOCKED" : "PROPOSED",
		why: "The campaign branches here; no proposal acquires authority until the operator chooses and a checked schedule is frozen.",
		relation: "The selected branch returns to the main campaign line through planning, evidence intake, synthesis, and another explicit decision.",
		unlocks: u.map((e) => $(e?.objective, $(e?.question, $(e?.taskId)))).filter(Boolean)
	}, p = ic(i.tracks).map((e) => ({
		id: `track-${$(e?.id, "unknown")}`,
		kind: "track",
		kicker: `${Math.round(Number(e?.targetShare || 0) * 100)}% TARGET`,
		title: $(e?.label, $(e?.id, "Research track")),
		summary: $(e?.purpose, "A persistent route from bounded work back to the campaign objective."),
		state: d.has($(e?.id)) ? "ACTIVE" : "OPEN",
		trackId: $(e?.id),
		relation: `This track is one of ${Math.max(1, ic(i.tracks).length)} balanced routes to the campaign objective.`,
		metrics: ic(e?.metrics).map((e) => $(e)).filter(Boolean),
		color: $(e?.color, "#71d6a0")
	})), m = ic(t?.claimDeltas).map((e, t) => ({
		id: `claim-${$(e?.claimId, String(t)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`,
		kind: "claim",
		kicker: "KNOWLEDGE DELTA",
		title: $(e?.summary, $(e?.claimId, "Claim update")),
		summary: $(e?.summary, "The synthesis recorded a bounded change in campaign knowledge."),
		state: ac(e?.proposedStatus),
		trackId: sc(e, s),
		why: `Status: ${$(e?.proposedStatus, "context only").replaceAll("_", " ")}.`,
		relation: "Claim deltas are the bridge between a completed lane and measurable progress toward the campaign objective.",
		evidence: ic(e?.evidence).map((e) => $(e)).filter(Boolean),
		scope: ic(e?.objections).map((e) => $(e)).filter(Boolean)
	})), h = u.map((e, t) => {
		let r = ic(n?.lanes).find((t) => t?.taskId === e?.taskId) || e, i = $(r?.strategy?.trackId, $(e?.trackId, "unassigned"));
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
	}), _ = rc.filter((e) => e.pattern.test(g)).map((e) => ({
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
		progress: ic(r.recentProgress).map((e) => $(e)).filter(Boolean),
		watchouts: ic(r.watchouts).map((e) => $(e)).filter(Boolean),
		tracks: p,
		claims: m,
		proposals: h,
		concepts: _
	};
}
function lc(e) {
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
var uc = /* @__PURE__ */ G("<li><b></b><span> </span></li>"), dc = /* @__PURE__ */ G("<ol></ol>"), fc = /* @__PURE__ */ G("<p>No synthesized progress delta is available yet.</p>"), pc = /* @__PURE__ */ G("<li> </li>"), mc = /* @__PURE__ */ G("<div class=\"brief-ledger\"><section><header><span>WHAT CHANGED</span><strong> </strong></header> <!></section> <details open=\"\"><summary><span>SCOPE & WATCHOUTS</span><strong> </strong></summary> <ul></ul></details></div>"), hc = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button>"), gc = /* @__PURE__ */ G("<div class=\"atlas-empty\"><span>OPEN CAPACITY</span><strong>No current claim or proposed lane is assigned here.</strong></div>"), _c = /* @__PURE__ */ G("<section class=\"atlas-track\"><button><span> </span><strong> </strong><small> </small></button> <div><!></div></section>"), vc = /* @__PURE__ */ G("<button><span>CONTEXT</span><strong> </strong></button>"), yc = /* @__PURE__ */ G("<section class=\"object-codex\"><header><span>OBJECT CODEX</span><strong>Learn the mathematical pieces on this map</strong></header> <div></div></section>"), bc = /* @__PURE__ */ G("<details open=\"\"><summary>Evidence <strong> </strong></summary><ul></ul></details>"), xc = /* @__PURE__ */ G("<details open=\"\"><summary>Scope & objections <strong> </strong></summary><ul></ul></details>"), Sc = /* @__PURE__ */ G("<details><summary>What this could unlock <strong> </strong></summary><ul></ul></details>"), Cc = /* @__PURE__ */ G("<details><summary>Progress measures <strong> </strong></summary><ul></ul></details>"), wc = /* @__PURE__ */ G("<div class=\"atlas-inspector-lists\"><!> <!> <!> <!></div>"), Tc = /* @__PURE__ */ G("<aside aria-live=\"polite\"><header><div><span> </span><h4> </h4></div><strong> </strong></header> <div class=\"atlas-inspector-grid\"><section><span>WHAT THIS IS</span><p> </p></section> <section><span>WHY IT MATTERS</span><p> </p></section> <section><span>HOW IT CONNECTS</span><p> </p></section> <section><span>AUTHORITY</span><p> </p></section></div> <!></aside>"), Ec = /* @__PURE__ */ G("<section class=\"interpretation-surface\" id=\"campaign-interpretation\" aria-label=\"Campaign interpretation and research atlas\"><header class=\"interpretation-heading\"><div><p>CAMPAIGN INTERPRETATION</p> <h2>Understand the mission before choosing the move</h2> <span>A generated briefing and explorable mathematical map, grounded in the same frozen evidence as the control plane.</span></div> <strong> </strong></header> <div class=\"director-deck\"><button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button> <i class=\"director-link\" aria-hidden=\"true\"></i> <button><span> </span> <strong> </strong> <p> </p> <small> </small></button></div> <!> <section class=\"research-atlas\" aria-label=\"Research Atlas\"><header><div><p>RESEARCH ATLAS</p><h3>How bounded work connects back to the campaign objective</h3><span>Select any station to inspect its meaning, evidence, scope, and unlocks.</span></div> <div class=\"atlas-legend\" aria-label=\"Interpretation status legend\"><span class=\"supported\">SUPPORTED</span><span class=\"proposed\">PROPOSED</span><span class=\"unmeasured\">UNMEASURED</span><span class=\"blocked\">BLOCKED</span><span class=\"context\">CONTEXT</span></div></header> <div class=\"atlas-board\"><div class=\"atlas-north-star\"><button><span>NORTH STAR</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>CURRENT KNOWLEDGE</span><strong> </strong></button> <i aria-hidden=\"true\"></i> <button><span>NEXT BRANCH</span><strong> </strong></button></div> <div class=\"atlas-track-list\"></div> <!></div> <!> <footer><b>INTERPRETATION IS NOT AUTHORITY</b><span>Generated prose helps navigate. Exact receipts, claim states, and human gates remain the source of campaign authority.</span></footer></section></section>");
function Dc(e, t) {
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
	}), B(() => (H(o), cc), () => {
		I(s, H(o) ? cc(H(o)) : null);
	}), B(() => (H(o), H(l)), () => {
		H(o)?.id !== H(l) && (I(l, H(o)?.id || ""), I(c, "campaign-objective"));
	}), B(() => (H(s), H(c)), () => {
		I(a, u(H(s)).find((e) => e.id === H(c)) || H(s)?.objective || null);
	}), Br(), vo();
	var p = ca(), m = R(p), h = (e) => {
		var t = Ec(), n = L(t), r = z(L(n), 2), i = L(r, !0);
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
		var M = z(j, 2), te = L(M, !0);
		N(M);
		var ne = z(M, 2), re = L(ne, !0);
		N(ne), N(O), N(o);
		var ie = z(o, 2), ae = (e) => {
			var t = mc(), n = L(t), r = L(n), i = z(L(r)), a = L(i);
			N(i), N(r);
			var o = z(r, 2), c = (e) => {
				var t = dc();
				Y(t, 5, () => (H(s), U(() => H(s).progress)), _a, (e, t, n) => {
					var r = uc(), i = L(r);
					i.textContent = n + 1;
					var a = z(i), o = L(a, !0);
					N(a), N(r), V(() => q(o, H(t))), K(e, r);
				}), N(t), K(e, t);
			}, l = (e) => {
				K(e, fc());
			};
			J(o, (e) => {
				H(s), U(() => H(s).progress.length) ? e(c) : e(l, -1);
			}), N(n);
			var u = z(n, 2), d = L(u), f = z(L(d)), p = L(f);
			N(f), N(d);
			var m = z(d, 2);
			Y(m, 5, () => (H(s), U(() => H(s).watchouts)), _a, (e, t) => {
				var n = pc(), r = L(n, !0);
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
			var n = _c(), r = L(n);
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
					var n = hc();
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
				K(e, gc());
			};
			J(_, (e) => {
				H(y) ? e(v) : e(b, -1);
			}), N(h), N(n), V((e, o) => {
				za(n, (H(t), U(() => `--track-color:${H(t).color || "#71d6a0"}`))), i = X(r, 1, `atlas-track-label state-${e ?? ""}`, null, i, { chosen: H(a)?.id === H(t).id }), q(c, (H(t), U(() => H(t).kicker))), q(u, (H(t), U(() => H(t).title))), q(m, (H(t), U(() => H(t).state === "ACTIVE" ? "current route" : "persistent route"))), g = X(h, 1, "atlas-rail", null, g, o);
			}, [() => (H(t), U(() => H(t).state.toLowerCase())), () => ({ empty: !d(H(s), H(t).trackId).length })]), W("click", r, () => f(H(t))), K(e, n);
		}), N(xe);
		var Se = z(xe, 2), Ce = (e) => {
			var t = yc(), n = z(L(t), 2);
			Y(n, 5, () => (H(s), U(() => H(s).concepts)), (e) => e.id, (e, t) => {
				var n = vc();
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
			var t = Tc(), n = L(t), r = L(n), i = L(r), o = L(i);
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
				var t = wc(), n = L(t), r = (e) => {
					var t = bc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).evidence)), _a, (e, t) => {
						var n = pc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).evidence.length)))), K(e, t);
				};
				J(n, (e) => {
					H(a), U(() => H(a).evidence?.length) && e(r);
				});
				var i = z(n, 2), o = (e) => {
					var t = xc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).scope)), _a, (e, t) => {
						var n = pc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).scope.length)))), K(e, t);
				};
				J(i, (e) => {
					H(a), U(() => H(a).scope?.length) && e(o);
				});
				var s = z(i, 2), c = (e) => {
					var t = Sc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).unlocks)), _a, (e, t) => {
						var n = pc(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(o), N(t), V(() => q(i, (H(a), U(() => H(a).unlocks.length)))), K(e, t);
				};
				J(s, (e) => {
					H(a), U(() => H(a).unlocks?.length) && e(c);
				});
				var l = z(s, 2), u = (e) => {
					var t = Cc(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var o = z(n);
					Y(o, 5, () => (H(a), U(() => H(a).metrics)), _a, (e, t) => {
						var n = pc(), r = L(n, !0);
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
				() => (Si(lc), H(a), U(() => lc(H(a).state)))
			]), K(e, t);
		};
		J(we, (e) => {
			H(a) && e(Te);
		}), Ke(2), N(oe), N(t), V((e, t, n, o) => {
			X(r, 1, `source-${H(s), U(() => H(s).source) ?? ""}`), q(i, e), X(c, 1, `director-card objective state-${t ?? ""}`), q(u, (H(s), U(() => H(s).objective.kicker))), q(m, (H(s), U(() => H(s).objective.title))), q(g, (H(s), U(() => H(s).objective.summary))), q(v, (H(s), U(() => H(s).objective.state))), X(y, 1, `director-card quest state-${n ?? ""}`), q(x, (H(s), U(() => H(s).quest.kicker))), q(C, (H(s), U(() => H(s).quest.title))), q(T, (H(s), U(() => H(s).quest.why))), q(D, (H(s), U(() => H(s).quest.state))), X(O, 1, `director-card decision state-${o ?? ""}`), q(A, (H(s), U(() => H(s).decision.kicker))), q(ee, (H(s), U(() => H(s).decision.title))), q(te, (H(s), U(() => H(s).decision.summary))), q(re, (H(s), U(() => H(s).decision.state))), ue = X(le, 1, "", null, ue, { chosen: H(a)?.id === H(s).objective.id }), q(fe, (H(s), U(() => H(s).objective.title))), me = X(pe, 1, "", null, me, { chosen: H(a)?.id === H(s).quest.id }), q(ge, (H(s), U(() => H(s).quest.title))), ve = X(_e, 1, "", null, ve, { chosen: H(a)?.id === H(s).decision.id }), q(be, (H(s), U(() => H(s).decision.title)));
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
var Oc = /* @__PURE__ */ G("<a target=\"_blank\" rel=\"noreferrer\">Open source ↗</a>"), kc = /* @__PURE__ */ G("<p class=\"redirect-error\"> </p>"), Ac = /* @__PURE__ */ G("<div class=\"redirect-shift\"><span>Proposed shift</span><strong> </strong></div>"), jc = /* @__PURE__ */ G("<div><span> </span><strong> </strong><p> </p></div>"), Mc = /* @__PURE__ */ G("<details><summary> </summary><div class=\"redirect-direction-list\"></div></details>"), Nc = /* @__PURE__ */ G("<div class=\"redirect-gate\"><small>Applying changes future synthesis and planning context and stages any new questions as proposals. It does not launch a worker.</small><button class=\"primary-button\"> </button></div>"), Pc = /* @__PURE__ */ G("<article class=\"redirect-proposal\"><div class=\"redirect-proposal-heading\"><div><span> </span><strong> </strong></div><!></div> <!> <p> </p> <!> <!> <!></article>"), Fc = /* @__PURE__ */ G("<div><span> </span><strong> </strong><small> </small></div>"), Ic = /* @__PURE__ */ G("<details class=\"redirect-history\"><summary>Earlier external inputs <strong> </strong></summary><!></details>"), Lc = /* @__PURE__ */ G("<div role=\"status\"> </div>"), Rc = /* @__PURE__ */ G("<section id=\"external-perspective\"><div class=\"redirect-heading\"><div><p class=\"eyebrow\">EXTERNAL PERSPECTIVE</p><h3>Widen or redirect the campaign</h3><p>Drop in a paper, argument, observation, or reframing. It pauses autopilot at a safe boundary and asks Sol to reshape direction without dispatching or invalidating landed evidence.</p></div><span class=\"redirect-status\"> </span></div> <details class=\"redirect-composer\"><summary><span> </span><strong>Sol read-only pass</strong></summary> <div class=\"redirect-fields\"><input maxlength=\"240\" placeholder=\"Short title (optional)\"/><input maxlength=\"2000\" inputmode=\"url\" placeholder=\"Source link (optional)\"/></div> <textarea id=\"redirect-content\" rows=\"6\" maxlength=\"24000\" placeholder=\"Paste the relevant idea, critique, external result, or your own reframing…\"></textarea> <div class=\"redirect-submit\"><small>This becomes an immutable input bundle. Sol compares it with the current synthesis, checked plan, and run history.</small><button class=\"primary-button\"> </button></div></details> <!> <!> <!></section>");
function zc(e, t) {
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
		var t = Rc(), n = L(t), r = z(L(n)), i = L(r, !0);
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
		var M = z(d, 2), te = (e) => {
			var t = Pc(), n = L(t), r = L(n), i = L(r), a = L(i);
			N(i);
			var l = z(i), u = L(l, !0);
			N(l), N(r);
			var d = z(r), f = (e) => {
				var t = Oc();
				V(() => Z(t, "href", (H(o), U(() => H(o).sourceUrl)))), K(e, t);
			};
			J(d, (e) => {
				H(o), U(() => H(o).sourceUrl) && e(f);
			}), N(n);
			var p = z(n, 2), m = (e) => {
				var t = kc(), n = L(t, !0);
				N(t), V(() => q(n, (H(o), U(() => H(o).error)))), K(e, t);
			};
			J(p, (e) => {
				H(o), U(() => H(o).error) && e(m);
			});
			var h = z(p, 2), _ = L(h, !0);
			N(h);
			var v = z(h, 2), y = (e) => {
				var t = Ac(), n = z(L(t)), r = L(n, !0);
				N(n), N(t), V(() => q(r, (H(s), U(() => H(s).perspectiveShift)))), K(e, t);
			};
			J(v, (e) => {
				H(s), U(() => H(s).perspectiveShift) && e(y);
			});
			var b = z(v, 2), x = (e) => {
				var t = Mc(), n = L(t), r = L(n);
				N(n);
				var i = z(n);
				Y(i, 5, () => H(c), _a, (e, t) => {
					var n = jc(), r = L(n), i = L(r, !0);
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
				var t = Nc(), n = z(L(t)), r = L(n, !0);
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
		J(M, (e) => {
			H(o) && e(te);
		});
		var ne = z(M, 2), re = (e) => {
			var t = Ic(), n = L(t), r = z(L(n)), i = L(r, !0);
			N(r), N(n), Y(z(n), 1, () => (H(a), U(() => H(a).slice(1))), _a, (e, t) => {
				var n = Fc(), r = L(n), i = L(r, !0);
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
			var t = Lc(), n = L(t, !0);
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
var Bc = /* @__PURE__ */ G("<div><button class=\"outline-button compact\">Decline</button><button class=\"danger-button\">Accept</button></div>"), Vc = /* @__PURE__ */ G("<article><div><strong> </strong><p> </p></div><!></article>"), Hc = /* @__PURE__ */ G("<section class=\"coordinator-approvals\"><h3>Tool approval requests</h3><!></section>"), Uc = /* @__PURE__ */ G("<p>Syncing coordinator history…</p>"), Wc = /* @__PURE__ */ G("<article><span> </span><p> </p></article>"), Gc = /* @__PURE__ */ G("<p>No coordinator messages are loaded yet.</p>"), Kc = /* @__PURE__ */ G("<button class=\"danger-button\">Interrupt turn</button>"), qc = /* @__PURE__ */ G("<div class=\"coordinator-boundary\"><strong>Semantic coordinator</strong><p>Plans, synthesizes, and checks direction. Dispatch, claim promotion, merges, pushes, and tool approvals remain separate gates.</p></div> <!> <div class=\"coordinator-transcript\" aria-live=\"polite\"><!></div> <div class=\"coordinator-composer\"><textarea rows=\"3\" maxlength=\"12000\" placeholder=\"Message Sol…\"></textarea><div><small>Messages may steer an active turn; they do not bypass campaign gates.</small><button class=\"primary-button\"> </button></div></div> <div class=\"coordinator-utility\"><button class=\"outline-button compact\">Sync history</button><!></div>", 1), Jc = /* @__PURE__ */ G("<button><strong> </strong><span> </span></button>"), Yc = /* @__PURE__ */ G("<p>No attachable workspace tasks found.</p>"), Xc = /* @__PURE__ */ G("<div class=\"coordinator-candidates\"><!><!></div>"), Zc = /* @__PURE__ */ G("<div class=\"coordinator-boundary\"><strong>Attach an existing Codex task</strong><p>Lane Watch will verify workspace eligibility before attaching it as the campaign’s semantic coordinator.</p></div> <button class=\"primary-button\"> </button> <!>", 1), Qc = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), $c = /* @__PURE__ */ G("<details class=\"coordinator-console\" id=\"coordinator-console\"><summary><span><small>SOL COORDINATOR</small><strong> </strong></span><span> </span></summary> <div class=\"coordinator-console-body\"><!> <!></div></details>");
function el(e, t) {
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
		var t = $c(), n = L(t), r = L(n), i = z(L(r)), c = L(i, !0);
		N(i), N(r);
		var f = z(r), p = L(f);
		N(f), N(n);
		var b = z(n, 2), x = L(b), S = (e) => {
			var t = qc(), n = z(R(t), 2), r = (e) => {
				var t = Hc();
				Y(z(L(t)), 1, () => H(s), _a, (e, t) => {
					var n = Vc(), r = L(n), i = L(r), a = L(i, !0);
					N(i);
					var o = z(i), s = L(o, !0);
					N(o), N(r);
					var c = z(r), l = (e) => {
						var n = Bc(), r = L(n), i = z(r);
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
				K(e, Uc());
			}, f = (e) => {
				var t = ca();
				Y(R(t), 1, () => H(o), (e) => e.id, (e, t) => {
					var n = Wc(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a), N(n), V((e) => {
						X(n, 1, Ma((H(t), U(() => H(t).role)))), q(i, (H(t), U(() => H(t).role))), q(o, e);
					}, [() => (H(t), U(() => y(H(t).text)))]), K(e, n);
				}), K(e, t);
			}, p = (e) => {
				K(e, Gc());
			};
			J(c, (e) => {
				H(m) ? e(d) : (H(o), U(() => H(o).length) ? e(f, 1) : e(p, -1));
			}), N(i);
			var h = z(i, 2), v = L(h);
			tn(v);
			var b = z(v), x = z(L(b)), S = L(x, !0);
			N(x), N(b), N(h);
			var C = z(h, 2), w = L(C), T = z(w), E = (e) => {
				var t = Kc();
				V((e) => t.disabled = e, [() => (H(u), U(() => !!H(u)))]), W("click", t, () => _("coordinator.interrupt")), K(e, t);
			};
			J(T, (e) => {
				H(a), U(() => H(a).status === "working" && H(a).lastTurnId) && e(E);
			}), N(C), V((e) => {
				x.disabled = e, q(S, H(u) === "coordinator.message.send" ? "Sending…" : "Send message"), w.disabled = H(m);
			}, [() => (H(l), H(u), U(() => !H(l).trim() || !!H(u)))]), so(v, () => H(l), (e) => I(l, e)), W("click", x, () => _("coordinator.message.send", { message: H(l) })), W("click", w, () => g(!0)), K(e, t);
		}, C = (e) => {
			var t = Zc(), n = z(R(t), 2), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = Xc(), n = L(t);
				Y(n, 1, () => (H(h), U(() => H(h).filter((e) => e.eligible !== !1).slice(0, 12))), _a, (e, t) => {
					var n = Jc(), r = L(n), i = L(r, !0);
					N(r);
					var a = z(r), o = L(a, !0);
					N(a), N(n), V((e) => {
						n.disabled = e, q(i, (H(t), U(() => H(t).name))), q(o, (H(t), U(() => H(t).cwd)));
					}, [() => (H(u), U(() => !!H(u)))]), W("click", n, () => _("coordinator.attach", { threadId: H(t).id })), K(e, n);
				});
				var r = z(n), i = (e) => {
					K(e, Yc());
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
			var t = Qc(), n = L(t, !0);
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
var tl = /* @__PURE__ */ G("<div class=\"campaign-settings-boundary access-boundary\"><strong> </strong><p> </p></div>"), nl = /* @__PURE__ */ G("<div class=\"campaign-settings-boundary\"><strong> </strong><p> </p><small>Observation never grants authority. Human wave adoption imports a fixed wave; exact human schedule confirmation grants controller execution only to reserved members.</small></div>"), rl = /* @__PURE__ */ G("<button type=\"button\"><span> </span><strong> </strong><small> </small><p> </p></button>"), il = /* @__PURE__ */ G("<p> </p>"), al = /* @__PURE__ */ G("<article><span> </span><strong> </strong><small> </small><small> </small></article>"), ol = /* @__PURE__ */ G("<span><small> </small><strong> </strong></span>"), sl = /* @__PURE__ */ G("<div class=\"host-capability-grid\"></div> <div class=\"global-quota-grid\"><span><small>TOKEN COMMITMENTS</small><strong> </strong></span> <!></div> <footer>ENFORCED AT SERIALIZED RESOURCE ACQUISITION · no scheduler or host mutation authority</footer>", 1), cl = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), ll = /* @__PURE__ */ G("<details class=\"campaign-settings\" id=\"campaign-settings\"><summary><span><small>FUTURE-RUN POLICY</small><strong> </strong></span><span> </span></summary> <div class=\"campaign-settings-body\"><div class=\"campaign-settings-boundary\"><strong>Defaults, never active mutations</strong><p>These choices apply only when a later checked contract is confirmed. They do not restaff a running lane, approve a plan, or launch anything.</p></div> <!> <!> <div class=\"dispatch-profile-grid\"></div> <label class=\"automation-setting\"><span><strong>Automatic boundary handling</strong><small>Controls how far the controller may prepare between explicit human gates.</small></span><select><option>observe</option><option>prepare</option><option>propose</option><option>bounded</option></select></label> <section class=\"operational-governance\" aria-label=\"Operational governance\"><header><span><small>HOSTS & GLOBAL QUOTAS</small><strong>Pre-admission inventory</strong></span><b> </b></header> <!></section> <!></div></details>");
function ul(e, t) {
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
		var t = ll(), r = L(t), i = L(r), d = z(L(i)), g = L(d, !0);
		N(d), N(i);
		var _ = z(i), v = L(_);
		N(_), N(r);
		var y = z(r, 2), b = z(L(y), 2), x = (e) => {
			var t = tl(), r = L(t), i = L(r);
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
			var t = nl(), n = L(t), r = L(n);
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
			var r = rl();
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
		var ee = z(T, 2), M = L(ee), te = z(L(M)), ne = L(te, !0);
		N(te), N(M);
		var re = z(M, 2), ie = (e) => {
			var t = il(), n = L(t, !0);
			N(t), V(() => q(n, H(p))), K(e, t);
		}, ae = (e) => {
			var t = sl(), n = R(t);
			Y(n, 5, () => (H(u), U(() => H(u).projects?.[0]?.hosts || [])), (e) => e.id, (e, t) => {
				var n = al(), r = L(n), i = L(r, !0);
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
				var n = ol(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a);
				N(a), N(n), V(() => {
					q(i, `${t ?? ""} SLOTS`), q(o, `${H(u), U(() => H(u).quotas.usage.slots[t]) ?? ""} / ${H(u), U(() => H(u).quotas.policy.slots[t]) ?? ""}`);
				}), K(e, n);
			}), N(r), Ke(2), V((e, t) => q(o, `${e ?? ""} / ${t ?? ""}`), [() => (H(u), U(() => H(u).quotas.usage.tokenCommitments.toLocaleString())), () => (H(u), U(() => H(u).quotas.policy.tokenCommitments.toLocaleString()))]), K(e, t);
		}, oe = (e) => {
			var t = il(), n = L(t, !0);
			N(t), V(() => q(n, H(f) ? "Loading scoped host and quota facts…" : "Open this section to load scoped operational facts.")), K(e, t);
		};
		J(re, (e) => {
			H(p) ? e(ie) : H(u) ? e(ae, 1) : e(oe, -1);
		}), N(ee);
		var se = z(ee, 2), ce = (e) => {
			var t = cl(), n = L(t, !0);
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
var dl = /* @__PURE__ */ G("<p><b> </b> </p>"), fl = /* @__PURE__ */ G("<div class=\"accounting-controls\"><select><option>Choose disposition</option><option>Repair</option><option>Supersede</option><option>Abandon</option><option>Carry forward</option></select><input placeholder=\"Reason and evidence boundary\"/><button class=\"primary-button\"> </button></div>"), pl = /* @__PURE__ */ G("<li><span class=\"accounting-state\"> </span> <div><strong> </strong><small> </small><!></div> <!></li>"), ml = /* @__PURE__ */ G("<div class=\"gate-feedback\" role=\"status\"> </div>"), hl = /* @__PURE__ */ G("<details class=\"wave-accounting\" id=\"wave-accounting\"><summary><span><small>WAVE CUSTODY</small><strong>Source-lane accounting</strong></span><span> </span></summary> <div class=\"wave-accounting-body\"><div class=\"accounting-boundary\"><strong>Mechanical disposition only</strong><p>Recording a repair, supersession, abandonment, or carry-forward closes custody accounting. It does not endorse the lane’s mathematics or promote a claim.</p></div> <ol></ol> <!></div></details>");
function gl(e, t) {
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
		var t = hl(), n = L(t), r = z(L(n));
		let i;
		var a = L(r, !0);
		N(r), N(n);
		var c = z(n, 2), g = z(L(c), 2);
		Y(g, 5, () => H(o), (e) => e.id, (e, t) => {
			var n = pl();
			let r;
			var i = L(n), a = L(i, !0);
			N(i);
			var o = z(i, 2), s = L(o), c = L(s, !0);
			N(s);
			var u = z(s), g = L(u);
			N(u);
			var _ = z(u), v = (e) => {
				var n = dl(), r = L(n), i = L(r, !0);
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
				var n = fl(), r = L(n), i = L(r);
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
			var t = ml(), n = L(t, !0);
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
var _l = { value: () => {} };
function vl() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new yl(n);
}
function yl(e) {
	this._ = e;
}
function bl(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
yl.prototype = vl.prototype = {
	constructor: yl,
	on: function(e, t) {
		var n = this._, r = bl(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = xl(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = Sl(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = Sl(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new yl(e);
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
function xl(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function Sl(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = _l, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var Cl = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/d3-selection/src/namespace.js
function wl(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Cl.hasOwnProperty(t) ? {
		space: Cl[t],
		local: e
	} : e;
}
//#endregion
//#region node_modules/d3-selection/src/creator.js
function Tl(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function El(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function Dl(e) {
	var t = wl(e);
	return (t.local ? El : Tl)(t);
}
//#endregion
//#region node_modules/d3-selection/src/selector.js
function Ol() {}
function kl(e) {
	return e == null ? Ol : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/select.js
function Al(e) {
	typeof e != "function" && (e = kl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new vd(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/array.js
function jl(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selectorAll.js
function Ml() {
	return [];
}
function Nl(e) {
	return e == null ? Ml : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectAll.js
function Pl(e) {
	return function() {
		return jl(e.apply(this, arguments));
	};
}
function Fl(e) {
	e = typeof e == "function" ? Pl(e) : Nl(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new vd(r, i);
}
//#endregion
//#region node_modules/d3-selection/src/matcher.js
function Il(e) {
	return function() {
		return this.matches(e);
	};
}
function Ll(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChild.js
var Rl = Array.prototype.find;
function zl(e) {
	return function() {
		return Rl.call(this.children, e);
	};
}
function Bl() {
	return this.firstElementChild;
}
function Vl(e) {
	return this.select(e == null ? Bl : zl(typeof e == "function" ? e : Ll(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChildren.js
var Hl = Array.prototype.filter;
function Ul() {
	return Array.from(this.children);
}
function Wl(e) {
	return function() {
		return Hl.call(this.children, e);
	};
}
function Gl(e) {
	return this.selectAll(e == null ? Ul : Wl(typeof e == "function" ? e : Ll(e)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/filter.js
function Kl(e) {
	typeof e != "function" && (e = Il(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new vd(r, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/sparse.js
function ql(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/d3-selection/src/selection/enter.js
function Jl() {
	return new vd(this._enter || this._groups.map(ql), this._parents);
}
function Yl(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Yl.prototype = {
	constructor: Yl,
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
function Xl(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/data.js
function Zl(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Yl(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Ql(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Yl(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function $l(e) {
	return e.__data__;
}
function eu(e, t) {
	if (!arguments.length) return Array.from(this, $l);
	var n = t ? Ql : Zl, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Xl(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = tu(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new vd(o, r), o._enter = s, o._exit = c, o;
}
function tu(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-selection/src/selection/exit.js
function nu() {
	return new vd(this._exit || this._groups.map(ql), this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/join.js
function ru(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/d3-selection/src/selection/merge.js
function iu(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new vd(s, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/order.js
function au() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/sort.js
function ou(e) {
	e ||= su;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new vd(i, this._parents).order();
}
function su(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-selection/src/selection/call.js
function cu() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/nodes.js
function lu() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-selection/src/selection/node.js
function uu() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/d3-selection/src/selection/size.js
function du() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/selection/empty.js
function fu() {
	return !this.node();
}
//#endregion
//#region node_modules/d3-selection/src/selection/each.js
function pu(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/attr.js
function mu(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function hu(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function gu(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function _u(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function vu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function yu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function bu(e, t) {
	var n = wl(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? hu : mu : typeof t == "function" ? n.local ? yu : vu : n.local ? _u : gu)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/window.js
function xu(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/d3-selection/src/selection/style.js
function Su(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Cu(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function wu(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Tu(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? Su : typeof t == "function" ? wu : Cu)(e, t, n ?? "")) : Eu(this.node(), e);
}
function Eu(e, t) {
	return e.style.getPropertyValue(t) || xu(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/d3-selection/src/selection/property.js
function Du(e) {
	return function() {
		delete this[e];
	};
}
function Ou(e, t) {
	return function() {
		this[e] = t;
	};
}
function ku(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Au(e, t) {
	return arguments.length > 1 ? this.each((t == null ? Du : typeof t == "function" ? ku : Ou)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/d3-selection/src/selection/classed.js
function ju(e) {
	return e.trim().split(/^|\s+/);
}
function Mu(e) {
	return e.classList || new Nu(e);
}
function Nu(e) {
	this._node = e, this._names = ju(e.getAttribute("class") || "");
}
Nu.prototype = {
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
function Pu(e, t) {
	for (var n = Mu(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Fu(e, t) {
	for (var n = Mu(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function Iu(e) {
	return function() {
		Pu(this, e);
	};
}
function Lu(e) {
	return function() {
		Fu(this, e);
	};
}
function Ru(e, t) {
	return function() {
		(t.apply(this, arguments) ? Pu : Fu)(this, e);
	};
}
function zu(e, t) {
	var n = ju(e + "");
	if (arguments.length < 2) {
		for (var r = Mu(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? Ru : t ? Iu : Lu)(n, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/text.js
function Bu() {
	this.textContent = "";
}
function Vu(e) {
	return function() {
		this.textContent = e;
	};
}
function Hu(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Uu(e) {
	return arguments.length ? this.each(e == null ? Bu : (typeof e == "function" ? Hu : Vu)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/d3-selection/src/selection/html.js
function Wu() {
	this.innerHTML = "";
}
function Gu(e) {
	return function() {
		this.innerHTML = e;
	};
}
function Ku(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function qu(e) {
	return arguments.length ? this.each(e == null ? Wu : (typeof e == "function" ? Ku : Gu)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/d3-selection/src/selection/raise.js
function Ju() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Yu() {
	return this.each(Ju);
}
//#endregion
//#region node_modules/d3-selection/src/selection/lower.js
function Xu() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Zu() {
	return this.each(Xu);
}
//#endregion
//#region node_modules/d3-selection/src/selection/append.js
function Qu(e) {
	var t = typeof e == "function" ? e : Dl(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/insert.js
function $u() {
	return null;
}
function ed(e, t) {
	var n = typeof e == "function" ? e : Dl(e), r = t == null ? $u : typeof t == "function" ? t : kl(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/remove.js
function td() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function nd() {
	return this.each(td);
}
//#endregion
//#region node_modules/d3-selection/src/selection/clone.js
function rd() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function id() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ad(e) {
	return this.select(e ? id : rd);
}
//#endregion
//#region node_modules/d3-selection/src/selection/datum.js
function od(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/d3-selection/src/selection/on.js
function sd(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function cd(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function ld(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function ud(e, t, n) {
	return function() {
		var r = this.__on, i, a = sd(t);
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
function dd(e, t, n) {
	var r = cd(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? ud : ld, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/dispatch.js
function fd(e, t, n) {
	var r = xu(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function pd(e, t) {
	return function() {
		return fd(this, e, t);
	};
}
function md(e, t) {
	return function() {
		return fd(this, e, t.apply(this, arguments));
	};
}
function hd(e, t) {
	return this.each((typeof t == "function" ? md : pd)(e, t));
}
//#endregion
//#region node_modules/d3-selection/src/selection/iterator.js
function* gd() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/d3-selection/src/selection/index.js
var _d = [null];
function vd(e, t) {
	this._groups = e, this._parents = t;
}
function yd() {
	return new vd([[document.documentElement]], _d);
}
function bd() {
	return this;
}
vd.prototype = yd.prototype = {
	constructor: vd,
	select: Al,
	selectAll: Fl,
	selectChild: Vl,
	selectChildren: Gl,
	filter: Kl,
	data: eu,
	enter: Jl,
	exit: nu,
	join: ru,
	merge: iu,
	selection: bd,
	order: au,
	sort: ou,
	call: cu,
	nodes: lu,
	node: uu,
	size: du,
	empty: fu,
	each: pu,
	attr: bu,
	style: Tu,
	property: Au,
	classed: zu,
	text: Uu,
	html: qu,
	raise: Yu,
	lower: Zu,
	append: Qu,
	insert: ed,
	remove: nd,
	clone: ad,
	datum: od,
	on: dd,
	dispatch: hd,
	[Symbol.iterator]: gd
};
//#endregion
//#region node_modules/d3-selection/src/select.js
function xd(e) {
	return typeof e == "string" ? new vd([[document.querySelector(e)]], [document.documentElement]) : new vd([[e]], _d);
}
//#endregion
//#region node_modules/d3-selection/src/sourceEvent.js
function Sd(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/d3-selection/src/pointer.js
function Cd(e, t) {
	if (e = Sd(e), t === void 0 && (t = e.currentTarget), t) {
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
var wd = { passive: !1 }, Td = {
	capture: !0,
	passive: !1
};
function Ed(e) {
	e.stopImmediatePropagation();
}
function Dd(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-drag/src/nodrag.js
function Od(e) {
	var t = e.document.documentElement, n = xd(e).on("dragstart.drag", Dd, Td);
	"onselectstart" in t ? n.on("selectstart.drag", Dd, Td) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function kd(e, t) {
	var n = e.document.documentElement, r = xd(e).on("dragstart.drag", null);
	t && (r.on("click.drag", Dd, Td), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/d3-drag/src/constant.js
var Ad = (e) => () => e;
//#endregion
//#region node_modules/d3-drag/src/event.js
function jd(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
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
jd.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/d3-drag/src/drag.js
function Md(e) {
	return !e.ctrlKey && !e.button;
}
function Nd() {
	return this.parentNode;
}
function Pd(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function Fd() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Id() {
	var e = Md, t = Nd, n = Pd, r = Fd, i = {}, a = vl("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, wd).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (xd(n.view).on("mousemove.drag", m, Td).on("mouseup.drag", h, Td), Od(n.view), Ed(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (Dd(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		xd(e.view).on("mousemove.drag mouseup.drag", null), kd(e.view, l), Dd(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Ed(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Dd(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Ed(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = Cd(l || r, t), p, m, h;
		if ((h = n.call(e, new jd("beforestart", {
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
				case "drag": d = Cd(l || a, t), _ = o;
			}
			u.call(r, e, new jd(r, {
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
		return arguments.length ? (e = typeof t == "function" ? t : Ad(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Ad(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Ad(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Ad(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/d3-color/src/define.js
function Ld(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Rd(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function zd() {}
var Bd = .7, Vd = 1 / Bd, Hd = "\\s*([+-]?\\d+)\\s*", Ud = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Wd = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Gd = /^#([0-9a-f]{3,8})$/, Kd = RegExp(`^rgb\\(${Hd},${Hd},${Hd}\\)$`), qd = RegExp(`^rgb\\(${Wd},${Wd},${Wd}\\)$`), Jd = RegExp(`^rgba\\(${Hd},${Hd},${Hd},${Ud}\\)$`), Yd = RegExp(`^rgba\\(${Wd},${Wd},${Wd},${Ud}\\)$`), Xd = RegExp(`^hsl\\(${Ud},${Wd},${Wd}\\)$`), Zd = RegExp(`^hsla\\(${Ud},${Wd},${Wd},${Ud}\\)$`), Qd = {
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
Ld(zd, rf, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: $d,
	formatHex: $d,
	formatHex8: ef,
	formatHsl: tf,
	formatRgb: nf,
	toString: nf
});
function $d() {
	return this.rgb().formatHex();
}
function ef() {
	return this.rgb().formatHex8();
}
function tf() {
	return _f(this).formatHsl();
}
function nf() {
	return this.rgb().formatRgb();
}
function rf(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Gd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? af(t) : n === 3 ? new lf(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? of(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? of(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Kd.exec(e)) ? new lf(t[1], t[2], t[3], 1) : (t = qd.exec(e)) ? new lf(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Jd.exec(e)) ? of(t[1], t[2], t[3], t[4]) : (t = Yd.exec(e)) ? of(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Xd.exec(e)) ? gf(t[1], t[2] / 100, t[3] / 100, 1) : (t = Zd.exec(e)) ? gf(t[1], t[2] / 100, t[3] / 100, t[4]) : Qd.hasOwnProperty(e) ? af(Qd[e]) : e === "transparent" ? new lf(NaN, NaN, NaN, 0) : null;
}
function af(e) {
	return new lf(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function of(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new lf(e, t, n, r);
}
function sf(e) {
	return e instanceof zd || (e = rf(e)), e ? (e = e.rgb(), new lf(e.r, e.g, e.b, e.opacity)) : new lf();
}
function cf(e, t, n, r) {
	return arguments.length === 1 ? sf(e) : new lf(e, t, n, r ?? 1);
}
function lf(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Ld(lf, cf, Rd(zd, {
	brighter(e) {
		return e = e == null ? Vd : Vd ** +e, new lf(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Bd : Bd ** +e, new lf(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new lf(mf(this.r), mf(this.g), mf(this.b), pf(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: uf,
	formatHex: uf,
	formatHex8: df,
	formatRgb: ff,
	toString: ff
}));
function uf() {
	return `#${hf(this.r)}${hf(this.g)}${hf(this.b)}`;
}
function df() {
	return `#${hf(this.r)}${hf(this.g)}${hf(this.b)}${hf((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ff() {
	let e = pf(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${mf(this.r)}, ${mf(this.g)}, ${mf(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function pf(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function mf(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function hf(e) {
	return e = mf(e), (e < 16 ? "0" : "") + e.toString(16);
}
function gf(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new yf(e, t, n, r);
}
function _f(e) {
	if (e instanceof yf) return new yf(e.h, e.s, e.l, e.opacity);
	if (e instanceof zd || (e = rf(e)), !e) return new yf();
	if (e instanceof yf) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new yf(o, s, c, e.opacity);
}
function vf(e, t, n, r) {
	return arguments.length === 1 ? _f(e) : new yf(e, t, n, r ?? 1);
}
function yf(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Ld(yf, vf, Rd(zd, {
	brighter(e) {
		return e = e == null ? Vd : Vd ** +e, new yf(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Bd : Bd ** +e, new yf(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new lf(Sf(e >= 240 ? e - 240 : e + 120, i, r), Sf(e, i, r), Sf(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new yf(bf(this.h), xf(this.s), xf(this.l), pf(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = pf(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${bf(this.h)}, ${xf(this.s) * 100}%, ${xf(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function bf(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function xf(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function Sf(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var Cf = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function wf(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Tf(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Ef(e) {
	return (e = +e) == 1 ? Df : function(t, n) {
		return n - t ? Tf(t, n, e) : Cf(isNaN(t) ? n : t);
	};
}
function Df(e, t) {
	var n = t - e;
	return n ? wf(e, n) : Cf(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var Of = (function e(t) {
	var n = Ef(t);
	function r(e, t) {
		var r = n((e = cf(e)).r, (t = cf(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Df(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function kf(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Af(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function jf(e, t) {
	var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o;
	for (o = 0; o < r; ++o) i[o] = Bf(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function Mf(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function Nf(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function Pf(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = Bf(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var Ff = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, If = new RegExp(Ff.source, "g");
function Lf(e) {
	return function() {
		return e;
	};
}
function Rf(e) {
	return function(t) {
		return e(t) + "";
	};
}
function zf(e, t) {
	var n = Ff.lastIndex = If.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Ff.exec(e)) && (i = If.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Nf(r, i)
	})), n = If.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Rf(c[0].x) : Lf(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function Bf(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? Cf(t) : (n === "number" ? Nf : n === "string" ? (r = rf(t)) ? (t = r, Of) : zf : t instanceof rf ? Of : t instanceof Date ? Mf : Af(t) ? kf : Array.isArray(t) ? jf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Pf : Nf)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
var Vf = 180 / Math.PI, Hf = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Uf(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Vf,
		skewX: Math.atan(c) * Vf,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
var Wf;
function Gf(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Hf : Uf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Kf(e) {
	return e == null || (Wf ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Wf.setAttribute("transform", e), !(e = Wf.transform.baseVal.consolidate())) ? Hf : (e = e.matrix, Uf(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function qf(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Nf(e, i)
			}, {
				i: c - 2,
				x: Nf(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Nf(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Nf(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Nf(e, n)
			}, {
				i: s - 2,
				x: Nf(t, r)
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
var Jf = qf(Gf, "px, ", "px)", "deg)"), Yf = qf(Kf, ", ", ")", ")"), Xf = 1e-12;
function Zf(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Qf(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function $f(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var ep = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Xf) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = Zf(y), c = s / (n * g) * (i * $f(t * r + y) - Qf(y));
				return [
					a + c * d,
					o + c * f,
					s * i / Zf(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), tp = 0, np = 0, rp = 0, ip = 1e3, ap, op, sp = 0, cp = 0, lp = 0, up = typeof performance == "object" && performance.now ? performance : Date, dp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function fp() {
	return cp ||= (dp(pp), up.now() + lp);
}
function pp() {
	cp = 0;
}
function mp() {
	this._call = this._time = this._next = null;
}
mp.prototype = hp.prototype = {
	constructor: mp,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? fp() : +n) + (t == null ? 0 : +t), !this._next && op !== this && (op ? op._next = this : ap = this, op = this), this._call = e, this._time = n, bp();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, bp());
	}
};
function hp(e, t, n) {
	var r = new mp();
	return r.restart(e, t, n), r;
}
function gp() {
	fp(), ++tp;
	for (var e = ap, t; e;) (t = cp - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--tp;
}
function _p() {
	cp = (sp = up.now()) + lp, tp = np = 0;
	try {
		gp();
	} finally {
		tp = 0, yp(), cp = 0;
	}
}
function vp() {
	var e = up.now(), t = e - sp;
	t > ip && (lp -= t, sp = e);
}
function yp() {
	for (var e, t = ap, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ap = n);
	op = e, bp(r);
}
function bp(e) {
	tp || (np &&= clearTimeout(np), e - cp > 24 ? (e < Infinity && (np = setTimeout(_p, e - up.now() - lp)), rp &&= clearInterval(rp)) : (rp ||= (sp = up.now(), setInterval(vp, ip)), tp = 1, dp(_p)));
}
//#endregion
//#region node_modules/d3-timer/src/timeout.js
function xp(e, t, n) {
	var r = new mp();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/d3-transition/src/transition/schedule.js
var Sp = vl("start", "end", "cancel", "interrupt"), Cp = [];
function wp(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	Op(e, n, {
		name: t,
		index: r,
		group: i,
		on: Sp,
		tween: Cp,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function Tp(e, t) {
	var n = Dp(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function Ep(e, t) {
	var n = Dp(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function Dp(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function Op(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = hp(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return xp(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (xp(function() {
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
function kp(e, t) {
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
function Ap(e) {
	return this.each(function() {
		kp(this, e);
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/tween.js
function jp(e, t) {
	var n, r;
	return function() {
		var i = Ep(this, e), a = i.tween;
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
function Mp(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = Ep(this, e), o = a.tween;
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
function Np(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = Dp(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? jp : Mp)(n, e, t));
}
function Pp(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = Ep(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return Dp(e, r).value[t];
	};
}
//#endregion
//#region node_modules/d3-transition/src/transition/interpolate.js
function Fp(e, t) {
	var n;
	return (typeof t == "number" ? Nf : t instanceof rf ? Of : (n = rf(t)) ? (t = n, Of) : zf)(e, t);
}
//#endregion
//#region node_modules/d3-transition/src/transition/attr.js
function Ip(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Lp(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Rp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function zp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Bp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Vp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Hp(e, t) {
	var n = wl(e), r = n === "transform" ? Yf : Fp;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Vp : Bp)(n, r, Pp(this, "attr." + e, t)) : t == null ? (n.local ? Lp : Ip)(n) : (n.local ? zp : Rp)(n, r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/attrTween.js
function Up(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Wp(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Gp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Wp(e, i)), n;
	}
	return i._value = t, i;
}
function Kp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Up(e, i)), n;
	}
	return i._value = t, i;
}
function qp(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = wl(e);
	return this.tween(n, (r.local ? Gp : Kp)(r, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/delay.js
function Jp(e, t) {
	return function() {
		Tp(this, e).delay = +t.apply(this, arguments);
	};
}
function Yp(e, t) {
	return t = +t, function() {
		Tp(this, e).delay = t;
	};
}
function Xp(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Jp : Yp)(t, e)) : Dp(this.node(), t).delay;
}
//#endregion
//#region node_modules/d3-transition/src/transition/duration.js
function Zp(e, t) {
	return function() {
		Ep(this, e).duration = +t.apply(this, arguments);
	};
}
function Qp(e, t) {
	return t = +t, function() {
		Ep(this, e).duration = t;
	};
}
function $p(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Zp : Qp)(t, e)) : Dp(this.node(), t).duration;
}
//#endregion
//#region node_modules/d3-transition/src/transition/ease.js
function em(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		Ep(this, e).ease = t;
	};
}
function tm(e) {
	var t = this._id;
	return arguments.length ? this.each(em(t, e)) : Dp(this.node(), t).ease;
}
//#endregion
//#region node_modules/d3-transition/src/transition/easeVarying.js
function nm(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		Ep(this, e).ease = n;
	};
}
function rm(e) {
	if (typeof e != "function") throw Error();
	return this.each(nm(this._id, e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/filter.js
function im(e) {
	typeof e != "function" && (e = Il(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Nm(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/merge.js
function am(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new Nm(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/on.js
function om(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function sm(e, t, n) {
	var r, i, a = om(t) ? Tp : Ep;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function cm(e, t) {
	var n = this._id;
	return arguments.length < 2 ? Dp(this.node(), n).on.on(e) : this.each(sm(n, e, t));
}
//#endregion
//#region node_modules/d3-transition/src/transition/remove.js
function lm(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function um() {
	return this.on("end.remove", lm(this._id));
}
//#endregion
//#region node_modules/d3-transition/src/transition/select.js
function dm(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = kl(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, wp(l[f], t, n, f, l, Dp(u, n)));
	return new Nm(a, this._parents, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selectAll.js
function fm(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Nl(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = Dp(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && wp(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new Nm(a, o, t, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selection.js
var pm = yd.prototype.constructor;
function mm() {
	return new pm(this._groups, this._parents);
}
//#endregion
//#region node_modules/d3-transition/src/transition/style.js
function hm(e, t) {
	var n, r, i;
	return function() {
		var a = Eu(this, e), o = (this.style.removeProperty(e), Eu(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function gm(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function _m(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = Eu(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function vm(e, t, n) {
	var r, i, a;
	return function() {
		var o = Eu(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), Eu(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function ym(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = Ep(this, e), l = c.on, u = c.value[a] == null ? s ||= gm(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function bm(e, t, n) {
	var r = (e += "") == "transform" ? Jf : Fp;
	return t == null ? this.styleTween(e, hm(e, r)).on("end.style." + e, gm(e)) : typeof t == "function" ? this.styleTween(e, vm(e, r, Pp(this, "style." + e, t))).each(ym(this._id, e)) : this.styleTween(e, _m(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/d3-transition/src/transition/styleTween.js
function xm(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function Sm(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && xm(e, a, n)), r;
	}
	return a._value = t, a;
}
function Cm(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, Sm(e, t, n ?? ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/text.js
function wm(e) {
	return function() {
		this.textContent = e;
	};
}
function Tm(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function Em(e) {
	return this.tween("text", typeof e == "function" ? Tm(Pp(this, "text", e)) : wm(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/textTween.js
function Dm(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function Om(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && Dm(r)), t;
	}
	return r._value = e, r;
}
function km(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, Om(e));
}
//#endregion
//#region node_modules/d3-transition/src/transition/transition.js
function Am() {
	for (var e = this._name, t = this._id, n = Pm(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = Dp(c, t);
		wp(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new Nm(r, this._parents, e, n);
}
//#endregion
//#region node_modules/d3-transition/src/transition/end.js
function jm() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = Ep(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/index.js
var Mm = 0;
function Nm(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Pm() {
	return ++Mm;
}
var Fm = yd.prototype;
Nm.prototype = {
	constructor: Nm,
	select: dm,
	selectAll: fm,
	selectChild: Fm.selectChild,
	selectChildren: Fm.selectChildren,
	filter: im,
	merge: am,
	selection: mm,
	transition: Am,
	call: Fm.call,
	nodes: Fm.nodes,
	node: Fm.node,
	size: Fm.size,
	empty: Fm.empty,
	each: Fm.each,
	on: cm,
	attr: Hp,
	attrTween: qp,
	style: bm,
	styleTween: Cm,
	text: Em,
	textTween: km,
	remove: um,
	tween: Np,
	delay: Xp,
	duration: $p,
	ease: tm,
	easeVarying: rm,
	end: jm,
	[Symbol.iterator]: Fm[Symbol.iterator]
};
//#endregion
//#region node_modules/d3-ease/src/cubic.js
function Im(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/d3-transition/src/selection/transition.js
var Lm = {
	time: null,
	delay: 0,
	duration: 250,
	ease: Im
};
function Rm(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function zm(e) {
	var t, n;
	e instanceof Nm ? (t = e._id, e = e._name) : (t = Pm(), (n = Lm).time = fp(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && wp(c, e, t, l, o, n || Rm(c, t));
	return new Nm(r, this._parents, e, t);
}
yd.prototype.interrupt = Ap, yd.prototype.transition = zm;
//#endregion
//#region node_modules/d3-zoom/src/constant.js
var Bm = (e) => () => e;
//#endregion
//#region node_modules/d3-zoom/src/event.js
function Vm(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
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
function Hm(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Hm.prototype = {
	constructor: Hm,
	scale: function(e) {
		return e === 1 ? this : new Hm(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Hm(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Um = new Hm(1, 0, 0);
Wm.prototype = Hm.prototype;
function Wm(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return Um;
	return e.__zoom;
}
//#endregion
//#region node_modules/d3-zoom/src/noevent.js
function Gm(e) {
	e.stopImmediatePropagation();
}
function Km(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-zoom/src/zoom.js
function qm(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Jm() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Ym() {
	return this.__zoom || Um;
}
function Xm(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function Zm() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Qm(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function $m() {
	var e = qm, t = Jm, n = Qm, r = Xm, i = Zm, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = ep, l = vl("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", Ym).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", Ym), e === i ? i.interrupt().each(function() {
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
			return n(Um.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new Hm(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new Hm(e.k, r, i);
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
					e = new Hm(n, l[0] - t[0] * n, l[1] - t[1] * n);
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
			var t = xd(this.that).datum();
			l.call(e, this.that, new Vm(e, {
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
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = Cd(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], kp(this), s.start();
		Km(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = xd(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = Cd(t, i), l = t.clientX, u = t.clientY;
		Od(t.view), Gm(t), a.mouse = [c, this.__zoom.invert(c)], kp(this), a.start();
		function d(e) {
			if (Km(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = Cd(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), kd(e.view, a.moved), Km(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = Cd(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			Km(r), s > 0 ? xd(this).transition().duration(s).call(x, d, c, r) : xd(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (Gm(t), s = 0; s < i; ++s) c = r[s], l = Cd(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), kp(this), a.start());
		}
	}
	function O(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (Km(e), s = 0; s < a; ++s) c = i[s], l = Cd(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
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
			for (Gm(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = Cd(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = xd(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Bm(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Bm(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Bm(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Bm([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
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
var eh = {
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
}, th = [[-Infinity, -Infinity], [Infinity, Infinity]], nh = [
	"Enter",
	" ",
	"Escape"
], rh = {
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
}, ih;
(function(e) {
	e.Strict = "strict", e.Loose = "loose";
})(ih ||= {});
var ah;
(function(e) {
	e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(ah ||= {});
var oh;
(function(e) {
	e.Partial = "partial", e.Full = "full";
})(oh ||= {});
var sh = {
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
}, ch;
(function(e) {
	e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(ch ||= {});
var lh;
(function(e) {
	e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(lh ||= {});
var uh;
(function(e) {
	e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(uh ||= {});
var dh = {
	[uh.Left]: uh.Right,
	[uh.Right]: uh.Left,
	[uh.Top]: uh.Bottom,
	[uh.Bottom]: uh.Top
}, fh = (e) => !!e && typeof e == "object" && "id" in e && "source" in e && "target" in e, ph = (e) => !!e && typeof e == "object" && "id" in e && "position" in e && !("source" in e) && !("target" in e), mh = (e) => !!e && typeof e == "object" && "id" in e && "internals" in e && !("source" in e) && !("target" in e), hh = (e, t = [0, 0]) => {
	let { width: n, height: r } = Yh(e), i = e.origin ?? t, a = n * i[0], o = r * i[1];
	return {
		x: e.position.x - a,
		y: e.position.y - o
	};
}, gh = (e, t = { nodeOrigin: [0, 0] }) => {
	if (e.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let n = !1, r = e.reduce((e, r) => {
		let i = typeof r == "string", a = !t.nodeLookup && !i ? r : void 0;
		return t.nodeLookup && (a = i ? t.nodeLookup.get(r) : mh(r) ? r : t.nodeLookup.get(r.id)), a ? (n = !0, kh(e, Nh(a, t.nodeOrigin))) : e;
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return n ? jh(r) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, _h = (e, t = {}) => {
	let n = {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	}, r = !1;
	return e.forEach((e) => {
		(t.filter === void 0 || t.filter(e)) && (n = kh(n, Nh(e)), r = !0);
	}), r ? jh(n) : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}, vh = (e, t, [n, r, i] = [
	0,
	0,
	1
], a = !1, o = !1) => {
	let s = (t.x - n) / i, c = (t.y - r) / i, l = t.width / i, u = t.height / i, d = [];
	for (let t of e.values()) {
		let { measured: e, selectable: n = !0, hidden: r = !1 } = t;
		if (o && !n || r) continue;
		let i = e.width ?? t.width ?? t.initialWidth ?? 0, f = e.height ?? t.height ?? t.initialHeight ?? 0, { x: p, y: m } = t.internals.positionAbsolute, h = Fh(s, c, l, u, p, m, i, f), g = i * f, _ = a && h > 0;
		(!t.internals.handleBounds || _ || h >= g || t.dragging) && d.push(t);
	}
	return d;
}, yh = (e, t) => {
	let n = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		n.add(e.id);
	}), t.filter((e) => n.has(e.source) || n.has(e.target));
};
function bh(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t?.nodes ? new Set(t.nodes.map((e) => e.id)) : null;
	return e.forEach((e) => {
		let i;
		if (t?.includeHiddenNodes) {
			let { width: t, height: n } = Yh(e);
			i = t > 0 && n > 0;
		} else i = !!(e.measured.width && e.measured.height && !e.hidden);
		i && (!r || r.has(e.id)) && n.set(e.id, e);
	}), n;
}
async function xh({ nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: a }, o) {
	if (e.size === 0) return !0;
	let s = Kh(_h(bh(e, o)), t, n, o?.minZoom ?? i, o?.maxZoom ?? a, o?.padding ?? .1);
	return await r.setViewport(s, {
		duration: o?.duration,
		ease: o?.ease,
		interpolate: o?.interpolate
	}), !0;
}
function Sh({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: a }) {
	let o = n.get(e), s = o.parentId ? n.get(o.parentId) : void 0, { x: c, y: l } = s ? s.internals.positionAbsolute : {
		x: 0,
		y: 0
	}, u = o.origin ?? r, d = o.extent || i;
	if (o.extent === "parent" && !o.expandParent) {
		if (!s) a?.("005", eh.error005());
		else {
			let { width: e, height: t } = Yh(s);
			e && t && (d = [[c, l], [c + e, l + t]]);
		}
	} else s && Jh(o.extent) && (d = [[o.extent[0][0] + c, o.extent[0][1] + l], [o.extent[1][0] + c, o.extent[1][1] + l]]);
	let f = Jh(d) ? Th(t, d, o.measured) : t;
	return (o.measured.width === void 0 || o.measured.height === void 0) && a?.("015", eh.error015()), {
		position: {
			x: f.x - c + (o.measured.width ?? 0) * u[0],
			y: f.y - l + (o.measured.height ?? 0) * u[1]
		},
		positionAbsolute: f
	};
}
async function Ch({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: i }) {
	let a = new Set(e.map((e) => e.id)), o = [];
	for (let e of n) {
		if (e.deletable === !1) continue;
		let t = a.has(e.id), n = !t && e.parentId && o.find((t) => t.id === e.parentId);
		(t || n) && o.push(e);
	}
	let s = new Set(t.map((e) => e.id)), c = r.filter((e) => e.deletable !== !1), l = yh(o, c);
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
var wh = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), Th = (e = {
	x: 0,
	y: 0
}, t, n) => ({
	x: wh(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
	y: wh(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function Eh(e, t, n) {
	let { width: r, height: i } = Yh(n), { x: a, y: o } = n.internals.positionAbsolute;
	return Th(e, [[a, o], [a + r, o + i]], t);
}
var Dh = (e, t, n) => e < t ? wh(Math.abs(e - t), 1, t) / t : e > n ? -wh(Math.abs(e - n), 1, t) / t : 0, Oh = (e, t, n = 15, r = 40) => [Dh(e.x, r, t.width - r) * n, Dh(e.y, r, t.height - r) * n], kh = (e, t) => ({
	x: Math.min(e.x, t.x),
	y: Math.min(e.y, t.y),
	x2: Math.max(e.x2, t.x2),
	y2: Math.max(e.y2, t.y2)
}), Ah = ({ x: e, y: t, width: n, height: r }) => ({
	x: e,
	y: t,
	x2: e + n,
	y2: t + r
}), jh = ({ x: e, y: t, x2: n, y2: r }) => ({
	x: e,
	y: t,
	width: n - e,
	height: r - t
}), Mh = (e, t = [0, 0]) => {
	let { x: n, y: r } = mh(e) ? e.internals.positionAbsolute : hh(e, t);
	return {
		x: n,
		y: r,
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}, Nh = (e, t = [0, 0]) => {
	let { x: n, y: r } = mh(e) ? e.internals.positionAbsolute : hh(e, t);
	return {
		x: n,
		y: r,
		x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
		y2: r + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
	};
}, Ph = (e, t) => jh(kh(Ah(e), Ah(t))), Fh = (e, t, n, r, i, a, o, s) => {
	let c = Math.max(0, Math.min(e + n, i + o) - Math.max(e, i)), l = Math.max(0, Math.min(t + r, a + s) - Math.max(t, a));
	return Math.ceil(c * l);
}, Ih = (e, t) => Fh(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height), Lh = (e) => Rh(e.width) && Rh(e.height) && Rh(e.x) && Rh(e.y), Rh = (e) => !isNaN(e) && isFinite(e), zh = (e, t) => (e, t) => {}, Bh = (e, t = [1, 1]) => ({
	x: t[0] * Math.round(e.x / t[0]),
	y: t[1] * Math.round(e.y / t[1])
}), Vh = ({ x: e, y: t }, [n, r, i], a = !1, o = [1, 1]) => {
	let s = {
		x: (e - n) / i,
		y: (t - r) / i
	};
	return a ? Bh(s, o) : s;
}, Hh = ({ x: e, y: t }, [n, r, i]) => ({
	x: e * i + n,
	y: t * i + r
});
function Uh(e, t) {
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
function Wh(e, t, n) {
	if (typeof e == "string" || typeof e == "number") {
		let r = Uh(e, n), i = Uh(e, t);
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
		let r = Uh(e.top ?? e.y ?? 0, n), i = Uh(e.bottom ?? e.y ?? 0, n), a = Uh(e.left ?? e.x ?? 0, t), o = Uh(e.right ?? e.x ?? 0, t);
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
function Gh(e, t, n, r, i, a) {
	let { x: o, y: s } = Hh(e, [
		t,
		n,
		r
	]), { x: c, y: l } = Hh({
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
var Kh = (e, t, n, r, i, a) => {
	let o = Wh(a, t, n), s = (t - o.x) / e.width, c = (n - o.y) / e.height, l = wh(Math.min(s, c), r, i), u = e.x + e.width / 2, d = e.y + e.height / 2, f = t / 2 - u * l, p = n / 2 - d * l, m = Gh(e, f, p, l, t, n), h = {
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
}, qh = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Jh(e) {
	return e != null && e !== "parent";
}
function Yh(e) {
	return {
		width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
		height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
	};
}
function Xh(e) {
	return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function Zh(e, t = {
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
function Qh(e) {
	return {
		...rh,
		...e || {}
	};
}
function $h(e, t) {
	if (!e && !t) return !0;
	if (!e || !t || e.size !== t.size) return !1;
	if (!e.size && !t.size) return !0;
	for (let n of e.keys()) if (!t.has(n)) return !1;
	return !0;
}
function eg(e, t, n) {
	if (!n) return;
	let r = [];
	e.forEach((e, n) => {
		t?.has(n) || r.push(e);
	}), r.length && n(r);
}
function tg(e) {
	return e === null ? null : e ? "valid" : "invalid";
}
function ng(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
	let { x: a, y: o } = cg(e), s = Vh({
		x: a - (i?.left ?? 0),
		y: o - (i?.top ?? 0)
	}, r), { x: c, y: l } = n ? Bh(s, t) : s;
	return {
		xSnapped: c,
		ySnapped: l,
		...s
	};
}
var rg = (e) => ({
	width: e.offsetWidth,
	height: e.offsetHeight
}), ig = (e) => e?.getRootNode?.() || window?.document, ag = [
	"INPUT",
	"SELECT",
	"TEXTAREA"
];
function og(e) {
	let t = e.composedPath?.()?.[0] || e.target;
	return t?.nodeType === 1 ? ag.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey") : !1;
}
var sg = (e) => "clientX" in e, cg = (e, t) => {
	let n = sg(e), r = n ? e.clientX : e.touches?.[0].clientX, i = n ? e.clientY : e.touches?.[0].clientY;
	return {
		x: r - (t?.left ?? 0),
		y: i - (t?.top ?? 0)
	};
}, lg = (e, t, n, r, i) => {
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
			...rg(t)
		};
	});
};
function ug({ sourceX: e, sourceY: t, targetX: n, targetY: r, sourceControlX: i, sourceControlY: a, targetControlX: o, targetControlY: s }) {
	let c = e * .125 + i * .375 + o * .375 + n * .125, l = t * .125 + a * .375 + s * .375 + r * .125;
	return [
		c,
		l,
		Math.abs(c - e),
		Math.abs(l - t)
	];
}
function dg(e, t) {
	return e >= 0 ? .5 * e : t * 25 * Math.sqrt(-e);
}
function fg({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
	switch (e) {
		case uh.Left: return [t - dg(t - r, a), n];
		case uh.Right: return [t + dg(r - t, a), n];
		case uh.Top: return [t, n - dg(n - i, a)];
		case uh.Bottom: return [t, n + dg(i - n, a)];
	}
}
function pg({ sourceX: e, sourceY: t, sourcePosition: n = uh.Bottom, targetX: r, targetY: i, targetPosition: a = uh.Top, curvature: o = .25 }) {
	let [s, c] = fg({
		pos: n,
		x1: e,
		y1: t,
		x2: r,
		y2: i,
		c: o
	}), [l, u] = fg({
		pos: a,
		x1: r,
		y1: i,
		x2: e,
		y2: t,
		c: o
	}), [d, f, p, m] = ug({
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
function mg({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let i = Math.abs(n - e) / 2, a = n < e ? n + i : n - i, o = Math.abs(r - t) / 2;
	return [
		a,
		r < t ? r + o : r - o,
		i,
		o
	];
}
function hg({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: r = 0, elevateOnSelect: i = !1, zIndexMode: a = "basic" }) {
	return a === "manual" ? r : (i && n ? r + 1e3 : r) + Math.max(e.parentId || i && e.selected ? e.internals.z : 0, t.parentId || i && t.selected ? t.internals.z : 0);
}
function gg({ sourceNode: e, targetNode: t, width: n, height: r, transform: i }) {
	let a = kh(Nh(e), Nh(t));
	return a.x === a.x2 && (a.x2 += 1), a.y === a.y2 && (a.y2 += 1), Ih({
		x: -i[0] / i[2],
		y: -i[1] / i[2],
		width: n / i[2],
		height: r / i[2]
	}, jh(a)) > 0;
}
var _g = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`, vg = (e, t) => t.some((t) => t.source === e.source && t.target === e.target && (t.sourceHandle === e.sourceHandle || !t.sourceHandle && !e.sourceHandle) && (t.targetHandle === e.targetHandle || !t.targetHandle && !e.targetHandle)), yg = (e, t, n = {}) => {
	if (!e.source || !e.target) return n.onError?.("006", eh.error006()), t;
	let r = n.getEdgeId || _g, i;
	return i = fh(e) ? { ...e } : {
		...e,
		id: r(e)
	}, vg(i, t) ? t : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, t.concat(i));
};
function bg({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
	let [i, a, o, s] = mg({
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
var xg = {
	[uh.Left]: {
		x: -1,
		y: 0
	},
	[uh.Right]: {
		x: 1,
		y: 0
	},
	[uh.Top]: {
		x: 0,
		y: -1
	},
	[uh.Bottom]: {
		x: 0,
		y: 1
	}
}, Sg = ({ source: e, sourcePosition: t = uh.Bottom, target: n }) => t === uh.Left || t === uh.Right ? e.x < n.x ? {
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
}, Cg = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
function wg({ source: e, sourcePosition: t = uh.Bottom, target: n, targetPosition: r = uh.Top, center: i, offset: a, stepPosition: o }) {
	let s = xg[t], c = xg[r], l = {
		x: e.x + s.x * a,
		y: e.y + s.y * a
	}, u = {
		x: n.x + c.x * a,
		y: n.y + c.y * a
	}, d = Sg({
		source: l,
		sourcePosition: t,
		target: u
	}), f = d.x === 0 ? "y" : "x", p = d[f], m = [], h, g, _ = {
		x: 0,
		y: 0
	}, v = {
		x: 0,
		y: 0
	}, [, , y, b] = mg({
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
function Tg(e, t, n, r) {
	let i = Math.min(Cg(e, t) / 2, Cg(t, n) / 2, r), { x: a, y: o } = t;
	if (e.x === a && a === n.x || e.y === o && o === n.y) return `L${a} ${o}`;
	if (e.y === o) {
		let t = e.x < n.x ? -1 : 1, r = e.y < n.y ? 1 : -1;
		return `L ${a + i * t},${o}Q ${a},${o} ${a},${o + i * r}`;
	}
	let s = e.x < n.x ? 1 : -1;
	return `L ${a},${o + i * (e.y < n.y ? -1 : 1)}Q ${a},${o} ${a + i * s},${o}`;
}
function Eg({ sourceX: e, sourceY: t, sourcePosition: n = uh.Bottom, targetX: r, targetY: i, targetPosition: a = uh.Top, borderRadius: o = 5, centerX: s, centerY: c, offset: l = 20, stepPosition: u = .5 }) {
	let [d, f, p, m, h] = wg({
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
	for (let e = 1; e < d.length - 1; e++) g += Tg(d[e - 1], d[e], d[e + 1], o);
	return g += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [
		g,
		f,
		p,
		m,
		h
	];
}
function Dg(e) {
	return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function Og(e) {
	let { sourceNode: t, targetNode: n } = e;
	if (!Dg(t) || !Dg(n)) return null;
	let r = t.internals.handleBounds || kg(t.handles), i = n.internals.handleBounds || kg(n.handles), a = jg(r?.source ?? [], e.sourceHandle), o = jg(e.connectionMode === ih.Strict ? i?.target ?? [] : (i?.target ?? []).concat(i?.source ?? []), e.targetHandle);
	if (!a || !o) return e.onError?.("008", eh.error008(a ? "target" : "source", {
		id: e.id,
		sourceHandle: e.sourceHandle,
		targetHandle: e.targetHandle
	})), null;
	let s = a?.position || uh.Bottom, c = o?.position || uh.Top, l = Ag(t, a, s), u = Ag(n, o, c);
	return {
		sourceX: l.x,
		sourceY: l.y,
		targetX: u.x,
		targetY: u.y,
		sourcePosition: s,
		targetPosition: c
	};
}
function kg(e) {
	if (!e) return null;
	let t = [], n = [];
	for (let r of e) r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? t.push(r) : r.type === "target" && n.push(r);
	return {
		source: t,
		target: n
	};
}
function Ag(e, t, n = uh.Left, r = !1) {
	let i = (t?.x ?? 0) + e.internals.positionAbsolute.x, a = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: o, height: s } = t ?? Yh(e);
	if (r) return {
		x: i + o / 2,
		y: a + s / 2
	};
	switch (t?.position ?? n) {
		case uh.Top: return {
			x: i + o / 2,
			y: a
		};
		case uh.Right: return {
			x: i + o,
			y: a + s / 2
		};
		case uh.Bottom: return {
			x: i + o / 2,
			y: a + s
		};
		case uh.Left: return {
			x: i,
			y: a + s / 2
		};
	}
}
function jg(e, t) {
	return e && (t ? e.find((e) => e.id === t) : e[0]) || null;
}
function Mg(e, t) {
	return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((t) => `${t}=${e[t]}`).join("&")}` : "";
}
function Ng(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: i }) {
	let a = /* @__PURE__ */ new Set();
	return e.reduce((e, o) => ([o.markerStart || r, o.markerEnd || i].forEach((r) => {
		if (r && typeof r == "object") {
			let i = Mg(r, t);
			a.has(i) || (e.push({
				id: i,
				color: r.color || n,
				...r
			}), a.add(i));
		}
	}), e), []).sort((e, t) => e.id.localeCompare(t.id));
}
var Pg = 1e3, Fg = 10, Ig = {
	nodeOrigin: [0, 0],
	nodeExtent: th,
	elevateNodesOnSelect: !0,
	zIndexMode: "basic",
	defaults: {}
}, Lg = {
	...Ig,
	checkEquality: !0
};
function Rg(e, t) {
	let n = { ...e };
	for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}
function zg(e, t, n) {
	let r = Rg(Ig, n);
	for (let n of e.values()) if (n.parentId) Wg(n, e, t, r);
	else {
		let e = Th(hh(n, r.nodeOrigin), Jh(n.extent) ? n.extent : r.nodeExtent, Yh(n));
		n.internals.positionAbsolute = e;
	}
}
function Bg(e, t) {
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
function Vg(e) {
	return e === "manual";
}
function Hg(e, t, n, r = {}) {
	let i = Rg(Lg, r), a = { i: 0 }, o = new Map(t), s = i?.elevateNodesOnSelect && !Vg(i.zIndexMode) ? Pg : 0, c = e.length > 0, l = !1;
	t.clear(), n.clear();
	for (let u of e) {
		let e = o.get(u.id);
		if (i.checkEquality && u === e?.internals.userNode) t.set(u.id, e);
		else {
			let n = Th(hh(u, i.nodeOrigin), Jh(u.extent) ? u.extent : i.nodeExtent, Yh(u));
			e = {
				...i.defaults,
				...u,
				measured: {
					width: u.measured?.width,
					height: u.measured?.height
				},
				internals: {
					positionAbsolute: n,
					handleBounds: Bg(u, e),
					z: Gg(u, s, i.zIndexMode),
					userNode: u
				}
			}, t.set(u.id, e);
		}
		(e.measured === void 0 || e.measured.width === void 0 || e.measured.height === void 0) && !e.hidden && (c = !1), u.parentId && Wg(e, t, n, r, a), l ||= u.selected ?? !1;
	}
	return {
		nodesInitialized: c,
		hasSelectedNodes: l
	};
}
function Ug(e, t) {
	if (!e.parentId) return;
	let n = t.get(e.parentId);
	n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Wg(e, t, n, r, i) {
	let { elevateNodesOnSelect: a, nodeOrigin: o, nodeExtent: s, zIndexMode: c } = Rg(Ig, r), l = e.parentId, u = t.get(l);
	if (!u) {
		console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
		return;
	}
	Ug(e, n), i && !u.parentId && u.internals.rootParentIndex === void 0 && c === "auto" && (u.internals.rootParentIndex = ++i.i, u.internals.z = u.internals.z + i.i * Fg), i && u.internals.rootParentIndex !== void 0 && (i.i = u.internals.rootParentIndex);
	let { x: d, y: f, z: p } = Kg(e, u, o, s, a && !Vg(c) ? Pg : 0, c), { positionAbsolute: m } = e.internals, h = d !== m.x || f !== m.y;
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
function Gg(e, t, n) {
	let r = Rh(e.zIndex) ? e.zIndex : 0;
	return Vg(n) ? r : r + (e.selected ? t : 0);
}
function Kg(e, t, n, r, i, a) {
	let { x: o, y: s } = t.internals.positionAbsolute, c = Yh(e), l = hh(e, n), u = Jh(e.extent) ? Th(l, e.extent, c) : l, d = Th({
		x: o + u.x,
		y: s + u.y
	}, r, c);
	e.extent === "parent" && (d = Eh(d, c, t));
	let f = Gg(e, i, a), p = t.internals.z ?? 0;
	return {
		x: d.x,
		y: d.y,
		z: p >= f ? p + 1 : f
	};
}
function qg(e, t, n, r = [0, 0]) {
	let i = [], a = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.parentId);
		if (!e) continue;
		let r = Ph(a.get(n.parentId)?.expandedRect ?? Mh(e), n.rect);
		a.set(n.parentId, {
			expandedRect: r,
			parent: e
		});
	}
	return a.size > 0 && a.forEach(({ expandedRect: t, parent: a }, o) => {
		let s = a.internals.positionAbsolute, c = Yh(a), l = a.origin ?? r, u = t.x < s.x ? Math.round(Math.abs(s.x - t.x)) : 0, d = t.y < s.y ? Math.round(Math.abs(s.y - t.y)) : 0, f = Math.max(c.width, Math.round(t.width)), p = Math.max(c.height, Math.round(t.height)), m = (f - c.width) * l[0], h = (p - c.height) * l[1];
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
function Jg(e, t, n, r, i, a, o) {
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
		let s = rg(r.nodeElement), u = e.measured.width !== s.width || e.measured.height !== s.height;
		if (s.width && s.height && (u || !e.internals.handleBounds || r.force)) {
			let p = r.nodeElement.getBoundingClientRect(), m = Jh(e.extent) ? e.extent : a, { positionAbsolute: h } = e.internals;
			if (e.parentId && e.extent === "parent") {
				let n = t.get(e.parentId);
				n && (h = Eh(h, s, n));
			} else m && (h = Th(h, m, s));
			let g = {
				...e,
				measured: s,
				internals: {
					...e.internals,
					positionAbsolute: h,
					handleBounds: {
						source: lg("source", r.nodeElement, p, d, e.id),
						target: lg("target", r.nodeElement, p, d, e.id)
					}
				}
			};
			t.set(e.id, g), e.parentId && Wg(g, t, n, {
				nodeOrigin: i,
				zIndexMode: o
			}), c = !0, u && (l.push({
				id: e.id,
				type: "dimensions",
				dimensions: s
			}), e.expandParent && e.parentId && f.push({
				id: e.id,
				parentId: e.parentId,
				rect: Mh(g, i)
			}));
		}
	}
	if (f.length > 0) {
		let e = qg(f, t, n, i);
		l.push(...e);
	}
	return {
		changes: l,
		updatedInternals: c
	};
}
async function Yg({ delta: e, panZoom: t, transform: n, translateExtent: r, width: i, height: a }) {
	if (!t || !e.x && !e.y) return !1;
	let o = await t.setViewportConstrained({
		x: n[0] + e.x,
		y: n[1] + e.y,
		zoom: n[2]
	}, [[0, 0], [i, a]], r);
	return !!o && (o.x !== n[0] || o.y !== n[1] || o.k !== n[2]);
}
function Xg(e, t, n, r, i, a) {
	let o = i, s = r.get(o) || /* @__PURE__ */ new Map();
	r.set(o, s.set(n, t)), o = `${i}-${e}`;
	let c = r.get(o) || /* @__PURE__ */ new Map();
	if (r.set(o, c.set(n, t)), a) {
		o = `${i}-${e}-${a}`;
		let s = r.get(o) || /* @__PURE__ */ new Map();
		r.set(o, s.set(n, t));
	}
}
function Zg(e, t, n) {
	e.clear(), t.clear();
	for (let r of n) {
		let { source: n, target: i, sourceHandle: a = null, targetHandle: o = null } = r, s = {
			edgeId: r.id,
			source: n,
			target: i,
			sourceHandle: a,
			targetHandle: o
		}, c = `${n}-${a}--${i}-${o}`;
		Xg("source", s, `${i}-${o}--${n}-${a}`, e, n, a), Xg("target", s, c, e, i, o), t.set(r.id, r);
	}
}
function Qg(e, t) {
	if (!e.parentId) return !1;
	let n = t.get(e.parentId);
	return n ? n.selected ? !0 : Qg(n, t) : !1;
}
function $g(e, t, n) {
	let r = e;
	do {
		if (r?.matches?.(t)) return !0;
		if (r === n) return !1;
		r = r?.parentElement;
	} while (r);
	return !1;
}
function e_(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let [a, o] of e) if ((o.selected || o.id === r) && (!o.parentId || !Qg(o, e)) && (o.draggable || t && o.draggable === void 0)) {
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
function t_({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
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
function n_({ dragItems: e, snapGrid: t, x: n, y: r }) {
	let i = e.values().next().value;
	if (!i) return null;
	let a = {
		x: n - i.distance.x,
		y: r - i.distance.y
	}, o = Bh(a, t);
	return {
		x: o.x - a.x,
		y: o.y - a.y
	};
}
function r_({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: i }) {
	let a = {
		x: null,
		y: null
	}, o = 0, s = /* @__PURE__ */ new Map(), c = !1, l = {
		x: 0,
		y: 0
	}, u = null, d = !1, f = null, p = !1, m = !1, h = null;
	function g({ noDragClassName: g, handleSelector: _, domNode: v, isSelectable: y, nodeId: b, nodeClickDistance: x = 0 }) {
		f = xd(v);
		function S({ x: e, y: n }) {
			let { nodeLookup: i, nodeExtent: o, snapGrid: c, snapToGrid: l, nodeOrigin: u, onNodeDrag: d, onSelectionDrag: f, onError: p, updateNodePositions: g } = t();
			a = {
				x: e,
				y: n
			};
			let _ = !1, v = s.size > 1, y = v && o ? Ah(_h(s)) : null, x = v && l ? n_({
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
				} : Bh(a, c));
				let s = null;
				if (v && o && !r.extent && y) {
					let { positionAbsolute: e } = r.internals, t = e.x - y.x + o[0][0], n = e.x + r.measured.width - y.x2 + o[1][0], i = e.y - y.y + o[0][1], a = e.y + r.measured.height - y.y2 + o[1][1];
					s = [[t, i], [n, a]];
				}
				let { position: d, positionAbsolute: f } = Sh({
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
				let [e, t] = t_({
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
			let [s, d] = Oh(l, u, r);
			(s !== 0 || d !== 0) && (a.x = (a.x ?? 0) - s / e[2], a.y = (a.y ?? 0) - d / e[2], await n({
				x: s,
				y: d
			}) && S(a)), o = requestAnimationFrame(C);
		}
		function w(r) {
			let { nodeLookup: i, multiSelectionActive: o, nodesDraggable: c, transform: l, snapGrid: f, snapToGrid: p, selectNodesOnDrag: m, onNodeDragStart: h, onSelectionDragStart: g, unselectNodesAndEdges: _ } = t();
			d = !0, (!m || !y) && !o && b && (i.get(b)?.selected || _()), y && m && b && e?.(b);
			let v = ng(r.sourceEvent, {
				transform: l,
				snapGrid: f,
				snapToGrid: p,
				containerBounds: u
			});
			if (a = v, s = e_(i, c, v, b), s.size > 0 && (n || h || !b && g)) {
				let [e, t] = t_({
					nodeId: b,
					dragItems: s,
					nodeLookup: i
				});
				n?.(r.sourceEvent, s, e, t), h?.(r.sourceEvent, e, t), b || g?.(r.sourceEvent, t);
			}
		}
		let T = Id().clickDistance(x).on("start", (e) => {
			let { domNode: n, nodeDragThreshold: r, transform: i, snapGrid: o, snapToGrid: s } = t();
			u = n?.getBoundingClientRect() || null, p = !1, m = !1, h = e.sourceEvent, r === 0 && w(e), a = ng(e.sourceEvent, {
				transform: i,
				snapGrid: o,
				snapToGrid: s,
				containerBounds: u
			}), l = cg(e.sourceEvent, u);
		}).on("drag", (e) => {
			let { autoPanOnNodeDrag: n, transform: r, snapGrid: i, snapToGrid: o, nodeDragThreshold: f, nodeLookup: m } = t(), g = ng(e.sourceEvent, {
				transform: r,
				snapGrid: i,
				snapToGrid: o,
				containerBounds: u
			});
			if (h = e.sourceEvent, (e.sourceEvent.type === "touchmove" && e.sourceEvent.touches.length > 1 || b && !m.has(b)) && (p = !0), !p) {
				if (!c && n && d && (c = !0, C()), !d) {
					let t = cg(e.sourceEvent, u), n = t.x - l.x, r = t.y - l.y;
					Math.sqrt(n * n + r * r) > f && w(e);
				}
				(a.x !== g.xSnapped || a.y !== g.ySnapped) && s && d && (l = cg(e.sourceEvent, u), S(g));
			}
		}).on("end", (e) => {
			if (!d || p) {
				p && s.size > 0 && t().updateNodePositions(s, !1);
				return;
			}
			if (c = !1, d = !1, cancelAnimationFrame(o), s.size > 0) {
				let { nodeLookup: n, updateNodePositions: r, onNodeDragStop: a, onSelectionDragStop: o } = t();
				if (m &&= (r(s, !1), !1), i || a || !b && o) {
					let [t, r] = t_({
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
			return !e.button && (!g || !$g(t, `.${g}`, v)) && (!_ || $g(t, _, v));
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
function i_(e, t, n) {
	let r = [], i = {
		x: e.x - n,
		y: e.y - n,
		width: n * 2,
		height: n * 2
	};
	for (let e of t.values()) Ih(i, Mh(e)) > 0 && r.push(e);
	return r;
}
var a_ = 250;
function o_(e, t, n, r) {
	let i = [], a = Infinity, o = i_(e, n, t + a_);
	for (let n of o) {
		let o = [...n.internals.handleBounds?.source ?? [], ...n.internals.handleBounds?.target ?? []];
		for (let s of o) {
			if (r.nodeId === s.nodeId && r.type === s.type && r.id === s.id) continue;
			let { x: o, y: c } = Ag(n, s, s.position, !0), l = Math.sqrt((o - e.x) ** 2 + (c - e.y) ** 2);
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
function s_(e, t, n, r, i, a = !1) {
	let o = r.get(e);
	if (!o) return null;
	let s = i === "strict" ? o.internals.handleBounds?.[t] : [...o.internals.handleBounds?.source ?? [], ...o.internals.handleBounds?.target ?? []], c = (n ? s?.find((e) => e.id === n) : s?.[0]) ?? null;
	return c && a ? {
		...c,
		...Ag(o, c, c.position, !0)
	} : c;
}
function c_(e, t) {
	return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function l_(e, t) {
	let n = null;
	return t ? n = !0 : e && !t && (n = !1), n;
}
var u_ = () => !0;
function d_(e, { connectionMode: t, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: a, isTarget: o, domNode: s, nodeLookup: c, lib: l, autoPanOnConnect: u, flowId: d, panBy: f, cancelConnection: p, onConnectStart: m, onConnect: h, onConnectEnd: g, isValidConnection: _ = u_, onReconnectEnd: v, updateConnection: y, getTransform: b, getFromHandle: x, autoPanSpeed: S, dragThreshold: C = 1, handleDomNode: w }) {
	let T = ig(e.target), E = 0, D, { x: O, y: k } = cg(e), A = c_(a, w), j = s?.getBoundingClientRect(), ee = !1;
	if (!j || !A) return;
	let M = s_(i, A, r, c, t);
	if (!M) return;
	let te = cg(e, j), ne = !1, re = null, ie = !1, ae = null;
	function oe() {
		if (!u || !j) return;
		let [e, t] = Oh(te, j, S);
		f({
			x: e,
			y: t
		}), E = requestAnimationFrame(oe);
	}
	let se = {
		...M,
		nodeId: i,
		type: A,
		position: M.position
	}, ce = c.get(i), le = {
		inProgress: !0,
		isValid: null,
		from: Ag(ce, se, uh.Left, !0),
		fromHandle: se,
		fromPosition: se.position,
		fromNode: ce,
		to: te,
		toHandle: null,
		toPosition: dh[se.position],
		toNode: null,
		pointer: te
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
			let { x: t, y: n } = cg(e), r = t - O, i = n - k;
			if (!(r * r + i * i > C * C)) return;
			ue();
		}
		if (!x() || !se) {
			fe(e);
			return;
		}
		let a = b();
		te = cg(e, j), D = o_(Vh(te, a, !1, [1, 1]), n, c, se), ne ||= (oe(), !0);
		let s = f_(e, {
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
		ae = s.handleDomNode, re = s.connection, ie = l_(!!D, s.isValid);
		let u = c.get(i), f = u ? Ag(u, se, uh.Left, !0) : le.from, p = {
			...le,
			from: f,
			isValid: ie,
			to: s.toHandle && ie ? Hh({
				x: s.toHandle.x,
				y: s.toHandle.y
			}, a) : te,
			toHandle: s.toHandle,
			toPosition: ie && s.toHandle ? s.toHandle.position : dh[se.position],
			toNode: s.toHandle ? c.get(s.toHandle.nodeId) : null,
			pointer: te
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
function f_(e, { handle: t, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: a, doc: o, lib: s, flowId: c, isValidConnection: l = u_, nodeLookup: u }) {
	let d = a === "target", f = t ? o.querySelector(`.${s}-flow__handle[data-id="${c}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: m } = cg(e), h = o.elementFromPoint(p, m), g = h?.classList.contains(`${s}-flow__handle`) ? h : f, _ = {
		handleDomNode: g,
		isValid: !1,
		connection: null,
		toHandle: null
	};
	if (g) {
		let e = c_(void 0, g), t = g.getAttribute("data-nodeid"), a = g.getAttribute("data-handleid"), o = g.classList.contains("connectable"), s = g.classList.contains("connectableend");
		if (!t || !e) return _;
		let c = {
			source: d ? t : r,
			sourceHandle: d ? a : i,
			target: d ? r : t,
			targetHandle: d ? i : a
		};
		_.connection = c, _.isValid = o && s && (n === ih.Strict ? d && e === "source" || !d && e === "target" : t !== r || a !== i) && l(c), _.toHandle = s_(t, e, a, u, n, !0);
	}
	return _;
}
var p_ = {
	onPointerDown: d_,
	isValid: f_
};
function m_({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
	let i = xd(e);
	function a({ translateExtent: e, width: a, height: o, zoomStep: s = 1, pannable: c = !0, zoomable: l = !0, inversePan: u = !1 }) {
		let d = (e) => {
			if (e.sourceEvent.type !== "wheel" || !t) return;
			let r = n(), i = e.sourceEvent.ctrlKey && qh() ? 10 : 1, a = -e.sourceEvent.deltaY * (e.sourceEvent.deltaMode === 1 ? .05 : e.sourceEvent.deltaMode ? 1 : .002) * s, o = r[2] * 2 ** (a * i);
			t.scaleTo(o);
		}, f = [0, 0], p = $m().on("start", (e) => {
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
		pointer: Cd
	};
}
var h_ = (e) => ({
	x: e.x,
	y: e.y,
	zoom: e.k
}), g_ = ({ x: e, y: t, zoom: n }) => Um.translate(e, t).scale(n), __ = (e, t) => e.target.closest(`.${t}`), v_ = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), y_ = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, b_ = (e, t = 0, n = y_, r = () => {}) => {
	let i = typeof t == "number" && t > 0;
	return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}, x_ = (e) => {
	let t = e.ctrlKey && qh() ? 10 : 1;
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * t;
};
function S_({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: a, zoomOnPinch: o, onPanZoomStart: s, onPanZoom: c, onPanZoomEnd: l }) {
	return (u) => {
		if (__(u, t)) return u.ctrlKey && u.preventDefault(), !1;
		u.preventDefault(), u.stopImmediatePropagation();
		let d = n.property("__zoom").k || 1;
		if (u.ctrlKey && o) {
			let e = Cd(u), t = d * 2 ** x_(u);
			r.scaleTo(n, t, e, u);
			return;
		}
		let f = u.deltaMode === 1 ? 20 : 1, p = i === ah.Vertical ? 0 : u.deltaX * f, m = i === ah.Horizontal ? 0 : u.deltaY * f;
		!qh() && u.shiftKey && i !== ah.Vertical && (p = u.deltaY * f, m = 0), r.translateBy(n, -(p / d) * a, -(m / d) * a, { internal: !0 });
		let h = h_(n.property("__zoom"));
		clearTimeout(e.panScrollTimeout), e.isPanScrolling ? c?.(u, h) : (e.isPanScrolling = !0, s?.(u, h)), e.panScrollTimeout = setTimeout(() => {
			l?.(u, h), e.isPanScrolling = !1;
		}, 150);
	};
}
function C_({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
	return function(r, i) {
		let a = r.type === "wheel", o = !t && a && !r.ctrlKey, s = __(r, e);
		if (r.ctrlKey && a && s && r.preventDefault(), o || s) return null;
		r.preventDefault(), n.call(this, r, i);
	};
}
function w_({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
	return (r) => {
		if (r.sourceEvent?.internal) return;
		let i = h_(r.transform);
		e.mouseButton = r.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = i, r.sourceEvent?.type === "mousedown" && t(!0), n && n?.(r.sourceEvent, i);
	};
}
function T_({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
	return (a) => {
		e.usedRightMouseButton = !!(n && v_(t, e.mouseButton ?? 0)), a.sourceEvent?.sync || r([
			a.transform.x,
			a.transform.y,
			a.transform.k
		]), i && !a.sourceEvent?.internal && i?.(a.sourceEvent, h_(a.transform));
	};
}
function E_({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: a }) {
	return (o) => {
		if (!o.sourceEvent?.internal && (e.isZoomingOrPanning = !1, a && v_(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && o.sourceEvent && a(o.sourceEvent), e.usedRightMouseButton = !1, r(!1), i)) {
			let t = h_(o.transform);
			e.prevViewport = t, clearTimeout(e.timerId), e.timerId = setTimeout(() => {
				i?.(o.sourceEvent, t);
			}, n ? 150 : 0);
		}
	};
}
function D_({ panActivationKeyPressed: e, zoomActivationKeyPressed: t, zoomOnScroll: n, zoomOnPinch: r, panOnDrag: i, panOnScroll: a, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: c, noPanClassName: l, lib: u, connectionInProgress: d }) {
	return (f) => {
		let p = t || n, m = r && f.ctrlKey, h = f.type === "wheel";
		if (f.button === 1 && f.type === "mousedown" && (__(f, `${u}-flow__node`) || __(f, `${u}-flow__edge`) || __(f, `${u}-flow__selection`) || __(f, `${u}-flow__nodesselection`))) return !0;
		if (!i && !p && !a && !o && !r || s || d && !h || __(f, c) && h || __(f, l) && (!h || a && h && !t) || !r && f.ctrlKey && h) return !1;
		if (!r && f.type === "touchstart" && f.touches?.length > 1) return f.preventDefault(), !1;
		if (!p && !a && !m && h || !i && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(i) && !i.includes(f.button) && f.type === "mousedown") return !1;
		let g = Array.isArray(i) && i.includes(f.button) || !f.button || f.button <= 1;
		return (!f.ctrlKey || h || e) && g;
	};
}
function O_({ domNode: e, minZoom: t, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: a, onPanZoomStart: o, onPanZoomEnd: s, onDraggingChange: c }) {
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
	let f = $m().extent(() => d).scaleExtent([t, n]).translateExtent(r), p = xd(e).call(f);
	y({
		x: i.x,
		y: i.y,
		zoom: wh(i.zoom, t, n)
	}, [[0, 0], [u.width, u.height]], r);
	let m = p.on("wheel.zoom"), h = p.on("dblclick.zoom");
	f.wheelDelta(x_);
	async function g(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Bf : ep).transform(b_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function _({ noWheelClassName: e, noPanClassName: t, onPaneContextMenu: n, userSelectionActive: r, panOnScroll: i, panOnDrag: u, panOnScrollMode: d, panOnScrollSpeed: g, preventScrolling: _, zoomOnPinch: y, zoomOnScroll: b, zoomOnDoubleClick: x, panActivationKeyPressed: S = !1, zoomActivationKeyPressed: C, lib: w, onTransformChange: T, connectionInProgress: E, paneClickDistance: D, selectionOnDrag: O }) {
		r && !l.isZoomingOrPanning && v();
		let k = i && !C && !r;
		f.clickDistance(O ? Infinity : !Rh(D) || D < 0 ? 0 : D);
		let A = k ? S_({
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
		}) : C_({
			noWheelClassName: e,
			preventScrolling: _,
			d3ZoomHandler: m
		});
		p.on("wheel.zoom", A, { passive: !1 });
		let j = w_({
			zoomPanValues: l,
			onDraggingChange: c,
			onPanZoomStart: o
		});
		f.on("start", j);
		let ee = T_({
			zoomPanValues: l,
			panOnDrag: u,
			onPaneContextMenu: !!n,
			onPanZoom: a,
			onTransformChange: T
		});
		f.on("zoom", ee);
		let M = E_({
			zoomPanValues: l,
			panOnDrag: u,
			panOnScroll: i,
			onPaneContextMenu: n,
			onPanZoomEnd: s,
			onDraggingChange: c
		});
		f.on("end", M);
		let te = D_({
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
		f.filter(te), x ? p.on("dblclick.zoom", h) : p.on("dblclick.zoom", null);
	}
	function v() {
		f.on("zoom", null);
	}
	async function y(e, t, n) {
		let r = g_(e), i = f?.constrain()(r, t, n);
		return i && await g(i), i;
	}
	async function b(e, t) {
		let n = g_(e);
		return await g(n, t), n;
	}
	function x(e) {
		if (p) {
			let t = g_(e), n = p.property("__zoom");
			(n.k !== e.zoom || n.x !== e.x || n.y !== e.y) && f?.transform(p, t, null, { sync: !0 });
		}
	}
	function S() {
		let e = p ? Wm(p.node()) : {
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
			f?.interpolate(t?.interpolate === "linear" ? Bf : ep).scaleTo(b_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	async function w(e, t) {
		return p ? new Promise((n) => {
			f?.interpolate(t?.interpolate === "linear" ? Bf : ep).scaleBy(b_(p, t?.duration, t?.ease, () => n(!0)), e);
		}) : !1;
	}
	function T(e) {
		f?.scaleExtent(e);
	}
	function E(e) {
		f?.translateExtent(e);
	}
	function D(e) {
		let t = !Rh(e) || e < 0 ? 0 : e;
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
var k_;
(function(e) {
	e.Line = "line", e.Handle = "handle";
})(k_ ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/utils/edges.js
var A_ = zh("Svelte Flow", "https://svelteflow.dev/");
function j_(e, t, n = {}) {
	return yg(e, t, {
		...n,
		onError: n.onError ?? A_
	});
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/context.js
function M_() {
	let e = {};
	return [(t) => {
		if (t && !yt(e)) throw Error(t);
		return _t(e);
	}, (t) => vt(e, t)];
}
var [N_, P_] = M_(), [F_, I_] = M_(), [L_, R_] = M_(), z_ = /* @__PURE__ */ new Set([
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
]), B_ = /* @__PURE__ */ G("<div><!></div>");
function V_(e, t) {
	bt(t, !0);
	let n = Q(t, "id", 3, null), r = Q(t, "type", 3, "source"), i = Q(t, "position", 19, () => uh.Top), a = Q(t, "isConnectableStart", 3, !0), o = Q(t, "isConnectableEnd", 3, !0), s = /* @__PURE__ */ xo(t, z_), c = N_("Handle must be used within a Custom Node component"), l = F_("Handle must be used within a Custom Node component"), d = /* @__PURE__ */ P(() => r() === "target"), f = /* @__PURE__ */ P(() => t.isConnectable === void 0 ? l.value : t.isConnectable), p = Tv(), m = /* @__PURE__ */ P(() => p.ariaLabelConfig), h = null;
	Ir(() => {
		if (t.onconnect || t.ondisconnect) {
			p.edges;
			let e = p.connectionLookup.get(`${c}-${r()}${n() ? `-${n()}` : ""}`);
			if (h && !$h(e, h)) {
				let n = e ?? /* @__PURE__ */ new Map();
				eg(h, n, t.ondisconnect), eg(n, h, t.onconnect);
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
			p.connectionMode === ih.Strict ? e?.type !== r() : c !== e?.nodeId || n() !== e?.id,
			o && i
		];
	}), _ = /* @__PURE__ */ P(() => u(H(g), 5)), v = /* @__PURE__ */ P(() => H(_)[0]), y = /* @__PURE__ */ P(() => H(_)[1]), b = /* @__PURE__ */ P(() => H(_)[2]), x = /* @__PURE__ */ P(() => H(_)[3]), S = /* @__PURE__ */ P(() => H(_)[4]);
	function w(e) {
		let t = p.onbeforeconnect ? p.onbeforeconnect(e) : e;
		t && (p.addEdge(t), p.onconnect?.(e));
	}
	function T(e) {
		let r = sg(e);
		e.currentTarget && (r && e.button === 0 || !r) && p_.onPointerDown(e, {
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
		let i = ig(e.target), o = t.isValidConnection ?? p.isValidConnection, { connectionMode: s, clickConnectStartHandle: l, flowId: u, nodeLookup: d } = p, { connection: f, isValid: m } = p_.isValid(e, {
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
	var D = B_(), O = () => {};
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
var H_ = /* @__PURE__ */ G("<!> <!>", 1);
function U_(e, t) {
	bt(t, !0);
	let n = Q(t, "targetPosition", 19, () => uh.Top), r = Q(t, "sourcePosition", 19, () => uh.Bottom);
	var i = H_(), a = R(i);
	V_(a, {
		type: "target",
		get position() {
			return n();
		}
	});
	var o = z(a);
	V_(z(o), {
		type: "source",
		get position() {
			return r();
		}
	}), V(() => q(o, ` ${t.data?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/InputNode.svelte
var W_ = /* @__PURE__ */ G(" <!>", 1);
function G_(e, t) {
	bt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "sourcePosition", 19, () => uh.Bottom);
	Ke();
	var i = W_(), a = R(i);
	V_(z(a), {
		type: "source",
		get position() {
			return r();
		}
	}), V(() => q(a, `${n()?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/OutputNode.svelte
var K_ = /* @__PURE__ */ G(" <!>", 1);
function q_(e, t) {
	bt(t, !0);
	let n = Q(t, "data", 19, () => ({ label: "Node" })), r = Q(t, "targetPosition", 19, () => uh.Top);
	Ke();
	var i = K_(), a = R(i);
	V_(z(a), {
		type: "target",
		get position() {
			return r();
		}
	}), V(() => q(a, `${n()?.label ?? ""} `)), K(e, i), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/nodes/GroupNode.svelte
function J_(e, t) {}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/portal.svelte.js
function Y_(e, t, n) {
	if (!n || !t) return;
	let r = n === "root" ? t : t.querySelector(`.svelte-flow__${n}`);
	r && r.appendChild(e);
}
function X_(e, t) {
	let n = /* @__PURE__ */ P(Tv), r = /* @__PURE__ */ P(() => H(n).domNode), i;
	return H(r) ? Y_(e, H(r), t) : i = Lr(() => {
		Pr(() => {
			Y_(e, H(r), t), i?.();
		});
	}), {
		async update(t) {
			Y_(e, H(r), t);
		},
		destroy() {
			e.parentNode && e.parentNode.removeChild(e), i?.();
		}
	};
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/portal/utils.svelte.js
function Z_() {
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
var Q_ = (e) => ph(e), $_ = (e) => fh(e);
function ev(e) {
	return e === void 0 ? void 0 : `${e}px`;
}
var tv = {
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
}, nv = /* @__PURE__ */ new Set([
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
]), rv = /* @__PURE__ */ G("<div><!></div>");
function iv(e, t) {
	bt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "selectEdgeOnClick", 3, !1), a = Q(t, "transparent", 3, !1), o = /* @__PURE__ */ xo(t, nv), s = Tv(), c = L_("EdgeLabel must be used within a Custom Edge component"), l = /* @__PURE__ */ P(() => s.visible.edges.get(c)?.zIndex);
	var u = rv(), d = () => {
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
		display: Z_().value ? "none" : void 0,
		cursor: i() ? "pointer" : void 0,
		transform: `translate(-50%, -50%) translate(${n() ?? ""}px,${r() ?? ""}px)`,
		"pointer-events": "all",
		width: ev(t.width),
		height: ev(t.height),
		"z-index": H(l)
	})], void 0, void 0, "svelte-1wg91mu"), Ea(L(u), () => t.children ?? C), N(u), Oa(u, (e, t) => X_?.(e, t), () => "edge-labels"), K(e, u), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/edges/BaseEdge.svelte
var av = /* @__PURE__ */ new Set([
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
]), ov = /* @__PURE__ */ oa("<path></path>"), sv = /* @__PURE__ */ oa("<path fill=\"none\"></path><!><!>", 1);
function cv(e, t) {
	let n = Q(t, "interactionWidth", 3, 20), r = /* @__PURE__ */ xo(t, av);
	var i = sv(), a = R(i), o = z(a), s = (e) => {
		var i = ov();
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
		iv(e, {
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
function lv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => pg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		curvature: t.pathOptions?.curvature
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	cv(e, {
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
function uv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => Eg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	cv(e, {
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
function dv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => bg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	cv(e, {
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
function fv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => Eg({
		sourceX: t.sourceX,
		sourceY: t.sourceY,
		targetX: t.targetX,
		targetY: t.targetY,
		sourcePosition: t.sourcePosition,
		targetPosition: t.targetPosition,
		borderRadius: 0
	})), r = /* @__PURE__ */ P(() => u(H(n), 3)), i = /* @__PURE__ */ P(() => H(r)[0]), a = /* @__PURE__ */ P(() => H(r)[1]), o = /* @__PURE__ */ P(() => H(r)[2]);
	cv(e, {
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
var pv = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = un(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, mv = /\(.+\)/, hv = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), gv = class extends pv {
	constructor(e, t) {
		let n = mv.test(e) || e.split(/[\s,]+/).some((e) => hv.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => Yi(r, "change", e));
	}
};
//#endregion
//#region node_modules/svelte/src/reactivity/index-client.js
dn();
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/visibleElements.js
function _v(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return vh(e, {
		x: 0,
		y: 0,
		width: n,
		height: r
	}, t, !0).forEach((e) => {
		i.set(e.id, e);
	}), i;
}
function vv(e) {
	let { edges: t, defaultEdgeOptions: n, nodeLookup: r, previousEdges: i, connectionMode: a, onerror: o, onlyRenderVisible: s, elevateEdgesOnSelect: c, zIndexMode: l } = e, u = /* @__PURE__ */ new Map();
	for (let d of t) {
		let t = r.get(d.source), f = r.get(d.target);
		if (!t || !f) continue;
		if (s) {
			let { visibleNodes: n, transform: r, width: i, height: a } = e;
			if (gg({
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
		let m = Og({
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
			zIndex: hg({
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
var yv = zh("Svelte Flow", "https://svelteflow.dev/"), bv = {
	input: G_,
	output: q_,
	default: U_,
	group: J_
}, xv = {
	straight: dv,
	smoothstep: uv,
	default: lv,
	step: fv
};
function Sv(e, t, n, r, i, a) {
	return t && !n && r && i ? Kh(_h(a, { filter: (e) => !!((e.width || e.initialWidth) && (e.height || e.initialHeight)) }), r, i, .5, 2, .1) : n ?? {
		x: 0,
		y: 0,
		zoom: 1
	};
}
function Cv(e) {
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
			let { nodesInitialized: t } = Hg(e.nodes, this.nodeLookup, this.parentLookup, {
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
		#c = /* @__PURE__ */ P(() => (Zg(this.connectionLookup, this.edgeLookup, e.edges), e.edges));
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
				u = _v(i, r, t, n), d = vv({
					...f,
					onlyRenderVisible: !0,
					visibleNodes: u,
					transform: r,
					width: t,
					height: n
				});
			} else u = this.nodeLookup, d = vv(f);
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
		#x = /* @__PURE__ */ P(() => e.props.nodeExtent ?? th);
		get nodeExtent() {
			return H(this.#x);
		}
		set nodeExtent(e) {
			I(this.#x, e);
		}
		#S = /* @__PURE__ */ P(() => e.props.translateExtent ?? th);
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
		#B = /* @__PURE__ */ P(() => e.props.selectionMode ?? oh.Partial);
		get selectionMode() {
			return H(this.#B);
		}
		set selectionMode(e) {
			I(this.#B, e);
		}
		#V = /* @__PURE__ */ P(() => ({
			...bv,
			...e.props.nodeTypes
		}));
		get nodeTypes() {
			return H(this.#V);
		}
		set nodeTypes(e) {
			I(this.#V, e);
		}
		#H = /* @__PURE__ */ P(() => ({
			...xv,
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
		#K = /* @__PURE__ */ P(() => Qh(e.props.ariaLabelConfig));
		get ariaLabelConfig() {
			return H(this.#K);
		}
		set ariaLabelConfig(e) {
			I(this.#K, e);
		}
		#q = /* @__PURE__ */ tr(Sv(this.nodesInitialized, e.props.fitView, e.props.initialViewport, this.width, this.height, this.nodeLookup));
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
		#J = /* @__PURE__ */ tr(sh);
		get _connection() {
			return H(this.#J);
		}
		set _connection(e) {
			I(this.#J, e);
		}
		#Y = /* @__PURE__ */ P(() => this._connection.inProgress ? {
			...this._connection,
			to: Vh(this._connection.to, [
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
		#X = /* @__PURE__ */ P(() => e.props.connectionMode ?? ih.Strict);
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
		#te = /* @__PURE__ */ P(() => Ng(e.edges, {
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
		#re = /* @__PURE__ */ P(() => e.props.onflowerror ?? yv);
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
			this.panZoom && (await xh({
				nodes: this.nodeLookup,
				width: this.width,
				height: this.height,
				panZoom: this.panZoom,
				minZoom: this.minZoom,
				maxZoom: this.maxZoom
			}, this.fitViewOptions), this.fitViewResolver?.resolve(!0), this.fitViewQueued = !1, this.fitViewOptions = void 0, this.fitViewResolver = null);
		};
		_prefersDark = new gv("(prefers-color-scheme: dark)", e.props.colorModeSSR === "dark");
		#xe = /* @__PURE__ */ P(() => e.props.colorMode === "system" ? this._prefersDark.current ? "dark" : "light" : e.props.colorMode ?? "light");
		get colorMode() {
			return H(this.#xe);
		}
		set colorMode(e) {
			I(this.#xe, e);
		}
		constructor() {}
		resetStoreValues() {
			this.dragging = !1, this.selectionRect = null, this.selectionRectMode = null, this.selectionKeyPressed = !1, this.multiselectionKeyPressed = !1, this.deleteKeyPressed = !1, this.panActivationKeyPressed = !1, this.zoomActivationKeyPressed = !1, this._connection = sh, this.clickConnectStartHandle = null, this.viewport = e.props.initialViewport ?? {
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
var wv = eh.error001("svelte");
function Tv() {
	let e = _t(Ev);
	if (!e) throw Error(wv);
	return e.getStore();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/store/index.js
var Ev = Symbol();
function Dv(e) {
	let t = Cv(e);
	function n(e) {
		t.nodeTypes = {
			...bv,
			...e
		};
	}
	function r(e) {
		t.edgeTypes = {
			...xv,
			...e
		};
	}
	function i(e) {
		t.edges = j_(e, t.edges, { onError: t.onerror });
	}
	let a = (e, n = !1) => {
		t.nodes = t.nodes.map((r) => {
			if (t.connection.inProgress && t.connection.fromNode.id === r.id) {
				let e = t.nodeLookup.get(r.id);
				e && (t.connection = {
					...t.connection,
					from: Ag(e, t.connection.fromHandle, uh.Left, !0)
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
		let { changes: n, updatedInternals: r } = Jg(e, t.nodeLookup, t.parentLookup, t.domNode, t.nodeOrigin, t.nodeExtent, t.zIndexMode);
		if (!r) return;
		zg(t.nodeLookup, t.parentLookup, {
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
			t.onerror("012", eh.error012(e));
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
			t.onerror("016", eh.error016(e));
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
			i && (t = Bh(t, i));
			let { position: n, positionAbsolute: a } = Sh({
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
		return Yg({
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
		t._connection = sh;
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
function Ov(e, t) {
	let { minZoom: n, maxZoom: r, initialViewport: i, onPanZoomStart: a, onPanZoom: o, onPanZoomEnd: s, translateExtent: c, setPanZoomInstance: l, onDraggingChange: u, onTransformChange: d } = t, f = O_({
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
var kv = /* @__PURE__ */ G("<div class=\"svelte-flow__zoom svelte-flow__container\"><!></div>");
function Av(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ P(() => n().panActivationKeyPressed || t.panOnDrag), i = /* @__PURE__ */ P(() => n().panActivationKeyPressed || t.panOnScroll), { viewport: a } = n(), o = !1;
	Pr(() => {
		!o && n().viewportInitialized && (t.oninit?.(), o = !0);
	});
	var s = kv();
	Ea(L(s), () => t.children), N(s), Oa(s, (e, t) => Ov?.(e, t), () => ({
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
function jv(e, t) {
	return (n) => {
		n.target === t && e?.(n);
	};
}
function Mv(e) {
	return (t) => {
		let n = e.has(t.id);
		return !!t.selected === n ? t : {
			...t,
			selected: n
		};
	};
}
function Nv(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
var Pv = /* @__PURE__ */ G("<div><!></div>");
function Fv(e, t) {
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
		let { x: c, y: l } = cg(e, s), u = Vh({
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
		}, i = Hh(r, [
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
		l = new Set(vh(n().nodeLookup, a, [
			n().viewport.x,
			n().viewport.y,
			n().viewport.zoom
		], n().selectionMode === oh.Partial, !0).map((e) => e.id));
		let c = n().defaultEdgeOptions.selectable ?? !0;
		u = /* @__PURE__ */ new Set();
		for (let e of l) {
			let t = n().connectionLookup.get(e);
			if (t) for (let { edgeId: e } of t.values()) {
				let t = n().edgeLookup.get(e);
				t && (t.selectable ?? c) && u.add(e);
			}
		}
		Nv(o, l) || n(n().nodes = n().nodes.map(Mv(l)), !0), Nv(s, u) || n(n().edges = n().edges.map(Mv(u)), !0), n(n().selectionRectMode = "user", !0), n(n().selectionRect = a, !0);
	}
	function b() {
		if (!a() || !s) return;
		let [e, t] = Oh(g, s, n().autoPanSpeed);
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
		let r = cg(e, s);
		g = {
			x: r.x,
			y: r.y
		};
		let a = Hh({
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
	var O = Pv();
	let k;
	var A = /* @__PURE__ */ P(() => H(p) ? void 0 : jv(D, o)), j = /* @__PURE__ */ P(() => jv(T, o));
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
var Iv = /* @__PURE__ */ G("<div class=\"svelte-flow__viewport xyflow__viewport svelte-flow__container\"><!></div>");
function Lv(e, t) {
	bt(t, !0);
	var n = Iv();
	let r;
	Ea(L(n), () => t.children), N(n), V(() => r = za(n, "", r, { transform: `translate(${t.store.viewport.x ?? ""}px, ${t.store.viewport.y ?? ""}px) scale(${t.store.viewport.zoom ?? ""})` })), K(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/actions/drag/index.js
function Rv(e, t) {
	let { store: n, onDrag: r, onDragStart: i, onDragStop: a, onNodeMouseDown: o } = t, s = r_({
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
var zv = /* @__PURE__ */ G("<div aria-live=\"assertive\" aria-atomic=\"true\" class=\"a11y-live-msg svelte-13pq11u\"> </div>"), Bv = /* @__PURE__ */ G("<div class=\"a11y-hidden svelte-13pq11u\"> </div> <div class=\"a11y-hidden svelte-13pq11u\"> </div> <!>", 1);
function Vv(e, t) {
	bt(t, !0);
	var n = Bv(), r = R(n), i = L(r, !0);
	N(r);
	var a = z(r, 2), o = L(a, !0);
	N(a);
	var s = z(a, 2), c = (e) => {
		var n = zv(), r = L(n, !0);
		N(n), V(() => {
			Z(n, "id", `${Wv}-${t.store.flowId}`), q(r, t.store.ariaLiveMessage);
		}), K(e, n);
	};
	J(s, (e) => {
		t.store.disableKeyboardA11y || e(c);
	}), V(() => {
		Z(r, "id", `${Hv}-${t.store.flowId}`), q(i, t.store.disableKeyboardA11y ? t.store.ariaLabelConfig["node.a11yDescription.default"] : t.store.ariaLabelConfig["node.a11yDescription.keyboardDisabled"]), Z(a, "id", `${Uv}-${t.store.flowId}`), q(o, t.store.ariaLabelConfig["edge.a11yDescription.default"]);
	}), K(e, n), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/A11yDescriptions/index.js
var Hv = "svelte-flow__node-desc", Uv = "svelte-flow__edge-desc", Wv = "svelte-flow__aria-live", Gv = /* @__PURE__ */ G("<div><!></div>");
function Kv(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = /* @__PURE__ */ P(() => l(t.node.data, () => ({}), !0)), i = /* @__PURE__ */ P(() => l(t.node.selected, !1)), a = /* @__PURE__ */ P(() => t.node.draggable), o = /* @__PURE__ */ P(() => t.node.selectable), s = /* @__PURE__ */ P(() => l(t.node.deletable, !0)), c = /* @__PURE__ */ P(() => t.node.connectable), u = /* @__PURE__ */ P(() => t.node.focusable), d = /* @__PURE__ */ P(() => l(t.node.hidden, !1)), f = /* @__PURE__ */ P(() => l(t.node.dragging, !1)), p = /* @__PURE__ */ P(() => l(t.node.style, "")), m = /* @__PURE__ */ P(() => t.node.class), h = /* @__PURE__ */ P(() => l(t.node.type, "default")), g = /* @__PURE__ */ P(() => t.node.parentId), _ = /* @__PURE__ */ P(() => t.node.sourcePosition), v = /* @__PURE__ */ P(() => t.node.targetPosition), y = /* @__PURE__ */ P(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).width), b = /* @__PURE__ */ P(() => l(t.node.measured, () => ({
		width: 0,
		height: 0
	}), !0).height), x = /* @__PURE__ */ P(() => t.node.initialWidth), S = /* @__PURE__ */ P(() => t.node.initialHeight), C = /* @__PURE__ */ P(() => t.node.width), w = /* @__PURE__ */ P(() => t.node.height), T = /* @__PURE__ */ P(() => t.node.dragHandle), E = /* @__PURE__ */ P(() => l(t.node.internals.z, 0)), D = /* @__PURE__ */ P(() => t.node.internals.positionAbsolute.x), O = /* @__PURE__ */ P(() => t.node.internals.positionAbsolute.y), k = /* @__PURE__ */ P(() => t.node.internals.userNode), { id: A } = t.node, j = /* @__PURE__ */ P(() => H(a) ?? n().nodesDraggable), ee = /* @__PURE__ */ P(() => H(o) ?? n().elementsSelectable), M = /* @__PURE__ */ P(() => H(c) ?? n().nodesConnectable), te = /* @__PURE__ */ P(() => Xh(t.node)), ne = /* @__PURE__ */ P(() => !!t.node.internals.handleBounds), re = /* @__PURE__ */ P(() => H(te) && H(ne)), ie = /* @__PURE__ */ P(() => H(u) ?? n().nodesFocusable);
	function ae(e) {
		return n().parentLookup.has(e);
	}
	let oe = /* @__PURE__ */ P(() => ae(A)), se = /* @__PURE__ */ tr(null), ce = null, le = H(h), ue = H(_), de = H(v), fe = /* @__PURE__ */ P(() => n().nodeTypes[H(h)] ?? U_), pe = /* @__PURE__ */ P(() => n().ariaLabelConfig);
	P_(A), I_({ get value() {
		return H(M);
	} });
	let me = /* @__PURE__ */ P(() => {
		let e = H(y) === void 0 ? H(C) ?? H(x) : H(C), t = H(b) === void 0 ? H(w) ?? H(S) : H(w);
		if (e !== void 0 || t !== void 0 || H(p) !== void 0) return `${H(p)};${e ? `width:${ev(e)};` : ""}${t ? `height:${ev(t)};` : ""}`;
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
		if (!(og(e) || n().disableKeyboardA11y)) {
			if (nh.includes(e.key) && H(ee)) {
				let t = e.key === "Escape";
				n().handleNodeSelection(A, t, H(se));
			} else H(j) && t.node.selected && Object.prototype.hasOwnProperty.call(tv, e.key) && (e.preventDefault(), n(n().ariaLiveMessage = H(pe)["node.a11yDescription.ariaLiveMessage"]({
				direction: e.key.replace("Arrow", "").toLowerCase(),
				x: ~~t.node.internals.positionAbsolute.x,
				y: ~~t.node.internals.positionAbsolute.y
			}), !0), n().moveSelectedNodes(tv[e.key], e.shiftKey ? 4 : 1));
		}
	}
	let _e = () => {
		if (n().disableKeyboardA11y || !n().autoPanOnNodeFocus || !H(se)?.matches(":focus-visible")) return;
		let { width: e, height: r, viewport: i } = n();
		vh(/* @__PURE__ */ new Map([[A, t.node]]), {
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
		var a = Gv();
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
			"aria-describedby": n().disableKeyboardA11y ? void 0 : `${Hv}-${n().flowId}`,
			...t.node.domAttributes,
			[Wa]: {
				dragging: H(f),
				selected: H(i),
				draggable: H(j),
				connectable: H(M),
				selectable: H(ee),
				nopan: H(j),
				parent: H(oe)
			},
			[Ga]: {
				"z-index": H(E),
				transform: `translate(${H(D) ?? ""}px, ${H(O) ?? ""}px)`,
				visibility: H(te) ? "visible" : "hidden"
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
					return H(M);
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
		}), N(a), Oa(a, (e, t) => Rv?.(e, t), () => ({
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
var qv = /* @__PURE__ */ G("<div class=\"svelte-flow__nodes\"></div>");
function Jv(e, t) {
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
	var i = qv();
	Y(i, 21, () => n().visible.nodes.values(), (e) => e.id, (e, i) => {
		Kv(e, {
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
var Yv = /* @__PURE__ */ oa("<svg class=\"svelte-flow__edge-wrapper\"><g><!></g></svg>");
function Xv(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ P(() => t.edge.id), r = /* @__PURE__ */ P(() => t.edge.source), i = /* @__PURE__ */ P(() => t.edge.target), a = /* @__PURE__ */ P(() => t.edge.sourceX), o = /* @__PURE__ */ P(() => t.edge.sourceY), s = /* @__PURE__ */ P(() => t.edge.targetX), c = /* @__PURE__ */ P(() => t.edge.targetY), u = /* @__PURE__ */ P(() => t.edge.sourcePosition), d = /* @__PURE__ */ P(() => t.edge.targetPosition), f = /* @__PURE__ */ P(() => l(t.edge.animated, !1)), p = /* @__PURE__ */ P(() => l(t.edge.selected, !1)), m = /* @__PURE__ */ P(() => t.edge.label), h = /* @__PURE__ */ P(() => t.edge.labelStyle), g = /* @__PURE__ */ P(() => l(t.edge.data, () => ({}), !0)), _ = /* @__PURE__ */ P(() => t.edge.style), v = /* @__PURE__ */ P(() => t.edge.interactionWidth), y = /* @__PURE__ */ P(() => l(t.edge.type, "default")), b = /* @__PURE__ */ P(() => t.edge.sourceHandle), x = /* @__PURE__ */ P(() => t.edge.targetHandle), S = /* @__PURE__ */ P(() => t.edge.markerStart), C = /* @__PURE__ */ P(() => t.edge.markerEnd), w = /* @__PURE__ */ P(() => t.edge.selectable), T = /* @__PURE__ */ P(() => t.edge.focusable), E = /* @__PURE__ */ P(() => l(t.edge.deletable, !0)), D = /* @__PURE__ */ P(() => t.edge.hidden), O = /* @__PURE__ */ P(() => t.edge.zIndex), k = /* @__PURE__ */ P(() => t.edge.class), A = /* @__PURE__ */ P(() => t.edge.ariaLabel);
	R_(H(n));
	let j = null, ee = /* @__PURE__ */ P(() => H(w) ?? t.store.elementsSelectable), M = /* @__PURE__ */ P(() => H(T) ?? t.store.edgesFocusable), te = /* @__PURE__ */ P(() => t.store.edgeTypes[H(y)] ?? lv), ne = /* @__PURE__ */ P(() => H(S) ? `url('#${Mg(H(S), t.store.flowId)}')` : void 0), re = /* @__PURE__ */ P(() => H(C) ? `url('#${Mg(H(C), t.store.flowId)}')` : void 0);
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
		if (!t.store.disableKeyboardA11y && nh.includes(e.key) && H(ee)) {
			let { unselectNodesAndEdges: r, addSelectedEdges: i } = t.store;
			e.key === "Escape" ? (j?.blur(), r({ edges: [t.edge] })) : i([H(n)]);
		}
	}
	var se = ca(), ce = R(se), le = (e) => {
		var l = Yv();
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
			"aria-describedby": H(M) ? `${Uv}-${t.store.flowId}` : void 0,
			role: t.edge.ariaRole ?? (H(M) ? "group" : "img"),
			"aria-roledescription": "edge",
			onkeydown: H(M) ? oe : void 0,
			tabindex: H(M) ? 0 : void 0,
			...t.edge.domAttributes,
			[Wa]: {
				animated: H(f),
				selected: H(p),
				selectable: H(ee)
			}
		})), Da(L(C), () => H(te), (e, t) => {
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
var Zv = /* @__PURE__ */ oa("<defs></defs>");
function Qv(e, t) {
	bt(t, !1);
	let n = Tv();
	vo();
	var r = Zv();
	Y(r, 5, () => n.markers, (e) => e.id, (e, t) => {
		ny(e, Co(() => H(t)));
	}), N(r), K(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/MarkerDefinition/Marker.svelte
var $v = /* @__PURE__ */ oa("<polyline class=\"arrow\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4\"></polyline>"), ey = /* @__PURE__ */ oa("<polyline class=\"arrowclosed\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"-5,-4 0,0 -5,4 -5,-4\"></polyline>"), ty = /* @__PURE__ */ oa("<marker class=\"svelte-flow__arrowhead\" viewBox=\"-10 -10 20 20\" refX=\"0\" refY=\"0\"><!></marker>");
function ny(e, t) {
	bt(t, !0);
	let n = Q(t, "width", 3, 12.5), r = Q(t, "height", 3, 12.5), i = Q(t, "markerUnits", 3, "strokeWidth"), a = Q(t, "orient", 3, "auto-start-reverse"), o = Q(t, "color", 3, "none");
	var s = ty(), c = L(s), l = (e) => {
		var n = $v();
		let r;
		V(() => {
			Z(n, "stroke-width", t.strokeWidth), r = za(n, "", r, { stroke: o() });
		}), K(e, n);
	}, u = (e) => {
		var n = ey();
		let r;
		V(() => {
			Z(n, "stroke-width", t.strokeWidth), r = za(n, "", r, {
				stroke: o(),
				fill: o()
			});
		}), K(e, n);
	};
	J(c, (e) => {
		t.type === lh.Arrow ? e(l) : t.type === lh.ArrowClosed && e(u, 1);
	}), N(s), V(() => {
		Z(s, "id", t.id), Z(s, "markerWidth", `${n()}`), Z(s, "markerHeight", `${r()}`), Z(s, "markerUnits", i()), Z(s, "orient", a());
	}), K(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/EdgeRenderer/EdgeRenderer.svelte
var ry = /* @__PURE__ */ G("<div class=\"svelte-flow__edges\"><svg class=\"svelte-flow__marker\"><!></svg> <!></div>");
function iy(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15);
	var r = ry(), i = L(r);
	Qv(L(i), {}), N(i), Y(z(i, 2), 17, () => n().visible.edges.values(), (e) => e.id, (e, r) => {
		Xv(e, {
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
var ay = /* @__PURE__ */ G("<div class=\"svelte-flow__selection svelte-1vr3gfi\"></div>");
function oy(e, t) {
	bt(t, !0);
	let n = Q(t, "x", 3, 0), r = Q(t, "y", 3, 0), i = Q(t, "width", 3, 0), a = Q(t, "height", 3, 0), o = Q(t, "isVisible", 3, !0);
	var s = ca(), c = R(s), l = (e) => {
		var t = ay();
		let o;
		V((e) => o = za(t, "", o, e), [() => ({
			width: typeof i() == "string" ? i() : ev(i()),
			height: typeof a() == "string" ? a() : ev(a()),
			transform: `translate(${n()}px, ${r()}px)`
		})]), K(e, t);
	};
	J(c, (e) => {
		o() && e(l);
	}), K(e, s), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/NodeSelection/NodeSelection.svelte
var sy = /* @__PURE__ */ G("<div><!></div>");
function cy(e, t) {
	bt(t, !0);
	let n = /* @__PURE__ */ tr(void 0);
	Pr(() => {
		t.store.disableKeyboardA11y || H(n)?.focus({ preventScroll: !0 });
	});
	let r = /* @__PURE__ */ P(() => {
		if (t.store.selectionRectMode === "nodes") {
			t.store.nodes;
			let e = _h(t.store.nodeLookup, { filter: (e) => !!e.selected });
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
		Object.prototype.hasOwnProperty.call(tv, e.key) && (e.preventDefault(), t.store.moveSelectedNodes(tv[e.key], e.shiftKey ? 4 : 1));
	}
	var s = ca(), c = R(s), l = (e) => {
		var s = sy();
		let c;
		oy(L(s), {
			width: "100%",
			height: "100%",
			x: 0,
			y: 0
		}), N(s), Oa(s, (e, t) => Rv?.(e, t), () => ({
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
			width: ev(H(r).width),
			height: ev(H(r).height),
			transform: `translate(${H(r).x ?? ""}px, ${H(r).y ?? ""}px)`
		})]), W("contextmenu", s, i), W("click", s, a), W("keydown", s, function(...e) {
			(t.store.disableKeyboardA11y ? void 0 : o)?.apply(this, e);
		}), K(e, s);
	}, u = /* @__PURE__ */ P(() => t.store.selectionRectMode === "nodes" && H(r) && Rh(H(r).x) && Rh(H(r).y));
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
function ly(e) {
	switch (e) {
		case "none": return 0;
		case "ctrl": return 8;
		case "shift": return 4;
		case "alt": return 2;
		case "meta": return 1;
	}
}
function uy(e, t) {
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
					for (let n of e) if ((Array.isArray(n) ? n : [n]).reduce((e, t) => e | ly(t), 0) === i) {
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
function dy() {
	let e = /* @__PURE__ */ P(Tv), t = (t) => {
		let n = Q_(t) ? t : H(e).nodeLookup.get(t.id), r = n.parentId ? Zh(n.position, n.measured, n.parentId, H(e).nodeLookup, H(e).nodeOrigin) : n.position;
		return Mh({
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
				return r?.replace && Q_(t) ? t : {
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
				return r.replace && $_(t) ? t : {
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
		getNodes: (t) => t === void 0 ? H(e).nodes : fy(H(e).nodeLookup, t),
		getEdge: (t) => H(e).edgeLookup.get(t),
		getEdges: (t) => t === void 0 ? H(e).edges : fy(H(e).edgeLookup, t),
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
			let r = Kh(t, H(e).width, H(e).height, H(e).minZoom, H(e).maxZoom, n?.padding ?? .1);
			return await H(e).panZoom.setViewport(r, {
				duration: n?.duration,
				ease: n?.ease,
				interpolate: n?.interpolate
			}), !0;
		},
		getIntersectingNodes: (n, r = !0, i) => {
			let a = Lh(n), o = a ? n : t(n);
			return o ? (i || H(e).nodes).filter((t) => {
				let i = H(e).nodeLookup.get(t.id);
				if (!i || !a && t.id === n.id) return !1;
				let s = Mh(i), c = Ih(s, o);
				return r && c > 0 || c >= s.width * s.height || c >= o.width * o.height;
			}) : [];
		},
		isNodeIntersecting: (e, n, r = !0) => {
			let i = Lh(e) ? e : t(e);
			if (!i) return !1;
			let a = Ih(i, n);
			return r && a > 0 || a >= n.width * n.height || a >= i.width * i.height;
		},
		deleteElements: async ({ nodes: t = [], edges: n = [] }) => {
			let { nodes: r, edges: i } = await Ch({
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
			return Vh({
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
			let { x: n, y: r, zoom: i } = H(e).viewport, { x: a, y: o } = H(e).domNode.getBoundingClientRect(), s = Hh(t, [
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
		getNodesBounds: (t) => gh(t, {
			nodeLookup: H(e).nodeLookup,
			nodeOrigin: H(e).nodeOrigin
		}),
		getHandleConnections: ({ type: t, id: n, nodeId: r }) => Array.from(H(e).connectionLookup.get(`${r}-${t}-${n ?? null}`)?.values() ?? [])
	};
}
function fy(e, t) {
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
function py(e, t) {
	bt(t, !0);
	let n = Q(t, "store", 15), r = Q(t, "selectionKey", 3, "Shift"), i = Q(t, "multiSelectionKey", 19, () => qh() ? "Meta" : "Control"), a = Q(t, "deleteKey", 3, "Backspace"), o = Q(t, "panActivationKey", 3, " "), s = Q(t, "zoomActivationKey", 19, () => qh() ? "Meta" : "Control"), { deleteElements: c } = dy();
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
	Xi("blur", Cr, p), Xi("contextmenu", Cr, p), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(r(), () => n(n().selectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(i(), () => {
			n(n().multiselectionKeyPressed = !0, !0);
		}),
		type: "keydown"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(i(), () => n(n().multiselectionKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(a(), (e) => {
			!(e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) && !og(e.originalEvent) && (n(n().deleteKeyPressed = !0, !0), m());
		}),
		type: "keydown"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(a(), () => n(n().deleteKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(o(), () => n(n().panActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !0, !0)),
		type: "keydown"
	})), Oa(Cr, (e, t) => uy?.(e, t), () => ({
		trigger: f(s(), () => n(n().zoomActivationKeyPressed = !1, !0)),
		type: "keyup"
	})), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/components/ConnectionLine/ConnectionLine.svelte
var my = /* @__PURE__ */ oa("<path fill=\"none\" class=\"svelte-flow__connection-path\"></path>"), hy = /* @__PURE__ */ oa("<svg class=\"svelte-flow__connectionline\"><g><!></g></svg>");
function gy(e, t) {
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
			case ch.Bezier: {
				let [t] = pg(e);
				return t;
			}
			case ch.Straight: {
				let [t] = bg(e);
				return t;
			}
			case ch.Step:
			case ch.SmoothStep: {
				let [n] = Eg({
					...e,
					borderRadius: t.type === ch.Step ? 0 : void 0
				});
				return n;
			}
		}
	});
	var r = ca(), i = R(r), a = (e) => {
		var r = hy(), i = L(r), a = L(i), o = (e) => {
			var n = ca();
			Da(R(n), () => t.LineComponent, (e, t) => {
				t(e, {});
			}), K(e, n);
		}, s = (e) => {
			var r = my();
			V(() => {
				Z(r, "d", H(n)), za(r, t.style);
			}), K(e, r);
		};
		J(a, (e) => {
			t.LineComponent ? e(o) : e(s, -1);
		}), N(i), N(r), V((e) => {
			Z(r, "width", t.store.width), Z(r, "height", t.store.height), za(r, t.containerStyle), X(i, 0, e);
		}, [() => Ma(["svelte-flow__connection", tg(t.store.connection.isValid)])]), K(e, r);
	};
	J(i, (e) => {
		t.store.connection.inProgress && e(a);
	}), K(e, r), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/Panel/Panel.svelte
var _y = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"position",
	"style",
	"class",
	"children"
]), vy = /* @__PURE__ */ G("<div><!></div>");
function yy(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "top-right"), r = /* @__PURE__ */ xo(t, _y), i = /* @__PURE__ */ P(() => `${n()}`.split("-"));
	var a = vy();
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
var by = /* @__PURE__ */ G("<a target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Svelte Flow attribution\">Svelte Flow</a>");
function xy(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = "https://svelteflow.dev?utm_source=attribution";
	Pr(() => {});
	var i = ca(), a = R(i), o = (e) => {
		{
			let t = /* @__PURE__ */ P(() => `Please only hide this attribution when you are subscribed to Svelte Flow Pro: ${r}`);
			yy(e, {
				get position() {
					return n();
				},
				class: "svelte-flow__attribution",
				get "data-message"() {
					return H(t);
				},
				children: (e, t) => {
					var n = by();
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
var Sy = /* @__PURE__ */ G("<div><!></div>");
function Cy(e, t) {
	bt(t, !0);
	let n = Q(t, "domNode", 15), r = Q(t, "clientWidth", 15), i = Q(t, "clientHeight", 15), a = /* @__PURE__ */ P(() => t.rest.class), o = /* @__PURE__ */ P(() => d(t.rest, /* @__PURE__ */ "id.class.nodeTypes.edgeTypes.colorMode.isValidConnection.onmove.onmovestart.onmoveend.onflowerror.ondelete.onbeforedelete.onbeforeconnect.onconnect.onconnectstart.onconnectend.onbeforereconnect.onreconnect.onreconnectstart.onreconnectend.onclickconnectstart.onclickconnectend.oninit.onselectionchange.onselectiondragstart.onselectiondrag.onselectiondragstop.onselectionstart.onselectionend.clickConnect.fitView.fitViewOptions.nodeOrigin.nodeDragThreshold.connectionDragThreshold.minZoom.maxZoom.initialViewport.connectionRadius.connectionMode.selectionMode.selectNodesOnDrag.snapGrid.defaultMarkerColor.translateExtent.nodeExtent.onlyRenderVisibleElements.autoPanOnConnect.autoPanOnNodeDrag.colorModeSSR.defaultEdgeOptions.elevateNodesOnSelect.elevateEdgesOnSelect.nodesDraggable.autoPanOnNodeFocus.nodesConnectable.elementsSelectable.nodesFocusable.edgesFocusable.disableKeyboardA11y.noDragClass.noPanClass.noWheelClass.ariaLabelConfig.autoPanSpeed.panOnScrollSpeed.zIndexMode.autoPanOnSelection".split(".")));
	function s(e) {
		e.currentTarget.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto"
		}), t.rest.onscroll && t.rest.onscroll(e);
	}
	var c = Sy();
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
		width: ev(t.width),
		height: ev(t.height)
	})], void 0, void 0, "svelte-mkap6j"), Ea(L(c), () => t.children ?? C), N(c), ho(c, (e) => n(e), () => n()), po(c, "clientHeight", i), po(c, "clientWidth", r), K(e, c), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/container/SvelteFlow/SvelteFlow.svelte
var wy = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.width.height.proOptions.selectionKey.deleteKey.panActivationKey.multiSelectionKey.zoomActivationKey.paneClickDistance.nodeClickDistance.onmovestart.onmoveend.onmove.oninit.onnodeclick.onnodecontextmenu.onnodedrag.onnodedragstart.onnodedragstop.onnodepointerenter.onnodepointermove.onnodepointerleave.onselectionclick.onselectioncontextmenu.onselectionstart.onselectionend.onedgeclick.onedgecontextmenu.onedgepointerenter.onedgepointerleave.onpaneclick.onpanecontextmenu.panOnScrollMode.preventScrolling.zoomOnScroll.zoomOnDoubleClick.zoomOnPinch.panOnScroll.panOnScrollSpeed.panOnDrag.selectionOnDrag.autoPanOnSelection.connectionLineComponent.connectionLineStyle.connectionLineContainerStyle.connectionLineType.attributionPosition.children.nodes.edges.viewport".split(".")), Ty = /* @__PURE__ */ G("<div class=\"svelte-flow__viewport-back svelte-flow__container\"></div> <!> <div class=\"svelte-flow__edge-labels svelte-flow__container\"></div> <!> <!> <!> <div class=\"svelte-flow__viewport-front svelte-flow__container\"></div>", 1), Ey = /* @__PURE__ */ G("<!> <!>", 1), Dy = /* @__PURE__ */ G("<!> <!> <!> <!> <!>", 1);
function Oy(e, t) {
	bt(t, !0);
	let n = Q(t, "paneClickDistance", 3, 1), r = Q(t, "nodeClickDistance", 3, 1), i = Q(t, "panOnScrollMode", 19, () => ah.Free), a = Q(t, "preventScrolling", 3, !0), o = Q(t, "zoomOnScroll", 3, !0), s = Q(t, "zoomOnDoubleClick", 3, !0), c = Q(t, "zoomOnPinch", 3, !0), l = Q(t, "panOnScroll", 3, !1), u = Q(t, "panOnScrollSpeed", 3, .5), d = Q(t, "panOnDrag", 3, !0), f = Q(t, "selectionOnDrag", 3, !1), p = Q(t, "autoPanOnSelection", 3, !0), m = Q(t, "connectionLineType", 19, () => ch.Bezier), h = Q(t, "nodes", 31, () => ur([])), g = Q(t, "edges", 31, () => ur([])), _ = Q(t, "viewport", 15, void 0), v = /* @__PURE__ */ xo(t, wy), y = Dv({
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
	}), b = _t(Ev);
	b && b.setStore && b.setStore(y), vt(Ev, {
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
	}), Cy(e, {
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
			var g = Dy(), _ = R(g);
			py(_, {
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
			Av(v, {
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
					Fv(e, {
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
							var i = Ey(), a = R(i);
							Lv(a, {
								get store() {
									return y;
								},
								set store(e) {
									y = e;
								},
								children: (e, n) => {
									var i = Ty(), a = z(R(i), 2);
									iy(a, {
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
									gy(o, {
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
									Jv(s, {
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
									}), cy(z(s, 2), {
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
								oy(o, {
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
			xy(b, {
				get proOptions() {
					return t.proOptions;
				},
				get position() {
					return t.attributionPosition;
				}
			});
			var x = z(b, 2);
			Vv(x, { get store() {
				return y;
			} }), Ea(z(x, 2), () => t.children ?? C), K(e, g);
		},
		$$slots: { default: !0 }
	}), xt();
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/ControlButton.svelte
var ky = /* @__PURE__ */ new Set([
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
]), Ay = /* @__PURE__ */ G("<button><!></button>");
function jy(e, t) {
	let n = /* @__PURE__ */ xo(t, ky);
	var r = Ay();
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
var My = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z\"></path></svg>");
function Ny(e) {
	K(e, My());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Minus.svelte
var Py = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 5\"><path d=\"M0 0h32v4.2H0z\"></path></svg>");
function Fy(e) {
	K(e, Py());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Fit.svelte
var Iy = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 30\"><path d=\"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z\"></path></svg>");
function Ly(e) {
	K(e, Iy());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Lock.svelte
var Ry = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z\"></path></svg>");
function zy(e) {
	K(e, Ry());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Icons/Unlock.svelte
var By = /* @__PURE__ */ oa("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 32\"><path d=\"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z\"></path></svg>");
function Vy(e) {
	K(e, By());
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Controls/Controls.svelte
var Hy = /* @__PURE__ */ new Set([
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
]), Uy = /* @__PURE__ */ G("<!> <!>", 1), Wy = /* @__PURE__ */ G("<!> <!> <!> <!> <!> <!>", 1);
function Gy(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-left"), r = Q(t, "orientation", 3, "vertical"), i = Q(t, "showZoom", 3, !0), a = Q(t, "showFitView", 3, !0), o = Q(t, "showLock", 3, !0), s = /* @__PURE__ */ xo(t, Hy), c = /* @__PURE__ */ P(Tv), l = /* @__PURE__ */ P(() => ({
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
		yy(e, Co({
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
				var r = Wy(), s = R(r), c = (e) => {
					var n = ca();
					Ea(R(n), () => t.before), K(e, n);
				};
				J(s, (e) => {
					t.before && e(c);
				});
				var m = z(s, 2), y = (e) => {
					var t = Uy(), n = R(t);
					jy(n, Co({
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
							Ny(e, {});
						},
						$$slots: { default: !0 }
					})), jy(z(n, 2), Co({
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
							Fy(e, {});
						},
						$$slots: { default: !0 }
					})), K(e, t);
				};
				J(m, (e) => {
					i() && e(y);
				});
				var b = z(m, 2), x = (e) => {
					jy(e, Co({
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
							Ly(e, {});
						},
						$$slots: { default: !0 }
					}));
				};
				J(b, (e) => {
					a() && e(x);
				});
				var S = z(b, 2), C = (e) => {
					jy(e, Co({
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
								Vy(e, {});
							}, a = (e) => {
								zy(e, {});
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
var Ky;
(function(e) {
	e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ky ||= {});
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Background/DotPattern.svelte
var qy = /* @__PURE__ */ oa("<circle></circle>");
function Jy(e, t) {
	var n = qy();
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
var Yy = /* @__PURE__ */ oa("<path></path>");
function Xy(e, t) {
	bt(t, !0);
	var n = Yy();
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
var Zy = {
	[Ky.Dots]: 1,
	[Ky.Lines]: 1,
	[Ky.Cross]: 6
}, Qy = /* @__PURE__ */ oa("<svg data-testid=\"svelte-flow__background\"><pattern patternUnits=\"userSpaceOnUse\"><!></pattern><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"></rect></svg>");
function $y(e, t) {
	bt(t, !0);
	let n = Q(t, "variant", 19, () => Ky.Dots), r = Q(t, "gap", 3, 20), i = Q(t, "lineWidth", 3, 1), a = /* @__PURE__ */ P(Tv), o = /* @__PURE__ */ P(() => n() === Ky.Dots), s = /* @__PURE__ */ P(() => n() === Ky.Cross), c = /* @__PURE__ */ P(() => Array.isArray(r()) ? r() : [r(), r()]), l = /* @__PURE__ */ P(() => `background-pattern-${H(a).flowId}-${t.id ?? ""}`), u = /* @__PURE__ */ P(() => [H(c)[0] * H(a).viewport.zoom || 1, H(c)[1] * H(a).viewport.zoom || 1]), d = /* @__PURE__ */ P(() => (t.size ?? Zy[n()]) * H(a).viewport.zoom), f = /* @__PURE__ */ P(() => H(s) ? [H(d), H(d)] : H(u)), p = /* @__PURE__ */ P(() => H(o) ? [H(d) / 2, H(d) / 2] : [H(f)[0] / 2, H(f)[1] / 2]);
	var m = Qy();
	let h;
	var g = L(m), _ = L(g), v = (e) => {
		{
			let n = /* @__PURE__ */ P(() => H(d) / 2);
			Jy(e, {
				get radius() {
					return H(n);
				},
				get class() {
					return t.patternClass;
				}
			});
		}
	}, y = (e) => {
		Xy(e, {
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
function eb(e) {
	let t = /* @__PURE__ */ P(Tv), n = /* @__PURE__ */ P(() => H(t).nodeLookup), r = /* @__PURE__ */ P(() => H(t).nodes), i = /* @__PURE__ */ P(() => (H(r), H(n).get(e)));
	return { get current() {
		return H(i);
	} };
}
//#endregion
//#region node_modules/@xyflow/svelte/dist/lib/plugins/Minimap/MinimapNode.svelte
var tb = /* @__PURE__ */ oa("<rect></rect>");
function nb(e, t) {
	bt(t, !0);
	let n = Q(t, "borderRadius", 3, 5), r = Q(t, "strokeWidth", 3, 2), i = /* @__PURE__ */ P(() => eb(t.id)), a = /* @__PURE__ */ P(() => {
		if (!H(i).current) return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		let { width: e, height: n } = Yh(H(i).current);
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
		var i = tb();
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
function rb(e, t) {
	let n = m_({
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
var ib = (e) => e instanceof Function ? e : () => e, ab = /* @__PURE__ */ new Set([
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
]), ob = /* @__PURE__ */ oa("<title> </title>"), sb = /* @__PURE__ */ oa("<svg class=\"svelte-flow__minimap-svg\" role=\"img\"><!><!><path class=\"svelte-flow__minimap-mask\" fill-rule=\"evenodd\" pointer-events=\"none\"></path></svg>"), cb = /* @__PURE__ */ G("<svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper>", 1);
function lb(e, t) {
	bt(t, !0);
	let n = Q(t, "position", 3, "bottom-right"), r = Q(t, "nodeStrokeColor", 3, "transparent"), i = Q(t, "nodeClass", 3, ""), a = Q(t, "nodeBorderRadius", 3, 5), o = Q(t, "nodeStrokeWidth", 3, 2), s = Q(t, "width", 3, 200), c = Q(t, "height", 3, 150), l = Q(t, "pannable", 3, !0), u = Q(t, "zoomable", 3, !0), d = /* @__PURE__ */ xo(t, ab), f = /* @__PURE__ */ P(Tv), p = /* @__PURE__ */ P(() => H(f).ariaLabelConfig), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision", h = /* @__PURE__ */ P(() => `svelte-flow__minimap-desc-${H(f).flowId}`), g = /* @__PURE__ */ P(() => ({
		x: -H(f).viewport.x / H(f).viewport.zoom,
		y: -H(f).viewport.y / H(f).viewport.zoom,
		width: H(f).width / H(f).viewport.zoom,
		height: H(f).height / H(f).viewport.zoom
	})), _ = /* @__PURE__ */ P(() => H(f).nodes.some((e) => !e.hidden)), v = /* @__PURE__ */ P(() => H(_) ? Ph(_h(H(f).nodeLookup, { filter: (e) => !e.hidden }), H(g)) : H(g)), y = /* @__PURE__ */ P(() => H(v).width / s()), b = /* @__PURE__ */ P(() => H(v).height / c()), x = /* @__PURE__ */ P(() => Math.max(H(y), H(b))), S = /* @__PURE__ */ P(() => H(x) * s()), C = /* @__PURE__ */ P(() => H(x) * c()), w = /* @__PURE__ */ P(() => 5 * H(x)), T = /* @__PURE__ */ P(() => H(v).x - (H(S) - H(v).width) / 2 - H(w)), E = /* @__PURE__ */ P(() => H(v).y - (H(C) - H(v).height) / 2 - H(w)), D = /* @__PURE__ */ P(() => H(S) + H(w) * 2), O = /* @__PURE__ */ P(() => H(C) + H(w) * 2), k = () => H(x);
	var A = cb(), j = R(A);
	{
		let e = /* @__PURE__ */ P(() => ["svelte-flow__minimap", t.class]);
		ga(j, () => ({ "--xy-minimap-background-color-props": t.bgColor })), yy(j.lastChild, Co({
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
					var n = sb();
					let d;
					var _ = L(n), v = (e) => {
						var n = ob(), r = L(n, !0);
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
								let c = /* @__PURE__ */ P(() => t.nodeColor === void 0 ? void 0 : ib(t.nodeColor)(H(n))), l = /* @__PURE__ */ P(() => ib(r())(H(n))), u = /* @__PURE__ */ P(() => ib(i())(H(n)));
								nb(e, {
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
						}, d = /* @__PURE__ */ P(() => H(s) && Xh(H(s)) && !H(s).hidden);
						J(l, (e) => {
							H(d) && e(u);
						}), K(e, c);
					});
					var b = z(y);
					N(n), Oa(n, (e, t) => rb?.(e, t), () => ({
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
var ub = /* @__PURE__ */ G("<button class=\"outline-button compact\">Load older history</button>"), db = /* @__PURE__ */ G("<button class=\"outline-button compact\">Retry</button>"), fb = /* @__PURE__ */ G("<div class=\"history-load-status\" aria-live=\"polite\"><span> </span> <!> <!></div>"), pb = /* @__PURE__ */ G("<div class=\"wave-aggregate-strip\" aria-label=\"Current multi-lane wave aggregate\"><span><b>WAVE AGGREGATE</b><strong> </strong></span> <span><b>FIXED MEMBERS</b><strong> </strong></span> <span><b>ACCOUNTED</b><strong> </strong></span> <span><b>ACTIVE</b><strong> </strong></span> <i>PROJECTION ONLY</i></div>"), mb = /* @__PURE__ */ G("<article><div><b> </b><span> </span></div> <strong> </strong> <p> </p> <small> </small></article>"), hb = /* @__PURE__ */ G("<details class=\"wave-repair-plan\" aria-label=\"Historical wave projection diagnosis\"><summary><span><b>ACCOUNTING GAP</b><strong> </strong></span> <i> </i></summary> <div class=\"wave-repair-body\"><p> </p> <!> <footer><b>NO WRITE AUTHORITY</b><span>This diagnosis cannot sync state, reconcile custody, revive a worker, dispatch a lane, or change campaign phase.</span></footer></div></details>"), gb = /* @__PURE__ */ G("<div class=\"replay-toolbar\" aria-label=\"Campaign replay controls\"><div class=\"replay-buttons\"><button aria-label=\"First milestone\">↤</button> <button aria-label=\"Previous milestone\">←</button> <button class=\"replay-play\"> </button> <button aria-label=\"Next milestone\">→</button> <button aria-label=\"Latest milestone\">↦</button></div> <label class=\"replay-scrubber\"><span> </span><input type=\"range\" min=\"0\" aria-label=\"Replay position\"/></label> <div class=\"replay-now\"><strong> </strong><span> </span></div></div>"), _b = /* @__PURE__ */ G("<button> </button>"), vb = /* @__PURE__ */ G("<div class=\"history-filters\" aria-label=\"History filters\"></div>"), yb = /* @__PURE__ */ G("<p> </p>"), bb = /* @__PURE__ */ G("<p class=\"program-history-message\">Building the durable hierarchy…</p>"), xb = /* @__PURE__ */ G("<div class=\"program-history-message error\"><span> </span><button class=\"outline-button compact\">Retry</button></div>"), Sb = /* @__PURE__ */ G("<p class=\"program-history-message\">No strategy epochs have been recorded for this project.</p>"), Cb = /* @__PURE__ */ G("<p>No baseline snapshot is available for this historical epoch.</p>"), wb = /* @__PURE__ */ G("<div class=\"boundary-row\" role=\"row\"><span><small> </small><strong> </strong></span><code> </code><code> </code></div>"), Tb = /* @__PURE__ */ G("<div class=\"boundary-table\" role=\"table\" aria-label=\"Changed boundary values\"><div class=\"boundary-row heading\" role=\"row\"><span>GROUP / FIELD</span><span>START</span><span>END</span></div> <!></div>"), Eb = /* @__PURE__ */ G("<li><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></li>"), Db = /* @__PURE__ */ G("<ol class=\"program-lanes\"></ol>"), Ob = /* @__PURE__ */ G("<p>No durable research runs are attached to this wave.</p>"), kb = /* @__PURE__ */ G("<ol class=\"program-custody\"></ol>"), Ab = /* @__PURE__ */ G("<details class=\"program-wave\"><summary><span><small> </small><strong> </strong></span><span><b> </b><small> </small></span></summary> <div class=\"program-wave-body\"><!> <!></div></details>"), jb = /* @__PURE__ */ G("<p class=\"program-history-message\">No waves are assigned to this epoch.</p>"), Mb = /* @__PURE__ */ G("<details class=\"program-epoch\"><summary><span><small> </small><strong> </strong></span> <span><b> </b><small> </small></span></summary> <div class=\"program-epoch-body\"><section class=\"epoch-boundary\"><header><span><small>START / END COMPARISON</small><strong> </strong></span><b> </b></header> <!></section> <div class=\"program-waves\"><!> <!></div></div></details>"), Nb = /* @__PURE__ */ G("<div class=\"program-epochs\"></div> <footer> </footer>", 1), Pb = /* @__PURE__ */ G("<section class=\"program-history\" aria-label=\"Program history hierarchy\"><header><div><span>PROGRAM HISTORY · READ ONLY</span><strong>Epoch → wave → lane and custody</strong></div> <!></header> <!></section>"), Fb = /* @__PURE__ */ G("<i aria-hidden=\"true\"></i>"), Ib = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button> <!>", 1), Lb = /* @__PURE__ */ G("<button><span> </span><strong> </strong><small> </small></button>"), Rb = /* @__PURE__ */ G("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><button aria-label=\"Close step details\">×</button></div> <p> </p> <details open=\"\"><summary>Authority boundary</summary><p>Moving through this stop requires the durable gate shown on the line. Observed files or worker activity cannot advance it.</p></details></aside>"), zb = /* @__PURE__ */ G("<div class=\"flow-inspector empty\">Select a stop or branch to inspect what enters it and which gate controls the next move.</div>"), Bb = /* @__PURE__ */ G("<div class=\"campaign-map-layout journey-layout\"><div class=\"journey-board\" aria-label=\"Linear branching campaign workflow\"><div class=\"journey-line\"></div> <div class=\"journey-branches\" aria-label=\"Supporting research branches\"></div> <footer><b> </b><span> </span></footer></div> <!></div>"), Vb = /* @__PURE__ */ G("<!> <!> <!>", 1), Hb = /* @__PURE__ */ G("<button aria-label=\"Close step details\">×</button>"), Ub = /* @__PURE__ */ G("<details open=\"\"><summary>Recorded payload</summary><pre> </pre></details>"), Wb = /* @__PURE__ */ G("<li><span> </span><strong> </strong></li>"), Gb = /* @__PURE__ */ G("<details><summary>Related substeps <strong> </strong></summary><ol></ol></details>"), Kb = /* @__PURE__ */ G("<aside class=\"flow-inspector\"><div class=\"flow-inspector-heading\"><div><span> </span><strong> </strong></div><!></div> <p> </p> <!> <!></aside>"), qb = /* @__PURE__ */ G("<div class=\"flow-inspector empty\">Select a recorded milestone to inspect its durable payload and related substeps.</div>"), Jb = /* @__PURE__ */ G("<div class=\"campaign-map-layout\"><div class=\"campaign-flow-canvas\"><!></div> <!></div>"), Yb = /* @__PURE__ */ G("<section><div class=\"campaign-map-heading\"><div><p>CAMPAIGN LINE</p><h2>One main route, with deliberate research branches</h2><span> </span></div> <div class=\"campaign-map-tabs\"><button>Workflow</button> <button>Replay</button> <button>History</button></div></div> <!> <!> <!> <!> <!> <!></section>");
function Xb(e, t) {
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
	}), w = /* @__PURE__ */ F([]), T = /* @__PURE__ */ F(0), E = /* @__PURE__ */ F(null), D = /* @__PURE__ */ F(!1), O = null, k = /* @__PURE__ */ F(""), A = /* @__PURE__ */ F(""), j = /* @__PURE__ */ F([]), ee = 0, M = /* @__PURE__ */ F(null), te = /* @__PURE__ */ F(!1), ne = /* @__PURE__ */ F(""), re = 0, ie = /* @__PURE__ */ F(""), ae = /* @__PURE__ */ F(null), oe = /* @__PURE__ */ F(""), se = /* @__PURE__ */ F(!1), ce = /* @__PURE__ */ F(""), le = 0;
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
						type: lh.ArrowClosed,
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
		if (H(te) || t && !H(M)) return;
		let n = ++re, r = t && ye(e).filter(fe)[H(T)]?.id || "";
		(!t || H(A) !== e.id) && (I(A, e.id), I(j, []), I(M, null), ee = Number(e.workflowHistorySummary?.total || 0)), I(te, !0), I(ne, "");
		try {
			let i = new URL("/api/workflow-history", location.origin);
			i.searchParams.set("project", e.id), i.searchParams.set("limit", "250"), t && H(M) && i.searchParams.set("cursor", H(M));
			let a = await fetch(`${i.pathname}${i.search}`, { cache: "no-store" }), o = await a.json();
			if (!a.ok) throw Error(o.error || `Could not load campaign history: ${a.status}`);
			if (n !== re || H(g)?.id !== e.id) return;
			let s = t ? [...o.items, ...H(j)] : o.items;
			I(j, [...new Map(s.map((e) => [e.id, e])).values()]), ee = o.total, I(M, o.nextCursor);
			let c = H(j).filter(fe);
			t && r ? I(T, Math.max(0, c.findIndex((e) => e.id === r))) : t || I(T, Math.max(0, c.length - 1));
		} catch (e) {
			n === re && I(ne, e instanceof Error ? e.message : String(e));
		} finally {
			n === re && I(te, !1);
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
					type: lh.ArrowClosed,
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
	}), B(() => (H(A), H(j), H(M), H(v), H(S)), () => {
		I(ie, `${H(A)}:${H(j).length}:${H(M) || ""}:${H(v)}:${H(S)}`);
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
		var t = Yb(), n = L(t), r = L(n), i = z(L(r), 2), l = L(i, !0);
		N(i), N(r);
		var u = z(r, 2), p = L(u);
		let m;
		var x = z(p, 2);
		let O;
		var k = z(x, 2);
		let A;
		N(u), N(n);
		var j = z(n, 2), ee = (e) => {
			var t = fb(), n = L(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = ub();
				W("click", t, () => xe(H(g), !0)), K(e, t);
			};
			J(i, (e) => {
				H(M) && !H(te) && e(a);
			});
			var o = z(i, 2), s = (e) => {
				var t = db();
				W("click", t, () => xe(H(g))), K(e, t);
			};
			J(o, (e) => {
				H(ne) && !H(te) && e(s);
			}), N(t), V((e) => q(r, e), [() => (H(te), H(ne), H(g), U(() => H(te) ? "Loading durable history…" : H(ne) || `${ye(H(g)).length} of ${be(H(g))} events loaded`))]), K(e, t);
		};
		J(j, (e) => {
			H(_) !== "workflow" && (H(te) || H(ne) || H(M)) && e(ee);
		});
		var re = z(j, 2), ie = (e) => {
			var t = pb(), n = L(t), r = z(L(n)), i = L(r, !0);
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
			var t = hb(), n = L(t), r = L(n), i = z(L(r)), o = L(i);
			N(i), N(r);
			var s = z(r, 2), c = L(s, !0);
			N(s), N(n);
			var l = z(n, 2), u = L(l), d = L(u, !0);
			N(u), Y(z(u, 2), 1, () => (H(a), U(() => H(a).repairPlan.items)), (e) => e.laneId, (e, t) => {
				var n = mb(), r = L(n), i = L(r), a = L(i, !0);
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
			var t = gb(), n = L(t), r = L(n), i = z(r, 2), a = z(i, 2), o = L(a, !0);
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
			var t = vb();
			Y(t, 5, () => h, _a, (e, t) => {
				var n = _b();
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
			var t = Pb(), n = L(t), r = z(L(n), 2), i = (e) => {
				var t = yb(), n = L(t);
				N(t), V(() => q(n, `${H(ae), U(() => H(ae).counts.epochs) ?? ""} epochs · ${H(ae), U(() => H(ae).counts.waves) ?? ""} waves · ${H(ae), U(() => H(ae).counts.lanes) ?? ""} lanes · ${H(ae), U(() => H(ae).counts.custody) ?? ""} custody`)), K(e, t);
			};
			J(r, (e) => {
				H(ae) && e(i);
			}), N(n);
			var a = z(n, 2), o = (e) => {
				K(e, bb());
			}, s = (e) => {
				var t = xb(), n = L(t), r = L(n, !0);
				N(n);
				var i = z(n);
				N(t), V(() => q(r, H(ce))), W("click", i, () => Se(H(g))), K(e, t);
			}, c = (e) => {
				K(e, Sb());
			}, l = (e) => {
				var t = Nb(), n = R(t);
				Y(n, 7, () => (H(ae), U(() => H(ae).epochs)), (e) => e.id, (e, t, n) => {
					var r = Mb(), i = L(r), a = L(i), o = L(a), s = L(o);
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
						K(e, Cb());
					}, T = (e) => {
						var n = yb(), r = L(n, !0);
						N(n), V(() => q(r, (H(t), U(() => H(t).boundary.complete ? "The recorded boundary values are unchanged." : "Only the current baseline is available; no completed end boundary has been recorded.")))), K(e, n);
					}, E = /* @__PURE__ */ P(() => (H(t), U(() => !Ce(H(t)).length))), D = (e) => {
						var n = Tb();
						Y(z(L(n), 2), 1, () => (H(t), U(() => Ce(H(t)))), (e) => `${e.group}:${e.item.key}`, (e, t) => {
							var n = wb(), r = L(n), i = L(r), a = L(i, !0);
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
						var n = Ab(), r = L(n), i = L(r), a = L(i), o = L(a);
						N(a);
						var s = z(a), c = L(s, !0);
						N(s), N(i);
						var l = z(i), u = L(l), d = L(u, !0);
						N(u);
						var f = z(u), p = L(f);
						N(f), N(l), N(r);
						var m = z(r, 2), h = L(m), g = (e) => {
							var n = Db();
							Y(n, 5, () => (H(t), U(() => H(t).lanes)), (e) => e.id, (e, t) => {
								var n = Eb(), r = L(n), i = L(r), a = L(i, !0);
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
							K(e, Ob());
						};
						J(h, (e) => {
							H(t), U(() => H(t).lanes.length) ? e(g) : e(_, -1);
						});
						var v = z(h, 2), y = (e) => {
							var n = kb();
							Y(n, 5, () => (H(t), U(() => H(t).custody)), (e) => e.id, (e, t) => {
								var n = Eb(), r = L(n), i = L(r), a = L(i, !0);
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
						K(e, jb());
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
			var t = Bb(), n = L(t), r = L(n);
			Y(r, 7, () => d, (e) => e.id, (e, t, n) => {
				var r = Ib(), i = R(r);
				let a;
				var l = L(i), u = L(l);
				N(l);
				var f = z(l), p = L(f, !0);
				N(f);
				var m = z(f), h = L(m, !0);
				N(m), N(i);
				var _ = z(i, 2), v = (e) => {
					var t = Fb();
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
				var n = Lb(), r = L(n), i = L(r, !0);
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
				var t = Rb(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
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
				K(e, zb());
			};
			J(h, (e) => {
				H(b) ? e(_) : e(v, -1);
			}), N(t), V(() => {
				za(r, `--current-stage:${H(s)}`), q(u, (H(g), U(() => H(g).controlState?.recovery?.required ? "CONTROL HOLD" : "GATES ENFORCED"))), q(m, (H(g), U(() => H(g).controlState?.recovery?.required ? "New packets can be received and hashed, but the main line cannot advance until the historical boundary is reviewed." : "Branches rejoin the main line through normal planning, custody, and decision gates.")));
			}), K(e, t);
		}, Ee = (e) => {
			var t = Jb(), n = L(t);
			ha(L(n), () => (H(_), H(v), H(S), H(g), U(() => `${H(_)}-${H(v)}-${H(S)}-${H(g).id}`)), (e) => {
				{
					let t = /* @__PURE__ */ Cn(() => ({
						padding: H(S) ? .06 : .14,
						maxZoom: H(S) ? .74 : .88
					}));
					Oy(e, {
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
							var n = Vb(), r = R(n);
							$y(r, {
								patternColor: "#385043",
								gap: 22,
								size: 1,
								get variant() {
									return Si(Ky), U(() => Ky.Dots);
								}
							});
							var i = z(r, 2);
							Gy(i, { showLock: !1 }), lb(z(i, 2), {
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
				var t = Kb(), n = L(t), r = L(n), i = L(r), a = L(i, !0);
				N(i);
				var o = z(i), s = L(o, !0);
				N(o), N(r);
				var c = z(r), l = (e) => {
					var t = Hb();
					W("click", t, () => I(y, null)), K(e, t);
				};
				J(c, (e) => {
					H(y) && e(l);
				}), N(n);
				var u = z(n, 2), d = L(u, !0);
				N(u);
				var f = z(u, 2), p = (e) => {
					var t = Ub(), n = z(L(t)), r = L(n, !0);
					N(n), N(t), V((e) => q(r, e), [() => (H(b), U(() => JSON.stringify(H(b).data.payload, null, 2)))]), K(e, t);
				};
				J(f, (e) => {
					H(b), U(() => H(b).data.payload) && e(p);
				});
				var m = z(f, 2), h = (e) => {
					var t = Gb(), n = L(t), r = z(L(n)), i = L(r, !0);
					N(r), N(n);
					var a = z(n);
					Y(a, 5, () => (H(b), U(() => H(b).data.substeps)), (e) => e.id, (e, t) => {
						var n = Wb(), r = L(n), i = L(r, !0);
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
				K(e, qb());
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
var Zb = /* @__PURE__ */ G("<div class=\"loop-error\" role=\"alert\"><strong>Paused safely</strong><span> </span></div>"), Qb = /* @__PURE__ */ G("<p> </p>"), $b = /* @__PURE__ */ G("<div class=\"loop-resolution\"><span> </span> <strong> </strong> <!></div>"), ex = /* @__PURE__ */ G("<div class=\"loop-resolution\"><span>REQUIRED BEFORE AUTOPILOT CAN CONTINUE</span> <strong> </strong> <p> </p></div>"), tx = /* @__PURE__ */ G("<li><b> </b><div><strong> </strong><span> </span><p> </p></div><i> </i></li>"), nx = /* @__PURE__ */ G("<li><strong> </strong><span> </span></li>"), rx = /* @__PURE__ */ G("<details class=\"schedule-deferred\"><summary>Deferred candidates <strong> </strong></summary><ul></ul></details>"), ix = /* @__PURE__ */ G("<details class=\"scheduled-wave\"><summary><span> </span><strong> </strong></summary> <div class=\"scheduled-wave-body\"><div class=\"schedule-budget\"><span><b> </b> tokens reserved</span><span><b> </b> available slots</span><span><b> </b> schedule state</span></div> <ol></ol> <!> <footer><b> </b><span> </span></footer></div></details>"), ax = /* @__PURE__ */ G("<button class=\"outline-button compact\">Stop & capture here</button>"), ox = /* @__PURE__ */ G("<button class=\"primary-button compact\">Return to custody action</button> <!>", 1), sx = /* @__PURE__ */ G("<button class=\"primary-button autopilot-start-button\" disabled=\"\">▶ Start one-loop autopilot</button> <button class=\"outline-button compact autopilot-unlock-button\"> </button>", 1), cx = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button> <!>", 1), lx = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button>"), ux = /* @__PURE__ */ G("<!> <!>", 1), dx = /* @__PURE__ */ G("<button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), fx = /* @__PURE__ */ G("<button class=\"primary-button compact\"> </button> <button class=\"outline-button compact\">Stop & capture here</button>", 1), px = /* @__PURE__ */ G("<button class=\"primary-button\"> </button>"), mx = /* @__PURE__ */ G("<div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div>"), hx = /* @__PURE__ */ G("<div class=\"loop-boundary pending\"><span>END · PENDING</span><strong> </strong></div>"), gx = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small></div></li>"), _x = /* @__PURE__ */ G("<ol class=\"loop-context-steps\"></ol>"), vx = /* @__PURE__ */ G("<div role=\"status\"><span> </span></div>"), yx = /* @__PURE__ */ G("<section id=\"loop-control\" aria-live=\"polite\"><div class=\"loop-control-heading\"><div><p class=\"eyebrow\">ONE-LOOP AUTOPILOT</p> <h3> </h3> <p> </p></div> <span> </span></div> <!> <!> <!> <!> <div class=\"loop-control-row\"><div class=\"loop-now\"><span> </span> <strong> </strong></div> <div class=\"loop-buttons\"><!></div></div> <details class=\"loop-context\"><summary>Loop record & step ledger <strong> </strong></summary> <div class=\"loop-boundaries\"><div class=\"loop-boundary\"><span> </span> <strong> </strong> <small> </small></div> <!></div> <!></details> <!></section>");
function bx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(), m = /* @__PURE__ */ F(), h = /* @__PURE__ */ F(), g = /* @__PURE__ */ F(), _ = /* @__PURE__ */ F(), v = /* @__PURE__ */ F(), y = /* @__PURE__ */ F(), b = /* @__PURE__ */ F(), x = /* @__PURE__ */ F(), S = /* @__PURE__ */ F(), C = /* @__PURE__ */ F(), w = /* @__PURE__ */ F(null), T = /* @__PURE__ */ F(""), E = /* @__PURE__ */ F(""), D = /* @__PURE__ */ F("pending"), O = {
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
		if (!(!H(w) || H(T))) {
			I(T, e), I(D, "pending"), I(E, k[e]?.pending || "Updating autopilot…");
			try {
				await ns({
					projectId: H(w).id,
					type: e,
					targetId: t,
					args: n,
					scope: "loop-control",
					pollLimit: e === "research.schedule.dispatch" ? 160 : 32
				}), I(D, "success"), I(E, k[e]?.completed || "Autopilot updated.");
			} catch (e) {
				I(D, "error"), I(E, e instanceof Error ? e.message : String(e));
			} finally {
				I(T, "");
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
	B(() => n(), () => {
		I(w, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => H(w), () => {
		I(a, H(w)?.loop || null);
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
	}), B(() => H(w), () => {
		I(l, H(w)?.researchRuns?.find((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || null);
	}), B(() => H(w), () => {
		I(u, H(w)?.researchRuns?.filter((e) => [
			"launching",
			"running",
			"blocked"
		].includes(e.status)) || []);
	}), B(() => H(w), () => {
		I(d, H(w)?.researchSchedule || null);
	}), B(() => H(w), () => {
		I(f, H(w)?.phase === "RESEARCH_READY");
	}), B(() => H(w), () => {
		I(p, (H(w)?.custody?.items || []).filter((e) => e.blocksResearch && !["complete", "parked"].includes(e.status)));
	}), B(() => (H(f), H(p)), () => {
		I(m, H(f) && H(p).length > 0);
	}), B(() => H(d), () => {
		I(h, !!(H(d) && [
			"completed",
			"failed",
			"superseded"
		].includes(H(d).status)));
	}), B(() => (H(f), H(m), H(d), H(h)), () => {
		I(g, H(f) && !H(m) && (!H(d) || H(h)));
	}), B(() => (H(d), H(h), H(w)), () => {
		I(_, !!(H(d) && !H(h) && [
			"RESEARCH_READY",
			"RESEARCH_RUNNING",
			"RESEARCH_INTAKE",
			"SYNTHESIZING"
		].includes(H(w)?.phase || "")));
	}), B(() => (H(w), H(o), H(f), H(d)), () => {
		I(v, !!(H(w) && !H(o) && !H(w).canStartLoop && H(w).loopStart?.blocker && !(H(f) && H(d) && ["proposed", "confirmed"].includes(H(d).status))));
	}), B(() => H(w), () => {
		I(y, H(w)?.strategy?.workspace?.activeReview?.status === "drafted" ? H(w).strategy.workspace.activeReview.response?.proposal : null);
	}), B(() => (H(v), H(f), H(d), H(a)), () => {
		I(b, H(v) ? "PREFLIGHT BLOCKED" : H(f) && H(d)?.status === "proposed" ? "CONFIRM WAVE" : H(f) && H(d)?.status === "confirmed" ? "WAVE RESERVED" : {
			running: "RUNNING",
			paused: "PAUSED",
			attention: "NEEDS ATTENTION",
			completed: "LOOP COMPLETE",
			stopped: "STOPPED"
		}[H(a)?.status || ""] || "READY");
	}), B(() => (H(v), H(f), H(d), H(a)), () => {
		I(x, H(v) || H(f) && H(d)?.status === "proposed" ? "attention" : H(f) && H(d)?.status === "confirmed" ? "paused" : H(a)?.status === "attention" ? "attention" : H(a)?.status === "completed" ? "complete" : H(a)?.status || "ready");
	}), B(() => H(w), () => {
		I(S, H(w)?.researchPlan?.response?.operatorGuidance || H(w)?.wave?.synthesis?.response?.operatorBrief?.nextDecision || "Resolve the required human gate, then autopilot can recheck the boundary.");
	}), B(() => H(w), () => {
		I(C, H(w)?.phase === "RESEARCH_REVIEW" && H(w)?.researchPlan?.status === "drafted" && H(w)?.researchPlan?.response?.decision === "BLOCKED" && H(w)?.researchPlan?.response?.lanes?.some((e) => e?.taskId === "operator-doc-a1-canonical-transition"));
	}), Br(), vo();
	var re = ca(), ie = R(re), ae = (e) => {
		var t = yx(), n = L(t), r = L(n), i = z(L(r), 2), O = L(i, !0);
		N(i);
		var k = z(i, 2), re = L(k, !0);
		N(k), N(r);
		var ie = z(r, 2), ae = L(ie, !0);
		N(ie), N(n);
		var oe = z(n, 2), se = (e) => {
			var t = Zb(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V(() => q(r, (H(a), U(() => H(a).error)))), K(e, t);
		};
		J(oe, (e) => {
			H(a), H(C), U(() => H(a)?.error && !H(C)) && e(se);
		});
		var ce = z(oe, 2), le = (e) => {
			var t = $b(), n = L(t), r = L(n);
			N(n);
			var i = z(n, 2), a = L(i, !0);
			N(i);
			var o = z(i, 2), s = (e) => {
				var t = Qb(), n = L(t);
				N(t), V((e, t) => q(n, `${e ?? ""} required · ${t ?? ""} currently schedulable · no workflow transition was consumed.`), [() => (H(w), U(() => Number(H(w).loopStart.minimumRunnableTokenCap).toLocaleString())), () => (H(w), U(() => Number(H(w).loopStart.effectiveTokenLimit || 0).toLocaleString()))]), K(e, t);
			};
			J(o, (e) => {
				H(w), U(() => H(w)?.loopStart?.minimumRunnableTokenCap) && e(s);
			}), N(t), V((e) => {
				q(r, `AUTOMATION START PREFLIGHT · ${e ?? ""}`), q(a, (H(w), U(() => H(w)?.loopStart?.blocker)));
			}, [() => (H(w), U(() => H(w)?.loopStart?.code?.replaceAll("_", " ")))]), K(e, t);
		};
		J(ce, (e) => {
			H(v) && e(le);
		});
		var ue = z(ce, 2), de = (e) => {
			var t = ex(), n = z(L(t), 2), r = L(n, !0);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i), N(t), V(() => {
				q(r, (H(a), U(() => H(a).resumeBlocker))), q(o, H(S));
			}), K(e, t);
		};
		J(ue, (e) => {
			H(a), H(C), U(() => H(a)?.status === "attention" && H(a).resumeBlocker && !H(C)) && e(de);
		});
		var fe = z(ue, 2), pe = (e) => {
			var t = ix(), n = L(t), r = L(n), i = L(r);
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
				var n = tx(), r = L(n), i = L(r, !0);
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
				var t = rx(), n = L(t), r = z(L(n)), i = L(r, !0);
				N(r), N(n);
				var a = z(n);
				Y(a, 5, () => (H(d), U(() => H(d).deferred)), (e) => e.requestId, (e, t) => {
					var n = nx(), r = L(n), i = L(r, !0);
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
		J(fe, (e) => {
			H(_) && e(pe);
		});
		var me = z(fe, 2), he = L(me), ge = L(he), _e = L(ge, !0);
		N(ge);
		var ve = z(ge, 2), ye = L(ve, !0);
		N(ve), N(he);
		var be = z(he, 2), xe = L(be), Se = (e) => {
			var t = ox(), n = R(t), r = z(n, 2), i = (e) => {
				var t = ax();
				V((e) => t.disabled = e, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.stop")), K(e, t);
			};
			J(r, (e) => {
				H(o) && e(i);
			}), W("click", n, te), K(e, t);
		}, Ce = (e) => {
			var t = sx(), n = z(R(t), 2), r = L(n, !0);
			N(n), V(() => q(r, (H(y), U(() => H(y)?.epochLabel ? "Review Epoch 2 resource proposal →" : "Open strategy & resources →")))), W("click", n, ne), K(e, t);
		}, we = (e) => {
			var t = cx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = ax();
				V((e) => t.disabled = e, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.stop")), K(e, t);
			};
			J(i, (e) => {
				H(o) && e(a);
			}), V((e) => {
				n.disabled = e, q(r, H(T) ? "Freezing…" : "Freeze wave schedule");
			}, [() => (H(T), U(() => !!H(T)))]), W("click", n, () => M("research.schedule.prepare")), K(e, t);
		}, Te = (e) => {
			var t = cx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), a = (e) => {
				var t = ax();
				V((e) => t.disabled = e, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.stop")), K(e, t);
			};
			J(i, (e) => {
				H(o) && e(a);
			}), V((e) => {
				n.disabled = e, q(r, (H(T), H(d), U(() => H(T) ? "Confirming…" : `Confirm ${H(d).members?.length || 0}-lane schedule`)));
			}, [() => (H(T), U(() => !!H(T)))]), W("click", n, () => M("research.schedule.confirm", H(d).id, { scheduleDigest: H(d).digest })), K(e, t);
		}, Ee = (e) => {
			var t = ux(), n = R(t), r = (e) => {
				var t = lx(), n = L(t, !0);
				N(t), V((e) => {
					t.disabled = e, q(n, H(T) ? "Resuming…" : "Resume & dispatch wave");
				}, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.resume")), K(e, t);
			}, i = (e) => {
				var t = lx(), n = L(t, !0);
				N(t), V((e) => {
					t.disabled = e, q(n, (H(T), H(d), U(() => H(T) ? "Dispatching…" : `Dispatch ${H(d).members?.length || 0}-lane wave`)));
				}, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("research.schedule.dispatch", H(d).id, { scheduleDigest: H(d).digest })), K(e, t);
			};
			J(n, (e) => {
				H(a), U(() => H(a)?.status === "paused" || H(a)?.status === "attention") ? e(r) : (H(a), U(() => H(a)?.status !== "running") && e(i, 1));
			});
			var s = z(n, 2), c = (e) => {
				var t = ax();
				V((e) => t.disabled = e, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.stop")), K(e, t);
			};
			J(s, (e) => {
				H(o) && e(c);
			}), K(e, t);
		}, De = (e) => {
			var t = dx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i);
			var s = z(i, 2);
			V((e, t, c) => {
				n.disabled = e, q(r, H(l) ? "Pause automation" : "Pause now"), i.disabled = t, q(o, (H(a), U(() => H(a).pendingActionId ? "Halt after this step" : "Pause before next step"))), s.disabled = c;
			}, [
				() => (H(T), U(() => !!H(T))),
				() => (H(T), U(() => !!H(T))),
				() => (H(T), U(() => !!H(T)))
			]), W("click", n, () => M("loop.pause")), W("click", i, () => M("loop.halt-after-step")), W("click", s, () => M("loop.stop")), K(e, t);
		}, Oe = (e) => {
			var t = fx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2);
			V((e, t) => {
				n.disabled = e, q(r, H(T) === "loop.resume" ? "Rechecking…" : "Recheck & resume"), i.disabled = t;
			}, [() => (H(T), U(() => !!H(T))), () => (H(T), U(() => !!H(T)))]), W("click", n, () => M("loop.resume")), W("click", i, () => M("loop.stop")), K(e, t);
		}, ke = (e) => {
			var t = fx(), n = R(t), r = L(n, !0);
			N(n);
			var i = z(n, 2);
			V((e) => {
				q(r, H(C) ? "Review & approve DOC-A1" : "Resolve the required gate"), i.disabled = e;
			}, [() => (H(T), U(() => !!H(T)))]), W("click", n, te), W("click", i, () => M("loop.stop")), K(e, t);
		}, Ae = (e) => {
			var t = px(), n = L(t, !0);
			N(t), V((e) => {
				t.disabled = e, q(n, (H(T), H(a), H(w), U(() => H(T) === "loop.start" ? "Starting…" : H(a)?.status === "completed" ? "Run another complete loop" : H(w).phase === "DECISION_REQUIRED" ? "Run one complete loop" : "Continue this loop automatically")));
			}, [() => (H(T), U(() => !!H(T)))]), W("click", t, () => M("loop.start")), K(e, t);
		};
		J(xe, (e) => {
			H(m) ? e(Se) : H(v) ? e(Ce, 1) : H(g) ? e(we, 2) : (H(f), H(d), U(() => H(f) && H(d)?.status === "proposed") ? e(Te, 3) : (H(f), H(d), U(() => H(f) && H(d)?.status === "confirmed") ? e(Ee, 4) : (H(a), U(() => H(a)?.status === "running") ? e(De, 5) : (H(a), U(() => H(a)?.status === "paused" || H(a)?.status === "attention" && H(a).canResume) ? e(Oe, 6) : (H(a), U(() => H(a)?.status === "attention") ? e(ke, 7) : (H(w), U(() => H(w).canStartLoop) && e(Ae, 8)))))));
		}), N(be), N(me);
		var je = z(me, 2), Me = L(je), Ne = z(L(Me)), Pe = L(Ne);
		N(Ne), N(Me);
		var Fe = z(Me, 2), Ie = L(Fe), Le = L(Ie), Re = L(Le);
		N(Le);
		var ze = z(Le, 2), Be = L(ze, !0);
		N(ze);
		var Ve = z(ze, 2), He = L(Ve);
		N(Ve), N(Ie);
		var Ue = z(Ie, 2), We = (e) => {
			var t = mx(), n = L(t), r = L(n);
			N(n);
			var i = z(n, 2), o = L(i, !0);
			N(i);
			var s = z(i, 2), c = L(s);
			N(s), N(t), V((e, t, n) => {
				q(r, `END · ${e ?? ""}`), q(o, t), q(c, `${H(a), U(() => H(a).end.waveLabel || "No named wave") ?? ""} · ${n ?? ""}`);
			}, [
				() => (H(a), U(() => j(H(a).end.capturedAt))),
				() => (H(a), U(() => A(H(a).end.phase))),
				() => (H(a), U(() => ee(H(a).end)))
			]), K(e, t);
		}, Ge = (e) => {
			var t = hx(), n = z(L(t)), r = L(n, !0);
			N(n), N(t), V(() => q(r, H(o) ? "Captured when this run stops" : "Not captured")), K(e, t);
		};
		J(Ue, (e) => {
			H(a), U(() => H(a)?.end?.capturedAt) ? e(We) : e(Ge, -1);
		}), N(Fe);
		var qe = z(Fe, 2), Je = (e) => {
			var t = _x();
			Y(t, 5, () => H(s), (e) => e.actionId, (e, t) => {
				var n = gx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e) => {
					X(n, 1, Ma((H(t), U(() => H(t).status)))), q(i, (H(t), U(() => H(t).index))), q(s, (H(t), U(() => H(t).label))), q(l, `${H(t), U(() => H(t).status) ?? ""}${H(t), U(() => H(t).attemptCount && H(t).attemptCount > 1 ? ` · attempt ${H(t).attemptCount}` : "") ?? ""}${e ?? ""}`);
				}, [() => (H(t), U(() => H(t).completedAt ? ` · ${j(H(t).completedAt)}` : ""))]), K(e, n);
			}), N(t), K(e, t);
		};
		J(qe, (e) => {
			H(s), U(() => H(s).length) && e(Je);
		}), N(je);
		var Ye = z(je, 2), Xe = (e) => {
			var t = vx(), n = L(t), r = L(n, !0);
			N(n), N(t), V(() => {
				X(t, 1, `gate-feedback loop-feedback ${H(D) ?? ""}`), q(r, H(E));
			}), K(e, t);
		};
		J(Ye, (e) => {
			H(E) && e(Xe);
		}), N(t), V((e, n, r, i, p) => {
			X(t, 1, `loop-control ${H(x) ?? ""}`), q(O, (H(v), H(m), H(g), H(f), H(d), H(C), H(l), H(u), H(o), H(c), H(a), U(() => H(v) ? "Recenter resources before starting the loop" : H(m) ? "Resolve custody before scheduling research" : H(g) ? "Freeze the resource-bounded wave" : H(f) && H(d)?.status === "proposed" ? `Confirm ${H(d).members?.length || 0} scheduled member${H(d).members?.length === 1 ? "" : "s"}` : H(f) && H(d)?.status === "confirmed" ? "Dispatch the confirmed wave" : H(C) ? "Paused for one operator approval" : H(l) ? `${H(u).length} bounded lane${H(u).length === 1 ? " is" : "s are"} working` : H(o) ? H(c)?.label || (H(a)?.status === "attention" ? "Waiting at a checked boundary" : "Watching for the next safe step") : H(a)?.status === "completed" ? "A full bounded loop is captured" : "Continue to the next fresh decision"))), q(re, e), X(ie, 1, `loop-status ${H(x) ?? ""}`), q(ae, H(b)), q(_e, (H(f), H(a), H(o), U(() => H(f) ? "Current position" : H(a)?.haltAfterStep ? "Halt armed" : H(o) ? "Current position" : "Scope"))), q(ye, (H(v), H(m), H(g), H(f), H(d), H(C), H(l), H(a), H(c), U(() => H(v) ? "Resource gate → unlock autopilot" : H(m) ? "Custody dependency → bounded successor → resume" : H(g) ? "Checked plan → freeze schedule" : H(f) && H(d)?.status === "proposed" ? "Resource frontier frozen → operator confirmation" : H(f) && H(d)?.status === "confirmed" ? "Operator confirmed → bounded wave dispatch" : H(C) ? "DOC-A1 preflight passed · your approval is next" : H(l) ? `${H(l).taskId} · ${H(l).status}` : H(a)?.haltAfterStep ? "Will pause when this step settles" : H(c) ? `${H(c).index}. ${H(c).label} · ${H(c).status}` : "One decision-to-decision cycle"))), q(Pe, `${n ?? ""}/${H(s), U(() => H(s).length) ?? ""} settled`), q(Re, `START · ${r ?? ""}`), q(Be, i), q(He, `${H(a), U(() => H(a)?.start?.waveLabel || "No named wave") ?? ""} · ${p ?? ""}`);
		}, [
			() => (H(v), H(w), H(m), H(p), H(g), H(h), H(f), H(d), H(C), H(l), H(u), U(() => H(v) ? H(w)?.loopStart?.blocker : H(m) ? `${H(p).length} required custody contract${H(p).length === 1 ? " remains" : "s remain"}. Wave scheduling is locked until the focused dependency above is reshaped or settled.` : H(g) ? `${H(h) ? "The previous schedule is closed. " : ""}Freeze the current dependency-safe frontier under the slot and token policy before operator review.` : H(f) && H(d)?.status === "proposed" ? "Review the exact tasks, contracts, resource caps, and deferred lanes below. Confirmation reserves this digest but launches nothing." : H(f) && H(d)?.status === "confirmed" ? "The operator gate is captured. Dispatch will launch only these immutable members and will preserve a batch evidence boundary." : H(C) ? "The checked staging evidence is ready; approve DOC-A1 below, then Sol will replan automatically." : H(l) ? `${H(u).map((e) => e.taskId).join(", ")}. Autopilot will wait for the whole wave, perform batch intake, and continue the loop.` : "decision → checked plan → resource-bounded wave → custody → batch synthesis → next decision. Every action and receipt stays inspectable.")),
			() => (H(s), U(() => H(s).filter((e) => e.status === "completed").length)),
			() => (H(a), U(() => j(H(a)?.start?.capturedAt))),
			() => (H(a), U(() => A(H(a)?.start?.phase))),
			() => (H(a), U(() => ee(H(a)?.start)))
		]), K(e, t);
	};
	J(ie, (e) => {
		H(w) && e(ae);
	}), K(e, re), xt(), i();
}
//#endregion
//#region src/ui/HeaderAutopilot.svelte
Zi(["click"]), Ho();
var xx = /* @__PURE__ */ G("<div><span><small>AUTOPILOT</small><strong> </strong></span> <button type=\"button\"><i aria-hidden=\"true\"></i> </button></div>");
function Sx(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), u = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F("");
	function h() {
		document.querySelector("#next-action")?.scrollIntoView({
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
		I(l, H(o) ? "ON" : H(s) ? "PAUSED" : H(f)?.canStartLoop ? "READY" : "OFF");
	}), B(() => (H(p), H(o), H(s), H(f)), () => {
		I(u, H(p) ? "Working…" : H(o) ? "Pause" : H(s) ? "Resume" : H(f)?.canStartLoop ? "Start" : "View next step");
	}), B(() => (H(m), H(c), H(u), H(f)), () => {
		I(d, H(m) || (H(c) ? `${H(u)} one-loop autopilot` : H(f)?.loopStart?.blocker || "Open the current campaign gate"));
	}), Br(), vo();
	var _ = ca(), v = R(_), y = (e) => {
		var t = xx();
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
var Cx = /* @__PURE__ */ G("<li><span></span> </li>"), wx = /* @__PURE__ */ G("<p class=\"campaign-budget-note\"> </p>"), Tx = /* @__PURE__ */ G("<section class=\"campaign-summary\" id=\"process-tracker\" aria-label=\"Campaign progress\"><div class=\"campaign-summary-heading\"><div><p class=\"eyebrow\"> </p><h2> </h2></div><span class=\"campaign-mode\"> </span></div> <ol aria-label=\"Campaign stages\"></ol> <!></section>");
function Ex(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = [
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
	B(() => n(), () => {
		I(a, n().control?.projects?.find((e) => e.id === n().selectedProject));
	}), B(() => H(a), () => {
		I(o, Os(H(a)));
	}), B(() => (H(o), H(a)), () => {
		I(s, ks(H(o)) || H(o)?.status === "evidence_ready" ? 3 : u[H(a)?.phase || ""] ?? 0);
	}), B(() => H(a), () => {
		I(c, H(a)?.resources?.ledger);
	}), Br(), vo();
	var d = ca(), f = R(d), p = (e) => {
		var t = Tx(), n = L(t), r = L(n), i = L(r), o = L(i);
		N(i);
		var u = z(i), d = L(u, !0);
		N(u), N(r);
		var f = z(r), p = L(f, !0);
		N(f), N(n);
		var m = z(n, 2);
		Y(m, 5, () => l, _a, (e, t, n) => {
			var r = Cx();
			let i;
			var a = L(r);
			a.textContent = n + 1;
			var o = z(a, 1, !0);
			N(r), V(() => {
				Z(r, "aria-current", n === H(s) ? "step" : void 0), i = X(r, 1, "", null, i, {
					current: n === H(s),
					passed: n < H(s)
				}), q(o, H(t));
			}), K(e, r);
		}), N(m);
		var h = z(m, 2), g = (e) => {
			var t = wx(), n = L(t);
			N(t), V((e, t) => q(n, `New research is paused: ${e ?? ""} recorded tokens against the ${t ?? ""} epoch budget. Existing results can still be reviewed.`), [() => (H(c), U(() => Number(H(c).knownTokens).toLocaleString())), () => (H(c), U(() => Number(H(c).epochTokenBudget).toLocaleString()))]), K(e, t);
		};
		J(h, (e) => {
			H(c), U(() => H(c) && H(c).schedulableTokens === 0) && e(g);
		}), N(t), V(() => {
			q(o, `${H(a), U(() => H(a).id) ?? ""} · CAMPAIGN`), q(d, (H(a), U(() => H(a).strategy?.epoch?.label || H(a).role))), q(p, (H(a), U(() => H(a).loop?.status === "running" ? "Automation on" : "Guided mode")));
		}), K(e, t);
	};
	J(f, (e) => {
		H(a) && e(p);
	}), K(e, d), xt(), i();
}
//#endregion
//#region src/ui/OperatorGate.svelte
Ho();
var Dx = /* @__PURE__ */ G("<div class=\"gate-feedback error\" role=\"alert\"><span> </span></div>"), Ox = /* @__PURE__ */ G("<div class=\"operator-gate-callout\"><strong>The first action is read-only</strong> <p>It resolves the exact source commit, confirms both approved SHA-256 hashes, checks that main is clean, and previews the lineage merge. It changes no Git or campaign authority.</p> <button class=\"primary-button\"> </button></div> <!>", 1), kx = /* @__PURE__ */ G("<div class=\"operator-gate-preview\"><div class=\"operator-gate-ready\"><div><span>READINESS CHECK PASSED</span> <strong>Exact DOC-A1 transition is ready</strong> <small>3 local custody commits · no push · no worker dispatch</small></div> <label class=\"operator-gate-confirm\"><input type=\"checkbox\"/><span>Approve Proposal A’s exact bytes as DOC-A1.</span></label> <button class=\"primary-button operator-gate-approve\"> </button></div> <details class=\"operator-gate-technical\"><summary>Inspect commits, paths, hashes, and effects <strong>Preflight receipt</strong></summary> <div class=\"operator-gate-summary\"><div><span>FROM FROZEN STAGING HEAD</span><strong> </strong><small> </small></div> <div><span>INTO CLEAN MAIN</span><strong> </strong><small> </small></div></div> <ul><li><code>CONTRACT.md</code><span> </span></li> <li><code>output/preimage-spec.json</code><span> </span></li> <li><code>evidence-receipt.json</code><span>new DKC successor receipt</span></li></ul> <div class=\"operator-gate-effects\"><strong>BOUNDARY EFFECTS</strong> <p>Creates one local lineage-intake merge, one exact document commit, and one successor-receipt commit. It does not push, dispatch a worker, authorize SAT or Mac work, or promote a mathematical claim.</p></div> <button class=\"outline-button compact\">Recheck readiness</button></details></div>"), Ax = /* @__PURE__ */ G("<div role=\"status\"><span> </span></div>"), jx = /* @__PURE__ */ G("<section class=\"operator-gate\" id=\"operator-gate\" aria-live=\"polite\"><div class=\"operator-gate-heading\"><div><p class=\"eyebrow\">REQUIRED OPERATOR TRANSITION</p> <h2>Adopt Proposal A as DOC-A1</h2> <p>This is the missing bridge between the checked staging evidence and the next runnable cold-replay lane.</p></div> <span class=\"operator-gate-status\">HUMAN GATE</span></div> <div class=\"operator-gate-path\" aria-label=\"Operator transition progress\"><span>✓ Verified</span><i>→</i><span class=\"current\">Your approval</span><i>→</i><span>Sol replans</span></div> <!> <!></section>");
function Mx(e, t) {
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
		var t = jx(), n = z(L(t), 2), r = L(n);
		let i;
		Ke(4), N(n);
		var a = z(n, 2), o = (e) => {
			var t = Ox(), n = R(t), r = z(L(n), 4), i = L(r, !0);
			N(r), N(n);
			var a = z(n, 2), o = (e) => {
				var t = Dx(), n = L(t), r = L(n, !0);
				N(n), N(t), V(() => q(r, (H(u), U(() => H(u).error)))), K(e, t);
			};
			J(a, (e) => {
				H(u), H(m), U(() => H(u)?.status === "failed" && !H(m)) && e(o);
			}), V((e) => {
				r.disabled = e, q(i, H(f) ? "Checking readiness…" : "Check transition readiness");
			}, [() => (H(f), U(() => !!H(f)))]), W("click", r, v), K(e, t);
		}, s = (e) => {
			var t = kx(), n = L(t), r = z(L(n), 2), i = L(r);
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
			var t = Ax(), n = L(t), r = L(n, !0);
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
var Nx = /* @__PURE__ */ G("<small class=\"active-lane-loading\">Loading live detail…</small>"), Px = /* @__PURE__ */ G("<small class=\"active-lane-error\"> </small>"), Fx = /* @__PURE__ */ G("<li><b> </b><span> </span></li>"), Ix = /* @__PURE__ */ G("<ul></ul>"), Lx = /* @__PURE__ */ G("<details class=\"active-lane-mini\"><summary><span class=\"active-lane-state\"><i aria-hidden=\"true\"></i><b> </b></span> <span class=\"active-lane-title\"><strong> </strong><small> </small></span> <span class=\"active-lane-glance\"><b> </b><small> </small></span></summary> <div class=\"active-lane-detail\"><p> </p> <!> <!> <div class=\"active-lane-facts\"><span><small>PROFILE</small><strong> </strong></span> <span><small>USAGE</small><strong> </strong></span> <span><small>JOB</small><strong> </strong></span></div> <!> <button class=\"outline-button compact\" type=\"button\">Open full lane inspector</button></div></details>"), Rx = /* @__PURE__ */ G("<section class=\"active-lane-strip\" aria-label=\"Currently running campaign lanes\"><header><span><i aria-hidden=\"true\"></i><small>LIVE WAVE</small><strong> </strong></span> <b>Expand a lane to inspect</b></header> <div class=\"active-lane-list\"></div></section>");
function zx(e, t) {
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
		var t = Rx(), n = L(t), r = L(n), i = z(L(r), 2), m = L(i);
		N(i), N(r), Ke(2), N(n);
		var h = z(n, 2);
		Y(h, 5, () => H(a), (e) => e.id, (e, t) => {
			let n = /* @__PURE__ */ Cn(() => (H(o), H(t), U(() => H(o)[H(t).id] || H(t))));
			var r = Lx(), i = L(r), a = L(i), m = z(L(a)), h = L(m, !0);
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
				K(e, Nx());
			};
			J(k, (e) => {
				H(s), H(t), U(() => H(s)[H(t).id]) && e(A);
			});
			var j = z(k, 2), ee = (e) => {
				var n = Px(), r = L(n, !0);
				N(n), V(() => q(r, (H(c), H(t), U(() => H(c)[H(t).id])))), K(e, n);
			};
			J(j, (e) => {
				H(c), H(t), U(() => H(c)[H(t).id]) && e(ee);
			});
			var M = z(j, 2), te = L(M), ne = z(L(te)), re = L(ne, !0);
			N(ne), N(te);
			var ie = z(te, 2), ae = z(L(ie)), oe = L(ae, !0);
			N(ae), N(ie);
			var se = z(ie, 2), ce = z(L(se)), le = L(ce, !0);
			N(ce), N(se), N(M);
			var ue = z(M, 2), de = (e) => {
				var t = Ix();
				Y(t, 5, () => (Si(H(n)), U(() => H(n).activities.slice(0, 3))), (e) => e.id, (e, t) => {
					var n = Fx(), r = L(n), i = L(r, !0);
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
var Bx = /* @__PURE__ */ G("<article><div><strong> </strong><span> </span></div> <div class=\"track-meter\"><i></i><b></b></div> <small> </small></article>"), Vx = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small><p> </p></div></li>"), Hx = /* @__PURE__ */ G("<article><strong> </strong><p> </p><small> </small></article>"), Ux = /* @__PURE__ */ G("<div class=\"drift-list\"></div>"), Wx = /* @__PURE__ */ G("<p class=\"strategy-empty\">No active drift signal crosses the charter’s advisory thresholds.</p>"), Gx = /* @__PURE__ */ G("<section id=\"campaign-strategy\" aria-label=\"Campaign strategy and drift\" aria-live=\"polite\"><div class=\"strategy-heading\"><div><p> </p> <h2> </h2> <span> </span></div> <div class=\"strategy-status\"><strong> </strong><span>shadow mode · advisory</span></div></div> <div class=\"strategy-vitals\"><div><span>Frontier motion</span><strong> </strong><small>recorded advances</small></div> <div><span>Campaign spend</span><strong> </strong><small> </small></div> <div><span>Research spend</span><strong> </strong><small> </small></div> <div><span>Research support share</span><strong> </strong><small> </small></div> <div><span>Frontier ledger</span><strong> </strong><small> </small></div></div> <div class=\"strategy-tracks\" aria-label=\"Strategic track allocation\"></div> <details class=\"strategy-details\"><summary><span>Inspect timescales, drift evidence, and custody separation</span><strong> </strong></summary> <div class=\"strategy-detail-grid\"><section><h3>Nested control loops</h3> <ol class=\"strategy-layers\"></ol></section> <section><h3>Drift evidence</h3> <!></section></div> <p class=\"strategy-shadow-note\"><strong>Shadow mode:</strong> these measurements are supplied to Sol synthesis and lane planning, but they do not yet approve, reject, or dispatch work.</p></details></section>");
function Kx(e, t) {
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
		var t = Gx(), n = L(t), r = L(n), i = L(r), d = L(i);
		N(i);
		var f = z(i, 2), p = L(f, !0);
		N(f);
		var m = z(f, 2), h = L(m, !0);
		N(m), N(r);
		var g = z(r, 2), _ = L(g), v = L(_, !0);
		N(_), Ke(), N(g), N(n);
		var y = z(n, 2), b = L(y), x = z(L(b)), S = L(x, !0);
		N(x), Ke(), N(b);
		var C = z(b, 2), w = z(L(C)), T = L(w, !0);
		N(w);
		var E = z(w), D = L(E);
		N(E), N(C);
		var O = z(C, 2), k = z(L(O)), A = L(k, !0);
		N(k);
		var j = z(k), ee = L(j);
		N(j), N(O);
		var M = z(O, 2);
		let te;
		var ne = z(L(M)), re = L(ne, !0);
		N(ne);
		var ie = z(ne), ae = L(ie);
		N(ie), N(M);
		var oe = z(M, 2), se = z(L(oe)), ce = L(se, !0);
		N(se);
		var le = z(se), ue = L(le, !0);
		N(le), N(oe), N(y);
		var de = z(y, 2);
		Y(de, 5, () => (H(o), U(() => H(o).tracks)), (e) => e.id, (e, t) => {
			var n = Bx(), r = L(n), i = L(r), a = L(i, !0);
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
		}), N(de);
		var fe = z(de, 2), pe = L(fe), me = z(L(pe)), he = L(me);
		N(me), N(pe);
		var ge = z(pe, 2), _e = L(ge), ve = z(L(_e), 2);
		Y(ve, 7, () => (H(o), U(() => H(o).layers)), (e) => e.id, (e, t, n) => {
			var r = Vx();
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
		}), N(ve), N(_e);
		var ye = z(_e, 2), be = z(L(ye), 2), xe = (e) => {
			var t = Ux();
			Y(t, 5, () => (H(o), U(() => H(o).drift.signals)), (e) => e.id, (e, t) => {
				var n = Hx(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a, !0);
				N(a);
				var s = z(a), c = L(s, !0);
				N(s), N(n), V(() => {
					X(n, 1, `severity-${H(t), U(() => H(t).severity) ?? ""}`), q(i, (H(t), U(() => H(t).label))), q(o, (H(t), U(() => H(t).evidence))), q(c, (H(t), U(() => H(t).action)));
				}), K(e, n);
			}), N(t), K(e, t);
		}, Se = (e) => {
			K(e, Wx());
		};
		J(be, (e) => {
			H(o), U(() => H(o).drift.signals.length) ? e(xe) : e(Se, -1);
		}), N(ye), N(ge), Ke(2), N(fe), N(t), V((e, n, r, i, c, l) => {
			X(t, 1, `strategy-overview status-${H(o), U(() => H(o).drift.status) ?? ""}`), q(d, `CAMPAIGN STRATEGY · ${H(o), U(() => H(o).epoch.label) ?? ""}`), q(p, (H(s), H(o), U(() => H(s)?.label || (H(o).cost.runs ? "Research allocation is within advisory thresholds" : "No research results recorded in this epoch")))), q(h, (H(s), H(o), U(() => H(s)?.detail || H(o).charter.thesis))), q(v, (H(o), U(() => H(o).drift.status === "attention" ? "RECENTER" : H(o).drift.status === "watch" ? "WATCH" : H(o).cost.runs ? "RESEARCH MIX" : "NO RESEARCH DATA"))), q(S, (H(o), U(() => H(o).progress.advancedDeltaCount || 0))), q(T, e), q(D, `all layers · ${H(a), U(() => H(a)?.resources?.ledger?.unreported ?? "unknown") ?? ""} unreported`), q(A, n), q(ee, `research only · ${H(o), U(() => H(o).cost.unreportedRuns) ?? ""} unreported`), te = X(M, 1, "", null, te, r), q(re, i), q(ae, `charter ceiling ${c ?? ""}`), q(ce, l), q(ue, (H(o), U(() => H(o).progress.frontierPath ? "durable source detected" : "source missing"))), q(he, `${H(o), U(() => H(o).drift.signals.length) ?? ""} signal${H(o), U(() => H(o).drift.signals.length === 1 ? "" : "s") ?? ""}`);
		}, [
			() => (H(a), U(() => l(H(a)?.resources?.ledger?.knownTokens))),
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
function qx(e, t, n = 260) {
	let r = (typeof e == "string" ? e.trim().replace(/\s+/g, " ") : "") || t;
	return r.length <= n ? r : `${r.slice(0, n).replace(/\s+\S*$/, "")}…`;
}
function Jx(e) {
	let t = e?.wave?.synthesis?.response?.progressDeltas;
	if (Array.isArray(t)) return t;
	let n = Array.isArray(e?.strategy?.recentSnapshots) ? e.strategy.recentSnapshots : [];
	return Array.isArray(n[0]?.metrics?.progressDeltas) ? n[0].metrics.progressDeltas : [];
}
function Yx(e) {
	let t = e?.strategy || {}, n = t.charter || {}, r = Array.isArray(t.recentSnapshots) ? t.recentSnapshots[0] : null, i = Jx(e), a = i.find((e) => String(e?.status || "").toUpperCase() === "ADVANCED"), o = i.find((e) => String(e?.status || "").toUpperCase() === "UNCHANGED"), s = t?.drift?.signals?.[0];
	return {
		objective: qx(n.question || e?.role, "Advance the campaign's central mathematical question."),
		status: s ? "STRATEGY CHECK" : "PROGRAM COMPASS",
		headline: qx(s?.label || n?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
		changed: qx(a?.after || a?.evidence, "No accepted frontier change is recorded for the latest wave."),
		scale: qx(o?.after || o?.evidence, "The campaign-level consequence has not yet been recorded."),
		nextTarget: qx(n?.epoch?.objective || e?.wave?.synthesis?.response?.nextWave?.objective || r?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
		rationale: qx(s?.detail || n.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
		antiLoop: qx(s?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
		moves: []
	};
}
//#endregion
//#region src/ui/ProgramCompass.svelte
Ho();
var Xx = /* @__PURE__ */ G("<details><summary><span><b> </b><small> </small></span><strong> </strong><i>why?</i></summary> <div><p> </p><p><b>Program payoff:</b> </p></div></details>"), Zx = /* @__PURE__ */ G("<div class=\"compass-wave\"></div>"), Qx = /* @__PURE__ */ G("<section class=\"program-compass\" aria-label=\"Program objective and recommended next research targets\"><header><div><p>PROGRAM COMPASS</p><h2> </h2></div> <strong> </strong></header> <div class=\"compass-chain\"><article><span>WIN CONDITION</span><strong> </strong></article> <i aria-hidden=\"true\">→</i> <article><span>WHAT JUST CHANGED</span><strong> </strong><small> </small></article> <i aria-hidden=\"true\">→</i> <article class=\"recommended\"><span>BEST NEXT TARGET</span><strong> </strong></article></div> <!> <details class=\"compass-reasoning\"><summary><span>WHY THIS ORDER</span><strong>Show strategy and anti-loop guard</strong></summary> <div><p> </p><p><b>Avoid the loop:</b> </p></div></details> <footer><b>ADVISORY, NOT AUTHORITY</b><span>The evidence receipts and human gates still decide what is accepted or launched.</span></footer></section>");
function $x(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null);
	B(() => n(), () => {
		I(a, n().control?.projects?.find((e) => e.id === n().selectedProject) || null);
	}), B(() => (H(a), Yx), () => {
		I(o, H(a) ? Yx(H(a)) : null);
	}), Br(), vo();
	var s = ca(), c = R(s), l = (e) => {
		var t = Qx(), n = L(t), r = L(n), i = z(L(r)), a = L(i, !0);
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
			var t = Zx();
			Y(t, 5, () => (H(o), U(() => H(o).moves)), (e) => e.id, (e, t) => {
				var n = Xx();
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
var eS = /* @__PURE__ */ G("<div class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></div>"), tS = /* @__PURE__ */ G("<article><span class=\"svelte-wkay8m\"> </span><strong class=\"svelte-wkay8m\"> </strong><small class=\"svelte-wkay8m\"> </small></article>"), nS = /* @__PURE__ */ G("<article><strong class=\"svelte-wkay8m\"> </strong><p class=\"svelte-wkay8m\"> </p></article>"), rS = /* @__PURE__ */ G("<section class=\"resource-signals svelte-wkay8m\"></section>"), iS = /* @__PURE__ */ G("<li><b class=\"svelte-wkay8m\"> </b> <div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span><p class=\"svelte-wkay8m\"> </p><small class=\"svelte-wkay8m\"> </small></div></li>"), aS = /* @__PURE__ */ G("<ol class=\"svelte-wkay8m\"></ol>"), oS = /* @__PURE__ */ G("<div class=\"resource-empty svelte-wkay8m\"><strong class=\"svelte-wkay8m\">No bounded candidate is currently schedulable</strong><p class=\"svelte-wkay8m\">The ledger remains useful as an epoch budget and cost-quality check.</p></div>"), sS = /* @__PURE__ */ G("<li class=\"svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><div class=\"svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div><i class=\"svelte-wkay8m\">NO DISPATCH</i></li>"), cS = /* @__PURE__ */ G("<details class=\"simulation-history svelte-wkay8m\"><summary class=\"svelte-wkay8m\">Immutable simulation history <strong> </strong></summary><ol class=\"svelte-wkay8m\"></ol></details>"), lS = /* @__PURE__ */ G("<div role=\"status\"> </div>"), uS = /* @__PURE__ */ G("<details id=\"resource-economy\"><summary class=\"svelte-wkay8m\"><span class=\"svelte-wkay8m\"><small class=\"svelte-wkay8m\">RESOURCE ECONOMY</small><strong class=\"svelte-wkay8m\"> </strong></span> <span class=\"resource-summary svelte-wkay8m\"><b class=\"svelte-wkay8m\"> </b><b class=\"svelte-wkay8m\"> </b><i class=\"svelte-wkay8m\">SHADOW</i></span></summary> <div class=\"resource-body svelte-wkay8m\"><header class=\"resource-intro svelte-wkay8m\"><div><span class=\"svelte-wkay8m\"> </span><h2 class=\"svelte-wkay8m\">Allocate attention before compute</h2><p class=\"svelte-wkay8m\"> </p></div> <div class=\"authority svelte-wkay8m\"><strong class=\"svelte-wkay8m\">ADVISORY ONLY</strong><span class=\"svelte-wkay8m\">Simulation cannot dispatch</span></div></header> <p class=\"resource-enforcement-note\"><strong>Runtime limit gap.</strong> The local research launcher currently does not forward the schedule’s token and timeout reservations to the worker runtime. These values are planning limits, not enforced stop guarantees. Repair that adapter before authorizing more local research.</p> <section class=\"budget svelte-wkay8m\" aria-label=\"Epoch token budget\"><div class=\"budget-heading svelte-wkay8m\"><strong class=\"svelte-wkay8m\"> </strong><span class=\"svelte-wkay8m\"> </span></div> <div class=\"budget-meter svelte-wkay8m\"><i class=\"known svelte-wkay8m\"></i><i class=\"committed svelte-wkay8m\"></i><i class=\"reserve svelte-wkay8m\"></i></div> <div class=\"budget-legend svelte-wkay8m\"><span class=\"known svelte-wkay8m\"> </span><span class=\"committed svelte-wkay8m\"> </span><span class=\"reserve svelte-wkay8m\"> </span><span> </span></div></section> <div class=\"resource-grid svelte-wkay8m\"><section class=\"slot-pools svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Shared slot pools</h3> <!></section> <section class=\"layer-ledger svelte-wkay8m\"><h3 class=\"svelte-wkay8m\">Measured by layer</h3> <!></section></div> <section class=\"calibration svelte-wkay8m\" aria-label=\"Receipt-bound resource calibration\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">RECEIPT-BOUND CALIBRATION</span><h3 class=\"svelte-wkay8m\"> </h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <p class=\"svelte-wkay8m\"> </p> <div class=\"calibration-classes svelte-wkay8m\"></div> <footer class=\"svelte-wkay8m\">Recommendations remain advisory. Calibration cannot change caps, schedule work, or grant scheduler authority.</footer></section> <!> <section class=\"scheduler svelte-wkay8m\"><header class=\"svelte-wkay8m\"><div><span class=\"svelte-wkay8m\">ADVISORY SCHEDULER</span><h3 class=\"svelte-wkay8m\">What fits next—and what does not</h3></div><strong class=\"svelte-wkay8m\"> </strong></header> <!> <footer class=\"svelte-wkay8m\"><p class=\"svelte-wkay8m\">Freezing creates a content-addressed recommendation receipt for later comparison. It cannot call a worker, consume a gate, or alter research direction.</p><button class=\"outline-button svelte-wkay8m\"> </button></footer></section> <!> <!></div></details>");
function dS(e, t) {
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
		var t = uS();
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
		var M = z(D, 4), te = L(M), ne = L(te), re = L(ne);
		N(ne);
		var ie = z(ne), ae = L(ie);
		N(ie), N(te);
		var oe = z(te, 2), se = L(oe), ce = z(se), le = z(ce);
		N(oe);
		var ue = z(oe, 2), de = L(ue), fe = L(de);
		N(de);
		var pe = z(de), me = L(pe);
		N(pe);
		var he = z(pe), ge = L(he);
		N(he);
		var _e = z(he), ve = L(_e);
		N(_e), N(ue), N(M);
		var ye = z(M, 2), be = L(ye);
		Y(z(L(be), 2), 0, () => [
			"strategy",
			"research",
			"custody"
		], _a, (e, t) => {
			var n = eS(), r = L(n), i = L(r, !0);
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
			var n = eS(), r = L(n), i = L(r, !0);
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
			var n = tS();
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
			var t = rS();
			Y(t, 5, () => (H(f), U(() => H(f).signals)), (e) => e.id, (e, t) => {
				var n = nS(), r = L(n), i = L(r, !0);
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
			var t = aS();
			Y(t, 5, () => (H(f), U(() => H(f).candidates)), (e) => e.id, (e, t) => {
				var n = iS(), r = L(n), i = L(r, !0);
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
			K(e, oS());
		};
		J(Re, (e) => {
			H(f), U(() => H(f).candidates?.length) ? e(ze) : e(Be, -1);
		});
		var Ve = z(Re, 2), He = z(L(Ve)), Ue = L(He, !0);
		N(He), N(Ve), N(Pe);
		var We = z(Pe, 2), Ge = (e) => {
			var t = cS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(f), U(() => H(f).simulations)), _a, (e, t) => {
				var n = sS(), r = L(n), i = L(r);
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
			var t = lS(), n = L(t, !0);
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
var fS = /* @__PURE__ */ G("<label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Exact thread or turn ID</span><input maxlength=\"500\" placeholder=\"Attached coordinator reference\" class=\"svelte-1ull9g0\"/></label>"), pS = /* @__PURE__ */ G("<div class=\"strategy-review-request\"><div><span>CURRENT EPOCH</span> <strong> </strong> <p> </p></div> <label><span>Review focus</span><textarea rows=\"3\" maxlength=\"2000\"></textarea></label> <div class=\"strategy-review-provenance svelte-1ull9g0\"><label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Review kind</span><select class=\"svelte-1ull9g0\"><option>Epoch audit</option><option>Independent idea search</option></select></label> <label class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\">Request source</span><select class=\"svelte-1ull9g0\"><option>Operator</option><option>Coordinator request</option></select></label> <!></div> <button class=\"primary-button\"> </button></div>"), mS = /* @__PURE__ */ G("<button class=\"outline-button\">Check recorded review status</button>"), hS = /* @__PURE__ */ G("<!> <div class=\"strategy-review-running\"><span class=\"strategy-pulse\"></span> <div><strong> </strong><p> </p><small> </small></div></div>", 1), gS = /* @__PURE__ */ G("<div><span> </span><strong> </strong><small> </small></div>"), _S = /* @__PURE__ */ G("<li class=\"svelte-1ull9g0\"> </li>"), vS = /* @__PURE__ */ G("<ul></ul>"), yS = /* @__PURE__ */ G("<p>None proposed.</p>"), bS = /* @__PURE__ */ G("<section><strong> </strong><!></section>"), xS = /* @__PURE__ */ G("<li><strong> </strong><span> </span><p> </p></li>"), SS = /* @__PURE__ */ G("<details class=\"custody-candidates\"><summary> </summary><ul></ul></details>"), CS = /* @__PURE__ */ G("<label><input type=\"checkbox\"/><span>I approve this exact advisory charter as the next epoch.</span></label> <div><button class=\"outline-button\">Keep current charter</button><button class=\"primary-button\"> </button></div>", 1), wS = /* @__PURE__ */ G("<button class=\"outline-button\">Close proposal and keep current charter</button>"), TS = /* @__PURE__ */ G("<div class=\"strategy-proposal\"><header><div><span> </span><h3> </h3></div> <strong> </strong></header> <div class=\"strategy-proposal-objective\"><span>PROPOSED EPOCH</span> <strong> </strong> <p> </p></div> <div class=\"strategy-proposal-weights\" aria-label=\"Proposed track weights\"></div> <div class=\"strategy-action-diff\"></div> <!> <div class=\"strategy-human-gate\"><div><span>HUMAN ACTIVATION GATE</span><strong> </strong><small> </small></div> <!></div></div>"), ES = /* @__PURE__ */ G("<div role=\"status\"> </div>"), DS = /* @__PURE__ */ G("<li><span> </span><div><strong> </strong><small> </small></div></li>"), OS = /* @__PURE__ */ G("<details class=\"strategy-history\"><summary>Charter history <strong> </strong></summary><ol></ol></details>"), kS = /* @__PURE__ */ G("<li class=\"svelte-1ull9g0\"><span class=\"svelte-1ull9g0\"> </span><div><strong> </strong><small> </small></div></li>"), AS = /* @__PURE__ */ G("<details class=\"strategy-history strategy-review-history svelte-1ull9g0\"><summary>Independent review history <strong> </strong></summary><ol></ol></details>"), jS = /* @__PURE__ */ G("<details id=\"strategy-workspace\" class=\"strategy-workspace\"><summary><span><small>STRATEGY WORKSPACE</small><strong> </strong></span> <span class=\"strategy-workspace-state\"> </span></summary> <div class=\"strategy-workspace-body\"><div class=\"strategy-workspace-boundary\"><strong>Independent governance lane</strong> <p>Epoch and idea-search reviews run in one dedicated read-only Sol lane. Each request binds its strategy slot and token cap, and cannot interrupt the regular coordinator, change campaign phase, dispatch workers, or activate its own proposal.</p></div> <!> <!> <!> <!></div></details>");
function MS(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F("epoch"), h = /* @__PURE__ */ F("operator"), g = /* @__PURE__ */ F(""), _ = /* @__PURE__ */ F("Review whether the current epoch is producing durable frontier motion and whether its portfolio should be rebalanced."), v = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F("pending"), b = (e) => `${Math.round(Number(e || 0) * 100)}%`;
	async function x(e, t = "", n = {}) {
		if (!H(l) || H(f)) throw Error("Another strategy action is still settling");
		I(f, e), I(y, "pending"), I(v, e === "strategy.review.reconcile" ? "Checking the exact recorded strategy turn…" : e === "strategy.review.request" ? "Freezing the epoch ledger and starting an independent read-only Sol task…" : e === "strategy.proposal.activate" ? "Recording the charter revision and opening a fresh measurement epoch…" : "Keeping the current charter and closing this proposal…");
		try {
			let r = await ns({
				projectId: H(l).id,
				type: e,
				targetId: t,
				args: n,
				scope: "strategy-workspace",
				pollLimit: 160
			});
			return I(y, "success"), I(v, e === "strategy.review.reconcile" ? "Recorded strategy status reconciled. No work was dispatched." : e === "strategy.review.request" ? "Independent epoch review started. The regular campaign coordinator and campaign phase were not changed." : e === "strategy.proposal.activate" ? "The new advisory charter is active in a fresh epoch. No work was dispatched." : "Proposal closed; the current charter remains active."), r.action;
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
		var t = jS(), n = L(t), r = L(n), i = z(L(r)), T = L(i);
		N(i), N(r);
		var E = z(r, 2), D = L(E, !0);
		N(E), N(n);
		var O = z(n, 2), k = z(L(O), 2), A = (e) => {
			var t = pS(), n = L(t), r = z(L(n), 2), i = L(r, !0);
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
				var t = fS(), n = z(L(t));
				$a(n), N(t), so(n, () => H(g), (e) => I(g, e)), K(e, t);
			};
			J(E, (e) => {
				H(h) === "coordinator-request" && e(D);
			}), N(d);
			var O = z(d, 2), k = L(O, !0);
			N(O), N(t), V((e) => {
				q(i, (H(l), U(() => H(l).strategy.epoch.label))), q(o, (H(l), U(() => H(l).strategy.charter.epoch?.objective || H(l).strategy.charter.thesis))), O.disabled = e, q(k, H(f) === "strategy.review.request" ? "Starting independent review…" : "Ask independent Sol strategist");
			}, [() => (H(f), H(u), H(_), H(h), H(g), U(() => !!H(f) || !H(u).reviewAvailable || !H(_).trim() || H(h) === "coordinator-request" && !H(g).trim()))]), so(c, () => H(_), (e) => I(_, e)), Ha(v, () => H(m), (e) => I(m, e)), Ha(C, () => H(h), (e) => I(h, e)), W("click", O, S), K(e, t);
		}, j = (e) => {
			var t = hS(), n = R(t), r = (e) => {
				var t = mS();
				V((e) => t.disabled = e, [() => (H(f), U(() => !!H(f)))]), W("click", t, () => x("strategy.review.reconcile", H(d).id).catch(() => void 0)), K(e, t);
			};
			J(n, (e) => {
				H(d), U(() => H(d).status === "drafting") && e(r);
			});
			var i = z(n, 2), a = z(L(i), 2), o = L(a), s = L(o, !0);
			N(o);
			var c = z(o), l = L(c, !0);
			N(c);
			var u = z(c), p = L(u);
			N(u), N(a), N(i), V((e) => {
				q(s, (H(d), U(() => H(d).reviewKind === "idea-search" ? "Searching for independent directions" : "Reviewing the epoch ledger"))), q(l, (H(d), U(() => H(d).triggerReason))), q(p, `${H(d), U(() => H(d).requestSource) ?? ""} · cap ${e ?? ""} · frozen bundle ${H(d), U(() => H(d).bundleDigest || "being prepared") ?? ""}`);
			}, [() => (H(d), U(() => Number(H(d).resourceCap || 0).toLocaleString()))]), K(e, t);
		}, ee = (e) => {
			var t = TS(), n = L(t), r = L(n), i = L(r), c = L(i);
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
				var n = gS(), r = L(n), i = L(r, !0);
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
				var n = bS(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = (e) => {
					var n = vS();
					Y(n, 5, () => (H(t), U(() => H(t)[1])), _a, (e, t) => {
						var n = _S(), r = L(n, !0);
						N(n), V(() => q(r, H(t))), K(e, n);
					}), N(n), K(e, n);
				}, s = /* @__PURE__ */ P(() => (H(t), U(() => Array.isArray(H(t)[1]) && H(t)[1].length))), c = (e) => {
					K(e, yS());
				};
				J(a, (e) => {
					H(s) ? e(o) : e(c, -1);
				}), N(n), V((e) => {
					X(n, 1, e, "svelte-1ull9g0"), q(i, (H(t), U(() => H(t)[0])));
				}, [() => (H(t), U(() => `strategy-action-${String(H(t)[0]).toLowerCase()}`))]), K(e, n);
			}), N(D);
			var O = z(D, 2), k = (e) => {
				var t = SS(), n = L(t), r = L(n);
				N(n);
				var i = z(n);
				Y(i, 5, () => (H(o), U(() => H(o).custodyCandidates)), _a, (e, t) => {
					var n = xS(), r = L(n), i = L(r, !0);
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
			var A = z(O, 2), j = L(A), ee = z(L(j)), M = L(ee, !0);
			N(ee);
			var te = z(ee), ne = L(te);
			N(te), N(j);
			var re = z(j, 2), ie = (e) => {
				var t = CS(), n = R(t), r = L(n);
				$a(r), Ke(), N(n);
				var i = z(n, 2), a = L(i), o = z(a), s = L(o, !0);
				N(o), N(i), V((e, t) => {
					a.disabled = e, o.disabled = t, q(s, H(f) === "strategy.proposal.activate" ? "Activating revision…" : "Activate new epoch");
				}, [() => (H(f), U(() => !!H(f))), () => (H(p), H(f), U(() => !H(p) || !!H(f)))]), co(r, () => H(p), (e) => I(p, e)), W("click", a, w), W("click", o, C), K(e, t);
			}, ae = (e) => {
				var t = wS();
				V((e) => t.disabled = e, [() => (H(f), U(() => !!H(f)))]), W("click", t, w), K(e, t);
			};
			J(re, (e) => {
				H(u), U(() => H(u).activationAvailable) ? e(ie) : e(ae, -1);
			}), N(A), N(t), V((e, t) => {
				q(c, `${e ?? ""} · ${H(a), U(() => H(a).assessment?.epochStatus || "COMPLETE") ?? ""}`), q(h, (H(a), U(() => H(a).summary || "Independent strategy proposal"))), q(_, t), q(x, (H(o), U(() => H(o).epochLabel))), q(T, (H(o), U(() => H(o).epochObjective))), q(M, (H(a), U(() => H(a).operatorDecision))), q(ne, `Activation records revision ${H(l), U(() => H(l).strategy.charter.revision + 1) ?? ""} and resets measurement boundaries. Campaign phase and dispatch state remain unchanged.`);
			}, [() => (H(d), U(() => H(d).reviewKind?.replaceAll("-", " ") || "REVIEW")), () => (H(a), U(() => H(a).recommendation?.replaceAll("_", " ")))]), K(e, t);
		};
		J(k, (e) => {
			H(d) ? (H(d), U(() => H(d).status === "drafting" || H(d).status === "queued") ? e(j, 1) : (H(d), U(() => H(d).status === "drafted") && e(ee, 2))) : e(A);
		});
		var M = z(k, 2), te = (e) => {
			var t = ES(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `strategy-workspace-feedback ${H(y) ?? ""}`, "svelte-1ull9g0"), q(n, H(v));
			}), K(e, t);
		};
		J(M, (e) => {
			H(v) && e(te);
		});
		var ne = z(M, 2), re = (e) => {
			var t = OS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(u), U(() => H(u).charterHistory)), _a, (e, t) => {
				var n = DS(), r = L(n), i = L(r);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e) => {
					q(i, `REV ${H(t), U(() => H(t).revision) ?? ""}`), q(s, (H(t), U(() => H(t).charter.epoch?.label || "Campaign charter"))), q(l, `${H(t), U(() => H(t).actor) ?? ""} · ${e ?? ""}`);
				}, [() => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(u), U(() => H(u).charterHistory.length) ?? ""} revision${H(u), U(() => H(u).charterHistory.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(ne, (e) => {
			H(u), U(() => H(u).charterHistory?.length) && e(re);
		});
		var ie = z(ne, 2), ae = (e) => {
			var t = AS(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(u), U(() => H(u).reviews)), _a, (e, t) => {
				var n = kS(), r = L(n), i = L(r, !0);
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
		J(ie, (e) => {
			H(u), U(() => H(u).reviews?.length) && e(ae);
		}), N(O), N(t), V(() => {
			t.open = H(c), q(T, `Charter revision ${H(l), U(() => H(l).strategy.charter.revision) ?? ""}`), q(D, (H(d), U(() => H(d)?.status === "drafting" ? "SOL REVIEW RUNNING" : H(d)?.status === "drafted" ? "HUMAN GATE" : "NO STRATEGY JOB RUNNING")));
		}), K(e, t);
	};
	J(E, (e) => {
		H(l), H(u), U(() => H(l)?.strategy && H(u)) && e(D);
	}), K(e, T), xt(), i();
}
//#endregion
//#region src/ui/CustodyService.svelte
Zi(["click"]), Ho();
var NS = /* @__PURE__ */ G("<p class=\"custody-input-blocker svelte-pcnttw\"><strong>INPUTS REQUIRED:</strong> </p>"), PS = /* @__PURE__ */ G("<p class=\"svelte-pcnttw\"> </p>"), FS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\"> </span>"), IS = /* @__PURE__ */ G("<li class=\"svelte-pcnttw\"> </li>"), LS = /* @__PURE__ */ G("<section><header class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">WHAT HAPPENED</span><strong class=\"svelte-pcnttw\"> </strong></header> <p class=\"svelte-pcnttw\"> </p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">RECOMMENDED NEXT</span><b class=\"svelte-pcnttw\"> </b></div> <small class=\"svelte-pcnttw\"> </small></section>"), RS = /* @__PURE__ */ G("<button class=\"primary-button compact svelte-pcnttw\"> </button>"), zS = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\"> </button>"), BS = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Contract reshape required</button>"), VS = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\" disabled=\"\">Queued · custody slot busy</button>"), HS = /* @__PURE__ */ G("<code class=\"svelte-pcnttw\"> </code>"), US = /* @__PURE__ */ G("<b class=\"svelte-pcnttw\"> </b><p class=\"svelte-pcnttw\"> </p>", 1), WS = /* @__PURE__ */ G("<div class=\"custody-receipt-review svelte-pcnttw\"><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">MEASURED RESULT</span><strong class=\"svelte-pcnttw\"> </strong></div><b class=\"svelte-pcnttw\"> </b></header> <div class=\"custody-receipt-metrics svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span><span class=\"svelte-pcnttw\"> </span></div> <!> <details class=\"svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect checks, worktree, and immutable bindings</summary><div class=\"svelte-pcnttw\"><b class=\"svelte-pcnttw\">Producer</b><code class=\"svelte-pcnttw\"> </code><b class=\"svelte-pcnttw\">Worktree</b><code class=\"svelte-pcnttw\"> </code><!></div></details> <footer class=\"svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\">Reject result</button><button class=\"primary-button svelte-pcnttw\"> </button></footer> <small class=\"svelte-pcnttw\">Landing rechecks the exact receipt and clean checkout, then cherry-picks only the frozen producer commit. It never pushes or promotes a claim.</small></div>"), GS = /* @__PURE__ */ G("<div><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <strong class=\"svelte-pcnttw\"> </strong> <small class=\"svelte-pcnttw\"> </small></div> <!></div> <!>", 1), KS = /* @__PURE__ */ G("<button class=\"outline-button compact svelte-pcnttw\">Park</button> <button class=\"primary-button svelte-pcnttw\"> </button>", 1), qS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\"> </span><button class=\"outline-button compact svelte-pcnttw\">Park</button>", 1), JS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">Research continues independently while this isolated steward works.</span>"), YS = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">The measured receipt above has no landing authority until you accept it.</span>"), XS = /* @__PURE__ */ G("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"primary-button svelte-pcnttw\"> </button></div>"), ZS = /* @__PURE__ */ G("<button class=\"primary-button svelte-pcnttw\"> </button>"), QS = /* @__PURE__ */ G("<div class=\"custody-footer-actions svelte-pcnttw\"><!> <!></div>"), $S = /* @__PURE__ */ G("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"primary-button svelte-pcnttw\">Park until macOS is available</button></div>"), eC = /* @__PURE__ */ G("<div class=\"custody-footer-actions svelte-pcnttw\"><button class=\"outline-button compact svelte-pcnttw\"> </button><button class=\"primary-button svelte-pcnttw\"> </button></div>"), tC = /* @__PURE__ */ G("<div class=\"custody-footer-actions svelte-pcnttw\"><!></div>"), nC = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\"> </span> <!>", 1), rC = /* @__PURE__ */ G("<span class=\"svelte-pcnttw\">Outside the active service queue.</span><button class=\"outline-button compact svelte-pcnttw\">Restore to inbox</button>", 1), iC = /* @__PURE__ */ G("<article><header class=\"svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><strong class=\"svelte-pcnttw\"> </strong></div> <b> </b></header> <p class=\"svelte-pcnttw\"> </p> <!> <!> <div class=\"custody-item-facts svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <span class=\"svelte-pcnttw\"> </span> <!></div> <details class=\"custody-contract svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Inspect acceptance contract <strong class=\"svelte-pcnttw\"> </strong></summary> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ACCEPT WHEN</span><ul class=\"svelte-pcnttw\"></ul></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ALLOWED PATHS</span><code class=\"svelte-pcnttw\"> </code></div> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">HARD STOP</span><p class=\"svelte-pcnttw\"> </p></div></details> <!> <!> <footer class=\"svelte-pcnttw\"><!></footer></article>"), aC = /* @__PURE__ */ G("<div class=\"custody-inbox svelte-pcnttw\"></div>"), oC = /* @__PURE__ */ G("<div class=\"custody-empty svelte-pcnttw\"><strong class=\"svelte-pcnttw\">No custody contracts are queued</strong><p class=\"svelte-pcnttw\">Future strategy reviews can stage bounded candidates here. Until then, the service has no authority and consumes no resources.</p></div>"), sC = /* @__PURE__ */ G("<li class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"> </span><div class=\"svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><small class=\"svelte-pcnttw\"> </small></div></li>"), cC = /* @__PURE__ */ G("<details class=\"custody-protocol-history svelte-pcnttw\"><summary class=\"svelte-pcnttw\">Custody lease and receipt history <strong> </strong></summary><ol class=\"svelte-pcnttw\"></ol></details>"), lC = /* @__PURE__ */ G("<div class=\"custody-violations svelte-pcnttw\"><strong class=\"svelte-pcnttw\"> </strong><!></div>"), uC = /* @__PURE__ */ G("<div role=\"status\"> </div>"), dC = /* @__PURE__ */ G("<details id=\"custody-service\" class=\"custody-service svelte-pcnttw\"><summary class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\"><small class=\"svelte-pcnttw\">CUSTODY SERVICE</small><strong class=\"svelte-pcnttw\"> </strong></span> <span class=\"custody-summary-counts svelte-pcnttw\"><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><b class=\"svelte-pcnttw\"> </b><i class=\"svelte-pcnttw\">SEPARATE EXECUTOR</i></span></summary> <div class=\"custody-body svelte-pcnttw\"><div class=\"custody-boundary svelte-pcnttw\"><div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">ADAPTER</span><strong class=\"svelte-pcnttw\">Terra local steward</strong><small class=\"svelte-pcnttw\"> </small></div> <p class=\"svelte-pcnttw\">Terra may repair small mechanical or mathematical mistakes only inside the listed paths and acceptance checks. It cannot choose direction, spawn children, promote claims, merge, or push.</p> <div class=\"svelte-pcnttw\"><span class=\"svelte-pcnttw\">AUTOPILOT RULE</span><strong class=\"svelte-pcnttw\">Land verified custody</strong><small class=\"svelte-pcnttw\">active loop may dispatch · only exact landable receipts integrate</small></div></div> <!> <!> <!> <!></div></details>");
function fC(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt(), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F("pending");
	function d(e) {
		let t = String(H(o)?.loop?.error || "");
		return /automatic retry limit/i.test(t) && (!e.task || t.includes(e.task));
	}
	function f(e) {
		return (H(s)?.protocol?.leases || []).filter((t) => t.itemId === e.id);
	}
	function p(e) {
		let t = f(e), n = [e.receipt, ...t.map((e) => e.receipt)].filter(Boolean).sort((e, t) => (t?.checks?.length || 0) - (e?.checks?.length || 0))[0] || {}, r = t.find((e) => Number.isFinite(Number(e.receipt?.usage?.tokens)))?.receipt?.usage?.tokens;
		return Ns(e) ? {
			state: "LEASE POLICY UPDATED",
			summary: "This steward stopped with zero changes because fixed App Server context consumed most of the old " + Ms(e).toLocaleString() + "-token total-turn lease.",
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
		} : Fs(e) ? {
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
		return (H(s)?.items || []).find((t) => t.id !== e.id && (["assigned", "verifying"].includes(t.status) || [
			"confirmed",
			"dispatching",
			"running",
			"finalizing",
			"awaiting_review"
		].includes(t.activeLease?.status))) || null;
	}
	async function h() {
		if (!(!H(o) || H(c) || ![
			"running",
			"paused",
			"attention"
		].includes(H(o).loop?.status || ""))) {
			I(c, "loop:stop"), I(u, "pending"), I(l, "Stopping autopilot while preserving the current custody boundary…");
			try {
				await ns({
					projectId: H(o).id,
					type: "loop.stop",
					scope: "custody-contract-reshape"
				}), I(u, "success"), I(l, "Autopilot stopped here. The failed receipts and dependency remain preserved for contract splitting.");
			} catch (e) {
				I(u, "error"), I(l, e instanceof Error ? e.message : String(e));
			} finally {
				I(c, "");
			}
		}
	}
	async function g(e, t) {
		if (!(!H(o) || H(c) || t.length < 2)) {
			I(c, `${e.id}:reshape`), I(u, "pending"), I(l, `Replacing the oversized contract with ${t.length} bounded successors…`);
			try {
				await ns({
					projectId: H(o).id,
					type: "custody.item.reshape",
					targetId: e.id,
					args: { children: t },
					scope: "custody-contract-reshape"
				}), I(u, "success"), I(l, `The oversized contract was superseded by ${t.length} bounded checks. No steward was started and no campaign artifact changed.`);
			} catch (e) {
				I(u, "error"), I(l, e instanceof Error ? e.message : String(e));
			} finally {
				I(c, "");
			}
		}
	}
	async function _(e, t, n = !1) {
		if (!H(o) || H(c) || t === "park" && e.blocksResearch && !window.confirm("Parking removes this required custody dependency from the active research gate. Continue only if the dependency is no longer wanted.")) return;
		let r = t.startsWith("lease."), i = t.startsWith("receipt."), a = r || i ? `custody.${t}` : `custody.item.${t}`, s = t === "lease.prepare" ? e.id : r ? e.activeLease?.id || "" : e.id, d = i ? e.activeLease?.id || "" : s;
		if (d) {
			I(c, `${d}:${t}`), I(u, "pending"), I(l, t === "promote" ? "Checking the immutable custody contract…" : t === "park" ? "Parking this service item…" : t === "restore" ? "Returning this item to the proposed inbox…" : t === "lease.prepare" ? "Freezing the exact revision-bound custody lease…" : t === "lease.confirm" ? "Confirming the exact lease digest…" : t === "lease.dispatch" ? "Creating the detached worktree and starting one Terra steward…" : t === "lease.reconcile" ? "Reconciling the App Server turn and durable custody receipt…" : t === "lease.simulate" ? "Generating a deterministic zero-effect protocol receipt…" : t === "lease.replay" ? "Replaying and verifying the persisted lease and receipt digests…" : t === "receipt.land" ? "Rechecking and landing the exact isolated producer commit…" : "Rejecting this receipt without landing its changes…");
			try {
				let i = await ns({
					projectId: H(o).id,
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
						projectId: H(o).id,
						type: "custody.lease.prepare",
						targetId: e.id,
						scope: "custody-service-retry"
					}));
					let n = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					n?.status === "prepared" && (i = await ns({
						projectId: H(o).id,
						type: "custody.lease.confirm",
						targetId: n.id,
						args: { leaseDigest: n.leaseDigest },
						scope: "custody-service-retry"
					}));
					let r = i.project.custody?.items?.find((t) => t.id === e.id)?.activeLease;
					r?.status === "confirmed" && await ns({
						projectId: H(o).id,
						type: "custody.lease.dispatch",
						targetId: r.id,
						args: { leaseDigest: r.leaseDigest },
						scope: "custody-service-retry"
					});
				}
				I(u, "success"), I(l, t === "promote" && n ? "A fresh exact lease is running with Terra under the unchanged custody contract." : t === "promote" ? "Marked ready. No steward was started and campaign execution was not changed." : t === "park" ? "Item parked outside the active service inbox." : t === "restore" ? "Item restored as a proposed custody contract." : t === "lease.prepare" ? "Immutable lease prepared. No steward has started; review and confirm the exact digest next." : t === "lease.confirm" ? "Exact lease confirmed. The slot is reserved, but no steward has started yet." : t === "lease.dispatch" ? "One Terra steward started inside the lease-bound detached worktree." : t === "lease.reconcile" ? "The interrupted steward state was reconciled into a durable receipt boundary." : t === "lease.simulate" ? "Deterministic zero-effect receipt recorded. The custody item remains ready." : t === "lease.replay" ? "Lease and receipt replay verified with no real effects." : t === "receipt.land" ? "The reviewed custody receipt landed locally. Nothing was pushed and no claim was promoted." : "Receipt rejected. Its isolated worktree was not landed.");
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
		I(a, H(s)?.items?.filter((e) => e.status !== "complete") || []);
	}), Br(), vo();
	var v = ca(), y = R(v), b = (e) => {
		var t = dC(), n = L(t), r = L(n), i = z(L(r)), f = L(i, !0);
		N(i), N(r);
		var v = z(r, 2), y = L(v), b = L(y);
		N(y);
		var x = z(y), S = L(x);
		N(x);
		var C = z(x), w = L(C);
		N(C);
		var T = z(C), E = L(T);
		N(T), Ke(), N(v), N(n);
		var D = z(n, 2), O = L(D), k = L(O), A = z(L(k), 2), j = L(A, !0);
		N(A), N(k), Ke(4), N(O);
		var ee = z(O, 2), M = (e) => {
			var t = aC();
			Y(t, 5, () => H(a), (e) => e.id, (e, t) => {
				let n = /* @__PURE__ */ Cn(() => (H(t), U(() => p(H(t))))), r = /* @__PURE__ */ Cn(() => (H(t), U(() => m(H(t))))), i = /* @__PURE__ */ Cn(() => (Si(Is), H(t), U(() => Is(H(t))))), a = /* @__PURE__ */ Cn(() => (Si(Fs), H(t), H(o), U(() => Fs(H(t), String(H(o)?.loop?.error || ""))))), l = /* @__PURE__ */ Cn(() => (H(o), H(t), U(() => Number(H(o)?.resources?.ledger?.remainingBeforeCommitments || 0) >= Number(H(t).tokenCap || 0))));
				var u = iC();
				let f;
				var v = L(u), y = L(v), b = L(y), x = L(b);
				N(b);
				var S = z(b), C = L(S, !0);
				N(S), N(y);
				var w = z(y, 2), T = L(w, !0);
				N(w), N(v);
				var E = z(v, 2), D = L(E, !0);
				N(E);
				var O = z(E, 2), k = (e) => {
					var n = NS(), r = z(L(n));
					N(n), V(() => q(r, ` ${H(t), U(() => H(t).inputReadiness.reason) ?? ""}`)), K(e, n);
				};
				J(O, (e) => {
					H(t), U(() => H(t).inputReadiness?.ready === !1) && e(k);
				});
				var A = z(O, 2), j = (e) => {
					var n = PS(), r = L(n);
					N(n), V((e) => q(r, `Entire repair family: ${H(t), U(() => H(t).lineageCost.attempts) ?? ""} attempts · ${e ?? ""} known tokens · ${H(t), U(() => H(t).lineageCost.unreported) ?? ""} unknown · ${H(t), U(() => H(t).lineageCost.landed) ?? ""} landed`), [() => (H(t), U(() => Number(H(t).lineageCost.knownTokens).toLocaleString()))]), K(e, n);
				};
				J(A, (e) => {
					H(t), U(() => H(t).lineageCost) && e(j);
				});
				var ee = z(A, 2), M = L(ee), te = L(M, !0);
				N(M);
				var ne = z(M, 2), re = L(ne);
				N(ne);
				var ie = z(ne, 2), ae = L(ie);
				N(ie);
				var oe = z(ie, 2), se = L(oe, !0);
				N(oe);
				var ce = z(oe, 2), le = (e) => {
					var n = FS(), r = L(n);
					N(n), V(() => q(r, `waiting on ${H(t), U(() => H(t).missingDependencies?.length || 1) ?? ""} predecessor receipt${H(t), U(() => H(t).missingDependencies?.length === 1 ? "" : "s") ?? ""}`)), K(e, n);
				};
				J(ce, (e) => {
					H(t), U(() => !H(t).dependenciesSatisfied) && e(le);
				}), N(ee);
				var ue = z(ee, 2), de = L(ue), fe = z(L(de)), pe = L(fe, !0);
				N(fe), N(de);
				var me = z(de, 2), he = z(L(me));
				Y(he, 5, () => (H(t), U(() => H(t).acceptance.acceptanceCriteria)), _a, (e, t) => {
					var n = IS(), r = L(n, !0);
					N(n), V(() => q(r, H(t))), K(e, n);
				}), N(he), N(me);
				var ge = z(me, 2), _e = z(L(ge)), ve = L(_e, !0);
				N(_e), N(ge);
				var ye = z(ge, 2), be = z(L(ye)), xe = L(be, !0);
				N(be), N(ye), N(ue);
				var Se = z(ue, 2), Ce = (e) => {
					var t = LS(), r = L(t), i = z(L(r)), a = L(i, !0);
					N(i), N(r);
					var o = z(r, 2), s = L(o, !0);
					N(o);
					var c = z(o, 2), l = z(L(c)), u = L(l, !0);
					N(l), N(c);
					var d = z(c, 2), f = L(d);
					N(d), N(t), V((e) => {
						X(t, 1, (Si(H(n)), U(() => `custody-failure ${H(n).kind}`)), "svelte-pcnttw"), q(a, (Si(H(n)), U(() => H(n).state))), q(s, (Si(H(n)), U(() => H(n).summary))), q(u, (Si(H(n)), U(() => H(n).next))), q(f, `${Si(H(n)), U(() => H(n).attempts) ?? ""} lease attempt${Si(H(n)), U(() => H(n).attempts === 1 ? "" : "s") ?? ""}${e ?? ""} · 0 changes landed`);
					}, [() => (Si(H(n)), U(() => H(n).tokens ? ` · latest measured ${Number(H(n).tokens).toLocaleString()} tokens` : ""))]), K(e, t);
				}, we = /* @__PURE__ */ P(() => (H(t), U(() => ["blocked", "failed"].includes(H(t).status))));
				J(Se, (e) => {
					H(we) && e(Ce);
				});
				var Te = z(Se, 2), Ee = (e) => {
					var n = GS(), o = R(n);
					let s;
					var l = L(o), u = L(l), d = L(u, !0);
					N(u);
					var f = z(u, 2), p = L(f, !0);
					N(f);
					var m = z(f, 2), h = L(m, !0);
					N(m), N(l);
					var v = z(l, 2), y = (e) => {
						var n = RS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).id}:lease.prepare` ? "Freezing…" : "Freeze custody lease")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.prepare")), K(e, n);
					}, b = (e) => {
						var n = zS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.simulate` ? "Simulating…" : "Simulate zero-effect receipt")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.simulate")), K(e, n);
					}, x = (e) => {
						var n = ca(), r = R(n), a = (e) => {
							var n = RS(), r = L(n, !0);
							N(n), V((e) => {
								n.disabled = e, q(r, (H(c), H(t), Si(H(i)), U(() => H(c) === `${H(t).id}:reshape` ? "Splitting…" : `Split into ${H(i).length} bounded checks`)));
							}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => g(H(t), H(i))), K(e, n);
						}, o = (e) => {
							K(e, BS());
						};
						J(r, (e) => {
							Si(H(i)), U(() => H(i).length) ? e(a) : e(o, -1);
						}), K(e, n);
					}, S = (e) => {
						K(e, VS());
					}, C = (e) => {
						var n = RS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.confirm` ? "Confirming…" : "Confirm exact lease")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.confirm")), K(e, n);
					}, w = (e) => {
						var n = RS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.dispatch` ? "Starting…" : "Dispatch Terra steward")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.dispatch")), K(e, n);
					}, T = (e) => {
						var n = zS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.reconcile` ? "Reconciling…" : "Recheck interrupted steward")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.reconcile")), K(e, n);
					}, E = /* @__PURE__ */ P(() => (H(t), U(() => ["running", "finalizing"].includes(H(t).activeLease.status) && Date.now() - Date.parse(H(t).activeLease.updatedAt || H(t).activeLease.startedAt || "") >= 6e4))), D = (e) => {
						var n = zS(), r = L(n, !0);
						N(n), V((e) => {
							n.disabled = e, q(r, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:lease.replay` ? "Verifying replay…" : "Replay & verify receipt")));
						}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => _(H(t), "lease.replay")), K(e, n);
					};
					J(v, (e) => {
						H(t), U(() => !H(t).activeLease) ? e(y) : (H(t), U(() => H(t).activeLease.lease?.adapter?.executionMode === "disconnected" && H(t).activeLease.status === "prepared") ? e(b, 1) : (H(t), Si(H(a)), U(() => H(t).activeLease.status === "prepared" && H(a)) ? e(x, 2) : (H(t), Si(H(r)), U(() => H(t).activeLease.status === "prepared" && H(r)) ? e(S, 3) : (H(t), U(() => H(t).activeLease.status === "prepared") ? e(C, 4) : (H(t), U(() => H(t).activeLease.status === "confirmed") ? e(w, 5) : H(E) ? e(T, 6) : (H(t), U(() => H(t).activeLease.status === "simulated") && e(D, 7)))))));
					}), N(o);
					var O = z(o, 2), k = (e) => {
						var n = WS(), r = L(n), i = L(r), a = z(L(i)), o = L(a, !0);
						N(a), N(i);
						var s = z(i), l = L(s, !0);
						N(s), N(r);
						var u = z(r, 2), d = L(u), f = L(d);
						N(d);
						var p = z(d), m = L(p);
						N(p);
						var h = z(p), g = L(h);
						N(h);
						var v = z(h), y = L(v);
						N(v), N(u);
						var b = z(u, 2), x = (e) => {
							var n = HS(), r = L(n, !0);
							N(n), V((e) => q(r, e), [() => (H(t), U(() => H(t).activeLease.receipt.effects.changedPaths.join(" · ")))]), K(e, n);
						};
						J(b, (e) => {
							H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length) && e(x);
						});
						var S = z(b, 2), C = z(L(S)), w = z(L(C)), T = L(w, !0);
						N(w);
						var E = z(w, 2), D = L(E, !0);
						N(E), Y(z(E), 1, () => (H(t), U(() => H(t).activeLease.receipt?.checks || [])), _a, (e, t) => {
							var n = US(), r = R(n), i = L(r, !0);
							N(r);
							var a = z(r), o = L(a, !0);
							N(a), V(() => {
								q(i, (H(t), U(() => H(t).status))), q(o, (H(t), U(() => H(t).detail)));
							}), K(e, n);
						}), N(C), N(S);
						var O = z(S, 2), k = L(O), A = z(k), j = L(A, !0);
						N(A), N(O), Ke(2), N(n), V((e, n, r) => {
							q(o, (H(t), U(() => H(t).activeLease.receipt?.summary || "Custody result ready"))), q(l, (H(t), U(() => H(t).activeLease.receipt?.status))), q(f, `${H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length || 0) ?? ""} changed path${H(t), U(() => H(t).activeLease.receipt?.effects?.changedPaths?.length === 1 ? "" : "s") ?? ""}`), q(m, `${H(t), U(() => H(t).activeLease.receipt?.usage?.tokens ?? "unmetered") ?? ""} tokens`), q(g, `${e ?? ""} min`), q(y, `${H(t), U(() => H(t).activeLease.verification?.warnings?.length || 0) ?? ""} warning${H(t), U(() => H(t).activeLease.verification?.warnings?.length === 1 ? "" : "s") ?? ""}`), q(T, (H(t), U(() => H(t).activeLease.producerCommit || "verification-only · no file commit"))), q(D, (H(t), U(() => H(t).activeLease.worktreePath))), k.disabled = n, A.disabled = r, q(j, (H(c), H(t), U(() => H(c) === `${H(t).activeLease.id}:receipt.land` ? "Landing…" : H(t).activeLease.producerCommit ? "Accept & land locally" : "Accept verification receipt")));
						}, [
							() => (H(t), U(() => Math.ceil(H(t).activeLease.receipt?.usage?.minutes || 0))),
							() => (H(c), U(() => !!H(c))),
							() => (H(c), H(t), U(() => !!H(c) || !H(t).activeLease.verification?.landable))
						]), W("click", k, () => _(H(t), "receipt.reject")), W("click", A, () => _(H(t), "receipt.land")), K(e, n);
					};
					J(O, (e) => {
						H(t), U(() => H(t).activeLease?.status === "awaiting_review") && e(k);
					}), V(() => {
						s = X(o, 1, "custody-protocol-lab execution svelte-pcnttw", null, s, { attention: H(t).activeLease?.status === "awaiting_review" }), q(d, (H(t), Si(H(a)), Si(H(r)), U(() => H(t).activeLease?.status === "prepared" && H(a) ? "CONTRACT RESHAPE REQUIRED" : H(t).activeLease?.status === "prepared" && H(r) ? "QUEUED CUSTODY LEASE" : H(t).activeLease?.status === "awaiting_review" ? "RECEIPT LANDING GATE" : H(t).activeLease?.status === "running" || H(t).activeLease?.status === "finalizing" ? "ISOLATED STEWARD ACTIVE" : "CUSTODY ACTION RAIL"))), q(p, (H(t), Si(H(a)), Si(H(i)), Si(H(r)), U(() => H(t).activeLease ? H(t).activeLease.status === "prepared" && H(a) ? H(i).length ? `Replace with ${H(i).length} bounded successor checks` : "Hold for a smaller successor contract" : H(t).activeLease.status === "prepared" && H(r) ? `Waiting for ${H(r).task}` : H(t).activeLease.status === "prepared" ? "2. Confirm this revision and contract" : H(t).activeLease.status === "confirmed" ? "3. Dispatch one bounded Terra steward" : H(t).activeLease.status === "running" ? "Steward working in detached custody" : H(t).activeLease.status === "finalizing" ? "Measuring paths, usage, and checks" : H(t).activeLease.status === "awaiting_review" ? "4. Review and land—or reject" : `Lease ${H(t).activeLease.status}` : "1. Freeze the exact lease"))), q(h, (H(t), Si(H(a)), Si(H(r)), U(() => H(t).activeLease?.status === "prepared" && H(a) ? "Prior zero-effect attempts exceeded the lease. This supersedes the prepared retry without bypassing its dependency." : H(t).activeLease?.status === "prepared" && H(r) ? "This immutable lease is preserved. Autopilot will continue it after the active receipt releases the single Terra slot." : H(t).activeLease?.receiptDigest || H(t).activeLease?.leaseDigest || "Preparing a lease changes no files and starts no worker.")));
					}), K(e, n);
				}, De = /* @__PURE__ */ P(() => (H(t), U(() => [
					"ready",
					"assigned",
					"verifying"
				].includes(H(t).status))));
				J(Te, (e) => {
					H(De) && e(Ee);
				});
				var Oe = z(Te, 2), ke = L(Oe), Ae = (e) => {
					var n = KS(), r = R(n), i = z(r, 2), a = L(i, !0);
					N(i), V((e, n) => {
						r.disabled = e, i.disabled = n, q(a, (H(c), H(t), U(() => H(c) === `${H(t).id}:promote` ? "Checking contract…" : H(t).dependenciesSatisfied ? "Mark ready for steward" : `Waiting for ${H(t).missingDependencies?.[0]?.task || "predecessor"}`)));
					}, [() => (H(c), U(() => !!H(c))), () => (H(c), H(t), U(() => !!H(c) || !H(t).eligibleToReady))]), W("click", r, () => _(H(t), "park")), W("click", i, () => _(H(t), "promote")), K(e, n);
				}, je = (e) => {
					var n = qS(), r = R(n), i = L(r, !0);
					N(r);
					var a = z(r);
					V((e) => {
						q(i, (H(t), U(() => H(t).activeLease ? "Lease sequence is controlled above." : "Eligible for the separate custody executor; still not dispatched."))), a.disabled = e;
					}, [() => (H(c), H(t), U(() => !!H(c) || !!H(t).activeLease))]), W("click", a, () => _(H(t), "park")), K(e, n);
				}, Me = (e) => {
					K(e, JS());
				}, Ne = (e) => {
					K(e, YS());
				}, Pe = (e) => {
					var r = nC(), a = R(r), s = L(a, !0);
					N(a);
					var u = z(a, 2), f = (e) => {
						var n = XS(), r = L(n), i = L(r, !0);
						N(r), N(n), V((e) => {
							r.disabled = e, q(i, H(c) ? "Starting Terra…" : H(l) ? "Retry with corrected lease" : "Fresh epoch required");
						}, [() => (H(c), Si(H(l)), H(t), U(() => !!H(c) || !H(l) || !H(t).eligibleToRetry))]), W("click", r, () => _(H(t), "promote", !0)), K(e, n);
					}, p = (e) => {
						var n = QS(), r = L(n), a = (e) => {
							var n = ZS(), r = L(n, !0);
							N(n), V((e) => {
								n.disabled = e, q(r, (H(c), H(t), Si(H(i)), U(() => H(c) === `${H(t).id}:reshape` ? "Splitting…" : `Split into ${H(i).length} bounded checks`)));
							}, [() => (H(c), U(() => !!H(c)))]), W("click", n, () => g(H(t), H(i))), K(e, n);
						};
						J(r, (e) => {
							Si(H(i)), U(() => H(i).length) && e(a);
						});
						var s = z(r, 2), l = (e) => {
							var t = zS(), n = L(t, !0);
							N(t), V((e) => {
								t.disabled = e, q(n, H(c) === "loop:stop" ? "Stopping…" : "Stop at this boundary");
							}, [() => (H(c), U(() => !!H(c)))]), W("click", t, h), K(e, t);
						}, u = /* @__PURE__ */ P(() => (H(o), U(() => [
							"running",
							"paused",
							"attention"
						].includes(H(o)?.loop?.status || ""))));
						J(s, (e) => {
							H(u) && e(l);
						}), N(n), K(e, n);
					}, m = (e) => {
						var n = $S(), r = L(n);
						N(n), V((e) => r.disabled = e, [() => (H(c), U(() => !!H(c)))]), W("click", r, () => _(H(t), "park")), K(e, n);
					}, v = (e) => {
						var n = eC(), r = L(n), i = L(r, !0);
						N(r);
						var a = z(r), o = L(a, !0);
						N(a), N(n), V((e, n) => {
							r.disabled = e, q(i, (H(t), U(() => H(t).blocksResearch ? "Remove dependency…" : "Park"))), a.disabled = n, q(o, H(c) ? "Starting Terra…" : "Retry with Terra");
						}, [() => (H(c), U(() => !!H(c))), () => (H(c), H(t), U(() => !!H(c) || !H(t).eligibleToRetry))]), W("click", r, () => _(H(t), "park")), W("click", a, () => _(H(t), "promote", !0)), K(e, n);
					}, y = (e) => {
						var t = tC(), n = L(t), r = (e) => {
							var t = zS(), n = L(t, !0);
							N(t), V((e) => {
								t.disabled = e, q(n, H(c) === "loop:stop" ? "Stopping…" : "Stop at this boundary");
							}, [() => (H(c), U(() => !!H(c)))]), W("click", t, h), K(e, t);
						}, i = /* @__PURE__ */ P(() => (H(o), U(() => [
							"running",
							"paused",
							"attention"
						].includes(H(o)?.loop?.status || ""))));
						J(n, (e) => {
							H(i) && e(r);
						}), N(t), K(e, t);
					};
					J(u, (e) => {
						Si(H(n)), U(() => H(n).kind === "rebudget") ? e(f) : (Si(H(n)), U(() => H(n).kind === "reshape") ? e(p, 1) : (Si(H(n)), U(() => H(n).kind === "wait-for-mac") ? e(m, 2) : (Si(H(n)), U(() => H(n).kind === "retry") ? e(v, 3) : e(y, -1))));
					}), V((e) => q(s, e), [() => (Si(H(n)), Si(H(l)), H(t), U(() => H(n).kind === "rebudget" ? H(l) ? "The corrected total-turn envelope is available. Retry this exact zero-effect contract once." : "The lease policy is corrected, but the current epoch is exhausted. Open a fresh resource envelope from the primary action rail first." : d(H(t)) ? "Automatic retries are exhausted. Split or resize this exact contract; parking would bypass the dependency." : H(t).receipt?.effects?.changedPaths?.length ? "The steward stopped after bounded changes; inspect before retrying." : "Nothing landed. Retry the same bounded contract, or park only if this dependency is no longer wanted."))]), K(e, r);
				}, Fe = /* @__PURE__ */ P(() => (H(t), U(() => ["blocked", "failed"].includes(H(t).status)))), Ie = (e) => {
					var n = rC(), r = z(R(n));
					V((e) => r.disabled = e, [() => (H(c), U(() => !!H(c)))]), W("click", r, () => _(H(t), "restore")), K(e, n);
				};
				J(ke, (e) => {
					H(t), U(() => H(t).status === "proposed") ? e(Ae) : (H(t), U(() => H(t).status === "ready") ? e(je, 1) : (H(t), U(() => H(t).status === "assigned") ? e(Me, 2) : (H(t), U(() => H(t).status === "verifying") ? e(Ne, 3) : H(Fe) ? e(Pe, 4) : (H(t), U(() => H(t).status === "parked") && e(Ie, 5)))));
				}), N(Oe), N(u), V((e, n) => {
					f = X(u, 1, "svelte-pcnttw", null, f, {
						blocking: H(t).blocksResearch,
						parked: H(t).status === "parked"
					}), q(x, `${H(t), U(() => H(t).urgency) ?? ""} · ${H(t), U(() => H(t).capability) ?? ""} · ${H(t), U(() => H(t).strategicTrack) ?? ""}`), q(C, (H(t), U(() => H(t).task))), X(w, 1, (H(t), U(() => `custody-status-${H(t).status}`)), "svelte-pcnttw"), q(T, e), q(D, (H(t), U(() => H(t).reason))), q(te, (H(t), U(() => H(t).blocksResearch ? "BLOCKS RESEARCH" : "NON-BLOCKING"))), q(re, `repair generation ${H(t), U(() => H(t).repairGeneration) ?? ""}/${H(s), U(() => H(s).policy.maxAutomaticRepairGeneration) ?? ""}`), q(ae, `${H(t), U(() => H(t).effortClass) ?? ""} effort`), q(se, (H(t), U(() => H(t).contractComplete ? "contract complete" : "contract incomplete"))), q(pe, (H(t), U(() => H(t).acceptance.receiptType || "receipt missing"))), q(ve, n), q(xe, (H(t), U(() => H(t).acceptance.stopCondition || "No stop condition declared")));
				}, [() => (H(t), U(() => H(t).status.toUpperCase())), () => (H(t), U(() => H(t).acceptance.allowedPaths.length ? H(t).acceptance.allowedPaths.join(" · ") : "No paths declared"))]), K(e, u);
			}), N(t), K(e, t);
		}, te = (e) => {
			K(e, oC());
		};
		J(ee, (e) => {
			H(a), U(() => H(a).length) ? e(M) : e(te, -1);
		});
		var ne = z(ee, 2), re = (e) => {
			var t = cC(), n = L(t), r = z(L(n)), i = L(r);
			N(r), N(n);
			var a = z(n);
			Y(a, 5, () => (H(s), U(() => H(s).protocol.leases)), _a, (e, t) => {
				var n = sC(), r = L(n), i = L(r, !0);
				N(r);
				var a = z(r), o = L(a), s = L(o, !0);
				N(o);
				var c = z(o), l = L(c);
				N(c), N(a), N(n), V((e, n) => {
					q(i, e), q(s, (H(t), U(() => H(t).receiptDigest || H(t).leaseDigest))), q(l, `${H(t), U(() => H(t).adapterId) ?? ""} · ${n ?? ""}${H(t), U(() => H(t).producerCommit ? " · isolated commit frozen" : H(t).verification?.ok ? " · receipt verified" : "") ?? ""}`);
				}, [() => (H(t), U(() => H(t).status.toUpperCase())), () => (H(t), U(() => new Date(H(t).createdAt).toLocaleString()))]), K(e, n);
			}), N(a), N(t), V(() => q(i, `${H(s), U(() => H(s).protocol.leases.length) ?? ""} lease${H(s), U(() => H(s).protocol.leases.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(ne, (e) => {
			H(s), U(() => H(s).protocol?.leases?.length) && e(re);
		});
		var ie = z(ne, 2), ae = (e) => {
			var t = lC(), n = L(t), r = L(n);
			N(n), Y(z(n), 1, () => (H(s), U(() => H(s).violations)), _a, (e, t) => {
				var n = PS(), r = L(n, !0);
				N(n), V(() => q(r, (H(t), U(() => H(t).detail)))), K(e, n);
			}), N(t), V(() => q(r, `${H(s), U(() => H(s).violations.length) ?? ""} contract warning${H(s), U(() => H(s).violations.length === 1 ? "" : "s") ?? ""}`)), K(e, t);
		};
		J(ie, (e) => {
			H(s), U(() => H(s).violations?.length) && e(ae);
		});
		var oe = z(ie, 2), se = (e) => {
			var t = uC(), n = L(t, !0);
			N(t), V(() => {
				X(t, 1, `custody-feedback ${H(u) ?? ""}`, "svelte-pcnttw"), q(n, H(l));
			}), K(e, t);
		};
		J(oe, (e) => {
			H(l) && e(se);
		}), N(D), N(t), V(() => {
			t.open = (H(s), U(() => H(s).counts.open > 0)), q(f, (H(s), U(() => H(s).counts.open ? `${H(s).counts.open} item${H(s).counts.open === 1 ? "" : "s"} in the service inbox` : "Mechanical work has its own boundary"))), q(b, `${H(s), U(() => H(s).counts.blocking) ?? ""} blocking`), q(S, `${H(s), U(() => H(s).counts.active) ?? ""} active`), q(w, `${H(s), U(() => H(s).counts.landed || 0) ?? ""} landed`), q(E, `${H(s), U(() => H(s).counts.superseded || 0) ?? ""} superseded`), q(j, (H(s), U(() => H(s).executorConnected ? "ready on demand · isolated worktree" : "simulation only")));
		}), K(e, t);
	};
	J(y, (e) => {
		H(s) && e(b);
	}), K(e, v), xt(), i();
}
//#endregion
//#region src/ui/App.svelte
Zi(["click"]), Ho();
var pC = /* @__PURE__ */ G("<span class=\"access-identity\"><b> </b> </span>"), mC = /* @__PURE__ */ G("<section id=\"observer-lanes\" class=\"observer-surface all-jobs-surface\" aria-label=\"All observed agent lanes\"><header><div><p class=\"eyebrow\">ALL JOBS OVERVIEW</p><h2>Every visible lane, in one place</h2></div><span>Read-only across projects · choose a campaign to open its controls</span></header> <!></section>"), hC = /* @__PURE__ */ G("<!> <!> <!> <!> <section class=\"workspace-switchboard\" aria-label=\"Campaign detail drawers\"><header><div><p class=\"eyebrow\">CAMPAIGN DETAIL</p><h2>Explore the campaign</h2></div><span>Evidence, direction, and background</span></header> <details id=\"campaign-context\" class=\"workspace-group\"><summary><span><small>OBJECTIVE & INPUTS</small><strong>Objective, background, and new inputs</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><!> <!> <!></div></details> <details id=\"process-history\" class=\"workspace-group\"><summary><span><small>PROCESS MAP & HISTORY</small><strong>History and automation</strong></span><b>Open drawer</b></summary> <div class=\"workspace-group-body\"><details class=\"autopilot-ledger\"><summary><span><small>AUTOPILOT DETAIL</small><strong>Step ledger, frozen schedule, and advanced controls</strong></span><b>Expand</b></summary> <!> <!></details> <!></div></details> <details id=\"evidence-workspace\" class=\"workspace-group\"><summary><span><small>WAVE & EVIDENCE</small><strong>Results, receipts, and workers</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <section id=\"observer-lanes\" class=\"observer-surface\" aria-label=\"Observed agent lanes\"><header><div><p class=\"eyebrow\">LANE OBSERVER</p><h2>Workers, receipts, and recent history</h2></div><span>Drill down without leaving campaign control</span></header> <!></section></div></details> <details id=\"strategy-workspaces\" class=\"workspace-group\"><summary><span><small>STRATEGY & BRANCHES</small><strong>Direction, budget, and alternatives</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!> <!> <!></div></details> <details id=\"system-workspace\" class=\"workspace-group\"><summary><span><small>SYSTEM & COORDINATION</small><strong>Settings and coordinator</strong></span><b>Open workspace</b></summary> <div class=\"workspace-group-body\"><!> <!></div></details></section>", 1), gC = /* @__PURE__ */ G("<header class=\"topbar\"><a class=\"topbar-brand\" href=\"/\" title=\"Open all jobs\"><p class=\"eyebrow\">CAMPAIGN CONTROL</p> <h1>Lane Watch</h1></a> <span class=\"topbar-context\">Research campaigns</span> <div class=\"connection-wrap\"><!> <button aria-label=\"Refresh all campaign and lane states\">↻</button> <span></span> <span> </span></div></header> <main><!></main>", 1);
function _C(e, t) {
	bt(t, !1);
	let n = () => Kt(Vo, "$campaignState", r), [r, i] = qt();
	wo(() => {
		let e = Bo(), t = ss();
		return () => {
			e(), t();
		};
	}), vo();
	var a = gC(), o = R(a), s = L(o), c = z(s, 4), l = L(c), u = (e) => {
		var t = pC(), r = L(t), i = L(r, !0);
		N(r);
		var a = z(r, 1, !0);
		N(t), V((e) => {
			Z(t, "title", e), q(i, n().access.role), q(a, n().access.identity);
		}, [() => `${n().access.projects.includes("*") ? "Read all projects" : `Read ${n().access.projects.join(", ")}`} · ${n().access.mutableProjects.includes("*") ? "change all projects" : `change ${n().access.mutableProjects.join(", ") || "none"}`}`]), K(e, t);
	};
	J(l, (e) => {
		n().access && e(u);
	});
	var d = z(l, 2);
	let f;
	var p = z(d, 2);
	let m;
	var h = z(p, 2), g = L(h, !0);
	N(h), N(c), N(o);
	var _ = z(o, 2), v = L(_), y = (e) => {
		var t = mC();
		Ds(z(L(t), 2), {}), N(t), K(e, t);
	}, b = (e) => {
		var t = hC(), n = R(t);
		Ex(n, {});
		var r = z(n, 2);
		Zs(r, {});
		var i = z(r, 2);
		zx(i, {});
		var a = z(i, 2);
		Mx(a, {});
		var o = z(a, 2), s = z(L(o), 2), c = z(L(s), 2), l = L(c);
		$x(l, {});
		var u = z(l, 2);
		nc(u, {}), Dc(z(u, 2), {}), N(c), N(s);
		var d = z(s, 2), f = z(L(d), 2), p = L(f), m = z(L(p), 2);
		Sx(m, {}), bx(z(m, 2), {}), N(p), Xb(z(p, 2), {}), N(f), N(d);
		var h = z(d, 2), g = z(L(h), 2), _ = L(g);
		gl(_, {});
		var v = z(_, 2);
		fC(v, {});
		var y = z(v, 2);
		Ds(z(L(y), 2), {}), N(y), N(g), N(h);
		var b = z(h, 2), x = z(L(b), 2), S = L(x);
		Kx(S, {});
		var C = z(S, 2);
		dS(C, {});
		var w = z(C, 2);
		MS(w, {}), zc(z(w, 2), {}), N(x), N(b);
		var T = z(b, 2), E = z(L(T), 2), D = L(E);
		ul(D, {}), el(z(D, 2), {}), N(E), N(T), N(o), K(e, t);
	};
	J(v, (e) => {
		n().selectedProject ? e(b, -1) : e(y);
	}), N(_), V(() => {
		f = X(d, 1, "refresh-button", null, f, { refreshing: n().connection === "refreshing" }), d.disabled = n().connection === "refreshing" || n().access?.canMutate === !1, Z(d, "title", n().access?.canMutate === !1 ? "Viewer access is read-only" : "Refresh all campaign and lane states"), m = X(p, 1, "connection-dot", null, m, {
			connecting: n().connection === "connecting" || n().connection === "refreshing",
			offline: n().connection === "offline" || n().connection === "reconnecting"
		}), q(g, n().connectionLabel);
	}), W("click", s, (e) => {
		e.preventDefault(), No("");
	}), W("click", d, () => Ro().catch(() => void 0)), K(e, a), xt(), i();
}
//#endregion
//#region src/ui/main.ts
Zi(["click"]), la(_C, { target: document.querySelector("#app") });
//#endregion
