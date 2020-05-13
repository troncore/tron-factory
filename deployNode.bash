#!/usr/bin/env bash
APP="java-tron-1.0.0"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start deployment"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh $1"
#finish="deploy finish"
success="deploy successfully!"
failed="deploy failed!"
noCheck="StrictHostKeyChecking no"
Program="program.FullNode"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh connect successfully"

############################################################
#校验端口是否被占用
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check port"
portArray=(${10} ${11} ${12} ${13} ${14})
for port in ${portArray[@]}
do
if [ "$port" = "null" ];then
continue
fi
result=`ssh -p $2 $3@$1 "netstat -an|grep $port"`
if [ ! -z "$result" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $port: port is occupied!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi
done
############################################################

ssh -p $2 $3@$1 -o "${noCheck}" "rm -rf java-tron"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] rm -rf java-tron"

result=`ssh -p $2 $3@$1 "mkdir java-tron" 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] created the directory: ~/java-tron"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] create the directory failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi

###################################
#echo "检验压缩包是否存在"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check the path: $4"
find $4  > /dev/null
if [ $? != 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $4: no such file or directory!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi

###################################
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading java-tron-1.0.0.zip"
result=`scp -P $2  $4 $3@$1:./java-tron/  2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
 echo "[$time] upload java-tron-1.0.0.zip successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload java-tron-1.0.0.zip failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading config.conf"
result=`scp -P $2 $5 $3@$1:./java-tron/config.conf 2>&1`
if [ -z $result ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload config.conf successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload config.conf failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi

result=`ssh -p $2 $3@$1 "cd java-tron&&unzip -o ./${APP}.zip > /dev/null"`
if [ "$?" != "0" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] unzip java-tron-1.0.0.zip failed, unzip cmd is not installed!"
   time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] ${failed}"
   exit
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] unzip java-tron-1.0.0.zip successfully"
fi

############################################################
if [ ${9} != "null" ]; then
  ##远程chainbase.jar路径
  chainbasePath=`ssh -p $2 $3@$1 "cd java-tron/java-tron-1.0.0/lib&&find chainbase*"`
  #用户自定义数据库jar包路径
  dbCustom=${9}
  dbPath=${dbCustom##*/}

  #上传用户自定义jar包
  result=`scp -P $2 ${9} $3@$1:java-tron/java-tron-1.0.0/lib/$chainbasePath  2>&1`
  if [ -z $result ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload ${dbPath} successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload ${dbPath} failed"
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] ${failed}"
    exit
  fi
fi


scp -P $2 ./.startNode.sh $3@$1:./java-tron/start.sh

if [ $6 != "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] uploading plugin"
  result=`scp -P $2 $6 $3@$1:./java-tron/$APP/lib/ 2>&1`

  if [ -z $result ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload plugin successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload plugin failed!"
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] ${failed}"
    exit
  fi
fi

if [ $8 = "null" ] ; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy FullNode"
   ssh -p $2 $3@$1 "cd java-tron&& nohup bash start.sh"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy WitnessNode"
   ssh -p $2 $3@$1 "cd java-tron&& nohup bash start.sh ${8}"
fi

#将pid存到startPid文件中，在执行完start.sh后检查pid是否存在
ssh -p $2 $3@$1 "ps ux |grep $Program |grep -v grep |awk '{print \$2}' > startPid"
ssh -p $2 $3@$1 "echo \$HOSTNAME >> startHostName"
scp -P $2 $3@$1:./startPid .
scp -P $2 $3@$1:./startHostName .
pid=`head -1 startPid`
hostName=`head -1 startHostName`

if [ -z $pid ] ; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  rm -rf startPid startHostName
  rm -rf $5
  exit
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] start java-tron with pid $pid on $hostName"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo  "[$time] ${success}"
  rm -rf startPid startHostName
  rm -rf $5
  exit
fi




