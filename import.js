
let ver = `?${Math.random() * 1000}`;
export default loading([
    `./lock_test.js${ver}`,
    `./main.js${ver}`
    ])


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
    }
    else {
        setTimeout(function () {
            poll(node, callback);
        }, 1);
    }
}

function styleOnload(node, callback) {
    // for IE6-9 and Opera
    if (node.attachEvent) {
        node.attachEvent('onload', callback);
    }
    else {
        setTimeout(function () {
            poll(node, callback);
        }, 0); // for cache
    }
}

function loadCss(url, load) {
    let node = document.createElement("link");
    node.setAttribute('rel','stylesheet');
    node.setAttribute('type','text/css');
    node.setAttribute('href',url[0]);
    document.head.appendChild(node);
    styleOnload(node, () => {
        url.shift();
        url.length ? load(url) : null;
    })
}

function loading(url) {
    if(/.js/.test(url[0])) {
        loadJs(url, loading)
    }else if(/.css/.test(url[0])) {
        loadCss(url, loading)
    }
}