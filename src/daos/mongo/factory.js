// src/daos/factory.js
import config from '../config/config.js';

let usersDao;

switch (config.persistence) {
  case 'MONGO':
    const { default: UsersMongo } = await import('./mongo/usersManager.js');
    usersDao = new UsersMongo();
    break;
  case 'MEMORY':
    const { default: UsersMemory } = await import('./memory/usersManager.js');
    usersDao = new UsersMemory();
    break;
  default:
    throw new Error('Persistence mode not supported');
}

export { usersDao };


// src/services/user.service.js
import { usersDao } from '../daos/factory.js';

export default class UserService {
  async getUserById(id) {
    return await usersDao.getById(id);
  }

  async createUser(data) {
    return await usersDao.create(data);
  }

  // Otros métodos como update, delete, etc., pueden agregarse según necesidad
}


// src/dtos/user.dto.js
export default class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    // Se excluyen datos sensibles como contraseña, _id, etc.
  }
}
