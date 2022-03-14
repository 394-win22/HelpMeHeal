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
    cy.login("XVdjGl5pRcYfW3nqUwFR9KtTnx2");
    cy.visit('/');
    cy.get('[data-cy=cySignInButton]').click();
  });

  it('plays today\'s video', () => {
    cy.get('[data-cy=cyPlayVideoButton]').click();
    cy.get('[data-cy=cyVideoDoneButton]').click({ force: true });
  })

  it('checks if it\'s done in TODO list', () => {
    cy.get('[data-cy=cyGoHomeButton]').click({ force: true });
  })

  //logs you out
  afterEach(() => {
    cy.logout();
  });

});