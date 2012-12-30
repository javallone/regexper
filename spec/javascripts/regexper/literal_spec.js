define(['regexper/literal', 'mock/paper'], function(Literal, Paper) {
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

        it('sets the stack order', function() {
            var literal = new Literal(paper, structure('Test'));

            expect(literal._stack_order).toEqual([literal._rect, literal._text]);
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

        describe('.get_box', function() {

            it('returns the rect element\'s bounding box', function() {
                var literal = new Literal(paper, structure('Test'));

                expect(literal.get_box()).toEqual(literal._rect.getBBox());
            });

        });

    });
});
