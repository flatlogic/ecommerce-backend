
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CategoriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.create(
      {
        id: data.id || undefined,
title: data.title 
        ||
        null,
        meta_description: data.meta_description 
        ||
        null,
        keywords: data.keywords 
        ||
        null,
        meta_author: data.meta_author 
        ||
        null,
        meta_og_title: data.meta_og_title 
        ||
        null,
        meta_og_url: data.meta_og_url 
        ||
        null,
        meta_og_image: data.meta_og_image 
        ||
        null,
        meta_fb_id: data.meta_fb_id 
        ||
        null,
        meta_og_sitename: data.meta_og_sitename 
        ||
        null,
        post_twitter: data.post_twitter 
        ||
        null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );



    return categories;
  }

  static async update(id, data, options) {
    console.log(data);
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findByPk(id, {
      transaction,
    });

    await categories.update(
      {
title: data.title
        ||
        null,
        meta_description: data.meta_description 
        ||
        null,
        keywords: data.keywords 
        ||
        null,
        meta_author: data.meta_author 
        ||
        null,
        meta_og_title: data.meta_og_title 
        ||
        null,
        meta_og_url: data.meta_og_url 
        ||
        null,
        meta_og_image: data.meta_og_image 
        ||
        null,
        meta_fb_id: data.meta_fb_id 
        ||
        null,
        meta_og_sitename: data.meta_og_sitename 
        ||
        null,
        post_twitter: data.post_twitter 
        ||
        null,
        updatedById: currentUser.id,
      },
      {transaction},
    );



    return categories;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findByPk(id, options);

    await categories.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await categories.destroy({
      transaction
    });

    return categories;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findOne(
      { where },
      { transaction },
    );

    if (!categories) {
      return categories;
    }

    const output = categories.get({plain: true});


    return output;
  }

  static async findAll(filter, options) {
    var limit = 0;
    var offset = 0;
    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }


      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'categories',
            'title',
            filter.title,
          ),
        };
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

    let { rows, count } = await db.categories.findAndCountAll(
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
            'categories',
            'title',
            query,
          ),
        ],
      };
    }

    const records = await db.categories.findAll({
      attributes: [ 'id', 'title' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }


};

