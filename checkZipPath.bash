#!/usr/bin/env bash
###################################
#echo "检验压缩包是否存在"
echo $0
echo $1
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check java-tron-1.0.0.zip path"
find $1  > /dev/null
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] find java-tron-1.0.0.zip successfully"
else
  echo "[$time] can't find java-tron-1.0.0.zip, ${finish}"
  exit
fi
###################################