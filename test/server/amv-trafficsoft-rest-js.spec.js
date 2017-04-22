import amvTrafficsoftRestJs from '../../src/amv-trafficsoft-rest-js.js';
import nock from 'nock';

describe('amvTrafficsoftRestJs', () => {
  before(() => {

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
    var baseUrl = 'http://www.example.com';
    var server = nock(baseUrl)
         .post('/1/xfcd/last')
         .reply(200, {
           username: 'pgte',
           email: 'pedro.teixeira@gmail.com',
           _id: '4324243fsd'
         });

    var options = {
      username: 'john_doe',
      password: 'password',
      contractId: 1
    };
    var clientFactory = amvTrafficsoftRestJs(baseUrl, options);

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
        //console.log(e);
        //console.log('fuck - got NO data');
        //done();
        done(e);
      });
  });
});
