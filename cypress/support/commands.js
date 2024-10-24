// Custom command to add a product to the cart
Cypress.Commands.add('addToCart', (productXpath) => {
  cy.xpath(productXpath, { timeout: 2000 }) // Set a timeout for the XPath search
    .should('be.visible') // Assert that the element is visible
    .click() // Click on the 'Add' button
    .then(() => {
      cy.log('Product added to cart successfully.'); // Log success message
    });
});

// Custom command to remove a product from the cart
Cypress.Commands.add('removeFromCart', (productXpath) => {
  cy.xpath(productXpath, { timeout: 2000 }) // Set a timeout for the XPath search
    .should('be.visible') // Assert that the element is visible
    .then(($el) => {
      if ($el.length > 0) { // Check if any elements are found
        cy.wrap($el).first().click(); // Click the first matching element
        cy.log('Product removed from cart successfully.'); // Log success message
      } else {
        cy.log('No product found to remove.'); // Log if no elements are found
      }
    });
});