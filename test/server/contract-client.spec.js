import amvTrafficsoftRestJs from "../../src/amv-trafficsoft-rest-js";
import nock from "nock";

describe('contract-client', () => {
  var AUTH_CONTRACT_ID = 1;
  var DEFAULT_OPTIONS;
  var BASE_URL;
  var SERVER_MOCK;

  before(() => {
    DEFAULT_OPTIONS = {
      contractId: AUTH_CONTRACT_ID,
      auth: {
        username: 'john_doe',
        password: 'password'
      }
    };

    BASE_URL = 'https://www.example.com';

    SERVER_MOCK = nock(BASE_URL)
      .get('/api/rest/v1/contract/' + AUTH_CONTRACT_ID + '/datapackage?contractId=' + AUTH_CONTRACT_ID)
      .replyWithFile(200, __dirname + '/fixtures/contract/GET_v1_contract_1_datapackage.json')
      .get('/api/rest/v1/contract/' + AUTH_CONTRACT_ID + '/subscription?contractId=' + AUTH_CONTRACT_ID)
      .replyWithFile(200, __dirname + '/fixtures/contract/GET_v1_contract_1_subscription.json');
  });

  after(() => {
  });

  it('should create a contract client', () => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);

    var contractClient = clientFactory.contract();

    expect(contractClient).to.be.ok;
  });

  it('should request datapackage data', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var contractClient = clientFactory.contract();

    contractClient.fetchDataPackage(AUTH_CONTRACT_ID)
      .then(response => {
        expect(response.data).to.be.ok;
        expect(response.data.params).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it('should request subscription data', (done) => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    var contractClient = clientFactory.contract();

    contractClient.fetchSubscriptions(AUTH_CONTRACT_ID)
      .then(response => {

        expect(response.data).to.be.ok;
        expect(response.data.subscriptions).to.be.ok;

        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
