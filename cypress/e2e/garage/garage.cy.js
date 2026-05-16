import garagePage from '../pages/GaragePage';
import expensesPage from '../pages/ExpensesPage';

describe('Garage and Fuel Expenses', () => {
  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.loginUser();
    garagePage.open();
  });

  describe('Add car to garage', () => {
    it('should add a car to the garage', () => {
      garagePage.addCar({ brand: 'Audi', model: 'TT', mileage: 100 });
      garagePage.getCarItems().should('have.length.gte', 1);
      garagePage.getCarItems().first().should('contain.text', 'Audi');
    });
  });

  describe('Add fuel expense', () => {
    it('should add a fuel expense to the car', () => {
      garagePage.addCar({ brand: 'BMW', model: 'X5', mileage: 200 });
      garagePage.openFuelExpensesForFirstCar();
      expensesPage.addExpense({
        date: '11/25/2024',
        mileage: 250,
        liters: 10,
        totalCost: 450,
      });
      expensesPage.getExpenseItems().should('have.length.gte', 1);
    });
  });
});
