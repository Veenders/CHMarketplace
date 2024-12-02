import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit CH Marketplace", () => {
  cy.visit("/");
});

Then("I should see a search bar", () => {
  cy.findByText('Get started by editing',{exact: false}).should('exist');
});