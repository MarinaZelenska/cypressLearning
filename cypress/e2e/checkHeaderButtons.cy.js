describe("Check header buttons", () => {
    beforeEach(() => {
      cy.login();
    });
  
    it("Header buttons should be correct", () => {
      cy.get(".header").within(() => {
        
        cy.contains("a.header-link", "Home")
          .should("be.visible")
          .and("have.class", "-active")
          .and("have.attr", "href", "/");
  
        cy.contains("button.header-link", "About")
          .should("be.visible")
          .and("not.have.class", "-active")
          .and("have.attr", "appscrollto", "aboutSection");
  
        cy.contains("button.header-link", "Contacts")
          .should("be.visible")
          .and("not.have.class", "-active")
          .and("have.attr", "appscrollto", "contactsSection");
  
        cy.contains("button.header-link", "Guest log in")
          .should("be.visible")
          .and("not.have.class", "-active");
  
        cy.contains(".header_signin", "Sign In")
          .should("be.visible")
          .and("not.have.class", "-active");
      });
    });
  });