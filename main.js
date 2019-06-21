import {Initial} from './src/uitls/lock_test.js'
import methods from './src/uitls/import.js'
export default new Initial({
    DOM: {
        nav: {
            css: {
                backgroundColor: '#343a40',
                height: '56px',
                lineHeight: '56px',
                position: 'fixed',
                width: '100%',
                top: '0px',
                zIndex: 999
            },
            append_sort: 0,
            children: [
                //Hippo+
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
                        text: "Hippo+",
                        Props: {
                            href: "/"
                        }
                    }
                },
                //list
                {
                    div: {
                        css: {
                            float: 'right',
                        },
                        children: [
                            {
                                a: {
                                    css: methods.rightItem,
                                    text: 'Service',
                                    Props: {
                                        href: "/service"
                                    },
                                    class: "light"
                                }
                            },
                            {
                                a: {
                                    css: methods.rightItem,
                                    text: 'Logging',
                                    Props: {
                                        href: "/logging"
                                    },
                                    class: "light"
                                }
                            },
                            {
                                span: {
                                    css: methods.rightItem,
                                    text: "CodeStar",
                                    class: "test light",
                                    children: [{
                                        div: {
                                            css: methods.dropDownBox,
                                            class: "child",
                                            children: [{
                                                a: {
                                                    text: ['Code', '提测管理'],
                                                    mul: 2,
                                                    css: methods.dropDownItem,
                                                    Props: {
                                                        href: ["/codestar/#/ci", "/codestar/#/testlist"]
                                                    },
                                                    class: 'hov'
                                                }
                                            }]
                                        }
                                    }]
                                }
                            },
                            {
                                span: {
                                    css: methods.rightItem,
                                    text: "Database",
                                    class: "test light",
                                    children: [{
                                        div: {
                                            css: methods.dropDownBox,
                                            class: "child",
                                            children: [{
                                                a: {
                                                    text: ['DB', 'DB堡垒机'],
                                                    mul: 2,
                                                    css: methods.dropDownItem,
                                                    Props: {
                                                        href: ["/database/list", "/database/dbtool"]
                                                    },
                                                    class: 'hov'
                                                }
                                            }]
                                        }
                                    }]
                                }
                            },
                            {
                                a: {
                                    css: methods.rightItem,
                                    text: 'Deploy',
                                    Props: {
                                        href: "/deploy"
                                    },
                                    class: 'light'
                                }
                            },
                            {
                                a: {
                                    css: methods.rightItem,
                                    text: 'My Request',
                                    Props: {
                                        href: "/request/"
                                    },
                                    class: 'light'
                                }
                            },
                            {
                                span: {
                                    css: methods.rightItem,
                                    text: "Welcome " + localStorage.getItem("USERNAME"),
                                    class: "test light",
                                    children: [{
                                        div: {
                                            css: methods.dropDownBox,
                                            class: "child",
                                            children: [{
                                                a: {
                                                    text: methods.getUser()[0],
                                                    mul: methods.getUser()[0].length,
                                                    css: methods.dropDownItem,
                                                    Props: {
                                                        href: methods.getUser()[1]
                                                    },
                                                    class: 'hov'
                                                }
                                            }]
                                        }
                                    }]
                                }
                            },
                        ]
                    }
                }
            ]
        },
        footer: {
            append_sort: 0,
            css: {
                height: '60px',
                backgroundColor: '#f5f5f5',
                position: 'fixed',
                bottom: '0px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            },
            children: [{
                div: {
                    css: {
                        display: 'inline-block',
                        height: '100%',
                    },
                    children: [
                        {
                            a: {
                                css: {
                                    fontSize: '15px',
                                    display: 'block',
                                    height: '50px',
                                    color: '#646bc6',
                                    float: 'left',
                                    position: 'relative',
                                    padding: '0px 10px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    lineHeight: '50px'
                                },
                                mul: 4,
                                text: [' do-devops@nio.com', '24*7', 'About', 'Release Note'],
                                Props: {
                                    href: ["mailto:do-devops@nio.com", "/schedule", "http://devops.nevint.com", "http://devops.nevint.com/archives/118"]
                                },
                                class: ["iconfont icon-youjian2", "iconfont icon-dianhua1", "iconfont", "iconfont"]
                            }
                        }
                    ]
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
                    o.add(o.item, function (e) {
                        e.stopPropagation();
                        methods.Ident(".child", {display: 'none'}, o.index)
                        $el.style.display === "block" ? $el.style.display = "none" : $el.style.display = "block";
                        if (o.index == 2) {
                            methods.Ident(".child")[2].style.width !== "180px" ? methods.Ident(".child")[2].style.width = "180px" : null;
                        }
                    })
                    o.add(document, function () {
                        methods.Ident(".child", {display: 'none'})
                    })
                }]
            },
            hov: {
                mouseover: [function (o) {
                    o.item.addEventListener(o.target, function (e) {
                        e.stopPropagation()
                        this.style.backgroundColor = "#f6f0f0"
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
                        this.style.backgroundColor = "#5d5c5c"
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
})
