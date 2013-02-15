getRenderer = function() {
    var base_path_attrs = {
            'stroke-width': 2
        },
        base_anchor_attrs = {
            fill: '#6b6659',
            'stroke-width': 2
        };

    var Regexper = {
        extend: function(target) {
            var i, key;

            for (i = 1; i < arguments.length; i++) {
                for (key in arguments[i]) {
                    target[key] = arguments[i][key];
                }
            }
        },

        draw: function(paper_container, data, complete) {
            var self = this;
            Raphael(paper_container, 2, 2, function() {
                var paper = this;

                Regexper.render(paper, data.structure, function(expression) {
                    var box, offset,
                        x = 20,
                        y = 10;

                    expression.stack();
                    expression.position(20, 10);

                    box = expression.get_box();
                    offset = expression.get_connection_offset();

                    var start = Regexper.draw_anchor(paper, 10, box.y + offset, box.x);
                    var end = Regexper.draw_anchor(paper, box.x2 + 10, box.y + offset, box.x2);

                    start._range = [0,0];
                    start.hover(self.hoverIn, self.hoverOut, start, start);
                    console.log(data.structure);
                    end._range = [data.structure.range[1],data.structure.range[1]];
                    end.hover(self.hoverIn, self.hoverOut, end, end);

                    paper.setSize(box.width + 40, box.height + 20);

                    complete();
                });
            });
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

        draw_anchor: function(paper, x, y, connection) {
            paper.path(Raphael.fullfill('M{start.x},{start.y}H{end}', {
                start: {
                    x: x,
                    y: y
                },
                end: connection
            })).attr(base_path_attrs);

            return paper.circle(x, y, 5).attr(base_anchor_attrs);
        },

        render: function(paper, structure, complete) {
            var module_name = structure.type;

            var Module = modules[module_name];
            var module = new Module(paper, structure);
            module.complete(function() {
                complete(module);
            });
        },

        render_contents: function(paper, contents, complete) {
            function content_complete(index) {
                return function(element) {
                    result[index] = element;
                    count--;

                    if (count === 0) {
                        complete(result);
                    }
                }
            }

            var i,
                count = contents.length,
                result = [];

            if (count === 0) {
                complete(result);
            }

            for (i = 0; i < contents.length; i++) {
                Regexper.render(paper, contents[i], content_complete(i));
            }
        }
    };

    return Regexper;
}
