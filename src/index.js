const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const stripe = require("stripe")("sk_test_51HUCprJMc0TzjdrXPHLgWIRXobDv0IBnARG7Urq9P2Vo1sHe8WSbz0njlqG1gRh7G3hMiysLAXIkgK13F6SheDn400agRwXiv7")

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');


const productsRoutes = require('./routes/products');

const categoriesRoutes = require('./routes/categories');

const brandsRoutes = require('./routes/brands');

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

app.use('/api/categories', categoriesRoutes);

app.use('/api/brands', passport.authenticate('jwt', {session: false}), brandsRoutes);

app.use('/api/orders', passport.authenticate('jwt', {session: false}), ordersRoutes);

app.use('/api/payments', passport.authenticate('jwt', {session: false}), paymentsRoutes);

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);


const publicDir = path.join(
  __dirname,
  '../../../frontend/build',
);

app.get("/images/:entity/:id.:ext", (req, res) => {
  res.sendFile(
      `${__dirname}/images/${req.params.entity}/${req.params.id}.${req.params.ext}`
  );
});

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment failed",
      success: false
    })
  }
})

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
