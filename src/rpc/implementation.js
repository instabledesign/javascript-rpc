var Implementation = (function() {
    function Implementation() {

    }

    Implementation.prototype.createMethodResponse = function(response) {
        throw 'You must redefine this method in inherited class';
    };

    Implementation.prototype.createRequest = function(methodCall) {
        throw 'You must redefine this method in inherited class';
    };

    return Implementation;
})();