define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var base_text_attrs = {
            'font-size': 12,
            fill: '#ffffff'
        },
        base_rect_attrs = {
            r: 0,
            fill: '#6b6659',
            stroke: '#6b6659'
        };

    var AnyCharacter = function(paper, structure) {
        Base.call(this);
        TextBox.call(this, paper, 'any character',
            base_text_attrs, base_rect_attrs);

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(AnyCharacter.prototype, Base.prototype, TextBox.prototype);

    return AnyCharacter;
});
