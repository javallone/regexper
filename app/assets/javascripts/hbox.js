function HBox(paper, contents) {
  Container.call(this, paper, contents);

  this._alignment = 'center';

  this._update_positions();
  this._update_dimensions();
}

extend(HBox.prototype, Container.prototype, {
  _update_positions: function() {
    var dims, content_dims, x_pos, i;

    dims = this.get_box();
    x_pos = dims.x + this._margin.left;
    for (i = 0; i < this._contents.length; i++) {
      content_dims = this._contents[i].get_box();

      switch (this._alignment) {
      case 'top':
        this._contents[i].position(x_pos, dims.inner_y);
        break;
      case 'center':
        this._contents[i].position(x_pos, dims.inner_y + dims.inner_height / 2 - content_dims.height / 2);
        break;
      case 'bottom':
        this._contents[i].position(x_pos, dims.inner_y + dims.inner_height - content_dims.height);
      }

      x_pos += content_dims.width;
    }
  },

  _update_dimensions: function() {
    var content_dims, i;

    this._width = 0;
    this._height = 0;
    for (i = 0; i < this._contents.length; i++) {
      content_dims = this._contents[i].get_box();

      this._width += content_dims.width;
      this._height = Math.max(this._height, content_dims.height);
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
