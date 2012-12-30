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

    });
});
