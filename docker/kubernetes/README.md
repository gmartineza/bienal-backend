# Kubernetes Configuration

In this directory, you will find the configuration for the Kubernetes deployments for each microservice. For more information on how to use Kubernetes, please refer to the [Kubernetes Documentation](https://kubernetes.io/docs/home/).

## Sercrets and configmaps
### List of secrets:
- mongodb-uri: 
    - MONGODB_URI: Database URI
- api-gateway-cert: Ssl certificates
    - ssl-cert.pem
    - ssl-key.pem
- cloudinary-apikeys-escultores:
    - CLOUDINARY_CLOUD_NAME
    - CLOUDINARY_API_KEY
    - CLOUDINARY_API_SECRET
- cloudinary-apikeys-esculturas:
    - CLOUDINARY_CLOUD_NAME
    - CLOUDINARY_API_KEY
    - CLOUDINARY_API_SECRET
- cloudinary-apikeys-eventos:
    - CLOUDINARY_CLOUD_NAME
    - CLOUDINARY_API_KEY
    - CLOUDINARY_API_SECRET
- firebase-key:
    - file: firebase-key.json
- qr-secret-key:
    - SECRET_KEY

- noip-auth: Auth to update dns
    - NOIP_USER
    - NOIP_PASSWORD

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