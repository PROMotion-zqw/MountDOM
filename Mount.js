(function(global, factory) {
global.MountDOM = factory()
}(this, (function () {
'use strict';
var watchTask = [],
doc = document,
docEl = doc.documentElement,
remStyle = document.createElement("style"),
tid = null;
linkStyle('html,body {padding: 0px;margin: 0px;}')

function type(variable) {return Object.prototype.toString.call(variable).split(" ")[1].slice(0, -1);};

function mapping(variable, handleErr) {
    var type = Object.prototype.toString.call(variable).split(" ")[1].slice(0, -1),
    result = null;
    if (type === 'Array') {
        if (!this[variable[0]]) {
            throw "not define '" + variable[0] + "' attribute in 'data'"
        }
        if(handleErr) {
            result = handleErr(this[variable[0]]);
            if (result) {
                return result;
            }
        }else {
            return this[variable[0]];
        }
        
    }else {
        return variable;
    }
}

function Component(Element) {
    if (!Element) {
        throw "\"mountEle\" method arguments is empty";
    }
    var $el = doc.createElement(Element.el);
    "css" in Element && Element.css ? loadStyle.bind($el)(mapping.call(Element.data || null, Element.css)) : null;
    "id" in Element && Element.id ? $el.id = mapping.call(Element.data || null, Element.id, function(key) {
        if(type(key) !== "String") {
            throw "\""+$el.localName+"\"" + " Illegal element ID";
        }else {
            return key;
        }
    }) : null;
    "className" in Element && Element.className ? $el.className = mapping.call(Element.data || null, Element.className) : null;
    "text" in Element && Element.text ? $el.innerText = mapping.call(Element.data || null, Element.text) : null;
    "attr" in Element && Element.attr ? loadAttr.bind($el)(Element.attr) : null;
    var result = {
        $el: $el,
        child: Component,
        appendTo: appendTo,
        addEvent: addEvent,
        params: "params" in Element ? Element.params : null,
        css: loadStyle.bind($el),
    };
    Object.assign(result, Element.methods, Element.data);
    "on" in Element ? Object.keys(Element.on).map(function (v) {
        addEvent.bind(result)(v, Element.on[v]);
    }) : null;
    if (this && "$el" in this) {
        this.$el.appendChild($el);
    }
    return result;
}

function addEvent(key, fn) {
    var _this = this;
    this.$el.addEventListener(key, function (e) {
        fn.bind(_this)(e);
    });
    // true 从外像内
    // false 从内向外
}

function appendTo(parent) {
    parent.$el.appendChild(this.$el);
};

function loadStyle(cssObj) {
    var _this = this;
    Object.keys(cssObj).filter(function (v) {
        _this.style[v] = cssObj[v];
    });
    _this = null;
};

function loadAttr(attr) {
    var _this = this;
    Object.keys(attr).filter(function (v) {
        _this[v] = attr[v];
    })
};

function Render(main) {
    main.el.appendChild(main.view.$el);
    watchTask.push({name: 'grid', func: addMedia, args: [{design: 750,htmlFont: 16}]})
    'watch_screen' in main && main.watch_screen ? watchScreen(watchTask) : null;
};

function refreshRem(media) {
    var width = docEl.getBoundingClientRect().width;
    if ('maxValue' in media) width>media.maxValue && (width=media.maxValue);
    if ('minValue' in media) width<media.minValue && (width=media.minValue);
    
    var rem = width * media.htmlFont / media.design;
    docEl.style.fontSize = rem+'px'
}

function addMedia(media, timer) {
    if(timer !== undefined) {
        clearTimeout(timer)
        timer = setTimeout(function() {refreshRem(media)}, 50)
    }else {
        refreshRem(media)
    }
}

function watchScreen(watchTask) {
    if(!watchTask.length) {
        return
    }
    watchTask.filter(function (v, i) {
        v.func.apply(null, v.args);
    });

    window.onresize = function () {
        watchTask.filter(function (v, i) {
            v.func.apply(null, v.args);
        });
    }
};

function clearWatchTask(key) {
    var index = null
    watchTask.filter(function(v, i) {
        if(key === v.name) {
            index = i;
        }
    });
    watchTask.splice(index, 1);
}

function addWatchTask(object) {
    watchTask.push(object)
}

function linkStyle(str) {
    var style = doc.getElementsByTagName("style")[0],
    head = doc.getElementsByTagName("head")[0];
    if(!style) style = doc.createElement('style');
    style.appendChild(doc.createTextNode(str));
    head.appendChild(style);
};

function isObject(property, fn) {
    if(type(Object[property]) === 'Undefined') {
        Object[property] = fn;
    }
};

function deleteObj(object) {
    Object.keys(object).filter(function (v) {
        delete object[v]
    })
}

var Propertys = {
    Render: Render,
    Component: Component,
    addWatchTask: addWatchTask,
    clearWatchTask: clearWatchTask,
    test_par: {name: 'grid', func: addMedia, args: [{design: 750,htmlFont: 16}]}
}

function MountDOM (options) {
    // deleteObj(MountDOM)
    this.Render(options)
};

isObject('assign', function(target) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.filter(function (v, i) {
        if (i) {
            var source = arr[i];
            if(source != null && source != undefined) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                    }
                }
            }
        }
    })
    return target;
})

Object.assign(MountDOM, Propertys)

Object.assign(MountDOM.prototype, Propertys)
return MountDOM
})))