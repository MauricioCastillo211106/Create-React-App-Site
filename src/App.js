import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Datos from './pages/HomePage';
import Tablas from './pages/tabla';
import Login from './pages/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <>
              <Route exact path="/Datos" element={<Datos />} />
              <Route exact path="/Tablas" element={<Tablas />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
