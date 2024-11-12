del fullchain.pem | Out-Null
Get-Content certificate.crt, ca_bundle.crt | Out-File -Encoding ascii fullchain.pem
kubectl delete secret api-gateway-cert
kubectl create secret generic api-gateway-cert --from-file=ssl-cert.pem=fullchain.pem --from-file=private.key=private.key