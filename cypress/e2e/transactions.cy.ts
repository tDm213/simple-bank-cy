import { users } from "../fixtures/users"
import { auth } from "../support/POM/auth"
import { dashboard } from "../support/POM/dashboard"

const sendAmount = '5'
const requestAmount = '1'
const userValid = users.userValid.username

describe("User Making Transactions", () => {


    function loginAndGotoDashboard(user: any) {
        cy.visit('/')
        cy.login(user, Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        dashboard.LogoutBtn().should('be.visible')
    }

    context('Functional tests', () => {
        it('Send money to existing user', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.sendAmount(userValid, requestAmount)
            cy.log('**>View transaction history<**')
            dashboard.History().children().should('contain.text', `✔ Sent $${sendAmount} to ${userValid}`)
        })

        it('Request money from existing user', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.requestAmount(userValid, requestAmount)
            cy.log('**>View transaction history<**')
            dashboard.History().children().should('contain.text', `⏳ Requested $${requestAmount} from ${userValid}`)
        })

        context('Approve money request', () => {
            beforeEach(() => {
                loginAndGotoDashboard(users.JohnDoe)
                cy.requestAmount(userValid, requestAmount)
                dashboard.History().children().should('contain.text', `⏳ Requested $${requestAmount} from ${userValid}`)
            })

            it('Approve money request', () => {
                loginAndGotoDashboard(users.userValid)
                cy.intercept('POST', '/transaction/request/approve').as('approveRequest')
                dashboard.ApproveButton().first().click()
                cy.log('**>Verify API Approved request<**')
                cy.wait('@approveRequest').then((req: any) => {
                    const state = req.state
                    const statusCode = req.response.statusCode

                    expect(statusCode).to.deep.eq(200)
                    expect(state).to.deep.eq('Complete')
                })

                cy.log('**>View transaction history<**')
                dashboard.History().children().should('contain.text', `✔ Requested $${requestAmount} from ${userValid}`)
            })
        })

        context('Reject money request', () => {
            beforeEach(() => {
                loginAndGotoDashboard(users.JohnDoe)
                cy.requestAmount(userValid, requestAmount)
                dashboard.History().children().should('contain.text', `⏳ Requested $${requestAmount} from ${userValid}`)
            })

            it('Reject money request', () => {
                loginAndGotoDashboard(users.userValid)
                cy.intercept('POST', '/transaction/request/reject').as('rejectRequest')
                dashboard.RejectButton().first().click()
                cy.log('**>Verify API Rejected request<**')
                cy.wait('@rejectRequest').then((req: any) => {
                    const state = req.state
                    const statusCode = req.response.statusCode

                    expect(statusCode).to.deep.eq(200)
                    expect(state).to.deep.eq('Complete')
                })

                cy.log('**>View transaction history<**')
                dashboard.History().children().should('contain.text', `✘ Requested $${requestAmount} from ${userValid}`)
            })
        })
    })

    context('Non-Functional Tests', () => {

        it('Send with invalid fields', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.sendAmount('Invalid', '-1')
            cy.wait('@transactionSend').then((req: any) => {
                const state = req.response.body
                const statusCode = req.response.statusCode

                expect(statusCode).to.deep.eq(400)
                expect(state).to.deep.eq({ error: 'Invalid input' })
            })
        })

        it('Request with invalid fields', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.requestAmount('Invalid', '-1')
            cy.wait('@transactionRequest').then((req: any) => {
                const state = req.response.body
                const statusCode = req.response.statusCode

                expect(statusCode).to.deep.eq(400)
                expect(state).to.deep.eq({ error: 'Invalid input' })
            })
        })

        it('Attempt Request transaction with non-exisitng user', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.requestAmount('Invalid', '1')
            cy.wait('@transactionRequest').then((req: any) => {
                const state = req.response.body
                const statusCode = req.response.statusCode

                expect(statusCode).to.deep.eq(404)
                expect(state).to.deep.eq({ error: 'User not found' })
            })
        })

        it('Attempt Send transaction with non-exisitng user', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.sendAmount('Invalid', '1')
            cy.wait('@transactionSend').then((req: any) => {
                const state = req.response.body
                const statusCode = req.response.statusCode

                expect(statusCode).to.deep.eq(404)
                expect(state).to.deep.eq({ error: 'Sender or recipient not found' })
            })
        })

        it('Insufficiend fund on send', () => {
            loginAndGotoDashboard(users.JohnDoe)
            cy.sendAmount(userValid, '9999')
            cy.wait('@transactionSend').then((req: any) => {
                const state = req.response.body
                const statusCode = req.response.statusCode

                expect(statusCode).to.deep.eq(400)
                expect(state).to.deep.eq({ error: 'Insufficient balance' })
            })
        })
    })
})