export async function hashRateKey(ip: string): Promise<string> {
  const salt = process.env.RATE_SALT ?? "washere";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf), (b) =>
    b.toString(16).padStart(2, "0"),
  )
    .join("")
    .slice(0, 16);
}
