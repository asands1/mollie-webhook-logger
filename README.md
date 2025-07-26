# 📬 Mollie Webhook Logger

A lightweight Node.js app to receive Mollie webhook events, log the request payload and headers, and automatically fetch payment details using the Mollie API.

---

## 🚀 Features

- Logs incoming webhook requests (headers, body, timestamp) to a local file (`webhook_logs.txt`)
- Fetches payment details from Mollie using the `id` field in the webhook payload
- Built with `express` and `axios`
- Supports public tunneling via [ngrok](https://ngrok.com/)
- View incoming requests in real time using ngrok's local dashboard

---

## 🧱 Prerequisites

Make sure you have the following installed:

- [Node.js (LTS)](https://nodejs.org)
- [Git](https://git-scm.com)
- [ngrok](https://ngrok.com/) (can be installed via npm or manually)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/asands1/mollie-webhook-logger.git
cd mollie-webhook-logger
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Export Your Mollie API Key

```bash
export MOLLIE_API_KEY=live_xxxxxxxxxxxxxxxxxxx
```

> You can use your **Mollie test key** to avoid triggering real transactions.

---

## ▶️ Run the App

```bash
node index.js
```

You should see:

```
🚀 Webhook logger running on http://localhost:3000/webhook
```

! I recommend keeping this tunnel open and starting a new terminal with cmd+n (mac OS)!
---

## 🌐 Open Public Tunnel with ngrok

### 1. Install ngrok

```bash
npm install -g ngrok
```

! I recommend starting a new terminal here (cmd +n) so that you can keep your tunnel open. !

### 2. Authenticate ngrok (only once)

Sign up at:  
👉 https://dashboard.ngrok.com/signup

Then copy your auth token from:  
👉 https://dashboard.ngrok.com/get-started/setup

Paste it into your terminal:

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 3. Start the Tunnel

```bash
ngrok http 3000
```

You'll see:

```
Forwarding    https://abcd1234.ngrok-free.app -> http://localhost:3000
```

Copy that `https://...` URL — you’ll use it in Mollie’s webhook config.

---

## 🔁 Create a Test Mollie Payment

Please be aware, Mollie API is forever changing! Check here for how to create a payment:
https://docs.mollie.com/reference/create-payment

Example:

```bash
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
```

🔄 Replace:
- `Authorization` with your **test** Mollie API key
- `webhookUrl` with your **ngrok HTTPS URL**

---

## 🕵️ Inspect Webhook Traffic in Real Time

While ngrok is running, open your browser to:

```
http://127.0.0.1:4040
```

Here you can:

- View all incoming webhook calls
- Inspect full request headers and body
- Replay webhooks for debugging

---

## ⚠️ Keep the ngrok Terminal Open!

> Don’t close the terminal window running `ngrok http 3000`.  
> Once it closes, the tunnel shuts down and Mollie can no longer reach your webhook.

---

## 📄 Example Log Entry

```txt
[2025-07-17T14:22:33.123Z] --- Webhook received at 2025-07-17T14:22:33.123Z ---
Headers: {
  "host": "localhost:3000",
  ...
}
Body: {
  "id": "tr_XXX"
}
Mollie Payment Details for tr_XXXX:
{
  "resource": "payment",
  "id": "tr_XXXXX",
  "amount": { "value": "10.00", "currency": "EUR" },
  ...
}
```
