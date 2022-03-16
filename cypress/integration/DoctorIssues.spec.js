describe('Test App', () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('logs you in as doctor', () => {
        cy.login("jtRLOtCtchahnMHcPNDvrZTyyGE3");
        cy.visit('/');
        cy.get('[data-cy=cySignInButton]').click();
        cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Zhihao');
    });

    it('click doctor email', () => {
        cy.get('[data-cy=cyDoctorEmailButton]').click();
    })

    it('test doctor email modal load successfully', () => {
        cy.get('[id=modal-modal-title]').should('contain', 'Email Your Patient Now');
    })

    it('click close button', () => {
        cy.get('[id=close]').click();
    })

    it('check return to home page after close', () => {
        cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Zhihao');
    })

    it('check home button works or not', () => {
        cy.get('[data-cy=cyDoctorHomeButton]').click();
    })

    it('check return to home page after close', () => {
        cy.get('[data-cy=cyLoggedInDoctor]').should('contain', 'Zhihao');
    })

})