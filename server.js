  //server.js
  require("dotenv").config();

  const express = require("express");
  const cors = require("cors");

  const app = express();

  const db = require("./app/models");

  // Sync database
  db.sequelize.sync();

  var corsOptions = {
    origin: "*", // Allow all origins
    credentials: true // Added this one during login config 
  };
  
  app.use(cors(corsOptions));
  app.options("*", cors());

  // Parse requests of content-type - application/json
  app.use(express.json());

  // Parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // Simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

  // Route imports
  require("./app/routes/auth.routes.js")(app);
  require("./app/routes/user.routes")(app);
  require("./app/routes/tutorial.routes")(app);
  require("./app/routes/lesson.routes")(app);
  require("./app/routes/course.routes.js")(app); 
  require("./app/routes/notification.routes.js")(app);

  // Set port, listen for requests
  const PORT = process.env.PORT || 3100;
  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }

  module.exports = app;
