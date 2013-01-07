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
        paper_container = document.getElementById('paper-container'),
        permalink = document.getElementById('permalink');

    form.onsubmit = function() {
        paper_container.innerHTML = '';
        error.innerHTML = '';

        document.body.className = 'is-loading';

        new microAjax(form.action, function(text) {
            if (this.request.status == 200) {
                document.body.className += ' has-results';

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

    input.onchange = function() {
        permalink.href = "/#"+encodeURIComponent(input.value);
    }

    window.onload = function() {
        var hash = window.location.hash;
        if (hash !== undefined && hash.length > 0) {
            input.value = decodeURIComponent(hash.split("#")[1]);
            form.onsubmit();
        }
    }
}());
