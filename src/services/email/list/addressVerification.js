const { getNotification } = require('../../notifications/helpers');

module.exports = class EmailAddressVerificationEmail {
  constructor(to, link) {
    this.to = to;
    this.link = link;
  }

  get subject() {
    return getNotification(
      'emails.emailAddressVerification.subject',
      getNotification('app.title'),
    );
  }

  get html() {
    return getNotification(
      'emails.emailAddressVerification.body',
      this.link,
      getNotification('app.title'),
    );
  }
};
