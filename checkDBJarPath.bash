#!/usr/bin/env bash
###################################
#echo "检验压缩包是否存在"
echo $0
dbPath=$1
dbJar=${dbPath##*/}

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check dbJar path"
find $1  > /dev/null
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $dbJar, find jar successfully"
else
  echo "[$time] $dbJar: no such file or directory!"
  exit
fi
###################################