#!/bin/bash

# Microservices directory -- less matchmaking
microservices=("chat-service" "collaboration-service" "editor-service" "eval-service" "frontend" "history-service" "question-service" "user-service")
microservices_allowedOrigins=("editor-service" "history-service" "question-service" "user-service")

# Docker repository
repository="imrajsingh"

# Loop through each microservice
for microservice in "${microservices_allowedOrigins[@]}"
# for microservice in "${microservices[@]}"
do
    # Go into the microservice directory
    cd $microservice
    cd k8
    
    # Uninstall the service
    helm uninstall $microservice
    
    # Install the service (deploy)
    helm install $microservice . -f $microservice-values.yaml
    
    # Go back to the parent directory
    cd ..
    cd ..

    echo "${microservice} deployed successfully"
    echo ""
done
