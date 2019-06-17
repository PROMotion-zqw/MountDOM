
let imt = function (js) {
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
            // console.log('yes', js, this.readyState);
        }
        spt.onerror = function (e) {
            console.log('ERR', e);
        }
        spt.onload = spt.onreadystatechange = null;
        spt.onerror = null;
    }
},
    ver = `?${Math.random() * 1000}`;
imt([
    `./main.js${ver}`,
    `./lock_test.js${ver}`])
