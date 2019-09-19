#!/bin/bash

docker build --no-cache -t spread-hub:latest -f Dockerfile .
docker stack deploy -c docker-compose.yml jatocorp