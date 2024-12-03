import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit CH Marketplace", () => {
  cy.viewport(375, 951);
  cy.visit("/");
});

When("I should see the main page", () => {
  cy.findByText('CH Marketplace',{selector: 'h1'}).should('exist');
  cy.findByText('Zum Warenkorb hinzugefügt').should('not.exist');
  cy.findAllByText('Pflichtangaben').should('to.have.length',15);
  cy.findAllByText('Pflichtangaben').should('be.visible');
  cy.findByText('Total').should('not.exist');
  cy.findByText('Summe').should('not.exist');
  cy.findByText('(0 Produkte)').should('not.exist');
  cy.findByText('0 Produkte').should('exist');
  cy.findByText('0.00 €').should('not.exist');
  cy.findByText('Ratgeber').should('exist');
  cy.get('[class*="productlist"]').should('have.css', 'display', 'grid');
  cy.get('[class*="productlist"]').invoke('css', 'grid-template-columns').then((value) => {
    expect(value.split(' ').length).to.eq(1);
  });
});

Then("I could see {string} product", (product:string) => {
  cy.findByText(product).should('exist');
});

Then("I could add a product to the shopping Cart", () => {
  cy.findAllByRole('button', {name: '+'}).first().click();
  cy.findByText('Einzelpreis:', {exact: false}).should('not.exist');
  cy.findByText('1 Produkte').should('exist');
  cy.findAllByText('26.50 €').should('not.exist');
});

Then("I could remove a product to the shopping Cart", () => {
  cy.findByText('Zur Übersicht').click();
  cy.findByText('(1 Produkte)').should('exist');
  cy.findAllByText('26.50 €').should('to.have.length', 2);
  cy.get('[class*="cartlist"]').findByTestId('trash').click();
  cy.findByText('Einzelpreis:', {exact: false}).should('not.exist');
  cy.findByText('(0 Produkte)').should('exist');
  cy.findAllByText('0.00 €').should('exist');
});