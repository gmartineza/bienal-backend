kubectl apply -f docker/kubernetes/kurbernetes.yaml 
& kubectl get deployments --namespace bienal-backend
& kubectl get services --namespace bienal-backend -o wide