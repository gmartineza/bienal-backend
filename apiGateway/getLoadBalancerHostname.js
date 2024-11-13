const k8s = require('@kubernetes/client-node');


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

module.exports= getLoadBalancerHostname
