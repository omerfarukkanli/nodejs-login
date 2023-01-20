const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dummyData = fs.readFileSync("data.json");
const deneme = JSON.parse(dummyData);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send("kullanıcı adı veya şifre boş olamaz");
  }

  deneme.forEach((user) => {
    if (user.username === username || user.password === password) {
      return res.status(401).send("kullancı kayıtlı");
    }
  });

  deneme.push({ username, password });
  res.send("kullncı oluşturuldu");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.send("kullanıcı adı veya şifre boş olamaz");
  }

  deneme.forEach((user) => {
    if (username === user.username && password === user.password) {
      return res.status(200).send("succesfuly logged in");
    }
  });

  return res.status(401).send("user not found");
});

app.listen(3000);
