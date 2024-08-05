import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingLayout from "./pages/Shopping/ShoppingLayout";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/history",
    //   element: <History />,
    // },
    {
      path: "/",
      element: <ShoppingLayout />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
