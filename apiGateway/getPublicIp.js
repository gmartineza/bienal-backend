const axios = require('axios');
const k8s = require('@kubernetes/client-node');

/**
 * Función para obtener la IP pública de la instancia EC2
 * Function to obtain the public ip of the EC2 instance
 * @returns {Promise<string>} Promise with the instance public ip, empty string if there is an error 
 */
async function getPublicIp() {
  try {
    const response = await axios.get('http://169.254.169.254/latest/meta-data/public-ipv4');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo la IP pública:', error);
    return '';
  }
}

async function getLoadBalancerHostname(serviceName, namespace) {
    try {
      const kc = new k8s.KubeConfig();
      kc.loadFromCluster(); // Cargar la configuración desde dentro del pod
  
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
      const response = await k8sApi.readNamespacedService(serviceName, namespace);
  
      const ingress = response.body.status.loadBalancer.ingress;
      ingress.forEach((element) => console.log('ingress: '+ JSON.stringify(element)))
      if (ingress && ingress.length > 0) {
        return ingress[0].hostname || ingress[0].ip;
      } else {
        console.log('No se encontró un nombre de host o IP pública en el LoadBalancer');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo el nombre de host del LoadBalancer:', error);
      return null;
    }
  }

module.exports= {getPublicIp, getLoadBalancerHostname}
