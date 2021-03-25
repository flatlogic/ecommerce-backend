
const db = require('../db/models');
const FeedbackDBApi = require('../db/api/feedback');

module.exports = class FeedbackService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await FeedbackDBApi.create(
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
      let feedback = await FeedbackDBApi.findBy(
        {id},
        {transaction},
      );

      if (!feedback) {
        throw new ValidationError(
          'FeedbackNotFound',
        );
      }

      await FeedbackDBApi.update(
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

      await FeedbackDBApi.remove(
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

