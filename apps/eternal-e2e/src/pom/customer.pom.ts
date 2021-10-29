import { format } from 'date-fns';

class Customer {
  setFirstname(firstname: string) {
    return cy.get('.formly-firstname input').type(firstname);
  }
  setName(name: string) {
    return cy.get('.formly-name input').type(name);
  }
  setCountry(country: string) {
    return cy.get('mat-select').click().get('mat-option').contains(country).click();
  }
  setBirthday(date: Date) {
    return cy.get('.formly-birthdate input').clear().type(format(date, 'dd.MM.yyyy'));
  }
  submit() {
    return cy.get('button[type=submit]').click();
  }
}

export const customer = new Customer();
