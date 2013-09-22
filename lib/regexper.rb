require 'treetop'
require 'regexper/modules'

module Regexper
  class ParseError < Exception; end

  base_path = File.expand_path(File.dirname(__FILE__))

  Treetop.load(File.join(base_path, 'regexper_parser.treetop'))
  @@parser = RegexperParser.new

  def self.parse(data)
    tree = @@parser.parse(data.gsub(/^\s+(?=\/)/, '').gsub(/\/\s+/, '/'))

    if tree.nil?
      raise ParseError, @@parser.failure_reason
    end

    Subexp.class_variable_set(:@@capture_group, 1)
    tree.to_obj # Set capture groups

    return tree
  end
end
