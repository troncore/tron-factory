#!/usr/bin/env bash
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$time] start stopPort"
flag=0
portArray=(${4} ${5} ${6} ${7} ${8})
#portArray=("8081" "null" "50051" "null" "18881")
for port in ${portArray[@]}
do
if [ "$port" = "null" ];then
continue
fi
#远程检查端口占用
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1
expect {
"*assword*" {
send "tron\r"
expect "*ogin*"
send "netstat -an|grep $port > /tmp/checkPort.log\r"
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
  set timeout 60
  spawn scp -P $2 $3@$1:/tmp/checkPort.log /tmp/
  expect {
  "*assword*" {
  send "tron\r"
  expect "100%"
  send "\r"
  }
  timeout { send_error "expect_timeout\n";exit 1 }
  }
  expect eof
lsp
result=`cat /tmp/checkPort.log`
if [ ! -z "$result" ]; then
  $flag=1
  echo "[$time] $port: stop node failed"
  exit
fi
done

if [ $flag = 0 ]; then
  echo "stop node successfully"
fi




