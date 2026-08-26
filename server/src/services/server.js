import emailRoutes from "./routes/emailRoutes.js";
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/email", emailRoutes);