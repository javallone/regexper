define(['regexper/any_character', 'mock/paper'], function(AnyCharacter, Paper) {
    var paper;

    function structure() {
        return {
            type: 'any_character'
        };
    }

    describe('AnyCharacter', function() {

        beforeEach(function() {
            paper = new Paper();
        });

        it('sets the stack order', function() {
            var any_character = new AnyCharacter(paper, structure());

            expect(any_character._stack_order).toEqual([any_character._rect, any_character._text]);
        });

        describe('text element', function() {

            it('creates a text element', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(paper.text).toHaveBeenCalled();
            });

            it('sets the text of the text element to the content of the any_character surrounded by quotes', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character._text.attrs.text).toEqual('any character');
            });

            it('sets the font-size of the text element', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character._text.attrs['font-size']).toEqual(12);
            });

            it('sets the color of the text element', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character._text.attrs.fill).toEqual('#ffffff');
            });

        });

        describe('rect element', function() {

            it('creates a rect element', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(paper.rect).toHaveBeenCalled();
            });

            it('sets the dimensions of the rect to be the dimensions of the text plus a margin', function() {
                var any_character = new AnyCharacter(paper, structure()),
                    text_box = any_character._text.getBBox();
                    rect_box = any_character._rect.getBBox();

                expect(rect_box.width).toEqual(text_box.width + 10);
                expect(rect_box.height).toEqual(text_box.height + 10);
            });

            it('sets the corner radius of the rect', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character._rect.attrs.r).toEqual(0);
            });

            it('sets the fill and stroke of the rect', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character._rect.attrs.fill).toEqual('#6b6659');
                expect(any_character._rect.attrs.stroke).toEqual('#6b6659');
            });

        });

        describe('.position', function() {

            it('sets the position of the rect to the given coordinates', function() {
                var any_character = new AnyCharacter(paper, structure());

                any_character.position(10, 20);

                expect(any_character._rect.attrs.x).toEqual(10);
                expect(any_character._rect.attrs.y).toEqual(20);
            });

            it('sets the position of the text to be centered in the rect', function() {
                var any_character = new AnyCharacter(paper, structure()),
                    text_box, rect_box;

                any_character.position(10, 20);

                text_box = any_character._text.getBBox();
                rect_box = any_character._rect.getBBox();

                expect(text_box.x + text_box.width / 2).toEqual(rect_box.x + rect_box.width / 2);
                expect(text_box.y + text_box.height / 2).toEqual(rect_box.y + rect_box.height / 2);
            });

        });

        describe('.get_box', function() {

            it('returns the rect element\'s bounding box', function() {
                var any_character = new AnyCharacter(paper, structure());

                expect(any_character.get_box()).toEqual(any_character._rect.getBBox());
            });

        });

    });
});
