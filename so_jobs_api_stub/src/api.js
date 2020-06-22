const express = require('express')
const api = express()


api.use(express.json());


const buildJobItem = (company, title) => `        <item>
            <a10:author>
                <a10:name>${company}</a10:name>
            </a10:author>
            <title>${title}</title>
        </item>`

const buildJobItems = (jobs) => {
    let all_items = ''

    if (jobs.length == 0) {
        return ''
    }
    
    for (const job of jobs) {
        all_items += '\n' + buildJobItem(job.company, job.title)
    }

    return all_items
}

const buildRss = (jobs) => `
<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
    <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
        <os:totalResults>${jobs.length}</os:totalResults>${buildJobItems(jobs)}
    </channel>
</rss>
`


let jobs = []


api.get('/jobs/feed', (req, res) => {
    res.setHeader('Content-Type', 'application/rss+xml')
    res.send(buildRss(jobs))
})

api.patch('/test/jobs', (req, res) => {
    jobs = req.body
    res.sendStatus(200)
})

module.exports = api
