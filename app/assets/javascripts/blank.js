function Blank(paper, element) {
  Element.call(this, paper);

  this._reference = element;
}

extend(Blank.prototype, Element.prototype, {
  get_box: function() {
    var box = this._reference.get_box();

    this._width = box.width;
    this._height = box.height

    return Element.prototype.get_box.call(this);
  }
});
