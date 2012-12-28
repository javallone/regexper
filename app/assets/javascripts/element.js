function Element(paper) {
  this._paper = paper;
  this._x = 0;
  this._y = 0;
  this._width = 0;
  this._height = 0;
  this._margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

extend(Element.prototype, {
  stack: function() {
    var parent_element;

    if (this._parent) {
      parent_element = this._parent.get_element();

      if (parent_element && this._element) {
        this._element.insertAfter(parent_element);
      }
    }
  },

  update: function() {
    if (this._parent) {
      this._parent.update();
    }
  },

  position: function(x, y) {
    if (this._element) {
      this._element.attr({
        x: x + this._margin.left,
        y: y + this._margin.top
      });
    } else {
      this._x = x;
      this._y = y;
    }
  },

  attr: function() {
    if (this._element) {
      this._element.attr.apply(this._element, arguments);
    }
    this.update();
  },

  set_margin: function() {
    var box = this.get_box();

    if (arguments.length === 1) {
      this._margin.top = arguments[0];
      this._margin.right = arguments[0];
      this._margin.bottom = arguments[0];
      this._margin.left = arguments[0];
    } else if (arguments.length === 2) {
      this._margin.top = arguments[0];
      this._margin.bottom = arguments[0];
      this._margin.left = arguments[1];
      this._margin.right = arguments[1];
    } else if (arguments.length === 4) {
      this._margin.top = arguments[0];
      this._margin.right = arguments[1];
      this._margin.bottom = arguments[2];
      this._margin.left = arguments[3];
    }

    this.position(box.x, box.y);
    this.update()
  },

  get_element: function() {
    if (this._element) {
      return this._element;
    } else if (this._parent) {
      return this._parent.get_element();
    }
  },

  get_box: function() {
    if (this._element) {
      var bbox = this._element.getBBox(),
        x = this._element.attr('x'),
        y = this._element.attr('y');

      return {
        x: x - this._margin.left,
        y: y - this._margin.top,
        width: bbox.width + this._margin.left + this._margin.right,
        height: bbox.height + this._margin.top + this._margin.bottom,
        inner_x: x,
        inner_y: y,
        inner_width: bbox.width,
        inner_height: bbox.height
      };
    } else {
      return {
        x: this._x,
        y: this._y,
        width: this._width + this._margin.left + this._margin.right,
        height: this._height + this._margin.top + this._margin.bottom,
        inner_x: this._x + this._margin.left,
        inner_y: this._y + this._margin.top,
        inner_width: this._width,
        inner_height: this._height
      };
    }
  }
});
