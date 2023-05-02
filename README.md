# telegram-bot-on-worker

Create serverless Telegram bot using [Cloudflare Workers](https://workers.cloudflare.com/) and [grammY](https://grammy.dev/).

## Usage

### Create a Telegram Bot

1. Talk to [BotFather](https://t.me/botfather) and create a bot
2. Get the bot token

### Create a Cloudflare Worker

1. Create a new [Cloudflare Workers](https://workers.cloudflare.com/)
2. Set a custom domain for your worker. This must be done since Telegram bot webhook API is not compatible with the SSL certifiacte of Cloudflare Workers' default domain (`https://<worker-name>.<your-account>.workers.dev`)

### Deploy the Code

1. Click `Use this template` to create a new repo from this template
2. Clone the repo you just created
3. Change field `name` in `wrangler.toml` & `package.json` to your Cloudflare Worker name
4. Install dependencies: `npm i`
5. Set the bot token as a secret environment variable: `npx wrangler secret put TELEGRAM_BOT_API_TOKEN`, then paste the token
6. Set a secret token for webhook verification: `npx wrangler secret put TELEGRAM_BOT_SECRET_TOKEN`, then paste a random string (see [Telegram docs](https://core.telegram.org/bots/api#setwebhook) for more details)
7. Upload the worker: `npx wrangler publish`

### Set Webhook

Visit `https://api.telegram.org/bot<TELEGRAM_BOT_API_TOKEN>/setWebhook?url=https://<YOUR_CUSTOM_DOMAIN>&secret_token=<TELEGRAM_BOT_SECRET_TOKEN>` to set the webhook.

For example, you got `TELEGRAM_BOT_API_TOKEN` of `000000:AAAAAAAAAAAA`, `YOUR_CUSTOM_DOMAIN` of `bot.example.com` and `TELEGRAM_BOT_SECRET_TOKEN` as `foo`, visit:

`https://api.telegram.org/bot000000:AAAAAAAAAAAA/setWebhook?url=https://bot.example.com&secret_token=foo`

### Test Your Bot

Send `/start` to your bot and it should reply `Hello, world!`.

### Write Your Own Bot

Change the code in `src/bot.ts` to write your own bot. See [grammY docs](https://grammy.dev/guide/basics.html) for more details.

Non-bot-update requests will be handled in `src/nonBot.ts`. You can change it to write your own logic.

### Optional: Set Up Workers KV

<https://developers.cloudflare.com/workers/wrangler/workers-kv/>

1. Create a new KV namespace with Wrangler: `npx wrangler kv:namespace create <YOUR_NAMESPACE>`
2. Change fields in `kv_namespaces` in `wrangler.toml` to the output of the previous command
3. Declare the KV binding in `src/env.ts`
4. Use [Worker KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) in your code

## Licenses

Apache 2.0 License & MIT License
