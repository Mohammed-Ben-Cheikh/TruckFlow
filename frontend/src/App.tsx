import { RouterProvider } from "router-kit";
import { useAuth } from "./hooks/useAuth";
import routes from "./routes";

function App() {
  useAuth();
  return (
    <RouterProvider routes={routes} fallbackElement={<div>Loading...</div>} />
  );
}

export default App;
