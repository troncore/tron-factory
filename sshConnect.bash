#!/usr/bin/env bash
APP="java-tron-1.0.0"
ip, port+"", userName
echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

ssh -p $2 $3@$1 exit
#result=`ssh -p $2 $3@$1 "mkdir java-tron" 2>&1`
echo $?
if [ $? = 0 ];then
  echo "ssh connect success"
else
  echo "ssh connect failed"
  exit
fi