import {convertCompactNotationStringToStandardNumber} from "../support/utils";

describe('Starships page tests', () => {
    it('should display items on starships page load', function () {
        cy.visit('/starships')
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

    it('items should be sorted when sort filter is applied by cargo capacity', function () {
        //Clear search input from previous test
        cy.visit('/starships')

        cy.get('#card-array').children()
            .should('have.length.gt', 1)
            .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
            //planet name is the first item
            .then((fullStarshipMetaString) => fullStarshipMetaString.map(item => item.split('\n')[1].split(':')[1].replace(/\s/g, '')))
            .then(cargoFigureCompactList => cargoFigureCompactList.map(convertCompactNotationStringToStandardNumber))
            .then(cargoFiguresList => {
                    //cargoFiguresList from UI not sorted
                    //next we compute the sorted list
                    const sortedList = Cypress._.sortBy(cargoFiguresList)

                    //require the sorting using de UI
                    cy.get('#sorting-select').select('cargoCapacityAbsoluteValue')
                        .then(() => cy.get('#card-array').children())
                        .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
                        .then((fullStarshipMetaString) => fullStarshipMetaString.map(item => item.split('\n')[1].split(':')[1].replace(/\s/g, '')))
                        .then(cargoFigureCompactList => cargoFigureCompactList.map(convertCompactNotationStringToStandardNumber))
                        .then(cargoCapacityUIOrderedList => {
                            //our previous sorted list should be equal to the sort provided by the UI
                            expect(sortedList).to.deep.equal(cargoCapacityUIOrderedList)
                        })
                }
            )
    });

    it('items should be sorted when sort filter is applied by crew', function () {
        cy.visit('/starships')

        cy.get('#card-array').children()
            .should('have.length.gt', 1)
            .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
            //planet name is the first item
            .then((fullStarshipMetaString) => fullStarshipMetaString.map(item => item.split('\n')[2].split(' ')[3].replace(/\s/g, '')))
            .then(crewFigureCompactList => crewFigureCompactList.map(convertCompactNotationStringToStandardNumber))
            .then(crewFiguresList => {
                    //crewFiguresList from UI not sorted
                    //next we compute the sorted list
                    const sortedList = Cypress._.sortBy(crewFiguresList)

                    //require the sorting using de UI
                    cy.get('#sorting-select').select('crewAbsoluteValue')
                        .then(() => cy.get('#card-array').children())
                        .then(($cards) => Cypress._.map($cards, (el) => el.innerText))
                        .then((fullStarshipMetaString) => fullStarshipMetaString.map(item => item.split('\n')[2].split(' ')[3].replace(/\s/g, '')))
                        .then(crewFigureCompactList => crewFigureCompactList.map(convertCompactNotationStringToStandardNumber))
                        .then(crewCapacityUIOrderedList => {
                            //our previous sorted list should be equal to the sort provided by the UI
                            expect(sortedList).to.deep.equal(crewCapacityUIOrderedList)
                        })
                }
            )
    });
})
