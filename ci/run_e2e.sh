#!/bin/bash

function startApp()
{
    cd ./app
    npm build
    npm run start &
    cd ..
}

function e2eTests()
{
    cd ./e2e
    npm test
    cd ..
}

startApp
e2eTests
