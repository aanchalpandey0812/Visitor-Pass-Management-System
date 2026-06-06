require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


//connectDB();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Visitor Pass Management System API"
  });
});

// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Visitor Routes
app.use(
  "/api/visitors",
  require("./routes/visitorRoutes")
);

// Appointment Routes
app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
);

// Pass Routes
app.use(
  "/api/passes",
  require("./routes/passRoutes")
);

// Check Log Routes
app.use(
  "/api/checklogs",
  require("./routes/checkLogRoutes")
);

// Dashboard Routes
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

app.use(
  "/api/email",
  require(
    "./routes/testEmailRoute"
  )
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    ` Server Running On Port ${PORT}`
  );
});