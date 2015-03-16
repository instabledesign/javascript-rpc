var Exception = (function() {
    function Exception(message, code) {
        this.message = message || '';
        this.code = code;
    }

    return Exception;
})();