#!/usr/bin/env bash
APP="java-tron-1.0.0"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

ssh -p $2 $3@$1 -o "${noCheck}" "rm -rf java-tron"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh connect success"
echo "[$time] rm java-tron done"

result=`ssh -p $2 $3@$1 "mkdir java-tron" 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] made the directory: java-tron"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ssh connect failed, ${finish}"
  exit
fi

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading java-tron-1.0.0.zip"
result=`scp -P $2  $4 $3@$1:./java-tron/  2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
 echo "[$time] already uploaded java-tron-1.0.0.zip"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload java-tron-1.0.0.zip failed, ${finish}"
  exit
fi

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading config.conf"
result=`scp -P $2 $5 $3@$1:./java-tron/config.conf 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] already uploaded config"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload config failed, ${finish}"
  exit
fi

result=`ssh -p $2 $3@$1 "cd java-tron&&unzip -o ./${APP}.zip > /dev/null"`
if [ "$?" != "0" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] unzip java-tron-1.0.0.zip failed, unzip cmd is not installed or java-tron-1.0.0.zip upload failed, ${finish}"
   exit
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] unzip java-tron-1.0.0.zip success"
fi

scp -P $2 ./.startNode.sh $3@$1:./java-tron/start.sh

if [ $6 != "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] uploading plugin"
  result=`scp -P $2 $6 $3@$1:./java-tron/$APP/lib/ 2>&1`

  if [ -z $result ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] already uploaded plugin"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload plugin failed"
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