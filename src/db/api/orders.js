
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrdersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.create(
      {
        id: data.id || undefined,
order_date: data.order_date 
        ||
        null,
amount: data.amount 
        ||
        null,
status: data.status 
        ||
        null,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );


    await orders.setProduct(data.product || null, {
      transaction,
    });

    await orders.setUser(data.user || null, {
      transaction,
    });

    await orders.setPayment(data.payment || null, {
      transaction,
    });


    return orders;
  }

  static async update(id, data, options) {
    console.log(data);
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, {
      transaction,
    });

    await orders.update(
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


    await orders.setProduct(data.product || null, {
      transaction,
    });

    await orders.setUser(data.user || null, {
      transaction,
    });

    await orders.setPayment(data.payment || null, {
      transaction,
    });


    return orders;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, options);

    await orders.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await orders.destroy({
      transaction
    });

    return orders;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findOne(
      { where },
      { transaction },
    );

    if (!orders) {
      return orders;
    }

    const output = orders.get({plain: true});

    output.product = await orders.getProduct({
      transaction
    });

    output.user = await orders.getUser({
      transaction
    });

    output.payment = await orders.getPayment({
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

    let { rows, count } = await db.orders.findAndCountAll(
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
            'orders',
            'product',
            query,
          ),
        ],
      };
    }

    const records = await db.orders.findAll({
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

