
const db = require('../db/models');
const CategoriesDBApi = require('../db/api/categories');

module.exports = class CategoriesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CategoriesDBApi.create(
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
      let categories = await CategoriesDBApi.findBy(
        {id},
        {transaction},
      );

      if (!categories) {
        throw new ValidationError(
          'categoriesNotFound',
        );
      }

      await CategoriesDBApi.update(
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

      await CategoriesDBApi.remove(
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

