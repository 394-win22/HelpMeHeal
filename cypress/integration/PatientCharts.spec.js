describe("able to reach charts and they are there", () => {
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

    it('clicks the chart icon', () => {
        cy.get('[data-cy=cyToCharts]').click();
    });
    
    it('charts are there', () => {
        cy.get('[data-cy=cyWeeklyReport]');
        cy.get('[data-cy=cyRehabSuccess]');
    });
});