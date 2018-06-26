import _defaults from "lodash/defaults";

import { createHttpClient} from "../util/http";

var carSharingReservationClient = function (baseUrl, options) {
  var carSharingReservationRequestOptions = _defaults({
    baseURL: baseUrl + '/api/rest/v1/car-sharing',
    params: {
      contractId: options.contractId || -1
    }
  }, options);

  var httpClient = createHttpClient(carSharingReservationRequestOptions);

  var fetchVehicles = function (vehicleIdsArray, options) {
    var url = '/vehicle';
    var opts = _defaults(options || {}, carSharingReservationRequestOptions);
    opts.params['vehicleId'] = vehicleIdsArray || [];
    return httpClient.get(url, opts);
  };

  var fetchReservations = function (vehicleId, options) {
    var url = '/vehicle/' + vehicleId;
    var opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.get(url, opts);
  };

  var createReservation = function (vehicleId, reservationRestDto, options) {
    var url = '/vehicle/' + vehicleId + '/reservation';
    var opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.post(url, reservationRestDto, opts);
  };

  var cancelReservation = function (vehicleId, reservationId, options) {
    var url = '/vehicle/' + vehicleId + '/reservation/' + reservationId;
    var opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.post(url, reservationRestDto, opts);
  };

  return {
    fetchVehicles: fetchVehicles,
    fetchReservations: fetchReservations,
    createReservation: createReservation
  };
};

export { carSharingReservationClient };

