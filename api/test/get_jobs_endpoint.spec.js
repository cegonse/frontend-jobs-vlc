const request = require('supertest')
const api = require('../src/api')
const so_client_mock = require('./helpers/stack_overflow_client_mock')


describe('GET /jobs endpoint', () => {
    let stack_overflow_client = null
    
    beforeAll(() => {
        stack_overflow_client = new so_client_mock.StackOverflowClientMock()
        api.setStackOverflowClient(stack_overflow_client)
    })

    it('reports zero jobs when Stack Overflow has zero open listings', (done) => {
        const expected_jobs = []
        
        stack_overflow_client.givenJobsResponseIs(expected_jobs)

        request(api)
            .get('/jobs')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).toEqual(expected_jobs)
                done()
            })
    })

    it('reports one job when Stack Overflow has one open listing', (done) => {
        const expected_jobs = [
            {
                company: 'Potatoes Inc',
                title: 'Bicycle QA Tester'
            }
        ]
        
        stack_overflow_client.givenJobsResponseIs(expected_jobs)
        
        request(api)
            .get('/jobs')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).toEqual(expected_jobs)
                done()
            })
    })
    
    it('reports two jobs when Stack Overflow has two open listings', (done) => {
        const expected_jobs = [
            {
                company: 'Potatoes Inc',
                title: 'Bicycle QA Tester'
            },
            {
                company: 'Company SA',
                title: 'Developer'
            }
        ]
        
        stack_overflow_client.givenJobsResponseIs(expected_jobs)
        
        request(api)
            .get('/jobs')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).toEqual(expected_jobs)
                done()
            })
    })
})
