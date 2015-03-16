var Client;
Client = (function () {
    function Client(url, implementation, transport) {
        if (!(implementation instanceof Implementation)) throw new InvalidArgumentException(implementation, 'Implementation');
        if (!(transport instanceof Transport)) throw new InvalidArgumentException(transport, 'Transport');

        this.url = url;
        this.implementation = implementation;
        this.transport = transport;
    }

    Client.prototype.call = function (methodName, parameters, id, options) {
        var _this = this;
        var defer = Q.defer();
        try {
            var methodCall = new MethodCall(methodName, parameters, id);
            var request = _this.implementation.createRequest(methodCall);

            _this.transport
                .send(request, options).then(function (response) {
                    var methodResponse = _this.implementation.createMethodResponse(response);
                    if (methodResponse instanceof MethodFault) {
                        defer.reject(methodResponse);
                    }
                    else if (methodResponse instanceof MethodReturn) {
                        defer.resolve(methodResponse.returnValue);
                    }
                    else {
                        defer.reject(new Exception('unable to determine method response type'));
                    }
                })
                .fail(function (exception) {
                    defer.reject(exception);
                });
        }
        catch (exception) {
            defer.reject(exception);
        }

        return defer.promise;
    };

    return Client;
})();