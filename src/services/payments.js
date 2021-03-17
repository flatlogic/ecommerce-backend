
const db = require('../db/models');
const PaymentsDBApi = require('../db/api/payments');

module.exports = class PaymentsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await PaymentsDBApi.create(
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
      let payments = await PaymentsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!payments) {
        throw new ValidationError(
          'paymentsNotFound',
        );
      }

      await PaymentsDBApi.update(
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

      await PaymentsDBApi.remove(
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

