import { RouterProvider } from "router-kit";
import routes from "./routes";

function App() {
  return <RouterProvider routes={routes} fallbackElement={<div>Loading...</div>} />;
}

export default App;
