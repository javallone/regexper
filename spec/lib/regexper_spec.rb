require 'spec_helper'
require 'regexper'

describe Regexper do

  describe ".parse" do

    it "returns a parsed regular expression" do
      Regexper.parse('test').should be_a(Treetop::Runtime::SyntaxNode)
    end

  end

end
