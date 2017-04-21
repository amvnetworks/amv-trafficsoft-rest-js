import axios from 'axios';
import _ from 'lodash';
import defaults from 'lodash/defaults';

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
  }, options)

  var httpClient = axios.create(xfcdRequestOptions);
  httpClient.defaults.timeout = 45000;

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
  var contractId = options && options.contractId || -1;
  var defaultRequestOptions = _.defaults({
    baseURL: baseUrl + '/' + contractId,
  }, options);

  return {
    xfcd: function(options) {
      var requestOptions = _.defaults(options, defaultRequestOptions)
      return xfcdClient(requestOptions);
    }
  };
}
