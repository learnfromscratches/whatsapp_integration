// src/routes/webhookRoutes.js

async function webhookRoutes(fastify, options) {
  // Verify the webhook setup from Meta
  fastify.get("/webhook", async (request, reply) => {
    const mode = request.query["hub.mode"];
    const token = request.query["hub.verify_token"];
    const challenge = request.query["hub.challenge"];

    // Use a custom verification token from your environment variables
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      reply.code(200).send(challenge);
    } else {
      reply.code(403).send("Forbidden");
    }
  });

  // Handle incoming messages
  fastify.post("/webhook", async (request, reply) => {
    const body = request.body;

    // Check if the request contains valid data
    if (body.object === "whatsapp_business_account") {
      body.entry.forEach((entry) => {
        entry.changes.forEach((change) => {
          if (change.field === "messages") {
            const messages = change.value.messages || [];
            messages.forEach((message) => {
              if (message.type === "text") {
                console.log(`Received message: ${message.text.body}`);
                console.log(`From: ${message.from}`);
              }
            });
          }
        });
      });
      reply.code(200).send("EVENT_RECEIVED");
    } else {
      reply.code(404).send("Not Found");
    }
  });
}

module.exports = webhookRoutes;
