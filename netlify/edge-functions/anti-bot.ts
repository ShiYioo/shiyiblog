const SCRAPERS = [
  'python-requests',
  'curl/',
  'wget/',
  'scrapy',
  'httpclient',
  'okhttp',
  'node-fetch',
  'axios/',
  'go-http-client',
  'aiohttp',
  'java/',
  'libwww',
  'httpx',
  'requests/',
  'http-request',
];

export default async (request, context) => {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  if (!ua || SCRAPERS.some((s) => ua.includes(s))) {
    return new Response('Forbidden', { status: 403 });
  }
  return context.next();
};
