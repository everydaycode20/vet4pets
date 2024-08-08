import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import "./App.scss";

import Login from "./routes/login/login";
import Root from "./routes/root/root";
import Dashboard from "./routes/dashboard/dashboard";
import Appointments from "./routes/appointments/appointments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <>
        <h1>404</h1>
      </>
    ),
    children: [
      // {
      //   index: true,
      //   loader: async () => redirect("/login"),
      // },
      {
        path: "dashboard",
        element: <Dashboard />,
        handle: {
          title: "Dashboard",
        },
      },
      {
        path: "appointments",
        element: <Appointments />,
        handle: {
          title: "Appointments",
        },
      },
      {
        path: "settings",
        element: <div>settings</div>,
        handle: {
          title: "Settings",
        },
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <div className="w-full">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
