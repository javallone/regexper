define(['regexper', 'regexper/base', 'regexper/text_box'], function(Regexper, Base, TextBox) {
    var item_spacing = 10,
        base_anchor_text_attrs = {
            'font-size': 12,
            fill: '#ffffff'
        },
        base_anchor_box_attrs = {
            r: 0,
            fill: '#6b6659',
            stroke: '#6b6659'
        },
        base_connector_attrs = {
            'stroke-width': 2
        };

    var Match = function(paper, structure) {
        var self = this;

        Base.call(this);

        this._paper = paper;

        Regexper.render_contents(paper, structure.content, function(contents) {
            var i, box, offset,
                height_above = 0, height_below = 0;

            self._contents = contents;

            if (structure.start) {
                self._contents.unshift(new TextBox(paper, 'Start of Line',
                    base_anchor_text_attrs, base_anchor_box_attrs));
            }

            if (structure.end) {
                self._contents.push(new TextBox(paper, 'End of Line',
                    base_anchor_text_attrs, base_anchor_box_attrs));
            }

            for (i = 0; i < self._contents.length; i++) {
                box = self._contents[i].get_box();
                offset = self._contents[i].get_connection_offset();

                self._width += box.width + item_spacing;

                height_above = Math.max(height_above, offset);
                height_below = Math.max(height_below, box.height - offset);
            }

            self._width -= item_spacing;
            self._height = height_above + height_below;
            self._offset = height_above;

            self._mark_complete();
        });
    };

    Regexper.extend(Match.prototype, Base.prototype, {
        position: function(x, y) {
            var i, item, box, offset, item_offset;

            Base.prototype.position.call(this, x, y);

            offset = this.get_connection_offset();

            for (i = 0; i < this._contents.length; i++) {
                item_offset = this._contents[i].get_connection_offset();

                this._contents[i].position(x, y + offset - item_offset);

                x = this._contents[i].get_box().x2 + item_spacing;
            }

            if (this._contents.length > 0) {
                item = this._contents[0];

                for (i = 1; i < this._contents.length; i++) {
                    this._draw_connection(item, this._contents[i]);
                    item = this._contents[i];
                }
            }
        },

        _draw_connection: function(a, b) {
            var box_a = a.get_box(),
                box_b = b.get_box(),
                offset_a = a.get_connection_offset(),
                offset_b = b.get_connection_offset(),
                path_str = 'M{start.x},{start.y}H{end.x}';

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box_a.x2,
                    y: box_a.y + offset_a
                },
                end: {
                    x: box_b.x,
                    y: box_b.y + offset_b
                }
            })).attr(base_connector_attrs).toBack();
        },

        get_connection_offset: function() {
            return this._offset;
        }
    });

    return Match;
});
