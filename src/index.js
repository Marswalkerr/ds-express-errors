import dotenv from "dotenv";
import connectDB from "../db/db.js";
import { app } from "./app.js"

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("Mongo connection failed! ", error)
})