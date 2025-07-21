import { users } from "../fixtures/users"
import { auth } from "../support/POM/auth"

describe("User Sign-up and Login", () => {

  const uniqueUsername = `user_${Date.now()}`

  beforeEach(() => {
    cy.visit('/')
  })

  context("Login-Logout", () => {
    it('Login with correct credentials', () => {
      cy.login(users.userValid, Cypress.env('password'))
      cy.url().should('include', '/dashboard')
      auth.LogoutBtn().should('be.visible')
    })

    it('Login with wrong credentials', () => {
      cy.login(users.userValid, 'wrong-password')
      auth.LoginPassError().should('have.text', 'Invalid credentials')
    })

    it('Login with empty fields', () => {
      auth.LoginBtn().click()
      auth.LogoutBtn().should('not.exist')
    })

    it('Logout from dashboard', () => {
      cy.login(users.userValid, Cypress.env('password'))
      cy.url().should('include', '/dashboard')
      auth.LogoutBtn().click()
      auth.LoginBtn().should('be.visible')
    })
  })

  context("Sign-up", () => {
    it('Should successfully sign up with a unique username and valid password', () => {
      auth.TabSignup().click()
      auth.SignupUsername().type(uniqueUsername)
      auth.SignupPassword().type(Cypress.env('password'))
      auth.SignupButton().click()
      cy.url().should('include', '/dashboard')
      auth.LogoutBtn().should('be.visible')
    })

    it('Signup with missing username/password', () => {
      auth.TabSignup().click()
      auth.SignupButton().click()
      auth.LogoutBtn().should('not.exist')
    })

    it('Signup with short password', () => {
      auth.TabSignup().click()
      auth.SignupUsername().type(uniqueUsername)
      auth.SignupPassword().type('a')
      auth.SignupButton().click()
      auth.SignupPassError().should('have.text', 'Password must be at least 4 characters.')
    })

    it('Signup with existing username', () => {
      auth.TabSignup().click()
      auth.SignupUsername().type(users.userValid.username)
      auth.SignupPassword().type(Cypress.env('password'))
      auth.SignupButton().click()
      auth.SignupPassError().should('have.text', 'Username taken')
    })
  })
})