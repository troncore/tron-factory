#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopNode"
############################################################
#获取远程机器的pid
pid=`ssh -p $2 $3@$1 "head -1 /temp/startPid-$4"`
result=`kill -9 $pid`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop node successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] stop node failed"
    exit
fi





