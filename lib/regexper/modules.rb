module Regexper
  module Regexp
    def content
      if alternate.empty?
        [match]
      else
        [match] + alternate.regexp.content
      end
    end

    def to_obj
      {
        :type => :regexp,
        :content => content.map(&:to_obj)
      }
    end
  end

  module Match
    def anchor_start?
      !anchor_start.empty?
    end

    def anchor_end?
      !anchor_end.empty?
    end

    def content
      match.elements
    end

    def to_obj
      clean_content = []
      content.map(&:to_obj).each do |element|
        if !clean_content.last.nil? && clean_content.last[:type] == :literal && element[:type] == :literal
          clean_content << {
            :type => :literal,
            :content => "#{clean_content.pop[:content]}#{element[:content]}"
          }
        else
          clean_content << element
        end
      end

      {
        :type => :match,
        :start => anchor_start?,
        :end => anchor_end?,
        :content => clean_content
      }
    end
  end

  module MatchRepetition
    def content
      match
    end

    def to_obj
      {
        :type => :repetition,
        :repeat_count => repetition.count,
        :greedy => repetition.greedy?,
        :content => content.to_obj
      }
    end
  end

  module Repetition
    def greedy?
      greedy.empty?
    end

    def count
      repeat.count
    end
  end

  module RepeatAny
    def count
      :any
    end
  end

  module RepeatRequired
    def count
      :required
    end
  end

  module RepeatOptional
    def count
      :optional
    end
  end

  module RepeatSpecFull
    def count
      { :start => start.text_value.to_i, :stop => stop.text_value.to_i }
    end
  end

  module RepeatSpecUpTo
    def count
      { :stop => stop.text_value.to_i }
    end
  end

  module RepeatSpecAtLeast
    def count
      { :start => start.text_value.to_i }
    end
  end

  module RepeatSpecExact
    def count
      value.text_value.to_i
    end
  end

  module MatchSubexp
    def content
      regexp.content
    end

    def to_obj
      {
        :type => :subexp,
        :flag => flag.empty? ? :capture : flag.to_sym,
        :content => content.map(&:to_obj)
      }
    end
  end

  module SubexpNoCapture
    def to_sym
      :no_capture
    end
  end

  module SubexpPositiveLookahead
    def to_sym
      :positive_lookahead
    end
  end

  module SubexpNegativeLookahead
    def to_sym
      :negative_lookahead
    end
  end

  module MatchCharset
    def inverted?
      invert.text_value == '^'
    end

    def content
      match_spec.elements
    end

    def to_obj
      {
        :type => :charset,
        :inverted => inverted?,
        :content => content.map(&:to_obj)
      }
    end
  end

  module CharsetRange
    def to_obj
      {
        :type => :range,
        :start => start.text_value,
        :stop => stop.text_value
      }
    end
  end

  module Literal
    def to_obj
      {
        :type => :literal,
        :content => text_value
      }
    end
  end

  module EscapedCharacter
    def is_escaped_literal?
      escape.extension_modules.length == 0
    end

    def content
      escape
    end

    def to_obj
      if is_escaped_literal?
        {
          :type => :literal,
          :content => content.text_value
        }
      else
        {
          :type => :escaped,
          :content => content.to_obj
        }
      end
    end
  end

  module AnyCharacter
    def to_obj
      :any_character
    end
  end

  module BackspaceCharacter
    def to_obj
      :backspace
    end
  end

  module WordBoundaryCharacter
    def to_obj
      :word_boundary
    end
  end

  module NonWordBoundaryCharacter
    def to_obj
      :non_word_boundary
    end
  end

  module DigitCharacter
    def to_obj
      :digit
    end
  end

  module NonDigitCharacter
    def to_obj
      :non_digit
    end
  end

  module FormFeedCharacter
    def to_obj
      :form_feed
    end
  end

  module LineFeedCharacter
    def to_obj
      :line_feed
    end
  end

  module CarriageReturnCharacter
    def to_obj
      :carriage_return
    end
  end

  module WhiteSpaceCharacter
    def to_obj
      :white_space
    end
  end

  module NonWhiteSpaceCharacter
    def to_obj
      :non_white_space
    end
  end

  module TabCharacter
    def to_obj
      :tab
    end
  end

  module VerticalTabCharacter
    def to_obj
      :vertical_tab
    end
  end

  module WordCharacter
    def to_obj
      :word
    end
  end

  module NonWordCharacter
    def to_obj
      :non_word
    end
  end

  module ControlCharacter
    def to_obj
      {
        :type => :control,
        :code => code.text_value.upcase
      }
    end
  end

  module HexCharacter
    def to_obj
      {
        :type => :hex,
        :code => code.text_value.upcase
      }
    end
  end

  module UnicodeCharacter
    def to_obj
      {
        :type => :unicode,
        :code => code.text_value.upcase
      }
    end
  end
end
