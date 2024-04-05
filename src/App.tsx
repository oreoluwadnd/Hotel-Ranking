import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Home from "@/pages/home";
// import Create from "./pages/create-hotel";
// import Details from "./pages/details";
import Search from "./pages/search-groups";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        {/* <Route path="/new/:id?" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
