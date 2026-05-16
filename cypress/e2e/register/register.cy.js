import { RegisterPage } from '../pages/RegisterPage';
import { createUser } from '../../fixtures/user';

const page = new RegisterPage();

describe('Register to Hillel Test Site', () => {
  let user;

  beforeEach(() => {
    cy.visitApp();
    page.openModal();
    page.validateModalIsOpen();
    user = createUser();
  });

  describe('Field "Name"', () => {
    it('shows "Name is required" for empty field', () => {
      cy.get(page.selectors.nameInput).focus().blur();
      page.validateErrorMessage(page.selectors.nameInput, 'Name required');
    });

    it('shows "Name is invalid" for non-letter characters', () => {
      page.fillName('123').blur();
      page.validateErrorMessage(page.selectors.nameInput, 'Name is invalid');
    });

    it('shows length error for name shorter than 2 characters', () => {
      page.fillName('A').blur();
      page.validateErrorMessage(page.selectors.nameInput, 'Name has to be from 2 to 20 characters long');
    });

    it('shows length error for name longer than 20 characters', () => {
      page.fillName('A'.repeat(21)).blur();
      page.validateErrorMessage(page.selectors.nameInput, 'Name has to be from 2 to 20 characters long');
    });

    it('has red border on validation error', () => {
      cy.get(page.selectors.nameInput).focus().blur();
      page.validateBorderColorRed(page.selectors.nameInput);
    });
  });

  describe('Field "Last name"', () => {
    it('shows "Last name is required" for empty field', () => {
      cy.get(page.selectors.lastNameInput).focus().blur();
      page.validateErrorMessage(page.selectors.lastNameInput, 'Last name required');
    });

    it('shows "Last name is invalid" for non-letter characters', () => {
      page.fillLastName('123').blur();
      page.validateErrorMessage(page.selectors.lastNameInput, 'Last name is invalid');
    });

    it('shows length error for last name shorter than 2 characters', () => {
      page.fillLastName('A').blur();
      page.validateErrorMessage(page.selectors.lastNameInput, 'Last name has to be from 2 to 20 characters long');
    });

    it('shows length error for last name longer than 20 characters', () => {
      page.fillLastName('A'.repeat(21)).blur();
      page.validateErrorMessage(page.selectors.lastNameInput, 'Last name has to be from 2 to 20 characters long');
    });

    it('has red border on validation error', () => {
      cy.get(page.selectors.lastNameInput).focus().blur();
      page.validateBorderColorRed(page.selectors.lastNameInput);
    });
  });

  describe('Field "Email"', () => {
    it('shows "Email required" for empty field', () => {
      cy.get(page.selectors.emailInput).focus().blur();
      page.validateErrorMessage(page.selectors.emailInput, 'Email required');
    });

    it('shows "Email is incorrect" for invalid email format', () => {
      page.fillEmail('invalid-email').blur();
      page.validateErrorMessage(page.selectors.emailInput, 'Email is incorrect');
    });

    it('has red border on validation error', () => {
      cy.get(page.selectors.emailInput).focus().blur();
      page.validateBorderColorRed(page.selectors.emailInput);
    });
  });

  describe('Field "Password"', () => {
    it('shows "Password required" for empty field', () => {
      cy.get(page.selectors.passwordInput).focus().blur();
      page.validateErrorMessage(page.selectors.passwordInput, 'Password required');
    });

    it('shows error for password shorter than 8 characters', () => {
      page.fillPassword('Aa1').blur();
      page.validateErrorMessage(
        page.selectors.passwordInput,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('shows error for password longer than 15 characters', () => {
      page.fillPassword('Aa1' + 'b'.repeat(13)).blur();
      page.validateErrorMessage(
        page.selectors.passwordInput,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('shows error for password without capital letter', () => {
      page.fillPassword('password1').blur();
      page.validateErrorMessage(
        page.selectors.passwordInput,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('shows error for password without digit', () => {
      page.fillPassword('Passwordabc').blur();
      page.validateErrorMessage(
        page.selectors.passwordInput,
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('has red border on validation error', () => {
      cy.get(page.selectors.passwordInput).focus().blur();
      page.validateBorderColorRed(page.selectors.passwordInput);
    });
  });

  describe('Field "Re-enter password"', () => {
    it('shows "Re-enter password required" for empty field', () => {
      cy.get(page.selectors.repeatPasswordInput).focus().blur();
      page.validateErrorMessage(page.selectors.repeatPasswordInput, 'Re-enter password required');
    });

    it('shows "Passwords do not match" when passwords differ', () => {
      page.fillPassword(user.password);
      page.fillRepeatPassword('DifferentPass1').blur();
      page.validateErrorMessage(page.selectors.repeatPasswordInput, 'Passwords do not match');
    });

    it('has red border on validation error', () => {
      cy.get(page.selectors.repeatPasswordInput).focus().blur();
      page.validateBorderColorRed(page.selectors.repeatPasswordInput);
    });
  });

  describe('Button "Register"', () => {
    it('is disabled when form is empty', () => {
      page.validateRegisterButtonDisabled();
    });

    it('is disabled when form has invalid data', () => {
      page.fillName('123').blur();
      page.validateRegisterButtonDisabled();
    });

    it('creates new user and redirects to garage with valid data', () => {
      page.fillForm(user);
      page.submitRegistration();
      cy.url().should('include', '/garage');
    });
  });
});
