# 📬 Mollie Webhook Logger

A lightweight Node.js app to receive Mollie webhook events, log the request payload and headers, and automatically fetch payment details using the Mollie API.

---

## 🚀 Features

- Logs incoming webhook requests (headers, body, timestamp) to a local file (`webhook_logs.txt`)
- Fetches payment details from Mollie using the `id` field in the webhook payload
- Built with `express` and `axios`
- Supports public tunnel via [ngrok](https://ngrok.com/) for external webhook testing
- View incoming requests in real time via ngrok's local web dashboard

---

## 🧱 Prerequisites

Make sure you have the following installed:

- [Node.js (LTS)](https://nodejs.org)
- [Git](https://git-scm.com)
- [ngrok](https://ngrok.com/) (installed via npm or manually)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/asands1/mollie-webhook-logger.git
cd mollie-webhook-logger
2. Install Dependencies
bash
Copy
Edit
npm install
3. Export Your Mollie API Key
bash
Copy
Edit
export MOLLIE_API_KEY=live_xxxxxxxxxxxxxxxxxxx
You can use your Mollie test key to avoid real transactions.

▶️ Run the App
bash
Copy
Edit
node index.js
You’ll see:

arduino
Copy
Edit
🚀 Webhook logger running on http://localhost:3000/webhook
🌐 Open Public Tunnel with ngrok
1. Install ngrok
bash
Copy
Edit
npm install -g ngrok
2. Authenticate ngrok (Only Once)
Sign up at https://dashboard.ngrok.com/signup, then get your auth token from https://dashboard.ngrok.com/get-started/setup.

Paste the command they give you into your terminal:

bash
Copy
Edit
ngrok config add-authtoken YOUR_AUTH_TOKEN
3. Start the Tunnel
bash
Copy
Edit
ngrok http 3000
You’ll see:

nginx
Copy
Edit
Forwarding    https://abcd1234.ngrok-free.app -> http://localhost:3000
Copy the HTTPS forwarding URL and use it as the webhookUrl when creating Mollie payments.

🔁 Create a Test Mollie Payment
bash
Copy
Edit
curl -X POST https://api.mollie.com/v2/payments \
  -H "Authorization: Bearer test_xxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": {
      "currency": "EUR",
      "value": "10.00"
    },
    "description": "Webhook test payment",
    "redirectUrl": "https://example.org/thank-you",
    "webhookUrl": "https://abcd1234.ngrok-free.app/webhook"
  }'
🔄 Replace:
Authorization with your Mollie test API key

webhookUrl with your ngrok forwarding URL

🕵️ Inspect Webhook Traffic in Real Time
While ngrok is running, open:

cpp
Copy
Edit
http://127.0.0.1:4040
Here you can:

View all incoming webhook calls

Inspect full headers and body

Replay requests to debug issues

⚠️ Keep the ngrok Terminal Open!
Don’t close the terminal running ngrok http 3000.
This tunnel stays active only while that terminal is open. If you close it, Mollie can’t reach your local server.


