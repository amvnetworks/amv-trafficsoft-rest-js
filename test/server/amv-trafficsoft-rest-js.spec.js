import amvTrafficsoftRestJs from '../../src/amv-trafficsoft-rest-js.js';
import nock from 'nock';

describe('amvTrafficsoftRestJs', () => {
  var DEFAULT_OPTIONS;
  var BASE_URL;
  var SERVER_MOCK;

  before(() => {
    DEFAULT_OPTIONS = {
      username: 'john_doe',
      password: 'password',
      contractId: 1
    };

    BASE_URL = 'http://www.example.com/' +
      DEFAULT_OPTIONS.contractId;

    SERVER_MOCK = nock(BASE_URL)
         .get('/1/xfcd')
         .replyWithFile(200, __dirname + '/fixtures/GET_get_data.json')
         .post('/1/xfcd/last')
         .replyWithFile(200, __dirname + '/fixtures/POST_get_last_data.json');
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
