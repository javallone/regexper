define(['regexper', 'mock/element'], function(Regexper, Element) {
    var Paper = function() {
        var name;

        for (name in Paper.prototype) {
            if (Paper.prototype.hasOwnProperty(name)) {
                spyOn(this, name).andCallThrough();
            }
        }
    };

    Regexper.extend(Paper.prototype, {
        text: function(x, y, text) {
            var result = new Element({
                x: x,
                y: y,
                text: text
            });
            result.setDimensions(10 * text.length, 10);
            result.getBBox = function() {
                var box = Element.prototype.getBBox.call(this);
                box.x -= box.width / 2;
                box.x2 -= box.width / 2;
                box.y -= box.height / 2;
                box.y2 -= box.height / 2;
                return box;
            };
            return result;
        },

        rect: function(x, y, width, height) {
            return new Element({
                x: x,
                y: y,
                width: width,
                height: height
            });
        }
    });

    return Paper;
});
