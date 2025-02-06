## WEB_PAG 

I had a task in a university to code simple React pagination app with database. So, i decided to do DevOps thingy with this app.

The app was deployed on bare metal using kubernetes cluster that was configured via ansible on home server. The requests is forwarded via NAT on mikrotik.

**The architecture:**
- 5 Ubuntu live server VM's (1 master node, 2 worker nodes, 1 nginx proxy server, 1 NFS server)
- containerized using Docker
- architecture configured using Ansible
- Deployd to k8s cluster
- Database data persisted to seperate NFS server.

**CI/CD Pipeline**
- GitHub Actions
  - build.yml: build and push 3 docker images to DockerHub in async way.
  - deploy.yml: install kubectl and then restart deployments in k8s cluster using KUBECONFIG.

**Ansible files**

I configured all 5 mashines using ansible playbooks.

The k8s cluster was configured via ansible too, my own playbooks can be found in my github repo. 

In "loadbalancer" folder there are two playbooks: one for apache, other for nginx. Firstly I tried to setup apache, but it didn't really work (the user could recive the frontend, but proxy didn't send request to api..) and I couldn't figure out what was the problem, then I tried NGINX and everything was good.

**K8S files**

You can notice, that I used NodePort type to expose the services. It was used because the cluster was behind the Proxy I set, that's why there is ingress.yaml file, I used it in local minikube setup, but for actual deployment I had to change files a bit. 

## P.S.

This app does not exist now as I practice a lot on the server and I need physical memory, RAM and CPU. That's why CD and Ansible will fail.

Some picture of the app: ]

![Frontend of the app](https://drive.google.com/uc?export=view&id=1Mk151MFIm2jQFz1DDNXHpWdJhDA5EC0O)
