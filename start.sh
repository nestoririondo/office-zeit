#!/bin/sh
mkdir -p /app/data
node_modules/.bin/prisma migrate deploy
node server.js
