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

    });
});
