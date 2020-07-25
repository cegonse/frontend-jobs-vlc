const so_client = require('./stack_overflow_client')
const express = require('express')
const api = express()


let stack_overflow_client = new so_client.StackOverflowClient()


api.get('/jobs', (req, res) => {
    stack_overflow_client.jobs(
        (jobs) => {
            console.log('JSON StackOverflow Jobs: \n' + JSON.stringify(jobs) + '\n')
            res.json(jobs)
        },
        (cause) => {
            console.log('StackOverflow Jobs request failed: ' + cause)
            res.setHeader('X-FrontendVlcJobs-FailureCause', JSON.stringify({
                culprit: 'stackoverflow_jobs',
                cause: cause
            }))
            res.json([])
        }
    )
})

api.setStackOverflowClient = (client) => {
    stack_overflow_client = client
}

module.exports = api
