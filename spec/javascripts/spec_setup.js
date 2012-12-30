var define = require('requirejs');

define.config({
    baseUrl: 'app/assets/javascripts',
    nodeRequire: require,
    paths: {
        'mock': '../../../spec/javascripts/mock'
    }
});
