import { useState } from "react";
import { Auth } from "./pages/Auth";
import { HomePage } from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <div className="max-h-screen">
        <div className="min-h-screen font-kumbh-sans bg-gray-50 flex justify-center items-center">
          <Routes>
            <Route
              path="/login"
              element={<Auth setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
