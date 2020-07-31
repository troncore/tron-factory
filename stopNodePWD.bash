#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopNode"
pid=`head -1 /tmp/startPid-$5-$4`
echo $pid
/usr/bin/expect <<lsp
   log_user 0
   set timeout 20
   spawn ssh -p $2 $3@$1
   expect {
   "*assword*" {
   send "$6\r"
   expect "]*"
   send "kill -9 $pid >/tmp/stopPid-$5-$4 2>&1 \r"
   expect "]*"
   send "exit\r"
   }
   timeout { send_error "expect_timeout\n";exit 1 }
   }
   expect eof
lsp
############################################################
#将远程停止节点结果传到本地
/usr/bin/expect <<lsp
  log_user 0
  set timeout 3600
  spawn scp -P $2 $3@$1:/tmp/stopPid-$5-$4 /tmp/stopPid-$5-$4
  expect {
  "*assword*" {
  send "$6\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
result=`cat /tmp/stopPid-$5-$4`
if [ -z "$result" ]; then
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop node successfully"
else
  time=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$time] stop node failed"
  exit
fi







