import amvTrafficsoftRestJs from "../../src/amv-trafficsoft-rest-js";
import nock from "nock";

describe('car-sharing-reservation-client', () => {
  let DEFAULT_OPTIONS;
  let BASE_URL;
  let SERVER_MOCK;

  before(() => {
    DEFAULT_OPTIONS = {
      contractId: 1,
      auth: {
        username: 'john_doe',
        password: 'password'
      }
    };

    BASE_URL = 'https://www.example.com';

    SERVER_MOCK = nock(BASE_URL)
      .get('/api/rest/v1/car-sharing/vehicle?contractId=1&vehicleId=1&vehicleId=2&vehicleId=3')
      .replyWithFile(200, __dirname + '/fixtures/car-sharing/reservation/GET_v1_car-sharing_vehicle.json')
      .get('/api/rest/v1/car-sharing/vehicle/1/reservation?contractId=1')
      .replyWithFile(200, __dirname + '/fixtures/car-sharing/reservation/GET_v1_car-sharing_vehicle_reservation.json')
      .delete('/api/rest/v1/car-sharing/vehicle/1/reservation/1?contractId=1')
      .replyWithFile(200, __dirname + '/fixtures/car-sharing/reservation/DELETE_v1_car-sharing_vehicle_reservation.json')
      .post('/api/rest/v1/car-sharing/vehicle/1/reservation?contractId=1').times(2)
      .replyWithFile(200, __dirname + '/fixtures/car-sharing/reservation/POST_v1_car-sharing_vehicle_reservation.json')
      
      // errors
      .post('/api/rest/v1/car-sharing/vehicle/1/reservation?contractId=1').times(1)
      .replyWithFile(200, __dirname + '/fixtures/car-sharing/reservation/POST_v1_car-sharing_vehicle_reservation_ERROR.json')
      ;
  });

  after(() => {
  });

  it('should create a car sharing reservation client', () => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);

    let carSharingReservationClient = clientFactory.carSharingReservation();

    expect(carSharingReservationClient).to.be.ok;
  });

  it('should create a rfid reservation', (done) => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    let carSharingReservationClient = clientFactory.carSharingReservation();

    let vehicleId = 1;
    let reservation = {
      "vehicleId": 1,
      "from": "2100-06-26T19:39:30.068Z",
      "until": "2101-01-01T20:39:30.068Z",
      "rfid": {
        "driverTagId": "0123456789abcdef"
      },
    };
    carSharingReservationClient.createReservation(vehicleId, reservation)
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should create a btle reservation', (done) => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    let carSharingReservationClient = clientFactory.carSharingReservation();

    let vehicleId = 1;
    let reservation = {
      "vehicleId": 1,
      "from": "2100-06-26T19:39:30.068Z",
      "until": "2101-01-01T20:39:30.068Z",
      "btle": {
        "appId": "123-45678-90ABCDEF",
        "mobileSerialNumber": "0123456789abcdef"
      }
    };
    carSharingReservationClient.createReservation(vehicleId, reservation)
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should cancel reservation', (done) => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    let carSharingReservationClient = clientFactory.carSharingReservation();

    let vehicleId = 1;
    let reservationId = 1;
    carSharingReservationClient.cancelReservation(vehicleId, reservationId)
      .then(response => {
        expect(response).to.be.ok;
        expect(response.data).to.be.true;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should fetch all reservations', (done) => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    let carSharingReservationClient = clientFactory.carSharingReservation();

    let vehicleId = 1;
    carSharingReservationClient.fetchReservations(vehicleId)
      .then(response => {
        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should fetch all vehicles', (done) => {
    let clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    let carSharingReservationClient = clientFactory.carSharingReservation();

    let vehicleIds = [1, 2, 3];
    carSharingReservationClient.fetchVehicles(vehicleIds)
      .then(response => {
        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });

  });
});
