var Implementation = (function() {
    function Implementation() {

    }

    Implementation.prototype.createMethodCall = function(request) {
        throw 'You must redefine this method in inherited class';
    };

    Implementation.prototype.createResponse = function(methodResponse) {
        throw 'You must redefine this method in inherited class';
    };

    Implementation.prototype.createMethodResponse = function(response) {
        throw 'You must redefine this method in inherited class';
        return 'nnnnnnnn';
    };

    Implementation.prototype.createRequest = function(methodCall) {
        throw 'You must redefine this method in inherited class';
    };

    return Implementation;
})();