const config = require('../../../config');
const { getNotification } = require('../../notifications/helpers');

module.exports = class InvitationEmail {
  constructor(to) {
    this.to = to;
  }

  get subject() {
    return getNotification(
      'emails.invitation.subject',
      getNotification('app.title'),
    );
  }

  get html() {
    return getNotification(
      'emails.invitation.body',
      getNotification('app.title'),
      `${config.uiUrl}/signup?email=${
        this.to
      }`,
    );
  }
};
