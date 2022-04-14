// import { doOnVisible } from "./libs/do-on-visible";
// import initPrevs from "./utils/prevs";
// import Splitting from "splitting";
// import './vendor/menu';
// import lazyShow from './utils/lazy-show';
// import {makePlayer} from './utils/yt-iframe';
// import { initSlider } from "./libs/carousel";

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

//     const loadOnVisibleImages = (section) => {
//         const images = Array.from(section.querySelectorAll("picture"));
    
//         images.forEach((picture) => {
//             const sources = [
//                 ...Array.from(picture.querySelectorAll('[data-src]')),
//                 ...Array.from(picture.querySelectorAll('[data-srcset]'))
//             ]
//             sources.forEach(s => {
//                 if (s.src || s.srcset) return;
//                 if (s.dataset.srcset) {
//                     s.srcset = s.dataset.srcset
//                 }
//                 if (s.dataset.src) {
//                     s.src = s.dataset.src;
//                 }
//             })
//         });
//     };

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

//         const ytTopVideos = [
//             document.getElementById('videoTrailer'),
//             document.getElementById('videoTutorial')
//         ]

//         ytTopVideos.forEach(v => {
//             makePlayer(v.dataset.id, v);
//         });
//     });

//     initSlider();
//     initPrevs();
//     lazyShow();
// })();

!(function () {
    "use strict";
    // lazyShow();
    function e(e) {
        !(function (e, t) {
            e.forEach((e) => {
                const t = document.createElement("img");
                t.addEventListener("load", () => {
                    o();
                }),
                    t.setAttribute("src", e);
            });
            const i = e.length;
            let n = 0;
            function o() {
                n++, n === i && t();
            }
        })(
            Array.from(document.querySelectorAll("section.header img")).map(
                (e) => e.currentSrc || e.src
            ),
            () => {
                document.body.classList.add("ready"), e && e();
            }
        );
    }
    function t(e, t, i) {
        const n =
            Date.now ||
            function () {
                return new Date().getTime();
            };
        var o,
            l,
            a,
            r,
            s = 0;
        i || (i = {});
        var c = function () {
                (s = !1 === i.leading ? 0 : n()),
                    (o = null),
                    (r = e.apply(l, a)),
                    o || (l = a = null);
            },
            d = function () {
                var d = n();
                s || !1 !== i.leading || (s = d);
                var u = t - (d - s);
                return (
                    (l = this),
                    (a = arguments),
                    u <= 0 || u > t
                        ? (o && (clearTimeout(o), (o = null)),
                          (s = d),
                          (r = e.apply(l, a)),
                          o || (l = a = null))
                        : o || !1 === i.trailing || (o = setTimeout(c, u)),
                    r
                );
            };
        return (
            (d.cancel = function () {
                clearTimeout(o), (s = 0), (o = l = a = null);
            }),
            d
        );
    }
    function i(e) {
        let t,
            {
                trigger: i,
                minTop: n,
                minBottom: o,
                visibleCallback: l,
                invisibleCallback: a,
                addClass: r,
                once: s = !0,
            } = e;
        var c;
        if (
            ((c = i),
            "[object String]" === Object.prototype.toString.call(c) &&
                ((t = i), (i = document.querySelector(i))),
            !i)
        )
            return void console.error(t || i + "does not exist");
        function d(e) {
            const t = String(e).match(/([\d\.-]+)(px|%)$/);
            return t ? { value: t[1], unit: t[2] } : { value: e, unit: "" };
        }
        (n = d(n || 0)), (o = d(o || 0));
        const u =
                "px" === n.unit
                    ? (e) => window.innerHeight - e.top > n.value
                    : (e) =>
                          (window.innerHeight - e.top) / window.innerHeight >
                          n.value,
            m =
                "px" === o.unit
                    ? (e) => e.bottom > o.value
                    : (e) => e.bottom / window.innerHeight > o.value;
        return {
            trigger: i,
            once: s,
            visibleCondition: () => {
                const e =
                    ((t = i.getBoundingClientRect()),
                    (n = t.top),
                    (o = t.bottom),
                    { top: n, bottom: o });
                var t, n, o;
                return u(e) && m(e);
            },
            visibleCallback: () => {
                l && l({ trigger: i }), r && i.classList.add(r);
            },
            invisibleCallback: () => {
                a && a(), r && i.classList.remove(r);
            },
            visible: !1,
        };
    }
    function n(e = ".lut-slider", i = {}) {
        const n = document.querySelectorAll(e);
        return Array.from(n).map((e) =>
            (function (
                e,
                {
                    delay: i = 3e3,
                    duration: n = 500,
                    offset: s = 0,
                    switchOnClick: c = !1,
                    switchCallback: d = () => {},
                    prevSelector: u = ".button_prev",
                    nextSelector: m = ".button_next",
                    navigationSelector: v = ".nav-btn",
                    extraSelectors: p = [],
                    slideSelector: f = ".slide",
                    mode: y = o,
                    autoplay: g = !0,
                    activeIndex: b = 0,
                    direction: h = 1,
                } = {}
            ) {
                const w = "string" == typeof e ? document.querySelector(e) : e,
                    A = Array.from(w.querySelectorAll(f)),
                    x = Array.from(w.querySelectorAll(v)),
                    S = A.length;
                if (null == n)
                    switch (y) {
                        case o:
                            n = 500;
                            break;
                        case l:
                            n = 1100;
                    }
                w.style.setProperty(
                    "--slide-transition-duration",
                    n / 1e3 + "s"
                );
                const E = {
                        delay: i,
                        autoplay: g,
                        activeIndex: -1,
                        timeout: null,
                        root: w,
                        slides: w.querySelectorAll(f),
                        direction: h,
                    },
                    T = p.map((e) => Array.from(document.querySelectorAll(e)));
                function C(e, t = -1) {
                    t > -1
                        ? T.forEach((i) => e(i[t]))
                        : T.forEach((t) => t.forEach((t) => e(t)));
                }
                C((e) => {
                    e.classList.add("animate");
                }),
                    (E.play = function ({ immediate: e = !1 } = {}) {
                        (E.autoplay = !0),
                            E.activeIndex < 0 || e
                                ? E.switchSlide()
                                : (E.timeout = setTimeout(
                                      E.switchSlide,
                                      E.delay
                                  ));
                    }),
                    (E.pause = function () {
                        (E.autoplay = !1), clearTimeout(E.timeout);
                    });
                let L,
                    k = !1;
                async function q({
                    to: e = null,
                    by: t = E.direction,
                    direction: i,
                    source: n = "",
                    noTransition: l = !1,
                    manual: c = !1,
                } = {}) {
                    c &&
                        ((k = !0),
                        setTimeout(() => {
                            (k = !1), $();
                        }, 200)),
                        E.timeout &&
                            (clearTimeout(E.timeout), (E.timeout = null)),
                        null == e
                            ? (e = E.activeIndex + t)
                            : (t = Math.sign(e - E.activeIndex));
                    let u = E.activeIndex;
                    if ((e = (e + S) % S) == u) return;
                    let m = t < 0;
                    function v(e, t, i) {
                        let n = i - t;
                        return t + ((e - t + n) % n);
                    }
                    function p(e, t) {
                        let i = A[e];
                        i &&
                            (i.style.transform = `translateX(${
                                100 * t - 100 * s + "%"
                            })`);
                    }
                    E.mode == a && (E.direction = null != i ? i : t),
                        t != L &&
                            A.forEach((e) => e.classList.toggle("back", m)),
                        y === o
                            ? (u > -1 && (A[u].style.zIndex = 0),
                              (A[e].style.zIndex = 1),
                              (E.activeIndex = e))
                            : y === r
                            ? (requestAnimationFrame(() => {
                                  A.forEach((e, t) => {
                                      t != u &&
                                          ((A[t].style.transition = "none"),
                                          p(t, 1));
                                  }),
                                      requestAnimationFrame(() => {
                                          l ||
                                              A.forEach((e, t) => {
                                                  e.style.transition = "";
                                              }),
                                              u > -1 && p(u, -1),
                                              p(e, 0);
                                      });
                              }),
                              (E.activeIndex = e))
                            : y === a &&
                              A.forEach(async (t, n) => {
                                  let o = -1,
                                      a = o + A.length,
                                      r = v(n - u, o, a),
                                      s = v(n - e, o, a),
                                      c = s + i;
                                  const d = r != c;
                                  A.forEach((e) => (e.style.zIndex = 0)),
                                      u > -1 && (A[u].style.zIndex = 1),
                                      (A[e].style.zIndex = 1),
                                      (t.style.transition = "none"),
                                      requestAnimationFrame(() => {
                                          d && p(n, c),
                                              requestAnimationFrame(() => {
                                                  E.activeIndex > -1 &&
                                                      (l ||
                                                          (t.style.transition =
                                                              "")),
                                                      requestAnimationFrame(
                                                          () => {
                                                              p(n, s),
                                                                  requestAnimationFrame(
                                                                      () => {
                                                                          l &&
                                                                              (t.style.transition =
                                                                                  "");
                                                                      }
                                                                  ),
                                                                  (E.activeIndex =
                                                                      e);
                                                          }
                                                      );
                                              });
                                      });
                              }),
                        A.forEach((e) => e.classList.remove("active")),
                        x.forEach((e) => e.classList.remove("active")),
                        A[e].classList.add("active"),
                        x[e]?.classList.add("active"),
                        E.autoplay && $(),
                        requestAnimationFrame(() => {
                            C((e) => e.classList.remove("animate")),
                                requestAnimationFrame(() => {
                                    t != L &&
                                        C((e) => e.classList.toggle("back", m)),
                                        requestAnimationFrame(() => {
                                            C((e) =>
                                                e.classList.add("animate")
                                            ),
                                                C(
                                                    (e) =>
                                                        e.classList.add(
                                                            "active"
                                                        ),
                                                    e
                                                ),
                                                u >= 0 &&
                                                    (C(
                                                        (e) =>
                                                            e.classList.remove(
                                                                "active"
                                                            ),
                                                        u
                                                    ),
                                                    C(
                                                        (e) =>
                                                            e.classList.add(
                                                                "animate-out"
                                                            ),
                                                        u
                                                    ),
                                                    setTimeout(() => {
                                                        C(
                                                            (e) =>
                                                                e.classList.remove(
                                                                    "animate-out"
                                                                ),
                                                            u
                                                        );
                                                    }, 800)),
                                                (L = t);
                                        });
                                });
                        }),
                        d(u, e, { source: n, slider: E });
                }
                const I = t(q, y === o ? n + 150 : n, {
                    leading: !0,
                    trailing: !0,
                });
                function $() {
                    clearTimeout(E.timeout),
                        requestAnimationFrame(() => {
                            k || (E.timeout = setTimeout(I, E.delay));
                        });
                }
                return (
                    (E.switchSlide = I),
                    q({ to: b, noTransition: !0, direction: E.direction }),
                    x.forEach((e, t) =>
                        e.addEventListener("click", () =>
                            I({ to: t, manual: !0 })
                        )
                    ),
                    w
                        .querySelector(u)
                        ?.addEventListener("click", () => I({ by: -1 })),
                    w
                        .querySelector(m)
                        ?.addEventListener("click", () => I({ by: 1 })),
                    E
                );
            })(e, i)
        );
    }
    const o = 0,
        l = 1,
        a = 2,
        r = 3;
    $(() => {
        e(),
            (function () {
                let e;
                function t(t) {
                    let i = t.data("mp4-src");
                    t.append(
                        `<div class="video-wrapper"><video autoplay playsinline loop muted src="${i}" width="400" height="225"></video></div>`
                    ),
                        (e = setTimeout(() => {
                            t.find(".loading-spinner").addClass("show");
                        }, 1e3));
                    let n = $(t.find("video"));
                    n.on("canplay", () => {
                        n[0].play().catch((e) => {
                            if ("NotAllowedError" != e.name) return e;
                            n.prop("muted", !0), n[0].play();
                        }),
                            clearTimeout(e),
                            t.find(".loading-spinner").removeClass("show");
                    });
                }
                $("body").on("click", (i) => {
                    clearTimeout(e),
                        $(".product-prev-cell").removeClass("show"),
                        $(".product-prev-cell .video-wrapper").remove();
                    let n = $(i.target).closest(".product-prev-cell");
                    n.length && 0 === n.find("video").length && t(n);
                }),
                    $("body").on("mouseover", ".product-prev-cell", (e) => {
                        let i = $(e.currentTarget);
                        0 === i.find("video").length && t(i);
                    }),
                    $("body").on("mouseleave", ".product-prev-cell", (t) => {
                        let i = $(t.currentTarget);
                        clearTimeout(e),
                            i.find(".loading-spinner").removeClass("show"),
                            i.find(".video-wrapper").remove();
                    }),
                    Array.from(
                        document.querySelectorAll(".btn-collapse")
                    ).forEach((e, t) => {
                        e.addEventListener("click", () => {
                            const t = "true" == e.getAttribute("aria-expanded");
                            e.setAttribute("aria-expanded", !t),
                                $(e.dataset.target).collapse("toggle");
                        });
                    });
            })();
        const l = n(".slider1", {
            mode: o,
            duration: 660,
            autoplay: !1,
            activeIndex: 4,
        })[0];
        let a = [];
        function r(e) {
            return Math.floor(Math.random() * e);
        }
        let s,
            c = !1,
            d = [];
        function u(e) {
            if ((clearTimeout(s), a.length < 2)) return;
            let t = a.filter((e) => "none" != getComputedStyle(e.root).display);
            if (((d = d.slice(0, Math.ceil(t.length / 2))), null == e))
                do {
                    e = r(t.length);
                } while (d.indexOf(e) > -1);
            d = [e, ...d].slice(0, 2);

            let i,
                n = t.map((e) => e.activeIndex),
                o = [0, 1, 2, 3, 4, 5].filter((e) => -1 == n.indexOf(e));
            i = o[r(o.length)];
            do {
                i = o[r(o.length)];
            } while (i == d[0]);

            t[e].root.classList.add("float"),
                t[e]?.switchSlide({ to: i }),
                c && (s = setTimeout(u, 4e3));
        }
        var m;
        (a = [0, 1, 2, 3].map(
            (e) =>
                n(".slider2-" + e, {
                    mode: o,
                    duration: 660,
                    autoplay: !1,
                    activeIndex: e,
                })[0]
        )),
            a.forEach((e, t) => {
                e.root.addEventListener("click", () => u(t));
            }),
            u(),
            (function (e) {
                function n() {
                    0 ===
                        (e = e
                            .filter((e) => e)
                            .map((e) => {
                                if (e.visibleCondition()) {
                                    if (
                                        !e.visible &&
                                        (e.visibleCallback(),
                                        (e.visible = !0),
                                        e.once)
                                    )
                                        return null;
                                } else
                                    e.visible &&
                                        (e.invisibleCallback &&
                                            e.invisibleCallback(),
                                        (e.visible = !1));
                                return e;
                            })
                            .filter((e) => e)).length && l();
                }
                e = (Array.isArray(e) ? e : [e]).map((e) => i(e));
                const o = t(n, 200, { leading: !0, trailing: !0 });
                function l() {
                    document.removeEventListener("scroll", o, { passive: !0 });
                }
                document.addEventListener("scroll", o, { passive: !0 }),
                    document.addEventListener(
                        "visibilitychange",
                        function () {
                            "visible" === document.visibilityState
                                ? requestAnimationFrame(() => {
                                      e.forEach((e) => (e.visible = !1)), n();
                                  })
                                : e.forEach((e) => {
                                      (e.visible = !1),
                                          e.invisibleCallback &&
                                              e.invisibleCallback();
                                  });
                        },
                        !1
                    ),
                    n();
            })([
                {
                    trigger: l.root,
                    visibleCallback: () => {
                        setTimeout(() => {
                            l.switchSlide(), l.play();
                        }, 300);
                    },
                    invisibleCallback: () => {
                        l.pause();
                    },
                    minTop: 0.3,
                    once: !1,
                },
                {
                    trigger: ".slider2",
                    visibleCallback: () => {
                        (c = !0), u();
                    },
                    invisibleCallback: () => {
                        (c = !1), clearTimeout(s);
                    },
                    addClass: "show",
                    minTop: 0.3,
                    once: !1,
                },
                ...Array.from(document.querySelectorAll(".anim")).map((e) => ({
                    trigger: e,
                    addClass: "show",
                    minTop: 0.1,
                    once: !0,
                })),
            ]),
            (m = ".slider2"),
            window.addEventListener("mousemove", (e) => {
                let t = e.clientX / window.innerWidth;
                document.querySelector(m).style.setProperty("--x", t);
            });
    });
})();
//# sourceMappingURL=scripts.js.map
