#!/usr/bin/env bash
APP="java-tron-1.0.0"
echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"
#String ip, int port, String userName
ssh -p $2 $3@$1 exit
#result=`ssh -p $2 $3@$1 "mkdir java-tron" 2>&1`
#echo $?
if [ $? = 0 ];then
  echo "ssh connect successfully"
else
  echo "ssh connect failed"
  exit
fi