var JsonClient = (function(parent) {
    inherit(JsonClient, parent);

    function JsonClient(url, transport) {
        parent.call(this, url, new JsonImplementation(), transport);
    }

    return JsonClient;
})(Client);