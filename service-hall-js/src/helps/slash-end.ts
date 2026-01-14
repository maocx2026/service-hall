export function slashEnd(url: string): string {
  const lastChar = url.charAt(url.length - 1);
  if (lastChar === '/') {
    return url.slice(0, url.length - 1);
  }
  return url;
}
