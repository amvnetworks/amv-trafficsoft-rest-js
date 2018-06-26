import _defaults from "lodash/defaults";

import { contractClient } from "./client/contract";
import { xfcdClient } from "./client/xfcd";
import { carSharingReservationClient } from "./client/car-sharing-reservation";

export default function (baseUrl, options) {
  var opts = options || {};
  var defaultRequestOptions = _defaults({
    baseURL: baseUrl
  }, opts);

  return {
    contract: (options) => {
      var requestOptions = _defaults(options || {}, defaultRequestOptions)
      return contractClient(requestOptions.baseURL, requestOptions);
    },
    xfcd: (options) => {
      var requestOptions = _defaults(options || {}, defaultRequestOptions)
      return xfcdClient(requestOptions.baseURL, requestOptions);
    },
    carSharingReservation: (options) => {
      var requestOptions = _defaults(options || {}, defaultRequestOptions)
      return carSharingReservationClient(requestOptions.baseURL, requestOptions);
    }
  };
}

