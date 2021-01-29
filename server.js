const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

var cors = require("cors");

// app.use(cors()); // Use this after the variable declaration

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/API/users", require("./routes/API/users"));
app.use("/API/auth", require("./routes/API/auth"));
app.use("/API/profile", require("./routes/API/profile"));
app.use("/API/posts", require("./routes/API/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    const index = path.join(__dirname, "build", "index.html");
    res.sendFile(index);
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
