'use strict';

module.exports = {
  dev: {
    port: process.env.PORT || 9000
  , hostname: process.env.HOST || 'localhost'
  , livereload: 35729 // livereload port
  }
};
