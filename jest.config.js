export default {
    setupFilesAfterEnv: ['./tests/setup.js'],
    testEnvironment: 'node',  // Keep the Node environment for backend testing
    transform: {
      '^.+\\.js$': 'babel-jest',  // Use babel-jest to transpile your JavaScript files
    },
    moduleDirectories: ['node_modules', 'src'],
  };
  