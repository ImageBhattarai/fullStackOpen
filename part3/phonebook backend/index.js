const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Random 1",
    number: "123-12412",
  },
  {
    id: 2,
    name: "Random 2",
    number: "123412-12",
  },
  {
    id: 3,
    name: "Random 3",
    number: "121233-112",
  },
];

generateId = () => {
  return Math.floor(Math.random() * 500);
};

app.get("/", (request, response) => {
  response.send("<h1>Hey there</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date = new Date();
  response.send(`${info} <br><br> ${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    response.status(404).end();
  } else {
    response.json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    response.status(404).json({ error: "Name/Number is missing" });
    return;
  }

  const names = persons.map((person) => person.name);
  const check = names.includes(body.name);
  if (check) {
    response.status(404).json({ error: "Name must be unique" });
    return;
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
