
export class RegisterPage {

  selectors = {
    modal: '.modal-content',
    nameInput: '#signupName',
    lastNameInput: '#signupLastName',
    emailInput: '#signupEmail',
    passwordInput: '#signupPassword',
    repeatPasswordInput: '#signupRepeatPassword',
    registerButton: '.modal-content .btn-primary',
  }

  openModal() {
    cy.contains('button', 'Sign up').click();
    return cy.get(this.selectors.modal);
  }

  fillName(value) {
    return cy.get(this.selectors.nameInput).clear().type(value);
  }

  fillLastName(value) {
    return cy.get(this.selectors.lastNameInput).clear().type(value);
  }

  fillEmail(value) {
    return cy.get(this.selectors.emailInput).clear().type(value);
  }

  fillPassword(value) {
    return cy.get(this.selectors.passwordInput).clear().type(value);
  }

  fillRepeatPassword(value) {
    return cy.get(this.selectors.repeatPasswordInput).clear().type(value);
  }

  fillForm({ name, lastName, email, password, repeatPassword }) {
    this.fillName(name);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillRepeatPassword(repeatPassword);
  }

  submitRegistration() {
    return cy.get(this.selectors.registerButton).click();
  }

  getError(inputSelector) {
    return cy.get(inputSelector).parent().find('.invalid-feedback');
  }

  validateModalIsOpen() {
    return cy.get('.modal-title').should('have.text', 'Registration');
  }

  validateErrorMessage(inputSelector, text) {
    this.getError(inputSelector).should('have.text', text);
  }

  validateBorderColorRed(inputSelector) {
    cy.get(inputSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  }

  validateRegisterButtonDisabled() {
    cy.get(this.selectors.registerButton).should('be.disabled');
  }
}

export default new RegisterPage();
