describe('appointment', () => {

    it("user can make an appointment", () => {

        //login
        cy.visit("http://localhost:3000/login");
        cy.findByRole('textbox', {  name: /username/i}).type("admin");
        cy.findByLabelText(/password/i).type("admin");
        cy.findByRole('button', {  name: /login/i}).click();

        //select appointments from sidebar
        cy.findByRole('link', {  name: /appointments/i}).click();

        //click button "schedule appointment"
        cy.findByRole('button', {  name: /schedule appointment/i}).click();

        //add service
        cy.findByRole('button', {  name: /add service/i}).click();
        cy.findByRole('button', {  name: /general checkup/i}).click();

        //add owner
        cy.findByRole('button', {  name: /add owner/i}).click();
        cy.findByRole('button', {  name: /Talon Cunningham/i}).click();

        //add pet
        cy.findByRole('button', {  name: /add pet/i}).click();
        cy.findByRole('button', {  name: /bicolor/i}).click();

        //add date
        cy.findByRole('button', {  name: /add date/i}).click();
        cy.findByRole('button', {  name: /12/i}).click();
        cy.findByRole('button', {  name: /11:00/i}).click();

        //click save appointment
        cy.findByRole('button', {  name: /save appointment/i}).click();

    });

});
