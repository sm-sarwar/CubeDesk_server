import express, { Request, Response } from "express"
import { customersRouter } from "./modules/customers/customers.routes.js"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { ordersRouter } from "./modules/orders/orders.routes.js";
import errorHandler from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
const app = express()

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json())

app.use("/customers", customersRouter)
app.use("/orders", ordersRouter)



app.get ("/", (req, res) =>{
    res.send ("CubeDesk server is running")
})


app.use(notFound)
app.use(errorHandler)

export default app;