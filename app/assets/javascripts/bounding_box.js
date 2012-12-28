function BoundingBox(paper, element) {
  var box;

  Container.call(this, paper, [element]);

  box = this._contents[0].get_box();
  this._element = this._paper.rect(box.x, box.y, box.width, box.height);
}

extend(BoundingBox.prototype, Container.prototype, {
  position: function(x, y) {
    Container.prototype.position.call(this, x, y);
    var box = this.get_box();
    this._contents[0].position(box.inner_x, box.inner_y);
  },

  update: function() {
    this._element.attr(this._contents[0].get_box());
    Container.prototype.update.call(this);
  }
});
