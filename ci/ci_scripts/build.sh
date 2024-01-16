#!/bin/bash

scriptpath="$(readlink -f "$0")"
workdir="${scriptpath%/*}"
cd "${workdir}/../.."

. "ci/ci_scripts/common.sh"

einfo "Building ${name}:${version} ..."
docker build --build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" --build-arg NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL}" --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" --build-arg  NEXTAUTH_URL="${NEXTAUTH_URL}" --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY="${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}" --build-arg NEXT_PUBLIC_SEAMETRIX_KEY="${NEXT_PUBLIC_SEAMETRIX_KEY}" --build-arg RECAPTCHA_SECRET_KEY="${RECAPTCHA_SECRET_KEY}" --build-arg NEXT_PUBLIC_STRAPI_API_URL="${NEXT_PUBLIC_STRAPI_API_URL}" --build-arg NEXT_PUBLIC_RT_URL="${NEXT_PUBLIC_RT_URL}" --build-arg BACKEND_API_URL="${BACKEND_API_URL}" --build-arg IDENTITY_API_URL="${IDENTITY_API_URL}" --build-arg NEXT_PUBLIC_FILE_API_URL="${NEXT_PUBLIC_FILE_API_URL}" --build-arg NEXT_PUBLIC_SEAMETRIX_API_URL="${NEXT_PUBLIC_SEAMETRIX_API_URL}" --build-arg IDENTITY_API_CLIENT_ID="${IDENTITY_API_CLIENT_ID}" --build-arg IDENTITY_API_CLIENT_SECRET="${IDENTITY_API_CLIENT_SECRET}" --build-arg IDENTITY_API_GRANT_TYPE="${IDENTITY_API_GRANT_TYPE}" --build-arg IDENTITY_TOKEN_GRANT_TYPE="${IDENTITY_TOKEN_GRANT_TYPE}" --build-arg PREVIEW_SECRET="${PREVIEW_SECRET}" -f Dockerfile.ci -t "${name}:${version}" .
