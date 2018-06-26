import _defaults from "lodash/defaults";

import { createHttpClient } from "../util/http";

let carSharingReservationClient = (baseUrl, options) => {
  let carSharingReservationRequestOptions = _defaults({
    baseURL: baseUrl + '/api/rest/v1/car-sharing',
    params: {
      contractId: options.contractId || -1
    }
  }, options);

  let httpClient = createHttpClient(carSharingReservationRequestOptions);

  let fetchVehicles = (vehicleIdsArray, options) => {
    let url = '/vehicle';
    let opts = _defaults(options || {}, carSharingReservationRequestOptions);
    opts.params['vehicleId'] = vehicleIdsArray || [];
    return httpClient.get(url, opts);
  };

  let fetchReservations = (vehicleId, options) => {
    let url = '/vehicle/' + vehicleId+ '/reservation';
    let opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.get(url, opts);
  };

  let createReservation = (vehicleId, reservationRestDto, options) => {
    let url = '/vehicle/' + vehicleId + '/reservation';
    let opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.post(url, reservationRestDto, opts);
  };

  let cancelReservation = (vehicleId, reservationId, options) => {
    let url = '/vehicle/' + vehicleId + '/reservation/' + reservationId;
    let opts = _defaults(options || {}, carSharingReservationRequestOptions);
    return httpClient.delete(url, opts);
  };

  return {
    fetchVehicles: fetchVehicles,
    fetchReservations: fetchReservations,
    createReservation: createReservation,
    cancelReservation: cancelReservation
  };
};

export { carSharingReservationClient };

