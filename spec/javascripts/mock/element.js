define(['regexper'], function(Regexper) {
    var Element = function(attrs) {
        this.attrs = {};
        this.attr(attrs);

        this.setDimensions(this.attrs.width || 0, this.attrs.height || 0);
    };

    Regexper.extend(Element.prototype, {
        setDimensions: function(width, height) {
            this._width = width;
            this._height = height;
        },

        getBBox: function() {
            return {
                x: this.attrs.x,
                y: this.attrs.y,
                x2: this.attrs.x + this._width,
                y2: this.attrs.y + this._height,
                width: this._width,
                height: this._height
            };
        },

        attr: function() {
            if (arguments.length == 1) {
                Regexper.extend(this.attrs, arguments[0]);
            } else {
                this.attrs[arguments[0]] = arguments[1];
            }
        },

        insertAfter: function() {},

        insertBefore: function() {}
    });

    return Element;
});
