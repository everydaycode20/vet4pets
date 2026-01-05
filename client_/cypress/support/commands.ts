/// <reference types="cypress" />

Cypress.Commands.add(
  "login",
  (email = "string@a.com", password = "strinG1*") => {
    cy.session([email, password], () => {
      cy.visit("/login");
      cy.get('[data-testid="email"]').type(email);
      cy.get('[data-testid="password"]').type(password);
      cy.get('[data-testid="submit-btn"]').click();
      cy.url().should("include", "/dashboard");
      cy.get('[data-testid="sidebar-nav"]').should("be.visible");
    });
  }
);
