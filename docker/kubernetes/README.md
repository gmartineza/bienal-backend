# Kubernetes Configuration

In this directory, you will find the configuration for the Kubernetes deployments for each microservice. For more information on how to use Kubernetes, please refer to the [Kubernetes Documentation](https://kubernetes.io/docs/home/).

## Sercrets and configmaps
### List of secrets:
- mongodb-uri: uri para acceder a la base de datos

### List of configmaps
- urls-internas:
    - FRONTEND_URL
    - API_GATEWAY_URL
    - SERVICE_GESTION_ESCULTORES_URL
    - SERVICE_GESTION_ESCULTURAS_URL
    - SERVICE_GESTION_EVENTOS_URL
    - SERVICE_REGISTRO_VOTOS_URL
    - SERVICE_GENERADOR_QR_URL
    - SERVICE_AUTENTICACION_URL