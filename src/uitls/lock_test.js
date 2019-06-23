"use strict";
export function Initial(o) {
    let that = this;
    this.Create.call(that, o.DOM)
    // this.AppendDoc.call(that, o.DOM)
    // this.Events.call(that, o.events || {})
    console.log('###', [document], o.DOM);
}

Initial.prototype = {
    developer: 'quanwei.zheng.o',
    loadJs: function (js) {
        let doc = document,
            app_body = doc.body;
        let spt = doc.createElement("script");
        spt.type = "text/javascript";
        spt.className = "filename";
        spt.src = js[0];
        app_body.appendChild(spt);
        spt.onload = spt.onreadystatechange = function () {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                js.shift();
                js.length ? imt(js) : null;
            }
            spt.onload = spt.onreadystatechange = null;
        }
    },
    //append single child elements
    Props: function (prop) {
        if (this.type(prop.$el) === "Array") {
            if (prop.Props) {
                this.fors(prop.Props, (v, i) => {
                    if (this.type(prop.Props[v]) === "Array") {
                        prop.Props[v].filter((val, vi) => {
                            prop.$el[vi][v] = val
                        })
                    } else {
                        prop.$el.filter((el, ei) => {
                            el[v] = prop.Props[v];
                        })
                    }
                })
            }
        } else {
            if (prop.Props) {
                this.fors(prop.Props, function (v, i) {
                    prop.$el[v] = prop.Props[v]
                })
            }
        }
    },
    getElement: function (str) {
        return document.querySelectorAll(str);
    },
    ClassName: function (Class) {
        if (this.type(Class.$el) === "Array") {
            if (Class.class) {
                if (this.type(Class.class) === "Array") {
                    Class.class.filter((v, i) => {
                        Class.$el[i].className = v;
                    })
                } else {
                    Class.$el.filter((v, i) => {
                        v.className = Class.class;
                    })
                }
            }
        } else {
            if (Class.class) {
                Class.$el.className = Class.class
            }
        }
    },
    IdName: function (Ids) {
        if (Ids.$el) {
            if (Ids.id) {
                Ids.$el.id = Ids.id;
            }
        }
    },
    fors: function (o, fn) {
        Object.keys(o).filter((k, ki) => {
            fn && fn(k, ki)
        })
    },
    ChildItem: function (item, vs) {
        item.parent.children.filter((v, i) => {
            this.fors(v, (last, lat) => {
                this.fors(v[last], (k, ki) => {
                    if (k === "$el" && this.type(v[last][k]) !== "Array") {
                        vs ? vs.innerHTML += v[last][k].outerHTML : item.parent.$el.innerHTML += v[last][k].outerHTML;
                    } else if (k === "$el" && this.type(v[last][k]) === "Array") {
                        v[last][k].filter((son, si) => {
                            vs ? vs.innerHTML += son.outerHTML : item.parent.$el.innerHTML += son.outerHTML;
                        })
                    }
                })
            })
        })
    },
    AppendDoc: function (opt) {
        //on DOM Object append child elements of body
        // if (!opt.parent) {
        //     this.fors(opt, (dom, di) => {
        //         if (opt[dom].children.length) {
        //             opt[dom].children.filter((ids, id) => {
        //                 this.fors(ids, (els, ls) => {
        //                     if (ids[els].$el) {
        //                         if (this.type(ids[els].$el) === "Array") {
        //                             ids[els].$el.filter((v, i) => {
        //                                 opt[dom].$el.innerHTML += v.outerHTML
        //                             })
        //                         } else {
        //                             opt[dom].$el.innerHTML += ids[els].$el.outerHTML
        //                         }
        //                     } else {
        //                         console.log("### nav is not children", opt[dom].children[child]);
        //                     }
        //                 })
        //             })
        //         }else {
        //             setTimeout(() => {
        //                 this.AppendDoc(opt)
        //             }, 1)
        //         }
        //         // opt[dom].$el.children.length != 0 ? document.body.appendChild(opt[dom].$el) : console.log(`### ${dom} ChildrenNode is empty or 'children' in item is empty`);
        //         opt[dom].$el.children.length != 0 ? document.body.appendChild(opt[dom].$el) : console.log(`### ${dom} ChildrenNode is empty or 'children' in item is empty`);
        //     })
        //     document.body.style.margin = "0px"
        //     document.documentElement.style.margin = "0px"
        //     return;
        // }
        //init append all child elements
        if (this.type(opt.parent.$el) === "Array" && this.type(opt.inner) === "Object") {
            if (opt.parent.pend != 0 && opt.parent.children && opt.parent.append_sort != 0) {
                opt.parent.$el.filter((p, pv) => {
                    this.ChildItem(opt, p)
                })
                let temp = opt.parent.$el.every((v, i) => {
                    return v.children.length !== 0;
                })
                temp ? opt.parent.pend = 0 : null;
            }
        } else if (this.type(opt.parent.$el) !== "Array" && this.type(opt.inner) === "Object") {
            if (opt.parent.pend != 0 && opt.parent.children && opt.parent.append_sort != 0) {
                this.ChildItem(opt)
                let temp = null;
                opt.parent.$el.children.length !== 0 ? temp = true : temp = false;
                temp ? opt.parent.pend = 0 : null;
            }
        }
    },
    Css: function (e) {
        if (this.type(e.$el) !== "Array" && this.type(e.css) !== "Function") {
            e.css && this.fors(e.css, (keys, ki) => {
                e.$el.style[keys] = e.css[keys]
            })
        } else if (this.type(e.$el) === "Array" && this.type(e.css) !== "Function") {
            e.$el.filter((v, i) => {
                this.Css({ $el: v, css: e.css })
            })
        } else {
            this.Css({ css: e.css && e.css(e, this.Css) })
        }
    },
    type: function (check) {
        return Object.prototype.toString.call(check).split(" ")[1].slice(0, -1);
    },
    Create: function (e, fn) {
        if (e) {
            this.fors(e, (keys, ki) => {
                if (this.type(e[keys].mul) != "Undefined") {
                    for (var i = 0; i < e[keys].mul; i++) {
                        !e[keys].$el ? e[keys].$el = [document.createElement(keys)] : e[keys].$el[i] = document.createElement(keys);
                        if (e[keys].text) {
                            e[keys].$el[i].innerText = e[keys].text[i] ? e[keys].text[i] : "";
                        }
                        this.Css(e[keys])
                    }
                } else {
                    e[keys].$el = document.createElement(keys);
                    if (e[keys].text) {
                        e[keys].$el.innerText = e[keys].text ? e[keys].text : "";
                    }
                    this.Css(e[keys]);
                }

                this.Props(e[keys])
                this.ClassName(e[keys]);
                this.IdName(e[keys]);
                if (!e[keys].children) {
                    console.log('e', e[keys], e);
                    fn && fn()
                } else {
                    // console.log('$el',keys, this.type(e[keys].$el));
                    if (e[keys].$el && this.type(e[keys].$el) !== "Array") {
                        if (this.type(e[keys].children) === "Array") {
                            console.log('gh', e[keys].children);
                            e[keys].children.filter((ch, ci) => {
                                this.Create(ch, fn);
                            })
                        }
                    } else if (e[keys].$el && this.type(e[keys].$el) === "Array") {
                        if (e[keys].$el.length === e[keys].mul) {
                            if (this.type(e[keys].children) === "Array") {
                                e[keys].children.filter((ch, ci) => {
                                    this.Create(ch, fn);
                                })
                            }
                        }

                    }
                }
                // if (e[keys].children.length && e[keys].$el) {
                //     e[keys].flag = true;
                //     if (this.type(e[keys].children) === "Object") {
                //         this.Create(e[keys].children, e[keys], 'children');
                //         this.AppendDoc({ inner: e[keys].children, parent: e[keys] })
                //     } else if (this.type(e[keys].children) === "Array") {
                //         // console.log("它是数组!", e[keys].children);
                //         e[keys].children.filter((ch, ci) => {
                //             this.Create(ch, e[keys], 'children');
                //         })
                //         e[keys].children.filter((ch, ci) => {
                //             // this.Create(ch, e[keys], 'children');
                //             this.AppendDoc({ inner: ch, parent: e[keys] })
                //         })
                //     }
                // }
            })
        } else {
        }
    },
    Events: function (eve) {
        this.fors(eve, (v, i) => {
            if (this.type(eve[v]) === "Object") {
                this.Events(eve[v])
            }
            if (v === "class") {
                this.fors(eve[v], (c, s) => {
                    this.fors(eve[v][c], (target, ti) => {
                        if (this.type(eve[v][c][target]) !== "Array") {
                            document.querySelector('.' + c).addEventListener(target, eve[v][c][target]);
                        } else {
                            // eve[v][c][target][0](1,2)
                            let arr = [],
                                doc = document;
                            arr.push.apply(arr, document.querySelectorAll('.' + c))
                            arr.filter((en, ei) => {
                                eve[v][c][target][0]({
                                    item: en,
                                    index: ei,
                                    target: target,
                                    doc,
                                    add: function (o, fn) {
                                        o.addEventListener(target, fn)
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    },
    watch: function (o, keys, callback) {
        var old = o[keys];
        Object.defineProperty(o, keys, {
            configurable: true,
            enumerable: true,
            set: function (val) {
                var v = old; old = val;
                callback(val, v)
            },
            get: function () {
                return old;
            }
        })
    }
}

