document.querySelector("button").onclick = function () {
    if(document.querySelector("#txt").value) {
        (new Function(document.querySelector("#txt").value))()
    }
}
