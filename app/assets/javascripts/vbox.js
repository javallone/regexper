function VBox(paper, contents) {
  Container.call(this, paper, contents);

  this._alignment = 'center';

  this._update_positions();
  this._update_dimensions();
}

extend(VBox.prototype, Container.prototype, {
  _update_positions: function() {
    var dims, content_dims, y_pos, i;

    dims = this.get_box();
    y_pos = dims.y + this._margin.top;
    for (i = 0; i < this._contents.length; i++) {
      content_dims = this._contents[i].get_box();

      switch (this._alignment) {
      case 'left':
        this._contents[i].position(dims.inner_x, y_pos);
        break;
      case 'center':
        this._contents[i].position(dims.inner_x + dims.inner_width / 2 - content_dims.width / 2, y_pos);
        break;
      case 'right':
        this._contents[i].position(dims.inner_x + dims.inner_width - content_dims.width, y_pos);
        break;
      }

      y_pos += content_dims.height;
    }
  },

  _update_dimensions: function() {
    var content_dims, i;

    this._width = 0;
    this._height = 0;
    for (i = 0; i < this._contents.length; i++) {
      content_dims = this._contents[i].get_box();

      this._width = Math.max(this._width, content_dims.width);
      this._height += content_dims.height;
    }
  },

  update: function() {
    this._update_positions();
    this._update_dimensions();

    Container.prototype.update.call(this);
  },

  position: function(x, y) {
    Container.prototype.position.call(this, x, y);
    this._update_positions();
  },

  set_alignment: function(alignment) {
    this._alignment = alignment;
  }
});
