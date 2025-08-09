import ReactDOM from "react-dom/client";
import App from "./App";
import { loadTheme } from "./dawn-ui";
import ContextMenuManager from "./dawn-ui/components/ContextMenuManager";
import AlertManager from "./dawn-ui/components/AlertManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

loadTheme();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

root.render(
  <>
    <ContextMenuManager />
    <AlertManager />
    <RouterProvider router={router} />
  </>
);
