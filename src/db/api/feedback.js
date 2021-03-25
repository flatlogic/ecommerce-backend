
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FeedbackDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.create(
      {
        id: data.id || undefined,
feedbate_date: data.feedbate_date 
        ||
        null,
amount: data.amount 
        ||
        null,
status: data.status 
        ||
        null,
        rating: data.rating 
        ||
        null,
        firstname: data.firstname 
        ||
        null,
        lastname: data.lastname 
        ||
        null,
        avatar: data.avatar 
        ||
        null,
        review: data.review 
        ||
        null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );


    await feedback.setProduct(data.product || null, {
      transaction,
    });

    await feedback.setUser(data.user || null, {
      transaction,
    });

    await feedback.setPayment(data.payment || null, {
      transaction,
    });


    return feedback;
  }

  static async update(id, data, options) {
    console.log(data);
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findByPk(id, {
      transaction,
    });

    await feedback.update(
      {
order_date: data.order_date
        ||
        null,
amount: data.amount
        ||
        null,
status: data.status
        ||
        null,

        updatedById: currentUser.id,
      },
      {transaction},
    );


    await feedback.setProduct(data.product || null, {
      transaction,
    });

    await feedback.setUser(data.user || null, {
      transaction,
    });

    await feedback.setPayment(data.payment || null, {
      transaction,
    });


    return feedback;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findByPk(id, options);

    await feedback.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await feedback.destroy({
      transaction
    });

    return feedback;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findOne(
      { where },
      { transaction },
    );

    if (!feedback) {
      return feedback;
    }

    const output = feedback.get({plain: true});

    output.product = await feedback.getProduct({
      transaction
    });

    output.user = await feedback.getUser({
      transaction
    });

    output.payment = await feedback.getPayment({
      transaction
    });


    return output;
  }

  static async findAll(filter, options) {
    var limit = 0;
    var offset = 0;
    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

      {
        model: db.products,
        as: 'product',
      },

      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.payments,
        as: 'payment',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }


      if (filter.order_dateRange) {
        const [start, end] = filter.order_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.lte]: end,
            },
          };
        }
      }


      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }


      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.product) {
        var listItems = filter.product.split('|').map(item => {
          return { ['productId']: Utils.uuid(item) }
        });

        where = {
          ...where,
          [Op.or]: listItems
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map(item => {
          return { ['userId']: Utils.uuid(item) }
        });

        where = {
          ...where,
          [Op.or]: listItems
        };
      }

      if (filter.payment) {
        var listItems = filter.payment.split('|').map(item => {
          return { ['paymentId']: Utils.uuid(item) }
        });

        where = {
          ...where,
          [Op.or]: listItems
        };
      }


      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.feedback.findAndCountAll(
      {
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderBy.split('_')]
          : [['createdAt', 'DESC']],
        transaction,
      },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'feedback',
            'product',
            query,
          ),
        ],
      };
    }

    const records = await db.feedback.findAll({
      attributes: [ 'id', 'product' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['product', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.product,
    }));
  }


};

