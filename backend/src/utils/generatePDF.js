const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateVisitorPDF = (
  visitor,
  pass
) => {
  const fileName =
    `pass-${pass.passNumber}.pdf`;

  const filePath = path.join(
    __dirname,
    "../../uploads",
    fileName
  );

  const doc = new PDFDocument();

  doc.pipe(
    fs.createWriteStream(
      filePath
    )
  );

  doc.fontSize(22)
     .text(
       "Visitor Pass",
       {
         align: "center",
       }
     );

  doc.moveDown();

  doc.fontSize(14)
     .text(
       `Visitor Name: ${visitor.fullName}`
     );

  doc.text(
    `Pass Number: ${pass.passNumber}`
  );

  doc.text(
    `Status: ${pass.status}`
  );

  doc.text(
    `Valid Till: ${pass.validTill}`
  );

  doc.moveDown();

  doc.text(
    "Please show this pass at security."
  );

  doc.end();

  return filePath;
};

module.exports =
  generateVisitorPDF;