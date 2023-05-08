import { Bot, webhookCallback } from 'grammy/web';
import Env from './env';
import { handleBotCronEvent, handleBotUpdate, handleNonBotRequest } from './bot';

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.headers.get('x-telegram-bot-api-secret-token') === env.TELEGRAM_BOT_SECRET_TOKEN) {
      const bot = new Bot(env.TELEGRAM_BOT_API_TOKEN);
      await handleBotUpdate(bot, env);
      return webhookCallback(bot, 'cloudflare-mod', { secretToken: env.TELEGRAM_BOT_SECRET_TOKEN })(req);
    }

    return handleNonBotRequest(req, env);
  },

  async scheduled(ctrl: ScheduledController, env: Env): Promise<void> {
    const bot = new Bot(env.TELEGRAM_BOT_API_TOKEN);
    handleBotCronEvent(bot, env, ctrl);
  },
};
