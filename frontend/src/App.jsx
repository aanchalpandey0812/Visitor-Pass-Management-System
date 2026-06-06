import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Passes from "./pages/Passes";
import CheckLogs from "./pages/CheckLogs";
import Login from "./pages/Login";

function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route
            path="*"
            element={<Login />}
          />
        </Routes>
      ) : (
        <div
          style={{
            display: "flex",
          }}
        >
          <Sidebar />

          <div
            style={{
              flex: 1,
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3>
                  Welcome,{" "}
                  {user.name}
                </h3>

                <p>
                  Role:{" "}
                  {user.role}
                </p>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem(
                    "user"
                  );

                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard />
                }
              />

              <Route
                path="/visitors"
                element={
                  <Visitors />
                }
              />

              <Route
                path="/appointments"
                element={
                  <Appointments />
                }
              />

              <Route
                path="/passes"
                element={<Passes />}
              />

              <Route
                path="/checklogs"
                element={
                  <CheckLogs />
                }
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;