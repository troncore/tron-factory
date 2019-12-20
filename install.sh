#!/bin/bash
path=`pwd`
cd src/main/webapp/tron-factory-vue-old && yarn install && yarn run build
cd $path && mvn clean install
