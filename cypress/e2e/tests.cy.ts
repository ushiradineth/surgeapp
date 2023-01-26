const URL = "http://localhost:3000"

describe('landing page', () => {
  it('gets landing page', () => {
    cy.visit(URL)
    cy.title().should('eq', 'Login to SurgeApp')
  })

  it('checks if hcaptcha works', () => {
    cy.visit(URL)
    cy.get('div[id*="hcaptcha"]')
  })
})

describe('input validation', () => {
  it('checks if button is enabled when input is valid', () => {
    cy.visit(URL)
    cy.get('div[id*="RegisterBtn"]').click()
    cy.get('input[id*="name"]').type('test')
    cy.get('input[id*="email"]').type('test@email.com')
    cy.get('input[id*="password"]').type('Test1234!')  
    cy.get('button[id*="registerSubmit"]').should('not.be.disabled')
  })

  it('checks if button is disabled when name is invalid', () => {
    cy.visit(URL)
    cy.get('div[id*="RegisterBtn"]').click()
    cy.get('input[id*="email"]').type('test@email.com')
    cy.get('input[id*="password"]').type('Test1234!')  
    cy.get('button[id*="registerSubmit"]').should('be.disabled')
  })

  it('checks if button is disabled when email is invalid', () => {
    cy.visit(URL)
    cy.get('div[id*="RegisterBtn"]').click()
    cy.get('input[id*="name"]').type('test')
    cy.get('input[id*="email"]').type('test@email')
    cy.get('input[id*="password"]').type('Test1234')  
    cy.get('button[id*="registerSubmit"]').should('be.disabled')
  })

  it('checks if button is disabled when password is invalid', () => {
    cy.visit(URL)
    cy.get('div[id*="RegisterBtn"]').click()
    cy.get('input[id*="name"]').type('test')
    cy.get('input[id*="email"]').type('test@email.com')
    cy.get('input[id*="password"]').type('Test1234')  
    cy.get('button[id*="registerSubmit"]').should('be.disabled')
  })
})

describe('profile', () => {
  it('gets profile', () => {
    cy.visit(URL+"/profile/cldbvtyok0001afm0zo546n5x")
    cy.get('div[id*="user-info"]')
  })

  it('gets post', () => {
    cy.visit(URL+"/post/clddaamh70001aft4iqr644k1")
    cy.get('div[id*="post"]')
  })
})

export {}