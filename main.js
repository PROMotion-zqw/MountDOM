import {Initial} from './lock_test.js'

export default new Initial({
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
                            fontWeight: '500',
                            margin: '0px 10px'
                        },
                        text: "Hippo+",
                        Props: {
                            href: "/"
                        }
                    }
                }
            ],
            class: 'navs'
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
                    }
                }
            }]
        }
    },
    events: {
        class: {
            navs: {
                click: [function (o) {
                    //考虑到多个元素同时添加事件 的不友好 请暂时使用add方法来执行事件 参数 (元素, 回调函数)
                    o.add(o.item, () => {
                        alert("nav标签被点击!")
                    })
                }]
            }
        }
    }
})