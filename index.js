const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const User = require("./model"); // User modelini dahil edin
const userSchema = require("./validation");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let users = [];
// POST işlemi için Joi şema doğrulama middleware'i
const validatePostData = async (req, res, next) => {
  try {
    console.log(req.body);
    await userSchema.validateAsync(req.body); // Joi şemasını kullanarak gelen verileri doğrula
    next(); // Veriler doğrulandıysa bir sonraki middleware'e geç
  } catch (error) {
    // Veriler doğrulanamadıysa hata yanıtı gönder
    res
      .status(201)
      .json({ data: null, succes: false, message: error.details[0].message });
  }
};

// CREATE (POST) işlemi
app.post("/", validatePostData, async (req, res) => {
  try {
    const user = users.push({ ...req.body, id: users.length + 1 });
    res.status(201).json({
      data: { ...req.body, id: users.length },
      succes: true,
      message: "User Create Success",
    }); // Yeni bir kullanıcı oluştur
  } catch (error) {
    res.status(400).json({ message: error.message }); // Hata durumunda hata mesajını gönder
  }
});

// READ (GET) işlemi - Tüm kullanıcıları al
app.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json({ data: users, succes: true, message: "User List Success" }); // Kullanıcıları yanıt olarak gönder
  } catch (error) {
    res.status(500).json({ message: error.message }); // Hata durumunda hata mesajını gönder
  }
});

// READ (GET) işlemi - Belirli bir kullanıcıyı al
app.get("/:id", async (req, res) => {
  try {
    const user = users.find((data) => data.id == req.params.id); // Kullanıcıyı id'ye göre bul
    if (user == null) {
      return res
        .status(404)
        .json({ data: null, succes: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ data: user, succes: true, message: "User Find Success" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Hata durumunda hata mesajını gönder
  }
});

// UPDATE (PUT) işlemi
app.patch("/:id", async (req, res) => {
  try {
    const user = users.findIndex((data) => data.id == req.params.id); // Kullanıcıyı id'ye göre bul
    if (user == -1) {
      return res
        .status(404)
        .json({ data: null, succes: false, message: "User not found" });
    }
    const updatedUser = (users[user] = { ...req.body, ...users[user] });
    res.status(200).json({
      data: updatedUser,
      succes: true,
      message: "User Update Success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Hata durumunda hata mesajını gönder
  }
});

// DELETE işlemi
app.delete("/:id", async (req, res) => {
  try {
    const user = users.filter((data) => data.id != req.params.id); // Kullanıcıyı id'ye göre bul

    if (user == null) {
      return res
        .status(404)
        .json({ data: null, succes: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ data: null, succes: true, message: "User Remove Success" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Hata durumunda hata mesajını gönder
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
