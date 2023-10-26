/// <reference types='cypress' />
/// <reference types='../support' />

import MarketplacePageObject from '../support/pages/marketplace.pageObject';
import ProductPageObject from '../support/pages/product.pageObject';

const marketplacePage = new MarketplacePageObject();
const productPage = new ProductPageObject();

let element;

describe('Marketplace page', () => {
  before(() => {
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
  });

  beforeEach(() => {
    cy.visit(element.url.marketplaceUrl);
  });

  it('should allow the user to find a product and open it\'s page', () => {
    marketplacePage.fillIntoSearchField(element.product.tShirtTitle);
    marketplacePage.clickSearchButton();
    marketplacePage.clickOnSearchedProduct(element.product.tShirtTitle);
    
    productPage.assertUrl(element.product.tShirtId);
    productPage.assertProductTitle(element.product.tShirtTitle);
  });

  it('should display searched by keyword products', () => {
    marketplacePage.fillIntoSearchField(element.product.keyword);
    marketplacePage.clickSearchButton();
    marketplacePage.assertFirstProductContainsKeyword(element.product.keyword);
    marketplacePage.assertLastProductContainsKeyword(element.product.keyword);
  });

  it('should display an error message if the product not found', () => {
    marketplacePage.fillIntoSearchField(element.product.keyword);
    marketplacePage.clickSearchButton();
    marketplacePage.emulateTestFailure(element.product.filmTitle);
  });

  
  it('should display products on the second page different from the first one', () => {
    marketplacePage.scrollTo(element.lastProduct);
    marketplacePage.checkSecondPageProducts();
  });

});
