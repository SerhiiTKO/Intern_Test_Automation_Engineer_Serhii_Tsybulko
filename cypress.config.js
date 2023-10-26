const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://giftly.klickly-dev.com/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        customVariables() {
          return {
            url: {
              marketplaceUrl: '/marketplace',
            },
            bottom: 2000,
            product: {
              tShirtId: '649429144e16b585ba8de035',
              tShirtTitle: 'T-Shirt4',
              keyword: 'STAR WARS',
              filmTitle: 'ROGUE ONE: A STAR WARS STORY [4K UHD]'              
            },
            lastProduct: 'The Multi-location Snowboard'
          };
        }
      });
    }
  }
});
