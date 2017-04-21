import amvApiClientsFactory from '../../src/amv-trafficsoft-rest-js.js';

describe('amvTrafficsoftRestJs', () => {
  it('should be running without any problems', () => {
    expect(amvApiClientsFactory).to.not.throw();
  });

  it('should create an xfcd client', () => {
    var amvApiClients = amvApiClientsFactory({
       username: '',
       password: '',
       contractId: '',
       baseURL: 'http://www.example.com'
    });

    var xfcdClient = amvApiClients.xfcd();

    expect(xfcdClient).to.be.ok;

  });

});
