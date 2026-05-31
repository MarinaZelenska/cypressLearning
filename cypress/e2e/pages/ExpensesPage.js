export class ExpensesPage {
  selectors = {
    addExpenseBtn: '.btn-link.add-expense-btn, button[class*="add-expense"]',
    addExpModal: '#addExpenseModal',
    dateInput: '#addExpDate',
    mileageInput: '#addExpMileage',
    litersInput: '#addExpLiters',
    totalCostInput: '#addExpTotalCost',
    addExpSubmit: '#addExpenseModal .btn-primary',
    expensesList: '.expenses-list',
    expenseItem: '.expenses-list-item, .expense-item',
  };

  clickAddExpense() {
    cy.contains('button', 'Add an expense record').click();
    cy.get(this.selectors.addExpModal).should('be.visible');
  }

  fillDate(date) {
    cy.get(this.selectors.dateInput).clear().type(date);
  }

  fillMileage(mileage) {
    cy.get(this.selectors.mileageInput).clear().type(mileage);
  }

  fillLiters(liters) {
    cy.get(this.selectors.litersInput).clear().type(liters);
  }

  fillTotalCost(cost) {
    cy.get(this.selectors.totalCostInput).clear().type(cost);
  }

  fillExpenseForm({ date, mileage, liters, totalCost }) {
    this.fillDate(date);
    this.fillMileage(mileage);
    this.fillLiters(liters);
    this.fillTotalCost(totalCost);
  }

  submitAddExpense() {
    cy.get(this.selectors.addExpSubmit).click();
    cy.get(this.selectors.addExpModal).should('not.exist');
  }

  addExpense({ date, mileage, liters, totalCost }) {
    this.clickAddExpense();
    this.fillExpenseForm({ date, mileage, liters, totalCost });
    this.submitAddExpense();
  }

  getExpenseItems() {
    return cy.get('.expenses tbody tr');
  }
}

export default new ExpensesPage();
