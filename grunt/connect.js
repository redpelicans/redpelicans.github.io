'use strict';

module.exports = {
  dev: {
    options: {
      port: process.env.PORT || 9000
    , hostname: process.env.HOST || 'localhost'
    , livereload: 35729 // livereload port
    , debug: true
    }
  }
};
