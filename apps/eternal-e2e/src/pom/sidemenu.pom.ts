class Sidemenu {
  open(page: string) {
    return cy.get(`a:contains('${page}')`).click();
  }
}

export const sidemenu = new Sidemenu();
