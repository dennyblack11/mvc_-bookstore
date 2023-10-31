import express, { Application } from "express";
import cors from "cors";
import "./utils/statusCode";
import { mainApp } from "./mainApp";

const port: number = 4488;
const app  = express();

app.use(cors())
app.use(express.json())

mainApp(app)

const server = app.listen(port, () => {
    console.log("connected...")
})


process.on("uncaughtException", (err: Error) => {
    console.log("uncaughtException: ", err)

    process.exit(1);
})

process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection: ", reason);

    server.close(() => {
        process.exit(1)
    })
})