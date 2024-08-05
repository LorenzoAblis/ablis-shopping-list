import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingView from "./pages/Shopping/ShoppingView";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/history",
    //   element: <History />,
    // },
    {
      path: "/",
      element: <ShoppingView />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
