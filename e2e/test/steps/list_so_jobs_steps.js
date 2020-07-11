export function givenStackOverflowListsZeroJobs() {
    cy.request('PATCH', 'http://localhost:4000/test/jobs', JSON.stringify([]))
}

export function givenStackOverflowListsOneJob() {
    cy.request('PATCH', 'http://localhost:4000/test/jobs', JSON.stringify([{
        company: 'Calcetin IT',
        title: 'Junior Frontend Engineer at Calcetin IT'
    }]))
}

export function whenVisitingHomepage() {
    cy.visit('/')
}

export function thenNoJobsAvailableMessageIsDisplayed() {
    cy.get('#jobs').contains('No jobs available')
}

export function thenThereIsOneJobWithCompanyAndTitle() {
    const jobs = cy.get('#jobs')
    jobs.contains('Calcetin IT')
    jobs.contains('Junior Frontend Engineer at Calcetin IT')
}
