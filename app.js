const express = require("express");
const app = express();
const PORT = 5000;

const contact = require("./contacts.json");

app.get("/api/contacts", (req, res) => {
  res.json(contact);
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
