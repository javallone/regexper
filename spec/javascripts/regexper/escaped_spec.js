define(['regexper/escaped', 'mock/paper'], function(Escaped, Paper) {
    var paper;

    function structure(content) {
        return {
            type: 'escaped',
            content: content
        };
    }

    describe('Escaped', function() {

        beforeEach(function() {
            paper = new Paper();
        });

        it('sets the stack order', function() {
            var escaped = new Escaped(paper, structure('Test'));

            expect(escaped._stack_order).toEqual([escaped._rect, escaped._text]);
        });

        describe('text element', function() {

            it('sets the font-size of the text element', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(escaped._text.attrs['font-size']).toEqual(12);
            });

            describe('un-typed escapes', function() {

                it('sets the text of text element to the content of the escape', function() {
                    var escaped = new Escaped(paper, structure('Test'));

                    expect(escaped._text.attrs.text).toEqual('Test');
                });

            });

            describe('control character escapes', function() {

                it('sets the text of the text element to "Ctrl-" followed by the code', function() {
                    var escaped = new Escaped(paper, structure({
                        type: 'control',
                        code: 'A'
                    }));

                    expect(escaped._text.attrs.text).toEqual('Ctrl-A');
                });

            });

            describe('hex escapes', function() {

                it('sets the text of the text element to "0x" followed by the code', function() {
                    var escaped = new Escaped(paper, structure({
                        type: 'hex',
                        code: '1F'
                    }));

                    expect(escaped._text.attrs.text).toEqual('0x1F');
                });

            });

            describe('unicode escapes', function() {

                it('sets the text of the text element to "U+" followed by the code', function() {
                    var escaped = new Escaped(paper, structure({
                        type: 'unicode',
                        code: '1F2E'
                    }));

                    expect(escaped._text.attrs.text).toEqual('U+1F2E');
                });

            })

        });

        describe('rect element', function() {

            it('sets the corner radius of the rect', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(escaped._rect.attrs.r).toEqual(3);
            });

            it('sets the fill and stroke of the rect', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(escaped._rect.attrs.fill).toEqual('#bada55');
                expect(escaped._rect.attrs.stroke).toEqual('#bada55');
            });

        });

    });
});
