#!/bin/bash

datenow=$(date "+%Y-%m-%d")
awk  '{print $4}' datas/${datenow}  |sort |   uniq -c | sort -g
