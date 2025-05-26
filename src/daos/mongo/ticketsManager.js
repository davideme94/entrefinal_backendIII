import TicketModel from "../../models/ticket.model.js";
import { v4 as uuidv4 } from 'uuid';

class TicketsManager {
  async create({ amount, purchaser }) {
    const newTicket = await TicketModel.create({
      code: uuidv4(), // Generamos un código único
      amount,
      purchaser
    });
    return newTicket;
  }

  async getAll() {
    return await TicketModel.find();
  }

  async getById(id) {
    return await TicketModel.findById(id);
  }
}

export default new TicketsManager();
