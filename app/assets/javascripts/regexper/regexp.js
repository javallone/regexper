define(['regexper', 'regexper/base'], function(Regexper, Base) {
    var item_spacing = 10,
        curve_radius = 10,
        base_connector_attrs = {
            'stroke-width': 2
        };

    var Regexp = function(paper, structure) {
        var self = this;

        Base.call(this);

        this._paper = paper;

        Regexper.render_contents(paper, structure.content, function(contents) {
            var i, box;

            self._contents = contents;

            for (i = 0; i < self._contents.length; i++) {
                box = self._contents[i].get_box();

                self._width = Math.max(self._width, box.width);
                self._height += box.height + item_spacing;
            }

            self._height -= item_spacing;

            if (self._contents.length > 1) {
                self._width += 4 * curve_radius;
            }

            self._mark_complete();
        });
    };

    Regexper.extend(Regexp.prototype, Base.prototype, {
        get_connection_offset: function() {
            if (this._contents.length > 1) {
                return Base.prototype.get_connection_offset.call(this);
            } else {
                return this._contents[0].get_connection_offset();
            }
        },

        position: function(x, y) {
            var i, box, centerline;

            Base.prototype.position.call(this, x, y);

            box = this.get_box();
            centerline = box.x + box.width / 2;

            for (i = 0; i < this._contents.length; i++) {
                box = this._contents[i].get_box();
                this._contents[i].position(centerline - box.width / 2, y);

                if (this._contents.length > 1) {
                    this._draw_connector(this._contents[i]);
                }

                y = this._contents[i].get_box().y2 + item_spacing;
            }
        },

        _draw_connector: function(item) {
            var box = this.get_box(),
                offset = this.get_connection_offset(),
                item_box = item.get_box(),
                item_offset = item.get_connection_offset(),
                distance = Math.abs((box.y + offset) - (item_box.y + item_offset)),
                above = (box.y + offset) > (item_box.y + item_offset),
                path_str;

            if (distance >= 1.5 * curve_radius) {
                path_str = 'M{start.x},{start.y}Q{start_control.x},{start.y} {start_control.x},{start_control.y}V{end_control.y}Q{end_control.x},{end.y} {end.x},{end.y}H{end_connector.x}';
            } else {
                path_str = 'M{start.x},{start.y}C{start_control.x},{start.y} {end_control.x},{end_connector.y} {end_connector.x},{end_connector.y}';
            }

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box.x,
                    y: box.y + offset
                },
                start_control: {
                    x: box.x + curve_radius,
                    y: box.y + offset - (above ? curve_radius : -curve_radius)
                },
                end: {
                    x: box.x + 2 * curve_radius,
                    y: item_box.y + item_offset
                },
                end_control: {
                    x: box.x + curve_radius,
                    y: item_box.y + item_offset + (above ? curve_radius : -curve_radius)
                },
                end_connector: {
                    x: item_box.x,
                    y: item_box.y + item_offset
                }
            })).attr(base_connector_attrs).toBack();

            this._paper.path(Raphael.fullfill(path_str, {
                start: {
                    x: box.x2,
                    y: box.y + offset
                },
                start_control: {
                    x: box.x2 - curve_radius,
                    y: box.y + offset - (above ? curve_radius : -curve_radius)
                },
                end: {
                    x: box.x2 - 2 * curve_radius,
                    y: item_box.y + item_offset
                },
                end_control: {
                    x: box.x2 - curve_radius,
                    y: item_box.y + item_offset + (above ? curve_radius : -curve_radius)
                },
                end_connector: {
                    x: item_box.x2,
                    y: item_box.y + item_offset
                }
            })).attr(base_connector_attrs).toBack();
        }
    });

    return Regexp;
});
