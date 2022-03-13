describe ('Test correct survey completion message for mild pain', () => {

    beforeEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('.swal-overlay--show-modal').length > 0) {
                cy.get('.swal-button--confirm').click();
            }
        });
        cy.get('body').then(($body) => {
            if ($body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm').click();
            }
        });
    })

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
    
    it('clicks the survey button', () => {
        cy.get('[data-cy=cySurveyIcon]').click();
    })

    it('select pain level 1', () => {
        cy.get('input[value=1]').parent().click();
    })

    it('select yes to complete rehab question if it exists', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[name^=rehab_successful]').length > 0) {
                cy.get('[name^=rehab_successful]').check("Yes");
            }
        })
    })

    it('select no to concerns question if it exists', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[name^=concerns]').length > 0) {
                cy.get('[name^=concerns]').check(" No");
            }
        })
    })

    it('submit survey', () => {
        cy.get('input[value=Complete]').click();
    })

    it('check that popup message contains correct grammar', () => {
        cy.get('.swal-title').should('contain', "Happy to know");
    })

    after(() => {
        cy.get('[data-cy=cySignOutButton]').click();
        cy.logout();
    })
});

describe ('Test correct survey completion message for concerns', () => {

    beforeEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('.swal-overlay--show-modal').length > 0) {
                cy.get('.swal-button--confirm').click();
            }
        });
        cy.get('body').then(($body) => {
            if ($body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm').click();
            }
        });
    })

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
    
    it('clicks the survey button', () => {
        cy.get('[data-cy=cySurveyIcon]').click();
    })

    it('select pain level 7', () => {
        cy.get('input[value=7]').parent().click();
    })

    it('select yes to complete rehab question if it exists', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[name^=rehab_successful]').length > 0) {
                cy.get('[name^=rehab_successful]').check("Yes");
            }
        })
    })

    it('select yes to concerns question if it exists', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[name^=concerns]').length > 0) {
                cy.get('[name^=concerns]').check("Yes");
            }
        })
    })

    it('type concern', () => {
        cy.get('[data-name=concerns_description]').get('textarea').type('I am in pain');
    })

    it('submit survey', () => {
        cy.get('input[value=Complete]').click();
    })

    it('check that popup message contains correct grammar', () => {
        cy.get('.swal-title').should('not.contain', "Happy to know");
    })

    after(() => {
        cy.logout();
    })
});