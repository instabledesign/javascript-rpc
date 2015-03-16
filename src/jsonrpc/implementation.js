var JsonImplementation = (function(parent) {
    inherit(JsonImplementation, parent);

    function JsonImplementation() {
        this.ERROR_PARSING            = -32700;
        this.ERROR_INVALID_REQUEST    = -32600;
        this.ERROR_METHOD_NOT_FOUND   = -32601;
        this.ERROR_INVALID_PARAMETERS = -32602;
        this.ERROR_INTERNAL_ERROR     = -32603;
        this.ERROR_SERVER_ERROR       = -32000;

        this.jsonrpc = '2.0';
    }

    JsonImplementation.prototype.createMethodResponse = function(response) {
        if (response == undefined || response == '') throw new Exception('The JSON-RPC is empty.');

        try {
            var data = JSON.parse(response);
        }
        catch (e){
            throw new InvalidJsonRpc('The JSON-RPC response is not valid', this.ERROR_PARSING);
        }

        if (data.hasOwnProperty('jsonrpc') && (data.jsonrpc == '' || data.jsonrpc != this.jsonrpc && data.jsonrpc < this.jsonrpc)) {
            throw new InvalidJsonRpc('The JSON-RPC response version is not supported');
        }

        if (data.hasOwnProperty('result')) {
            return new MethodReturn(data.result);
        }
        else if (data.hasOwnProperty('error')) {
            if (!data.error.hasOwnProperty('message')) {
                throw new InvalidJsonRpc('The JSON-RPC fault message is not passed');
            }
            if (!data.error.hasOwnProperty('code')) {
                throw new InvalidJsonRpc('The JSON-RPC fault code is not passed');
            }

            return new MethodFault(new Fault(data.error.message, data.error.code));
        }

        throw new Exception('The JSON-RPC response must have a result or error property.');
    };

    JsonImplementation.prototype.createRequest = function(methodCall) {
        if (!(methodCall instanceof MethodCall)) throw new InvalidArgumentException(methodCall, 'MethodCall');

        var request = {
            'jsonrpc':this.jsonrpc
        };

        request.id = methodCall.callId;
        request.method = methodCall.methodName;
        request.params = methodCall.parameters || {};

        return JSON.stringify(request);
    };

    return JsonImplementation;
})(Implementation);