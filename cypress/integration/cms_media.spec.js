describe('Testing that document/pdf urls contain a valid path', () => {
	it('contains a valid path', () => {
		cy.visit('/en/health-safety/police-oversight-2/police-feedback-and-records/official-complaint-and-discipline-documents/')
    // an arbitrary number to wait for the site to build
    cy.wait(14000)
    cy.get('.coa-OfficialDocumentPage__small-heading-container')
      // its the third div that contains the link
      .eq(3)
      .find('a')
      .should('have.attr', 'href')
      .and('match', /joplin3-austin-gov-static.s3.amazonaws.com/)
	})
})
