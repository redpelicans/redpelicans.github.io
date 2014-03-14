'use strict';

module.exports = {
  watch: {
    scripts: {
      files: 'app/scripts/**/*.js'
    , options: {
        livereload: true // see connect task for livereload port
      }
    }
  , styles: {
      files: 'app/styles/**/*.css'
    , options: {
        livereload: true // see connect task for livereload port
      }
  }
};
