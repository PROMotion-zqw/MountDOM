"use strict";
; (function (o) {
    if (!o) return;
    else if (!Object.keys(o).length) return;
    o.developer = "quanwei.zheng.o"
    o.resize = function () {
        let pageWidth = window.innerWidth;
        if (pageWidth > 750) {
            pageWidth = 750
        }
        if (pageWidth < 320) {
            pageWidth = 320
        }

        let size = pageWidth / 750 * 50;
        document.documentElement.style.fontSize = size + "px";
    }
    // window.onresize = o.resize
    // o.resize();
    window.addEventListener("resize", o.resize)
    o.DocChildren = {};
    o.imt = function (js) {
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
                console.log('yes', js, this.readyState);
            }
            spt.onload = spt.onreadystatechange = null;
        }
    }
    //append single child elements
    o.Props = function (prop) {
        if (o.type(prop.$el) === "Array") {
            if (prop.Props) {
                o.fors(prop.Props, function (v, i) {
                    if (o.type(prop.Props[v]) === "Array") {
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
                o.fors(prop.Props, function(v, i) {
                    prop.$el[v] = prop.Props[v]
                })
            }
        }
    }
    o.getElements = function (str) {
        return document.querySelectorAll(str);
    }
    o.Events = function (eve) {
        o.fors(eve, function (v, i) {
            if (o.type(eve[v]) === "Object") {
                o.Events(eve[v])
            }
            if (v === "class") {
                o.fors(eve[v], function (c, s) {
                    //通过类名添加事件
                    o.fors(o, function (co, ci) {
                        if (!document.querySelector('.' + c)[co] && co === "getElements") {
                            document.querySelector('.' + c)[co] = o[co];
                        }
                    })
                    o.fors(eve[v][c], function (target, ti) {

                        if (o.type(eve[v][c][target]) !== "Array") {
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
    }
    o.ClassName = function (Class) {
        if (o.type(Class.$el) === "Array") {
            if (Class.class) {
                if (o.type(Class.class) === "Array") {
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
    }
    o.IdName = function (Ids) {
        // console.log("ids", Ids);

    }
    o.fors = function (o, fn) {
        Object.keys(o).filter((k, ki) => {
            fn && fn(k, ki)
        })
    }
    o.ChildItem = function (item, vs) {
        item.parent.children.filter((v, i) => {
            o.fors(v, (last, lat) => {
                o.fors(v[last], (k, ki) => {
                    if (k === "$el" && o.type(v[last][k]) !== "Array") {
                        vs ? vs.innerHTML += v[last][k].outerHTML : item.parent.$el.innerHTML += v[last][k].outerHTML;
                    } else if (k === "$el" && o.type(v[last][k]) === "Array") {
                        v[last][k].filter((son, si) => {
                            vs ? vs.innerHTML += son.outerHTML : item.parent.$el.innerHTML += son.outerHTML;
                        })
                    }
                })
            })
        })
    }
    o.AppendDoc = function (opt) {
        //on DOM Object append child elements of body
        if (!opt.parent) {
            o.fors(opt, (dom, di) => {
                if (opt[dom].children) {
                    opt[dom].children.filter((ids, id) => {
                        o.fors(ids, (els, ls) => {
                            if (ids[els].$el) {
                                if (o.type(ids[els].$el) === "Array") {
                                    ids[els].$el.filter((v, i) => {
                                        v.children.length != 0 ? opt[dom].$el.innerHTML += v.outerHTML : console.log("nav children and children 'ChildrenNode' is empty");
                                    })
                                } else {
                                    opt[dom].$el.innerHTML += ids[els].$el.outerHTML
                                }
                            } else {
                                console.log("### nav is not children", opt[dom].children[child]);
                            }
                        })
                    })
                }
                opt[dom].$el.children.length != 0 ? document.body.appendChild(opt[dom].$el) : console.log(`### ${dom} ChildrenNode is empty or 'children' in item is empty`);
            })
            document.body.style.margin = "0px"
            document.documentElement.style.margin = "0px"
            return;
        }
        //init append all child elements
        if (o.type(opt.parent.$el) === "Array" && o.type(opt.inner) === "Object") {
            if (opt.parent.pend != 0 && opt.parent.children && opt.parent.append_sort != 0) {
                opt.parent.$el.filter((p, pv) => {
                    o.ChildItem(opt, p)
                })
                let temp = opt.parent.$el.every((v, i) => {
                    return v.children.length !== 0;
                })
                temp ? opt.parent.pend = 0 : null;
            }
        } else if (o.type(opt.parent.$el) !== "Array" && o.type(opt.inner) === "Object") {
            if (opt.parent.pend != 0 && opt.parent.children && opt.parent.append_sort != 0) {
                o.ChildItem(opt)
                let temp = null;
                opt.parent.$el.children.length !== 0 ? temp = true : temp = false;
                temp ? opt.parent.pend = 0 : null;
            }
        }
    }
    o.Css = function (e) {
        if (o.type(e.$el) !== "Array" && o.type(e.css) !== "Function") {
            e.css && o.fors(e.css, (keys, ki) => {
                e.$el.style[keys] = e.css[keys]
            })
        } else if (o.type(e.$el) === "Array" && o.type(e.css) !== "Function") {
            e.$el.filter((v, i) => {
                o.Css({ $el: v, css: e.css })
            })
        } else {
            o.Css({ css: e.css && e.css(e, o.Css) })
        }
    }
    o.type = function (check) {
        return Object.prototype.toString.call(check).split(" ")[1].slice(0, -1);
    }
    o.Create = function (e, parent, append) {
        o.fors(e, (keys, ki) => {
            if (o.type(e[keys].mul) != "Undefined") {
                for (var i = 0; i < e[keys].mul; i++) {
                    !e[keys].$el ? e[keys].$el = [document.createElement(keys)] : e[keys].$el[i] = document.createElement(keys);
                    if (e[keys].text) {
                        e[keys].$el[i].innerText = e[keys].text[i] ? e[keys].text[i] : "";
                    }
                    o.Css(e[keys])
                }
            } else {
                e[keys].$el = document.createElement(keys);
                if (e[keys].text) {
                    e[keys].$el.innerText = e[keys].text ? e[keys].text : "";
                }
                o.Css(e[keys]);
            }

            o.Props(e[keys])
            o.ClassName(e[keys]);
            o.IdName(e[keys]);

            if (e[keys].children && e[keys].$el) {
                e[keys].flag = true;
                if (o.type(e[keys].children) === "Object") {
                    o.Create(e[keys].children, e[keys], 'children');
                    o.AppendDoc({ inner: e[keys].children, parent: e[keys] })
                } else if (o.type(e[keys].children) === "Array") {
                    // console.log("它是数组!", e[keys].children);
                    e[keys].children.filter((ch, ci) => {
                        o.Create(ch, e[keys], 'children');
                    })
                    e[keys].children.filter((ch, ci) => {
                        // o.Create(ch, e[keys], 'children');
                        o.AppendDoc({ inner: ch, parent: e[keys] })
                    })
                }
            }
        })
    }
    o.GetDoc = function (obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].children) {
                o.GetDoc(obj[i].children);
            }
            !o.DocChildren[obj[i].localName] ?
                o.DocChildren[obj[i].localName] = [obj[i]] :
                o.DocChildren[obj[i].localName] ?
                    o.DocChildren[obj[i].localName][o.DocChildren[obj[i].localName].length] = obj[i] :
                    null;
        }
    }
    o.Create(o.DOM)
    o.AppendDoc(o.DOM)
    o.GetDoc(document.children)

    o.Events(o.events || {})
    console.log('###', [document], o.DOM);
})(window.Web || {})

