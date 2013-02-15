getAnyChar = function(Regexper, TextBox) {
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
        TextBox.call(this, paper, structure.range, 'any character',
            base_text_attrs, base_rect_attrs);
    };

    Regexper.extend(AnyCharacter.prototype, TextBox.prototype);

    return AnyCharacter;
}
