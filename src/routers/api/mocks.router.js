import { Router } from "express";
import { generateUsers } from "./mocks/userMock.js"; // ✅ ruta correcta
import UserModel from "../../models/users.model.js";
import PetModel from "../../models/pets.model.js";

const router = Router();

// GET /mockingusers → Devuelve 50 usuarios ficticios
router.get("/mockingusers", (req, res) => {
  const users = Array.from({ length: 50 }, () => generateUsers());
  res.json({ users });
});

// POST /generateData → Inserta usuarios y mascotas
router.post("/generateData", async (req, res, next) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = Array.from({ length: Number(users) }, () => generateUsers());
    const insertedUsers = await UserModel.insertMany(mockUsers);

    const mockPets = Array.from({ length: Number(pets) }, () => ({
      name: `Pet${Math.random().toString(36).substring(2, 6)}`,
      specie: "dog",
      owner: insertedUsers[Math.floor(Math.random() * insertedUsers.length)]._id
    }));

    const insertedPets = await PetModel.insertMany(mockPets);

    res.json({
      message: "Datos generados correctamente",
      users: insertedUsers.length,
      pets: insertedPets.length
    });
  } catch (error) {
    next(error);
  }
});

export default router;
