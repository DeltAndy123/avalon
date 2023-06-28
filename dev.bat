@echo off
tsc-watch --onCompilationStarted "ts-purify -s src -d dist" --onSuccess "node ./dist/index.js"