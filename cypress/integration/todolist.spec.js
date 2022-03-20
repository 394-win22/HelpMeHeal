describe("todo list icons should perform same functions as navbar icons", () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('opens login page, logs in as patient, and clicks away pop up "i got this" message', () => {
        cy.visit('/');
        cy.login("D0UBsRxynwbeW6s5Jb1PxWQJZIo1");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
        cy.get('.swal2-confirm').click();
    });


    it('check that survey checkbox is initially disabled', () => {
        cy.get("data-cy=cySurveyCheckBox").should('be.disabled');
    })

    it('clicks survey icon on todo-list', () => {
        cy.get('[data-cy=cySurveyIconButton').click();
    });

    it('do the survey and submit and close popup', () => {
        cy.get('input[value=1]').parent().click();
        cy.get('body').then(($body) => {
            if ($body.find('[name^=rehab_successful]').length > 0) {
                cy.get('[name^=rehab_successful]').check("Yes");
            }
        })
        cy.get('body').then(($body) => {
            if ($body.find('[name^=concerns]').length > 0) {
                cy.get('[name^=concerns]').check(" No");
            }
        })
        cy.get('input[value=Complete]').click();
        cy.get('.swal-button--confirm').click();
    })

    it('check that checkbox is now on', () => {
        cy.get("data-cy=cySurveyCheckBox").should('be.enabled');
    })

    // check video
    it('check that checkbox is initially off', () => {
        cy.get("data-cy=cyVideoyCheckBox").should('be.disabled');
    })

    it('click done in playing today\'s video', () => {
        cy.get('[data-cy=cyVideoDoneButton]').click({ force: true });
        cy.get('.swal-button--confirm').click();
        cy.get('.swal-button--confirm').click();
    })

    it('check that checkbox is now on', () => {
        cy.get("data-cy=cyVideoCheckBox").should('be.enabled');
    })

    after(() => {
        cy.logout();
    })
});