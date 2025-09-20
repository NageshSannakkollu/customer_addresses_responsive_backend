const express = require("express");
const cors = require("cors");
const customerRouter = require("./routes/customerRoutes");
const addressRoute = require("./routes/addressRoutes")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',customerRouter)
app.use("/api/",addressRoute)

const port = process.env.PORT || 3036;

  try { // wait for DB to initialize first
    app.listen(port, () => {
      console.log(`Server Running at: http://localhost:${port}/`);
    });
  } catch (err) {
    console.error("Failed to start server due to DB error:", err);
    process.exit(1);
}
