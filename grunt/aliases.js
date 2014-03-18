'use strict';

module.exports = {
  serve: [
    'clean:dev'
  , 'bower-install:dev'
  , 'less:dist'
  , 'connect:dev'
  , 'watch'
  ]
};
