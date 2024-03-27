import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import Create from "./pages/create-hotel";
import Details from "./pages/details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new/:id?" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
