#!/usr/bin/env bash
APP="java-tron-1.0.0"
success="<remark class='success'>DEPLOY SUCCESS</remark>"
failed="DEPLOY FAILED"
noCheck="StrictHostKeyChecking no"
Program="program.FullNode"

#删除java-tron目录
result=`ssh -p $2 $3@$1 -o "${noCheck}" "rm -rf java-tron-${5}-$4"`
if [ ! -z "$result" ]; then
  echo "delete java-tron-${5}-$4 failed"
else
  echo "delete java-tron-${5}-$4 successfully"
fi








