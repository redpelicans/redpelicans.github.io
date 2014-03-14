'use strict';

module.exports = {
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    , reporter: require('jshint-stylish')
    }
  , dev: [
      'Gruntfile.js'
    , 'app/scripts/**/*.js'
    ]
  }
};
