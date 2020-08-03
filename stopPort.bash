#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopPort"
############################################################
flag=0
#echo $4 $5 $6 $7 $8
portArray=(${4} ${5} ${6} ${7} ${8})
for port in ${portArray[@]}
do
if [ "$port" = "null" ];then
continue
fi
result=`ssh -p $2 $3@$1 "netstat -an|grep $port"`
if [ ! -z "$result" ]; then
  $flag=1
  echo "$port: stop node failed"
  exit
fi
done

if [ $flag = 0 ]; then
  echo "stop node successfully"
fi





