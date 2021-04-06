
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BlogsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    console.log(data);
    const blogs = await db.blogs.create(
      {
        id: data.id || undefined,
        title: data.title 
                ||
                null,
        author_name: data.author_name 
                ||
                null,
        blog_image_one_annotation: data.blog_image_one_annotation 
                ||
                null,
        blog_image_two_annotation: data.blog_image_two_annotation 
                ||
                null,
        blog_image_three_annotation: data.blog_image_three_annotation 
        ||
        null,
        blog_image_four_annotation: data.blog_image_four_annotation 
        ||
        null,
        blog_image_five_annotation: data.blog_image_five_annotation 
        ||
        null,
        point_one_title: data.point_one_title 
        ||
        null,
        point_one_description: data.point_one_description 
        ||
        null,
        point_two_title: data.point_two_title 
        ||
        null,
        point_two_description: data.point_two_description 
        ||
        null,
        point_three_title: data.point_three_title 
        ||
        null,
        point_three_description: data.point_three_description 
        ||
        null,
        point_four_title: data.point_four_title 
        ||
        null,
        point_four_description: data.point_four_description 
        ||
        null,
        point_five_title: data.point_five_title 
        ||
        null,
        point_five_description: data.point_five_description 
        ||
        null,
        epigraph: data.epigraph 
        ||
        null,
        first_paragraph: data.first_paragraph 
        ||
        null,
        second_paragraph: data.second_paragraph 
        ||
        null,
        third_paragraph: data.third_paragraph 
        ||
        null,
        fourth_paragraph: data.fourth_paragraph 
        ||
        null,
        fifth_paragraph: data.fifth_paragraph 
        ||
        null,
        status: data.status 
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


    await blogs.setBrand(data.brand || null, {
      transaction,
    });

    await blogs.setCategories(data.categories || [], {
      transaction,
    });

    await blogs.setMore_blogs(data.more_blogs || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'hero_image',
        belongsToId: blogs.id,
      },
      data.hero_image,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_one',
        belongsToId: blogs.id,
      },
      data.blog_image_one,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_two',
        belongsToId: blogs.id,
      },
      data.blog_image_two,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_three',
        belongsToId: blogs.id,
      },
      data.blog_image_three,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'author_avatar',
        belongsToId: blogs.id,
      },
      data.author_avatar,
      options,
    );


    return blogs;
  }

  static async update(id, data, options) {
    console.log(data);
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const blogs = await db.blogs.findByPk(id, {
      transaction,
    });

    await blogs.update(
      {
        title: data.title 
                ||
                null,
        author_name: data.author_name 
                ||
                null,
        blog_image_one_annotation: data.blog_image_one_annotation 
                ||
                null,
        blog_image_two_annotation: data.blog_image_two_annotation 
                ||
                null,
        blog_image_three_annotation: data.blog_image_three_annotation 
        ||
        null,
        blog_image_four_annotation: data.blog_image_four_annotation 
        ||
        null,
        blog_image_five_annotation: data.blog_image_five_annotation 
        ||
        null,
        point_one_title: data.point_one_title 
        ||
        null,
        point_one_description: data.point_one_description 
        ||
        null,
        point_two_title: data.point_two_title 
        ||
        null,
        point_two_description: data.point_two_description 
        ||
        null,
        point_three_title: data.point_three_title 
        ||
        null,
        point_three_description: data.point_three_description 
        ||
        null,
        point_four_title: data.point_four_title 
        ||
        null,
        point_four_description: data.point_four_description 
        ||
        null,
        point_five_title: data.point_five_title 
        ||
        null,
        point_five_description: data.point_five_description 
        ||
        null,
        epigraph: data.epigraph 
        ||
        null,
        first_paragraph: data.first_paragraph 
        ||
        null,
        second_paragraph: data.second_paragraph 
        ||
        null,
        third_paragraph: data.third_paragraph 
        ||
        null,
        fourth_paragraph: data.fourth_paragraph 
        ||
        null,
        fifth_paragraph: data.fifth_paragraph 
        ||
        null,
        status: data.status 
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


    await blogs.setBrand(data.brand || null, {
      transaction,
    });

    await blogs.setCategories(data.categories || [], {
      transaction,
    });

    await blogs.setMore_blogs(data.more_blogs || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'hero_image',
        belongsToId: blogs.id,
      },
      data.hero_image,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_one',
        belongsToId: blogs.id,
      },
      data.blog_image_one,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_two',
        belongsToId: blogs.id,
      },
      data.blog_image_two,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'blog_image_three',
        belongsToId: blogs.id,
      },
      data.blog_image_three,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'author_avatar',
        belongsToId: blogs.id,
      },
      data.author_avatar,
      options,
    );


    return blogs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const blogs = await db.blogs.findByPk(id, options);

    await blogs.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await blogs.destroy({
      transaction
    });

    return blogs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.brands,
        as: 'brand',
      },

      {
        model: db.categories,
        as: 'categories',
      },

      {
        model: db.blogs,
        as: 'more_blogs',
      },

      {
        model: db.file,
        as: 'hero_image',
      },

      {
        model: db.file,
        as: 'blog_image_one',
      },

      {
        model: db.file,
        as: 'blog_image_two',
      },

      {
        model: db.file,
        as: 'blog_image_three',
      },

      {
        model: db.file,
        as: 'author_avatar',
      },
    ]

    const blogs = await db.blogs.findOne(
      { where, include },
      { transaction },
    );

    if (!blogs) {
      return blogs;
    }

    const output = blogs.get({plain: true});

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
        model: db.brands,
        as: 'brand',
      },

      {
        model: db.categories,
        as: 'categories',
        through: filter.categories ? { where: {
          [Op.or]: filter.categories.split('|').map(item => {
            return { ['categoryId']: Utils.uuid(item) }
          })
        }} : null,
        required: filter.categories ? true : null,
      },

      {
        model: db.blogs,
        as: 'more_blogs',
        through: filter.more_blogs ? { where: {
          [Op.or]: filter.more_blogs.split('|').map(item => {
            return { ['productId']: Utils.uuid(item) }
          })
        }} : null,
        required: filter.more_blogs ? true : null,
      },

      {
        model: db.file,
        as: 'hero_image',
      },

      {
        model: db.file,
        as: 'blog_image_one',
      },

      {
        model: db.file,
        as: 'blog_image_two',
      },

      {
        model: db.file,
        as: 'blog_image_three',
      },

      {
        model: db.file,
        as: 'author_avatar',
      },

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
            'blogs',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'blogs',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.discountRange) {
        const [start, end] = filter.discountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            discount: {
              ...where.discount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            discount: {
              ...where.discount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
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

      if (filter.brand) {
        var listItems = filter.brand.split('|').map(item => {
          return { ['brandId']: Utils.uuid(item) }
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

    let { rows, count } = await db.blogs.findAndCountAll(
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
            'blogs',
            'title',
            query,
          ),
        ],
      };
    }

    const records = await db.blogs.findAll({
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

