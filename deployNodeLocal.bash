#!/usr/bin/env bash
APP="java-tron-1.0.0"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

rm -rf ~/java-tron
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] rm java-tron done"

mkdir ~/java-tron 2>&1
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] made the directory: java-tron"

###################################
#echo "检验压缩包是否存在"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check java-tron-1.0.0.zip path"
find $4  > /dev/null
if [ $? != 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] Please upload java-tron.1.0.0.zip generated after java-tron build, ${finish}"
exit
fi

###################################
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading java-tron-1.0.0.zip"
cp $4 ~/java-tron/  2>&1
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload java-tron-1.0.0.zip successfully"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading config.conf"
cp $5 ~/java-tron/config.conf 2>&1
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload config successfully"

cd ~/java-tron&&unzip -o ${APP}.zip > /dev/null
if [ "$?" != "0" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] unzip java-tron-1.0.0.zip failed, unzip cmd is not installed or java-tron-1.0.0.zip upload failed, ${finish}"
   exit
fi

############################################################

if [ ${10} != "null" ]; then
  ##远程chainbase.jar路径
  chainbasePath=`cd java-tron/java-tron-1.0.0/lib&&find chainbase*`
  #用户自定义数据库jar包路径
  dbCustom=${10}
  dbPath=${dbCustom##*/}

  #上传用户自定义jar包
  result=`cp ${10} ~/java-tron/java-tron-1.0.0/lib/$chainbasePath  2>&1`
  if [ -z $result ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload ${dbPath} successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload ${dbPath} failed, ${finish}"
    exit
  fi
fi
############################################################

cd - > /dev/null

cp ./.startNode.sh ~/java-tron/start.sh

if [ $6 != "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] uploading plugin"
  cp $6 ~/java-tron/$APP/lib/ 2>&1
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload plugin successfully"
fi
############################################################
#校验端口是否被占用
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check port"
result=`netstat -an | grep $9`
echo result;
if [ ! -z "$result" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $9: port is occupied, ${finish}"
  exit
fi
############################################################

if [ -z $8 ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy FullNode"
   cd ~/java-tron&& nohup bash start.sh
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy WitnessNode"
   cd ~/java-tron&& nohup bash start.sh ${8}
fi

rm -rf $5
time=$(date "+%Y-%m-%d %H:%M:%S")
echo  "[$time] ${finish}"