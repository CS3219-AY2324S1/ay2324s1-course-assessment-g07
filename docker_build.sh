#!/bin/bash

# Microservices directory
microservices=("chat-service" "collaboration-service" "editor-service" "eval-service" "frontend" "history-service" "matchmaking-service" "question-service" "user-service")
microservices_allowedOrigins=("editor-service" "history-service" "question-service" "user-service")

# Docker repository
repository="imrajsingh"

# Loop through each microservice
for microservice in "${microservices_allowedOrigins[@]}"
# for microservice in "${microservices[@]}"
do
    # Go into the microservice directory
    cd $microservice
    
    # Build the Docker image
    docker build -t $microservice-image --no-cache .
    
    # Tag the Docker image
    docker tag $microservice-image $repository/$microservice-image
    
    # Push the Docker image to the repository
    docker push $repository/$microservice-image
    
    # Go back to the parent directory
    cd ..

    echo "${microservices} built successfully"
    echo ""
done
