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
        hash = window.location.hash.split("#")[1],
        paper_container = document.getElementById('paper-container');

    function on_submit() {
        paper_container.innerHTML = '';
        error.innerHTML = '';

        document.body.className = 'is-loading';

        new microAjax(form.action, function(text) {
            if (this.request.status == 200) {
                document.body.className += ' has-results';

                require(['regexper'], function(Regexper) {
                    Regexper.draw(paper_container, JSON.parse(text), function() {
                        document.body.className = 'has-results';
                        window.location.hash = input.value;
                        console.log("DONE");
                    });
                });
            } else {
                error.innerHTML = JSON.parse(text).error;
                document.body.className = 'has-results';
            }
        }, input.value);

        return false;
    }
    form.onsubmit = on_submit

    if (!!hash) {
        input.value = hash;
        on_submit();
    }

}());
