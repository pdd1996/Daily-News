export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email);
  return new Response('ok', {status: 200});
}