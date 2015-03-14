var JsonImplementation = (function(parent) {
    inherit(JsonImplementation, parent);

    function JsonImplementation() {
    }

    JsonImplementation.prototype.createMethodCall = function(request) {
        console.log(request);
    };

    JsonImplementation.prototype.createResponse = function(methodResponse) {
        console.log(methodResponse);
    };

    JsonImplementation.prototype.createMethodResponse = function(response) {
        console.log(response);
    };

    JsonImplementation.prototype.createRequest = function(methodCall) {
        var request = {
            "jsonrpc":"2.0"
        };

        request.id = methodCall.callId;
        request.method = methodCall.methodName;
        request.params = methodCall.parameters || {};

        return JSON.stringify(request);
    };

    return JsonImplementation;
})(Implementation);