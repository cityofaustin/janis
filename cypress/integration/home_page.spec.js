describe('The Home page', () => {
	it('sucessfully loads', () => {
		cy.visit('/')
	})
  
  it('contains the feedback module', () => {
    // prevent cypress from looking for the element
    // before the routes are loaded
    cy.wait(900) 
    cy.get('.coa-UserFeedback__form')
  })
})
