module.exports = {
  production: {
    use_env_variable: "",
    dialect: "postgres",
    database: "d86kb64k965n7b",
    username: "rkwmilbswrezam",
    password: "e35716dfbd9e5c580f33bae21bdff7f22c8e843da2378c0281c73c7c3bf5af2b",
    host: "ec2-34-230-167-186.compute-1.amazonaws.com",
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
