require 'treetop'

module Regexper
  base_path = File.expand_path(File.dirname(__FILE__))

  Treetop.load(File.join(base_path, 'regexper_parser.treetop'))
  @@parser = RegexperParser.new

  def self.parse(data)
    tree = @@parser.parse(data)

    if tree.nil?
      raise Exception, "Parse error: #{@@parser.failure_reason} line=#{@@parser.failure_line}, column=#{@@parser.failure_column}"
    end

    return tree
  end
end

class Treetop::Runtime::SyntaxNode
  def describe
    if terminal?
      []
    else
      elements.map(&:describe).flatten
    end
  end
end

module Regexper
  module Regexp
    def describe
      result = [anchored_match.describe]

      unless alternate.text_value.blank?
        result << 'OR'
        result << alternate.regexp.describe
      end

      result
    end
  end

  module AnchorStart
    def describe
      ['AT THE BEGINNING OF THE LINE']
    end
  end

  module AnchorEnd
    def describe
      ['AT THE END OF THE LINE']
    end
  end

  module MatchRepetition
    def describe
      repetition_str = repetition.describe.flatten.join(' ')
      match_str = match.describe.flatten.join(' ')
      ["(#{match_str}) #{repetition_str}"]
    end
  end

  module Repetition
    def describe
      [repeat.describe, (greedy.text_value.length > 0 ? 'NON GREEDILY' : 'GREEDILY')]
    end
  end

  module RepeatAny
    def describe
      ['ZERO OR MORE TIMES']
    end
  end

  module RepeatRequired
    def describe
      ['ONE OR MORE TIMES']
    end
  end

  module RepeatOptional
    def describe
      ['ZERO OR ONE TIMES']
    end
  end

  module RepeatSpecFull
    def describe
      ["#{start.text_value} TO #{stop.text_value} TIMES"]
    end
  end

  module RepeatSpecUpTo
    def describe
      ["UP TO #{stop.text_value} TIMES"]
    end
  end

  module RepeatSpecAtLeast
    def describe
      ["AT LEAST #{start.text_value} TIMES"]
    end
  end

  module RepeatSpecExact
    def describe
      ["EXACTLY #{value.text_value} TIMES"]
    end
  end

  module MatchSubexp
    def describe
      ["(#{flag.describe.flatten.join(' ')} #{regexp.describe.flatten.join(' ')})"]
    end
  end

  module SubexpNoCapture
    def describe
      ['<<NO CAPTURE>>']
    end
  end

  module SubexpPositiveLookahead
    def describe
      ['<<POSITIVE LOOKAHEAD>>']
    end
  end

  module SubexpNegativeLookahead
    def describe
      ['<<NEGATIVE LOOKAHEAD>>']
    end
  end

  module MatchCharset
    def inverted?
      invert.text_value == '^'
    end

    def describe
      amount = (inverted? ? 'NONE' : 'ANY')
      ["#{amount} OF: {#{match_spec.describe.join(', ')}}"]
    end
  end

  module CharsetRange
    def describe
      ["#{start.text_value} THRU #{stop.text_value}"]
    end
  end

  module Literal
    def describe
      [text_value]
    end
  end

  module EscapedCharacter
    def describe
      puts(inspect)
      puts(escape.text_value)
      if escape.extension_modules.length == 0
        [escape.text_value]
      else
        ["<<#{escape.describe.join(' ')}>>"]
      end
    end
  end

  module AnyCharacter
    def describe
      ['ANY CHARACTER']
    end
  end

  module BackspaceCharacter
    def describe
      ['BACKSPACE']
    end
  end

  module WordBoundaryCharacter
    def describe
      ['WORD_BOUNDARY']
    end
  end

  module NonWordBoundaryCharacter
    def describe
      ['NON_WORD_BOUNDARY']
    end
  end

  module DigitCharacter
    def describe
      ['DIGIT']
    end
  end

  module NonDigitCharacter
    def describe
      ['NON_DIGIT']
    end
  end

  module FormFeedCharacter
    def describe
      ['FORM_FEED']
    end
  end

  module LineFeedCharacter
    def describe
      ['LINE_FEED']
    end
  end

  module CarriageReturnCharacter
    def describe
      ['CARRIAGE_RETURN']
    end
  end

  module WhiteSpaceCharacter
    def describe
      ['WHITE_SPACE']
    end
  end

  module NonWhiteSpaceCharacter
    def describe
      ['NON_WHITE_SPACE']
    end
  end

  module TabCharacter
    def describe
      ['TAB']
    end
  end

  module VerticalTabCharacter
    def describe
      ['VERTICAL_TAB']
    end
  end

  module WordCharacter
    def describe
      ['WORD']
    end
  end

  module NonWordCharacter
    def describe
      ['NON_WORD']
    end
  end

  module ControlCharacter
    def describe
      ["CTRL-#{code.text_value.upcase}"]
    end
  end

  module HexCharacter
    def describe
      ["0x#{code.text_value.upcase}"]
    end
  end

  module UnicodeCharacter
    def describe
      ["unicode(#{code.text_value.upcase})"]
    end
  end
end
