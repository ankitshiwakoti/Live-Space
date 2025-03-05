
import sequelize from '../config/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });  // Sync database before tests
});

afterAll(async () => {
  await sequelize.close();  // Close connection after tests
});
