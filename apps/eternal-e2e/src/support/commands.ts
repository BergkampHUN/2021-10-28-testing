/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getByAttr(selector: string): Chainable<Element>;
    getContains(selector: string, text: string): Chainable<Element>;
  }
}

Cypress.Commands.add('getByAttr', (selector) => cy.get(`[data-test=${selector}]`));

Cypress.Commands.add('getContains', (selector, text) => {
  cy.get(selector).should('contain', text);
  return cy.get(selector).contains(text);
});
