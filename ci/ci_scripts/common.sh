#!/bin/bash

einfo() {
    echo ">>> [INFO] $*"
}

eerror() {
    echo ">>> [ERROR] $*"
}

environment_name="${ENVIRONMENT_NAME}"

git_latestcommit="$(git log -1 --date='short' --format='%h-%ad')"
version="${git_latestcommit}_${CI_JOB_ID}"
name='shiplink-frontend'
