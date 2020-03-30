#!/usr/bin/env bash
APP="java-tron-1.0.0"
time=$(date "+%Y-%m-%d %H:%M:%S")

echo "[$time] Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

rm -rf ~/java-tron
mkdir ~/java-tron 2>&1
echo "[$time] made the directory"

echo "[$time] uploading java-tron zip"
cp $4 ~/java-tron/  2>&1
echo "[$time] already uploading java-tron zip"

echo "[$time] uploading config.conf"
cp $5 ~/java-tron/config.conf 2>&1
echo "[$time] already uploading config"

cd ~/java-tron&&unzip -o ${APP}.zip > /dev/null
if [ "$?" != "0" ]; then
   echo "[$time] unzip failed, unzip cmd is not installed or java-tron zip upload failed, ${finish}"
   exit
fi

cd -

cp ./.startNode.sh ~/java-tron/start.sh

if [ $6 != "null" ]; then
  echo "[$time] uploading plugin"
  cp $6 ~/java-tron/$APP/lib/ 2>&1
  echo "[$time] already upload plugin"
fi

if [ -z $8 ]; then
   echo "[$time] deploy FullNode"
   cd ~/java-tron&& nohup bash start.sh
else
   echo "[$time] deploy WitnessNode"
   cd ~/java-tron&& nohup bash start.sh ${8}
fi

rm -rf $5
echo  "[$time] ${finish}"