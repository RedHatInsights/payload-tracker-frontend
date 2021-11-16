#!/bin/bash

APP_NAME="payload-tracker"
COMPONENT_NAME="payload-tracker-frontend"
IMAGE="quay.io/cloudservices/payload-tracker-frontend"

# lint the project. We need more but this is all we have for now
npm run lint

if [ $? -eq 0 ]; then
    echo "Linting Success"
else
    exit 1
fi

