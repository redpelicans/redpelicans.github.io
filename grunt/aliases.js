'use strict';

module.exports = {
  serve: [
    'clean:dev'
  , 'bower-install:dev'
  , 'less:dev'
  , 'copy:dev'
  , 'connect:dev'
  , 'watch'
  ]
};
