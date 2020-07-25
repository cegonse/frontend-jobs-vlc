const so_client = require('./stack_overflow_client')
const express = require('express')
const api = express()


let stack_overflow_client = new so_client.StackOverflowClient()


api.get('/jobs', (req, res) => {
    stack_overflow_client.jobs(
        (jobs) => {
            res.json(jobs)
        },
        (cause) => {
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
