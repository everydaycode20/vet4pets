describe("make appointment", () => {
  beforeEach(() => {
    cy.login();
  });

  it("create a new appointment", () => {
    cy.visit("/appointments");

    cy.url().should("include", "/appointments");

    cy.get("[data-testid='add-new-appointment']").click();

    cy.get("[data-testid='select-appointment-combobox']")
      .click()
      .type("surgery");

    cy.get("[role='option']").contains("Surgery").click();

    cy.get("[data-testid='select-owner']").click();

    cy.get("[data-testid='owner-table']")
      .find('input[type="checkbox"]')
      .first()
      .check();

    cy.get("[aria-label='close dialog']").click();

    cy.get('[data-testid="owner-table"]').should("not.exist");

    cy.get("[data-testid='select-pet-combobox']").click();

    cy.get('[data-testid="select-pet-combobox-item"]').first().click();

    cy.get(".rdp-day").contains("15").click();

    cy.get("[data-testid='time-range-start']").click();

    cy.contains("10:00").click();

    cy.get("[data-testid='time-range-end']").click();

    cy.get('[data-testid="time-options-list"]')
      .eq(1)
      .should("be.visible")
      .contains("11:00")
      .click();

    cy.get("[data-testid='submit-appointment-btn']").click();

    cy.contains("Appointment added").should("be.visible");
  });
});
