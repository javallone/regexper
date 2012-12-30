define(['regexper', 'regexper/base'], function(Regexper, Base) {
    var text_margin = 5,
        base_text_attrs = {
            'font-size': 12,
            fill: '#ffffff'
        },
        base_rect_attrs = {
            r: 0,
            fill: '#6b6659',
            stroke: '#6b6659'
        };

    var AnyCharacter = function(paper, structure) {
        var text_box;

        Base.call(this);

        this._text = paper.text(0, 0, 'any character');
        this._text.attr(base_text_attrs);
        text_box = this._text.getBBox();

        this._rect = paper.rect(0, 0,
            text_box.width + 2 * text_margin,
            text_box.height + 2 * text_margin);
        this._rect.attr(base_rect_attrs);

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(AnyCharacter.prototype, Base.prototype, {
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

    return AnyCharacter;
});
