define(['regexper', 'regexper/base'], function(Regexper, Base) {
    var text_margin = 5,
        base_text_attrs = {
            'font-size': 12
        },
        base_rect_attrs = {
            r: 3,
            fill: '#bada55',
            stroke: '#bada55'
        };

    var Escaped = function(paper, structure) {
        var text_box;

        Base.call(this);

        this._text = paper.text(0, 0, structure.content);
        this._text.attr(base_text_attrs);
        if (typeof structure.content.type !== 'undefined') {
            switch (structure.content.type) {
            case 'control':
                this._text.attr('text', 'Ctrl-' + structure.content.code);
                break;
            case 'hex':
                this._text.attr('text', '0x' + structure.content.code);
                break;
            case 'unicode':
                this._text.attr('text', 'U+' + structure.content.code);
                break;
            }
        }
        text_box = this._text.getBBox();

        this._rect = paper.rect(0, 0,
            text_box.width + 2 * text_margin,
            text_box.height + 2 * text_margin);
        this._rect.attr(base_rect_attrs);

        this._stack_order = [this._rect, this._text];

        this._mark_complete();
    };

    Regexper.extend(Escaped.prototype, Base.prototype, {
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

    return Escaped;
});
