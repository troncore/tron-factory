#!/usr/bin/env bash
APP="java-tron-1.0.0"
success="<remark class='success'>DEPLOY SUCCESS</remark>"
failed="DEPLOY FAILED"
noCheck="StrictHostKeyChecking no"
Program="program.FullNode"

function log {
  scope=$1
  message=$2
  timestamp=$(date "+%s")
  duration=$3

  echo '{"timestap":'${timestamp}', "scope": "'$scope'", "content": "'$message'", "duration":"'$duration'", "success": true}'
}

function log_error {
  scope=$1
  message=$2
  timestamp=$(date "+%s")

  echo '{"timestap":'${timestamp}', "scope": "'$scope'", "content": "'$message'", "success": false}'
}
start=`date +%s`
start_time=`date +'%Y-%m-%d %H:%M:%S'`
log "" "Started at ${start_time}"
log "" "Node Ip: $1"
log "" "Building in workspace $(cd `dirname $0`; pwd)"
log "" "<br/>"

start_check=${timestamp}
log title "Checking..."

#检查连通性
log sub-title "Checking connectivity"
log "" "$ ssh -p $2 $3@$1"
log "" "ssh connect successfully"

#校验端口是否被占用
log sub-title "Checking port availability"
portArray=(${11} ${12} ${13} ${14} ${15})
for port in ${portArray[@]}
do

if [ "$port" = "null" ];then
continue
else
  log "" "$ ssh -p $2 $3@$1 netstat -an|grep $port"
  result=`ssh -p $2 $3@$1 "netstat -an|grep $port"`
  if [ ! -z "$result" ]; then
    log_error "" "The port '$port' is occupied!"
    log_error "" "${failed}"
    exit
  else
    log "" "The port '$port' is available."
  fi
fi
done
log "" "No port is occupied."

end_check=${timestamp}
log sub-title "finish checking" "$((end_check-start_check))"s
log "" "<br/>"

#上传文件
start_upload=${timestamp}
log title "Uploading files..."

#上传config.conf
log sub-title "Uploading config.conf"
log "" "$ scp -P $2 $5 $3@$1:./java-tron-${10}-$7/config.conf"
result=`scp -P $2 $5 $3@$1:./java-tron-${10}-$7/config.conf  2>&1`
if [ -z $result ];then
  log "" "upload config.conf successfully"
else
  log_error "" "upload config.conf failed!"
  log_error "" "${failed}"
  exit
fi

#上传用户自定义jar包
if [ ${9} != "null" ]; then
  ##远程chainbase.jar路径
  log sub-title "Uploading custom chainbase jar"
  log "" "$ ssh -p $2 $3@$1 cd java-tron-${10}-$7/java-tron-1.0.0/lib&&find chainbase*"
  chainbasePath=`ssh -p $2 $3@$1 "cd java-tron-${10}-$7/java-tron-1.0.0/lib&&find chainbase*"`
  #用户自定义数据库jar包路径
  dbCustom=${9}
  dbPath=${dbCustom##*/}

  #上传用户自定义jar包
  log "" "$ scp -P $2 ${9} $3@$1:java-tron-${10}-$7/java-tron-1.0.0/lib/$chainbasePath"
  result=`scp -P $2 ${9} $3@$1:java-tron-${10}-$7/java-tron-1.0.0/lib/$chainbasePath  2>&1`
  if [ -z $result ];then
    log "" "upload ${dbPath} successfully"
  else
    log_error "" "upload ${dbPath} failed!"
    log_error "" "${failed}"
    exit
  fi
fi

#上传用户自定义交易模块plugin
if [ $6 != "null" ]; then
  log sub-title "Uploading custom transaction plugin"
  log "" "$ scp -P $2 $6 $3@$1:./java-tron-${10}-$7/$APP/lib/"
  result=`scp -P $2 $6 $3@$1:./java-tron-${10}-$7/$APP/lib/ 2>&1`
  if [ -z $result ];then
    log "" "upload plugin successfully"
  else
    log_error "" "upload plugin failed!"
    log_error "" "${failed}"
    exit
  fi
fi

end_upload=${timestamp}
log sub-title "finish uploading" "$((end_upload-start_upload))"s
log "" "<br/>"

#部署节点
start_deploy=${timestamp}
log title "Deploying node..."

#判断节点类型
log sub-title "Determining the node type"
if [ $8 = "null" ] ; then
  log "" "deploy FullNode"
  log "" "$ ssh -p $2 $3@$1 cd java-tron-${10}-$7&& nohup bash start.sh"
  ssh -p $2 $3@$1 "cd java-tron-${10}-$7&& nohup bash start.sh"
else
  log "" "deploy WitnessNode"
  log "" "$ ssh -p $2 $3@$1 cd java-tron-${10}-$7&& nohup bash start.sh ${8}"
  ssh -p $2 $3@$1 "cd java-tron-${10}-$7&& nohup bash start.sh ${8}"
fi

#将pid存到startPid文件中，在执行完start.sh后检查pid是否存在
log sub-title "Getting the deployment pid"
log "" "$ ps ux |grep java-tron-${10}-$7/ |grep -v grep |awk {print $2}"
ps ux |grep java-tron-${10}-$7/ |grep -v grep |awk '{print \$2}'
log "" "$ ssh -p $2 $3@$1 ps ux |grep java-tron-${10}-$7/ |grep -v grep |awk {print $2} > startPid"
ssh -p $2 $3@$1 "ps ux |grep java-tron-${10}-$7/ |grep -v grep |awk '{print \$2}' > startPid"
log "" "$ ssh -p $2 $3@$1 echo $HOSTNAME >> startHostName"
ssh -p $2 $3@$1 "echo $HOSTNAME >> startHostName"
log "" "$ scp -P $2 $3@$1:~/startPid /tmp/startPid-${10}-$7"
scp -P $2 $3@$1:~/startPid /tmp/startPid-${10}-$7
log "" "$ scp -P $2 $3@$1:~/startHostName /tmp/startHostName-${10}-$7"
scp -P $2 $3@$1:~/startHostName /tmp/startHostName-${10}-$7
log "" "$ pid=head -1 /tmp/startPid-${10}-$7"
pid=`head -1 /tmp/startPid-${10}-$7`
log "" "$ hostName=head -1 /tmp/startHostName-${10}-$7"
hostName=`head -1 /tmp/startHostName-${10}-$7`

if [ -z $pid ] ; then
  log_error "" "${failed}"
  exit
else
  log "" "start java-tron with pid $pid on $hostName"
fi
end_deploy=${timestamp}
log sub-title "finish deploying" "$((end_deploy-start_deploy))"s
log "" "<br/>"

log sub-title "${success}"
log "" "<br/>"

end=`date +%s`
end_time=`date +'%Y-%m-%d %H:%M:%S'`
log "" "Total time: "$((end-start))"s"
log "" "Finished at: ${end_time}"








