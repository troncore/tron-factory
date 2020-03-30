#!/usr/bin/env bash
APP="java-tron-1.0.0"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

ssh -p $2 $3@$1 -o "${noCheck}" "rm -rf java-tron"
result=`ssh -p $2 $3@$1 "mkdir java-tron" 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] made the directory"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ssh connect failed, ${finish}"
  exit
fi

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading java-tron zip"
result=`scp -P $2  $4 $3@$1:./java-tron/  2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
 echo "[$time] already uploading java-tron zip"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] update java-tron zip failed, ${finish}"
  exit
fi

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading config.conf"
result=`scp -P $2 $5 $3@$1:./java-tron/config.conf 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] already uploading config"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] update config failed, ${finish}"
  exit
fi

result=`ssh -p $2 $3@$1 "cd java-tron&&unzip -o ./${APP}.zip > /dev/null"`
if [ "$?" != "0" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] unzip failed, unzip cmd is not installed or java-tron zip upload failed, ${finish}"
   exit
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] java-tron zip unzip success"
fi

scp -P $2 ./.startNode.sh $3@$1:./java-tron/start.sh

if [ $6 != "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] uploading plugin"
  result=`scp -P $2 $6 $3@$1:./java-tron/$APP/lib/ 2>&1`

  if [ -z $result ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] already upload plugin"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] update plugin failed"
    exit
  fi
fi

if [ -z $8 ] ; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy FullNode"
   ssh -p $2 $3@$1 "cd java-tron&& nohup bash start.sh"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy WitnessNode"
   ssh -p $2 $3@$1 "cd java-tron&& nohup bash start.sh ${8}"
fi

rm -rf $5
time=$(date "+%Y-%m-%d %H:%M:%S")
echo  "[$time] ${finish}"