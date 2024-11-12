const { join } = require('path');
const gateway = require('express-gateway');


switch (process.env.DEPLOY_ENV) {
    case "render": // keeps the render services active
        const renderSlap= require('./RenderSlap');
        renderSlap(10, 4); // intervals between 6 and 14 minutes
        break;
    case "aws": // creates a server to verify the ssl certificate
        /*const updateNoIpDns= require('./update_no-ip_dns');
        const {getPublicIp, getLoadBalancerHostname}= require('./getPublicIp');
        const updateDns= async () => updateNoIpDns(process.env.NOIP_USER,
            process.env.NOIP_PASSWORD,
            "bienal-backend.ddns.net",
            await getLoadBalancerHostname('api-gateway','bienal-backend'))

        updateDns()
        setInterval(updateDns, // update NoIP dns record
            1000*60*20 // 20 minutes
        );*/

        /*const express = require('express');
        const app= express()
        app.use('/.well-known/pki-validation', express.static(join(__dirname, '.well-known/pki-validation')));
        app.listen(8080, () => {
            console.log('Servidor de verificación de dominio en ejecución en el puerto 8080');
          });*/
        break;
    default:
        break;
}

gateway()
  .load(join(__dirname, 'config'))
  .run();