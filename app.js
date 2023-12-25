import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json())

const PORT = process.env.PORT || 8080

app.use("/api/v1/users", userRoute)

app.listen(PORT,console.log(`App Started at ${PORT}`))