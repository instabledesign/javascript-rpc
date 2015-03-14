var TransportWebsocket = (function(parent) {
    inherit(TransportAjax, parent);

    function TransportWebsocket(url) {
        this.websocket = new WebSocket(url);
    }

    TransportWebsocket.prototype.send = function(data) {
        var defer = Q.defer();
        this.websocket.send(data);

        return defer.promise;
    };

    return TransportWebsocket;
})(Transport);