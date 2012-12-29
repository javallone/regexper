function extend() {
  var i, key, obj = arguments[0];

  for (var i = 1; i < arguments.length; i++) {
    for (key in arguments[i]) {
      obj[key] = arguments[i][key];
    }
  }
}

function render(paper, structure) {
  var type = structure.type;

  if (typeof structure_renderers[type] !== 'undefined') {
    return structure_renderers[type](paper, structure);
  } else {
    return structure_renderers.error(paper, structure);
  }
}

var structure_renderers = {
  regexp: function(paper, structure) {
    var element, contents = [],
      i, e;

    for (i = 0; i < structure.content.length; i++) {
      e = render(paper, structure.content[i]);
      e.set_margin(10, 0);
      contents.push(e);
    }

    element = new VBox(paper, contents);

    if (contents.length > 1) {
      element = new SkipLine(paper, element);

      element._draw_paths = function() {
        var i,
          box = this.get_box(),
          content_box, midpoint;

        for (i = 0; i < this._paths.length; i++) {
          this._paths[i].remove();
        }

        // Lead in
        this._paths.push(this._paper.path(Raphael.fullfill("M{start},{middle}H{stop}", {
          start: box.x,
          middle: box.y + box.height / 2,
          stop: box.inner_x
        })));

        // Lead out
        this._paths.push(this._paper.path(Raphael.fullfill("M{start},{middle}H{stop}", {
          start: box.x + box.width,
          middle: box.y + box.height / 2,
          stop: box.inner_x + box.inner_width
        })));

        content_box = contents[0].get_box();
        this._paths.push(this._paper.path(Raphael.fullfill([
          "M{start},{middle}",
          "q{radius},0 {radius},-{radius}",
          "V{box_middle}"
        ].join(''), {
          start: box.inner_x,
          middle: box.y + box.height / 2,
          box_middle: content_box.y + content_box.height / 2 + SkipLine.curve_radius,
          radius: SkipLine.curve_radius
        })));

        this._paths.push(this._paper.path(Raphael.fullfill([
          "M{start},{middle}",
          "q-{radius},0 -{radius},-{radius}",
          "V{box_middle}"
        ].join(''), {
          start: box.inner_x + box.inner_width,
          middle: box.y + box.height / 2,
          box_middle: content_box.y + content_box.height / 2 + SkipLine.curve_radius,
          radius: SkipLine.curve_radius
        })));

        content_box = contents[contents.length - 1].get_box();
        this._paths.push(this._paper.path(Raphael.fullfill([
          "M{start},{middle}",
          "q{radius},0 {radius},{radius}",
          "V{box_middle}"
        ].join(''), {
          start: box.inner_x,
          middle: box.y + box.height / 2,
          box_middle: content_box.y + content_box.height / 2 - SkipLine.curve_radius,
          radius: SkipLine.curve_radius
        })));

        this._paths.push(this._paper.path(Raphael.fullfill([
          "M{start},{middle}",
          "q-{radius},0 -{radius},{radius}",
          "V{box_middle}"
        ].join(''), {
          start: box.inner_x + box.inner_width,
          middle: box.y + box.height / 2,
          box_middle: content_box.y + content_box.height / 2 - SkipLine.curve_radius,
          radius: SkipLine.curve_radius
        })));

        midpoint = (contents.length - 1) / 2;
        for (i = 0; i < contents.length; i++) {
          content_box = contents[i].get_box();
          if (i < midpoint) {
            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "q0,-{radius} {radius},-{radius}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x + SkipLine.curve_radius,
              middle: content_box.y + content_box.height / 2 + SkipLine.curve_radius,
              radius: SkipLine.curve_radius,
              stop: content_box.x
            })));

            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "q0,-{radius} -{radius},-{radius}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x + box.inner_width - SkipLine.curve_radius,
              middle: content_box.y + content_box.height / 2 + SkipLine.curve_radius,
              radius: SkipLine.curve_radius,
              stop: content_box.x + content_box.width
            })));
          } else if (i > midpoint) {
            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "q0,{radius} {radius},{radius}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x + SkipLine.curve_radius,
              middle: content_box.y + content_box.height / 2 - SkipLine.curve_radius,
              radius: SkipLine.curve_radius,
              stop: content_box.x
            })));

            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "q0,{radius} -{radius},{radius}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x + box.inner_width - SkipLine.curve_radius,
              middle: content_box.y + content_box.height / 2 - SkipLine.curve_radius,
              radius: SkipLine.curve_radius,
              stop: content_box.x + content_box.width
            })));
          } else {
            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x,
              middle: content_box.y + content_box.height / 2,
              stop: content_box.x
            })));

            this._paths.push(this._paper.path(Raphael.fullfill([
              "M{start},{middle}",
              "H{stop}"
            ].join(''), {
              start: box.inner_x + box.inner_width,
              middle: content_box.y + content_box.height / 2,
              stop: content_box.x + content_box.width
            })));
          }
        }

        for (i = 0; i < this._paths.length; i++) {
          this._paths[i].attr('stroke-width', SkipLine.stroke_width);
        }
      };
    }

    return element;
  },

  subexp: function(paper, structure) {
    // TODO: Capture types
    var element = structure_renderers.regexp(paper, structure),
      capture_desc, text, blank;

    switch (structure.kind) {
    case "no_capture":
      break;
    case "capture":
      capture_desc = "Group #" + structure.group;
      break;
    case "positive_lookahead":
      capture_desc = "Positive lookahead";
      break;
    case "negative_lookahead":
      capture_desc = "Negative lookahead";
      break;
    }

    if (capture_desc) {
      element = new BoundingBox(paper, element);
      element.attr({
        r: 3,
        'stroke-dasharray': '-',
        'stroke-width': 2,
        'stroke': '#a0a0a0'
      });

      text = new Text(paper, capture_desc);
      text.attr({
        'font-size': 10
      });

      blank = new Blank(paper, text);

      element = new VBox(paper, [text, element, blank]);
      element.set_alignment('left');
    }

    return element;
  },

  match: function(paper, structure) {
    var element, contents = [],
      i, e;

    if (structure.start) {
      e = new Text(paper, "Start of line");
      e.set_margin(5);
      e.attr({
        fill: '#ffffff'
      });
      e = new BoundingBox(paper, e);
      e.set_margin(0, 5);
      e.attr({
        r: 0,
        fill: '#6b6659',
        stroke: '#6b6659'
      });
      contents.push(e);
    }

    for (i = 0; i < structure.content.length; i++) {
      e = render(paper, structure.content[i]);
      e.set_margin(0, 5);
      contents.push(e);
    }

    if (structure.end) {
      e = new Text(paper, "End of line");
      e.set_margin(5);
      e.attr({
        fill: '#ffffff'
      });
      e = new BoundingBox(paper, e);
      e.set_margin(0, 5);
      e.attr({
        r: 0,
        fill: '#6b6659',
        stroke: '#6b6659'
      });
      contents.push(e);
    }

    element = new HBox(paper, contents);

    element._get_lines = function() {
      var i, start, stop, lines = [],
        content_box, box = this.get_box();

      start = box.x;

      for (i = 0; i < this._contents.length; i++) {
        content_box = this._contents[i].get_box();
        stop = content_box.inner_x;

        lines.push({
          start: start,
          stop: stop,
          middle: content_box.y + content_box.height / 2
        });

        start = content_box.inner_x + content_box.inner_width;
      }

      lines.push({
        start: start,
        stop: box.x + box.width,
        middle: content_box.y + content_box.height / 2
      });

      return lines;
    }

    element._draw_paths = function() {
      var i, lines = this._get_lines(),
        box = this.get_box();

      for (i = 0; i < this._paths.length; i++) {
        this._paths[i].remove();
      }

      for (i = 0; i < lines.length; i++) {
        this._paths.push(this._paper.path(Raphael.fullfill("M{start},{middle}H{stop}", lines[i])));
      }

      for (i = 0; i < this._paths.length; i++) {
        this._paths[i].attr('stroke-width', SkipLine.stroke_width);
      }
    };

    element.update = function() {
      HBox.prototype.update.call(this);
      this._draw_paths();
    };

    element.position = function(x, y) {
      HBox.prototype.position.call(this, x, y);
      this._draw_paths();
    };

    element._paths = [];
    element._draw_paths();

    return element;
  },

  repetition: function(paper, structure) {
    var element, repeat_count = structure.repeat_count,
      start, stop, text, blank, loop_desc;

    element = new SkipLine(paper, render(paper, structure.content));

    switch (repeat_count) {
    case "any":
      element.include_skip(true);
      element.include_loop(true);
      break;
    case "required":
      element.include_skip(false);
      element.include_loop(true);
      break;
    case "optional":
      element.include_skip(true);
      element.include_loop(false);
      break;
    default:
      if (typeof repeat_count.start !== 'undefined' || typeof repeat_count.stop !== 'undefined') {
        start = repeat_count.start || 0;
        stop = repeat_count.stop;

        element.include_skip(start === 0);
        element.include_loop(typeof stop === 'undefined' || stop > 1);

        if (element.include_loop()) {
          if (typeof stop === 'undefined') {
            loop_desc = "at least " + start + " times";
          } else if (start > 0) {
            loop_desc = start + "..." + stop;
          } else {
            loop_desc = "upto " + stop + " times";
          }
        }
      } else {
        element.include_skip(false);
        element.include_loop(true);
        loop_desc = repeat_count + " times";
      }
    }

    if (loop_desc) {
      text = new Text(paper, loop_desc);
      text.set_margin(0, SkipLine.curve_radius, 0, 0);
      text.attr({
        'font-size': 10
      });

      blank = new Blank(paper, text);

      element = new VBox(paper, [blank, element, text]);

      element.set_alignment("right");
    }

    return element;
  },

  charset: function(paper, structure) {
    var element, charset, text, blank,
      contents = [],
      i, e;

    for (i = 0; i < structure.content.length; i++) {
      e = render(paper, structure.content[i]);
      e.set_margin(5);
      contents.push(e);
    }

    charset = new BoundingBox(paper, new VBox(paper, contents));

    charset.attr({
      r: 3,
      fill: '#cbcbba',
      stroke: '#cbcbba'
    });

    text = new Text(paper, structure.inverted ? 'None of:' : 'One of:');
    text.attr({
      'font-size': 10
    });

    blank = new Blank(paper, text);

    element = new VBox(paper, [text, charset, blank]);

    element.set_alignment('left');

    return element;
  },

  range: function(paper, structure) {
    var element, dash;

    dash = new Text(paper, '-');
    element = new HBox(paper, [
      render(paper, structure.start),
      dash,
      render(paper, structure.stop)
    ]);

    dash.set_margin(0, 5);
    dash.attr({
      'font-weight': 'bold'
    });

    return element;
  },

  literal: function(paper, structure) {
    var element, text;

    text = new Text(paper, Raphael.fullfill("\"{content}\"", structure));
    element = new BoundingBox(paper, text);

    element.attr({
      r: 3,
      fill: '#dae9e5',
      stroke: '#dae9e5'
    });

    text.set_margin(5);

    return element;
  },

  any_character: function(paper, structure) {
    var element, text;

    text = new Text(paper, "any character");
    element = new BoundingBox(paper, text);

    element.attr({
      r: 0,
      fill: '#6b6659',
      stroke: '#6b6659',
    });

    text.set_margin(5);
    text.attr({
      fill: '#ffffff'
    });

    return element;
  },

  escaped: function(paper, structure) {
    var element, text;

    text = new Text(paper, structure.content);
    if (typeof structure.content.type !== 'undefined') {
      switch (structure.content.type) {
      case 'control':
        text.attr('text', Raphael.fullfill("Ctrl-{content.code}", structure));
        break;
      case 'hex':
        text.attr('text', Raphael.fullfill("0x{content.code}", structure));
        break;
      case 'unicode':
        text.attr('text', Raphael.fullfill("U+{content.code}", structure));
        break;
      default:
        text.attr('text', Raphael.fullfill("Don't understand escaped character type '{content.type}'", structure));
      }
    }
    element = new BoundingBox(paper, text);

    element.attr({
      r: 3,
      fill: '#bada55',
      stroke: '#bada55',
    });

    text.set_margin(5);

    return element;
  },

  error: function(paper, structure) {
    var element, text;

    console.error("Don't know how to render:", structure);

    text = new Text(paper, Raphael.fullfill("Don't know how to render '{type}'", structure))
    element = new BoundingBox(paper, text);

    element.attr({
      fill: '#fa7a55',
      stroke: '#fa7a55',
    });

    text.set_margin(5);

    return element;
  }
};
