const axios = require("axios");

const sendWhatsAppMessage = async (customerPhone, templateName, variables) => {
  const apiUrl = `${process.env.WHATSAPP_API_URL}/${process.env.PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: customerPhone,
    type: "template",
    template: {
      name: templateName,
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: variables.map((value) => ({ type: "text", text: value })),
        },
      ],
    },
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send WhatsApp message");
  }
};

module.exports = { sendWhatsAppMessage };
