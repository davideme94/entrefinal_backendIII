import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import UserModel from "../../models/users.model.js";
import { createHash } from "../../utils/hash.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

// Registro
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: null
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });

  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Logged in", token });
});

// Current user desde token
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
