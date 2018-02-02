import qs from "qs";
import axios from "axios";
import _defaults from "lodash/defaults";

var isBrowserEnvironment = typeof(window) !== 'undefined' && !!window.navigator;
var userAgent = 'amv-trafficsoft-rest-js/1.1.0';

/**
 * Workaround for axios array params serialization.
 * Outputs `a=1&a=2&a=3` instead of `a[]=1&a[]=2&a[]=3`.
 *
 * Strangely axios passes arrays as object with int keys
 * to the paramsSerializer.. e.g.
 * in: { a: [1,2,3] }
 * axios out: { a : { '0': 1, '1': 2, '2': 3 })
 */
var serializeAxiosQueryParams = function(params) {
  var query =  qs.stringify(params, {
      arrayFormat: 'repeat',
      encodeValuesOnly : true
   });

  // replaces e.g. `a[]=1&a[]=2&a[]=3` with `a=1&a=2&a=3`
  var queryWithArrayBracketsRemoved = query.replace(/\[\d+\]=/g, '=');
  return queryWithArrayBracketsRemoved;
};
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
var createHttpClient = function(requestOptions) {
  var opts = _defaults({
    paramsSerializer: function(params) {
      return serializeAxiosQueryParams(params);
    }
  }, requestOptions);

  var httpClient = axios.create(opts);
  httpClient.defaults.timeout = 45000;
  httpClient.defaults.headers.common['Content-Type'] = 'application/json';

  if (!isBrowserEnvironment) {
    httpClient.defaults.headers.common['User-Agent'] = userAgent;
  }

  return httpClient;
};


var contractClient = function (baseUrl, options) {
  var contractRequestOptions = _defaults({
    baseURL: baseUrl + '/api/rest/v1/contract',
    params: {
      contractId: options.contractId || -1
    }
  }, options);

  var httpClient = createHttpClient(contractRequestOptions);

  var fetchDataPackage = function (contractId, options) {
    var url = '/' + contractId + '/datapackage';
    var opts = _defaults(options || {}, contractRequestOptions);
    return httpClient.get(url, opts);
  };

  var fetchSubscriptions = function (contractId, options) {
    var url = '/' + contractId + '/subscription';
    var opts = _defaults(options || {}, contractRequestOptions);
    return httpClient.get(url, opts);
  };

  return {
    fetchDataPackage: fetchDataPackage,
    fetchSubscriptions: fetchSubscriptions
  };
};

var xfcdClient = function (baseUrl, options) {
  var xfcdRequestOptions = _defaults({
    baseURL: baseUrl + '/api/rest/v1/xfcd',
    params: {
      contractId: options.contractId || -1
    }
  }, options);

  var httpClient = createHttpClient(xfcdRequestOptions);

  var getLastData = function (vehicleIdsArray, options) {
    var url = '/last';
    var opts = _defaults(options || {}, xfcdRequestOptions);
    opts.params['vehicleId'] = vehicleIdsArray || [];
    return httpClient.get(url, opts);
  };

  var getData = function (options) {
    var url = '';
    var opts = _defaults(options || {}, xfcdRequestOptions);
    return httpClient.get(url, opts);
  };

  var getDataAndConfirmDeliveries = function (deliveryIdsArray, options) {
    var url = '';
    var requestBody = deliveryIdsArray || [];
    var opts = _defaults(options || {}, xfcdRequestOptions);
    return httpClient.post(url, requestBody, opts);
  };

  var confirmDeliveries = function (deliveryIdsArray, options) {
    var url = '/confirm';
    var requestBody = deliveryIdsArray || [];
    var opts = _defaults(options || {}, xfcdRequestOptions);
    return httpClient.post(url, requestBody, opts);
  };

  return {
    getLastData: getLastData,
    getData: getData,
    getDataAndConfirmDeliveries: getDataAndConfirmDeliveries,
    confirmDeliveries: confirmDeliveries
  };
};

export default function (baseUrl, options) {
  var opts = options || {};
  var defaultRequestOptions = _defaults({
    baseURL: baseUrl
  }, opts);

  return {
    contract: function (options) {
      var requestOptions = _defaults(options || {}, defaultRequestOptions)
      return contractClient(requestOptions.baseURL, requestOptions);
    },
    xfcd: function (options) {
      var requestOptions = _defaults(options || {}, defaultRequestOptions)
      return xfcdClient(requestOptions.baseURL, requestOptions);
    }
  };
}

