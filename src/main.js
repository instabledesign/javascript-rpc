var merge = function (target, object) {
    for (var key in object) {
        if (target.hasOwnProperty(key) && typeof target[key] == 'object' && typeof object[key] == 'object') {
            merge(target[key], object[key]);
        }
        else {
            target[key] = object[key];
        }
    }
};

var inherit = function (child, parent) {
    for (var p in parent) if (parent.hasOwnProperty(p)) child[p] = parent[p];
    function __() { this.constructor = child; }
    __.prototype = parent.prototype;
    child.prototype = new __();
};

var ObjectToArray = function (object) {
    return Object.keys(object).map(function (key) {
        return object[key];
    })
};
