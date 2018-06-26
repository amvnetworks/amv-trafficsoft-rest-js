import qs from "qs";
import axios from "axios";
import _defaults from "lodash/defaults";

var isBrowserEnvironment = typeof(window) !== 'undefined' && !!window.navigator;
var userAgent = 'amv-trafficsoft-rest-js/0.2.0';

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
 * Create an axios http client with custom default values;
 *
 * @name createHttpClient
 * @function
 * @param {AxiosRequestConfig} requestOptions An axios request config object used to create the client
 * - 
 *
 * @return {AxiosInstance} An axios http client
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

export { createHttpClient };

