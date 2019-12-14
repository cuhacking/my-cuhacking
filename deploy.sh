#!/bin/bash

# Copy server files
scp -r ./routes ./model ./controllers ./helpers ./package.json ./yarn.lock index.js ./config.json  magneton:~/smeargle
scp ./firebase-admin-prod.json magneton:~/smeargle/firebase-admin.json

#TODO: remove server files before copying

# Build and copy client files
rm -r ./client/build
yarn --cwd ./client build
ssh magneton 'rm -r ~/smeargle/client && mkdir -p ~/smeargle/client/build'
scp -r ./client/build magneton:~/smeargle/client

# Run yarn install and restart the server
ssh magneton '~/smeargle/start-service.sh'
