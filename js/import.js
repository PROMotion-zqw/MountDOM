function imt(js) {
    let doc = document,
    app_body = document.body,
    spt = document.createElement("script");
    spt.type = "text/javascript";
    spt.id = "filename";
    spt.src = js;
    app_body.appendChild(spt);
    console.log('body_length',app_body.length);
}
imt("./js/lock_test.js")