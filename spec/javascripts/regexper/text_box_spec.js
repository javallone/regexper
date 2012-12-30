define(['regexper/text_box', 'mock/paper'], function(TextBox, Paper) {
    var paper;

    describe('TextBox', function() {

        beforeEach(function() {
            paper = new Paper();
        });

        describe('text element', function() {

            it('creates a text element', function() {
                var text_box = new TextBox(paper, 'Test', {}, {});

                expect(paper.text).toHaveBeenCalled();
            });

            it('sets the text of the text element to the label argument', function() {
                var text_box = new TextBox(paper, 'Test', {}, {});

                expect(text_box._text.attrs.text).toEqual('Test');
            });

            it('sets the provided text_attrs on the text element', function() {
                var text_box = new TextBox(paper, 'Test', { test: 'example' }, {});

                expect(text_box._text.attrs.test).toEqual('example');
            });

        });

        describe('rect element', function() {

            it('creates a rect element', function() {
                var text_box = new TextBox(paper, 'Test', {}, {});

                expect(paper.rect).toHaveBeenCalled();
            });

            it('sets the dimensions of the rect to be the dimensions of the text plus a margin', function() {
                var text_box = new TextBox(paper, 'Test', {}, {}),
                    text_bounds = text_box._text.getBBox();
                    rect_bounds = text_box._rect.getBBox();

                expect(rect_bounds.width).toEqual(text_bounds.width + 10);
                expect(rect_bounds.height).toEqual(text_bounds.height + 10);
            });

            it('sets the provided rect_attrs on the rect element', function() {
                var text_box = new TextBox(paper, 'Test', {}, { test: 'example' });

                expect(text_box._rect.attrs.test).toEqual('example');
            });

        });

        describe('.position', function() {

            it('sets the position of the rect to the given coordinates', function() {
                var text_box = new TextBox(paper, 'Test', {}, {});

                text_box.position(10, 20);

                expect(text_box._rect.attrs.x).toEqual(10);
                expect(text_box._rect.attrs.y).toEqual(20);
            });

            it('sets the position of the text to be centered in the rect', function() {
                var text_box = new TextBox(paper, 'Test', {}, {}),
                    text_bounds, rect_bounds;

                text_box.position(10, 20);

                text_bounds = text_box._text.getBBox();
                rect_bounds = text_box._rect.getBBox();

                expect(text_bounds.x + text_bounds.width / 2).toEqual(rect_bounds.x + rect_bounds.width / 2);
                expect(text_bounds.y + text_bounds.height / 2).toEqual(rect_bounds.y + rect_bounds.height / 2);
            });

        });

        describe('.get_box', function() {

            it('returns the rect element\'s bounding box', function() {
                var text_box = new TextBox(paper, 'Test', {}, {});

                expect(text_box.get_box()).toEqual(text_box._rect.getBBox());
            });

        });

    });
});
