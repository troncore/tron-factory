#!/usr/bin/env bash
APP="java-tron-1.0.0"
Program="program.FullNode"
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] ssh $1"
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
# 校验IP，密码正确性，是否成功连接目标主机
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"*assword*" {
send "$4\r"
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
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ssh connect successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] $1: ssh connect failed!"
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] ${failed}"
exit
fi

