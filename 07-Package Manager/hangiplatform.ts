function getPlatformInfo(): string {
  const platform = Deno.build.os;
  switch (platform) {
    case "windows":
      return "Windows";
    case "darwin":
      return "macOS";
    case "linux":
      return "Linux";
    default:
      return "Unknown platform";
  }
}

console.log(getPlatformInfo());
