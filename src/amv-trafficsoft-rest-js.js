import axios from 'axios';
import _ from 'lodash';

var isBrowserEnvironment = typeof(window) !== 'undefined' && !!window.navigator;
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

  if (!isBrowserEnvironment) {
    httpClient.defaults.headers.common['User-Agent'] = 'amv-trafficsoft-rest-js/1.0.0';
  }

  var getLastData = function(vehicleIdsArray, options) {
    var url = '/last';
    var requestBody = vehicleIdsArray || [];
    var opts = _.defaults(options || {}, xfcdRequestOptions);
    return httpClient.post(url, requestBody, opts);
  };


  var getData = function(options) {
    var url = '';
    var opts = _.defaults(options || {}, xfcdRequestOptions);
    return httpClient.get(url, opts);
  };

  return {
    getLastData: getLastData,
    getData: getData
  };
};

export default function (baseUrl, options) {
  var opts = options || {};
  var contractId = opts && opts.contractId || -1;
  var defaultRequestOptions = _.defaults({
    baseURL: baseUrl + '/' + contractId,
  }, opts);

  return {
    xfcd: function(options) {
      var requestOptions = _.defaults(options || {}, defaultRequestOptions)
      return xfcdClient(requestOptions.baseURL, requestOptions);
    }
  };
}

