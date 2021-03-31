const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const Stripe = require("stripe");

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');


const productsRoutes = require('./routes/products');

const blogsRoutes = require('./routes/blogs');

const categoriesRoutes = require('./routes/categories');

const brandsRoutes = require('./routes/brands');

const feedbackRoutes = require('./routes/feedback');

const ordersRoutes = require('./routes/orders');

const paymentsRoutes = require('./routes/payments');

const usersRoutes = require('./routes/users');


app.use(cors({origin: true}));

app.use(helmet());

require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);


app.use('/api/products', productsRoutes);

app.use('/api/blogs', blogsRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/brands', brandsRoutes);

app.use('/api/feedback', feedbackRoutes);

app.use('/api/orders', passport.authenticate('jwt', {session: false}), ordersRoutes);

app.use('/api/payments', passport.authenticate('jwt', {session: false}), paymentsRoutes);

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.get("/images/:entity/:id.:ext", (req, res) => {
  res.sendFile(
      `${__dirname}/images/${req.params.entity}/${req.params.id}.${req.params.ext}`
  );
});

app.post('/payment/session-initiate', async (req, res) => {
  const {
    clientReferenceId,
    customerEmail,
    lineItem,
    successUrl,
    cancelUrl,
  } = req.body;

  const stripe = Stripe('sk_test_51HUCprJMc0TzjdrXPHLgWIRXobDv0IBnARG7Urq9P2Vo1sHe8WSbz0njlqG1gRh7G3hMiysLAXIkgK13F6SheDn400agRwXiv7');

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      client_reference_id: clientReferenceId,
      customer_email: customerEmail,
      payment_method_types: ['card'],
      line_items: [lineItem],
      payment_intent_data: {
        description: `${lineItem.name} ${lineItem.description}`,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  } catch (error) {
    res.status(500).send({ error });
  }

  return res.status(200).send(session);
});

app.post('/payment/session-complete', async (req, res) => {
  const stripe = Stripe('sk_test_51HUCprJMc0TzjdrXPHLgWIRXobDv0IBnARG7Urq9P2Vo1sHe8WSbz0njlqG1gRh7G3hMiysLAXIkgK13F6SheDn400agRwXiv7');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        'acct_1HUCprJMc0TzjdrX'
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // complete your customer's order
      // e.g. save the purchased product into your database
      // take the clientReferenceId to map your customer to a product
    } catch (error) {
      return res.status(404).send({ error, session });
    }
  }

  return res.status(200).send({ received: true });
});

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
