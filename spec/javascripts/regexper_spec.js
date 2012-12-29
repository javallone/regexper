define(['regexper'], function(Regexper) {
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

    });
});
