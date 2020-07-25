require('isomorphic-fetch')
const xmlParser = require('fast-xml-parser')

const STACK_OVERFLOW_RSS_FEED_URL = 'https://stackoverflow.com/jobs/feed?q=frontend&l=valencia&u=Km&d=20'


class StackOverflowClient {
    jobs(callback) {
        fetch(STACK_OVERFLOW_RSS_FEED_URL)
        .then((response) => {
            response.text()
            .then((text) => {
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