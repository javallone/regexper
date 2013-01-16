# Canopy

Canopy is a parser compiler for JavaScript, based on [Parsing Expression
Grammars][1] and heavily influenced by [Treetop][2].

[1]: http://en.wikipedia.org/wiki/Parsing_expression_grammar
[2]: http://treetop.rubyforge.org/

For usage documentation see [canopy.jcoglan.com](http://canopy.jcoglan.com).


## Building and testing Canopy

    git clone git://github.com/jcoglan/canopy.git
    cd canopy
    gem install jake
    npm install
    jake
    npm test

Canopy should work on a wide range of JavaScript runtimes, for example:

    v8 spec/console.js
    rhino spec/console.js

It should also run in all major web browsers:

    open spec/browser.html


## License

See `LICENSE.txt`.

