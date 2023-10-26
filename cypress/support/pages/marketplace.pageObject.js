import PageObject from '../PageObject';

class MarketplacePageObject extends PageObject {
  get searchField() {
    return cy.get('.sc-iIUQWv');
  }

  fillIntoSearchField(text) {
    this.searchField
      .type(text);
  }

  get searchButton() {
    return cy.contains('.sc-fotOHu', 'Search');
  }

  clickSearchButton() {
    this.searchButton
      .click();
  }

  clickOnSearchedProduct(productName) {
    cy.contains('.ant-typography', productName)
      .click();
  }

  assertFirstProductContainsKeyword(keyword) {
    const url = 'https://kcp-api.klickly-dev.com/marketplace/search?q=STAR%20WARS&page=1';
    cy.request('GET', url).then((response) => {
      expect(response.body.promotions[0]).to.have.property("title").that.includes(keyword);
    })
  }

  assertLastProductContainsKeyword(keyword) {
    const url = 'https://kcp-api.klickly-dev.com/marketplace/search?q=STAR%20WARS&page=1';
    cy.request('GET', url).then((response) => {
      expect(response.body.promotions[response.body.promotions.length - 1])
      .to.have.property("title").that.includes(keyword);
    })
  }

  emulateTestFailure(title) {
    const url = 'https://kcp-api.klickly-dev.com/marketplace/search?q=STAR%20WARS&page=1';
    cy.intercept('GET', url, {fixture: 'searchList.json'}).as('searchRequest');
    
    cy.wait('@searchRequest').then((interception) => {
      const response = interception.response.body;
      const containsTitle = response.promotions.some((item) => item.title.includes(title));

      if (!containsTitle) {
        throw new Error(`The product: ${title} was not found in the search results`);
      }
        
      expect(containsTitle).to.be.true;
    });
  }

  scrollTo(element) {
    cy.get('.ant-row > .ant-col').last().then(($div) => {
      const el = $div[0];
      el.scrollIntoView();
    });
  }

  checkSecondPageProducts() {
    const firstPageUrl = 'https://kcp-api.klickly-dev.com/marketplace/promotions?page=1';
    const secondPageUrl = 'https://kcp-api.klickly-dev.com/marketplace/promotions?page=2';

    cy.request('GET', firstPageUrl).then((firstPageResponse) => {
      cy.request('GET', secondPageUrl).then((secondPageResponse) => {
        let duplicate;
        for (let i = 0; i < secondPageResponse.body.promotions.length; i++) {
          const productId = secondPageResponse.body.promotions[i].id
          duplicate = firstPageResponse.body.promotions.some((item) => item.id.includes(productId));

          if (duplicate) {
            throw new Error(`Some of the products are duplicated with the first page.`);
          };
        };
        expect(duplicate, 'All products on the second page are different from the first one').to.equal(false)
      });
    });
  }
}

export default MarketplacePageObject;
