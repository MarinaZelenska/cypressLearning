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

Cypress.Commands.add('visitApp', (path = '/') => {
  cy.visit(path, {
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
  cy.contains('button', 'Sign In').click();
  cy.get('#signinEmail').clear().type(email);
  cy.get('#signinPassword').clear().type(password, { sensitive: true });
  cy.get('.modal-content .btn-primary').click();
  cy.url().should('include', '/garage');
});

Cypress.Commands.add('registerUser', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth/signup',
    auth: {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    },
    body: {
      name: Cypress.env('userName') || 'Test',
      lastName: Cypress.env('userLastName') || 'User',
      email: Cypress.env('userEmail'),
      password: Cypress.env('userPassword'),
      repeatPassword: Cypress.env('userPassword'),
    },
    failOnStatusCode: false,
  }).then((response) => {
    const alreadyExists = response.body?.message === 'User already exists';
    if (!alreadyExists && response.status !== 200 && response.status !== 201) {
      throw new Error(`Registration failed with status ${response.status}: ${JSON.stringify(response.body)}`);
    }
  });
});

Cypress.Commands.add('loginUser', () => {
  cy.session(
    [Cypress.env('userEmail'), Cypress.env('userPassword')],
    () => {
      cy.request({
        method: 'POST',
        url: '/api/auth/signin',
        auth: {
          username: Cypress.env('username'),
          password: Cypress.env('password'),
        },
        body: {
          email: Cypress.env('userEmail'),
          password: Cypress.env('userPassword'),
          remember: false,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    },
    { cacheAcrossSpecs: true },
  );
});

Cypress.Commands.add('createExpense', ({ carId, reportedAt, mileage, liters, totalCost }) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    auth: {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    },
    body: {
      carId,
      reportedAt,
      mileage,
      liters,
      totalCost,
      forceMileage: false,
    },
  });
});
