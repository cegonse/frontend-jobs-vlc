require('isomorphic-fetch')
const xmlParser = require('fast-xml-parser')

const STACK_OVERFLOW_RSS_FEED_URL = 'https://stackoverflow.com/jobs/feed?q=frontend&l=valencia&u=Km&d=20'


class StackOverflowClient {
    jobs(callback, failure) {
        fetch(STACK_OVERFLOW_RSS_FEED_URL)
        .then((response) => {
            console.log('StackOverflow Jobs RSS response headers:')
            console.log(response.headers)
            console.log('\n')

            if (response.status != 200) {
                failure(response.statusText)
                return
            }

            response.text()
            .then((text) => {
                console.log('Raw XML Response from StackOverflow Jobs:')
                console.log(text)
                console.log('\n')
                this.parseXml(text, callback)
            })
        })
    }

    parseXml(text, callback) {
        const results = xmlParser.parse(text)
        const total_jobs = results.rss.channel['os:totalResults']
        let jobs = []

        if (total_jobs == 0) {
            callback(jobs)
            return
        }

        if (total_jobs == 1) {
            jobs.push({
                company: results.rss.channel.item['a10:author']['a10:name'],
                title: results.rss.channel.item.title
            })

            callback(jobs)
            return
        }

        for (let i=0; i<total_jobs; ++i) {
            const job = {
                company: results.rss.channel.item[i]['a10:author']['a10:name'],
                title: results.rss.channel.item[i].title
            }

            jobs.push(job)
        }

        callback(jobs)
    }
}

module.exports = {
    StackOverflowClient
}
