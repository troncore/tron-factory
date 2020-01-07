#!/bin/bash
while true; do
  pid=`ps -ef | grep tron-factory | grep java | grep -v grep | awk '{print $2}'`
  if [ -n "$pid" ]; then
    kill -15 $pid
    echo "ending one click deployment process"
    sleep 1
  else
    echo "tron one click deployment killed successfully!"
    break
  fi
done
nohup java -jar target/deployment-0.0.1-SNAPSHOT.jar&
sleep 10
echo "service ok!"
#cd src/main/webapp/tron-factory-vue && nohup yarn start&

