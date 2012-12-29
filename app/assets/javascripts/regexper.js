define(function() {
    var Regexper = {
        extend: function(target) {
            var i, key;

            for (i = 1; i < arguments.length; i++) {
                for (key in arguments[i]) {
                    target[key] = arguments[i][key];
                }
            }
        }
    };

    return Regexper;
});
