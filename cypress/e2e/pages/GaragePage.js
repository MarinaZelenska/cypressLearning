export class GaragePage {
  selectors = {
    brandSelect: '#addCarBrand',
    modelSelect: '#addCarModel',
    mileageInput: '#addCarMileage',
    addCarSubmit: '.modal-content .btn-primary',
    carItem: 'app-car',
    fuelExpensesBtn: 'app-car .btn-link',
  };

  open() {
    cy.visitApp('/panel/garage');
  }

  clickAddCar() {
    cy.contains('button', 'Add car').click();
    cy.get(this.selectors.brandSelect).should('be.visible');
  }

  selectBrand(brand) {
    cy.get(this.selectors.brandSelect).select(brand);
  }

  selectModel(model) {
    cy.get(this.selectors.modelSelect).select(model);
  }

  enterMileage(mileage) {
    cy.get(this.selectors.mileageInput).clear().type(mileage);
  }

  submitAddCar() {
    cy.get(this.selectors.addCarSubmit).click();
    cy.get(this.selectors.brandSelect).should('not.exist');
  }

  addCar({ brand, model, mileage }) {
    this.clickAddCar();
    this.selectBrand(brand);
    this.selectModel(model);
    this.enterMileage(mileage);
    this.submitAddCar();
  }

  getCarItems() {
    return cy.get(this.selectors.carItem);
  }

  getCarByTitle(title) {
    return cy.get(this.selectors.carItem).contains(title).closest(this.selectors.carItem);
  }

  openFuelExpensesForFirstCar() {
    cy.get(this.selectors.fuelExpensesBtn).first().click();
  }

  openFuelExpensesForCar() {
    cy.visitApp('/panel/expenses');
  }

  openExpensesForCarByTitle(title) {
    this.getCarByTitle(title).find('.btn-link').click();
  }
}

export default new GaragePage();
