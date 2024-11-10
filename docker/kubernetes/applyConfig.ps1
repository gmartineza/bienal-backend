kubectl apply (Get-ChildItem -Path .\docker\kubernetes\kubernetes_*.yml | ForEach-Object { "-f", $_.FullName })
& kubectl get deployments --namespace bienal-backend
& kubectl get services --namespace bienal-backend -o wide