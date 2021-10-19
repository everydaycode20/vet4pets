import { render, screen } from '@testing-library/react';
import App from './App';

import AddressDropdown from "./components/misc/address_dropdown";

import AddAppointment from "./components/appointments/add_appointment";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test("prueba", () => {

//   render(<AddressDropdown id={1} address={"test"}/>);

//   screen.debug();
// });

test("prueba", () => {

  render(<AddAppointment />);

  expect( screen.getByRole( "button", {name: /Save appointment/i} ) ).toBeDisabled();
  
  // screen.debug();

});
