describe('Testing widgets', () => {
	it('loads recollect', () => {
		cy.visit('/en/housing-utilities/recycling-trash-and-compost/household-waste/hazardous-waste-dropoff/')
    cy.get('.coa-Recollect')
	})
})
