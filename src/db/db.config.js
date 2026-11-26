const useSsl = process.env.DB_SSL !== "false";
const dialectOptions = useSsl
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  : {};

module.exports = {
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions
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
