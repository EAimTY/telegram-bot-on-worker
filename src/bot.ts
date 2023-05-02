import { Bot } from 'grammy/web';
import Env from './env';

export default async function handleBotUpdate(
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
