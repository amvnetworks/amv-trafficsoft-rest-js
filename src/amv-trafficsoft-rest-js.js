import _defaults from "lodash/defaults";

import { contractClient } from "./client/contract";
import { xfcdClient } from "./client/xfcd";

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

