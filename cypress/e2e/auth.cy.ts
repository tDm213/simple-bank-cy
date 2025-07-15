import { users } from "../fixtures/users"


describe("User Sign-up and Login", () => {

const loginUsername = '[id="loginUsername"]'
const loginPassword = '[id="loginPassword"]'
const loginButton = '[id="loginButton"]'
const logoutBtn = '[id="logout-btn"]'
const loginPassError = '[id="loginPassError"]'

  context("Login-Logout", () => {
    it('Login with correct credentials', () => {
      cy.visit('/')
      cy.get(loginUsername).type(users.userValid.username)
      cy.get(loginPassword).type(Cypress.env('password'))
      cy.get(loginButton).click()
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).should('be.visible')
    })

    it('Login with wrong credentials', () => {
      cy.visit('/')
      cy.get(loginUsername).type(users.userValid.username)
      cy.get(loginPassword).type('wrong-password')
      cy.get(loginButton).click()
      cy.get(loginPassError).should('have.text', 'Invalid credentials')
    })

    it('Login with empty fields', () => {
      cy.visit('/')
      cy.get(loginButton).click()
    })

    it('Logout from dashboard', () => {
      cy.visit('/')
      cy.get(loginUsername).type(users.userValid.username)
      cy.get(loginPassword).type(Cypress.env('password'))
      cy.get(loginButton).click()
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).click()
      cy.get(loginButton).should('be.visible')
    })
  })

  context("Sign-up", () => {
    it('Signup with new username/password', () => {})

    it('Signup with missing username/password', () => {})

    it('Signup with short password', () => {})

    it('Signup with existing username', () => {})
  })
})