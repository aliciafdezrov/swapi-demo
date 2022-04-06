describe('Common layout tests', () => {
    it('should navigate to /planets on index call', () => {
        cy.visit('/');
        cy.url().should('include', '/planets')
    })

    it('should navigate to /planets on death start click', () => {
        cy.viewport("ipad-2");
        cy.visit('/#/starships');
        cy.get('#death-star-menu-item').click();
        cy.url().should('include', '/planets')
    })

    it('should navigate to /planets on menu item click', () => {
        cy.visit('/#/starships');
        cy.get('#planets-menu-item').click();
        cy.url().should('include', '/planets')
    })

    it('should navigate to /starships on menu item click', () => {
        cy.visit('/#/planets');
        cy.get('#starships-menu-item').click();
        cy.url().should('include', '/starships')
    })

    it('should open dialog on footer click', () => {
        cy.get('#about-footer-anchor').click();
        cy.get('#message-dialog').should('be.visible');
    })

    it("should close dialog on 'ok' click", () => {
        cy.get('#hide-dialog-button').should('be.visible');
        cy.get('#hide-dialog-button').click()
        cy.get('#message-dialog').should('not.exist');
    })
})
