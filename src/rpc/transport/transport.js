var Transport = (function() {
    function Transport() {

    }

    Transport.prototype.send = function(request) {
        throw 'You must redefine this method in inherited class';
    };

    return Transport;
})();