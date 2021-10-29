import { customer } from '../pom/customer.pom';
import { sidemenu } from '../pom/sidemenu.pom';
import { CustomerComponentHarness } from '../../../eternal/src/app/customer/customer/customer.component.harness';
import { getHarness } from '@jscutlery/cypress-harness';

describe('init', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it.skip('should do a sanity check', () => {
    //
  });
  it.skip('should do an implicit subject assertion', () => {
    cy.get('[data-test=btn-holidays]').should('have.text', 'Holidays');
    cy.get('[data-test=btn-holidays]').should('have.attr', 'href', '/holidays');
    cy.get('[data-test=btn-holidays]').should(
      'have.attr',
      'class',
      'mat-focus-indicator mat-raised-button mat-button-base'
    );
  });

  it.skip('should do an explicit subject assertion new', () => {
    cy.get('[data-test=btn-holidays]').should(($button) => {
      expect($button).to.have.text('Holidays');
      expect($button).to.have.class('mat-raised-button');
      expect($button).to.have.attr('href', '/holidays');
    });
  });
  it.skip('should go to the customers list and count the rows:', () => {
    cy.get('[data-test=btn-customers]').click();
    cy.get('[data-test="row-customer"]').should('have.length', 10);
  });
  it.skip('should rename Latitia to Laetitia via the form', () => {
    cy.get('[data-test=btn-customers]').click();
    cy.get('div').should('contain.text', 'Latitia');
    cy.get('div').contains('Latitia').siblings('.edit').click();
    cy.get('.formly-firstname input').clear().type('Laetitia');
    cy.get('button[type=submit]').click();
    cy.get('div').should('contain.text', 'Laetitia');
    cy.get('div').should('not.contain.text', 'Latitia');
  });
  it.skip('should add a new customer and check if it appears on the listing page.', () => {
    cy.get('[data-test=btn-customers]').click();
    cy.get('[data-test=btn-customers-add]').click();
    cy.get('.formly-firstname input').type('Test');
    cy.get('.formly-name input').type('Doe');
    cy.get('mat-select').click().get('mat-option').contains('Austria').click();

    cy.get('.formly-birthdate input').type('10.10.2021');

    cy.get('button[type=submit]').click();
    cy.get('[data-test=btn-customers-next]').click();
    cy.get('[data-test=btn-customers-next]').click();
    cy.get('div').should('contain.text', 'Test Doe');
  });

  it.skip('Should intercept Network Requests', () => {
    cy.intercept('GET', '**/holiday', { fixture: 'holidays.json' });
    cy.getByAttr('btn-holidays').click();
    cy.getContains('app-holiday-card', 'Unicorn');
  });

  it.skip('should add a new customer', () => {
    sidemenu.open('Customers');
    cy.getByAttr('btn-customers-add').click();
    customer.setFirstname('Tom');
    customer.setName('Lincoln');
    customer.setCountry('USA');
    customer.setBirthday(new Date(1995, 9, 12));
    customer.submit();
    cy.getByAttr('btn-customers-next').click();
    cy.getByAttr('btn-customers-next').click();

    cy.get('div').should('contain.text', 'Tom Lincoln');
  });
  it('should add a new customer with harness', () => {
    sidemenu.open('Customers');
    cy.getByAttr('btn-customers-add').click();
    const harness = getHarness(CustomerComponentHarness);
    harness.setFirstname('Tom');
    harness.setName('Lincoln');
    harness.setCountry('USA');
    harness.setBirthday(new Date(1995, 9, 12));
    harness.submit();
    cy.getByAttr('btn-customers-next').click();
    cy.getByAttr('btn-customers-next').click();

    cy.get('div').should('contain.text', 'Tom Lincoln');
  });
});
