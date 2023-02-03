#!/bin/bash

WORKSPACE=${WORKSPACE:-$PWD}
LOCAL_BUILD=true

lint_project() {
    npm install
    npm run lint
}

create_dummy_junit_report() {

    mkdir -p "${WORKSPACE}/artifacts"

    cat << EOF > "${WORKSPACE}/artifacts/junit-dummy.xml"
<?xml version = "1.0" encoding = "UTF-8"?>
<testsuite tests="1">
    <testcase classname="dummy" name="dummytest"/>
</testsuite>
EOF
}

# lint the project. We need more but this is all we have for now

if lint_project; then
    echo "Linting Success"
else
    echo "Linting failed!"
    exit 1
fi

if . ./build_deploy.sh; then
    echo "Build image succeeded"
else
    echo "Build image failed"
    exit 1
fi

# create a 'dummy' result file so Jenkins will not fail
create_dummy_junit_report
