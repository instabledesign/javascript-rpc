var TransportWebsocket = (function(parent) {
    inherit(TransportWebsocket, parent);

    function TransportWebsocket(options) {
        if(typeof window.WebSocket !== 'function') throw new Exception('Browser not support WebSocket.');
        if((typeof options.url) !== 'string') throw new InvalidArgumentException(options.url, 'string');
        if(options.preSend && (typeof options.preSend) !== 'function') throw new InvalidArgumentException(options.preSend, 'function');
        if(options.onmessage && (typeof options.onmessage) !== 'function') throw new InvalidArgumentException(options.onmessage, 'function');
        if(options.onerror && (typeof options.onerror) !== 'function') throw new InvalidArgumentException(options.onerror, 'function');
        if(options.onclose && (typeof options.onclose) !== 'function') throw new InvalidArgumentException(options.onclose, 'function');

        var _this = this;
        _this.CONNECTING = 0;
        _this.OPEN = 1;
        _this.CLOSING = 2;
        _this.CLOSED = 3;

        _this.options = {
            url: options.url,
            preSend: function(){},
            onmessage: function(){},
            onerror: function(){},
            onclose: function(){}
        };
        merge(_this.options, options);

        _this.onready = Q.defer();
        _this.websocket = new WebSocket(_this.options.url);

        _this.websocket.onopen = function(){
            if(_this.websocket.readyState == _this.OPEN) {
                _this.websocket.onmessage = _this.options.onmessage;
                _this.websocket.onerror = _this.options.onerror;
                _this.websocket.onclose = _this.options.onclose;
                _this.onready.resolve(_this.websocket);
            }
        };
    }

    TransportWebsocket.prototype.send = function(data) {
        var _this = this;
        var defer = Q.defer();

        _this.onready.promise.then(function(){
            _this.options.preSend.call(_this.websocket, data, defer);
            _this.websocket.send(data);
        });

        return defer.promise;
    };

    return TransportWebsocket;
})(Transport);