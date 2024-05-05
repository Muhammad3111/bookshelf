import { Route, Routes } from "react-router-dom";
import SingUp from "./components/SingUp";

function App() {
  return (
    <Routes>
      <Route index element={<SingUp />} />
    </Routes>
  );
}

export default App;
