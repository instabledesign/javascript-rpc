var Client = (function() {
    function Client(url, implementation, transport) {
        if (!(implementation instanceof Implementation)) throw 'Implementation not valid';
        if (!(transport instanceof Transport)) throw 'Transport not valid';

        this.url = url;
        this.implementation = implementation;
        this.transport = transport;
    }

    Client.prototype.call = function(methodName, parameters, id, options) {
        return handle.call(this, new MethodCall(methodName, parameters, id), options).promise;
    };

    var handle = function(methodCall, options) {
        if (!(methodCall instanceof MethodCall)) throw 'MethodCall not valid';

        var _this = this;
        var defer = Q.defer();
        var request = _this.implementation.createRequest(methodCall);

        _this.transport
            .send(request, options).then(function(response){
                var methodResponse = _this.implementation.createMethodResponse(response);
                //console.log('%s', _this.implementation.createMethodResponse);
                console.log(methodResponse);
                //console.log(methodResponse);
                //defer.resolve(methodResponse);
            })
            .fail(function(exception){
                defer.reject(exception);
            });

        return defer;
    };

    return Client;
})();