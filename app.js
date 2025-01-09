// src/app.js
require("dotenv").config();
const fastify = require("fastify")({ logger: false });
const orderRoutes = require("./src/routes/orderRoutes");
const webhookRoutes = require("./src/routes/webhookRoutes");

fastify.register(orderRoutes);
fastify.register(webhookRoutes);

fastify.listen({ port: process.env.PORT || 4000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
