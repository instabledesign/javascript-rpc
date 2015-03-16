var InvalidArgumentException = (function(parent) {
    inherit(InvalidArgumentException, parent);

    function InvalidArgumentException(object, type, message) {
        message = 'Need to be an "' + type + '". "' + typeof(object) + '" given.' + (message || '');
        parent.call(this, message);
    }

    return InvalidArgumentException;
})(Exception);