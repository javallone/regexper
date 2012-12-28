function Container(paper, contents) {
  var i;

  Element.call(this, paper);

  this._contents = contents || [];

  for (i = 0; i < this._contents.length; i++) {
    this._contents[i]._parent = this;
  }
}

extend(Container.prototype, Element.prototype, {
  stack: function() {
    var i;

    Element.prototype.stack.call(this);

    for (i = 0; i < this._contents.length; i++) {
      this._contents[i].stack();
    }
  }
});
