import {
  useState,
  useEffect,
} from "react";
import { saveAs } from "file-saver";

function Visitors() {
  const [visitors, setVisitors] =
    useState(() => {
      const savedVisitors =
        localStorage.getItem(
          "visitors"
        );

      return savedVisitors
        ? JSON.parse(
            savedVisitors
          )
        : [];
    });

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      purpose: "",
      photo: "",
    });

  useEffect(() => {
    localStorage.setItem(
      "visitors",
      JSON.stringify(visitors)
    );
  }, [visitors]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handlePhotoChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVisitor = {
      id: Date.now(),
      ...formData,
    };

    setVisitors([
      ...visitors,
      newVisitor,
    ]);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      purpose: "",
      photo: "",
    });
  };

  const exportVisitors = () => {
    const headers =
      "Name,Email,Phone,Purpose\n";

    const rows = visitors
      .map(
        (visitor) =>
          `${visitor.fullName},${visitor.email},${visitor.phone},${visitor.purpose}`
      )
      .join("\n");

    const csvContent =
      headers + rows;

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(
      blob,
      "Visitors_Report.csv"
    );
  };

  const filteredVisitors =
    visitors.filter((visitor) =>
      visitor.fullName
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <div className="container">
      <h1 className="page-title">
        Visitor Management
      </h1>

      <div className="card">
        <h3>Add Visitor</h3>

        <form
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={
                formData.fullName
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
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
              name="phone"
              placeholder="Phone"
              value={
                formData.phone
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
              name="purpose"
              placeholder="Purpose"
              value={
                formData.purpose
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Visitor Photo:
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handlePhotoChange
              }
            />
          </div>

          {formData.photo && (
            <div>
              <img
                src={
                  formData.photo
                }
                alt="Preview"
                width="100"
                height="100"
                style={{
                  borderRadius:
                    "8px",
                  objectFit:
                    "cover",
                }}
              />
            </div>
          )}

          <br />

          <button type="submit">
            Add Visitor
          </button>
        </form>
      </div>

      <br />

      <input
        type="text"
        placeholder="Search Visitor..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={exportVisitors}
      >
        Export Visitors Report
      </button>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          {filteredVisitors.length ===
          0 ? (
            <tr>
              <td colSpan="5">
                No Visitors Found
              </td>
            </tr>
          ) : (
            filteredVisitors.map(
              (visitor) => (
                <tr
                  key={visitor.id}
                >
                  <td>
                    {visitor.photo ? (
                      <img
                        src={
                          visitor.photo
                        }
                        alt={
                          visitor.fullName
                        }
                        width="60"
                        height="60"
                        style={{
                          borderRadius:
                            "50%",
                          objectFit:
                            "cover",
                        }}
                      />
                    ) : (
                      "No Photo"
                    )}
                  </td>

                  <td>
                    {
                      visitor.fullName
                    }
                  </td>

                  <td>
                    {
                      visitor.email
                    }
                  </td>

                  <td>
                    {
                      visitor.phone
                    }
                  </td>

                  <td>
                    {
                      visitor.purpose
                    }
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

export default Visitors;