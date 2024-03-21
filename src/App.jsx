import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shopping from "./Shopping/components/Shopping";
import History from "./History/components/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Shopping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
