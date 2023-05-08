import { Bot } from 'grammy/web';
import Env from './env';

export async function handleBotUpdate(
  bot: Bot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env: Env,
): Promise<void> {
  // Example of using Worker KV
  // See https://developers.cloudflare.com/workers/wrangler/workers-kv/
  // and https://developers.cloudflare.com/workers/runtime-apis/kv/
  //
  // await env.BINDING_NAME_1.put('hello', 'world');

  // Example of adding a command handler with [grammY](https://grammy.dev/).
  // See https://grammy.dev/guide/basics.html
  bot.command('start', async (ctx) => {
    await ctx.reply('Hello, world!');
  });
}

export async function handleBotCronEvent(
  bot: Bot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env: Env,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctrl: ScheduledController,
): Promise<void> {
  // Handle worker cron events here

  bot.api.sendMessage(1145141919810, 'Hello, world!');
}

export async function handleNonBotRequest(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env: Env,
): Promise<Response> {
  // Request not having the correct secret token is handled here
  return new Response(null, { status: 403 });
}
