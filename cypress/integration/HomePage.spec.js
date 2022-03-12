describe("able to get to home page and click on active phase and not other ones", () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it ('opens login page and checks for help me heal', () => {
        cy.visit ('/');
        cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
    });

    it('logs you in as patient', () => {
        cy.login("D0UBsRxynwbeW6s5Jb1PxWQJZIo1");
        cy.visit ('/');
        cy.get('[data-cy=cySignInButton]').click();
    });

    it('clicks the i got this', () => {
        //expect(Swal.isVisible()).toBeTruthy();
        cy.get('.swal2-confirm').click();
    });

    it('clicks the active phase', () => {
        cy.get('[data-cy=cyActive]').click();
        cy.get('.swal2-confirm').click();
        cy.get('[data-cy=cyDaysComplete]').should('contain', 'days complete in this phase');
        cy.get('[data-cy=cyActiveZoom]').click();
    });

    it('should not click on other phases', () => {
        cy.get('[data-cy=cyInactive]').click({ multiple: true });
        cy.get('[data-cy=cyProgressBar');
        cy.get('[data-cy=cyProgressBarZoomed').should('not.exist');
    });

    it('clicks the welcome message again', () => {
        cy.get('[data-cy=cyWelcomeMessage]').click();
        cy.get('.swal2-confirm').click();
    });
});