#!/usr/bin/env bash
APP="java-tron-1.0.0"
echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"
echo $1
echo $2
echo $3
ssh -p $2 $3@$1 -o "${noCheck}" exit
result=$?
echo $result
if [ $result = 0 ];then
  echo "ssh connect successfully"
else
  echo "ssh connect failed"
  exit
fi