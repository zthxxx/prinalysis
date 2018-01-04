require('babel-register')
const chromedriver = require('chromedriver')
const config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: false
  },

  test_settings: {
    default: {
      selenium_port: 9515,
      selenium_host: 'localhost',
      default_path_prefix: '',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {},
      },
      globals: {
        before (done) {
          chromedriver.start()
          done()
        },
        after (done) {
          chromedriver.stop()
          done()
        },
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {},
      }
    },
  }
}
