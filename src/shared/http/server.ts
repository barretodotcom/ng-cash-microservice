import "dotenv/config"
import express from "express";
import "express-async-errors"
import { connectToDatabase } from '../typeorm/connection/index'
import routes from "./routes/routes";
import cors from "cors"
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(routes);
app.use(errorMiddleware)


app.listen(port, async () => {
    await connectToDatabase()
    console.log(`Listening on http://localhost:${port}`)
});