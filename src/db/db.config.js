module.exports = {
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
  },
  development: {
    username: 'postgres',
    dialect: 'postgres',
    password: '',
    database: 'postgres',
    host: 'localhost',
    logging: console.log,
  }
};
