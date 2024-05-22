import express from "express";
import cors from "cors";
import helmet from "helmet";
import { client } from "./commonFunctions/redis.js";
import testController from "./controllers/testController.js";

const app = express();
client.connect();
// import("./db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                scriptSrc: ["'self'", "'unsafe-inline'"],
                scriptSrcAttr: ["'self'", "'unsafe-inline'"],
            },
        },
    })
);
// app.use(helmet());

app.use("/", testController);

app.use((error, req, res, next) => {
    if (error) {
        console.error("Unhandled -", req.path, "\n", error);
        return res.status(400).send({ message: error.message || "Server Error Occurred!" });
    }
    return next();
});

export default app;
