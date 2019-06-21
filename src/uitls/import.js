let ver = `?${Math.random() * 1000}`;

function loadJs(url, load) {
    let doc = document,
        app_body = doc.body;
    let spt = doc.createElement("script");
    spt.type = "text/javascript";
    spt.className = "filename";
    spt.src = url[0];
    app_body.appendChild(spt);
    spt.onload = spt.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            url.shift();
            url.length ? load(url) : null;
            // console.log('yes', js, this.readyState);
        }
        spt.onerror = function (e) {
            console.log('ERR', e);
        }
        spt.onload = spt.onreadystatechange = null;
        spt.onerror = null;
    }
}

function poll(node, callback) {
    if (callback.isCalled) {
        return;
    }

    var isLoaded = false;

    if (/webkit/i.test(navigator.userAgent)) {//webkit
        if (node['sheet']) {
            isLoaded = true;
        }
    }
    // for Firefox
    else if (node['sheet']) {
        try {
            if (node['sheet'].cssRules) {
                isLoaded = true;
            }
        } catch (ex) {
            // NS_ERROR_DOM_SECURITY_ERR
            if (ex.code === 1000) {
                isLoaded = true;
            }
        }
    }

    if (isLoaded) {
        // give time to render.
        setTimeout(function () {
            callback();
        }, 1);
    } else {
        setTimeout(function () {
            poll(node, callback);
        }, 1);
    }
}

function styleOnload(node, callback) {
    // for IE6-9 and Opera
    if (node.attachEvent) {
        node.attachEvent('onload', callback);
    } else {
        setTimeout(function () {
            poll(node, callback);
        }, 0); // for cache
    }
}

function loadCss(url, load) {
    let node = document.createElement("link");
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');
    node.setAttribute('href', url[0]);
    document.head.appendChild(node);
    styleOnload(node, () => {
        url.shift();
        url.length ? load(url) : null;
    })
}

function loading(url) {
    if (/.js/.test(url[0])) {
        loadJs(url, loading)
    } else if (/.css/.test(url[0])) {
        loadCss(url, loading)
    }
}
export default {
    rightItem: {
        textDecoration: 'none',
        padding: '0px 10px',
        margin: '0px 10px',
        color: '#ccc8c8',
        display: 'block',
        float: 'left',
        position: 'relative',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '440'
    },
    dropDownBox: {
        width: '100px',
        overflow: 'hidden',
        display: 'none',
        position: 'absolute',
        top: '60px',
        left: '7px',
        //#272b2f  #2a283b
        background: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer'
    },
    dropDownItem: {
        display: 'block',
        color: '#968ba7',
        height: '35px',
        textAlign: 'left',
        lineHeight: '35px',
        textDecoration: 'none',
        paddingLeft: '10px'
    },
    Ident(el, ob, index) {
        let ar = [];
        ar.push.apply(ar, document.querySelectorAll(el))
        if (ob) {
            ar.filter((nodes, ni) => {
                if (ni !== index) {
                    Object.keys(ob).filter((v, i) => {
                        nodes.style[v] !== ob[v] ? nodes.style[v] = ob[v] : null;
                    })
                }
            })
        } else {
            return ar;
        }
    },
    userlist_admin: [
        ["Profile", "Users", "Module", "Onduty", "Logout"],
        ["/user/profile", "/user/list", "/codestar/#/create", "/schedule", "/logout"]
    ],
    userlist_normal: [
        ["Profile", "Users", "Logout"],
        ["/user/profile", "/user/list", "/logout"]
    ],
    getUser() {
        let obj = JSON.parse(localStorage.getItem("INF")) || {};
        if (obj.operate && obj.operate == 16) {
            return this.userlist_admin
        } else if (obj.operate && obj.operate !== 16) {
            return this.userlist_normal
        } else {
            throw "Loss of User Information Table"
        }
    },
    loading
}