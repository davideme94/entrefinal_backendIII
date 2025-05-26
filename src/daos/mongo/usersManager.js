import User from "../../models/users.model.js";

class UsersManager {
    async getAll() {
        return await User.find();
    }

    async getById(id) {
        return await User.findById(id);
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, newData) {
        return await User.findByIdAndUpdate(id, newData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UsersManager();
