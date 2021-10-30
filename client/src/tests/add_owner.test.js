import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import AddOwner from '../components/owner/add_owner';
import GenericDropdown from "../components/misc/generic_dropdown";

test('should render component', () => {
    
    render(<AddOwner />);

    fireEvent.click(screen.getByRole("button", {name: /add new owner/i}));

    expect(screen.getByText("there should be a name")).toBeInTheDocument();

    expect(screen.getByRole("button", {name: /add new owner/i})).toBeEnabled();

    screen.debug();

});

test('should show dropdown', () => {
    
    render(<GenericDropdown title={"Dropdown"} center={false}> <button>item</button> </GenericDropdown>);

    fireEvent.click(screen.getByRole("button", {name: /Dropdown/i}));

    expect(screen.getByRole("button", {name: /item/i})).toBeInTheDocument();

    screen.debug();

});


