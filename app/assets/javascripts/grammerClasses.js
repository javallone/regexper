RegexperClasses = {
  RegexpLiteral:  {
    to_obj: function() {
        return this.regexp.to_obj();
    }
  },

  Regexp: {
    content: function() {
        if (this.alternate.textValue.length == 0)
            return [this.match]
        else
            return [this.match, this.alternate.regexp.content()];
    },

    to_obj: function() {
        var content = this.content();
        var objContent = [];
        for (var i=0; i<content.length; i++) {
            objContent.push(content[i].to_obj());
        }
        return {
            type: "regexp",
            range: [this.offset, this.offset+this.textValue.length],
            content: objContent
        }
    }
  },

  Match: {
      _anchor_start: function() { return this.anchor_start.textValue.length > 0 ;},
      _anchor_end: function() { return this.anchor_end.textValue.length > 0; },
      content: function() {
          return this.match.elements;
//          var content = []
//          for (var i=0; i<this.match.elements.length; i++) {
//              var element = this.match.elements[i];
//              if (element.textValue.length) {
//                  content.push(element);
//              }
//              return content;
//          }
      },
      to_obj: function() {
          var  clean_content = [];
          var content = this.content();

          for (var i=0; i<content.length; i++) {
              var element = content[i].to_obj();
              if (clean_content.length && clean_content[clean_content.length-1].type == "literal" && element.type == "literal") {
                  var start = clean_content.pop();
                  clean_content.push({
                      type: "literal",
                      range: [start.range[0], element.range[1]],
                      content: start.content+element.content
                  })
              }
              else {
                  clean_content.push(element)
              }
          }

          return {
              type: "match",
              range: [this.offset, this.offset+this.textValue.length],
              start: this._anchor_start(),
              end: this._anchor_end(),
              content: clean_content
          }

      }
  },


  Repetition: {
      content: function() {
          return this.match;
      },
      to_obj: function() {
          return {
              type: "repetition",
              range: [this.offset, this.offset+this.textValue.length],
              repeat_count: this.repetition_count.count(),
              greedy: this.repetition_count._greedy(),
              content: this.content().to_obj()
          }
      }
  },


    RepetitionCount: {
        _greedy: function() {
            return this.greedy && this.greedy.textValue.length > 0;
        },
        count: function() {
            return this.repeat.count();
        }
    },


  RepeatAny: {
      count: function() {return "any"}
  },

  RepeatRequired: {
      count: function() {return "required"}
  },


  RepeatOptional: {
      count: function() {return "optional"}
  },

  RepeatSpecFull: {
      count: function() {
          return
      }
  },

  RepeatSpecUpTo: {
      count: function() {
          return {
              stop: parseInt(this.stop.textValue)
          }
      }
  },

  RepeatSpecAtLeast: {
      count: function() {
          return {
              stop: parseInt(this.start.textValue)
          }
      }
  },


  RepeatSpecExact: {
      count: function() {
          return parseInt(this.value.textValue);
      }
  },

  Subexp: {
      content: function() {
          return this.regexp.content();
      },
      kind: function() {
              return (!this.flag || this.flag.textValue.length == 0) ? "capture": this.flag.to_sym();
      },
      _capture_group: function() {
          if (this.kind() == "capture") {
              var group = RegexperClasses.Subexp.capture_group
              //if (!group) {
              RegexperClasses.Subexp.capture_group += 1;
              //}
              return group;
          }
      },
      to_obj: function() {
          var content = this.content();
          var objContent = [];
          for (var i=0; i<content.length; i++) {
              objContent.push(content[i].to_obj());
          }
          return {
              type: "subexp",
                  range: [this.offset, this.offset+this.textValue.length],
              kind: this.kind(),
              group: this._capture_group(),
              content: objContent
          }
      }
  },
//

  SubexpNoCapture: {
      to_sym: function() {
          return "no_capture"
      }
  },

  SubexpPositiveLookahead: {
      to_sym: function() {
          return "positive_lookahead"
      }
  },

  SubexpNegativeLookahead: {
      to_sym: function() {
          return "negative_lookahead"
      }
  },

  Charset: {
      inverted: function() {
          return this.invert.textValue == '^'
      },
      content: function() {
          return match_spec.elements;
      },
      to_obj: function() {
          var content = this.content();
          var objContent = [];
          for (var i=0; i<content.length; i++) {
              objContent.push(content[i].to_obj());
          }

          return {
              type: "charset",
              range: [this.offset, this.offset+this.textValue.length],
              inverted: this.inverted(),
              content: objContent
          }
      }
  },
//    def inverted?
//      invert.text_value == '^'
//    end
//
//    def content
//      match_spec.elements
//    end
//
//    def to_obj
//      {
//        :type => :charset,
//        :range => [interval.begin, interval.end],
//        :inverted => inverted?,
//        :content => content.map(&:to_obj)
//      }
//    end
//  end

  CharsetRange: {
      to_obj: function() {
          return {
              type: "range",
              range: [this.offset, this.offset+this.textValue.length],
              start: this.start.to_obj(),
              stop: this.stop.to_obj()
          }
      }
  },

  Literal: {
      to_obj: function() {
          return {
              type: "literal",
              range: [this.offset, this.offset+this.textValue.length],
              content: this.textValue
          }
      }

  },

  EscapedCharacter: {
      is_escaped_literal: function() {
          return !this.escape.extension_modules
      },
      content: function() {
          return this.escape;
      },
      to_obj: function() {
          if (this.is_escaped_literal()) {
              return {
                  type: "literal",
                  range: [this.offset, this.offset+this.textValue.length],
                  content: this.textValue
              }
          }
          else {
              return {
                  type: "escaped",
                  range: [this.offset, this.offset+this.textValue.length],
                  content: this.content().to_obj()
              }
          }
      }
  },


  AnyCharacter: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "any_character",
              range: [this.offset, this.offset+this.textValue.length]
          }
      }
  },


  BackspaceCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "backspace";
      }
  },


  WordBoundaryCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "word_boundary";
      }
  },


  NonWordBoundaryCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "non_word_boundary";
      }
  },

  DigitCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "digit";
      }
  },

  NonDigitCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "non_digit";
      }
  },

  FormFeedCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "form_feed";
      }
  },

  LineFeedCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "line_feed";
      }
  },

  CarriageReturnCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "carriage_return";
      }
  },

  WhiteSpaceCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "white_space";
      }
  },

  NonWhiteSpaceCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "non_white_space";
      }
  },

  TabCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "tab";
      }
  },

  VerticalTabCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "vertical_tab";
      }
  },

  WordCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "word";
      }
  },

  NonWordCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "non_word";
      }
  },

  ControlCharacter: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "control",
              code: this.code.textValue.toUpperCase()
          }
      }
  },


  BackReference: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "back_reference",
              code: parseInt(this.textValue)
          }
      }
  },

  OctalCharacter: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "octal",
              code: this.code.textValue.toUpperCase()
          }
      }
  },

  HexCharacter: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "hex",
              code: this.code.textValue.toUpperCase()
          }
      }
  },

  UnicodeCharacter: {
      extension_modules: true,
      to_obj: function() {
          return {
              type: "unicode",
              code: this.code.textValue.toUpperCase()
          }
      }
  },

  NullCharacter: {
      extension_modules: true,
      to_obj: function() {
          return "null";
      }
  }


}
