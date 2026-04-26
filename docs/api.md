# Train Travel API

Travelling by train  usually requires a train ticket.

With this API you will be able to search, book and pay for a train
ticket and enjoy watching the landscapes by the window.

## API Calls

Below is the set of API calls you will need to do to get your ticket.

| Description | API | Repeat?  |
|-----------------------------------------------:|:-----------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| Search for train stations | `GET /stations` | Call this operation as many times as needed to find your origin and destination train stations |
| Lookup train schedules and ticket availability | `GET /trips` | As many calls as necessary, you will provide both the origin and destination station IDs and a traveling date |
| Make your booking | `POST /bookings` | Usually one booking is enough. But if you want to organize your next holidays you may book as many tickets as you like |
| Issue your ticket by paying | `POST /bookings/{bookingId}/payment` | One payment per booking is enough to receive your ticket |


## Webhooks (not yet implemented)

### Webhook receiver flow

1. Set up an endpoint to receive webhooks (for example, `https://your-server.com/webhook`).
2. Register that URL with the Train Travel API (create a webhook subscription).
3. When a booking is created via `POST /bookings`, the API server automatically sends a `POST` request to your webhook URL.
4. Your server should return `200 OK` to confirm receipt.

### Testing in local development

Because a local server is not directly accessible from the internet, it is common to use a tunneling tool such as ngrok:

```bash
ngrok http 8080
# A public URL like https://xxxx.ngrok.io will be generated
```

