var MethodFault = (function(parent) {
    inherit(MethodFault, parent);

    function MethodFault(exception, callId) {
        this.exception = exception;
    }

    return MethodFault;
})(MethodResponse);