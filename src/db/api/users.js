
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UsersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.create(
      {
        id: data.id || undefined,
firstName: data.firstName 
        ||
        null,
lastName: data.lastName 
        ||
        null,
phoneNumber: data.phoneNumber 
        ||
        null,
email: data.email 
        ||
        null,
role: data.role 
        ||
        user,
disabled: data.disabled 
        ||
        false,
password: data.password 
        ||
        null,
emailVerified: data.emailVerified 
        ||
        false,
emailVerificationToken: data.emailVerificationToken 
        ||
        null,
emailVerificationTokenExpiresAt: data.emailVerificationTokenExpiresAt 
        ||
        null,
passwordResetToken: data.passwordResetToken 
        ||
        null,
passwordResetTokenExpiresAt: data.passwordResetTokenExpiresAt 
        ||
        null,
provider: data.provider 
        ||
        null,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );


    await users.setWishlist(data.wishlist || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: users.id,
      },
      data.avatar,
      options,
    );


    return users;
  }

  static async update(id, data, options) {
    console.log(data);
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {
      transaction,
    });

    await users.update(
      {
firstName: data.firstName
        ||
        null,
lastName: data.lastName
        ||
        null,
phoneNumber: data.phoneNumber
        ||
        null,
email: data.email
        ||
        null,
role: data.role
        ||
        user,
disabled: data.disabled
        ||
        false,
password: data.password
        ||
        null,
emailVerified: data.emailVerified
        ||
        false,
emailVerificationToken: data.emailVerificationToken
        ||
        null,
emailVerificationTokenExpiresAt: data.emailVerificationTokenExpiresAt
        ||
        null,
passwordResetToken: data.passwordResetToken
        ||
        null,
passwordResetTokenExpiresAt: data.passwordResetTokenExpiresAt
        ||
        null,
provider: data.provider
        ||
        null,

        updatedById: currentUser.id,
      },
      {transaction},
    );


    await users.setWishlist(data.wishlist || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: users.id,
      },
      data.avatar,
      options,
    );


    return users;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, options);

    await users.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await users.destroy({
      transaction
    });

    return users;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findOne(
      { where },
      { transaction },
    );

    if (!users) {
      return users;
    }

    const output = users.get({plain: true});

    output.wishlist = await users.getWishlist({
      transaction
    });

    output.avatar = await users.getAvatar({
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
        as: 'wishlist',
        through: filter.wishlist ? { where: {
          [Op.or]: filter.wishlist.split('|').map(item => {
            return { ['productId']: Utils.uuid(item) }
          })
        }} : null,
        required: filter.wishlist ? true : null,
      },

      {
        model: db.file,
        as: 'avatar',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }


      if (filter.firstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'firstName',
            filter.firstName,
          ),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'lastName',
            filter.lastName,
          ),
        };
      }

      if (filter.phoneNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'phoneNumber',
            filter.phoneNumber,
          ),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'email',
            filter.email,
          ),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'password',
            filter.password,
          ),
        };
      }

      if (filter.emailVerificationToken) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'emailVerificationToken',
            filter.emailVerificationToken,
          ),
        };
      }

      if (filter.passwordResetToken) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'passwordResetToken',
            filter.passwordResetToken,
          ),
        };
      }

      if (filter.provider) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'provider',
            filter.provider,
          ),
        };
      }

      if (filter.emailVerificationTokenExpiresAtRange) {
        const [start, end] = filter.emailVerificationTokenExpiresAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            emailVerificationTokenExpiresAt: {
              ...where.emailVerificationTokenExpiresAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            emailVerificationTokenExpiresAt: {
              ...where.emailVerificationTokenExpiresAt,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.passwordResetTokenExpiresAtRange) {
        const [start, end] = filter.passwordResetTokenExpiresAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            passwordResetTokenExpiresAt: {
              ...where.passwordResetTokenExpiresAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            passwordResetTokenExpiresAt: {
              ...where.passwordResetTokenExpiresAt,
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


      if (filter.role) {
        where = {
          ...where,
          role: filter.role,
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

    let { rows, count } = await db.users.findAndCountAll(
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
            'users',
            'email',
            query,
          ),
        ],
      };
    }

    const records = await db.users.findAll({
      attributes: [ 'id', 'email' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['email', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.email,
    }));
  }


  static async createFromAuth(data, options) {
    const transaction = (options && options.transaction) || undefined;
    const users = await db.users.create(
      {
        email: data.email,
        firstName: data.firstName,
        authenticationUid: data.authenticationUid,
        password: data.password,
      },
      { transaction },
    );

    await users.update(
      {
        authenticationUid: users.id,
      },
      { transaction },
    );

    delete users.password;
    return users;
  }

  static async updatePassword(id, password, options) {
    const currentUser = (options && options.currentUser) || { id: null };

    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {
      transaction,
    });

    await users.update(
      {
        password,
        authenticationUid: id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return users;
  }

  static async generateEmailVerificationToken(email, options) {
    return this._generateToken(['emailVerificationToken', 'emailVerificationTokenExpiresAt'], email, options);
  }

  static async generatePasswordResetToken(email, options) {
    return this._generateToken(['passwordResetToken', 'passwordResetTokenExpiresAt'], email, options);
  }

  static async findByPasswordResetToken(token, options) {
    const transaction = (options && options.transaction) || undefined;

    return db.users.findOne(
      {
        where: {
          passwordResetToken: token,
          passwordResetTokenExpiresAt: {
            [db.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );
  }

  static async findByEmailVerificationToken(
    token,
    options,
  ) {
    const transaction = (options && options.transaction) || undefined;
    return db.users.findOne(
      {
        where: {
          emailVerificationToken: token,
          emailVerificationTokenExpiresAt: {
            [db.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );
  }

  static async markEmailVerified(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {
      transaction,
    });

    await users.update(
      {
        emailVerified: true,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return true;
  }

  static async _generateToken(keyNames, email, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;
    const users = await db.users.findOne(
      {
        where: {email},
      },
      {
        transaction,
      },
    );

    const token = crypto
      .randomBytes(20)
      .toString('hex');
    const tokenExpiresAt = Date.now() + 360000;

    await users.update(
      {
        [keyNames[0]]: token,
        [keyNames[1]]: tokenExpiresAt,
        updatedById: currentUser.id,
      },
      {transaction},
    );

    return token;
  }

};

