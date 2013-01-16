getTextBox = function(Regexper, Base) {
    var text_margin = 5;

    var TextBox = function(paper, label, text_attrs, rect_attrs) {
        var text_box, rect_box;

        Base.call(this);

        this._text = paper.text(0, 0, label);
        this._text.attr(text_attrs);

        text_box = this._text.getBBox();
        this._rect = paper.rect(0, 0,
            text_box.width + 2 * text_margin,
            text_box.height + 2 * text_margin);
        this._rect.attr(rect_attrs);

        rect_box = this._rect.getBBox();
        this._width = rect_box.width;
        this._height = rect_box.height;

        this._stack_order = [this._rect, this._text];
        this._mark_complete();
    };

    Regexper.extend(TextBox.prototype, Base.prototype, {
        position: function(x, y) {
            var rect_box = this._rect.getBBox();

            Base.prototype.position.call(this, x, y);

            this._rect.attr({ x: x, y: y });
            this._text.attr({
                x: x + rect_box.width / 2,
                y: y + rect_box.height / 2
            });
        }
    });

    return TextBox;
}
