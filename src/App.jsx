import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shopping from "./Shopping/Shopping";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shopping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
