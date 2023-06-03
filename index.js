import { config } from "dotenv";
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from "./src/routes/users.js";
import { recipeRouter } from "./src/routes/recipes.js";

config();
const app = express();
// line 7 makes it so that all data sent to the frontend is converted into json
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

// contains password so change later using env variables
mongoose.connect(process.env.MONGO_URL)

app.get('/', (req, res) => {
  res.send('API is running.');
});
// this basically tells the api to run
app.listen(process.env.PORT || 3001, () => console.log("Server Started"));