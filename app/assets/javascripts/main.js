//=require vendor/raphael-min
//=require vendor/require
//=require vendor/microajax
//=require vendor/canopy

//require.config({
//    baseUrl: '/assets'
//});

modules = {};

var regExp = "";
function highlightRange(start, stop) {
    var rxDiv = document.getElementById("regexp");
    if (start === undefined) {
        rxDiv.innerHTML  = regExp;
    }
    else {
        rxDiv.innerHTML  = regExp.slice(0,start)+"<span class='highlight'>"+regExp.slice(start,stop)+"</span>"+regExp.slice(stop);
    }
}

(function() {

    // ugly class loading, because I had problems setting up Require.js
    var Renderer = getRenderer();
    var base = getBase(Renderer);
    var text_box = getTextBox(Renderer, base);
    var charset = getCharset(Renderer, base);
    var any_character = getAnyChar(Renderer, text_box);
    var escaped = getEscaped(Renderer, text_box);
    var literal = getLiteral(Renderer, text_box);
    var match = getMatch(Renderer, base, text_box);
    var range = getRange(Renderer, base);
    var regexp = getRegexp(Renderer, base);
    var repetition = getRepetition(Renderer, base);
    var subexp = getSubexp(Renderer, base, regexp);

    modules = {
        charset: charset,
        escaped: escaped,
        literal: literal,
        match: match,
        range: range,
        regexp: regexp,
        repetition: repetition,
        subexp: subexp,
        any_character: any_character
    };

    for (var k in RegexperClasses) {
        RegexperParser[k] = RegexperClasses[k];
    }

    var input = document.getElementById('regexp_input'),
        error = document.getElementById('error'),
        paper_container = document.getElementById('paper-container'),
        delayTimer = null;

    input.onkeyup = function() {
        if (input.value === regExp) {
            return; // key hasn't changed text
        }
        regExp = input.value;
        highlightRange();
        if (delayTimer) {
            clearTimeout(delayTimer);
        }
        delayTimer = setTimeout(function() {
            paper_container.innerHTML = '';
            error.innerHTML = '';

            RegexperParser.Subexp.capture_group = 1;

            document.body.className = 'is-loading';

            try {
                var tree = RegexperParser.parse(input.value)
                if (!tree) {
                    console.log("No tree!")
                    return;
                }
                var obj = tree.to_obj();
                try {
                    document.body.className += ' has-results';
                    Renderer.draw(paper_container, {"raw_expr":input.value,"structure":obj} , function() {
                        document.body.className = 'has-results';
                    });
                }
                catch(e) {
                    err = e;
                    error.innerHTML = "Exception drawing tree:<br> "+ e.stack.replace(/\n/g,"<br>");
                }
            }
            catch(e) {
                err = e;
                error.innerHTML = "Exception running grammer:<br> "+ e.stack.replace(/\n/g,"<br>");
            }
        }, 100)



    }


}());
