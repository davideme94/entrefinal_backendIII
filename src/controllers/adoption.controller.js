import Adoption from "../models/adoption.model.js";

export const createAdoption = async (req, res) => {
  try {
    const { user, pet } = req.body;
    const adoption = await Adoption.create({ user, pet });
    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate("user pet");
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
