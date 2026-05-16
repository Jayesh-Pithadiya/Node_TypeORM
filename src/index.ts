
import express from "express";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch(console.error);
