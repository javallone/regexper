define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var base_text_attrs = {
            'font-size': 12
        },
        base_rect_attrs = {
            r: 3,
            fill: '#dae9e5',
            stroke: '#dae9e5'
        };

    var Literal = function(paper, structure) {
        Base.call(this);
        TextBox.call(this, paper, '"' + structure.content + '"',
            base_text_attrs, base_rect_attrs);

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(Literal.prototype, Base.prototype, TextBox.prototype);

    return Literal;
});
