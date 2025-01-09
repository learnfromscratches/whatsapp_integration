// src/routes/orderRoutes.js
const { sendWhatsAppMessage } = require("../services/whatsappService");

async function orderRoutes(fastify, options) {
  fastify.post("/order/confirm", async (request, reply) => {
    const { customerPhone, orderId, totalAmount, customerName } = request.body;

    if (!customerPhone || !orderId || !totalAmount || !customerName) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    try {
      await sendWhatsAppMessage(customerPhone, "order_confirmation", [
        customerName,
        orderId,
        totalAmount,
      ]);
      reply.send({
        success: true,
        message: "Order confirmation sent via WhatsApp",
      });
    } catch (error) {
      reply.status(500).send({ error: "Failed to send WhatsApp message" });
    }
  });
}

module.exports = orderRoutes;
