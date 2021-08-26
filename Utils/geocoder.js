
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  //fetch: customFetchImplementation,
  httpAdapter: 'https',
  apiKey: 'AIzaSyBKddnNMSLhLouaciQnjkOa6WcsmBtlANc', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
