describe("make appointment", () => {
  beforeEach(() => {
    cy.login();
  });

  it("displays the appointment creation form", () => {
    cy.visit("/appointments");
    cy.url().should("include", "/appointments");

    cy.get("[data-testid='add-new-appointment']").click();
  });
});
