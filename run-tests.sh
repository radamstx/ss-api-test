#!/bin/bash

if [[ "$CI" == "true" ]]; then
    mkdir -p test-results
    JEST_JUNIT_OUTPUT=test-results/junit.xml ./node_modules/.bin/jest --ci --testResultsProcessor="jest-junit"
else
    ./node_modules/.bin/jest
fi

