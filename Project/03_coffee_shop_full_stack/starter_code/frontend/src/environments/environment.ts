/* @TODO replace with your variables
 * ensure all variables on this page match your project
 */

export const environment = {
  production: false,
  apiServerUrl: 'http://127.0.0.1:5000', 
  auth: {
    domain: 'dev-cf7iigxftqtlmxpj.us.auth0.com', 
    clientId: 'rMzuiHsCMMnssZTCF3JGsPrhqqmScpoi', 
    audience: 'https://coffee-shop-api', 
    callbackURL: 'http://localhost:8100/tabs/user',
  },
};
