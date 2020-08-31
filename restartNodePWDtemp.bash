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

start_basiccheck=${timestamp}
log title "Basic Checking..."

#检查是否安装expect指令
log sub-title "Checking if 'expect' is installed"
log "" "$ which expect"
which expect > /dev/null
if [ $? != 0 ]; then
  log_error "" "expect is not installed!"
  log_error "" "${failed}"
exit
fi
log "" "expect is installed"

#检查连通性
log sub-title "Checking connectivity"
log "" "$ ssh -p $2 $3@$1"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"*assword*" {
send "$7\r"
expect {
"*ogin*"
{ send "exit\r" }
timeout { send_error "expect_timeout\n";exit 1 }
}
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  log "" "ssh connect successfully"
else
  log_error "" "$1: ssh connect failed!"
  log_error "" "${failed}"
exit
fi
end_basiccheck=${timestamp}
log sub-title "finish basic checking" "$((end_basiccheck-start_basiccheck))"s
log "" "<br/>"

#校验端口是否被占用
start_othercheck=${timestamp}
log title "Other Checking..."

log sub-title "Checking port availability"
portArray=(${12} ${13} ${14} ${15} ${16})
for port in ${portArray[@]}
do
if [ "$port" = "null" ];then
continue
else
#远程检查端口占用
log "" "$ ssh -p $2 $3@$1 netstat -an|grep $port > ~/java-tron-${11}-$8/checkPort.log"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1
expect {
"*assword*" {
send "$7\r"
expect "*ogin*"
send "netstat -an|grep $port > ~/java-tron-${11}-$8/checkPort.log\r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
#检查结果传到本地
log "" "$ scp -P $2 $3@$1:~/java-tron-${11}-$8/checkPort.log /tmp/"
/usr/bin/expect <<lsp
  log_user 0
  set timeout 60
  spawn scp -P $2 $3@$1:~/java-tron-${11}-$8/checkPort.log /tmp/
  expect {
  "*assword*" {
  send "$7\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
log "" "$ cat /tmp/checkPort.log"
result=`cat /tmp/checkPort.log`
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
end_othercheck=${timestamp}
log sub-title "finish other checking" "$((end_othercheck-start_othercheck))"s
log "" "<br/>"

#上传文件
start_upload=${timestamp}
log title "Uploading files..."

#上传config.conf
log sub-title "Uploading config.conf"
log "" "$ scp -P $2 $5 $3@$1:./java-tron-${11}-$8/config.conf"
/usr/bin/expect <<lsp
log_user 0
set timeout 60
spawn scp -P $2 $5 $3@$1:./java-tron-${11}-$8/config.conf
expect {
"*assword*" {
send "$7\r"
expect "100%"
send "\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  log "" "upload config.conf successfully"
else
  log_error "" "upload config.conf failed!"
  log_error "" "${failed}"
  exit
fi

#上传用户自定义jar包
if [ ${10} != "null" ]; then
  log sub-title "Uploading custom chainbase jar"
  #获取原chainbase.java名字，并保存在远程服务器~/java-tron/dbJarName文件中
  log "" "$ cd java-tron/java-tron-1.0.0/lib&&find chainbase* >~/java-tron-${11}-$8/dbJarName"
  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn ssh -p $2 $3@$1
  expect {
  "*assword*" {
  send "$7\r"
  expect "]*"
  send "cd java-tron/java-tron-1.0.0/lib&&find chainbase* >~/java-tron-${11}-$8/dbJarName\r"
  expect "]*"
  send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp

  #将远程dbJarName文件传到本地家目录下
  log "" "$ scp -P $2 $3@$1:~/java-tron-${11}-$8/dbJarName /tmp/"
  /usr/bin/expect <<lsp
  log_user 0
  set timeout 3600
  spawn scp -P $2 $3@$1:~/java-tron-${11}-$8/dbJarName /tmp/
  expect {
  "*assword*" {
  send "$7\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp

  ##远程chainbase.jar路径
  log "" "$ cat /tmp/dbJarName"
  chainbasePath=`cat /tmp/dbJarName`
  #用户自定义数据库jar包路径
  dbCustom=${10}
  dbPath=${dbCustom##*/}

  log "" "$ scp -P $2 ${10} $3@$1:java-tron-${11}-$8/java-tron-1.0.0/lib/$chainbasePath"
  /usr/bin/expect <<lsp
  log_user 0
  set timeout 3600
  spawn scp -P $2 ${10} $3@$1:java-tron-${11}-$8/java-tron-1.0.0/lib/$chainbasePath
  expect {
  "*assword*" {
  send "$7\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
  #上传用户自定义jar包
  if [ $? = 0 ];then
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
  log "" "$ scp -P $2 $6 $3@$1:./java-tron-${11}-$8/$APP/lib/"
  /usr/bin/expect <<lsp
  log_user 0
  set timeout 3600
  spawn scp -P $2 $6 $3@$1:./java-tron-${11}-$8/$APP/lib/
  expect {
  "*assword*" {
  send "$7\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
  if [ $? = 0 ];then
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
if [ $9 = "null" ]; then
  log "" "deploy FullNode"
  log "" "$ ssh -p $2 $3@$1 cd java-tron-${11}-$8&& bash start.sh"
  /usr/bin/expect <<lsp
   log_user 0
   set timeout 20
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "cd java-tron-${11}-$8&& bash start.sh \r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
  if [ $? != 0 ];then
     log_error "" "[$time] run start.sh error"
     log_error "" "${failed}"
     exit
  fi

else
  log "" "deploy WitnessNode"
  log "" "$ ssh -p $2 $3@$1 cd java-tron-${11}-$8&& bash start.sh $9"
  /usr/bin/expect <<lsp
   set timeout 20
   log_user 0
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "cd java-tron-${11}-$8&& bash start.sh $9\r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
     log_error "" "[$time] run start.sh error"
     log_error "" "${failed}"
     exit
   fi

fi

###################################输出远端进程pid和远端hostname，保存到startPid文件
log "" "$ ssh -p $2 $3@$1 ps ux |grep java-tron-${11}-$8/ |grep -v grep |awk '{print \\\$2}' > startPid"
/usr/bin/expect <<lsp
   log_user 0
   set timeout 20
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "ps ux |grep java-tron-${11}-$8/ |grep -v grep |awk '{print \\\$2}' > startPid \r"
   expect "]*"
   send "echo \\\$HOSTNAME > startHostName \r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp

   ######################复制远端进程pid到本地
log "" "$ scp -P $2 $3@$1:~/startPid /tmp/startPid-${11}-$8"
/usr/bin/expect <<lsp
   log_user 0
   set timeout 60
   spawn scp -P $2 $3@$1:~/startPid /tmp/startPid-${11}-$8
   expect {
   "*assword*" {
   send "$7\r"
   expect "100%"
   send "\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
     log_error "" "copy pid to local failed"
     log_error "" "${failed}"
     exit
   fi
######################复制远端hostname到本地
log "" "$ scp -P $2 $3@$1:~/startHostName /tmp/startHostName-${11}-$8"
/usr/bin/expect <<lsp
   log_user 0
   set timeout 60
   spawn scp -P $2 $3@$1:~/startHostName /tmp/startHostName-${11}-$8
   expect {
   "*assword*" {
   send "$7\r"
   expect "100%"
   send "\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
     log_error "" "copy hostname to local failed"
     log_error "" "${failed}"
     exit
   fi

log "" "$ pid=head -1 /tmp/startPid-${11}-$8"
pid=`head -1 /tmp/startPid-${11}-$8`
log "" "$ hostname=head -1 /tmp/startHostName-${11}-$8"
hostname=`head -1 /tmp/startHostName-${11}-$8`

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








