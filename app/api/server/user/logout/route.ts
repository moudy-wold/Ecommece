export async function POST(req: any) {
  try {
    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
