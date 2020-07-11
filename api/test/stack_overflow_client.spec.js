import fetchMock from "fetch-mock"
import { StackOverflowClient } from '../src/stack_overflow_client'


describe('StackOverflow API Client', () => {
    afterEach(() => {
        fetchMock.restore()
    })
    
    it('requests RSS feed to StackOverflow and parses zero jobs', (done) => {
        const stack_overflow_client = new StackOverflowClient()
        const expected_stackoverflow_response = `
        <?xml version="1.0" encoding="utf-8"?>
        <rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
            <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
                <os:totalResults>0</os:totalResults>
            </channel>
        </rss>`
        
        fetchMock.mock('https://stackoverflow.com/jobs/feed?q=frontend&l=valencia&u=Km&d=20', {
            body: expected_stackoverflow_response,
            status: 200
        })
        
        stack_overflow_client.jobs((jobs) => {
            expect(jobs).toEqual([])
            done()
        })
    })
    
    it('requests RSS feed to StackOverflow and parses one job', (done) => {
        const stack_overflow_client = new StackOverflowClient()
        const expected_stackoverflow_response = `
        <?xml version="1.0" encoding="utf-8"?>
        <rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
            <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
                <os:totalResults>1</os:totalResults>
                <item>
                    <a10:author>
                        <a10:name>Hello Inc</a10:name>
                    </a10:author>
                    <title>Junior Coffee Brewer</title>
                </item>
            </channel>
        </rss>`
        
        fetchMock.mock('https://stackoverflow.com/jobs/feed?q=frontend&l=valencia&u=Km&d=20', {
            body: expected_stackoverflow_response,
            status: 200
        })
        
        stack_overflow_client.jobs((jobs) => {
            expect(jobs).toEqual([
                {
                    company: 'Hello Inc',
                    title: 'Junior Coffee Brewer'
                }
            ])
            done()
        })
    })
    
    it('requests RSS feed to StackOverflow and parses two jobs', (done) => {
        const stack_overflow_client = new StackOverflowClient()
        const expected_stackoverflow_response = `
        <?xml version="1.0" encoding="utf-8"?>
        <rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
            <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
                <os:totalResults>2</os:totalResults>
                <item>
                    <a10:author>
                        <a10:name>Hello Inc</a10:name>
                    </a10:author>
                    <title>Junior Coffee Brewer</title>
                </item>
                <item>
                    <a10:author>
                        <a10:name>Supercompany</a10:name>
                    </a10:author>
                    <title>Big Boss</title>
                </item>
            </channel>
        </rss>`
        
        fetchMock.mock('https://stackoverflow.com/jobs/feed?q=frontend&l=valencia&u=Km&d=20', {
            body: expected_stackoverflow_response,
            status: 200
        })
        
        stack_overflow_client.jobs((jobs) => {
            expect(jobs).toEqual([
                {
                    company: 'Hello Inc',
                    title: 'Junior Coffee Brewer'
                },
                {
                    company: 'Supercompany',
                    title: 'Big Boss'
                }
            ])
            done()
        })
    })
})
