import { users } from "../fixtures/users"

describe("User Sign-up and Login", () => {

const loginUsername = '[id="loginUsername"]'
const loginPassword = '[id="loginPassword"]'
const loginButton = '[id="loginButton"]'
const logoutBtn = '[id="logout-btn"]'
const loginPassError = '[id="loginPassError"]'

    beforeEach (() => {
        cy.visit('/')
        cy.get(loginUsername).type(users.JohnDoe.username)
        cy.get(loginPassword).type(Cypress.env('password'))
        cy.get(loginButton).click()
        cy.url().should('include', '/dashboard')
        cy.get(logoutBtn).should('be.visible')
    })

    it.only('Send money to existing user', () => {
        cy.pause()
    })

    it('Request money from existing user', () => {})

    it('Approve money request', () => {})

    it('Reject money request', () => {})

    it('Send/request with empty fields', () => {})

    it('Send/request with invalid fields', () => {})

    it('Attempt transaction with non-exisitng user', () => {})

    it('Insufficiend fund on send', () => {})

    it('View transaction history', () => {})
})