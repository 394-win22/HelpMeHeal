describe('test user emails doctor successfully', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('ensure correct login page', () => {
        cy.visit('/');
        cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
    });

    it('log in as patient', () => {
        cy.login("n3PCiQtgncP2RnGTEON8wo3esGi1");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
    });

    it('clicks the email icon', () => {
        cy.get('[data-cy=cyEmailIcon]').click();
    })

    it('click message box', () => {
        cy.get('[id=message]').click();
    })

    it('type message', () => {
        cy.get('[id=message]').type("I'm in pain");
    })

    it('send email', () => {
        cy.get('[id=submit]').click();
    })

    it('check correct popup', () => {
        cy.get('.swal-title').should('contain', "Message received");
    })

    it('close submission popup and logout', () => {
        cy.get('.swal-button--confirm').click();
    })

    after(() => {
        cy.logout();
    })
});

describe('test no email sends when no message entered', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('ensure correct login page', () => {
        cy.visit('/');
        cy.get('[data-cy=cyLogoContent]').should('contain', 'Help Me Heal');
    });

    it('log in as patient', () => {
        cy.login("n3PCiQtgncP2RnGTEON8wo3esGi1");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
    });

    it('clicks the email icon', () => {
        cy.get('[data-cy=cyEmailIcon]').click();
    });

    it('send email', () => {
        cy.get('[id=submit]').click();
    });

    it('check that error message appears', () => {
        cy.get('[id=emailModal]').should('not.contain', "Message received");
    });

    it('close email form', () => {
        cy.get('[id=close]').click();
    })

    after(() => {
        cy.logout();
    })
}); 