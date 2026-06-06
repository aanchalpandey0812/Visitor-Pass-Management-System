import {
  useState,
  useEffect,
} from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

function Passes() {
  const [visitorName, setVisitorName] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [passes, setPasses] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "passes"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "passes",
      JSON.stringify(passes)
    );
  }, [passes]);

  const generatePass = () => {
    if (!visitorName) return;

    const newPass = {
      id: Date.now(),
      passNumber:
        "PASS-" +
        Math.floor(
          100000 +
            Math.random() * 900000
        ),
      visitorName,
      issueDate:
        new Date().toLocaleDateString(),
      validTill:
        new Date().toLocaleDateString(),
      status: "Active",
    };

    setPasses([
      ...passes,
      newPass,
    ]);

    setVisitorName("");
  };

  const downloadPDF = (
    pass
  ) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "Visitor Pass",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Pass Number: ${pass.passNumber}`,
      20,
      40
    );

    doc.text(
      `Visitor Name: ${pass.visitorName}`,
      20,
      55
    );

    doc.text(
      `Issue Date: ${pass.issueDate}`,
      20,
      70
    );

    doc.text(
      `Valid Till: ${pass.validTill}`,
      20,
      85
    );

    doc.text(
      `Status: ${pass.status}`,
      20,
      100
    );

    doc.save(
      `${pass.passNumber}.pdf`
    );
  };

  const filteredPasses =
    passes.filter(
      (pass) =>
        pass.visitorName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        pass.passNumber
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <div className="container">
      <h1 className="page-title">
        Pass Management
      </h1>

      <div className="card">
        <h3>
          Generate Visitor Pass
        </h3>

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

        <button
          onClick={generatePass}
        >
          Generate Pass
        </button>
      </div>

      <br />

      <input
        type="text"
        placeholder="Search Pass..."
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
            <th>Pass Number</th>
            <th>Visitor Name</th>
            <th>Issue Date</th>
            <th>Valid Till</th>
            <th>Status</th>
            <th>QR Code</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {filteredPasses.length ===
          0 ? (
            <tr>
              <td colSpan="7">
                No Passes Generated
              </td>
            </tr>
          ) : (
            filteredPasses.map(
              (pass) => (
                <tr
                  key={pass.id}
                >
                  <td>
                    {
                      pass.passNumber
                    }
                  </td>

                  <td>
                    {
                      pass.visitorName
                    }
                  </td>

                  <td>
                    {
                      pass.issueDate
                    }
                  </td>

                  <td>
                    {
                      pass.validTill
                    }
                  </td>

                  <td>
                    {pass.status}
                  </td>

                  <td>
                    <QRCodeCanvas
                      value={JSON.stringify(
                        {
                          passNumber:
                            pass.passNumber,
                          visitor:
                            pass.visitorName,
                          status:
                            pass.status,
                        }
                      )}
                      size={70}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        downloadPDF(
                          pass
                        )
                      }
                    >
                      Download
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

export default Passes;