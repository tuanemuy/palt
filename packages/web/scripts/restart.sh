#!/bin/bash

cd `dirname $0`
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm run server:stop
/home/hikaru/.anyenv/envs/nodenv/shims/pnpm run server:run
