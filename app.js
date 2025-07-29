const express = require("express");
const app = express();
const PORT = 5000;

const contact = require("./contacts.json");

// middleware
app.use(express.json());

// const req = {
//   body: "ngalan",
// };

// console.log(req.body);

// dot notation
// console.log(test.ngalan);

// destructure
// const { ngalan } = test;

// console.log(ngalan);

// HTTP REQUESTS
// GET
// PUT
// POST
// DELETE

app.get("/api/contacts", (req, res) => {
  res.status(200).json(contact);
});

app.post("/api/contact", function (req, res) {
  // destructure
  const { profile, name, age } = req.body;

  // validation
  if (!profile || !name || !age)
    return res.status(404).json({
      message: "Required all fields",
    });

  const newId =
    contact.length > 0
      ? Math.max(...contact.map((p) => parseInt(p.id))) + 1
      : "1";

  const newUser = { id: newId, name, age };

  contact.push(newUser);

  res.status(201).json({
    message: "User created sucessfully",
    newUser,
  });
});

app.delete("/api/contact/:id", function (req, res) {
  const { id } = req.params;
  const index = contact.findIndex((profile) => profile.id === parseInt(id));

  if (index === -1)
    return res.status(404).json({
      message: "No contact found",
    });

  const deleted = contact.splice(index, 1)[0];

  res.status(201).json({
    message: "You Deleted this contact",
    deleted,
  });
});

app.put("/api/update-contact/:id", (req, res) => {
  // destructure
  const { id } = req.params;
  // destructure
  const { profile, name, age } = req.body;

  const foundProfile = contact.find((profile) => profile.id === parseInt(id));

  // HTTP  status
  // 404 = NOT FOUND
  // 200 = OK
  // 201 = CREATED
  // 400 = BAD REQUEST
  let errors = [];

  if (!name) {
    errors.push({
      message: "Name is required.",
      field: "name",
    });
  }

  if (!age) {
    errors.push({
      message: "Age is required.",
      field: "age",
    });
  }

  if (errors.length > 0) {
    return res.status(422).json(errors);
  }

  // check
  if (profile) foundProfile.profile = profile;
  if (name) foundProfile.name = name;
  if (age) foundProfile.age = age;

  res.status(201).json({
    message: "Updated",
    foundProfile,
  });
});

// app.post("/api/like", (req, res) => {
//   console.log(req);
//   res.json({
//     message: "Liked",
//   });
// });

// app.post("/api/share", (req, res) => {
//   console.log(req);
//   res.json({
//     share: "you share",
//   });
// });

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});
