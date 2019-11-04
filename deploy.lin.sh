#!/bin/bash
docker service rm spread_hub
docker rmi spread-hub:latest

docker build --no-cache -t spread-hub:latest -f Dockerfile .
docker stack deploy -c docker-compose.yml jatocorp