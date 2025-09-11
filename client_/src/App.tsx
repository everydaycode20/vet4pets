import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { HubConnectionBuilder } from "@microsoft/signalr";

import "./App.scss";

import Login from "./routes/login/login";
import Root from "./routes/root/root";
import Dashboard from "./routes/dashboard/dashboard";
import Appointments from "./routes/appointments/appointments";
import Owner from "./routes/owners/owners";
import Pets from "./routes/pets/pets";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "./hooks/useGetUser";
import { useAtom } from "jotai";
import { spinnerState } from "./components/spinner/spinner-state";

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
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
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
        path: "owners",
        element: <Owner />,
        handle: {
          title: "Pet Owners",
        },
      },
      {
        path: "pets",
        element: <Pets />,
        handle: {
          title: "Pets",
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async () => {
        return null;
      },
    },
  },
});

function App() {
  const [spState] = useAtom(spinnerState);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="w-full">
          <main>
            <div className="sr-only" aria-live="polite">
              {spState ? "loading dashboard" : "dashboard loaded"}
            </div>

            <RouterProvider router={router} />
          </main>
        </div>
      </QueryClientProvider>
    </>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { data: user } = useGetUser();

  // console.log(user);
  useEffect(() => {}, []);

  return user === false ? <Navigate to="/login" replace /> : children;
  // return children;
}

export default App;
