#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopNode"

############################################################
#获取远程机器的pid
result=`ssh -p $2 $3@$1 "cd ~&&head -1 startPid | xargs kill -9"`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop $pid successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] stop $pid failed"
    exit
fi





