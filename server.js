import express from "express";
import router from "./routes/auth.js";
import { getDB, connectToDB } from "./db.js";
const port = process.env.PORT;

const app = express();
let db;
connectToDB((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    db = getDB
  }
});


app.use(router);
