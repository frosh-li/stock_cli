#!/bin/bash

datenow=$(date "+%Y-%m-%d")

if [ -n "$1" ]; then
    echo "change datenow"
    datenow=$1
fi
echo $datenow
awk '{print $2, $3, $4}' datas/${datenow}  | sort |   uniq -c | sort -g
