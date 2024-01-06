import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js";
import { database } from "./config/dBconnect.js";
import globalErrorHandler from "./middlewear/globalErrorHandler.js";


dotenv.config();
const app = express();
database()

app.use(express.json())

const PORT = process.env.PORT || 8080

app.use("/api/v1/users", userRoute)


app.use(globalErrorHandler);

app.listen(PORT,console.log(`App Started at ${PORT}`))