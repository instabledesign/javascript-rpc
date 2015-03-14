var TransportAjax = (function(parent) {
    inherit(TransportAjax, parent);

    function TransportAjax(options) {
        this.xhr_object = null;
        this.options = {
            postOpen: [],
            preSend: [],
            open: {
                method: null,
                url: '',
                async: true,
                username: null,
                password: null
            },
            headers: {}
        };
        merge(this.options, options);

        if(window.XMLHttpRequest) {
            this.xhr_object = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            this.xhr_object = new ActiveXObject('Microsoft.XMLHTTP');
        }
        else {
            throw 'Browser not support XMLHTTPRequest...';
        }
    }

    TransportAjax.prototype.postOpen = function() {
        var _this = this;

        if (_this.options.postOpen.constructor !== Array) {
            throw 'postOpen must be an array of callback';
        }
        for (var i in _this.options.postOpen) {
            if (!_this.options.postOpen[i] instanceof Function) {
                throw 'postOpen can contain only function type';
            }

            _this.options.postOpen[i].call(_this.xhr_object);
        }
    };

    TransportAjax.prototype.preSend = function() {
        var _this = this;

        if (_this.options.preSend.constructor !== Array) {
            throw 'preSend must be an array of callback';
        }
        for (var j in _this.options.preSend) {
            if (!_this.options.preSend[j] instanceof Function) {
                throw 'preSend can contain only function type';
            }

            _this.options.preSend[j].call(_this.xhr_object);
        }
    };

    TransportAjax.prototype.send = function(data, options) {
        var _this = this;
        var defer = Q.defer();

        merge(_this.options, options);

        _this.xhr_object.open.apply(_this.xhr_object, ObjectToArray(_this.options.open));
        _this.postOpen();

        _this.xhr_object.onreadystatechange = function() {
            if(_this.xhr_object.readyState == 1) {
                defer.notify('Loading data');
            }
            if(_this.xhr_object.readyState == 2) {
                defer.notify('Data sended');
            }
            if(_this.xhr_object.readyState == 3) {
                defer.notify('Partial data received');
            }
            if(_this.xhr_object.readyState == 4) {
                if (_this.xhr_object.status !== 200) {
                    defer.reject(_this.xhr_object.statusText);
                }
                else {
                    defer.resolve(_this.xhr_object.responseText);
                }
            }
        };

        for(var name in _this.options.headers) {
            _this.xhr_object.setRequestHeader(name, _this.options.headers[name]);
        }

        _this.preSend();
        _this.xhr_object.send(data);

        return defer.promise;
    };

    return TransportAjax;
})(Transport);