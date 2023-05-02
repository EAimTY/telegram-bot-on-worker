import Env from './env';

export default async function handleNonBotRequest(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env: Env,
): Promise<Response> {
  // Handle non-bot requests here
  // Request not having the correct secret token is handled here

  return new Response(null, { status: 403 });
}
