define(['regexper'], function(Regexper) {
    var text_margin = 5;

    var TextBox = function(paper, label, text_attrs, rect_attrs) {
        var text_box;

        this._text = paper.text(0, 0, label);
        this._text.attr(text_attrs);

        text_box = this._text.getBBox();

        this._rect = paper.rect(0, 0,
            text_box.width + 2 * text_margin,
            text_box.height + 2 * text_margin);
        this._rect.attr(rect_attrs);
    };

    Regexper.extend(TextBox.prototype, {
        position: function(x, y) {
            var text_box = this._text.getBBox(),
                rect_box = this._rect.getBBox();

            this._rect.attr({ x: x, y: y });
            this._text.attr({
                x: x + rect_box.width / 2,
                y: y + rect_box.height / 2
            });
        },

        get_box: function() {
            return this._rect.getBBox();
        }
    });

    return TextBox;
});
