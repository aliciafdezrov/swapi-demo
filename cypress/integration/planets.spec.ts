describe('Planets page tests', () => {
    it('should display items on planets page load', function () {
        cy.visit("/planets")
        // Section headers appears
        cy.get('#search-input').should('be.visible');
        cy.get('#sorting-select').should('be.visible');
        cy.get('#category-header-planets').should('be.visible');

        //Card array is fulfilled
        cy.get('#card-array').children()
            .should('have.length.gt', 1)
        cy.get('#card-array > :nth-child(1)').should('be.visible')
    });

    it('should show no items page when no results are returned by the API', function () {
        cy.visit("/planets")
        cy.get('#search-input').should('be.visible');
        cy.get('#search-input').type('planet random test 123 123');
        cy.get("#no-items-found").should('be.visible');
    });

    it('items should be sorted when sort filter is applied by name', function () {
        cy.visit("/planets")

        cy.get('#card-array').children()
            .should('have.length.gt', 1)
            .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
            //planet name is the first item
            .then((fullPlanetMetaString) => fullPlanetMetaString.map(item => item.split('\n')[0]))
            .then(planetNamesList => {
                //planetNamesList from UI not sorted
                //next we compute the sorted list
                const sortedList = Cypress._.sortBy(planetNamesList)

                //require the sorting using de UI
                cy.get('#sorting-select').select('name')
                    .then(() => cy.get('#card-array').children())
                    .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
                    .then((fullPlanetMetaString) => fullPlanetMetaString.map(item => item.split('\n')[0]))
                    .then(planetNamesUIOrderedList => {
                        //our previous sorted list should be equal to the sort provided by the UI
                        expect(sortedList).to.deep.equal(planetNamesUIOrderedList)
                    })
            })
    });
})
