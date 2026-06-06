import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🏢 Visitor Pass</h2>

      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
          marginBottom: "25px",
          fontSize: "14px",
        }}
      >
        Management System
      </p>

      <Link to="/">
        📊 Dashboard
      </Link>

      <Link to="/visitors">
        👥 Visitors
      </Link>

      <Link to="/appointments">
        📅 Appointments
      </Link>

      <Link to="/passes">
        🎫 Passes
      </Link>

      <Link to="/checklogs">
        ✅ Check Logs
      </Link>

      <div
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop:
            "1px solid #374151",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Logged In As
        </p>

        <h4
          style={{
            marginTop: "8px",
          }}
        >
          Admin
        </h4>
      </div>
    </div>
  );
}

export default Sidebar;