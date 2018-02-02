import amvTrafficsoftRestJs from "../../src/amv-trafficsoft-rest-js.js";
import nock from "nock";

describe('amv-trafficsoft-rest-js', () => {
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
  });

  after(() => {
  });

  it('should be running without any problems', () => {
    expect(() => amvTrafficsoftRestJs()).to.not.throw();
  });

  it('should create a client factory', () => {
    var clientFactory = amvTrafficsoftRestJs(BASE_URL, DEFAULT_OPTIONS);
    expect(clientFactory).to.be.ok;
    expect(clientFactory.xfcd).to.be.ok;
    expect(clientFactory.contract).to.be.ok;
  });

});
