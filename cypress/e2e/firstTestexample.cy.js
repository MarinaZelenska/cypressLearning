

describe("First test example", () => {
    it("check the main page is opened", () => {
      cy.login();
      cy.get('.header_signin').should('be.visible')
    });
  });