import  {
    givenStackOverflowListsZeroJobs,
    whenVisitingHomepage,
    thenNoJobsAvailableMessageIsDisplayed,
    thenThereIsOneJobWithCompanyAndTitle,
    givenStackOverflowListsOneJob
} from './steps/list_so_jobs_steps.js'

describe('Listing stack overflow job offers', () => {
    it('shows no jobs avaible when cant find any', () => {
        givenStackOverflowListsZeroJobs()
        
        whenVisitingHomepage()

        thenNoJobsAvailableMessageIsDisplayed()
    })

    xit('shows one job when one job is available at SO', () => {
        givenStackOverflowListsOneJob()

        whenVisitingHomepage()

        thenThereIsOneJobWithCompanyAndTitle()
    })
})
