const fastify = require('fastify')({ logger: true });

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
