
const db = require('../db/models');
const BlogsDBApi = require('../db/api/blogs');

module.exports = class BlogsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await BlogsDBApi.create(
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
      let blogs = await BlogsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!blogs) {
        throw new ValidationError(
          'blogsNotFound',
        );
      }

      await BlogsDBApi.update(
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

      await BlogsDBApi.remove(
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

