import _defaults from "lodash/defaults";

import { createHttpClient} from "../util/http";

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

export { contractClient };

