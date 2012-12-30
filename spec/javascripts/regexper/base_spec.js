define(['regexper/base', 'mock/element'], function(Base, Element) {
    describe('Base', function() {

        it('sets the _stack_order to an empty array', function() {
            var base = new Base();

            expect(base._stack_order).toEqual([]);
        });

        describe('.position', function() {

            it('throws an exception', function() {
                var base = new Base();

                expect(function() {
                    base.position(0, 0);
                }).toThrow('position method is not defined');
            });

        });

        describe('.stack', function() {

            it('insert the first element in the stack order after the element passed in', function() {
                var base = new Base(),
                    element = new Element();

                base._stack_order = [new Element()];

                spyOn(base._stack_order[0], 'insertAfter');

                base.stack(element);

                expect(base._stack_order[0].insertAfter).toHaveBeenCalledWith(element);
            });

            it('does not insert the first element in the stack order if no element is passed in', function() {
                var base = new Base();

                base._stack_order = [new Element()];

                spyOn(base._stack_order[0], 'insertAfter');

                base.stack();

                expect(base._stack_order[0].insertAfter).not.toHaveBeenCalled();
            });

            it('inserts subsequent elements in the stack order after the previous', function() {
                var base = new Base();

                base._stack_order = [new Element(), new Element(), new Element()];

                spyOn(base._stack_order[1], 'insertAfter');
                spyOn(base._stack_order[2], 'insertAfter');

                base.stack();

                expect(base._stack_order[1].insertAfter).toHaveBeenCalledWith(base._stack_order[0]);
                expect(base._stack_order[2].insertAfter).toHaveBeenCalledWith(base._stack_order[1]);
            });

        });

        describe('.get_box', function() {

            it('throws an exception', function() {
                var base = new Base();

                expect(function() {
                    base.get_box();
                }).toThrow('get_box method is not defined');
            });

        });

        describe('.get_connections', function() {

            it('returns the left and right connection points', function() {
                var base = new Base(),
                    box = {
                        x: 10,
                        y: 20,
                        x2: 60,
                        y2: 120,
                        width: 50,
                        height: 100
                    };

                base.get_box = function() { return box; };

                expect(base.get_connections()).toEqual({
                    left: { x: box.x, y: box.y + box.height / 2 },
                    right: { x: box.x2, y: box.y + box.height / 2 }
                });
            });

        });

    });
});
