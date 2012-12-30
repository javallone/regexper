define(['regexper/literal', 'mock/paper', 'mock/element'], function(Literal, Paper, Element) {
    var paper;

    function structure(content) {
        return {
            type: 'literal',
            content: content
        };
    }

    describe('Literal', function() {

        beforeEach(function() {
            paper = new Paper();
        });

        describe('text element', function() {

            it('creates a text element', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(paper.text).toHaveBeenCalled();
            });

            it('sets the text of the text element to the content of the literal surrounded by quotes', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal._text.attrs.text).toEqual('"Test"');
            });

            it('sets the font-size of the text element', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal._text.attrs['font-size']).toEqual(12);
            });

        });

        describe('rect element', function() {

            it('creates a rect element', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(paper.rect).toHaveBeenCalled();
            });

            it('sets the dimensions of the rect to be the dimensions of the text plus a margin', function() {
                var literal = new Literal(paper, structure('Test')),
                    text_box = literal._text.getBBox();
                    rect_box = literal._rect.getBBox();

                expect(rect_box.width).toEqual(text_box.width + 10);
                expect(rect_box.height).toEqual(text_box.height + 10);
            });

            it('sets the corner radius of the rect', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal._rect.attrs.r).toEqual(3);
            });

            it('sets the fill and stroke of the rect', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal._rect.attrs.fill).toEqual('#dae9e5');
                expect(literal._rect.attrs.stroke).toEqual('#dae9e5');
            });

        });

        describe('.position', function() {

            it('sets the position of the rect to the given coordinates', function() {
                var literal = new Literal(paper, structure('Test'));

                literal.position(10, 20);

                expect(literal._rect.attrs.x).toEqual(10);
                expect(literal._rect.attrs.y).toEqual(20);
            });

            it('sets the position of the text to be centered in the rect', function() {
                var literal = new Literal(paper, structure('Test')),
                    text_box, rect_box;

                literal.position(10, 20);

                text_box = literal._text.getBBox();
                rect_box = literal._rect.getBBox();

                expect(text_box.x + text_box.width / 2).toEqual(rect_box.x + rect_box.width / 2);
                expect(text_box.y + text_box.height / 2).toEqual(rect_box.y + rect_box.height / 2);
            });

        });

        describe('.stack', function() {

            it('inserts the rect element after the element passed in', function() {
                var literal = new Literal(paper, structure('Test')),
                    element = new Element({});

                spyOn(literal._rect, 'insertAfter');

                literal.stack(element);

                expect(literal._rect.insertAfter).toHaveBeenCalledWith(element);
            });

            it('inserts the text element after the rect element', function() {
                var literal = new Literal(paper, structure('Test')),
                    element = new Element({});

                spyOn(literal._text, 'insertAfter');

                literal.stack(element);

                expect(literal._text.insertAfter).toHaveBeenCalledWith(literal._rect);
            });

            it('does not reposition the rect element if element is passed in', function() {
                var literal = new Literal(paper, structure('Test'));

                spyOn(literal._rect, 'insertAfter');
                spyOn(literal._text, 'insertAfter');

                literal.stack(element);

                expect(literal._rect.insertAfter).not.toHaveBeenCalled();
                expect(literal._text.insertAfter).toHaveBeenCalledWith(literal._rect);
            });

        });

        describe('.get_box', function() {

            it('returns the rect element\'s bounding box', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal.get_box()).toEqual(literal._rect.getBBox());
            });

        });

        describe('.get_connections', function() {

            it('returns the left and right connection points', function() {
                var literal = new Literal(paper, structure('Test')),
                    box;

                literal.position(0, 0);
                box = literal.get_box();

                expect(literal.get_connections()).toEqual({
                    left: { x: box.x, y: box.y + box.height / 2 },
                    right: { x: box.x2, y: box.y + box.height / 2 }
                });
            });

        });

    });
});
