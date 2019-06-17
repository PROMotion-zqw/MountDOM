window._ = {
    DOM: {
        nav: {
            css: {
                backgroundColor: '#202932',
                height: '56px',
                lineHeight: '56px',
                position: 'fixed',
                width: '100%',
                top: '0px'
            },
            append_sort: 0,
            children: [
                {
                    a: {
                        css: {
                            position: 'absolute',
                            left: '0px',
                            textDecoration: 'none',
                            color: 'white',
                            fontSize: '16px',
                            width: '70px',
                            textAlign: 'center',
                            fontWeight: '500'
                        },
                        text: "Index",
                        Props: {
                            href: "/"
                        }
                    }
                },
            ]
        },
        footer: {
            append_sort: 0,
            css: {
                height: '50px',
                backgroundColor: '#202932',
                position: 'fixed',
                bottom: '0px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            },
            children: [{
                div: {
                    css: {
                        // width: '30%',
                        display: 'inline-block',
                        height: '50px',
                        background: 'white',
                    },
                }
            }]
        }
    },
    events: {
        class: {
            test: {
                click: [function (o) {
                    let $el = o.item.children[0];
                    o.item.onselectstart = function () {
                        return false;
                    }
                    o.item.addEventListener(o.target, function (e) {
                        e.stopPropagation();
                        o.lag = !o.lag;
                        o.method.Ident(".child", {display: 'none'}, o.index)
                        $el.style.display === "block" ? $el.style.display = "none" : $el.style.display = "block";
                        if (o.index == 2) {
                            o.method.Ident(".child")[2].style.width !== "180px" ? o.method.Ident(".child")[2].style.width = "180px" : null;
                        }
                    })
                    o.doc.addEventListener(o.target, function () {
                        o.method.Ident(".child", {display: 'none'})
                    })
                    o.item = null;
                }]
            },
            hov: {
                mouseover: [function (o) {
                    o.item.addEventListener(o.target, function (e) {
                        e.stopPropagation()
                        this.style.backgroundColor = "#345"
                        o.item = null;
                    })
                }],
                mouseout: [function (o) {
                    o.item.addEventListener(o.target, function () {
                        this.style.backgroundColor = ""
                        o.item = null
                    })
                }]
            },
            light: {
                mouseover: [function (o) {
                    o.item.addEventListener(o.target, function () {
                        this.style.backgroundColor = "#345"
                        o.item = null;
                    })
                }],
                mouseout: [function (o) {
                    o.item.addEventListener(o.target, function () {
                        this.style.backgroundColor = ""
                        o.item = null
                    })
                }]
            }
        }
    }
}