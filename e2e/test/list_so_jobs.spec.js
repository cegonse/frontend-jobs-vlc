import  { givenStackOverflowListsZeroJobs, whenVisitingHomepage, thenNoJobsAvailableMessageIsDisplayed } from './steps/list_so_jobs_steps.js'


describe('Listing stack overflow job offers', () => {
    it('shows no jobs avaible when cant find any', () => {
        givenStackOverflowListsZeroJobs()
        
        whenVisitingHomepage()

        thenNoJobsAvailableMessageIsDisplayed()
    })
})
