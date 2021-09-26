# udemy-microservices-nodejs-react
## React App "Blog"
msn - abbreviation for microservices + node
- This Branch has all Blog App's services and React App Dockarized and wired for k8s (tested - works)
- Attemp to make it work with Skaffold

Local Dev Env:
- Host: MacBook Air M1
- OS: Big Sug 11.4
- Docker Desktop: 4.0.1
- Docker Engine: 20.10.8
- Kubernetes: 1.21.2

Prerequisites:
1. setup k8s Load Balancer and Ingress Controller 
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
```
Issue: 
