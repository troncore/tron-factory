#!/usr/bin/env bash
APP="java-tron-1.0.0"
echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

#ssh -p $2 $3@$1 -o "${noCheck}" exit
result=`ssh -p $2 $3@$1 "exit" 2>&1`
echo $result
#result=$?
#echo $result
if [ -z "$result" ];then
  echo "ssh connect successfully"
else
  echo "ssh connect failed"
  exit
fi