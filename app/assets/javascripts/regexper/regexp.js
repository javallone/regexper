define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var Regexp = function(paper, structure) {
        Base.call(this);
        TextBox.call(this, paper, 'Temporary Regexp',
            {}, { fill: '#ffffff' });

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(Regexp.prototype, Base.prototype, TextBox.prototype);

    return Regexp;
});
