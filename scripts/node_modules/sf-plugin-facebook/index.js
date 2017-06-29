if (Device.deviceOS === "iOS") {
  module.exports = require('./facebook-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./facebook-Android');
}