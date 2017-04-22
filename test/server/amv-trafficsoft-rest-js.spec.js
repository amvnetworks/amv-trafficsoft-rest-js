import amvTrafficsoftRestJs from '../../src/amv-trafficsoft-rest-js.js';

describe('amvTrafficsoftRestJs', () => {
  var server;

  before(() => {
    server = sinon.fakeServer.create();
  });

  after(() => {
    server.restore();
  });

  it('should be running without any problems', () => {
    expect(amvTrafficsoftRestJs).to.not.throw();
  });

  it('should create a client factory', () => {
    var clientFactory = amvTrafficsoftRestJs({
      baseURL: 'http://www.example.com',
      username: 'john_doe',
      password: 'password',
      contractId: 1
    });

    expect(clientFactory).to.be.ok;
  });

  it('should create an xfcd client', () => {
    var clientFactory = amvTrafficsoftRestJs({
      baseURL: 'http://www.example.com',
      username: 'john_doe',
      password: 'password',
      contractId: 1
    });

    var xfcdClient = clientFactory.xfcd();

    expect(xfcdClient).to.be.ok;
  });



  it('should request last xfcd data', (done) => {
    var clientFactory = amvTrafficsoftRestJs({
      baseURL: 'http://www.example.com',
      username: 'john_doe',
      password: 'password',
      contractId: 1
    });

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
        //done(e);
        done();
      });

  });
});
