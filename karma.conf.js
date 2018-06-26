var webpackConf = require('./webpack.config.js');
module.exports = function(config) {

  var configuration = {
    files: [
      // Each file acts as entry point for the webpack configuration
      'test/client/**/*.js'
    ],
    frameworks: ['mocha', 'sinon-chai'],
    preprocessors: {
      'test/client/**/*.js': ['webpack']
    },
    webpack: {
      mode: 'production',
      module: webpackConf.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    //browsers: ['Chrome', 'Firefox'],
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-sinon-chai'),

      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-spec-reporter')
    ],
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
