var JsonClient = (function(parent) {
    inherit(JsonClient, parent);

    function JsonClient(transport) {
        var _this = this;

        // If transport is websocket the send process is asynchronous
        // So we keep the request defer to resolve with correct response
        if (transport instanceof TransportWebsocket) {
            this.requests = [];
            transport.options.preSend = function(data, defer){
                var request = JSON.parse(data);
                _this.requests[request.id] = defer;
            };

            transport.options.onmessage = function(event){
                var response = JSON.parse(event.data);
                if (response.hasOwnProperty('id') && _this.requests.hasOwnProperty(response.id)) {
                    _this.requests[response.id].resolve(event.data);
                }
                else {
                    console.log('notif', response);
                }
            };
        }

        parent.call(this, new JsonImplementation(), transport);
    }

    return JsonClient;
})(Client);