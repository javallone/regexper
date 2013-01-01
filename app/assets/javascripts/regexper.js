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
        },

        render_contents: function(paper, contents, complete) {
            function content_complete(index) {
                return function(element) {
                    result[index] = element;
                    count--;

                    if (count === 0) {
                        complete(result);
                    }
                }
            }

            var i,
                count = contents.length,
                result = [];

            for (i = 0; i < contents.length; i++) {
                Regexper.render(paper, contents[i], content_complete(i));
            }
        }
    };

    return Regexper;
});
