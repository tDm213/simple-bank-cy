export class Dashboard {

    LogoutBtn = () => cy.get('[id="logout-btn"]')
    History = () => cy.get('[id="history"]')
    ApproveButton = () => cy.get('[id="approveBtn"]')
    RejectButton = () => cy.get('[id="rejectBtn"]')
}

export const dashboard = new Dashboard()