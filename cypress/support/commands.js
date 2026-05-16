Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.add('visitApp', () => {
  cy.visit('/', {
    auth: {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    },
  });
});

Cypress.Commands.add('login', (
  email = Cypress.env('userEmail'),
  password = Cypress.env('userPassword'),
) => {
  cy.visitApp();
  cy.contains('button', 'Sign in').click();
  cy.get('#signinEmail').clear().type(email);
  cy.get('#signinPassword').clear().type(password, { sensitive: true });
  cy.get('.modal-content button[type="submit"]').click();
  cy.url().should('include', '/garage');
});
