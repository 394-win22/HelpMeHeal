describe('patient views stats', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('opens login page and checks for help me heal', () => {
        cy.visit('/');
        cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
    });

    it('logs you in as patient', () => {
        cy.login("hRiAuS8fCcSvRK3BBTXmkfgKvWZ2");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
    });

    it('looks at your patient statistics', () => {
        cy.get('[data-cy=cyToCharts]').click();
    });

    after(() => {
        cy.logout();
    })


});