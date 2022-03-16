describe('Test App', () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('logs you in as doctor', () => {
        cy.login("jtRLOtCtchahnMHcPNDvrZTyyGE3");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
        cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Zhihao');
    });


})