import _defaults from "lodash/defaults";

import { createHttpClient} from "../util/http";

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

export { xfcdClient };

