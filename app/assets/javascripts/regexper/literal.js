define(['regexper'], function(Regexper) {
    var text_margin = 5,
        base_text_attrs = {
            'font-size': 12
        },
        base_rect_attrs = {
            r: 3,
            fill: '#dae9e5',
            stroke: '#dae9e5'
        };

    var Literal = function(paper, structure) {
        var text_box;

        this._text = paper.text(0, 0, '"' + structure.content + '"');
        this._text.attr(base_text_attrs);
        text_box = this._text.getBBox();

        this._rect = paper.rect(0, 0,
            text_box.width + 2 * text_margin,
            text_box.height + 2 * text_margin);
        this._rect.attr(base_rect_attrs);
    };

    Regexper.extend(Literal.prototype, {
        position: function(x, y) {
            var text_box = this._text.getBBox(),
                rect_box = this._rect.getBBox();

            this._rect.attr({ x: x, y: y });
            this._text.attr({
                x: x + rect_box.width / 2,
                y: y + rect_box.height / 2
            });
        },

        stack: function(relative) {
            if (relative) {
                this._rect.insertAfter(relative);
            }
            this._text.insertAfter(this._rect);
        },

        get_box: function() {
            return this._rect.getBBox();
        },

        get_connections: function() {
            var box = this.get_box();

            return {
                left: { x: box.x, y: box.y + box.height / 2 },
                right: { x: box.x2, y: box.y + box.height / 2 }
            };
        }
    });

    return Literal;
});
