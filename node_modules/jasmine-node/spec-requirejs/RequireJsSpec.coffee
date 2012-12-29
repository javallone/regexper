require [ "requirejs.sut" ], (sut) ->
  describe "RequireJs basic tests with spec in CoffeeScript", ->
    it "should load javascript sut", ->
      expect(sut.name).toBe "Subject To Test"
      expect(sut.method(2)).toBe 3
