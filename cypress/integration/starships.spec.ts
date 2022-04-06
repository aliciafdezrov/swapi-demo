describe('Starships page tests', () => {
    it('should display items on starships page load', function () {
      cy.visit('/#/starships')
        // Section headers appears
        cy.get('#search-input').should('be.visible');
        cy.get('#sorting-select').should('be.visible');
        cy.get('#category-header-starships').should('be.visible');

        //Card array are fulfilled
        cy.get('#card-array').children()
          .should('have.length.gt', 1)
        cy.get('#card-array > :nth-child(1)').should('be.visible')
    });

    it('should show no items page when no results are returned by the API', function () {
        cy.get('#search-input').should('be.visible');
        cy.get('#search-input').type('starship random test 123 123');
        cy.get("#no-items-found").should('be.visible');
    });
})
