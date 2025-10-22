export async function POST({ request }) {
  const payload = await request.json();
  const data = payload?.data ?? payload;
  try {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(data)}&fields=population&format=json&geometry=centre`
    );
    if (!response.ok) {
      return new Response("Error fetching commune data", { status: response.status });
    }
    const communeData = await response.json();
    return new Response(JSON.stringify(communeData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response("Error fetching commune data", { status: 500 });
  }
}