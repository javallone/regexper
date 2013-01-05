module Regexper
  module RegexpLiteral
    def to_obj
      regexp.to_obj
    end
  end

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
        :range => [interval.begin, interval.end],
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
          start = clean_content.pop
          clean_content << {
            :type => :literal,
            :range => [start[:range][0], element[:range][1]],
            :content => "#{start[:content]}#{element[:content]}"
          }
        else
          clean_content << element
        end
      end

      {
        :type => :match,
        :range => [interval.begin, interval.end],
        :start => anchor_start?,
        :end => anchor_end?,
        :content => clean_content
      }
    end
  end

  module Repetition
    def content
      match
    end

    def to_obj
      {
        :type => :repetition,
        :range => [interval.begin, interval.end],
        :repeat_count => repetition_count.count,
        :greedy => repetition_count.greedy?,
        :content => content.to_obj
      }
    end
  end

  module RepetitionCount
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

  module Subexp
    @@capture_group = 0

    def content
      regexp.content
    end

    def kind
      flag.empty? ? :capture : flag.to_sym
    end

    def capture_group
      if kind == :capture
        @capture_group ||= begin
          group = @@capture_group
          @@capture_group += 1
          group
        end
      end
    end

    def to_obj
      {
        :type => :subexp,
        :range => [interval.begin, interval.end],
        :kind => kind,
        :group => capture_group,
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

  module Charset
    def inverted?
      invert.text_value == '^'
    end

    def content
      match_spec.elements
    end

    def to_obj
      {
        :type => :charset,
        :range => [interval.begin, interval.end],
        :inverted => inverted?,
        :content => content.map(&:to_obj)
      }
    end
  end

  module CharsetRange
    def to_obj
      {
        :type => :range,
        :range => [interval.begin, interval.end],
        :start => start.to_obj,
        :stop => stop.to_obj
      }
    end
  end

  module Literal
    def to_obj
      {
        :type => :literal,
        :range => [interval.begin, interval.end],
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
          :range => [interval.begin, interval.end],
          :content => content.text_value
        }
      else
        {
          :type => :escaped,
          :range => [interval.begin, interval.end],
          :content => content.to_obj
        }
      end
    end
  end

  module AnyCharacter
    def to_obj
      {
        :type => :any_character,
        :range => [interval.begin, interval.end]
      }
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

  module BackReference
    def to_obj
      {
        :type => :back_reference,
        :code => text_value.to_i
      }
    end
  end

  module OctalCharacter
    def to_obj
      {
        :type => :octal,
        :code => code.text_value
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

  module NullCharacter
    def to_obj
      :null
    end
  end
end
