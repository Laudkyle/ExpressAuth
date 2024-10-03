import express from "express";
import router from "./routes/auth.js";
import routerStudents from "./routes/students.js"
import { connectToDB } from "./db.js";
const port = process.env.PORT;

const app = express();
let db;
connectToDB((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
});

app.use(router);
app.use(routerStudents)