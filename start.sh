#!/bin/sh
set -e
mkdir -p /app/data
node node_modules/prisma/build/index.js migrate deploy
node server.js
