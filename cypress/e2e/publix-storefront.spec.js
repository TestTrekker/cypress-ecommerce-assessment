require('@cypress/xpath');

describe('Publix Cart Functionality', () => {

  before(() => {

    cy.viewport(1280, 720);

    // Step 1: Visit the Publix storefront and verify the page title
    cy.visit('store/publix/storefront');
    cy.title().should('eq', 'Publix Delivery or Pickup');

    // Step 2: Disable the address selection pop-up to proceed with testing
    cy.xpath("//div[@aria-label='Address collection prompt']//span[text()='Confirm']").click();
  });

  //Declaring P1, P2 Global variables to save product price from tile before adding to cart
  let p1, p2;
  it('Add a product to the cart and validate UI updates', () => {

    // Step 3: Alias XPath for the first product tile on the main dashboard
    const firstProductXpath = "((//h2)[2]//parent::div//parent::div//parent::div//following-sibling::div//div[@aria-label='Product'])[1]//span[text()='Add']";

    // Fetch price from the home page product locator
    cy.xpath("(((//h2)[2]//parent::div//parent::div//parent::div//following-sibling::div//div[@aria-label='Product'])[1]/a/div[2]/div/div)[1]")
      .invoke('text')
      .then((productPriceText) => {
        const match = productPriceText.match(/\$[0-9]+\.[0-9]{2}/);
        p1 = match ? parseFloat(match[0].replace('$', '')) : null;
        cy.log('Price of product p1:', p1);


    // Step 4: Add the first product to the cart using a custom command
    cy.addToCart(firstProductXpath);
    cy.wait(1000);
  });
    
    // Step 5: Validate the counter on the product tile updates to show 1 of that product in the cart
    cy.xpath("(//span[contains(text(),'Quantity:')]/following-sibling::span)")
      .invoke('text')
      .should('contain', '1');

    // Step 6: Validate the cart icon reflects 1 product
    cy.xpath('//button[@aria-label="View Cart. Items in cart: 1"]')
      .should('contain', '1');

    // Step 7: Perform a search for "water"
    cy.get('#search-bar-input').should('be.visible').and('not.be.disabled')
      .type('water') // Input the search term
      .should('have.value', 'water') // Assert input value is 'water'
      .type('{enter}') // Press Enter to initiate the search
      .wait(2500); // Wait for results to load (consider using a more dynamic wait if possible)

    // Step 8: Alias XPath for the first search result product
    const searchResultProductXpath = "((//span[contains(text(),'results for \"water\"')]//ancestor::div[@class='e-1yrpusx']/following-sibling::div)[1]//div[@aria-label='Product']//span[contains(text(),'Add')])[1]";

    // Fetch price from the search result product locator
    cy.xpath("(((//span[contains(text(),'results for \"water\"')]//ancestor::div[@class='e-1yrpusx']/following-sibling::div)[1]//div[@aria-label='Product'])[1]/a/div[2]/div/div)[1]")
      .invoke('text')
      .then((productSearchPriceText) => {
        const match = productSearchPriceText.match(/\$[0-9]+\.[0-9]{2}/);
        p2 = match ? parseFloat(match[0].replace('$', '')) : null;
        cy.log('Price of product p2:', p2);

    // Step 9: Add the search result product to the cart
    cy.addToCart(searchResultProductXpath);
    cy.scrollTo(0, 0); // Scroll to the top to ensure visibility of elements
  });

    // Step 10: Validate the counter on the product tile updates to show 1 of that product in the cart
    cy.xpath("(//span[contains(text(),'Quantity:')]/following-sibling::span)")
      .invoke('text')
      .should('contain', '1');
    
    // Step 11: Validate the cart icon reflects 2 products
    cy.xpath("//button[@aria-label='View Cart. Items in cart: 2']")
      .should('contain', '2');

    // Step 12: Remove the product from the cart using the button on the product tile
    const removeSearchResultProductXpath = "//button[contains(@aria-label,'Remove')]"; // Ensure this targets the correct product
    cy.removeFromCart(removeSearchResultProductXpath);
    cy.wait(1000);

    // Step 13: Validate that the product count updates after removal
    cy.xpath("(//span[contains(text(),'Quantity:')]/following-sibling::span)")
      .should('not.exist'); // Ensure the quantity span is not present after removal

    // Step 14: Validate the cart icon reflects 1 product
    cy.xpath("//button[@aria-label='View Cart. Items in cart: 1']")
      .should('contain', '1');

    // Step 15: Add the same product back to the cart
    cy.addToCart(searchResultProductXpath);
    cy.wait(1000);

    // Step 16: Open the cart using the button at the top right
    cy.xpath('//button[contains(@aria-label,"View Cart")]').click();
    cy.wait(2000);

    // Step 17: Validate that the 2 products appear in the cart
    cy.get('#cart-body', { timeout: 20000 }).should('be.visible');
    const cartProductClass = '.e-y7gk1u'; // Common class for cart products
    cy.get(cartProductClass).should('have.length', 2); // Check for the presence of products in the cart

    // Step 18: Initialize variables for prices in cart
    let productPricesInCart = [];

    // Step 19: Gather prices of products in the cart
    cy.xpath("//div[@id='cart-body']//div[@class='e-y7gk1u']")
      .each(($priceElement) => { // Use a jQuery-wrapped element
        const priceText = $priceElement.text(); // Get text content of the element
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract the numerical value
        productPricesInCart.push(price); // Store each price in an array
      }).then(() => {
        cy.log('Prices in cart:', productPricesInCart);

    // Step 20: Validate that the 2 products have the same prices in the cart
    const p1InCart = productPricesInCart.includes(p1);
    const p2InCart = productPricesInCart.includes(p2);
    
      // Assertions
      expect(p1InCart, `Price of product p1: ${p1} should be in cart`).to.be.true;
      expect(p2InCart, `Price of product p2: ${p2} should be in cart`).to.be.true;

    // Step 21: Calculate expected subtotal
    const expectedSubtotal = p1 + p2;
    cy.log(`Expected Subtotal in Cart: $${(expectedSubtotal).toFixed(2)}`);

    // Step 22: Validate subtotal displayed in the cart
    cy.xpath("//div[@class='e-1umwukd']")
      .invoke('text')
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace(/[^0-9.-]+/g, "")); // Extract numerical value
        expect((expectedSubtotal).toFixed(2)).to.equal((subtotal).toFixed(2)); // Ensure the displayed subtotal matches the expected subtotal
      });
    });
  });
});