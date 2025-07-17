const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
if (!MOLLIE_API_KEY) {
  console.error('❌ Please set MOLLIE_API_KEY before starting the server.');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function logToFile(data) {
  const logLine = `[${new Date().toISOString()}] ${data}\n`;
  fs.appendFileSync('webhook_logs.txt', logLine);
}

app.post('/webhook', async (req, res) => {
  const timestamp = new Date().toISOString();
  const headers = JSON.stringify(req.headers, null, 2);
  const body = req.body;

  console.log(`📥 Webhook received at ${timestamp}`);
  logToFile(`--- Webhook received at ${timestamp} ---`);
  logToFile(`Headers: ${headers}`);
  logToFile(`Body: ${JSON.stringify(body, null, 2)}`);

  const paymentId = body.id;

  if (paymentId) {
    try {
      const response = await axios.get(`https://api.mollie.com/v2/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MOLLIE_API_KEY}`
        }
      });
      const paymentDetails = response.data;
      const logDetails = JSON.stringify(paymentDetails, null, 2);

      console.log('✅ Mollie Payment Details:');
      console.log(logDetails);
      logToFile(`Mollie Payment Details for ${paymentId}:\n${logDetails}`);
    } catch (error) {
      console.error('❌ Error fetching payment:', error.response?.data || error.message);
      logToFile(`❌ Error fetching payment ${paymentId}: ${error.response?.data?.message || error.message}`);
    }
  } else {
    logToFile(`⚠️ No payment ID found in webhook`);
  }

  res.status(200).send('Received');
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook logger running on http://localhost:${PORT}/webhook`);
});

