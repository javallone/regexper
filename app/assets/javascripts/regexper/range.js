define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var Range = function(paper, structure) {
        Base.call(this);
        TextBox.call(this, paper, 'Temporary Range',
            {}, { fill: '#ffffff' });

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(Range.prototype, Base.prototype, TextBox.prototype);

    return Range;
});
