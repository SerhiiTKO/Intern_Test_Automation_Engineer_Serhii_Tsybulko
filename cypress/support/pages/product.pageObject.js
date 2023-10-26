import PageObject from '../PageObject';

class ProductPageObject extends PageObject {
  get productTitle() {
    return cy.get('[data-e2e="product-title"]');
  }

  assertProductTitle(productTitle) {
    this.productTitle
    .should('contain', productTitle);
  }
}

export default ProductPageObject;
