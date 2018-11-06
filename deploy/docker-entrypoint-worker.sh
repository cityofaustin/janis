#!/usr/bin/env bash
echo "-- Entrypoint Executed (docker-entrypoint-prod.sh)"
echo "--    APPLICATION_NAME:   ${APPLICATION_NAME}"
echo "--    DEPLOYMENT_MODE:    ${DEPLOYMENT_MODE}"
echo "--    GOOGLE_ANALYTICS:   ${GOOGLE_ANALYTICS}"
echo "--    FEEDBACK_API:       ${FEEDBACK_API}"
echo "--    CMS_API:            ${CMS_API}"
echo "--    CMS_MEDIA:          ${CMS_MEDIA}"
exec "$@"
