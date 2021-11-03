import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import AddAppointment from "../components/appointments/add_appointment";
import { AppointmentCard } from "../components/appointments/calendar";
import DotBtn from "../components/misc/dot_btn";


test('should show card', () => {
    
    function deleteCard() {};

    render(<AppointmentCard data-testid="dropdown" item={{nameOwner: "name", namePet: "pet", appointmentName: "name", time: "10:30"}} border="4px solid black" index={1} deleteCard={deleteCard}/>);

    expect(screen.getByTestId("dropdown")).toBeInTheDocument();

    screen.debug();


});

test('should show a dropdown', () => {
    
    render(<DotBtn id={1} > <span>option 1</span> </DotBtn>);

    userEvent.click(screen.getByTestId("dropdown"));

    // screen.debug();

});

test('should show calendar', () => {

    render(<AddAppointment/>);

    userEvent.click(screen.getByRole("button", {name: /add date/i}));

    expect(screen.getByTestId("calendar")).toBeInTheDocument();

    // screen.debug();

});

