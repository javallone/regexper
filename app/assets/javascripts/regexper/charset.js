getCharset = function(Regexper, Base) {
    var margin = 5,
        item_spacing = 10,
        base_box_attrs = {
            r: 3,
            fill: '#cbcbba',
            stroke: '#cbcbba'
        },
        base_label_attrs = {
            'font-size': 10
        };

    var Charset = function(paper, structure) {
        var self = this;

        Base.call(this, structure.range);

        this._box = paper.rect(0, 0, 0, 0);
        this._box.attr(base_box_attrs);

        this._label = paper.text(0, 0, structure.inverted ? 'None of:' : 'One of:');
        this._label.attr(base_label_attrs);

        this._stack_order = [this._box, this._label];

        Regexper.render_contents(paper, structure.content, function(contents) {
            var i, box;

            self._contents = contents;

            for (i = 0; i < self._contents.length; i++) {
                box = self._contents[i].get_box();

                self._width = Math.max(self._width, box.width);
                self._height += box.height + item_spacing;
            }

            if (self._contents.length > 0) {
                self._height -= item_spacing;
            }

            self._width += 2 * margin;
            self._height += 2 * margin;

            box = self._label.getBBox();

            self._width = Math.max(self._width, box.width);

            self._box.attr({
                width: self._width,
                height: self._height
            });

            self.bindHover(self._box);

            self._height += box.height;

            self._mark_complete();
        });
    };

    Regexper.extend(Charset.prototype, Base.prototype, {
        position: function(x, y) {
            var i, box, centerline;

            Base.prototype.position.call(this, x, y);

            box = this._label.getBBox();
            this._label.attr({
                x: x + box.width / 2,
                y: y + box.height / 2
            });

            y += box.height;
            this._box.attr({
                x: x,
                y: y
            });

            box = this.get_box();
            centerline = box.x + box.width / 2;

            y += margin;

            for (i = 0; i < this._contents.length; i++) {
                box = this._contents[i].get_box();
                this._contents[i].position(centerline - box.width / 2, y);

                y = this._contents[i].get_box().y2 + item_spacing;
            }
        },

        get_connection_offset: function() {
            return this._label.getBBox().height + this._box.getBBox().height / 2;
        }
    });

    return Charset;
}
