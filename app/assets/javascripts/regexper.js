define(function() {
    var Regexper = {
        extend: function(target) {
            var i, key;

            for (i = 1; i < arguments.length; i++) {
                for (key in arguments[i]) {
                    target[key] = arguments[i][key];
                }
            }
        },

        render: function(paper, structure, complete) {
            var module_name = 'regexper/' + structure.type;

            require([module_name], function(Module) {
                var module = new Module(paper, structure);
                module.complete(function() {
                    complete(module);
                });
            });
        }
    };

    return Regexper;
});
