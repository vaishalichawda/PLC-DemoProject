import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ProjectRoute from "./Component/ProjectRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProjectRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
