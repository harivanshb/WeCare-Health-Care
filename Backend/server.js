import express from "express";
import path from "path";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoute.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import docAppointmentRoutes from "./routes/docAppointmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import pathalologyRoutes from "./routes/pathalogyRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"

import userDashboardRoutes from "./routes/userDashboardRoutes.js";
dotenv.config();
connectDB();

const app = express(); // main thing
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json()); // to accept json data
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use(errorHandler);
app.use("/api/blog", blogRoutes);
app.use("/api/docappointment", docAppointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/normalDash/", userDashboardRoutes);
app.use("/api/pathology/", pathalologyRoutes);
app.use("/api/payment/",paymentRoutes);
const __dirname = path.resolve();
//deploying app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Data is fetched! run frontend");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Backend initiated in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
