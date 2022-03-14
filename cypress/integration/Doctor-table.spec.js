describe('Test App', () => {


    it('launches', () => {
        cy.visit('/');
    });

    it('logs you in as doctor', () => {
        cy.login("Yg2OvFEEFJSOKquVD3XKtORiNjB2");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
        cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Kaixin')
    })

    it('test table each row click show correct info', () => {
        let count = 0
        cy.get('tbody').then((val) => {
            if (val.find('[data-cy=cy-table]').length > 0) {

                cy.get('[data-cy=cy-table]')
                    .then(len => {
                        count = Cypress.$(len).length;
                        for (let i = 0; i < count; i++) {
                            cy.get('[data-cy=cy-patientName]').eq(i).then(($name) => {
                                cy.get('[data-cy=cy-table]').eq(i).click();
                                let usernameFormatted = $name.text()?.split(/\s/);
                                let lastName = usernameFormatted[1] !== undefined ? " " +
                                    usernameFormatted?.[1].charAt(0).toUpperCase() +
                                    usernameFormatted?.[1].slice(1).toLowerCase() : "";
                                cy.get('[data-cy=cy-patientDetail-name]').should('contain', usernameFormatted?.[0].charAt(0).toUpperCase() +
                                    usernameFormatted?.[0].slice(1).toLowerCase() + lastName);
                            })
                            //console.log(cy.get('body').find('[data-cy = cy-alert-title]').length)
                            cy.get('body').then((val) => {
                                if (val.find('.swal2-confirm').length > 0) {
                                    cy.get('.swal2-title').should('contain', "Patient's Concerns")
                                    cy.get('.swal2-confirm').click();
                                }
                                if (val.find(".MuiTableContainer-root").length > 0) {
                                    cy.get('[data-cy = cy-detail-table]');
                                } else {
                                    cy.get('[data-cy = cy-no-survey-text').should('contain', "No survey Result yet!")
                                }
                            })
                            cy.get('[data-cy = cy-chart]');
                            cy.get('[data-cy = cy-Doughnut]');
                            cy.get('[data-cy =cyDoctorHomeButton]').click();
                        }
                    });
            }
        });
    })

    // //logs you out
    // afterEach(() => {
    //     cy.logout();
    // });
});