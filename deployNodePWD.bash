#!/usr/bin/env bash
APP="java-tron-1.0.0"
Program="program.FullNode"

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"

##################################
#检查是否安装expect指令
which expect > /dev/null
if [ $? != 0 ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] expect is not installed, ${finish}"
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
send "lsof -i:$port > ~/java-tron/checkPort.log\r"
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
  echo "[$time] $port: port is occupied, ${finish}"
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
echo "[$time] $1: ssh connect failed, ${finish}"
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
echo "[$time] rm java-tron done"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh connect failed, ${finish}"
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
echo "[$time] made the directory: java-tron"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh connect failed, ${finish}"
exit
fi

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
echo "[$time] upload java-tron-1.0.0.zip failed, ${finish}"
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
echo "[$time] upload config successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] upload config failed, ${finish}"
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
echo "[$time] unzip java-tron-1.0.0.zip failed, unzip cmd is not installed or java-tron-1.0.0.zip upload failed, ${finish}"
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
    echo "[$time] upload ${dbPath} failed, ${finish}"
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
echo "[$time] upload start.sh failed, ${finish}"
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
  echo "[$time] upload plugin failed"
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
   send "cd java-tron&& bash start.sh > startPid.log \r"
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
   send "cd java-tron&& bash start.sh $9 > startPid.log\r"
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

/usr/bin/expect <<lsp
   log_user 0
   spawn scp -p $2 $3@$1:./java-tron/startPid.log .
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

  time=$(date "+%Y-%m-%d %H:%M:%S")
   echo `tail -1 startPid.log`
   rm -rf startPid.log
###################################
rm -rf $5
time=$(date "+%Y-%m-%d %H:%M:%S")
echo  "[$time] ${finish}"