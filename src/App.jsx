import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeGame from "./pages/PokeGame.jsx"


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PokeGame />} />
    </Routes>
  </BrowserRouter>
);

export default App;
