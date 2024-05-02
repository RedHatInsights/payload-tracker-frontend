#!/bin/bash

set -exv

IMAGE="quay.io/cloudservices/payload-tracker-frontend"
IMAGE_TAG=$(git rev-parse --short=7 HEAD)
LOCAL_BUILD="${LOCAL_BUILD:-false}"
CONTAINER_ENGINE_CMD=''

# Create tmp dir to store data in during job run (do NOT store in $WORKSPACE)
export TMP_JOB_DIR=$(mktemp -d -p "$HOME" -t "jenkins-${JOB_NAME}-${BUILD_NUMBER}-XXXXXX")
echo "job tmp dir location: $TMP_JOB_DIR"

function job_cleanup() {
    echo "cleaning up job tmp dir: $TMP_JOB_DIR"
    rm -fr $TMP_JOB_DIR
}

trap job_cleanup EXIT ERR SIGINT SIGTERM

DOCKER_CONF="$TMP_JOB_DIR/.docker"
SECURITY_COMPLIANCE_TAG="sc-$(date +%Y%m%d)-$(git rev-parse --short=7 HEAD)"

_command_is_present() {
    command -v "$1" > /dev/null 2>&1
}

_local_build() {
    [ "$LOCAL_BUILD" = true ]
}

_set_container_engine_cmd() {

    if _command_is_present 'docker'; then
        mkdir -p "$DOCKER_CONF"
        CONTAINER_ENGINE_CMD='docker'
    elif _command_is_present 'podman'; then
        CONTAINER_ENGINE_CMD='podman'
    else
        echo "Can't find either docker or podman"
        exit 1
    fi
}

container_engine_cmd() {

    if [ -z "$CONTAINER_ENGINE_CMD" ]; then
        if ! _set_container_engine_cmd; then
            return 1
        fi
    fi

    if [ "$CONTAINER_ENGINE_CMD" = 'podman' ]; then
        podman "$@"
    else
        docker "--config=${DOCKER_CONF}" "$@"
    fi
}

main() {

    if ! _local_build; then

        if [[ -z "$QUAY_USER" || -z "$QUAY_TOKEN" ]]; then
            echo "QUAY_USER and QUAY_TOKEN must be set"
            exit 1
        fi

        if [[ -z "$RH_REGISTRY_USER" || -z "$RH_REGISTRY_TOKEN" ]]; then
            echo "RH_REGISTRY_USER and RH_REGISTRY_TOKEN  must be set"
            exit 1
        fi

        container_engine_cmd login "-u=${QUAY_USER}" "--password-stdin" quay.io <<< "$QUAY_TOKEN"
        container_engine_cmd login "-u=${RH_REGISTRY_USER}" "--password-stdin" registry.redhat.io <<< "$RH_REGISTRY_TOKEN"
    fi

    container_engine_cmd build -t "${IMAGE}:${IMAGE_TAG}" .
    container_engine_cmd tag "${IMAGE}:${IMAGE_TAG}" "${IMAGE}:qa"

    if ! _local_build; then

        if [[ "$GIT_BRANCH" == "origin/security-compliance" ]]; then
            container_engine_cmd tag "${IMAGE}:${IMAGE_TAG}" "${IMAGE}:${SECURITY_COMPLIANCE_TAG}"
            container_engine_cmd push "${IMAGE}:${SECURITY_COMPLIANCE_TAG}"
        else
            container_engine_cmd push "${IMAGE}:${IMAGE_TAG}"
            container_engine_cmd push "${IMAGE}:qa"
        fi
    fi

}

main
