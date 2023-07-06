import { createRouter } from "./setup/routes-manager/index";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <RouterProvider router={createRouter} />
    </div>
  );
}

export default App;
