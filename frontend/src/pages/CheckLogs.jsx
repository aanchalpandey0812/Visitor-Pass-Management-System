import {
  useState,
  useEffect,
} from "react";

function CheckLogs() {
  const [visitorName, setVisitorName] =
    useState("");

  const [logs, setLogs] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "checklogs"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "checklogs",
      JSON.stringify(logs)
    );
  }, [logs]);

  const checkIn = () => {
    if (!visitorName) return;

    const newLog = {
      id: Date.now(),
      visitorName,
      action: "Check In",
      time:
        new Date().toLocaleString(),
    };

    setLogs([...logs, newLog]);

    setVisitorName("");
  };

  const checkOut = () => {
    if (!visitorName) return;

    const newLog = {
      id: Date.now(),
      visitorName,
      action: "Check Out",
      time:
        new Date().toLocaleString(),
    };

    setLogs([...logs, newLog]);

    setVisitorName("");
  };

  return (
    <div className="container">
      <h1 className="page-title">
        Check-In / Check-Out
      </h1>

      <div className="card">
        <div className="form-group">
          <input
            type="text"
            placeholder="Visitor Name"
            value={visitorName}
            onChange={(e) =>
              setVisitorName(
                e.target.value
              )
            }
          />
        </div>

        <button onClick={checkIn}>
          Check In
        </button>

        <button
          onClick={checkOut}
          style={{
            marginLeft: "10px",
          }}
        >
          Check Out
        </button>
      </div>

      <br />

      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Action</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3">
                No Check Logs
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id}>
                <td>
                  {log.visitorName}
                </td>

                <td>
                  {log.action}
                </td>

                <td>{log.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CheckLogs;