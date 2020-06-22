const withZeroJobs = `
<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
    <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
        <os:totalResults>0</os:totalResults>
    </channel>
</rss>
`

const withOneJob = (company, title) => `
<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
    <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
        <os:totalResults>1</os:totalResults>
        <item>
            <a10:author>
                <a10:name>${company}</a10:name>
            </a10:author>
            <title>${title}</title>
        </item>
    </channel>
</rss>
`

const withTwoJobs = (first, second) => `
<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
    <channel xmlns:os="http://a9.com/-/spec/opensearch/1.1/">
        <os:totalResults>2</os:totalResults>
        <item>
            <a10:author>
                <a10:name>${first.company}</a10:name>
            </a10:author>
            <title>${first.title}</title>
        </item>
        <item>
            <a10:author>
                <a10:name>${second.company}</a10:name>
            </a10:author>
            <title>${second.title}</title>
        </item>
    </channel>
</rss>
`

module.exports = {
    withZeroJobs,
    withOneJob,
    withTwoJobs
}
