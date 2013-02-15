getSubexp = function(Regexper, Base, Regexp) {
    var margin = 10
        base_connector_attrs = {
            'stroke-width': 2
        },
        base_rect_attrs = {
            r: 3,
            'stroke-dasharray': '-',
            'stroke-width': 2,
            'stroke': '#a0a0a0'
        },
        base_text_attrs = {
            'font-size': 10
        };

    var Subexp = function(paper, structure) {
        var self = this, label;

        Base.call(this, structure.range);

        this._paper = paper;

        this._include_box = (structure.kind !== 'no_capture');

        switch (structure.kind) {
        case 'capture':
            label = 'Group #' + structure.group;
            break;
        case 'positive_lookahead':
            label = 'Positive Lookahead';
            break;
        case 'negative_lookahead':
            label = 'Negative Lookahead';
            break;
        }

        if (this._include_box) {
            this._rect = paper.rect(0, 0, 0, 0);
            this._rect.attr(base_rect_attrs);

            this._text = paper.text(0, 0, label);
            this._text.attr(base_text_attrs);

            this.bindHover(this._rect);
            this.bindHover(this._text, this._rect);

            this._stack_order = [this._rect, this._text];
        }

        this._expression = new Regexp(paper, structure);
        this._expression.complete(function() {
            var box = self._expression.get_box();

            self._contents = [self._expression]; // For stacking purposes

            self._width = box.width;
            self._height = box.height;

            if (self._include_box) {
                self._width += 2 * margin;
                self._height += 2 * margin + self._text.getBBox().height;

                self._rect.attr({
                    width: box.width + 2 * margin,
                    height: box.height + 2 * margin
                });

                self._width = Math.max(self._width, self._text.getBBox().width);
            }

            self._mark_complete();
        });
    };

    Regexper.extend(Subexp.prototype, Base.prototype, {
        position: function(x, y) {
            var rect_box, text_box;

            Base.prototype.position.call(this, x, y);

            if (this._include_box) {
                text_box = this._text.getBBox();
                this._text.attr({
                    x: x + text_box.width / 2,
                    y: y + text_box.height / 2
                });

                this._rect.attr({
                    x: x,
                    y: y + text_box.height
                });

                rect_box = this._rect.getBBox();
                this._expression.position(rect_box.x + margin, rect_box.y + margin);

                this._draw_connections(this._expression);
            } else {
                this._expression.position(x, y);
            }
        },

        _draw_connections: function(item) {
            var box = this.get_box(),
                item_box = item.get_box(),
                offset = this.get_connection_offset(),
                item_offset = item.get_connection_offset(),
                path_str = 'M{start.x},{start.y}H{end.x}';

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box.x,
                    y: box.y + offset
                },
                end: {
                    x: item_box.x,
                    y: item_box.y + item_offset
                }
            })).attr(base_connector_attrs).toBack();

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box.x2,
                    y: box.y + offset
                },
                end: {
                    x: item_box.x2,
                    y: item_box.y + item_offset
                }
            })).attr(base_connector_attrs).toBack();
        },

        get_connection_offset: function() {
            if (this._include_box) {
                return this._text.getBBox().height + this._expression.get_connection_offset() + margin;
            } else {
                return this._expression.get_connection_offset();
            }
        }
    });

    return Subexp;
}
