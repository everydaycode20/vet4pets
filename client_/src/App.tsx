import { ReactNode } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";

import "./App.scss";

import Login from "./routes/login/login";
import Root from "./routes/root/root";
import Dashboard from "./routes/dashboard/dashboard";
import Appointments from "./routes/appointments/appointments";
import Owner from "./routes/owners/owners";
import Pets from "./routes/pets/pets";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUser } from "./hooks/useGetUser";
import { useAtom } from "jotai";
import { spinnerState } from "./components/spinner/spinner-state";
import AddPet from "./routes/add-pet/add-pet";
import Settings from "./routes/settings/settings";
import useSystemTheme from "./hooks/use-system-theme";

import "dayjs/locale/es";
import "dayjs/locale/en";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <>
        <Navigate to="/dashboard" replace />
      </>
    ),
    children: [
      {
        index: true,
        loader: async () => redirect("/dashboard"),
      },
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
        element: (
          <RequireAuth>
            <Appointments />
          </RequireAuth>
        ),
        handle: {
          title: "Appointments",
        },
      },
      {
        path: "owners",
        element: (
          <RequireAuth>
            <Owner />
          </RequireAuth>
        ),
        handle: {
          title: "Pet Owners",
        },
      },
      {
        path: "pets",
        element: (
          <RequireAuth>
            <Pets />
          </RequireAuth>
        ),
        handle: {
          title: "Pets",
        },
      },
      {
        path: "pets/add",
        element: (
          <RequireAuth>
            <AddPet />
          </RequireAuth>
        ),
        handle: {
          title: "Add new pet",
        },
      },
      {
        path: "settings",
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
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
          <button
            className="absolute skip-to-main"
            onClick={() =>
              document.getElementById("main-content-container")?.focus()
            }
          >
            skip to main content
          </button>

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

  useSystemTheme();

  return user === false ? <Navigate to="/login" replace /> : children;
  // return children;
}

export default App;
