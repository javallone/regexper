getBase = function(Regexper) {
    var Base = function(range) {
        this._range = range;
        this._contents = [];
        this._stack_order = [];
        this._completes = [];
        this._completed = false;
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
    };

    Regexper.extend(Base.prototype, {
        position: function(x, y) {
            this._x = x;
            this._y = y;
        },

        stack: function(relative) {
            var i = 0;

            if (!relative) {
                i = 1;
                relative = this._stack_order[0];
            }

            for (; i < this._stack_order.length; i++) {
                this._stack_order[i].insertAfter(relative);
                relative = this._stack_order[i];
            }

            for (i = 0; i < this._contents.length; i++) {
                this._contents[i].stack(relative);
            }
        },

        get_box: function() {
            return {
                x: this._x,
                y: this._y,
                x2: this._x + this._width,
                y2: this._y + this._height,
                width: this._width,
                height: this._height
            };
        },

        get_connection_offset: function() {
            return this._height / 2;
        },

        complete: function(complete) {
            if (this._completed) {
                complete();
            } else {
                this._completes.push(complete);
            }
        },

        _mark_complete: function() {
            var i;

            this._completed = true;
            for (i = 0; i < this._completes.length; i++) {
                this._completes[i]();
            }
            this._completes = [];
        },

        bindHover: function(item, context) {
            item._range = this._range;
            context = context || item;
            item.hover(Base.prototype.hoverIn, Base.prototype.hoverOut, context, context);
        },

        bindNoFillHover: function(item, context) {
            item._range = this._range;
            context = context || item;
            item.hover(Base.prototype.hoverInNoFill, Base.prototype.hoverOutNoFill, context, context);
        },

        hoverIn: function() {
            highlightRange(this._range[0], this._range[1]);
            this._fill = this.attr('fill');
            this._stroke = this.attr('stroke');
            if (!this._hoverFill) {
                this._hoverFill = "#eeee88";
                this._hoverStroke = "#888844"
            }
            this.attr({"fill": this._hoverFill, "stroke": this._hoverStroke });
        },
        hoverOut: function() {
            highlightRange();
            this.attr({"fill": this._fill, "stroke": this._stroke });
        },

        hoverInNoFill: function() {
            highlightRange(this._range[0], this._range[1]);
            this._swidth = this.attr('stroke-width');
            this._stroke = this.attr('stroke');
            if (!this._hoverStroke) {
                this._strokewidth= 3;
                this._hoverStroke = "#888844"
            }
            this.attr({'stroke-width': this._strokewidth, "stroke": this._hoverStroke });
        },
        hoverOutNoFill: function() {
            highlightRange();
            this.attr({'stroke-width': this._swidth, "stroke": this._stroke });
        },
    });

    return Base;
}
