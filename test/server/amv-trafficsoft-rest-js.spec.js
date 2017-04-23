import amvTrafficsoftRestJs from '../../src/amv-trafficsoft-rest-js.js';
import nock from 'nock';

describe('amvTrafficsoftRestJs', () => {
  var BASE_URL;
  var SERVER_MOCK;
  var DEFAULT_OPTIONS;

  before(() => {
    var mockResponseGetData = [{
      "deliveryId": 0,
      "timestamp": "2017-04-23T07:40:49.572Z",
      "track": [
        {
          "id": 0,
          "nodes": [
            {
              "altitude": 0,
              "hdop": 0,
              "heading": 0,
              "id": 0,
              "latitude": 0,
              "longitude": 0,
              "satellites": 0,
              "speed": 0,
              "states": [
                {
                  "latitude": 0,
                  "longitude": 0,
                  "param": "string",
                  "timestamp": "2017-04-23T07:40:49.572Z",
                  "value": "string"
                }
              ],
              "timestamp": "2017-04-23T07:40:49.572Z",
              "vdop": 0,
              "xfcds": [
                {
                  "latitude": 0,
                  "longitude": 0,
                  "param": "string",
                  "timestamp": "2017-04-23T07:40:49.572Z",
                  "value": "string"
                }
              ]
            }
          ],
          "vehicleId": 0
        }
      ]
    }
  ];
    var mockResponseGetLastData = [{
       "altitude": 0,
       "hdop": 0,
       "heading": 0,
       "id": 0,
       "latitude": 0,
       "longitude": 0,
       "satellites": 0,
       "speed": 0,
       "states": [
         {
           "latitude": 0,
           "longitude": 0,
           "param": "string",
           "timestamp": "2017-04-23T07:40:49.580Z",
           "value": "string"
         }
       ],
       "timestamp": "2017-04-23T07:40:49.580Z",
       "vdop": 0,
       "xfcds": [
         {
           "latitude": 0,
           "longitude": 0,
           "param": "string",
           "timestamp": "2017-04-23T07:40:49.580Z",
           "value": "string"
         }
       ]
      }
    ];

    BASE_URL = 'http://www.example.com';
    SERVER_MOCK = nock(BASE_URL)
         .post('/1/xfcd/last')
         .reply(200, mockResponseGetLastData);

    DEFAULT_OPTIONS = {
      username: 'john_doe',
      password: 'password',
      contractId: 1
    };

  });

  after(() => {
  });

  it('should be running without any problems', () => {
    expect(amvTrafficsoftRestJs).to.not.throw();
  });

  it('should create a client factory', () => {
    var baseUrl = 'http://www.example.com';
    var clientFactory = amvTrafficsoftRestJs(baseUrl, {
      username: 'john_doe',
      password: 'password',
      contractId: 1
    });

    expect(clientFactory).to.be.ok;
  });

  it('should create an xfcd client', () => {
    var baseUrl = 'http://www.example.com';
    var clientFactory = amvTrafficsoftRestJs(baseUrl, {
      username: 'john_doe',
      password: 'password',
      contractId: 1
    });

    var xfcdClient = clientFactory.xfcd();

    expect(xfcdClient).to.be.ok;
  });

  it('should request last xfcd data', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);

    var xfcdClient = clientFactory.xfcd();

    expect(xfcdClient).to.be.ok;

    var vehicleIds = [1,2,3];
    xfcdClient.getLastData(vehicleIds)
      .then(response => {
        console.log('ok - got data');

        expect(response).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
