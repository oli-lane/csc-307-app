import express from "express";
import cors from "cors";
import {
  getUsers,
  findUserById,
  addUser,
  findUserByIdAndDelete,
} from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// endpoints

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((data) => {
      res.send({ users_list: data });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send("User not found."));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  findUserByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send("User not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send({ error: err.message }));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
