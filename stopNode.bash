#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopNode"

############################################################
#将pid存到startPid文件中，在执行完start.sh后检查pid是否存在
pid=`ssh -p $2 $3@$1 "cd .&&cat startPid"`
result=`ssh -p $2 $3@$1 "kill -9 $pid"`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop $pid successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] stop $pid failed"
    exit
fi





