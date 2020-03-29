#!/usr/bin/env bash
APP="java-tron-1.0.0"
Program="program.FullNode"

echo "Start ssh deployment"
finish="deploy finish"
noCheck="StrictHostKeyChecking no"
###################################
#echo "删除java-tron"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"Password*" {
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
echo "rm java-tron done"
else
echo "error"
exit
fi

###################################
#echo "创建java-tron目录"
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1
expect {
"Password*" {
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
echo "made the directory"
else
echo "ssh connect failed, ${finish}"
echo "error"
exit
fi

###################################
#echo "传压缩包"
echo "uploading java-tron zip"

/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2  $4 $3@$1:./java-tron/
expect {
"Password*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
echo "already uploading java-tron zip"
else
echo $?
echo "update java-tron zip failed, ${finish}"
echo "error"
#exit
fi

###################################
#echo "配置文件"
echo "uploading config.conf"

/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2 $5 $3@$1:./java-tron/config.conf
expect {
"Password*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
echo "already uploading config"
else
echo "update config failed, ${finish}"
echo "error"
#exit
fi


###################################
#echo "解压"
/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn ssh -p $2 $3@$1
expect {
"Password*" {
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
echo "ok"
else
echo "unzip failed, unzip cmd is not installed or java-tron zip upload failed, ${finish}"
echo "error"
exit
fi

###################################
#echo "start脚本"
/usr/bin/expect <<lsp
log_user 0
#set timeout 3600
spawn scp -P $2 ./.startNode.sh $3@$1:./java-tron/start.sh
expect {
"Password*" {
send "$7\r"
#expect "]*"
#send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp
if [ $? = 0 ];then
echo "already uploading start.sh"
else
echo "uploading start.sh failed, ${finish}"
echo "error"
#exit
fi


###################################
#echo "插件"
if [ $6 != "null" ]; then
  echo "uploading plugin"

  /usr/bin/expect <<lsp
  log_user 0
  #set timeout 3600
  spawn scp -P $2 $6 $3@$1:./java-tron/$APP/lib/
  expect {
  "Password*" {
  send "$7\r"
  #expect "]*"
  #send "exit\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
  if [ $? = 0 ];then
  echo "already upload plugin"
  else
  echo "update plugin failed"
  echo "error"
  #exit
  fi
fi

###################################
#echo "部署"
if [ -z $9 ]; then
   echo "deploy FullNode"

   /usr/bin/expect <<lsp
   log_user 0
   #set timeout 3600
   spawn ssh -p $2 $3@$1
   expect {
   "Password*" {
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
   echo "run start.sh error"
   exit
   fi

else
   echo "deploy WitnessNode"

   /usr/bin/expect <<lsp
   #set timeout 3600
   log_user 0
   spawn ssh -p $2 $3@$1
   expect {
   "Password*" {
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
   echo "run start.sh error"
   exit
   fi

fi

/usr/bin/expect <<lsp
   log_user 0
   spawn scp -p $2 $3@$1:./java-tron/start.log .
   expect {
   "Password*" {
   send "$7\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
   if [ $? != 0 ];then
   echo "error"
   exit
   fi

   tail -1 start.log
###################################
rm -rf $5
echo  "${finish}"