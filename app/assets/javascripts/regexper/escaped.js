define(['regexper', 'regexper/text_box'], function(Regexper, TextBox) {
    var base_text_attrs = {
            'font-size': 12
        },
        base_rect_attrs = {
            r: 3,
            fill: '#bada55',
            stroke: '#bada55'
        };

    var Escaped = function(paper, structure) {
        var label = structure.content;

        if (typeof structure.content.type !== 'undefined') {
            switch (structure.content.type) {
            case 'control':
                label = 'Ctrl-' + structure.content.code;
                break;
            case 'back_reference':
                label = 'Back reference (group = ' + structure.content.code + ')';
                break;
            case 'octal':
                label = 'Octal: ' + structure.content.code;
                break;
            case 'hex':
                label = '0x' + structure.content.code;
                break;
            case 'unicode':
                label = 'U+' + structure.content.code;
                break;
            }
        }

        TextBox.call(this, paper, label,
            base_text_attrs, base_rect_attrs);
    };

    Regexper.extend(Escaped.prototype, TextBox.prototype);

    return Escaped;
});
