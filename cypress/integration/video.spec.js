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
  });

  it('plays today\'s video', () => {
    cy.get('[data-cy=cyPlayVideoButton]').click();
    cy.get('[data-cy=cyVideoDoneButton]').click({ force: true });
    cy.get('.swal-title').should('contain', "Have you finished today's")
    cy.get('.swal-button--confirm').click();
    cy.get('.swal-text').should('contain', "Congratulations")
    cy.get('.swal-button--confirm').click();
    cy.get('[data-cy=cyPlayVideoButton]').click();
    cy.get('[data-cy=cyVideoDoneButton]').click({ force: true });
    cy.get('.swal-title').should('contain', "Have you finished today's")
    cy.get('.swal-button--cancel').click();
    cy.get('.swal-text').should('contain', "please keep doing it！")
    cy.get('.swal-button--confirm').click();
  })

  it('checks if it\'s done in TODO list', () => {
    cy.get('[data-cy=cyGoHomeButton]').click({ force: true });
  })

  // //logs you out
  // afterEach(() => {
  //   cy.logout();
  // });

});