define(['regexper', 'regexper/literal', 'mock/paper'], function(Regexper, Literal, Paper) {
    describe('Regexper', function() {

        describe('.extend', function() {

            it('merges the properties from its second argument into its first', function() {
                var objA = { attrA: 'valueA' },
                    objB = { attrB: 'valueB' };

                Regexper.extend(objA, objB);

                expect(objA).toEqual({
                    attrA: 'valueA',
                    attrB: 'valueB'
                });
            });

            it('merges the properties from subsequent arguments into the first', function() {
                var objA = { attrA: 'valueA' },
                    objB = { attrB: 'valueB' },
                    objC = { attrC: 'valueC' };

                Regexper.extend(objA, objB, objC);

                expect(objA).toEqual({
                    attrA: 'valueA',
                    attrB: 'valueB',
                    attrC: 'valueC'
                });
            });

            it('uses the value from the last argument for conflicting property names', function() {
                var objA = { attr: 'valueA' },
                    objB = { attr: 'valueB' },
                    objC = { attr: 'valueC' };

                Regexper.extend(objA, objB, objC);

                expect(objA).toEqual({
                    attr: 'valueC'
                });
            });

        });

        describe('.render', function() {

            it('calls the complete function with the constructed object', function(done) {
                var paper = new Paper();

                Regexper.render(paper, {
                    type: 'literal',
                    content: 'Test'
                }, function(element) {
                    expect(element.constructor).toEqual(Literal);
                    expect(element._text.attrs.text).toEqual('"Test"');
                    expect(paper.text).toHaveBeenCalled();
                    expect(paper.rect).toHaveBeenCalled();
                    done();
                });
            });

        });

    });
});
