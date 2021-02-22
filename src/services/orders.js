
const db = require('../db/models');
const OrdersDBApi = require('../db/api/orders');

module.exports = class OrdersService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await OrdersDBApi.create(
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
      let orders = await OrdersDBApi.findBy(
        {id},
        {transaction},
      );

      if (!orders) {
        throw new ValidationError(
          'ordersNotFound',
        );
      }

      await OrdersDBApi.update(
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

      await OrdersDBApi.remove(
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

