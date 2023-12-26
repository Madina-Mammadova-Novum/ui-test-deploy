#!/bin/bash

scriptpath="$(readlink -f "$0")"
workdir="${scriptpath%/*}"
cd "${workdir}/../.."

. "ci/ci_scripts/common.sh"

einfo "Pushing ${name}:${version} to registry ..."
docker login -u "${docker_admin_user}" -p "${docker_admin_password}" "${docker_image_repo}"
docker push "${docker_image_repo}/${name}:${version}"

