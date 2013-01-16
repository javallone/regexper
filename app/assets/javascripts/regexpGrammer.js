(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__root: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["root"] = this._nodeCache["root"] || {};
      var cached = this._nodeCache["root"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__regexp_literal();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__regexp();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["root"][index0] = address0;
    },
    __consume__regexp_literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["regexp_literal"] = this._nodeCache["regexp_literal"] || {};
      var cached = this._nodeCache["regexp_literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "/") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("/", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"/\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__regexp();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.regexp = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "/") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1("/", this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"/\""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address4 = null;
            var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address5 = true;
            while (address5) {
              var slice4 = null;
              if (this._input.length > this._offset) {
                slice4 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice4 = null;
              }
              if (slice4 && /^[igm]/.test(slice4)) {
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address5 = new klass2(slice4, this._offset, []);
                if (typeof type2 === "object") {
                  extend(address5, type2);
                }
                this._offset += 1;
              } else {
                address5 = null;
                var slice5 = null;
                if (this._input.length > this._offset) {
                  slice5 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice5 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[igm]"};
                }
              }
              if (address5) {
                elements1.push(address5);
                text1 += address5.textValue;
                remaining0 -= 1;
              }
            }
            if (remaining0 <= 0) {
              this._offset = index2;
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address4 = new klass3(text1, this._offset, elements1);
              if (typeof type3 === "object") {
                extend(address4, type3);
              }
              this._offset += text1.length;
            } else {
              address4 = null;
            }
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
              labelled0.flags = address4;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = find(this.constructor, "RegexpLiteral");
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["regexp_literal"][index0] = address0;
    },
    __consume__regexp: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["regexp"] = this._nodeCache["regexp"] || {};
      var cached = this._nodeCache["regexp"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__match();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.match = address1;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "|") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address3 = new klass0("|", this._offset, []);
          if (typeof type0 === "object") {
            extend(address3, type0);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"|\""};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address4 = null;
          address4 = this.__consume__regexp();
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            labelled1.regexp = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1) {
          this._offset = index3;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1, labelled1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2("", this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.alternate = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "Regexp");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["regexp"][index0] = address0;
    },
    __consume__anchor_start: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["anchor_start"] = this._nodeCache["anchor_start"] || {};
      var cached = this._nodeCache["anchor_start"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "^") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("^", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"^\""};
        }
      }
      return this._nodeCache["anchor_start"][index0] = address0;
    },
    __consume__anchor_end: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["anchor_end"] = this._nodeCache["anchor_end"] || {};
      var cached = this._nodeCache["anchor_end"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "$") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("$", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"$\""};
        }
      }
      return this._nodeCache["anchor_end"][index0] = address0;
    },
    __consume__match: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["match"] = this._nodeCache["match"] || {};
      var cached = this._nodeCache["match"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__anchor_start();
      if (address1) {
      } else {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.anchor_start = address1;
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__repetition_count();
        this._offset = index3;
        if (!(address2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 0;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var remaining0 = 0, index4 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index5 = this._offset;
            address4 = this.__consume__repetition();
            if (address4) {
            } else {
              this._offset = index5;
              address4 = this.__consume__subexp();
              if (address4) {
              } else {
                this._offset = index5;
                address4 = this.__consume__charset();
                if (address4) {
                } else {
                  this._offset = index5;
                  address4 = this.__consume__terminal();
                  if (address4) {
                  } else {
                    this._offset = index5;
                  }
                }
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index4;
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address3 = new klass2(text1, this._offset, elements1);
            if (typeof type2 === "object") {
              extend(address3, type2);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.match = address3;
            var address5 = null;
            var index6 = this._offset;
            address5 = this.__consume__anchor_end();
            if (address5) {
            } else {
              this._offset = index6;
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address5 = new klass3("", this._offset, []);
              if (typeof type3 === "object") {
                extend(address5, type3);
              }
              this._offset += 0;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.anchor_end = address5;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = find(this.constructor, "Match");
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["match"][index0] = address0;
    },
    __consume__repetition: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repetition"] = this._nodeCache["repetition"] || {};
      var cached = this._nodeCache["repetition"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__subexp();
      if (address1) {
      } else {
        this._offset = index2;
        address1 = this.__consume__charset();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__terminal();
          if (address1) {
          } else {
            this._offset = index2;
          }
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.match = address1;
        var address2 = null;
        address2 = this.__consume__repetition_count();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.repetition_count = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Repetition");
        address0 = new klass0(text0, this._offset, elements0, labelled0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["repetition"][index0] = address0;
    },
    __consume__repetition_count: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repetition_count"] = this._nodeCache["repetition_count"] || {};
      var cached = this._nodeCache["repetition_count"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__repeat_any();
      if (address1) {
      } else {
        this._offset = index2;
        address1 = this.__consume__repeat_required();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__repeat_optional();
          if (address1) {
          } else {
            this._offset = index2;
            address1 = this.__consume__repeat_spec();
            if (address1) {
            } else {
              this._offset = index2;
            }
          }
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.repeat = address1;
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__repeat_greedy_flag();
        if (address2) {
        } else {
          this._offset = index3;
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.greedy = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "RepetitionCount");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["repetition_count"][index0] = address0;
    },
    __consume__repeat_any: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_any"] = this._nodeCache["repeat_any"] || {};
      var cached = this._nodeCache["repeat_any"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "*") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatAny");
        address0 = new klass0("*", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"*\""};
        }
      }
      return this._nodeCache["repeat_any"][index0] = address0;
    },
    __consume__repeat_required: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_required"] = this._nodeCache["repeat_required"] || {};
      var cached = this._nodeCache["repeat_required"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "+") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatRequired");
        address0 = new klass0("+", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"+\""};
        }
      }
      return this._nodeCache["repeat_required"][index0] = address0;
    },
    __consume__repeat_optional: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_optional"] = this._nodeCache["repeat_optional"] || {};
      var cached = this._nodeCache["repeat_optional"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "?") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatOptional");
        address0 = new klass0("?", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?\""};
        }
      }
      return this._nodeCache["repeat_optional"][index0] = address0;
    },
    __consume__repeat_spec: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_spec"] = this._nodeCache["repeat_spec"] || {};
      var cached = this._nodeCache["repeat_spec"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "{") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("{", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index3 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index3;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.start = address2;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === ",") {
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3(",", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            var address5 = null;
            var remaining1 = 1, index4 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var slice6 = null;
              if (this._input.length > this._offset) {
                slice6 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice6 = null;
              }
              if (slice6 && /^[0-9]/.test(slice6)) {
                var klass4 = this.constructor.SyntaxNode;
                var type4 = null;
                address6 = new klass4(slice6, this._offset, []);
                if (typeof type4 === "object") {
                  extend(address6, type4);
                }
                this._offset += 1;
              } else {
                address6 = null;
                var slice7 = null;
                if (this._input.length > this._offset) {
                  slice7 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice7 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                }
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index4;
              var klass5 = this.constructor.SyntaxNode;
              var type5 = null;
              address5 = new klass5(text2, this._offset, elements2);
              if (typeof type5 === "object") {
                extend(address5, type5);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.stop = address5;
              var address7 = null;
              var slice8 = null;
              if (this._input.length > this._offset) {
                slice8 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice8 = null;
              }
              if (slice8 === "}") {
                var klass6 = this.constructor.SyntaxNode;
                var type6 = null;
                address7 = new klass6("}", this._offset, []);
                if (typeof type6 === "object") {
                  extend(address7, type6);
                }
                this._offset += 1;
              } else {
                address7 = null;
                var slice9 = null;
                if (this._input.length > this._offset) {
                  slice9 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice9 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
                }
              }
              if (address7) {
                elements0.push(address7);
                text0 += address7.textValue;
              } else {
                elements0 = null;
                this._offset = index2;
              }
            } else {
              elements0 = null;
              this._offset = index2;
            }
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass7 = this.constructor.SyntaxNode;
        var type7 = find(this.constructor, "RepeatSpecFull");
        address0 = new klass7(text0, this._offset, elements0, labelled0);
        if (typeof type7 === "object") {
          extend(address0, type7);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        var index5 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
        var address8 = null;
        var slice10 = null;
        if (this._input.length > this._offset) {
          slice10 = this._input.substring(this._offset, this._offset + 2);
        } else {
          slice10 = null;
        }
        if (slice10 === "{,") {
          var klass8 = this.constructor.SyntaxNode;
          var type8 = null;
          address8 = new klass8("{,", this._offset, []);
          if (typeof type8 === "object") {
            extend(address8, type8);
          }
          this._offset += 2;
        } else {
          address8 = null;
          var slice11 = null;
          if (this._input.length > this._offset) {
            slice11 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice11 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{,\""};
          }
        }
        if (address8) {
          elements3.push(address8);
          text3 += address8.textValue;
          var address9 = null;
          var remaining2 = 1, index6 = this._offset, elements4 = [], text4 = "", address10 = true;
          while (address10) {
            var slice12 = null;
            if (this._input.length > this._offset) {
              slice12 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice12 = null;
            }
            if (slice12 && /^[0-9]/.test(slice12)) {
              var klass9 = this.constructor.SyntaxNode;
              var type9 = null;
              address10 = new klass9(slice12, this._offset, []);
              if (typeof type9 === "object") {
                extend(address10, type9);
              }
              this._offset += 1;
            } else {
              address10 = null;
              var slice13 = null;
              if (this._input.length > this._offset) {
                slice13 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice13 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address10) {
              elements4.push(address10);
              text4 += address10.textValue;
              remaining2 -= 1;
            }
          }
          if (remaining2 <= 0) {
            this._offset = index6;
            var klass10 = this.constructor.SyntaxNode;
            var type10 = null;
            address9 = new klass10(text4, this._offset, elements4);
            if (typeof type10 === "object") {
              extend(address9, type10);
            }
            this._offset += text4.length;
          } else {
            address9 = null;
          }
          if (address9) {
            elements3.push(address9);
            text3 += address9.textValue;
            labelled1.stop = address9;
            var address11 = null;
            var slice14 = null;
            if (this._input.length > this._offset) {
              slice14 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice14 = null;
            }
            if (slice14 === "}") {
              var klass11 = this.constructor.SyntaxNode;
              var type11 = null;
              address11 = new klass11("}", this._offset, []);
              if (typeof type11 === "object") {
                extend(address11, type11);
              }
              this._offset += 1;
            } else {
              address11 = null;
              var slice15 = null;
              if (this._input.length > this._offset) {
                slice15 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice15 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
              }
            }
            if (address11) {
              elements3.push(address11);
              text3 += address11.textValue;
            } else {
              elements3 = null;
              this._offset = index5;
            }
          } else {
            elements3 = null;
            this._offset = index5;
          }
        } else {
          elements3 = null;
          this._offset = index5;
        }
        if (elements3) {
          this._offset = index5;
          var klass12 = this.constructor.SyntaxNode;
          var type12 = find(this.constructor, "RepeatSpecUpTo");
          address0 = new klass12(text3, this._offset, elements3, labelled1);
          if (typeof type12 === "object") {
            extend(address0, type12);
          }
          this._offset += text3.length;
        } else {
          address0 = null;
        }
        if (address0) {
        } else {
          this._offset = index1;
          var index7 = this._offset, elements5 = [], labelled2 = {}, text5 = "";
          var address12 = null;
          var slice16 = null;
          if (this._input.length > this._offset) {
            slice16 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice16 = null;
          }
          if (slice16 === "{") {
            var klass13 = this.constructor.SyntaxNode;
            var type13 = null;
            address12 = new klass13("{", this._offset, []);
            if (typeof type13 === "object") {
              extend(address12, type13);
            }
            this._offset += 1;
          } else {
            address12 = null;
            var slice17 = null;
            if (this._input.length > this._offset) {
              slice17 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice17 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
            }
          }
          if (address12) {
            elements5.push(address12);
            text5 += address12.textValue;
            var address13 = null;
            var remaining3 = 1, index8 = this._offset, elements6 = [], text6 = "", address14 = true;
            while (address14) {
              var slice18 = null;
              if (this._input.length > this._offset) {
                slice18 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice18 = null;
              }
              if (slice18 && /^[0-9]/.test(slice18)) {
                var klass14 = this.constructor.SyntaxNode;
                var type14 = null;
                address14 = new klass14(slice18, this._offset, []);
                if (typeof type14 === "object") {
                  extend(address14, type14);
                }
                this._offset += 1;
              } else {
                address14 = null;
                var slice19 = null;
                if (this._input.length > this._offset) {
                  slice19 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice19 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                }
              }
              if (address14) {
                elements6.push(address14);
                text6 += address14.textValue;
                remaining3 -= 1;
              }
            }
            if (remaining3 <= 0) {
              this._offset = index8;
              var klass15 = this.constructor.SyntaxNode;
              var type15 = null;
              address13 = new klass15(text6, this._offset, elements6);
              if (typeof type15 === "object") {
                extend(address13, type15);
              }
              this._offset += text6.length;
            } else {
              address13 = null;
            }
            if (address13) {
              elements5.push(address13);
              text5 += address13.textValue;
              labelled2.start = address13;
              var address15 = null;
              var slice20 = null;
              if (this._input.length > this._offset) {
                slice20 = this._input.substring(this._offset, this._offset + 2);
              } else {
                slice20 = null;
              }
              if (slice20 === ",}") {
                var klass16 = this.constructor.SyntaxNode;
                var type16 = null;
                address15 = new klass16(",}", this._offset, []);
                if (typeof type16 === "object") {
                  extend(address15, type16);
                }
                this._offset += 2;
              } else {
                address15 = null;
                var slice21 = null;
                if (this._input.length > this._offset) {
                  slice21 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice21 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",}\""};
                }
              }
              if (address15) {
                elements5.push(address15);
                text5 += address15.textValue;
              } else {
                elements5 = null;
                this._offset = index7;
              }
            } else {
              elements5 = null;
              this._offset = index7;
            }
          } else {
            elements5 = null;
            this._offset = index7;
          }
          if (elements5) {
            this._offset = index7;
            var klass17 = this.constructor.SyntaxNode;
            var type17 = find(this.constructor, "RepeatSpecAtLeast");
            address0 = new klass17(text5, this._offset, elements5, labelled2);
            if (typeof type17 === "object") {
              extend(address0, type17);
            }
            this._offset += text5.length;
          } else {
            address0 = null;
          }
          if (address0) {
          } else {
            this._offset = index1;
            var index9 = this._offset, elements7 = [], labelled3 = {}, text7 = "";
            var address16 = null;
            var slice22 = null;
            if (this._input.length > this._offset) {
              slice22 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice22 = null;
            }
            if (slice22 === "{") {
              var klass18 = this.constructor.SyntaxNode;
              var type18 = null;
              address16 = new klass18("{", this._offset, []);
              if (typeof type18 === "object") {
                extend(address16, type18);
              }
              this._offset += 1;
            } else {
              address16 = null;
              var slice23 = null;
              if (this._input.length > this._offset) {
                slice23 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice23 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
              }
            }
            if (address16) {
              elements7.push(address16);
              text7 += address16.textValue;
              var address17 = null;
              var remaining4 = 1, index10 = this._offset, elements8 = [], text8 = "", address18 = true;
              while (address18) {
                var slice24 = null;
                if (this._input.length > this._offset) {
                  slice24 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice24 = null;
                }
                if (slice24 && /^[0-9]/.test(slice24)) {
                  var klass19 = this.constructor.SyntaxNode;
                  var type19 = null;
                  address18 = new klass19(slice24, this._offset, []);
                  if (typeof type19 === "object") {
                    extend(address18, type19);
                  }
                  this._offset += 1;
                } else {
                  address18 = null;
                  var slice25 = null;
                  if (this._input.length > this._offset) {
                    slice25 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice25 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                  }
                }
                if (address18) {
                  elements8.push(address18);
                  text8 += address18.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index10;
                var klass20 = this.constructor.SyntaxNode;
                var type20 = null;
                address17 = new klass20(text8, this._offset, elements8);
                if (typeof type20 === "object") {
                  extend(address17, type20);
                }
                this._offset += text8.length;
              } else {
                address17 = null;
              }
              if (address17) {
                elements7.push(address17);
                text7 += address17.textValue;
                labelled3.value = address17;
                var address19 = null;
                var slice26 = null;
                if (this._input.length > this._offset) {
                  slice26 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice26 = null;
                }
                if (slice26 === "}") {
                  var klass21 = this.constructor.SyntaxNode;
                  var type21 = null;
                  address19 = new klass21("}", this._offset, []);
                  if (typeof type21 === "object") {
                    extend(address19, type21);
                  }
                  this._offset += 1;
                } else {
                  address19 = null;
                  var slice27 = null;
                  if (this._input.length > this._offset) {
                    slice27 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice27 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
                  }
                }
                if (address19) {
                  elements7.push(address19);
                  text7 += address19.textValue;
                } else {
                  elements7 = null;
                  this._offset = index9;
                }
              } else {
                elements7 = null;
                this._offset = index9;
              }
            } else {
              elements7 = null;
              this._offset = index9;
            }
            if (elements7) {
              this._offset = index9;
              var klass22 = this.constructor.SyntaxNode;
              var type22 = find(this.constructor, "RepeatSpecExact");
              address0 = new klass22(text7, this._offset, elements7, labelled3);
              if (typeof type22 === "object") {
                extend(address0, type22);
              }
              this._offset += text7.length;
            } else {
              address0 = null;
            }
            if (address0) {
            } else {
              this._offset = index1;
            }
          }
        }
      }
      return this._nodeCache["repeat_spec"][index0] = address0;
    },
    __consume__repeat_greedy_flag: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_greedy_flag"] = this._nodeCache["repeat_greedy_flag"] || {};
      var cached = this._nodeCache["repeat_greedy_flag"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "?") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("?", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?\""};
        }
      }
      return this._nodeCache["repeat_greedy_flag"][index0] = address0;
    },
    __consume__subexp: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["subexp"] = this._nodeCache["subexp"] || {};
      var cached = this._nodeCache["subexp"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("(", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset;
        address2 = this.__consume__subexp_no_capture();
        if (address2) {
        } else {
          this._offset = index3;
          address2 = this.__consume__subexp_positive_lookahead();
          if (address2) {
          } else {
            this._offset = index3;
            address2 = this.__consume__subexp_negative_lookahead();
            if (address2) {
            } else {
              this._offset = index3;
            }
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.flag = address2;
          var address3 = null;
          address3 = this.__consume__regexp();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.regexp = address3;
            var address4 = null;
            var slice2 = null;
            if (this._input.length > this._offset) {
              slice2 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice2 = null;
            }
            if (slice2 === ")") {
              var klass2 = this.constructor.SyntaxNode;
              var type2 = null;
              address4 = new klass2(")", this._offset, []);
              if (typeof type2 === "object") {
                extend(address4, type2);
              }
              this._offset += 1;
            } else {
              address4 = null;
              var slice3 = null;
              if (this._input.length > this._offset) {
                slice3 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice3 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
              }
            }
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "Subexp");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["subexp"][index0] = address0;
    },
    __consume__subexp_no_capture: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["subexp_no_capture"] = this._nodeCache["subexp_no_capture"] || {};
      var cached = this._nodeCache["subexp_no_capture"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "?:") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "SubexpNoCapture");
        address0 = new klass0("?:", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 2;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?:\""};
        }
      }
      return this._nodeCache["subexp_no_capture"][index0] = address0;
    },
    __consume__subexp_positive_lookahead: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["subexp_positive_lookahead"] = this._nodeCache["subexp_positive_lookahead"] || {};
      var cached = this._nodeCache["subexp_positive_lookahead"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "?=") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "SubexpPositiveLookahead");
        address0 = new klass0("?=", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 2;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?=\""};
        }
      }
      return this._nodeCache["subexp_positive_lookahead"][index0] = address0;
    },
    __consume__subexp_negative_lookahead: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["subexp_negative_lookahead"] = this._nodeCache["subexp_negative_lookahead"] || {};
      var cached = this._nodeCache["subexp_negative_lookahead"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "?!") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "SubexpNegativeLookahead");
        address0 = new klass0("?!", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 2;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?!\""};
        }
      }
      return this._nodeCache["subexp_negative_lookahead"][index0] = address0;
    },
    __consume__charset: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset"] = this._nodeCache["charset"] || {};
      var cached = this._nodeCache["charset"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "^") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("^", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"^\""};
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2("", this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.invert = address2;
          var address3 = null;
          var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index4 = this._offset;
            address4 = this.__consume__charset_range();
            if (address4) {
            } else {
              this._offset = index4;
              address4 = this.__consume__charset_terminal();
              if (address4) {
              } else {
                this._offset = index4;
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address3 = new klass3(text1, this._offset, elements1);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.match_spec = address3;
            var address5 = null;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 === "]") {
              var klass4 = this.constructor.SyntaxNode;
              var type4 = null;
              address5 = new klass4("]", this._offset, []);
              if (typeof type4 === "object") {
                extend(address5, type4);
              }
              this._offset += 1;
            } else {
              address5 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
              }
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = find(this.constructor, "Charset");
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset"][index0] = address0;
    },
    __consume__charset_range: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_range"] = this._nodeCache["charset_range"] || {};
      var cached = this._nodeCache["charset_range"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__charset_terminal();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.start = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "-") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("-", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"-\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__charset_terminal();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.stop = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "CharsetRange");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset_range"][index0] = address0;
    },
    __consume__charset_terminal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_terminal"] = this._nodeCache["charset_terminal"] || {};
      var cached = this._nodeCache["charset_terminal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__charset_escaped_character();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__charset_literal();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["charset_terminal"][index0] = address0;
    },
    __consume__charset_literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_literal"] = this._nodeCache["charset_literal"] || {};
      var cached = this._nodeCache["charset_literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[^\\\]]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Literal");
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\\\\\\]]"};
        }
      }
      return this._nodeCache["charset_literal"][index0] = address0;
    },
    __consume__charset_escaped_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_escaped_character"] = this._nodeCache["charset_escaped_character"] || {};
      var cached = this._nodeCache["charset_escaped_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\\") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\\", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        address2 = this.__consume__backspace_character();
        if (address2) {
        } else {
          this._offset = index2;
          address2 = this.__consume__control_character();
          if (address2) {
          } else {
            this._offset = index2;
            address2 = this.__consume__digit_character();
            if (address2) {
            } else {
              this._offset = index2;
              address2 = this.__consume__non_digit_character();
              if (address2) {
              } else {
                this._offset = index2;
                address2 = this.__consume__form_feed_character();
                if (address2) {
                } else {
                  this._offset = index2;
                  address2 = this.__consume__line_feed_character();
                  if (address2) {
                  } else {
                    this._offset = index2;
                    address2 = this.__consume__carriage_return_character();
                    if (address2) {
                    } else {
                      this._offset = index2;
                      address2 = this.__consume__white_space_character();
                      if (address2) {
                      } else {
                        this._offset = index2;
                        address2 = this.__consume__non_white_space_character();
                        if (address2) {
                        } else {
                          this._offset = index2;
                          address2 = this.__consume__tab_character();
                          if (address2) {
                          } else {
                            this._offset = index2;
                            address2 = this.__consume__vertical_tab_character();
                            if (address2) {
                            } else {
                              this._offset = index2;
                              address2 = this.__consume__word_character();
                              if (address2) {
                              } else {
                                this._offset = index2;
                                address2 = this.__consume__non_word_character();
                                if (address2) {
                                } else {
                                  this._offset = index2;
                                  address2 = this.__consume__octal_character();
                                  if (address2) {
                                  } else {
                                    this._offset = index2;
                                    address2 = this.__consume__hex_character();
                                    if (address2) {
                                    } else {
                                      this._offset = index2;
                                      address2 = this.__consume__unicode_character();
                                      if (address2) {
                                      } else {
                                        this._offset = index2;
                                        address2 = this.__consume__null_character();
                                        if (address2) {
                                        } else {
                                          this._offset = index2;
                                          var slice2 = null;
                                          if (this._input.length > this._offset) {
                                            slice2 = this._input.substring(this._offset, this._offset + 1);
                                          } else {
                                            slice2 = null;
                                          }
                                          var temp0 = slice2;
                                          if (temp0 === null) {
                                            address2 = null;
                                            var slice3 = null;
                                            if (this._input.length > this._offset) {
                                              slice3 = this._input.substring(this._offset, this._offset + 1);
                                            } else {
                                              slice3 = null;
                                            }
                                            if (!this.error || this.error.offset <= this._offset) {
                                              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
                                            }
                                          } else {
                                            var klass1 = this.constructor.SyntaxNode;
                                            var type1 = null;
                                            address2 = new klass1(temp0, this._offset, []);
                                            if (typeof type1 === "object") {
                                              extend(address2, type1);
                                            }
                                            this._offset += 1;
                                          }
                                          if (address2) {
                                          } else {
                                            this._offset = index2;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.escape = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "EscapedCharacter");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset_escaped_character"][index0] = address0;
    },
    __consume__terminal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["terminal"] = this._nodeCache["terminal"] || {};
      var cached = this._nodeCache["terminal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__any_character();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__escaped_character();
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__literal();
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["terminal"][index0] = address0;
    },
    __consume__any_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["any_character"] = this._nodeCache["any_character"] || {};
      var cached = this._nodeCache["any_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === ".") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "AnyCharacter");
        address0 = new klass0(".", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
        }
      }
      return this._nodeCache["any_character"][index0] = address0;
    },
    __consume__literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["literal"] = this._nodeCache["literal"] || {};
      var cached = this._nodeCache["literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[^|\\/.\[\(\)?+*$^]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Literal");
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^|\\\\/.\\[\\(\\)?+*$^]"};
        }
      }
      return this._nodeCache["literal"][index0] = address0;
    },
    __consume__escaped_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["escaped_character"] = this._nodeCache["escaped_character"] || {};
      var cached = this._nodeCache["escaped_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\\") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\\", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        address2 = this.__consume__word_boundary_character();
        if (address2) {
        } else {
          this._offset = index2;
          address2 = this.__consume__non_word_boundary_character();
          if (address2) {
          } else {
            this._offset = index2;
            address2 = this.__consume__control_character();
            if (address2) {
            } else {
              this._offset = index2;
              address2 = this.__consume__digit_character();
              if (address2) {
              } else {
                this._offset = index2;
                address2 = this.__consume__non_digit_character();
                if (address2) {
                } else {
                  this._offset = index2;
                  address2 = this.__consume__form_feed_character();
                  if (address2) {
                  } else {
                    this._offset = index2;
                    address2 = this.__consume__line_feed_character();
                    if (address2) {
                    } else {
                      this._offset = index2;
                      address2 = this.__consume__carriage_return_character();
                      if (address2) {
                      } else {
                        this._offset = index2;
                        address2 = this.__consume__white_space_character();
                        if (address2) {
                        } else {
                          this._offset = index2;
                          address2 = this.__consume__non_white_space_character();
                          if (address2) {
                          } else {
                            this._offset = index2;
                            address2 = this.__consume__tab_character();
                            if (address2) {
                            } else {
                              this._offset = index2;
                              address2 = this.__consume__vertical_tab_character();
                              if (address2) {
                              } else {
                                this._offset = index2;
                                address2 = this.__consume__word_character();
                                if (address2) {
                                } else {
                                  this._offset = index2;
                                  address2 = this.__consume__non_word_character();
                                  if (address2) {
                                  } else {
                                    this._offset = index2;
                                    address2 = this.__consume__back_reference();
                                    if (address2) {
                                    } else {
                                      this._offset = index2;
                                      address2 = this.__consume__octal_character();
                                      if (address2) {
                                      } else {
                                        this._offset = index2;
                                        address2 = this.__consume__hex_character();
                                        if (address2) {
                                        } else {
                                          this._offset = index2;
                                          address2 = this.__consume__unicode_character();
                                          if (address2) {
                                          } else {
                                            this._offset = index2;
                                            address2 = this.__consume__null_character();
                                            if (address2) {
                                            } else {
                                              this._offset = index2;
                                              var slice2 = null;
                                              if (this._input.length > this._offset) {
                                                slice2 = this._input.substring(this._offset, this._offset + 1);
                                              } else {
                                                slice2 = null;
                                              }
                                              var temp0 = slice2;
                                              if (temp0 === null) {
                                                address2 = null;
                                                var slice3 = null;
                                                if (this._input.length > this._offset) {
                                                  slice3 = this._input.substring(this._offset, this._offset + 1);
                                                } else {
                                                  slice3 = null;
                                                }
                                                if (!this.error || this.error.offset <= this._offset) {
                                                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
                                                }
                                              } else {
                                                var klass1 = this.constructor.SyntaxNode;
                                                var type1 = null;
                                                address2 = new klass1(temp0, this._offset, []);
                                                if (typeof type1 === "object") {
                                                  extend(address2, type1);
                                                }
                                                this._offset += 1;
                                              }
                                              if (address2) {
                                              } else {
                                                this._offset = index2;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.escape = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "EscapedCharacter");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["escaped_character"][index0] = address0;
    },
    __consume__backspace_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["backspace_character"] = this._nodeCache["backspace_character"] || {};
      var cached = this._nodeCache["backspace_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "b") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "BackspaceCharacter");
        address0 = new klass0("b", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"b\""};
        }
      }
      return this._nodeCache["backspace_character"][index0] = address0;
    },
    __consume__word_boundary_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["word_boundary_character"] = this._nodeCache["word_boundary_character"] || {};
      var cached = this._nodeCache["word_boundary_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "b") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "WordBoundaryCharacter");
        address0 = new klass0("b", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"b\""};
        }
      }
      return this._nodeCache["word_boundary_character"][index0] = address0;
    },
    __consume__non_word_boundary_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["non_word_boundary_character"] = this._nodeCache["non_word_boundary_character"] || {};
      var cached = this._nodeCache["non_word_boundary_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "B") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "NonWordBoundaryCharacter");
        address0 = new klass0("B", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"B\""};
        }
      }
      return this._nodeCache["non_word_boundary_character"][index0] = address0;
    },
    __consume__digit_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["digit_character"] = this._nodeCache["digit_character"] || {};
      var cached = this._nodeCache["digit_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "d") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "DigitCharacter");
        address0 = new klass0("d", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"d\""};
        }
      }
      return this._nodeCache["digit_character"][index0] = address0;
    },
    __consume__non_digit_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["non_digit_character"] = this._nodeCache["non_digit_character"] || {};
      var cached = this._nodeCache["non_digit_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "D") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "NonDigitCharacter");
        address0 = new klass0("D", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"D\""};
        }
      }
      return this._nodeCache["non_digit_character"][index0] = address0;
    },
    __consume__form_feed_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["form_feed_character"] = this._nodeCache["form_feed_character"] || {};
      var cached = this._nodeCache["form_feed_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "f") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "FormFeedCharacter");
        address0 = new klass0("f", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"f\""};
        }
      }
      return this._nodeCache["form_feed_character"][index0] = address0;
    },
    __consume__line_feed_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["line_feed_character"] = this._nodeCache["line_feed_character"] || {};
      var cached = this._nodeCache["line_feed_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "n") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "LineFeedCharacter");
        address0 = new klass0("n", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"n\""};
        }
      }
      return this._nodeCache["line_feed_character"][index0] = address0;
    },
    __consume__carriage_return_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["carriage_return_character"] = this._nodeCache["carriage_return_character"] || {};
      var cached = this._nodeCache["carriage_return_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "r") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "CarriageReturnCharacter");
        address0 = new klass0("r", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"r\""};
        }
      }
      return this._nodeCache["carriage_return_character"][index0] = address0;
    },
    __consume__white_space_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["white_space_character"] = this._nodeCache["white_space_character"] || {};
      var cached = this._nodeCache["white_space_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "s") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "WhiteSpaceCharacter");
        address0 = new klass0("s", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"s\""};
        }
      }
      return this._nodeCache["white_space_character"][index0] = address0;
    },
    __consume__non_white_space_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["non_white_space_character"] = this._nodeCache["non_white_space_character"] || {};
      var cached = this._nodeCache["non_white_space_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "S") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "NonWhiteSpaceCharacter");
        address0 = new klass0("S", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"S\""};
        }
      }
      return this._nodeCache["non_white_space_character"][index0] = address0;
    },
    __consume__tab_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["tab_character"] = this._nodeCache["tab_character"] || {};
      var cached = this._nodeCache["tab_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "t") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "TabCharacter");
        address0 = new klass0("t", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"t\""};
        }
      }
      return this._nodeCache["tab_character"][index0] = address0;
    },
    __consume__vertical_tab_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["vertical_tab_character"] = this._nodeCache["vertical_tab_character"] || {};
      var cached = this._nodeCache["vertical_tab_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "v") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "VerticalTabCharacter");
        address0 = new klass0("v", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"v\""};
        }
      }
      return this._nodeCache["vertical_tab_character"][index0] = address0;
    },
    __consume__word_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["word_character"] = this._nodeCache["word_character"] || {};
      var cached = this._nodeCache["word_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "w") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "WordCharacter");
        address0 = new klass0("w", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"w\""};
        }
      }
      return this._nodeCache["word_character"][index0] = address0;
    },
    __consume__non_word_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["non_word_character"] = this._nodeCache["non_word_character"] || {};
      var cached = this._nodeCache["non_word_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "W") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "NonWordCharacter");
        address0 = new klass0("W", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"W\""};
        }
      }
      return this._nodeCache["non_word_character"][index0] = address0;
    },
    __consume__control_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["control_character"] = this._nodeCache["control_character"] || {};
      var cached = this._nodeCache["control_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "c") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("c", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"c\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        var temp0 = slice2;
        if (temp0 === null) {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
          }
        } else {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(temp0, this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 1;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.code = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "ControlCharacter");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["control_character"][index0] = address0;
    },
    __consume__back_reference: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["back_reference"] = this._nodeCache["back_reference"] || {};
      var cached = this._nodeCache["back_reference"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[1-9]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "BackReference");
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[1-9]"};
        }
      }
      return this._nodeCache["back_reference"][index0] = address0;
    },
    __consume__octal_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["octal_character"] = this._nodeCache["octal_character"] || {};
      var cached = this._nodeCache["octal_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("0", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-7]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-7]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.code = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "OctalCharacter");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["octal_character"][index0] = address0;
    },
    __consume__hex_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["hex_character"] = this._nodeCache["hex_character"] || {};
      var cached = this._nodeCache["hex_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "x") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("x", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"x\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9a-fA-F]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.code = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "HexCharacter");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["hex_character"][index0] = address0;
    },
    __consume__unicode_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["unicode_character"] = this._nodeCache["unicode_character"] || {};
      var cached = this._nodeCache["unicode_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "u") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("u", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"u\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9a-fA-F]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.code = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "UnicodeCharacter");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["unicode_character"][index0] = address0;
    },
    __consume__null_character: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["null_character"] = this._nodeCache["null_character"] || {};
      var cached = this._nodeCache["null_character"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "NullCharacter");
        address0 = new klass0("0", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      return this._nodeCache["null_character"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__root();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    Regexper = Grammar;
    RegexperParser = Parser;
    RegexperParser.formatError = formatError;
  }
})();

