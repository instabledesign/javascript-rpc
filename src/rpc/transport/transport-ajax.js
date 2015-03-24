var TransportAjax = (function(parent) {
    inherit(TransportAjax, parent);

    function TransportAjax(options) {
        this.xhr_object = null;

        if(window.XMLHttpRequest) {
            this.xhr_object = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            this.xhr_object = new ActiveXObject('Microsoft.XMLHTTP');
        }
        else {
            throw new Exception('Browser not support XMLHTTPRequest.');
        }

        this.options = {
            preSend: function(){},
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

        this.xhr_object.open.apply(this.xhr_object, ObjectToArray(this.options.open));
    }

    TransportAjax.prototype.send = function(data) {
        var _this = this;
        var defer = Q.defer();

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

        _this.options.preSend.call(_this.xhr_object, data, defer);
        _this.xhr_object.send(data);

        return defer.promise;
    };

    return TransportAjax;
})(Transport);