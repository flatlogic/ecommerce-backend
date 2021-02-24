module.exports = {
  production: {
    use_env_variable: "",
    dialect: "postgres"
    database: "d5g3e3ke0kepos",
    username: "wyiqlzycpemgin",
    password: "20fc8b54c9eedd170a0ca447498ee2c67df82b3db36214b0601bba1cfd2572f4",
    host: "ec2-3-222-11-129.compute-1.amazonaws.com",
    ssl: true
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
