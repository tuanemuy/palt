#!/bin/bash

if [ $# -gt 2 ]; then
 exit 0
fi

status=`curl -o /dev/null -s -w %{http_code} $1`

if [[ ${status} =~ 200 ]]; then
 echo "200 OK"
 exit 0
fi

cd `dirname $0`
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm run server:stop
/usr/bin/lsof -t -i:3000
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm run server:run
