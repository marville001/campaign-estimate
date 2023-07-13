import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCampaignPage from "./pages/AddCampaignPage";
import ViewCampaignsPage from "./pages/ViewCampaignsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddCampaignPage />,
  },
  {
    path: "/view",
    element: <ViewCampaignsPage />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
