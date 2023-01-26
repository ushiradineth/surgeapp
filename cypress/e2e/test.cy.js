const URL = "http://localhost:3000"

describe('landing page', () => {
    it('get landing page', () => {
        cy.visit(URL)
        cy.title().should('eq', 'Login to SurgeApp')
    })

    it('is hcaptcha working', () => {
        cy.visit(URL)

        cy.get('div[id*="hcaptcha"]')
    })
})

describe('profile', () => {
    it('get profile', () => {
        cy.visit(URL + "/profile/cldbvtyok0001afm0zo546n5x")
        cy.get('div[id*="user-info"]')
    })
})

describe('post', () => {
    it('get post', () => {
        cy.visit(URL + "/post/cldd3e9s90000af2scksoav79")
        cy.get('div[id*="post"]')
    })
})

describe('input validation', () => {
    it('enabled when all inputs valid', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#name").type("test");
        cy.get("#email").type("test@email.com");
        cy.get("#password").type("Test1234!");
        cy.get('#registerBtn').should('not.be.disabled')
    })

    it('disabled when name is empty', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#email").type("test@email.com");
        cy.get("#password").type("Test1234!");
        cy.get('#registerBtn').should('be.disabled')
    })


    it('disabled when email is empty', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#name").type("test");
        cy.get("#password").type("Test1234!");
        cy.get('#registerBtn').should('be.disabled')
    })

    it('disabled when password is empty', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#name").type("test");
        cy.get("#email").type("test@email.com");
        cy.get('#registerBtn').should('be.disabled')
    })

    it('disabled when email is invalid', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#name").type("test");
        cy.get("#email").type("test@email");
        cy.get("#password").type("Test1234!");
        cy.get('#registerBtn').should('be.disabled')
    })

    it('disabled when password is invalid', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get("#name").type("test");
        cy.get("#email").type("test@email.com");
        cy.get("#password").type("Test1234");
        cy.get('#registerBtn').should('be.disabled')
    })

    it('disabled when the form is empty', () => {
        cy.visit(URL)
        cy.contains('Register').click()
        cy.get('#registerBtn').should('be.disabled')
    })
})