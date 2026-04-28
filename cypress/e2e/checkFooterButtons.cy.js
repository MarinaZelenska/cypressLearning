describe("Check Contacts section", () => {
    beforeEach(() => {
      cy.login();
    });
  
    it("Social links should be visible and have correct attributes", () => {
      const socialLinks = [
        { part: "facebook", url: "https://www.facebook.com/Hillel.IT.School" },
        { part: "t.me", url: "https://t.me/ithillel_kyiv" },
        {
          part: "youtube",
          url: "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1",
        },
        { part: "instagram", url: "https://www.instagram.com/hillel_itschool/" },
        { part: "linkedin", url: "https://www.linkedin.com/school/ithillel/" },
      ];
  
      cy.get("#contactsSection").within(() => {
        socialLinks.forEach(({ part, url }) => {
          cy.get(`a[href*="${part}"]`)
            .should("be.visible")
            .and("have.attr", "href", url)
            .and("have.attr", "target", "_blank")
            .and("have.attr", "rel", "nofollow");
        });
      });
    });
  
    it("Website and email links should be visible and have correct attributes", () => {
      cy.get("#contactsSection").within(() => {
        cy.get("a.contacts_link.display-4")
          .should("be.visible")
          .and("have.text", "ithillel.ua")
          .and("have.attr", "href", "https://ithillel.ua")
          .and("have.attr", "target", "_blank")
          .and("have.attr", "rel", "nofollow");
  
        cy.get("a.contacts_link.h4")
          .should("be.visible")
          .and("have.text", "support@ithillel.ua")
          .and("have.attr", "href", "mailto:developer@ithillel.ua");
      });
    });
  });