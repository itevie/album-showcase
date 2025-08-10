import ReactDOM from "react-dom/client";
import App from "./App";
import { loadTheme } from "./dawn-ui";
import ContextMenuManager from "./dawn-ui/components/ContextMenuManager";
import AlertManager from "./dawn-ui/components/AlertManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Album from "./Album";
import Image from "./Image";

loadTheme();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/album/:folder",
    element: <Album />,
  },
  {
    path: "/album/:folder/image/:image",
    element: <Image />,
  },
  {
    path: "/album/:folder/image",
    element: <Redirect />,
  },
  {
    path: "/album",
    element: <Redirect />,
  },
]);

function Redirect() {
  let old = window.location.href.split("/");
  old.pop();
  window.location.href = old.join("/");
  return <></>;
}

root.render(
  <>
    <ContextMenuManager />
    <AlertManager />
    <RouterProvider router={router} />
  </>,
);
