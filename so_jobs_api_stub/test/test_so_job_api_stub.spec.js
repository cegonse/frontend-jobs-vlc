const request = require('supertest')
const api = require('../src/api')
const sample = require('./helpers/so_jobs_api_samples.js')


describe('SO Jobs stub', () => {
    it('generates base RSS XML when zero jobs are configured', (done) => {      
        request(api)
            .patch('/test/jobs')
            .send([])
            .set('Content-Type', 'application/json')
            .end(()=> {})

        request(api)
            .get('/jobs/feed')
            .set('Accept', 'application/rss+xml')
            .then((res) => {
                expect(res.text).toBe(sample.withZeroJobs)
                done()
            })
    })

    it('generates a RSS XML with one job when one job is configured', (done) => {      
        const jobs = [
            {
                company: 'First Company',
                title: 'First Job'
            },
            {
                company: 'Second Company',
                title: 'Second Job'
            }
        ]
        
        request(api)
            .patch('/test/jobs')
            .send(jobs)
            .set('Content-Type', 'application/json')
            .end(()=> {})

        request(api)
            .get('/jobs/feed')
            .set('Accept', 'application/xml')
            .then((res) => {
                expect(res.text).toBe(sample.withTwoJobs(jobs[0], jobs[1]))
                done()
            })
    })

    it('generates a RSS XML with two jobs when two jobs are configured', (done) => {      
        const company_name = 'Hello Company'
        const job_title = 'Onion Engineer at Hello Company'
        
        request(api)
            .patch('/test/jobs')
            .send([{
                company: company_name,
                title: job_title
            }])
            .set('Content-Type', 'application/json')
            .end(()=> {})

        request(api)
            .get('/jobs/feed')
            .set('Accept', 'application/xml')
            .then((res) => {
                expect(res.text).toBe(sample.withOneJob(company_name, job_title))
                done()
            })
    })
})
