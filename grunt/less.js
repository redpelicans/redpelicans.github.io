'use strict';

module.exports = {
  dev: {
    files: [{
      expand: true
    , cwd: 'app/styles/'
    , src: '**/*.less'
    , dest: '.tmp/styles'
    , ext: '.css'
    }]
  }
};
