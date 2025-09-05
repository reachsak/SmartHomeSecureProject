import Header from "./components/Header";

import { Contact } from "./components/AILLM.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/aillm" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
