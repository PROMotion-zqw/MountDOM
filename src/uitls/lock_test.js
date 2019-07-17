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
    AppendDoc: function (opt, optLine) {
        //on DOM Object append child elements of body
        if (!opt.parent) {
            this.fors(opt, (dom, di) => {
                if (opt[dom].children && opt[dom].children.length) {
                    let oLineString = Object.keys(opt)[0]
                    opt[dom].children.filter((DocChild, DocIndex) => {
                        //有children 的话就递归调用AppendDoc函数 并且把 父级的对象传给第二个参数
                        //以便之后将子集追加到对应的父节点中
                        this.AppendDoc(DocChild, opt[oLineString])
                    })
                }
                if (optLine) {
                    //在这里进行子节点追加
                    let outer = Object.keys(opt)[0];
                    optLine.$el.innerHTML += opt[outer].$el.outerHTML
                } else {
                    //最后没有了 父节点说明已经到了根节点
                    //将根节点追加到body中
                    let bodyDocString = Object.keys(opt)[0];
                    document.body.appendChild(opt[bodyDocString].$el)
                }
            })
            return;
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
                    fn && fn()
                } else {
                    // console.log('$el',keys, this.type(e[keys].$el));
                    if (e[keys].$el && this.type(e[keys].$el) !== "Array") {
                        if (this.type(e[keys].children) === "Array") {
                            // console.log('gh', e[keys].children);
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

