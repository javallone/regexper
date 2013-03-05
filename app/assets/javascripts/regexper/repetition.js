define(['regexper', 'regexper/base'], function(Regexper, Base) {
    var curve_radius = 10,
        base_text_attrs = {
            'font-size': 10
        },
        base_connector_attrs = {
            'stroke-width': 2
        };

    var Repetition = function(paper, structure) {
        var self = this, start, stop,
            repeat_count = structure.repeat_count,
            loop_desc;

        Base.call(this);

        this._paper = paper;

        this._has_desc = false;

        switch (repeat_count) {
        case 'any':
            this._include_skip = true;
            this._include_loop = true;
            loop_desc = '0+ times';
            break;
        case 'required':
            this._include_skip = false;
            this._include_loop = true;
            loop_desc = '1+ times';
            break;
        case 'optional':
            this._include_skip = true;
            this._include_loop = false;
            loop_desc = '0 or 1 time';
            break;
        default:
            if (typeof repeat_count.start !== 'undefined' || typeof repeat_count.stop !== 'undefined') {
                start = repeat_count.start || 0;
                stop = repeat_count.stop;

                this._include_skip = (start === 0);
                this._include_loop = (typeof stop === 'undefined' || stop > 1);

                if (this._include_loop) {
                    if (typeof stop === 'undefined') {
                        loop_desc = start + '+ times';
                    } else if (start > 0) {
                        loop_desc = start + '...' + stop;
                    } else {
                        loop_desc = 'upto ' + stop + ' times';
                    }
                }
            } else {
                this._include_skip = false;
                this._include_loop = true;
                loop_desc = repeat_count + ' times';
            }
        }

        if (loop_desc) {
            this._text = paper.text(0, 0, loop_desc);
            this._text.attr(base_text_attrs);
            this._has_desc = true;
        }

        Regexper.render(paper, structure.content, function(expression) {
            var box;

            self._expression = expression;
            self._contents = [self._expression]; // For stacking purposes

            box = self._expression.get_box();

            self._width = box.width;
            self._height = box.height;

            if (self._include_skip) {
                self._width += 4 * curve_radius;
                self._height += curve_radius;
            }

            if (self._include_loop) {
                self._width += 2 * curve_radius;
                self._height += curve_radius;
            }

            if (self._has_desc) {
                self._height += self._text.getBBox().height;
            }

            self._mark_complete();
        });
    };

    Regexper.extend(Repetition.prototype, Base.prototype, {
        position: function(x, y) {
            var box, text_box,
                expression_x = x, expression_y = y;

            Base.prototype.position.call(this, x, y);

            if (this._include_skip) {
                expression_x += 2 * curve_radius;
                expression_y += curve_radius;
            }

            if (this._include_loop) {
                expression_x += curve_radius;
            }

            this._expression.position(expression_x, expression_y);

            this._draw_lead_lines(this._expression);

            if (this._include_skip) {
                this._draw_skip_line();
            }

            if (this._include_loop) {
                this._draw_loop_line();
            }

            if (this._has_desc) {
                box = this.get_box();
                text_box = this._text.getBBox();

                this._text.attr({
                    x: box.x2 - text_box.width / 2,
                    y: box.y2 - text_box.height / 2
                });
            }
        },

        _draw_lead_lines: function(item) {
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

        _draw_skip_line: function() {
            var box = this.get_box(),
                expression_box = this._expression.get_box(),
                offset = this.get_connection_offset(),
                path_str = 'M{start.x},{start.y}q{radius},0 {radius},-{radius}V{top}q0,-{radius} {radius},-{radius}H{end}q{radius},0 {radius},{radius}V{bottom}q0,{radius} {radius},{radius}';

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box.x,
                    y: box.y + offset
                },
                radius: curve_radius,
                top: expression_box.y,
                bottom: box.y + offset - curve_radius,
                end: box.x2 - 2 * curve_radius
            })).attr(base_connector_attrs).toBack();
        },

        _draw_loop_line: function() {
            var box = this.get_box(),
                expression_box = this._expression.get_box(),
                offset = this.get_connection_offset(),
                path_str = 'M{start.x},{start.y}q{radius},0 {radius},{radius}V{bottom}q0,{radius} -{radius},{radius}H{end}q-{radius},0 -{radius},-{radius}V{top}q0,-{radius} {radius},-{radius}';

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: expression_box.x2,
                    y: box.y + offset
                },
                radius: curve_radius,
                top: box.y + offset + curve_radius,
                bottom: expression_box.y2,
                end: expression_box.x
            })).attr(base_connector_attrs).toBack();
        },

        get_connection_offset: function() {
            var offset = this._expression.get_connection_offset();

            if (this._include_skip) {
                offset += curve_radius;
            }

            return offset;
        }
    });

    return Repetition;
});
