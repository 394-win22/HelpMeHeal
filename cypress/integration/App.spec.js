/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
    
    it ('opens login page and checks for help me heal', () => {
      cy.visit ('/');
      cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
    });

    it('logs you in', () => {
      cy.visit ('/');
      cy.get('[data-cy=cySignInButton]').click();
    });

  });