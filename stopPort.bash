#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopPort"
############################################################

result=`ssh -p $2 $3@$1 "netstat -an|grep $4"`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop port successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] stop port failed"
    exit
fi





