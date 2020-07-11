import { StackOverflowClient } from './../../src/stack_overflow_client'

class StackOverflowClientMock extends StackOverflowClient {
    jobs(callback) {
        callback(this.response)
    }

    givenJobsResponseIs(response) {
        this.response = response
    }
}


module.exports = {
    StackOverflowClientMock
}
