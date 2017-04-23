import axios from 'axios';
import _ from 'lodash';

/**
 * amvTrafficsoftRestJs
 * Description
 *
 * @name amvTrafficsoftRestJs
 * @function
 * @param {Object} options An object containing the following fields:
 *
 * @return {Array} Result
 */

var xfcdClient = function(baseUrl, options) {
  var xfcdRequestOptions = _.defaults({
      baseURL: baseUrl + '/xfcd',
  }, options);

  var httpClient = axios.create(xfcdRequestOptions);
  httpClient.defaults.timeout = 45000;
  httpClient.defaults.headers.common['Content-Type'] = 'application/json';
  httpClient.defaults.headers.common['User-Agent'] = 'amv-trafficsoft-rest-js/1.0.0';

  var getLastData = function(vehicleIdsArray, options) {
    var url = '/last';
    var requestBody = vehicleIdsArray || [];
    return httpClient.post(url, requestBody, options);
  };

  return {
    getLastData: getLastData
  };
};

export default function (baseUrl, options) {
  var opts = options || {};
  var contractId = opts && opts.contractId || -1;
  var defaultRequestOptions = _.defaults({
    baseURL: baseUrl + '/' + contractId,
    auth: {
      username: opts.username || 'username',
      password: opts.password || 'password'
    }
  }, opts);

  return {
    xfcd: function(options) {
      var requestOptions = _.defaults(options, defaultRequestOptions)
      return xfcdClient(requestOptions.baseURL, requestOptions);
    }
  };
}

