import { users } from "../fixtures/users"

describe("User Sign-up and Login", () => {

const loginUsername = '[id="loginUsername"]'
const loginPassword = '[id="loginPassword"]'
const loginButton = '[id="loginButton"]'
const logoutBtn = '[id="logout-btn"]'
const loginPassError = '[id="loginPassError"]'

const tabSignup = '[id="tabSignup"]'
const signupUsername = '[id="signupUsername"]'
const signupPassword = '[id="signupPassword"]'
const signupButton = '[id="signupButton"]'
const signupPassError = '[id="signupPassError"]'

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
      cy.get(logoutBtn).should('not.exist')
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
    it('Signup with new username/password', () => {
      cy.visit('/')
      cy.get(tabSignup).click()
      cy.get(signupUsername).type(Math.random().toString(36).substring(2, 10))
      cy.get(signupPassword).type(Cypress.env('password'))
      cy.get(signupButton).click()
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).should('be.visible')
    })

    it('Signup with missing username/password', () => {
      cy.visit('/')
      cy.get(tabSignup).click()
      cy.get(signupButton).click()
      cy.get(logoutBtn).should('not.exist')
    })

    it('Signup with short password', () => {
      cy.visit('/')
      cy.get(tabSignup).click()
      cy.get(signupUsername).type(Math.random().toString(36).substring(2, 10))
      cy.get(signupPassword).type('a')
      cy.get(signupButton).click()
      cy.get(signupPassError).should('have.text', 'Password must be at least 4 characters.')
    })

    it('Signup with existing username', () => {
      cy.visit('/')
      cy.get(loginUsername).type(users.userValid.username)
      cy.get(loginPassword).type(Cypress.env('password'))
      cy.get(loginButton).click()
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).should('be.visible')
    })
  })
})