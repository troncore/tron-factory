#!/usr/bin/env bash
APP="java-tron-1.0.0"
success="<remark class='success'>DEPLOY SUCCESS</remark>"
failed="DEPLOY FAILED"
noCheck="StrictHostKeyChecking no"
Program="program.FullNode"

#删除java-tron目录
/usr/bin/expect <<lsp
log_user 0
spawn ssh -p $2 $3@$1 -o "${noCheck}"
expect {
"*assword*" {
send "$6\r"
expect "]*"
send "rm -rf java-tron-${5}-$4\r"
expect "]*"
send "exit\r"
}
timeout { send_error "expect_timeout\n";exit 1 }
}
expect eof
lsp

result=$?
if [ $result != 0 ];then
  echo "delete java-tron-${5}-$4 failed"
else
  echo "delete java-tron-${5}-$4 successfully"
fi








