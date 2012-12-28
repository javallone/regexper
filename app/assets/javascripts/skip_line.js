function SkipLine(paper, element) {
  Container.call(this, paper, [element]);

  this._paths = [];
  this._include_skip = true;
  this._include_loop = true;

  this._update_dimensions();
  this._draw_paths();
}

SkipLine.curve_radius = 10;
SkipLine.stroke_width = 2;

extend(SkipLine.prototype, Container.prototype, {
  _draw_paths: function() {
    var i,
      box = this.get_box(),
      content_box = this._contents[0].get_box();

    for (i = 0; i < this._paths.length; i++) {
      this._paths[i].remove();
    }

    // Lead in
    this._paths.push(this._paper.path(Raphael.fullfill("M{start},{middle}H{stop}", {
      start: box.x,
      middle: box.y + box.height / 2,
      stop: content_box.inner_x
    })));

    // Lead out
    this._paths.push(this._paper.path(Raphael.fullfill("M{start},{middle}H{stop}", {
      start: box.x + box.width,
      middle: box.y + box.height / 2,
      stop: content_box.inner_x + content_box.inner_width
    })));

    // Skip line
    if (this._include_skip) {
      this._paths.push(this._paper.path(Raphael.fullfill([
        "M{start},{middle}",
        "q{radius},0 {radius},-{radius}",
        "v-{height}",
        "q0,-{radius} {radius},-{radius}",
        "h{width}",
        "q{radius},0 {radius},{radius}",
        "v{height}",
        "q0,{radius} {radius},{radius}"
      ].join(''), {
        start: box.inner_x,
        middle: box.y + box.height / 2,
        radius: SkipLine.curve_radius,
        height: content_box.height / 2 - SkipLine.curve_radius,
        width: content_box.width
      })));
    }

    // Loop line
    if (this._include_loop) {
      this._paths.push(this._paper.path(Raphael.fullfill([
        "M{start},{middle}",
        "q-{radius},0 -{radius},{radius}",
        "v{height}",
        "q0,{radius} {radius},{radius}",
        "h{width}",
        "q{radius},0 {radius},-{radius}",
        "v-{height}",
        "q0,-{radius} -{radius},-{radius}"
      ].join(''), {
        start: box.inner_x + SkipLine.curve_radius * 2,
        middle: box.y + box.height / 2,
        radius: SkipLine.curve_radius,
        height: content_box.height / 2 - SkipLine.curve_radius,
        width: content_box.width
      })));
    }

    for (i = 0; i < this._paths.length; i++) {
      this._paths[i].attr('stroke-width', SkipLine.stroke_width);
    }
  },

  _update_dimensions: function() {
    var box = this._contents[0].get_box();
    this._width = box.width + 4 * SkipLine.curve_radius;
    this._height = box.height + 2 * SkipLine.curve_radius;
  },

  position: function(x, y) {
    Container.prototype.position.call(this, x, y);

    var box = this.get_box();
    this._contents[0].position(box.inner_x + 2 * SkipLine.curve_radius, box.inner_y + SkipLine.curve_radius);

    this._draw_paths();
  },

  update: function() {
    this._update_dimensions();
    this._draw_paths();

    Container.prototype.update.call(this);
  },

  include_skip: function(include) {
    if (typeof include === 'undefined') {
      return this._include_skip;
    }

    this._include_skip = include;
    this._draw_paths();
  },

  include_loop: function(include) {
    if (typeof include === 'undefined') {
      return this._include_loop;
    }

    this._include_loop = include;
    this._draw_paths();
  }
});
