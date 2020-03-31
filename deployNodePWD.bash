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

##################################
#校验IP，密码正确性，是否成功连接目标主机
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
echo "[$time] can't find java-tron-1.0.0.zip, ${finish}"
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

###################################
#echo "部署"
if [ -z $9 ]; then
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
   send "cd java-tron&& bash start.sh > start.log \r"
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
   send "cd java-tron&& bash start.sh ${9} > start.log\r"
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
   spawn scp -p $2 $3@$1:./java-tron/start.log .
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
   echo `tail -1 start.log`
   rm -rf start.log
###################################
rm -rf $5
time=$(date "+%Y-%m-%d %H:%M:%S")
echo  "[$time] ${finish}"