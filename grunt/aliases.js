'use strict';

module.exports = {
  serve: [
    'clean:dev'
  , 'bower-install:dev'
  , 'connect:dev'
  , 'watch'
  ]
};
