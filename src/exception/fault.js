var Fault = (function(parent) {
    inherit(Fault, parent);

    function Fault(message, code) {
        parent.call(this, message, code);
    }

    return Fault;
})(Exception);