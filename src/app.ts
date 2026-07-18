import express from "express"
import { customersRouter } from "./modules/customers/customers.routes"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { ordersRouter } from "./modules/orders/orders.routes";
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

export default app;