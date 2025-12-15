import { RouterProvider } from "router-kit";
import ToastContainer from "./components/ui/Toast";
import { useAuth } from "./hooks/useAuth";
import routes from "./routes";

function App() {
  useAuth();
  return (
    <>
      <RouterProvider routes={routes} fallbackElement={<div>Loading...</div>} />
      <ToastContainer />
    </>
  );
}

export default App;
