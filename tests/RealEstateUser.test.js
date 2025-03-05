// tests/RealEstateUser.test.js
import { RealEstateUser } from '../models/index.js'; // Adjust path based on your project structure
import sequelize from '../config/database.js';

// Clear the database before each test
beforeAll(async () => {
  await sequelize.sync({ force: true }); // This will drop and recreate the DB
});

afterAll(async () => {
  await sequelize.close(); // Close DB connection after tests are done
});

test('should create a RealEstateUser with valid data', async () => {
  const user = await RealEstateUser.create({
    Name: 'John Doe',
    Email: 'john@example.com',
    Password: 'password123',
    Role: 'agent',
  });

  expect(user).toHaveProperty('UserID');
  expect(user.Name).toBe('John Doe');
  expect(user.Email).toBe('john@example.com');
  expect(user.Role).toBe('agent');
});

test('should fail to create a RealEstateUser with missing required fields', async () => {
  try {
    await RealEstateUser.create({
      Name: 'Jane Doe',
      Email: 'jane@example.com',
      Password: '', // Missing password
      Role: 'client',
    });
  } catch (error) {
    expect(error).toBeTruthy();
  }
});
