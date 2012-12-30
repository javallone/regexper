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

            it('creates a text element', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(paper.text).toHaveBeenCalled();
            });

            //it('sets the text of the text element to the content of the escaped surrounded by quotes', function() {
            //    var escaped = new Escaped(paper, structure('Test'));

            //    expect(escaped._text.attrs.text).toEqual('"Test"');
            //});

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

            it('creates a rect element', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(paper.rect).toHaveBeenCalled();
            });

            it('sets the dimensions of the rect to be the dimensions of the text plus a margin', function() {
                var escaped = new Escaped(paper, structure('Test')),
                    text_box = escaped._text.getBBox();
                    rect_box = escaped._rect.getBBox();

                expect(rect_box.width).toEqual(text_box.width + 10);
                expect(rect_box.height).toEqual(text_box.height + 10);
            });

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

        describe('.position', function() {

            it('sets the position of the rect to the given coordinates', function() {
                var escaped = new Escaped(paper, structure('Test'));

                escaped.position(10, 20);

                expect(escaped._rect.attrs.x).toEqual(10);
                expect(escaped._rect.attrs.y).toEqual(20);
            });

            it('sets the position of the text to be centered in the rect', function() {
                var escaped = new Escaped(paper, structure('Test')),
                    text_box, rect_box;

                escaped.position(10, 20);

                text_box = escaped._text.getBBox();
                rect_box = escaped._rect.getBBox();

                expect(text_box.x + text_box.width / 2).toEqual(rect_box.x + rect_box.width / 2);
                expect(text_box.y + text_box.height / 2).toEqual(rect_box.y + rect_box.height / 2);
            });

        });

        describe('.get_box', function() {

            it('returns the rect element\'s bounding box', function() {
                var escaped = new Escaped(paper, structure('Test'));

                expect(escaped.get_box()).toEqual(escaped._rect.getBBox());
            });

        });

    });
});
