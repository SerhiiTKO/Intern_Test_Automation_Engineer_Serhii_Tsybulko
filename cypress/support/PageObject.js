class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  async assertUrl(pageUrl) {
    await cy.url().should('contain', pageUrl);
  }
}

export default PageObject;
