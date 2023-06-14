const util = require('util');
const {Issuer, Strategy: OpenIDConnectStrategy} = require('openid-client');

async function fetchOpenIdConfiguration(discoveryURL) {
  try {
    const issuer = await Issuer.discover(discoveryURL);
    return issuer;
  } catch (error) {
    throw new Error(`Failed to fetch OpenID configuration: ${error.message}`);
  }
}

function Strategy(options, verify) {
  options = options || {};
  ['discoveryURL', 'clientID', 'clientSecret', 'callbackURL'].forEach((k) => {
    if (!options[k]) {
      throw new Error(
        'You must provide the ' +
          k +
          ' configuration value to use passport-easyauth.'
      );
    }
  });

  options.discoveryURL = new URL('/tenantbackend', options.discoveryURL);

  fetchOpenIdConfiguration(options.discoveryURL)
    .then((issuer) => {
      const client = new issuer.Client({
        client_id: options.clientID,
        client_secret: options.clientSecret,
        redirect_uris: [options.callbackURL],
        response_types: ['code'],
      });

      options.client = client;
      options.params = {scope: 'openid'};
      OpenIDConnectStrategy.call(this, options, verify);
      this.name = 'easyauth';
    })
    .catch((error) => {
      throw new Error(`Failed to initialize strategy: ${error.message}`);
    });

  this.name = 'easyauth';
}

util.inherits(Strategy, OpenIDConnectStrategy);

exports = module.exports = Strategy;

exports.Strategy = Strategy;
