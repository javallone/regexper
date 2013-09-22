require 'spec_helper'

describe Regexper do

  describe ".parse" do

    it "returns a parsed regular expression" do
      Regexper.parse('test').should be_a(Treetop::Runtime::SyntaxNode)
    end

    context "invalid regular expressions" do

      it "raises an exception for an unclosed character class" do
        lambda { Regexper.parse('[abc') }.should raise_error
      end

      it "raises an exception for an unclosed sub-expression" do
        lambda { Regexper.parse('(test') }.should raise_error
      end

      it "raises an exception for a '*' with nothing to repeat" do
        lambda { Regexper.parse('*') }.should raise_error
      end

      it "raises an exception for a '+' with nothing to repeat" do
        lambda { Regexper.parse('+') }.should raise_error
      end

      it "raises an exception for a '?' with nothing to repeat" do
        lambda { Regexper.parse('?') }.should raise_error
      end

      it "raises an exception for '{}' syntax with nothing to repeat" do
        lambda { Regexper.parse('{1,2}') }.should raise_error
      end

      it "does not raise an exception for empty '{}' syntax" do
        lambda { Regexper.parse('x{}') }.should_not raise_error
      end

      it "does not raise an exception for leading whitespace on /.../ syntax" do
        lambda { Regexper.parse(' /test/') }.should_not raise_error
      end

      it "does not raise an exception for trailing whitespace on /.../ syntax" do
        lambda { Regexper.parse('/test/ ') }.should_not raise_error
      end

    end

  end

end
