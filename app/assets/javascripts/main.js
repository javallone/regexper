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
        current_request = null;

    form.onsubmit = function() {
        if (current_request) {
            return false;
        }

        if (input.value === '') {
            return false;
        }

        paper_container.innerHTML = '';
        error.innerHTML = '';

        document.body.className = 'is-loading';

        current_request = new microAjax(form.action, function(text) {
            if (this.request.status == 200) {
                document.body.className += ' has-results';
                window.location.hash = encodeURIComponent(input.value);
                require(['regexper'], function(Regexper) {
                    Regexper.draw(paper_container, JSON.parse(text), function() {
                        document.body.className = 'has-results';
                        current_request = null;
                    });
                });
            } else {
                error.innerHTML = JSON.parse(text).error;
                document.body.className = 'has-results';
                current_request = null;
            }
        }, input.value);

        return false;
    };
}());

(function() {
    var old_hash = '',
        render = function(expression) {
            if (expression){
                document.getElementById('regexp_input').value = decodeURIComponent(expression);
                document.getElementById('regexp_form').onsubmit();
            }
        },
        hash_check = function() {
            var hash = location.hash.slice(1);

            if (hash !== old_hash) {
                old_hash = hash;
                render(hash);
            }
        };

    if ('onhashchange' in window) {
        window.onhashchange = hash_check;
        window.onload = hash_check;
    } else {
        window.onload = function() {
            setInterval(hash_check, 100);
        };
    }
}());
