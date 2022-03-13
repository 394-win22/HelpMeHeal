/* globals cy */

describe('Test App', () => {

  it('launches', () => {
    cy.visit('/');
  });

  it('opens login page and checks for help me heal', () => {
    cy.visit('/');
    cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
  });

  it('logs you in as patient', () => {
    cy.login("LXVdjGl5pRcYfW3nqUwFR9KtTnx2");
    cy.visit('/');
    cy.get('[data-cy=cySignInButton]').click();
    cy.get('[data-cy=cyLoggedInPatient]').should('contain', 'Sam Zheng')
  });

  //logs you out
  afterEach(() => {
    cy.logout();
  });

  it('logs you in as Doctor', () => {
    cy.login("Yg2OvFEEFJSOKquVD3XKtORiNjB2");
    cy.visit('/');
    cy.get('[data-cy=cySignInButton]').click();
    cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Kaixin')
  });

  //logs you out
  afterEach(() => {
    cy.logout();
  });

});