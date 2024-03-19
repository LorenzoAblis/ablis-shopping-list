import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shopping from "./Shopping/components/Shopping";

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
