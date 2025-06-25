import chai from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import app from "../server.js";

import User from "../src/models/users.model.js";
import Pet from "../src/models/pets.model.js";

const expect = chai.expect;
chai.use(chaiHttp);

let mockUserId;
let mockPetId;

describe("🔬 API /api/adoptions", () => {
  before(async () => {
    const user = await User.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: "test123"
    });

    const pet = await Pet.create({
      name: faker.animal.cat(),
      type: "cat",
      age: faker.number.int({ min: 1, max: 15 })
    });

    mockUserId = user._id;
    mockPetId = pet._id;
  });

  after(async () => {
    await User.findByIdAndDelete(mockUserId);
    await Pet.findByIdAndDelete(mockPetId);
    // await mongoose.connection.close(); // opcional si corrés más tests luego
  });

  it("GET /api/adoptions debe devolver un array", async () => {
    const res = await chai.request(app).get("/api/adoptions");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  it("POST /api/adoptions debe crear una adopción válida", async () => {
    const res = await chai.request(app)
      .post("/api/adoptions")
      .send({ user: mockUserId, pet: mockPetId });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("user");
    expect(res.body).to.have.property("pet");
  });
});
