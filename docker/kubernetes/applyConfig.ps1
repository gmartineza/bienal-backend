kubectl apply (Get-ChildItem -Path .\docker\kubernetes\kubernetes_*.yml | ForEach-Object { "-f", $_.FullName })
& kubectl rollout restart deployment api-gateway gestion-esculturas gestion-escultores gestion-eventos generador-qr registro-votos autorizacion buscador
& kubectl delete --namespace bienal-backend pod --all
& kubectl get deployments --namespace bienal-backend
& kubectl get services --namespace bienal-backend -o wide