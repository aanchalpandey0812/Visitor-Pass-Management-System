function Dashboard() {
  const visitors =
    JSON.parse(
      localStorage.getItem(
        "visitors"
      ) || "[]"
    );

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      ) || "[]"
    );

  const passes =
    JSON.parse(
      localStorage.getItem(
        "passes"
      ) || "[]"
    );

  const checklogs =
    JSON.parse(
      localStorage.getItem(
        "checklogs"
      ) || "[]"
    );

  const checkIns =
    checklogs.filter(
      (log) =>
        log.type ===
        "Check-In"
    ).length;

  const checkOuts =
    checklogs.filter(
      (log) =>
        log.type ===
        "Check-Out"
    ).length;

  const recentActivity = [
    ...visitors.map((v) => ({
      text: `Visitor Added: ${v.fullName}`,
      id: v.id,
    })),

    ...appointments.map(
      (a) => ({
        text: `Appointment Created: ${a.visitorName}`,
        id: a.id,
      })
    ),

    ...passes.map((p) => ({
      text: `Pass Generated: ${p.visitorName}`,
      id: p.id,
    })),
  ]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="container">
      <h1 className="page-title">
        Analytics Dashboard
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>
            Total Visitors
          </h3>
          <h2>
            {visitors.length}
          </h2>
        </div>

        <div className="stat-card">
          <h3>
            Appointments
          </h3>
          <h2>
            {
              appointments.length
            }
          </h2>
        </div>

        <div className="stat-card">
          <h3>
            Passes Issued
          </h3>
          <h2>
            {passes.length}
          </h2>
        </div>

        <div className="stat-card">
          <h3>
            Check Logs
          </h3>
          <h2>
            {
              checklogs.length
            }
          </h2>
        </div>

        <div className="stat-card">
          <h3>
            Check-Ins
          </h3>
          <h2>
            {checkIns}
          </h2>
        </div>

        <div className="stat-card">
          <h3>
            Check-Outs
          </h3>
          <h2>
            {checkOuts}
          </h2>
        </div>
      </div>

      <br />

      <div className="card">
        <h2>
          System Status
        </h2>

        <ul>
          <li>
            ✅ Visitor
            Registration Active
          </li>

          <li>
            ✅ Appointment
            Management Active
          </li>

          <li>
            ✅ Pass Generation
            Active
          </li>

          <li>
            ✅ QR Verification
            Active
          </li>

          <li>
            ✅ Email
            Notification Active
          </li>

          <li>
            ✅ Report Export
            Active
          </li>
        </ul>
      </div>

      <br />

      <div className="card">
        <h2>
          Recent Activity
        </h2>

        {recentActivity.length ===
        0 ? (
          <p>
            No Activity Yet
          </p>
        ) : (
          <ul>
            {recentActivity.map(
              (
                activity
              ) => (
                <li
                  key={
                    activity.id
                  }
                >
                  {
                    activity.text
                  }
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;