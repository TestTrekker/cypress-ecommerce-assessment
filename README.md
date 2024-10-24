# cypress-ecommerce-assessment
# Publix Storefront E-commerce Flow Test

## Overview
This repository contains automated tests for the Publix Storefront e-commerce platform using Cypress. The tests validate the core user flow of adding a product to the cart, checking the cart counter, and performing a product search.

## Prerequisites
Before running the tests, ensure you have the following installed:

- [Node.js] (https://nodejs.org/) (Latest)
- [Cypress] (https://www.cypress.io/) (Latest)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/publix-ecommerce-flow-test.git
   cd publix-ecommerce-flow-test

2. Install the required dependencies:
    ```bash
    npm install

## Running the Tests
1. To run the tests, use the following command:
    ```bash
    npx cypress open

This will open the Cypress Test Runner, where you can select and run the publix_ecommerce_flow_spec.js test file.

## Test Description

### Test Case: E-commerce Flow

The test follows these steps:

1. **Visit:** https://delivery.publix.com/store/publix/storefront 
2. Add a product from the main dashboard page to the cart
3. Validate the counter on the product tile updates to show 1 of that product in the cart
4. Validate the cart button in the top right corner has been updated to indicate there is 1 product in the cart
5. Search for “water”
6. Add a product from the search results to the cart
7. Validate that the counter on the product tile updates to show 1 of that product in the cart
8. Validate the cart button in the top right corner has been updated to indicate there are 2 products in the cart
9. Remove that product from the cart using the button on the product tile
10. Validate that the counter on the product tile updates to indicate that the product is no longer in the cart
11. Validate the cart button in the top right corner has been updated to indicate there is 1 product in the cart
12. Add the same product back to the cart
13. Open the cart using the button at the top right
14. Validate that the 2 products appear in the cart
15. Validate that the 2 products have the same prices in the cart that were displayed on the product tile
16. Validate that the subtotal shown in the cart is the correct sum of the prices of the products that are in the cart


## Custom Commands

The following custom commands are defined for reuse across test cases:

- **addProductToCart:** Adds a product to the cart based on a provided selector.
- **removeProductFromCart:** Removes a product from the cart based on a provided selector.

## Notes

- The tests are designed to work as a guest user without requiring login.
- Ensure that the product data on the storefront is dynamic, as the tests rely on current product availability and pricing.

## License

This project is licensed under the MIT License.