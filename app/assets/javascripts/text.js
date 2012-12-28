function Text(paper, text) {
  Element.call(this, paper);

  this._element = this._paper.text(0, 0, text);
  this._element.attr(Text.base_attrs);
}

Text.base_attrs = {
  'font-size': 12
}

extend(Text.prototype, Element.prototype, {
  position: function(x, y) {
    var dims = this.get_box();

    Element.prototype.position.call(this, x + dims.inner_width / 2, y + dims.inner_height / 2);
  }
});
