#!/bin/bash

cd `dirname $0`
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm /home/hikaru/.local/share/pnpm/pm2 delete palt-web
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm /home/hikaru/.local/share/pnpm/pm2 start pnpm --name "palt-web" -- start
