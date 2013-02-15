getLiteral = function(Regexper, TextBox) {
    var base_text_attrs = {
            'font-size': 12
        },
        base_rect_attrs = {
            r: 3,
            fill: '#dae9e5',
            stroke: '#dae9e5'
        };

    var Literal = function(paper, structure) {
        TextBox.call(this, paper, structure.range, '"' + structure.content + '"',
            base_text_attrs, base_rect_attrs);
    };

    Regexper.extend(Literal.prototype, TextBox.prototype);

    return Literal;
}
