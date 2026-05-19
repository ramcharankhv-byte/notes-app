import connectDB  from "./db/index.js";
import dotenv from "dotenv"
import app from "./app.js"
import { apiResponse } from "./utils/api-response.js";
import { ApiError } from "./utils/api-error.js";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8080;

connectDB()
.then(()=>{
     app.listen(port,()=>{
        console.log(`server running at  http://localhost:${port}`)
     })
}
)
.catch((err)=>{
    console.log("error occured ",err)
    throw new ApiError(400,"invalid error");
})