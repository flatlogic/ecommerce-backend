
const db = require('../db/models');
const ProductsDBApi = require('../db/api/products');

module.exports = class ProductsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ProductsDBApi.create(
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
      let products = await ProductsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!products) {
        throw new ValidationError(
          'productsNotFound',
        );
      }

      await ProductsDBApi.update(
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

      await ProductsDBApi.remove(
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

