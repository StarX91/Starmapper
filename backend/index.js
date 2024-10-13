require("dotenv").config();
require("./config/mongo.js");
require("./config/firebase.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user.route.js");
const imageStarmargRouter = require("./routes/imageStarmarg.route.js");
const verifyFirebaseToken = require("./middlewares/auth.js");
const errorHandler = require("./middlewares/errorHandler.js");
const { helloWorld } = require("./controllers/index.controller.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Optional: if you need to include cookies
  })
);

app.use("/", helloWorld);
app.use("/user", verifyFirebaseToken, userRouter);
app.use("/images", verifyFirebaseToken, imageStarmargRouter);

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
