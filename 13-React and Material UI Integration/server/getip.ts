export function getLocalIP(): string[] {
  const interfaces = Deno.networkInterfaces();
  const localIPs: string[] = [];

  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.address.startsWith("127.")) {
      localIPs.push(iface.address);
    }
  }

  return localIPs.length > 0 ? localIPs : ["Local IP not found"];
}
