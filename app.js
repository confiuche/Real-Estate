import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js";
import { database } from "./config/dBconnect.js";

dotenv.config();
const app = express();
database()

app.use(express.json())

const PORT = process.env.PORT || 8080

app.use("/api/v1/users", userRoute)

app.listen(PORT,console.log(`App Started at ${PORT}`))