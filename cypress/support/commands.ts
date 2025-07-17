/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


enum login {
  Username = '[id="loginUsername"]',
  Password = '[id="loginPassword"]',
  Button = '[id="loginButton"]'
}

enum tabSend {
    Tab = '[id="tabSend"]',
    InputSendTo = '[id="sendTo"]',
    InputSendAmount = '[id="sendAmount"]',
    Button = '[id="SendAmountButton"]'
}

enum tabRequest {
    Tab = '[id="tabRequest"]',
    InputFrom = '[id="requestFrom"]',
    InputAmountFrom = '[id="requestAmount"]',
    Button = '[id="RequestAmountButton"]'
}


Cypress.Commands.add("login", (user : any, password : any) => {
  cy.get(login.Username).type(user.username)
  cy.get(login.Password).type(password)
  cy.get(login.Button).click()
})

Cypress.Commands.add('sendAmount', (to, amount) => {
  cy.get(tabSend.Tab).click()
  cy.get(tabSend.InputSendTo).type(to)
  cy.get(tabSend.InputSendAmount).type(amount)
  cy.intercept('POST', '/transaction/send').as('transactionSend')
  cy.get(tabSend.Button).click()
})

Cypress.Commands.add('requestAmount', (from, amount) => {
  cy.get(tabRequest.Tab).click()
  cy.get(tabRequest.InputFrom).type(from)
  cy.get(tabRequest.InputAmountFrom).type(amount)
  cy.intercept('POST', '/transaction/request').as('transactionRequest')
  cy.get(tabRequest.Button).click()
})

declare namespace Cypress {
  interface Chainable {
    login(username: any, password: any): Chainable<void>
    sendAmount(to: any, amount: any): Chainable<void>
    requestAmount(from: any, amount: any): Chainable<void>
  }
}

