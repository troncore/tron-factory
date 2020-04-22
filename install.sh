#!/bin/bash -il
path=`pwd`
#cd src/main/webapp/tron-factory-vue && yarn install && yarn run build
cd $path && mvn clean install
