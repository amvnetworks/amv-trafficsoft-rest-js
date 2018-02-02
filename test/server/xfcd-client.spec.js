import amvTrafficsoftRestJs from "../../src/amv-trafficsoft-rest-js.js";
import nock from "nock";

describe('xfcd-client', () => {
  var DEFAULT_OPTIONS;
  var BASE_URL;
  var SERVER_MOCK;

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
      .get('/api/rest/v1/xfcd?contractId=1')
      .replyWithFile(200, __dirname + '/fixtures/xfcd/GET_v1_xfcd.json')
      .post('/api/rest/v1/xfcd?contractId=1')
      .replyWithFile(200, __dirname + '/fixtures/xfcd/POST_v1_xfcd.json')
      .get('/api/rest/v1/xfcd/last?contractId=1&vehicleId=1&vehicleId=2&vehicleId=3')
      .replyWithFile(200, __dirname + '/fixtures/xfcd/GET_v1_xfcd_last.json')
      .post('/api/rest/v1/xfcd/confirm?contractId=1')
      .replyWithFile(200, __dirname + '/fixtures/xfcd/POST_v1_xfcd_confirm.json');
  });

  after(() => {
  });

  it('should create a xfcd client', () => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);

    var xfcdClient = clientFactory.xfcd();

    expect(xfcdClient).to.be.ok;
  });

  it('should request last xfcd data', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var xfcdClient = clientFactory.xfcd();

    var vehicleIds = [1, 2, 3];
    xfcdClient.getLastData(vehicleIds)
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should request xfcd data', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var xfcdClient = clientFactory.xfcd();

    xfcdClient.getData()
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it('should request xfcd data and confirm deliveries', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var xfcdClient = clientFactory.xfcd();

    var deliveryIds = [1, 2, 3];
    xfcdClient.getDataAndConfirmDeliveries(deliveryIds)
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it('should confirm deliveries', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var xfcdClient = clientFactory.xfcd();

    var deliveryIds = [1, 2, 3];
    xfcdClient.confirmDeliveries(deliveryIds)
      .then(response => {

        expect(response).to.be.ok;
        expect(response.data).to.be.equal('');

        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
