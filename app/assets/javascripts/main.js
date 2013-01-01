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

    new microAjax(form.action, function(text) {
        if (this.request.status == 200) {
            require(['regexper'], function(Regexper) {
                Regexper.draw(paper_container, JSON.parse(text));
            });
        } else if (this.request.status == 400) {
            error.innerHTML = JSON.parse(text).error;
        }
    }, input.value);

    return false;
    };
}());
