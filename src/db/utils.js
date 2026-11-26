const validator = require('validator');
const { randomUUID } = require('node:crypto');
const Sequelize = require('./models').Sequelize;

module.exports = class Utils {
  static uuid(value) {
    let id = value;

    if (!validator.isUUID(id)) {
      id = randomUUID();
    }

    return id;
  }

  static ilike(model, column, value) {
    return Sequelize.where(
      Sequelize.fn(
        'lower',
        Sequelize.col(`${model}.${column}`),
      ),
      {
        [Sequelize.Op.like]: `%${value}%`.toLowerCase(),
      },
    );
  }
};
