export class Auth {

    //#region Signup
    TabSignup = () => cy.get('[id="tabSignup"]')
    SignupUsername = () => cy.get('[id="signupUsername"]')
    SignupPassword = () => cy.get('[id="signupPassword"]')
    SignupButton = () => cy.get('[id="signupButton"]')
    SignupPassError = () => cy.get('[id="signupPassError"]')
    //#endregion Signup

    LogoutBtn = () => cy.get('[id="logout-btn"]')
    LoginBtn = () => cy.get('[id="loginButton"]')
    LoginPassError = () => cy.get('[id="loginPassError"]')
}

export const auth = new Auth()