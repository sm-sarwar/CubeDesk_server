import express, { Request, Response } from "express"
import { customersRouter } from "./modules/customers/customers.routes.js"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { ordersRouter } from "./modules/orders/orders.routes.js";
import errorHandler from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
const app = express()

const allowedOrigins = [
  "http://localhost:3000",
  process.env.APP_URL,
].filter((origin): origin is string => Boolean(origin));

// console.log("APP_URL:", process.env.APP_URL);
// console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// console.log("app url:",process.env.APP_URL)

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