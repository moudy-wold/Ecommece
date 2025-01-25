export async function GET(request: any) {
  return new Response(JSON.stringify({ message: "List of Category" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(request: any) {
  const body = await request.json();
  return new Response(
    JSON.stringify({ message: "Category created", data: body }),
    {
      headers: { "Content-Type": "application/json" },
      status: 201,
    }
  );
}
