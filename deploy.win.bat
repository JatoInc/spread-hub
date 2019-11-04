REM !/bin/bash
docker service rm jatocorp_spread_hub
docker rmi spread-hub:latest -f

docker build --no-cache -t spread-hub:latest -f Dockerfile .
docker stack deploy -c docker-compose.yml jatocorp