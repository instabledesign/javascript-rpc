var MethodCall = (function() {
    function MethodCall(methodName, parameters, callId) {
        this.methodName = methodName;
        this.parameters = parameters;
        this.callId = callId;
    }

    return MethodCall;
})();