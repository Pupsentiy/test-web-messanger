import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import InternalRoutes from "./routes/Routes";

function App() {
  return (
    <main>
      <div className="container">
        <Router >
          <InternalRoutes />
        </Router>
      </div>
    </main>
  );
}

export default App;
