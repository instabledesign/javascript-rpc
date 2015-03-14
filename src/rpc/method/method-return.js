var MethodReturn = (function(parent) {
    inherit(MethodReturn, parent);

    function MethodReturn(returnValue, returnType, callId) {
        this.returnValue = returnValue;
        this.returnType = returnType;
    }

    return MethodReturn;
})(MethodResponse);