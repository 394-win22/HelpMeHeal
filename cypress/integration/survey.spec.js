describe ('Test correct survey completion message for mild pain', () => {

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

    it('closes welcome popup message if it appears', () => {
        if (cy.get('.swal2-confirm')){
            cy.get('.swal2-confirm').click();
        }
    })
    
    it('clicks the survey button', () => {
        cy.get('[data-cy=cySurveyIcon]').click();
    })

    it('closes take survey again popup message if it appears', () => {
        if (cy.get('.swal-button--confirm')){
            cy.get('.swal-button--confirm').click();
        }
    })

    it('select pain level 1', () => {
        cy.get('input[value=1]').parent().click();
    })

    it('select yes to complete rehab question', () => {
        cy.get('[id=sq_105i_0]').click();
    })

    it('select no to concerns question', () => {
        cy.get('[id=sq_106i_1]').click();
    })

    it('submit survey', () => {
        cy.get('input[value=Complete]').click();
    })

    it('check that popup message contains correct grammar', () => {
        cy.get('.swal-title').should('contain', "Happy to know");
    })

    it('close submission popup and logout', () => {
        cy.get('.swal-button--confirm').click();
    })

    after(() => {
        cy.logout();
    })
});

describe ('Test correct survey completion message for high pain', () => {

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

    it('closes welcome popup message if it appears', () => {
        if (cy.get('.swal2-confirm')){
            cy.get('.swal2-confirm').click();
        }
    })

    it('clicks the survey button', () => {
        cy.get('[data-cy=cySurveyIcon]').click();
    })

    it('closes take survey again popup message if it appears', () => {
        if (cy.get('.swal-button--confirm')){
            cy.get('.swal-button--confirm').click();
        }
    })

    it('select pain level 7', () => {
        cy.get('input[value=7]').parent().click();
    })

    it('select yes to complete rehab question', () => {
        cy.get('[id=sq_105i_0]').click();
    })

    it('select no to concerns question', () => {
        cy.get('[id=sq_106i_1]').click();
    })

    it('submit survey', () => {
        cy.get('input[value=Complete]').click();
    })

    it('check that popup message contains correct grammar', () => {
        cy.get('.swal-title').should('not.contain', "Sorry");
    })

    it('close submission popup', () => {
        cy.get('.swal-button--confirm').click();
    })

    after(() => {
        cy.logout();
    })
});