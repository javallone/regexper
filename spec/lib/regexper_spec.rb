require 'spec_helper'

describe Regexper do

  describe ".parse" do

    it "returns a parsed regular expression" do
      Regexper.parse('test').should be_a(Treetop::Runtime::SyntaxNode)
    end

  end

end
