const UsersDBApi = require('../db/api/users');
const ValidationError = require('./notifications/errors/validation');
const ForbiddenError = require('./notifications/errors/forbidden');
const bcrypt = require('bcrypt');
const EmailAddressVerificationEmail = require('./email/list/addressVerification');
const PasswordResetEmail = require('./email/list/passwordReset');
const EmailSender = require('./email');
const config = require('../config');
const helpers = require('../helpers');


class Auth {
  static async signup(email, password, options = {}) {
    const user = await UsersDBApi.findBy({email});

    const hashedPassword = await bcrypt.hash(
      password,
      config.bcrypt.saltRounds,
    );

    if (user) {
      if (user.authenticationUid) {
        throw new ValidationError(
          'auth.emailAlreadyInUse',
        );
      }

      if (user.disabled) {
        throw new ValidationError(
          'auth.userDisabled',
        );
      }

      await UsersDBApi.updatePassword(
        user.id,
        hashedPassword,
        options,
      );

      if (EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          user.email,
        );
      }

      const data = {
        user: {
          id: user.id,
          email: user.email
        }
      };

      return helpers.jwtSign(data);
    }

    const newUser = await UsersDBApi.createFromAuth(
      {
        firstName: email.split('@')[0],
        password: hashedPassword,
        email: email,
      },
      options,
    );

    if (EmailSender.isConfigured) {
      await this.sendEmailAddressVerificationEmail(
        newUser.email,
      );
    }

    const data = {
      user: {
        id: newUser.id,
        email: newUser.email
      }
    };

    return helpers.jwtSign(data);
  }

  static async signin(email, password, options = {}) {
    const user = await UsersDBApi.findBy({email});

    if (!user) {
      throw new ValidationError(
        'auth.userNotFound',
      );
    }

    if (user.disabled) {
      throw new ValidationError(
        'auth.userDisabled',
      );
    }

    if (!user.password) {
      throw new ValidationError(
        'auth.wrongPassword',
      );
    }

    if (!EmailSender.isConfigured) {
      user.emailVerified = true;
    }

    if (!user.emailVerified) {
      throw new ValidationError(
        'auth.userNotVerified',
      );
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new ValidationError(
        'auth.wrongPassword',
      );
    }

    const data = {
      user: {
        id: user.id,
        email: user.email
      }
    };

    return helpers.jwtSign(data);
  }

  static async sendEmailAddressVerificationEmail(
    email,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>.json.`,
      );
    }

    let link;
    try {
      const token = await UsersDBApi.generateEmailVerificationToken(
        email,
      );
      link = `${config.uiUrl}/verify?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new ValidationError(
        'auth.emailAddressVerificationEmail.error',
      );
    }

    const emailAddressVerificationEmail = new EmailAddressVerificationEmail(
      email,
      link,
    );

    return new EmailSender(
      emailAddressVerificationEmail,
    ).send();
  }

  static async sendPasswordResetEmail(email) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>.json.`,
      );
    }

    let link;

    try {
      const token = await UsersDBApi.generatePasswordResetToken(
        email,
      );
      link = `${config.uiUrl}/reset?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new ValidationError(
        'auth.passwordReset.error',
      );
    }

    const passwordResetEmail = new PasswordResetEmail(
      email,
      link,
    );

    return new EmailSender(passwordResetEmail).send();
  }

  static async verifyEmail(token, options = {}) {
    const user = await UsersDBApi.findByEmailVerificationToken(
      token,
      options,
    );

    if (!user) {
      throw new ValidationError(
        'auth.emailAddressVerificationEmail.invalidToken',
      );
    }

    return UsersDBApi.markEmailVerified(
      user.id,
      options,
    );
  }

  static async passwordUpdate(currentPassword, newPassword, options) {
    const currentUser = options.currentUser || null;
    if (!currentUser) {
      throw new ForbiddenError();
    }

    const currentPasswordMatch = await bcrypt.compare(
      currentPassword,
      currentUser.password,
    );

    if (!currentPasswordMatch) {
      throw new ValidationError(
        'auth.wrongPassword'
      )
    }

    const newPasswordMatch = await bcrypt.compare(
      newPassword,
      currentUser.password,
    );

    if (newPasswordMatch) {
      throw new ValidationError(
        'auth.passwordUpdate.samePassword'
      )
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      config.bcrypt.saltRounds,
    );

    return UsersDBApi.updatePassword(
      currentUser.id,
      hashedPassword,
      options,
    );
  }

  static async passwordReset(
    token,
    password,
    options = {},
  ) {
    const user = await UsersDBApi.findByPasswordResetToken(
      token,
      options,
    );

    if (!user) {
      throw new ValidationError(
        'auth.passwordReset.invalidToken',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      config.bcrypt.saltRounds,
    );

    return UsersDBApi.updatePassword(
      user.id,
      hashedPassword,
      options,
    );
  }

  static async updateProfile(data, currentUser) {
    let transaction = await db.sequelize.transaction();

    try {
      await UsersDBApi.findBy(
        {id: currentUser.id},
        {transaction},
      );

      await UsersDBApi.update(
        currentUser.id,
        data,
        {
          currentUser,
          transaction
        },
      );


      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = Auth;
