export function givenStackOverflowListsZeroJobs() {
    cy.request('PATCH', 'http://localhost:4000/test/jobs', JSON.stringify([]))
}

export function whenVisitingHomepage() {
    cy.visit('/')
}

export function thenNoJobsAvailableMessageIsDisplayed() {
    cy.get('#jobs').contains('No jobs available')
}
