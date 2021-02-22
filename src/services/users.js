
const db = require('../db/models');
const UsersDBApi = require('../db/api/users');

const InvitationEmail = require('./email/list/invitation');
const ValidationError = require('./notifications/errors/validation');
const EmailSender = require('./email');

module.exports = class UsersService {
  static async create(data, currentUser, sendInvitationEmails = false) {
    let emailsToInvite = [];
    let transaction = await db.sequelize.transaction();

    let emails = data.emails && !Array.isArray(data.emails) ? [data.emails] : [...new Set(data.emails)];
    emails.map((email) => email.trim());

    try {
      if (emails.length > 0) {
        emails.map(async (email) => {
          let users = await UsersDBApi.findBy({email}, {transaction},
          );

          if (users) {
            throw new ValidationError(
              'iam.errors.userAlreadyExists',
            );
          } else {
            await UsersDBApi.create(
              {email},
              {
                currentUser,
                transaction,
              },
            );

            emailsToInvite.push(email);
          }
        })
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    if (emailsToInvite && emailsToInvite.length) {
      if (!sendInvitationEmails) {
        return;
      }

      emailsToInvite.map(async (emailToInvite) => {
        const invitationEmail = new InvitationEmail(
          emailToInvite,
        );

        await new EmailSender(invitationEmail).send();
      })
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let users = await UsersDBApi.findBy(
        {id},
        {transaction},
      );

      if (!users) {
        throw new ValidationError(
          'iam.errors.userNotFound',
        );
      }

      await UsersDBApi.update(
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
      if (currentUser.id === id) {
        throw new ValidationError(
          'iam.errors.deletingHimself',
        );
      }

      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await UsersDBApi.remove(
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
