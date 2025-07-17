import { users } from "../fixtures/users"

describe("User Sign-up and Login", () => {

enum signup {
  Tab = '[id="tabSignup"]',
  Username = '[id="signupUsername"]',
  Password = '[id="signupPassword"]',
  Button = '[id="signupButton"]',
  PassError = '[id="signupPassError"]'
}

const logoutBtn = '[id="logout-btn"]'
const loginBtn = '[id="loginButton"]'
const PassError = '[id="loginPassError"]'
const uniqueUsername = `user_${Date.now()}`

  beforeEach(() => {
    cy.visit('/')
  })

  context("Login-Logout", () => {
    it('Login with correct credentials', () => {
      cy.login(users.userValid, Cypress.env('password'))
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).should('be.visible')
    })

    it('Login with wrong credentials', () => {
      cy.login(users.userValid, 'wrong-password')
      cy.get(PassError).should('have.text', 'Invalid credentials')
    })

    it('Login with empty fields', () => {
      cy.get(loginBtn).click()
      cy.get(logoutBtn).should('not.exist')
    })

    it('Logout from dashboard', () => {
      cy.login(users.userValid, Cypress.env('password'))
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).click()
      cy.get(loginBtn).should('be.visible')
    })
  })

  context("Sign-up", () => {
    it('Should successfully sign up with a unique username and valid password', () => {
      cy.get(signup.Tab).click()
      cy.get(signup.Username).type(uniqueUsername)
      cy.get(signup.Password).type(Cypress.env('password'))
      cy.get(signup.Button).click()
      cy.url().should('include', '/dashboard')
      cy.get(logoutBtn).should('be.visible')
    })

    it('Signup with missing username/password', () => {
      cy.get(signup.Tab).click()
      cy.get(signup.Button).click()
      cy.get(logoutBtn).should('not.exist')
    })

    it('Signup with short password', () => {
      cy.get(signup.Tab).click()
      cy.get(signup.Username).type(uniqueUsername)
      cy.get(signup.Password).type('a')
      cy.get(signup.Button).click()
      cy.get(signup.PassError).should('have.text', 'Password must be at least 4 characters.')
    })

    it('Signup with existing username', () => {
      cy.get(signup.Tab).click()
      cy.get(signup.Username).type(users.userValid.username)
      cy.get(signup.Password).type(Cypress.env('password'))
      cy.get(signup.Button).click()
      cy.get(signup.PassError).should('have.text', 'Username taken')
    })
  })
})