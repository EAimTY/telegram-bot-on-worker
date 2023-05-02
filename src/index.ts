import { Bot, webhookCallback } from 'grammy/web';
import Env from './env';
import handleBotUpdate from './bot';
import handleNonBotRequest from './nonBot';

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.headers.get('x-telegram-bot-api-secret-token') === env.TELEGRAM_BOT_SECRET_TOKEN) {
      const bot = new Bot(env.TELEGRAM_BOT_API_TOKEN);
      await handleBotUpdate(bot, env);
      return webhookCallback(bot, 'cloudflare-mod', { secretToken: env.TELEGRAM_BOT_SECRET_TOKEN })(req);
    }

    return handleNonBotRequest(req, env);
  },
};
