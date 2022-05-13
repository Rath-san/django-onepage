// import { doOnVisible } from "./libs/do-on-visible";
// import Splitting from "splitting";
// import { handleTouchEvents } from "./utils/utils";
// import './vendor/menu';
// import YTPlayer from "yt-player";

// const makePlayer = (id, elementId) => {
//     const player = new YTPlayer(elementId);
//     player.load(id);
//     player.setVolume(100);
// };

// const ytTopVideos = Array.from(document.querySelectorAll('.video-iframe'));

// const lazyShow = () => {
//     const imagesDocument = Array.from(document.querySelectorAll(".lazy-show"));

//     imagesDocument.forEach((img) => {
//         if (img.complete && img.src) {
//             img.classList.add("lazy-show__active");
//         }

//         img.onload = () => {
//             img.classList.add("lazy-show__active");
//         };
//     });
// };

// const loadOnVisibleImages = (section) => {
//     const images = Array.from(section.querySelectorAll("picture"));

//     images.forEach((picture) => {
//         const sources = [
//             ...Array.from(picture.querySelectorAll('[data-src]')),
//             ...Array.from(picture.querySelectorAll('[data-srcset]'))
//         ]
//         sources.forEach(s => {
//             if (s.src || s.srcset) return;
//             if (s.dataset.srcset) {
//                 s.srcset = s.dataset.srcset
//             }
//             if (s.dataset.src) {
//                 s.src = s.dataset.src;
//             }
//         })
//     });
// };

// (() => {
//     document.body.classList.add("initialized");

//     const titles = [
//         ...Array.from(document.querySelectorAll(".section__title")),
//         ...Array.from(document.querySelectorAll(".section__display")),
//     ];

//     titles.forEach((title) => {
//         title.style.opacity = 1;
//     });

//     Splitting({
//         target: ".section__title, .section__display, .left",
//         by: "chars",
//     });

//     window.addEventListener("load", () => {
//         document.body.classList.add("ready");

//         const sections = [
//             ...Array.from(document.querySelectorAll("section")),
//             ...Array.from(document.querySelectorAll(".left")),
//             ...Array.from(document.querySelectorAll("footer")),
//         ];

//         sections.forEach((s) => {
//             s.dataset.visible = false;
//         });

//         doOnVisible({
//             sectionSelector: sections,
//             cbIn: (target) => {
//                 target.dataset.visible = true;
//                 loadOnVisibleImages(target);
//             },
//             cbOut: () => {
//             },
//             rootMargin: "-150px",
//         });

//         const prevCards = document.querySelectorAll(".prev-card");

//         doOnVisible({
//             sectionSelector: prevCards,
//             cbIn: (target) => {
//                 target.dataset.rowvisible = true;
//             },
//             cbOut: () => {
//             },
//             rootMargin: "-150px",
//         });

//         ytTopVideos.forEach(v => {
//             makePlayer(v.dataset.id, v);
//         });
//     });

//     const carouselSwiping = (carousel) => {
//         const carouselEntity = $(`#${carousel.id}`);
//         const onRightSwipe = () => {
//             carouselEntity.carousel("next");
//         };

//         const onLeftSwipe = () => {
//             carouselEntity.carousel("prev");
//         };

//         handleTouchEvents(carousel, {
//             onLeftSwipe,
//             onRightSwipe,
//         }).init();
//     };

//     const makeSlider = (id, options = {}) => {
//         const defaultOptions = { pause: false, interval: 4000, wrap: true };
//         const currentOptions = { ...defaultOptions, ...options };
//         const slider = $(id).carousel(currentOptions);

//         // console.log(slider.carousel('next'));

//         // $(id).carousel("pause");
//         carouselSwiping(slider[0]);

//         return slider;
//     };

//     const initSlider = () => {
//         const id = "#carouselFlat";
//         makeSlider(id);

//         const indicators = $(`${id}Indicators > li`);

//         if (indicators) {
//             const carousel = $(id);
//             carousel.on("slide.bs.carousel", (e) => {
//                 indicators.each((i, el) => {
//                     el.classList.remove("active");
//                     if (e.to === i) {
//                         el.classList.add("active");
//                         // $(id2).carousel(i);
//                     }
//                 });
//             });

//             indicators.each((i, el) => {
//                 el.addEventListener("click", () => {
//                     carousel.carousel(i);
//                 });
//             });
//         }
//     };

//     lazyShow();
//     initSlider();
//     // initPrevs();
// })();
var now =
    Date.now ||
    function () {
        return new Date().getTime();
    };
function throttle(r, i, n) {
    var s,
        a,
        o,
        _,
        l = 0;
    n = n || {};
    function u() {
        (l = !1 === n.leading ? 0 : now()),
            (s = null),
            (_ = r.apply(a, o)),
            s || (a = o = null);
    }
    function t() {
        var t = now();
        l || !1 !== n.leading || (l = t);
        var e = i - (t - l);
        return (
            (a = this),
            (o = arguments),
            e <= 0 || i < e
                ? (s && (clearTimeout(s), (s = null)),
                  (l = t),
                  (_ = r.apply(a, o)),
                  s || (a = o = null))
                : s || !1 === n.trailing || (s = setTimeout(u, e)),
            _
        );
    }
    return (
        (t.cancel = function () {
            clearTimeout(s), (l = 0), (s = a = o = null);
        }),
        t
    );
}
function onVisible(t) {
    function e() {
        0 ===
            (t = t
                .map((t) => {
                    if (t.visibleCondition()) {
                        if (
                            !t.visible &&
                            (t.visibleCallback(), (t.visible = !0), t.once)
                        )
                            return null;
                    } else
                        t.visible &&
                            (t.invisibleCallback && t.invisibleCallback(),
                            (t.visible = !1));
                    return t;
                })
                .filter((t) => t)).length && i();
    }
    t = t.map((t) => processEntry(t));
    const r = throttle(e, 200, { leading: !0, trailing: !0 });
    function i() {
        document.removeEventListener("scroll", r, { passive: !0 });
    }
    return (
        document.addEventListener("scroll", r, { passive: !0 }),
        document.addEventListener(
            "visibilitychange",
            function () {
                "visible" === document.visibilityState
                    ? requestAnimationFrame(() => {
                          t.forEach((t) => (t.visible = !1)), e();
                      })
                    : t.forEach((t) => {
                          (t.visible = !1),
                              t.invisibleCallback && t.invisibleCallback();
                      });
            },
            !1
        ),
        e(),
        { unbind: i }
    );
}
function processEntry(t) {
    let {
        trigger: e,
        minTop: r,
        minBottom: i,
        visibleCallback: n,
        invisibleCallback: s,
        addClass: a,
        once: o = !0,
    } = t;
    function _(t) {
        var e = String(t).match(/([\d\.-]+)(px|%)$/);
        return e ? { value: e[1], unit: e[2] } : { value: t, unit: "" };
    }
    (r = _(r || 0)), (i = _(i || 0));
    const l =
            "px" === r.unit
                ? (t) => window.innerHeight - t.top > r.value
                : (t) =>
                      (window.innerHeight - t.top) / window.innerHeight >
                      r.value,
        u =
            "px" === i.unit
                ? (t) => t.bottom > i.value
                : (t) => t.bottom / window.innerHeight > i.value;
    return {
        trigger: e,
        once: o,
        visibleCondition: () => {
            var t = getViewportPosition(e);
            return l(t) && u(t);
        },
        visibleCallback: () => {
            n && n(), a && e.classList.add(a);
        },
        invisibleCallback: () => {
            s && s(), a && e.classList.remove(a);
        },
        visible: !1,
    };
}
function getViewportPosition(t) {
    t = t.getBoundingClientRect();
    return { top: t.top, bottom: t.bottom };
}
function initPrevs() {
    let i;
    $("body").on("mouseover", ".product-prev-cell", (t) => {
        let e = $(t.currentTarget);
        0 === e.find("video").length &&
            (function (t) {
                var e = t.data("mp4-src");
                t.append(
                    `<div class="video-wrapper"><video autoplay playsinline loop muted src="${e}" width="400" height="225"></video></div>`
                ),
                    (i = setTimeout(() => {
                        t.find(".loading-spinner").addClass("show");
                    }, 1e3));
                let r = $(t.find("video"));
                r.on("canplay", () => {
                    r[0]
                        .play()
                        .catch((t) =>
                            "NotAllowedError" != t.name
                                ? t
                                : (r.prop("muted", !0), void r[0].play())
                        ),
                        clearTimeout(i),
                        t.find(".loading-spinner").removeClass("show");
                });
            })(e);
    }),
        $("body").on("mouseleave", ".product-prev-cell", (t) => {
            let e = $(t.currentTarget);
            clearTimeout(i),
                e.find(".loading-spinner").removeClass("show"),
                e.find(".video-wrapper").remove();
        }),
        Array.from(document.querySelectorAll(".btn-collapse")).forEach(
            (e, t) => {
                e.addEventListener("click", () => {
                    var t = "true" == e.getAttribute("aria-expanded");
                    e.setAttribute("aria-expanded", !t),
                        $(e.dataset.target).collapse("toggle");
                });
            }
        );
}
function initSliders(t = ".opacity-slider", e = {}) {
    t = document.querySelectorAll(t);
    return Array.from(t).map((t) => createOpacitySlider(t, e));
}
function createOpacitySlider(
    t,
    {
        switchCallback: r = (t, e) => {},
        trigger: e = "click",
        delay: i = 7e3,
    } = {}
) {
    const n = {
        delay: i,
        autoPlay: !1,
        activeIndex: -1,
        timeout: null,
        root: t,
        slides: t.querySelectorAll(".slide"),
    };
    return (
        (n.play = function () {
            (n.autoplay = !0),
                n.activeIndex < 0
                    ? n.switchSlide()
                    : setTimeout(n.switchSlide, n.delay);
        }),
        (n.pause = function () {
            (n.autoplay = !1), clearTimeout(n.timeout);
        }),
        (n.switchSlide = function (t = n.activeIndex + 1) {
            n.timeout && (clearTimeout(n.timeout), (n.timeout = null));
            const e = n.activeIndex;
            (t %= n.slides.length),
                e !== t &&
                    (r(e, t),
                    setTimeout(() => {
                        0 <= e && n.slides[e].classList.remove("active"),
                            (n.activeIndex = t),
                            n.slides[n.activeIndex].classList.add("active");
                    }, 10)),
                n.autoplay &&
                    (clearTimeout(n.timeout),
                    (n.timeout = setTimeout(n.switchSlide, n.delay)));
        }),
        "click" === e &&
            ((e = throttle(() => n.switchSlide(), 500)),
            n.root.addEventListener("click", e)),
        n
    );
}
function initFloat(t, o, _) {
    const a = document.querySelector(t),
        e = o.map((t) => document.querySelector(t.selector));
    function r() {
        onVisible([
            { trigger: a, visibleCallback: i, invisibleCallback: n, ..._ },
        ]);
    }
    function i() {
        e.forEach((t, e) => {
            var { directions: r, relativeParent: i } = o[e];
            t.classList.add("animate-in"), t.classList.remove("animate-out");
            let { x1: n = 0, y1: s = 0, s1: a = 1 } = r;
            i &&
                ((n =
                    ((e = n),
                    (r = i) &&
                        -1 < e.indexOf("%%") &&
                        ((r = r.getBoundingClientRect().width),
                        (e = ((e = parseFloat(e)) / 100) * r + "px")),
                    e)),
                (s =
                    ((e = s),
                    (i = i) &&
                        -1 < e.indexOf("%%") &&
                        ((i = i.getBoundingClientRect().height),
                        (e = ((e = parseFloat(e)) / 100) * i + "px")),
                    e))),
                (t.style.transform = `translate3D(${n},${s},0) scale(${a})`),
                _.opacity && (t.style.opacity = "1");
        });
    }
    function n() {
        e.forEach((t, e) => {
            var { directions: r } = o[e],
                { x0: i = 0, y0: e = 0, s0: r = 1 } = r;
            t.classList.remove("animate-in"),
                t.classList.add("animate-out"),
                (t.style.transform = `translate3D(${i},${e},0) scale(${r})`),
                _.opacity && (t.style.opacity = "0");
        });
    }
    return (
        requestAnimationFrame(() => {
            n(),
                requestAnimationFrame(() => {
                    e.forEach((t, e) => {
                        var {
                                directions: r,
                                duration: i = 1,
                                delay: n = 0,
                                ease: s = "ease",
                            } = o[e],
                            s = `${i}s ${n}s ${s}`;
                        (t.style.transition = `transform ${s}, opacity ${s}`),
                            "parent-relative" == r.unit &&
                                (o[e].relativeParent =
                                    a.querySelector(".background"));
                    });
                });
        }),
        _.delayInit ||
            setTimeout(() => {
                r();
            }, 100),
        { init: r }
    );
}
function _assertThisInitialized(t) {
    if (void 0 === t)
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    return t;
}
function _inheritsLoose(t, e) {
    (t.prototype = Object.create(e.prototype)),
        ((t.prototype.constructor = t).__proto__ = e);
}
var _suppressOverwrites,
    _globalTimeline,
    _win$1,
    _coreInitted,
    _doc$1,
    _coreReady,
    _lastRenderedFrame,
    _tickerActive,
    _config = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: { lineHeight: "" },
    },
    _defaults = { duration: 0.5, overwrite: !1, delay: 0 },
    _bigNum$1 = 1e8,
    _tinyNum = 1 / _bigNum$1,
    _2PI = 2 * Math.PI,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function (t) {
        return "string" == typeof t;
    },
    _isFunction = function (t) {
        return "function" == typeof t;
    },
    _isNumber = function (t) {
        return "number" == typeof t;
    },
    _isUndefined = function (t) {
        return void 0 === t;
    },
    _isObject = function (t) {
        return "object" == typeof t;
    },
    _isNotFalse = function (t) {
        return !1 !== t;
    },
    _windowExists$1 = function () {
        return "undefined" != typeof window;
    },
    _isFuncOrString = function (t) {
        return _isFunction(t) || _isString(t);
    },
    _isTypedArray =
        ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
    _isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    _relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    _globals = {},
    _installScope = {},
    _install = function (t) {
        return (_installScope = _merge(t, _globals)) && gsap;
    },
    _missingPlugin = function (t, e) {
        return console.warn(
            "Invalid property",
            t,
            "set to",
            e,
            "Missing plugin? gsap.registerPlugin()"
        );
    },
    _warn = function (t, e) {
        return !e && console.warn(t);
    },
    _addGlobal = function (t, e) {
        return (
            (t &&
                (_globals[t] = e) &&
                _installScope &&
                (_installScope[t] = e)) ||
            _globals
        );
    },
    _emptyFunc = function () {
        return 0;
    },
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function (t) {
        var e,
            r,
            i = t[0];
        if (
            (_isObject(i) || _isFunction(i) || (t = [t]),
            !(e = (i._gsap || {}).harness))
        ) {
            for (
                r = _harnessPlugins.length;
                r-- && !_harnessPlugins[r].targetTest(i);

            );
            e = _harnessPlugins[r];
        }
        for (r = t.length; r--; )
            (t[r] && (t[r]._gsap || (t[r]._gsap = new GSCache(t[r], e)))) ||
                t.splice(r, 1);
        return t;
    },
    _getCache = function (t) {
        return t._gsap || _harness(toArray(t))[0]._gsap;
    },
    _getProperty = function (t, e, r) {
        return (r = t[e]) && _isFunction(r)
            ? t[e]()
            : (_isUndefined(r) && t.getAttribute && t.getAttribute(e)) || r;
    },
    _forEachName = function (t, e) {
        return (t = t.split(",")).forEach(e) || t;
    },
    _round = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
    },
    _arrayContainsAny = function (t, e) {
        for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
        return i < r;
    },
    _lazyRender = function () {
        var t,
            e,
            r = _lazyTweens.length,
            i = _lazyTweens.slice(0);
        for (_lazyLookup = {}, t = _lazyTweens.length = 0; t < r; t++)
            (e = i[t]) &&
                e._lazy &&
                (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    },
    _lazySafeRender = function (t, e, r, i) {
        _lazyTweens.length && _lazyRender(),
            t.render(e, r, i),
            _lazyTweens.length && _lazyRender();
    },
    _numericIfPossible = function (t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(_delimitedValueExp).length < 2
            ? e
            : _isString(t)
            ? t.trim()
            : t;
    },
    _passThrough = function (t) {
        return t;
    },
    _setDefaults = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
    },
    _setKeyframeDefaults = function (t, e) {
        for (var r in e)
            r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
    },
    _merge = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
    },
    _mergeDeep = function t(e, r) {
        for (var i in r)
            "__proto__" !== i &&
                "constructor" !== i &&
                "prototype" !== i &&
                (e[i] = _isObject(r[i]) ? t(e[i] || (e[i] = {}), r[i]) : r[i]);
        return e;
    },
    _copyExcluding = function (t, e) {
        var r,
            i = {};
        for (r in t) r in e || (i[r] = t[r]);
        return i;
    },
    _inheritDefaults = function (t) {
        var e = t.parent || _globalTimeline,
            r = t.keyframes ? _setKeyframeDefaults : _setDefaults;
        if (_isNotFalse(t.inherit))
            for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp);
        return t;
    },
    _arraysMatch = function (t, e) {
        for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; );
        return r < 0;
    },
    _addLinkedListItem = function (t, e, r, i, n) {
        void 0 === r && (r = "_first");
        var s,
            a = t[(i = void 0 === i ? "_last" : i)];
        if (n) for (s = e[n]; a && a[n] > s; ) a = a._prev;
        return (
            a
                ? ((e._next = a._next), (a._next = e))
                : ((e._next = t[r]), (t[r] = e)),
            e._next ? (e._next._prev = e) : (t[i] = e),
            (e._prev = a),
            (e.parent = e._dp = t),
            e
        );
    },
    _removeLinkedListItem = function (t, e, r, i) {
        void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
        var n = e._prev,
            s = e._next;
        n ? (n._next = s) : t[r] === e && (t[r] = s),
            s ? (s._prev = n) : t[i] === e && (t[i] = n),
            (e._next = e._prev = e.parent = null);
    },
    _removeFromParent = function (t, e) {
        !t.parent || (e && !t.parent.autoRemoveChildren) || t.parent.remove(t),
            (t._act = 0);
    },
    _uncache = function (t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
        return t;
    },
    _recacheAncestors = function (t) {
        for (var e = t.parent; e && e.parent; )
            (e._dirty = 1), e.totalDuration(), (e = e.parent);
        return t;
    },
    _hasNoPausedAncestors = function t(e) {
        return !e || (e._ts && t(e.parent));
    },
    _elapsedCycleDuration = function (t) {
        return t._repeat
            ? _animationCycle(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
    },
    _animationCycle = function (t, e) {
        e = Math.floor((t /= e));
        return t && e === t ? e - 1 : e;
    },
    _parentToChildTotalTime = function (t, e) {
        return (
            (t - e._start) * e._ts +
            (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        );
    },
    _setEnd = function (t) {
        return (t._end = _round(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || _tinyNum) || 0)
        ));
    },
    _alignPlayhead = function (t, e) {
        var r = t._dp;
        return (
            r &&
                r.smoothChildTiming &&
                t._ts &&
                ((t._start = _round(
                    r._time -
                        (0 < t._ts
                            ? e / t._ts
                            : ((t._dirty ? t.totalDuration() : t._tDur) - e) /
                              -t._ts)
                )),
                _setEnd(t),
                r._dirty || _uncache(r, t)),
            t
        );
    },
    _postAddChecks = function (t, e) {
        var r;
        if (
            ((e._time || (e._initted && !e._dur)) &&
                ((r = _parentToChildTotalTime(t.rawTime(), e)),
                (!e._dur ||
                    _clamp(0, e.totalDuration(), r) - e._tTime > _tinyNum) &&
                    e.render(r, !0)),
            _uncache(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
        ) {
            if (t._dur < t.duration())
                for (r = t; r._dp; )
                    0 <= r.rawTime() && r.totalTime(r._tTime), (r = r._dp);
            t._zTime = -_tinyNum;
        }
    },
    _addToTimeline = function (t, e, r, i) {
        return (
            e.parent && _removeFromParent(e),
            (e._start = _round(
                (_isNumber(r)
                    ? r
                    : r || t !== _globalTimeline
                    ? _parsePosition(t, r, e)
                    : t._time) + e._delay
            )),
            (e._end = _round(
                e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            _addLinkedListItem(t, e, "_first", "_last", t._sort ? "_start" : 0),
            _isFromOrFromStart(e) || (t._recent = e),
            i || _postAddChecks(t, e),
            t
        );
    },
    _scrollTrigger = function (t, e) {
        return (
            (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", e)) &&
            _globals.ScrollTrigger.create(e, t)
        );
    },
    _attemptInitTween = function (t, e, r, i) {
        return (
            _initTween(t, e),
            t._initted
                ? !r &&
                  t._pt &&
                  ((t._dur && !1 !== t.vars.lazy) ||
                      (!t._dur && t.vars.lazy)) &&
                  _lastRenderedFrame !== _ticker.frame
                    ? (_lazyTweens.push(t), (t._lazy = [e, i]), 1)
                    : void 0
                : 1
        );
    },
    _parentPlayheadIsBeforeStart = function t(e) {
        e = e.parent;
        return (
            e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || t(e))
        );
    },
    _isFromOrFromStart = function (t) {
        t = t.data;
        return "isFromStart" === t || "isStart" === t;
    },
    _renderZeroDurationTween = function (t, e, r, i) {
        var n,
            s,
            a,
            o = t.ratio,
            _ =
                e < 0 ||
                (!e &&
                    ((!t._start &&
                        _parentPlayheadIsBeforeStart(t) &&
                        (t._initted || !_isFromOrFromStart(t))) ||
                        ((t._ts < 0 || t._dp._ts < 0) &&
                            !_isFromOrFromStart(t))))
                    ? 0
                    : 1,
            l = t._rDelay,
            u = 0;
        if (
            (l &&
                t._repeat &&
                ((u = _clamp(0, t._tDur, e)),
                (s = _animationCycle(u, l)),
                (a = _animationCycle(t._tTime, l)),
                t._yoyo && 1 & s && (_ = 1 - _),
                s !== a &&
                    ((o = 1 - _),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
            _ !== o || i || t._zTime === _tinyNum || (!e && t._zTime))
        ) {
            if (t._initted || !_attemptInitTween(t, e, i, r)) {
                for (
                    a = t._zTime,
                        t._zTime = e || (r ? _tinyNum : 0),
                        r = r || (e && !a),
                        t.ratio = _,
                        t._from && (_ = 1 - _),
                        t._time = 0,
                        t._tTime = u,
                        n = t._pt;
                    n;

                )
                    n.r(_, n.d), (n = n._next);
                t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                    t._onUpdate && !r && _callback(t, "onUpdate"),
                    u &&
                        t._repeat &&
                        !r &&
                        t.parent &&
                        _callback(t, "onRepeat"),
                    (e >= t._tDur || e < 0) &&
                        t.ratio === _ &&
                        (_ && _removeFromParent(t, 1),
                        r ||
                            (_callback(
                                t,
                                _ ? "onComplete" : "onReverseComplete",
                                !0
                            ),
                            t._prom && t._prom()));
            }
        } else t._zTime || (t._zTime = e);
    },
    _findNextPauseTween = function (t, e, r) {
        var i;
        if (e < r)
            for (i = t._first; i && i._start <= r; ) {
                if (!i._dur && "isPause" === i.data && i._start > e) return i;
                i = i._next;
            }
        else
            for (i = t._last; i && i._start >= r; ) {
                if (!i._dur && "isPause" === i.data && i._start < e) return i;
                i = i._prev;
            }
    },
    _setDuration = function (t, e, r, i) {
        var n = t._repeat,
            s = _round(e) || 0,
            e = t._tTime / t._tDur;
        return (
            e && !i && (t._time *= s / t._dur),
            (t._dur = s),
            (t._tDur = n
                ? n < 0
                    ? 1e10
                    : _round(s * (n + 1) + t._rDelay * n)
                : s),
            e && !i
                ? _alignPlayhead(t, (t._tTime = t._tDur * e))
                : t.parent && _setEnd(t),
            r || _uncache(t.parent, t),
            t
        );
    },
    _onUpdateTotalDuration = function (t) {
        return t instanceof Timeline ? _uncache(t) : _setDuration(t, t._dur);
    },
    _zeroPosition = {
        _start: 0,
        endTime: _emptyFunc,
        totalDuration: _emptyFunc,
    },
    _parsePosition = function t(e, r, i) {
        var n,
            s,
            a,
            o = e.labels,
            _ = e._recent || _zeroPosition,
            l = e.duration() >= _bigNum$1 ? _.endTime(!1) : e._dur;
        return _isString(r) && (isNaN(r) || r in o)
            ? ((s = r.charAt(0)),
              (a = "%" === r.substr(-1)),
              (n = r.indexOf("=")),
              "<" === s || ">" === s
                  ? (0 <= n && (r = r.replace(/=/, "")),
                    ("<" === s ? _._start : _.endTime(0 <= _._repeat)) +
                        (parseFloat(r.substr(1)) || 0) *
                            (a ? (n < 0 ? _ : i).totalDuration() / 100 : 1))
                  : n < 0
                  ? (r in o || (o[r] = l), o[r])
                  : ((s = parseFloat(r.charAt(n - 1) + r.substr(n + 1))),
                    a &&
                        i &&
                        (s =
                            (s / 100) *
                            (_isArray(i) ? i[0] : i).totalDuration()),
                    1 < n ? t(e, r.substr(0, n - 1), i) + s : l + s))
            : null == r
            ? l
            : +r;
    },
    _createTweenType = function (t, e, r) {
        var i,
            n,
            s = _isNumber(e[1]),
            a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
            o = e[a];
        if ((s && (o.duration = e[1]), (o.parent = r), t)) {
            for (i = o, n = r; n && !("immediateRender" in i); )
                (i = n.vars.defaults || {}),
                    (n = _isNotFalse(n.vars.inherit) && n.parent);
            (o.immediateRender = _isNotFalse(i.immediateRender)),
                t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
        }
        return new Tween(e[0], o, e[1 + a]);
    },
    _conditionalReturn = function (t, e) {
        return t || 0 === t ? e(t) : e;
    },
    _clamp = function (t, e, r) {
        return r < t ? t : e < r ? e : r;
    },
    getUnit = function (t) {
        if ("string" != typeof t) return "";
        var e = _unitExp.exec(t);
        return e ? t.substr(e.index + e[0].length) : "";
    },
    clamp = function (e, r, t) {
        return _conditionalReturn(t, function (t) {
            return _clamp(e, r, t);
        });
    },
    _slice = [].slice,
    _isArrayLike = function (t, e) {
        return (
            t &&
            _isObject(t) &&
            "length" in t &&
            ((!e && !t.length) || (t.length - 1 in t && _isObject(t[0]))) &&
            !t.nodeType &&
            t !== _win$1
        );
    },
    _flatten = function (t, e, r) {
        return (
            void 0 === r && (r = []),
            t.forEach(function (t) {
                return (_isString(t) && !e) || _isArrayLike(t, 1)
                    ? r.push.apply(r, toArray(t))
                    : r.push(t);
            }) || r
        );
    },
    toArray = function (t, e, r) {
        return !_isString(t) || r || (!_coreInitted && _wake())
            ? _isArray(t)
                ? _flatten(t, r)
                : _isArrayLike(t)
                ? _slice.call(t, 0)
                : t
                ? [t]
                : []
            : _slice.call((e || _doc$1).querySelectorAll(t), 0);
    },
    selector = function (r) {
        return (
            (r = toArray(r)[0] || _warn("Invalid scope") || {}),
            function (t) {
                var e = r.current || r.nativeElement || r;
                return toArray(
                    t,
                    e.querySelectorAll
                        ? e
                        : e === r
                        ? _warn("Invalid scope") || _doc$1.createElement("div")
                        : r
                );
            }
        );
    },
    shuffle = function (t) {
        return t.sort(function () {
            return 0.5 - Math.random();
        });
    },
    distribute = function (t) {
        if (_isFunction(t)) return t;
        var d = _isObject(t) ? t : { each: t },
            h = _parseEase(d.ease),
            f = d.from || 0,
            m = parseFloat(d.base) || 0,
            g = {},
            t = 0 < f && f < 1,
            y = isNaN(f) || t,
            v = d.axis,
            T = f,
            w = f;
        return (
            _isString(f)
                ? (T = w = { center: 0.5, edges: 0.5, end: 1 }[f] || 0)
                : !t && y && ((T = f[0]), (w = f[1])),
            function (t, e, r) {
                var i,
                    n,
                    s,
                    a,
                    o,
                    _,
                    l,
                    u,
                    c = (r || d).length,
                    p = g[c];
                if (!p) {
                    if (
                        !(u =
                            "auto" === d.grid
                                ? 0
                                : (d.grid || [1, _bigNum$1])[1])
                    ) {
                        for (
                            _ = -_bigNum$1;
                            _ < (_ = r[u++].getBoundingClientRect().left) &&
                            u < c;

                        );
                        u--;
                    }
                    for (
                        p = g[c] = [],
                            i = y ? Math.min(u, c) * T - 0.5 : f % u,
                            n = y ? (c * w) / u - 0.5 : (f / u) | 0,
                            l = _bigNum$1,
                            o = _ = 0;
                        o < c;
                        o++
                    )
                        (s = (o % u) - i),
                            (a = n - ((o / u) | 0)),
                            (p[o] = a =
                                v
                                    ? Math.abs("y" === v ? a : s)
                                    : _sqrt(s * s + a * a)),
                            _ < a && (_ = a),
                            a < l && (l = a);
                    "random" === f && shuffle(p),
                        (p.max = _ - l),
                        (p.min = l),
                        (p.v = c =
                            (parseFloat(d.amount) ||
                                parseFloat(d.each) *
                                    (c < u
                                        ? c - 1
                                        : v
                                        ? "y" === v
                                            ? c / u
                                            : u
                                        : Math.max(u, c / u)) ||
                                0) * ("edges" === f ? -1 : 1)),
                        (p.b = c < 0 ? m - c : m),
                        (p.u = getUnit(d.amount || d.each) || 0),
                        (h = h && c < 0 ? _invertEase(h) : h);
                }
                return (
                    (c = (p[t] - p.min) / p.max || 0),
                    _round(p.b + (h ? h(c) : c) * p.v) + p.u
                );
            }
        );
    },
    _roundModifier = function (r) {
        var i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1;
        return function (t) {
            var e = Math.round(parseFloat(t) / r) * r * i;
            return (e - (e % 1)) / i + (_isNumber(t) ? 0 : getUnit(t));
        };
    },
    snap = function (_, t) {
        var l,
            u,
            e = _isArray(_);
        return (
            !e &&
                _isObject(_) &&
                ((l = e = _.radius || _bigNum$1),
                _.values
                    ? ((_ = toArray(_.values)),
                      (u = !_isNumber(_[0])) && (l *= l))
                    : (_ = _roundModifier(_.increment))),
            _conditionalReturn(
                t,
                e
                    ? _isFunction(_)
                        ? function (t) {
                              return (u = _(t)), Math.abs(u - t) <= l ? u : t;
                          }
                        : function (t) {
                              for (
                                  var e,
                                      r,
                                      i = parseFloat(u ? t.x : t),
                                      n = parseFloat(u ? t.y : 0),
                                      s = _bigNum$1,
                                      a = 0,
                                      o = _.length;
                                  o--;

                              )
                                  (e = u
                                      ? (e = _[o].x - i) * e +
                                        (r = _[o].y - n) * r
                                      : Math.abs(_[o] - i)) < s &&
                                      ((s = e), (a = o));
                              return (
                                  (a = !l || s <= l ? _[a] : t),
                                  u || a === t || _isNumber(t)
                                      ? a
                                      : a + getUnit(t)
                              );
                          }
                    : _roundModifier(_)
            )
        );
    },
    random = function (t, e, r, i) {
        return _conditionalReturn(
            _isArray(t) ? !e : !0 === r ? !!(r = 0) : !i,
            function () {
                return _isArray(t)
                    ? t[~~(Math.random() * t.length)]
                    : (r = r || 1e-5) &&
                          (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
                          Math.floor(
                              Math.round(
                                  (t -
                                      r / 2 +
                                      Math.random() * (e - t + 0.99 * r)) /
                                      r
                              ) *
                                  r *
                                  i
                          ) / i;
            }
        );
    },
    pipe = function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
        return function (t) {
            return e.reduce(function (t, e) {
                return e(t);
            }, t);
        };
    },
    unitize = function (e, r) {
        return function (t) {
            return e(parseFloat(t)) + (r || getUnit(t));
        };
    },
    normalize = function (t, e, r) {
        return mapRange(t, e, 0, 1, r);
    },
    _wrapArray = function (e, r, t) {
        return _conditionalReturn(t, function (t) {
            return e[~~r(t)];
        });
    },
    wrap = function t(e, r, i) {
        var n = r - e;
        return _isArray(e)
            ? _wrapArray(e, t(0, e.length), r)
            : _conditionalReturn(i, function (t) {
                  return ((n + ((t - e) % n)) % n) + e;
              });
    },
    wrapYoyo = function t(e, r, i) {
        var n = r - e,
            s = 2 * n;
        return _isArray(e)
            ? _wrapArray(e, t(0, e.length - 1), r)
            : _conditionalReturn(i, function (t) {
                  return (
                      e + (n < (t = (s + ((t - e) % s)) % s || 0) ? s - t : t)
                  );
              });
    },
    _replaceRandom = function (t) {
        for (var e, r, i, n, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
            (i = t.indexOf(")", e)),
                (n = "[" === t.charAt(e + 7)),
                (r = t
                    .substr(e + 7, i - e - 7)
                    .match(n ? _delimitedValueExp : _strictNumExp)),
                (a +=
                    t.substr(s, e - s) +
                    random(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
                (s = i + 1);
        return a + t.substr(s, t.length - s);
    },
    mapRange = function (e, t, r, i, n) {
        var s = t - e,
            a = i - r;
        return _conditionalReturn(n, function (t) {
            return r + (((t - e) / s) * a || 0);
        });
    },
    interpolate = function t(e, r, i, n) {
        var s = isNaN(e + r)
            ? 0
            : function (t) {
                  return (1 - t) * e + t * r;
              };
        if (!s) {
            var a,
                o,
                _,
                l,
                u,
                c = _isString(e),
                p = {};
            if ((!0 === i && (n = 1) && (i = null), c))
                (e = { p: e }), (r = { p: r });
            else if (_isArray(e) && !_isArray(r)) {
                for (_ = [], l = e.length, u = l - 2, o = 1; o < l; o++)
                    _.push(t(e[o - 1], e[o]));
                l--,
                    (s = function (t) {
                        t *= l;
                        var e = Math.min(u, ~~t);
                        return _[e](t - e);
                    }),
                    (i = r);
            } else n || (e = _merge(_isArray(e) ? [] : {}, e));
            if (!_) {
                for (a in r) _addPropTween.call(p, e, a, "get", r[a]);
                s = function (t) {
                    return _renderPropTweens(t, p) || (c ? e.p : e);
                };
            }
        }
        return _conditionalReturn(i, s);
    },
    _getLabelInDirection = function (t, e, r) {
        var i,
            n,
            s,
            a = t.labels,
            o = _bigNum$1;
        for (i in a)
            (n = a[i] - e) < 0 == !!r &&
                n &&
                o > (n = Math.abs(n)) &&
                ((s = i), (o = n));
        return s;
    },
    _callback = function (t, e, r) {
        var i = t.vars,
            n = i[e];
        if (n)
            return (
                (e = i[e + "Params"]),
                (t = i.callbackScope || t),
                r && _lazyTweens.length && _lazyRender(),
                e ? n.apply(t, e) : n.call(t)
            );
    },
    _interrupt = function (t) {
        return (
            _removeFromParent(t),
            t.scrollTrigger && t.scrollTrigger.kill(!1),
            t.progress() < 1 && _callback(t, "onInterrupt"),
            t
        );
    },
    _createPlugin = function (t) {
        var e = (t = (!t.name && t.default) || t).name,
            r = _isFunction(t),
            i =
                e && !r && t.init
                    ? function () {
                          this._props = [];
                      }
                    : t,
            n = {
                init: _emptyFunc,
                render: _renderPropTweens,
                add: _addPropTween,
                kill: _killPropTweensOf,
                modifier: _addPluginModifier,
                rawVars: 0,
            },
            r = {
                targetTest: 0,
                get: 0,
                getSetter: _getSetter,
                aliases: {},
                register: 0,
            };
        if ((_wake(), t !== i)) {
            if (_plugins[e]) return;
            _setDefaults(i, _setDefaults(_copyExcluding(t, n), r)),
                _merge(i.prototype, _merge(n, _copyExcluding(t, r))),
                (_plugins[(i.prop = e)] = i),
                t.targetTest &&
                    (_harnessPlugins.push(i), (_reservedProps[e] = 1)),
                (e =
                    ("css" === e
                        ? "CSS"
                        : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
        }
        _addGlobal(e, i), t.register && t.register(gsap, i, PropTween);
    },
    _255 = 255,
    _colorLookup = {
        aqua: [0, _255, _255],
        lime: [0, _255, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, _255],
        navy: [0, 0, 128],
        white: [_255, _255, _255],
        olive: [128, 128, 0],
        yellow: [_255, _255, 0],
        orange: [_255, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [_255, 0, 0],
        pink: [_255, 192, 203],
        cyan: [0, _255, _255],
        transparent: [_255, _255, _255, 0],
    },
    _hue = function (t, e, r) {
        return (
            ((6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1
                ? e + (r - e) * t * 6
                : t < 0.5
                ? r
                : 3 * t < 2
                ? e + (r - e) * (2 / 3 - t) * 6
                : e) *
                _255 +
                0.5) |
            0
        );
    },
    splitColor = function (t, e, r) {
        var i,
            n,
            s,
            a,
            o,
            _,
            l,
            u = t
                ? _isNumber(t)
                    ? [t >> 16, (t >> 8) & _255, t & _255]
                    : 0
                : _colorLookup.black;
        if (!u) {
            if (
                ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)),
                _colorLookup[t])
            )
                u = _colorLookup[t];
            else if ("#" === t.charAt(0)) {
                if (
                    9 ===
                    (t =
                        t.length < 6
                            ? "#" +
                              (i = t.charAt(1)) +
                              i +
                              (n = t.charAt(2)) +
                              n +
                              (s = t.charAt(3)) +
                              s +
                              (5 === t.length ? t.charAt(4) + t.charAt(4) : "")
                            : t).length
                )
                    return [
                        (u = parseInt(t.substr(1, 6), 16)) >> 16,
                        (u >> 8) & _255,
                        u & _255,
                        parseInt(t.substr(7), 16) / 255,
                    ];
                u = [
                    (t = parseInt(t.substr(1), 16)) >> 16,
                    (t >> 8) & _255,
                    t & _255,
                ];
            } else if ("hsl" === t.substr(0, 3))
                if (((u = l = t.match(_strictNumExp)), e)) {
                    if (~t.indexOf("="))
                        return (
                            (u = t.match(_numExp)),
                            r && u.length < 4 && (u[3] = 1),
                            u
                        );
                } else
                    (a = (+u[0] % 360) / 360),
                        (o = +u[1] / 100),
                        (i =
                            2 * (_ = +u[2] / 100) -
                            (n = _ <= 0.5 ? _ * (o + 1) : _ + o - _ * o)),
                        3 < u.length && (u[3] *= 1),
                        (u[0] = _hue(a + 1 / 3, i, n)),
                        (u[1] = _hue(a, i, n)),
                        (u[2] = _hue(a - 1 / 3, i, n));
            else u = t.match(_strictNumExp) || _colorLookup.transparent;
            u = u.map(Number);
        }
        return (
            e &&
                !l &&
                ((i = u[0] / _255),
                (n = u[1] / _255),
                (s = u[2] / _255),
                (_ = ((t = Math.max(i, n, s)) + (e = Math.min(i, n, s))) / 2),
                t === e
                    ? (a = o = 0)
                    : ((l = t - e),
                      (o = 0.5 < _ ? l / (2 - t - e) : l / (t + e)),
                      (a =
                          t === i
                              ? (n - s) / l + (n < s ? 6 : 0)
                              : t === n
                              ? (s - i) / l + 2
                              : (i - n) / l + 4),
                      (a *= 60)),
                (u[0] = ~~(a + 0.5)),
                (u[1] = ~~(100 * o + 0.5)),
                (u[2] = ~~(100 * _ + 0.5))),
            r && u.length < 4 && (u[3] = 1),
            u
        );
    },
    _colorOrderData = function (t) {
        var e = [],
            r = [],
            i = -1;
        return (
            t.split(_colorExp).forEach(function (t) {
                t = t.match(_numWithUnitExp) || [];
                e.push.apply(e, t), r.push((i += t.length + 1));
            }),
            (e.c = r),
            e
        );
    },
    _formatColors = function (t, e, r) {
        var i,
            n,
            s,
            a,
            o = "",
            _ = (t + o).match(_colorExp),
            l = e ? "hsla(" : "rgba(",
            u = 0;
        if (!_) return t;
        if (
            ((_ = _.map(function (t) {
                return (
                    (t = splitColor(t, e, 1)) &&
                    l +
                        (e
                            ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                            : t.join(",")) +
                        ")"
                );
            })),
            r && ((s = _colorOrderData(t)), (i = r.c).join(o) !== s.c.join(o)))
        )
            for (
                a =
                    (n = t.replace(_colorExp, "1").split(_numWithUnitExp))
                        .length - 1;
                u < a;
                u++
            )
                o +=
                    n[u] +
                    (~i.indexOf(u)
                        ? _.shift() || l + "0,0,0,0)"
                        : (s.length ? s : _.length ? _ : r).shift());
        if (!n)
            for (a = (n = t.split(_colorExp)).length - 1; u < a; u++)
                o += n[u] + _[u];
        return o + n[a];
    },
    _colorExp = (function () {
        var t,
            e =
                "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (t in _colorLookup) e += "|" + t + "\\b";
        return new RegExp(e + ")", "gi");
    })(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function (t) {
        var e = t.join(" ");
        if (((_colorExp.lastIndex = 0), _colorExp.test(e)))
            return (
                (e = _hslExp.test(e)),
                (t[1] = _formatColors(t[1], e)),
                (t[0] = _formatColors(t[0], e, _colorOrderData(t[1]))),
                !0
            );
    },
    _ticker = (function () {
        function a(t) {
            var e,
                r,
                i,
                n = c() - f,
                s = !0 === t;
            if (
                (p < n && (h += n - d),
                (0 < (n = (r = (f += n) - h) - g) || s) &&
                    ((i = ++v.frame),
                    (l = r - 1e3 * v.time),
                    (v.time = r /= 1e3),
                    (g += n + (m <= n ? 4 : m - n)),
                    (e = 1)),
                s || (o = _(a)),
                e)
            )
                for (u = 0; u < y.length; u++) y[u](r, l, i, t);
        }
        var o,
            _,
            t,
            l,
            u,
            c = Date.now,
            p = 500,
            d = 33,
            h = c(),
            f = h,
            m = 1e3 / 240,
            g = m,
            y = [],
            v = {
                time: 0,
                frame: 0,
                tick: function () {
                    a(!0);
                },
                deltaRatio: function (t) {
                    return l / (1e3 / (t || 60));
                },
                wake: function () {
                    _coreReady &&
                        (!_coreInitted &&
                            _windowExists$1() &&
                            ((_win$1 = _coreInitted = window),
                            (_doc$1 = _win$1.document || {}),
                            (_globals.gsap = gsap),
                            (
                                _win$1.gsapVersions ||
                                (_win$1.gsapVersions = [])
                            ).push(gsap.version),
                            _install(
                                _installScope ||
                                    _win$1.GreenSockGlobals ||
                                    (!_win$1.gsap && _win$1) ||
                                    {}
                            ),
                            (t = _win$1.requestAnimationFrame)),
                        o && v.sleep(),
                        (_ =
                            t ||
                            function (t) {
                                return setTimeout(
                                    t,
                                    (g - 1e3 * v.time + 1) | 0
                                );
                            }),
                        (_tickerActive = 1),
                        a(2));
                },
                sleep: function () {
                    (t ? _win$1.cancelAnimationFrame : clearTimeout)(o),
                        (_tickerActive = 0),
                        (_ = _emptyFunc);
                },
                lagSmoothing: function (t, e) {
                    (p = t || 1 / _tinyNum), (d = Math.min(e, p, 0));
                },
                fps: function (t) {
                    (m = 1e3 / (t || 240)), (g = 1e3 * v.time + m);
                },
                add: function (t) {
                    y.indexOf(t) < 0 && y.push(t), _wake();
                },
                remove: function (t) {
                    ~(t = y.indexOf(t)) && y.splice(t, 1) && t <= u && u--;
                },
                _listeners: y,
            };
        return v;
    })(),
    _wake = function () {
        return !_tickerActive && _ticker.wake();
    },
    _easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function (t) {
        for (
            var e,
                r,
                i,
                n = {},
                s = t.substr(1, t.length - 3).split(":"),
                a = s[0],
                o = 1,
                _ = s.length;
            o < _;
            o++
        )
            (r = s[o]),
                (e = o !== _ - 1 ? r.lastIndexOf(",") : r.length),
                (i = r.substr(0, e)),
                (n[a] = isNaN(i) ? i.replace(_quotesExp, "").trim() : +i),
                (a = r.substr(e + 1).trim());
        return n;
    },
    _valueInParentheses = function (t) {
        var e = t.indexOf("(") + 1,
            r = t.indexOf(")"),
            i = t.indexOf("(", e);
        return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
    },
    _configEaseFromString = function (t) {
        var e = (t + "").split("("),
            r = _easeMap[e[0]];
        return r && 1 < e.length && r.config
            ? r.config.apply(
                  null,
                  ~t.indexOf("{")
                      ? [_parseObjectInString(e[1])]
                      : _valueInParentheses(t)
                            .split(",")
                            .map(_numericIfPossible)
              )
            : _easeMap._CE && _customEaseExp.test(t)
            ? _easeMap._CE("", t)
            : r;
    },
    _invertEase = function (e) {
        return function (t) {
            return 1 - e(1 - t);
        };
    },
    _propagateYoyoEase = function t(e, r) {
        for (var i, n = e._first; n; )
            n instanceof Timeline
                ? t(n, r)
                : !n.vars.yoyoEase ||
                  (n._yoyo && n._repeat) ||
                  n._yoyo === r ||
                  (n.timeline
                      ? t(n.timeline, r)
                      : ((i = n._ease),
                        (n._ease = n._yEase),
                        (n._yEase = i),
                        (n._yoyo = r))),
                (n = n._next);
    },
    _parseEase = function (t, e) {
        return (
            (t &&
                (_isFunction(t)
                    ? t
                    : _easeMap[t] || _configEaseFromString(t))) ||
            e
        );
    },
    _insertEase = function (t, e, r, i) {
        void 0 === r &&
            (r = function (t) {
                return 1 - e(1 - t);
            }),
            void 0 === i &&
                (i = function (t) {
                    return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
                });
        var n,
            s = { easeIn: e, easeOut: r, easeInOut: i };
        return (
            _forEachName(t, function (t) {
                for (var e in ((_easeMap[t] = _globals[t] = s),
                (_easeMap[(n = t.toLowerCase())] = r),
                s))
                    _easeMap[
                        n +
                            ("easeIn" === e
                                ? ".in"
                                : "easeOut" === e
                                ? ".out"
                                : ".inOut")
                    ] = _easeMap[t + "." + e] = s[e];
            }),
            s
        );
    },
    _easeInOutFromOut = function (e) {
        return function (t) {
            return t < 0.5
                ? (1 - e(1 - 2 * t)) / 2
                : 0.5 + e(2 * (t - 0.5)) / 2;
        };
    },
    _configElastic = function r(i, t, e) {
        function n(t) {
            return 1 === t
                ? 1
                : s * Math.pow(2, -10 * t) * _sin((t - a) * o) + 1;
        }
        var s = 1 <= t ? t : 1,
            a =
                ((o = (e || (i ? 0.3 : 0.45)) / (t < 1 ? t : 1)) / _2PI) *
                (Math.asin(1 / s) || 0),
            t =
                "out" === i
                    ? n
                    : "in" === i
                    ? function (t) {
                          return 1 - n(1 - t);
                      }
                    : _easeInOutFromOut(n),
            o = _2PI / o;
        return (
            (t.config = function (t, e) {
                return r(i, t, e);
            }),
            t
        );
    },
    _configBack = function e(r, i) {
        void 0 === i && (i = 1.70158);
        function n(t) {
            return t ? --t * t * ((i + 1) * t + i) + 1 : 0;
        }
        var t =
            "out" === r
                ? n
                : "in" === r
                ? function (t) {
                      return 1 - n(1 - t);
                  }
                : _easeInOutFromOut(n);
        return (
            (t.config = function (t) {
                return e(r, t);
            }),
            t
        );
    };
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    _insertEase(
        t + ",Power" + (r - 1),
        e
            ? function (t) {
                  return Math.pow(t, r);
              }
            : function (t) {
                  return t;
              },
        function (t) {
            return 1 - Math.pow(1 - t, r);
        },
        function (t) {
            return t < 0.5
                ? Math.pow(2 * t, r) / 2
                : 1 - Math.pow(2 * (1 - t), r) / 2;
        }
    );
}),
    (_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn),
    _insertEase(
        "Elastic",
        _configElastic("in"),
        _configElastic("out"),
        _configElastic()
    ),
    (function (e) {
        function r(t) {
            return t < i
                ? e * t * t
                : t < 0.7272727272727273
                ? e * Math.pow(t - 1.5 / 2.75, 2) + 0.75
                : t < 0.9090909090909092
                ? e * (t -= 2.25 / 2.75) * t + 0.9375
                : e * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
        }
        var i = 1 / 2.75;
        _insertEase(
            "Bounce",
            function (t) {
                return 1 - r(1 - t);
            },
            r
        );
    })(7.5625),
    _insertEase("Expo", function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    _insertEase("Circ", function (t) {
        return -(_sqrt(1 - t * t) - 1);
    }),
    _insertEase("Sine", function (t) {
        return 1 === t ? 1 : 1 - _cos(t * _HALF_PI);
    }),
    _insertEase("Back", _configBack("in"), _configBack("out"), _configBack()),
    (_easeMap.SteppedEase =
        _easeMap.steps =
        _globals.SteppedEase =
            {
                config: function (t, e) {
                    var r = 1 / (t = void 0 === t ? 1 : t),
                        i = t + (e ? 0 : 1),
                        n = e ? 1 : 0,
                        s = 1 - _tinyNum;
                    return function (t) {
                        return (((i * _clamp(0, s, t)) | 0) + n) * r;
                    };
                },
            }),
    (_defaults.ease = _easeMap["quad.out"]),
    _forEachName(
        "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        function (t) {
            return (_callbackNames += t + "," + t + "Params,");
        }
    );
var GSCache = function (t, e) {
        (this.id = _gsID++),
            ((t._gsap = this).target = t),
            (this.harness = e),
            (this.get = e ? e.get : _getProperty),
            (this.set = e ? e.getSetter : _getSetter);
    },
    Animation = (function () {
        function t(t) {
            (this.vars = t),
                (this._delay = +t.delay || 0),
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                    ((this._rDelay = t.repeatDelay || 0),
                    (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                (this._ts = 1),
                _setDuration(this, +t.duration, 1, 1),
                (this.data = t.data),
                _tickerActive || _ticker.wake();
        }
        var e = t.prototype;
        return (
            (e.delay = function (t) {
                return t || 0 === t
                    ? (this.parent &&
                          this.parent.smoothChildTiming &&
                          this.startTime(this._start + t - this._delay),
                      (this._delay = t),
                      this)
                    : this._delay;
            }),
            (e.duration = function (t) {
                return arguments.length
                    ? this.totalDuration(
                          0 < this._repeat
                              ? t + (t + this._rDelay) * this._repeat
                              : t
                      )
                    : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
                return arguments.length
                    ? ((this._dirty = 0),
                      _setDuration(
                          this,
                          this._repeat < 0
                              ? t
                              : (t - this._repeat * this._rDelay) /
                                    (this._repeat + 1)
                      ))
                    : this._tDur;
            }),
            (e.totalTime = function (t, e) {
                if ((_wake(), !arguments.length)) return this._tTime;
                var r = this._dp;
                if (r && r.smoothChildTiming && this._ts) {
                    for (
                        _alignPlayhead(this, t),
                            !r._dp || r.parent || _postAddChecks(r, this);
                        r.parent;

                    )
                        r.parent._time !==
                            r._start +
                                (0 <= r._ts
                                    ? r._tTime / r._ts
                                    : (r.totalDuration() - r._tTime) /
                                      -r._ts) && r.totalTime(r._tTime, !0),
                            (r = r.parent);
                    !this.parent &&
                        this._dp.autoRemoveChildren &&
                        ((0 < this._ts && t < this._tDur) ||
                            (this._ts < 0 && 0 < t) ||
                            (!this._tDur && !t)) &&
                        _addToTimeline(
                            this._dp,
                            this,
                            this._start - this._delay
                        );
                }
                return (
                    (this._tTime !== t ||
                        (!this._dur && !e) ||
                        (this._initted && Math.abs(this._zTime) === _tinyNum) ||
                        (!t &&
                            !this._initted &&
                            (this.add || this._ptLookup))) &&
                        (this._ts || (this._pTime = t),
                        _lazySafeRender(this, t, e)),
                    this
                );
            }),
            (e.time = function (t, e) {
                return arguments.length
                    ? this.totalTime(
                          Math.min(
                              this.totalDuration(),
                              t + _elapsedCycleDuration(this)
                          ) %
                              (this._dur + this._rDelay) || (t ? this._dur : 0),
                          e
                      )
                    : this._time;
            }),
            (e.totalProgress = function (t, e) {
                return arguments.length
                    ? this.totalTime(this.totalDuration() * t, e)
                    : this.totalDuration()
                    ? Math.min(1, this._tTime / this._tDur)
                    : this.ratio;
            }),
            (e.progress = function (t, e) {
                return arguments.length
                    ? this.totalTime(
                          this.duration() *
                              (!this._yoyo || 1 & this.iteration()
                                  ? t
                                  : 1 - t) +
                              _elapsedCycleDuration(this),
                          e
                      )
                    : this.duration()
                    ? Math.min(1, this._time / this._dur)
                    : this.ratio;
            }),
            (e.iteration = function (t, e) {
                var r = this.duration() + this._rDelay;
                return arguments.length
                    ? this.totalTime(this._time + (t - 1) * r, e)
                    : this._repeat
                    ? _animationCycle(this._tTime, r) + 1
                    : 1;
            }),
            (e.timeScale = function (t) {
                if (!arguments.length)
                    return this._rts === -_tinyNum ? 0 : this._rts;
                if (this._rts === t) return this;
                var e =
                    this.parent && this._ts
                        ? _parentToChildTotalTime(this.parent._time, this)
                        : this._tTime;
                return (
                    (this._rts = +t || 0),
                    (this._ts = this._ps || t === -_tinyNum ? 0 : this._rts),
                    _recacheAncestors(
                        this.totalTime(_clamp(-this._delay, this._tDur, e), !0)
                    )
                );
            }),
            (e.paused = function (t) {
                return arguments.length
                    ? (this._ps !== t &&
                          ((this._ps = t)
                              ? ((this._pTime =
                                    this._tTime ||
                                    Math.max(-this._delay, this.rawTime())),
                                (this._ts = this._act = 0))
                              : (_wake(),
                                (this._ts = this._rts),
                                this.totalTime(
                                    this.parent &&
                                        !this.parent.smoothChildTiming
                                        ? this.rawTime()
                                        : this._tTime || this._pTime,
                                    1 === this.progress() &&
                                        Math.abs(this._zTime) !== _tinyNum &&
                                        (this._tTime -= _tinyNum)
                                ))),
                      this)
                    : this._ps;
            }),
            (e.startTime = function (t) {
                if (arguments.length) {
                    this._start = t;
                    var e = this.parent || this._dp;
                    return (
                        !e ||
                            (!e._sort && this.parent) ||
                            _addToTimeline(e, this, t - this._delay),
                        this
                    );
                }
                return this._start;
            }),
            (e.endTime = function (t) {
                return (
                    this._start +
                    (_isNotFalse(t) ? this.totalDuration() : this.duration()) /
                        Math.abs(this._ts)
                );
            }),
            (e.rawTime = function (t) {
                var e = this.parent || this._dp;
                return e
                    ? t &&
                      (!this._ts ||
                          (this._repeat &&
                              this._time &&
                              this.totalProgress() < 1))
                        ? this._tTime % (this._dur + this._rDelay)
                        : this._ts
                        ? _parentToChildTotalTime(e.rawTime(t), this)
                        : this._tTime
                    : this._tTime;
            }),
            (e.globalTime = function (t) {
                for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
                    (r = e._start + r / (e._ts || 1)), (e = e._dp);
                return r;
            }),
            (e.repeat = function (t) {
                return arguments.length
                    ? ((this._repeat = t === 1 / 0 ? -2 : t),
                      _onUpdateTotalDuration(this))
                    : -2 === this._repeat
                    ? 1 / 0
                    : this._repeat;
            }),
            (e.repeatDelay = function (t) {
                if (arguments.length) {
                    var e = this._time;
                    return (
                        (this._rDelay = t),
                        _onUpdateTotalDuration(this),
                        e ? this.time(e) : this
                    );
                }
                return this._rDelay;
            }),
            (e.yoyo = function (t) {
                return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
                return this.totalTime(_parsePosition(this, t), _isNotFalse(e));
            }),
            (e.restart = function (t, e) {
                return this.play().totalTime(
                    t ? -this._delay : 0,
                    _isNotFalse(e)
                );
            }),
            (e.play = function (t, e) {
                return (
                    null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                );
            }),
            (e.reverse = function (t, e) {
                return (
                    null != t && this.seek(t || this.totalDuration(), e),
                    this.reversed(!0).paused(!1)
                );
            }),
            (e.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
                return this.paused(!1);
            }),
            (e.reversed = function (t) {
                return arguments.length
                    ? (!!t !== this.reversed() &&
                          this.timeScale(-this._rts || (t ? -_tinyNum : 0)),
                      this)
                    : this._rts < 0;
            }),
            (e.invalidate = function () {
                return (
                    (this._initted = this._act = 0),
                    (this._zTime = -_tinyNum),
                    this
                );
            }),
            (e.isActive = function () {
                var t,
                    e = this.parent || this._dp,
                    r = this._start;
                return !(
                    e &&
                    !(
                        this._ts &&
                        this._initted &&
                        e.isActive() &&
                        (t = e.rawTime(!0)) >= r &&
                        t < this.endTime(!0) - _tinyNum
                    )
                );
            }),
            (e.eventCallback = function (t, e, r) {
                var i = this.vars;
                return 1 < arguments.length
                    ? (e
                          ? ((i[t] = e),
                            r && (i[t + "Params"] = r),
                            "onUpdate" === t && (this._onUpdate = e))
                          : delete i[t],
                      this)
                    : i[t];
            }),
            (e.then = function (i) {
                var n = this;
                return new Promise(function (e) {
                    function t() {
                        var t = n.then;
                        (n.then = null),
                            _isFunction(r) &&
                                (r = r(n)) &&
                                (r.then || r === n) &&
                                (n.then = t),
                            e(r),
                            (n.then = t);
                    }
                    var r = _isFunction(i) ? i : _passThrough;
                    (n._initted && 1 === n.totalProgress() && 0 <= n._ts) ||
                    (!n._tTime && n._ts < 0)
                        ? t()
                        : (n._prom = t);
                });
            }),
            (e.kill = function () {
                _interrupt(this);
            }),
            t
        );
    })();
_setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: !1,
    _rts: 1,
});
var Timeline = (function (i) {
    function t(t, e) {
        var r;
        return (
            ((r = i.call(this, (t = void 0 === t ? {} : t)) || this).labels =
                {}),
            (r.smoothChildTiming = !!t.smoothChildTiming),
            (r.autoRemoveChildren = !!t.autoRemoveChildren),
            (r._sort = _isNotFalse(t.sortChildren)),
            _globalTimeline &&
                _addToTimeline(
                    t.parent || _globalTimeline,
                    _assertThisInitialized(r),
                    e
                ),
            t.reversed && r.reverse(),
            t.paused && r.paused(!0),
            t.scrollTrigger &&
                _scrollTrigger(_assertThisInitialized(r), t.scrollTrigger),
            r
        );
    }
    _inheritsLoose(t, i);
    var e = t.prototype;
    return (
        (e.to = function (t, e, r) {
            return _createTweenType(0, arguments, this), this;
        }),
        (e.from = function (t, e, r) {
            return _createTweenType(1, arguments, this), this;
        }),
        (e.fromTo = function (t, e, r, i) {
            return _createTweenType(2, arguments, this), this;
        }),
        (e.set = function (t, e, r) {
            return (
                (e.duration = 0),
                (e.parent = this),
                _inheritDefaults(e).repeatDelay || (e.repeat = 0),
                (e.immediateRender = !!e.immediateRender),
                new Tween(t, e, _parsePosition(this, r), 1),
                this
            );
        }),
        (e.call = function (t, e, r) {
            return _addToTimeline(this, Tween.delayedCall(0, t, e), r);
        }),
        (e.staggerTo = function (t, e, r, i, n, s, a) {
            return (
                (r.duration = e),
                (r.stagger = r.stagger || i),
                (r.onComplete = s),
                (r.onCompleteParams = a),
                (r.parent = this),
                new Tween(t, r, _parsePosition(this, n)),
                this
            );
        }),
        (e.staggerFrom = function (t, e, r, i, n, s, a) {
            return (
                (r.runBackwards = 1),
                (_inheritDefaults(r).immediateRender = _isNotFalse(
                    r.immediateRender
                )),
                this.staggerTo(t, e, r, i, n, s, a)
            );
        }),
        (e.staggerFromTo = function (t, e, r, i, n, s, a, o) {
            return (
                (i.startAt = r),
                (_inheritDefaults(i).immediateRender = _isNotFalse(
                    i.immediateRender
                )),
                this.staggerTo(t, e, i, n, s, a, o)
            );
        }),
        (e.render = function (t, e, r) {
            var i,
                n,
                s,
                a,
                o,
                _,
                l,
                u,
                c,
                p,
                d = this._time,
                h = this._dirty ? this.totalDuration() : this._tDur,
                f = this._dur,
                m =
                    this !== _globalTimeline && h - _tinyNum < t && 0 <= t
                        ? h
                        : t < _tinyNum
                        ? 0
                        : t,
                g = this._zTime < 0 != t < 0 && (this._initted || !f);
            if (m !== this._tTime || r || g) {
                if (
                    (d !== this._time &&
                        f &&
                        ((m += this._time - d), (t += this._time - d)),
                    (i = m),
                    (u = this._start),
                    (o = !(l = this._ts)),
                    g &&
                        (f || (d = this._zTime),
                        (!t && e) || (this._zTime = t)),
                    this._repeat)
                ) {
                    if (
                        ((y = this._yoyo),
                        (a = f + this._rDelay),
                        this._repeat < -1 && t < 0)
                    )
                        return this.totalTime(100 * a + t, e, r);
                    if (
                        ((i = _round(m % a)),
                        m === h
                            ? ((s = this._repeat), (i = f))
                            : ((s = ~~(m / a)) && s === m / a && ((i = f), s--),
                              f < i && (i = f)),
                        (c = _animationCycle(this._tTime, a)),
                        y && 1 & s && ((i = f - i), (p = 1)),
                        s !== (c = !d && this._tTime && c !== s ? s : c) &&
                            !this._lock)
                    ) {
                        var g = y && 1 & c,
                            y = g === (y && 1 & s),
                            d = (g = s < c ? !g : g) ? 0 : f;
                        if (
                            ((this._lock = 1),
                            (this.render(
                                d || (p ? 0 : _round(s * a)),
                                e,
                                !f
                            )._lock = 0),
                            (this._tTime = m),
                            !e && this.parent && _callback(this, "onRepeat"),
                            this.vars.repeatRefresh &&
                                !p &&
                                (this.invalidate()._lock = 1),
                            (d && d !== this._time) ||
                                o != !this._ts ||
                                (this.vars.onRepeat &&
                                    !this.parent &&
                                    !this._act))
                        )
                            return this;
                        if (
                            ((f = this._dur),
                            (h = this._tDur),
                            y &&
                                ((this._lock = 2),
                                this.render((d = g ? f : -1e-4), !0),
                                this.vars.repeatRefresh &&
                                    !p &&
                                    this.invalidate()),
                            (this._lock = 0),
                            !this._ts && !o)
                        )
                            return this;
                        _propagateYoyoEase(this, p);
                    }
                }
                if (
                    (this._hasPause &&
                        !this._forcing &&
                        this._lock < 2 &&
                        (_ = _findNextPauseTween(this, _round(d), _round(i))) &&
                        (m -= i - (i = _._start)),
                    (this._tTime = m),
                    (this._time = i),
                    (this._act = !l),
                    this._initted ||
                        ((this._onUpdate = this.vars.onUpdate),
                        (this._initted = 1),
                        (this._zTime = t),
                        (d = 0)),
                    !d &&
                        i &&
                        !e &&
                        (_callback(this, "onStart"), this._tTime !== m))
                )
                    return this;
                if (d <= i && 0 <= t)
                    for (v = this._first; v; ) {
                        if (
                            ((n = v._next),
                            (v._act || i >= v._start) && v._ts && _ !== v)
                        ) {
                            if (v.parent !== this) return this.render(t, e, r);
                            if (
                                (v.render(
                                    0 < v._ts
                                        ? (i - v._start) * v._ts
                                        : (v._dirty
                                              ? v.totalDuration()
                                              : v._tDur) +
                                              (i - v._start) * v._ts,
                                    e,
                                    r
                                ),
                                i !== this._time || (!this._ts && !o))
                            ) {
                                (_ = 0), n && (m += this._zTime = -_tinyNum);
                                break;
                            }
                        }
                        v = n;
                    }
                else
                    for (var v = this._last, T = t < 0 ? t : i; v; ) {
                        if (
                            ((n = v._prev),
                            (v._act || T <= v._end) && v._ts && _ !== v)
                        ) {
                            if (v.parent !== this) return this.render(t, e, r);
                            if (
                                (v.render(
                                    0 < v._ts
                                        ? (T - v._start) * v._ts
                                        : (v._dirty
                                              ? v.totalDuration()
                                              : v._tDur) +
                                              (T - v._start) * v._ts,
                                    e,
                                    r
                                ),
                                i !== this._time || (!this._ts && !o))
                            ) {
                                (_ = 0),
                                    n &&
                                        (m += this._zTime =
                                            T ? -_tinyNum : _tinyNum);
                                break;
                            }
                        }
                        v = n;
                    }
                if (
                    _ &&
                    !e &&
                    (this.pause(),
                    (_.render(d <= i ? 0 : -_tinyNum)._zTime = d <= i ? 1 : -1),
                    this._ts)
                )
                    return (
                        (this._start = u), _setEnd(this), this.render(t, e, r)
                    );
                this._onUpdate && !e && _callback(this, "onUpdate", !0),
                    ((m === h && h >= this.totalDuration()) || (!m && d)) &&
                        ((u !== this._start &&
                            Math.abs(l) === Math.abs(this._ts)) ||
                            this._lock ||
                            ((!t && f) ||
                                !(
                                    (m === h && 0 < this._ts) ||
                                    (!m && this._ts < 0)
                                ) ||
                                _removeFromParent(this, 1),
                            e ||
                                (t < 0 && !d) ||
                                (!m && !d && h) ||
                                (_callback(
                                    this,
                                    m === h && 0 <= t
                                        ? "onComplete"
                                        : "onReverseComplete",
                                    !0
                                ),
                                !this._prom ||
                                    (m < h && 0 < this.timeScale()) ||
                                    this._prom())));
            }
            return this;
        }),
        (e.add = function (t, e) {
            var r = this;
            if (
                (_isNumber(e) || (e = _parsePosition(this, e, t)),
                !(t instanceof Animation))
            ) {
                if (_isArray(t))
                    return (
                        t.forEach(function (t) {
                            return r.add(t, e);
                        }),
                        this
                    );
                if (_isString(t)) return this.addLabel(t, e);
                if (!_isFunction(t)) return this;
                t = Tween.delayedCall(0, t);
            }
            return this !== t ? _addToTimeline(this, t, e) : this;
        }),
        (e.getChildren = function (t, e, r, i) {
            void 0 === t && (t = !0),
                void 0 === e && (e = !0),
                void 0 === r && (r = !0),
                void 0 === i && (i = -_bigNum$1);
            for (var n = [], s = this._first; s; )
                s._start >= i &&
                    (s instanceof Tween
                        ? e && n.push(s)
                        : (r && n.push(s),
                          t && n.push.apply(n, s.getChildren(!0, e, r)))),
                    (s = s._next);
            return n;
        }),
        (e.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
                if (e[r].vars.id === t) return e[r];
        }),
        (e.remove = function (t) {
            return _isString(t)
                ? this.removeLabel(t)
                : _isFunction(t)
                ? this.killTweensOf(t)
                : (_removeLinkedListItem(this, t),
                  t === this._recent && (this._recent = this._last),
                  _uncache(this));
        }),
        (e.totalTime = function (t, e) {
            return arguments.length
                ? ((this._forcing = 1),
                  !this._dp &&
                      this._ts &&
                      (this._start = _round(
                          _ticker.time -
                              (0 < this._ts
                                  ? t / this._ts
                                  : (this.totalDuration() - t) / -this._ts)
                      )),
                  i.prototype.totalTime.call(this, t, e),
                  (this._forcing = 0),
                  this)
                : this._tTime;
        }),
        (e.addLabel = function (t, e) {
            return (this.labels[t] = _parsePosition(this, e)), this;
        }),
        (e.removeLabel = function (t) {
            return delete this.labels[t], this;
        }),
        (e.addPause = function (t, e, r) {
            r = Tween.delayedCall(0, e || _emptyFunc, r);
            return (
                (r.data = "isPause"),
                (this._hasPause = 1),
                _addToTimeline(this, r, _parsePosition(this, t))
            );
        }),
        (e.removePause = function (t) {
            var e = this._first;
            for (t = _parsePosition(this, t); e; )
                e._start === t && "isPause" === e.data && _removeFromParent(e),
                    (e = e._next);
        }),
        (e.killTweensOf = function (t, e, r) {
            for (var i = this.getTweensOf(t, r), n = i.length; n--; )
                _overwritingTween !== i[n] && i[n].kill(t, e);
            return this;
        }),
        (e.getTweensOf = function (t, e) {
            for (
                var r,
                    i = [],
                    n = toArray(t),
                    s = this._first,
                    a = _isNumber(e);
                s;

            )
                s instanceof Tween
                    ? _arrayContainsAny(s._targets, n) &&
                      (a
                          ? (!_overwritingTween || (s._initted && s._ts)) &&
                            s.globalTime(0) <= e &&
                            s.globalTime(s.totalDuration()) > e
                          : !e || s.isActive()) &&
                      i.push(s)
                    : (r = s.getTweensOf(n, e)).length && i.push.apply(i, r),
                    (s = s._next);
            return i;
        }),
        (e.tweenTo = function (t, e) {
            e = e || {};
            var r,
                i = this,
                n = _parsePosition(i, t),
                s = e.startAt,
                a = e.onStart,
                o = e.onStartParams,
                t = e.immediateRender,
                _ = Tween.to(
                    i,
                    _setDefaults(
                        {
                            ease: e.ease || "none",
                            lazy: !1,
                            immediateRender: !1,
                            time: n,
                            overwrite: "auto",
                            duration:
                                e.duration ||
                                Math.abs(
                                    (n -
                                        (s && "time" in s ? s.time : i._time)) /
                                        i.timeScale()
                                ) ||
                                _tinyNum,
                            onStart: function () {
                                var t;
                                i.pause(),
                                    r ||
                                        ((t =
                                            e.duration ||
                                            Math.abs(
                                                (n -
                                                    (s && "time" in s
                                                        ? s.time
                                                        : i._time)) /
                                                    i.timeScale()
                                            )),
                                        _._dur !== t &&
                                            _setDuration(_, t, 0, 1).render(
                                                _._time,
                                                !0,
                                                !0
                                            ),
                                        (r = 1)),
                                    a && a.apply(_, o || []);
                            },
                        },
                        e
                    )
                );
            return t ? _.render(0) : _;
        }),
        (e.tweenFromTo = function (t, e, r) {
            return this.tweenTo(
                e,
                _setDefaults({ startAt: { time: _parsePosition(this, t) } }, r)
            );
        }),
        (e.recent = function () {
            return this._recent;
        }),
        (e.nextLabel = function (t) {
            return (
                void 0 === t && (t = this._time),
                _getLabelInDirection(this, _parsePosition(this, t))
            );
        }),
        (e.previousLabel = function (t) {
            return (
                void 0 === t && (t = this._time),
                _getLabelInDirection(this, _parsePosition(this, t), 1)
            );
        }),
        (e.currentLabel = function (t) {
            return arguments.length
                ? this.seek(t, !0)
                : this.previousLabel(this._time + _tinyNum);
        }),
        (e.shiftChildren = function (t, e, r) {
            void 0 === r && (r = 0);
            for (var i, n = this._first, s = this.labels; n; )
                n._start >= r && ((n._start += t), (n._end += t)),
                    (n = n._next);
            if (e) for (i in s) s[i] >= r && (s[i] += t);
            return _uncache(this);
        }),
        (e.invalidate = function () {
            var t = this._first;
            for (this._lock = 0; t; ) t.invalidate(), (t = t._next);
            return i.prototype.invalidate.call(this);
        }),
        (e.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r; )
                (e = r._next), this.remove(r), (r = e);
            return (
                this._dp && (this._time = this._tTime = this._pTime = 0),
                t && (this.labels = {}),
                _uncache(this)
            );
        }),
        (e.totalDuration = function (t) {
            var e,
                r,
                i,
                n = 0,
                s = this,
                a = s._last,
                o = _bigNum$1;
            if (arguments.length)
                return s.timeScale(
                    (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                        (s.reversed() ? -t : t)
                );
            if (s._dirty) {
                for (i = s.parent; a; )
                    (e = a._prev),
                        a._dirty && a.totalDuration(),
                        o < (r = a._start) && s._sort && a._ts && !s._lock
                            ? ((s._lock = 1),
                              (_addToTimeline(s, a, r - a._delay, 1)._lock = 0))
                            : (o = r),
                        r < 0 &&
                            a._ts &&
                            ((n -= r),
                            ((!i && !s._dp) || (i && i.smoothChildTiming)) &&
                                ((s._start += r / s._ts),
                                (s._time -= r),
                                (s._tTime -= r)),
                            s.shiftChildren(-r, !1, -1 / 0),
                            (o = 0)),
                        a._end > n && a._ts && (n = a._end),
                        (a = e);
                _setDuration(
                    s,
                    s === _globalTimeline && s._time > n ? s._time : n,
                    1,
                    1
                ),
                    (s._dirty = 0);
            }
            return s._tDur;
        }),
        (t.updateRoot = function (t) {
            if (
                (_globalTimeline._ts &&
                    (_lazySafeRender(
                        _globalTimeline,
                        _parentToChildTotalTime(t, _globalTimeline)
                    ),
                    (_lastRenderedFrame = _ticker.frame)),
                _ticker.frame >= _nextGCFrame)
            ) {
                _nextGCFrame += _config.autoSleep || 120;
                var e = _globalTimeline._first;
                if (
                    (!e || !e._ts) &&
                    _config.autoSleep &&
                    _ticker._listeners.length < 2
                ) {
                    for (; e && !e._ts; ) e = e._next;
                    e || _ticker.sleep();
                }
            }
        }),
        t
    );
})(Animation);
_setDefaults(Timeline.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var _overwritingTween,
    _addComplexStringPropTween = function (t, e, r, i, n, s, a) {
        var o,
            _,
            l,
            u,
            c,
            p = new PropTween(
                this._pt,
                t,
                e,
                0,
                1,
                _renderComplexString,
                null,
                n
            ),
            d = 0,
            h = 0;
        for (
            p.b = r,
                p.e = i,
                r += "",
                (n = ~(i += "").indexOf("random(")) && (i = _replaceRandom(i)),
                s && (s((s = [r, i]), t, e), (r = s[0]), (i = s[1])),
                o = r.match(_complexStringNumExp) || [];
            (c = _complexStringNumExp.exec(i));

        )
            (l = c[0]),
                (u = i.substring(d, c.index)),
                _ ? (_ = (_ + 1) % 5) : "rgba(" === u.substr(-5) && (_ = 1),
                l !== o[h++] &&
                    ((c = parseFloat(o[h - 1]) || 0),
                    (p._pt = {
                        _next: p._pt,
                        p: u || 1 === h ? u : ",",
                        s: c,
                        c:
                            "=" === l.charAt(1)
                                ? parseFloat(l.substr(2)) *
                                  ("-" === l.charAt(0) ? -1 : 1)
                                : parseFloat(l) - c,
                        m: _ && _ < 4 ? Math.round : 0,
                    }),
                    (d = _complexStringNumExp.lastIndex));
        return (
            (p.c = d < i.length ? i.substring(d, i.length) : ""),
            (p.fp = a),
            (_relExp.test(i) || n) && (p.e = 0),
            (this._pt = p)
        );
    },
    _addPropTween = function (t, e, r, i, n, s, a, o, _) {
        _isFunction(i) && (i = i(n || 0, t, s));
        var l,
            n = t[e],
            s =
                "get" !== r
                    ? r
                    : _isFunction(n)
                    ? _
                        ? t[
                              e.indexOf("set") ||
                              !_isFunction(t["get" + e.substr(3)])
                                  ? e
                                  : "get" + e.substr(3)
                          ](_)
                        : t[e]()
                    : n,
            r = _isFunction(n)
                ? _
                    ? _setterFuncWithParam
                    : _setterFunc
                : _setterPlain;
        if (
            (_isString(i) &&
                "=" ===
                    (i = ~i.indexOf("random(") ? _replaceRandom(i) : i).charAt(
                        1
                    ) &&
                ((!(l =
                    parseFloat(s) +
                    parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) +
                    (getUnit(s) || 0)) &&
                    0 !== l) ||
                    (i = l)),
            s !== i)
        )
            return isNaN(s * i) || "" === i
                ? (n || e in t || _missingPlugin(e, i),
                  _addComplexStringPropTween.call(
                      this,
                      t,
                      e,
                      s,
                      i,
                      r,
                      o || _config.stringFilter,
                      _
                  ))
                : ((l = new PropTween(
                      this._pt,
                      t,
                      e,
                      +s || 0,
                      i - (s || 0),
                      "boolean" == typeof n ? _renderBoolean : _renderPlain,
                      0,
                      r
                  )),
                  _ && (l.fp = _),
                  a && l.modifier(a, this, t),
                  (this._pt = l));
    },
    _processVars = function (t, e, r, i, n) {
        if (
            (_isFunction(t) && (t = _parseFuncOrString(t, n, e, r, i)),
            !_isObject(t) ||
                (t.style && t.nodeType) ||
                _isArray(t) ||
                _isTypedArray(t))
        )
            return _isString(t) ? _parseFuncOrString(t, n, e, r, i) : t;
        var s,
            a = {};
        for (s in t) a[s] = _parseFuncOrString(t[s], n, e, r, i);
        return a;
    },
    _checkPlugin = function (t, e, r, i, n, s) {
        var a, o, _, l;
        if (
            _plugins[t] &&
            !1 !==
                (a = new _plugins[t]()).init(
                    n,
                    a.rawVars ? e[t] : _processVars(e[t], i, n, s, r),
                    r,
                    i,
                    s
                ) &&
            ((r._pt = o =
                new PropTween(r._pt, n, t, 0, 1, a.render, a, 0, a.priority)),
            r !== _quickTween)
        )
            for (
                _ = r._ptLookup[r._targets.indexOf(n)], l = a._props.length;
                l--;

            )
                _[a._props[l]] = o;
        return a;
    },
    _initTween = function t(e, r) {
        var i,
            n,
            s,
            a,
            o,
            _,
            l,
            u,
            c,
            p,
            d,
            h,
            f,
            m = e.vars,
            g = m.ease,
            y = m.startAt,
            v = m.immediateRender,
            T = m.lazy,
            w = m.onUpdate,
            x = m.onUpdateParams,
            b = m.callbackScope,
            P = m.runBackwards,
            S = m.yoyoEase,
            k = m.keyframes,
            A = m.autoRevert,
            E = e._dur,
            C = e._startAt,
            D = e._targets,
            O = e.parent,
            F = O && "nested" === O.data ? O.parent._targets : D,
            M = "auto" === e._overwrite && !_suppressOverwrites,
            N = e.timeline;
        if (
            ((e._ease = _parseEase(
                (g = !(!N || (k && g)) ? "none" : g),
                _defaults.ease
            )),
            (e._yEase = S
                ? _invertEase(_parseEase(!0 === S ? g : S, _defaults.ease))
                : 0),
            S &&
                e._yoyo &&
                !e._repeat &&
                ((S = e._yEase), (e._yEase = e._ease), (e._ease = S)),
            (e._from = !N && !!m.runBackwards),
            !N)
        ) {
            if (
                ((h = (u = D[0] ? _getCache(D[0]).harness : 0) && m[u.prop]),
                (i = _copyExcluding(m, _reservedProps)),
                C && C.render(-1, !0).kill(),
                y)
            )
                if (
                    (_removeFromParent(
                        (e._startAt = Tween.set(
                            D,
                            _setDefaults(
                                {
                                    data: "isStart",
                                    overwrite: !1,
                                    parent: O,
                                    immediateRender: !0,
                                    lazy: _isNotFalse(T),
                                    startAt: null,
                                    delay: 0,
                                    onUpdate: w,
                                    onUpdateParams: x,
                                    callbackScope: b,
                                    stagger: 0,
                                },
                                y
                            )
                        ))
                    ),
                    r < 0 && !v && !A && e._startAt.render(-1, !0),
                    v)
                ) {
                    if ((0 < r && !A && (e._startAt = 0), E && r <= 0))
                        return void (r && (e._zTime = r));
                } else !1 === A && (e._startAt = 0);
            else if (P && E)
                if (C) A || (e._startAt = 0);
                else if (
                    ((s = _setDefaults(
                        {
                            overwrite: !1,
                            data: "isFromStart",
                            lazy: (v = r ? !1 : v) && _isNotFalse(T),
                            immediateRender: v,
                            stagger: 0,
                            parent: O,
                        },
                        i
                    )),
                    h && (s[u.prop] = h),
                    _removeFromParent((e._startAt = Tween.set(D, s))),
                    r < 0 && e._startAt.render(-1, !0),
                    v)
                ) {
                    if (!r) return;
                } else t(e._startAt, _tinyNum);
            for (
                e._pt = 0, T = (E && _isNotFalse(T)) || (T && !E), n = 0;
                n < D.length;
                n++
            ) {
                if (
                    ((l = (o = D[n])._gsap || _harness(D)[n]._gsap),
                    (e._ptLookup[n] = p = {}),
                    _lazyLookup[l.id] && _lazyTweens.length && _lazyRender(),
                    (d = F === D ? n : F.indexOf(o)),
                    u &&
                        !1 !== (c = new u()).init(o, h || i, e, d, F) &&
                        ((e._pt = a =
                            new PropTween(
                                e._pt,
                                o,
                                c.name,
                                0,
                                1,
                                c.render,
                                c,
                                0,
                                c.priority
                            )),
                        c._props.forEach(function (t) {
                            p[t] = a;
                        }),
                        c.priority && (_ = 1)),
                    !u || h)
                )
                    for (s in i)
                        _plugins[s] && (c = _checkPlugin(s, i, e, d, o, F))
                            ? c.priority && (_ = 1)
                            : (p[s] = a =
                                  _addPropTween.call(
                                      e,
                                      o,
                                      s,
                                      "get",
                                      i[s],
                                      d,
                                      F,
                                      0,
                                      m.stringFilter
                                  ));
                e._op && e._op[n] && e.kill(o, e._op[n]),
                    M &&
                        e._pt &&
                        ((_overwritingTween = e),
                        _globalTimeline.killTweensOf(o, p, e.globalTime(0)),
                        (f = !e.parent),
                        (_overwritingTween = 0)),
                    e._pt && T && (_lazyLookup[l.id] = 1);
            }
            _ && _sortPropTweensByPriority(e), e._onInit && e._onInit(e);
        }
        (e._onUpdate = w), (e._initted = (!e._op || e._pt) && !f);
    },
    _addAliasesToVars = function (t, e) {
        var r,
            i,
            n,
            s,
            t = t[0] ? _getCache(t[0]).harness : 0,
            a = t && t.aliases;
        if (!a) return e;
        for (i in ((r = _merge({}, e)), a))
            if (i in r)
                for (n = (s = a[i].split(",")).length; n--; ) r[s[n]] = r[i];
        return r;
    },
    _parseFuncOrString = function (t, e, r, i, n) {
        return _isFunction(t)
            ? t.call(e, r, i, n)
            : _isString(t) && ~t.indexOf("random(")
            ? _replaceRandom(t)
            : t;
    },
    _staggerTweenProps =
        _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (
        _staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger"
    ).split(","),
    Tween = (function (b) {
        function n(t, e, r, i) {
            "number" == typeof e && ((r.duration = e), (e = r), (r = null));
            var n,
                s,
                a,
                o,
                _,
                l,
                u,
                c,
                p,
                d = (n = b.call(this, i ? e : _inheritDefaults(e)) || this)
                    .vars,
                h = d.duration,
                f = d.delay,
                m = d.immediateRender,
                g = d.stagger,
                y = d.overwrite,
                v = d.keyframes,
                T = d.defaults,
                i = d.scrollTrigger,
                w = d.yoyoEase,
                d = e.parent || _globalTimeline,
                x = (
                    _isArray(t) || _isTypedArray(t)
                        ? _isNumber(t[0])
                        : "length" in e
                )
                    ? [t]
                    : toArray(t);
            if (
                ((n._targets = x.length
                    ? _harness(x)
                    : _warn(
                          "GSAP target " +
                              t +
                              " not found. https://greensock.com",
                          !_config.nullTargetWarn
                      ) || []),
                (n._ptLookup = []),
                (n._overwrite = y),
                v || g || _isFuncOrString(h) || _isFuncOrString(f))
            ) {
                if (
                    ((e = n.vars),
                    (s = n.timeline =
                        new Timeline({
                            data: "nested",
                            defaults: T || {},
                        })).kill(),
                    (s.parent = s._dp = _assertThisInitialized(n)),
                    (s._start = 0),
                    v)
                )
                    _setDefaults(s.vars.defaults, { ease: "none" }),
                        g
                            ? x.forEach(function (r, i) {
                                  return v.forEach(function (t, e) {
                                      return s.to(r, t, e ? ">" : i * g);
                                  });
                              })
                            : v.forEach(function (t) {
                                  return s.to(x, t, ">");
                              });
                else {
                    if (
                        ((_ = x.length),
                        (c = g ? distribute(g) : _emptyFunc),
                        _isObject(g))
                    )
                        for (l in g)
                            ~_staggerTweenProps.indexOf(l) &&
                                ((p = p || {})[l] = g[l]);
                    for (a = 0; a < _; a++) {
                        for (l in ((o = {}), e))
                            _staggerPropsToSkip.indexOf(l) < 0 && (o[l] = e[l]);
                        (o.stagger = 0),
                            w && (o.yoyoEase = w),
                            p && _merge(o, p),
                            (u = x[a]),
                            (o.duration = +_parseFuncOrString(
                                h,
                                _assertThisInitialized(n),
                                a,
                                u,
                                x
                            )),
                            (o.delay =
                                (+_parseFuncOrString(
                                    f,
                                    _assertThisInitialized(n),
                                    a,
                                    u,
                                    x
                                ) || 0) - n._delay),
                            !g &&
                                1 === _ &&
                                o.delay &&
                                ((n._delay = f = o.delay),
                                (n._start += f),
                                (o.delay = 0)),
                            s.to(u, o, c(a, u, x));
                    }
                    s.duration() ? (h = f = 0) : (n.timeline = 0);
                }
                h || n.duration((h = s.duration()));
            } else n.timeline = 0;
            return (
                !0 !== y ||
                    _suppressOverwrites ||
                    ((_overwritingTween = _assertThisInitialized(n)),
                    _globalTimeline.killTweensOf(x),
                    (_overwritingTween = 0)),
                _addToTimeline(d, _assertThisInitialized(n), r),
                e.reversed && n.reverse(),
                e.paused && n.paused(!0),
                (m ||
                    (!h &&
                        !v &&
                        n._start === _round(d._time) &&
                        _isNotFalse(m) &&
                        _hasNoPausedAncestors(_assertThisInitialized(n)) &&
                        "nested" !== d.data)) &&
                    ((n._tTime = -_tinyNum), n.render(Math.max(0, -f))),
                i && _scrollTrigger(_assertThisInitialized(n), i),
                n
            );
        }
        _inheritsLoose(n, b);
        var t = n.prototype;
        return (
            (t.render = function (t, e, r) {
                var i,
                    n,
                    s,
                    a,
                    o,
                    _,
                    l,
                    u,
                    c,
                    p = this._time,
                    d = this._tDur,
                    h = this._dur,
                    f = d - _tinyNum < t && 0 <= t ? d : t < _tinyNum ? 0 : t;
                if (h) {
                    if (
                        f !== this._tTime ||
                        !t ||
                        r ||
                        (!this._initted && this._tTime) ||
                        (this._startAt && this._zTime < 0 != t < 0)
                    ) {
                        if (((i = f), (u = this.timeline), this._repeat)) {
                            if (
                                ((a = h + this._rDelay),
                                this._repeat < -1 && t < 0)
                            )
                                return this.totalTime(100 * a + t, e, r);
                            if (
                                ((i = _round(f % a)),
                                f === d
                                    ? ((s = this._repeat), (i = h))
                                    : ((s = ~~(f / a)) &&
                                          s === f / a &&
                                          ((i = h), s--),
                                      h < i && (i = h)),
                                (_ = this._yoyo && 1 & s) &&
                                    ((c = this._yEase), (i = h - i)),
                                (o = _animationCycle(this._tTime, a)),
                                i === p && !r && this._initted)
                            )
                                return this;
                            s !== o &&
                                (u && this._yEase && _propagateYoyoEase(u, _),
                                !this.vars.repeatRefresh ||
                                    _ ||
                                    this._lock ||
                                    ((this._lock = r = 1),
                                    (this.render(
                                        _round(a * s),
                                        !0
                                    ).invalidate()._lock = 0)));
                        }
                        if (!this._initted) {
                            if (_attemptInitTween(this, t < 0 ? t : i, r, e))
                                return (this._tTime = 0), this;
                            if (h !== this._dur) return this.render(t, e, r);
                        }
                        if (
                            ((this._tTime = f),
                            (this._time = i),
                            !this._act &&
                                this._ts &&
                                ((this._act = 1), (this._lazy = 0)),
                            (this.ratio = l = (c || this._ease)(i / h)),
                            this._from && (this.ratio = l = 1 - l),
                            i &&
                                !p &&
                                !e &&
                                (_callback(this, "onStart"), this._tTime !== f))
                        )
                            return this;
                        for (n = this._pt; n; ) n.r(l, n.d), (n = n._next);
                        (u &&
                            u.render(
                                t < 0 ? t : !i && _ ? -_tinyNum : u._dur * l,
                                e,
                                r
                            )) ||
                            (this._startAt && (this._zTime = t)),
                            this._onUpdate &&
                                !e &&
                                (t < 0 &&
                                    this._startAt &&
                                    this._startAt.render(t, !0, r),
                                _callback(this, "onUpdate")),
                            this._repeat &&
                                s !== o &&
                                this.vars.onRepeat &&
                                !e &&
                                this.parent &&
                                _callback(this, "onRepeat"),
                            (f !== this._tDur && f) ||
                                this._tTime !== f ||
                                (t < 0 &&
                                    this._startAt &&
                                    !this._onUpdate &&
                                    this._startAt.render(t, !0, !0),
                                (!t && h) ||
                                    !(
                                        (f === this._tDur && 0 < this._ts) ||
                                        (!f && this._ts < 0)
                                    ) ||
                                    _removeFromParent(this, 1),
                                e ||
                                    (t < 0 && !p) ||
                                    (!f && !p) ||
                                    (_callback(
                                        this,
                                        f === d
                                            ? "onComplete"
                                            : "onReverseComplete",
                                        !0
                                    ),
                                    !this._prom ||
                                        (f < d && 0 < this.timeScale()) ||
                                        this._prom()));
                    }
                } else _renderZeroDurationTween(this, t, e, r);
                return this;
            }),
            (t.targets = function () {
                return this._targets;
            }),
            (t.invalidate = function () {
                return (
                    (this._pt =
                        this._op =
                        this._startAt =
                        this._onUpdate =
                        this._lazy =
                        this.ratio =
                            0),
                    (this._ptLookup = []),
                    this.timeline && this.timeline.invalidate(),
                    b.prototype.invalidate.call(this)
                );
            }),
            (t.kill = function (t, e) {
                if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
                    return (
                        (this._lazy = this._pt = 0),
                        this.parent ? _interrupt(this) : this
                    );
                if (this.timeline) {
                    var r = this.timeline.totalDuration();
                    return (
                        this.timeline.killTweensOf(
                            t,
                            e,
                            _overwritingTween &&
                                !0 !== _overwritingTween.vars.overwrite
                        )._first || _interrupt(this),
                        this.parent &&
                            r !== this.timeline.totalDuration() &&
                            _setDuration(
                                this,
                                (this._dur * this.timeline._tDur) / r,
                                0,
                                1
                            ),
                        this
                    );
                }
                var i,
                    n,
                    s,
                    a,
                    o,
                    _,
                    l,
                    u = this._targets,
                    c = t ? toArray(t) : u,
                    p = this._ptLookup,
                    t = this._pt;
                if ((!e || "all" === e) && _arraysMatch(u, c))
                    return "all" === e && (this._pt = 0), _interrupt(this);
                for (
                    i = this._op = this._op || [],
                        "all" !== e &&
                            (_isString(e) &&
                                ((o = {}),
                                _forEachName(e, function (t) {
                                    return (o[t] = 1);
                                }),
                                (e = o)),
                            (e = _addAliasesToVars(u, e))),
                        l = u.length;
                    l--;

                )
                    if (~c.indexOf(u[l]))
                        for (o in ((n = p[l]),
                        "all" === e
                            ? ((i[l] = e), (a = n), (s = {}))
                            : ((s = i[l] = i[l] || {}), (a = e)),
                        a))
                            (_ = n && n[o]) &&
                                (("kill" in _.d && !0 !== _.d.kill(o)) ||
                                    _removeLinkedListItem(this, _, "_pt"),
                                delete n[o]),
                                "all" !== s && (s[o] = 1);
                return (
                    this._initted && !this._pt && t && _interrupt(this), this
                );
            }),
            (n.to = function (t, e) {
                return new n(t, e, arguments[2]);
            }),
            (n.from = function (t, e) {
                return _createTweenType(1, arguments);
            }),
            (n.delayedCall = function (t, e, r, i) {
                return new n(e, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: t,
                    onComplete: e,
                    onReverseComplete: e,
                    onCompleteParams: r,
                    onReverseCompleteParams: r,
                    callbackScope: i,
                });
            }),
            (n.fromTo = function (t, e, r) {
                return _createTweenType(2, arguments);
            }),
            (n.set = function (t, e) {
                return (
                    (e.duration = 0),
                    e.repeatDelay || (e.repeat = 0),
                    new n(t, e)
                );
            }),
            (n.killTweensOf = function (t, e, r) {
                return _globalTimeline.killTweensOf(t, e, r);
            }),
            n
        );
    })(Animation);
_setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0,
}),
    _forEachName("staggerTo,staggerFrom,staggerFromTo", function (r) {
        Tween[r] = function () {
            var t = new Timeline(),
                e = _slice.call(arguments, 0);
            return (
                e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
            );
        };
    });
var _setterPlain = function (t, e, r) {
        return (t[e] = r);
    },
    _setterFunc = function (t, e, r) {
        return t[e](r);
    },
    _setterFuncWithParam = function (t, e, r, i) {
        return t[e](i.fp, r);
    },
    _setterAttribute = function (t, e, r) {
        return t.setAttribute(e, r);
    },
    _getSetter = function (t, e) {
        return _isFunction(t[e])
            ? _setterFunc
            : _isUndefined(t[e]) && t.setAttribute
            ? _setterAttribute
            : _setterPlain;
    },
    _renderPlain = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    _renderBoolean = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    _renderComplexString = function (t, e) {
        var r = e._pt,
            i = "";
        if (!t && e.b) i = e.b;
        else if (1 === t && e.e) i = e.e;
        else {
            for (; r; )
                (i =
                    r.p +
                    (r.m
                        ? r.m(r.s + r.c * t)
                        : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
                    i),
                    (r = r._next);
            i += e.c;
        }
        e.set(e.t, e.p, i, e);
    },
    _renderPropTweens = function (t, e) {
        for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    _addPluginModifier = function (t, e, r, i) {
        for (var n, s = this._pt; s; )
            (n = s._next), s.p === i && s.modifier(t, e, r), (s = n);
    },
    _killPropTweensOf = function (t) {
        for (var e, r, i = this._pt; i; )
            (r = i._next),
                (i.p === t && !i.op) || i.op === t
                    ? _removeLinkedListItem(this, i, "_pt")
                    : i.dep || (e = 1),
                (i = r);
        return !e;
    },
    _setterWithModifier = function (t, e, r, i) {
        i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
    },
    _sortPropTweensByPriority = function (t) {
        for (var e, r, i, n, s = t._pt; s; ) {
            for (e = s._next, r = i; r && r.pr > s.pr; ) r = r._next;
            (s._prev = r ? r._prev : n) ? (s._prev._next = s) : (i = s),
                (s._next = r) ? (r._prev = s) : (n = s),
                (s = e);
        }
        t._pt = i;
    },
    PropTween = (function () {
        function t(t, e, r, i, n, s, a, o, _) {
            (this.t = e),
                (this.s = i),
                (this.c = n),
                (this.p = r),
                (this.r = s || _renderPlain),
                (this.d = a || this),
                (this.set = o || _setterPlain),
                (this.pr = _ || 0),
                (this._next = t) && (t._prev = this);
        }
        return (
            (t.prototype.modifier = function (t, e, r) {
                (this.mSet = this.mSet || this.set),
                    (this.set = _setterWithModifier),
                    (this.m = t),
                    (this.mt = r),
                    (this.tween = e);
            }),
            t
        );
    })();
_forEachName(
    _callbackNames +
        "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
        return (_reservedProps[t] = 1);
    }
),
    (_globals.TweenMax = _globals.TweenLite = Tween),
    (_globals.TimelineLite = _globals.TimelineMax = Timeline),
    (_globalTimeline = new Timeline({
        sortChildren: !1,
        defaults: _defaults,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0,
    })),
    (_config.stringFilter = _colorStringFilter);
var _gsap = {
    registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
        e.forEach(function (t) {
            return _createPlugin(t);
        });
    },
    timeline: function (t) {
        return new Timeline(t);
    },
    getTweensOf: function (t, e) {
        return _globalTimeline.getTweensOf(t, e);
    },
    getProperty: function (i, t, e, r) {
        _isString(i) && (i = toArray(i)[0]);
        var n = _getCache(i || {}).get,
            s = e ? _passThrough : _numericIfPossible;
        return (
            "native" === e && (e = ""),
            i &&
                (t
                    ? s(((_plugins[t] && _plugins[t].get) || n)(i, t, e, r))
                    : function (t, e, r) {
                          return s(
                              ((_plugins[t] && _plugins[t].get) || n)(
                                  i,
                                  t,
                                  e,
                                  r
                              )
                          );
                      })
        );
    },
    quickSetter: function (r, e, i) {
        if (1 < (r = toArray(r)).length) {
            var n = r.map(function (t) {
                    return gsap.quickSetter(t, e, i);
                }),
                s = n.length;
            return function (t) {
                for (var e = s; e--; ) n[e](t);
            };
        }
        r = r[0] || {};
        var a = _plugins[e],
            o = _getCache(r),
            _ = (o.harness && (o.harness.aliases || {})[e]) || e,
            l = a
                ? function (t) {
                      var e = new a();
                      (_quickTween._pt = 0),
                          e.init(r, i ? t + i : t, _quickTween, 0, [r]),
                          e.render(1, e),
                          _quickTween._pt && _renderPropTweens(1, _quickTween);
                  }
                : o.set(r, _);
        return a
            ? l
            : function (t) {
                  return l(r, _, i ? t + i : t, o, 1);
              };
    },
    isTweening: function (t) {
        return 0 < _globalTimeline.getTweensOf(t, !0).length;
    },
    defaults: function (t) {
        return (
            t && t.ease && (t.ease = _parseEase(t.ease, _defaults.ease)),
            _mergeDeep(_defaults, t || {})
        );
    },
    config: function (t) {
        return _mergeDeep(_config, t || {});
    },
    registerEffect: function (t) {
        var i = t.name,
            n = t.effect,
            e = t.plugins,
            s = t.defaults,
            t = t.extendTimeline;
        (e || "").split(",").forEach(function (t) {
            return (
                t &&
                !_plugins[t] &&
                !_globals[t] &&
                _warn(i + " effect requires " + t + " plugin.")
            );
        }),
            (_effects[i] = function (t, e, r) {
                return n(toArray(t), _setDefaults(e || {}, s), r);
            }),
            t &&
                (Timeline.prototype[i] = function (t, e, r) {
                    return this.add(
                        _effects[i](t, _isObject(e) ? e : (r = e) && {}, this),
                        r
                    );
                });
    },
    registerEase: function (t, e) {
        _easeMap[t] = _parseEase(e);
    },
    parseEase: function (t, e) {
        return arguments.length ? _parseEase(t, e) : _easeMap;
    },
    getById: function (t) {
        return _globalTimeline.getById(t);
    },
    exportRoot: function (t, e) {
        var r,
            i,
            n = new Timeline((t = void 0 === t ? {} : t));
        for (
            n.smoothChildTiming = _isNotFalse(t.smoothChildTiming),
                _globalTimeline.remove(n),
                n._dp = 0,
                n._time = n._tTime = _globalTimeline._time,
                r = _globalTimeline._first;
            r;

        )
            (i = r._next),
                (!e &&
                    !r._dur &&
                    r instanceof Tween &&
                    r.vars.onComplete === r._targets[0]) ||
                    _addToTimeline(n, r, r._start - r._delay),
                (r = i);
        return _addToTimeline(_globalTimeline, n, 0), n;
    },
    utils: {
        wrap: wrap,
        wrapYoyo: wrapYoyo,
        distribute: distribute,
        random: random,
        snap: snap,
        normalize: normalize,
        getUnit: getUnit,
        clamp: clamp,
        splitColor: splitColor,
        toArray: toArray,
        selector: selector,
        mapRange: mapRange,
        pipe: pipe,
        unitize: unitize,
        interpolate: interpolate,
        shuffle: shuffle,
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
        PropTween: PropTween,
        globals: _addGlobal,
        Tween: Tween,
        Timeline: Timeline,
        Animation: Animation,
        getCache: _getCache,
        _removeLinkedListItem: _removeLinkedListItem,
        suppressOverwrites: function (t) {
            return (_suppressOverwrites = t);
        },
    },
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (_gsap[t] = Tween[t]);
}),
    _ticker.add(Timeline.updateRoot);
var _quickTween = _gsap.to({}, { duration: 0 }),
    _getPluginPropTween = function (t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
            r = r._next;
        return r;
    },
    _addModifiers = function (t, e) {
        var r,
            i,
            n,
            s = t._targets;
        for (r in e)
            for (i = s.length; i--; )
                (n = (n = t._ptLookup[i][r]) && n.d) &&
                    (n = n._pt ? _getPluginPropTween(n, r) : n) &&
                    n.modifier &&
                    n.modifier(e[r], t, s[i], r);
    },
    _buildModifierPlugin = function (t, n) {
        return {
            name: t,
            rawVars: 1,
            init: function (t, i, e) {
                e._onInit = function (t) {
                    var e, r;
                    if (
                        (_isString(i) &&
                            ((e = {}),
                            _forEachName(i, function (t) {
                                return (e[t] = 1);
                            }),
                            (i = e)),
                        n)
                    ) {
                        for (r in ((e = {}), i)) e[r] = n(i[r]);
                        i = e;
                    }
                    _addModifiers(t, i);
                };
            },
        };
    },
    gsap =
        _gsap.registerPlugin(
            {
                name: "attr",
                init: function (t, e, r, i, n) {
                    var s, a;
                    for (s in e)
                        (a = this.add(
                            t,
                            "setAttribute",
                            (t.getAttribute(s) || 0) + "",
                            e[s],
                            i,
                            n,
                            0,
                            0,
                            s
                        )) && (a.op = s),
                            this._props.push(s);
                },
            },
            {
                name: "endArray",
                init: function (t, e) {
                    for (var r = e.length; r--; )
                        this.add(t, r, t[r] || 0, e[r]);
                },
            },
            _buildModifierPlugin("roundProps", _roundModifier),
            _buildModifierPlugin("modifiers"),
            _buildModifierPlugin("snap", snap)
        ) || _gsap;
(Tween.version = Timeline.version = gsap.version = "3.7.1"),
    (_coreReady = 1),
    _windowExists$1() && _wake();
var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _recentSetterPlugin,
    _supports3D,
    _windowExists = function () {
        return "undefined" != typeof window;
    },
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity",
    },
    _renderCSSProp = function (t, e) {
        return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
        );
    },
    _renderPropWithEnd = function (t, e) {
        return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
        );
    },
    _renderCSSPropWithBeginning = function (t, e) {
        return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
        );
    },
    _renderRoundedCSSProp = function (t, e) {
        t = e.s + e.c * t;
        e.set(e.t, e.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    _renderNonTweeningValue = function (t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    _renderNonTweeningValueOnlyAtEnd = function (t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
    },
    _setterCSSStyle = function (t, e, r) {
        return (t.style[e] = r);
    },
    _setterCSSProp = function (t, e, r) {
        return t.style.setProperty(e, r);
    },
    _setterTransform = function (t, e, r) {
        return (t._gsap[e] = r);
    },
    _setterScale = function (t, e, r) {
        return (t._gsap.scaleX = t._gsap.scaleY = r);
    },
    _setterScaleWithRender = function (t, e, r, i, n) {
        t = t._gsap;
        (t.scaleX = t.scaleY = r), t.renderTransform(n, t);
    },
    _setterTransformWithRender = function (t, e, r, i, n) {
        t = t._gsap;
        (t[e] = r), t.renderTransform(n, t);
    },
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _createElement = function (t, e) {
        e = _doc.createElementNS
            ? _doc.createElementNS(
                  (e || "http://www.w3.org/1999/xhtml").replace(
                      /^https/,
                      "http"
                  ),
                  t
              )
            : _doc.createElement(t);
        return e.style ? e : _doc.createElement(t);
    },
    _getComputedProperty = function t(e, r, i) {
        var n = getComputedStyle(e);
        return (
            n[r] ||
            n.getPropertyValue(r.replace(_capsExp, "-$1").toLowerCase()) ||
            n.getPropertyValue(r) ||
            (!i && t(e, _checkPropPrefix(r) || r, 1)) ||
            ""
        );
    },
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function (t, e, r) {
        var i = (e || _tempDiv).style,
            n = 5;
        if (t in i && !r) return t;
        for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            n-- && !(_prefixes[n] + t in i);

        );
        return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? _prefixes[n] : "") + t;
    },
    _initCore = function () {
        _windowExists() &&
            window.document &&
            ((_win = window),
            (_doc = _win.document),
            (_docElement = _doc.documentElement),
            (_tempDiv = _createElement("div") || { style: {} }),
            _createElement("div"),
            (_transformProp = _checkPropPrefix(_transformProp)),
            (_transformOriginProp = _transformProp + "Origin"),
            (_tempDiv.style.cssText =
                "border-width:0;line-height:0;position:absolute;padding:0"),
            (_supports3D = !!_checkPropPrefix("perspective")),
            (_pluginInitted = 1));
    },
    _getBBoxHack = function t(e) {
        var r,
            i = _createElement(
                "svg",
                (this.ownerSVGElement &&
                    this.ownerSVGElement.getAttribute("xmlns")) ||
                    "http://www.w3.org/2000/svg"
            ),
            n = this.parentNode,
            s = this.nextSibling,
            a = this.style.cssText;
        if (
            (_docElement.appendChild(i),
            i.appendChild(this),
            (this.style.display = "block"),
            e)
        )
            try {
                (r = this.getBBox()),
                    (this._gsapBBox = this.getBBox),
                    (this.getBBox = t);
            } catch (t) {}
        else this._gsapBBox && (r = this._gsapBBox());
        return (
            n && (s ? n.insertBefore(this, s) : n.appendChild(this)),
            _docElement.removeChild(i),
            (this.style.cssText = a),
            r
        );
    },
    _getAttributeFallbacks = function (t, e) {
        for (var r = e.length; r--; )
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
    },
    _getBBox = function (e) {
        var r;
        try {
            r = e.getBBox();
        } catch (t) {
            r = _getBBoxHack.call(e, !0);
        }
        return !(r = !(
            (r && (r.width || r.height)) ||
            e.getBBox === _getBBoxHack
        )
            ? _getBBoxHack.call(e, !0)
            : r) ||
            r.width ||
            r.x ||
            r.y
            ? r
            : {
                  x: +_getAttributeFallbacks(e, ["x", "cx", "x1"]) || 0,
                  y: +_getAttributeFallbacks(e, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
              };
    },
    _isSVG = function (t) {
        return !(
            !t.getCTM ||
            (t.parentNode && !t.ownerSVGElement) ||
            !_getBBox(t)
        );
    },
    _removeProperty = function (t, e) {
        e &&
            ((t = t.style),
            e in _transformProps &&
                e !== _transformOriginProp &&
                (e = _transformProp),
            t.removeProperty
                ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                      (e = "-" + e),
                  t.removeProperty(e.replace(_capsExp, "-$1").toLowerCase()))
                : t.removeAttribute(e));
    },
    _addNonTweeningPT = function (t, e, r, i, n, s) {
        s = new PropTween(
            t._pt,
            e,
            r,
            0,
            1,
            s ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue
        );
        return ((t._pt = s).b = i), (s.e = n), t._props.push(r), s;
    },
    _nonConvertibleUnits = { deg: 1, rad: 1, turn: 1 },
    _convertToUnit = function t(e, r, i, n) {
        var s,
            a = parseFloat(i) || 0,
            o = (i + "").trim().substr((a + "").length) || "px",
            _ = _tempDiv.style,
            l = _horizontalExp.test(r),
            u = "svg" === e.tagName.toLowerCase(),
            c = (u ? "client" : "offset") + (l ? "Width" : "Height"),
            p = "px" === n,
            d = "%" === n;
        return n === o ||
            !a ||
            _nonConvertibleUnits[n] ||
            _nonConvertibleUnits[o]
            ? a
            : ("px" === o || p || (a = t(e, r, i, "px")),
              (i = e.getCTM && _isSVG(e)),
              (!d && "%" !== o) || (!_transformProps[r] && !~r.indexOf("adius"))
                  ? ((_[l ? "width" : "height"] = 100 + (p ? o : n)),
                    (n =
                        ~r.indexOf("adius") ||
                        ("em" === n && e.appendChild && !u)
                            ? e
                            : e.parentNode),
                    (u = (n =
                        !(n = i ? (e.ownerSVGElement || {}).parentNode : n) ||
                        n === _doc ||
                        !n.appendChild
                            ? _doc.body
                            : n)._gsap) &&
                    d &&
                    u.width &&
                    l &&
                    u.time === _ticker.time
                        ? _round((a / u.width) * 100)
                        : ((!d && "%" !== o) ||
                              (_.position = _getComputedProperty(
                                  e,
                                  "position"
                              )),
                          n === e && (_.position = "static"),
                          n.appendChild(_tempDiv),
                          (s = _tempDiv[c]),
                          n.removeChild(_tempDiv),
                          (_.position = "absolute"),
                          l &&
                              d &&
                              (((u = _getCache(n)).time = _ticker.time),
                              (u.width = n[c])),
                          _round(
                              p ? (s * a) / 100 : s && a ? (100 / s) * a : 0
                          )))
                  : ((s = i ? e.getBBox()[l ? "width" : "height"] : e[c]),
                    _round(d ? (a / s) * 100 : (a / 100) * s)));
    },
    _get = function (t, e, r, i) {
        var n;
        return (
            _pluginInitted || _initCore(),
            e in _propertyAliases &&
                "transform" !== e &&
                ~(e = _propertyAliases[e]).indexOf(",") &&
                (e = e.split(",")[0]),
            _transformProps[e] && "transform" !== e
                ? ((n = _parseTransform(t, i)),
                  (n =
                      "transformOrigin" !== e
                          ? n[e]
                          : n.svg
                          ? n.origin
                          : _firstTwoOnly(
                                _getComputedProperty(t, _transformOriginProp)
                            ) +
                            " " +
                            n.zOrigin +
                            "px"))
                : ((n = t.style[e]) &&
                      "auto" !== n &&
                      !i &&
                      !~(n + "").indexOf("calc(")) ||
                  (n =
                      (_specialProps[e] && _specialProps[e](t, e, r)) ||
                      _getComputedProperty(t, e) ||
                      _getProperty(t, e) ||
                      ("opacity" === e ? 1 : 0)),
            r && !~(n + "").trim().indexOf(" ")
                ? _convertToUnit(t, e, n, r) + r
                : n
        );
    },
    _tweenComplexCSSString = function (t, e, r, i) {
        var n;
        (r && "none" !== r) ||
            ((s =
                (n = _checkPropPrefix(e, t, 1)) &&
                _getComputedProperty(t, n, 1)) && s !== r
                ? ((e = n), (r = s))
                : "borderColor" === e &&
                  (r = _getComputedProperty(t, "borderTopColor")));
        var s,
            a,
            o,
            _,
            l,
            u,
            c,
            p,
            d,
            h,
            f = new PropTween(this._pt, t.style, e, 0, 1, _renderComplexString),
            m = 0,
            g = 0;
        if (
            ((f.b = r),
            (f.e = i),
            (r += ""),
            "auto" === (i += "") &&
                ((t.style[e] = i),
                (i = _getComputedProperty(t, e) || i),
                (t.style[e] = r)),
            _colorStringFilter((s = [r, i])),
            (i = s[1]),
            (a = (r = s[0]).match(_numWithUnitExp) || []),
            (i.match(_numWithUnitExp) || []).length)
        ) {
            for (; (u = _numWithUnitExp.exec(i)); )
                (p = u[0]),
                    (c = i.substring(m, u.index)),
                    _
                        ? (_ = (_ + 1) % 5)
                        : ("rgba(" !== c.substr(-5) &&
                              "hsla(" !== c.substr(-5)) ||
                          (_ = 1),
                    p !== (l = a[g++] || "") &&
                        ((o = parseFloat(l) || 0),
                        (d = l.substr((o + "").length)),
                        (h = "=" === p.charAt(1) ? +(p.charAt(0) + "1") : 0) &&
                            (p = p.substr(2)),
                        (u = parseFloat(p)),
                        (p = p.substr((u + "").length)),
                        (m = _numWithUnitExp.lastIndex - p.length),
                        p ||
                            ((p = p || _config.units[e] || d),
                            m === i.length && ((i += p), (f.e += p))),
                        d !== p && (o = _convertToUnit(t, e, l, p) || 0),
                        (f._pt = {
                            _next: f._pt,
                            p: c || 1 === g ? c : ",",
                            s: o,
                            c: h ? h * u : u - o,
                            m: (_ && _ < 4) || "zIndex" === e ? Math.round : 0,
                        }));
            f.c = m < i.length ? i.substring(m, i.length) : "";
        } else
            f.r =
                "display" === e && "none" === i
                    ? _renderNonTweeningValueOnlyAtEnd
                    : _renderNonTweeningValue;
        return _relExp.test(i) && (f.e = 0), (this._pt = f);
    },
    _keywordToPercent = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%",
    },
    _convertKeywordsToPercentages = function (t) {
        var e = t.split(" "),
            r = e[0],
            i = e[1] || "50%";
        return (
            ("top" !== r && "bottom" !== r && "left" !== i && "right" !== i) ||
                ((t = r), (r = i), (i = t)),
            (e[0] = _keywordToPercent[r] || r),
            (e[1] = _keywordToPercent[i] || i),
            e.join(" ")
        );
    },
    _renderClearProps = function (t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r,
                i,
                n,
                s = e.t,
                a = s.style,
                o = e.u,
                e = s._gsap;
            if ("all" === o || !0 === o) (a.cssText = ""), (i = 1);
            else
                for (n = (o = o.split(",")).length; -1 < --n; )
                    (r = o[n]),
                        _transformProps[r] &&
                            ((i = 1),
                            (r =
                                "transformOrigin" === r
                                    ? _transformOriginProp
                                    : _transformProp)),
                        _removeProperty(s, r);
            i &&
                (_removeProperty(s, _transformProp),
                e &&
                    (e.svg && s.removeAttribute("transform"),
                    _parseTransform(s, 1),
                    (e.uncache = 1)));
        }
    },
    _specialProps = {
        clearProps: function (t, e, r, i, n) {
            if ("isFromStart" !== n.data) {
                e = t._pt = new PropTween(t._pt, e, r, 0, 0, _renderClearProps);
                return (
                    (e.u = i), (e.pr = -10), (e.tween = n), t._props.push(r), 1
                );
            }
        },
    },
    _identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function (t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
    },
    _getComputedTransformMatrixAsArray = function (t) {
        t = _getComputedProperty(t, _transformProp);
        return _isNullTransform(t)
            ? _identity2DMatrix
            : t.substr(7).match(_numExp).map(_round);
    },
    _getMatrix = function (t, e) {
        var r,
            i,
            n,
            s = t._gsap || _getCache(t),
            a = t.style,
            o = _getComputedTransformMatrixAsArray(t);
        return s.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (o = [
                  (i = t.transform.baseVal.consolidate().matrix).a,
                  i.b,
                  i.c,
                  i.d,
                  i.e,
                  i.f,
              ]).join(",")
                ? _identity2DMatrix
                : o
            : (o !== _identity2DMatrix ||
                  t.offsetParent ||
                  t === _docElement ||
                  s.svg ||
                  ((i = a.display),
                  (a.display = "block"),
                  ((s = t.parentNode) && t.offsetParent) ||
                      ((n = 1),
                      (r = t.nextSibling),
                      _docElement.appendChild(t)),
                  (o = _getComputedTransformMatrixAsArray(t)),
                  i ? (a.display = i) : _removeProperty(t, "display"),
                  n &&
                      (r
                          ? s.insertBefore(t, r)
                          : s
                          ? s.appendChild(t)
                          : _docElement.removeChild(t))),
              e && 6 < o.length ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o);
    },
    _applySVGOrigin = function (t, e, r, i, n, s) {
        var a,
            o,
            _ = t._gsap,
            l = n || _getMatrix(t, !0),
            u = _.xOrigin || 0,
            c = _.yOrigin || 0,
            p = _.xOffset || 0,
            d = _.yOffset || 0,
            h = l[0],
            f = l[1],
            m = l[2],
            g = l[3],
            y = l[4],
            v = l[5],
            T = e.split(" "),
            w = parseFloat(T[0]) || 0,
            n = parseFloat(T[1]) || 0;
        r
            ? l !== _identity2DMatrix &&
              (a = h * g - f * m) &&
              ((o = w * (-f / a) + n * (h / a) - (h * v - f * y) / a),
              (w = w * (g / a) + n * (-m / a) + (m * v - g * y) / a),
              (n = o))
            : ((w =
                  (o = _getBBox(t)).x +
                  (~T[0].indexOf("%") ? (w / 100) * o.width : w)),
              (n =
                  o.y +
                  (~(T[1] || T[0]).indexOf("%") ? (n / 100) * o.height : n))),
            i || (!1 !== i && _.smooth)
                ? ((_.xOffset = p + ((y = w - u) * h + (v = n - c) * m) - y),
                  (_.yOffset = d + (y * f + v * g) - v))
                : (_.xOffset = _.yOffset = 0),
            (_.xOrigin = w),
            (_.yOrigin = n),
            (_.smooth = !!i),
            (_.origin = e),
            (_.originIsAbsolute = !!r),
            (t.style[_transformOriginProp] = "0px 0px"),
            s &&
                (_addNonTweeningPT(s, _, "xOrigin", u, w),
                _addNonTweeningPT(s, _, "yOrigin", c, n),
                _addNonTweeningPT(s, _, "xOffset", p, _.xOffset),
                _addNonTweeningPT(s, _, "yOffset", d, _.yOffset)),
            t.setAttribute("data-svg-origin", w + " " + n);
    },
    _parseTransform = function (t, e) {
        var r = t._gsap || new GSCache(t);
        if ("x" in r && !e && !r.uncache) return r;
        var i,
            n,
            s,
            a,
            o,
            _,
            l,
            u,
            c,
            p,
            d,
            h,
            f,
            m,
            g,
            y,
            v,
            T,
            w,
            x,
            b,
            P,
            S,
            k,
            A,
            E = t.style,
            C = r.scaleX < 0,
            D = "deg",
            O = _getComputedProperty(t, _transformOriginProp) || "0",
            F = (i = n = a = o = _ = l = u = 0),
            M = (s = 1);
        return (
            (r.svg = !(!t.getCTM || !_isSVG(t))),
            (c = _getMatrix(t, r.svg)),
            r.svg &&
                ((T =
                    (!r.uncache || "0px 0px" === O) &&
                    !e &&
                    t.getAttribute("data-svg-origin")),
                _applySVGOrigin(
                    t,
                    T || O,
                    !!T || r.originIsAbsolute,
                    !1 !== r.smooth,
                    c
                )),
            (P = r.xOrigin || 0),
            (k = r.yOrigin || 0),
            c !== _identity2DMatrix &&
                ((h = c[0]),
                (f = c[1]),
                (m = c[2]),
                (g = c[3]),
                (F = y = c[4]),
                (i = v = c[5]),
                6 === c.length
                    ? ((M = Math.sqrt(h * h + f * f)),
                      (s = Math.sqrt(g * g + m * m)),
                      (a = h || f ? _atan2(f, h) * _RAD2DEG : 0),
                      (l = m || g ? _atan2(m, g) * _RAD2DEG + a : 0) &&
                          (s *= Math.abs(Math.cos(l * _DEG2RAD))),
                      r.svg &&
                          ((F -= P - (P * h + k * m)),
                          (i -= k - (P * f + k * g))))
                    : ((A = c[6]),
                      (S = c[7]),
                      (b = c[8]),
                      (e = c[9]),
                      (P = c[10]),
                      (k = c[11]),
                      (F = c[12]),
                      (i = c[13]),
                      (n = c[14]),
                      (o = (c = _atan2(A, P)) * _RAD2DEG),
                      c &&
                          ((T =
                              y * (p = Math.cos(-c)) + b * (d = Math.sin(-c))),
                          (w = v * p + e * d),
                          (x = A * p + P * d),
                          (b = y * -d + b * p),
                          (e = v * -d + e * p),
                          (P = A * -d + P * p),
                          (k = S * -d + k * p),
                          (y = T),
                          (v = w),
                          (A = x)),
                      (_ = (c = _atan2(-m, P)) * _RAD2DEG),
                      c &&
                          ((p = Math.cos(-c)),
                          (k = g * (d = Math.sin(-c)) + k * p),
                          (h = T = h * p - b * d),
                          (f = w = f * p - e * d),
                          (m = x = m * p - P * d)),
                      (a = (c = _atan2(f, h)) * _RAD2DEG),
                      c &&
                          ((T = h * (p = Math.cos(c)) + f * (d = Math.sin(c))),
                          (w = y * p + v * d),
                          (f = f * p - h * d),
                          (v = v * p - y * d),
                          (h = T),
                          (y = w)),
                      o &&
                          359.9 < Math.abs(o) + Math.abs(a) &&
                          ((o = a = 0), (_ = 180 - _)),
                      (M = _round(Math.sqrt(h * h + f * f + m * m))),
                      (s = _round(Math.sqrt(v * v + A * A))),
                      (c = _atan2(y, v)),
                      (l = 2e-4 < Math.abs(c) ? c * _RAD2DEG : 0),
                      (u = k ? 1 / (k < 0 ? -k : k) : 0)),
                r.svg &&
                    ((T = t.getAttribute("transform")),
                    (r.forceCSS =
                        t.setAttribute("transform", "") ||
                        !_isNullTransform(
                            _getComputedProperty(t, _transformProp)
                        )),
                    T && t.setAttribute("transform", T))),
            90 < Math.abs(l) &&
                Math.abs(l) < 270 &&
                (C
                    ? ((M *= -1),
                      (l += a <= 0 ? 180 : -180),
                      (a += a <= 0 ? 180 : -180))
                    : ((s *= -1), (l += l <= 0 ? 180 : -180))),
            (r.x =
                F -
                ((r.xPercent =
                    F &&
                    (r.xPercent ||
                        (Math.round(t.offsetWidth / 2) === Math.round(-F)
                            ? -50
                            : 0)))
                    ? (t.offsetWidth * r.xPercent) / 100
                    : 0) +
                "px"),
            (r.y =
                i -
                ((r.yPercent =
                    i &&
                    (r.yPercent ||
                        (Math.round(t.offsetHeight / 2) === Math.round(-i)
                            ? -50
                            : 0)))
                    ? (t.offsetHeight * r.yPercent) / 100
                    : 0) +
                "px"),
            (r.z = n + "px"),
            (r.scaleX = _round(M)),
            (r.scaleY = _round(s)),
            (r.rotation = _round(a) + D),
            (r.rotationX = _round(o) + D),
            (r.rotationY = _round(_) + D),
            (r.skewX = l + D),
            (r.skewY = 0 + D),
            (r.transformPerspective = u + "px"),
            (r.zOrigin = parseFloat(O.split(" ")[2]) || 0) &&
                (E[_transformOriginProp] = _firstTwoOnly(O)),
            (r.xOffset = r.yOffset = 0),
            (r.force3D = _config.force3D),
            (r.renderTransform = r.svg
                ? _renderSVGTransforms
                : _supports3D
                ? _renderCSSTransforms
                : _renderNon3DTransforms),
            (r.uncache = 0),
            r
        );
    },
    _firstTwoOnly = function (t) {
        return (t = t.split(" "))[0] + " " + t[1];
    },
    _addPxTranslate = function (t, e, r) {
        var i = getUnit(e);
        return (
            _round(
                parseFloat(e) + parseFloat(_convertToUnit(t, "x", r + "px", i))
            ) + i
        );
    },
    _renderNon3DTransforms = function (t, e) {
        (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            _renderCSSTransforms(t, e);
    },
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function (t, e) {
        var r = e || this,
            i = r.xPercent,
            n = r.yPercent,
            s = r.x,
            a = r.y,
            o = r.z,
            _ = r.rotation,
            l = r.rotationY,
            u = r.rotationX,
            c = r.skewX,
            p = r.skewY,
            d = r.scaleX,
            h = r.scaleY,
            f = r.transformPerspective,
            m = r.force3D,
            g = r.target,
            y = r.zOrigin,
            v = "",
            T = ("auto" === m && t && 1 !== t) || !0 === m;
        !y ||
            (u === _zeroDeg && l === _zeroDeg) ||
            ((e = parseFloat(l) * _DEG2RAD),
            (r = Math.sin(e)),
            (t = Math.cos(e)),
            (e = parseFloat(u) * _DEG2RAD),
            (m = Math.cos(e)),
            (s = _addPxTranslate(g, s, r * m * -y)),
            (a = _addPxTranslate(g, a, -Math.sin(e) * -y)),
            (o = _addPxTranslate(g, o, t * m * -y + y))),
            f !== _zeroPx && (v += "perspective(" + f + _endParenthesis),
            (i || n) && (v += "translate(" + i + "%, " + n + "%) "),
            (!T && s === _zeroPx && a === _zeroPx && o === _zeroPx) ||
                (v +=
                    o !== _zeroPx || T
                        ? "translate3d(" + s + ", " + a + ", " + o + ") "
                        : "translate(" + s + ", " + a + _endParenthesis),
            _ !== _zeroDeg && (v += "rotate(" + _ + _endParenthesis),
            l !== _zeroDeg && (v += "rotateY(" + l + _endParenthesis),
            u !== _zeroDeg && (v += "rotateX(" + u + _endParenthesis),
            (c === _zeroDeg && p === _zeroDeg) ||
                (v += "skew(" + c + ", " + p + _endParenthesis),
            (1 === d && 1 === h) ||
                (v += "scale(" + d + ", " + h + _endParenthesis),
            (g.style[_transformProp] = v || "translate(0, 0)");
    },
    _renderSVGTransforms = function (t, e) {
        var r,
            i,
            n,
            s,
            a,
            o = e || this,
            _ = o.xPercent,
            l = o.yPercent,
            u = o.x,
            c = o.y,
            p = o.rotation,
            d = o.skewX,
            h = o.skewY,
            f = o.scaleX,
            m = o.scaleY,
            g = o.target,
            y = o.xOrigin,
            v = o.yOrigin,
            T = o.xOffset,
            w = o.yOffset,
            x = o.forceCSS,
            e = parseFloat(u),
            o = parseFloat(c),
            p = parseFloat(p),
            d = parseFloat(d);
        (h = parseFloat(h)) && ((d += h = parseFloat(h)), (p += h)),
            p || d
                ? ((p *= _DEG2RAD),
                  (d *= _DEG2RAD),
                  (r = Math.cos(p) * f),
                  (i = Math.sin(p) * f),
                  (n = Math.sin(p - d) * -m),
                  (s = Math.cos(p - d) * m),
                  d &&
                      ((h *= _DEG2RAD),
                      (a = Math.tan(d - h)),
                      (n *= a = Math.sqrt(1 + a * a)),
                      (s *= a),
                      h &&
                          ((a = Math.tan(h)),
                          (r *= a = Math.sqrt(1 + a * a)),
                          (i *= a))),
                  (r = _round(r)),
                  (i = _round(i)),
                  (n = _round(n)),
                  (s = _round(s)))
                : ((r = f), (s = m), (i = n = 0)),
            ((e && !~(u + "").indexOf("px")) ||
                (o && !~(c + "").indexOf("px"))) &&
                ((e = _convertToUnit(g, "x", u, "px")),
                (o = _convertToUnit(g, "y", c, "px"))),
            (y || v || T || w) &&
                ((e = _round(e + y - (y * r + v * n) + T)),
                (o = _round(o + v - (y * i + v * s) + w))),
            (_ || l) &&
                ((a = g.getBBox()),
                (e = _round(e + (_ / 100) * a.width)),
                (o = _round(o + (l / 100) * a.height))),
            g.setAttribute(
                "transform",
                (a =
                    "matrix(" +
                    r +
                    "," +
                    i +
                    "," +
                    n +
                    "," +
                    s +
                    "," +
                    e +
                    "," +
                    o +
                    ")")
            ),
            x && (g.style[_transformProp] = a);
    },
    _addRotationalPropTween = function (t, e, r, i, n, s) {
        var a = 360,
            o = _isString(n),
            _ = parseFloat(n) * (o && ~n.indexOf("rad") ? _RAD2DEG : 1),
            s = s ? _ * s : _ - i,
            _ = i + s + "deg";
        return (
            o &&
                ("short" === (n = n.split("_")[1]) &&
                    (s %= a) !== s % 180 &&
                    (s += s < 0 ? a : -a),
                "cw" === n && s < 0
                    ? (s = ((s + a * _bigNum) % a) - ~~(s / a) * a)
                    : "ccw" === n &&
                      0 < s &&
                      (s = ((s - a * _bigNum) % a) - ~~(s / a) * a)),
            (t._pt = s = new PropTween(t._pt, e, r, i, s, _renderPropWithEnd)),
            (s.e = _),
            (s.u = "deg"),
            t._props.push(r),
            s
        );
    },
    _assign = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
    },
    _addRawTransformPTs = function (t, e, r) {
        var i,
            n,
            s,
            a,
            o,
            _,
            l = _assign({}, r._gsap),
            u = r.style;
        for (n in (l.svg
            ? ((s = r.getAttribute("transform")),
              r.setAttribute("transform", ""),
              (u[_transformProp] = e),
              (i = _parseTransform(r, 1)),
              _removeProperty(r, _transformProp),
              r.setAttribute("transform", s))
            : ((s = getComputedStyle(r)[_transformProp]),
              (u[_transformProp] = e),
              (i = _parseTransform(r, 1)),
              (u[_transformProp] = s)),
        _transformProps))
            (s = l[n]) !== (o = i[n]) &&
                "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) <
                    0 &&
                ((a =
                    getUnit(s) !== (_ = getUnit(o))
                        ? _convertToUnit(r, n, s, _)
                        : parseFloat(s)),
                (o = parseFloat(o)),
                (t._pt = new PropTween(t._pt, i, n, a, o - a, _renderCSSProp)),
                (t._pt.u = _ || 0),
                t._props.push(n));
        _assign(i, l);
    };
_forEachName("padding,margin,Width,Radius", function (e, r) {
    var t = "Top",
        i = "Right",
        n = "Bottom",
        s = "Left",
        o = (r < 3 ? [t, i, n, s] : [t + s, t + i, n + i, n + s]).map(function (
            t
        ) {
            return r < 2 ? e + t : "border" + t + e;
        });
    _specialProps[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
        var s, a;
        if (arguments.length < 4)
            return (
                (s = o.map(function (t) {
                    return _get(e, t, r);
                })),
                5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a
            );
        (s = (i + "").split(" ")),
            (a = {}),
            o.forEach(function (t, e) {
                return (a[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
            }),
            e.init(t, a, n);
    };
});
var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function (t) {
        return t.style && t.nodeType;
    },
    init: function (t, e, r, i, n) {
        var s,
            a,
            o,
            _,
            l,
            u,
            c,
            p,
            d,
            h,
            f,
            m,
            g,
            y = this._props,
            v = t.style,
            T = r.vars.startAt;
        for (l in (_pluginInitted || _initCore(), e))
            if (
                "autoRound" !== l &&
                ((a = e[l]), !_plugins[l] || !_checkPlugin(l, e, r, i, t, n))
            )
                if (
                    ((_ = _specialProps[l]),
                    "string" ===
                        (d =
                            "function" === (d = typeof a)
                                ? typeof (a = a.call(r, i, t, n))
                                : d) &&
                        ~a.indexOf("random(") &&
                        (a = _replaceRandom(a)),
                    _)
                )
                    _(this, t, l, a, r) && (g = 1);
                else if ("--" === l.substr(0, 2))
                    (s = (getComputedStyle(t).getPropertyValue(l) + "").trim()),
                        (a += ""),
                        (_colorExp.lastIndex = 0),
                        _colorExp.test(s) ||
                            ((u = getUnit(s)), (c = getUnit(a))),
                        c
                            ? u !== c && (s = _convertToUnit(t, l, s, c) + c)
                            : u && (a += u),
                        this.add(v, "setProperty", s, a, i, n, 0, 0, l),
                        y.push(l);
                else if ("undefined" !== d) {
                    if (
                        (T && l in T
                            ? ((s =
                                  "function" == typeof T[l]
                                      ? T[l].call(r, i, t, n)
                                      : T[l]),
                              l in _config.units &&
                                  !getUnit(s) &&
                                  (s += _config.units[l]),
                              "=" === (s + "").charAt(1) && (s = _get(t, l)))
                            : (s = _get(t, l)),
                        (o = parseFloat(s)),
                        (p =
                            "string" === d && "=" === a.charAt(1)
                                ? +(a.charAt(0) + "1")
                                : 0) && (a = a.substr(2)),
                        (_ = parseFloat(a)),
                        l in _propertyAliases &&
                            ("autoAlpha" === l &&
                                (1 === o &&
                                    "hidden" === _get(t, "visibility") &&
                                    _ &&
                                    (o = 0),
                                _addNonTweeningPT(
                                    this,
                                    v,
                                    "visibility",
                                    o ? "inherit" : "hidden",
                                    _ ? "inherit" : "hidden",
                                    !_
                                )),
                            "scale" !== l &&
                                "transform" !== l &&
                                ~(l = _propertyAliases[l]).indexOf(",") &&
                                (l = l.split(",")[0])),
                        (d = l in _transformProps))
                    )
                        if (
                            (h ||
                                (((f = t._gsap).renderTransform &&
                                    !e.parseTransform) ||
                                    _parseTransform(t, e.parseTransform),
                                (m = !1 !== e.smoothOrigin && f.smooth),
                                ((h = this._pt =
                                    new PropTween(
                                        this._pt,
                                        v,
                                        _transformProp,
                                        0,
                                        1,
                                        f.renderTransform,
                                        f,
                                        0,
                                        -1
                                    )).dep = 1)),
                            "scale" === l)
                        )
                            (this._pt = new PropTween(
                                this._pt,
                                f,
                                "scaleY",
                                f.scaleY,
                                (p ? p * _ : _ - f.scaleY) || 0
                            )),
                                y.push("scaleY", l),
                                (l += "X");
                        else {
                            if ("transformOrigin" === l) {
                                (a = _convertKeywordsToPercentages(a)),
                                    f.svg
                                        ? _applySVGOrigin(t, a, 0, m, 0, this)
                                        : ((c =
                                              parseFloat(a.split(" ")[2]) ||
                                              0) !== f.zOrigin &&
                                              _addNonTweeningPT(
                                                  this,
                                                  f,
                                                  "zOrigin",
                                                  f.zOrigin,
                                                  c
                                              ),
                                          _addNonTweeningPT(
                                              this,
                                              v,
                                              l,
                                              _firstTwoOnly(s),
                                              _firstTwoOnly(a)
                                          ));
                                continue;
                            }
                            if ("svgOrigin" === l) {
                                _applySVGOrigin(t, a, 1, m, 0, this);
                                continue;
                            }
                            if (l in _rotationalProperties) {
                                _addRotationalPropTween(this, f, l, o, a, p);
                                continue;
                            }
                            if ("smoothOrigin" === l) {
                                _addNonTweeningPT(
                                    this,
                                    f,
                                    "smooth",
                                    f.smooth,
                                    a
                                );
                                continue;
                            }
                            if ("force3D" === l) {
                                f[l] = a;
                                continue;
                            }
                            if ("transform" === l) {
                                _addRawTransformPTs(this, a, t);
                                continue;
                            }
                        }
                    else l in v || (l = _checkPropPrefix(l) || l);
                    if (
                        d ||
                        ((_ || 0 === _) &&
                            (o || 0 === o) &&
                            !_complexExp.test(a) &&
                            l in v)
                    )
                        (_ = _ || 0),
                            (u = (s + "").substr((o + "").length)) !==
                                (c =
                                    getUnit(a) ||
                                    (l in _config.units
                                        ? _config.units[l]
                                        : u)) &&
                                (o = _convertToUnit(t, l, s, c)),
                            (this._pt = new PropTween(
                                this._pt,
                                d ? f : v,
                                l,
                                o,
                                p ? p * _ : _ - o,
                                d ||
                                ("px" !== c && "zIndex" !== l) ||
                                !1 === e.autoRound
                                    ? _renderCSSProp
                                    : _renderRoundedCSSProp
                            )),
                            (this._pt.u = c || 0),
                            u !== c &&
                                ((this._pt.b = s),
                                (this._pt.r = _renderCSSPropWithBeginning));
                    else if (l in v)
                        _tweenComplexCSSString.call(this, t, l, s, a);
                    else {
                        if (!(l in t)) {
                            _missingPlugin(l, a);
                            continue;
                        }
                        this.add(t, l, s || t[l], a, i, n);
                    }
                    y.push(l);
                }
        g && _sortPropTweensByPriority(this);
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function (t, e, r) {
        var i = _propertyAliases[e];
        return (e = i && i.indexOf(",") < 0 ? i : e) in _transformProps &&
            e !== _transformOriginProp &&
            (t._gsap.x || _get(t, "x"))
            ? r && _recentSetterPlugin === r
                ? "scale" === e
                    ? _setterScale
                    : _setterTransform
                : (_recentSetterPlugin = r || {}) &&
                  ("scale" === e
                      ? _setterScaleWithRender
                      : _setterTransformWithRender)
            : t.style && !_isUndefined(t.style[e])
            ? _setterCSSStyle
            : ~e.indexOf("-")
            ? _setterCSSProp
            : _getSetter(t, e);
    },
    core: { _removeProperty: _removeProperty, _getMatrix: _getMatrix },
};
(gsap.utils.checkPrefix = _checkPropPrefix),
    (function (t, e) {
        var r = _forEachName(
            t +
                "," +
                e +
                ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
            function (t) {
                _transformProps[t] = 1;
            }
        );
        _forEachName(e, function (t) {
            (_config.units[t] = "deg"), (_rotationalProperties[t] = 1);
        }),
            (_propertyAliases[r[13]] = t + "," + e),
            _forEachName(
                "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
                function (t) {
                    t = t.split(":");
                    _propertyAliases[t[1]] = r[t[0]];
                }
            );
    })(
        "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
        "rotation,rotationX,rotationY,skewX,skewY"
    ),
    _forEachName(
        "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
        function (t) {
            _config.units[t] = "px";
        }
    ),
    gsap.registerPlugin(CSSPlugin);
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
function setupSlider1() {
    const r = Array.from(document.querySelectorAll(".carousel1 .nav-btn")),
        i = Array.from(document.querySelectorAll(".extra-slide-1")),
        n = Array.from(document.querySelectorAll(".extra-slide-2")),
        s = Array.from(document.querySelectorAll(".title-1")),
        a = Array.from(document.querySelectorAll(".text-1"));
    const o = initSliders(".opacity-slider-1", {
        delay: 8e3,
        switchCallback: function (t, e) {
            0 <= t &&
                (r[t].classList.remove("active"),
                i[t].classList.remove("active"),
                n[t].classList.remove("active"),
                s[t].classList.remove("active"),
                a[t].classList.remove("active"),
                i[t].classList.add("animate-out"),
                n[t].classList.add("animate-out"),
                s[t].classList.add("animate-out"),
                a[t].classList.add("animate-out"),
                setTimeout(() => {
                    i[t].classList.remove("animate-out"),
                        n[t].classList.remove("animate-out"),
                        s[t].classList.remove("animate-out"),
                        a[t].classList.remove("animate-out");
                }, 800)),
                r[e].classList.add("active"),
                i[e].classList.add("active"),
                n[e].classList.add("active"),
                s[e].classList.add("active"),
                a[e].classList.add("active");
        },
    })[0];
    return (
        r.forEach((t, e) =>
            t.addEventListener(
                "click",
                (t) => (t.stopPropagation(), o.switchSlide(e), !1)
            )
        ),
        o
    );
}
function continuousSlider() {
    var t = document.querySelector(".carousel2");
    gsapWithCSS.set(".carousel2 .slider-item", { x: (t) => 100 * t + "%" });
    const e = gsapWithCSS.to(".slider-item", {
        duration: 54,
        ease: "none",
        x: "-=500%",
        modifiers: {
            x: gsapWithCSS.utils.unitize(
                (t) => gsapWithCSS.utils.wrap(-100, 500)(parseFloat(t)),
                "%"
            ),
        },
        repeat: -1,
    });
    return e.pause(), { play: () => e.play(), pause: () => e.pause(), root: t };
}
function initHeader(t) {
    onImagesReady(
        Array.from(document.querySelectorAll("section.header img")).map(
            (t) => t.currentSrc || t.src
        ),
        () => {
            document.body.classList.add("ready"), t();
        }
    );
}
function onImagesReady(t, r) {
    t.forEach((t) => {
        const e = document.createElement("img");
        e.addEventListener("load", () => {
            n++, n === i && r();
        }),
            e.setAttribute("src", t);
    });
    const i = t.length;
    let n = 0;
}
gsapWithCSS.core.Tween,
    $(document).ready(function () {
        const t = initFloat(
                "section.header",
                [
                    {
                        selector: ".logo",
                        directions: {
                            x0: "0px",
                            y0: "0px",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.85,
                        delay: 0,
                    },
                    {
                        selector: ".subtitle",
                        directions: {
                            x0: "0px",
                            y0: "0px",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.95,
                        delay: 0.05,
                    },
                ],
                { minBottom: 0, once: !0, opacity: !0, delayInit: !0 }
            ),
            e = initFloat(
                "section.header",
                [
                    {
                        selector: ".george",
                        directions: {
                            x0: "-60px",
                            y0: "20px",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.95,
                        delay: 0.15,
                    },
                    {
                        selector: ".dylan",
                        directions: {
                            x0: "-40px",
                            y0: "50px",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.95,
                        delay: 0.35,
                    },
                    {
                        selector: ".ok",
                        directions: {
                            x0: "-40px",
                            y0: "50px",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.95,
                        delay: 0.65,
                    },
                    {
                        selector: ".subscribe",
                        directions: {
                            x0: "40px",
                            y0: "0",
                            s0: "0.9",
                            x1: "0",
                            y1: "0",
                        },
                        duration: 0.95,
                        delay: 0.85,
                    },
                ],
                { minBottom: 0, once: !1, opacity: !0, delayInit: !0 }
            );
        initHeader(() => {
            requestAnimationFrame(() => {
                t.init();
            }),
                setTimeout(() => {
                    e.init();
                }, 500);
        }),
            initPrevs();
        const r = setupSlider1(),
            i = continuousSlider();
        var n = document.querySelector(".timeline");
        onVisible([
            {
                trigger: r.root,
                visibleCallback: () => r.play(),
                invisibleCallback: () => r.pause(),
                once: !1,
            },
            {
                trigger: i.root,
                visibleCallback: () => i.play(),
                invisibleCallback: () => i.pause(),
                once: !1,
            },
            { trigger: n, addClass: "show", once: !1 },
        ]),
            initFloat(
                "section.prevs .number",
                [
                    {
                        selector: "section.prevs .digit1",
                        directions: { x0: "10px", s0: "0.7" },
                        duration: 0.95,
                        delay: 0,
                    },
                    {
                        selector: "section.prevs .digit2",
                        directions: { x0: "-10px", s0: "0.7" },
                        duration: 0.95,
                        delay: 0.1,
                    },
                    {
                        selector: "section.prevs .vimeo",
                        directions: { x0: "15px", s0: "0.7" },
                        duration: 0.85,
                        delay: 0.4,
                    },
                    {
                        selector: "section.prevs .fb",
                        directions: { x0: "-15px", s0: "0.7" },
                        duration: 0.95,
                        delay: 0.5,
                    },
                ],
                { minBottom: 0.2, minTop: 0.2, once: !0, opacity: !0 }
            ),
            initFloat(
                ".twitter",
                [
                    {
                        selector: ".twitter",
                        directions: { x0: "-60px", s0: "0.95" },
                        duration: 1.2,
                        delay: 0,
                    },
                ],
                { minBottom: 0, minTop: 0, once: !0, opacity: !0 }
            ),
            initFloat(
                "section.tech-spec",
                [
                    {
                        selector: "section.tech-spec .extra",
                        directions: { x0: "30px", s0: "0.95" },
                        duration: 1.2,
                        delay: 0,
                    },
                ],
                { minBottom: 0.2, minTop: 0.2, once: !0, opacity: !0 }
            ),
            initFloat(
                "section.footer",
                [
                    {
                        selector: "section.footer .extra",
                        directions: { x0: "-50px", s0: "0.95" },
                        duration: 1.2,
                        delay: 0,
                    },
                ],
                { minBottom: 0.2, minTop: 0.2, once: !0, opacity: !0 }
            );
    });

    const techSpecCarousel = () => {
        const ACTIVE_CLASS = "active";
        let currentIndex = 0;
    
        const headingControls = document.querySelector(".product__heading__controls");
        const controls = Array.from(headingControls.querySelectorAll('.control'))
        const headings = Array.from(headingControls.querySelectorAll(".product__heading"));
        const content = Array.from(
            document.querySelectorAll(".tables-wrapper .table")
        );
    
        const maxIndex = content.length - 1;
    
        const updateActive = (index) => {
            headings.forEach((e) => {
                e.classList.remove(ACTIVE_CLASS);
            });
        
            content.forEach((e) => {
                e.classList.remove(ACTIVE_CLASS);
            });
    
            headings[index].classList.add(ACTIVE_CLASS)
            content[index].classList.add(ACTIVE_CLASS)
        }
    
        controls[0].addEventListener('click', () => {
            if (currentIndex == 0) {
                currentIndex = 1
            } else {
                currentIndex = currentIndex - 1
            }
            updateActive(currentIndex);
        })
    
        controls[1].addEventListener('click', () => {
            if (currentIndex == maxIndex) {
                currentIndex = 0
            } else {
                currentIndex = currentIndex + 1
            }
            updateActive(currentIndex);
        })
    
        updateActive(currentIndex)
    };

    // techSpecCarousel()