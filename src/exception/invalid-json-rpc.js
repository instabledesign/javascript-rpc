var InvalidJsonRpc = (function(parent) {
    inherit(InvalidJsonRpc, parent);

    function InvalidJsonRpc(message, code) {
        parent.call(this, message, code);
    }

    return InvalidJsonRpc;
})(Exception);