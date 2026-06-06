import {
  useState,
  useEffect,
} from "react";

function Appointments() {
  const [appointments, setAppointments] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "appointments"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] =
    useState({
      visitorName: "",
      hostName: "",
      date: "",
      time: "",
      status: "Pending",
    });

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(
        appointments
      )
    );
  }, [appointments]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...formData,
    };

    setAppointments([
      ...appointments,
      newAppointment,
    ]);

    setFormData({
      visitorName: "",
      hostName: "",
      date: "",
      time: "",
      status: "Pending",
    });
  };

  const updateStatus = (
    id,
    status
  ) => {
    const updated =
      appointments.map(
        (appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                status,
              }
            : appointment
      );

    setAppointments(updated);
  };

  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        appointment.visitorName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <div className="container">
      <h1 className="page-title">
        Appointment Management
      </h1>

      <div className="card">
        <h3>
          Create Appointment
        </h3>

        <form
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              name="visitorName"
              placeholder="Visitor Name"
              value={
                formData.visitorName
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="hostName"
              placeholder="Host Employee"
              value={
                formData.hostName
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={
                handleChange
              }
              required
            />
          </div>

          <button type="submit">
            Schedule Appointment
          </button>
        </form>
      </div>

      <br />

      <input
        type="text"
        placeholder="Search Appointment..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Host</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.length ===
          0 ? (
            <tr>
              <td colSpan="6">
                No Appointments
              </td>
            </tr>
          ) : (
            filteredAppointments.map(
              (
                appointment
              ) => (
                <tr
                  key={
                    appointment.id
                  }
                >
                  <td>
                    {
                      appointment.visitorName
                    }
                  </td>

                  <td>
                    {
                      appointment.hostName
                    }
                  </td>

                  <td>
                    {
                      appointment.date
                    }
                  </td>

                  <td>
                    {
                      appointment.time
                    }
                  </td>

                  <td>
                    {
                      appointment.status
                    }
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Rejected"
                        )
                      }
                      style={{
                        marginLeft:
                          "10px",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;