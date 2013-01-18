//=require vendor/raphael-min
//=require vendor/require
//=require vendor/microajax

require.config({
    baseUrl: '/assets'
});

(function() {
    var form = document.getElementById('regexp_form'),
        input = document.getElementById('regexp_input'),
        error = document.getElementById('error'),
        paper_container = document.getElementById('paper-container');

    form.onsubmit = function() {
        paper_container.innerHTML = '';
        error.innerHTML = '';

        document.body.className = 'is-loading';

        new microAjax(form.action, function(text) {
            if (this.request.status == 200) {
                document.body.className += ' has-results';
                window.location.hash = encodeURIComponent(input.value);
                require(['regexper'], function(Regexper) {
                    Regexper.draw(paper_container, JSON.parse(text), function() {
                        document.body.className = 'has-results';
                        console.log("DONE");
                    });
                });
            } else {
                error.innerHTML = JSON.parse(text).error;
                document.body.className = 'has-results';
            }
        }, input.value);

        return false;
    };
}());

var checkForHash = function(){
    var reHash = window.location.hash;
    if (reHash){
        document.getElementById('regexp_input').value = decodeURIComponent(reHash.slice(1));
        document.getElementById('regexp_form').onsubmit();
    }
};

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        checkForHash();
        clearInterval(readyStateCheckInterval);
    }
}, 10);