const os = require('os');

var config = {
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "password",
  client_pass: "123456",
  admin_email: "admin@flatlogic.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: 'HUEyqESqgQ1yTwzVlO6wprC9Kf1J1xuA',
  remote: 'https://sing-generator-node.herokuapp.com',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "https://flatlogic-ecommerce.herokuapp.com" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",
  google: {
    clientId: '671001533244-kf1k1gmp6mnl0r030qmvdu6v36ghmim6.apps.googleusercontent.com',
    clientSecret: 'Yo4qbKZniqvojzUQ60iKlxqR'
  },
  microsoft: {
    clientId: '4696f457-31af-40de-897c-e00d7d4cff73',
    clientSecret: 'm8jzZ.5UpHF3=-dXzyxiZ4e[F8OF54@p'
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'support@flatlogic.com',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'support@flatlogic.com',
      pass: process.env.EMAIL_PASS || 'Flatlogic1863',
    },
    tls: {
      rejectUnauthorized: false
    }
  },
};

config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
