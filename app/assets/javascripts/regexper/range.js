getRange =  function(Regexper, Base) {
    var base_text_attrs = {
            'font-size': 12,
            'font-weight': 'bold'
        },
        margin = 5;

    var Range = function(paper, structure) {
        var self = this;

        Base.call(this, structure.range);

        this._dash = paper.text(0, 0, '-');
        this._dash.attr(base_text_attrs);

        this._stack_order = [this._dash];

        Regexper.render_contents(paper, [
            structure.start,
            structure.stop
        ], function(contents) {
            var start_box, stop_box, dash_box;

            self._contents = contents; // For stacking purposes
            self._start = self._contents[0];
            self._stop = self._contents[1];

            start_box = self._start.get_box();
            stop_box = self._stop.get_box();
            dash_box = self._dash.getBBox();

            self._height = Math.max(start_box.height, stop_box.height);
            self._width = start_box.width + dash_box.width + stop_box.width + 2 * margin;

            self._mark_complete();
        });
    };

    Regexper.extend(Range.prototype, Base.prototype, {
        position: function(x, y) {
            var box, stop_box;

            Base.prototype.position.call(this, x, y);

            this._start.position(x, y);

            this._dash.attr({
                x: x + this._width / 2,
                y: y + this._height / 2
            });

            box = this.get_box();
            stop_box = this._stop.get_box();
            this._stop.position(box.x2 - stop_box.width, y);
        }
    });

    return Range;
}
