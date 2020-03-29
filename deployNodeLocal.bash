#!/usr/bin/env bash
APP="java-tron-1.0.0"

echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

rm -rf ~/java-tron
mkdir ~/java-tron 2>&1
echo "made the directory"

echo "uploading java-tron zip"
cp $4 ~/java-tron/  2>&1
echo "already uploading java-tron zip"

echo "uploading config.conf"
cp $5 ~/java-tron/config.conf 2>&1
echo "already uploading config"

cd ~/java-tron&&unzip -o ${APP}.zip > /dev/null
if [ "$?" != "0" ]; then
   echo "unzip failed, unzip cmd is not installed or java-tron zip upload failed, ${finish}"
   exit
fi

cd -

cp ./.startNode.sh ~/java-tron/start.sh

if [ $6 != "null" ]; then
  echo "uploading plugin"
  cp $6 ~/java-tron/$APP/lib/ 2>&1
  echo "already upload plugin"
fi

echo $9
if [ -z $9 ]; then
   echo "deploy FullNode"
   cd ~/java-tron&& nohup bash start.sh
else
   echo "deploy WitnessNode"
   cd ~/java-tron&& nohup bash start.sh ${9}
fi

rm -rf $5
echo  "${finish}"