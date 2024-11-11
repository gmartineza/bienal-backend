# Bienal API Gateway

## Resumen
Este servicio se va a encargar de redirigir el trafico desde el front end hacia cada servicion correspondiente segun la url de peticion

### Variables de entorno
En las variables de entorno van a estar definidas las url de cada microservicio al que tiene que redirigir el api gateway

## Gateway
Para poder redirigir los servicios usamos [Express Gateway](https://www.express-gateway.io/) que facilita la configuracion del gateway