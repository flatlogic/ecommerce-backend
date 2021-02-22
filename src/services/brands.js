
const db = require('../db/models');
const BrandsDBApi = require('../db/api/brands');

module.exports = class BrandsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await BrandsDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let brands = await BrandsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!brands) {
        throw new ValidationError(
          'brandsNotFound',
        );
      }

      await BrandsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await BrandsDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

