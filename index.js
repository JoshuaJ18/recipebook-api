import { config } from "dotenv";
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from "./src/routes/users.js";
import { recipeRouter } from "./src/routes/recipes.js";
import { path } from "path";

config();
const app = express();
// line 7 makes it so that all data sent to the frontend is converted into json
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/recipe-app/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/recipe-app", "build", "index.html"));
  });
} else {

}
// contains password so change later using env variables
mongoose.connect(process.env.MONGO_URL)
// this basically tells the api to run
app.listen(process.env.PORT || 3001, () => console.log("Server Started"));