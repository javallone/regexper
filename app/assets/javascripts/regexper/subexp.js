define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var Subexp = function(paper, structure) {
        Base.call(this);
        TextBox.call(this, paper, 'Temporary Subexp',
            {}, { fill: '#ffffff' });

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(Subexp.prototype, Base.prototype, TextBox.prototype);

    return Subexp;
});
