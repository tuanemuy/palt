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
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm /home/hikaru/.local/share/pnpm/pm2 delete palt-web
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm /home/hikaru/.local/share/pnpm/pm2 start pnpm --name "palt-web" -- start
