import { StackOverflowClient } from './../../src/stack_overflow_client'

class StackOverflowClientMock extends StackOverflowClient {
    jobs(callback, failure) {
        if (this.fails) {
            failure(this.cause)
        } else {
            callback(this.response)
        }
    }

    givenJobsResponseIs(response) {
        this.fails = false
        this.response = response
    }

    givenRequestFailsWith(cause) {
        this.fails = true
        this.cause = cause
    }
}


module.exports = {
    StackOverflowClientMock
}
