import garagePage from '../pages/GaragePage';
import expensesPage from '../pages/ExpensesPage';

const CAR_DATA = { brand: 'Audi', model: 'TT', mileage: 100 };
const EXPENSE_DATA = {
  reportedAt: new Date().toISOString().split('T')[0],
  mileage: 250,
  liters: 10,
  totalCost: 450,
};

describe('Garage and Fuel Expenses', () => {
  let createdCarId;

  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.loginUser();
    garagePage.open();
  });

  it('should add a car via UI and intercept POST /api/cars to save car id', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    garagePage.addCar(CAR_DATA);

    cy.wait('@createCar').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq('ok');
      createdCarId = response.body.data.id;
      expect(createdCarId).to.be.a('number');
    });

    garagePage.getCarItems().should('have.length.gte', 1);
    garagePage.getCarItems().first().should('contain.text', CAR_DATA.brand);
  });

  it('should GET /api/cars and find the created car by intercepted id and UI data', () => {
    cy.request({
      method: 'GET',
      url: '/api/cars',
      auth: {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');

      const cars = response.body.data;
      expect(cars).to.be.an('array');

      const createdCar = cars.find((car) => car.id === createdCarId);
      expect(createdCar, `Car with id ${createdCarId} should exist`).to.exist;
      expect(createdCar.brand).to.eq(CAR_DATA.brand);
      expect(createdCar.model).to.eq(CAR_DATA.model);
      expect(createdCar.initialMileage).to.eq(CAR_DATA.mileage);
    });
  });

  it('should create an expense via API using custom command and validate response', () => {
    cy.createExpense({ carId: createdCarId, ...EXPENSE_DATA }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');

      const expense = response.body.data;
      expect(expense.carId).to.eq(createdCarId);
      expect(expense.mileage).to.eq(EXPENSE_DATA.mileage);
      expect(expense.liters).to.eq(EXPENSE_DATA.liters);
      expect(expense.totalCost).to.eq(EXPENSE_DATA.totalCost);
    });
  });

  it('should find the created car via UI and validate the expense created via API', () => {
    garagePage.getCarItems().should('have.length.gte', 1);
    garagePage.openExpensesForCarByTitle(`${CAR_DATA.brand} ${CAR_DATA.model}`);

    expensesPage.getExpenseItems().should('have.length.gte', 1);
    expensesPage.getExpenseItems().first().within(() => {
      cy.contains(String(EXPENSE_DATA.mileage)).should('exist');
      cy.contains(String(EXPENSE_DATA.liters)).should('exist');
      cy.contains(String(EXPENSE_DATA.totalCost)).should('exist');
    });
  });
});
