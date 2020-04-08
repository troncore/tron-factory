#!/usr/bin/env bash
APP="java-tron-1.0.0"
Program="program.FullNode"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start deployment"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh $1"
#finish="deploy finish"
success="deploy successfully!"
failed="deploy failed!"
noCheck="StrictHostKeyChecking no"

##################################
#检查是否安装expect指令
which expect > /dev/null
if [ $? != 0 ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] expect is not installed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
exit
fi
###################################
#echo "检测端口"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] check port"
portArray=(${11} ${12} ${13} ${14} ${15})
for port in ${portArray[@]}
do
if [ "$port" = "null" ];then
continue
fi
#远程检查端口占用
/usr/bin/expect <<lsp
log_user 0
spawn ssh -P $2 $3@$1
expect {
"*assword*" {
send "$7\r"
expect "]*"
send "netstat -anp|grep $port > ~/java-tron/checkPort.log\r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
#检查结果传到本地
/usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn scp -P $2 $3@$1:~/java-tron/checkPort.log /tmp/
  expect {
  "*assword*" {
  send "$7\r"
  #expect "]*"
  #send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
result=`cat /tmp/checkPort.log`
if [ ! -z "$result" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $port: port is occupied!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
fi
done

##################################
# 校验IP，密码正确性，是否成功连接目标主机
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"*assword*" {
send "$7\r"
expect {
"]*"
{ send "exit\r" }
timeout { send_error "expect_timeout\n";exit 1 }
}
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh connect successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $1: ssh connect failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
exit
fi
###################################
#echo "删除java-tron"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"*assword*" {
send "$7\r"
expect "]*"
send "rm -rf java-tron\r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] rm -rf java-tron"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ssh connect failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
exit
fi

###################################
#echo "创建java-tron目录"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1
expect {
"*assword*" {
send "$7\r"
expect "]*"
send "mkdir java-tron\r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
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
#echo "传压缩包"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading java-tron-1.0.0.zip"

/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2  $4 $3@$1:./java-tron/
expect {
"*assword*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload java-tron-1.0.0.zip successfully"
else
echo $?
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload java-tron-1.0.0.zip failed!"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ${failed}"
#exit
fi

###################################
#echo "配置文件"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading config.conf"

/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2 $5 $3@$1:./java-tron/config.conf
expect {
"*assword*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload config.conf successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload config.conf failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
#exit
fi


###################################
#echo "解压"
/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn ssh -p $2 $3@$1
expect {
"*assword*" {
send "$7\r"
expect "]*"
send "cd java-tron&&unzip -o ./${APP}.zip > /dev/null \r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] unzip java-tron-1.0.0.zip successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] unzip java-tron-1.0.0.zip failed, unzip cmd is not installed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
exit
fi

###################################
if [ ${10} != "null" ]; then
  #获取原chainbase.java名字，并保存在远程服务器~/java-tron/dbJarName文件中
  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn ssh -p $2 $3@$1
  expect {
  "*assword*" {
  send "$7\r"
  expect "]*"
  send "cd java-tron/java-tron-1.0.0/lib&&find chainbase* >~/java-tron/dbJarName\r"
  expect "]*"
  send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp

  #将远程dbJarName文件传到本地家目录下
  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn scp -P $2 $3@$1:~/java-tron/dbJarName /tmp/
  expect {
  "*assword*" {
  send "$7\r"
  #expect "]*"
  #send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp

  ##远程chainbase.jar路径
  chainbasePath=`cat /tmp/dbJarName`
  #用户自定义数据库jar包路径
  dbCustom=${10}
  dbPath=${dbCustom##*/}

  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn scp -P $2 ${10} $3@$1:java-tron/java-tron-1.0.0/lib/$chainbasePath
  expect {
  "*assword*" {
  send "$7\r"
  #expect "]*"
  #send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
  #上传用户自定义jar包
  #result=`scp -P $2 ${10} $3@$1:java-tron/java-tron-1.0.0/lib/$chainbasePath  2>&1`
  if [ $? = 0 ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] upload ${dbPath} successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload ${dbPath} failed!"
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] ${failed}"
    exit
  fi
fi
############################################################

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] uploading start.sh"
#echo "start脚本"
/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2 ./.startNode.sh $3@$1:./java-tron/start.sh
expect {
"*assword*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload start.sh successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload start.sh failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
#exit
fi


###################################
#echo "插件"
if [ $6 != "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] uploading plugin"

  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn scp -P $2 $6 $3@$1:./java-tron/$APP/lib/
  expect {
  "*assword*" {
  send "$7\r"
  #expect "]*"
  #send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
  if [ $? = 0 ];then
    time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] upload plugin successfully"
  else
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] upload plugin failed!"
    time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$time] ${failed}"
  #exit
  fi
fi

#echo "部署"
if [ $9 = "null" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy FullNode"
   /usr/bin/expect <<lsp
   log_user 0
   set timeout 20
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "cd java-tron&& bash start.sh \r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
     time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] run start.sh error"
   exit
   fi

else
  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] deploy WitnessNode"

   /usr/bin/expect <<lsp
   set timeout 20
   log_user 0
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "cd java-tron&& bash start.sh $9\r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
     time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] run start.sh error"
   exit
   fi

fi

###################################输出远端进程pid和远端hostname，保存到startPid文件
/usr/bin/expect <<lsp
   log_user 0
   set timeout 20
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$7\r"
   expect "]*"
   send "ps ux |grep $Program |grep -v grep |awk '{print \\\$2}' > startPid \r"
   expect "]*"
   send "echo \\\$HOSTNAME >> startPid \r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp

   ######################复制远端进程pid和远端hostname到本地
/usr/bin/expect <<lsp
   log_user 0
   spawn scp -P $2 $3@$1:./startPid .
   expect {
   "*assword*" {
   send "$7\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
   time=$(date "+%Y-%m-%d %H:%M:%S")
   echo "[$time] error"
   exit
   fi

pid=`head -1 startPid`
hostname=`tail -1 startPid`

#if [ -z $hostname ] ; then
 # host=""
#else
 # host="on $hostname"
#fi

if [ -z $pid ] ; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
  exit
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] start java-tron with pid $pid on $hostname"
  echo  "[$time] ${success}"
  exit
fi

rm -rf startPid
###################################
rm -rf $5
time=$(date "+%Y-%m-%d %H:%M:%S")
echo  "[$time] ${success}"