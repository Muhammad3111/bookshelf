import { Route, Routes } from "react-router-dom";
import SingUp from "./components/SingUp";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route index element={<SingUp />} />
      <Route path="/books" element={<Layout />} />
    </Routes>
  );
}

export default App;
